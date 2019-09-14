import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController, Events } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service';
import { Ng2ImgMaxService } from 'ng2-img-max';
import { Storage } from '@ionic/storage';
import { NewsPage } from '../news/news';

/**
 * Generated class for the NewsAddPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-news-add',
  templateUrl: 'news-add.html',
})
export class NewsAddPage {
  Path_Image: string = null;
  Img_Show: boolean = false;
  imgShow: any;
  Image_Data: any;
  State_Upload: boolean = true;
  State_Image_Update: boolean = true;

  Animals: any;
  Get_News_Type: any;
  Login_Data: any;
  News_Add_Data = {
    "News_Name": "",
    "News_Content": "",
    "Date": "",
    "Time": "",
    "AnimalType": "",
    "NewsType": "",
    "Admin_Id": "",
    "News_Id": ""
  };
  state: string = "เพิ่มข้อมูลข่าวสาร";
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public events: Events,
    public authService: AuthServiceProvider,
    private storage: Storage,
    public alertCtrl: AlertController,
    private _ng2ImgMax: Ng2ImgMaxService, // resize image file
  ) {
    this.Get_Animal();
    // this.Get_Newss_Type();
    this.storage.get("Login_Data").then((val) => {
      this.Login_Data = val;
    });
  }
  Set_Data() {
    this.State_Upload = false;
    this.Img_Show = true;
    this.imgShow = [];

    let Get_Data = this.navParams.get('items');
    let Item_Data = Get_Data.item;
    // console.log("Item_Data = ", Item_Data);
    this.state = Get_Data.State;
    // console.log(this.navParams.get('items'));
    //////////////// Set_Image /////////////
    let images = Get_Data.Image;
    for (let i = 0; i < images.length; i++) {
      console.log(images[i].Img_News_Name);
      this.imgShow[i] = images[i].Img_News_Name;
    }
    // console.log("ImgShow = ", this.imgShow);
    /////////////// Set_Data_Form //////////////
    // console.log("Item.News_Id = ",Item_Data.News_Id);
    this.News_Add_Data.News_Name = Item_Data.News_Name;
    this.News_Add_Data.News_Content = Item_Data.News_Content;
    this.News_Add_Data.AnimalType = Item_Data.Animal_Id;
    this.News_Add_Data.NewsType = Item_Data.T_News_Id;
    this.News_Add_Data.Admin_Id = Item_Data.Admin_Id;
    this.News_Add_Data.News_Id = Item_Data.News_Id;

  }

  Get_Base64(event, ii) {
    let reader = new FileReader();
    reader.readAsDataURL(event)   // before event[ii]
    reader.onload = (e) => {
      // console.log("i in onload = ", ii);
      this.imgShow[ii] = reader.result;
      // console.log("this.imgshow = ", this.imgShow[1]);
    }
  }
  Resize_Image(event, ii) {
    this._ng2ImgMax.resizeImage(event[ii], 2000, 1000).subscribe((result) => {
      // console.log("rusult = ",result);
      this.Image_Data[ii] = result;
      // console.log("Image_Data = ", this.Image_Data[ii]);
      this.Get_Base64(this.Image_Data[ii], ii);
    }, error => console.log(error)
    );
  }
  BrowseOnPc(event) {
    console.log(event);
    if (event.length == 0) {
      this.Img_Show = false;
    }
    else {
      this.Img_Show = true;
    }
    this.State_Image_Update = false;
    this.Path_Image = null;
    this.imgShow = [];
    this.Image_Data = [];

    // let selectImage = undefined
    // console.log("Event.length = ", event.length);
    for (let i = 0; i < event.length; i++) {
      // console.log(i);
      let reader = new FileReader();
      this.Resize_Image(event, i);
    } //end loop
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewsAddPage');
  }
  dismiss() {
    this.viewCtrl.dismiss();
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
        if (this.navParams.get('items')) {
          this.Path_Image = this.authService.Get_Path_Image();
          this.Set_Data();
        }
        // this.Set_Data();
      });
  }
  Set_Date_Time() {
    let today = new Date();
    let day = (today.getFullYear() + 543) + "-" + (today.getMonth() + 1) + "-" + (today.getDate());
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    this.News_Add_Data.Date = day;
    this.News_Add_Data.Time = time;
    this.News_Add_Data.Admin_Id = this.Login_Data.Admin_Id;

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
  UploadImage() {
    this.Set_Date_Time();
    let dataFrom = new FormData();
    if (this.News_Add_Data.News_Name == "" || this.News_Add_Data.News_Content == "" || this.News_Add_Data.AnimalType == "" || this.News_Add_Data.NewsType == "") {
      this.Alert("กรุณากรอกข้อมูลให้ครบด้วยค่ะ");
    }
    else {
      if (this.Image_Data == null) {
        dataFrom.append("_Data", JSON.stringify(this.News_Add_Data));
        dataFrom.append("Function_Name", "Add_News");
        this.authService.Upload_Item(dataFrom).then((res) => {
          // this.navCtrl.setRoot(NewsPage);

          this.events.publish('Load_Data', "For Load data again");
          this.dismiss();

        })

      }
      else {
        for (let i = 0; i < this.Image_Data.length; i++) {
          // console.log("imgShow = ", this.Image_Data);
          dataFrom.append('Image_News' + i, this.Image_Data[i])
          // console.log(i);
          // console.log("Image_Data = ", typeof (this.Image_Data));
        }
        dataFrom.append("_Data", JSON.stringify(this.News_Add_Data));
        dataFrom.append("Function_Name", "Add_News");
        this.authService.Upload_Item(dataFrom).then((res) => { //, this.News_Add_Data
          // console.log("End")
          // this.navCtrl.setRoot(NewsPage);

          this.events.publish('Load_Data', "For Load data again");
          this.dismiss();
        })

      }
    }
  }
  UpdateImage() {
    this.Set_Date_Time();
    let dataFrom = new FormData();
    if (this.News_Add_Data.News_Name == "" || this.News_Add_Data.News_Content == "" || this.News_Add_Data.AnimalType == "" || this.News_Add_Data.NewsType == "") {
      this.Alert("กรุณากรอกข้อมูลให้ครบด้วยค่ะ");
    }
    else {
      if (this.Image_Data == null || this.State_Image_Update == true) {
        // console.log("Hey");
        dataFrom.append("_Data", JSON.stringify(this.News_Add_Data));
        dataFrom.append("Function_Name", "Update_News");
        this.authService.Update_Item(dataFrom).then((res) => {
          this.events.publish('Updated', "For Load data again");
          this.dismiss();
          // this.events.publish('Load_Data', "For Load data again");
          // this.navCtrl.setRoot(NewsPage);

          // this.navCtrl.canGoBack
        })

      }
      else {
        for (let i = 0; i < this.Image_Data.length; i++) {
          // console.log("imgShow = ", image_Data);
          dataFrom.append('Image_News' + i, this.Image_Data[i])
          // console.log(i);
          // console.log("Image_Data = ", typeof (image_Data));
        }
        dataFrom.append("_Data", JSON.stringify(this.News_Add_Data));
        dataFrom.append("Function_Name", "Update_News");
        this.authService.Update_Item(dataFrom).then((res) => { //, this.News_Add_Data
          // console.log("End")

          this.events.publish('Updated', "For Load data again");
          this.dismiss();
          // this.events.publish('Load_Data', "For Load data again");
        })

      }
    }
  }




}
