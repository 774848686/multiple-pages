### 多页面进行AB Test的解决方案

#### 需求场景
近期在写一些类似于活动的单个页面产品；觉得这种零碎一点的页面很适合使用多页面这个场景；于是搭建了基于vue-cli 3.0+多页面的项目结构。

#### 项目结构

```
├─src // 项目代码
|   ├── api //接口管理
|   ├── assets // 静态资源     
|   ├── components // 公共的组件        
|   ├── comps // 全局组件
|   ├── directive // 自定义指令 mixins
|   ├── mixins // 公共方法
|   ├── pages // 多页面的主要入口
|   |     ├── 业务组件 // 以各自项目名称命名文件夹 
|   |     └── ...
|   └── utils // 工具方法
├─public // index.html
└─vue.util.js //配置多页面的pages
```

#### 功能介绍
1. 多页面开发
2. 支持rem
3. 可进行不同文件夹单独打包，也可进行全部文件输出
4. 内置挽留逻辑
5. Vue动态组件的使用
6. 防抖指令
7. 解决页面在某些浏览器返回不刷新问题
8. 数据缓存方法封装
9. 版本控制方案

#### 多页面配置

官网配置如下：
```
pages: {
    index: {
      // page 的入口
      entry: 'src/index/main.js',
      // 模板来源
      template: 'public/index.html',
      // 在 dist/index.html 的输出
      filename: 'index.html',
      // 当使用 title 选项时，
      // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      title: 'Index Page',
      // 在这个页面中包含的块，默认情况下会包含
      // 提取出来的通用 chunk 和 vendor chunk。
      chunks: ['chunk-vendors', 'chunk-common', 'index']
    },
    // 当使用只有入口的字符串格式时，
    // 模板会被推导为 `public/subpage.html`
    // 并且如果找不到的话，就回退到 `public/index.html`。
    // 输出文件名会被推导为 `subpage.html`。
    subpage: 'src/subpage/main.js'
  }
```
项目里抽离出`vue.util.js`,动态的实现这段逻辑：

```
exports.pages = function () {
  let entryFiles = glob.sync(pagePath + '/**/*.html')
  let entries = {}

  entryFiles.forEach(filePath => {
    let dirPath = filePath.substring(0, filePath.lastIndexOf('/'))
    let dirName = dirPath.substring(dirPath.lastIndexOf('/') + 1)
    let filename = filePath.substring(filePath.lastIndexOf(startPath) + startPath.length, filePath.lastIndexOf('/'))

    if (filename.endsWith(dirName)) {
      if (projectName && projectName.includes(filename) ) {
        entries[filename] = {
          entry: filePath.substring(0, filePath.lastIndexOf('.html')) + '.js',
          template: filePath.substring(0, filePath.lastIndexOf('.html')) + '.html',
          filename: 'index.html'
        }
      }
      // 默认全部打包
      if (!projectName) {
        entries[filename] = {
          entry: filePath.substring(0, filePath.lastIndexOf('.html')) + '.js',
          template: filePath.substring(0, filePath.lastIndexOf('.html')) + '.html',
        }
      }
    }
  })
  return entries
}
```
#### 场景二 针对同一页面ABTest
- 需求 
<br/>近期为了测试同一个页面上不同元素的效果，则会对这个页面进行不同的定制。刚开始为了图快就会复制之前的项目，这样做我是觉得比较蠢的。这样造成的后果就是一个逻辑改了会维护多个项目，浪费了时间。有没有更好的解决方案呢？我思考了一下，想到了根据环境配置全局变量的方法，然后根据不同的打包命令打包到对应的目录；最后一定要根据不同版本维护一个更新日志！！！

- 实现
vue-cli脚手架提供了一个`环境变量`,可以在项目根目录中放置下列文件来指定环境变量。
```
.env                # 在所有的环境中被载入
.env.local          # 在所有的环境中被载入，但会被 git 忽略
.env.[mode]         # 只在指定的模式中被载入
.env.[mode].local   # 只在指定的模式中被载入，但会被 git 忽略
```
我们可配置一个`.env.lucky`放根目录下，然后在`pacakge.json`配置打包命令`"build:lucky": "vue-cli-service build --mode lucky"`。具体的示例可见demo。

#### 项目记录示例
- 测试页面1
1. 文件目录 lucky 
2. 版本介绍

| 版本号 | 修改内容 | 修改时间 |
| :-----: | ----: | :----: |
| v1 | 页面展示v1版本 | 20210604/18/04 |

- 测试页面2
1. 文件目录 package 
2. 版本介绍

| 版本号 | 修改内容 | 修改时间 |
| :-----: | ----: | :----: |
| v1 | 页面添加挽留弹窗 | 20210604/18/04 |
