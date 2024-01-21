console.log('test');
// 3
// 2
// 1
//y/x1 2 3

// need the system such that the path cannot visit the same node twice
// u = up, d = down, l = left, r = right 
function knightMoves([x, y], [targetx, targety], currentPath) {
  // if this is an existing path
  if (currentPath) {
    currentPath.push([x,y]);
  }
  // if this is the start of a path
  if (!currentPath) {
    let currentPath = [[x,y]]
  }
  
  // if this node has already been visited, return
  for (i in currentPath) {
    let xindex = currentPath[i][0];
    let yindex = currentPath[i][1];
    if (x == xindex && y == yindex) {
        return;
    }
  }
  
  
  let canMoveNames = ["uur", "urr", "drr", "ddr"];
  let canMovePositions = [];
  let uur = [x+1, y+2];

  //// TO DO Instead of pushing these positions:
  // lets start a recursion to knightMoves(uur) until we reach the target
  canMovePositions.push(uur);
  let urr = [x+2, y+1];
  canMovePositions.push(urr);
  let drr = [x+2, y-1];
  canMovePositions.push(drr);
  let ddr = [x+1, y-2];
  canMovePositions.push(ddr);
  
  
  console.log(canMoveNames);
  console.log(canMovePositions);

  // If we have arrived at desired square, return path
  if (x == targetx && y == targety) {
      return currentPath;
  }
  
  return "nevah give up!";

//   if (x === 8) {
//       right = 8;
//   }
//   if (x === 1) {
//       left = 1;
//   }
//   if (y === 8) {
//       above = 8;
//   }
//   if (y === 1) {
//       below = 1;
//   }
  
// if no available positions lead to target, return "my function doesn't work"
}
console.log(knightMoves([3,3], [4,5]));
