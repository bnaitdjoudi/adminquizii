import axios from "axios";

export default class QuizService {

    getTestByPaging = (page: number, size: number) => {
        return axios.post("http://localhost:8081/tests/search", { pageNumber: page, size: size, sorts:{"id":"DESC"} });
    }

    update = (id: number, values: any) => {
        return axios.put("http://localhost:8081/tests/" + id, values);
    }

    delete = (id: number) => {
        return axios.delete("http://localhost:8081/tests/" + id);
    }

    createquize = (test: any) => {
        return axios.post("http://localhost:8081/tests/", test
        )
    }

}