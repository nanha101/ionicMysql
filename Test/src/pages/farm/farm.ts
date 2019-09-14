import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, AlertController } from 'ionic-angular';
import { FarmDetailsPage } from '../farm-details/farm-details';
import { FarmOfMePage } from '../farm-of-me/farm-of-me';
import { Storage } from '@ionic/storage';
import { AuthServiceProvider } from '../../providers/auth-service';
/**
 * Generated class for the FarmPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-farm',
  templateUrl: 'farm.html',
})
export class FarmPage {

  Response_Data: any;
  items: any;
  Response_Image: any;
  Path_Image: string;
  // aaa = "1234,5678";
  Response_Image_real: any;
  Login_Data: any;
  Permiss_Admin: boolean = false;
  Permiss_User: boolean = false;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private storage: Storage,
    public authService: AuthServiceProvider,
    public events: Events,
    public alertCtrl: AlertController
  ) {
    this.Path_Image = this.authService.Get_Path_Image();
    // this.Load_Data();
    // console.log("aaa = ",this.aaa.split(',')[2]);
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

  Click_Data(item, index) {
    console.log("itemmmmm = ", item, "index=====", index);
    // console.log("Response_Data = ",this.Response_Data);
    let items = { "item": item, "Image": this.Response_Image[index][0] }
    this.navCtrl.push(FarmDetailsPage, { items });

  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad FarmPage');
  }
  GotoFarmDetails() {
    this.navCtrl.push(FarmDetailsPage);
  }
  Goto_Farm_MyFarm() {
    // let items = { "item": item, "Image": this.Response_Image[index] }
    // this.navCtrl.push(NewsDetailsPage, { items });
    let items;
    if (this.Permiss_Admin == true) {
      items = { state: 'admin' }
    }
    else if (this.Permiss_User == true) {
      items = { state: 'user' }
    }

    this.navCtrl.push(FarmOfMePage, { items });
  }
  Load_Data() {
    // console.log("this.Post_Data = " + this.Post_Data);
    // }
    // console.log("asdasdf"+this.Post_Data.AnimalsType);
    this
      .authService
      .postData("", "Get_Farm_Data")
      .then((result) => {
        // console.log(result);
        this.Response_Data = result;
        this.Response_Image_real = result;
        console.log(this.Response_Image_real)
        if (this.Response_Data.Farm_Data) {
          // console.log("Hello");
          this.Response_Data = this.Response_Data.Farm_Data;
          this.items = this.Response_Data; //for Search
          // console.log("this.Response_Data = ", this.Response_Data);

        }
        if (this.Response_Image_real.Farm_Image) {
          // console.log("Hello");
          this.Response_Image_real = this.Response_Image_real.Farm_Image;

          // this.Response_Image = this.Response_Image.Farm_Image;
          // console.log(this.Response_Image);
          for (let i = 0; i < this.Response_Image_real.length; i++) {
            // console.log(this.Response_Image[i]);
            if (this.Response_Image_real[i][0].length == 0) {
              // console.log(i);
              this.Response_Image_real[i][0].push({ Img_Farm_Name: "NO-IMAGE.jpg" });
            }
          }
          this.Response_Image = this.Response_Image_real

          // console.log("this.ResImage = ", this.Response_Image);
        }

      });
    // this.initializeItems();
  }
  ionViewWillEnter() {
    // console.log("Hellooo");
    this.Load_Data();
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
    // console.log("val = ",typeof(val))
    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {

      this.items = this.items.filter((item) => {
        return (item.Farm_Name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
      // console.log("item = ", this.items)
      // console.log("Response_Image = ", this.Response_Image)
      this.Response_Image = this.Response_Image.filter((item) => {
        return (item[1].toLowerCase().indexOf(val.toLowerCase()) > -1);
      })

      if (this.items.length == 0) {
        console.log("============================================")
        this.items = this.Response_Data.filter((item) => {
          return (item.Farm_Address.toLowerCase().indexOf(val.toLowerCase()) > -1);
        })

        this.Response_Image = [];
        for (let i = 0; i < this.items.length; i++) {
          const vall = this.items[i].Farm_Name;
          this.Response_Image.push(this.Response_Image_real.filter((item) => {
            // console.log("item = ", item[1])
            return (item[1].toLowerCase().indexOf(vall.toLowerCase()) > -1);
          })[0])
          // fruits.push("Kiwi");
        }
      }
      if (this.items.length == 0) {
        console.log("============================================")
        this.items = this.Response_Data.filter((item) => {
          return (item.Farm_Phone.toLowerCase().indexOf(val.toLowerCase()) > -1);
        })

        this.Response_Image = [];
        for (let i = 0; i < this.items.length; i++) {
          const vall = this.items[i].Farm_Name;
          this.Response_Image.push(this.Response_Image_real.filter((item) => {
            // console.log("item = ", item[1])
            return (item[1].toLowerCase().indexOf(vall.toLowerCase()) > -1);
          })[0])
          // fruits.push("Kiwi");
        }
      }
      console.log("items = ", this.items)

      console.log("Response_Image = ", this.Response_Image)

    }

  }


}
