// Cryptmas Day 1
const cypherText = "fabjsnyy";

function caeserCypher(text, offset) {
    const alpha = "abcdefghijklmnopqrstuvwxyz";
    return [...text].map(c => alpha[(alpha.indexOf(c)+offset+alpha.length) % alpha.length]).join('');
}

// Caeser cypher - try varying offsets, check for output as a dictionary word
const url = 'https://raw.githubusercontent.com/dwyl/english-words/refs/heads/master/words_dictionary.json'
fetch(url)
.then(res => res.json())
.then(data => {
    for (let i = 1; i < 27; i++) {
        const cleartext = caeserCypher(cypherText, i);
        if (data[cleartext]) {
            console.log(`Day 1 Cleartext: ${cleartext}, Caeser Cypher: ${i}`);
        }
    }
})
