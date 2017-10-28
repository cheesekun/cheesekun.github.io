(function (doc, win) {
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function () {
          if(window.navigator.appVersion.indexOf('Android') >= 0 ||
             window.navigator.appVersion.indexOf('iPhone') >= 0 ||
             window.navigator.appVersion.indexOf('iPad') >= 0){
               var clientWidth = docEl.clientWidth;
               if (!clientWidth) return;
               docEl.style.fontSize = 100 * (clientWidth / 750) + 'px';
             }
             else {
               docEl.style.fontSize = '55px';
             }
        };

    // Abort if browser does not support addEventListener
    recalc();
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);


    // var metadom = document.createElement('meta');
    //     metadom.name = 'viewport';
    //     metadom.content = "width=device-width, user-scalable=no, initial-scale="+ 1/window.devicePixelRatio
    //                     + ',minimum-scale=' + 1/window.devicePixelRatio
    //                     + ',maximum-scale=' + 1/window.devicePixelRatio;
    // document.querySelector('head').append(metadom);
})(document, window);
