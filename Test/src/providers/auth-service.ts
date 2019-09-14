// import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { formDirectiveProvider } from '@angular/forms/src/directives/ng_form';


// let apiUrll = "http://www.khongtaamfun.com/users/api/image";

let apiUrl = "http://172.20.10.8/api/";
let Path_Image = "http://172.20.10.8/api/image/";

// let apiUrl = "https://higher-nonavailabil.000webhostapp.com/api/";//mี่อยู่ website เรา higher-nonavailabil ตั้งตอนสมัคร
// let Path_Image = "https://higher-nonavailabil.000webhostapp.com/api/image/";

// let apiUrl = "http://127.0.0.1/api/";
// let Path_Image = "http://127.0.0.1/api/image/";
/* 
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthServiceProvider {

  constructor(public http: Http) {
    console.log('Hello AuthServiceProvider Provider');
  }
  postData(credentials, type) {

    return new Promise((resolve, reject) => {
      let headers = new Headers();
      this.http.post(apiUrl + type, JSON.stringify(credentials), { headers: headers }).
        subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });

    });
  }

  Get_Path_Image() {
    return Path_Image;
  }

  Upload_Item(_obj) {
    console.log("_upload => ", _obj)
    // console.log("Up_Data = ",Up_Data);
    // let headers = new Headers();
    //,JSON.stringify(Up_Data)

    return new Promise((resolve, reject) => {
      this.http.post(apiUrl + 'upload.php', _obj).
        subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });

    })
  }
  Update_Item(_obj) {
    console.log("_update => ", _obj)
    // console.log("Up_Data = ",Up_Data);
    // let headers = new Headers();
    //,JSON.stringify(Up_Data)
    return new Promise((resolve, reject) => {
      this.http.post(apiUrl + 'update.php', _obj).
        subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });

    })
  }
  Delete_Item(_obj) {
    // console.log("_upload => ", _obj)
    // console.log("Up_Data = ",Up_Data);
    // let headers = new Headers();
    //,JSON.stringify(Up_Data)
    return new Promise((resolve, reject) => {
      this.http.post(apiUrl + 'delete.php', _obj).
        subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });

    })
  }


}
