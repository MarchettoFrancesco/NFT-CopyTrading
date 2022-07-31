import { API } from '/src/utils/API.js'
function mapUser(user) {
  if (!user?.subject?.logo) user.subject.logo = `https://services.tzkt.io/v1/avatars2/${user?.subject?.address}`
  if (!user?.subject?.alias) user.subject.alias = user?.subject?.address
  // if (!this.singleSelect.hasOwnProperty(user.subject.address)) this.singleSelect[user.subject.address] = false
  return user
}
export function getTopBuyers({ commit, state }) {
  const now = new Date()
  if (!state.lastUpdateBuyers) {
    API.users
      .getTopBuyers()
      .then(buyers => buyers.map(buyer => mapUser(buyer)))
      .then(res => {
        commit('setBuyers', res)
      })
    return
  }
  const nexUpdate = new Date(state.lastUpdateBuyers)
  nexUpdate.setMinutes(nexUpdate.getMinutes() + 10)
  if (state.lastUpdateBuyers - now < state.lastUpdateBuyers - nexUpdate) {
    API.users
      .getTopBuyers()
      .then(buyers => buyers.map(buyer => mapUser(buyer)))
      .then(res => {
        commit('setBuyers', res)
      })
    return
  }
}
export function getTopSellers({ commit, state }) {
  if (!state.lastUpdateSellers) {
    API.users
      .getTopSellers()
      .then(buyers => buyers.map(buyer => mapUser(buyer)))
      .then(res => {
        commit('setSellers', res)
      })
    return
  }
  const now = new Date()
  const nexUpdate = new Date(state.lastUpdateSellers)
  nexUpdate.setMinutes(nexUpdate.getMinutes() + 10)
  if (state.lastUpdateSellers - now < state.lastUpdateSellers - nexUpdate) {
    API.users
      .getTopSellers()
      .then(buyers => buyers.map(buyer => mapUser(buyer)))
      .then(res => {
        commit('setSellers', res)
      })
    return
  }

}
