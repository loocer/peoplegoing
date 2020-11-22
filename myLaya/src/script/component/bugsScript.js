import utl from "../utl.js"
export  default class bugs extends Laya.Script3D{
    constructor(){
        super();
        this.scene = null;
        this.text = null;
        this.camera = null;
        this.flag = true
        this.result = []
        this.position = utl.graphDiagonal.grid[0][0]
        this.end = utl.graphDiagonal.grid[10][0]
        this._position = null
        this.updataPositionFlag = true
    }
    onStart(){
        this.scene =  this.owner.parent;
         let p = this.position
         let nextPoint = utl.postions[p.x][p.y]
         this._position = new Laya.Vector3(nextPoint[0], 1, nextPoint[1]);
         Laya.timer.frameLoop(1, this, ()=>{
            this.owner.transform.position = this._position;
         });
         Laya.timer.frameLoop(100, this, ()=>{
            this.move()
         });
          // this.setGraps()
    }
    flying(){
        let CONTANT = .002
        let pbox = this.result[0]
        let po = utl.postions[pbox.x][pbox.y]
        // this.tempPosition = po
        // this.tempGard = utl.graphDiagonal.grid[pbox.x][pbox.y]
        let pthis = this.owner.transform.position
        let fib = (po[0]-pthis.x)/(po[1]-pthis.z)
        this.moveY = Math.sqrt(CONTANT/(fib*fib+CONTANT));
        this.moveX = this.moveY*fib

    }

    move(){
        this.flag = true
        
    }
    gradAlgin(){
        if(this.updataPositionFlag){
            this.setGraps()
        }
    }
    setGraps(){
        if(this.result.length!=0){
            let temp = this
            let p =  this.result.shift()
            let nextPoint = utl.postions[p.x][p.y]
            this.position = p
            temp.updataPositionFlag = false
            Laya.Tween.to( this._position, { x: nextPoint[0], y: 0, z: nextPoint[1] }, 1000,null,Laya.Handler.create(this,()=>{
                temp.updataPositionFlag = true
                temp.gradAlgin();
            }));
        }
       
        // Laya.Tween.to( utl.box, { transform.position.x: nextPoint[0], transform.position.y: 1, transform.position.z: nextPoint[1] }, 10000,null,Laya.Handler.create(this,function(){alert(333)}));
    }
    getPlayerPosition(){
        let position = utl.player.transform.position
        let minPisition = utl.minPisition
        let gx = Math.floor((position.x - utl.ground.min.x) / minPisition.x)
        let gy = Math.floor((position.z - utl.ground.min.z) / minPisition.y)
        console.log(gx,gy,'-------------')
        return  utl.graphDiagonal.grid[gy][gx]
    }
    onUpdate(){
       if(this.flag){
            let end = this.getPlayerPosition()
            this.result = astar.search(utl.graphDiagonal, this.position, end);
            this.flag = false
            this.gradAlgin()
       }
        
    }
    onLateUpdate() {
    }
}