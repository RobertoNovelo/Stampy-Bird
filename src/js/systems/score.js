var ScoreSystem = function()
{
    var score = 0;
    var highScore = 0;
    var leaderboard = [];
    var enabled = true;

    var updateHsAndLB = function()
    {
        var hs = localStorage.getItem("highscore");
        if(hs !== null && Number.isInteger(parseInt(hs)))
        {
            this.highScore = hs;
        }

        var lb = localStorage.getItem("leaderboard");
        if(lb !== null)
        {
            try
            {
                this.leaderboard = JSON.parse(lb);
            }
            catch(e)
            {
                //How dare you mess with my code?!
                console.log(":B");
            }
        }
    };

    updateHsAndLB();

    this.plusPlus = function()
    {
        if(enabled)
        {
            score++;
        }
    };

    this.enable = function(isEnabled)
    {
        enabled = isEnabled;
    };

    this.getScore = function()
    {
        return score;
    };

    this.reset = function()
    {
        enabled = true;
        score = 0;
    };

    this.getLeaderBoard = function()
    {
        updateHsAndLB();

        return leaderboard;
    };

    this.saveScoreAndResetAndIsHighScore = function(playerName,stampIndex)
    {
        updateHsAndLB();

        var isHighScore = highScore<score;
        if(isHighScore)
        {
            localStorage.setItem("highscore",score);
        }

        leaderboard.push({
            playerName:playerName,
            score:score,
            stampIndex:stampIndex
        });

        leaderboard.sortOn("score");

        if(10<leaderboard.length)
        {
            leaderboard.length = 10;
        }

        localStorage.setItem("leaderboard",leaderboard);

        this.reset();

        return isHighScore;
    };
};

//:B
Array.prototype.sortOn = function(key){
    this.sort(function(a, b){
        if(a[key] < b[key]){
            return -1;
        }else if(a[key] > b[key]){
            return 1;
        }
        return 0;
    });
};

exports.ScoreSystem = ScoreSystem;