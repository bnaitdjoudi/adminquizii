"use strict";
exports.__esModule = true;
var axios_1 = require("axios");
var Authaurization_1 = require("./../userstuff/Authaurization");
var Urls_1 = require("./../config/Urls");
var QuizService = /** @class */ (function () {
    function QuizService() {
        this.getTestByPaging = function (page, size) {
            return axios_1["default"].post(Urls_1.URL_TEST + "/tests/search", { pageNumber: page, size: size, sorts: { "id": "DESC" } });
        };
        this.update = function (id, values) {
            return axios_1["default"].put(Urls_1.URL_TEST + "/tests/" + id, values);
        };
        this["delete"] = function (id) {
            return axios_1["default"]["delete"](Urls_1.URL_TEST + "/tests/" + id, { headers: Authaurization_1["default"].authHeader() });
        };
        this.createquize = function (test) {
            return axios_1["default"].post(Urls_1.URL_TEST + "/tests/", test, { headers: Authaurization_1["default"].authHeader() });
        };
        this.cloneQuestionsToQuiz = function (value) {
            return axios_1["default"].post(Urls_1.URL_TEST + "/colonequestion", value, { headers: Authaurization_1["default"].authHeader() });
        };
        this.deleteQuestions = function (value) {
            return axios_1["default"].post(Urls_1.URL_TEST + "/deleteteQuestions", value, { headers: Authaurization_1["default"].authHeader() });
        };
        this.linkTest = function (testId) {
            return axios_1["default"].get(Urls_1.URL_TEST + "/link/" + testId, { headers: Authaurization_1["default"].authHeader() });
        };
        this.getCondidatsTestInfo = function (testId) {
            return axios_1["default"].get(Urls_1.URL_TEST + "/condidats/" + testId, { headers: Authaurization_1["default"].authHeader() });
        };
        this.createSondageQuestionaire = function (testId, question) {
            return axios_1["default"].post(Urls_1.URL_TEST + "/sondage/" + testId, question, { headers: Authaurization_1["default"].authHeader() });
        };
        this.updateSondageQuestionaire = function (qid, question) {
            return axios_1["default"].post(Urls_1.URL_QUESTION + "/sondage/" + qid, question, { headers: Authaurization_1["default"].authHeader() });
        };
        this.getTestSondageResultByTestId = function (testId) {
            return axios_1["default"].get(Urls_1.URL_TEST + "/sondage/result/" + testId, { headers: Authaurization_1["default"].authHeader() });
        };
        this.getTestType = function (testId) {
            return axios_1["default"].get(Urls_1.URL_TEST + "/type/" + testId, { headers: Authaurization_1["default"].authHeader() });
        };
    }
    return QuizService;
}());
exports["default"] = QuizService;
