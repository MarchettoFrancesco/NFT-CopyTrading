<template>
  <v-container>
    <v-card>
      <div class="d-flex flex-sm-row flex-column">
        <div class="flex-grow-1">
          <v-card-title>
            <v-row no-glutters>
              <v-col cols="2" class="text-center"> Follow </v-col>
              <v-col cols="4"> Top Sellers </v-col>
              <v-col cols="6" class="text-right">Amount sold in XTZ:</v-col>
            </v-row>
          </v-card-title>

          <v-card-text>
            <v-list>
              <v-divider Inset></v-divider>
              <v-list-item
                v-for="(data, index) in topSellers"
                :key="data.id"
                :class="`d-flex px-0 ${index > 0 ? 'mt-4' : ''}`"
              >
               <v-btn
              color="primary"
              style="text-transform: none !important;width:80px"
              class="ma-2"
              small
              :outlined="singleSelect[data.subject.address]"
              @click="select(data.subject.address)"
            >
              {{singleSelect[data.subject.address]?'unfollow':'follow'}}
            </v-btn>
                <v-img
                  contain
                  max-height="30"
                  max-width="30"
                  :src="data.subject.logo"
                  class="me-3 rounded-circle"
                ></v-img>

                <div class="d-flex align-center flex-grow-1 flex-wrap">
                  <div class="me-auto pe-2">
                    <h4 class="font-weight-semibold name-space">
                      {{ data.subject.alias }}
                    </h4>
                  </div>

                  <span class="font-weight-semibold success--text">{{ data.volume | tezos }}</span>
                </div>
              </v-list-item>
            </v-list>
          </v-card-text>
        </div>

        <v-divider class="my-sm-5 mx-5" :vertical="$vuetify.breakpoint.smAndUp"></v-divider>

        <div class="flex-grow-1">
          <v-card-title>
            <v-row no-glutters>
              <v-col cols="2" class="text-center"> Follow </v-col>
              <v-col cols="4"> Top Buyers </v-col>
              <v-col cols="6" class="text-right">Amount bought in XTZ:</v-col>
            </v-row>
          </v-card-title>

          <v-card-text>
            <v-list
              ><v-divider Inset></v-divider>
              <v-list-item
                v-for="(data, index) in topBuyers"
                :key="data.id"
                :class="`d-flex px-0 ${index > 0 ? 'mt-4' : ''}`"
              ><v-btn
              color="primary"
              style="text-transform: none !important;width:80px"
              class="ma-2"
              small
              :outlined="singleSelect[data.subject.address]"
              @click="select(data.subject.address)"
            >
              {{singleSelect[data.subject.address]?'unfollow':'follow'}}
            </v-btn>
                <v-img max-height="30" max-width="30" :src="data.subject.logo" class="me-3 rounded-circle"></v-img>

                <div class="d-flex align-center flex-grow-1 flex-wrap">
                  <div class="me-auto pe-2">
                    <h4 class="font-weight-semibold name-space">
                      {{ data.subject.alias }}
                    </h4>
                  </div>

                  <span class="font-weight-semibold success--text">{{ data.volume | tezos }}</span>
                </div>
              </v-list-item>
            </v-list>
          </v-card-text>
        </div>
      </div>
    </v-card>
    <v-row class="pt-6">
      <v-col cols="12" md="6">
        <v-text-field
          rounded
          dense
          outlined
          class="app-bar-search flex-grow-0"
          hide-details
          v-model="search"
          :prepend-inner-icon="icons.mdiMagnify"
          placeholder="search"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="6" lg="4" class="align-self-start" v-for="user in users" :key="user.address">
        <v-card color="text-center">
          <v-card-text class="d-flex flex-column justify-center align-center">
            <v-avatar color="primary" class="mt-2" icon size="56"><img :src="user.logo"></img> </v-avatar>
            <h6 class="text-xl mt-2 font-weight-medium name-space" style="width:70%">
              {{ user.alias }}
            </h6>
            <span class="text-sm mt-2 font-weight-medium name-space" style="width:50%">
              {{ user.address }}
            </span>
          </v-card-text>
          <v-card-text>
          <v-btn
              color="primary"
              style="text-transform: none !important;width:80px"
              class="mt-4"
              small
              :outlined="singleSelect[user.address]"
              @click="select(user.address)"
            >
              {{singleSelect[user.address]?'Unfollow':'Follow'}}
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { defineComponent } from '@vue/composition-api'
import { API } from '/src/utils/API.js'
import { mapGetters, mapActions } from 'vuex'
import { mdiMagnify } from '@mdi/js'
export default defineComponent({
  data() {
    return {
      singleSelect: {},
      search: null,
      users: [],
      icons: {
        mdiMagnify,
      },
      timeOut:null
    }
  },
  mounted() {
    if (localStorage.singleSelect) {
      this.singleSelect = JSON.parse(localStorage.singleSelect)
    }
    API.users.searchUser('').then(
      res =>
        (this.users = res.map(user =>this.mapSearch(user))),
    )
  },
  watch: {
    singleSelect(NewValue) {
      localStorage.singleSelect = JSON.stringify(NewValue)
    },
    search(val) {
      clearTimeout(this.timeOut)// avoid fecth data if user writes before 1.5s
      this.timeOut=setTimeout(()=>{
        API.users.searchUser(val).then(res=>(this.users = res.map(user =>this.mapSearch(user))))}, 
      1000*1.5) // await 1.5s first to get data from internet
    },
  },
  methods: {
    ...mapActions('data', ['getTopBuyers', 'getTopSellers']),
    mapUser(user) {
      if (!user?.subject?.logo) user.subject.logo = `https://services.tzkt.io/v1/avatars2/${user?.subject?.address}`
      if (!user?.subject?.alias) user.subject.alias = user?.subject?.address
      if (!this.singleSelect.hasOwnProperty(user.subject.address)) this.singleSelect[user.subject.address] = false
      return user
    },
    mapSearch(user){
       return{
            alias: user.alias??user.tzdomain ?? user.address,
            logo: user.logo ?? `https://services.tzkt.io/v1/avatars2/${user.address}`,
            address: user.address,
          }
    },
    select(address) {
      const following = {...this.singleSelect}
      if(this.singleSelect[address])
         delete following[address]
      else
        following[address]=true
      this.singleSelect = following
    },
  },
  computed: {
    ...mapGetters('data', ['topBuyers', 'topSellers']),
  },
  created() {
    this.getTopBuyers()
    this.getTopSellers()
  },
})
</script>
