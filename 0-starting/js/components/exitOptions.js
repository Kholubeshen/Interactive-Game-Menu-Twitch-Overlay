class ExitOptions extends Options{
    constructor(names, fontSize, fill){
        super(names, fontSize, fill);
    }

    switchNoYes(){
        console.log(this);
        let temp = this.optionsArr[0];
        this.optionsArr[0] = this.optionsArr[1];
        this.optionsArr[1] = temp;
        
        let temp2 = this.optionsArr[0].y;
        this.optionsArr[0].y = this.optionsArr[1].y;
        this.optionsArr[1].y = temp2;
    }

    moveCursor(direction) {
        this.switchNoYes();
        super.moveCursor(direction);
    }  
}