document.addEventListener('DOMContentLoaded', (event) => {
  fetch("exampleData.txt").then((res)=>{
    return res.text();
  }).then((data) => {
    document.getElementById('input').value = data;
  });
})
