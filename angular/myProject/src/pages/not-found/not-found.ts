import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the NotFoundPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-not-found',
  templateUrl: 'not-found.html',
})
export class NotFoundPage {
  count=5
  canBack=false  //是否可以返回上一层
  timer=null   //定时器
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotFoundPage');
    if(this.navCtrl.canGoBack()){
      this.canBack=true
      this.timer=setInterval(()=>{
        console.log(this.count);
        if(this.count == 1){
          this.navCtrl.pop()
          
        }
        this.count--
      },1000)
    }else{
      this.canBack=false
    }  
  }

  ionViewWillLeave(){//页面离开后执行
    //执行清理工作:比如关闭定时器运行
    if(this.timer){
      clearInterval(this.timer)
    }
  }

}
