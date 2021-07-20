var generateGraphString = function () {
    var input = $('#vertex').val();
    var pairs = input.split('\n');
    var type = $('#graph-type').val();
    var graphString;
    var direction;
    var nodeStyle = '[fillcolor="#a1a1a1"]; '
    var style = 'node [shape=circle, style="filled"]'
    if (type == 'directed') {
        graphString = 'digraph{';
        direction = '->';
    } else {
        graphString = 'graph{';
        direction = '--';
    }
    for (let i = 0; i < pairs.length; i++) {
        var pair = pairs[i].trim();
        if (pair.length < 1) {
            continue;
        }
        if (pair.split(/\s+/).length < 2) {
            return undefined;
        }
        var from = pair.split(/\s+/)[0];
        var to = pair.split(/\s+/)[1];
        var weight = pair.split(/\s+/).length > 2 ? pair.split(/\s+/)[2] : ' ';
        var edge = from + ' ' + direction + ' ' + to + (weight == '' ? '' : '[label=\"' + weight + '\"]');
        graphString += style + from + nodeStyle + to + nodeStyle + edge + ';';
    }
    graphString += '}';
    return graphString;
}

var render = function (graphString) {
    d3.select('#graph').graphviz()
        .width($('#graph').width())
        .height($('#graph').height())
        .transition(function () {
            return d3.transition('main')
                .ease(d3.easeLinear)
                .delay(100)
                .duration(300);
        })
        .renderDot(graphString);
}

var draw = function () {
    var graphString = generateGraphString();
    if (graphString !== undefined) {
        render(graphString);
        $('#graph-string').val(graphString);
    }
}

var drawString = function () {
    var graphString = $('#graph-string').val();
    render(graphString);
}

$(document).ready(function () {
    $('#vertex').val('');
    $('#graph-string').val('');
    $('#draw').click(draw);
    $('#draw-string').click(drawString);
});
