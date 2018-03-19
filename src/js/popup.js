// 实现点击关于作者，开启新tab
var p = document.querySelector(".author")
p.onclick = function(){
	chrome.tabs.create({"url":"https://github.com/vampire624", "selected":true})
}
var tip = document.querySelector(".tip")
var button = document.querySelector(".button-container")
//获取storage中on_off属性的值，未定义设置为true，默认开启屏蔽右侧推荐栏
chrome.storage.sync.get("on_off", function(data){
	(data["on_off"] === undefined) && (data["on_off"] = true)
	if(data["on_off"] === true){
		button.classList.toggle("on")
	}else{
		button.classList.toggle("off")
	}
})
//点击开关切换是否开启右侧推荐栏
button.onclick = function(){
	if(this.classList.contains("on")) {
		chrome.storage.sync.set({"on_off": false}, function(){
			console.log("on_off is off now...")
		})
		this.classList.remove("on")
		this.classList.add("off")
		tip.innerHTML = "已取消屏蔽右侧推荐栏，刷新页面即可。"
	}else{
		switcher = true
		chrome.storage.sync.set({"on_off": true}, function(){
			console.log("on_off is on now...")
		})
		this.classList.remove("off")
		this.classList.add("on")
		tip.innerHTML = "已屏蔽右侧推荐栏，刷新页面即可。"
	}
}
