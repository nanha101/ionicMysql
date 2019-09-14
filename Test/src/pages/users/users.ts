import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service';
import { UsersDetailsPage } from '../users-details/users-details';

/**
 * Generated class for the UsersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-users',
  templateUrl: 'users.html',
})
export class UsersPage {
  User_Data: any;
  items: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private authService: AuthServiceProvider,
    // private storage: Storage,
    // public modalCtrl: ModalController,
    // public events: Events
  ) {
    this.Load_Data();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UsersPage');
  }
  Load_Data() {
    // console.log("Hello Nan");
    // console.log(this.test);
    this
      .authService
      .postData("", "Get_Users")
      .then((result) => {
        // console.log("Hello Nan");
        // console.log(result);
        this.User_Data = result;
        this.User_Data = this.User_Data.User_Data;
        this.items = this.User_Data
        console.log(this.User_Data);
      });
  }
  initializeItems() {
    this.items = this.User_Data;
    // console.log(this.items);
  }
  getItems(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();
    // set val to the value of the searchbar
    const val = ev.target.value;
    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        return (item.User_Name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }
  Click_Data(item, index) {
    // console.log(item);
    // console.log("Response_Data = ",this.Response_Data);
    let items = { "item": item }
    this.navCtrl.push(UsersDetailsPage, { items });

  }

}
