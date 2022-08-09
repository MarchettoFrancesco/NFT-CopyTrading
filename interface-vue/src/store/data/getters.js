export function topSellers(state) {
  return state.topSellers
}
export function topBuyers(state) {
  return state.topBuyers
}
export function following(state) {
  return state.users.filter(user => user.following)
}
// export function userTransactions(state, address) {
//   const user = state.users.find(user => user.address === address)
//   return user?.transactions ?? []
// }
