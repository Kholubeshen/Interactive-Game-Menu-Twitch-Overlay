class LoadScene extends PIXI.Container{
    constructor(socket){
        super();
        
        this.socket = socket;

        this.listFontSize = 30;

        //LoadTitle
        let loadTitle = new PIXI.Text("LOAD GAME", { 
            fontFamily: 'Press Start 2P',
            fontSize: 80,
            fill: 0xFFFFFF,
            align: 'center',
            dropShadow: 'true',
            dropShadowColor: '0x800080',
            dropShadowDistance: 7,
            fill: ['#FF0000', '#00FF00', '#0000FF'],
            fillGradientStops: [0.1, 0.7, 0.8],
            fillGradientType: 0
        });

        loadTitle.x = (canvasWidth - loadTitle.width) / 2;
        loadTitle.y = 125;
        super.addChild(loadTitle);

        let year = new Year();
        super.addChild(year);

        let navigation = new Navigation();
        super.addChild(navigation);

        let voteCommand = new PIXI.Text(
            "!Vote #", 
            {
                fontFamily: 'Press Start 2P',
                fontSize:30,
                fill:whiteColor,
                align:'center'
            }
        )
        voteCommand.x = 10;
        voteCommand.y = 520;
        this.addChild(voteCommand);
        

        let names = [
            "1. NOITA", 
            "2. HOLLOW KNIGHT",
            "3. FURI",
            "4. ORI AND THE WILL OF THE WISPS",
            "5. CAVE STORY",
            "BACK"];
        this.options = new Options(names, this.listFontSize, whiteColor);
        this.options.y = 250;
        super.addChild(this.options);

        this.voteNames = this.createVotesArr(names.length - 1);
        this.votes = new Votes(this.voteNames, this.listFontSize, whiteColor);
        this.votes.y = 250;
        this.votes.x = 350;
        super.addChild(this.votes)

        this.votesTracker = [];

        this.socket.on("vote", (data) => {
            console.log("data.voteno",data.voteNo);

            console.log(typeof(data.voteNo));

            if(data.voteNo > this.voteNames.length || data.voteNo <= 0 || isNaN(parseInt(data.voteNo))){
                return;
            }

            let voteNum = parseInt(data.voteNo);
            for(let i = 0; i < this.votesTracker.length; i++){
                if(this.votesTracker[i].username == data.username){
                    //remove vote and votes tracker item.
                    console.log("votestrackerNo", this.votesTracker[i].voteNo);
                    this.removeVote(this.votesTracker[i].voteNo);
                    this.votesTracker.splice(i, 1);
                    console.log("votestrackerLength", this.votesTracker.length);
                }
            }

            this.votesTracker.push({
                username:data.username,
                voteNo:data.voteNo
            });
            this.increaseVote(data.voteNo);
        })
    }



    onVoteHandler(data){
        console.log("Test");
        for(let i = 0; 1 < this.votesTracker.length; i++){
            if(this.votesTracker[i].username = data.username){
                return;
            }
        }

        this.votesTracker.push(data.username);
        this.increaseVote(data.voteNo);
    }

    removeVote(voteNo){
        this.votes.removeVote(voteNo -1);
    }

    increaseVote(voteNo){
        this.votes.increaseVote(voteNo - 1);
    }

    createVotesArr(numOfVotes){
        let votes = [];
        for(let i = 0; i < numOfVotes; i++){
            votes.push("0");
        }
        return votes;
    }

    moveCursor(direction){
        this.options.moveCursor(direction)
    }

    onVoteHandler(data){
        data.username
        data.voteNo
    }
}