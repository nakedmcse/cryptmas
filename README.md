# Cryptmas
Cryptmas Cryptography Challenge Code

## 2025
### Day 1
ROT13 - Special case of the caeser cipher,
Ref: [ROT13](https://en.wikipedia.org/wiki/ROT13)

Solution: snowfall
### Day 2
Atbash - Replacement mapping cyper (eg v -> e),
Ref: [Atbash](https://en.wikipedia.org/wiki/Atbash)

Solution: evergreen
### Day 3
Caeser - Caeser cipher with 19 offset,
Ref: [Caeser](https://en.wikipedia.org/wiki/Caesar_cipher)

Solution: starlight
### Day 4
Vigenere - A rotating caeser cipher, with offsets based on the key as negative shifts,
Ref: [Vigenere](https://en.wikipedia.org/wiki/Vigen%C3%A8re_cipher)

Solution: fireside
### Day 5
Railfence - Uses rails of text written diagonally, which are then read horizontally to create the ciphertext,
Ref: [Rail Fence](https://en.wikipedia.org/wiki/Rail_fence_cipher)

Solution: snowdrift
### Day 6
Columnar transposition - Write text in columns matching key, sort columns by alpha in key,
Ref: [Columnar](https://en.wikipedia.org/wiki/Transposition_cipher)

Solution: lantern
### Day 7
Playfair - Make text into a grid size of the key, then combine according to rules,
Ref: [Playfair](https://en.wikipedia.org/wiki/Playfair_cipher)

Solution: sleighbell
### Day 8
XOR - Apply key as rotating bytes against text with xor,
Ref: [XOR](https://en.wikipedia.org/wiki/XOR_cipher)

Solution: hollyberry
### Day 9
Vigenere with autokey - Extract up to key characters normally, then use extracted text as key,
Ref: [Autokey](https://en.wikipedia.org/wiki/Autokey_cipher)

Solution: icicles
### Day 10
Affine - Shift cipher with a key derived from a function and two numbers - f(x) = A(x) + B % 26,
Ref: [Affine](https://en.wikipedia.org/wiki/Affine_cipher)

Solution: reindeer
### Day 11
SHA256 hash - Hash the words in the wordlist and compare,
Ref: [SHA2](https://en.wikipedia.org/wiki/SHA-2)

Solution: silentnight
### Day 12
Combination of days 4, 6 and 8.  Apply XOR with hex key, column with 'snow' and Vigenere with 'eve',
Refs: See above for 4,6 and 8

Solution: snowbound

### Cryptmas Card
This was a CTF challenge at the end.  You were given a PNG and had to capture the flag.
Unfortunately, part of the CTF used a 12 bit JPEG which was very adversarial outside of 
specific linux distros with their JPG library updated.  Steps below to that point:

1. PNG has hidden graphical text in the alpha layer -- use `cryptmas_splitbitplanes.py` to find it
2. PNG has gzipped tar file appended after IEND marker -- use `cryptmas_extracttar.py` to extract it
3. This contains the 12-bit JPEG.

Full instructions can be found here: [Card Solution](https://github.com/akanosec/Cryptmas-2025-solutions/blob/main/solutions.md#cryptmas-card-challenge)