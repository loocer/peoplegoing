export default  {
	tachLeftFlag:false,//左边点击
	tachRightFlag:false,//左边点击
	box:null,
    player:null,
	moveX:0,
    moveY:0,
    speedMove:.05,
    ground:null,
    leftHand:{},
    minPisition:{
        x:null,
        y:null
    },
    getRoteImg:(pobj, acObj)=> {
      if (pobj.x1 == pobj.x2){
        acObj.rotate=0
      }
      if (pobj.x1 > pobj.x2) {
        let atanrotate = (pobj.y1 - pobj.y2) / (pobj.x1 - pobj.x2)
        acObj.rotate = ~~(Math.atan(atanrotate) / Math.PI * 180) + 90
      } else if (pobj.x1 < pobj.x2) {
        let atanrotate = (pobj.y1 - pobj.y2) / (pobj.x1 - pobj.x2)
        acObj.rotate = ~~(Math.atan(atanrotate) / Math.PI * 180) + 270
      }
    }
}