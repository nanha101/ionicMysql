import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Events, AlertController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service';
import { Storage } from '@ionic/storage';
import { Ng2ImgMaxService } from 'ng2-img-max';

/**
 * Generated class for the NotificationAddPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-notification-add',
  templateUrl: 'notification-add.html',
})
export class NotificationAddPage {

  Path_Image: string;
  Profile_Show: any;
  Profile_Image: any = null;
  Response_Data: any;
  User_Data: any;
  items: any;

  Noti_Add_Data = {
    "Noti_Title": "",
    "Noti_Content": "",
    "Noti_Date": "",
    "Noti_Time": "",
    "Noti_Image": "",
    "Admin_Id": "",
    "User_Id": "",
  };
  Users: any;
  Login_Data: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public events: Events,
    public authService: AuthServiceProvider,
    private storage: Storage,
    public alertCtrl: AlertController,
    private _ng2ImgMax: Ng2ImgMaxService, // resize image file
  ) {
    this.Manage_permiss()
    this.Load_Data();
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
        this.Noti_Add_Data.Admin_Id = this.Login_Data.Admin_Id;
      }

      // this.Login_Data.User_Noti_State;
      // console.log("Users");

    });
  }
  Get_Base64_Profile(event) {
    let reader = new FileReader();
    reader.readAsDataURL(event)   // before event[ii]
    reader.onload = (e) => {
      // console.log("i in onload = ", ii);
      this.Profile_Show = reader.result;
      // console.log("this.imgshow = ", this.imgShow[1]);
    }
  }
  Resize_Image_Profile(event) {
    // this.Pro_Show = true;
    // this.State_Upload_Profile = true;
    // console.log("Hellooooooooo");
    this._ng2ImgMax.resizeImage(event[0], 2000, 1000).subscribe((result) => {
      // console.log("rusult = ", result);
      this.Profile_Image = result;
      // this.Path_Image_Profile = null;

      // console.log("Regis_Data = ", this.Regis_Data);
      this.Get_Base64_Profile(this.Profile_Image);
    }, error => console.log(error)
    );
  }
  BrowseProfile(event) {
    // console.log(event);
    this.Path_Image = null;
    if (event.length != 0) {
      console.log("innnnnnn")
      this.Resize_Image_Profile(event);
    }
    // } //end loop
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad NotificationAddPage');
  }
  dismiss() {
    this.viewCtrl.dismiss();
  }

  Set_Date_Time() {
    let today = new Date();
    let day = (today.getFullYear() + 543) + "-" + (today.getMonth() + 1) + "-" + (today.getDate());
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    this.Noti_Add_Data.Noti_Date = day;
    this.Noti_Add_Data.Noti_Time = time;
    // this.News_Add_Data.Admin_Id = this.Login_Data.Admin_Id;

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
  Confirm() {
    this.Set_Date_Time();
    console.log("Noti_Add_Data = ", this.Noti_Add_Data)
    let dataFrom = new FormData();
    if (this.Noti_Add_Data.Noti_Title == "" || this.Noti_Add_Data.Noti_Content == "") {
      this.Alert("กรุณากรอกข้อมูลให้ครบด้วยค่ะ");
    }
    else {
      if (this.Profile_Image != null) {

        dataFrom.append('Profile_Image', this.Profile_Image)
        dataFrom.append("_Data", JSON.stringify(this.Noti_Add_Data));
        dataFrom.append("Function_Name", "Upload_Notification");
        this.authService.Upload_Item(dataFrom).then((result) => {
          // this.Load_Login_Data();
          this.Alert("แก้ไขข้อมูลส่วนตัวสำเร็จ")
          this.dismiss();
        })
      }
      else {
        console.log("have no image")
        // dataFrom.append('Profile_Image', this.Profile_Image)
        dataFrom.append("_Data", JSON.stringify(this.Noti_Add_Data));
        dataFrom.append("Function_Name", "Upload_Notification");
        this.authService.Upload_Item(dataFrom).then((result) => {
          // this.Load_Login_Data();
          this.Alert("แก้ไขข้อมูลส่วนตัวสำเร็จ")
          this.dismiss();
        })
      }
    }
  }
  Load_Data() {
    this
      .authService
      .postData("", "Get_Users")
      .then((result) => {
        // console.log("Hello Nan");
        // console.log(result);
        this.User_Data = result;
        this.User_Data = this.User_Data.User_Data;
        this.items = this.User_Data
        console.log("user = ", this.User_Data);
      });
  }
}
