function addMessage() {
  var comment = {
    comment: {
      commentText: document.getElementById('commentText').value,
      createdBy: document.getElementById('createdBy').value,
      isImportant: document.getElementById('isImportant').checked
    }
  }
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4 && xhttp.status == 200){
      window.location.href = '/index.html?' + passBackQueryString;
    };

  };
xhttp.open("POST", apiEndpointBase);
xhttp.setRequestHeader('Content-Type', 'application/json');
xhttp.send(JSON.stringify(comment));
  return false;
}

var passBackQueryString; 
//remove message id here
var queryString = window.location.search;
var queryArray = queryString.split('&');
passBackQueryString = '&' + queryArray[1] + "&" + queryArray[2];
console.log(queryString);
console.log(queryArray);