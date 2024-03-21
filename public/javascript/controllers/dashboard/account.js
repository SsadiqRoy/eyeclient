import * as view from '../../views/dashboard/accountView';
import { patchFull } from '../../models/model';

async function controlUpdate() {
  const data = view.getUpdate();
  const response = await patchFull('/users', data);
  view.renderUpdate(response);
}

//
async function controlChangePassword() {
  const data = view.getPasswords();
  const response = await patchFull('/users/password', data);
  view.renderChangePassword(response);
}

function init() {
  view.handleUpdate(controlUpdate);
  view.handleChangePassword(controlChangePassword);
}

init();
