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

	});

	$("#savescore-no").on("click", function()
	{
		$("#score-container").fadeOut();
		$("#promptsavescore-container").fadeOut();
		$("#home-screen").fadeIn();
	});


	$("#home-screen").show();
});