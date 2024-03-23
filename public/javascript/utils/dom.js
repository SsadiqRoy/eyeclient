let to1, to2, to3, to4;

(function removeAlertResponse() {
  const body = document.querySelector('body');

  body.addEventListener('click', (ev) => {
    if (!ev.target.classList.contains('close-alert-message')) return;

    clearTimeout(to1);
    clearTimeout(to2);
    clearTimeout(to3);
    clearTimeout(to4);

    const alertCard = document.querySelector('.alert-message');
    alertCard.classList.remove('am-in');

    setTimeout(() => {
      body.removeChild(alertCard);
    }, 400); // 400ms is to allow the elemet to go back up with 300ms (in css transition)
  });
})();

export function rotateBtn(btnid) {
  const btn = document.getElementById(btnid);

  btn && btn.insertAdjacentHTML('beforeend', ` <i class="fas fa-spinner"></i>`);
}

//

export function stopRotateBtn(btnid) {
  const btn = document.getElementById(btnid);
  if (!btn) return console.log('No button found', btnid);
  const i = btn.querySelector('.fa-spinner');
  i && btn.removeChild(i);
}

//

export function alertResponse(message, type = '', duration = 4) {
  const body = document.querySelector('body');
  const alertCard = document.querySelector('.alert-message');

  let waitTime = 0;

  // Removing message if there is already one
  if (alertCard) {
    clearTimeout(to1);
    clearTimeout(to2);
    clearTimeout(to3);
    clearTimeout(to4);

    waitTime = 1010; // this is to allow for the 300ms that the element would use to return back up
    alertCard.classList.remove('am-in');

    setTimeout(() => {
      body.removeChild(alertCard);
    }, waitTime);
  }

  duration = (duration + 0.2) * 1000 + waitTime;
  const markup = `<div class="alert-message alert-message--${type}">${message}<i class="fas fa-times close-alert-message"></i></div>`;

  // Creating the message
  to1 = setTimeout(() => {
    body.insertAdjacentHTML('afterbegin', markup);
  }, waitTime + 10);

  // // Sending the message down
  to2 = setTimeout(() => {
    body.querySelector('.alert-message').classList.add('am-in');
  }, waitTime + 200);

  // Sending the message back up
  to3 = setTimeout(() => {
    body.querySelector('.alert-message').classList.remove('am-in');
  }, duration + 30);

  // Removing the error card from document
  to4 = setTimeout(() => {
    const card = body.querySelector('.alert-message');
    body.removeChild(card);
  }, duration + 1500);
}

//

export function displayError(error, btnid, type = 'failed', duration = 10) {
  if (!error.isOperational) {
    console.error('🍿eyeclient: ', error);
    alertResponse('Sorry something went wrong from our side', type, duration);
  } else {
    alertResponse(error.message || error._message, type, duration);
  }

  if (btnid) stopRotateBtn(btnid);
}

//
export function querMeta(query, metaName = 'meta') {
  const body = document.querySelector('body');

  if (!query) {
    return JSON.parse(body.dataset[metaName] || JSON.stringify({}));
  }
  body.dataset[metaName] = JSON.stringify(query);
}

//
export function querMetaMain(query, metaName = 'meta') {
  metaName = metaName + 'Main';
  const body = document.querySelector('body');

  if (!query) {
    return JSON.parse(body.dataset[metaName] || JSON.stringify({}));
  }
  body.dataset[metaName] = JSON.stringify(query);
}

/**
 * Inserts a loading spinner in before loading the content
 * @param {String} id the id of the container that will contain the content
 */
export function loadingContent(id) {
  const container = document.getElementById(id);

  container.innerHTML = '';
  const markup = `
      <div class="center-element">
        <i class='fa-solid fa-spinner'></i>
      </div>
    `;
  container.insertAdjacentHTML('beforeend', markup);
}

/**
 * displays a no data of search result or any message to the client instead of cards
 * @param {String} id id of the cards container element
 * @param {String} message message to display in the container
 */
export function noSearchContent(id, message) {
  const container = document.getElementById(id);

  container.innerHTML = '';
  const markup = `
      <div class="center-element" style='font-size: 1.6rem'>
        <h3>${message}</h3>
      </div>
    `;
  container.insertAdjacentHTML('beforeend', markup);
}

/**
 * Clicks the hidden main submit btn in a form when a representative visible btn is clicked.
 *
 * Mostly used in popup forms
 * @param {String} visibleId id of the visible btn
 * @param {String} hiddenId id of the main btn in the form
 */
export function clickOtherBtn(visibleId, hiddenId) {
  const visible = document.getElementById(visibleId);
  if (!visible) return console.warn('⚠️eyeclient: NO VISIBLE BUTTION FOUND');
  const hidden = document.getElementById(hiddenId);

  visible.addEventListener('click', () => hidden.click());
}

//
export function expandSearchBar(formid) {
  const form = document.getElementById(formid);
  // form.style.border = '1px solid salmon';
  const search = form.querySelector('input');

  search.addEventListener('focus', () => {
    if (window.innerWidth > 600) return;
    if (form.previousElementSibling) form.previousElementSibling.style.display = 'none';
    if (form.nextElementSibling) form.nextElementSibling.style.display = 'none';
  });

  search.addEventListener('blur', () => {
    if (window.innerWidth > 600) return;
    if (form.previousElementSibling) form.previousElementSibling.style.display = 'initial';
    if (form.nextElementSibling) form.nextElementSibling.style.display = 'initial';
  });
}

export function controlSidebar() {
  const sidebar = document.getElementById('sidebar');
  const open = document.getElementById('open-sidebar');
  const close = document.getElementById('close-sidebar');

  open.addEventListener('click', () => (sidebar.style.left = '0'));
  close.addEventListener('click', () => (sidebar.style.left = '-100%'));
}

//

export function fullOpenPopup(elementid, popupid, afterclose, beforeopen, aargs = [], bargs = [], afteropen, aoargs = []) {
  const elem = document.getElementById(elementid);
  if (!elem) return console.warn(`⚠️eyeclient: NO ELEMENT FOUND WITH ID -> ${elementid}`);
  const popup = document.getElementById(popupid);

  elem.addEventListener('click', (e) => {
    if (beforeopen) beforeopen(...bargs);
    popup.classList.toggle('display-off');
    afteropen && afteropen(...aoargs);
  });

  popup.addEventListener('click', (ev) => {
    if (!ev.target.classList.contains('close-popup')) return;
    popup.classList.toggle('display-off');
    if (afterclose) afterclose(...aargs);
  });
}

export function closePopup(popupid, afterclose, args = []) {
  const popup = document.getElementById(popupid);
  popup.classList.toggle('display-off');
  if (afterclose) afterclose(...args);
}

export function openPopup(popupid, beforeopen, args = []) {
  const popup = document.getElementById(popupid);
  if (beforeopen) beforeopen(...args);
  popup.classList.toggle('display-off');
}
