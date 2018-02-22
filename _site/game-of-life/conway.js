$(document).ready(function () {
	var currentGame = new GOL('#grid', 30, 50, 1, 2, 3, 3, 3);
    $('#gen_button').click(function(e) {
        e.preventDefault();
        
        var width = parseInt($("#width").val());
        var height = parseInt($("#height").val());
        if(isNaN(width) || width < 20 || width > 200
            || isNaN(height) || height < 20 || height > 200) {
            alert("Please enter a width and height between 20 and 200.");
            return;
        }
        
        var radius = parseInt($("#radius").val());
        var numNeighbors = (4 * radius * radius) + (4 * radius);
        var lThresh = parseInt($("#lone_thresh").val());
        var oThresh = parseInt($("#over_thresh").val());
        var gMin = parseInt($("#gmin").val());
        var gMax = parseInt($("#gmax").val());
        
        if(isNaN(radius) || radius < 0 || radius > 10) {
            alert("Please enter a radius between 1 and 10.");
            return;
        }
        if(isNaN(lThresh) || lThresh <= 0 || lThresh > oThresh) {
            alert("Please pick a loneliness threshold (LThresh) between 0 and " + oThresh + 
                  " (OThresh: overpopulation threshold).");
            return;
        }
        if(isNaN(oThresh) || oThresh < lThresh || oThresh >= numNeighbors) {
            alert("Please pick a overpopulation threshold (OThresh) between " + lThresh + 
                  " (LThresh: loneliness threshold) and " + (numNeighbors - 1) + 
                  " (one less than the number of neighbors per cell based on your chosen radius).");
            return;
        }
        if(isNaN(gMin) || gMin <= 0 || gMin > gMax) {
            alert("Please pick a minimum generation threshold (GenMin) between 0 and " + gMax + 
                  " (GenMax: maximum generation threshold).");
            return;
        }
        if(isNaN(gMax) || gMax < gMin || gMax >= numNeighbors) {
            alert("Please pick a maximum generation threshold (GenMax) between " + gMin + 
                  " (GenMin: minimum generation threshold) and " + (numNeighbors - 1) + 
                  " (one less than the number of neighbors per cell based on your chosen radius).");
            return;
        }
        
        
        if(currentGame != null) {
            currentGame.isRunning = false;
            currentGame.kill();
            //console.log("current game killed");
        }
        
        currentGame = new GOL('#grid', width, height, radius, lThresh, oThresh, gMin, gMax);
        currentGame.generationCount.innerHTML = '0';
    });
    
    $('#randGen_button').click(function(e) {
        e.preventDefault();
        
        var width = parseInt($("#width").val());
        var height = parseInt($("#height").val());
        if(isNaN(width) || width < 20 || width > 200
            || isNaN(height) || height < 20 || height > 200) {
            alert("Please enter a width and height between 20 and 200.");
            return;
        }
        
        var radius = parseInt($("#radius").val());
        var numNeighbors = (4 * radius * radius) + (4 * radius);
        var lThresh = parseInt($("#lone_thresh").val());
        var oThresh = parseInt($("#over_thresh").val());
        var gMin = parseInt($("#gmin").val());
        var gMax = parseInt($("#gmax").val());
        
        if(isNaN(radius) || radius < 0 || radius > 10) {
            alert("Please enter a radius between 1 and 10.");
            return;
        }
        if(isNaN(lThresh) || lThresh <= 0 || lThresh > oThresh) {
            alert("Please pick a loneliness threshold (LThresh) between 0 and " + oThresh + 
                  " (OThresh: overpopulation threshold).");
            return;
        }
        if(isNaN(oThresh) || oThresh < lThresh || oThresh >= numNeighbors) {
            alert("Please pick a overpopulation threshold (OThresh) between " + lThresh + 
                  " (LThresh: loneliness threshold) and " + (numNeighbors - 1) + 
                  " (one less than the number of neighbors per cell based on your chosen radius).");
            return;
        }
        if(isNaN(gMin) || gMin <= 0 || gMin > gMax) {
            alert("Please pick a minimum generation threshold (GenMin) between 0 and " + gMax + 
                  " (GenMax: maximum generation threshold).");
            return;
        }
        if(isNaN(gMax) || gMax < gMin || gMax >= numNeighbors) {
            alert("Please pick a maximum generation threshold (GenMax) between " + gMin + 
                  " (GenMin: minimum generation threshold) and " + (numNeighbors - 1) + 
                  " (one less than the number of neighbors per cell based on your chosen radius).");
            return;
        }
        
        if(currentGame != null) {
            currentGame.isRunning = false;
            currentGame.kill();
            //console.log("current game killed");
        }
        
        currentGame = new GOL('#grid', width, height, radius, lThresh, oThresh, gMin, gMax);
        
        // Generate random coordinate array
        var numAlive = Math.floor(Math.random() * width * height);
        var randArr = [];
        for(var i = 0; i < numAlive; i++) {
            randArr.push({x: Math.floor(Math.random() * height),
                          y: Math.floor(Math.random() * width)});
        }
        
        // Populate with random array
        for(var i in randArr) {
            var x = randArr[i].x; var y = randArr[i].y;
            currentGame.generateCell(x, y);
            currentGame.bitMap[x][y] = true;
            //console.log("generated cell " + x + ", " + y);
        }
        
        currentGame.generationCount.innerHTML = '0';
    });
    
    $('#toggleGridLines_button').click(function(e) {
        e.preventDefault();
        $("td").toggleClass('noBorder');
    });

    $('#play_button').click(function(e) {
        e.preventDefault();
        
        if($('#neighbor_behavior option:selected').val() != 'default') {
            currentGame.isRunning = !currentGame.isRunning;
            if(currentGame.isRunning) {
                currentGame.step();
            }
        } else {
            alert("Please select edge neighbor behavior");
        }
    });
    
    $('#step_button').click(function(e) {
        e.preventDefault();
        if($('#neighbor_behavior option:selected').val() != 'default') {
            if(!currentGame.isRunning) {
                currentGame.step();
            }
        } else {
            alert("Please select edge neighbor behavior");
        }
    });
    
    $('#reset_button').click(function(e) {
        e.preventDefault();
        
        var oldWidth = currentGame.width;
        var oldHeight = currentGame.height;
        var oldRadius = currentGame.radius;
        var oldLThresh = currentGame.lThresh;
        var oldOThresh = currentGame. oThresh;
        var oldGMin = currentGame.gmin;
        var oldGMax = currentGame.gmax;
        currentGame.isRunning = false;
        currentGame.kill();
        //console.log("current game killed");
        
        currentGame = 
            new GOL('#grid', oldWidth, oldHeight, oldRadius, oldLThresh, oldOThresh, oldGMin, oldGMax);
        currentGame.generationCount.innerHTML = '0';
    });
});

