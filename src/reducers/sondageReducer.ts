import Action from "./action";
const initialState = {
 
  edit: true
};

function sondageReducer(state = initialState, action: Action) {

    if(action.type==="TURN_EDIT"){
       state = {...state,edit:action.payload.edit}
    }

    return state;
}

export default sondageReducer;