window.onload = function() {
  var menu = document.getElementById("menu");
  var li = document.getElementsByTagName("li");
  var win_Width = document.documentElement.clientWidth || document.body.clientWidth;
   var win_height = document.documentElement.clientHeight || document.body.clientHeight;

  //菜单出现位置
  document.addEventListener("contextmenu", function(event) {
    var event = event || window.event;
    var style = menu.style;
    style.display = "block";
    style.left = (win_Width-event.clientX<menu.offsetWidth) ? (event.clientX - menu.offsetWidth + 'px') : ( event.clientX + 'px');
    style.top = (event.clientY+menu.offsetHeight>win_height) ? (event.clientY - menu.offsetHeight + 'px') : (event.clientY + 'px');
    event.preventDefault();
    return false;
  });
  //页面点击后自定义菜单消失
  document.addEventListener( "click",function() {
    menu.style.display = "none"
  });
  
  //点击li弹出innerText
  for(var i = 0; i < li.length; i++) {
    li[i].addEventListener("click", function() {
      alert(this.innerHTML);
    })
  }
};