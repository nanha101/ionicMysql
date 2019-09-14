import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { KnowledgeFilterPage } from '../knowledge-filter/knowledge-filter';

/**
 * Generated class for the HomeFilterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home-filter',
  templateUrl: 'home-filter.html',
})
export class HomeFilterPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad HomeFilterPage');
  }


}