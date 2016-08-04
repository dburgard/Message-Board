
function getMessage() {
 
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4 && xhttp.status == 200){
      var comment = JSON.parse(xhttp.responseText);
      document.getElementById('commentText').value = comment.commentText;
      document.getElementById('createdBy').value = comment.createdBy;
      document.getElementById('isImportant').checked = comment.isImportant;
    }
  };

  xhttp.open("GET",apiEndpointBase + '/' + messageId);
  xhttp.send();
}


function editMessage() {
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
      
xhttp.open("PUT", apiEndpointBase + '/' + messageId);
xhttp.setRequestHeader('Content-Type', 'application/json');
xhttp.send(JSON.stringify(comment));
  return false;
  
}

var messageId = getQueryStringValue('messageId');

if (messageId) {
  messageId = parseInt(messageId, 10);
} else {
  var result = confirm("Sorry pal, you can't edit a message unless it's got an id!");
  if (result === true) {
    window.location.href = '/';
  } else {
    window.location.href = '/';
  }
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

getMessage();