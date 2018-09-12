


parser.stringify = function(code) {

    if ((typeof code === "function") || (typeof code === "undefined")) return '';
    
    if (typeof code === "string") return code;

    if (typeof code.head !== "undefined")
        return parser.stringify(code.head)
            + '('
            + parser.stringify(code.body)
            + ')';
            
    return code.map(parser.stringify).join(' ');
}


