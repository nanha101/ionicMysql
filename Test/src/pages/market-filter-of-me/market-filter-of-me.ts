import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service';

/**
 * Generated class for the MarketFilterOfMePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-market-filter-of-me',
  templateUrl: 'market-filter-of-me.html',
})
export class MarketFilterOfMePage {
  MarketType: any;
  Get_Market_Type: any;
  Filter_Data: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private authService: AuthServiceProvider,
    public events: Events

  ) {

    this.Get_Markett_Type();
    this.Set_Fil();
  }

  ionViewWillLeave() {
    this.Filter_Data = { MarketType: this.MarketType };
    this.events.publish('Fil_MyProduct_Data', this.Filter_Data);

  }
  Set_Fil() {
    this.events.subscribe('Set_Filter2_Market', (Set_Data) => {
      // console.log("Set_Data = "+Set_Data);
      // console.log("AnimalsType = "+Set_Data.AnimalsType);
      // console.log("KnowledgeTypeType = "+Set_Data.KnowledgeType);
      this.MarketType = Set_Data.MarketType;
      // this.Load_Data();
      this.events.unsubscribe('Set_Filter2_Market');
    });
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
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MarketFilterOfMePage');
  }

}
