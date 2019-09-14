import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service';
import { Ng2ImgMaxService } from 'ng2-img-max';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the PersonalChangePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-personal-change',
  templateUrl: 'personal-change.html',
})
export class PersonalChangePage {

  Path_Image: string;
  Profile_Show: any;
  Profile_Image: any = null;
  Response_Data: any;

  Personal_Data = {
    "Username": "",
    "Name": "",
    "Address": "",
    "Phone": "",
    "Email": "",
    "Profile": ""
  };
  Personal_Admin_Data = {
    "Admin_Name": "",
    "Admin_Id": ""
  };
  User_Pass_Data = {
    "User_Id": "",
    "Old_Password": "",
    "New_Password": "",
    "Re_Password": ""
  };

  Admin_Pass_Data = {
    "Admin_Id": "",
    "Old_Password": "",
    "New_Password": "",
    "Re_Password": ""
  };



  Change_User_Pass: boolean = false;
  Change_Admin_Pass: boolean = false;
  Change_User_Personal: boolean = false;
  Change_Admin_Personal: boolean = false;

  State:string ="แก้ไขข้อมูลส่วนตัว";
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public authService: AuthServiceProvider,
    private _ng2ImgMax: Ng2ImgMaxService, // resize image file
    // public events: Events,
    public alertCtrl: AlertController,
    private storage: Storage,
  ) {
    this.Path_Image = this.authService.Get_Path_Image();
    this.Set_Data()
  }
  Set_Data() {
    let Get_Data = this.navParams.get('items');

    if (Get_Data.State == "Change_User_Pass") {
      this.State="แก้ไขรหัสผ่าน"
      this.Change_User_Pass = true;
      Get_Data = Get_Data.item;
      this.User_Pass_Data.User_Id = Get_Data.User_Id;
      // console.log("Hello")
    }
    else if (Get_Data.State == "Change_Admin_Pass") {
      this.State="แก้ไขรหัสผ่าน";
      this.Change_Admin_Pass = true;
      Get_Data = Get_Data.item;
      this.Admin_Pass_Data.Admin_Id = Get_Data.Admin_Id;
    }
    else if (Get_Data.State == 'Change_Admin_Personal') {
      this.Change_Admin_Personal = true;
      Get_Data = Get_Data.item;
      this.Personal_Admin_Data.Admin_Name = Get_Data.Admin_Name;
      this.Personal_Admin_Data.Admin_Id = Get_Data.Admin_Id;
    }
    else if (Get_Data.State == "Change_User_Personal") {
      this.Change_User_Personal = true;
      Get_Data = Get_Data.item;
      console.log(Get_Data);
      this.Personal_Data.Name = Get_Data.User_Name
      this.Personal_Data.Address = Get_Data.User_Address
      this.Personal_Data.Phone = Get_Data.User_Phone
      this.Personal_Data.Email = Get_Data.User_Email
      this.Profile_Show = Get_Data.User_Pic;
      this.Personal_Data.Username = Get_Data.User_Id

    }

    // Personal_Data
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad PersonalChangePage');
  }
  ionViewWillEnter() {

  }
  Back() {
    this.navCtrl.pop();
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
  Resize_Image_Profile(event) {
    // this.Pro_Show = true;
    // this.State_Upload_Profile = true;
    // console.log("Hellooooooooo");
    this._ng2ImgMax.resizeImage(event[0], 2000, 1000).subscribe((result) => {
      // console.log("rusult = ", result);
      this.Profile_Image = result;
      // this.Path_Image_Profile = null;

      // console.log("Regis_Data = ", this.Regis_Data);
      this.Get_Base64_Profile(this.Profile_Image);
    }, error => console.log(error)
    );
  }
  BrowseProfile(event) {
    // console.log(event);
    this.Path_Image = null;
    if (event.length != 0) {
      console.log("innnnnnn")
      this.Resize_Image_Profile(event);
    }
    // } //end loop
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
  Load_Login_Data() {
    this
      .authService
      .postData(this.Personal_Data, "Get_Login_Data")
      .then((result) => {
        this.Response_Data = result;
        this.Response_Data = this.Response_Data.User_Data;
        console.log("ressss = ", this.Response_Data[0])
        this.storage.set("Login_Data", this.Response_Data[0]);
        this.navCtrl.pop();
      });

  }
  Confirm() {
    let dataFrom = new FormData();
    // console.log("Personal_Data = ", this.Personal_Data.Name);
    if (this.Personal_Data.Username == "" || this.Personal_Data.Name == "" || this.Personal_Data.Address == "" || this.Personal_Data.Phone == "" || this.Personal_Data.Email == "") {
      this.Alert("กรุณากรอกข้อมูลให้ครบ");
    }
    else {
      if (this.Profile_Image != null) {
        dataFrom.append('Profile_Image', this.Profile_Image)
        dataFrom.append("_Data", JSON.stringify(this.Personal_Data));
        dataFrom.append("Function_Name", "Update_Personal");
        this.authService.Update_Item(dataFrom).then((result) => {
          this.Load_Login_Data();
          this.Alert("แก้ไขข้อมูลส่วนตัวสำเร็จ")
        })
      }
      else {

        // dataFrom.append('Profile_Image', this.Profile_Image)
        dataFrom.append("_Data", JSON.stringify(this.Personal_Data));
        dataFrom.append("Function_Name", "Update_Personal");
        this.authService.Update_Item(dataFrom).then((result) => {
          this.Load_Login_Data();
          this.Alert("แก้ไขข้อมูลส่วนตัวสำเร็จ")
        })
      }

    }



  }
  Confirm_Admin() {
    // Personal_Admin_Data = {
    //   "Admin_Name": "",
    //   "Admin_Id": ""
    // };
    if (this.Personal_Admin_Data.Admin_Name == "") {
      this.Alert("กรุณากรอกข้อมูลให้ครบ");
    }
    else {
      console.log(this.Personal_Admin_Data)
      this
        .authService
        .postData(this.Personal_Admin_Data, "Chang_Admin_Personal")
        .then((result) => {
          // alert("Hello");
          // console.log(result);
          this.Response_Data = result;
          // alert(this.Response_Data.CanNot);
          if (this.Response_Data.CanNot) {
            this.Alert("รหัสผ่านเดิมไม่ถูกต้อง");
          }
          else {
            this.Response_Data = this.Response_Data.Admin_Data;
            // console.log("ressss = ", this.Response_Data[0])
            this.storage.set("Login_Data", this.Response_Data[0]);
            this.Alert("แก้ไขข้อมูลส่วนตัวสำเร็จ")
            this.Back();
            // this.navCtrl.setRoot(HomePage);
            // this.events.publish('Menu_Data', this.data_Menu);
          }
        });
    }
  }
  Change_Pass_User() {
    if (this.User_Pass_Data.Old_Password == "" || this.User_Pass_Data.New_Password == "" || this.User_Pass_Data.Re_Password == "") {
      this.Alert("กรุณากรอกข้อมูลให้ครบ");
    }
    else {
      if (this.User_Pass_Data.New_Password != this.User_Pass_Data.Re_Password) {
        this.Alert("กรุณากรอกรหัสผ่านให้ตรงกัน");
      }
      else {
        this
          .authService
          .postData(this.User_Pass_Data, "Chang_User_Pass")
          .then((result) => {
            // alert("Hello");
            // console.log(result);
            this.Response_Data = result;
            // alert(this.Response_Data.CanNot);
            if (this.Response_Data.CanNot) {
              this.Alert("รหัสผ่านเดิมไม่ถูกต้อง");
            }
            else {
              this.Alert("เปลี่ยนรหัสผ่านสำเร็จ")
              this.Back();
              // this.navCtrl.setRoot(HomePage);
              // this.events.publish('Menu_Data', this.data_Menu);
            }
          });
      }
    }
  }
  Change_Pass_Admin() {
    if (this.Admin_Pass_Data.Old_Password == "" || this.Admin_Pass_Data.New_Password == "" || this.Admin_Pass_Data.Re_Password == "") {
      this.Alert("กรุณากรอกข้อมูลให้ครบ");
    }
    else {
      if (this.Admin_Pass_Data.New_Password != this.Admin_Pass_Data.Re_Password) {
        this.Alert("กรุณากรอกรหัสผ่านให้ตรงกัน");
      }
      else {
        this
          .authService
          .postData(this.Admin_Pass_Data, "Chang_Admin_Pass")
          .then((result) => {
            // alert("Hello");
            // console.log(result);
            this.Response_Data = result;
            // alert(this.Response_Data.CanNot);
            if (this.Response_Data.CanNot) {
              this.Alert("รหัสผ่านเดิมไม่ถูกต้อง");
            }
            else {
              this.Alert("เปลี่ยนรหัสผ่านสำเร็จ")
              this.Back();
              // this.navCtrl.setRoot(HomePage);
              // this.events.publish('Menu_Data', this.data_Menu);
            }
          });
      }
    }
  }
}




