import { Base } from "../utils/base.js";
import { config } from "../utils/config.js"
import { Bullet } from "./bullet.js";

class MyPlane extends Base {
    constructor(wrap, x, y, imgSrc = './img/我的飞机.gif', boomImg = './img/本方飞机爆炸.gif') {
        super(wrap, x, y, imgSrc);
        this.boomImg = boomImg;
    }
    init() {
        // 创建我方飞机元素
        this.createEl('myPlane');
        this.handleEvent();
    }
    // 我方飞机事件管理
    handleEvent() {
        // 当鼠标在页面中移动的时候，飞机跟随鼠标移动
        document.addEventListener('mousemove', this.myPlaneMove.bind(this));
        // 按下发射子弹
        this.wrap.addEventListener('mousedown', this.myPlaneShoot.bind(this));
        // 抬起鼠标停止发射子弹
        document.addEventListener('mouseup',this.stopShoot.bind(this))
    }
    // 停止发射子弹
    stopShoot(){
        clearInterval(this.timer)
    }
    // 发射子弹
    myPlaneShoot() {
        // 创建子弹并且初始化
        let bullet = new Bullet(this.wrap,this.x+33-2,this.y-14);
        bullet.init();
        // 连续发射子弹
        this.timer = setInterval(()=>{
            new Bullet(this.wrap, this.x + 33 - 2, this.y - 14).init();
        },100)
    }
    // 我方飞机移动
    myPlaneMove(e) {
        this.x = this.setBound(e.clientX - this.wrap.offsetLeft - 33, 'width');
        this.y = this.setBound(e.clientY - this.wrap.offsetTop - 40, 'height');
        this.setStyle(this.element, {
            left: this.x + 'px',
            top: this.y + 'px'
        })
        e.preventDefault();
    }
    // 设置边界
    setBound(num, attr) {
        return num < 0 ? 0 : num > this.getMax(attr) ? this.getMax(attr) : num
    }
    // 获取最大值
    getMax(attr) {
        return this.getStyle(this.wrap, attr) - this.getStyle(this.element, attr);
    }
}


export { MyPlane }