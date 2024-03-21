import { initialLoad, pageLoad, search } from '../../utils/independent';
import { alertResponse, controlSidebar, displayError, expandSearchBar, userCard } from '../../utils/utils';

// ============================= CONSTANT VARIABLES
const container = document.getElementById('cards-container');

/*





*/

// ============================== RENDERES
export function renderUserStatus(response) {
  const { data, message } = response;
  alertResponse(message);

  const card = document.querySelector(`[data-user-id='${data.id}']`);
  const next = card.nextElementSibling;
  const prev = card.previousElementSibling;

  container.removeChild(card);
  if (next) next.insertAdjacentHTML('beforebegin', userCard(data));
  else if (prev) prev.insertAdjacentHTML('afterend', userCard(data));
  else container.insertAdjacentHTML('beforeend', userCard(data));
}

//

export function renderDeleteUser(response) {
  const { data, message } = response;
  alertResponse(message);

  const card = document.querySelector(`[data-user-id='${data.id}']`);
  container.removeChild(card);
}

/*





*/

// ============================== GETTERS

/*





*/

// ============================== HANDLERS

export function handleUserStatus(controlUserStatus) {
  container.addEventListener('click', async (ev) => {
    if (!ev.target.classList.contains('change-user-status')) return;

    const card = ev.target.closest('.user-card');
    const name = card.querySelector('strong').textContent.split('(')[0].trim();
    const status = ev.target.dataset.userStatus == 'true' ? true : false;
    // status = status

    const confirm = window.confirm(`Are you sure you want to ${status ? 'deativate' : 'activate'} ${name}`);
    if (!confirm) return;

    const access = window.prompt('Please enter access code');
    const id = card.dataset.userId;

    try {
      await controlUserStatus({ access, id }, status ? 'deactivate' : 'activate');
    } catch (error) {
      displayError(error);
    }
  });
}

//

export function handleDeleteUser(controlDeleteUser) {
  container.addEventListener('click', async (ev) => {
    if (!ev.target.classList.contains('delete-user')) return;

    const card = ev.target.closest('.user-card');
    const name = card.querySelector('strong').textContent.split('(')[0].trim();

    const confirm = window.confirm(`Are you sure you want to DELETE ${name}'s account`);
    if (!confirm) return;

    // const access = window.prompt('Please enter access code');
    const id = card.dataset.userId;

    try {
      await controlDeleteUser(id);
    } catch (error) {
      displayError(error);
    }
  });
}

/*





*/

// ============================== INITIALIZER

export function initialize() {
  expandSearchBar('form-search');
  controlSidebar();

  window.addEventListener('DOMContentLoaded', () => {
    initialLoad({ containerid: 'cards-container', url: '/users?order=-createdAt', card: 'userCard' });
    pageLoad({ containerid: 'cards-container', url: '/users', card: 'userCard' });
    search({ containerid: 'cards-container', url: '/users', card: 'userCard', formid: 'form-search' });
  });
}

/*





*/

// ============================== NON-EXPORTING
