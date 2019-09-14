import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Events, AlertController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service';
import { AddDataTypePage } from '../add-data-type/add-data-type';

/**
 * Generated class for the ManageTypeDataPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-manage-type-data',
  templateUrl: 'manage-type-data.html',
})
export class ManageTypeDataPage {

  Animal_Type: any;
  Know_Type: any;
  News_Type: any;
  Posts_Type: any;
  Market_Type: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    //  private storage: Storage,
    public authService: AuthServiceProvider,
    public events: Events,
    public modalCtrl: ModalController,
    public alertCtrl: AlertController
  ) {
    this.Load_Data();
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad ManageTypeDataPage');
  }

  Load_Animals_Type() {
    // console.log("this.Post_Data = " + this.Post_Data);
    // }
    // console.log("asdasdf"+this.Post_Data.AnimalsType);
    this
      .authService
      .postData("", "Get_Animals")
      .then((result) => {
        this.Animal_Type = result;
        this.Animal_Type = this.Animal_Type.Animals
        // console.log("animal = ", this.Animal_Type);//.Know_type 
      });
    // this.initializeItems();
  }
  Load_Know_Type() {
    // console.log("this.Post_Data = " + this.Post_Data);
    // }
    // console.log("asdasdf"+this.Post_Data.AnimalsType);
    this
      .authService
      .postData("", "Get_Know_Type")
      .then((result) => {
        this.Know_Type = result;
        this.Know_Type = this.Know_Type.Know_type
        // console.log(result);//.Know_type 
      });
    // this.initializeItems();
  }
  Load_News_Type() {
    // console.log("this.Post_Data = " + this.Post_Data);
    // }
    // console.log("asdasdf"+this.Post_Data.AnimalsType);
    this
      .authService
      .postData("", "Get_News_Type")
      .then((result) => {
        this.News_Type = result
        this.News_Type = this.News_Type.News_type
        // console.log(result); //.News_type
      });
    // this.initializeItems();
  }
  Load_Market_Type() {
    // console.log("this.Post_Data = " + this.Post_Data);
    // }
    // console.log("asdasdf"+this.Post_Data.AnimalsType);
    this
      .authService
      .postData("", "Get_Market_Type")
      .then((result) => {
        this.Market_Type = result
        this.Market_Type = this.Market_Type.Market_type
        // console.log(result); //.Market_type 
      });
    // this.initializeItems();
  }
  Load_Posts_Type() {
    // console.log("this.Post_Data = " + this.Post_Data);
    // }
    // console.log("asdasdf"+this.Post_Data.AnimalsType);
    this
      .authService
      .postData("", "Get_Posts_Type")
      .then((result) => {
        this.Posts_Type = result
        this.Posts_Type = this.Posts_Type.Posts_type
        // console.log(result);//Posts_type
      });
    // this.initializeItems();
  }
  Change(item) {
    let items = { "item": item, "State": "แก้ไขความรู้" }
    let modal = this.modalCtrl.create(AddDataTypePage, { items });
    modal.present();
  }






  Add_Animals_Type() {
    let Add = { "State": "Animals" }
    let modal = this.modalCtrl.create(AddDataTypePage, { Add });
    modal.present();
  }

  Add_Know_Type() {
    let Add = { "State": "Knowledge" }
    let modal = this.modalCtrl.create(AddDataTypePage, { Add });
    modal.present();
  }
  Add_News_Type() {
    let Add = { "State": "News" }
    let modal = this.modalCtrl.create(AddDataTypePage, { Add });
    modal.present();
  }
  Add_Market_Type() {
    let Add = { "State": "Market" }
    let modal = this.modalCtrl.create(AddDataTypePage, { Add });
    modal.present();
  }
  Add_Posts_Type() {
    let Add = { "State": "Posts" }
    let modal = this.modalCtrl.create(AddDataTypePage, { Add });
    modal.present();
  }







  Load_Data() {
    this.Load_Animals_Type();
    this.Load_Know_Type();
    this.Load_News_Type();
    this.Load_Market_Type();
    this.Load_Posts_Type();
  }

  ionViewWillEnter() {
    this.events.subscribe('Load_Again', (Data) => {

      // console.log('hello1')
      this.Load_Data();
      // setTimeout(() => {
      //   // console.log('hello2')

      //   // this.events.unsubscribe('Load_Again');
      // }, 1000);
    });

  }






  
  Delete_Animals_Type(item) {
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
            this
              .authService
              .postData(item, "Delete_Animals_Type")
              .then((result) => {
                this.Load_Data();
                // setTimeout(() => {
                //   // console.log('hello2')

                //   // this.events.unsubscribe('Load_Again');
                // }, 1000);
              });

          }
        }
      ]
    });
    confirm.present();

  }
  Delete_Know_Type(item) {
    const confirm = this.alertCtrl.create({
      title: 'ยืนยันการลบรายการ',
      message: 'คุณต้องการยืนยันการลบรายการนี้หรือไม่?',
      buttons: [
        {
          text: 'ยกเลิก',
        },
        {
          text: 'ยืนยัน',
          handler: () => {
            this
              .authService
              .postData(item, "Delete_Knowledge_Type")
              .then((result) => {
                this.Load_Data();
                // setTimeout(() => {
                //   // console.log('hello2')

                //   // this.events.unsubscribe('Load_Again');
                // }, 1000);
              });

          }
        }
      ]
    });
    confirm.present();

  }
  Delete_News_Type(item) {
    const confirm = this.alertCtrl.create({
      title: 'ยืนยันการลบรายการ',
      message: 'คุณต้องการยืนยันการลบรายการนี้หรือไม่?',
      buttons: [
        {
          text: 'ยกเลิก',
        },
        {
          text: 'ยืนยัน',
          handler: () => {
            this
              .authService
              .postData(item, "Delete_News_Type")
              .then((result) => {
                this.Load_Data();
                // setTimeout(() => {
                //   // console.log('hello2')

                //   // this.events.unsubscribe('Load_Again');
                // }, 1000);
              });

          }
        }
      ]
    });
    confirm.present();

  }
  Delete_Market_Type(item) {
    const confirm = this.alertCtrl.create({
      title: 'ยืนยันการลบรายการ',
      message: 'คุณต้องการยืนยันการลบรายการนี้หรือไม่?',
      buttons: [
        {
          text: 'ยกเลิก',
        },
        {
          text: 'ยืนยัน',
          handler: () => {
            this
              .authService
              .postData(item, "Delete_Market_Type")
              .then((result) => {
                this.Load_Data();
                // setTimeout(() => {
                //   // console.log('hello2')

                //   // this.events.unsubscribe('Load_Again');
                // }, 1000);
              });

          }
        }
      ]
    });
    confirm.present();

  }
  Delete_Posts_Type(item) {
    const confirm = this.alertCtrl.create({
      title: 'ยืนยันการลบรายการ',
      message: 'คุณต้องการยืนยันการลบรายการนี้หรือไม่?',
      buttons: [
        {
          text: 'ยกเลิก',
        },
        {
          text: 'ยืนยัน',
          handler: () => {
            this
              .authService
              .postData(item, "Delete_Posts_Type")
              .then((result) => {
                this.Load_Data();
                // setTimeout(() => {
                //   // console.log('hello2')

                //   // this.events.unsubscribe('Load_Again');
                // }, 1000);
              });

          }
        }
      ]
    });
    confirm.present();

  }

}
