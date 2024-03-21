import { pageLoad, search, softUpdate } from '../../utils/independent';
import { alertResponse, displayError, dmediaCard, expandSearchBar, parseQuery, rotateBtn, stopRotateBtn } from '../../utils/utils';

// ============================= CONSTANT VARIABLES
const searchContainer = document.getElementById('search-cards-container');
const includedContainer = document.getElementById('included-cards-container');

/*





*/

// ============================== RENDERES

export function renderUpdateCollection(response) {
  alertResponse(response.message);

  window.setTimeout(() => window.location.reload(), 3000);
}

//

export function renderCollection(response) {
  const { message, data: media, action } = response;
  alertResponse(message);

  if (action === 'add') {
    const card = searchContainer.querySelector(`[data-media-id='${media.id}']`);
    searchContainer.removeChild(card);
    includedContainer.insertAdjacentHTML('afterbegin', dmediaCard(media, 'negative'));
  }
  if (action === 'remove') {
    const card = includedContainer.querySelector(`[data-media-id='${media.id}']`);
    includedContainer.removeChild(card);
    searchContainer.insertAdjacentHTML('afterbegin', dmediaCard(media, 'negative'));
  }
}

/*





*/

// ============================== GETTERS
export function getData() {
  const imdbId = document.getElementById('imdb-id').value;
  const type = document.getElementById('type').value;
  const title = document.getElementById('title').value;
  const year = document.getElementById('year').value;
  const rated = document.getElementById('rated').value;
  const released = document.getElementById('released').value;
  const genre = document.getElementById('genre').value;
  const directors = document.getElementById('directors').value;
  const writers = document.getElementById('writers').value;
  const actors = document.getElementById('actors').value;
  const plot = document.getElementById('plot').value;
  const poster = document.getElementById('poster').value;
  const language = document.getElementById('language').value;
  const country = document.getElementById('country').value;
  const runtime = document.getElementById('runtime').value;
  const imdbRating = document.getElementById('imdb-rating').value;
  const keywords = document.getElementById('keywords').value;
  const collectionType = document.getElementById('collection-type').value;

  return {
    imdbId,
    type,
    title,
    year,
    rated,
    released,
    genre,
    directors,
    writers,
    actors,
    plot,
    poster,
    language,
    country,
    runtime,
    imdbRating,
    keywords,
    collectionType,
  };
}

/*





*/

// ============================== HANDLERS
export function handleUpdateCollection(controlUpdateCollection) {
  const form = document.getElementById('form-collection');
  const { id } = parseQuery(window.location.search);
  const bntid = 'update-collection';

  form.addEventListener('submit', async (ev) => {
    ev.preventDefault();

    rotateBtn(bntid);

    try {
      await controlUpdateCollection(id);
      stopRotateBtn(bntid);
    } catch (error) {
      displayError(error, bntid);
    }
  });
}

export function handleCollection(controlCollection) {
  document.querySelector('body').addEventListener('click', async (ev) => {
    if (!ev.target.classList.contains('add-to-collection') && !ev.target.classList.contains('remove-from-collection')) return;

    const card = ev.target.closest('.dmedia-card');
    const { mediaId: id, action } = card.dataset;
    const { id: collection } = parseQuery(window.location.search);

    try {
      controlCollection({ action, collection, id });
    } catch (error) {
      displayError(error);
    }
  });
}
/*





*/

// ============================== INITIALIZER

export function initialize() {
  collectionSliders();
  expandSearchBar('form-search');
  softUpdate('soft-update');
  search({
    containerid: 'search-cards-container',
    url: '/media?type[ne]=collection&=fields=title,type,imdbRating,released,poster,id&order=-createdAt',
    card: 'dmediaCard',
    formid: 'form-search',
    args: ['positive'],
  });
  pageLoad({ containerid: 'search-cards-container', url: '/media', card: 'dmediaCard', args: ['positive'] });
}

/*





*/

// ============================== NON-EXPORTING
function collectionSliders() {
  const left = document.getElementById('view-media');
  const right = document.getElementById('add-media');

  const leftBack = document.getElementById('left-back');
  const rightBack = document.getElementById('right-back');
  // const search = document.getElementById('search-input');

  const sections = Array.from(document.querySelectorAll('.main__section'));

  left.addEventListener('click', () => {
    // console.log('been hit');
    sections.forEach((sec) => (sec.style.transform = 'translateX(0)'));
  });
  right.addEventListener('click', () => {
    sections.forEach((sec) => (sec.style.transform = 'translateX(-200%)'));
  });
  rightBack.addEventListener('click', () => {
    sections.forEach((sec) => (sec.style.transform = 'translateX(-100%)'));
  });
  leftBack.addEventListener('click', () => {
    sections.forEach((sec) => (sec.style.transform = 'translateX(-100%)'));
  });
}
