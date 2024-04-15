const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

var nodes = [];

// Credits to
// https://dev.to/nyxtom/drawing-interactive-graphs-with-canvas-and-javascript-o1j



function click(e) {
    let node = {
        x: e.x,
        y: e.y,
        radius: 10,
        fillStyle: '#22cccc',
        strokeStyle: '#009999'
        // selected: false;
    };
    nodes.push(node);
    draw();
}

// window.onclick = click;


var selection = undefined;

function within(x, y) {
    return nodes.find(n => {
        return x > (n.x - n.radius) && 
            y > (n.y - n.radius) &&
            x < (n.x + n.radius) &&
            y < (n.y + n.radius);
    });
}

function move(e) {
    if (selection && e.buttons) {
        selection.x = e.x;
        selection.y = e.y;
        draw();
    }
}

function down(e) {
    let target = within(e.x, e.y);
    if (selection && selection.selected) {
        selection.selected = false;
    }
    if (target) {
        if (selection && selection !== target) {
            if(!edgeExists(JSON.stringify(selection),JSON.stringify(target))){
                edges.push({ from: selection, to: target });
            }
        }
        selection = target;
        selection.selected = true;
        draw();
    }
}


function edgeExists(S,T) { // S, T string representation of node
    for(let i = 0; i < edges.length; i++) {
        Sprime = JSON.stringify(edges[i].from);
        Tprime = JSON.stringify(edges[i].to);
        if ((S == Sprime && T == Tprime) || (T == Sprime && S == Tprime)) {
            return true;
        }
    }
    return false;
}

function up(e) {
    if (!selection) {
        let node = {
            x: e.x,
            y: e.y,
            radius: 10,
            fillStyle: '#22cccc',
            strokeStyle: '#009999',
            selectedFill: '#88aaaa',
            selected: false
        };
        nodes.push(node);
        draw();
    }
    if (selection && !selection.selected) {
        selection = undefined;
    }
    draw();
}

window.onmousemove = move;
window.onmousedown = down;
window.onmouseup = up;

var edges = [];

function draw() {
    context.clearRect(0, 0, window.innerWidth, window.innerHeight);

    for (let i = 0; i < edges.length; i++) {
        let fromNode = edges[i].from;
        let toNode = edges[i].to;
        context.beginPath();
        context.strokeStyle = fromNode.strokeStyle;
        context.moveTo(fromNode.x, fromNode.y);
        context.lineTo(toNode.x, toNode.y);
        context.stroke();
    }

    for (let i = 0; i < nodes.length; i++) {
        let node = nodes[i];
        context.beginPath();
        context.fillStyle = node.selected ? node.selectedFill : node.fillStyle;
        context.arc(node.x, node.y, node.radius, 0, Math.PI * 2, true);
        context.strokeStyle = node.strokeStyle;
        context.fill();
        context.stroke();
    }
}




function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    draw();
}

window.onresize = resize;
resize();






















