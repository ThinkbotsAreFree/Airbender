


var yin = [];       // data stack

var yang = [];      // program stack

var tenK = {};      // vocabulary



tabIndent.config.tab = '    ';
tabIndent.renderAll();



var term = new Terminal("term");

term.setWidth("100%");
term.setHeight("50vh");
term.setBackgroundColor("#ddd");
term.setTextColor("#555");
term.blinkingCursor(false);

document.getElementById("terminal").appendChild(term.html);

term.print("Airbender");



function run(program) {

    try {
        
    yang = parser.parse(program ? program : document.getElementById("input").value);
    
    } catch(e) {
    
        term.print(e.message);
        if (!program) term.print("Ready");
        document.getElementById("term").click();
        return;
    }
    
    var stepCount = 1;

    while (yang.length > 0) {
        
        step();
        console.log(stepCount++, JSON.stringify(yin, null, 4));
    }
    
    document.getElementById("term").click();
}



function step() {

    var now = yang.shift();

    if ((typeof now === "string") && (tenK[now])) {
    
        if (tenK[now].head === "javascript")
            
            parser.stringify(tenK[now].body)();
            
        else if (tenK[now].head === "source")
            
            yang = tenK[now].body.concat(yang);
            
        else if ((tenK[now].head) && (tenK[now].head.head === "lambda"))
            
            interpret(tenK[now].head.body, tenK[now].body);

        else pushYin(tenK[now]);

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



function popYin() { return yin.pop() || ''; }


function pushYin(what) {

    yin.push(
        ((typeof what === "string") && (what[0] === "'")) ?
        what.substr(1) : what
    );
}



function evaluate(input) {
   
    run(input);
    
    term.input("Ready", evaluate);
}




