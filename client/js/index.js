$.get('http://localhost:8888/DAInews',function(data){
  //创建数据集
  data = [{
    "name":'CIA-1602-huqy',
    "netvalue":'1.1902',
    "dayrate":'+4.23%',
    "monthrate":"7.25%",
    "totalrate":"19.02%",
    "back":"6.74%",
    "xiapu":"8.74%"
  }, {"name":'CIA-1602-qisc',
      "netvalue":'2.1902',
      "dayrate":'+3.23%',
      "monthrate":"4.25%",
      "totalrate":"20.02%",
      "back":"3.74%",
      "xiapu":"2.74%"
  }, {"name":'CIA-1602-huqy',
      "netvalue":'1.1902',
      "dayrate":'+4.23%',
      "monthrate":"7.25%",
      "totalrate":"19.02%",
      "back":"6.74%",
      "xiapu":"8.74%"
}]
  //添加HTML内容
  addHtml(data,"data-list");

  //实现点击效果正序排列
  $("th").each(function(){
    var name = $(this).attr("id");//获取th的ID值
    sortData(data,name);//按照该列进行排序
  })
});



//按照关键字进行排序
function sortData(data,name){
  $("#"+name).click(function(){
    data.sort(getSortFun('desc',name))//对数据进行排序
    $("#data-list").empty();//将data-list的列表清空
    addHtml(data,"data-list");
  })
}
//将排序后的数据添加到标签中
function addHtml(data,id){
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
    $("#"+id).append(html)
  })
}
//排序函数
function getSortFun(order, sortBy) {
  var ordAlpah = (order == 'asc') ? '>' : '<';
  var sortFun = new Function('a', 'b', 'return a.' + sortBy + ordAlpah + 'b.' + sortBy + '?1:-1');
  return sortFun;
}
