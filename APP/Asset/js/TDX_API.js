//TDX API驗證header
function getAuthorizationHeader() {
  //  填入自己 ID、KEY 開始
      let AppID = '87115fa4197645d591dc6280a3be89a0';
      let AppKey = '17xoWssRJ7HDiACPh89qKLE-NXs';
  //  填入自己 ID、KEY 結束
      let GMTString = new Date().toGMTString();
      let ShaObj = new jsSHA('SHA-1', 'TEXT');
      ShaObj.setHMACKey(AppKey, 'TEXT');
      ShaObj.update('x-date: ' + GMTString);
      let HMAC = ShaObj.getHMAC('B64');
      let Authorization = 'hmac username=\"' + AppID + '\", algorithm=\"hmac-sha1\", headers=\"x-date\", signature=\"' + HMAC + '\"';
      return { 'Authorization': Authorization, 'X-Date': GMTString }; 
  }
// 範例
// function getAPI(url){
//   axios.get(
//     url,
//     {
//         headers: getAuthorizationHeader()
//     }
//   )
//   .then(function (response) {
//     console.table(response.data);
//   })
//   .catch(function (error) {
//     console.log(error);
//   }); 
// }
export {getAuthorizationHeader}
