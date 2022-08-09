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
          <v-avatar color="primary" size="36">
          <img :src="item.preview"/>
          </v-avatar>
        </template>
        <template #[`item.price`]="{item}">
          {{ item.price | tezos }}
        </template>
      </v-data-table>
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
