import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service';
import { Storage } from '@ionic/storage';
import { PersonalChangePage } from '../personal-change/personal-change';

/**
 * Generated class for the PersonalDataPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-personal-data',
  templateUrl: 'personal-data.html',
})
export class PersonalDataPage {
  Permiss_Admin: boolean = false;
  Permiss_Users: boolean = false;
  Login_Data: any;
  Path_Image: string;
  Detail_Data: any;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private authService: AuthServiceProvider,
    private storage: Storage,
    // public modalCtrl: ModalController,
    // public events: Events
  ) {
    this.Path_Image = this.authService.Get_Path_Image();

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
        this.Detail_Data = this.Login_Data;
      }
      else if (this.Login_Data.User_Id) {
        // console.log("Users");
        this.Detail_Data = this.Login_Data;
        this.Permiss_Users = true;
      }
    });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad PersonalDataPage');
  }
  Change_Personal() {
    let items = { "item": this.Login_Data, "State": "Change_User_Personal" }
    this.navCtrl.push(PersonalChangePage, { items });
  }
  ionViewWillEnter() {
    this.Manage_permiss();
  }
  Change_Password() {
    let items = { "item": this.Login_Data, "State": "Change_User_Pass" }
    this.navCtrl.push(PersonalChangePage, { items });
  }
  Change_Admin_Password() {
    let items = { "item": this.Login_Data, "State": "Change_Admin_Pass" }
    this.navCtrl.push(PersonalChangePage, { items });
  }
  Change_Admin_Personal() {
    let items = { "item": this.Login_Data, "State": "Change_Admin_Personal" }
    this.navCtrl.push(PersonalChangePage, { items });
  }


}
