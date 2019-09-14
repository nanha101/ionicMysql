import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Events, AlertController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service';
import { Storage } from '@ionic/storage';
import { Ng2ImgMaxService } from 'ng2-img-max';

/**
 * Generated class for the MarketAddPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-market-add',
  templateUrl: 'market-add.html',
})
export class MarketAddPage {
  Title: string = "เพิ่มสินค้าหรือบริการ";
  Path_Image: string = null;
  Img_Show: boolean = false;
  imgShow: any;
  Image_Data: any;
  State_Upload: boolean = true;
  State_Image_Update: boolean = true;
  Login_Data: any;

  Market_Add_Data = {
    "Market_Id": "",
    "Market_Name": "",
    "Market_Details": "",
    "Market_Date": "",
    "Market_Time": "",
    "Market_Price": "",
    "T_Market_Id": "",
    "User_Id": "",
  };
  // MarketType: any;
  Get_Market_Type: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private authService: AuthServiceProvider,
    public viewCtrl: ViewController,
    public events: Events,
    private storage: Storage,
    public alertCtrl: AlertController,
    private _ng2ImgMax: Ng2ImgMaxService, // resize image file

  ) {
    this.Path_Image = this.authService.Get_Path_Image();
    this.Get_Markett_Type();
    this.storage.get("Login_Data").then((val) => {
      this.Login_Data = val;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MarketAddPage');
  }
  Set_Data() {
    this.State_Upload = false;
    this.Img_Show = true;
    this.imgShow = [];
    this.Title = "แก้ไขข้อมูลสินค้าหรือบริการ";
    let Get_Data = this.navParams.get('items');
    let Item_Data = Get_Data.item;
    // console.log("Item_Data = ", Item_Data);
    // this.state = Get_Data.State;
    // console.log(this.navParams.get('items'));
    //////////////// Set_Image /////////////
    let images = Get_Data.Image;
    for (let i = 0; i < images.length; i++) {
      console.log(images[i].Img_Market_Name);
      this.imgShow[i] = images[i].Img_Market_Name;
    }
    // console.log("ImgShow = ", this.imgShow);
    /////////////// Set_Data_Form //////////////
    this.Market_Add_Data.Market_Id = Item_Data.Market_Id;
    this.Market_Add_Data.Market_Name = Item_Data.Market_Name;
    this.Market_Add_Data.Market_Details = Item_Data.Market_Details;
    this.Market_Add_Data.Market_Price = Item_Data.Market_Price;
    this.Market_Add_Data.T_Market_Id = Item_Data.T_Market_Id;
    this.Market_Add_Data.User_Id = Item_Data.User_Id;
  }
  Get_Markett_Type() {
    // console.log("Hello Nan");
    // console.log(this.test);
    this
      .authService
      .postData("", "Get_Market_Type")
      .then((result) => {
        // console.log("Hello Nan");
        // console.log(result);
        this.Get_Market_Type = result;
        this.Get_Market_Type = this.Get_Market_Type.Market_type;
        console.log(this.Get_Market_Type);
      });
    if (this.navParams.get('items')) {
      this.Set_Data();
    }
  }
  dismiss() {
    this.viewCtrl.dismiss();
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
  Set_Date_Time() {
    let today = new Date();
    let day = (today.getFullYear() + 543) + "-" + (today.getMonth() + 1) + "-" + (today.getDate());
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    this.Market_Add_Data.Market_Date = day;
    this.Market_Add_Data.Market_Time = time;
    this.Market_Add_Data.User_Id = this.Login_Data.User_Id;

  }
  UploadImage() {
    this.Set_Date_Time();
    let dataFrom = new FormData();
    if (this.Market_Add_Data.Market_Name == "" || this.Market_Add_Data.Market_Details == "" || this.Market_Add_Data.Market_Price == "" || this.Market_Add_Data.T_Market_Id == "") {
      this.Alert("กรุณากรอกข้อมูลให้ครบด้วยค่ะ");
    }
    else {
      if (this.Image_Data == null) {
        dataFrom.append("_Data", JSON.stringify(this.Market_Add_Data));
        dataFrom.append("Function_Name", "Add_Market");
        this.authService.Upload_Item(dataFrom).then((res) => {
          // this.navCtrl.setRoot(MarketPage);
          this.events.publish('Load_Data', "For Load data again");
          this.dismiss();

        })

      }
      else {
        for (let i = 0; i < this.Image_Data.length; i++) {
          // console.log("imgShow = ", this.Image_Data);
          dataFrom.append('Image_Market' + i, this.Image_Data[i])
          // console.log(i);
          // console.log("Image_Data = ", typeof (this.Image_Data));
        }
        dataFrom.append("_Data", JSON.stringify(this.Market_Add_Data));
        dataFrom.append("Function_Name", "Add_Market");
        this.authService.Upload_Item(dataFrom).then((res) => { //, this.Market_Add_Data
          // console.log("End")
          // this.navCtrl.setRoot(MarketPage);

          this.events.publish('Load_Data', "For Load data again");
          this.dismiss();
        })

      }
    }
  }
  UpdateImage() {
    this.Set_Date_Time();
    let dataFrom = new FormData();
    if (this.Market_Add_Data.Market_Name == "" || this.Market_Add_Data.Market_Details == "" || this.Market_Add_Data.Market_Price == "" || this.Market_Add_Data.T_Market_Id == "") {
      this.Alert("กรุณากรอกข้อมูลให้ครบด้วยค่ะ");
    }
    else {
      if (this.Image_Data == null || this.State_Image_Update == true) {
        // console.log("Hey");
        dataFrom.append("_Data", JSON.stringify(this.Market_Add_Data));
        dataFrom.append("Function_Name", "Update_Market");
        this.authService.Update_Item(dataFrom).then((res) => {
          this.events.publish('Back', "For Load data again");
          this.dismiss();
          // this.navCtrl.setRoot(MarketPage);

          // this.navCtrl.canGoBack
        })

      }
      else {
        for (let i = 0; i < this.Image_Data.length; i++) {
          // console.log("imgShow = ", image_Data);
          dataFrom.append('Image_Market' + i, this.Image_Data[i])
          // console.log(i);
          // console.log("Image_Data = ", typeof (image_Data));
        }
        dataFrom.append("_Data", JSON.stringify(this.Market_Add_Data));
        dataFrom.append("Function_Name", "Update_Market");
        this.authService.Update_Item(dataFrom).then((res) => { //, this.Market_Add_Data
          // console.log("End")
          this.events.publish('Back', "For Load data again");
          this.dismiss();
        })

      }
    }
  }




}
