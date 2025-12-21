// 2025 Cryptmas Day 12
const cypherText = "4a505b505a5b54544b424a5b";
const key1 = "snow";
const key2 = "eve";
const key3 = 0x23;

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

function viginereCypher(text, key) {
    const alpha = "abcdefghijklmnopqrstuvwxyz";
    const caeserCypher = (c,o) => alpha[(alpha.indexOf(c)+o+alpha.length) % alpha.length];

    return [...text].map((c, i) => {
        return caeserCypher(c, 0 - alpha.indexOf(key[i % key.length]))
    }).join('');
}

function xorCypher(text, key) {
    const cypherBytes =
        new Uint8Array([...text.matchAll(/../g)].map(m => parseInt(m[0], 16)));

    return Array.from(cypherBytes).map((b, i) => {
        return String.fromCharCode(b ^ key[i % key.length].charCodeAt(0));
    }).join('');
}

let cleartext = xorCypher(cypherText, String.fromCharCode(key3));
cleartext = columnCypher(cleartext, key1);
cleartext = viginereCypher(cleartext, key2);
console.log(`Day 12 Cleartext: ${cleartext}`);