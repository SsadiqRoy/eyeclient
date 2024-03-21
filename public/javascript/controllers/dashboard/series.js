import { deleteRequest, patchFull, postFull } from '../../models/model';
import * as view from '../../views/dashboard/seriesView';

async function controlSeries(id) {
  const url = id ? `/media/hard/${id}` : '/media/hard';
  const data = view.getData();

  const response = id ? await patchFull(url, data) : await postFull(url, data);
  view.renderSeries(response, id);
}

//

async function controlSeason() {
  const data = view.getSeasonData();
  const response = await postFull('/media/Season', data);
  view.renderSeason(response);
}

async function controlDeleteSeason(id) {
  await deleteRequest(`/media/season/${id}`);
  view.renderDeleteSeason(id);
}

async function init() {
  view.initialize();

  view.handleSeries(controlSeries);
  view.handleSeason(controlSeason);
  view.handleDeleteSeason(controlDeleteSeason);
}
init();
