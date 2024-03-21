import * as view from '../../views/dashboard/loginView';
import { postSimple } from '../../models/model';

async function controlLogin() {
  const data = view.getLogins();

  const response = await postSimple('/users/login', data);

  view.renderLogin(response);
}

function init() {
  // view.initializer();

  view.handleLogin(controlLogin);
}

init();
