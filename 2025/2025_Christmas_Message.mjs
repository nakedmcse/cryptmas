// 2025 Christmas Message
import Ciphers from '../Lib/ciphers.js';
const cypherText = "<~DK]`.@N]o:Bl[m\"DL,tK+E2LICER)&An`B,G%,,-BR4fE/0K7UG9C@2An`B/G'[k8+D>S6B6Iu3B6/B9+D5b=+DuL<Er~>";

// Convert ASCII85
function decodeASCII85(text) {
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

// Atbash conversion
console.log(`Christmas Message: ${decodeASCII85(cypherText).split(' ').map(s => Ciphers.atbash(s)).join(' ')}`);