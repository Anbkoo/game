var sizeOfOneSquare = 40, sizeOfFoundation = 3;
var canvas = document.getElementById("main"), context = 
canvas.getContext("2d");
function drawmap() {
    for (var i=0; i<sizeOfFoundation; i++){
        for (var j=0; j<sizeOfFoundation; j++){
            context.strokeRect(0+i*sizeOfOneSquare, 0+j*sizeOfOneSquare, 
sizeOfOneSquare, sizeOfOneSquare);
        }
    }
}
drawmap();
var WidthOfWindow =  window.innerWidth*0.45, HeightOfWindow = 
window.innerHeight*0.2;
var flagForChangeStep = true, flagWinner = false;
var arrayForO = [], arrayForX = [], countSteps = 0;

function showCoords(evt) {
    if (evt.clientX>=WidthOfWindow && evt.clientX 
<=(WidthOfWindow+(sizeOfFoundation*sizeOfOneSquare)) && evt.clientY >= 
HeightOfWindow && evt.clientY 
<=(HeightOfWindow+(sizeOfFoundation*sizeOfOneSquare)) && flagWinner === 
false) {
        var coordinateOfX =evt.clientX, coordinateOfY =evt.clientY;
        var numberi = Math.floor((coordinateOfX - 
WidthOfWindow)/sizeOfOneSquare), numberj = Math.floor((coordinateOfY - 
HeightOfWindow)/sizeOfOneSquare);
        var ctx = canvas.getContext("2d");
        var radiusOfCircle = sizeOfOneSquare/2;

        if (flagForChangeStep) { 
            var flagNotDrawX = true;
            if (countSteps > 0) {
                for (var i=0, len = arrayForO.length; i<len; i++) {
                    if (numberi+numberj*sizeOfFoundation === 
arrayForO[i] || numberi+numberj*sizeOfFoundation === arrayForX[i]) {
                        flagNotDrawX = false;  
                        break;
                    }
                }
            }
            if (flagNotDrawX === true) {
                ctx.beginPath();              
                ctx.lineWidth = "1";
                ctx.strokeStyle = "black"; 
                ctx.moveTo(0+numberi*sizeOfOneSquare, 
0+numberj*sizeOfOneSquare);
                ctx.lineTo(sizeOfOneSquare+numberi*sizeOfOneSquare, 
sizeOfOneSquare+numberj*sizeOfOneSquare);
                
ctx.moveTo(sizeOfOneSquare+numberi*sizeOfOneSquare,0+numberj*sizeOfOneSquare);
                
ctx.lineTo(0+numberi*sizeOfOneSquare,sizeOfOneSquare+numberj*sizeOfOneSquare);
                ctx.stroke();
                flagForChangeStep = false;
                arrayForX.push(numberi+numberj*sizeOfFoundation);
                countSteps++;
            }
        }
        else {
            var flagNotDrawCircle = true;
            for (var i=0, len = arrayForX.length; i<len; i++) {
                if (numberi+numberj*sizeOfFoundation === arrayForX[i] || 
numberi+numberj*sizeOfFoundation === arrayForO[i]) {
                    flagNotDrawCircle = false;  
                    break;
                }
            }
            if (flagNotDrawCircle === true) {
                ctx.beginPath();
                
ctx.arc(radiusOfCircle+numberi*sizeOfOneSquare,radiusOfCircle+numberj*sizeOfOneSquare,radiusOfCircle,0,2*Math.PI);
                ctx.stroke();
                flagForChangeStep = true;
                arrayForO.push(numberi+numberj*sizeOfFoundation); 
                countSteps++;  
            }
        }
        winner();  
    }  
}

function winner() {
    var arrey = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [2,4,6],
        [0,4,8]
    ]
    for (var i=0, len = arrey.length; i<len; i++){
        var countX = 0, countO = 0;
        for (var k=0; k<arrayForX.length; k++) {
            for (var j=0, leng = arrey[0].length; j<leng; j++) {
                if (arrayForX[k]===arrey[i][j]) {
                    countX ++;
                    break;
                }
            }
        }

        for (var k=0; k<arrayForO.length; k++) {
            for (var j=0, leng = arrey[0].length; j<leng; j++) {
                if (arrayForO[k]===arrey[i][j]) {
                    countO ++;
                    break;
                }
            }
        }

        if (countX === 3) {
            alert ("winner the player of X");
            flagWinner = true;
            break;
        }
        else if (countO === 3) {
            flagWinner = true;
            alert ("winner the player of O");
            break;
        }
        else if (countSteps === 9 && i===9){
            alert ("noone win");
            break;
        }
    }
}

function clearrectangular(){
    for (var i=0; i<sizeOfFoundation; i++){
        for (var j=0; j<sizeOfFoundation; j++){
            context.clearRect(0+i*sizeOfOneSquare, 0+j*sizeOfOneSquare, 
sizeOfOneSquare, sizeOfOneSquare);
            context.strokeRect(0+i*sizeOfOneSquare, 0+j*sizeOfOneSquare, 
sizeOfOneSquare, sizeOfOneSquare);
        }
    }
    arrayForO = [], arrayForX = [], countSteps = 0,flagWinner = false, 
flagForChangeStep = true;
}

