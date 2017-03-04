//获取ID
var $ = function(id) {
  return typeof id === "string" ? document.getElementById(id) : id;
};

//获取tagName
var $$ = function(tagName, oParent) {
  return (oParent || document).getElementsByTagName(tagName);
};

//先获取data数组
var data = [];
var li = $$("li");
//左侧入效果 unshift() 方法可向数组的开头添加一个或更多元素，并返回新的长度。
var leftIn = $("unShift");
var rightIn = $("push");
var leftOut = $("shift");
var rightOut = $("pop");
var sortBtn = $("sort-btn");

/* 创建按钮  */
function createLi() {
  var num = $("num").value;
  if (num < 10 || num > 100) {
    alert("输入的数值不在10-100，请修改");
    return;
  }
  var newNode = document.createElement("li");
  newNode.innerText = num;
  newNode.style.height = (num * 4) + "px";
  return newNode;
}
//绑定点击效果
leftIn.addEventListener('click', function() {
  var newNode = createLi();
  data.unshift($("num").value);
  $$("ul")[0].insertBefore(newNode, $$("li")[0]);
});
rightIn.addEventListener('click', function() {
  var newNode = createLi();
  data.push($("num").value);
  $$("ul")[0].appendChild(newNode);
});

leftOut.addEventListener('click', function() {
  data.shift();
  $$("ul")[0].removeChild($$("li")[0]);
});
rightOut.addEventListener('click', function() {
  var len = $$("li").length - 1;
  data.pop();
  console.log(data)
  $$("ul")[0].removeChild($$("li")[len]);

});
sortBtn.addEventListener('click', function() {
  //quickSort(data);
  data = bubbleSort(data);
});
//显示效果
function showLi(data) {
  var fragment = document.createDocumentFragment();
  if (data.length > 60) {
    alert("超过队列规定限制数量");
    return false;
  }
  $$("ul")[0].innerHTML = "";
  for (var j = 0; j < data.length; j++) {
    var liCreate = document.createElement("li");
    liCreate.style.height = data[j] * 4 + "px";
    liCreate.innerText = data[j];
    fragment.appendChild(liCreate);
    $$("ul")[0].appendChild(fragment);
  }
}

/* 冒泡算法 */
function bubbleSort(arr) {
  var len = arr.length,
    i = 0,
    j = 0;
  var timer = setInterval(function() {
    if (i < len) {
      if (j < len - 1) {
        if (arr[j] > arr[j + 1]) {
          var temp = arr[j + 1];
          arr[j + 1] = arr[j];
          arr[j] = temp;
          showLi(arr);
        }
        j++;
      } else {
        j = 0;
        i++;
      }
    } else {
      clearInterval(timer);
    }
  }, 200);
  return arr;
}

// 快速排序
/* function quickSort(array) {
  var i = 0;
  var j = array.length - 1;

  var Sort = function(i, j) {

    // 结束条件
    if (i == j) {
      return
    };

    var key = array[i];
    var stepi = i; // 记录开始位置
    var stepj = j; // 记录结束位置
    while (j > i) {
      // j <<-------------- 向前查找
      if (array[j] >= key) {
        j--;
      } else {
        array[i] = array[j]
          //i++ ------------>>向后查找
        while (j > ++i) {
          if (array[i] > key) {
            array[j] = array[i];

            break;
          }
        }
      }
    }

    // 如果第一个取出的 key 是最小的数
    if (stepi == i) {
      Sort(++i, stepj);
      return;
    }

    // 最后一个空位留给 key
    array[i] = key;

    // 递归
    Sort(stepi, i);
    Sort(j, stepj);
    showLi(array);
  }

  Sort(i, j);

  return array;
} */


