/* eslint-disable */
/********************************************************************/
/*                                                                  */
/*  Copyright (c) 2009-2011 SUNNIC Pte Ltd                          */
/*                                                                  */
/*  This obfuscated code was created using sunnic e2ee js code.     */
/*                                                                  */
/********************************************************************/
import e2ee_v from './jsbn_jso';
import e2ee_J from './hashprc_jso';
import e2ee_P from './rng_jso';

var e2ee_hexNumberTable = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, -1, -1, -1, -1, -1, -1, -1, 10, 11, 12, 13, 14, 15, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 10, 11, 12, 13, 14, 15, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1];

function e2ee_I(bi, length) {
  var i;
  var ah = length;
  var al = ah / 2;
  var aV = new Array(al);
  for (i = 0; i < al; i++) {
    aV[i] = ((e2ee_hexNumberTable[bi.charCodeAt(i * 2)] << 4) | e2ee_hexNumberTable[bi.charCodeAt((i * 2) + 1)]) & 0xff;
  }
  return aV;
};

var bp = 20;

function e2ee_G(cK, r) {
  return new e2ee_v(cK, r);
};

function e2ee_bE(s, n) {
  var G = "";
  var i = 0;
  while (i + n < s.length) {
    G += s.substring(i, i + n) + "\n";
    i += n;
  }
  return G + s.substring(i, s.length);
};

function e2ee_bm(b) {
  if (b < 0x10)return "0" + b.toString(16); else return b.toString(16);
};

function e2ee_p(ab, cE) {
  var bb = new e2ee_J();
  var dC = new Array(20);
  var i;
  var bh = new Array(ab.length);
  for (i = 0; i < ab.length; i++)bh[i] = ab.charCodeAt(i);
  bb.ad(bh, 0, cE);
  var result = bb.e2ee_T(0);
  return result;
};

function e2ee_Y(s, n) {
  var dN = s.length;
  var tl = dN;
  var bQ = new Array();
  var i = tl - 1;
  while (i >= 0 && n > 0) {
    var c;
    c = s[i--];
    bQ[--n] = c;
  }
  bQ[--n] = 0;
  var ae = new e2ee_P();
  var x = new Array();
  while (n > 2) {
    x[0] = 0;
    while (x[0] == 0)ae.aS(x);
    bQ[--n] = x[0];
  }
  bQ[--n] = 2;
  bQ[--n] = 0;
  return new e2ee_v(bQ);
};

function e2ee_C(bz, bF, dg) {
  if (bz != null && bz.length > 0) {
    var aA = bz.split(":");
    if (aA.length != 2) alert("Invalide public key content");
    var N = aA[0];
    var E = aA[1];
    this.n = e2ee_G(N, 16);
    this.e = parseInt(E, 16);
    this.ax = dg;
    this.cF = bF;
  }
};

function e2ee_bK(x) {
  return x.cr(this.e, this.n);
};

function e2ee_m(text) {
  var aH = e2ee_p(text, text.length);
  var ai = e2ee_B(bp);
  var bg = e2ee_I(this.ax, this.ax.length);
  var F = e2ee_A(bg, aH, ai);
  var m = this.e2ee_Y(F, (this.n.bS() + 7) >> 3);
  if (m == null)return null;
  var c = this.bJ(m);
  if (c == null)return null;
  var J = c.toString(16);
  var extra = "";
  if ((J.length & 1) == 0)return extra + J; else return extra + "0" + J;
};

function e2ee_X(bG, bA) {
  var ck = e2ee_p(bG, bG.length);
  var ca = e2ee_p(bA, bA.length);
  var ai = e2ee_B(bp);
  var bg = e2ee_I(this.ax, this.ax.length);
  var F = e2ee_y(bg, ck, ca, ai);
  var m = this.e2ee_Y(F, (this.n.bS() + 7) >> 3);
  if (m == null)return null;
  var c = this.bJ(m);
  if (c == null)return null;
  var J = c.toString(16);
  var extra = "";
  if ((J.length & 1) == 0)return extra + J; else return extra + "0" + J;
};

function e2ee_A(ag, be, bU) {
  var F = new Array(ag.length + be.length + bU.length);
  var i;
  for (i = 0; i < ag.length; i++)F[i] = ag[i];
  for (i = 0; i < be.length; i++)F[i + ag.length] = be[i];
  for (i = 0; i < bU.length; i++)F[i + ag.length + be.length] = bU[i];
  return F;
};

function e2ee_y(ag, be, bU, bx) {
  var F = new Array(ag.length + be.length + bU.length + bx.length);
  var i;
  for (i = 0; i < ag.length; i++)F[i] = ag[i];
  for (i = 0; i < be.length; i++)F[i + ag.length] = be[i];
  for (i = 0; i < bU.length; i++)F[i + ag.length + be.length] = bU[i];
  for (i = 0; i < bx.length; i++)F[i + ag.length + be.length + bU.length] = bx[i];
  return F;
};

function e2ee_B(size) {
  var plainText = new Array(size);
  var i;
  var ae = new e2ee_P();
  for (i = 0; i < size; i++)plainText[i] = ae.de();
  return plainText;
};

export default class RSAEngine {
  constructor () {
    this.n = null;
    this.e = 0;
    this.d = null;
    this.p = null;
    this.q = null;
    this.dc = null;
    this.dH = null;
    this.da = null;
    this.ax = null;
    this.cF = null;
  }
}

RSAEngine.prototype.bJ = e2ee_bK;
RSAEngine.prototype.init = e2ee_C;
RSAEngine.prototype.e2ee_Y = e2ee_Y;
RSAEngine.prototype.encryptPIN1 = e2ee_m;
RSAEngine.prototype.encryptPIN2 = e2ee_X;
