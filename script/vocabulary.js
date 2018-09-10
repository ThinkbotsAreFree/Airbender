


tenK['+'] = { head: "_", body: function() {

    pushYin( (parseFloat(popYin()) + parseFloat(popYin())).toString() );
}};



tenK['-'] = { head: "_", body: function() {

    pushYin( (parseFloat(popYin()) - parseFloat(popYin())).toString() );
}};



tenK['*'] = { head: "_", body: function() {

    pushYin( (parseFloat(popYin()) * parseFloat(popYin())).toString() );
}};



tenK['/'] = { head: "_", body: function() {

    pushYin( (parseFloat(popYin()) / parseFloat(popYin())).toString() );
}};



tenK['<'] = { head: "_", body: function() {

    pushYin( (parseFloat(popYin()) < parseFloat(popYin())) ? "true" : "false" );
}};



tenK['>'] = { head: "_", body: function() {

    pushYin( (parseFloat(popYin()) > parseFloat(popYin())) ? "true" : "false" );
}};



tenK['<='] = { head: "_", body: function() {

    pushYin( (parseFloat(popYin()) <= parseFloat(popYin())) ? "true" : "false" );
}};



tenK['>='] = { head: "_", body: function() {

    pushYin( (parseFloat(popYin()) >= parseFloat(popYin())) ? "true" : "false" );
}};



tenK['='] = { head: "_", body: function() {

    pushYin( (parseFloat(popYin()) == parseFloat(popYin())) ? "true" : "false" );
}};



tenK['<>'] = { head: "_", body: function() {

    pushYin( (parseFloat(popYin()) != parseFloat(popYin())) ? "true" : "false" );
}};



tenK['&'] = { head: "_", body: function() {

    var op1 = popYin();
    var op2 = popYin();
    op1 = ((op1 !== "false") && (op1 !== ''));
    op2 = ((op2 !== "false") && (op2 !== ''));
    pushYin( (op1 && op2) ? "true" : "false" );
}};



tenK['|'] = { head: "_", body: function() {

    var op1 = popYin();
    var op2 = popYin();
    op1 = ((op1 !== "false") && (op1 !== ''));
    op2 = ((op2 !== "false") && (op2 !== ''));
    pushYin( (op1 | op2) ? "true" : "false" );
}};



tenK['!'] = { head: "_", body: function() {

    var op1 = popYin();
    op1 = ((op1 !== "false") && (op1 !== ''));
    pushYin( !op1 ? "true" : "false" );
}};



tenK['..'] = { head: "_", body: function() {

    var e = popYin();

    pushYin(e);
    pushYin(e);
}};



tenK["all"] = { head: "_", body: function() {

    pushYin({
        head: "all",
        body: Object.keys(tenK)
            .map(k => k+'('+parser.stringify(tenK[k])+')')
            .join(' ')
    });
}};



tenK["beep"] = { head: "_", body: function() {

    term.beep();
}};



tenK["bend"] = { head: "_", body: function() {

    tenK[popYin()] = popYin();
}};



tenK["body"] = { head: "_", body: function() {

    var y = popYin();

    if (typeof y !== "string") yin = yin.concat(y.body);
}};



tenK["cls"] = { head: "_", body: function() {

    term.clear();
}};



tenK["confirm"] = { head: "_", body: function() {

    paused = true;
    term.confirm(
        parser.stringify(popYin()),
        resume
    );
}};



tenK["construct"] = { head: "_", body: function() {

    var head = popYin();
    var count = popYin();
    var body = [];

    for (let c=0; c<count; c++) body.unshift(popYin());
    
    pushYin({ head: head, body: body });
}};



tenK["depth"] = { head: "_", body: function() {

    var elem = popYin();
    var depth = 0;

    while (elem.head) { elem = elem.head; depth++; }

    pushYin(depth.toString());
}};



tenK["discard"] = { head: "_", body: function() {

    popYin();
}};



