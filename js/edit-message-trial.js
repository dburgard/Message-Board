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
    };
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4 && xhttp.status == 200){
      window.location.href = '/index.html';
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

  // result true means they clicked OK
  if (result === true) {
    window.location.href = '/';
  } else {
    window.location.href = '/';
  }

  // PSST! Hey you! Yeah, you intrepid student!
  // We're sending them back to the index no matter what they choose.
  // In that case, I didn't have to use an if/else block.
  // But, you might want to use a confirm box somewhere else in your code
  // and I thought this might be handy. HINT HINT!
}

getMessage();