const isPathRelative = (p) => {
  return p === '.' || p.startsWith('./') || p.startsWith('../');
};

module.exports = {
    isPathRelative,
};