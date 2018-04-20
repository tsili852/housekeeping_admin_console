webpackJsonp([1],{"7zck":function(e,t){},NHnr:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n={};a.d(n,"updateHotel",function(){return O});var i={};a.d(i,"updateHotel",function(){return M});var o={};a.d(o,"hotelsn",function(){return B}),a.d(o,"hotel",function(){return U}),a.d(o,"isHotelSNCorrect",function(){return q});var r=a("7+uW"),s=a("mvHQ"),l=a.n(s),c=a("Dd8w"),d=a.n(c),p=a("mtWM"),v=a.n(p).a.create({baseURL:"https://cloudhotel.gr/hk/api/"}),u=a("NYxO"),m={data:function(){return{rules:{required:function(e){return!!e||"Please enter your Hotel Serial Number"}},clipped:!0,drawer:!0,fixed:!0,miniVariant:!1,rightDrawer:!1,noHotelSN:!0,hotelSNError:!1,hotelSNCorrect:!1,title:"Hotel Housekeeping",versionNumber:"v0.0.1",versionDate:"08/03/2018",tempHotelSN:""}},computed:d()({},Object(u.c)(["hotel","hotelsn","isHotelSNCorrect"])),created:function(){var e=this;this.miniVariant=this.$localStorage.get("miniVariant"),this.updateHotel({hotelsn:this.$localStorage.get("hotelsn"),name:""}),this.hotel.hotelsn?this.noHotelSN=!1:this.noHotelSN=!0,v.get("Hotel/hotelsn="+this.hotel.hotelsn).then(function(t){var a="No Hotel";200==t.status&&t.data&&(a=t.data.name),e.updateHotel({hotelsn:e.hotel.hotelsn,name:a}),console.log("Hotel Name : "+e.hotel.name)}).catch(function(t){console.log("Error: "+l()(t,null,2)),e.hotel.name="No Hotel"})},methods:d()({},Object(u.b)(["updateHotel"]),{miniVariantChange:function(){this.miniVariant=!this.miniVariant,this.$localStorage.set("miniVariant",this.miniVariant)},onSubmitHotelSN:function(){var e=this;this.tempHotelSN&&v.get("Hotel/hotelsn="+this.tempHotelSN).then(function(t){200==t.status&&t.data?(e.hotelSNError=!1,e.updateHotel({hotelsn:t.data.hotelsn,name:t.data.name}),e.hotelSNCorrect=!0,e.$localStorage.set("hotelsn",e.hotel.hotelsn),setTimeout(function(){e.noHotelSN=!1,e.hotelSNCorrect=!1},2e3)):e.hotelSNError=!0}).catch(function(t){console.log("Error: "+l()(t,null,2)),e.hotelSNError=!0})},onSingOut:function(){this.rightDrawer=!1,this.noHotelSN=!0,this.$localStorage.remove("hotelsn")}})},h={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-app",[a("v-navigation-drawer",{attrs:{persistent:"","mini-variant":e.miniVariant,clipped:e.clipped,"enable-resize-watcher":"",fixed:"",app:"","disable-route-watcher":""},model:{value:e.drawer,callback:function(t){e.drawer=t},expression:"drawer"}},[a("v-list",[a("v-list-tile",{attrs:{to:{path:"/"},"active-class":"deep-orange--text text--darken-3"}},[a("v-list-tile-action",[a("v-icon",[e._v("fas fa-home")])],1),e._v(" "),a("v-list-tile-content",[a("v-list-tile-title",[e._v("Home")])],1)],1),e._v(" "),a("v-list-tile",{attrs:{to:{path:"/repairs"},"active-class":"deep-orange--text text--darken-3"}},[a("v-list-tile-action",[a("v-icon",[e._v("fas fa-wrench")])],1),e._v(" "),a("v-list-tile-content",[a("v-list-tile-title",[e._v("Repairs")])],1)],1),e._v(" "),a("v-list-tile",{attrs:{to:{path:"/housekeeping"},"active-class":"deep-orange--text text--darken-3"}},[a("v-list-tile-action",[a("v-icon",[e._v("fas fa-quidditch")])],1),e._v(" "),a("v-list-tile-content",[a("v-list-tile-title",[e._v("Housekeeping")])],1)],1),e._v(" "),a("v-list-tile",{attrs:{to:{path:"/settings"},"active-class":"deep-orange--text text--darken-3"}},[a("v-list-tile-action",[a("v-icon",[e._v("fa-cogs")])],1),e._v(" "),a("v-list-tile-content",[a("v-list-tile-title",[e._v("Settings")])],1)],1)],1)],1),e._v(" "),a("v-toolbar",{attrs:{app:"","clipped-left":e.clipped,color:"deep-orange darken-4",dark:""}},[a("v-toolbar-side-icon",{on:{click:function(t){t.stopPropagation(),e.drawer=!e.drawer}}}),e._v(" "),a("mq-layout",{attrs:{mq:"tablet+"}},[e.drawer?a("v-btn",{attrs:{icon:""},on:{click:function(t){t.stopPropagation(),e.miniVariantChange(t)}}},[a("v-icon",{domProps:{innerHTML:e._s(e.miniVariant?"fas fa-toggle-off":"fas fa-toggle-on")}})],1):e._e()],1),e._v(" "),a("span",{staticClass:"title-spacer"}),e._v(" "),a("img",{attrs:{src:"/static/favicon.ico",height:"30",width:"30"}}),e._v(" "),a("v-toolbar-title",{class:"mobile"===e.$mq?"small-title":"big-title",attrs:{id:"title-container"},domProps:{textContent:e._s(e.title)}}),e._v(" "),a("v-spacer"),e._v(" "),a("v-btn",{staticStyle:{"text-transform":"none"},attrs:{depressed:"",color:"primary"},on:{click:function(t){t.stopPropagation(),e.rightDrawer=!e.rightDrawer}}},[a("v-icon",{attrs:{left:"",small:""}},[e._v("fas fa-user")]),e._v(" "),a("span",[e._v(e._s(e.hotel.name))])],1)],1),e._v(" "),a("v-content",{staticClass:"main-content"},[a("router-view")],1),e._v(" "),a("v-navigation-drawer",{attrs:{temporary:"",right:"",fixed:"",app:""},model:{value:e.rightDrawer,callback:function(t){e.rightDrawer=t},expression:"rightDrawer"}},[a("v-list",[a("v-list-tile",{on:{click:e.onSingOut}},[a("v-list-tile-action",[a("v-icon",[e._v("fa-sign-out-alt")])],1),e._v(" "),a("v-list-tile-title",[e._v("Sign-out")])],1)],1)],1),e._v(" "),a("v-footer",{attrs:{fixed:e.fixed,app:""}},[a("span",{attrs:{id:"version-tag"}},[e._v(e._s(e.versionNumber)+"\n      "),a("span",{attrs:{id:"date-tag"}},[e._v(e._s(e.versionDate))])]),e._v(" "),a("span",{staticClass:"title-spacer"}),e._v(" "),a("span",{attrs:{id:"copyright-tag"}},[e._v("© Netera Software -\n      "),a("a",{attrs:{href:"http://netera.gr"}},[e._v("www.netera.gr")])])]),e._v(" "),a("v-dialog",{attrs:{lazy:"",persistent:"","max-width":"500px"},model:{value:e.noHotelSN,callback:function(t){e.noHotelSN=t},expression:"noHotelSN"}},[a("v-card",[a("v-card-title",[a("p",{staticClass:"secondary--text",attrs:{id:"login-header"}},[e._v("\n        Welcome to Hotel Housekeeping\n      ")]),e._v(" "),a("p",[e._v("Please enter your Hotel's Serial Number. "),a("br"),e._v("If you do not know it please contact Netera Software.")])]),e._v(" "),a("v-card-text",[a("v-text-field",{attrs:{rules:[e.rules.required],name:"input-1",label:"Hotel Serial Number"},model:{value:e.tempHotelSN,callback:function(t){e.tempHotelSN=t},expression:"tempHotelSN"}})],1),e._v(" "),e.hotelSNError?a("v-alert",{attrs:{type:"error",transition:"scale-transition",value:!0}},[e._v("\n        Wrong Hotel Serial Number !!\n      ")]):e._e(),e._v(" "),e.hotelSNCorrect?a("v-alert",{attrs:{type:"success",transition:"scale-transition",value:!0}},[e._v("\n        Welcome "+e._s(e.hotel.name)+"\n      ")]):e._e(),e._v(" "),a("v-card-actions",[e.hotelSNCorrect?e._e():a("v-btn",{attrs:{small:"",color:"primary"},on:{click:function(t){t.stopPropagation(),e.onSubmitHotelSN(t)}}},[a("v-icon",[e._v("done")]),e._v("Submit")],1)],1)],1)],1)],1)},staticRenderFns:[]};var f=a("VU/8")(m,h,!1,function(e){a("mq/c")},"data-v-6ac90d4c",null).exports,_=a("/ocq"),g={data:function(){return{pendingRepairsHeaders:[{text:"Room",value:"roomNumber"},{text:"Description",value:"description"},{text:"AnnouncedAt",value:"announceTime"}],pendingRepairs:[]}},watch:{hotelsn:function(e){this.getRoomsWithPending()}},computed:d()({},Object(u.c)(["hotelsn"])),created:function(){this.getRoomsWithPending()},methods:{getRoomsWithPending:function(){var e=this;v.get("Repair/pending/hotelsn="+this.hotelsn).then(function(t){200==t.status&&t.data&&(e.pendingRepairs=t.data)})}}},R={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-data-table",{staticClass:"elevation-1",attrs:{headers:e.pendingRepairsHeaders,items:e.pendingRepairs},scopedSlots:e._u([{key:"items",fn:function(t){return[a("td",[e._v(e._s(t.item.roomNumber))]),e._v(" "),a("td",[e._v(e._s(t.item.description))]),e._v(" "),a("td",[e._v(e._s(e._f("date")(t.item.announceTime)))])]}},{key:"pageText",fn:function(t){return[e._v("\n    Rooms "+e._s(t.pageStart)+" - "+e._s(t.pageStop)+" of "+e._s(t.itemsLength)+"\n  ")]}}])})},staticRenderFns:[]},b=function(e){return new Date(e).toLocaleString(["el-GR"],{month:"2-digit",day:"2-digit",year:"numeric",hour:"2-digit",minute:"2-digit"})},S={components:{RepairRoomsList:a("VU/8")(g,R,!1,null,null,null).exports},data:function(){return{homeInfo:{},housekeepingInfo:[],repairInfo:[],infoLoading:!1}},computed:d()({},Object(u.c)(["hotel","hotelsn","isHotelSNCorrect"])),watch:{hotelsn:function(e){this.refresh()}},methods:d()({},Object(u.b)(["updateHotel"]),{refresh:function(){this.getHomeInformation()},getHomeInformation:function(){var e=this;this.infoLoading=!0,v.get("Hotel/home/hotelsn="+this.hotelsn).then(function(t){e.homeInfo=t.data,e.repairInfo=[],e.repairInfo.push({name:"Pending Repairs",value:e.homeInfo.pendingRepairs}),e.repairInfo.push({name:"Rooms with pending repairs",value:e.homeInfo.pendingRepairsRooms}),e.repairInfo.push({name:"Fixed Repairs",value:e.homeInfo.completeRepairs}),e.repairInfo.push({name:"Average Fix Time",value:e.homeInfo.averageTime}),e.repairInfo.push({name:"Last announcement",value:b(e.homeInfo.lastAnouncement)}),e.infoLoading=!1}).catch(function(e){console.log("Error: "+e.message)})}}),created:function(){this.getHomeInformation()}},x={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-container",[a("v-layout",{attrs:{row:"",wrap:""}},[a("v-flex",{attrs:{xs12:"",sm6:""}},[a("div",{staticClass:"panel-container"},[a("div",{staticClass:"panel-header",attrs:{router:"",to:"/repairs"}},[a("p",[a("router-link",{staticClass:"header-link",attrs:{to:"/repairs"}},[e._v("Repairs")])],1)]),e._v(" "),a("div",{staticClass:"actions-container"},[a("v-tooltip",{attrs:{left:""}},[a("v-btn",{staticStyle:{width:"30px",height:"30px"},attrs:{slot:"activator",loading:e.infoLoading,disabled:e.infoLoading,color:"primary",small:"",fab:""},on:{click:function(t){e.refresh()}},slot:"activator"},[a("v-icon",[e._v("refresh")])],1),e._v(" "),a("span",[e._v("Refresh Statistics")])],1),e._v(" "),a("v-tooltip",{attrs:{right:""}},[a("v-btn",{staticStyle:{width:"30px",height:"30px"},attrs:{slot:"activator",color:"primary",small:"",fab:""},slot:"activator"},[a("v-icon",[e._v("add")])],1),e._v(" "),a("span",[e._v("Announce a Repair")])],1)],1),e._v(" "),a("div",{staticClass:"panel-contents"},[a("v-data-table",{staticClass:"elevation-1",attrs:{items:e.repairInfo,"hide-actions":"","hide-headers":""},scopedSlots:e._u([{key:"items",fn:function(t){return[a("td",[e._v(e._s(t.item.name))]),e._v(" "),a("td",{staticClass:"text-xs-right"},[e._v(e._s(t.item.value))])]}}])})],1)])]),e._v(" "),a("v-flex",{attrs:{xs12:"",sm6:"",raised:""}},[a("div",{staticClass:"panel-container"},[a("div",{staticClass:"panel-header"},[a("p",[a("router-link",{staticClass:"header-link",attrs:{to:"/housekeeping"}},[e._v("Housekeeping")])],1)]),e._v(" "),a("div",{staticClass:"panel-contents"},[a("v-data-table",{staticClass:"elevation-1",attrs:{items:e.housekeepingInfo,"hide-actions":"","hide-headers":""},scopedSlots:e._u([{key:"items",fn:function(t){return[a("td",[e._v(e._s(t.item.name))]),e._v(" "),a("td",{staticClass:"text-xs-right"},[e._v(e._s(t.item.value))])]}}])},[a("template",{slot:"no-data"},[a("v-alert",{attrs:{value:!0,color:"warning",icon:"info",transition:"slide-x-reverse-transition"}},[a("span",{staticStyle:{color:"black"}},[e._v("\n                  Housekeeping coming soon !\n                ")])])],1)],2)],1)])])],1),e._v(" "),a("v-layout",{attrs:{row:"",wrap:""}},[a("v-flex",{attrs:{xs12:"",sm6:"",raised:""}},[a("div",{staticClass:"panel-container"},[a("div",{staticClass:"sub-panel-header"},[a("p",[e._v("Pending Repairs")])]),e._v(" "),a("div",{staticClass:"panel-contents"},[a("repair-rooms-list")],1)])])],1)],1)},staticRenderFns:[]};var k=a("VU/8")(S,x,!1,function(e){a("pdTa")},"data-v-29f88294",null).exports,w=(a("M4fF"),{data:function(){return{$refs:{descriptionInputBox:HTMLFormElement},rowsPerPage:[15,30,50,{text:"All",value:-1}],allRooms:[],roomsLoading:!1,repairsLoading:!1,onlyPending:!0,daysBefore:0,roomHeaders:[{text:"Room",value:"Number"},{text:"Pending/All",value:"PendingRepairsCount"}],emptyRepair:{Description:"",RepairID:0,Amount:0,AnnouncedAt:null},selectedRepair:{},repairStarted:!1,repairFixed:!1,whoReportedList:["Customer","Maid","Technician","Reception"],selectedRoom:{},snackbar:!1,snackbarColor:"",snackbarMessage:""}},computed:d()({},Object(u.c)(["hotel","hotelsn","isHotelSNCorrect"])),created:function(){this.getRooms()},methods:{getRooms:function(){var e=this;this.roomsLoading=!0,v.get("Room/repairs/hotelsn="+this.hotelsn+"&skip=0&take=0&daysBefore="+this.daysBefore).then(function(t){200==t.status&&t.data&&(e.allRooms=t.data,e.selectedRoom.Number=e.allRooms[0].Number,e.selectedRoom.RoomID=e.allRooms[0].RoomID,e.selectedRoom.Repairs=e.allRooms[0].Repairs,e.selectedRoom.HotelSN=e.allRooms[0].HotelSN,e.getRoomRepairs()),e.roomsLoading=!1}).catch(function(t){console.log("Get Rooms Error: "+l()(t)),e.roomsLoading=!1})},getRoomRepairs:function(){var e=this;this.repairsLoading=!0,v.get("Repair/room/hotelsn="+this.hotelsn+"&roomid="+this.selectedRoom.RoomID+"&daysBefore=365").then(function(t){200==t.status&&t.data&&(e.selectedRoom.Repairs=t.data,console.log("Repairs for room: "+e.selectedRoom.Number+": "+l()(e.selectedRoom.Repairs)),e.selectedRoom.Repairs.length>0?(e.selectedRepair=e.selectedRoom.Repairs[0],e.repairFixed=!!e.selectedRepair.EndAt,e.repairStarted=!!e.selectedRepair.StartAt,e.selectedRepair.isEmpty=!1):(e.selectedRepair=e.emptyRepair,e.selectedRepair.isEmpty=!0)),e.repairsLoading=!1}).catch(function(t){console.log("Get Repairs for room Error: "+l()(t)),e.repairsLoading=!1})},onSelectRoom:function(e){this.selectedRoom.Number=e.Number,this.selectedRoom.RoomID=e.RoomID,this.selectedRoom.HotelSN=e.HotelSN,this.getRoomRepairs()},onSelectRepair:function(e){this.selectedRepair=e,this.repairFixed=!!this.selectedRepair.EndAt,this.repairStarted=!!this.selectedRepair.StartAt},onChangeSelection:function(){this.onlyPending=!this.onlyPending,0==this.daysBefore?this.daysBefore=30:this.daysBefore=0,this.getRooms()},onStartRepair:function(){this.selectedRepair.StartAt||(this.selectedRepair.StartAt=new Date,this.repairStarted=!0)},onFixRepair:function(){this.selectedRepair.EndAt||(this.selectedRepair.EndAt=new Date,this.repairFixed=!0,this.selectedRepair.StartAt||(this.selectedRepair.StartAt=new Date,this.repairStarted=!0))},addRepair:function(){var e=this,t={Technician:"",RoomID:this.selectedRoom.RoomID,RepairID:0,Amount:0,Description:"",TaskName:"",isNew:!0,isEmpty:!1};this.selectedRepair=t,this.$nextTick(function(){return e.$refs.descriptionInputBox.focus()})},onSaveRepair:function(){var e=this;if(this.selectedRepair.RepairID>0){var t={changeType:"",description:this.selectedRepair.Description,endtime:this.selectedRepair.EndAt,hotelsn:"",maintenanceid:null,photo:null,repairid:this.selectedRepair.RepairID,starttime:this.selectedRepair.StartAt,technicianid:null,whoreported:null};v.post("Repair/update",t).then(function(t){console.log("Repair Updated: "+l()(t,null,2)),e.snackbarMessage="Repair Updated Successfully",e.snackbarColor="success",e.snackbar=!0}).catch(function(t){e.snackbarMessage="Repair Update Error",e.snackbarColor="error",e.snackbar=!0,console.log("Update Repair error: "+l()(t,null,2))})}else{var a={hotelsn:this.selectedRoom.HotelSN,roomid:this.selectedRoom.RoomID,maintenanceid:null,description:this.selectedRepair.Description,amount:this.selectedRepair.Amount,whoreported:1,technicianid:1,photo:null};v.post("Repair/announce",a).then(function(t){console.log("Repair Announced: "+l()(t,null,2)),e.snackbarMessage="Repair Created Successfully",e.snackbarColor="success",e.snackbar=!0}).catch(function(t){e.snackbarMessage="Repair Creation Error",e.snackbarColor="error",e.snackbar=!0,console.log("Create Repair error: "+l()(t,null,2))})}}}}),y={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-container",{attrs:{fluid:""}},[a("v-layout",{attrs:{row:"",wrap:""}},[a("v-flex",{attrs:{xs12:"",sm3:""}},[a("div",{staticClass:"panel-container"},[a("div",{staticClass:"panel-header"},[a("p",[e._v("Rooms")])]),e._v(" "),a("div",{staticClass:"actions-container"},[a("v-tooltip",{attrs:{left:""}},[a("v-btn",{staticStyle:{width:"30px",height:"30px"},attrs:{slot:"activator",color:"primary",small:"",fab:"",loading:e.roomsLoading,disabled:e.roomsLoading},nativeOn:{click:function(t){e.getRooms()}},slot:"activator"},[a("v-icon",[e._v("refresh")])],1),e._v(" "),a("span",[e._v("Refresh")])],1),e._v(" "),a("v-btn",{attrs:{color:"primary",small:"",outline:!e.onlyPending},on:{click:function(t){e.onChangeSelection()}}},[e._v("\n            Pending\n          ")]),e._v(" "),a("v-btn",{attrs:{color:"primary",small:"",outline:e.onlyPending},on:{click:function(t){e.onChangeSelection()}}},[e._v("\n            All\n          ")])],1),e._v(" "),a("div",{staticClass:"panel-contents"},[a("v-data-table",{staticClass:"elevation-1",attrs:{headers:e.roomHeaders,items:e.allRooms,"must-sort":"","rows-per-page-items":e.rowsPerPage},scopedSlots:e._u([{key:"items",fn:function(t){return[a("tr",{class:{"room-selected":e.selectedRoom.Number===t.item.Number},on:{click:function(a){e.onSelectRoom(t.item)}}},[a("td",[e._v(e._s(t.item.Number))]),e._v(" "),a("td",[e._v(e._s(t.item.PendingRepairsCount)+"/"+e._s(t.item.AllRepairsCount))])])]}}])})],1)])]),e._v(" "),a("v-flex",{attrs:{xs12:"",sm4:""}},[a("div",{staticClass:"panel-container"},[a("div",{staticClass:"panel-header"},[a("p",[e._v("Repairs for room "),a("span",{staticStyle:{color:"#FFCCBC","font-weight":"bold"}},[e._v(e._s(e.selectedRoom.Number))])])]),e._v(" "),a("div",{staticClass:"actions-container"},[a("v-tooltip",{attrs:{left:""}},[a("v-btn",{staticStyle:{width:"30px",height:"30px"},attrs:{slot:"activator",color:"primary",small:"",fab:"",disabled:e.repairsLoading},nativeOn:{click:function(t){e.getRoomRepairs()}},slot:"activator"},[a("v-icon",[e._v("refresh")])],1),e._v(" "),a("span",[e._v("Refresh")])],1),e._v(" "),a("v-tooltip",{attrs:{right:""}},[a("v-btn",{staticStyle:{width:"30px",height:"30px"},attrs:{slot:"activator",color:"primary",small:"",fab:"",dark:""},on:{click:function(t){e.addRepair()}},slot:"activator"},[a("v-icon",[e._v("add")])],1),e._v(" "),a("span",[e._v("Announce a Repair")])],1)],1),e._v(" "),a("div",{staticClass:"panel-contents"},[a("v-data-table",{staticClass:"elevation-1",attrs:{items:e.selectedRoom.Repairs,"hide-headers":"","must-sort":"","rows-per-page-items":e.rowsPerPage},scopedSlots:e._u([{key:"items",fn:function(t){return[a("tr",{class:{"repair-selected":e.selectedRepair.RepairID===t.item.RepairID},on:{click:function(a){e.onSelectRepair(t.item)}}},[t.item.EndAt||t.item.StartAt?e._e():a("td",[a("v-icon",{attrs:{color:"warning"}},[e._v("fa-exclamation-circle")])],1),e._v(" "),t.item.StartAt&&!t.item.EndAt?a("td",[a("v-icon",{attrs:{color:"info"}},[e._v("fa-play-circle")])],1):e._e(),e._v(" "),t.item.EndAt?a("td",[a("v-icon",{attrs:{color:"success"}},[e._v("fa-check-circle")])],1):e._e(),e._v(" "),a("td",[e._v(e._s(t.item.Description))]),e._v(" "),a("td",[e._v(e._s(e._f("date")(t.item.AnnouncedAt)))])])]}}])})],1)])]),e._v(" "),a("v-flex",{attrs:{xs12:"",sm5:""}},[e.selectedRepair.isEmpty?e._e():a("div",{staticClass:"panel-container",class:{"new-repair":e.selectedRepair.isNew},staticStyle:{padding:"20px"}},[a("form",[a("v-text-field",{ref:"descriptionInputBox",attrs:{label:"Description",clearable:""},model:{value:e.selectedRepair.Description,callback:function(t){e.$set(e.selectedRepair,"Description",t)},expression:"selectedRepair.Description"}}),e._v(" "),a("v-container",{attrs:{"grid-list-md":"",fluid:""}},[a("v-layout",{attrs:{row:"",wrap:"","justify-space-between":""}},[a("v-flex",{attrs:{xs5:""}},[a("v-text-field",{attrs:{label:"Amount","prepend-icon":"fa-euro-sign"},model:{value:e.selectedRepair.Amount,callback:function(t){e.$set(e.selectedRepair,"Amount",t)},expression:"selectedRepair.Amount"}})],1),e._v(" "),a("v-flex",{attrs:{xs6:"","align-end":""}},[a("v-select",{attrs:{label:"Who Reported ?",items:e.whoReportedList},model:{value:e.selectedRepair.reportedFrom,callback:function(t){e.$set(e.selectedRepair,"reportedFrom",t)},expression:"selectedRepair.reportedFrom"}})],1)],1)],1),e._v(" "),a("v-text-field",{attrs:{label:"Technician",readonly:""},model:{value:e.selectedRepair.Technician,callback:function(t){e.$set(e.selectedRepair,"Technician",t)},expression:"selectedRepair.Technician"}}),e._v(" "),a("p",{staticClass:"repair-label"},[a("span",{staticStyle:{"font-weight":"500"}},[e._v("Announced :")]),e._v(" "),e.selectedRepair.AnnouncedAt?a("span",[e._v(e._s(e._f("date")(e.selectedRepair.AnnouncedAt)))]):e._e()]),e._v(" "),a("p",{staticClass:"repair-label"},[a("span",{attrs:{id:"repair-started-date"}},[e._v("Started :")]),e._v(" "),e.selectedRepair.StartAt?a("span",[e._v(e._s(e._f("date")(e.selectedRepair.StartAt)))]):a("span",[e._v("Not Started")])]),e._v(" "),a("p",{staticClass:"repair-label"},[a("span",{attrs:{id:"repair-fixed-date"}},[e._v("Fixed :")]),e._v(" "),e.selectedRepair.EndAt?a("span",[e._v(e._s(e._f("date")(e.selectedRepair.EndAt)))]):a("span",[e._v("Not Fixed")])]),e._v(" "),a("v-btn",{attrs:{color:"success",outline:!e.repairFixed,small:""},on:{click:function(t){e.onFixRepair()}}},[e._v("\n            Fixed\n          ")]),e._v(" "),a("v-btn",{attrs:{color:"warning",outline:!e.repairStarted,small:""},on:{click:function(t){e.onStartRepair()}}},[e._v("\n            Started\n          ")]),e._v(" "),a("br"),e._v(" "),a("v-btn",{attrs:{color:"secondary",small:"",fab:""},on:{click:function(t){e.onSaveRepair()}}},[a("v-icon",[e._v("save")])],1),e._v(" "),a("v-btn",{attrs:{color:"error",small:"",fab:""}},[a("v-icon",[e._v("fa-trash-alt")])],1)],1)])])],1),e._v(" "),a("v-snackbar",{attrs:{color:e.snackbarColor},model:{value:e.snackbar,callback:function(t){e.snackbar=t},expression:"snackbar"}},[e._v("\n    "+e._s(e.snackbarMessage)+"\n    "),a("v-btn",{attrs:{dark:"",flat:""},nativeOn:{click:function(t){e.snackbar=!1}}},[e._v("Close")])],1)],1)},staticRenderFns:[]};var C=a("VU/8")(w,y,!1,function(e){a("S2Yo")},"data-v-234e2438",null).exports,H={render:function(){this.$createElement;this._self._c;return this._m(0)},staticRenderFns:[function(){var e=this.$createElement,t=this._self._c||e;return t("div",{attrs:{id:"temp-header-container"}},[t("p",{attrs:{id:"temp-header"}},[this._v("\n    Housekeeping coming soon !!\n  ")])])}]};var N=a("VU/8")(null,H,!1,function(e){a("uoF0")},"data-v-21435586",null).exports,A={render:function(){this.$createElement;this._self._c;return this._m(0)},staticRenderFns:[function(){var e=this.$createElement,t=this._self._c||e;return t("div",[t("p",[this._v("Settings")])])}]},I=a("VU/8")(null,A,!1,null,null,null).exports;r.a.use(_.a);var D=new _.a({routes:[{path:"/",name:"Home",component:k},{path:"/repairs",name:"Repairs",component:C},{path:"/housekeeping",name:"Housekeeing",component:N},{path:"/settings",name:"Settings",component:I}],mode:"history"}),E=a("3EgV"),P=a.n(E),F=a("l43w"),L=(a("7zck"),a("IHMs")),$=a.n(L),T=a("UnSZ"),V=a.n(T),O=function(e,t){(0,e.commit)("updateHotel",t)},M=function(e,t){e.hotel=t},B=function(e){return e.hotel.hotelsn},U=function(e){return e.hotel},q=function(e){return!!(e.hotelsn&&e.hotelsn.length>0)};r.a.use(u.a);var W=new u.a.Store({state:{hotel:{hotelsn:"",name:""}},getters:o,mutations:i,actions:n});r.a.use(P.a,{theme:{primary:$.a.deepOrange.darken4,secondary:$.a.indigo.darken2,accent:$.a.deepOrange.lighten-4,info:$.a.blue.lighten3,warning:$.a.amber.lighten2,error:$.a.red.accent2,success:$.a.green.lighten2}}),r.a.use(V.a),r.a.use(F.a,{breakpoints:{mobile:450,tablet:900,laptop:1250,desktop:1/0}}),r.a.filter("date",b),r.a.config.productionTip=!1,new r.a({el:"#app",store:W,router:D,components:{App:f},render:function(e){return e(f)},localStorage:{miniVariant:{type:Boolean}}})},S2Yo:function(e,t){},"mq/c":function(e,t){},pdTa:function(e,t){},uoF0:function(e,t){}},["NHnr"]);
//# sourceMappingURL=app.1213280a2946a459a555.js.map