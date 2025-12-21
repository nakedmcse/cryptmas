// 2025 Cryptmas Day 8
const cypherText = "1b01031f170d161c1d0a";
const cypherKey = "sno";

function xorCypher(text, key) {
    const cypherBytes =
        new Uint8Array([...text.matchAll(/../g)].map(m => parseInt(m[0], 16)));

    return Array.from(cypherBytes).map((b, i) => {
        return String.fromCharCode(b ^ key[i % key.length].charCodeAt(0));
    }).join('');
}

// XOR with repeating key
let cleartext = xorCypher(cypherText,cypherKey);
console.log(`Day 8 Cleartext: ${cleartext}`);