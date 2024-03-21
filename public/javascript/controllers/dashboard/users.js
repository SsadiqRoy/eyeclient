import * as view from '../../views/dashboard/usersView';
import { deleteRequest, patchFull } from '../../models/model';

async function controlUserStatus(data, endUrl) {
  const response = await patchFull(`/users/${endUrl}`, data);
  view.renderUserStatus(response);
}

async function controlDeleteUser(userid) {
  const response = await deleteRequest(`/users/${userid}`);
  view.renderDeleteUser(response);
}

function init() {
  view.initialize();

  view.handleUserStatus(controlUserStatus);
  view.handleDeleteUser(controlDeleteUser);
}

init();
