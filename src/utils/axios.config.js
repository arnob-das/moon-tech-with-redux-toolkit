import axios from "axios";
let URL;

switch (process.env.REACT_APP_ENVIRONMENT) {
    case "DEVELOPMENT":
        URL = process.env.API_URL;
        break;
    case "PRODUCTION":
        URL = "https://productionserver.com"
        break;
    default:
        URL = process.env.API_URL;
}

const instance = axios.create({
    baseURL: URL
});

export default instance;