// ============================= CONSTANT VARIABLES

import { displayError, rotateBtn, stopRotateBtn } from '../../utils/utils';

/*





*/

// ============================== RENDERES

export function renderDownload(response) {
  if (response.link) window.location.assign(response.link);
  stopRotateBtn('download');
}

/*





*/

// ============================== GETTERS

/*





*/

// ============================== HANDLERS
export function handleDownload(controlDownload) {
  const bntid = 'download';
  const button = document.getElementById(bntid);

  button.addEventListener('click', async () => {
    rotateBtn(bntid);

    const { linkId: id } = button.dataset;

    try {
      await controlDownload(id);
      stopRotateBtn(bntid);
    } catch (error) {
      displayError(error, bntid);
    }
  });
}

/*





*/

// ============================== INITIALIZER
export function initialize() {
  count();
}

/*





*/

// ============================== NON-EXPORTING
function count() {
  const counter = document.getElementById('counter');
  let countValue = 6;

  const interval = window.setInterval(() => {
    counter.textContent = countValue;
    countValue--;
  }, 1000);

  window.setTimeout(() => {
    window.clearInterval(interval);
    document.getElementById('download').removeAttribute('disabled');
  }, 11000);
}
