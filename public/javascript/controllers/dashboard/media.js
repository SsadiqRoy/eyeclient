import * as view from '../../views/dashboard/mediaView';
import { deleteRequest, postFull } from '../../models/model';

async function controlDeleteMedia(mediaid) {
  const response = await deleteRequest(`/media/single/${mediaid}`);
  view.renderDeleteMedia(response);
}

async function controlSoftAdd(data) {
  const response = await postFull('/media/soft', data);
  view.renderSoftAdd(response);
}

function init() {
  view.initialize();
  view.handleDeleteMedia(controlDeleteMedia);
  view.handleSoftAdd(controlSoftAdd);
}

init();
