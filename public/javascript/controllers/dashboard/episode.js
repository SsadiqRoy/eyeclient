import { deleteRequest, patchFull, postFull } from '../../models/model';
import * as view from '../../views/dashboard/episodeView';

async function controlEpisode(id) {
  const url = `/media/episode/hard/${id}`;
  const data = view.getData();

  const response = await patchFull(url, data);
  view.renderEpisode(response, id);
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

  view.handleEpisode(controlEpisode);
  view.handleLink(controlLink);
  view.handleDeleteLink(controlDeleteLink);
}
init();
