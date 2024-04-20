import { expandSearchBar, mediaCard, parseQuery, stringifyQuery } from '../../utils/utils';
// ============================= CONSTANT VARIABLES

const sliders = {
  home: [
    { title: 'In Theathers <i class="fa-solid fa-angles-right"></i>', query: '?type[or]=series,movie&imdbRating[gt]=7&order=-released' },
    { title: 'New Movies <i class="fa-solid fa-angles-right"></i>', query: '?type=movie&order=-released' },
    { title: 'New Tv Series <i class="fa-solid fa-angles-right"></i>', query: '?type=series&order=-released' },
    { title: 'New Episodes <i class="fa-solid fa-angles-right"></i>', query: '?type=series&order=-lastEpisodeOn' },
    { title: 'Just Added <i class="fa-solid fa-angles-right"></i>', query: '?order=-createdAt' },
    { title: 'Top Games <i class="fa-solid fa-angles-right"></i>', query: '?type=game&imdbRating[gt]=6.9' },
    { title: 'Highly Rated Movies <i class="fa-solid fa-angles-right"></i>', query: '?type=movie&imdbRating[gt]=6.9' },
    { title: 'Highly Rated Series <i class="fa-solid fa-angles-right"></i>', query: '?type=series&imdbRating[gt]=6.9' },
    { title: 'Major collections <i class="fa-solid fa-angles-right"></i>', query: '?type=collection&imdbRating[gt]=6.9' },
    { title: 'Animation <i class="fa-solid fa-angles-right"></i>', query: '?search=animation' },
    { title: 'Action & Adventure Games <i class="fa-solid fa-angles-right"></i>', query: '?search=action,adventure&type=game' },
    { title: 'Drama Series & Movies <i class="fa-solid fa-angles-right"></i>', query: '?search=drama&type[ne]=collection' },
    { title: 'Korean <i class="fa-solid fa-angles-right"></i>', query: '?search=korea' },
    { title: 'On Netflix <i class="fa-solid fa-angles-right"></i>', query: '?search=netflix' },
    { title: 'On Prime Video <i class="fa-solid fa-angles-right"></i>', query: '?search=amazon' },
    { title: 'On Apple Tv <i class="fa-solid fa-angles-right"></i>', query: '?search=apple' },
    { title: 'On HBO <i class="fa-solid fa-angles-right"></i>', query: '?search=hbo' },
  ],
  movies: [
    { title: 'New Release <i class="fa-solid fa-angles-right"></i>', query: '?type=movie&order=-released' },
    { title: 'In Theaters <i class="fa-solid fa-angles-right"></i>', query: '?type=movie&imdbRating[gt]=7&order=-released' },
    { title: 'Top - This Year <i class="fa-solid fa-angles-right"></i>', query: '?type=movie&imdbRating[gt]=7.5&released[gte]=2024-01-01' },
    {
      title: 'Top - Previous Years <i class="fa-solid fa-angles-right"></i>',
      query: '?type=movie&imdbRating[gt]=7.5&released[gte]=2020-01-01&released[lt]=2024-01-01',
    },
    { title: 'Top All Time <i class="fa-solid fa-angles-right"></i>', query: '?type=movie&imdbRating[gt]=7.5' },
    { title: 'animation <i class="fa-solid fa-angles-right"></i>', query: '?type=movie&search=animation' },
    { title: 'comedy <i class="fa-solid fa-angles-right"></i>', query: '?type=movie&search=comedy' },
    { title: 'action <i class="fa-solid fa-angles-right"></i>', query: '?type=movie&search=action' },
    { title: 'netflix <i class="fa-solid fa-angles-right"></i>', query: '?type=movie&search=netflix' },
    { title: 'Prime Video <i class="fa-solid fa-angles-right"></i>', query: '?type=movie&search=amazon' },
    { title: 'Apple Tv <i class="fa-solid fa-angles-right"></i>', query: '?type=movie&search=Apple Tv' },
    { title: 'disney <i class="fa-solid fa-angles-right"></i>', query: '?type=movie&search=disney' },
  ],
  series: [
    { title: 'Trending now <i class="fa-solid fa-angles-right"></i>', query: '?type=series&imdbRating[gt]=7&order=-released' },
    { title: 'New Episodes <i class="fa-solid fa-angles-right"></i>', query: '?type=series&order=-lastEpisodeOn' },
    { title: 'New Release <i class="fa-solid fa-angles-right"></i>', query: '?type=series&order=-released' },
    { title: 'Top - This Year <i class="fa-solid fa-angles-right"></i>', query: '?type=series&imdbRating[gt]=7.5&released[gte]=2024-01-01' },
    {
      title: 'Top - Previous Years <i class="fa-solid fa-angles-right"></i>',
      query: '?type=series&imdbRating[gt]=7.5&released[gte]=2020-01-01&released[lt]=2024-01-01',
    },
    { title: 'Top All Time <i class="fa-solid fa-angles-right"></i>', query: '?type=series&imdbRating[gt]=7.5' },
    { title: 'animation <i class="fa-solid fa-angles-right"></i>', query: '?type=series&search=animation' },
    { title: 'comedy <i class="fa-solid fa-angles-right"></i>', query: '?type=series&search=comedy' },
    { title: 'action <i class="fa-solid fa-angles-right"></i>', query: '?type=series&search=action' },
    { title: 'netflix <i class="fa-solid fa-angles-right"></i>', query: '?type=series&search=netflix' },
    { title: 'Prime Video <i class="fa-solid fa-angles-right"></i>', query: '?type=series&search=amazon' },
    { title: 'Apple Tv <i class="fa-solid fa-angles-right"></i>', query: '?type=series&search=Apple Tv' },
    { title: 'HBO <i class="fa-solid fa-angles-right"></i>', query: '?type=series&search=hbo' },
  ],
  games: [
    { title: 'New Release <i class="fa-solid fa-angles-right"></i>', query: '?type=game&order=-released' },
    { title: 'Top Games <i class="fa-solid fa-angles-right"></i>', query: '?type=game&imdbRating[gt]=6.9' },
    { title: 'Action & Adventure Games <i class="fa-solid fa-angles-right"></i>', query: '?search=action,adventure&type=game' },
    { title: 'Collections <i class="fa-solid fa-angles-right"></i>', query: '?type=collection&collectionType=game&order=-released' },
  ],
  collections: [
    { title: 'movie Collections <i class="fa-solid fa-angles-right"></i>', query: '?type=collection&collectionType=movie&order=-released' },
    { title: 'series Collections <i class="fa-solid fa-angles-right"></i>', query: '?type=collection&collectionType=series&order=-released' },
    { title: 'game Collections <i class="fa-solid fa-angles-right"></i>', query: '?type=collection&collectionType=game&order=-released' },
    { title: 'Major Collections <i class="fa-solid fa-angles-right"></i>', query: '?type=collection&imdbRating[gte]=7.5&order=-released' },
  ],
};
/*





*/

