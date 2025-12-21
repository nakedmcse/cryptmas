// 2025 Cryptmas Day 11
import crypto from 'crypto';
const cypherText = "14eef35ad4b450941a5f2365834516f78597e0740c56484052dca920eeb7c32b";

function sha256hash(text) {
    return crypto.createHash('sha256').update(text).digest('hex');
}

// SHA256 hash - compare to given word hashes
const url = 'https://raw.githubusercontent.com/himuglamuh/Cryptmas-2025/refs/heads/main/day11_wordlist.txt'
fetch(url)
    .then(res => res.text())
    .then(data => {
        for (const word of data.split("\n")) {
            if (word === undefined  || word === "") continue;
            const candidate = sha256hash(word.trim());
            if (candidate === cypherText) {
                console.log(`Day 11 Cleartext: ${word}`);
            }
        }
    })