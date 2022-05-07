# 嘉然主题 Chrome 插件

嘉然，我真的好喜欢你啊，mua，为了你，我要学 React！

## 安装

1. 访问本项目的 [Releases](https://github.com/b9891796435/diana_chrome_extension/releases) 页面，下载 Release 中 Assets 下的`chrome-extension-release.zip` 压缩包。解压后得到 `build` 文件夹

2. 打开 Chrome 浏览器拓展管理页面 `chrome://extensions/` 或 Edge 浏览器拓展管理页面 `edge://extensions/`
3. 打开浏览器扩展程序开发者模式
   - Chrome 浏览器在扩展程序管理页面右上角
   - Edge 浏览器在扩展程序管理页面左侧
4. 点击`加载已解压的拓展程序`，然后选择之前解压出的 `build` 文件夹，点击确定即可。

## 开发

### 安装依赖

```shell
# npm
npm install
# yarn
yarn install
```

### 编译构建

```shell
# npm
npm run build
# yarn
yarn run build
```

构建后产物在 `build/` 目录下

## 特别感谢

图片素材取自<a href="https://www.bilibili.com/video/BV1134y1o7hi">《You&Idol》</a>mv 中，表情包则为 Asoul 微信表情包。部分图标来自<a href="https://github.com/ant-design/ant-design">AntD 开源组件库</a>

~什么？运行错误？小伙伴你好，#摆手#会者不难~

## 在下个版本中会提供/改进的功能

- 主题切换。提供 AS 五人的主题切换,可能由于需要等待新立绘产出而拖延一个版本
- 搜索引擎切换与自定义
- 搜索栏下添加快捷导航
- 右上角海报尝试优化（欢迎各位小伙伴提出优化意见）
- 数个细节修复，包括来自 b 站@Quadry 的工具箱图标复用，对话编辑无效，来自 github@nailinnvshidemao 的拖拽贴图，选中预期外的元素。
