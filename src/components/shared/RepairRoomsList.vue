<template>
  <v-data-table :headers="roomsWithRepairsHeaders" :items="roomsWithRepairs" class="elevation-1">
    <template slot="items" slot-scope="rooms">
      <td>{{ rooms.item.number }}</td>
      <td>{{ rooms.item.repairsCount }}</td>
      <td>{{ rooms.item.announceAt }}</td>
    </template>
    <template slot="pageText" slot-scope="props">
      Rooms {{ props.pageStart }} - {{ props.pageStop }} of {{ props.itemsLength }}
    </template>
  </v-data-table>
</template>

<script>
// @ts-check
export default {
  data() {
    return {
      roomsWithRepairsHeaders: [
        {
          text: "Room",
          value: "number"
        },
        {
          text: "Pendind Repairs",
          value: "repairsCount"
        },
        {
          text: "Last Announcement",
          value: "announceAt"
        }
      ],
      roomsWithRepairs: [
        {
          number: 10,
          repairsCount: 2,
          announceAt: '12/02/2018 12:00'
        },
        {
          number: 11,
          repairsCount: 1,
          announceAt: '12/02/2018 17:00'
        },
        {
          number: 15,
          repairsCount: 3,
          announceAt: '15/02/2018 09:00'
        },
        {
          number: 17,
          repairsCount: 1,
          announceAt: '18/02/2018 22:00'
        },
        {
          number: 110,
          repairsCount: 1,
          announceAt: '18/02/2018 20:30'
        },
        {
          number: 112,
          repairsCount: 3,
          announceAt: '22/02/2018 13:32'
        },
        {
          number: 152,
          repairsCount: 1,
          announceAt: '23/02/2018 15:20'
        },
        {
          number: 153,
          repairsCount: 1,
          announceAt: '23/02/2018 11:00'
        },
        {
          number: 160,
          repairsCount: 3,
          announceAt: '01/03/2018 12:00'
        },
        {
          number: 161,
          repairsCount: 1,
          announceAt: '01/03/2018 16:45'
        },
        {
          number: "Pool",
          repairsCount: 1,
          announceAt: '03/03/2018 18:12'
        }
      ]
    };
  }
};
</script>
