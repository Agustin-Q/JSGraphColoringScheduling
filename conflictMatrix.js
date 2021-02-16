/*
fetch('testk.txt')
  .then(response => response.text())
  .then(data => {
  	// Do something with your data
    compute(data);
  });
*/
document.getElementById("compute").onclick = onClickCompute;

function onClickCompute(){
  let data = document.getElementById("input").value;
  compute(data);
}

function compute(data){
	console.log(data);
    let lines = data.split('\n');
    let list = [];
    for (let i = 0; i < lines.length; i++){
      console.log('serada')
      console.log(lines[i].search(/\w/g));
      if(lines[i].search(/\w/g)!=-1){ 
        
        list.push(lines[i].split(/ *, */g));
      }
    }
    console.log(list);

    let labels = [];
    for (let i = 0; i < list.length; i++){
      result = labels.find((element) => element == list[i][0]);
      if(!result){
        labels.push(list[i][0])
      }
    }
    labels.sort();
    console.log(labels);
    let conflictMatrix = new Array(labels.length);
    for (let i = 0; i < labels.length; i++){
      conflictMatrix[i] = new Array(labels.length).fill(0);
    }
    console.log(conflictMatrix);
    
    for (let i = 0; i < list.length - 1; i++){
      for (let j = i+1; j < list.length; j++){
        if(list[i][1] == list[j][1]){
          let firstIndex = labels.indexOf(list[i][0]);
          let secondIndex = labels.indexOf(list[j][0]);
          if (firstIndex!= secondIndex){
            conflictMatrix[firstIndex][secondIndex]++;
            conflictMatrix[secondIndex][firstIndex]++;
          }
        }
      }
    }
    console.log(conflictMatrix);
    document.getElementById('output2').innerHTML = printMatrix(conflictMatrix, labels);
    
    let colors = colorGraph(conflictMatrix);
    let str = ''
    for (let i = 0; i < colors.length; i++){
      str = str + labels[i] + ':-> ' + colors[i] + '\n';
    }
    document.getElementById('output').innerHTML = str;
}
