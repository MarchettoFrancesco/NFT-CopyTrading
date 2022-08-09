<template>
  <v-card>
    <v-card-title class="align-start">
      <span>Activity</span>
      <v-spacer></v-spacer>
    </v-card-title>
    <v-card-text>
      <v-data-table :headers="headers" :items="activity" class="elevation-1">
        <template #[`item.from`]="{item}">
          <span class="name-space" style="display:inline-block">{{ item.from }}</span>
        </template>
        <template #[`item.to`]="{value}">
          <span class="name-space" style="display:inline-block">{{ value }}</span>
        </template>
        <template #[`item.preview`]="{item}">
          <v-avatar color="primary">
          <img :src="item.preview">
          </img></v-avatar>
        </template>
        <template #[`item.price`]="{item}">
          {{ item.price | tezos }}
        </template>
      </v-data-table>

      <!-- <v-list>
        <v-divider Inset></v-divider>
        <v-list-item v-for="(data, index) in activity" :key="index" :class="`d-flex px-0 ${index > 0 ? 'mt-4' : ''}`">
          <v-img
            contain
            max-height="30"
            max-width="30"
            :src="`https://ipfs.io/${data.token.thumbnail_uri.replace(':/', '')}`"
            class="me-3 rounded-circle"
          >
          </v-img>
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
          <div class="me-auto pe-2">
            {{ data.price | tezos }}
          </div>
        </v-list-item>
      </v-list> -->
    </v-card-text>
  </v-card>
</template>

<script>
import { mdiDotsVertical, mdiMenuUp } from '@mdi/js'

export default {
  data() {
    return {
      headers: [
        { text: 'Type', value: 'event_type', width: '100px' },
        { text: 'From', value: 'from', class: 'name-space' },
        { text: 'To', value: 'to', class: 'name-space' },
        { text: 'Preview', value: 'preview' },
        { text: 'Price', value: 'price', width: '200px', align: 'center' },
        { text: 'Action', value: 'action', width: '100px' },
      ],
      icons: { mdiDotsVertical, mdiMenuUp },
    }
  },
  props: {
    activity: {
      type: Array,
    },
  },
}
</script>
