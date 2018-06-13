import axios from 'axios'
const bitcoin = require('bitcoinjs-lib')

export function buildTransaction (privateKey, address, utxo) {
  let txb = new bitcoin.TransactionBuilder()
  // Add the input (who is paying):
  // [previous transaction hash, index of the output to use]
  txb.addInput(utxo['txid'], utxo['vout'])
  // Add the output (who to pay to):
  // [payee's address, amount in satoshis]
  txb.addOutput(address, (utxo['satoshis'] - 2000))
  // Initialize a private key using WIF
  const keyPair = bitcoin.ECPair.fromWIF(privateKey)

  txb.sign(0, keyPair)
  return txb.build().toHex()
}

export function buildMultiSigTransaction (privateKey, firstPublicKey, secondPublicKey) {
  let pubKeys = [
    firstPublicKey,
    secondPublicKey
  ].map(function (hex) { return Buffer.from(hex, 'hex') })

  let witnessScript = bitcoin.script.multisig.output.encode(2, pubKeys)
  let witnessScriptHash = bitcoin.crypto.sha256(witnessScript)

  let redeemScript = bitcoin.script.witnessScriptHash.output.encode(witnessScriptHash)
  let redeemScriptHash = bitcoin.crypto.hash160(redeemScript)

  let scriptPubKey = bitcoin.script.scriptHash.output.encode(redeemScriptHash)
  let P2SHaddress = bitcoin.address.fromOutputScript(scriptPubKey)

  getAddressUTXO(P2SHaddress).then((response) => {
    // Assumes that there are only two transactions onto the multisig address (equivalent + transportcost)
    const utxoEquivalent = response.data[0]
    const utxoTransport = response.data[1]
    console.log(utxoEquivalent)
    console.log(utxoTransport)

    // Build transaction from p2sh
    let txb = new bitcoin.TransactionBuilder()

    txb.addInput(utxoEquivalent['txid'], 0, null, scriptPubKey)
    txb.addInput(utxoTransport['txid'], 0, null, scriptPubKey)

    txb.addOutput('1EY38FGwuSg3uRzetBwYqYh9jjbX55fHsL', ((utxoEquivalent['satoshis'] + utxoTransport['satoshis']) - 2000))

    // Initialize a private key using WIF
    const keyPair = bitcoin.ECPair.fromWIF(privateKey)

    // Dropoff signing both utxo's on the multisig address
    txb.sign(0, keyPair, redeemScript, null, utxoEquivalent['satoshis'], witnessScript)
    txb.sign(1, keyPair, redeemScript, null, utxoTransport['satoshis'], witnessScript)

    let tx = txb.build()

    // // return transactionscript multisig to transport actor
    return tx.toHex()
  }, (error) => {
    console.log(error)
  })
}

// export function signSecondMultiSigTransaction (privateKey, firstPublicKey, secondPublicKey) {
//   return null
// }

export function createMultiSig (firstKey, secondKey) {
  // 2/2 multisigniture address (via P2SH)
  let pubKeys = [
    firstKey,
    secondKey
  ].map(function (hex) { return Buffer.from(hex, 'hex') })

  let witnessScript = bitcoin.script.multisig.output.encode(2, pubKeys)
  let witnessScriptHash = bitcoin.crypto.sha256(witnessScript)

  let redeemScript = bitcoin.script.witnessScriptHash.output.encode(witnessScriptHash)
  let redeemScriptHash = bitcoin.crypto.hash160(redeemScript)

  let scriptPubKey = bitcoin.script.scriptHash.output.encode(redeemScriptHash)
  let P2SHaddress = bitcoin.address.fromOutputScript(scriptPubKey)

  return {
    'witnessScript': witnessScript,
    'redeemScript': redeemScript,
    'scriptPubKey': scriptPubKey,
    'P2SHaddress': P2SHaddress
  }
}

// Blockexplorer API
export function getAddressUTXO (bitcoinAddress) {
  // Move to state
  return axios.get('https://insight.bitpay.com/api/addr/' + bitcoinAddress + '/utxo')
}

export function getBalance (bitcoinAddress) {
  return axios.get('https://insight.bitpay.com/api/addr/' + bitcoinAddress)
}

export function postTransactionScript (hexTX) {
  axios.post('https://insight.bitpay.com/api/tx/send', {'rawtx': hexTX})
}
