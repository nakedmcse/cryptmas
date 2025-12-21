// Cryptmas Day 4
const cypherText = "xvfakvra";
const cypherKey = "snow";

function vigenereCypher(text, key) {
    const alpha = "abcdefghijklmnopqrstuvwxyz";
    const caeserCypher = (c,o) => alpha[(alpha.indexOf(c)+o+alpha.length) % alpha.length];

    return [...text].map((c, i) => {
        return caeserCypher(c, 0 - alpha.indexOf(key[i % key.length]))
    }).join('');
}

// Vigenere - (Rotating Caeser) cypher - try offsets based on the key, check for output as a dictionary word
const url = 'https://raw.githubusercontent.com/dwyl/english-words/refs/heads/master/words_dictionary.json'
fetch(url)
    .then(res => res.json())
    .then(data => {
        let cleartext = "";
        cleartext = vigenereCypher(cypherText, cypherKey);
        if (data[cleartext]) {
            console.log(`Day 4 Cleartext: ${cleartext}`);
        }
    })