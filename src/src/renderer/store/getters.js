const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  bitcoin: state => state.wallet.bitcoin,
  bigchainDB: state => state.wallet.bigchainDB,
  balance: state => state.wallet.balance,
  role: state => state.wallet.role
}
export default getters
