export function setSellers(state, value) {
  state.lastUpdateSellers = new Date()
  state.topSellers = value
}
export function setBuyers(state, value) {
  state.lastUpdateBuyers = new Date()
  state.topBuyers = value
}
