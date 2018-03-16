
$(document).ready(function(){
	var tilePairs = createTiles();
	var totalPairs = 8;
	var remainingPairs;
	var attempts;
	var numFlipped;
	var tempTile;
	var tempTile2;
	var timer;

	populateBoard(tilePairs);
	remainingPairs = totalPairs;
	attempts = 0;
	numFlipped = 0;
	timer = startTimer(timer);

	$('#attempts').text("Attempts: " + attempts);
	$('#remaining').text("Remaining: " + remainingPairs);

	var active = false;
	$(document).on("click", "#game-board img", function(){
		if(!active){
			if(!$.data(this, 'tile').flipped){
				numFlipped++;
				flipTile(this);
				if(numFlipped == 1){
					tempTile = this;
				}
				if(numFlipped == 2){
					active = true;
					tempTile2 = this;
					setTimeout(function(){
						if(checkMatch(tempTile, tempTile2)){
							remainingPairs--;
						}else{
							flipTile(tempTile);
							flipTile(tempTile2);
						}
						attempts++;
						numFlipped = 0;

						$('#attempts').text("Attempts: " + attempts);
						$('#remaining').text("Remaining: " + remainingPairs);

						if(remainingPairs == 0){
							$(".overlay").fadeIn(500);
							window.clearInterval(timer);
						}
						tempTile = null;
						tempTile2 = null;
						active = false;
					}, 1000);
				}
			}
		}
	});//on click of images

	$('.newGameButton').click(function(){
		$(".overlay").fadeOut(100);
		window.clearInterval(timer);

		var img = $("#game-board img");

		for(var idx = 0; idx < img.length; idx++){
			$.data(img.get(idx), 'tile').flipped = false;
		}

		populateBoard(tilePairs);
		remainingPairs = totalPairs;
		attempts = 0;
		numFlipped = 0;
		timer = startTimer(timer);

		$('#attempts').text("Attempts: " + attempts);
		$('#remaining').text("Remaining: " + remainingPairs);
	});

	$('#instructButt').click(function(){
		alert("Click any card to overturn it, then overturn another card. If both are the same they are removed. Only two cards can be overturned at a time.");
	});

	
});//jQuery ready

function checkMatch(tile1, tile2){
	return tile1.src == tile2.src;
}

function createTiles(){
	var tiles = [];
	var idx;
	for(idx = 1; idx <= 32; idx++){
		tiles.push({
			tileNum: idx,
			src: 'img/tile' + idx + '.jpg',
			flipped: false
		});
	}

	var shuffledTiles = _.shuffle(tiles);

	var selectedTiles = shuffledTiles.slice(0,8);

	var tilePairs = [];
	_.forEach(selectedTiles, function(tile){
		tilePairs.push(_.clone(tile));
		tilePairs.push(_.clone(tile));
	});

	return tilePairs;
}

function populateBoard(tilePairs){
	tilePairs = _.shuffle(tilePairs);
	var gameBoard = $('#game-board');
	gameBoard.empty(); //clear board
	var row = $(document.createElement('div'));
	var img;
	_.forEach(tilePairs, function(tile, elemIndex){
		if(elemIndex > 0 && 0 == elemIndex % 4){
			gameBoard.append(row);
			row = $(document.createElement('div'));
		}

		img = $(document.createElement('img'));
		img.attr({
			src: 'img/tile-back.png',
			alt:'image of tile' + tile.tileNum,
		});
		img.data('tile',tile);
		row.append(img);
	});
	gameBoard.append(row);
}

function startTimer(timer){
	var startTime = _.now();
	timer = window.setInterval(function(){
		var elapsedSeconds = Math.floor((_.now() - startTime) / 1000);
		$('#elapsed-seconds').text("Timer: " + elapsedSeconds + " seconds");
	}, 1000);
	return timer;
}

function flipTile(tempTile){
	var img = $(tempTile);
	var tile = img.data('tile');
	img.fadeOut(100, function(){
		if(tile.flipped){
			img.attr('src', 'img/tile-back.png');
		}else{
			img.attr('src', tile.src);
		}
		tile.flipped = !tile.flipped;
		img.fadeIn(100);
	}); //fadeout
}
