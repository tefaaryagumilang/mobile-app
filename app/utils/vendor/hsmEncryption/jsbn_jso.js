/* eslint-disable */
/********************************************************************/
/*                                                                  */
/*  Copyright (c) 2009-2011 SUNNIC Pte Ltd                          */
/*                                                                  */
/*  This obfuscated code was created using sunnic e2ee js code.     */
/*                                                                  */
/********************************************************************/
const navigator = {appName:'reactNative'}; //fails the test otherwise , no navigator present in react native

export default class e2ee_v {
  constructor (a, b, c) {
    if (a != null)if ("number" == typeof a) this.cc(a, b, c); else if (b == null && "string" != typeof a) this.aB(a, 256); else this.aB(a, b);
  }
}

var e2ee_dbits;
var e2ee_canary = 0xdeadbeefcafe;
var e2ee_j_lm = ((e2ee_canary & 0xffffff) == 0xefcafe);

function e2ee_N() {
  return new e2ee_v(null);
};

function e2ee_W(i, x, w, O, c, n) {
  while (--n >= 0) {
    var R = x * this[i++] + w[O] + c;
    c = Math.floor(R / 0x4000000);
    w[O++] = R & 0x3ffffff;
  }
  return c;
};

function e2ee_V(i, x, w, O, c, n) {
  var bn = x & 0x7fff, aK = x >> 15;
  while (--n >= 0) {
    var bV = this[i] & 0x7fff;
    var J = this[i++] >> 15;
    var m = aK * bV + J * bn;
    bV = bn * bV + ((m & 0x7fff) << 15) + w[O] + (c & 0x3fffffff);
    c = (bV >>> 30) + (m >>> 15) + aK * J + (c >>> 30);
    w[O++] = bV & 0x3fffffff;
  }
  return c;
};

function e2ee_o(i, x, w, O, c, n) {
  var bn = x & 0x3fff, aK = x >> 14;
  while (--n >= 0) {
    var bV = this[i] & 0x3fff;
    var J = this[i++] >> 14;
    var m = aK * bV + J * bn;
    bV = bn * bV + ((m & 0x3fff) << 14) + w[O] + c;
    c = (bV >> 28) + (m >> 14) + aK * J;
    w[O++] = bV & 0xfffffff;
  }
  return c;
};

if (e2ee_j_lm && (navigator.appName == "Microsoft Internet Explorer")) {
  e2ee_v.prototype.ac = e2ee_V;
  e2ee_dbits = 30;
} else if (e2ee_j_lm && (navigator.appName != "Netscape")) {
  e2ee_v.prototype.ac = e2ee_W;
  e2ee_dbits = 26;
} else {
  e2ee_v.prototype.ac = e2ee_o;
  e2ee_dbits = 28;
}

e2ee_v.prototype.T = e2ee_dbits;
e2ee_v.prototype.bP = ((1 << e2ee_dbits) - 1);
e2ee_v.prototype.af = (1 << e2ee_dbits);
var au = 52;
e2ee_v.prototype.bj = Math.pow(2, au);
e2ee_v.prototype.bK = au - e2ee_dbits;
e2ee_v.prototype.aR = 2 * e2ee_dbits - au;
var e2ee_BI_RM = "0123456789abcdefghijklmnopqrstuvwxyz";
var e2ee_BI_RC = new Array();
var e2ee_rr, e2ee_vv;
e2ee_rr = "0".charCodeAt(0);
for (e2ee_vv = 0; e2ee_vv <= 9; ++e2ee_vv)e2ee_BI_RC[e2ee_rr++] = e2ee_vv;
e2ee_rr = "a".charCodeAt(0);
for (e2ee_vv = 10; e2ee_vv < 36; ++e2ee_vv)e2ee_BI_RC[e2ee_rr++] = e2ee_vv;
e2ee_rr = "A".charCodeAt(0);
for (e2ee_vv = 10; e2ee_vv < 36; ++e2ee_vv)e2ee_BI_RC[e2ee_rr++] = e2ee_vv;

