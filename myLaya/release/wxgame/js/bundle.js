(function () {
	'use strict';

	var utl = {
		tachLeftFlag:false,//左边点击
		tachRightFlag:false,//左边点击
		box:null,
		moveX:0,
		rote:0,
	    moveY:0,
	    ani:null,
	    entity:new Map()
	};

	/**
	 * 本示例采用非脚本的方式实现，而使用继承页面基类，实现页面逻辑。在IDE里面设置场景的Runtime属性即可和场景进行关联
	 * 相比脚本方式，继承式页面类，可以直接使用页面定义的属性（通过IDE内var属性定义），比如this.tipLbll，this.scoreLbl，具有代码提示效果
	 * 建议：如果是页面级的逻辑，需要频繁访问页面内多个元素，使用继承式写法，如果是独立小模块，功能单一，建议用脚本方式实现，比如子弹脚本。
	 */
	  let temp =null;
	class GameUI extends Laya.Scene {
	    constructor() {
	        super();
			this.loadScene("test/TestScene.scene");

			this.newScene = Laya.stage.addChild(new Laya.Scene3D());
			temp = this;
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
	        this.creaPlayer();
	        
	        Laya.timer.loop(30,this,this.onUpdate);

	        var sfe = this.newScene.addChild(new Laya.MeshSprite3D(Laya.PrimitiveMesh.createSphere(1)));
	        var material = new Laya.BlinnPhongMaterial();
	        sfe.transform.position = new Laya.Vector3(1,20, 3);
	        Laya.Texture2D.load("res/wood.jpg", Laya.Handler.create(null, function(tex) {
	                material.albedoTexture = tex;
	        }));
	        sfe.meshRenderer.material = material;
	        this.createBug();
	        // this.creab()
	        // let df1 = Laya.Sprite3D.load("res/test/xidf.lh")
	        // let layaMonkey = this.newScene.addChild(df1);
	        // console.log(layaMonkey,df1)
	        Laya.Sprite3D.load("res/t2/LayaScene_fff/Conventional/Directional Light.lh", Laya.Handler.create(null, (sp)=> {
	            var layaMonkey1 = this.newScene.addChild(sp);
	            // layaMonkey2.transform.position =new Laya.Vector3(0,3,5)
	            console.log(layaMonkey1,sp);
	        }));
	        
	        Laya.Sprite3D.load("res/t2/LayaScene_fff/Conventional/Main Camera.lh", Laya.Handler.create(null, (sp)=> {
	            var layaMonkey2 = this.newScene.addChild(sp);
	            utl.camera = layaMonkey2;
	            // layaMonkey2.transform.position =new Laya.Vector3(0,3,5)
	            console.log(layaMonkey2,sp);
	        }));
	         
	    }
	    onUpdate() {
	        if(utl.camera&&utl.box){
	            let ps = utl.box.transform.position;
	            let cps = utl.camera.transform.position;
	        
	            utl.box.transform.translate(new Laya.Vector3(-utl.moveX,0,-utl.moveY),false);
	            utl.camera.transform.translate(new Laya.Vector3(-utl.moveX,0,-utl.moveY),false);
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
	            utl.box = layaMonkey1;
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
	            this.creabox(f);
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
	    temp.creab();
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

	class ImageRunTime extends Laya.Sprite{
	    constructor(){
	            super();
	            this.scaleTime = 100;
	            this.width = 300;
	            this.height = 300;
	            this.x = Laya.stage.width - 350;
	            this.y = Laya.stage.height - 350;
	            this.moveX = 0;
	            this.moveY = 0;
	            console.log(this.maind);
	            
	            //设置组件的中心点
	            this.anchorX = this.anchorY = 0.5;
	            //添加鼠标按下事件侦听。按时时缩小按钮。
	            this.on(Laya.Event.MOUSE_DOWN,this,this.scaleSmall);
	            //添加鼠标抬起事件侦听。抬起时还原按钮。
	            this.on(Laya.Event.MOUSE_UP,this, this.scaleBig);
	            //添加鼠标离开事件侦听。离开时还原按钮。
	            this.on(Laya.Event.MOUSE_OUT,this, this.scaleBig);
	            this.on(Laya.Event.MOUSE_MOVE,this, this.leftFormatMovePosition);
	        }
	       scaleBig(e)
	        {        
	            //变大还原的缓动效果
	            utl.moveX = 0;
	            utl.moveY = 0;
	            // Laya.Tween.to(this,{scaleX:1,scaleY:1},this.scaleTime);
	        }
	        scaleSmall(e)
	        {    
	            //缩小至0.8的缓动效果
	            // Laya.Tween.to(this,{scaleX:0.8,scaleY:0.8},this.scaleTime);
	        }
	        getRoteImg(pobj) {
	          let rotate = 0;
	          if (pobj.x1 == pobj.x2){
	            rotate=0;
	          }
	          if (pobj.x1 > pobj.x2) {
	            let atanrotate = (pobj.y1 - pobj.y2) / (pobj.x1 - pobj.x2);
	            rotate = ~~(Math.atan(atanrotate) / Math.PI * 180) + 90;
	          } else if (pobj.x1 < pobj.x2) {
	            let atanrotate = (pobj.y1 - pobj.y2) / (pobj.x1 - pobj.x2);
	            rotate = ~~(Math.atan(atanrotate) / Math.PI * 180) + 270;
	          }
	          return rotate
	        }
	        leftFormatMovePosition(e) {
	          let pobj = {};
	          pobj.x1 = e.stageX; //点击
	          pobj.x2 =this.x + this.width/2;
	          pobj.y1 = e.stageY;
	          pobj.y2 = this.y + this.height/2;
	          utl.rote = this.getRoteImg(pobj) - utl.rote;
	          // tools.getRoteImg(pobj, databus.leftPositions)
	          let r = 1 / Math.sqrt((pobj.x1 - pobj.x2) * (pobj.x1 - pobj.x2) + (pobj.y1 - pobj.y2) * (pobj.y1 - pobj.y2));
	          utl.moveX = (pobj.x1 - pobj.x2) * r; 
	          utl.moveY = (pobj.y1 - pobj.y2) * r;
	          // console.log(this.moveX,this.moveY,utl.box.transform.position)
	        }

	}

	class ImageRunTime$1 extends Laya.Sprite{
	    constructor(){
	            super();
	            this.scaleTime = 100;
	            this.width = 300;
	            this.height = 300;
	            this.x = 50;
	            this.y = Laya.stage.height - 350;
	            this.moveX = 0;
	            this.moveY = 0;
	            console.log(this.maind);
	            
	            //设置组件的中心点
	            this.anchorX = this.anchorY = 0.5;
	            //添加鼠标按下事件侦听。按时时缩小按钮。
	            this.on(Laya.Event.MOUSE_DOWN,this,this.scaleSmall);
	            //添加鼠标抬起事件侦听。抬起时还原按钮。
	            this.on(Laya.Event.MOUSE_UP,this, this.scaleBig);
	            //添加鼠标离开事件侦听。离开时还原按钮。
	            this.on(Laya.Event.MOUSE_OUT,this, this.scaleBig);
	            this.on(Laya.Event.MOUSE_MOVE,this, this.leftFormatMovePosition);
	        }
	       scaleBig(e)
	        {        
	            console.log('MOUSE_UP');
	            //变大还原的缓动效果
	            utl.moveX = 0;
	            utl.moveY = 0;
	            // Laya.Tween.to(this,{scaleX:1,scaleY:1},this.scaleTime);
	        }
	        scaleSmall(e)
	        {    
	          utl.tachLeftFlag = true;
	          console.log('MOUSE_DOWN');
	            //缩小至0.8的缓动效果
	            // Laya.Tween.to(this,{scaleX:0.8,scaleY:0.8},this.scaleTime);
	        }
	        getRoteImg(pobj) {
	          let rotate = 0;
	          if (pobj.x1 == pobj.x2){
	            rotate=0;
	          }
	          if (pobj.x1 > pobj.x2) {
	            let atanrotate = (pobj.y1 - pobj.y2) / (pobj.x1 - pobj.x2);
	            rotate =~~(Math.atan(atanrotate) / Math.PI * 180) + 90;
	          } else if (pobj.x1 < pobj.x2) {
	            let atanrotate = (pobj.y1 - pobj.y2) / (pobj.x1 - pobj.x2);
	            rotate = ~~(Math.atan(atanrotate) / Math.PI * 180) + 270;
	          }
	          return rotate
	        }
	        leftFormatMovePosition(e) {
	          let pobj = {};
	          pobj.x1 = e.stageX; //点击
	          pobj.x2 =this.x + this.width/2;
	          pobj.y1 = e.stageY;
	          pobj.y2 = this.y + this.height/2;
	          utl.box.transform.rotate(new Laya.Vector3(0, utl.rote* Math.PI / 180, 0), true);
	          utl.rote = this.getRoteImg(pobj); 
	          // tools.getRoteImg(pobj, databus.leftPositions)
	          let r = 1 / Math.sqrt((pobj.x1 - pobj.x2) * (pobj.x1 - pobj.x2) + (pobj.y1 - pobj.y2) * (pobj.y1 - pobj.y2));
	          utl.moveX = (pobj.x1 - pobj.x2) * r /10;
	          utl.moveY = (pobj.y1 - pobj.y2) * r/10;
	          utl.box.transform.rotate(new Laya.Vector3(0, -utl.rote* Math.PI / 180, 0), true);
	          // console.log(this.moveX,this.moveY,utl.box.transform.position)
	        }
	}

	class ImageRunTime$2 extends Laya.Sprite{
	    constructor(){
	            super();
	            this.scaleTime = 100;
	            this.width = Laya.stage.width/2; 
	            this.height = Laya.stage.height;
	            this.x = 0;
	            this.y = 0;
	            this.moveX = 0;
	            this.moveY = 0;
	            this.tx=50;
	            this.twidth = 300;
	            this.theight = 300;
	            this.ty = Laya.stage.height - 350;
	            this.flag = false;
	            console.log(this.maind);
	            
	            //设置组件的中心点
	            this.anchorX = this.anchorY = 0.5;
	            //添加鼠标按下事件侦听。按时时缩小按钮。
	            this.on(Laya.Event.MOUSE_DOWN,this,this.scaleSmall);
	            //添加鼠标抬起事件侦听。抬起时还原按钮。
	            this.on(Laya.Event.MOUSE_UP,this, this.scaleBig);
	            //添加鼠标离开事件侦听。离开时还原按钮。
	            this.on(Laya.Event.MOUSE_OUT,this, this.outEvent);
	            this.on(Laya.Event.MOUSE_MOVE,this, this.leftFormatMovePosition);
	        }
	        outEvent(){
	          utl.tachLeftFlag = false;
	        }
	       scaleBig(e)
	        {        
	            console.log('MOUSE_UP');
	            utl.tachLeftFlag = false;
	            //变大还原的缓动效果
	            utl.moveX = 0;
	            utl.moveY = 0;
	            // Laya.Tween.to(this,{scaleX:1,scaleY:1},this.scaleTime);
	        }
	        scaleSmall(e)
	        {    
	          if(this.tx<e.stageX&&
	            e.stageX<this.tx+this.twidth&&
	            this.ty<e.stageY&&
	            e.stageY<this.ty+this.theight
	            ){
	            utl.tachLeftFlag = true;
	          }else{
	            utl.tachLeftFlag = false;
	          }
	          console.log('MOUSE_DOWN');
	            //缩小至0.8的缓动效果
	            // Laya.Tween.to(this,{scaleX:0.8,scaleY:0.8},this.scaleTime);
	        }
	        getRoteImg(pobj) {
	          let rotate = 0;
	          if (pobj.x1 == pobj.x2){
	            rotate=0;
	          }
	          if (pobj.x1 > pobj.x2) {
	            let atanrotate = (pobj.y1 - pobj.y2) / (pobj.x1 - pobj.x2);
	            rotate =~~(Math.atan(atanrotate) / Math.PI * 180) + 90;
	          } else if (pobj.x1 < pobj.x2) {
	            let atanrotate = (pobj.y1 - pobj.y2) / (pobj.x1 - pobj.x2);
	            rotate = ~~(Math.atan(atanrotate) / Math.PI * 180) + 270;
	          }
	          return rotate
	        }
	        leftFormatMovePosition(e) {
	          if(!utl.tachLeftFlag){
	            return
	          }
	          utl.ani.play("hello");
	          console.log(utl.rote);
	          let pobj = {};
	          pobj.x1 = e.stageX; //点击
	          pobj.x2 =this.tx + this.twidth/2;
	          pobj.y1 = e.stageY;
	          pobj.y2 = this.ty + this.theight/2;
	          utl.box.transform.rotate(new Laya.Vector3(0,utl.rote* Math.PI / 180, 0), true);
	          utl.rote = this.getRoteImg(pobj); 
	          // tools.getRoteImg(pobj, databus.leftPositions)
	          let r = 1 / Math.sqrt((pobj.x1 - pobj.x2) * (pobj.x1 - pobj.x2) + (pobj.y1 - pobj.y2) * (pobj.y1 - pobj.y2));
	          utl.moveX = (pobj.x1 - pobj.x2) * r /10;
	          utl.moveY = (pobj.y1 - pobj.y2) * r/10;
	          utl.box.transform.rotate(new Laya.Vector3(0,-utl.rote* Math.PI / 180,0), true);
	          // console.log(this.moveX,this.moveY,utl.box.transform.position)
	        }
	}

	class ImageRunTime$3 extends Laya.Sprite{
	    constructor(){
	            super();
	            this.scaleTime = 100;
	            this.width = 300;
	            this.height = 300;
	            this.x = Laya.stage.width - 350;
	            this.y = Laya.stage.height - 350;
	            this.moveX = 0;
	            this.moveY = 0;
	            console.log(this.maind);
	            
	            //设置组件的中心点
	            this.anchorX = this.anchorY = 0.5;
	            //添加鼠标按下事件侦听。按时时缩小按钮。
	            this.on(Laya.Event.MOUSE_DOWN,this,this.scaleSmall);
	            //添加鼠标抬起事件侦听。抬起时还原按钮。
	            this.on(Laya.Event.MOUSE_UP,this, this.scaleBig);
	            //添加鼠标离开事件侦听。离开时还原按钮。
	            this.on(Laya.Event.MOUSE_OUT,this, this.outEvent);
	            this.on(Laya.Event.MOUSE_MOVE,this, this.leftFormatMovePosition);
	        }
	       scaleBig(e)
	        {        
	            console.log('MOUSE_UP');
	            utl.tachRightFlag = false;
	            // Laya.Tween.to(this,{scaleX:1,scaleY:1},this.scaleTime);
	        }
	        outEvent(){
	          utl.tachRightFlag = false;
	        }
	      
	        scaleSmall(e)
	        {    
	          if(this.tx<e.stageX&&
	            e.stageX<this.tx+this.twidth&&
	            this.ty<e.stageY&&
	            e.stageY<this.ty+this.theight
	            ){
	            utl.tachRightFlag = true;
	          }else{
	            utl.tachRightFlag = false;
	          }
	          console.log('MOUSE_DOWN');
	            //缩小至0.8的缓动效果
	            // Laya.Tween.to(this,{scaleX:0.8,scaleY:0.8},this.scaleTime);
	        }
	        getRoteImg(pobj) {
	          let rotate = 0;
	          if (pobj.x1 == pobj.x2){
	            rotate=0;
	          }
	          if (pobj.x1 > pobj.x2) {
	            let atanrotate = (pobj.y1 - pobj.y2) / (pobj.x1 - pobj.x2);
	            rotate = ~~(Math.atan(atanrotate) / Math.PI * 180) + 90;
	          } else if (pobj.x1 < pobj.x2) {
	            let atanrotate = (pobj.y1 - pobj.y2) / (pobj.x1 - pobj.x2);
	            rotate = ~~(Math.atan(atanrotate) / Math.PI * 180) + 270;
	          }
	          return rotate
	        }
	        leftFormatMovePosition(e) {
	          if(!utl.tachRightFlag){
	            return
	          }
	          let pobj = {};
	          pobj.x1 = e.stageX; //点击
	          pobj.x2 =this.x + this.width/2;
	          pobj.y1 = e.stageY;
	          pobj.y2 = this.y + this.height/2;
	          utl.rote = this.getRoteImg(pobj) - utl.rote;
	          // tools.getRoteImg(pobj, databus.leftPositions)
	          let r = 1 / Math.sqrt((pobj.x1 - pobj.x2) * (pobj.x1 - pobj.x2) + (pobj.y1 - pobj.y2) * (pobj.y1 - pobj.y2));
	          utl.moveX = (pobj.x1 - pobj.x2) * r; 
	          utl.moveY = (pobj.y1 - pobj.y2) * r;
	          // console.log(this.moveX,this.moveY,utl.box.transform.position)
	        }

	}

	/**This class is automatically generated by LayaAirIDE, please do not make any modifications. */

	class GameConfig {
	    static init() {
	        //注册Script或者Runtime引用
	        let reg = Laya.ClassUtils.regClass;
			reg("script/GameUI.js",GameUI);
			reg("script/hander/Right.js",ImageRunTime);
			reg("script/hander/Left.js",ImageRunTime$1);
			reg("script/hander/LeftHand.js",ImageRunTime$2);
			reg("script/hander/RightHand.js",ImageRunTime$3);
	    }
	}
	GameConfig.width = 640;
	GameConfig.height = 1136;
	GameConfig.scaleMode ="full";
	GameConfig.screenMode = "none";
	GameConfig.alignV = "top";
	GameConfig.alignH = "left";
	GameConfig.startScene = "test/TestScene.scene";
	GameConfig.sceneRoot = "";
	GameConfig.debug = false;
	GameConfig.stat = false;
	GameConfig.physicsDebug = false;
	GameConfig.exportSceneToJson = true;

	GameConfig.init();

	class Main {
		constructor() {
			//根据IDE设置初始化引擎		
			if (window["Laya3D"]) Laya3D.init(GameConfig.width, GameConfig.height);
			else Laya.init(GameConfig.width, GameConfig.height, Laya["WebGL"]);
			Laya["Physics"] && Laya["Physics"].enable();
			Laya["DebugPanel"] && Laya["DebugPanel"].enable();
			Laya.stage.scaleMode = GameConfig.scaleMode;
			Laya.stage.screenMode = GameConfig.screenMode;
			Laya.stage.alignV = GameConfig.alignV;
			Laya.stage.alignH = GameConfig.alignH;
			//兼容微信不支持加载scene后缀场景
			Laya.URL.exportSceneToJson = GameConfig.exportSceneToJson;

			//打开调试面板（通过IDE设置调试模式，或者url地址增加debug=true参数，均可打开调试面板）
			if (GameConfig.debug || Laya.Utils.getQueryString("debug") == "true") Laya.enableDebugPanel();
			if (GameConfig.physicsDebug && Laya["PhysicsDebugDraw"]) Laya["PhysicsDebugDraw"].enable();
			if (GameConfig.stat) Laya.Stat.show();
			Laya.alertGlobalError(true);

			//激活资源版本控制，version.json由IDE发布功能自动生成，如果没有也不影响后续流程
			Laya.ResourceVersion.enable("version.json", Laya.Handler.create(this, this.onVersionLoaded), Laya.ResourceVersion.FILENAME_VERSION);
		}

		onVersionLoaded() {
			//激活大小图映射，加载小图的时候，如果发现小图在大图合集里面，则优先加载大图合集，而不是小图
			Laya.AtlasInfoManager.enable("fileconfig.json", Laya.Handler.create(this, this.onConfigLoaded));
		}

		onConfigLoaded() {
			//加载IDE指定的场景
			GameConfig.startScene && Laya.Scene.open(GameConfig.startScene);
		}
	}
	//激活启动类
	new Main();

}());
