$(document).ready(function() {
  //JS SDK 只适合于支持JSONP格式的聚合数据接口 
  //JS SDK 调用数据会使您的APPKEY处于暴露状态，请慎用 

  $("#up").click(function() {
    var cityName = $("#cityName").val();
    var url = 'http://op.juhe.cn/onebox/weather/query';
    /*var json_a = {};
    json_a.cityname =cityName,
    json_a.dtype ="jsonp",
    json_a.key = "ffd1cb401f9a185914db7bbd7fa2595a";*/ //这是json的另一种写法
    var json = {
        "cityname": cityName,
        "dtype": "jsonp",
        "key": "ffd1cb401f9a185914db7bbd7fa2595a"
      } //json在外部定义好再传吧哈哈哈
    $.getJSON(url + "?callback=?", json
      //"cityname" : $("#cityName").val(),   
      //"dtype" : "jsonp",    
      //"key" : "ffd1cb401f9a185914db7bbd7fa2595a" 
      ,
      function(data) {
        var errorcode = data.error_code;
        if (errorcode == 0) {
          //数据正常返回  
          var realtime = data.result.data.realtime, //当日天气情况
            weather = data.result.data.realtime.weather; //未来7天天气情况

          var date = realtime.date,
            city_name = realtime.city_name,
            time = realtime.time,
            temperature = weather.temperature,
            humidity = weather.humidity,
            info = weather.info;

          $('.date').html(date);
          $('.city_name').html(city_name);
          $('.time').html(time);
          $('.temperature').html(temperature);
          $('.humidity').html(humidity);
          $('.info').html(info);

          var lifeInfo = data.result.data.life.info; //当日生活情况                           
          var chuanyi = lifeInfo.chuanyi,
            ganmao = lifeInfo.ganmao,
            kongtiao = lifeInfo.kongtiao,
            xiche = lifeInfo.xiche,
            yundong = lifeInfo.yundong,
            ziwaixian = lifeInfo.ziwaixian;
          console.log(ziwaixian);
          $('.chuanyi').html(chuanyi);
          $('.ganmao').html(ganmao);
          $('.wuran').html(kongtiao);
          $('.xiche').html(xiche);
          $('.yundong').html(yundong);
          $('.ziwaixian').html(ziwaixian);

        } else {
          alert(data.error_code);
          //alert(data.result.data.realtime.weather.temperature);
        }
        //分割线
        /* var temperature = data.result.data.realtime.weather.temperature;
           $('#weather').html(temperature);
              //alert(address);     
                }else{     
                  
                alert(data.error_code);       
                }   */
      });
  });
  $('#cityName').keypress(function(event) {
    if (event.keyCode == '13') {
      $('#up').trigger('click');
    }
  })
})