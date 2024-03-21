import { patchFull } from '../../models/model';
import * as view from '../../views/dashboard/aboutView';

//

async function controlAbout(id) {
  const data = view.getData();
  const response = await patchFull(`/media/about/${id}`, data);
  view.renderAbout(response);
}
//

async function init() {
  view.initialize();

  view.handleAbout(controlAbout);
}

init();
