// This code runs once per frame. Choose where to move to grab gold!
// First player to 150 gold wins.

var score = [];
var itemVector = [];

var items = this.getItems();
for (var i = 0; i < items.length; i++) {
    var item = items[i];

    var distSq =  Math.pow(item.pos.x - this.pos.x), 2)
                + Math.pow(item.pos.y - this.pos.y));
    score[i] = item.bountyGold / distSq;
    
    var myVector = new Vector(this.pos.x - item.pos.x, 
        this.pos.y - item.pos.y);
    myVector = Vector.normalize(myVector);
    myVector = Vector.multiply(myVector, myScore);
//    itemVector[i] = Vector.normalize(myVector);
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
    var myScore = itemVector[i].dot(sumVectors) * score[i];// * 0.20 +
                   //score[i] * 0.80;
    if (!bestItem || myScore > bestScore) {
        bestItem = items[i];
         
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

