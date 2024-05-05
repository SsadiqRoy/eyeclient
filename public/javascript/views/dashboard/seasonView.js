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
let currentEpisode;

/*





*/

// ============================== RENDERES

export function renderUpdateSeason(response) {
  alertResponse(response.message);

  window.setTimeout(() => window.location.reload(), 3000);
}

//
export function renderEpisode(response) {
  const { message, data: episode } = response;
  const redirect = `/executive/episode?id=${episode.id}&season=${document.querySelector('body').dataset.season}`;

  alertResponse(message);

  const card = document.querySelector(`[data-link-id='${episode.id}']`);
  const next = card?.nextElementSibling;
  const prev = card?.previousElementSibling;

  card && container.removeChild(card);
  if (next) next.insertAdjacentHTML('beforebegin', dlinkCard(episode, 'Episode ', undefined, redirect));
  else if (prev) prev.insertAdjacentHTML('afterend', dlinkCard(episode, 'Episode ', undefined, redirect));
  else container.insertAdjacentHTML('afterbegin', dlinkCard(episode, 'Episode ', undefined, redirect));

  document.querySelector('body').dataset.next = +episode.episode + 1;
  document.getElementById('episode').value = +episode.episode + 1;
}

export function renderDeleteEpisode(id) {
  const card = document.querySelector(`[data-link-id='${id}']`);
  container.removeChild(card);
}

/*





*/

// ============================== GETTERS

export function getData() {
  const season = document.getElementById('season').value;
  const released = document.getElementById('released').value;
  const poster = document.getElementById('poster').value;

  return { season, released, poster };
}

//
export function getEpisodeData(action) {
  const { id: season, series } = parseQuery(window.location.search);
  let imdbId = document.getElementById('imdb-id').value;
  if (action === 'soft') return { season, series, imdbId };

  imdbId = document.getElementById('imdb-id-hard').value;
  const episode = document.getElementById('episode').value;
  const title = document.getElementById('title').value;
  const plot = document.getElementById('plot').value;
  const released = document.getElementById('episode-released').value;
  // const imdbSeries = document.getElementById('imdb-series').value;
  // const rated = document.getElementById('rated').value;
  // const poster = document.getElementById('episode-poster').value;
  // const runtime = document.getElementById('runtime').value;
  // const imdbRating = document.getElementById('imdb-rating').value;

  // console.log({ released, poster });
  // return { season, series, imdbId, imdbSeries, rated, episode, title, plot, poster, runtime, imdbRating, released };

  return { season, series, imdbId, episode, title, plot, released };
}

/*





*/

// ============================== HANDLERS

export function handleUpdateSeason(controlUpdateSeason) {
  const { id: season } = parseQuery(window.location.search);

  const form = document.getElementById('form-season');
  const btnid = 'btn-update';

  form.addEventListener('submit', async (ev) => {
    ev.preventDefault();
    rotateBtn(btnid);

    try {
      await controlUpdateSeason(season);
      stopRotateBtn(btnid);
    } catch (error) {
      displayError(error, btnid);
    }
  });
}

export function handleEpisode(controlEpisode) {
  const soft = document.getElementById('form-soft-add');
  const hard = document.getElementById('form-hard-add');

  hard.addEventListener('submit', formHandler);
  soft.addEventListener('submit', formHandler);

  async function formHandler(ev) {
    ev.preventDefault();

    const idstring = ev.target.querySelector('button').getAttribute('id');
    const btnid = idstring + '-alt';
    const popupid = idstring.slice(4) + '-popup';
    const action = idstring.split('-')[1];

    rotateBtn(btnid);

    try {
      await controlEpisode(action);
      stopRotateBtn(btnid);
      closePopup(popupid, clearEpisodePopup, [action]);
    } catch (error) {
      displayError(error, btnid);
    }
  }
}

export function handleDeleteEpisode(controlDeleteEpisode) {
  container &&
    container.addEventListener('click', async (ev) => {
      if (!ev.target.classList.contains('delete-link')) return;

      const episode = JSON.parse(ev.target.closest('.link-item').dataset.link);

      const confirm = window.confirm(`Are you sure you want to delete \nEpisode ${episode.episode}`);
      if (!confirm) return;

      try {
        await controlDeleteEpisode(episode.id);
      } catch (error) {
        displayError(error);
      }
    });
}

/*





*/

// ============================== INITIALIZER

export function initialize() {
  fullOpenPopup({ elementid: 'soft-add', popupid: 'soft-add-popup', afterclose: clearEpisodePopup, aargs: ['soft'], afteropen: afterOpenPopup });
  fullOpenPopup({
    elementid: 'hard-add',
    popupid: 'hard-add-popup',
    afterclose: clearEpisodePopup,
    aargs: ['hard'],
    afteropen: afterOpenPopupHard,
    openkey: 'Comma',
  });

  clickOtherBtn('btn-soft-add-alt', 'btn-soft-add');
  clickOtherBtn('btn-hard-add-alt', 'btn-hard-add');
}

/*





*/

// ============================== NON-EXPORTING

//
function clearEpisodePopup(action = 'soft') {
  document.getElementById('imdb-id').value = '';
  if (action === 'soft') return;

  // document.getElementById('episode-poster').value = '';
  document.getElementById('episode-released').value = '';

  document.getElementById('imdb-id-hard').value = '';
  // document.getElementById('imdb-series').value = '';
  // document.getElementById('rated').value = '';
  document.getElementById('episode').value = document.querySelector('body').dataset.next;
  document.getElementById('title').value = '';
  document.getElementById('plot').value = '';
  // document.getElementById('runtime').value = '';
  // document.getElementById('imdb-rating').value = '';
}

//

//
function afterOpenPopup() {
  document.getElementById('imdb-id').focus();
}
function afterOpenPopupHard() {
  document.getElementById('imdb-id-hard').focus();
}
