const options = {
  headers: {
    accept: 'application/json, text/plain, */*',
    'accept-language': 'es-US,es-419;q=0.9,es;q=0.8,it;q=0.7',
    'apollographql-client-name': 'indexer',
    'content-type': 'application/json',
    'sec-ch-ua': '".Not/A)Brand";v="99", "Google Chrome";v="103", "Chromium";v="103"',
    'sec-ch-ua-mobile': '?0',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'same-site',
  },
  referrer: 'https://objkt.com/',
  referrerPolicy: 'strict-origin-when-cross-origin',
  mode: 'cors',
  credentials: 'omit',
  method: 'POST',
}

const users = {
  getTopBuyers: () =>
    new Promise((resolve, reject) => {
      fetch('https://api2.objkt.com/v1/graphql', {
        ...options,
        body:
          '{"operationName":"getSalesStats","variables":{"limit":10,"days":1,"type":"buyer"},"query":"query getSalesStats($type: sales_stat_type!, $days: Int, $limit: Int = 10) {\\n  sales_stat(\\n    where: {interval_days: {_eq: $days}, _and: {type: {_eq: $type}}}\\n    order_by: {rank: asc}\\n    limit: $limit\\n  ) {\\n    ...SalesStats\\n    __typename\\n  }\\n}\\n\\nfragment SalesStats on sales_stat {\\n  id\\n  interval_days\\n  rank\\n  type\\n  volume\\n  subject {\\n    ...UserDefault\\n    __typename\\n  }\\n  __typename\\n}\\n\\nfragment UserDefault on holder {\\n  address\\n  alias\\n  website\\n  twitter\\n  description\\n  tzdomain\\n  flag\\n  logo\\n  __typename\\n}\\n"}',
      })
        .then(res => res.json())
        .then(res => resolve(res.data.sales_stat))
        .catch(err => reject(err))

      //   {
      //     "id": 101,
      //     "interval_days": 1,
      //     "rank": 1,
      //     "type": "buyer",
      //     "volume": 4743000000,
      //     "subject": {
      //       "address": "tz1XTEx1VGj6pm7Wh2Ni2hKQCWYSBxjnEsE1",
      //       "alias": null,
      //       "website": null,
      //       "twitter": null,
      //       "description": null,
      //       "tzdomain": null,
      //       "flag": "none",
      //       "logo": null,
      //       "__typename": "holder"
      //     },
      //     "__typename": "sales_stat"
      //   }
    }),
  getTopSellers: () =>
    new Promise((resolve, reject) => {
      fetch('https://api2.objkt.com/v1/graphql', {
        ...options,
        body:
          '{"operationName":"getSalesStats","variables":{"limit":10,"days":1,"type":"seller"},"query":"query getSalesStats($type: sales_stat_type!, $days: Int, $limit: Int = 10) {\\n  sales_stat(\\n    where: {interval_days: {_eq: $days}, _and: {type: {_eq: $type}}}\\n    order_by: {rank: asc}\\n    limit: $limit\\n  ) {\\n    ...SalesStats\\n    __typename\\n  }\\n}\\n\\nfragment SalesStats on sales_stat {\\n  id\\n  interval_days\\n  rank\\n  type\\n  volume\\n  subject {\\n    ...UserDefault\\n    __typename\\n  }\\n  __typename\\n}\\n\\nfragment UserDefault on holder {\\n  address\\n  alias\\n  website\\n  twitter\\n  description\\n  tzdomain\\n  flag\\n  logo\\n  __typename\\n}\\n"}',
      })
        .then(res => res.json())
        .then(res => resolve(res.data.sales_stat))
        .catch(err => reject(err))

      //   {
      //     "id": 1,
      //     "interval_days": 1,
      //     "rank": 1,
      //     "type": "seller",
      //     "volume": 4000000000,
      //     "subject": {
      //       "address": "tz1YJ5Q7c3CEghiSvPJy3z6P67kKyHWqSXtr",
      //       "alias": null,
      //       "website": null,
      //       "twitter": null,
      //       "description": null,
      //       "tzdomain": "cverso.tez",
      //       "flag": "none",
      //       "logo": null,
      //       "__typename": "holder"
      //     },
      //     "__typename": "sales_stat"
      //   }
    }),
    getTransactions: user =>
     new Promise((resolve, reject) => {
      
      fetch(`https://api.jakartanet.tzkt.io/v1/accounts/${user}/operations?entrypoint=collect&target=KT1MbXntDHjtwYwu3YEpJy9FRciGuku1XD8u&type=transaction`)
        .then(res => res.json())
        .then(res => resolve(res))
        .catch(err => reject(err))
     }),

    //  [
    //   {
    //     "type": "transaction",
    //     "id": 15499869,
    //     "level": 572015,
    //     "timestamp": "2022-08-11T13:52:41Z",
    //     "block": "BLyY6t1hx5L1NzLCsTuqHM6jERrUqsoEdV4e1FWdBFyXzskj4w4",
    //     "hash": "opBPbregkB5MkLw47q52st57iYg1q46hrCp3v8ENxwhmqq3W2f3",
    //     "counter": 580115,
    //     "sender": {
    //       "address": "tz1UHPc5kAZU5Gsc9Kvbqgpb8qMHsnVysMWE"
    //     },
    //     "gasLimit": 9456,
    //     "gasUsed": 4373,
    //     "storageLimit": 67,
    //     "storageUsed": 0,
    //     "bakerFee": 1251,
    //     "storageFee": 0,
    //     "allocationFee": 0,
    //     "target": {
    //       "address": "KT1MbXntDHjtwYwu3YEpJy9FRciGuku1XD8u"
    //     },
    //     "targetCodeHash": -348483484,
    //     "amount": 1000000,
    //     "parameter": {
    //       "entrypoint": "collect",
    //       "value": "2"
    //     },
    //     "status": "applied",
    //     "hasInternals": true
    //   }
    // ]

  getUserById: id =>
    new Promise((resolve, reject) => {
      const query = `query getUserById {
      holder_by_pk(address: "${id}") {
        address
        alias
        description
        email
        github
        instagram
        logo
        facebook
      }
    }`
      fetch('https://api2.objkt.com/v1/graphql', {
        ...options,
        body: JSON.stringify({ query }),
      })
        .then(res => res.json())
        .then(res => resolve(res.data.holder_by_pk))
        .catch(err => reject(err))
    }),
  searchUser: name =>
    new Promise((resolve, reject) => {
      const query = `query searchUser {
        holder( limit: 10,
                where: {_or: [{address: {_regex: "$${name}"}}, 
                              {alias: {_regex: "${name}"}},
                              {tzdomain:{_regex: "${name}"}}
                            ]},
                order_by: {sales_stats_aggregate: {count: asc}, 
                          alias: asc_nulls_last, 
                          tzdomain: asc_nulls_last, 
                          inserted_at: asc_nulls_last}
              ) {
          address
          alias
          logo
          tzdomain
        }
      }`
      fetch('https://api2.objkt.com/v1/graphql', {
        ...options,
        body: JSON.stringify({ query }),
      })
        .then(res => res.json())
        .then(res => resolve(res.data.holder))
        .catch(err => reject(err))
    }),
  getEventsLive: (user, type, limit) =>
    new Promise((resolve, reject) => {
      const query = `query compra {
        event(limit: 30, order_by: {timestamp: desc, id: desc}, where: {timestamp: {_is_null: false}, _or: [{creator_address: {_eq: "${user}"}}, {recipient_address: {_eq: "${user}"}}], event_type: {_eq: "ask_purchase"}}, offset: 0) {
          id
          price
          amount
          event_type
          creator {
            address
            alias
            logo
          }
          recipient {
            address
            alias
            logo
          }
          token {
            thumbnail_uri
            fa_contract
            token_id
          }
          fa {
            name
          }
        }
      }`
      
      fetch('https://api2.objkt.com/v1/graphql', {
        ...options,
        body: JSON.stringify({ query }),
      })
        .then(res => res.json())
        .then(res => resolve(res.data.event))
        .catch(err => reject(err))

      // data: {event: [,…]}
      // event: [,…]
      // 0: {id: 29387086, amount: 1, price: null, event_type: "transfer", timestamp: "2022-07-29T09:01:29+00:00",…}
      // amount: 1
      // creator: {address: "tz1NBZbCJG5rvVPW83LcD53UPg11vZug8FRc", alias: "ineedbeer",…}
      // event_type: "transfer"
      // fa: {
      // collection_id: null
      // collection_type: "open"
      // contract: "KT1RJ6PbjHpwc3M5rw5s2Nbmefwbuwbdxton"
      // name: "hic et nunc"
      // path: "hicetnunc"
      // __typename: "fa"
      // fa_contract: "KT1RJ6PbjHpwc3M5rw5s2Nbmefwbuwbdxton"
      // id: 29387086
      // ophash: "opVQ6Re3HN3wbiycBYzqKi7zKT4RuLujx6G7cFadAeRWc8n3oKx"
      // price: null
      // recipient: {address: "tz1XTEx1VGj6pm7Wh2Ni2hKQCWYSBxjnEsE1", alias: null, logo: null, tzdomain: null,…}
      // timestamp: "2022-07-29T09:01:29+00:00"
      // token: {
      // artifact_uri: "ipfs://QmSoh3rT3f2zx8vzB2wHuWtnFZQaoD6Gg2R21bqbcD3E6F"
      // display_uri: "ipfs://Qmc788TQKqyEncSvkndiakFL95DP8D7LFyGdJ18YRcZvdB"
      // fa_contract: "KT1RJ6PbjHpwc3M5rw5s2Nbmefwbuwbdxton"
      // mime: "image/jpeg"
      // pk: 1575133
      // thumbnail_uri: "ipfs://QmNrhZHUaEqxhyLfqoq1mtHSipkWHeT31LNHb1QEbDHgnc"
      // token_id: "111342"
      // __typename: "token"}
      // token_pk: 1575133
      // __typename: "event"
    }),
}

export { users }
