
let address = 'http://192.168.2.103:3000'
let HttpRequest = Laya.HttpRequest
let Event       = Laya.Event;
let result = {}
export const getPixels = ()=>
{	
	return new Promise((reject)=>{
		let obj = {}
		let hr = new HttpRequest();
		// let id = Date.parse(new  Date())
		let id = 435
		function onHttpRequestProgress(e){
			console.log(e)
		}
		function onHttpRequestComplete(e){
			reject(hr.data);
		}
		function onHttpRequestError(e){
			console.log(e)
		}
		
		hr.once(Event.PROGRESS, this, onHttpRequestProgress);
		hr.once(Event.COMPLETE, this, onHttpRequestComplete);
		hr.once(Event.ERROR, this, onHttpRequestError);
		hr.send(address+'/get-alluser', '', 'get', 'text');
	})
	
	
}
export const getServiceAddress = ()=>
{
	let hr = new HttpRequest();
	function onHttpRequestProgress(e){
		console.log(123)
	}
	function onHttpRequestComplete(e){
		result.serviceAddress = JSON.parse(hr.data).data;
		login()
		console.log(3458888,result)
	}
	function onHttpRequestError(e){
		console.log(534543,e)
	}
	hr.once(Event.PROGRESS, this, onHttpRequestProgress);
	hr.once(Event.COMPLETE, this, onHttpRequestComplete);
	hr.once(Event.ERROR, this, onHttpRequestError);
	hr.send(address+'/get-socketAddress', '', 'get', 'text');
	
}
export const intoRoom = ()=>
{
	let headers = [
		"Content-Type", "application/x-www-form-urlencoded",
		'token', result.userInfo.token,
		'user_id',result.userInfo.id
	];
	let hr = new HttpRequest();
	function onHttpRequestProgress(e){
		console.log(123)
	}
	function onHttpRequestComplete(e){
		socketMain()
		console.log(888888888,hr)
	}
	function onHttpRequestError(e){
		console.log(534543,e)
	}
	hr.once(Event.PROGRESS, this, onHttpRequestProgress);
	hr.once(Event.COMPLETE, this, onHttpRequestComplete);
	hr.once(Event.ERROR, this, onHttpRequestError);
	hr.send(address+'/into-room?roomNo=123', null, 'get', 'text',headers);
	
}