import utl from "../utl.js"
export  default class Boxsd extends Laya.Script3D{
    constructor(){
        super();
        this.scene = null;
        this.text = null;
        this.camera = null;
        this.index = 0
        this.moveY = 0
        this.moveX = 0
        this.tempPosition = null
        this.tempGard = null
        this.result = []
    }
    onStart(){
        this.scene =  this.owner.parent;
        let temp = utl.graphDiagonal.grid[99][99]
        this.tempPosition = utl.postions[temp.x][temp.y]
        this.tempGard = utl.graphDiagonal.grid[0][0]
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
    onUpdate(){
        if(this.index%10==0){
            if(this.result.length!=0&&utl.postions){
                let obj = this.result[0]
                let self = this.owner.transform.position
                let po = utl.postions[obj.x][obj.y]
                let distance = Math.sqrt((po[0] - self.x) * (po[0] - self.x) + (po[1] - self.z) * (po[1] - self.z))
                console.log(po,'+++++++++')
                if(distance<this.moveY+this.moveX){
                    this.result.shift()
                    this.result.length!=0&&this.flying()
                }
                // let p = this.result.shift()
                // let po = utl.postions[p.x][p.y]
                // console.log(po)

                // this.owner.transform.translate(new Laya.Vector3(this.moveX,0,this.moveY),false);

                // utl.box.transform.position = new Laya.Vector3(this.owner.transform.position.x,1,this.owner.transform.position.z)
                this.owner.transform.position = new Laya.Vector3(this.tempPosition[0],1,this.tempPosition[1])
            }
               
        }
        if(this.index%100==0){
            if(utl.graphDiagonal){
                console.log(3333333)
                let x = Math.ceil(Math.random()*10)*9;
                console.log(x)
                this.result = astar.search(utl.graphDiagonal, this.tempGard,  utl.graphDiagonal.grid[99][88]);
                this.flying()
                // let obj = utl.graphDiagonal.grid[99][99]
                // let po = utl.postions[obj.x][obj.y]
                // utl.box4.transform.position = new Laya.Vector3(utl.pfrf,1,utl.fre)
            }
            
        }
        this.index++

    }
    onLateUpdate() {
    }
}