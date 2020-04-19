module.exports = {
  publicPath: (function() {
    if (process.env.NODE_ENV === "demo") {
      return "https://blueju.github.io/vue-g6-editor/dist/";
    }
  })()
};
