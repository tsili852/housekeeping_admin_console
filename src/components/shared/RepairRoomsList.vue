<template>
  <v-data-table :headers="roomsWithRepairsHeaders" :items="roomsWithRepairs" class="elevation-1">
    <template slot="items" slot-scope="rooms">
      <td>{{ rooms.item.Number }}</td>
      <td>{{ rooms.item.PendingRepairsCount }}</td>
      <td>{{ rooms.item.LastAnnouncement | date }}</td>
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
      roomsWithRepairsHeaders: [
        {
          text: "Room",
          value: "Number"
        },
        {
          text: "Pendind Repairs",
          value: "PendingRepairsCount"
        },
        {
          text: "Last Announcement",
          value: "LastAnnouncement"
        }
      ],
      roomsWithRepairs: []
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
      HTTP.get(`Room/pendingrepairs/hotelsn=${this.hotelsn}`)
        .then(response => {
          if (response.status == 200 && response.data) {
            this.roomsWithRepairs = response.data;
          }
        })
    }
  }
};
</script>
