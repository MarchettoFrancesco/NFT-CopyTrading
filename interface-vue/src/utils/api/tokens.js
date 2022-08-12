import { config } from '@/utils'

export function bytes2Char(hex) {
  return Buffer.from(hex2buf(hex)).toString('utf8')
}
export const hex2buf = hex => {
  return new Uint8Array(hex.match(/[\da-f]{2}/gi).map(h => parseInt(h, 16)))
}
const tokens = {
  getTokens: () =>
    new Promise((resolve, reject) => {
      const get = async () => {

        const response = await fetch(
          `https://api.jakartanet.tzkt.io/v1/contracts/${config.contractAddress}/bigmaps/data/keys`,
        )

        const response1 = await fetch(
          `https://api.jakartanet.tzkt.io/v1/contracts/${config.tokenAddress}/bigmaps/token_metadata/keys`,
        )
        const d1 = await response.json()
        const d2 = await response1.json()

        const tokens = []

        d2.forEach(async (ele, i) => {
          const link = bytes2Char(ele.value.token_info[''])
            .split('//')
            .at(-1)

          let data = await fetch('https://ipfs.io/ipfs/' + link)
          data = await data.json()
          data.image = 'https://ipfs.io/ipfs/' + data.image.slice(7)
          data = { ...data, ...d1[i].value }
          tokens.push(data)
        })
        resolve(tokens)
      }
      return get()
    }),
}
export { tokens }
