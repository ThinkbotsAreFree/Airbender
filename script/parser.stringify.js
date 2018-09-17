


parser.stringify = function(code, sourcify) {

    if (typeof code === "undefined") return '';
    
    if (typeof code === "function") {
        var s = code.toString();
        return s.substring(s.indexOf("{") + 1, s.lastIndexOf("}"));
    }
    
    if (typeof code === "string")
        if (sourcify) {
            return (code.indexOf(' ') > -1) ? '['+code+']' : code;
        } else {
            return code;
        }

    if (typeof code.head !== "undefined")
        return parser.stringify(code.head)
            + '('
            + parser.stringify(code.body)
            + ')';
            
    return code.map(parser.stringify).join(' ');
}


