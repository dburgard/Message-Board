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
      backToFormat();
      //window.location.href = '/index.html?' + passBackQueryString;
    };

  };
xhttp.open("POST", apiEndpointBase);
xhttp.setRequestHeader('Content-Type', 'application/json');
xhttp.send(JSON.stringify(comment));
  return false;
}

function backToFormat() {
var passBackQueryString; 
//remove message id here
var queryString = window.location.search;
var queryArray = queryString.split('&');
if (queryArray[1] !== 'table=true'){
passBackQueryString = "&" + queryArray[1] + "&" + queryArray[2];
window.location.href = 'index.html?' + passBackQueryString;
}
else {
passBackQueryString = '&' + queryArray[2] + '&' + queryArray[3];
window.location.href = 'index-with-table.html?' + passBackQueryString; 
}
}

