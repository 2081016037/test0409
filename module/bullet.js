import { Base } from '../utils/base.js';

class Bullet extends Base {
    constructor(wrap, x, y, imgSrc = './img/bullet1.png') {
        super(wrap, x, y, imgSrc)
    }
    init() {
        // 创建子弹元素
        this.createEl('bullet');
        this.move();
    }
    // 子弹飞
    move() {
        clearInterval(this.element.timer);
        this.element.timer = setInterval(() => {
            // 求当前值
            let iCur = this.getStyle(this.element, 'top');
            if (iCur < -14) {
                clearInterval(this.element.timer);
                this.element.remove();
            } else {
                this.setStyle(this.element, {
                    top: iCur - 10 + 'px'
                })
            }
        }, 20)
    }
}

export { Bullet }