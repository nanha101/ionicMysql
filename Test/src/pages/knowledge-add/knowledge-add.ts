import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController, Item, Events } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service';

import { Camera, CameraOptions } from '@ionic-native/camera';     //Camera 
import { Ng2ImgMaxService } from 'ng2-img-max'; // Resize Image file
import { Storage } from '@ionic/storage';
import { KnowledgePage } from '../knowledge/knowledge';
import { NewsPage } from '../news/news';

@IonicPage()
@Component({
  selector: 'page-knowledge-add',
  templateUrl: 'knowledge-add.html',
})
export class KnowledgeAddPage {
  Login_Data: any;
  Animals: any;
  AnimalType: any;

  KnowledgeType: any;
  Get_Know_Type: any;

  Image_Data: any;
  imgShow: any;
  Img_Show: boolean = false;
  base64Image: string;
  i: number; //before public
  state: string = "เพิ่มความรู้";
  Know_Add_Data = {
    "Know_Name": "",
    "Know_Content": "",
    "Know_Video_Link":"",
    "Date": "",
    "Time": "",
    "AnimalType": "",
    "KnowledgeType": "",
    "Admin_Id": "",
    "Know_Id": ""
  };
  // this.Know_Add_Data.Admin_Id = this.user_data.Admin_Id
  Path_Image: string;
  State_Upload: boolean = true;
  State_Image_Update: boolean = true;

