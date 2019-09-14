import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AuthServiceProvider } from '../../providers/auth-service';

/**
 * Generated class for the NotificationDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-notification-details',
  templateUrl: 'notification-details.html',
})
export class NotificationDetailsPage {
  Detail_Data: any;
  Path_Image: string;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private authService: AuthServiceProvider,
    private storage: Storage,
    // public modalCtrl: ModalController,
    // public events: Events
  ) {
    this.Path_Image = this.authService.Get_Path_Image();
    this.Set_Data();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotificationDetailsPage');
  }
  Manage_permiss() {
    // this.storage.get("Login_Data").then((val) => {
    //   this.Login_Data = val;
    //   // console.log("admin = ",this.Login_Data.Admin_Id);
    //   // alert("Storage_Id: " + val);
    //   // console.log("Login_Data = ", this.Login_Data);

    //   if (this.Login_Data == null) {
    //   }
    //   else if (this.Login_Data.Admin_Id) {
    //     // console.log("Admin");
    //     this.Permiss_Admin = true;
    //   }
    //   else if (this.Login_Data.User_Id) {
    //     console.log("Users");
    //   }
    // });
  }

  Set_Data() {
    this.Detail_Data = this.navParams.get('items').item;
    console.log("this.Detail_Data = ", this.Detail_Data);
    // console.log("item = ", this.item);

  }

}
