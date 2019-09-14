import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Events } from 'ionic-angular';
import { NewsFilterPage } from '../news-filter/news-filter';
import { AuthServiceProvider } from '../../providers/auth-service';
import { NewsDetailsPage } from '../news-details/news-details';
import { Storage } from '@ionic/storage';
import { NewsAddPage } from '../news-add/news-add';

/**
 * Generated class for the NewsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-news',
  templateUrl: 'news.html',
})
export class NewsPage {
  Post_Data: any = { AnimalsType: ["all"], NewsType: ["all"] };

  // manage login_data
  Permiss_Admin: boolean = false;
  Login_Data: any
  Response_Image_real
  // Animal_Name_real:any;
  // Know_T_Name_real:any;

  Response_Data: any;
  Response_Image: any;
  items: any;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private authService: AuthServiceProvider,
    private storage: Storage,
    public modalCtrl: ModalController,
    public events: Events
  ) {
    this.Manage_permiss();
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
        // console.log("Admin");
        this.Permiss_Admin = true;
      }
      else if (this.Login_Data.User_Id) {
        console.log("Users");
      }
    });
  }
  openModal() {
    let modal = this.modalCtrl.create(NewsAddPage);
    modal.present();
  }

  initializeItems() {
    this.items = this.Response_Data;
    this.Response_Image = this.Response_Image_real
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
        return (item.News_Name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })

      this.Response_Image = this.Response_Image.filter((item) => {
        return (item[1].toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  Goto_News_Filter() {
    this.navCtrl.push(NewsFilterPage);
  }
  Load_Data() {
    // console.log("this.Post_Data = " + this.Post_Data);
    // }
    // console.log("asdasdf"+this.Post_Data.AnimalsType);
    this
      .authService
      .postData(this.Post_Data, "Get_News_Data")
      .then((result) => {

        // Response_Image_real
        // Animal_Name_real:any;
        // Know_T_Name_real:any;

        this.Response_Data = result;
        this.Response_Image_real = result;
        if (this.Response_Data.News_Data) {
          // console.log("Hello");
          this.Response_Data = this.Response_Data.News_Data;
          this.items = this.Response_Data; //for Search
          // console.log(this.Response_Data);
          // console.log("Response_Data = ",this.Response_Data);
        }
        if (this.Response_Image_real.News_Image) {
          // let i=0;
          // console.log("Hello");
          this.Response_Image_real = this.Response_Image_real.News_Image;

          // console.log(this.Response_Image);
          for (let i = 0; i < this.Response_Image_real.length; i++) {
            // console.log(this.Response_Image[i]);
            if (this.Response_Image_real[i][0].length == 0) {
              // console.log(i);
              this.Response_Image_real[i][0].push({ Img_News_Name: "NO-IMAGE.jpg" });
            }
          }
          this.Response_Image = this.Response_Image_real
          // console.log("Response_Image = ",this.Response_Image);
        }

      });
    // this.initializeItems();
  }
  Click_Data(item, index) {
    // console.log(item);
    // console.log("Response_Data = ",this.Response_Data);
    let items = { "item": item, "Image": this.Response_Image[index][0] }
    this.navCtrl.push(NewsDetailsPage, { items });

  }
  ionViewWillEnter() {
    this.Load_Data();
    this.events.subscribe('Load_Data', (Data) => {
      console.log("================loaddata==============");
      this.Load_Data();
      // this.events.unsubscribe('Load_Data');
    });

    // this.events.subscribe('Updated', (Data) => {
    //   console.log("================loaddata==============");
    //   this.Load_Data();
    //   // this.events.unsubscribe('Load_Data');
    // });
    // this.Load_Data();
    this.events.subscribe('Fil_News_Data', (Filter_Data) => {
      // user and time are the same arguments passed in `events.publish(user, time)`
      console.log("================FilterNews==============");
      console.log('Search_Data = ', Filter_Data);

      this.Post_Data = Filter_Data;
      this.Load_Data();
      this.events.unsubscribe('Fil_News_Data')
      // console.log("this.Post_Data = " + this.Post_Data);   
    });
  }
  ionViewWillLeave() {
    this.events.publish('Set_Filter_News', this.Post_Data);
  }

}
