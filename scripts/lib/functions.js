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

function fillArea(block) {
	blanks = blocks.length * .1
	ones = blocks.length * .6
	twos = blocks.length * .2
	threes = blocks.length * .1

	for(var i=0; i < blocks.length; i++) {
        for(var j = 0; j < blocks[i].length; j++) {
            drawBlocks(j,i,blocks[i][j]);
        }
    }
}