function e2ee_c(n) {
  return e2ee_BI_RM.charAt(n);
};

function e2ee_ae(s, i) {
  var c = e2ee_BI_RC[s.charCodeAt(i)];
  return (c == null) ? -1 : c;
};

function e2ee_aq(r) {
  for (var i = this.K - 1; i >= 0; --i)r[i] = this[i];
  r.K = this.K;
  r.s = this.s;
};

function e2ee_aV(x) {
  this.K = 1;
  this.s = (x < 0) ? -1 : 0;
  if (x > 0) this[0] = x; else if (x < -1) this[0] = x + af; else this.K = 0;
};

function e2ee_u(i) {
  var r = e2ee_N();
  r.bC(i);
  return r;
};

function e2ee_br(s, b) {
  var H;
  if (b == 16) H = 4; else if (b == 8) H = 3; else if (b == 256) H = 8; else if (b == 2) H = 1; else if (b == 32) H = 5; else if (b == 4) H = 2; else {
    this.cO(s, b);
    return;
  }
  this.K = 0;
  this.s = 0;
  var i = s.length, aQ = false, bM = 0;
  while (--i >= 0) {
    var x = (H == 8) ? s[i] & 0xff : e2ee_ae(s, i);
    if (x < 0) {
      if (s.charAt(i) == "-") aQ = true;
      continue;
    }
    aQ = false;
    if (bM == 0) this[this.K++] = x; else if (bM + H > this.T) {
      this[this.K - 1] |= (x & ((1 << (this.T - bM)) - 1)) << bM;
      this[this.K++] = (x >> (this.T - bM));
    } else this[this.K - 1] |= x << bM;
    bM += H;
    if (bM >= this.T) bM -= this.T;
  }
  if (H == 8 && (s[0] & 0x80) != 0) {
    this.s = -1;
    if (bM > 0) this[this.K - 1] |= ((1 << (this.T - bM)) - 1) << bM;
  }
  this.bq();
  if (aQ) e2ee_v.ZERO.V(this, this);
};

function e2ee_bw() {
  var c = this.s & this.bP;
  while (this.K > 0 && this[this.K - 1] == c)--this.K;
};

function e2ee_ba(b) {
  if (this.s < 0)return "-" + this.by().toString(b);
  var H;
  if (b == 16) H = 4; else if (b == 8) H = 3; else if (b == 2) H = 1; else if (b == 32) H = 5; else if (b == 4) H = 2; else return this.dj(b);
  var aC = (1 << H) - 1, d, m = false, r = "", i = this.K;
  var p = this.T - (i * this.T) % H;
  if (i-- > 0) {
    if (p < this.T && (d = this[i] >> p) > 0) {
      m = true;
      r = e2ee_c(d);
    }
    while (i >= 0) {
      if (p < H) {
        d = (this[i] & ((1 << p) - 1)) << (H - p);
        d |= this[--i] >> (p += this.T - H);
      } else {
        d = (this[i] >> (p -= H)) & aC;
        if (p <= 0) {
          p += this.T;
          --i;
        }
      }
      if (d > 0) m = true;
      if (m) r += e2ee_c(d);
    }
  }
  return m ? r : "0";
};

function e2ee_ai() {
  var r = e2ee_N();
  e2ee_v.ZERO.V(this, r);
  return r;
};

function e2ee_i() {
  return (this.s < 0) ? this.by() : this;
};

function e2ee_l(a) {
  var r = this.s - a.s;
  if (r != 0)return r;
  var i = this.K;
  r = i - a.K;
  if (r != 0)return r;
  while (--i >= 0)if ((r = this[i] - a[i]) != 0)return r;
  return 0;
};

