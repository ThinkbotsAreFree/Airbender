


var yin = [];       // data stack

var yang = [];      // program stack

var tenK = {};      // vocabulary

var paused = false;

var stepCount = 1;

var stepMax = 999;



tabIndent.config.tab = '    ';
tabIndent.renderAll();



var term = new Terminal("term");

term.setWidth("100%");
term.setHeight("50vh");
term.setBackgroundColor("#ddd");
term.setTextColor("#555");
term.blinkingCursor(false);

document.getElementById("terminal").appendChild(term.html);



function run(program) {

    try {

        yang = parser.parse(program ? program : document.getElementById("input").value);

    } catch(e) {

        term.print("Syntax error: "+e.message);
        if (!program) term.print("Ready");
        document.getElementById("term").click();
        return;
    }

    while ((yang.length > 0) && (!paused)) {

        try {

            if (stepCount > stepMax)
                throw { message: "step limit "+stepMax+" reached" };

            step();

        } catch(e) {

            term.print("Javascript error: "+e.message);
            stepCount = 1;
            yang = [];
            document.getElementById("term").click();
            return;
        }

        console.log(stepCount++, yin);
    }

    if (!paused) stepCount = 1;

    document.getElementById("term").click();
}



function resume(insert) {

    paused = false;

    evaluate(insert + ' ' + parser.stringify(yang));
}



function step() {

    var now = yang.shift();

    if ((typeof now === "string") && (tenK[now])) {

        pushYin(tenK[now]);

    } else {

        pushYin(now);

    }
}



function interpret(args, body) {

    var dictionary = {};

    for (var a of args)
        if (typeof a === "string")
            dictionary[a] = popYin();

    yang = rewrite(body, dictionary).concat(yang);
}



function rewrite(code, dict) {

    if (typeof code === "string") {

        return dict[code] || code;

    } else if (code.head) {

        return {

            head: rewrite(code.head, dict),
            body: code.body.map(element => rewrite(element, dict))
        };

    } else {

        return code.map(element => rewrite(element, dict));

    }
}



function popYin() {

    var y = yin.pop();

    if (typeof y === "undefined") return '';

    return (y.head === "'") ? parser.stringify(y.body) : y;
}



function pushYin(now) {

    if (now.head === "_") {

        if (typeof now.body === "function") now.body();

        else eval(parser.stringify(now.body));

    } else if (now.head === '"') {

        yin.push(parser.stringify(now.body));

    } else if ((now.head) && (now.head.head === "$")) {

        interpret(now.head.body, now.body);

    } else {

        if (now.head) {
            let h = now;
            while (typeof h.head !== "string") h = h.head;
            if (h.head[0] === "'") h.head = h.head.substr(1);
        }

        yin.push(
            ((typeof now === "string") && (now[0] === "'")) ?
            now.substr(1) : now
        );
    }
}



function evaluate(input) {

    run(input);

    if (!paused) term.input("Ready", evaluate);
}




