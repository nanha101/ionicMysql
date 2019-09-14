import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Events, AlertController, Item } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service';
import { Ng2ImgMaxService } from 'ng2-img-max';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the FarmAddPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-farm-add',
  templateUrl: 'farm-add.html',
})
export class FarmAddPage {
  Map = {
    "Map_Lat": "",
    "Map_Lng": "",

  };
  Farm_Add_Data = {
    "Farm_Name": "",
    "Farm_Details": "",
    "Farm_Address": "",
    "Farm_Map": "",
    "Farm_Email": "",
    "Farm_Phone": "",
    "Farm_Date": "",
    "Farm_Time": "",
    "Profile_Image": "",
    "User_Id": "a",
    "Farm_Id": "",
    "Farm_State": "",
  };

  Title: string = "เพิ่มฟาร์ม";
  Path_Image: string = null;
  Path_Image_Profile: string = null;
  Img_Show: boolean = false;
  Profile_Show: any;
  Pro_Show: boolean = false;
  imgShow: any;
  Image_Data: any;
  State_Upload: boolean = true;
  State_Upload_Profile: boolean = false;
  State_Image_Update: boolean = true;

  Login_Data: any;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public authService: AuthServiceProvider,
    private _ng2ImgMax: Ng2ImgMaxService, // resize image file
    public events: Events,
    private storage: Storage,
    public alertCtrl: AlertController,
  ) {
    this.Path_Image = this.authService.Get_Path_Image();
    this.Path_Image_Profile = this.Path_Image

    this.storage.get("Login_Data").then((val) => {
      this.Login_Data = val;
      // this.Farm_Add_Data.User_Id = this.Login_Data.User_Id;
      // console.log("Farm_Add_Data.User_Id = ",this.Farm_Add_Data.User_Id);
      // console.log("Farm_Add_Data = ", this.Farm_Add_Data);
    });
    if (this.navParams.get('items')) {
      this.Set_Data();
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FarmAddPage');
  }
  dismiss() {
    this.viewCtrl.dismiss();
  }
  Set_Data() {
    this.State_Upload = false;
    this.Img_Show = true;
    this.imgShow = [];
    this.Pro_Show = true;

    let Get_Data = this.navParams.get('items');
    let Item_Data = Get_Data.item;
    //////////////// Set_Image /////////////
    let images = Get_Data.Image;
    if (Item_Data.Profile_Image == "" || Item_Data.Profile_Image == null) {
      this.Profile_Show = "NO-IMAGE.jpg";
    }
    else {
      // console.log("dasfasdf")
      this.Profile_Show = Item_Data.Profile_Image; // Show Profile
    }
    for (let i = 0; i < images.length; i++) {
      // console.log(images[i].Img_Farm_Name);
      this.imgShow[i] = images[i].Img_Farm_Name;
    }
    // console.log("ImgShow = ", this.imgShow);
    /////////////// Set_Data_Form //////////////
    if (Item_Data.Farm_Map != "" || Item_Data != null) {
      this.Map.Map_Lat = Item_Data.Farm_Map.split(',')[0];
      this.Map.Map_Lng = Item_Data.Farm_Map.split(',')[1];
      // console.log("Lat = ", this.Map.Map_Lat + "Lng = ", this.Map.Map_Lng);
    }
    this.Farm_Add_Data.Farm_Name = Item_Data.Farm_Name;
    this.Farm_Add_Data.Farm_Details = Item_Data.Farm_Details;
    this.Farm_Add_Data.Farm_Address = Item_Data.Farm_Address;
    this.Farm_Add_Data.Farm_Phone = Item_Data.Farm_Phone;
    this.Farm_Add_Data.Farm_Email = Item_Data.Farm_Email;
    this.Farm_Add_Data.Profile_Image = Item_Data.Profile_Image;
    this.Title = this.Farm_Add_Data.Farm_Name;
    this.Farm_Add_Data.Farm_Id = Item_Data.Farm_Id;
    this.Farm_Add_Data.Farm_State = Item_Data.Farm_State;
    // console.log(this.Farm_Add_Data);

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
  Get_Base64_Profile(event) {
    let reader = new FileReader();
    reader.readAsDataURL(event)   // before event[ii]
    reader.onload = (e) => {
      // console.log("i in onload = ", ii);
      this.Profile_Show = reader.result;
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
  Resize_Image_Profile(event) {
    this.Pro_Show = true;
    this.State_Upload_Profile = true;
    // console.log("Hellooooooooo");
    this._ng2ImgMax.resizeImage(event[0], 2000, 1000).subscribe((result) => {
      // console.log("rusult = ", result);
      this.Farm_Add_Data.Profile_Image = result;
      // this.Path_Image_Profile = null;

      console.log("Farm_Add_Data = ", this.Farm_Add_Data);
      this.Get_Base64_Profile(this.Farm_Add_Data.Profile_Image);
    }, error => console.log(error)
    );
  }
  BrowseOnPc(event) {
    // console.log(event);
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
  BrowseProfile(event) {
    // console.log(event);
    this.Path_Image_Profile = null;
    if (event.length != 0) {
      console.log("innnnnnn")
      this.Resize_Image_Profile(event);
    }
    // } //end loop
  }
  Set_Date_Time() {
    let today = new Date();
    let day = (today.getFullYear() + 543) + "-" + (today.getMonth() + 1) + "-" + (today.getDate());
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    this.Farm_Add_Data.Farm_Date = day;
    this.Farm_Add_Data.Farm_Time = time;
    this.Farm_Add_Data.User_Id = this.Login_Data.User_Id;

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

    // Add Lat and Lng to Farm_Add_Data
    this.Farm_Add_Data.Farm_Map = this.Map.Map_Lat + "," + this.Map.Map_Lng;
    // console.log("Farm_Add_Data = ", this.Farm_Add_Data);

    let dataFrom = new FormData();
    if (this.Farm_Add_Data.Farm_Name == "" || this.Farm_Add_Data.Farm_Details == "" || this.Farm_Add_Data.Farm_Address == "") {
      this.Alert("กรุณากรอกข้อมูลให้ครบด้วยค่ะ");
    }
    else {
      if (this.Image_Data == null) {
        if (this.State_Upload_Profile == true) {
          dataFrom.append('Profile_Image', this.Farm_Add_Data.Profile_Image)
        }
        dataFrom.append("_Data", JSON.stringify(this.Farm_Add_Data));
        dataFrom.append("Function_Name", "Add_Farm");
        this.authService.Upload_Item(dataFrom).then((res) => {
          // this.navCtrl.setRoot(FarmPage);
          this.dismiss();
          this.events.publish('back_again', "For Load data again");
        })

      }
      else {
        if (this.State_Upload_Profile == true) {
          dataFrom.append('Profile_Image', this.Farm_Add_Data.Profile_Image)
        }
        for (let i = 0; i < this.Image_Data.length; i++) {
          // console.log("imgShow = ", this.Image_Data);
          dataFrom.append('Image_Farm' + i, this.Image_Data[i])
          // console.log(i);
          // console.log("Image_Data = ", typeof (this.Image_Data));
        }
        dataFrom.append("_Data", JSON.stringify(this.Farm_Add_Data));
        dataFrom.append("Function_Name", "Add_Farm");
        this.authService.Upload_Item(dataFrom).then((res) => { //, this.Farm_Add_Data
          this.dismiss();
          this.events.publish('back_again', "For Load data again");
        })

      }
    }
  }
  UpdateImage() {
    let Func_Name = "Update_Farm";
    this.Set_Date_Time();
    // console.log("Farm_Add_Data = ", this.Farm_Add_Data)

    if (this.Farm_Add_Data.Farm_State == '2') {
      Func_Name = "Update_Farm_and_State"
    }
    let dataFrom = new FormData();

    // Add Lat and Lng to Farm_Add_Data
    this.Farm_Add_Data.Farm_Map = this.Map.Map_Lat + "," + this.Map.Map_Lng;
    // console.log("Farm_Add_Data = ", this.Farm_Add_Data);

    if (this.Farm_Add_Data.Farm_Name == "" || this.Farm_Add_Data.Farm_Details == "" || this.Farm_Add_Data.Farm_Address == "") {
      this.Alert("กรุณากรอกข้อมูลให้ครบด้วยค่ะ");
    }
    else {
      if (this.Image_Data == null) {
        if (this.State_Upload_Profile == true) {
          dataFrom.append('Profile_Image', this.Farm_Add_Data.Profile_Image)
        }
        dataFrom.append("_Data", JSON.stringify(this.Farm_Add_Data));
        dataFrom.append("Function_Name", Func_Name);
        this.authService.Update_Item(dataFrom).then((res) => {
          // this.navCtrl.setRoot(FarmPage);
          this.events.publish('Load_Data_farm', "For Load data again");
          this.dismiss();

        })

      }
      else {
        if (this.State_Upload_Profile == true) {
          dataFrom.append('Profile_Image', this.Farm_Add_Data.Profile_Image)
        }
        for (let i = 0; i < this.Image_Data.length; i++) {
          // console.log("imgShow = ", this.Image_Data);
          dataFrom.append('Image_Farm' + i, this.Image_Data[i])
          // console.log(i);
          // console.log("Image_Data = ", typeof (this.Image_Data));
        }
        dataFrom.append("_Data", JSON.stringify(this.Farm_Add_Data));
        dataFrom.append("Function_Name", Func_Name);
        this.authService.Update_Item(dataFrom).then((res) => { //, this.Farm_Add_Data
          this.events.publish('Load_Data_farm', "For Load data again");
          this.dismiss();
        })

      }
    }
  }
}