  // show: any;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public events: Events,
    public authService: AuthServiceProvider,
    private camera: Camera,
    private _ng2ImgMax: Ng2ImgMaxService, // resize image file
    private storage: Storage,
    public alertCtrl: AlertController
  ) {

    if (navParams.get('items')) {
      this.Path_Image = this.authService.Get_Path_Image();
      this.Set_Data();
    }
    // console.log(this.Get_Data);
    this.storage.get("Login_Data").then((val) => {
      this.Login_Data = val;
      // console.log("admin = ",this.Login_Data.Admin_Id);
      // alert("Storage_Id: " + val);
    });


    this.Get_Knowledge_Type();
    this.Get_Animal();
  }
  Set_Data() {
    this.State_Upload = false;
    this.Img_Show = true;
    this.imgShow = [];

    let Get_Data = this.navParams.get('items');
    let Item_Data = Get_Data.item;
    this.state = Get_Data.State;
    // console.log(this.navParams.get('items'));
    //////////////// Set_Image /////////////
    let images = Get_Data.Image;
    for (let i = 0; i < images.length; i++) {
      // console.log(images[i].Img_Know_Name);
      this.imgShow[i] = images[i].Img_Know_Name;
    }
    // console.log("ImgShow = ", this.imgShow);
    /////////////// Set_Data_Form //////////////
    // console.log("Item.Know_Id = ",Item_Data.Know_Id);
    this.Know_Add_Data.Know_Name = Item_Data.Know_Name;
    this.Know_Add_Data.Know_Content = Item_Data.Know_Content;
    this.Know_Add_Data.Know_Video_Link = Item_Data.Know_Video_Link;
    this.Know_Add_Data.AnimalType = Item_Data.Animal_Id;
    this.Know_Add_Data.KnowledgeType = Item_Data.T_Know_Id;
    this.Know_Add_Data.Admin_Id = Item_Data.Admin_Id;
    this.Know_Add_Data.Know_Id = Item_Data.Know_Id;

  }


  OpenCamera() {
    // const options: CameraOptions = {
    //   quality: 100,
    //   destinationType: this.camera.DestinationType.DATA_URL,
    //   encodingType: this.camera.EncodingType.JPEG,
    //   mediaType: this.camera.MediaType.PICTURE
    // }

    // this.camera.getPicture(options).then((imageData) => {
    //   // imageData is either a base64 encoded string or a file URI
    //   // If it's base64 (DATA_URL):
    //   this.base64Image = 'data:image/jpeg;base64,' + imageData;
    // }, (err) => {
    //   // Handle error
    // });
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
    if (this.Know_Add_Data.Know_Name == "" || this.Know_Add_Data.Know_Content == "" || this.Know_Add_Data.AnimalType == "" || this.Know_Add_Data.KnowledgeType == "") {
      this.Alert("กรุณากรอกข้อมูลให้ครบด้วยค่ะ");
    }
    else {
      if (this.Image_Data == null) {
        dataFrom.append("_Data", JSON.stringify(this.Know_Add_Data));
        dataFrom.append("Function_Name", "Add_Knowledge");
        this.authService.Upload_Item(dataFrom).then((res) => {

          this.events.publish('Load_Data', "For Load data again");
          this.dismiss();
        })

      }
      else {
        this.i = 0;
        for (this.i; this.i < this.Image_Data.length; this.i++) {
          // console.log("imgShow = ", this.Image_Data);
          dataFrom.append('Image_Knowledge' + this.i, this.Image_Data[this.i])
          // console.log(this.i);
          // console.log("Image_Data = ", typeof (this.Image_Data));
        }
        dataFrom.append("_Data", JSON.stringify(this.Know_Add_Data));
        dataFrom.append("Function_Name", "Add_Knowledge");
        this.authService.Upload_Item(dataFrom).then((res) => { //, this.Know_Add_Data
          // console.log("End")

          this.events.publish('Load_Data', "For Load data again");
          this.dismiss();
        })

      }
    }
  }
  UpdateImage() {
    this.Set_Date_Time();
    let dataFrom = new FormData();
    if (this.Know_Add_Data.Know_Name == "" || this.Know_Add_Data.Know_Content == "" || this.Know_Add_Data.AnimalType == "" || this.Know_Add_Data.KnowledgeType == "") {
      this.Alert("กรุณากรอกข้อมูลให้ครบด้วยค่ะ");
    }
    else {
      if (this.Image_Data == null || this.State_Image_Update == true) {
        // console.log("Hey");
        dataFrom.append("_Data", JSON.stringify(this.Know_Add_Data));
        dataFrom.append("Function_Name", "Update_Knowledge");
        this.authService.Update_Item(dataFrom).then((res) => {

          this.events.publish('Load_Data', "For Load data again");
          this.dismiss();
          // this.navCtrl.setRoot(NewsPage);
        })

      }
      else {
        this.i = 0;
        for (this.i; this.i < this.Image_Data.length; this.i++) {
          // console.log("imgShow = ", this.Image_Data);
          dataFrom.append('Image_Knowledge' + this.i, this.Image_Data[this.i])
          // console.log(this.i);
          // console.log("Image_Data = ", typeof (this.Image_Data));
        }
        dataFrom.append("_Data", JSON.stringify(this.Know_Add_Data));
        dataFrom.append("Function_Name", "Update_Knowledge");
        this.authService.Update_Item(dataFrom).then((res) => { //, this.Know_Add_Data
          // console.log("End")

          this.events.publish('Load_Data', "For Load data again");
          this.dismiss();
        })

      }
    }
  }
  Set_Date_Time() {
    let today = new Date();
    let day = (today.getFullYear() + 543) + "-" + (today.getMonth() + 1) + "-" + (today.getDate());
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    this.Know_Add_Data.Date = day;
    this.Know_Add_Data.Time = time;
    this.Know_Add_Data.Admin_Id = this.Login_Data.Admin_Id;

  }
  ///////////////////////////////////////// Upload Image //////////////
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
    this.i = 0;
    // let selectImage = undefined
    // console.log("Event.length = ", event.length);
    for (this.i; this.i < event.length; this.i++) {
      // console.log(this.i);
      let reader = new FileReader();
      this.Resize_Image(event, this.i);
    } //end loop
  }
  /////////////////////////////////////////////////// End Upload Image //////////////
  ionViewDidLoad() {
    console.log('ionViewDidLoad KnowledgeAddPage');
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
        // console.log(this.Animals);
      });
  }
  Get_Knowledge_Type() {
    this
      .authService
      .postData("", "Get_Know_Type")
      .then((result) => {
        // console.log("Hello Nan");
        // console.log(result);
        this.Get_Know_Type = result;
        this.Get_Know_Type = this.Get_Know_Type.Know_type;
        // console.log(this.Get_Know_Type);
      });
  }




}
