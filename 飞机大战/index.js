import { SmallEnemy,MiddleEnemy, LargeEnemy } from "./module/enemy.js";
import { MyPlane } from "./module/myPlane.js";
import { getRan } from "./utils/base.js";
import { config } from "./utils/config.js";

const wrap = document.querySelector('.wrap');
const wrapW = wrap.offsetWidth;
const wrapH = wrap.offsetHeight;


const oBtn = document.querySelector('button');
oBtn.onclick = function(){
    // ①wrap换背景图
    Reflect.set(config.wrap.style,'background','url(./img/background_1.png)');
    // ②移除按钮
    this.remove();
    // 新建我方飞机实例并初始化
    const myPlane = new MyPlane(config.wrap,wrapW/2-33,wrapH-80);
    myPlane.init();
    // 随机创建敌机
    createEnemy();
    config.timer = setInterval(()=>{
        // 每隔一段时间创建一个敌机
        createEnemy();
    },1500);
}
function createEnemy(){
    // 该随机数控制小型敌机的出现位置
    let num1 = getRan(2,wrapW-34-2);
    // 该随机数控制中型敌机的出现位置
    let num2 = getRan(0,wrapW-46);
    // 该随机数控制大型敌机的出现位置
    let num3 = getRan(0,wrapW-110);
    //该随机数用来控制飞机出现的概率
    let probability = getRan(1,100);
    if(probability>=1 &&probability<=70){
        // 该概率下创建小型敌机
        new SmallEnemy(config.wrap,num1,-24).init();
    }else if(probability>70&&probability<=95){
        // 该概率下创建中型飞机
        new MiddleEnemy(config.wrap,num2,-60).init();
    }else{
        // 该概率下创建大型飞机
        new LargeEnemy(config.wrap,num3,-164).init();
    }
}