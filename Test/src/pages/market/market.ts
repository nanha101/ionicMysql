import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MarketFilterPage } from '../market-filter/market-filter';
import { MarketDetailsPage } from '../market-details/market-details';
import { NewsPage } from '../news/news';
import { MarketFacePage } from '../market-face/market-face';
import { MarketProductOfMePage } from '../market-product-of-me/market-product-of-me';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the MarketPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-market',
  templateUrl: 'market.html',
})
export class MarketPage {
  tab1Root = MarketFacePage;
  tab2Root = MarketProductOfMePage;

  Login_Data: any;
  Permiss_Admin: boolean = false;
  Permiss_User: boolean = false;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private storage: Storage,
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
      }
      else if (this.Login_Data.User_Id) {
        this.Permiss_User = true;
        console.log("Users");
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MarketPage');
  }
 

}
