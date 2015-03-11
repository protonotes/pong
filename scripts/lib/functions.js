var blocks= [];
blocks.length = 40;

var block = {
	cols: 10,
	rows: 4,
	width: canvas.width/cols,
	height: 25
}

var blockType = {
	blank: 0,
	one: 1,
	two: 2,
	three: 3
}

function blocksArea(blocks) {
	var blanks = .10;
	var one = .6;
	for(var i=0; i < blocks.length; i++) {
        for(var j = 0; j < blocks[i].length; j++) {
            drawBlocks(j,i,blocks[i][j]);
        }
    }
}