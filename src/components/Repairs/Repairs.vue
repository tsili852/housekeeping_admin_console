<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12 sm3>
        <div class="panel-container">
          <div class="panel-header">
            <p>Rooms</p>
          </div>
          <div class="actions-container">
            <v-tooltip left>
              <v-btn
                slot="activator"
                style="width:30px;height:30px"
                color="primary" small fab
                :loading="roomsLoading"
                @click.native="getRooms()"
                :disabled="roomsLoading"
                >
                <v-icon>refresh</v-icon>
              </v-btn>
              <span>Refresh</span>
            </v-tooltip>
            <v-btn color="primary" small :outline="onlyPending" @click="onChangeSelection()">
              Pending
            </v-btn>
            <v-btn color="primary" small :outline="!onlyPending" @click="onChangeSelection()">
              All
            </v-btn>
          </div>
            <div class="panel-contents">
            <v-data-table
              :headers="roomHeaders"
              :items="allRooms"
              class="elevation-1"
              must-sort
              :rows-per-page-items="rowsPerPage">
              <template slot="items" slot-scope="rooms">
                <tr :class="{'room-selected': selectedRoom.Number === rooms.item.Number}" @click="onSelectRoom(rooms.item)">
                  <td>{{ rooms.item.Number }}</td>
                  <td>{{ rooms.item.PendingRepairsCount }}/{{ rooms.item.AllRepairsCount }}</td>
                </tr>
              </template>
            </v-data-table>
          </div>
        </div>
      </v-flex>
      <v-flex xs12 sm4>
        <div class="panel-container">
          <div class="panel-header">
            <p>Repairs for room <span style="color:#FFCCBC;font-weight:bold">{{ selectedRoom.Number }}</span></p>
          </div>
          <div class="actions-container">
            <v-tooltip left>
              <v-btn
                slot="activator"
                style="width:30px;height:30px"
                color="primary" small fab
                >
                <v-icon>refresh</v-icon>
              </v-btn>
              <span>Refresh</span>
            </v-tooltip>
            <v-tooltip right>
              <v-btn slot="activator" style="width:30px;height:30px" color="primary" small fab dark>
                <v-icon>add</v-icon>
              </v-btn>
              <span>Announce a Repair</span>
            </v-tooltip>
          </div>
          <div class="panel-contents">
            <v-data-table :items="selectedRoom.Repairs" class="elevation-1" hide-headers must-sort :rows-per-page-items="rowsPerPage">
              <template slot="items" slot-scope="repairs">
                <td v-if="!repairs.item.EndAt"><v-icon color="warning">fa-exclamation-circle</v-icon></td>
                <td v-if="repairs.item.EndAt"><v-icon color="success">fa-check-circle</v-icon></td>
                <td>{{ repairs.item.Description }}</td>
                <td>{{ repairs.item.AnnouncedAt | date }}</td>
              </template>
            </v-data-table>
          </div>
          <!-- <div class="panel-contents">
            <v-data-table :items="selectedRoom.repairs" class="elevation-1" hide-headers must-sort :rows-per-page-items="rowsPerPage">
              <template slot="items" slot-scope="repairs">
                <td v-if="!repairs.item.fixed"><v-icon color="warning">fa-exclamation-circle</v-icon></td>
                <td v-if="repairs.item.fixed"><v-icon color="success">fa-check-circle</v-icon></td>
                <td>{{ repairs.item.description }}</td>
                <td>{{ repairs.item.anouncementTime }}</td>
              </template>
            </v-data-table>
          </div> -->
        </div>
      </v-flex>
      <v-flex xs12 sm5>
        <div class="panel-container" style="padding:20px">
          <form>
            <v-text-field label="Description" v-model="selectedRepair.description">
            </v-text-field>
            <v-text-field label="Amount" v-model="selectedRepair.amount">
            </v-text-field>
            <v-select label="Who Reported ?" v-model="selectedRepair.reportedFrom" :items="whoReportedList"></v-select>
            <img src="https://media-cdn.tripadvisor.com/media/photo-s/07/71/69/ee/alcatraz.jpg" alt="" width="130" height="200">
            <br>
            <v-btn color="success" :outline="!(selectedRepair.status == 'fixed')" small @click="selectedRepair.status = 'fixed'">
              Fixed
            </v-btn>
            <v-btn color="warning" :outline="!(selectedRepair.status == 'started')" small @click="selectedRepair.status = 'started'">
              Started
            </v-btn>
            <br>
            <v-btn color="secondary" small fab>
              <v-icon>save</v-icon>
            </v-btn>
            <v-btn color="error" small fab>
              <v-icon>fa-trash-alt</v-icon>
            </v-btn>
          </form>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
