


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
            .filter(k => tenK[k].head !== "!")
            .map(k => k+'('+parser.stringify(tenK[k])+')')
            .join(' ')
    });
}};



tenK["beep"] = { head: "!", body: function() {

    term.beep();
}};



tenK['body'] = { head: "!", body: function() {

    var y = popYin();
    
    if (typeof y !== "string") yin = yin.concat(y.body);    
}};



tenK['clear-yin'] = { head: "!", body: function() {

    yin = [];
}};



tenK['clear-yang'] = { head: "!", body: function() {

    yang = [];
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

    pushYin({ head: popYin(), body: popYin() });
}};



tenK["define"] = { head: "!", body: function() {

    tenK[popYin()] = popYin();
}};



tenK['do'] = { head: "!", body: function() {

    yang = parser.parse(popYin()).concat(yang);
}};



tenK['edit'] = { head: "!", body: function() {

    document.getElementById("input").value = parser.stringify(popYin());
}};



tenK['editor'] = { head: "!", body: function() {

    pushYin(document.getElementById("input").value);
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



tenK['nothing'] = { head: "!", body: function() {

    pushYin('');
}};



tenK["print"] = { head: "!", body: function() {

    term.print(parser.stringify(popYin()));
}};



tenK['repeat'] = { head: "!", body: function() {

    var count = parseFloat(popYin());
    var clone = popYin();
    
    for (var c=0; c<count; c++) yang.unshift(clone);
}};



tenK['sentence'] = { head: "!", body: function() {

    pushYin(popYin() + ' ' + popYin());
}};



tenK['step-limit'] = { head: "!", body: function() {

    stepMax = parseInt(popYin());
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


