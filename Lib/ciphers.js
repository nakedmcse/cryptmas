// Ciphers library
class Ciphers {
    static alpha = "abcdefghijklmnopqrstuvwxyz";
    static words = {};
    static dictionaryUrl = 'https://raw.githubusercontent.com/dwyl/english-words/refs/heads/master/words_dictionary.json';

    // Tools
    static* permute(str, prefix = "") {
        if (str.length === 0) {
            yield prefix;
            return;
        }
        for (let i = 0; i < str.length; i++) {
            yield* this.permute(
                str.slice(0, i) + str.slice(i + 1),
                prefix + str[i]
            );
        }
    }

    static async checkDictionaryWord(str) {
        if (!Ciphers.words["the"]) {
            await fetch(Ciphers.dictionaryUrl)
                .then(res => res.json())
                .then(data => this.words = data);
        }
        return this.words[str];
    }

    static hammingDistance(a, b) {
        return (a ^ b).toString(2).split('')
            .filter(c => c === '1').length;
    }

    static decodeASCII85(text) {
        text = text.replaceAll("<~","").replaceAll("~>","");
        let out = [];
        let tuple = [];
        let value = 0;

        for (let i = 0; i < text.length; i++) {
            const c = text[i];

            if (c === 'z') {
                if (tuple.length !== 0) throw new Error("Invalid 'z' inside tuple");
                out.push(0, 0, 0, 0);
                continue;
            }

            const code = c.charCodeAt(0);
            if (code < 33 || code > 117) continue;

            tuple.push(code - 33);

            if (tuple.length === 5) {
                value = tuple.reduce((a, b) => a * 85 + b, 0);
                out.push(
                    (value >>> 24) & 0xFF,
                    (value >>> 16) & 0xFF,
                    (value >>> 8) & 0xFF,
                    value & 0xFF
                );
                tuple = [];
            }
        }

        // Handle partial final group
        if (tuple.length > 0) {
            const origLen = tuple.length;
            if (origLen === 1) throw new Error("Invalid final ASCII85 group length 1");

            while (tuple.length < 5) tuple.push(84); // 'u' padding
            const value = tuple.reduce((a, b) => a * 85 + b, 0) >>> 0;

            // emit only origLen - 1 bytes
            for (let i = 0; i < origLen - 1; i++) {
                out.push((value >>> (24 - 8 * i)) & 0xff);
            }
        }

        return out.map(c => String.fromCharCode(c)).join('');
    }

    // Ciphers
    static atbash(text) {
        const decrypt = Ciphers.alpha.split('').reverse().join('');
        return [...text].map(c => {
            return Ciphers.alpha[decrypt.indexOf(c)]
        }).join('');
    }

    static caeser(text, offset) {
        return [...text].map(c => Ciphers.alpha[(Ciphers.alpha.indexOf(c)+offset+Ciphers.alpha.length) % Ciphers.alpha.length]).join('');
    }

    static vigenere(text, key) {
        const caeserCypher = (c,o) => Ciphers.alpha[(Ciphers.alpha.indexOf(c)+o+Ciphers.alpha.length) % Ciphers.alpha.length];

        return [...text].map((c, i) => {
            return caeserCypher(c, 0 - Ciphers.alpha.indexOf(key[i % key.length]))
        }).join('');
    }

    static vigenereAutoKey(text, key) {
        let result = "";
        for (let i = 0; i < text.length; i++) {
            const next = Ciphers.alpha[(Ciphers.alpha.indexOf(text[i]) - Ciphers.alpha.indexOf(key[i]) + 26) % 26];
            result += next;
            key += next;
        }
        return result;
    }

    static railfence(text, offset) {
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

    static column(text, key) {
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

    static playfair(text, key) {
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

    static xor(text, key) {
        const cypherBytes =
            new Uint8Array([...text.matchAll(/../g)].map(m => parseInt(m[0], 16)));

        return Array.from(cypherBytes).map((b, i) => {
            return String.fromCharCode(b ^ key[i % key.length].charCodeAt(0));
        }).join('');
    }

    static affine(text, a, b) {
        const decrypt = Ciphers.alpha.split('')
            .map((x,idx) => Ciphers.alpha[(a*idx+b)%26]).join('');
        return text.split('')
            .map(x => Ciphers.alpha[decrypt.indexOf(x)]).join('');
    }
}
module.exports = Ciphers;