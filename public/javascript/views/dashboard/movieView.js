import { softUpdate } from '../../utils/independent';
import {
  alertResponse,
  clickOtherBtn,
  closePopup,
  displayError,
  dlinkCard,
  fullOpenPopup,
  openPopup,
  parseQuery,
  rotateBtn,
  stopRotateBtn,
} from '../../utils/utils';
// ============================= CONSTANT VARIABLES
const container = document.getElementById('cards-container');
let currentLink;

/*





*/

// ============================== RENDERES

export function renderMovie(response, id) {
  alertResponse(response.message);

  if (id) return window.setTimeout(() => window.location.reload(), 3000);
  window.setTimeout(() => window.location.assign('/executive'), 3000);
}

//
export function renderLink(response) {
  const { message, data: link } = response;
  // const ext = link.resolution < 1000 && link.resolution > 10 ? 'p' : '';
  // const redirect = `/executive/season/${link.id}`;

  alertResponse(message);

  const card = document.querySelector(`[data-link-id='${link.id}']`);
  const next = card?.nextElementSibling;
  const prev = card?.previousElementSibling;

  card && container.removeChild(card);
  if (next) next.insertAdjacentHTML('beforebegin', dlinkCard(response.data));
  else if (prev) prev.insertAdjacentHTML('afterend', dlinkCard(response.data));
  else container.insertAdjacentHTML('afterbegin', dlinkCard(response.data));
}

export function renderDeleteLink(id) {
  const card = document.querySelector(`[data-link-id='${id}']`);
  container.removeChild(card);
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
  const keywords = document.getElementById('keywords').value?.trim();

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
  };
}

//
export function getLinkData() {
  const { id } = parseQuery(window.location.search);

  const link = document.getElementById('link').value;
  let res = document.getElementById('resolution').value?.split(',');
  let [name, resolution] = res;

  resolution = +resolution;

  if (name === 'other') {
    name = document.getElementById('other-name').value;
    resolution = 10000;
  }

  return { media: id, name, resolution, link };
}

/*





*/

// ============================== HANDLERS

export function handleMovie(controlMovie) {
  const form = document.getElementById('form-movie');
  const { id } = parseQuery(window.location.search);
  const bntid = id ? 'update-movie' : 'add-movie';

  form.addEventListener('submit', async (ev) => {
    ev.preventDefault();

    rotateBtn(bntid);

    try {
      await controlMovie(id);
      stopRotateBtn(bntid);
    } catch (error) {
      displayError(error, bntid);
    }
  });
}

export function handleLink(controlLink) {
  const form = document.getElementById('form-link');

  form &&
    form.addEventListener('submit', async (ev) => {
      ev.preventDefault();

      const btnid = 'btn-link-alt';
      rotateBtn(btnid);

      try {
        const id = currentLink?.id;
        await controlLink(id);
        stopRotateBtn(btnid);
        closePopup('link-popup', clearLinkPopup);
      } catch (error) {
        displayError(error, btnid);
      }
    });
}

export function handleDeleteLink(controlDeleteLink) {
  container &&
    container.addEventListener('click', async (ev) => {
      if (!ev.target.classList.contains('delete-link')) return;

      const link = JSON.parse(ev.target.closest('.link-item').dataset.link);

      const confirm = window.confirm(`Are you sure you want to delete \n${link.name}`);
      if (!confirm) return;

      try {
        await controlDeleteLink(link.id);
      } catch (error) {
        displayError(error);
      }
    });
}

/*





*/

// ============================== INITIALIZER

export function initialize() {
  softUpdate('soft-update');
  fullOpenPopup({ elementid: 'new-link', popupid: 'link-popup', afterclose: clearLinkPopup, afteropen: afterOpenPopup });

  changeName();
  clickOtherBtn('btn-link-alt', 'btn-link');
  onEditLink();
}

/*





*/

// ============================== NON-EXPORTING

function changeName() {
  const { id } = parseQuery(window.location.search);
  if (!id) return;
  const resolution = document.getElementById('resolution');
  const otherName = document.getElementById('group-other');
  resolution.addEventListener('change', () => {
    const { value } = resolution;
    if (value === 'other') return otherName.classList.remove('display-off');
    otherName.classList.add('display-off');
  });
}

//
function clearLinkPopup() {
  document.getElementById('resolution').value = '480p,480';
  document.getElementById('link').value = '';
  document.getElementById('other-name').value = '';
  document.getElementById('group-other').classList.add('display-off');
  currentLink = undefined;
}

function editLinkPopup(link) {
  const { name, other } = getLinkName(link.name);

  document.getElementById('resolution').value = other ? 'other' : name;
  document.getElementById('other-name').value = other ? name : '';
  document.getElementById('link').value = link.link;
  if (other) document.getElementById('group-other').classList.remove('display-off');
}

function onEditLink() {
  container &&
    container.addEventListener('click', (ev) => {
      if (!ev.target.classList.contains('edit-link')) return;

      const card = ev.target.closest('.link-item');
      currentLink = JSON.parse(card.dataset.link);

      editLinkPopup(currentLink);
      openPopup('link-popup');
    });
}

//
function afterOpenPopup() {
  document.getElementById('resolution').focus();
}

function getLinkName(name) {
  const names = {
    480: '480p,480',
    720: '720p,720',
    1080: '1080p,1080',
    2160: '2160p,2160',
    '720x265': '720p.x265,740',
    '1080x265': '1080p.x265,1100',
    '720x256': '720p.x265,740',
    '1080x256': '1080p.x265,1100',

    '480p': '480p,480',
    '720p': '720p,720',
    '1080p': '1080p,1080',
    '2160p': '2160p,2160',
    '720p.x265': '720p.x265,740',
    '1080p.x265': '1080p.x265,1100',
    hdcam: 'hdcam,10',
    '480p Alt': '480p Alt,490',
    '720p Alt': '720p Alt,730',
    '1080p Alt': '1080p Alt,1090',
    '2160p Alt': '2160p Alt,2170',
    '720p.x265 Alt': '720p.x265 Alt,750',
    '1080p.x265 Alt': '1080p.x265 Alt,1110',
    '480p Alt 2': '480p Alt 2,495',
    '720p Alt 2': '720p Alt 2,735',
    '1080p Alt 2': '1080p Alt 2,1095',
    '2160p Alt 2': '2160p Alt 2,2175',
    '720p.x265 Alt 2': '720p.x265 Alt 2,755',
    '1080p.x265 Alt 2': '1080p.x265 Alt 2,1115',
  };
  const maped = names[name];

  return { name: maped || name, other: !maped };
}
