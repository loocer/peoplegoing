import utl from "../utl.js"
import newTouch from "../hander/newTouch.js"
import newTor from "../hander/newTor.js"
export  default class MonkeyScript extends Laya.Script3D{
    constructor(){
        super();
        this.scene = null;
        this.text = null;
        this.camera = null;
        this.newTouch = new newTouch()
        this.newTor = new newTor()
        this.lastPosition = new Laya.Vector2(0, 0);
        this.distance = 0.0;
        this.disVector1 = new Laya.Vector2(0, 0);
        this.disVector2 = new Laya.Vector2(0, 0);
        this.isTwoTouch = false;
        this.first = true;
        this.twoFirst = true;
        this.rotate = new Laya.Vector3(0,0,0);
        this.translate = new Laya.Vector3(0,0,0);
        this.sprite3DSacle = new Laya.Vector3(0,0,0);
    }
    onStart(){
        this.scene =  this.owner.parent;
        this.text = this.scene.parent.getChildByName("ceshi");
        this.camera = this.scene.getChildByName("camera");
    }
    flying(touchCount){
        
        // let touchCount = this.scene.input.touchCount();
        if (1 === touchCount){
            //判断是否为两指触控，撤去一根手指后引发的touchCount===1
            if(this.isTwoTouch){
                return;
            }
            let touch = this.scene.input.getTouch(0);
           if(this.newTouch.scaleSmall(touch.position.x,touch.position.y)){
                this.newTouch.leftFormatMovePosition(touch.position.x,touch.position.y)
            }

            if(this.newTor.scaleSmall(touch.position.x,touch.position.y)){
                this.newTor.leftFormatMovePosition(touch.position.x,touch.position.y)
            }
            
        }
        else if (2 === touchCount){
            this.isTwoTouch = true;
            //获取两个触碰点
            let touch = this.scene.input.getTouch(0);
            let touch2 = this.scene.input.getTouch(1);
            //是否为新一次触碰，并未发生移动
            if (this.twoFirst){
                //获取触碰点的位置
                // this.disVector1.x = touch.position.x - touch2.position.x;
                // this.disVector1.y = touch.position.y - touch2.position.y;
                // this.distance = Laya.Vector2.scalarLength(this.disVector1);
                // this.sprite3DSacle = this.owner.transform.scale;
                this.twoFirst = false;

            }
            else{
                if(this.newTouch.scaleSmall(touch.position.x,touch.position.y)){
                    this.newTouch.leftFormatMovePosition(touch.position.x,touch.position.y)
                }
                if(this.newTouch.scaleSmall(touch2.position.x,touch2.position.y)){
                    this.newTouch.leftFormatMovePosition(touch.position.x,touch.position.y)
                }

                if(this.newTor.scaleSmall(touch.position.x,touch.position.y)){
                    this.newTor.leftFormatMovePosition(touch.position.x,touch.position.y)
                }
                if(this.newTor.scaleSmall(touch2.position.x,touch2.position.y)){
                    this.newTor.leftFormatMovePosition(touch.position.x,touch.position.y)
                }
                // this.disVector2.x = touch.position.x - touch2.position.x;
                // this.disVector2.y = touch.position.y - touch2.position.y;
                // let distance2 = Laya.Vector2.scalarLength(this.disVector2);
                // //根据移动的距离进行缩放
                // let factor =  0.001 * (distance2 - this.distance);
                // this.sprite3DSacle.x += factor;
                // this.sprite3DSacle.y += factor;
                // this.sprite3DSacle.z += factor;
                // this.owner.transform.scale = this.sprite3DSacle;
                // this.distance = distance2;
            }   
        }
        else if (0 === touchCount){
            // this.text.text = "触控点归零";
            this.first = true;
            this.twoFirst = true;
            // this.lastPosition.x = 0;
            // this.lastPosition.y = 0;
            this.isTwoTouch = false;
        }

    }
    onUpdate(){
        let touchCount = this.scene.input.touchCount();
        this.flying(touchCount)
        this.owner.transform.translate(new Laya.Vector3(-utl.takeSpeed.x*utl.speedMove,0,-utl.takeSpeed.y*utl.speedMove),false);
        utl.cube&&utl.cube.transform.translate(new Laya.Vector3(-utl.takeSpeed.x*utl.speedMove,0,-utl.takeSpeed.y*utl.speedMove),false);

    }
    onLateUpdate() {
    }
}