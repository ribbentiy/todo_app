const target = "http://localhost:3000";

module.exports = {
  devServer: {
    proxy: {
      "/api": {
        target,
        ws: true,
        changeOrigin: true
      },
      "^/static": {
        target,
        ws: true,
        changeOrigin: true
      }
    }
  }
};
