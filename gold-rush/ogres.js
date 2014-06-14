// This code runs once per frame. Choose where to move to grab gold!
// First player to 150 gold wins.

var bestItem;
var bestScore;
var bestGem;
var bestGemScore;

var items = this.getItems();

// Determine the direction of the items as a whole.
var vectorSum = new Vector(0, 0);
for (var i = 0; i < items.length; i++) {
    var element = items[i];
    var vector = new Vector(element.pos.x - this.pos.x, 
        element.pos.y - this.pos.y);
    vector = Vector.normalize(vector);
    var dist = this.distance(element);    
    var myScore = element.bountyGold / (dist * dist);
    vector = Vector.multiply(vector, myScore);
    vectorSum = Vector.add(vectorSum, vector);
}

vectorSum = Vector.normalize(vectorSum);

for (var i = 0; i < items.length; i++) {
    var element = items[i];
    var vector = new Vector(element.pos.x - this.pos.x, 
        element.pos.y - this.pos.y);
    var dist = this.distance(element);    
    var myScore = element.bountyGold / (dist * dist);
    vector = Vector.multiply(vector, myScore);
    myScore = vectorSum.dot(vector);
    
    // If our opponent is closer, decrease the score
    if (this.distance(this.getNearestEnemy()) < dist) {
        myScore = myScore / (dist * dist);
    }
    if (!bestItem || myScore > bestScore) {
        bestItem = element;
        bestScore = myScore;
    }
    if (element.bountyGold == 5 && 
        (!bestGem || myScore > bestGemScore)) {
        bestGem = element;
        bestGemScore = myScore;
    }
}



if (this.getCooldown("jump") <= 0 && bestGem &&
    bestItem.bountyGold < 3 && this.distance(bestItem) > 5) {
    this.say("Jump!");
    this.jumpTo(bestGem.pos);
} else if (bestItem) {
    //this.say("Getting " + bestItem.id);
    this.move(bestItem.pos);
} else {
    this.say("Help!  I'm lost");
}


// You can surely pick a better coin using the methods below.
// Click on a coin to see its API.
