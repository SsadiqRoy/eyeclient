// ============================= CONSTANT VARIABLES

import { filter, initialLoad, pageLoad, search } from '../../utils/independent';
import { expandSearchBar } from '../../utils/utils';

/*





*/

// ============================== RENDERES

/*





*/

// ============================== GETTERS

/*





*/

// ============================== HANDLERS

/*





*/

// ============================== INITIALIZER
export function initialize() {
  expandSearchBar('form-search');
  const { search: searchString } = window.location;

  initialLoad({ containerid: 'cards-container', url: `/media${searchString || '?order=-released'}`, card: 'mediaCard' });
  pageLoad({ containerid: 'cards-container', url: `/media`, card: 'mediaCard', aftercall: scrollPage });
  search({
    containerid: 'cards-container',
    url: `/media${searchString || '?order=-released'}`,
    card: 'mediaCard',
    formid: 'form-search',
    tagsid: 'filter-container',
    tagclass: 'filter-item',
    aftercall: scrollPage,
  });
  filter({
    containerid: 'cards-container',
    url: `/media${searchString || '?order=-released'}`,
    card: 'mediaCard',
    tagsid: 'filter-container',
    tagclass: 'filter-item',
    aftercall: scrollPage,
  });
}
/*





*/

// ============================== NON-EXPORTING

function scrollPage() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
