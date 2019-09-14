import { Component } from '@angular/core';
import { NavController, Events } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { LoginPage } from '../../pages/login/login';
import { HomeFilterPage } from '../home-filter/home-filter';
import { AuthServiceProvider } from '../../providers/auth-service';
import { NewsDetailsPage } from '../news-details/news-details';
import { KnowledgeDetailsPage } from '../knowledge-details/knowledge-details';
import { Storage } from '@ionic/storage';
import { KnowledgePage } from '../knowledge/knowledge';
import { NewsPage } from '../news/news';
import { FarmPage } from '../farm/farm';
import { MarketPage } from '../market/market';
import { PostsPage } from '../posts/posts';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  Post_Data: any = { AnimalsType: ["all"], NewsType: ["all"] };
  Post_Know_Data: any = { AnimalsType: ["all"], KnowledgeType: ["all"] };
  // Permiss_Admin: boolean = false;
  // Login_Data: any

  //News
  Response_Data: any;
  Response_Image: any;
  Response_Image_real: any;
  //Knowledge
  Response_Know_Data: any;
  Response_Know_Image: any;
  Response_Know_Image_real: any;
  items: any;
  Path_Image: string;
  Show_Logout: boolean = false;
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

  constructor(
    public navCtrl: NavController,
    private alertCtrl: AlertController,
    private authService: AuthServiceProvider,
    private storage: Storage,
    // public modalCtrl: ModalController,
    public events: Events
  ) {
    this.Manage_permiss();
    this.Load_Data();
    this.Load_Know_Data();

    this.Path_Image = this.authService.Get_Path_Image();
  }

  Manage_permiss() {
    this.storage.get("Login_Data").then((val) => {
      this.Login_Data = val;
      // console.log("login_data= ", this.Load_Data)
      if (this.Login_Data == null || this.Login_Data == "") {
        // this.Alert_log_Out("");
        this.Show_Logout = false;
      }
      else {
        // console.log(this.Login_Data)
        this.Show_Logout = true;
      }

    }); 
  }
  ionViewDidLoad() {
    // this.Load_Data();
    // this.Load_Know_Data();
  }
  Goto_Home_Filter() {
    this.navCtrl.push(HomeFilterPage);
  }
  Load_Data() {
    this
      .authService
      .postData(this.Post_Data, "Get_News_Data")
      .then((result) => {
        this.Response_Data = result;
        this.Response_Image_real = result;
        // console.log("REs_Image_real = ", this.Response_Image_real)
        if (this.Response_Data.News_Data) {
          // console.log("Hello");
          this.Response_Data = this.Response_Data.News_Data;
          // this.items = this.Response_Data; //for Search
          // console.log(this.Response_Data);
          // console.log("Response_Data = ", this.Response_Data);
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
          // console.log("Response_Image = ", this.Response_Image);
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
  Load_Know_Data() {
    this
      .authService
      .postData(this.Post_Know_Data, "Get_Know_Data")
      .then((result) => {
        // console.log("result = ", result)
        this.Response_Know_Data = result;
        this.Response_Know_Image_real = result;
        // console.log("re_know_img_real = ", this.Response_Know_Image_real)
        if (this.Response_Know_Data.Knowledge_Data) {
          // console.log("Hello");
          this.Response_Know_Data = this.Response_Know_Data.Knowledge_Data;
          // this.items = this.Response_Data; //for Search
          // console.log("Response_Know_Data = ", this.Response_Know_Data);
        }
        if (this.Response_Know_Image_real.Knowledge_Image) {
          // console.log("Hello");
          this.Response_Know_Image_real = this.Response_Know_Image_real.Knowledge_Image;

          // console.log(this.Response_Know_Image);
          for (let i = 0; i < this.Response_Know_Image_real.length; i++) {
            // console.log(this.Response_Know_Image[this.i]);
            if (this.Response_Know_Image_real[i][0].length == 0) {
              // console.log(this.i);
              this.Response_Know_Image_real[i][0].push({ Img_Know_Name: "NO-IMAGE.jpg" });
            }
          }
          this.Response_Know_Image = this.Response_Know_Image_real
          // console.log("Response_Know_Image_real = ", this.Response_Know_Image_real);
        }


      });
    // this.initializeItems();
  }

  Click_Know_Data(item, index) {
    // console.log("Response_Data = ",this.Response_Data);
    let items = { "item": item, "Image": this.Response_Know_Image[index][0] }
    this.navCtrl.push(KnowledgeDetailsPage, { items });

  }

  Log_Out() {
    if (this.Login_Data != null || this.Login_Data != "") {
      this.Alert_log_Out("");
    }

  }
  Alert_log_Out(msg) {
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
            // this.pages = this.Menu_default;
            this.navCtrl.setRoot(HomePage);
            this.events.publish('Menu_Data', this.Menu_default);
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

