import * as view from '../../views/dashboard/newView';
import { postFull } from '../../models/model';

async function controlNewUser() {
  const data = view.getUserData();
  // console.log(data);

  const response = await postFull('/users/new', data);

  view.renderNewUser(response);
}

function init() {
  // view.initialize();

  view.handleNewUser(controlNewUser);
}

init();
