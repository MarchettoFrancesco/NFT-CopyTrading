<template>
  <v-card flat class="pa-3 mt-2">
    <v-card-text class="d-flex">
      <v-avatar rounded size="120" class="me-6" style="cursor: pointer" @click="$refs.refInputEl.click()">
        <v-img :src="nftImage">
          <template v-slot:placeholder>
            <v-row class="fill-height ma-0 primary" align="center" justify="center">
              <v-icon size="44">
                {{ icons.mdiCamera }}
              </v-icon>
            </v-row>
          </template>
        </v-img>
      </v-avatar>

      <!-- upload photo -->
      <div>
        <v-btn color="primary" class="me-3 mt-5" @click="$refs.refInputEl.click()">
          <v-icon class="d-sm-none">
            {{ icons.mdiCloudUploadOutline }}
          </v-icon>
          <span class="d-none d-sm-block">Upload new photo</span>
        </v-btn>

        <input ref="refInputEl" type="file" accept=".jpeg,.png,.jpg,GIF" :hidden="true" @change="previewFiles" />

        <v-btn color="error" outlined class="mt-5">
          Reset
        </v-btn>
        <p class="text-sm mt-5">
          Allowed JPG, GIF or PNG. Max size of 800K
        </p>
      </div>
    </v-card-text>

    <v-card-text>
      <v-form class="multi-col-validation mt-6" @submit.prevent="mint">
        <v-row>
          <v-col md="6" cols="12">
            <v-text-field v-model="name" label="Name" dense outlined></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field v-model="amount" label="Amout" type="number" step="1" dense outlined></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-textarea v-model="description" label="Description" dense outlined></v-textarea>
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field v-model="symbol" dense label="Symbol" outlined></v-text-field>
          </v-col>

          <v-col cols="12">
            <v-btn color="primary" class="me-3 mt-4" @click="mint">
              Mint
            </v-btn>
            <v-btn color="secondary" outlined class="me-3 mt-4" type="reset" @click.prevent="resetForm">
              Cancel
            </v-btn>
            <v-btn color="primary" class="me-3 mt-4" @click="">
              Start NFT Copy Trading
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
    <v-row>
      <v-col md="4" sm="6" cols="12" v-for="token in tokens">
        <v-card>
          <v-img class="white--text align-end" :src="token.image" height="250" />
          <v-card-text class="position-relative">
            <!-- User Avatar -->
            <v-avatar size="60" color="white" class="avatar-center">
              <v-img :src="`https://services.tzkt.io/v1/avatars2/${token.holder}`"></v-img>
            </v-avatar>
            <!-- Title, Subtitle & Action Button -->
            <div class="d-flex justify-space-between flex-wrap pt-12">
              <div class="me-2 mb-2">
                <v-card-title class="pt-0 px-0">
                  {{ token.name }}
                </v-card-title>
                <v-card-subtitle class="text-xs pa-0">
                  {{ token.description }}
                </v-card-subtitle>
              </div>
              <v-btn color="primary" @click="collect(token.token_id, token.amount)">
                Buy
              </v-btn>
            </div>
            <!-- Mutual Friends -->
            <div class="d-flex justify-space-between align-center mt-8">
              <span class="text--primary font-weight-medium"> cost: {{ token.amount | tezos }} </span>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import { mdiAlertOutline, mdiCloudUploadOutline, mdiCamera } from '@mdi/js'
import { ref } from '@vue/composition-api'
import { NFTStorage } from 'nft.storage/dist/bundle.esm.min.js'
import { tezos } from '@/utils/tezos'
import { config } from '@/utils'
import { API } from '@/utils/API'

const NFT_STORAGE_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDJlODQ1QmE3OTZEMmU5YTRGNzY5YjFhMjEwNjZDQzQwNGIzN2Q1N0MiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY2MDEyNDMwMDEzMiwibmFtZSI6ImFwaGVsaW9zIn0.546qPlU6ENvYHwcollzJlA-_kfIuZxT8OAm7QfgyWxs'

const nftstorage = new NFTStorage({ token: NFT_STORAGE_KEY })

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDJlODQ1QmE3OTZEMmU5YTRGNzY5YjFhMjEwNjZDQzQwNGIzN2Q1N0MiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY2MDEyNDMwMDEzMiwibmFtZSI6ImFwaGVsaW9zIn0.546qPlU6ENvYHwcollzJlA-_kfIuZxT8OAm7QfgyWxs
// aphelios
export default {
  props: {
    accountData: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      nftImage: '',
      name: '',
      description: '',
      amount: 1,
      symbol: '',
      filesContent: null,
      files: null,
      url: '',
      tokens: [],
    }
  },
  methods: {
    previewFiles(event) {
      const nftImage = URL.createObjectURL(event.target.files[0])
      this.filesContent = event.target.files[0]
      console.log(this.filesContent)
      this.nftImage = nftImage
    },
    async mint() {
      console.log(this.filesContent)
      const { url } = await nftstorage.store({
        name: this.name,
        description: this.description,
        decimals: 0,
        symbol: this.symbol,
        image: this.filesContent,
      })
      let metadata = ''
      const contract = await tezos.wallet.at(config.contractAddress)

      for (let i = 0; i < url.length; i++) {
        metadata += url
          .charCodeAt(i)
          .toString(16)
          .slice(-4)
      }
      const op = await contract.methods.mint(this.amount, metadata).send()
      await op.confirmation()
    },
    async collect(id, amount) {
      const contract = await tezos.wallet.at(config.contractAddress)
      const op = await contract.methods.collect(id).send({ amount: amount / 1, mutez: true })
      await op.confirmation(1)
      const ap = await contract.methods.update_token(id).send()
      await ap.confirmation(1)
    },
  },
  setup(props) {
    const status = ['Active', 'Inactive', 'Pending', 'Closed']

    const accountDataLocale = ref(JSON.parse(JSON.stringify(props.accountData)))

    const resetForm = () => {
      accountDataLocale.value = JSON.parse(JSON.stringify(props.accountData))
    }
    return {
      status,
      accountDataLocale,
      resetForm,
      icons: {
        mdiAlertOutline,
        mdiCloudUploadOutline,
        mdiCamera,
      },
    }
  },
  mounted() {
    API.tokens.getTokens().then(res => {
      console.log(res)
      this.tokens = res
    })
  },
}
</script>
