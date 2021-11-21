import * as TDX from './TDX_API.js'


//bike部分

 // 將地圖匯入Leafet
 let map = L.map('map').setView([25.1441059,121.4626735], 16);
 L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
 attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
 maxZoom: 18,
 id: 'mapbox/streets-v11',
 tileSize: 512,
 zoomOffset: -1,
 accessToken: 'pk.eyJ1IjoibG9raW5nIiwiYSI6ImNrdzByZW9ydDFwYTIybnQzY2lmdHY0eG8ifQ.ZC0nThgW4arcAdKa5HTLmw'
 }).addTo(map);

 //新增marker，並將實體放盡marker
 var marker = L.marker([25.1441059,121.4626735]).addTo(map);
 //綁定marker，新增一個氣泡彈跳視窗，並且預設開啟
 marker.bindPopup("<b class='bg-primary'>Hello world!</b><br>I am a popup.").openPopup();
 //hover文字
 marker.bindTooltip("my tooltip text").openTooltip();

 const all_bike_city = ['Taichung','Hsinchu','MiaoliCounty','NewTaipei','PingtungCounty','KinmenCounty','Taoyuan','Taipei','Kaohsiung','Tainan','Chiayi']
 const bike_markers = {};
 //取得某縣市所有ubike站點：https://ptx.transportdata.tw/MOTC/v2/Bike/Station/NewTaipei?$format=JSON
 



function render_markers_basic_by_city(city){
//標出縣市所有marker，及站點名稱
 axios.get(
  `https://ptx.transportdata.tw/MOTC/v2/Bike/Station/${city}?$format=JSON`,
   {
     headers: TDX.getAuthorizationHeader()
   })
.then((res)=>{
  let data = res.data;
  data.forEach(item => {
    let x = item.StationPosition.PositionLat;
    let y = item.StationPosition.PositionLon;
    bike_markers[item.StationUID] = L.marker([x,y])
    .bindPopup(`<h2>${item.StationAddress.Zh_tw}</h2>`)
    .openPopup()
    .addTo(map);
  });
  //抓pop框文字
  console.log(bike_markers.NWT1001._popup._content);
})
}
function render_markers_available_by_city(city){
  axios.get(
    `https://ptx.transportdata.tw/MOTC/v2/Bike/Availability/${city}?$format=JSON`,
     {
       headers: TDX.getAuthorizationHeader()
     })
     .then((res) => {
       let data = res.data;
       console.log(data);
       data.forEach(item => {
         let marker = bike_markers[item.StationUID]
         let msg = marker._popup._content
         let rentNum = item.AvailableRentBikes
         let returnNum = item.AvailableReturnBikes
         let str = `${msg}<p>可借車輛 ${rentNum}</p><p>可停空位 ${returnNum}</p>`
         marker.bindPopup(str).addTo(map)
       })
     })
}
function render_markers_init(){
  all_bike_city.forEach(item => {
    render_markers_basic_by_city(item)
  })
  all_bike_city.forEach(item => {
    render_markers_available_by_city(item)
  })
}
render_markers_init();
