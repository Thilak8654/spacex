import { API_APPLICATION } from "../constants/ApiBaseUrl";
import { AjaxService } from "../utilities/AjaxService";

export const getData = (request) => {
  return AjaxService.get(`${API_APPLICATION}/launches?limit=100${request}`).then(
    (response) => {
      return response.data;
    },
    (error) => {
        return error;
    }
  );
};