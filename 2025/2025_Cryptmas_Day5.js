// Cryptmas Day 5
const cypherText = "sdtnwrfoi";
const cypherKey = 3;

function railfenceCypher(text, offset) {
    const len = text.length;
    const pattern = new Array(len);
    let rail = 0;
    let dir = 1;

    for (let i = 0; i < len; i++) {
        pattern[i] = rail;
        rail += dir;
        if (rail === 0 || rail === offset - 1) dir *= -1;
    }

    const railCounts = Array(offset).fill(0);
    for (const r of pattern) railCounts[r]++;

    const railsArr = [];
    let idx = 0;
    for (let r = 0; r < offset; r++) {
        railsArr[r] = text.slice(idx, idx + railCounts[r]).split('');
        idx += railCounts[r];
    }

    const railPos = Array(offset).fill(0);
    let result = '';
    for (const r of pattern) {
        result += railsArr[r][railPos[r]++];
    }

    return result;
}

// Railfence
let cleartext = railfenceCypher(cypherText,cypherKey);
console.log(`Day 5 Cleartext: ${cleartext}`);