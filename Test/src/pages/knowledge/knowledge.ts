import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Item, Events, ModalController, AlertController, Alert } from 'ionic-angular';
import { KnowledgeFilterPage } from '../knowledge-filter/knowledge-filter';

import { AuthServiceProvider } from '../../providers/auth-service';
import { Storage } from '@ionic/storage';
import { iterateListLike } from '@angular/core/src/change_detection/change_detection_util';
import { TranslationWidth } from '@angular/common';
import { Content } from 'ionic-angular/umd/navigation/nav-interfaces';
import { ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';
import { KnowledgeAddPage } from '../knowledge-add/knowledge-add';

import { OnInit, Input } from '@angular/core'; //for safe URL
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser'; //for safe URL
@IonicPage()
@Component({
  selector: 'page-knowledge',
  templateUrl: 'knowledge.html',
})
export class KnowledgePage {
  @ViewChild('slides') slides: Slides;
  // Knowledge_Data:any=[{Title:"ความรู้เบื้องต้นในการเลี้ยงกระบือ",Con:"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" },
  //                     {Title:"อาหารต่างๆของกระบือ",Con:"bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb" },
  //                     {Title:"อาหารต่างๆของกระบือ",Con:"bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb" }];
  // len = this.Knowledge_Data.length;
  Path_Image: string;

  SetIcon = true;
  i: number = 0;
  text: string = '';
  Response_Data: any;
  Response_Image: any;

  res_img: any;
  Post_Data: any = { AnimalsType: ["all"], KnowledgeType: ["all"] };
  len: number;
  Login_Data: any;

  //Manage Promission
  Permiss_Admin: boolean = false;
  video: string = "https://www.youtube.com/embed/rtQOAEkniPg";
  //Search
  items: any;
  Animal_Name: any;
  Know_T_Name: any;
  Response_Image_real
  Animal_Name_real: any;
  Know_T_Name_real: any;
  aaa: any = ['1', '2', '3'];

  @Input()
  url: string = "https://www.youtube.com/embed/rtQOAEkniPg";
  urlSafe: SafeResourceUrl;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private storage: Storage,
    public authService: AuthServiceProvider,
    public events: Events,
    public modalCtrl: ModalController,
    public alertCtrl: AlertController,
    public sanitizer: DomSanitizer //for safe url
  ) {



    this.Manage_permiss();
    this.Path_Image = this.authService.Get_Path_Image();

    this.Load_Data();
    // this.ngOnInit();
  }


  ngOnInit() {
    // console.log("ngOnInit")
    // this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
    // console.log("UrlSafe = ", this.urlSafe)
  }
  Get_SafeUrl(item) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(item.Know_Video_Link);
  }
  Delete_Know(item) {
    // console.log("item = ", item.Know_Id);
    // console.log("Delete_know")
    if (this.Login_Data.Admin_Id == item.Admin_Id) {
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
              dataFrom.append("Know_Id", item.Know_Id);
              dataFrom.append("Function_Name", "Delete_Knowledge");
              this.authService.Delete_Item(dataFrom).then((res) => {
                // console.log("End")
                this.SetIcon = true;
                this.Load_Data();

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
    let modal = this.modalCtrl.create(KnowledgeAddPage);
    modal.present();
  }
  Change_Know(item, index) {
    // console.log(item.Admin_Id);
    if (this.Login_Data.Admin_Id == item.Admin_Id) {
      // console.log("Helloooooooo");
      let items = { "item": item, "Image": this.Response_Image[index][0], "State": "แก้ไขความรู้" }
      let modal = this.modalCtrl.create(KnowledgeAddPage, { items });
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
  ionViewWillLeave() {
    this.events.publish('Set_Filter_Know', this.Post_Data);
  }

  //////////////////////////// For Search ////////////////////////
  initializeItems() {
    this.items = this.Response_Data;
    this.Animal_Name_real = this.Animal_Name;
    this.Know_T_Name_real = this.Know_T_Name
    this.Response_Image_real = this.Response_Image
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
        return (item.Know_Name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
      this.Animal_Name_real = this.Animal_Name_real.filter((item) => {
        return (item[1].toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
      this.Know_T_Name_real = this.Know_T_Name_real.filter((item) => {
        return (item[1].toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
      this.Response_Image_real = this.Response_Image_real.filter((item) => {
        return (item[1].toLowerCase().indexOf(val.toLowerCase()) > -1);
      })

    }
  }
  //////////////////////////// End for Search ////////////////////////

  ///////////////////////////////////////////////////////
  next() {
    this.slides.slideNext();
  }

  prev() {
    this.slides.slidePrev();
  }
  ionViewWillEnter() {

    // console.log("Helloooooooooooooooooooooooooooooo");
    this.events.subscribe('Know_Animals_Data', (Filter_Data) => {

      // user and time are the same arguments passed in `events.publish(user, time)`
      // console.log("================In Knowledge==============");
      // console.log('Search_Data = ', Filter_Data);

      this.Post_Data = Filter_Data;
      this.Load_Data();

      this.events.unsubscribe('Know_Animals_Data')
      // console.log("this.Post_Data = " + this.Post_Data);   
    });
    this.events.subscribe('Load_Data', (Data) => {
      // this.SetIcon = true;
      console.log("================In Knowledge==============");
      this.Load_Data();
      // this.events.unsubscribe('Load_Data')
    });


  }
  ionViewDidLoad() {
    console.log("Heyyyyyyy");
  }

  Goto_Knowledge_Filter() {
    this.navCtrl.push(KnowledgeFilterPage);
  }
  Data_click(item) {
    this.i = 0;
    if (item.icon == null) {
      for (this.i; this.i < this.Response_Data.length; this.i++) {
        this.Response_Data[this.i].icon = "ios-arrow-dropdown-outline";
      }
      this.SetIcon = false;
    }

    if (item.Show_Details == false || item.Show_Details == null) {
      item.Show_Details = true;
      item.color = "dark2";
      item.icon = "ios-arrow-dropup-outline";
    }
    else {
      item.Show_Details = false;
      item.color = "";
      item.icon = "ios-arrow-dropdown-outline";
    }
    // this.res_img = this.Response_Image[i];
  }

  Load_Data() {
    // this.SetIcon = true;
    // console.log("this.Post_Data = " + this.Post_Data);
    // }
    // console.log("asdasdf"+this.Post_Data.AnimalsType);
    this
      .authService
      .postData(this.Post_Data, "Get_Know_Data")
      .then((result) => {
        this.Response_Data = result;
        this.Response_Image = result;

        this.Animal_Name = result;
        // console.log("resultttt = ",this.Animal_Name);
        this.Animal_Name = this.Animal_Name.Animal_Name;
        this.Animal_Name_real = this.Animal_Name;


        this.Know_T_Name = result;
        this.Know_T_Name = this.Know_T_Name.Know_T_Name;
        this.Know_T_Name_real = this.Know_T_Name

        // console.log(this.Animal_Name);
        if (this.Response_Data.Knowledge_Data) {
          // console.log("Hello");
          this.Response_Data = this.Response_Data.Knowledge_Data;
          this.items = this.Response_Data; //for Search
          // console.log(this.Response_Data);

        }
        if (this.Response_Image.Knowledge_Image) {
          // console.log("Hello");
          this.Response_Image = this.Response_Image.Knowledge_Image;
          this.i = 0;
          console.log(this.Response_Image);
          for (this.i; this.i < this.Response_Image.length; this.i++) {
            // console.log(this.Response_Image[this.i]);
            if (this.Response_Image[this.i][0].length == 0) {
              // console.log(this.i);
              this.Response_Image[this.i][0].push({ Img_Know_Name: "NO-IMAGE.jpg" });
            }
          }
          this.Response_Image_real = this.Response_Image
          // console.log(this.Response_Image);
        }

        this.SetIcon = true;
      });
    // this.initializeItems();
  }








} 
