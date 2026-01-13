const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
});

module.exports = {
  devServer: {
    port: 8080,
    watchFiles: {
      paths: ["src/**/*"], // 只監看 src，不監看 public/data
    },
  },
};
