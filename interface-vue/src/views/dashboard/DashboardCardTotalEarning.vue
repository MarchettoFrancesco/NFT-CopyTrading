<template>
  <v-card>
    <v-card-title class="align-start">
      <span>Activity</span>
      <v-spacer></v-spacer>

      <v-btn
        icon
        small
        class="me-n3 mt-n2"
      >
        <v-icon>
          {{ icons.mdiDotsVertical }}
        </v-icon>
      </v-btn>

    </v-card-title>
    <v-card-text>
      <v-list>
        <v-divider Inset ></v-divider>
        <v-list-item v-for="(data, index) in eventsLive"
              :key="data.id"
              :class="`d-flex px-0 ${index > 0 ? 'mt-4' : ''}`"
            > 
          <div class="d-flex align-center flex-grow-1 flex-wrap">
                <div class="me-auto pe-2">
                  <h4 class="font-weight-semibold name-space">
                    {{ data.event_type }}
                  </h4>
                </div>
              </div>
              
            <v-img
                contain
                max-height="30"
                max-width="30"
                :src="data.token.display_uri"
                class="me-3 rounded-circle"
              ></v-img>
              
            </v-list-item>
      </v-list>
    </v-card-text>

    
  </v-card>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import { API } from '/src/utils/API.js'
import { mdiDotsVertical, mdiMenuUp } from '@mdi/js'

export default {
  data() {
    return{
      eventsLive: [],
    }
  },
  methods: {
    mapUser(user) {
      
      return user
    },
  },
  created(){
    API.users
      .getEventsLive()
      .then(events => events.map(event =>
         this.mapUser(event)
        ))
      .then(res => {(this.eventsLive = res)})
  },

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
    }
  },
}
</script>
