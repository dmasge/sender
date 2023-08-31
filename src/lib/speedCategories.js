export function speedCategoriesCase(str) {
    switch (str) {
        case 'kafka' : return ["Base", "134", "151", "161"];
        case 'seele' : return [];
        
        default : return ["Base", "134"];
    }
}