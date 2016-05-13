$.get('http://localhost:8888/comb',function(data){
 //添加HTML内容
      data.sort(getSortFun('desc',"netvalue"))//对数据进行排序
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
  	
  	if (parseFloat(d.income_d)>0){
  		var td="<td style='color:red ;'>"+d.income_d+"</td>"
  	}else{
  		var td="<td style='color:green ;'>"+d.income_d+"</td>"
  	};
  	
	if (parseFloat(d.income_m)>0){
		var income_m="<td style='color:red ;'>"+d.income_m+"</td>"
	}else{
		var income_m="<td style='color:green ;'>"+d.income_m+"</td>"
	};
	
    var html = "<tr>\
        <td>"+d.comb_name+"</td>\
        <td>"+d.net_value+"</td>"
        +td+income_m+"<td>"+d.income_t+"</td>\
        <td>"+d.Max_dd+"</td>\
        <td>"+d.index_sharp+"</td>\
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
