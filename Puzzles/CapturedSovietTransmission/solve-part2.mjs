// 2026 Puzzle 1 - Captured Soviet Transmission - Part 2
const trainingPlaintext =
    `SOVIET FIELD AUTH SYSTEM // TRAINING TRANSMISSION
STATION: HOTEL-LAMUH
DATE: 1979-02-14
PADDING: 0x3A
CONTENT:
  THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG.
  VERIFY RECEIPT. DO NOT REPLY.
::END::`;

const trainingCipherHex =
    `9a1ab4af28e8edf7197bd5fead034245479b1586f71e227fc42590f52b1c08257abfd31d0178958e8b765ca7d0f65fd456918ca612fe25fdeeeed0365ad33943131494578d0c287647e901a6b149ec1f1a6cbd9cf4f377c9ba6b345a06e0c50f451ce7cf5a2f95806ec7871914fae002853faa06ea34ced7c9590389df74793fcc7e713b3b95c8270d912f0b23b4f6aad7cd18ad47b524e9a9afb93d89ee2efa7f2f2ef4d843f033fbaf41ecf8bd90ec1d48254b7404247d96d43d70eb164147a7e164fcb26cd44197c5bf39cce7bcf31e57954f43175a339cb15e0eae331695ae9e19510af40c79d2ba9ef7ea632b8978aed47df8e601df02beeaf7b75f773b734bd1a45e8bbc2715e6ecf640d900d6b6f0cd9a9974f85f596dac865b28e29d567afeb1e2ef19bf0a7bb6ea37935e84602dbc6d4e6341712f4f7514fdd43177fe1ad43126a236cc5663d1792e390e73b8ae2faa4bae0cdc17a1116191ae28a4ec2965402b047da3d4171bd5236004cd16e7697da6d18326baa4c5bae4641f689a1db7db7cb08870ec4e15779948c59f928083fb8d05a05785142ec8578518e8cb2cb898e950ff25063c691d7a0e0ca5454b5355a029b5c41d7f2f41958db475777b45eafee26322319b45bffe05c0fe1962eedd6b67e023d3bc37bc08f865c5972b7c28c4290684afd163d43e5c379e9555471357d0900dfdab4cd3b2ee497d`;

const liveCipherHex =
    `9a1ab4af28e8edf7197bd5fead034245479b1586f71e227fc42590f5301e0c3e75a2d4156f6d8bef917750a0d0e85fc84bd290bc59f938f3f49dbf302fa734406a1d993794056f674eb700ddc53def081278ba97f4f271eedb1e7a4e0eeac67c2b6ba5dc2b5de58e2ac3901e0f92a376fc51c20a8728dedac353778e876f7c30a26b732a4f8bd23867e24c3419df84ddada50ae465801bc2a7e1b535e9b04b947d50769dbe499522eca9508580adf1ec174851256915507d92ca22648c485247c2d40192df19b10fc492e05ca69cc2964d1ef034264e017bc3ee166bd14768e6dae37c0659bd422283e585b0da7931f117c6a067839a6fa06aa48288cc21044f0e5fe1a45ef4c85915e6ecf640d900d6b6f0cd9a9974f85f596dac865b28e29d567afeb1e2ef19bf0a7bb6ea37935e84602dbc6d4e6341712f4f7514fdd43177fe1ad43126a236cc5663d1792e390e73b8ae2faa4bae0cdc17a1116191ae28a4ec2965402b047da3d4171bd5236004cd16e7697da6d18326baa4c5bae4641f689a1db7db7cb08870ec4e15779948c59f928083fb8d05a05785142ec8578518e8cb2cb898e950ff25063c691d7a0e0ca5454b5355a029b5c41d7f2f41958db475777b45eafee26322319b45bffe05c0fe1962eedd6b67e023d3bc37bc08f865c5972b7c28c4290684afd163d43e5c379e9555471357d0900dfdab4cd3b2ee497d`;

function hexToBytes(hex) {
    return new Uint8Array([...hex.matchAll(/../g)].map(m => parseInt(m[0], 16)))
}

function bytesToHex(bytes, max = bytes.length) {
    return [...bytes.slice(0, max)].map(b => b.toString(16).padStart(2, "0")).join("");
}

function pad(original, total) {
    const retval = new Uint8Array(total);
    retval.set(original, 0);
    retval.fill(0x3A, original.length);
    return retval;
}

function xorWithKeystream(data, keystream) {
    return data.map((b,i) => b ^ keystream[i % keystream.length]);
}

function encodeUtf8(str) {
    return new TextEncoder().encode(str);
}

// Pad plain text with 0x3A to match cyphertext size
const trainCT = hexToBytes(trainingCipherHex);
const trainPT = pad(encodeUtf8(trainingPlaintext),trainCT.length);
const liveCT  = hexToBytes(liveCipherHex);

// Get keystream for the portion covered by known plaintext
const ks = new Uint8Array(trainPT.length);
for (let i = 0; i < trainPT.length; i++) ks[i] = trainCT[i] ^ trainPT[i];
console.log("Keystream:", bytesToHex(ks, 256));

// Decrypt live for the same length we have keystream
const livePTBytes = xorWithKeystream(liveCT, ks);
const utf8  = new TextDecoder("utf-8", { fatal: false }).decode(livePTBytes);
console.log(utf8);