//Too lazy to do vanilla js :B
window.$ = require('jquery');
var flappyBird = require('./flappy_bird');

$(function()
{
	var app = new flappyBird.FlappyBird();

	$("#startGameBtn").on("click", function()
	{
		$(".uiscreen").hide();
		app.clearGame();
		app.init();
		app.run();
	});

	$("#selectStampBtn").on("click", function()
	{

	});

	$("#leaderBoardBtn").on("click", function()
	{

	});

	$("#home-screen").show();
});