var GOL = function(grid_div, width, height, r, l, o, gmin, gmax) {
	this.grid_div = document.getElementById('grid');
	this.width = width;
	this.height = height;
    this.radius = r;
    this.lThresh = l;
    this.oThresh = o;
    this.gmin = gmin;
    this.gmax = gmax;
    this.killed = false;
    this.table = document.createElement('table');
    this.generationCount = document.getElementById('generation');
    this.generation = 0;
	this.cells = [];
    this.bitMap = [];
    this.nextMap = [];
    this.isRunning = false;
    this.mouseDown = false;
    this.colors = {
        alive: '#6093ca',
        dead: '#FFFFFF',
        visited: '#d4e2f1'
    }
	
    var self = this;
    
    // Setup table view
    for(var i = 0; i < this.height; i++) {
        var row = document.createElement('tr');
        this.cells[i] = [];
        this.bitMap[i] = [];
        this.nextMap[i] = [];
        for(var j = 0; j < this.width; j++) {
            var cell = document.createElement('td');
            cell.style.backgroundColor = this.colors.dead;
            row.appendChild(cell);
            this.cells[i][j] = cell;
            this.bitMap[i][j] = false;
            this.nextMap[i][j] = false;
           
            // handle cell click events to enable dragging to set states
            cell.onmousedown = (function(x, y) {
                // handle closure
                return function(e) {
                    e.preventDefault();
                    self.mouseDown = true;
                    if(e.button == 0 && !e.shiftKey && !e.altKey) {
                        self.bitMap[x][y] = !self.bitMap[x][y];
                        self.bitMap[x][y] ? 
                            self.generateCell(x, y) :
                            self.killCell(x, y);
                    } else if(e.button == 0 && e.shiftKey && !e.altKey) {
                        self.bitMap[x][y] = true;
                        self.generateCell(x, y);
                    } else if(e.button == 0 && !e.shiftKey && e.altKey) {
                        self.bitMap[x][y] = false;
                        self.killCell(x, y);
                    }
                }
            })(i, j);
            
            cell.onmouseup = (function() {
                return function(e) {
                    e.preventDefault();
                    self.mouseDown = false;
                }
            })();
            
            cell.onmouseover = (function(x, y) {
                    return function(e) {
                        if(self.mouseDown) {
                            e.preventDefault();
                            if(e.button == 0 && !e.shiftKey && !e.altKey) {
                                self.bitMap[x][y] = !self.bitMap[x][y];
                                self.bitMap[x][y] ? 
                                    self.generateCell(x, y) :
                                    self.killCell(x, y);
                            } else if(e.button == 0 && e.shiftKey && !e.altKey) {
                                self.bitMap[x][y] = true;
                                self.generateCell(x, y);
                            } else if(e.button == 0 && !e.shiftKey && e.altKey) {
                                self.bitMap[x][y] = false;
                                self.killCell(x, y);
                            }
                        }
                    }
            })(i, j);
        
        }
        this.table.appendChild(row);
    }
    this.grid_div.appendChild(this.table);
    //console.log("Initalized new game");
};

