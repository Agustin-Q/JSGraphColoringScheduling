//DSatur implementation, code is rubbish but works...
function getNextVertex(matrix, colors, degreeMatrix){
  //for every vertex
  let maxVertex =0;
  //get first uncolord vertex
  for (let i = 0; i < colors.length; i++){
    if(colors[i] == 0){
      maxVertex = i;
      break;
    }
  }
  let maxSatDegree =0;
  let nextColor= 1;
  for (let i=0; i<matrix.length; i++){
    // if its not colored
    if (colors[i]== 0){
      let adjacentColors = [];
      //for every vertex
      for (let j=0; j<matrix[i].length; j++){
        // that its not itself and has a border, note matrix[i][j] == matrix[j][i]
        if(j!=i && matrix[i][j] > 0){
          // if the vertex is colored
          if (colors[j]>0){
            let found = adjacentColors.find((color) => color == colors[j]);
            // if the vertex color is not in the adjacent colours
            if (!found){
              //add the colour to adjacent colurs
              adjacentColors.push(colors[j]);
            }
            //satDegree++;
          }
        }
      }
      let satDegree = adjacentColors.length;
      let newVertex = false;
      if (satDegree>maxSatDegree){
        maxSatDegree = satDegree;
        maxVertex = i;
        newVertex = true;
      } else if (satDegree == maxSatDegree && degreeMatrix[i] > degreeMatrix[maxVertex]){
        maxVertex = i;
        newVertex = true;
        }
      if(newVertex){
        let tempColor =1;
        if(adjacentColors.length==0)  nextColor = 1;
        adjacentColors.sort();
        for (let k = 0; k < adjacentColors.length; k++){
          if (adjacentColors[k] == tempColor){
            tempColor++;
            nextColor = tempColor;
          } else{
            nextColor = tempColor;
            break;
          }
        }
      }
    }
  } 
  return {maxVertex: maxVertex, maxSatDegree: maxSatDegree, nextColor: nextColor};
}

function calculateDegreeMatrix(matrix){
  let degreeMatrix = [];
  for (let i=0; i<matrix.length; i++){
    let degree = 0;
    for (let j=0; j<matrix[i].length; j++){
      if(j!=i){
        degree = degree + matrix[i][j];
      }
    }
    degreeMatrix.push(degree);
  } 
  return degreeMatrix;
}

function colorGraph(matrix){
  let colors = new Array(matrix[0].length).fill(0);

  let degreeMatrix = calculateDegreeMatrix(matrix);
  
  for (let i =0; i< matrix[0].length; i++){
    let result = getNextVertex(matrix, colors, degreeMatrix);
    colors[result.maxVertex] = result.nextColor;
  }
  return colors;
}

function generateRandomMatrix(len){
  let matrix = new Array(len);
  for (let i =0; i<len;i++){
    matrix[i] = new Array(len).fill(0);
  }

  for (let i =0; i<len;i++){
    for (let j =i; j<len;j++){
      if(i!=j){
        ranVal = Math.floor(Math.random()*2);
        matrix[i][j] = ranVal;
        matrix[j][i] = ranVal;
      }
    }
  }
  return matrix;
}

function printMatrix(matrix, labels){
  fullStr = ''
  if (typeof labels !== 'undefined') fullStr = 'N/A, ' + labels.join(', ') + '\n';
  for (let i =0; i<matrix.length;i++){
    let str = '';
    if (typeof labels !== 'undefined'){
    str = '' + labels[i] +', ' ;
    } else {
    str = '' + i +', ' ;
    }
    for (let j =0; j<matrix[i].length;j++){
      str = str + matrix[i][j] + ', ';
    }
    fullStr = fullStr + str +'\n';
  }
  console.log(fullStr);
  return fullStr;
}
/*
console.log('hello');

let matrix = [
[0,1,1,1,0,0,1,0],
[1,0,0,0,1,1,0,0],
[1,0,0,0,0,0,1,0],
[1,0,0,0,0,0,1,0],
[0,1,0,0,0,1,0,1],
[0,1,0,0,1,0,0,1],
[1,0,1,1,0,0,0,1],
[0,0,0,0,1,1,1,0],
];

colorGraph(matrix);

/*
console.log('Matrix2');
let matrix2 = generateRandomMatrix(22);
//printMatrix(matrix2);
colorGraph(matrix2);
*/