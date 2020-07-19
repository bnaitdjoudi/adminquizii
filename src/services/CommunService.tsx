import axios from "axios";
import auth from "./../userstuff/Authaurization";

export default class CommunService {
    url:string="";
    constructor(url:string){
    this.url=url;
    }
    /**
     * get all
     */
    processGetAll(){
        return axios.get(this.url,{ headers: auth.authHeader() });
    }
    
    /**
     * get one
     */

    processGetOne(id:any){
        return axios.get(this.url+"/"+id,{ headers: auth.authHeader() });
    }

    /**
     * save one
     * 
     */
    
     processPostOne(entity:any){
         return axios.post(this.url,entity,{ headers: auth.authHeader() });
     }
     
     /**
      *  delete one
      */
     processDeleteOne(id:any){
         return axios.delete(this.url+"/"+id,{ headers: auth.authHeader() });
     }
     /**
      * update one
      * @param id  of entity
      * @param values values to be update
      */
     processPutOne(id:any,values:any){
         return axios.put(this.url+"/"+id,values,{ headers: auth.authHeader() });
     }



    processSearch(citere:any){
       return  axios.post(this.url+"/search",citere,{ headers: auth.authHeader() });
    }



} 