const Ciphers = require("./ciphers.js");

describe("Ciphers", () => {
    test("ROT13", () => {
        expect(Ciphers.caeser("fabjsnyy", 13)).toBe("snowfall");
    });

    test("Atbash", () => {
        expect(Ciphers.atbash("vevitivvm")).toBe("evergreen");
    })

    test("Caeser", () => {
        expect(Ciphers.caeser("zahyspnoa", 19)).toBe("starlight");
    })

    test("Vigenere", () => {
        expect(Ciphers.vigenere("xvfakvra", "snow")).toBe("fireside");
    })

    test("VigenereAutokey", () => {
        expect(Ciphers.vigenereAutoKey("apwytga","snow")).toBe("icicles");
    })

    test("Railfence", () => {
        expect(Ciphers.railfence("sdtnwrfoi", 3)).toBe("snowdrift");
    })

    test("Columnar", () => {
        expect(Ciphers.column("aexnrxltn","ice")).toBe("lantern");
    })

    test("Playfair", () => {
        expect(Ciphers.playfair("ZSWNHKDNHZHZ".toLowerCase(), "winter")).toBe("sleighbelxlx");
    })

    test("XOR", () => {
        expect(Ciphers.xor("1b01031f170d161c1d0a", "sno")).toBe("hollyberry");
    })

    test("Affine", () => {
        expect(Ciphers.affine("pcwvxccp", 5, 8)).toBe("reindeer");
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
})
