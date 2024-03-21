import { patchFull } from '../../models/model';
import * as view from '../../views/dashboard/collectionView';

//

async function controlUpdateCollection(id) {
  const data = view.getData();

  const response = await patchFull(`/media/hard/${id}`, data);
  view.renderUpdateCollection(response);
}

async function controlCollection(data) {
  const response = await patchFull(`/media/collection`, data);
  view.renderCollection(response);
}

async function init() {
  view.initialize();
  view.handleUpdateCollection(controlUpdateCollection);
  view.handleCollection(controlCollection);
}

init();
