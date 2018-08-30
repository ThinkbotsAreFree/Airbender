


tenK["print"] = { head: "javascript", body: function() {

    term.print(parser.stringify(popYin()));
}};



tenK["define"] = { head: "javascript", body: function() {

    tenK[popYin()] = popYin();
}};



tenK['+'] = { head: "javascript", body: function() {

    yin.push( (parseFloat(popYin()) + parseFloat(popYin())).toString() );
}};



tenK['-'] = { head: "javascript", body: function() {

    yin.push( (parseFloat(popYin()) - parseFloat(popYin())).toString() );
}};



tenK['*'] = { head: "javascript", body: function() {

    yin.push( (parseFloat(popYin()) * parseFloat(popYin())).toString() );
}};



tenK['/'] = { head: "javascript", body: function() {

    yin.push( (parseFloat(popYin()) / parseFloat(popYin())).toString() );
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



tenK['nothing'] = { head: "javascript", body: function() {

    pushYin('');
}};



tenK["tophead"] = { head: "javascript", body: function() {

    var result = item;

    while (result.head) result = result.head;

    return result;
}};


