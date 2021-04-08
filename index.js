import { MyPlane } from './module/myPlane.js';
import { SmallEnemy,MiddleEnemy, LargeEnemy } from './module/enemy.js';
import { getRan } from './utils/base.js';
import { config } from './utils/config.js';

const wrap = document.querySelector('.wrap')
const wrapW = wrap.offsetWidth;
const wrapH = wrap.offsetHeight;
let timer = null;
// 创建小型飞机
const oBtn = document.querySelector('button');

oBtn.onclick = function () {
    // wrap换背景图
    Reflect.set(wrap.style, 'background', 'url(./img/background_1.png)')
    // 移除按钮
    this.remove();
    // 新建我方飞机实例并初始化
    const myPlane = new MyPlane(wrap, wrapW / 2 - 33, wrapH - 80);
    myPlane.init();
    // smallEnemy.init()
    // 随机创建敌机
    createEnemy();
    timer = setInterval(()=>{
        createEnemy();
    },500)
}
function createEnemy(){
    // 该随机数控制敌机的出现位置
    let num1 = getRan(3, wrapW - 34 - 2);
    let num2 = getRan(0, wrapW - 46);
    let num3 = getRan(0, wrapW - 164);
    // console.log(wrapW - 34 - 2)
    // 该随机数用来控制飞机出现的概率
    let probability = getRan(1,100)
    if(probability >= 1 && probability <= 70){
        // 该概率下创建小型敌机
        new SmallEnemy(wrap,num1,-24).init();
    } else if (probability > 70 && probability <= 90){
        // 该概率下创建中型飞机
        new MiddleEnemy(wrap,num2,-46).init();
    }else{
        // 该概率下创建大型飞机
        new LargeEnemy(wrap,num3,-164).init();
    }
    
}