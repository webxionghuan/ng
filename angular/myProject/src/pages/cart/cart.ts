import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {HttpClient} from '@angular/common/http'

import {LoginPage} from '../login/login'
import {OrderConfirmPage} from '../order-confirm/order-confirm'
/**
 * Generated class for the CartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {
  cartList=[]
  isAllSelected=false //记录全选复选框有没有被选中
  

  constructor(
    private httpCtrl:HttpClient,
    public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewWillEnter() {
    console.log('ionViewDidLoad CartPage');
    var url="http://localhost:8080/cart/list"
    this.httpCtrl.get(url,{withCredentials:true}).subscribe((result:any)=>{

      if(result.code==300){
        this.navCtrl.push(LoginPage)
      }else if(result.code==200){
        this.cartList=result.data  
        //遍历this.cartList，给每个商品添加一个属性  isSelected
        //isSelected 记录商品有没有被选中
        for(var i=0;i<this.cartList.length;i++){
          this.cartList[i].isSelected=false 
        }    
      }
    })
  }
  //全选按钮
  operateAll(){
    for(var i=0;i<this.cartList.length;i++){
      this.cartList[i].isSelected=this.isAllSelected

    }
  }
  //单选按钮控制全选按钮
  operateOne(){
    var result=true
    for(var i=0;i<this.cartList.length;i++){
      result=this.cartList[i].isSelected && result
      this.isAllSelected=result
    }
  }
  //button按钮+-运算
  //减
  sub(i){
    this.cartList[i].count--
    if(this.cartList[i].count<1){
      this.cartList[i].count=0  
      //this.cartList.splice(i,1)  //当数量小于1时删除当前商品
    }
  }
  //加
  add(i){
    this.cartList[i].count++
  }

  //结算按钮  跳转到订单确认页面pay
  jump(){
    this.navCtrl.push(OrderConfirmPage)
  }

  calcTotalPrice(){
    var price=0
    for(var i=0;i<this.cartList.length;i++){
      var p=this.cartList[i]
      if(p.isSelected){
        price+=(p.price*p.count)
      }
    }
    return price
  }
}
