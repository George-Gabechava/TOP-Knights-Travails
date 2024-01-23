// prevent infinite loop counter
let counter = 0;

// counter ++;
// if (counter > 10) {
//   return "oops";
// }

// Want a node tree that can go both directions
function Node([x,y], prev) {
  let root = [x,y];
  if (prev) {
    return {root, prev};
  }
  return {root,}
}

// return an array of all visited nodes
function visited(node) {
  let visitedArray = [];
  let currentNode = node;
  
  while (currentNode) {
    visitedArray.push(currentNode.root);
    currentNode = currentNode.prev;
  }

  return visitedArray;
}

// Build board
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

function knightMoves([x,y], [targetx, targety]) {
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

  for (let move = 0; move < possibleMoves.length; move ++) {
    let movex = possibleMoves[move][0];
    let movey = possibleMoves[move][1];
    if (movex > 7 || movey > 7 || movex < 0 || movey < 0 ) {
      possibleMoves[move] = null;
    }
  }  
}

function checkVisited(path) {
  //check if visited
}


let myBoard = buildBoard();
console.log(myBoard);

let a = Node([0,0]);
let b = Node([2,1], a);
let c = Node([4,2], b);
console.log(c);

//// Cause an infitite loop!
console.log(visited(c));
// console.log(knightMoves([3,3], [7,1]));
console.log(counter);

