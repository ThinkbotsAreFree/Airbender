


parser.stringify = function(code) {
    
    if (typeof code === "string") return code;

    if (code.head)
        return parser.stringify(code.head)
            + '('
            + parser.stringify(code.body)
            + ')';
            
    return code.map(parser.stringify).join(' ');
}


