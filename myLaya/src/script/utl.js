export default  {
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
    entity:new Map()
}