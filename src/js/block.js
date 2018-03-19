var $ = {
    switcher: true
}
//初始化
$.init = function(){
    this.removeAds()
    this.watch()
}
//初始化右屏蔽侧推荐栏
$.initRightAdsSwitch = function(){
    var _this = this
    chrome.storage.sync.get("on_off", function(data){
        _this.switcher = data["on_off"]
        _this.removeRightAds()
    })
}
//删除所有广告
$.removeAds = function(){
    this.removeFakeAds()
    this.initRightAdsSwitch()
}
//删除假冒搜索结果广告
$.removeFakeAds = function(){
    console.log("clean fake ads in search results...")
    var ads = document.querySelectorAll("#content_left>div")
    for(var i = 0, adslen = ads.length; i < adslen; i++){
        var span = ads[i].querySelectorAll("span")
        if(span.length !== 0){
            for(var j = 0, spanlen = span.length; j < spanlen; j++){
                if(span[j].innerHTML === "广告"){
                    ads[i].style.height = 0
                    ads[i].style.overflow = "hidden"
                    ads[i].style.margin = 0
                    ads[i].style.padding = 0
                    break
                }
            }
        }
    }
}
//删除右边栏推荐
$.removeRightAds = function(){
    if(this.switcher){
        var rightBlock = document.querySelector("#content_right")
        if(rightBlock){
            console.log("clean right aside recommends...")
            rightBlock.remove()
        }
    }
}
//监听ajax变化导致的页面变动
$.watch = function(){
    var _this = this
    var observer = new MutationObserver(function(){
        console.log("ducument constructor changed..., remove ads again")
        _this.removeAds()
    })
    var node = document.getElementById("wrapper_wrapper")
    observer.observe(node, {
        "childList": true,
        "characterData": false,
        "attributes": false,
        "subtree": true
    })
}
//初始化
$.init()