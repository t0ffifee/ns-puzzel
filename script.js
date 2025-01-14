let namemap = {};
let counts = {};

// Laad de JSON-bestanden
fetch('stationsmap.json')
    .then(response => response.json())
    .then(data => { namemap = data; });

fetch('countsmap.json')
    .then(response => response.json())
    .then(data => { counts = data; });

function convertInput(str) {
    return Array.from(str.toLowerCase())
        .filter((char) => /\p{L}/u.test(char))
        .sort()
        .join('')
}

function countCharacters(str) {
    const charCount = {}
    for (const char of str) {
        charCount[char] = (charCount[char] || 0) + 1;
    }
    return charCount
}

// function distance(a, b) {

// }

function findBestMatch(charCount) {
    Object.entries(counts).forEach(([key, value]) => {
        console.log(value);
    });
}

function findStation() {
    const input = document.getElementById('stationInput').value;
    const key = convertInput(input);

    let result;

    if (namemap[key]) {
        // Bij een exacte match gebruiken we de lookup-table
        result = namemap[key];
    } else {
        // Anders berekenen we de key die er het dichtst bij zit
        const charCount = countCharacters(key);

        findBestMatch();


        console.log(charCount)
    }

    console.log(result)

    document.getElementById('result').textContent = `Gevonden station: ${result}`;
}
