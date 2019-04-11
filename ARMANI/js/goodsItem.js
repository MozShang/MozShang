class GoodsItem{
    constructor(parent){
        this.goodsList=[];
        this.ajax({type:0x10},parent);
    }
    ajax(_obj,parent){
        var self=this;
        var obj=encodeURIComponent(JSON.stringify(_obj));
        $.ajax({
            type:"POST",
            url:"http://10.9.25.246:3000",
            data:obj,
            success:function (data) {
                var elem=JSON.parse(decodeURIComponent(data));
                if(elem.length<1){

                }else{
                    self.goodsList=elem;
                    var goodsListTop=document.getElementById("goodsListTop");
                    goodsListTop.textContent="商品（"+self.goodsList.length+"）";
                    for(var i=0;i<self.goodsList.length;i++){
                        self.createBox(i,parent);
                    }
                }

            }
        })
    }

    createBox(i,parent){
        var box=this.$c("div",{
            width:"20%",
            margin:"60px 2.5%",
            float:"left",
            cursor:"default"
        },parent);
        box.addEventListener("click",this.clickHandler,true);
        box.data=this.goodsList[i];
        var imgBox=this.$c("div",{
            width:"100%",
            height:"280px"
        },box);
        var img=this.$c("img",{
            margin:"auto",
            width:"250px",
            height:"250px"
        },imgBox);
        img.src=this.goodsList[i].imgSrc;
        var title=this.$c("p",{
            width:"100%",
            height:"38px",
            fontSize:"14px",
            textAlign:"center",
            lineHeight:"38px",
            cursor:"default"
        },box,this.goodsList[i].title);
        var engTitle=this.$c("p",{
            width:"100%",
            height:"30px",
            fontSize:"12px",
            textAlign:"center",
            lineHeight:"30px",
            cursor:"default"
        },box,this.goodsList[i].engTitle);
        var standards=this.$c("p",{
            width:"100%",
            height:"30px",
            padding:"15px 0",
            fontSize:"12px",
            textAlign:"center",
            lineHeight:"30px",
            background:"url('./images/stars.png') no-repeat center bottom",
            cursor:"default"
        },box,this.goodsList[i].standards);
        var bottomBox=this.$c("div",{
            height:"35px",
            width:"100%",
            margin:"15px 0"
        },box);
        var minBox=this.$c("div",{
            height:"35px",
            width:"200px",
            margin:"auto"
        },bottomBox);
        var style={
            height:"35px",
            width:"100px",
            float:"left",
            color:"#ffffff",
            fontSize:"14px",
            lineHeight:"35px",
            textAlign:"center",
            cursor:"default"
        };
        var price=this.$c("div",style,minBox,"￥"+this.goodsList[i].price);
        price.style.backgroundColor="#464646";
        var type=this.$c("div",style,minBox,this.goodsList[i].type);
        type.style.backgroundColor="#151515";
    }

    clickHandler(e){
        if(e.currentTarget.constructor!==HTMLDivElement) return;
        console.log(JSON.stringify(e.currentTarget.data));
        sessionStorage.lookingGood=JSON.stringify(e.currentTarget.data);
        location.href="./goodsInfo.html";
    }

    $c(elem,style,parent,text){
        var elem=document.createElement(elem);
        if(style){
            Object.assign(elem.style,style);
        }
        if(text) elem.textContent=text;
        if(!parent) parent=document.body;
        parent.appendChild(elem);
        return elem;
    }
}