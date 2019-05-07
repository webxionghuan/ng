import { Component } from '@angular/core';
import { ToastController,IonicPage, NavController, NavParams } from 'ionic-angular';
import {HttpClient} from '@angular/common/http'

import {NotFoundPage} from '../not-found/not-found'
import {LoginPage} from '../login/login'
import {CartPage} from '../cart/cart'

/**
 * Generated class for the DetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage {
  notFount=NotFoundPage
  login=LoginPage
  cart=CartPage

  picList=[]
  title=""
  subtitle=""
  price=0
  id=""
  constructor(
    private toastCtrl:ToastController,
    private myHttp:HttpClient,
    public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailPage');
     this.id=this.navParams.get('lid')  
    
    var url="http://localhost:8080/product/detail?lid="+this.id
    this.myHttp.get(url).subscribe((result:any)=>{
      console.log(result.details);//  result.details.picList/result.details.title/result.details.subtitle/result.details.price  
      this.picList=result.details.picList    //轮播图片
      console.log(this.picList);
      this.title=result.details.title           //标题
      this.subtitle=result.details.subtitle        //详情
      this.price=result.details.price       //价格
    })
  }

  //将商品加入购物车
  addToCart(){
    var url="http://localhost:8080/cart/add?buyCount=1&lid="+this.id
    this.myHttp.get(url,{withCredentials:true}).subscribe((result:any)=>{
      console.log(result);
      if(result.code==300){
        this.navCtrl.push(LoginPage)
      }else if(result.code==200){
        //toast 添加成功
        var  myToast=this.toastCtrl.create({message:'添加成功',duration:1500})
        myToast.present()
      }else{
        //toast 添加失败
        var  mToast=this.toastCtrl.create({message:'添加失败',duration:1500})
        mToast.present()
      }
    })
  }
}
