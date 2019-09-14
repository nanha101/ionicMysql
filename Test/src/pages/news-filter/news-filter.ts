import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service';
/**
 * Generated class for the NewsFilterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-news-filter',
  templateUrl: 'news-filter.html',
})
export class NewsFilterPage {
  Animals: any;
  AnimalType: any;

  NewsType: any;
  Get_News_Type: any;
  Filter_Data: any;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private authService: AuthServiceProvider,
    public events: Events,
  ) {

    this.Get_Animal();
    this.Get_Newss_Type();
    this.Set_Fil();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewsFilterPage');
  }
  ionViewWillLeave() {
    // Post_Data:any={AnimalsType:["all"],KnowledgeType:["all"]};
    console.log("Doing Leave!");
    // console.log("Before AnimalsType = "+this.AnimalType);

    this.Filter_Data = { AnimalsType: this.AnimalType, NewsType: this.NewsType };
    // console.log("Filter_Data.AnimalType = "+this.Filter_Data.AnimalsType);
    // console.log("Filter_Data.KnowledgeType = "+this.Filter_Data.KnowledgeType);
    this.events.publish('Fil_News_Data', this.Filter_Data);

    // this.AnimalType={AnimalsType: this.AnimalType};
    // console.log("AnimalsType = "+this.AnimalType);
    // this.events.publish('Know_Animals_Data',this.AnimalType);
  }
  Set_Fil() {
    this.events.subscribe('Set_Filter_News', (Set_Data) => {
      // console.log("Set_Data = "+Set_Data);
      // console.log("AnimalsType = "+Set_Data.AnimalsType);
      // console.log("KnowledgeTypeType = "+Set_Data.KnowledgeType);
      this.AnimalType = Set_Data.AnimalsType;
      this.NewsType = Set_Data.NewsType;
      // this.Load_Data();
      this.events.unsubscribe('Set_Filter_Know');
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
        // console.log(this.Animals);
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
        // console.log(this.Get_News_Type);
      });
  }


}
