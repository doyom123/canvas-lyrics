const path = require("path");

module.exports = {
  entry: "./src/canvas-lyrics.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "canvas-lyrics.js",
    library: 'CanvasLyrics'
  }
};

