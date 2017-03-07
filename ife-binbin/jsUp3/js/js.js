//获取ID
var $ = function(id) {
  return typeof id === "string" ? document.getElementById(id) : id;
};

//获取tagName
var $$ = function(tagName, oParent) {
  return (oParent || document).getElementsByTagName(tagName);
};

function addId() {
  var len = $$("box").length;
  for (var i = 0; i < len; i++) {
    $$("box")[i].id = 'box_' + i;
  }
}

// 左侧进入队列
$("left-in").addEventListener("click", function leftIn() {
  var text = $("input").value;
  var node1 = $("num-area").firstChild;
  var data = text.split(/\,|\，|\" "|\n|\s|\t/);

  for (var j = 0; j < data.length; j++) {
    var node = document.createElement("div");
    node.className = "red";
    node.innerHTML = data[j];
    $("num-area").insertBefore(node, node1);
  }
  addId();
});

// 右侧进入队列
$("right-in").addEventListener("click", function rightIn() {
  var text = $("input").value;
  var data = text.split(/\,|\，|\" "|\n|\s|\t/);
  var len = data.length;
  for (var i = 0; i < len; i++) {
    var node = document.createElement("div");
    node.className = "red";
    node.innerHTML = data[i];
    $("num-area").appendChild(node);
  }
  addId();
});

// 左侧出队列
$("left-out").addEventListener("click", function LeftOut() {
  var node = $("num-area");
  node.removeChild(node.childNodes[0]);
});
// 右侧出队列
$("right-out").addEventListener("click", function RightOut() {
  var node = $("num-area");
  var len = $("num-area").getElementsByTagName("div").length;
  node.removeChild(node.childNodes[len - 1]);
});

//查询按钮
function search() {
  var len = $("num-area").getElementsByTagName("div");
  for (var i = 0; i < len.length; i++) {
    var search = $("wantSear").value;
    len[i].innerHTML = len[i].innerText.replace(search, "<strong>" + search + "</strong>");
  }
}
$("search").addEventListener("click", search);
//回车搜索
$("wantSear").addEventListener("keypress", function(event) {
  if (event.keyCode == '13') {
    search();
  }

});