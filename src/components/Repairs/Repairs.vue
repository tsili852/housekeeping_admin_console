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
            <v-btn color="primary" small :outline="!onlyPending" @click="onChangeSelection()">
              Pending
            </v-btn>
            <v-btn color="primary" small :outline="onlyPending" @click="onChangeSelection()">
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
                :loading="repairsLoading"
                @click.native="getRoomRepairs()"
                :disabled="repairsLoading"
                >
                <v-icon>refresh</v-icon>
              </v-btn>
              <span>Refresh</span>
            </v-tooltip>
            <v-tooltip right>
              <v-btn slot="activator" style="width:30px;height:30px" color="primary" small fab dark @click="addRepair()">
                <v-icon>add</v-icon>
              </v-btn>
              <span>Announce a Repair</span>
            </v-tooltip>
          </div>
          <div class="panel-contents">
            <v-data-table :items="selectedRoom.Repairs" class="elevation-1" hide-headers must-sort :rows-per-page-items="rowsPerPage">
              <template slot="items" slot-scope="repairs">
                <tr :class="{'repair-selected': selectedRepair.RepairID === repairs.item.RepairID}" @click="onSelectRepair(repairs.item)">
                  <td v-if="!(repairs.item.EndAt || repairs.item.StartAt)"><v-icon color="warning">fa-exclamation-circle</v-icon></td>
                  <td v-if="(repairs.item.StartAt && !repairs.item.EndAt)"><v-icon color="info">fa-play-circle</v-icon></td>
                  <td v-if="repairs.item.EndAt"><v-icon color="success">fa-check-circle</v-icon></td>
                  <td>{{ repairs.item.Description }}</td>
                  <td>{{ repairs.item.AnnouncedAt | date }}</td>
                </tr>
              </template>
            </v-data-table>
          </div>
        </div>
      </v-flex>
      <v-flex xs12 sm5>
        <div class="panel-container" :class="{'new-repair': selectedRepair.isNew}" style="padding:20px" v-if="!selectedRepair.isEmpty">
          <form>
            <v-text-field ref="descriptionInputBox" label="Description" clearable v-model="selectedRepair.Description">
            </v-text-field>
            <v-container grid-list-md fluid>
              <v-layout row wrap justify-space-between>
                <v-flex xs5>
                  <v-text-field label="Amount" v-model="selectedRepair.Amount" prepend-icon="fa-euro-sign">
                  </v-text-field>
                </v-flex>
                <v-flex xs6 align-end>
                  <v-select label="Who Reported ?" v-model="selectedRepair.reportedFrom" :items="whoReportedList"></v-select>
                </v-flex>
              </v-layout>
            </v-container>
            <v-select label="Technician" v-model="selectedTechnicianIndex" :items="technicians" item-text="name" item-value="technicianID" v-on:change="onSelectTechnician($event)"></v-select>
            <!-- <v-text-field label="Technician" readonly v-model="selectedRepair.Technician">
            </v-text-field> -->
            <img v-if="selectedRepair.Photo" :src="selectedRepair.Photo" style="width: 200px; height: 300px">
            <p class="repair-label">
              <span style="font-weight:500;">Announced :</span> <span v-if="selectedRepair.AnnouncedAt">{{selectedRepair.AnnouncedAt | date}}</span>
            </p>
            <p class="repair-label">
              <span id="repair-started-date">Started :</span>
              <span v-if="selectedRepair.StartAt">{{selectedRepair.StartAt | date}}</span>
              <span v-else>Not Started</span>
            </p>
            <p class="repair-label">
              <span id="repair-fixed-date">Fixed :</span>
              <span v-if="selectedRepair.EndAt">{{selectedRepair.EndAt | date}}</span>
              <span v-else>Not Fixed</span>
            </p>
            <!-- <img src="https://media-cdn.tripadvisor.com/media/photo-s/07/71/69/ee/alcatraz.jpg" alt="" width="130" height="200"> -->
            <v-btn color="success" :outline="!repairFixed"
                  small @click="onFixRepair()">
              Fixed
            </v-btn>
            <v-btn color="warning" :outline="!repairStarted"
                  small @click="onStartRepair()">
              Started
            </v-btn>
            <br>
            <v-btn color="secondary" small fab @click="onSaveRepair()">
              <v-icon>save</v-icon>
            </v-btn>
            <v-btn color="error" small fab>
              <v-icon>fa-trash-alt</v-icon>
            </v-btn>
          </form>
        </div>
      </v-flex>
    </v-layout>
    <v-snackbar
      :color="snackbarColor"
      v-model="snackbar"
      >
      {{ snackbarMessage }}
      <v-btn dark flat @click.native="snackbar = false">Close</v-btn>
    </v-snackbar>
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
      $refs: {
        descriptionInputBox: HTMLFormElement
      },
      rowsPerPage: [15, 30, 50, { text: "All", value: -1 }],
      allRooms: [],
      roomsLoading: false,
      repairsLoading: false,
      onlyPending: true,
      daysBefore: 0,
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
      emptyRepair: {
        Description: "",
        RepairID: 0,
        Amount: 0,
        AnnouncedAt: null
      },
      selectedRepair: {},
      repairStarted: false,
      repairFixed: false,
      whoReportedList: ["Customer", "Maid", "Technician", "Reception"],
      // selectedRoom: {}
      selectedRoom: {},
      snackbar: false,
      snackbarColor: '',
      snackbarMessage: '',
      technicians: [],
      selectedTechnicianIndex: 0
    };
  },
  computed: {
    ...mapGetters(["hotel", "hotelsn", "isHotelSNCorrect"])
  },
  created() {
    this.getRooms();
    this.getTechnicians();
  },
  methods: {
    getRooms() {
      this.roomsLoading = true;
      HTTP.get(`Room/repairs/hotelsn=${this.hotelsn}&skip=0&take=0&daysBefore=${this.daysBefore}`)
        .then(result => {
          if (result.status == 200 && result.data) {
            this.allRooms = result.data;
            this.selectedRoom.Number = this.allRooms[0].Number;
            this.selectedRoom.RoomID = this.allRooms[0].RoomID;
            this.selectedRoom.Repairs = this.allRooms[0].Repairs;
            this.selectedRoom.HotelSN = this.allRooms[0].HotelSN;

            this.getRoomRepairs();
            // this.selectedRoom = this.allRooms[0];
          }
          this.roomsLoading = false;
        })
        .catch(error => {
          console.log(`Get Rooms Error: ${JSON.stringify(error)}`);
          this.roomsLoading = false;
        });
    },
    getRoomRepairs() {
      this.repairsLoading = true;

      HTTP.get(`Repair/room/hotelsn=${this.hotelsn}&roomid=${this.selectedRoom.RoomID}&daysBefore=365`)
        .then(result => {
          if (result.status == 200 && result.data) {
            this.selectedRoom.Repairs = result.data;
            console.log(`Room Repairs: ${JSON.stringify(result.data, null, 2)}`);
            // this.selectedRoom = this.allRooms[0];
            if (this.selectedRoom.Repairs.length > 0) {
              this.selectedRepair = this.selectedRoom.Repairs[0];
              this.repairFixed = this.selectedRepair.EndAt ? true : false;
              this.repairStarted = this.selectedRepair.StartAt ? true : false;
              this.selectedRepair.isEmpty = false;
              this.selectedTechnicianIndex = this.technicians.map((e) => e.name).indexOf(this.selectedRepair.Technician) + 1;
              if (this.selectedRepair.Photo) {
                this.selectedRepair.Photo = `data:image/png;base64,${this.selectedRepair.Photo}`;
              }
            }
            else {
              this.selectedRepair = this.emptyRepair;
              this.selectedRepair.isEmpty = true;
            }
          }
          this.repairsLoading = false;
        })
        .catch(error => {
          console.log(`Get Repairs for room Error: ${JSON.stringify(error)}`);
          this.repairsLoading = false;
        });
    },
    getTechnicians() {
      HTTP.get(`Technician/hotelsn=${this.hotelsn}`)
        .then(result => {
          if (result.status == 200 && result.data) {
            this.technicians = result.data;
            console.log(`Technicians: ${JSON.stringify(this.technicians, null, 2)}`);
          }
        })
    },
    onSelectRoom(room) {
      this.selectedRoom.Number = room.Number;
      this.selectedRoom.RoomID = room.RoomID;
      this.selectedRoom.HotelSN = room.HotelSN;
      this.getRoomRepairs();
    },
    onSelectRepair(repair) {
      this.selectedRepair = repair;
      this.repairFixed = this.selectedRepair.EndAt ? true : false;
      this.repairStarted = this.selectedRepair.StartAt ? true : false;
      this.selectedTechnicianIndex = this.technicians.map((e) => e.name).indexOf(this.selectedRepair.Technician) + 1;
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
    },
    onStartRepair() {
      if (!this.selectedRepair.StartAt) {
        this.selectedRepair.StartAt = new Date();
        this.repairStarted = true;
      }
    },
    onFixRepair() {
      if (!this.selectedRepair.EndAt) {
        this.selectedRepair.EndAt = new Date();
        this.repairFixed = true;
        if (!this.selectedRepair.StartAt) {
          this.selectedRepair.StartAt = new Date();
          this.repairStarted = true;
        }
      }
    },
    onSelectTechnician(index) {
      this.selectedTechnicianIndex = index;
      console.log(`Select Technician: ${this.selectedTechnicianIndex}`)
    },
    addRepair() {
      let newRepair = {
        Technician: "",
        RoomID: this.selectedRoom.RoomID,
        RepairID: 0,
        Amount: 0,
        Description: "",
        TaskName: "",
        isNew: true,
        isEmpty: false
      };

      this.selectedRepair = newRepair;
      this.$nextTick(() => this.$refs.descriptionInputBox.focus())
    },
    onSaveRepair() {
      if (this.selectedRepair.RepairID > 0) {
        let toUpdate = {
          changeType: '',
          description: this.selectedRepair.Description,
          endtime: this.selectedRepair.EndAt,
          hotelsn: '',
          maintenanceid: null,
          photo: null,
          repairid: this.selectedRepair.RepairID,
          starttime: this.selectedRepair.StartAt,
          technicianid: this.technicians[this.selectedTechnicianIndex - 1].technicianID,
          whoreported: null
        };

        HTTP.post(`Repair/update`, toUpdate)
          .then(result => {
            this.snackbarMessage = "Repair Updated Successfully";
            this.snackbarColor = "success";
            this.snackbar = true;
          })
          .catch(err => {
            this.snackbarMessage = "Repair Update Error";
            this.snackbarColor = "error";
            this.snackbar = true;
            console.log(`Update Repair error: ${JSON.stringify(err, null, 2)}`);
          })
      } else {
        let toAnnounce = {
          hotelsn:  this.selectedRoom.HotelSN,
          roomid: this.selectedRoom.RoomID,
          maintenanceid: null,
          description: this.selectedRepair.Description,
          amount: this.selectedRepair.Amount,
          whoreported: 1,
          technicianid: this.technicians[this.selectedTechnicianIndex - 1].technicianID,
          photo: null
        };

        HTTP.post(`Repair/announce`, toAnnounce)
          .then(result => {
            this.snackbarMessage = "Repair Created Successfully";
            this.snackbarColor = "success";
            this.snackbar = true;
          })
          .catch(err => {
            this.snackbarMessage = "Repair Creation Error";
            this.snackbarColor = "error";
            this.snackbar = true;
            console.log(`Create Repair error: ${JSON.stringify(err, null, 2)}`);
          })
      }
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

.panel-container.new-repair {
  background-color: rgb(240, 255, 241);
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
  background-color: #ffece7;
}

.repair-selected {
  background-color:  #ffece7;
}

.rooms-table-tr:hover {
  background-color: #ffccbc;
}

.repair-label {
  font-size: 15px;
}

#repair-started-date {
  font-weight:500;
  text-decoration:underline;
  text-decoration-color:rgb(206, 158, 3);
}

#repair-fixed-date {
  font-weight:500;
  text-decoration:underline;
  text-decoration-color:rgb(50, 173, 110);
}
</style>
