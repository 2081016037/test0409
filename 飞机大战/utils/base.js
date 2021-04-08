class Base{
    constructor(wrap,x,y,imgSrc){
        this.wrap = wrap;//装元素的盒子
        this.x = x;//元素的位置
        this.y = y;
        this.imgSrc = imgSrc;//元素的样子
        this.element = null;//创出的元素
    }
    // 创建元素
    createEl(className){
        this.element = document.createElement('div');
        this.element.className = className;
        this.setStyle(this.element,{
            left:this.x+'px',
            top:this.y+'px'
        })
        this.wrap.appendChild(this.element);
    }
    // 设置样式
    setStyle(el,json){//{"left":"300px",top:"300px"}
        for(let attr in json){
            Reflect.set(el.style,attr,json[attr]);
        }
    }
    // 获取元素样式
    getStyle(el,attr){
        return parseInt(getComputedStyle(el)[attr]);
    }
}

const getRan = (min,max)=>{
    return Math.floor(Math.random()*(max+1-min)+min);
}
export { Base ,getRan}