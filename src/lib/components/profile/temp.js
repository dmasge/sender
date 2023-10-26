export function isBuildNewFormat(build){
    let result = false;
    let k = build["k"];
    let newFormats = ["1208", "1102"];
    
    if(newFormats.includes(k)){
        result = true;
    }
    
    return result;
}
