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

    
  </v-card>
</template>

<script>
import { mdiDotsVertical, mdiMenuUp } from '@mdi/js'

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
    }
  },
}
</script>
