import { deleteRequest, patchFull, postFull } from '../../models/model';
import * as view from '../../views/dashboard/seasonView';

//

async function controlUpdateSeason(id) {
  const data = view.getData();
  const response = await patchFull(`/media/season/${id}`, data);
  view.renderUpdateSeason(response);
}

//

async function controlEpisode(action = 'soft') {
  const url = action === 'hard' ? `/media/episode/hard` : '/media/episode/soft';
  const data = view.getEpisodeData(action);

  const response = await postFull(url, data);
  view.renderEpisode(response);
}

//

async function controlDeleteEpisode(id) {
  await deleteRequest(`/media/episode/${id}`);
  view.renderDeleteEpisode(id);
}

async function init() {
  view.initialize();

  view.handleUpdateSeason(controlUpdateSeason);
  view.handleEpisode(controlEpisode);
  view.handleDeleteEpisode(controlDeleteEpisode);
}
init();
