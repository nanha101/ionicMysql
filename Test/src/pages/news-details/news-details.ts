import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ModalController, Events } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service';
import { Storage } from '@ionic/storage';
import { NewsAddPage } from '../news-add/news-add';
import { NewsPage } from '../news/news';
/**
 * Generated class for the NewsDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-news-details',
  templateUrl: 'news-details.html',
})
export class NewsDetailsPage {
  // For Manage Permiss
  Login_Data: any;
  Permiss_Admin: boolean = false;

  Animals: any;
  Get_News_Type: any;

  Path_Image: string;
  Detail_Data: any = {};
  Response_Image: any;
  item: any = {
    "Animal_Name": "",
    "News_Type": "",
  };
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public authService: AuthServiceProvider,
    private storage: Storage,
    public events: Events,
    public alertCtrl: AlertController,
    public modalCtrl: ModalController,
  ) {
    this.Manage_permiss();
    this.Path_Image = this.authService.Get_Path_Image();
    // console.log("Path = ", this.Path_Image)
    this.Get_Animal();

    // console.log("item = ", this.navParams.get('item'));
    // console.log("Image = ", this.navParams.get('Image'));

  }
  Delete_News() {
    // console.log("item = ", item.Know_Id);
    // console.log("Delete_know")
    if (this.Login_Data.Admin_Id == this.Detail_Data.Admin_Id) {
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
              dataFrom.append("News_Id", this.Detail_Data.News_Id);
              dataFrom.append("Function_Name", "Delete_News");
              this.authService.Delete_Item(dataFrom).then((res) => {
                // console.log("End")
                // this.SetIcon = true;
                // this.Load_Data();
                this.navCtrl.setRoot(NewsPage);

              })

            }
          }
        ]
      });
      confirm.present();
    }
    else {
      this.alertCtrl.create({
        title: 'เตือน',
        message: 'คุณไม่มีสิทธิในการลบรายการนี้',
        buttons: [
          {
            text: 'ตกลง',
            // handler: () => {
            //   console.log('Disagree clicked');
            // }
          },
        ]
      }).present();
    }


  }
  Change_News() {
    // console.log(item.Admin_Id);
    if (this.Login_Data.Admin_Id == this.Detail_Data.Admin_Id) {
      // console.log("Helloooooooo");
      let items = { "item": this.Detail_Data, "Image": this.Response_Image, "State": "แก้ไขข่าวสาร" }
      let modal = this.modalCtrl.create(NewsAddPage, { items });
      modal.present();
    }
    else {
      this.alertCtrl.create({
        title: 'เตือน',
        message: 'คุณไม่มีสิทธิในการแก้ไขรายการนี้',
        buttons: [
          {
            text: 'ตกลง',
            // handler: () => {
            //   console.log('Disagree clicked');
            // }
          },
        ]
      }).present();
    }

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

  Set_Data() {
    this.Detail_Data = this.navParams.get('items').item;
    this.Response_Image = this.navParams.get('items').Image;
    // console.log("this.Detail_Data = ", this.Detail_Data);
    // console.log("item = ", this.item);
    for (let i = 0; i < this.Animals.length; i++) {
      // console.log(i)
      if (this.Detail_Data.Animal_Id == this.Animals[i].Animal_Id) {
        this.item.Animal_Name = this.Animals[i].Animal_Name;
      }
    }
    for (let i = 0; i < this.Get_News_Type.length; i++) {
      // console.log(i)
      if (this.Detail_Data.T_News_Id == this.Get_News_Type[i].T_News_Id) {
        this.item.News_Type = this.Get_News_Type[i].T_News_Name;
      }
    }
    // console.log("item = ", this.item);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad NewsDetailsPage');
  }
  Get_Animal() {
    // console.log("Hello Nan");
    // console.log(this.test);
    this
      .authService
      .postData("", "Get_Animals")
      .then((result) => {
        // console.log("Hello Nan");
        // console.log(result);
        this.Animals = result;
        this.Animals = this.Animals.Animals;
        // console.log("Animals = ", this.Animals);
        this.Get_Newss_Type();
      });
  }
  Get_Newss_Type() {
    // console.log("Hello Nan");
    // console.log(this.test);
    this
      .authService
      .postData("", "Get_News_Type")
      .then((result) => {
        // console.log("Hello Nan");
        // console.log(result);
        this.Get_News_Type = result;
        this.Get_News_Type = this.Get_News_Type.News_type;
        // console.log("Get_News_type = ",this.Get_News_Type);
        this.Set_Data();
      });
  }
  // clickk() {
  //   this.navCtrl.pop();
  // }
  ionViewWillEnter() {
    this.events.subscribe('Updated', (Data) => {

      console.log("================news_deetail back to news==============");
      // this.Load_Data();

      // this.events.publish('Load_Data', "For Load data again");
      this.navCtrl.setRoot(NewsPage)
      // setTimeout(function () {
      //   // alert("Hello");
      //   // console.log("heeeey")
      //   // this.navCtrl.pop();
      // }, 400);
      console.log("end")
      this.events.unsubscribe('Updated');
      // this.navCtrl.setRoot(NewsPage)
    });

  }

}
