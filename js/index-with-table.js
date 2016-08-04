function getAllMessages() {
  toggleSpinner(true);
  
  var xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function() {
    if (xhttp.readyState === 4) {
      toggleSpinner(false);
      showMessages(xhttp.responseText);
      }
    }

  xhttp.open('GET', apiEndpointBase, true);
  xhttp.send();
  setImportant();
  populateDropdown();
}



function populateDropdown() {
  var fullQueryString = window.location.search;
    if (fullQueryString !== "") {
      var fullQueryArray = fullQueryString.split('&');
      var createdByString = fullQueryArray[2];
      var createdByArray = createdByString.split('=');
      var author = createdByArray[1].replace("%20", " ");
    } 
  var dropdown = document.getElementById('nameDropdown');
  var nameList = [];
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      nameList = JSON.parse(xhttp.responseText);
    }
    for (i=0; i < nameList.length; i++) {
      var opt = document.createElement('option');
      opt.value = nameList[i];
      opt.innerHTML = nameList[i];
      dropdown.appendChild(opt);
      if (author) {
        if (opt.value == author) {
        document.getElementById('nameDropdown').value = author;
        showCreatedBy();
        }
      }  
    }
  } 
  xhttp.open('GET', populateDropdownEndpoint, true);
  xhttp.send();
} 



function setImportant() {
  var queryString = window.location.search;
  var queryArray = queryString.split('&');
  if (queryArray[1] == 'isImportant=true') {
      document.getElementById('importantCheckbox').checked = true;
      showImportant();
  }
  else if (queryArray[1] != 'isImportant=true') {
      document.getElementById('importantCheckbox').checked = false;
  } 
}


function addMessage() {
  var check = document.getElementById('importantCheckbox').checked;
  var author = document.getElementById('nameDropdown').value;
  var pageRecall = '&isImportant=' + check + '&createdBy=' + author; 
  window.location.href = '/add-message.html' + '?' + pageRecall;
}

function editMessage(messageId) {
  var check = document.getElementById('importantCheckbox').checked;
  var author = document.getElementById('nameDropdown').value;
  var pageRecall = '&isImportant=' + check + '&createdBy=' + author; 
  window.location.href = '/edit-message.html?messageId=' + messageId + pageRecall;
}


function deleteMessage(messageId) {
  var result = confirm("Are you sure you want to delete this message?")
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
    window.location.href = '/index-with-table.html';
    }
  }
    
  if (result === true) {
    xhttp.open("DELETE", apiEndpointBase + '/' + messageId);
    xhttp.send();
    
  } else {
    window.location.href = '/index-with-table.html';
  }
  return false;
}

function showImportant() {
  var isChecked = document.getElementById('importantCheckbox').checked;
  var author = document.getElementById('nameDropdown').value;
  if(isChecked === true && author === "Show All") {
     var xhttp = new XMLHttpRequest();
     xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
          showMessages(xhttp.responseText)
        }
      };
      xhttp.open("GET",importantCommentsEndpoint);
      xhttp.send();
  }
  else if (author !== "Show All" && isChecked === true) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (xhttp.readyState == 4 && xhttp.status == 200) {
        showMessages(xhttp.responseText)
      }
  }
  xhttp.open ("GET", importantCommentsEndpoint + "/" + author);
  xhttp.send();
  }
  else {
         showCreatedBy();
  } 
}

function showCreatedBy() {
  var author = document.getElementById('nameDropdown').value;
  var isChecked = document.getElementById('importantCheckbox').checked;
  if (author !== "Show All" && isChecked === false) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (xhttp.readyState == 4 && xhttp.status == 200) {
        showMessages(xhttp.responseText)
      }  
    }
    xhttp.open("GET",createdByEndpoint + author)
    xhttp.send();
  }
  else if (author !== "Show All" && isChecked === true) {
    showImportant();
  }
  else {
    window.location.href = "/index-with-table.html"
  }
}

function normalView(){
var passBackQueryString; 
var queryString = window.location.search;
var queryArray = queryString.split('&');
passBackQueryString = "&" + queryArray[1] + "&" + queryArray[2];
window.location.href = "index.html?" + passBackQueryString;
}

function toggleSpinner(isVisible) {
  document.getElementById('loading').classList[isVisible ? 'add' : 'remove']('visible');
}

function showMessages(messages) {
  if (typeof messages === 'string') {
    messages = JSON.parse(messages);
  }

  
  var messagesTableBody = document.getElementById('messagesTableBody');
  
  messages.forEach(function(message) {
    var messageRow = messagesTableBody.insertRow(0);
    var tdName = messageRow.insertCell(0);
    tdName.className = 'firstColumn';
    var tdImportant = messageRow.insertCell(1);
    tdImportant.className = 'secondColumn';
    var tdMessage = messageRow.insertCell(2);
    tdMessage.className = 'thirdColumn';
    var tdDatetime = messageRow.insertCell(3);
    tdDatetime.className = 'fourthColumn';
    var tdAction = messageRow.insertCell(4);
    tdAction.classname = 'fifthColumn';

    tdName.innerHTML =  message.createdBy;

    tdImportant.innerHTML = (message.isImportant ? '&#160;<span class="label label-danger">IMPORTANT</span>' : ''); 
      

    tdMessage.innerHTML = message.commentText;

    

    // message date
    if (message.createdAt === message.updatedAt) {
      tdDatetime.innerHTML = 'Created ' + moment(message.createdAt).fromNow();
    } else {
      tdDatetime.innerHTML = 'Last updated ' + moment(message.updatedAt).fromNow();
    };

    tdDatetime.classList.add('date');

    tdAction.innerHTML = '<button class="btn btn-danger pull-right" onclick="deleteMessage(' + message.id + ')"><i class="glyphicon glyphicon-trash"></i></button>' +
      '<button class="btn btn-primary pull-right" onclick="editMessage(' + message.id + ')"><i class="glyphicon glyphicon-pencil"></i></button>';

/****************************** Chachi's code!
    // update message div
    messageDiv.classList.add('message');
    messageDiv.innerHTML = messageHtml;
    messageDiv.appendChild(messageTextDiv);
    messageDiv.appendChild(messageDateDiv);

    messagesContainer.appendChild(messageDiv);
  });
*////////////////////////////////////////  
});
}

// This will make sure that all messages are loaded when page is loaded!
getAllMessages();