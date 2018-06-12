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

export function createMultiSig (firstKey, secondKey) {
  // 2/2 multisigniture address
  let pubKeys = [
    firstKey,
    secondKey
  ].map(function (hex) { return Buffer.from(hex, 'hex') })

  let witnessScript = bitcoin.script.multisig.output.encode(2, pubKeys)
  let redeemScript = bitcoin.script.witnessScriptHash.output.encode(bitcoin.crypto.sha256(witnessScript))
  let scriptPubKey = bitcoin.script.scriptHash.output.encode(bitcoin.crypto.hash160(redeemScript))
  return bitcoin.address.fromOutputScript(scriptPubKey)
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
