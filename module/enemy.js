import { Base } from '../utils/base.js';
import { config } from '../utils/config.js';
import { MyPlane } from './myPlane.js';
// 引入我方飞机
const myPlane = new MyPlane();
class Enemy extends Base {
    constructor(wrap, x, y, imgSrc, w, h, iSpeed, hitNum, hitImg, boomImg, delayTime) {
        super(wrap, x, y, imgSrc);
        this.w = w;
        this.h = h;
        this.iSpeed = iSpeed;
        this.hitNum = hitNum;
        this.hitImg = hitImg;
        this.boomImg = boomImg; // 爆炸图片
        this.delayTime = delayTime; // 延迟时间
    }
    init() {
        this.setPosition();
        this.enemyMove();
    }
    setPosition() {
        this.createEl('enemy');
        this.setStyle(this.element, {
            left: this.x + 'px',
            top: this.y + 'px',
            width: this.w + 'px',
            height: this.h + 'px',
            background: `url(${this.imgSrc})`
        })
    }
    enemyMove() {
        clearInterval(this.element.timer);
        this.element.timer = setInterval(() => {
            // 获取当前值
            let iCur = this.getStyle(this.element, 'top')
            if (iCur >= this.wrap.offsetHeight - this.h) {
                // 该飞机触底
                alert('游戏结束');
                this.element.remove()
                location.reload(true);
            } else {
                this.setStyle(this.element, {
                    top: iCur + this.iSpeed + 'px'
                })
                this.y = iCur + this.iSpeed;
                this.enemyHit()
                this.hit()
            };
        }, 20)
    }
    hit(){
        let plane = document.querySelector('.myPlane')
        let x = plane.offsetLeft;
        let y = plane.offsetTop;
        let w = plane.offsetWidth;
        let h = plane.offsetHeight;
        this.y = this.element.offsetTop;
        if(x+w<this.x || this.x+this.w<x || y+h<this.y || this.y+this.h<y){

        }else{
            plane.style.background = `url(./img/本方飞机爆炸.gif)`
            let enemies = document.querySelectorAll('.enemy');
            enemies.forEach(item=>{
                clearInterval(item.timer);
            })
            clearInterval(config.timer);
            setTimeout(() => {
                alert('Game Over');
                location.reload(true);
            }, 100)
        }
    }
    // 检测当前敌机和子弹有没有发生碰撞
    enemyHit() {
        // 获取页面所有的子弹
        let bullets = document.querySelectorAll('.bullet');
        bullets.forEach((item, index) => {
            let left = item.offsetLeft;
            let width = item.offsetWidth;
            let top = item.offsetTop;
            // 比较的是子弹完全嵌入敌机才算打中
            // console.log(this.x,this.y,this.w,this.h)   
            if (left >= this.x && left + width <= this.x + this.w && top < this.y + this.h && top>this.y) {
                // 说明当前这颗子弹和敌机相撞
                // this.element.remove();
                this.setStyle(this.element, {
                    background: `url(${this.hitImg})`
                })
                this.hitNum--;
                item.remove();
                if (this.hitNum <= 0) {
                    // 撞击次数没有了，飞机爆炸
                    // this.element.remove();
                    this.setStyle(this.element, {
                        background: `url(${this.boomImg})`
                    })
                    clearInterval(this.element.timer)
                    setTimeout(() => {
                        this.element.remove()
                    }, this.delayTime)
                }
            }
        })
    }
}
class SmallEnemy extends Enemy {
    constructor(wrap, x, y, imgSrc = './img/enemy1_fly_1.png', w = 34, h = 24, iSpeed = 5, hitNum = 1, hitImg = './img/enemy1_fly_1.png', boomImg = './img/小飞机爆炸.gif', delayTime = '100') {
        super(wrap, x, y, imgSrc, w, h, iSpeed, hitNum, hitImg,boomImg, delayTime);
    }
}
// 封装中型飞机
class MiddleEnemy extends Enemy {
    constructor(wrap, x, y, imgSrc = './img/enemy2_fly_1.png', w = 46, h = 60, iSpeed = 3, hitNum = 3, hitImg = './img/中飞机挨打.png', boomImg = './img/中飞机爆炸.gif', delayTime = '100') {
        super(wrap, x, y, imgSrc, w, h, iSpeed, hitNum, hitImg, boomImg, delayTime);
    }
}
// 封装大型飞机
class LargeEnemy extends Enemy {
    constructor(wrap, x, y, imgSrc = './img/enemy3_fly_1.png', w = 110, h = 164, iSpeed = 1, hitNum = 10, hitImg = './img/大飞机挨打.png', boomImg = './img/大飞机爆炸.gif', delayTime = '500') {
        super(wrap, x, y, imgSrc, w, h, iSpeed, hitNum, hitImg, boomImg, delayTime);
    }
}

export { SmallEnemy, MiddleEnemy, LargeEnemy }