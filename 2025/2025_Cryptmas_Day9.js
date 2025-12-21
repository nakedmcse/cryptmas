// Cryptmas Day 9
const cypherText = "apwytga";
const cypherKey = "snow";

function vigenereDynamicKeyCypher(text, key) {
    const alpha = "abcdefghijklmnopqrstuvwxyz";
    let result = "";
    for (let i = 0; i < text.length; i++) {
        const next = alpha[(alpha.indexOf(text[i]) - alpha.indexOf(key[i]) + 26) % 26];
        result += next;
        key += next;
    }
    return result;
}

// Vigenere with dynamic key
let cleartext = vigenereDynamicKeyCypher(cypherText,cypherKey);
console.log(`Day 9 Cleartext: ${cleartext}`);