function e2ee_q(x) {
  var r = 1, K;
  if ((K = x >>> 16) != 0) {
    x = K;
    r += 16;
  }
  if ((K = x >> 8) != 0) {
    x = K;
    r += 8;
  }
  if ((K = x >> 4) != 0) {
    x = K;
    r += 4;
  }
  if ((K = x >> 2) != 0) {
    x = K;
    r += 2;
  }
  if ((K = x >> 1) != 0) {
    x = K;
    r += 1;
  }
  return r;
};

function e2ee_w() {
  if (this.K <= 0)return 0;
  return this.T * (this.K - 1) + e2ee_q(this[this.K - 1] ^ (this.s & this.bP));
};

function e2ee_aG(n, r) {
  var i;
  for (i = this.K - 1; i >= 0; --i)r[i + n] = this[i];
  for (i = n - 1; i >= 0; --i)r[i] = 0;
  r.K = this.K + n;
  r.s = this.s;
};

function e2ee_at(n, r) {
  for (var i = n; i < this.K; ++i)r[i - n] = this[i];
  r.K = Math.max(this.K - n, 0);
  r.s = this.s;
};

function e2ee_bx(n, r) {
  var bc = n % this.T;
  var aD = this.T - bc;
  var aU = (1 << aD) - 1;
  var aX = Math.floor(n / this.T), c = (this.s << bc) & this.bP, i;
  for (i = this.K - 1; i >= 0; --i) {
    r[i + aX + 1] = (this[i] >> aD) | c;
    c = (this[i] & aU) << bc;
  }
  for (i = aX - 1; i >= 0; --i)r[i] = 0;
  r[aX] = c;
  r.K = this.K + aX + 1;
  r.s = this.s;
  r.bq();
};

function e2ee_bj(n, r) {
  r.s = this.s;
  var aX = Math.floor(n / this.T);
  if (aX >= this.K) {
    r.K = 0;
    return;
  }
  var bc = n % this.T;
  var aD = this.T - bc;
  var aU = (1 << bc) - 1;
  r[0] = this[aX] >> bc;
  for (var i = aX + 1; i < this.K; ++i) {
    r[i - aX - 1] |= (this[i] & aU) << aD;
    r[i - aX] = this[i] >> bc;
  }
  if (bc > 0) r[this.K - aX - 1] |= (this.s & aU) << aD;
  r.K = this.K - aX;
  r.bq();
};

function e2ee_bq(a, r) {
  var i = 0, c = 0, m = Math.min(a.K, this.K);
  while (i < m) {
    c += this[i] - a[i];
    r[i++] = c & this.bP;
    c >>= this.T;
  }
  if (a.K < this.K) {
    c -= a.s;
    while (i < this.K) {
      c += this[i];
      r[i++] = c & this.bP;
      c >>= this.T;
    }
    c += this.s;
  } else {
    c += this.s;
    while (i < a.K) {
      c -= a[i];
      r[i++] = c & this.bP;
      c >>= this.T;
    }
    c -= a.s;
  }
  r.s = (c < 0) ? -1 : 0;
  if (c < -1) r[i++] = this.af + c; else if (c > 0) r[i++] = c;
  r.K = i;
  r.bq();
};

function e2ee_bN(a, r) {
  var x = this.abs(), y = a.abs();
  var i = x.K;
  r.K = i + y.K;
  while (--i >= 0)r[i] = 0;
  for (i = 0; i < y.K; ++i)r[i + x.K] = x.ac(0, y[i], r, i, 0, x.K);
  r.s = 0;
  r.bq();
  if (this.s != a.s) e2ee_v.ZERO.V(r, r);
};

function e2ee_al(r) {
  var x = this.abs();
  var i = r.K = 2 * x.K;
  while (--i >= 0)r[i] = 0;
  for (i = 0; i < x.K - 1; ++i) {
    var c = x.ac(i, x[i], r, 2 * i, 0, 1);
    if ((r[i + x.K] += x.ac(i + 1, 2 * x[i], r, 2 * i + 1, c, x.K - i - 1)) >= x.af) {
      r[i + x.K] -= x.af;
      r[i + x.K + 1] = 1;
    }
  }
  if (r.K > 0) r[r.K - 1] += x.ac(i, x[i], r, 2 * i, 0, 1);
  r.s = 0;
  r.bq();
};

