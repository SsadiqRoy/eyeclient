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
  unmergeDate,
} from '../../utils/utils';
// ============================= CONSTANT VARIABLES
const container = document.getElementById('cards-container');
let currentSeason;

/*





*/

// ============================== RENDERES

export function renderSeries(response, id) {
  alertResponse(response.message);

  if (id) return window.setTimeout(() => window.location.reload(), 3000);
  window.setTimeout(() => window.location.assign('/executive'), 3000);
}

//
export function renderSeason(response) {
  const { message, data: season } = response;
  const redirect = `/executive/season?id=${season.id}&series=${season.series}`;

  alertResponse(message);

  const card = document.querySelector(`[data-link-id='${season.id}']`);
  const next = card?.nextElementSibling;
  const prev = card?.previousElementSibling;

  card && container.removeChild(card);
  if (next) next.insertAdjacentHTML('beforebegin', dlinkCard(season, 'Season ', undefined, redirect));
  else if (prev) prev.insertAdjacentHTML('afterend', dlinkCard(season, 'Season ', undefined, redirect));
  else container.insertAdjacentHTML('afterbegin', dlinkCard(season, 'Season ', undefined, redirect));

  document.querySelector('body').dataset.next = +season.season + 1;
}

export function renderDeleteSeason(id) {
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
export function getSeasonData() {
  const { id } = parseQuery(window.location.search);
  const season = document.getElementById('season').value;
  const poster = document.getElementById('season-poster').value;
  const released = document.getElementById('season-released').value;

  return { series: id, season, poster, released };
}

/*





*/

// ============================== HANDLERS

export function handleSeries(controlSeries) {
  const form = document.getElementById('form-series');
  const { id } = parseQuery(window.location.search);
  const bntid = id ? 'update-series' : 'add-series';

  form.addEventListener('submit', async (ev) => {
    ev.preventDefault();

    rotateBtn(bntid);

    try {
      await controlSeries(id);
      stopRotateBtn(bntid);
    } catch (error) {
      displayError(error, bntid);
    }
  });
}

export function handleSeason(controlSeason) {
  const form = document.getElementById('form-season');

  form &&
    form.addEventListener('submit', async (ev) => {
      ev.preventDefault();

      const btnid = 'btn-season-alt';
      rotateBtn(btnid);

      try {
        const id = currentSeason?.id;
        await controlSeason(id);
        stopRotateBtn(btnid);
        closePopup('season-popup', clearSeasonPopup);
      } catch (error) {
        displayError(error, btnid);
      }
    });
}

export function handleDeleteSeason(controlDeleteSeason) {
  container &&
    container.addEventListener('click', async (ev) => {
      if (!ev.target.classList.contains('delete-link')) return;

      const season = JSON.parse(ev.target.closest('.link-item').dataset.link);

      const confirm = window.confirm(`Are you sure you want to delete \nSeason ${season.season}`);
      if (!confirm) return;

      try {
        await controlDeleteSeason(season.id);
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
  fullOpenPopup({ elementid: 'new-season', popupid: 'season-popup', afterclose: clearSeasonPopup, afteropen: afterOpenPopup });

  // changeName();
  clickOtherBtn('btn-season-alt', 'btn-season');
  onEditSeason();
}

/*





*/

// ============================== NON-EXPORTING

//
function clearSeasonPopup() {
  document.getElementById('season').value = document.querySelector('body').dataset.next;
  document.getElementById('season-poster').value = '';
  document.getElementById('season-released').value = '';
  currentSeason = undefined;
}

function editSeasonPopup(season) {
  document.getElementById('season').value = season.season;
  document.getElementById('season-poster').value = season.poster;
  document.getElementById('season-released').value = unmergeDate(season.released).date;
}

function onEditSeason() {
  container &&
    container.addEventListener('click', (ev) => {
      if (!ev.target.classList.contains('edit-link')) return;

      const card = ev.target.closest('.link-item');
      currentSeason = JSON.parse(card.dataset.link);

      editSeasonPopup(currentSeason);
      openPopup('season-popup');
    });
}

//

//
function afterOpenPopup() {
  document.getElementById('season').focus();
}
