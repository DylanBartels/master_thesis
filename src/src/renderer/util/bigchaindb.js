import { getConnection } from '../datastore'
const driver = require('bigchaindb-driver')

export function transferAsset (selectedAsset, receiverPublicKey, privateKey, phase) {
  return new Promise((resolve, reject) => {
    // Construct metadata.
    const metaData = {
      'phase': phase,
      'date': new Date().toISOString()
    }
    // Construct the new transaction
    const transferTransaction = driver.Transaction.makeTransferTransaction(
      // The previous transaction to be chained upon.
      [{ tx: selectedAsset, output_index: 0 }],
      // The (poutput) condition to be fullfilled in the next transaction.
      [driver.Transaction.makeOutput(driver.Transaction.makeEd25519Condition(receiverPublicKey))],
      // Metadata
      metaData
    )
    // Sign the new transaction.
    const signedTransaction = driver.Transaction.signTransaction(
      transferTransaction, privateKey)

    // Post the transaction.
    getConnection().postTransactionCommit(signedTransaction).then(successfullyPostedTransaction => {
      resolve(successfullyPostedTransaction)
    }).catch(error => {
      reject(error)
    })
  })
}

export function getPickupAssets (BCDBPublicKey, phase, assets) {
  getConnection().listOutputs(BCDBPublicKey).then(response => {
    for (let i = 0; i < response.length; i++) {
      getConnection().getTransaction(response[i].transaction_id).then(response => {
        if (response['metadata'].hasOwnProperty('phase')) {
          if (response['metadata']['phase'] === phase) {
            getConnection().getTransaction(response['id']).then(response => {
              const asset = response['asset']
              asset['id'] = response['id']
              assets.push(asset)
            })
          }
        }
      })
    }
  })
}

export function getDropoffAssets (BTCPublicKey, assets) {
  getConnection().searchAssets(BTCPublicKey).then(response => {
    for (let i = 0; i < response.length; i++) {
      if (response[i]['data']['dropoff']['public_key'] === BTCPublicKey) {
        assets.push(response[i])
      }
    }
  })
}

export function getTransportAssets (BCDBPublicKey, phase, assets) {
  getConnection().listOutputs(BCDBPublicKey).then(response => {
    for (let i = 0; i < response.length; i++) {
      getConnection().getTransaction(response[i].transaction_id).then(response => {
        if (response['metadata'].hasOwnProperty('phase')) {
          if (response['metadata']['phase'] === phase) {
            getConnection().getTransaction(response['asset']['id']).then(response => {
              const asset = response['asset']
              asset['id'] = response['id']
              assets.push(asset)
            })
          }
        }
      })
    }
  })
}
