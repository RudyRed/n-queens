/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

//  Specification
//  i- a number (representing rooks, rows and columns)
//  o- a matrix (an array of nested arrays representing rows on the board, within the rows are  ones and zeroes representing where the rooks are located for the solution). Note: it will return the FIRST solution the function finds

// Justifiction
// this function will display a board of nxn with n rooks placed in locations such that none of them can attack each other

//  Explanation:
//  Search through all possible placements of rooks on the board, from the perspective of a single rook location in relationship to the remainder of n rooks

// Pseudocode

// var testMatrix = [
//       [1, 1, 1, 1],
//       [0, 0, 0, 0],
//       [0, 0, 0, 0],
//       [0, 0, 0, 0]
//     ]
    
//     var testMatrix = Array(n)
 

// testBoard[r][c] === 1

// // create a new board
// new Board(testMatrix).anyConflicts

// creates an array that contains all posisble positions of a rook within a row
window._createPossibleRowsArray = function(n) {
  // create a possibleRows array of length n
  // fill possibleRows array with n empty arrays of length n
  // itterate over possibleRows and fill the arrays with 0s at each index
  // for each row replace a 0 with a 1, at an incremented index (diagonal line)
  var possibleRows = Array(n);
  
  for ( var i = 0; i < possibleRows.length; i++) {
    possibleRows[i] = Array(n); 
  }
  for ( var row = 0; row < n; row++ ) {
    possibleRows[row].fill(0);
  }   
  for ( var i = 0; i < n; i++ ) {
    possibleRows[i][i] = 1;
  }
  return possibleRows;
};

//  create a possible rows array with values _createPossibleRowsArrayof n length
//  create empty possibleSolution array to hold the board when added
//  create a current row var set to 0

//  create a fn recursion to build the possible boards and test them, it takes no arguments
//    create a currentColumn var set to 0 
//    



window.findNRooksSolution = function(n) {
  var possibleRows = _createPossibleRowsArray(n);
  var possibleSolution = Array(n);
  var currentRow = 0;
  // var solution = undefined; //fixme


  var recursion = function () {
    var currentColumn = 0;  
    var row = currentRow;
    
    // recursive board factory and board checker 
    for (var i = 0; i < possibleRows.length; i++) {
      possibleSolution[row] = possibleRows.shift();
      
      // adding possible solution rows to an incomplete board
      if (currentRow < n - 1) {
        currentRow++;
        recursion();
      }
      
      // testing a full board for no conflicts
      if (currentRow === n - 1) {
        var testBoard = new Board(possibleSolution);
        if (!testBoard.hasAnyRooksConflicts()) {
          // returning first possible solution
          return possibleSolution;
        }
      }
      possibleRows.push(possibleSolution[row]);
    }
    
    // decrement the current row iterator to 
    currentRow--;
  };
  var solution = recursion();
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var possibleRows = _createPossibleRowsArray(n);
  var possibleSolution = Array(n);
  var currentRow = 0;
  var solutionCount = 0;
  // var solution = undefined; //fixme


  var recursion = function () {
    var currentColumn = 0;  
    var row = currentRow;
    
    // recursive board factory and board checker 
    for (var i = 0; i < possibleRows.length; i++) {
      possibleSolution[row] = possibleRows.shift();
      
      // adding possible solution rows to an incomplete board
      if (currentRow < n - 1) {
        currentRow++;
        recursion();
      }
      
      // testing a full board for no conflicts
      if (currentRow === n - 1) {
        var testBoard = new Board(possibleSolution);
        if (!testBoard.hasAnyRooksConflicts()) {
          // returning first possible solution
          solutionCount++;
        }
      }
      possibleRows.push(possibleSolution[row]);

    }
    // decrement the current row iterator to 
    currentRow--;
  };
  recursion();

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = null;
  
  // handle edge cases
  if ( n === 0 ) {
    solution = [];
  }
  if (n === 2 ) {
    solution = [[0, 0], [0, 0]];
  }
  if (n === 3 ) {
    solution = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
  }
  if ( n === 1) {
    solution = [[1]];
  }

  var possibleRows = _createPossibleRowsArray(n);
  var possibleSolution = Array(n);
  var currentRow = 0;
  // var solution = undefined; //fixme


  var recursion = function () {
    var currentColumn = 0;  
    var row = currentRow;
    
    // recursive board factory and board checker 
    for (var i = 0; i < possibleRows.length; i++) {
      possibleSolution[row] = possibleRows.shift();
      
      // adding possible solution rows to an incomplete board
      if (currentRow < n - 1) {
        currentRow++;
        recursion();
      }
      
      // testing a full board for no conflicts
      if (currentRow === n - 1) {
        var testBoard = new Board(possibleSolution);
        if (!testBoard.hasAnyQueensConflicts()) {
          // returning first possible solution
          return possibleSolution;
        }
      }
      possibleRows.push(possibleSolution[row]);
    }
    
    // decrement the current row iterator to 
    currentRow--;
  };
  if (n > 3) {
    solution = recursion();
  }
  
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {

  var possibleRows = _createPossibleRowsArray(n);
  var possibleSolution = Array(n);
  var currentRow = 0;
  var solutionCount = 0;
  // handle edge cases
  if ( n === 2 || n === 3 ) {
    solutionCount = 0;
  }
  if ( n === 0 || n === 1) {
    solutionCount = 1;
  }

  var recursion = function () {
    var currentColumn = 0;  
    var row = currentRow;
    
    // recursive board factory and board checker 
    for (var i = 0; i < possibleRows.length; i++) {
      possibleSolution[row] = possibleRows.shift();
      
      // adding possible solution rows to an incomplete board
      if (currentRow < n - 1) {
        currentRow++;
        recursion();
      }
      
      // testing a full board for no conflicts
      if (currentRow === n - 1) {
        var testBoard = new Board(possibleSolution);
        if (!testBoard.hasAnyQueensConflicts()) {
          // returning first possible solution
          solutionCount++;
        }
      }
      possibleRows.push(possibleSolution[row]);

    }
    // decrement the current row iterator to 
    currentRow--;
  };
  
  if ( n > 3 ) {
    recursion();
  }

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
