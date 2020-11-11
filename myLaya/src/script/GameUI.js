/**
 * 本示例采用非脚本的方式实现，而使用继承页面基类，实现页面逻辑。在IDE里面设置场景的Runtime属性即可和场景进行关联
 * 相比脚本方式，继承式页面类，可以直接使用页面定义的属性（通过IDE内var属性定义），比如this.tipLbll，this.scoreLbl，具有代码提示效果
 * 建议：如果是页面级的逻辑，需要频繁访问页面内多个元素，使用继承式写法，如果是独立小模块，功能单一，建议用脚本方式实现，比如子弹脚本。
 */
import newTouch from "./hander/newTouch.js"
import newTor from "./hander/newTor.js"
import Boxsd from "./component/bugsScript.js"
import utl from "./utl.js"
  let temp =null
export default class GameUI extends Laya.Scene {
    constructor() {
        super();
        this.isTwoTouch = false
        this.twoFirst = true
        this.ground = {}
        utl.graphDiagonal = null
        utl.postions = null
		this.loadScene("test/TestScene.scene");

		this.newScene = Laya.stage.addChild(new Laya.Scene3D());
		temp = this

        this.text = new Laya.Text();
        this.text.y = 50;
        this.text.name = "ceshi";
        this.text.x = Laya.stage.width / 2 -100 ;
        this.text.text = "触控点归零";
        //显示文本显示框
        this.text.overflow = Laya.Text.HIDDEN;
        this.text.color = "#FFFFFF";
        this.text.font = "Impact";
        this.text.fontSize = 20;
        this.text.borderColor = "#FFFF00";
        this.setGraph()
        Laya.stage.addChild(this.text);
		let dfp = Laya.Sprite3D.load("res/LayaScene_SampleScene/Conventional/ground.lh", Laya.Handler.create(null, (sp)=> {
            this.newScene.addChild(sp);
            utl.ground = sp
            let mode = sp.getChildByName("Obj3d66-1101934-1-638");
            let sharedMesh = mode.meshFilter.sharedMesh    
            let min = mode.meshRenderer.bounds.getMin()
            let max = mode.meshRenderer.bounds.getMax()
            utl.coeb =  mode.meshRenderer.bounds.getExtent()
            utl.pfrf = utl.coeb.x 
            utl.fre = utl.coeb.z 
            // utl.coeb =  mode.transform.position
            console.log(mode.meshRenderer.bounds)
            this.ground = {
                min,
                max,
                w:max.x - min.x ,
                h:max.z - min.z
            }
            this.setAllPosation(this.ground)
            this.setBox()
            // layaMonkey2.transform.position =new Laya.Vector3(0,3,5)
        }));
        Laya.Sprite3D.load("res/LayaScene_SampleScene/Conventional/Main Camera.lh", Laya.Handler.create(null, (sp)=> {
            this.newScene.addChild(sp);
            utl.box = sp
            sp.transform.position = new Laya.Vector3(0,40,0)
            sp.addComponent(MonkeyScript);
            
             console.log(sp.transform.position,'-==-=-=-=-=--')

        }));
         Laya.Sprite3D.load("res/LayaScene_SampleScene/Conventional/Directional Light.lh", Laya.Handler.create(null, (sp)=> {
            this.newScene.addChild(sp);
        }));
        
    }
    setBox(){
        let box4 = this.newScene.addChild(new Laya.MeshSprite3D(Laya.PrimitiveMesh.createBox(.2,.2,2)));
        box4.transform.position =new Laya.Vector3(this.ground.min.x,.2,this.ground.min.z)
        box4.addComponent(Boxsd);
        utl.box4 = box4
    }
    setGraph(){
        let list  = []
        for(let i=0;i<100;i++){
            let array = []
            for(let o=0;o<100;o++){
                array.push(1)
            }
            list.push(array)
        }
        utl.graphDiagonal = new Graph(list, { diagonal: true });
    }
    setAllPosation({w,h,min,max}){
        let initx = this.ground.min.x 
        let inity = this.ground.min.z 
        let pw = w/100
        let ph = h/100
        let list  = []
        for(let i=0;i<100;i++){
            let array = []
            for(let j=0;j<100;j++){
                // array.push([pw*j - utl.coeb.x,ph*i -utl.coeb.z])
                array.push([pw*j +initx,ph*i+inity])
            }
            list.push(array)
        }
        utl.postions = list
    }
    onUpdate() {
        console.log(55555)
        // if(utl.box){
        //      utl.box.transform.position =new Laya.Vector3(utl.takeSpeed.x,utl.box.transform.position.y,utl.takeSpeed.y)
       
        // }
        
    }
    createBug(){
        // let box4 = this.newScene.addChild(new Laya.MeshSprite3D(Laya.PrimitiveMesh.createBox(2, 2,2)));
        // box4.transform.position =new Laya.Vector3(0,3,0)
       
        // let boxBody = box4.addComponent(Laya.Rigidbody3D);
        // //创建盒子形状碰撞器
        // let boxShape1 = new Laya.BoxColliderShape(2, 2,2);
        // //设置盒子的碰撞形状
        // boxBody.colliderShape = boxShape1;
        // // boxBody.mass = 0; 
        // boxBody.isKinematic = true;
        // boxBody.gravity =  new Laya.Vector3(0,0,0)
        // boxBody.isTrigger = true;
        // box4.addComponent(BoxMove);
        // utl.entity.set('obx',box4)
        // Laya.Sprite3D.load("res/test/w.lh", Laya.Handler.create(null, (sp)=> {
        //     let layaMonkey1 = this.newScene.addChild(sp);
        //     utl.entity.set('obx',layaMonkey1)
        //     console.log(layaMonkey1,sp)
        // }));
    }
    creaPlayer(){
        // let box4 = this.newScene.addChild(new Laya.MeshSprite3D(Laya.PrimitiveMesh.createBox(1, 2,3)));
        // // box4.transform.rotate(new Laya.Vector3(2 * Math.PI / 180,0, 10 * Math.PI / 180), true, true);
        // let material1 = new Laya.BlinnPhongMaterial();
        // Laya.Texture2D.load("res/atlas/comp.png", Laya.Handler.create(null, function(tex) {
        //         material1.albedoTexture = tex;
        // }));
        // box4.meshRenderer.material = material1;
        // box4.transform.position =new Laya.Vector3(0,3,5)
       
        // let boxBody = box4.addComponent(Laya.Rigidbody3D);
        // //创建盒子形状碰撞器
        // let boxShape1 = new Laya.BoxColliderShape(1, 2,3);
        // //设置盒子的碰撞形状
        // boxBody.colliderShape = boxShape1;
        // //设置刚体的质量
        // boxBody.friction = 2;
        // //物理碰撞体设置弹力
        // boxBody.restitution = 0.3;
        // boxBody.isKinematic = true;
        // boxBody.gravity =  new Laya.Vector3(0,0,0)
        // // boxBody.mass = 0;
        // box4.addComponent(BoxMove3);
        //  utl.box = box4
        Laya.Sprite3D.load("res/t2/LayaScene_fff/Conventional/runyes.lh", Laya.Handler.create(null, (sp)=> {
            let layaMonkey1 = this.newScene.addChild(sp);
            // layaMonkey1.transform.position =new Laya.Vector3(0,3,5)
            // layaMonkey1.transform.rotate(new Laya.Vector3(90* Math.PI / 180,0, 0), true);
            utl.box = layaMonkey1
            // console.log(layaMonkey1,sp)
            utl.ani = layaMonkey1.getComponent(Laya.Animator);
            //创建一个动画动作状态
            var state1 = new Laya.AnimatorState();
            //设置动作状态的名称
            state1.name = "hello";
            //设置动作状态播放的起始时间（起始时间与结束时间的设置为0-1的百分比数值）  要截取的时间点 / 动画的总时长
            state1.clipStart = 0/45;
            //设置动作状态播放的结束时间
            state1.clipEnd = 45/45;
            //得到默认动画赋值给Clip（getDefaultState默认动画为Unity中animation的数组顺序0下标的动画）
            state1.clip = utl.ani.getDefaultState().clip;
            //动画播放是否循环
            state1.clip.islooping = true;
            //添加动画状态到动画组件里
            utl.ani.addState(state1);
            //播放动画
            
        }));
         // utl.fds = this.creab
    }
    creabox(py){
        for(let i=0;i<2;i++){
            for(let l=0;l<2;l++){
                let box5 = this.newScene.addChild(new Laya.MeshSprite3D(Laya.PrimitiveMesh.createBox(1,1,1)));
                box5.transform.rotate(new Laya.Vector3(2 * Math.PI / 180,0, 10 * Math.PI / 180), true, true);
                let material1 = new Laya.BlinnPhongMaterial();
                 box5.transform.position = new Laya.Vector3(l,py+3, i);
               
                let bg = box5.addComponent(Laya.Rigidbody3D);
                //创建盒子形状碰撞器
                let boxShape1 = new Laya.BoxColliderShape(1, 1,1);
                //设置盒子的碰撞形状
                bg.colliderShape = boxShape1;
                //设置刚体的质量
                bg.friction = 2;
                //物理碰撞体设置弹力
                bg.restitution = 0.3;
                bg.mass = 10;

            }
        }
        
    }
    creab(){
        for(let f=0;f<2;f++){
            this.creabox(f)
        }
    }
    
}

class MonkeyScript extends Laya.Script3D{
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


    }
    onLateUpdate() {
    }
}
