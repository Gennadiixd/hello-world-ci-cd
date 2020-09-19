const withTypescript = require("@zeit/next-typescript");
module.exports = withTypescript();

const withSass = require("@zeit/next-sass");
module.exports = withSass({});

// const withReactSvg = require("next-react-svg");
// const path = require("path");

// const withImages = require("next-images");
// module.exports = withImages({
//   esModule: true,
//   webpack(config, options) {
//     return config;
//   },
// });

// module.exports = withReactSvg({
//   include: path.resolve(__dirname, "assets/icons"),
//   webpack(config, options) {
//     return config;
//   },
// });

module.exports = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
      use: [
        {
          loader: "file-loader",
          outputPath: "static/webfonts/",
          publicPath: "../webfonts/",
          name: "[name].[ext]",
        },
      ],
    });
    return config;
  },
};

module.exports = () => {
  const env = {
    API_BASE: process.env.API_BASE,
    JWT_SECRET: process.env.JWT_SECRET,
  };

  return {
    env,
  };
};
