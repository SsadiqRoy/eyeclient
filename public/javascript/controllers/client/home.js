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

  // window.setTimeout(() => view.handleInitialLoad(controlInitialLoad), 3000);
  view.handleInitialLoad(controlInitialLoad);
}

init();
