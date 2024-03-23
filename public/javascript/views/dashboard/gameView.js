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

export function renderGame(response, id) {
  alertResponse(response.message);

  if (id) return window.setTimeout(() => window.location.reload(), 3000);
  window.setTimeout(() => window.location.assign('/executive'), 3000);
}

//
export function renderLink(response) {
  const { message, data: link } = response;

  alertResponse(message);

  const card = document.querySelector(`[data-link-id='${link.id}']`);
  const next = card?.nextElementSibling;
  const prev = card?.previousElementSibling;

  card && container.removeChild(card);
  if (next) next.insertAdjacentHTML('beforebegin', dlinkCard(response.data));
  else if (prev) prev.insertAdjacentHTML('afterend', dlinkCard(response.data));
  else container.insertAdjacentHTML('afterbegin', dlinkCard(response.data));

  if (card) return;
  document.querySelector('body').dataset.next = +link.position + 1;
  document.getElementById('position').value = +link.position + 1;
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
  const keywords = document.getElementById('keywords').value;

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

  const name = document.getElementById('name').value;
  const position = document.getElementById('position').value;
  const link = document.getElementById('link').value;

  return { media: id, name, position, link, filled: link.length ? true : false };
}

/*





*/

// ============================== HANDLERS

export function handleGame(controlGame) {
  const form = document.getElementById('form-game');
  const { id } = parseQuery(window.location.search);
  const bntid = id ? 'update-game' : 'add-game';

  form.addEventListener('submit', async (ev) => {
    ev.preventDefault();

    rotateBtn(bntid);

    try {
      await controlGame(id);
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

  // changeName();
  clickOtherBtn('btn-link-alt', 'btn-link');
  onEditLink();
}

/*





*/

// ============================== NON-EXPORTING

// function changeName() {
//   const { id } = parseQuery(window.location.search);
//   if (!id) return;
//   const resolution = document.getElementById('resolution');
//   const otherName = document.getElementById('group-other');
//   resolution.addEventListener('change', () => {
//     const { value } = resolution;
//     if (value === 'other') return otherName.classList.remove('display-off');
//     otherName.classList.add('display-off');
//   });
// }

//
function clearLinkPopup() {
  document.getElementById('name').value = 'Part ';
  document.getElementById('position').value = document.querySelector('body').dataset.next;
  document.getElementById('link').value = '';

  currentLink = undefined;
}

function editLinkPopup(link) {
  document.getElementById('name').value = link.name;
  document.getElementById('position').value = link.position;
  document.getElementById('link').value = link.link;
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

//
function afterOpenPopup() {
  document.getElementById('name').focus();
}
