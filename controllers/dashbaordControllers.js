const { getRequest } = require('../utils/model');
const { catchAsync } = require('../utils/utils');

const { js_path, api_url } = process.env;

//

exports.new = catchAsync(async (req, res, next) => {
  const ext = {
    page: 'new',
    title: 'New Admin',
    css: 'form',
    js: `${js_path}/dashboard/new`,
  };

  res.status(200).render('dashboard/new', { ext });
});

exports.login = catchAsync(async (req, res, next) => {
  const ext = {
    page: 'login',
    title: 'Admin Login',
    css: 'form',
    js: `${js_path}/dashboard/login`,
  };

  res.status(200).render('dashboard/login', { ext });
});

exports.account = catchAsync(async (req, res, next) => {
  const ext = {
    page: 'account',
    title: 'Admin Account',
    css: 'account',
    js: `${js_path}/dashboard/account`,
  };

  res.status(200).render('dashboard/account', { ext });
});

exports.media = catchAsync(async (req, res, next) => {
  const ext = {
    page: 'media',
    title: 'All Media',
    css: 'media',
    js: `${js_path}/dashboard/media`,
  };

  res.status(200).render('dashboard/media', { ext });
});

//

exports.users = catchAsync(async (req, res, next) => {
  const ext = {
    page: 'users',
    title: 'All Admins',
    css: 'media',
    js: `${js_path}/dashboard/users`,
  };

  res.status(200).render('dashboard/users', { ext });
});

exports.movie = catchAsync(async (req, res, next) => {
  const { id } = req.query;
  let movie;
  if (id) {
    movie = await getRequest(`${api_url}/media/full/${id}`, req);
    movie = movie.data;
  }

  // console.log(movie);

  const ext = {
    page: 'movie',
    title: 'Movie Details',
    css: 'form',
    js: `${js_path}/dashboard/movie`,
  };

  res.status(200).render('dashboard/movie', { ext, movie });
});

exports.game = catchAsync(async (req, res, next) => {
  const { id } = req.query;
  let game;
  if (id) {
    game = await getRequest(`${api_url}/media/full/${id}`, req);
    game = game.data;
  }

  const ext = {
    page: 'game',
    title: 'Game Details',
    css: 'form',
    js: `${js_path}/dashboard/game`,
  };

  res.status(200).render('dashboard/game', { ext, game });
});

//

exports.about = catchAsync(async (req, res, next) => {
  const { id } = req.query;
  let game;
  if (id) {
    game = await getRequest(`${api_url}/media/single/${id}`, req);
    game = game.data;
  }

  const ext = {
    page: 'about',
    title: 'Game About',
    css: 'form',
    js: `${js_path}/dashboard/about`,
  };

  res.status(200).render('dashboard/about', { ext, game });
});

exports.series = catchAsync(async (req, res, next) => {
  const { id } = req.query;
  let series;
  if (id) {
    series = await getRequest(`${api_url}/media/full/${id}`, req);
    series = series.data;
  }

  const ext = {
    page: 'series',
    title: 'Tv Series Details',
    css: 'form',
    js: `${js_path}/dashboard/series`,
  };

  res.status(200).render('dashboard/series', { ext, series });
});

exports.season = catchAsync(async (req, res, next) => {
  const { id } = req.query;
  let season;
  if (id) {
    season = await getRequest(`${api_url}/media/season/${id}`, req);
    season = season.data;
  }

  // console.log(season);

  const ext = {
    page: 'season',
    title: 'Season Details',
    css: 'form',
    js: `${js_path}/dashboard/season`,
  };

  res.status(200).render('dashboard/season', { ext, season });
});

//

exports.episode = catchAsync(async (req, res, next) => {
  const { id, season } = req.query;
  let episode;
  if (id) {
    episode = await getRequest(`${api_url}/media/episode/${id}`, req);
    episode = episode.data;
  }
  const ext = {
    page: 'episode',
    title: 'Episode Details',
    css: 'form',
    js: `${js_path}/dashboard/episode`,
  };

  res.status(200).render('dashboard/episode', { ext, episode, season });
});

exports.collection = catchAsync(async (req, res, next) => {
  const { id } = req.query;
  let collection;
  if (id) {
    collection = await getRequest(`${api_url}/media/full/${id}`, req);
    collection = collection.data;
  }

  const ext = {
    page: 'collection',
    title: 'Collection Details',
    css: 'form',
    js: `${js_path}/dashboard/collection`,
  };

  res.status(200).render('dashboard/collection', { ext, collection });
});
