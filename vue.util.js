const path = require('path')
const glob = require('glob')
const startPath = '/src/pages/'
const pagePath = path.resolve(__dirname, '.' + startPath);
const projectName = process.argv[5];
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
exports.outputDir = function () {
  return projectName ? "dist/" + projectName : 'dist';
}
