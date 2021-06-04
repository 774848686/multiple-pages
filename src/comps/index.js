/* eslint-disable */
// 自动注入
const context = require.context('./', true, /\.vue$/);
const install = (Vue) => {
  context.keys().forEach((key) => {
    const component = context(key).default;
    Vue.component(component.name, component);
  });
};
const version = '0.0.1'
/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue)
}
export {
    install,
    version,
}
export default {
    install,
    version
}