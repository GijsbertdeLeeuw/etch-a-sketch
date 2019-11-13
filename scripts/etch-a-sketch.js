"use strict"

//    ****    Constants From DOM    ****
const CONTAINER_SIZE = 768;

//    ****    Populate Fields   ****
const sizeXXL = document.querySelector("#sizeXXL");
const sizeXL = document.querySelector("#sizeXL");
const sizeL = document.querySelector("#sizeL");
const sizeM = document.querySelector("#sizeM");
const sizeS = document.querySelector("#sizeS");
const sizeXS = document.querySelector("#sizeXS");

const red = document.querySelector("#red");
const orange = document.querySelector("#orange");
const yellow = document.querySelector("#yellow");
const green = document.querySelector("#green");
const blue = document.querySelector("#blue");
const violet = document.querySelector("#violet");

const graphite = document.querySelector("#graphite");
const rainbow = document.querySelector("#rainbow");
const bleacher = document.querySelector("#bleacher");
const erase = document.querySelector("#erase");
const clear = document.querySelector("#clear");

const picker = document.querySelector("#picker");


//    ****    Add Event Listeners    ****
sizeXXL.addEventListener("click", function(){newGrid(4);});
sizeXL.addEventListener("click", function(){newGrid(8);});
sizeL.addEventListener("click", function(){newGrid(16);});
sizeM.addEventListener("click", function(){newGrid(32);});
sizeS.addEventListener("click", function(){newGrid(64);});
sizeXS.addEventListener("click", function(){newGrid(128);});

red.addEventListener("click", function(){color = "red";});
orange.addEventListener("click", function(){color = "orange";});
yellow.addEventListener("click", function(){color = "yellow";});
green.addEventListener("click", function(){color = "green";});
blue.addEventListener("click", function(){color = "blue";});
violet.addEventListener("click", function(){color = "violet";});

graphite.addEventListener("click", function(){color = "black";});
rainbow.addEventListener("click", function(){color = "rainbow";});
bleacher.addEventListener("click", function(){color = "bleach";});
erase.addEventListener("click", function(){color = "white";});
clear.addEventListener("click", function(){clearAll();});

picker.addEventListener("change", watchColorPicker, false);

//    ****    Variables    ****
let color = "black";

//    ****    Functions    ****
function createGrid(gridSize){
let meshWidth = CONTAINER_SIZE / gridSize;
let container = document.querySelector("#grid-container");
  for(let i = 0; i < gridSize * gridSize; i++) {
    let mesh = document.createElement('div');
    mesh.style.float = "left";
    mesh.style.width = meshWidth + "px";
    mesh.style.height = meshWidth + "px";
    mesh.classList.add("mesh");
    mesh.style.opacity = "1";
    container.appendChild(mesh);
  }
}


function removeGrid(){
let grid = document.querySelector(".grid-container");
while (grid.hasChildNodes()) {  
  grid.removeChild(grid.firstChild);
};
} 


function newGrid(gridSize) {
  removeEventListeners();
  removeGrid();
  createGrid(gridSize);
  addEventListeners();
}


function addEventListeners() {
  document.querySelectorAll(".mesh").forEach(function (mesh) {
    mesh.addEventListener('mousedown', paintMesh);
    mesh.addEventListener('mousedown', function() {
      document.querySelectorAll(".mesh").forEach(function(mesh) {
        mesh.addEventListener('mouseenter', paintMesh)
      });
    });
    mesh.addEventListener('mouseup', function() {
      document.querySelectorAll(".mesh").forEach(function(mesh) {
        mesh.removeEventListener('mouseenter', paintMesh)
      });
    });
  });
}


function removeEventListeners() {
  document.querySelectorAll(".mesh").forEach(function (mesh) {
    mesh.removeEventListener("mouseover", paintMesh);
  });
}



function paintMesh () {
  if (color == "rainbow") {
    mixColors();
  }
  else if (color == "bleach") {
    bleachColors();
  }
  else if (color == "white") {
    eraseColors();
  }
  else {
    event.target.style.backgroundColor = color;
  };
}


function mixColors() {
  let r = Math.floor(Math.random() * 255);
  let g = Math.floor(Math.random() * 255);
  let b = Math.floor(Math.random() * 255);
  event.target.style.backgroundColor = `rgb(${r},${b},${g})`;
}


function bleachColors() {
  if (event.target.style.backgroundColor == "white") {
    return;
  }
  else if (event.target.style.opacity == 0) {
    event.target.style.backgroundColor = "white"; 
  }
  else {
    event.target.style.opacity -= 0.1;
  }
}


function eraseColors() {
  event.target.style.backgroundColor = "white";
  event.target.style.opacity = 1;
}


function clearAll() {
  document.querySelectorAll(".mesh").forEach(function (mesh) {
    mesh.style.backgroundColor = "white";
    mesh.style.opacity = 1;
  });
}


function watchColorPicker(pick) {
  color = pick.target.value;
  }


//    ****    Commands    ****
createGrid(16);
addEventListeners();
