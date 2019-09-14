import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AuthServiceProvider } from '../../providers/auth-service';
import { MarketFilterOfMePage } from '../market-filter-of-me/market-filter-of-me';
import { MarketDetailsPage } from '../market-details/market-details';
import { MarketAddPage } from '../market-add/market-add';

/**
 * Generated class for the MarketProductOfMePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-market-product-of-me',
  templateUrl: 'market-product-of-me.html',
})
export class MarketProductOfMePage {
  Response_Data: any;
  items: any;
  Response_Image: any;
  Response_Image_real: any;
  Path_Image: string;
  Login_Data: any;
  Post_Data: any = { MarketType: ["all"] };
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private storage: Storage,
    public authService: AuthServiceProvider,
    public events: Events,
    public modalCtrl: ModalController,
  ) {
    this.storage.get("Login_Data").then((val) => {
      this.Login_Data = val;
      this.Load_Data();
    });
    this.Path_Image = this.authService.Get_Path_Image();
    // console.log('UserId', navParams.get('userId'));

  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad MarketProductOfMePage');
  }
  Load_Data() {
    console.log("post_data = ", this.Post_Data)
    let post_data = {
      "MarketType": this.Post_Data.MarketType,
      "User_Id": this.Login_Data.User_Id,
    }
    console.log("posts_data = ", post_data)
    this
      .authService
      .postData(post_data, "Get_Market_Ofme_Data")
      .then((result) => {
        // console.log(result);
        this.Response_Data = result;
        this.Response_Image_real = result;
        // this.Response_Image = result;
        if (this.Response_Data.Market_Data) {
          this.Response_Data = this.Response_Data.Market_Data;
          this.items = this.Response_Data; //for Search
          // console.log("this.Response_Data = ", this.Response_Data);

        }
        if (this.Response_Image_real.Market_Image) {
          this.Response_Image_real = this.Response_Image_real.Market_Image;

          // console.log(this.Response_Image);
          for (let i = 0; i < this.Response_Image_real.length; i++) {
            // console.log(this.Response_Image[i]);
            if (this.Response_Image_real[i][0].length == 0) {
              this.Response_Image_real[i][0].push({ Img_Market_Name: "NO-IMAGE.jpg" });
            }
          }
          this.Response_Image = this.Response_Image_real;
          // console.log("this.ResImage = ", this.Response_Image);
        }
        // this.getMyProduct(this.Login_Data.User_Id);
      });
    // this.initializeItems();
  }
  initializeItems() {
    this.items = this.Response_Data;
    this.Response_Image = this.Response_Image_real;
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
        return (item.Market_Name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
      this.Response_Image = this.Response_Image.filter((item) => {
        return (item[1].toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  getMyProduct(User_ID) {
    // console.log("sadfsfasdf = ",User_ID)
    // Reset items back to all of the items

    // set val to the value of the searchbar
    const val = User_ID;
    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.Response_Data = this.Response_Data.filter((item) => {
        // console.log("itemmmmmmmm = ",item)
        return (item.User_Id.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
    this.items = this.Response_Data; //for Search
  }
  ionViewWillEnter() {
    this.events.subscribe('Back', (Data) => {
      // console.log("================In Knowledge==============");
      this.Load_Data();

      this.events.unsubscribe('Back');
    });
    this.events.subscribe('Fil_MyProduct_Data', (Filter_Data) => {

      // console.log('Search_Data = ', Filter_Data);
      this.Post_Data = Filter_Data;
      this.Load_Data();
      this.events.unsubscribe('Fil_MyProduct_Data')
    });
  }
  ionViewWillLeave() {
    this.events.publish('Set_Filter2_Market', this.Post_Data);
  }
  Goto_Filter() {
    this.navCtrl.push(MarketFilterOfMePage)
  }
  Click_Data(item, index) {
    // console.log(item);
    // console.log("Response_Data = ",this.Response_Data);
    let items = { "item": item, "Image": this.Response_Image[index][0] }
    this.navCtrl.push(MarketDetailsPage, { items });
    // this.navCtrl.push(MarketDetailsPage);

  }
  openModal() {
    let modal = this.modalCtrl.create(MarketAddPage);
    modal.present();
  }

}
