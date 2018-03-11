<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12 sm6>
        <div class="panel-container">
          <div class="panel-header" router to="/repairs">
            <p>
              <router-link to="/repairs" class="header-link">Repairs</router-link>
            </p>
          </div>
          <div class="actions-container">
            <v-tooltip left>
              <v-btn 
                slot="activator" 
                style="width:30px;height:30px" 
                :loading="infoLoading"
                :disabled="infoLoading"
                color="primary" small fab>
                <v-icon>refresh</v-icon>
              </v-btn>
              <span>Refresh Statistics</span>
            </v-tooltip>
            <v-tooltip right>
              <v-btn slot="activator" style="width:30px;height:30px" color="primary" small fab>
                <v-icon>add</v-icon>
              </v-btn>
              <span>Announce a Repair</span>
            </v-tooltip>
          </div>
          <div class="panel-contents">
            <v-data-table :items="repairInfo" class="elevation-1" hide-actions hide-headers>
              <template slot="items" slot-scope="props">
                  <td>{{ props.item.name }}</td>
                  <td class="text-xs-right">{{ props.item.value }}</td>
              </template>
            </v-data-table>
          </div>
        </div>
      </v-flex>
      <v-flex xs12 sm6 raised>
        <div class="panel-container">
          <div class="panel-header">
            <p>
              <router-link to="/housekeeping" class="header-link">Housekeeping</router-link>
            </p>
          </div>
          <div class="panel-contents">
            <v-data-table :items="housekeepingInfo" class="elevation-1" hide-actions hide-headers>
              <template slot="items" slot-scope="props">
                <td>{{ props.item.name }}</td>
                <td class="text-xs-right">{{ props.item.value }}</td>
              </template>
              <template slot="no-data">
                <v-alert :value="true" color="warning" icon="info" transition="slide-x-reverse-transition">
                  <span style="color:black">
                    Housekeeping coming soon !
                  </span>
                </v-alert>
              </template>
            </v-data-table>
          </div>
        </div>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs12 sm6 raised>
        <div class="panel-container">
          <div class="sub-panel-header">
            <p>Rooms with pending repairs</p>
          </div>
          <div class="panel-contents">
            <repair-rooms-list></repair-rooms-list>
          </div>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
//@ts-check

import { HTTP } from "../http-common";
import RepairRoomsList from "./shared/RepairRoomsList.vue";
// import RepairRoomsList from "./shared/RepairRoomsList";

export default {
  components: {
    RepairRoomsList
  },
  data() {
    return {
      homeInfo: {},
      housekeepingInfo: [],
      repairInfo: [],
      infoLoading: false
    };
  },
  methods: {
    refresh() {
      this.getHomeInformation();
    },
    getHomeInformation() {
      this.infoLoading = true;

      HTTP.get("GetHomeInformation?HotelSN=20141207")
      .then(response => {
        console.log(`Data: ${JSON.stringify(response.data, null, 2)}`);
        this.homeInfo = response.data;
        this.repairInfo.push({
          name: "Pending Repairs",
          value: this.homeInfo.pendingRepairs
        });
        this.repairInfo.push({
          name: "Rooms with pending repairs",
          value: this.homeInfo.pendingRepairsRooms
        });
        this.repairInfo.push({
          name: "Fixed Repairs",
          value: this.homeInfo.completeRepairs
        });
        this.repairInfo.push({
          name: "Average Fix Time",
          value: this.homeInfo.averageTime
        });
        this.repairInfo.push({
          name: "Last announcement",
          value: this.homeInfo.lastAnnouncement
        });

        this.infoLoading = false;
      })
      .catch(error => {
        console.log(`Error: ${error.message}`);
      });
    }
  },
  created() {
    this.getHomeInformation();
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
</style>
