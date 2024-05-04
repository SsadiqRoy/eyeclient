const { getRequest } = require('../utils/model');
const { catchAsync, generateKeywords } = require('../utils/utils');

const { js_path, api_url } = process.env;

exports.home = catchAsync(async (req, res, next) => {
  const ext = {
    page: 'home',
    title: 'Eye Client | Index Of Movies, Tv Series and Games, Free High Quality Download Links',
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
    title: `Explore More ${page.slice(0, 1).toUpperCase()}${page.slice(1)} | Eye Client`,
    css: 'home',
    js: `${js_path}/client/home`,
    textString: `&type=${textStrings[page]}`,
  };

  res.status(200).render('client/home', { ext });
});

exports.search = catchAsync(async (req, res, next) => {
  const ext = {
    page: 'search',
    title: 'Find Any Movie, Game or Tv Series | Eye Client',
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

  const ext = {
    page: 'details',
    title: `${media.title}${season ? ` Season ${season.season}` : ''} | Eye Client`,
    css: 'details',
    js: `${js_path}/client/details`,
  };

  const keywords = generateKeywords({ media, season }).join(', ');
  // console.log(keywords);

  res.status(200).render('client/details', { ext, season, media, keywords });
});

//

exports.download = catchAsync(async (req, res, next) => {
  const link = (await getRequest(`${api_url}/media/link/${req.params.id}`, req)).data;
  let media, season, episode;
  if (link.media) media = (await getRequest(`${api_url}/media/single/${link.media}`, req)).data;
  if (link.episode) episode = (await getRequest(`${api_url}/media/episode/${link.episode}`, req)).data;
  if (episode) season = (await getRequest(`${api_url}/media/season/${episode.season}`, req)).data;
  if (season) media = (await getRequest(`${api_url}/media/full/${season.series}`, req)).data;

  const linkNames = {
    media: `${media.title}${season ? ` - S${String(season.season).padStart(2, '0')}` : ''}`,
    episode: episode ? `E${String(episode.episode).padStart(2, '0')}: ${episode.title}` : '',
    name: link.resolution > 10 && link.resolution < 10000 ? `${link.name}p` : link.name,
  };

  const ext = {
    page: 'download',
    title: `Donwload ${linkNames.media}${linkNames.episode} | Eye Client`,
    css: 'download',
    js: `${js_path}/client/download`,
  };

  res.status(200).render('client/download', { ext, link, linkNames, media });
});
