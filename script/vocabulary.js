


tenK['+'] = { head: "javascript", body: function() {

    pushYin( (parseFloat(popYin()) + parseFloat(popYin())).toString() );
}};



tenK['-'] = { head: "javascript", body: function() {

    pushYin( (parseFloat(popYin()) - parseFloat(popYin())).toString() );
}};



tenK['*'] = { head: "javascript", body: function() {

    pushYin( (parseFloat(popYin()) * parseFloat(popYin())).toString() );
}};



tenK['/'] = { head: "javascript", body: function() {

    pushYin( (parseFloat(popYin()) / parseFloat(popYin())).toString() );
}};



tenK['<'] = { head: "javascript", body: function() {

    pushYin( (parseFloat(popYin()) < parseFloat(popYin())) ? "true" : "false" );
}};



tenK['>'] = { head: "javascript", body: function() {

    pushYin( (parseFloat(popYin()) > parseFloat(popYin())) ? "true" : "false" );
}};



tenK['<='] = { head: "javascript", body: function() {

    pushYin( (parseFloat(popYin()) <= parseFloat(popYin())) ? "true" : "false" );
}};



tenK['>='] = { head: "javascript", body: function() {

    pushYin( (parseFloat(popYin()) >= parseFloat(popYin())) ? "true" : "false" );
}};



tenK['='] = { head: "javascript", body: function() {

    pushYin( (parseFloat(popYin()) == parseFloat(popYin())) ? "true" : "false" );
}};



tenK['<>'] = { head: "javascript", body: function() {

    pushYin( (parseFloat(popYin()) != parseFloat(popYin())) ? "true" : "false" );
}};



tenK["all"] = { head: "javascript", body: function() {

    pushYin({
        head: "all",
        body: Object.keys(tenK)
            .filter(k => tenK[k].head !== "javascript")
            .map(k => k+'('+parser.stringify(tenK[k])+')')
            .join(' ')
    });
}};



tenK["beep"] = { head: "javascript", body: function() {

    term.beep();
}};



tenK['body'] = { head: "javascript", body: function() {

    var y = popYin();
    
    if (typeof y !== "string") yin = yin.concat(y.body);    
}};



tenK['clear-yin'] = { head: "javascript", body: function() {

    yin = [];
}};



tenK['clear-yang'] = { head: "javascript", body: function() {

    yang = [];
}};



tenK["cls"] = { head: "javascript", body: function() {

    term.clear();
}};



tenK["confirm"] = { head: "javascript", body: function() {

    paused = true;
    term.confirm(
        parser.stringify(popYin()),
        resume
    );
}};



tenK['cons'] = { head: "javascript", body: function() {

    pushYin({ head: popYin(), body: popYin() });
}};



tenK["define"] = { head: "javascript", body: function() {

    tenK[popYin()] = popYin();
}};



tenK['do'] = { head: "javascript", body: function() {

    yang = parser.parse(popYin()).concat(yang);
}};



tenK['edit'] = { head: "javascript", body: function() {

    document.getElementById("input").value = parser.stringify(popYin());
}};



tenK['editor'] = { head: "javascript", body: function() {

    pushYin(document.getElementById("input").value);
}};



tenK['head'] = { head: "javascript", body: function() {

    var y = popYin();
    
    if (typeof y === "string") {
        
        if (y.length > 0) pushYin(y);
        
    } else {
        
        pushYin(y.head);
        
    }        
}};



tenK['if'] = { head: "javascript", body: function() {

    var condition = popYin();
    var thenPart = popYin();
    
    if ((condition !== "false") && (condition !== '')) yang.unshift(thenPart);
}};



tenK['ife'] = { head: "javascript", body: function() {

    var condition = popYin();
    var thenPart = popYin();
    var elsePart = popYin();
    
    if ((condition !== "false") && (condition !== ''))
        yang.unshift(thenPart);
    else
        yang.unshift(elsePart);
}};



tenK["input"] = { head: "javascript", body: function() {

    paused = true;
    term.input(
        parser.stringify(popYin()),
        resume
    );
}};



tenK["input-password"] = { head: "javascript", body: function() {

    paused = true;
    term.password(
        parser.stringify(popYin()),
        resume
    );
}};



tenK['nothing'] = { head: "javascript", body: function() {

    pushYin('');
}};



tenK["print"] = { head: "javascript", body: function() {

    term.print(parser.stringify(popYin()));
}};



tenK['repeat'] = { head: "javascript", body: function() {

    var count = parseFloat(popYin());
    var clone = popYin();
    
    for (var c=0; c<count; c++) yang.unshift(clone);
}};



tenK['sentence'] = { head: "javascript", body: function() {

    pushYin(popYin() + ' ' + popYin());
}};



tenK['step-limit'] = { head: "javascript", body: function() {

    stepMax = parseInt(popYin());
}};



tenK['word'] = { head: "javascript", body: function() {

    pushYin(popYin() + popYin());
}};



tenK["top"] = { head: "javascript", body: function() {

    var result = popYin();

    while (result.head) result = result.head;

    pushYin(result);
}};



tenK['yang'] = { head: "javascript", body: function() {

    pushYin({ head: "yang", body: JSON.parse(JSON.stringify(yang)) });
}};



tenK['yin'] = { head: "javascript", body: function() {

    pushYin({ head: "yin", body: JSON.parse(JSON.stringify(yin)) });
}};


