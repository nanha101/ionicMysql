import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Events } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service';
import { FarmDetailsPage } from '../farm-details/farm-details';
import { Storage } from '@ionic/storage';
import { FarmAddPage } from '../farm-add/farm-add';
import { FarmPage } from '../farm/farm';

/**
 * Generated class for the FarmOfMePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-farm-of-me',
  templateUrl: 'farm-of-me.html',
})
export class FarmOfMePage {
  Title: string = "ฟาร์มของฉัน";
  Response_Data: any;
  State: any = {};
  Response_Image: any;
  Path_Image: string;
  // aaa = "1234,5678";

  Login_Data: any;

  Permiss_Admin: boolean = false;
  Permiss_User: boolean = false;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public authService: AuthServiceProvider,
    private storage: Storage,
    public modalCtrl: ModalController,
    public events: Events,
  ) {
    this.Path_Image = this.authService.Get_Path_Image();

    this.Manage_permiss();
  }
  Set_Data() {
    if (this.navParams.get('items').state == 'admin') {
      // console.log(this.navParams.get('items'));
      // console.log("aaa");
      this.Title = "รายการร้องขอ"
      // this.Load_Allow_Data();
    }
    else {
      //this.Title = ชื่อของฟาร์ม
      console.log("dsfsd");
      // this.Load_MyFarm_Data();
    }

    // console.log("dddddddddddddddddddddd");
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
        // this.Load_Allow_Data();
        this.Permiss_Admin = true;
      }
      else if (this.Login_Data.User_Id) {
        this.Permiss_User = true;
        // console.log("Users");
        this.Load_MyFarm_Data();
      }
      this.Set_Data();
    });
  }
  Load_Allow_Data() {
    // console.log("this.Post_Data = " + this.Post_Data);
    // }
    // console.log("asdasdf"+this.Post_Data.AnimalsType);
    this
      .authService
      .postData("", "Farm_Allow")
      .then((result) => {
        // console.log(result);
        this.Response_Data = result;
        this.Response_Image = result;
        if (this.Response_Data.Farm_Data) {
          // console.log("Hello");
          this.Response_Data = this.Response_Data.Farm_Data;
          // this.items = this.Response_Data; //for Search
          // console.log("this.Response_Data = ", this.Response_Data);

        }
        if (this.Response_Image.Farm_Image) {
          // console.log("Hello");
          this.Response_Image = this.Response_Image.Farm_Image;
          // console.log(this.Response_Image);
          for (let i = 0; i < this.Response_Image.length; i++) {
            // console.log(this.Response_Image[i]);
            if (this.Response_Image[i].length == 0) {
              // console.log(i);
              this.Response_Image[i].push({ Img_Farm_Name: "NO-IMAGE.jpg" });
            }
          }
          // console.log("this.ResImage = ", this.Response_Image);
        }

      });
    // this.initializeItems();
  }
  Load_MyFarm_Data() { // กำลังทำ 
    // console.log("this.Post_Data = " + this.Post_Data);
    // }
    // console.log("asdasdf"+this.Post_Data.AnimalsType);
    // 
    console.log(this.Login_Data);
    this
      .authService
      .postData({ "User_Id": this.Login_Data.User_Id }, "MyFarm")
      .then((result) => {
        // console.log(result);
        this.Response_Data = result;
        this.Response_Image = result;
        if (this.Response_Data.Farm_Data) {
          // console.log("Hello");
          this.Response_Data = this.Response_Data.Farm_Data;
          for (let i = 0; i < this.Response_Data.length; i++)
            if (this.Response_Data[i].Farm_State == '1') {
              this.State[i] = "อนุมัติแล้ว"
            }
            else if (this.Response_Data[i].Farm_State == '2') {
              this.State[i] = "ถูกปฏิเสธการอนุมัติ"
            }
            else {
              this.State[i] = "รอการอนุมัติ"
            }
          // this.items = this.Response_Data; //for Search
          // console.log("this.Response_Data = ", this.Response_Data);

        }
        if (this.Response_Image.Farm_Image) {
          // console.log("Hello");
          this.Response_Image = this.Response_Image.Farm_Image;
          // console.log(this.Response_Image);
          for (let i = 0; i < this.Response_Image.length; i++) {
            // console.log(this.Response_Image[i]);
            if (this.Response_Image[i].length == 0) {
              // console.log(i);
              this.Response_Image[i].push({ Img_Farm_Name: "NO-IMAGE.jpg" });
            }
          }
          // console.log("this.ResImage = ", this.Response_Image);
        }

      });
    // this.initializeItems();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FarmOfMePage');
  }

  Click_Data(item, index) {
    console.log(item);
    let items = { "item": item, "Image": this.Response_Image[index], State: "Allow" }
    this.navCtrl.push(FarmDetailsPage, { items });
  }
  Click_Data2(item, index) {
    // console.log(item);
    // console.log("Response_Data = ",this.Response_Data);
    let items = { "item": item, "Image": this.Response_Image[index] }
    this.navCtrl.push(FarmDetailsPage, { items });

  }
  ionViewWillEnter() {
    // console.log("Hellooo");
    if (this.Title == "รายการร้องขอ") {
      this.Load_Allow_Data();
      // console.log("รายการร้องขอ");
    }
    this.events.subscribe('back_again', (Data) => {
      // console.log("================In Knowledge==============");
      // this.Load_Data();

      this.events.unsubscribe('back_again');
      this.navCtrl.setRoot(FarmPage)
      // this.navCtrl.pop();
    });
    // this.events.subscribe('Load_Data_farm', (Data) => {
    //   // console.log("================In Knowledge==============");
    //   // this.Load_Data();
    //   this.events.unsubscribe('Load_Data_farm');
    //   this.navCtrl.pop();
    // });

  }
  openModal() {
    let modal = this.modalCtrl.create(FarmAddPage);
    modal.present();
  }
}
