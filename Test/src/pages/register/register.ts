import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

import { Storage } from '@ionic/storage';
import { AuthServiceProvider } from '../../providers/auth-service';
import { empty } from 'rxjs/Observer';
import { Ng2ImgMaxService } from 'ng2-img-max';
import { HomePage } from '../home/home';
import { KnowledgePage } from '../knowledge/knowledge';
import { NewsPage } from '../news/news';
import { FarmPage } from '../farm/farm';
import { MarketPage } from '../market/market';
import { PostsPage } from '../posts/posts';
import { SuggestionPage } from '../suggestion/suggestion';
import { UsersPage } from '../users/users';
import { PersonalDataPage } from '../personal-data/personal-data';
import { NotificationPage } from '../notification/notification';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  Regis_Data = {
    "Username": "",
    "Password": "",
    "Name": "",
    "Adress": "",
    "Phone": "",
    "Email": "",
    "Profile": "NO-PROFILE.jpg"
  };
  Re_Pass: string;
  Response_Data: any;
  Path_Image: string;
  Profile_Show: any = "NO-IMAGE.jpg";
  Profile_Image: any = null;
  data_Menu: any = [
    { title: 'หน้าหลัก', component: HomePage, icon: 'ios-home' },
    { title: 'ความรู้', component: KnowledgePage, icon: 'md-book' },
    { title: 'ข่าวสาร', component: NewsPage, icon: 'ios-paper' },
    { title: 'ฟาร์ม', component: FarmPage, icon: 'logo-freebsd-devil' },
    { title: 'ตลาดสินค้า', component: MarketPage, icon: 'md-cart' },
    { title: 'กระทู้', component: PostsPage, icon: 'ios-create' },
    { title: 'การแจ้งเตือน', component: NotificationPage, icon: 'md-notifications' },
    { title: 'ข้อเสนอแนะ', component: SuggestionPage, icon: 'md-infinite' },
    { title: 'ข้อมูลสมาชิก', component: UsersPage, icon: 'ios-people' },
    { title: 'ข้อมูลส่วนตัว', component: PersonalDataPage, icon: 'md-person' },
    { title: 'ออกจากระบบ', component: HomePage, icon: 'md-log-out' }
  ];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public authService: AuthServiceProvider,
    private _ng2ImgMax: Ng2ImgMaxService, // resize image file
    public events: Events,
    // public alertCtrl: AlertController,
    private storage: Storage,
  ) {
    this.Path_Image = this.authService.Get_Path_Image();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }
  Confirm() {
    // alert(this.Regis_Data.Name);
    if (this.Regis_Data.Username == "" || this.Regis_Data.Password == "" || this.Re_Pass == "" || this.Regis_Data.Name == ""
      || this.Regis_Data.Adress == "" || this.Regis_Data.Phone == "" || this.Regis_Data.Email == "") {
      alert("กรุณากรอกข้อมูลให้ครบ");
    }
    else if (this.Regis_Data.Password != this.Re_Pass) {
      alert("กรุณากรอกรหัสผ่านให้ตรงกัน");
    }
    else {
      if (this.Profile_Image != null) {

        let dataFrom = new FormData();
        dataFrom.append('Profile_Image', this.Profile_Image)
        dataFrom.append("_Data", JSON.stringify(this.Regis_Data));
        dataFrom.append("Function_Name", "Register");
        this.authService.Upload_Item(dataFrom).then((result) => {
          this.Response_Data = result;
          // alert(this.Response_Data.CanNot);
          if (this.Response_Data.CanNot) {
            alert("มีผู้ใช้งานนี้อยู่แล้ว กรุณาใส่ชื่อผู้ใช้งานหรืออีเมลใหม่อีกครั้ง");
          }
          else {
            // alert("Inserted");
            // alert(this.Regis_Data.Username);
            this.storage.set("Login_Data", { "User_Id": this.Regis_Data });
            this.storage.get("Login_Data").then((val) => {
              // console.log('Your age is', val);
              // alert("UserId: " + val);
              this.navCtrl.setRoot(HomePage);
              this.events.publish('Menu_Data', this.data_Menu);
            });
          }

        })
      }
      else {
        this
          .authService
          .postData(this.Regis_Data, "Register")
          .then((result) => {
            // alert("Hello");
            // console.log(result);
            this.Response_Data = result;
            // alert(this.Response_Data.CanNot);
            if (this.Response_Data.CanNot) {
              alert("มีผู้ใช้งานนี้อยู่แล้ว กรุณาใส่ชื่อผู้ใช้งานหรืออีเมลใหม่อีกครั้ง");
            }
            else {
              // alert("Inserted");
              // alert(this.Regis_Data.Username);
              this.storage.set("Login_Data", { "User_Id": this.Regis_Data });
              this.storage.get("Login_Data").then((val) => {
                // console.log('Your age is', val);
                // alert("UserId: " + val);
                this.navCtrl.setRoot(HomePage);
                this.events.publish('Menu_Data', this.data_Menu);
              });
            }
          });
      }

    }



  }


  Get_Base64_Profile(event) {
    let reader = new FileReader();
    reader.readAsDataURL(event)   // before event[ii]
    reader.onload = (e) => {
      // console.log("i in onload = ", ii);
      this.Profile_Show = reader.result;
      // console.log("this.imgshow = ", this.imgShow[1]);
    }
  }
  Resize_Image_Profile(event) {
    // this.Pro_Show = true;
    // this.State_Upload_Profile = true;
    // console.log("Hellooooooooo");
    this._ng2ImgMax.resizeImage(event[0], 2000, 1000).subscribe((result) => {
      // console.log("rusult = ", result);
      this.Profile_Image = result;
      // this.Path_Image_Profile = null;

      console.log("Regis_Data = ", this.Regis_Data);
      this.Get_Base64_Profile(this.Profile_Image);
    }, error => console.log(error)
    );
  }

  BrowseProfile(event) {
    // console.log(event);
    this.Path_Image = null;
    if (event.length != 0) {
      console.log("innnnnnn")
      this.Resize_Image_Profile(event);
    }
    // } //end loop
  }

}
