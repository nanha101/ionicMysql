import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides, AlertController, ModalController, Events } from 'ionic-angular';
import { MarketShowPhotoPage } from '../market-show-photo/market-show-photo';
import { AuthServiceProvider } from '../../providers/auth-service';
import { Storage } from '@ionic/storage';
import { MarketAddPage } from '../market-add/market-add';
import { MarketPage } from '../market/market';

/**
 * Generated class for the MarketDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-market-details',
  templateUrl: 'market-details.html',
})

export class MarketDetailsPage {
  @ViewChild(Slides) slides: Slides;

  Detail_Data: any = {};
  Response_Image: any;
  Path_Image: string;

  Permiss_User_myself: boolean = false;
  Permiss_Admin: boolean = false;
  Login_Data: any;
  Can_Delete: boolean = false;
  constructor(
    public navCtrl: NavController,
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
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad MarketDetailsPage');
  }
  GoToShowImage() {
    // this.navCtrl.push(MarketShowPhotoPage);
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
        this.Can_Delete = true;
      }
      else if (this.Login_Data.User_Id) {
        if (this.Login_Data.User_Id == this.Detail_Data.User_Id) {
          this.Permiss_User_myself = true;
          this.Can_Delete = true;
        }
      }
      // this.Set_Data();
    });
  }
  Set_Data() {
    this.Detail_Data = this.navParams.get('items').item;
    this.Response_Image = this.navParams.get('items').Image;
    console.log(this.navParams.get('items').item)
    console.log(this.navParams.get('items').Image)
    // console.log(this.navParams.get('items').State);
    // if (this.navParams.get('items').State == "Allow") {
    //   // this.bt_allow = true;
    // }
    this.Manage_permiss();

    // this.DisplayMap("");
    // this.ShowMap(this.Detail_Data.Farm_Map);
    // console.log("Map = ",this.Detail_Data.Farm_Map)
    // console.log("this.Detail_Data = ", this.Detail_Data);
    // console.log("this.Response_Image = ", this.Response_Image);

  }
  Change_Market() {

    let items = { "item": this.Detail_Data, "Image": this.Response_Image }
    let modal = this.modalCtrl.create(MarketAddPage, { items });
    modal.present();
  }
  ionViewWillEnter() {
    this.events.subscribe('Load_Data', (Data) => {
      // console.log("================In Market_Datails==============");
      this.events.publish('Load_Data', "For Load data again");
      this.navCtrl.pop();
      // this.events.unsubscribe('Back');
    });
  }

  Delete_Market() {
    // console.log("item = ", item.Know_Id);
    // console.log("Delete_know")
    const confirm = this.alertCtrl.create({
      title: 'ยืนยันการลบรายการ',
      message: 'คุณต้องการยืนยันการลบรายการนี้หรือไม่?',
      buttons: [
        {
          text: 'ยกเลิก',
          // handler: () => {
          //   console.log('Disagree clicked');
          // }
        },
        {
          text: 'ยืนยัน',

          handler: () => {
            // console.log('Agree clicked');
            let dataFrom = new FormData();
            dataFrom.append("Market_Id", this.Detail_Data.Market_Id);
            dataFrom.append("Function_Name", "Delete_Market");
            this.authService.Delete_Item(dataFrom).then((res) => {
              // console.log("End")
              // this.SetIcon = true;
              // this.Load_Data();
              this.navCtrl.setRoot(MarketPage);

            })

          }
        }
      ]
    });
    confirm.present();
  }
}

