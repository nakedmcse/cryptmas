// 2025 Cryptmas Day 10
const cypherText = "pcwvxccp";
const a = 5;
const b = 8;

function affineCypher(text, a, b) {
    const alpha = "abcdefghijklmnopqrstuvwxyz";
    const decrypt = alpha.split('')
        .map((x,idx) => alpha[(a*idx+b)%26]).join('');
    return text.split('')
        .map(x => alpha[decrypt.indexOf(x)]).join('');
}

// Affine Cypher
const cleartext = affineCypher(cypherText,a,b);
console.log(`Day 10 Cleartext: ${cleartext}`);