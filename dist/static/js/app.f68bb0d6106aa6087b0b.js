webpackJsonp([1],{"7zck":function(t,e){},NHnr:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=n("7+uW"),i={data:function(){return{rules:{required:function(t){return!!t||"Please enter your HotelSN"}},clipped:!0,drawer:!0,fixed:!0,miniVariant:!1,rightDrawer:!1,noHotelSN:!0,title:"Hotel Housekeeping",versionNumber:"v0.0.1",versionDate:"02/03/2018",hotelSN:""}},created:function(){this.miniVariant=this.$localStorage.get("miniVariant"),this.hotelSN=this.$localStorage.get("hotelSN"),this.hotelSN?this.noHotelSN=!1:this.noHotelSN=!0,console.log(this.miniVariant)},methods:{miniVariantChange:function(){this.miniVariant=!this.miniVariant,this.$localStorage.set("miniVariant",this.miniVariant)},onSubmitHotelSN:function(){this.noHotelSN=!1,this.$localStorage.set("hotelSN",this.hotelSN),console.log("Hotel SN: "+this.hotelSN)},onSingOut:function(){this.rightDrawer=!1,this.noHotelSN=!0,this.$localStorage.remove("hotelSN")}}},r={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-app",[n("v-navigation-drawer",{attrs:{persistent:"","mini-variant":t.miniVariant,clipped:t.clipped,"enable-resize-watcher":"",fixed:"",app:""},model:{value:t.drawer,callback:function(e){t.drawer=e},expression:"drawer"}},[n("v-list",[n("v-list-tile",{attrs:{to:{path:"/"},"active-class":"deep-orange--text text--darken-3"}},[n("v-list-tile-action",[n("v-icon",[t._v("fas fa-home")])],1),t._v(" "),n("v-list-tile-content",[n("v-list-tile-title",[t._v("Home")])],1)],1),t._v(" "),n("v-list-tile",{attrs:{to:{path:"/repairs"},"active-class":"deep-orange--text text--darken-3"}},[n("v-list-tile-action",[n("v-icon",[t._v("fas fa-wrench")])],1),t._v(" "),n("v-list-tile-content",[n("v-list-tile-title",[t._v("Repairs")])],1)],1),t._v(" "),n("v-list-tile",{attrs:{to:{path:"/housekeeping"},"active-class":"deep-orange--text text--darken-3"}},[n("v-list-tile-action",[n("v-icon",[t._v("fas fa-quidditch")])],1),t._v(" "),n("v-list-tile-content",[n("v-list-tile-title",[t._v("Housekeeping")])],1)],1),t._v(" "),n("v-list-tile",{attrs:{to:{path:"/settings"},"active-class":"deep-orange--text text--darken-3"}},[n("v-list-tile-action",[n("v-icon",[t._v("fa-cogs")])],1),t._v(" "),n("v-list-tile-content",[n("v-list-tile-title",[t._v("Settings")])],1)],1)],1)],1),t._v(" "),n("v-toolbar",{attrs:{app:"","clipped-left":t.clipped,color:"deep-orange darken-4",dark:""}},[n("v-toolbar-side-icon",{on:{click:function(e){e.stopPropagation(),t.drawer=!t.drawer}}}),t._v(" "),n("mq-layout",{attrs:{mq:"tablet+"}},[t.drawer?n("v-btn",{attrs:{icon:""},on:{click:function(e){e.stopPropagation(),t.miniVariantChange(e)}}},[n("v-icon",{domProps:{innerHTML:t._s(t.miniVariant?"fas fa-toggle-off":"fas fa-toggle-on")}})],1):t._e()],1),t._v(" "),n("span",{staticClass:"title-spacer"}),t._v(" "),n("img",{attrs:{src:"/static/favicon.ico",height:"30",width:"30"}}),t._v(" "),n("v-toolbar-title",{class:"mobile"===t.$mq?"small-title":"big-title",attrs:{id:"title-container"},domProps:{textContent:t._s(t.title)}}),t._v(" "),n("v-spacer"),t._v(" "),n("v-btn",{attrs:{icon:""},on:{click:function(e){e.stopPropagation(),t.rightDrawer=!t.rightDrawer}}},[n("v-icon",[t._v("fas fa-user")])],1)],1),t._v(" "),n("v-content",{staticClass:"main-content"},[n("router-view")],1),t._v(" "),n("v-navigation-drawer",{attrs:{temporary:"",right:"",fixed:"",app:""},model:{value:t.rightDrawer,callback:function(e){t.rightDrawer=e},expression:"rightDrawer"}},[n("v-list",[n("v-list-tile",{on:{click:t.onSingOut}},[n("v-list-tile-action",[n("v-icon",[t._v("fa-sign-out-alt")])],1),t._v(" "),n("v-list-tile-title",[t._v("Sign-out")])],1)],1)],1),t._v(" "),n("v-footer",{attrs:{fixed:t.fixed,app:""}},[n("span",{attrs:{id:"version-tag"}},[t._v(t._s(t.versionNumber)+"\n      "),n("span",{attrs:{id:"date-tag"}},[t._v(t._s(t.versionDate))])]),t._v(" "),n("span",{staticClass:"title-spacer"}),t._v(" "),n("span",{attrs:{id:"copyright-tag"}},[t._v("© Netera Software -\n      "),n("a",{attrs:{href:"http://netera.gr"}},[t._v("www.netera.gr")])])]),t._v(" "),n("v-dialog",{attrs:{lazy:"",persistent:"","max-width":"500px"},model:{value:t.noHotelSN,callback:function(e){t.noHotelSN=e},expression:"noHotelSN"}},[n("v-card",[n("v-card-title",[n("p",{staticClass:"secondary--text",attrs:{id:"login-header"}},[t._v("\n        Welcome to Hotel Housekeeping\n      ")]),t._v(" "),n("p",[t._v("Please enter your Hotel's Serial Number. "),n("br"),t._v("If you do not know it please contact Netera Software.")])]),t._v(" "),n("v-card-text",[n("v-text-field",{attrs:{rules:[t.rules.required],name:"input-1",label:"Hotel Serial Number"},model:{value:t.hotelSN,callback:function(e){t.hotelSN=e},expression:"hotelSN"}})],1),t._v(" "),n("v-card-actions",[n("v-btn",{attrs:{small:"",color:"primary"},on:{click:function(e){e.stopPropagation(),t.onSubmitHotelSN(e)}}},[n("v-icon",[t._v("done")]),t._v("Submit")],1)],1)],1)],1)],1)},staticRenderFns:[]};var s=n("VU/8")(i,r,!1,function(t){n("xwEU")},"data-v-4e316942",null).exports,o=n("/ocq"),l=n("mtWM"),c=(n.n(l).a.create({baseURL:"https://dev-predefined-orders.chb-technologies.ch/api/"}),{render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-data-table",{staticClass:"elevation-1",attrs:{headers:t.roomsWithRepairsHeaders,items:t.roomsWithRepairs},scopedSlots:t._u([{key:"items",fn:function(e){return[n("td",[t._v(t._s(e.item.number))]),t._v(" "),n("td",[t._v(t._s(e.item.repairsCount))]),t._v(" "),n("td",[t._v(t._s(e.item.announceAt))])]}},{key:"pageText",fn:function(e){return[t._v("\n    Rooms "+t._s(e.pageStart)+" - "+t._s(e.pageStop)+" of "+t._s(e.itemsLength)+"\n  ")]}}])})},staticRenderFns:[]}),v={components:{RepairRoomsList:n("VU/8")({data:function(){return{roomsWithRepairsHeaders:[{text:"Room",value:"number"},{text:"Pendind Repairs",value:"repairsCount"},{text:"Last Announcement",value:"announceAt"}],roomsWithRepairs:[{number:10,repairsCount:2,announceAt:"12/02/2018 12:00"},{number:11,repairsCount:1,announceAt:"12/02/2018 17:00"},{number:15,repairsCount:3,announceAt:"15/02/2018 09:00"},{number:17,repairsCount:1,announceAt:"18/02/2018 22:00"},{number:110,repairsCount:1,announceAt:"18/02/2018 20:30"},{number:112,repairsCount:3,announceAt:"22/02/2018 13:32"},{number:152,repairsCount:1,announceAt:"23/02/2018 15:20"},{number:153,repairsCount:1,announceAt:"23/02/2018 11:00"},{number:160,repairsCount:3,announceAt:"01/03/2018 12:00"},{number:161,repairsCount:1,announceAt:"01/03/2018 16:45"},{number:"Pool",repairsCount:1,announceAt:"03/03/2018 18:12"}]}}},c,!1,null,null,null).exports},data:function(){return{repairInfo:[{value:12,name:"Pending Repairs"},{value:7,name:"Rooms with pending repairs"},{value:92,name:"Total Pending"},{value:"10 mins",name:"Average Fix Time"},{value:"8/3/2018 11:46",name:"Last announcement"}],housekeepingInfo:[]}},created:function(){}},u={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-container",[n("v-layout",{attrs:{row:"",wrap:""}},[n("v-flex",{attrs:{xs12:"",sm6:""}},[n("div",{staticClass:"panel-container"},[n("div",{staticClass:"panel-header",attrs:{router:"",to:"/repairs"}},[n("p",[n("router-link",{staticClass:"header-link",attrs:{to:"/repairs"}},[t._v("Repairs")])],1)]),t._v(" "),n("div",{staticClass:"panel-contents"},[n("v-data-table",{staticClass:"elevation-1",attrs:{items:t.repairInfo,"hide-actions":"","hide-headers":""},scopedSlots:t._u([{key:"items",fn:function(e){return[n("td",[t._v(t._s(e.item.name))]),t._v(" "),n("td",{staticClass:"text-xs-right"},[t._v(t._s(e.item.value))])]}}])})],1)])]),t._v(" "),n("v-flex",{attrs:{xs12:"",sm6:"",raised:""}},[n("div",{staticClass:"panel-container"},[n("div",{staticClass:"panel-header"},[n("p",[n("router-link",{staticClass:"header-link",attrs:{to:"/housekeeping"}},[t._v("Housekeeping")])],1)]),t._v(" "),n("div",{staticClass:"panel-contents"},[n("v-data-table",{staticClass:"elevation-1",attrs:{items:t.housekeepingInfo,"hide-actions":"","hide-headers":""},scopedSlots:t._u([{key:"items",fn:function(e){return[n("td",[t._v(t._s(e.item.name))]),t._v(" "),n("td",{staticClass:"text-xs-right"},[t._v(t._s(e.item.value))])]}}])},[n("template",{slot:"no-data"},[n("v-alert",{attrs:{value:!0,color:"warning",icon:"info",transition:"slide-x-reverse-transition"}},[n("span",{staticStyle:{color:"black"}},[t._v("\n                  Housekeeping coming soon !\n                ")])])],1)],2)],1)])])],1),t._v(" "),n("v-layout",{attrs:{row:"",wrap:""}},[n("v-flex",{attrs:{xs12:"",sm6:"",raised:""}},[n("div",{staticClass:"panel-container"},[n("div",{staticClass:"sub-panel-header"},[n("p",[t._v("Rooms with pending repairs")])]),t._v(" "),n("div",{staticClass:"panel-contents"},[n("repair-rooms-list")],1)])])],1)],1)},staticRenderFns:[]};var p=n("VU/8")(v,u,!1,function(t){n("aOBF")},"data-v-3cb56168",null).exports,d={render:function(){this.$createElement;this._self._c;return this._m(0)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",[e("p",[this._v("Repairs")])])}]},m=n("VU/8")(null,d,!1,null,null,null).exports,h={render:function(){this.$createElement;this._self._c;return this._m(0)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",[e("p",[this._v("Housekeeping")])])}]},_=n("VU/8")(null,h,!1,null,null,null).exports,f={render:function(){this.$createElement;this._self._c;return this._m(0)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",[e("p",[this._v("Settings")])])}]},g=n("VU/8")(null,f,!1,null,null,null).exports;a.a.use(o.a);var b=new o.a({routes:[{path:"/",name:"Home",component:p},{path:"/repairs",name:"Repairs",component:m},{path:"/housekeeping",name:"Housekeeing",component:_},{path:"/settings",name:"Settings",component:g}],mode:"history"}),S=n("3EgV"),x=n.n(S),k=n("l43w"),w=(n("7zck"),n("IHMs")),C=n.n(w),H=n("UnSZ"),N=n.n(H);a.a.use(x.a,{theme:{primary:C.a.deepOrange.darken4,secondary:C.a.indigo.darken2,accent:C.a.deepOrange.accent1,info:C.a.blue.lighten3,warning:C.a.amber.lighten2,error:C.a.red.accent2,success:C.a.green.lighten2}}),a.a.use(N.a),a.a.use(k.a,{breakpoints:{mobile:450,tablet:900,laptop:1250,desktop:1/0}}),a.a.config.productionTip=!1,new a.a({el:"#app",router:b,components:{App:s},render:function(t){return t(s)},localStorage:{miniVariant:{type:Boolean}}})},aOBF:function(t,e){},xwEU:function(t,e){}},["NHnr"]);
//# sourceMappingURL=app.f68bb0d6106aa6087b0b.js.map