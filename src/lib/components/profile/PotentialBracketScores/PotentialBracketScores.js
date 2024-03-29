export function GetBracketsInfo(charId) {
    if (charId == "1204") { // JING YUAN
        return [
            { id: 23010, e: 0, s: 1 },
            { id: 21027, e: 0, s: 1 },
            { id: 21006, e: 0, s: 1 },
            { id: 21034, e: 0, s: 1 },
            { id: 21020, e: 0, s: 1 },
            { id: 23000, e: 0, s: 1 }
        ];
    } else if (charId == "1212") { // JINGLIU
        return [
            { id: 23014, e: 0, s: 1 },
            { id: 24000, e: 0, s: 1 },
            { id: 21012, e: 0, s: 1 },
            { id: 21019, e: 0, s: 1 },
            { id: 23002, e: 0, s: 1 }
        ];
    } else if (charId == "1003") { // HIMEKO
        return [
            { id: 23000, e: 0, s: 1 },
            { id: 23010, e: 0, s: 1 },
            { id: 21027, e: 0, s: 1 },
            { id: 21013, e: 0, s: 1 },
            { id: 21020, e: 0, s: 1 },
            { id: 21006, e: 0, s: 1 },
            { id: 21034, e: 0, s: 1 }
        ];
    } else if (charId == "1302") { // ARGENTI
        return [
            { id: 23000, e: 0, s: 1 },
            { id: 23010, e: 0, s: 1 },
            { id: 21027, e: 0, s: 1 },
            { id: 21013, e: 0, s: 1 },
            { id: 21020, e: 0, s: 1 },
            { id: 21034, e: 0, s: 1 },
            { id: 23018, e: 0, s: 1 },
            { id: 23018, e: 6, s: 5 }
        ];
    } else if (charId == "1205") { // BLADE
        return [
            { id: 23009, e: 0, s: 1 },
            { id: 23009, e: 2, s: 1 },
            { id: 23009, e: 2, s: 5 },
            { id: 21012, e: 0, s: 5 },
            { id: 24000, e: 0, s: 5 },
            { id: 23002, e: 0, s: 5 },
            
        ];
    } else if (charId == "1008") { // ARLAN
        return [
            { id: 23009, e: 0, s: 1 },
            { id: 23009, e: 0, s: 5 },
            { id: 21012, e: 0, s: 5 },
            { id: 24000, e: 0, s: 5 },
            { id: 21019, e: 0, s: 5 },
            
        ];
    } else if (charId == "1102") { // Seele
        return [
            { id: 23001, e: 0, s: 1 },
            { id: 23001, e: 1, s: 1 },
            { id: 23001, e: 2, s: 1 },
            { id: 23001, e: 2, s: 5 },
            { id: 24001, e: 1, s: 1 },
            { id: 23012, e: 1, s: 1 },
            { id: 21010, e: 1, s: 1 },
        ];
    } else if (charId == "1112") { // Topaz
        return [
            { id: 23016, e: 0, s: 1 },
            { id: 23016, e: 0, s: 5 },
            { id: 24001, e: 1, s: 1 },
            { id: 21010, e: 2, s: 1 },
            { id: 23012, e: 2, s: 5 },
            { id: 21003, e: 1, s: 1 },
        ];
    } else if (charId == "1209") { // Yanqing
        return [
            { id: 23012, e: 0, s: 1 },
            { id: 21024, e: 0, s: 1 },
            { id: 24001, e: 0, s: 1 },
            { id: 21010, e: 0, s: 1 },
            { id: 23001, e: 0, s: 1 },
        ];
    } else if (charId == "1005") { // Kafka
        return [
            { id: 23006, e: 0, s: 1 },
            { id: 23006, e: 1, s: 1 },
            { id: 23006, e: 1, s: 5 },
            { id: 21001, e: 0, s: 1 },
            { id: 21022, e: 0, s: 1 },
            { id: 23004, e: 0, s: 1 },
            { id: 24003, e: 0, s: 1 },
            { id: 21008, e: 0, s: 1 },
        ];
    } else if (charId == "1208") { // FuXuan
        return [
            { id: 23011, e: 0, s: 1 },
            { id: 24002, e: 1, s: 1 },
            { id: 21009, e: 1, s: 5 },
            { id: 23005, e: 0, s: 1 },
            { id: 21002, e: 0, s: 1 },
        ];
    } 
    else {
        return [];
    }
}





function levenshteinDistance(a, b) {
    const matrix = [];

    for (let i = 0; i <= b.length; i++) {
        matrix[i] = [i];
    }

    for (let j = 0; j <= a.length; j++) {
        matrix[0][j] = j;
    }

    for (let i = 1; i <= b.length; i++) {
        for (let j = 1; j <= a.length; j++) {
            if (b.charAt(i - 1) === a.charAt(j - 1)) {
                matrix[i][j] = matrix[i - 1][j - 1];
            } else {
                matrix[i][j] = Math.min(
                    matrix[i - 1][j - 1] + 1,
                    matrix[i][j - 1] + 1,
                    matrix[i - 1][j] + 1
                );
            }
        }
    }

    return matrix[b.length][a.length];
}

function FindMostSimilarWord(word, wordList) {
    let minDistance = Infinity;
    let mostSimilarWord = '';

    for (let i = 0; i < wordList.length; i++) {
        const distance = levenshteinDistance(word, wordList[i]);
        if (distance < minDistance) {
            minDistance = distance;
            mostSimilarWord = wordList[i];
        }
    }

    return mostSimilarWord;
}
function filterBracketInfo(input) {
    function processString(str) {
        // Remove everything up to the first underline
        if (str.includes('_')) {
            str = str.split('_').slice(1).join('_');
        }

        // Remove any sequence of 5 consecutive digits
        str = str.replace(/\d{5,}/g, '');

        // Remove everything after the last underline if it's followed by 3 digits
        let lastUnderlineIndex = str.lastIndexOf('_');
        if (lastUnderlineIndex !== -1 && /\d{3,}/.test(str.substring(lastUnderlineIndex + 1))) {
            str = str.substring(0, lastUnderlineIndex);
        }

        return str;
    }

    if (typeof input === 'string') {
        return processString(input);
    } else if (Array.isArray(input)) {
        return input.map(processString);
    } else {
        throw new Error('Input must be a string or an array of strings');
    }
}

function FindMostSimilarWordIndex(mainWord, wordList) {
    let minDistance = Infinity;
    let mostSimilarIndex = -1;

    for (let i = 0; i < wordList.length; i++) {
        const distance = levenshteinDistance(mainWord, wordList[i]);
        if (distance < minDistance) {
            minDistance = distance;
            mostSimilarIndex = i;
        }
    }

    return mostSimilarIndex;
}


export function FindMostSimilarBracket(mainBracket, potentialBrackets){
    let mainBracketFiltered = filterBracketInfo(mainBracket);
    let potentialBracketsFiltered = potentialBrackets.map(filterBracketInfo);

    let mostSimilarIndex = FindMostSimilarWordIndex(mainBracketFiltered, potentialBracketsFiltered);

    return potentialBrackets[mostSimilarIndex];
}


export function getEidolonSuperimposeFromBracketName(inputString) {
    let index = inputString.indexOf("_");
    if (index !== -1) {
        return inputString.substring(0, index);
    } else {
        return inputString;
    }
}