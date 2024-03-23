import { filter, initialLoad, pageLoad, search } from '../../utils/independent';
import {
  alertResponse,
  clickOtherBtn,
  closePopup,
  controlSidebar,
  displayError,
  dmediaCard,
  expandSearchBar,
  fullOpenPopup,
  rotateBtn,
  stopRotateBtn,
} from '../../utils/utils';

// ============================= CONSTANT VARIABLES
const container = document.getElementById('cards-container');

/*





*/

// ============================== RENDERES

export function renderDeleteMedia(response) {
  const { data, message } = response;
  alertResponse(message);

  const card = document.querySelector(`[data-media-id='${data.id}']`);
  container.removeChild(card);
}

//
export function renderSoftAdd(response) {
  const { data, message } = response;

  alertResponse(message);
  container.insertAdjacentHTML('afterbegin', dmediaCard(data));
}

/*





*/

// ============================== GETTERS

/*





*/

// ============================== HANDLERS

export function handleDeleteMedia(controlDeleteMedia) {
  container.addEventListener('click', async (ev) => {
    if (!ev.target.classList.contains('delete-media')) return;

    const card = ev.target.closest('.dmedia-card');
    const title = card.querySelector('h4').textContent.trim();

    const confirm = window.confirm(`Are you sure you want to DELETE \n${title}`);
    if (!confirm) return;

    // const access = window.prompt('Please enter access code');
    const id = card.dataset.mediaId;

    try {
      await controlDeleteMedia(id);
    } catch (error) {
      displayError(error);
    }
  });
}

//

export function handleSoftAdd(controlSoftAdd) {
  const form = document.getElementById('form-soft-add');
  const btnid = 'btn-soft-add-alt';

  form.addEventListener('submit', async (ev) => {
    ev.preventDefault();
    rotateBtn(btnid);
    const imdbId = document.getElementById('imdb-id').value;

    try {
      await controlSoftAdd({ imdbId });
      stopRotateBtn(btnid);
      closePopup('soft-add-popup', () => (document.getElementById('imdb-id').value = ''));
    } catch (error) {
      displayError(error, btnid);
    }
  });
}

/*





*/

// ============================== INITIALIZER

export function initialize() {
  expandSearchBar('form-search');
  controlSidebar();
  fullOpenPopup('open-soft-add-popup', 'soft-add-popup', undefined, undefined, undefined, undefined, afterOpenPopup);
  clickOtherBtn('btn-soft-add-alt', 'btn-soft-add');

  window.addEventListener('DOMContentLoaded', () => {
    initialLoad({
      containerid: 'cards-container',
      url: '/media?fields=title,type,imdbRating,released,poster,id,imdbId&order=-createdAt',
      card: 'dmediaCard',
    });
    pageLoad({ containerid: 'cards-container', url: '/media', card: 'dmediaCard' });
    search({ containerid: 'cards-container', url: '/media', card: 'dmediaCard', formid: 'form-search' });
    filter({ containerid: 'cards-container', url: '/media', card: 'dmediaCard', selectid: 'filter' });
  });
}

/*





*/

// ============================== NON-EXPORTING
function afterOpenPopup() {
  document.getElementById('imdb-id').focus();
}
