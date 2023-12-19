export function teamCategoriesCase(str) {
    switch (str) {
        case "1005":
            return ["Solo", "HUOGNF"];
        case "1112":
            return ["Solo", "FXASTA"];
        case "1213":
            return ["Solo", "YK"];
        case "1102":
            return ["Solo", "FX"];
        case "1204":
            return ["TY", "FXTY"];
        default:
            return [];
    }
}

let bracketToHuman = { HUOGNF : "Huohuo & Guinaifen"}
export function BracketToHumanLanguage(str){
    
}