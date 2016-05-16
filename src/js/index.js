//Too lazy to do vanilla js, please do not judge me :B
window.$ = require('jquery');
var flappyBird = require('./flappy_bird');

$(function()
{
	var app = new flappyBird.FlappyBird();

	$("#startGameBtn").on("click", function()
	{
		app.clearGame();
		$("#score").text(0);
		setTimeout(function(){
			app.init();
			app.run()
		},4500);
		$(".uiscreen").hide();
		$("#hint-screen").fadeIn();
		$("#readysetgo-screen").show();
		$("#readysetgo-screen h1").hide();
		$("#rsg3").fadeIn(800,function(){
			$("#rsg3").fadeOut(800,function(){
				$("#rsg2").fadeIn(800,function(){
					$("#rsg2").fadeOut(800,function(){
						$("#rsg1").fadeIn(800,function(){
							$("#rsg1").fadeOut("fast",function(){
								$("#readysetgo-screen").hide();
								$("#hint-screen").fadeOut();
								$("#score-container").fadeIn();
							});
						});
					});
				});
			});
		});
	});

	$("#selectStampBtn").on("click", function()
	{

	});

	$("#leaderBoardBtn").on("click", function()
	{
		updateScoresScreen();
		$("#home-screen").fadeOut();
		$("#playerscores-screen").fadeIn();
	});

	$("#goBackScoresBtn").on("click", function()
	{
		$("#playerscores-screen").fadeOut();
		$("#home-screen").fadeIn();
	});

	$("#savescore-yes").on("click", function()
	{
		if("" == $("#playernameinput").val().replace(/ /g,""))
		{
			$("#promptsavescore-container>h1").text("Please enter your name!");
			$("#promptsavescore-container>h1").css("color","#D6212A");
			setTimeout(function()
			{
				if("Please enter your name!" == $("#promptsavescore-container>h1").text())
				{
					$("#promptsavescore-container>h1").css("color","#125C71");
					$("#promptsavescore-container>h1").text("Enter your name to save your score!");
				}
			},2000);
		}
		else
		{
			if(app.scoreSystem.saveScoreAndResetAndIsHighScore($("#playernameinput").val(),0))
			{
				updateScoresScreen();
				// $("#playerscores-screen .container .ranking:first-child").addClass("highscore");
				// TODO: Something way beter than that ^^^^^ :B
			}
			else
			{
				updateScoresScreen();
			}
			$("#score-container").fadeOut();
			$("#promptsavescore-container").fadeOut();
			$("#playerscores-screen").fadeIn();
		}
	});

	$("#savescore-no").on("click", function()
	{
		$("#score-container").fadeOut();
		$("#promptsavescore-container").fadeOut();
		$("#home-screen").fadeIn();
	});


	$("#home-screen").show();

	var updateScoresScreen = function()
	{
		$("#playerscores-screen .container").empty();
		var rankingsString = "";

		app.scoreSystem.getLeaderBoard().forEach(function(ranking,index)
		{
			rankingsString += '' +
			'<div class="ranking">'+
				'<h1>'+(index+1)+'</h1>'+
				'<div class="stamp">'+
					'<img src="https://about.usps.com/postal-bulletin/2007/html/pb22203/images/info2.5.4.1.jpg" alt="">'+
				'</div>'+
				'<h1>'+ranking.playerName+'</h1>'+
				'<h1 class="score">'+ ranking.score +' Points</h1>'+
			'</div>';
		})

		$("#playerscores-screen .container").append(rankingsString);
	};
});