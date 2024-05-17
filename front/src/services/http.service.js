import axios from "axios";
import modalService from "./modalDialog.service";

const httpService = axios.create({
  headers: {
    "Content-type": "application/json",
  },
});

httpService.interceptors.request.use(
  (request) => {
    modalService.BloquearPantalla(true);
    const accessToken = sessionStorage.getItem("accessToken");
    if (accessToken) {
      request.headers["Authorization"] = "Bearer " + accessToken;
    }
    return request;
  },
  (error) => {
    console.log("error en axios request", error);
    return Promise.reject(error);
  }
);

httpService.interceptors.response.use(
  (response) => {
    modalService.BloquearPantalla(false);
    return response;
  },
  (error) => {
    // loguear el error
    console.log("error en axios response ", error);
    modalService.BloquearPantalla(false);
    modalService.Alert(error.message);

    return Promise.reject(error);

    //return error
    //throw new Error(error?.response?.data?.Message ?? 'Ocurrio un error');
  }
);

export default httpService;
