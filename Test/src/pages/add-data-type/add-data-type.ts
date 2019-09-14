import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController, Events } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service';

/**
 * Generated class for the AddDataTypePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-data-type',
  templateUrl: 'add-data-type.html',
})
export class AddDataTypePage {
  State: string = "";
  Sub_Name: string = "";
  item: any;
  Data: any = {
    "Data": "",
    "Id": "",
  };
  State_Add: boolean = false;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public authService: AuthServiceProvider,
    public events: Events,
    public alertCtrl: AlertController
  ) {
    if (navParams.get('items')) {
      this.Set_Data();
      this.State_Add = false;
    }
    if (navParams.get('Add')) {
      this.State_Add = true;
      this.Set_Add_Data();
    }

  }
  dismiss() {
    this.viewCtrl.dismiss();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad AddDataTypePage');
  }
  Set_Add_Data() {
    this.item = this.navParams.get('Add');
    // this.item = this.item.State;
    if (this.item.State == "Animals") {
      this.State = "เพิ่มประเภทสัตว์"
      this.Sub_Name = "ชื่อสัตว์";
    }
    /////////////////////////////////////////////////////////////////////
    else if (this.item.State == "Knowledge") {
      this.State = "เพิ่มประเภทความรู้"
      this.Sub_Name = "ชื่อประเภทความรู้";
    }
    /////////////////////////////////////////////////////////////////////
    else if (this.item.State == "News") {
      this.State = "เพิ่มประเภทข่าว"
      this.Sub_Name = "ชื่อประเภทข่าว";
    }
    else if (this.item.State == "Market") {
      this.State = "เพิ่มประเภทสินค้าหรือบริการ"
      this.Sub_Name = "ชื่อประเภทขสินค้า";
    }
    else if (this.item.State == "Posts") {
      this.State = "เพิ่มประเภทกระทู้"
      this.Sub_Name = "ชื่อประเภทกระทู้";
    }
    /////////////////////////////////////////////////////////////////////
  }
  Set_Data() {
    this.item = this.navParams.get('items');
    this.item = this.item.item;
    // console.log("item = ", this.item)
    if (this.item.Animal_Name) {
      this.State = "แก้ไขประเภทสัตว์"
      this.Sub_Name = "ชื่อสัตว์";

      this.Data.Data = this.item.Animal_Name;
      this.Data.Id = this.item.Animal_Id
      console.log("item = ", this.item)
    }
    else if (this.item.T_Know_Name) {
      this.State = "แก้ไขประเภทความรู้"
      this.Sub_Name = "ชื่อประเภทความรู้";

      this.Data.Data = this.item.T_Know_Name;
      this.Data.Id = this.item.T_Know_Id
      console.log("item = ", this.item)
    }
    else if (this.item.T_News_Name) {
      this.State = "แก้ไขประเภทข่าวสาร"
      this.Sub_Name = "ชื่อประเภทข่าวสาร";

      this.Data.Data = this.item.T_News_Name;
      this.Data.Id = this.item.T_News_Id
      console.log("item = ", this.item)
    }
    else if (this.item.T_Market_Name) {
      this.State = "แก้ไขประเภทสินค้าและบริการ"
      this.Sub_Name = "ชื่อประเภทสินค้าและบริการ";

      this.Data.Data = this.item.T_Market_Name;
      this.Data.Id = this.item.T_Market_Id
      console.log("item = ", this.item)
    }
    else if (this.item.T_Posts_Name) {
      this.State = "แก้ไขประเภทกระทู้"
      this.Sub_Name = "ชื่อประเภทกระทู้";

      this.Data.Data = this.item.T_Posts_Name;
      this.Data.Id = this.item.T_Posts_Id
      console.log("item = ", this.item)
    }
  }
  Update() {
    if (this.Sub_Name == "ชื่อสัตว์") {
      console.log("this.Dadta = ", this.Data)
      this
        .authService
        .postData(this.Data, "Change_Animals_Type")
        .then((result) => {

        });
    }
    else if (this.Sub_Name == "ชื่อประเภทความรู้") {
      console.log("this.Dadta = ", this.Data)
      this
        .authService
        .postData(this.Data, "Change_Knowledge_Type")
        .then((result) => {

        });
    } 

    else if (this.Sub_Name == "ชื่อประเภทข่าวสาร") {
      console.log("this.Dadta = ", this.Data)
      this
        .authService
        .postData(this.Data, "Change_News_Type")
        .then((result) => {

        });
    }
    else if (this.Sub_Name == "ชื่อประเภทสินค้าและบริการ") {
      console.log("this.Dadta = ", this.Data)
      this
        .authService
        .postData(this.Data, "Change_Market_Type")
        .then((result) => {

        });
    }
    else if (this.Sub_Name == "ชื่อประเภทกระทู้") {
      console.log("this.Dadta = ", this.Data)
      this
        .authService
        .postData(this.Data, "Change_Posts_Type")
        .then((result) => {

        });
    }

    setTimeout(() => {
      this.dismiss();
      this.events.publish('Load_Again', "For Load data again");
      console.log("dasfasdfafasf")
    }, 200);
  }
  Insert() {
    if (this.Sub_Name == "ชื่อสัตว์") {
      console.log("this.Dadta = ", this.Data)
      this
        .authService
        .postData(this.Data, "Add_Animals_Type")
        .then((result) => {

        });
    }
    /////////////////////////////////////////////////////////////////////
    else if (this.Sub_Name == "ชื่อประเภทความรู้") {
      console.log("this.Dadta = ", this.Data)
      this
        .authService
        .postData(this.Data, "Add_Knowledge_Type")
        .then((result) => {

        });
    }
    //////////////////////////////////////////////////////////////////////////
    else if (this.Sub_Name == "ชื่อประเภทข่าว") {
      console.log("this.Dadta = ", this.Data)
      this
        .authService
        .postData(this.Data, "Add_News_Type")
        .then((result) => {

        });
    }
    //////////////////////////////////////////////////////////////////////////
    else if (this.Sub_Name == "ชื่อประเภทขสินค้า") {
      console.log("this.Dadta = ", this.Data)
      this
        .authService
        .postData(this.Data, "Add_Market_Type")
        .then((result) => {

        });
    }

    //////////////////////////////////////////////////////////////////////////
    else if (this.Sub_Name == "ชื่อประเภทกระทู้") {
      console.log("this.Dadta = ", this.Data)
      this
        .authService
        .postData(this.Data, "Add_Posts_Type")
        .then((result) => {

        });
    }
    //////////////////////////////////////////////////////////////////////////
    setTimeout(() => {
      this.dismiss();
      this.events.publish('Load_Again', "For Load data again");
      // console.log("dasfasdfafasf")
    }, 200);
  }

}
