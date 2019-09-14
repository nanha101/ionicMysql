import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Events } from 'ionic-angular';
import { PostFilterPage } from '../post-filter/post-filter';
import { PostsDetailsPage } from '../posts-details/posts-details';
import { AuthServiceProvider } from '../../providers/auth-service';
import { Storage } from '@ionic/storage';
import { PostsAddPage } from '../posts-add/posts-add';

/**
 * Generated class for the PostsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-posts',
  templateUrl: 'posts.html',
})
export class PostsPage {
  Post_Data: any = { AnimalsType: ["all"], PostsType: ["all"] };

  // manage login_data
  Permiss_Admin: boolean = false;
  Login_Data: any

  Name: any;
  Name_Real: any;
  Response_Data: any;
  Response_Image: any;
  Response_Image_Real: any;
  items: any;
  Show_Add_commments: boolean = false;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private authService: AuthServiceProvider,
    private storage: Storage,
    public modalCtrl: ModalController,
    public events: Events
  ) {
    this.Load_Data();
    this.Manage_permiss();
  }
  Manage_permiss() {
    this.storage.get("Login_Data").then((val) => {
      this.Login_Data = val;

      if (this.Login_Data == null) {
      }
      else if (this.Login_Data.Admin_Id) {
        // console.log("Admin");
        this.Show_Add_commments = true;
      }
      else if (this.Login_Data.User_Id) {
        // console.log("Users");
        this.Show_Add_commments = true;
      } 
    });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad PostsPage');
    this.events.subscribe('Load_Data', (Data) => {
      // this.SetIcon = true;
      // console.log("================In Knowledge==============");
      this.Load_Data();
      // this.events.unsubscribe('Load_Data')
    });
  }
  Goto_Posts_Filter() {
    this.navCtrl.push(PostFilterPage);
  }
  GotoPost_Details() {
    this.navCtrl.push(PostsDetailsPage)
  }
  initializeItems() {
    this.items = this.Response_Data;
    this.Response_Image = this.Response_Image_Real;
    this.Name = this.Name_Real;
  }
  getItems(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();
    // set val to the value of the searchbar
    const val = ev.target.value;
    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        return (item.Posts_Name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })

      this.Response_Image = this.Response_Image.filter((item) => {
        return (item[1].toLowerCase().indexOf(val.toLowerCase()) > -1);
      })

      this.Name = this.Name.filter((item) => {
        return (item[1].toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }
  Load_Data() {
    this
      .authService
      .postData(this.Post_Data, "Get_Posts_Data")
      .then((result) => {
        this.Response_Data = result;
        console.log(this.Response_Data)
        this.Response_Image_Real = result;
        // this.Response_Image = result;
        this.Name_Real = result;
        // this.Name = result;
        if (this.Response_Data.Posts_Data) {
          // console.log("Hello");
          this.Response_Data = this.Response_Data.Posts_Data;
          this.items = this.Response_Data; //for Search
          this.Name_Real = this.Name_Real.Name;
          this.Name = this.Name_Real;
        }
        if (this.Response_Image_Real.Posts_Image) {
          // let i=0;
          // console.log("Hello");
          this.Response_Image_Real = this.Response_Image_Real.Posts_Image;
          this.Response_Image = this.Response_Image_Real;
        }


      });
  }

  Click_Data(item, index) {
    // console.log(item);
    // console.log("Response_Data = ",this.Response_Data);
    let items = { "item": item, "Image": this.Response_Image[index][0], "Name": this.Name[index][0] }
    this.navCtrl.push(PostsDetailsPage, { items });

  }

  ionViewWillEnter() {
    this.events.subscribe('Load_Data', (Data) => {
      // console.log("================In Knowledge==============");
      this.Load_Data();
      this.events.unsubscribe('Load_Data');
    });
    // this.Load_Data();
    this.events.subscribe('Fil_Posts_Data', (Filter_Data) => {
      // user and time are the same arguments passed in `events.publish(user, time)`
      // console.log("================In Knowledge==============");
      console.log('Search_Data = ', Filter_Data);

      this.Post_Data = Filter_Data;
      this.Load_Data();
      this.events.unsubscribe('Fil_Posts_Data')
      // console.log("this.Post_Data = " + this.Post_Data);   
    });
  }
  ionViewWillLeave() {
    this.events.publish('Set_Filter_Posts', this.Post_Data);
  }

  AddComments() {
    let modal = this.modalCtrl.create(PostsAddPage);
    modal.present();
  }
}
