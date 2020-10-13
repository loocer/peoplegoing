/**
 * 本示例采用非脚本的方式实现，而使用继承页面基类，实现页面逻辑。在IDE里面设置场景的Runtime属性即可和场景进行关联
 * 相比脚本方式，继承式页面类，可以直接使用页面定义的属性（通过IDE内var属性定义），比如this.tipLbll，this.scoreLbl，具有代码提示效果
 * 建议：如果是页面级的逻辑，需要频繁访问页面内多个元素，使用继承式写法，如果是独立小模块，功能单一，建议用脚本方式实现，比如子弹脚本。
 */
  import utl from "./utl.js"
  let temp =null
export default class GameUI extends Laya.Scene {
    constructor() {
        super();
		this.loadScene("test/TestScene.scene");

		this.newScene = Laya.stage.addChild(new Laya.Scene3D());
		temp = this
		//初始化照相机
		// var camera = this.newScene.addChild(new Laya.Camera(0, 0.1, 100));
		// camera.transform.translate(new Laya.Vector3(0, 30, 5));
		// camera.transform.rotate(new Laya.Vector3(-90, 0, 0), true, false);
		// // camera.orthographic = true;
  //       //正交垂直矩阵距离,控制3D物体远近与显示大小
  //       // camera.orthographicVerticalSize = 60;
  //       // camera.enableHDR = true; //关闭HDR
  //       utl.camera = camera
        
		//方向光
		var directionLight = new Laya.DirectionLight();
		this.newScene.addChild(directionLight);
		directionLight.color = new Laya.Vector3(0.6, 0.6, 0.6);
		//设置平行光的方向
		var mat = directionLight.transform.worldMatrix;
		mat.setForward(new Laya.Vector3(-1.0, -1.0, -1.0));
		directionLight.transform.worldMatrix=mat;
		
		//平面
		var plane = this.newScene.addChild(new Laya.MeshSprite3D(Laya.PrimitiveMesh.createPlane(-100, -100, 100, 100)));
		var planeMat = new Laya.BlinnPhongMaterial();
		Laya.Texture2D.load("res/grass.png", Laya.Handler.create(this, function(tex) {
			planeMat.albedoTexture = tex;
		}));
		//设置纹理平铺和偏移
		var tilingOffset = planeMat.tilingOffset;
		tilingOffset.setValue(5, 5, 0, 0);
		planeMat.tilingOffset = tilingOffset;
		//设置材质
		plane.meshRenderer.material = planeMat;
		
		//平面添加物理碰撞体组件
		var planeStaticCollider = plane.addComponent(Laya.PhysicsCollider);
		//创建盒子形状碰撞器
		var planeShape = new Laya.BoxColliderShape(10, 0, 10);
		//物理碰撞体设置形状
		planeStaticCollider.colliderShape = planeShape;
		//物理碰撞体设置摩擦力
		planeStaticCollider.friction = 2;
		//物理碰撞体设置弹力
		planeStaticCollider.restitution = 0.3;
        this.creaPlayer()
        
        Laya.timer.loop(30,this,this.onUpdate);

        var sfe = this.newScene.addChild(new Laya.MeshSprite3D(Laya.PrimitiveMesh.createSphere(1)));
        var material = new Laya.BlinnPhongMaterial();
        sfe.transform.position = new Laya.Vector3(1,20, 3);
        Laya.Texture2D.load("res/wood.jpg", Laya.Handler.create(null, function(tex) {
                material.albedoTexture = tex;
        }));
        sfe.meshRenderer.material = material;
        this.createBug()
        // this.creab()
        // let df1 = Laya.Sprite3D.load("res/test/xidf.lh")
        // let layaMonkey = this.newScene.addChild(df1);
        // console.log(layaMonkey,df1)
        Laya.Sprite3D.load("res/t2/LayaScene_fff/Conventional/Directional Light.lh", Laya.Handler.create(null, (sp)=> {
            var layaMonkey1 = this.newScene.addChild(sp);
            // layaMonkey2.transform.position =new Laya.Vector3(0,3,5)
            console.log(layaMonkey1,sp)
        }));
        
        Laya.Sprite3D.load("res/t2/LayaScene_fff/Conventional/Main Camera.lh", Laya.Handler.create(null, (sp)=> {
            var layaMonkey2 = this.newScene.addChild(sp);
            utl.camera = layaMonkey2
            // layaMonkey2.transform.position =new Laya.Vector3(0,3,5)
            console.log(layaMonkey2,sp)
        }));
         
    }
    onUpdate() {
        if(utl.camera&&utl.box){
            let ps = utl.box.transform.position
            let cps = utl.camera.transform.position
        
            utl.box.transform.translate(new Laya.Vector3(-utl.moveX,0,-utl.moveY),false)
            utl.camera.transform.translate(new Laya.Vector3(-utl.moveX,0,-utl.moveY),false)
        }
        
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
class BoxMove extends Laya.Script3D { 
constructor() {
super();
}
onStart() {console.log("3333");}

onTriggerEnter()
{
    utl.entity.get('obx').removeSelf();
    temp.creab()
console.log("onTriggerEnter");
}
onTriggerStay()
{
console.log("onTriggerStay");
}
onTriggerExit()
{
console.log("onTriggerExit");
}
onEnable() {
} 
onDisable() {
}
}
class BoxMove3 extends Laya.Script3D { 
constructor() {
super();
}
onStart() {console.log("3333");}

onTriggerEnter()
{
console.log("onTriggerEnter3");
}
onTriggerStay()
{
console.log("onTriggerStay3");
}
onTriggerExit()
{
console.log("onTriggerExit3");
}
onEnable() {
} 
onDisable() {
}
}