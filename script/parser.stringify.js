


parser.stringify = function(code, sourcify) {

    if ((typeof code === "function") || (typeof code === "undefined")) return '';
    
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


