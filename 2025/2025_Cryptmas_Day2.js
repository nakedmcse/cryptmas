// Cryptmas Day 2
const cypherText = "vevitivvm";

function iterateMappings(plain, callback) {
    const alphabet = "abcdefghijklmnopqrstuvwxyz".split('');
    const used = new Array(alphabet.length).fill(false);
    const chosen = new Array(plain.length);

    function recurse(pos) {
        if (pos === plain.length) {
            const map = {};
            for (let i = 0; i < plain.length; i++) map[plain[i]] = chosen[i];
            if (callback(map) === true) return true;   // send upwards to stop recursion
            return false;
        }

        for (let i = 0; i < alphabet.length; i++) {
            if (used[i]) continue;
            used[i] = true;
            chosen[pos] = alphabet[i];
            if (recurse(pos + 1) === true) return true;
            used[i] = false;
        }
        return false;
    }

    recurse(0);
}

// Replacement cypher - try random mappings of just the characters in the cyphertext, check for output as a dictionary word
const url = 'https://raw.githubusercontent.com/dwyl/english-words/refs/heads/master/words_dictionary.json'
fetch(url)
    .then(res => res.json())
    .then(data => {
        console.time("Decrypt");
        const uniqueLetters = new Set(cypherText);
        iterateMappings(Array.from(uniqueLetters), (map) => {
            let cleartext = "";
            for (let i = 0; i < cypherText.length; i++) {
                cleartext += map[cypherText[i]];
            }
            if(data[cleartext]) {
                let printmap = "";
                for (const k of Object.keys(map)) printmap += `${k}->${map[k]}, `;
                console.log(`Day 2 Cleartext: ${cleartext}, Replacement Cypher: ${printmap}`);
                return true;
            }
            return false;
        });
        console.timeEnd("Decrypt");
    })