GOL.prototype.kill = function() {
    if(this.killed) {
        return;
    }
    
    $(this.grid_div).empty();
    this.killed = true;
};

// generate and update next generation
GOL.prototype.step = function() {
    this.nextMap = this.arrayCopy(this.bitMap);
    for(var x = 0; x < this.height; x++) {
        for(var y = 0; y < this.width; y++) {
            this.getNextGen(x, y);
        }
    }
    
    // Check for equilibrium to prevent continuous generation of still lives
    // Don't stop for alternating generations, which could classify as equilibrium
    if(this.arrayCompare(this.nextMap, this.bitMap)) {
        this.isRunning = false;
        this.generation--; // counter the extra step
    }
    
    this.bitMap = this.nextMap;
    this.generationCount.innerHTML = ++this.generation;
    //console.log("stepped");
    
    var self = this;
    if(this.isRunning) {
        setTimeout(function() {self.step();}, 1000 - $('#speed').val());
    } else {
        if(this.killed) {
            this.generationCount.innerHTML = '0';
        }
    }
}

GOL.prototype.killCell = function(x, y) {
    this.cells[x][y].style.backgroundColor = this.colors.visited;
};

GOL.prototype.generateCell = function(x, y) {
    this.cells[x][y].style.backgroundColor = this.colors.alive;
};

GOL.prototype.getNextGen = function(x, y) {
    
    var neighborBehavior = $('#neighbor_behavior option:selected').val();
    var neighbors;
    if(neighborBehavior == "alwaysAlive") {
        neighbors = this.getAliveNeighbors(x, y);
    } else if(neighborBehavior == "alwaysDead") {
        neighbors = this.getDeadNeighbors(x, y);
    } else if(neighborBehavior == "wrap") {
        neighbors = this.getTorNeighbors(x, y);
    }
    
    var neighborsAlive = 0;
    for(var i in neighbors) {
        if(neighbors[i]) neighborsAlive++;
    }
    
    // Apply rules to next generation cells
    if(this.bitMap[x][y]) {
        if(neighborsAlive < this.lThresh || neighborsAlive > this.oThresh) {
            this.nextMap[x][y] = false; 
        }
    } else {
        if((neighborsAlive >= this.gmin) && (neighborsAlive <= this.gmax)) {
            this.nextMap[x][y] = true;
        }
    }
    
    // Make updates to view
    if(this.nextMap[x][y] != this.bitMap[x][y]) { // if changed state
        if(this.nextMap[x][y]) {
            this.generateCell(x, y);
        } else {
            this.killCell(x, y);
        }
    } else if(this.nextMap[x][y]) {
        this.generateCell(x, y);
    }
};

// Off-grid neighbors wrap to corresponding opposite side
GOL.prototype.getTorNeighbors = function(x, y) {
    var neighborArray = [];
    var r = this.radius;
    
    for(var i = 1; i <= r; i++) {
        var rowAbove = (x - r + 1 > 0) ? x - r : this.height - r;
        var rowBelow = (x + r - 1 < this.height - 1) ? x + r : r - 1;
        var colLeft = (y - r + 1 > 0) ? y - r : this.width - r;
        var colRight = (y + r - 1 < this.width - 1) ? y + r : r - 1;
        for(var j = 0; j < i; j++) {
            var aboveThisRow = (x + j > this.height - 1) ? (x + j) - this.height : x + j;
            var belowThisRow = (x < j) ? this.height + (x - j) : x - j;
            var leftThisCol = (y < j) ? this.width + (y - j) : y - j;
            var rightThisCol = (y + j > this.width - 1) ? (y + j) - this.height : y + j;
            neighborArray.push(this.bitMap[rowAbove][colLeft + j]);
            neighborArray.push(this.bitMap[rowAbove][rightThisCol]); // [rowAbove][y + j]
            neighborArray.push(this.bitMap[rowAbove + j][colRight]);
            neighborArray.push(this.bitMap[belowThisRow][colLeft]); // [x - j][colLeft]
            neighborArray.push(this.bitMap[aboveThisRow][colRight]); // [x + j][colRight]
            neighborArray.push(this.bitMap[rowBelow - j][colLeft]);
            neighborArray.push(this.bitMap[rowBelow][leftThisCol]); // [rowBelow][y - j]
            neighborArray.push(this.bitMap[rowBelow][colRight - j]);                                     
        }
    }
    
    return neighborArray;
};

