import action from "./action";
const initialState = {
    tests: []
  };
  
  function rootReducer(state = initialState, action:action) {
    
    if (action.type === "ADD_TESTS") {
        return Object.assign({}, state, {
          articles: state.tests.concat(action.payload)
        });
      }
    return state;
  };
  
  export default rootReducer;