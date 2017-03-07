//获取ID
var $ = function(id) {
  return typeof id === "string" ? document.getElementById(id) : id;
};

//获取tagName
var $$ = function(tagName, oParent) {
  return (oParent || document).getElementsByTagName(tagName);
};

function createSpan() {
  var num = $("input").value;
  var newNode = document.createElement("span");
  newNode.className = "red";

  if (num === "") {
    alert("put a num");
    return;
  }
  newNode.innerText = num;
  return newNode;
}

function numIn() {
  $("left-in").addEventListener("click", function() {
    var newNode = createSpan();
    $("num-area").insertBefore(newNode, $$("span")[0]);
  });

  $("right-in").addEventListener("click", function() {
    var newNode = createSpan();
    $("num-area").appendChild(newNode);
  });
}

function numOut() {
  $("left-out").addEventListener('click', function() {
  	if (!($$("span").length)) {
    	alert("nothing can be out");
    	return;
  }
    $("num-area").removeChild($$("span")[0]);
  });

  $("right-out").addEventListener('click', function() {
  	if (!($$("span").length)) {
    	alert("nothing can be out");
    	return;
  }
    var len = $$("span").length - 1;
    $("num-area").removeChild($$("span")[len]);
  });
}
window.onload = function() {
  numOut();
  numIn();
}