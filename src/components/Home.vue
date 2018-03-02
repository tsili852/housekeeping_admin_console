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
            </v-data-table>
          </div>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        repairInfo: [
          {
            value: 12,
            name: 'Pending Repairs'
          },
          {
            value: 7,
            name: 'Rooms with pending repairs'
          },
          {
            value: 92,
            name: 'Total Repairs'
          },
          {
            value: '10 mins',
            name: 'Average Fix Time'
          },
          {
            value: '2 hours',
            name: 'Last repare before'
          }
        ],
        housekeepingInfo: [
          {
            value: 85,
            name: 'Clean Rooms'
          },
          {
            value: 15,
            name: 'Dirty Rooms'
          },
          {
            value: 6,
            name: 'OoO Rooms'
          },
          {
            value: '54',
            name: 'Visitors Staying'
          },
          {
            value: '',
            name: ''
          }
        ]
      }
    }
  }
</script>

<style scoped>
  .panel-container {
    border: 1px solid rgba(123, 133, 201, 0.386);
    border-radius: 5px;
    /* height: 200px; */
    box-shadow: 0 12px 20px -10px rgba(123, 134, 201, .28), 0 4px 20px 0 rgba(0, 0, 0, .12), 0 7px 8px -5px rgba(123, 134, 201, 0.2);
    margin-left: 10px;
    margin-right: 10px;
    background-color: #fff;
    margin-bottom: 10px;
    padding: 5px;
  }

  .panel-header {
    height: 30px;
    padding-top: 2px;
    background: linear-gradient(60deg, rgb(67, 81, 167), #303F9F);
    color: white;
    font-size: 17px;
    text-align: center;
    width: 180px;
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
