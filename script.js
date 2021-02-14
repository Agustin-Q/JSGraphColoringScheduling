function getNextVertex(matrix, colors, degreeMatrix){
  maxSatDegree =0;
  maxVertex =0;
  for (let i=0; i<matrix.length; i++){
    if (colors[i]== 0){
      let satDegree =0
      let degree = 0;
      for (let j=0; j<matrix[i].length; j++){
        if(j!=i && matrix[i][j] > 0){
          if (colors[j]>0){
            satDegree++;
          }
        }
      }
      if (satDegree>maxSatDegree){
        maxSatDegree = satDegree;
        maxVertex = i;
      } if (satDegree == maxSatDegree){
        degreeMatrix[i] > degreeMatrix[maxVertex] ? maxVertex = i : maxVertex = maxVertex;
      }
    }
  } 
  return {maxVertex: maxVertex, maxSatDegree: maxSatDegree};
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
  //console.log(degreeMatrix);
  
  for (let i =0; i< matrix[0].length; i++){
    let result = getNextVertex(matrix, colors, degreeMatrix);
    colors[result.maxVertex] = result.maxSatDegree+1;
  }
  console.log(colors);
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

function printMatrix(matrix){
  for (let i =0; i<matrix.length;i++){
    let str = '' + i +':-> ' ;
    for (let j =0; j<matrix[i].length;j++){
      str = str + matrix[i][j] + ', ';
    }
    console.log(str);
  }
}

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
console.log('Matrix2');
let matrix2 = generateRandomMatrix(22);
//printMatrix(matrix2);
colorGraph(matrix2);