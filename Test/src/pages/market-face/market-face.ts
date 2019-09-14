import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Events, AlertController } from 'ionic-angular';
import { MarketFilterPage } from '../market-filter/market-filter';
import { MarketDetailsPage } from '../market-details/market-details';
import { Storage } from '@ionic/storage';
import { AuthServiceProvider } from '../../providers/auth-service';

/**
 * Generated class for the MarketFacePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-market-face',
  templateUrl: 'market-face.html',
})
export class MarketFacePage {
  Post_Data: any = { MarketType: ["all"] };


  Response_Data: any;
  items: any;
  Response_Image: any;
  Response_Image_real:any;
  Path_Image: string;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public events: Events,
    private storage: Storage,
    public authService: AuthServiceProvider,
    public alertCtrl: AlertController
  ) {
    this.Path_Image = this.authService.Get_Path_Image();
    // console.log('UserId', navParams.get('userId'));
    this.Load_Data();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MarketFacePage');
  }
  Goto_Market_Filter() {
    this.navCtrl.push(MarketFilterPage);
  }
  Click_Data(item, index) {
    // console.log(item);
    // console.log("Response_Data = ",this.Response_Data);
    let items = { "item": item, "Image": this.Response_Image[index][0] }
    this.navCtrl.push(MarketDetailsPage, { items });
    // this.navCtrl.push(MarketDetailsPage);

  }
  ionViewWillEnter() {
    this.events.subscribe('Fil_Market_Data', (Filter_Data) => {

      // console.log('Search_Data = ', Filter_Data);
      this.Post_Data = Filter_Data;
      this.Load_Data();
      this.events.unsubscribe('Fil_Market_Data')
    });
    this.events.subscribe('Load_Data', (Data) => {
      // console.log("================In Knowledge==============");
      this.Load_Data();
      this.events.unsubscribe('Load_Data');
    });
  }
  ionViewWillLeave() {
    this.events.publish('Set_Filter_Market', this.Post_Data);
  }

  Load_Data() {
    this
      .authService
      .postData(this.Post_Data, "Get_Market_Data")
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

}

