// Tests for Ciphers STB Lib
#include <stdio.h>
#include <assert.h>
#include <stdbool.h>
#define CIPHERS_STB_IMPLEMENTATION
#include "ciphers-stb.h"

void test_hexToBytes(void) {
    assert(hexToBytes("ff")[0] == 255);
    assert(hexToBytes("00")[0] == 0);
    unsigned char *twoHex = hexToBytes("ffff");
    assert(twoHex[0] == 255 && twoHex[1] == 255);
    printf("hexToBytes test passed\n");
}

void test_atBash(void) {
    assert(strncmp(atBash("vevitivvm"),"evergreen",9) == 0);
    assert(strncmp(atBash("evergreen"),"vevitivvm",9) == 0);
    printf("atBash test passed\n");
}

void test_caeser(void) {
    assert(strncmp(caeser("zahyspnoa", 19, false), "starlight", 9) == 0);
    assert(strncmp(caeser("starlight", 19, true), "zahyspnoa", 9) == 0);
    assert(strncmp(caeser("fabjsnyy", 13, false), "snowfall", 8) == 0);
    printf("caeser test passed\n");
}

void test_vigenere(void) {
    assert(strncmp(vigenere("xvfakvra", "snow", false), "fireside", 8) == 0);
    assert(strncmp(vigenere("fireside", "snow", true), "xvfakvra", 8) == 0);
    printf("vigenere test passed\n");
}

void test_vigenereAutokey(void) {
    assert(strncmp(vigenereAutokey("apwytga","snow", false),"icicles", 7) == 0);
    assert(strncmp(vigenereAutokey("icicles","snow", true),"apwytga", 7) == 0);
    printf("vigenereAutokey test passed\n");
}

void test_railfence(void) {
    assert(strncmp(railfence("sdtnwrfoi", 3, false),"snowdrift",9) == 0);
    assert(strncmp(railfence("snowdrift", 3, true),"sdtnwrfoi",9) == 0);
    printf("railfence test passed\n");
}

void test_column(void) {
    assert(strncmp(column("aexnrxltn","ice", false),"lantern",7) == 0);
    assert(strncmp(column("lantern","ice", true),"aexnrxltn",9) == 0);
    printf("column test passed\n");
}

void test_playfair(void) {
    assert(strncmp(playfair("zswnhkdnhzhz", "winter", false),"sleighbelxlx", 12) == 0);
    assert(strncmp(playfair("sleighbelxlx", "winter", true),"zswnhkdnhzhz", 12) == 0);
    printf("playfair test passed\n");
}

void test_xor(void) {
    assert(strncmp(xor((const char *)hexToBytes("1b01031f170d161c1d0a"),"sno"),"hollyberry", 10) == 0);
    printf("xor test passed\n");
}

void test_affine(void) {
    assert(strncmp(affine("pcwvxccp", 5, 8, false),"reindeer",8) == 0);
    assert(strncmp(affine("reindeer", 5, 8, true),"pcwvxccp",8) == 0);
    printf("affine test passed\n");
}

int main(void) {
    test_hexToBytes();
    test_atBash();
    test_caeser();
    test_vigenere();
    test_vigenereAutokey();
    test_railfence();
    test_column();
    test_playfair();
    test_xor();
    test_affine();
    return 0;
}
