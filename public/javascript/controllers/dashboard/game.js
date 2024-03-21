import { deleteRequest, patchFull, postFull } from '../../models/model';
import * as view from '../../views/dashboard/gameView';

async function controlGame(id) {
  const url = id ? `/media/hard/${id}` : '/media/hard';
  const data = view.getData();

  const response = id ? await patchFull(url, data) : await postFull(url, data);
  view.renderGame(response, id);
}

//

async function controlLink(id) {
  const data = view.getLinkData();
  const response = id ? await patchFull(`/media/link/${id}`, data) : await postFull('/media/link', data);
  view.renderLink(response);
}

async function controlDeleteLink(id) {
  await deleteRequest(`/media/link/${id}`);
  view.renderDeleteLink(id);
}

async function init() {
  view.initialize();

  view.handleGame(controlGame);
  view.handleLink(controlLink);
  view.handleDeleteLink(controlDeleteLink);
}
init();
