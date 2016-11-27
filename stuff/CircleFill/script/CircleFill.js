var canvas = document.getElementById('canvas1');
var ctx = canvas.getContext('2d');

function generate() {

    canvas.width = 600;
    canvas.height = 480;

    var circles = [];

    function check(c1, c2) { var dx = c1.x - c2.x, dy = c1.y - c2.y, d = c1.r + c2.r; return dx * dx + dy * dy >= d * d; }

    function generateCircle(r1, r2, count) {
        
        const x1 = r2, x2 = canvas.width - r2, y1 = r2, y2 = canvas.height - r2;
        const dx = x2 - x1, dy = y2 - y1, dr = r2 - r1;
        for(var i = 0; i < 100000 && count > 0; ++i) {
            
            var c1 = { x: x1 + Math.random() * dx, y: y1 + Math.random() * dy, r: r1 + Math.random() * dr };
            var checked = true;
            circles.forEach(function (c2) { checked &= check(c1, c2); });
            if(checked) { circles.push(c1) ; --count; }
            
        }
        
    };
    
    var info = [[24, 32, 50], [12, 16, 50], [6, 8, 100], [2, 4, 200]];
    info.forEach(function (x) { generateCircle(x[0], x[1], x[2]); });

    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = '#000000';
    circles.forEach(function (c) { ctx.beginPath(); ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2, true); ctx.stroke(); });
    
};
generate();
