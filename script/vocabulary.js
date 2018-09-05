


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

    yang = parser.parse(popYin()).concat(yang);
}};



tenK["edit"] = { head: "_", body: function() {

    document.getElementById("input").value = parser.stringify(popYin());
}};



tenK["editor"] = { head: "_", body: function() {

    pushYin(document.getElementById("input").value);
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

    if ((condition !== "false") && (condition !== '')) yang.unshift(thenPart);
}};



tenK["ife"] = { head: "_", body: function() {

    var condition = popYin();
    var thenPart = popYin();
    var elsePart = popYin();

    if ((condition !== "false") && (condition !== ''))
        yang.unshift(thenPart);
    else
        yang.unshift(elsePart);
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



tenK["is"] = { head: "_", body: function() {

    var newYinYang = popYin();

    if (newYinYang.head === "yin") yin = newYinYang.body;

    else if (newYinYang.head === "yang") yang = newYinYang.body;
}};



tenK["length"] = { head: "_", body: function() {

    var elem = popYin();

    pushYin( elem.body ? elem.body.length.toString() : '-1' );
}};



tenK["pop"] = { head: "_", body: function() {

    var structure = popYin();

    var elem = structure.body.pop(elem);

    pushYin(structure);
    pushYin(elem);
}};



tenK["print"] = { head: "_", body: function() {

    term.print(parser.stringify(popYin()));
}};



tenK["push"] = { head: "_", body: function() {

    var elem = popYin();
    var structure = popYin();

    structure.body.push(elem);

    pushYin(structure);
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



tenK["repeat"] = { head: "_", body: function() {

    var count = parseFloat(popYin());
    var clone = popYin();

    for (var c=0; c<count; c++) yang.unshift(clone);
}};



tenK["sentence"] = { head: "_", body: function() {

    pushYin(popYin() + ' ' + popYin());
}};



tenK["shift"] = { head: "_", body: function() {

    var structure = popYin();

    var elem = structure.body.shift(elem);

    pushYin(structure);
    pushYin(elem);
}};



tenK['step-limit'] = { head: "_", body: function() {

    stepMax = parseInt(popYin());
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



tenK["unshift"] = { head: "_", body: function() {

    var elem = popYin();
    var structure = popYin();

    structure.body.unshift(elem);

    pushYin(structure);
}};



tenK["word"] = { head: "_", body: function() {

    pushYin(popYin() + popYin());
}};



tenK["top"] = { head: "_", body: function() {

    var result = popYin();

    while (result.head) result = result.head;

    pushYin(result);
}};



tenK["yang"] = { head: "_", body: function() {

    pushYin({ head: "yang", body: JSON.parse(JSON.stringify(yang)) });
}};



tenK["yin"] = { head: "_", body: function() {

    pushYin({ head: "yin", body: JSON.parse(JSON.stringify(yin)) });
}};


