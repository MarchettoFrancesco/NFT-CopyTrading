<template>
  <v-card>
    <v-card-title class="align-start">
      <span>Activity</span>
      <v-spacer></v-spacer>
    </v-card-title>
    <v-card-text>
      <v-data-table :headers="headers" :items="activity" item-key="creator" class="elevation-1">
          <template #[`item.transfer_type`]="{item}">
          <td>{{ item.transfer_type }}</td>
        </template>
        <template #[`item.from`]="{item}">
          <td><span class="name-space">{{ item.from }}</span></td>
        </template>
        <template #[`item.to`]="{item}">
          <td><span class="name-space">{{ item.to }}</span></td>
        </template>
        <template #[`item.preview`]="{item}">
              <div class="img-circle img-circle--size" v-bind:style="{backgroundImage: `url('https://ipfs.io/${data.token.thumbnail_uri.replace(':/', '')}')` , backgroundSize: 'cover', backgroundPosition: 'center' }"></div>
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
import sergio from './datatable-data'

export default {
  data() {
    return {
      headers: [
        { text: 'type', value: 'event_type' },
        { text: 'From', value: 'from' },
        { text: 'To', value: 'to' },
        { text: 'Preview', value: 'preview' },
        { text: 'Price', value: 'price' },
        { text: 'Action', value: 'action' },
      ],
      icons: { mdiDotsVertical, mdiMenuUp },
    }
  },
  props: {
    activity: {
      type: Array,
    },
  },
  watch:{
    activity(val){
      console.log(val)
    }
  }
}
</script>
