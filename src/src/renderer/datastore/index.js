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
  // Initiates db with first run, consists out of keypair for btc and BCdb, assigns role of sending actor.
  setUserDataPath()
  if (!(fs.existsSync(remote.app.getPath('userData')))) {
    generateRoles()
  }
}

export function getWallet (role) {
  const db = {}
  db.wallet = new Datastore(path.join(remote.app.getPath('userData'), role.concat('.db')))
  db.wallet.loadDatabase()
  return db.wallet
}

function setUserDataPath () {
  let openLogisticsPath = path.join(remote.app.getPath('userData'), '..', 'OpenLogistics')
  remote.app.setPath('userData', openLogisticsPath)
}

export function generateRoles () {
  const roles = ['sending', 'receiving', 'transporting']

  for (let i = 0; i < roles.length; i++) {
    let wallet = new Datastore({
      filename: path.join(remote.app.getPath('userData'), roles[i].concat('.db')),
      autoload: true
    })

    wallet.insert(generateWallet(), function (err) {
      if (err) {
        console.log(err.stack)
      }
    })
  }
}

function generateWallet () {
  const bitcoinLib = require('bitcoinjs-lib')
  const driver = require('bigchaindb-driver')

  const BTCKeyPair = bitcoinLib.ECPair.makeRandom()
  const BCDBkeyPair = new driver.Ed25519Keypair()

  return {
    bitcoin: {
      address: BTCKeyPair.getAddress().toString(),
      publickey: BTCKeyPair.getPublicKeyBuffer().toString('hex'),
      privatekey: BTCKeyPair.toWIF().toString()
    },
    bigchainDB: {
      publickey: BCDBkeyPair.publicKey,
      privatekey: BCDBkeyPair.privateKey
    }
  }
}
