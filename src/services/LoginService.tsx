import axios from "axios";
import {URL_LOGIN,URL_LOGOUT} from "./../config/Urls"

class LoginService{


    signin(email:string,pwd:string){
        return axios.post(URL_LOGIN,{username:email,password:pwd});   
    }
    signout(){
        return axios.post(URL_LOGOUT);    
    }

}
export default new LoginService();