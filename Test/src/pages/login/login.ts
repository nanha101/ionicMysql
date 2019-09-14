import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';


import { AuthServiceProvider } from '../../providers/auth-service';
import { empty } from 'rxjs/Observer';
import { Storage } from '@ionic/storage';
import { Events } from 'ionic-angular';
import { HomePage } from '../home/home';
import { NewsPage } from '../news/news';
import { FarmPage } from '../farm/farm';
import { MarketPage } from '../market/market';
import { PostsPage } from '../posts/posts';
import { SuggestionPage } from '../suggestion/suggestion';
import { ListPage } from '../list/list';
import { KnowledgePage } from '../knowledge/knowledge';
import { RegisterPage } from '../register/register';
import { UsersPage } from '../users/users';
import { PersonalDataPage } from '../personal-data/personal-data';
import { NotificationPage } from '../notification/notification';
import { ManageTypeDataPage } from '../manage-type-data/manage-type-data';


/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  Response_Data: any;
  Login_Data = {
    "username": "",
    "password": ""
  };
  State_Login: any;
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

  data_Admin_Menu: any = [
    { title: 'หน้าหลัก', component: HomePage, icon: 'ios-home' },
    { title: 'ความรู้', component: KnowledgePage, icon: 'md-book' },
    { title: 'ข่าวสาร', component: NewsPage, icon: 'ios-paper' },
    { title: 'ฟาร์ม', component: FarmPage, icon: 'logo-freebsd-devil' },
    { title: 'ตลาดสินค้า', component: MarketPage, icon: 'md-cart' },
    { title: 'กระทู้', component: PostsPage, icon: 'ios-create' },
    { title: 'การแจ้งเตือน', component: NotificationPage, icon: 'md-notifications' },
    { title: 'จัดการประเภทข้อมูล', component: ManageTypeDataPage, icon: 'md-folder' },
    { title: 'ข้อเสนอแนะ', component: SuggestionPage, icon: 'md-infinite' },
    { title: 'ข้อมูลสมาชิก', component: UsersPage, icon: 'ios-people' },
    { title: 'ข้อมูลส่วนตัว', component: PersonalDataPage, icon: 'md-person' },
    { title: 'ออกจากระบบ', component: HomePage, icon: 'md-log-out' }
  ];
  // 
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public authService: AuthServiceProvider,
    private storage: Storage,
    public events: Events,
    public alertCtrl: AlertController,
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  GotoRegister() {
    this.navCtrl.push(RegisterPage);
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

  login() {
    if (this.Login_Data.username && this.Login_Data.password) {
      // alert("Hello");
      this
        .authService
        .postData(this.Login_Data, "Login")
        .then((result) => {
          // console.log("asdfklajsfdkljasldfkjasf");
          // console.log("result = "+result);
          this.Response_Data = result;
          // console.log("Hello");
          if (this.Response_Data.Admin) {
            // alert(this.Response_Data.Admin[0].Admin_Id);
            this.storage.set("Login_Data", this.Response_Data.Admin[0]);
            this.events.publish('Menu_Data', this.data_Admin_Menu);
            this.navCtrl.setRoot(HomePage);
          }

          else if (this.Response_Data.Users) {

            this.storage.set("Login_Data", this.Response_Data.Users[0]);
            this.events.publish('Menu_Data', this.data_Menu);
            this.navCtrl.setRoot(HomePage);
          }
          else {
            this.Alert("กรุณากรอก Username และ Password ให้ถูกต้องค่ะ");
          }
        },
          (err) => {
            this.Alert("กรุณาเปิดใช้งานอินเตอร์เน็ตด้วยค่ะ");
          });
    }

  }
}
