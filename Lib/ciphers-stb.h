// Ciphers Single File Library
#ifndef CIPHERS_STB_H
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>

typedef struct columnIdx {
    int originalIndex;
    char letter;
} columnIdx;

unsigned char *hexToBytes(const char *hex);
char *atBash(const char *text);
char *caeser(const char *text, int offset, bool encrypt);
char *vigenere(const char *text, const char *key, bool encrypt);
char *vigenereAutokey(const char *text, const char *key, bool encrypt);
char *railfence(const char *text, int offset, bool encrypt);
char *column(const char *text, const char *key, bool encrypt);
char *playfair(const char *text, const char *key, bool encrypt);
char *xor(const char *text, const char *key);
char *affine(const char *text, int a, int b, bool encrypt);
#define CIPHERS_STB_H

#ifdef CIPHERS_STB_IMPLEMENTATION
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

char *caeser(const char *text, int offset, bool encrypt) {
    char *retval = malloc(strlen(text) + 1);
    if (retval == NULL) {
        return NULL;
    }
    if (encrypt) offset *= -1;
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

char *vigenere(const char *text, const char *key, bool encrypt) {
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
        char *trans = caeser(src, 0-idx, encrypt);
        retval[i] = trans[0];
        free(trans);
    }
    retval[strlen(text)] = '\0';
    return retval;
}

char *vigenereAutokey(const char *text, const char *key, bool encrypt) {
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
        char *trans = caeser(src, 0-idx, encrypt);
        retval[i] = trans[0];
        autoKey[i + (int)keyLen] = encrypt ? text[i] : trans[0];
        free(trans);
    }
    free(autoKey);
    retval[strlen(text)] = '\0';
    return retval;
}

char *railfence(const char *text, int offset, bool encrypt) {
    size_t len = strlen(text);
    char *retval = malloc(len + 1);
    if (retval == NULL) {
        return NULL;
    }

    if (encrypt) {
        char encRails[offset][len];
        memset(encRails, 0, sizeof(encRails));
        int r = 0, d = 1;
        for (int i = 0; i < len; i++) {
            strncat(encRails[r], text+i, 1);
            r += d;
            if (r == 0 || r == offset-1) d *= -1;
        }
        for (r = 0; r < offset; r++) {
            strncat(retval, encRails[r], len);
        }
        return retval;
    }

    char pattern[len];
    memset(pattern, '\0', len);
    char rail = 0;
    char dir = 1;
    for (int i = 0; i < len; i++) {
        pattern[i] = rail;
        rail += dir;
        if (rail == 0 || rail == (char)offset - 1) dir *= -1;
    }
    int railCounts[offset];
    memset(railCounts, 0, sizeof(railCounts));
    for (int i = 0; i < len; i++) railCounts[pattern[i]]++;

    char rails[offset][len];
    memset(rails, 0, sizeof(rails));
    int idx = 0;
    for (int r = 0; r < offset; r++) {
        strncpy(&rails[r][0],text + idx,railCounts[r]);
        idx += railCounts[r];
    }

    int railPos[offset];
    memset(railPos, 0, sizeof(railPos));
    for (int i = 0; i < len; i++) {
        char r = pattern[i];
        retval[i] = rails[r][railPos[r]++];
    }
    return retval;
}

int columnIdxComparator(const void *a, const void *b) {
    columnIdx *aIdx = (columnIdx *) a;
    columnIdx *bIdx = (columnIdx *) b;
    return aIdx->letter - bIdx->letter;
}

