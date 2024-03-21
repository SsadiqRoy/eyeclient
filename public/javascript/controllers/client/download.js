import { getSimple } from '../../models/model';
import * as view from '../../views/clients/downloadView';

//

async function controlDownload(id) {
  const response = await getSimple(`/media/link/${id}`);
  view.renderDownload(response);
}

async function init() {
  view.initialize();
  view.handleDownload(controlDownload);
}

init();
