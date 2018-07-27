var sizeOfOneSquare = 40, sizeOfFoundation = 3, canvas =document.getElementById("main"), context = canvas.getContext("2d");
function drawmap() {
    var i;
    for (i=0; i<sizeOfFoundation; i+=1){
        for (var j=0; j<sizeOfFoundation; j+=1){
            context.strokeRect(i*sizeOfOneSquare, j*sizeOfOneSquare,sizeOfOneSquare, sizeOfOneSquare);
        }
    }
}
drawmap();
var WidthOfWindow =  window.innerWidth*0.45, HeightOfWindow =window.innerHeight*0.2, flagForChangeStep = true, flagWinner = false,arrayForO = [], arrayForX = [], countSteps = 0;

canvas.onmousedown = function(evt){
    if (evt.clientX>=WidthOfWindow && evt.clientX<=(WidthOfWindow+(sizeOfFoundation*sizeOfOneSquare)) && evt.clientY >=HeightOfWindow && evt.clientY <=(HeightOfWindow+(sizeOfFoundation*sizeOfOneSquare)) && flagWinner ===false) {
        var coordinateOfX =evt.clientX, coordinateOfY =evt.clientY,numberI = Math.floor((coordinateOfX - WidthOfWindow)/sizeOfOneSquare),numberJ = Math.floor((coordinateOfY - HeightOfWindow)/sizeOfOneSquare),ctx = canvas.getContext("2d"), radiusOfCircle = sizeOfOneSquare/2;
        if (flagForChangeStep) { 
            var flagNotDrawX = true;
            if (countSteps > 0) {
                for (var i=0, len = arrayForO.length; i<len; i++) {
                    if (numberI+numberJ*sizeOfFoundation === 
arrayForO[i] || numberI+numberJ*sizeOfFoundation === arrayForX[i]) {
                        flagNotDrawX = false;  
                        break;
                    }
                }
            }
            if (flagNotDrawX === true) {
                ctx.beginPath();
                ctx.lineWidth = "1";
                ctx.strokeStyle = "black"; 
                ctx.moveTo(numberI*sizeOfOneSquare,numberJ*sizeOfOneSquare);
                ctx.lineTo(sizeOfOneSquare+numberI*sizeOfOneSquare,sizeOfOneSquare+numberJ*sizeOfOneSquare);
		ctx.moveTo(sizeOfOneSquare+numberI*sizeOfOneSquare,numberJ*sizeOfOneSquare);
		ctx.lineTo(numberI*sizeOfOneSquare,sizeOfOneSquare+numberJ*sizeOfOneSquare);
                ctx.stroke();
                flagForChangeStep = false;
                arrayForX.push(numberI+numberJ*sizeOfFoundation);
                countSteps++;
            }
        }
        else {
            var flagNotDrawCircle = true;
            for (var i=0, len = arrayForX.length; i<len; i++) {
                if (numberI+numberJ*sizeOfFoundation === arrayForX[i] || numberI+numberJ*sizeOfFoundation === arrayForO[i]) {
                    flagNotDrawCircle = false;  
                    break;
                }
            }
            if (flagNotDrawCircle === true) {
                ctx.beginPath();
                
ctx.arc(radiusOfCircle+numberI*sizeOfOneSquare,radiusOfCircle+numberJ*sizeOfOneSquare,radiusOfCircle,0,2*Math.PI);
                ctx.stroke();
                flagForChangeStep = true;
                arrayForO.push(numberI+numberJ*sizeOfFoundation); 
                countSteps++;  
            }
        }
        winner();
    }  
}
var arrey = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [0,4,8]
], len = arrey.length, leng = arrey[0].length;

function winner() {
    var lengt=arrayForX.length;
    for (var i=0; i<len; i++){
        var countX = 0, countO = 0;
        for (var k=0; k<lengt; k++) {
            for (var j=0; j<leng; j++) {
                if (arrayForX[k]===arrey[i][j]) {
                    countX ++;
                    break;
                }
            }
        }

        for (var k=0; k<arrayForO.length; k++) {
            for (var j=0; j<leng; j++) {
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
        else if (countSteps === 9 && i === len -1 ){
            alert ("noone win");
            break;
        }
    }
}

var myLink = document.getElementById('buttonOfClear');
myLink.onclick = function (){
        for (var i=0; i<sizeOfFoundation; i++){
            for (var j=0; j<sizeOfFoundation; j++){
                context.clearRect(i*sizeOfOneSquare,j*sizeOfOneSquare, sizeOfOneSquare, sizeOfOneSquare);
                context.strokeRect(i*sizeOfOneSquare, j*sizeOfOneSquare, sizeOfOneSquare, sizeOfOneSquare);
            }
        }
        arrayForO = [], arrayForX = [], countSteps = 0,flagWinner = false, flagForChangeStep = true;
}
