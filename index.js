var F = [
    new vec(2, 1),
    new vec(2, 2),
    new vec(3, 2),
    new vec(3, 3),
    new vec(2, 3),
    new vec(2, 4),
    new vec(4, 4),
    new vec(4, 5),
    new vec(1, 5),
    new vec(1, 1)
]

var scale = 28; // scaling of the shape
var can, ctx, halfWidth, halfHeight;

var a11, a12, a21, a22

document.addEventListener("DOMContentLoaded", function() {
    can = document.getElementById("canvas");
    ctx = can.getContext("2d");
    halfWidth = can.width * 0.5;
    halfHeight = can.height * 0.5;
    for (p of F)
        p.scale(scale)
    var inputs = document.getElementsByTagName("input");
    for (var input of inputs) {
        input.oninput = updateGraph
    }
    updateGraph()
}, false)

function valueOf(id) {
    var str = document.getElementById(id).value;
    var value = parseFloat(str)
    if (value == NaN)
        return 0;
    return value;
}

function vec(x, y) {
    this.x = x;
    this.y = y;

    this.scale = function(a) {
        this.x *= a;
        this.y *= a
    }

    this.transform = function() {
        this.x = a11 * x + a12 * y
        this.y = a21 * x + a22 * y
    }
}

function updateGraph() {
    ctx.clearRect(0, 0, can.width, can.height);
    ctx.lineWidth = 1
    ctx.strokeStyle = "black"
    drawAxes()
    ctx.lineWidth = 2
    ctx.strokeStyle = "blue"
    drawPoints()
}

function drawAxes() {
    ctx.beginPath()
    ctx.moveTo(halfWidth, 0)
    ctx.lineTo(halfWidth, can.height)
    ctx.stroke();
    ctx.moveTo(0, halfHeight)
    ctx.lineTo(can.width, halfHeight);
    ctx.stroke()
}

function drawPoints() {
    ctx.beginPath()

    a11 = valueOf('a11')
    a12 = valueOf('a12')
    a21 = valueOf('a21')
    a22 = valueOf('a22')

    for (var i = 0; i < F.length; i++) {
        var p1 = new vec(F[i].x, F[i].y);
        var p2;
        if (i == F.length - 1) {
            p2 = new vec(F[0].x, F[0].y)
        } else {
            p2 = new vec(F[i + 1].x, F[i + 1].y)
        }

        p1.transform()
        p2.transform()

        ctx.moveTo(halfWidth + p1.x, halfHeight - p1.y);
        ctx.lineTo(halfWidth + p2.x, halfHeight - p2.y);
        ctx.stroke();
    }
}