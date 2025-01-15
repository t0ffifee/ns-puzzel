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

function getFrequencies(str) {
    const freqMap = {}
    for (const char of str) {
        freqMap[char] = (freqMap[char] || 0) + 1;
    }
    return freqMap
}


function findBestMatch(freqMap) {

    let bestMatchKey = ""
    let minimalDistance = Infinity

    Object.entries(counts).forEach(([cityKey, freqMap2]) => {

        let distance = 0

        Object.entries(freqMap).forEach(([character, frequency]) => {
            let frequency2 = (freqMap2[character] || 0)
            distance += Math.abs(frequency - frequency2)
        });

        if (distance < minimalDistance) {
            minimalDistance = distance
            bestMatchKey = cityKey
        }

    });

    return bestMatchKey
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
        const freqMap = getFrequencies(key);

        const bestMatchKey = findBestMatch(freqMap);

        result = namemap[bestMatchKey]

    }

    document.getElementById('result').textContent = `Gevonden station: ${result}`;
}
