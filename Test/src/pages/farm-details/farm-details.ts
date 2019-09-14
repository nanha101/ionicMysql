import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, AlertController, ModalController, Events } from 'ionic-angular';

import { AuthServiceProvider } from '../../providers/auth-service';
import { Storage } from '@ionic/storage';
import { FarmAddPage } from '../farm-add/farm-add';
import { FarmPage } from '../farm/farm';
import { Placeholder } from '@angular/compiler/src/i18n/i18n_ast';

declare var google: any;

@IonicPage()
@Component({
  selector: 'page-farm-details',
  templateUrl: 'farm-details.html',
})
export class FarmDetailsPage {
  @ViewChild('map') mapRef: ElementRef;
  // @ViewChild('map') mapRef: ElementRef;
  // @ViewChild('map')
  // @ViewChild('map') mapRef: any;
  map: any;
  // map: google.maps.Map
  Post_Data = {
    "Noti_Title": "",
    "Noti_Content": "",
    "Noti_Date": "",
    "Noti_Time": "",
    "User_Id": "",
    "Admin_Id": ""

  }
  Show_Map = true;
  Detail_Data: any;
  Response_Image: any;
  Path_Image: string;
  bt_allow: boolean = false;
  Permiss_User_myself: boolean = false;
  Permiss_Admin: boolean = false;
  Login_Data: any;
  Can_Delete: boolean = false;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private storage: Storage,
    public authService: AuthServiceProvider,
    // public plt: Platform,
    public alertCtrl: AlertController,
    public modalCtrl: ModalController,
    public events: Events,
  ) {
    this.Path_Image = this.authService.Get_Path_Image();
    this.Set_Data()
    // this.ShowMap("");
    // this.Manage_permiss();
    // this.ShowMap("dd");
    // this.ShowMap(this.navParams.get('items').item.Farm_Map);
    this.Manage_permiss();
  }
  Alert(msg) {
    // console.log("item = ", item.Know_Id);
    // console.log("Delete_know")
    const confirm = this.alertCtrl.create({
      title: 'คำเตือน',
      message: msg,
      buttons: [
        {
          text: 'ตกลง',
          // handler: () => {
          //   console.log('Disagree clicked');
          // }
        },
      ]
    });
    confirm.present();
  }
  ionViewDidLoad() {
    if (this.navParams.get('items').item.Farm_Map != null && this.navParams.get('items').item.Farm_Map != "") {
      this.DisplayMap(this.navParams.get('items').item.Farm_Map);
    }
    else {
      this.Show_Map = false;
    }
  }
  Manage_permiss() {
    this.storage.get("Login_Data").then((val) => {
      this.Login_Data = val;
      // console.log("admin = ",this.Login_Data.Admin_Id);
      // alert("Storage_Id: " + val);
      // console.log("Login_Data = ", this.Login_Data);

      if (this.Login_Data == null) {
      }
      else if (this.Login_Data.Admin_Id) {
        // console.log("Admin");
        this.Post_Data.Admin_Id = this.Login_Data.Admin_Id
        this.Permiss_Admin = true;
        this.Can_Delete = true;
      }
      else if (this.Login_Data.User_Id) {
        if (this.Login_Data.User_Id == this.Detail_Data.User_Id) {
          this.Permiss_User_myself = true;
          this.Can_Delete = true;

          // console.log("Users");
          // this.Load_MyFarm_Data();
        }
        // console.log("Users");
        // this.Load_MyFarm_Data();
      }
      // this.Set_Data();
    });
  }
  DisplayMap(farm_map) {
    console.log("Farm_Map = ", farm_map)
    // this.Show_Map = true;
    let Lat = farm_map.split(',')[0];
    let Lng = farm_map.split(',')[1];
    // console.log("Lat = ", Lat + "Lng = ", Lng);
    // const location = new google.maps.LatLng('17.385044', '78.486671')
    const location = new google.maps.LatLng(Lat, Lng)
    const options = {
      center: location,
      // cnter: new google.maps.LatLng(16.1991156, 103.2818088),
      // center: { lat: 17.677750, lng: 102.917028 },
      zoom: 10,
      // streetViewControl: false,
      // mapTypeId: 'terrain'
    };
    // this.map = new google.maps.Map(this.mapRef.nativeElement, Options)
    this.map = new google.maps.Map(this.mapRef.nativeElement, options)
    this.addMarker(location, this.map);
    // this.Show_Map = true;

  }
  addMarker(position, map) {
    return new google.maps.Marker({
      position,
      map
    });
  }

  ionViewWillEnter() {
    this.events.subscribe('Load_Data_farm', (Data) => {
      // console.log("================In Knowledge==============");
      // this.Load_Data();

      // this.events.publish('back_again', "");
      this.events.unsubscribe('Load_Data_farm');

      // this.navCtrl.pop();
      this.navCtrl.setRoot(FarmPage);
    });

  }
  Set_Data() {
    this.Detail_Data = this.navParams.get('items').item;
    this.Response_Image = this.navParams.get('items').Image;
    // console.log(this.navParams.get('items').State);
    if (this.navParams.get('items').State == "Allow") {
      this.bt_allow = true;
    }
    this.Manage_permiss();
    // this.DisplayMap("");
    // this.ShowMap(this.Detail_Data.Farm_Map);
    // console.log("Map = ",this.Detail_Data.Farm_Map)
    // console.log("this.Detail_Data = ", this.Detail_Data);
    // console.log("this.Response_Image = ", this.Response_Image);

  }
  BackPage() {
    this.navCtrl.pop();
  }
  Update_Farm_State() {
    let dataFrom = new FormData();
    dataFrom.append("_Data", JSON.stringify(this.Detail_Data));
    dataFrom.append("Function_Name", "Update_Farm_State");
    this.authService.Update_Item(dataFrom).then((res) => {
      this.navCtrl.pop();
      // this.navCtrl.canGoBack
    })



  }
  Change_News() {

    let items = { "item": this.Detail_Data, "Image": this.Response_Image }
    let modal = this.modalCtrl.create(FarmAddPage, { items });
    modal.present();

  }
  Set_Date_Time() {
    let today = new Date();
    let day = (today.getFullYear() + 543) + "-" + (today.getMonth() + 1) + "-" + (today.getDate());
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    this.Post_Data.Noti_Date = day;
    this.Post_Data.Noti_Time = time;
    // this.Farm_Add_Data.User_Id = this.Login_Data.User_Id;

  }
  Deny_Farm() {
    this.Set_Date_Time();
    console.log("details_data = ", this.Detail_Data)
    // let dataFrom = new FormData();
    // dataFrom.append("Farm_Id", this.Detail_Data.Farm_Id);
    // dataFrom.append("Function_Name", "Deny_Farm");
    // this.authService.Delete_Item(dataFrom).then((res) => {
    //   // console.log("End")
    //   // this.SetIcon = true;
    //   // this.Load_Data();
    //   this.BackPage();
    // })

    let alert = this.alertCtrl.create({
      title: 'ต้องการแจ้งไปยังสมาชิกหรือไม่',
      inputs: [
        {
          name: 'message',
          placeholder: 'ข้อความแจ้งเตือนไปยังสมาชิก'
        }

      ],
      buttons: [
        {
          text: 'ยกเลิก',
          role: 'cancel',
          handler: data => {

            // console.log('Cancel clicked');
          }
        },
        {
          text: 'ตกลง',
          handler: data => {
            this.Post_Data.User_Id = this.Detail_Data.User_Id
            this.Post_Data.Noti_Title = "การอนุมัติฟาร์ม"
            this.Post_Data.Noti_Content = data.message;
            console.log("post_data = ", this.Post_Data)
            // this.Alert(data.message);
            this
              .authService
              .postData(this.Post_Data, "Add_Notification")
              .then((result) => {
                // console.log("asdfklajsfdkljasldfkjasf");
                // console.log("result = "+result);
                // this.Response_Data = result;
                // console.log("Hello");

              });
          }
        }
      ]
    });
    alert.present();


    let dataFrom = new FormData();
    dataFrom.append("_Data", JSON.stringify(this.Detail_Data));
    dataFrom.append("Function_Name", "Update_deny_Farm_State");
    this.authService.Update_Item(dataFrom).then((res) => {
      this.navCtrl.pop();
      // this.navCtrl.canGoBack
    })
  }
  Delete_Farm() {
    const confirm = this.alertCtrl.create({
      title: 'ยืนยันการลบรายการ',
      message: 'คุณต้องการยืนยันการลบรายการนี้หรือไม่?',
      buttons: [
        {
          text: 'ยกเลิก',
        },
        {
          text: 'ยืนยัน',
          handler: () => {
            let dataFrom = new FormData();
            dataFrom.append("Farm_Id", this.Detail_Data.Farm_Id);
            dataFrom.append("Function_Name", "Deny_Farm");
            this.authService.Delete_Item(dataFrom).then((res) => {
              // console.log("End")
              // this.SetIcon = true;
              // this.Load_Data();
              this.BackPage();
            })

          }
        }
      ]
    });
    confirm.present();
  }

}