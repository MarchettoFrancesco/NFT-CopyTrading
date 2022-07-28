const users = {
  getTopBuyers: () => new Promise((resolve, reject) => {
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
  getTopSellers: () => new Promise((resolve, reject) => {
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
}
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
export { users }