// ============================== RENDERES

export function renderSlider(data, slider) {
  if (!data.length) return;
  const placehoders = document.getElementById('sliders-container');
  if (placehoders) document.body.removeChild(placehoders);

  const footer = document.querySelector('footer');

  const id = crypto.randomUUID().split('-').join('').slice(0, 10);
  const markup = `
  <section class="slider">
  <h3 class="slider__heading">${slider.title}</h3>

  <div class="slider__container">
    <div class="slider__button slider__button--left d-left slider-arrow"><i class="fas fa-angle-left d-left slider-arrow"></i></div>
    <div class="slider__content" id='${id}'></div>
    <div class="slider__button slider__button--right slider-arrow d-right"><i class="fas fa-angle-right slider-arrow d-right"></i></div>
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
  scrollSlider();
}

/*





*/

// ============================== NON-EXPORTING

export function scrollSlider() {
  document.body.addEventListener('click', (ev) => {
    if (!ev.target.classList.contains('slider-arrow')) return;
    const container = ev.target.closest('.slider__container');
    const content = container.querySelector('.slider__content');

    const toRight = ev.target.classList.contains('d-right');
    const distance = container.clientWidth;
    const direction = toRight ? +distance : -distance;

    content.scrollBy({ left: direction, behavior: 'smooth' });
  });
}
