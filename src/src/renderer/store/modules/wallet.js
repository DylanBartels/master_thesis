import { getWallet } from '../../datastore'
import { getAddressUTXO, getBalance } from '../../util/bitcoin'

const wallet = {
  state: {
    bitcoin: '',
    bigchainDB: '',
    assets: null,
    myAssets: null,
    utxo: [],
    balance: '',
    currentRole: 'sending',
    error: null,
    roles: [{
      value: 'sending.db',
      role: 'sending'
    }, {
      value: 'receiving.db',
      role: 'receiving'
    }, {
      value: 'transporting.db',
      role: 'transporting'
    }]
  },
  mutations: {
    SET_WALLET: (state, wallet) => {
      wallet.findOne({}, (err, wallet) => {
        if (err) {
          state.error = err
        } else {
          state.bitcoin = wallet.bitcoin
          state.bigchainDB = wallet.bigchainDB
          getAddressUTXO(wallet.bitcoin.address).then((response) => {
            state.utxo = response.data[0]
          }, (error) => {
            state.utxo = error
          })
          getBalance(wallet.bitcoin.address).then((response) => {
            state.balance = response.data.balance + ' Bitcoin'
          }, (error) => {
            state.balance = error
          })
        }
      })
    },
    SET_ROLE: (state, role) => {
      state.currentRole = role
    }
  },
  actions: {
    ChangeActor ({ commit }, role) {
      commit('SET_WALLET', getWallet(role))
      commit('SET_ROLE', role)
    }
  }
}

export default wallet
