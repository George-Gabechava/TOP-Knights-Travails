// Counter to prevent infinite loops
let counter = 0;

function knightMoves([x, y], [targetx, targety], currentPath) {
  // Store possible solutions. Going to need to find the shortest one.
  let possibleSolutions = [];
  
  // Counter to prevent infinite loops
  if (counter > 200) {      
    let solution;
    console.log("Stop!");
    let shortestIndex = 0;
    console.log(possibleSolutions);
    for(let i=1; i< possibleSolutions.length; i++){
      if(possibleSolutions[shortestIndex].length > possibleSolutions[i].length) {
      shortestIndex = i;
      solution = possibleSolutions[shortestIndex];
      }
    console.log("SOLUTION?", solution);
    }
    return solution;
  }
  
  // If we are out of bounds (range 0:7), return.
  if (x > 7 || x < 0 || y > 7 || y < 0) {
    return undefined;
  }

  counter ++;
  
  if (counter > 2000) {
    console.log("Stop!");
    return undefined;
  }

  // if this is an existing path, add this square to the visited list
  if (currentPath) {
    currentPath.push([x,y]);
  }
  // if this is the start of a new path, create the visited list
  if (!currentPath) {
    currentPath = [[x,y]]
  }

  console.log("Path", currentPath, currentPath.length);

  if (currentPath.length > 10) {
    console.log("too long, stop", currentPath.length);
    return undefined;
  }

  // if this node has already been visited, return
  for (let i in currentPath) {
    let xindex = currentPath[i][0];
    let yindex = currentPath[i][1];
    // console.log("i:", i, "Current", x, y, "visited", xindex, yindex);
    if (x === xindex && y === yindex) {
        console.log("already visited");
        break;
    }
  }
  
  // If we have arrived at desired square, return path
  if (x === targetx && y === targety) {
    console.log("FOUND ONE PATH");
    return currentPath;
  }

  // r = right, l = left, u = up, d = down, 
  let ruu = [x+1, y+2];
  let rru = [x+2, y+1];
  let rrd = [x+2, y-1];
  let rdd = [x+1, y-2];

  let ldd = [x-1, y-2];
  let lld = [x-2, y-1];
  let llu = [x-2, y+1];
  let luu = [x-1, y+2];

  let moveRight = [ruu, rru, rrd, rdd];
  let moveLeft = [lld, llu, luu, ldd];

  // Go right
  if (targetx >= x) {
    for (let move = 0; move < moveRight.length; move++) {
        console.log("MoveR",x,y, moveRight[move]);
        let attempt = knightMoves(moveRight[move], [targetx, targety], currentPath);
        if (attempt != undefined) {
            possibleSolutions.push(attempt);
            console.log("attempt done?", attempt);
            // return;
        }
    }
  }

  // Go left
  if (targetx <= x) {
    for (let move = 0; move < moveLeft.length; move++) {
        console.log("MoveL", x,y, moveLeft[move]);
        let attempt = knightMoves(moveLeft[move], [targetx, targety], currentPath);
        if (attempt != undefined) {
            possibleSolutions.push(attempt);
            console.log("attempt done?", attempt);
            // return;
        }
    }
  }
}
console.log(knightMoves([3,3], [7,1]));
console.log(counter);

