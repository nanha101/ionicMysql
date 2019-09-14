import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { KnowledgePage } from '../pages/knowledge/knowledge';
import { NewsPage } from '../pages/news/news';
import { FarmPage } from '../pages/farm/farm';
import { MarketPage } from '../pages/market/market';
import { PostsPage } from '../pages/posts/posts';
import { SuggestionPage } from '../pages/suggestion/suggestion';
import { Events } from 'ionic-angular';

import { Storage } from '@ionic/storage';
import { UsersPage } from '../pages/users/users';
import { PersonalDataPage } from '../pages/personal-data/personal-data';
import { NotificationPage } from '../pages/notification/notification';
import { ManageTypeDataPage } from '../pages/manage-type-data/manage-type-data';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  pages: Array<{ title: string, component: any }>;
  rootPage: any = HomePage;
  Menu_change: any = [
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
  Login_Data: any;
  Menu_default = [
    { title: 'หน้าหลัก', component: HomePage, icon: 'ios-home' },
    { title: 'เข้าสู่ระบบ', component: LoginPage, icon: 'md-log-in' },
    { title: 'ความรู้', component: KnowledgePage, icon: 'md-book' },
    { title: 'ข่าวสาร', component: NewsPage, icon: 'ios-paper' },
    { title: 'ฟาร์ม', component: FarmPage, icon: 'logo-freebsd-devil' },
    { title: 'ตลาดสินค้า', component: MarketPage, icon: 'md-cart' },
    { title: 'กระทู้', component: PostsPage, icon: 'ios-create' },
    // { title: 'ข้อเสนอแนะ', component: SuggestionPage }
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
  constructor(public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public events: Events,
    private storage: Storage,
    public alertCtrl: AlertController,
  ) {
    this.initializeApp();
    // console.log("App.component.ts");
    events.subscribe('Menu_Data', (data_Menu) => {
      this.pages = data_Menu;
    });

    this.storage.get("Login_Data").then((val) => {
      this.Login_Data = val;
      if (this.Login_Data == null) {
        this.pages = this.Menu_default;
      }
      else if (this.Login_Data.Admin_Id) {
        this.pages = this.data_Admin_Menu;
      }
      else if (this.Login_Data.User_Id) {
        this.pages = this.Menu_change;
      }

      // console.log('Login_Data = ',val);
      // alert("Storage_Id: "+val);
      // if (val != null) {
      //   this.pages = this.Menu_change;

      // }
    })


    // used for an example of ngFor and navigation


  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario

    // this.storage.get("Login_Data").then((val) => {
    //   console.log('Login_Data = ',val);
    //   alert("Storage_Id: "+val);
    // });

    if (page.title == 'ออกจากระบบ') {

      // console.log("ออกจากระบบ");
      this.Alert("");
      // this.pages = this.Menu_default;
      // this.nav.setRoot(HomePage);
      // this.storage.set("Login_Data", null);
    }
    else {
      this.nav.setRoot(page.component);
    }

  }
  Alert(msg) {
    // console.log("item = ", item.Know_Id);
    // console.log("Delete_know")
    const confirm = this.alertCtrl.create({
      title: 'คุณต้องการออกจากระบบใช่ไหม?',
      message: msg,
      buttons: [
        {
          text: 'ตกลง',
          handler: () => {
            // console.log('OKKKKKKK clicked');
            this.pages = this.Menu_default;
            this.nav.setRoot(HomePage);
            this.storage.set("Login_Data", null);
          }
        },
        {
          text: 'ยกเลิก',
          handler: () => {
            // console.log('Disagree clicked');
            // this.viewCtrl.dismiss();
          }
        }
      ]
    });
    confirm.present();
  }
}
