const withTypescript = require("@zeit/next-typescript");
module.exports = withTypescript();

const withSass = require("@zeit/next-sass");
module.exports = withSass({});

module.exports = () => {
  const env = {
    API_BASE: process.env.API_BASE,
    JWT_SECRET: process.env.JWT_SECRET,
  };

  return {
    env,
  };
};
