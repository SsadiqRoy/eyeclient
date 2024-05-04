const major = ['free download', 'index of', 'hdcam', 'dvdrip', '480p', '720p', '1080p', '2160p', 'brrip'];
const seasonKeys = ['season ', 'S0', 'S', 'episode '];

exports.catchAsync = (fn) => (req, res, next) => fn(req, res, next).catch(next);

exports.generateKeywords = ({ media, season }) => {
  let newSasonKeys = [];
  if (season) newSasonKeys = seasonKeys.map((key) => `${key}${season.season}`);
  const keys = [
    `${media.title} ${media.type} ${media.year || ''}`,
    ...major,
    ...newSasonKeys,
    ...`${media.keywords || ''}`.split(',').map((key) => key.trim()),
  ];

  return keys;
};
