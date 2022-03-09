export function coordParseReverse(string) {

    let x = string.slice(1, string.indexOf("y"));

    let y = string.slice(string.indexOf("y") + 1)

    let z= [parseInt(x), parseInt(y)];
    return z;
    }
    
    //module.exports = coordParse;
    