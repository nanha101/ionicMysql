import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service';

/**
 * Generated class for the PostFilterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-post-filter',
  templateUrl: 'post-filter.html',
})
export class PostFilterPage {
  Animals: any;
  AnimalType: any;

  PostsType: any;
  Posts_Type: any;
  Get_Posts_Type: any;
  Filter_Data: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private authService: AuthServiceProvider,
    public events: Events,
  ) {
    this.Get_Animal();
    this.Get_Postss_Type();
    this.Set_Fil();
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
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewsFilterPage');
  }
  Set_Fil() {
    this.events.subscribe('Set_Filter_Posts', (Set_Data) => {
      // console.log("Set_Data = "+Set_Data);
      // console.log("AnimalsType = "+Set_Data.AnimalsType);
      // console.log("KnowledgeTypeType = "+Set_Data.KnowledgeType);
      this.AnimalType = Set_Data.AnimalsType;
      this.PostsType = Set_Data.PostsType;
      // console.log("Set_Data = ",Set_Data)
      // this.Load_Data(); 
      this.events.unsubscribe('Set_Filter_Posts');
    });
  }

  ionViewWillLeave() {
    // Post_Data:any={AnimalsType:["all"],KnowledgeType:["all"]};
    // console.log("Doing Leave!");
    // console.log("Before AnimalsType = "+this.AnimalType);

    this.Filter_Data = { AnimalsType: this.AnimalType, PostsType: this.PostsType };
    // console.log("Filter_Data.AnimalType = "+this.Filter_Data.AnimalsType);
    console.log("Filter_Data = ", this.Filter_Data);

    this.events.publish('Fil_Posts_Data', this.Filter_Data);

    // this.AnimalType={AnimalsType: this.AnimalType};
    // console.log("AnimalsType = "+this.AnimalType);
    // this.events.publish('Know_Animals_Data',this.AnimalType);
  }

}
