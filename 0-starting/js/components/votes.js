class Votes extends Options{
    constructor(names, fontSize, fill){
        super(names, fontSize, fill);
        this.optionsArr = super.getOptionsArr();

    }

    increaseVote(voteIndex){
        console.log("increase called");
        let oldValue = parseInt(this.optionsArr[voteIndex].text, 10);
        let newValue = oldValue + 1;
        this.optionsArr[voteIndex].text = newValue.toString();
    }

    removeVote(voteIndex){
        console.log("decrease called");
        let oldValue = parseInt(this.optionsArr[voteIndex].text, 10);
        let newValue = oldValue - 1;
        this.optionsArr[voteIndex].text = newValue.toString();
    }

    createCursor(){}
    moveCursor(){}
    setCursorPosition(){}
    blinkCursor(){}
}