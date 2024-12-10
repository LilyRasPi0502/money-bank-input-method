
class MyCustomElement extends HTMLElement {
    static observedAttributes = ["color", "size"];

    constructor() { super();    }
    connectedCallback() {   }
    disconnectedCallback() {    }
    adoptedCallback() { }
    attributeChangedCallback(name, oldValue, newValue) {    }
}
class inputer{
    constructor() {
        this.Server = "./";
        this.Value = new Array();
        this.setWordCount(4);
        this.InputCount = 0;
        this.AutoReset = true;
        this.inputer = document.getElementsByTagName("money-bank-input-method")[0];
        this.attributes = this.inputer.attributes;
        this.width = (typeof this.attributes.width === 'undefined')?"600px":this.attributes.width.value;
        this.height = parseInt(this.width)/1.5;
        this.Scale = parseInt(this.width)/600;
        
        // 新增輸入顯示器Panel
        const InputerDisplayPanel = "<div id='InputerDisplayPanel' "+
            "class='InputerDisplayPanel' style='margin-top:"+(parseInt(this.height)/3*2)+"px;width:"+this.width+";'>"+
            "</div>";
        
        // 新增轉盤
        const PassWordTurntable = "<img src='"+this.Server+"BankInputer.png' id='PassWordTurntable' "+
            "style='width:"+150*this.Scale+";height:"+150*this.Scale+";top:"+(20*this.Scale)+"px;position:absolute;top:20px;'></div>";
        // 新增指針  
        const PassWordIndicator = "<div class='PassWordIndicator' "+
            "style='left:"+((75*this.Scale)-(5*this.Scale)+(4*(this.Scale-1)))+"px;transform: rotate(180deg) scale("+this.Scale+");'></div>";
            //console.log(this.Scale);
        // 新增輸入器總成
        const InputerPanel = "<div class='InputerPanel' style='left:"+(parseInt(this.width)/10)*6+"px;margin-top:20px'>"+
            PassWordIndicator+PassWordTurntable+"</div>";
        
        // 新增Panel總成    
        const BankinputerPanel = "<div class='BankinputerPanel'>"+
            InputerPanel+InputerDisplayPanel+"</div>";
            
        this.inputer.innerHTML = "<div class='BankinputerPanelBG' style='width:"+
            this.width+";height:"+this.height+";'>"+BankinputerPanel+
            "</div><link rel='stylesheet' href='"+this.Server+"styles.css'>";//
            
        // 刷新輸入顯示器元素
        this.updateInputerDisplay();
        
        // 新增ontouch方法
        TouchEmulator();
        
        const PassWordTurntableID = document.getElementById("PassWordTurntable");
        PassWordTurntableID.addEventListener('touchstart', this.StartTouch, false);
        PassWordTurntableID.addEventListener('touchmove', this.MoveTouch, false);
        PassWordTurntableID.addEventListener('touchend', this.EndTouch, false);

    }
    Debug(){
        console.log(this.Value);
    }
    StartTouch(ev) {
        //this.InputCount = 0;
        money_bank_input_method.StartY = ev.changedTouches[0].clientY;
    }
    MoveTouch(ev) {
        //console.log(money_bank_input_method.InputCount);
        let MoveY = ev.changedTouches[0].clientY;
        
        if(money_bank_input_method.StartY > MoveY)
            var DY = money_bank_input_method.StartY - MoveY;
        else if(money_bank_input_method.StartY < MoveY)
            var DY = MoveY - money_bank_input_method.StartY;

        let Y = Math.floor((DY%100)/10);
        money_bank_input_method.on_Turn(Y, money_bank_input_method.InputCount);
        money_bank_input_method.updateInputerDisplay();
    }
    EndTouch(ev) {
        if(money_bank_input_method.InputCount<money_bank_input_method.WordCount)
            money_bank_input_method.InputCount++;
        else
            money_bank_input_method.InputCount = 0;
        money_bank_input_method.updateInputerDisplay();
    }
    updateInputerDisplay(){
        let InputerDisplay = new Array();
        for(let i=0; i<this.WordCount; i++){
            InputerDisplay[i] = "<div class='InputerDisplay' style='width:"+(35*this.Scale)+
                "px;height:"+(40*this.Scale)+"px;'>"+this.Value[i]+"</div>";
        }
        this.InputerDisplay = InputerDisplay.join("");
        document.getElementById("InputerDisplayPanel").innerHTML = this.InputerDisplay;
    }
    on_Turn(inValue, Count){
        let rotate = (10-inValue) * 36;
        document.getElementById("PassWordTurntable").style.transform = "rotate("+rotate+"deg)";
        this.Value[Count] = inValue.toString();
    }
    resetValue(){
        for(let i=0; i<this.WordCount; i++) this.Value[i] = "0";
    }
    setWordCount(WordCount=4){
        this.WordCount = WordCount;
        for(let i=0; i<this.WordCount; i++) this.Value[i] = "0";
    }
    getValue(){
        return this.Value.join("");
    }
}
// 定義一個保險箱輸入法
customElements.define("money-bank-input-method", MyCustomElement);
// 新增保險箱輸入法控制電路
const money_bank_input_method = new inputer();
// 設定保險箱最大字數
money_bank_input_method.setWordCount(10);
// 刷新保險箱界面
money_bank_input_method.updateInputerDisplay();

// 使保險箱第0碼撥至7
//money_bank_input_method.on_Turn(7, 0);
// 獲取保險箱輸入之數值
//console.log(money_bank_input_method.getValue());

//money_bank_input_method.Debug();