function e2ee_bI(m, q, r) {
  var as = m.abs();
  if (as.K <= 0)return;
  var pt = this.abs();
  if (pt.K < as.K) {
    if (q != null) q.bC(0);
    if (r != null) this.aM(r);
    return;
  }
  if (r == null) r = e2ee_N();
  var y = e2ee_N(), aj = this.s, ms = m.s;
  var bH = this.T - e2ee_q(as[as.K - 1]);
  if (bH > 0) {
    as.aZ(bH, y);
    pt.aZ(bH, r);
  } else {
    as.aM(y);
    pt.aM(r);
  }
  var bI = y.K;
  var bw = y[bI - 1];
  if (bw == 0)return;
  var bB = bw * (1 << this.bK) + ((bI > 1) ? y[bI - 2] >> this.aR : 0);
  var bo = this.bj / bB, bN = (1 << this.bK) / bB, e = 1 << this.aR;
  var i = r.K, O = i - bI, K = (q == null) ? e2ee_N() : q;
  y.bO(O, K);
  if (r.aO(K) >= 0) {
    r[r.K++] = 1;
    r.V(K, r);
  }
  e2ee_v.ONE.bO(bI, K);
  K.V(y, y);
  while (y.K < bI)y[y.K++] = 0;
  while (--O >= 0) {
    var aq = (r[--i] == bw) ? this.bP : Math.floor(r[i] * bo + (r[i - 1] + e) * bN);
    if ((r[i] += y.ac(0, aq, r, O, 0, bI)) < aq) {
      y.bO(O, K);
      r.V(K, r);
      while (r[i] < --aq)r.V(K, r);
    }
  }
  if (q != null) {
    r.aa(bI, q);
    if (aj != ms) e2ee_v.ZERO.V(q, q);
  }
  r.K = bI;
  r.bq();
  if (bH > 0) r.aY(bH, r);
  if (aj < 0) e2ee_v.ZERO.V(r, r);
};

function e2ee_L(a) {
  var r = e2ee_N();
  this.abs().bk(a, null, r);
  if (this.s < 0 && r.aO(e2ee_v.ZERO) > 0) a.V(r, r);
  return r;
};

function e2ee_M(m) {
  this.m = m;
};

function e2ee_bp(x) {
  if (x.s < 0 || x.aO(this.m) >= 0)return x.dR(this.m); else return x;
};

function e2ee_ac(x) {
  return x;
};

function e2ee_bh(x) {
  x.bk(this.m, null, x);
};

function e2ee_aH(x, y, r) {
  x.aL(y, r);
  this.reduce(r);
};

function e2ee_bS(x, r) {
  x.aG(r);
  this.reduce(r);
};

e2ee_M.prototype.convert = e2ee_bp;
e2ee_M.prototype.revert = e2ee_ac;
e2ee_M.prototype.reduce = e2ee_bh;
e2ee_M.prototype.bL = e2ee_aH;
e2ee_M.prototype.ap = e2ee_bS;

function e2ee_bT() {
  if (this.K < 1)return 0;
  var x = this[0];
  if ((x & 1) == 0)return 0;
  var y = x & 3;
  y = (y * (2 - (x & 0xf) * y)) & 0xf;
  y = (y * (2 - (x & 0xff) * y)) & 0xff;
  y = (y * (2 - (((x & 0xffff) * y) & 0xffff))) & 0xffff;
  y = (y * (2 - x * y % this.af)) % this.af;
  return (y > 0) ? this.af - y : -y;
};

