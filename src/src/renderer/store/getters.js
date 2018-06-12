const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  bitcoin: state => state.wallet.bitcoin,
  bigchainDB: state => state.wallet.bigchainDB,
  roles: state => state.wallet.roles,
  balance: state => state.wallet.balance,
  utxo: state => state.wallet.utxo
}
export default getters
