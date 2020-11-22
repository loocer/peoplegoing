/**
 * 本示例采用非脚本的方式实现，而使用继承页面基类，实现页面逻辑。在IDE里面设置场景的Runtime属性即可和场景进行关联
 * 相比脚本方式，继承式页面类，可以直接使用页面定义的属性（通过IDE内var属性定义），比如this.tipLbll，this.scoreLbl，具有代码提示效果
 * 建议：如果是页面级的逻辑，需要频繁访问页面内多个元素，使用继承式写法，如果是独立小模块，功能单一，建议用脚本方式实现，比如子弹脚本。
 */

import BugsComponent from "./component/bugsScript.js"
import CameraComponent from "./component/cameraScript.js"
import utl from "./utl.js"
import {getPixels} from "./net.js"
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
        

        // Laya.URL.basePath = "https://xuxin.love/img/1112/";
        // Laya.loader.load("https://xuxin.love/img/1112/res/LayaScene_SampleScene/Conventional/ground.lh", Laya.Handler.create(this, (rf)=>{
        //     // console.log('rf------------',rf)
        // }));
        //  Laya.loader.load("res/22/end.png", Laya.Handler.create(this, (rf)=>{
        //     // this.createGridFromAStarMap(rf)
        //     console.log('rf------------',rf)
        // }));

		let dfp = Laya.Sprite3D.load("https://xuxin.love/img/1112/22/LayaScene_SampleScene/Conventional/abj.lh", Laya.Handler.create(null, (sp)=> {
            this.newScene.addChild(sp);
            // utl.ground = sp
            let mode = sp.getChildByName("Obj3d66-1101934-1-638");
            let sharedMesh = mode.meshFilter.sharedMesh    
            let min = mode.meshRenderer.bounds.getMin()
            let max = mode.meshRenderer.bounds.getMax()
            utl.coeb =  mode.meshRenderer.bounds.getExtent()
            utl.pfrf = utl.coeb.x 
            utl.fre = utl.coeb.z 
            // utl.coeb =  mode.transform.position
            
            this.ground = {
                min,
                max,
                w:max.x - min.x ,
                h:max.z - min.z
            }
            utl.ground = this.ground
            this.setAllPosation(this.ground)
            console.log(this.ground)
            
            this.setGraph()
            // staticCollider.isTrigger = true; //标记为触发器,取消物理反馈
            
            // utl.cube = cube
            // cube.meshRenderer.enable = false;
            // cube.addComponent(Laya.MeshCollider);
           

             // cars.addComponent(Laya.MeshCollider);
            // let script1 = cars.addComponent(TriggerCollisionScript);
            // script1.kinematicSprite = this.kinematicSphere;
            // this.setPointBox()
            // layaMonkey2.transform.position =new Laya.Vector3(0,3,5)
        }));
        Laya.Sprite3D.load("https://xuxin.love/img/1112/22/LayaScene_SampleScene/Conventional/Camera.lh", Laya.Handler.create(null, (sp)=> {
            this.newScene.addChild(sp);
            utl.box = sp
            sp.addComponent(CameraComponent);

        }));
         Laya.Sprite3D.load("https://xuxin.love/img/1112/22/LayaScene_SampleScene/Conventional/Directional Light.lh", Laya.Handler.create(null, (sp)=> {
            this.newScene.addChild(sp);
        }));
         Laya.Sprite3D.load("https://xuxin.love/img/1112/22/LayaScene_SampleScene/Conventional/Cube.lh", Laya.Handler.create(null, (sp)=> {
            this.newScene.addChild(sp);
            utl.player = sp
        }));
         Laya.timer.frameLoop(1000, this, ()=>{
            this.addBugs()
         });
        
    }
    addBugs(){
        if(utl.box4){
             let bulletClone = utl.box4.clone();
            //为子弹加控制脚本
            bulletClone.transform.position =new Laya.Vector3(this.ground.min.x,0,this.ground.min.z)
            let script = bulletClone.addComponent(BugsComponent);
            this.newScene.addChild(bulletClone);   
        }
       
    }
    setBox(){
        let box4 = this.newScene.addChild(new Laya.MeshSprite3D(Laya.PrimitiveMesh.createBox(.02,.02,.02)));
        box4.transform.position =new Laya.Vector3(this.ground.min.x,0,this.ground.min.z)
        box4.addComponent(BugsComponent);
        utl.box4 = box4
    }
    setGraph(){
        // let list  = []
        // for(let i=0;i<117;i++){
        //     let array = []
        //     for(let o=0;o<100;o++){
        //         array.push(1)
        //     }
        //     list.push(array)
        // }
        // utl.graphDiagonal = new Graph(list, { diagonal: true });
        // this.setBox()
        getPixels().then((list)=>{
            console.log(list)
            utl.graphDiagonal = new Graph(JSON.parse(list), { diagonal: true });
            this.setBox()
        })
        
    }
    
    setAllPosation({w,h,min,max}){
        let initx = this.ground.min.x 
        let inity = this.ground.min.z 
        let pw = w/100
        let ph = h/117
        utl.minPisition = {
            x:pw,
            y:ph
        }
        let list  = []
        for(let i=0;i<117;i++){
            let array = []
            for(let j=0;j<100;j++){
                // array.push([pw*j - utl.coeb.x,ph*i -utl.coeb.z])
                array.push([pw*j +initx,ph*i+inity])
            }
            list.push(array)
        }
        utl.postions = list
    }
    setPointBox(){
        let index = 0
        for(let o in utl.postions){
            let obj =  utl.postions[o]
            for(let i in obj){
                let box = this.newScene.addChild(new Laya.MeshSprite3D(Laya.PrimitiveMesh.createBox(.005,.005,.005)));
                box.transform.position =new Laya.Vector3(obj[i][0],0,obj[i][1])
                box.grad = [o,i]
                this.newScene.addChild(box)
                // let rigidBody = box.addComponent(Laya.Rigidbody3D);
                // //创建球型碰撞器
                // let coneShape = new Laya.ConeColliderShape(.1, .2);
                // coneShape.isTrigger = true; //标记为触发器,取消物理反馈
                //设置刚体碰撞器的形状
                // rigidBody.colliderShape = coneShape;
                //设置刚体碰撞器的质量 
                let staticCollider = box.addComponent(Laya.PhysicsCollider); //StaticCollider可与非Kinematic类型RigidBody3D产生碰撞
                let boxShape = new Laya.BoxColliderShape(.05,.05,.05);
                staticCollider.colliderShape = boxShape;
                staticCollider.isTrigger = true; //标记为触发器,取消物理反馈

                let script = box.addComponent(TriggerCollisionScript);
                script.kinematicSprite = this.kinematicSphere;
            }
        }
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
            let state1 = new Laya.AnimatorState();
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

let list = 1
class TriggerCollisionScript extends Laya.Script3D{
    constructor(){
        super();
    }
    onTriggerEnter(other) {
        
        this.owner.grad.weight = 0
        console.log(list)
        list++
    }

    onTriggerStay(other) {
    }

    onTriggerExit(other) {
        console.log('离开了')
    }
    onCollisionEnter(collision) {
        if (collision.other.owner === this.kinematicSprite)
             console.log('分段收费')
    }
    onCollisionStay(collision) {
    }
    onCollisionExit(collision) {
    }
    
}