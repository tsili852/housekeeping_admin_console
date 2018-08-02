<template>
  <v-app>
    <v-navigation-drawer persistent :mini-variant="miniVariant" :clipped="clipped" v-model="drawer" enable-resize-watcher fixed app disable-route-watcher>
      <v-list>
        <v-list-tile :to="{path: '/'}" active-class="deep-orange--text text--darken-3">
          <v-list-tile-action>
            <v-icon>fas fa-home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Home</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile :to="{path: '/repairs'}" active-class="deep-orange--text text--darken-3">
          <v-list-tile-action>
            <v-icon>fas fa-wrench</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Repairs</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile :to="{path: '/housekeeping'}" active-class="deep-orange--text text--darken-3">
          <v-list-tile-action>
            <v-icon>fas fa-quidditch</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Housekeeping</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile :to="{path: '/settings'}" active-class="deep-orange--text text--darken-3">
          <v-list-tile-action>
            <v-icon>fa-cogs</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Settings</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app :clipped-left="clipped" color="deep-orange darken-4" dark>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <mq-layout mq="tablet+">
        <v-btn v-if="drawer" icon @click.stop="miniVariantChange">
          <v-icon v-html="miniVariant ? 'fas fa-toggle-off' : 'fas fa-toggle-on'"></v-icon>
        </v-btn>
      </mq-layout>
      <span class="title-spacer"></span>
      <img src="/static/favicon.ico" height="30" width="30">
      <v-toolbar-title id="title-container" :class="$mq === 'mobile' ? 'small-title' : 'big-title'" v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn style="text-transform:none" depressed color="primary" @click.stop="rightDrawer = !rightDrawer">
        <v-icon left small>fas fa-user</v-icon>
        <span>{{ hotel.name }}</span>
      </v-btn>
    </v-toolbar>
    <v-content class="main-content">
      <router-view/>
    </v-content>
    <v-navigation-drawer temporary right v-model="rightDrawer" fixed app>
      <v-list>
        <v-list-tile @click="onSingOut">
          <v-list-tile-action>
            <v-icon>fa-sign-out-alt</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>Sign-out</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-footer :fixed="fixed" app>
      <span id="version-tag">{{ versionNumber }}
        <span id="date-tag">{{ versionDate }}</span>
      </span>
      <span class="title-spacer"></span>
      <span id="copyright-tag">&copy; Netera Software -
        <a href="http://netera.gr">www.netera.gr</a>
      </span>
    </v-footer>
    <v-dialog v-model="noHotelSN" lazy persistent max-width="500px">
      <v-card>
        <v-card-title>
        <p id="login-header" class="secondary--text">
          Welcome to Hotel Housekeeping
        </p>
        <p>Please enter your Hotel's Serial Number. <br>If you do not know it please contact Netera Software.</p>
        </v-card-title>
        <v-card-text>
          <v-text-field
            :rules="[rules.required]"
            name="input-1"
            label="Hotel Serial Number"
            v-model="tempHotelSN"
          ></v-text-field>
        </v-card-text>
        <v-alert
          v-if="hotelSNError"
          type="error"
          transition="scale-transition"
          :value="true">
          Wrong Hotel Serial Number !!
        </v-alert>
        <v-alert
          v-if="hotelSNCorrect"
          type="success"
          transition="scale-transition"
          :value="true">
          Welcome {{ hotel.name }}
        </v-alert>
        <v-card-actions>
          <v-btn v-if="!hotelSNCorrect" small color="primary" @click.stop="onSubmitHotelSN"><v-icon>done</v-icon>Submit</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
// @ts-check
import { HTTP } from "./http-common";
import { mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
      rules: {
        required: value => !!value || "Please enter your Hotel Serial Number"
      },
      clipped: true,
      drawer: true,
      fixed: true,
      miniVariant: false,
      rightDrawer: false,
      noHotelSN: true,
      hotelSNError: false,
      hotelSNCorrect: false,
      title: "Hotel Housekeeping",
      versionNumber: "v1.1.5",
      versionDate: "02/08/2018",
      tempHotelSN: ''
    };
  },
  computed: {
    ...mapGetters([
      'hotel',
      'hotelsn',
      'isHotelSNCorrect'
    ])
  },
  created() {
    this.miniVariant = this.$localStorage.get("miniVariant");
    this.updateHotel({hotelsn: this.$localStorage.get("hotelsn"), name: ''})
    if (!this.hotel.hotelsn) {
      this.noHotelSN = true;
    } else {
      this.noHotelSN = false;
    }

    HTTP.get(`Hotel/hotelsn=${this.hotel.hotelsn}`)
      .then(result => {
        let hotelName = 'No Hotel';

        // console.log(`Result: ${JSON.stringify(result, null, 2)}`);
        if (result.status == 200 && result.data) {
          hotelName = result.data.name;
        }
        this.updateHotel({hotelsn: this.hotel.hotelsn, name: hotelName});
        console.log(`Hotel Name : ${this.hotel.name}`);
      }
    )
    .catch(error => {
      console.log(`Error: ${JSON.stringify(error, null, 2)}`);
      this.hotel.name = 'No Hotel'
    })
  },
  methods: {
    ...mapActions([
      'updateHotel'
    ]),
    miniVariantChange() {
      this.miniVariant = !this.miniVariant;
      this.$localStorage.set("miniVariant", this.miniVariant);
    },
    onSubmitHotelSN() {
      if (this.tempHotelSN) {
        HTTP.get(`Hotel/hotelsn=${this.tempHotelSN}`)
          .then(result => {
            if (result.status == 200 && result.data) {
              this.hotelSNError = false;
              this.updateHotel({hotelsn: result.data.hotelsn, name: result.data.name});
              // this.hotel.name = result.data.name;
              this.hotelSNCorrect = true;
              this.$localStorage.set("hotelsn", this.hotel.hotelsn);

              setTimeout(() => {
                this.noHotelSN = false;
                this.hotelSNCorrect = false;
              }, 2000);

            } else {
              this.hotelSNError = true;
            }
          }
        )
        .catch(error => {
          console.log(`Error: ${JSON.stringify(error, null, 2)}`);
          this.hotelSNError = true;
        })
      }
      // this.noHotelSN = false;
      // this.hotel.hotelSN = "";
      // console.log(`Hotel SN: ${this.hotel.hotelSN}`);
    },
    onSingOut() {
      this.rightDrawer = false;
      this.noHotelSN = true;
      this.$localStorage.remove("hotelsn");
    }
  }
};
</script>

<style scoped>
#login-header {
  font-size: 20px;
}

.main-content {
  background-color: #eeeeee;
}

.title-spacer {
  flex: 1 1 auto;
}

.small-title {
  font-size: 16px;
}

.big-title {
  font-size: 19px;
}

#version-tag {
  margin-left: 20px;
}

#date-tag {
  font-weight: lighter;
}

#copyright-tag {
  margin-right: 20px;
}
</style>
