const fs = require("fs");

const PluginName = "RemoveUnusedWxPlugin";

class RemoveUnusedWxPlugin {
  constructor(opts) {
    this.opts = opts;
  }

  apply(compiler) {
    const testReg = /\.js$/;
    compiler.hooks.done.tap(PluginName, (stat) => {
      const assets = stat.compilation.assets;
      Object.keys(assets).map((fileName) => {
        const fileObj = assets[fileName];
        if (testReg.test(fileName)) {
          const filepath = fileObj.existsAt;
          if (fs.existsSync(filepath)) {
            fs.readFile(filepath, "utf-8", (err, data) => {
              if (err) {
                console.log(err);
              }
              let result = data;
              this.opts.filterList.forEach((i) => {
                const reg = new RegExp(`wx.${i}`, "g");
                result = result.replace(reg, "undefined");
              });
              if (result !== data) {
                console.log("处理的文件：", fileName);
                fs.writeFile(filepath, result, (err) => {
                  if (err) {
                    console.log("err", err);
                  }
                });
              }
            });
          }
        }
      });
    });
  }
}

module.exports = RemoveUnusedWxPlugin;
