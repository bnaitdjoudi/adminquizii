export function addArticle(payload:any) {
  return { type: "ADD_ARTICLE", payload }
};

export function updateExpt(payload:any){
  return {type:"UPDATE_EXPT",payload:payload}
}

export function updateMulti(){
  return {type:"UPDATE_MULTI"}
}

export function updateResponseText(playlod:{text:string,response:string}){
  return {type:"UPDATE_RESPONSE",payload:playlod}
}

export function updateTitleQuestion(playlod:{text:string}){
  return {type:"UPDATE_TITLE_QUESTION",payload:playlod}
}

export function updateDescriptionQuestion(playlod:{text:string}){
  return {type:"UPDATE_DESCRIPTION_QUESTION",payload:playlod}
}

export function updateTimeQuestion(playlod:{time:number}){
  return {type:"UPDATE_TIME_QUESTION",payload:playlod}
}

export function updateScoreQuestion(playlod:{score:number}){
  return {type:"UPDATE_SCORE_QUESTION",payload:playlod}
}

export function updateLevelQuestion(playlod:{level:string}){
  return {type:"UPDATE_LEVEL_QUESTION",payload:playlod}
}

export function updateLangQuestion(playlod:{lang:string}){
  return {type:"UPDATE_LANG_QUESTION",payload:playlod}
}

export function updateTagsQuestion(playlod:{tags:any[]}){
  return {type:"UPDATE_TAGS_QUESTION",payload:playlod}
}

export function performQuestion(paylod:any){
  return {type:"PERFORM_QUESTION",payload:paylod}
}

export function updateLibText(payload:any){
  return {type:"UPDATE_LIB_TEXT",payload:payload}
}

export function updateLibLevel(payload:any){
  return {type:"UPDATE_LIB_LEVEL",payload:payload}
}

export function updateLibLang(payload:any){
  return {type:"UPDATE_LIB_LANG",payload:payload}
}

export function initStore(){
  return {type:"INIT_LIB"}
}

export function updateLibTags(payload:any){
  return {type:"UPDATE_LIB_TAGS",payload:payload}
}

export function initLib(payload:any){
  return {type:"INIT_LIB"}
}

export function addToSelect(payload:any){
  return {type:"ADD_TO_SELECT",payload:payload}
}

export function deleteOnSelect(payload:any){
  return {type:"DELETE_TO_SELECT",payload:payload}
}