import Datastore from 'nedb'
import path from 'path'
import fs from 'fs'
import { remote } from 'electron'

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
  db.wallet = new Datastore(path.join(remote.app.getPath('userData'), 'wallet.db'))
  db.wallet.loadDatabase()
  return db.wallet
}

function setUserDataPath () {
  let openLogisticsPath = path.join(remote.app.getPath('userData'), '..', 'OpenLogistics')
  remote.app.setPath('userData', openLogisticsPath)
}

function generateWallet () {
  let bitcoin = require('bitcoinjs-lib')
  let keyPair = bitcoin.ECPair.makeRandom()
  let address = keyPair.getAddress()

  return {
    publickey: address.toString(),
    privatekey: keyPair.toWIF().toString()
  }
}
