import axios from "axios";
import auth from "./../userstuff/Authaurization";
import {URL_TEST,URL_QUESTION} from "./../config/Urls";
export default class QuizService {

    getTestByPaging = (page: number, size: number) => {
        return axios.post(URL_TEST+"/tests/search", { pageNumber: page, size: size, sorts:{"id":"DESC"} });
    }

    update = (id: number, values: any) => {
        return axios.put(URL_TEST+"/tests/" + id, values);
    }

    delete = (id: number) => {
        return axios.delete(URL_TEST+"/tests/" + id,{ headers: auth.authHeader() });
    }

    createquize = (test: any) => {
        return axios.post(URL_TEST+"/tests/", test,{ headers: auth.authHeader() }
        )
    }

    cloneQuestionsToQuiz = (value:{ids:number[],testId:number}) => {
        return axios.post(URL_TEST+"/colonequestion", value, { headers: auth.authHeader() }
        )
    }

    deleteQuestions = (value:any[])  =>{
        return axios.post(URL_TEST+"/deleteteQuestions", value, { headers: auth.authHeader() });
    }

    linkTest = (testId:number)  =>{
        return axios.get(URL_TEST+"/link/"+testId, { headers: auth.authHeader() });
    }

    getCondidatsTestInfo = (testId:number)  =>{
        return axios.get(URL_TEST+"/condidats/"+testId, { headers: auth.authHeader() });
    }

    createSondageQuestionaire = (testId:number,question:object)  =>{
        return axios.post(URL_TEST+"/sondage/"+testId, question,{ headers: auth.authHeader() });
    }

    updateSondageQuestionaire = (qid:any,question:object) =>{
        return axios.post(URL_QUESTION+"/sondage/"+qid, question,{ headers: auth.authHeader() });
    }

    getTestSondageResultByTestId = (testId:any) => {
        return axios.get(URL_TEST+"/sondage/result/"+testId, { headers: auth.authHeader() });
    }

    getTestType = (testId:any) => {
        return axios.get(URL_TEST+"/type/"+testId, { headers: auth.authHeader() });
    }


    listTestEvalResult = (query:object) =>{
        return axios.post(URL_TEST+"/evaltestresult", query,{ headers: auth.authHeader() });
    }

}