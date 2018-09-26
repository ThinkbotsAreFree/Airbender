


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
    
    pushYin( deepEqual(popYin(), popYin()) ? "true" : "false" );
}};



tenK['<>'] = { head: "_", body: function() {
    
    pushYin( deepEqual(popYin(), popYin()) ? "false" : "true" );
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



tenK[':'] = { head: "_", body: function() {

    var e = popYin();

    pushYin(e);
    pushYin(e);
}};



tenK["append"] = { head: "_", body: function() {

    var elem = popYin();
    var struct = yin[yin.length-1];
    
    if ((typeof struct !== "undefined") && (struct.body))
        struct.body.push(elem);
}};



tenK["apply"] = { head: "_", body: function() {

    var func = popYin();
    var data = popYin();
    
    if (data.body && func.body) {
        
        for (d of data.body.reverse()) {
            yang = func.body.concat(yang);
            yang.unshift(quote(d));
        }
    }
    
}};



tenK["beep"] = { head: "_", body: function() {

    term.beep();
}};



tenK["bend"] = { head: "_", body: function() {

    bend(popYin(), popYin());
}};



tenK["body"] = { head: "_", body: function() {

    var y = popYin();

    if (typeof y !== "string") yin = yin.concat(y.body);
}};



tenK["built-in"] = { head: "_", body: function() {

    pushYin({
        head: "built-in",
        body: Object.keys(tenK)
            .filter(k => !userDefined.has(k))
            .map(k => { return { head: k, body:[tenK[k]] }; })
    });
}};



tenK["butfirst"] = { head: "_", body: function() {

    var struct = yin[yin.length-1];
    
    if ((typeof struct !== "undefined") && (struct.body))
        struct.body.shift();
}};



tenK["butlast"] = { head: "_", body: function() {

    var struct = yin[yin.length-1];
    
    if ((typeof struct !== "undefined") && (struct.body))
        struct.body.pop();
}};



tenK["butnth"] = { head: "_", body: function() {

    var n = parseInt(popYin());
    var struct = yin[yin.length-1];
    
    if ((typeof struct !== "undefined") && (struct.body))
        struct.body.splice(n-1, 1);
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



tenK["do-in"] = { head: "_", body: function() {

    var elem = popYin();
    
    if (elem.body) {
        var result = { head: elem.head };
        var prevYang = yang;
        yang = [];
        nextEnv();
        run(parser.stringify(elem.body));
        result.body = yin;
        prevEnv();
        yang = prevYang;
        pushYin(result);
    }
}};



tenK["edit"] = { head: "_", body: function() {

    document.getElementById("input").value = parser.stringify(popYin());
    document.getElementById("tree").style.display = "none";
}};



tenK["emit"] = { head: "_", body: function() {

    var eventName = parser.stringify(popYin());
    var eventData = popYin().body;
    
    emitEvent(eventName, eventData);
}};



tenK["emit-after"] = { head: "_", body: function() {

    var delay = parseInt(popYin());
    var eventName = parser.stringify(popYin());
    var eventData = popYin().body;
    
    setTimeout(emitEvent, delay, eventName, eventData);
}};



tenK["editor"] = { head: "_", body: function() {

    pushYin(document.getElementById("input").value);
}};



tenK["file"] = { head: "_", body: function() {

    var filename = parser.stringify(popYin());
    var content = parser.stringify(popYin());
    
    download(content, filename, "text/plain");
}};



tenK["filter"] = { head: "_", body: function() {

    var func = popYin();
    var data = popYin();
    
    if (data.body && func.body) {
        
        for (d of data.body) {
            yang.unshift("if");
            yang = func.body.concat(yang);
            yang.unshift(quote(d));
            yang.unshift({ head: '', body: [d, "prepend"] });
        }
        
        yang = ['0', data.head, "construct"].concat(yang);
    }
}};



tenK["first"] = { head: "_", body: function() {

    var elem = popYin();
    
    if ((elem.body) && (elem.body.length > 0))
        pushYin(quote(elem.body[0]));
}};



tenK["first-match"] = { head: "_", body: function() {

    var pattern = popYin();
    var space = popYin();
    
    if ((space.body) && (space.body.length > 0)) {
        var b;
        var capture = {};
        var match;
        for (b=0; b<space.body.length; b++) {
            match = deepMatch(space.body[b], pattern, capture);
            if (match.success) {
                pushYin(space.body[b]);
                break;
            }
        }
    }
}};



tenK["fresh-yin"] = { head: "_", body: function() {

    nextEnv();
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



tenK["input-hidden"] = { head: "_", body: function() {

    paused = true;
    term.password(
        parser.stringify(popYin()),
        resume
    );
}};



tenK["insert"] = { head: "_", body: function() {

    var elem = popYin();
    var n = parseInt(popYin());
    var struct = yin[yin.length-1];
    
    if (struct.body)
        struct.body.splice(n-1, 0, elem);
}};



tenK["interpret"] = { head: "_", body: function() {

    yang = parser.parse(popYin()).concat(yang);
}};



tenK["intersection"] = { head: "_", body: function() {

    var data1 = popYin();
    var data2 = popYin();
    
    if ((typeof data1.head !== "undefined") && (typeof data2.head !== "undefined")) {
        
        data1.body = data1.body.filter(elem => {
            var found = false;
            for (let b=0; ((!found) && (b<data2.body.length)); b++)
                found = deepEqual(elem, data2.body[b]);
            return found;
        });
        pushYin(data1);
    }
}};



tenK["is"] = { head: "_", body: function() {

    var newYinYang = popYin();

    if (newYinYang.head === "yin") yin = newYinYang.body;

    else if (newYinYang.head === "yang") yang = newYinYang.body;
}};



tenK["last"] = { head: "_", body: function() {

    var elem = popYin();
    
    if ((elem.body) && (elem.body.length > 0))
        pushYin(quote(elem.body[elem.body.length-1]));
}};



tenK["length"] = { head: "_", body: function() {

    var elem = popYin();

    pushYin( elem.body ? elem.body.length.toString() : elem.length.toString() );
}};



tenK["login"] = { head: "_", body: function() {

    var name = parser.stringify(popYin());
    
    if ((name !== '') && !drone) initNetwork(name);
}};



tenK["logout"] = { head: "_", body: function() {

    drone.close();
    drone = false;
}};



tenK["map"] = { head: "_", body: function() {

    var func = popYin();
    var data = popYin();
    
    yang = [data.body.length, data.head, "construct"].concat(yang);

    if (data.body && func.body) {
        
        for (d of data.body.reverse()) {
            yang = func.body.concat(yang);
            yang.unshift(quote(d));
        }
    }
}};



tenK["match"] = { head: "_", body: function() {

    var pattern = popYin();
    var o = popYin();

    var match = deepMatch(o, pattern, {});

    if (match.success) {
        pushYin("true");
        for (let c in match.capture)
            bend(c, match.capture[c]);
    } else {
        pushYin("false");
    }
}};



tenK["nothing"] = { head: "_", body: function() {
}};



tenK["nth"] = { head: "_", body: function() {

    var n = parseInt(popYin());
    var elem = popYin();
    
    if ((elem.body) && (elem.body.length >= n))
        pushYin(quote(elem.body[n-1]));
}};



tenK["prepend"] = { head: "_", body: function() {

    var elem = popYin();
    var struct = yin[yin.length-1];
    
    if (struct.body)
        struct.body.unshift(elem);
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
    var result = [];
    for (var c=start; ((c>=end && step<0) || (c<=end && step>0)); c+=step)
        result.push(c.toString());
    pushYin({ head: '', body: result });
}};



tenK["reduce"] = { head: "_", body: function() {

    var func = popYin();
    var data = popYin();
    
    yang = [1, data.head, "construct"].concat(yang);
    
    var first = data.body.shift();

    if (data.body && func.body) {
        
        for (d of data.body.reverse()) {
            yang = func.body.concat(yang);
            yang.unshift(quote(d));
        }
    }
    yang.unshift(first);
}};



tenK["repeat"] = { head: "_", body: function() {

    var count = parseFloat(popYin());
    var clone = popYin();

    for (var c=0; c<count; c++) yang.unshift(clone);
}};



tenK["send"] = { head: "_", body: function() {

    var msg = parser.stringify(popYin(), true);
    
    if (msg !== '')
        drone.publish({
            room: 'observable-room',
            message: msg,
        });
}};



tenK["sentence"] = { head: "_", body: function() {

    var count = popYin();
    var s = [];
    for (let c=0; c<count; c++) s.unshift(popYin());
    pushYin(s.reverse().join(' '));
}};



tenK["source"] = { head: "_", body: function() {

    var name = popYin();

    if (tenK[name]) yin.push(tenK[name]);
}};



tenK['step-limit'] = { head: "_", body: function() {

    stepMax = parseInt(popYin());
}};



tenK["top"] = { head: "_", body: function() {

    var result = popYin();

    while (result.head) result = result.head;

    pushYin(result);
}};



tenK["tree"] = { head: "_", body: function() {

    var data = popYin();
    var t = treeify(data);

    tree = new TreeView([t], 'tree');
    
    tree.on("select", function(e) {
        emitEvent("tree", e.data.name);
    });
    
    document.getElementById("tree").style.display = "block";
}};



tenK["union"] = { head: "_", body: function() {

    var data1 = popYin();
    var data2 = popYin();
    
    if ((typeof data1.head !== "undefined") && (typeof data2.head !== "underfined")) {

        data2.body.map(elem => {
           
            var found = false;
            for (let d=0; ((!found) && (d<data1.body.length)); d++)
                found = deepEqual(elem, data1.body[d]);
            if (!found) data1.body.push(elem);
        });
        pushYin(data1);
    }
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
        elem.split(' ').reverse().map(c => { pushYin(c); });
}};



tenK["unwhirl"] = { head: "_", body: function() {

    var patternStr = parser.stringify(popYin().body);

    whirl = whirl.filter(w => w.str !== patternStr);
}};



tenK["unword"] = { head: "_", body: function() {

    var elem = popYin();

    if (typeof elem === "string")
        elem.split('').reverse().map(c => { pushYin(c); });
}};



tenK["user-defined"] = { head: "_", body: function() {

    pushYin({
        head: "user-defined",
        body: Array.from(userDefined).map(h => { return {
            head: h,
            body: Array.isArray(tenK[h]) ? tenK[h] : [tenK[h]]
        }})
    });
}};



tenK["when"] = { head: "_", body: function() {

    var eventName = parser.stringify(popYin());
    
    reactor[eventName] = popYin().body;
}};



tenK["whirl"] = { head: "_", body: function() {

    var pattern = popYin();
    var template = popYin();
    
    if ((typeof template.head !== "undefined") && (typeof pattern.head !== "undefined")) {
        
        whirl.push({
            template: template.body,
            pattern: pattern.body,
            str: parser.stringify(pattern.body)
        });
    }
}};



tenK["word"] = { head: "_", body: function() {

    var count = popYin();
    var s = [];
    for (let c=0; c<count; c++) s.unshift(popYin());
    pushYin(s.reverse().join(''));
}};



tenK["yang"] = { head: "_", body: function() {

    pushYin({ head: "yang", body: JSON.parse(JSON.stringify(yang)) });
}};



tenK["yin"] = { head: "_", body: function() {

    pushYin({ head: "yin", body: JSON.parse(JSON.stringify(yin)) });
}};


