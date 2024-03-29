import { getFull, patchFull } from '../models/model';
import * as markups from './markup';
import {
  alertResponse,
  displayError,
  loadingContent,
  mergeQueries,
  noSearchContent,
  parseQuery,
  querMeta,
  querMetaMain,
  rotateBtn,
  stopRotateBtn,
  stringifyQuery,
} from './utils';

export function pageButtons(containerid, metaName = 'meta') {
  const { total, limit, page, available, length } = querMeta(undefined, metaName);
  const pages = Math.ceil(total / limit);

  const viewPrev = page > 1 ? '' : 'display-off';
  const viewNext = available ? '' : 'display-off';

  const markup = `
  <div class="center-element-2 form-7 np-buttons" style='margin: 4rem 0;'>
    <span class="tag tag-primary tag-button np-button ${viewPrev}" data-direction="prev"><i class="fas fa-angle-left np-button"></i>prev</span>
    <span class="tag">${page}/${pages}</span>
    <span class="tag tag-primary tag-button np-button ${viewNext}" data-direction="next">next <i class="fas fa-angle-right np-button"></i></span>
  </div>`;

  const parent = document.getElementById(containerid).parentElement;
  const npButtons = parent.querySelector('.np-buttons');
  npButtons && parent.removeChild(npButtons);

  length && parent.insertAdjacentHTML('beforeend', markup);
}

//

async function makeSearch({ url, containerid, card, args, aftercall, toMetaMain = false, scroll = false }) {
  try {
    const container = document.getElementById(containerid);

    const { data, meta } = await getFull(url);

    querMeta(meta);
    toMetaMain && querMetaMain(meta);

    console.log(meta);
    if (!meta.length) {
      noSearchContent(containerid, 'No results found');
      pageButtons(containerid);
      aftercall && aftercall({ data, meta, card, args, containerid });
      return;
    }

    container.innerHTML = '';
    data.forEach((item) => container.insertAdjacentHTML('beforeend', markups[card](item, ...args)));
    pageButtons(containerid);

    scroll && container.parentElement.scrollTo({ top: 0, behavior: 'smooth' });
    aftercall && aftercall({ data, meta, card, args, containerid });
  } catch (error) {
    displayError(error);
  }
}

//

export function initialLoad({ containerid, url, card, args = [] }) {
  loadingContent(containerid);
  makeSearch({ url, containerid, card, args, toMetaMain: true });
}

//

export function pageLoad({ containerid, url, card, args = [], aftercall }) {
  const body = document.querySelector('body');

  body.addEventListener('click', (ev) => {
    if (!ev.target.classList.contains('np-button')) return;
    const { direction } = ev.target.closest('span').dataset;

    const query = querMeta();
    query.page = direction === 'next' ? query.page + 1 : query.page - 1;

    const newurl = url + stringifyQuery(query);

    makeSearch({ url: newurl, containerid, card, args, scroll: true, aftercall });
  });

  //
}

//
export function search({ containerid, url, card, formid, args = [], tagsid, tagclass, aftercall }) {
  const form = document.getElementById(formid);
  const [original, urlQ] = url.split('?');
  const urlQuery = urlQ ? parseQuery('?' + urlQ) : undefined;

  form.addEventListener('submit', (ev) => {
    ev.preventDefault();
    const { value: search } = form.querySelector('input');

    const oldquery = querMetaMain();
    let query = urlQuery ? { ...urlQuery, search } : { search };

    if (!search) query = urlQuery ? { ...urlQuery, ...oldquery } : oldquery;
    if (search.startsWith('??')) query = parseQuery(search.slice(1));

    if (oldquery.fields) query.fields = oldquery.fields;

    let newAftercall = aftercall;
    if (tagsid && tagclass) {
      newAftercall = (options) => {
        const tagsContainer = document.getElementById(tagsid);
        const tags = tagsContainer.querySelectorAll(`.${tagclass}`);
        tags.forEach((t) => t.classList.remove('tag-primary'));

        aftercall && aftercall(options);
      };
    }

    query = stringifyQuery(query);
    const newurl = original + query;
    makeSearch({ url: newurl, containerid, card, args, aftercall: newAftercall });
  });
}

//

export function filter({ containerid, url, card, selectid, tagsid, args = [], aftercall, tagclass }) {
  const select = document.getElementById(selectid);
  const tagsContainer = document.getElementById(tagsid);
  const [original, urlQ] = url.split('?');
  const urlQuery = urlQ ? parseQuery('?' + urlQ) : undefined;

  select &&
    select.addEventListener('change', () => {
      if (select.value === 'reset') {
        let query = urlQ ? { ...urlQuery, ...querMetaMain() } : querMetaMain();
        query = stringifyQuery(querMetaMain());

        const newurl = original + query;
        makeSearch({ url: newurl, containerid, card, args, aftercall });
        return;
      }

      let query = mergeQueries(querMeta(), parseQuery(select.value), ['order']);
      query = urlQ ? { ...urlQuery, ...query } : query;

      query = stringifyQuery(query);

      const newurl = url + query;
      makeSearch({ url: newurl, containerid, card, args, aftercall });
    });

  tagsContainer &&
    tagclass &&
    tagsContainer.addEventListener('click', (ev) => {
      const tag = ev.target;
      if (!tag.classList.contains(tagclass)) return;

      const oldquery = querMeta();
      const onFilterList = tag.classList.contains('tag-primary');

      if (tag.dataset.filter === 'reset') {
        let query = urlQ ? { ...urlQuery, ...querMetaMain() } : querMetaMain();
        query = stringifyQuery(querMetaMain());

        const newurl = original + query;

        function newAftercall(options) {
          const tags = tagsContainer.querySelectorAll(`.${tagclass}`);
          tags.forEach((t) => t.classList.remove('tag-primary'));

          aftercall && aftercall(options);
        }

        makeSearch({ url: newurl, containerid, card, args, aftercall: newAftercall });
        return;
      }

      const tagFilter = parseQuery(tag.dataset.filter);
      const key = Object.keys(tagFilter)[0];
      let query = {};

      if (onFilterList) {
        // removing the current filter value from filter if it is includedd
        oldquery[key] = oldquery[key]
          .split(',')
          .filter((v) => v !== tagFilter[key])
          .join(',');

        // deleting that filter from query if the current value was the only value on it
        if (!oldquery[key]) delete oldquery[key];
        query = oldquery;
      } else {
        query = mergeQueries(oldquery, tagFilter, [key]);
      }

      query = stringifyQuery(query);

      function newAftercall(options) {
        tag.classList.toggle('tag-primary');
        aftercall && aftercall(options);
      }

      const newurl = original + query;
      makeSearch({ url: newurl, containerid, card, args, aftercall: newAftercall });
    });
}

//

export function softUpdate(btnid, channel = 'media') {
  const btn = document.getElementById(btnid);
  if (!btn) return;

  const channels = { media: '/media/soft', episode: '/media/episode/soft' };

  btn.addEventListener('click', async () => {
    rotateBtn(btnid);
    const { id } = parseQuery(window.location.search);

    try {
      const response = await patchFull(channels[channel], { id });
      alertResponse(response.message);
      stopRotateBtn(btnid);
      window.setTimeout(() => window.location.reload(), 3000);
    } catch (error) {
      console.log(error);
      displayError(error, btnid);
    }
  });
}