tenK["do"] = { head: "_", body: function() {

    var elem = popYin();
    if (elem.body)
        yang = elem.body.concat(yang);
}};



tenK["edit"] = { head: "_", body: function() {

    document.getElementById("input").value = parser.stringify(popYin());
}};



tenK["editor"] = { head: "_", body: function() {

    pushYin(document.getElementById("input").value);
}};



tenK["filter"] = { head: "_", body: function() {

    var func = popYin();
    var data = popYin();
    
    if (data.body && func.body) {
        
        for (d of data.body) {
            yang.unshift("if");
            yang = func.body.concat(yang);
            yang.unshift(d);
            yang.unshift({ head: '', body: [d, "insert-first"] });
        }
        
        yang = ['0', data.head, "construct"].concat(yang);
    }
}};



tenK["first-child"] = { head: "_", body: function() {

    var elem = popYin();
    
    if ((elem.body) && (elem.body.length > 0))
        pushYin(elem.body[0]);
}};



tenK["head"] = { head: "_", body: function() {

    var y = popYin();

    if (typeof y === "string") {

        if (y.length > 0) pushYin(y);

    } else {

        pushYin(y.head);

    }
}};



tenK["hole"] = { head: "_", body: function() {

    pushYin('');
}};



tenK["if"] = { head: "_", body: function() {

    var condition = popYin();
    var thenPart = popYin();

    if ((condition !== "false") && (condition !== ''))
        
        if (thenPart.body) yang = thenPart.body.concat(yang);
}};



tenK["ife"] = { head: "_", body: function() {

    var condition = popYin();
    var thenPart = popYin();
    var elsePart = popYin();

    if ((condition !== "false") && (condition !== '')) {
        if (thenPart.body) yang = thenPart.body.concat(yang);
    } else {
        if (elsePart.body) yang = elsePart.body.concat(yang);
    }
}};



tenK["input"] = { head: "_", body: function() {

    paused = true;
    term.input(
        parser.stringify(popYin()),
        resume
    );
}};



tenK["input-password"] = { head: "_", body: function() {

    paused = true;
    term.password(
        parser.stringify(popYin()),
        resume
    );
}};



tenK["insert-first"] = { head: "_", body: function() {

    var elem = popYin();
    var struct = yin[yin.length-1];
    
    if (struct.body)
        struct.body.unshift(elem);
}};



tenK["insert-last"] = { head: "_", body: function() {

    var elem = popYin();
    var struct = yin[yin.length-1];
    
    if (struct.body)
        struct.body.push(elem);
}};



tenK["insert-nth"] = { head: "_", body: function() {

    var elem = popYin();
    var n = parseInt(popYin());
    var struct = yin[yin.length-1];
    
    if (struct.body)
        struct.body.splice(n-1, 0, elem);
}};



tenK["interpret"] = { head: "_", body: function() {

    yang = parser.parse(popYin()).concat(yang);
}};



tenK["is"] = { head: "_", body: function() {

    var newYinYang = popYin();

    if (newYinYang.head === "yin") yin = newYinYang.body;

    else if (newYinYang.head === "yang") yang = newYinYang.body;
}};



tenK["last-child"] = { head: "_", body: function() {

    var elem = popYin();
    
    if ((elem.body) && (elem.body.length > 0))
        pushYin(elem.body[elem.body.length-1]);
}};



tenK["length"] = { head: "_", body: function() {

    var elem = popYin();

    pushYin( elem.body ? elem.body.length.toString() : elem.length.toString() );
}};



tenK["map"] = { head: "_", body: function() {

    var func = popYin();
    var data = popYin();
    
    yang = [data.body.length, data.head, "construct"].concat(yang);

    if (data.body && func.body) {
        
        for (d of data.body.reverse()) {
            yang = func.body.concat(yang);
            yang.unshift(d);
        }
    }
}};



