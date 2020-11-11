import utl from "../utl.js"
export  default class Boxsd extends Laya.Script3D{
    constructor(){
        super();
        this.scene = null;
        this.text = null;
        this.camera = null;
        this.flag = false
        this.result = []
        this.position = utl.graphDiagonal.grid[0][9]
        this.end = utl.graphDiagonal.grid[99][88]
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
          this.setGraps()
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
        if(this.flag){
           if(this.result.length!=0){
                let ng = this.result[0]
                let nextPoint = utl.postions[ng.x][ng.y]
                Laya.Tween.to( this.owner, { x: nextPoint[0], y: 1, z: nextPoint[1] }, 10000,Laya.Handler.create(this,tod));
                this.position = his.result.shift()
            } 
        }
        
    }
    setGraps(){
        this.result = astar.search(utl.graphDiagonal, this.position,  this.end);
        // console.log(999)
        let p = this.end
        let nextPoint = utl.postions[p.x][p.y]
        // console.log(nextPoint)
        Laya.Tween.to( this._position, { x: nextPoint[0], y: 1, z: nextPoint[1] }, 50000,null,Laya.Handler.create(this,function(){alert(2333)}));
        // Laya.Tween.to( utl.box, { transform.position.x: nextPoint[0], transform.position.y: 1, transform.position.z: nextPoint[1] }, 10000,null,Laya.Handler.create(this,function(){alert(333)}));
    }
    onUpdate(){
       

    }
    onLateUpdate() {
    }
}