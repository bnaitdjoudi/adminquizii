class Authaurization{

  checkAuthaurozation(profiles:string[]){
    const user:any=this.getCurrentUser();
    let contains:boolean = false;
    if(user)
    for(let i:number=0;i<profiles.length;i++){
       console.log(profiles[i]);
       contains= contains || user.roles.includes(profiles[i]);
    }

    return contains;
  }


  getCurrentUser(){
    const user:any = localStorage.getItem('user');
    if(user){
    return JSON.parse(user);
    }
    return undefined;
  }

  authHeader() {
    const stuser:any = localStorage.getItem('user') ;
    const user:any =JSON.parse(stuser);
    if (user && user.accessToken) {
      // for Node.js Express back-end
      return { 'x-access-token': "Bearer " +user.accessToken };
    } else {
      return {};
    }
  }

  resetLocalStoreSession(){
    localStorage.removeItem("user");
  }

} 

export default new Authaurization();

