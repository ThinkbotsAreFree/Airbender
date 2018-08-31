


tenK["print"] = { head: "javascript", body: function() {

    term.print(parser.stringify(popYin()));
}};



tenK["define"] = { head: "javascript", body: function() {

    tenK[popYin()] = popYin();
}};



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



tenK['head'] = { head: "javascript", body: function() {

    var y = popYin();
    
    if (typeof y === "string") {
        
        if (y.length > 0) pushYin(y);
        
    } else {
        
        pushYin(y.head);
        
    }        
}};



tenK['body'] = { head: "javascript", body: function() {

    var y = popYin();
    
    if (typeof y !== "string") yin = yin.concat(y.body);    
}};



tenK['cons'] = { head: "javascript", body: function() {

    pushYin({ head: popYin(), body: popYin() });
}};



tenK['word'] = { head: "javascript", body: function() {

    pushYin(popYin() + popYin());
}};



tenK['sentence'] = { head: "javascript", body: function() {

    pushYin(popYin() + ' ' + popYin());
}};



tenK['do'] = { head: "javascript", body: function() {

    yang = parser.parse(popYin()).concat(yang);
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



tenK['nothing'] = { head: "javascript", body: function() {

    pushYin('');
}};



tenK['clean-yin'] = { head: "javascript", body: function() {

    yin = [];
}};



tenK['clean-yang'] = { head: "javascript", body: function() {

    yang = [];
}};



tenK['yin'] = { head: "javascript", body: function() {

    pushYin({ head: "yin", body: JSON.parse(JSON.stringify(yin)) });
}};



tenK['yang'] = { head: "javascript", body: function() {

    pushYin({ head: "yang", body: JSON.parse(JSON.stringify(yang)) });
}};



tenK['repeat'] = { head: "javascript", body: function() {

    var count = parseFloat(popYin());
    var clone = popYin();
    
    for (var c=0; c<count; c++) yang.unshift(clone);
}};



tenK["tophead"] = { head: "javascript", body: function() {

    var result = item;

    while (result.head) result = result.head;

    return result;
}};


