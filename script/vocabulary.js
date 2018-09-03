


tenK['+'] = { head: "!", body: function() {

    pushYin( (parseFloat(popYin()) + parseFloat(popYin())).toString() );
}};



tenK['-'] = { head: "!", body: function() {

    pushYin( (parseFloat(popYin()) - parseFloat(popYin())).toString() );
}};



tenK['*'] = { head: "!", body: function() {

    pushYin( (parseFloat(popYin()) * parseFloat(popYin())).toString() );
}};



tenK['/'] = { head: "!", body: function() {

    pushYin( (parseFloat(popYin()) / parseFloat(popYin())).toString() );
}};



tenK['<'] = { head: "!", body: function() {

    pushYin( (parseFloat(popYin()) < parseFloat(popYin())) ? "true" : "false" );
}};



tenK['>'] = { head: "!", body: function() {

    pushYin( (parseFloat(popYin()) > parseFloat(popYin())) ? "true" : "false" );
}};



tenK['<='] = { head: "!", body: function() {

    pushYin( (parseFloat(popYin()) <= parseFloat(popYin())) ? "true" : "false" );
}};



tenK['>='] = { head: "!", body: function() {

    pushYin( (parseFloat(popYin()) >= parseFloat(popYin())) ? "true" : "false" );
}};



tenK['='] = { head: "!", body: function() {

    pushYin( (parseFloat(popYin()) == parseFloat(popYin())) ? "true" : "false" );
}};



tenK['<>'] = { head: "!", body: function() {

    pushYin( (parseFloat(popYin()) != parseFloat(popYin())) ? "true" : "false" );
}};



tenK["all"] = { head: "!", body: function() {

    pushYin({
        head: "all",
        body: Object.keys(tenK)
            // .filter(k => tenK[k].head !== "!")
            .map(k => k+'('+parser.stringify(tenK[k])+')')
            .join(' ')
    });
}};



tenK["beep"] = { head: "!", body: function() {

    term.beep();
}};



tenK["bend"] = { head: "!", body: function() {

    tenK[popYin()] = popYin();
}};



tenK['body'] = { head: "!", body: function() {

    var y = popYin();
    
    if (typeof y !== "string") yin = yin.concat(y.body);    
}};



tenK["cls"] = { head: "!", body: function() {

    term.clear();
}};



tenK["confirm"] = { head: "!", body: function() {

    paused = true;
    term.confirm(
        parser.stringify(popYin()),
        resume
    );
}};



tenK['cons'] = { head: "!", body: function() {
    
    var head = popYin();
    var body = popYin();

    pushYin({ head: head, body: (typeof body === "string") ? [body] : body });
}};



tenK["depth"] = { head: "!", body: function() {

    var elem = popYin();
    var depth = 0;
    
    while (elem.head) { elem = elem.head; depth++; }
    
    pushYin(depth.toString());
}};



tenK['do'] = { head: "!", body: function() {

    yang = parser.parse(popYin()).concat(yang);
}};



tenK['edit'] = { head: "!", body: function() {

    document.getelemById("input").value = parser.stringify(popYin());
}};



tenK['editor'] = { head: "!", body: function() {

    pushYin(document.getelemById("input").value);
}};



tenK['head'] = { head: "!", body: function() {

    var y = popYin();
    
    if (typeof y === "string") {
        
        if (y.length > 0) pushYin(y);
        
    } else {
        
        pushYin(y.head);
        
    }        
}};



tenK['if'] = { head: "!", body: function() {

    var condition = popYin();
    var thenPart = popYin();
    
    if ((condition !== "false") && (condition !== '')) yang.unshift(thenPart);
}};



tenK['ife'] = { head: "!", body: function() {

    var condition = popYin();
    var thenPart = popYin();
    var elsePart = popYin();
    
    if ((condition !== "false") && (condition !== ''))
        yang.unshift(thenPart);
    else
        yang.unshift(elsePart);
}};



tenK["input"] = { head: "!", body: function() {

    paused = true;
    term.input(
        parser.stringify(popYin()),
        resume
    );
}};



tenK["input-password"] = { head: "!", body: function() {

    paused = true;
    term.password(
        parser.stringify(popYin()),
        resume
    );
}};



tenK["is"] = { head: "!", body: function() {

    var newYinYang = popYin();
    
    if (newYinYang.head === "yin") yin = newYinYang.body;
    
    else if (newYinYang.head === "yang") yang = newYinYang.body;    
}};



tenK["length"] = { head: "!", body: function() {

    var elem = popYin();
    
    pushYin( elem.body ? elem.body.length.toString() : '-1' );
}};



tenK['nothing'] = { head: "!", body: function() {

    pushYin('');
}};



tenK["pop"] = { head: "!", body: function() {

    var structure = popYin();
    
    var elem = structure.body.pop(elem);
    
    pushYin(structure);
    pushYin(elem);
}};



tenK["print"] = { head: "!", body: function() {

    term.print(parser.stringify(popYin()));
}};



tenK["push"] = { head: "!", body: function() {

    var elem = popYin();
    var structure = popYin();
    
    structure.body.push(elem);
    
    pushYin(structure);
}};



tenK["quote"] = { head: "!", body: function() {

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



tenK['repeat'] = { head: "!", body: function() {

    var count = parseFloat(popYin());
    var clone = popYin();
    
    for (var c=0; c<count; c++) yang.unshift(clone);
}};



tenK['sentence'] = { head: "!", body: function() {

    pushYin(popYin() + ' ' + popYin());
}};



tenK["shift"] = { head: "!", body: function() {

    var structure = popYin();
    
    var elem = structure.body.shift(elem);
    
    pushYin(structure);
    pushYin(elem);
}};



tenK['step-limit'] = { head: "!", body: function() {

    stepMax = parseInt(popYin());
}};



tenK["unquote"] = { head: "!", body: function() {

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



tenK["unshift"] = { head: "!", body: function() {

    var elem = popYin();
    var structure = popYin();
    
    structure.body.unshift(elem);
    
    pushYin(structure);
}};



tenK['word'] = { head: "!", body: function() {

    pushYin(popYin() + popYin());
}};



tenK["top"] = { head: "!", body: function() {

    var result = popYin();

    while (result.head) result = result.head;

    pushYin(result);
}};



tenK['yang'] = { head: "!", body: function() {

    pushYin({ head: "yang", body: JSON.parse(JSON.stringify(yang)) });
}};



tenK['yin'] = { head: "!", body: function() {

    pushYin({ head: "yin", body: JSON.parse(JSON.stringify(yin)) });
}};


