<template>
  <v-data-table :headers="pendingRepairsHeaders" :items="pendingRepairs" class="elevation-1">
    <template slot="items" slot-scope="rooms">
      <td>{{ rooms.item.roomNumber }}</td>
      <td>{{ rooms.item.description }}</td>
      <td>{{ rooms.item.announceTime | date }}</td>
    </template>
    <template slot="pageText" slot-scope="props">
      Rooms {{ props.pageStart }} - {{ props.pageStop }} of {{ props.itemsLength }}
    </template>
  </v-data-table>
</template>

<script>
// @ts-check
import { HTTP } from "../../http-common";
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      pendingRepairsHeaders: [
        {
          text: "Room",
          value: "roomNumber"
        },
        {
          text: "Description",
          value: "description"
        },
        {
          text: "AnnouncedAt",
          value: "announceTime"
        }
      ],
      pendingRepairs: []
    };
  },
  watch: {
    hotelsn: function(val) {
      this.getRoomsWithPending();
    }
  },
  computed: {
    ...mapGetters(["hotelsn"])
  },
  created() {
    this.getRoomsWithPending();
  },
  methods: {
    getRoomsWithPending() {
      HTTP.get(`Repair/pending/hotelsn=${this.hotelsn}`)
        .then(response => {
          if (response.status == 200 && response.data) {
            this.pendingRepairs = response.data;
          }
        })
    }
  }
};
</script>
