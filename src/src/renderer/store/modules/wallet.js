import { getWallet } from '../../datastore'

const wallet = {
  state: {
    bitcoin: '',
    bigchainDB: '',
    assets: null,
    myAssets: null,
    role: 'sending',
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
        }
      })
    },
    SET_ROLE: (state, role) => {
      state.role = role
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
