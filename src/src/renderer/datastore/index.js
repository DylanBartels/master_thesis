import Datastore from 'nedb'
import path from 'path'
import fs from 'fs'
import { remote } from 'electron'

export function getConnection () {
  const driver = require('bigchaindb-driver')

  return new driver.Connection(process.env.APP_URL, {
    app_id: process.env.APP_ID,
    app_key: process.env.APP_KEY
  })
}

export function initLocalDB () {
  setUserDataPath()

  if (!(fs.existsSync(remote.app.getPath('userData')))) {
    let wallet = new Datastore({
      filename: path.join(remote.app.getPath('userData'), 'wallet.db'),
      autoload: true
    })

    wallet.insert(generateWallet(), function (err) {
      if (err) {
        console.log(err.stack)
      }
    })
  }
}

export function getWallet () {
  const db = {}
  db.wallet = new Datastore(path.join(remote.app.getPath('userData'), process.env.WALLET))
  db.wallet.loadDatabase()
  console.log(process.env.WALLET)
  return db.wallet
}

function setUserDataPath () {
  let openLogisticsPath = path.join(remote.app.getPath('userData'), '..', 'OpenLogistics')
  remote.app.setPath('userData', openLogisticsPath)
}

function generateWallet () {
  const bitcoin = require('bitcoinjs-lib')
  const driver = require('bigchaindb-driver')
  // const bip39 = require('bip39')

  const BTCKeyPair = bitcoin.ECPair.makeRandom()
  const BTCAddress = BTCKeyPair.getAddress()
  const BCDBkeyPair = new driver.Ed25519Keypair()
  // const BCDBkeyPair = new driver.Ed25519Keypair(bip39.mnemonicToSeed('keyseed').slice(0, 32))

  return {
    bitcoin: {
      publickey: BTCAddress.toString(),
      privatekey: BTCKeyPair.toWIF().toString()
    },
    bigchainDB: {
      publickey: BCDBkeyPair.publicKey,
      privatekey: BCDBkeyPair.privateKey
    }
  }
}
