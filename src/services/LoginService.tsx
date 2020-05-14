import axios from "axios";
import {URL_LOGIN} from "./../config/Urls"
class LoginService{


    signin(email:string,pwd:string){
        return axios.post(URL_LOGIN,{username:email,password:pwd});
    }
}
export default new LoginService();