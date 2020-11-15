import utl from "../utl.js"
export  default class bugs extends Laya.Script3D{
    constructor(){
        super();
        this.scene = null;
        this.text = null;
        this.camera = null;
        this.flag = true
        this.result = []
        this.position = utl.graphDiagonal.grid[0][9]
        this.end = utl.graphDiagonal.grid[99][93]
        this._position = null
    }
    onStart(){
        this.scene =  this.owner.parent;
        // let temp = utl.graphDiagonal.grid[99][99]
        // this.tempPosition = utl.postions[temp.x][temp.y]
        // this.tempGard = utl.graphDiagonal.grid[0][0]
        

         let p = this.position
         let nextPoint = utl.postions[p.x][p.y]
         this._position = new Laya.Vector3(nextPoint[0], 1, nextPoint[1]);
         Laya.timer.frameLoop(1, this, ()=>{
            this.owner.transform.position = this._position;
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
    tod(){
        alert(43434)
    }

    move(){
        this.flag = true
        
    }
    setGraps(){
        
        console.log(999)
        let temp = this
        let p =  this.result.shift()
        let nextPoint = utl.postions[p.x][p.y]
        console.log(nextPoint)
        Laya.Tween.to( this._position, { x: nextPoint[0], y: 0, z: nextPoint[1] }, 1000,null,Laya.Handler.create(this,()=>{
            temp.setGraps()}));
        // Laya.Tween.to( utl.box, { transform.position.x: nextPoint[0], transform.position.y: 1, transform.position.z: nextPoint[1] }, 10000,null,Laya.Handler.create(this,function(){alert(333)}));
    }
    onUpdate(){
       if(this.flag){
            this.result = astar.search(utl.graphDiagonal, this.position,  this.end);
            this.flag = false
            this.setGraps()
       }
        
    }
    onLateUpdate() {
    }
}