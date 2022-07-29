<template>
<v-container>
  <v-card>
    <div class="d-flex flex-sm-row flex-column">
      <div class="flex-grow-1">
      <v-card-title>
<v-row no-glutters>
      <v-col cols="2" class="text-center"> Follow </v-col>
      <v-col cols="4"> Top Sellers</span> </v-col>
      <v-col cols="6" class="text-right">Amount sold in XTZ:</v-col>
</v-row>
</v-card-title>
        

        <v-card-text>
          <v-list>
          <v-divider Inset
            ></v-divider>
            <v-list-item
              v-for="(data, index) in topSellers"
              :key="data.id"
              :class="`d-flex px-0 ${index > 0 ? 'mt-4' : ''}`"
            > 
            
            <v-switch 
              v-model="singleSelect[data.subject.address]"
              @click="select"
              class="pa-3"
            ></v-switch>
            
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

      <v-divider
        class="my-sm-5 mx-5"
        :vertical="$vuetify.breakpoint.smAndUp"
      ></v-divider>

      <div class="flex-grow-1">
        <v-card-title>
          <v-row no-glutters>
            <v-col cols="2" class="text-center"> Follow </v-col>
            <v-col cols="4"> Top Buyers</span> </v-col>
            <v-col cols="6" class="text-right">Amount bought in XTZ:</v-col>
          </v-row>
          </v-card-title>

        <v-card-text>
          <v-list><v-divider Inset
            ></v-divider>
            <v-list-item
              v-for="(data, index) in topBuyers"
              :key="data.id"
              :class="`d-flex px-0 ${index > 0 ? 'mt-4' : ''}`"
            >
            <v-switch
               v-model="singleSelect[data.subject.address]"
               class="pa-3"
               @click="select"

             ></v-switch>
              <v-img
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
    </div>
  </v-card>
  </v-row>
  </v-container>
</template>
<script>
import { defineComponent } from '@vue/composition-api'
import { API } from '/src/utils/API.js'

export default defineComponent({
  data() {
    return {
      singleSelect: {},
      topBuyers: [],
      topSellers: [],
    }
  },
    mounted(){
      if(localStorage.singleSelect){
        this.singleSelect = JSON.parse(localStorage.singleSelect);
       }
    },
    watch: {
      singleSelect(NewValue) {
        localStorage.singleSelect = JSON.stringify(NewValue);
      }
    },
  methods: {
    mapUser(user) {
      if (!user?.subject?.logo) user.subject.logo = `https://services.tzkt.io/v1/avatars2/${user?.subject?.address}`
      if (!user?.subject?.alias) user.subject.alias = user?.subject?.address
      if(!this.singleSelect.hasOwnProperty(user.subject.address))
          this.singleSelect[user.subject.address]= false
      return user
    },
    select(){
      this.singleSelect= {...this.singleSelect}
    }
  },
  created() {
    API.users
      .getTopBuyers()
      .then(buyers => buyers.map(buyer =>
         this.mapUser(buyer)
        ))
      .then(res => {(this.topBuyers = res)}),
    API.users
      .getTopSellers()
      .then(sellers => sellers.map(seller => 
         this.mapUser(seller)))
      .then(res => (this.topSellers = res))
  },
})
</script>
<style scoped>
.name-space {
  width: 100px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
