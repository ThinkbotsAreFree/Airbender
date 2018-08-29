


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



tenK["tophead"] = { head: "javascript", body: function() {

    var result = item;

    while (result.head) result = result.head;

    return result;
}};


