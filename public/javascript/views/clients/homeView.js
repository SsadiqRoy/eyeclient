import { expandSearchBar, mediaCard, parseQuery, stringifyQuery } from '../../utils/utils';
// ============================= CONSTANT VARIABLES

const sliders = {
  home: [
    { title: 'In Theathers', query: '?type[or]=series,movie&imdbRating[gt]=7&order=-released' },
    { title: 'New Episodes', query: '?type=series&order=-lastEpisodeOn' },
    { title: 'New Movies', query: '?type=movie&order=-released' },
    { title: 'New Tv Series', query: '?type=series&order=-released' },
    { title: 'Top Games', query: '?type=game&imdbRating[gt]=6.9' },
    { title: 'Highly Rated Movies', query: '?type=movie&imdbRating[gt]=6.9' },
    { title: 'Highly Rated Series', query: '?type=series&imdbRating[gt]=6.9' },
    { title: 'Major collections', query: '?type=collection&imdbRating[gt]=6.9' },
    { title: 'Animation', query: '?search=animation' },
    { title: 'Action & Adventure Games', query: '?search=action,adventure&type=game' },
    { title: 'Drama Series & Movies', query: '?search=drama&type[ne]=collection' },
    { title: 'Korean', query: '?search=korea' },
    { title: 'Netflix', query: '?search=netflix' },
    { title: 'Prime Video', query: '?search=prime video' },
    { title: 'Apple Tv', query: '?search=apple' },
    { title: 'HBO', query: '?search=hbo' },
  ],
  movies: [
    { title: 'New Release', query: '?type=movie&order=-released' },
    { title: 'In Theaters', query: '?type=movie&imdbRating[gt]=7&order=-released' },
    { title: 'Top - This Year', query: '?type=movie&imdbRating[gt]=7.5&released[gte]=2024-01-01' },
    { title: 'Top - Previous Years', query: '?type=movie&imdbRating[gt]=7.5&released[gte]=2020-01-01&released[lt]=2024-01-01' },
    { title: 'Top All Time', query: '?type=movie&imdbRating[gt]=7.5' },
    { title: 'animation', query: '?type=movie&search=animation' },
    { title: 'comedy', query: '?type=movie&search=comedy' },
    { title: 'action', query: '?type=movie&search=action' },
    { title: 'netflix', query: '?type=movie&search=netflix' },
    { title: 'Prime Video', query: '?type=movie&search=Prime Video' },
    { title: 'Apple Tv', query: '?type=movie&search=Apple Tv' },
    { title: 'disney', query: '?type=movie&search=disney' },
  ],
  series: [
    { title: 'Trending now', query: '?type=series&imdbRating[gt]=7&order=-released' },
    { title: 'New Episodes', query: '?type=series&order=-lastEpisodeOn' },
    { title: 'New Release', query: '?type=series&order=-released' },
    { title: 'Top - This Year', query: '?type=series&imdbRating[gt]=7.5&released[gte]=2024-01-01' },
    { title: 'Top - Previous Years', query: '?type=series&imdbRating[gt]=7.5&released[gte]=2020-01-01&released[lt]=2024-01-01' },
    { title: 'Top All Time', query: '?type=series&imdbRating[gt]=7.5' },
    { title: 'animation', query: '?type=series&search=animation' },
    { title: 'comedy', query: '?type=series&search=comedy' },
    { title: 'action', query: '?type=series&search=action' },
    { title: 'netflix', query: '?type=series&search=netflix' },
    { title: 'Prime Video', query: '?type=series&search=Prime Video' },
    { title: 'Apple Tv', query: '?type=series&search=Apple Tv' },
    { title: 'HBO', query: '?type=series&search=hbo' },
  ],
  games: [
    { title: 'New Release', query: '?type=game&order=-released' },
    { title: 'Top Games', query: '?type=game&imdbRating[gt]=6.9' },
    { title: 'Action & Adventure Games', query: '?search=action,adventure&type=game' },
    { title: 'Collections', query: '?type=collection&collectionType=game&order=-released' },
  ],
  collections: [
    { title: 'movie Collections', query: '?type=collection&collectionType=movie&order=-released' },
    { title: 'series Collections', query: '?type=collection&collectionType=series&order=-released' },
    { title: 'game Collections', query: '?type=collection&collectionType=game&order=-released' },
    { title: 'Major Collections', query: '?type=collection&imdbRating[gte]=7.5&order=-released' },
  ],
};
/*





*/

// ============================== RENDERES

export function renderSlider(data, slider) {
  if (!data.length) return;

  const footer = document.querySelector('footer');

  const id = crypto.randomUUID().split('-').join('').slice(0, 10);
  const markup = `
  <section class="slider">
  <h3 class="slider__heading">${slider.title}</h3>

  <div class="slider__container">
    <div class="slider__button slider__button--left"><i class="fas fa-angle-left"></i></div>
    <div class="slider__content" id='${id}'></div>
    <div class="slider__button slider__button--right"><i class="fas fa-angle-right"></i></div>
  </div>
</section>
  `;
  footer.insertAdjacentHTML('beforebegin', markup);

  const container = document.getElementById(id);
  data.forEach((media) => container.insertAdjacentHTML('beforeend', mediaCard(media)));

  if (data.length < 15) return;
  const excluded = ['page', 'limit', 'length', 'total', 'consumed', 'available', 'next'];
  const query = parseQuery(slider.query);

  excluded.forEach((field) => delete query[field]);

  const seemore = `
  <div class="see-more-card">
    <a href="/media${stringifyQuery(query)}">See More</a>
  </div>
  `;
  container.insertAdjacentHTML('beforeend', seemore);
}

/*





*/

// ============================== GETTERS

/*





*/

// ============================== HANDLERS
export function handleInitialLoad(controlInitialLoad) {
  window.addEventListener('DOMContentLoaded', async () => {
    const { page } = document.querySelector('body').dataset;

    const pageSliders = sliders[page];
    const extraQuery = '?limit=15&fields=id,poster,title,imdbRating,type,year';

    // pageSliders.forEach(async (slider) => {
    //   try {
    //     slider.query = stringifyQuery({ ...parseQuery(slider.query), ...parseQuery(extraQuery) });

    //     await controlInitialLoad(slider);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // });
    for (let i = 0; i < pageSliders.length; i++) {
      const slider = pageSliders[i];

      try {
        slider.query = stringifyQuery({ ...parseQuery(slider.query), ...parseQuery(extraQuery) });

        await controlInitialLoad(slider);
      } catch (error) {
        console.log(error);
      }
    }
  });
}

/*





*/

// ============================== INITIALIZER

export function initialize() {
  expandSearchBar('form-search');
}

/*





*/

// ============================== NON-EXPORTING
