import { Component } from '@angular/core';
import { ModalController,IonicPage, NavController, NavParams } from 'ionic-angular';
import {PayPage} from '../pay/pay'
import {IndexPage} from '../index/index'
import {CartPage} from '../cart/cart'
/**
 * Generated class for the OrderConfirmPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-order-confirm',
  templateUrl: 'order-confirm.html',
})
export class OrderConfirmPage {

  constructor(
    private modalCtrl:ModalController,
    public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderConfirmPage');
  }

  //显示模态窗口 ①引入 ②示例化 ③创建 ④显示
  showModal(){
    var myModal=this.modalCtrl.create(PayPage)

    myModal.present()

    //todo:接收模态窗口被关闭时所传来的数据
    myModal.onDidDismiss((data)=>{
      if(data==1){
        //this.navCtrl.push(IndexPage)
        //this.navCtrl.parent可以得到tabsshili，只能在tab中显示或者跳转到的页面
        this.navCtrl.parent.select(0)
      }else if(data==0){
        this.navCtrl.push(CartPage)
      }
    })
  }

}