//@ts-check
import { HTTP } from "../../http-common";
import { mapGetters, mapActions } from "vuex";
import dateFilter from "../../filters/date";
import * as _ from 'lodash';

export default {
  data() {
    return {
      rowsPerPage: [15, 30, 50, { text: "All", value: -1 }],
      allRooms: [],
      roomsLoading: false,
      onlyPending: false,
      daysBefore: 30,
      roomHeaders: [
        {
          text: "Room",
          value: "Number"
        },
        {
          text: "Pending/All",
          value: "PendingRepairsCount"
        }
      ],
      selectedRepair: {
        description: "Broken Door",
        amount: "15.4",
        reportedFrom: "Customer",
        status: "fixed"
      },
      whoReportedList: ["Customer", "Maid", "Technician", "Reception"],
      // selectedRoom: {}
      selectedRoom: {
        Number: "",
        RoomID: "",
        Repairs: []
      }
    };
  },
  computed: {
    ...mapGetters(["hotel", "hotelsn", "isHotelSNCorrect"])
  },
  created() {
    this.getRooms();
  },
  methods: {
    getRooms() {
      this.roomsLoading = true;
      HTTP.get(`Room/repairs/hotelsn=${this.hotelsn}&skip=0&take=0&daysBefore=${this.daysBefore}`)
        .then(result => {
          console.log(`Data: ${JSON.stringify(result, null, 2)}`);
          if (result.status == 200 && result.data) {
            this.allRooms = result.data;
            this.selectedRoom.Number = this.allRooms[0].Number;
            this.selectedRoom.Repairs = this.allRooms[0].Repairs;
            // this.selectedRoom = this.allRooms[0];
          }
          this.roomsLoading = false;
        })
        .catch(error => {
          console.log(`Get Rooms Error: ${JSON.stringify(error)}`);
          this.roomsLoading = false;
        });
    },
    onSelectRoom(room) {
      this.selectedRoom.Number = room.Number;
    },
    onChangeSelection() {
      this.onlyPending = !this.onlyPending;
      if (this.daysBefore == 0) {
        this.daysBefore = 30
      }
      else {
        this.daysBefore = 0;
      }

      this.getRooms();
    }
  }
};
</script>

<style scoped>
.panel-container {
  border: 1px solid rgba(123, 133, 201, 0.386);
  border-radius: 5px;
  /* height: 200px; */
  box-shadow: 0 12px 20px -10px rgba(123, 134, 201, 0.28),
    0 4px 20px 0 rgba(0, 0, 0, 0.12), 0 7px 8px -5px rgba(123, 134, 201, 0.2);
  margin-left: 10px;
  margin-right: 10px;
  background-color: #fff;
  margin-bottom: 10px;
  padding: 5px;
}

.panel-header {
  height: 30px;
  padding-top: 2px;
  background: linear-gradient(60deg, rgb(67, 81, 167), #303f9f);
  color: white;
  font-size: 17px;
  text-align: center;
  width: 180px;
  border-radius: 3px;
  margin: auto;
  margin-top: 5px;
  margin-bottom: 10px;
}

.actions-container {
  /* height: 40px; */
  /* border: 1px solid #303f9f; */
  border: 1px solid #bf360c;
  width: fit-content;
  margin: auto;
  margin-bottom: 5px;
  border-radius: 3px;
}

.sub-panel-header {
  height: 30px;
  padding-top: 2px;
  background: linear-gradient(60deg, rgb(193, 82, 49), #bf360c);
  color: white;
  font-size: 17px;
  text-align: center;
  width: fit-content;
  padding-left: 10px;
  padding-right: 10px;
  /* width: 180px; */
  border-radius: 3px;
  margin: auto;
  margin-top: 5px;
  margin-bottom: 10px;
}

.header-link {
  color: white;
  text-decoration: unset;
}

.panel-header:hover {
  background: linear-gradient(60deg, rgb(92, 109, 215), rgb(71, 86, 183));
}

.room-selected {
  background-color: #ffccbc;
}

.rooms-table-tr:hover {
  background-color: #ffccbc;
}
</style>
