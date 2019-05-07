import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {HttpClient} from '@angular/common/http' //网络请求
import {DetailPage} from '../detail/detail'

/**
 * Generated class for the IndexPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-index',
  templateUrl: 'index.html',
})
export class IndexPage {
  cList = []
  nList = []
  rList = []

  constructor(
    private myHttp:HttpClient,
    public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IndexPage');
    //向服务器发请求 将数据打印出来  http://localhost:8080/index
    var url="http://localhost:8080/index"
    this.myHttp.get(url).subscribe((result:any)=>{
      console.log(result);
      //保存数据，显示在视图中
      this.cList=result.carouselItems   //轮播
      this.nList=result.newArrialItems  //横向滚动图
      this.rList=result.recommendedItems//缩略图
     
    })
  }

  jump(pid){
    //跳转到详情页
    console.log(pid);
    var id=pid.split("=")[1]
    this.navCtrl.push(DetailPage,{lid:id})
    console.log(this.rList);
  }

}
