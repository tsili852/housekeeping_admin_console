<template>
  <v-app>
    <v-navigation-drawer persistent :mini-variant="miniVariant" :clipped="clipped" v-model="drawer" enable-resize-watcher fixed app>
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
        <v-btn v-if="drawer" icon @click.stop="miniVariant = !miniVariant">
          <v-icon v-html="miniVariant ? 'fas fa-toggle-off' : 'fas fa-toggle-on'"></v-icon>
        </v-btn>
      </mq-layout>
      <span class="title-spacer"></span>
      <img src="/static/favicon.ico" height="30" width="30"></img>
      <v-toolbar-title id="title-container" :class="$mq === 'mobile' ? 'small-title' : 'big-title'" v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click.stop="rightDrawer = !rightDrawer">
        <v-icon>fas fa-user</v-icon>
      </v-btn>
    </v-toolbar>
    <v-content class="main-content">
      <router-view/>
    </v-content>
    <v-navigation-drawer temporary right v-model="rightDrawer" fixed app>
      <v-list>
        <v-list-tile>
          <v-list-tile-action>
            <v-icon>compare_arrows</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>Switch drawer (click me)</v-list-tile-title>
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
  </v-app>
</template>

<script>
  export default {
    data () {
      return {
        clipped: true,
        drawer: true,
        fixed: true,
        miniVariant: false,
        rightDrawer: false,
        title: 'Hotel Housekeeping',
        versionNumber: 'v0.0.1',
        versionDate: '02/03/2018'
      }
    },
    name: 'App'
  }
</script>

<style scoped>
  .main-content {
    background-color: #EEEEEE;
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
