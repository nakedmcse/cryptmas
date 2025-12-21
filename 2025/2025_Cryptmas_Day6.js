// Cryptmas Day 6
const cypherText = "aexnrxltn";
const cypherKey = "ice";

// Brute force
function* permute(str, prefix = "") {
    if (str.length === 0) {
        yield prefix;
        return;
    }
    for (let i = 0; i < str.length; i++) {
        yield* permute(
            str.slice(0, i) + str.slice(i + 1),
            prefix + str[i]
        );
    }
}

// Column transpose
function columnCypher(text, key) {
    const columns = key.length;
    const colData = new Array(columns);
    const rows = Math.ceil(text.length / columns);
    const indexes = [...key].map((c, i) => ({c, i}))
        .sort((a, b) => a.c.charCodeAt(0) - b.c.charCodeAt(0));

    indexes.forEach((o, idx) => {
        colData[o.i] = text.slice(idx*rows, (idx*rows)+rows).split("");
    });

    let result = "";
    for (let r = 0; r < rows; r++) result += colData.map(c => c[r]).join('');
    return result.replaceAll('x','');
}

// Try permutations
const url = 'https://raw.githubusercontent.com/dwyl/english-words/refs/heads/master/words_dictionary.json'
fetch(url)
    .then(res => res.json())
    .then(data => {
        let cleartext = new Set();
        for (const perm of permute(cypherText)) {
            for (let i = 6; i < perm.length; i++) {
                if (data[perm.substring(0,i)]) {
                    cleartext.add(perm.substring(0,i));
                }
            }
        }
        let actual = columnCypher(cypherText,cypherKey)
        console.log(`Day 6 Cleartext Candidates: ${[...cleartext].join(',')}`);
        console.log(`Day 6 Actual: ${actual}`);
    })