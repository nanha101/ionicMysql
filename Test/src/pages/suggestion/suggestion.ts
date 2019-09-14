import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service';
import { Storage } from '@ionic/storage';
import { HomePage } from '../home/home';

/**
 * Generated class for the SuggestionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-suggestion',
  templateUrl: 'suggestion.html',
})
export class SuggestionPage {
  Sug_Data = {
    "Sug_Name": "",
    "Sug_Content": "",
    "User_Id": ""
  }
  Login_Data: any;
  Response_Data: any;

  Permiss_Admin: boolean = false;
  Permiss_Users: boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public authService: AuthServiceProvider,
    // public events: Events,
    public alertCtrl: AlertController,
    private storage: Storage,
  ) {
    this.Manage_permiss();
  }

  Manage_permiss() {
    this.storage.get("Login_Data").then((val) => {
      this.Login_Data = val;

      if (this.Login_Data == null) {
      }
      else if (this.Login_Data.Admin_Id) {
        // console.log("Admin");
        this.Permiss_Admin = true;
        this.Load_Data();
      }
      else if (this.Login_Data.User_Id) {
        this.Sug_Data.User_Id = this.Login_Data.User_Id
        this.Permiss_Users = true;
      }
    });
  }
  Alert(msg) {
    // console.log("item = ", item.Know_Id);
    // console.log("Delete_know")
    const confirm = this.alertCtrl.create({
      title: 'คำเตือน',
      message: msg,
      buttons: [
        {
          text: 'ตกลง',
          // handler: () => {
          //   console.log('Disagree clicked');
          // }
        },
      ]
    });
    confirm.present();
  }
  Confirm() {
    if (this.Sug_Data.Sug_Name == "", this.Sug_Data.Sug_Content == "") {
      this.Alert("กรุณากรอกข้อมูลให้ครบ");
    }
    else {
      // console.log(this.Personal_Admin_Data)
      this
        .authService
        .postData(this.Sug_Data, "Add_Suggestion")
        .then((result) => {
          // alert("Hello");
          // console.log(result);
          this.Response_Data = result;
          // alert(this.Response_Data.CanNot);
          if (this.Response_Data.CanNot) {
            this.Alert("ไม่สารถส่งข้อเสนอแนะได้ กรุณาส่งภายหลังค่ะ");
          }
          else {
            // this.Response_Data = this.Response_Data.Admin_Data;
            // console.log("ressss = ", this.Response_Data[0])
            this.Alert("ส่งข้อเสนอแนะสำเร็จ")
            // this.Back();
            this.navCtrl.setRoot(HomePage);
            // this.events.publish('Menu_Data', this.data_Menu);
          }
        });
    }
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad SuggestionPage');
  }
  Load_Data() {
    // console.log("this.Post_Data = " + this.Post_Data);
    // }
    // console.log("asdasdf"+this.Post_Data.AnimalsType);
    this
      .authService
      .postData("", "Get_Suggestion")
      .then((result) => {
        this.Response_Data = result;
        if (this.Response_Data.suggestion) {
          // console.log("Hello");
          this.Response_Data = this.Response_Data.suggestion;
          // console.log(this.Response_Data);
          // console.log("Response_Data = ",this.Response_Data);
        }
      });
  }

}
