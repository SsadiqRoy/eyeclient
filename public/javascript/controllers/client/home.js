import * as view from '../../views/clients/homeView';
import { getSimple } from '../../models/model';

//

async function controlInitialLoad(slider) {
  const response = await getSimple(`/media${slider.query}`);
  view.renderSlider(response, slider);
}

//

async function init() {
  view.initialize();

  view.handleInitialLoad(controlInitialLoad);
}

init();
