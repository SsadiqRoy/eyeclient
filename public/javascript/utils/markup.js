import { getTime } from './functions';

export function userCard(user) {
  const active = user.active ? 'pause' : 'play';

  const markup = `
  <div class="user-card" data-user-id="${user.id}">
    <div class="user-card__details">
      <strong>${user.name} &nbsp; (${user.accessLevel})</strong>
      <span>${user.email}</span>
    </div>
    <div class="user-card__buttons">
      <i class="fas fa-${active} i-secondary change-user-status" data-user-status="${user.active}"></i>
      <i class="fas fa-trash-alt i-primary delete-user"></i>
    </div>
  </div>`;

  return markup;
}

export function dmediaCard(media, buttonType = '') {
  let buttons = `
    <a href="/executive/${media.type}?id=${media.id}"><i class="fas fa-edit i-secondary"></i></a>
    <i class="fas fa-trash-alt i-primary delete-media"></i>
  `;
  const imdbPath = `https://www.imdb.com/title/${media.imdbId}`;
  const link = media.type === 'collection' ? `/media?collection=${media.id}` : `/detail/${media.id}`;
  const genre =
    media.genre &&
    media.genre !== 'N/A' &&
    media.genre
      .split(',')
      .map((g) => `#${g.trim()}`)
      .join(' ');

  const fullContent = `.\nTitle: ${media.title}\n\n${
    media.plot || ''
  }\n${genre}\n\n🍿🍿🍿🍿🍿 Download Link👇\nhttps://eyeclient.com${link}\n\n${imdbPath}`;
  const facebook = `Title: ${media.title}\n${genre} #${media.type} #new #trending #${media.title.replaceAll(' ', '')}\n${
    media.plot || ''
  }\n🍿🍿🍿🍿🍿 Download Link👇\nhttps://eyeclient.com${link}`;

  if (buttonType === 'positive') buttons = `<button class="btn btn-secondary-dark add-to-collection">add to collection</button>`;
  if (buttonType === 'negative') buttons = `<button class="btn btn-primary remove-from-collection">remove</button>`;
  const action = buttonType === 'positive' ? 'add' : buttonType === 'negative' ? 'remove' : '';

  const markup = `
    <div class="dmedia-card" data-media-id="${media.id}" data-action='${action}'>
      <div class="dmedia-card__image"><img src="${media.poster}" alt="${media.title}" /></div>
      <div class="dmedia-card__details">
        <h4 class="dmedia-card__details-title">
          <a href="${link}">${media.title}</a> &nbsp; 
        </h4>
        <ul style="margin-top: 1rem;">
          <li>${media.type}</li>
          <li>${media.imdbRating} <i class="fas fa-star i-primary"></i></li>
          <li>${getTime(media.released).date}</li>
          <div><i class="fas fa-copy i-primary" data-link="${fullContent}" style="font-size: 2rem;" title="Telegram"></i></div>
          <div><i class="fas fa-copy" data-link="${facebook}" style="font-size: 2rem;" title="Facebook"></i></div>
        </ul>

        <div class="dmedia-card__details-button">
          <span>${buttons}</span>
        </div>
      </div>
    </div>
  `;

  return markup;
}

export function dlinkCard(link, pre = '', post = '', redirect = false) {
  let direction = '<i class="fas fa-edit i-secondary edit-link"></i>';
  if (redirect) direction = `<a href='${redirect}'><i class="fas fa-edit i-secondary"></i></a>`;

  const markup = `
  <div class="link-item" data-link-id='${link.id}' data-link='${JSON.stringify(link)}'>
    <span>${pre}${link.name || link.episode || link.season}${post}</span>
    <span>${direction}<i class="fas fa-trash-alt i-primary delete-link"></i></span>
  </div>
  `;

  return markup;
}

export function mediaCard(media) {
  const link = media.type === 'collection' ? `/media?collection=${media.id}` : `/detail/${media.id}`;
  const markup = `
  <div class="media-card" data-media-id='${media.id}'>
    <div class="media-card__image">
      <img src="${media.poster}" />
    </div>
    <div class="media-card__details">
      <a href="${link}" class="media-card__details__title" title='${media.year}'>${media.title}</a>
      <span class="media-card__details__rate-type">${media.imdbRating || 'N/A'} <i class="fas fa-star"></i> &nbsp; <span>${media.type}</span></span>
    </div>
  </div>
  `;

  return markup;
}
