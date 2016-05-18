//Too lazy to do vanilla js, please do not judge me :B
window.$ = require('jquery');
var flappyBird = require('./flappy_bird');

$(function()
{
	var app = new flappyBird.FlappyBird();
	var stamps = [];

	function loadStampImages()
	{
		$.getJSON("stamps.json", function(json)
		{
			stamps = json.stamps;

			if(null === localStorage.getItem("currentStampImageIndex"))
			{
				app.updateBirdImage(stamps[0].image);
				localStorage.setItem("currentStampImageIndex",0);
			}
			else
			{
				app.updateBirdImage(stamps[parseInt(localStorage.getItem("currentStampImageIndex"))].image);
			}

			updateStampSelectScreen();
			updateCurrentStamp();
		});
	}

	loadStampImages();

	$("#startGameBtn").on("click", function()
	{
		app.clearGame();
		$("#score").text(0);
		setTimeout(function(){
			app.init();
			app.run();
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
		$("#home-screen").fadeOut();
		$("#selectstamp-screen").fadeIn();
	});

	$("#goBackStampsBtn").on("click", function()
	{
		$("#selectstamp-screen").fadeOut();
		$("#home-screen").fadeIn();
	});

	$("#selectstamp-screen .container").on("click",".stamp", function()
	{
		app.updateBirdImage(stamps[parseInt($(this).data("stampindex"))].image);
		localStorage.setItem("currentStampImageIndex",parseInt($(this).data("stampindex")));
		$("#selectstamp-screen").fadeOut();
		$("#home-screen").fadeIn();
		updateCurrentStamp();
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
		if("" === $("#playernameinput").val().replace(/ /g,""))
		{
			$("#promptsavescore-container>h1").text("Please enter your name!");
			$("#promptsavescore-container>h1").css("color","#E5AB05");
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
			if(app.entities[4].components.scoreSystem.saveScoreAndResetAndIsHighScore($("#playernameinput").val(),parseInt(localStorage.getItem("currentStampImageIndex"))))
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
					'<img src="'+ stamps[ranking.stampIndex].image +'" alt="">'+
				'</div>'+
				'<h1>'+ranking.playerName+'</h1>'+
				'<h1 class="score">'+ ranking.score +' Points</h1>'+
			'</div>';
		});

		$("#playerscores-screen .container").append(rankingsString);
	};

	var updateCurrentStamp = function()
	{
		$("#current-stamp img").attr("src",stamps[parseInt(localStorage.getItem("currentStampImageIndex"))].image);
	};

	var updateStampSelectScreen = function()
	{
		var stampStr = "";
		stamps.forEach(function(stamp,index)
		{
			stampStr += '' +
			'<div class="stamp" data-stampindex="'+index+'">' +
				'<h1>'+ stamp.stamp_name +'</h1>' +
				'<img src="'+ stamp.image +'" alt="">' +
			'</div>';
		});

		$("#selectstamp-screen .container").append(stampStr);
	};
});