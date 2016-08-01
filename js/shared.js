var apiEndpointBase = 'http://code-school-comments-api.herokuapp.com/comments';
var importantCommentsEndpoint = 'http://code-school-comments-api.herokuapp.com/important-comments';
var populateDropdownEndpoint = 'http://code-school-comments-api.herokuapp.com/comments-created-by-names';
var createdByEndpoint = 'http://code-school-comments-api.herokuapp.com/comments-by-name/'
function getQueryStringValue (key) {  
  return unescape(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + escape(key).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));  
}