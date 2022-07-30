<template>
  <v-card>
    <v-card-title class="align-start">
      <span>Activity</span>
      <v-spacer></v-spacer>

      <v-btn icon small class="me-n3 mt-n2">
        <v-icon>
          {{ icons.mdiDotsVertical }}
        </v-icon>
      </v-btn>

    </v-card-title>
    <v-card-text>
      <v-list>
        <v-divider Inset></v-divider>
        <v-list-item v-for="(data, index) in eventsLive" :key="index"
          :class="`d-flex px-0 ${index > 0 ? 'mt-4' : ''}`">
          <div class="d-flex align-center flex-grow-1 flex-wrap">
            <div class="me-auto pe-2">

              <h4 class="font-weight-semibold name-space" v-if="data.creator.alias">
                {{ data.creator.alias }}
              </h4>
              <h4 class="font-weight-semibold name-space" v-else>
                {{ data.creator.address }}
              </h4>
            </div>
          </div>

          <v-img contain max-height="30" max-width="30"
            :src="`https://ipfs.io/${data.token.thumbnail_uri.replace(':/', '')}`" class="me-3 rounded-circle">
          </v-img> 
          
        </v-list-item>
      </v-list>
    </v-card-text> 


  </v-card>
</template>

<script>
import { mdiDotsVertical, mdiMenuUp } from '@mdi/js'
import { API } from '/src/utils/API.js'

export default {
  setup() {
    const totalEarning = [
      {
        avatar: require('@/assets/images/logos/zipcar.png'),
        title: 'Zipcar',
        subtitle: 'Vuejs, React & HTML',
        earning: '$24,895.65',
        progress: '85',
        color: 'primary',
      },
      {
        avatar: require('@/assets/images/logos/bitbank.png'),
        title: 'Bitbank',
        subtitle: 'Sketch, Figma & XD',
        earning: '$8,6500.20',
        progress: '65',
        color: 'info',
      },
      {
        avatar: require('@/assets/images/logos/aviato.png'),
        title: 'Aviato',
        subtitle: 'HTML & angular',
        earning: '$1,2450.80',
        progress: '30',
        color: 'secondary',
      },
    ]

    return {
      totalEarning,
      icons: { mdiDotsVertical, mdiMenuUp },
      followers: {},
      eventsLive: []
    }
  },
  mounted() {
    if (localStorage.singleSelect) {
      this.followers = Object.entries(JSON.parse(localStorage.singleSelect)).filter(([key, value]) => value).map(([key, val]) => key)
    }


    API.users.getEventsLive(this.followers[1]).then(res => {
      console.log(res.data.event);
      this.eventsLive = res.data.event
      console.log(this.eventsLive)
    })


  }
}
</script>
