export function getQueryVariable(variable) {
  let query =  window.location.search.substring(1);
  if(window.location.hash){
    query = '?'+window.location.hash.split('?');
  }
  let vars = query.split("&");
  for (var i = 0; i < vars.length; i++) {
    let pair = vars[i].split("=");
    if (pair[0] == variable) {
      return pair[1];
    }
  }
  return '';
}
