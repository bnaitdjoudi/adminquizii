import Action from "./action";
const initialState = {
  text: "",
  score: 0,
  level: "interm",
  lang: "gb",
  tags: [],
  selected: [] as any[],
  novalide: true
};

function librairieReducer(state = initialState, action: Action) {

  if (action.type === "UPDATE_LIB_TEXT") {
    state = { ...state,selected:[], text: action.payload.text }
  }

  if ("UPDATE_LIB_LEVEL" === action.type) {
    state = { ...state,selected:[], level: action.payload.level }
  }

  if("UPDATE_LIB_LANG" === action.type){
    state = { ...state,selected:[], lang: action.payload.lang }
  }

  if ("UPDATE_LIB_TAGS" === action.type) {
    state = { ...state, selected:[], tags: action.payload.tags }
  }

  if ("INIT_LIB" === action.type) {
    state = {
      text: "",
      score: 0,
      level: "interm",
      lang: "gb",
      tags: [],
      selected: [],
      novalide: true

    };
  }

  if ("ADD_TO_SELECT" === action.type) {

    var selected: any[] = state.selected;
    selected.push(action.payload.el);
    state = { ...state, selected: selected, novalide: (selected.length === 0) }
  }

  if ("DELETE_TO_SELECT" === action.type) {
    state = {
      ...state, selected: state.selected.filter((value: any, index: number) => {
        return value !== action.payload.el
      })
    }

    selected = state.selected;

    state = { ...state, novalide: (selected.length === 0) }
    
  }

  console.log(state);
  return state;
};




export default librairieReducer;