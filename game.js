function drawmap(){
    var canvas = document.getElementById("main");
    var context = canvas.getContext("2d");

    for (var i=0; i<3; i++){
        for (var j=0; j<3; j++){
            context.strokeRect(0+i*40, 0+j*40, 40, 40);
        }
    }
}
drawmap();
var WidthOfWindow =  window.innerWidth*0.45;
var HeightOfWindow = window.innerHeight*0.2;
var flagForChangeStep = true;
var arrayForO = [], arrayForX = [];

function showCoords(evt){
    if (evt.clientX>=WidthOfWindow && evt.clientX <=(WidthOfWindow+120) 
&& evt.clientY >= HeightOfWindow && evt.clientY <=(HeightOfWindow+120)){
        var coordinateOfX =evt.clientX, coordinateOfY =evt.clientY;
        var numberi = Math.floor((coordinateOfX - WidthOfWindow)/40), 
numberj = Math.floor((coordinateOfY - HeightOfWindow)/40);
        var canvas = document.getElementById("main");
        var ctx = canvas.getContext("2d");

        if (flagForChangeStep){ 
            ctx.beginPath();              
            ctx.lineWidth = "1";
            ctx.strokeStyle = "black"; 
            ctx.moveTo(0+numberi*40, 0+numberj*40);
            ctx.lineTo(40+numberi*40, 40+numberj*40);
            ctx.moveTo(40+numberi*40,0+numberj*40);
            ctx.lineTo(0+numberi*40,40+numberj*40);
            ctx.stroke();
            flagForChangeStep = false;
            arrayForX.push(numberi+numberj*3);
        }
        else {
            ctx.beginPath();
            ctx.arc(20+numberi*40,20+numberj*40,20,0,2*Math.PI);
            ctx.stroke();
            flagForChangeStep = true;
            arrayForO.push(numberi+numberj*3);
        }
    }
    winner();
    
}

function winner(){
    var arrey = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ]
}

