const { getRequest } = require('../utils/model');
const { catchAsync } = require('../utils/utils');

const { js_path, api_url } = process.env;

exports.home = catchAsync(async (req, res, next) => {
  const ext = {
    page: 'home',
    title: 'Download Movies, Tv Series and Games, Free High Quality Download Links',
    css: 'home',
    js: `${js_path}/client/home`,
  };

  res.status(200).render('client/home', { ext });
});

exports.explore = catchAsync(async (req, res, next) => {
  const { page } = req.params;
  const textStrings = { movies: 'movie', games: 'game', series: 'series', collections: 'collection' };

  const ext = {
    page: page,
    title: `Explore More ${page.slice(0, 1).toUpperCase()}${page.slice(1)}`,
    css: 'home',
    js: `${js_path}/client/home`,
    textString: `&type=${textStrings[page]}`,
  };

  res.status(200).render('client/home', { ext });
});

exports.search = catchAsync(async (req, res, next) => {
  const ext = {
    page: 'search',
    title: 'Find Any Movie, Game or Tv Series',
    css: 'search',
    js: `${js_path}/client/search`,
  };

  res.status(200).render('client/search', { ext });
});

exports.details = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  let media = (await getRequest(`${api_url}/media/full/${id}`, req)).data;
  const season = (await getRequest(`${api_url}/media/season/${id}`, req)).data;

  if (!media) media = (await getRequest(`${api_url}/media/full/${season.series}`, req)).data;

  // console.log(media);

  const ext = {
    page: 'details',
    title: `${media.title}${season && ' Season ' + season.season}`,
    css: 'details',
    js: `${js_path}/client/details`,
  };

  res.status(200).render('client/details', { ext, season, media });
});

exports.download = catchAsync(async (req, res, next) => {
  const link = (await getRequest(`${api_url}/media/link/${req.params.id}`, req)).data;
  let media, season, episode;
  if (link.media) media = (await getRequest(`${api_url}/media/single/${link.media}`, req)).data;
  if (link.episode) episode = (await getRequest(`${api_url}/media/episode/${link.episode}`, req)).data;
  if (episode) season = (await getRequest(`${api_url}/media/season/${episode.season}`, req)).data;
  if (season) media = (await getRequest(`${api_url}/media/full/${season.series}`, req)).data;

  const linkNames = {
    media: `${media.title}${season ? ` - Season ${season.season}` : ''}`,
    episode: episode ? `Episode ${episode.episode}: ${episode.title}` : '',
    name: link.resolution > 10 && link.resolution < 10000 ? `${link.name}p` : link.name,
  };

  const ext = {
    page: 'download',
    title: `Donwload ${linkNames.media} ${linkNames.episode} ${linkNames.name}`,
    css: 'download',
    js: `${js_path}/client/download`,
  };

  res.status(200).render('client/download', { ext, link, linkNames, media });
});
