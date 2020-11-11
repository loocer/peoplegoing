(function () {
    'use strict';

    var utl = {
    	tachLeftFlag:false,//左边点击
    	tachRightFlag:false,//左边点击
    	box:null,
    	moveX:0,
    	rote:0,
        moveY:0,
        speedMove:.05,
        speed:{
        	z:0,
        	x:0,
        	y:0
        },
        takeSpeed:{
        	z:0,
        	x:0,
        	y:0
        },
        comitObj:{
            userId:null,
            rotation:null,
            position:null
        },
        ani:null,
        ground:null,
        entity:new Map()
    };

    class newtach{
        constructor(){
                
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
                utl.takeSpeed.x = 0;
                utl.takeSpeed.y = 0;
                // Laya.Tween.to(this,{scaleX:1,scaleY:1},this.scaleTime);
            }
            scaleSmall(x,y)
            {    
              if(this.tx<x&&
                x<this.tx+this.twidth&&
                this.ty<y&&
                y<this.ty+this.theight
                ){
                return true
              }else{
                return false
              }
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
            leftFormatMovePosition(px,py) {
              
              // utl.ani.play("hello");
              let pobj = {};
              pobj.x1 = px; //点击
              pobj.x2 =this.tx + this.twidth/2;
              pobj.y1 = py;
              pobj.y2 = this.ty + this.theight/2;
              if((px - this.tx - this.twidth/2) / (this.twidth/2) >1){
                utl.takeSpeed.x = 1;
              }else{
                 utl.takeSpeed.x = (px - this.tx - this.twidth/2) / (this.twidth/2); 
              }
              if((px - this.tx - this.twidth/2) / (this.twidth/2) <-1){
                utl.takeSpeed.x = -1;
              }else{
                 utl.takeSpeed.x = (px - this.tx - this.twidth/2) / (this.twidth/2); 
              }
              if((py - this.ty - this.theight/2) / (this.theight/2) >1){
                 utl.takeSpeed.y = 1;
              }else{
                utl.takeSpeed.y = (py - this.ty - this.theight/2) / (this.theight/2); 
              }
              if((py - this.ty - this.theight/2) / (this.theight/2) <-1){
                 utl.takeSpeed.y = -1;
              }else{
                utl.takeSpeed.y = (py - this.ty - this.theight/2) / (this.theight/2); 
              }
              // utl.takeSpeed.y = py - this.ty - this.theight/2
              // utl.box.transform.rotate(new Laya.Vector3(0,utl.rote* Math.PI / 180, 0), true);
              // utl.rote = this.getRoteImg(pobj) 
              // // tools.getRoteImg(pobj, databus.leftPositions)
              // let r = 1 / Math.sqrt((pobj.x1 - pobj.x2) * (pobj.x1 - pobj.x2) + (pobj.y1 - pobj.y2) * (pobj.y1 - pobj.y2))
              // utl.moveX = (pobj.x1 - pobj.x2) * r /10
              // utl.moveY = (pobj.y1 - pobj.y2) * r/10
              // utl.box.transform.rotate(new Laya.Vector3(0,-utl.rote* Math.PI / 180,0), true);
              // console.log(this.moveX,this.moveY,utl.box.transform.position)
            }
    }

    class newTwo{
        constructor(){
                this.scaleTime = 100;
                this.width = 300;
                this.height = 300;
                this.x = Laya.stage.width - 350;
                this.y = Laya.stage.height - 350;
                this.moveX = 0;
                this.moveY = 0;
                this.tx=Laya.stage.width - 350;
                this.twidth = 300;
                this.theight = 300;
                this.ty = Laya.stage.height - 350;
                this.flag = false;
                console.log(this.maind);
                
              
            }
           scaleBig(e)
            {        
                utl.takeSpeed.z = 0;
                console.log('MOUSE_UP');
                utl.tachRightFlag = false;
                // Laya.Tween.to(this,{scaleX:1,scaleY:1},this.scaleTime);
            }
            outEvent(){
              utl.tachRightFlag = false;
            }
          
           scaleSmall(x,y)
            {    
              if(this.tx<x&&
                x<this.tx+this.twidth&&
                this.ty<y&&
                y<this.ty+this.theight
                ){
                return true
              }else{
                return false
              }
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
            leftFormatMovePosition(px,py) {
             console.log(5654645,px,py);
              // utl.ani.play("hello");
              let pobj = {};
              pobj.x1 = px; //点击
              pobj.x2 =this.tx + this.twidth/2;
              pobj.y1 = py;
              pobj.y2 = this.ty + this.theight/2;
            
              if((py - this.ty - this.theight/2) / (this.theight/2) >1){
                 utl.takeSpeed.z = 1;
              }else{
                utl.takeSpeed.z = (py - this.ty - this.theight/2) / (this.theight/2); 
              }
              if((py - this.ty - this.theight/2) / (this.theight/2) <-1){
                 utl.takeSpeed.z = -1;
              }else{
                utl.takeSpeed.z = (py - this.ty - this.theight/2) / (this.theight/2); 
              }
            }

    }

    class Boxsd extends Laya.Script3D{
        constructor(){
            super();
            this.scene = null;
            this.text = null;
            this.camera = null;
            this.flag = false;
            this.result = [];
            this.position = utl.graphDiagonal.grid[0][9];
            this.end = utl.graphDiagonal.grid[99][88];
            this._position = null;
        }
        onStart(){
            this.scene =  this.owner.parent;
            // let temp = utl.graphDiagonal.grid[99][99]
            // this.tempPosition = utl.postions[temp.x][temp.y]
            // this.tempGard = utl.graphDiagonal.grid[0][0]
            
             
             let p = this.position;
             let nextPoint = utl.postions[p.x][p.y];
             this._position = new Laya.Vector3(nextPoint[0], 1, nextPoint[1]);
             Laya.timer.frameLoop(1, this, ()=>{
                this.owner.transform.position = this._position;
             });
              this.setGraps();
        }
        flying(){
            let CONTANT = .002;
            let pbox = this.result[0];
            let po = utl.postions[pbox.x][pbox.y];
            // this.tempPosition = po
            // this.tempGard = utl.graphDiagonal.grid[pbox.x][pbox.y]
            let pthis = this.owner.transform.position;
            let fib = (po[0]-pthis.x)/(po[1]-pthis.z);
            this.moveY = Math.sqrt(CONTANT/(fib*fib+CONTANT));
            this.moveX = this.moveY*fib;

        }
        tod(){
            alert(43434);
        }

        move(){
            if(this.flag){
               if(this.result.length!=0){
                    let ng = this.result[0];
                    let nextPoint = utl.postions[ng.x][ng.y];
                    Laya.Tween.to( this.owner, { x: nextPoint[0], y: 1, z: nextPoint[1] }, 10000,Laya.Handler.create(this,tod));
                    this.position = his.result.shift();
                } 
            }
            
        }
        setGraps(){
            this.result = astar.search(utl.graphDiagonal, this.position,  this.end);
            // console.log(999)
            let p = this.end;
            let nextPoint = utl.postions[p.x][p.y];
            // console.log(nextPoint)
            Laya.Tween.to( this._position, { x: nextPoint[0], y: 1, z: nextPoint[1] }, 50000,null,Laya.Handler.create(this,function(){alert(2333);}));
            // Laya.Tween.to( utl.box, { transform.position.x: nextPoint[0], transform.position.y: 1, transform.position.z: nextPoint[1] }, 10000,null,Laya.Handler.create(this,function(){alert(333)}));
        }
        onUpdate(){
           

        }
        onLateUpdate() {
        }
    }

    /**
     * 本示例采用非脚本的方式实现，而使用继承页面基类，实现页面逻辑。在IDE里面设置场景的Runtime属性即可和场景进行关联
     * 相比脚本方式，继承式页面类，可以直接使用页面定义的属性（通过IDE内var属性定义），比如this.tipLbll，this.scoreLbl，具有代码提示效果
     * 建议：如果是页面级的逻辑，需要频繁访问页面内多个元素，使用继承式写法，如果是独立小模块，功能单一，建议用脚本方式实现，比如子弹脚本。
     */
      let temp =null;
    class GameUI extends Laya.Scene {
        constructor() {
            super();
            this.isTwoTouch = false;
            this.twoFirst = true;
            this.ground = {};
            utl.graphDiagonal = null;
            utl.postions = null;
    		this.loadScene("test/TestScene.scene");

    		this.newScene = Laya.stage.addChild(new Laya.Scene3D());
    		temp = this;

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
            this.setGraph();
            Laya.stage.addChild(this.text);
    		let dfp = Laya.Sprite3D.load("res/LayaScene_SampleScene/Conventional/ground.lh", Laya.Handler.create(null, (sp)=> {
                this.newScene.addChild(sp);
                utl.ground = sp;
                let mode = sp.getChildByName("Obj3d66-1101934-1-638");
                let sharedMesh = mode.meshFilter.sharedMesh;    
                let min = mode.meshRenderer.bounds.getMin();
                let max = mode.meshRenderer.bounds.getMax();
                utl.coeb =  mode.meshRenderer.bounds.getExtent();
                utl.pfrf = utl.coeb.x; 
                utl.fre = utl.coeb.z; 
                // utl.coeb =  mode.transform.position
                console.log(mode.meshRenderer.bounds);
                this.ground = {
                    min,
                    max,
                    w:max.x - min.x ,
                    h:max.z - min.z
                };
                this.setAllPosation(this.ground);
                this.setBox();
                // layaMonkey2.transform.position =new Laya.Vector3(0,3,5)
            }));
            Laya.Sprite3D.load("res/LayaScene_SampleScene/Conventional/Main Camera.lh", Laya.Handler.create(null, (sp)=> {
                this.newScene.addChild(sp);
                utl.box = sp;
                sp.transform.position = new Laya.Vector3(0,40,0);
                sp.addComponent(MonkeyScript);
                
                 console.log(sp.transform.position,'-==-=-=-=-=--');

            }));
             Laya.Sprite3D.load("res/LayaScene_SampleScene/Conventional/Directional Light.lh", Laya.Handler.create(null, (sp)=> {
                this.newScene.addChild(sp);
            }));
            
        }
        setBox(){
            let box4 = this.newScene.addChild(new Laya.MeshSprite3D(Laya.PrimitiveMesh.createBox(.2,.2,2)));
            box4.transform.position =new Laya.Vector3(this.ground.min.x,.2,this.ground.min.z);
            box4.addComponent(Boxsd);
            utl.box4 = box4;
        }
        setGraph(){
            let list  = [];
            for(let i=0;i<100;i++){
                let array = [];
                for(let o=0;o<100;o++){
                    array.push(1);
                }
                list.push(array);
            }
            utl.graphDiagonal = new Graph(list, { diagonal: true });
        }
        setAllPosation({w,h,min,max}){
            let initx = this.ground.min.x; 
            let inity = this.ground.min.z; 
            let pw = w/100;
            let ph = h/100;
            let list  = [];
            for(let i=0;i<100;i++){
                let array = [];
                for(let j=0;j<100;j++){
                    // array.push([pw*j - utl.coeb.x,ph*i -utl.coeb.z])
                    array.push([pw*j +initx,ph*i+inity]);
                }
                list.push(array);
            }
            utl.postions = list;
        }
        onUpdate() {
            console.log(55555);
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

    class MonkeyScript extends Laya.Script3D{
        constructor(){
            super();
            this.scene = null;
            this.text = null;
            this.camera = null;
            this.newTouch = new newtach();
            this.newTor = new newTwo();
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
                    this.newTouch.leftFormatMovePosition(touch.position.x,touch.position.y);
                }

                if(this.newTor.scaleSmall(touch.position.x,touch.position.y)){
                    this.newTor.leftFormatMovePosition(touch.position.x,touch.position.y);
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
                        this.newTouch.leftFormatMovePosition(touch.position.x,touch.position.y);
                    }
                    if(this.newTouch.scaleSmall(touch2.position.x,touch2.position.y)){
                        this.newTouch.leftFormatMovePosition(touch.position.x,touch.position.y);
                    }

                    if(this.newTor.scaleSmall(touch.position.x,touch.position.y)){
                        this.newTor.leftFormatMovePosition(touch.position.x,touch.position.y);
                    }
                    if(this.newTor.scaleSmall(touch2.position.x,touch2.position.y)){
                        this.newTor.leftFormatMovePosition(touch.position.x,touch.position.y);
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
            this.flying(touchCount);
            this.owner.transform.translate(new Laya.Vector3(-utl.takeSpeed.x*utl.speedMove,0,-utl.takeSpeed.y*utl.speedMove),false);


        }
        onLateUpdate() {
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
              // let pobj = {}
              // pobj.x1 = e.stageX //点击
              // pobj.x2 =this.x + this.width/2
              // pobj.y1 = e.stageY
              // pobj.y2 = this.y + this.height/2
              // utl.rote = this.getRoteImg(pobj) - utl.rote
              // // tools.getRoteImg(pobj, databus.leftPositions)
              // let r = 1 / Math.sqrt((pobj.x1 - pobj.x2) * (pobj.x1 - pobj.x2) + (pobj.y1 - pobj.y2) * (pobj.y1 - pobj.y2))
              // utl.moveX = (pobj.x1 - pobj.x2) * r 
              // utl.moveY = (pobj.y1 - pobj.y2) * r
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
              // let pobj = {}
              // pobj.x1 = e.stageX //点击
              // pobj.x2 =this.x + this.width/2
              // pobj.y1 = e.stageY
              // pobj.y2 = this.y + this.height/2
              // utl.box.transform.rotate(new Laya.Vector3(0, utl.rote* Math.PI / 180, 0), true);
              // utl.rote = this.getRoteImg(pobj) 
              // // tools.getRoteImg(pobj, databus.leftPositions)
              // let r = 1 / Math.sqrt((pobj.x1 - pobj.x2) * (pobj.x1 - pobj.x2) + (pobj.y1 - pobj.y2) * (pobj.y1 - pobj.y2))
              // utl.moveX = (pobj.x1 - pobj.x2) * r /10
              // utl.moveY = (pobj.y1 - pobj.y2) * r/10
              // utl.box.transform.rotate(new Laya.Vector3(0, -utl.rote* Math.PI / 180, 0), true);
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
                utl.takeSpeed.x = 0;
                utl.takeSpeed.y = 0;
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
              // if(!utl.tachLeftFlag){
              //   return
              // }
              // // utl.ani.play("hello");
              // let pobj = {}
              // pobj.x1 = e.stageX //点击
              // pobj.x2 =this.tx + this.twidth/2
              // pobj.y1 = e.stageY
              // pobj.y2 = this.ty + this.theight/2
              // if((e.stageX - this.tx - this.twidth/2) / (this.twidth/2) >1){
              //   utl.takeSpeed.x = 1
              // }else{
              //    utl.takeSpeed.x = (e.stageX - this.tx - this.twidth/2) / (this.twidth/2) 
              // }
              // if((e.stageX - this.tx - this.twidth/2) / (this.twidth/2) <-1){
              //   utl.takeSpeed.x = -1
              // }else{
              //    utl.takeSpeed.x = (e.stageX - this.tx - this.twidth/2) / (this.twidth/2) 
              // }
              // if((e.stageY - this.ty - this.theight/2) / (this.theight/2) >1){
              //    utl.takeSpeed.y = 1
              // }else{
              //   utl.takeSpeed.y = (e.stageY - this.ty - this.theight/2) / (this.theight/2) 
              // }
              // if((e.stageY - this.ty - this.theight/2) / (this.theight/2) <-1){
              //    utl.takeSpeed.y = -1
              // }else{
              //   utl.takeSpeed.y = (e.stageY - this.ty - this.theight/2) / (this.theight/2) 
              // }
              // let x = 1,y=1,z=1
              // console.log(utl.socket)
               
              // utl.takeSpeed.y = e.stageY - this.ty - this.theight/2
              // utl.box.transform.rotate(new Laya.Vector3(0,utl.rote* Math.PI / 180, 0), true);
              // utl.rote = this.getRoteImg(pobj) 
              // // tools.getRoteImg(pobj, databus.leftPositions)
              // let r = 1 / Math.sqrt((pobj.x1 - pobj.x2) * (pobj.x1 - pobj.x2) + (pobj.y1 - pobj.y2) * (pobj.y1 - pobj.y2))
              // utl.moveX = (pobj.x1 - pobj.x2) * r /10
              // utl.moveY = (pobj.y1 - pobj.y2) * r/10
              // utl.box.transform.rotate(new Laya.Vector3(0,-utl.rote* Math.PI / 180,0), true);
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
                this.tx=Laya.stage.width - 350;
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
           scaleBig(e)
            {        
                utl.takeSpeed.z = 0;
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
              // console.log(33333)
              // if(!utl.tachRightFlag){
              //   return
              // }
              // // utl.ani.play("hello");
              // let pobj = {}
              // pobj.x1 = e.stageX //点击
              // pobj.x2 =this.tx + this.twidth/2
              // pobj.y1 = e.stageY
              // pobj.y2 = this.ty + this.theight/2
            
              // if((e.stageY - this.ty - this.theight/2) / (this.theight/2) >1){
              //    utl.takeSpeed.z = 1
              // }else{
              //   utl.takeSpeed.z = (e.stageY - this.ty - this.theight/2) / (this.theight/2) 
              // }
              // if((e.stageY - this.ty - this.theight/2) / (this.theight/2) <-1){
              //    utl.takeSpeed.z = -1
              // }else{
              //   utl.takeSpeed.z = (e.stageY - this.ty - this.theight/2) / (this.theight/2) 
              // }
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
