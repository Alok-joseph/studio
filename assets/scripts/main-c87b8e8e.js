! function t(e, n, i) {
    function r(a, o) {
        if (!n[a]) {
            if (!e[a]) {
                var h = "function" == typeof require && require;
                if (!o && h) return h(a, !0);
                if (s) return s(a, !0);
                var l = new Error("Cannot find module '" + a + "'");
                throw l.code = "MODULE_NOT_FOUND", l
            }
            var p = n[a] = {
                exports: {}
            };
            e[a][0].call(p.exports, function(t) {
                var n = e[a][1][t];
                return r(n ? n : t)
            }, p, p.exports, t, e, n, i)
        }
        return n[a].exports
    }
    for (var s = "function" == typeof require && require, a = 0; a < i.length; a++) r(i[a]);
    return r
}({
    1: [function(require, module, exports) {
        ! function(t, e) {
            "function" == typeof define && define.amd ? define(e) : "object" == typeof module && module.exports ? module.exports = e() : t.bodymovin = e()
        }(window, function() {
            function roundValues(t) {
                bm_rnd = t ? Math.round : function(t) {
                    return t
                }
            }

            function roundTo2Decimals(t) {
                return Math.round(1e4 * t) / 1e4
            }

            function roundTo3Decimals(t) {
                return Math.round(100 * t) / 100
            }

            function styleDiv(t) {
                t.style.position = "absolute", t.style.top = 0, t.style.left = 0, t.style.display = "block", t.style.transformOrigin = t.style.webkitTransformOrigin = "0 0", t.style.backfaceVisibility = t.style.webkitBackfaceVisibility = "visible", t.style.transformStyle = t.style.webkitTransformStyle = t.style.mozTransformStyle = "preserve-3d"
            }

            function styleUnselectableDiv(t) {
                t.style.userSelect = "none", t.style.MozUserSelect = "none", t.style.webkitUserSelect = "none", t.style.oUserSelect = "none"
            }

            function BMEnterFrameEvent(t, e, n, i) {
                this.type = t, this.currentTime = e, this.totalTime = n, this.direction = 0 > i ? -1 : 1
            }

            function BMCompleteEvent(t, e) {
                this.type = t, this.direction = 0 > e ? -1 : 1
            }

            function BMCompleteLoopEvent(t, e, n, i) {
                this.type = t, this.currentLoop = e, this.totalLoops = n, this.direction = 0 > i ? -1 : 1
            }

            function BMSegmentStartEvent(t, e, n) {
                this.type = t, this.firstFrame = e, this.totalFrames = n
            }

            function BMDestroyEvent(t, e) {
                this.type = t, this.target = e
            }

            function _addEventListener(t, e) {
                this._cbs[t] || (this._cbs[t] = []), this._cbs[t].push(e)
            }

            function _removeEventListener(t, e) {
                if (e) {
                    if (this._cbs[t]) {
                        for (var n = 0, i = this._cbs[t].length; i > n;) this._cbs[t][n] === e && (this._cbs[t].splice(n, 1), n -= 1, i -= 1), n += 1;
                        this._cbs[t].length || (this._cbs[t] = null)
                    }
                } else this._cbs[t] = null
            }

            function _triggerEvent(t, e) {
                if (this._cbs[t])
                    for (var n = this._cbs[t].length, i = 0; n > i; i++) this._cbs[t][i](e)
            }

            function randomString(t, e) {
                void 0 === e && (e = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890");
                var n, i = "";
                for (n = t; n > 0; --n) i += e[Math.round(Math.random() * (e.length - 1))];
                return i
            }

            function HSVtoRGB(t, e, n) {
                var i, r, s, a, o, h, l, p;
                switch (1 === arguments.length && (e = t.s, n = t.v, t = t.h), a = Math.floor(6 * t), o = 6 * t - a, h = n * (1 - e), l = n * (1 - o * e), p = n * (1 - (1 - o) * e), a % 6) {
                    case 0:
                        i = n, r = p, s = h;
                        break;
                    case 1:
                        i = l, r = n, s = h;
                        break;
                    case 2:
                        i = h, r = n, s = p;
                        break;
                    case 3:
                        i = h, r = l, s = n;
                        break;
                    case 4:
                        i = p, r = h, s = n;
                        break;
                    case 5:
                        i = n, r = h, s = l
                }
                return [Math.round(255 * i), Math.round(255 * r), Math.round(255 * s)]
            }

            function RGBtoHSV(t, e, n) {
                1 === arguments.length && (e = t.g, n = t.b, t = t.r);
                var i, r = Math.max(t, e, n),
                    s = Math.min(t, e, n),
                    a = r - s,
                    o = 0 === r ? 0 : a / r,
                    h = r / 255;
                switch (r) {
                    case s:
                        i = 0;
                        break;
                    case t:
                        i = e - n + a * (n > e ? 6 : 0), i /= 6 * a;
                        break;
                    case e:
                        i = n - t + 2 * a, i /= 6 * a;
                        break;
                    case n:
                        i = t - e + 4 * a, i /= 6 * a
                }
                return [i, o, h]
            }

            function addSaturationToRGB(t, e) {
                var n = RGBtoHSV(t[0], t[1], t[2]);
                return n[1] += e, n[1] > 1 ? n[1] = 1 : n[1] <= 0 && (n[1] = 0), HSVtoRGB(n[0], n[1], n[2])
            }

            function addBrightnessToRGB(t, e) {
                var n = RGBtoHSV(t[0], t[1], t[2]);
                return n[2] += e, n[2] > 1 ? n[2] = 1 : n[2] < 0 && (n[2] = 0), HSVtoRGB(n[0], n[1], n[2])
            }

            function addHueToRGB(t, e) {
                var n = RGBtoHSV(t[0], t[1], t[2]);
                return n[0] += e / 360, n[0] > 1 ? n[0] -= 1 : n[0] < 0 && (n[0] += 1), HSVtoRGB(n[0], n[1], n[2])
            }

            function componentToHex(t) {
                var e = t.toString(16);
                return 1 == e.length ? "0" + e : e
            }

            function fillToRgba(t, e) {
                if (!cachedColors[t]) {
                    var n = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(t);
                    cachedColors[t] = parseInt(n[1], 16) + "," + parseInt(n[2], 16) + "," + parseInt(n[3], 16)
                }
                return "rgba(" + cachedColors[t] + "," + e + ")"
            }

            function RenderedFrame(t, e) {
                this.tr = t, this.o = e
            }

            function LetterProps(t, e, n, i, r, s) {
                this.o = t, this.sw = e, this.sc = n, this.fc = i, this.m = r, this.props = s
            }

            function iterateDynamicProperties(t) {
                var e, n = this.dynamicProperties;
                for (e = 0; n > e; e += 1) this.dynamicProperties[e].getValue(t)
            }

            function reversePath(t, e) {
                var n, i, r = [],
                    s = [],
                    a = [],
                    o = {},
                    h = 0;
                e && (r[0] = t.o[0], s[0] = t.i[0], a[0] = t.v[0], h = 1), i = t.i.length;
                var l = i - 1;
                for (n = h; i > n; n += 1) r.push(t.o[l]), s.push(t.i[l]), a.push(t.v[l]), l -= 1;
                return o.i = r, o.o = s, o.v = a, o
            }

            function Matrix() {}

            function matrixManagerFunction() {
                var t = new Matrix,
                    e = function(e, n, i, r, s) {
                        return t.reset().translate(r, s).rotate(e).scale(n, i).toCSS()
                    },
                    n = function(t) {
                        return e(t.tr.r[2], t.tr.s[0], t.tr.s[1], t.tr.p[0], t.tr.p[1])
                    };
                return {
                    getMatrix: n
                }
            }

            function createElement(t, e, n) {
                if (!e) {
                    var i = Object.create(t.prototype, n),
                        r = {};
                    return i && "[object Function]" === r.toString.call(i.init) && i.init(), i
                }
                e.prototype = Object.create(t.prototype), e.prototype.constructor = e, e.prototype.parent = t.prototype
            }

            function extendPrototype(t, e) {
                for (var n in t.prototype) t.prototype.hasOwnProperty(n) && (e.prototype[n] = t.prototype[n])
            }

            function bezFunction() {
                function t(t, e, n, i, r, s) {
                    var a = t * i + e * r + n * s - r * i - s * t - n * e;
                    return a > -1e-4 && 1e-4 > a
                }

                function e(e, n, i, r, s, a, o, h, l) {
                    return t(e, n, r, s, o, h) && t(e, i, r, a, o, l)
                }

                function n(t) {
                    this.segmentLength = 0, this.points = new Array(t)
                }

                function i(t, e) {
                    this.partialLength = t, this.point = e
                }

                function r(t, e) {
                    var n = e.segments,
                        i = n.length,
                        r = bm_floor((i - 1) * t),
                        s = t * e.addedLength,
                        a = 0;
                    if (s == n[r].l) return n[r].p;
                    for (var o = n[r].l > s ? -1 : 1, h = !0; h;) n[r].l <= s && n[r + 1].l > s ? (a = (s - n[r].l) / (n[r + 1].l - n[r].l), h = !1) : r += o, (0 > r || r >= i - 1) && (h = !1);
                    return n[r].p + (n[r + 1].p - n[r].p) * a
                }

                function s() {
                    this.pt1 = new Array(2), this.pt2 = new Array(2), this.pt3 = new Array(2), this.pt4 = new Array(2)
                }

                function a(t, e, n, i, a, o, h) {
                    var l = new s;
                    a = 0 > a ? 0 : a;
                    var p = r(a, h);
                    o = o > 1 ? 1 : o;
                    var u, c = r(o, h),
                        f = t.length,
                        m = 1 - p,
                        d = 1 - c;
                    for (u = 0; f > u; u += 1) l.pt1[u] = m * m * m * t[u] + (p * m * m + m * p * m + m * m * p) * n[u] + (p * p * m + m * p * p + p * m * p) * i[u] + p * p * p * e[u], l.pt3[u] = m * m * d * t[u] + (p * m * d + m * p * d + m * m * c) * n[u] + (p * p * d + m * p * c + p * m * c) * i[u] + p * p * c * e[u], l.pt4[u] = m * d * d * t[u] + (p * d * d + m * c * d + m * d * c) * n[u] + (p * c * d + m * c * c + p * d * c) * i[u] + p * c * c * e[u], l.pt2[u] = d * d * d * t[u] + (c * d * d + d * c * d + d * d * c) * n[u] + (c * c * d + d * c * c + c * d * c) * i[u] + c * c * c * e[u];
                    return l
                }
                var o = (Math, function() {
                        function t(t, e) {
                            this.l = t, this.p = e
                        }
                        var e = {};
                        return function(n, i, r, s) {
                            var a = (n.join("_") + "_" + i.join("_") + "_" + r.join("_") + "_" + s.join("_")).replace(/\./g, "p");
                            if (e[a]) return e[a];
                            var o, h, l, p, u, c, f = defaultCurveSegments,
                                m = 0,
                                d = [],
                                v = [],
                                g = {
                                    addedLength: 0,
                                    segments: []
                                };
                            for (l = r.length, o = 0; f > o; o += 1) {
                                for (u = o / (f - 1), c = 0, h = 0; l > h; h += 1) p = bm_pow(1 - u, 3) * n[h] + 3 * bm_pow(1 - u, 2) * u * r[h] + 3 * (1 - u) * bm_pow(u, 2) * s[h] + bm_pow(u, 3) * i[h], d[h] = p, null !== v[h] && (c += bm_pow(d[h] - v[h], 2)), v[h] = d[h];
                                c && (c = bm_sqrt(c), m += c), g.segments.push(new t(m, u))
                            }
                            return g.addedLength = m, e[a] = g, g
                        }
                    }()),
                    h = function() {
                        var e = {};
                        return function(r) {
                            var s = r.s,
                                a = r.e,
                                o = r.to,
                                h = r.ti,
                                l = (s.join("_") + "_" + a.join("_") + "_" + o.join("_") + "_" + h.join("_")).replace(/\./g, "p");
                            if (e[l]) return void(r.bezierData = e[l]);
                            var p, u, c, f, m, d, v, g = defaultCurveSegments,
                                y = 0,
                                b = null;
                            2 === s.length && (s[0] != a[0] || s[1] != a[1]) && t(s[0], s[1], a[0], a[1], s[0] + o[0], s[1] + o[1]) && t(s[0], s[1], a[0], a[1], a[0] + h[0], a[1] + h[1]) && (g = 2);
                            var w = new n(g);
                            for (c = o.length, p = 0; g > p; p += 1) {
                                for (v = new Array(c), m = p / (g - 1), d = 0, u = 0; c > u; u += 1) f = bm_pow(1 - m, 3) * s[u] + 3 * bm_pow(1 - m, 2) * m * (s[u] + o[u]) + 3 * (1 - m) * bm_pow(m, 2) * (a[u] + h[u]) + bm_pow(m, 3) * a[u], v[u] = f, null !== b && (d += bm_pow(v[u] - b[u], 2));
                                d = bm_sqrt(d), y += d, w.points[p] = new i(d, v), b = v
                            }
                            w.segmentLength = y, r.bezierData = w, e[l] = w
                        }
                    }();
                return {
                    getBezierLength: o,
                    getNewSegment: a,
                    buildBezierData: h,
                    pointOnLine2D: t,
                    pointOnLine3D: e
                }
            }

            function dataFunctionManager() {
                function t(r, a, o) {
                    var h, l, p, u, c, f, m, d, v = r.length;
                    for (u = 0; v > u; u += 1)
                        if (h = r[u], "ks" in h && !h.completed) {
                            if (h.completed = !0, h.tt && (r[u - 1].td = h.tt), l = [], p = -1, h.hasMask) {
                                var g = h.masksProperties;
                                for (f = g.length, c = 0; f > c; c += 1)
                                    if (g[c].pt.k.i) i(g[c].pt.k);
                                    else
                                        for (d = g[c].pt.k.length, m = 0; d > m; m += 1) g[c].pt.k[m].s && i(g[c].pt.k[m].s[0]), g[c].pt.k[m].e && i(g[c].pt.k[m].e[0])
                            }
                            0 === h.ty ? (h.layers = e(h.refId, a), t(h.layers, a, o)) : 4 === h.ty ? n(h.shapes, !1) : 5 == h.ty && s(h, o)
                        }
                }

                function e(t, e) {
                    for (var n = 0, i = e.length; i > n;) {
                        if (e[n].id === t) return JSON.parse(JSON.stringify(e[n].layers));
                        n += 1
                    }
                }

                function n(t, e) {
                    var r, s, a, o = t.length,
                        h = e ? e : !1;
                    for (r = o - 1; r >= 0; r -= 1)
                        if ("tm" == t[r].ty && (h = !0), "sh" == t[r].ty)
                            if (t[r].trimmed = h, t[r].ks.k.i) i(t[r].ks.k);
                            else
                                for (a = t[r].ks.k.length, s = 0; a > s; s += 1) t[r].ks.k[s].s && i(t[r].ks.k[s].s[0]), t[r].ks.k[s].e && i(t[r].ks.k[s].e[0]);
                    else "gr" == t[r].ty ? n(t[r].it, h) : ("el" == t[r].ty || "rc" == t[r].ty) && (t[r].trimmed = h)
                }

                function i(t) {
                    var e, n = t.i.length;
                    for (e = 0; n > e; e += 1) t.i[e][0] += t.v[e][0], t.i[e][1] += t.v[e][1], t.o[e][0] += t.v[e][0], t.o[e][1] += t.v[e][1]
                }

                function r(e, n) {
                    t(e.layers, e.assets, n)
                }

                function s(t, e) {
                    var n, i, r, s, a, o, h, l = [],
                        p = t.t.d,
                        u = 0,
                        c = t.t.m.g,
                        f = 0,
                        m = 0,
                        d = 0,
                        v = [],
                        g = 0,
                        y = 0,
                        b = e.getFontByName(p.f),
                        w = 0,
                        E = b.fStyle.split(" "),
                        C = "normal",
                        _ = "normal";
                    for (i = E.length, n = 0; i > n; n += 1) "italic" === E[n].toLowerCase() ? _ = "italic" : "bold" === E[n].toLowerCase() ? C = "700" : "black" === E[n].toLowerCase() ? C = "900" : "medium" === E[n].toLowerCase() ? C = "500" : "regular" === E[n].toLowerCase() || "normal" === E[n].toLowerCase() ? C = "400" : ("light" === E[n].toLowerCase() || "thin" === E[n].toLowerCase()) && (C = "200");
                    if (p.fWeight = C, p.fStyle = _, i = p.t.length, p.sz) {
                        var x = p.sz[0],
                            S = -1;
                        for (n = 0; i > n; n += 1) r = !1, " " === p.t.charAt(n) ? S = n : 13 === p.t.charCodeAt(n) && (g = 0, r = !0), e.chars ? (h = e.getCharData(p.t.charAt(n), b.fStyle, b.fFamily), w = r ? 0 : h.w * p.s / 100) : w = e.measureText(p.t.charAt(n), p.f, p.s), g + w > x ? (-1 === S ? (p.t = p.t.substr(0, n) + "\r" + p.t.substr(n), i += 1) : (n = S, p.t = p.t.substr(0, n) + "\r" + p.t.substr(n + 1)), S = -1, g = 0) : g += w;
                        i = p.t.length
                    }
                    for (g = 0, w = 0, n = 0; i > n; n += 1)
                        if (r = !1, " " === p.t.charAt(n) ? s = "\xa0" : 13 === p.t.charCodeAt(n) ? (v.push(g), y = g > y ? g : y, g = 0, s = "", r = !0, d += 1) : s = p.t.charAt(n), e.chars ? (h = e.getCharData(p.t.charAt(n), b.fStyle, e.getFontByName(p.f).fFamily), w = r ? 0 : h.w * p.s / 100) : w = e.measureText(s, p.f, p.s), g += w, l.push({
                                l: w,
                                an: w,
                                add: f,
                                n: r,
                                anIndexes: [],
                                val: s,
                                line: d
                            }), 2 == c) {
                            if (f += w, "" == s || "\xa0" == s || n == i - 1) {
                                for (("" == s || "\xa0" == s) && (f -= w); n >= m;) l[m].an = f, l[m].ind = u, l[m].extra = w, m += 1;
                                u += 1, f = 0
                            }
                        } else if (3 == c) {
                        if (f += w, "" == s || n == i - 1) {
                            for ("" == s && (f -= w); n >= m;) l[m].an = f, l[m].ind = u, l[m].extra = w, m += 1;
                            f = 0, u += 1
                        }
                    } else l[u].ind = u, l[u].extra = 0, u += 1;
                    if (p.l = l, y = g > y ? g : y, v.push(g), p.sz) p.boxWidth = p.sz[0], t.t.d.justifyOffset = 0;
                    else switch (p.boxWidth = y, p.j) {
                        case 1:
                            t.t.d.justifyOffset = -p.boxWidth;
                            break;
                        case 2:
                            t.t.d.justifyOffset = -p.boxWidth / 2;
                            break;
                        default:
                            t.t.d.justifyOffset = 0
                    }
                    p.lineWidths = v;
                    var A = t.t.a;
                    o = A.length;
                    var k, P, T = [];
                    for (a = 0; o > a; a += 1) {
                        for (A[a].a.sc && (p.strokeColorAnim = !0), A[a].a.sw && (p.strokeWidthAnim = !0), (A[a].a.fc || A[a].a.fh || A[a].a.fs || A[a].a.fb) && (p.fillColorAnim = !0), P = 0, k = A[a].s.b, n = 0; i > n; n += 1) l[n].anIndexes[a] = P, (1 == k && "" != l[n].val || 2 == k && "" != l[n].val && "\xa0" != l[n].val || 3 == k && (l[n].n || "\xa0" == l[n].val || n == i - 1) || 4 == k && (l[n].n || n == i - 1)) && (1 === A[a].s.rn && T.push(P), P += 1);
                        t.t.a[a].s.totalChars = P;
                        var M, D = -1;
                        if (1 === A[a].s.rn)
                            for (n = 0; i > n; n += 1) D != l[n].anIndexes[a] && (D = l[n].anIndexes[a], M = T.splice(Math.floor(Math.random() * T.length), 1)[0]), l[n].anIndexes[a] = M
                    }
                    0 !== o || "m" in t.t.p || (t.singleShape = !0), p.yOffset = 1.2 * p.s, p.ascent = b.ascent * p.s / 100
                }
                var a = {};
                return a.completeData = r, a
            }

            function ExpressionComp() {}

            function ShapeInterface() {}

            function LayerInterface() {}

            function SVGRenderer(t) {
                this.animationItem = t, this.layers = null, this.renderedFrame = -1, this.globalData = {
                    frameNum: -1
                }, this.elements = [], this.destroyed = !1
            }

            function CanvasRenderer(t, e) {
                this.animationItem = t, this.renderConfig = {
                    clearCanvas: e && e.clearCanvas || !0,
                    context: e && e.context || null,
                    scaleMode: e && e.scaleMode || "fit"
                }, this.renderConfig.dpr = e && e.dpr || 1, this.animationItem.wrapper && (this.renderConfig.dpr = e && e.dpr || window.devicePixelRatio || 1), this.renderedFrame = -1, this.globalData = {
                    frameNum: -1
                }, this.contextData = {
                    saved: new Array(15),
                    savedOp: new Array(15),
                    cArrPos: 0,
                    cTr: new Matrix,
                    cO: 1
                };
                var n, i = 15;
                for (n = 0; i > n; n += 1) this.contextData.saved[n] = new Array(16);
                this.elements = [], this.transformMat = new Matrix
            }

            function HybridRenderer(t) {
                this.animationItem = t, this.layers = null, this.renderedFrame = -1, this.globalData = {
                    frameNum: -1
                }, this.elements = [], this.threeDElements = [], this.destroyed = !1, this.camera = null
            }

            function MaskElement(t, e, n) {
                this.dynamicProperties = [], this.data = t, this.element = e, this.globalData = n, this.paths = [], this.storedData = [], this.masksProperties = this.data.masksProperties, this.viewData = new Array(this.masksProperties.length), this.maskElement = null, this.firstFrame = !0;
                var i, r, s, a, o, h, l, p, u = (this.element.maskedElement, this.globalData.defs),
                    c = this.masksProperties.length,
                    f = this.masksProperties,
                    m = 0,
                    d = [],
                    v = randomString(10),
                    g = "clipPath",
                    y = "clip-path";
                for (i = 0; c > i; i++)
                    if (("a" !== f[i].mode && "n" !== f[i].mode || f[i].inv) && (g = "mask", y = "mask"), "s" != f[i].mode && "i" != f[i].mode || 0 != m || (o = document.createElementNS(svgNS, "rect"), o.setAttribute("fill", "#ffffff"), o.setAttribute("x", "0"), o.setAttribute("y", "0"), o.setAttribute("width", "100%"), o.setAttribute("height", "100%"), d.push(o)), "n" != f[i].mode && f[i].cl !== !1) {
                        if (m += 1, r = document.createElementNS(svgNS, "path"), f[i].cl ? "s" == f[i].mode ? r.setAttribute("fill", "#000000") : r.setAttribute("fill", "#ffffff") : (r.setAttribute("fill", "none"), "s" == f[i].mode ? r.setAttribute("fill", "#000000") : r.setAttribute("fill", "#ffffff"), r.setAttribute("stroke-width", "1"), r.setAttribute("stroke-miterlimit", "10")), r.setAttribute("clip-rule", "nonzero"), 0 !== f[i].x.k) {
                            g = "mask", y = "mask", p = PropertyFactory.getProp(this.element, f[i].x, 0, null, this.dynamicProperties);
                            var b = "fi_" + randomString(10);
                            h = document.createElementNS(svgNS, "filter"), h.setAttribute("id", b), l = document.createElementNS(svgNS, "feMorphology"), l.setAttribute("operator", "dilate"), l.setAttribute("in", "SourceGraphic"), l.setAttribute("radius", "0"), h.appendChild(l), u.appendChild(h), "s" == f[i].mode ? r.setAttribute("stroke", "#000000") : r.setAttribute("stroke", "#ffffff")
                        } else l = null, p = null;
                        if (this.storedData[i] = {
                                elem: r,
                                x: p,
                                expan: l,
                                lastPath: "",
                                lastOperator: "",
                                filterId: b,
                                lastRadius: 0
                            }, "i" == f[i].mode) {
                            a = d.length;
                            var w = document.createElementNS(svgNS, "g");
                            for (s = 0; a > s; s += 1) w.appendChild(d[s]);
                            var E = document.createElementNS(svgNS, "mask");
                            E.setAttribute("mask-type", "alpha"), E.setAttribute("id", v + "_" + m), E.appendChild(r), u.appendChild(E), w.setAttribute("mask", "url(#" + v + "_" + m + ")"), d.length = 0, d.push(w)
                        } else d.push(r);
                        f[i].inv && !this.solidPath && (this.solidPath = this.createLayerSolidPath()), this.viewData[i] = {
                            elem: r,
                            lastPath: "",
                            prop: PropertyFactory.getShapeProp(this.element, f[i], 3, this.dynamicProperties, null)
                        }, this.viewData[i].prop.k || this.drawPath(f[i], this.viewData[i].prop.v, this.viewData[i])
                    } else this.viewData[i] = {
                        prop: PropertyFactory.getShapeProp(this.element, f[i], 3, this.dynamicProperties, null)
                    };
                for (this.maskElement = document.createElementNS(svgNS, g), c = d.length, i = 0; c > i; i += 1) this.maskElement.appendChild(d[i]);
                this.maskElement.setAttribute("id", v), m > 0 && this.element.maskedElement.setAttribute(y, "url(#" + v + ")"), u.appendChild(this.maskElement)
            }

            function SliderEffect(t, e, n) {
                this.p = PropertyFactory.getProp(e, t.v, 0, 0, n)
            }

            function AngleEffect(t, e, n) {
                this.p = PropertyFactory.getProp(e, t.v, 0, 0, n)
            }

            function ColorEffect(t, e, n) {
                this.p = PropertyFactory.getProp(e, t.v, 1, 1 / 255, n)
            }

            function PointEffect(t, e, n) {
                this.p = PropertyFactory.getProp(e, t.v, 1, 0, n)
            }

            function CheckboxEffect(t, e, n) {
                this.p = PropertyFactory.getProp(e, t.v, 1, 0, n)
            }

            function EffectsManager(t, e, n) {
                this.data = t, this.element = e;
                var i = t.ef;
                this.effectElements = [];
                var r, s, a = i.length;
                for (r = 0; a > r; r++) switch (i[r].ty) {
                    case 0:
                        s = new SliderEffect(i[r], e, n), this.effectElements.push(s.proxyFunction.bind(s));
                        break;
                    case 1:
                        s = new AngleEffect(i[r], e, n), this.effectElements.push(s.proxyFunction.bind(s));
                        break;
                    case 2:
                        s = new ColorEffect(i[r], e, n), this.effectElements.push(s.proxyFunction.bind(s));
                        break;
                    case 3:
                        s = new PointEffect(i[r], e, n), this.effectElements.push(s.proxyFunction.bind(s));
                        break;
                    case 4:
                        s = new CheckboxEffect(i[r], e, n), this.effectElements.push(s.proxyFunction.bind(s))
                }
            }

            function BaseElement() {}

            function SVGBaseElement(t, e, n, i, r) {
                this.globalData = n, this.comp = i, this.data = t, this.matteElement = null, this.parentContainer = e, this.layerId = r ? r.layerId : "ly_" + randomString(10), this.placeholder = r, this.init()
            }

            function ITextElement(t, e, n, i) {}

            function SVGTextElement(t, e, n, i, r) {
                this.textSpans = [], this.renderType = "svg", this.parent.constructor.call(this, t, e, n, i, r)
            }

            function ICompElement(t, e, n, i, r) {
                this.parent.constructor.call(this, t, e, n, i, r), this.layers = t.layers, this.isSvg = !0, this.data.tm && (this.tm = PropertyFactory.getProp(this, this.data.tm, 0, n.frameRate, this.dynamicProperties))
            }

            function IImageElement(t, e, n, i, r) {
                this.assetData = n.getAssetData(t.refId), this.path = n.getPath(), this.parent.constructor.call(this, t, e, n, i, r)
            }

            function IShapeElement(t, e, n, i, r) {
                this.shapes = [], this.shapesData = t.shapes, this.stylesList = [], this.viewData = [], this.shapesContainer = document.createElementNS(svgNS, "g"), this.parent.constructor.call(this, t, e, n, i, r)
            }

            function ISolidElement(t, e, n, i, r) {
                this.parent.constructor.call(this, t, e, n, i, r)
            }

            function CVBaseElement(t, e, n) {
                this.globalData = n, this.data = t, this.comp = e, this.canvasContext = n.canvasContext, this.init()
            }

            function CVCompElement(t, e, n) {
                this.parent.constructor.call(this, t, e, n), this.layers = t.layers, this.data.tm && (this.tm = PropertyFactory.getProp(this, this.data.tm, 0, n.frameRate, this.dynamicProperties))
            }

            function CVImageElement(t, e, n) {
                this.animationItem = n.renderer.animationItem, this.assetData = this.animationItem.getAssetData(t.refId), this.path = this.animationItem.getPath(), this.parent.constructor.call(this, t, e, n), this.animationItem.pendingElements += 1
            }

            function CVMaskElement(t, e, n) {
                this.data = t, this.element = e, this.globalData = n, this.dynamicProperties = [], this.masksProperties = this.data.masksProperties, this.ctx = this.element.canvasContext, this.viewData = new Array(this.masksProperties.length);
                var i, r = this.masksProperties.length;
                for (i = 0; r > i; i++) this.viewData[i] = PropertyFactory.getShapeProp(this.element, this.masksProperties[i], 3, this.dynamicProperties, null)
            }

            function CVShapeElement(t, e, n) {
                this.shapes = [], this.stylesList = [], this.viewData = [], this.shapesData = t.shapes, this.firstFrame = !0, this.parent.constructor.call(this, t, e, n)
            }

            function CVSolidElement(t, e, n) {
                this.parent.constructor.call(this, t, e, n)
            }

            function CVTextElement(t, e, n) {
                this.textSpans = [], this.yOffset = 0, this.fillColorAnim = !1, this.strokeColorAnim = !1, this.strokeWidthAnim = !1, this.stroke = !1, this.fill = !1, this.justifyOffset = 0, this.currentRender = null, this.renderType = "canvas", this.values = {
                    fill: "rgba(0,0,0,0)",
                    stroke: "rgba(0,0,0,0)",
                    sWidth: 0,
                    fValue: ""
                }, this.parent.constructor.call(this, t, e, n)
            }

            function HBaseElement(t, e, n, i, r) {
                this.globalData = n, this.comp = i, this.data = t, this.matteElement = null, this.parentContainer = e, this.layerId = r ? r.layerId : "ly_" + randomString(10), this.placeholder = r, this.init()
            }

            function HSolidElement(t, e, n, i, r) {
                this.parent.constructor.call(this, t, e, n, i, r)
            }

            function HCompElement(t, e, n, i, r) {
                this.parent.constructor.call(this, t, e, n, i, r), this.layers = t.layers, this.isSvg = !1, this.data.tm && (this.tm = PropertyFactory.getProp(this, this.data.tm, 0, n.frameRate, this.dynamicProperties)), this.data.hasMask && (this.isSvg = !0)
            }

            function HShapeElement(t, e, n, i, r) {
                this.shapes = [], this.shapesData = t.shapes, this.stylesList = [], this.viewData = [], this.parent.constructor.call(this, t, e, n, i, r)
            }

            function HTextElement(t, e, n, i, r) {
                this.textSpans = [], this.textPaths = [], this.currentBBox = {
                    x: 999999,
                    y: -999999,
                    h: 0,
                    w: 0
                }, this.renderType = "svg", this.isMasked = !1, this.parent.constructor.call(this, t, e, n, i, r)
            }

            function HImageElement(t, e, n, i, r) {
                this.assetData = n.getAssetData(t.refId), this.path = n.getPath(), this.parent.constructor.call(this, t, e, n, i, r)
            }

            function HCameraElement(t, e, n, i, r) {
                if (this.parent.constructor.call(this, t, e, n, i, r), this.pe = PropertyFactory.getProp(this, t.pe, 0, 0, this.dynamicProperties), t.ks.p.s ? (this.px = PropertyFactory.getProp(this, t.ks.p.x, 1, 0, this.dynamicProperties), this.py = PropertyFactory.getProp(this, t.ks.p.y, 1, 0, this.dynamicProperties), this.pz = PropertyFactory.getProp(this, t.ks.p.z, 1, 0, this.dynamicProperties)) : this.p = PropertyFactory.getProp(this, t.ks.p, 1, 0, this.dynamicProperties), t.ks.a && (this.a = PropertyFactory.getProp(this, t.ks.a, 1, 0, this.dynamicProperties)), t.ks.or.k.length) {
                    var s, a = t.ks.or.k.length;
                    for (s = 0; a > s; s += 1) t.ks.or.k[s].to = null, t.ks.or.k[s].ti = null
                }
                this.or = PropertyFactory.getProp(this, t.ks.or, 1, degToRads, this.dynamicProperties), this.or.sh = !0, this.rx = PropertyFactory.getProp(this, t.ks.rx, 0, degToRads, this.dynamicProperties), this.ry = PropertyFactory.getProp(this, t.ks.ry, 0, degToRads, this.dynamicProperties), this.rz = PropertyFactory.getProp(this, t.ks.rz, 0, degToRads, this.dynamicProperties), this.mat = new Matrix
            }

            function play(t) {
                animationManager.play(t)
            }

            function pause(t) {
                animationManager.pause(t)
            }

            function togglePause(t) {
                animationManager.togglePause(t)
            }

            function setSpeed(t, e) {
                animationManager.setSpeed(t, e)
            }

            function setDirection(t, e) {
                animationManager.setDirection(t, e)
            }

            function stop(t) {
                animationManager.stop(t)
            }

            function moveFrame(t) {
                animationManager.moveFrame(t)
            }

            function searchAnimations() {
                standalone === !0 ? animationManager.searchAnimations(animationData, standalone, renderer) : animationManager.searchAnimations()
            }

            function registerAnimation(t) {
                return animationManager.registerAnimation(t)
            }

            function resize() {
                animationManager.resize()
            }

            function start() {
                animationManager.start()
            }

            function goToAndStop(t, e, n) {
                animationManager.goToAndStop(t, e, n)
            }

            function setSubframeRendering(t) {
                subframeEnabled = t
            }

            function loadAnimation(t) {
                return standalone === !0 && (t.animationData = JSON.parse(animationData)), animationManager.loadAnimation(t)
            }

            function destroy(t) {
                return animationManager.destroy(t)
            }

            function setQuality(t) {
                if ("string" == typeof t) switch (t) {
                    case "high":
                        defaultCurveSegments = 200;
                        break;
                    case "medium":
                        defaultCurveSegments = 50;
                        break;
                    case "low":
                        defaultCurveSegments = 10
                } else !isNaN(t) && t > 1 && (defaultCurveSegments = t);
                roundValues(defaultCurveSegments >= 50 ? !1 : !0)
            }

            function checkReady() {
                "complete" === document.readyState && (clearInterval(readyStateCheckInterval), searchAnimations())
            }

            function getQueryVariable(t) {
                for (var e = queryString.split("&"), n = 0; n < e.length; n++) {
                    var i = e[n].split("=");
                    if (decodeURIComponent(i[0]) == t) return decodeURIComponent(i[1])
                }
            }
            var svgNS = "http://www.w3.org/2000/svg",
                subframeEnabled = !0,
                isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent),
                cachedColors = {},
                bm_rounder = Math.round,
                bm_rnd, bm_pow = Math.pow,
                bm_sqrt = Math.sqrt,
                bm_abs = Math.abs,
                bm_floor = Math.floor,
                bm_max = Math.max,
                bm_min = Math.min,
                BMMath = {
                    pow: bm_pow,
                    random: Math.random
                },
                defaultCurveSegments = 75,
                degToRads = Math.PI / 180;
            roundValues(!1);
            var rgbToHex = function() {
                    var t, e, n = [];
                    for (t = 0; 256 > t; t += 1) e = t.toString(16), n[t] = 1 == e.length ? "0" + e : e;
                    return function(t, e, i) {
                        return 0 > t && (t = 0), 0 > e && (e = 0), 0 > i && (i = 0), "#" + n[t] + n[e] + n[i]
                    }
                }(),
                fillColorToString = function() {
                    var t = [];
                    return function(e, n) {
                        return void 0 !== n && (e[3] = n), t[e[0]] || (t[e[0]] = {}), t[e[0]][e[1]] || (t[e[0]][e[1]] = {}), t[e[0]][e[1]][e[2]] || (t[e[0]][e[1]][e[2]] = {}), t[e[0]][e[1]][e[2]][e[3]] || (t[e[0]][e[1]][e[2]][e[3]] = "rgba(" + e.join(",") + ")"), t[e[0]][e[1]][e[2]][e[3]]
                    }
                }(),
                Matrix = function() {
                    function t() {
                        return this.props[0] = 1, this.props[1] = 0, this.props[2] = 0, this.props[3] = 0, this.props[4] = 0, this.props[5] = 1, this.props[6] = 0, this.props[7] = 0, this.props[8] = 0, this.props[9] = 0, this.props[10] = 1, this.props[11] = 0, this.props[12] = 0, this.props[13] = 0, this.props[14] = 0, this.props[15] = 1, this
                    }

                    function e(t) {
                        if (0 === t) return this;
                        var e = Math.cos(t),
                            n = Math.sin(t);
                        return this._t(e, -n, 0, 0, n, e, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)
                    }

                    function n(t) {
                        if (0 === t) return this;
                        var e = Math.cos(t),
                            n = Math.sin(t);
                        return this._t(1, 0, 0, 0, 0, e, -n, 0, 0, n, e, 0, 0, 0, 0, 1)
                    }

                    function i(t) {
                        if (0 === t) return this;
                        var e = Math.cos(t),
                            n = Math.sin(t);
                        return this._t(e, 0, n, 0, 0, 1, 0, 0, -n, 0, e, 0, 0, 0, 0, 1)
                    }

                    function r(t) {
                        if (0 === t) return this;
                        var e = Math.cos(t),
                            n = Math.sin(t);
                        return this._t(e, -n, 0, 0, n, e, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)
                    }

                    function s(t, e) {
                        return this._t(1, e, t, 1, 0, 0)
                    }

                    function a(t, e) {
                        return this.shear(Math.tan(t), Math.tan(e))
                    }

                    function o(t, e) {
                        var n = Math.cos(e),
                            i = Math.sin(e);
                        return this._t(n, i, 0, 0, -i, n, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)._t(1, 0, 0, 0, Math.tan(t), 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)._t(n, -i, 0, 0, i, n, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)
                    }

                    function h(t, e, n) {
                        return n = isNaN(n) ? 1 : n, 1 == t && 1 == e && 1 == n ? this : this._t(t, 0, 0, 0, 0, e, 0, 0, 0, 0, n, 0, 0, 0, 0, 1)
                    }

                    function l(t, e, n, i, r, s, a, o, h, l, p, u, c, f, m, d) {
                        return this.props[0] = t, this.props[1] = e, this.props[2] = n, this.props[3] = i, this.props[4] = r, this.props[5] = s, this.props[6] = a, this.props[7] = o, this.props[8] = h, this.props[9] = l, this.props[10] = p, this.props[11] = u, this.props[12] = c, this.props[13] = f, this.props[14] = m, this.props[15] = d, this
                    }

                    function p(t, e, n) {
                        return n = isNaN(n) ? 0 : n, 0 !== t || 0 !== e || 0 !== n ? this._t(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, t, e, n, 1) : this
                    }

                    function u(t, e, n, i, r, s, a, o, h, l, p, u, c, f, m, d) {
                        if (1 === t && 0 === e && 0 === n && 0 === i && 0 === r && 1 === s && 0 === a && 0 === o && 0 === h && 0 === l && 1 === p && 0 === u) return (0 !== c || 0 !== f || 0 !== m) && (this.props[12] = this.props[12] * t + this.props[13] * r + this.props[14] * h + this.props[15] * c, this.props[13] = this.props[12] * e + this.props[13] * s + this.props[14] * l + this.props[15] * f, this.props[14] = this.props[12] * n + this.props[13] * a + this.props[14] * p + this.props[15] * m, this.props[15] = this.props[12] * i + this.props[13] * o + this.props[14] * u + this.props[15] * d), this;
                        var v = this.props[0],
                            g = this.props[1],
                            y = this.props[2],
                            b = this.props[3],
                            w = this.props[4],
                            E = this.props[5],
                            C = this.props[6],
                            _ = this.props[7],
                            x = this.props[8],
                            S = this.props[9],
                            A = this.props[10],
                            k = this.props[11],
                            P = this.props[12],
                            T = this.props[13],
                            M = this.props[14],
                            D = this.props[15];
                        return this.props[0] = v * t + g * r + y * h + b * c, this.props[1] = v * e + g * s + y * l + b * f, this.props[2] = v * n + g * a + y * p + b * m, this.props[3] = v * i + g * o + y * u + b * d, this.props[4] = w * t + E * r + C * h + _ * c, this.props[5] = w * e + E * s + C * l + _ * f, this.props[6] = w * n + E * a + C * p + _ * m, this.props[7] = w * i + E * o + C * u + _ * d, this.props[8] = x * t + S * r + A * h + k * c, this.props[9] = x * e + S * s + A * l + k * f, this.props[10] = x * n + S * a + A * p + k * m, this.props[11] = x * i + S * o + A * u + k * d, this.props[12] = P * t + T * r + M * h + D * c, this.props[13] = P * e + T * s + M * l + D * f, this.props[14] = P * n + T * a + M * p + D * m, this.props[15] = P * i + T * o + M * u + D * d, this
                    }

                    function c(t) {
                        var e;
                        for (e = 0; 16 > e; e += 1) t.props[e] = this.props[e]
                    }

                    function f(t) {
                        var e;
                        for (e = 0; 16 > e; e += 1) this.props[e] = t[e]
                    }

                    function m(t, e, n) {
                        return {
                            x: t * this.props[0] + e * this.props[4] + n * this.props[8] + this.props[12],
                            y: t * this.props[1] + e * this.props[5] + n * this.props[9] + this.props[13],
                            z: t * this.props[2] + e * this.props[6] + n * this.props[10] + this.props[14]
                        }
                    }

                    function d(t, e, n) {
                        return t * this.props[0] + e * this.props[4] + n * this.props[8] + this.props[12]
                    }

                    function v(t, e, n) {
                        return t * this.props[1] + e * this.props[5] + n * this.props[9] + this.props[13]
                    }

                    function g(t, e, n) {
                        return t * this.props[2] + e * this.props[6] + n * this.props[10] + this.props[14]
                    }

                    function y(t, e, n) {
                        return [t * this.props[0] + e * this.props[4] + n * this.props[8] + this.props[12], t * this.props[1] + e * this.props[5] + n * this.props[9] + this.props[13], t * this.props[2] + e * this.props[6] + n * this.props[10] + this.props[14]]
                    }

                    function b(t, e) {
                        return bm_rnd(t * this.props[0] + e * this.props[4] + this.props[12]) + "," + bm_rnd(t * this.props[1] + e * this.props[5] + this.props[13])
                    }

                    function w() {
                        return [this.props[0], this.props[1], this.props[2], this.props[3], this.props[4], this.props[5], this.props[6], this.props[7], this.props[8], this.props[9], this.props[10], this.props[11], this.props[12], this.props[13], this.props[14], this.props[15]]
                    }

                    function E() {
                        return isSafari ? "matrix3d(" + roundTo2Decimals(this.props[0]) + "," + roundTo2Decimals(this.props[1]) + "," + roundTo2Decimals(this.props[2]) + "," + roundTo2Decimals(this.props[3]) + "," + roundTo2Decimals(this.props[4]) + "," + roundTo2Decimals(this.props[5]) + "," + roundTo2Decimals(this.props[6]) + "," + roundTo2Decimals(this.props[7]) + "," + roundTo2Decimals(this.props[8]) + "," + roundTo2Decimals(this.props[9]) + "," + roundTo2Decimals(this.props[10]) + "," + roundTo2Decimals(this.props[11]) + "," + roundTo2Decimals(this.props[12]) + "," + roundTo2Decimals(this.props[13]) + "," + roundTo2Decimals(this.props[14]) + "," + roundTo2Decimals(this.props[15]) + ")" : (this.cssParts[1] = this.props.join(","), this.cssParts.join(""))
                    }

                    function C() {
                        return "matrix(" + this.props[0] + "," + this.props[1] + "," + this.props[4] + "," + this.props[5] + "," + this.props[12] + "," + this.props[13] + ")"
                    }

                    function _() {
                        return "" + this.toArray()
                    }
                    return function() {
                        this.reset = t, this.rotate = e, this.rotateX = n, this.rotateY = i, this.rotateZ = r, this.skew = a, this.skewFromAxis = o, this.shear = s, this.scale = h, this.setTransform = l, this.translate = p, this.transform = u, this.applyToPoint = m, this.applyToX = d, this.applyToY = v, this.applyToZ = g, this.applyToPointArray = y, this.applyToPointStringified = b, this.toArray = w, this.toCSS = E, this.to2dCSS = C, this.toString = _, this.clone = c, this.cloneFromProps = f, this._t = this.transform, this.props = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1], this.cssParts = ["matrix3d(", "", ")"]
                    }
                }();
            ! function(t, e) {
                function n(n, l, p) {
                    var f = [];
                    l = 1 == l ? {
                        entropy: !0
                    } : l || {};
                    var y = a(s(l.entropy ? [n, h(t)] : null == n ? o() : n, 3), f),
                        b = new i(f),
                        w = function() {
                            for (var t = b.g(c), e = d, n = 0; v > t;) t = (t + n) * u, e *= u, n = b.g(1);
                            for (; t >= g;) t /= 2, e /= 2, n >>>= 1;
                            return (t + n) / e
                        };
                    return w.int32 = function() {
                        return 0 | b.g(4)
                    }, w.quick = function() {
                        return b.g(4) / 4294967296
                    }, w["double"] = w, a(h(b.S), t), (l.pass || p || function(t, n, i, s) {
                        return s && (s.S && r(s, b), t.state = function() {
                            return r(b, {})
                        }), i ? (e[m] = t, n) : t
                    })(w, y, "global" in l ? l.global : this == e, l.state)
                }

                function i(t) {
                    var e, n = t.length,
                        i = this,
                        r = 0,
                        s = i.i = i.j = 0,
                        a = i.S = [];
                    for (n || (t = [n++]); u > r;) a[r] = r++;
                    for (r = 0; u > r; r++) a[r] = a[s = y & s + t[r % n] + (e = a[r])], a[s] = e;
                    (i.g = function(t) {
                        for (var e, n = 0, r = i.i, s = i.j, a = i.S; t--;) e = a[r = y & r + 1], n = n * u + a[y & (a[r] = a[s = y & s + e]) + (a[s] = e)];
                        return i.i = r, i.j = s, n
                    })(u)
                }

                function r(t, e) {
                    return e.i = t.i, e.j = t.j, e.S = t.S.slice(), e
                }

                function s(t, e) {
                    var n, i = [],
                        r = typeof t;
                    if (e && "object" == r)
                        for (n in t) try {
                            i.push(s(t[n], e - 1))
                        } catch (a) {}
                    return i.length ? i : "string" == r ? t : t + "\x00"
                }

                function a(t, e) {
                    for (var n, i = t + "", r = 0; r < i.length;) e[y & r] = y & (n ^= 19 * e[y & r]) + i.charCodeAt(r++);
                    return h(e)
                }

                function o() {
                    try {
                        if (l) return h(l.randomBytes(u));
                        var e = new Uint8Array(u);
                        return (p.crypto || p.msCrypto).getRandomValues(e), h(e)
                    } catch (n) {
                        var i = p.navigator,
                            r = i && i.plugins;
                        return [+new Date, p, r, p.screen, h(t)]
                    }
                }

                function h(t) {
                    return String.fromCharCode.apply(0, t)
                }
                var l, p = this,
                    u = 256,
                    c = 6,
                    f = 52,
                    m = "random",
                    d = e.pow(u, c),
                    v = e.pow(2, f),
                    g = 2 * v,
                    y = u - 1;
                e["seed" + m] = n, a(e.random(), t)
            }([], BMMath);
            var BezierFactory = function() {
                    function t(t, e, n, i, r) {
                        var s = r || ("bez_" + t + "_" + e + "_" + n + "_" + i).replace(/\./g, "p");
                        if (p[s]) return p[s];
                        var a = new h([t, e, n, i]);
                        return p[s] = a, a
                    }

                    function e(t, e) {
                        return 1 - 3 * e + 3 * t
                    }

                    function n(t, e) {
                        return 3 * e - 6 * t
                    }

                    function i(t) {
                        return 3 * t
                    }

                    function r(t, r, s) {
                        return ((e(r, s) * t + n(r, s)) * t + i(r)) * t
                    }

                    function s(t, r, s) {
                        return 3 * e(r, s) * t * t + 2 * n(r, s) * t + i(r)
                    }

                    function a(t, e, n, i, s) {
                        var a, o, h = 0;
                        do o = e + (n - e) / 2, a = r(o, i, s) - t, a > 0 ? n = o : e = o; while (Math.abs(a) > f && ++h < m);
                        return o
                    }

                    function o(t, e, n, i) {
                        for (var a = 0; u > a; ++a) {
                            var o = s(e, n, i);
                            if (0 === o) return e;
                            var h = r(e, n, i) - t;
                            e -= h / o
                        }
                        return e
                    }

                    function h(t) {
                        this._p = t, this._mSampleValues = g ? new Float32Array(d) : new Array(d), this._precomputed = !1, this.get = this.get.bind(this)
                    }
                    var l = {};
                    l.getBezierEasing = t;
                    var p = {},
                        u = 4,
                        c = .001,
                        f = 1e-7,
                        m = 10,
                        d = 11,
                        v = 1 / (d - 1),
                        g = "function" == typeof Float32Array;
                    return h.prototype = {
                        get: function(t) {
                            var e = this._p[0],
                                n = this._p[1],
                                i = this._p[2],
                                s = this._p[3];
                            return this._precomputed || this._precompute(), e === n && i === s ? t : 0 === t ? 0 : 1 === t ? 1 : r(this._getTForX(t), n, s)
                        },
                        _precompute: function() {
                            var t = this._p[0],
                                e = this._p[1],
                                n = this._p[2],
                                i = this._p[3];
                            this._precomputed = !0, (t !== e || n !== i) && this._calcSampleValues()
                        },
                        _calcSampleValues: function() {
                            for (var t = this._p[0], e = this._p[2], n = 0; d > n; ++n) this._mSampleValues[n] = r(n * v, t, e)
                        },
                        _getTForX: function(t) {
                            for (var e = this._p[0], n = this._p[2], i = this._mSampleValues, r = 0, h = 1, l = d - 1; h !== l && i[h] <= t; ++h) r += v;
                            --h;
                            var p = (t - i[h]) / (i[h + 1] - i[h]),
                                u = r + p * v,
                                f = s(u, e, n);
                            return f >= c ? o(t, u, e, n) : 0 === f ? u : a(t, r, r + v, e, n)
                        }
                    }, l
                }(),
                MatrixManager = matrixManagerFunction;
            ! function() {
                for (var t = 0, e = ["ms", "moz", "webkit", "o"], n = 0; n < e.length && !window.requestAnimationFrame; ++n) window.requestAnimationFrame = window[e[n] + "RequestAnimationFrame"], window.cancelAnimationFrame = window[e[n] + "CancelAnimationFrame"] || window[e[n] + "CancelRequestAnimationFrame"];
                window.requestAnimationFrame || (window.requestAnimationFrame = function(e, n) {
                    var i = (new Date).getTime(),
                        r = Math.max(0, 16 - (i - t)),
                        s = window.setTimeout(function() {
                            e(i + r)
                        }, r);
                    return t = i + r, s
                }), window.cancelAnimationFrame || (window.cancelAnimationFrame = function(t) {
                    clearTimeout(t)
                })
            }();
            var bez = bezFunction(),
                dataManager = dataFunctionManager(),
                FontManager = function() {
                    function t(t, e) {
                        var n = document.createElement("span");
                        n.style.fontFamily = e;
                        var i = document.createElement("span");
                        i.innerHTML = "giItT1WQy@!-/#", n.style.position = "absolute", n.style.left = "-10000px", n.style.top = "-10000px", n.style.fontSize = "300px", n.style.fontVariant = "normal", n.style.fontStyle = "normal", n.style.fontWeight = "normal", n.style.letterSpacing = "0", n.appendChild(i), document.body.appendChild(n);
                        var r = i.offsetWidth;
                        return i.style.fontFamily = t + ", " + e, {
                            node: i,
                            w: r,
                            parent: n
                        }
                    }

                    function e() {
                        var t, n, i, r = this.fonts.length,
                            s = r;
                        for (t = 0; r > t; t += 1)
                            if (this.fonts[t].loaded) s -= 1;
                            else if ("t" === this.fonts[t].fOrigin) {
                            if (window.Typekit && window.Typekit.load && 0 === this.typekitLoaded) {
                                this.typekitLoaded = 1;
                                try {
                                    Typekit.load({
                                        async: !0,
                                        active: function() {
                                            this.typekitLoaded = 2
                                        }.bind(this)
                                    })
                                } catch (a) {}
                            }
                            2 === this.typekitLoaded && (this.fonts[t].loaded = !0)
                        } else "n" === this.fonts[t].fOrigin ? this.fonts[t].loaded = !0 : (n = this.fonts[t].monoCase.node, i = this.fonts[t].monoCase.w, n.offsetWidth !== i ? (s -= 1, this.fonts[t].loaded = !0) : (n = this.fonts[t].sansCase.node, i = this.fonts[t].sansCase.w, n.offsetWidth !== i && (s -= 1, this.fonts[t].loaded = !0)), this.fonts[t].loaded && (this.fonts[t].sansCase.parent.parentNode.removeChild(this.fonts[t].sansCase.parent), this.fonts[t].monoCase.parent.parentNode.removeChild(this.fonts[t].monoCase.parent)));
                        0 !== s && Date.now() - this.initTime < h ? setTimeout(e.bind(this), 20) : setTimeout(function() {
                            this.loaded = !0
                        }.bind(this), 0)
                    }

                    function n(t, e) {
                        var n = document.createElementNS(svgNS, "text");
                        n.style.fontSize = "100px", n.style.fontFamily = e.fFamily, n.textContent = "1", e.fClass ? (n.style.fontFamily = "inherit", n.className = e.fClass) : n.style.fontFamily = e.fFamily, t.appendChild(n);
                        var i = document.createElement("canvas").getContext("2d");
                        return i.font = "100px " + e.fFamily, i
                    }

                    function i(i, r) {
                        if (!i) return void(this.loaded = !0);
                        if (this.chars) return this.loaded = !0, void(this.fonts = i.list);
                        var s, a = i.list,
                            o = a.length;
                        for (s = 0; o > s; s += 1) {
                            if (a[s].loaded = !1, a[s].monoCase = t(a[s].fFamily, "monospace"), a[s].sansCase = t(a[s].fFamily, "sans-serif"), a[s].fPath) {
                                if ("p" === a[s].fOrigin) {
                                    var h = document.createElement("style");
                                    h.type = "text/css", h.innerHTML = "@font-face {font-family: " + a[s].fFamily + "; font-style: normal; src: url('" + a[s].fPath + "');}", r.appendChild(h)
                                } else if ("g" === a[s].fOrigin) {
                                    var l = document.createElement("link");
                                    l.type = "text/css", l.rel = "stylesheet", l.href = a[s].fPath, r.appendChild(l)
                                } else if ("t" === a[s].fOrigin) {
                                    var p = document.createElement("script");
                                    p.setAttribute("src", a[s].fPath), r.appendChild(p)
                                }
                            } else a[s].loaded = !0;
                            a[s].helper = n(r, a[s]), this.fonts.push(a[s])
                        }
                        e.bind(this)()
                    }

                    function r(t) {
                        if (t) {
                            this.chars || (this.chars = []);
                            var e, n, i, r = t.length,
                                s = this.chars.length;
                            for (e = 0; r > e; e += 1) {
                                for (n = 0, i = !1; s > n;) this.chars[n].style === t[e].style && this.chars[n].fFamily === t[e].fFamily && this.chars[n].ch === t[e].ch && (i = !0), n += 1;
                                i || (this.chars.push(t[e]), s += 1)
                            }
                        }
                    }

                    function s(t, e, n) {
                        for (var i = 0, r = this.chars.length; r > i;) {
                            if (this.chars[i].ch === t && this.chars[i].style === e && this.chars[i].fFamily === n) return this.chars[i];
                            i += 1
                        }
                    }

                    function a(t, e, n) {
                        var i = this.getFontByName(e),
                            r = i.helper;
                        return r.measureText(t).width * n / 100
                    }

                    function o(t) {
                        for (var e = 0, n = this.fonts.length; n > e;) {
                            if (this.fonts[e].fName === t) return this.fonts[e];
                            e += 1
                        }
                        return "sans-serif"
                    }
                    var h = 5e3,
                        l = function() {
                            this.fonts = [], this.chars = null, this.typekitLoaded = 0, this.loaded = !1, this.initTime = Date.now()
                        };
                    return l.prototype.addChars = r, l.prototype.addFonts = i, l.prototype.getCharData = s, l.prototype.getFontByName = o, l.prototype.measureText = a, l
                }(),
                ExpressionManager = function() {
                    function sum(t, e) {
                        var n = typeof t,
                            i = typeof e;
                        if (!("number" !== n && "boolean" !== n || "number" !== i && "boolean" !== i)) return t + e;
                        if ("object" === n && ("number" === i || "boolean" === i)) return t[0] = t[0] + e, t;
                        if (("number" === n || "boolean" === n) && "object" === i) return e[0] = t + e[0], e;
                        if ("object" === n && "object" === i) {
                            for (var r = 0, s = t.length, a = e.length, o = []; s > r || a > r;) o[r] = "number" == typeof t[r] && "number" == typeof e[r] ? t[r] + e[r] : t[r] || e[r], r += 1;
                            return o
                        }
                        return 0
                    }

                    function sub(t, e) {
                        var n = typeof t,
                            i = typeof e;
                        if (!("number" !== n && "boolean" !== n || "number" !== i && "boolean" !== i)) return t - e;
                        if ("object" === n && ("number" === i || "boolean" === i)) return t[0] = t[0] - e, t;
                        if (("number" === n || "boolean" === n) && "object" === i) return e[0] = t - e[0], e;
                        if ("object" === n && "object" === i) {
                            for (var r = 0, s = t.length, a = e.length, o = []; s > r || a > r;) o[r] = "number" == typeof t[r] && "number" == typeof e[r] ? t[r] - e[r] : t[r] || e[r], r += 1;
                            return o
                        }
                        return 0
                    }

                    function mul(t, e) {
                        var n = typeof t,
                            i = typeof e;
                        if (!("number" !== n && "boolean" !== n || "number" !== i && "boolean" !== i)) return t * e;
                        var r, s;
                        if ("object" === n && ("number" === i || "boolean" === i)) {
                            for (s = t.length, arr = Array.apply(null, {
                                    length: s
                                }), r = 0; s > r; r += 1) arr[r] = t[r] * e;
                            return arr
                        }
                        if (("number" === n || "boolean" === n) && "object" === i) {
                            for (s = e.length, arr = Array.apply(null, {
                                    length: s
                                }), r = 0; s > r; r += 1) arr[r] = t * e[r];
                            return arr
                        }
                        return 0
                    }

                    function div(t, e) {
                        var n = typeof t,
                            i = typeof e;
                        if (!("number" !== n && "boolean" !== n || "number" !== i && "boolean" !== i)) return t / e;
                        var r, s;
                        if ("object" === n && ("number" === i || "boolean" === i)) {
                            for (s = t.length, arr = Array.apply(null, {
                                    length: s
                                }), r = 0; s > r; r += 1) arr[r] = t[r] / e;
                            return arr
                        }
                        if (("number" === n || "boolean" === n) && "object" === i) {
                            for (s = e.length, arr = Array.apply(null, {
                                    length: s
                                }), r = 0; s > r; r += 1) arr[r] = t / e[r];
                            return arr
                        }
                        return 0
                    }

                    function clamp(t, e, n) {
                        if (e > n) {
                            var i = n;
                            n = e, e = i
                        }
                        return Math.min(Math.max(t, e), n)
                    }

                    function radiansToDegrees(t) {
                        return t / degToRads
                    }

                    function length(t, e) {
                        var n, i = t.length,
                            r = 0;
                        for (n = 0; i > n; n += 1) r += Math.pow(e[n] - t[n], 2);
                        return Math.sqrt(r)
                    }

                    function linear(t, e, n, i, r) {
                        if (e >= t) return i;
                        if (t >= n) return r;
                        var s = t / (n - e);
                        if (!i.length) return i + (r - i) * s;
                        var a, o = i.length,
                            h = Array.apply(null, {
                                length: o
                            });
                        for (a = 0; o > a; a += 1) h[a] = i[a] + (r[a] - i[a]) * s;
                        return h
                    }

                    function seedRandom(t) {
                        BMMath.seedrandom(t)
                    }

                    function random(t, e) {
                        if (void 0 === e && (void 0 === t ? (t = 0, e = 1) : (e = t, t = void 0)), e.length) {
                            var n, i = e.length;
                            t || (t = Array.apply(null, {
                                length: i
                            }));
                            var r = Array.apply(null, {
                                    length: i
                                }),
                                s = BMMath.random();
                            for (n = 0; i > n; n += 1) r[n] = t[n] + s * (e[n] - t[n]);
                            return r
                        }
                        void 0 === t && (t = 0);
                        var a = BMMath.random();
                        return t + a * (e - t)
                    }

                    function initiateExpression(elem, data) {
                        function effect(t) {
                            return elem.effectsManager.getEffect(t)
                        }

                        function nearestKey(t) {
                            var e, n, i = data.k.length;
                            if (data.k.length && "number" != typeof data.k[0])
                                for (e = 0; i > e; e += 1) {
                                    if (t === data.k[e].t) {
                                        n = e + 1;
                                        break
                                    }
                                    if (t < data.k[e].t) {
                                        n = e + 1;
                                        break
                                    }
                                    if (t > data.k[e].t && e === i - 1) {
                                        n = i;
                                        break
                                    }
                                } else n = 0;
                            var r = {};
                            return r.index = n, r
                        }

                        function key(t) {
                            if (!data.k.length || "number" == typeof data.k[0]) return {
                                time: 0
                            };
                            t -= 1;
                            var e, n = {
                                time: data.k[t].t / thisComp.globalData.frameRate
                            };
                            e = t === data.k.length - 1 ? data.k[t - 1].e : data.k[t].s;
                            var i, r = e.length;
                            for (i = 0; r > i; i += 1) n[i] = e[i];
                            return n
                        }

                        function hasParentGetter() {}

                        function execute() {
                            seedRandom(0), "textSelector" === this.type && (textIndex = this.textIndex, textTotal = this.textTotal, selectorValue = this.selectorValue), transform || (transform = elem.transform), !content && elem.content && (content = elem.content.bind(elem)), this.getPreValue && this.getPreValue(), value = this.pv, time = this.comp.renderedFrame / this.comp.globalData.frameRate, bindedFn();
                            var t, e;
                            if (this.mult)
                                if ("number" == typeof this.v) this.v *= this.mult;
                                else
                                    for (e = this.v.length, value === this.v && (this.v = 2 === e ? [value[0], value[1]] : [value[0], value[1], value[2]]), t = 0; e > t; t += 1) this.v[t] *= this.mult;
                            if ("number" == typeof this.v) this.lastValue !== this.v && (this.lastValue = this.v, this.mdf = !0);
                            else if (this.v.i) this.mdf = !0;
                            else
                                for (e = this.v.length, t = 0; e > t; t += 1) this.v[t] !== this.lastValue[t] && (this.lastValue[t] = this.v[t], this.mdf = !0)
                        }
                        var val = data.x,
                            transform, content, effect, thisComp = elem.comp;
                        elem.comp.frameDuration = 1 / thisComp.globalData.frameRate;
                        var inPoint = elem.data.ip / thisComp.globalData.frameRate,
                            outPoint = elem.data.op / thisComp.globalData.frameRate,
                            thisLayer = elem,
                            fnStr = "var fn = function(){" + val + ";this.v = $bm_rt;}";
                        eval(fnStr);
                        var bindedFn = fn.bind(this),
                            numKeys = data.k ? data.k.length : 0,
                            wiggle = function(t, e) {
                                var n, i, r = this.pv.length ? this.pv.length : 1,
                                    s = Array.apply(null, {
                                        len: r
                                    });
                                for (i = 0; r > i; i += 1) s[i] = 0;
                                t = 5;
                                var a = Math.floor(time * t);
                                for (n = 0, i = 0; a > n;) {
                                    for (i = 0; r > i; i += 1) s[i] += -e + 2 * e * BMMath.random();
                                    n += 1
                                }
                                var o = time * t,
                                    h = o - Math.floor(o),
                                    l = Array.apply({
                                        length: r
                                    });
                                for (i = 0; r > i; i += 1) l[i] = this.pv[i] + s[i] + (-e + 2 * e * BMMath.random()) * h;
                                return l
                            }.bind(this),
                            loopIn = function(t, e, n) {
                                if (!this.k) return this.pv;
                                var i = time * thisComp.globalData.frameRate,
                                    r = this.keyframes,
                                    s = r[0].t;
                                if (i >= s) return this.pv;
                                var a, o;
                                n ? (a = e ? Math.abs(thisComp.globalData.frameRate * e) : Math.max(0, this.elem.data.op - s), o = s + a) : ((!e || e > r.length - 1) && (e = r.length - 1), o = r[e].t, a = o - s);
                                var h, l, p;
                                if ("pingpong" === t) {
                                    var u = Math.floor((s - i) / a);
                                    if (u % 2 === 0) return this.getValueAtTime((s - i) % a + s)
                                } else {
                                    if ("offset" === t) {
                                        var c = this.getValueAtTime(s),
                                            f = this.getValueAtTime(o),
                                            m = this.getValueAtTime(a - (s - i) % a + s),
                                            d = Math.floor((s - i) / a) + 1;
                                        if (this.pv.length) {
                                            for (p = new Array(c.length), l = p.length, h = 0; l > h; h += 1) p[h] = m[h] - (f[h] - c[h]) * d;
                                            return p
                                        }
                                        return m - (f - c) * d
                                    }
                                    if ("continue" === t) {
                                        var v = this.getValueAtTime(s),
                                            g = this.getValueAtTime(s + .001);
                                        if (this.pv.length) {
                                            for (p = new Array(v.length), l = p.length, h = 0; l > h; h += 1) p[h] = v[h] + (v[h] - g[h]) * (s - i) / 5e-4;
                                            return p
                                        }
                                        return v + (v - g) * (s - i) / 5e-4
                                    }
                                }
                                return this.getValueAtTime(a - (s - i) % a + s)
                            }.bind(this),
                            loopInDuration = function(t, e) {
                                return loopIn(t, e, !0)
                            }.bind(this),
                            loopOut = function(t, e, n) {
                                if (!this.k) return this.pv;
                                var i = time * thisComp.globalData.frameRate,
                                    r = this.keyframes,
                                    s = r[r.length - 1].t;
                                if (s >= i) return this.pv;
                                var a, o;
                                n ? (a = e ? Math.abs(s - thisComp.globalData.frameRate * e) : Math.max(0, s - this.elem.data.ip), o = s - a) : ((!e || e > r.length - 1) && (e = r.length - 1), o = r[r.length - 1 - e].t, a = s - o);
                                var h, l, p;
                                if ("pingpong" === t) {
                                    var u = Math.floor((i - o) / a);
                                    if (u % 2 !== 0) return this.getValueAtTime(a - (i - o) % a + o)
                                } else {
                                    if ("offset" === t) {
                                        var c = this.getValueAtTime(o),
                                            f = this.getValueAtTime(s),
                                            m = this.getValueAtTime((i - o) % a + o),
                                            d = Math.floor((i - o) / a);
                                        if (this.pv.length) {
                                            for (p = new Array(c.length), l = p.length, h = 0; l > h; h += 1) p[h] = (f[h] - c[h]) * d + m[h];
                                            return p
                                        }
                                        return (f - c) * d + m
                                    }
                                    if ("continue" === t) {
                                        var v = this.getValueAtTime(s),
                                            g = this.getValueAtTime(s - .001);
                                        if (this.pv.length) {
                                            for (p = new Array(v.length), l = p.length, h = 0; l > h; h += 1) p[h] = v[h] + (v[h] - g[h]) * (i - s) / 5e-4;
                                            return p
                                        }
                                        return v + (v - g) * (i - s) / 5e-4
                                    }
                                }
                                return this.getValueAtTime((i - o) % a + o)
                            }.bind(this),
                            loopOutDuration = function(t, e) {
                                return loopOut(t, e, !0)
                            }.bind(this),
                            valueAtTime = function(t) {
                                return this.getValueAtTime(t * thisComp.globalData.frameRate)
                            }.bind(this),
                            velocityAtTime = function(t) {
                                return this.getVelocityAtTime(t * thisComp.globalData.frameRate)
                            }.bind(this);
                        Object.defineProperty(this, "hasParent", {
                            get: hasParentGetter
                        });
                        var time, value, textIndex, textTotal, selectorValue, index = elem.data.ind + 1,
                            hasParent = !(!elem.hierarchy || !elem.hierarchy.length);
                        return execute
                    }
                    var ob = {};
                    return ob.initiateExpression = initiateExpression, ob
                }();
            ! function() {
                ExpressionComp.prototype.layer = function(t) {
                    for (var e = 0, n = this.layers.length; n > e;) {
                        if (this.layers[e].nm === t) return this.elements[e];
                        e += 1
                    }
                }, ExpressionComp.prototype.pixelAspect = 1
            }(), ShapeInterface.prototype.fillInterface = function(t) {
                var e = {
                    get color() {
                        return t.c.k && t.c.getValue(), [t.c.pv[0], t.c.pv[1], t.c.pv[2]]
                    },
                    get opacity() {
                        return t.o.k && t.o.getValue(), t.o.pv
                    }
                };
                return e
            }, ShapeInterface.prototype.strokeInterface = function(t, e) {
                var n = {
                    get color() {
                        return e.c.k && e.c.getValue(), [e.c.pv[0], e.c.pv[1], e.c.pv[2]]
                    },
                    get opacity() {
                        return e.o.k && e.o.getValue(), e.o.pv
                    },
                    get strokeWidth() {
                        return e.w.k && e.w.getValue(), e.w.pv
                    },
                    dashOb: {},
                    get dash() {
                        var n, i = e.d,
                            r = t.d,
                            s = r.length;
                        for (n = 0; s > n; n += 1) i.dataProps[n].p.k && i.dataProps[n].p.getValue(), this.dashOb[r[n].nm] = i.dataProps[n].p.v;
                        return this.dashOb
                    }
                };
                return n
            }, ShapeInterface.prototype.shapeInterface = function(t) {
                var e = {
                    get shape() {
                        return t.sh.k && t.sh.getValue(), t.sh.pv
                    }
                };
                return e
            }, ShapeInterface.prototype.ellipseInterface = function(t) {
                var e = {
                    get size() {
                        return t.sh.s.k && t.sh.s.getValue(), [t.sh.s.pv[0], t.sh.s.pv[1]]
                    },
                    get position() {
                        return t.sh.p.k && t.sh.p.getValue(), [t.sh.p.pv[0], t.sh.p.pv[1]]
                    }
                };
                return e
            }, ShapeInterface.prototype.rectangleInterface = function(t) {
                var e = "tm" === t.sh.ty ? t.sh.prop : t.sh,
                    n = {
                        get size() {
                            return e.s.k && e.s.getValue(), [e.s.pv[0], e.s.pv[1]]
                        },
                        get position() {
                            return e.p.k && e.p.getValue(), [e.p.pv[0], e.p.pv[1]]
                        },
                        get roundness() {
                            return e.r.k && e.r.getValue(), e.r.pv
                        }
                    };
                return n
            }, ShapeInterface.prototype.trimInterface = function(t) {
                var e = {
                    get start() {
                        return t.tr.s.k && t.tr.s.getValue(), t.tr.s.pv
                    },
                    get end() {
                        return t.tr.e.k && t.tr.e.getValue(), t.tr.e.pv
                    },
                    get offset() {
                        return t.tr.o.k && t.tr.o.getValue(), t.tr.o.pv
                    }
                };
                return e
            }, ShapeInterface.prototype.transformInterface = function(t) {
                var e = {
                    get opacity() {
                        return t.transform.mProps.o.k && t.transform.mProps.o.getValue(), t.transform.mProps.o.pv
                    },
                    get position() {
                        return t.transform.mProps.p.k && t.transform.mProps.p.getValue(), [t.transform.mProps.p.pv[0], t.transform.mProps.p.pv[1]]
                    },
                    get anchorPoint() {
                        return t.transform.mProps.a.k && t.transform.mProps.a.getValue(), [t.transform.mProps.a.pv[0], t.transform.mProps.a.pv[1]]
                    },
                    get scale() {
                        return t.transform.mProps.s.k && t.transform.mProps.s.getValue(), [t.transform.mProps.s.pv[0], t.transform.mProps.s.pv[1]]
                    },
                    get rotation() {
                        return t.transform.mProps.r.k && t.transform.mProps.r.getValue(), t.transform.mProps.r.pv
                    },
                    get skew() {
                        return t.transform.mProps.sk.k && t.transform.mProps.sk.getValue(), t.transform.mProps.sk.pv
                    },
                    get skewAxis() {
                        return t.transform.mProps.sa.k && t.transform.mProps.sa.getValue(), t.transform.mProps.sa.pv
                    }
                };
                return e
            }, ShapeInterface.prototype.groupInterface = function(t, e, n) {
                var i, r, s = [],
                    a = t.length;
                for (i = 0; a > i; i += 1) "gr" === t[i].ty ? (r = {}, this.groupInterface(t[i].it, e[i].it, r), s.push(r)) : "sh" === t[i].ty ? (r = this.shapeInterface(e[i]), s.push(r)) : "fl" === t[i].ty ? (r = this.fillInterface(e[i]), s.push(r)) : "st" === t[i].ty ? (r = this.strokeInterface(t[i], e[i]), s.push(r)) : "el" === t[i].ty ? (r = this.ellipseInterface(e[i]), s.push(r)) : "rc" === t[i].ty ? (r = this.rectangleInterface(e[i]), s.push(r)) : "tr" === t[i].ty ? n.transform = this.transformInterface(e[i]) : "tm" === t[i].ty ? (r = this.trimInterface(e[i]), s.push(r)) : s.push("");
                n.content = function(e) {
                    var n, i = t.length;
                    for (n = 0; i > n; n += 1)
                        if (t[n].nm === e) return s[n]
                }
            }, ShapeInterface.prototype.buildExpressionInterface = function() {
                this.groupInterface(this.shapesData, this.viewData, this)
            }, LayerInterface.prototype.toWorld = function(t) {
                if (this.hierarchy && this.hierarchy.length) {
                    var e, n = new Matrix,
                        i = this.hierarchy.length;
                    for (this.finalTransform.mProp.applyToMatrix(n, !1), e = 0; i > e; e += 1) this.hierarchy[e].finalTransform.mProp.applyToMatrix(n, !0);
                    var r = n.applyToPointArray(t[0], t[1], t[2] || 0);
                    return r
                }
                return t
            }, LayerInterface.prototype.effect = function(t) {
                console.log(this.effectsManager), console.log(t)
            };
            var PropertyFactory = function() {
                function t(t) {
                    for (var e, n, i = 0, r = this.keyframes.length - 1, s = 1, a = !0, o = 0, h = "object" == typeof this.pv ? [this.pv.length] : 0; a;) {
                        if (e = this.keyframes[i], n = this.keyframes[i + 1], i == r - 1 && t >= n.t - o) {
                            e.h && (e = n);
                            break
                        }
                        if (n.t - o > t) break;
                        r - 1 > i ? i += s : a = !1
                    }
                    var l, p, u, c, f, m = 0;
                    if (e.to) {
                        e.bezierData || bez.buildBezierData(e);
                        var d = e.bezierData;
                        if (t >= n.t - o || t < e.t - o) {
                            var v = t >= n.t - o ? d.points.length - 1 : 0;
                            for (p = d.points[v].point.length, l = 0; p > l; l += 1) h[l] = d.points[v].point[l]
                        } else {
                            e.__fnct ? f = e.__fnct : (f = BezierFactory.getBezierEasing(e.o.x, e.o.y, e.i.x, e.i.y, e.n).get, e.__fnct = f), u = f((t - (e.t - o)) / (n.t - o - (e.t - o)));
                            var g, y = d.segmentLength * u,
                                b = 0;
                            for (s = 1, a = !0, c = d.points.length; a;) {
                                if (b += d.points[m].partialLength * s, 0 === y || 0 === u || m == d.points.length - 1) {
                                    for (p = d.points[m].point.length, l = 0; p > l; l += 1) h[l] = d.points[m].point[l];
                                    break
                                }
                                if (y >= b && y < b + d.points[m + 1].partialLength) {
                                    for (g = (y - b) / d.points[m + 1].partialLength, p = d.points[m].point.length, l = 0; p > l; l += 1) h[l] = d.points[m].point[l] + (d.points[m + 1].point[l] - d.points[m].point[l]) * g;
                                    break
                                }
                                c - 1 > m && 1 == s || m > 0 && -1 == s ? m += s : a = !1
                            }
                        }
                    } else {
                        var w, E, C, _, x, S = !1;
                        for (r = e.s.length, i = 0; r > i; i += 1) {
                            if (1 !== e.h && (e.o.x instanceof Array ? (S = !0, e.__fnct || (e.__fnct = []), e.__fnct[i] || (w = e.o.x[i] || e.o.x[0], E = e.o.y[i] || e.o.y[0], C = e.i.x[i] || e.i.x[0], _ = e.i.y[i] || e.i.y[0])) : (S = !1, e.__fnct || (w = e.o.x, E = e.o.y, C = e.i.x, _ = e.i.y)), S ? e.__fnct[i] ? f = e.__fnct[i] : (f = BezierFactory.getBezierEasing(w, E, C, _).get, e.__fnct[i] = f) : e.__fnct ? f = e.__fnct : (f = BezierFactory.getBezierEasing(w, E, C, _).get, e.__fnct = f), u = t >= n.t - o ? 1 : t < e.t - o ? 0 : f((t - (e.t - o)) / (n.t - o - (e.t - o)))), this.sh && 1 !== e.h) {
                                var A = e.s[i],
                                    k = e.e[i]; - 180 > A - k ? A += 360 : A - k > 180 && (A -= 360), x = A + (k - A) * u
                            } else x = 1 === e.h ? e.s[i] : e.s[i] + (e.e[i] - e.s[i]) * u;
                            1 === r ? h = x : h[i] = x
                        }
                    }
                    return h
                }

                function e(t) {
                    var e, n = .01,
                        i = this.getValueAtTime(t),
                        r = this.getValueAtTime(t + n);
                    if (i.length) {
                        e = Array.apply(null, {
                            length: i.length
                        });
                        var s;
                        for (s = 0; s < i.length; s += 1) e[s] = this.elem.globalData.frameRate * ((r[s] - i[s]) / n)
                    } else e = (r - i) / n;
                    return e
                }

                function n() {
                    if (this.elem.globalData.frameId !== this.frameId) {
                        this.mdf = !1, this.frameId = this.elem.globalData.frameId;
                        var t = this.comp.renderedFrame - this.offsetTime;
                        if (t === this.lastFrame || this.lastFrame !== v && (this.lastFrame >= this.keyframes[this.keyframes.length - 1].t - this.offsetTime && t >= this.keyframes[this.keyframes.length - 1].t - this.offsetTime || this.lastFrame < this.keyframes[0].t - this.offsetTime && t < this.keyframes[0].t - this.offsetTime));
                        else {
                            for (var e, n, i = 0, r = this.keyframes.length - 1, s = 1, a = !0; a;) {
                                if (e = this.keyframes[i], n = this.keyframes[i + 1], i == r - 1 && t >= n.t - this.offsetTime) {
                                    e.h && (e = n);
                                    break
                                }
                                if (n.t - this.offsetTime > t) break;
                                r - 1 > i ? i += s : a = !1
                            }
                            var o, h, l, p, u, c = 0;
                            if (e.to) {
                                e.bezierData || bez.buildBezierData(e);
                                var f = e.bezierData;
                                if (t >= n.t - this.offsetTime || t < e.t - this.offsetTime) {
                                    var m = t >= n.t - this.offsetTime ? f.points.length - 1 : 0;
                                    for (h = f.points[m].point.length, o = 0; h > o; o += 1) this.v[o] = this.mult ? f.points[m].point[o] * this.mult : f.points[m].point[o], this.pv[o] = f.points[m].point[o], this.lastPValue[o] !== this.pv[o] && (this.mdf = !0, this.lastPValue[o] = this.pv[o])
                                } else {
                                    e.__fnct ? u = e.__fnct : (u = BezierFactory.getBezierEasing(b, w, E, C, e.n).get, e.__fnct = u), l = u((t - (e.t - this.offsetTime)) / (n.t - this.offsetTime - (e.t - this.offsetTime)));
                                    var d, g = f.segmentLength * l,
                                        y = 0;
                                    for (s = 1, a = !0, p = f.points.length; a;) {
                                        if (y += f.points[c].partialLength * s, 0 === g || 0 === l || c == f.points.length - 1) {
                                            for (h = f.points[c].point.length, o = 0; h > o; o += 1) this.v[o] = this.mult ? f.points[c].point[o] * this.mult : f.points[c].point[o], this.pv[o] = f.points[c].point[o], this.lastPValue[o] !== this.pv[o] && (this.mdf = !0, this.lastPValue[o] = this.pv[o]);
                                            break
                                        }
                                        if (g >= y && g < y + f.points[c + 1].partialLength) {
                                            for (d = (g - y) / f.points[c + 1].partialLength, h = f.points[c].point.length, o = 0; h > o; o += 1) this.v[o] = this.mult ? (f.points[c].point[o] + (f.points[c + 1].point[o] - f.points[c].point[o]) * d) * this.mult : f.points[c].point[o] + (f.points[c + 1].point[o] - f.points[c].point[o]) * d, this.pv[o] = f.points[c].point[o] + (f.points[c + 1].point[o] - f.points[c].point[o]) * d, this.lastPValue[o] !== this.pv[o] && (this.mdf = !0, this.lastPValue[o] = this.pv[o]);
                                            break
                                        }
                                        p - 1 > c && 1 == s || c > 0 && -1 == s ? c += s : a = !1
                                    }
                                }
                            } else {
                                var b, w, E, C, _, x = !1;
                                for (r = e.s.length, i = 0; r > i; i += 1) {
                                    if (1 !== e.h && (e.o.x instanceof Array ? (x = !0, e.__fnct || (e.__fnct = []), e.__fnct[i] || (b = e.o.x[i] || e.o.x[0], w = e.o.y[i] || e.o.y[0], E = e.i.x[i] || e.i.x[0], C = e.i.y[i] || e.i.y[0])) : (x = !1, e.__fnct || (b = e.o.x, w = e.o.y, E = e.i.x, C = e.i.y)), x ? e.__fnct[i] ? u = e.__fnct[i] : (u = BezierFactory.getBezierEasing(b, w, E, C).get, e.__fnct[i] = u) : e.__fnct ? u = e.__fnct : (u = BezierFactory.getBezierEasing(b, w, E, C).get, e.__fnct = u), l = t >= n.t - this.offsetTime ? 1 : t < e.t - this.offsetTime ? 0 : u((t - (e.t - this.offsetTime)) / (n.t - this.offsetTime - (e.t - this.offsetTime)))), this.sh && 1 !== e.h) {
                                        var S = e.s[i],
                                            A = e.e[i]; - 180 > S - A ? S += 360 : S - A > 180 && (S -= 360), _ = S + (A - S) * l
                                    } else _ = 1 === e.h ? e.s[i] : e.s[i] + (e.e[i] - e.s[i]) * l;
                                    1 === r ? (this.v = this.mult ? _ * this.mult : _, this.pv = _, this.lastPValue != this.pv && (this.mdf = !0, this.lastPValue = this.pv)) : (this.v[i] = this.mult ? _ * this.mult : _, this.pv[i] = _, this.lastPValue[i] !== this.pv[i] && (this.mdf = !0, this.lastPValue[i] = this.pv[i]))
                                }
                            }
                        }
                        this.lastFrame = t
                    }
                }

                function i() {
                    this.mdf = !1;
                    var t = this.comp.renderedFrame - this.offsetTime;
                    if (this.lastFrame !== v && (this.lastFrame < this.keyframes[0].t - this.offsetTime && t < this.keyframes[0].t - this.offsetTime || this.lastFrame > this.keyframes[this.keyframes.length - 1].t - this.offsetTime && t > this.keyframes[this.keyframes.length - 1].t - this.offsetTime));
                    else {
                        var e, n, i;
                        if (t < this.keyframes[0].t - this.offsetTime) this.mdf = !0, e = this.keyframes[0].s[0], i = !0;
                        else if (t > this.keyframes[this.keyframes.length - 1].t - this.offsetTime) this.mdf = !0, e = 1 === this.keyframes[this.keyframes.length - 2].h ? this.keyframes[this.keyframes.length - 2].s[0] : this.keyframes[this.keyframes.length - 2].e[0], i = !0;
                        else {
                            this.mdf = !0;
                            for (var r, s, a, o, h, l, p = 0, u = this.keyframes.length - 1, c = 1, f = !0; f && (r = this.keyframes[p], s = this.keyframes[p + 1], !(s.t - this.offsetTime > t && 1 == c));) u - 1 > p && 1 == c || p > 0 && -1 == c ? p += c : f = !1;
                            var m;
                            if (1 !== r.h) {
                                var d;
                                r.__fnct ? d = r.__fnct : (d = BezierFactory.getBezierEasing(r.o.x, r.o.y, r.i.x, r.i.y).get, r.__fnct = d), m = t >= s.t - this.offsetTime ? 1 : t < r.t - this.offsetTime ? 0 : d((t - (r.t - this.offsetTime)) / (s.t - this.offsetTime - (r.t - this.offsetTime))), n = r.e[0]
                            }
                            e = r.s[0], i = 1 === r.h
                        }
                        for (o = this.v.i.length, l = e.i[0].length, a = 0; o > a; a += 1)
                            for (h = 0; l > h; h += 1) i ? (this.v.i[a][h] = e.i[a][h], this.v.o[a][h] = e.o[a][h], this.v.v[a][h] = e.v[a][h], this.pv.i[a][h] = e.i[a][h], this.pv.o[a][h] = e.o[a][h], this.pv.v[a][h] = e.v[a][h]) : (this.v.i[a][h] = e.i[a][h] + (n.i[a][h] - e.i[a][h]) * m, this.v.o[a][h] = e.o[a][h] + (n.o[a][h] - e.o[a][h]) * m, this.v.v[a][h] = e.v[a][h] + (n.v[a][h] - e.v[a][h]) * m, this.pv.i[a][h] = e.i[a][h] + (n.i[a][h] - e.i[a][h]) * m, this.pv.o[a][h] = e.o[a][h] + (n.o[a][h] - e.o[a][h]) * m, this.pv.v[a][h] = e.v[a][h] + (n.v[a][h] - e.v[a][h]) * m)
                    }
                    this.lastFrame = t
                }

                function r(t, e) {
                    this.getExpression = ExpressionManager.initiateExpression, e.x && (this.k = !0, this.x = !0, this.getValue && (this.getPreValue = this.getValue), this.getValue = this.getExpression(t, e))
                }

                function s(t, e, n) {
                    this.mult = n, this.v = n ? e.k * n : e.k, this.pv = e.k, this.mdf = !1, this.comp = t.comp, this.k = !1, r.bind(this)(t, e)
                }

                function a(t, e, n) {
                    this.mult = n, this.data = e, this.mdf = !1, this.comp = t.comp, this.k = !1, r.bind(this)(t, e), this.v = new Array(e.k.length), this.pv = new Array(e.k.length), this.lastValue = new Array(e.k.length);
                    var i, s = e.k.length;
                    for (i = 0; s > i; i += 1) this.v[i] = n ? e.k[i] * n : e.k[i], this.pv[i] = e.k[i]
                }

                function o(i, s, a) {
                    this.keyframes = s.k, this.offsetTime = i.data.st, this.lastValue = -99999, this.lastPValue = -99999, this.frameId = -1, this.k = !0, this.data = s, this.mult = a, this.elem = i, this.comp = i.comp, this.lastFrame = v, this.v = a ? s.k[0].s[0] * a : s.k[0].s[0], this.pv = s.k[0].s[0], this.getValue = n, this.getValueAtTime = t, this.getVelocityAtTime = e, r.bind(this)(i, s)
                }

                function h(i, s, a) {
                    var o, h, l, p, u, c = s.k.length;
                    for (o = 0; c - 1 > o; o += 1) s.k[o].to && s.k[o].s && s.k[o].e && (h = s.k[o].s, l = s.k[o].e, p = s.k[o].to, u = s.k[o].ti, (2 == h.length && bez.pointOnLine2D(h[0], h[1], l[0], l[1], h[0] + p[0], h[1] + p[1]) && bez.pointOnLine2D(h[0], h[1], l[0], l[1], l[0] + u[0], l[1] + u[1]) || bez.pointOnLine3D(h[0], h[1], h[2], l[0], l[1], l[2], h[0] + p[0], h[1] + p[1], h[2] + p[2]) && bez.pointOnLine3D(h[0], h[1], h[2], l[0], l[1], l[2], l[0] + u[0], l[1] + u[1], l[2] + u[2])) && (s.k[o].to = null, s.k[o].ti = null));
                    this.keyframes = s.k, this.offsetTime = i.data.st, this.k = !0, this.mult = a, this.elem = i, this.comp = i.comp, this.getValue = n, this.getValueAtTime = t, this.getVelocityAtTime = e, this.frameId = -1, this.v = new Array(s.k[0].s.length), this.pv = new Array(s.k[0].s.length), this.lastValue = new Array(s.k[0].s.length), this.lastPValue = new Array(s.k[0].s.length), this.lastFrame = v, r.bind(this)(i, s)
                }

                function l(t, e, n, i, r) {
                    var l;
                    if (2 === n) l = new g(t, e, r);
                    else if (7 === n) l = new E(t, e, r);
                    else if (e.k.length)
                        if ("number" == typeof e.k[0]) l = new a(t, e, i);
                        else switch (n) {
                            case 0:
                                l = new o(t, e, i);
                                break;
                            case 1:
                                l = new h(t, e, i)
                        } else l = new s(t, e, i);
                    return (l.k || l.x) && r.push(l), l
                }

                function p() {
                    return this.v
                }

                function u(t, e, n) {
                    this.comp = t.comp, this.k = !1, this.mdf = !1, this.closed = 3 === n ? e.cl : e.closed, this.numNodes = 3 === n ? e.pt.k.v.length : e.ks.k.v.length, this.v = 3 === n ? e.pt.k : e.ks.k;
                    var i = 3 === n ? e.pt : e.ks;
                    this.getValue = p, this.pv = this.v, r.bind(this)(t, i)
                }

                function c(t, e, n) {
                    this.comp = t.comp, this.offsetTime = t.data.st, this.getValue = i, this.keyframes = 3 === n ? e.pt.k : e.ks.k, this.k = !0, this.closed = 3 === n ? e.cl : e.closed;
                    var s, a = this.keyframes[0].s[0].i.length,
                        o = this.keyframes[0].s[0].i[0].length;
                    for (this.numNodes = a, this.v = {
                            i: new Array(a),
                            o: new Array(a),
                            v: new Array(a)
                        }, this.pv = {
                            i: new Array(a),
                            o: new Array(a),
                            v: new Array(a)
                        }, s = 0; a > s; s += 1) this.v.i[s] = new Array(o), this.v.o[s] = new Array(o), this.v.v[s] = new Array(o), this.pv.i[s] = new Array(o), this.pv.o[s] = new Array(o), this.pv.v[s] = new Array(o);
                    this.lastFrame = v;
                    var h = 3 === n ? e.pt : e.ks;
                    r.bind(this)(t, h)
                }

                function f(t, e, n, i, r) {
                    var s;
                    if (3 === n || 4 === n) {
                        var a = 3 === n ? e.pt.k : e.ks.k;
                        s = a.length ? new c(t, e, n) : new u(t, e, n)
                    } else 5 === n ? s = new w(t, e) : 6 === n ? s = new y(t, e) : 7 === n && (s = new b(t, e));
                    var o = !1;
                    if (r)
                        for (var h = 0, l = r.length; l > h;) {
                            if (!r[h].closed) {
                                o = !0;
                                break
                            }
                            h += 1
                        }
                    return o && (s = new C(s, r)), s.k && i.push(s), s
                }

                function m(t, e, n, i) {
                    return new _(t, e, n, i)
                }

                function d(t, e, n) {
                    switch (e.t) {
                        case 0:
                            return new S(t, e, n);
                        case 1:
                            return new x(t, e)
                    }
                }
                var v = -999999,
                    g = function() {
                        function t() {
                            return this.p.k && this.getValue(), this.p.pv
                        }

                        function e() {
                            return this.a.k && this.getValue(), this.a.pv
                        }

                        function n() {
                            return this.or.k && this.getValue(), this.or.pv
                        }

                        function i() {
                            return this.r.k && this.getValue(), this.r.pv
                        }

                        function r() {
                            return this.s.k && this.getValue(), this.s.pv
                        }

                        function s() {
                            return this.o.k && this.o.getValue(), this.o.pv
                        }

                        function a() {
                            return this.sk.k && this.sk.getValue(), this.sk.pv
                        }

                        function o() {
                            return this.sa.k && this.sa.getValue(), this.sa.pv
                        }

                        function h(t, e) {
                            var n, i = this.dynamicProperties.length;
                            if (e) {
                                for (n = 0; i > n; n += 1) this.dynamicProperties[n].getValue(), this.dynamicProperties[n].mdf && (this.mdf = !0);
                                this.a && t.translate(-this.a.v[0], -this.a.v[1], this.a.v[2]), this.s && t.scale(this.s.v[0], this.s.v[1], this.s.v[2]), this.r ? t.rotate(-this.r.v) : t.rotateZ(-this.rz.v).rotateY(this.ry.v).rotateX(this.rx.v).rotateZ(-this.or.v[2]).rotateY(this.or.v[1]).rotateX(this.or.v[0]), this.data.p.s ? this.data.p.z ? t.translate(this.px.v, this.py.v, -this.pz.v) : t.translate(this.px.v, this.py.v, 0) : t.translate(this.p.v[0], this.p.v[1], -this.p.v[2])
                            } else this.a && t.translate(-this.a.pv[0], -this.a.pv[1], this.a.pv[2]), this.s && t.scale(this.s.pv[0], this.s.pv[1], this.s.pv[2]), this.r ? t.rotate(-this.r.pv) : t.rotateZ(-this.rz.pv).rotateY(this.ry.pv).rotateX(this.rx.pv).rotateZ(-this.or.pv[2]).rotateY(this.or.pv[1]).rotateX(this.or.pv[0]), this.data.p.s ? this.data.p.z ? t.translate(this.px.pv, this.py.pv, -this.pz.pv) : t.translate(this.px.pv, this.py.pv, 0) : t.translate(this.p.pv[0], this.p.pv[1], -this.p.pv[2])
                        }

                        function p() {
                            if (this.elem.globalData.frameId !== this.frameId) {
                                this.mdf = !1, this.frameId = this.elem.globalData.frameId;
                                var t, e = this.dynamicProperties.length;
                                for (t = 0; e > t; t += 1) this.dynamicProperties[t].getValue(), this.dynamicProperties[t].mdf && (this.mdf = !0);
                                this.mdf && (this.v.reset(), this.a && this.v.translate(-this.a.v[0], -this.a.v[1], this.a.v[2]), this.s && this.v.scale(this.s.v[0], this.s.v[1], this.s.v[2]), this.sk && this.v.skewFromAxis(-this.sk.v, this.sa.v), this.r ? this.v.rotate(-this.r.v) : this.v.rotateZ(-this.rz.v).rotateY(this.ry.v).rotateX(this.rx.v).rotateZ(-this.or.v[2]).rotateY(this.or.v[1]).rotateX(this.or.v[0]), this.data.p.s ? this.data.p.z ? this.v.translate(this.px.v, this.py.v, -this.pz.v) : this.v.translate(this.px.v, this.py.v, 0) : this.v.translate(this.p.v[0], this.p.v[1], -this.p.v[2]))
                            }
                        }

                        function u() {
                            this.inverted = !0, this.iv = new Matrix, this.k || (this.data.p.s ? this.iv.translate(this.px.v, this.py.v, -this.pz.v) : this.iv.translate(this.p.v[0], this.p.v[1], -this.p.v[2]), this.r ? this.iv.rotate(-this.r.v) : this.iv.rotateX(-this.rx.v).rotateY(-this.ry.v).rotateZ(this.rz.v), this.s && this.iv.scale(this.s.v[0], this.s.v[1], 1), this.a && this.iv.translate(-this.a.v[0], -this.a.v[1], this.a.v[2]))
                        }
                        return function(c, f, m) {
                            this.elem = c, this.frameId = -1, this.dynamicProperties = [], this.mdf = !1, this.data = f, this.getValue = p, this.applyToMatrix = h, this.setInverted = u, this.v = new Matrix, f.p.s ? (this.px = l(c, f.p.x, 0, 0, this.dynamicProperties), this.py = l(c, f.p.y, 0, 0, this.dynamicProperties), f.p.z && (this.pz = l(c, f.p.z, 0, 0, this.dynamicProperties))) : this.p = l(c, f.p, 1, 0, this.dynamicProperties), f.r ? this.r = l(c, f.r, 0, degToRads, this.dynamicProperties) : f.rx && (this.rx = l(c, f.rx, 0, degToRads, this.dynamicProperties), this.ry = l(c, f.ry, 0, degToRads, this.dynamicProperties), this.rz = l(c, f.rz, 0, degToRads, this.dynamicProperties), this.or = l(c, f.or, 0, degToRads, this.dynamicProperties)), f.sk && (this.sk = l(c, f.sk, 0, degToRads, this.dynamicProperties), this.sa = l(c, f.sa, 0, degToRads, this.dynamicProperties)), f.a && (this.a = l(c, f.a, 1, 0, this.dynamicProperties)), f.s && (this.s = l(c, f.s, 1, .01, this.dynamicProperties)), this.o = f.o ? l(c, f.o, 0, .01, m) : {
                                mdf: !1,
                                v: 1
                            }, this.dynamicProperties.length ? m.push(this) : (this.a && this.v.translate(-this.a.v[0], -this.a.v[1], this.a.v[2]), this.s && this.v.scale(this.s.v[0], this.s.v[1], this.s.v[2]), this.sk && this.v.skewFromAxis(-this.sk.v, this.sa.v), this.r ? this.v.rotate(-this.r.v) : this.v.rotateZ(-this.rz.v).rotateY(this.ry.v).rotateX(this.rx.v).rotateZ(-this.or.v[2]).rotateY(this.or.v[1]).rotateX(this.or.v[0]), this.data.p.s ? f.p.z ? this.v.translate(this.px.v, this.py.v, -this.pz.v) : this.v.translate(this.px.v, this.py.v, 0) : this.v.translate(this.p.v[0], this.p.v[1], -this.p.v[2])), Object.defineProperty(this, "position", {
                                get: t
                            }), Object.defineProperty(this, "orientation", {
                                get: n
                            }), Object.defineProperty(this, "anchorPoint", {
                                get: e
                            }), Object.defineProperty(this, "rotation", {
                                get: i
                            }), Object.defineProperty(this, "scale", {
                                get: r
                            }), Object.defineProperty(this, "opacity", {
                                get: s
                            }), Object.defineProperty(this, "skew", {
                                get: a
                            }), Object.defineProperty(this, "skewAxis", {
                                get: o
                            })
                        }
                    }(),
                    y = function() {
                        function t() {
                            var t = this.p.v[0],
                                e = this.p.v[1],
                                i = this.s.v[0] / 2,
                                r = this.s.v[1] / 2;
                            2 !== this.d && 3 !== this.d ? (this.v.v[0] = [t, e - r], this.v.i[0] = [t - i * n, e - r], this.v.o[0] = [t + i * n, e - r], this.v.v[1] = [t + i, e], this.v.i[1] = [t + i, e - r * n], this.v.o[1] = [t + i, e + r * n], this.v.v[2] = [t, e + r], this.v.i[2] = [t + i * n, e + r], this.v.o[2] = [t - i * n, e + r], this.v.v[3] = [t - i, e], this.v.i[3] = [t - i, e + r * n], this.v.o[3] = [t - i, e - r * n]) : (this.v.v[0] = [t, e - r], this.v.o[0] = [t - i * n, e - r], this.v.i[0] = [t + i * n, e - r], this.v.v[1] = [t - i, e], this.v.o[1] = [t - i, e + r * n], this.v.i[1] = [t - i, e - r * n], this.v.v[2] = [t, e + r], this.v.o[2] = [t + i * n, e + r], this.v.i[2] = [t - i * n, e + r], this.v.v[3] = [t + i, e], this.v.o[3] = [t + i, e - r * n], this.v.i[3] = [t + i, e + r * n])
                        }

                        function e(t) {
                            var e, n = this.dynamicProperties.length;
                            if (this.elem.globalData.frameId !== this.frameId) {
                                for (this.mdf = !1, this.frameId = this.elem.globalData.frameId, e = 0; n > e; e += 1) this.dynamicProperties[e].getValue(t), this.dynamicProperties[e].mdf && (this.mdf = !0);
                                this.mdf && this.convertEllToPath()
                            }
                        }
                        var n = .5519;
                        return function(n, i) {
                            this.v = {
                                v: new Array(4),
                                i: new Array(4),
                                o: new Array(4),
                                c: !0
                            }, this.numNodes = 4, this.d = i.d, this.dynamicProperties = [], i.closed = !0, this.closed = !0, this.elem = n, this.comp = n.comp, this.frameId = -1, this.mdf = !1, this.getValue = e, this.convertEllToPath = t, this.p = l(n, i.p, 1, 0, this.dynamicProperties), this.s = l(n, i.s, 1, 0, this.dynamicProperties), this.dynamicProperties.length ? this.k = !0 : this.convertEllToPath()
                        }
                    }(),
                    b = function() {
                        function t() {
                            var t = Math.floor(this.pt.v),
                                e = 2 * Math.PI / t;
                            this.v.v.length = t, this.v.i.length = t, this.v.o.length = t;
                            var n, i = this.or.v,
                                r = this.os.v,
                                s = 2 * Math.PI * i / (4 * t),
                                a = -Math.PI / 2,
                                o = 3 === this.data.d ? -1 : 1;
                            for (a += this.r.v, n = 0; t > n; n += 1) {
                                var h = i * Math.cos(a),
                                    l = i * Math.sin(a),
                                    p = 0 === h && 0 === l ? 0 : l / Math.sqrt(h * h + l * l),
                                    u = 0 === h && 0 === l ? 0 : -h / Math.sqrt(h * h + l * l);
                                h += +this.p.v[0], l += +this.p.v[1], this.v.v[n] = [h, l], this.v.i[n] = [h + p * s * r * o, l + u * s * r * o], this.v.o[n] = [h - p * s * r * o, l - u * s * r * o], a += e * o
                            }
                            this.numNodes = t
                        }

                        function e() {
                            var t = 2 * Math.floor(this.pt.v),
                                e = 2 * Math.PI / t;
                            this.v.v.length = t, this.v.i.length = t, this.v.o.length = t;
                            var n, i, r, s, a = !0,
                                o = this.or.v,
                                h = this.ir.v,
                                l = this.os.v,
                                p = this.is.v,
                                u = 2 * Math.PI * o / (2 * t),
                                c = 2 * Math.PI * h / (2 * t),
                                f = -Math.PI / 2;
                            f += this.r.v;
                            var m = 3 === this.data.d ? -1 : 1;
                            for (n = 0; t > n; n += 1) {
                                i = a ? o : h, r = a ? l : p, s = a ? u : c;
                                var d = i * Math.cos(f),
                                    v = i * Math.sin(f),
                                    g = 0 === d && 0 === v ? 0 : v / Math.sqrt(d * d + v * v),
                                    y = 0 === d && 0 === v ? 0 : -d / Math.sqrt(d * d + v * v);
                                d += +this.p.v[0], v += +this.p.v[1], this.v.v[n] = [d, v], this.v.i[n] = [d + g * s * r * m, v + y * s * r * m], this.v.o[n] = [d - g * s * r * m, v - y * s * r * m], a = !a, f += e * m
                            }
                            this.numNodes = t
                        }

                        function n() {
                            if (this.elem.globalData.frameId !== this.frameId) {
                                this.mdf = !1, this.frameId = this.elem.globalData.frameId;
                                var t, e = this.dynamicProperties.length;
                                for (t = 0; e > t; t += 1) this.dynamicProperties[t].getValue(), this.dynamicProperties[t].mdf && (this.mdf = !0);
                                this.mdf && this.convertToPath()
                            }
                        }
                        return function(i, r) {
                            this.v = {
                                v: [],
                                i: [],
                                o: [],
                                c: !0
                            }, this.elem = i, this.comp = i.comp, this.data = r, this.frameId = -1, this.d = r.d, this.dynamicProperties = [], this.mdf = !1, r.closed = !0, this.closed = !0, this.getValue = n, 1 === r.sy ? (this.ir = l(i, r.ir, 0, 0, this.dynamicProperties), this.is = l(i, r.is, 0, .01, this.dynamicProperties), this.convertToPath = e) : this.convertToPath = t, this.pt = l(i, r.pt, 0, 0, this.dynamicProperties), this.p = l(i, r.p, 1, 0, this.dynamicProperties), this.r = l(i, r.r, 0, degToRads, this.dynamicProperties), this.or = l(i, r.or, 0, 0, this.dynamicProperties), this.os = l(i, r.os, 0, .01, this.dynamicProperties), this.dynamicProperties.length ? this.k = !0 : this.convertToPath()
                        }
                    }(),
                    w = function() {
                        function t(t) {
                            if (this.elem.globalData.frameId !== this.frameId) {
                                this.mdf = !1, this.frameId = this.elem.globalData.frameId;
                                var e, n = this.dynamicProperties.length;
                                for (e = 0; n > e; e += 1) this.dynamicProperties[e].getValue(t), this.dynamicProperties[e].mdf && (this.mdf = !0);
                                this.mdf && this.convertRectToPath()
                            }
                        }

                        function e() {
                            var t = this.p.v[0],
                                e = this.p.v[1],
                                n = this.s.v[0] / 2,
                                i = this.s.v[1] / 2,
                                r = bm_min(n, i, this.r.v),
                                s = r * (1 - .5519);
                            2 === this.d || 1 === this.d ? (this.v.v[0] = [t + n, e - i + r], this.v.o[0] = this.v.v[0], this.v.i[0] = [t + n, e - i + s], this.v.v[1] = [t + n, e + i - r], this.v.o[1] = [t + n, e + i - s], this.v.i[1] = this.v.v[1], this.v.v[2] = [t + n - r, e + i], this.v.o[2] = this.v.v[2], this.v.i[2] = [t + n - s, e + i], this.v.v[3] = [t - n + r, e + i], this.v.o[3] = [t - n + s, e + i], this.v.i[3] = this.v.v[3], this.v.v[4] = [t - n, e + i - r], this.v.o[4] = this.v.v[4], this.v.i[4] = [t - n, e + i - s], this.v.v[5] = [t - n, e - i + r], this.v.o[5] = [t - n, e - i + s], this.v.i[5] = this.v.v[5], this.v.v[6] = [t - n + r, e - i], this.v.o[6] = this.v.v[6], this.v.i[6] = [t - n + s, e - i], this.v.v[7] = [t + n - r, e - i], this.v.o[7] = [t + n - s, e - i], this.v.i[7] = this.v.v[7]) : (this.v.v[0] = [t + n, e - i + r], this.v.o[0] = [t + n, e - i + s], this.v.i[0] = this.v.v[0], this.v.v[1] = [t + n - r, e - i], this.v.o[1] = this.v.v[1], this.v.i[1] = [t + n - s, e - i], this.v.v[2] = [t - n + r, e - i], this.v.o[2] = [t - n + s, e - i], this.v.i[2] = this.v.v[2], this.v.v[3] = [t - n, e - i + r], this.v.o[3] = this.v.v[3], this.v.i[3] = [t - n, e - i + s], this.v.v[4] = [t - n, e + i - r], this.v.o[4] = [t - n, e + i - s], this.v.i[4] = this.v.v[4], this.v.v[5] = [t - n + r, e + i], this.v.o[5] = this.v.v[5], this.v.i[5] = [t - n + s, e + i], this.v.v[6] = [t + n - r, e + i], this.v.o[6] = [t + n - s, e + i], this.v.i[6] = this.v.v[6], this.v.v[7] = [t + n, e + i - r], this.v.o[7] = this.v.v[7], this.v.i[7] = [t + n, e + i - s])
                        }
                        return function(n, i) {
                            this.v = {
                                v: new Array(8),
                                i: new Array(8),
                                o: new Array(8),
                                c: !0
                            }, this.numNodes = 8, this.elem = n, this.comp = n.comp, this.frameId = -1, this.d = i.d, this.dynamicProperties = [], this.mdf = !1, i.closed = !0, this.closed = !0, this.getValue = t, this.convertRectToPath = e, this.p = l(n, i.p, 1, 0, this.dynamicProperties), this.s = l(n, i.s, 1, 0, this.dynamicProperties), this.r = l(n, i.r, 0, 0, this.dynamicProperties), this.dynamicProperties.length ? this.k = !0 : this.convertRectToPath()
                        }
                    }(),
                    E = function() {
                        function t(t) {
                            if (this.elem.globalData.frameId !== this.frameId || t) {
                                this.mdf = !1, this.frameId = this.elem.globalData.frameId;
                                var e, n = this.dynamicProperties.length;
                                for (e = 0; n > e; e += 1) this.dynamicProperties[e].getValue(), this.dynamicProperties[e].mdf && (this.mdf = !0);
                                if (this.mdf || t) {
                                    var i = this.o.v % 360 / 360;
                                    if (0 === i && 0 === this.s.v && 1 == this.e.v) return void(this.isTrimming = !1);
                                    this.isTrimming = !0, 0 > i && (i += 1);
                                    var r = this.s.v + i,
                                        s = this.e.v + i;
                                    if (r > s) {
                                        var a = r;
                                        r = s, s = a
                                    }
                                    this.sValue = r, this.eValue = s, this.oValue = i
                                }
                            }
                        }
                        return function(e, n) {
                            this.elem = e, this.frameId = -1, this.dynamicProperties = [], this.sValue = 0, this.eValue = 0, this.oValue = 0, this.mdf = !1, this.getValue = t, this.k = !1, this.isTrimming = !1, this.comp = e.comp, this.s = l(e, n.s, 0, .01, this.dynamicProperties), this.e = l(e, n.e, 0, .01, this.dynamicProperties), this.o = l(e, n.o, 0, 0, this.dynamicProperties), this.dynamicProperties.length ? this.k = !0 : this.getValue(!0)
                        }
                    }(),
                    C = function() {
                        function t(t, e) {
                            this.totalLength = 0;
                            var n, i = t.v,
                                r = t.o,
                                s = t.i,
                                a = i.length;
                            for (n = 0; a - 1 > n; n += 1) this.lengths[n] = bez.getBezierLength(i[n], i[n + 1], r[n], s[n + 1]), this.totalLength += this.lengths[n].addedLength;
                            e && (this.lengths[n] = bez.getBezierLength(i[n], i[0], r[n], s[0]), this.totalLength += this.lengths[n].addedLength)
                        }

                        function e(t, e, n, i, r) {
                            this.nextO[this.segmentCount] = e, this.nextI[this.segmentCount + 1] = n, this.nextV[this.segmentCount + 1] = i, this.pathStarted ? this.nextV[this.segmentCount] = t : (this.pathStarted = !0, this.v.s[this.segmentCount] = t), this.segmentCount += 1
                        }

                        function n(t) {
                            this.mdf = t ? !0 : !1, this.prop.k && this.prop.getValue();
                            var e = 0,
                                n = this.trims.length;
                            for (this.pathStarted = !1; n > e;) {
                                if (this.trims[e].mdf) {
                                    this.mdf = !0;
                                    break
                                }
                                e += 1
                            }
                            if (this.mdf = this.prop.mdf ? !0 : this.mdf, this.mdf) {
                                this.nextO.length = 0, this.nextI.length = 0, this.nextV.length = 0, this.v.s.length = 0;
                                var i = this.prop.closed;
                                this.getSegmentsLength(this.prop.v, i);
                                var r, s, a, o, h, l, p = this.prop.v,
                                    u = this.trims.length;
                                for (r = 0; u > r; r += 1)
                                    if (this.trims[r].isTrimming) {
                                        if (s = this.trims[r].eValue, a = this.trims[r].sValue, o = this.trims[r].oValue, s === a) return this.v.v = this.nextV, this.v.o = this.nextO, void(this.v.i = this.nextI);
                                        1 >= s ? (this.segments[0].s = this.totalLength * a, this.segments[0].e = this.totalLength * s, this.segments[1].vl = !1) : a >= 1 ? (this.segments[0].s = this.totalLength * (a - 1), this.segments[0].e = this.totalLength * (s - 1), this.segments[1].vl = !1) : (this.segments[0].s = this.totalLength * a, this.segments[0].e = this.totalLength, this.segments[1].s = 0, this.segments[1].e = this.totalLength * (s - 1), this.segments[1].vl = !0), this.v.v = p.v, this.v.o = p.o, this.v.i = p.i, l = this.v.v.length;
                                        var c = 0,
                                            f = 0;
                                        n = this.segments[1].vl ? 2 : 1;
                                        var m;
                                        for (this.segmentCount = 0, e = 0; n > e; e += 1) {
                                            for (c = 0, h = 1; l > h; h++)
                                                if (f = this.lengths[h - 1].addedLength, c + f < this.segments[e].s) c += f;
                                                else {
                                                    if (c > this.segments[e].e) break;
                                                    this.segments[e].s <= c && this.segments[e].e >= c + f ? this.addSegment(this.v.v[h - 1], this.v.o[h - 1], this.v.i[h], this.v.v[h], this.lengths[h - 1]) : (m = bez.getNewSegment(this.v.v[h - 1], this.v.v[h], this.v.o[h - 1], this.v.i[h], (this.segments[e].s - c) / f, (this.segments[e].e - c) / f, this.lengths[h - 1]), this.addSegment(m.pt1, m.pt3, m.pt4, m.pt2)), c += f
                                                }
                                            i !== !1 ? c <= this.segments[e].e && (f = this.lengths[h - 1].addedLength, this.segments[e].s <= c && this.segments[e].e >= c + f ? this.addSegment(this.v.v[h - 1], this.v.o[h - 1], this.v.i[0], this.v.v[0], this.lengths[h - 1]) : (m = bez.getNewSegment(this.v.v[h - 1], this.v.v[0], this.v.o[h - 1], this.v.i[0], (this.segments[e].s - c) / f, (this.segments[e].e - c) / f, this.lengths[h - 1]), this.addSegment(m.pt1, m.pt3, m.pt4, m.pt2))) : this.pathStarted = !1
                                        }
                                        i = !1
                                    } else this.v.v = p.v, this.v.o = p.o, this.v.i = p.i;
                                this.nextV.length ? (this.v.v = this.nextV, this.v.o = this.nextO, this.v.i = this.nextI) : this.v.s.length = 0, this.v.c = i
                            }
                        }
                        return function(i, r) {
                            this.trims = [], this.k = !1, this.mdf = !1, this.ty = "tm", this.pathStarted = !1, this.segments = [{
                                s: 0,
                                e: 0,
                                vl: !0
                            }, {
                                s: 0,
                                e: 0,
                                vl: !1
                            }], this.nextO = [], this.nextV = [], this.nextI = [], this.v = {
                                i: null,
                                o: null,
                                v: null,
                                s: [],
                                c: !1
                            };
                            var s, a = r.length;
                            for (s = 0; a > s; s += 1) r[s].closed || (this.k = r[s].trimProp.k ? !0 : this.k, this.trims.push(r[s].trimProp));
                            this.prop = i, this.prop.numNodes ? (a = this.prop.numNodes - 1, a += this.prop.closed ? 1 : 0, this.lengths = new Array(a)) : this.lengths = [], this.k = i.k ? !0 : this.k, this.totalLength = 0, this.getValue = n, this.addSegment = e, this.getSegmentsLength = t, this.k || (this.prop.getValue(), this.getValue(!0))
                        }
                    }(),
                    _ = function() {
                        function t(t) {
                            var e = 0,
                                n = this.dataProps.length;
                            if (this.elem.globalData.frameId !== this.frameId || t) {
                                for (this.mdf = !1, this.frameId = this.elem.globalData.frameId; n > e;) {
                                    if (this.dataProps[e].p.mdf) {
                                        this.mdf = !0;
                                        break
                                    }
                                    e += 1
                                }
                                if (this.mdf || t)
                                    for ("svg" === this.renderer && (this.dasharray = ""), e = 0; n > e; e += 1) "o" != this.dataProps[e].n ? "svg" === this.renderer ? this.dasharray += " " + this.dataProps[e].p.v : this.dasharray[e] = this.dataProps[e].p.v : this.dashoffset = this.dataProps[e].p.v
                            }
                        }
                        return function(e, n, i, r) {
                            this.elem = e, this.frameId = -1, this.dataProps = new Array(n.length), this.renderer = i, this.mdf = !1, this.k = !1, this.dasharray = "svg" === this.renderer ? "" : new Array(n.length - 1), this.dashoffset = 0;
                            var s, a, o = n.length;
                            for (s = 0; o > s; s += 1) a = l(e, n[s].v, 0, 0, r), this.k = a.k ? !0 : this.k, this.dataProps[s] = {
                                n: n[s].n,
                                p: a
                            };
                            this.getValue = t, this.k ? r.push(this) : this.getValue(!0)
                        }
                    }(),
                    x = function() {
                        function t(t, e) {
                            return this.textIndex = t + 1, this.textTotal = e, this.getValue(), this.v
                        }
                        return function(e, n) {
                            this.pv = 1, this.comp = e.comp, this.mult = .01, this.type = "textSelector", this.textTotal = n.totalChars, this.selectorValue = 100, this.lastValue = [1, 1, 1], r.bind(this)(e, n), this.getMult = t
                        }
                    }(),
                    S = function() {
                        function t() {
                            if (this.dynamicProperties.length) {
                                var t, e = this.dynamicProperties.length;
                                for (t = 0; e > t; t += 1) this.dynamicProperties[t].getValue()
                            }
                            var n = this.data.totalChars,
                                i = 2 === this.data.r ? 1 : 100 / n,
                                r = this.o.v / i,
                                s = this.s.v / i + r,
                                a = this.e.v / i + r;
                            if (s > a) {
                                var o = s;
                                s = a, a = o
                            }
                            this.finalS = s, this.finalE = a
                        }

                        function e(t) {
                            var e = BezierFactory.getBezierEasing(this.ne.v / 100, 0, 1 - this.xe.v / 100, 1).get,
                                s = 0,
                                a = this.finalS,
                                o = this.finalE,
                                h = this.data.sh;
                            if (2 == h) s = o === a ? t >= o ? 1 : 0 : n(0, i(.5 / (o - a) + (t - a) / (o - a), 1)), s = e(s);
                            else if (3 == h) s = o === a ? t >= o ? 0 : 1 : 1 - n(0, i(.5 / (o - a) + (t - a) / (o - a), 1)), s = e(s);
                            else if (4 == h) o === a ? s = t >= o ? 0 : 1 : (s = n(0, i(.5 / (o - a) + (t - a) / (o - a), 1)), .5 > s ? s *= 2 : s = 1 - s);
                            else if (5 == h)
                                if (o === a) s = t >= o ? 0 : 1;
                                else {
                                    var l = o - a;
                                    s = -4 / (l * l) * t * t + 4 / l * t
                                }
                            else 6 == h ? s = o === a ? t >= o ? 0 : 1 : (1 + (Math.cos(Math.PI + 2 * Math.PI * (t - a) / (o - a)) + 0)) / 2 : t >= r(a) && (s = 0 > t - a ? 1 - (a - t) : n(0, i(o - t, 1)));
                            return s * this.a.v
                        }
                        var n = Math.max,
                            i = Math.min,
                            r = Math.floor;
                        return function(n, i, r) {
                            this.mdf = !1, this.k = !1, this.data = i, this.dynamicProperties = [], this.getValue = t, this.getMult = e, this.comp = n.comp, this.finalS = 0, this.finalE = 0, this.s = l(n, i.s || {
                                k: 0
                            }, 0, 0, this.dynamicProperties), this.e = "e" in i ? l(n, i.e, 0, 0, this.dynamicProperties) : {
                                v: 2 === i.r ? i.totalChars : 100
                            }, this.o = l(n, i.o || {
                                k: 0
                            }, 0, 0, this.dynamicProperties), this.xe = l(n, i.xe || {
                                k: 0
                            }, 0, 0, this.dynamicProperties), this.ne = l(n, i.ne || {
                                k: 0
                            }, 0, 0, this.dynamicProperties), this.a = l(n, i.a, 0, .01, this.dynamicProperties), this.dynamicProperties.length ? r.push(this) : this.getValue()
                        }
                    }(),
                    A = {};
                return A.getProp = l, A.getShapeProp = f, A.getDashProp = m, A.getTextSelectorProp = d, A
            }();
            SVGRenderer.prototype.createItem = function(t, e, n, i) {
                switch (t.ty) {
                    case 2:
                        return this.createImage(t, e, n, i);
                    case 0:
                        return this.createComp(t, e, n, i);
                    case 1:
                        return this.createSolid(t, e, n, i);
                    case 4:
                        return this.createShape(t, e, n, i);
                    case 5:
                        return this.createText(t, e, n, i);
                    case 99:
                        return this.createPlaceHolder(t, e)
                }
                return this.createBase(t, e, n)
            }, SVGRenderer.prototype.buildItems = function(t, e, n, i, r) {
                var s, a = t.length;
                n || (n = this.elements), e || (e = this.animationItem.container), i || (i = this);
                var o;
                for (s = a - 1; s >= 0; s--) n[s] = this.createItem(t[s], e, i, r), 0 === t[s].ty && (o = [], this.buildItems(t[s].layers, n[s].getDomElement(), o, n[s], n[s].placeholder), n[s].setElements(o)), t[s].td && n[s + 1].setMatte(n[s].layerId)
            }, SVGRenderer.prototype.includeLayers = function(t, e, n) {
                var i, r = t.length;
                n || (n = this.elements), e || (e = this.animationItem.container);
                var s, a, o, h = n.length;
                for (i = 0; r > i; i += 1)
                    for (s = 0; h > s;) {
                        if (n[s].data.id == t[i].id) {
                            o = n[s], n[s] = this.createItem(t[i], e, this, o), 0 === t[i].ty && (a = [], this.buildItems(t[i].layers, n[s].getDomElement(), a, n[s], n[i].placeholder), n[s].setElements(a));
                            break
                        }
                        s += 1
                    }
                for (i = 0; r > i; i += 1) t[i].td && n[i + 1].setMatte(n[i].layerId)
            }, SVGRenderer.prototype.createBase = function(t, e, n, i) {
                return new SVGBaseElement(t, e, this.globalData, n, i)
            }, SVGRenderer.prototype.createPlaceHolder = function(t, e) {
                return new PlaceHolderElement(t, e, this.globalData)
            }, SVGRenderer.prototype.createShape = function(t, e, n, i) {
                return new IShapeElement(t, e, this.globalData, n, i)
            }, SVGRenderer.prototype.createText = function(t, e, n, i) {
                return new SVGTextElement(t, e, this.globalData, n, i)
            }, SVGRenderer.prototype.createImage = function(t, e, n, i) {
                return new IImageElement(t, e, this.globalData, n, i)
            }, SVGRenderer.prototype.createComp = function(t, e, n, i) {
                return new ICompElement(t, e, this.globalData, n, i)
            }, SVGRenderer.prototype.createSolid = function(t, e, n, i) {
                return new ISolidElement(t, e, this.globalData, n, i)
            }, SVGRenderer.prototype.configAnimation = function(t) {
                this.animationItem.container = document.createElementNS(svgNS, "svg"), this.animationItem.container.setAttribute("xmlns", "http://www.w3.org/2000/svg"), this.animationItem.container.setAttribute("width", t.w), this.animationItem.container.setAttribute("height", t.h), this.animationItem.container.setAttribute("viewBox", "0 0 " + t.w + " " + t.h), this.animationItem.container.setAttribute("preserveAspectRatio", "xMidYMid meet"), this.animationItem.container.style.width = "100%", this.animationItem.container.style.height = "100%", this.animationItem.container.style.transform = "translate3d(0,0,0)", this.animationItem.container.style.transformOrigin = this.animationItem.container.style.mozTransformOrigin = this.animationItem.container.style.webkitTransformOrigin = this.animationItem.container.style["-webkit-transform"] = "0px 0px 0px", this.animationItem.wrapper.appendChild(this.animationItem.container);
                var e = document.createElementNS(svgNS, "defs");
                this.globalData.defs = e, this.animationItem.container.appendChild(e), this.globalData.getAssetData = this.animationItem.getAssetData.bind(this.animationItem), this.globalData.getPath = this.animationItem.getPath.bind(this.animationItem), this.globalData.elementLoaded = this.animationItem.elementLoaded.bind(this.animationItem), this.globalData.frameId = 0, this.globalData.compSize = {
                    w: t.w,
                    h: t.h
                }, this.globalData.frameRate = t.fr;
                var n = document.createElementNS(svgNS, "clipPath"),
                    i = document.createElementNS(svgNS, "rect");
                i.setAttribute("width", t.w), i.setAttribute("height", t.h), i.setAttribute("x", 0), i.setAttribute("y", 0);
                var r = "animationMask_" + randomString(10);
                n.setAttribute("id", r), n.appendChild(i);
                var s = document.createElementNS(svgNS, "g");
                s.setAttribute("clip-path", "url(#" + r + ")"), this.animationItem.container.appendChild(s), e.appendChild(n), this.animationItem.container = s, this.layers = t.layers, this.globalData.fontManager = new FontManager, this.globalData.fontManager.addChars(t.chars), this.globalData.fontManager.addFonts(t.fonts, e)
            }, SVGRenderer.prototype.buildStage = function(t, e, n) {
                var i, r, s = e.length;
                for (n || (n = this.elements), i = s - 1; i >= 0; i--) r = e[i], void 0 !== r.parent && this.buildItemParenting(r, n[i], e, r.parent, n, !0), 0 === r.ty && this.buildStage(n[i].getComposingElement(), r.layers, n[i].getElements())
            }, SVGRenderer.prototype.buildItemParenting = function(t, e, n, i, r, s) {
                t.parents || (t.parents = []), s && e.resetHierarchy();
                for (var a = 0, o = n.length; o > a;) n[a].ind == i && (e.getHierarchy().push(r[a]), void 0 !== n[a].parent && this.buildItemParenting(t, e, n, n[a].parent, r, !1)), a += 1
            }, SVGRenderer.prototype.destroy = function() {
                this.animationItem.wrapper.innerHTML = "", this.animationItem.container = null, this.globalData.defs = null;
                var t, e = this.layers.length;
                for (t = 0; e > t; t++) this.elements[t].destroy();
                this.elements.length = 0, this.destroyed = !0
            }, SVGRenderer.prototype.updateContainerSize = function() {}, SVGRenderer.prototype.renderFrame = function(t) {
                if (this.renderedFrame != t && !this.destroyed) {
                    null === t ? t = this.renderedFrame : this.renderedFrame = t, this.globalData.frameNum = t, this.globalData.frameId += 1;
                    var e, n = this.layers.length;
                    for (e = 0; n > e; e++) this.elements[e].prepareFrame(t - this.layers[e].st);
                    for (e = 0; n > e; e++) this.elements[e].renderFrame()
                }
            }, SVGRenderer.prototype.hide = function() {
                this.animationItem.container.style.display = "none"
            }, SVGRenderer.prototype.show = function() {
                this.animationItem.container.style.display = "block"
            }, extendPrototype(ExpressionComp, SVGRenderer), CanvasRenderer.prototype.createItem = function(t, e) {
                switch (t.ty) {
                    case 0:
                        return this.createComp(t, e);
                    case 1:
                        return this.createSolid(t, e);
                    case 2:
                        return this.createImage(t, e);
                    case 4:
                        return this.createShape(t, e);
                    case 5:
                        return this.createText(t, e);
                    case 99:
                        return this.createPlaceHolder(t, e);
                    default:
                        return this.createBase(t, e)
                }
                return this.createBase(t, e)
            }, CanvasRenderer.prototype.buildItems = function(t, e, n) {
                e || (e = this.elements), n || (n = this);
                var i, r = t.length;
                for (i = 0; r > i; i++)
                    if (e[i] = this.createItem(t[i], n), 0 === t[i].ty) {
                        var s = [];
                        this.buildItems(t[i].layers, s, e[i]), e[e.length - 1].setElements(s)
                    }
            }, CanvasRenderer.prototype.includeLayers = function(t, e, n) {
                var i, r = t.length;
                n || (n = this.elements);
                var s, a, o = n.length;
                for (i = 0; r > i; i += 1)
                    for (s = 0; o > s;) {
                        if (n[s].data.id == t[i].id) {
                            n[s] = this.createItem(t[i], this), 0 === t[i].ty && (a = [], this.buildItems(t[i].layers, a, n[s]), n[s].setElements(a));
                            break
                        }
                        s += 1
                    }
            }, CanvasRenderer.prototype.createBase = function(t, e) {
                return new CVBaseElement(t, e, this.globalData)
            }, CanvasRenderer.prototype.createShape = function(t, e) {
                return new CVShapeElement(t, e, this.globalData)
            }, CanvasRenderer.prototype.createText = function(t, e) {
                return new CVTextElement(t, e, this.globalData)
            }, CanvasRenderer.prototype.createPlaceHolder = function(t) {
                return new PlaceHolderElement(t, null, this.globalData)
            }, CanvasRenderer.prototype.createImage = function(t, e) {
                return new CVImageElement(t, e, this.globalData)
            }, CanvasRenderer.prototype.createComp = function(t, e) {
                return new CVCompElement(t, e, this.globalData)
            }, CanvasRenderer.prototype.createSolid = function(t, e) {
                return new CVSolidElement(t, e, this.globalData)
            }, CanvasRenderer.prototype.ctxTransform = function(t) {
                if (1 !== t[0] || 0 !== t[1] || 0 !== t[4] || 1 !== t[5] || 0 !== t[12] || 0 !== t[13]) {
                    if (!this.renderConfig.clearCanvas) return void this.canvasContext.transform(t[0], t[1], t[4], t[5], t[12], t[13]);
                    this.transformMat.cloneFromProps(t), this.transformMat.transform(this.contextData.cTr.props[0], this.contextData.cTr.props[1], this.contextData.cTr.props[2], this.contextData.cTr.props[3], this.contextData.cTr.props[4], this.contextData.cTr.props[5], this.contextData.cTr.props[6], this.contextData.cTr.props[7], this.contextData.cTr.props[8], this.contextData.cTr.props[9], this.contextData.cTr.props[10], this.contextData.cTr.props[11], this.contextData.cTr.props[12], this.contextData.cTr.props[13], this.contextData.cTr.props[14], this.contextData.cTr.props[15]), this.contextData.cTr.cloneFromProps(this.transformMat.props);
                    var e = this.contextData.cTr.props;
                    this.canvasContext.setTransform(e[0], e[1], e[4], e[5], e[12], e[13])
                }
            }, CanvasRenderer.prototype.ctxOpacity = function(t) {
                if (1 !== t) {
                    if (!this.renderConfig.clearCanvas) return void(this.canvasContext.globalAlpha *= 0 > t ? 0 : t);
                    this.contextData.cO *= 0 > t ? 0 : t, this.canvasContext.globalAlpha = this.contextData.cO
                }
            }, CanvasRenderer.prototype.reset = function() {
                return this.renderConfig.clearCanvas ? (this.contextData.cArrPos = 0, this.contextData.cTr.reset(), void(this.contextData.cO = 1)) : void this.canvasContext.restore()
            }, CanvasRenderer.prototype.save = function(t) {
                if (!this.renderConfig.clearCanvas) return void this.canvasContext.save();
                t && this.canvasContext.save();
                var e = this.contextData.cTr.props;
                (null === this.contextData.saved[this.contextData.cArrPos] || void 0 === this.contextData.saved[this.contextData.cArrPos]) && (this.contextData.saved[this.contextData.cArrPos] = new Array(16));
                var n, i = this.contextData.saved[this.contextData.cArrPos];
                for (n = 0; 16 > n; n += 1) i[n] = e[n];
                this.contextData.savedOp[this.contextData.cArrPos] = this.contextData.cO, this.contextData.cArrPos += 1
            }, CanvasRenderer.prototype.restore = function(t) {
                if (!this.renderConfig.clearCanvas) return void this.canvasContext.restore();
                t && this.canvasContext.restore(), this.contextData.cArrPos -= 1;
                var e, n = this.contextData.saved[this.contextData.cArrPos],
                    i = this.contextData.cTr.props;
                for (e = 0; 16 > e; e += 1) i[e] = n[e];
                this.canvasContext.setTransform(n[0], n[1], n[4], n[5], n[12], n[13]), n = this.contextData.savedOp[this.contextData.cArrPos], this.contextData.cO = n, this.canvasContext.globalAlpha = n
            }, CanvasRenderer.prototype.configAnimation = function(t) {
                this.animationItem.wrapper ? (this.animationItem.container = document.createElement("canvas"), this.animationItem.container.style.width = "100%", this.animationItem.container.style.height = "100%", this.animationItem.container.style.transformOrigin = this.animationItem.container.style.mozTransformOrigin = this.animationItem.container.style.webkitTransformOrigin = this.animationItem.container.style["-webkit-transform"] = "0px 0px 0px", this.animationItem.wrapper.appendChild(this.animationItem.container), this.canvasContext = this.animationItem.container.getContext("2d")) : this.canvasContext = this.renderConfig.context, this.globalData.canvasContext = this.canvasContext, this.globalData.renderer = this, this.globalData.isDashed = !1, this.globalData.totalFrames = Math.floor(t.tf), this.globalData.compWidth = t.w, this.globalData.compHeight = t.h, this.globalData.frameRate = t.fr, this.globalData.frameId = 0, this.layers = t.layers, this.transformCanvas = {}, this.transformCanvas.w = t.w, this.transformCanvas.h = t.h, this.updateContainerSize(), this.globalData.fontManager = new FontManager, this.globalData.fontManager.addChars(t.chars), this.globalData.fontManager.addFonts(t.fonts, document)
            }, CanvasRenderer.prototype.updateContainerSize = function() {
                var t, e;
                if (this.animationItem.wrapper && this.animationItem.container ? (t = this.animationItem.wrapper.offsetWidth, e = this.animationItem.wrapper.offsetHeight, this.animationItem.container.setAttribute("width", t * this.renderConfig.dpr), this.animationItem.container.setAttribute("height", e * this.renderConfig.dpr)) : (t = this.canvasContext.canvas.width * this.renderConfig.dpr, e = this.canvasContext.canvas.height * this.renderConfig.dpr), "fit" == this.renderConfig.scaleMode) {
                    var n = t / e,
                        i = this.transformCanvas.w / this.transformCanvas.h;
                    i > n ? (this.transformCanvas.sx = t / (this.transformCanvas.w / this.renderConfig.dpr), this.transformCanvas.sy = t / (this.transformCanvas.w / this.renderConfig.dpr), this.transformCanvas.tx = 0, this.transformCanvas.ty = (e - this.transformCanvas.h * (t / this.transformCanvas.w)) / 2 * this.renderConfig.dpr) : (this.transformCanvas.sx = e / (this.transformCanvas.h / this.renderConfig.dpr), this.transformCanvas.sy = e / (this.transformCanvas.h / this.renderConfig.dpr), this.transformCanvas.tx = (t - this.transformCanvas.w * (e / this.transformCanvas.h)) / 2 * this.renderConfig.dpr, this.transformCanvas.ty = 0)
                } else this.transformCanvas.sx = this.renderConfig.dpr, this.transformCanvas.sy = this.renderConfig.dpr, this.transformCanvas.tx = 0, this.transformCanvas.ty = 0;
                this.transformCanvas.props = [this.transformCanvas.sx, 0, 0, 0, 0, this.transformCanvas.sy, 0, 0, 0, 0, 1, 0, this.transformCanvas.tx, this.transformCanvas.ty, 0, 1], this.globalData.cWidth = t, this.globalData.cHeight = e
            }, CanvasRenderer.prototype.buildStage = function(t, e, n) {
                n || (n = this.elements);
                var i, r, s = e.length;
                for (i = s - 1; i >= 0; i--) r = e[i], void 0 !== r.parent && this.buildItemHierarchy(r, n[i], e, r.parent, n, !0), 0 == r.ty && this.buildStage(null, r.layers, n[i].getElements())
            }, CanvasRenderer.prototype.buildItemHierarchy = function(t, e, n, i, r, s) {
                var a = 0,
                    o = n.length;
                for (s && e.resetHierarchy(); o > a;) n[a].ind === i && (e.getHierarchy().push(r[a]), void 0 !== n[a].parent && this.buildItemHierarchy(t, e, n, n[a].parent, r, !1)), a += 1
            }, CanvasRenderer.prototype.destroy = function() {
                this.renderConfig.clearCanvas && (this.animationItem.wrapper.innerHTML = "");
                var t, e = this.layers.length;
                for (t = e - 1; t >= 0; t -= 1) this.elements[t].destroy();
                this.elements.length = 0, this.globalData.canvasContext = null, this.animationItem.container = null, this.destroyed = !0
            }, CanvasRenderer.prototype.renderFrame = function(t) {
                if (!(this.renderedFrame == t && this.renderConfig.clearCanvas === !0 || this.destroyed || null === t)) {
                    this.renderedFrame = t, this.globalData.frameNum = t - this.animationItem.firstFrame, this.globalData.frameId += 1, this.renderConfig.clearCanvas === !0 ? (this.reset(), this.canvasContext.clearRect(0, 0, this.transformCanvas.w, this.transformCanvas.h)) : this.save(), this.ctxTransform(this.transformCanvas.props), this.canvasContext.beginPath(), this.canvasContext.rect(0, 0, this.transformCanvas.w, this.transformCanvas.h), this.canvasContext.closePath(), this.canvasContext.clip();
                    var e, n = this.layers.length;
                    for (e = 0; n > e; e++) this.elements[e].prepareFrame(t - this.layers[e].st);
                    for (e = n - 1; e >= 0; e -= 1) this.elements[e].renderFrame();
                    this.renderConfig.clearCanvas !== !0 && this.restore()
                }
            }, CanvasRenderer.prototype.hide = function() {
                this.animationItem.container.style.display = "none"
            }, CanvasRenderer.prototype.show = function() {
                this.animationItem.container.style.display = "block"
            }, extendPrototype(ExpressionComp, CanvasRenderer), HybridRenderer.prototype.createItem = function(t, e, n, i) {
                switch (t.ty) {
                    case 2:
                        return this.createImage(t, e, n, i);
                    case 0:
                        return this.createComp(t, e, n, i);
                    case 1:
                        return this.createSolid(t, e, n, i);
                    case 4:
                        return this.createShape(t, e, n, i);
                    case 5:
                        return this.createText(t, e, n, i);
                    case 13:
                        return this.createCamera(t, e, n, i);
                    case 99:
                        return this.createPlaceHolder(t, e)
                }
                return this.createBase(t, e, n)
            }, HybridRenderer.prototype.buildItems = function(t, e, n, i, r) {
                var s, a = t.length;
                n || (n = this.elements), i || (i = this);
                var o, h, l = !1;
                for (s = a - 1; s >= 0; s--) e ? n[s] = this.createItem(t[s], e, i, r) : t[s].ddd ? (l || (l = !0, o = this.getThreeDContainer()), n[s] = this.createItem(t[s], o, i, r)) : (l = !1, n[s] = this.createItem(t[s], this.animationItem.resizerElem, i, r)), 0 === t[s].ty && (h = [], this.buildItems(t[s].layers, n[s].getDomElement(), h, n[s], n[s].placeholder), n[s].setElements(h)), t[s].td && n[s + 1].setMatte(n[s].layerId);
                if (this.currentContainer = this.animationItem.resizerElem, !e && this.threeDElements.length)
                    if (this.camera) this.camera.setup();
                    else {
                        var p = this.globalData.compSize.w,
                            u = this.globalData.compSize.h;
                        for (a = this.threeDElements.length, s = 0; a > s; s += 1) this.threeDElements[0][s].style.perspective = this.threeDElements[0][s].style.webkitPerspective = Math.sqrt(Math.pow(p, 2) + Math.pow(u, 2)) + "px"
                    }
            }, HybridRenderer.prototype.includeLayers = function(t, e, n) {
                var i, r = t.length;
                n || (n = this.elements), e || (e = this.currentContainer);
                var s, a, o, h = n.length;
                for (i = 0; r > i; i += 1)
                    if (t[i].id)
                        for (s = 0; h > s;) n[s].data.id == t[i].id && (o = n[s], n[s] = this.createItem(t[i], e, this, o), 0 === t[i].ty && (a = [], this.buildItems(t[i].layers, n[s].getDomElement(), a, n[s], n[i].placeholder), n[s].setElements(a))), s += 1;
                    else {
                        var l = this.createItem(t[i], e, this);
                        n.push(l), 0 === t[i].ty && (a = [], this.buildItems(t[i].layers, l.getDomElement(), a, l), l.setElements(a))
                    }
                for (i = 0; r > i; i += 1) t[i].td && n[i + 1].setMatte(n[i].layerId)
            }, HybridRenderer.prototype.createBase = function(t, e, n, i) {
                return new SVGBaseElement(t, e, this.globalData, n, i)
            }, HybridRenderer.prototype.createPlaceHolder = function(t, e) {
                return new PlaceHolderElement(t, e, this.globalData)
            }, HybridRenderer.prototype.createShape = function(t, e, n, i) {
                return n.isSvg ? new IShapeElement(t, e, this.globalData, n, i) : new HShapeElement(t, e, this.globalData, n, i)
            }, HybridRenderer.prototype.createText = function(t, e, n, i) {
                return n.isSvg ? new SVGTextElement(t, e, this.globalData, n, i) : new HTextElement(t, e, this.globalData, n, i)
            }, HybridRenderer.prototype.createCamera = function(t, e, n, i) {
                return this.camera = new HCameraElement(t, e, this.globalData, n, i), this.camera
            }, HybridRenderer.prototype.createImage = function(t, e, n, i) {
                return n.isSvg ? new IImageElement(t, e, this.globalData, n, i) : new HImageElement(t, e, this.globalData, n, i)
            }, HybridRenderer.prototype.createComp = function(t, e, n, i) {
                return n.isSvg ? new ICompElement(t, e, this.globalData, n, i) : new HCompElement(t, e, this.globalData, n, i)
            }, HybridRenderer.prototype.createSolid = function(t, e, n, i) {
                return n.isSvg ? new ISolidElement(t, e, this.globalData, n, i) : new HSolidElement(t, e, this.globalData, n, i)
            }, HybridRenderer.prototype.getThreeDContainer = function() {
                var t = document.createElement("div");
                styleDiv(t), t.style.width = this.globalData.compSize.w + "px", t.style.height = this.globalData.compSize.h + "px", t.style.transformOrigin = t.style.mozTransformOrigin = t.style.webkitTransformOrigin = "50% 50%";
                var e = document.createElement("div");
                return styleDiv(e), e.style.transform = e.style.webkitTransform = "matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1)", t.appendChild(e), this.animationItem.resizerElem.appendChild(t), this.threeDElements.push([t, e]), e
            }, HybridRenderer.prototype.configAnimation = function(t) {
                var e = document.createElement("div"),
                    n = this.animationItem.wrapper;
                e.style.width = t.w + "px", e.style.height = t.h + "px", this.animationItem.resizerElem = e, styleDiv(e), e.style.transformStyle = e.style.webkitTransformStyle = e.style.mozTransformStyle = "flat", n.appendChild(e), e.style.overflow = "hidden";
                var i = document.createElementNS(svgNS, "svg");
                i.setAttribute("width", "1"), i.setAttribute("height", "1"), styleDiv(i), this.animationItem.resizerElem.appendChild(i);
                var r = document.createElementNS(svgNS, "defs");
                i.appendChild(r), this.globalData.defs = r, this.globalData.getAssetData = this.animationItem.getAssetData.bind(this.animationItem), this.globalData.getPath = this.animationItem.getPath.bind(this.animationItem), this.globalData.elementLoaded = this.animationItem.elementLoaded.bind(this.animationItem), this.globalData.frameId = 0, this.globalData.compSize = {
                    w: t.w,
                    h: t.h
                }, this.globalData.frameRate = t.fr, this.layers = t.layers, this.globalData.fontManager = new FontManager, this.globalData.fontManager.addChars(t.chars), this.globalData.fontManager.addFonts(t.fonts, i), this.updateContainerSize()
            }, HybridRenderer.prototype.buildStage = function(t, e, n) {
                var i, r, s = e.length;
                for (n || (n = this.elements), i = s - 1; i >= 0; i--) r = e[i], void 0 !== r.parent && this.buildItemParenting(r, n[i], e, r.parent, n, !0), 0 === r.ty && this.buildStage(n[i].getComposingElement(), r.layers, n[i].getElements())
            }, HybridRenderer.prototype.buildItemParenting = function(t, e, n, i, r, s) {
                t.parents || (t.parents = []), s && e.resetHierarchy();
                for (var a = 0, o = n.length; o > a;) n[a].ind == i && (e.getHierarchy().push(r[a]), 13 === e.data.ty && r[a].finalTransform.mProp.setInverted(), void 0 !== n[a].parent && this.buildItemParenting(t, e, n, n[a].parent, r, !1)), a += 1
            }, HybridRenderer.prototype.destroy = function() {
                this.animationItem.wrapper.innerHTML = "", this.animationItem.container = null, this.globalData.defs = null;
                var t, e = this.layers.length;
                for (t = 0; e > t; t++) this.elements[t].destroy();
                this.elements.length = 0, this.destroyed = !0
            }, HybridRenderer.prototype.updateContainerSize = function() {
                var t, e, n, i, r = this.animationItem.wrapper.offsetWidth,
                    s = this.animationItem.wrapper.offsetHeight,
                    a = r / s,
                    o = this.globalData.compSize.w / this.globalData.compSize.h;
                o > a ? (t = r / this.globalData.compSize.w, e = r / this.globalData.compSize.w, n = 0, i = (s - this.globalData.compSize.h * (r / this.globalData.compSize.w)) / 2) : (t = s / this.globalData.compSize.h, e = s / this.globalData.compSize.h, n = (r - this.globalData.compSize.w * (s / this.globalData.compSize.h)) / 2, i = 0), this.animationItem.resizerElem.style.transform = this.animationItem.resizerElem.style.webkitTransform = "matrix3d(" + t + ",0,0,0,0," + e + ",0,0,0,0,1,0," + n + "," + i + ",0,1)"
            }, HybridRenderer.prototype.renderFrame = function(t) {
                if (this.renderedFrame != t && !this.destroyed) {
                    null === t ? t = this.renderedFrame : this.renderedFrame = t, this.globalData.frameNum = t, this.globalData.frameId += 1;
                    var e, n = this.layers.length;
                    for (e = 0; n > e; e++) this.elements[e].prepareFrame(t - this.layers[e].st);
                    for (e = 0; n > e; e++) this.elements[e].renderFrame()
                }
            }, HybridRenderer.prototype.hide = function() {
                this.animationItem.resizerElem.style.display = "none"
            }, HybridRenderer.prototype.show = function() {
                this.animationItem.resizerElem.style.display = "block"
            }, extendPrototype(ExpressionComp, HybridRenderer), MaskElement.prototype.getMaskProperty = function(t) {
                return this.viewData[t].prop
            }, MaskElement.prototype.prepareFrame = function() {
                var t, e = this.dynamicProperties.length;
                for (t = 0; e > t; t += 1) this.dynamicProperties[t].getValue()
            }, MaskElement.prototype.renderFrame = function() {
                var t, e = this.masksProperties.length;
                for (t = 0; e > t; t++)
                    if ("n" !== this.masksProperties[t].mode && this.masksProperties[t].cl !== !1 && ((this.viewData[t].prop.mdf || this.firstFrame) && this.drawPath(this.masksProperties[t], this.viewData[t].prop.v, this.viewData[t]), this.storedData[t].x && (this.storedData[t].x.mdf || this.firstFrame))) {
                        var n = this.storedData[t].expan;
                        this.storedData[t].x.v < 0 ? ("erode" !== this.storedData[t].lastOperator && (this.storedData[t].lastOperator = "erode", this.storedData[t].elem.setAttribute("filter", "url(#" + this.storedData[t].filterId + ")")), n.setAttribute("radius", -this.storedData[t].x.v)) : ("dilate" !== this.storedData[t].lastOperator && (this.storedData[t].lastOperator = "dilate", this.storedData[t].elem.setAttribute("filter", null)), this.storedData[t].elem.setAttribute("stroke-width", 2 * this.storedData[t].x.v))
                    }
                this.firstFrame = !1
            }, MaskElement.prototype.getMaskelement = function() {
                return this.maskElement
            }, MaskElement.prototype.createLayerSolidPath = function() {
                var t = "M0,0 ";
                return t += " h" + this.globalData.compSize.w, t += " v" + this.globalData.compSize.h, t += " h-" + this.globalData.compSize.w, t += " v-" + this.globalData.compSize.h + " "
            }, MaskElement.prototype.drawPath = function(t, e, n) {
                var i, r, s = "";
                for (r = e.v.length, i = 1; r > i; i += 1) 1 == i && (s += " M" + bm_rnd(e.v[0][0]) + "," + bm_rnd(e.v[0][1])), s += " C" + bm_rnd(e.o[i - 1][0]) + "," + bm_rnd(e.o[i - 1][1]) + " " + bm_rnd(e.i[i][0]) + "," + bm_rnd(e.i[i][1]) + " " + bm_rnd(e.v[i][0]) + "," + bm_rnd(e.v[i][1]);
                t.cl && (s += " C" + bm_rnd(e.o[i - 1][0]) + "," + bm_rnd(e.o[i - 1][1]) + " " + bm_rnd(e.i[0][0]) + "," + bm_rnd(e.i[0][1]) + " " + bm_rnd(e.v[0][0]) + "," + bm_rnd(e.v[0][1])), n.lastPath !== s && (t.inv ? n.elem.setAttribute("d", this.solidPath + s) : n.elem.setAttribute("d", s), n.lastPath = s)
            }, MaskElement.prototype.getMask = function(t) {
                for (var e = 0, n = this.masksProperties.length; n > e;) {
                    if (this.masksProperties[e].nm === t) return {
                        maskPath: this.viewData[e].prop.pv
                    };
                    e += 1
                }
            }, MaskElement.prototype.destroy = function() {
                this.element = null, this.globalData = null, this.maskElement = null, this.data = null, this.paths = null, this.masksProperties = null
            }, SliderEffect.prototype.proxyFunction = function() {
                return this.p.k && this.p.getValue(), this.p.v
            }, AngleEffect.prototype.proxyFunction = SliderEffect.prototype.proxyFunction, ColorEffect.prototype.proxyFunction = SliderEffect.prototype.proxyFunction, PointEffect.prototype.proxyFunction = SliderEffect.prototype.proxyFunction, CheckboxEffect.prototype.proxyFunction = SliderEffect.prototype.proxyFunction, EffectsManager.prototype.getEffect = function(t) {
                for (var e = this.data.ef, n = 0, i = e.length; i > n;) {
                    if (e[n].nm === t) return this.effectElements[n];
                    n += 1
                }
            }, BaseElement.prototype.checkMasks = function() {
                if (!this.data.hasMask) return !1;
                for (var t = 0, e = this.data.masksProperties.length; e > t;) {
                    if ("n" !== this.data.masksProperties[t].mode && this.data.masksProperties[t].cl !== !1) return !0;
                    t += 1
                }
                return !1
            }, BaseElement.prototype.prepareFrame = function(t) {
                this.data.ip - this.data.st <= t && this.data.op - this.data.st > t ? this.isVisible !== !0 && (this.isVisible = !0, this.firstFrame = !0, this.data.hasMask && (this.maskManager.firstFrame = !0)) : this.isVisible !== !1 && (this.isVisible = !1);
                var e, n = this.dynamicProperties.length;
                for (e = 0; n > e; e += 1) this.dynamicProperties[e].getValue(t);
                return this.data.hasMask && this.maskManager.prepareFrame(t), this.currentFrameNum = t, this.isVisible
            }, BaseElement.prototype.init = function() {
                this.hidden = !1, this.firstFrame = !0, this.isVisible = !1, this.dynamicProperties = [], this.currentFrameNum = -99999, this.lastNum = -99999, this.data.ef && (this.effectsManager = new EffectsManager(this.data, this, this.dynamicProperties), this.effect = this.effectsManager.getEffect.bind(this.effectsManager)), this.finalTransform = {
                    mProp: PropertyFactory.getProp(this, this.data.ks, 2, null, this.dynamicProperties),
                    matMdf: !1,
                    opMdf: !1,
                    mat: new Matrix,
                    opacity: 1
                }, this.finalTransform.op = this.finalTransform.mProp.o, this.transform = this.finalTransform.mProp, this.createElements(), this.data.hasMask && this.addMasks(this.data)
            }, BaseElement.prototype.getType = function() {
                return this.type
            }, BaseElement.prototype.resetHierarchy = function() {
                this.hierarchy ? this.hierarchy.length = 0 : this.hierarchy = []
            }, BaseElement.prototype.getHierarchy = function() {
                return this.hierarchy || (this.hierarchy = []), this.hierarchy
            }, BaseElement.prototype.getLayerSize = function() {
                return 5 === this.data.ty ? {
                    w: this.data.textData.width,
                    h: this.data.textData.height
                } : {
                    w: this.data.width,
                    h: this.data.height
                }
            }, BaseElement.prototype.hide = function() {}, BaseElement.prototype.mHelper = new Matrix, BaseElement.prototype.mask = function(t) {
                return this.maskManager.getMask(t)
            }, extendPrototype(LayerInterface, BaseElement), Object.defineProperty(BaseElement.prototype, "anchorPoint", {
                get: function() {
                    return this.finalTransform.mProp.anchorPoint
                }
            }), createElement(BaseElement, SVGBaseElement), SVGBaseElement.prototype.appendNodeToParent = function(t) {
                if (this.placeholder) {
                    var e = this.placeholder.phElement;
                    e.parentNode.insertBefore(t, e)
                } else this.parentContainer.appendChild(t)
            }, SVGBaseElement.prototype.createElements = function() {
                if (this.data.td) {
                    if (3 == this.data.td) this.layerElement = document.createElementNS(svgNS, "mask"), this.layerElement.setAttribute("id", this.layerId), this.layerElement.setAttribute("mask-type", "luminance"), this.globalData.defs.appendChild(this.layerElement);
                    else if (2 == this.data.td) {
                        var t = document.createElementNS(svgNS, "mask");
                        t.setAttribute("id", this.layerId), t.setAttribute("mask-type", "alpha");
                        var e = document.createElementNS(svgNS, "g");
                        t.appendChild(e), this.layerElement = document.createElementNS(svgNS, "g");
                        var n = document.createElementNS(svgNS, "filter"),
                            i = randomString(10);
                        n.setAttribute("id", i),
                            n.setAttribute("filterUnits", "objectBoundingBox"), n.setAttribute("x", "0%"), n.setAttribute("y", "0%"), n.setAttribute("width", "100%"), n.setAttribute("height", "100%");
                        var r = document.createElementNS(svgNS, "feComponentTransfer");
                        r.setAttribute("in", "SourceGraphic"), n.appendChild(r);
                        var s = document.createElementNS(svgNS, "feFuncA");
                        s.setAttribute("type", "table"), s.setAttribute("tableValues", "1.0 0.0"), r.appendChild(s), this.globalData.defs.appendChild(n);
                        var a = document.createElementNS(svgNS, "rect");
                        a.setAttribute("width", "100%"), a.setAttribute("height", "100%"), a.setAttribute("x", "0"), a.setAttribute("y", "0"), a.setAttribute("fill", "#ffffff"), a.setAttribute("opacity", "0"), e.setAttribute("filter", "url(#" + i + ")"), e.appendChild(a), e.appendChild(this.layerElement), this.globalData.defs.appendChild(t)
                    } else {
                        this.layerElement = document.createElementNS(svgNS, "g");
                        var o = document.createElementNS(svgNS, "mask");
                        o.setAttribute("id", this.layerId), o.setAttribute("mask-type", "alpha"), o.appendChild(this.layerElement), this.globalData.defs.appendChild(o)
                    }
                    this.data.hasMask && (this.maskedElement = this.layerElement)
                } else this.data.hasMask ? (this.layerElement = document.createElementNS(svgNS, "g"), this.data.tt ? (this.matteElement = document.createElementNS(svgNS, "g"), this.matteElement.appendChild(this.layerElement), this.appendNodeToParent(this.matteElement)) : this.appendNodeToParent(this.layerElement), this.maskedElement = this.layerElement) : this.data.tt ? (this.matteElement = document.createElementNS(svgNS, "g"), this.matteElement.setAttribute("id", this.layerId), this.appendNodeToParent(this.matteElement), this.layerElement = this.matteElement) : this.layerElement = this.parentContainer;
                !this.data.ln || 4 !== this.data.ty && 0 !== this.data.ty || (this.layerElement === this.parentContainer && (this.layerElement = document.createElementNS(svgNS, "g"), this.appendNodeToParent(this.layerElement)), this.layerElement.setAttribute("id", this.data.ln)), 0 !== this.data.ty || !this.finalTransform.op.k && 1 === this.finalTransform.op.p || this.layerElement !== this.parentContainer || (this.layerElement = document.createElementNS(svgNS, "g"), this.appendNodeToParent(this.layerElement)), this.layerElement !== this.parentContainer && (this.placeholder = null)
            }, SVGBaseElement.prototype.renderFrame = function(t) {
                if (3 === this.data.ty) return !1;
                if (this.currentFrameNum === this.lastNum || !this.isVisible) return this.isVisible;
                this.lastNum = this.currentFrameNum, this.data.hasMask && this.maskManager.renderFrame(), this.finalTransform.opMdf = this.finalTransform.op.mdf, this.finalTransform.matMdf = this.finalTransform.mProp.mdf, this.finalTransform.opacity = this.finalTransform.op.v, this.firstFrame && (this.finalTransform.opMdf = !0, this.finalTransform.matMdf = !0);
                var e, n = this.finalTransform.mat;
                if (this.hierarchy) {
                    var i, r = this.hierarchy.length;
                    for (e = this.finalTransform.mProp.v.props, n.cloneFromProps(e), i = 0; r > i; i += 1) this.finalTransform.matMdf = this.hierarchy[i].finalTransform.mProp.mdf ? !0 : this.finalTransform.matMdf, e = this.hierarchy[i].finalTransform.mProp.v.props, n.transform(e[0], e[1], e[2], e[3], e[4], e[5], e[6], e[7], e[8], e[9], e[10], e[11], e[12], e[13], e[14], e[15])
                } else this.isVisible && (t ? (e = this.finalTransform.mProp.v.props, n.cloneFromProps(e)) : n.cloneFromProps(this.finalTransform.mProp.v.props));
                return t && (e = t.mat.props, n.transform(e[0], e[1], e[2], e[3], e[4], e[5], e[6], e[7], e[8], e[9], e[10], e[11], e[12], e[13], e[14], e[15]), this.finalTransform.opacity *= t.opacity, this.finalTransform.opMdf = t.opMdf ? !0 : this.finalTransform.opMdf, this.finalTransform.matMdf = t.matMdf ? !0 : this.finalTransform.matMdf), this.data.hasMask ? (this.finalTransform.matMdf && this.layerElement.setAttribute("transform", n.to2dCSS()), this.finalTransform.opMdf && this.layerElement.setAttribute("opacity", this.finalTransform.opacity)) : 0 === this.data.ty && this.finalTransform.opMdf && (this.finalTransform.op.k || 1 !== this.finalTransform.op.p) && (this.layerElement.setAttribute("opacity", this.finalTransform.opacity), this.finalTransform.opacity = 1), this.isVisible
            }, SVGBaseElement.prototype.destroy = function() {
                this.layerElement = null, this.parentContainer = null, this.matteElement && (this.matteElement = null), this.maskManager && this.maskManager.destroy()
            }, SVGBaseElement.prototype.getDomElement = function() {
                return this.layerElement
            }, SVGBaseElement.prototype.addMasks = function(t) {
                this.maskManager = new MaskElement(t, this, this.globalData)
            }, SVGBaseElement.prototype.setMatte = function(t) {
                this.matteElement && this.matteElement.setAttribute("mask", "url(#" + t + ")")
            }, SVGBaseElement.prototype.hide = function() {}, ITextElement.prototype.init = function() {
                this.parent.init.call(this), this.lettersChangedFlag = !1;
                var t = this.data;
                this.renderedLetters = Array.apply(null, {
                    length: t.t.d.l.length
                }), this.viewData = {
                    m: {
                        a: PropertyFactory.getProp(this, t.t.m.a, 1, 0, this.dynamicProperties)
                    }
                };
                var e = this.data.t;
                if (e.a.length) {
                    this.viewData.a = Array.apply(null, {
                        length: e.a.length
                    });
                    var n, i, r, s = e.a.length;
                    for (n = 0; s > n; n += 1) r = e.a[n], i = {
                        a: {},
                        s: {}
                    }, "r" in r.a && (i.a.r = PropertyFactory.getProp(this, r.a.r, 0, degToRads, this.dynamicProperties)), "rx" in r.a && (i.a.rx = PropertyFactory.getProp(this, r.a.rx, 0, degToRads, this.dynamicProperties)), "ry" in r.a && (i.a.ry = PropertyFactory.getProp(this, r.a.ry, 0, degToRads, this.dynamicProperties)), "sk" in r.a && (i.a.sk = PropertyFactory.getProp(this, r.a.sk, 0, degToRads, this.dynamicProperties)), "sa" in r.a && (i.a.sa = PropertyFactory.getProp(this, r.a.sa, 0, degToRads, this.dynamicProperties)), "s" in r.a && (i.a.s = PropertyFactory.getProp(this, r.a.s, 1, .01, this.dynamicProperties)), "a" in r.a && (i.a.a = PropertyFactory.getProp(this, r.a.a, 1, 0, this.dynamicProperties)), "o" in r.a && (i.a.o = PropertyFactory.getProp(this, r.a.o, 0, .01, this.dynamicProperties)), "p" in r.a && (i.a.p = PropertyFactory.getProp(this, r.a.p, 1, 0, this.dynamicProperties)), "sw" in r.a && (i.a.sw = PropertyFactory.getProp(this, r.a.sw, 0, 0, this.dynamicProperties)), "sc" in r.a && (i.a.sc = PropertyFactory.getProp(this, r.a.sc, 1, 0, this.dynamicProperties)), "fc" in r.a && (i.a.fc = PropertyFactory.getProp(this, r.a.fc, 1, 0, this.dynamicProperties)), "fh" in r.a && (i.a.fh = PropertyFactory.getProp(this, r.a.fh, 0, 0, this.dynamicProperties)), "fs" in r.a && (i.a.fs = PropertyFactory.getProp(this, r.a.fs, 0, .01, this.dynamicProperties)), "fb" in r.a && (i.a.fb = PropertyFactory.getProp(this, r.a.fb, 0, .01, this.dynamicProperties)), "t" in r.a && (i.a.t = PropertyFactory.getProp(this, r.a.t, 0, 0, this.dynamicProperties)), i.s = PropertyFactory.getTextSelectorProp(this, r.s, this.dynamicProperties), i.s.t = r.s.t, this.viewData.a[n] = i
                } else this.viewData.a = [];
                e.p && "m" in e.p ? (this.viewData.p = {
                    f: PropertyFactory.getProp(this, e.p.f, 0, 0, this.dynamicProperties),
                    l: PropertyFactory.getProp(this, e.p.l, 0, 0, this.dynamicProperties),
                    r: e.p.r,
                    m: this.maskManager.getMaskProperty(e.p.m)
                }, this.maskPath = !0) : this.maskPath = !1
            }, ITextElement.prototype.createPathShape = function(t, e) {
                var n, i, r, s, a = e.length,
                    o = "";
                for (n = 0; a > n; n += 1) {
                    for (r = e[n].ks.k.i.length, s = e[n].ks.k, i = 1; r > i; i += 1) 1 == i && (o += " M" + t.applyToPointStringified(s.v[0][0], s.v[0][1])), o += " C" + t.applyToPointStringified(s.o[i - 1][0], s.o[i - 1][1]) + " " + t.applyToPointStringified(s.i[i][0], s.i[i][1]) + " " + t.applyToPointStringified(s.v[i][0], s.v[i][1]);
                    o += " C" + t.applyToPointStringified(s.o[i - 1][0], s.o[i - 1][1]) + " " + t.applyToPointStringified(s.i[0][0], s.i[0][1]) + " " + t.applyToPointStringified(s.v[0][0], s.v[0][1]), o += "z"
                }
                return o
            }, ITextElement.prototype.getMeasures = function() {
                var t, e, n, i, r = this.mHelper,
                    s = this.renderType,
                    a = this.data,
                    o = a.t.d,
                    h = o.l;
                if (this.maskPath) {
                    var l = this.viewData.p.m;
                    if (!this.viewData.p.n || this.viewData.p.mdf) {
                        var p = l.v;
                        this.viewData.p.r && (p = reversePath(p, l.closed));
                        var u = {
                            tLength: 0,
                            segments: []
                        };
                        i = p.v.length - 1;
                        var c, f = 0;
                        for (n = 0; i > n; n += 1) c = {
                            s: p.v[n],
                            e: p.v[n + 1],
                            to: [p.o[n][0] - p.v[n][0], p.o[n][1] - p.v[n][1]],
                            ti: [p.i[n + 1][0] - p.v[n + 1][0], p.i[n + 1][1] - p.v[n + 1][1]]
                        }, bez.buildBezierData(c), u.tLength += c.bezierData.segmentLength, u.segments.push(c), f += c.bezierData.segmentLength;
                        n = i, l.closed && (c = {
                            s: p.v[n],
                            e: p.v[0],
                            to: [p.o[n][0] - p.v[n][0], p.o[n][1] - p.v[n][1]],
                            ti: [p.i[0][0] - p.v[0][0], p.i[0][1] - p.v[0][1]]
                        }, bez.buildBezierData(c), u.tLength += c.bezierData.segmentLength, u.segments.push(c), f += c.bezierData.segmentLength), this.viewData.p.pi = u
                    }
                    var m, d, v, u = this.viewData.p.pi,
                        g = this.viewData.p.f.v,
                        y = 0,
                        b = 1,
                        w = 0,
                        E = !0,
                        C = u.segments;
                    if (0 > g && l.closed)
                        for (u.tLength < Math.abs(g) && (g = -Math.abs(g) % u.tLength), y = C.length - 1, v = C[y].bezierData.points, b = v.length - 1; 0 > g;) g += v[b].partialLength, b -= 1, 0 > b && (y -= 1, v = C[y].bezierData.points, b = v.length - 1);
                    v = C[y].bezierData.points, d = v[b - 1], m = v[b];
                    var _, x, S = m.partialLength
                }
                i = h.length, t = 0, e = 0;
                var A, k, P, T, M, D = 1.2 * a.t.d.s * .714,
                    I = !0,
                    F = this.viewData,
                    L = Array.apply(null, {
                        length: i
                    });
                this.lettersChangedFlag = !1, T = F.a.length;
                var O, z, j, V, N, B, R, H, W, q, G, U, $, Q, X, Z, Y = -1,
                    J = g,
                    K = y,
                    tt = b,
                    et = -1,
                    nt = 0;
                for (n = 0; i > n; n += 1)
                    if (r.reset(), B = 1, h[n].n) t = 0, e += o.yOffset, e += I ? 1 : 0, g = J, I = !1, nt = 0, this.maskPath && (y = K, b = tt, v = C[y].bezierData.points, d = v[b - 1], m = v[b], S = m.partialLength, w = 0), L[n] = this.emptyProp;
                    else {
                        if (this.maskPath) {
                            if (et !== h[n].line) {
                                switch (o.j) {
                                    case 1:
                                        g += f - o.lineWidths[h[n].line];
                                        break;
                                    case 2:
                                        g += (f - o.lineWidths[h[n].line]) / 2
                                }
                                et = h[n].line
                            }
                            Y !== h[n].ind && (h[Y] && (g += h[Y].extra), g += h[n].an / 2, Y = h[n].ind), g += F.m.a.v[0] * h[n].an / 200;
                            var it = 0;
                            for (P = 0; T > P; P += 1) A = F.a[P].a, "p" in A && (k = F.a[P].s, z = k.getMult(h[n].anIndexes[P]), it += z.length ? A.p.v[0] * z[0] : A.p.v[0] * z);
                            for (E = !0; E;) w + S >= g + it || !v ? (_ = (g + it - w) / m.partialLength, V = d.point[0] + (m.point[0] - d.point[0]) * _, N = d.point[1] + (m.point[1] - d.point[1]) * _, r.translate(0, -(F.m.a.v[1] * D / 100) + e), E = !1) : v && (w += m.partialLength, b += 1, b >= v.length && (b = 0, y += 1, C[y] ? v = C[y].bezierData.points : l.closed ? (b = 0, y = 0, v = C[y].bezierData.points) : (w -= m.partialLength, v = null)), v && (d = m, m = v[b], S = m.partialLength));
                            j = h[n].an / 2 - h[n].add, r.translate(-j, 0, 0)
                        } else j = h[n].an / 2 - h[n].add, r.translate(-j, 0, 0), r.translate(-F.m.a.v[0] * h[n].an / 200, -F.m.a.v[1] * D / 100, 0);
                        for (nt += h[n].l / 2, P = 0; T > P; P += 1) A = F.a[P].a, "t" in A && (k = F.a[P].s, z = k.getMult(h[n].anIndexes[P]), this.maskPath ? g += z.length ? A.t * z[0] : A.t * z : t += z.length ? A.t.v * z[0] : A.t.v * z);
                        for (nt += h[n].l / 2, o.strokeWidthAnim && (H = a.t.d.sw || 0), o.strokeColorAnim && (R = a.t.d.sc ? [a.t.d.sc[0], a.t.d.sc[1], a.t.d.sc[2]] : [0, 0, 0]), o.fillColorAnim && (W = [a.t.d.fc[0], a.t.d.fc[1], a.t.d.fc[2]]), P = 0; T > P; P += 1) A = F.a[P].a, "a" in A && (k = F.a[P].s, z = k.getMult(h[n].anIndexes[P]), z.length ? r.translate(-A.a.v[0] * z[0], -A.a.v[1] * z[1], A.a.v[2] * z[2]) : r.translate(-A.a.v[0] * z, -A.a.v[1] * z, A.a.v[2] * z));
                        for (P = 0; T > P; P += 1) A = F.a[P].a, "s" in A && (k = F.a[P].s, z = k.getMult(h[n].anIndexes[P]), z.length ? r.scale(1 + (A.s.v[0] - 1) * z[0], 1 + (A.s.v[1] - 1) * z[1], 1) : r.scale(1 + (A.s.v[0] - 1) * z, 1 + (A.s.v[1] - 1) * z, 1));
                        for (P = 0; T > P; P += 1) {
                            if (A = F.a[P].a, k = F.a[P].s, z = k.getMult(h[n].anIndexes[P]), "sk" in A && (z.length ? r.skewFromAxis(-A.sk.v * z[0], A.sa.v * z[1]) : r.skewFromAxis(-A.sk.v * z, A.sa.v * z)), "r" in A && r.rotateZ(z.length ? -A.r.v * z[2] : -A.r.v * z), "ry" in A && r.rotateY(z.length ? A.ry.v * z[1] : A.ry.v * z), "rx" in A && r.rotateX(z.length ? A.rx.v * z[0] : A.rx.v * z), "o" in A && (B += z.length ? (A.o.v * z[0] - B) * z[0] : (A.o.v * z - B) * z), o.strokeWidthAnim && "sw" in A && (H += z.length ? A.sw.v * z[0] : A.sw.v * z), o.strokeColorAnim && "sc" in A)
                                for (q = 0; 3 > q; q += 1) R[q] = Math.round(z.length ? R[q] + (A.sc.v[q] - R[q]) * z[0] : R[q] + (A.sc.v[q] - R[q]) * z);
                            if (o.fillColorAnim) {
                                if ("fc" in A)
                                    for (q = 0; 3 > q; q += 1) W[q] = Math.round(z.length ? W[q] + (A.fc.v[q] - W[q]) * z[0] : W[q] + (A.fc.v[q] - W[q]) * z);
                                "fh" in A && (W = z.length ? addHueToRGB(W, A.fh.v * z[0]) : addHueToRGB(W, A.fh.v * z)), "fs" in A && (W = z.length ? addSaturationToRGB(W, A.fs.v * z[0]) : addSaturationToRGB(W, A.fs.v * z)), "fb" in A && (W = z.length ? addBrightnessToRGB(W, A.fb.v * z[0]) : addBrightnessToRGB(W, A.fb.v * z))
                            }
                        }
                        for (P = 0; T > P; P += 1) A = F.a[P].a, "p" in A && (k = F.a[P].s, z = k.getMult(h[n].anIndexes[P]), this.maskPath ? z.length ? r.translate(0, A.p.v[1] * z[0], -A.p.v[2] * z[1]) : r.translate(0, A.p.v[1] * z, -A.p.v[2] * z) : z.length ? r.translate(A.p.v[0] * z[0], A.p.v[1] * z[1], -A.p.v[2] * z[2]) : r.translate(A.p.v[0] * z, A.p.v[1] * z, -A.p.v[2] * z));
                        if (o.strokeWidthAnim && (G = 0 > H ? 0 : H), o.strokeColorAnim && (U = "rgb(" + R[0] + "," + R[1] + "," + R[2] + ")"), o.fillColorAnim && ($ = "rgb(" + W[0] + "," + W[1] + "," + W[2] + ")"), this.maskPath) {
                            if (a.t.p.p) {
                                x = (m.point[1] - d.point[1]) / (m.point[0] - d.point[0]);
                                var rt = 180 * Math.atan(x) / Math.PI;
                                m.point[0] < d.point[0] && (rt += 180), r.rotate(-rt * Math.PI / 180)
                            }
                            r.translate(V, N, 0), r.translate(F.m.a.v[0] * h[n].an / 200, F.m.a.v[1] * D / 100, 0), g -= F.m.a.v[0] * h[n].an / 200, h[n + 1] && Y !== h[n + 1].ind && (g += h[n].an / 2, g += o.tr / 1e3 * a.t.d.s)
                        } else {
                            switch (r.translate(t, e, 0), o.ps && r.translate(o.ps[0], o.ps[1] + o.ascent, 0), o.j) {
                                case 1:
                                    r.translate(o.justifyOffset + (o.boxWidth - o.lineWidths[h[n].line]), 0, 0);
                                    break;
                                case 2:
                                    r.translate(o.justifyOffset + (o.boxWidth - o.lineWidths[h[n].line]) / 2, 0, 0)
                            }
                            r.translate(j, 0, 0), r.translate(F.m.a.v[0] * h[n].an / 200, F.m.a.v[1] * D / 100, 0), t += h[n].l + o.tr / 1e3 * a.t.d.s
                        }
                        "html" === s ? Q = r.toCSS() : "svg" === s ? Q = r.to2dCSS() : X = [r.props[0], r.props[1], r.props[2], r.props[3], r.props[4], r.props[5], r.props[6], r.props[7], r.props[8], r.props[9], r.props[10], r.props[11], r.props[12], r.props[13], r.props[14], r.props[15]], Z = B, O = this.renderedLetters[n], !O || O.o === Z && O.sw === G && O.sc === U && O.fc === $ ? "svg" !== s && "html" !== s || O && O.m === Q ? "canvas" !== s || O && O.props[0] === X[0] && O.props[1] === X[1] && O.props[4] === X[4] && O.props[5] === X[5] && O.props[12] === X[12] && O.props[13] === X[13] ? M = O : (this.lettersChangedFlag = !0, M = new LetterProps(Z, G, U, $, null, X)) : (this.lettersChangedFlag = !0, M = new LetterProps(Z, G, U, $, Q)) : (this.lettersChangedFlag = !0, M = new LetterProps(Z, G, U, $, Q, X)), this.renderedLetters[n] = M
                    }
            }, ITextElement.prototype.emptyProp = new LetterProps, createElement(SVGBaseElement, SVGTextElement), SVGTextElement.prototype.init = ITextElement.prototype.init, SVGTextElement.prototype.createPathShape = ITextElement.prototype.createPathShape, SVGTextElement.prototype.getMeasures = ITextElement.prototype.getMeasures, SVGTextElement.prototype.createElements = function() {
                this.parent.createElements.call(this);
                var t = this.data.t.d;
                this.innerElem = document.createElementNS(svgNS, "g"), t.fc ? this.innerElem.setAttribute("fill", "rgb(" + t.fc[0] + "," + t.fc[1] + "," + t.fc[2] + ")") : this.innerElem.setAttribute("fill", "rgba(0,0,0,0)"), t.sc && (this.innerElem.setAttribute("stroke", "rgb(" + t.sc[0] + "," + t.sc[1] + "," + t.sc[2] + ")"), this.innerElem.setAttribute("stroke-width", t.sw)), this.innerElem.setAttribute("font-size", t.s);
                var e = this.globalData.fontManager.getFontByName(t.f);
                if (e.fClass) this.innerElem.setAttribute("class", e.fClass);
                else {
                    this.innerElem.setAttribute("font-family", e.fFamily);
                    var n = t.fWeight,
                        i = t.fStyle;
                    this.innerElem.setAttribute("font-style", i), this.innerElem.setAttribute("font-weight", n)
                }
                var r, s;
                this.layerElement === this.parentContainer ? this.appendNodeToParent(this.innerElem) : this.layerElement.appendChild(this.innerElem);
                var a = t.l;
                if (s = a.length) {
                    var o, h, l = this.mHelper,
                        p = "",
                        u = this.data.singleShape;
                    if (u) var c = 0,
                        f = 0,
                        m = t.lineWidths,
                        d = t.boxWidth,
                        v = !0;
                    for (r = 0; s > r; r += 1) {
                        if (this.globalData.fontManager.chars ? u && 0 !== r || (o = document.createElementNS(svgNS, "path")) : o = document.createElementNS(svgNS, "text"), o.setAttribute("stroke-linecap", "butt"), o.setAttribute("stroke-linejoin", "round"), o.setAttribute("stroke-miterlimit", "4"), u && a[r].n && (c = 0, f += t.yOffset, f += v ? 1 : 0, v = !1), l.reset(), this.globalData.fontManager.chars && l.scale(t.s / 100, t.s / 100), u) {
                            switch (t.ps && l.translate(t.ps[0], t.ps[1] + t.ascent, 0), t.j) {
                                case 1:
                                    l.translate(t.justifyOffset + (d - m[a[r].line]), 0, 0);
                                    break;
                                case 2:
                                    l.translate(t.justifyOffset + (d - m[a[r].line]) / 2, 0, 0)
                            }
                            l.translate(c, f, 0)
                        }
                        if (this.globalData.fontManager.chars) {
                            var g, y = this.globalData.fontManager.getCharData(t.t.charAt(r), e.fStyle, this.globalData.fontManager.getFontByName(t.f).fFamily);
                            g = y ? y.data : null, g && g.shapes && (h = g.shapes[0].it, u || (p = ""), p += this.createPathShape(l, h), u || o.setAttribute("d", p)), u || this.innerElem.appendChild(o)
                        } else o.textContent = a[r].val, o.setAttributeNS("http://www.w3.org/XML/1998/namespace", "xml:space", "preserve"), this.innerElem.appendChild(o), u && o.setAttribute("transform", l.to2dCSS());
                        u && (c += a[r].l), this.textSpans.push(o)
                    }
                    u && this.globalData.fontManager.chars && (o.setAttribute("d", p), this.innerElem.appendChild(o))
                }
            }, SVGTextElement.prototype.hide = function() {
                this.hidden || (this.innerElem.style.display = "none", this.hidden = !0)
            }, SVGTextElement.prototype.renderFrame = function(t) {
                var e = this.parent.renderFrame.call(this, t);
                if (e === !1) return void this.hide();
                if (this.hidden && (this.hidden = !1, this.innerElem.style.display = "block"), this.data.hasMask || (this.finalTransform.matMdf && this.innerElem.setAttribute("transform", this.finalTransform.mat.to2dCSS()), this.finalTransform.opMdf && this.innerElem.setAttribute("opacity", this.finalTransform.opacity)), !this.data.singleShape && (this.getMeasures(), this.lettersChangedFlag)) {
                    var n, i, r = this.renderedLetters,
                        s = this.data.t.d.l;
                    i = s.length;
                    var a;
                    for (n = 0; i > n; n += 1) s[n].n || (a = r[n], this.textSpans[n].setAttribute("transform", a.m), this.textSpans[n].setAttribute("opacity", a.o), a.sw && this.textSpans[n].setAttribute("stroke-width", a.sw), a.sc && this.textSpans[n].setAttribute("stroke", a.sc), a.fc && this.textSpans[n].setAttribute("fill", a.fc));
                    this.firstFrame && (this.firstFrame = !1)
                }
            }, SVGTextElement.prototype.destroy = function() {
                this.parent.destroy.call(), this.innerElem = null
            };
            var PlaceHolderElement = function(t, e, n) {
                if (this.data = t, this.globalData = n, e) {
                    this.parentContainer = e;
                    var i = document.createElementNS(svgNS, "g");
                    i.setAttribute("id", this.data.id), e.appendChild(i), this.phElement = i
                }
                this.layerId = "ly_" + randomString(10)
            };
            PlaceHolderElement.prototype.prepareFrame = function() {}, PlaceHolderElement.prototype.renderFrame = function() {}, PlaceHolderElement.prototype.draw = function() {}, createElement(SVGBaseElement, ICompElement), extendPrototype(ExpressionComp, ICompElement), ICompElement.prototype.getComposingElement = function() {
                return this.layerElement
            }, ICompElement.prototype.hide = function() {
                if (!this.hidden) {
                    var t, e = this.elements.length;
                    for (t = 0; e > t; t += 1) this.elements[t].hide();
                    this.hidden = !0
                }
            }, ICompElement.prototype.prepareFrame = function(t) {
                if (this.parent.prepareFrame.call(this, t), this.isVisible !== !1) {
                    var e = t;
                    this.tm && (e = this.tm.v, e === this.data.op && (e = this.data.op - 1)), this.renderedFrame = e;
                    var n, i = this.elements.length;
                    for (n = 0; i > n; n += 1) this.elements[n].prepareFrame(e - this.layers[n].st)
                }
            }, ICompElement.prototype.renderFrame = function(t) {
                var e, n = this.parent.renderFrame.call(this, t),
                    i = this.layers.length;
                if (n === !1) return void this.hide();
                for (this.hidden = !1, e = 0; i > e; e += 1) this.data.hasMask ? this.elements[e].renderFrame() : this.elements[e].renderFrame(this.finalTransform);
                this.firstFrame && (this.firstFrame = !1)
            }, ICompElement.prototype.setElements = function(t) {
                this.elements = t
            }, ICompElement.prototype.getElements = function() {
                return this.elements
            }, ICompElement.prototype.destroy = function() {
                this.parent.destroy.call();
                var t, e = this.layers.length;
                for (t = 0; e > t; t += 1) this.elements[t].destroy()
            }, createElement(SVGBaseElement, IImageElement), IImageElement.prototype.createElements = function() {
                var t = this,
                    e = function() {
                        t.innerElem.setAttributeNS("http://www.w3.org/1999/xlink", "href", t.path + t.assetData.p), t.maskedElement = t.innerElem
                    },
                    n = new Image;
                n.addEventListener("load", e, !1), n.addEventListener("error", e, !1), n.src = this.path + this.assetData.p, this.parent.createElements.call(this), this.innerElem = document.createElementNS(svgNS, "image"), this.innerElem.setAttribute("width", this.assetData.w + "px"), this.innerElem.setAttribute("height", this.assetData.h + "px"), this.layerElement === this.parentContainer ? this.appendNodeToParent(this.innerElem) : this.layerElement.appendChild(this.innerElem), this.data.ln && this.innerElem.setAttribute("id", this.data.ln)
            }, IImageElement.prototype.hide = function() {
                this.hidden || (this.innerElem.setAttribute("visibility", "hidden"), this.hidden = !0)
            }, IImageElement.prototype.renderFrame = function(t) {
                var e = this.parent.renderFrame.call(this, t);
                return e === !1 ? void this.hide() : (this.hidden && (this.hidden = !1, this.innerElem.setAttribute("visibility", "visible")), this.data.hasMask || ((this.finalTransform.matMdf || this.firstFrame) && this.innerElem.setAttribute("transform", this.finalTransform.mat.to2dCSS()), (this.finalTransform.opMdf || this.firstFrame) && this.innerElem.setAttribute("opacity", this.finalTransform.opacity)), void(this.firstFrame && (this.firstFrame = !1)))
            }, IImageElement.prototype.destroy = function() {
                this.parent.destroy.call(), this.innerElem = null
            }, createElement(SVGBaseElement, IShapeElement), IShapeElement.prototype.lcEnum = {
                1: "butt",
                2: "round",
                3: "butt"
            }, IShapeElement.prototype.ljEnum = {
                1: "miter",
                2: "round",
                3: "butt"
            }, IShapeElement.prototype.transformHelper = {
                opacity: 1,
                mat: new Matrix,
                matMdf: !1,
                opMdf: !1
            }, IShapeElement.prototype.createElements = function() {
                this.parent.createElements.call(this), this.searchShapes(this.shapesData, this.viewData, this.dynamicProperties, []), this.layerElement.appendChild(this.shapesContainer), styleUnselectableDiv(this.layerElement), styleUnselectableDiv(this.shapesContainer), this.buildExpressionInterface()
            }, IShapeElement.prototype.searchShapes = function(t, e, n, i) {
                var r, s, a, o = t.length - 1,
                    h = [],
                    l = [];
                for (r = o; r >= 0; r -= 1)
                    if ("fl" == t[r].ty || "st" == t[r].ty) {
                        e[r] = {};
                        var p;
                        if (e[r].c = PropertyFactory.getProp(this, t[r].c, 1, null, n), e[r].o = PropertyFactory.getProp(this, t[r].o, 0, .01, n), "st" == t[r].ty) {
                            if (p = document.createElementNS(svgNS, "g"), p.style.strokeLinecap = this.lcEnum[t[r].lc] || "round", p.style.strokeLinejoin = this.ljEnum[t[r].lj] || "round", p.style.fillOpacity = 0, 1 == t[r].lj && (p.style.strokeMiterlimit = t[r].ml), e[r].c.k || (p.style.stroke = "rgb(" + e[r].c.v[0] + "," + e[r].c.v[1] + "," + e[r].c.v[2] + ")"), e[r].o.k || (p.style.strokeOpacity = e[r].o.v), e[r].w = PropertyFactory.getProp(this, t[r].w, 0, null, n), e[r].w.k || (p.style.strokeWidth = e[r].w.v), t[r].d) {
                                var u = PropertyFactory.getDashProp(this, t[r].d, "svg", n);
                                u.k || (p.style.strokeDasharray = u.dasharray, p.style.strokeDashoffset = u.dashoffset), e[r].d = u
                            }
                        } else p = document.createElementNS(svgNS, "path"), e[r].c.k || (p.style.fill = "rgb(" + e[r].c.v[0] + "," + e[r].c.v[1] + "," + e[r].c.v[2] + ")"), e[r].o.k || (p.style.fillOpacity = e[r].o.v);
                        this.shapesContainer.appendChild(p), this.stylesList.push({
                            pathElement: p,
                            type: t[r].ty,
                            d: "",
                            ld: "",
                            mdf: !1
                        }), e[r].style = this.stylesList[this.stylesList.length - 1], h.push(e[r].style)
                    } else if ("gr" == t[r].ty) e[r] = {
                    it: []
                }, this.searchShapes(t[r].it, e[r].it, n, i);
                else if ("tr" == t[r].ty) e[r] = {
                    transform: {
                        mat: new Matrix,
                        opacity: 1,
                        matMdf: !1,
                        opMdf: !1,
                        op: PropertyFactory.getProp(this, t[r].o, 0, .01, n),
                        mProps: PropertyFactory.getProp(this, t[r], 2, null, n)
                    },
                    elements: []
                };
                else if ("sh" == t[r].ty || "rc" == t[r].ty || "el" == t[r].ty || "sr" == t[r].ty) {
                    e[r] = {
                        elements: [],
                        styles: [],
                        lStr: ""
                    };
                    var c = 4;
                    "rc" == t[r].ty ? c = 5 : "el" == t[r].ty ? c = 6 : "sr" == t[r].ty && (c = 7), i.length && (t[r].trimmed = !0), e[r].sh = PropertyFactory.getShapeProp(this, t[r], c, n, i), a = this.stylesList.length;
                    var f, m = !1,
                        d = !1;
                    for (s = 0; a > s; s += 1) this.stylesList[s].closed || ("st" === this.stylesList[s].type ? (m = !0, f = document.createElementNS(svgNS, "path"), this.stylesList[s].pathElement.appendChild(f), e[r].elements.push({
                        ty: this.stylesList[s].type,
                        el: f
                    })) : (d = !0, e[r].elements.push({
                        ty: this.stylesList[s].type,
                        st: this.stylesList[s]
                    })));
                    e[r].st = m, e[r].fl = d
                } else if ("tm" == t[r].ty) {
                    var v = {
                        closed: !1,
                        trimProp: PropertyFactory.getProp(this, t[r], 7, null, n)
                    };
                    e[r] = {
                        tr: v.trimProp
                    }, i.push(v), l.push(v)
                }
                for (o = h.length, r = 0; o > r; r += 1) h[r].closed = !0;
                for (o = l.length, r = 0; o > r; r += 1) l[r].closed = !0
            }, IShapeElement.prototype.renderFrame = function(t) {
                var e = this.parent.renderFrame.call(this, t);
                return e === !1 ? void this.hide() : (this.hidden = !1, this.finalTransform.matMdf && !this.data.hasMask && this.shapesContainer.setAttribute("transform", this.finalTransform.mat.to2dCSS()), this.transformHelper.opacity = this.finalTransform.opacity, this.transformHelper.matMdf = !1, this.transformHelper.opMdf = this.finalTransform.opMdf, void this.renderShape(this.transformHelper, null, null, !0))
            }, IShapeElement.prototype.hide = function() {
                if (!this.hidden) {
                    var t, e = this.stylesList.length;
                    for (t = e - 1; t >= 0; t -= 1) "0" !== this.stylesList[t].ld && (this.stylesList[t].ld = "0", this.stylesList[t].pathElement.style.display = "none", this.stylesList[t].pathElement.parentNode && (this.stylesList[t].parent = this.stylesList[t].pathElement.parentNode));
                    this.hidden = !0
                }
            }, IShapeElement.prototype.renderShape = function(t, e, n, i) {
                var r, s;
                if (!e)
                    for (e = this.shapesData, s = this.stylesList.length, r = 0; s > r; r += 1) this.stylesList[r].d = "", this.stylesList[r].mdf = !1;
                n || (n = this.viewData), s = e.length - 1;
                var a, o;
                for (a = t, r = s; r >= 0; r -= 1)
                    if ("tr" == e[r].ty) {
                        a = n[r].transform;
                        var h = n[r].transform.mProps.v.props;
                        if (a.matMdf = a.mProps.mdf, a.opMdf = a.op.mdf, o = a.mat, o.cloneFromProps(h), t) {
                            var l = t.mat.props;
                            a.opacity = t.opacity, a.opacity *= n[r].transform.op.v, a.matMdf = t.matMdf ? !0 : a.matMdf, a.opMdf = t.opMdf ? !0 : a.opMdf, o.transform(l[0], l[1], l[2], l[3], l[4], l[5], l[6], l[7], l[8], l[9], l[10], l[11], l[12], l[13], l[14], l[15])
                        } else a.opacity = a.op.o
                    } else "sh" == e[r].ty || "el" == e[r].ty || "rc" == e[r].ty || "sr" == e[r].ty ? this.renderPath(e[r], n[r], a) : "fl" == e[r].ty ? this.renderFill(e[r], n[r], a) : "st" == e[r].ty ? this.renderStroke(e[r], n[r], a) : "gr" == e[r].ty ? this.renderShape(a, e[r].it, n[r].it) : "tm" == e[r].ty;
                if (i) {
                    for (s = this.stylesList.length, r = 0; s > r; r += 1) "0" === this.stylesList[r].ld && (this.stylesList[r].ld = "1", this.stylesList[r].pathElement.style.display = "block"), "fl" === this.stylesList[r].type && (this.stylesList[r].mdf || this.firstFrame) && this.stylesList[r].pathElement.setAttribute("d", this.stylesList[r].d);
                    this.firstFrame && (this.firstFrame = !1)
                }
            }, IShapeElement.prototype.renderPath = function(t, e, n) {
                var i, r, s = e.sh.v,
                    a = "";
                if (s.v) {
                    i = s.v.length;
                    var o = n.matMdf || e.sh.mdf || this.firstFrame;
                    if (o) {
                        var h = s.s ? s.s : [];
                        for (r = 1; i > r; r += 1) h[r - 1] ? a += " M" + n.mat.applyToPointStringified(h[r - 1][0], h[r - 1][1]) : 1 == r && (a += " M" + n.mat.applyToPointStringified(s.v[0][0], s.v[0][1])), a += " C" + n.mat.applyToPointStringified(s.o[r - 1][0], s.o[r - 1][1]) + " " + n.mat.applyToPointStringified(s.i[r][0], s.i[r][1]) + " " + n.mat.applyToPointStringified(s.v[r][0], s.v[r][1]);
                        1 == i && (a += h[0] ? " M" + n.mat.applyToPointStringified(h[0][0], h[0][1]) : " M" + n.mat.applyToPointStringified(s.v[0][0], s.v[0][1])), i && t.closed && (!t.trimmed || s.c) && (a += " C" + n.mat.applyToPointStringified(s.o[r - 1][0], s.o[r - 1][1]) + " " + n.mat.applyToPointStringified(s.i[0][0], s.i[0][1]) + " " + n.mat.applyToPointStringified(s.v[0][0], s.v[0][1]), a += "z"), e.lStr = a
                    } else a = e.lStr;
                    for (i = e.elements.length, r = 0; i > r; r += 1) "st" === e.elements[r].ty ? (n.matMdf || e.sh.mdf || this.firstFrame) && e.elements[r].el.setAttribute("d", a) : (e.elements[r].st.mdf = o ? !0 : e.elements[r].st.mdf, e.elements[r].st.d += a)
                }
            }, IShapeElement.prototype.renderFill = function(t, e, n) {
                var i = e.style;
                (e.c.mdf || this.firstFrame) && (i.pathElement.style.fill = "rgb(" + bm_floor(e.c.v[0]) + "," + bm_floor(e.c.v[1]) + "," + bm_floor(e.c.v[2]) + ")"), (e.o.mdf || n.opMdf || this.firstFrame) && (i.pathElement.style.fillOpacity = e.o.v * n.opacity)
            }, IShapeElement.prototype.renderStroke = function(t, e, n) {
                var i = e.style,
                    r = e.d;
                r && r.k && (r.mdf || this.firstFrame) && (i.pathElement.style.strokeDasharray = r.dasharray, i.pathElement.style.strokeDashoffset = r.dashoffset), (e.c.mdf || this.firstFrame) && (i.pathElement.style.stroke = "rgb(" + bm_floor(e.c.v[0]) + "," + bm_floor(e.c.v[1]) + "," + bm_floor(e.c.v[2]) + ")"), (e.o.mdf || n.opMdf || this.firstFrame) && (i.pathElement.style.strokeOpacity = e.o.v * n.opacity), (e.w.mdf || this.firstFrame) && (i.pathElement.style.strokeWidth = e.w.v)
            }, IShapeElement.prototype.destroy = function() {
                this.parent.destroy.call(), this.shapeData = null, this.viewData = null, this.parentContainer = null, this.placeholder = null
            }, extendPrototype(ShapeInterface, IShapeElement), createElement(SVGBaseElement, ISolidElement), ISolidElement.prototype.createElements = function() {
                this.parent.createElements.call(this);
                var t = document.createElementNS(svgNS, "rect");
                t.setAttribute("width", this.data.sw), t.setAttribute("height", this.data.sh), t.setAttribute("fill", this.data.sc), this.layerElement === this.parentContainer ? this.appendNodeToParent(t) : this.layerElement.appendChild(t), this.data.ln && this.innerElem.setAttribute("id", this.data.ln), this.innerElem = t
            }, ISolidElement.prototype.hide = IImageElement.prototype.hide, ISolidElement.prototype.renderFrame = IImageElement.prototype.renderFrame, ISolidElement.prototype.destroy = IImageElement.prototype.destroy, createElement(BaseElement, CVBaseElement), CVBaseElement.prototype.createElements = function() {}, CVBaseElement.prototype.renderFrame = function(t) {
                if (3 === this.data.ty) return !1;
                if (!this.isVisible) return this.isVisible;
                this.finalTransform.opMdf = this.finalTransform.op.mdf, this.finalTransform.matMdf = this.finalTransform.mProp.mdf, this.finalTransform.opacity = this.finalTransform.op.v;
                var e, n = this.finalTransform.mat;
                if (this.hierarchy) {
                    var i, r = this.hierarchy.length;
                    for (e = this.finalTransform.mProp.v.props, n.cloneFromProps(e), i = 0; r > i; i += 1) this.finalTransform.matMdf = this.hierarchy[i].finalTransform.mProp.mdf ? !0 : this.finalTransform.matMdf, e = this.hierarchy[i].finalTransform.mProp.v.props, n.transform(e[0], e[1], e[2], e[3], e[4], e[5], e[6], e[7], e[8], e[9], e[10], e[11], e[12], e[13], e[14], e[15])
                } else t ? (e = this.finalTransform.mProp.v.props, n.cloneFromProps(e)) : n.cloneFromProps(this.finalTransform.mProp.v.props);
                return t && (e = t.mat.props, n.transform(e[0], e[1], e[2], e[3], e[4], e[5], e[6], e[7], e[8], e[9], e[10], e[11], e[12], e[13], e[14], e[15]), this.finalTransform.opacity *= t.opacity, this.finalTransform.opMdf = t.opMdf ? !0 : this.finalTransform.opMdf, this.finalTransform.matMdf = t.matMdf ? !0 : this.finalTransform.matMdf), this.data.hasMask && (this.globalData.renderer.save(!0), this.maskManager.renderFrame(n)), this.isVisible
            }, CVBaseElement.prototype.getCurrentAnimData = function() {
                return this.currentAnimData
            }, CVBaseElement.prototype.addMasks = function(t) {
                this.maskManager = new CVMaskElement(t, this, this.globalData)
            }, CVBaseElement.prototype.destroy = function() {
                this.canvasContext = null, this.data = null, this.globalData = null, this.maskManager && this.maskManager.destroy()
            }, CVBaseElement.prototype.mHelper = new Matrix, createElement(CVBaseElement, CVCompElement), CVCompElement.prototype.prepareFrame = function(t) {
                if (this.parent.prepareFrame.call(this, t), this.isVisible !== !1) {
                    var e = t;
                    this.tm && (e = this.tm.v, e === this.data.op && (e = this.data.op - 1)), this.renderedFrame = e;
                    var n, i = this.elements.length;
                    for (n = 0; i > n; n += 1) this.elements[n].prepareFrame(e - this.layers[n].st)
                }
            }, CVCompElement.prototype.renderFrame = function(t) {
                if (this.parent.renderFrame.call(this, t) !== !1) {
                    var e, n = this.layers.length;
                    for (e = n - 1; e >= 0; e -= 1) this.elements[e].renderFrame(this.finalTransform);
                    this.data.hasMask && this.globalData.renderer.restore(!0), this.firstFrame && (this.firstFrame = !1)
                }
            }, CVCompElement.prototype.setElements = function(t) {
                this.elements = t
            }, CVCompElement.prototype.getElements = function() {
                return this.elements
            }, CVCompElement.prototype.destroy = function() {
                var t, e = this.layers.length;
                for (t = e - 1; t >= 0; t -= 1) this.elements[t].destroy();
                this.layers = null, this.elements = null, this.parent.destroy.call()
            }, createElement(CVBaseElement, CVImageElement), CVImageElement.prototype.createElements = function() {
                var t = this,
                    e = function() {
                        t.animationItem.elementLoaded()
                    },
                    n = function() {
                        t.failed = !0, t.animationItem.elementLoaded()
                    };
                this.img = new Image, this.img.addEventListener("load", e, !1), this.img.addEventListener("error", n, !1), this.img.src = this.path + this.assetData.p, this.parent.createElements.call(this)
            }, CVImageElement.prototype.renderFrame = function(t) {
                if (!this.failed && this.parent.renderFrame.call(this, t) !== !1) {
                    var e = this.canvasContext;
                    this.globalData.renderer.save();
                    var n = this.finalTransform.mat.props;
                    this.globalData.renderer.ctxTransform(n), this.globalData.renderer.ctxOpacity(this.finalTransform.opacity), e.drawImage(this.img, 0, 0), this.globalData.renderer.restore(this.data.hasMask), this.firstFrame && (this.firstFrame = !1)
                }
            }, CVImageElement.prototype.destroy = function() {
                this.img = null, this.animationItem = null, this.parent.destroy.call()
            }, CVMaskElement.prototype.getMaskProperty = function(t) {
                return this.viewData[t]
            }, CVMaskElement.prototype.prepareFrame = function(t) {
                var e, n = this.dynamicProperties.length;
                for (e = 0; n > e; e += 1) this.dynamicProperties[e].getValue(t)
            }, CVMaskElement.prototype.renderFrame = function(t) {
                var e, n, i, r, s, a = this.ctx,
                    o = this.data.masksProperties.length,
                    h = !1;
                for (e = 0; o > e; e++)
                    if ("n" !== this.masksProperties[e].mode) {
                        h === !1 && (a.beginPath(), h = !0), this.masksProperties[e].inv && (a.moveTo(0, 0), a.lineTo(this.globalData.compWidth, 0), a.lineTo(this.globalData.compWidth, this.globalData.compHeight), a.lineTo(0, this.globalData.compHeight), a.lineTo(0, 0)), s = this.viewData[e].v, n = t.applyToPointArray(s.v[0][0], s.v[0][1], 0), a.moveTo(n[0], n[1]);
                        var l, p = s.v.length;
                        for (l = 1; p > l; l++) n = t.applyToPointArray(s.o[l - 1][0], s.o[l - 1][1], 0), i = t.applyToPointArray(s.i[l][0], s.i[l][1], 0), r = t.applyToPointArray(s.v[l][0], s.v[l][1], 0), a.bezierCurveTo(n[0], n[1], i[0], i[1], r[0], r[1]);
                        n = t.applyToPointArray(s.o[l - 1][0], s.o[l - 1][1], 0), i = t.applyToPointArray(s.i[0][0], s.i[0][1], 0), r = t.applyToPointArray(s.v[0][0], s.v[0][1], 0), a.bezierCurveTo(n[0], n[1], i[0], i[1], r[0], r[1])
                    }
                h && a.clip()
            }, CVMaskElement.prototype.getMask = function(t) {
                for (var e = 0, n = this.masksProperties.length; n > e;) {
                    if (this.masksProperties[e].nm === t) return {
                        maskPath: this.viewData[e].pv
                    };
                    e += 1
                }
            }, CVMaskElement.prototype.destroy = function() {
                this.ctx = null
            }, createElement(CVBaseElement, CVShapeElement), CVShapeElement.prototype.lcEnum = {
                1: "butt",
                2: "round",
                3: "butt"
            }, CVShapeElement.prototype.ljEnum = {
                1: "miter",
                2: "round",
                3: "butt"
            }, CVShapeElement.prototype.transformHelper = {
                opacity: 1,
                mat: new Matrix,
                matMdf: !1,
                opMdf: !1
            }, CVShapeElement.prototype.dashResetter = [], CVShapeElement.prototype.createElements = function() {
                this.parent.createElements.call(this), this.searchShapes(this.shapesData, this.viewData, this.dynamicProperties, []), this.buildExpressionInterface();
            }, CVShapeElement.prototype.searchShapes = function(t, e, n, i) {
                var r, s, a, o, h = t.length - 1,
                    l = [],
                    p = [];
                for (r = h; r >= 0; r -= 1)
                    if ("fl" == t[r].ty || "st" == t[r].ty) {
                        if (o = {
                                type: t[r].ty,
                                elements: []
                            }, e[r] = {}, e[r].c = PropertyFactory.getProp(this, t[r].c, 1, null, n), e[r].c.k || (o.co = "rgb(" + bm_floor(e[r].c.v[0]) + "," + bm_floor(e[r].c.v[1]) + "," + bm_floor(e[r].c.v[2]) + ")"), e[r].o = PropertyFactory.getProp(this, t[r].o, 0, .01, n), "st" == t[r].ty && (o.lc = this.lcEnum[t[r].lc] || "round", o.lj = this.ljEnum[t[r].lj] || "round", 1 == t[r].lj && (o.ml = t[r].ml), e[r].w = PropertyFactory.getProp(this, t[r].w, 0, null, n), e[r].w.k || (o.wi = e[r].w.v), t[r].d)) {
                            var u = PropertyFactory.getDashProp(this, t[r].d, "canvas", n);
                            e[r].d = u, e[r].d.k || (o.da = e[r].d.dasharray, o["do"] = e[r].d.dashoffset)
                        }
                        this.stylesList.push(o), e[r].style = o, l.push(e[r].style)
                    } else if ("gr" == t[r].ty) e[r] = {
                    it: []
                }, this.searchShapes(t[r].it, e[r].it, n, i);
                else if ("tr" == t[r].ty) e[r] = {
                    transform: {
                        mat: new Matrix,
                        opacity: 1,
                        matMdf: !1,
                        opMdf: !1,
                        op: PropertyFactory.getProp(this, t[r].o, 0, .01, n),
                        mProps: PropertyFactory.getProp(this, t[r], 2, null, n)
                    },
                    elements: []
                };
                else if ("sh" == t[r].ty || "rc" == t[r].ty || "el" == t[r].ty || "sr" == t[r].ty) {
                    e[r] = {
                        nodes: [],
                        trNodes: [],
                        tr: [0, 0, 0, 0, 0, 0]
                    };
                    var c = 4;
                    "rc" == t[r].ty ? c = 5 : "el" == t[r].ty ? c = 6 : "sr" == t[r].ty && (c = 7), i.length && (t[r].trimmed = !0), e[r].sh = PropertyFactory.getShapeProp(this, t[r], c, n, i), a = this.stylesList.length;
                    var f = !1,
                        m = !1;
                    for (s = 0; a > s; s += 1) this.stylesList[s].closed || (this.stylesList[s].elements.push(e[r]), "st" === this.stylesList[s].type ? f = !0 : m = !0);
                    e[r].st = f, e[r].fl = m
                } else if ("tm" == t[r].ty) {
                    var d = {
                        closed: !1,
                        trimProp: PropertyFactory.getProp(this, t[r], 7, null, n)
                    };
                    i.push(d), p.push(d)
                }
                for (h = l.length, r = 0; h > r; r += 1) l[r].closed = !0;
                for (h = p.length, r = 0; h > r; r += 1) p[r].closed = !0
            }, CVShapeElement.prototype.renderFrame = function(t) {
                this.parent.renderFrame.call(this, t) !== !1 && (this.transformHelper.mat.reset(), this.transformHelper.opacity = this.finalTransform.opacity, this.transformHelper.matMdf = !1, this.transformHelper.opMdf = this.finalTransform.opMdf, this.renderShape(this.transformHelper, null, null, !0), this.data.hasMask && this.globalData.renderer.restore(!0))
            }, CVShapeElement.prototype.renderShape = function(t, e, n, i) {
                var r, s;
                if (!e)
                    for (e = this.shapesData, s = this.stylesList.length, r = 0; s > r; r += 1) this.stylesList[r].d = "", this.stylesList[r].mdf = !1;
                n || (n = this.viewData), s = e.length - 1;
                var a, o;
                for (a = t, r = s; r >= 0; r -= 1)
                    if ("tr" == e[r].ty) {
                        a = n[r].transform;
                        var h = n[r].transform.mProps.v.props;
                        if (a.matMdf = a.mProps.mdf, a.opMdf = a.op.mdf, o = a.mat, o.cloneFromProps(h), t) {
                            var l = t.mat.props;
                            a.opacity = t.opacity, a.opacity *= n[r].transform.op.v, a.matMdf = t.matMdf ? !0 : a.matMdf, a.opMdf = t.opMdf ? !0 : a.opMdf, o.transform(l[0], l[1], l[2], l[3], l[4], l[5], l[6], l[7], l[8], l[9], l[10], l[11], l[12], l[13], l[14], l[15])
                        } else a.opacity = a.op.o
                    } else "sh" == e[r].ty || "el" == e[r].ty || "rc" == e[r].ty || "sr" == e[r].ty ? this.renderPath(e[r], n[r], a) : "fl" == e[r].ty ? this.renderFill(e[r], n[r], a) : "st" == e[r].ty ? this.renderStroke(e[r], n[r], a) : "gr" == e[r].ty ? this.renderShape(a, e[r].it, n[r].it) : "tm" == e[r].ty;
                if (i) {
                    s = this.stylesList.length;
                    var p, u, c, f, m, d, v, g = this.globalData.renderer,
                        y = this.globalData.canvasContext;
                    for (g.save(), g.ctxTransform(this.finalTransform.mat.props), r = 0; s > r; r += 1)
                        if (v = this.stylesList[r].type, "st" !== v || 0 !== this.stylesList[r].wi) {
                            for (g.save(), m = this.stylesList[r].elements, u = m.length, "st" === v ? (y.strokeStyle = this.stylesList[r].co, y.lineWidth = this.stylesList[r].wi, y.lineCap = this.stylesList[r].lc, y.lineJoin = this.stylesList[r].lj, y.miterLimit = this.stylesList[r].ml || 0) : y.fillStyle = this.stylesList[r].co, g.ctxOpacity(this.stylesList[r].coOp), "st" !== v && y.beginPath(), p = 0; u > p; p += 1) {
                                for ("st" === v && (y.beginPath(), this.stylesList[r].da ? (y.setLineDash(this.stylesList[r].da), y.lineDashOffset = this.stylesList[r]["do"], this.globalData.isDashed = !0) : this.globalData.isDashed && (y.setLineDash(this.dashResetter), this.globalData.isDashed = !1)), d = m[p].trNodes, f = d.length, c = 0; f > c; c += 1) "m" == d[c].t ? y.moveTo(d[c].p[0], d[c].p[1]) : "c" == d[c].t ? y.bezierCurveTo(d[c].p1[0], d[c].p1[1], d[c].p2[0], d[c].p2[1], d[c].p3[0], d[c].p3[1]) : y.closePath();
                                "st" === v && y.stroke()
                            }
                            "st" !== v && y.fill(), g.restore()
                        }
                    g.restore(), this.firstFrame && (this.firstFrame = !1)
                }
            }, CVShapeElement.prototype.renderPath = function(t, e, n) {
                var i, r, s = e.sh.v;
                if (s.v) {
                    i = s.v.length;
                    var a = n.matMdf || e.sh.mdf || this.firstFrame;
                    if (a) {
                        var o = e.trNodes;
                        o.length = 0;
                        var h = s.s ? s.s : [];
                        for (r = 1; i > r; r += 1) h[r - 1] ? o.push({
                            t: "m",
                            p: n.mat.applyToPointArray(h[r - 1][0], h[r - 1][1], 0)
                        }) : 1 == r && o.push({
                            t: "m",
                            p: n.mat.applyToPointArray(s.v[0][0], s.v[0][1], 0)
                        }), o.push({
                            t: "c",
                            p1: n.mat.applyToPointArray(s.o[r - 1][0], s.o[r - 1][1], 0),
                            p2: n.mat.applyToPointArray(s.i[r][0], s.i[r][1], 0),
                            p3: n.mat.applyToPointArray(s.v[r][0], s.v[r][1], 0)
                        });
                        if (1 == i && o.push(h[0] ? {
                                t: "m",
                                p: n.mat.applyToPointArray(h[0][0], h[0][1], 0)
                            } : {
                                t: "m",
                                p: n.mat.applyToPointArray(s.v[0][0], s.v[0][1], 0)
                            }), i && t.closed && (!t.trimmed || s.c) && (o.push({
                                t: "c",
                                p1: n.mat.applyToPointArray(s.o[r - 1][0], s.o[r - 1][1], 0),
                                p2: n.mat.applyToPointArray(s.i[0][0], s.i[0][1], 0),
                                p3: n.mat.applyToPointArray(s.v[0][0], s.v[0][1], 0)
                            }), o.push({
                                t: "z"
                            })), e.st)
                            for (r = 0; 16 > r; r += 1) e.tr[r] = n.mat.props[r];
                        e.trNodes = o
                    }
                }
            }, CVShapeElement.prototype.renderFill = function(t, e, n) {
                var i = e.style;
                (e.c.mdf || this.firstFrame) && (i.co = "rgb(" + bm_floor(e.c.v[0]) + "," + bm_floor(e.c.v[1]) + "," + bm_floor(e.c.v[2]) + ")"), (e.o.mdf || n.opMdf || this.firstFrame) && (i.coOp = e.o.v * n.opacity)
            }, CVShapeElement.prototype.renderStroke = function(t, e, n) {
                var i = e.style,
                    r = e.d;
                r && (r.mdf || this.firstFrame) && (i.da = r.dasharray, i["do"] = r.dashoffset), (e.c.mdf || this.firstFrame) && (i.co = "rgb(" + bm_floor(e.c.v[0]) + "," + bm_floor(e.c.v[1]) + "," + bm_floor(e.c.v[2]) + ")"), (e.o.mdf || n.opMdf || this.firstFrame) && (i.coOp = e.o.v * n.opacity), (e.w.mdf || this.firstFrame) && (i.wi = e.w.v)
            }, CVShapeElement.prototype.destroy = function() {
                this.shapesData = null, this.globalData = null, this.canvasContext = null, this.stylesList.length = 0, this.viewData.length = 0, this.parent.destroy.call()
            }, extendPrototype(ShapeInterface, CVShapeElement), createElement(CVBaseElement, CVSolidElement), CVSolidElement.prototype.renderFrame = function(t) {
                if (this.parent.renderFrame.call(this, t) !== !1) {
                    var e = this.canvasContext;
                    this.globalData.renderer.save();
                    var n = this.finalTransform.mat.props;
                    this.globalData.renderer.ctxTransform(n), this.globalData.renderer.ctxOpacity(this.finalTransform.opacity), e.fillStyle = this.data.sc, e.fillRect(0, 0, this.data.sw, this.data.sh), this.globalData.renderer.restore(this.data.hasMask), this.firstFrame && (this.firstFrame = !1)
                }
            }, createElement(CVBaseElement, CVTextElement), CVTextElement.prototype.init = ITextElement.prototype.init, CVTextElement.prototype.getMeasures = ITextElement.prototype.getMeasures, CVTextElement.prototype.getMult = ITextElement.prototype.getMult, CVTextElement.prototype.tHelper = document.createElement("canvas").getContext("2d"), CVTextElement.prototype.createElements = function() {
                this.parent.createElements.call(this);
                var t = this.data.t.d,
                    e = !1;
                t.fc ? (e = !0, this.values.fill = "rgb(" + t.fc[0] + "," + t.fc[1] + "," + t.fc[2] + ")") : this.values.fill = "rgba(0,0,0,0)", this.fill = e;
                var n = !1;
                t.sc && (n = !0, this.values.stroke = "rgb(" + t.sc[0] + "," + t.sc[1] + "," + t.sc[2] + ")", this.values.sWidth = t.sw);
                var i, r, s = this.globalData.fontManager.getFontByName(t.f),
                    a = t.l,
                    o = this.mHelper;
                this.stroke = n, this.values.fValue = t.s + "px " + this.globalData.fontManager.getFontByName(t.f).fFamily, r = t.t.length, this.tHelper.font = this.values.fValue;
                var h, l, p, u, c, f, m, d, v, g, y = this.data.singleShape;
                if (y) var b = 0,
                    w = 0,
                    E = t.lineWidths,
                    C = t.boxWidth,
                    _ = !0;
                for (i = 0; r > i; i += 1) {
                    h = this.globalData.fontManager.getCharData(t.t.charAt(i), s.fStyle, this.globalData.fontManager.getFontByName(t.f).fFamily);
                    var l;
                    if (l = h ? h.data : null, o.reset(), y && a[i].n && (b = 0, w += t.yOffset, w += _ ? 1 : 0, _ = !1), l && l.shapes) {
                        if (c = l.shapes[0].it, m = c.length, o.scale(t.s / 100, t.s / 100), y) {
                            switch (t.ps && o.translate(t.ps[0], t.ps[1] + t.ascent, 0), t.j) {
                                case 1:
                                    o.translate(t.justifyOffset + (C - E[a[i].line]), 0, 0);
                                    break;
                                case 2:
                                    o.translate(t.justifyOffset + (C - E[a[i].line]) / 2, 0, 0)
                            }
                            o.translate(b, w, 0)
                        }
                        for (v = new Array(m), f = 0; m > f; f += 1) {
                            for (u = c[f].ks.k.i.length, d = c[f].ks.k, g = [], p = 1; u > p; p += 1) 1 == p && g.push(o.applyToX(d.v[0][0], d.v[0][1], 0), o.applyToY(d.v[0][0], d.v[0][1], 0)), g.push(o.applyToX(d.o[p - 1][0], d.o[p - 1][1], 0), o.applyToY(d.o[p - 1][0], d.o[p - 1][1], 0), o.applyToX(d.i[p][0], d.i[p][1], 0), o.applyToY(d.i[p][0], d.i[p][1], 0), o.applyToX(d.v[p][0], d.v[p][1], 0), o.applyToY(d.v[p][0], d.v[p][1], 0));
                            g.push(o.applyToX(d.o[p - 1][0], d.o[p - 1][1], 0), o.applyToY(d.o[p - 1][0], d.o[p - 1][1], 0), o.applyToX(d.i[0][0], d.i[0][1], 0), o.applyToY(d.i[0][0], d.i[0][1], 0), o.applyToX(d.v[0][0], d.v[0][1], 0), o.applyToY(d.v[0][0], d.v[0][1], 0)), v[f] = g
                        }
                    } else v = [];
                    y && (b += a[i].l), this.textSpans.push({
                        elem: v
                    })
                }
            }, CVTextElement.prototype.renderFrame = function(t) {
                if (this.parent.renderFrame.call(this, t) !== !1) {
                    var e = this.canvasContext,
                        n = this.finalTransform.mat.props;
                    this.globalData.renderer.save(), this.globalData.renderer.ctxTransform(n), this.globalData.renderer.ctxOpacity(this.finalTransform.opacity), e.font = this.values.fValue, e.lineCap = "butt", e.lineJoin = "miter", e.miterLimit = 4, this.data.singleShape || this.getMeasures();
                    var i, r, s, a, o, h, l = this.renderedLetters,
                        p = this.data.t.d.l;
                    r = p.length;
                    var u, c, f, m = null,
                        d = null,
                        v = null;
                    for (i = 0; r > i; i += 1)
                        if (!p[i].n) {
                            if (u = l[i], u && (this.globalData.renderer.save(), this.globalData.renderer.ctxTransform(u.props), this.globalData.renderer.ctxOpacity(u.o)), this.fill) {
                                for (u && u.fc ? m !== u.fc && (m = u.fc, e.fillStyle = u.fc) : m !== this.values.fill && (m = this.values.fill, e.fillStyle = this.values.fill), c = this.textSpans[i].elem, a = c.length, this.globalData.canvasContext.beginPath(), s = 0; a > s; s += 1)
                                    for (f = c[s], h = f.length, this.globalData.canvasContext.moveTo(f[0], f[1]), o = 2; h > o; o += 6) this.globalData.canvasContext.bezierCurveTo(f[o], f[o + 1], f[o + 2], f[o + 3], f[o + 4], f[o + 5]);
                                this.globalData.canvasContext.closePath(), this.globalData.canvasContext.fill()
                            }
                            if (this.stroke) {
                                for (u && u.sw ? v !== u.sw && (v = u.sw, e.lineWidth = u.sw) : v !== this.values.sWidth && (v = this.values.sWidth, e.lineWidth = this.values.sWidth), u && u.sc ? d !== u.sc && (d = u.sc, e.strokeStyle = u.sc) : d !== this.values.stroke && (d = this.values.stroke, e.strokeStyle = this.values.stroke), c = this.textSpans[i].elem, a = c.length, this.globalData.canvasContext.beginPath(), s = 0; a > s; s += 1)
                                    for (f = c[s], h = f.length, this.globalData.canvasContext.moveTo(f[0], f[1]), o = 2; h > o; o += 6) this.globalData.canvasContext.bezierCurveTo(f[o], f[o + 1], f[o + 2], f[o + 3], f[o + 4], f[o + 5]);
                                this.globalData.canvasContext.closePath(), this.globalData.canvasContext.stroke()
                            }
                            u && this.globalData.renderer.restore()
                        }
                    this.globalData.renderer.restore(this.data.hasMask), this.firstFrame && (this.firstFrame = !1)
                }
            }, createElement(BaseElement, HBaseElement), HBaseElement.prototype.appendNodeToParent = function(t) {
                if (this.placeholder) {
                    var e = this.placeholder.phElement;
                    e.parentNode.insertBefore(t, e)
                } else this.parentContainer.appendChild(t)
            }, HBaseElement.prototype.createElements = function() {
                this.data.hasMask ? (this.layerElement = document.createElementNS(svgNS, "svg"), this.appendNodeToParent(this.layerElement), this.maskedElement = this.layerElement) : this.layerElement = this.parentContainer, !this.data.ln || 4 !== this.data.ty && 0 !== this.data.ty || (this.layerElement === this.parentContainer && (this.layerElement = document.createElementNS(svgNS, "g"), this.appendNodeToParent(this.layerElement)), this.layerElement.setAttribute("id", this.data.ln)), this.layerElement !== this.parentContainer && (this.placeholder = null)
            }, HBaseElement.prototype.renderFrame = function(t) {
                if (3 === this.data.ty) return !1;
                if (this.currentFrameNum === this.lastNum || !this.isVisible) return this.isVisible;
                this.lastNum = this.currentFrameNum, this.data.hasMask && this.maskManager.renderFrame(), this.finalTransform.opMdf = this.finalTransform.op.mdf, this.finalTransform.matMdf = this.finalTransform.mProp.mdf, this.finalTransform.opacity = this.finalTransform.op.v, this.firstFrame && (this.finalTransform.opMdf = !0, this.finalTransform.matMdf = !0);
                var e, n = this.finalTransform.mat;
                if (this.hierarchy) {
                    var i, r = this.hierarchy.length;
                    for (e = this.finalTransform.mProp.v.props, n.cloneFromProps(e), i = 0; r > i; i += 1) this.finalTransform.matMdf = this.hierarchy[i].finalTransform.mProp.mdf ? !0 : this.finalTransform.matMdf, e = this.hierarchy[i].finalTransform.mProp.v.props, n.transform(e[0], e[1], e[2], e[3], e[4], e[5], e[6], e[7], e[8], e[9], e[10], e[11], e[12], e[13], e[14], e[15])
                } else this.isVisible && this.finalTransform.matMdf && (t ? (e = this.finalTransform.mProp.v.props, n.cloneFromProps(e)) : n.cloneFromProps(this.finalTransform.mProp.v.props));
                return t && (e = t.mat.props, n.cloneFromProps(e), this.finalTransform.opacity *= t.opacity, this.finalTransform.opMdf = t.opMdf ? !0 : this.finalTransform.opMdf, this.finalTransform.matMdf = t.matMdf ? !0 : this.finalTransform.matMdf), this.finalTransform.matMdf && (this.layerElement.style.transform = this.layerElement.style.webkitTransform = n.toCSS()), this.finalTransform.opMdf && (this.layerElement.style.opacity = this.finalTransform.opacity), this.isVisible
            }, HBaseElement.prototype.destroy = function() {
                this.layerElement = null, this.parentContainer = null, this.matteElement && (this.matteElement = null), this.maskManager && (this.maskManager.destroy(), this.maskManager = null)
            }, HBaseElement.prototype.getDomElement = function() {
                return this.layerElement
            }, HBaseElement.prototype.addMasks = function(t) {
                this.maskManager = new MaskElement(t, this, this.globalData)
            }, HBaseElement.prototype.hide = function() {}, HBaseElement.prototype.setMatte = function() {}, createElement(HBaseElement, HSolidElement), HSolidElement.prototype.createElements = function() {
                var t = document.createElement("div");
                styleDiv(t);
                var e = document.createElementNS(svgNS, "svg");
                e.setAttribute("width", this.data.sw), e.setAttribute("height", this.data.sh), t.appendChild(e), this.layerElement = t, this.parentContainer.appendChild(t), this.innerElem = t, this.data.ln && this.innerElem.setAttribute("id", this.data.ln);
                var n = document.createElementNS(svgNS, "rect");
                n.setAttribute("width", this.data.sw), n.setAttribute("height", this.data.sh), n.setAttribute("fill", this.data.sc), e.appendChild(n), this.data.hasMask && (this.maskedElement = n)
            }, HSolidElement.prototype.hide = function() {
                this.hidden || (this.innerElem.style.display = "none", this.hidden = !0)
            }, HSolidElement.prototype.renderFrame = function(t) {
                var e = this.parent.renderFrame.call(this, t);
                return e === !1 ? void this.hide() : (this.hidden && (this.hidden = !1, this.innerElem.style.display = "block"), void(this.firstFrame && (this.firstFrame = !1)))
            }, HSolidElement.prototype.destroy = function() {
                this.parent.destroy.call(), this.innerElem = null
            }, createElement(HBaseElement, HCompElement), extendPrototype(ExpressionComp, HCompElement), HCompElement.prototype.getDomElement = function() {
                return this.composingElement
            }, HCompElement.prototype.getComposingElement = function() {
                return this.layerElement
            }, HCompElement.prototype.createElements = function() {
                if (this.layerElement = document.createElement("div"), styleDiv(this.layerElement), this.data.ln && this.layerElement.setAttribute("id", this.data.ln), this.layerElement.style.clip = "rect(0px, " + this.data.w + "px, " + this.data.h + "px, 0px)", this.layerElement !== this.parentContainer && (this.placeholder = null), this.data.hasMask) {
                    var t = document.createElementNS(svgNS, "svg");
                    t.setAttribute("width", this.data.w), t.setAttribute("height", this.data.h);
                    var e = document.createElementNS(svgNS, "g");
                    t.appendChild(e), this.layerElement.appendChild(t), this.maskedElement = e, this.composingElement = e
                } else this.composingElement = this.layerElement;
                this.appendNodeToParent(this.layerElement)
            }, HCompElement.prototype.hide = ICompElement.prototype.hide, HCompElement.prototype.prepareFrame = ICompElement.prototype.prepareFrame, HCompElement.prototype.setElements = ICompElement.prototype.setElements, HCompElement.prototype.getElements = ICompElement.prototype.getElements, HCompElement.prototype.destroy = ICompElement.prototype.destroy, HCompElement.prototype.renderFrame = function(t) {
                var e, n = this.parent.renderFrame.call(this, t),
                    i = this.layers.length;
                if (n === !1) return void this.hide();
                for (this.hidden = !1, e = 0; i > e; e += 1) this.elements[e].renderFrame();
                this.firstFrame && (this.firstFrame = !1)
            }, createElement(HBaseElement, HShapeElement);
            var parent = HShapeElement.prototype.parent;
            extendPrototype(IShapeElement, HShapeElement), HShapeElement.prototype.parent = parent, HShapeElement.prototype.createElements = function() {
                var t = document.createElement("div");
                styleDiv(t);
                var e = document.createElementNS(svgNS, "svg");
                if (999999 === this.data.bounds.l, e.setAttribute("width", this.data.bounds.r - this.data.bounds.l), e.setAttribute("height", this.data.bounds.b - this.data.bounds.t), e.setAttribute("viewBox", this.data.bounds.l + " " + this.data.bounds.t + " " + (this.data.bounds.r - this.data.bounds.l) + " " + (this.data.bounds.b - this.data.bounds.t)), e.style.transform = e.style.webkitTransform = "translate(" + this.data.bounds.l + "px," + this.data.bounds.t + "px)", this.data.hasMask) {
                    var n = document.createElementNS(svgNS, "g");
                    t.appendChild(e), e.appendChild(n), this.maskedElement = n, this.layerElement = n, this.shapesContainer = n
                } else t.appendChild(e), this.layerElement = e, this.shapesContainer = document.createElementNS(svgNS, "g"), this.layerElement.appendChild(this.shapesContainer);
                this.parentContainer.appendChild(t), this.innerElem = t, this.data.ln && this.innerElem.setAttribute("id", this.data.ln), this.searchShapes(this.shapesData, this.viewData, this.dynamicProperties, []), this.buildExpressionInterface(), this.layerElement = t
            }, HShapeElement.prototype.renderFrame = function(t) {
                var e = this.parent.renderFrame.call(this, t);
                return e === !1 ? void this.hide() : (this.hidden = !1, this.transformHelper.opacity = this.finalTransform.opacity, this.transformHelper.matMdf = !1, this.transformHelper.opMdf = this.finalTransform.opMdf, void this.renderShape(this.transformHelper, null, null, !0))
            }, createElement(HBaseElement, HTextElement), HTextElement.prototype.init = ITextElement.prototype.init, HTextElement.prototype.getMeasures = ITextElement.prototype.getMeasures, HTextElement.prototype.createPathShape = ITextElement.prototype.createPathShape, HTextElement.prototype.createElements = function() {
                this.isMasked = this.checkMasks();
                var t = this.data.t.d,
                    e = document.createElement("div");
                if (styleDiv(e), this.layerElement = e, this.isMasked) {
                    this.renderType = "svg";
                    var n = document.createElementNS(svgNS, "svg");
                    this.cont = n, this.compW = this.comp.data ? this.comp.data.w : this.globalData.compSize.w, this.compH = this.comp.data ? this.comp.data.h : this.globalData.compSize.h, n.setAttribute("width", this.compW), n.setAttribute("height", this.compH);
                    var i = document.createElementNS(svgNS, "g");
                    n.appendChild(i), e.appendChild(n), this.maskedElement = i, this.innerElem = i
                } else this.renderType = "html", this.innerElem = e;
                this.parentContainer.appendChild(e), this.innerElem.style.color = this.innerElem.style.fill = t.fc ? "rgb(" + t.fc[0] + "," + t.fc[1] + "," + t.fc[2] + ")" : "rgba(0,0,0,0)", t.sc && (this.innerElem.style.stroke = "rgb(" + t.sc[0] + "," + t.sc[1] + "," + t.sc[2] + ")", this.innerElem.style.strokeWidth = t.sw + "px");
                var r = this.globalData.fontManager.getFontByName(t.f);
                if (!this.globalData.fontManager.chars)
                    if (this.innerElem.style.fontSize = t.s + "px", this.innerElem.style.lineHeight = t.s + "px", r.fClass) this.innerElem.className = r.fClass;
                    else {
                        this.innerElem.style.fontFamily = r.fFamily;
                        var s = t.fWeight,
                            a = t.fStyle;
                        this.innerElem.style.fontStyle = a, this.innerElem.style.fontWeight = s
                    }
                var o, h, l = t.l;
                h = l.length;
                var p, u, c, f, m = this.mHelper,
                    d = "";
                for (o = 0; h > o; o += 1) {
                    if (this.globalData.fontManager.chars ? (p = document.createElementNS(svgNS, "path"), this.isMasked || (u = document.createElement("div"), c = document.createElementNS(svgNS, "svg"), u.appendChild(c), c.appendChild(p), styleDiv(u)), p.setAttribute("stroke-linecap", "butt"), p.setAttribute("stroke-linejoin", "round"), p.setAttribute("stroke-miterlimit", "4")) : this.isMasked ? p = document.createElementNS(svgNS, "text") : (u = document.createElement("span"), styleDiv(u), p = document.createElement("span"), styleDiv(p), u.appendChild(p)), this.globalData.fontManager.chars) {
                        var v, g = this.globalData.fontManager.getCharData(t.t.charAt(o), r.fStyle, this.globalData.fontManager.getFontByName(t.f).fFamily);
                        if (v = g ? g.data : null, m.reset(), v && v.shapes && (f = v.shapes[0].it, m.scale(t.s / 100, t.s / 100), d = this.createPathShape(m, f), p.setAttribute("d", d)), this.isMasked) this.innerElem.appendChild(p);
                        else {
                            this.innerElem.appendChild(u);
                            var y = t.s / 100;
                            if (v && v.shapes) {
                                var b = Math.ceil(v.bounds.r * y),
                                    w = Math.floor(v.bounds.t * y),
                                    E = Math.floor(v.bounds.l * y),
                                    C = Math.ceil(v.bounds.b * y);
                                c.setAttribute("width", b - E), c.setAttribute("height", C - w), c.setAttribute("viewBox", E + " " + w + " " + (b - E) + " " + (C - w)), c.style.transform = c.style.webkitTransform = "translate(" + E + "px," + w + "px)", l[o].yOffset = w
                            } else c.setAttribute("width", 1), c.setAttribute("height", 1)
                        }
                    } else p.textContent = l[o].val, p.setAttributeNS("http://www.w3.org/XML/1998/namespace", "xml:space", "preserve"), this.isMasked ? this.innerElem.appendChild(p) : (this.innerElem.appendChild(u), p.style.transform = p.style.webkitTransform = "translate3d(0," + -t.s / 1.2 + "px,0)");
                    this.textSpans.push(this.isMasked ? p : u), this.textPaths.push(p)
                }
            }, HTextElement.prototype.hide = SVGTextElement.prototype.hide, HTextElement.prototype.renderFrame = function(t) {
                var e = this.parent.renderFrame.call(this, t);
                if (e === !1) return void this.hide();
                if (this.hidden && (this.hidden = !1, this.innerElem.style.display = "block"), this.data.singleShape) {
                    if (!this.firstFrame) return;
                    this.isMasked && this.finalTransform.matMdf && (this.cont.setAttribute("viewBox", -this.finalTransform.mProp.p.v[0] + " " + -this.finalTransform.mProp.p.v[1] + " " + this.compW + " " + this.compH), this.cont.style.transform = this.cont.style.webkitTransform = "translate(" + -this.finalTransform.mProp.p.v[0] + "px," + -this.finalTransform.mProp.p.v[1] + "px)")
                }
                if (this.getMeasures(), this.lettersChangedFlag) {
                    var n, i, r = this.renderedLetters,
                        s = this.data.t.d.l;
                    i = s.length;
                    var a;
                    for (n = 0; i > n; n += 1) s[n].n || (a = r[n], this.isMasked ? this.textSpans[n].setAttribute("transform", a.m) : this.textSpans[n].style.transform = this.textSpans[n].style.webkitTransform = a.m, this.textSpans[n].style.opacity = a.o, a.sw && this.textPaths[n].setAttribute("stroke-width", a.sw), a.sc && this.textPaths[n].setAttribute("stroke", a.sc), a.fc && (this.textPaths[n].setAttribute("fill", a.fc), this.textPaths[n].style.color = a.fc));
                    if (this.isMasked) {
                        var o = this.innerElem.getBBox();
                        this.currentBBox.w !== o.width && (this.currentBBox.w = o.width, this.cont.setAttribute("width", o.width)), this.currentBBox.h !== o.height && (this.currentBBox.h = o.height, this.cont.setAttribute("height", o.height)), (this.currentBBox.w !== o.width || this.currentBBox.h !== o.height || this.currentBBox.x !== o.x || this.currentBBox.y !== o.y) && (this.currentBBox.w = o.width, this.currentBBox.h = o.height, this.currentBBox.x = o.x, this.currentBBox.y = o.y, this.cont.setAttribute("viewBox", this.currentBBox.x + " " + this.currentBBox.y + " " + this.currentBBox.w + " " + this.currentBBox.h), this.cont.style.transform = this.cont.style.webkitTransform = "translate(" + this.currentBBox.x + "px," + this.currentBBox.y + "px)")
                    }
                    this.firstFrame && (this.firstFrame = !1)
                }
            }, HTextElement.prototype.destroy = SVGTextElement.prototype.destroy, createElement(HBaseElement, HImageElement), HImageElement.prototype.createElements = function() {
                var t, e = function() {
                        this.imageElem.setAttributeNS("http://www.w3.org/1999/xlink", "href", this.path + this.assetData.p)
                    },
                    n = new Image;
                if (this.data.hasMask) {
                    var t = document.createElement("div");
                    styleDiv(t);
                    var i = document.createElementNS(svgNS, "svg");
                    i.setAttribute("width", this.assetData.w), i.setAttribute("height", this.assetData.h), t.appendChild(i), this.imageElem = document.createElementNS(svgNS, "image"), this.imageElem.setAttribute("width", this.assetData.w + "px"), this.imageElem.setAttribute("height", this.assetData.h + "px"), i.appendChild(this.imageElem), this.layerElement = t, this.parentContainer.appendChild(t), this.innerElem = t, this.maskedElement = this.imageElem, n.addEventListener("load", e.bind(this), !1), n.addEventListener("error", e.bind(this), !1)
                } else styleDiv(n), this.layerElement = n, this.parentContainer.appendChild(n), this.innerElem = n;
                n.src = this.path + this.assetData.p, this.data.ln && this.innerElem.setAttribute("id", this.data.ln)
            }, HImageElement.prototype.hide = HSolidElement.prototype.hide, HImageElement.prototype.renderFrame = HSolidElement.prototype.renderFrame, HImageElement.prototype.destroy = HSolidElement.prototype.destroy, createElement(HBaseElement, HCameraElement), HCameraElement.prototype.setup = function() {
                var t, e, n = this.comp.threeDElements.length;
                for (t = 0; n > t; t += 1) e = this.comp.threeDElements[t], e[0].style.perspective = e[0].style.webkitPerspective = this.pe.v + "px", e[1].style.transformOrigin = e[1].style.mozTransformOrigin = e[1].style.webkitTransformOrigin = "0px 0px 0px", e[0].style.transform = e[0].style.webkitTransform = "matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1)"
            }, HCameraElement.prototype.createElements = function() {}, HCameraElement.prototype.hide = function() {}, HCameraElement.prototype.renderFrame = function() {
                var t, e, n = this.firstFrame;
                if (this.hierarchy)
                    for (e = this.hierarchy.length, t = 0; e > t; t += 1) n = this.hierarchy[t].finalTransform.mProp.mdf ? !0 : n;
                if (n || this.p && this.p.mdf || this.px && (this.px.mdf || this.py.mdf || this.pz.mdf) || this.rx.mdf || this.ry.mdf || this.rz.mdf || this.or.mdf || this.a && this.a.mdf) {
                    if (this.mat.reset(), this.p ? this.mat.translate(-this.p.v[0], -this.p.v[1], this.p.v[2]) : this.mat.translate(-this.px.v, -this.py.v, this.pz.v), this.a) {
                        var i = [this.p.v[0] - this.a.v[0], this.p.v[1] - this.a.v[1], this.p.v[2] - this.a.v[2]],
                            r = Math.sqrt(Math.pow(i[0], 2) + Math.pow(i[1], 2) + Math.pow(i[2], 2)),
                            s = [i[0] / r, i[1] / r, i[2] / r],
                            a = Math.sqrt(s[2] * s[2] + s[0] * s[0]),
                            o = Math.atan2(s[1], a),
                            h = Math.atan2(s[0], -s[2]);
                        this.mat.rotateY(h).rotateX(-o)
                    }
                    if (this.mat.rotateX(-this.rx.v).rotateY(-this.ry.v).rotateZ(this.rz.v), this.mat.rotateX(-this.or.v[0]).rotateY(-this.or.v[1]).rotateZ(this.or.v[2]), this.mat.translate(this.globalData.compSize.w / 2, this.globalData.compSize.h / 2, 0), this.mat.translate(0, 0, this.pe.v), this.hierarchy) {
                        var l;
                        for (e = this.hierarchy.length, t = 0; e > t; t += 1) l = this.hierarchy[t].finalTransform.mProp.iv.props, this.mat.transform(l[0], l[1], l[2], l[3], l[4], l[5], l[6], l[7], l[8], l[9], l[10], l[11], -l[12], -l[13], l[14], l[15])
                    }
                    e = this.comp.threeDElements.length;
                    var p;
                    for (t = 0; e > t; t += 1) p = this.comp.threeDElements[t], p[1].style.transform = p[1].style.webkitTransform = this.mat.toCSS()
                }
                this.firstFrame = !1
            }, HCameraElement.prototype.destroy = function() {};
            var animationManager = function() {
                    function t(e) {
                        var n = 0,
                            i = e.target;
                        for (i.removeEventListener("destroy", t); E > n;) y[n].animation === i && (y.splice(n, 1), n -= 1, E -= 1), n += 1
                    }

                    function e(e, n) {
                        if (!e) return null;
                        for (var i = 0; E > i;) {
                            if (y[i].elem == e && null !== y[i].elem) return y[i].animation;
                            i += 1
                        }
                        var r = new AnimationItem;
                        return r.setData(e, n), r.addEventListener("destroy", t), y.push({
                            elem: e,
                            animation: r
                        }), E += 1, r
                    }

                    function n(e) {
                        var n = new AnimationItem;
                        return n.setParams(e), n.addEventListener("destroy", t), y.push({
                            elem: null,
                            animation: n
                        }), E += 1, n
                    }

                    function i(t, e) {
                        var n;
                        for (n = 0; E > n; n += 1) y[n].animation.setSpeed(t, e)
                    }

                    function r(t, e) {
                        var n;
                        for (n = 0; E > n; n += 1) y[n].animation.setDirection(t, e)
                    }

                    function s(t) {
                        var e;
                        for (e = 0; E > e; e += 1) y[e].animation.play(t)
                    }

                    function a(t, e) {
                        w = !1, b = Date.now();
                        var n;
                        for (n = 0; E > n; n += 1) y[n].animation.moveFrame(t, e)
                    }

                    function o(t) {
                        var e, n = t - b;
                        for (e = 0; E > e; e += 1) y[e].animation.advanceTime(n);
                        b = t, requestAnimationFrame(o)
                    }

                    function h(t) {
                        b = t, requestAnimationFrame(o)
                    }

                    function l(t) {
                        var e;
                        for (e = 0; E > e; e += 1) y[e].animation.pause(t)
                    }

                    function p(t, e, n) {
                        var i;
                        for (i = 0; E > i; i += 1) y[i].animation.goToAndStop(t, e, n)
                    }

                    function u(t) {
                        var e;
                        for (e = 0; E > e; e += 1) y[e].animation.stop(t)
                    }

                    function c(t) {
                        var e;
                        for (e = 0; E > e; e += 1) y[e].animation.togglePause(t)
                    }

                    function f(t) {
                        var e;
                        for (e = 0; E > e; e += 1) y[e].animation.destroy(t)
                    }

                    function m(t, n, i) {
                        var r, s = document.getElementsByClassName("bodymovin"),
                            a = s.length;
                        for (r = 0; a > r; r += 1) i && s[r].setAttribute("data-bm-type", i), e(s[r], t);
                        if (n && 0 === a) {
                            i || (i = "svg");
                            var o = document.getElementsByTagName("body")[0];
                            o.innerHTML = "";
                            var h = document.createElement("div");
                            h.style.width = "100%", h.style.height = "100%", h.setAttribute("data-bm-type", i), o.appendChild(h), e(h, t)
                        }
                    }

                    function d() {
                        var t;
                        for (t = 0; E > t; t += 1) y[t].animation.resize()
                    }

                    function v() {
                        requestAnimationFrame(h)
                    }
                    var g = {},
                        y = [],
                        b = 0,
                        w = !0,
                        E = 0;
                    return setTimeout(v, 0), g.registerAnimation = e, g.loadAnimation = n, g.setSpeed = i, g.setDirection = r, g.play = s, g.moveFrame = a, g.pause = l, g.stop = u, g.togglePause = c, g.searchAnimations = m, g.resize = d, g.start = v, g.goToAndStop = p, g.destroy = f, g
                }(),
                AnimationItem = function() {
                    this._cbs = [], this.name = "", this.path = "", this.isLoaded = !1, this.currentFrame = 0, this.currentRawFrame = 0, this.totalFrames = 0, this.frameRate = 0, this.frameMult = 0, this.playSpeed = 1, this.playDirection = 1, this.pendingElements = 0, this.playCount = 0, this.prerenderFramesFlag = !0, this.repeat = "indefinite", this.animationData = {}, this.layers = [], this.assets = [], this.isPaused = !0, this.isScrolling = !1, this.autoplay = !1, this.loop = !0, this.renderer = null, this.animationID = randomString(10), this.renderedFrameCount = 0, this.scaleMode = "fit", this.math = Math, this.removed = !1, this.timeCompleted = 0, this.segmentPos = 0, this.segments = []
                };
            AnimationItem.prototype.setParams = function(t) {
                var e = this;
                t.context && (this.context = t.context), (t.wrapper || t.container) && (this.wrapper = t.wrapper || t.container);
                var n = t.animType ? t.animType : t.renderer ? t.renderer : "canvas";
                switch (n) {
                    case "canvas":
                        this.renderer = new CanvasRenderer(this, t.rendererSettings);
                        break;
                    case "svg":
                        this.renderer = new SVGRenderer(this, t.rendererSettings);
                        break;
                    case "hybrid":
                    case "html":
                    default:
                        this.renderer = new HybridRenderer(this, t.rendererSettings)
                }
                if (this.animType = n, "" === t.loop || null === t.loop || (this.loop = t.loop === !1 ? !1 : t.loop === !0 ? !0 : parseInt(t.loop)), this.autoplay = "autoplay" in t ? t.autoplay : !0, this.name = t.name ? t.name : "", this.prerenderFramesFlag = "prerender" in t ? t.prerender : !0, this.autoloadSegments = t.hasOwnProperty("autoloadSegments") ? t.autoloadSegments : !0, t.animationData) e.configAnimation(t.animationData);
                else if (t.path) {
                    "json" != t.path.substr(-4) && ("/" != t.path.substr(-1, 1) && (t.path += "/"), t.path += "data.json");
                    var i = new XMLHttpRequest;
                    this.path = -1 != t.path.lastIndexOf("\\") ? t.path.substr(0, t.path.lastIndexOf("\\") + 1) : t.path.substr(0, t.path.lastIndexOf("/") + 1), this.fileName = t.path.substr(t.path.lastIndexOf("/") + 1), this.fileName = this.fileName.substr(0, this.fileName.lastIndexOf(".json")), i.open("GET", t.path, !0), i.send(), i.onreadystatechange = function() {
                        if (4 == i.readyState)
                            if (200 == i.status) e.configAnimation(JSON.parse(i.responseText));
                            else try {
                                var t = JSON.parse(i.responseText);
                                e.configAnimation(t)
                            } catch (n) {}
                    }
                }
            }, AnimationItem.prototype.setData = function(t, e) {
                var n = {
                        wrapper: t,
                        animationData: e ? "object" == typeof e ? e : JSON.parse(e) : null
                    },
                    i = t.attributes;
                n.path = i.getNamedItem("data-animation-path") ? i.getNamedItem("data-animation-path").value : i.getNamedItem("data-bm-path") ? i.getNamedItem("data-bm-path").value : i.getNamedItem("bm-path") ? i.getNamedItem("bm-path").value : "", n.animType = i.getNamedItem("data-anim-type") ? i.getNamedItem("data-anim-type").value : i.getNamedItem("data-bm-type") ? i.getNamedItem("data-bm-type").value : i.getNamedItem("bm-type") ? i.getNamedItem("bm-type").value : i.getNamedItem("data-bm-renderer") ? i.getNamedItem("data-bm-renderer").value : i.getNamedItem("bm-renderer") ? i.getNamedItem("bm-renderer").value : "canvas";
                var r = i.getNamedItem("data-anim-loop") ? i.getNamedItem("data-anim-loop").value : i.getNamedItem("data-bm-loop") ? i.getNamedItem("data-bm-loop").value : i.getNamedItem("bm-loop") ? i.getNamedItem("bm-loop").value : "";
                "" === r || (n.loop = "false" === r ? !1 : "true" === r ? !0 : parseInt(r)), n.name = i.getNamedItem("data-name") ? i.getNamedItem("data-name").value : i.getNamedItem("data-bm-name") ? i.getNamedItem("data-bm-name").value : i.getNamedItem("bm-name") ? i.getNamedItem("bm-name").value : "";
                var s = i.getNamedItem("data-anim-prerender") ? i.getNamedItem("data-anim-prerender").value : i.getNamedItem("data-bm-prerender") ? i.getNamedItem("data-bm-prerender").value : i.getNamedItem("bm-prerender") ? i.getNamedItem("bm-prerender").value : "";
                "false" === s && (n.prerender = !1), this.setParams(n)
            }, AnimationItem.prototype.includeLayers = function(t) {
                t.op > this.animationData.op && (this.animationData.op = t.op, this.totalFrames = Math.floor(t.op - this.animationData.ip), this.animationData.tf = this.totalFrames);
                var e, n, i = this.animationData.layers,
                    r = i.length,
                    s = t.layers,
                    a = s.length;
                for (n = 0; a > n; n += 1)
                    for (e = 0; r > e;) {
                        if (i[e].id == s[n].id) {
                            i[e] = s[n];
                            break
                        }
                        e += 1
                    }
                if ((t.chars || t.fonts) && (this.renderer.globalData.fontManager.addChars(t.chars), this.renderer.globalData.fontManager.addFonts(t.fonts, this.renderer.globalData.defs)), t.assets)
                    for (r = t.assets.length, e = 0; r > e; e += 1) this.animationData.assets.push(t.assets[e]);
                dataManager.completeData(this.animationData, this.renderer.globalData.fontManager), this.renderer.includeLayers(t.layers), this.renderer.buildStage(this.container, this.layers), this.renderer.renderFrame(null), this.loadNextSegment()
            }, AnimationItem.prototype.loadNextSegment = function() {
                var t = this.animationData.segments;
                if (!t || 0 === t.length || !this.autoloadSegments) return this.trigger("data_ready"), void(this.timeCompleted = this.animationData.tf);
                var e = t.shift();
                this.timeCompleted = e.time * this.frameRate;
                var n = new XMLHttpRequest,
                    i = this,
                    r = this.path + this.fileName + "_" + this.segmentPos + ".json";
                this.segmentPos += 1, n.open("GET", r, !0), n.send(), n.onreadystatechange = function() {
                    if (4 == n.readyState)
                        if (200 == n.status) i.includeLayers(JSON.parse(n.responseText));
                        else try {
                            var t = JSON.parse(n.responseText);
                            i.includeLayers(t)
                        } catch (e) {}
                }
            }, AnimationItem.prototype.loadSegments = function() {
                var t = this.animationData.segments;
                t || (this.timeCompleted = this.animationData.tf), this.loadNextSegment()
            }, AnimationItem.prototype.configAnimation = function(t) {
                this.animationData = t,
                    this.totalFrames = Math.floor(this.animationData.op - this.animationData.ip), this.animationData.tf = this.totalFrames, this.renderer.configAnimation(t), t.assets || (t.assets = []), t.comps && (t.assets = t.assets.concat(t.comps), t.comps = null), this.animationData._id = this.animationID, this.animationData._animType = this.animType, this.layers = this.animationData.layers, this.assets = this.animationData.assets, this.frameRate = this.animationData.fr, this.firstFrame = Math.round(this.animationData.ip), this.frameMult = this.animationData.fr / 1e3, this.trigger("config_ready"), this.loadSegments(), this.updaFrameModifier(), this.renderer.globalData.fontManager ? this.waitForFontsLoaded() : (dataManager.completeData(this.animationData, this.renderer.globalData.fontManager), this.checkLoaded())
            }, AnimationItem.prototype.waitForFontsLoaded = function() {
                function t() {
                    this.renderer.globalData.fontManager.loaded ? (dataManager.completeData(this.animationData, this.renderer.globalData.fontManager), this.renderer.buildItems(this.animationData.layers), this.checkLoaded()) : setTimeout(t.bind(this), 20)
                }
                return function() {
                    t.bind(this)()
                }
            }(), AnimationItem.prototype.elementLoaded = function() {
                this.pendingElements--, this.checkLoaded()
            }, AnimationItem.prototype.checkLoaded = function() {
                0 === this.pendingElements && (this.renderer.buildStage(this.container, this.layers), this.trigger("DOMLoaded"), this.isLoaded = !0, this.gotoFrame(), this.autoplay && this.play())
            }, AnimationItem.prototype.resize = function() {
                this.renderer.updateContainerSize()
            }, AnimationItem.prototype.gotoFrame = function() {
                this.currentFrame = subframeEnabled ? this.currentRawFrame : this.math.floor(this.currentRawFrame), this.timeCompleted !== this.totalFrames && this.currentFrame > this.timeCompleted && (this.currentFrame = this.timeCompleted), this.trigger("enterFrame"), this.renderFrame()
            }, AnimationItem.prototype.renderFrame = function() {
                this.isLoaded !== !1 && this.renderer.renderFrame(this.currentFrame + this.firstFrame)
            }, AnimationItem.prototype.play = function(t) {
                t && this.name != t || this.isPaused === !0 && (this.isPaused = !1)
            }, AnimationItem.prototype.pause = function(t) {
                t && this.name != t || this.isPaused === !1 && (this.isPaused = !0)
            }, AnimationItem.prototype.togglePause = function(t) {
                t && this.name != t || (this.isPaused === !0 ? (this.isPaused = !1, this.play()) : (this.isPaused = !0, this.pause()))
            }, AnimationItem.prototype.stop = function(t) {
                t && this.name != t || (this.isPaused = !0, this.currentFrame = this.currentRawFrame = 0, this.playCount = 0, this.gotoFrame())
            }, AnimationItem.prototype.goToAndStop = function(t, e, n) {
                n && this.name != n || (this.setCurrentRawFrameValue(e ? t : t * this.frameModifier), this.isPaused = !0)
            }, AnimationItem.prototype.advanceTime = function(t) {
                this.isPaused !== !0 && this.isScrolling !== !0 && this.isLoaded !== !1 && this.setCurrentRawFrameValue(this.currentRawFrame + t * this.frameModifier)
            }, AnimationItem.prototype.updateAnimation = function(t) {
                this.setCurrentRawFrameValue(this.totalFrames * t)
            }, AnimationItem.prototype.moveFrame = function(t, e) {
                e && this.name != e || this.setCurrentRawFrameValue(this.currentRawFrame + t)
            }, AnimationItem.prototype.adjustSegment = function(t) {
                this.totalFrames = t[1] - t[0], this.firstFrame = t[0], this.trigger("segmentStart")
            }, AnimationItem.prototype.playSegments = function(t, e) {
                if ("object" == typeof t[0]) {
                    var n, i = t.length;
                    for (n = 0; i > n; n += 1) this.segments.push(t[n])
                } else this.segments.push(t);
                e && (this.adjustSegment(this.segments.shift()), this.setCurrentRawFrameValue(0)), this.isPaused && this.play()
            }, AnimationItem.prototype.resetSegments = function(t) {
                this.segments.length = 0, this.segments.push([this.animationData.ip * this.frameRate, Math.floor(this.animationData.op - this.animationData.ip + this.animationData.ip * this.frameRate)]), t && this.adjustSegment(this.segments.shift())
            }, AnimationItem.prototype.remove = function(t) {
                t && this.name != t || this.renderer.destroy()
            }, AnimationItem.prototype.destroy = function(t) {
                t && this.name != t || this.renderer && this.renderer.destroyed || (this.renderer.destroy(), this.trigger("destroy"), this._cbs = null)
            }, AnimationItem.prototype.setCurrentRawFrameValue = function(t) {
                this.currentRawFrame = t;
                var e = !1;
                if (this.currentRawFrame >= this.totalFrames) {
                    if (this.segments.length && (e = !0), this.loop === !1) return this.currentRawFrame = this.totalFrames - .01, this.gotoFrame(), this.pause(), void this.trigger("complete");
                    if (this.trigger("loopComplete"), this.playCount += 1, this.loop !== !0 && this.playCount == this.loop) return this.currentRawFrame = this.totalFrames - .01, this.gotoFrame(), this.pause(), void this.trigger("complete")
                } else if (this.currentRawFrame < 0) return this.playCount -= 1, this.playCount < 0 && (this.playCount = 0), this.loop === !1 ? (this.currentRawFrame = 0, this.gotoFrame(), this.pause(), void this.trigger("complete")) : (this.trigger("loopComplete"), this.currentRawFrame = this.totalFrames + this.currentRawFrame, void this.gotoFrame());
                if (e) {
                    var n = this.currentRawFrame % this.totalFrames;
                    this.adjustSegment(this.segments.shift()), this.currentRawFrame = n
                } else this.currentRawFrame = this.currentRawFrame % this.totalFrames;
                this.gotoFrame()
            }, AnimationItem.prototype.setSpeed = function(t) {
                this.playSpeed = t, this.updaFrameModifier()
            }, AnimationItem.prototype.setDirection = function(t) {
                this.playDirection = 0 > t ? -1 : 1, this.updaFrameModifier()
            }, AnimationItem.prototype.updaFrameModifier = function() {
                this.frameModifier = this.frameMult * this.playSpeed * this.playDirection
            }, AnimationItem.prototype.getPath = function() {
                return this.path
            }, AnimationItem.prototype.getAssetData = function(t) {
                for (var e = 0, n = this.assets.length; n > e;) {
                    if (t == this.assets[e].id) return this.assets[e];
                    e += 1
                }
            }, AnimationItem.prototype.hide = function() {
                this.renderer.hide()
            }, AnimationItem.prototype.show = function() {
                this.renderer.show()
            }, AnimationItem.prototype.getAssets = function() {
                return this.assets
            }, AnimationItem.prototype.trigger = function(t) {
                if (this._cbs[t]) switch (t) {
                    case "enterFrame":
                        this.triggerEvent(t, new BMEnterFrameEvent(t, this.currentFrame, this.totalFrames, this.frameMult));
                        break;
                    case "loopComplete":
                        this.triggerEvent(t, new BMCompleteLoopEvent(t, this.loop, this.playCount, this.frameMult));
                        break;
                    case "complete":
                        this.triggerEvent(t, new BMCompleteEvent(t, this.frameMult));
                        break;
                    case "segmentStart":
                        this.triggerEvent(t, new BMSegmentStartEvent(t, this.firstFrame, this.totalFrames));
                        break;
                    case "destroy":
                        this.triggerEvent(t, new BMDestroyEvent(t, this));
                        break;
                    default:
                        this.triggerEvent(t)
                }
                "enterFrame" === t && this.onEnterFrame && this.onEnterFrame.call(this, new BMEnterFrameEvent(t, this.currentFrame, this.totalFrames, this.frameMult)), "loopComplete" === t && this.onLoopComplete && this.onLoopComplete.call(this, new BMCompleteLoopEvent(t, this.loop, this.playCount, this.frameMult)), "complete" === t && this.onComplete && this.onComplete.call(this, new BMCompleteEvent(t, this.frameMult)), "segmentStart" === t && this.onSegmentStart && this.onSegmentStart.call(this, new BMSegmentStartEvent(t, this.firstFrame, this.totalFrames)), "destroy" === t && this.onDestroy && this.onDestroy.call(this, new BMDestroyEvent(t, this))
            }, AnimationItem.prototype.addEventListener = _addEventListener, AnimationItem.prototype.removeEventListener = _removeEventListener, AnimationItem.prototype.triggerEvent = _triggerEvent;
            var bodymovinjs = {};
            bodymovinjs.play = play, bodymovinjs.pause = pause, bodymovinjs.togglePause = togglePause, bodymovinjs.setSpeed = setSpeed, bodymovinjs.setDirection = setDirection, bodymovinjs.stop = stop, bodymovinjs.moveFrame = moveFrame, bodymovinjs.searchAnimations = searchAnimations, bodymovinjs.registerAnimation = registerAnimation, bodymovinjs.loadAnimation = loadAnimation, bodymovinjs.setSubframeRendering = setSubframeRendering, bodymovinjs.resize = resize, bodymovinjs.start = start, bodymovinjs.goToAndStop = goToAndStop, bodymovinjs.destroy = destroy, bodymovinjs.setQuality = setQuality, bodymovinjs.version = "4.1.7";
            var standalone = "__[STANDALONE]__",
                animationData = "__[ANIMATIONDATA]__",
                renderer = "";
            if (standalone) {
                var scripts = document.getElementsByTagName("script"),
                    index = scripts.length - 1,
                    myScript = scripts[index],
                    queryString = myScript.src.replace(/^[^\?]+\??/, "");
                renderer = getQueryVariable("renderer")
            }
            var readyStateCheckInterval = setInterval(checkReady, 100);
            return bodymovinjs
        })
    }, {}],
    2: [function(t, e, n) {
        ! function(t, n, i) {
            var r = window.matchMedia;
            "undefined" != typeof e && e.exports ? e.exports = i(r) : "function" == typeof define && define.amd ? define(function() {
                return n[t] = i(r)
            }) : n[t] = i(r)
        }("enquire", this, function(t) {
            "use strict";

            function e(t, e) {
                var n, i = 0,
                    r = t.length;
                for (i; r > i && (n = e(t[i], i), n !== !1); i++);
            }

            function n(t) {
                return "[object Array]" === Object.prototype.toString.apply(t)
            }

            function i(t) {
                return "function" == typeof t
            }

            function r(t) {
                this.options = t, !t.deferSetup && this.setup()
            }

            function s(e, n) {
                this.query = e, this.isUnconditional = n, this.handlers = [], this.mql = t(e);
                var i = this;
                this.listener = function(t) {
                    i.mql = t, i.assess()
                }, this.mql.addListener(this.listener)
            }

            function a() {
                if (!t) throw new Error("matchMedia not present, legacy browsers require a polyfill");
                this.queries = {}, this.browserIsIncapable = !t("only all").matches
            }
            return r.prototype = {
                setup: function() {
                    this.options.setup && this.options.setup(), this.initialised = !0
                },
                on: function() {
                    !this.initialised && this.setup(), this.options.match && this.options.match()
                },
                off: function() {
                    this.options.unmatch && this.options.unmatch()
                },
                destroy: function() {
                    this.options.destroy ? this.options.destroy() : this.off()
                },
                equals: function(t) {
                    return this.options === t || this.options.match === t
                }
            }, s.prototype = {
                addHandler: function(t) {
                    var e = new r(t);
                    this.handlers.push(e), this.matches() && e.on()
                },
                removeHandler: function(t) {
                    var n = this.handlers;
                    e(n, function(e, i) {
                        return e.equals(t) ? (e.destroy(), !n.splice(i, 1)) : void 0
                    })
                },
                matches: function() {
                    return this.mql.matches || this.isUnconditional
                },
                clear: function() {
                    e(this.handlers, function(t) {
                        t.destroy()
                    }), this.mql.removeListener(this.listener), this.handlers.length = 0
                },
                assess: function() {
                    var t = this.matches() ? "on" : "off";
                    e(this.handlers, function(e) {
                        e[t]()
                    })
                }
            }, a.prototype = {
                register: function(t, r, a) {
                    var o = this.queries,
                        h = a && this.browserIsIncapable;
                    return o[t] || (o[t] = new s(t, h)), i(r) && (r = {
                        match: r
                    }), n(r) || (r = [r]), e(r, function(e) {
                        o[t].addHandler(e)
                    }), this
                },
                unregister: function(t, e) {
                    var n = this.queries[t];
                    return n && (e ? n.removeHandler(e) : (n.clear(), delete this.queries[t])), this
                }
            }, new a
        })
    }, {}],
    3: [function(t, e, n) {
        ! function(t, n) {
            var i = n(t, t.document);
            t.lazySizes = i, "object" == typeof e && e.exports && (e.exports = i)
        }(window, function(t, e) {
            "use strict";
            if (e.getElementsByClassName) {
                var n, i = e.documentElement,
                    r = t.HTMLPictureElement && "sizes" in e.createElement("img"),
                    s = "addEventListener",
                    a = "getAttribute",
                    o = t[s],
                    h = t.setTimeout,
                    l = t.requestAnimationFrame || h,
                    p = /^picture$/i,
                    u = ["load", "error", "lazyincluded", "_lazyloaded"],
                    c = {},
                    f = Array.prototype.forEach,
                    m = function(t, e) {
                        return c[e] || (c[e] = new RegExp("(\\s|^)" + e + "(\\s|$)")), c[e].test(t[a]("class") || "") && c[e]
                    },
                    d = function(t, e) {
                        m(t, e) || t.setAttribute("class", (t[a]("class") || "").trim() + " " + e)
                    },
                    v = function(t, e) {
                        var n;
                        (n = m(t, e)) && t.setAttribute("class", (t[a]("class") || "").replace(n, " "))
                    },
                    g = function(t, e, n) {
                        var i = n ? s : "removeEventListener";
                        n && g(t, e), u.forEach(function(n) {
                            t[i](n, e)
                        })
                    },
                    y = function(t, n, i, r, s) {
                        var a = e.createEvent("CustomEvent");
                        return a.initCustomEvent(n, !r, !s, i || {}), t.dispatchEvent(a), a
                    },
                    b = function(e, i) {
                        var s;
                        !r && (s = t.picturefill || n.pf) ? s({
                            reevaluate: !0,
                            elements: [e]
                        }) : i && i.src && (e.src = i.src)
                    },
                    w = function(t, e) {
                        return (getComputedStyle(t, null) || {})[e]
                    },
                    E = function(t, e, i) {
                        for (i = i || t.offsetWidth; i < n.minSize && e && !t._lazysizesWidth;) i = e.offsetWidth, e = e.parentNode;
                        return i
                    },
                    C = function(e) {
                        var n, i = 0,
                            r = t.Date,
                            s = function() {
                                n = !1, i = r.now(), e()
                            },
                            a = function() {
                                h(s)
                            },
                            o = function() {
                                l(a)
                            };
                        return function() {
                            if (!n) {
                                var t = 125 - (r.now() - i);
                                n = !0, 6 > t && (t = 6), h(o, t)
                            }
                        }
                    },
                    _ = function() {
                        var r, u, c, E, _, S, A, k, P, T, M, D, I, F, L, O = /^img$/i,
                            z = /^iframe$/i,
                            j = "onscroll" in t && !/glebot/.test(navigator.userAgent),
                            V = 0,
                            N = 0,
                            B = 0,
                            R = 0,
                            H = function(t) {
                                B--, t && t.target && g(t.target, H), (!t || 0 > B || !t.target) && (B = 0)
                            },
                            W = function(t, n) {
                                var r, s = t,
                                    a = "hidden" == w(e.body, "visibility") || "hidden" != w(t, "visibility");
                                for (P -= n, D += n, T -= n, M += n; a && (s = s.offsetParent) && s != e.body && s != i;) a = (w(s, "opacity") || 1) > 0, a && "visible" != w(s, "overflow") && (r = s.getBoundingClientRect(), a = M > r.left && T < r.right && D > r.top - 1 && P < r.bottom + 1);
                                return a
                            },
                            q = function() {
                                var t, e, s, o, h, l, p, f, m;
                                if ((_ = n.loadMode) && 8 > B && (t = r.length)) {
                                    e = 0, R++, null == F && ("expand" in n || (n.expand = i.clientHeight > 600 ? i.clientWidth > 600 ? 550 : 410 : 359), I = n.expand, F = I * n.expFactor), F > N && 1 > B && R > 3 && _ > 2 ? (N = F, R = 0) : N = _ > 1 && R > 2 && 6 > B ? I : V;
                                    for (; t > e; e++)
                                        if (r[e] && !r[e]._lazyRace)
                                            if (j)
                                                if ((f = r[e][a]("data-expand")) && (l = 1 * f) || (l = N), m !== l && (A = innerWidth + l * L, k = innerHeight + l, p = -1 * l, m = l), s = r[e].getBoundingClientRect(), (D = s.bottom) >= p && (P = s.top) <= k && (M = s.right) >= p * L && (T = s.left) <= A && (D || M || T || P) && (c && 3 > B && !f && (3 > _ || 4 > R) || W(r[e], l))) {
                                                    if (Y(r[e]), h = !0, B > 9) break
                                                } else !h && c && !o && 4 > B && 4 > R && _ > 2 && (u[0] || n.preloadAfterLoad) && (u[0] || !f && (D || M || T || P || "auto" != r[e][a](n.sizesAttr))) && (o = u[0] || r[e]);
                                    else Y(r[e]);
                                    o && !h && Y(o)
                                }
                            },
                            G = C(q),
                            U = function(t) {
                                d(t.target, n.loadedClass), v(t.target, n.loadingClass), g(t.target, $)
                            },
                            $ = function(t) {
                                t = {
                                    target: t.target
                                }, l(function() {
                                    U(t)
                                })
                            },
                            Q = function(t, e) {
                                try {
                                    t.contentWindow.location.replace(e)
                                } catch (n) {
                                    t.src = e
                                }
                            },
                            X = function(t) {
                                var e, i, r = t[a](n.srcsetAttr);
                                (e = n.customMedia[t[a]("data-media") || t[a]("media")]) && t.setAttribute("media", e), r && t.setAttribute("srcset", r), e && (i = t.parentNode, i.insertBefore(t.cloneNode(), t), i.removeChild(t))
                            },
                            Z = function() {
                                var t, e = [],
                                    n = function() {
                                        for (; e.length;) e.shift()();
                                        t = !1
                                    },
                                    i = function(i) {
                                        e.push(i), t || (t = !0, l(n))
                                    };
                                return {
                                    add: i,
                                    run: n
                                }
                            }(),
                            Y = function(t) {
                                var e, i, r, s, o, u, w, C = O.test(t.nodeName),
                                    _ = C && (t[a](n.sizesAttr) || t[a]("sizes")),
                                    S = "auto" == _;
                                (!S && c || !C || !t.src && !t.srcset || t.complete || m(t, n.errorClass)) && (S && (w = t.offsetWidth), t._lazyRace = !0, B++, n.rC && (w = n.rC(t, w) || w), Z.add(function() {
                                    (o = y(t, "lazybeforeunveil")).defaultPrevented || (_ && (S ? (x.updateElem(t, !0, w), d(t, n.autosizesClass)) : t.setAttribute("sizes", _)), i = t[a](n.srcsetAttr), e = t[a](n.srcAttr), C && (r = t.parentNode, s = r && p.test(r.nodeName || "")), u = o.detail.firesLoad || "src" in t && (i || e || s), o = {
                                        target: t
                                    }, u && (g(t, H, !0), clearTimeout(E), E = h(H, 2500), d(t, n.loadingClass), g(t, $, !0)), s && f.call(r.getElementsByTagName("source"), X), i ? t.setAttribute("srcset", i) : e && !s && (z.test(t.nodeName) ? Q(t, e) : t.src = e), (i || s) && b(t, {
                                        src: e
                                    })), l(function() {
                                        t._lazyRace && delete t._lazyRace, v(t, n.lazyClass), (!u || t.complete) && (u ? H(o) : B--, U(o))
                                    })
                                }))
                            },
                            J = function() {
                                if (!c) {
                                    if (Date.now() - S < 999) return void h(J, 999);
                                    var t, i = function() {
                                        n.loadMode = 3, G()
                                    };
                                    c = !0, n.loadMode = 3, e.hidden ? (q(), Z.run()) : G(), o("scroll", function() {
                                        3 == n.loadMode && (n.loadMode = 2), clearTimeout(t), t = h(i, 99)
                                    }, !0)
                                }
                            };
                        return {
                            _: function() {
                                S = Date.now(), r = e.getElementsByClassName(n.lazyClass), u = e.getElementsByClassName(n.lazyClass + " " + n.preloadClass), L = n.hFac, o("scroll", G, !0), o("resize", G, !0), t.MutationObserver ? new MutationObserver(G).observe(i, {
                                    childList: !0,
                                    subtree: !0,
                                    attributes: !0
                                }) : (i[s]("DOMNodeInserted", G, !0), i[s]("DOMAttrModified", G, !0), setInterval(G, 999)), o("hashchange", G, !0), ["focus", "mouseover", "click", "load", "transitionend", "animationend", "webkitAnimationEnd"].forEach(function(t) {
                                    e[s](t, G, !0)
                                }), /d$|^c/.test(e.readyState) ? J() : (o("load", J), e[s]("DOMContentLoaded", G), h(J, 2e4)), G(r.length > 0)
                            },
                            checkElems: G,
                            unveil: Y
                        }
                    }(),
                    x = function() {
                        var t, i = function(t, e, n) {
                                var i, r, s, a, o = t.parentNode;
                                if (o && (n = E(t, o, n), a = y(t, "lazybeforesizes", {
                                        width: n,
                                        dataAttr: !!e
                                    }), !a.defaultPrevented && (n = a.detail.width, n && n !== t._lazysizesWidth))) {
                                    if (t._lazysizesWidth = n, n += "px", t.setAttribute("sizes", n), p.test(o.nodeName || ""))
                                        for (i = o.getElementsByTagName("source"), r = 0, s = i.length; s > r; r++) i[r].setAttribute("sizes", n);
                                    a.detail.dataAttr || b(t, a.detail)
                                }
                            },
                            r = function() {
                                var e, n = t.length;
                                if (n)
                                    for (e = 0; n > e; e++) i(t[e])
                            },
                            s = C(r);
                        return {
                            _: function() {
                                t = e.getElementsByClassName(n.autosizesClass), o("resize", s)
                            },
                            checkElems: s,
                            updateElem: i
                        }
                    }(),
                    S = function() {
                        S.i || (S.i = !0, x._(), _._())
                    };
                return function() {
                    var e, i = {
                        lazyClass: "lazyload",
                        loadedClass: "lazyloaded",
                        loadingClass: "lazyloading",
                        preloadClass: "lazypreload",
                        errorClass: "lazyerror",
                        autosizesClass: "lazyautosizes",
                        srcAttr: "data-src",
                        srcsetAttr: "data-srcset",
                        sizesAttr: "data-sizes",
                        minSize: 40,
                        customMedia: {},
                        init: !0,
                        expFactor: 1.7,
                        hFac: .8,
                        loadMode: 2
                    };
                    n = t.lazySizesConfig || t.lazysizesConfig || {};
                    for (e in i) e in n || (n[e] = i[e]);
                    t.lazySizesConfig = n, h(function() {
                        n.init && S()
                    })
                }(), {
                    cfg: n,
                    autoSizer: x,
                    loader: _,
                    init: S,
                    uP: b,
                    aC: d,
                    rC: v,
                    hC: m,
                    fire: y,
                    gW: E
                }
            }
        })
    }, {}],
    4: [function(t, e, n) {
        (function(t) {
            (function() {
                function i(t, e) {
                    return t.set(e[0], e[1]), t
                }

                function r(t, e) {
                    return t.add(e), t
                }

                function s(t, e, n) {
                    var i = n.length;
                    switch (i) {
                        case 0:
                            return t.call(e);
                        case 1:
                            return t.call(e, n[0]);
                        case 2:
                            return t.call(e, n[0], n[1]);
                        case 3:
                            return t.call(e, n[0], n[1], n[2])
                    }
                    return t.apply(e, n)
                }

                function a(t, e, n, i) {
                    for (var r = -1, s = t.length; ++r < s;) {
                        var a = t[r];
                        e(i, a, n(a), t)
                    }
                    return i
                }

                function o(t, e) {
                    for (var n = -1, i = t.length, r = -1, s = e.length, a = Array(i + s); ++n < i;) a[n] = t[n];
                    for (; ++r < s;) a[n++] = e[r];
                    return a
                }

                function h(t, e) {
                    for (var n = -1, i = t.length; ++n < i && e(t[n], n, t) !== !1;);
                    return t
                }

                function l(t, e) {
                    for (var n = t.length; n-- && e(t[n], n, t) !== !1;);
                    return t
                }

                function p(t, e) {
                    for (var n = -1, i = t.length; ++n < i;)
                        if (!e(t[n], n, t)) return !1;
                    return !0
                }

                function u(t, e) {
                    for (var n = -1, i = t.length, r = 0, s = []; ++n < i;) {
                        var a = t[n];
                        e(a, n, t) && (s[r++] = a)
                    }
                    return s
                }

                function c(t, e) {
                    return !!t.length && C(t, e, 0) > -1
                }

                function f(t, e, n) {
                    for (var i = -1, r = t.length; ++i < r;)
                        if (n(e, t[i])) return !0;
                    return !1
                }

                function m(t, e) {
                    for (var n = -1, i = t.length, r = Array(i); ++n < i;) r[n] = e(t[n], n, t);
                    return r
                }

                function d(t, e) {
                    for (var n = -1, i = e.length, r = t.length; ++n < i;) t[r + n] = e[n];
                    return t
                }

                function v(t, e, n, i) {
                    var r = -1,
                        s = t.length;
                    for (i && s && (n = t[++r]); ++r < s;) n = e(n, t[r], r, t);
                    return n
                }

                function g(t, e, n, i) {
                    var r = t.length;
                    for (i && r && (n = t[--r]); r--;) n = e(n, t[r], r, t);
                    return n
                }

                function y(t, e) {
                    for (var n = -1, i = t.length; ++n < i;)
                        if (e(t[n], n, t)) return !0;
                    return !1
                }

                function b(t, e, n) {
                    for (var i = -1, r = t.length; ++i < r;) {
                        var s = t[i],
                            a = e(s);
                        if (null != a && (o === K ? a === a : n(a, o))) var o = a,
                            h = s
                    }
                    return h
                }

                function w(t, e, n, i) {
                    var r;
                    return n(t, function(t, n, s) {
                        return e(t, n, s) ? (r = i ? n : t, !1) : void 0
                    }), r
                }

                function E(t, e, n) {
                    for (var i = t.length, r = n ? i : -1; n ? r-- : ++r < i;)
                        if (e(t[r], r, t)) return r;
                    return -1
                }

                function C(t, e, n) {
                    if (e !== e) return H(t, n);
                    for (var i = n - 1, r = t.length; ++i < r;)
                        if (t[i] === e) return i;
                    return -1
                }

                function _(t, e, n, i) {
                    for (var r = n - 1, s = t.length; ++r < s;)
                        if (i(t[r], e)) return r;
                    return -1
                }

                function x(t, e) {
                    var n = t ? t.length : 0;
                    return n ? k(t, e) / n : kt
                }

                function S(t, e, n, i, r) {
                    return r(t, function(t, r, s) {
                        n = i ? (i = !1, t) : e(n, t, r, s)
                    }), n
                }

                function A(t, e) {
                    var n = t.length;
                    for (t.sort(e); n--;) t[n] = t[n].value;
                    return t
                }

                function k(t, e) {
                    for (var n, i = -1, r = t.length; ++i < r;) {
                        var s = e(t[i]);
                        s !== K && (n = n === K ? s : n + s)
                    }
                    return n
                }

                function P(t, e) {
                    for (var n = -1, i = Array(t); ++n < t;) i[n] = e(n);
                    return i
                }

                function T(t, e) {
                    return m(e, function(e) {
                        return [e, t[e]]
                    })
                }

                function M(t) {
                    return function(e) {
                        return t(e)
                    }
                }

                function D(t, e) {
                    return m(e, function(e) {
                        return t[e]
                    })
                }

                function I(t, e) {
                    for (var n = -1, i = t.length; ++n < i && C(e, t[n], 0) > -1;);
                    return n
                }

                function F(t, e) {
                    for (var n = t.length; n-- && C(e, t[n], 0) > -1;);
                    return n
                }

                function L(t) {
                    return t && t.Object === Object ? t : null
                }

                function O(t, e) {
                    if (t !== e) {
                        var n = null === t,
                            i = t === K,
                            r = t === t,
                            s = null === e,
                            a = e === K,
                            o = e === e;
                        if (t > e && !s || !r || n && !a && o || i && o) return 1;
                        if (e > t && !n || !o || s && !i && r || a && r) return -1
                    }
                    return 0
                }

                function z(t, e, n) {
                    for (var i = -1, r = t.criteria, s = e.criteria, a = r.length, o = n.length; ++i < a;) {
                        var h = O(r[i], s[i]);
                        if (h) {
                            if (i >= o) return h;
                            var l = n[i];
                            return h * ("desc" == l ? -1 : 1)
                        }
                    }
                    return t.index - e.index
                }

                function j(t, e) {
                    for (var n = t.length, i = 0; n--;) t[n] === e && i++;
                    return i
                }

                function V(t) {
                    return function(e, n) {
                        var i;
                        return e === K && n === K ? 0 : (e !== K && (i = e), n !== K && (i = i === K ? n : t(i, n)), i)
                    }
                }

                function N(t) {
                    return An[t]
                }

                function B(t) {
                    return kn[t]
                }

                function R(t) {
                    return "\\" + Mn[t]
                }

                function H(t, e, n) {
                    for (var i = t.length, r = e + (n ? 0 : -1); n ? r-- : ++r < i;) {
                        var s = t[r];
                        if (s !== s) return r
                    }
                    return -1
                }

                function W(t) {
                    var e = !1;
                    if (null != t && "function" != typeof t.toString) try {
                        e = !!(t + "")
                    } catch (n) {}
                    return e
                }

                function q(t, e) {
                    return t = "number" == typeof t || De.test(t) ? +t : -1, e = null == e ? St : e, t > -1 && t % 1 == 0 && e > t
                }

                function G(t) {
                    for (var e, n = []; !(e = t.next()).done;) n.push(e.value);
                    return n
                }

                function U(t) {
                    var e = -1,
                        n = Array(t.size);
                    return t.forEach(function(t, i) {
                        n[++e] = [i, t]
                    }), n
                }

                function $(t, e) {
                    for (var n = -1, i = t.length, r = 0, s = []; ++n < i;) {
                        var a = t[n];
                        (a === e || a === rt) && (t[n] = rt, s[r++] = n)
                    }
                    return s
                }

                function Q(t) {
                    var e = -1,
                        n = Array(t.size);
                    return t.forEach(function(t) {
                        n[++e] = t
                    }), n
                }

                function X(t) {
                    if (!t || !yn.test(t)) return t.length;
                    for (var e = gn.lastIndex = 0; gn.test(t);) e++;
                    return e
                }

                function Z(t) {
                    return t.match(gn)
                }

                function Y(t) {
                    return Pn[t]
                }

                function J(t) {
                    function e(t) {
                        if (to(t) && !Wp(t) && !(t instanceof De)) {
                            if (t instanceof L) return t;
                            if (ol.call(t, "__wrapped__")) return Ur(t)
                        }
                        return new L(t)
                    }

                    function n() {}

                    function L(t, e) {
                        this.__wrapped__ = t, this.__actions__ = [], this.__chain__ = !!e, this.__index__ = 0, this.__values__ = K
                    }

                    function De(t) {
                        this.__wrapped__ = t, this.__actions__ = [], this.__dir__ = 1, this.__filtered__ = !1, this.__iteratees__ = [], this.__takeCount__ = Pt, this.__views__ = []
                    }

                    function Oe() {
                        var t = new De(this.__wrapped__);
                        return t.__actions__ = Ui(this.__actions__), t.__dir__ = this.__dir__, t.__filtered__ = this.__filtered__, t.__iteratees__ = Ui(this.__iteratees__), t.__takeCount__ = this.__takeCount__, t.__views__ = Ui(this.__views__), t
                    }

                    function ze() {
                        if (this.__filtered__) {
                            var t = new De(this);
                            t.__dir__ = -1, t.__filtered__ = !0
                        } else t = this.clone(), t.__dir__ *= -1;
                        return t
                    }

                    function je() {
                        var t = this.__wrapped__.value(),
                            e = this.__dir__,
                            n = Wp(t),
                            i = 0 > e,
                            r = n ? t.length : 0,
                            s = Pr(0, r, this.__views__),
                            a = s.start,
                            o = s.end,
                            h = o - a,
                            l = i ? o : a - 1,
                            p = this.__iteratees__,
                            u = p.length,
                            c = 0,
                            f = Il(h, this.__takeCount__);
                        if (!n || et > r || r == h && f == h) return Fi(t, this.__actions__);
                        var m = [];
                        t: for (; h-- && f > c;) {
                            l += e;
                            for (var d = -1, v = t[l]; ++d < u;) {
                                var g = p[d],
                                    y = g.iteratee,
                                    b = g.type,
                                    w = y(v);
                                if (b == Ct) v = w;
                                else if (!w) {
                                    if (b == Et) continue t;
                                    break t
                                }
                            }
                            m[c++] = v
                        }
                        return m
                    }

                    function Ve() {}

                    function Ne(t, e) {
                        return Re(t, e) && delete t[e]
                    }

                    function Be(t, e) {
                        if (Rl) {
                            var n = t[e];
                            return n === it ? K : n
                        }
                        return ol.call(t, e) ? t[e] : K
                    }

                    function Re(t, e) {
                        return Rl ? t[e] !== K : ol.call(t, e)
                    }

                    function He(t, e, n) {
                        t[e] = Rl && n === K ? it : n
                    }

                    function We(t) {
                        var e = -1,
                            n = t ? t.length : 0;
                        for (this.clear(); ++e < n;) {
                            var i = t[e];
                            this.set(i[0], i[1])
                        }
                    }

                    function qe() {
                        this.__data__ = {
                            hash: new Ve,
                            map: jl ? new jl : [],
                            string: new Ve
                        }
                    }

                    function Ge(t) {
                        var e = this.__data__;
                        return zr(t) ? Ne("string" == typeof t ? e.string : e.hash, t) : jl ? e.map["delete"](t) : sn(e.map, t)
                    }

                    function Ue(t) {
                        var e = this.__data__;
                        return zr(t) ? Be("string" == typeof t ? e.string : e.hash, t) : jl ? e.map.get(t) : an(e.map, t)
                    }

                    function $e(t) {
                        var e = this.__data__;
                        return zr(t) ? Re("string" == typeof t ? e.string : e.hash, t) : jl ? e.map.has(t) : on(e.map, t)
                    }

                    function Qe(t, e) {
                        var n = this.__data__;
                        return zr(t) ? He("string" == typeof t ? n.string : n.hash, t, e) : jl ? n.map.set(t, e) : ln(n.map, t, e), this
                    }

                    function Xe(t) {
                        var e = -1,
                            n = t ? t.length : 0;
                        for (this.__data__ = new We; ++e < n;) this.push(t[e])
                    }

                    function Ze(t, e) {
                        var n = t.__data__;
                        if (zr(e)) {
                            var i = n.__data__,
                                r = "string" == typeof e ? i.string : i.hash;
                            return r[e] === it
                        }
                        return n.has(e)
                    }

                    function Ye(t) {
                        var e = this.__data__;
                        if (zr(t)) {
                            var n = e.__data__,
                                i = "string" == typeof t ? n.string : n.hash;
                            i[t] = it
                        } else e.set(t, it)
                    }

                    function Je(t) {
                        var e = -1,
                            n = t ? t.length : 0;
                        for (this.clear(); ++e < n;) {
                            var i = t[e];
                            this.set(i[0], i[1])
                        }
                    }

                    function Ke() {
                        this.__data__ = {
                            array: [],
                            map: null
                        }
                    }

                    function tn(t) {
                        var e = this.__data__,
                            n = e.array;
                        return n ? sn(n, t) : e.map["delete"](t)
                    }

                    function en(t) {
                        var e = this.__data__,
                            n = e.array;
                        return n ? an(n, t) : e.map.get(t)
                    }

                    function nn(t) {
                        var e = this.__data__,
                            n = e.array;
                        return n ? on(n, t) : e.map.has(t)
                    }

                    function rn(t, e) {
                        var n = this.__data__,
                            i = n.array;
                        i && (i.length < et - 1 ? ln(i, t, e) : (n.array = null, n.map = new We(i)));
                        var r = n.map;
                        return r && r.set(t, e), this
                    }

                    function sn(t, e) {
                        var n = hn(t, e);
                        if (0 > n) return !1;
                        var i = t.length - 1;
                        return n == i ? t.pop() : xl.call(t, n, 1), !0
                    }

                    function an(t, e) {
                        var n = hn(t, e);
                        return 0 > n ? K : t[n][1]
                    }

                    function on(t, e) {
                        return hn(t, e) > -1
                    }

                    function hn(t, e) {
                        for (var n = t.length; n--;)
                            if (Oa(t[n][0], e)) return n;
                        return -1
                    }

                    function ln(t, e, n) {
                        var i = hn(t, e);
                        0 > i ? t.push([e, n]) : t[i][1] = n
                    }

                    function pn(t, e, n, i) {
                        return t === K || Oa(t, sl[n]) && !ol.call(i, n) ? e : t
                    }

                    function un(t, e, n) {
                        (n !== K && !Oa(t[e], n) || "number" == typeof e && n === K && !(e in t)) && (t[e] = n)
                    }

                    function cn(t, e, n) {
                        var i = t[e];
                        ol.call(t, e) && Oa(i, n) && (n !== K || e in t) || (t[e] = n)
                    }

                    function fn(t, e, n, i) {
                        return Kl(t, function(t, r, s) {
                            e(i, t, n(t), s)
                        }), i
                    }

                    function mn(t, e) {
                        return t && $i(e, Ro(e), t)
                    }

                    function dn(t, e) {
                        for (var n = -1, i = null == t, r = e.length, s = Array(r); ++n < r;) s[n] = i ? K : Vo(t, e[n]);
                        return s
                    }

                    function gn(t) {
                        return Ra(t) ? t : []
                    }

                    function An(t) {
                        return "function" == typeof t ? t : Ih
                    }

                    function kn(t) {
                        return "string" == typeof t || mo(t) ? t : t + ""
                    }

                    function Pn(t) {
                        return Wp(t) ? t : lp(t)
                    }

                    function Tn(t, e, n) {
                        return t === t && (n !== K && (t = n >= t ? t : n), e !== K && (t = t >= e ? t : e)), t
                    }

                    function Mn(t, e, n, i, r, s, a) {
                        var o;
                        if (i && (o = s ? i(t, r, s, a) : i(t)), o !== K) return o;
                        if (!Ka(t)) return t;
                        var l = Wp(t);
                        if (l) {
                            if (o = Mr(t), !e) return Ui(t, o)
                        } else {
                            var p = kr(t),
                                u = p == zt || p == jt;
                            if (qp(t)) return zi(t, e);
                            if (p == Bt || p == Dt || u && !s) {
                                if (W(t)) return s ? t : {};
                                if (o = Dr(u ? {} : t), !e) return Xi(t, mn(o, t))
                            } else {
                                if (!Sn[p]) return s ? t : {};
                                o = Ir(t, p, Mn, e)
                            }
                        }
                        a || (a = new Je);
                        var c = a.get(t);
                        if (c) return c;
                        if (a.set(t, o), !l) var f = n ? yr(t) : Ro(t);
                        return h(f || t, function(r, s) {
                            f && (s = r, r = t[s]), cn(o, s, Mn(r, e, n, i, s, t, a))
                        }), o
                    }

                    function Fn(t) {
                        var e = Ro(t),
                            n = e.length;
                        return function(i) {
                            if (null == i) return !n;
                            for (var r = n; r--;) {
                                var s = e[r],
                                    a = t[s],
                                    o = i[s];
                                if (o === K && !(s in Object(i)) || !a(o)) return !1
                            }
                            return !0
                        }
                    }

                    function Ln(t) {
                        return Ka(t) ? El(t) : {}
                    }

                    function zn(t, e, n) {
                        if ("function" != typeof t) throw new il(nt);
                        return _l(function() {
                            t.apply(K, n)
                        }, e)
                    }

                    function jn(t, e, n, i) {
                        var r = -1,
                            s = c,
                            a = !0,
                            o = t.length,
                            h = [],
                            l = e.length;
                        if (!o) return h;
                        n && (e = m(e, M(n))), i ? (s = f, a = !1) : e.length >= et && (s = Ze, a = !1, e = new Xe(e));
                        t: for (; ++r < o;) {
                            var p = t[r],
                                u = n ? n(p) : p;
                            if (a && u === u) {
                                for (var d = l; d--;)
                                    if (e[d] === u) continue t;
                                h.push(p)
                            } else s(e, u, i) || h.push(p)
                        }
                        return h
                    }

                    function Vn(t, e) {
                        var n = !0;
                        return Kl(t, function(t, i, r) {
                            return n = !!e(t, i, r)
                        }), n
                    }

                    function Nn(t, e, n, i) {
                        var r = t.length;
                        for (n = _o(n), 0 > n && (n = -n > r ? 0 : r + n), i = i === K || i > r ? r : _o(i), 0 > i && (i += r), i = n > i ? 0 : xo(i); i > n;) t[n++] = e;
                        return t
                    }

                    function Hn(t, e) {
                        var n = [];
                        return Kl(t, function(t, i, r) {
                            e(t, i, r) && n.push(t)
                        }), n
                    }

                    function Wn(t, e, n, i) {
                        i || (i = []);
                        for (var r = -1, s = t.length; ++r < s;) {
                            var a = t[r];
                            e > 0 && Ra(a) && (n || Wp(a) || Va(a)) ? e > 1 ? Wn(a, e - 1, n, i) : d(i, a) : n || (i[i.length] = a)
                        }
                        return i
                    }

                    function qn(t, e) {
                        return t && ep(t, e, Ro)
                    }

                    function Gn(t, e) {
                        return t && np(t, e, Ro)
                    }

                    function Un(t, e) {
                        return u(e, function(e) {
                            return Za(t[e])
                        })
                    }

                    function $n(t, e) {
                        e = Or(e, t) ? [e] : Pn(e);
                        for (var n = 0, i = e.length; null != t && i > n;) t = t[e[n++]];
                        return n && n == i ? t : K
                    }

                    function Qn(t, e, n) {
                        var i = e(t);
                        return Wp(t) ? i : d(i, n(t))
                    }

                    function Xn(t, e) {
                        return ol.call(t, e) || "object" == typeof t && e in t && null === Sr(t)
                    }

                    function Zn(t, e) {
                        return e in Object(t)
                    }

                    function Yn(t, e, n) {
                        return t >= Il(e, n) && t < Dl(e, n)
                    }

                    function Jn(t, e, n) {
                        for (var i = n ? f : c, r = t[0].length, s = t.length, a = s, o = Array(s), h = 1 / 0, l = []; a--;) {
                            var p = t[a];
                            a && e && (p = m(p, M(e))), h = Il(p.length, h), o[a] = !n && (e || r >= 120 && p.length >= 120) ? new Xe(a && p) : K
                        }
                        p = t[0];
                        var u = -1,
                            d = o[0];
                        t: for (; ++u < r && l.length < h;) {
                            var v = p[u],
                                g = e ? e(v) : v;
                            if (!(d ? Ze(d, g) : i(l, g, n))) {
                                for (a = s; --a;) {
                                    var y = o[a];
                                    if (!(y ? Ze(y, g) : i(t[a], g, n))) continue t
                                }
                                d && d.push(g), l.push(v)
                            }
                        }
                        return l
                    }

                    function Kn(t, e, n, i) {
                        return qn(t, function(t, r, s) {
                            e(i, n(t), r, s)
                        }), i
                    }

                    function ti(t, e, n) {
                        Or(e, t) || (e = Pn(e), t = Wr(t, e), e = us(e));
                        var i = null == t ? t : t[e];
                        return null == i ? K : s(i, t, n)
                    }

                    function ei(t, e, n, i, r) {
                        return t === e ? !0 : null == t || null == e || !Ka(t) && !to(e) ? t !== t && e !== e : ni(t, e, ei, n, i, r)
                    }

                    function ni(t, e, n, i, r, s) {
                        var a = Wp(t),
                            o = Wp(e),
                            h = It,
                            l = It;
                        a || (h = kr(t), h = h == Dt ? Bt : h), o || (l = kr(e), l = l == Dt ? Bt : l);
                        var p = h == Bt && !W(t),
                            u = l == Bt && !W(e),
                            c = h == l;
                        if (c && !p) return s || (s = new Je), a || vo(t) ? dr(t, e, n, i, r, s) : vr(t, e, h, n, i, r, s);
                        if (!(r & vt)) {
                            var f = p && ol.call(t, "__wrapped__"),
                                m = u && ol.call(e, "__wrapped__");
                            if (f || m) {
                                var d = f ? t.value() : t,
                                    v = m ? e.value() : e;
                                return s || (s = new Je), n(d, v, i, r, s)
                            }
                        }
                        return c ? (s || (s = new Je), gr(t, e, n, i, r, s)) : !1
                    }

                    function ii(t, e, n, i) {
                        var r = n.length,
                            s = r,
                            a = !i;
                        if (null == t) return !s;
                        for (t = Object(t); r--;) {
                            var o = n[r];
                            if (a && o[2] ? o[1] !== t[o[0]] : !(o[0] in t)) return !1
                        }
                        for (; ++r < s;) {
                            o = n[r];
                            var h = o[0],
                                l = t[h],
                                p = o[1];
                            if (a && o[2]) {
                                if (l === K && !(h in t)) return !1
                            } else {
                                var u = new Je;
                                if (i) var c = i(l, p, h, t, e, u);
                                if (!(c === K ? ei(p, l, i, dt | vt, u) : c)) return !1
                            }
                        }
                        return !0
                    }

                    function ri(t) {
                        return "function" == typeof t ? t : null == t ? Ih : "object" == typeof t ? Wp(t) ? li(t[0], t[1]) : hi(t) : Bh(t)
                    }

                    function si(t) {
                        return Ml(Object(t))
                    }

                    function ai(t) {
                        t = null == t ? t : Object(t);
                        var e = [];
                        for (var n in t) e.push(n);
                        return e
                    }

                    function oi(t, e) {
                        var n = -1,
                            i = Ba(t) ? Array(t.length) : [];
                        return Kl(t, function(t, r, s) {
                            i[++n] = e(t, r, s)
                        }), i
                    }

                    function hi(t) {
                        var e = Cr(t);
                        return 1 == e.length && e[0][2] ? Br(e[0][0], e[0][1]) : function(n) {
                            return n === t || ii(n, t, e)
                        }
                    }

                    function li(t, e) {
                        return Or(t) && Nr(e) ? Br(t, e) : function(n) {
                            var i = Vo(n, t);
                            return i === K && i === e ? Bo(n, t) : ei(e, i, K, dt | vt)
                        }
                    }

                    function pi(t, e, n, i, r) {
                        if (t !== e) {
                            if (!Wp(e) && !vo(e)) var s = Ho(e);
                            h(s || e, function(a, o) {
                                if (s && (o = a, a = e[o]), Ka(a)) r || (r = new Je), ui(t, e, o, n, pi, i, r);
                                else {
                                    var h = i ? i(t[o], a, o + "", t, e, r) : K;
                                    h === K && (h = a), un(t, o, h)
                                }
                            })
                        }
                    }

                    function ui(t, e, n, i, r, s, a) {
                        var o = t[n],
                            h = e[n],
                            l = a.get(h);
                        if (l) return void un(t, n, l);
                        var p = s ? s(o, h, n + "", t, e, a) : K,
                            u = p === K;
                        u && (p = h, Wp(h) || vo(h) ? Wp(o) ? p = o : Ra(o) ? p = Ui(o) : (u = !1, p = Mn(h, !0)) : lo(h) || Va(h) ? Va(o) ? p = Ao(o) : !Ka(o) || i && Za(o) ? (u = !1, p = Mn(h, !0)) : p = o : u = !1), a.set(h, p), u && r(p, h, i, s, a), a["delete"](h), un(t, n, p)
                    }

                    function ci(t, e, n) {
                        var i = -1;
                        e = m(e.length ? e : [Ih], Er());
                        var r = oi(t, function(t, n, r) {
                            var s = m(e, function(e) {
                                return e(t)
                            });
                            return {
                                criteria: s,
                                index: ++i,
                                value: t
                            }
                        });
                        return A(r, function(t, e) {
                            return z(t, e, n)
                        })
                    }

                    function fi(t, e) {
                        return t = Object(t), v(e, function(e, n) {
                            return n in t && (e[n] = t[n]), e
                        }, {})
                    }

                    function mi(t, e) {
                        for (var n = -1, i = br(t), r = i.length, s = {}; ++n < r;) {
                            var a = i[n],
                                o = t[a];
                            e(o, a) && (s[a] = o)
                        }
                        return s
                    }

                    function di(t) {
                        return function(e) {
                            return null == e ? K : e[t]
                        }
                    }

                    function vi(t) {
                        return function(e) {
                            return $n(e, t)
                        }
                    }

                    function gi(t, e, n, i) {
                        var r = i ? _ : C,
                            s = -1,
                            a = e.length,
                            o = t;
                        for (n && (o = m(t, M(n))); ++s < a;)
                            for (var h = 0, l = e[s], p = n ? n(l) : l;
                                (h = r(o, p, h, i)) > -1;) o !== t && xl.call(o, h, 1), xl.call(t, h, 1);
                        return t
                    }

                    function yi(t, e) {
                        for (var n = t ? e.length : 0, i = n - 1; n--;) {
                            var r = e[n];
                            if (i == n || r != s) {
                                var s = r;
                                if (q(r)) xl.call(t, r, 1);
                                else if (Or(r, t)) delete t[r];
                                else {
                                    var a = Pn(r),
                                        o = Wr(t, a);
                                    null != o && delete o[us(a)]
                                }
                            }
                        }
                        return t
                    }

                    function bi(t, e) {
                        return t + Al(Ll() * (e - t + 1))
                    }

                    function wi(t, e, n, i) {
                        for (var r = -1, s = Dl(Sl((e - t) / (n || 1)), 0), a = Array(s); s--;) a[i ? s : ++r] = t, t += n;
                        return a
                    }

                    function Ei(t, e) {
                        var n = "";
                        if (!t || 1 > e || e > St) return n;
                        do e % 2 && (n += t), e = Al(e / 2), e && (t += t); while (e);
                        return n
                    }

                    function Ci(t, e, n, i) {
                        e = Or(e, t) ? [e] : Pn(e);
                        for (var r = -1, s = e.length, a = s - 1, o = t; null != o && ++r < s;) {
                            var h = e[r];
                            if (Ka(o)) {
                                var l = n;
                                if (r != a) {
                                    var p = o[h];
                                    l = i ? i(p, h, o) : K, l === K && (l = null == p ? q(e[r + 1]) ? [] : {} : p)
                                }
                                cn(o, h, l)
                            }
                            o = o[h]
                        }
                        return t
                    }

                    function _i(t, e, n) {
                        var i = -1,
                            r = t.length;
                        0 > e && (e = -e > r ? 0 : r + e), n = n > r ? r : n, 0 > n && (n += r), r = e > n ? 0 : n - e >>> 0, e >>>= 0;
                        for (var s = Array(r); ++i < r;) s[i] = t[i + e];
                        return s
                    }

                    function xi(t, e) {
                        var n;
                        return Kl(t, function(t, i, r) {
                            return n = e(t, i, r), !n
                        }), !!n
                    }

                    function Si(t, e, n) {
                        var i = 0,
                            r = t ? t.length : i;
                        if ("number" == typeof e && e === e && Mt >= r) {
                            for (; r > i;) {
                                var s = i + r >>> 1,
                                    a = t[s];
                                (n ? e >= a : e > a) && null !== a ? i = s + 1 : r = s
                            }
                            return r
                        }
                        return Ai(t, e, Ih, n)
                    }

                    function Ai(t, e, n, i) {
                        e = n(e);
                        for (var r = 0, s = t ? t.length : 0, a = e !== e, o = null === e, h = e === K; s > r;) {
                            var l = Al((r + s) / 2),
                                p = n(t[l]),
                                u = p !== K,
                                c = p === p;
                            if (a) var f = c || i;
                            else f = o ? c && u && (i || null != p) : h ? c && (i || u) : null == p ? !1 : i ? e >= p : e > p;
                            f ? r = l + 1 : s = l
                        }
                        return Il(s, Tt)
                    }

                    function ki(t) {
                        return Pi(t)
                    }

                    function Pi(t, e) {
                        for (var n = 0, i = t.length, r = t[0], s = e ? e(r) : r, a = s, o = 1, h = [r]; ++n < i;) r = t[n], s = e ? e(r) : r, Oa(s, a) || (a = s, h[o++] = r);
                        return h
                    }

                    function Ti(t, e, n) {
                        var i = -1,
                            r = c,
                            s = t.length,
                            a = !0,
                            o = [],
                            h = o;
                        if (n) a = !1, r = f;
                        else if (s >= et) {
                            var l = e ? null : rp(t);
                            if (l) return Q(l);
                            a = !1, r = Ze, h = new Xe
                        } else h = e ? [] : o;
                        t: for (; ++i < s;) {
                            var p = t[i],
                                u = e ? e(p) : p;
                            if (a && u === u) {
                                for (var m = h.length; m--;)
                                    if (h[m] === u) continue t;
                                e && h.push(u), o.push(p)
                            } else r(h, u, n) || (h !== o && h.push(u), o.push(p))
                        }
                        return o
                    }

                    function Mi(t, e) {
                        e = Or(e, t) ? [e] : Pn(e), t = Wr(t, e);
                        var n = us(e);
                        return null != t && No(t, n) ? delete t[n] : !0
                    }

                    function Di(t, e, n, i) {
                        return Ci(t, e, n($n(t, e)), i)
                    }

                    function Ii(t, e, n, i) {
                        for (var r = t.length, s = i ? r : -1;
                            (i ? s-- : ++s < r) && e(t[s], s, t););
                        return n ? _i(t, i ? 0 : s, i ? s + 1 : r) : _i(t, i ? s + 1 : 0, i ? r : s)
                    }

                    function Fi(t, e) {
                        var n = t;
                        return n instanceof De && (n = n.value()), v(e, function(t, e) {
                            return e.func.apply(e.thisArg, d([t], e.args))
                        }, n)
                    }

                    function Li(t, e, n) {
                        for (var i = -1, r = t.length; ++i < r;) var s = s ? d(jn(s, t[i], e, n), jn(t[i], s, e, n)) : t[i];
                        return s && s.length ? Ti(s, e, n) : []
                    }

                    function Oi(t, e, n) {
                        for (var i = -1, r = t.length, s = e.length, a = {}; ++i < r;) {
                            var o = s > i ? e[i] : K;
                            n(a, t[i], o)
                        }
                        return a
                    }

                    function zi(t, e) {
                        if (e) return t.slice();
                        var n = new t.constructor(t.length);
                        return t.copy(n), n
                    }

                    function ji(t) {
                        var e = new t.constructor(t.byteLength);
                        return new vl(e).set(new vl(t)), e
                    }

                    function Vi(t, e) {
                        var n = e ? ji(t.buffer) : t.buffer;
                        return new t.constructor(n, t.byteOffset, t.byteLength)
                    }

                    function Ni(t, e, n) {
                        var r = e ? n(U(t), !0) : U(t);
                        return v(r, i, new t.constructor)
                    }

                    function Bi(t) {
                        var e = new t.constructor(t.source, Se.exec(t));
                        return e.lastIndex = t.lastIndex, e
                    }

                    function Ri(t, e, n) {
                        var i = e ? n(Q(t), !0) : Q(t);
                        return v(i, r, new t.constructor)
                    }

                    function Hi(t) {
                        return Yl ? Object(Yl.call(t)) : {}
                    }

                    function Wi(t, e) {
                        var n = e ? ji(t.buffer) : t.buffer;
                        return new t.constructor(n, t.byteOffset, t.length)
                    }

                    function qi(t, e, n, i) {
                        for (var r = -1, s = t.length, a = n.length, o = -1, h = e.length, l = Dl(s - a, 0), p = Array(h + l), u = !i; ++o < h;) p[o] = e[o];
                        for (; ++r < a;)(u || s > r) && (p[n[r]] = t[r]);
                        for (; l--;) p[o++] = t[r++];
                        return p
                    }

                    function Gi(t, e, n, i) {
                        for (var r = -1, s = t.length, a = -1, o = n.length, h = -1, l = e.length, p = Dl(s - o, 0), u = Array(p + l), c = !i; ++r < p;) u[r] = t[r];
                        for (var f = r; ++h < l;) u[f + h] = e[h];
                        for (; ++a < o;)(c || s > r) && (u[f + n[a]] = t[r++]);
                        return u
                    }

                    function Ui(t, e) {
                        var n = -1,
                            i = t.length;
                        for (e || (e = Array(i)); ++n < i;) e[n] = t[n];
                        return e
                    }

                    function $i(t, e, n) {
                        return Qi(t, e, n)
                    }

                    function Qi(t, e, n, i) {
                        n || (n = {});
                        for (var r = -1, s = e.length; ++r < s;) {
                            var a = e[r],
                                o = i ? i(n[a], t[a], a, n, t) : t[a];
                            cn(n, a, o)
                        }
                        return n
                    }

                    function Xi(t, e) {
                        return $i(t, Ar(t), e)
                    }

                    function Zi(t, e) {
                        return function(n, i) {
                            var r = Wp(n) ? a : fn,
                                s = e ? e() : {};
                            return r(n, t, Er(i), s)
                        }
                    }

                    function Yi(t) {
                        return Sa(function(e, n) {
                            var i = -1,
                                r = n.length,
                                s = r > 1 ? n[r - 1] : K,
                                a = r > 2 ? n[2] : K;
                            for (s = "function" == typeof s ? (r--, s) : K, a && Lr(n[0], n[1], a) && (s = 3 > r ? K : s, r = 1), e = Object(e); ++i < r;) {
                                var o = n[i];
                                o && t(e, o, i, s)
                            }
                            return e
                        })
                    }

                    function Ji(t, e) {
                        return function(n, i) {
                            if (null == n) return n;
                            if (!Ba(n)) return t(n, i);
                            for (var r = n.length, s = e ? r : -1, a = Object(n);
                                (e ? s-- : ++s < r) && i(a[s], s, a) !== !1;);
                            return n
                        }
                    }

                    function Ki(t) {
                        return function(e, n, i) {
                            for (var r = -1, s = Object(e), a = i(e), o = a.length; o--;) {
                                var h = a[t ? o : ++r];
                                if (n(s[h], h, s) === !1) break
                            }
                            return e
                        }
                    }

                    function tr(t, e, n) {
                        function i() {
                            var e = this && this !== Bn && this instanceof i ? s : t;
                            return e.apply(r ? n : this, arguments)
                        }
                        var r = e & st,
                            s = ir(t);
                        return i
                    }

                    function er(t) {
                        return function(e) {
                            e = Po(e);
                            var n = yn.test(e) ? Z(e) : K,
                                i = n ? n[0] : e.charAt(0),
                                r = n ? n.slice(1).join("") : e.slice(1);
                            return i[t]() + r
                        }
                    }

                    function nr(t) {
                        return function(e) {
                            return v(Ph(hh(e)), t, "")
                        }
                    }

                    function ir(t) {
                        return function() {
                            var e = arguments;
                            switch (e.length) {
                                case 0:
                                    return new t;
                                case 1:
                                    return new t(e[0]);
                                case 2:
                                    return new t(e[0], e[1]);
                                case 3:
                                    return new t(e[0], e[1], e[2]);
                                case 4:
                                    return new t(e[0], e[1], e[2], e[3]);
                                case 5:
                                    return new t(e[0], e[1], e[2], e[3], e[4]);
                                case 6:
                                    return new t(e[0], e[1], e[2], e[3], e[4], e[5]);
                                case 7:
                                    return new t(e[0], e[1], e[2], e[3], e[4], e[5], e[6])
                            }
                            var n = Ln(t.prototype),
                                i = t.apply(n, e);
                            return Ka(i) ? i : n
                        }
                    }

                    function rr(t, e, n) {
                        function i() {
                            for (var a = arguments.length, o = Array(a), h = a, l = xr(i); h--;) o[h] = arguments[h];
                            var p = 3 > a && o[0] !== l && o[a - 1] !== l ? [] : $(o, l);
                            if (a -= p.length, n > a) return cr(t, e, ar, i.placeholder, K, o, p, K, K, n - a);
                            var u = this && this !== Bn && this instanceof i ? r : t;
                            return s(u, this, o)
                        }
                        var r = ir(t);
                        return i
                    }

                    function sr(t) {
                        return Sa(function(e) {
                            e = Wn(e, 1);
                            var n = e.length,
                                i = n,
                                r = L.prototype.thru;
                            for (t && e.reverse(); i--;) {
                                var s = e[i];
                                if ("function" != typeof s) throw new il(nt);
                                if (r && !a && "wrapper" == wr(s)) var a = new L([], !0)
                            }
                            for (i = a ? i : n; ++i < n;) {
                                s = e[i];
                                var o = wr(s),
                                    h = "wrapper" == o ? sp(s) : K;
                                a = h && jr(h[0]) && h[1] == (ct | ht | pt | ft) && !h[4].length && 1 == h[9] ? a[wr(h[0])].apply(a, h[3]) : 1 == s.length && jr(s) ? a[o]() : a.thru(s)
                            }
                            return function() {
                                var t = arguments,
                                    i = t[0];
                                if (a && 1 == t.length && Wp(i) && i.length >= et) return a.plant(i).value();
                                for (var r = 0, s = n ? e[r].apply(this, t) : i; ++r < n;) s = e[r].call(this, s);
                                return s
                            }
                        })
                    }

                    function ar(t, e, n, i, r, s, a, o, h, l) {
                        function p() {
                            for (var g = arguments.length, y = g, b = Array(g); y--;) b[y] = arguments[y];
                            if (m) var w = xr(p),
                                E = j(b, w);
                            if (i && (b = qi(b, i, r, m)), s && (b = Gi(b, s, a, m)), g -= E, m && l > g) {
                                var C = $(b, w);
                                return cr(t, e, ar, p.placeholder, n, b, C, o, h, l - g)
                            }
                            var _ = c ? n : this,
                                x = f ? _[t] : t;
                            return g = b.length, o ? b = qr(b, o) : d && g > 1 && b.reverse(), u && g > h && (b.length = h), this && this !== Bn && this instanceof p && (x = v || ir(x)), x.apply(_, b)
                        }
                        var u = e & ct,
                            c = e & st,
                            f = e & at,
                            m = e & (ht | lt),
                            d = e & mt,
                            v = f ? K : ir(t);
                        return p
                    }

                    function or(t, e) {
                        return function(n, i) {
                            return Kn(n, t, e(i), {})
                        }
                    }

                    function hr(t) {
                        return Sa(function(e) {
                            return e = m(Wn(e, 1), Er()), Sa(function(n) {
                                var i = this;
                                return t(e, function(t) {
                                    return s(t, i, n)
                                })
                            })
                        })
                    }

                    function lr(t, e) {
                        e = e === K ? " " : e + "";
                        var n = e.length;
                        if (2 > n) return n ? Ei(e, t) : e;
                        var i = Ei(e, Sl(t / X(e)));
                        return yn.test(e) ? Z(i).slice(0, t).join("") : i.slice(0, t)
                    }

                    function pr(t, e, n, i) {
                        function r() {
                            for (var e = -1, h = arguments.length, l = -1, p = i.length, u = Array(p + h), c = this && this !== Bn && this instanceof r ? o : t; ++l < p;) u[l] = i[l];
                            for (; h--;) u[l++] = arguments[++e];
                            return s(c, a ? n : this, u)
                        }
                        var a = e & st,
                            o = ir(t);
                        return r
                    }

                    function ur(t) {
                        return function(e, n, i) {
                            return i && "number" != typeof i && Lr(e, n, i) && (n = i = K), e = So(e), e = e === e ? e : 0, n === K ? (n = e, e = 0) : n = So(n) || 0, i = i === K ? n > e ? 1 : -1 : So(i) || 0, wi(e, n, i, t)
                        }
                    }

                    function cr(t, e, n, i, r, s, a, o, h, l) {
                        var p = e & ht,
                            u = o ? Ui(o) : K,
                            c = p ? a : K,
                            f = p ? K : a,
                            m = p ? s : K,
                            d = p ? K : s;
                        e |= p ? pt : ut, e &= ~(p ? ut : pt), e & ot || (e &= ~(st | at));
                        var v = [t, e, r, m, c, d, f, u, h, l],
                            g = n.apply(K, v);
                        return jr(t) && hp(g, v), g.placeholder = i, g
                    }

                    function fr(t) {
                        var e = el[t];
                        return function(t, n) {
                            if (t = So(t), n = _o(n)) {
                                var i = (Po(t) + "e").split("e"),
                                    r = e(i[0] + "e" + (+i[1] + n));
                                return i = (Po(r) + "e").split("e"), +(i[0] + "e" + (+i[1] - n))
                            }
                            return e(t)
                        }
                    }

                    function mr(t, e, n, i, r, s, a, o) {
                        var h = e & at;
                        if (!h && "function" != typeof t) throw new il(nt);
                        var l = i ? i.length : 0;
                        if (l || (e &= ~(pt | ut), i = r = K), a = a === K ? a : Dl(_o(a), 0), o = o === K ? o : _o(o), l -= r ? r.length : 0, e & ut) {
                            var p = i,
                                u = r;
                            i = r = K
                        }
                        var c = h ? K : sp(t),
                            f = [t, e, n, i, r, p, u, s, a, o];
                        if (c && Rr(f, c), t = f[0], e = f[1], n = f[2], i = f[3], r = f[4], o = f[9] = null == f[9] ? h ? 0 : t.length : Dl(f[9] - l, 0), !o && e & (ht | lt) && (e &= ~(ht | lt)), e && e != st) m = e == ht || e == lt ? rr(t, e, o) : e != pt && e != (st | pt) || r.length ? ar.apply(K, f) : pr(t, e, n, i);
                        else var m = tr(t, e, n);
                        var d = c ? ip : hp;
                        return d(m, f)
                    }

                    function dr(t, e, n, i, r, s) {
                        var a = -1,
                            o = r & vt,
                            h = r & dt,
                            l = t.length,
                            p = e.length;
                        if (l != p && !(o && p > l)) return !1;
                        var u = s.get(t);
                        if (u) return u == e;
                        var c = !0;
                        for (s.set(t, e); ++a < l;) {
                            var f = t[a],
                                m = e[a];
                            if (i) var d = o ? i(m, f, a, e, t, s) : i(f, m, a, t, e, s);
                            if (d !== K) {
                                if (d) continue;
                                c = !1;
                                break
                            }
                            if (h) {
                                if (!y(e, function(t) {
                                        return f === t || n(f, t, i, r, s)
                                    })) {
                                    c = !1;
                                    break
                                }
                            } else if (f !== m && !n(f, m, i, r, s)) {
                                c = !1;
                                break
                            }
                        }
                        return s["delete"](t), c
                    }

                    function vr(t, e, n, i, r, s, a) {
                        switch (n) {
                            case Xt:
                                if (t.byteLength != e.byteLength || t.byteOffset != e.byteOffset) return !1;
                                t = t.buffer, e = e.buffer;
                            case Qt:
                                return t.byteLength == e.byteLength && i(new vl(t), new vl(e)) ? !0 : !1;
                            case Ft:
                            case Lt:
                                return +t == +e;
                            case Ot:
                                return t.name == e.name && t.message == e.message;
                            case Nt:
                                return t != +t ? e != +e : t == +e;
                            case Ht:
                            case qt:
                                return t == e + "";
                            case Vt:
                                var o = U;
                            case Wt:
                                var h = s & vt;
                                if (o || (o = Q), t.size != e.size && !h) return !1;
                                var l = a.get(t);
                                return l ? l == e : (s |= dt, a.set(t, e), dr(o(t), o(e), i, r, s, a));
                            case Gt:
                                if (Yl) return Yl.call(t) == Yl.call(e)
                        }
                        return !1
                    }

                    function gr(t, e, n, i, r, s) {
                        var a = r & vt,
                            o = Ro(t),
                            h = o.length,
                            l = Ro(e),
                            p = l.length;
                        if (h != p && !a) return !1;
                        for (var u = h; u--;) {
                            var c = o[u];
                            if (!(a ? c in e : Xn(e, c))) return !1
                        }
                        var f = s.get(t);
                        if (f) return f == e;
                        var m = !0;
                        s.set(t, e);
                        for (var d = a; ++u < h;) {
                            c = o[u];
                            var v = t[c],
                                g = e[c];
                            if (i) var y = a ? i(g, v, c, e, t, s) : i(v, g, c, t, e, s);
                            if (!(y === K ? v === g || n(v, g, i, r, s) : y)) {
                                m = !1;
                                break
                            }
                            d || (d = "constructor" == c)
                        }
                        if (m && !d) {
                            var b = t.constructor,
                                w = e.constructor;
                            b != w && "constructor" in t && "constructor" in e && !("function" == typeof b && b instanceof b && "function" == typeof w && w instanceof w) && (m = !1)
                        }
                        return s["delete"](t), m
                    }

                    function yr(t) {
                        return Qn(t, Ro, Ar)
                    }

                    function br(t) {
                        return Qn(t, Ho, op)
                    }

                    function wr(t) {
                        for (var e = t.name + "", n = ql[e], i = ol.call(ql, e) ? n.length : 0; i--;) {
                            var r = n[i],
                                s = r.func;
                            if (null == s || s == t) return r.name
                        }
                        return e
                    }

                    function Er() {
                        var t = e.iteratee || Fh;
                        return t = t === Fh ? ri : t, arguments.length ? t(arguments[0], arguments[1]) : t
                    }

                    function Cr(t) {
                        for (var e = Zo(t), n = e.length; n--;) e[n][2] = Nr(e[n][1]);
                        return e
                    }

                    function _r(t, e) {
                        var n = t[e];
                        return so(n) ? n : K
                    }

                    function xr(t) {
                        var n = ol.call(e, "placeholder") ? e : t;
                        return n.placeholder
                    }

                    function Sr(t) {
                        return kl(Object(t))
                    }

                    function Ar(t) {
                        return bl(Object(t))
                    }

                    function kr(t) {
                        return pl.call(t)
                    }

                    function Pr(t, e, n) {
                        for (var i = -1, r = n.length; ++i < r;) {
                            var s = n[i],
                                a = s.size;
                            switch (s.type) {
                                case "drop":
                                    t += a;
                                    break;
                                case "dropRight":
                                    e -= a;
                                    break;
                                case "take":
                                    e = Il(e, t + a);
                                    break;
                                case "takeRight":
                                    t = Dl(t, e - a)
                            }
                        }
                        return {
                            start: t,
                            end: e
                        }
                    }

                    function Tr(t, e, n) {
                        e = Or(e, t) ? [e] : Pn(e);
                        for (var i, r = -1, s = e.length; ++r < s;) {
                            var a = e[r];
                            if (!(i = null != t && n(t, a))) break;
                            t = t[a]
                        }
                        if (i) return i;
                        var s = t ? t.length : 0;
                        return !!s && Ja(s) && q(a, s) && (Wp(t) || fo(t) || Va(t))
                    }

                    function Mr(t) {
                        var e = t.length,
                            n = t.constructor(e);
                        return e && "string" == typeof t[0] && ol.call(t, "index") && (n.index = t.index, n.input = t.input), n
                    }

                    function Dr(t) {
                        return "function" != typeof t.constructor || Vr(t) ? {} : Ln(Sr(t))
                    }

                    function Ir(t, e, n, i) {
                        var r = t.constructor;
                        switch (e) {
                            case Qt:
                                return ji(t);
                            case Ft:
                            case Lt:
                                return new r(+t);
                            case Xt:
                                return Vi(t, i);
                            case Zt:
                            case Yt:
                            case Jt:
                            case Kt:
                            case te:
                            case ee:
                            case ne:
                            case ie:
                            case re:
                                return Wi(t, i);
                            case Vt:
                                return Ni(t, i, n);
                            case Nt:
                            case qt:
                                return new r(t);
                            case Ht:
                                return Bi(t);
                            case Wt:
                                return Ri(t, i, n);
                            case Gt:
                                return Hi(t)
                        }
                    }

                    function Fr(t) {
                        var e = t ? t.length : K;
                        return Ja(e) && (Wp(t) || fo(t) || Va(t)) ? P(e, String) : null
                    }

                    function Lr(t, e, n) {
                        if (!Ka(n)) return !1;
                        var i = typeof e;
                        return ("number" == i ? Ba(n) && q(e, n.length) : "string" == i && e in n) ? Oa(n[e], t) : !1
                    }

                    function Or(t, e) {
                        var n = typeof t;
                        return "number" == n || "symbol" == n ? !0 : !Wp(t) && (mo(t) || ve.test(t) || !de.test(t) || null != e && t in Object(e))
                    }

                    function zr(t) {
                        var e = typeof t;
                        return "number" == e || "boolean" == e || "string" == e && "__proto__" != t || null == t
                    }

                    function jr(t) {
                        var n = wr(t),
                            i = e[n];
                        if ("function" != typeof i || !(n in De.prototype)) return !1;
                        if (t === i) return !0;
                        var r = sp(i);
                        return !!r && t === r[0]
                    }

                    function Vr(t) {
                        var e = t && t.constructor,
                            n = "function" == typeof e && e.prototype || sl;
                        return t === n
                    }

                    function Nr(t) {
                        return t === t && !Ka(t)
                    }

                    function Br(t, e) {
                        return function(n) {
                            return null == n ? !1 : n[t] === e && (e !== K || t in Object(n))
                        }
                    }

                    function Rr(t, e) {
                        var n = t[1],
                            i = e[1],
                            r = n | i,
                            s = (st | at | ct) > r,
                            a = i == ct && n == ht || i == ct && n == ft && t[7].length <= e[8] || i == (ct | ft) && e[7].length <= e[8] && n == ht;
                        if (!s && !a) return t;
                        i & st && (t[2] = e[2], r |= n & st ? 0 : ot);
                        var o = e[3];
                        if (o) {
                            var h = t[3];
                            t[3] = h ? qi(h, o, e[4]) : Ui(o), t[4] = h ? $(t[3], rt) : Ui(e[4])
                        }
                        return o = e[5], o && (h = t[5], t[5] = h ? Gi(h, o, e[6]) : Ui(o), t[6] = h ? $(t[5], rt) : Ui(e[6])), o = e[7], o && (t[7] = Ui(o)), i & ct && (t[8] = null == t[8] ? e[8] : Il(t[8], e[8])), null == t[9] && (t[9] = e[9]), t[0] = e[0], t[1] = r, t
                    }

                    function Hr(t, e, n, i, r, s) {
                        return Ka(t) && Ka(e) && pi(t, e, K, Hr, s.set(e, t)), t
                    }

                    function Wr(t, e) {
                        return 1 == e.length ? t : $n(t, _i(e, 0, -1))
                    }

                    function qr(t, e) {
                        for (var n = t.length, i = Il(e.length, n), r = Ui(t); i--;) {
                            var s = e[i];
                            t[i] = q(s, n) ? r[s] : K
                        }
                        return t
                    }

                    function Gr(t) {
                        if (Za(t)) try {
                            return al.call(t)
                        } catch (e) {}
                        return Po(t)
                    }

                    function Ur(t) {
                        if (t instanceof De) return t.clone();
                        var e = new L(t.__wrapped__, t.__chain__);
                        return e.__actions__ = Ui(t.__actions__), e.__index__ = t.__index__, e.__values__ = t.__values__, e
                    }

                    function $r(t, e, n) {
                        e = (n ? Lr(t, e, n) : e === K) ? 1 : Dl(_o(e), 0);
                        var i = t ? t.length : 0;
                        if (!i || 1 > e) return [];
                        for (var r = 0, s = 0, a = Array(Sl(i / e)); i > r;) a[s++] = _i(t, r, r += e);
                        return a
                    }

                    function Qr(t) {
                        for (var e = -1, n = t ? t.length : 0, i = 0, r = []; ++e < n;) {
                            var s = t[e];
                            s && (r[i++] = s)
                        }
                        return r
                    }

                    function Xr() {
                        var t = arguments.length,
                            e = Ma(arguments[0]);
                        if (2 > t) return t ? Ui(e) : [];
                        for (var n = Array(t - 1); t--;) n[t - 1] = arguments[t];
                        return o(e, Wn(n, 1))
                    }

                    function Zr(t, e, n) {
                        var i = t ? t.length : 0;
                        return i ? (e = n || e === K ? 1 : _o(e), _i(t, 0 > e ? 0 : e, i)) : []
                    }

                    function Yr(t, e, n) {
                        var i = t ? t.length : 0;
                        return i ? (e = n || e === K ? 1 : _o(e), e = i - e, _i(t, 0, 0 > e ? 0 : e)) : []
                    }

                    function Jr(t, e) {
                        return t && t.length ? Ii(t, Er(e, 3), !0, !0) : []
                    }

                    function Kr(t, e) {
                        return t && t.length ? Ii(t, Er(e, 3), !0) : []
                    }

                    function ts(t, e, n, i) {
                        var r = t ? t.length : 0;
                        return r ? (n && "number" != typeof n && Lr(t, e, n) && (n = 0, i = r), Nn(t, e, n, i)) : []
                    }

                    function es(t, e) {
                        return t && t.length ? E(t, Er(e, 3)) : -1
                    }

                    function ns(t, e) {
                        return t && t.length ? E(t, Er(e, 3), !0) : -1
                    }

                    function is(t) {
                        var e = t ? t.length : 0;
                        return e ? Wn(t, 1) : []
                    }

                    function rs(t) {
                        var e = t ? t.length : 0;
                        return e ? Wn(t, xt) : []
                    }

                    function ss(t, e) {
                        var n = t ? t.length : 0;
                        return n ? (e = e === K ? 1 : _o(e), Wn(t, e)) : []
                    }

                    function as(t) {
                        for (var e = -1, n = t ? t.length : 0, i = {}; ++e < n;) {
                            var r = t[e];
                            i[r[0]] = r[1]
                        }
                        return i
                    }

                    function os(t) {
                        return t ? t[0] : K
                    }

                    function hs(t, e, n) {
                        var i = t ? t.length : 0;
                        return i ? (n = _o(n), 0 > n && (n = Dl(i + n, 0)), C(t, e, n)) : -1
                    }

                    function ls(t) {
                        return Yr(t, 1)
                    }

                    function ps(t, e) {
                        return t ? Tl.call(t, e) : ""
                    }

                    function us(t) {
                        var e = t ? t.length : 0;
                        return e ? t[e - 1] : K
                    }

                    function cs(t, e, n) {
                        var i = t ? t.length : 0;
                        if (!i) return -1;
                        var r = i;
                        if (n !== K && (r = _o(n), r = (0 > r ? Dl(i + r, 0) : Il(r, i - 1)) + 1), e !== e) return H(t, r, !0);
                        for (; r--;)
                            if (t[r] === e) return r;
                        return -1
                    }

                    function fs(t, e) {
                        return t && t.length && e && e.length ? gi(t, e) : t
                    }

                    function ms(t, e, n) {
                        return t && t.length && e && e.length ? gi(t, e, Er(n)) : t
                    }

                    function ds(t, e, n) {
                        return t && t.length && e && e.length ? gi(t, e, K, n) : t
                    }

                    function vs(t, e) {
                        var n = [];
                        if (!t || !t.length) return n;
                        var i = -1,
                            r = [],
                            s = t.length;
                        for (e = Er(e, 3); ++i < s;) {
                            var a = t[i];
                            e(a, i, t) && (n.push(a), r.push(i))
                        }
                        return yi(t, r), n
                    }

                    function gs(t) {
                        return t ? Ol.call(t) : t
                    }

                    function ys(t, e, n) {
                        var i = t ? t.length : 0;
                        return i ? (n && "number" != typeof n && Lr(t, e, n) ? (e = 0, n = i) : (e = null == e ? 0 : _o(e), n = n === K ? i : _o(n)), _i(t, e, n)) : []
                    }

                    function bs(t, e) {
                        return Si(t, e)
                    }

                    function ws(t, e, n) {
                        return Ai(t, e, Er(n))
                    }

                    function Es(t, e) {
                        var n = t ? t.length : 0;
                        if (n) {
                            var i = Si(t, e);
                            if (n > i && Oa(t[i], e)) return i
                        }
                        return -1
                    }

                    function Cs(t, e) {
                        return Si(t, e, !0)
                    }

                    function _s(t, e, n) {
                        return Ai(t, e, Er(n), !0)
                    }

                    function xs(t, e) {
                        var n = t ? t.length : 0;
                        if (n) {
                            var i = Si(t, e, !0) - 1;
                            if (Oa(t[i], e)) return i
                        }
                        return -1
                    }

                    function Ss(t) {
                        return t && t.length ? ki(t) : []
                    }

                    function As(t, e) {
                        return t && t.length ? Pi(t, Er(e)) : []
                    }

                    function ks(t) {
                        return Zr(t, 1)
                    }

                    function Ps(t, e, n) {
                        return t && t.length ? (e = n || e === K ? 1 : _o(e), _i(t, 0, 0 > e ? 0 : e)) : []
                    }

                    function Ts(t, e, n) {
                        var i = t ? t.length : 0;
                        return i ? (e = n || e === K ? 1 : _o(e), e = i - e, _i(t, 0 > e ? 0 : e, i)) : []
                    }

                    function Ms(t, e) {
                        return t && t.length ? Ii(t, Er(e, 3), !1, !0) : []
                    }

                    function Ds(t, e) {
                        return t && t.length ? Ii(t, Er(e, 3)) : []
                    }

                    function Is(t) {
                        return t && t.length ? Ti(t) : []
                    }

                    function Fs(t, e) {
                        return t && t.length ? Ti(t, Er(e)) : []
                    }

                    function Ls(t, e) {
                        return t && t.length ? Ti(t, K, e) : []
                    }

                    function Os(t) {
                        if (!t || !t.length) return [];
                        var e = 0;
                        return t = u(t, function(t) {
                            return Ra(t) ? (e = Dl(t.length, e), !0) : void 0
                        }), P(e, function(e) {
                            return m(t, di(e))
                        })
                    }

                    function zs(t, e) {
                        if (!t || !t.length) return [];
                        var n = Os(t);
                        return null == e ? n : m(n, function(t) {
                            return s(e, K, t)
                        })
                    }

                    function js(t, e) {
                        return Oi(t || [], e || [], cn)
                    }

                    function Vs(t, e) {
                        return Oi(t || [], e || [], Ci)
                    }

                    function Ns(t) {
                        var n = e(t);
                        return n.__chain__ = !0, n
                    }

                    function Bs(t, e) {
                        return e(t), t
                    }

                    function Rs(t, e) {
                        return e(t)
                    }

                    function Hs() {
                        return Ns(this)
                    }

                    function Ws() {
                        return new L(this.value(), this.__chain__)
                    }

                    function qs() {
                        this.__values__ === K && (this.__values__ = Co(this.value()));
                        var t = this.__index__ >= this.__values__.length,
                            e = t ? K : this.__values__[this.__index__++];
                        return {
                            done: t,
                            value: e
                        }
                    }

                    function Gs() {
                        return this
                    }

                    function Us(t) {
                        for (var e, i = this; i instanceof n;) {
                            var r = Ur(i);
                            r.__index__ = 0, r.__values__ = K, e ? s.__wrapped__ = r : e = r;
                            var s = r;
                            i = i.__wrapped__
                        }
                        return s.__wrapped__ = t, e
                    }

                    function $s() {
                        var t = this.__wrapped__;
                        if (t instanceof De) {
                            var e = t;
                            return this.__actions__.length && (e = new De(this)), e = e.reverse(), e.__actions__.push({
                                func: Rs,
                                args: [gs],
                                thisArg: K
                            }), new L(e, this.__chain__)
                        }
                        return this.thru(gs)
                    }

                    function Qs() {
                        return Fi(this.__wrapped__, this.__actions__)
                    }

                    function Xs(t, e, n) {
                        var i = Wp(t) ? p : Vn;
                        return n && Lr(t, e, n) && (e = K), i(t, Er(e, 3))
                    }

                    function Zs(t, e) {
                        var n = Wp(t) ? u : Hn;
                        return n(t, Er(e, 3))
                    }

                    function Ys(t, e) {
                        if (e = Er(e, 3), Wp(t)) {
                            var n = E(t, e);
                            return n > -1 ? t[n] : K
                        }
                        return w(t, e, Kl)
                    }

                    function Js(t, e) {
                        if (e = Er(e, 3), Wp(t)) {
                            var n = E(t, e, !0);
                            return n > -1 ? t[n] : K
                        }
                        return w(t, e, tp)
                    }

                    function Ks(t, e) {
                        return Wn(sa(t, e), 1)
                    }

                    function ta(t, e) {
                        return Wn(sa(t, e), xt)
                    }

                    function ea(t, e, n) {
                        return n = n === K ? 1 : _o(n), Wn(sa(t, e), n)
                    }

                    function na(t, e) {
                        return "function" == typeof e && Wp(t) ? h(t, e) : Kl(t, Er(e))
                    }

                    function ia(t, e) {
                        return "function" == typeof e && Wp(t) ? l(t, e) : tp(t, Er(e))
                    }

                    function ra(t, e, n, i) {
                        t = Ba(t) ? t : nh(t), n = n && !i ? _o(n) : 0;
                        var r = t.length;
                        return 0 > n && (n = Dl(r + n, 0)), fo(t) ? r >= n && t.indexOf(e, n) > -1 : !!r && C(t, e, n) > -1
                    }

                    function sa(t, e) {
                        var n = Wp(t) ? m : oi;
                        return n(t, Er(e, 3))
                    }

                    function aa(t, e, n, i) {
                        return null == t ? [] : (Wp(e) || (e = null == e ? [] : [e]), n = i ? K : n, Wp(n) || (n = null == n ? [] : [n]), ci(t, e, n))
                    }

                    function oa(t, e, n) {
                        var i = Wp(t) ? v : S,
                            r = arguments.length < 3;
                        return i(t, Er(e, 4), n, r, Kl)
                    }

                    function ha(t, e, n) {
                        var i = Wp(t) ? g : S,
                            r = arguments.length < 3;
                        return i(t, Er(e, 4), n, r, tp)
                    }

                    function la(t, e) {
                        var n = Wp(t) ? u : Hn;
                        return e = Er(e, 3), n(t, function(t, n, i) {
                            return !e(t, n, i)
                        })
                    }

                    function pa(t) {
                        var e = Ba(t) ? t : nh(t),
                            n = e.length;
                        return n > 0 ? e[bi(0, n - 1)] : K
                    }

                    function ua(t, e, n) {
                        var i = -1,
                            r = Co(t),
                            s = r.length,
                            a = s - 1;
                        for (e = (n ? Lr(t, e, n) : e === K) ? 1 : Tn(_o(e), 0, s); ++i < e;) {
                            var o = bi(i, a),
                                h = r[o];
                            r[o] = r[i], r[i] = h
                        }
                        return r.length = e, r
                    }

                    function ca(t) {
                        return ua(t, Pt)
                    }

                    function fa(t) {
                        if (null == t) return 0;
                        if (Ba(t)) {
                            var e = t.length;
                            return e && fo(t) ? X(t) : e
                        }
                        if (to(t)) {
                            var n = kr(t);
                            if (n == Vt || n == Wt) return t.size
                        }
                        return Ro(t).length
                    }

                    function ma(t, e, n) {
                        var i = Wp(t) ? y : xi;
                        return n && Lr(t, e, n) && (e = K), i(t, Er(e, 3))
                    }

                    function da(t, e) {
                        if ("function" != typeof e) throw new il(nt);
                        return t = _o(t),
                            function() {
                                return --t < 1 ? e.apply(this, arguments) : void 0
                            }
                    }

                    function va(t, e, n) {
                        return e = n ? K : e, e = t && null == e ? t.length : e, mr(t, ct, K, K, K, K, e)
                    }

                    function ga(t, e) {
                        var n;
                        if ("function" != typeof e) throw new il(nt);
                        return t = _o(t),
                            function() {
                                return --t > 0 && (n = e.apply(this, arguments)), 1 >= t && (e = K), n
                            }
                    }

                    function ya(t, e, n) {
                        e = n ? K : e;
                        var i = mr(t, ht, K, K, K, K, K, e);
                        return i.placeholder = ya.placeholder, i
                    }

                    function ba(t, e, n) {
                        e = n ? K : e;
                        var i = mr(t, lt, K, K, K, K, K, e);
                        return i.placeholder = ba.placeholder, i
                    }

                    function wa(t, e, n) {
                        function i(e) {
                            var n = c,
                                i = f;
                            return c = f = K, g = e, m = t.apply(i, n)
                        }

                        function r(t) {
                            return g = t, d = _l(o, e), y ? i(t) : m
                        }

                        function s(t) {
                            var n = t - v,
                                i = t - g,
                                r = e - n;
                            return b === !1 ? r : Il(r, b - i)
                        }

                        function a(t) {
                            var n = t - v,
                                i = t - g;
                            return !v || n >= e || 0 > n || b !== !1 && i >= b
                        }

                        function o() {
                            var t = Lp();
                            return a(t) ? h(t) : void(d = _l(o, s(t)))
                        }

                        function h(t) {
                            return gl(d), d = K, w && c ? i(t) : (c = f = K, m)
                        }

                        function l() {
                            d !== K && gl(d), v = g = 0, c = f = d = K
                        }

                        function p() {
                            return d === K ? m : h(Lp())
                        }

                        function u() {
                            var t = Lp(),
                                n = a(t);
                            return c = arguments, f = this, v = t, n ? d === K ? r(v) : (gl(d), d = _l(o, e), i(v)) : m
                        }
                        var c, f, m, d, v = 0,
                            g = 0,
                            y = !1,
                            b = !1,
                            w = !0;
                        if ("function" != typeof t) throw new il(nt);
                        return e = So(e) || 0, Ka(n) && (y = !!n.leading, b = "maxWait" in n && Dl(So(n.maxWait) || 0, e), w = "trailing" in n ? !!n.trailing : w), u.cancel = l, u.flush = p, u
                    }

                    function Ea(t) {
                        return mr(t, mt)
                    }

                    function Ca(t, e) {
                        if ("function" != typeof t || e && "function" != typeof e) throw new il(nt);
                        var n = function() {
                            var i = arguments,
                                r = e ? e.apply(this, i) : i[0],
                                s = n.cache;
                            if (s.has(r)) return s.get(r);
                            var a = t.apply(this, i);
                            return n.cache = s.set(r, a), a
                        };
                        return n.cache = new(Ca.Cache || We), n
                    }

                    function _a(t) {
                        if ("function" != typeof t) throw new il(nt);
                        return function() {
                            return !t.apply(this, arguments)
                        }
                    }

                    function xa(t) {
                        return ga(2, t)
                    }

                    function Sa(t, e) {
                        if ("function" != typeof t) throw new il(nt);
                        return e = Dl(e === K ? t.length - 1 : _o(e), 0),
                            function() {
                                for (var n = arguments, i = -1, r = Dl(n.length - e, 0), a = Array(r); ++i < r;) a[i] = n[e + i];
                                switch (e) {
                                    case 0:
                                        return t.call(this, a);
                                    case 1:
                                        return t.call(this, n[0], a);
                                    case 2:
                                        return t.call(this, n[0], n[1], a)
                                }
                                var o = Array(e + 1);
                                for (i = -1; ++i < e;) o[i] = n[i];
                                return o[e] = a, s(t, this, o)
                            }
                    }

                    function Aa(t, e) {
                        if ("function" != typeof t) throw new il(nt);
                        return e = e === K ? 0 : Dl(_o(e), 0), Sa(function(n) {
                            var i = n[e],
                                r = n.slice(0, e);
                            return i && d(r, i), s(t, this, r)
                        })
                    }

                    function ka(t, e, n) {
                        var i = !0,
                            r = !0;
                        if ("function" != typeof t) throw new il(nt);
                        return Ka(n) && (i = "leading" in n ? !!n.leading : i, r = "trailing" in n ? !!n.trailing : r), wa(t, e, {
                            leading: i,
                            maxWait: e,
                            trailing: r
                        })
                    }

                    function Pa(t) {
                        return va(t, 1)
                    }

                    function Ta(t, e) {
                        return e = null == e ? Ih : e, Bp(e, t)
                    }

                    function Ma() {
                        if (!arguments.length) return [];
                        var t = arguments[0];
                        return Wp(t) ? t : [t]
                    }

                    function Da(t) {
                        return Mn(t, !1, !0)
                    }

                    function Ia(t, e) {
                        return Mn(t, !1, !0, e)
                    }

                    function Fa(t) {
                        return Mn(t, !0, !0)
                    }

                    function La(t, e) {
                        return Mn(t, !0, !0, e)
                    }

                    function Oa(t, e) {
                        return t === e || t !== t && e !== e
                    }

                    function za(t, e) {
                        return t > e
                    }

                    function ja(t, e) {
                        return t >= e
                    }

                    function Va(t) {
                        return Ra(t) && ol.call(t, "callee") && (!Cl.call(t, "callee") || pl.call(t) == Dt)
                    }

                    function Na(t) {
                        return to(t) && pl.call(t) == Qt
                    }

                    function Ba(t) {
                        return null != t && Ja(ap(t)) && !Za(t)
                    }

                    function Ra(t) {
                        return to(t) && Ba(t)
                    }

                    function Ha(t) {
                        return t === !0 || t === !1 || to(t) && pl.call(t) == Ft
                    }

                    function Wa(t) {
                        return to(t) && pl.call(t) == Lt
                    }

                    function qa(t) {
                        return !!t && 1 === t.nodeType && to(t) && !lo(t)
                    }

                    function Ga(t) {
                        if (Ba(t) && (Wp(t) || fo(t) || Za(t.splice) || Va(t) || qp(t))) return !t.length;
                        if (to(t)) {
                            var e = kr(t);
                            if (e == Vt || e == Wt) return !t.size
                        }
                        for (var n in t)
                            if (ol.call(t, n)) return !1;
                        return !(Wl && Ro(t).length)
                    }

                    function Ua(t, e) {
                        return ei(t, e)
                    }

                    function $a(t, e, n) {
                        n = "function" == typeof n ? n : K;
                        var i = n ? n(t, e) : K;
                        return i === K ? ei(t, e, n) : !!i
                    }

                    function Qa(t) {
                        return to(t) ? pl.call(t) == Ot || "string" == typeof t.message && "string" == typeof t.name : !1
                    }

                    function Xa(t) {
                        return "number" == typeof t && Pl(t)
                    }

                    function Za(t) {
                        var e = Ka(t) ? pl.call(t) : "";
                        return e == zt || e == jt
                    }

                    function Ya(t) {
                        return "number" == typeof t && t == _o(t)
                    }

                    function Ja(t) {
                        return "number" == typeof t && t > -1 && t % 1 == 0 && St >= t
                    }

                    function Ka(t) {
                        var e = typeof t;
                        return !!t && ("object" == e || "function" == e)
                    }

                    function to(t) {
                        return !!t && "object" == typeof t
                    }

                    function eo(t) {
                        return to(t) && kr(t) == Vt
                    }

                    function no(t, e) {
                        return t === e || ii(t, e, Cr(e))
                    }

                    function io(t, e, n) {
                        return n = "function" == typeof n ? n : K, ii(t, e, Cr(e), n)
                    }

                    function ro(t) {
                        return ho(t) && t != +t
                    }

                    function so(t) {
                        if (!Ka(t)) return !1;
                        var e = Za(t) || W(t) ? cl : Te;
                        return e.test(Gr(t))
                    }

                    function ao(t) {
                        return null === t
                    }

                    function oo(t) {
                        return null == t
                    }

                    function ho(t) {
                        return "number" == typeof t || to(t) && pl.call(t) == Nt
                    }

                    function lo(t) {
                        if (!to(t) || pl.call(t) != Bt || W(t)) return !1;
                        var e = Sr(t);
                        if (null === e) return !0;
                        var n = ol.call(e, "constructor") && e.constructor;
                        return "function" == typeof n && n instanceof n && al.call(n) == ll
                    }

                    function po(t) {
                        return Ka(t) && pl.call(t) == Ht
                    }

                    function uo(t) {
                        return Ya(t) && t >= -St && St >= t
                    }

                    function co(t) {
                        return to(t) && kr(t) == Wt
                    }

                    function fo(t) {
                        return "string" == typeof t || !Wp(t) && to(t) && pl.call(t) == qt
                    }

                    function mo(t) {
                        return "symbol" == typeof t || to(t) && pl.call(t) == Gt
                    }

                    function vo(t) {
                        return to(t) && Ja(t.length) && !!xn[pl.call(t)]
                    }

                    function go(t) {
                        return t === K
                    }

                    function yo(t) {
                        return to(t) && kr(t) == Ut
                    }

                    function bo(t) {
                        return to(t) && pl.call(t) == $t
                    }

                    function wo(t, e) {
                        return e > t
                    }

                    function Eo(t, e) {
                        return e >= t
                    }

                    function Co(t) {
                        if (!t) return [];
                        if (Ba(t)) return fo(t) ? Z(t) : Ui(t);
                        if (wl && t[wl]) return G(t[wl]());
                        var e = kr(t),
                            n = e == Vt ? U : e == Wt ? Q : nh;
                        return n(t)
                    }

                    function _o(t) {
                        if (!t) return 0 === t ? t : 0;
                        if (t = So(t), t === xt || t === -xt) {
                            var e = 0 > t ? -1 : 1;
                            return e * At
                        }
                        var n = t % 1;
                        return t === t ? n ? t - n : t : 0
                    }

                    function xo(t) {
                        return t ? Tn(_o(t), 0, Pt) : 0
                    }

                    function So(t) {
                        if ("number" == typeof t) return t;
                        if (mo(t)) return kt;
                        if (Ka(t)) {
                            var e = Za(t.valueOf) ? t.valueOf() : t;
                            t = Ka(e) ? e + "" : e
                        }
                        if ("string" != typeof t) return 0 === t ? t : +t;
                        t = t.replace(we, "");
                        var n = Pe.test(t);
                        return n || Me.test(t) ? In(t.slice(2), n ? 2 : 8) : ke.test(t) ? kt : +t
                    }

                    function Ao(t) {
                        return $i(t, Ho(t))
                    }

                    function ko(t) {
                        return Tn(_o(t), -St, St)
                    }

                    function Po(t) {
                        if ("string" == typeof t) return t;
                        if (null == t) return "";
                        if (mo(t)) return Jl ? Jl.call(t) : "";
                        var e = t + "";
                        return "0" == e && 1 / t == -xt ? "-0" : e
                    }

                    function To(t, e) {
                        var n = Ln(t);
                        return e ? mn(n, e) : n
                    }

                    function Mo(t, e) {
                        return w(t, Er(e, 3), qn, !0)
                    }

                    function Do(t, e) {
                        return w(t, Er(e, 3), Gn, !0)
                    }

                    function Io(t, e) {
                        return null == t ? t : ep(t, Er(e), Ho)
                    }

                    function Fo(t, e) {
                        return null == t ? t : np(t, Er(e), Ho)
                    }

                    function Lo(t, e) {
                        return t && qn(t, Er(e))
                    }

                    function Oo(t, e) {
                        return t && Gn(t, Er(e))
                    }

                    function zo(t) {
                        return null == t ? [] : Un(t, Ro(t))
                    }

                    function jo(t) {
                        return null == t ? [] : Un(t, Ho(t))
                    }

                    function Vo(t, e, n) {
                        var i = null == t ? K : $n(t, e);
                        return i === K ? n : i
                    }

                    function No(t, e) {
                        return null != t && Tr(t, e, Xn)
                    }

                    function Bo(t, e) {
                        return null != t && Tr(t, e, Zn)
                    }

                    function Ro(t) {
                        var e = Vr(t);
                        if (!e && !Ba(t)) return si(t);
                        var n = Fr(t),
                            i = !!n,
                            r = n || [],
                            s = r.length;
                        for (var a in t) !Xn(t, a) || i && ("length" == a || q(a, s)) || e && "constructor" == a || r.push(a);
                        return r
                    }

                    function Ho(t) {
                        for (var e = -1, n = Vr(t), i = ai(t), r = i.length, s = Fr(t), a = !!s, o = s || [], h = o.length; ++e < r;) {
                            var l = i[e];
                            a && ("length" == l || q(l, h)) || "constructor" == l && (n || !ol.call(t, l)) || o.push(l)
                        }
                        return o
                    }

                    function Wo(t, e) {
                        var n = {};
                        return e = Er(e, 3), qn(t, function(t, i, r) {
                            n[e(t, i, r)] = t
                        }), n
                    }

                    function qo(t, e) {
                        var n = {};
                        return e = Er(e, 3), qn(t, function(t, i, r) {
                            n[i] = e(t, i, r)
                        }), n
                    }

                    function Go(t, e) {
                        return e = Er(e), mi(t, function(t, n) {
                            return !e(t, n)
                        })
                    }

                    function Uo(t, e) {
                        return null == t ? {} : mi(t, Er(e))
                    }

                    function $o(t, e, n) {
                        e = Or(e, t) ? [e] : Pn(e);
                        var i = -1,
                            r = e.length;
                        for (r || (t = K, r = 1); ++i < r;) {
                            var s = null == t ? K : t[e[i]];
                            s === K && (i = r, s = n), t = Za(s) ? s.call(t) : s
                        }
                        return t
                    }

                    function Qo(t, e, n) {
                        return null == t ? t : Ci(t, e, n)
                    }

                    function Xo(t, e, n, i) {
                        return i = "function" == typeof i ? i : K, null == t ? t : Ci(t, e, n, i)
                    }

                    function Zo(t) {
                        return T(t, Ro(t))
                    }

                    function Yo(t) {
                        return T(t, Ho(t))
                    }

                    function Jo(t, e, n) {
                        var i = Wp(t) || vo(t);
                        if (e = Er(e, 4), null == n)
                            if (i || Ka(t)) {
                                var r = t.constructor;
                                n = i ? Wp(t) ? new r : [] : Za(r) ? Ln(Sr(t)) : {}
                            } else n = {};
                        return (i ? h : qn)(t, function(t, i, r) {
                            return e(n, t, i, r)
                        }), n
                    }

                    function Ko(t, e) {
                        return null == t ? !0 : Mi(t, e)
                    }

                    function th(t, e, n) {
                        return null == t ? t : Di(t, e, An(n))
                    }

                    function eh(t, e, n, i) {
                        return i = "function" == typeof i ? i : K, null == t ? t : Di(t, e, An(n), i)
                    }

                    function nh(t) {
                        return t ? D(t, Ro(t)) : []
                    }

                    function ih(t) {
                        return null == t ? [] : D(t, Ho(t))
                    }

                    function rh(t, e, n) {
                        return n === K && (n = e, e = K), n !== K && (n = So(n), n = n === n ? n : 0), e !== K && (e = So(e), e = e === e ? e : 0), Tn(So(t), e, n)
                    }

                    function sh(t, e, n) {
                        return e = So(e) || 0, n === K ? (n = e, e = 0) : n = So(n) || 0, t = So(t), Yn(t, e, n)
                    }

                    function ah(t, e, n) {
                        if (n && "boolean" != typeof n && Lr(t, e, n) && (e = n = K), n === K && ("boolean" == typeof e ? (n = e, e = K) : "boolean" == typeof t && (n = t, t = K)), t === K && e === K ? (t = 0, e = 1) : (t = So(t) || 0, e === K ? (e = t, t = 0) : e = So(e) || 0), t > e) {
                            var i = t;
                            t = e, e = i
                        }
                        if (n || t % 1 || e % 1) {
                            var r = Ll();
                            return Il(t + r * (e - t + Dn("1e-" + ((r + "").length - 1))), e)
                        }
                        return bi(t, e)
                    }

                    function oh(t) {
                        return cu(Po(t).toLowerCase())
                    }

                    function hh(t) {
                        return t = Po(t), t && t.replace(Ie, N).replace(vn, "")
                    }

                    function lh(t, e, n) {
                        t = Po(t), e = "string" == typeof e ? e : e + "";
                        var i = t.length;
                        return n = n === K ? i : Tn(_o(n), 0, i), n -= e.length, n >= 0 && t.indexOf(e, n) == n
                    }

                    function ph(t) {
                        return t = Po(t), t && ue.test(t) ? t.replace(le, B) : t
                    }

                    function uh(t) {
                        return t = Po(t), t && be.test(t) ? t.replace(ye, "\\$&") : t
                    }

                    function ch(t, e, n) {
                        t = Po(t), e = _o(e);
                        var i = e ? X(t) : 0;
                        if (!e || i >= e) return t;
                        var r = (e - i) / 2;
                        return lr(Al(r), n) + t + lr(Sl(r), n)
                    }

                    function fh(t, e, n) {
                        t = Po(t), e = _o(e);
                        var i = e ? X(t) : 0;
                        return e && e > i ? t + lr(e - i, n) : t
                    }

                    function mh(t, e, n) {
                        t = Po(t), e = _o(e);
                        var i = e ? X(t) : 0;
                        return e && e > i ? lr(e - i, n) + t : t
                    }

                    function dh(t, e, n) {
                        return n || null == e ? e = 0 : e && (e = +e), t = Po(t).replace(we, ""), Fl(t, e || (Ae.test(t) ? 16 : 10))
                    }

                    function vh(t, e, n) {
                        return e = (n ? Lr(t, e, n) : e === K) ? 1 : _o(e), Ei(Po(t), e)
                    }

                    function gh() {
                        var t = arguments,
                            e = Po(t[0]);
                        return t.length < 3 ? e : e.replace(t[1], t[2])
                    }

                    function yh(t, e, n) {
                        return Po(t).split(e, n)
                    }

                    function bh(t, e, n) {
                        return t = Po(t), n = Tn(_o(n), 0, t.length), t.lastIndexOf(e, n) == n
                    }

                    function wh(t, n, i) {
                        var r = e.templateSettings;
                        i && Lr(t, n, i) && (n = K), t = Po(t), n = $p({}, n, r, pn);
                        var s, a, o = $p({}, n.imports, r.imports, pn),
                            h = Ro(o),
                            l = D(o, h),
                            p = 0,
                            u = n.interpolate || Fe,
                            c = "__p += '",
                            f = nl((n.escape || Fe).source + "|" + u.source + "|" + (u === me ? xe : Fe).source + "|" + (n.evaluate || Fe).source + "|$", "g"),
                            m = "//# sourceURL=" + ("sourceURL" in n ? n.sourceURL : "lodash.templateSources[" + ++_n + "]") + "\n";
                        t.replace(f, function(e, n, i, r, o, h) {
                            return i || (i = r), c += t.slice(p, h).replace(Le, R), n && (s = !0, c += "' +\n__e(" + n + ") +\n'"), o && (a = !0, c += "';\n" + o + ";\n__p += '"), i && (c += "' +\n((__t = (" + i + ")) == null ? '' : __t) +\n'"), p = h + e.length, e
                        }), c += "';\n";
                        var d = n.variable;
                        d || (c = "with (obj) {\n" + c + "\n}\n"), c = (a ? c.replace(se, "") : c).replace(ae, "$1").replace(oe, "$1;"), c = "function(" + (d || "obj") + ") {\n" + (d ? "" : "obj || (obj = {});\n") + "var __t, __p = ''" + (s ? ", __e = _.escape" : "") + (a ? ", __j = Array.prototype.join;\nfunction print() { __p += __j.call(arguments, '') }\n" : ";\n") + c + "return __p\n}";
                        var v = fu(function() {
                            return Function(h, m + "return " + c).apply(K, l)
                        });
                        if (v.source = c, Qa(v)) throw v;
                        return v
                    }

                    function Eh(t) {
                        return Po(t).toLowerCase()
                    }

                    function Ch(t) {
                        return Po(t).toUpperCase()
                    }

                    function _h(t, e, n) {
                        if (t = Po(t), !t) return t;
                        if (n || e === K) return t.replace(we, "");
                        if (e += "", !e) return t;
                        var i = Z(t),
                            r = Z(e);
                        return i.slice(I(i, r), F(i, r) + 1).join("")
                    }

                    function xh(t, e, n) {
                        if (t = Po(t), !t) return t;
                        if (n || e === K) return t.replace(Ce, "");
                        if (e += "", !e) return t;
                        var i = Z(t);
                        return i.slice(0, F(i, Z(e)) + 1).join("")
                    }

                    function Sh(t, e, n) {
                        if (t = Po(t), !t) return t;
                        if (n || e === K) return t.replace(Ee, "");
                        if (e += "", !e) return t;
                        var i = Z(t);
                        return i.slice(I(i, Z(e))).join("")
                    }

                    function Ah(t, e) {
                        var n = gt,
                            i = yt;
                        if (Ka(e)) {
                            var r = "separator" in e ? e.separator : r;
                            n = "length" in e ? _o(e.length) : n, i = "omission" in e ? Po(e.omission) : i
                        }
                        t = Po(t);
                        var s = t.length;
                        if (yn.test(t)) {
                            var a = Z(t);
                            s = a.length
                        }
                        if (n >= s) return t;
                        var o = n - X(i);
                        if (1 > o) return i;
                        var h = a ? a.slice(0, o).join("") : t.slice(0, o);
                        if (r === K) return h + i;
                        if (a && (o += h.length - o), po(r)) {
                            if (t.slice(o).search(r)) {
                                var l, p = h;
                                for (r.global || (r = nl(r.source, Po(Se.exec(r)) + "g")), r.lastIndex = 0; l = r.exec(p);) var u = l.index;
                                h = h.slice(0, u === K ? o : u)
                            }
                        } else if (t.indexOf(r, o) != o) {
                            var c = h.lastIndexOf(r);
                            c > -1 && (h = h.slice(0, c))
                        }
                        return h + i
                    }

                    function kh(t) {
                        return t = Po(t), t && pe.test(t) ? t.replace(he, Y) : t
                    }

                    function Ph(t, e, n) {
                        return t = Po(t), e = n ? K : e, e === K && (e = En.test(t) ? wn : bn), t.match(e) || []
                    }

                    function Th(t) {
                        var e = t ? t.length : 0,
                            n = Er();
                        return t = e ? m(t, function(t) {
                            if ("function" != typeof t[1]) throw new il(nt);
                            return [n(t[0]), t[1]]
                        }) : [], Sa(function(n) {
                            for (var i = -1; ++i < e;) {
                                var r = t[i];
                                if (s(r[0], this, n)) return s(r[1], this, n)
                            }
                        })
                    }

                    function Mh(t) {
                        return Fn(Mn(t, !0))
                    }

                    function Dh(t) {
                        return function() {
                            return t
                        }
                    }

                    function Ih(t) {
                        return t
                    }

                    function Fh(t) {
                        return ri("function" == typeof t ? t : Mn(t, !0))
                    }

                    function Lh(t) {
                        return hi(Mn(t, !0))
                    }

                    function Oh(t, e) {
                        return li(t, Mn(e, !0))
                    }

                    function zh(t, e, n) {
                        var i = Ro(e),
                            r = Un(e, i);
                        null != n || Ka(e) && (r.length || !i.length) || (n = e, e = t, t = this, r = Un(e, Ro(e)));
                        var s = Ka(n) && "chain" in n ? n.chain : !0,
                            a = Za(t);
                        return h(r, function(n) {
                            var i = e[n];
                            t[n] = i, a && (t.prototype[n] = function() {
                                var e = this.__chain__;
                                if (s || e) {
                                    var n = t(this.__wrapped__),
                                        r = n.__actions__ = Ui(this.__actions__);
                                    return r.push({
                                        func: i,
                                        args: arguments,
                                        thisArg: t
                                    }), n.__chain__ = e, n
                                }
                                return i.apply(t, d([this.value()], arguments))
                            })
                        }), t
                    }

                    function jh() {
                        return Bn._ === this && (Bn._ = ul), this
                    }

                    function Vh() {}

                    function Nh(t) {
                        return t = _o(t),
                            function() {
                                return arguments[t]
                            }
                    }

                    function Bh(t) {
                        return Or(t) ? di(t) : vi(t)
                    }

                    function Rh(t) {
                        return function(e) {
                            return null == t ? K : $n(t, e)
                        }
                    }

                    function Hh(t, e) {
                        if (t = _o(t), 1 > t || t > St) return [];
                        var n = Pt,
                            i = Il(t, Pt);
                        e = Er(e), t -= Pt;
                        for (var r = P(i, e); ++n < t;) e(n);
                        return r
                    }

                    function Wh(t) {
                        return Wp(t) ? m(t, kn) : mo(t) ? [t] : Ui(lp(t))
                    }

                    function qh(t) {
                        var e = ++hl;
                        return Po(t) + e
                    }

                    function Gh(t) {
                        return t && t.length ? b(t, Ih, za) : K
                    }

                    function Uh(t, e) {
                        return t && t.length ? b(t, Er(e), za) : K
                    }

                    function $h(t) {
                        return x(t, Ih)
                    }

                    function Qh(t, e) {
                        return x(t, Er(e))
                    }

                    function Xh(t) {
                        return t && t.length ? b(t, Ih, wo) : K
                    }

                    function Zh(t, e) {
                        return t && t.length ? b(t, Er(e), wo) : K
                    }

                    function Yh(t) {
                        return t && t.length ? k(t, Ih) : 0
                    }

                    function Jh(t, e) {
                        return t && t.length ? k(t, Er(e)) : 0
                    }
                    t = t ? Rn.defaults({}, t, Rn.pick(Bn, Cn)) : Bn;
                    var Kh = t.Date,
                        tl = t.Error,
                        el = t.Math,
                        nl = t.RegExp,
                        il = t.TypeError,
                        rl = t.Array.prototype,
                        sl = t.Object.prototype,
                        al = t.Function.prototype.toString,
                        ol = sl.hasOwnProperty,
                        hl = 0,
                        ll = al.call(Object),
                        pl = sl.toString,
                        ul = Bn._,
                        cl = nl("^" + al.call(ol).replace(ye, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"),
                        fl = On ? t.Buffer : K,
                        ml = t.Reflect,
                        dl = t.Symbol,
                        vl = t.Uint8Array,
                        gl = t.clearTimeout,
                        yl = ml ? ml.enumerate : K,
                        bl = Object.getOwnPropertySymbols,
                        wl = "symbol" == typeof(wl = dl && dl.iterator) ? wl : K,
                        El = Object.create,
                        Cl = sl.propertyIsEnumerable,
                        _l = t.setTimeout,
                        xl = rl.splice,
                        Sl = el.ceil,
                        Al = el.floor,
                        kl = Object.getPrototypeOf,
                        Pl = t.isFinite,
                        Tl = rl.join,
                        Ml = Object.keys,
                        Dl = el.max,
                        Il = el.min,
                        Fl = t.parseInt,
                        Ll = el.random,
                        Ol = rl.reverse,
                        zl = _r(t, "DataView"),
                        jl = _r(t, "Map"),
                        Vl = _r(t, "Promise"),
                        Nl = _r(t, "Set"),
                        Bl = _r(t, "WeakMap"),
                        Rl = _r(Object, "create"),
                        Hl = Bl && new Bl,
                        Wl = !Cl.call({
                            valueOf: 1
                        }, "valueOf"),
                        ql = {},
                        Gl = Gr(zl),
                        Ul = Gr(jl),
                        $l = Gr(Vl),
                        Ql = Gr(Nl),
                        Xl = Gr(Bl),
                        Zl = dl ? dl.prototype : K,
                        Yl = Zl ? Zl.valueOf : K,
                        Jl = Zl ? Zl.toString : K;
                    e.templateSettings = {
                        escape: ce,
                        evaluate: fe,
                        interpolate: me,
                        variable: "",
                        imports: {
                            _: e
                        }
                    }, e.prototype = n.prototype, e.prototype.constructor = e, L.prototype = Ln(n.prototype), L.prototype.constructor = L, De.prototype = Ln(n.prototype), De.prototype.constructor = De, Ve.prototype = Rl ? Rl(null) : sl, We.prototype.clear = qe, We.prototype["delete"] = Ge, We.prototype.get = Ue, We.prototype.has = $e, We.prototype.set = Qe, Xe.prototype.push = Ye, Je.prototype.clear = Ke, Je.prototype["delete"] = tn, Je.prototype.get = en, Je.prototype.has = nn, Je.prototype.set = rn;
                    var Kl = Ji(qn),
                        tp = Ji(Gn, !0),
                        ep = Ki(),
                        np = Ki(!0);
                    yl && !Cl.call({
                        valueOf: 1
                    }, "valueOf") && (ai = function(t) {
                        return G(yl(t))
                    });
                    var ip = Hl ? function(t, e) {
                            return Hl.set(t, e), t
                        } : Ih,
                        rp = Nl && 2 === new Nl([1, 2]).size ? function(t) {
                            return new Nl(t)
                        } : Vh,
                        sp = Hl ? function(t) {
                            return Hl.get(t)
                        } : Vh,
                        ap = di("length");
                    bl || (Ar = function() {
                        return []
                    });
                    var op = bl ? function(t) {
                        for (var e = []; t;) d(e, Ar(t)), t = Sr(t);
                        return e
                    } : Ar;
                    (zl && kr(new zl(new ArrayBuffer(1))) != Xt || jl && kr(new jl) != Vt || Vl && kr(Vl.resolve()) != Rt || Nl && kr(new Nl) != Wt || Bl && kr(new Bl) != Ut) && (kr = function(t) {
                        var e = pl.call(t),
                            n = e == Bt ? t.constructor : null,
                            i = Gr(n);
                        if (i) switch (i) {
                            case Gl:
                                return Xt;
                            case Ul:
                                return Vt;
                            case $l:
                                return Rt;
                            case Ql:
                                return Wt;
                            case Xl:
                                return Ut
                        }
                        return e
                    });
                    var hp = function() {
                            var t = 0,
                                e = 0;
                            return function(n, i) {
                                var r = Lp(),
                                    s = wt - (r - e);
                                if (e = r, s > 0) {
                                    if (++t >= bt) return n
                                } else t = 0;
                                return ip(n, i)
                            }
                        }(),
                        lp = Ca(function(t) {
                            var e = [];
                            return Po(t).replace(ge, function(t, n, i, r) {
                                e.push(i ? r.replace(_e, "$1") : n || t)
                            }), e
                        }),
                        pp = Sa(function(t, e) {
                            return Ra(t) ? jn(t, Wn(e, 1, !0)) : []
                        }),
                        up = Sa(function(t, e) {
                            var n = us(e);
                            return Ra(n) && (n = K), Ra(t) ? jn(t, Wn(e, 1, !0), Er(n)) : []
                        }),
                        cp = Sa(function(t, e) {
                            var n = us(e);
                            return Ra(n) && (n = K), Ra(t) ? jn(t, Wn(e, 1, !0), K, n) : []
                        }),
                        fp = Sa(function(t) {
                            var e = m(t, gn);
                            return e.length && e[0] === t[0] ? Jn(e) : []
                        }),
                        mp = Sa(function(t) {
                            var e = us(t),
                                n = m(t, gn);
                            return e === us(n) ? e = K : n.pop(), n.length && n[0] === t[0] ? Jn(n, Er(e)) : []
                        }),
                        dp = Sa(function(t) {
                            var e = us(t),
                                n = m(t, gn);
                            return e === us(n) ? e = K : n.pop(), n.length && n[0] === t[0] ? Jn(n, K, e) : []
                        }),
                        vp = Sa(fs),
                        gp = Sa(function(t, e) {
                            e = m(Wn(e, 1), String);
                            var n = dn(t, e);
                            return yi(t, e.sort(O)), n
                        }),
                        yp = Sa(function(t) {
                            return Ti(Wn(t, 1, !0))
                        }),
                        bp = Sa(function(t) {
                            var e = us(t);
                            return Ra(e) && (e = K), Ti(Wn(t, 1, !0), Er(e))
                        }),
                        wp = Sa(function(t) {
                            var e = us(t);
                            return Ra(e) && (e = K), Ti(Wn(t, 1, !0), K, e)
                        }),
                        Ep = Sa(function(t, e) {
                            return Ra(t) ? jn(t, e) : []
                        }),
                        Cp = Sa(function(t) {
                            return Li(u(t, Ra))
                        }),
                        _p = Sa(function(t) {
                            var e = us(t);
                            return Ra(e) && (e = K), Li(u(t, Ra), Er(e))
                        }),
                        xp = Sa(function(t) {
                            var e = us(t);
                            return Ra(e) && (e = K), Li(u(t, Ra), K, e)
                        }),
                        Sp = Sa(Os),
                        Ap = Sa(function(t) {
                            var e = t.length,
                                n = e > 1 ? t[e - 1] : K;
                            return n = "function" == typeof n ? (t.pop(), n) : K, zs(t, n)
                        }),
                        kp = Sa(function(t) {
                            t = Wn(t, 1);
                            var e = t.length,
                                n = e ? t[0] : 0,
                                i = this.__wrapped__,
                                r = function(e) {
                                    return dn(e, t)
                                };
                            return !(e > 1 || this.__actions__.length) && i instanceof De && q(n) ? (i = i.slice(n, +n + (e ? 1 : 0)), i.__actions__.push({
                                func: Rs,
                                args: [r],
                                thisArg: K
                            }), new L(i, this.__chain__).thru(function(t) {
                                return e && !t.length && t.push(K), t
                            })) : this.thru(r)
                        }),
                        Pp = Zi(function(t, e, n) {
                            ol.call(t, n) ? ++t[n] : t[n] = 1
                        }),
                        Tp = Zi(function(t, e, n) {
                            ol.call(t, n) ? t[n].push(e) : t[n] = [e]
                        }),
                        Mp = Sa(function(t, e, n) {
                            var i = -1,
                                r = "function" == typeof e,
                                a = Or(e),
                                o = Ba(t) ? Array(t.length) : [];
                            return Kl(t, function(t) {
                                var h = r ? e : a && null != t ? t[e] : K;
                                o[++i] = h ? s(h, t, n) : ti(t, e, n)
                            }), o
                        }),
                        Dp = Zi(function(t, e, n) {
                            t[n] = e
                        }),
                        Ip = Zi(function(t, e, n) {
                            t[n ? 0 : 1].push(e)
                        }, function() {
                            return [
                                [],
                                []
                            ];
                        }),
                        Fp = Sa(function(t, e) {
                            if (null == t) return [];
                            var n = e.length;
                            return n > 1 && Lr(t, e[0], e[1]) ? e = [] : n > 2 && Lr(e[0], e[1], e[2]) && (e.length = 1), ci(t, Wn(e, 1), [])
                        }),
                        Lp = Kh.now,
                        Op = Sa(function(t, e, n) {
                            var i = st;
                            if (n.length) {
                                var r = $(n, xr(Op));
                                i |= pt
                            }
                            return mr(t, i, e, n, r)
                        }),
                        zp = Sa(function(t, e, n) {
                            var i = st | at;
                            if (n.length) {
                                var r = $(n, xr(zp));
                                i |= pt
                            }
                            return mr(e, i, t, n, r)
                        }),
                        jp = Sa(function(t, e) {
                            return zn(t, 1, e)
                        }),
                        Vp = Sa(function(t, e, n) {
                            return zn(t, So(e) || 0, n)
                        });
                    Ca.Cache = We;
                    var Np = Sa(function(t, e) {
                            e = m(Wn(e, 1), Er());
                            var n = e.length;
                            return Sa(function(i) {
                                for (var r = -1, a = Il(i.length, n); ++r < a;) i[r] = e[r].call(this, i[r]);
                                return s(t, this, i)
                            })
                        }),
                        Bp = Sa(function(t, e) {
                            var n = $(e, xr(Bp));
                            return mr(t, pt, K, e, n)
                        }),
                        Rp = Sa(function(t, e) {
                            var n = $(e, xr(Rp));
                            return mr(t, ut, K, e, n)
                        }),
                        Hp = Sa(function(t, e) {
                            return mr(t, ft, K, K, K, Wn(e, 1))
                        }),
                        Wp = Array.isArray,
                        qp = fl ? function(t) {
                            return t instanceof fl
                        } : Dh(!1),
                        Gp = Yi(function(t, e) {
                            if (Wl || Vr(e) || Ba(e)) return void $i(e, Ro(e), t);
                            for (var n in e) ol.call(e, n) && cn(t, n, e[n])
                        }),
                        Up = Yi(function(t, e) {
                            if (Wl || Vr(e) || Ba(e)) return void $i(e, Ho(e), t);
                            for (var n in e) cn(t, n, e[n])
                        }),
                        $p = Yi(function(t, e, n, i) {
                            Qi(e, Ho(e), t, i)
                        }),
                        Qp = Yi(function(t, e, n, i) {
                            Qi(e, Ro(e), t, i)
                        }),
                        Xp = Sa(function(t, e) {
                            return dn(t, Wn(e, 1))
                        }),
                        Zp = Sa(function(t) {
                            return t.push(K, pn), s($p, K, t)
                        }),
                        Yp = Sa(function(t) {
                            return t.push(K, Hr), s(nu, K, t)
                        }),
                        Jp = or(function(t, e, n) {
                            t[e] = n
                        }, Dh(Ih)),
                        Kp = or(function(t, e, n) {
                            ol.call(t, e) ? t[e].push(n) : t[e] = [n]
                        }, Er),
                        tu = Sa(ti),
                        eu = Yi(function(t, e, n) {
                            pi(t, e, n)
                        }),
                        nu = Yi(function(t, e, n, i) {
                            pi(t, e, n, i)
                        }),
                        iu = Sa(function(t, e) {
                            return null == t ? {} : (e = m(Wn(e, 1), kn), fi(t, jn(br(t), e)))
                        }),
                        ru = Sa(function(t, e) {
                            return null == t ? {} : fi(t, Wn(e, 1))
                        }),
                        su = nr(function(t, e, n) {
                            return e = e.toLowerCase(), t + (n ? oh(e) : e)
                        }),
                        au = nr(function(t, e, n) {
                            return t + (n ? "-" : "") + e.toLowerCase()
                        }),
                        ou = nr(function(t, e, n) {
                            return t + (n ? " " : "") + e.toLowerCase()
                        }),
                        hu = er("toLowerCase"),
                        lu = nr(function(t, e, n) {
                            return t + (n ? "_" : "") + e.toLowerCase()
                        }),
                        pu = nr(function(t, e, n) {
                            return t + (n ? " " : "") + cu(e)
                        }),
                        uu = nr(function(t, e, n) {
                            return t + (n ? " " : "") + e.toUpperCase()
                        }),
                        cu = er("toUpperCase"),
                        fu = Sa(function(t, e) {
                            try {
                                return s(t, K, e)
                            } catch (n) {
                                return Qa(n) ? n : new tl(n)
                            }
                        }),
                        mu = Sa(function(t, e) {
                            return h(Wn(e, 1), function(e) {
                                t[e] = Op(t[e], t)
                            }), t
                        }),
                        du = sr(),
                        vu = sr(!0),
                        gu = Sa(function(t, e) {
                            return function(n) {
                                return ti(n, t, e)
                            }
                        }),
                        yu = Sa(function(t, e) {
                            return function(n) {
                                return ti(t, n, e)
                            }
                        }),
                        bu = hr(m),
                        wu = hr(p),
                        Eu = hr(y),
                        Cu = ur(),
                        _u = ur(!0),
                        xu = V(function(t, e) {
                            return t + e
                        }),
                        Su = fr("ceil"),
                        Au = V(function(t, e) {
                            return t / e
                        }),
                        ku = fr("floor"),
                        Pu = V(function(t, e) {
                            return t * e
                        }),
                        Tu = fr("round"),
                        Mu = V(function(t, e) {
                            return t - e
                        });
                    return e.after = da, e.ary = va, e.assign = Gp, e.assignIn = Up, e.assignInWith = $p, e.assignWith = Qp, e.at = Xp, e.before = ga, e.bind = Op, e.bindAll = mu, e.bindKey = zp, e.castArray = Ma, e.chain = Ns, e.chunk = $r, e.compact = Qr, e.concat = Xr, e.cond = Th, e.conforms = Mh, e.constant = Dh, e.countBy = Pp, e.create = To, e.curry = ya, e.curryRight = ba, e.debounce = wa, e.defaults = Zp, e.defaultsDeep = Yp, e.defer = jp, e.delay = Vp, e.difference = pp, e.differenceBy = up, e.differenceWith = cp, e.drop = Zr, e.dropRight = Yr, e.dropRightWhile = Jr, e.dropWhile = Kr, e.fill = ts, e.filter = Zs, e.flatMap = Ks, e.flatMapDeep = ta, e.flatMapDepth = ea, e.flatten = is, e.flattenDeep = rs, e.flattenDepth = ss, e.flip = Ea, e.flow = du, e.flowRight = vu, e.fromPairs = as, e.functions = zo, e.functionsIn = jo, e.groupBy = Tp, e.initial = ls, e.intersection = fp, e.intersectionBy = mp, e.intersectionWith = dp, e.invert = Jp, e.invertBy = Kp, e.invokeMap = Mp, e.iteratee = Fh, e.keyBy = Dp, e.keys = Ro, e.keysIn = Ho, e.map = sa, e.mapKeys = Wo, e.mapValues = qo, e.matches = Lh, e.matchesProperty = Oh, e.memoize = Ca, e.merge = eu, e.mergeWith = nu, e.method = gu, e.methodOf = yu, e.mixin = zh, e.negate = _a, e.nthArg = Nh, e.omit = iu, e.omitBy = Go, e.once = xa, e.orderBy = aa, e.over = bu, e.overArgs = Np, e.overEvery = wu, e.overSome = Eu, e.partial = Bp, e.partialRight = Rp, e.partition = Ip, e.pick = ru, e.pickBy = Uo, e.property = Bh, e.propertyOf = Rh, e.pull = vp, e.pullAll = fs, e.pullAllBy = ms, e.pullAllWith = ds, e.pullAt = gp, e.range = Cu, e.rangeRight = _u, e.rearg = Hp, e.reject = la, e.remove = vs, e.rest = Sa, e.reverse = gs, e.sampleSize = ua, e.set = Qo, e.setWith = Xo, e.shuffle = ca, e.slice = ys, e.sortBy = Fp, e.sortedUniq = Ss, e.sortedUniqBy = As, e.split = yh, e.spread = Aa, e.tail = ks, e.take = Ps, e.takeRight = Ts, e.takeRightWhile = Ms, e.takeWhile = Ds, e.tap = Bs, e.throttle = ka, e.thru = Rs, e.toArray = Co, e.toPairs = Zo, e.toPairsIn = Yo, e.toPath = Wh, e.toPlainObject = Ao, e.transform = Jo, e.unary = Pa, e.union = yp, e.unionBy = bp, e.unionWith = wp, e.uniq = Is, e.uniqBy = Fs, e.uniqWith = Ls, e.unset = Ko, e.unzip = Os, e.unzipWith = zs, e.update = th, e.updateWith = eh, e.values = nh, e.valuesIn = ih, e.without = Ep, e.words = Ph, e.wrap = Ta, e.xor = Cp, e.xorBy = _p, e.xorWith = xp, e.zip = Sp, e.zipObject = js, e.zipObjectDeep = Vs, e.zipWith = Ap, e.entries = Zo, e.entriesIn = Yo, e.extend = Up, e.extendWith = $p, zh(e, e), e.add = xu, e.attempt = fu, e.camelCase = su, e.capitalize = oh, e.ceil = Su, e.clamp = rh, e.clone = Da, e.cloneDeep = Fa, e.cloneDeepWith = La, e.cloneWith = Ia, e.deburr = hh, e.divide = Au, e.endsWith = lh, e.eq = Oa, e.escape = ph, e.escapeRegExp = uh, e.every = Xs, e.find = Ys, e.findIndex = es, e.findKey = Mo, e.findLast = Js, e.findLastIndex = ns, e.findLastKey = Do, e.floor = ku, e.forEach = na, e.forEachRight = ia, e.forIn = Io, e.forInRight = Fo, e.forOwn = Lo, e.forOwnRight = Oo, e.get = Vo, e.gt = za, e.gte = ja, e.has = No, e.hasIn = Bo, e.head = os, e.identity = Ih, e.includes = ra, e.indexOf = hs, e.inRange = sh, e.invoke = tu, e.isArguments = Va, e.isArray = Wp, e.isArrayBuffer = Na, e.isArrayLike = Ba, e.isArrayLikeObject = Ra, e.isBoolean = Ha, e.isBuffer = qp, e.isDate = Wa, e.isElement = qa, e.isEmpty = Ga, e.isEqual = Ua, e.isEqualWith = $a, e.isError = Qa, e.isFinite = Xa, e.isFunction = Za, e.isInteger = Ya, e.isLength = Ja, e.isMap = eo, e.isMatch = no, e.isMatchWith = io, e.isNaN = ro, e.isNative = so, e.isNil = oo, e.isNull = ao, e.isNumber = ho, e.isObject = Ka, e.isObjectLike = to, e.isPlainObject = lo, e.isRegExp = po, e.isSafeInteger = uo, e.isSet = co, e.isString = fo, e.isSymbol = mo, e.isTypedArray = vo, e.isUndefined = go, e.isWeakMap = yo, e.isWeakSet = bo, e.join = ps, e.kebabCase = au, e.last = us, e.lastIndexOf = cs, e.lowerCase = ou, e.lowerFirst = hu, e.lt = wo, e.lte = Eo, e.max = Gh, e.maxBy = Uh, e.mean = $h, e.meanBy = Qh, e.min = Xh, e.minBy = Zh, e.multiply = Pu, e.noConflict = jh, e.noop = Vh, e.now = Lp, e.pad = ch, e.padEnd = fh, e.padStart = mh, e.parseInt = dh, e.random = ah, e.reduce = oa, e.reduceRight = ha, e.repeat = vh, e.replace = gh, e.result = $o, e.round = Tu, e.runInContext = J, e.sample = pa, e.size = fa, e.snakeCase = lu, e.some = ma, e.sortedIndex = bs, e.sortedIndexBy = ws, e.sortedIndexOf = Es, e.sortedLastIndex = Cs, e.sortedLastIndexBy = _s, e.sortedLastIndexOf = xs, e.startCase = pu, e.startsWith = bh, e.subtract = Mu, e.sum = Yh, e.sumBy = Jh, e.template = wh, e.times = Hh, e.toInteger = _o, e.toLength = xo, e.toLower = Eh, e.toNumber = So, e.toSafeInteger = ko, e.toString = Po, e.toUpper = Ch, e.trim = _h, e.trimEnd = xh, e.trimStart = Sh, e.truncate = Ah, e.unescape = kh, e.uniqueId = qh, e.upperCase = uu, e.upperFirst = cu, e.each = na, e.eachRight = ia, e.first = os, zh(e, function() {
                        var t = {};
                        return qn(e, function(n, i) {
                            ol.call(e.prototype, i) || (t[i] = n)
                        }), t
                    }(), {
                        chain: !1
                    }), e.VERSION = tt, h(["bind", "bindKey", "curry", "curryRight", "partial", "partialRight"], function(t) {
                        e[t].placeholder = e
                    }), h(["drop", "take"], function(t, e) {
                        De.prototype[t] = function(n) {
                            var i = this.__filtered__;
                            if (i && !e) return new De(this);
                            n = n === K ? 1 : Dl(_o(n), 0);
                            var r = this.clone();
                            return i ? r.__takeCount__ = Il(n, r.__takeCount__) : r.__views__.push({
                                size: Il(n, Pt),
                                type: t + (r.__dir__ < 0 ? "Right" : "")
                            }), r
                        }, De.prototype[t + "Right"] = function(e) {
                            return this.reverse()[t](e).reverse()
                        }
                    }), h(["filter", "map", "takeWhile"], function(t, e) {
                        var n = e + 1,
                            i = n == Et || n == _t;
                        De.prototype[t] = function(t) {
                            var e = this.clone();
                            return e.__iteratees__.push({
                                iteratee: Er(t, 3),
                                type: n
                            }), e.__filtered__ = e.__filtered__ || i, e
                        }
                    }), h(["head", "last"], function(t, e) {
                        var n = "take" + (e ? "Right" : "");
                        De.prototype[t] = function() {
                            return this[n](1).value()[0]
                        }
                    }), h(["initial", "tail"], function(t, e) {
                        var n = "drop" + (e ? "" : "Right");
                        De.prototype[t] = function() {
                            return this.__filtered__ ? new De(this) : this[n](1)
                        }
                    }), De.prototype.compact = function() {
                        return this.filter(Ih)
                    }, De.prototype.find = function(t) {
                        return this.filter(t).head()
                    }, De.prototype.findLast = function(t) {
                        return this.reverse().find(t)
                    }, De.prototype.invokeMap = Sa(function(t, e) {
                        return "function" == typeof t ? new De(this) : this.map(function(n) {
                            return ti(n, t, e)
                        })
                    }), De.prototype.reject = function(t) {
                        return t = Er(t, 3), this.filter(function(e) {
                            return !t(e)
                        })
                    }, De.prototype.slice = function(t, e) {
                        t = _o(t);
                        var n = this;
                        return n.__filtered__ && (t > 0 || 0 > e) ? new De(n) : (0 > t ? n = n.takeRight(-t) : t && (n = n.drop(t)), e !== K && (e = _o(e), n = 0 > e ? n.dropRight(-e) : n.take(e - t)), n)
                    }, De.prototype.takeRightWhile = function(t) {
                        return this.reverse().takeWhile(t).reverse()
                    }, De.prototype.toArray = function() {
                        return this.take(Pt)
                    }, qn(De.prototype, function(t, n) {
                        var i = /^(?:filter|find|map|reject)|While$/.test(n),
                            r = /^(?:head|last)$/.test(n),
                            s = e[r ? "take" + ("last" == n ? "Right" : "") : n],
                            a = r || /^find/.test(n);
                        s && (e.prototype[n] = function() {
                            var n = this.__wrapped__,
                                o = r ? [1] : arguments,
                                h = n instanceof De,
                                l = o[0],
                                p = h || Wp(n),
                                u = function(t) {
                                    var n = s.apply(e, d([t], o));
                                    return r && c ? n[0] : n
                                };
                            p && i && "function" == typeof l && 1 != l.length && (h = p = !1);
                            var c = this.__chain__,
                                f = !!this.__actions__.length,
                                m = a && !c,
                                v = h && !f;
                            if (!a && p) {
                                n = v ? n : new De(this);
                                var g = t.apply(n, o);
                                return g.__actions__.push({
                                    func: Rs,
                                    args: [u],
                                    thisArg: K
                                }), new L(g, c)
                            }
                            return m && v ? t.apply(this, o) : (g = this.thru(u), m ? r ? g.value()[0] : g.value() : g)
                        })
                    }), h(["pop", "push", "shift", "sort", "splice", "unshift"], function(t) {
                        var n = rl[t],
                            i = /^(?:push|sort|unshift)$/.test(t) ? "tap" : "thru",
                            r = /^(?:pop|shift)$/.test(t);
                        e.prototype[t] = function() {
                            var t = arguments;
                            if (r && !this.__chain__) {
                                var e = this.value();
                                return n.apply(Wp(e) ? e : [], t)
                            }
                            return this[i](function(e) {
                                return n.apply(Wp(e) ? e : [], t)
                            })
                        }
                    }), qn(De.prototype, function(t, n) {
                        var i = e[n];
                        if (i) {
                            var r = i.name + "",
                                s = ql[r] || (ql[r] = []);
                            s.push({
                                name: n,
                                func: i
                            })
                        }
                    }), ql[ar(K, at).name] = [{
                        name: "wrapper",
                        func: K
                    }], De.prototype.clone = Oe, De.prototype.reverse = ze, De.prototype.value = je, e.prototype.at = kp, e.prototype.chain = Hs, e.prototype.commit = Ws, e.prototype.next = qs, e.prototype.plant = Us, e.prototype.reverse = $s, e.prototype.toJSON = e.prototype.valueOf = e.prototype.value = Qs, wl && (e.prototype[wl] = Gs), e
                }
                var K, tt = "4.8.2",
                    et = 200,
                    nt = "Expected a function",
                    it = "__lodash_hash_undefined__",
                    rt = "__lodash_placeholder__",
                    st = 1,
                    at = 2,
                    ot = 4,
                    ht = 8,
                    lt = 16,
                    pt = 32,
                    ut = 64,
                    ct = 128,
                    ft = 256,
                    mt = 512,
                    dt = 1,
                    vt = 2,
                    gt = 30,
                    yt = "...",
                    bt = 150,
                    wt = 16,
                    Et = 1,
                    Ct = 2,
                    _t = 3,
                    xt = 1 / 0,
                    St = 9007199254740991,
                    At = 1.7976931348623157e308,
                    kt = NaN,
                    Pt = 4294967295,
                    Tt = Pt - 1,
                    Mt = Pt >>> 1,
                    Dt = "[object Arguments]",
                    It = "[object Array]",
                    Ft = "[object Boolean]",
                    Lt = "[object Date]",
                    Ot = "[object Error]",
                    zt = "[object Function]",
                    jt = "[object GeneratorFunction]",
                    Vt = "[object Map]",
                    Nt = "[object Number]",
                    Bt = "[object Object]",
                    Rt = "[object Promise]",
                    Ht = "[object RegExp]",
                    Wt = "[object Set]",
                    qt = "[object String]",
                    Gt = "[object Symbol]",
                    Ut = "[object WeakMap]",
                    $t = "[object WeakSet]",
                    Qt = "[object ArrayBuffer]",
                    Xt = "[object DataView]",
                    Zt = "[object Float32Array]",
                    Yt = "[object Float64Array]",
                    Jt = "[object Int8Array]",
                    Kt = "[object Int16Array]",
                    te = "[object Int32Array]",
                    ee = "[object Uint8Array]",
                    ne = "[object Uint8ClampedArray]",
                    ie = "[object Uint16Array]",
                    re = "[object Uint32Array]",
                    se = /\b__p \+= '';/g,
                    ae = /\b(__p \+=) '' \+/g,
                    oe = /(__e\(.*?\)|\b__t\)) \+\n'';/g,
                    he = /&(?:amp|lt|gt|quot|#39|#96);/g,
                    le = /[&<>"'`]/g,
                    pe = RegExp(he.source),
                    ue = RegExp(le.source),
                    ce = /<%-([\s\S]+?)%>/g,
                    fe = /<%([\s\S]+?)%>/g,
                    me = /<%=([\s\S]+?)%>/g,
                    de = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
                    ve = /^\w*$/,
                    ge = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]/g,
                    ye = /[\\^$.*+?()[\]{}|]/g,
                    be = RegExp(ye.source),
                    we = /^\s+|\s+$/g,
                    Ee = /^\s+/,
                    Ce = /\s+$/,
                    _e = /\\(\\)?/g,
                    xe = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g,
                    Se = /\w*$/,
                    Ae = /^0x/i,
                    ke = /^[-+]0x[0-9a-f]+$/i,
                    Pe = /^0b[01]+$/i,
                    Te = /^\[object .+?Constructor\]$/,
                    Me = /^0o[0-7]+$/i,
                    De = /^(?:0|[1-9]\d*)$/,
                    Ie = /[\xc0-\xd6\xd8-\xde\xdf-\xf6\xf8-\xff]/g,
                    Fe = /($^)/,
                    Le = /['\n\r\u2028\u2029\\]/g,
                    Oe = "\\ud800-\\udfff",
                    ze = "\\u0300-\\u036f\\ufe20-\\ufe23",
                    je = "\\u20d0-\\u20f0",
                    Ve = "\\u2700-\\u27bf",
                    Ne = "a-z\\xdf-\\xf6\\xf8-\\xff",
                    Be = "\\xac\\xb1\\xd7\\xf7",
                    Re = "\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf",
                    He = "\\u2018\\u2019\\u201c\\u201d",
                    We = " \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000",
                    qe = "A-Z\\xc0-\\xd6\\xd8-\\xde",
                    Ge = "\\ufe0e\\ufe0f",
                    Ue = Be + Re + He + We,
                    $e = "[" + Oe + "]",
                    Qe = "[" + Ue + "]",
                    Xe = "[" + ze + je + "]",
                    Ze = "\\d+",
                    Ye = "[" + Ve + "]",
                    Je = "[" + Ne + "]",
                    Ke = "[^" + Oe + Ue + Ze + Ve + Ne + qe + "]",
                    tn = "\\ud83c[\\udffb-\\udfff]",
                    en = "(?:" + Xe + "|" + tn + ")",
                    nn = "[^" + Oe + "]",
                    rn = "(?:\\ud83c[\\udde6-\\uddff]){2}",
                    sn = "[\\ud800-\\udbff][\\udc00-\\udfff]",
                    an = "[" + qe + "]",
                    on = "\\u200d",
                    hn = "(?:" + Je + "|" + Ke + ")",
                    ln = "(?:" + an + "|" + Ke + ")",
                    pn = en + "?",
                    un = "[" + Ge + "]?",
                    cn = "(?:" + on + "(?:" + [nn, rn, sn].join("|") + ")" + un + pn + ")*",
                    fn = un + pn + cn,
                    mn = "(?:" + [Ye, rn, sn].join("|") + ")" + fn,
                    dn = "(?:" + [nn + Xe + "?", Xe, rn, sn, $e].join("|") + ")",
                    vn = RegExp(Xe, "g"),
                    gn = RegExp(tn + "(?=" + tn + ")|" + dn + fn, "g"),
                    yn = RegExp("[" + on + Oe + ze + je + Ge + "]"),
                    bn = /[a-zA-Z0-9]+/g,
                    wn = RegExp([an + "?" + Je + "+(?=" + [Qe, an, "$"].join("|") + ")", ln + "+(?=" + [Qe, an + hn, "$"].join("|") + ")", an + "?" + hn + "+", an + "+", Ze, mn].join("|"), "g"),
                    En = /[a-z][A-Z]|[A-Z]{2,}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/,
                    Cn = ["Array", "Buffer", "DataView", "Date", "Error", "Float32Array", "Float64Array", "Function", "Int8Array", "Int16Array", "Int32Array", "Map", "Math", "Object", "Promise", "Reflect", "RegExp", "Set", "String", "Symbol", "TypeError", "Uint8Array", "Uint8ClampedArray", "Uint16Array", "Uint32Array", "WeakMap", "_", "clearTimeout", "isFinite", "parseInt", "setTimeout"],
                    _n = -1,
                    xn = {};
                xn[Zt] = xn[Yt] = xn[Jt] = xn[Kt] = xn[te] = xn[ee] = xn[ne] = xn[ie] = xn[re] = !0, xn[Dt] = xn[It] = xn[Qt] = xn[Ft] = xn[Xt] = xn[Lt] = xn[Ot] = xn[zt] = xn[Vt] = xn[Nt] = xn[Bt] = xn[Ht] = xn[Wt] = xn[qt] = xn[Ut] = !1;
                var Sn = {};
                Sn[Dt] = Sn[It] = Sn[Qt] = Sn[Xt] = Sn[Ft] = Sn[Lt] = Sn[Zt] = Sn[Yt] = Sn[Jt] = Sn[Kt] = Sn[te] = Sn[Vt] = Sn[Nt] = Sn[Bt] = Sn[Ht] = Sn[Wt] = Sn[qt] = Sn[Gt] = Sn[ee] = Sn[ne] = Sn[ie] = Sn[re] = !0, Sn[Ot] = Sn[zt] = Sn[Ut] = !1;
                var An = {
                        "\xc0": "A",
                        "\xc1": "A",
                        "\xc2": "A",
                        "\xc3": "A",
                        "\xc4": "A",
                        "\xc5": "A",
                        "\xe0": "a",
                        "\xe1": "a",
                        "\xe2": "a",
                        "\xe3": "a",
                        "\xe4": "a",
                        "\xe5": "a",
                        "\xc7": "C",
                        "\xe7": "c",
                        "\xd0": "D",
                        "\xf0": "d",
                        "\xc8": "E",
                        "\xc9": "E",
                        "\xca": "E",
                        "\xcb": "E",
                        "\xe8": "e",
                        "\xe9": "e",
                        "\xea": "e",
                        "\xeb": "e",
                        "\xcc": "I",
                        "\xcd": "I",
                        "\xce": "I",
                        "\xcf": "I",
                        "\xec": "i",
                        "\xed": "i",
                        "\xee": "i",
                        "\xef": "i",
                        "\xd1": "N",
                        "\xf1": "n",
                        "\xd2": "O",
                        "\xd3": "O",
                        "\xd4": "O",
                        "\xd5": "O",
                        "\xd6": "O",
                        "\xd8": "O",
                        "\xf2": "o",
                        "\xf3": "o",
                        "\xf4": "o",
                        "\xf5": "o",
                        "\xf6": "o",
                        "\xf8": "o",
                        "\xd9": "U",
                        "\xda": "U",
                        "\xdb": "U",
                        "\xdc": "U",
                        "\xf9": "u",
                        "\xfa": "u",
                        "\xfb": "u",
                        "\xfc": "u",
                        "\xdd": "Y",
                        "\xfd": "y",
                        "\xff": "y",
                        "\xc6": "Ae",
                        "\xe6": "ae",
                        "\xde": "Th",
                        "\xfe": "th",
                        "\xdf": "ss"
                    },
                    kn = {
                        "&": "&amp;",
                        "<": "&lt;",
                        ">": "&gt;",
                        '"': "&quot;",
                        "'": "&#39;",
                        "`": "&#96;"
                    },
                    Pn = {
                        "&amp;": "&",
                        "&lt;": "<",
                        "&gt;": ">",
                        "&quot;": '"',
                        "&#39;": "'",
                        "&#96;": "`"
                    },
                    Tn = {
                        "function": !0,
                        object: !0
                    },
                    Mn = {
                        "\\": "\\",
                        "'": "'",
                        "\n": "n",
                        "\r": "r",
                        "\u2028": "u2028",
                        "\u2029": "u2029"
                    },
                    Dn = parseFloat,
                    In = parseInt,
                    Fn = Tn[typeof n] && n && !n.nodeType ? n : K,
                    Ln = Tn[typeof e] && e && !e.nodeType ? e : K,
                    On = Ln && Ln.exports === Fn ? Fn : K,
                    zn = L(Fn && Ln && "object" == typeof t && t),
                    jn = L(Tn[typeof self] && self),
                    Vn = L(Tn[typeof window] && window),
                    Nn = L(Tn[typeof this] && this),
                    Bn = zn || Vn !== (Nn && Nn.window) && Vn || jn || Nn || Function("return this")(),
                    Rn = J();
                (Vn || jn || {})._ = Rn, "function" == typeof define && "object" == typeof define.amd && define.amd ? define(function() {
                    return Rn
                }) : Fn && Ln ? (On && ((Ln.exports = Rn)._ = Rn), Fn._ = Rn) : Bn._ = Rn
            }).call(this)
        }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
    }, {}],
    5: [function(t, e, n) {
        /*! picturefill - v3.0.2 - 2016-02-12
         * https://scottjehl.github.io/picturefill/
         * Copyright (c) 2016 https://github.com/scottjehl/picturefill/blob/master/Authors.txt; Licensed MIT
         */
        /*! Gecko-Picture - v1.0
         * https://github.com/scottjehl/picturefill/tree/3.0/src/plugins/gecko-picture
         * Firefox's early picture implementation (prior to FF41) is static and does
         * not react to viewport changes. This tiny module fixes this.
         */
        ! function(t) {
            var e = navigator.userAgent;
            t.HTMLPictureElement && /ecko/.test(e) && e.match(/rv\:(\d+)/) && RegExp.$1 < 45 && addEventListener("resize", function() {
                var e, n = document.createElement("source"),
                    i = function(t) {
                        var e, i, r = t.parentNode;
                        "PICTURE" === r.nodeName.toUpperCase() ? (e = n.cloneNode(), r.insertBefore(e, r.firstElementChild), setTimeout(function() {
                            r.removeChild(e)
                        })) : (!t._pfLastSize || t.offsetWidth > t._pfLastSize) && (t._pfLastSize = t.offsetWidth, i = t.sizes, t.sizes += ",100vw", setTimeout(function() {
                            t.sizes = i
                        }))
                    },
                    r = function() {
                        var t, e = document.querySelectorAll("picture > img, img[srcset][sizes]");
                        for (t = 0; t < e.length; t++) i(e[t])
                    },
                    s = function() {
                        clearTimeout(e), e = setTimeout(r, 99)
                    },
                    a = t.matchMedia && matchMedia("(orientation: landscape)"),
                    o = function() {
                        s(), a && a.addListener && a.addListener(s)
                    };
                return n.srcset = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==", /^[c|i]|d$/.test(document.readyState || "") ? o() : document.addEventListener("DOMContentLoaded", o), s
            }())
        }(window),
        /*! Picturefill - v3.0.2
         * http://scottjehl.github.io/picturefill
         * Copyright (c) 2015 https://github.com/scottjehl/picturefill/blob/master/Authors.txt;
         *  License: MIT
         */
        function(t, n, i) {
            "use strict";

            function r(t) {
                return " " === t || "	" === t || "\n" === t || "\f" === t || "\r" === t
            }

            function s(e, n) {
                var i = new t.Image;
                return i.onerror = function() {
                    k[e] = !1, nt()
                }, i.onload = function() {
                    k[e] = 1 === i.width, nt()
                }, i.src = n, "pending"
            }

            function a() {
                N = !1, H = t.devicePixelRatio, B = {}, R = {}, b.DPR = H || 1, W.width = Math.max(t.innerWidth || 0, A.clientWidth), W.height = Math.max(t.innerHeight || 0, A.clientHeight), W.vw = W.width / 100, W.vh = W.height / 100, y = [W.height, W.width, H].join("-"), W.em = b.getEmValue(), W.rem = W.em
            }

            function o(t, e, n, i) {
                var r, s, a, o;
                return "saveData" === P.algorithm ? t > 2.7 ? o = n + 1 : (s = e - n, r = Math.pow(t - .6, 1.5), a = s * r, i && (a += .1 * r), o = t + a) : o = n > 1 ? Math.sqrt(t * e) : t, o > n
            }

            function h(t) {
                var e, n = b.getSet(t),
                    i = !1;
                "pending" !== n && (i = y, n && (e = b.setRes(n), b.applySetCandidate(e, t))), t[b.ns].evaled = i
            }

            function l(t, e) {
                return t.res - e.res
            }

            function p(t, e, n) {
                var i;
                return !n && e && (n = t[b.ns].sets, n = n && n[n.length - 1]), i = u(e, n), i && (e = b.makeUrl(e), t[b.ns].curSrc = e, t[b.ns].curCan = i, i.res || et(i, i.set.sizes)), i
            }

            function u(t, e) {
                var n, i, r;
                if (t && e)
                    for (r = b.parseSet(e), t = b.makeUrl(t), n = 0; n < r.length; n++)
                        if (t === b.makeUrl(r[n].url)) {
                            i = r[n];
                            break
                        }
                return i
            }

            function c(t, e) {
                var n, i, r, s, a = t.getElementsByTagName("source");
                for (n = 0, i = a.length; i > n; n++) r = a[n], r[b.ns] = !0, s = r.getAttribute("srcset"), s && e.push({
                    srcset: s,
                    media: r.getAttribute("media"),
                    type: r.getAttribute("type"),
                    sizes: r.getAttribute("sizes")
                })
            }

            function f(t, e) {
                function n(e) {
                    var n, i = e.exec(t.substring(c));
                    return i ? (n = i[0], c += n.length, n) : void 0
                }

                function i() {
                    var t, n, i, r, s, h, l, p, u, c = !1,
                        m = {};
                    for (r = 0; r < o.length; r++) s = o[r], h = s[s.length - 1], l = s.substring(0, s.length - 1), p = parseInt(l, 10), u = parseFloat(l), Z.test(l) && "w" === h ? ((t || n) && (c = !0), 0 === p ? c = !0 : t = p) : Y.test(l) && "x" === h ? ((t || n || i) && (c = !0), 0 > u ? c = !0 : n = u) : Z.test(l) && "h" === h ? ((i || n) && (c = !0), 0 === p ? c = !0 : i = p) : c = !0;
                    c || (m.url = a, t && (m.w = t), n && (m.d = n), i && (m.h = i), i || n || t || (m.d = 1), 1 === m.d && (e.has1x = !0), m.set = e, f.push(m))
                }

                function s() {
                    for (n(U), h = "", l = "in descriptor";;) {
                        if (p = t.charAt(c), "in descriptor" === l)
                            if (r(p)) h && (o.push(h), h = "", l = "after descriptor");
                            else {
                                if ("," === p) return c += 1, h && o.push(h), void i();
                                if ("(" === p) h += p, l = "in parens";
                                else {
                                    if ("" === p) return h && o.push(h), void i();
                                    h += p
                                }
                            }
                        else if ("in parens" === l)
                            if (")" === p) h += p, l = "in descriptor";
                            else {
                                if ("" === p) return o.push(h), void i();
                                h += p
                            }
                        else if ("after descriptor" === l)
                            if (r(p));
                            else {
                                if ("" === p) return void i();
                                l = "in descriptor", c -= 1
                            }
                        c += 1
                    }
                }
                for (var a, o, h, l, p, u = t.length, c = 0, f = [];;) {
                    if (n($), c >= u) return f;
                    a = n(Q), o = [], "," === a.slice(-1) ? (a = a.replace(X, ""), i()) : s()
                }
            }

            function m(t) {
                function e(t) {
                    function e() {
                        s && (a.push(s), s = "")
                    }

                    function n() {
                        a[0] && (o.push(a), a = [])
                    }
                    for (var i, s = "", a = [], o = [], h = 0, l = 0, p = !1;;) {
                        if (i = t.charAt(l), "" === i) return e(), n(), o;
                        if (p) {
                            if ("*" === i && "/" === t[l + 1]) {
                                p = !1, l += 2, e();
                                continue
                            }
                            l += 1
                        } else {
                            if (r(i)) {
                                if (t.charAt(l - 1) && r(t.charAt(l - 1)) || !s) {
                                    l += 1;
                                    continue
                                }
                                if (0 === h) {
                                    e(), l += 1;
                                    continue
                                }
                                i = " "
                            } else if ("(" === i) h += 1;
                            else if (")" === i) h -= 1;
                            else {
                                if ("," === i) {
                                    e(), n(), l += 1;
                                    continue
                                }
                                if ("/" === i && "*" === t.charAt(l + 1)) {
                                    p = !0, l += 2;
                                    continue
                                }
                            }
                            s += i, l += 1
                        }
                    }
                }

                function n(t) {
                    return p.test(t) && parseFloat(t) >= 0 ? !0 : u.test(t) ? !0 : "0" === t || "-0" === t || "+0" === t ? !0 : !1
                }
                var i, s, a, o, h, l, p = /^(?:[+-]?[0-9]+|[0-9]*\.[0-9]+)(?:[eE][+-]?[0-9]+)?(?:ch|cm|em|ex|in|mm|pc|pt|px|rem|vh|vmin|vmax|vw)$/i,
                    u = /^calc\((?:[0-9a-z \.\+\-\*\/\(\)]+)\)$/i;
                for (s = e(t), a = s.length, i = 0; a > i; i++)
                    if (o = s[i], h = o[o.length - 1], n(h)) {
                        if (l = h, o.pop(), 0 === o.length) return l;
                        if (o = o.join(" "), b.matchesMedia(o)) return l
                    }
                return "100vw"
            }
            n.createElement("picture");
            var d, v, g, y, b = {},
                w = !1,
                E = function() {},
                C = n.createElement("img"),
                _ = C.getAttribute,
                x = C.setAttribute,
                S = C.removeAttribute,
                A = n.documentElement,
                k = {},
                P = {
                    algorithm: ""
                },
                T = "data-pfsrc",
                M = T + "set",
                D = navigator.userAgent,
                I = /rident/.test(D) || /ecko/.test(D) && D.match(/rv\:(\d+)/) && RegExp.$1 > 35,
                F = "currentSrc",
                L = /\s+\+?\d+(e\d+)?w/,
                O = /(\([^)]+\))?\s*(.+)/,
                z = t.picturefillCFG,
                j = "position:absolute;left:0;visibility:hidden;display:block;padding:0;border:none;font-size:1em;width:1em;overflow:hidden;clip:rect(0px, 0px, 0px, 0px)",
                V = "font-size:100%!important;",
                N = !0,
                B = {},
                R = {},
                H = t.devicePixelRatio,
                W = {
                    px: 1,
                    "in": 96
                },
                q = n.createElement("a"),
                G = !1,
                U = /^[ \t\n\r\u000c]+/,
                $ = /^[, \t\n\r\u000c]+/,
                Q = /^[^ \t\n\r\u000c]+/,
                X = /[,]+$/,
                Z = /^\d+$/,
                Y = /^-?(?:[0-9]+|[0-9]*\.[0-9]+)(?:[eE][+-]?[0-9]+)?$/,
                J = function(t, e, n, i) {
                    t.addEventListener ? t.addEventListener(e, n, i || !1) : t.attachEvent && t.attachEvent("on" + e, n)
                },
                K = function(t) {
                    var e = {};
                    return function(n) {
                        return n in e || (e[n] = t(n)), e[n]
                    }
                },
                tt = function() {
                    var t = /^([\d\.]+)(em|vw|px)$/,
                        e = function() {
                            for (var t = arguments, e = 0, n = t[0]; ++e in t;) n = n.replace(t[e], t[++e]);
                            return n
                        },
                        n = K(function(t) {
                            return "return " + e((t || "").toLowerCase(), /\band\b/g, "&&", /,/g, "||", /min-([a-z-\s]+):/g, "e.$1>=", /max-([a-z-\s]+):/g, "e.$1<=", /calc([^)]+)/g, "($1)", /(\d+[\.]*[\d]*)([a-z]+)/g, "($1 * e.$2)", /^(?!(e.[a-z]|[0-9\.&=|><\+\-\*\(\)\/])).*/gi, "") + ";"
                        });
                    return function(e, i) {
                        var r;
                        if (!(e in B))
                            if (B[e] = !1, i && (r = e.match(t))) B[e] = r[1] * W[r[2]];
                            else try {
                                B[e] = new Function("e", n(e))(W)
                            } catch (s) {}
                        return B[e]
                    }
                }(),
                et = function(t, e) {
                    return t.w ? (t.cWidth = b.calcListLength(e || "100vw"), t.res = t.w / t.cWidth) : t.res = t.d, t
                },
                nt = function(t) {
                    if (w) {
                        var e, i, r, s = t || {};
                        if (s.elements && 1 === s.elements.nodeType && ("IMG" === s.elements.nodeName.toUpperCase() ? s.elements = [s.elements] : (s.context = s.elements, s.elements = null)), e = s.elements || b.qsa(s.context || n, s.reevaluate || s.reselect ? b.sel : b.selShort), r = e.length) {
                            for (b.setupRun(s), G = !0, i = 0; r > i; i++) b.fillImg(e[i], s);
                            b.teardownRun(s)
                        }
                    }
                };
            d = t.console && console.warn ? function(t) {
                console.warn(t)
            } : E, F in C || (F = "src"), k["image/jpeg"] = !0, k["image/gif"] = !0, k["image/png"] = !0, k["image/svg+xml"] = n.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image", "1.1"), b.ns = ("pf" + (new Date).getTime()).substr(0, 9), b.supSrcset = "srcset" in C, b.supSizes = "sizes" in C, b.supPicture = !!t.HTMLPictureElement, b.supSrcset && b.supPicture && !b.supSizes && ! function(t) {
                C.srcset = "data:,a", t.src = "data:,a", b.supSrcset = C.complete === t.complete, b.supPicture = b.supSrcset && b.supPicture
            }(n.createElement("img")), b.supSrcset && !b.supSizes ? ! function() {
                var t = "data:image/gif;base64,R0lGODlhAgABAPAAAP///wAAACH5BAAAAAAALAAAAAACAAEAAAICBAoAOw==",
                    e = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",
                    i = n.createElement("img"),
                    r = function() {
                        var t = i.width;
                        2 === t && (b.supSizes = !0), g = b.supSrcset && !b.supSizes, w = !0, setTimeout(nt)
                    };
                i.onload = r, i.onerror = r, i.setAttribute("sizes", "9px"), i.srcset = e + " 1w," + t + " 9w", i.src = e
            }() : w = !0, b.selShort = "picture>img,img[srcset]", b.sel = b.selShort, b.cfg = P, b.DPR = H || 1, b.u = W, b.types = k, b.setSize = E, b.makeUrl = K(function(t) {
                return q.href = t, q.href
            }), b.qsa = function(t, e) {
                return "querySelector" in t ? t.querySelectorAll(e) : []
            }, b.matchesMedia = function() {
                return t.matchMedia && (matchMedia("(min-width: 0.1em)") || {}).matches ? b.matchesMedia = function(t) {
                    return !t || matchMedia(t).matches
                } : b.matchesMedia = b.mMQ, b.matchesMedia.apply(this, arguments)
            }, b.mMQ = function(t) {
                return t ? tt(t) : !0
            }, b.calcLength = function(t) {
                var e = tt(t, !0) || !1;
                return 0 > e && (e = !1), e
            }, b.supportsType = function(t) {
                return t ? k[t] : !0
            }, b.parseSize = K(function(t) {
                var e = (t || "").match(O);
                return {
                    media: e && e[1],
                    length: e && e[2]
                }
            }), b.parseSet = function(t) {
                return t.cands || (t.cands = f(t.srcset, t)), t.cands
            }, b.getEmValue = function() {
                var t;
                if (!v && (t = n.body)) {
                    var e = n.createElement("div"),
                        i = A.style.cssText,
                        r = t.style.cssText;
                    e.style.cssText = j, A.style.cssText = V, t.style.cssText = V, t.appendChild(e), v = e.offsetWidth, t.removeChild(e), v = parseFloat(v, 10), A.style.cssText = i, t.style.cssText = r
                }
                return v || 16
            }, b.calcListLength = function(t) {
                if (!(t in R) || P.uT) {
                    var e = b.calcLength(m(t));
                    R[t] = e ? e : W.width
                }
                return R[t]
            }, b.setRes = function(t) {
                var e;
                if (t) {
                    e = b.parseSet(t);
                    for (var n = 0, i = e.length; i > n; n++) et(e[n], t.sizes)
                }
                return e
            }, b.setRes.res = et, b.applySetCandidate = function(t, e) {
                if (t.length) {
                    var n, i, r, s, a, h, u, c, f, m = e[b.ns],
                        d = b.DPR;
                    if (h = m.curSrc || e[F], u = m.curCan || p(e, h, t[0].set), u && u.set === t[0].set && (f = I && !e.complete && u.res - .1 > d, f || (u.cached = !0, u.res >= d && (a = u))), !a)
                        for (t.sort(l), s = t.length, a = t[s - 1], i = 0; s > i; i++)
                            if (n = t[i], n.res >= d) {
                                r = i - 1, a = t[r] && (f || h !== b.makeUrl(n.url)) && o(t[r].res, n.res, d, t[r].cached) ? t[r] : n;
                                break
                            }
                    a && (c = b.makeUrl(a.url), m.curSrc = c, m.curCan = a, c !== h && b.setSrc(e, a), b.setSize(e))
                }
            }, b.setSrc = function(t, e) {
                var n;
                t.src = e.url, "image/svg+xml" === e.set.type && (n = t.style.width, t.style.width = t.offsetWidth + 1 + "px", t.offsetWidth + 1 && (t.style.width = n))
            }, b.getSet = function(t) {
                var e, n, i, r = !1,
                    s = t[b.ns].sets;
                for (e = 0; e < s.length && !r; e++)
                    if (n = s[e], n.srcset && b.matchesMedia(n.media) && (i = b.supportsType(n.type))) {
                        "pending" === i && (n = i), r = n;
                        break
                    }
                return r
            }, b.parseSets = function(t, e, n) {
                var r, s, a, o, h = e && "PICTURE" === e.nodeName.toUpperCase(),
                    l = t[b.ns];
                (l.src === i || n.src) && (l.src = _.call(t, "src"), l.src ? x.call(t, T, l.src) : S.call(t, T)), (l.srcset === i || n.srcset || !b.supSrcset || t.srcset) && (r = _.call(t, "srcset"), l.srcset = r, o = !0), l.sets = [], h && (l.pic = !0, c(e, l.sets)), l.srcset ? (s = {
                    srcset: l.srcset,
                    sizes: _.call(t, "sizes")
                }, l.sets.push(s), a = (g || l.src) && L.test(l.srcset || ""), a || !l.src || u(l.src, s) || s.has1x || (s.srcset += ", " + l.src, s.cands.push({
                    url: l.src,
                    d: 1,
                    set: s
                }))) : l.src && l.sets.push({
                    srcset: l.src,
                    sizes: null
                }), l.curCan = null, l.curSrc = i, l.supported = !(h || s && !b.supSrcset || a && !b.supSizes), o && b.supSrcset && !l.supported && (r ? (x.call(t, M, r), t.srcset = "") : S.call(t, M)), l.supported && !l.srcset && (!l.src && t.src || t.src !== b.makeUrl(l.src)) && (null === l.src ? t.removeAttribute("src") : t.src = l.src), l.parsed = !0
            }, b.fillImg = function(t, e) {
                var n, i = e.reselect || e.reevaluate;
                t[b.ns] || (t[b.ns] = {}), n = t[b.ns], (i || n.evaled !== y) && ((!n.parsed || e.reevaluate) && b.parseSets(t, t.parentNode, e), n.supported ? n.evaled = y : h(t))
            }, b.setupRun = function() {
                (!G || N || H !== t.devicePixelRatio) && a()
            }, b.supPicture ? (nt = E, b.fillImg = E) : ! function() {
                var e, i = t.attachEvent ? /d$|^c/ : /d$|^c|^i/,
                    r = function() {
                        var t = n.readyState || "";
                        s = setTimeout(r, "loading" === t ? 200 : 999), n.body && (b.fillImgs(), e = e || i.test(t), e && clearTimeout(s))
                    },
                    s = setTimeout(r, n.body ? 9 : 99),
                    a = function(t, e) {
                        var n, i, r = function() {
                            var s = new Date - i;
                            e > s ? n = setTimeout(r, e - s) : (n = null, t())
                        };
                        return function() {
                            i = new Date, n || (n = setTimeout(r, e))
                        }
                    },
                    o = A.clientHeight,
                    h = function() {
                        N = Math.max(t.innerWidth || 0, A.clientWidth) !== W.width || A.clientHeight !== o, o = A.clientHeight, N && b.fillImgs()
                    };
                J(t, "resize", a(h, 99)), J(n, "readystatechange", r)
            }(), b.picturefill = nt, b.fillImgs = nt, b.teardownRun = E, nt._ = b, t.picturefillCFG = {
                pf: b,
                push: function(t) {
                    var e = t.shift();
                    "function" == typeof b[e] ? b[e].apply(b, t) : (P[e] = t[0], G && b.fillImgs({
                        reselect: !0
                    }))
                }
            };
            for (; z && z.length;) t.picturefillCFG.push(z.shift());
            t.picturefill = nt, "object" == typeof e && "object" == typeof e.exports ? e.exports = nt : "function" == typeof define && define.amd && define("picturefill", function() {
                return nt
            }), b.supPicture || (k["image/webp"] = s("image/webp", "data:image/webp;base64,UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAABBxAR/Q9ERP8DAABWUDggGAAAADABAJ0BKgEAAQADADQlpAADcAD++/1QAA=="))
        }(window, document)
    }, {}],
    6: [function(t, e, n) { /*! SmoothScroll v16.1.4 | (c) 2020 Chris Ferdinandi | MIT License | http://github.com/cferdinandi/smooth-scroll */
        ! function(t, i) {
            "object" == typeof n && "undefined" != typeof e ? e.exports = i() : "function" == typeof define && define.amd ? define(i) : (t = t || self).SmoothScroll = i()
        }(this, function() {
            "use strict";
            window.Element && !Element.prototype.closest && (Element.prototype.closest = function(t) {
                    var e, n = (this.document || this.ownerDocument).querySelectorAll(t),
                        i = this;
                    do
                        for (e = n.length; --e >= 0 && n.item(e) !== i;); while (0 > e && (i = i.parentElement));
                    return i
                }),
                function() {
                    function t(t, e) {
                        e = e || {
                            bubbles: !1,
                            cancelable: !1,
                            detail: void 0
                        };
                        var n = document.createEvent("CustomEvent");
                        return n.initCustomEvent(t, e.bubbles, e.cancelable, e.detail), n
                    }
                    return "function" == typeof window.CustomEvent ? !1 : (t.prototype = window.Event.prototype, void(window.CustomEvent = t))
                }(),
                function() {
                    for (var t = 0, e = ["ms", "moz", "webkit", "o"], n = 0; n < e.length && !window.requestAnimationFrame; ++n) window.requestAnimationFrame = window[e[n] + "RequestAnimationFrame"], window.cancelAnimationFrame = window[e[n] + "CancelAnimationFrame"] || window[e[n] + "CancelRequestAnimationFrame"];
                    window.requestAnimationFrame || (window.requestAnimationFrame = function(e, n) {
                        var i = (new Date).getTime(),
                            r = Math.max(0, 16 - (i - t)),
                            s = window.setTimeout(function() {
                                e(i + r)
                            }, r);
                        return t = i + r, s
                    }), window.cancelAnimationFrame || (window.cancelAnimationFrame = function(t) {
                        clearTimeout(t)
                    })
                }();
            var t = {
                    ignore: "[data-scroll-ignore]",
                    header: null,
                    topOnEmptyHash: !0,
                    speed: 500,
                    speedAsDuration: !1,
                    durationMax: null,
                    durationMin: null,
                    clip: !0,
                    offset: 0,
                    easing: "easeInOutCubic",
                    customEasing: null,
                    updateURL: !0,
                    popstate: !0,
                    emitEvents: !0
                },
                e = function() {
                    var t = {};
                    return Array.prototype.forEach.call(arguments, function(e) {
                        for (var n in e) {
                            if (!e.hasOwnProperty(n)) return;
                            t[n] = e[n]
                        }
                    }), t
                },
                n = function(t) {
                    "#" === t.charAt(0) && (t = t.substr(1));
                    for (var e, n = String(t), i = n.length, r = -1, s = "", a = n.charCodeAt(0); ++r < i;) {
                        if (0 === (e = n.charCodeAt(r))) throw new InvalidCharacterError("Invalid character: the input contains U+0000.");
                        s += e >= 1 && 31 >= e || 127 == e || 0 === r && e >= 48 && 57 >= e || 1 === r && e >= 48 && 57 >= e && 45 === a ? "\\" + e.toString(16) + " " : e >= 128 || 45 === e || 95 === e || e >= 48 && 57 >= e || e >= 65 && 90 >= e || e >= 97 && 122 >= e ? n.charAt(r) : "\\" + n.charAt(r)
                    }
                    return "#" + s
                },
                i = function() {
                    return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight, document.body.offsetHeight, document.documentElement.offsetHeight, document.body.clientHeight, document.documentElement.clientHeight)
                },
                r = function(t) {
                    return t ? (e = t, parseInt(window.getComputedStyle(e).height, 10) + t.offsetTop) : 0;
                    var e
                },
                s = function(t, e, n) {
                    0 === t && document.body.focus(), n || (t.focus(), document.activeElement !== t && (t.setAttribute("tabindex", "-1"), t.focus(), t.style.outline = "none"), window.scrollTo(0, e))
                },
                a = function(t, e, n, i) {
                    if (e.emitEvents && "function" == typeof window.CustomEvent) {
                        var r = new CustomEvent(t, {
                            bubbles: !0,
                            detail: {
                                anchor: n,
                                toggle: i
                            }
                        });
                        document.dispatchEvent(r)
                    }
                };
            return function(o, h) {
                var l, p, u, c, f = {};
                f.cancelScroll = function(t) {
                    cancelAnimationFrame(c), c = null, t || a("scrollCancel", l)
                }, f.animateScroll = function(n, o, h) {
                    f.cancelScroll();
                    var p = e(l || t, h || {}),
                        m = "[object Number]" === Object.prototype.toString.call(n),
                        d = m || !n.tagName ? null : n;
                    if (m || d) {
                        var v = window.pageYOffset;
                        p.header && !u && (u = document.querySelector(p.header));
                        var g, y, b, w = r(u),
                            E = m ? n : function(t, e, n, r) {
                                var s = 0;
                                if (t.offsetParent)
                                    do s += t.offsetTop, t = t.offsetParent; while (t);
                                return s = Math.max(s - e - n, 0), r && (s = Math.min(s, i() - window.innerHeight)), s
                            }(d, w, parseInt("function" == typeof p.offset ? p.offset(n, o) : p.offset, 10), p.clip),
                            C = E - v,
                            _ = i(),
                            x = 0,
                            S = function(t, e) {
                                var n = e.speedAsDuration ? e.speed : Math.abs(t / 1e3 * e.speed);
                                return e.durationMax && n > e.durationMax ? e.durationMax : e.durationMin && n < e.durationMin ? e.durationMin : parseInt(n, 10)
                            }(C, p),
                            A = function(t) {
                                g || (g = t), x += t - g, b = v + C * function(t, e) {
                                        var n;
                                        return "easeInQuad" === t.easing && (n = e * e), "easeOutQuad" === t.easing && (n = e * (2 - e)), "easeInOutQuad" === t.easing && (n = .5 > e ? 2 * e * e : (4 - 2 * e) * e - 1), "easeInCubic" === t.easing && (n = e * e * e), "easeOutCubic" === t.easing && (n = --e * e * e + 1), "easeInOutCubic" === t.easing && (n = .5 > e ? 4 * e * e * e : (e - 1) * (2 * e - 2) * (2 * e - 2) + 1), "easeInQuart" === t.easing && (n = e * e * e * e), "easeOutQuart" === t.easing && (n = 1 - --e * e * e * e), "easeInOutQuart" === t.easing && (n = .5 > e ? 8 * e * e * e * e : 1 - 8 * --e * e * e * e), "easeInQuint" === t.easing && (n = e * e * e * e * e), "easeOutQuint" === t.easing && (n = 1 + --e * e * e * e * e), "easeInOutQuint" === t.easing && (n = .5 > e ? 16 * e * e * e * e * e : 1 + 16 * --e * e * e * e * e), t.customEasing && (n = t.customEasing(e)), n || e
                                    }(p, y = (y = 0 === S ? 0 : x / S) > 1 ? 1 : y), window.scrollTo(0, Math.floor(b)),
                                    function(t, e) {
                                        var i = window.pageYOffset;
                                        return t == e || i == e || (e > v && window.innerHeight + i) >= _ ? (f.cancelScroll(!0), s(n, e, m), a("scrollStop", p, n, o), g = null, c = null, !0) : void 0
                                    }(b, E) || (c = window.requestAnimationFrame(A), g = t)
                            };
                        0 === window.pageYOffset && window.scrollTo(0, 0),
                            function(t, e, n) {
                                e || history.pushState && n.updateURL && history.pushState({
                                    smoothScroll: JSON.stringify(n),
                                    anchor: t.id
                                }, document.title, t === document.documentElement ? "#top" : "#" + t.id)
                            }(n, m, p), "matchMedia" in window && window.matchMedia("(prefers-reduced-motion)").matches ? s(n, Math.floor(E), !1) : (a("scrollStart", p, n, o), f.cancelScroll(!0), window.requestAnimationFrame(A))
                    }
                };
                var m = function(t) {
                        if (!t.defaultPrevented && !(0 !== t.button || t.metaKey || t.ctrlKey || t.shiftKey) && "closest" in t.target && (p = t.target.closest(o)) && "a" === p.tagName.toLowerCase() && !t.target.closest(l.ignore) && p.hostname === window.location.hostname && p.pathname === window.location.pathname && /#/.test(p.href)) {
                            var e, i;
                            try {
                                e = n(decodeURIComponent(p.hash))
                            } catch (t) {
                                e = n(p.hash)
                            }
                            if ("#" === e) {
                                if (!l.topOnEmptyHash) return;
                                i = document.documentElement
                            } else i = document.querySelector(e);
                            (i = i || "#top" !== e ? i : document.documentElement) && (t.preventDefault(), function(t) {
                                if (history.replaceState && t.updateURL && !history.state) {
                                    var e = window.location.hash;
                                    e = e || "", history.replaceState({
                                        smoothScroll: JSON.stringify(t),
                                        anchor: e || window.pageYOffset
                                    }, document.title, e || window.location.href)
                                }
                            }(l), f.animateScroll(i, p))
                        }
                    },
                    d = function() {
                        if (null !== history.state && history.state.smoothScroll && history.state.smoothScroll === JSON.stringify(l)) {
                            var t = history.state.anchor;
                            "string" == typeof t && t && !(t = document.querySelector(n(history.state.anchor))) || f.animateScroll(t, null, {
                                updateURL: !1
                            })
                        }
                    };
                return f.destroy = function() {
                        l && (document.removeEventListener("click", m, !1), window.removeEventListener("popstate", d, !1), f.cancelScroll(), l = null, p = null, u = null, c = null)
                    },
                    function() {
                        if (!("querySelector" in document && "addEventListener" in window && "requestAnimationFrame" in window && "closest" in window.Element.prototype)) throw "Smooth Scroll: This browser does not support the required JavaScript methods and browser APIs.";
                        f.destroy(), l = e(t, h || {}), u = l.header ? document.querySelector(l.header) : null, document.addEventListener("click", m, !1), l.updateURL && l.popstate && window.addEventListener("popstate", d, !1)
                    }(), f
            }
        })
    }, {}],
    7: [function(t, e, n) {
        ! function(t, i) {
            "function" == typeof define && define.amd ? define([], function() {
                return t.svg4everybody = i()
            }) : "object" == typeof n ? e.exports = i() : t.svg4everybody = i()
        }(this, function() { /*! svg4everybody v2.0.3 | github.com/jonathantneal/svg4everybody */
            function t(t, e) {
                if (e) {
                    var n = document.createDocumentFragment(),
                        i = !t.getAttribute("viewBox") && e.getAttribute("viewBox");
                    i && t.setAttribute("viewBox", i);
                    for (var r = e.cloneNode(!0); r.childNodes.length;) n.appendChild(r.firstChild);
                    t.appendChild(n)
                }
            }

            function e(e) {
                e.onreadystatechange = function() {
                    if (4 === e.readyState) {
                        var n = e._cachedDocument;
                        n || (n = e._cachedDocument = document.implementation.createHTMLDocument(""), n.body.innerHTML = e.responseText, e._cachedTarget = {}), e._embeds.splice(0).map(function(i) {
                            var r = e._cachedTarget[i.id];
                            r || (r = e._cachedTarget[i.id] = n.getElementById(i.id)), t(i.svg, r)
                        })
                    }
                }, e.onreadystatechange()
            }

            function n(n) {
                function i() {
                    for (var n = 0; n < u.length;) {
                        var a = u[n],
                            o = a.parentNode;
                        if (o && /svg/i.test(o.nodeName)) {
                            var h = a.getAttribute("xlink:href");
                            if (r && (!s.validate || s.validate(h, o, a))) {
                                o.removeChild(a);
                                var c = h.split("#"),
                                    f = c.shift(),
                                    m = c.join("#");
                                if (f.length) {
                                    var d = l[f];
                                    d || (d = l[f] = new XMLHttpRequest, d.open("GET", f), d.send(), d._embeds = []), d._embeds.push({
                                        svg: o,
                                        id: m
                                    }), e(d)
                                } else t(o, document.getElementById(m))
                            }
                        } else ++n
                    }
                    p(i, 67)
                }
                var r, s = Object(n),
                    a = /\bTrident\/[567]\b|\bMSIE (?:9|10)\.0\b/,
                    o = /\bAppleWebKit\/(\d+)\b/,
                    h = /\bEdge\/12\.(\d+)\b/;
                r = "polyfill" in s ? s.polyfill : a.test(navigator.userAgent) || (navigator.userAgent.match(h) || [])[1] < 10547 || (navigator.userAgent.match(o) || [])[1] < 537;
                var l = {},
                    p = window.requestAnimationFrame || setTimeout,
                    u = document.getElementsByTagName("use");
                r && i()
            }
            return n
        })
    }, {}],
    8: [function(t, e, n) {
        ! function(t) {
            "use strict";
            var n = {};
            n._storage = {}, n.subscribe = function(t, e) {
                var i = 0,
                    r = 0,
                    s = "";
                for ("string" == typeof t && (t = [t]), "function" == typeof e && (e = [e]); i < t.length; i++)
                    for (s = t[i], n._storage[s] || (n._storage[s] = []), r = 0; r < e.length; r++) "function" == typeof e[r] && n._storage[s].push(e[r])
            }, n.unsubscribe = function(t, e) {
                var i, r = 0,
                    s = 0,
                    a = "";
                for ("string" == typeof t && (t = [t]), e.length || (e = [e]); r < t.length; r++) {
                    if (a = t[r], !n._storage[a]) throw new Error("Type " + a + " does not exist.");
                    for (s = 0; s < e.length; s++) i = n._storage[a].indexOf(e[s]), n._storage[a].splice(i, 1)
                }
            }, n.publish = function(t, e) {
                var i = 0,
                    r = 0,
                    s = "";
                for ("string" == typeof t && (t = [t]); i < t.length; i++)
                    for (s = t[i], n._storage[s] && n._storage[s].constructor === Array || (n._storage[s] = []), r = 0; r < n._storage[s].length; r++) n._storage[s][r](e)
            }, "object" == typeof e && e && "object" == typeof e.exports ? e.exports = n : "function" == typeof define && define.amd ? define("PubSub", [], function() {
                return n
            }) : "object" == typeof t && "object" == typeof t.document && (t.PubSub = n)
        }(this)
    }, {}],
    9: [function(t, e, n) {
        (function(t) {
            (function(t, e, n, i, r) {
                /*!
                Waypoints - 4.0.0
                Copyright © 2011-2015 Caleb Troughton
                Licensed under the MIT license.
                https://github.com/imakewebthings/waypoints/blog/master/licenses.txt
                */
                ! function() {
                    "use strict";

                    function t(i) {
                        if (!i) throw new Error("No options passed to Waypoint constructor");
                        if (!i.element) throw new Error("No element option passed to Waypoint constructor");
                        if (!i.handler) throw new Error("No handler option passed to Waypoint constructor");
                        this.key = "waypoint-" + e, this.options = t.Adapter.extend({}, t.defaults, i), this.element = this.options.element, this.adapter = new t.Adapter(this.element), this.callback = i.handler, this.axis = this.options.horizontal ? "horizontal" : "vertical", this.enabled = this.options.enabled, this.triggerPoint = null, this.group = t.Group.findOrCreate({
                            name: this.options.group,
                            axis: this.axis
                        }), this.context = t.Context.findOrCreateByElement(this.options.context), t.offsetAliases[this.options.offset] && (this.options.offset = t.offsetAliases[this.options.offset]), this.group.add(this), this.context.add(this), n[this.key] = this, e += 1
                    }
                    var e = 0,
                        n = {};
                    t.prototype.queueTrigger = function(t) {
                        this.group.queueTrigger(this, t)
                    }, t.prototype.trigger = function(t) {
                        this.enabled && this.callback && this.callback.apply(this, t)
                    }, t.prototype.destroy = function() {
                        this.context.remove(this), this.group.remove(this), delete n[this.key]
                    }, t.prototype.disable = function() {
                        return this.enabled = !1, this
                    }, t.prototype.enable = function() {
                        return this.context.refresh(), this.enabled = !0, this
                    }, t.prototype.next = function() {
                        return this.group.next(this)
                    }, t.prototype.previous = function() {
                        return this.group.previous(this)
                    }, t.invokeAll = function(t) {
                        var e = [];
                        for (var i in n) e.push(n[i]);
                        for (var r = 0, s = e.length; s > r; r++) e[r][t]()
                    }, t.destroyAll = function() {
                        t.invokeAll("destroy")
                    }, t.disableAll = function() {
                        t.invokeAll("disable")
                    }, t.enableAll = function() {
                        t.invokeAll("enable")
                    }, t.refreshAll = function() {
                        t.Context.refreshAll()
                    }, t.viewportHeight = function() {
                        return window.innerHeight || document.documentElement.clientHeight
                    }, t.viewportWidth = function() {
                        return document.documentElement.clientWidth
                    }, t.adapters = [], t.defaults = {
                        context: window,
                        continuous: !0,
                        enabled: !0,
                        group: "default",
                        horizontal: !1,
                        offset: 0
                    }, t.offsetAliases = {
                        "bottom-in-view": function() {
                            return this.context.innerHeight() - this.adapter.outerHeight()
                        },
                        "right-in-view": function() {
                            return this.context.innerWidth() - this.adapter.outerWidth()
                        }
                    }, window.Waypoint = t
                }(),
                function() {
                    "use strict";

                    function t(t) {
                        window.setTimeout(t, 1e3 / 60)
                    }

                    function e(t) {
                        this.element = t, this.Adapter = r.Adapter, this.adapter = new this.Adapter(t), this.key = "waypoint-context-" + n, this.didScroll = !1, this.didResize = !1, this.oldScroll = {
                            x: this.adapter.scrollLeft(),
                            y: this.adapter.scrollTop()
                        }, this.waypoints = {
                            vertical: {},
                            horizontal: {}
                        }, t.waypointContextKey = this.key, i[t.waypointContextKey] = this, n += 1, this.createThrottledScrollHandler(), this.createThrottledResizeHandler()
                    }
                    var n = 0,
                        i = {},
                        r = window.Waypoint,
                        s = window.onload;
                    e.prototype.add = function(t) {
                        var e = t.options.horizontal ? "horizontal" : "vertical";
                        this.waypoints[e][t.key] = t, this.refresh()
                    }, e.prototype.checkEmpty = function() {
                        var t = this.Adapter.isEmptyObject(this.waypoints.horizontal),
                            e = this.Adapter.isEmptyObject(this.waypoints.vertical);
                        t && e && (this.adapter.off(".waypoints"), delete i[this.key])
                    }, e.prototype.createThrottledResizeHandler = function() {
                        function t() {
                            e.handleResize(), e.didResize = !1
                        }
                        var e = this;
                        this.adapter.on("resize.waypoints", function() {
                            e.didResize || (e.didResize = !0, r.requestAnimationFrame(t))
                        })
                    }, e.prototype.createThrottledScrollHandler = function() {
                        function t() {
                            e.handleScroll(), e.didScroll = !1
                        }
                        var e = this;
                        this.adapter.on("scroll.waypoints", function() {
                            (!e.didScroll || r.isTouch) && (e.didScroll = !0, r.requestAnimationFrame(t))
                        })
                    }, e.prototype.handleResize = function() {
                        r.Context.refreshAll()
                    }, e.prototype.handleScroll = function() {
                        var t = {},
                            e = {
                                horizontal: {
                                    newScroll: this.adapter.scrollLeft(),
                                    oldScroll: this.oldScroll.x,
                                    forward: "right",
                                    backward: "left"
                                },
                                vertical: {
                                    newScroll: this.adapter.scrollTop(),
                                    oldScroll: this.oldScroll.y,
                                    forward: "down",
                                    backward: "up"
                                }
                            };
                        for (var n in e) {
                            var i = e[n],
                                r = i.newScroll > i.oldScroll,
                                s = r ? i.forward : i.backward;
                            for (var a in this.waypoints[n]) {
                                var o = this.waypoints[n][a],
                                    h = i.oldScroll < o.triggerPoint,
                                    l = i.newScroll >= o.triggerPoint,
                                    p = h && l,
                                    u = !h && !l;
                                (p || u) && (o.queueTrigger(s), t[o.group.id] = o.group)
                            }
                        }
                        for (var c in t) t[c].flushTriggers();
                        this.oldScroll = {
                            x: e.horizontal.newScroll,
                            y: e.vertical.newScroll
                        }
                    }, e.prototype.innerHeight = function() {
                        return this.element == this.element.window ? r.viewportHeight() : this.adapter.innerHeight()
                    }, e.prototype.remove = function(t) {
                        delete this.waypoints[t.axis][t.key], this.checkEmpty()
                    }, e.prototype.innerWidth = function() {
                        return this.element == this.element.window ? r.viewportWidth() : this.adapter.innerWidth()
                    }, e.prototype.destroy = function() {
                        var t = [];
                        for (var e in this.waypoints)
                            for (var n in this.waypoints[e]) t.push(this.waypoints[e][n]);
                        for (var i = 0, r = t.length; r > i; i++) t[i].destroy()
                    }, e.prototype.refresh = function() {
                        var t, e = this.element == this.element.window,
                            n = e ? void 0 : this.adapter.offset(),
                            i = {};
                        this.handleScroll(), t = {
                            horizontal: {
                                contextOffset: e ? 0 : n.left,
                                contextScroll: e ? 0 : this.oldScroll.x,
                                contextDimension: this.innerWidth(),
                                oldScroll: this.oldScroll.x,
                                forward: "right",
                                backward: "left",
                                offsetProp: "left"
                            },
                            vertical: {
                                contextOffset: e ? 0 : n.top,
                                contextScroll: e ? 0 : this.oldScroll.y,
                                contextDimension: this.innerHeight(),
                                oldScroll: this.oldScroll.y,
                                forward: "down",
                                backward: "up",
                                offsetProp: "top"
                            }
                        };
                        for (var s in t) {
                            var a = t[s];
                            for (var o in this.waypoints[s]) {
                                var h, l, p, u, c, f = this.waypoints[s][o],
                                    m = f.options.offset,
                                    d = f.triggerPoint,
                                    v = 0,
                                    g = null == d;
                                f.element !== f.element.window && (v = f.adapter.offset()[a.offsetProp]), "function" == typeof m ? m = m.apply(f) : "string" == typeof m && (m = parseFloat(m), f.options.offset.indexOf("%") > -1 && (m = Math.ceil(a.contextDimension * m / 100))), h = a.contextScroll - a.contextOffset, f.triggerPoint = v + h - m, l = d < a.oldScroll, p = f.triggerPoint >= a.oldScroll, u = l && p, c = !l && !p, !g && u ? (f.queueTrigger(a.backward), i[f.group.id] = f.group) : !g && c ? (f.queueTrigger(a.forward), i[f.group.id] = f.group) : g && a.oldScroll >= f.triggerPoint && (f.queueTrigger(a.forward), i[f.group.id] = f.group)
                            }
                        }
                        return r.requestAnimationFrame(function() {
                            for (var t in i) i[t].flushTriggers()
                        }), this
                    }, e.findOrCreateByElement = function(t) {
                        return e.findByElement(t) || new e(t)
                    }, e.refreshAll = function() {
                        for (var t in i) i[t].refresh()
                    }, e.findByElement = function(t) {
                        return i[t.waypointContextKey]
                    }, window.onload = function() {
                        s && s(), e.refreshAll()
                    }, r.requestAnimationFrame = function(e) {
                        var n = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || t;
                        n.call(window, e)
                    }, r.Context = e
                }(),
                function() {
                    "use strict";

                    function t(t, e) {
                        return t.triggerPoint - e.triggerPoint
                    }

                    function e(t, e) {
                        return e.triggerPoint - t.triggerPoint
                    }

                    function n(t) {
                        this.name = t.name, this.axis = t.axis, this.id = this.name + "-" + this.axis, this.waypoints = [], this.clearTriggerQueues(), i[this.axis][this.name] = this
                    }
                    var i = {
                            vertical: {},
                            horizontal: {}
                        },
                        r = window.Waypoint;
                    n.prototype.add = function(t) {
                        this.waypoints.push(t)
                    }, n.prototype.clearTriggerQueues = function() {
                        this.triggerQueues = {
                            up: [],
                            down: [],
                            left: [],
                            right: []
                        }
                    }, n.prototype.flushTriggers = function() {
                        for (var n in this.triggerQueues) {
                            var i = this.triggerQueues[n],
                                r = "up" === n || "left" === n;
                            i.sort(r ? e : t);
                            for (var s = 0, a = i.length; a > s; s += 1) {
                                var o = i[s];
                                (o.options.continuous || s === i.length - 1) && o.trigger([n])
                            }
                        }
                        this.clearTriggerQueues()
                    }, n.prototype.next = function(e) {
                        this.waypoints.sort(t);
                        var n = r.Adapter.inArray(e, this.waypoints),
                            i = n === this.waypoints.length - 1;
                        return i ? null : this.waypoints[n + 1]
                    }, n.prototype.previous = function(e) {
                        this.waypoints.sort(t);
                        var n = r.Adapter.inArray(e, this.waypoints);
                        return n ? this.waypoints[n - 1] : null
                    }, n.prototype.queueTrigger = function(t, e) {
                        this.triggerQueues[e].push(t)
                    }, n.prototype.remove = function(t) {
                        var e = r.Adapter.inArray(t, this.waypoints);
                        e > -1 && this.waypoints.splice(e, 1)
                    }, n.prototype.first = function() {
                        return this.waypoints[0]
                    }, n.prototype.last = function() {
                        return this.waypoints[this.waypoints.length - 1]
                    }, n.findOrCreate = function(t) {
                        return i[t.axis][t.name] || new n(t)
                    }, r.Group = n
                }(),
                function() {
                    "use strict";

                    function t(t) {
                        return t === t.window
                    }

                    function e(e) {
                        return t(e) ? e : e.defaultView
                    }

                    function n(t) {
                        this.element = t, this.handlers = {}
                    }
                    var i = window.Waypoint;
                    n.prototype.innerHeight = function() {
                        var e = t(this.element);
                        return e ? this.element.innerHeight : this.element.clientHeight
                    }, n.prototype.innerWidth = function() {
                        var e = t(this.element);
                        return e ? this.element.innerWidth : this.element.clientWidth
                    }, n.prototype.off = function(t, e) {
                        function n(t, e, n) {
                            for (var i = 0, r = e.length - 1; r > i; i++) {
                                var s = e[i];
                                n && n !== s || t.removeEventListener(s)
                            }
                        }
                        var i = t.split("."),
                            r = i[0],
                            s = i[1],
                            a = this.element;
                        if (s && this.handlers[s] && r) n(a, this.handlers[s][r], e), this.handlers[s][r] = [];
                        else if (r)
                            for (var o in this.handlers) n(a, this.handlers[o][r] || [], e), this.handlers[o][r] = [];
                        else if (s && this.handlers[s]) {
                            for (var h in this.handlers[s]) n(a, this.handlers[s][h], e);
                            this.handlers[s] = {}
                        }
                    }, n.prototype.offset = function() {
                        if (!this.element.ownerDocument) return null;
                        var t = this.element.ownerDocument.documentElement,
                            n = e(this.element.ownerDocument),
                            i = {
                                top: 0,
                                left: 0
                            };
                        return this.element.getBoundingClientRect && (i = this.element.getBoundingClientRect()), {
                            top: i.top + n.pageYOffset - t.clientTop,
                            left: i.left + n.pageXOffset - t.clientLeft
                        }
                    }, n.prototype.on = function(t, e) {
                        var n = t.split("."),
                            i = n[0],
                            r = n[1] || "__default",
                            s = this.handlers[r] = this.handlers[r] || {},
                            a = s[i] = s[i] || [];
                        a.push(e), this.element.addEventListener(i, e)
                    }, n.prototype.outerHeight = function(e) {
                        var n, i = this.innerHeight();
                        return e && !t(this.element) && (n = window.getComputedStyle(this.element), i += parseInt(n.marginTop, 10), i += parseInt(n.marginBottom, 10)), i
                    }, n.prototype.outerWidth = function(e) {
                        var n, i = this.innerWidth();
                        return e && !t(this.element) && (n = window.getComputedStyle(this.element), i += parseInt(n.marginLeft, 10), i += parseInt(n.marginRight, 10)), i
                    }, n.prototype.scrollLeft = function() {
                        var t = e(this.element);
                        return t ? t.pageXOffset : this.element.scrollLeft
                    }, n.prototype.scrollTop = function() {
                        var t = e(this.element);
                        return t ? t.pageYOffset : this.element.scrollTop
                    }, n.extend = function() {
                        function t(t, e) {
                            if ("object" == typeof t && "object" == typeof e)
                                for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
                            return t
                        }
                        for (var e = Array.prototype.slice.call(arguments), n = 1, i = e.length; i > n; n++) t(e[0], e[n]);
                        return e[0]
                    }, n.inArray = function(t, e, n) {
                        return null == e ? -1 : e.indexOf(t, n)
                    }, n.isEmptyObject = function(t) {
                        for (var e in t) return !1;
                        return !0
                    }, i.adapters.push({
                        name: "noframework",
                        Adapter: n
                    }), i.Adapter = n
                }(), r("undefined" != typeof waypoints ? waypoints : window.waypoints)
            }).call(t, void 0, void 0, void 0, void 0, function(t) {
                e.exports = t
            })
        }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
    }, {}],
    10: [function(t, e, n) {
        (function(t) {
            (function(t, e, n, i, r) {
                /*!
                Waypoints Inview Shortcut - 4.0.0
                Copyright © 2011-2015 Caleb Troughton
                Licensed under the MIT license.
                https://github.com/imakewebthings/waypoints/blog/master/licenses.txt
                */
                ! function() {
                    "use strict";

                    function t() {}

                    function e(t) {
                        this.options = n.Adapter.extend({}, e.defaults, t), this.axis = this.options.horizontal ? "horizontal" : "vertical", this.waypoints = [], this.element = this.options.element, this.createWaypoints()
                    }
                    var n = window.Waypoint;
                    e.prototype.createWaypoints = function() {
                        for (var t = {
                                vertical: [{
                                    down: "enter",
                                    up: "exited",
                                    offset: "100%"
                                }, {
                                    down: "entered",
                                    up: "exit",
                                    offset: "bottom-in-view"
                                }, {
                                    down: "exit",
                                    up: "entered",
                                    offset: 0
                                }, {
                                    down: "exited",
                                    up: "enter",
                                    offset: function() {
                                        return -this.adapter.outerHeight()
                                    }
                                }],
                                horizontal: [{
                                    right: "enter",
                                    left: "exited",
                                    offset: "100%"
                                }, {
                                    right: "entered",
                                    left: "exit",
                                    offset: "right-in-view"
                                }, {
                                    right: "exit",
                                    left: "entered",
                                    offset: 0
                                }, {
                                    right: "exited",
                                    left: "enter",
                                    offset: function() {
                                        return -this.adapter.outerWidth()
                                    }
                                }]
                            }, e = 0, n = t[this.axis].length; n > e; e++) {
                            var i = t[this.axis][e];
                            this.createWaypoint(i)
                        }
                    }, e.prototype.createWaypoint = function(t) {
                        var e = this;
                        this.waypoints.push(new n({
                            context: this.options.context,
                            element: this.options.element,
                            enabled: this.options.enabled,
                            handler: function(t) {
                                return function(n) {
                                    e.options[t[n]].call(e, n)
                                }
                            }(t),
                            offset: t.offset,
                            horizontal: this.options.horizontal
                        }))
                    }, e.prototype.destroy = function() {
                        for (var t = 0, e = this.waypoints.length; e > t; t++) this.waypoints[t].destroy();
                        this.waypoints = []
                    }, e.prototype.disable = function() {
                        for (var t = 0, e = this.waypoints.length; e > t; t++) this.waypoints[t].disable()
                    }, e.prototype.enable = function() {
                        for (var t = 0, e = this.waypoints.length; e > t; t++) this.waypoints[t].enable()
                    }, e.defaults = {
                        context: window,
                        enabled: !0,
                        enter: t,
                        entered: t,
                        exit: t,
                        exited: t
                    }, n.Inview = e
                }(), r("undefined" != typeof waypointsInview ? waypointsInview : window.waypointsInview)
            }).call(t, void 0, void 0, void 0, void 0, function(t) {
                e.exports = t
            })
        }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
    }, {}],
    11: [function(t, e, n) {
        function i(t, e) {
            this.element = t, this.options = r.extend({}, a, e), this._create()
        }
        var r = t("lodash"),
            s = t("bodymovin"),
            a = {
                containerSelector: ".js-Bodymovin-container",
                boundingBoxSelector: ".js-Bodymovin-boundingBox",
                headerSelector: "[data-scroll-header]",
                trollChance: .2,
                flipChance: .5,
                scaleChance: 1 / 3,
                isFlipped: !1,
                isScaled: !1,
                delay: 2e3,
                pause: 5e3,
                safeZone: 8
            };
        i.prototype = {
            _getCreateOptions: function() {
                return JSON.parse(this.element.getAttribute("data-options"))
            },
            _create: function() {
                this.options = r.extend({}, this.options, this._getCreateOptions()), this.container = document.querySelector(this.options.containerSelector), this.animationData = JSON.parse(this.container.getAttribute("data-animation")), this.boundingBox = this.container.querySelectorAll(this.options.boundingBoxSelector), this.headerHeight = document.querySelector(this.options.headerSelector).offsetHeight, window.setTimeout(this._init.bind(this), this.options.delay)
            },
            _init: function() {
                this.d = new Date, this.flag = !0, 0 === this._getRandomInt(this.options.flipChance) ? this._setOption("isFlipped", !0) : this._setOption("isFlipped", !1), 0 === this._getRandomInt(this.options.scaleChance) ? this._setOption("isScaled", !0) : this._setOption("isScaled", !1);
                var t = 0;
                0 === this._getRandomInt(this.options.trollChance) && (t = 1);
                var e = {
                    container: this.element,
                    renderer: "svg",
                    loop: !1,
                    name: "test",
                    autoplay: !0,
                    animationData: r.sample(this.animationData[t])
                };
                this.animation = s.loadAnimation(e), this.animation.addEventListener("complete", this._handleComplete.bind(this)), this._setCoordinates()
            },
            _handleComplete: function(t) {
                this.animation.destroy(), window.setTimeout(this._init.bind(this), this.options.pause)
            },
            _setCoordinates: function() {
                var t = this._getCoordinates();
                this.element.style.left = t.x + "px", this.element.style.top = t.y + "px", r.each(this.boundingBox, function(t) {
                    return this.element !== t && this._isCollide(this.element.getBoundingClientRect(), t.getBoundingClientRect()) ? (this._setCoordinates(), !1) : void 0
                }.bind(this))
            },
            _getCoordinates: function() {
                var t = this.container.getBoundingClientRect(),
                    e = this.element.getBoundingClientRect(),
                    n = t.width - e.width,
                    i = t.height - e.height;
                return x = Math.floor(this._getMinMaxInt(this.options.safeZone, n - this.options.safeZone)), y = Math.floor(this._getMinMaxInt(this.options.safeZone, i - this.options.safeZone)), {
                    x: x,
                    y: y
                }
            },
            _isCollide: function(t, e) {
                return t.left < e.left + e.width && t.left + t.width > e.left && t.top < e.top + e.height && t.height + t.top > e.top
            },
            _getRandomInt: function(t) {
                return Math.floor(Math.random() / t)
            },
            _getMinMaxInt: function(t, e) {
                return Math.floor(Math.random() * (e - t)) + t
            },
            _setOption: function(t, e) {
                ("isFlipped" === t || "isScaled" === t) && (e ? this.element.classList.add(r.kebabCase(t)) : this.element.classList.remove(r.kebabCase(t))), this.options[t] = e
            }
        }, e.exports = i
    }, {
        bodymovin: 1,
        lodash: 4
    }],
    12: [function(t, e, n) {
        function i(t, e) {
            this.element = t, this.options = r.extend({}, s, e), this._create()
        }
        var r = t("lodash"),
            s = {
                targetSelector: "html",
                isFun: !1
            };
        i.prototype = {
            _getCreateOptions: function() {
                return JSON.parse(this.element.getAttribute("data-options"))
            },
            _create: function() {
                this.options = r.extend({}, this.options, this._getCreateOptions()), this.target = document.querySelector(this.options.targetSelector), this.element.addEventListener("click", this._handleClick.bind(this)), this.defaultText = this.element.textContent, this._setOption("isFun", this.options.isFun)
            },
            _handleClick: function() {
                this._setOption("isFun", !this.options.isFun)
            },
            _setOption: function(t, e) {
                "isFun" === t && (e ? (this.target.classList.add(r.kebabCase(t)), this.element.textContent = this.options.text) : (this.target.classList.remove(r.kebabCase(t)), this.element.textContent = this.defaultText)), this.options[t] = e
            }
        }, e.exports = i
    }, {
        lodash: 4
    }],
    13: [function(t, e, n) {
        function i(t, e) {
            this.element = t, this.options = r.extend({}, s, e), this._create()
        }
        var r = t("lodash"),
            s = {
                duration: 800,
                isSwitched: !1
            };
        i.prototype = {
            _create: function() {
                this.interval = window.setInterval(this._handleInterval.bind(this), this.options.duration)
            },
            _handleInterval: function() {
                this._setOption("isSwitched", !this.options.isSwitched)
            },
            _setOption: function(t, e) {
                "isSwitched" === t && (e ? this.element.classList.add(r.kebabCase(t)) : this.element.classList.remove(r.kebabCase(t))), this.options[t] = e
            }
        }, e.exports = i
    }, {
        lodash: 4
    }],
    14: [function(t, e, n) {
        "use strict";
        e.exports = "M62.0993368,38.9484566 C61.5936368,35.4078577 59.9757674,32.1195906 57.4793368,29.5584566 C56.968924,29.0417421 56.4207416,28.5637538 55.8393368,28.1284566 C55.9893368,22.4984566 53.1293368,16.9784566 46.5293368,13.4884566 C47.3713852,12.8735782 48.0145995,12.0252307 48.3793368,11.0484566 C52.9593368,-1.17154342 5.17933683,-0.951543418 10.2993368,11.3284566 C10.8000371,12.3671802 11.6443717,13.2009164 12.6893368,13.6884566 C7.05933683,17.1384566 4.20933683,22.4384566 2.83933683,27.6884566 C-1.08066317,42.6884566 4.11933683,52.5084566 11.7593368,57.8084566 C12.8493368,71.3084566 10.3893368,98.7084566 21.6293368,100.938457 C38.6893368,104.338457 33.6293368,75.3484566 30.6293368,62.3084566 C32.0642149,62.076794 33.4605526,61.649481 34.7793368,61.0384566 C35.2479114,61.5858725 35.7668561,62.0880771 36.3293368,62.5384566 C42.7793368,69.0684566 53.5193368,67.6084566 53.0393368,51.8484566 C58.3993368,52.9384566 63.6993368,49.1884566 62.0993368,38.9484566 L62.0993368,38.9484566 Z"
    }, {}],
    15: [function(t, e, n) {
        "use strict";
        e.exports = "M63.22,38.63 C62.6753708,34.8272135 60.9224397,31.3003161 58.22,28.57 C57.7990087,28.1521827 57.3549822,27.7582344 56.89,27.39 C56.84,21.57 53.78,16.45 48.36,13.09 C48.7754824,12.5503403 49.1121805,11.9543846 49.36,11.32 C50.36,8.78 49.48,6.39 47.02,4.59 C39.59,-0.84 18.02,-0.65 11.02,4.89 C8.69,6.73 8.02,9.12 9.02,11.64 C9.33990434,12.3612324 9.81043874,13.00566 10.4,13.53 C5.91350569,16.9094666 2.76495725,21.765102 1.51,27.24 C-3.15,45.05 4.87,54.24 10.43,58.31 C10.63,61.04 10.69,64.31 10.77,67.78 C11.13,82.17 11.49,100 21.29,102 C22.2278435,102.193347 23.1824535,102.293832 24.14,102.3 C26.6303081,102.383279 29.0405767,101.41409 30.78,99.63 C37.02,93.19 34.95,76.48 31.94,63.12 C32.7578417,62.9269024 33.5600828,62.6728594 34.34,62.36 C34.672156,62.7150901 35.0261793,63.0490744 35.4,63.36 C37.6571617,65.766896 40.7726341,67.1862865 44.07,67.31 C45.2622231,67.314956 46.4429381,67.0767714 47.54,66.61 C50,65.5 54,62.35 54.11,53.07 L54.67,53.07 C56.8130177,53.1047139 58.8856211,52.3050763 60.45,50.84 C62.29,49.11 64.28,45.55 63.22,38.63 L63.22,38.63 Z M29,97.95 C27.28,99.72 24.9,100.27 21.71,99.64 C13.81,98.07 13.45,80.55 13.19,67.76 C13.18,65 13.12,62.31 13,59.93 C17.222923,62.3355785 21.9901986,63.6229151 26.85,63.67 C27.7525329,63.6656744 28.6540521,63.6089121 29.55,63.5 C33.5,81 33.32,93.53 29,97.95 L29,97.95 Z M30.29,61 C23.9786591,61.8782911 17.5683256,60.3426681 12.34,56.7 C7.34,53.19 -0.52,44.78 3.9,27.87 C5.47,21.87 8.6,17.41 13.22,14.57 C16.6785476,12.5556214 20.5490081,11.352086 24.54,11.05 C25.1999803,10.9837258 25.6812742,10.3949803 25.615,9.735 C25.5487258,9.07501972 24.9599803,8.59372583 24.3,8.66 C20.1938108,8.98936166 16.2034407,10.1820427 12.59,12.16 C12.0423851,11.8029301 11.6004042,11.3057016 11.31,10.72 C10.91,9.72 10.61,8.32 12.56,6.78 C18.72,1.92 39.13,1.78 45.65,6.53 C47.75,8.06 47.52,9.53 47.16,10.48 C46.9475853,11.0147608 46.6391805,11.506175 46.25,11.93 C43.6310659,10.6790451 40.8564081,9.78442816 38,9.27 C37.5784266,9.19140156 37.1469449,9.34368034 36.86809,9.6694744 C36.5892351,9.99526845 36.5053715,10.4450819 36.64809,10.8494744 C36.7908085,11.2538669 37.1384266,11.5514016 37.56,11.63 C40.4627082,12.1317546 43.2738932,13.0654455 45.9,14.4 C50.9,17.04 53.9,21.03 54.46,25.78 C52.0732039,24.403366 49.2003493,24.1508476 46.61,25.09 C44.07,26.16 42.41,28.64 41.95,32.09 C41.950001,33.3999994 41.95,33.059781 41.95,33.4 C39.4646845,32.8149608 36.8478225,33.3485668 34.79,34.86 C33.1890572,36.0651638 31.9871075,37.723506 31.34,39.62 C29.8881197,38.9521293 28.3950834,38.3776277 26.87,37.9 C28.9461239,35.3947106 29.8196618,32.105237 29.26,28.9 C28.8013151,26.5654373 27.6678488,24.416719 26,22.72 C25.5324972,22.2816969 24.8031011,22.2880708 24.3433295,22.734477 C23.8835578,23.1808833 23.8556752,23.909774 24.28,24.39 C25.6343339,25.7608867 26.5558581,27.4996116 26.93,29.39 C27.3870706,32.2685456 26.4218766,35.1902137 24.34,37.23 C19.17,35.9 14,35.61 11.06,36.67 C10.4359182,36.8964367 10.1135633,37.5859182 10.34,38.21 C10.5664367,38.8340818 11.2559182,39.1564367 11.88,38.93 C15.51,37.62 24.67,38.81 31.48,42.37 C36.37,44.93 41.48,49.37 38.03,56.27 C37.1678651,57.8655566 35.7891785,59.1208313 34.12,59.83 C32.8754153,60.3896641 31.6004466,60.783256 30.29,61 Z M46.55,64.36 C43.65,65.6 39.9,64.51 37,61.57 L36.86,61.45 L36.55,61.19 C38.061835,60.2564642 39.2948723,58.9336258 40.12,57.36 C43.32,51 40.86,44.98 33.41,40.74 C33.8783333,39.1805795 34.8223405,37.8065246 36.11,36.81 C37.6153314,35.6937731 39.5378896,35.3019374 41.36,35.74 C41.8306025,35.8613802 42.2891652,36.0253917 42.73,36.23 C44.0552012,36.8707021 45.2543057,37.7446257 46.27,38.81 C49.6346372,42.3132312 51.5586685,46.953752 51.66,51.81 C51.9,58.28 50,62.88 46.59,64.35 L46.55,64.36 Z M58.75,49.14 C57.4639197,50.3154878 55.7303788,50.8738705 54,50.67 C53.656793,45.5850726 51.5323392,40.783807 48,37.11 C46.9356763,36.0154386 45.711816,35.0882716 44.37,34.36 C44.3101353,33.6950756 44.2834355,33.0275815 44.29,32.36 C44.65,29.8 45.76,28.07 47.5,27.36 C49.58,26.48 52.5,27.11 55.01,29 C55.5529002,29.4040036 56.0643679,29.8486128 56.54,30.33 C58.8602051,32.688229 60.3667124,35.7257681 60.84,39 C61.55,43.6 60.82,47.2 58.79,49.13 L58.75,49.14 Z"
    }, {}],
    16: [function(t, e, n) {
        e.exports = [{
            featureType: "administrative",
            elementType: "all",
            stylers: [{
                color: "#a0a0a0"
            }, {
                visibility: "simplified"
            }]
        }, {
            featureType: "administrative.neighborhood",
            elementType: "labels.text",
            stylers: [{
                visibility: "off"
            }]
        }, {
            featureType: "landscape",
            elementType: "all",
            stylers: [{
                visibility: "simplified"
            }]
        }, {
            featureType: "landscape",
            elementType: "geometry.fill",
            stylers: [{
                color: "#ffffff"
            }]
        }, {
            featureType: "landscape.man_made",
            elementType: "all",
            stylers: [{
                visibility: "simplified"
            }]
        }, {
            featureType: "landscape.man_made",
            elementType: "labels",
            stylers: [{
                visibility: "off"
            }]
        }, {
            featureType: "poi",
            elementType: "all",
            stylers: [{
                visibility: "off"
            }]
        }, {
            featureType: "road",
            elementType: "all",
            stylers: [{
                visibility: "simplified"
            }]
        }, {
            featureType: "road",
            elementType: "geometry.fill",
            stylers: [{
                visibility: "on"
            }, {
                color: "#e6e6e6"
            }]
        }, {
            featureType: "road",
            elementType: "geometry.stroke",
            stylers: [{
                color: "#9b5a5a"
            }, {
                weight: "1.00"
            }, {
                visibility: "off"
            }]
        }, {
            featureType: "road",
            elementType: "labels",
            stylers: [{
                visibility: "off"
            }]
        }, {
            featureType: "road.highway",
            elementType: "geometry",
            stylers: [{
                visibility: "simplified"
            }]
        }, {
            featureType: "road.highway.controlled_access",
            elementType: "all",
            stylers: [{
                visibility: "simplified"
            }]
        }, {
            featureType: "road.highway.controlled_access",
            elementType: "labels",
            stylers: [{
                visibility: "off"
            }]
        }, {
            featureType: "road.arterial",
            elementType: "all",
            stylers: [{
                visibility: "simplified"
            }]
        }, {
            featureType: "road.arterial",
            elementType: "labels",
            stylers: [{
                visibility: "off"
            }]
        }, {
            featureType: "transit",
            elementType: "all",
            stylers: [{
                visibility: "off"
            }]
        }, {
            featureType: "transit",
            elementType: "labels",
            stylers: [{
                visibility: "off"
            }]
        }, {
            featureType: "transit.station",
            elementType: "all",
            stylers: [{
                visibility: "off"
            }]
        }, {
            featureType: "water",
            elementType: "geometry.fill",
            stylers: [{
                color: "#4bb6ed"
            }]
        }, {
            featureType: "water",
            elementType: "labels",
            stylers: [{
                visibility: "off"
            }]
        }]
    }, {}],
    17: [function(t, e, n) {
        "use strict";
        e.exports = {
            loadScript: function(t) {
                var e;
                e = document.createElement("script"), e.type = "text/javascript", e.src = t, document.body.appendChild(e)
            }
        }
    }, {}],
    18: [function(t, e, n) {
        function i(t, e) {
            this.element = t, this.options = s.extend({}, o, e), this._create()
        }
        var r = t("vanilla-pubsub"),
            s = t("lodash"),
            a = t("./lib/utils.js"),
            o = {
                coordinates: {
                    lat: 53.5625856,
                    lng: 9.9642923
                },
                mapOptions: {
                    zoom: 15,
                    draggable: !1,
                    zoomControl: !1,
                    scrollwheel: !1,
                    disableDefaultUI: !0,
                    mapTypeId: "roadmap",
                    styles: t("./lib/styles.js")
                }
            };
        i.prototype = {
            _create: function() {
                window.initialize = this._initialize.bind(this), a.loadScript("https://maps.googleapis.com/maps/api/js?sensor=false&callback=initialize&key=AIzaSyCuuwHTOuA-I8CzAYmnWc__t3pL8Sn3ie8")
            },
            _initialize: function() {
                this.options.mapOptions.zoomControlOptions = {
                    style: google.maps.ZoomControlStyle.SMALL,
                    position: google.maps.ControlPosition.TOP_RIGHT
                }, this._createPoint(), this._createMap()
            },
            _bind: function() {
                window.addEventListener("load", this._centerMap.bind(this)), window.addEventListener("resize", this._centerMap.bind(this)), window.addEventListener("orientationchange", this._centerMap.bind(this))
            },
            _createPoint: function() {
                this._setOption("point", new google.maps.LatLng(this.options.coordinates.lat, this.options.coordinates.lng))
            },
            _createMap: function() {
                this._setOption("map", new google.maps.Map(this.element, this.options.mapOptions)), google.maps.event.addListenerOnce(this.options.map, "idle", this._handleMapIdle.bind(this))
            },
            _centerMap: function() {
                this.options.map.panTo(this.options.point)
            },
            _createMarker: function() {
                r.publish("Map.ready")
            },
            _handleMarkerClick: function() {
                window.location.href = this.url
            },
            _handleMapIdle: function() {
                this._centerMap(), this._createMarker(), this._bind()
            },
            _setOption: function(t, e) {
                this.options[t] = e
            },
            scale: function(e) {
                var n = {
                        origin: new google.maps.Point(0, 0),
                        anchor: new google.maps.Point(45.63 - 25.5, 98.94),
                        size: new google.maps.Size(60.89, 99.22),
                        scaledSize: new google.maps.Size(60.89, 99.22),
                        scale: e,
                        fillOpacity: 1,
                        strokeWeight: 0
                    },
                    i = s.extend({}, n, {
                        path: t("./lib/fill.js"),
                        fillColor: "#fff"
                    }),
                    r = s.extend({}, n, {
                        path: t("./lib/outline.js"),
                        fillColor: "#0A0A0A"
                    }),
                    a = {
                        map: this.options.map,
                        position: this.options.point,
                        animation: google.maps.Animation.DROP,
                        shape: null,
                        shadow: null,
                        url: "https://www.google.de/maps/place/Make+Studio/@53.5493202,9.9455639,17z/data=!3m1!4b1!4m2!3m1!1s0x47b18f7b6ef85ccb:0x49fdfd6ecdefb293?hl=en"
                    };
                this.markers && s.each(this.markers, function(t) {
                    t.setMap(null)
                }), this.markers = s.map([i, r], function(t) {
                    return new google.maps.Marker(s.extend({}, a, {
                        icon: t
                    }))
                }), this.markers[1].addListener("click", this._handleMarkerClick)
            }
        }, e.exports = i
    }, {
        "./lib/fill.js": 14,
        "./lib/outline.js": 15,
        "./lib/styles.js": 16,
        "./lib/utils.js": 17,
        lodash: 4,
        "vanilla-pubsub": 8
    }],
    19: [function(t, e, n) {
        function i(t, e) {
            this.element = t, this.options = r.extend({}, h, e), this._create()
        }
        var r = t("lodash"),
            s = t("smooth-scroll"),
            a = t("vanilla-pubsub"),
            o = t("enquire.js"),
            h = {
                isOpen: !1,
                selectorHeader: "[data-scroll-header]"
            },
            l = new s;
        i.prototype = {
            _create: function() {
                this.button = this.element.querySelector(".js-Menu-button"), this.close = this.element.querySelector(".js-Menu-close"), this.background = this.element.querySelector(".js-Menu-background"), this.links = this.element.querySelectorAll(".js-Menu-link"), this.button.addEventListener("click", this._toggle.bind(this)), this.background.addEventListener("click", this._close.bind(this)), this.close.addEventListener("click", this._close.bind(this)), r.each(this.links, function(t) {
                    t.addEventListener("click", this._handleLinkClick.bind(this))
                }.bind(this)), this.title = this.element.querySelector(".js-Menu-title"), this.titleDefault = this.title.textContent, o.register(window.lazySizesConfig.customMedia["--sm-viewport"], {
                    match: this._handleMatch.bind(this),
                    unmatch: this._handleUnmatch.bind(this)
                }), this.menuBar = this.element.querySelector(".js-Menu-bar"), this.menuBarDefault = ["u-bgColorWhite", "u-colorBlack"], a.subscribe("ScrollSpy.addColor", this._handleAddColor.bind(this)), a.subscribe("ScrollSpy.removeColor", this._handleRemoveColor.bind(this))
            },
            _handleAddColor: function(t) {
                r.each(this.menuBarDefault, function(t) {
                    this.menuBar.classList.remove(t)
                }.bind(this)), r.each(t.classes, function(t) {
                    this.menuBar.classList.add(t)
                }.bind(this))
            },
            _handleRemoveColor: function(t) {
                r.each(t.classes, function(t) {
                    this.menuBar.classList.remove(t)
                }.bind(this)), r.each(this.menuBarDefault, function(t) {
                    this.menuBar.classList.add(t)
                }.bind(this))
            },
            _handleLinkClick: function(t) {
                var e = t.target,
                    n = e.getAttribute("href") || e.parentNode.getAttribute("href"),
                    i = (document.querySelector(this.options.selectorHeader).offsetHeight, {
                        speed: 500,
                        offset: -1,
                        updateURL: !1
                    });
                n = n.substr(n.indexOf("#"), n.length), document.querySelector(n) && (t.preventDefault(), l.animateScroll(document.querySelector(n), e, i), this._close())
            },
            _handleScrollSpy: function(t) {
                this.title.textContent = "Make " + t.text
            },
            _handleMatch: function() {
                a.subscribe("ScrollSpy.active", this._handleScrollSpy.bind(this))
            },
            _handleUnmatch: function() {
                a.unsubscribe("ScrollSpy.active", this._handleScrollSpy.bind(this)), this.title.textContent = this.titleDefault
            },
            _toggle: function(t) {
                this._setOption("isOpen", !this.options.isOpen)
            },
            _close: function(t) {
                this._setOption("isOpen", !1)
            },
            _setOption: function(t, e) {
                "isOpen" === t && (e ? this.element.classList.add(r.kebabCase(t)) : this.element.classList.remove(r.kebabCase(t))), this.options[t] = e
            }
        }, e.exports = i
    }, {
        "enquire.js": 2,
        lodash: 4,
        "smooth-scroll": 6,
        "vanilla-pubsub": 8
    }],
    20: [function(t, e, n) {
        function i(t, e) {
            this.element = t, this.options = r.extend({}, a, e), this._create()
        }
        t("waypoints"), t("waypointsInview");
        var r = t("lodash"),
            s = t("vanilla-pubsub"),
            a = {
                isActive: !1,
                selectorHeader: "[data-scroll-header]"
            };
        i.prototype = {
            _create: function() {
                this.headerHeight = document.querySelector(this.options.selectorHeader).offsetHeight, this.id = this.element.getAttribute("href"), this.id = this.id.substr(this.id.indexOf("#"), this.id.length), this.targetElem = document.querySelector(this.id), this.targetElem && (new window.Waypoint({
                    element: this.targetElem,
                    handler: this._handleTop.bind(this),
                    offset: this._calculateTopOffset.bind(this)
                }), new window.Waypoint({
                    element: this.targetElem,
                    handler: this._handleBottom.bind(this),
                    offset: this._calculateBottomOffset.bind(this)
                }))
            },
            _calculateTopOffset: function() {
                var t = document.querySelector(this.options.selectorHeader).offsetHeight + 1;
                return t
            },
            _calculateBottomOffset: function() {
                var t = this.targetElem.clientHeight,
                    e = document.querySelector(this.options.selectorHeader).offsetHeight + 1;
                return -t + e
            },
            _handleTop: function(t) {
                "down" === t && this._setOption("isActive", !0)
            },
            _handleBottom: function(t) {
                "up" === t && this._setOption("isActive", !0)
            },
            _setOption: function(t, e) {
                if ("isActive" === t && e) {
                    var n = this.element.textContent.trim(),
                        i = "Make ",
                        a = n.indexOf(i >= -1);
                    a && (n = n.replace(i, "")), s.publish("ScrollSpy.active", {
                        text: n
                    }), this.targetElem.classList.contains("u-bgColorBlack") && this.targetElem.classList.contains("u-colorWhite") ? s.publish("ScrollSpy.addColor", {
                        classes: ["u-bgColorBlack", "u-colorWhite"]
                    }) : s.publish("ScrollSpy.removeColor", {
                        classes: ["u-bgColorBlack", "u-colorWhite"]
                    });
                    var o = document.querySelectorAll(".js-ScrollSpy");
                    r.each(o, function(e) {
                        e.getAttribute("href") !== this.element.getAttribute("href") && e.classList.remove(r.kebabCase(t))
                    }.bind(this)), this.element.classList.add(r.kebabCase(t))
                }
                this.options[t] = e
            }
        }, e.exports = i
    }, {
        lodash: 4,
        "vanilla-pubsub": 8,
        waypoints: 9,
        waypointsInview: 10
    }],
    21: [function(t, e, n) {
        function i(t, e) {
            this.element = t, this.options = r.extend({}, a, e), this._create()
        }
        t("waypoints");
        var r = t("lodash"),
            s = t("vanilla-pubsub"),
            a = {
                isOpen: !1
            };
        i.prototype = {
            _create: function() {
                window.Modernizr.touchevents && (this.element.addEventListener("click", this._toggle.bind(this)), s.subscribe("Teaser.open", this._handleOpen.bind(this)))
            },
            _handleOpen: function(t) {
                t.element !== this.element && this._close()
            },
            _toggle: function(t) {
                "A" != t.target.tagName && (t.preventDefault(), this._setOption("isOpen", !this.options.isOpen))
            },
            _close: function(t) {
                this._setOption("isOpen", !1)
            },
            _setOption: function(t, e) {
                "isOpen" === t && (e ? (this.element.classList.add(r.kebabCase(t)), s.publish("Teaser.open", {
                    element: this.element
                })) : this.element.classList.remove(r.kebabCase(t))), this.options[t] = e
            }
        }, e.exports = i
    }, {
        lodash: 4,
        "vanilla-pubsub": 8,
        waypoints: 9
    }],
    22: [function(t, e, n) {
        function i(t, e) {
            this.element = t, this.options = r.extend({}, s, e), this._create()
        }
        t("waypoints");
        var r = t("lodash"),
            s = {
                containerSelector: ".js-Typewriter-container",
                measureSelector: ".js-Typewriter-measure",
                headerSelector: "[data-scroll-header]",
                speed: 20,
                index: 0,
                pause: 1e3,
                isInView: !1
            };
        i.prototype = {
            _getCreateOptions: function() {
                return JSON.parse(this.element.getAttribute("data-options"))
            },
            _create: function() {
                this.options = r.extend({}, this.options, this._getCreateOptions()), this.defaults = r.extend({}, this.options, this._getCreateOptions()), this.measure = document.querySelector(this.options.measureSelector), this._setOption("total", this.options.suffix.length), this.element.style.height = this._getMaxHeight() + "px", this._setOption("text", ""), this.container = document.querySelector(this.options.containerSelector), this.headerHeight = document.querySelector(this.options.headerSelector).offsetHeight, this._testStringWidth(), this.waypoint = new window.Waypoint({
                    element: this.container,
                    handler: this._handleWaypoint.bind(this),
                    offset: "50%"
                })
            },
            _handleWaypoint: function() {
                this.flag || (this.flag = !0, this._setOption("isInView", !0), this._write(this.options.prefix + " " + this.options.suffix[this.options.index], 0))
            },
            _breakString: function(t, e, n) {
                var i = t.split(" ");
                return e.textContent = "", r.each(i, function(r, s) {
                    if (e.textContent += r, s < i.length - 1 && (e.textContent += " "), e.getBoundingClientRect().width > n) {
                        var a = t.replace(r, "\n" + r);
                        return t = this._breakString(a, e, n), !1
                    }
                }.bind(this)), t
            },
            _testStringWidth: function() {
                this._setOption("isNoWrap", !0);
                var t = this.element.getBoundingClientRect().width,
                    e = r.map(this.options.suffix, function(t) {
                        return this.options.prefix + " " + t
                    }.bind(this));
                result = r.map(e, function(e) {
                    return this._breakString(e, this.measure, t)
                }.bind(this)), r.each(e, function(t, e) {
                    this.options.suffix[e] = result[e].replace(this.options.prefix + " ", "")
                }.bind(this))
            },
            _getElementWidth: function(t) {
                return t.getBoundingClientRect().width
            },
            _getMaxHeight: function() {
                var t = 0;
                return r.each(this.options.suffix, function(e) {
                    this.measure.textContent = this.options.prefix + " " + e;
                    var n = this.measure.getBoundingClientRect().height;
                    n > t && (t = n)
                }.bind(this)), t
            },
            _write: function(t, e) {
                this._setOption("text", t.substr(0, e)), e < t.length ? window.setTimeout(this._write.bind(this, t, e + 1), this.options.speed) : window.setTimeout(this._onComplete.bind(this), this.options.pause)
            },
            _onComplete: function() {
                this._setOption("index", this.options.index + 1)
            },
            _setOption: function(t, e) {
                "text" === t && (this.measure.textContent = e), ("isNoWrap" === t || "isInView" === t) && (e ? this.element.classList.add(r.kebabCase(t)) : this.element.classList.remove(r.kebabCase(t))), "index" === t && e < this.options.total && this._write(this.options.prefix + " " + this.options.suffix[e], this.options.prefix.length), this.options[t] = e
            }
        }, e.exports = i
    }, {
        lodash: 4,
        waypoints: 9
    }],
    23: [function(t, e, n) {
        e.exports = {
            "--sm-viewport": "(max-width: 639px)",
            "--md-viewport": "(min-width: 640px) and (max-width: 959px)",
            "--lg-viewport": "(min-width: 960px)",
            "--xl-viewport": "(min-width: 1600px)"
        }
    }, {}],
    24: [function(t, e, n) {
        "use strict";
        ! function(e, n, i) {
            function r(t) {
                "loading" != n.readyState ? t() : n.addEventListener("DOMContentLoaded", t)
            }
            if ("visibilityState" in n) {
                t("picturefill"), t("lazysizes");
                var s = t("lodash"),
                    a = t("./custom-media.js"),
                    o = t("svg4everybody");
                o(), e.lazySizesConfig = e.lazySizesConfig || {}, e.lazySizesConfig.customMedia = a;
                var h = {
                    constructors: {
                        ImageSwitch: t("./components/image-switch/image-switch.js"),
                        Menu: t("./components/menu/menu.js"),
                        ScrollSpy: t("./components/scroll-spy/scroll-spy.js"),
                        Map: t("./components/map/map.js"),
                        Teaser: t("./components/teaser/teaser.js"),
                        Bodymovin: t("./components/bodymovin/bodymovin.js"),
                        Typewriter: t("./components/typewriter/typewriter.js"),
                        Fun: t("./components/fun/fun.js")
                    },
                    components: {}
                };
                r(function() {
                    function i(t, e) {
                        var i = n.querySelector(t);
                        if (i) {
                            var r = new XMLHttpRequest;
                            r.open("GET", e, !0), r.onload = function() {
                                if (this.status >= 200 && this.status < 400) {
                                    var t = this.response;
                                    i.innerHTML = t
                                }
                            }, r.onerror = function() {}, r.send()
                        }
                    }
                    var r = s.keys(h.constructors);
                    s.each(r, function(t) {
                        var e = ".js-" + t,
                            i = n.querySelectorAll(e);
                        h.components[t] = s.map(i, function(e) {
                            return new h.constructors[t](e)
                        })
                    });
                    var o = t("enquire.js"),
                        l = t("vanilla-pubsub"),
                        p = function() {
                            var t = {
                                "--sm-viewport": .5,
                                "--md-viewport": .75,
                                "--lg-viewport": 1,
                                "--xl-viewport": 1.25
                            };
                            h.components.Map[0].scale(t[h.mediaQuery])
                        };
                    l.subscribe("Map.ready", function() {
                        p(), l.subscribe("CustomMedia.match", p)
                    }), l.subscribe("CustomMedia.match", function(t) {
                        h.mediaQuery = t
                    }), s.forOwn(a, function(t, e) {
                        o.register(t, {
                            match: function() {
                                l.publish("CustomMedia.match", e)
                            },
                            unmatch: function() {
                                l.publish("CustomMedia.unmatch", e)
                            }
                        })
                    });
                    var o = t("enquire.js");
                    o.register(e.lazySizesConfig.customMedia["--lg-viewport"], {
                        match: function() {
                            i("#js-work", "/partials/work-2-desktop")
                        },
                        unmatch: function() {
                            i("#js-work", "/partials/work-2-mobile")
                        }
                    })
                })
            }
        }(window, document)
    }, {
        "./components/bodymovin/bodymovin.js": 11,
        "./components/fun/fun.js": 12,
        "./components/image-switch/image-switch.js": 13,
        "./components/map/map.js": 18,
        "./components/menu/menu.js": 19,
        "./components/scroll-spy/scroll-spy.js": 20,
        "./components/teaser/teaser.js": 21,
        "./components/typewriter/typewriter.js": 22,
        "./custom-media.js": 23,
        "enquire.js": 2,
        lazysizes: 3,
        lodash: 4,
        picturefill: 5,
        svg4everybody: 7,
        "vanilla-pubsub": 8
    }]
}, {}, [24]);