const Ciphers = require("./ciphers.js");

describe("Ciphers", () => {
    test("ROT13", () => {
        expect(Ciphers.caeser("fabjsnyy", 13, false)).toBe("snowfall");
        expect(Ciphers.caeser("snowfall", 13, true)).toBe("fabjsnyy");
    });

    test("Atbash", () => {
        expect(Ciphers.atbash("vevitivvm")).toBe("evergreen");
        expect(Ciphers.atbash("evergreen")).toBe("vevitivvm");
    })

    test("Caeser", () => {
        expect(Ciphers.caeser("zahyspnoa", 19, false)).toBe("starlight");
        expect(Ciphers.caeser("starlight", 19, true)).toBe("zahyspnoa");
    })

    test("Vigenere", () => {
        expect(Ciphers.vigenere("xvfakvra", "snow", false)).toBe("fireside");
        expect(Ciphers.vigenere("fireside", "snow", true)).toBe("xvfakvra");
    })

    test("VigenereAutokey", () => {
        expect(Ciphers.vigenereAutoKey("apwytga","snow", false)).toBe("icicles");
        expect(Ciphers.vigenereAutoKey("icicles","snow", true)).toBe("apwytga");
    })

    test("Railfence", () => {
        expect(Ciphers.railfence("sdtnwrfoi", 3)).toBe("snowdrift");
    })

    test("Columnar", () => {
        expect(Ciphers.column("aexnrxltn","ice")).toBe("lantern");
    })

    test("Playfair", () => {
        expect(Ciphers.playfair("ZSWNHKDNHZHZ".toLowerCase(), "winter", false)).toBe("sleighbelxlx");
        expect(Ciphers.playfair("sleighbelxlx", "winter", true)).toBe("ZSWNHKDNHZHZ".toLowerCase());
    })

    test("XOR", () => {
        expect(Ciphers.xor("1b01031f170d161c1d0a", "sno")).toBe("hollyberry");
    })

    test("Affine", () => {
        expect(Ciphers.affine("pcwvxccp", 5, 8, false)).toBe("reindeer");
        expect(Ciphers.affine("reindeer", 5, 8, true)).toBe("pcwvxccp");
    })
})

describe("Tools", () => {
    test("Permute", () => {
        const testOut = [];
        const testTarget = ["abc","acb","bac","bca","cab","cba"];
        for (const p of Ciphers.permute("abc")) testOut.push(p);
        expect(testOut).toEqual(testTarget);
    })

    test("CheckDictionaryWord", async () => {
        expect(await Ciphers.checkDictionaryWord("xyzzy")).toBeFalsy();
        expect(await Ciphers.checkDictionaryWord("the")).toBeTruthy();
    })

    test("HammingDistance", () => {
        expect(Ciphers.hammingDistance(0,1)).toBe(1);
        expect(Ciphers.hammingDistance(0,255)).toBe(8);
        expect(Ciphers.hammingDistance(0,65535)).toBe(16);
    })

    test("DecodeASCII85", () => {
        expect(Ciphers.decodeASCII85("<~FCfN8+EV1>F8~>"))
            .toBe("test text");
    })

    test("HexToBytes", () => {
        const bytes = Ciphers.hexToBytes("baadf00d");
        expect(bytes[0]).toBe(0xba);
        expect(bytes[1]).toBe(0xad);
        expect(bytes[2]).toBe(0xf0);
        expect(bytes[3]).toBe(0x0d);
    })

    test("BytesToHex", () => {
        const bytes = new Uint8Array([0xba,0xad,0xf0,0x0d]);
        expect(Ciphers.bytesToHex(bytes)).toBe("baadf00d");
        expect(Ciphers.bytesToHex(bytes,3)).toBe("baadf0");
    })

    test("Pad", () => {
        const bytes = new Uint8Array([0xba,0xad,0xf0,0x0d]);
        const padded = Ciphers.pad(bytes, 6, 0x3a);
        expect(padded[3]).toBe(0x0d);
        expect(padded[4]).toBe(0x3a);
        expect(padded[5]).toBe(0x3a);
    })
})
