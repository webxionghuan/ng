import { Component } from '@angular/core';
import { ToastController,IonicPage, NavController, NavParams } from 'ionic-angular';
import {HttpClient} from '@angular/common/http'

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  myName=""
  myPwd=""

  constructor(
    private toastCtrl:ToastController,
    private myHttp:HttpClient,
    public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }


   //用户登录
   doLogin(){
     //获取用户名、密码
     //发给服务器效验
     var url="http://localhost:8080/user/login"
     var body={
       uname:this.myName,
       upwd:this.myPwd
     }
     this.myHttp.post(url,body,{withCredentials:true}).subscribe((result:any)=>{
       if(result.code == 200){
        this.navCtrl.pop()
       }else{
        this.toastCtrl.create({message:"登录失败,用户名或者密码失败",duration:1500}).present()
       }

     })
   } 
}
