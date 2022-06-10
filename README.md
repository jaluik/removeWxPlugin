# removeWxPlugin

webpack 插件，可以通过配置去除未使用的`wx.xxxx`方法

## usage

```js
const RemoveWxPlugin = require("remove-wx-plugin");

module.exports = {
  //  webpack ...config
  plugins: [
    new RemoveWxPlugin({
      filterList: [
        "onLocationChange",
        "chooseLocation",
        // ...
      ],
    }),
  ],
};
```

打包的结果中会去除`wx.onLocationChange`、`wx.chooseLocation`等配置的方法
