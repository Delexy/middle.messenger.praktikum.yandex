import ErrorHandler from "../../components/ErrorHandler/ErrorHandler";
import { Router } from "../../Modules/Router/Router";
import { getFormData } from "../../utils/dataPrepare";
import { PAGES } from "../../utils/renderDOM";
import ChangePasswordAPI from "./ChangePasswordAPI";


class ChangePasswordController {
	async changePassword(data: FormData) {
    const { status, response } = await ChangePasswordAPI.changePassword(getFormData(data));
		if(status === 200) {
      setTimeout(() => {
        Router.go(PAGES['profile']);
      });
		} else {
      if(response) {
        if(response.reason)
          new ErrorHandler(response.reason.toString()).show();
      }
		}
  }
}

export default new ChangePasswordController();
