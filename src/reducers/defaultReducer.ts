import action from "./action";
const initialState = {
  mode:"create",
  resps: [false, false, false, false, false, false],
  reponsesText: { "A": "", "B": "", "C": "", "D": "", "E": "", "F": "" },
  multi: false,
  accc: "walou",
  titleQuestion: "",
  descriptionQuestion: "",
  time: 0,
  score: 0,
  level: "interm",
  lang: "en",
  tags: []
};

function defaultReducer(state = initialState, action: action) {
  let resps: any[] = [false, false, false, false, false, false];
  switch (action.type) {
    case "UPDATE_EXPT": {
      if (!state.multi && !state.resps[action.payload.index - 1]) {

        resps.forEach((el: any, index: number, array: any[]) => {
          if (index != (action.payload.index - 1)) {
            resps[index] = false;
          } else {
            resps[index] = true;
          }
        })

        state = {
          
          mode:state.mode,
          resps: resps,
          accc: "calou",
          multi: state.multi,
          reponsesText: state.reponsesText,
          titleQuestion: state.titleQuestion,
          descriptionQuestion: state.descriptionQuestion,
          time: state.time,
          score: state.score,
          level: state.level,
          lang: state.lang,
          tags: state.tags

        };
      } else {

        resps = [...state.resps];
        resps[action.payload.index - 1] = !state.resps[action.payload.index - 1];

        state = {
          mode:state.mode,

          resps: resps,
          accc: "calou",
          multi: state.multi,
          reponsesText: state.reponsesText,
          titleQuestion: state.titleQuestion,
          descriptionQuestion: state.descriptionQuestion,
          time: state.time,
          score: state.score,
          level: state.level,
          lang: state.lang,
          tags: state.tags

        };
      }
      break;
    }
    case "UPDATE_MULTI": {
      state = {

        mode:state.mode,
        resps: [false, false, false, false, false, false],
        accc: "calou",
        multi: !state.multi,
        reponsesText: state.reponsesText,
        titleQuestion: state.titleQuestion,
        descriptionQuestion: state.descriptionQuestion,
        time: state.time,
        score: state.score,
        level: state.level,
        lang: state.lang,
        tags: state.tags

      };
      break;
    }

    case "UPDATE_RESPONSE": {
      let reponsesText: { "A": string; "B": string; "C": string; "D": string; "E": string; "F": string; } = { ...state.reponsesText };
      console.log("go:" + state);

      reponsesText = updateResponse(action.payload.response, action.payload.text, reponsesText);
      console.log("go:" + reponsesText);
      state = {
        mode:state.mode,
        resps: state.resps,
        accc: "calou",
        multi: state.multi,
        reponsesText: reponsesText,
        titleQuestion: state.titleQuestion,
        descriptionQuestion: state.descriptionQuestion,
        time: state.time,
        score: state.score,
        level: state.level,
        lang: state.lang,
        tags: state.tags

      };
      break;
    }

    case "UPDATE_TITLE_QUESTION": {

      state = { ...state, titleQuestion: action.payload.text }
      break;
    }

    case "UPDATE_DESCRIPTION_QUESTION": {
      state = { ...state, descriptionQuestion: action.payload.text }
      break;
    }

    case "UPDATE_TIME_QUESTION": {
      state = { ...state, time: action.payload.time }
      break;
    }

    case "UPDATE_SCORE_QUESTION": {
      state = { ...state, score: action.payload.score }
      break;
    }

    case "UPDATE_LEVEL_QUESTION": {
      state = { ...state, level: action.payload.level }
      break;
    }

    case "UPDATE_LANG_QUESTION": {
      state = { ...state, lang: action.payload.lang }
      break;
    }

    case "UPDATE_TAGS_QUESTION": {
      state = { ...state, tags: action.payload.tags }
      break;
    }

    case "PERFORM_QUESTION": {
      state = 
      {
        mode:"update",
        resps: action.payload.resps,
        reponsesText: action.payload.reponsesText,
        multi: action.payload.multi,
        accc: "walou",
        titleQuestion: action.payload.title,
        descriptionQuestion: action.payload.description,
        time: action.payload.time,
        score: action.payload.score,
        level: action.payload.level,
        lang: action.payload.lang,
        tags: action.payload.tags,
      };
      break;
    }

    case "INIT_STORE" :{
      state={
        mode:"create",
        resps: [false, false, false, false, false, false],
        reponsesText: { "A": "", "B": "", "C": "", "D": "", "E": "", "F": "" },
        multi: false,
        accc: "walou",
        titleQuestion: "",
        descriptionQuestion: "",
        time: 0,
        score: 0,
        level: "interm",
        lang: "en",
        tags: []
      };
    }
  }

  console.log(state);
  return state;
};


const updateResponse = (response: string, text: string, reponsesText: { "A": string; "B": string; "C": string; "D": string; "E": string; "F": string; }) => {
  switch (response) {
    case "A": {
      reponsesText["A"] = text;
      break;
    }
    case "B": {
      reponsesText["B"] = text;
      break;
    }
    case "C": {
      reponsesText["C"] = text;
      break;
    }
    case "D": {
      reponsesText["D"] = text;
      break;
    }
    case "E": {
      reponsesText["E"] = text;
      break;
    }
    case "F": {
      reponsesText["F"] = text;
      break;
    }
  }
  return reponsesText;
}

export default defaultReducer;