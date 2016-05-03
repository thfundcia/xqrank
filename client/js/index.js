$.get('http://localhost:8888/DAInews',function(data){
  // alert(data);
  //创建数据集
  data = [{
    "name":'CIA-1602-huqy',
    "prevalue":'1.1902',
    "dayrate":'+4.23%',
    "monthrate":"7.25%",
    "totalrate":"19.02%",
    "back":"6.74%",
    "xiapu":"8.74%"
  }, {"name":'CIA-1602-huqy',
      "prevalue":'1.1902',
      "dayrate":'+4.23%',
      "monthrate":"7.25%",
      "totalrate":"19.02%",
      "back":"6.74%",
      "xiapu":"8.74%"
  }, {"name":'CIA-1602-huqy',
      "prevalue":'1.1902',
      "dayrate":'+4.23%',
      "monthrate":"7.25%",
      "totalrate":"19.02%",
      "back":"6.74%",
      "xiapu":"8.74%"
}]
  data.forEach(function(d,i){
    var html = "<tr>\
        <td>"+d.name+"</td>\
        <td>"+d.prevalue+"</td>\
        <td style='color:red ;'>"+d.dayrate+"</td>\
        <td>"+d.monthrate+"</td>\
        <td>"+d.totalrate+"</td>\
        <td>"+d.back+"</td>\
        <td>"+d.xiapu+"</td>\
        </tr>"
    $("#data-list").append(html)
  })
});
