/* eslint-disable */
/********************************************************************/
/*                                                                  */
/*  Copyright (c) 2009-2011 SUNNIC Pte Ltd                          */
/*                                                                  */
/*  This obfuscated code was created using sunnic e2ee js code.     */
/*                                                                  */
/********************************************************************/

var e2ee_DIGEST_LENGTH = 20;

function e2ee_r(aI, ar) {
  this.X[this.aJ++] = ((aI[ar] & 0xff) << 24) | ((aI[ar + 1] & 0xff) << 16) | ((aI[ar + 2] & 0xff) << 8) | ((aI[ar + 3] & 0xff));
  if (this.aJ == 16) {
    this.e2ee_t();
  }
};

function e2ee_E(x) {
  var bf = x & 0xff;
  return bf;
};

function e2ee_k(word, out, ay) {
  out[ay] = e2ee_E(word >>> 24);
  out[ay + 1] = e2ee_E(word >>> 16);
  out[ay + 2] = e2ee_E(word >>> 8);
  out[ay + 3] = e2ee_E(word);
};

function e2ee_U(bS) {
  if (this.aJ > 14) {
    this.e2ee_t();
  }
  this.X[14] = 0;
  this.X[15] = (bS & 0xffffffff);
};

function e2ee_T(ay) {
  this.e2ee_Z();
  var out = new Array(20);
  this.e2ee_k(this.H1, out, ay);
  this.e2ee_k(this.H2, out, ay + 4);
  this.e2ee_k(this.H3, out, ay + 8);
  this.e2ee_k(this.H4, out, ay + 12);
  this.e2ee_k(this.H5, out, ay + 16);
  this.e2ee_H();
  return out;
};

function e2ee_H() {
  var i = 0;
  this.av = 0;
  this.aN = 0;
  for (i = 0; i < this.aw.length; i++) {
    this.aw[i] = 0;
  }
  this.H1 = 0x67452301;
  this.H2 = 0xefcdab89;
  this.H3 = 0x98badcfe;
  this.H4 = 0x10325476;
  this.H5 = 0xc3d2e1f0;
  this.aJ = 0;
  for (i = 0; i != this.X.length; i++) {
    this.X[i] = 0;
  }
};

function e2ee_bD(u, R, w) {
  return ((u & R) | ((~u) & w));
};

function e2ee_D(u, R, w) {
  return (u ^ R ^ w);
};

function e2ee_aP(u, R, w) {
  return ((u & R) | (u & w) | (R & w));
};

function e2ee_a(x, n) {
  return (x << n) | (x >>> (32 - n));
};

function e2ee_t() {
  var i;
  var O;
  var aW = 1518500249;
  var an = 1859775393;
  var bD = -1894007588;
  var bd = -899497514;
  for (i = 16; i <= 79; i++) {
    this.X[i] = e2ee_a((this.X[i - 3] ^ this.X[i - 8] ^ this.X[i - 14] ^ this.X[i - 16]), 1);
  }
  var A = this.H1;
  var B = this.H2;
  var L = this.H3;
  var D = this.H4;
  var E = this.H5;
  for (O = 0; O <= 19; O++) {
    var K = e2ee_a(A, 5) + e2ee_bD(B, L, D) + E + this.X[O] + aW;
    K = K & 0xffffffff;
    E = D;
    D = L;
    L = e2ee_a(B, 30);
    B = A;
    A = K;
  }
  for (O = 20; O <= 39; O++) {
    var K = e2ee_a(A, 5) + e2ee_D(B, L, D) + E + this.X[O] + an;
    K = K & 0xffffffff;
    E = D;
    D = L;
    L = e2ee_a(B, 30);
    B = A;
    A = K;
  }
  for (O = 40; O <= 59; O++) {
    var K = e2ee_a(A, 5) + e2ee_aP(B, L, D) + E + this.X[O] + bD;
    K = K & 0xffffffff;
    E = D;
    D = L;
    L = e2ee_a(B, 30);
    B = A;
    A = K;
  }
  for (O = 60; O <= 79; O++) {
    var K = e2ee_a(A, 5) + e2ee_D(B, L, D) + E + this.X[O] + bd;
    K = K & 0xffffffff;
    E = D;
    D = L;
    L = e2ee_a(B, 30);
    B = A;
    A = K;
  }
  this.H1 = (this.H1 + A) & 0xffffffff;
  this.H2 = (this.H2 + B) & 0xffffffff;
  this.H3 = (this.H3 + L) & 0xffffffff;
  this.H4 = (this.H4 + D) & 0xffffffff;
  this.H5 = (this.H5 + E) & 0xffffffff;
  this.aJ = 0;
  for (i = 0; i != this.X.length; i++) {
    this.X[i] = 0;
  }
};

function e2ee_s(aI) {
  this.aw[this.aN++] = aI;
  if (this.aN == this.aw.length) {
    this.aT(this.aw, 0);
    this.aN = 0;
  }
  this.av++;
};

function e2ee_e(aI, ar, bE) {
  while ((this.aN != 0) && (bE > 0)) {
    e2ee_s(aI[ar]);
    ar++;
    bE--;
  }
  while (bE > this.aw.length) {
    this.aT(aI, ar);
    ar += this.bu;
    bE -= this.aw.length;
    this.av += this.aw.length;
  }
  while (bE > 0) {
    this.e2ee_s(aI[ar]);
    ar++;
    bE--;
  }
};

function e2ee_Z() {
  var bS = (this.av << 3);
  this.e2ee_s(-128);
  while (this.aN != 0) {
    this.e2ee_s(0);
  }
  this.e2ee_U(bS);
  this.e2ee_t();
};

export default class e2ee_J {
  constructor () {
    this.X = new Array(80);
    this.aw = new Array(4);
    this.aN = 0;
    this.bu = 4;
    this.av = 0;
    this.aJ = 0;
    var i = 0;
    for (i = 0; i < this.aw.length; i++) {
      this.aw[i] = 0;
    }
    this.H1 = 1732584193;
    this.H2 = -271733879;
    this.H3 = -1732584194;
    this.H4 = 271733878;
    this.H5 = -1009589776;
    this.aJ = 0;
    for (i = 0; i != this.X.length; i++) {
      this.X[i] = 0;
    }
  }
}

e2ee_J.prototype.ad = e2ee_e;
e2ee_J.prototype.e2ee_T = e2ee_T;
e2ee_J.prototype.aT = e2ee_r;
e2ee_J.prototype.e2ee_s = e2ee_s;
e2ee_J.prototype.e2ee_H = e2ee_H;
e2ee_J.prototype.e2ee_Z = e2ee_Z;
e2ee_J.prototype.e2ee_U = e2ee_U;
e2ee_J.prototype.e2ee_t = e2ee_t;
e2ee_J.prototype.e2ee_k = e2ee_k;
