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
  console.log("old", oldNode);
  
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
      console.log("Already visited!");
      return true;
    }
    // no this node hasn't been visited
    // do nothing 
  }
  console.log("checking visited", counter, path, newNode);
}

function knightMoves([x,y], [targetx, targety], oldNode) {
  // Prevent infinite looping
  counter ++; 
  if (counter > 500) {
    return "stop the madness!"
  }

  let queue = []; 
  
  if (x > 7 || targetx > 7 || y > 7 || targety > 7 || x < 0 || targetx < 0 || y < 0 || targety < 0) {
    throw new Error("Out of bounds. Please use values between 0 - 7");
  }
  
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

  // create an oldNode if there isn't one
  if (!oldNode) {
    oldNode = Node([x,y]);
    console.log("there is no old node yet", oldNode);
  }

  // Go through all possible moves and make sure they are in bounds
  for (let move = 0; move < possibleMoves.length; move++) {
    let movex = possibleMoves[move][0];
    let movey = possibleMoves[move][1];
    if (movex > 7 || movey > 7 || movex < 0 || movey < 0 ) {
      possibleMoves[move] = null;
      continue;
    }
    console.log(move, possibleMoves[move], possibleMoves);

    let possibleMoveNode = Node(possibleMoves[move]);

    //// Could combine these into one variable and then check the if statements
    let checkValue = checkVisited(possibleMoveNode, oldNode);

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
      let finalNode = Node([movex, movey], oldNode);
      console.log("Arrived at target!", finalNode);
      return finalNode;
    }

    // put in queue
    queue.push(possibleMoves[move]);

  }
  console.log(queue);
  //// Our function is doing a depth first search but we want breadth.
  //// Change from recursion to a queue!
  // continue searching from remaining possible moves
  // do I want to limit directionality (right/left)?
  while(queue.length > 0) {
    let nextMove = queue[0];
    // Add on to oldnode
    oldNode = Node(nextMove, oldNode);
    
    console.log(nextMove, oldNode, [targetx, targety]);
    // use the queueue
    // knightMoves(possibleMoves[move], [targetx, targety], oldNode);
    queue.pop();
    
  }
}

// let myBoard = buildBoard();
// console.log(myBoard);

// let a = Node([0,0]);
// let b = Node([2,1], a);
// let c = Node([4,2], b);
// console.log(c);

// checkVisited(Node([7,7]), c);
console.log(knightMoves([3,3], [7,1]));
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