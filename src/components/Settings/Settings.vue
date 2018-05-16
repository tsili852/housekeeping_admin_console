<template>
<v-container fluid>
  <div>
    <v-tabs grow centered dark color="secondary">
    <v-tabs-slider color="primary"></v-tabs-slider>
    <v-tab href="#tab-1">
      <v-icon style="margin-right:10px">fas fa-clipboard-list</v-icon>
      General
    </v-tab>
    <v-tab href="#tab-2">
      <v-icon style="margin-right:10px">fas fa-door-open</v-icon>
      Rooms
    </v-tab>
    <v-tab href="#tab-3">
      <v-icon style="margin-right:10px">fas fa-thumbtack</v-icon>
      Maintenance Tasks
    </v-tab>
    <v-tab-item
      id="tab-1"
      >
      <v-card flat color="grey lighten-5">
        <v-card-text>
          <v-layout row wrap>
            <v-flex xs12 sm4>
              <v-form>
                <v-text-field
                  disabled
                  v-model="hotel.name"
                  label="Hotel Name"
                ></v-text-field>
                <v-text-field
                  v-model="hotel.hotelsn"
                  label="Hotel Serial Number"
                ></v-text-field>
              </v-form>
              <v-btn color="primary" small fab @click="onSaveGeneralSettings()">
                <v-icon>save</v-icon>
              </v-btn>
            </v-flex>
          </v-layout>
        </v-card-text>
      </v-card>
    </v-tab-item>
    <v-tab-item
      id="tab-2"
      >
      <v-card flat color="grey lighten-5">
        <v-card-text>
          <v-layout row justify-center>
            <v-dialog v-model="roomDeleteDialogOpen" persistent max-width="290">
              <v-card>
                <v-card-title class="headline">Delete Room</v-card-title>
                <v-card-text style="font-size:16px">Are you sure you want to delete room <span style="text-decoration:underline; font-weight:500">{{ selectedRoom.Number }}</span> ?</v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn @click.native="roomDeleteDialogOpen = false">Cancel</v-btn>
                  <v-btn color="primary darken-1" @click.native="roomDeleteDialogOpen = false">Delete</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-layout>
          <v-dialog v-model="roomDialogOpen" persistent max-width="500px">
              <v-card>
                  <v-card-title>
                      <span class="headline">{{ roomDialogTitle }}</span>
                  </v-card-title>
                  <v-card-text>
                      <v-container grid-list-md>
                          <v-layout wrap>
                              <v-flex xs12 sm6>
                                  <v-text-field v-model="selectedRoom.Number" label="Number" required></v-text-field>
                              </v-flex>
                              <v-flex xs12 sm6>
                                  <v-text-field v-model="selectedRoom.RoomType" label="Room Type" required></v-text-field>
                              </v-flex>
                          </v-layout>
                      </v-container>
                  </v-card-text>
                  <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn @click.native="onRoomDialogClose()">Cancel</v-btn>
                      <v-btn color="success" @click.native="onRoomDialogSave()">Save</v-btn>
                  </v-card-actions>
              </v-card>
          </v-dialog>
          <v-btn color="primary" small fab @click="onAddRoom()">
            <v-icon>add</v-icon>
          </v-btn>
          <v-data-table
              :headers="roomHeaders"
              :items="allRooms"
              class="elevation-2"
              must-sort
              :loading="roomsLoading"
              :rows-per-page-items="rowsPerPage">
              <v-progress-linear slot="progress" color="primary" indeterminate></v-progress-linear>
              <template slot="items" slot-scope="rooms">
                <tr @click="onSelectRoom(rooms.item)">
                  <td>{{ rooms.item.Number }}</td>
                  <td>{{ rooms.item.RoomType }}</td>
                  <td>{{ rooms.item.AllRepairsCount }}</td>
                  <td>{{ rooms.item.PendingRepairsCount }}</td>
                  <td>{{ rooms.item.Customer }}</td>
                  <td>
                    <v-btn icon class="mx-0" @click="onEditRoom(rooms.item)">
                      <v-icon color="info">edit</v-icon>
                    </v-btn>
                    <v-btn icon class="mx-0" @click="onDeleteRoom(rooms.item)">
                      <v-icon color="error">delete</v-icon>
                    </v-btn>
                  </td>
                </tr>
              </template>
            </v-data-table>
        </v-card-text>
      </v-card>
    </v-tab-item>
    <v-tab-item
      id="tab-3"
      >
      <v-card flat>
        <v-card-text>
          <v-layout row justify-center>
            <v-dialog v-model="mTaskDeleteDialogOpen" persistent max-width="290">
              <v-card>
                <v-card-title class="headline">Delete Maintenance Task</v-card-title>
                <v-card-text style="font-size:16px">Are you sure you want to delete maintenance task <span style="text-decoration:underline; font-weight:500">{{ selectedMTask.Name }}</span> ?</v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn @click.native="mTaskDeleteDialogOpen = false">Cancel</v-btn>
                  <v-btn color="primary darken-1" @click.native="mTaskDeleteDialogOpen = false">Delete</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-layout>
          <v-dialog v-model="mTaskDialogOpen" persistent max-width="500px">
              <v-card>
                  <v-card-title>
                      <span class="headline">{{ mTaskDialogTitle }}</span>
                  </v-card-title>
                  <v-card-text>
                      <v-container grid-list-md>
                          <v-layout wrap>
                              <v-flex xs12 sm6>
                                  <v-text-field v-model="selectedMTask.Name" label="Description" required></v-text-field>
                              </v-flex>
                              <v-flex xs12 sm6>
                                  <v-text-field v-model="selectedMTask.Amount" label="Default Amount" required></v-text-field>
                              </v-flex>
                          </v-layout>
                      </v-container>
                  </v-card-text>
                  <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn @click.native="onMTaskDialogClose()">Cancel</v-btn>
                      <v-btn color="success" @click.native="onMTaskDialogSave()">Save</v-btn>
                  </v-card-actions>
              </v-card>
          </v-dialog>
          <v-btn color="primary" small fab @click="onAddMTask()">
            <v-icon>add</v-icon>
          </v-btn>
          <v-data-table
              :headers="mTaskHeaders"
              :items="allMaintenanceTasks"
              class="elevation-2"
              must-sort
              :loading="mTasksLoading"
              :rows-per-page-items="rowsPerPage">
              <v-progress-linear slot="progress" color="primary" indeterminate></v-progress-linear>
              <template slot="items" slot-scope="mTasks">
                <tr>
                  <td>{{ mTasks.item.Name }}</td>
                  <td>{{ mTasks.item.Amount }}</td>
                  <td>
                    <v-btn icon class="mx-0" @click="onEditMTask(mTasks.item)">
                      <v-icon color="info">edit</v-icon>
                    </v-btn>
                    <v-btn icon class="mx-0" @click="onDeleteMTask(mTasks.item)">
                      <v-icon color="error">delete</v-icon>
                    </v-btn>
                  </td>
                </tr>
              </template>
            </v-data-table>
        </v-card-text>
      </v-card>
    </v-tab-item>
  </v-tabs>
  </div>