function e2ee_F(m) {
  this.m = m;
  this.ao = m.dv();
  this.aE = this.ao & 0x7fff;
  this.cg = this.ao >> 15;
  this.az = (1 << (m.T - 15)) - 1;
  this.aP = 2 * m.K;
};

function e2ee_ap(x) {
  var r = e2ee_N();
  x.abs().bO(this.m.K, r);
  r.bk(this.m, null, r);
  if (x.s < 0 && r.aO(e2ee_v.ZERO) > 0) this.m.V(r, r);
  return r;
};

function e2ee_Q(x) {
  var r = e2ee_N();
  x.aM(r);
  this.reduce(r);
  return r;
};

function e2ee_d(x) {
  while (x.K <= this.aP)x[x.K++] = 0;
  for (var i = 0; i < this.m.K; ++i) {
    var O = x[i] & 0x7fff;
    var aF = (O * this.aE + (((O * this.cg + (x[i] >> 15) * this.aE) & this.az) << 15)) & x.bP;
    O = i + this.m.K;
    x[O] += this.m.ac(0, aF, x, i, 0, this.m.K);
    while (x[O] >= x.af) {
      x[O] -= x.af;
      x[++O]++;
    }
  }
  x.bq();
  x.aa(this.m.K, x);
  if (x.aO(this.m) >= 0) x.V(this.m, x);
};

function e2ee_j(x, r) {
  x.aG(r);
  this.reduce(r);
};function e2ee_b(x, y, r) {
  x.aL(y, r);
  this.reduce(r);
};

e2ee_F.prototype.convert = e2ee_ap;
e2ee_F.prototype.revert = e2ee_Q;
e2ee_F.prototype.reduce = e2ee_d;
e2ee_F.prototype.bL = e2ee_b;
e2ee_F.prototype.ap = e2ee_j;

function e2ee_bJ() {
  return ((this.K > 0) ? (this[0] & 1) : this.s) == 0;
};

function e2ee_as(e, z) {
  if (e > 0xffffffff || e < 1)return e2ee_v.ONE;
  var r = e2ee_N(), r2 = e2ee_N(), g = z.convert(this), i = e2ee_q(e) - 1;
  g.aM(r);
  while (--i >= 0) {
    z.ap(r, r2);
    if ((e & (1 << i)) > 0) z.bL(r2, g, r); else {
      var K = r;
      r = r2;
      r2 = K;
    }
  }
  return z.revert(r);
};

function e2ee_be(e, m) {
  var z;
  if (e < 256 || m.bv()) z = new e2ee_M(m); else z = new e2ee_F(m);
  return this.exp(e, z);
};

e2ee_v.prototype.aM = e2ee_aq;
e2ee_v.prototype.bC = e2ee_aV;
e2ee_v.prototype.aB = e2ee_br;
e2ee_v.prototype.bq = e2ee_bw;
e2ee_v.prototype.bO = e2ee_aG;
e2ee_v.prototype.aa = e2ee_at;
e2ee_v.prototype.aZ = e2ee_bx;
e2ee_v.prototype.aY = e2ee_bj;
e2ee_v.prototype.V = e2ee_bq;
e2ee_v.prototype.aL = e2ee_bN;
e2ee_v.prototype.aG = e2ee_al;
e2ee_v.prototype.bk = e2ee_bI;
e2ee_v.prototype.dv = e2ee_bT;
e2ee_v.prototype.bv = e2ee_bJ;
e2ee_v.prototype.exp = e2ee_as;
e2ee_v.prototype.toString = e2ee_ba;
e2ee_v.prototype.by = e2ee_ai;
e2ee_v.prototype.abs = e2ee_i;
e2ee_v.prototype.aO = e2ee_l;
e2ee_v.prototype.bS = e2ee_w;
e2ee_v.prototype.dR = e2ee_L;
e2ee_v.prototype.cr = e2ee_be;
e2ee_v.ZERO = e2ee_u(0);
e2ee_v.ONE = e2ee_u(1);