tenK["fresh-yin"] = { head: "_", body: function() {

    nextEnv();
}};



tenK["nth-child"] = { head: "_", body: function() {

    var n = parseInt(popYin());
    var elem = popYin();
    
    if ((elem.body) && (elem.body.length >= n))
        pushYin(elem.body[n-1]);
}};



tenK["previous-yin"] = { head: "_", body: function() {

    if (env.length > 0) prevEnv();
}};



tenK["print"] = { head: "_", body: function() {

    term.print(parser.stringify(popYin()));
}};



tenK["quote"] = { head: "_", body: function() {

    var elem = popYin();

    if (typeof elem === "string")

        yin.push("'"+elem);

    else {

        var e = elem;

        while (typeof e.head !== "string") e = e.head;
        e.head = "'"+e.head;

        yin.push(elem);
    }
}};



tenK["range"] = { head: "_", body: function() {

    var start = parseFloat(popYin());
    var end = parseFloat(popYin());
    var step = parseFloat(popYin());

    for (var c=start; ((c>=end && step<0) || (c<=end && step>0)); c+=step)
        pushYin(c.toString());
}};



tenK["reduce"] = { head: "_", body: function() {

    var func = popYin();
    var data = popYin();
    
    yang = [1, data.head, "construct"].concat(yang);
    
    var first = data.body.shift();

    if (data.body && func.body) {
        
        for (d of data.body.reverse()) {
            yang = func.body.concat(yang);
            yang.unshift(d);
        }
    }
    yang.unshift(first);
}};



tenK["remove-first"] = { head: "_", body: function() {

    var struct = yin[yin.length-1];
    
    if (struct.body)
        struct.body.shift();
}};



tenK["remove-last"] = { head: "_", body: function() {

    var struct = yin[yin.length-1];
    
    if (struct.body)
        struct.body.pop();
}};



tenK["remove-nth"] = { head: "_", body: function() {

    var n = parseInt(popYin());
    var struct = yin[yin.length-1];
    
    if (struct.body)
        struct.body.splice(n-1, 1);
}};



tenK["repeat"] = { head: "_", body: function() {

    var count = parseFloat(popYin());
    var clone = popYin();

    for (var c=0; c<count; c++) yang.unshift(clone);
}};



tenK["sentence"] = { head: "_", body: function() {

    var count = popYin();
    var s = [];
    for (let c=0; c<count; c++) s.unshift(popYin());
    pushYin(s.join(' '));
}};



tenK['step-limit'] = { head: "_", body: function() {

    stepMax = parseInt(popYin());
}};



tenK["top"] = { head: "_", body: function() {

    var result = popYin();

    while (result.head) result = result.head;

    pushYin(result);
}};



tenK["unquote"] = { head: "_", body: function() {

    var elem = popYin();

    if (typeof elem === "string")

        yin.push( (elem[0] === "'") ? elem.substr(1) : elem );

    else {

        var e = elem;

        while (typeof e.head !== "string") e = e.head;
        if (e.head[0] === "'") e.head = e.head.substr(1);

        yin.push(elem);
    }
}};



tenK["unsentence"] = { head: "_", body: function() {

    var elem = popYin();

    if (typeof elem === "string")
        elem.split(' ').map(c => { pushYin(c); });
}};



tenK["unword"] = { head: "_", body: function() {

    var elem = popYin();

    if (typeof elem === "string")
        elem.split('').map(c => { pushYin(c); });
}};



tenK["word"] = { head: "_", body: function() {

    var count = popYin();
    var s = [];
    for (let c=0; c<count; c++) s.unshift(popYin());
    pushYin(s.join(''));
}};



tenK["yang"] = { head: "_", body: function() {

    pushYin({ head: "yang", body: JSON.parse(JSON.stringify(yang)) });
}};



tenK["yin"] = { head: "_", body: function() {

    pushYin({ head: "yin", body: JSON.parse(JSON.stringify(yin)) });
}};


