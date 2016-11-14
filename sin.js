var scale;
scale = 1;


var canvas = document.getElementById('tutorial');
var ctx = canvas.getContext('2d');

function forScale(){
    scale = parseFloat(+document.getElementById("scale").value);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    draw();

}
var intervalID;

var line = function(x0,y0, x1, y1) {
    ctx.beginPath();
    ctx.moveTo(x0,y0);
    ctx.lineTo(x1,y1);
    ctx.stroke();
};
var triangle = function(x0, y0, x1, y1, x2, y2){
    ctx.beginPath();
    ctx.moveTo(x0,y0);
    ctx.lineTo(x1,y1);
    ctx.lineTo(x2,y2);
    ctx.fill();
};

var getValidY = function(y){
    return y*-1;
};


function draw(){

    var scale1, scale2;
    var addX = 500;
    var addY = 300;
    var x0, y0, startX, startY;

    scale1 = scale*20;
    scale2 = 64*scale;
    var getX0 = function(){
        var j, xj, yj, x;

        for(j =-120; j<0; j+=0.1){
            xj = j;
            yj=Math.sin(j);
            x =xj*scale2 + addX;
            if (x > 30){
                startX = xj;
                startY = yj;
                x0 = xj;
                y0 = yj;
                break;
            }
        }
        console.log(x0);
        console.log(y0);
    };

    function drawAxes() {

        //система координат
        var scaleAxes;
        scaleAxes = scale1-1;

        ctx.strokeStyle = "green";
        ctx.fillStyle = "green";
        ctx.font = scaleAxes+"px serif";
        line(20,300,1000,300);
        line(500,20,500,550);
        triangle(1005,300,990,295,990,305);
        triangle(500,15,495,30,505,30);

        ctx.fillText("x", 985, 320);
        ctx.fillText("y", 485, 30);
        ctx.fillText("0", 488, 295);

        var x1, y1, x2, y2, x, y;
        var cons = 0;

        //нумерация системы координат
        for(x = 0, y1 = 300, y2 = 300;
            x < Math.PI, y1 > 100, y2 < 500;
            x+=(Math.PI/2), y1-=150, y2+=150){
            x1 = 500;
            x2 = 500;
            y = Math.sin(x);
        }
        for(x = 0, x1 = 500, x2 = 500;
            x < 5, x1 > 20, x2 < 1000;
            x+=(Math.PI/2), x1-=5*scale1, x2+=5*scale1){

            y = Math.sin(x);
            y2 = 300;
            y1 = 300;
            line(x1, y1+3, x1, y1-3);
            line(x2, y2+3, x2, y2-3);
            if(cons == 1){
                ctx.fillText("П/2", x2-12, y2-5);
                ctx.fillText("П/2", x1-12, y1-5);
            }
            else if(cons == 2){
                ctx.fillText("П", x2-12, y2-5);
                ctx.fillText("-П", x1-12, y1-5);
            }
            else if(cons%2==0 && cons!= 0){
                ctx.fillText((cons-2) + "П", x2-12, y2-5);
                ctx.fillText(-(cons-2) + "П", x1-12, y1-5);
            }
            else if(cons%2!=0){
                ctx.fillText(cons + "П/2", x2-12, y2-5);
                ctx.fillText(-cons + "П/2", x1-12, y1-5);
            }
            cons++;

        }

        ctx.fillText("1", addX+8,  getValidY(scale2 - addY));
        ctx.fillText("-1", addX+8, getValidY(-scale2 - addY));
        line(addX-3, getValidY(scale2 - addY), addX+3, getValidY(scale2 - addY));
        line(addX-3, getValidY(-scale2 - addY), addX+3, getValidY(-scale2 - addY));

    }
    function drawSin(){
        clearInterval(intervalID);

        var xi, yi;
        var step = 0.1, i;

        i = x0;
        intervalID = window.setInterval(function() {
            var x =i*scale2 + addX;
            if(x > 950) {
                i=startX;
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                drawAxes();
                // todo clear previous sinx
            }

            if((x < 950) && (x > 30)){
                xi = i;
                yi = Math.sin(xi);
                line(x0*scale2 + addX,getValidY(y0*scale2 - addY), xi*scale2 + addX,getValidY(yi*scale2 - addY));
                x0 = xi;
                y0 = yi;
            }
            else {
                x0 = i;
                y0 = Math.sin(x0);
            }


            i+=step;
        }, 1000/100);
    }

    getX0();
    drawAxes();
    drawSin();
}


