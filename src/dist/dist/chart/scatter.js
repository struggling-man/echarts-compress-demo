define("echarts/chart/scatter",["require","../component/base","./base","../util/shape/Symbol","../component/axis","../component/grid","../component/dataZoom","../component/dataRange","../config","zrender/tool/util","zrender/tool/color","../chart"],function(e){function t(e,t,a,o,r){i.call(this,e,t,a,o,r),n.call(this),this.refresh(o)}var i=e("../component/base"),n=e("./base"),a=e("../util/shape/Symbol");e("../component/axis"),e("../component/grid"),e("../component/dataZoom"),e("../component/dataRange");var o=e("../config"),r=e("zrender/tool/util"),s=e("zrender/tool/color");return t.prototype={type:o.CHART_TYPE_SCATTER,_buildShape:function(){var e=this.series;this._sIndex2ColorMap={},this._symbol=this.option.symbolList,this._sIndex2ShapeMap={},this.selectedMap={},this.xMarkMap={};for(var t,i,n,a,r=this.component.legend,l=[],h=0,d=e.length;d>h;h++)if(t=e[h],i=t.name,t.type===o.CHART_TYPE_SCATTER){if(e[h]=this.reformOption(e[h]),this.legendHoverLink=e[h].legendHoverLink||this.legendHoverLink,this._sIndex2ShapeMap[h]=this.query(t,"symbol")||this._symbol[h%this._symbol.length],r){if(this.selectedMap[i]=r.isSelected(i),this._sIndex2ColorMap[h]=s.alpha(r.getColor(i),.5),n=r.getItemShape(i)){var a=this._sIndex2ShapeMap[h];n.style.brushType=a.match("empty")?"stroke":"both",a=a.replace("empty","").toLowerCase(),a.match("rectangle")&&(n.style.x+=Math.round((n.style.width-n.style.height)/2),n.style.width=n.style.height),a.match("star")&&(n.style.n=a.replace("star","")-0||5,a="star"),a.match("image")&&(n.style.image=a.replace(new RegExp("^image:\\/\\/"),""),n.style.x+=Math.round((n.style.width-n.style.height)/2),n.style.width=n.style.height,a="image"),n.style.iconType=a,r.setItemShape(i,n)}}else this.selectedMap[i]=!0,this._sIndex2ColorMap[h]=s.alpha(this.zr.getColor(h),.5);this.selectedMap[i]&&l.push(h)}this._buildSeries(l),this.addShapeList()},_buildSeries:function(e){if(0!==e.length){for(var t,i,n,a,o,r,s,l,h=this.series,d={},m=0,c=e.length;c>m;m++)if(t=e[m],i=h[t],0!==i.data.length){o=this.component.xAxis.getAxis(i.xAxisIndex||0),r=this.component.yAxis.getAxis(i.yAxisIndex||0),d[t]=[];for(var p=0,u=i.data.length;u>p;p++)n=i.data[p],a=null!=n?null!=n.value?n.value:n:"-","-"===a||a.length<2||(s=o.getCoord(a[0]),l=r.getCoord(a[1]),d[t].push([s,l,p,n.name||""]));this.xMarkMap[t]=this._markMap(o,r,i.data,d[t]),this.buildMark(t)}this._buildPointList(d)}},_markMap:function(e,t,i,n){for(var a,o={min0:Number.POSITIVE_INFINITY,max0:Number.NEGATIVE_INFINITY,sum0:0,counter0:0,average0:0,min1:Number.POSITIVE_INFINITY,max1:Number.NEGATIVE_INFINITY,sum1:0,counter1:0,average1:0},r=0,s=n.length;s>r;r++)a=i[n[r][2]].value||i[n[r][2]],o.min0>a[0]&&(o.min0=a[0],o.minY0=n[r][1],o.minX0=n[r][0]),o.max0<a[0]&&(o.max0=a[0],o.maxY0=n[r][1],o.maxX0=n[r][0]),o.sum0+=a[0],o.counter0++,o.min1>a[1]&&(o.min1=a[1],o.minY1=n[r][1],o.minX1=n[r][0]),o.max1<a[1]&&(o.max1=a[1],o.maxY1=n[r][1],o.maxX1=n[r][0]),o.sum1+=a[1],o.counter1++;var l=this.component.grid.getX(),h=this.component.grid.getXend(),d=this.component.grid.getY(),m=this.component.grid.getYend();o.average0=(o.sum0/o.counter0).toFixed(2)-0;var c=e.getCoord(o.average0);o.averageLine0=[[c,m],[c,d]],o.minLine0=[[o.minX0,m],[o.minX0,d]],o.maxLine0=[[o.maxX0,m],[o.maxX0,d]],o.average1=(o.sum1/o.counter1).toFixed(2)-0;var p=t.getCoord(o.average1);return o.averageLine1=[[l,p],[h,p]],o.minLine1=[[l,o.minY1],[h,o.minY1]],o.maxLine1=[[l,o.maxY1],[h,o.maxY1]],o},_buildPointList:function(e){var t,i,n,a,o=this.series;for(var r in e)if(t=o[r],i=e[r],t.large&&t.data.length>t.largeThreshold)this.shapeList.push(this._getLargeSymbol(i,this.getItemStyleColor(this.query(t,"itemStyle.normal.color"),r,-1)||this._sIndex2ColorMap[r]));else for(var s=0,l=i.length;l>s;s++)n=i[s],a=this._getSymbol(r,n[2],n[3],n[0],n[1]),a&&this.shapeList.push(a)},_getSymbol:function(e,t,i,n,a){var o,r=this.series,s=r[e],l=s.data[t],h=this.component.dataRange;if(h){if(o=isNaN(l[2])?this._sIndex2ColorMap[e]:h.getColor(l[2]),!o)return null}else o=this._sIndex2ColorMap[e];var d=this.getSymbolShape(s,e,l,t,i,n,a,this._sIndex2ShapeMap[e],o,"rgba(0,0,0,0)","vertical");return d.zlevel=this._zlevelBase,d._main=!0,d},_getLargeSymbol:function(e,t){return new a({zlevel:this._zlevelBase,_main:!0,hoverable:!1,style:{pointList:e,color:t,strokeColor:t},highlightStyle:{pointList:[]}})},getMarkCoord:function(e,t){var i,n=this.series[e],a=this.xMarkMap[e],o=this.component.xAxis.getAxis(n.xAxisIndex),r=this.component.yAxis.getAxis(n.yAxisIndex);if(!t.type||"max"!==t.type&&"min"!==t.type&&"average"!==t.type)i=["string"!=typeof t.xAxis&&o.getCoordByIndex?o.getCoordByIndex(t.xAxis||0):o.getCoord(t.xAxis||0),"string"!=typeof t.yAxis&&r.getCoordByIndex?r.getCoordByIndex(t.yAxis||0):r.getCoord(t.yAxis||0)];else{var s=null!=t.valueIndex?t.valueIndex:1;i=[a[t.type+"X"+s],a[t.type+"Y"+s],a[t.type+"Line"+s],a[t.type+s]]}return i},refresh:function(e){e&&(this.option=e,this.series=e.series),this.backupShapeList(),this._buildShape()},ondataRange:function(e,t){this.component.dataRange&&(this.refresh(),t.needRefresh=!0)}},r.inherits(t,n),r.inherits(t,i),e("../chart").define("scatter",t),t}),define("echarts/component/dataRange",["require","./base","zrender/shape/Text","zrender/shape/Rectangle","../util/shape/HandlePolygon","../config","zrender/tool/util","zrender/tool/event","zrender/tool/area","zrender/tool/color","../component"],function(e){function t(e,t,n,a,o){if("undefined"==typeof this.query(a,"dataRange.min")||"undefined"==typeof this.query(a,"dataRange.max"))return void console.error("option.dataRange.min or option.dataRange.max has not been defined.");i.call(this,e,t,n,a,o);var s=this;s._ondrift=function(e,t){return s.__ondrift(this,e,t)},s._ondragend=function(){return s.__ondragend()},s._dataRangeSelected=function(e){return s.__dataRangeSelected(e)},s._dispatchHoverLink=function(e){return s.__dispatchHoverLink(e)},s._onhoverlink=function(e){return s.__onhoverlink(e)},this._selectedMap={},this._range={},this.refresh(a),t.bind(r.EVENT.HOVER,this._onhoverlink)}var i=e("./base"),n=e("zrender/shape/Text"),a=e("zrender/shape/Rectangle"),o=e("../util/shape/HandlePolygon"),r=e("../config"),s=e("zrender/tool/util"),l=e("zrender/tool/event"),h=e("zrender/tool/area"),d=e("zrender/tool/color");return t.prototype={type:r.COMPONENT_TYPE_DATARANGE,_textGap:10,_buildShape:function(){if(this._itemGroupLocation=this._getItemGroupLocation(),this._buildBackground(),this.dataRangeOption.splitNumber<=0||this.dataRangeOption.calculable?this._buildGradient():this._buildItem(),this.dataRangeOption.show)for(var e=0,t=this.shapeList.length;t>e;e++)this.zr.addShape(this.shapeList[e]);this._syncShapeFromRange()},_buildItem:function(){var e,t,i,o,r=this._valueTextList,s=r.length,l=this.getFont(this.dataRangeOption.textStyle),d=this._itemGroupLocation.x,m=this._itemGroupLocation.y,c=this.dataRangeOption.itemWidth,p=this.dataRangeOption.itemHeight,u=this.dataRangeOption.itemGap,V=h.getTextHeight("国",l);"vertical"==this.dataRangeOption.orient&&"right"==this.dataRangeOption.x&&(d=this._itemGroupLocation.x+this._itemGroupLocation.width-c);var U=!0;this.dataRangeOption.text&&(U=!1,this.dataRangeOption.text[0]&&(i=this._getTextShape(d,m,this.dataRangeOption.text[0]),"horizontal"==this.dataRangeOption.orient?d+=h.getTextWidth(this.dataRangeOption.text[0],l)+this._textGap:(m+=V+this._textGap,i.style.y+=V/2+this._textGap,i.style.textBaseline="bottom"),this.shapeList.push(new n(i))));for(var g=0;s>g;g++)e=r[g],o=this.getColorByIndex(g),t=this._getItemShape(d,m,c,p,this._selectedMap[g]?o:"#ccc"),t._idx=g,t.onmousemove=this._dispatchHoverLink,t.onclick=this._dataRangeSelected,this.shapeList.push(new a(t)),U&&(i={zlevel:this._zlevelBase,style:{x:d+c+5,y:m,color:this._selectedMap[g]?this.dataRangeOption.textStyle.color:"#ccc",text:r[g],textFont:l,textBaseline:"top"},highlightStyle:{brushType:"fill"},clickable:!0},"vertical"==this.dataRangeOption.orient&&"right"==this.dataRangeOption.x&&(i.style.x-=c+10,i.style.textAlign="right"),i._idx=g,i.onclick=this._dataRangeSelected,this.shapeList.push(new n(i))),"horizontal"==this.dataRangeOption.orient?d+=c+(U?5:0)+(U?h.getTextWidth(e,l):0)+u:m+=p+u;!U&&this.dataRangeOption.text[1]&&("horizontal"==this.dataRangeOption.orient?d=d-u+this._textGap:m=m-u+this._textGap,i=this._getTextShape(d,m,this.dataRangeOption.text[1]),"horizontal"!=this.dataRangeOption.orient&&(i.style.y-=5,i.style.textBaseline="top"),this.shapeList.push(new n(i)))},_buildGradient:function(){var t,i,o=this.getFont(this.dataRangeOption.textStyle),r=this._itemGroupLocation.x,s=this._itemGroupLocation.y,l=this.dataRangeOption.itemWidth,d=this.dataRangeOption.itemHeight,m=h.getTextHeight("国",o),c=!0;this.dataRangeOption.text&&(c=!1,this.dataRangeOption.text[0]&&(i=this._getTextShape(r,s,this.dataRangeOption.text[0]),"horizontal"==this.dataRangeOption.orient?r+=h.getTextWidth(this.dataRangeOption.text[0],o)+this._textGap:(s+=m+this._textGap,i.style.y+=m/2+this._textGap,i.style.textBaseline="bottom"),this.shapeList.push(new n(i))));for(var p=e("zrender/tool/color"),u=1/(this.dataRangeOption.color.length-1),V=[],U=0,g=this.dataRangeOption.color.length;g>U;U++)V.push([U*u,this.dataRangeOption.color[U]]);"horizontal"==this.dataRangeOption.orient?(t={zlevel:this._zlevelBase,style:{x:r,y:s,width:10*l,height:d,color:p.getLinearGradient(r,s,r+10*l,s,V)},hoverable:!1},r+=10*l+this._textGap):(t={zlevel:this._zlevelBase,style:{x:r,y:s,width:l,height:10*d,color:p.getLinearGradient(r,s,r,s+10*d,V)},hoverable:!1},s+=10*d+this._textGap),this.shapeList.push(new a(t)),this._calculableLocation=t.style,this.dataRangeOption.calculable&&(this._buildFiller(),this._bulidMask(),this._bulidHandle()),this._buildIndicator(),!c&&this.dataRangeOption.text[1]&&(i=this._getTextShape(r,s,this.dataRangeOption.text[1]),this.shapeList.push(new n(i)))},_buildIndicator:function(){var e,t,i=this._calculableLocation.x,n=this._calculableLocation.y,a=this._calculableLocation.width,r=this._calculableLocation.height,s=5;"horizontal"==this.dataRangeOption.orient?"bottom"!=this.dataRangeOption.y?(e=[[i,n+r],[i-s,n+r+s],[i+s,n+r+s]],t="bottom"):(e=[[i,n],[i-s,n-s],[i+s,n-s]],t="top"):"right"!=this.dataRangeOption.x?(e=[[i+a,n],[i+a+s,n-s],[i+a+s,n+s]],t="right"):(e=[[i,n],[i-s,n-s],[i-s,n+s]],t="left"),this._indicatorShape={style:{pointList:e,color:"#fff",__rect:{x:Math.min(e[0][0],e[1][0]),y:Math.min(e[0][1],e[1][1]),width:s*("horizontal"==this.dataRangeOption.orient?2:1),height:s*("horizontal"==this.dataRangeOption.orient?1:2)}},highlightStyle:{brushType:"fill",textPosition:t,textColor:this.dataRangeOption.textStyle.color},hoverable:!1},this._indicatorShape=new o(this._indicatorShape)},_buildFiller:function(){this._fillerShape={zlevel:this._zlevelBase+1,style:{x:this._calculableLocation.x,y:this._calculableLocation.y,width:this._calculableLocation.width,height:this._calculableLocation.height,color:"rgba(255,255,255,0)"},highlightStyle:{strokeColor:"rgba(255,255,255,0.5)",lineWidth:1},draggable:!0,ondrift:this._ondrift,ondragend:this._ondragend,onmousemove:this._dispatchHoverLink,_type:"filler"},this._fillerShape=new a(this._fillerShape),this.shapeList.push(this._fillerShape)},_bulidHandle:function(){var e,t,i,n,a,r,s,l,d=this._calculableLocation.x,m=this._calculableLocation.y,c=this._calculableLocation.width,p=this._calculableLocation.height,u=this.getFont(this.dataRangeOption.textStyle),V=h.getTextHeight("国",u),U=Math.max(h.getTextWidth(this._textFormat(this.dataRangeOption.max),u),h.getTextWidth(this._textFormat(this.dataRangeOption.min),u))+2;"horizontal"==this.dataRangeOption.orient?"bottom"!=this.dataRangeOption.y?(e=[[d,m],[d,m+p+V],[d-V,m+p+V],[d-1,m+p],[d-1,m]],t=d-U/2-V,i=m+p+V/2+2,n={x:d-U-V,y:m+p,width:U+V,height:V},a=[[d+c,m],[d+c,m+p+V],[d+c+V,m+p+V],[d+c+1,m+p],[d+c+1,m]],r=d+c+U/2+V,s=i,l={x:d+c,y:m+p,width:U+V,height:V}):(e=[[d,m+p],[d,m-V],[d-V,m-V],[d-1,m],[d-1,m+p]],t=d-U/2-V,i=m-V/2-2,n={x:d-U-V,y:m-V,width:U+V,height:V},a=[[d+c,m+p],[d+c,m-V],[d+c+V,m-V],[d+c+1,m],[d+c+1,m+p]],r=d+c+U/2+V,s=i,l={x:d+c,y:m-V,width:U+V,height:V}):(U+=V,"right"!=this.dataRangeOption.x?(e=[[d,m],[d+c+V,m],[d+c+V,m-V],[d+c,m-1],[d,m-1]],t=d+c+U/2+V/2,i=m-V/2,n={x:d+c,y:m-V,width:U+V,height:V},a=[[d,m+p],[d+c+V,m+p],[d+c+V,m+V+p],[d+c,m+1+p],[d,m+p+1]],r=t,s=m+p+V/2,l={x:d+c,y:m+p,width:U+V,height:V}):(e=[[d+c,m],[d-V,m],[d-V,m-V],[d,m-1],[d+c,m-1]],t=d-U/2-V/2,i=m-V/2,n={x:d-U-V,y:m-V,width:U+V,height:V},a=[[d+c,m+p],[d-V,m+p],[d-V,m+V+p],[d,m+1+p],[d+c,m+p+1]],r=t,s=m+p+V/2,l={x:d-U-V,y:m+p,width:U+V,height:V})),this._startShape={style:{pointList:e,text:this._textFormat(this.dataRangeOption.max),textX:t,textY:i,color:this.getColor(this.dataRangeOption.max),rect:n,x:e[0][0],y:e[0][1],_x:e[0][0],_y:e[0][1]}},this._startShape.highlightStyle={strokeColor:this._startShape.style.color,lineWidth:1},this._endShape={style:{pointList:a,text:this._textFormat(this.dataRangeOption.min),textX:r,textY:s,color:this.getColor(this.dataRangeOption.min),rect:l,x:a[0][0],y:a[0][1],_x:a[0][0],_y:a[0][1]}},this._endShape.highlightStyle={strokeColor:this._endShape.style.color,lineWidth:1},this._startShape.zlevel=this._endShape.zlevel=this._zlevelBase+1,this._startShape.draggable=this._endShape.draggable=!0,this._startShape.ondrift=this._endShape.ondrift=this._ondrift,this._startShape.ondragend=this._endShape.ondragend=this._ondragend,this._startShape.style.textColor=this._endShape.style.textColor=this.dataRangeOption.textStyle.color,this._startShape.style.textAlign=this._endShape.style.textAlign="center",this._startShape.style.textPosition=this._endShape.style.textPosition="specific",this._startShape.style.textBaseline=this._endShape.style.textBaseline="middle",this._startShape.style.width=this._endShape.style.width=0,this._startShape.style.height=this._endShape.style.height=0,this._startShape.style.textPosition=this._endShape.style.textPosition="specific",this._startShape=new o(this._startShape),this._endShape=new o(this._endShape),this.shapeList.push(this._startShape),this.shapeList.push(this._endShape)},_bulidMask:function(){var e=this._calculableLocation.x,t=this._calculableLocation.y,i=this._calculableLocation.width,n=this._calculableLocation.height;this._startMask={zlevel:this._zlevelBase+1,style:{x:e,y:t,width:"horizontal"==this.dataRangeOption.orient?0:i,height:"horizontal"==this.dataRangeOption.orient?n:0,color:"#ccc"},hoverable:!1},this._endMask={zlevel:this._zlevelBase+1,style:{x:"horizontal"==this.dataRangeOption.orient?e+i:e,y:"horizontal"==this.dataRangeOption.orient?t:t+n,width:"horizontal"==this.dataRangeOption.orient?0:i,height:"horizontal"==this.dataRangeOption.orient?n:0,color:"#ccc"},hoverable:!1},this._startMask=new a(this._startMask),this._endMask=new a(this._endMask),this.shapeList.push(this._startMask),this.shapeList.push(this._endMask)},_buildBackground:function(){var e=this.reformCssArray(this.dataRangeOption.padding);this.shapeList.push(new a({zlevel:this._zlevelBase,hoverable:!1,style:{x:this._itemGroupLocation.x-e[3],y:this._itemGroupLocation.y-e[0],width:this._itemGroupLocation.width+e[3]+e[1],height:this._itemGroupLocation.height+e[0]+e[2],brushType:0===this.dataRangeOption.borderWidth?"fill":"both",color:this.dataRangeOption.backgroundColor,strokeColor:this.dataRangeOption.borderColor,lineWidth:this.dataRangeOption.borderWidth}}))},_getItemGroupLocation:function(){var e=this._valueTextList,t=e.length,i=this.dataRangeOption.itemGap,n=this.dataRangeOption.itemWidth,a=this.dataRangeOption.itemHeight,o=0,r=0,s=this.getFont(this.dataRangeOption.textStyle),l=h.getTextHeight("国",s);if("horizontal"==this.dataRangeOption.orient){if(this.dataRangeOption.text||this.dataRangeOption.splitNumber<=0||this.dataRangeOption.calculable)o=(this.dataRangeOption.splitNumber<=0||this.dataRangeOption.calculable?10*n+i:t*(n+i))+(this.dataRangeOption.text&&"undefined"!=typeof this.dataRangeOption.text[0]?h.getTextWidth(this.dataRangeOption.text[0],s)+this._textGap:0)+(this.dataRangeOption.text&&"undefined"!=typeof this.dataRangeOption.text[1]?h.getTextWidth(this.dataRangeOption.text[1],s)+this._textGap:0);else{n+=5;for(var d=0;t>d;d++)o+=n+h.getTextWidth(e[d],s)+i}o-=i,r=Math.max(l,a)}else{var m;if(this.dataRangeOption.text||this.dataRangeOption.splitNumber<=0||this.dataRangeOption.calculable)r=(this.dataRangeOption.splitNumber<=0||this.dataRangeOption.calculable?10*a+i:t*(a+i))+(this.dataRangeOption.text&&"undefined"!=typeof this.dataRangeOption.text[0]?this._textGap+l:0)+(this.dataRangeOption.text&&"undefined"!=typeof this.dataRangeOption.text[1]?this._textGap+l:0),m=Math.max(h.getTextWidth(this.dataRangeOption.text&&this.dataRangeOption.text[0]||"",s),h.getTextWidth(this.dataRangeOption.text&&this.dataRangeOption.text[1]||"",s)),o=Math.max(n,m);else{r=(a+i)*t,n+=5,m=0;for(var d=0;t>d;d++)m=Math.max(m,h.getTextWidth(e[d],s));o=n+m}r-=i}var c,p=this.reformCssArray(this.dataRangeOption.padding),u=this.zr.getWidth();switch(this.dataRangeOption.x){case"center":c=Math.floor((u-o)/2);break;case"left":c=p[3]+this.dataRangeOption.borderWidth;break;case"right":c=u-o-p[1]-this.dataRangeOption.borderWidth;break;default:c=this.parsePercent(this.dataRangeOption.x,u),c=isNaN(c)?0:c}var V,U=this.zr.getHeight();switch(this.dataRangeOption.y){case"top":V=p[0]+this.dataRangeOption.borderWidth;break;case"bottom":V=U-r-p[2]-this.dataRangeOption.borderWidth;break;case"center":V=Math.floor((U-r)/2);break;default:V=this.parsePercent(this.dataRangeOption.y,U),V=isNaN(V)?0:V}if(this.dataRangeOption.calculable){var g=Math.max(h.getTextWidth(this.dataRangeOption.max,s),h.getTextWidth(this.dataRangeOption.min,s))+l;"horizontal"==this.dataRangeOption.orient?(g>c&&(c=g),c+o+g>u&&(c-=g)):(l>V&&(V=l),V+r+l>U&&(V-=l))}return{x:c,y:V,width:o,height:r}},_getTextShape:function(e,t,i){return{zlevel:this._zlevelBase,style:{x:"horizontal"==this.dataRangeOption.orient?e:this._itemGroupLocation.x+this._itemGroupLocation.width/2,y:"horizontal"==this.dataRangeOption.orient?this._itemGroupLocation.y+this._itemGroupLocation.height/2:t,color:this.dataRangeOption.textStyle.color,text:i,textFont:this.getFont(this.dataRangeOption.textStyle),textBaseline:"horizontal"==this.dataRangeOption.orient?"middle":"top",textAlign:"horizontal"==this.dataRangeOption.orient?"left":"center"},hoverable:!1}},_getItemShape:function(e,t,i,n,a){return{zlevel:this._zlevelBase,style:{x:e,y:t+1,width:i,height:n-2,color:a},highlightStyle:{strokeColor:a,lineWidth:1},clickable:!0}},__ondrift:function(e,t,i){var n=this._calculableLocation.x,a=this._calculableLocation.y,o=this._calculableLocation.width,r=this._calculableLocation.height;return"horizontal"==this.dataRangeOption.orient?e.style.x+t<=n?e.style.x=n:e.style.x+t+e.style.width>=n+o?e.style.x=n+o-e.style.width:e.style.x+=t:e.style.y+i<=a?e.style.y=a:e.style.y+i+e.style.height>=a+r?e.style.y=a+r-e.style.height:e.style.y+=i,"filler"==e._type?this._syncHandleShape():this._syncFillerShape(e),this.dataRangeOption.realtime&&this._syncData(),!0},__ondragend:function(){this.isDragend=!0},ondragend:function(e,t){this.isDragend&&e.target&&(!this.dataRangeOption.realtime&&this._syncData(),t.dragOut=!0,t.dragIn=!0,this.dataRangeOption.realtime||this.messageCenter.dispatch(r.EVENT.DATA_RANGE,null,{range:{start:this._range.end,end:this._range.start}},this.myChart),t.needRefresh=!1,this.isDragend=!1)},_syncShapeFromRange:function(){var e=this.dataRangeOption.range||{};if(this._range.end="undefined"!=typeof this._range.end?this._range.end:"undefined"!=typeof e.start?e.start:0,this._range.start="undefined"!=typeof this._range.start?this._range.start:"undefined"!=typeof e.end?e.end:100,100!=this._range.start||0!==this._range.end){if("horizontal"==this.dataRangeOption.orient){var t=this._fillerShape.style.width;this._fillerShape.style.x+=t*(100-this._range.start)/100,this._fillerShape.style.width=t*(this._range.start-this._range.end)/100}else{var i=this._fillerShape.style.height;this._fillerShape.style.y+=i*(100-this._range.start)/100,this._fillerShape.style.height=i*(this._range.start-this._range.end)/100}this.zr.modShape(this._fillerShape.id),this._syncHandleShape()}},_syncHandleShape:function(){var e=this._calculableLocation.x,t=this._calculableLocation.y,i=this._calculableLocation.width,n=this._calculableLocation.height;"horizontal"==this.dataRangeOption.orient?(this._startShape.style.x=this._fillerShape.style.x,this._startMask.style.width=this._startShape.style.x-e,this._endShape.style.x=this._fillerShape.style.x+this._fillerShape.style.width,this._endMask.style.x=this._endShape.style.x,this._endMask.style.width=e+i-this._endShape.style.x,this._range.start=Math.ceil(100-(this._startShape.style.x-e)/i*100),this._range.end=Math.floor(100-(this._endShape.style.x-e)/i*100)):(this._startShape.style.y=this._fillerShape.style.y,this._startMask.style.height=this._startShape.style.y-t,this._endShape.style.y=this._fillerShape.style.y+this._fillerShape.style.height,this._endMask.style.y=this._endShape.style.y,this._endMask.style.height=t+n-this._endShape.style.y,this._range.start=Math.ceil(100-(this._startShape.style.y-t)/n*100),this._range.end=Math.floor(100-(this._endShape.style.y-t)/n*100)),this._syncShape()},_syncFillerShape:function(e){var t,i,n=this._calculableLocation.x,a=this._calculableLocation.y,o=this._calculableLocation.width,r=this._calculableLocation.height;"horizontal"==this.dataRangeOption.orient?(t=this._startShape.style.x,i=this._endShape.style.x,e.id==this._startShape.id&&t>=i?(i=t,this._endShape.style.x=t):e.id==this._endShape.id&&t>=i&&(t=i,this._startShape.style.x=t),this._fillerShape.style.x=t,this._fillerShape.style.width=i-t,this._startMask.style.width=t-n,this._endMask.style.x=i,this._endMask.style.width=n+o-i,this._range.start=Math.ceil(100-(t-n)/o*100),this._range.end=Math.floor(100-(i-n)/o*100)):(t=this._startShape.style.y,i=this._endShape.style.y,e.id==this._startShape.id&&t>=i?(i=t,this._endShape.style.y=t):e.id==this._endShape.id&&t>=i&&(t=i,this._startShape.style.y=t),this._fillerShape.style.y=t,this._fillerShape.style.height=i-t,this._startMask.style.height=t-a,this._endMask.style.y=i,this._endMask.style.height=a+r-i,this._range.start=Math.ceil(100-(t-a)/r*100),this._range.end=Math.floor(100-(i-a)/r*100)),this._syncShape()},_syncShape:function(){this._startShape.position=[this._startShape.style.x-this._startShape.style._x,this._startShape.style.y-this._startShape.style._y],this._startShape.style.text=this._textFormat(this._gap*this._range.start+this.dataRangeOption.min),this._startShape.style.color=this._startShape.highlightStyle.strokeColor=this.getColor(this._gap*this._range.start+this.dataRangeOption.min),this._endShape.position=[this._endShape.style.x-this._endShape.style._x,this._endShape.style.y-this._endShape.style._y],this._endShape.style.text=this._textFormat(this._gap*this._range.end+this.dataRangeOption.min),this._endShape.style.color=this._endShape.highlightStyle.strokeColor=this.getColor(this._gap*this._range.end+this.dataRangeOption.min),this.zr.modShape(this._startShape.id),this.zr.modShape(this._endShape.id),this.zr.modShape(this._startMask.id),this.zr.modShape(this._endMask.id),this.zr.modShape(this._fillerShape.id),this.zr.refresh()},_syncData:function(){this.dataRangeOption.realtime&&this.messageCenter.dispatch(r.EVENT.DATA_RANGE,null,{range:{start:this._range.end,end:this._range.start}},this.myChart)},__dataRangeSelected:function(e){var t=e.target._idx;this._selectedMap[t]=!this._selectedMap[t],this.messageCenter.dispatch(r.EVENT.REFRESH,null,null,this.myChart)},__dispatchHoverLink:function(e){var t,i;if(this.dataRangeOption.calculable){var n,a=this.dataRangeOption.max-this.dataRangeOption.min;n="horizontal"==this.dataRangeOption.orient?(1-(l.getX(e.event)-this._calculableLocation.x)/this._calculableLocation.width)*a:(1-(l.getY(e.event)-this._calculableLocation.y)/this._calculableLocation.height)*a,t=n-.05*a,i=n+.05*a}else{var o=e.target._idx;i=(this._colorList.length-o)*this._gap+this.dataRangeOption.min,t=i-this._gap}this.messageCenter.dispatch(r.EVENT.DATA_RANGE_HOVERLINK,e.event,{valueMin:t,valueMax:i},this.myChart)},__onhoverlink:function(e){if(this.dataRangeOption.show&&this.dataRangeOption.hoverLink&&this._indicatorShape&&e&&null!=e.seriesIndex&&null!=e.dataIndex){var t=e.value;if(isNaN(t))return;t<this.dataRangeOption.min?t=this.dataRangeOption.min:t>this.dataRangeOption.max&&(t=this.dataRangeOption.max),this._indicatorShape.position="horizontal"==this.dataRangeOption.orient?[(this.dataRangeOption.max-t)/(this.dataRangeOption.max-this.dataRangeOption.min)*this._calculableLocation.width,0]:[0,(this.dataRangeOption.max-t)/(this.dataRangeOption.max-this.dataRangeOption.min)*this._calculableLocation.height],this._indicatorShape.style.text=e.value,this._indicatorShape.style.color=this.getColor(t),this.zr.addHoverShape(this._indicatorShape)}},_textFormat:function(e,t){if(e=e.toFixed(this.dataRangeOption.precision),t="undefined"!=typeof t?t.toFixed(this.dataRangeOption.precision):"",this.dataRangeOption.formatter){if("string"==typeof this.dataRangeOption.formatter)return this.dataRangeOption.formatter.replace("{value}",e).replace("{value2}",t);if("function"==typeof this.dataRangeOption.formatter)return this.dataRangeOption.formatter.call(this.myChart,e,t)}return""!==t?e+" - "+t:e},refresh:function(e){if(e){this.option=e,this.option.dataRange=this.reformOption(this.option.dataRange),this.dataRangeOption=this.option.dataRange,this.myChart.canvasSupported||(this.dataRangeOption.realtime=!1);var t=this.dataRangeOption.splitNumber<=0||this.dataRangeOption.calculable?100:this.dataRangeOption.splitNumber;if(this._colorList=d.getGradientColors(this.dataRangeOption.color,Math.max((t-this.dataRangeOption.color.length)/(this.dataRangeOption.color.length-1),0)+1),this._colorList.length>t){for(var i=this._colorList.length,n=[this._colorList[0]],a=i/(t-1),o=1;t-1>o;o++)n.push(this._colorList[Math.floor(o*a)]);n.push(this._colorList[i-1]),this._colorList=n}var r=this.dataRangeOption.precision;for(this._gap=(this.dataRangeOption.max-this.dataRangeOption.min)/t;this._gap.toFixed(r)-0!=this._gap&&5>r;)r++;this.dataRangeOption.precision=r,this._gap=((this.dataRangeOption.max-this.dataRangeOption.min)/t).toFixed(r)-0,this._valueTextList=[];for(var o=0;t>o;o++)this._selectedMap[o]=!0,this._valueTextList.unshift(this._textFormat(o*this._gap+this.dataRangeOption.min,(o+1)*this._gap+this.dataRangeOption.min))}this.clear(),this._buildShape()},getColor:function(e){if(isNaN(e))return null;if(this.dataRangeOption.min==this.dataRangeOption.max)return this._colorList[0];if(e<this.dataRangeOption.min?e=this.dataRangeOption.min:e>this.dataRangeOption.max&&(e=this.dataRangeOption.max),this.dataRangeOption.calculable&&(e-(this._gap*this._range.start+this.dataRangeOption.min)>5e-5||e-(this._gap*this._range.end+this.dataRangeOption.min)<-5e-5))return null;var t=this._colorList.length-Math.ceil((e-this.dataRangeOption.min)/(this.dataRangeOption.max-this.dataRangeOption.min)*this._colorList.length);return t==this._colorList.length&&t--,this._selectedMap[t]?this._colorList[t]:null},getColorByIndex:function(e){return e>=this._colorList.length?e=this._colorList.length-1:0>e&&(e=0),this._colorList[e]},onbeforDispose:function(){this.messageCenter.unbind(r.EVENT.HOVER,this._onhoverlink)}},s.inherits(t,i),e("../component").define("dataRange",t),t}),define("echarts/util/shape/HandlePolygon",["require","zrender/shape/Base","zrender/shape/Polygon","zrender/tool/util"],function(e){function t(e){i.call(this,e)}var i=e("zrender/shape/Base"),n=e("zrender/shape/Polygon"),a=e("zrender/tool/util");return t.prototype={type:"handle-polygon",buildPath:function(e,t){n.prototype.buildPath(e,t)},isCover:function(e,t){var i=this.getTansform(e,t);e=i[0],t=i[1];var n=this.style.rect;return e>=n.x&&e<=n.x+n.width&&t>=n.y&&t<=n.y+n.height?!0:!1}},a.inherits(t,i),t});