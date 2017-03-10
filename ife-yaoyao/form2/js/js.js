//获取ID
var $ = function(id) {
  return typeof id === "string" ? document.getElementById(id) : id;
};

//获取tagName
var $$ = function(tagName, oParent) {
  return (oParent || document).getElementsByTagName(tagName);
};

var oForm = $("form"),
  oBtn = $("btn"),
  oName = $("name"),
  oPasswd = $("passwd"),
  oRepasswd = $("repasswd"),
  oEmail = $("email"),
  oPhone = $("phone"),
  oTextName = $$("input", oName)[0],
  oTextPw = $$("input", oPasswd)[0],
  oTextRe = $$("input", oRepasswd)[0],
  oTextEmail = $$("input", oEmail)[0],
  oTextPhone = $$("input", oPhone)[0],

  oPName = $$("p", oName)[0],
  oPPasswd = $$("p", oPasswd)[0],
  oPRe = $$("p", oRepasswd)[0],
  oPEmail = $$("p", oEmail)[0],
  oPPhone = $$("p", oPhone)[0];
/* 检查名称 */
function verifyName(value) {
  if (value === "") {
    oTextName.style.borderColor = "red";
    oPName.innerHTML = "名称不能为空";
    oPName.style.color = "red";
  } else if (/^[a-z0-9_-]{6,18}$/.test(value)) {
    oTextName.style.borderColor = "green";
    oPName.innerHTML = "名称格式正确";
    oPName.style.color = "green";
  } else {
    oTextName.style.borderColor = "red";
    oPName.innerHTML = "名称格式有误";
    oPName.style.color = "red";
  }
}

oTextName.addEventListener("focus", function() {
  oTextName.style.borderColor = "#999";
  oPName.style.color = "#999";
  oPName.innerHTML = "必填，长度为4~16个字符";
});

oTextName.addEventListener("blur", function() {
  var value = oTextName.value;
  verifyName(value);
});
/* 检查密码 */

function verifyPw(value) {
  if (value === "") {
    oTextPw.style.borderColor = "red";
    oPPasswd.innerHTML = "密码不能为空";
    oPPasswd.style.color = "red";
  } else if (/^[a-z0-9_-]{6,18}$/.test(value)) {
    oTextPw.style.borderColor = "green";
    oPPasswd.innerHTML = "密码可用";
    oPPasswd.style.color = "green";
  } else {
    oTextPw.style.borderColor = "red";
    oPPasswd.innerHTML = "密码格式有误";
    oPPasswd.style.color = "red";
  }
}

oTextPw.addEventListener("focus", function() {
  oTextPw.style.borderColor = "#999";
  oPPasswd.style.color = "#999";
  oPPasswd.innerHTML = "必填，长度为6~18个字符";
});

oTextPw.addEventListener("blur", function() {
  var value = oTextPw.value;
  verifyPw(value);
  //oP.innerHTML = "";
});
/* 密码确认 */

function verifyRe(value) {
  var value1 = oTextPw.value;
  if (value === "") {
    oTextRe.style.borderColor = "red";
    oPRe.innerHTML = "密码不能为空";
    oPRe.style.color = "red";
  } else if (value === value1) {
    oTextRe.style.borderColor = "green";
    oPRe.innerHTML = "密码可用";
    oPRe.style.color = "green";
  } else {
    oTextPw.style.borderColor = "red";
    oPRe.innerHTML = "密码不一致";
    oPRe.style.color = "red";
  }
}

oTextRe.addEventListener("focus", function() {
  oTextRe.style.borderColor = "#999";
  oPRe.style.color = "#999";
  oPRe.innerHTML = "再次输入相同密码";
});

oTextRe.addEventListener("blur", function() {
  var value = oTextRe.value;
  verifyRe(value);
  //oP.innerHTML = "";
});

/* 检查邮箱 */

function verifyEmail(value) {
  if (value === "") {
    oTextEmail.style.borderColor = "red";
    oPEmail.innerHTML = "邮箱不能为空";
    oPEmail.style.color = "red";
  } else if (/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(value)) {
    oTextEmail.style.borderColor = "green";
    oPEmail.innerHTML = "邮箱可用";
    oPPasswd.style.color = "green";
  } else {
    oTextEmail.style.borderColor = "red";
    oPEmail.innerHTML = "邮箱格式有误";
    oPEmail.style.color = "red";
  }
}

oTextEmail.addEventListener("focus", function() {
  oTextEmail.style.borderColor = "#999";
  oPEmail.style.color = "#999";
  oPEmail.innerHTML = "必填，长度为6~18个字符";
});

oTextEmail.addEventListener("blur", function() {
  var value = oTextEmail.value;
  verifyEmail(value);
  //oP.innerHTML = "";
});

/* 检查手机 */

function verifyPhone(value) {
  if (value === "") {
    oTextPhone.style.borderColor = "red";
    oPPhone.innerHTML = "手机不能为空";
    oPPhone.style.color = "red";
  } else if (/^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/.test(value)) {
    oTextPhone.style.borderColor = "green";
    oPPhone.innerHTML = "手机可用";
    oPPhone.style.color = "green";
  } else {
    oTextPhone.style.borderColor = "red";
    oPPhone.innerHTML = "手机格式有误";
    oPPhone.style.color = "red";
  }
}

oTextPhone.addEventListener("focus", function() {
  oTextPhone.style.borderColor = "#999";
  oPPhone.style.color = "#999";
  oPPhone.innerHTML = "必填，长度为11个字符";
});

oTextPhone.addEventListener("blur", function() {
  var value = oTextPhone.value;
  verifyPhone(value);
  //oP.innerHTML = "";
});

oBtn.addEventListener("click", function() {
  var textBorder = $$("input");
  for (var i = 0; i < textBorder.length - 2; i++) {
    if (textBorder[i].style.borderColor !== "green") {
      alert("输入有误");
      return;
    }
  }
  alert("提交成功");
})

/* 全表单验证，没必要 */
/* oForm.addEventListener("click", function() {
  oPName.innerHTML = "必填，长度为4~16个字符";
  oPPasswd.innerHTML = "必填，长度为6~18个字符";
  oPRe.innerHTML = "再次输入相同密码";
  oPEmail.innerHTML = "必填，长度为6~18个字符";
  oPPhone.innerHTML = "必填，长度为11个字符";
});
oForm.addEventListener("blur", function() {
  var valueName = oTextName.value;
  var valuePw = oTextPw.value;
  var valueRe = oTextRe.value;
  var valueEmail = oTextEmail.value;
  var valuePhone = oTextPhone.value;
  verifyName(valueName);
  verifyPw(valuePw);
  verifyRe(valueRe);
  verifyEmail(valueEmail);
  verifyPhone(valuePhone);

}); */