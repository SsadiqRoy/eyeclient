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

export function renderEpisode(response) {
  alertResponse(response.message);

  window.setTimeout(() => window.location.reload(), 3000);
  // window.setTimeout(() => window.location.assign('/executive'), 3000);
}

//
export function renderLink(response) {
  const { message, data: link } = response;
  const ext = link.resolution < 1000 && link.resolution > 10 ? 'p' : '';
  // const redirect = `/executive/season/${link.id}`;

  alertResponse(message);

  const card = document.querySelector(`[data-link-id='${link.id}']`);
  const next = card?.nextElementSibling;
  const prev = card?.previousElementSibling;

  card && container.removeChild(card);
  if (next) next.insertAdjacentHTML('beforebegin', dlinkCard(response.data, undefined, ext));
  else if (prev) prev.insertAdjacentHTML('afterend', dlinkCard(response.data, undefined, ext));
  else container.insertAdjacentHTML('afterbegin', dlinkCard(response.data, undefined, ext));
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
  const imdbSeries = document.getElementById('imdb-series').value;
  const rated = document.getElementById('rated').value;
  const episode = document.getElementById('episode').value;
  const title = document.getElementById('title').value;
  const plot = document.getElementById('plot').value;
  const poster = document.getElementById('poster').value;
  const runtime = document.getElementById('runtime').value;
  const imdbRating = document.getElementById('imdb-rating').value;
  const released = document.getElementById('released').value;

  return { imdbId, imdbSeries, rated, episode, title, plot, poster, runtime, imdbRating, released };
}

//
export function getLinkData() {
  const { id } = parseQuery(window.location.search);

  let name = document.getElementById('resolution').value;
  let resolution = name;
  if (name === 'hdcam') resolution = 10;
  if (name === '720x265') resolution = 800;
  if (name === '1080x265') resolution = 1090;
  if (name === 'other') {
    name = document.getElementById('other-name').value;
    resolution = 10000;
  }

  const link = document.getElementById('link').value;

  return { episode: id, name, resolution, link };
}

/*





*/

// ============================== HANDLERS

export function handleEpisode(controlEpisode) {
  const form = document.getElementById('form-episode');
  const { id } = parseQuery(window.location.search);
  const bntid = 'update-episode';

  form.addEventListener('submit', async (ev) => {
    ev.preventDefault();

    rotateBtn(bntid);

    try {
      await controlEpisode(id);
      stopRotateBtn(bntid);
    } catch (error) {
      displayError(error, bntid);
    }
  });
}

export function handleLink(controlLink) {
  const form = document.getElementById('form-link');

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
  softUpdate('soft-update', 'episode');
  fullOpenPopup({ elementid: 'new-link', popupid: 'link-popup', afterclose: clearLinkPopup, afteropen: afterOpenPopup });

  changeName();
  clickOtherBtn('btn-link-alt', 'btn-link');
  onEditLink();

  window.addEventListener('keydown', (ev) => {
    const { code } = ev;
    if (code !== 'KeyO') return;
    openPopup('link-popup', undefined, undefined, afterOpenPopup);
  });
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
  document.getElementById('resolution').value = '480';
  document.getElementById('link').value = '';
  document.getElementById('other-name').value = '';
  document.getElementById('group-other').classList.add('display-off');
  currentLink = undefined;
}

function editLinkPopup(link) {
  const linkNames = ['480', '720', '1080', '2160', '720x265', '1080x265', 'hdcam', '720x256', '1080x256'];
  const include = linkNames.includes(link.name);

  document.getElementById('resolution').value = include ? link.name : 'other';
  document.getElementById('other-name').value = include ? '' : link.name;
  document.getElementById('link').value = link.link;
  if (!include) document.getElementById('group-other').classList.remove('display-off');
}

function onEditLink() {
  container &&
    container.addEventListener('click', (ev) => {
      if (!ev.target.classList.contains('edit-link')) return;

      const card = ev.target.closest('.link-item');
      currentLink = JSON.parse(card.dataset.link);

      openPopup('link-popup', editLinkPopup, [currentLink]);
    });
}

//
function afterOpenPopup() {
  document.getElementById('resolution').focus();
}
