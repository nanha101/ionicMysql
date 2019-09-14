import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';

import { AuthServiceProvider } from '../../providers/auth-service';

/**
 * Generated class for the KnowledgeFilterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-knowledge-filter',
  templateUrl: 'knowledge-filter.html',
})

export class KnowledgeFilterPage {
  Animals: any;
  AnimalType: any;

  KnowledgeType: any;
  Get_Know_Type: any;

  Filter_Data: any;
  // test:any={test:["test"]};
  constructor(public navCtrl: NavController,
    public authService: AuthServiceProvider,
    public events: Events) {

    this.Get_Animal();
    this.Get_Knowledge_Type();
    this.Set_Fil();
  }
  ionViewWillLeave() {
    // Post_Data:any={AnimalsType:["all"],KnowledgeType:["all"]};
    console.log("Doing Leave!");
    // console.log("Before AnimalsType = "+this.AnimalType);

    this.Filter_Data = { AnimalsType: this.AnimalType, KnowledgeType: this.KnowledgeType };
    // console.log("Filter_Data.AnimalType = "+this.Filter_Data.AnimalsType);
    // console.log("Filter_Data.KnowledgeType = "+this.Filter_Data.KnowledgeType);
    this.events.publish('Know_Animals_Data', this.Filter_Data);

    // this.AnimalType={AnimalsType: this.AnimalType};
    // console.log("AnimalsType = "+this.AnimalType);
    // this.events.publish('Know_Animals_Data',this.AnimalType);
  }
  Set_Fil() {
    this.events.subscribe('Set_Filter_Know', (Set_Data) => {
      // console.log("Set_Data = "+Set_Data);
      // console.log("AnimalsType = "+Set_Data.AnimalsType);
      // console.log("KnowledgeTypeType = "+Set_Data.KnowledgeType);
      this.AnimalType = Set_Data.AnimalsType;
      this.KnowledgeType = Set_Data.KnowledgeType;
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
        console.log("Hello Nan");
        // console.log(result);
        this.Animals = result;
        this.Animals = this.Animals.Animals;
        // console.log(this.Animals);
      });
  }
  Get_Knowledge_Type() {
    // console.log("Hello Nan");
    // console.log(this.test);
    this
      .authService
      .postData("", "Get_Know_Type")
      .then((result) => {
        console.log("Hello Nan");
        // console.log(result);
        this.Get_Know_Type = result;
        this.Get_Know_Type = this.Get_Know_Type.Know_type;
        console.log(this.Get_Know_Type);
      });
  }

}
