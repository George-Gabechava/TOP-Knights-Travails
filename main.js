// prevent infinite loop counter
let counter = 0;

// Want a node tree to keep track of visited nodes
function Node([x,y], prev) {
  let root = [x,y];
  if (prev) {
    return {root, prev};
  }
  return {root}
}

// Check if the new node (chess board location) has already been visited
function checkVisited(newNode, oldNode) {
  let path = [];
  // console.log("old", oldNode);
  
  // Go through all the previous nodes one by one
  while (oldNode) {
    path.push(oldNode.root);
    oldNode = oldNode.prev;
  }

  if (path.length > 3) {
    console.log("too long of a path");
    return "long";
  }

  // Check if the new node is in the old node path
  let newNodex = newNode.root[0];
  let newNodey = newNode.root[1];

  for (let i in path) {
    // yes it has already been visited
    if (newNodex === path[i][0] && newNodey === path[i][1]) {
      // console.log("Already visited!");
      return true;
    }
    // no this node hasn't been visited
    // do nothing 
  }
  // console.log("checking visited", counter, path, newNode);
}

function knightMoves([x,y], [targetx, targety]) {
  // Prevent infinite looping

  
  if (x > 7 || targetx > 7 || y > 7 || targety > 7 || x < 0 || targetx < 0 || y < 0 || targety < 0) {
    throw new Error("Out of bounds. Please use values between 0 - 7");
  }
  
  let oldNode = Node([x,y]);
  let queue = [oldNode]; 

  // Go through all possible moves and make sure they are in bounds
  // make this a function I can call inside here?
  const checkPossibleMoves = (currentNode, prevNode) => {

    let x = currentNode.root[0];
    let y = currentNode.root[1];

    // List of possible moves
    // r = right, l = left, u = up, d = down, 
    let ruu = [x+1, y+2];
    let rru = [x+2, y+1];
    let rrd = [x+2, y-1];
    let rdd = [x+1, y-2];
    let ldd = [x-1, y-2];
    let lld = [x-2, y-1];
    let llu = [x-2, y+1];
    let luu = [x-1, y+2];
  
    let possibleMoves = [ruu, rru, rrd, rdd, lld, llu, luu, ldd];
  
    for (let move = 0; move < possibleMoves.length; move++) {
      let movex = possibleMoves[move][0];
      let movey = possibleMoves[move][1];
      if (movex > 7 || movey > 7 || movex < 0 || movey < 0 ) {
        possibleMoves[move] = null;
        continue;
      }
      // console.log(move, possibleMoves[move], possibleMoves);
  
      let possibleMoveNode = Node(possibleMoves[move]);
      
      let checkValue = checkVisited(possibleMoveNode, currentNode);
  
      // If already visited, remove this node from path
      if (checkValue === true) {
        possibleMoves[move] = null;
        continue;
      }
      // If path is too long
      if (checkValue === "long") {
        return "too long";
      }
  
      // check to see if any moves arrive at the target node
      if (movex === targetx && movey === targety) {
        let finalNode = Node([movex, movey], prevNode);
        console.log("Arrived at target!", finalNode);
        return finalNode;
      }
  
      // put in queue
      //// the nextNode is missing a previous node but not the first one
      
      queue.push(Node(possibleMoves[move], currentNode));
    }
  }
  console.log(queue);
  // continue searching from remaining possible moves
  // do I want to limit directionality (right/left)?
  while (queue.length > 0) {

    counter ++; 
    if (counter > 25) {
      return "stop the madness!"
    }
    
    let nextNode = queue[0];
    let nextMove = nextNode.root;

    if (queue[0].prev) {
      oldNode = nextNode.prev;
      // console.log("add it", queue[0], queue[0].prev);
    }

    console.log("125 heeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeere", nextNode, nextMove, oldNode);
    // use the queueue
    let nextCheck = checkPossibleMoves(nextNode, oldNode);
    if (typeof(nextCheck) === 'object') {
      return nextCheck;
    }
    queue.shift();
  }
}

// let myBoard = buildBoard();
// console.log(myBoard);

let a = Node([0,0]);
// let b = Node([2,1], a);
// let c = Node([4,2], b);
// console.log(c);
console.log(a);

// checkVisited(Node([7,7]), c);
console.log(knightMoves([3,3], [7,5]));
console.log("counter", counter);

// Build board
// This doesn't do anything yet...
function buildBoard() {
  let boardArray = []
  // Board is an 8x8 grid, with values [0,0] to [7,7]
  for (let i = 0; i < 8; i ++) {
    for (let j = 0; j < 8; j ++) {
      boardArray.push([i,j]);
    }    
  }
  return boardArray;
}