// Off-grid neighbors are considered dead
GOL.prototype.getDeadNeighbors = function(x, y){
    var neighborArray = [];
    var r = this.radius;
    
    for(var i = 1; i <= r; i++) {
        var rowAbove = x - r;
        var rowBelow = x + r;
        var colLeft = y - r;
        var colRight = y + r;
        for(var j = 0; j < i; j++) {
            var aboveThisRow = (x + j > this.height - 1) ? (x + j) - this.height : x + j;
            var belowThisRow = (x < j) ? this.height + (x - j) : x - j;
            var leftThisCol = (y < j) ? this.width + (y - j) : y - j;
            var rightThisCol = (y + j > this.width - 1) ? (y + j) - this.height : y + j;
            neighborArray.push((rowAbove < 0 || colLeft < 0) ? false : this.bitMap[rowAbove][colLeft + j]);
            neighborArray.push((rowAbove < 0) ? false : this.bitMap[rowAbove][rightThisCol]);
            neighborArray.push(
                (rowAbove < 0 || colRight > this.width - 1) ? false : this.bitMap[rowAbove + j][colRight]);
            neighborArray.push((colLeft < 0) ? false : this.bitMap[belowThisRow][colLeft]);
            neighborArray.push((colRight > this.width - 1) ? false : this.bitMap[aboveThisRow][colRight]);
            neighborArray.push(
                (rowBelow > this.height - 1 || colLeft < 0) ? false : this.bitMap[rowBelow - j][colLeft]);
            neighborArray.push((rowBelow > this.height - 1) ? false : this.bitMap[rowBelow][leftThisCol]);
            neighborArray.push(
                (rowBelow > this.height - 1 || colRight > this.width - 1) 
                        ? false : this.bitMap[rowBelow][colRight - j]);
        }
    }
    
    return neighborArray;
};

// Off-grid neighbors are considered alive
GOL.prototype.getAliveNeighbors = function(x, y){
    var neighborArray = [];
    var r = this.radius;
    
    for(var i = 1; i <= r; i++) {
        var rowAbove = x - r;
        var rowBelow = x + r;
        var colLeft = y - r;
        var colRight = y + r;
        for(var j = 0; j < i; j++) {
            var aboveThisRow = (x + j > this.height - 1) ? (x + j) - this.height : x + j;
            var belowThisRow = (x < j) ? this.height + (x - j) : x - j;
            var leftThisCol = (y < j) ? this.width + (y - j) : y - j;
            var rightThisCol = (y + j > this.width - 1) ? (y + j) - this.height : y + j;
            neighborArray.push((rowAbove < 0 || colLeft < 0) ? true : this.bitMap[rowAbove][colLeft + j]);
            neighborArray.push((rowAbove < 0) ? true : this.bitMap[rowAbove][rightThisCol]);
            neighborArray.push(
                (rowAbove < 0 || colRight > this.width - 1) ? true : this.bitMap[rowAbove + j][colRight]);
            neighborArray.push((colLeft < 0) ? true : this.bitMap[belowThisRow][colLeft]);
            neighborArray.push((colRight > this.width - 1) ? true : this.bitMap[aboveThisRow][colRight]);
            neighborArray.push(
                (rowBelow > this.height - 1 || colLeft < 0) ? true : this.bitMap[rowBelow - j][colLeft]);
            neighborArray.push((rowBelow > this.height - 1) ? true : this.bitMap[rowBelow][leftThisCol]);
            neighborArray.push(
                (rowBelow > this.height - 1 || colRight > this.width - 1) 
                        ? true : this.bitMap[rowBelow][colRight - j]);
        }
    }
    
    return neighborArray;
};

// Return deep copy of array source array
GOL.prototype.arrayCopy = function(arr) {
    var x = arr.length, y = arr[0].length;
    var copy = [];
    
    for (var i = 0; i < x; i++) {
        copy[i] = [];
        for (var j = 0; j < y; j++) {
            copy[i][j] = arr[i][j];
        }
    }

    return copy;
};

// Returns true if arrays are identical and false if different
GOL.prototype.arrayCompare = function (a, b) {
    if (!b)
        return false;

    // Compare lengths to cut complexity to O(1)
    if (a.length != b.length)
        return false;

    for (var i = 0; i < a.length; i++) {
        if (a[i] instanceof Array && b[i] instanceof Array) { 
            if (!this.arrayCompare(a[i], (b[i])))
                return false;       
        }           
        else if (a[i] != b[i]) { 
            return false;   
        }           
    }       
    return true;
}; 