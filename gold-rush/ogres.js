// This code runs once per frame. Choose where to move to grab gold!
// First player to 150 gold wins.

var score = [];
var itemVector = [];

var items = this.getItems();
for (var i = 0; i < items.length; i++) {
    var item = items[i];

    var distSq =  Math.pow(item.pos.x - this.pos.x, 2)
                + Math.pow(item.pos.y - this.pos.y, 2);
    score[i] = Math.pow(item.bountyGold, 1.5) / distSq;
    
    // If they're closer, decrease the score.
    if (Math.pow(item.distance(this.getNearestEnemy()), 2) <
        distSq) {
        score[i] = score[i] / 10;
    }
    
    var myVector = new Vector(item.pos.x - this.pos.x, 
        item.pos.y - this.pos.y);
    myVector = Vector.normalize(myVector);
    myVector = Vector.multiply(myVector, score[i]);
    itemVector[i] = myVector;
}

var sumVectors = new Vector(0, 0);
for (var i = 0; i < items.length; i++) {
    sumVectors = Vector.add(sumVectors, itemVector[i]);
}
sumVectors = Vector.normalize(sumVectors);

var bestItem = null;
var bestScore = -100;
 
for (var i = 0; i < items.length; i++) {
    var myScore = itemVector[i].dot(sumVectors) * 0.30 +
                   score[i] * 0.70;
    if (!bestItem || myScore > bestScore) {
        bestItem = items[i];
        bestScore = myScore;
    }
}

    

//for (var i = 0; i < items.length; i++) {
//    var item = items[i];
//    var score = item.bountyGold /this.distance(item);
//    if (this.distance(item) < item.distance(this.getNearestEnemy())) {
//        score /= 2
//    }
//    if (bestItem === null || score > bestScore) {
//        bestItem = item;
//        bestScore = score;
//    }
//}

if (bestItem) {
    if (bestItem.distance(this.getNearestEnemy()) < 
             this.distance(bestItem) &&
             this.getItems().length > 20 &&
             this.distance(this.getNearestEnemy()) < 20 &&
             this.getCooldown("terrify") <= 0) {
        this.terrify();
    } else {
        this.move(bestItem.pos);
    }
} else {
    this.moveXY(18, 36);
}

// Click on a coin to see its API.

