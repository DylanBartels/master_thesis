import axios from 'axios'
const bitcoin = require('bitcoinjs-lib')

export function buildTransaction (privateKey, address) {
  const equivalentSatoshis = this.utxo['satoshis'] - 2000
  const previousTransactionHash = this.utxo['txid']
  const outputIndex = this.utxo['vout']

  let txb = new bitcoin.TransactionBuilder()
  // Add the input (who is paying):
  // [previous transaction hash, index of the output to use]
  txb.addInput(previousTransactionHash, outputIndex)
  // Add the output (who to pay to):
  // [payee's address, amount in satoshis]
  txb.addOutput(address, equivalentSatoshis)
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
  axios.get('https://insight.bitpay.com/api/addr/' + bitcoinAddress + '/utxo')
    .then((response) => {
      if (response) {
        return response.data
      } else {
        return []
      }
    }, (error) => {
      return error
    })
}

export function getBalance (bitcoinAddress) {
  axios.get('https://insight.bitpay.com/api/addr/' + bitcoinAddress)
    .then((response) => {
      return response.data
    }, (error) => {
      return error
    })
}

export function postTransactionScript (hexTX) {
  axios.post('https://insight.bitpay.com/api/tx/send', {'rawtx': hexTX})
}