char *column(const char *text, const char *key, bool encrypt) {
    size_t len = strlen(text);
    int columns = (int)strlen(key);
    char *retval = malloc(len + 1);
    if (retval == NULL) {
        return NULL;
    }
    memset(retval, '\0', len);
    char colData[columns][len];
    memset(colData, 0, sizeof(colData));
    int rows = (int)len / columns;
    if ((int)len % columns != 0) rows++;

    columnIdx indexes[columns];
    for (int i = 0; i < columns; i++) {
        indexes[i].originalIndex = i;
        indexes[i].letter = key[i];
    }
    qsort(indexes, rows, sizeof(indexes[0]), columnIdxComparator);

    for (int i = 0; i < columns; i++) {
        if (encrypt) {
            strncpy(&colData[i][0],text + (i*rows), rows);
            if (strlen(colData[i]) < rows) {
                for (size_t j = strlen(colData[i]); j < rows; j++) {
                    colData[i][j] = 'x';
                }
            }
        } else {
            strncpy(&colData[indexes[i].originalIndex][0],text + (i*rows), rows);
        }
    }

    int rIdx = 0;
    for (int r = 0; r < rows; r++) {
       for (int c = 0; c < columns; c++) {
           retval[rIdx++] = encrypt ? colData[c][indexes[r].originalIndex] : colData[c][r];
       }
    }
    size_t i, j;
    if (!encrypt) {
        for (i=0, j=0; i < strlen(retval); i++) {
            if (retval[i] != 'x') retval[j++] = retval[i];
        }
        retval[j] = '\0';
    } else {
        retval[rIdx] = '\0';
    }
    return retval;
}

char *playfair(const char *text, const char *key, bool encrypt) {
    const char *alphabet = "abcdefghiklmnopqrstuvwxyz";
    char *retval = malloc(strlen(text) + 1);
    if (retval == NULL) {
        return NULL;
    }
    if (strlen(text) % 2 != 0) {
        char append[2] = {'x','\0'};
        strncat(retval, append, 1);
    }
    char grid[25];
    memset(grid, '\0', 25);
    int aptr = 0;
    size_t keyLen = strlen(key);
    for (int i = 0; i < 25; i++) {
        if (i < keyLen) {
            grid[i] = key[i];
            continue;
        }
        char src[2] = {alphabet[aptr], '\0'};
        while (strstr(key, src) != NULL) {
            aptr++;
            src[0] = alphabet[aptr];
        }
        grid[i] = alphabet[aptr++];
    }
    int ridx = 0;
    for (int i = 0; i < strlen(text); i += 2) {
        char src[2] = {text[i], '\0'};
        int i0 = (int)(strstr(grid, src) - grid);
        src[0] = text[i+1];
        int i1 = (int)(strstr(grid, src) - grid);
        int r0 = i0/5; int r1 = i1/5;
        int c0 = i0%5; int c1 = i1%5;
        int t0 = 0; int t1 = 0;
        if (r0 == r1) {
            if (encrypt) {
                t0 = (i0 + 1) > 5*(r0+1)-1 ? 5*r0 : i0 + 1;
                t1 = (i1 + 1) > 5*(r1+1)-1 ? 5*r1 : i1 + 1;
            } else {
                t0 = (i0 - 1) < r0 * 5 ? 4*(r0+1) : i0 - 1;
                t1 = (i1 - 1) < r1 * 5 ? 4*(r1+1) : i1 - 1;
            }

        }
        else if (c0 == c1) {
            if (encrypt) {
                t0 = (i0 + 5) % 25;
                t1 = (i1 + 5) % 25;
            } else {
                t0 = (i0 - 5) < 0 ? 24 + (i0 - 5) : i0 - 5;
                t1 = (i1 - 5) < 0 ? 24 + (i1 - 5) : i1 - 5;
            }

        }
        else {
            int tmp = c0;
            c0 = c1; c1 = tmp;
            t0 = (r0 * 5) + c0;
            t1 = (r1 * 5) + c1;
        }
        retval[ridx++] = grid[t0];
        retval[ridx++] = grid[t1];
    }
    return retval;
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

char *affine(const char *text, int a, int b, bool encrypt) {
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
        int idx = encrypt ? (int)(strstr(alpha, src) - alpha) : (int)(strstr(decrypt, src) - decrypt);
        retval[i] = encrypt ? decrypt[idx] : alpha[idx];
    }
    free(decrypt);
    retval[strlen(text)] = '\0';
    return retval;
};
#endif
#endif //CIPHERS_STB_H