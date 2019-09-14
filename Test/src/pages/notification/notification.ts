import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Events } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service';
import { Storage } from '@ionic/storage';
import { NewsDetailsPage } from '../news-details/news-details';
import { NotificationDetailsPage } from '../notification-details/notification-details';
import { NotificationAddPage } from '../notification-add/notification-add';

/**
 * Generated class for the NotificationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-notification',
  templateUrl: 'notification.html',
})
export class NotificationPage {
  Login_Data: any;
  Permiss_Admin: boolean = false;
  Permiss_User: boolean = false;
  Response_Data: any;
  Response_Image: any;
  Response_Data_pri: any;
  items_pri: any;
  items: any;
  // sausage:boolean = true;
  notification: boolean;
  Show_Noti: boolean = true;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private authService: AuthServiceProvider,
    private storage: Storage,
    public modalCtrl: ModalController,
    public events: Events
  ) {
    this.Manage_permiss();

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
        this.Permiss_Admin = true;
        this.Load_Data();
      }
      else if (this.Login_Data.User_Id) {
        this.Permiss_User = true;
        if (this.Login_Data.User_Noti_State == 0) {
          this.notification = false;
          this.Show_Noti = false;
        }
        else {
          this.Show_Noti = true;
          this.notification = true;
          this.Load_Data();
          this.Load_Notification();

        }
        // this.Login_Data.User_Noti_State;
        // console.log("Users");
      }
    });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad NotificationPage');
  }

  Load_Data() {
    // console.log("this.Post_Data = " + this.Post_Data);
    // }
    // console.log("asdasdf"+this.Post_Data.AnimalsType);
    this
      .authService
      .postData("", "Get_Notification")
      .then((result) => {
        this.Response_Data = result;
        this.Response_Image = result;
        if (this.Response_Data.News_Data) {
          // console.log("Hello");
          this.Response_Data = this.Response_Data.News_Data;
          this.items = this.Response_Data; //for Search
          // console.log(this.Response_Data);
          // console.log("Response_Data = ",this.Response_Data);
        }
        if (this.Response_Image.News_Image) {
          // let i=0;
          // console.log("Hello");
          this.Response_Image = this.Response_Image.News_Image;
          // console.log(this.Response_Image);
          for (let i = 0; i < this.Response_Image.length; i++) {
            // console.log(this.Response_Image[i]);
            if (this.Response_Image[i].length == 0) {
              // console.log(i);
              this.Response_Image[i].push({ Img_News_Name: "NO-IMAGE.jpg" });
            }
          }
          // console.log("Response_Image = ",this.Response_Image);
        }


      });
    // this.initializeItems();
  }
  Load_Notification() {
    // console.log("this.Post_Data = " + this.Post_Data);
    // }
    // console.log("asdasdf"+this.Post_Data.AnimalsType);
    this
      .authService
      .postData(this.Login_Data, "Get_Notification_private")
      .then((result) => {
        this.Response_Data_pri = result;
        if (this.Response_Data_pri.Noti_Data) {
          // console.log("Hello");
          this.Response_Data_pri = this.Response_Data_pri.Noti_Data;
          this.items_pri = this.Response_Data_pri; //for Search

          // console.log(this.Response_Data);
          // console.log("Response_Data = ",this.Response_Data);
        }

      });
    // this.initializeItems();
  }

  Click_Data(item, index) {
    // console.log(item);
    // console.log("Response_Data = ",this.Response_Data);
    let items = { "item": item, "Image": this.Response_Image[index] }
    this.navCtrl.push(NewsDetailsPage, { items });

  }
  Click_Data2(item, index) {

    console.log(item);
    // console.log("Response_Data = ",this.Response_Data);
    let items = { "item": item }
    this.navCtrl.push(NotificationDetailsPage, { items });

  }
  ionViewWillEnter() {
    this.Manage_permiss();
    // this.Load_Data();
  }
  ChangNoti() {
    if (this.notification == true) {
      this.Login_Data.User_Noti_State = 1;
      this.Show_Noti = true;
    }
    else {
      this.Login_Data.User_Noti_State = 0;
      this.Show_Noti = false;
    }
    this.storage.set("Login_Data", this.Login_Data);
    // console.log(this.Login_Data);
    // console.log("Notification = ", this.notification);
    this
      .authService
      .postData(this.Login_Data, "Change_Nofification")
      .then((result) => {
        // alert("Hello");
        // console.log(result);
        // this.Response_Data = result;
        this.Load_Data();
        this.Load_Notification();
        // alert(this.Response_Data.CanNot)
      });

  }

  openModal() {
    let modal = this.modalCtrl.create(NotificationAddPage);
    modal.present();
  }




}
