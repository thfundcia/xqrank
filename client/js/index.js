$.get('http://localhost:53732/comb',function(data){
 
// $("th").click(function(){
//window.location.reload();
//};
// 
 //添加HTML内容
//data.sort(getSortFun('desc',"netvalue"));//对数据进行排序

  addHtml(data,"data-list");

  //实现点击效果正序排列
  $("th").each(function(){
  	
    var name = $(this).attr("id");//获取th的ID值
    sortData(data,name);//按照该列进行排序
  })
});

	$("th").click(function(){ 
		$("th").each(function(i,e){
		  var content =$(this).text();
		  if (content.substr(content.length-1,1) === '▼'){
			 	 $(this).html("<a href='#'>"+content.substr(0,content.length-1)+"</a>");
		   }
		  
		})
		var content = $(this).text();
		if (content.substr(content.length-1,1)!='▼'){
		
			$(this).html("<a href='#'>"+content+"▼</a>");
		}
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
  		var td="<td style='color:red ;'>"+toPercent(d.income_d)+"</td>"
  	}else if(parseFloat(d.income_d)<0){

  		var td="<td style='color:green ;'>"+toPercent(d.income_d)+"</td>"
  	}else{
  		var td="<td style='color:black ;'>"+toPercent(d.income_d)+"</td>"
  	};

	if (parseFloat(d.income_m)>0){
		var income_m="<td style='color:red ;'>"+toPercent(d.income_m)+"</td>"
	}else if(parseFloat(d.income_m)<0){
		var income_m="<td style='color:green ;'>"+toPercent(d.income_m)+"</td>"
	}else{
		var td="<td style='color:black ;'>"+toPercent(d.income_m)+"</td>"
	};
	
		if (parseFloat(d.income_t)>0){
		var tt="<td style='color:red ;'>"+toPercent(d.income_t)+"</td>"
	}else if(parseFloat(d.income_t)<0){
		var tt="<td style='color:green ;'>"+toPercent(d.income_t)+"</td>"
	}else{
		var td="<td style='color:black ;'>"+toPercent(d.income_t)+"</td>"
	};
	


var html = "<tr><td style='width:1px;'>"
        +"<img src='images/"+d.comb_name+".png' height='45px' align='center' /></td>"
        +"<td style='text-align: left;' width='160px'>"+d.comb_name+"</td><td>"
        +d.net_value+"</td>"
        +td+income_m+tt+"<td>"
        +toPercent(d.Max_dd)+"</td><td>"
        +d.index_sharp+"</td>\</tr>"

    $("#"+id).append(html)
})
}

//var html = "<tr>\
//      <td>"+d.comb_name+"</td>\
//      <td>"+d.net_value+"</td>"
//      +td+income_m+"<td>"+toPercent(d.income_t)+"</td>\
//      <td>"+toPercent(d.Max_dd)+"</td>\
//      <td>"+d.index_sharp+"</td>\
//      </tr>"
//  $("#"+id).append(html)
//})
//}

function toPercent(num){
	if (num){
		var percent = (num*100).toString().substr(0,5)+'%'
      	return percent;
	}else{
		return '0%'

	}
}

//排序函数
function getSortFun(order, sortBy) {
  var ordAlpah = (order == 'asc') ? '>' : '<';
 var sortFun = new Function('a', 'b', 'if(a.'+sortBy+'<0 & b.'+sortBy+'<0){return a.' + sortBy + ordAlpah + 'b.' + sortBy + '?-1:1}else{return a.'+sortBy+ordAlpah+'b.'+sortBy+'?1:-1}');
  return sortFun;
}
