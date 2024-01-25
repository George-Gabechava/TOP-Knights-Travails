// prevent infinite loop counter
let counter = 0;

// Want a node tree to keep track of previously visited nodes
function Node([x,y], prev) {
  let root = [x,y];
  if (prev) {
    return {root, prev};
  }
  return {root}
}

// Check if the new node (chess board location) has already been visited in the node tree.
function checkVisited(newNode, oldNode) {
  let path = [];
  
  // Go through all the previous nodes one by one
  while (oldNode) {
    path.push(oldNode.root);
    oldNode = oldNode.prev;
  }

  // Check if the new node is in the old node path
  let newNodex = newNode.root[0];
  let newNodey = newNode.root[1];

  for (let i in path) {
    // Yes it has already been visited
    if (newNodex === path[i][0] && newNodey === path[i][1]) {
      return true;
    }     
  }
}

function knightMoves([x,y], [targetx, targety]) {  
  if (x > 7 || targetx > 7 || y > 7 || targety > 7 || x < 0 || targetx < 0 || y < 0 || targety < 0) {
    throw new Error("Out of bounds. Please use values between 0 - 7");
  }
  
  let oldNode = Node([x,y]);
  let queue = [oldNode]; 

  // Go through all possible moves from currentNode and make sure they are in bounds
  const checkPossibleMoves = (currentNode, prevNode) => {
    // x & y coordinates for current node
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
  
    // Try each move, and make sure they are in bounds
    for (let move = 0; move < possibleMoves.length; move++) {
      let movex = possibleMoves[move][0];
      let movey = possibleMoves[move][1];
      if (movex > 7 || movey > 7 || movex < 0 || movey < 0 ) {
        possibleMoves[move] = null;
        continue;
      }
  
      let possibleMoveNode = Node(possibleMoves[move]);
      
      let checkValue = checkVisited(possibleMoveNode, currentNode);
  
      // If already visited, remove this node from path
      if (checkValue === true) {
        possibleMoves[move] = null;
        continue;
      }
  
      // check to see if any moves arrive at the target node
      if (movex === targetx && movey === targety) {
        let finalNode = Node([movex, movey], currentNode);
        let finalPath = [];
        let finalPathReversed = [];

        // Go through all the previous nodes one by one to list them in an array
        while (finalNode) {
          finalPath.push(finalNode.root);
          finalNode = finalNode.prev;
        }
        // Reverse the order of the array
        console.log(`You made it in ${finalPath.length} moves! Here is a path:`)
        while (finalPath.length > 0) {
          let popped = finalPath.pop();
          console.log(popped);
          finalPathReversed.push(popped);
        }
        return finalPathReversed;
      }
  
      // Push this move into the queue      
      queue.push(Node(possibleMoves[move], currentNode));
    }
  }
  // continue searching from remaining possible moves
  while (queue.length > 0) {

    // Prevent infinite loop if something goes wrong.
    counter ++; 
    if (counter > 1000) {
      return "stop the madness!"
    }
    
    // Begin at start of queue
    let nextNode = queue[0];

    // If the item in queue has a previous node, update the current path
    if (queue[0].prev) {
      oldNode = nextNode.prev;
    }

    // Use the queue
    let nextCheck = checkPossibleMoves(nextNode, oldNode);
    if (typeof(nextCheck) === 'object') {
      return nextCheck;
    }
    queue.shift();
  }
}

// To find a path between two squares on the board (x & y values range from 0-7):
// Type knightMoves([startingx, startingy], [destinationx, destinationy])

knightMoves([3,3], [7,7]);
