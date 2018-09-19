


var yin = [];       // data stack

var yang = [];      // program stack

var env = [];       // yin/yang stack of stacks

var tenK = {};      // vocabulary

var paused = false;

var stepCount = 1;

var stepMax = 999;

var tree;

var drone = false;

var todo = [];

var reactor = { button: ["editor", "interpret"] };

var userDefined = new Set();

var whirl = [];

var fullWidth = true;



document.getElementById("tree").style.display = "none";



tabIndent.config.tab = '    ';
tabIndent.renderAll();



var term = new Terminal("term");

setTermWidth();
term.setHeight("calc(50vh - 0.5em - 3px)");
term.setBackgroundColor("rgba(255, 255, 255, 0)");
term.setTextColor("#555");
term.blinkingCursor(false);

document.getElementById("terminal").appendChild(term.html);



function evaluate(input) {

    run(input);
    
    if (!paused) term.input("Ready", evaluate);
}



function run(program) {

    try {

        yang = parser.parse(program ? program : document.getElementById("input").value).concat(yang);

    } catch(e) {

        term.print("Syntax error: "+e.message);
        term.print("In: "+program);
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
            e.stack.split('\n').map(t => { term.print(t); });
            stepCount = 1;
            yang = [];
            document.getElementById("term").click();
            return;
        }

        console.log(stepCount++, yin);
    }

    if (!paused) stepCount = 1;

    checkTodo();        

    document.getElementById("term").click();
}



function resume(insert) {

    paused = false;

    yang = parser.parse(insert).concat(yang);
    
    evaluate(' ');
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

        return (typeof dict[code] === "undefined") ? code : dict[code];

    } else if (typeof code.head !== "undefined") {

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

    if (typeof now === "undefined") return;

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
    checkWhirl();
}



function checkWhirl() {
    
    var countPop = 0;
    
    for (let w of whirl) {
        
        if (yin.length < w.pattern.length) continue;
        
        let capture = {};
        let failed = false;
        let y = yin.length-1;
        for (p=w.pattern.length-1; ((p>=0) && (!failed)); p--) {
            
            var match = deepMatch(yin[y], w.pattern[p], capture);            
            failed = !match.success;
            if (failed) break;
            capture = Object.assign({}, capture, match.capture);
            y--;
        }
        if (!failed) {
            countPop = Math.max(countPop, w.pattern.length);
            for (let c in capture)
                bend(c, capture[c]);
            plan(w.template, "nothing");
        }
    }
    for (let c=0; c<countPop; c++) yin.pop();
}



function nextEnv() {
    
    env.push({ yin: yin });
    yin = [];
}



function prevEnv() {
    
    var e = env.pop();
    yin = e.yin;
}



function treeify(source) {

    if (typeof source === "string") return { name: source, children: [] };

    if (!source.body.map) return { name: '', children: [] };

    return {
        name: parser.stringify(source.head),
        children: ((typeof source.body !== "undefined") ? source.body.map(item => treeify(item)) : [])
    };
}



function getRandomColor() {
    
  return '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16);
}



function checkTodo() {

    if ((yang.length === 0) && (todo.length > 0) && !paused) {
        let doNow = todo.shift();
        if (doNow.yin !== "nothing") yin.push(doNow.yin);
        run(parser.stringify(doNow.yang));
    }
}



function plan(yang, yin) {
    
    todo.push({ yang: yang, yin: yin });
    checkTodo();
}



function emitEvent(eventName, eventData) {
    
    if (reactor[eventName])
        plan(reactor[eventName], eventData);
}



function deepEqual(o1, o2) {
    
    if (typeof o1.head !== "undefined") {
        
        if (typeof o2.head === "undefined") {
            
            return false;
            
        } else {
            
            if (o1.body.length !== o2.body.length) return false;
            
            if (!deepEqual(o1.head, o2.head)) return false;
            
            var bodyOk = true;
            
            for (var b=0; bodyOk && (b < o1.body.length); b++) {
                
                bodyOk = deepEqual(o1.body[b], o2.body[b]);
            }
            return bodyOk;
        }
    }
    
    if (typeof o2.head !== "undefined") return false;
    
    return o1 == o2;
}



function quote(elem) {

    if (typeof elem === "string") return "'"+elem;

    var e = elem;

    while (typeof e.head !== "string") e = e.head;

    e.head = "'"+e.head;

    return elem;
}



function windowResized() {

    setTermWidth();
}



function setTermWidth() {
    
    if (fullWidth
        || (Math.max(document.documentElement.clientWidth, window.innerWidth || 0) < 1024)) {
        
        term.setWidth("100%");
        
    } else {
        
        term.setWidth("67%");
    }
}



function deepMatch(o, pattern, capture) {

    if (o === pattern) return { success: true, capture: {} };

    if (typeof pattern === "string") {
        if ((pattern[0] === '#') && (pattern[1] !== '#')) {
            return {
                success: true,
                capture: Object.assign({}, capture, { [pattern.substr(1)]: o })
            };
        } else {
            return {
                success: false,
                capture: {}
            };
        }
    }

    var headMatch = deepMatch(o.head, pattern.head, capture);

    if (!headMatch.success) return { success: false, capture: {} };

    if ((pattern.body.length == 1)
        && (typeof pattern.body[0] === "string")
        && (pattern.body[0].substr(0,2) === "##")) { // whole body catcher

        return {
            success: true,
            capture: Object.assign(
                {},
                capture,
                headMatch.capture,
                { [pattern.body[0].substr(2)]:
                    (o.body.length === 1 ? o.body[0] : { head: '', body: o.body })
                }
            )
        };

    } else { // step-by-step body catcher
        
        if (pattern.body.length !== o.body.length)
            return { success: false, capture: {} };

        var bodyCapture = {};
        var bodyMatch = { success: true, capture: {} };

        for (let i=0; (bodyMatch.success && (i<o.body.length)); i++) {

            bodyMatch = deepMatch(o.body[i], pattern.body[i], bodyCapture);
            bodyCapture = Object.assign({}, bodyCapture, bodyMatch.capture);
        }
        return {
            success: bodyMatch.success,
            capture: Object.assign({}, headMatch.capture, bodyMatch.capture)
        };
    }
}


function bend(name, value) {

    tenK[name] = value;

    userDefined.add(name);
}



function etherpadReady() {

    document.getElementById("input").className += " adaptable";
    document.getElementById("splitter").className += " adaptable";
    document.getElementById("tree").className += " adaptable";
    document.getElementById("logo").className += " adaptable";
    document.getElementById("etherpad").className += " adaptable";
    
    fullWidth = false;
    setTermWidth();
}













