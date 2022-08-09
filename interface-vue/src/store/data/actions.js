import { API } from '/src/utils/API.js'
function mapUser(user) {
  if (!user?.subject?.logo) user.subject.logo = `https://services.tzkt.io/v1/avatars2/${user?.subject?.address}`
  if (!user?.subject?.alias) user.subject.alias = user?.subject?.address
  // if (!this.singleSelect.hasOwnProperty(user.subject.address)) this.singleSelect[user.subject.address] = false
  return user
}
export function getTopBuyers({ commit, state }) {
  // getUserData({ commit, state }, { address: 'tz1Wzwn5KCCnf12wCX9LAPrd9uYR8iPDNSx3' })
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
export async function getUserData({ commit, state }, { address, following }) {
  const i = state.users.findIndex(user => user.address === address)
  if (i === -1) {
    // user not found
    const user = await API.users.getUserById(address)
    if (!user) return
    user.img = user.logo ?? `https://services.tzkt.io/v1/avatars2/${user.address}`
    user.name = user.alias ?? user.address
    user.following = following ?? false
    let users = JSON.parse(JSON.stringify(state.users))
    users.push(user)
    commit('setUsers', users)
  }
  return
}
export async function getUserTransactions({ commit, state }, address) {
  const i = state.users.findIndex(user => user.address === address)
  // user not  found
  if (i === -1) return

  let lastUpdate = state.users[i].lastUpdate
  const now = new Date()
  const nexUpdate = new Date(lastUpdate)
  nexUpdate.setMinutes(nexUpdate.getMinutes() + 1)
  if (!lastUpdate || lastUpdate - now < lastUpdate - nexUpdate) {
    const transactions = await API.users.getEventsLive(address).then(res =>
      res.map(ele => {
        if(address == ele.creator.address){
          return {
              from: ele.creator.alias ?? ele.creator.address,
              to: ele.recipient.alias ?? address,
              price: ele.price,
              preview: `https://ipfs.io/${ele.token.thumbnail_uri.replace(':/', '')}`,
              event_type: 'sold',
            }
          } else {
            return {
              from: ele.creator.alias ?? ele.creator.address,
              to: ele.recipient.alias ?? address,
              price: ele.price,
              preview: `https://ipfs.io/${ele.token.thumbnail_uri.replace(':/', '')}`,
              event_type: 'bought',
            }
          }
         }))
    let users = JSON.parse(JSON.stringify(state.users))
    users[i] = { ...users[i], transactions, lastUpdate: now }
    commit('setUsers', users)
  }

  return
}
