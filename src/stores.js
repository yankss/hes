const modules = {

};

const requireContext = require.context('./pages', true, /-store\.js$/);
requireContext.keys().forEach((key) => {
  // key 是像这样的字符串  ./building/building-list/building-list-store.js
  const pathParts = key.split('/');
  const modelKey = pathParts[pathParts.length - 1].replace('.js', '').replace(/-([a-z])/g, (match) => match[1].toUpperCase()); // 文件名作为key
  modules[modelKey] = requireContext(key).default;
});
export default modules;
