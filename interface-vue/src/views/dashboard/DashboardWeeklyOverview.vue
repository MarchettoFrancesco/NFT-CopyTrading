<template>
  <v-card>
    <v-card-title class="align-start">
      <span>Following</span>

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
        <v-list-item
          v-for="(data, index) in following"
          :key="data.address"
          @click="$emit('click', data.address)"
          :class="`d-flex px-0 ${index > 0 ? 'mt-4' : ''}`"
          ><v-list-item-icon
            ><v-img contain max-height="30" max-width="30" :src="data.img" class="me-3 rounded-circle"> </v-img
          ></v-list-item-icon>
          <v-list-item-content>
            <span class="name-space">{{ data.name }}</span>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script>
// eslint-disable-next-line object-curly-newline
import { mdiDotsVertical, mdiTrendingUp, mdiCurrencyUsd } from '@mdi/js'

export default {
  props: {
    following: {
      type: Array,
      default: () => [],
    },
  },
  setup() {
    return {
      icons: {
        mdiDotsVertical,
        mdiTrendingUp,
        mdiCurrencyUsd,
      },
    }
  },
}
</script>
