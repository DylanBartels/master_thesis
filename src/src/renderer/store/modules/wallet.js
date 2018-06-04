import { getWallet, getConnection } from '../../datastore'

const wallet = {
  state: {
    bitcoin: {
      publickey: '1JwFR2GcjpceGJJGfPws4VWacybp6SJMpu',
      privatekey: 'L1GDPWnYqyX4XJi4SWwJdqq5W8Gbh3crEu6UCZS9fAy1fTTx5NeJ'
    },
    bigchainDB: {
      publickey: '7TYbke3EJrfNNNyFTPA3Xd7iitvY3J9Se5zGG5nN7A6d',
      privatekey: '3ieCPv9vJyvPecyvFnLpyrKRr3L3QAswoFcSDMMeNoFt'
    },
    assets: null,
    role: 'sending',
    connection: null,
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
    },
    SET_ASSETS: (state) => {
      state.assets = new Promise((resolve) => {
        getConnection().searchAssets(state.bitcoin.publickey).then(response => {
          resolve(response)
        })
      }).catch(error => {
        console.log(error)
        return []
      })
    }
  },
  actions: {
    ChangeActor ({ commit }, role) {
      commit('SET_ROLE', role)
      commit('SET_WALLET', getWallet(role))
      commit('SET_ASSETS')
    }
  }
}

export default wallet
