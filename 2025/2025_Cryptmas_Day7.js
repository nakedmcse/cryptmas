// Cryptmas Day 7
const cypherText = "ZSWNHKDNHZHZ";
const cypherKey = "winter";

function playfairCypher(text, key) {
    const alphabet = "abcdefghiklmnopqrstuvwxyz";
    let result = "";

    const grid = new Array(25);
    let aptr = 0;
    for (let i = 0; i < 25; i++) {
        if (i < key.length) {
            grid[i] = key[i];
            continue;
        }
        while (key.includes(alphabet[aptr])) aptr++;
        grid[i] = alphabet[aptr++];
    }

    if (text.length % 2 !== 0) text += "x";
    for (let j = 0; j < text.length; j += 2) {
        const i0 = grid.indexOf(text[j]); const i1 = grid.indexOf(text[j+1]);
        const r0 = Math.floor(i0/5); const r1 = Math.floor(i1/5);
        let c0 = i0 % 5; let c1 = i1 % 5;
        let t0, t1;

        if (r0 === r1) {
            t0 = (i0 - 1) < r0 * 5 ? 4*(r0+1) : i0 - 1;
            t1 = (i1 - 1) < r1 * 5 ? 4*(r1+1) : i1 - 1;
        }
        else if (c0 === c1) {
            t0 = (i0 - 5) < 0 ? 24 + (i0 - 5) : i0 - 5;
            t1 = (i1 - 5) < 0 ? 24 + (i1 - 5) : i1 - 5;
        }
        else {
            const tmp = c0;
            c0 = c1; c1 = tmp;
            t0 = (r0 * 5) + c0;
            t1 = (r1 * 5) + c1;
        }

        result += grid[t0] + grid[t1];
    }
    return result;
}

// Playfair
let cleartext = playfairCypher(cypherText.toLowerCase(),cypherKey);
console.log(`Day 7 Cleartext: ${cleartext.replaceAll("x","")}`);