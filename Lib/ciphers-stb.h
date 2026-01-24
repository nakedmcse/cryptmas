// Ciphers Single File Library
#ifndef CIPHERS_STB_H
#include <stdlib.h>
#include <string.h>

unsigned char *hexToBytes(const char *hex);
char *atBash(const char *text);
char *caeser(const char *text, int offset);
char *vigenere(const char *text, const char *key);
char *vigenereAutokey(const char *text, const char *key);
char *railfence(const char *text, int offset);
char *column(const char *text, const char *key);
char *playfair(const char *text, const char *key);
char *xor(const char *text, const char *key);
char *affine(const char *text, int a, int b);
#define CIPHERS_STB_H

#ifndef CIPHERS_STB_IMPLEMENTATION
const char *alpha = "abcdefghijklmnopqrstuvwxyz";

unsigned char *hexToBytes(const char *hex) {
    size_t len = strlen(hex);
    if (len % 2 != 0) {
        return NULL;
    }
    size_t binLen = len / 2;
    unsigned char *bin = (unsigned char *) malloc(binLen+1);
    if (bin == NULL) {
        return NULL;
    }
    for (size_t i=0, j=0; j<binLen; i+=2, j++)
        bin[j] = (hex[i] % 32 + 9) % 25 * 16 + (hex[i+1] % 32 + 9) % 25;
    bin[binLen] = '\0';
    return bin;
}

char *atBash(const char *text) {
    const char *decrypt = "zyxwvutsrqponmlkjihgfedcba";
    char *retval = malloc(strlen(text) + 1);
    if (retval == NULL) {
        return NULL;
    }
    for (int i = 0; i < strlen(text); i++) {
        char src[2];
        src[0] = text[i]; src[1] = '\0';
        int idx = (int)(strstr(decrypt, src) - decrypt);
        retval[i] = alpha[idx];
    }
    retval[strlen(text)] = '\0';
    return retval;
}

char *caeser(const char *text, int offset) {
    char *retval = malloc(strlen(text) + 1);
    if (retval == NULL) {
        return NULL;
    }
    int alphaLen = (int)strlen(alpha);
    for (int i = 0; i < strlen(text); i++) {
        char src[2];
        src[0] = text[i]; src[1] = '\0';
        int idx = ((int)(strstr(alpha, src) - alpha)+offset+alphaLen) % alphaLen;
        retval[i] = alpha[idx];
    }
    retval[strlen(text)] = '\0';
    return retval;
}

char *vigenere(const char *text, const char *key) {
    char *retval = malloc(strlen(text) + 1);
    if (retval == NULL) {
        return NULL;
    }
    int keyLen = (int)strlen(key);
    for (int i = 0; i < strlen(text); i++) {
        char src[2];
        src[0] = key[i % keyLen]; src[1] = '\0';
        int idx = (int)(strstr(alpha, src) - alpha);
        src[0] = text[i];
        char *trans = caeser(src, 0-idx);
        retval[i] = trans[0];
        free(trans);
    }
    retval[strlen(text)] = '\0';
    return retval;
}

char *vigenereAutokey(const char *text, const char *key) {
    char *retval = malloc(strlen(text) + 1);
    if (retval == NULL) {
        return NULL;
    }
    size_t keyLen = strlen(key);
    char *autoKey = malloc(strlen(text) + keyLen + 1);
    if (autoKey == NULL) {
        return NULL;
    }
    memcpy(autoKey, key, keyLen);
    for (int i = 0; i < strlen(text); i++) {
        char src[2];
        src[0] = autoKey[i]; src[1] = '\0';
        int idx = (int)(strstr(alpha, src) - alpha);
        src[0] = text[i];
        char *trans = caeser(src, 0-idx);
        retval[i] = trans[0];
        autoKey[i + (int)keyLen] = trans[0];
        free(trans);
    }
    free(autoKey);
    retval[strlen(text)] = '\0';
    return retval;
}

char *railfence(const char *text, int offset) {
    //TODO: Implement
    return NULL;
}

char *column(const char *text, const char *key) {
    //TODO: Implement
    return NULL;
}

char *playfair(const char *text, const char *key) {
    //TODO: Implement
    return NULL;
}

char *xor(const char *text, const char *key) {
    char *retval = malloc(strlen(text) + 1);
    if (retval == NULL) {
        return NULL;
    }
    int keyLen = (int)strlen(key);
    for (int i = 0; i < strlen(text); i++) {
        retval[i] = (char)(text[i] ^ key[i % keyLen]);
    }
    retval[strlen(text)] = '\0';
    return retval;
}

char *affine(const char *text, int a, int b) {
    char *retval = malloc(strlen(text) + 1);
    if (retval == NULL) {
        return NULL;
    }
    size_t alphaLen = strlen(alpha);
    char *decrypt = malloc(alphaLen);
    if (decrypt == NULL) {
        return NULL;
    }
    for (int i = 0; i < alphaLen; i++) {
        decrypt[i] = alpha[(a * i + b) % alphaLen];
    }
    for (int i = 0; i < strlen(text); i++) {
        char src[2];
        src[0] = text[i]; src[1] = '\0';
        int idx = (int)(strstr(decrypt, src) - decrypt);
        retval[i] = alpha[idx];
    }
    free(decrypt);
    retval[strlen(text)] = '\0';
    return retval;
};
#endif
#endif //CIPHERS_STB_H