</v-container>
</template>

<script>
import { HTTP } from "../../http-common";
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      daysBefore: 265,
      rowsPerPage: [10, 20, 30, 50, { text: "All", value: -1 }],
      allRooms: [],
      roomsLoading: false,
      roomDialogOpen: false,
      roomDeleteDialogOpen: false,
      roomDialogTitle: 'Create Room',
      selectedRoom: {
        Number: '',
        RoomType: '',
        RoomID: '',
        HotelSN: '',
        Customer: ''
      },
      roomHeaders: [
        {
          text: "Room",
          value: "Number"
        },
        {
          text: "Room Type",
          value: "RoomType"
        },
        {
          text: "All Repairs",
          value: "AllRepairsCount"
        },
        {
          text: "Pending Repairs",
          value: "PendingRepairsCount"
        },
        {
          text: "Customer",
          value: "Customer"
        },
        {
          text: "Actions",
          value: ""
        }
      ],
      allMaintenanceTasks: [],
      mTasksLoading: false,
      mTaskDialogOpen: false,
      mTaskDeleteDialogOpen: false,
      mTaskDialogTitle: 'Create Maintenance Task',
      selectedMTask: {
        Name: '',
        Amount: 0,
        Id: ''
      },
      mTaskHeaders: [
        {
          text: "Description",
          value: "Name"
        },
        {
          text: "Amount",
          value: "Amount"
        },
        {
          text: "Actions",
          value: ""
        }
      ]
    };
  },
  computed: {
    ...mapGetters(["hotel", "hotelsn", "isHotelSNCorrect"])
  },
  created() {
    this.getRooms();
    this.getMTasks();
  },
  methods: {
    getRooms() {
      this.roomsLoading = true;
      HTTP.get(`Room/repairs/hotelsn=${this.hotelsn}&skip=0&take=0&daysBefore=${this.daysBefore}`)
        .then(result => {
          if (result.status == 200 && result.data) {
            this.allRooms = result.data;
            console.log(`Rooms: ${JSON.stringify(this.allRooms, null, 2)}`);
          }
          this.roomsLoading = false;
        })
        .catch(error => {
          console.log(`Get Rooms Error: ${JSON.stringify(error)}`);
          this.roomsLoading = false;
        });
    },
    getMTasks() {
      this.mTasksLoading = true;
      HTTP.get(`MaintenanceTask/hotelsn=${this.hotelsn}`)
        .then(result => {
          if (result.status == 200 && result.data) {
            this.allMaintenanceTasks = result.data;
          }
          this.mTasksLoading = false;
        })
        .catch(error => {
          console.log(`Get Maintenance Tasks Error: ${JSON.stringify(error)}`);
          this.mTasksLoading = false;
        })
    },
    onAddRoom() {
      this.selectedRoom = {
        Number: '',
        RoomType: '',
        RoomID: '',
        HotelSN: '',
        Customer: ''
      };
      this.roomDialogTitle = "Create Room";
      this.roomDialogOpen = true;
    },
    onEditRoom(room) {
      this.selectedRoom = room;
      this.roomDialogTitle = `Edit Room`;
      this.roomDialogOpen = true;
    },
    onDeleteRoom(room) {
      this.selectedRoom = room;
      this.roomDeleteDialogOpen = true;
    },
    onRoomDialogClose() {
      this.roomDialogOpen = false;
    },
    onAddMTask() {
      this.selectedMTask = {
        Name: '',
        Amount: '',
        Id: ''
      };
      this.mTaskDialogTitle = "Create Maintenace Task";
      this.mTaskDialogOpen = true;
    },
    onEditMTask(mTask) {
      this.selectedMTask = mTask;
      this.mTaskDialogTitle = `Edit Maintenace Task`;
      this.mTaskDialogOpen = true;
    },
    onDeleteMTask(mTask) {
      this.selectedMTask = mTask;
      this.mTaskDeleteDialogOpen = true;
    },
    onMTaskDialogClose() {
      this.mTaskDialogOpen = false;
    }
  }
};
</script>
