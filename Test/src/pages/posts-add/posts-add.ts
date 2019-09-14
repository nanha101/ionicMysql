import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, AlertController, ViewController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service';
import { Storage } from '@ionic/storage';
import { Ng2ImgMaxService } from 'ng2-img-max';

/**
 * Generated class for the PostsAddPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-posts-add',
  templateUrl: 'posts-add.html',
})
export class PostsAddPage {
  Path_Image: string = null;
  Img_Show: boolean = false;
  imgShow: any;
  Image_Data: any;
  State_Upload: boolean = true;
  State_Image_Update: boolean = true;
  Animals: any;
  Get_Posts_Type: any;
  posts_Add_Data = {
    "Posts_Name": "",
    "Posts_Content": "",
    "Date": "",
    "Time": "",
    "T_Posts_Id": "",
    "User_Id": "",
    "Admin_Id": "",
    "AnimalType": "",
    "Posts_Id": ""
  };
  Login_Data: any;
  state: string = "เพิ่มกระทู้";
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private authService: AuthServiceProvider,
    public events: Events,
    private storage: Storage,
    public alertCtrl: AlertController,
    private _ng2ImgMax: Ng2ImgMaxService, // resize image file
    public viewCtrl: ViewController,
  ) {
    this.Get_Animal();


    this.Manage_permiss();
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
      console.log(images[i].Img_Posts_Name);
      this.imgShow[i] = images[i].Img_Posts_Name;
    }

    this.posts_Add_Data.Posts_Name = Item_Data.Posts_Name;
    this.posts_Add_Data.Posts_Content = Item_Data.Posts_Content;
    this.posts_Add_Data.AnimalType = Item_Data.Animal_Id;
    this.posts_Add_Data.T_Posts_Id = Item_Data.T_Posts_Id;
    // this.posts_Add_Data.Admin_Id = Item_Data.Admin_Id;
    this.posts_Add_Data.Posts_Id = Item_Data.Posts_Id;

  }
  Manage_permiss() {
    this.storage.get("Login_Data").then((val) => {
      this.Login_Data = val;

      if (this.Login_Data == null) {
      }
      else if (this.Login_Data.Admin_Id) {
        // console.log("Admin");
        // this.Permiss_Admin = true;
        this.posts_Add_Data.Admin_Id = this.Login_Data.Admin_Id;
      }
      else if (this.Login_Data.User_Id) {
        this.posts_Add_Data.User_Id = this.Login_Data.User_Id;
        // console.log("Users");
      }
    });
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
        // this.Get_Newss_Type();
        this.Get_Postss_Type();
      });
  }
  Get_Postss_Type() {
    // console.log("Hello Nan");
    // console.log(this.test);
    this
      .authService
      .postData("", "Get_Posts_Type")
      .then((result) => {
        // console.log("Hello Nan");
        // console.log(result);
        this.Get_Posts_Type = result;
        this.Get_Posts_Type = this.Get_Posts_Type.Posts_type;
        // console.log(this.Get_Posts_Type);
        if (this.navParams.get('items')) {
          this.Path_Image = this.authService.Get_Path_Image();
          this.Set_Data();
        }
      });
  }
  Set_Date_Time() {
    let today = new Date();
    let day = (today.getFullYear() + 543) + "-" + (today.getMonth() + 1) + "-" + (today.getDate());
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    this.posts_Add_Data.Date = day;
    this.posts_Add_Data.Time = time;
    // this.posts_Add_Data.Admin_Id = this.Login_Data.Admin_Id;

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

  UploadImage() {
    this.Set_Date_Time();
    let dataFrom = new FormData();
    if (this.posts_Add_Data.Posts_Name == "" || this.posts_Add_Data.T_Posts_Id == "") {
      this.Alert("กรุณากรอกข้อมูลให้ครบด้วยค่ะ");
    }
    else {
      if (this.Image_Data == null) {
        dataFrom.append("_Data", JSON.stringify(this.posts_Add_Data));
        dataFrom.append("Function_Name", "Add_Posts");
        this.authService.Upload_Item(dataFrom).then((res) => {
          // this.navCtrl.setRoot(NewsPage);
          this.dismiss();
          this.events.publish('Load_Data', "For Load data again");

        })
      }
      else {
        for (let i = 0; i < this.Image_Data.length; i++) {
          // console.log("imgShow = ", this.Image_Data);
          dataFrom.append('Image_Posts' + i, this.Image_Data[i])
          // console.log(i);
          // console.log("Image_Data = ", typeof (this.Image_Data));
        }
        dataFrom.append("_Data", JSON.stringify(this.posts_Add_Data));
        dataFrom.append("Function_Name", "Add_Posts");
        this.authService.Upload_Item(dataFrom).then((res) => { //, this.posts_Add_Data

          this.dismiss();
          this.events.publish('Load_Data', "For Load data again");
        })

      }
    }
  }
  UpdateImage() {
    this.Set_Date_Time();
    // console.log("posts_dadta = ", this.posts_Add_Data);
    let dataFrom = new FormData();
    if (this.posts_Add_Data.Posts_Name == "" || this.posts_Add_Data.T_Posts_Id == "") {
      this.Alert("กรุณากรอกข้อมูลให้ครบด้วยค่ะ");
    }
    else {
      if (this.Image_Data == null) {
        dataFrom.append("_Data", JSON.stringify(this.posts_Add_Data));
        dataFrom.append("Function_Name", "Update_Posts");
        this.authService.Update_Item(dataFrom).then((res) => {
          // this.navCtrl.setRoot(NewsPage);
          this.dismiss();
          this.events.publish('Updated', "For Load data again");
          // this.events.publish('Load_Data', "For Load data again");

        })
      }
      else {
        for (let i = 0; i < this.Image_Data.length; i++) {
          // console.log("imgShow = ", this.Image_Data);
          dataFrom.append('Image_Posts' + i, this.Image_Data[i])
          // console.log(i);
          // console.log("Image_Data = ", typeof (this.Image_Data));
        }
        dataFrom.append("_Data", JSON.stringify(this.posts_Add_Data));
        dataFrom.append("Function_Name", "Update_Posts");
        this.authService.Update_Item(dataFrom).then((res) => { //, this.posts_Add_Data

          this.dismiss();
          this.events.publish('Updated', "For Load data again");
          // this.events.publish('Load_Data', "For Load data again");
        })

      }
    }
  }
}
