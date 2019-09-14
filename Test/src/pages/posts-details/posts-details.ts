import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ModalController, Events } from 'ionic-angular';
import { Ng2ImgMaxService } from 'ng2-img-max';
import { AuthServiceProvider } from '../../providers/auth-service';
import { Storage } from '@ionic/storage';
import { PostsPage } from '../posts/posts';
import { PostsAddPage } from '../posts-add/posts-add';

/**
 * Generated class for the PostsDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-posts-details',
  templateUrl: 'posts-details.html',
})
export class PostsDetailsPage {
  Update_State: boolean = false;
  Path_Image: string = null;
  Img_Show: boolean = false;
  comment_Img_Show: boolean = false
  imgShow: any;
  Image_Data: any;
  // State_Upload: boolean = true;
  // State_Image_Update: boolean = true;
  Comment_Show: boolean = false;
  Add_Comments = {
    "message": "",
    "Date": "",
    "Time": "",
    "User_Id": "",
    "Admin_Id": "",
    "Posts_Id": ""
  };

  Update_Comments = {
    "message": "",
    "comment_Id": ""
  };
  Login_Data: any;

  Name_UA_Posts: any;
  Name_UA_Comments: any;

  Detail_Data: any = {};
  Response_Image: any;
  User: boolean = false;
  Admin: boolean = false;
  Comments_Image: any;
  Comments_Data: any;
  Show_Change_Posts: boolean = false;
  Show_Delete_Posts: boolean = false;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _ng2ImgMax: Ng2ImgMaxService, // resize image file
    private authService: AuthServiceProvider,
    private storage: Storage,
    public alertCtrl: AlertController,
    public modalCtrl: ModalController,
    public events: Events,
  ) {
    this.Path_Image = this.authService.Get_Path_Image();
    this.Set_Data();
  }
  ManageLogin_Data() {
    this.storage.get("Login_Data").then((val) => {
      this.Login_Data = val;
      console.log("login_Data = ", this.Login_Data)
      if (this.Login_Data == null || this.Login_Data == "") {

      }
      else if (this.Login_Data.User_Id) {
        this.Add_Comments.User_Id = this.Login_Data.User_Id
        this.User = true;
        if (this.Login_Data.User_Id == this.Detail_Data.User_Id) {
          this.Show_Change_Posts = true;
          this.Show_Delete_Posts = true;
        }
      }
      else if (this.Login_Data.Admin_Id) {
        this.Add_Comments.Admin_Id = this.Login_Data.Admin_Id
        this.Admin = true;
        this.Show_Delete_Posts = true;
        if (this.Login_Data.Admin_Id == this.Detail_Data.Admin_Id) {
          this.Show_Change_Posts = true;
        }
      }
    });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad PostsDetailsPage');
    this.events.subscribe('Updated', (Data) => {
      // console.log("================In Knowledge==============");
      // this.Load_Data();

      this.events.publish('Load_Data', "For Load data again");
      this.navCtrl.pop();
      this.events.unsubscribe('Updated');
    });
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
    this._ng2ImgMax.resizeImage(event[ii], 2000, 1000).subscribe((result) => { // 2000, 1000
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
      this.comment_Img_Show = false;
    }
    else {
      this.comment_Img_Show = true;
    }
    // this.State_Image_Update = false;
    // this.Path_Image = null;
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
  Set_Data() {
    this.Detail_Data = this.navParams.get('items').item;
    this.Response_Image = this.navParams.get('items').Image;
    this.Name_UA_Posts = this.navParams.get('items').Name;
    console.log("Name_UA_Posts = ",this.Name_UA_Posts)
    // console.log("image = ", this.Response_Image)
    if (this.Response_Image.length == 0) {
      console.log("555555")
    }
    else {
      this.Img_Show = true;
    }
    this.Load_Data();

    this.ManageLogin_Data()
  }
  Load_Data() {
    // console.log("Posts_Id = ", this.Detail_Data.Posts_Id)

    this
      .authService
      .postData(this.Detail_Data.Posts_Id, "Get_Comments_Data")
      .then((result) => {
        console.log("result = ", result)
        this.Comments_Data = result;
        this.Comments_Image = result;
        this.Name_UA_Comments = result;
        if (this.Comments_Data.null) {
          console.log("nulllll")
          this.Comment_Show = false;
        }
        else {
          if (this.Comments_Data.Comments) {
            // console.log("Hello");
            this.Comment_Show = true;
            this.Comments_Data = this.Comments_Data.Comments;
            // this.items = this.Response_Data; //for Search
            this.Name_UA_Comments = this.Name_UA_Comments.Name;
            // console.log("Name = ",this.Name)
            // console.log(this.Response_Data);
            // console.log("Response_Data = ",this.Response_Data);
          }
          if (this.Comments_Image.Comments_Image) {
            this.Comments_Image = this.Comments_Image.Comments_Image;
            console.log("Comments_Image = ", this.Comments_Image)
          }
          // console.log("Comments_Data = ", this.Comments_Data)

        }



      });
  }
  Set_Date_Time() {
    let today = new Date();
    let day = (today.getFullYear() + 543) + "-" + (today.getMonth() + 1) + "-" + (today.getDate());
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    this.Add_Comments.Date = day;
    this.Add_Comments.Time = time;
    // this.Add_Comments.Admin_Id = this.Login_Data.Admin_Id;
    this.Add_Comments.Posts_Id = this.Detail_Data.Posts_Id

  }
  InsertComments() {

    this.Set_Date_Time();
    console.log("Add_comments = ", this.Add_Comments)
    console.log("image = ", this.Image_Data)
    // if (this.Add_Comments.message == null || this.Add_Comments.message == "") {

    // }
    // else {
      let dataFrom = new FormData();
      if (this.Image_Data == null || this.Image_Data.length == 0) {
        console.log("NO have")
        dataFrom.append("_Data", JSON.stringify(this.Add_Comments));
        dataFrom.append("Function_Name", "Add_Comments");
        this.authService.Upload_Item(dataFrom).then((res) => {
          this.Add_Comments.message = "";
          this.Image_Data = [];
          this.comment_Img_Show = false;
          this.Load_Data();

        })
      }
      else {
        console.log("haveeeeeee")
        for (let i = 0; i < this.Image_Data.length; i++) {
          // console.log("imgShow = ", this.Image_Data);
          dataFrom.append('Image_Comments' + i, this.Image_Data[i])
          // console.log(i);
          // console.log("Image_Data = ", typeof (this.Image_Data));
        }
        dataFrom.append("_Data", JSON.stringify(this.Add_Comments));
        dataFrom.append("Function_Name", "Add_Comments");
        this.authService.Upload_Item(dataFrom).then((res) => { //, this.Add_Comments
          this.Add_Comments.message = "";
          this.Image_Data = [];
          this.comment_Img_Show = false;
          this.Load_Data();

        })
      }
    // }


  }

  Delete_Comment(item) {
    const confirm = this.alertCtrl.create({
      title: 'คุณต้องลบความคิดเห็นนี้หรือไม่?',
      message: '',
      buttons: [
        {
          text: 'ยกเลิก',
          // handler: () => {
          //   console.log('Disagree clicked');
          // }
        },
        {
          text: 'ตกลง',
          handler: () => {
            let dataFrom = new FormData();
            dataFrom.append("comment_Id", item.comment_Id);
            dataFrom.append("Function_Name", "Delete_Comments");
            this.authService.Delete_Item(dataFrom).then((res) => {

              this.Load_Data();

            })

          }
        }
      ]
    });
    confirm.present();
  }
  Change_Comment(item) {
    const confirm = this.alertCtrl.create({
      title: 'คุณต้องแก้ไขความคิดเห็นนี้หรือไม่?',
      message: '',
      buttons: [
        {
          text: 'ยกเลิก',
          // handler: () => {
          //   console.log('Disagree clicked'); 
          // }
        },
        {
          text: 'ตกลง',
          handler: () => {
            console.log(item);
            this.Add_Comments.message = item.comment_Content;
            this.Update_State = true;
            this.Update_Comments.comment_Id = item.comment_Id
          }
        }
      ]
    });
    confirm.present();
  }
  Cancel() {
    this.Add_Comments.message = "";
    this.Update_State = false;
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

  Update() {
    this.Update_Comments.message = this.Add_Comments.message
    console.log("Update_cooment = ", this.Update_Comments)
    let dataFrom = new FormData();
    if (this.Add_Comments.message == "") {
      this.Alert("กรุณากรอกข้อมูลที่ต้องการแก้ไขด้วยค่ะ");
    }
    else {
      dataFrom.append("_Data", JSON.stringify(this.Update_Comments));
      dataFrom.append("Function_Name", "Update_Comments");
      this.authService.Update_Item(dataFrom).then((res) => {
        this.comment_Img_Show = false;
        this.Add_Comments.message = "";
        this.Update_State = false;
        this.Load_Data();
      })

    }
  }

  Cancel_Image() {
    this.comment_Img_Show = false;
    this.Image_Data = [];
    this.imgShow = [];
  }

  Delete_Posts(item) {
    const confirm = this.alertCtrl.create({
      title: 'คุณต้องลบกระทู้นี้หรือไม่?',
      message: '',
      buttons: [
        {
          text: 'ยกเลิก',
          // handler: () => {
          //   console.log('Disagree clicked');
          // }
        },
        {
          text: 'ตกลง',
          handler: () => {
            let dataFrom = new FormData();
            dataFrom.append("Posts_Id", this.Detail_Data.Posts_Id);
            dataFrom.append("Function_Name", "Delete_Posts");
            this.authService.Delete_Item(dataFrom).then((res) => {

              this.Load_Data();
              this.navCtrl.setRoot(PostsPage);

            })

          }
        }
      ]
    });
    confirm.present();
  }
  Change_Posts(item) {
    let items = { "item": this.Detail_Data, "Image": this.Response_Image, "State": "แก้ไขกระทู้" }
    let modal = this.modalCtrl.create(PostsAddPage, { items });
    modal.present();
  }
}
