import { Component } from '@angular/core';
import { LoadingController,ViewController,IonicPage, NavController, NavParams } from 'ionic-angular';


/**
 * Generated class for the PayPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pay',
  templateUrl: 'pay.html',
})
export class PayPage {

  constructor(
    private loadingCtrl:LoadingController,
    private viewCtrl:ViewController,
    public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PayPage');
  }

  closeModal(){
    this.viewCtrl.dismiss(0)
  }

  doPay(){
    //显示一个loading 3S,3S之后 关闭模态框
    var myLoading =this.loadingCtrl.create({
      content:'支付中...',
      //duration:3000   //效果同下，2选1都是3秒后关闭
    })

    myLoading.present()
    setTimeout(()=>{
      myLoading.dismiss() //3S后关闭
      this.viewCtrl.dismiss(1)
    },3000)
  }
}
