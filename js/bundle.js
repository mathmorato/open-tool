(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
    get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
  }) : x)(function(x) {
    if (typeof require !== "undefined") return require.apply(this, arguments);
    throw Error('Dynamic require of "' + x + '" is not supported');
  });
  var __commonJS = (cb, mod) => function __require2() {
    try {
      return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
    } catch (e) {
      throw mod = 0, e;
    }
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // node_modules/jszip/dist/jszip.min.js
  var require_jszip_min = __commonJS({
    "node_modules/jszip/dist/jszip.min.js"(exports, module) {
      !(function(e) {
        if ("object" == typeof exports && "undefined" != typeof module) module.exports = e();
        else if ("function" == typeof define && define.amd) define([], e);
        else {
          ("undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this).JSZip = e();
        }
      })(function() {
        return (function s(a, o, h) {
          function u(r, e2) {
            if (!o[r]) {
              if (!a[r]) {
                var t = "function" == typeof __require && __require;
                if (!e2 && t) return t(r, true);
                if (l) return l(r, true);
                var n = new Error("Cannot find module '" + r + "'");
                throw n.code = "MODULE_NOT_FOUND", n;
              }
              var i = o[r] = { exports: {} };
              a[r][0].call(i.exports, function(e3) {
                var t2 = a[r][1][e3];
                return u(t2 || e3);
              }, i, i.exports, s, a, o, h);
            }
            return o[r].exports;
          }
          for (var l = "function" == typeof __require && __require, e = 0; e < h.length; e++) u(h[e]);
          return u;
        })({ 1: [function(e, t, r) {
          "use strict";
          var d = e("./utils"), c = e("./support"), p = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
          r.encode = function(e2) {
            for (var t2, r2, n, i, s, a, o, h = [], u = 0, l = e2.length, f = l, c2 = "string" !== d.getTypeOf(e2); u < e2.length; ) f = l - u, n = c2 ? (t2 = e2[u++], r2 = u < l ? e2[u++] : 0, u < l ? e2[u++] : 0) : (t2 = e2.charCodeAt(u++), r2 = u < l ? e2.charCodeAt(u++) : 0, u < l ? e2.charCodeAt(u++) : 0), i = t2 >> 2, s = (3 & t2) << 4 | r2 >> 4, a = 1 < f ? (15 & r2) << 2 | n >> 6 : 64, o = 2 < f ? 63 & n : 64, h.push(p.charAt(i) + p.charAt(s) + p.charAt(a) + p.charAt(o));
            return h.join("");
          }, r.decode = function(e2) {
            var t2, r2, n, i, s, a, o = 0, h = 0, u = "data:";
            if (e2.substr(0, u.length) === u) throw new Error("Invalid base64 input, it looks like a data url.");
            var l, f = 3 * (e2 = e2.replace(/[^A-Za-z0-9+/=]/g, "")).length / 4;
            if (e2.charAt(e2.length - 1) === p.charAt(64) && f--, e2.charAt(e2.length - 2) === p.charAt(64) && f--, f % 1 != 0) throw new Error("Invalid base64 input, bad content length.");
            for (l = c.uint8array ? new Uint8Array(0 | f) : new Array(0 | f); o < e2.length; ) t2 = p.indexOf(e2.charAt(o++)) << 2 | (i = p.indexOf(e2.charAt(o++))) >> 4, r2 = (15 & i) << 4 | (s = p.indexOf(e2.charAt(o++))) >> 2, n = (3 & s) << 6 | (a = p.indexOf(e2.charAt(o++))), l[h++] = t2, 64 !== s && (l[h++] = r2), 64 !== a && (l[h++] = n);
            return l;
          };
        }, { "./support": 30, "./utils": 32 }], 2: [function(e, t, r) {
          "use strict";
          var n = e("./external"), i = e("./stream/DataWorker"), s = e("./stream/Crc32Probe"), a = e("./stream/DataLengthProbe");
          function o(e2, t2, r2, n2, i2) {
            this.compressedSize = e2, this.uncompressedSize = t2, this.crc32 = r2, this.compression = n2, this.compressedContent = i2;
          }
          o.prototype = { getContentWorker: function() {
            var e2 = new i(n.Promise.resolve(this.compressedContent)).pipe(this.compression.uncompressWorker()).pipe(new a("data_length")), t2 = this;
            return e2.on("end", function() {
              if (this.streamInfo.data_length !== t2.uncompressedSize) throw new Error("Bug : uncompressed data size mismatch");
            }), e2;
          }, getCompressedWorker: function() {
            return new i(n.Promise.resolve(this.compressedContent)).withStreamInfo("compressedSize", this.compressedSize).withStreamInfo("uncompressedSize", this.uncompressedSize).withStreamInfo("crc32", this.crc32).withStreamInfo("compression", this.compression);
          } }, o.createWorkerFrom = function(e2, t2, r2) {
            return e2.pipe(new s()).pipe(new a("uncompressedSize")).pipe(t2.compressWorker(r2)).pipe(new a("compressedSize")).withStreamInfo("compression", t2);
          }, t.exports = o;
        }, { "./external": 6, "./stream/Crc32Probe": 25, "./stream/DataLengthProbe": 26, "./stream/DataWorker": 27 }], 3: [function(e, t, r) {
          "use strict";
          var n = e("./stream/GenericWorker");
          r.STORE = { magic: "\0\0", compressWorker: function() {
            return new n("STORE compression");
          }, uncompressWorker: function() {
            return new n("STORE decompression");
          } }, r.DEFLATE = e("./flate");
        }, { "./flate": 7, "./stream/GenericWorker": 28 }], 4: [function(e, t, r) {
          "use strict";
          var n = e("./utils");
          var o = (function() {
            for (var e2, t2 = [], r2 = 0; r2 < 256; r2++) {
              e2 = r2;
              for (var n2 = 0; n2 < 8; n2++) e2 = 1 & e2 ? 3988292384 ^ e2 >>> 1 : e2 >>> 1;
              t2[r2] = e2;
            }
            return t2;
          })();
          t.exports = function(e2, t2) {
            return void 0 !== e2 && e2.length ? "string" !== n.getTypeOf(e2) ? (function(e3, t3, r2, n2) {
              var i = o, s = n2 + r2;
              e3 ^= -1;
              for (var a = n2; a < s; a++) e3 = e3 >>> 8 ^ i[255 & (e3 ^ t3[a])];
              return -1 ^ e3;
            })(0 | t2, e2, e2.length, 0) : (function(e3, t3, r2, n2) {
              var i = o, s = n2 + r2;
              e3 ^= -1;
              for (var a = n2; a < s; a++) e3 = e3 >>> 8 ^ i[255 & (e3 ^ t3.charCodeAt(a))];
              return -1 ^ e3;
            })(0 | t2, e2, e2.length, 0) : 0;
          };
        }, { "./utils": 32 }], 5: [function(e, t, r) {
          "use strict";
          r.base64 = false, r.binary = false, r.dir = false, r.createFolders = true, r.date = null, r.compression = null, r.compressionOptions = null, r.comment = null, r.unixPermissions = null, r.dosPermissions = null;
        }, {}], 6: [function(e, t, r) {
          "use strict";
          var n = null;
          n = "undefined" != typeof Promise ? Promise : e("lie"), t.exports = { Promise: n };
        }, { lie: 37 }], 7: [function(e, t, r) {
          "use strict";
          var n = "undefined" != typeof Uint8Array && "undefined" != typeof Uint16Array && "undefined" != typeof Uint32Array, i = e("pako"), s = e("./utils"), a = e("./stream/GenericWorker"), o = n ? "uint8array" : "array";
          function h(e2, t2) {
            a.call(this, "FlateWorker/" + e2), this._pako = null, this._pakoAction = e2, this._pakoOptions = t2, this.meta = {};
          }
          r.magic = "\b\0", s.inherits(h, a), h.prototype.processChunk = function(e2) {
            this.meta = e2.meta, null === this._pako && this._createPako(), this._pako.push(s.transformTo(o, e2.data), false);
          }, h.prototype.flush = function() {
            a.prototype.flush.call(this), null === this._pako && this._createPako(), this._pako.push([], true);
          }, h.prototype.cleanUp = function() {
            a.prototype.cleanUp.call(this), this._pako = null;
          }, h.prototype._createPako = function() {
            this._pako = new i[this._pakoAction]({ raw: true, level: this._pakoOptions.level || -1 });
            var t2 = this;
            this._pako.onData = function(e2) {
              t2.push({ data: e2, meta: t2.meta });
            };
          }, r.compressWorker = function(e2) {
            return new h("Deflate", e2);
          }, r.uncompressWorker = function() {
            return new h("Inflate", {});
          };
        }, { "./stream/GenericWorker": 28, "./utils": 32, pako: 38 }], 8: [function(e, t, r) {
          "use strict";
          function A(e2, t2) {
            var r2, n2 = "";
            for (r2 = 0; r2 < t2; r2++) n2 += String.fromCharCode(255 & e2), e2 >>>= 8;
            return n2;
          }
          function n(e2, t2, r2, n2, i2, s2) {
            var a, o, h = e2.file, u = e2.compression, l = s2 !== O.utf8encode, f = I.transformTo("string", s2(h.name)), c = I.transformTo("string", O.utf8encode(h.name)), d = h.comment, p = I.transformTo("string", s2(d)), m = I.transformTo("string", O.utf8encode(d)), _ = c.length !== h.name.length, g = m.length !== d.length, b = "", v = "", y = "", w = h.dir, k = h.date, x = { crc32: 0, compressedSize: 0, uncompressedSize: 0 };
            t2 && !r2 || (x.crc32 = e2.crc32, x.compressedSize = e2.compressedSize, x.uncompressedSize = e2.uncompressedSize);
            var S = 0;
            t2 && (S |= 8), l || !_ && !g || (S |= 2048);
            var z = 0, C = 0;
            w && (z |= 16), "UNIX" === i2 ? (C = 798, z |= (function(e3, t3) {
              var r3 = e3;
              return e3 || (r3 = t3 ? 16893 : 33204), (65535 & r3) << 16;
            })(h.unixPermissions, w)) : (C = 20, z |= (function(e3) {
              return 63 & (e3 || 0);
            })(h.dosPermissions)), a = k.getUTCHours(), a <<= 6, a |= k.getUTCMinutes(), a <<= 5, a |= k.getUTCSeconds() / 2, o = k.getUTCFullYear() - 1980, o <<= 4, o |= k.getUTCMonth() + 1, o <<= 5, o |= k.getUTCDate(), _ && (v = A(1, 1) + A(B(f), 4) + c, b += "up" + A(v.length, 2) + v), g && (y = A(1, 1) + A(B(p), 4) + m, b += "uc" + A(y.length, 2) + y);
            var E = "";
            return E += "\n\0", E += A(S, 2), E += u.magic, E += A(a, 2), E += A(o, 2), E += A(x.crc32, 4), E += A(x.compressedSize, 4), E += A(x.uncompressedSize, 4), E += A(f.length, 2), E += A(b.length, 2), { fileRecord: R.LOCAL_FILE_HEADER + E + f + b, dirRecord: R.CENTRAL_FILE_HEADER + A(C, 2) + E + A(p.length, 2) + "\0\0\0\0" + A(z, 4) + A(n2, 4) + f + b + p };
          }
          var I = e("../utils"), i = e("../stream/GenericWorker"), O = e("../utf8"), B = e("../crc32"), R = e("../signature");
          function s(e2, t2, r2, n2) {
            i.call(this, "ZipFileWorker"), this.bytesWritten = 0, this.zipComment = t2, this.zipPlatform = r2, this.encodeFileName = n2, this.streamFiles = e2, this.accumulate = false, this.contentBuffer = [], this.dirRecords = [], this.currentSourceOffset = 0, this.entriesCount = 0, this.currentFile = null, this._sources = [];
          }
          I.inherits(s, i), s.prototype.push = function(e2) {
            var t2 = e2.meta.percent || 0, r2 = this.entriesCount, n2 = this._sources.length;
            this.accumulate ? this.contentBuffer.push(e2) : (this.bytesWritten += e2.data.length, i.prototype.push.call(this, { data: e2.data, meta: { currentFile: this.currentFile, percent: r2 ? (t2 + 100 * (r2 - n2 - 1)) / r2 : 100 } }));
          }, s.prototype.openedSource = function(e2) {
            this.currentSourceOffset = this.bytesWritten, this.currentFile = e2.file.name;
            var t2 = this.streamFiles && !e2.file.dir;
            if (t2) {
              var r2 = n(e2, t2, false, this.currentSourceOffset, this.zipPlatform, this.encodeFileName);
              this.push({ data: r2.fileRecord, meta: { percent: 0 } });
            } else this.accumulate = true;
          }, s.prototype.closedSource = function(e2) {
            this.accumulate = false;
            var t2 = this.streamFiles && !e2.file.dir, r2 = n(e2, t2, true, this.currentSourceOffset, this.zipPlatform, this.encodeFileName);
            if (this.dirRecords.push(r2.dirRecord), t2) this.push({ data: (function(e3) {
              return R.DATA_DESCRIPTOR + A(e3.crc32, 4) + A(e3.compressedSize, 4) + A(e3.uncompressedSize, 4);
            })(e2), meta: { percent: 100 } });
            else for (this.push({ data: r2.fileRecord, meta: { percent: 0 } }); this.contentBuffer.length; ) this.push(this.contentBuffer.shift());
            this.currentFile = null;
          }, s.prototype.flush = function() {
            for (var e2 = this.bytesWritten, t2 = 0; t2 < this.dirRecords.length; t2++) this.push({ data: this.dirRecords[t2], meta: { percent: 100 } });
            var r2 = this.bytesWritten - e2, n2 = (function(e3, t3, r3, n3, i2) {
              var s2 = I.transformTo("string", i2(n3));
              return R.CENTRAL_DIRECTORY_END + "\0\0\0\0" + A(e3, 2) + A(e3, 2) + A(t3, 4) + A(r3, 4) + A(s2.length, 2) + s2;
            })(this.dirRecords.length, r2, e2, this.zipComment, this.encodeFileName);
            this.push({ data: n2, meta: { percent: 100 } });
          }, s.prototype.prepareNextSource = function() {
            this.previous = this._sources.shift(), this.openedSource(this.previous.streamInfo), this.isPaused ? this.previous.pause() : this.previous.resume();
          }, s.prototype.registerPrevious = function(e2) {
            this._sources.push(e2);
            var t2 = this;
            return e2.on("data", function(e3) {
              t2.processChunk(e3);
            }), e2.on("end", function() {
              t2.closedSource(t2.previous.streamInfo), t2._sources.length ? t2.prepareNextSource() : t2.end();
            }), e2.on("error", function(e3) {
              t2.error(e3);
            }), this;
          }, s.prototype.resume = function() {
            return !!i.prototype.resume.call(this) && (!this.previous && this._sources.length ? (this.prepareNextSource(), true) : this.previous || this._sources.length || this.generatedError ? void 0 : (this.end(), true));
          }, s.prototype.error = function(e2) {
            var t2 = this._sources;
            if (!i.prototype.error.call(this, e2)) return false;
            for (var r2 = 0; r2 < t2.length; r2++) try {
              t2[r2].error(e2);
            } catch (e3) {
            }
            return true;
          }, s.prototype.lock = function() {
            i.prototype.lock.call(this);
            for (var e2 = this._sources, t2 = 0; t2 < e2.length; t2++) e2[t2].lock();
          }, t.exports = s;
        }, { "../crc32": 4, "../signature": 23, "../stream/GenericWorker": 28, "../utf8": 31, "../utils": 32 }], 9: [function(e, t, r) {
          "use strict";
          var u = e("../compressions"), n = e("./ZipFileWorker");
          r.generateWorker = function(e2, a, t2) {
            var o = new n(a.streamFiles, t2, a.platform, a.encodeFileName), h = 0;
            try {
              e2.forEach(function(e3, t3) {
                h++;
                var r2 = (function(e4, t4) {
                  var r3 = e4 || t4, n3 = u[r3];
                  if (!n3) throw new Error(r3 + " is not a valid compression method !");
                  return n3;
                })(t3.options.compression, a.compression), n2 = t3.options.compressionOptions || a.compressionOptions || {}, i = t3.dir, s = t3.date;
                t3._compressWorker(r2, n2).withStreamInfo("file", { name: e3, dir: i, date: s, comment: t3.comment || "", unixPermissions: t3.unixPermissions, dosPermissions: t3.dosPermissions }).pipe(o);
              }), o.entriesCount = h;
            } catch (e3) {
              o.error(e3);
            }
            return o;
          };
        }, { "../compressions": 3, "./ZipFileWorker": 8 }], 10: [function(e, t, r) {
          "use strict";
          function n() {
            if (!(this instanceof n)) return new n();
            if (arguments.length) throw new Error("The constructor with parameters has been removed in JSZip 3.0, please check the upgrade guide.");
            this.files = /* @__PURE__ */ Object.create(null), this.comment = null, this.root = "", this.clone = function() {
              var e2 = new n();
              for (var t2 in this) "function" != typeof this[t2] && (e2[t2] = this[t2]);
              return e2;
            };
          }
          (n.prototype = e("./object")).loadAsync = e("./load"), n.support = e("./support"), n.defaults = e("./defaults"), n.version = "3.10.2", n.loadAsync = function(e2, t2) {
            return new n().loadAsync(e2, t2);
          }, n.external = e("./external"), t.exports = n;
        }, { "./defaults": 5, "./external": 6, "./load": 11, "./object": 15, "./support": 30 }], 11: [function(e, t, r) {
          "use strict";
          var u = e("./utils"), i = e("./external"), n = e("./utf8"), s = e("./zipEntries"), a = e("./stream/Crc32Probe"), l = e("./nodejsUtils");
          function f(n2) {
            return new i.Promise(function(e2, t2) {
              var r2 = n2.decompressed.getContentWorker().pipe(new a());
              r2.on("error", function(e3) {
                t2(e3);
              }).on("end", function() {
                r2.streamInfo.crc32 !== n2.decompressed.crc32 ? t2(new Error("Corrupted zip : CRC32 mismatch")) : e2();
              }).resume();
            });
          }
          t.exports = function(e2, o) {
            var h = this;
            return o = u.extend(o || {}, { base64: false, checkCRC32: false, optimizedBinaryString: false, createFolders: false, decodeFileName: n.utf8decode }), l.isNode && l.isStream(e2) ? i.Promise.reject(new Error("JSZip can't accept a stream when loading a zip file.")) : u.prepareContent("the loaded zip file", e2, true, o.optimizedBinaryString, o.base64).then(function(e3) {
              var t2 = new s(o);
              return t2.load(e3), t2;
            }).then(function(e3) {
              var t2 = [i.Promise.resolve(e3)], r2 = e3.files;
              if (o.checkCRC32) for (var n2 = 0; n2 < r2.length; n2++) t2.push(f(r2[n2]));
              return i.Promise.all(t2);
            }).then(function(e3) {
              for (var t2 = e3.shift(), r2 = t2.files, n2 = 0; n2 < r2.length; n2++) {
                var i2 = r2[n2], s2 = i2.fileNameStr, a2 = u.resolve(i2.fileNameStr);
                h.file(a2, i2.decompressed, { binary: true, optimizedBinaryString: true, date: i2.date, dir: i2.dir, comment: i2.fileCommentStr.length ? i2.fileCommentStr : null, unixPermissions: i2.unixPermissions, dosPermissions: i2.dosPermissions, createFolders: o.createFolders }), i2.dir || (h.file(a2).unsafeOriginalName = s2);
              }
              return t2.zipComment.length && (h.comment = t2.zipComment), h;
            });
          };
        }, { "./external": 6, "./nodejsUtils": 14, "./stream/Crc32Probe": 25, "./utf8": 31, "./utils": 32, "./zipEntries": 33 }], 12: [function(e, t, r) {
          "use strict";
          var n = e("../utils"), i = e("../stream/GenericWorker");
          function s(e2, t2) {
            i.call(this, "Nodejs stream input adapter for " + e2), this._upstreamEnded = false, this._bindStream(t2);
          }
          n.inherits(s, i), s.prototype._bindStream = function(e2) {
            var t2 = this;
            (this._stream = e2).pause(), e2.on("data", function(e3) {
              t2.push({ data: e3, meta: { percent: 0 } });
            }).on("error", function(e3) {
              t2.isPaused ? this.generatedError = e3 : t2.error(e3);
            }).on("end", function() {
              t2.isPaused ? t2._upstreamEnded = true : t2.end();
            });
          }, s.prototype.pause = function() {
            return !!i.prototype.pause.call(this) && (this._stream.pause(), true);
          }, s.prototype.resume = function() {
            return !!i.prototype.resume.call(this) && (this._upstreamEnded ? this.end() : this._stream.resume(), true);
          }, t.exports = s;
        }, { "../stream/GenericWorker": 28, "../utils": 32 }], 13: [function(e, t, r) {
          "use strict";
          var i = e("readable-stream").Readable;
          function n(e2, t2, r2) {
            i.call(this, t2), this._helper = e2;
            var n2 = this;
            e2.on("data", function(e3, t3) {
              n2.push(e3) || n2._helper.pause(), r2 && r2(t3);
            }).on("error", function(e3) {
              n2.emit("error", e3);
            }).on("end", function() {
              n2.push(null);
            });
          }
          e("../utils").inherits(n, i), n.prototype._read = function() {
            this._helper.resume();
          }, t.exports = n;
        }, { "../utils": 32, "readable-stream": 16 }], 14: [function(e, t, r) {
          "use strict";
          t.exports = { isNode: "undefined" != typeof Buffer, newBufferFrom: function(e2, t2) {
            if (Buffer.from && Buffer.from !== Uint8Array.from) return Buffer.from(e2, t2);
            if ("number" == typeof e2) throw new Error('The "data" argument must not be a number');
            return new Buffer(e2, t2);
          }, allocBuffer: function(e2) {
            if (Buffer.alloc) return Buffer.alloc(e2);
            var t2 = new Buffer(e2);
            return t2.fill(0), t2;
          }, isBuffer: function(e2) {
            return Buffer.isBuffer(e2);
          }, isStream: function(e2) {
            return e2 && "function" == typeof e2.on && "function" == typeof e2.pause && "function" == typeof e2.resume;
          } };
        }, {}], 15: [function(e, t, r) {
          "use strict";
          function s(e2, t2, r2) {
            var n2, i2 = u.getTypeOf(t2), s2 = u.extend(r2 || {}, f);
            s2.date = s2.date || /* @__PURE__ */ new Date(), null !== s2.compression && (s2.compression = s2.compression.toUpperCase()), "string" == typeof s2.unixPermissions && (s2.unixPermissions = parseInt(s2.unixPermissions, 8)), s2.unixPermissions && 16384 & s2.unixPermissions && (s2.dir = true), s2.dosPermissions && 16 & s2.dosPermissions && (s2.dir = true), s2.dir && (e2 = g(e2)), s2.createFolders && (n2 = _(e2)) && b.call(this, n2, true);
            var a2 = "string" === i2 && false === s2.binary && false === s2.base64;
            r2 && void 0 !== r2.binary || (s2.binary = !a2), (t2 instanceof c && 0 === t2.uncompressedSize || s2.dir || !t2 || 0 === t2.length) && (s2.base64 = false, s2.binary = true, t2 = "", s2.compression = "STORE", i2 = "string");
            var o2 = null;
            o2 = t2 instanceof c || t2 instanceof l ? t2 : p.isNode && p.isStream(t2) ? new m(e2, t2) : u.prepareContent(e2, t2, s2.binary, s2.optimizedBinaryString, s2.base64);
            var h2 = new d(e2, o2, s2);
            this.files[e2] = h2;
          }
          var i = e("./utf8"), u = e("./utils"), l = e("./stream/GenericWorker"), a = e("./stream/StreamHelper"), f = e("./defaults"), c = e("./compressedObject"), d = e("./zipObject"), o = e("./generate"), p = e("./nodejsUtils"), m = e("./nodejs/NodejsStreamInputAdapter"), _ = function(e2) {
            "/" === e2.slice(-1) && (e2 = e2.substring(0, e2.length - 1));
            var t2 = e2.lastIndexOf("/");
            return 0 < t2 ? e2.substring(0, t2) : "";
          }, g = function(e2) {
            return "/" !== e2.slice(-1) && (e2 += "/"), e2;
          }, b = function(e2, t2) {
            return t2 = void 0 !== t2 ? t2 : f.createFolders, e2 = g(e2), this.files[e2] || s.call(this, e2, null, { dir: true, createFolders: t2 }), this.files[e2];
          };
          function h(e2) {
            return "[object RegExp]" === Object.prototype.toString.call(e2);
          }
          var n = { load: function() {
            throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
          }, forEach: function(e2) {
            var t2, r2, n2;
            for (t2 in this.files) n2 = this.files[t2], (r2 = t2.slice(this.root.length, t2.length)) && t2.slice(0, this.root.length) === this.root && e2(r2, n2);
          }, filter: function(r2) {
            var n2 = [];
            return this.forEach(function(e2, t2) {
              r2(e2, t2) && n2.push(t2);
            }), n2;
          }, file: function(e2, t2, r2) {
            if (1 !== arguments.length) return e2 = this.root + e2, s.call(this, e2, t2, r2), this;
            if (h(e2)) {
              var n2 = e2;
              return this.filter(function(e3, t3) {
                return !t3.dir && n2.test(e3);
              });
            }
            var i2 = this.files[this.root + e2];
            return i2 && !i2.dir ? i2 : null;
          }, folder: function(r2) {
            if (!r2) return this;
            if (h(r2)) return this.filter(function(e3, t3) {
              return t3.dir && r2.test(e3);
            });
            var e2 = this.root + r2, t2 = b.call(this, e2), n2 = this.clone();
            return n2.root = t2.name, n2;
          }, remove: function(r2) {
            r2 = this.root + r2;
            var e2 = this.files[r2];
            if (e2 || ("/" !== r2.slice(-1) && (r2 += "/"), e2 = this.files[r2]), e2 && !e2.dir) delete this.files[r2];
            else for (var t2 = this.filter(function(e3, t3) {
              return t3.name.slice(0, r2.length) === r2;
            }), n2 = 0; n2 < t2.length; n2++) delete this.files[t2[n2].name];
            return this;
          }, generate: function() {
            throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
          }, generateInternalStream: function(e2) {
            var t2, r2 = {};
            try {
              if ((r2 = u.extend(e2 || {}, { streamFiles: false, compression: "STORE", compressionOptions: null, type: "", platform: "DOS", comment: null, mimeType: "application/zip", encodeFileName: i.utf8encode })).type = r2.type.toLowerCase(), r2.compression = r2.compression.toUpperCase(), "binarystring" === r2.type && (r2.type = "string"), !r2.type) throw new Error("No output type specified.");
              u.checkSupport(r2.type), "darwin" !== r2.platform && "freebsd" !== r2.platform && "linux" !== r2.platform && "sunos" !== r2.platform || (r2.platform = "UNIX"), "win32" === r2.platform && (r2.platform = "DOS");
              var n2 = r2.comment || this.comment || "";
              t2 = o.generateWorker(this, r2, n2);
            } catch (e3) {
              (t2 = new l("error")).error(e3);
            }
            return new a(t2, r2.type || "string", r2.mimeType);
          }, generateAsync: function(e2, t2) {
            return this.generateInternalStream(e2).accumulate(t2);
          }, generateNodeStream: function(e2, t2) {
            return (e2 = e2 || {}).type || (e2.type = "nodebuffer"), this.generateInternalStream(e2).toNodejsStream(t2);
          } };
          t.exports = n;
        }, { "./compressedObject": 2, "./defaults": 5, "./generate": 9, "./nodejs/NodejsStreamInputAdapter": 12, "./nodejsUtils": 14, "./stream/GenericWorker": 28, "./stream/StreamHelper": 29, "./utf8": 31, "./utils": 32, "./zipObject": 35 }], 16: [function(e, t, r) {
          "use strict";
          t.exports = e("stream");
        }, { stream: void 0 }], 17: [function(e, t, r) {
          "use strict";
          var n = e("./DataReader");
          function i(e2) {
            n.call(this, e2);
            for (var t2 = 0; t2 < this.data.length; t2++) e2[t2] = 255 & e2[t2];
          }
          e("../utils").inherits(i, n), i.prototype.byteAt = function(e2) {
            return this.data[this.zero + e2];
          }, i.prototype.lastIndexOfSignature = function(e2) {
            for (var t2 = e2.charCodeAt(0), r2 = e2.charCodeAt(1), n2 = e2.charCodeAt(2), i2 = e2.charCodeAt(3), s = this.length - 4; 0 <= s; --s) if (this.data[s] === t2 && this.data[s + 1] === r2 && this.data[s + 2] === n2 && this.data[s + 3] === i2) return s - this.zero;
            return -1;
          }, i.prototype.readAndCheckSignature = function(e2) {
            var t2 = e2.charCodeAt(0), r2 = e2.charCodeAt(1), n2 = e2.charCodeAt(2), i2 = e2.charCodeAt(3), s = this.readData(4);
            return t2 === s[0] && r2 === s[1] && n2 === s[2] && i2 === s[3];
          }, i.prototype.readData = function(e2) {
            if (this.checkOffset(e2), 0 === e2) return [];
            var t2 = this.data.slice(this.zero + this.index, this.zero + this.index + e2);
            return this.index += e2, t2;
          }, t.exports = i;
        }, { "../utils": 32, "./DataReader": 18 }], 18: [function(e, t, r) {
          "use strict";
          var n = e("../utils");
          function i(e2) {
            this.data = e2, this.length = e2.length, this.index = 0, this.zero = 0;
          }
          i.prototype = { checkOffset: function(e2) {
            this.checkIndex(this.index + e2);
          }, checkIndex: function(e2) {
            if (this.length < this.zero + e2 || e2 < 0) throw new Error("End of data reached (data length = " + this.length + ", asked index = " + e2 + "). Corrupted zip ?");
          }, setIndex: function(e2) {
            this.checkIndex(e2), this.index = e2;
          }, skip: function(e2) {
            this.setIndex(this.index + e2);
          }, byteAt: function() {
          }, readInt: function(e2) {
            var t2, r2 = 0;
            for (this.checkOffset(e2), t2 = this.index + e2 - 1; t2 >= this.index; t2--) r2 = (r2 << 8) + this.byteAt(t2);
            return this.index += e2, r2;
          }, readString: function(e2) {
            return n.transformTo("string", this.readData(e2));
          }, readData: function() {
          }, lastIndexOfSignature: function() {
          }, readAndCheckSignature: function() {
          }, readDate: function() {
            var e2 = this.readInt(4);
            return new Date(Date.UTC(1980 + (e2 >> 25 & 127), (e2 >> 21 & 15) - 1, e2 >> 16 & 31, e2 >> 11 & 31, e2 >> 5 & 63, (31 & e2) << 1));
          } }, t.exports = i;
        }, { "../utils": 32 }], 19: [function(e, t, r) {
          "use strict";
          var n = e("./Uint8ArrayReader");
          function i(e2) {
            n.call(this, e2);
          }
          e("../utils").inherits(i, n), i.prototype.readData = function(e2) {
            this.checkOffset(e2);
            var t2 = this.data.slice(this.zero + this.index, this.zero + this.index + e2);
            return this.index += e2, t2;
          }, t.exports = i;
        }, { "../utils": 32, "./Uint8ArrayReader": 21 }], 20: [function(e, t, r) {
          "use strict";
          var n = e("./DataReader");
          function i(e2) {
            n.call(this, e2);
          }
          e("../utils").inherits(i, n), i.prototype.byteAt = function(e2) {
            return this.data.charCodeAt(this.zero + e2);
          }, i.prototype.lastIndexOfSignature = function(e2) {
            return this.data.lastIndexOf(e2) - this.zero;
          }, i.prototype.readAndCheckSignature = function(e2) {
            return e2 === this.readData(4);
          }, i.prototype.readData = function(e2) {
            this.checkOffset(e2);
            var t2 = this.data.slice(this.zero + this.index, this.zero + this.index + e2);
            return this.index += e2, t2;
          }, t.exports = i;
        }, { "../utils": 32, "./DataReader": 18 }], 21: [function(e, t, r) {
          "use strict";
          var n = e("./ArrayReader");
          function i(e2) {
            n.call(this, e2);
          }
          e("../utils").inherits(i, n), i.prototype.readData = function(e2) {
            if (this.checkOffset(e2), 0 === e2) return new Uint8Array(0);
            var t2 = this.data.subarray(this.zero + this.index, this.zero + this.index + e2);
            return this.index += e2, t2;
          }, t.exports = i;
        }, { "../utils": 32, "./ArrayReader": 17 }], 22: [function(e, t, r) {
          "use strict";
          var n = e("../utils"), i = e("../support"), s = e("./ArrayReader"), a = e("./StringReader"), o = e("./NodeBufferReader"), h = e("./Uint8ArrayReader");
          t.exports = function(e2) {
            var t2 = n.getTypeOf(e2);
            return n.checkSupport(t2), "string" !== t2 || i.uint8array ? "nodebuffer" === t2 ? new o(e2) : i.uint8array ? new h(n.transformTo("uint8array", e2)) : new s(n.transformTo("array", e2)) : new a(e2);
          };
        }, { "../support": 30, "../utils": 32, "./ArrayReader": 17, "./NodeBufferReader": 19, "./StringReader": 20, "./Uint8ArrayReader": 21 }], 23: [function(e, t, r) {
          "use strict";
          r.LOCAL_FILE_HEADER = "PK", r.CENTRAL_FILE_HEADER = "PK", r.CENTRAL_DIRECTORY_END = "PK", r.ZIP64_CENTRAL_DIRECTORY_LOCATOR = "PK\x07", r.ZIP64_CENTRAL_DIRECTORY_END = "PK", r.DATA_DESCRIPTOR = "PK\x07\b";
        }, {}], 24: [function(e, t, r) {
          "use strict";
          var n = e("./GenericWorker"), i = e("../utils");
          function s(e2) {
            n.call(this, "ConvertWorker to " + e2), this.destType = e2;
          }
          i.inherits(s, n), s.prototype.processChunk = function(e2) {
            this.push({ data: i.transformTo(this.destType, e2.data), meta: e2.meta });
          }, t.exports = s;
        }, { "../utils": 32, "./GenericWorker": 28 }], 25: [function(e, t, r) {
          "use strict";
          var n = e("./GenericWorker"), i = e("../crc32");
          function s() {
            n.call(this, "Crc32Probe"), this.withStreamInfo("crc32", 0);
          }
          e("../utils").inherits(s, n), s.prototype.processChunk = function(e2) {
            this.streamInfo.crc32 = i(e2.data, this.streamInfo.crc32 || 0), this.push(e2);
          }, t.exports = s;
        }, { "../crc32": 4, "../utils": 32, "./GenericWorker": 28 }], 26: [function(e, t, r) {
          "use strict";
          var n = e("../utils"), i = e("./GenericWorker");
          function s(e2) {
            i.call(this, "DataLengthProbe for " + e2), this.propName = e2, this.withStreamInfo(e2, 0);
          }
          n.inherits(s, i), s.prototype.processChunk = function(e2) {
            if (e2) {
              var t2 = this.streamInfo[this.propName] || 0;
              this.streamInfo[this.propName] = t2 + e2.data.length;
            }
            i.prototype.processChunk.call(this, e2);
          }, t.exports = s;
        }, { "../utils": 32, "./GenericWorker": 28 }], 27: [function(e, t, r) {
          "use strict";
          var n = e("../utils"), i = e("./GenericWorker");
          function s(e2) {
            i.call(this, "DataWorker");
            var t2 = this;
            this.dataIsReady = false, this.index = 0, this.max = 0, this.data = null, this.type = "", this._tickScheduled = false, e2.then(function(e3) {
              t2.dataIsReady = true, t2.data = e3, t2.max = e3 && e3.length || 0, t2.type = n.getTypeOf(e3), t2.isPaused || t2._tickAndRepeat();
            }, function(e3) {
              t2.error(e3);
            });
          }
          n.inherits(s, i), s.prototype.cleanUp = function() {
            i.prototype.cleanUp.call(this), this.data = null;
          }, s.prototype.resume = function() {
            return !!i.prototype.resume.call(this) && (!this._tickScheduled && this.dataIsReady && (this._tickScheduled = true, n.delay(this._tickAndRepeat, [], this)), true);
          }, s.prototype._tickAndRepeat = function() {
            this._tickScheduled = false, this.isPaused || this.isFinished || (this._tick(), this.isFinished || (n.delay(this._tickAndRepeat, [], this), this._tickScheduled = true));
          }, s.prototype._tick = function() {
            if (this.isPaused || this.isFinished) return false;
            var e2 = null, t2 = Math.min(this.max, this.index + 16384);
            if (this.index >= this.max) return this.end();
            switch (this.type) {
              case "string":
                e2 = this.data.substring(this.index, t2);
                break;
              case "uint8array":
                e2 = this.data.subarray(this.index, t2);
                break;
              case "array":
              case "nodebuffer":
                e2 = this.data.slice(this.index, t2);
            }
            return this.index = t2, this.push({ data: e2, meta: { percent: this.max ? this.index / this.max * 100 : 0 } });
          }, t.exports = s;
        }, { "../utils": 32, "./GenericWorker": 28 }], 28: [function(e, t, r) {
          "use strict";
          function n(e2) {
            this.name = e2 || "default", this.streamInfo = {}, this.generatedError = null, this.extraStreamInfo = {}, this.isPaused = true, this.isFinished = false, this.isLocked = false, this._listeners = { data: [], end: [], error: [] }, this.previous = null;
          }
          n.prototype = { push: function(e2) {
            this.emit("data", e2);
          }, end: function() {
            if (this.isFinished) return false;
            this.flush();
            try {
              this.emit("end"), this.cleanUp(), this.isFinished = true;
            } catch (e2) {
              this.emit("error", e2);
            }
            return true;
          }, error: function(e2) {
            return !this.isFinished && (this.isPaused ? this.generatedError = e2 : (this.isFinished = true, this.emit("error", e2), this.previous && this.previous.error(e2), this.cleanUp()), true);
          }, on: function(e2, t2) {
            return this._listeners[e2].push(t2), this;
          }, cleanUp: function() {
            this.streamInfo = this.generatedError = this.extraStreamInfo = null, this._listeners = [];
          }, emit: function(e2, t2) {
            if (this._listeners[e2]) for (var r2 = 0; r2 < this._listeners[e2].length; r2++) this._listeners[e2][r2].call(this, t2);
          }, pipe: function(e2) {
            return e2.registerPrevious(this);
          }, registerPrevious: function(e2) {
            if (this.isLocked) throw new Error("The stream '" + this + "' has already been used.");
            this.streamInfo = e2.streamInfo, this.mergeStreamInfo(), this.previous = e2;
            var t2 = this;
            return e2.on("data", function(e3) {
              t2.processChunk(e3);
            }), e2.on("end", function() {
              t2.end();
            }), e2.on("error", function(e3) {
              t2.error(e3);
            }), this;
          }, pause: function() {
            return !this.isPaused && !this.isFinished && (this.isPaused = true, this.previous && this.previous.pause(), true);
          }, resume: function() {
            if (!this.isPaused || this.isFinished) return false;
            var e2 = this.isPaused = false;
            return this.generatedError && (this.error(this.generatedError), e2 = true), this.previous && this.previous.resume(), !e2;
          }, flush: function() {
          }, processChunk: function(e2) {
            this.push(e2);
          }, withStreamInfo: function(e2, t2) {
            return this.extraStreamInfo[e2] = t2, this.mergeStreamInfo(), this;
          }, mergeStreamInfo: function() {
            for (var e2 in this.extraStreamInfo) Object.prototype.hasOwnProperty.call(this.extraStreamInfo, e2) && (this.streamInfo[e2] = this.extraStreamInfo[e2]);
          }, lock: function() {
            if (this.isLocked) throw new Error("The stream '" + this + "' has already been used.");
            this.isLocked = true, this.previous && this.previous.lock();
          }, toString: function() {
            var e2 = "Worker " + this.name;
            return this.previous ? this.previous + " -> " + e2 : e2;
          } }, t.exports = n;
        }, {}], 29: [function(e, t, r) {
          "use strict";
          var h = e("../utils"), i = e("./ConvertWorker"), s = e("./GenericWorker"), u = e("../base64"), n = e("../support"), a = e("../external"), o = null;
          if (n.nodestream) try {
            o = e("../nodejs/NodejsStreamOutputAdapter");
          } catch (e2) {
          }
          function l(e2, o2) {
            return new a.Promise(function(t2, r2) {
              var n2 = [], i2 = e2._internalType, s2 = e2._outputType, a2 = e2._mimeType;
              e2.on("data", function(e3, t3) {
                n2.push(e3), o2 && o2(t3);
              }).on("error", function(e3) {
                n2 = [], r2(e3);
              }).on("end", function() {
                try {
                  var e3 = (function(e4, t3, r3) {
                    switch (e4) {
                      case "blob":
                        return h.newBlob(h.transformTo("arraybuffer", t3), r3);
                      case "base64":
                        return u.encode(t3);
                      default:
                        return h.transformTo(e4, t3);
                    }
                  })(s2, (function(e4, t3) {
                    var r3, n3 = 0, i3 = null, s3 = 0;
                    for (r3 = 0; r3 < t3.length; r3++) s3 += t3[r3].length;
                    switch (e4) {
                      case "string":
                        return t3.join("");
                      case "array":
                        return Array.prototype.concat.apply([], t3);
                      case "uint8array":
                        for (i3 = new Uint8Array(s3), r3 = 0; r3 < t3.length; r3++) i3.set(t3[r3], n3), n3 += t3[r3].length;
                        return i3;
                      case "nodebuffer":
                        return Buffer.concat(t3);
                      default:
                        throw new Error("concat : unsupported type '" + e4 + "'");
                    }
                  })(i2, n2), a2);
                  t2(e3);
                } catch (e4) {
                  r2(e4);
                }
                n2 = [];
              }).resume();
            });
          }
          function f(e2, t2, r2) {
            var n2 = t2;
            switch (t2) {
              case "blob":
              case "arraybuffer":
                n2 = "uint8array";
                break;
              case "base64":
                n2 = "string";
            }
            try {
              this._internalType = n2, this._outputType = t2, this._mimeType = r2, h.checkSupport(n2), this._worker = e2.pipe(new i(n2)), e2.lock();
            } catch (e3) {
              this._worker = new s("error"), this._worker.error(e3);
            }
          }
          f.prototype = { accumulate: function(e2) {
            return l(this, e2);
          }, on: function(e2, t2) {
            var r2 = this;
            return "data" === e2 ? this._worker.on(e2, function(e3) {
              t2.call(r2, e3.data, e3.meta);
            }) : this._worker.on(e2, function() {
              h.delay(t2, arguments, r2);
            }), this;
          }, resume: function() {
            return h.delay(this._worker.resume, [], this._worker), this;
          }, pause: function() {
            return this._worker.pause(), this;
          }, toNodejsStream: function(e2) {
            if (h.checkSupport("nodestream"), "nodebuffer" !== this._outputType) throw new Error(this._outputType + " is not supported by this method");
            return new o(this, { objectMode: "nodebuffer" !== this._outputType }, e2);
          } }, t.exports = f;
        }, { "../base64": 1, "../external": 6, "../nodejs/NodejsStreamOutputAdapter": 13, "../support": 30, "../utils": 32, "./ConvertWorker": 24, "./GenericWorker": 28 }], 30: [function(e, t, r) {
          "use strict";
          if (r.base64 = true, r.array = true, r.string = true, r.arraybuffer = "undefined" != typeof ArrayBuffer && "undefined" != typeof Uint8Array, r.nodebuffer = "undefined" != typeof Buffer, r.uint8array = "undefined" != typeof Uint8Array, "undefined" == typeof ArrayBuffer) r.blob = false;
          else {
            var n = new ArrayBuffer(0);
            try {
              r.blob = 0 === new Blob([n], { type: "application/zip" }).size;
            } catch (e2) {
              try {
                var i = new (self.BlobBuilder || self.WebKitBlobBuilder || self.MozBlobBuilder || self.MSBlobBuilder)();
                i.append(n), r.blob = 0 === i.getBlob("application/zip").size;
              } catch (e3) {
                r.blob = false;
              }
            }
          }
          try {
            r.nodestream = !!e("readable-stream").Readable;
          } catch (e2) {
            r.nodestream = false;
          }
        }, { "readable-stream": 16 }], 31: [function(e, t, s) {
          "use strict";
          for (var o = e("./utils"), h = e("./support"), r = e("./nodejsUtils"), n = e("./stream/GenericWorker"), u = new Array(256), i = 0; i < 256; i++) u[i] = 252 <= i ? 6 : 248 <= i ? 5 : 240 <= i ? 4 : 224 <= i ? 3 : 192 <= i ? 2 : 1;
          u[254] = u[254] = 1;
          function a() {
            n.call(this, "utf-8 decode"), this.leftOver = null;
          }
          function l() {
            n.call(this, "utf-8 encode");
          }
          s.utf8encode = function(e2) {
            return h.nodebuffer ? r.newBufferFrom(e2, "utf-8") : (function(e3) {
              var t2, r2, n2, i2, s2, a2 = e3.length, o2 = 0;
              for (i2 = 0; i2 < a2; i2++) 55296 == (64512 & (r2 = e3.charCodeAt(i2))) && i2 + 1 < a2 && 56320 == (64512 & (n2 = e3.charCodeAt(i2 + 1))) && (r2 = 65536 + (r2 - 55296 << 10) + (n2 - 56320), i2++), o2 += r2 < 128 ? 1 : r2 < 2048 ? 2 : r2 < 65536 ? 3 : 4;
              for (t2 = h.uint8array ? new Uint8Array(o2) : new Array(o2), i2 = s2 = 0; s2 < o2; i2++) 55296 == (64512 & (r2 = e3.charCodeAt(i2))) && i2 + 1 < a2 && 56320 == (64512 & (n2 = e3.charCodeAt(i2 + 1))) && (r2 = 65536 + (r2 - 55296 << 10) + (n2 - 56320), i2++), r2 < 128 ? t2[s2++] = r2 : (r2 < 2048 ? t2[s2++] = 192 | r2 >>> 6 : (r2 < 65536 ? t2[s2++] = 224 | r2 >>> 12 : (t2[s2++] = 240 | r2 >>> 18, t2[s2++] = 128 | r2 >>> 12 & 63), t2[s2++] = 128 | r2 >>> 6 & 63), t2[s2++] = 128 | 63 & r2);
              return t2;
            })(e2);
          }, s.utf8decode = function(e2) {
            return h.nodebuffer ? o.transformTo("nodebuffer", e2).toString("utf-8") : (function(e3) {
              var t2, r2, n2, i2, s2 = e3.length, a2 = new Array(2 * s2);
              for (t2 = r2 = 0; t2 < s2; ) if ((n2 = e3[t2++]) < 128) a2[r2++] = n2;
              else if (4 < (i2 = u[n2])) a2[r2++] = 65533, t2 += i2 - 1;
              else {
                for (n2 &= 2 === i2 ? 31 : 3 === i2 ? 15 : 7; 1 < i2 && t2 < s2; ) n2 = n2 << 6 | 63 & e3[t2++], i2--;
                1 < i2 ? a2[r2++] = 65533 : n2 < 65536 ? a2[r2++] = n2 : (n2 -= 65536, a2[r2++] = 55296 | n2 >> 10 & 1023, a2[r2++] = 56320 | 1023 & n2);
              }
              return a2.length !== r2 && (a2.subarray ? a2 = a2.subarray(0, r2) : a2.length = r2), o.applyFromCharCode(a2);
            })(e2 = o.transformTo(h.uint8array ? "uint8array" : "array", e2));
          }, o.inherits(a, n), a.prototype.processChunk = function(e2) {
            var t2 = o.transformTo(h.uint8array ? "uint8array" : "array", e2.data);
            if (this.leftOver && this.leftOver.length) {
              if (h.uint8array) {
                var r2 = t2;
                (t2 = new Uint8Array(r2.length + this.leftOver.length)).set(this.leftOver, 0), t2.set(r2, this.leftOver.length);
              } else t2 = this.leftOver.concat(t2);
              this.leftOver = null;
            }
            var n2 = (function(e3, t3) {
              var r3;
              for ((t3 = t3 || e3.length) > e3.length && (t3 = e3.length), r3 = t3 - 1; 0 <= r3 && 128 == (192 & e3[r3]); ) r3--;
              return r3 < 0 ? t3 : 0 === r3 ? t3 : r3 + u[e3[r3]] > t3 ? r3 : t3;
            })(t2), i2 = t2;
            n2 !== t2.length && (h.uint8array ? (i2 = t2.subarray(0, n2), this.leftOver = t2.subarray(n2, t2.length)) : (i2 = t2.slice(0, n2), this.leftOver = t2.slice(n2, t2.length))), this.push({ data: s.utf8decode(i2), meta: e2.meta });
          }, a.prototype.flush = function() {
            this.leftOver && this.leftOver.length && (this.push({ data: s.utf8decode(this.leftOver), meta: {} }), this.leftOver = null);
          }, s.Utf8DecodeWorker = a, o.inherits(l, n), l.prototype.processChunk = function(e2) {
            this.push({ data: s.utf8encode(e2.data), meta: e2.meta });
          }, s.Utf8EncodeWorker = l;
        }, { "./nodejsUtils": 14, "./stream/GenericWorker": 28, "./support": 30, "./utils": 32 }], 32: [function(e, t, a) {
          "use strict";
          var o = e("./support"), h = e("./base64"), r = e("./nodejsUtils"), u = e("./external");
          function n(e2) {
            return e2;
          }
          function l(e2, t2) {
            for (var r2 = 0; r2 < e2.length; ++r2) t2[r2] = 255 & e2.charCodeAt(r2);
            return t2;
          }
          e("setimmediate"), a.newBlob = function(t2, r2) {
            a.checkSupport("blob");
            try {
              return new Blob([t2], { type: r2 });
            } catch (e2) {
              try {
                var n2 = new (self.BlobBuilder || self.WebKitBlobBuilder || self.MozBlobBuilder || self.MSBlobBuilder)();
                return n2.append(t2), n2.getBlob(r2);
              } catch (e3) {
                throw new Error("Bug : can't construct the Blob.");
              }
            }
          };
          var i = { stringifyByChunk: function(e2, t2, r2) {
            var n2 = [], i2 = 0, s2 = e2.length;
            if (s2 <= r2) return String.fromCharCode.apply(null, e2);
            for (; i2 < s2; ) "array" === t2 || "nodebuffer" === t2 ? n2.push(String.fromCharCode.apply(null, e2.slice(i2, Math.min(i2 + r2, s2)))) : n2.push(String.fromCharCode.apply(null, e2.subarray(i2, Math.min(i2 + r2, s2)))), i2 += r2;
            return n2.join("");
          }, stringifyByChar: function(e2) {
            for (var t2 = "", r2 = 0; r2 < e2.length; r2++) t2 += String.fromCharCode(e2[r2]);
            return t2;
          }, applyCanBeUsed: { uint8array: (function() {
            try {
              return o.uint8array && 1 === String.fromCharCode.apply(null, new Uint8Array(1)).length;
            } catch (e2) {
              return false;
            }
          })(), nodebuffer: (function() {
            try {
              return o.nodebuffer && 1 === String.fromCharCode.apply(null, r.allocBuffer(1)).length;
            } catch (e2) {
              return false;
            }
          })() } };
          function s(e2) {
            var t2 = 65536, r2 = a.getTypeOf(e2), n2 = true;
            if ("uint8array" === r2 ? n2 = i.applyCanBeUsed.uint8array : "nodebuffer" === r2 && (n2 = i.applyCanBeUsed.nodebuffer), n2) for (; 1 < t2; ) try {
              return i.stringifyByChunk(e2, r2, t2);
            } catch (e3) {
              t2 = Math.floor(t2 / 2);
            }
            return i.stringifyByChar(e2);
          }
          function f(e2, t2) {
            for (var r2 = 0; r2 < e2.length; r2++) t2[r2] = e2[r2];
            return t2;
          }
          a.applyFromCharCode = s;
          var c = {};
          c.string = { string: n, array: function(e2) {
            return l(e2, new Array(e2.length));
          }, arraybuffer: function(e2) {
            return c.string.uint8array(e2).buffer;
          }, uint8array: function(e2) {
            return l(e2, new Uint8Array(e2.length));
          }, nodebuffer: function(e2) {
            return l(e2, r.allocBuffer(e2.length));
          } }, c.array = { string: s, array: n, arraybuffer: function(e2) {
            return new Uint8Array(e2).buffer;
          }, uint8array: function(e2) {
            return new Uint8Array(e2);
          }, nodebuffer: function(e2) {
            return r.newBufferFrom(e2);
          } }, c.arraybuffer = { string: function(e2) {
            return s(new Uint8Array(e2));
          }, array: function(e2) {
            return f(new Uint8Array(e2), new Array(e2.byteLength));
          }, arraybuffer: n, uint8array: function(e2) {
            return new Uint8Array(e2);
          }, nodebuffer: function(e2) {
            return r.newBufferFrom(new Uint8Array(e2));
          } }, c.uint8array = { string: s, array: function(e2) {
            return f(e2, new Array(e2.length));
          }, arraybuffer: function(e2) {
            return e2.buffer;
          }, uint8array: n, nodebuffer: function(e2) {
            return r.newBufferFrom(e2);
          } }, c.nodebuffer = { string: s, array: function(e2) {
            return f(e2, new Array(e2.length));
          }, arraybuffer: function(e2) {
            return c.nodebuffer.uint8array(e2).buffer;
          }, uint8array: function(e2) {
            return f(e2, new Uint8Array(e2.length));
          }, nodebuffer: n }, a.transformTo = function(e2, t2) {
            if (t2 = t2 || "", !e2) return t2;
            a.checkSupport(e2);
            var r2 = a.getTypeOf(t2);
            return c[r2][e2](t2);
          }, a.resolve = function(e2) {
            for (var t2 = e2.split("/"), r2 = [], n2 = 0; n2 < t2.length; n2++) {
              var i2 = t2[n2];
              "." === i2 || "" === i2 && 0 !== n2 && n2 !== t2.length - 1 || (".." === i2 ? r2.pop() : r2.push(i2));
            }
            return r2.join("/");
          }, a.getTypeOf = function(e2) {
            if ("string" == typeof e2) return "string";
            var t2 = Object.prototype.toString.call(e2);
            return "[object Array]" === t2 ? "array" : o.nodebuffer && r.isBuffer(e2) ? "nodebuffer" : o.uint8array && "[object Uint8Array]" === t2 ? "uint8array" : o.arraybuffer && "[object ArrayBuffer]" === t2 ? "arraybuffer" : void 0;
          }, a.checkSupport = function(e2) {
            if (!o[e2.toLowerCase()]) throw new Error(e2 + " is not supported by this platform");
          }, a.MAX_VALUE_16BITS = 65535, a.MAX_VALUE_32BITS = -1, a.pretty = function(e2) {
            var t2, r2, n2 = "";
            for (r2 = 0; r2 < (e2 || "").length; r2++) n2 += "\\x" + ((t2 = e2.charCodeAt(r2)) < 16 ? "0" : "") + t2.toString(16).toUpperCase();
            return n2;
          }, a.delay = function(e2, t2, r2) {
            setImmediate(function() {
              e2.apply(r2 || null, t2 || []);
            });
          }, a.inherits = function(e2, t2) {
            function r2() {
            }
            r2.prototype = t2.prototype, e2.prototype = new r2();
          }, a.extend = function() {
            var e2, t2, r2 = {};
            for (e2 = 0; e2 < arguments.length; e2++) for (t2 in arguments[e2]) Object.prototype.hasOwnProperty.call(arguments[e2], t2) && void 0 === r2[t2] && (r2[t2] = arguments[e2][t2]);
            return r2;
          }, a.prepareContent = function(r2, e2, n2, i2, s2) {
            return u.Promise.resolve(e2).then(function(n3) {
              return o.blob && (n3 instanceof Blob || -1 !== ["[object File]", "[object Blob]"].indexOf(Object.prototype.toString.call(n3))) ? void 0 !== Blob.prototype.arrayBuffer ? n3.arrayBuffer() : "undefined" != typeof FileReader ? new u.Promise(function(t2, r3) {
                var e3 = new FileReader();
                e3.onload = function(e4) {
                  t2(e4.target.result);
                }, e3.onerror = function(e4) {
                  r3(e4.target.error);
                }, e3.readAsArrayBuffer(n3);
              }) : u.Promise.reject(new Error(r2 + " is a Blob, but we have no way of reading it.")) : n3;
            }).then(function(e3) {
              var t2 = a.getTypeOf(e3);
              return t2 ? ("arraybuffer" === t2 ? e3 = a.transformTo("uint8array", e3) : "string" === t2 && (s2 ? e3 = h.decode(e3) : n2 && true !== i2 && (e3 = (function(e4) {
                return l(e4, o.uint8array ? new Uint8Array(e4.length) : new Array(e4.length));
              })(e3))), e3) : u.Promise.reject(new Error("Can't read the data of '" + r2 + "'. Is it in a supported JavaScript type (String, Blob, ArrayBuffer, etc) ?"));
            });
          };
        }, { "./base64": 1, "./external": 6, "./nodejsUtils": 14, "./support": 30, setimmediate: 54 }], 33: [function(e, t, r) {
          "use strict";
          var n = e("./reader/readerFor"), i = e("./utils"), s = e("./signature"), a = e("./zipEntry"), o = e("./support");
          function h(e2) {
            this.files = [], this.loadOptions = e2;
          }
          h.prototype = { checkSignature: function(e2) {
            if (!this.reader.readAndCheckSignature(e2)) {
              this.reader.index -= 4;
              var t2 = this.reader.readString(4);
              throw new Error("Corrupted zip or bug: unexpected signature (" + i.pretty(t2) + ", expected " + i.pretty(e2) + ")");
            }
          }, isSignature: function(e2, t2) {
            var r2 = this.reader.index;
            this.reader.setIndex(e2);
            var n2 = this.reader.readString(4) === t2;
            return this.reader.setIndex(r2), n2;
          }, readBlockEndOfCentral: function() {
            this.diskNumber = this.reader.readInt(2), this.diskWithCentralDirStart = this.reader.readInt(2), this.centralDirRecordsOnThisDisk = this.reader.readInt(2), this.centralDirRecords = this.reader.readInt(2), this.centralDirSize = this.reader.readInt(4), this.centralDirOffset = this.reader.readInt(4), this.zipCommentLength = this.reader.readInt(2);
            var e2 = this.reader.readData(this.zipCommentLength), t2 = o.uint8array ? "uint8array" : "array", r2 = i.transformTo(t2, e2);
            this.zipComment = this.loadOptions.decodeFileName(r2);
          }, readBlockZip64EndOfCentral: function() {
            this.zip64EndOfCentralSize = this.reader.readInt(8), this.reader.skip(4), this.diskNumber = this.reader.readInt(4), this.diskWithCentralDirStart = this.reader.readInt(4), this.centralDirRecordsOnThisDisk = this.reader.readInt(8), this.centralDirRecords = this.reader.readInt(8), this.centralDirSize = this.reader.readInt(8), this.centralDirOffset = this.reader.readInt(8), this.zip64ExtensibleData = {};
            for (var e2, t2, r2, n2 = this.zip64EndOfCentralSize - 44; 0 < n2; ) e2 = this.reader.readInt(2), t2 = this.reader.readInt(4), r2 = this.reader.readData(t2), this.zip64ExtensibleData[e2] = { id: e2, length: t2, value: r2 };
          }, readBlockZip64EndOfCentralLocator: function() {
            if (this.diskWithZip64CentralDirStart = this.reader.readInt(4), this.relativeOffsetEndOfZip64CentralDir = this.reader.readInt(8), this.disksCount = this.reader.readInt(4), 1 < this.disksCount) throw new Error("Multi-volumes zip are not supported");
          }, readLocalFiles: function() {
            var e2, t2;
            for (e2 = 0; e2 < this.files.length; e2++) t2 = this.files[e2], this.reader.setIndex(t2.localHeaderOffset), this.checkSignature(s.LOCAL_FILE_HEADER), t2.readLocalPart(this.reader), t2.handleUTF8(), t2.processAttributes();
          }, readCentralDir: function() {
            var e2;
            for (this.reader.setIndex(this.centralDirOffset); this.reader.readAndCheckSignature(s.CENTRAL_FILE_HEADER); ) (e2 = new a({ zip64: this.zip64 }, this.loadOptions)).readCentralPart(this.reader), this.files.push(e2);
            if (this.centralDirRecords !== this.files.length && 0 !== this.centralDirRecords && 0 === this.files.length) throw new Error("Corrupted zip or bug: expected " + this.centralDirRecords + " records in central dir, got " + this.files.length);
          }, readEndOfCentral: function() {
            var e2 = this.reader.lastIndexOfSignature(s.CENTRAL_DIRECTORY_END);
            if (e2 < 0) throw !this.isSignature(0, s.LOCAL_FILE_HEADER) ? new Error("Can't find end of central directory : is this a zip file ? If it is, see https://stuk.github.io/jszip/documentation/howto/read_zip.html") : new Error("Corrupted zip: can't find end of central directory");
            this.reader.setIndex(e2);
            var t2 = e2;
            if (this.checkSignature(s.CENTRAL_DIRECTORY_END), this.readBlockEndOfCentral(), this.diskNumber === i.MAX_VALUE_16BITS || this.diskWithCentralDirStart === i.MAX_VALUE_16BITS || this.centralDirRecordsOnThisDisk === i.MAX_VALUE_16BITS || this.centralDirRecords === i.MAX_VALUE_16BITS || this.centralDirSize === i.MAX_VALUE_32BITS || this.centralDirOffset === i.MAX_VALUE_32BITS) {
              if (this.zip64 = true, (e2 = this.reader.lastIndexOfSignature(s.ZIP64_CENTRAL_DIRECTORY_LOCATOR)) < 0) throw new Error("Corrupted zip: can't find the ZIP64 end of central directory locator");
              if (this.reader.setIndex(e2), this.checkSignature(s.ZIP64_CENTRAL_DIRECTORY_LOCATOR), this.readBlockZip64EndOfCentralLocator(), !this.isSignature(this.relativeOffsetEndOfZip64CentralDir, s.ZIP64_CENTRAL_DIRECTORY_END) && (this.relativeOffsetEndOfZip64CentralDir = this.reader.lastIndexOfSignature(s.ZIP64_CENTRAL_DIRECTORY_END), this.relativeOffsetEndOfZip64CentralDir < 0)) throw new Error("Corrupted zip: can't find the ZIP64 end of central directory");
              this.reader.setIndex(this.relativeOffsetEndOfZip64CentralDir), this.checkSignature(s.ZIP64_CENTRAL_DIRECTORY_END), this.readBlockZip64EndOfCentral();
            }
            var r2 = this.centralDirOffset + this.centralDirSize;
            this.zip64 && (r2 += 20, r2 += 12 + this.zip64EndOfCentralSize);
            var n2 = t2 - r2;
            if (0 < n2) this.isSignature(t2, s.CENTRAL_FILE_HEADER) || (this.reader.zero = n2);
            else if (n2 < 0) throw new Error("Corrupted zip: missing " + Math.abs(n2) + " bytes.");
          }, prepareReader: function(e2) {
            this.reader = n(e2);
          }, load: function(e2) {
            this.prepareReader(e2), this.readEndOfCentral(), this.readCentralDir(), this.readLocalFiles();
          } }, t.exports = h;
        }, { "./reader/readerFor": 22, "./signature": 23, "./support": 30, "./utils": 32, "./zipEntry": 34 }], 34: [function(e, t, r) {
          "use strict";
          var n = e("./reader/readerFor"), s = e("./utils"), i = e("./compressedObject"), a = e("./crc32"), o = e("./utf8"), h = e("./compressions"), u = e("./support");
          function l(e2, t2) {
            this.options = e2, this.loadOptions = t2;
          }
          l.prototype = { isEncrypted: function() {
            return 1 == (1 & this.bitFlag);
          }, useUTF8: function() {
            return 2048 == (2048 & this.bitFlag);
          }, readLocalPart: function(e2) {
            var t2, r2;
            if (e2.skip(22), this.fileNameLength = e2.readInt(2), r2 = e2.readInt(2), this.fileName = e2.readData(this.fileNameLength), e2.skip(r2), -1 === this.compressedSize || -1 === this.uncompressedSize) throw new Error("Bug or corrupted zip : didn't get enough information from the central directory (compressedSize === -1 || uncompressedSize === -1)");
            if (null === (t2 = (function(e3) {
              for (var t3 in h) if (Object.prototype.hasOwnProperty.call(h, t3) && h[t3].magic === e3) return h[t3];
              return null;
            })(this.compressionMethod))) throw new Error("Corrupted zip : compression " + s.pretty(this.compressionMethod) + " unknown (inner file : " + s.transformTo("string", this.fileName) + ")");
            this.decompressed = new i(this.compressedSize, this.uncompressedSize, this.crc32, t2, e2.readData(this.compressedSize));
          }, readCentralPart: function(e2) {
            this.versionMadeBy = e2.readInt(2), e2.skip(2), this.bitFlag = e2.readInt(2), this.compressionMethod = e2.readString(2), this.date = e2.readDate(), this.crc32 = e2.readInt(4), this.compressedSize = e2.readInt(4), this.uncompressedSize = e2.readInt(4);
            var t2 = e2.readInt(2);
            if (this.extraFieldsLength = e2.readInt(2), this.fileCommentLength = e2.readInt(2), this.diskNumberStart = e2.readInt(2), this.internalFileAttributes = e2.readInt(2), this.externalFileAttributes = e2.readInt(4), this.localHeaderOffset = e2.readInt(4), this.isEncrypted()) throw new Error("Encrypted zip are not supported");
            e2.skip(t2), this.readExtraFields(e2), this.parseZIP64ExtraField(e2), this.fileComment = e2.readData(this.fileCommentLength);
          }, processAttributes: function() {
            this.unixPermissions = null, this.dosPermissions = null;
            var e2 = this.versionMadeBy >> 8;
            this.dir = !!(16 & this.externalFileAttributes), 0 == e2 && (this.dosPermissions = 63 & this.externalFileAttributes), 3 == e2 && (this.unixPermissions = this.externalFileAttributes >> 16 & 65535), this.dir || "/" !== this.fileNameStr.slice(-1) || (this.dir = true);
          }, parseZIP64ExtraField: function() {
            if (this.extraFields[1]) {
              var e2 = n(this.extraFields[1].value);
              this.uncompressedSize === s.MAX_VALUE_32BITS && (this.uncompressedSize = e2.readInt(8)), this.compressedSize === s.MAX_VALUE_32BITS && (this.compressedSize = e2.readInt(8)), this.localHeaderOffset === s.MAX_VALUE_32BITS && (this.localHeaderOffset = e2.readInt(8)), this.diskNumberStart === s.MAX_VALUE_32BITS && (this.diskNumberStart = e2.readInt(4));
            }
          }, readExtraFields: function(e2) {
            var t2, r2, n2, i2 = e2.index + this.extraFieldsLength;
            for (this.extraFields || (this.extraFields = {}); e2.index + 4 < i2; ) t2 = e2.readInt(2), r2 = e2.readInt(2), n2 = e2.readData(r2), this.extraFields[t2] = { id: t2, length: r2, value: n2 };
            e2.setIndex(i2);
          }, handleUTF8: function() {
            var e2 = u.uint8array ? "uint8array" : "array";
            if (this.useUTF8()) this.fileNameStr = o.utf8decode(this.fileName), this.fileCommentStr = o.utf8decode(this.fileComment);
            else {
              var t2 = this.findExtraFieldUnicodePath();
              if (null !== t2) this.fileNameStr = t2;
              else {
                var r2 = s.transformTo(e2, this.fileName);
                this.fileNameStr = this.loadOptions.decodeFileName(r2);
              }
              var n2 = this.findExtraFieldUnicodeComment();
              if (null !== n2) this.fileCommentStr = n2;
              else {
                var i2 = s.transformTo(e2, this.fileComment);
                this.fileCommentStr = this.loadOptions.decodeFileName(i2);
              }
            }
          }, findExtraFieldUnicodePath: function() {
            var e2 = this.extraFields[28789];
            if (e2) {
              var t2 = n(e2.value);
              return 1 !== t2.readInt(1) ? null : a(this.fileName) !== t2.readInt(4) ? null : o.utf8decode(t2.readData(e2.length - 5));
            }
            return null;
          }, findExtraFieldUnicodeComment: function() {
            var e2 = this.extraFields[25461];
            if (e2) {
              var t2 = n(e2.value);
              return 1 !== t2.readInt(1) ? null : a(this.fileComment) !== t2.readInt(4) ? null : o.utf8decode(t2.readData(e2.length - 5));
            }
            return null;
          } }, t.exports = l;
        }, { "./compressedObject": 2, "./compressions": 3, "./crc32": 4, "./reader/readerFor": 22, "./support": 30, "./utf8": 31, "./utils": 32 }], 35: [function(e, t, r) {
          "use strict";
          function n(e2, t2, r2) {
            this.name = e2, this.dir = r2.dir, this.date = r2.date, this.comment = r2.comment, this.unixPermissions = r2.unixPermissions, this.dosPermissions = r2.dosPermissions, this._data = t2, this._dataBinary = r2.binary, this.options = { compression: r2.compression, compressionOptions: r2.compressionOptions };
          }
          var s = e("./stream/StreamHelper"), i = e("./stream/DataWorker"), a = e("./utf8"), o = e("./compressedObject"), h = e("./stream/GenericWorker");
          n.prototype = { internalStream: function(e2) {
            var t2 = null, r2 = "string";
            try {
              if (!e2) throw new Error("No output type specified.");
              var n2 = "string" === (r2 = e2.toLowerCase()) || "text" === r2;
              "binarystring" !== r2 && "text" !== r2 || (r2 = "string"), t2 = this._decompressWorker();
              var i2 = !this._dataBinary;
              i2 && !n2 && (t2 = t2.pipe(new a.Utf8EncodeWorker())), !i2 && n2 && (t2 = t2.pipe(new a.Utf8DecodeWorker()));
            } catch (e3) {
              (t2 = new h("error")).error(e3);
            }
            return new s(t2, r2, "");
          }, async: function(e2, t2) {
            return this.internalStream(e2).accumulate(t2);
          }, nodeStream: function(e2, t2) {
            return this.internalStream(e2 || "nodebuffer").toNodejsStream(t2);
          }, _compressWorker: function(e2, t2) {
            if (this._data instanceof o && this._data.compression.magic === e2.magic) return this._data.getCompressedWorker();
            var r2 = this._decompressWorker();
            return this._dataBinary || (r2 = r2.pipe(new a.Utf8EncodeWorker())), o.createWorkerFrom(r2, e2, t2);
          }, _decompressWorker: function() {
            return this._data instanceof o ? this._data.getContentWorker() : this._data instanceof h ? this._data : new i(this._data);
          } };
          for (var u = ["asText", "asBinary", "asNodeBuffer", "asUint8Array", "asArrayBuffer"], l = function() {
            throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
          }, f = 0; f < u.length; f++) n.prototype[u[f]] = l;
          t.exports = n;
        }, { "./compressedObject": 2, "./stream/DataWorker": 27, "./stream/GenericWorker": 28, "./stream/StreamHelper": 29, "./utf8": 31 }], 36: [function(e, l, t) {
          (function(t2) {
            "use strict";
            var r, n, e2 = t2.MutationObserver || t2.WebKitMutationObserver;
            if (e2) {
              var i = 0, s = new e2(u), a = t2.document.createTextNode("");
              s.observe(a, { characterData: true }), r = function() {
                a.data = i = ++i % 2;
              };
            } else if (t2.setImmediate || void 0 === t2.MessageChannel) r = "document" in t2 && "onreadystatechange" in t2.document.createElement("script") ? function() {
              var e3 = t2.document.createElement("script");
              e3.onreadystatechange = function() {
                u(), e3.onreadystatechange = null, e3.parentNode.removeChild(e3), e3 = null;
              }, t2.document.documentElement.appendChild(e3);
            } : function() {
              setTimeout(u, 0);
            };
            else {
              var o = new t2.MessageChannel();
              o.port1.onmessage = u, r = function() {
                o.port2.postMessage(0);
              };
            }
            var h = [];
            function u() {
              var e3, t3;
              n = true;
              for (var r2 = h.length; r2; ) {
                for (t3 = h, h = [], e3 = -1; ++e3 < r2; ) t3[e3]();
                r2 = h.length;
              }
              n = false;
            }
            l.exports = function(e3) {
              1 !== h.push(e3) || n || r();
            };
          }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
        }, {}], 37: [function(e, t, r) {
          "use strict";
          var i = e("immediate");
          function u() {
          }
          var l = {}, s = ["REJECTED"], a = ["FULFILLED"], n = ["PENDING"];
          function o(e2) {
            if ("function" != typeof e2) throw new TypeError("resolver must be a function");
            this.state = n, this.queue = [], this.outcome = void 0, e2 !== u && d(this, e2);
          }
          function h(e2, t2, r2) {
            this.promise = e2, "function" == typeof t2 && (this.onFulfilled = t2, this.callFulfilled = this.otherCallFulfilled), "function" == typeof r2 && (this.onRejected = r2, this.callRejected = this.otherCallRejected);
          }
          function f(t2, r2, n2) {
            i(function() {
              var e2;
              try {
                e2 = r2(n2);
              } catch (e3) {
                return l.reject(t2, e3);
              }
              e2 === t2 ? l.reject(t2, new TypeError("Cannot resolve promise with itself")) : l.resolve(t2, e2);
            });
          }
          function c(e2) {
            var t2 = e2 && e2.then;
            if (e2 && ("object" == typeof e2 || "function" == typeof e2) && "function" == typeof t2) return function() {
              t2.apply(e2, arguments);
            };
          }
          function d(t2, e2) {
            var r2 = false;
            function n2(e3) {
              r2 || (r2 = true, l.reject(t2, e3));
            }
            function i2(e3) {
              r2 || (r2 = true, l.resolve(t2, e3));
            }
            var s2 = p(function() {
              e2(i2, n2);
            });
            "error" === s2.status && n2(s2.value);
          }
          function p(e2, t2) {
            var r2 = {};
            try {
              r2.value = e2(t2), r2.status = "success";
            } catch (e3) {
              r2.status = "error", r2.value = e3;
            }
            return r2;
          }
          (t.exports = o).prototype.finally = function(t2) {
            if ("function" != typeof t2) return this;
            var r2 = this.constructor;
            return this.then(function(e2) {
              return r2.resolve(t2()).then(function() {
                return e2;
              });
            }, function(e2) {
              return r2.resolve(t2()).then(function() {
                throw e2;
              });
            });
          }, o.prototype.catch = function(e2) {
            return this.then(null, e2);
          }, o.prototype.then = function(e2, t2) {
            if ("function" != typeof e2 && this.state === a || "function" != typeof t2 && this.state === s) return this;
            var r2 = new this.constructor(u);
            this.state !== n ? f(r2, this.state === a ? e2 : t2, this.outcome) : this.queue.push(new h(r2, e2, t2));
            return r2;
          }, h.prototype.callFulfilled = function(e2) {
            l.resolve(this.promise, e2);
          }, h.prototype.otherCallFulfilled = function(e2) {
            f(this.promise, this.onFulfilled, e2);
          }, h.prototype.callRejected = function(e2) {
            l.reject(this.promise, e2);
          }, h.prototype.otherCallRejected = function(e2) {
            f(this.promise, this.onRejected, e2);
          }, l.resolve = function(e2, t2) {
            var r2 = p(c, t2);
            if ("error" === r2.status) return l.reject(e2, r2.value);
            var n2 = r2.value;
            if (n2) d(e2, n2);
            else {
              e2.state = a, e2.outcome = t2;
              for (var i2 = -1, s2 = e2.queue.length; ++i2 < s2; ) e2.queue[i2].callFulfilled(t2);
            }
            return e2;
          }, l.reject = function(e2, t2) {
            e2.state = s, e2.outcome = t2;
            for (var r2 = -1, n2 = e2.queue.length; ++r2 < n2; ) e2.queue[r2].callRejected(t2);
            return e2;
          }, o.resolve = function(e2) {
            if (e2 instanceof this) return e2;
            return l.resolve(new this(u), e2);
          }, o.reject = function(e2) {
            var t2 = new this(u);
            return l.reject(t2, e2);
          }, o.all = function(e2) {
            var r2 = this;
            if ("[object Array]" !== Object.prototype.toString.call(e2)) return this.reject(new TypeError("must be an array"));
            var n2 = e2.length, i2 = false;
            if (!n2) return this.resolve([]);
            var s2 = new Array(n2), a2 = 0, t2 = -1, o2 = new this(u);
            for (; ++t2 < n2; ) h2(e2[t2], t2);
            return o2;
            function h2(e3, t3) {
              r2.resolve(e3).then(function(e4) {
                s2[t3] = e4, ++a2 !== n2 || i2 || (i2 = true, l.resolve(o2, s2));
              }, function(e4) {
                i2 || (i2 = true, l.reject(o2, e4));
              });
            }
          }, o.race = function(e2) {
            var t2 = this;
            if ("[object Array]" !== Object.prototype.toString.call(e2)) return this.reject(new TypeError("must be an array"));
            var r2 = e2.length, n2 = false;
            if (!r2) return this.resolve([]);
            var i2 = -1, s2 = new this(u);
            for (; ++i2 < r2; ) a2 = e2[i2], t2.resolve(a2).then(function(e3) {
              n2 || (n2 = true, l.resolve(s2, e3));
            }, function(e3) {
              n2 || (n2 = true, l.reject(s2, e3));
            });
            var a2;
            return s2;
          };
        }, { immediate: 36 }], 38: [function(e, t, r) {
          "use strict";
          var n = {};
          (0, e("./lib/utils/common").assign)(n, e("./lib/deflate"), e("./lib/inflate"), e("./lib/zlib/constants")), t.exports = n;
        }, { "./lib/deflate": 39, "./lib/inflate": 40, "./lib/utils/common": 41, "./lib/zlib/constants": 44 }], 39: [function(e, t, r) {
          "use strict";
          var a = e("./zlib/deflate"), o = e("./utils/common"), h = e("./utils/strings"), i = e("./zlib/messages"), s = e("./zlib/zstream"), u = Object.prototype.toString, l = 0, f = -1, c = 0, d = 8;
          function p(e2) {
            if (!(this instanceof p)) return new p(e2);
            this.options = o.assign({ level: f, method: d, chunkSize: 16384, windowBits: 15, memLevel: 8, strategy: c, to: "" }, e2 || {});
            var t2 = this.options;
            t2.raw && 0 < t2.windowBits ? t2.windowBits = -t2.windowBits : t2.gzip && 0 < t2.windowBits && t2.windowBits < 16 && (t2.windowBits += 16), this.err = 0, this.msg = "", this.ended = false, this.chunks = [], this.strm = new s(), this.strm.avail_out = 0;
            var r2 = a.deflateInit2(this.strm, t2.level, t2.method, t2.windowBits, t2.memLevel, t2.strategy);
            if (r2 !== l) throw new Error(i[r2]);
            if (t2.header && a.deflateSetHeader(this.strm, t2.header), t2.dictionary) {
              var n2;
              if (n2 = "string" == typeof t2.dictionary ? h.string2buf(t2.dictionary) : "[object ArrayBuffer]" === u.call(t2.dictionary) ? new Uint8Array(t2.dictionary) : t2.dictionary, (r2 = a.deflateSetDictionary(this.strm, n2)) !== l) throw new Error(i[r2]);
              this._dict_set = true;
            }
          }
          function n(e2, t2) {
            var r2 = new p(t2);
            if (r2.push(e2, true), r2.err) throw r2.msg || i[r2.err];
            return r2.result;
          }
          p.prototype.push = function(e2, t2) {
            var r2, n2, i2 = this.strm, s2 = this.options.chunkSize;
            if (this.ended) return false;
            n2 = t2 === ~~t2 ? t2 : true === t2 ? 4 : 0, "string" == typeof e2 ? i2.input = h.string2buf(e2) : "[object ArrayBuffer]" === u.call(e2) ? i2.input = new Uint8Array(e2) : i2.input = e2, i2.next_in = 0, i2.avail_in = i2.input.length;
            do {
              if (0 === i2.avail_out && (i2.output = new o.Buf8(s2), i2.next_out = 0, i2.avail_out = s2), 1 !== (r2 = a.deflate(i2, n2)) && r2 !== l) return this.onEnd(r2), !(this.ended = true);
              0 !== i2.avail_out && (0 !== i2.avail_in || 4 !== n2 && 2 !== n2) || ("string" === this.options.to ? this.onData(h.buf2binstring(o.shrinkBuf(i2.output, i2.next_out))) : this.onData(o.shrinkBuf(i2.output, i2.next_out)));
            } while ((0 < i2.avail_in || 0 === i2.avail_out) && 1 !== r2);
            return 4 === n2 ? (r2 = a.deflateEnd(this.strm), this.onEnd(r2), this.ended = true, r2 === l) : 2 !== n2 || (this.onEnd(l), !(i2.avail_out = 0));
          }, p.prototype.onData = function(e2) {
            this.chunks.push(e2);
          }, p.prototype.onEnd = function(e2) {
            e2 === l && ("string" === this.options.to ? this.result = this.chunks.join("") : this.result = o.flattenChunks(this.chunks)), this.chunks = [], this.err = e2, this.msg = this.strm.msg;
          }, r.Deflate = p, r.deflate = n, r.deflateRaw = function(e2, t2) {
            return (t2 = t2 || {}).raw = true, n(e2, t2);
          }, r.gzip = function(e2, t2) {
            return (t2 = t2 || {}).gzip = true, n(e2, t2);
          };
        }, { "./utils/common": 41, "./utils/strings": 42, "./zlib/deflate": 46, "./zlib/messages": 51, "./zlib/zstream": 53 }], 40: [function(e, t, r) {
          "use strict";
          var c = e("./zlib/inflate"), d = e("./utils/common"), p = e("./utils/strings"), m = e("./zlib/constants"), n = e("./zlib/messages"), i = e("./zlib/zstream"), s = e("./zlib/gzheader"), _ = Object.prototype.toString;
          function a(e2) {
            if (!(this instanceof a)) return new a(e2);
            this.options = d.assign({ chunkSize: 16384, windowBits: 0, to: "" }, e2 || {});
            var t2 = this.options;
            t2.raw && 0 <= t2.windowBits && t2.windowBits < 16 && (t2.windowBits = -t2.windowBits, 0 === t2.windowBits && (t2.windowBits = -15)), !(0 <= t2.windowBits && t2.windowBits < 16) || e2 && e2.windowBits || (t2.windowBits += 32), 15 < t2.windowBits && t2.windowBits < 48 && 0 == (15 & t2.windowBits) && (t2.windowBits |= 15), this.err = 0, this.msg = "", this.ended = false, this.chunks = [], this.strm = new i(), this.strm.avail_out = 0;
            var r2 = c.inflateInit2(this.strm, t2.windowBits);
            if (r2 !== m.Z_OK) throw new Error(n[r2]);
            this.header = new s(), c.inflateGetHeader(this.strm, this.header);
          }
          function o(e2, t2) {
            var r2 = new a(t2);
            if (r2.push(e2, true), r2.err) throw r2.msg || n[r2.err];
            return r2.result;
          }
          a.prototype.push = function(e2, t2) {
            var r2, n2, i2, s2, a2, o2, h = this.strm, u = this.options.chunkSize, l = this.options.dictionary, f = false;
            if (this.ended) return false;
            n2 = t2 === ~~t2 ? t2 : true === t2 ? m.Z_FINISH : m.Z_NO_FLUSH, "string" == typeof e2 ? h.input = p.binstring2buf(e2) : "[object ArrayBuffer]" === _.call(e2) ? h.input = new Uint8Array(e2) : h.input = e2, h.next_in = 0, h.avail_in = h.input.length;
            do {
              if (0 === h.avail_out && (h.output = new d.Buf8(u), h.next_out = 0, h.avail_out = u), (r2 = c.inflate(h, m.Z_NO_FLUSH)) === m.Z_NEED_DICT && l && (o2 = "string" == typeof l ? p.string2buf(l) : "[object ArrayBuffer]" === _.call(l) ? new Uint8Array(l) : l, r2 = c.inflateSetDictionary(this.strm, o2)), r2 === m.Z_BUF_ERROR && true === f && (r2 = m.Z_OK, f = false), r2 !== m.Z_STREAM_END && r2 !== m.Z_OK) return this.onEnd(r2), !(this.ended = true);
              h.next_out && (0 !== h.avail_out && r2 !== m.Z_STREAM_END && (0 !== h.avail_in || n2 !== m.Z_FINISH && n2 !== m.Z_SYNC_FLUSH) || ("string" === this.options.to ? (i2 = p.utf8border(h.output, h.next_out), s2 = h.next_out - i2, a2 = p.buf2string(h.output, i2), h.next_out = s2, h.avail_out = u - s2, s2 && d.arraySet(h.output, h.output, i2, s2, 0), this.onData(a2)) : this.onData(d.shrinkBuf(h.output, h.next_out)))), 0 === h.avail_in && 0 === h.avail_out && (f = true);
            } while ((0 < h.avail_in || 0 === h.avail_out) && r2 !== m.Z_STREAM_END);
            return r2 === m.Z_STREAM_END && (n2 = m.Z_FINISH), n2 === m.Z_FINISH ? (r2 = c.inflateEnd(this.strm), this.onEnd(r2), this.ended = true, r2 === m.Z_OK) : n2 !== m.Z_SYNC_FLUSH || (this.onEnd(m.Z_OK), !(h.avail_out = 0));
          }, a.prototype.onData = function(e2) {
            this.chunks.push(e2);
          }, a.prototype.onEnd = function(e2) {
            e2 === m.Z_OK && ("string" === this.options.to ? this.result = this.chunks.join("") : this.result = d.flattenChunks(this.chunks)), this.chunks = [], this.err = e2, this.msg = this.strm.msg;
          }, r.Inflate = a, r.inflate = o, r.inflateRaw = function(e2, t2) {
            return (t2 = t2 || {}).raw = true, o(e2, t2);
          }, r.ungzip = o;
        }, { "./utils/common": 41, "./utils/strings": 42, "./zlib/constants": 44, "./zlib/gzheader": 47, "./zlib/inflate": 49, "./zlib/messages": 51, "./zlib/zstream": 53 }], 41: [function(e, t, r) {
          "use strict";
          var n = "undefined" != typeof Uint8Array && "undefined" != typeof Uint16Array && "undefined" != typeof Int32Array;
          r.assign = function(e2) {
            for (var t2 = Array.prototype.slice.call(arguments, 1); t2.length; ) {
              var r2 = t2.shift();
              if (r2) {
                if ("object" != typeof r2) throw new TypeError(r2 + "must be non-object");
                for (var n2 in r2) r2.hasOwnProperty(n2) && (e2[n2] = r2[n2]);
              }
            }
            return e2;
          }, r.shrinkBuf = function(e2, t2) {
            return e2.length === t2 ? e2 : e2.subarray ? e2.subarray(0, t2) : (e2.length = t2, e2);
          };
          var i = { arraySet: function(e2, t2, r2, n2, i2) {
            if (t2.subarray && e2.subarray) e2.set(t2.subarray(r2, r2 + n2), i2);
            else for (var s2 = 0; s2 < n2; s2++) e2[i2 + s2] = t2[r2 + s2];
          }, flattenChunks: function(e2) {
            var t2, r2, n2, i2, s2, a;
            for (t2 = n2 = 0, r2 = e2.length; t2 < r2; t2++) n2 += e2[t2].length;
            for (a = new Uint8Array(n2), t2 = i2 = 0, r2 = e2.length; t2 < r2; t2++) s2 = e2[t2], a.set(s2, i2), i2 += s2.length;
            return a;
          } }, s = { arraySet: function(e2, t2, r2, n2, i2) {
            for (var s2 = 0; s2 < n2; s2++) e2[i2 + s2] = t2[r2 + s2];
          }, flattenChunks: function(e2) {
            return [].concat.apply([], e2);
          } };
          r.setTyped = function(e2) {
            e2 ? (r.Buf8 = Uint8Array, r.Buf16 = Uint16Array, r.Buf32 = Int32Array, r.assign(r, i)) : (r.Buf8 = Array, r.Buf16 = Array, r.Buf32 = Array, r.assign(r, s));
          }, r.setTyped(n);
        }, {}], 42: [function(e, t, r) {
          "use strict";
          var h = e("./common"), i = true, s = true;
          try {
            String.fromCharCode.apply(null, [0]);
          } catch (e2) {
            i = false;
          }
          try {
            String.fromCharCode.apply(null, new Uint8Array(1));
          } catch (e2) {
            s = false;
          }
          for (var u = new h.Buf8(256), n = 0; n < 256; n++) u[n] = 252 <= n ? 6 : 248 <= n ? 5 : 240 <= n ? 4 : 224 <= n ? 3 : 192 <= n ? 2 : 1;
          function l(e2, t2) {
            if (t2 < 65537 && (e2.subarray && s || !e2.subarray && i)) return String.fromCharCode.apply(null, h.shrinkBuf(e2, t2));
            for (var r2 = "", n2 = 0; n2 < t2; n2++) r2 += String.fromCharCode(e2[n2]);
            return r2;
          }
          u[254] = u[254] = 1, r.string2buf = function(e2) {
            var t2, r2, n2, i2, s2, a = e2.length, o = 0;
            for (i2 = 0; i2 < a; i2++) 55296 == (64512 & (r2 = e2.charCodeAt(i2))) && i2 + 1 < a && 56320 == (64512 & (n2 = e2.charCodeAt(i2 + 1))) && (r2 = 65536 + (r2 - 55296 << 10) + (n2 - 56320), i2++), o += r2 < 128 ? 1 : r2 < 2048 ? 2 : r2 < 65536 ? 3 : 4;
            for (t2 = new h.Buf8(o), i2 = s2 = 0; s2 < o; i2++) 55296 == (64512 & (r2 = e2.charCodeAt(i2))) && i2 + 1 < a && 56320 == (64512 & (n2 = e2.charCodeAt(i2 + 1))) && (r2 = 65536 + (r2 - 55296 << 10) + (n2 - 56320), i2++), r2 < 128 ? t2[s2++] = r2 : (r2 < 2048 ? t2[s2++] = 192 | r2 >>> 6 : (r2 < 65536 ? t2[s2++] = 224 | r2 >>> 12 : (t2[s2++] = 240 | r2 >>> 18, t2[s2++] = 128 | r2 >>> 12 & 63), t2[s2++] = 128 | r2 >>> 6 & 63), t2[s2++] = 128 | 63 & r2);
            return t2;
          }, r.buf2binstring = function(e2) {
            return l(e2, e2.length);
          }, r.binstring2buf = function(e2) {
            for (var t2 = new h.Buf8(e2.length), r2 = 0, n2 = t2.length; r2 < n2; r2++) t2[r2] = e2.charCodeAt(r2);
            return t2;
          }, r.buf2string = function(e2, t2) {
            var r2, n2, i2, s2, a = t2 || e2.length, o = new Array(2 * a);
            for (r2 = n2 = 0; r2 < a; ) if ((i2 = e2[r2++]) < 128) o[n2++] = i2;
            else if (4 < (s2 = u[i2])) o[n2++] = 65533, r2 += s2 - 1;
            else {
              for (i2 &= 2 === s2 ? 31 : 3 === s2 ? 15 : 7; 1 < s2 && r2 < a; ) i2 = i2 << 6 | 63 & e2[r2++], s2--;
              1 < s2 ? o[n2++] = 65533 : i2 < 65536 ? o[n2++] = i2 : (i2 -= 65536, o[n2++] = 55296 | i2 >> 10 & 1023, o[n2++] = 56320 | 1023 & i2);
            }
            return l(o, n2);
          }, r.utf8border = function(e2, t2) {
            var r2;
            for ((t2 = t2 || e2.length) > e2.length && (t2 = e2.length), r2 = t2 - 1; 0 <= r2 && 128 == (192 & e2[r2]); ) r2--;
            return r2 < 0 ? t2 : 0 === r2 ? t2 : r2 + u[e2[r2]] > t2 ? r2 : t2;
          };
        }, { "./common": 41 }], 43: [function(e, t, r) {
          "use strict";
          t.exports = function(e2, t2, r2, n) {
            for (var i = 65535 & e2 | 0, s = e2 >>> 16 & 65535 | 0, a = 0; 0 !== r2; ) {
              for (r2 -= a = 2e3 < r2 ? 2e3 : r2; s = s + (i = i + t2[n++] | 0) | 0, --a; ) ;
              i %= 65521, s %= 65521;
            }
            return i | s << 16 | 0;
          };
        }, {}], 44: [function(e, t, r) {
          "use strict";
          t.exports = { Z_NO_FLUSH: 0, Z_PARTIAL_FLUSH: 1, Z_SYNC_FLUSH: 2, Z_FULL_FLUSH: 3, Z_FINISH: 4, Z_BLOCK: 5, Z_TREES: 6, Z_OK: 0, Z_STREAM_END: 1, Z_NEED_DICT: 2, Z_ERRNO: -1, Z_STREAM_ERROR: -2, Z_DATA_ERROR: -3, Z_BUF_ERROR: -5, Z_NO_COMPRESSION: 0, Z_BEST_SPEED: 1, Z_BEST_COMPRESSION: 9, Z_DEFAULT_COMPRESSION: -1, Z_FILTERED: 1, Z_HUFFMAN_ONLY: 2, Z_RLE: 3, Z_FIXED: 4, Z_DEFAULT_STRATEGY: 0, Z_BINARY: 0, Z_TEXT: 1, Z_UNKNOWN: 2, Z_DEFLATED: 8 };
        }, {}], 45: [function(e, t, r) {
          "use strict";
          var o = (function() {
            for (var e2, t2 = [], r2 = 0; r2 < 256; r2++) {
              e2 = r2;
              for (var n = 0; n < 8; n++) e2 = 1 & e2 ? 3988292384 ^ e2 >>> 1 : e2 >>> 1;
              t2[r2] = e2;
            }
            return t2;
          })();
          t.exports = function(e2, t2, r2, n) {
            var i = o, s = n + r2;
            e2 ^= -1;
            for (var a = n; a < s; a++) e2 = e2 >>> 8 ^ i[255 & (e2 ^ t2[a])];
            return -1 ^ e2;
          };
        }, {}], 46: [function(e, t, r) {
          "use strict";
          var h, c = e("../utils/common"), u = e("./trees"), d = e("./adler32"), p = e("./crc32"), n = e("./messages"), l = 0, f = 4, m = 0, _ = -2, g = -1, b = 4, i = 2, v = 8, y = 9, s = 286, a = 30, o = 19, w = 2 * s + 1, k = 15, x = 3, S = 258, z = S + x + 1, C = 42, E = 113, A = 1, I = 2, O = 3, B = 4;
          function R(e2, t2) {
            return e2.msg = n[t2], t2;
          }
          function T(e2) {
            return (e2 << 1) - (4 < e2 ? 9 : 0);
          }
          function D(e2) {
            for (var t2 = e2.length; 0 <= --t2; ) e2[t2] = 0;
          }
          function F(e2) {
            var t2 = e2.state, r2 = t2.pending;
            r2 > e2.avail_out && (r2 = e2.avail_out), 0 !== r2 && (c.arraySet(e2.output, t2.pending_buf, t2.pending_out, r2, e2.next_out), e2.next_out += r2, t2.pending_out += r2, e2.total_out += r2, e2.avail_out -= r2, t2.pending -= r2, 0 === t2.pending && (t2.pending_out = 0));
          }
          function N(e2, t2) {
            u._tr_flush_block(e2, 0 <= e2.block_start ? e2.block_start : -1, e2.strstart - e2.block_start, t2), e2.block_start = e2.strstart, F(e2.strm);
          }
          function U(e2, t2) {
            e2.pending_buf[e2.pending++] = t2;
          }
          function P(e2, t2) {
            e2.pending_buf[e2.pending++] = t2 >>> 8 & 255, e2.pending_buf[e2.pending++] = 255 & t2;
          }
          function L(e2, t2) {
            var r2, n2, i2 = e2.max_chain_length, s2 = e2.strstart, a2 = e2.prev_length, o2 = e2.nice_match, h2 = e2.strstart > e2.w_size - z ? e2.strstart - (e2.w_size - z) : 0, u2 = e2.window, l2 = e2.w_mask, f2 = e2.prev, c2 = e2.strstart + S, d2 = u2[s2 + a2 - 1], p2 = u2[s2 + a2];
            e2.prev_length >= e2.good_match && (i2 >>= 2), o2 > e2.lookahead && (o2 = e2.lookahead);
            do {
              if (u2[(r2 = t2) + a2] === p2 && u2[r2 + a2 - 1] === d2 && u2[r2] === u2[s2] && u2[++r2] === u2[s2 + 1]) {
                s2 += 2, r2++;
                do {
                } while (u2[++s2] === u2[++r2] && u2[++s2] === u2[++r2] && u2[++s2] === u2[++r2] && u2[++s2] === u2[++r2] && u2[++s2] === u2[++r2] && u2[++s2] === u2[++r2] && u2[++s2] === u2[++r2] && u2[++s2] === u2[++r2] && s2 < c2);
                if (n2 = S - (c2 - s2), s2 = c2 - S, a2 < n2) {
                  if (e2.match_start = t2, o2 <= (a2 = n2)) break;
                  d2 = u2[s2 + a2 - 1], p2 = u2[s2 + a2];
                }
              }
            } while ((t2 = f2[t2 & l2]) > h2 && 0 != --i2);
            return a2 <= e2.lookahead ? a2 : e2.lookahead;
          }
          function j(e2) {
            var t2, r2, n2, i2, s2, a2, o2, h2, u2, l2, f2 = e2.w_size;
            do {
              if (i2 = e2.window_size - e2.lookahead - e2.strstart, e2.strstart >= f2 + (f2 - z)) {
                for (c.arraySet(e2.window, e2.window, f2, f2, 0), e2.match_start -= f2, e2.strstart -= f2, e2.block_start -= f2, t2 = r2 = e2.hash_size; n2 = e2.head[--t2], e2.head[t2] = f2 <= n2 ? n2 - f2 : 0, --r2; ) ;
                for (t2 = r2 = f2; n2 = e2.prev[--t2], e2.prev[t2] = f2 <= n2 ? n2 - f2 : 0, --r2; ) ;
                i2 += f2;
              }
              if (0 === e2.strm.avail_in) break;
              if (a2 = e2.strm, o2 = e2.window, h2 = e2.strstart + e2.lookahead, u2 = i2, l2 = void 0, l2 = a2.avail_in, u2 < l2 && (l2 = u2), r2 = 0 === l2 ? 0 : (a2.avail_in -= l2, c.arraySet(o2, a2.input, a2.next_in, l2, h2), 1 === a2.state.wrap ? a2.adler = d(a2.adler, o2, l2, h2) : 2 === a2.state.wrap && (a2.adler = p(a2.adler, o2, l2, h2)), a2.next_in += l2, a2.total_in += l2, l2), e2.lookahead += r2, e2.lookahead + e2.insert >= x) for (s2 = e2.strstart - e2.insert, e2.ins_h = e2.window[s2], e2.ins_h = (e2.ins_h << e2.hash_shift ^ e2.window[s2 + 1]) & e2.hash_mask; e2.insert && (e2.ins_h = (e2.ins_h << e2.hash_shift ^ e2.window[s2 + x - 1]) & e2.hash_mask, e2.prev[s2 & e2.w_mask] = e2.head[e2.ins_h], e2.head[e2.ins_h] = s2, s2++, e2.insert--, !(e2.lookahead + e2.insert < x)); ) ;
            } while (e2.lookahead < z && 0 !== e2.strm.avail_in);
          }
          function Z(e2, t2) {
            for (var r2, n2; ; ) {
              if (e2.lookahead < z) {
                if (j(e2), e2.lookahead < z && t2 === l) return A;
                if (0 === e2.lookahead) break;
              }
              if (r2 = 0, e2.lookahead >= x && (e2.ins_h = (e2.ins_h << e2.hash_shift ^ e2.window[e2.strstart + x - 1]) & e2.hash_mask, r2 = e2.prev[e2.strstart & e2.w_mask] = e2.head[e2.ins_h], e2.head[e2.ins_h] = e2.strstart), 0 !== r2 && e2.strstart - r2 <= e2.w_size - z && (e2.match_length = L(e2, r2)), e2.match_length >= x) if (n2 = u._tr_tally(e2, e2.strstart - e2.match_start, e2.match_length - x), e2.lookahead -= e2.match_length, e2.match_length <= e2.max_lazy_match && e2.lookahead >= x) {
                for (e2.match_length--; e2.strstart++, e2.ins_h = (e2.ins_h << e2.hash_shift ^ e2.window[e2.strstart + x - 1]) & e2.hash_mask, r2 = e2.prev[e2.strstart & e2.w_mask] = e2.head[e2.ins_h], e2.head[e2.ins_h] = e2.strstart, 0 != --e2.match_length; ) ;
                e2.strstart++;
              } else e2.strstart += e2.match_length, e2.match_length = 0, e2.ins_h = e2.window[e2.strstart], e2.ins_h = (e2.ins_h << e2.hash_shift ^ e2.window[e2.strstart + 1]) & e2.hash_mask;
              else n2 = u._tr_tally(e2, 0, e2.window[e2.strstart]), e2.lookahead--, e2.strstart++;
              if (n2 && (N(e2, false), 0 === e2.strm.avail_out)) return A;
            }
            return e2.insert = e2.strstart < x - 1 ? e2.strstart : x - 1, t2 === f ? (N(e2, true), 0 === e2.strm.avail_out ? O : B) : e2.last_lit && (N(e2, false), 0 === e2.strm.avail_out) ? A : I;
          }
          function W(e2, t2) {
            for (var r2, n2, i2; ; ) {
              if (e2.lookahead < z) {
                if (j(e2), e2.lookahead < z && t2 === l) return A;
                if (0 === e2.lookahead) break;
              }
              if (r2 = 0, e2.lookahead >= x && (e2.ins_h = (e2.ins_h << e2.hash_shift ^ e2.window[e2.strstart + x - 1]) & e2.hash_mask, r2 = e2.prev[e2.strstart & e2.w_mask] = e2.head[e2.ins_h], e2.head[e2.ins_h] = e2.strstart), e2.prev_length = e2.match_length, e2.prev_match = e2.match_start, e2.match_length = x - 1, 0 !== r2 && e2.prev_length < e2.max_lazy_match && e2.strstart - r2 <= e2.w_size - z && (e2.match_length = L(e2, r2), e2.match_length <= 5 && (1 === e2.strategy || e2.match_length === x && 4096 < e2.strstart - e2.match_start) && (e2.match_length = x - 1)), e2.prev_length >= x && e2.match_length <= e2.prev_length) {
                for (i2 = e2.strstart + e2.lookahead - x, n2 = u._tr_tally(e2, e2.strstart - 1 - e2.prev_match, e2.prev_length - x), e2.lookahead -= e2.prev_length - 1, e2.prev_length -= 2; ++e2.strstart <= i2 && (e2.ins_h = (e2.ins_h << e2.hash_shift ^ e2.window[e2.strstart + x - 1]) & e2.hash_mask, r2 = e2.prev[e2.strstart & e2.w_mask] = e2.head[e2.ins_h], e2.head[e2.ins_h] = e2.strstart), 0 != --e2.prev_length; ) ;
                if (e2.match_available = 0, e2.match_length = x - 1, e2.strstart++, n2 && (N(e2, false), 0 === e2.strm.avail_out)) return A;
              } else if (e2.match_available) {
                if ((n2 = u._tr_tally(e2, 0, e2.window[e2.strstart - 1])) && N(e2, false), e2.strstart++, e2.lookahead--, 0 === e2.strm.avail_out) return A;
              } else e2.match_available = 1, e2.strstart++, e2.lookahead--;
            }
            return e2.match_available && (n2 = u._tr_tally(e2, 0, e2.window[e2.strstart - 1]), e2.match_available = 0), e2.insert = e2.strstart < x - 1 ? e2.strstart : x - 1, t2 === f ? (N(e2, true), 0 === e2.strm.avail_out ? O : B) : e2.last_lit && (N(e2, false), 0 === e2.strm.avail_out) ? A : I;
          }
          function M(e2, t2, r2, n2, i2) {
            this.good_length = e2, this.max_lazy = t2, this.nice_length = r2, this.max_chain = n2, this.func = i2;
          }
          function H() {
            this.strm = null, this.status = 0, this.pending_buf = null, this.pending_buf_size = 0, this.pending_out = 0, this.pending = 0, this.wrap = 0, this.gzhead = null, this.gzindex = 0, this.method = v, this.last_flush = -1, this.w_size = 0, this.w_bits = 0, this.w_mask = 0, this.window = null, this.window_size = 0, this.prev = null, this.head = null, this.ins_h = 0, this.hash_size = 0, this.hash_bits = 0, this.hash_mask = 0, this.hash_shift = 0, this.block_start = 0, this.match_length = 0, this.prev_match = 0, this.match_available = 0, this.strstart = 0, this.match_start = 0, this.lookahead = 0, this.prev_length = 0, this.max_chain_length = 0, this.max_lazy_match = 0, this.level = 0, this.strategy = 0, this.good_match = 0, this.nice_match = 0, this.dyn_ltree = new c.Buf16(2 * w), this.dyn_dtree = new c.Buf16(2 * (2 * a + 1)), this.bl_tree = new c.Buf16(2 * (2 * o + 1)), D(this.dyn_ltree), D(this.dyn_dtree), D(this.bl_tree), this.l_desc = null, this.d_desc = null, this.bl_desc = null, this.bl_count = new c.Buf16(k + 1), this.heap = new c.Buf16(2 * s + 1), D(this.heap), this.heap_len = 0, this.heap_max = 0, this.depth = new c.Buf16(2 * s + 1), D(this.depth), this.l_buf = 0, this.lit_bufsize = 0, this.last_lit = 0, this.d_buf = 0, this.opt_len = 0, this.static_len = 0, this.matches = 0, this.insert = 0, this.bi_buf = 0, this.bi_valid = 0;
          }
          function G(e2) {
            var t2;
            return e2 && e2.state ? (e2.total_in = e2.total_out = 0, e2.data_type = i, (t2 = e2.state).pending = 0, t2.pending_out = 0, t2.wrap < 0 && (t2.wrap = -t2.wrap), t2.status = t2.wrap ? C : E, e2.adler = 2 === t2.wrap ? 0 : 1, t2.last_flush = l, u._tr_init(t2), m) : R(e2, _);
          }
          function K(e2) {
            var t2 = G(e2);
            return t2 === m && (function(e3) {
              e3.window_size = 2 * e3.w_size, D(e3.head), e3.max_lazy_match = h[e3.level].max_lazy, e3.good_match = h[e3.level].good_length, e3.nice_match = h[e3.level].nice_length, e3.max_chain_length = h[e3.level].max_chain, e3.strstart = 0, e3.block_start = 0, e3.lookahead = 0, e3.insert = 0, e3.match_length = e3.prev_length = x - 1, e3.match_available = 0, e3.ins_h = 0;
            })(e2.state), t2;
          }
          function Y(e2, t2, r2, n2, i2, s2) {
            if (!e2) return _;
            var a2 = 1;
            if (t2 === g && (t2 = 6), n2 < 0 ? (a2 = 0, n2 = -n2) : 15 < n2 && (a2 = 2, n2 -= 16), i2 < 1 || y < i2 || r2 !== v || n2 < 8 || 15 < n2 || t2 < 0 || 9 < t2 || s2 < 0 || b < s2) return R(e2, _);
            8 === n2 && (n2 = 9);
            var o2 = new H();
            return (e2.state = o2).strm = e2, o2.wrap = a2, o2.gzhead = null, o2.w_bits = n2, o2.w_size = 1 << o2.w_bits, o2.w_mask = o2.w_size - 1, o2.hash_bits = i2 + 7, o2.hash_size = 1 << o2.hash_bits, o2.hash_mask = o2.hash_size - 1, o2.hash_shift = ~~((o2.hash_bits + x - 1) / x), o2.window = new c.Buf8(2 * o2.w_size), o2.head = new c.Buf16(o2.hash_size), o2.prev = new c.Buf16(o2.w_size), o2.lit_bufsize = 1 << i2 + 6, o2.pending_buf_size = 4 * o2.lit_bufsize, o2.pending_buf = new c.Buf8(o2.pending_buf_size), o2.d_buf = 1 * o2.lit_bufsize, o2.l_buf = 3 * o2.lit_bufsize, o2.level = t2, o2.strategy = s2, o2.method = r2, K(e2);
          }
          h = [new M(0, 0, 0, 0, function(e2, t2) {
            var r2 = 65535;
            for (r2 > e2.pending_buf_size - 5 && (r2 = e2.pending_buf_size - 5); ; ) {
              if (e2.lookahead <= 1) {
                if (j(e2), 0 === e2.lookahead && t2 === l) return A;
                if (0 === e2.lookahead) break;
              }
              e2.strstart += e2.lookahead, e2.lookahead = 0;
              var n2 = e2.block_start + r2;
              if ((0 === e2.strstart || e2.strstart >= n2) && (e2.lookahead = e2.strstart - n2, e2.strstart = n2, N(e2, false), 0 === e2.strm.avail_out)) return A;
              if (e2.strstart - e2.block_start >= e2.w_size - z && (N(e2, false), 0 === e2.strm.avail_out)) return A;
            }
            return e2.insert = 0, t2 === f ? (N(e2, true), 0 === e2.strm.avail_out ? O : B) : (e2.strstart > e2.block_start && (N(e2, false), e2.strm.avail_out), A);
          }), new M(4, 4, 8, 4, Z), new M(4, 5, 16, 8, Z), new M(4, 6, 32, 32, Z), new M(4, 4, 16, 16, W), new M(8, 16, 32, 32, W), new M(8, 16, 128, 128, W), new M(8, 32, 128, 256, W), new M(32, 128, 258, 1024, W), new M(32, 258, 258, 4096, W)], r.deflateInit = function(e2, t2) {
            return Y(e2, t2, v, 15, 8, 0);
          }, r.deflateInit2 = Y, r.deflateReset = K, r.deflateResetKeep = G, r.deflateSetHeader = function(e2, t2) {
            return e2 && e2.state ? 2 !== e2.state.wrap ? _ : (e2.state.gzhead = t2, m) : _;
          }, r.deflate = function(e2, t2) {
            var r2, n2, i2, s2;
            if (!e2 || !e2.state || 5 < t2 || t2 < 0) return e2 ? R(e2, _) : _;
            if (n2 = e2.state, !e2.output || !e2.input && 0 !== e2.avail_in || 666 === n2.status && t2 !== f) return R(e2, 0 === e2.avail_out ? -5 : _);
            if (n2.strm = e2, r2 = n2.last_flush, n2.last_flush = t2, n2.status === C) if (2 === n2.wrap) e2.adler = 0, U(n2, 31), U(n2, 139), U(n2, 8), n2.gzhead ? (U(n2, (n2.gzhead.text ? 1 : 0) + (n2.gzhead.hcrc ? 2 : 0) + (n2.gzhead.extra ? 4 : 0) + (n2.gzhead.name ? 8 : 0) + (n2.gzhead.comment ? 16 : 0)), U(n2, 255 & n2.gzhead.time), U(n2, n2.gzhead.time >> 8 & 255), U(n2, n2.gzhead.time >> 16 & 255), U(n2, n2.gzhead.time >> 24 & 255), U(n2, 9 === n2.level ? 2 : 2 <= n2.strategy || n2.level < 2 ? 4 : 0), U(n2, 255 & n2.gzhead.os), n2.gzhead.extra && n2.gzhead.extra.length && (U(n2, 255 & n2.gzhead.extra.length), U(n2, n2.gzhead.extra.length >> 8 & 255)), n2.gzhead.hcrc && (e2.adler = p(e2.adler, n2.pending_buf, n2.pending, 0)), n2.gzindex = 0, n2.status = 69) : (U(n2, 0), U(n2, 0), U(n2, 0), U(n2, 0), U(n2, 0), U(n2, 9 === n2.level ? 2 : 2 <= n2.strategy || n2.level < 2 ? 4 : 0), U(n2, 3), n2.status = E);
            else {
              var a2 = v + (n2.w_bits - 8 << 4) << 8;
              a2 |= (2 <= n2.strategy || n2.level < 2 ? 0 : n2.level < 6 ? 1 : 6 === n2.level ? 2 : 3) << 6, 0 !== n2.strstart && (a2 |= 32), a2 += 31 - a2 % 31, n2.status = E, P(n2, a2), 0 !== n2.strstart && (P(n2, e2.adler >>> 16), P(n2, 65535 & e2.adler)), e2.adler = 1;
            }
            if (69 === n2.status) if (n2.gzhead.extra) {
              for (i2 = n2.pending; n2.gzindex < (65535 & n2.gzhead.extra.length) && (n2.pending !== n2.pending_buf_size || (n2.gzhead.hcrc && n2.pending > i2 && (e2.adler = p(e2.adler, n2.pending_buf, n2.pending - i2, i2)), F(e2), i2 = n2.pending, n2.pending !== n2.pending_buf_size)); ) U(n2, 255 & n2.gzhead.extra[n2.gzindex]), n2.gzindex++;
              n2.gzhead.hcrc && n2.pending > i2 && (e2.adler = p(e2.adler, n2.pending_buf, n2.pending - i2, i2)), n2.gzindex === n2.gzhead.extra.length && (n2.gzindex = 0, n2.status = 73);
            } else n2.status = 73;
            if (73 === n2.status) if (n2.gzhead.name) {
              i2 = n2.pending;
              do {
                if (n2.pending === n2.pending_buf_size && (n2.gzhead.hcrc && n2.pending > i2 && (e2.adler = p(e2.adler, n2.pending_buf, n2.pending - i2, i2)), F(e2), i2 = n2.pending, n2.pending === n2.pending_buf_size)) {
                  s2 = 1;
                  break;
                }
                s2 = n2.gzindex < n2.gzhead.name.length ? 255 & n2.gzhead.name.charCodeAt(n2.gzindex++) : 0, U(n2, s2);
              } while (0 !== s2);
              n2.gzhead.hcrc && n2.pending > i2 && (e2.adler = p(e2.adler, n2.pending_buf, n2.pending - i2, i2)), 0 === s2 && (n2.gzindex = 0, n2.status = 91);
            } else n2.status = 91;
            if (91 === n2.status) if (n2.gzhead.comment) {
              i2 = n2.pending;
              do {
                if (n2.pending === n2.pending_buf_size && (n2.gzhead.hcrc && n2.pending > i2 && (e2.adler = p(e2.adler, n2.pending_buf, n2.pending - i2, i2)), F(e2), i2 = n2.pending, n2.pending === n2.pending_buf_size)) {
                  s2 = 1;
                  break;
                }
                s2 = n2.gzindex < n2.gzhead.comment.length ? 255 & n2.gzhead.comment.charCodeAt(n2.gzindex++) : 0, U(n2, s2);
              } while (0 !== s2);
              n2.gzhead.hcrc && n2.pending > i2 && (e2.adler = p(e2.adler, n2.pending_buf, n2.pending - i2, i2)), 0 === s2 && (n2.status = 103);
            } else n2.status = 103;
            if (103 === n2.status && (n2.gzhead.hcrc ? (n2.pending + 2 > n2.pending_buf_size && F(e2), n2.pending + 2 <= n2.pending_buf_size && (U(n2, 255 & e2.adler), U(n2, e2.adler >> 8 & 255), e2.adler = 0, n2.status = E)) : n2.status = E), 0 !== n2.pending) {
              if (F(e2), 0 === e2.avail_out) return n2.last_flush = -1, m;
            } else if (0 === e2.avail_in && T(t2) <= T(r2) && t2 !== f) return R(e2, -5);
            if (666 === n2.status && 0 !== e2.avail_in) return R(e2, -5);
            if (0 !== e2.avail_in || 0 !== n2.lookahead || t2 !== l && 666 !== n2.status) {
              var o2 = 2 === n2.strategy ? (function(e3, t3) {
                for (var r3; ; ) {
                  if (0 === e3.lookahead && (j(e3), 0 === e3.lookahead)) {
                    if (t3 === l) return A;
                    break;
                  }
                  if (e3.match_length = 0, r3 = u._tr_tally(e3, 0, e3.window[e3.strstart]), e3.lookahead--, e3.strstart++, r3 && (N(e3, false), 0 === e3.strm.avail_out)) return A;
                }
                return e3.insert = 0, t3 === f ? (N(e3, true), 0 === e3.strm.avail_out ? O : B) : e3.last_lit && (N(e3, false), 0 === e3.strm.avail_out) ? A : I;
              })(n2, t2) : 3 === n2.strategy ? (function(e3, t3) {
                for (var r3, n3, i3, s3, a3 = e3.window; ; ) {
                  if (e3.lookahead <= S) {
                    if (j(e3), e3.lookahead <= S && t3 === l) return A;
                    if (0 === e3.lookahead) break;
                  }
                  if (e3.match_length = 0, e3.lookahead >= x && 0 < e3.strstart && (n3 = a3[i3 = e3.strstart - 1]) === a3[++i3] && n3 === a3[++i3] && n3 === a3[++i3]) {
                    s3 = e3.strstart + S;
                    do {
                    } while (n3 === a3[++i3] && n3 === a3[++i3] && n3 === a3[++i3] && n3 === a3[++i3] && n3 === a3[++i3] && n3 === a3[++i3] && n3 === a3[++i3] && n3 === a3[++i3] && i3 < s3);
                    e3.match_length = S - (s3 - i3), e3.match_length > e3.lookahead && (e3.match_length = e3.lookahead);
                  }
                  if (e3.match_length >= x ? (r3 = u._tr_tally(e3, 1, e3.match_length - x), e3.lookahead -= e3.match_length, e3.strstart += e3.match_length, e3.match_length = 0) : (r3 = u._tr_tally(e3, 0, e3.window[e3.strstart]), e3.lookahead--, e3.strstart++), r3 && (N(e3, false), 0 === e3.strm.avail_out)) return A;
                }
                return e3.insert = 0, t3 === f ? (N(e3, true), 0 === e3.strm.avail_out ? O : B) : e3.last_lit && (N(e3, false), 0 === e3.strm.avail_out) ? A : I;
              })(n2, t2) : h[n2.level].func(n2, t2);
              if (o2 !== O && o2 !== B || (n2.status = 666), o2 === A || o2 === O) return 0 === e2.avail_out && (n2.last_flush = -1), m;
              if (o2 === I && (1 === t2 ? u._tr_align(n2) : 5 !== t2 && (u._tr_stored_block(n2, 0, 0, false), 3 === t2 && (D(n2.head), 0 === n2.lookahead && (n2.strstart = 0, n2.block_start = 0, n2.insert = 0))), F(e2), 0 === e2.avail_out)) return n2.last_flush = -1, m;
            }
            return t2 !== f ? m : n2.wrap <= 0 ? 1 : (2 === n2.wrap ? (U(n2, 255 & e2.adler), U(n2, e2.adler >> 8 & 255), U(n2, e2.adler >> 16 & 255), U(n2, e2.adler >> 24 & 255), U(n2, 255 & e2.total_in), U(n2, e2.total_in >> 8 & 255), U(n2, e2.total_in >> 16 & 255), U(n2, e2.total_in >> 24 & 255)) : (P(n2, e2.adler >>> 16), P(n2, 65535 & e2.adler)), F(e2), 0 < n2.wrap && (n2.wrap = -n2.wrap), 0 !== n2.pending ? m : 1);
          }, r.deflateEnd = function(e2) {
            var t2;
            return e2 && e2.state ? (t2 = e2.state.status) !== C && 69 !== t2 && 73 !== t2 && 91 !== t2 && 103 !== t2 && t2 !== E && 666 !== t2 ? R(e2, _) : (e2.state = null, t2 === E ? R(e2, -3) : m) : _;
          }, r.deflateSetDictionary = function(e2, t2) {
            var r2, n2, i2, s2, a2, o2, h2, u2, l2 = t2.length;
            if (!e2 || !e2.state) return _;
            if (2 === (s2 = (r2 = e2.state).wrap) || 1 === s2 && r2.status !== C || r2.lookahead) return _;
            for (1 === s2 && (e2.adler = d(e2.adler, t2, l2, 0)), r2.wrap = 0, l2 >= r2.w_size && (0 === s2 && (D(r2.head), r2.strstart = 0, r2.block_start = 0, r2.insert = 0), u2 = new c.Buf8(r2.w_size), c.arraySet(u2, t2, l2 - r2.w_size, r2.w_size, 0), t2 = u2, l2 = r2.w_size), a2 = e2.avail_in, o2 = e2.next_in, h2 = e2.input, e2.avail_in = l2, e2.next_in = 0, e2.input = t2, j(r2); r2.lookahead >= x; ) {
              for (n2 = r2.strstart, i2 = r2.lookahead - (x - 1); r2.ins_h = (r2.ins_h << r2.hash_shift ^ r2.window[n2 + x - 1]) & r2.hash_mask, r2.prev[n2 & r2.w_mask] = r2.head[r2.ins_h], r2.head[r2.ins_h] = n2, n2++, --i2; ) ;
              r2.strstart = n2, r2.lookahead = x - 1, j(r2);
            }
            return r2.strstart += r2.lookahead, r2.block_start = r2.strstart, r2.insert = r2.lookahead, r2.lookahead = 0, r2.match_length = r2.prev_length = x - 1, r2.match_available = 0, e2.next_in = o2, e2.input = h2, e2.avail_in = a2, r2.wrap = s2, m;
          }, r.deflateInfo = "pako deflate (from Nodeca project)";
        }, { "../utils/common": 41, "./adler32": 43, "./crc32": 45, "./messages": 51, "./trees": 52 }], 47: [function(e, t, r) {
          "use strict";
          t.exports = function() {
            this.text = 0, this.time = 0, this.xflags = 0, this.os = 0, this.extra = null, this.extra_len = 0, this.name = "", this.comment = "", this.hcrc = 0, this.done = false;
          };
        }, {}], 48: [function(e, t, r) {
          "use strict";
          t.exports = function(e2, t2) {
            var r2, n, i, s, a, o, h, u, l, f, c, d, p, m, _, g, b, v, y, w, k, x, S, z, C;
            r2 = e2.state, n = e2.next_in, z = e2.input, i = n + (e2.avail_in - 5), s = e2.next_out, C = e2.output, a = s - (t2 - e2.avail_out), o = s + (e2.avail_out - 257), h = r2.dmax, u = r2.wsize, l = r2.whave, f = r2.wnext, c = r2.window, d = r2.hold, p = r2.bits, m = r2.lencode, _ = r2.distcode, g = (1 << r2.lenbits) - 1, b = (1 << r2.distbits) - 1;
            e: do {
              p < 15 && (d += z[n++] << p, p += 8, d += z[n++] << p, p += 8), v = m[d & g];
              t: for (; ; ) {
                if (d >>>= y = v >>> 24, p -= y, 0 === (y = v >>> 16 & 255)) C[s++] = 65535 & v;
                else {
                  if (!(16 & y)) {
                    if (0 == (64 & y)) {
                      v = m[(65535 & v) + (d & (1 << y) - 1)];
                      continue t;
                    }
                    if (32 & y) {
                      r2.mode = 12;
                      break e;
                    }
                    e2.msg = "invalid literal/length code", r2.mode = 30;
                    break e;
                  }
                  w = 65535 & v, (y &= 15) && (p < y && (d += z[n++] << p, p += 8), w += d & (1 << y) - 1, d >>>= y, p -= y), p < 15 && (d += z[n++] << p, p += 8, d += z[n++] << p, p += 8), v = _[d & b];
                  r: for (; ; ) {
                    if (d >>>= y = v >>> 24, p -= y, !(16 & (y = v >>> 16 & 255))) {
                      if (0 == (64 & y)) {
                        v = _[(65535 & v) + (d & (1 << y) - 1)];
                        continue r;
                      }
                      e2.msg = "invalid distance code", r2.mode = 30;
                      break e;
                    }
                    if (k = 65535 & v, p < (y &= 15) && (d += z[n++] << p, (p += 8) < y && (d += z[n++] << p, p += 8)), h < (k += d & (1 << y) - 1)) {
                      e2.msg = "invalid distance too far back", r2.mode = 30;
                      break e;
                    }
                    if (d >>>= y, p -= y, (y = s - a) < k) {
                      if (l < (y = k - y) && r2.sane) {
                        e2.msg = "invalid distance too far back", r2.mode = 30;
                        break e;
                      }
                      if (S = c, (x = 0) === f) {
                        if (x += u - y, y < w) {
                          for (w -= y; C[s++] = c[x++], --y; ) ;
                          x = s - k, S = C;
                        }
                      } else if (f < y) {
                        if (x += u + f - y, (y -= f) < w) {
                          for (w -= y; C[s++] = c[x++], --y; ) ;
                          if (x = 0, f < w) {
                            for (w -= y = f; C[s++] = c[x++], --y; ) ;
                            x = s - k, S = C;
                          }
                        }
                      } else if (x += f - y, y < w) {
                        for (w -= y; C[s++] = c[x++], --y; ) ;
                        x = s - k, S = C;
                      }
                      for (; 2 < w; ) C[s++] = S[x++], C[s++] = S[x++], C[s++] = S[x++], w -= 3;
                      w && (C[s++] = S[x++], 1 < w && (C[s++] = S[x++]));
                    } else {
                      for (x = s - k; C[s++] = C[x++], C[s++] = C[x++], C[s++] = C[x++], 2 < (w -= 3); ) ;
                      w && (C[s++] = C[x++], 1 < w && (C[s++] = C[x++]));
                    }
                    break;
                  }
                }
                break;
              }
            } while (n < i && s < o);
            n -= w = p >> 3, d &= (1 << (p -= w << 3)) - 1, e2.next_in = n, e2.next_out = s, e2.avail_in = n < i ? i - n + 5 : 5 - (n - i), e2.avail_out = s < o ? o - s + 257 : 257 - (s - o), r2.hold = d, r2.bits = p;
          };
        }, {}], 49: [function(e, t, r) {
          "use strict";
          var I = e("../utils/common"), O = e("./adler32"), B = e("./crc32"), R = e("./inffast"), T = e("./inftrees"), D = 1, F = 2, N = 0, U = -2, P = 1, n = 852, i = 592;
          function L(e2) {
            return (e2 >>> 24 & 255) + (e2 >>> 8 & 65280) + ((65280 & e2) << 8) + ((255 & e2) << 24);
          }
          function s() {
            this.mode = 0, this.last = false, this.wrap = 0, this.havedict = false, this.flags = 0, this.dmax = 0, this.check = 0, this.total = 0, this.head = null, this.wbits = 0, this.wsize = 0, this.whave = 0, this.wnext = 0, this.window = null, this.hold = 0, this.bits = 0, this.length = 0, this.offset = 0, this.extra = 0, this.lencode = null, this.distcode = null, this.lenbits = 0, this.distbits = 0, this.ncode = 0, this.nlen = 0, this.ndist = 0, this.have = 0, this.next = null, this.lens = new I.Buf16(320), this.work = new I.Buf16(288), this.lendyn = null, this.distdyn = null, this.sane = 0, this.back = 0, this.was = 0;
          }
          function a(e2) {
            var t2;
            return e2 && e2.state ? (t2 = e2.state, e2.total_in = e2.total_out = t2.total = 0, e2.msg = "", t2.wrap && (e2.adler = 1 & t2.wrap), t2.mode = P, t2.last = 0, t2.havedict = 0, t2.dmax = 32768, t2.head = null, t2.hold = 0, t2.bits = 0, t2.lencode = t2.lendyn = new I.Buf32(n), t2.distcode = t2.distdyn = new I.Buf32(i), t2.sane = 1, t2.back = -1, N) : U;
          }
          function o(e2) {
            var t2;
            return e2 && e2.state ? ((t2 = e2.state).wsize = 0, t2.whave = 0, t2.wnext = 0, a(e2)) : U;
          }
          function h(e2, t2) {
            var r2, n2;
            return e2 && e2.state ? (n2 = e2.state, t2 < 0 ? (r2 = 0, t2 = -t2) : (r2 = 1 + (t2 >> 4), t2 < 48 && (t2 &= 15)), t2 && (t2 < 8 || 15 < t2) ? U : (null !== n2.window && n2.wbits !== t2 && (n2.window = null), n2.wrap = r2, n2.wbits = t2, o(e2))) : U;
          }
          function u(e2, t2) {
            var r2, n2;
            return e2 ? (n2 = new s(), (e2.state = n2).window = null, (r2 = h(e2, t2)) !== N && (e2.state = null), r2) : U;
          }
          var l, f, c = true;
          function j(e2) {
            if (c) {
              var t2;
              for (l = new I.Buf32(512), f = new I.Buf32(32), t2 = 0; t2 < 144; ) e2.lens[t2++] = 8;
              for (; t2 < 256; ) e2.lens[t2++] = 9;
              for (; t2 < 280; ) e2.lens[t2++] = 7;
              for (; t2 < 288; ) e2.lens[t2++] = 8;
              for (T(D, e2.lens, 0, 288, l, 0, e2.work, { bits: 9 }), t2 = 0; t2 < 32; ) e2.lens[t2++] = 5;
              T(F, e2.lens, 0, 32, f, 0, e2.work, { bits: 5 }), c = false;
            }
            e2.lencode = l, e2.lenbits = 9, e2.distcode = f, e2.distbits = 5;
          }
          function Z(e2, t2, r2, n2) {
            var i2, s2 = e2.state;
            return null === s2.window && (s2.wsize = 1 << s2.wbits, s2.wnext = 0, s2.whave = 0, s2.window = new I.Buf8(s2.wsize)), n2 >= s2.wsize ? (I.arraySet(s2.window, t2, r2 - s2.wsize, s2.wsize, 0), s2.wnext = 0, s2.whave = s2.wsize) : (n2 < (i2 = s2.wsize - s2.wnext) && (i2 = n2), I.arraySet(s2.window, t2, r2 - n2, i2, s2.wnext), (n2 -= i2) ? (I.arraySet(s2.window, t2, r2 - n2, n2, 0), s2.wnext = n2, s2.whave = s2.wsize) : (s2.wnext += i2, s2.wnext === s2.wsize && (s2.wnext = 0), s2.whave < s2.wsize && (s2.whave += i2))), 0;
          }
          r.inflateReset = o, r.inflateReset2 = h, r.inflateResetKeep = a, r.inflateInit = function(e2) {
            return u(e2, 15);
          }, r.inflateInit2 = u, r.inflate = function(e2, t2) {
            var r2, n2, i2, s2, a2, o2, h2, u2, l2, f2, c2, d, p, m, _, g, b, v, y, w, k, x, S, z, C = 0, E = new I.Buf8(4), A = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15];
            if (!e2 || !e2.state || !e2.output || !e2.input && 0 !== e2.avail_in) return U;
            12 === (r2 = e2.state).mode && (r2.mode = 13), a2 = e2.next_out, i2 = e2.output, h2 = e2.avail_out, s2 = e2.next_in, n2 = e2.input, o2 = e2.avail_in, u2 = r2.hold, l2 = r2.bits, f2 = o2, c2 = h2, x = N;
            e: for (; ; ) switch (r2.mode) {
              case P:
                if (0 === r2.wrap) {
                  r2.mode = 13;
                  break;
                }
                for (; l2 < 16; ) {
                  if (0 === o2) break e;
                  o2--, u2 += n2[s2++] << l2, l2 += 8;
                }
                if (2 & r2.wrap && 35615 === u2) {
                  E[r2.check = 0] = 255 & u2, E[1] = u2 >>> 8 & 255, r2.check = B(r2.check, E, 2, 0), l2 = u2 = 0, r2.mode = 2;
                  break;
                }
                if (r2.flags = 0, r2.head && (r2.head.done = false), !(1 & r2.wrap) || (((255 & u2) << 8) + (u2 >> 8)) % 31) {
                  e2.msg = "incorrect header check", r2.mode = 30;
                  break;
                }
                if (8 != (15 & u2)) {
                  e2.msg = "unknown compression method", r2.mode = 30;
                  break;
                }
                if (l2 -= 4, k = 8 + (15 & (u2 >>>= 4)), 0 === r2.wbits) r2.wbits = k;
                else if (k > r2.wbits) {
                  e2.msg = "invalid window size", r2.mode = 30;
                  break;
                }
                r2.dmax = 1 << k, e2.adler = r2.check = 1, r2.mode = 512 & u2 ? 10 : 12, l2 = u2 = 0;
                break;
              case 2:
                for (; l2 < 16; ) {
                  if (0 === o2) break e;
                  o2--, u2 += n2[s2++] << l2, l2 += 8;
                }
                if (r2.flags = u2, 8 != (255 & r2.flags)) {
                  e2.msg = "unknown compression method", r2.mode = 30;
                  break;
                }
                if (57344 & r2.flags) {
                  e2.msg = "unknown header flags set", r2.mode = 30;
                  break;
                }
                r2.head && (r2.head.text = u2 >> 8 & 1), 512 & r2.flags && (E[0] = 255 & u2, E[1] = u2 >>> 8 & 255, r2.check = B(r2.check, E, 2, 0)), l2 = u2 = 0, r2.mode = 3;
              case 3:
                for (; l2 < 32; ) {
                  if (0 === o2) break e;
                  o2--, u2 += n2[s2++] << l2, l2 += 8;
                }
                r2.head && (r2.head.time = u2), 512 & r2.flags && (E[0] = 255 & u2, E[1] = u2 >>> 8 & 255, E[2] = u2 >>> 16 & 255, E[3] = u2 >>> 24 & 255, r2.check = B(r2.check, E, 4, 0)), l2 = u2 = 0, r2.mode = 4;
              case 4:
                for (; l2 < 16; ) {
                  if (0 === o2) break e;
                  o2--, u2 += n2[s2++] << l2, l2 += 8;
                }
                r2.head && (r2.head.xflags = 255 & u2, r2.head.os = u2 >> 8), 512 & r2.flags && (E[0] = 255 & u2, E[1] = u2 >>> 8 & 255, r2.check = B(r2.check, E, 2, 0)), l2 = u2 = 0, r2.mode = 5;
              case 5:
                if (1024 & r2.flags) {
                  for (; l2 < 16; ) {
                    if (0 === o2) break e;
                    o2--, u2 += n2[s2++] << l2, l2 += 8;
                  }
                  r2.length = u2, r2.head && (r2.head.extra_len = u2), 512 & r2.flags && (E[0] = 255 & u2, E[1] = u2 >>> 8 & 255, r2.check = B(r2.check, E, 2, 0)), l2 = u2 = 0;
                } else r2.head && (r2.head.extra = null);
                r2.mode = 6;
              case 6:
                if (1024 & r2.flags && (o2 < (d = r2.length) && (d = o2), d && (r2.head && (k = r2.head.extra_len - r2.length, r2.head.extra || (r2.head.extra = new Array(r2.head.extra_len)), I.arraySet(r2.head.extra, n2, s2, d, k)), 512 & r2.flags && (r2.check = B(r2.check, n2, d, s2)), o2 -= d, s2 += d, r2.length -= d), r2.length)) break e;
                r2.length = 0, r2.mode = 7;
              case 7:
                if (2048 & r2.flags) {
                  if (0 === o2) break e;
                  for (d = 0; k = n2[s2 + d++], r2.head && k && r2.length < 65536 && (r2.head.name += String.fromCharCode(k)), k && d < o2; ) ;
                  if (512 & r2.flags && (r2.check = B(r2.check, n2, d, s2)), o2 -= d, s2 += d, k) break e;
                } else r2.head && (r2.head.name = null);
                r2.length = 0, r2.mode = 8;
              case 8:
                if (4096 & r2.flags) {
                  if (0 === o2) break e;
                  for (d = 0; k = n2[s2 + d++], r2.head && k && r2.length < 65536 && (r2.head.comment += String.fromCharCode(k)), k && d < o2; ) ;
                  if (512 & r2.flags && (r2.check = B(r2.check, n2, d, s2)), o2 -= d, s2 += d, k) break e;
                } else r2.head && (r2.head.comment = null);
                r2.mode = 9;
              case 9:
                if (512 & r2.flags) {
                  for (; l2 < 16; ) {
                    if (0 === o2) break e;
                    o2--, u2 += n2[s2++] << l2, l2 += 8;
                  }
                  if (u2 !== (65535 & r2.check)) {
                    e2.msg = "header crc mismatch", r2.mode = 30;
                    break;
                  }
                  l2 = u2 = 0;
                }
                r2.head && (r2.head.hcrc = r2.flags >> 9 & 1, r2.head.done = true), e2.adler = r2.check = 0, r2.mode = 12;
                break;
              case 10:
                for (; l2 < 32; ) {
                  if (0 === o2) break e;
                  o2--, u2 += n2[s2++] << l2, l2 += 8;
                }
                e2.adler = r2.check = L(u2), l2 = u2 = 0, r2.mode = 11;
              case 11:
                if (0 === r2.havedict) return e2.next_out = a2, e2.avail_out = h2, e2.next_in = s2, e2.avail_in = o2, r2.hold = u2, r2.bits = l2, 2;
                e2.adler = r2.check = 1, r2.mode = 12;
              case 12:
                if (5 === t2 || 6 === t2) break e;
              case 13:
                if (r2.last) {
                  u2 >>>= 7 & l2, l2 -= 7 & l2, r2.mode = 27;
                  break;
                }
                for (; l2 < 3; ) {
                  if (0 === o2) break e;
                  o2--, u2 += n2[s2++] << l2, l2 += 8;
                }
                switch (r2.last = 1 & u2, l2 -= 1, 3 & (u2 >>>= 1)) {
                  case 0:
                    r2.mode = 14;
                    break;
                  case 1:
                    if (j(r2), r2.mode = 20, 6 !== t2) break;
                    u2 >>>= 2, l2 -= 2;
                    break e;
                  case 2:
                    r2.mode = 17;
                    break;
                  case 3:
                    e2.msg = "invalid block type", r2.mode = 30;
                }
                u2 >>>= 2, l2 -= 2;
                break;
              case 14:
                for (u2 >>>= 7 & l2, l2 -= 7 & l2; l2 < 32; ) {
                  if (0 === o2) break e;
                  o2--, u2 += n2[s2++] << l2, l2 += 8;
                }
                if ((65535 & u2) != (u2 >>> 16 ^ 65535)) {
                  e2.msg = "invalid stored block lengths", r2.mode = 30;
                  break;
                }
                if (r2.length = 65535 & u2, l2 = u2 = 0, r2.mode = 15, 6 === t2) break e;
              case 15:
                r2.mode = 16;
              case 16:
                if (d = r2.length) {
                  if (o2 < d && (d = o2), h2 < d && (d = h2), 0 === d) break e;
                  I.arraySet(i2, n2, s2, d, a2), o2 -= d, s2 += d, h2 -= d, a2 += d, r2.length -= d;
                  break;
                }
                r2.mode = 12;
                break;
              case 17:
                for (; l2 < 14; ) {
                  if (0 === o2) break e;
                  o2--, u2 += n2[s2++] << l2, l2 += 8;
                }
                if (r2.nlen = 257 + (31 & u2), u2 >>>= 5, l2 -= 5, r2.ndist = 1 + (31 & u2), u2 >>>= 5, l2 -= 5, r2.ncode = 4 + (15 & u2), u2 >>>= 4, l2 -= 4, 286 < r2.nlen || 30 < r2.ndist) {
                  e2.msg = "too many length or distance symbols", r2.mode = 30;
                  break;
                }
                r2.have = 0, r2.mode = 18;
              case 18:
                for (; r2.have < r2.ncode; ) {
                  for (; l2 < 3; ) {
                    if (0 === o2) break e;
                    o2--, u2 += n2[s2++] << l2, l2 += 8;
                  }
                  r2.lens[A[r2.have++]] = 7 & u2, u2 >>>= 3, l2 -= 3;
                }
                for (; r2.have < 19; ) r2.lens[A[r2.have++]] = 0;
                if (r2.lencode = r2.lendyn, r2.lenbits = 7, S = { bits: r2.lenbits }, x = T(0, r2.lens, 0, 19, r2.lencode, 0, r2.work, S), r2.lenbits = S.bits, x) {
                  e2.msg = "invalid code lengths set", r2.mode = 30;
                  break;
                }
                r2.have = 0, r2.mode = 19;
              case 19:
                for (; r2.have < r2.nlen + r2.ndist; ) {
                  for (; g = (C = r2.lencode[u2 & (1 << r2.lenbits) - 1]) >>> 16 & 255, b = 65535 & C, !((_ = C >>> 24) <= l2); ) {
                    if (0 === o2) break e;
                    o2--, u2 += n2[s2++] << l2, l2 += 8;
                  }
                  if (b < 16) u2 >>>= _, l2 -= _, r2.lens[r2.have++] = b;
                  else {
                    if (16 === b) {
                      for (z = _ + 2; l2 < z; ) {
                        if (0 === o2) break e;
                        o2--, u2 += n2[s2++] << l2, l2 += 8;
                      }
                      if (u2 >>>= _, l2 -= _, 0 === r2.have) {
                        e2.msg = "invalid bit length repeat", r2.mode = 30;
                        break;
                      }
                      k = r2.lens[r2.have - 1], d = 3 + (3 & u2), u2 >>>= 2, l2 -= 2;
                    } else if (17 === b) {
                      for (z = _ + 3; l2 < z; ) {
                        if (0 === o2) break e;
                        o2--, u2 += n2[s2++] << l2, l2 += 8;
                      }
                      l2 -= _, k = 0, d = 3 + (7 & (u2 >>>= _)), u2 >>>= 3, l2 -= 3;
                    } else {
                      for (z = _ + 7; l2 < z; ) {
                        if (0 === o2) break e;
                        o2--, u2 += n2[s2++] << l2, l2 += 8;
                      }
                      l2 -= _, k = 0, d = 11 + (127 & (u2 >>>= _)), u2 >>>= 7, l2 -= 7;
                    }
                    if (r2.have + d > r2.nlen + r2.ndist) {
                      e2.msg = "invalid bit length repeat", r2.mode = 30;
                      break;
                    }
                    for (; d--; ) r2.lens[r2.have++] = k;
                  }
                }
                if (30 === r2.mode) break;
                if (0 === r2.lens[256]) {
                  e2.msg = "invalid code -- missing end-of-block", r2.mode = 30;
                  break;
                }
                if (r2.lenbits = 9, S = { bits: r2.lenbits }, x = T(D, r2.lens, 0, r2.nlen, r2.lencode, 0, r2.work, S), r2.lenbits = S.bits, x) {
                  e2.msg = "invalid literal/lengths set", r2.mode = 30;
                  break;
                }
                if (r2.distbits = 6, r2.distcode = r2.distdyn, S = { bits: r2.distbits }, x = T(F, r2.lens, r2.nlen, r2.ndist, r2.distcode, 0, r2.work, S), r2.distbits = S.bits, x) {
                  e2.msg = "invalid distances set", r2.mode = 30;
                  break;
                }
                if (r2.mode = 20, 6 === t2) break e;
              case 20:
                r2.mode = 21;
              case 21:
                if (6 <= o2 && 258 <= h2) {
                  e2.next_out = a2, e2.avail_out = h2, e2.next_in = s2, e2.avail_in = o2, r2.hold = u2, r2.bits = l2, R(e2, c2), a2 = e2.next_out, i2 = e2.output, h2 = e2.avail_out, s2 = e2.next_in, n2 = e2.input, o2 = e2.avail_in, u2 = r2.hold, l2 = r2.bits, 12 === r2.mode && (r2.back = -1);
                  break;
                }
                for (r2.back = 0; g = (C = r2.lencode[u2 & (1 << r2.lenbits) - 1]) >>> 16 & 255, b = 65535 & C, !((_ = C >>> 24) <= l2); ) {
                  if (0 === o2) break e;
                  o2--, u2 += n2[s2++] << l2, l2 += 8;
                }
                if (g && 0 == (240 & g)) {
                  for (v = _, y = g, w = b; g = (C = r2.lencode[w + ((u2 & (1 << v + y) - 1) >> v)]) >>> 16 & 255, b = 65535 & C, !(v + (_ = C >>> 24) <= l2); ) {
                    if (0 === o2) break e;
                    o2--, u2 += n2[s2++] << l2, l2 += 8;
                  }
                  u2 >>>= v, l2 -= v, r2.back += v;
                }
                if (u2 >>>= _, l2 -= _, r2.back += _, r2.length = b, 0 === g) {
                  r2.mode = 26;
                  break;
                }
                if (32 & g) {
                  r2.back = -1, r2.mode = 12;
                  break;
                }
                if (64 & g) {
                  e2.msg = "invalid literal/length code", r2.mode = 30;
                  break;
                }
                r2.extra = 15 & g, r2.mode = 22;
              case 22:
                if (r2.extra) {
                  for (z = r2.extra; l2 < z; ) {
                    if (0 === o2) break e;
                    o2--, u2 += n2[s2++] << l2, l2 += 8;
                  }
                  r2.length += u2 & (1 << r2.extra) - 1, u2 >>>= r2.extra, l2 -= r2.extra, r2.back += r2.extra;
                }
                r2.was = r2.length, r2.mode = 23;
              case 23:
                for (; g = (C = r2.distcode[u2 & (1 << r2.distbits) - 1]) >>> 16 & 255, b = 65535 & C, !((_ = C >>> 24) <= l2); ) {
                  if (0 === o2) break e;
                  o2--, u2 += n2[s2++] << l2, l2 += 8;
                }
                if (0 == (240 & g)) {
                  for (v = _, y = g, w = b; g = (C = r2.distcode[w + ((u2 & (1 << v + y) - 1) >> v)]) >>> 16 & 255, b = 65535 & C, !(v + (_ = C >>> 24) <= l2); ) {
                    if (0 === o2) break e;
                    o2--, u2 += n2[s2++] << l2, l2 += 8;
                  }
                  u2 >>>= v, l2 -= v, r2.back += v;
                }
                if (u2 >>>= _, l2 -= _, r2.back += _, 64 & g) {
                  e2.msg = "invalid distance code", r2.mode = 30;
                  break;
                }
                r2.offset = b, r2.extra = 15 & g, r2.mode = 24;
              case 24:
                if (r2.extra) {
                  for (z = r2.extra; l2 < z; ) {
                    if (0 === o2) break e;
                    o2--, u2 += n2[s2++] << l2, l2 += 8;
                  }
                  r2.offset += u2 & (1 << r2.extra) - 1, u2 >>>= r2.extra, l2 -= r2.extra, r2.back += r2.extra;
                }
                if (r2.offset > r2.dmax) {
                  e2.msg = "invalid distance too far back", r2.mode = 30;
                  break;
                }
                r2.mode = 25;
              case 25:
                if (0 === h2) break e;
                if (d = c2 - h2, r2.offset > d) {
                  if ((d = r2.offset - d) > r2.whave && r2.sane) {
                    e2.msg = "invalid distance too far back", r2.mode = 30;
                    break;
                  }
                  p = d > r2.wnext ? (d -= r2.wnext, r2.wsize - d) : r2.wnext - d, d > r2.length && (d = r2.length), m = r2.window;
                } else m = i2, p = a2 - r2.offset, d = r2.length;
                for (h2 < d && (d = h2), h2 -= d, r2.length -= d; i2[a2++] = m[p++], --d; ) ;
                0 === r2.length && (r2.mode = 21);
                break;
              case 26:
                if (0 === h2) break e;
                i2[a2++] = r2.length, h2--, r2.mode = 21;
                break;
              case 27:
                if (r2.wrap) {
                  for (; l2 < 32; ) {
                    if (0 === o2) break e;
                    o2--, u2 |= n2[s2++] << l2, l2 += 8;
                  }
                  if (c2 -= h2, e2.total_out += c2, r2.total += c2, c2 && (e2.adler = r2.check = r2.flags ? B(r2.check, i2, c2, a2 - c2) : O(r2.check, i2, c2, a2 - c2)), c2 = h2, (r2.flags ? u2 : L(u2)) !== r2.check) {
                    e2.msg = "incorrect data check", r2.mode = 30;
                    break;
                  }
                  l2 = u2 = 0;
                }
                r2.mode = 28;
              case 28:
                if (r2.wrap && r2.flags) {
                  for (; l2 < 32; ) {
                    if (0 === o2) break e;
                    o2--, u2 += n2[s2++] << l2, l2 += 8;
                  }
                  if (u2 !== (4294967295 & r2.total)) {
                    e2.msg = "incorrect length check", r2.mode = 30;
                    break;
                  }
                  l2 = u2 = 0;
                }
                r2.mode = 29;
              case 29:
                x = 1;
                break e;
              case 30:
                x = -3;
                break e;
              case 31:
                return -4;
              case 32:
              default:
                return U;
            }
            return e2.next_out = a2, e2.avail_out = h2, e2.next_in = s2, e2.avail_in = o2, r2.hold = u2, r2.bits = l2, (r2.wsize || c2 !== e2.avail_out && r2.mode < 30 && (r2.mode < 27 || 4 !== t2)) && Z(e2, e2.output, e2.next_out, c2 - e2.avail_out) ? (r2.mode = 31, -4) : (f2 -= e2.avail_in, c2 -= e2.avail_out, e2.total_in += f2, e2.total_out += c2, r2.total += c2, r2.wrap && c2 && (e2.adler = r2.check = r2.flags ? B(r2.check, i2, c2, e2.next_out - c2) : O(r2.check, i2, c2, e2.next_out - c2)), e2.data_type = r2.bits + (r2.last ? 64 : 0) + (12 === r2.mode ? 128 : 0) + (20 === r2.mode || 15 === r2.mode ? 256 : 0), (0 == f2 && 0 === c2 || 4 === t2) && x === N && (x = -5), x);
          }, r.inflateEnd = function(e2) {
            if (!e2 || !e2.state) return U;
            var t2 = e2.state;
            return t2.window && (t2.window = null), e2.state = null, N;
          }, r.inflateGetHeader = function(e2, t2) {
            var r2;
            return e2 && e2.state ? 0 == (2 & (r2 = e2.state).wrap) ? U : ((r2.head = t2).done = false, N) : U;
          }, r.inflateSetDictionary = function(e2, t2) {
            var r2, n2 = t2.length;
            return e2 && e2.state ? 0 !== (r2 = e2.state).wrap && 11 !== r2.mode ? U : 11 === r2.mode && O(1, t2, n2, 0) !== r2.check ? -3 : Z(e2, t2, n2, n2) ? (r2.mode = 31, -4) : (r2.havedict = 1, N) : U;
          }, r.inflateInfo = "pako inflate (from Nodeca project)";
        }, { "../utils/common": 41, "./adler32": 43, "./crc32": 45, "./inffast": 48, "./inftrees": 50 }], 50: [function(e, t, r) {
          "use strict";
          var D = e("../utils/common"), F = [3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0], N = [16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 18, 18, 18, 18, 19, 19, 19, 19, 20, 20, 20, 20, 21, 21, 21, 21, 16, 72, 78], U = [1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577, 0, 0], P = [16, 16, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22, 23, 23, 24, 24, 25, 25, 26, 26, 27, 27, 28, 28, 29, 29, 64, 64];
          t.exports = function(e2, t2, r2, n, i, s, a, o) {
            var h, u, l, f, c, d, p, m, _, g = o.bits, b = 0, v = 0, y = 0, w = 0, k = 0, x = 0, S = 0, z = 0, C = 0, E = 0, A = null, I = 0, O = new D.Buf16(16), B = new D.Buf16(16), R = null, T = 0;
            for (b = 0; b <= 15; b++) O[b] = 0;
            for (v = 0; v < n; v++) O[t2[r2 + v]]++;
            for (k = g, w = 15; 1 <= w && 0 === O[w]; w--) ;
            if (w < k && (k = w), 0 === w) return i[s++] = 20971520, i[s++] = 20971520, o.bits = 1, 0;
            for (y = 1; y < w && 0 === O[y]; y++) ;
            for (k < y && (k = y), b = z = 1; b <= 15; b++) if (z <<= 1, (z -= O[b]) < 0) return -1;
            if (0 < z && (0 === e2 || 1 !== w)) return -1;
            for (B[1] = 0, b = 1; b < 15; b++) B[b + 1] = B[b] + O[b];
            for (v = 0; v < n; v++) 0 !== t2[r2 + v] && (a[B[t2[r2 + v]]++] = v);
            if (d = 0 === e2 ? (A = R = a, 19) : 1 === e2 ? (A = F, I -= 257, R = N, T -= 257, 256) : (A = U, R = P, -1), b = y, c = s, S = v = E = 0, l = -1, f = (C = 1 << (x = k)) - 1, 1 === e2 && 852 < C || 2 === e2 && 592 < C) return 1;
            for (; ; ) {
              for (p = b - S, _ = a[v] < d ? (m = 0, a[v]) : a[v] > d ? (m = R[T + a[v]], A[I + a[v]]) : (m = 96, 0), h = 1 << b - S, y = u = 1 << x; i[c + (E >> S) + (u -= h)] = p << 24 | m << 16 | _ | 0, 0 !== u; ) ;
              for (h = 1 << b - 1; E & h; ) h >>= 1;
              if (0 !== h ? (E &= h - 1, E += h) : E = 0, v++, 0 == --O[b]) {
                if (b === w) break;
                b = t2[r2 + a[v]];
              }
              if (k < b && (E & f) !== l) {
                for (0 === S && (S = k), c += y, z = 1 << (x = b - S); x + S < w && !((z -= O[x + S]) <= 0); ) x++, z <<= 1;
                if (C += 1 << x, 1 === e2 && 852 < C || 2 === e2 && 592 < C) return 1;
                i[l = E & f] = k << 24 | x << 16 | c - s | 0;
              }
            }
            return 0 !== E && (i[c + E] = b - S << 24 | 64 << 16 | 0), o.bits = k, 0;
          };
        }, { "../utils/common": 41 }], 51: [function(e, t, r) {
          "use strict";
          t.exports = { 2: "need dictionary", 1: "stream end", 0: "", "-1": "file error", "-2": "stream error", "-3": "data error", "-4": "insufficient memory", "-5": "buffer error", "-6": "incompatible version" };
        }, {}], 52: [function(e, t, r) {
          "use strict";
          var i = e("../utils/common"), o = 0, h = 1;
          function n(e2) {
            for (var t2 = e2.length; 0 <= --t2; ) e2[t2] = 0;
          }
          var s = 0, a = 29, u = 256, l = u + 1 + a, f = 30, c = 19, _ = 2 * l + 1, g = 15, d = 16, p = 7, m = 256, b = 16, v = 17, y = 18, w = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0], k = [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13], x = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7], S = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15], z = new Array(2 * (l + 2));
          n(z);
          var C = new Array(2 * f);
          n(C);
          var E = new Array(512);
          n(E);
          var A = new Array(256);
          n(A);
          var I = new Array(a);
          n(I);
          var O, B, R, T = new Array(f);
          function D(e2, t2, r2, n2, i2) {
            this.static_tree = e2, this.extra_bits = t2, this.extra_base = r2, this.elems = n2, this.max_length = i2, this.has_stree = e2 && e2.length;
          }
          function F(e2, t2) {
            this.dyn_tree = e2, this.max_code = 0, this.stat_desc = t2;
          }
          function N(e2) {
            return e2 < 256 ? E[e2] : E[256 + (e2 >>> 7)];
          }
          function U(e2, t2) {
            e2.pending_buf[e2.pending++] = 255 & t2, e2.pending_buf[e2.pending++] = t2 >>> 8 & 255;
          }
          function P(e2, t2, r2) {
            e2.bi_valid > d - r2 ? (e2.bi_buf |= t2 << e2.bi_valid & 65535, U(e2, e2.bi_buf), e2.bi_buf = t2 >> d - e2.bi_valid, e2.bi_valid += r2 - d) : (e2.bi_buf |= t2 << e2.bi_valid & 65535, e2.bi_valid += r2);
          }
          function L(e2, t2, r2) {
            P(e2, r2[2 * t2], r2[2 * t2 + 1]);
          }
          function j(e2, t2) {
            for (var r2 = 0; r2 |= 1 & e2, e2 >>>= 1, r2 <<= 1, 0 < --t2; ) ;
            return r2 >>> 1;
          }
          function Z(e2, t2, r2) {
            var n2, i2, s2 = new Array(g + 1), a2 = 0;
            for (n2 = 1; n2 <= g; n2++) s2[n2] = a2 = a2 + r2[n2 - 1] << 1;
            for (i2 = 0; i2 <= t2; i2++) {
              var o2 = e2[2 * i2 + 1];
              0 !== o2 && (e2[2 * i2] = j(s2[o2]++, o2));
            }
          }
          function W(e2) {
            var t2;
            for (t2 = 0; t2 < l; t2++) e2.dyn_ltree[2 * t2] = 0;
            for (t2 = 0; t2 < f; t2++) e2.dyn_dtree[2 * t2] = 0;
            for (t2 = 0; t2 < c; t2++) e2.bl_tree[2 * t2] = 0;
            e2.dyn_ltree[2 * m] = 1, e2.opt_len = e2.static_len = 0, e2.last_lit = e2.matches = 0;
          }
          function M(e2) {
            8 < e2.bi_valid ? U(e2, e2.bi_buf) : 0 < e2.bi_valid && (e2.pending_buf[e2.pending++] = e2.bi_buf), e2.bi_buf = 0, e2.bi_valid = 0;
          }
          function H(e2, t2, r2, n2) {
            var i2 = 2 * t2, s2 = 2 * r2;
            return e2[i2] < e2[s2] || e2[i2] === e2[s2] && n2[t2] <= n2[r2];
          }
          function G(e2, t2, r2) {
            for (var n2 = e2.heap[r2], i2 = r2 << 1; i2 <= e2.heap_len && (i2 < e2.heap_len && H(t2, e2.heap[i2 + 1], e2.heap[i2], e2.depth) && i2++, !H(t2, n2, e2.heap[i2], e2.depth)); ) e2.heap[r2] = e2.heap[i2], r2 = i2, i2 <<= 1;
            e2.heap[r2] = n2;
          }
          function K(e2, t2, r2) {
            var n2, i2, s2, a2, o2 = 0;
            if (0 !== e2.last_lit) for (; n2 = e2.pending_buf[e2.d_buf + 2 * o2] << 8 | e2.pending_buf[e2.d_buf + 2 * o2 + 1], i2 = e2.pending_buf[e2.l_buf + o2], o2++, 0 === n2 ? L(e2, i2, t2) : (L(e2, (s2 = A[i2]) + u + 1, t2), 0 !== (a2 = w[s2]) && P(e2, i2 -= I[s2], a2), L(e2, s2 = N(--n2), r2), 0 !== (a2 = k[s2]) && P(e2, n2 -= T[s2], a2)), o2 < e2.last_lit; ) ;
            L(e2, m, t2);
          }
          function Y(e2, t2) {
            var r2, n2, i2, s2 = t2.dyn_tree, a2 = t2.stat_desc.static_tree, o2 = t2.stat_desc.has_stree, h2 = t2.stat_desc.elems, u2 = -1;
            for (e2.heap_len = 0, e2.heap_max = _, r2 = 0; r2 < h2; r2++) 0 !== s2[2 * r2] ? (e2.heap[++e2.heap_len] = u2 = r2, e2.depth[r2] = 0) : s2[2 * r2 + 1] = 0;
            for (; e2.heap_len < 2; ) s2[2 * (i2 = e2.heap[++e2.heap_len] = u2 < 2 ? ++u2 : 0)] = 1, e2.depth[i2] = 0, e2.opt_len--, o2 && (e2.static_len -= a2[2 * i2 + 1]);
            for (t2.max_code = u2, r2 = e2.heap_len >> 1; 1 <= r2; r2--) G(e2, s2, r2);
            for (i2 = h2; r2 = e2.heap[1], e2.heap[1] = e2.heap[e2.heap_len--], G(e2, s2, 1), n2 = e2.heap[1], e2.heap[--e2.heap_max] = r2, e2.heap[--e2.heap_max] = n2, s2[2 * i2] = s2[2 * r2] + s2[2 * n2], e2.depth[i2] = (e2.depth[r2] >= e2.depth[n2] ? e2.depth[r2] : e2.depth[n2]) + 1, s2[2 * r2 + 1] = s2[2 * n2 + 1] = i2, e2.heap[1] = i2++, G(e2, s2, 1), 2 <= e2.heap_len; ) ;
            e2.heap[--e2.heap_max] = e2.heap[1], (function(e3, t3) {
              var r3, n3, i3, s3, a3, o3, h3 = t3.dyn_tree, u3 = t3.max_code, l2 = t3.stat_desc.static_tree, f2 = t3.stat_desc.has_stree, c2 = t3.stat_desc.extra_bits, d2 = t3.stat_desc.extra_base, p2 = t3.stat_desc.max_length, m2 = 0;
              for (s3 = 0; s3 <= g; s3++) e3.bl_count[s3] = 0;
              for (h3[2 * e3.heap[e3.heap_max] + 1] = 0, r3 = e3.heap_max + 1; r3 < _; r3++) p2 < (s3 = h3[2 * h3[2 * (n3 = e3.heap[r3]) + 1] + 1] + 1) && (s3 = p2, m2++), h3[2 * n3 + 1] = s3, u3 < n3 || (e3.bl_count[s3]++, a3 = 0, d2 <= n3 && (a3 = c2[n3 - d2]), o3 = h3[2 * n3], e3.opt_len += o3 * (s3 + a3), f2 && (e3.static_len += o3 * (l2[2 * n3 + 1] + a3)));
              if (0 !== m2) {
                do {
                  for (s3 = p2 - 1; 0 === e3.bl_count[s3]; ) s3--;
                  e3.bl_count[s3]--, e3.bl_count[s3 + 1] += 2, e3.bl_count[p2]--, m2 -= 2;
                } while (0 < m2);
                for (s3 = p2; 0 !== s3; s3--) for (n3 = e3.bl_count[s3]; 0 !== n3; ) u3 < (i3 = e3.heap[--r3]) || (h3[2 * i3 + 1] !== s3 && (e3.opt_len += (s3 - h3[2 * i3 + 1]) * h3[2 * i3], h3[2 * i3 + 1] = s3), n3--);
              }
            })(e2, t2), Z(s2, u2, e2.bl_count);
          }
          function X(e2, t2, r2) {
            var n2, i2, s2 = -1, a2 = t2[1], o2 = 0, h2 = 7, u2 = 4;
            for (0 === a2 && (h2 = 138, u2 = 3), t2[2 * (r2 + 1) + 1] = 65535, n2 = 0; n2 <= r2; n2++) i2 = a2, a2 = t2[2 * (n2 + 1) + 1], ++o2 < h2 && i2 === a2 || (o2 < u2 ? e2.bl_tree[2 * i2] += o2 : 0 !== i2 ? (i2 !== s2 && e2.bl_tree[2 * i2]++, e2.bl_tree[2 * b]++) : o2 <= 10 ? e2.bl_tree[2 * v]++ : e2.bl_tree[2 * y]++, s2 = i2, u2 = (o2 = 0) === a2 ? (h2 = 138, 3) : i2 === a2 ? (h2 = 6, 3) : (h2 = 7, 4));
          }
          function V(e2, t2, r2) {
            var n2, i2, s2 = -1, a2 = t2[1], o2 = 0, h2 = 7, u2 = 4;
            for (0 === a2 && (h2 = 138, u2 = 3), n2 = 0; n2 <= r2; n2++) if (i2 = a2, a2 = t2[2 * (n2 + 1) + 1], !(++o2 < h2 && i2 === a2)) {
              if (o2 < u2) for (; L(e2, i2, e2.bl_tree), 0 != --o2; ) ;
              else 0 !== i2 ? (i2 !== s2 && (L(e2, i2, e2.bl_tree), o2--), L(e2, b, e2.bl_tree), P(e2, o2 - 3, 2)) : o2 <= 10 ? (L(e2, v, e2.bl_tree), P(e2, o2 - 3, 3)) : (L(e2, y, e2.bl_tree), P(e2, o2 - 11, 7));
              s2 = i2, u2 = (o2 = 0) === a2 ? (h2 = 138, 3) : i2 === a2 ? (h2 = 6, 3) : (h2 = 7, 4);
            }
          }
          n(T);
          var q = false;
          function J(e2, t2, r2, n2) {
            P(e2, (s << 1) + (n2 ? 1 : 0), 3), (function(e3, t3, r3, n3) {
              M(e3), n3 && (U(e3, r3), U(e3, ~r3)), i.arraySet(e3.pending_buf, e3.window, t3, r3, e3.pending), e3.pending += r3;
            })(e2, t2, r2, true);
          }
          r._tr_init = function(e2) {
            q || ((function() {
              var e3, t2, r2, n2, i2, s2 = new Array(g + 1);
              for (n2 = r2 = 0; n2 < a - 1; n2++) for (I[n2] = r2, e3 = 0; e3 < 1 << w[n2]; e3++) A[r2++] = n2;
              for (A[r2 - 1] = n2, n2 = i2 = 0; n2 < 16; n2++) for (T[n2] = i2, e3 = 0; e3 < 1 << k[n2]; e3++) E[i2++] = n2;
              for (i2 >>= 7; n2 < f; n2++) for (T[n2] = i2 << 7, e3 = 0; e3 < 1 << k[n2] - 7; e3++) E[256 + i2++] = n2;
              for (t2 = 0; t2 <= g; t2++) s2[t2] = 0;
              for (e3 = 0; e3 <= 143; ) z[2 * e3 + 1] = 8, e3++, s2[8]++;
              for (; e3 <= 255; ) z[2 * e3 + 1] = 9, e3++, s2[9]++;
              for (; e3 <= 279; ) z[2 * e3 + 1] = 7, e3++, s2[7]++;
              for (; e3 <= 287; ) z[2 * e3 + 1] = 8, e3++, s2[8]++;
              for (Z(z, l + 1, s2), e3 = 0; e3 < f; e3++) C[2 * e3 + 1] = 5, C[2 * e3] = j(e3, 5);
              O = new D(z, w, u + 1, l, g), B = new D(C, k, 0, f, g), R = new D(new Array(0), x, 0, c, p);
            })(), q = true), e2.l_desc = new F(e2.dyn_ltree, O), e2.d_desc = new F(e2.dyn_dtree, B), e2.bl_desc = new F(e2.bl_tree, R), e2.bi_buf = 0, e2.bi_valid = 0, W(e2);
          }, r._tr_stored_block = J, r._tr_flush_block = function(e2, t2, r2, n2) {
            var i2, s2, a2 = 0;
            0 < e2.level ? (2 === e2.strm.data_type && (e2.strm.data_type = (function(e3) {
              var t3, r3 = 4093624447;
              for (t3 = 0; t3 <= 31; t3++, r3 >>>= 1) if (1 & r3 && 0 !== e3.dyn_ltree[2 * t3]) return o;
              if (0 !== e3.dyn_ltree[18] || 0 !== e3.dyn_ltree[20] || 0 !== e3.dyn_ltree[26]) return h;
              for (t3 = 32; t3 < u; t3++) if (0 !== e3.dyn_ltree[2 * t3]) return h;
              return o;
            })(e2)), Y(e2, e2.l_desc), Y(e2, e2.d_desc), a2 = (function(e3) {
              var t3;
              for (X(e3, e3.dyn_ltree, e3.l_desc.max_code), X(e3, e3.dyn_dtree, e3.d_desc.max_code), Y(e3, e3.bl_desc), t3 = c - 1; 3 <= t3 && 0 === e3.bl_tree[2 * S[t3] + 1]; t3--) ;
              return e3.opt_len += 3 * (t3 + 1) + 5 + 5 + 4, t3;
            })(e2), i2 = e2.opt_len + 3 + 7 >>> 3, (s2 = e2.static_len + 3 + 7 >>> 3) <= i2 && (i2 = s2)) : i2 = s2 = r2 + 5, r2 + 4 <= i2 && -1 !== t2 ? J(e2, t2, r2, n2) : 4 === e2.strategy || s2 === i2 ? (P(e2, 2 + (n2 ? 1 : 0), 3), K(e2, z, C)) : (P(e2, 4 + (n2 ? 1 : 0), 3), (function(e3, t3, r3, n3) {
              var i3;
              for (P(e3, t3 - 257, 5), P(e3, r3 - 1, 5), P(e3, n3 - 4, 4), i3 = 0; i3 < n3; i3++) P(e3, e3.bl_tree[2 * S[i3] + 1], 3);
              V(e3, e3.dyn_ltree, t3 - 1), V(e3, e3.dyn_dtree, r3 - 1);
            })(e2, e2.l_desc.max_code + 1, e2.d_desc.max_code + 1, a2 + 1), K(e2, e2.dyn_ltree, e2.dyn_dtree)), W(e2), n2 && M(e2);
          }, r._tr_tally = function(e2, t2, r2) {
            return e2.pending_buf[e2.d_buf + 2 * e2.last_lit] = t2 >>> 8 & 255, e2.pending_buf[e2.d_buf + 2 * e2.last_lit + 1] = 255 & t2, e2.pending_buf[e2.l_buf + e2.last_lit] = 255 & r2, e2.last_lit++, 0 === t2 ? e2.dyn_ltree[2 * r2]++ : (e2.matches++, t2--, e2.dyn_ltree[2 * (A[r2] + u + 1)]++, e2.dyn_dtree[2 * N(t2)]++), e2.last_lit === e2.lit_bufsize - 1;
          }, r._tr_align = function(e2) {
            P(e2, 2, 3), L(e2, m, z), (function(e3) {
              16 === e3.bi_valid ? (U(e3, e3.bi_buf), e3.bi_buf = 0, e3.bi_valid = 0) : 8 <= e3.bi_valid && (e3.pending_buf[e3.pending++] = 255 & e3.bi_buf, e3.bi_buf >>= 8, e3.bi_valid -= 8);
            })(e2);
          };
        }, { "../utils/common": 41 }], 53: [function(e, t, r) {
          "use strict";
          t.exports = function() {
            this.input = null, this.next_in = 0, this.avail_in = 0, this.total_in = 0, this.output = null, this.next_out = 0, this.avail_out = 0, this.total_out = 0, this.msg = "", this.state = null, this.data_type = 2, this.adler = 0;
          };
        }, {}], 54: [function(e, t, r) {
          (function(e2) {
            !(function(r2, n) {
              "use strict";
              if (!r2.setImmediate) {
                var i, s, t2, a, o = 1, h = {}, u = false, l = r2.document, e3 = Object.getPrototypeOf && Object.getPrototypeOf(r2);
                e3 = e3 && e3.setTimeout ? e3 : r2, i = "[object process]" === {}.toString.call(r2.process) ? function(e4) {
                  process.nextTick(function() {
                    c(e4);
                  });
                } : (function() {
                  if (r2.postMessage && !r2.importScripts) {
                    var e4 = true, t3 = r2.onmessage;
                    return r2.onmessage = function() {
                      e4 = false;
                    }, r2.postMessage("", "*"), r2.onmessage = t3, e4;
                  }
                })() ? (a = "setImmediate$" + Math.random() + "$", r2.addEventListener ? r2.addEventListener("message", d, false) : r2.attachEvent("onmessage", d), function(e4) {
                  r2.postMessage(a + e4, "*");
                }) : r2.MessageChannel ? ((t2 = new MessageChannel()).port1.onmessage = function(e4) {
                  c(e4.data);
                }, function(e4) {
                  t2.port2.postMessage(e4);
                }) : l && "onreadystatechange" in l.createElement("script") ? (s = l.documentElement, function(e4) {
                  var t3 = l.createElement("script");
                  t3.onreadystatechange = function() {
                    c(e4), t3.onreadystatechange = null, s.removeChild(t3), t3 = null;
                  }, s.appendChild(t3);
                }) : function(e4) {
                  setTimeout(c, 0, e4);
                }, e3.setImmediate = function(e4) {
                  "function" != typeof e4 && (e4 = new Function("" + e4));
                  for (var t3 = new Array(arguments.length - 1), r3 = 0; r3 < t3.length; r3++) t3[r3] = arguments[r3 + 1];
                  var n2 = { callback: e4, args: t3 };
                  return h[o] = n2, i(o), o++;
                }, e3.clearImmediate = f;
              }
              function f(e4) {
                delete h[e4];
              }
              function c(e4) {
                if (u) setTimeout(c, 0, e4);
                else {
                  var t3 = h[e4];
                  if (t3) {
                    u = true;
                    try {
                      !(function(e5) {
                        var t4 = e5.callback, r3 = e5.args;
                        switch (r3.length) {
                          case 0:
                            t4();
                            break;
                          case 1:
                            t4(r3[0]);
                            break;
                          case 2:
                            t4(r3[0], r3[1]);
                            break;
                          case 3:
                            t4(r3[0], r3[1], r3[2]);
                            break;
                          default:
                            t4.apply(n, r3);
                        }
                      })(t3);
                    } finally {
                      f(e4), u = false;
                    }
                  }
                }
              }
              function d(e4) {
                e4.source === r2 && "string" == typeof e4.data && 0 === e4.data.indexOf(a) && c(+e4.data.slice(a.length));
              }
            })("undefined" == typeof self ? void 0 === e2 ? this : e2 : self);
          }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
        }, {}] }, {}, [10])(10);
      });
    }
  });

  // js/config.js
  var CODE_EXTENSIONS_MAP = {
    // Web & Frontend
    "js": "javascript",
    "mjs": "javascript",
    "cjs": "javascript",
    "ts": "typescript",
    "tsx": "tsx",
    "jsx": "jsx",
    "html": "html",
    "htm": "html",
    "xhtml": "html",
    "css": "css",
    "scss": "scss",
    "sass": "sass",
    "less": "less",
    "styl": "stylus",
    "vue": "vue",
    "svelte": "svelte",
    "astro": "astro",
    // Computação Científica, Numérica & Estatística
    "m": "matlab",
    "matlab": "matlab",
    "octave": "matlab",
    "r": "r",
    "rmd": "r",
    "jl": "julia",
    "f": "fortran",
    "for": "fortran",
    "f90": "fortran",
    "f95": "fortran",
    "nb": "mathematica",
    "wl": "wolfram",
    // Scripts, Embeds, Jogos & Automação
    "lua": "lua",
    "py": "python",
    "pyw": "python",
    "ipynb": "json",
    "rb": "ruby",
    "rake": "ruby",
    "gemspec": "ruby",
    "php": "php",
    "phtml": "php",
    "pl": "perl",
    "pm": "perl",
    "t": "perl",
    "tcl": "tcl",
    "awk": "awk",
    "sed": "sed",
    // Sistemas, Baixo Nível & Alta Performance
    "c": "c",
    "h": "c",
    "cpp": "cpp",
    "hpp": "cpp",
    "cc": "cpp",
    "cxx": "cpp",
    "hxx": "cpp",
    "rs": "rust",
    "go": "go",
    "zig": "zig",
    "nim": "nim",
    "d": "d",
    "pas": "pascal",
    "pp": "pascal",
    "inc": "pascal",
    "ada": "ada",
    "adb": "ada",
    "ads": "ada",
    "asm": "assembly",
    "s": "assembly",
    "nasm": "assembly",
    // JVM & .NET
    "java": "java",
    "class": "text",
    "kt": "kotlin",
    "kts": "kotlin",
    "scala": "scala",
    "sc": "scala",
    "groovy": "groovy",
    "gvy": "groovy",
    "cs": "csharp",
    "csx": "csharp",
    "fs": "fsharp",
    "fsi": "fsharp",
    "fsx": "fsharp",
    "vb": "vbnet",
    "vbs": "vbscript",
    // Funcionais, Lisp & Concorrência
    "hs": "haskell",
    "lhs": "haskell",
    "ex": "elixir",
    "exs": "elixir",
    "erl": "erlang",
    "hrl": "erlang",
    "clj": "clojure",
    "cljs": "clojure",
    "edn": "clojure",
    "ml": "ocaml",
    "mli": "ocaml",
    "lisp": "lisp",
    "lsp": "lisp",
    "cl": "lisp",
    "scm": "scheme",
    "ss": "scheme",
    "rkt": "racket",
    "elm": "elm",
    "purs": "purescript",
    "gleam": "gleam",
    // Mobile & Multiplataforma
    "swift": "swift",
    "dart": "dart",
    // Shell, DevOps, Infra & Contêineres
    "sh": "bash",
    "bash": "bash",
    "zsh": "bash",
    "fish": "fish",
    "ps1": "powershell",
    "psm1": "powershell",
    "bat": "bat",
    "cmd": "bat",
    "dockerfile": "dockerfile",
    "containerfile": "dockerfile",
    "makefile": "makefile",
    "mk": "makefile",
    "cmake": "cmake",
    "tf": "terraform",
    "hcl": "hcl",
    "nix": "nix",
    // Bancos de Dados & Consultas
    "sql": "sql",
    "psql": "sql",
    "plsql": "sql",
    "tsql": "sql",
    "cql": "cql",
    "prisma": "prisma",
    "graphql": "graphql",
    "gql": "graphql",
    // Hardware, Shaders & Web3
    "v": "verilog",
    "sv": "systemverilog",
    "vhd": "vhdl",
    "vhdl": "vhdl",
    "glsl": "glsl",
    "vert": "glsl",
    "frag": "glsl",
    "hlsl": "hlsl",
    "wgsl": "wgsl",
    "sol": "solidity",
    // Linguagens Históricas
    "cob": "cobol",
    "cbl": "cobol",
    "fth": "forth",
    "forth": "forth",
    "bas": "basic",
    // Serialização, Configuração & Metadados
    "json": "json",
    "json5": "json5",
    "jsonc": "jsonc",
    "yaml": "yaml",
    "yml": "yaml",
    "toml": "toml",
    "ini": "ini",
    "cfg": "ini",
    "conf": "ini",
    "xml": "xml",
    "xsd": "xml",
    "xsl": "xml",
    "svg": "xml",
    "proto": "protobuf",
    "env": "bash"
  };
  var SUPPORTED_EXTENSIONS = {
    // Documentos
    "docx": { category: "document", label: "Word (.docx)", parser: "docx" },
    "odt": { category: "document", label: "OpenDocument (.odt)", parser: "docx" },
    "rtf": { category: "text", label: "Rich Text (.rtf)", parser: "text", lang: "plaintext" },
    // Planilhas & Matrizes
    "xlsx": { category: "spreadsheet", label: "Excel (.xlsx)", parser: "xlsx" },
    "xls": { category: "spreadsheet", label: "Excel 97-2004 (.xls)", parser: "xlsx" },
    "csv": { category: "spreadsheet", label: "CSV (.csv)", parser: "xlsx" },
    "tsv": { category: "spreadsheet", label: "TSV (.tsv)", parser: "xlsx" },
    "ods": { category: "spreadsheet", label: "OpenDocument (.ods)", parser: "xlsx" },
    // Apresentações
    "pptx": { category: "presentation", label: "PowerPoint (.pptx)", parser: "pptx" },
    "odp": { category: "presentation", label: "OpenDocument (.odp)", parser: "pptx" },
    // Documentos Fechados
    "pdf": { category: "pdf", label: "PDF (.pdf)", parser: "pdf" },
    // Serialização, Configuração & Dados
    "yaml": { category: "code", label: "YAML", parser: "text", lang: "yaml" },
    "yml": { category: "code", label: "YAML", parser: "text", lang: "yaml" },
    "json": { category: "text", label: "JSON", parser: "text", lang: "json" },
    "json5": { category: "text", label: "JSON5", parser: "text", lang: "json" },
    "jsonc": { category: "text", label: "JSON with Comments", parser: "text", lang: "json" },
    "xml": { category: "text", label: "XML", parser: "text", lang: "xml" },
    "toml": { category: "code", label: "TOML", parser: "code", lang: "toml" },
    "ini": { category: "code", label: "INI", parser: "code", lang: "ini" },
    "cfg": { category: "code", label: "Config", parser: "code", lang: "ini" },
    "conf": { category: "code", label: "Config", parser: "code", lang: "ini" },
    // Texto & Marcação
    "html": { category: "text", label: "HTML", parser: "text", lang: "html" },
    "htm": { category: "text", label: "HTML", parser: "text", lang: "html" },
    "xhtml": { category: "text", label: "XHTML", parser: "text", lang: "html" },
    "md": { category: "text", label: "Markdown", parser: "text", lang: "markdown" },
    "markdown": { category: "text", label: "Markdown", parser: "text", lang: "markdown" },
    "txt": { category: "text", label: "Texto Puro", parser: "text", lang: "plaintext" },
    "log": { category: "text", label: "Log", parser: "text", lang: "plaintext" }
  };
  var MIME_TYPE_MAP = {
    "application/x-yaml": "yaml",
    "text/yaml": "yaml",
    "text/x-yaml": "yaml",
    "application/yaml": "yaml",
    "application/json": "json",
    "text/html": "html",
    "text/plain": "txt",
    "text/markdown": "md",
    "text/x-markdown": "md",
    "text/xml": "xml",
    "application/xml": "xml",
    "application/rtf": "rtf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document": "docx",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": "xlsx",
    "application/vnd.ms-excel": "xls",
    "text/csv": "csv",
    "text/tab-separated-values": "tsv",
    "application/vnd.oasis.opendocument.spreadsheet": "ods",
    "application/vnd.openxmlformats-officedocument.presentationml.presentation": "pptx",
    "application/pdf": "pdf",
    "application/javascript": "js",
    "text/javascript": "js",
    "application/typescript": "ts",
    "text/x-python": "py",
    "text/x-c": "c",
    "text/x-c++": "cpp",
    "text/x-shellscript": "sh",
    "application/zip": "zip",
    "application/x-zip-compressed": "zip",
    "application/x-rar-compressed": "rar"
  };
  var APP_CONFIG = {
    VERSION: "v.2.5.0",
    APP_NAME: "Open Tool",
    TAGLINE: "Open Tool \u2022 Ferramentas Universais 100% Client-Side",
    REPO_URL: "https://github.com/mathmorato/open-tool",
    // Limite máximo rígido de tamanho por arquivo (1,5 GB = 1.610.612.736 bytes)
    MAX_FILE_SIZE_BYTES: 1.5 * 1024 * 1024 * 1024,
    // 1.5 GB = 1.610.612.736 bytes
    // Configurações de Concorrência do Pipeline de Lote
    CONCURRENCY: {
      DEFAULT: 4,
      // Pool moderado para poucos arquivos (<= 20)
      HIGH_VOLUME_THRESHOLD: 20,
      // Ponto de corte para escalonamento automático
      HIGH_VOLUME: 1e3
      // Pool agressivo para alto volume e descompactação (até 1000 simultâneos)
    },
    // Chaves de persistência no LocalStorage
    STORAGE_KEYS: {
      THEME: "doc2md_theme",
      // 'dark' | 'light' | 'system'
      VIEW_MODE: "doc2md_view_mode",
      // 'split' | 'raw' | 'preview'
      LINE_WRAPPING: "doc2md_line_wrapping",
      // true | false
      PRESERVE_HEADING_IDS: "doc2md_preserve_headings",
      MERGE_MARKDOWN: "doc2md_merge_markdown"
    },
    // CDN URLs para carregamento assíncrono sob demanda (Zero overhead inicial)
    CDN: {
      MAMMOTH: "https://cdnjs.cloudflare.com/ajax/libs/mammoth/1.8.0/mammoth.browser.min.js",
      TURNDOWN: "https://cdnjs.cloudflare.com/ajax/libs/turndown/7.2.0/turndown.min.js",
      TURNDOWN_GFM: "https://cdn.jsdelivr.net/npm/turndown-plugin-gfm@1.0.2/dist/turndown-plugin-gfm.min.js",
      SHEETJS: "https://cdn.sheetjs.com/xlsx-0.20.3/package/dist/xlsx.full.min.js",
      JSZIP: "https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js",
      PDFJS: "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js",
      PDFJS_WORKER: "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js",
      MARKED: "https://cdn.jsdelivr.net/npm/marked@12.0.2/marked.min.js",
      DOMPURIFY: "https://cdnjs.cloudflare.com/ajax/libs/dompurify/3.1.5/purify.min.js"
    },
    // Pacotes compactados suportados para extração automática client-side em memória
    ARCHIVE_EXTENSIONS: [".zip", ".rar", ".7z", ".tar", ".gz", ".bz2"],
    // Formatos binários conhecidamente não suportados (rejeição rápida com orientação clara)
    UNSUPPORTED_BINARY_EXTENSIONS: [
      ".exe",
      ".bin",
      ".dll",
      ".iso",
      ".dmg",
      ".apk",
      ".app",
      ".msi",
      ".mp3",
      ".wav",
      ".ogg",
      ".flac",
      ".mp4",
      ".avi",
      ".mov",
      ".mkv",
      ".png",
      ".jpg",
      ".jpeg",
      ".gif",
      ".webp",
      ".svg",
      ".ico",
      ".psd"
    ],
    // Formatos suportados e metadados
    SUPPORTED_FORMATS: {
      docx: {
        ext: [".docx"],
        mime: ["application/vnd.openxmlformats-officedocument.wordprocessingml.document"],
        name: "Word (.docx)",
        category: "document",
        parser: "docx"
      },
      sheet: {
        ext: [".xlsx", ".xls", ".csv", ".tsv", ".ods"],
        mime: [
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          "application/vnd.ms-excel",
          "text/csv",
          "text/tab-separated-values",
          "application/vnd.oasis.opendocument.spreadsheet"
        ],
        name: "Planilhas (.xlsx, .csv, .tsv, .ods)",
        category: "spreadsheet",
        parser: "xlsx"
      },
      presentation: {
        ext: [".pptx"],
        mime: ["application/vnd.openxmlformats-officedocument.presentationml.presentation"],
        name: "Apresenta\xE7\xE3o (.pptx)",
        category: "presentation",
        parser: "pptx"
      },
      pdf: {
        ext: [".pdf"],
        mime: ["application/pdf"],
        name: "PDF (.pdf)",
        category: "pdf",
        parser: "pdf"
      },
      text: {
        ext: [".txt", ".json", ".html", ".htm", ".rtf", ".xml", ".md", ".markdown", ".log", ".yaml", ".yml"],
        mime: [
          "text/plain",
          "application/json",
          "text/html",
          "application/rtf",
          "text/xml",
          "text/markdown",
          "application/x-yaml",
          "text/yaml",
          "text/x-yaml",
          "application/yaml"
        ],
        name: "Texto / YAML / Dados (.txt, .json, .html, .rtf, .md, .yaml, .yml)",
        category: "text",
        parser: "text"
      },
      code: {
        ext: Object.keys(CODE_EXTENSIONS_MAP).map((ext) => "." + ext),
        name: "C\xF3digo-Fonte / Scripts",
        category: "code",
        parser: "code"
      }
    }
  };
  var loadedScripts = /* @__PURE__ */ new Map();
  function loadScript(src) {
    if (typeof document === "undefined") {
      return Promise.resolve();
    }
    if (loadedScripts.has(src)) {
      return loadedScripts.get(src);
    }
    const existing = typeof document !== "undefined" ? document.querySelector(`script[src="${src}"]`) : null;
    if (existing && existing.dataset.loaded === "true") {
      return Promise.resolve();
    }
    if (typeof window !== "undefined") {
      if ((src.includes("pdf-lib") || src.includes("pdf_lib")) && window.PDFLib) {
        if (existing) existing.dataset.loaded = "true";
        return Promise.resolve();
      }
      if (src.includes("pdf.min.js") && window.pdfjsLib) {
        if (existing) existing.dataset.loaded = "true";
        return Promise.resolve();
      }
      if (src.includes("qrcodegen") && window.qrcodegen) {
        if (existing) existing.dataset.loaded = "true";
        return Promise.resolve();
      }
      if (src.includes("imagetracer") && window.ImageTracer) {
        if (existing) existing.dataset.loaded = "true";
        return Promise.resolve();
      }
      if ((src.includes("jszip") || src.includes("JSZip")) && window.JSZip) {
        if (existing) existing.dataset.loaded = "true";
        return Promise.resolve();
      }
      if (src.includes("qpdf") && window.createQpdfModule) {
        if (existing) existing.dataset.loaded = "true";
        return Promise.resolve();
      }
    }
    const promise = new Promise((resolve, reject) => {
      if (existing) {
        if (existing.dataset.loaded === "true") return resolve();
        let settled = false;
        const onDone = () => {
          if (!settled) {
            settled = true;
            existing.dataset.loaded = "true";
            resolve();
          }
        };
        existing.addEventListener("load", onDone);
        existing.addEventListener("error", (err) => reject(err));
        if (existing.readyState === "complete" || existing.readyState === "loaded" || document && document.readyState === "complete") {
          setTimeout(onDone, 10);
        }
        return;
      }
      if (typeof document === "undefined") return resolve();
      const script = document.createElement("script");
      script.src = src;
      script.async = true;
      script.crossOrigin = "anonymous";
      script.onload = () => {
        script.dataset.loaded = "true";
        resolve();
      };
      script.onerror = (e) => reject(new Error(`Falha ao carregar biblioteca: ${src}`));
      document.head.appendChild(script);
    });
    loadedScripts.set(src, promise);
    return promise;
  }
  var ERROR_CATALOG = {
    FILE_TOO_LARGE: "Arquivo excede o limite m\xE1ximo permitido de 1,5 GB.",
    EMPTY_FILE: "Arquivo vazio (0 bytes).",
    PARSER_NOT_FOUND: "Formato n\xE3o suportado ou parser indispon\xEDvel.",
    PARSING_FAILED: "Erro de convers\xE3o: falha na extra\xE7\xE3o de dados do documento.",
    CORRUPTED_ARCHIVE: "Pacote compactado corrompido ou protegido por senha.",
    TIMEOUT: "Tempo de processamento excedido.",
    UNKNOWN: "Erro de convers\xE3o inesperado."
  };
  function getDynamicConcurrency(queueOrLength) {
    const count = typeof queueOrLength === "number" ? queueOrLength : Array.isArray(queueOrLength) ? queueOrLength.length : 0;
    if (count > (APP_CONFIG.CONCURRENCY?.HIGH_VOLUME_THRESHOLD || 20)) {
      return APP_CONFIG.CONCURRENCY?.HIGH_VOLUME || 1e3;
    }
    return APP_CONFIG.CONCURRENCY?.DEFAULT || 4;
  }

  // js/icons.js
  var ICONS = {
    // Ações Universais
    trash: (size = 15, cls = "") => `
    <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${cls}">
      <path d="M3 6h18"/>
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/>
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
      <line x1="10" y1="11" x2="10" y2="17"/>
      <line x1="14" y1="11" x2="14" y2="17"/>
    </svg>`,
    x: (size = 14, cls = "") => `
    <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${cls}">
      <line x1="18" y1="6" x2="6" y2="18"/>
      <line x1="6" y1="6" x2="18" y2="18"/>
    </svg>`,
    refresh: (size = 15, cls = "") => `
    <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${cls}">
      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
      <path d="M3 3v5h5"/>
    </svg>`,
    download: (size = 15, cls = "") => `
    <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${cls}">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
      <polyline points="7 10 12 15 17 10"/>
      <line x1="12" y1="15" x2="12" y2="3"/>
    </svg>`,
    copy: (size = 15, cls = "") => `
    <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${cls}">
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
    </svg>`,
    link: (size = 15, cls = "") => `
    <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="${cls}">
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
    </svg>`,
    clipboard: (size = 15, cls = "") => `
    <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="${cls}">
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
      <rect x="8" y="2" width="8" height="4" rx="1" ry="1"/>
    </svg>`,
    palette: (size = 15, cls = "") => `
    <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="${cls}">
      <circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/>
      <circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/>
      <circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/>
      <circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/>
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/>
    </svg>`,
    check: (size = 14, cls = "") => `
    <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${cls}">
      <polyline points="20 6 9 17 4 12"/>
    </svg>`,
    plus: (size = 15, cls = "") => `
    <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${cls}">
      <line x1="12" y1="5" x2="12" y2="19"/>
      <line x1="5" y1="12" x2="19" y2="12"/>
    </svg>`,
    upload: (size = 20, cls = "") => `
    <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${cls}">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
      <polyline points="17 8 12 3 7 8"/>
      <line x1="12" y1="3" x2="12" y2="15"/>
    </svg>`,
    // Criptografia e Segurança
    lock: (size = 16, cls = "") => `
    <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${cls}">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
      <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
    </svg>`,
    unlock: (size = 16, cls = "") => `
    <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${cls}">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
      <path d="M7 11V7a5 5 0 0 1 9.9-1"/>
    </svg>`,
    eye: (size = 16, cls = "") => `
    <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${cls}">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>`,
    shield: (size = 14, cls = "") => `
    <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${cls}">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>`,
    // Arquivos e Conteúdo
    fileText: (size = 20, cls = "") => `
    <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${cls}">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
      <polyline points="14 2 14 8 20 8"/>
      <line x1="16" y1="13" x2="8" y2="13"/>
      <line x1="16" y1="17" x2="8" y2="17"/>
    </svg>`,
    filePdf: (size = 20, cls = "") => `
    <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${cls}">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
      <polyline points="14 2 14 8 20 8"/>
      <line x1="9" y1="13" x2="15" y2="13"/>
      <line x1="9" y1="17" x2="13" y2="17"/>
    </svg>`,
    image: (size = 20, cls = "") => `
    <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${cls}">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
      <circle cx="8.5" cy="8.5" r="1.5"/>
      <polyline points="21 15 16 10 5 21"/>
    </svg>`,
    // Ícones Lineares de Presets & Modos
    penTool: (size = 14, cls = "") => `
    <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="${cls}">
      <path d="m12 19 7-7 3 3-7 7-3-3z"/>
      <path d="m18 13-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/>
      <path d="m2 2 7.586 7.586"/>
      <circle cx="11" cy="11" r="2"/>
    </svg>`,
    sparkles: (size = 14, cls = "") => `
    <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="${cls}">
      <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z"/>
    </svg>`,
    spline: (size = 14, cls = "") => `
    <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="${cls}">
      <circle cx="19" cy="5" r="2"/>
      <circle cx="5" cy="19" r="2"/>
      <path d="M5 17A12 12 0 0 1 17 5"/>
    </svg>`,
    layers: (size = 14, cls = "") => `
    <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="${cls}">
      <path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.9a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"/>
      <path d="m22 12.5-9.4 4.3a2 2 0 0 1-1.2 0L2 12.5"/>
      <path d="m22 17.5-9.4 4.3a2 2 0 0 1-1.2 0L2 17.5"/>
    </svg>`,
    contrast: (size = 14, cls = "") => `
    <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="${cls}">
      <circle cx="12" cy="12" r="10"/>
      <path d="M12 18a6 6 0 0 0 0-12v12z"/>
    </svg>`,
    zap: (size = 14, cls = "") => `
    <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="${cls}">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
    </svg>`,
    scale: (size = 14, cls = "") => `
    <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="${cls}">
      <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/>
      <path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/>
      <path d="M7 21h10"/>
      <path d="M12 3v18"/>
      <path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/>
    </svg>`,
    diamond: (size = 14, cls = "") => `
    <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="${cls}">
      <path d="M6 3h12l4 6-10 12L2 9Z"/>
      <path d="M11 3 8 9l4 12 4-12-3-6"/>
      <path d="M2 9h20"/>
    </svg>`,
    // Ferramentas Navbar & Hub (100% Linear)
    toolHub: (size = 18, cls = "") => `
    <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="${cls}">
      <rect x="3" y="3" width="7" height="7" rx="1"/>
      <rect x="14" y="3" width="7" height="7" rx="1"/>
      <rect x="14" y="14" width="7" height="7" rx="1"/>
      <rect x="3" y="14" width="7" height="7" rx="1"/>
    </svg>`,
    toolDoc2md: (size = 18, cls = "") => `
    <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="${cls}">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
      <polyline points="14 2 14 8 20 8"/>
      <line x1="16" y1="13" x2="8" y2="13"/>
      <line x1="16" y1="17" x2="8" y2="17"/>
    </svg>`,
    toolQrcode: (size = 18, cls = "") => `
    <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="${cls}">
      <rect x="3" y="3" width="7" height="7" rx="1"/>
      <rect x="14" y="3" width="7" height="7" rx="1"/>
      <rect x="3" y="14" width="7" height="7" rx="1"/>
      <line x1="14" y1="14" x2="14" y2="14.01"/>
      <line x1="17" y1="14" x2="20" y2="14"/>
      <line x1="14" y1="17" x2="14" y2="20"/>
      <line x1="20" y1="17" x2="20" y2="20"/>
      <line x1="17" y1="20" x2="20" y2="20"/>
    </svg>`,
    toolVector: (size = 18, cls = "") => `
    <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="${cls}">
      <polygon points="12 2 2 7 12 12 22 7 12 2"/>
      <polyline points="2 17 12 22 22 17"/>
      <polyline points="2 12 12 17 22 12"/>
    </svg>`,
    toolUnlock: (size = 18, cls = "") => `
    <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="${cls}">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
      <path d="M7 11V7a5 5 0 0 1 9.9-1"/>
    </svg>`,
    toolCompress: (size = 18, cls = "") => `
    <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="${cls}">
      <path d="M8.5 3h7A1.5 1.5 0 0 1 17 4.5 C 17 8.5, 15.5 10.5, 15.5 12 C 15.5 13.5, 17 15.5, 17 19.5 A 1.5 1.5 0 0 1 15.5 21 h-7 A 1.5 1.5 0 0 1 7 19.5 C 7 15.5, 8.5 13.5, 8.5 12 C 8.5 10.5, 7 8.5, 7 4.5 A 1.5 1.5 0 0 1 8.5 3z"/>
      <line x1="10" y1="9.5" x2="14" y2="9.5"/>
      <line x1="10" y1="14" x2="12.5" y2="14"/>
      <path d="M3.5 5.5 C 5.5 9, 5.5 15, 3.5 18.5" class="icon-accent"/>
      <path d="M20.5 5.5 C 18.5 9, 18.5 15, 20.5 18.5" class="icon-accent"/>
    </svg>`,
    toolMerge: (size = 18, cls = "") => `
    <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="${cls}">
      <path d="M8 8V3.5A1.5 1.5 0 0 1 9.5 2h11A1.5 1.5 0 0 1 22 3.5v11a1.5 1.5 0 0 1-1.5 1.5H16"/>
      <path d="M16 16v4.5A1.5 1.5 0 0 1 14.5 22h-11A1.5 1.5 0 0 1 2 20.5v-11A1.5 1.5 0 0 1 3.5 8H8"/>
      <rect x="8" y="8" width="8" height="8" rx="2" class="icon-accent"/>
    </svg>`,
    toolSplit: (size = 18, cls = "") => `
    <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="${cls}">
      <circle cx="6" cy="6" r="3"/>
      <circle cx="6" cy="18" r="3"/>
      <line x1="20" y1="4" x2="8.12" y2="15.88"/>
      <line x1="14.47" y1="14.48" x2="20" y2="20"/>
      <line x1="8.12" y1="8.12" x2="12" y2="12"/>
    </svg>`,
    arrowRight: (size = 16, cls = "") => `
    <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${cls}">
      <line x1="5" y1="12" x2="19" y2="12"/>
      <polyline points="12 5 19 12 12 19"/>
    </svg>`,
    sun: (size = 18, cls = "") => `
    <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="${cls}">
      <circle cx="12" cy="12" r="4"/>
      <path d="M12 2v2"/>
      <path d="M12 20v2"/>
      <path d="m4.93 4.93 1.41 1.41"/>
      <path d="m17.66 17.66 1.41 1.41"/>
      <path d="M2 12h2"/>
      <path d="M20 12h2"/>
      <path d="m6.34 17.66-1.41 1.41"/>
      <path d="m19.07 4.93-1.41 1.41"/>
    </svg>`,
    moon: (size = 18, cls = "") => `
    <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="${cls}">
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
    </svg>`
  };

  // js/tools/doc2md/ui.js
  function getDoc2mdHTML() {
    return `
    <div class="doc2md-tool-root">

      <!-- Se\xE7\xE3o de Apresenta\xE7\xE3o & Dropzone -->
      <section class="hero-section">
        <!-- Cabe\xE7alho Principal -->
        <header class="hero-header">
          <h2 class="hero-title">Conversor Universal &amp; Mesclador de Documentos para Markdown</h2>
          <p class="hero-subtitle">
            Converta, descompacte e unifique documentos, planilhas, apresenta\xE7\xF5es, PDFs e pacotes (.zip/.rar) diretamente no navegador. 100% privado, local e sem depend\xEAncia de servidores.
          </p>
        </header>

        <!-- \xC1rea da Dropzone -->
        <div class="dropzone-container">
          <label for="file-input" class="dropzone" id="dropzone" tabindex="0">
            <div class="dropzone-icon dropzone-icon-wrap" aria-hidden="true">
              ${ICONS.upload(28, "upload-icon-svg")}
            </div>

            <p class="dropzone-main-text dropzone-prompt">
              Arraste e solte seus arquivos ou pacotes (.zip, .rar) aqui, ou clique no bot\xE3o abaixo
            </p>

            <button type="button" id="btn-browse" class="btn btn-primary btn-browse">
              ${ICONS.upload(16)}
              Selecionar Arquivo do Computador
            </button>

            <p class="dropzone-subtext dropzone-subprompt">
              Suporta upload em lote, descompacta\xE7\xE3o autom\xE1tica e colagem de arquivos/texto (Ctrl+V)
            </p>

            <div class="format-badges-list format-tags">
              <span class="format-badge format-tag">.docx</span>
              <span class="format-badge format-tag">.xlsx</span>
              <span class="format-badge format-tag">.csv</span>
              <span class="format-badge format-tag">.ods</span>
              <span class="format-badge format-tag">.pptx</span>
              <span class="format-badge format-tag">.pdf</span>
              <span class="format-badge format-tag">.txt</span>
              <span class="format-badge format-tag">.json</span>
              <span class="format-badge format-tag">.yml</span>
              <span class="format-badge format-tag">.yaml</span>
              <span class="format-badge format-tag">.html</span>
              <span class="format-badge format-tag">.rtf</span>
              <span class="format-badge format-tag">.js</span>
              <span class="format-badge format-tag">.py</span>
              <span class="format-badge format-tag">.m</span>
              <span class="format-badge format-tag">.lua</span>
              <span class="format-badge format-tag">.cpp</span>
              <span class="format-badge format-tag">.rs</span>
              <span class="format-badge format-tag">.sh</span>
              <span class="format-badge format-tag">.zip</span>
              <span class="format-badge format-tag">.rar</span>
              <span class="format-badge format-tag highlight">+algumas linguagens de c\xF3digo</span>
            </div>

            <div class="limit-indicator limit-badge" title="Tamanho m\xE1ximo suportado por documento">
              <span class="icon-info">\u24D8</span>
              <span>Limite m\xE1ximo: <strong>1,5 GB</strong> por arquivo ou pacote compactado</span>
            </div>

            <input type="file" id="file-input" class="visually-hidden" multiple style="position: absolute; left: -9999px; opacity: 0;" aria-label="Selecionar arquivos" />
          </label>
        </div>

        <!-- Telemetria e Diagn\xF3stico Visual T\xE9cnico (oculto por padr\xE3o) -->
        <div id="debug-status" class="debug-status" aria-live="polite" style="display: none;"></div>
      </section>

      <!-- Fila de Documentos & Progresso em Lote (File Queue Section) -->
      <section id="file-queue-section" class="file-queue-section" style="display: none;" aria-label="Fila de arquivos para convers\xE3o">
        <div class="file-queue-card">
          <div class="file-queue-header queue-header">
            <!-- LINHA 1: BARRA SUPERIOR FIXA E IMUT\xC1VEL -->
            <div class="queue-header-main">
              <div class="file-queue-title-wrap queue-header-title">
                <div class="file-queue-icon icon-queue" aria-hidden="true">
                  ${ICONS.fileText(18)}
                </div>
                <h3 class="file-queue-title">
                  Fila de Documentos
                  <span class="file-queue-counter badge-count" id="queue-counter">0 arquivos</span>
                </h3>
              </div>

              <div class="queue-header-actions queue-header-controls">
                <label class="toggle-switch" for="toggle-merge-markdown" title="Compilar todos os arquivos convertidos em um \xFAnico documento Markdown consolidado">
                  <input type="checkbox" id="toggle-merge-markdown">
                  <span class="toggle-slider"></span>
                  <span class="toggle-label">Mesclar arquivos em um \xFAnico .md</span>
                </label>

                <div class="queue-buttons-group queue-static-buttons">
                  <button type="button" id="btn-queue-download-all" class="btn btn-secondary btn-sm" title="Baixar todos os documentos convertidos em arquivo .zip">
                    ${ICONS.download(14)}
                    Baixar Todos (.zip)
                  </button>
                  <button type="button" id="btn-queue-clear" class="btn btn-ghost btn-sm" title="Limpar todos os arquivos da fila">
                    ${ICONS.trash(14)}
                    Limpar Todos
                  </button>
                </div>
              </div>
            </div>

            <!-- LINHA 2: \xC1REA EXCLUSIVA PARA DOWNLOAD UNIFICADO & ORDENA\xC7\xC3O (SURGE ABAIXO) -->
            <div id="unified-action-row" class="unified-action-row unified-download-container" style="display: none;">
              <div class="merge-sort-container">
                <button type="button" id="btn-sort-files" class="btn-sort" title="Classificar arquivos por ordem alfab\xE9tica">
                  <svg class="sort-icon icon-desc" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display: none;">
                    <line x1="5" y1="4" x2="5" y2="20" />
                    <polyline points="2 17 5 20 8 17" />
                    <line x1="11" y1="5" x2="21" y2="5" />
                    <line x1="11" y1="10" x2="18" y2="10" />
                    <line x1="11" y1="15" x2="15" y2="15" />
                    <line x1="11" y1="20" x2="13" y2="20" />
                  </svg>
                  <svg class="sort-icon icon-asc" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="5" y1="20" x2="5" y2="4" />
                    <polyline points="2 7 5 4 8 7" />
                    <line x1="11" y1="5" x2="13" y2="5" />
                    <line x1="11" y1="10" x2="15" y2="10" />
                    <line x1="11" y1="15" x2="18" y2="15" />
                    <line x1="11" y1="20" x2="21" y2="20" />
                  </svg>
                  <span id="sort-files-label">Classificar A-Z</span>
                </button>
              </div>
              <button type="button" id="btn-download-unified" class="btn btn-primary btn-sm btn-unified btn-unified-pulse btn-queue-download-merged" title="Baixar todos os documentos mesclados em um \xFAnico arquivo .md">
                <span class="icon-merge">
                  ${ICONS.download(14)}
                </span>
                Baixar Markdown Unificado (.md)
              </button>

              <!-- CARD DE TELEMETRIA DE TOTAL DE BYTES DO MD -->
              <div id="queue-total-bytes-card" class="queue-total-bytes-card">
                <span class="total-bytes-icon" aria-hidden="true">
                  ${ICONS.fileText(16)}
                </span>
                <span class="total-bytes-label">Tamanho do MD:</span>
                <span class="total-bytes-values">
                  <strong id="live-total-bytes-counter" class="live-total-bytes-counter">0</strong>
                  <span id="live-total-formatted-unit" class="live-total-formatted-unit">kB</span>
                </span>
              </div>
            </div>

            <!-- BARRA DE PROGRESSO DE CONSOLIDA\xC7\xC3O & EXPORTA\xC7\xC3O ASS\xCDNCRONA -->
            <div id="consolidation-progress" class="consolidation-progress-bar" style="display: none;">
              <div class="consolidation-header">
                <span class="consolidation-label">
                  <span class="consolidation-spinner-icon" id="consolidation-spinner-icon" aria-hidden="true">
                    <svg viewBox="0 0 100 100" class="radial-spinner-svg">
                      <line x1="50" y1="14" x2="50" y2="28" stroke-width="8" stroke-linecap="round" class="ray ray-1" />
                      <line x1="68" y1="18.8" x2="61" y2="30.9" stroke-width="8" stroke-linecap="round" class="ray ray-2" />
                      <line x1="81.2" y1="32" x2="69.1" y2="39" stroke-width="8" stroke-linecap="round" class="ray ray-3" />
                      <line x1="86" y1="50" x2="72" y2="50" stroke-width="8" stroke-linecap="round" class="ray ray-4" />
                      <line x1="81.2" y1="68" x2="69.1" y2="61" stroke-width="8" stroke-linecap="round" class="ray ray-5" />
                      <line x1="68" y1="81.2" x2="61" y2="69.1" stroke-width="8" stroke-linecap="round" class="ray ray-6" />
                      <line x1="50" y1="86" x2="50" y2="72" stroke-width="8" stroke-linecap="round" class="ray ray-7" />
                      <line x1="32" y1="81.2" x2="39" y2="69.1" stroke-width="8" stroke-linecap="round" class="ray ray-8" />
                      <line x1="18.8" y1="68" x2="30.9" y2="61" stroke-width="8" stroke-linecap="round" class="ray ray-9" />
                      <line x1="14" y1="50" x2="28" y2="50" stroke-width="8" stroke-linecap="round" class="ray ray-10" />
                      <line x1="18.8" y1="32" x2="30.9" y2="39" stroke-width="8" stroke-linecap="round" class="ray ray-11" />
                      <line x1="32" y1="18.8" x2="39" y2="30.9" stroke-width="8" stroke-linecap="round" class="ray ray-12" />
                    </svg>
                  </span>
                  <span id="consolidation-status-text">Consolidando:</span>
                </span>
                <strong id="consolidation-counter" class="consolidation-counter">0 / 0 (0%)</strong>
              </div>
              <div class="consolidation-track">
                <div id="consolidation-fill" class="consolidation-fill" style="width: 0%;"></div>
              </div>
            </div>
          </div>

          <!-- BARRA DE CARREGAMENTO / PROGRESSO GLOBAL PARA LOTES (> 10 ARQUIVOS) -->
          <div id="batch-global-progress" class="batch-global-progress" style="display: none;">
            <div class="global-progress-header">
              <span class="global-progress-label">
                <span class="batch-spinner-icon" id="batch-spinner-icon" aria-hidden="true">
                  <svg viewBox="0 0 100 100" class="radial-spinner-svg">
                    <line x1="50" y1="14" x2="50" y2="28" stroke-width="8" stroke-linecap="round" class="ray ray-1" />
                    <line x1="68" y1="18.8" x2="61" y2="30.9" stroke-width="8" stroke-linecap="round" class="ray ray-2" />
                    <line x1="81.2" y1="32" x2="69.1" y2="39" stroke-width="8" stroke-linecap="round" class="ray ray-3" />
                    <line x1="86" y1="50" x2="72" y2="50" stroke-width="8" stroke-linecap="round" class="ray ray-4" />
                    <line x1="81.2" y1="68" x2="69.1" y2="61" stroke-width="8" stroke-linecap="round" class="ray ray-5" />
                    <line x1="68" y1="81.2" x2="61" y2="69.1" stroke-width="8" stroke-linecap="round" class="ray ray-6" />
                    <line x1="50" y1="86" x2="50" y2="72" stroke-width="8" stroke-linecap="round" class="ray ray-7" />
                    <line x1="32" y1="81.2" x2="39" y2="69.1" stroke-width="8" stroke-linecap="round" class="ray ray-8" />
                    <line x1="18.8" y1="68" x2="30.9" y2="61" stroke-width="8" stroke-linecap="round" class="ray ray-9" />
                    <line x1="14" y1="50" x2="28" y2="50" stroke-width="8" stroke-linecap="round" class="ray ray-10" />
                    <line x1="18.8" y1="32" x2="30.9" y2="39" stroke-width="8" stroke-linecap="round" class="ray ray-11" />
                    <line x1="32" y1="18.8" x2="39" y2="30.9" stroke-width="8" stroke-linecap="round" class="ray ray-12" />
                  </svg>
                  <svg viewBox="0 0 24 24" class="batch-success-check-svg" style="display: none;" width="18" height="18" fill="none" stroke="#10B981" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </span>
                Progresso do Lote
              </span>
              <span id="global-progress-counter" class="global-progress-counter">0 / 0 conclu\xEDdos (0%)</span>
            </div>
            <div class="global-progress-track">
              <div id="global-progress-fill" class="global-progress-fill" style="width: 0%;"></div>
            </div>
          </div>

          <div id="file-queue-list" class="file-queue-list" role="list">
            <!-- Itens da fila renderizados dinamicamente -->
          </div>
        </div>
      </section>

    </div>
  `;
  }

  // js/parsers/docx-parser.js
  var turndownServiceInstance = null;
  function getTurndownService() {
    if (turndownServiceInstance) return turndownServiceInstance;
    const TurndownClass = typeof window !== "undefined" && window.TurndownService || globalThis.TurndownService;
    if (!TurndownClass) {
      throw new Error("TurndownService n\xE3o carregado.");
    }
    const service = new TurndownClass({
      headingStyle: "atx",
      hr: "---",
      bulletListMarker: "-",
      codeBlockStyle: "fenced",
      emDelimiter: "*"
    });
    const gfmPlugin = typeof window !== "undefined" && window.turndownPluginGfm || globalThis.turndownPluginGfm;
    if (gfmPlugin) {
      service.use(gfmPlugin.gfm);
      service.use(gfmPlugin.tables);
    }
    turndownServiceInstance = service;
    return service;
  }
  async function parseDocx(file, onProgress = null) {
    if (typeof onProgress === "function") {
      onProgress(20, "Carregando Mammoth.js & Turndown...");
    }
    await Promise.all([
      loadScript(APP_CONFIG.CDN.MAMMOTH),
      loadScript(APP_CONFIG.CDN.TURNDOWN),
      loadScript(APP_CONFIG.CDN.TURNDOWN_GFM).catch(() => console.warn("GFM plugin fallback"))
    ]);
    if (typeof onProgress === "function") {
      onProgress(50, "Extraindo XML estruturado...");
    }
    const Mammoth = typeof window !== "undefined" && window.mammoth || globalThis.mammoth;
    if (!Mammoth) {
      throw new Error("N\xE3o foi poss\xEDvel inicializar Mammoth.js para documentos Word.");
    }
    const arrayBuffer = await file.arrayBuffer();
    const options = {
      styleMap: [
        "p[style-name='Heading 1'] => h1:fresh",
        "p[style-name='Heading 2'] => h2:fresh",
        "p[style-name='Heading 3'] => h3:fresh",
        "p[style-name='Heading 4'] => h4:fresh",
        "p[style-name='Title'] => h1:fresh",
        "p[style-name='Subtitle'] => p > em:fresh"
      ]
    };
    const input = {
      arrayBuffer,
      buffer: typeof Buffer !== "undefined" ? Buffer.from(arrayBuffer) : typeof Uint8Array !== "undefined" ? new Uint8Array(arrayBuffer) : arrayBuffer
    };
    const result = await Mammoth.convertToHtml(input, options);
    const rawHtml = result.value;
    if (typeof onProgress === "function") {
      onProgress(85, "Compilando Markdown sem\xE2ntico...");
    }
    if (!rawHtml || !rawHtml.trim()) {
      return `# ${file.name.replace(/\.docx$/i, "")}

*(Documento vazio ou sem conte\xFAdo textual detect\xE1vel)*
`;
    }
    const turndown = getTurndownService();
    let markdown = turndown.turndown(rawHtml);
    markdown = markdown.replace(/\n{3,}/g, "\n\n").trim();
    if (!markdown.startsWith("#")) {
      const docTitle = file.name.replace(/\.docx$/i, "");
      markdown = `# ${docTitle}

${markdown}`;
    }
    return markdown;
  }

  // js/parsers/xlsx-parser.js
  function matrixToMarkdownTable(matrix) {
    if (!matrix || matrix.length === 0) return "*(Sem dados tabularizados)*\n";
    const cleanedRows = matrix.filter((row) => Array.isArray(row) && row.some((cell) => cell !== "" && cell !== null && cell !== void 0));
    if (cleanedRows.length === 0) return "*(Planilha vazia)*\n";
    let maxCols = 0;
    cleanedRows.forEach((row) => {
      if (row.length > maxCols) maxCols = row.length;
    });
    if (maxCols === 0) return "*(Planilha vazia)*\n";
    const normalizedRows = cleanedRows.map((row) => {
      const fullRow = [];
      for (let c = 0; c < maxCols; c++) {
        let val = c < row.length && row[c] !== null && row[c] !== void 0 ? String(row[c]) : "";
        val = val.replace(/\|/g, "\\|").replace(/\r?\n/g, "<br>").trim();
        fullRow.push(val);
      }
      return fullRow;
    });
    const headerRow = normalizedRows[0];
    const headerMd = "| " + headerRow.map((cell, idx) => cell || `Coluna ${idx + 1}`).join(" | ") + " |";
    const separatorMd = "| " + new Array(maxCols).fill("---").join(" | ") + " |";
    const bodyRows = normalizedRows.slice(1).map((row) => {
      return "| " + row.join(" | ") + " |";
    });
    return [headerMd, separatorMd, ...bodyRows].join("\n") + "\n";
  }
  async function parseSpreadsheet(file, onProgress = null) {
    await loadScript(APP_CONFIG.CDN.SHEETJS);
    const XLSX = typeof window !== "undefined" && window.XLSX || globalThis.XLSX;
    if (!XLSX) {
      throw new Error("N\xE3o foi poss\xEDvel carregar o motor SheetJS.");
    }
    const arrayBuffer = await file.arrayBuffer();
    const workbook = XLSX.read(arrayBuffer, { type: "array", cellDates: true });
    const docTitle = file.name.replace(/\.[^/.]+$/, "");
    const markdownSections = [`# ${docTitle}
`];
    const sheetCount = workbook.SheetNames.length;
    for (let i = 0; i < sheetCount; i++) {
      if (typeof onProgress === "function") {
        const pct = Math.round((i + 1) / sheetCount * 100);
        onProgress(pct, `Aba ${i + 1}/${sheetCount}`);
      }
      const sheetName = workbook.SheetNames[i];
      const sheet = workbook.Sheets[sheetName];
      if (sheetCount > 1) {
        markdownSections.push(`## ${sheetName}
`);
      }
      const data = XLSX.utils.sheet_to_json(sheet, {
        header: 1,
        defval: "",
        blankrows: false
      });
      const tableMd = matrixToMarkdownTable(data);
      markdownSections.push(tableMd);
    }
    return markdownSections.join("\n\n").trim();
  }

  // js/parsers/pptx-parser.js
  async function parsePptx(file, onProgress = null) {
    await loadScript(APP_CONFIG.CDN.JSZIP);
    const JSZip = typeof window !== "undefined" && window.JSZip || globalThis.JSZip;
    if (!JSZip) {
      throw new Error("N\xE3o foi poss\xEDvel carregar a biblioteca JSZip.");
    }
    const arrayBuffer = await file.arrayBuffer();
    const zip = await JSZip.loadAsync(arrayBuffer);
    const docTitle = file.name.replace(/\.pptx$/i, "");
    const markdownSlides = [`# ${docTitle}
`];
    const slideEntries = [];
    zip.forEach((relativePath, zipEntry) => {
      const match = relativePath.match(/^ppt\/slides\/slide(\d+)\.xml$/i);
      if (match) {
        slideEntries.push({
          num: parseInt(match[1], 10),
          path: relativePath,
          entry: zipEntry
        });
      }
    });
    slideEntries.sort((a, b) => a.num - b.num);
    if (slideEntries.length === 0) {
      return `# ${docTitle}

*(Nenhum slide com conte\xFAdo detectado na apresenta\xE7\xE3o)*
`;
    }
    const DOMParserClass = typeof DOMParser !== "undefined" ? DOMParser : globalThis.DOMParser;
    if (!DOMParserClass) {
      throw new Error("DOMParser n\xE3o dispon\xEDvel no ambiente.");
    }
    const domParser = new DOMParserClass();
    const getTags = (parent, tagName) => {
      const prefixed = parent.getElementsByTagName("p:" + tagName);
      if (prefixed && prefixed.length > 0) return Array.from(prefixed);
      const alphaPrefixed = parent.getElementsByTagName("a:" + tagName);
      if (alphaPrefixed && alphaPrefixed.length > 0) return Array.from(alphaPrefixed);
      return Array.from(parent.getElementsByTagName(tagName));
    };
    for (let i = 0; i < slideEntries.length; i++) {
      if (typeof onProgress === "function") {
        const pct = Math.round((i + 1) / slideEntries.length * 100);
        onProgress(pct, `Processando slide ${i + 1}/${slideEntries.length}`);
      }
      const slideInfo = slideEntries[i];
      const slideXmlText = await slideInfo.entry.async("text");
      const xmlDoc = domParser.parseFromString(slideXmlText, "application/xml");
      let slideTitle = "";
      const paragraphs = [];
      const shapeElements = getTags(xmlDoc, "sp");
      shapeElements.forEach((shape) => {
        const phs = getTags(shape, "ph");
        const isTitleShape = phs.some((ph) => {
          const type = ph.getAttribute("type");
          return type === "title" || type === "ctrTitle";
        });
        const pNodes = getTags(shape, "p");
        pNodes.forEach((p) => {
          const pPrs = getTags(p, "pPr");
          const level = pPrs.length > 0 ? parseInt(pPrs[0].getAttribute("lvl") || "0", 10) : 0;
          const tNodes = getTags(p, "t");
          let text = "";
          tNodes.forEach((t) => {
            text += t.textContent || "";
          });
          text = text.trim();
          if (text) {
            if (isTitleShape && !slideTitle) {
              slideTitle = text;
            } else {
              paragraphs.push({ text, level });
            }
          }
        });
      });
      const slideHeader = slideTitle ? `## Slide ${slideInfo.num}: ${slideTitle}` : `## Slide ${slideInfo.num}`;
      let slideContent = `${slideHeader}

`;
      if (paragraphs.length > 0) {
        paragraphs.forEach((p) => {
          const indent = "  ".repeat(p.level);
          slideContent += `${indent}- ${p.text}
`;
        });
      } else if (!slideTitle) {
        slideContent += `*(Slide sem texto visual)*
`;
      }
      const notesPath = `ppt/notesSlides/notesSlide${slideInfo.num}.xml`;
      const notesFile = zip.file(notesPath);
      if (notesFile) {
        try {
          const notesXmlText = await notesFile.async("text");
          const notesDoc = domParser.parseFromString(notesXmlText, "application/xml");
          const noteTexts = [];
          notesDoc.querySelectorAll("t, a\\:t").forEach((t) => {
            const txt = t.textContent.trim();
            if (txt && !txt.includes("Slide ") && !/^\d+$/.test(txt)) {
              noteTexts.push(txt);
            }
          });
          if (noteTexts.length > 0) {
            slideContent += `
> **Notas do Apresentador:** ${noteTexts.join(" ")}
`;
          }
        } catch (err) {
        }
      }
      markdownSlides.push(slideContent.trim());
    }
    return markdownSlides.join("\n\n---\n\n").trim();
  }

  // js/parsers/pdf-parser.js
  async function parsePdf(file, onProgress = null) {
    await loadScript(APP_CONFIG.CDN.PDFJS);
    const pdfjsLib2 = typeof window !== "undefined" && window.pdfjsLib || globalThis.pdfjsLib;
    if (!pdfjsLib2) {
      throw new Error("N\xE3o foi poss\xEDvel carregar a biblioteca PDF.js.");
    }
    if (pdfjsLib2.GlobalWorkerOptions && !pdfjsLib2.GlobalWorkerOptions.workerSrc) {
      pdfjsLib2.GlobalWorkerOptions.workerSrc = APP_CONFIG.CDN.PDFJS_WORKER;
    }
    const arrayBuffer = await file.arrayBuffer();
    const loadingTask = pdfjsLib2.getDocument({ data: arrayBuffer });
    const pdfDoc = await loadingTask.promise;
    const docTitle = file.name.replace(/\.pdf$/i, "");
    const pagesMarkdown = [`# ${docTitle}
`];
    for (let pageNum = 1; pageNum <= pdfDoc.numPages; pageNum++) {
      if (typeof onProgress === "function") {
        const pct = Math.round(pageNum / pdfDoc.numPages * 100);
        onProgress(pct, `pg. ${pageNum}/${pdfDoc.numPages}`);
      }
      const page = await pdfDoc.getPage(pageNum);
      const textContent = await page.getTextContent();
      if (!textContent || textContent.items.length === 0) {
        if (pdfDoc.numPages > 1) {
          pagesMarkdown.push(`### P\xE1gina ${pageNum}

*(P\xE1gina sem texto selecion\xE1vel ou imagem escaneada)*
`);
        }
        continue;
      }
      let totalHeight = 0;
      let validItems = 0;
      textContent.items.forEach((item) => {
        const height = Math.abs(item.transform[0]) || item.height || 0;
        if (height > 0) {
          totalHeight += height;
          validItems++;
        }
      });
      const avgHeight = validItems > 0 ? totalHeight / validItems : 12;
      const lines = [];
      let currentLine = [];
      let lastY = null;
      let lastHeight = avgHeight;
      textContent.items.forEach((item) => {
        const text = item.str;
        if (!text && !item.hasEOL) return;
        const y = Math.round(item.transform[5]);
        const height = Math.abs(item.transform[0]) || item.height || avgHeight;
        if (lastY !== null && Math.abs(y - lastY) > 4) {
          if (currentLine.length > 0) {
            lines.push({
              text: currentLine.join(" ").replace(/\s{2,}/g, " ").trim(),
              height: lastHeight,
              y: lastY
            });
            currentLine = [];
          }
        }
        if (text.trim()) {
          currentLine.push(text);
        }
        lastY = y;
        lastHeight = height;
      });
      if (currentLine.length > 0) {
        lines.push({
          text: currentLine.join(" ").replace(/\s{2,}/g, " ").trim(),
          height: lastHeight,
          y: lastY
        });
      }
      const pageParagraphs = [];
      if (pdfDoc.numPages > 1) {
        pageParagraphs.push(`---

*P\xE1gina ${pageNum} de ${pdfDoc.numPages}*
`);
      }
      let bufferParagraph = "";
      for (let j = 0; j < lines.length; j++) {
        const line = lines[j];
        const isHeader = line.height > avgHeight * 1.35;
        if (isHeader) {
          if (bufferParagraph) {
            pageParagraphs.push(bufferParagraph.trim());
            bufferParagraph = "";
          }
          pageParagraphs.push(`### ${line.text}
`);
        } else if (line.text.startsWith("\u2022") || line.text.startsWith("- ") || line.text.startsWith("* ")) {
          if (bufferParagraph) {
            pageParagraphs.push(bufferParagraph.trim());
            bufferParagraph = "";
          }
          pageParagraphs.push(`- ${line.text.replace(/^[•\-\*]\s*/, "")}`);
        } else {
          const endsWithPunct = /[.:;?!]$/.test(line.text);
          if (bufferParagraph) {
            bufferParagraph += " " + line.text;
          } else {
            bufferParagraph = line.text;
          }
          if (endsWithPunct) {
            pageParagraphs.push(bufferParagraph.trim());
            bufferParagraph = "";
          }
        }
      }
      if (bufferParagraph) {
        pageParagraphs.push(bufferParagraph.trim());
      }
      pagesMarkdown.push(pageParagraphs.join("\n\n"));
    }
    return pagesMarkdown.join("\n\n").replace(/\n{3,}/g, "\n\n").trim();
  }

  // js/parsers/text-parser.js
  function convertHtmlToMarkdown(htmlContent, docTitle = "Documento") {
    if (typeof DOMParser !== "undefined") {
      try {
        let walk = function(node) {
          if (!node) return "";
          if (node.nodeType === 3) {
            return node.nodeValue;
          }
          if (node.nodeType !== 1) {
            return "";
          }
          const tag = node.tagName.toLowerCase();
          let inner = Array.from(node.childNodes).map(walk).join("");
          switch (tag) {
            case "h1":
              return `

# ${inner.trim()}

`;
            case "h2":
              return `

## ${inner.trim()}

`;
            case "h3":
              return `

### ${inner.trim()}

`;
            case "h4":
              return `

#### ${inner.trim()}

`;
            case "h5":
              return `

##### ${inner.trim()}

`;
            case "h6":
              return `

###### ${inner.trim()}

`;
            case "p":
              return `

${inner.trim()}

`;
            case "br":
              return "\n";
            case "hr":
              return "\n\n---\n\n";
            case "strong":
            case "b":
              return `**${inner.trim()}**`;
            case "em":
            case "i":
              return `*${inner.trim()}*`;
            case "code": {
              if (node.parentElement && node.parentElement.tagName.toLowerCase() === "pre") {
                return inner;
              }
              return `\`${inner}\``;
            }
            case "pre": {
              const codeEl = node.querySelector("code");
              const codeText = codeEl ? codeEl.textContent : inner;
              return `

\`\`\`
${codeText.trim()}
\`\`\`

`;
            }
            case "blockquote":
              return `

> ${inner.trim().replace(/\n/g, "\n> ")}

`;
            case "a": {
              const href = node.getAttribute("href") || "";
              const text = inner.trim() || href;
              return href ? `[${text}](${href})` : text;
            }
            case "img": {
              const src = node.getAttribute("src") || "";
              const alt = node.getAttribute("alt") || "imagem";
              return src ? `![${alt}](${src})` : "";
            }
            case "ul": {
              const items = Array.from(node.children).filter((child) => child.tagName.toLowerCase() === "li").map((li) => `- ${Array.from(li.childNodes).map(walk).join("").trim()}`).join("\n");
              return `

${items}

`;
            }
            case "ol": {
              let count = 1;
              const items = Array.from(node.children).filter((child) => child.tagName.toLowerCase() === "li").map((li) => `${count++}. ${Array.from(li.childNodes).map(walk).join("").trim()}`).join("\n");
              return `

${items}

`;
            }
            case "li": {
              return `- ${inner.trim()}`;
            }
            case "table": {
              const rows = Array.from(node.querySelectorAll("tr"));
              if (rows.length === 0) return "";
              let tableMd = "\n\n";
              rows.forEach((row, rIndex) => {
                const cells = Array.from(row.querySelectorAll("th, td"));
                const rowText = "| " + cells.map((c) => Array.from(c.childNodes).map(walk).join("").trim().replace(/\|/g, "\\|")).join(" | ") + " |";
                tableMd += rowText + "\n";
                if (rIndex === 0) {
                  const sep = "| " + cells.map(() => "---").join(" | ") + " |";
                  tableMd += sep + "\n";
                }
              });
              return tableMd + "\n\n";
            }
            default:
              return inner;
          }
        };
        const doc = new DOMParser().parseFromString(htmlContent, "text/html");
        doc.querySelectorAll("script, style, noscript, svg, iframe").forEach((el) => el.remove());
        const body = doc.body || doc;
        let md = walk(body);
        md = md.replace(/\n{3,}/g, "\n\n").trim();
        if (!md) {
          md = body.textContent ? body.textContent.trim() : "";
        }
        return md ? `# ${docTitle}

${md}` : `# ${docTitle}

*Documento HTML sem conte\xFAdo leg\xEDvel.*`;
      } catch (domErr) {
        console.warn("[doc2md] Fallback DOMParser falhou, aplicando extra\xE7\xE3o de texto:", domErr);
      }
    }
    const stripped = htmlContent.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "").replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, "").replace(/<h1[^>]*>(.*?)<\/h1>/gi, "\n\n# $1\n\n").replace(/<h2[^>]*>(.*?)<\/h2>/gi, "\n\n## $1\n\n").replace(/<h3[^>]*>(.*?)<\/h3>/gi, "\n\n### $1\n\n").replace(/<h[4-6][^>]*>(.*?)<\/h[4-6]>/gi, "\n\n#### $1\n\n").replace(/<p[^>]*>(.*?)<\/p>/gi, "\n\n$1\n\n").replace(/<br\s*[\/]?>/gi, "\n").replace(/<hr\s*[\/]?>/gi, "\n\n---\n\n").replace(/<strong>(.*?)<\/strong>|<b>(.*?)<\/b>/gi, "**$1$2**").replace(/<em>(.*?)<\/em>|<i>(.*?)<\/i>/gi, "*$1$2*").replace(/<a\b[^>]*href="([^"]*)"[^>]*>(.*?)<\/a>/gi, "[$2]($1)").replace(/<li[^>]*>(.*?)<\/li>/gi, "- $1\n").replace(/<[^>]+>/g, " ").replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/\s{2,}/g, " ").replace(/\n{3,}/g, "\n\n").trim();
    return `# ${docTitle}

${stripped || "*Documento HTML sem conte\xFAdo*"}`;
  }
  function parseSourceCode(input, extension, fileName = "codigo") {
    let textContent = "";
    if (typeof input === "string") {
      textContent = input;
    } else if (input instanceof ArrayBuffer) {
      textContent = new TextDecoder("utf-8").decode(input);
    } else if (input && input.buffer instanceof ArrayBuffer) {
      textContent = new TextDecoder("utf-8").decode(input);
    } else {
      textContent = String(input || "");
    }
    const cleanExt = (extension || "").toLowerCase().replace(/^\./, "");
    const language = CODE_EXTENSIONS_MAP[cleanExt] || cleanExt || "text";
    const lines = textContent.split(/\r\n|\r|\n/).length;
    const sizeInBytes = typeof Blob !== "undefined" ? new Blob([textContent]).size : Buffer.byteLength(textContent, "utf8");
    const formattedSize = (sizeInBytes / 1024).toFixed(1) + " KB";
    return `# ${fileName}

> **Linguagem:** \`${language}\` | **Linhas:** ${lines} | **Tamanho:** ${formattedSize}

\`\`\`${language}
${textContent}
\`\`\`
`;
  }
  function parseYaml(input, fileName = "documento.yaml") {
    let textContent = "";
    if (typeof input === "string") {
      textContent = input;
    } else if (input instanceof ArrayBuffer) {
      textContent = new TextDecoder("utf-8").decode(input);
    } else if (input && input.buffer instanceof ArrayBuffer) {
      textContent = new TextDecoder("utf-8").decode(input);
    } else {
      textContent = String(input || "");
    }
    const lines = textContent.split(/\r\n|\r|\n/).length;
    const sizeInBytes = typeof Blob !== "undefined" ? new Blob([textContent]).size : typeof Buffer !== "undefined" ? Buffer.byteLength(textContent, "utf8") : textContent.length;
    const formatSize = (bytes) => {
      if (bytes === 0) return "0 Bytes";
      const k = 1024;
      const sizes = ["Bytes", "KB", "MB", "GB"];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
    };
    const formattedSize = formatSize(sizeInBytes);
    return `# ${fileName}

> **Formato:** YAML | **Linhas:** ${lines} | **Tamanho:** ${formattedSize}

\`\`\`yaml
${textContent}
\`\`\`
`;
  }
  async function parseText(file, onProgress = null) {
    if (typeof onProgress === "function") {
      onProgress(50, "Lendo conte\xFAdo textual...");
    }
    const fileName = file && file.name ? file.name : "documento.txt";
    const ext = fileName.split(".").pop().toLowerCase();
    const docTitle = fileName.replace(/\.[^/.]+$/, "");
    let textContent = "";
    if (typeof file === "string") {
      textContent = file;
    } else if (file instanceof ArrayBuffer) {
      textContent = new TextDecoder("utf-8").decode(file);
    } else if (file && typeof file.text === "function") {
      try {
        textContent = await file.text();
      } catch (e) {
        if (typeof file.arrayBuffer === "function") {
          const ab = await file.arrayBuffer();
          textContent = new TextDecoder("utf-8").decode(ab);
        } else {
          throw e;
        }
      }
    } else if (file && typeof file.arrayBuffer === "function") {
      const ab = await file.arrayBuffer();
      textContent = new TextDecoder("utf-8").decode(ab);
    } else {
      textContent = String(file || "");
    }
    const cleanExt = (ext || "").replace(/^\./, "");
    if (CODE_EXTENSIONS_MAP[cleanExt] && !["json", "html", "htm", "rtf", "md", "markdown", "txt", "log", "yaml", "yml"].includes(cleanExt)) {
      return parseSourceCode(textContent, cleanExt, fileName);
    }
    switch (ext) {
      case "json": {
        try {
          const parsed = JSON.parse(textContent);
          const formatted = JSON.stringify(parsed, null, 2);
          return `# ${docTitle}

\`\`\`json
${formatted}
\`\`\`
`;
        } catch (err) {
          return `# ${docTitle}

\`\`\`json
${textContent}
\`\`\`
`;
        }
      }
      case "html":
      case "htm": {
        try {
          if (typeof window !== "undefined") {
            if (typeof window.TurndownService === "undefined" && APP_CONFIG?.CDN?.TURNDOWN) {
              await loadScript(APP_CONFIG.CDN.TURNDOWN).catch(() => {
              });
              if (APP_CONFIG?.CDN?.TURNDOWN_GFM) {
                await loadScript(APP_CONFIG.CDN.TURNDOWN_GFM).catch(() => {
                });
              }
            }
            if (typeof window.TurndownService !== "undefined") {
              const turndown = new window.TurndownService({
                headingStyle: "atx",
                hr: "---",
                bulletListMarker: "-",
                codeBlockStyle: "fenced"
              });
              if (typeof window.turndownPluginGfm !== "undefined") {
                turndown.use(window.turndownPluginGfm.gfm);
              }
              const res = turndown.turndown(textContent);
              if (res && res.trim()) {
                return `# ${docTitle}

${res.trim()}`;
              }
            }
          }
        } catch (err) {
          console.warn("[doc2md] Falha no TurndownService, executando fallback nativo:", err);
        }
        return convertHtmlToMarkdown(textContent, docTitle);
      }
      case "rtf": {
        const plain = textContent.replace(/\\par[d]?/g, "\n").replace(/\\b(?:\s+([^\\]+?)\s*\\b0|(\s+[^\\]+))/g, "**$1$2**").replace(/\\i(?:\s+([^\\]+?)\s*\\i0|(\s+[^\\]+))/g, "*$1$2*").replace(/\{\\\*?\\[^{}]+?\}|\\(?:[a-z]{1,32}(-?\d+)? ?|[\r\n\t])/gi, "").replace(/[{}]/g, "").trim();
        return `# ${docTitle}

${plain}
`;
      }
      case "md": {
        return textContent;
      }
      case "xml": {
        return `# ${docTitle}

\`\`\`xml
${textContent}
\`\`\`
`;
      }
      case "yaml":
      case "yml": {
        return parseYaml(textContent, fileName);
      }
      case "txt":
      case "log":
      default: {
        return `# ${docTitle}

${textContent}
`;
      }
    }
  }

  // js/app.js
  if (typeof window !== "undefined") {
    window.onerror = function(message, source, lineno, colno, error) {
      const debugEl = typeof document !== "undefined" ? document.getElementById("debug-status") : null;
      const sourceFile = source ? source.split("/").pop() : "script";
      const errText = `[Erro Fatal/Script]: ${message} (${sourceFile}:${lineno})`;
      if (debugEl) {
        debugEl.style.display = "block";
        debugEl.textContent = errText;
        debugEl.className = "debug-status error";
      }
      console.error("[doc2md Runtime Error]", { message, source, lineno, colno, error });
      return false;
    };
    window.onunhandledrejection = function(event) {
      const debugEl = typeof document !== "undefined" ? document.getElementById("debug-status") : null;
      const reason = event.reason ? event.reason.message || String(event.reason) : "Falha ass\xEDncrona";
      const errText = `[Erro Ass\xEDncrono/CDN]: ${reason}`;
      if (debugEl) {
        debugEl.style.display = "block";
        debugEl.textContent = errText;
        debugEl.className = "debug-status error";
      }
      console.error("[doc2md Unhandled Rejection]", event.reason);
    };
  }
  var state = {
    theme: "system",
    queue: [],
    maxConcurrency: 4,
    userIsScrolling: false,
    isMergeEnabled: false,
    sortAscending: true,
    isExtracting: false,
    isProcessing: false,
    isExporting: false,
    isExportingZip: false,
    isExportingUnified: false
  };
  var DEFAULT_ZIP_BUTTON_HTML = `
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
    <polyline points="7 10 12 15 17 10"/>
    <line x1="12" y1="15" x2="12" y2="3"/>
  </svg>
  Baixar Todos (.zip)
`.trim();
  var DEFAULT_UNIFIED_BUTTON_HTML = `
  <span class="icon-merge">
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
      <polyline points="14 2 14 8 20 8"/>
      <line x1="12" y1="18" x2="12" y2="12"/>
      <polyline points="9 15 12 18 15 15"/>
    </svg>
  </span>
  Baixar Markdown Unificado (.md)
`.trim();
  var COMPLETED_ZIP_BUTTON_HTML = `
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="inline-check-icon">
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
  <span class="btn-text-label">Conclu\xEDdo!</span>
`.trim();
  var COMPLETED_UNIFIED_BUTTON_HTML = `
  <span class="icon-merge">
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="inline-check-icon">
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
  </span>
  <span class="btn-text-label">Conclu\xEDdo!</span>
`.trim();
  function updateDynamicConcurrency(forceHighConcurrency = false) {
    if (forceHighConcurrency) {
      state.maxConcurrency = APP_CONFIG.CONCURRENCY && APP_CONFIG.CONCURRENCY.HIGH_VOLUME || 1e3;
      return state.maxConcurrency;
    }
    const hasExtractedOrigin = state.queue && state.queue.some((it) => it.archiveOrigin && it.archiveOrigin !== "(Upload Direto)");
    if (hasExtractedOrigin) {
      state.maxConcurrency = APP_CONFIG.CONCURRENCY && APP_CONFIG.CONCURRENCY.HIGH_VOLUME || 1e3;
      return state.maxConcurrency;
    }
    const totalItems = state.queue ? state.queue.length : 0;
    const pendingItems = state.queue ? state.queue.filter((it) => it.status === "queued" || it.status === "processing").length : 0;
    const count = Math.max(totalItems, pendingItems);
    state.maxConcurrency = getDynamicConcurrency(count);
    return state.maxConcurrency;
  }
  var elements = typeof document !== "undefined" ? {
    themeToggle: document.getElementById("theme-toggle"),
    themeIconSun: document.getElementById("theme-icon-sun"),
    themeIconMoon: document.getElementById("theme-icon-moon"),
    headerVersion: document.getElementById("header-version"),
    footerVersion: typeof document !== "undefined" ? document.getElementById("footer-version") || document.querySelector(".footer-version") || document.getElementById("app-version") : null,
    dropzone: document.getElementById("dropzone"),
    fileInput: document.getElementById("file-input"),
    btnBrowse: document.getElementById("btn-browse"),
    debugStatus: document.getElementById("debug-status"),
    // Elementos da Fila de Arquivos em Lote
    fileQueueSection: document.getElementById("file-queue-section"),
    fileQueueList: document.getElementById("file-queue-list"),
    queueCounter: document.getElementById("queue-counter"),
    btnQueueClear: document.getElementById("btn-queue-clear"),
    btnQueueDownloadAll: document.getElementById("btn-queue-download-all"),
    toggleMergeMarkdown: document.getElementById("toggle-merge-markdown"),
    btnSortFiles: document.getElementById("btn-sort-files"),
    sortFilesLabel: document.getElementById("sort-files-label"),
    btnQueueDownloadMerged: document.getElementById("btn-download-unified") || document.getElementById("btn-queue-download-merged"),
    btnDownloadUnified: document.getElementById("btn-download-unified") || document.getElementById("btn-queue-download-merged"),
    unifiedActionRow: document.getElementById("unified-action-row") || document.getElementById("unified-download-container"),
    unifiedDownloadContainer: document.getElementById("unified-action-row") || document.getElementById("unified-download-container"),
    batchGlobalProgress: document.getElementById("batch-global-progress"),
    globalProgressCounter: document.getElementById("global-progress-counter"),
    globalProgressFill: document.getElementById("global-progress-fill"),
    queueTotalBytesCard: document.getElementById("queue-total-bytes-card"),
    liveTotalBytesCounter: document.getElementById("live-total-bytes-counter"),
    liveTotalFormattedUnit: document.getElementById("live-total-formatted-unit"),
    consolidationProgress: document.getElementById("consolidation-progress"),
    consolidationCounter: document.getElementById("consolidation-counter"),
    consolidationFill: document.getElementById("consolidation-fill"),
    consolidationStatusText: document.getElementById("consolidation-status-text")
  } : {};
  function reinitElements() {
    const el = (id) => typeof document !== "undefined" ? document.getElementById(id) : null;
    Object.assign(elements, {
      themeToggle: el("theme-toggle"),
      themeIconSun: el("theme-icon-sun"),
      themeIconMoon: el("theme-icon-moon"),
      headerVersion: el("header-version"),
      footerVersion: el("footer-version") || document.querySelector(".footer-version"),
      dropzone: el("dropzone"),
      fileInput: el("file-input"),
      btnBrowse: el("btn-browse"),
      debugStatus: el("debug-status"),
      fileQueueSection: el("file-queue-section"),
      fileQueueList: el("file-queue-list"),
      queueCounter: el("queue-counter"),
      btnQueueClear: el("btn-queue-clear"),
      btnQueueDownloadAll: el("btn-queue-download-all"),
      toggleMergeMarkdown: el("toggle-merge-markdown"),
      btnSortFiles: el("btn-sort-files"),
      sortFilesLabel: el("sort-files-label"),
      btnQueueDownloadMerged: el("btn-download-unified") || el("btn-queue-download-merged"),
      btnDownloadUnified: el("btn-download-unified") || el("btn-queue-download-merged"),
      unifiedActionRow: el("unified-action-row") || el("unified-download-container"),
      unifiedDownloadContainer: el("unified-action-row") || el("unified-download-container"),
      batchGlobalProgress: el("batch-global-progress"),
      globalProgressCounter: el("global-progress-counter"),
      globalProgressFill: el("global-progress-fill"),
      queueTotalBytesCard: el("queue-total-bytes-card"),
      liveTotalBytesCounter: el("live-total-bytes-counter"),
      liveTotalFormattedUnit: el("live-total-formatted-unit"),
      consolidationProgress: el("consolidation-progress"),
      consolidationCounter: el("consolidation-counter"),
      consolidationFill: el("consolidation-fill"),
      consolidationStatusText: el("consolidation-status-text")
    });
  }
  function initVersion() {
    if (elements.headerVersion) elements.headerVersion.textContent = APP_CONFIG.VERSION;
    if (elements.footerVersion) elements.footerVersion.textContent = APP_CONFIG.VERSION;
    if (typeof document !== "undefined" && document.querySelectorAll) {
      const versionElements = document.querySelectorAll(".footer-version, #footer-version, #app-version, .header-version, #header-version");
      versionElements.forEach((el) => {
        el.textContent = APP_CONFIG.VERSION;
      });
    }
  }
  function getSystemTheme() {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  function applyTheme(theme) {
    state.theme = theme;
    const effectiveTheme = theme === "system" ? getSystemTheme() : theme;
    document.documentElement.setAttribute("data-theme", effectiveTheme);
    localStorage.setItem(APP_CONFIG.STORAGE_KEYS.THEME, theme);
    if (effectiveTheme === "dark") {
      elements.themeIconSun.style.display = "none";
      elements.themeIconMoon.style.display = "block";
    } else {
      elements.themeIconSun.style.display = "block";
      elements.themeIconMoon.style.display = "none";
    }
  }
  function initTheme() {
    const savedTheme = localStorage.getItem(APP_CONFIG.STORAGE_KEYS.THEME) || "system";
    applyTheme(savedTheme);
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
      if (state.theme === "system") {
        applyTheme("system");
      }
    });
    elements.themeToggle.addEventListener("click", () => {
      const currentEffective = document.documentElement.getAttribute("data-theme") || "light";
      const nextTheme = currentEffective === "dark" ? "light" : "dark";
      applyTheme(nextTheme);
    });
  }
  function formatBytes(bytes) {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
  }
  function formatElapsedTime(ms) {
    if (ms == null || isNaN(ms) || ms < 0) return "0ms";
    if (ms < 1e3) {
      return `${Math.round(ms)}ms`;
    }
    if (ms < 6e4) {
      const sec = (ms / 1e3).toFixed(1);
      return sec.endsWith(".0") ? `${Math.floor(ms / 1e3)}s` : `${sec}s`;
    }
    const hours = Math.floor(ms / 36e5);
    const remMinutes = ms % 36e5;
    const minutes = Math.floor(remMinutes / 6e4);
    const seconds = Math.floor(remMinutes % 6e4 / 1e3);
    if (hours > 0) {
      const parts2 = [`${hours}h`];
      if (minutes > 0) parts2.push(`${minutes}min`);
      if (seconds > 0) parts2.push(`${seconds}s`);
      return parts2.join(" ");
    }
    const parts = [`${minutes}min`];
    if (seconds > 0) parts.push(`${seconds}s`);
    return parts.join(" ");
  }
  function getFileExtension(filename) {
    if (!filename || !filename.includes(".")) return "";
    return filename.slice((filename.lastIndexOf(".") - 1 >>> 0) + 2).toLowerCase().trim();
  }
  function getFormatCategory(fileName) {
    const cleanExt = getFileExtension(fileName);
    const ext = cleanExt ? `.${cleanExt}` : "";
    if (cleanExt && SUPPORTED_EXTENSIONS && SUPPORTED_EXTENSIONS[cleanExt]) {
      const item = SUPPORTED_EXTENSIONS[cleanExt];
      return {
        key: item.category,
        ext,
        name: item.label || `Arquivo (${ext})`,
        category: item.category,
        parser: item.parser,
        lang: item.lang
      };
    }
    for (const [key, format] of Object.entries(APP_CONFIG.SUPPORTED_FORMATS)) {
      if (format.ext.includes(ext)) {
        return { key, ...format, ext };
      }
    }
    if (cleanExt && CODE_EXTENSIONS_MAP[cleanExt]) {
      return {
        key: "code",
        ext,
        name: `C\xF3digo (${CODE_EXTENSIONS_MAP[cleanExt]})`,
        category: "code",
        parser: "code"
      };
    }
    return {
      key: "text",
      ext,
      name: `Arquivo (${ext || "texto"})`,
      category: "text",
      parser: "text"
    };
  }
  function updateDebugStatus(message, isError = false) {
    if (!elements.debugStatus) return;
    if (isError) {
      elements.debugStatus.style.display = "block";
      elements.debugStatus.textContent = message;
      elements.debugStatus.className = "debug-status error";
    } else {
      elements.debugStatus.style.display = "none";
      elements.debugStatus.textContent = "";
      elements.debugStatus.className = "debug-status";
    }
  }
  function renderFileBadgeIcon(extension) {
    const cleanExt = (extension || "").replace(/^\./, "").toUpperCase() || "DOC";
    return `
    <div class="file-badge-icon file-icon queue-item-icon" aria-hidden="true" title=".${cleanExt}">
      <svg viewBox="-2 -2 44 52" class="file-sheet-svg" fill="none" stroke="currentColor">
        <!-- Contorno da folha com dobra superior -->
        <path d="M6 4a2 2 0 0 1 2-2h18l10 10v32a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V4z" stroke-width="2.5" stroke-linejoin="round"/>
        <path d="M26 2v10h10" stroke-width="2.5" stroke-linejoin="round"/>
      </svg>
      <!-- Etiqueta sobreposta com a extens\xE3o -->
      <span class="file-extension-tag">${cleanExt}</span>
    </div>
  `;
  }
  function renderUploadStepIcon() {
    return `
    <span class="step-icon step-icon-upload" aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <!-- Bandeja / Base de apoio -->
        <path d="M4 16v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
        <!-- Seta com haste m\xF3vel -->
        <g class="arrow-up-group">
          <polyline points="16 8 12 4 8 8" />
          <line x1="12" y1="4" x2="12" y2="16" />
        </g>
      </svg>
    </span>
  `.trim();
  }
  function renderConvertStepIcon() {
    return `
    <span class="step-icon step-icon-convert" aria-hidden="true">
      <svg viewBox="0 0 32 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <!-- Folha de origem (esquerda) -->
        <path d="M4 3h7l4 4v14H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z" />
        <!-- Folha de destino (direita) -->
        <path d="M17 3h7l4 4v14h-11" />
        <!-- Seta de transi\xE7\xE3o central -->
        <g class="arrow-convert-group">
          <line x1="10" y1="12" x2="20" y2="12" />
          <polyline points="17 9 20 12 17 15" />
        </g>
      </svg>
    </span>
  `.trim();
  }
  function getOutputFileName(fileName) {
    if (!fileName) return "documento.md";
    const base = fileName.replace(/\.[^/.]+$/, "");
    return `${base}.md`;
  }
  function downloadMarkdownFile(baseName, content) {
    const fileName = baseName.endsWith(".md") ? baseName : `${baseName}.md`;
    const blob = new Blob([content], { type: "text/markdown;charset=utf-8" });
    if (typeof URL !== "undefined" && typeof URL.createObjectURL === "function" && typeof document !== "undefined" && document.createElement) {
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName;
      if (document.body && document.body.appendChild) {
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      } else {
        a.click();
      }
      if (typeof URL.revokeObjectURL === "function") {
        setTimeout(() => {
          try {
            URL.revokeObjectURL(url);
          } catch (_) {
          }
        }, 5e3);
      }
    }
    return { fileName, blob, content };
  }
  var triggerDownload = downloadMarkdownFile;
  function getFormattedTimestamp(date = /* @__PURE__ */ new Date()) {
    const now = date instanceof Date && !isNaN(date) ? date : /* @__PURE__ */ new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    return `${year}-${month}-${day}_${hours}h${minutes}min`;
  }
  function readFileWithProgress(file, onProgress) {
    return new Promise((resolve, reject) => {
      if (typeof window === "undefined" || typeof FileReader === "undefined" && typeof file.arrayBuffer === "function") {
        if (typeof file.arrayBuffer === "function") {
          file.arrayBuffer().then((buf) => {
            onProgress(100);
            resolve(buf);
          }).catch(reject);
          return;
        }
      }
      const reader = new FileReader();
      let currentPercent = 0;
      let targetPercent = 0;
      let isComplete = false;
      let bufferResult = null;
      let animId = null;
      const tickUI = () => {
        if (currentPercent < targetPercent) {
          const delta = targetPercent - currentPercent;
          const inc = Math.max(1, Math.ceil(delta * 0.22));
          currentPercent = Math.min(targetPercent, currentPercent + inc);
          onProgress(currentPercent);
        }
        if (isComplete && currentPercent >= 100) {
          onProgress(100);
          resolve(bufferResult);
          return;
        }
        if (typeof requestAnimationFrame !== "undefined") {
          animId = requestAnimationFrame(tickUI);
        } else {
          animId = setTimeout(tickUI, 16);
        }
      };
      if (typeof requestAnimationFrame !== "undefined") {
        animId = requestAnimationFrame(tickUI);
      } else {
        animId = setTimeout(tickUI, 16);
      }
      reader.onprogress = (event) => {
        if (event.lengthComputable && event.total > 0) {
          const raw = Math.min(99, Math.round(event.loaded / event.total * 100));
          targetPercent = Math.max(targetPercent, raw);
        } else {
          targetPercent = Math.min(90, targetPercent + 10);
        }
      };
      reader.onload = () => {
        bufferResult = reader.result;
        targetPercent = 100;
        isComplete = true;
      };
      reader.onerror = () => {
        if (animId) {
          if (typeof cancelAnimationFrame !== "undefined") cancelAnimationFrame(animId);
          else clearTimeout(animId);
        }
        reject(new Error(`Falha ao ler o arquivo "${file.name}"`));
      };
      reader.readAsArrayBuffer(file);
    });
  }
  function isArchiveExtension(ext) {
    if (!ext) return false;
    const clean = ext.toLowerCase().startsWith(".") ? ext.toLowerCase() : `.${ext.toLowerCase()}`;
    return APP_CONFIG.ARCHIVE_EXTENSIONS && APP_CONFIG.ARCHIVE_EXTENSIONS.includes(clean);
  }
  function isSupportedDocumentExtension(ext) {
    if (!ext) return false;
    const raw = ext.toLowerCase().replace(/^\./, "");
    const dotted = `.${raw}`;
    if (SUPPORTED_EXTENSIONS && SUPPORTED_EXTENSIONS[raw]) return true;
    for (const format of Object.values(APP_CONFIG.SUPPORTED_FORMATS)) {
      if (format.ext.includes(dotted)) return true;
    }
    if (CODE_EXTENSIONS_MAP && CODE_EXTENSIONS_MAP[raw]) return true;
    return false;
  }
  function getMimeTypeForExt(ext) {
    const raw = (ext || "").toLowerCase().replace(/^\./, "");
    const dotted = `.${raw}`;
    if (MIME_TYPE_MAP) {
      for (const [mime, targetExt] of Object.entries(MIME_TYPE_MAP)) {
        if (targetExt === raw) return mime;
      }
    }
    for (const format of Object.values(APP_CONFIG.SUPPORTED_FORMATS)) {
      if (format.ext.includes(dotted) && format.mime && format.mime[0]) {
        return format.mime[0];
      }
    }
    return "text/plain";
  }
  async function extractArchiveFiles(file) {
    const ext = "." + file.name.split(".").pop().toLowerCase();
    if (file.size > APP_CONFIG.MAX_FILE_SIZE_BYTES) {
      throw new Error("Arquivo compactado excede o limite m\xE1ximo permitido de 1,5 GB.");
    }
    if (ext === ".zip") {
      return await extractZipArchive(file);
    } else {
      return await extractRarOrOtherArchive(file, ext);
    }
  }
  async function extractZipArchive(file) {
    state.isExtracting = true;
    try {
      let JSZipClass = typeof window !== "undefined" && window.JSZip || globalThis.JSZip;
      if (!JSZipClass && typeof window !== "undefined") {
        await loadScript(APP_CONFIG.CDN.JSZIP);
        JSZipClass = window.JSZip || globalThis.JSZip;
      }
      if (!JSZipClass && typeof process !== "undefined") {
        try {
          const jszipMod = await Promise.resolve().then(() => __toESM(require_jszip_min(), 1));
          JSZipClass = jszipMod.default || jszipMod;
        } catch (_) {
        }
      }
      if (!JSZipClass) {
        throw new Error("Biblioteca JSZip indispon\xEDvel para descompacta\xE7\xE3o.");
      }
      let buffer;
      if (typeof file.arrayBuffer === "function") {
        buffer = await file.arrayBuffer();
      } else if (file instanceof ArrayBuffer) {
        buffer = file;
      } else if (typeof Buffer !== "undefined" && Buffer.isBuffer(file)) {
        buffer = file.buffer.slice(file.byteOffset, file.byteOffset + file.byteLength);
      } else {
        buffer = await new Promise((resolve, reject) => {
          if (typeof FileReader === "undefined") {
            return reject(new Error("FileReader indispon\xEDvel e file.arrayBuffer ausente."));
          }
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result);
          reader.onerror = () => reject(new Error("Falha ao ler dados bin\xE1rios do pacote ZIP"));
          reader.readAsArrayBuffer(file);
        });
      }
      const zip = await JSZipClass.loadAsync(buffer);
      const entriesToExtract = [];
      zip.forEach((relativePath, entry) => {
        if (entry.dir) return;
        if (relativePath.includes("__MACOSX") || relativePath.includes(".DS_Store") || relativePath.includes("Thumbs.db") || relativePath.startsWith(".") || relativePath.includes("/.")) {
          return;
        }
        const fileName = relativePath.split("/").pop();
        if (!fileName || fileName.startsWith(".")) return;
        const entryExt = "." + fileName.split(".").pop().toLowerCase();
        if (!isSupportedDocumentExtension(entryExt)) {
          return;
        }
        entriesToExtract.push({ fileName, relativePath, entry, entryExt });
      });
      if (entriesToExtract.length === 0) {
        throw new Error("Nenhum documento compat\xEDvel encontrado dentro do pacote ZIP.");
      }
      const extractedFiles = [];
      for (const item of entriesToExtract) {
        const fileBuffer = await item.entry.async("arraybuffer");
        const mimeType = getMimeTypeForExt(item.entryExt);
        const folderPath = item.relativePath.includes("/") ? item.relativePath.substring(0, item.relativePath.lastIndexOf("/")) : "Raiz do Pacote";
        const nativeFile = typeof File !== "undefined" ? new File([fileBuffer], item.fileName, {
          type: mimeType,
          lastModified: item.entry.date ? item.entry.date.getTime() : Date.now()
        }) : {
          name: item.fileName,
          size: fileBuffer.byteLength,
          type: mimeType,
          lastModified: item.entry.date ? item.entry.date.getTime() : Date.now(),
          arrayBuffer: async () => fileBuffer
        };
        nativeFile.archiveOrigin = file.name;
        nativeFile.relativePath = item.relativePath;
        nativeFile.folderPath = folderPath;
        extractedFiles.push(nativeFile);
      }
      return extractedFiles;
    } finally {
      state.isExtracting = false;
      state.isProcessing = false;
      updateGlobalActionButtonsState();
    }
  }
  async function extractRarOrOtherArchive(file, ext) {
    throw new Error(`Pacote ${ext.toUpperCase()} com senha ou formato n\xE3o descompact\xE1vel em mem\xF3ria.`);
  }
  async function addFilesToQueue(files) {
    if (!files || files.length === 0) return;
    state.isProcessing = true;
    const fileList = Array.from(files);
    const queueCandidates = [];
    let isArchiveExtraction = false;
    try {
      for (const file of fileList) {
        const cleanExt = getFileExtension(file.name);
        const ext = cleanExt ? `.${cleanExt}` : "";
        if (isArchiveExtension(ext)) {
          if (file.size > APP_CONFIG.MAX_FILE_SIZE_BYTES) {
            queueCandidates.push({
              file,
              isArchiveError: true,
              errorMessage: "Arquivo compactado excede o limite m\xE1ximo permitido de 1,5 GB."
            });
            continue;
          }
          updateDebugStatus(`[Descompactando]: ${file.name}...`);
          state.isExtracting = true;
          try {
            const extracted = await extractArchiveFiles(file);
            if (extracted && extracted.length > 0) {
              isArchiveExtraction = true;
              extracted.forEach((f) => queueCandidates.push({
                file: f,
                archiveOrigin: f.archiveOrigin || file.name,
                relativePath: f.relativePath || f.name,
                folderPath: f.folderPath || (f.relativePath && f.relativePath.includes("/") ? f.relativePath.substring(0, f.relativePath.lastIndexOf("/")) : "Raiz do Pacote")
              }));
            } else {
              throw new Error("Nenhum documento compat\xEDvel encontrado no pacote compactado.");
            }
          } catch (err) {
            console.error(`[doc2md] Falha na extra\xE7\xE3o de ${file.name}:`, err);
            queueCandidates.push({
              file,
              isArchiveError: true,
              errorMessage: err.message || "Falha ao descompactar pacote (arquivo corrompido ou com senha)",
              archiveOrigin: file.name,
              relativePath: file.name,
              folderPath: "Raiz do Pacote"
            });
          } finally {
            state.isExtracting = false;
            state.isProcessing = false;
            updateGlobalActionButtonsState();
          }
        } else {
          queueCandidates.push({
            file,
            archiveOrigin: file.archiveOrigin || "(Upload Direto)",
            relativePath: file.relativePath || file.name,
            folderPath: file.folderPath || "Raiz"
          });
        }
      }
    } finally {
      state.isExtracting = false;
      state.isProcessing = false;
      updateGlobalActionButtonsState();
    }
    const newItems = [];
    queueCandidates.forEach(({ file, isArchiveError, errorMessage: archiveErrMsg, archiveOrigin, relativePath, folderPath }) => {
      const cleanExt = getFileExtension(file.name);
      const ext = cleanExt ? `.${cleanExt}` : "";
      const formatInfo = getFormatCategory(file.name);
      const id = `item_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
      let status = "queued";
      let statusText = "Na fila";
      let uploadProgress = 0;
      let uploadText = "0%";
      let convertProgress = 0;
      let convertText = "Aguardando...";
      let progress = 0;
      let errorMessage = "";
      if (isArchiveError) {
        status = "error";
        statusText = "Erro de convers\xE3o";
        uploadProgress = 0;
        uploadText = "0%";
        convertProgress = 0;
        convertText = "Erro";
        progress = 0;
        errorMessage = archiveErrMsg || ERROR_CATALOG.CORRUPTED_ARCHIVE;
      } else if (file.size === 0) {
        status = "error";
        statusText = "Erro de convers\xE3o";
        uploadProgress = 0;
        uploadText = "0%";
        convertProgress = 0;
        convertText = "Erro";
        progress = 0;
        errorMessage = ERROR_CATALOG.EMPTY_FILE;
      } else if (file.size > APP_CONFIG.MAX_FILE_SIZE_BYTES) {
        status = "error";
        statusText = "Erro de convers\xE3o";
        uploadProgress = 0;
        uploadText = "0%";
        convertProgress = 0;
        convertText = "Erro";
        progress = 0;
        errorMessage = ERROR_CATALOG.FILE_TOO_LARGE;
      } else if (APP_CONFIG.UNSUPPORTED_BINARY_EXTENSIONS && APP_CONFIG.UNSUPPORTED_BINARY_EXTENSIONS.includes(ext)) {
        status = "error";
        statusText = "Erro de convers\xE3o";
        uploadProgress = 0;
        uploadText = "0%";
        convertProgress = 0;
        convertText = "Erro";
        progress = 0;
        errorMessage = `${ERROR_CATALOG.PARSER_NOT_FOUND} (Extens\xE3o "${ext}")`;
      }
      const queueItem = {
        id,
        file,
        formatInfo,
        status,
        statusText,
        uploadProgress,
        uploadText,
        convertProgress,
        convertText,
        progress,
        markdown: "",
        markdownOutput: "",
        durationMs: 0,
        mdSize: 0,
        formattedMdSize: "",
        errorMessage,
        cancelled: false,
        archiveOrigin: archiveOrigin || file.archiveOrigin || "(Upload Direto)",
        relativePath: relativePath || file.relativePath || file.name,
        folderPath: folderPath || file.folderPath || (file.relativePath && file.relativePath.includes("/") ? file.relativePath.substring(0, file.relativePath.lastIndexOf("/")) : "Raiz")
      };
      newItems.push(queueItem);
    });
    const isHighVolume = queueCandidates.length > 20 || state.queue.length + newItems.length > 20;
    if (isHighVolume) {
      newItems.sort((a, b) => {
        const sizeA = a.file ? a.file.size : a.size || 0;
        const sizeB = b.file ? b.file.size : b.size || 0;
        if (sizeA !== sizeB) return sizeB - sizeA;
        const nameA = a.file ? a.file.name : a.name || "";
        const nameB = b.file ? b.file.name : b.name || "";
        return nameA.localeCompare(nameB, void 0, { numeric: true, sensitivity: "base" });
      });
    }
    state.queue.push(...newItems);
    if (state.queue.length > 20) {
      const queuedIndices = [];
      const queuedList = [];
      state.queue.forEach((item, idx) => {
        if (item.status === "queued" && !item.cancelled) {
          queuedIndices.push(idx);
          queuedList.push(item);
        }
      });
      if (queuedList.length > 0) {
        queuedList.sort((a, b) => {
          const sizeA = a.file ? a.file.size : a.size || 0;
          const sizeB = b.file ? b.file.size : b.size || 0;
          if (sizeA !== sizeB) return sizeB - sizeA;
          const nameA = a.file ? a.file.name : a.name || "";
          const nameB = b.file ? b.file.name : b.name || "";
          return nameA.localeCompare(nameB, void 0, { numeric: true, sensitivity: "base" });
        });
        queuedIndices.forEach((pos, i) => {
          state.queue[pos] = queuedList[i];
        });
      }
    }
    state.userIsScrolling = false;
    const hasExtractedOrigin = fileList.some((f) => f.archiveOrigin && f.archiveOrigin !== "(Upload Direto)") || isArchiveExtraction;
    if (hasExtractedOrigin || queueCandidates.length > 20 || state.queue.length > 20) {
      state.maxConcurrency = APP_CONFIG.CONCURRENCY && APP_CONFIG.CONCURRENCY.HIGH_VOLUME || 1e3;
    } else {
      updateDynamicConcurrency();
    }
    renderQueue();
    updateGlobalBatchProgress();
    updateGlobalBatchButtonsState();
    dispatchNext();
  }
  var BATCH_HEADLESS_THRESHOLD = 50;
  function shouldEnableHeadlessMode(queueLength) {
    return queueLength >= BATCH_HEADLESS_THRESHOLD;
  }
  function formatMdTelemetrySize(bytes) {
    const num = Number(bytes) || 0;
    if (num <= 0) {
      return { value: "0", unit: "kB", formatted: "0 kB" };
    }
    const k = 1024;
    const m = k * k;
    const g = m * k;
    if (num < m) {
      const kb = num / k;
      const val2 = kb < 0.05 ? "< 0,1" : kb >= 100 ? Math.round(kb).toLocaleString("pt-BR") : parseFloat(kb.toFixed(1)).toLocaleString("pt-BR");
      return { value: String(val2), unit: "kB", formatted: `${val2} kB` };
    }
    if (num < g) {
      const mb = num / m;
      const val2 = mb >= 100 ? Math.round(mb).toLocaleString("pt-BR") : parseFloat(mb.toFixed(1)).toLocaleString("pt-BR");
      return { value: String(val2), unit: "MB", formatted: `${val2} MB` };
    }
    const gb = num / g;
    const val = parseFloat(gb.toFixed(1)).toLocaleString("pt-BR");
    return { value: String(val), unit: "GB", formatted: `${val} GB` };
  }
  var totalBytesAnimController = {
    currentBytes: 0,
    targetBytes: 0,
    rafId: null,
    setTarget(newTarget) {
      this.targetBytes = Math.max(0, newTarget);
      if (typeof requestAnimationFrame === "function") {
        if (!this.rafId) {
          this.rafId = requestAnimationFrame(() => this.loop());
        }
      } else {
        this.currentBytes = this.targetBytes;
        this.render(this.targetBytes);
        this.rafId = null;
      }
    },
    loop() {
      const diff = this.targetBytes - this.currentBytes;
      if (Math.abs(diff) > 1) {
        const step = diff * 0.12;
        this.currentBytes += Math.abs(step) < 1 ? Math.sign(diff) : step;
        this.render(Math.round(this.currentBytes));
        if (typeof requestAnimationFrame === "function") {
          this.rafId = requestAnimationFrame(() => this.loop());
        } else {
          this.rafId = null;
        }
      } else {
        this.currentBytes = this.targetBytes;
        this.render(this.targetBytes);
        this.rafId = null;
      }
    },
    render(bytes) {
      const counterEl = elements && elements.liveTotalBytesCounter || (typeof document !== "undefined" ? document.getElementById("live-total-bytes-counter") : null);
      const formattedEl = elements && elements.liveTotalFormattedUnit || (typeof document !== "undefined" ? document.getElementById("live-total-formatted-unit") : null);
      if (!counterEl) return;
      const { value, unit } = formatMdTelemetrySize(bytes);
      counterEl.textContent = value;
      if (formattedEl) {
        formattedEl.textContent = unit;
      }
    },
    reset() {
      if (this.rafId) {
        if (typeof cancelAnimationFrame === "function") {
          cancelAnimationFrame(this.rafId);
        }
        this.rafId = null;
      }
      this.currentBytes = 0;
      this.targetBytes = 0;
      this.render(0);
    }
  };
  function computeAndAnimateTotalMdBytes() {
    if (!state || !state.queue) {
      totalBytesAnimController.setTarget(0);
      return 0;
    }
    const totalBytes = state.queue.reduce((accum, item) => {
      let itemBytes = 0;
      if (item.markdownOutput) {
        itemBytes = typeof Blob !== "undefined" ? new Blob([item.markdownOutput], { type: "text/markdown;charset=utf-8" }).size : Buffer.byteLength(item.markdownOutput, "utf8");
      } else if (item.currentMdBytes) {
        itemBytes = item.currentMdBytes;
      } else if (item.mdSize) {
        itemBytes = item.mdSize;
      } else if (item.markdown) {
        itemBytes = typeof Blob !== "undefined" ? new Blob([item.markdown], { type: "text/markdown;charset=utf-8" }).size : Buffer.byteLength(item.markdown, "utf8");
      }
      return accum + (Number(itemBytes) || 0);
    }, 0);
    totalBytesAnimController.setTarget(totalBytes);
    return totalBytes;
  }
  function updateGlobalActionButtonsState() {
    const completedItems = state && state.queue ? state.queue.filter((i) => i.status === "completed" || Boolean(i.markdownOutput)) : [];
    const completedCount = completedItems.length;
    const isAllResolved = state && state.queue && state.queue.length > 0 && !state.queue.some((it) => (it.status === "queued" || it.status === "processing") && !it.cancelled);
    if (isAllResolved) {
      state.isProcessing = false;
      state.isExtracting = false;
    }
    const btnDownloadAll = elements && elements.btnQueueDownloadAll || (typeof document !== "undefined" ? document.getElementById("btn-queue-download-all") : null);
    const btnDownloadUnified = elements && elements.btnDownloadUnified || elements && elements.btnQueueDownloadMerged || (typeof document !== "undefined" ? document.getElementById("btn-download-unified") || document.getElementById("btn-queue-download-merged") : null);
    if (btnDownloadAll && !state.isExportingZip && !btnDownloadAll.__isShowingSuccess) {
      if (completedCount > 0) {
        if (typeof btnDownloadAll.removeAttribute === "function") btnDownloadAll.removeAttribute("disabled");
        btnDownloadAll.disabled = false;
        if (btnDownloadAll.style) btnDownloadAll.style.pointerEvents = "auto";
        if (btnDownloadAll.classList && btnDownloadAll.classList.remove) btnDownloadAll.classList.remove("is-consolidating");
        if (btnDownloadAll.innerHTML && (btnDownloadAll.innerHTML.includes("Preparando") || btnDownloadAll.innerHTML.includes("Compactando") || btnDownloadAll.innerHTML.includes("radial-spinner-svg"))) {
          btnDownloadAll.innerHTML = DEFAULT_ZIP_BUTTON_HTML;
        }
      } else {
        if (typeof btnDownloadAll.setAttribute === "function") btnDownloadAll.setAttribute("disabled", "");
        btnDownloadAll.disabled = true;
      }
    }
    if (btnDownloadUnified && !state.isExportingUnified && !btnDownloadUnified.__isShowingSuccess) {
      if (completedCount > 0) {
        if (typeof btnDownloadUnified.removeAttribute === "function") btnDownloadUnified.removeAttribute("disabled");
        btnDownloadUnified.disabled = false;
        if (btnDownloadUnified.style) btnDownloadUnified.style.pointerEvents = "auto";
        if (btnDownloadUnified.classList && btnDownloadUnified.classList.remove) btnDownloadUnified.classList.remove("is-consolidating");
        if (btnDownloadUnified.innerHTML && (btnDownloadUnified.innerHTML.includes("Consolidando") || btnDownloadUnified.innerHTML.includes("radial-spinner-svg"))) {
          btnDownloadUnified.innerHTML = DEFAULT_UNIFIED_BUTTON_HTML;
        }
      } else {
        if (typeof btnDownloadUnified.setAttribute === "function") btnDownloadUnified.setAttribute("disabled", "");
        btnDownloadUnified.disabled = true;
      }
    }
  }
  var updateGlobalBatchButtonsState = updateGlobalActionButtonsState;
  function setupQueueListDelegation(queueListElement) {
    const queueList = queueListElement || elements && elements.fileQueueList || (typeof document !== "undefined" ? document.querySelector(".file-queue-list") || document.getElementById("file-queue-list") : null);
    if (!queueList) return;
    const isAttached = queueList.dataset ? queueList.dataset.listenerAttached === "true" : Boolean(queueList.__hasDelegatedQueueEvents);
    if (isAttached) return;
    if (queueList.dataset) {
      queueList.dataset.listenerAttached = "true";
    }
    queueList.__hasDelegatedQueueEvents = true;
    if (typeof queueList.addEventListener === "function") {
      queueList.addEventListener("click", (e) => {
        const btn = e.target && typeof e.target.closest === "function" ? e.target.closest(".btn-download-item, .btn-queue-item-download, .btn-download") : null;
        if (btn) {
          if (typeof e.preventDefault === "function") e.preventDefault();
          if (typeof e.stopPropagation === "function") e.stopPropagation();
          const itemId = btn.dataset ? btn.dataset.id : btn.getAttribute ? btn.getAttribute("data-id") : null;
          const item = state && state.queue ? state.queue.find((q) => q.id === itemId) : null;
          if (item && (item.markdownOutput || item.markdown)) {
            const fileName = item.file && item.file.name || item.name || "documento.md";
            triggerDownload(getOutputFileName(fileName), item.markdownOutput || item.markdown);
          } else if (itemId) {
            downloadQueueItem(itemId);
          }
          return;
        }
        const removeBtn = e.target && typeof e.target.closest === "function" ? e.target.closest(".btn-remove-item, .btn-queue-item-remove, .btn-remove") : null;
        if (removeBtn) {
          if (typeof e.preventDefault === "function") e.preventDefault();
          if (typeof e.stopPropagation === "function") e.stopPropagation();
          const itemId = removeBtn.dataset ? removeBtn.dataset.id : removeBtn.getAttribute ? removeBtn.getAttribute("data-id") : null;
          removeQueueItem(itemId);
          return;
        }
      });
    }
  }
  function renderQueue() {
    const queueSection = elements && elements.fileQueueSection || (typeof document !== "undefined" ? document.getElementById("file-queue-section") : null);
    const queueList = elements && elements.fileQueueList || (typeof document !== "undefined" ? document.getElementById("file-queue-list") || document.querySelector(".file-queue-list") : null);
    const queueCounter = elements && elements.queueCounter || (typeof document !== "undefined" ? document.getElementById("queue-counter") : null);
    if (!queueSection || !queueList) return;
    const total = state.queue.length;
    if (total === 0) {
      queueSection.style.display = "none";
      if (queueCounter) queueCounter.textContent = "0 arquivos";
      computeAndAnimateTotalMdBytes();
      updateGlobalBatchProgress();
      updateGlobalBatchButtonsState();
      return;
    }
    queueSection.style.display = "block";
    if (queueCounter) {
      queueCounter.textContent = `${total} ${total === 1 ? "arquivo" : "arquivos"}`;
    }
    updateGlobalBatchButtonsState();
    const isHeadless = shouldEnableHeadlessMode(total);
    computeAndAnimateTotalMdBytes();
    if (isHeadless) {
      queueList.style.display = "none";
      queueList.innerHTML = "";
      updateGlobalBatchProgress();
      return;
    }
    queueList.style.display = "flex";
    queueList.innerHTML = state.queue.map((item) => {
      const fileName = item.file && item.file.name || item.name || "documento.txt";
      const ext = fileName.includes(".") ? fileName.split(".").pop() : item.formatInfo && item.formatInfo.parser || "txt";
      const formatIcon = renderFileBadgeIcon(ext);
      const statusClass = item.status;
      const badgeErrorClass = item.status === "error" ? "badge-error" : "";
      const timeText = item.durationMs ? formatElapsedTime(item.durationMs) : "";
      const isProcessing = item.status === "processing";
      const isCompleted = item.status === "completed";
      const isError = item.status === "error";
      const baseName = fileName.replace(/\.[^/.]+$/, "");
      const mdSizeInBytes = item.mdSize || (item.markdownOutput ? new Blob([item.markdownOutput], { type: "text/markdown;charset=utf-8" }).size : 0) || (item.markdown ? new Blob([item.markdown], { type: "text/markdown;charset=utf-8" }).size : 0);
      const mdSizeText = isCompleted && (item.formattedMdSize || mdSizeInBytes > 0) ? `(MD: ${item.formattedMdSize || formatBytes(mdSizeInBytes)})` : "";
      const isReading = !!item.isReading;
      const readingClass = isReading ? "is-reading" : "";
      const isUploadDone = item.uploadProgress >= 100 || isCompleted;
      const isConvertDone = item.convertProgress >= 100 || isCompleted;
      const uploadDoneClass = isUploadDone ? "upload-done" : "";
      const convertDoneClass = isConvertDone ? "convert-done" : "";
      const completedClass = isCompleted ? "completed is-completed" : "";
      const hasErrorClass = isError ? "has-error" : "";
      return `
      <div class="file-queue-item queue-item ${statusClass} ${hasErrorClass} ${completedClass} ${readingClass} ${uploadDoneClass} ${convertDoneClass}" data-id="${item.id}" role="listitem" aria-label="${item.file.name}">
        <!-- BLOCO 1: IDENTIFICA\xC7\xC3O DO ARQUIVO (\xCDcone + Nome + Peso Original) -->
        <div class="item-block item-info queue-item-info">
          ${formatIcon}
          <span class="file-name queue-item-name" title="${item.file.name}">${item.file.name}</span>
          <span class="badge-file-size queue-item-size file-meta queue-item-meta">${formatBytes(item.file.size)}</span>
        </div>

        <!-- BLOCO 2: BARRAS DE CARREGAMENTO / PROGRESSO (Ocultas se .has-error ou conclu\xEDdo) -->
        <div class="item-block item-progress queue-item-progress file-progress-group">
          <div class="mini-progress-wrapper progress-sub-step step-upload">
            <div class="mini-progress-label progress-label">
              <span class="label-with-icon">
                ${renderUploadStepIcon()}
                Upload
              </span>
              <span class="read-percent upload-percent upload-status-text">${item.uploadText || `${item.uploadProgress}%`}</span>
            </div>
            <div class="mini-progress-track progress-bar-container">
              <div class="mini-progress-fill progress-bar-fill bar-read bar-upload" style="width: ${item.uploadProgress}%;"></div>
            </div>
          </div>
          <div class="mini-progress-wrapper progress-sub-step step-conversion">
            <div class="mini-progress-label progress-label">
              <span class="label-with-icon">
                ${renderConvertStepIcon()}
                Convers\xE3o <strong class="md-output-size">${mdSizeText}</strong>
              </span>
              <span class="convert-percent convert-status-text">${item.convertText || `${item.convertProgress}%`}</span>
            </div>
            <div class="mini-progress-track progress-bar-container">
              <div class="mini-progress-fill progress-bar-fill bar-convert ${isCompleted ? "completed" : isError ? "error" : ""}" style="width: ${item.convertProgress}%;"></div>
            </div>
          </div>
        </div>

        <!-- BLOCO DE ERRO: Substitui as barras em caso de falha -->
        <div class="item-block item-error-container" style="${isError ? "display: flex;" : "display: none;"}">
          <div class="item-error-badge" title="${item.errorMessage || "Erro de convers\xE3o"}">
            <span class="icon-error-circle" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <line x1="15" y1="9" x2="9" y2="15"/>
                <line x1="9" y1="9" x2="15" y2="15"/>
              </svg>
            </span>
            <span class="error-text">Erro de convers\xE3o</span>
          </div>
        </div>

        <!-- BLOCO 3: STATUS ANIMADO & BOT\xD5ES (Tempo + Peso MD + Check + A\xE7\xF5es) -->
        <div class="item-block item-actions queue-item-actions queue-item-right">
          <!-- Tempo de convers\xE3o formatado (h min s) -->
          <span class="badge-elapsed-time queue-item-time" style="${isCompleted && timeText ? "display: inline-flex;" : "display: none;"}">${timeText}</span>
          <!-- Tamanho do Markdown \xE0 esquerda do certinho -->
          <span class="badge-md-size queue-item-md-size md-output-size" style="${isCompleted && item.formattedMdSize ? "display: inline-flex;" : "display: none;"}">${mdSizeText}</span>

          <div class="status-indicator">
            <!-- Estado Convertendo: Ampulheta girando -->
            <span class="status-icon icon-hourglass ${isProcessing ? "spinning" : ""}" title="Convertendo Markdown..." style="${isProcessing ? "display: inline-flex;" : "display: none;"}">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M5 22h14"/>
                <path d="M5 2h14"/>
                <path d="M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22"/>
                <path d="M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2"/>
              </svg>
            </span>
            <!-- Estado Conclu\xEDdo: Certinho verde -->
            <span class="status-icon icon-check ${isCompleted ? "success" : ""}" title="Conclu\xEDdo" style="${isCompleted ? "display: inline-flex;" : "display: none;"}">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                <polyline points="22 4 12 14.01 9 11.01"/>
              </svg>
            </span>
            <!-- Estado Erro -->
            <span class="status-icon icon-error" title="${item.errorMessage || item.statusText || "Erro"}" style="${isError ? "display: inline-flex;" : "display: none;"}">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <line x1="15" y1="9" x2="9" y2="15"/>
                <line x1="9" y1="9" x2="15" y2="15"/>
              </svg>
            </span>
            <!-- Estado Na Fila -->
            <span class="status-icon icon-queued" title="Na fila" style="${!isProcessing && !isCompleted && !isError ? "display: inline-flex;" : "display: none;"}">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12 6 12 12 16 14"/>
              </svg>
            </span>
          </div>

          <span class="queue-item-status ${statusClass} ${badgeErrorClass}" id="status-badge-${item.id}" style="display: none;">${item.statusText}</span>

          <button type="button" class="btn-item-action btn-download btn-queue-item-download btn-download-item" data-id="${item.id}" ${isCompleted ? "" : "disabled"} title="Baixar ${baseName}.md" aria-label="Baixar ${baseName}.md">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
          </button>
          <button type="button" class="btn-item-action btn-remove btn-queue-item-remove btn-remove-item" data-id="${item.id}" title="Remover ${item.file.name}" aria-label="Remover item">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M3 6h18"/>
              <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/>
              <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
              <line x1="10" y1="11" x2="10" y2="17"/>
              <line x1="14" y1="11" x2="14" y2="17"/>
            </svg>
          </button>
        </div>
      </div>
    `;
    }).join("");
    setupQueueListDelegation(queueList);
    updateGlobalBatchProgress();
  }
  var pendingQueueDOMUpdates = /* @__PURE__ */ new Map();
  var queueRafId = null;
  function flushQueueDOMUpdates() {
    queueRafId = null;
    const items = Array.from(pendingQueueDOMUpdates.values());
    pendingQueueDOMUpdates.clear();
    for (const item of items) {
      applyQueueItemDOMUpdate(item);
    }
  }
  function updateQueueItemDOM(item, immediate = false) {
    if (shouldEnableHeadlessMode(state && state.queue ? state.queue.length : 0)) {
      return;
    }
    if (typeof window === "undefined" || typeof requestAnimationFrame === "undefined" || immediate) {
      applyQueueItemDOMUpdate(item);
      return;
    }
    if (item.status === "completed" || item.status === "error") {
      pendingQueueDOMUpdates.delete(item.id);
      applyQueueItemDOMUpdate(item);
      return;
    }
    pendingQueueDOMUpdates.set(item.id, item);
    if (!queueRafId) {
      queueRafId = requestAnimationFrame(flushQueueDOMUpdates);
    }
  }
  function applyQueueItemDOMUpdate(item) {
    if (shouldEnableHeadlessMode(state && state.queue ? state.queue.length : 0)) {
      return;
    }
    const itemEl = elements.fileQueueList ? elements.fileQueueList.querySelector(`.queue-item[data-id="${item.id}"]`) : null;
    if (!itemEl) return;
    const isReading = !!item.isReading;
    const readingClass = isReading ? "is-reading" : "";
    const isUploadDone = item.uploadProgress >= 100 || item.status === "completed";
    const isConvertDone = item.convertProgress >= 100 || item.status === "completed";
    const uploadDoneClass = isUploadDone ? "upload-done" : "";
    const convertDoneClass = isConvertDone ? "convert-done" : "";
    const isError = item.status === "error";
    const hasErrorClass = isError ? "has-error" : "";
    itemEl.className = `file-queue-item queue-item ${item.status} ${hasErrorClass} ${item.status === "completed" ? "is-completed" : ""} ${readingClass} ${uploadDoneClass} ${convertDoneClass}`.trim();
    const errorContainer = itemEl.querySelector(".item-error-container");
    if (errorContainer) {
      errorContainer.style.display = isError ? "flex" : "none";
      const badge = errorContainer.querySelector(".item-error-badge");
      if (badge) {
        badge.setAttribute("title", item.errorMessage || "Erro de convers\xE3o");
      }
    }
    const statusBadge = itemEl.querySelector(`#status-badge-${item.id}`);
    if (statusBadge) {
      const badgeErrorClass = isError ? "badge-error" : "";
      statusBadge.className = `queue-item-status ${item.status} ${badgeErrorClass}`.trim();
      statusBadge.textContent = item.statusText;
    }
    const isProcessing = item.status === "processing";
    const isCompleted = item.status === "completed";
    const isQueued = !isProcessing && !isCompleted && !isError;
    const hourglassIcon = itemEl.querySelector(".icon-hourglass");
    const checkIcon = itemEl.querySelector(".icon-check");
    const errorIcon = itemEl.querySelector(".icon-error");
    const queuedIcon = itemEl.querySelector(".icon-queued");
    if (hourglassIcon) {
      if (isProcessing) {
        hourglassIcon.style.display = "inline-flex";
        hourglassIcon.classList.add("spinning");
      } else {
        hourglassIcon.style.display = "none";
        hourglassIcon.classList.remove("spinning");
      }
    }
    if (checkIcon) {
      if (isCompleted) {
        checkIcon.style.display = "inline-flex";
        checkIcon.classList.add("success");
      } else {
        checkIcon.style.display = "none";
        checkIcon.classList.remove("success");
      }
    }
    if (errorIcon) {
      errorIcon.style.display = isError ? "inline-flex" : "none";
      if (item.errorMessage || item.statusText) {
        errorIcon.setAttribute("title", item.errorMessage || item.statusText);
      }
    }
    if (queuedIcon) {
      queuedIcon.style.display = isQueued ? "inline-flex" : "none";
    }
    const uploadBar = itemEl.querySelector(`.bar-read, .bar-upload`);
    const uploadPercent = itemEl.querySelector(`.upload-status-text, .read-percent, .upload-percent`);
    if (uploadBar) {
      uploadBar.style.width = `${item.uploadProgress}%`;
    }
    if (uploadPercent) {
      uploadPercent.textContent = item.uploadText || `${item.uploadProgress}%`;
    }
    const convertBar = itemEl.querySelector(`.bar-convert`);
    const convertPercent = itemEl.querySelector(`.convert-status-text, .convert-percent`);
    const integerConvertProgress = Math.round(Number(item.convertProgress) || 0);
    if (convertBar) {
      convertBar.style.width = `${integerConvertProgress}%`;
      if (item.status === "completed") {
        convertBar.classList.add("completed");
        convertBar.classList.remove("error");
      } else if (item.status === "error") {
        convertBar.classList.add("error");
        convertBar.classList.remove("completed");
      } else {
        convertBar.classList.remove("completed", "error");
      }
    }
    if (convertPercent) {
      let formattedText = item.convertText || `${integerConvertProgress}%`;
      formattedText = formattedText.replace(/(\d+)\.\d+%/g, "$1%").replace(/Página\s+(\d+)\s*\/\s*(\d+)/gi, "pg. $1/$2").replace(/Página\s+(\d+)\s+de\s+(\d+)/gi, "pg. $1/$2");
      convertPercent.textContent = formattedText;
    }
    const mdSizeInBytes = item.mdSize || (item.markdownOutput ? new Blob([item.markdownOutput], { type: "text/markdown;charset=utf-8" }).size : 0) || (item.markdown ? new Blob([item.markdown], { type: "text/markdown;charset=utf-8" }).size : 0);
    const mdSizeText = item.status === "completed" && (item.formattedMdSize || mdSizeInBytes > 0) ? `(MD: ${item.formattedMdSize || formatBytes(mdSizeInBytes)})` : "";
    const mdSizeEl = itemEl.querySelector(".mini-progress-label .md-output-size");
    if (mdSizeEl) {
      mdSizeEl.textContent = mdSizeText;
    }
    const actionsMdSizeEl = itemEl.querySelector(".badge-md-size, .queue-item-md-size");
    if (actionsMdSizeEl) {
      actionsMdSizeEl.textContent = mdSizeText;
      actionsMdSizeEl.style.display = mdSizeText ? "inline-flex" : "none";
    }
    const elapsedTimeEl = itemEl.querySelector(".badge-elapsed-time, .queue-item-time");
    if (elapsedTimeEl) {
      if (item.status === "completed" && item.durationMs) {
        elapsedTimeEl.textContent = formatElapsedTime(item.durationMs);
        elapsedTimeEl.style.display = "inline-flex";
      } else {
        elapsedTimeEl.textContent = "";
        elapsedTimeEl.style.display = "none";
      }
    }
    const downloadBtn = itemEl.querySelector(`.btn-download, .btn-queue-item-download, .btn-download-item`);
    if (downloadBtn) {
      if (item.status === "completed") {
        if (typeof downloadBtn.removeAttribute === "function") downloadBtn.removeAttribute("disabled");
        downloadBtn.disabled = false;
        if (downloadBtn.style) downloadBtn.style.pointerEvents = "auto";
      } else {
        if (typeof downloadBtn.setAttribute === "function") downloadBtn.setAttribute("disabled", "");
        downloadBtn.disabled = true;
      }
    }
    updateGlobalBatchButtonsState();
  }
  function downloadQueueItem(itemId) {
    const item = state && state.queue ? state.queue.find((it) => it.id === itemId) : null;
    if (!item || !item.markdown && !item.markdownOutput) {
      return null;
    }
    const fileName = getOutputFileName(item.file ? item.file.name : item.name);
    const content = item.markdownOutput || item.markdown || "";
    const result = triggerDownload(fileName, content);
    if (typeof document !== "undefined" && typeof document.querySelector === "function") {
      const cardBtn = document.querySelector(`.btn-download-item[data-id="${itemId}"], .btn-queue-item-download[data-id="${itemId}"]`);
      if (cardBtn && !cardBtn.__isShowingSuccess) {
        cardBtn.__isShowingSuccess = true;
        if (cardBtn.classList && cardBtn.classList.add) cardBtn.classList.add("is-completed-success");
        const originalHtml = cardBtn.innerHTML;
        cardBtn.innerHTML = `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#10B981" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      `;
        setTimeout(() => {
          if (cardBtn.classList && cardBtn.classList.remove) cardBtn.classList.remove("is-completed-success");
          cardBtn.innerHTML = originalHtml;
          cardBtn.__isShowingSuccess = false;
        }, 2e3);
      }
    }
    return result;
  }
  function removeQueueItem(itemId) {
    const itemIndex = state.queue.findIndex((it) => it.id === itemId);
    if (itemIndex === -1) return;
    const item = state.queue[itemIndex];
    item.cancelled = true;
    state.queue.splice(itemIndex, 1);
    computeAndAnimateTotalMdBytes();
    renderQueue();
    processQueue();
  }
  var batchAnimationController = {
    currentCount: 0,
    targetCount: 0,
    currentPercent: 0,
    targetPercent: 0,
    total: 0,
    lastFrameTime: null,
    rafId: null,
    updateTargets(completed, total) {
      this.targetCount = completed;
      this.total = total;
      this.targetPercent = total > 0 ? completed / total * 100 : 0;
      if (typeof requestAnimationFrame === "function") {
        if (!this.rafId) {
          this.lastFrameTime = typeof performance !== "undefined" && performance.now ? performance.now() : Date.now();
          this.rafId = requestAnimationFrame((now) => this.tick(now));
        }
      } else {
        this.currentCount = this.targetCount;
        this.currentPercent = this.targetPercent;
        this.render(this.targetCount, this.targetPercent);
      }
    },
    tick(now) {
      const perfNow = typeof now === "number" ? now : typeof performance !== "undefined" && performance.now ? performance.now() : Date.now();
      const dt = Math.max(0, Math.min((perfNow - (this.lastFrameTime || perfNow)) / 1e3, 0.1));
      this.lastFrameTime = perfNow;
      const smoothing = 1 - Math.exp(-12 * dt);
      const diffCount = this.targetCount - this.currentCount;
      const diffPercent = this.targetPercent - this.currentPercent;
      if (Math.abs(diffCount) > 0.08 || Math.abs(diffPercent) > 0.08) {
        this.currentCount += diffCount * smoothing;
        this.currentPercent += diffPercent * smoothing;
        this.render(Math.round(this.currentCount), this.currentPercent);
        if (typeof requestAnimationFrame === "function") {
          this.rafId = requestAnimationFrame((n) => this.tick(n));
        } else {
          this.rafId = null;
        }
      } else {
        this.currentCount = this.targetCount;
        this.currentPercent = this.targetPercent;
        this.render(this.targetCount, this.targetPercent);
        this.rafId = null;
      }
    },
    render(displayCount, displayPercent) {
      const counterEl = elements && elements.globalProgressCounter || (typeof document !== "undefined" ? document.getElementById("global-progress-counter") : null);
      const fillEl = elements && elements.globalProgressFill || (typeof document !== "undefined" ? document.getElementById("global-progress-fill") : null);
      const globalProgressEl = elements && elements.batchGlobalProgress || (typeof document !== "undefined" ? document.getElementById("batch-global-progress") : null);
      if (counterEl) {
        const roundedPct = Math.min(100, Math.round(displayPercent));
        counterEl.textContent = `${displayCount.toLocaleString("pt-BR")} / ${this.total.toLocaleString("pt-BR")} arquivos processados (${roundedPct}%)`;
      }
      if (fillEl) {
        fillEl.style.width = `${displayPercent.toFixed(2)}%`;
        if (displayPercent >= 99.99) {
          fillEl.classList.add("finished");
        } else {
          fillEl.classList.remove("finished");
        }
      }
      if (globalProgressEl) {
        if (displayPercent >= 99.99) {
          globalProgressEl.classList.add("is-completed");
        } else {
          globalProgressEl.classList.remove("is-completed");
        }
      }
      if (displayPercent >= 99.99 || this.total > 0 && displayCount >= this.total) {
        updateGlobalBatchButtonsState();
      }
    },
    reset() {
      if (this.rafId) {
        if (typeof cancelAnimationFrame === "function") {
          cancelAnimationFrame(this.rafId);
        }
        this.rafId = null;
      }
      this.currentCount = 0;
      this.targetCount = 0;
      this.currentPercent = 0;
      this.targetPercent = 0;
      this.total = 0;
      this.lastFrameTime = null;
      const globalProgressEl = elements && elements.batchGlobalProgress || (typeof document !== "undefined" ? document.getElementById("batch-global-progress") : null);
      if (globalProgressEl) {
        globalProgressEl.classList.remove("is-completed");
      }
      this.render(0, 0);
    }
  };
  var completedCountSinceLastScroll = 0;
  function handleBatchChunkAutoScroll(itemIndex, totalQueueItems) {
    if (totalQueueItems >= 50 || state && state.userIsScrolling) return;
    completedCountSinceLastScroll++;
    const isFiveChunk = completedCountSinceLastScroll >= 5;
    const isLastItem = itemIndex === totalQueueItems - 1;
    if (isFiveChunk || isLastItem) {
      completedCountSinceLastScroll = 0;
      const queueList = elements && elements.fileQueueList || (typeof document !== "undefined" ? document.querySelector(".file-queue-list") || document.getElementById("file-queue-list") : null);
      if (!queueList || !queueList.children) return;
      const currentItemCard = queueList.children[itemIndex];
      if (!currentItemCard) return;
      const itemOffset = currentItemCard.offsetTop - queueList.offsetTop;
      if (typeof queueList.scrollTo === "function") {
        queueList.scrollTo({
          top: itemOffset - queueList.clientHeight / 2 + currentItemCard.offsetHeight / 2,
          behavior: "smooth"
        });
      }
    }
  }
  function updateGlobalBatchProgress() {
    const total = state && state.queue ? state.queue.length : 0;
    const globalProgressEl = elements && elements.batchGlobalProgress || (typeof document !== "undefined" ? document.getElementById("batch-global-progress") : null);
    if (!globalProgressEl) return;
    if (total > 10) {
      globalProgressEl.style.display = "block";
    } else {
      globalProgressEl.style.display = "none";
      batchAnimationController.reset();
      updateGlobalBatchButtonsState();
      return;
    }
    const completed = state.queue.filter((item) => item.status === "completed" || item.status === "error").length;
    batchAnimationController.updateTargets(completed, total);
    if (total > 0 && completed >= total) {
      updateGlobalBatchButtonsState();
    }
  }
  function dispatchNext() {
    updateDynamicConcurrency();
    let processingCount = state.queue.filter((it) => it.status === "processing" && !it.cancelled).length;
    while (processingCount < state.maxConcurrency) {
      const queuedItems = state.queue.filter((it) => it.status === "queued" && !it.cancelled);
      if (queuedItems.length === 0) {
        break;
      }
      let nextItem;
      if (state.queue.length > 20 || queuedItems.length > 20) {
        nextItem = queuedItems.reduce((max, it) => {
          const itSize = it.file ? it.file.size : it.size || 0;
          const maxSize = max.file ? max.file.size : max.size || 0;
          return itSize > maxSize ? it : max;
        }, queuedItems[0]);
      } else {
        nextItem = queuedItems[0];
      }
      nextItem.status = "processing";
      processingCount++;
      processQueueItem(nextItem);
    }
    const hasActiveItems = state.queue.some((it) => (it.status === "queued" || it.status === "processing") && !it.cancelled);
    state.isProcessing = hasActiveItems;
    if (!hasActiveItems) {
      state.isExtracting = false;
      updateGlobalBatchButtonsState();
    }
  }
  async function processQueue() {
    dispatchNext();
  }
  async function processQueueItem(item) {
    if (item.cancelled) return;
    if (item.file.size > APP_CONFIG.MAX_FILE_SIZE_BYTES) {
      item.status = "error";
      item.statusText = "Erro de convers\xE3o";
      item.uploadProgress = 0;
      item.uploadText = "0%";
      item.convertProgress = 0;
      item.convertText = "Erro";
      item.progress = 0;
      item.errorMessage = ERROR_CATALOG.FILE_TOO_LARGE;
      updateQueueItemDOM(item, true);
      dispatchNext();
      return;
    }
    item.status = "processing";
    item.isReading = true;
    item.statusText = "Lendo arquivo... (0%)";
    item.uploadProgress = 0;
    item.uploadText = "0%";
    item.convertProgress = 0;
    item.convertText = "Aguardando...";
    item.progress = 0;
    updateQueueItemDOM(item);
    const startTime = performance.now();
    updateDebugStatus(`[Processando]: ${item.file.name} (${formatBytes(item.file.size)})`);
    try {
      const arrayBuffer = await readFileWithProgress(item.file, (readPercent) => {
        if (item.cancelled) return;
        item.isReading = readPercent < 100;
        item.uploadProgress = readPercent;
        item.uploadText = `${readPercent}%`;
        item.convertProgress = 0;
        item.convertText = "Aguardando...";
        item.statusText = `Upload... (${readPercent}%)`;
        updateQueueItemDOM(item);
      });
      if (item.cancelled) {
        item.isReading = false;
        return;
      }
      item.isReading = false;
      item.uploadProgress = 100;
      item.uploadText = "100%";
      item.convertProgress = 20;
      item.convertText = "20% (Iniciando parser...)";
      item.statusText = "Iniciando convers\xE3o... (20%)";
      updateQueueItemDOM(item);
      item.file.arrayBuffer = () => Promise.resolve(arrayBuffer);
      let currentConvert = 20;
      let targetConvert = 20;
      let currentDetail = "Carregando parser...";
      const onParserSubProgress = (subPercent, subDetail) => {
        if (item.cancelled || item.status === "completed" || item.status === "error") return;
        const mapped = Math.round(25 + subPercent * 0.7);
        targetConvert = Math.max(targetConvert, Math.min(95, mapped));
        if (subDetail) currentDetail = subDetail;
        currentConvert = Math.max(currentConvert, targetConvert);
        const integerPercent = Math.round(currentConvert);
        item.convertProgress = integerPercent;
        let detailClean = currentDetail || "";
        detailClean = detailClean.replace(/Página\s+(\d+)\s*\/\s*(\d+)/gi, "pg. $1/$2").replace(/Página\s+(\d+)\s+de\s+(\d+)/gi, "pg. $1/$2").replace(/pg\.\s*(\d+)\s*\/\s*(\d+)/gi, "pg. $1/$2");
        const pageCounterText = detailClean ? ` (${detailClean})` : "";
        item.convertText = `${integerPercent}%${pageCounterText}`.trim();
        item.statusText = `Convertendo... (${integerPercent}%)`;
        updateQueueItemDOM(item);
      };
      const tickerInterval = setInterval(() => {
        if (item.cancelled || item.status === "completed" || item.status === "error") {
          clearInterval(tickerInterval);
          return;
        }
        if (targetConvert <= currentConvert && currentConvert < 90) {
          const remaining = 90 - currentConvert;
          const inc = Math.max(0.25, remaining * 0.04);
          targetConvert = Math.min(90, currentConvert + inc);
        }
        if (currentConvert < targetConvert) {
          const step = (targetConvert - currentConvert) * 0.28;
          currentConvert = Math.min(targetConvert, currentConvert + Math.max(0.4, step));
          const integerPercent = Math.round(currentConvert);
          item.convertProgress = integerPercent;
          let detailClean = currentDetail || "";
          detailClean = detailClean.replace(/Página\s+(\d+)\s*\/\s*(\d+)/gi, "pg. $1/$2").replace(/Página\s+(\d+)\s+de\s+(\d+)/gi, "pg. $1/$2").replace(/pg\.\s*(\d+)\s*\/\s*(\d+)/gi, "pg. $1/$2");
          const pageCounterText = detailClean ? ` (${detailClean})` : "";
          item.convertText = `${integerPercent}%${pageCounterText}`.trim();
          item.statusText = `Convertendo... (${integerPercent}%)`;
          updateQueueItemDOM(item);
        }
      }, 120);
      let markdown = "";
      try {
        const cleanExt = getFileExtension(item.file.name) || (item.file.name.includes(".") ? item.file.name.split(".").pop().toLowerCase() : "");
        switch (item.formatInfo.parser) {
          case "docx":
            markdown = await parseDocx(item.file, onParserSubProgress);
            break;
          case "xlsx":
            markdown = await parseSpreadsheet(item.file, onParserSubProgress);
            break;
          case "pptx":
            markdown = await parsePptx(item.file, onParserSubProgress);
            break;
          case "pdf":
            markdown = await parsePdf(item.file, onParserSubProgress);
            break;
          case "code":
            if (cleanExt === "yaml" || cleanExt === "yml") {
              markdown = parseYaml(arrayBuffer, item.file.name);
            } else {
              markdown = parseSourceCode(arrayBuffer, cleanExt, item.file.name);
            }
            break;
          case "text":
          default: {
            if (cleanExt === "yaml" || cleanExt === "yml") {
              markdown = parseYaml(arrayBuffer, item.file.name);
              break;
            }
            if (CODE_EXTENSIONS_MAP[cleanExt] && !["txt", "html", "htm", "rtf", "md", "markdown", "log", "yaml", "yml"].includes(cleanExt)) {
              markdown = parseSourceCode(arrayBuffer, cleanExt, item.file.name);
              break;
            }
            if (["txt", "json", "html", "htm", "rtf", "md", "markdown", "log", "yaml", "yml"].includes(cleanExt)) {
              markdown = await parseText(item.file, onParserSubProgress);
              break;
            }
            const sample = new Uint8Array(arrayBuffer.slice(0, 8192));
            const hasNullByte = sample.includes(0);
            if (!hasNullByte) {
              markdown = parseSourceCode(arrayBuffer, cleanExt || "text", item.file.name);
            } else {
              throw new Error(`${ERROR_CATALOG.PARSER_NOT_FOUND} (Extens\xE3o "${cleanExt ? "." + cleanExt : "bin\xE1ria"}")`);
            }
            break;
          }
        }
      } finally {
        clearInterval(tickerInterval);
      }
      if (item.cancelled) return;
      const mdSizeInBytes = new Blob([markdown], { type: "text/markdown;charset=utf-8" }).size;
      const formattedMdSize = formatBytes(mdSizeInBytes);
      const duration = Math.round(performance.now() - startTime);
      item.status = "completed";
      item.uploadProgress = 100;
      item.uploadText = "100%";
      item.convertProgress = 100;
      item.convertText = "100%";
      item.progress = 100;
      item.statusText = "Conclu\xEDdo";
      item.markdown = markdown;
      item.markdownOutput = markdown;
      item.durationMs = duration;
      item.mdSize = mdSizeInBytes;
      item.formattedMdSize = formattedMdSize;
      updateQueueItemDOM(item);
      computeAndAnimateTotalMdBytes();
      updateGlobalBatchProgress();
      const formattedDuration = formatElapsedTime(duration);
      updateDebugStatus(`[Conclu\xEDdo]: ${item.file.name} em ${formattedDuration} (MD: ${formattedMdSize})`);
    } catch (error) {
      if (item.cancelled) return;
      item.isReading = false;
      const duration = Math.round(performance.now() - startTime);
      item.status = "error";
      item.convertProgress = 0;
      item.convertText = "Erro";
      item.progress = 0;
      item.statusText = "Erro de convers\xE3o";
      const errMsg = error ? error.message || "" : "";
      if (errMsg.includes("1,5 GB") || errMsg.includes("tamanho") || errMsg.includes("size")) {
        item.errorMessage = ERROR_CATALOG.FILE_TOO_LARGE;
      } else if (errMsg.includes("vazio") || errMsg.includes("0 bytes")) {
        item.errorMessage = ERROR_CATALOG.EMPTY_FILE;
      } else if (errMsg.includes("n\xE3o suportad") || errMsg.includes("parser") || errMsg.includes("desconhecido")) {
        item.errorMessage = ERROR_CATALOG.PARSER_NOT_FOUND;
      } else if (errMsg.includes("senha") || errMsg.includes("corrompid") || errMsg.includes("compactad")) {
        item.errorMessage = ERROR_CATALOG.CORRUPTED_ARCHIVE;
      } else if (errMsg.includes("timeout") || errMsg.includes("tempo")) {
        item.errorMessage = ERROR_CATALOG.TIMEOUT;
      } else {
        item.errorMessage = errMsg ? `${ERROR_CATALOG.PARSING_FAILED} (${errMsg})` : ERROR_CATALOG.PARSING_FAILED;
      }
      item.durationMs = duration;
      updateQueueItemDOM(item);
      updateGlobalBatchProgress();
      const formattedDuration = formatElapsedTime(duration);
      updateDebugStatus(`[Falha]: ${item.file.name} - ${item.errorMessage} (${formattedDuration})`, true);
    } finally {
      if (state && state.queue) {
        const itemIndex = state.queue.findIndex((it) => it.id === item.id);
        if (itemIndex !== -1) {
          handleBatchChunkAutoScroll(itemIndex, state.queue.length);
        }
      }
      computeAndAnimateTotalMdBytes();
      updateGlobalBatchProgress();
      updateGlobalBatchButtonsState();
      dispatchNext();
    }
  }
  function showConsolidationProgress(labelText = "Consolidando:", initialCounter = "0 / 0 (0%)") {
    const bar = elements && elements.consolidationProgress || (typeof document !== "undefined" ? document.getElementById("consolidation-progress") : null);
    const fill = elements && elements.consolidationFill || (typeof document !== "undefined" ? document.getElementById("consolidation-fill") : null);
    const counter = elements && elements.consolidationCounter || (typeof document !== "undefined" ? document.getElementById("consolidation-counter") : null);
    const statusText = elements && elements.consolidationStatusText || (typeof document !== "undefined" ? document.getElementById("consolidation-status-text") : null);
    if (bar) {
      bar.style.display = "block";
    }
    if (fill) {
      fill.style.width = "0%";
      fill.classList.remove("finished");
    }
    if (statusText) {
      statusText.textContent = labelText;
    }
    if (counter) {
      counter.textContent = initialCounter;
    }
  }
  function updateConsolidationProgress(current, total, percent, customText = null) {
    const fill = elements && elements.consolidationFill || (typeof document !== "undefined" ? document.getElementById("consolidation-fill") : null);
    const counter = elements && elements.consolidationCounter || (typeof document !== "undefined" ? document.getElementById("consolidation-counter") : null);
    const statusText = elements && elements.consolidationStatusText || (typeof document !== "undefined" ? document.getElementById("consolidation-status-text") : null);
    const clampedPercent = Math.min(100, Math.max(0, Math.round(percent)));
    if (fill) {
      fill.style.width = `${clampedPercent}%`;
      if (clampedPercent >= 100) {
        fill.classList.add("finished");
      }
    }
    if (customText && statusText) {
      statusText.textContent = customText;
    }
    if (counter) {
      if (total > 0) {
        counter.textContent = `${current} / ${total} arquivos (${clampedPercent}%)`;
      } else {
        counter.textContent = `${clampedPercent}%`;
      }
    }
  }
  function hideConsolidationProgress() {
    const bar = elements && elements.consolidationProgress || (typeof document !== "undefined" ? document.getElementById("consolidation-progress") : null);
    const fill = elements && elements.consolidationFill || (typeof document !== "undefined" ? document.getElementById("consolidation-fill") : null);
    if (fill) {
      fill.style.width = "0%";
      fill.classList.remove("finished");
    }
    if (bar) {
      bar.style.display = "none";
    }
  }
  async function downloadAllZip() {
    const completed = state && state.queue ? state.queue.filter((i) => i.status === "completed" || Boolean(i.markdownOutput)) : [];
    const total = completed.length;
    if (total === 0) {
      return null;
    }
    if (state.isExportingZip) {
      return null;
    }
    state.isExportingZip = true;
    state.isExporting = true;
    if (total === 1) {
      try {
        const item = completed[0];
        const baseName = (item.file ? item.file.name : item.name || "documento").replace(/\.[^/.]+$/, "");
        return triggerDownload(getOutputFileName(baseName), item.markdownOutput || item.markdown);
      } finally {
        state.isExportingZip = false;
        state.isExporting = false;
      }
    }
    const btn = elements && elements.btnQueueDownloadAll || (typeof document !== "undefined" ? document.getElementById("btn-queue-download-all") : null);
    const originalTitle = btn ? btn.getAttribute("title") : "";
    let zipBlob = null;
    try {
      if (btn) {
        btn.setAttribute("disabled", "true");
        btn.classList.add("is-consolidating");
        btn.innerHTML = `
        <svg class="radial-spinner-svg inline-btn-spinner" viewBox="0 0 100 100" style="width:14px;height:14px;display:inline-block;vertical-align:middle;margin-right:4px;">
          <line x1="50" y1="14" x2="50" y2="28" stroke-width="8" stroke-linecap="round" class="ray ray-1" />
          <line x1="68" y1="18.8" x2="61" y2="30.9" stroke-width="8" stroke-linecap="round" class="ray ray-2" />
          <line x1="81.2" y1="32" x2="69.1" y2="39" stroke-width="8" stroke-linecap="round" class="ray ray-3" />
          <line x1="86" y1="50" x2="72" y2="50" stroke-width="8" stroke-linecap="round" class="ray ray-4" />
          <line x1="81.2" y1="68" x2="69.1" y2="61" stroke-width="8" stroke-linecap="round" class="ray ray-5" />
          <line x1="68" y1="81.2" x2="61" y2="69.1" stroke-width="8" stroke-linecap="round" class="ray ray-6" />
          <line x1="50" y1="86" x2="50" y2="72" stroke-width="8" stroke-linecap="round" class="ray ray-7" />
          <line x1="32" y1="81.2" x2="39" y2="69.1" stroke-width="8" stroke-linecap="round" class="ray ray-8" />
          <line x1="18.8" y1="68" x2="30.9" y2="61" stroke-width="8" stroke-linecap="round" class="ray ray-9" />
          <line x1="14" y1="50" x2="28" y2="50" stroke-width="8" stroke-linecap="round" class="ray ray-10" />
          <line x1="18.8" y1="32" x2="30.9" y2="39" stroke-width="8" stroke-linecap="round" class="ray ray-11" />
          <line x1="32" y1="18.8" x2="39" y2="30.9" stroke-width="8" stroke-linecap="round" class="ray ray-12" />
        </svg>
        <span class="btn-text-label">Compactando...</span>
      `;
      }
      showConsolidationProgress("Compactando .ZIP:", `0 / ${total} arquivos (0%)`);
      let JSZipClass = typeof window !== "undefined" && window.JSZip || globalThis.JSZip;
      if (!JSZipClass && typeof window !== "undefined") {
        await loadScript(APP_CONFIG.CDN.JSZIP);
        JSZipClass = window.JSZip || globalThis.JSZip;
      }
      if (!JSZipClass && typeof process !== "undefined") {
        try {
          const jszipMod = await Promise.resolve().then(() => __toESM(require_jszip_min(), 1));
          JSZipClass = jszipMod.default || jszipMod;
        } catch (_) {
        }
      }
      if (!JSZipClass) {
        throw new Error("Biblioteca JSZip indispon\xEDvel.");
      }
      const zip = new JSZipClass();
      const usedNames = /* @__PURE__ */ new Set();
      const CHUNK_SIZE = 10;
      for (let i = 0; i < total; i += CHUNK_SIZE) {
        const slice = completed.slice(i, i + CHUNK_SIZE);
        for (const item of slice) {
          const itemFileName = item.file ? item.file.name : item.name || "documento.md";
          let baseName = itemFileName.replace(/\.[^/.]+$/, "");
          let fileName = `${baseName}.md`;
          let counter = 1;
          while (usedNames.has(fileName)) {
            fileName = `${baseName}_${counter}.md`;
            counter++;
          }
          usedNames.add(fileName);
          zip.file(fileName, item.markdownOutput || item.markdown || "");
        }
        const processed = Math.min(i + CHUNK_SIZE, total);
        const prepPercent = Math.round(processed / total * 30);
        updateConsolidationProgress(processed, total, prepPercent, "Preparando .ZIP:");
        if (btn) {
          const textLabel = btn.querySelector(".btn-text-label");
          if (textLabel) {
            textLabel.textContent = `Preparando ${processed}/${total}...`;
          }
        }
        await new Promise((resolve) => setTimeout(resolve, 0));
      }
      zipBlob = await zip.generateAsync(
        { type: "blob", compression: "DEFLATE" },
        function updateCallback(metadata) {
          const compressionPercent = Math.round(metadata.percent || 0);
          const totalProgress = Math.min(100, Math.round(30 + compressionPercent * 0.7));
          const currentEstimated = Math.round(totalProgress / 100 * total);
          updateConsolidationProgress(currentEstimated, total, totalProgress, "Compactando .ZIP:");
          if (btn) {
            const textLabel = btn.querySelector(".btn-text-label");
            if (textLabel) {
              textLabel.textContent = `Compactando (${totalProgress}%)...`;
            }
          }
        }
      );
      updateConsolidationProgress(total, total, 100, "Conclu\xEDdo:");
      if (typeof URL !== "undefined" && typeof URL.createObjectURL === "function" && typeof document !== "undefined" && document.createElement) {
        const url = URL.createObjectURL(zipBlob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `documentos_markdown_${getFormattedTimestamp()}.zip`;
        if (document.body && document.body.appendChild) {
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        } else {
          a.click();
        }
        if (typeof URL.revokeObjectURL === "function") {
          setTimeout(() => {
            try {
              URL.revokeObjectURL(url);
            } catch (_) {
            }
          }, 5e3);
        }
      }
      await new Promise((r) => setTimeout(r, 200));
    } catch (err) {
      console.error("[doc2md] Erro ao gerar pacote ZIP:", err);
    } finally {
      state.isExporting = false;
      state.isExportingZip = false;
      hideConsolidationProgress();
      if (btn) {
        if (typeof btn.removeAttribute === "function") btn.removeAttribute("disabled");
        btn.disabled = false;
        if (btn.classList && btn.classList.remove) btn.classList.remove("is-consolidating");
        if (btn.style) btn.style.pointerEvents = "auto";
        if (zipBlob) {
          btn.classList.add("is-completed-success");
          btn.__isShowingSuccess = true;
          btn.innerHTML = COMPLETED_ZIP_BUTTON_HTML;
          setTimeout(() => {
            if (btn.classList && btn.classList.remove) btn.classList.remove("is-completed-success");
            btn.innerHTML = DEFAULT_ZIP_BUTTON_HTML;
            btn.__isShowingSuccess = false;
            updateGlobalActionButtonsState();
          }, 2500);
        } else {
          btn.innerHTML = DEFAULT_ZIP_BUTTON_HTML;
        }
        if (originalTitle && typeof btn.setAttribute === "function") btn.setAttribute("title", originalTitle);
      }
      updateGlobalActionButtonsState();
    }
    return { zipBlob, total, blob: zipBlob };
  }
  function buildDirectoryTreeAscii(items) {
    if (!items || items.length === 0) return "";
    const archives = /* @__PURE__ */ new Map();
    for (const item of items) {
      const fileName = item.file ? item.file.name : item.name || "documento.md";
      const archive = item.archiveOrigin || item.file && item.file.archiveOrigin || "(Upload Direto)";
      let folder = item.folderPath || item.file && item.file.folderPath;
      if (!folder) {
        if (item.relativePath && item.relativePath.includes("/")) {
          folder = item.relativePath.substring(0, item.relativePath.lastIndexOf("/"));
        } else {
          folder = archive === "(Upload Direto)" ? "Raiz" : "Raiz do Pacote";
        }
      }
      if (!archives.has(archive)) {
        archives.set(archive, /* @__PURE__ */ new Map());
      }
      const folderMap = archives.get(archive);
      if (!folderMap.has(folder)) {
        folderMap.set(folder, []);
      }
      folderMap.get(folder).push(fileName);
    }
    const lines = [];
    const archiveKeys = Array.from(archives.keys());
    archiveKeys.forEach((archiveName, aIdx) => {
      lines.push(`\u{1F4E6} ${archiveName}`);
      const folderMap = archives.get(archiveName);
      const folderKeys = Array.from(folderMap.keys());
      folderKeys.forEach((folderName, fIdx) => {
        const isLastFolder = fIdx === folderKeys.length - 1;
        const folderBranch = isLastFolder ? "\u2514\u2500\u2500" : "\u251C\u2500\u2500";
        const fileIndent = isLastFolder ? "    " : "\u2502   ";
        const files = folderMap.get(folderName);
        if (folderName === "Raiz" || folderName === "Raiz do Pacote") {
          files.forEach((fName, fileIdx) => {
            const isLastFile = fileIdx === files.length - 1 && isLastFolder;
            const fileBranch = isLastFile ? "\u2514\u2500\u2500" : "\u251C\u2500\u2500";
            lines.push(` ${fileBranch} \u{1F4C4} ${fName}`);
          });
        } else {
          const displayFolder = folderName.endsWith("/") ? folderName : folderName + "/";
          lines.push(` ${folderBranch} \u{1F4C1} ${displayFolder}`);
          files.forEach((fName, fileIdx) => {
            const isLastFile = fileIdx === files.length - 1;
            const fileBranch = isLastFile ? "\u2514\u2500\u2500" : "\u251C\u2500\u2500";
            lines.push(` ${fileIndent} ${fileBranch} \u{1F4C4} ${fName}`);
          });
        }
      });
      if (aIdx < archiveKeys.length - 1) {
        lines.push("");
      }
    });
    return lines.join("\n");
  }
  function buildBacklogSection(items) {
    if (!items || items.length === 0) return "";
    const tableHeader = [
      "# RASTREABILIDADE DE ARQUIVOS E ESTRUTURA DE PASTAS (BACKLOG)",
      "",
      "> Este documento consolidado foi gerado a partir da extra\xE7\xE3o e mesclagem de arquivos.",
      "> A tabela abaixo apresenta o mapeamento de origem das pastas e arquivos processados:",
      "",
      "| Pacote de Origem | Diret\xF3rio / Pasta | Nome do Arquivo | Extens\xE3o | Tamanho Original |",
      "| :--- | :--- | :--- | :--- | :--- |"
    ];
    const tableRows = items.map((item) => {
      const fileName = item.file ? item.file.name : item.name || "documento.md";
      const fileSize = item.file ? item.file.size : item.size || 0;
      const sizeFormatted = formatBytes(fileSize);
      const ext = "." + (fileName.split(".").pop() || "TXT").toUpperCase();
      const archiveOrigin = item.archiveOrigin || item.file && item.file.archiveOrigin || "(Upload Direto)";
      let folderPath = item.folderPath || item.file && item.file.folderPath;
      if (!folderPath) {
        if (item.relativePath && item.relativePath.includes("/")) {
          folderPath = item.relativePath.substring(0, item.relativePath.lastIndexOf("/"));
        } else {
          folderPath = archiveOrigin === "(Upload Direto)" ? "Raiz" : "Raiz do Pacote";
        }
      }
      const cleanFolder = folderPath === "Raiz" || folderPath === "Raiz do Pacote" ? folderPath : folderPath.endsWith("/") ? folderPath : folderPath + "/";
      return `| ${archiveOrigin} | ${cleanFolder} | ${fileName} | ${ext} | ${sizeFormatted} |`;
    });
    const treeAscii = buildDirectoryTreeAscii(items);
    const treeBlock = treeAscii ? [
      "",
      "```plaintext",
      treeAscii,
      "```"
    ] : [];
    return [
      ...tableHeader,
      ...tableRows,
      ...treeBlock,
      "",
      "---",
      "",
      ""
    ].join("\n");
  }
  function formatItemForUnifiedMarkdown(item) {
    const fileName = item.file ? item.file.name : item.name || "documento.md";
    const fileSize = item.file ? item.file.size : item.size || 0;
    const sizeFormatted = formatBytes(fileSize);
    const ext = (fileName.split(".").pop() || "TXT").toUpperCase();
    const archiveOrigin = item.archiveOrigin || item.file && item.file.archiveOrigin || "(Upload Direto)";
    const relativePath = item.relativePath || item.file && item.file.relativePath || fileName;
    let folderPath = item.folderPath || item.file && item.file.folderPath;
    if (!folderPath) {
      if (relativePath.includes("/")) {
        folderPath = relativePath.substring(0, relativePath.lastIndexOf("/"));
      } else {
        folderPath = archiveOrigin === "(Upload Direto)" ? "Raiz" : "Raiz do Pacote";
      }
    }
    const cleanFolder = folderPath === "Raiz" || folderPath === "Raiz do Pacote" ? folderPath : folderPath.endsWith("/") ? folderPath : folderPath + "/";
    let md = (item.markdown || item.markdownOutput || "").trim();
    const codeFenceCount = (md.match(/^```/gm) || []).length;
    if (codeFenceCount % 2 !== 0) {
      md += "\n```";
    }
    const headerDelimiter = [
      "<!-- ================================================================= -->",
      `<!-- IN\xCDCIO DO ARQUIVO: ${relativePath} -->`,
      `<!-- PACOTE DE ORIGEM: ${archiveOrigin} | DIRET\xD3RIO: ${cleanFolder} -->`,
      `<!-- FORMATO: .${ext} | FORMATO ORIGINAL: ${ext} | TAMANHO: ${sizeFormatted} -->`,
      "<!-- ================================================================= -->"
    ].join("\n");
    const footerDelimiter = [
      "<!-- ================================================================= -->",
      `<!-- FIM DO ARQUIVO: ${relativePath} -->`,
      "<!-- ================================================================= -->"
    ].join("\n");
    return `${headerDelimiter}

# ${fileName}
*Origem: \`${archiveOrigin} > ${relativePath}\`*

${md}

${footerDelimiter}

---`;
  }
  async function generateUnifiedMarkdownWithProgress(items, onProgress) {
    const completedItems = (items || state.queue).filter((i) => i.status === "completed" || Boolean(i.markdownOutput));
    const total = completedItems.length;
    if (total === 0) return "";
    const backlog = buildBacklogSection(completedItems);
    const parts = [];
    const CHUNK_SIZE = 10;
    for (let i = 0; i < total; i += CHUNK_SIZE) {
      const slice = completedItems.slice(i, i + CHUNK_SIZE);
      for (const item of slice) {
        parts.push(formatItemForUnifiedMarkdown(item));
      }
      if (typeof onProgress === "function") {
        const currentProcessed = Math.min(i + CHUNK_SIZE, total);
        const percent = Math.round(currentProcessed / total * 100);
        onProgress(currentProcessed, total, percent);
      }
      await new Promise((resolve) => setTimeout(resolve, 0));
    }
    return (backlog || "") + parts.join("\n\n") + "\n";
  }
  async function downloadUnifiedMarkdown() {
    const completed = state && state.queue ? state.queue.filter((i) => i.status === "completed" || Boolean(i.markdownOutput)) : [];
    const total = completed.length;
    if (total === 0) {
      return null;
    }
    if (state.isExportingUnified) {
      return null;
    }
    state.isExportingUnified = true;
    state.isExporting = true;
    const btn = elements && elements.btnDownloadUnified || (typeof document !== "undefined" ? document.getElementById("btn-download-unified") || document.getElementById("btn-queue-download-merged") : null);
    const originalTitle = btn ? btn.getAttribute("title") : "";
    let downloadResult = null;
    try {
      if (btn) {
        btn.setAttribute("disabled", "true");
        btn.classList.add("is-consolidating");
        btn.innerHTML = `
        <span class="icon-merge">
          <svg class="radial-spinner-svg inline-btn-spinner" viewBox="0 0 100 100" style="width:14px;height:14px;display:inline-block;vertical-align:middle;margin-right:4px;">
            <line x1="50" y1="14" x2="50" y2="28" stroke-width="8" stroke-linecap="round" class="ray ray-1" />
            <line x1="68" y1="18.8" x2="61" y2="30.9" stroke-width="8" stroke-linecap="round" class="ray ray-2" />
            <line x1="81.2" y1="32" x2="69.1" y2="39" stroke-width="8" stroke-linecap="round" class="ray ray-3" />
            <line x1="86" y1="50" x2="72" y2="50" stroke-width="8" stroke-linecap="round" class="ray ray-4" />
            <line x1="81.2" y1="68" x2="69.1" y2="61" stroke-width="8" stroke-linecap="round" class="ray ray-5" />
            <line x1="68" y1="81.2" x2="61" y2="69.1" stroke-width="8" stroke-linecap="round" class="ray ray-6" />
            <line x1="50" y1="86" x2="50" y2="72" stroke-width="8" stroke-linecap="round" class="ray ray-7" />
            <line x1="32" y1="81.2" x2="39" y2="69.1" stroke-width="8" stroke-linecap="round" class="ray ray-8" />
            <line x1="18.8" y1="68" x2="30.9" y2="61" stroke-width="8" stroke-linecap="round" class="ray ray-9" />
            <line x1="14" y1="50" x2="28" y2="50" stroke-width="8" stroke-linecap="round" class="ray ray-10" />
            <line x1="18.8" y1="32" x2="30.9" y2="39" stroke-width="8" stroke-linecap="round" class="ray ray-11" />
            <line x1="32" y1="18.8" x2="39" y2="30.9" stroke-width="8" stroke-linecap="round" class="ray ray-12" />
          </svg>
        </span>
        <span class="btn-text-label">Consolidando 0 / ${total} (0%)...</span>
      `;
      }
      showConsolidationProgress("Consolidando:", `0 / ${total} arquivos (0%)`);
      const orderedItems = [...completed];
      const mergedContent = await generateUnifiedMarkdownWithProgress(orderedItems, (current, totalFiles, percent) => {
        updateConsolidationProgress(current, totalFiles, percent, "Consolidando:");
        if (btn) {
          const textLabel = btn.querySelector(".btn-text-label");
          if (textLabel) {
            textLabel.textContent = `Consolidando ${current} / ${totalFiles} (${percent}%)...`;
          }
        }
      });
      const fileName = `documento_unificado_${getFormattedTimestamp()}.md`;
      downloadResult = triggerDownload(fileName, mergedContent);
      updateConsolidationProgress(total, total, 100, "Conclu\xEDdo:");
      await new Promise((r) => setTimeout(r, 200));
    } catch (err) {
      console.error("[doc2md] Erro ao consolidar Markdown unificado:", err);
    } finally {
      state.isExporting = false;
      state.isExportingUnified = false;
      hideConsolidationProgress();
      if (btn) {
        if (typeof btn.removeAttribute === "function") btn.removeAttribute("disabled");
        btn.disabled = false;
        if (btn.classList && btn.classList.remove) btn.classList.remove("is-consolidating");
        if (btn.style) btn.style.pointerEvents = "auto";
        if (downloadResult) {
          btn.classList.add("is-completed-success");
          btn.__isShowingSuccess = true;
          btn.innerHTML = COMPLETED_UNIFIED_BUTTON_HTML;
          setTimeout(() => {
            if (btn.classList && btn.classList.remove) btn.classList.remove("is-completed-success");
            btn.innerHTML = DEFAULT_UNIFIED_BUTTON_HTML;
            btn.__isShowingSuccess = false;
            updateGlobalActionButtonsState();
          }, 2500);
        } else {
          btn.innerHTML = DEFAULT_UNIFIED_BUTTON_HTML;
        }
        if (originalTitle && typeof btn.setAttribute === "function") btn.setAttribute("title", originalTitle);
      }
      updateGlobalActionButtonsState();
    }
    return downloadResult;
  }
  function sortQueueByName(ascending = true) {
    if (!state || !state.queue) return;
    state.sortAscending = ascending;
    state.queue.sort((a, b) => {
      const nameA = a.file ? a.file.name : a.name || "";
      const nameB = b.file ? b.file.name : b.name || "";
      const comp = nameA.localeCompare(nameB, void 0, {
        numeric: true,
        sensitivity: "base"
      });
      return ascending ? comp : -comp;
    });
    renderQueueUI();
    updateSortButtonUI();
  }
  function renderQueueUI() {
    renderQueue();
  }
  function updateSortButtonUI() {
    const btn = elements && elements.btnSortFiles || (typeof document !== "undefined" ? document.getElementById("btn-sort-files") : null);
    const label = elements && elements.sortFilesLabel || (typeof document !== "undefined" ? document.getElementById("sort-files-label") : null);
    if (!btn) return;
    const isAsc = state.sortAscending !== false;
    btn.title = isAsc ? "Classificar arquivos em ordem decrescente (Z-A)" : "Classificar arquivos em ordem crescente (A-Z)";
    if (label) {
      label.textContent = isAsc ? "Classificar A-Z" : "Classificar Z-A";
    }
    const iconAsc = btn.querySelector(".icon-asc");
    const iconDesc = btn.querySelector(".icon-desc");
    if (iconAsc && iconDesc) {
      iconAsc.style.display = isAsc ? "inline-block" : "none";
      iconDesc.style.display = isAsc ? "none" : "inline-block";
    }
  }
  function updateMergeButtonVisibility() {
    const isEnabled = elements.toggleMergeMarkdown ? elements.toggleMergeMarkdown.checked : false;
    state.isMergeEnabled = isEnabled;
    const row = elements.unifiedActionRow || elements.unifiedDownloadContainer || (typeof document !== "undefined" ? document.getElementById("unified-action-row") || document.getElementById("unified-download-container") : null);
    if (row) {
      row.style.display = isEnabled ? "flex" : "none";
    }
    if (elements.btnDownloadUnified) {
      elements.btnDownloadUnified.style.display = isEnabled ? "inline-flex" : "none";
    }
    if (elements.btnQueueDownloadMerged && elements.btnQueueDownloadMerged !== elements.btnDownloadUnified) {
      elements.btnQueueDownloadMerged.style.display = isEnabled ? "inline-flex" : "none";
    }
  }
  function clearQueue() {
    if (!state || !state.queue) return;
    state.queue.forEach((it) => {
      it.cancelled = true;
    });
    state.queue = [];
    state.isExtracting = false;
    state.isProcessing = false;
    state.isExporting = false;
    state.isExportingZip = false;
    state.isExportingUnified = false;
    state.userIsScrolling = false;
    completedCountSinceLastScroll = 0;
    totalBytesAnimController.reset();
    batchAnimationController.reset();
    computeAndAnimateTotalMdBytes();
    renderQueue();
    updateGlobalBatchButtonsState();
  }
  function initQueueEvents() {
    const queueContainer = elements && elements.fileQueueList || (typeof document !== "undefined" ? document.querySelector(".file-queue-list") || document.getElementById("file-queue-list") : null);
    if (queueContainer) {
      setupQueueListDelegation(queueContainer);
    }
    if (elements.btnQueueClear) {
      elements.btnQueueClear.addEventListener("click", () => {
        if (state.queue.length === 0) return;
        clearQueue();
      });
    }
    const btnQueueDownloadAll = elements && elements.btnQueueDownloadAll || (typeof document !== "undefined" ? document.getElementById("btn-queue-download-all") : null);
    if (btnQueueDownloadAll && !btnQueueDownloadAll.__hasDownloadListener) {
      btnQueueDownloadAll.__hasDownloadListener = true;
      btnQueueDownloadAll.addEventListener("click", (e) => {
        e.preventDefault();
        downloadAllZip();
      });
    }
    if (elements.btnSortFiles) {
      elements.btnSortFiles.addEventListener("click", () => {
        state.sortAscending = !(state.sortAscending !== false);
        sortQueueByName(state.sortAscending);
      });
    }
    if (elements.toggleMergeMarkdown) {
      const saved = typeof localStorage !== "undefined" ? localStorage.getItem(APP_CONFIG.STORAGE_KEYS.MERGE_MARKDOWN) : null;
      if (saved !== null) {
        elements.toggleMergeMarkdown.checked = saved === "true";
      }
      updateMergeButtonVisibility();
      updateSortButtonUI();
      elements.toggleMergeMarkdown.addEventListener("change", (e) => {
        state.isMergeEnabled = e.target.checked;
        if (typeof localStorage !== "undefined") {
          localStorage.setItem(APP_CONFIG.STORAGE_KEYS.MERGE_MARKDOWN, String(state.isMergeEnabled));
        }
        if (state.isMergeEnabled) {
          sortQueueByName(state.sortAscending ?? true);
        }
        const unifiedRow = elements.unifiedActionRow || elements.unifiedDownloadContainer || (typeof document !== "undefined" ? document.getElementById("unified-action-row") : null);
        if (unifiedRow) {
          unifiedRow.style.display = state.isMergeEnabled ? "flex" : "none";
        }
        updateMergeButtonVisibility();
      });
    }
    const btnUnified = elements && elements.btnDownloadUnified || elements && elements.btnQueueDownloadMerged || (typeof document !== "undefined" ? document.getElementById("btn-download-unified") || document.getElementById("btn-queue-download-merged") : null);
    if (btnUnified && !btnUnified.__hasUnifiedListener) {
      btnUnified.__hasUnifiedListener = true;
      btnUnified.addEventListener("click", (e) => {
        e.preventDefault();
        downloadUnifiedMarkdown();
      });
    }
    if (elements.fileQueueList) {
      let scrollUserTimer = null;
      const handleUserManualScroll = () => {
        state.userIsScrolling = true;
        if (scrollUserTimer) clearTimeout(scrollUserTimer);
        scrollUserTimer = setTimeout(() => {
          state.userIsScrolling = false;
        }, 2e3);
      };
      elements.fileQueueList.addEventListener("wheel", handleUserManualScroll, { passive: true });
      elements.fileQueueList.addEventListener("touchmove", handleUserManualScroll, { passive: true });
    }
  }
  function initDropzone() {
    const { dropzone, fileInput, btnBrowse } = elements;
    if (btnBrowse && fileInput) {
      btnBrowse.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        fileInput.value = "";
        fileInput.click();
      });
    }
    if (fileInput) {
      fileInput.addEventListener("change", (e) => {
        const files = e.target.files;
        if (files && files.length > 0) {
          console.log(`[doc2md] ${files.length} arquivo(s) capturado(s) via seletor nativo`);
          addFilesToQueue(files);
        }
        fileInput.value = "";
      });
    }
    if (dropzone) {
      dropzone.addEventListener("dragenter", (e) => {
        e.preventDefault();
        e.stopPropagation();
        dropzone.classList.add("drag-over");
      });
      dropzone.addEventListener("dragover", (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.dataTransfer) {
          e.dataTransfer.dropEffect = "copy";
        }
        dropzone.classList.add("drag-over");
      });
      dropzone.addEventListener("dragleave", (e) => {
        e.preventDefault();
        dropzone.classList.remove("drag-over");
      });
      dropzone.addEventListener("drop", (e) => {
        e.preventDefault();
        e.stopPropagation();
        dropzone.classList.remove("drag-over");
        const files = e.dataTransfer ? e.dataTransfer.files : null;
        if (files && files.length > 0) {
          console.log(`[doc2md] ${files.length} arquivo(s) recebido(s) via Drop`);
          addFilesToQueue(files);
        }
      });
    }
    if (!window.__openToolGlobalDropAttached) {
      window.__openToolGlobalDropAttached = true;
      window.addEventListener("dragover", (e) => {
        e.preventDefault();
      }, false);
      window.addEventListener("drop", (e) => {
        e.preventDefault();
      }, false);
      window.addEventListener("paste", async (e) => {
        const activeEl = document.activeElement;
        const target = e.target;
        if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable) || activeEl && (activeEl.tagName === "INPUT" || activeEl.tagName === "TEXTAREA" || activeEl.isContentEditable)) {
          return;
        }
        const dropzoneEl = document.getElementById("dropzone");
        if (!dropzoneEl || !dropzoneEl.isConnected || dropzoneEl.offsetParent === null) {
          return;
        }
        if (e.clipboardData && e.clipboardData.files && e.clipboardData.files.length > 0) {
          e.preventDefault();
          console.log(`[doc2md] ${e.clipboardData.files.length} arquivo(s) recebido(s) via Paste (Clipboard)`);
          addFilesToQueue(e.clipboardData.files);
          return;
        }
        const pastedText = e.clipboardData ? e.clipboardData.getData("text") : "";
        if (pastedText && pastedText.trim()) {
          e.preventDefault();
          console.log("[doc2md] Texto puro recebido via Paste (Clipboard)");
          updateDebugStatus(`[Clipboard]: Texto recebido (${pastedText.length} caracteres)`);
          const mockFile = new File([pastedText], "texto_colado.txt", { type: "text/plain" });
          addFilesToQueue([mockFile]);
        }
      });
    }
  }
  function boot() {
    reinitElements();
    initVersion();
    initTheme();
    initDropzone();
    initQueueEvents();
  }
  if (typeof document !== "undefined") {
    const isSubModule = typeof window.__openToolRegistryActive !== "undefined";
    if (!isSubModule) {
      if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", boot);
      } else {
        boot();
      }
    }
    if (!document.__openMarkGlobalClickAttached) {
      document.__openMarkGlobalClickAttached = true;
      document.addEventListener("click", (e) => {
        const btnUnified = e.target && typeof e.target.closest === "function" ? e.target.closest("#btn-download-unified, .btn-download-unified, .btn-queue-download-merged") : null;
        if (btnUnified) {
          if (typeof e.preventDefault === "function") e.preventDefault();
          if (typeof e.stopImmediatePropagation === "function") e.stopImmediatePropagation();
          else if (typeof e.stopPropagation === "function") e.stopPropagation();
          downloadUnifiedMarkdown();
          return;
        }
        const btnZip = e.target && typeof e.target.closest === "function" ? e.target.closest("#btn-queue-download-all, .btn-queue-download-all") : null;
        if (btnZip) {
          if (typeof e.preventDefault === "function") e.preventDefault();
          if (typeof e.stopImmediatePropagation === "function") e.stopImmediatePropagation();
          else if (typeof e.stopPropagation === "function") e.stopPropagation();
          downloadAllZip();
          return;
        }
        const btnItem = e.target && typeof e.target.closest === "function" ? e.target.closest(".btn-download-item, .btn-queue-item-download, .btn-download") : null;
        if (btnItem) {
          if (typeof e.preventDefault === "function") e.preventDefault();
          if (typeof e.stopImmediatePropagation === "function") e.stopImmediatePropagation();
          else if (typeof e.stopPropagation === "function") e.stopPropagation();
          const itemId = btnItem.dataset ? btnItem.dataset.id : btnItem.getAttribute ? btnItem.getAttribute("data-id") : null;
          if (itemId) {
            downloadQueueItem(itemId);
          }
          return;
        }
      }, true);
    }
  }

  // js/app-doc2md.js
  async function initDoc2md(container) {
    await new Promise((r) => typeof requestAnimationFrame !== "undefined" ? requestAnimationFrame(r) : setTimeout(r, 16));
    try {
      boot();
    } catch (e) {
      console.warn("[app-doc2md] Falha parcial na inicializa\xE7\xE3o:", e.message);
    }
    return function cleanup() {
    };
  }

  // js/tools/doc2md/tool.js
  var _cleanupFns = [];
  var tool = {
    id: "doc2md",
    label: "Doc \u2192 MD",
    /**
     * Injeta o HTML da ferramenta no viewport.
     * @param {HTMLElement} container
     */
    render(container) {
      container.innerHTML = getDoc2mdHTML();
    },
    /**
     * Inicializa toda a lógica do conversor.
     * A lógica vive no app.js original — este método garante que ela seja inicializada
     * após o HTML estar no DOM.
     * @param {HTMLElement} container
     */
    async mount(container) {
      _cleanupFns = [];
      if (typeof initDoc2md === "function") {
        const cleanup = await initDoc2md(container);
        if (typeof cleanup === "function") {
          _cleanupFns.push(cleanup);
        }
      }
    },
    /**
     * Limpa event listeners e estado quando a ferramenta é desativada.
     */
    unmount() {
      _cleanupFns.forEach((fn) => {
        try {
          fn();
        } catch (e) {
        }
      });
      _cleanupFns = [];
    }
  };
  var tool_default = tool;

  // js/tools/qrcode/ui.js
  function getQRCodeHTML() {
    return `
    <div class="qrcode-tool-root">

      <section class="qrcode-hero">
        <header class="hero-header">
          <h2 class="hero-title">Gerador de QR Code</h2>
          <p class="hero-subtitle">
            Gere QR Codes a partir de links, textos ou qualquer dado. 100% local \u2014 nenhuma informa\xE7\xE3o \xE9 enviada para servidores.
          </p>
        </header>
      </section>

      <div class="qrcode-workspace">

        <!-- Coluna Esquerda: Controles -->
        <div class="qrcode-controls-panel">

          <!-- Input de conte\xFAdo -->
          <div class="qrcode-field-group">
            <div class="qrcode-label-row">
              <label class="qrcode-label" for="qr-input">
                ${ICONS.link(15)}
                URL ou texto
              </label>
              <button type="button" id="qr-paste-btn" class="qrcode-paste-btn" title="Colar link ou texto da \xE1rea de transfer\xEAncia">
                ${ICONS.clipboard(13)}
                <span>Colar</span>
              </button>
            </div>
            <div class="qrcode-input-wrap">
              <textarea
                id="qr-input"
                class="qrcode-textarea"
                placeholder="https://exemplo.com.br ou qualquer texto\u2026"
                rows="4"
                maxlength="2000"
                autocomplete="off"
                spellcheck="false"
              ></textarea>
              <div class="qrcode-char-count">
                <span id="qr-char-count">0</span> / 2000
              </div>
            </div>
            <div id="qr-url-feedback" class="qrcode-url-feedback" aria-live="polite"></div>
          </div>

          <!-- Divisor -->
          <div class="qrcode-divider">
            <span>Personaliza\xE7\xE3o</span>
          </div>

          <!-- Op\xE7\xF5es de personaliza\xE7\xE3o -->
          <div class="qrcode-options-grid">

            <!-- Tamanho -->
            <div class="qrcode-field-group">
              <label class="qrcode-label" for="qr-size">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <path d="M21 21H3V3"/>
                  <path d="m7 17 10-10"/>
                </svg>
                Tamanho
              </label>
              <div class="qrcode-size-control">
                <input type="range" id="qr-size" class="qrcode-range" min="128" max="1024" step="64" value="256">
                <span class="qrcode-size-value"><span id="qr-size-display">256</span> px</span>
              </div>
            </div>

            <!-- N\xEDvel de corre\xE7\xE3o de erro -->
            <div class="qrcode-field-group">
              <label class="qrcode-label" for="qr-ecl">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <path d="m12 14 4-4"/>
                  <path d="M3.34 19a10 10 0 1 1 17.32 0"/>
                </svg>
                Corre\xE7\xE3o de Erro
              </label>
              <div class="qrcode-ecl-group" id="qr-ecl">
                <button class="qrcode-ecl-btn" data-ecl="L" title="7% de recupera\xE7\xE3o">L</button>
                <button class="qrcode-ecl-btn qrcode-ecl-btn--active" data-ecl="M" title="15% de recupera\xE7\xE3o (padr\xE3o)">M</button>
                <button class="qrcode-ecl-btn" data-ecl="Q" title="25% de recupera\xE7\xE3o">Q</button>
                <button class="qrcode-ecl-btn" data-ecl="H" title="30% de recupera\xE7\xE3o (m\xE1ximo)">H</button>
              </div>
              <p class="qrcode-hint" id="qr-ecl-hint">M \u2014 15% de recupera\xE7\xE3o (padr\xE3o)</p>
            </div>

            <!-- Cor do QR (foreground) -->
            <div class="qrcode-field-group">
              <label class="qrcode-label" for="qr-color-fg">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/>
                  <circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/>
                  <circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/>
                  <circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/>
                  <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/>
                </svg>
                Cor dos m\xF3dulos
              </label>
              <div class="qrcode-color-row">
                <input type="color" id="qr-color-fg" class="qrcode-color-input" value="#0F172A" title="Cor dos m\xF3dulos">
                <span class="qrcode-color-preview" id="qr-color-fg-preview" style="background:#0F172A;"></span>
                <input type="text" id="qr-color-fg-hex" class="qrcode-hex-input" value="#0F172A" maxlength="7" spellcheck="false">
              </div>
            </div>

            <!-- Cor do fundo (background) -->
            <div class="qrcode-field-group">
              <label class="qrcode-label" for="qr-color-bg">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <rect x="3" y="3" width="18" height="18" rx="2"/>
                </svg>
                Cor do fundo
              </label>
              <div class="qrcode-color-row">
                <input type="color" id="qr-color-bg" class="qrcode-color-input" value="#FFFFFF" title="Cor do fundo">
                <span class="qrcode-color-preview" id="qr-color-bg-preview" style="background:#FFFFFF; border-color: var(--border-subtle);"></span>
                <input type="text" id="qr-color-bg-hex" class="qrcode-hex-input" value="#FFFFFF" maxlength="7" spellcheck="false">
              </div>
            </div>

          </div>

          <!-- Bot\xE3o gerar -->
          <button id="qr-generate-btn" class="btn btn-primary qrcode-generate-btn" disabled>
            ${ICONS.toolQrcode(16)}
            <span>Gerar QR Code</span>
          </button>

        </div>

        <!-- Coluna Direita: Preview -->
        <div class="qrcode-preview-panel">

          <!-- Estado vazio -->
          <div id="qr-empty-state" class="qrcode-empty-state">
            <div class="qrcode-empty-icon" aria-hidden="true">
              ${ICONS.toolQrcode(56)}
            </div>
            <p class="qrcode-empty-text">Digite uma URL ou texto e clique em <strong>Gerar QR Code</strong></p>
          </div>

          <!-- Estado de loading -->
          <div id="qr-loading-state" class="qrcode-loading-state" style="display:none;" aria-live="polite">
            <svg viewBox="0 0 100 100" class="radial-spinner-svg qrcode-spinner" width="40" height="40">
              <line x1="50" y1="14" x2="50" y2="28" stroke-width="8" stroke-linecap="round" class="ray ray-1" />
              <line x1="68" y1="18.8" x2="61" y2="30.9" stroke-width="8" stroke-linecap="round" class="ray ray-2" />
              <line x1="81.2" y1="32" x2="69.1" y2="39" stroke-width="8" stroke-linecap="round" class="ray ray-3" />
              <line x1="86" y1="50" x2="72" y2="50" stroke-width="8" stroke-linecap="round" class="ray ray-4" />
              <line x1="81.2" y1="68" x2="69.1" y2="61" stroke-width="8" stroke-linecap="round" class="ray ray-5" />
              <line x1="68" y1="81.2" x2="61" y2="69.1" stroke-width="8" stroke-linecap="round" class="ray ray-6" />
              <line x1="50" y1="86" x2="50" y2="72" stroke-width="8" stroke-linecap="round" class="ray ray-7" />
              <line x1="32" y1="81.2" x2="39" y2="69.1" stroke-width="8" stroke-linecap="round" class="ray ray-8" />
              <line x1="18.8" y1="68" x2="30.9" y2="61" stroke-width="8" stroke-linecap="round" class="ray ray-9" />
              <line x1="14" y1="50" x2="28" y2="50" stroke-width="8" stroke-linecap="round" class="ray ray-10" />
              <line x1="18.8" y1="32" x2="30.9" y2="39" stroke-width="8" stroke-linecap="round" class="ray ray-11" />
              <line x1="32" y1="18.8" x2="39" y2="30.9" stroke-width="8" stroke-linecap="round" class="ray ray-12" />
            </svg>
            <span>Gerando QR Code\u2026</span>
          </div>

          <!-- QR Code gerado -->
          <div id="qr-result" class="qrcode-result" style="display:none;">
            <div class="qrcode-canvas-wrap">
              <div id="qr-canvas-container" class="qrcode-canvas-container"></div>
            </div>

            <!-- Metadados -->
            <div class="qrcode-meta-row">
              <span class="qrcode-meta-badge" id="qr-meta-size">256 \xD7 256 px</span>
              <span class="qrcode-meta-badge" id="qr-meta-ecl">ECL: M</span>
              <span class="qrcode-meta-badge" id="qr-meta-chars">0 caracteres</span>
            </div>

            <!-- A\xE7\xF5es de exporta\xE7\xE3o -->
            <div class="qrcode-actions-row">
              <button id="qr-clear-btn" class="btn btn-ghost qrcode-action-btn" title="Limpar e criar novo QR Code">
                ${ICONS.refresh(14)}
                Limpar
              </button>

              <button id="qr-download-png" class="btn btn-primary qrcode-action-btn">
                ${ICONS.download(14)}
                Baixar PNG
              </button>

              <button id="qr-download-svg" class="btn btn-secondary qrcode-action-btn">
                ${ICONS.download(14)}
                Baixar SVG
              </button>

              <button id="qr-copy-clipboard" class="btn btn-ghost qrcode-action-btn">
                ${ICONS.copy(14)}
                Copiar Imagem
              </button>
            </div>

            <!-- Feedback de c\xF3pia -->
            <div id="qr-copy-feedback" class="qrcode-copy-feedback" aria-live="polite" style="display:none;"></div>
          </div>

        </div>
      </div>
    </div>
  `;
  }

  // js/tools/qrcode/tool.js
  var QRCODE_LIB_URL = "js/lib/qrcodegen.js";
  var ECL_DESCRIPTIONS = {
    L: "L \u2014 7% de recupera\xE7\xE3o (menor densidade)",
    M: "M \u2014 15% de recupera\xE7\xE3o (padr\xE3o)",
    Q: "Q \u2014 25% de recupera\xE7\xE3o (alta)",
    H: "H \u2014 30% de recupera\xE7\xE3o (m\xE1ximo)"
  };
  var _activeEcl = "M";
  var _listeners = [];
  var _lastQr = null;
  var _lastFg = "#000000";
  var _lastBg = "#ffffff";
  function _on(el, type, fn) {
    if (!el) return;
    el.addEventListener(type, fn);
    _listeners.push({ el, type, fn });
  }
  function _getEcc(key) {
    const { QrCode } = window.qrcodegen;
    return {
      L: QrCode.Ecc.LOW,
      M: QrCode.Ecc.MEDIUM,
      Q: QrCode.Ecc.QUARTILE,
      H: QrCode.Ecc.HIGH
    }[key] || QrCode.Ecc.MEDIUM;
  }
  function _drawQrOnCanvas(qr, canvas, canvasSize, fgColor, bgColor, border = 4) {
    const n = qr.size;
    const scale = Math.floor(canvasSize / (n + border * 2));
    const off = Math.floor((canvasSize - scale * n) / 2);
    canvas.width = canvasSize;
    canvas.height = canvasSize;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, canvasSize, canvasSize);
    ctx.fillStyle = fgColor;
    for (let y = 0; y < n; y++) {
      for (let x = 0; x < n; x++) {
        if (qr.getModule(x, y)) {
          ctx.fillRect(off + x * scale, off + y * scale, scale, scale);
        }
      }
    }
  }
  function _qrToSvgString(qr, fgColor, bgColor, border = 4) {
    const n = qr.size;
    const dim = n + border * 2;
    const parts = [];
    for (let y = 0; y < n; y++) {
      for (let x = 0; x < n; x++) {
        if (qr.getModule(x, y)) {
          parts.push(`M${x + border},${y + border}h1v1h-1z`);
        }
      }
    }
    return `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 ${dim} ${dim}" stroke="none">
  <rect width="${dim}" height="${dim}" fill="${bgColor}"/>
  <path d="${parts.join(" ")}" fill="${fgColor}"/>
</svg>`;
  }
  var tool2 = {
    id: "qrcode",
    label: "QR Code",
    render(container) {
      container.innerHTML = getQRCodeHTML();
    },
    async mount(container) {
      _listeners = [];
      _activeEcl = "M";
      _lastQr = null;
      if (typeof window !== "undefined" && !window.qrcodegen) {
        try {
          await loadScript(QRCODE_LIB_URL);
        } catch (err) {
          console.warn("[qrcode] Falha ao carregar qrcodegen via script tag:", err);
        }
      }
      await new Promise((resolve) => {
        let attempts = 0;
        const check = () => {
          if (typeof window !== "undefined" && window.qrcodegen) {
            resolve();
          } else if (++attempts > 40) {
            console.warn("[qrcode] Timeout aguardando window.qrcodegen");
            resolve();
          } else {
            setTimeout(check, 50);
          }
        };
        check();
      });
      const inputEl = container.querySelector("#qr-input");
      const charCountEl = container.querySelector("#qr-char-count");
      const urlFeedback = container.querySelector("#qr-url-feedback");
      const sizeRangeEl = container.querySelector("#qr-size");
      const sizeDisplayEl = container.querySelector("#qr-size-display");
      const eclGroup = container.querySelector("#qr-ecl");
      const eclHint = container.querySelector("#qr-ecl-hint");
      const colorFgEl = container.querySelector("#qr-color-fg");
      const colorFgHexEl = container.querySelector("#qr-color-fg-hex");
      const colorFgPrev = container.querySelector("#qr-color-fg-preview");
      const colorBgEl = container.querySelector("#qr-color-bg");
      const colorBgHexEl = container.querySelector("#qr-color-bg-hex");
      const colorBgPrev = container.querySelector("#qr-color-bg-preview");
      const generateBtn = container.querySelector("#qr-generate-btn");
      const emptyState = container.querySelector("#qr-empty-state");
      const loadingState = container.querySelector("#qr-loading-state");
      const resultEl = container.querySelector("#qr-result");
      const canvasWrap = container.querySelector("#qr-canvas-container");
      const metaSizeEl = container.querySelector("#qr-meta-size");
      const metaEclEl = container.querySelector("#qr-meta-ecl");
      const metaCharsEl = container.querySelector("#qr-meta-chars");
      const downloadPng = container.querySelector("#qr-download-png");
      const downloadSvg = container.querySelector("#qr-download-svg");
      const pasteBtn = container.querySelector("#qr-paste-btn");
      const copyClipboard = container.querySelector("#qr-copy-clipboard");
      const copyFeedback = container.querySelector("#qr-copy-feedback");
      function _isUrl(str) {
        try {
          return Boolean(new URL(str));
        } catch {
          return false;
        }
      }
      function _updateUrlFeedback(val) {
        if (!val.trim()) {
          urlFeedback.textContent = "";
          urlFeedback.className = "qrcode-url-feedback";
          return;
        }
        if (_isUrl(val.trim())) {
          urlFeedback.textContent = "\u2713 URL v\xE1lida detectada";
          urlFeedback.className = "qrcode-url-feedback qrcode-url-feedback--valid";
        } else {
          urlFeedback.textContent = "Texto livre (n\xE3o \xE9 uma URL)";
          urlFeedback.className = "qrcode-url-feedback qrcode-url-feedback--text";
        }
      }
      function _syncColorFromPicker(pickerEl, hexEl, prevEl) {
        const val = pickerEl.value;
        hexEl.value = val.toUpperCase();
        prevEl.style.background = val;
      }
      function _syncColorFromHex(hexEl, pickerEl, prevEl) {
        const val = hexEl.value.trim();
        if (/^#[0-9A-Fa-f]{6}$/.test(val)) {
          pickerEl.value = val;
          prevEl.style.background = val;
        }
      }
      function _setState(state2) {
        emptyState.style.display = state2 === "empty" ? "" : "none";
        loadingState.style.display = state2 === "loading" ? "" : "none";
        resultEl.style.display = state2 === "result" ? "" : "none";
      }
      async function _generate() {
        const text = inputEl.value.trim();
        if (!text) return;
        const size = parseInt(sizeRangeEl.value, 10);
        const fgColor = colorFgEl.value;
        const bgColor = colorBgEl.value;
        const ecl = _getEcc(_activeEcl);
        _setState("loading");
        await new Promise((r) => setTimeout(r, 10));
        try {
          const qr = qrcodegen.QrCode.encodeText(text, ecl);
          _lastQr = qr;
          _lastFg = fgColor;
          _lastBg = bgColor;
          const canvas = document.createElement("canvas");
          _drawQrOnCanvas(qr, canvas, size, fgColor, bgColor);
          canvasWrap.innerHTML = "";
          canvasWrap.appendChild(canvas);
          metaSizeEl.textContent = `${size} \xD7 ${size} px`;
          metaEclEl.textContent = `ECL: ${_activeEcl}`;
          metaCharsEl.textContent = `${text.length} caractere${text.length !== 1 ? "s" : ""}`;
          _setState("result");
          resultEl.scrollIntoView({ behavior: "smooth", block: "nearest" });
        } catch (err) {
          console.error("[QR Code] Falha na gera\xE7\xE3o:", err);
          _setState("empty");
          urlFeedback.textContent = `\u26A0 Erro: ${err.message || "Falha ao gerar QR Code"}`;
          urlFeedback.className = "qrcode-url-feedback qrcode-url-feedback--error";
        }
      }
      function _downloadPng() {
        if (!_lastQr) return;
        const canvas = canvasWrap.querySelector("canvas");
        if (!canvas) return;
        const link = document.createElement("a");
        link.download = `qrcode-${Date.now()}.png`;
        link.href = canvas.toDataURL("image/png");
        link.click();
      }
      function _downloadSvg() {
        if (!_lastQr) return;
        try {
          const svgString = _qrToSvgString(_lastQr, _lastFg, _lastBg);
          const blob = new Blob([svgString], { type: "image/svg+xml" });
          const url = URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.download = `qrcode-${Date.now()}.svg`;
          link.href = url;
          link.click();
          setTimeout(() => URL.revokeObjectURL(url), 1e4);
        } catch (err) {
          console.error("[QR Code] Falha ao exportar SVG:", err);
        }
      }
      async function _copyToClipboard() {
        const canvas = canvasWrap.querySelector("canvas");
        if (!canvas) return;
        try {
          const blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/png"));
          await navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]);
          _showCopyFeedback("\u2713 Imagem copiada para a \xE1rea de transfer\xEAncia!", "success");
        } catch {
          try {
            await navigator.clipboard.writeText(canvas.toDataURL("image/png"));
            _showCopyFeedback("\u2713 Data URL copiado.", "success");
          } catch {
            _showCopyFeedback('\u26A0 N\xE3o foi poss\xEDvel copiar. Use "Baixar PNG".', "error");
          }
        }
      }
      function _showCopyFeedback(msg, type) {
        copyFeedback.textContent = msg;
        copyFeedback.className = `qrcode-copy-feedback qrcode-copy-feedback--${type}`;
        copyFeedback.style.display = "";
        setTimeout(() => {
          copyFeedback.style.display = "none";
        }, 3e3);
      }
      const _syncInputState = () => {
        const val = inputEl.value;
        charCountEl.textContent = val.length;
        generateBtn.disabled = !val.trim();
        _updateUrlFeedback(val);
      };
      _on(inputEl, "input", _syncInputState);
      _on(inputEl, "paste", () => {
        setTimeout(_syncInputState, 0);
      });
      if (pasteBtn) {
        _on(pasteBtn, "click", async () => {
          try {
            if (navigator.clipboard && typeof navigator.clipboard.readText === "function") {
              const text = await navigator.clipboard.readText();
              if (text) {
                inputEl.value = text;
                _syncInputState();
                inputEl.focus();
              }
            } else {
              inputEl.focus();
              inputEl.select();
            }
          } catch (err) {
            console.warn("[qrcode] Acesso ao clipboard bloqueado pelo navegador:", err);
            inputEl.focus();
          }
        });
      }
      _on(inputEl, "keydown", (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
          e.preventDefault();
          if (!generateBtn.disabled) _generate();
        }
      });
      _on(sizeRangeEl, "input", () => {
        sizeDisplayEl.textContent = sizeRangeEl.value;
      });
      eclGroup.querySelectorAll(".qrcode-ecl-btn").forEach((btn) => {
        _on(btn, "click", () => {
          _activeEcl = btn.dataset.ecl;
          eclGroup.querySelectorAll(".qrcode-ecl-btn").forEach(
            (b) => b.classList.toggle("qrcode-ecl-btn--active", b === btn)
          );
          eclHint.textContent = ECL_DESCRIPTIONS[_activeEcl];
        });
      });
      _on(colorFgEl, "input", () => _syncColorFromPicker(colorFgEl, colorFgHexEl, colorFgPrev));
      _on(colorFgHexEl, "input", () => _syncColorFromHex(colorFgHexEl, colorFgEl, colorFgPrev));
      _on(colorBgEl, "input", () => _syncColorFromPicker(colorBgEl, colorBgHexEl, colorBgPrev));
      _on(colorBgHexEl, "input", () => _syncColorFromHex(colorBgHexEl, colorBgEl, colorBgPrev));
      _on(generateBtn, "click", _generate);
      const clearBtn = container.querySelector("#qr-clear-btn");
      if (clearBtn) {
        _on(clearBtn, "click", () => {
          inputEl.value = "";
          charCountEl.textContent = "0";
          urlFeedbackEl.textContent = "";
          generateBtn.disabled = true;
          _lastQr = null;
          _setState("empty");
          inputEl.focus();
        });
      }
      _on(downloadPng, "click", _downloadPng);
      _on(downloadSvg, "click", _downloadSvg);
      _on(copyClipboard, "click", _copyToClipboard);
      const _regenerateIfActive = () => {
        if (_lastQr) _generate();
      };
      _on(sizeRangeEl, "change", _regenerateIfActive);
      _on(colorFgEl, "change", _regenerateIfActive);
      _on(colorBgEl, "change", _regenerateIfActive);
    },
    unmount() {
      _listeners.forEach(({ el, type, fn }) => {
        try {
          el.removeEventListener(type, fn);
        } catch {
        }
      });
      _listeners = [];
      _lastQr = null;
    }
  };
  var tool_default2 = tool2;

  // js/tools/hub/ui.js
  function getHubHTML(catalog = []) {
    const tools = catalog.filter((t) => t.id !== "hub");
    return `
    <div class="hub-root">
      <!-- Cabe\xE7alho Principal do Hub -->
      <section class="hub-hero">
        <div class="hub-hero-badge">
          ${ICONS.shield(14)}
          Plataforma 100% Local &amp; Segura
        </div>
        <h1 class="hub-hero-title">Todas as Ferramentas Open Tool</h1>
        <p class="hub-hero-subtitle">
          Solu\xE7\xF5es pr\xE1ticas e universais executadas inteiramente no seu navegador. Seus dados nunca saem do seu computador.
        </p>
      </section>

      <!-- Grade de Ferramentas Compactas (Hub Grid) -->
      <div class="hub-grid" id="hub-tools-grid">
        ${tools.map((tool4) => {
      let badge = "UTILIT\xC1RIO";
      if (tool4.id === "doc2md") {
        badge = "CONVERSOR";
      } else if (tool4.id === "qrcode") {
        badge = "GERADOR";
      } else if (tool4.id === "img2vector") {
        badge = "VETORIZADOR";
      } else if (tool4.id === "pdf-unlock") {
        badge = "DESBLOQUEADOR";
      } else if (tool4.id === "pdf-compress") {
        badge = "COMPRESSOR";
      } else if (tool4.id === "pdf-merge") {
        badge = "MESCLADOR";
      } else if (tool4.id === "pdf-split") {
        badge = "DIVISOR";
      }
      return `
            <article class="hub-card" data-tool-card="${tool4.id}" tabindex="0" role="button" aria-label="Abrir ferramenta ${tool4.label}">
              <div class="hub-card-top">
                <div class="hub-card-icon-wrap" aria-hidden="true">
                  ${tool4.icon}
                </div>
                <span class="hub-card-badge">${badge}</span>
              </div>

              <div class="hub-card-content">
                <h2 class="hub-card-title">${tool4.label}</h2>
              </div>

              <div class="hub-card-action">
                <button type="button" class="btn btn-primary hub-card-btn" data-open-tool="${tool4.id}">
                  <span>Abrir Ferramenta</span>
                  ${ICONS.arrowRight(14)}
                </button>
              </div>
            </article>
          `;
    }).join("")}

        <!-- Card de Extensibilidade (Pr\xF3ximas Ferramentas) -->
        <article class="hub-card hub-card--extensible" title="Arquitetura modular aberta para novas ferramentas">
          <div class="hub-card-top">
            <div class="hub-card-icon-wrap hub-card-icon-wrap--dashed" aria-hidden="true">
              ${ICONS.plus(18)}
            </div>
            <span class="hub-card-badge hub-card-badge--neutral">MODULAR</span>
          </div>

          <div class="hub-card-content">
            <h2 class="hub-card-title">Novas Ferramentas</h2>
          </div>

          <div class="hub-card-action">
            <div class="hub-card-hint">
              <span>Em breve novas adi\xE7\xF5es</span>
            </div>
          </div>
        </article>
      </div>
    </div>
  `;
  }

  // js/tools/hub/tool.js
  var _listeners2 = [];
  var tool3 = {
    id: "hub",
    label: "Todas as Ferramentas",
    render(container) {
      container.innerHTML = getHubHTML(TOOL_CATALOG);
    },
    async mount(container) {
      _listeners2 = [];
      const grid = container.querySelector("#hub-tools-grid");
      if (grid) {
        const handleCardClick = (e) => {
          const btn = e.target.closest("[data-open-tool]");
          if (btn) {
            e.preventDefault();
            const targetId = btn.dataset.openTool;
            if (targetId) activateTool(targetId);
            return;
          }
          const card = e.target.closest("[data-tool-card]");
          if (card && !e.target.closest("button, a")) {
            const targetId = card.dataset.toolCard;
            if (targetId) activateTool(targetId);
          }
        };
        const handleKey = (e) => {
          if (e.key === "Enter" || e.key === " ") {
            const card = e.target.closest("[data-tool-card]");
            if (card) {
              e.preventDefault();
              const targetId = card.dataset.toolCard;
              if (targetId) activateTool(targetId);
            }
          }
        };
        grid.addEventListener("click", handleCardClick);
        grid.addEventListener("keydown", handleKey);
        _listeners2.push(
          () => grid.removeEventListener("click", handleCardClick),
          () => grid.removeEventListener("keydown", handleKey)
        );
      }
    },
    unmount() {
      _listeners2.forEach((fn) => {
        try {
          fn();
        } catch (e) {
        }
      });
      _listeners2 = [];
    }
  };
  var tool_default3 = tool3;

  // js/tools/img2vector/ui.js
  function getImageToVectorHTML() {
    return `
    <div class="img2vector-tool-root">

      <section class="img2vector-hero">
        <header class="hero-header">
          <div class="img2vector-badge">
            ${ICONS.toolVector(12)}
            Vetoriza\xE7\xE3o Curvas B\xE9zier
          </div>
          <h2 class="hero-title">Image to Vector</h2>
          <p class="hero-subtitle">
            Transforme imagens rasterizadas em gr\xE1ficos vetoriais SVG escal\xE1veis com fidelidade matem\xE1tica. 100% local \u2014 zero tr\xE1fego de rede.
          </p>
        </header>
      </section>

      <div class="img2vector-workspace">

        <!-- Coluna Esquerda: Entrada & Controles -->
        <div class="img2vector-controls-panel">

          <!-- Dropzone de Imagem Compacto -->
          <div class="img2vector-dropzone" id="v-dropzone" tabindex="0" role="button" aria-label="Carregar imagem para vetoriza\xE7\xE3o">
            <input type="file" id="v-file-input" accept="image/png,image/jpeg,image/webp,image/bmp,image/gif" class="v-hidden-input">
            <div class="v-dropzone-content" id="v-dropzone-prompt">
              <div class="v-dropzone-icon">
                ${ICONS.image(22)}
              </div>
              <div class="v-dropzone-text">
                <p class="v-dropzone-title">Arraste uma imagem ou <span class="v-link">selecione</span></p>
                <p class="v-dropzone-sub">PNG, JPG, WEBP, BMP at\xE9 20MB \u2022 Ctrl+V</p>
              </div>
            </div>

            <!-- Preview da Imagem Carregada -->
            <div class="v-image-loaded" id="v-image-loaded" style="display: none;">
              <img id="v-preview-img" alt="Imagem original carregada" class="v-thumbnail">
              <div class="v-loaded-info">
                <span class="v-filename" id="v-filename">imagem.png</span>
                <span class="v-filesize" id="v-filesize">0 KB</span>
              </div>
            </div>
          </div>

          <!-- Bot\xE3o Limpar abaixo da Imagem -->
          <button type="button" id="v-clear-input-btn" class="pdf-file-clear-btn" style="display: none;" title="Limpar imagem e carregar outra">
            ${ICONS.trash(14)}
            <span>Limpar Imagem</span>
          </button>

          <!-- Remo\xE7\xE3o Inteligente de Fundo (Em Linha Compacta) -->
          <div class="v-bg-remover-card" id="v-bg-remover-card">
            <div class="v-bg-remover-row">
              <div class="v-bg-remover-info">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="v-bg-icon">
                  <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"></path>
                </svg>
                <div class="v-bg-text-wrap">
                  <span class="v-bg-remover-title">Remover Fundo</span>
                  <span class="v-bg-badge" id="v-bg-badge">Desativado</span>
                </div>
              </div>
              <button type="button" class="v-bg-btn" id="v-remove-bg-btn" disabled>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="9" y1="3" x2="9" y2="21"></line>
                  <path d="m14 8 4 4-4 4"></path>
                </svg>
                <span id="v-remove-bg-btn-text">Ativar Remo\xE7\xE3o</span>
              </button>
            </div>
          </div>

          <!-- Presets de Vetoriza\xE7\xE3o (Grid 3x2 Compacto) -->
          <div class="img2vector-field-group">
            <label class="img2vector-label">Modo / Preset</label>
            <div class="v-preset-grid" id="v-preset-grid">
              <button type="button" class="v-preset-btn v-preset-btn--active" data-preset="bw">
                <div class="v-preset-head">
                  <span class="v-preset-icon">${ICONS.penTool(14)}</span>
                  <span class="v-preset-title">Logotipo</span>
                </div>
                <span class="v-preset-desc">2 cores P&B</span>
              </button>
              <button type="button" class="v-preset-btn" data-preset="balanced">
                <div class="v-preset-head">
                  <span class="v-preset-icon">${ICONS.palette(14)}</span>
                  <span class="v-preset-title">Equilibrado</span>
                </div>
                <span class="v-preset-desc">16 cores</span>
              </button>
              <button type="button" class="v-preset-btn" data-preset="detailed">
                <div class="v-preset-head">
                  <span class="v-preset-icon">${ICONS.sparkles(14)}</span>
                  <span class="v-preset-title">Alta Fid.</span>
                </div>
                <span class="v-preset-desc">32 cores</span>
              </button>
              <button type="button" class="v-preset-btn" data-preset="curvy">
                <div class="v-preset-head">
                  <span class="v-preset-icon">${ICONS.spline(14)}</span>
                  <span class="v-preset-title">Curvas</span>
                </div>
                <span class="v-preset-desc">Suaves</span>
              </button>
              <button type="button" class="v-preset-btn" data-preset="posterized">
                <div class="v-preset-head">
                  <span class="v-preset-icon">${ICONS.layers(14)}</span>
                  <span class="v-preset-title">Poster</span>
                </div>
                <span class="v-preset-desc">Cores s\xF3lidas</span>
              </button>
              <button type="button" class="v-preset-btn" data-preset="grayscale">
                <div class="v-preset-head">
                  <span class="v-preset-icon">${ICONS.contrast(14)}</span>
                  <span class="v-preset-title">Cinza</span>
                </div>
                <span class="v-preset-desc">Monocrom\xE1tico</span>
              </button>
            </div>
          </div>

          <!-- Ajustes Avan\xE7ados -->
          <details class="v-advanced-details">
            <summary class="v-advanced-summary">
              <span>Configura\xE7\xF5es Avan\xE7adas de Tra\xE7ado</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </summary>
            <div class="v-advanced-body">
              <div class="v-range-row">
                <div class="v-range-header">
                  <label for="v-colors-range">N\xFAmero de Cores</label>
                  <span id="v-colors-val" class="v-val-badge">2</span>
                </div>
                <input type="range" id="v-colors-range" min="2" max="64" value="2" class="v-slider">
              </div>

              <div class="v-range-row">
                <div class="v-range-header">
                  <label for="v-blur-range">Filtro de Ru\xEDdo / Suaviza\xE7\xE3o</label>
                  <span id="v-blur-val" class="v-val-badge">0</span>
                </div>
                <input type="range" id="v-blur-range" min="0" max="8" value="0" class="v-slider">
              </div>

              <div class="v-range-row">
                <div class="v-range-header">
                  <label for="v-omit-range">Omitir Ru\xEDdos Menores (pixels)</label>
                  <span id="v-omit-val" class="v-val-badge">8</span>
                </div>
                <input type="range" id="v-omit-range" min="0" max="64" value="8" class="v-slider">
              </div>

              <div class="v-range-row">
                <div class="v-range-header">
                  <label for="v-bgtol-range">Toler\xE2ncia da Remo\xE7\xE3o de Fundo</label>
                  <span id="v-bgtol-val" class="v-val-badge">32</span>
                </div>
                <input type="range" id="v-bgtol-range" min="5" max="100" value="32" class="v-slider">
              </div>
            </div>
          </details>

          <!-- Bot\xE3o Principal de Convers\xE3o -->
          <button type="button" id="v-convert-btn" class="img2vector-primary-btn" disabled>
            ${ICONS.toolVector(18)}
            <span>Vetorizar Imagem para SVG</span>
          </button>
        </div>

        <!-- Coluna Direita: Painel de Visualiza\xE7\xE3o & Exporta\xE7\xE3o -->
        <div class="img2vector-preview-panel">

          <!-- Estado Vazio -->
          <div class="v-empty-view" id="v-empty-view">
            <div class="v-empty-illustration">
              ${ICONS.toolVector(48)}
            </div>
            <h3 class="v-empty-title">Nenhum vetor gerado</h3>
            <p class="v-empty-desc">Carregue uma imagem rasterizada e clique em "Vetorizar Imagem para SVG" para visualizar o resultado.</p>
          </div>

          <!-- Estado Processando com Barra de Progresso Real -->
          <div class="v-loading-view" id="v-loading-view" style="display: none;">
            <div class="open-tool-progress-panel">
              <div class="open-tool-progress-icon-wrap">
                <div class="open-tool-progress-pulse-ring"></div>
                <div class="open-tool-progress-spinner"></div>
              </div>
              <div class="open-tool-progress-header">
                <h4 class="open-tool-progress-title" id="v-loading-title">Vetorizando imagem para SVG...</h4>
                <span class="open-tool-progress-percentage" id="v-progress-pct">0%</span>
              </div>
              <div class="open-tool-progress-track">
                <div class="open-tool-progress-fill" id="v-progress-fill" style="width: 0%;"></div>
              </div>
              <div class="open-tool-progress-footer">
                <span class="open-tool-progress-desc" id="v-loading-desc">Iniciando an\xE1lise de contornos e paleta...</span>
                <span class="open-tool-progress-counter" id="v-progress-counter">Etapa 1 / 4</span>
              </div>
            </div>
          </div>

          <!-- Resultado do Vetor -->
          <div class="v-result-view" id="v-result-view" style="display: none;">
            <!-- Barra de Modos de Visualiza\xE7\xE3o -->
            <div class="v-view-modes">
              <div class="v-segmented-ctrl">
                <button type="button" class="v-mode-btn v-mode-btn--active" data-mode="vector">Vetor SVG</button>
                <button type="button" class="v-mode-btn" data-mode="original">Original</button>
                <button type="button" class="v-mode-btn" data-mode="side">Lado a Lado</button>
              </div>
              <div class="v-zoom-ctrls">
                <button type="button" id="v-zoom-out" class="v-zoom-btn" title="Diminuir Zoom">\u2212</button>
                <span id="v-zoom-val">100%</span>
                <button type="button" id="v-zoom-in" class="v-zoom-btn" title="Aumentar Zoom">+</button>
              </div>
            </div>

            <!-- Palco de Renderiza\xE7\xE3o -->
            <div class="v-stage" id="v-stage">
              <div class="v-stage-content" id="v-stage-content">
                <div id="v-svg-output" class="v-svg-container"></div>
                <img id="v-orig-output" class="v-orig-container" alt="Imagem original" style="display: none;">
              </div>
            </div>

            <!-- Metadados do Vetor -->
            <div class="v-meta-bar">
              <div class="v-meta-item">
                <span class="v-meta-label">Caminhos / Paths:</span>
                <strong id="v-meta-paths" class="v-meta-val">0</strong>
              </div>
              <div class="v-meta-item">
                <span class="v-meta-label">Cores na Paleta:</span>
                <strong id="v-meta-colors" class="v-meta-val">0</strong>
              </div>
              <div class="v-meta-item">
                <span class="v-meta-label">Tamanho SVG:</span>
                <strong id="v-meta-size" class="v-meta-val">0 KB</strong>
              </div>
            </div>

            <!-- A\xE7\xF5es de Exporta\xE7\xE3o e Limpeza -->
            <div class="v-actions-bar">
              <button type="button" id="v-clear-btn" class="v-export-btn v-export-btn--secondary" title="Limpar e vetorizar outra imagem">
                ${ICONS.refresh(15)}
                Nova Imagem
              </button>

              <button type="button" id="v-download-svg" class="v-export-btn v-export-btn--primary">
                ${ICONS.download(15)}
                Baixar SVG
              </button>

              <button type="button" id="v-copy-svg" class="v-export-btn v-export-btn--secondary">
                ${ICONS.copy(15)}
                Copiar C\xF3digo SVG
              </button>
            </div>

            <div id="v-copy-feedback" class="v-copy-feedback" style="display: none;"></div>
          </div>

        </div>

      </div>

    </div>
  `;
  }

  // js/tools/img2vector/tool.js
  var IMAGETRACER_LIB_URL = "js/lib/imagetracer.js";
  var _listeners3 = [];
  var _activePreset = "bw";
  var _currentFile = null;
  var _currentImageSrc = null;
  var _currentSvgString = null;
  var _currentZoom = 1;
  var _bgRemovalActive = false;
  var _cutoutDataUrl = null;
  var _tolTimeout = null;
  function _on2(element, event, handler) {
    if (!element) return;
    element.addEventListener(event, handler);
    _listeners3.push({ element, event, handler });
  }
  function removeBackgroundIntelligent(imgData, tolerance = 32) {
    const width = imgData.width;
    const height = imgData.height;
    const data = imgData.data;
    const totalPixels = width * height;
    const visited = new Uint8Array(totalPixels);
    const queue = new Int32Array(totalPixels);
    let qHead = 0;
    let qTail = 0;
    const edgeSamples = [];
    const stepX = Math.max(1, Math.floor(width / 24));
    const stepY = Math.max(1, Math.floor(height / 24));
    for (let x = 0; x < width; x += stepX) {
      const top = x * 4;
      const bot = ((height - 1) * width + x) * 4;
      if (data[top + 3] > 0) edgeSamples.push([data[top], data[top + 1], data[top + 2]]);
      if (data[bot + 3] > 0) edgeSamples.push([data[bot], data[bot + 1], data[bot + 2]]);
    }
    for (let y = 0; y < height; y += stepY) {
      const left = y * width * 4;
      const right = (y * width + (width - 1)) * 4;
      if (data[left + 3] > 0) edgeSamples.push([data[left], data[left + 1], data[left + 2]]);
      if (data[right + 3] > 0) edgeSamples.push([data[right], data[right + 1], data[right + 2]]);
    }
    if (edgeSamples.length === 0) {
      return imgData;
    }
    let rSum = 0, gSum = 0, bSum = 0;
    for (let i = 0; i < edgeSamples.length; i++) {
      rSum += edgeSamples[i][0];
      gSum += edgeSamples[i][1];
      bSum += edgeSamples[i][2];
    }
    const bgR = Math.round(rSum / edgeSamples.length);
    const bgG = Math.round(gSum / edgeSamples.length);
    const bgB = Math.round(bSum / edgeSamples.length);
    const corners = [
      [data[0], data[1], data[2]],
      [data[(width - 1) * 4], data[(width - 1) * 4 + 1], data[(width - 1) * 4 + 2]],
      [data[(height - 1) * width * 4], data[(height - 1) * width * 4 + 1], data[(height - 1) * width * 4 + 2]],
      [data[((height - 1) * width + width - 1) * 4], data[((height - 1) * width + width - 1) * 4 + 1], data[((height - 1) * width + width - 1) * 4 + 2]]
    ];
    function isBgColor(idx) {
      if (data[idx + 3] === 0) return true;
      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];
      const dr = r - bgR;
      const dg = g - bgG;
      const db = b - bgB;
      if (Math.sqrt(dr * dr + dg * dg + db * db) <= tolerance) {
        return true;
      }
      for (let c = 0; c < corners.length; c++) {
        const cr = r - corners[c][0];
        const cg = g - corners[c][1];
        const cb = b - corners[c][2];
        if (Math.sqrt(cr * cr + cg * cg + cb * cb) <= tolerance * 0.85) {
          return true;
        }
      }
      return false;
    }
    for (let x = 0; x < width; x++) {
      const topIdx = x;
      if (!visited[topIdx] && isBgColor(topIdx * 4)) {
        visited[topIdx] = 1;
        queue[qTail++] = topIdx;
      }
      const botIdx = (height - 1) * width + x;
      if (!visited[botIdx] && isBgColor(botIdx * 4)) {
        visited[botIdx] = 1;
        queue[qTail++] = botIdx;
      }
    }
    for (let y = 0; y < height; y++) {
      const leftIdx = y * width;
      if (!visited[leftIdx] && isBgColor(leftIdx * 4)) {
        visited[leftIdx] = 1;
        queue[qTail++] = leftIdx;
      }
      const rightIdx = y * width + (width - 1);
      if (!visited[rightIdx] && isBgColor(rightIdx * 4)) {
        visited[rightIdx] = 1;
        queue[qTail++] = rightIdx;
      }
    }
    while (qHead < qTail) {
      const p = queue[qHead++];
      const px = p % width;
      const py = p / width | 0;
      if (px > 0) {
        const np = p - 1;
        if (!visited[np] && isBgColor(np * 4)) {
          visited[np] = 1;
          queue[qTail++] = np;
        }
      }
      if (px < width - 1) {
        const np = p + 1;
        if (!visited[np] && isBgColor(np * 4)) {
          visited[np] = 1;
          queue[qTail++] = np;
        }
      }
      if (py > 0) {
        const np = p - width;
        if (!visited[np] && isBgColor(np * 4)) {
          visited[np] = 1;
          queue[qTail++] = np;
        }
      }
      if (py < height - 1) {
        const np = p + width;
        if (!visited[np] && isBgColor(np * 4)) {
          visited[np] = 1;
          queue[qTail++] = np;
        }
      }
    }
    for (let i = 0; i < totalPixels; i++) {
      if (visited[i] === 1) {
        data[i * 4 + 3] = 0;
      }
    }
    return imgData;
  }
  var tool_default4 = {
    id: "img2vector",
    label: "Image to Vector",
    render(container) {
      container.innerHTML = getImageToVectorHTML();
    },
    async mount(container) {
      _listeners3 = [];
      _activePreset = "bw";
      _currentFile = null;
      _currentImageSrc = null;
      _currentSvgString = null;
      _currentZoom = 1;
      _bgRemovalActive = false;
      _cutoutDataUrl = null;
      _tolTimeout = null;
      if (typeof window !== "undefined" && !window.ImageTracer) {
        try {
          await loadScript(IMAGETRACER_LIB_URL);
        } catch (err) {
          console.warn("[img2vector] Falha ao carregar imagetracer:", err);
        }
      }
      const dropzone = container.querySelector("#v-dropzone");
      const fileInput = container.querySelector("#v-file-input");
      const dropPrompt = container.querySelector("#v-dropzone-prompt");
      const loadedBox = container.querySelector("#v-image-loaded");
      const previewImg = container.querySelector("#v-preview-img");
      const filenameEl = container.querySelector("#v-filename");
      const filesizeEl = container.querySelector("#v-filesize");
      const clearInputBtn = container.querySelector("#v-clear-input-btn");
      const convertBtn = container.querySelector("#v-convert-btn");
      const presetGrid = container.querySelector("#v-preset-grid");
      const removeBgBtn = container.querySelector("#v-remove-bg-btn");
      const removeBgBtnText = container.querySelector("#v-remove-bg-btn-text");
      const bgBadge = container.querySelector("#v-bg-badge");
      const bgTolRange = container.querySelector("#v-bgtol-range");
      const bgTolVal = container.querySelector("#v-bgtol-val");
      const colorsRange = container.querySelector("#v-colors-range");
      const colorsVal = container.querySelector("#v-colors-val");
      const blurRange = container.querySelector("#v-blur-range");
      const blurVal = container.querySelector("#v-blur-val");
      const omitRange = container.querySelector("#v-omit-range");
      const omitVal = container.querySelector("#v-omit-val");
      const emptyView = container.querySelector("#v-empty-view");
      const loadingView = container.querySelector("#v-loading-view");
      const resultView = container.querySelector("#v-result-view");
      const stageContent = container.querySelector("#v-stage-content");
      const svgOutput = container.querySelector("#v-svg-output");
      const origOutput = container.querySelector("#v-orig-output");
      const loadingTitle = container.querySelector("#v-loading-title");
      const progressPct = container.querySelector("#v-progress-pct");
      const progressFill = container.querySelector("#v-progress-fill");
      const loadingDesc = container.querySelector("#v-loading-desc");
      const progressCounter = container.querySelector("#v-progress-counter");
      function _updateProgress(pct, title, desc, counter) {
        if (progressPct) progressPct.textContent = `${pct}%`;
        if (progressFill) progressFill.style.width = `${pct}%`;
        if (title && loadingTitle) loadingTitle.textContent = title;
        if (desc && loadingDesc) loadingDesc.textContent = desc;
        if (counter && progressCounter) progressCounter.textContent = counter;
      }
      const metaPaths = container.querySelector("#v-meta-paths");
      const metaColors = container.querySelector("#v-meta-colors");
      const metaSize = container.querySelector("#v-meta-size");
      const downloadSvg = container.querySelector("#v-download-svg");
      const copySvg = container.querySelector("#v-copy-svg");
      const copyFeedback = container.querySelector("#v-copy-feedback");
      const zoomIn = container.querySelector("#v-zoom-in");
      const zoomOut = container.querySelector("#v-zoom-out");
      const zoomVal = container.querySelector("#v-zoom-val");
      const modeBtns = container.querySelectorAll(".v-mode-btn");
      const PRESET_CONFIGS = {
        bw: {
          colors: 2,
          blur: 0,
          omit: 8,
          options: { colorsampling: 2, numberofcolors: 2, colorquantcycles: 2, pathomit: 8, ltres: 1, qtres: 1, strokewidth: 0.5 }
        },
        balanced: {
          colors: 16,
          blur: 0,
          omit: 8,
          options: { colorsampling: 2, numberofcolors: 16, colorquantcycles: 3, pathomit: 8, ltres: 1, qtres: 1, strokewidth: 0.5 }
        },
        detailed: {
          colors: 32,
          blur: 0,
          omit: 6,
          options: { colorsampling: 2, numberofcolors: 32, colorquantcycles: 3, pathomit: 6, ltres: 0.5, qtres: 0.5, roundcoords: 2, strokewidth: 0.5 }
        },
        curvy: {
          colors: 16,
          blur: 2,
          omit: 8,
          options: { colorsampling: 2, ltres: 0.01, linefilter: true, rightangleenhance: false, numberofcolors: 16, blurradius: 2, strokewidth: 0.5 }
        },
        posterized: {
          colors: 6,
          blur: 3,
          omit: 12,
          options: { colorsampling: 2, numberofcolors: 6, blurradius: 3, pathomit: 12, strokewidth: 0 }
        },
        grayscale: {
          colors: 8,
          blur: 0,
          omit: 8,
          options: { colorsampling: 0, colorquantcycles: 1, numberofcolors: 8, pathomit: 8, strokewidth: 0.5 }
        }
      };
      function _syncPresetControls(presetKey) {
        const conf = PRESET_CONFIGS[presetKey];
        if (!conf) return;
        colorsRange.value = conf.colors;
        colorsVal.textContent = conf.colors;
        blurRange.value = conf.blur;
        blurVal.textContent = conf.blur;
        omitRange.value = conf.omit;
        omitVal.textContent = conf.omit;
      }
      function _handleFile(file) {
        if (!file || !file.type.startsWith("image/")) {
          alert("Por favor selecione um arquivo de imagem v\xE1lido (PNG, JPG, WEBP, BMP, etc.).");
          return;
        }
        _currentFile = file;
        _bgRemovalActive = false;
        _cutoutDataUrl = null;
        if (_currentImageSrc) {
          URL.revokeObjectURL(_currentImageSrc);
        }
        _currentImageSrc = URL.createObjectURL(file);
        previewImg.src = _currentImageSrc;
        origOutput.src = _currentImageSrc;
        filenameEl.textContent = file.name;
        filesizeEl.textContent = _formatBytes5(file.size);
        removeBgBtn.disabled = false;
        removeBgBtn.classList.remove("v-bg-btn--active");
        removeBgBtnText.textContent = "Remover Fundo";
        bgBadge.textContent = "Desativado";
        bgBadge.classList.remove("v-bg-badge--active");
        dropPrompt.style.display = "none";
        loadedBox.style.display = "flex";
        convertBtn.disabled = false;
        if (clearInputBtn) clearInputBtn.style.display = "inline-flex";
      }
      function _resetFile() {
        _currentFile = null;
        _bgRemovalActive = false;
        _cutoutDataUrl = null;
        if (_currentImageSrc) {
          URL.revokeObjectURL(_currentImageSrc);
          _currentImageSrc = null;
        }
        fileInput.value = "";
        previewImg.src = "";
        origOutput.src = "";
        dropPrompt.style.display = "flex";
        loadedBox.style.display = "none";
        convertBtn.disabled = true;
        if (clearInputBtn) clearInputBtn.style.display = "none";
        removeBgBtn.disabled = true;
        removeBgBtn.classList.remove("v-bg-btn--active");
        removeBgBtnText.textContent = "Remover Fundo";
        bgBadge.textContent = "Desativado";
        bgBadge.classList.remove("v-bg-badge--active");
        _setViewState("empty");
        _currentSvgString = null;
      }
      function _updateCutoutPreviews() {
        if (!_currentImageSrc) return;
        const tol = parseInt(bgTolRange.value, 10) || 32;
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = () => {
          let w = img.naturalWidth || img.width;
          let h = img.naturalHeight || img.height;
          const maxDim = 800;
          if (w > maxDim || h > maxDim) {
            if (w > h) {
              h = Math.round(h * maxDim / w);
              w = maxDim;
            } else {
              w = Math.round(w * maxDim / h);
              h = maxDim;
            }
          }
          const c = document.createElement("canvas");
          c.width = w;
          c.height = h;
          const cx = c.getContext("2d");
          cx.drawImage(img, 0, 0, w, h);
          let imgData = cx.getImageData(0, 0, w, h);
          imgData = removeBackgroundIntelligent(imgData, tol);
          cx.putImageData(imgData, 0, 0);
          _cutoutDataUrl = c.toDataURL("image/png");
          previewImg.src = _cutoutDataUrl;
          origOutput.src = _cutoutDataUrl;
        };
        img.src = _currentImageSrc;
      }
      function _toggleBgRemoval() {
        if (!_currentFile && !_currentImageSrc) return;
        _bgRemovalActive = !_bgRemovalActive;
        if (_bgRemovalActive) {
          bgBadge.textContent = "\u2713 Fundo Removido";
          bgBadge.classList.add("v-bg-badge--active");
          removeBgBtn.classList.add("v-bg-btn--active");
          removeBgBtnText.textContent = "Restaurar Fundo";
          _updateCutoutPreviews();
          if (_currentSvgString) {
            _vectorize();
          }
        } else {
          bgBadge.textContent = "Desativado";
          bgBadge.classList.remove("v-bg-badge--active");
          removeBgBtn.classList.remove("v-bg-btn--active");
          removeBgBtnText.textContent = "Remover Fundo";
          _cutoutDataUrl = null;
          previewImg.src = _currentImageSrc;
          origOutput.src = _currentImageSrc;
          if (_currentSvgString) {
            _vectorize();
          }
        }
      }
      function _formatBytes5(bytes) {
        if (bytes < 1024) return bytes + " B";
        if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
        return (bytes / 1048576).toFixed(2) + " MB";
      }
      function _setViewState(state2) {
        emptyView.style.display = state2 === "empty" ? "flex" : "none";
        loadingView.style.display = state2 === "loading" ? "flex" : "none";
        resultView.style.display = state2 === "result" ? "flex" : "none";
      }
      async function _vectorize() {
        if (!_currentImageSrc) return;
        _setViewState("loading");
        _updateProgress(15, "Preparando imagem...", "Amostrando pixels e normalizando dimens\xF5es...", "Etapa 1 / 4");
        await new Promise((r) => setTimeout(r, 25));
        const tracer = typeof window !== "undefined" && window.ImageTracer ? window.ImageTracer : null;
        if (!tracer) {
          alert("Biblioteca de vetoriza\xE7\xE3o n\xE3o inicializada. Tente recarregar a p\xE1gina.");
          _setViewState("empty");
          return;
        }
        const numColors = parseInt(colorsRange.value, 10);
        const blurRad = parseInt(blurRange.value, 10);
        const omitPx = parseInt(omitRange.value, 10);
        const baseOpts = PRESET_CONFIGS[_activePreset] && PRESET_CONFIGS[_activePreset].options || {};
        const options = Object.assign({}, baseOpts, {
          numberofcolors: numColors,
          blurradius: blurRad,
          pathomit: omitPx,
          viewbox: true,
          scale: 1,
          roundcoords: 1
        });
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = async () => {
          try {
            _updateProgress(35, "Quantizando paleta...", `Agrupando em ${numColors} cores indexadas...`, "Etapa 2 / 4");
            await new Promise((r) => setTimeout(r, 20));
            let targetW = img.naturalWidth || img.width;
            let targetH = img.naturalHeight || img.height;
            const maxDim = 1200;
            if (targetW > maxDim || targetH > maxDim) {
              if (targetW > targetH) {
                targetH = Math.round(targetH * maxDim / targetW);
                targetW = maxDim;
              } else {
                targetW = Math.round(targetW * maxDim / targetH);
                targetH = maxDim;
              }
            }
            const canvas = document.createElement("canvas");
            canvas.width = targetW;
            canvas.height = targetH;
            const ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0, targetW, targetH);
            let imgData = ctx.getImageData(0, 0, targetW, targetH);
            if (_bgRemovalActive) {
              _updateProgress(50, "Isolando plano de fundo...", "Removendo fundo por inunda\xE7\xE3o inteligente...", "Etapa 2 / 4");
              await new Promise((r) => setTimeout(r, 20));
              const tol = parseInt(bgTolRange.value, 10) || 32;
              imgData = removeBackgroundIntelligent(imgData, tol);
              ctx.putImageData(imgData, 0, 0);
            }
            _updateProgress(70, "Tra\xE7ando curvas B\xE9zier...", "Calculando splines c\xFAbicas e n\xF3s vetoriais...", "Etapa 3 / 4");
            await new Promise((r) => setTimeout(r, 20));
            const svgStr = tracer.imagedataToSVG(imgData, options);
            _currentSvgString = svgStr;
            _updateProgress(95, "Otimizando n\xF3s e caminhos...", "Formatando marca\xE7\xE3o SVG escal\xE1vel...", "Etapa 4 / 4");
            await new Promise((r) => setTimeout(r, 20));
            svgOutput.innerHTML = svgStr;
            const svgEl = svgOutput.querySelector("svg");
            if (svgEl) {
              svgEl.setAttribute("width", targetW);
              svgEl.setAttribute("height", targetH);
              svgEl.setAttribute("viewBox", `0 0 ${targetW} ${targetH}`);
              svgEl.style.width = "100%";
              svgEl.style.height = "100%";
              svgEl.style.maxWidth = "100%";
              svgEl.style.maxHeight = "380px";
              svgEl.style.display = "block";
            }
            const pathMatches = svgStr.match(/<path /gi);
            const pathCount = pathMatches ? pathMatches.length : 0;
            const svgBytes = new Blob([svgStr], { type: "image/svg+xml" }).size;
            metaPaths.textContent = pathCount.toLocaleString("pt-BR");
            metaColors.textContent = numColors;
            metaSize.textContent = _formatBytes5(svgBytes);
            _updateProgress(100, "Vetoriza\xE7\xE3o Conclu\xEDda!", "Renderizando SVG...", "Pronto");
            await new Promise((r) => setTimeout(r, 20));
            _setViewState("result");
            _applyViewMode("vector");
          } catch (err) {
            console.error("[img2vector] Erro ao processar:", err);
            alert("Erro ao vetorizar a imagem: " + (err.message || err));
            _setViewState("empty");
          }
        };
        img.onerror = () => {
          alert("Falha ao decodificar os pixels da imagem.");
          _setViewState("empty");
        };
        img.src = _currentImageSrc;
      }
      function _applyViewMode(mode) {
        modeBtns.forEach((btn) => {
          btn.classList.toggle("v-mode-btn--active", btn.dataset.mode === mode);
        });
        if (mode === "vector") {
          svgOutput.style.display = "flex";
          origOutput.style.display = "none";
          stageContent.style.flexDirection = "row";
        } else if (mode === "original") {
          svgOutput.style.display = "none";
          origOutput.style.display = "block";
          stageContent.style.flexDirection = "row";
        } else if (mode === "side") {
          svgOutput.style.display = "flex";
          origOutput.style.display = "block";
          stageContent.style.flexDirection = "row";
        }
      }
      function _setZoom(val) {
        _currentZoom = Math.min(Math.max(val, 0.4), 3);
        stageContent.style.transform = `scale(${_currentZoom})`;
        zoomVal.textContent = `${Math.round(_currentZoom * 100)}%`;
      }
      function _downloadSvgFile() {
        if (!_currentSvgString) return;
        const blob = new Blob([_currentSvgString], { type: "image/svg+xml" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        const baseName = _currentFile ? _currentFile.name.replace(/\.[^/.]+$/, "") : "vetor";
        a.download = `${baseName}-vector.svg`;
        a.href = url;
        a.click();
        setTimeout(() => URL.revokeObjectURL(url), 1e4);
      }
      async function _copySvgCode() {
        if (!_currentSvgString) return;
        try {
          await navigator.clipboard.writeText(_currentSvgString);
          _showCopyFeedback("\u2713 C\xF3digo SVG copiado para a \xE1rea de transfer\xEAncia!");
        } catch {
          _showCopyFeedback("\u26A0 N\xE3o foi poss\xEDvel copiar. Baixe o arquivo SVG.");
        }
      }
      function _showCopyFeedback(msg) {
        copyFeedback.textContent = msg;
        copyFeedback.style.display = "block";
        setTimeout(() => {
          copyFeedback.style.display = "none";
        }, 3500);
      }
      _on2(dropzone, "click", () => {
        if (!_currentFile) {
          fileInput.click();
        }
      });
      _on2(fileInput, "change", () => {
        if (fileInput.files && fileInput.files[0]) {
          _handleFile(fileInput.files[0]);
        }
      });
      _on2(dropzone, "dragover", (e) => {
        e.preventDefault();
        dropzone.classList.add("v-drag-over");
      });
      _on2(dropzone, "dragleave", () => {
        dropzone.classList.remove("v-drag-over");
      });
      _on2(dropzone, "drop", (e) => {
        e.preventDefault();
        dropzone.classList.remove("v-drag-over");
        if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0]) {
          _handleFile(e.dataTransfer.files[0]);
        }
      });
      _on2(container, "paste", (e) => {
        if (e.clipboardData && e.clipboardData.files && e.clipboardData.files.length > 0) {
          for (const f of e.clipboardData.files) {
            if (f.type.startsWith("image/")) {
              e.preventDefault();
              _handleFile(f);
              break;
            }
          }
        }
      });
      if (clearInputBtn) {
        _on2(clearInputBtn, "click", (e) => {
          e.stopPropagation();
          _resetFile();
        });
      }
      presetGrid.querySelectorAll(".v-preset-btn").forEach((btn) => {
        _on2(btn, "click", () => {
          _activePreset = btn.dataset.preset;
          presetGrid.querySelectorAll(".v-preset-btn").forEach(
            (b) => b.classList.toggle("v-preset-btn--active", b === btn)
          );
          _syncPresetControls(_activePreset);
        });
      });
      _on2(colorsRange, "input", () => {
        colorsVal.textContent = colorsRange.value;
      });
      _on2(blurRange, "input", () => {
        blurVal.textContent = blurRange.value;
      });
      _on2(omitRange, "input", () => {
        omitVal.textContent = omitRange.value;
      });
      _on2(convertBtn, "click", _vectorize);
      modeBtns.forEach((btn) => {
        _on2(btn, "click", () => _applyViewMode(btn.dataset.mode));
      });
      _on2(zoomIn, "click", () => _setZoom(_currentZoom + 0.2));
      _on2(zoomOut, "click", () => _setZoom(_currentZoom - 0.2));
      const clearBtn = container.querySelector("#v-clear-btn");
      if (clearBtn) _on2(clearBtn, "click", _resetFile);
      _on2(downloadSvg, "click", _downloadSvgFile);
      _on2(copySvg, "click", _copySvgCode);
      _on2(removeBgBtn, "click", _toggleBgRemoval);
      _on2(bgTolRange, "input", () => {
        bgTolVal.textContent = bgTolRange.value;
        if (_bgRemovalActive) {
          clearTimeout(_tolTimeout);
          _tolTimeout = setTimeout(() => {
            if (_bgRemovalActive) {
              _updateCutoutPreviews();
              if (_currentSvgString) {
                _vectorize();
              }
            }
          }, 200);
        }
      });
      _syncPresetControls("bw");
    },
    unmount() {
      if (_tolTimeout) {
        clearTimeout(_tolTimeout);
        _tolTimeout = null;
      }
      _listeners3.forEach(({ element, event, handler }) => {
        try {
          element.removeEventListener(event, handler);
        } catch (e) {
        }
      });
      _listeners3 = [];
      if (_currentImageSrc) {
        try {
          URL.revokeObjectURL(_currentImageSrc);
        } catch (e) {
        }
        _currentImageSrc = null;
      }
      _cutoutDataUrl = null;
      _bgRemovalActive = false;
    }
  };

  // js/tools/pdf-unlock/ui.js
  function getPdfUnlockHTML() {
    return `
    <div class="pdf-unlock-root">

      <section class="pdf-tool-hero">
        <header class="hero-header">
          <div class="pdf-tool-badge">
            ${ICONS.unlock(12)}
            Desbloqueio Criptogr\xE1fico Local
          </div>
          <h2 class="hero-title">Desbloquear PDF</h2>
          <p class="hero-subtitle">
            Remova senhas e restri\xE7\xF5es de permiss\xF5es (edi\xE7\xE3o, c\xF3pia, impress\xE3o) de documentos PDF. 100% local \u2014 zero envio a servidores.
          </p>
        </header>
      </section>

      <div class="pdf-workspace">

        <!-- Coluna Esquerda: Entrada & Controles -->
        <div class="pdf-controls-panel">

          <!-- Dropzone Compacto -->
          <div class="pdf-dropzone" id="u-dropzone" tabindex="0" role="button" aria-label="Carregar arquivo PDF para desbloquear">
            <input type="file" id="u-file-input" accept="application/pdf,.pdf" class="pdf-hidden-input">
            <div class="pdf-dropzone-content" id="u-dropzone-prompt">
              <div class="pdf-dropzone-icon">
                ${ICONS.filePdf(22)}
              </div>
              <div class="pdf-dropzone-text">
                <p class="pdf-dropzone-title">Arraste um PDF ou <span class="pdf-link">selecione</span></p>
                <p class="pdf-dropzone-sub">Qualquer arquivo .PDF protegido ou restrito</p>
              </div>
            </div>

            <!-- Preview do Arquivo Carregado -->
            <div class="pdf-file-loaded" id="u-file-loaded" style="display: none;">
              <div class="pdf-icon-badge">PDF</div>
              <div class="pdf-loaded-info">
                <span class="pdf-filename" id="u-filename">documento.pdf</span>
                <span class="pdf-filesize" id="u-filesize">0 KB</span>
              </div>
            </div>
          </div>

          <!-- Bot\xE3o Limpar abaixo do PDF -->
          <button type="button" id="u-clear-input-btn" class="pdf-file-clear-btn" style="display: none;" title="Limpar arquivo e carregar outro">
            ${ICONS.trash(14)}
            <span>Limpar PDF</span>
          </button>

          <!-- Card de Status da Prote\xE7\xE3o -->
          <div class="pdf-status-card" id="u-status-card">
            <div class="pdf-status-header">
              <div class="pdf-status-title-wrap">
                <span class="pdf-status-icon">${ICONS.lock(16)}</span>
                <span class="pdf-status-title">Status da Criptografia</span>
              </div>
              <span class="pdf-badge" id="u-lock-badge">Aguardando Arquivo</span>
            </div>
            <p class="pdf-status-desc" id="u-status-desc">
              Carregue um PDF para inspecionar permiss\xF5es de impress\xE3o, c\xF3pia e prote\xE7\xE3o por chave criptogr\xE1fica.
            </p>
          </div>

          <!-- Campo de Senha (Condicional/Din\xE2mico) -->
          <div class="pdf-password-group" id="u-password-group" style="display: none;">
            <label for="u-password-input" class="pdf-label">Senha de Abertura do Documento</label>
            <div class="pdf-password-wrap">
              <input type="password" id="u-password-input" class="pdf-input" placeholder="Digite a senha do PDF...">
              <button type="button" id="u-toggle-pwd-btn" class="pdf-pwd-toggle" title="Exibir/ocultar senha">
                ${ICONS.eye(16)}
              </button>
            </div>
            <span class="pdf-hint">A senha ser\xE1 testada exclusivamente no seu navegador para descriptografar os streams.</span>
          </div>

          <!-- Bot\xE3o Principal de Desbloqueio (100% de largura) -->
          <button type="button" id="u-unlock-btn" class="pdf-primary-btn" disabled>
            ${ICONS.unlock(16)}
            <span id="u-unlock-btn-text">Desbloquear PDF Agora</span>
          </button>

        </div>

        <!-- Coluna Direita: Painel de Pr\xE9-visualiza\xE7\xE3o & Download -->
        <div class="pdf-preview-panel">

          <!-- Estado Vazio -->
          <div class="pdf-empty-view" id="u-empty-view">
            <div class="pdf-empty-illustration">
              ${ICONS.unlock(44)}
            </div>
            <h3 class="pdf-empty-title">Nenhum PDF processado</h3>
            <p class="pdf-empty-desc">Carregue um arquivo PDF protegido para visualizar a pr\xE9via da p\xE1gina e remover as restri\xE7\xF5es.</p>
          </div>

          <!-- Estado Processando com Barra de Progresso Real -->
          <div class="pdf-loading-view" id="u-loading-view" style="display: none;">
            <div class="open-tool-progress-panel">
              <div class="open-tool-progress-icon-wrap">
                <div class="open-tool-progress-pulse-ring"></div>
                <div class="open-tool-progress-spinner"></div>
              </div>
              <div class="open-tool-progress-header">
                <h4 class="open-tool-progress-title" id="u-loading-title">Descriptografando documento...</h4>
                <span class="open-tool-progress-percentage" id="u-progress-pct">0%</span>
              </div>
              <div class="open-tool-progress-track">
                <div class="open-tool-progress-fill" id="u-progress-fill" style="width: 0%;"></div>
              </div>
              <div class="open-tool-progress-footer">
                <span class="open-tool-progress-desc" id="u-loading-desc">Iniciando an\xE1lise de permiss\xF5es...</span>
                <span class="open-tool-progress-counter" id="u-progress-counter">0 / 0</span>
              </div>
            </div>
          </div>

          <!-- Estado Conclu\xEDdo / Resultado -->
          <div class="pdf-result-view" id="u-result-view" style="display: none;">
            
            <div class="pdf-result-header">
              <span class="pdf-badge pdf-badge--success">\u2713 100% Desbloqueado</span>
              <span class="pdf-result-summary" id="u-result-summary">Pronto para salvar sem senha</span>
            </div>

            <!-- Palco de Renderiza\xE7\xE3o de P\xE1gina -->
            <div class="pdf-stage" id="u-stage">
              <canvas id="u-preview-canvas" class="pdf-preview-canvas"></canvas>
            </div>

            <!-- Metadados do Arquivo Desbloqueado -->
            <div class="pdf-meta-bar">
              <div class="pdf-meta-item">
                <span class="pdf-meta-label">P\xE1ginas:</span>
                <strong id="u-meta-pages" class="pdf-meta-val">0</strong>
              </div>
              <div class="pdf-meta-item">
                <span class="pdf-meta-label">Permiss\xF5es:</span>
                <strong class="pdf-meta-val" style="color:#10b981;">Totais</strong>
              </div>
              <div class="pdf-meta-item">
                <span class="pdf-meta-label">Tamanho:</span>
                <strong id="u-meta-size" class="pdf-meta-val">0 KB</strong>
              </div>
            </div>

            <!-- A\xE7\xF5es de Download, C\xF3pia e Limpeza para Novo Arquivo -->
            <div class="pdf-actions-bar">
              <button type="button" id="u-result-clear-btn" class="pdf-export-btn pdf-export-btn--secondary" title="Limpar e desbloquear outro PDF">
                ${ICONS.refresh(15)}
                <span>Novo PDF</span>
              </button>
              <button type="button" id="u-copy-text-btn" class="pdf-export-btn pdf-export-btn--secondary" title="Copiar todo o texto do PDF">
                ${ICONS.copy(15)}
                <span id="u-copy-btn-text">Copiar Texto</span>
              </button>
              <button type="button" id="u-download-btn" class="pdf-export-btn pdf-export-btn--primary" title="Baixar arquivo PDF totalmente desbloqueado">
                ${ICONS.download(15)}
                <span>Baixar PDF</span>
              </button>
            </div>

          </div>

        </div>

      </div>

    </div>
  `;
  }

  // js/tools/pdf-unlock/tool.js
  var _listeners4 = [];
  var _currentFile2 = null;
  var _currentArrayBuffer = null;
  var _unlockedPdfBlob = null;
  var _requiresPassword = false;
  function _on3(element, event, handler) {
    if (!element) return;
    element.addEventListener(event, handler);
    _listeners4.push({ element, event, handler });
  }
  function _formatBytes(bytes) {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / 1048576).toFixed(2) + " MB";
  }
  async function _ensureLibs() {
    const promises = [];
    if (typeof window === "undefined" || !window.PDFLib) {
      promises.push(loadScript("js/lib/pdf-lib.min.js").catch((e) => console.warn("pdf-lib load:", e)));
    }
    if (typeof window === "undefined" || !window.pdfjsLib) {
      promises.push(loadScript(APP_CONFIG.CDN.PDFJS).catch((e) => console.warn("pdf.js load:", e)));
    }
    if (typeof window === "undefined" || !window.createQpdfModule) {
      promises.push(loadScript("js/lib/qpdf.js").catch((e) => console.warn("qpdf load:", e)));
    }
    if (promises.length > 0) {
      await Promise.all(promises);
    }
    const pdfjsLib2 = typeof window !== "undefined" && window.pdfjsLib || globalThis.pdfjsLib;
    if (pdfjsLib2 && pdfjsLib2.GlobalWorkerOptions && !pdfjsLib2.GlobalWorkerOptions.workerSrc) {
      pdfjsLib2.GlobalWorkerOptions.workerSrc = APP_CONFIG.CDN.PDFJS_WORKER;
    }
  }
  var tool_default5 = {
    id: "pdf-unlock",
    label: "Desbloquear PDF",
    render(container) {
      container.innerHTML = getPdfUnlockHTML();
    },
    async mount(container) {
      _listeners4 = [];
      _currentFile2 = null;
      _currentArrayBuffer = null;
      _unlockedPdfBlob = null;
      _requiresPassword = false;
      const dropzone = container.querySelector("#u-dropzone");
      const fileInput = container.querySelector("#u-file-input");
      const dropPrompt = container.querySelector("#u-dropzone-prompt");
      const fileLoadedBox = container.querySelector("#u-file-loaded");
      const filenameEl = container.querySelector("#u-filename");
      const filesizeEl = container.querySelector("#u-filesize");
      const removeBtn = container.querySelector("#u-remove-btn");
      const statusCard = container.querySelector("#u-status-card");
      const lockBadge = container.querySelector("#u-lock-badge");
      const statusDesc = container.querySelector("#u-status-desc");
      const passwordGroup = container.querySelector("#u-password-group");
      const passwordInput = container.querySelector("#u-password-input");
      const togglePwdBtn = container.querySelector("#u-toggle-pwd-btn");
      const unlockBtn = container.querySelector("#u-unlock-btn");
      const unlockBtnText = container.querySelector("#u-unlock-btn-text");
      const emptyView = container.querySelector("#u-empty-view");
      const loadingView = container.querySelector("#u-loading-view");
      const resultView = container.querySelector("#u-result-view");
      const previewCanvas = container.querySelector("#u-preview-canvas");
      const metaPages = container.querySelector("#u-meta-pages");
      const metaSize = container.querySelector("#u-meta-size");
      const downloadBtn = container.querySelector("#u-download-btn");
      const copyTextBtn = container.querySelector("#u-copy-text-btn");
      const copyBtnText = container.querySelector("#u-copy-btn-text");
      const clearInputBtn = container.querySelector("#u-clear-input-btn");
      const resultClearBtn = container.querySelector("#u-result-clear-btn");
      const loadingTitle = container.querySelector("#u-loading-title");
      const progressPct = container.querySelector("#u-progress-pct");
      const progressFill = container.querySelector("#u-progress-fill");
      const loadingDesc = container.querySelector("#u-loading-desc");
      const progressCounter = container.querySelector("#u-progress-counter");
      function _setViewState(state2) {
        emptyView.style.display = state2 === "empty" ? "flex" : "none";
        loadingView.style.display = state2 === "loading" ? "flex" : "none";
        resultView.style.display = state2 === "result" ? "flex" : "none";
      }
      function _updateProgress(pct, title, desc, counter) {
        if (progressPct) progressPct.textContent = `${pct}%`;
        if (progressFill) progressFill.style.width = `${pct}%`;
        if (title && loadingTitle) loadingTitle.textContent = title;
        if (desc && loadingDesc) loadingDesc.textContent = desc;
        if (counter && progressCounter) progressCounter.textContent = counter;
      }
      async function _inspectPdf(file) {
        _currentFile2 = file;
        _currentArrayBuffer = await file.arrayBuffer();
        filenameEl.textContent = file.name;
        filesizeEl.textContent = _formatBytes(file.size);
        dropPrompt.style.display = "none";
        fileLoadedBox.style.display = "flex";
        if (clearInputBtn) clearInputBtn.style.display = "inline-flex";
        _requiresPassword = false;
        passwordGroup.style.display = "none";
        passwordInput.value = "";
        await _ensureLibs();
        const pdfjsLib2 = typeof window !== "undefined" && window.pdfjsLib || globalThis.pdfjsLib;
        if (!pdfjsLib2) {
          lockBadge.textContent = "PDF Carregado";
          lockBadge.className = "pdf-badge";
          statusDesc.textContent = "Pronto para remo\xE7\xE3o de restri\xE7\xF5es de impress\xE3o e edi\xE7\xE3o.";
          unlockBtn.disabled = false;
          unlockBtnText.textContent = "Desbloquear PDF";
          return;
        }
        try {
          const loadingTask = pdfjsLib2.getDocument({ data: _currentArrayBuffer.slice(0) });
          loadingTask.onPassword = (callback, reason) => {
            _requiresPassword = true;
            lockBadge.textContent = "Senha de Abertura";
            lockBadge.className = "pdf-badge pdf-badge--warning";
            statusDesc.textContent = "Este arquivo possui uma senha de leitura. Digite a senha abaixo para descriptografar.";
            passwordGroup.style.display = "flex";
            unlockBtn.disabled = false;
            unlockBtnText.textContent = "Descriptografar com Senha";
            passwordInput.focus();
          };
          const doc = await loadingTask.promise;
          lockBadge.textContent = "Restri\xE7\xE3o de Permiss\xF5es";
          lockBadge.className = "pdf-badge pdf-badge--info";
          statusDesc.textContent = "Documento protegido contra c\xF3pia/edi\xE7\xE3o ou sem restri\xE7\xE3o de leitura. Pronto para desbloqueio.";
          unlockBtn.disabled = false;
          unlockBtnText.textContent = "Desbloquear PDF Agora";
        } catch (err) {
          if (err.name === "PasswordException" || _requiresPassword) {
            _requiresPassword = true;
            lockBadge.textContent = "Senha de Abertura";
            lockBadge.className = "pdf-badge pdf-badge--warning";
            statusDesc.textContent = "Este arquivo exige senha para ser aberto. Insira a senha abaixo.";
            passwordGroup.style.display = "flex";
            unlockBtn.disabled = false;
            unlockBtnText.textContent = "Descriptografar com Senha";
          } else {
            lockBadge.textContent = "PDF Carregado";
            lockBadge.className = "pdf-badge";
            statusDesc.textContent = "Pronto para remo\xE7\xE3o de restri\xE7\xF5es de impress\xE3o e edi\xE7\xE3o.";
            unlockBtn.disabled = false;
            unlockBtnText.textContent = "Desbloquear PDF";
          }
        }
      }
      function _reset() {
        _currentFile2 = null;
        _currentArrayBuffer = null;
        _unlockedPdfBlob = null;
        _requiresPassword = false;
        fileInput.value = "";
        dropPrompt.style.display = "flex";
        fileLoadedBox.style.display = "none";
        lockBadge.textContent = "Aguardando Arquivo";
        lockBadge.className = "pdf-badge";
        statusDesc.textContent = "Carregue um PDF para inspecionar permiss\xF5es de impress\xE3o, c\xF3pia e prote\xE7\xE3o por chave criptogr\xE1fica.";
        passwordGroup.style.display = "none";
        passwordInput.value = "";
        if (clearInputBtn) clearInputBtn.style.display = "none";
        unlockBtn.disabled = true;
        unlockBtnText.textContent = "Desbloquear PDF";
        _setViewState("empty");
      }
      async function _doUnlock() {
        if (!_currentArrayBuffer) return;
        _setViewState("loading");
        _updateProgress(10, "Iniciando desbloqueio criptogr\xE1fico...", "Carregando motor nativo WebAssembly...", "Etapa 1 / 3");
        await new Promise((r) => setTimeout(r, 20));
        await _ensureLibs();
        const PDFLib = typeof window !== "undefined" && window.PDFLib || globalThis.PDFLib;
        const pdfjsLib2 = typeof window !== "undefined" && window.pdfjsLib || globalThis.pdfjsLib;
        const createQpdf = typeof window !== "undefined" && window.createQpdfModule || globalThis.createQpdfModule;
        const password = passwordInput.value.trim();
        try {
          let unlockedBytes = null;
          let pageCount = 1;
          const copyBuf = _currentArrayBuffer.slice(0);
          if (createQpdf) {
            _updateProgress(35, "Descriptografando fluxos e permiss\xF5es...", "Removendo travas de c\xF3pia, sele\xE7\xE3o e impress\xE3o (QPDF C++/Wasm)...", "Etapa 2 / 3");
            await new Promise((r) => setTimeout(r, 25));
            const qpdf = await createQpdf({
              locateFile: (file) => {
                if (file.endsWith(".wasm")) return "js/lib/qpdf.wasm";
                return "js/lib/" + file;
              }
            });
            const inPath = "/input.pdf";
            const outPath = "/output.pdf";
            qpdf.FS.writeFile(inPath, new Uint8Array(copyBuf));
            const args = [];
            if (password && password.length > 0) {
              args.push(`--password=${password}`);
            } else {
              args.push("--password=");
            }
            args.push(inPath, "--decrypt", outPath);
            let stderr = "";
            qpdf.printErr = (t) => {
              stderr += t + "\n";
            };
            const exitCode = qpdf.callMain(args);
            if (exitCode === 0) {
              unlockedBytes = qpdf.FS.readFile(outPath);
              try {
                qpdf.FS.unlink(inPath);
              } catch (_) {
              }
              try {
                qpdf.FS.unlink(outPath);
              } catch (_) {
              }
            } else {
              try {
                qpdf.FS.unlink(inPath);
              } catch (_) {
              }
              try {
                qpdf.FS.unlink(outPath);
              } catch (_) {
              }
              if (exitCode === 2 || stderr.toLowerCase().includes("invalid password") || stderr.toLowerCase().includes("password")) {
                _requiresPassword = true;
                passwordGroup.style.display = "flex";
                passwordInput.focus();
                throw new Error("PASSWORD_REQUIRED");
              }
              console.warn("QPDF falhou com c\xF3digo", exitCode, stderr);
            }
          }
          if (!unlockedBytes && PDFLib) {
            _updateProgress(55, "Processando via PDF-Lib...", "Reconstruindo \xE1rvore de objetos sem flags de prote\xE7\xE3o...", "Etapa 2 / 3");
            await new Promise((r) => setTimeout(r, 20));
            try {
              const srcDoc = await PDFLib.PDFDocument.load(copyBuf, { ignoreEncryption: true });
              unlockedBytes = await srcDoc.save();
            } catch (eLib) {
              console.warn("PDF-Lib direto falhou:", eLib);
            }
          }
          if (!unlockedBytes) {
            throw new Error("Falha ao descriptografar documento.");
          }
          _updateProgress(85, "Validando documento...", "Confirmando texto selecion\xE1vel e p\xE1ginas...", "Etapa 3 / 3");
          await new Promise((r) => setTimeout(r, 20));
          if (PDFLib) {
            try {
              const checkDoc = await PDFLib.PDFDocument.load(unlockedBytes);
              pageCount = checkDoc.getPageCount();
            } catch (_) {
            }
          }
          _updateProgress(100, "PDF Desbloqueado com Sucesso!", "Permiss\xF5es e texto selecion\xE1vel liberados.", "100%");
          await new Promise((r) => setTimeout(r, 20));
          _unlockedPdfBlob = new Blob([unlockedBytes], { type: "application/pdf" });
          metaPages.textContent = pageCount;
          metaSize.textContent = _formatBytes(_unlockedPdfBlob.size);
          if (pdfjsLib2) {
            try {
              const previewTask = pdfjsLib2.getDocument({ data: unlockedBytes.slice(0) });
              const previewDoc = await previewTask.promise;
              const firstPage = await previewDoc.getPage(1);
              const stageViewport = firstPage.getViewport({ scale: 1 });
              const scale = Math.min(260 / stageViewport.width, 240 / stageViewport.height);
              const scaledViewport = firstPage.getViewport({ scale: Math.max(scale, 0.4) });
              previewCanvas.width = scaledViewport.width;
              previewCanvas.height = scaledViewport.height;
              const ctx = previewCanvas.getContext("2d");
              await firstPage.render({ canvasContext: ctx, viewport: scaledViewport }).promise;
            } catch (e) {
              console.warn("Miniatura preview n\xE3o dispon\xEDvel:", e);
            }
          }
          _setViewState("result");
        } catch (err) {
          console.error("Falha ao desbloquear PDF:", err);
          _setViewState("empty");
          if (err.message === "PASSWORD_REQUIRED") {
            alert("Este documento exige senha de abertura v\xE1lida. Por favor, insira a senha no campo correspondente.");
          } else {
            alert("Erro ao desbloquear o PDF. Verifique se o arquivo est\xE1 corrompido ou se a senha est\xE1 correta.");
          }
        }
      }
      _on3(dropzone, "click", (e) => {
        if (!_currentFile2) {
          fileInput.click();
        }
      });
      _on3(dropzone, "keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          if (!_currentFile2) fileInput.click();
        }
      });
      _on3(fileInput, "change", (e) => {
        const file = e.target.files && e.target.files[0];
        if (file) _inspectPdf(file);
      });
      _on3(dropzone, "dragover", (e) => {
        e.preventDefault();
        dropzone.classList.add("pdf-drag-over");
      });
      _on3(dropzone, "dragleave", () => dropzone.classList.remove("pdf-drag-over"));
      _on3(dropzone, "drop", (e) => {
        e.preventDefault();
        dropzone.classList.remove("pdf-drag-over");
        const file = e.dataTransfer?.files?.[0];
        if (file && (file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf"))) {
          _inspectPdf(file);
        }
      });
      _on3(togglePwdBtn, "click", () => {
        passwordInput.type = passwordInput.type === "password" ? "text" : "password";
      });
      _on3(unlockBtn, "click", _doUnlock);
      _on3(copyTextBtn, "click", async () => {
        if (!_unlockedPdfBlob || !pdfjsLib) return;
        const originalText = copyBtnText ? copyBtnText.textContent : "Copiar Texto";
        try {
          if (copyBtnText) copyBtnText.textContent = "Copiando...";
          const arr = await _unlockedPdfBlob.arrayBuffer();
          const doc = await pdfjsLib.getDocument({ data: new Uint8Array(arr) }).promise;
          let allText = "";
          for (let i = 1; i <= doc.numPages; i++) {
            const page = await doc.getPage(i);
            const content = await page.getTextContent();
            const pageStr = content.items.map((it) => it.str).join(" ");
            allText += `--- P\xE1gina ${i} ---
${pageStr}

`;
          }
          await navigator.clipboard.writeText(allText.trim());
          if (copyBtnText) copyBtnText.textContent = "Copiado!";
          setTimeout(() => {
            if (copyBtnText) copyBtnText.textContent = originalText;
          }, 2e3);
        } catch (err) {
          console.error("Erro ao copiar texto:", err);
          if (copyBtnText) copyBtnText.textContent = originalText;
          alert("Falha ao extrair texto para a \xE1rea de transfer\xEAncia.");
        }
      });
      _on3(downloadBtn, "click", () => {
        if (!_unlockedPdfBlob) return;
        const originalName = _currentFile2 ? _currentFile2.name.replace(/\.pdf$/i, "") : "documento";
        const outName = `${originalName}_desbloqueado.pdf`;
        const url = URL.createObjectURL(_unlockedPdfBlob);
        const a = document.createElement("a");
        a.href = url;
        a.download = outName;
        document.body.appendChild(a);
        a.click();
        setTimeout(() => {
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
        }, 500);
      });
      _on3(clearInputBtn, "click", _reset);
      _on3(resultClearBtn, "click", _reset);
      _ensureLibs().catch((err) => console.warn("Carregamento de bibliotecas PDF:", err));
    },
    unmount() {
      _listeners4.forEach(({ element, event, handler }) => {
        if (element) element.removeEventListener(event, handler);
      });
      _listeners4 = [];
      _currentFile2 = null;
      _currentArrayBuffer = null;
      _unlockedPdfBlob = null;
    }
  };

  // js/tools/pdf-compress/ui.js
  function getPdfCompressHTML() {
    return `
    <div class="pdf-compress-root">

      <section class="pdf-tool-hero">
        <header class="hero-header">
          <div class="pdf-tool-badge">
            ${ICONS.toolCompress(14)}
            Otimiza\xE7\xE3o por Renderiza\xE7\xE3o &amp; Reamostragem
          </div>
          <h2 class="hero-title">Comprimir PDF</h2>
          <p class="hero-subtitle">
            Reduza drasticamente o tamanho de arquivos PDF pesados e escaneados com reamostragem inteligente de imagens. 100% local no seu navegador.
          </p>
        </header>
      </section>

      <div class="pdf-workspace">

        <!-- Coluna Esquerda: Entrada & Controles de Compress\xE3o -->
        <div class="pdf-controls-panel">

          <!-- Dropzone Compacto -->
          <div class="pdf-dropzone" id="c-dropzone" tabindex="0" role="button" aria-label="Carregar arquivo PDF para comprimir">
            <input type="file" id="c-file-input" accept="application/pdf,.pdf" class="pdf-hidden-input">
            <div class="pdf-dropzone-content" id="c-dropzone-prompt">
              <div class="pdf-dropzone-icon">
                ${ICONS.filePdf(22)}
              </div>
              <div class="pdf-dropzone-text">
                <p class="pdf-dropzone-title">Arraste um PDF ou <span class="pdf-link">selecione</span></p>
                <p class="pdf-dropzone-sub">PDFs escaneados ou volumosos at\xE9 1,5 GB</p>
              </div>
            </div>

            <!-- Preview do Arquivo Carregado -->
            <div class="pdf-file-loaded" id="c-file-loaded" style="display: none;">
              <div class="pdf-icon-badge">PDF</div>
              <div class="pdf-loaded-info">
                <span class="pdf-filename" id="c-filename">documento.pdf</span>
                <span class="pdf-filesize" id="c-filesize">0 KB</span>
              </div>
            </div>
          </div>

          <!-- Bot\xE3o Limpar abaixo do PDF -->
          <button type="button" id="c-clear-input-btn" class="pdf-file-clear-btn" style="display: none;" title="Limpar arquivo e carregar outro">
            ${ICONS.trash(14)}
            <span>Limpar PDF</span>
          </button>

          <!-- N\xEDvel de Compress\xE3o (Presets 3 Colunas) -->
          <div class="pdf-field-group">
            <label class="pdf-label">N\xEDvel de Compress\xE3o</label>
            <div class="pdf-preset-grid" id="c-preset-grid">
              <button type="button" class="pdf-preset-btn" data-preset="extreme">
                <div class="pdf-preset-head">
                  <span class="pdf-preset-icon">${ICONS.zap(14)}</span>
                  <span class="pdf-preset-title">Extrema</span>
                </div>
                <span class="pdf-preset-desc">72 DPI \u2022 Menor peso</span>
              </button>
              <button type="button" class="pdf-preset-btn pdf-preset-btn--active" data-preset="balanced">
                <div class="pdf-preset-head">
                  <span class="pdf-preset-icon">${ICONS.scale(14)}</span>
                  <span class="pdf-preset-title">Recomendada</span>
                </div>
                <span class="pdf-preset-desc">100 DPI \u2022 Equilibrado</span>
              </button>
              <button type="button" class="pdf-preset-btn" data-preset="light">
                <div class="pdf-preset-head">
                  <span class="pdf-preset-icon">${ICONS.diamond(14)}</span>
                  <span class="pdf-preset-title">Alta Nitidez</span>
                </div>
                <span class="pdf-preset-desc">150 DPI \u2022 Mais detalhe</span>
              </button>
            </div>
          </div>

          <!-- Ajustes Manuais Colaps\xE1veis -->
          <details class="pdf-advanced-details">
            <summary class="pdf-advanced-summary">
              <span>Ajustes Finos de Qualidade</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </summary>
            <div class="pdf-advanced-body">
              <div class="pdf-range-row">
                <div class="pdf-range-header">
                  <label for="c-dpi-range">Resolu\xE7\xE3o (DPI)</label>
                  <span id="c-dpi-val" class="pdf-val-badge">100 DPI</span>
                </div>
                <input type="range" id="c-dpi-range" min="50" max="200" value="100" step="10" class="pdf-slider">
              </div>

              <div class="pdf-range-row">
                <div class="pdf-range-header">
                  <label for="c-quality-range">Qualidade da Imagem</label>
                  <span id="c-quality-val" class="pdf-val-badge">70%</span>
                </div>
                <input type="range" id="c-quality-range" min="20" max="95" value="70" step="5" class="pdf-slider">
              </div>
            </div>
          </details>

          <!-- Bot\xE3o Principal de Compress\xE3o (100% de largura) -->
          <button type="button" id="c-compress-btn" class="pdf-primary-btn" disabled>
            ${ICONS.toolCompress(16)}
            <span>Comprimir PDF</span>
          </button>

        </div>

        <!-- Coluna Direita: Pr\xE9-visualiza\xE7\xE3o & M\xE9tricas -->
        <div class="pdf-preview-panel">

          <!-- Estado Vazio -->
          <div class="pdf-empty-view" id="c-empty-view">
            <div class="pdf-empty-illustration">
              ${ICONS.toolCompress(40)}
            </div>
            <h3 class="pdf-empty-title">Nenhum PDF comprimido</h3>
            <p class="pdf-empty-desc">Carregue um arquivo e selecione o n\xEDvel de compress\xE3o para otimizar o documento no navegador.</p>
          </div>

          <!-- Estado Processando com Barra de Progresso Real -->
          <div class="pdf-loading-view" id="c-loading-view" style="display: none;">
            <div class="open-tool-progress-panel">
              <div class="open-tool-progress-icon-wrap">
                <div class="open-tool-progress-pulse-ring"></div>
                <div class="open-tool-progress-spinner"></div>
              </div>
              <div class="open-tool-progress-header">
                <h4 class="open-tool-progress-title" id="c-loading-title">Otimizando documento...</h4>
                <span class="open-tool-progress-percentage" id="c-progress-pct">0%</span>
              </div>
              <div class="open-tool-progress-track">
                <div class="open-tool-progress-fill" id="c-progress-fill" style="width: 0%;"></div>
              </div>
              <div class="open-tool-progress-footer">
                <span class="open-tool-progress-desc" id="c-loading-desc">Iniciando reamostragem gr\xE1fica...</span>
                <span class="open-tool-progress-counter" id="c-progress-counter">0 / 0 p\xE1gs</span>
              </div>
            </div>
          </div>

          <!-- Estado Resultado -->
          <div class="pdf-result-view" id="c-result-view" style="display: none;">

            <!-- Comparativo de Tamanhos -->
            <div class="pdf-savings-card">
              <div class="pdf-savings-stat">
                <span class="pdf-savings-label">Original</span>
                <strong id="c-stat-orig" class="pdf-savings-val">0 MB</strong>
              </div>
              <div class="pdf-savings-arrow">\u2192</div>
              <div class="pdf-savings-stat">
                <span class="pdf-savings-label">Comprimido</span>
                <strong id="c-stat-new" class="pdf-savings-val" style="color:var(--accent-primary);">0 MB</strong>
              </div>
              <div class="pdf-savings-badge" id="c-stat-pct">-0%</div>
            </div>

            <!-- Palco de Preview -->
            <div class="pdf-stage" id="c-stage">
              <canvas id="c-preview-canvas" class="pdf-preview-canvas"></canvas>
            </div>

            <!-- Metadados -->
            <div class="pdf-meta-bar">
              <div class="pdf-meta-item">
                <span class="pdf-meta-label">Total de P\xE1ginas:</span>
                <strong id="c-meta-pages" class="pdf-meta-val">0</strong>
              </div>
              <div class="pdf-meta-item">
                <span class="pdf-meta-label">Economia:</span>
                <strong id="c-meta-saved" class="pdf-meta-val" style="color:#10b981;">0 KB</strong>
              </div>
            </div>

            <!-- A\xE7\xF5es do Resultado: Baixar e Novo PDF -->
            <div class="pdf-actions-bar">
              <button type="button" id="c-result-clear-btn" class="pdf-export-btn pdf-export-btn--secondary" title="Comprimir outro arquivo PDF">
                ${ICONS.refresh(15)}
                <span>Novo PDF</span>
              </button>
              <button type="button" id="c-download-btn" class="pdf-export-btn pdf-export-btn--primary">
                ${ICONS.download(15)}
                <span>Baixar PDF Otimizado</span>
              </button>
            </div>

          </div>

        </div>

      </div>

    </div>
  `;
  }

  // js/tools/pdf-compress/tool.js
  var _listeners5 = [];
  var _currentFile3 = null;
  var _currentArrayBuffer2 = null;
  var _compressedPdfBlob = null;
  var _currentPreset = "balanced";
  function _on4(element, event, handler) {
    if (!element) return;
    element.addEventListener(event, handler);
    _listeners5.push({ element, event, handler });
  }
  function _formatBytes2(bytes) {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / 1048576).toFixed(2) + " MB";
  }
  async function _ensureLibs2() {
    const promises = [];
    if (typeof window === "undefined" || !window.PDFLib) {
      promises.push(loadScript("js/lib/pdf-lib.min.js").catch((e) => console.warn("pdf-lib load:", e)));
    }
    if (typeof window === "undefined" || !window.pdfjsLib) {
      promises.push(loadScript(APP_CONFIG.CDN.PDFJS).catch((e) => console.warn("pdf.js load:", e)));
    }
    if (promises.length > 0) {
      await Promise.all(promises);
    }
    const pdfjsLib2 = typeof window !== "undefined" && window.pdfjsLib || globalThis.pdfjsLib;
    if (pdfjsLib2 && pdfjsLib2.GlobalWorkerOptions && !pdfjsLib2.GlobalWorkerOptions.workerSrc) {
      pdfjsLib2.GlobalWorkerOptions.workerSrc = APP_CONFIG.CDN.PDFJS_WORKER;
    }
  }
  var PRESETS = {
    extreme: { dpi: 72, quality: 0.5 },
    balanced: { dpi: 100, quality: 0.7 },
    light: { dpi: 150, quality: 0.85 }
  };
  var tool_default6 = {
    id: "pdf-compress",
    label: "Comprimir PDF",
    render(container) {
      container.innerHTML = getPdfCompressHTML();
    },
    async mount(container) {
      _listeners5 = [];
      _currentFile3 = null;
      _currentArrayBuffer2 = null;
      _compressedPdfBlob = null;
      _currentPreset = "balanced";
      const dropzone = container.querySelector("#c-dropzone");
      const fileInput = container.querySelector("#c-file-input");
      const dropPrompt = container.querySelector("#c-dropzone-prompt");
      const fileLoadedBox = container.querySelector("#c-file-loaded");
      const filenameEl = container.querySelector("#c-filename");
      const filesizeEl = container.querySelector("#c-filesize");
      const presetBtns = container.querySelectorAll(".pdf-preset-btn");
      const dpiRange = container.querySelector("#c-dpi-range");
      const dpiVal = container.querySelector("#c-dpi-val");
      const qualityRange = container.querySelector("#c-quality-range");
      const qualityVal = container.querySelector("#c-quality-val");
      const compressBtn = container.querySelector("#c-compress-btn");
      const clearInputBtn = container.querySelector("#c-clear-input-btn");
      const resultClearBtn = container.querySelector("#c-result-clear-btn");
      const emptyView = container.querySelector("#c-empty-view");
      const loadingView = container.querySelector("#c-loading-view");
      const loadingProgress = container.querySelector("#c-loading-progress");
      const resultView = container.querySelector("#c-result-view");
      const statOrig = container.querySelector("#c-stat-orig");
      const statNew = container.querySelector("#c-stat-new");
      const statPct = container.querySelector("#c-stat-pct");
      const previewCanvas = container.querySelector("#c-preview-canvas");
      const metaPages = container.querySelector("#c-meta-pages");
      const metaSaved = container.querySelector("#c-meta-saved");
      const downloadBtn = container.querySelector("#c-download-btn");
      const loadingTitle = container.querySelector("#c-loading-title");
      const progressPct = container.querySelector("#c-progress-pct");
      const progressFill = container.querySelector("#c-progress-fill");
      const loadingDesc = container.querySelector("#c-loading-desc");
      const progressCounter = container.querySelector("#c-progress-counter");
      function _setViewState(state2) {
        emptyView.style.display = state2 === "empty" ? "flex" : "none";
        loadingView.style.display = state2 === "loading" ? "flex" : "none";
        resultView.style.display = state2 === "result" ? "flex" : "none";
      }
      function _updateProgress(pct, title, desc, counter) {
        if (progressPct) progressPct.textContent = `${pct}%`;
        if (progressFill) progressFill.style.width = `${pct}%`;
        if (title && loadingTitle) loadingTitle.textContent = title;
        if (desc && loadingDesc) loadingDesc.textContent = desc;
        if (counter && progressCounter) progressCounter.textContent = counter;
      }
      function _syncPresetControls(presetKey) {
        const cfg = PRESETS[presetKey];
        if (!cfg) return;
        dpiRange.value = cfg.dpi;
        dpiVal.textContent = cfg.dpi + " DPI";
        qualityRange.value = Math.round(cfg.quality * 100);
        qualityVal.textContent = Math.round(cfg.quality * 100) + "%";
      }
      async function _handleFile(file) {
        _currentFile3 = file;
        _currentArrayBuffer2 = await file.arrayBuffer();
        filenameEl.textContent = file.name;
        filesizeEl.textContent = _formatBytes2(file.size);
        dropPrompt.style.display = "none";
        fileLoadedBox.style.display = "flex";
        compressBtn.disabled = false;
        if (clearInputBtn) clearInputBtn.style.display = "inline-flex";
      }
      function _reset() {
        _currentFile3 = null;
        _currentArrayBuffer2 = null;
        _compressedPdfBlob = null;
        fileInput.value = "";
        dropPrompt.style.display = "flex";
        fileLoadedBox.style.display = "none";
        compressBtn.disabled = true;
        if (clearInputBtn) clearInputBtn.style.display = "none";
        _setViewState("empty");
      }
      function _dataUrlToBytes2(dataUrl) {
        const parts = dataUrl.split(",");
        const bin = atob(parts[1]);
        const bytes = new Uint8Array(bin.length);
        for (let i = 0; i < bin.length; i++) {
          bytes[i] = bin.charCodeAt(i);
        }
        return bytes;
      }
      async function _doCompress() {
        if (!_currentArrayBuffer2) return;
        _setViewState("loading");
        _updateProgress(5, "Iniciando otimiza\xE7\xE3o...", "Carregando estrutura e decodificando p\xE1ginas...", "0 / 0 p\xE1gs");
        await new Promise((r) => setTimeout(r, 25));
        await _ensureLibs2();
        const PDFLib = typeof window !== "undefined" && window.PDFLib || globalThis.PDFLib;
        const pdfjsLib2 = typeof window !== "undefined" && window.pdfjsLib || globalThis.pdfjsLib;
        if (!PDFLib || !pdfjsLib2) {
          alert("Bibliotecas de processamento de PDF indispon\xEDveis.");
          _setViewState("empty");
          return;
        }
        const dpi = parseInt(dpiRange.value, 10) || 100;
        const quality = (parseInt(qualityRange.value, 10) || 70) / 100;
        const renderScale = dpi / 72;
        try {
          const copyBuf = _currentArrayBuffer2.slice(0);
          const loadingTask = pdfjsLib2.getDocument({ data: copyBuf });
          const jsDoc = await loadingTask.promise;
          const numPages = jsDoc.numPages;
          const newPdfDoc = await PDFLib.PDFDocument.create();
          for (let i = 1; i <= numPages; i++) {
            const currentPct = Math.round(5 + (i - 1) / numPages * 88);
            _updateProgress(
              currentPct,
              `Otimizando p\xE1gina ${i} de ${numPages}...`,
              `Reamostrando em ${dpi} DPI com ${(quality * 100).toFixed(0)}% de qualidade`,
              `${i} / ${numPages} p\xE1gs`
            );
            await new Promise((r) => setTimeout(r, 15));
            const page = await jsDoc.getPage(i);
            const viewport = page.getViewport({ scale: renderScale });
            const baseViewport = page.getViewport({ scale: 1 });
            const canvas = document.createElement("canvas");
            canvas.width = viewport.width;
            canvas.height = viewport.height;
            const ctx = canvas.getContext("2d");
            await page.render({ canvasContext: ctx, viewport }).promise;
            const imgDataUrl = canvas.toDataURL("image/jpeg", quality);
            const imgBytes = _dataUrlToBytes2(imgDataUrl);
            const embeddedImg = await newPdfDoc.embedJpg(imgBytes);
            const newPage = newPdfDoc.addPage([baseViewport.width, baseViewport.height]);
            newPage.drawImage(embeddedImg, {
              x: 0,
              y: 0,
              width: baseViewport.width,
              height: baseViewport.height
            });
          }
          _updateProgress(95, "Gerando arquivo PDF comprimido...", "Reconstruindo fluxos e \xE1rvore de objetos...", `${numPages} / ${numPages} p\xE1gs`);
          await new Promise((r) => setTimeout(r, 20));
          const compressedBytes = await newPdfDoc.save();
          _compressedPdfBlob = new Blob([compressedBytes], { type: "application/pdf" });
          _updateProgress(100, "Compress\xE3o conclu\xEDda com sucesso!", "Preparando visualiza\xE7\xE3o...", `${numPages} / ${numPages} p\xE1gs`);
          await new Promise((r) => setTimeout(r, 20));
          const origSize = _currentFile3.size;
          const newSize = _compressedPdfBlob.size;
          const diff = origSize - newSize;
          const pct = origSize > 0 ? Math.round(diff / origSize * 100) : 0;
          statOrig.textContent = _formatBytes2(origSize);
          statNew.textContent = _formatBytes2(newSize);
          if (pct >= 0) {
            statPct.textContent = `-${pct}%`;
            statPct.style.background = "color-mix(in srgb, #10b981 18%, transparent)";
            statPct.style.color = "#10b981";
            metaSaved.textContent = _formatBytes2(Math.max(0, diff));
          } else {
            statPct.textContent = `+${Math.abs(pct)}%`;
            statPct.style.background = "color-mix(in srgb, #f59e0b 18%, transparent)";
            statPct.style.color = "#f59e0b";
            metaSaved.textContent = "0 B";
          }
          metaPages.textContent = numPages;
          try {
            const previewDoc = await pdfjsLib2.getDocument({ data: compressedBytes.slice(0) }).promise;
            const firstPage = await previewDoc.getPage(1);
            const stageVp = firstPage.getViewport({ scale: 1 });
            const scale = Math.min(260 / stageVp.width, 230 / stageVp.height);
            const scaledVp = firstPage.getViewport({ scale: Math.max(scale, 0.4) });
            previewCanvas.width = scaledVp.width;
            previewCanvas.height = scaledVp.height;
            const ctx = previewCanvas.getContext("2d");
            await firstPage.render({ canvasContext: ctx, viewport: scaledVp }).promise;
          } catch (e) {
            console.warn("Erro ao renderizar miniatura comprimida:", e);
          }
          _setViewState("result");
        } catch (err) {
          console.error("Falha ao comprimir PDF:", err);
          _setViewState("empty");
          alert("Erro ao comprimir o PDF. O arquivo pode estar corrompido ou protegido por senha.");
        }
      }
      _on4(dropzone, "click", (e) => {
        if (!_currentFile3) {
          fileInput.click();
        }
      });
      _on4(dropzone, "keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          if (!_currentFile3) fileInput.click();
        }
      });
      _on4(fileInput, "change", (e) => {
        const file = e.target.files && e.target.files[0];
        if (file) _handleFile(file);
      });
      _on4(dropzone, "dragover", (e) => {
        e.preventDefault();
        dropzone.classList.add("pdf-drag-over");
      });
      _on4(dropzone, "dragleave", () => dropzone.classList.remove("pdf-drag-over"));
      _on4(dropzone, "drop", (e) => {
        e.preventDefault();
        dropzone.classList.remove("pdf-drag-over");
        const file = e.dataTransfer?.files?.[0];
        if (file && (file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf"))) {
          _handleFile(file);
        }
      });
      presetBtns.forEach((btn) => {
        _on4(btn, "click", () => {
          presetBtns.forEach((b) => b.classList.remove("pdf-preset-btn--active"));
          btn.classList.add("pdf-preset-btn--active");
          _currentPreset = btn.dataset.preset;
          _syncPresetControls(_currentPreset);
        });
      });
      _on4(dpiRange, "input", () => {
        dpiVal.textContent = dpiRange.value + " DPI";
      });
      _on4(qualityRange, "input", () => {
        qualityVal.textContent = qualityRange.value + "%";
      });
      _on4(compressBtn, "click", _doCompress);
      if (clearInputBtn) _on4(clearInputBtn, "click", _reset);
      if (resultClearBtn) _on4(resultClearBtn, "click", _reset);
      _on4(downloadBtn, "click", () => {
        if (!_compressedPdfBlob) return;
        const originalName = _currentFile3 ? _currentFile3.name.replace(/\.pdf$/i, "") : "documento";
        const outName = `${originalName}_comprimido.pdf`;
        const url = URL.createObjectURL(_compressedPdfBlob);
        const a = document.createElement("a");
        a.href = url;
        a.download = outName;
        document.body.appendChild(a);
        a.click();
        setTimeout(() => {
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
        }, 500);
      });
      _ensureLibs2().catch((err) => console.warn("Carregamento de bibliotecas PDF:", err));
    },
    unmount() {
      _listeners5.forEach(({ element, event, handler }) => {
        if (element) element.removeEventListener(event, handler);
      });
      _listeners5 = [];
      _currentFile3 = null;
      _currentArrayBuffer2 = null;
      _compressedPdfBlob = null;
    }
  };

  // js/tools/pdf-merge/ui.js
  function getPdfMergeHTML() {
    return `
    <div class="pdf-merge-root">

      <section class="pdf-tool-hero">
        <header class="hero-header">
          <div class="pdf-tool-badge">
            ${ICONS.toolMerge(14)}
            Jun\xE7\xE3o Sequencial de Documentos
          </div>
          <h2 class="hero-title">Mesclar PDF</h2>
          <p class="hero-subtitle">
            Combine m\xFAltiplos documentos PDF em um \xFAnico arquivo ordenado. Reorganize a sequ\xEAncia e junte tudo instantaneamente no seu navegador.
          </p>
        </header>
      </section>

      <div class="pdf-workspace">

        <!-- Coluna Esquerda: Entrada & Fila de Mesclagem -->
        <div class="pdf-controls-panel">

          <!-- Dropzone para m\xFAltiplos arquivos -->
          <div class="pdf-dropzone" id="m-dropzone" tabindex="0" role="button" aria-label="Adicionar arquivos PDF para mesclar">
            <input type="file" id="m-file-input" accept="application/pdf,.pdf" multiple class="pdf-hidden-input">
            <div class="pdf-dropzone-content" id="m-dropzone-prompt">
              <div class="pdf-dropzone-icon">
                ${ICONS.plus(22)}
              </div>
              <div class="pdf-dropzone-text">
                <p class="pdf-dropzone-title">Adicione PDFs ou <span class="pdf-link">selecione</span></p>
                <p class="pdf-dropzone-sub">Selecione 2 ou mais arquivos para juntar</p>
              </div>
            </div>
          </div>

          <!-- Lista Compacta de Arquivos -->
          <div class="pdf-merge-list-wrap">
            <div class="pdf-merge-list-header">
              <span class="pdf-label">Fila de Documentos (<span id="m-count-badge">0</span>)</span>
              <button type="button" id="m-clear-btn" class="pdf-link-btn" style="display: none;" title="Limpar todos os arquivos da lista">
                ${ICONS.trash(13)}
                <span>Limpar fila</span>
              </button>
            </div>
            <div class="pdf-merge-list" id="m-file-list">
              <div class="pdf-merge-empty-list" id="m-list-empty">
                Nenhum PDF adicionado \xE0 lista.
              </div>
            </div>
          </div>

          <!-- Bot\xE3o Principal de Mesclagem -->
          <button type="button" id="m-merge-btn" class="pdf-primary-btn" disabled>
            ${ICONS.toolMerge(16)}
            <span>Mesclar PDFs</span>
          </button>

        </div>

        <!-- Coluna Direita: Pr\xE9-visualiza\xE7\xE3o & Resultado -->
        <div class="pdf-preview-panel">

          <!-- Estado Vazio -->
          <div class="pdf-empty-view" id="m-empty-view">
            <div class="pdf-empty-illustration">
              ${ICONS.toolMerge(40)}
            </div>
            <h3 class="pdf-empty-title">Nenhum PDF mesclado</h3>
            <p class="pdf-empty-desc">Adicione ao menos dois arquivos na lista e clique em "Mesclar PDFs" para gerar o documento unificado.</p>
          </div>

          <!-- Estado Processando com Barra de Progresso Real -->
          <div class="pdf-loading-view" id="m-loading-view" style="display: none;">
            <div class="open-tool-progress-panel">
              <div class="open-tool-progress-icon-wrap">
                <div class="open-tool-progress-pulse-ring"></div>
                <div class="open-tool-progress-spinner"></div>
              </div>
              <div class="open-tool-progress-header">
                <h3 class="open-tool-progress-title" id="m-loading-title">Combinando p\xE1ginas dos documentos...</h3>
                <span class="open-tool-progress-percentage" id="m-progress-pct">0%</span>
              </div>
              <div class="open-tool-progress-track">
                <div class="open-tool-progress-fill" id="m-progress-fill" style="width: 0%;"></div>
              </div>
              <div class="open-tool-progress-footer">
                <span class="open-tool-progress-desc" id="m-loading-desc">Iniciando leitura dos arquivos...</span>
                <span class="open-tool-progress-counter" id="m-progress-counter">0 / 0</span>
              </div>
            </div>
          </div>

          <!-- Estado Resultado -->
          <div class="pdf-result-view" id="m-result-view" style="display: none;">

            <div class="pdf-result-header">
              <span class="pdf-badge pdf-badge--success">${ICONS.check(13)} PDFs Mesclados</span>
              <span class="pdf-result-summary" id="m-result-summary">Documento unificado com sucesso</span>
            </div>

            <!-- Palco de Preview -->
            <div class="pdf-stage" id="m-stage">
              <canvas id="m-preview-canvas" class="pdf-preview-canvas"></canvas>
            </div>

            <!-- Metadados -->
            <div class="pdf-meta-bar">
              <div class="pdf-meta-item">
                <span class="pdf-meta-label">Arquivos Unidos:</span>
                <strong id="m-meta-docs" class="pdf-meta-val">0</strong>
              </div>
              <div class="pdf-meta-item">
                <span class="pdf-meta-label">Total de P\xE1ginas:</span>
                <strong id="m-meta-pages" class="pdf-meta-val">0</strong>
              </div>
              <div class="pdf-meta-item">
                <span class="pdf-meta-label">Tamanho Final:</span>
                <strong id="m-meta-size" class="pdf-meta-val">0 KB</strong>
              </div>
            </div>

            <!-- A\xE7\xF5es do Resultado: Baixar e Novos PDFs -->
            <div class="pdf-actions-bar">
              <button type="button" id="m-result-clear-btn" class="pdf-export-btn pdf-export-btn--secondary" title="Mesclar outros documentos PDF">
                ${ICONS.refresh(15)}
                <span>Novos PDFs</span>
              </button>
              <button type="button" id="m-download-btn" class="pdf-export-btn pdf-export-btn--primary">
                ${ICONS.download(15)}
                <span>Baixar PDF Mesclado</span>
              </button>
            </div>

          </div>

        </div>

      </div>

    </div>
  `;
  }

  // js/tools/pdf-merge/tool.js
  var _listeners6 = [];
  var _filesQueue = [];
  var _mergedPdfBlob = null;
  function _on5(element, event, handler) {
    if (!element) return;
    element.addEventListener(event, handler);
    _listeners6.push({ element, event, handler });
  }
  function _formatBytes3(bytes) {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / 1048576).toFixed(2) + " MB";
  }
  async function _ensureLibs3() {
    const promises = [];
    if (typeof window === "undefined" || !window.PDFLib) {
      promises.push(loadScript("js/lib/pdf-lib.min.js").catch((e) => console.warn("pdf-lib load:", e)));
    }
    if (typeof window === "undefined" || !window.pdfjsLib) {
      promises.push(loadScript(APP_CONFIG.CDN.PDFJS).catch((e) => console.warn("pdf.js load:", e)));
    }
    if (promises.length > 0) {
      await Promise.all(promises);
    }
    const pdfjsLib2 = typeof window !== "undefined" && window.pdfjsLib || globalThis.pdfjsLib;
    if (pdfjsLib2 && pdfjsLib2.GlobalWorkerOptions && !pdfjsLib2.GlobalWorkerOptions.workerSrc) {
      pdfjsLib2.GlobalWorkerOptions.workerSrc = APP_CONFIG.CDN.PDFJS_WORKER;
    }
  }
  var tool_default7 = {
    id: "pdf-merge",
    label: "Mesclar PDF",
    render(container) {
      container.innerHTML = getPdfMergeHTML();
    },
    async mount(container) {
      _listeners6 = [];
      _filesQueue = [];
      _mergedPdfBlob = null;
      const dropzone = container.querySelector("#m-dropzone");
      const fileInput = container.querySelector("#m-file-input");
      const fileList = container.querySelector("#m-file-list");
      const listEmpty = container.querySelector("#m-list-empty");
      const countBadge = container.querySelector("#m-count-badge");
      const clearBtn = container.querySelector("#m-clear-btn");
      const resultClearBtn = container.querySelector("#m-result-clear-btn");
      const mergeBtn = container.querySelector("#m-merge-btn");
      const emptyView = container.querySelector("#m-empty-view");
      const loadingView = container.querySelector("#m-loading-view");
      const resultView = container.querySelector("#m-result-view");
      const previewCanvas = container.querySelector("#m-preview-canvas");
      const metaDocs = container.querySelector("#m-meta-docs");
      const metaPages = container.querySelector("#m-meta-pages");
      const metaSize = container.querySelector("#m-meta-size");
      const downloadBtn = container.querySelector("#m-download-btn");
      const loadingTitle = container.querySelector("#m-loading-title");
      const progressPct = container.querySelector("#m-progress-pct");
      const progressFill = container.querySelector("#m-progress-fill");
      const loadingDesc = container.querySelector("#m-loading-desc");
      const progressCounter = container.querySelector("#m-progress-counter");
      function _setViewState(state2) {
        emptyView.style.display = state2 === "empty" ? "flex" : "none";
        loadingView.style.display = state2 === "loading" ? "flex" : "none";
        resultView.style.display = state2 === "result" ? "flex" : "none";
      }
      function _updateProgress(pct, title, desc, counter) {
        if (progressPct) progressPct.textContent = `${pct}%`;
        if (progressFill) progressFill.style.width = `${pct}%`;
        if (title && loadingTitle) loadingTitle.textContent = title;
        if (desc && loadingDesc) loadingDesc.textContent = desc;
        if (counter && progressCounter) progressCounter.textContent = counter;
      }
      function _renderList() {
        countBadge.textContent = _filesQueue.length;
        clearBtn.style.display = _filesQueue.length > 0 ? "inline-block" : "none";
        mergeBtn.disabled = _filesQueue.length < 2;
        if (_filesQueue.length === 0) {
          fileList.innerHTML = "";
          fileList.appendChild(listEmpty);
          listEmpty.style.display = "block";
          return;
        }
        listEmpty.style.display = "none";
        fileList.innerHTML = "";
        _filesQueue.forEach((item, index) => {
          const row = document.createElement("div");
          row.className = "pdf-merge-item";
          row.innerHTML = `
          <div class="pdf-merge-item-order">${index + 1}</div>
          <div class="pdf-merge-item-info">
            <span class="pdf-merge-item-name" title="${item.file.name}">${item.file.name}</span>
            <span class="pdf-merge-item-size">${_formatBytes3(item.file.size)}</span>
          </div>
          <div class="pdf-merge-item-actions">
            <button type="button" class="pdf-item-ctrl-btn btn-up" data-idx="${index}" title="Mover para cima" ${index === 0 ? "disabled" : ""}>\u2191</button>
            <button type="button" class="pdf-item-ctrl-btn btn-down" data-idx="${index}" title="Mover para baixo" ${index === _filesQueue.length - 1 ? "disabled" : ""}>\u2193</button>
            <button type="button" class="pdf-item-ctrl-btn btn-del" data-idx="${index}" title="Remover">${ICONS.x(13)}</button>
          </div>
        `;
          fileList.appendChild(row);
        });
        fileList.querySelectorAll(".btn-up").forEach((btn) => {
          btn.addEventListener("click", (e) => {
            e.stopPropagation();
            const idx = parseInt(btn.dataset.idx, 10);
            if (idx > 0) {
              const temp = _filesQueue[idx];
              _filesQueue[idx] = _filesQueue[idx - 1];
              _filesQueue[idx - 1] = temp;
              _renderList();
            }
          });
        });
        fileList.querySelectorAll(".btn-down").forEach((btn) => {
          btn.addEventListener("click", (e) => {
            e.stopPropagation();
            const idx = parseInt(btn.dataset.idx, 10);
            if (idx < _filesQueue.length - 1) {
              const temp = _filesQueue[idx];
              _filesQueue[idx] = _filesQueue[idx + 1];
              _filesQueue[idx + 1] = temp;
              _renderList();
            }
          });
        });
        fileList.querySelectorAll(".btn-del").forEach((btn) => {
          btn.addEventListener("click", (e) => {
            e.stopPropagation();
            const idx = parseInt(btn.dataset.idx, 10);
            _filesQueue.splice(idx, 1);
            _renderList();
          });
        });
      }
      async function _addFiles(files) {
        for (const file of files) {
          if (file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf")) {
            const buffer = await file.arrayBuffer();
            _filesQueue.push({ file, buffer });
          }
        }
        _renderList();
      }
      async function _doMerge() {
        if (_filesQueue.length < 2) return;
        _setViewState("loading");
        _updateProgress(5, "Iniciando mesclagem...", "Carregando bibliotecas na mem\xF3ria local...", `0 / ${_filesQueue.length} arquivos`);
        await new Promise((r) => setTimeout(r, 25));
        await _ensureLibs3();
        const PDFLib = typeof window !== "undefined" && window.PDFLib || globalThis.PDFLib;
        const pdfjsLib2 = typeof window !== "undefined" && window.pdfjsLib || globalThis.pdfjsLib;
        if (!PDFLib) {
          alert("Biblioteca PDFLib n\xE3o dispon\xEDvel.");
          _setViewState("empty");
          return;
        }
        try {
          const mergedDoc = await PDFLib.PDFDocument.create();
          let totalPages = 0;
          const totalDocs = _filesQueue.length;
          for (let i = 0; i < totalDocs; i++) {
            const item = _filesQueue[i];
            const docIdx = i + 1;
            const currentPct = Math.round(5 + i / totalDocs * 85);
            _updateProgress(
              currentPct,
              `Mesclando arquivo ${docIdx} de ${totalDocs}...`,
              `${item.file.name} (${_formatBytes3(item.file.size)})`,
              `${docIdx} / ${totalDocs} arquivos`
            );
            await new Promise((r) => setTimeout(r, 20));
            try {
              const srcDoc = await PDFLib.PDFDocument.load(item.buffer.slice(0), { ignoreEncryption: true });
              const pageIndices = srcDoc.getPageIndices();
              const copiedPages = await mergedDoc.copyPages(srcDoc, pageIndices);
              copiedPages.forEach((page) => mergedDoc.addPage(page));
              totalPages += pageIndices.length;
            } catch (loadErr) {
              if (pdfjsLib2) {
                const loadingTask = pdfjsLib2.getDocument({ data: item.buffer.slice(0) });
                const jsDoc = await loadingTask.promise;
                const numPgs = jsDoc.numPages;
                for (let p = 1; p <= numPgs; p++) {
                  _updateProgress(
                    currentPct,
                    `Processando p\xE1gina ${p}/${numPgs} do doc ${docIdx}...`,
                    `${item.file.name} (extra\xE7\xE3o rasterizada)`,
                    `${docIdx} / ${totalDocs} arquivos`
                  );
                  await new Promise((r) => setTimeout(r, 10));
                  const page = await jsDoc.getPage(p);
                  const vp = page.getViewport({ scale: 1.5 });
                  const canvas = document.createElement("canvas");
                  canvas.width = vp.width;
                  canvas.height = vp.height;
                  const ctx = canvas.getContext("2d");
                  await page.render({ canvasContext: ctx, viewport: vp }).promise;
                  const imgDataUrl = canvas.toDataURL("image/jpeg", 0.9);
                  const parts = imgDataUrl.split(",");
                  const bin = atob(parts[1]);
                  const bytes = new Uint8Array(bin.length);
                  for (let k = 0; k < bin.length; k++) bytes[k] = bin.charCodeAt(k);
                  const embedded = await mergedDoc.embedJpg(bytes);
                  const newPg = mergedDoc.addPage([vp.width, vp.height]);
                  newPg.drawImage(embedded, { x: 0, y: 0, width: vp.width, height: vp.height });
                  totalPages++;
                }
              } else {
                throw loadErr;
              }
            }
          }
          _updateProgress(94, "Finalizando estrutura do PDF...", "Consolidando p\xE1ginas e tabela de refer\xEAncias cruzadas...", `${totalDocs} / ${totalDocs} arquivos`);
          await new Promise((r) => setTimeout(r, 20));
          const mergedBytes = await mergedDoc.save();
          _mergedPdfBlob = new Blob([mergedBytes], { type: "application/pdf" });
          metaDocs.textContent = _filesQueue.length;
          metaPages.textContent = totalPages;
          metaSize.textContent = _formatBytes3(_mergedPdfBlob.size);
          _updateProgress(100, "Mesclagem conclu\xEDda!", "Renderizando miniatura de confirma\xE7\xE3o...", `${totalDocs} / ${totalDocs} arquivos`);
          await new Promise((r) => setTimeout(r, 20));
          if (pdfjsLib2) {
            try {
              const previewDoc = await pdfjsLib2.getDocument({ data: mergedBytes.slice(0) }).promise;
              const firstPage = await previewDoc.getPage(1);
              const stageVp = firstPage.getViewport({ scale: 1 });
              const scale = Math.min(260 / stageVp.width, 230 / stageVp.height);
              const scaledVp = firstPage.getViewport({ scale: Math.max(scale, 0.4) });
              previewCanvas.width = scaledVp.width;
              previewCanvas.height = scaledVp.height;
              const ctx = previewCanvas.getContext("2d");
              await firstPage.render({ canvasContext: ctx, viewport: scaledVp }).promise;
            } catch (e) {
              console.warn("Erro ao renderizar miniatura mesclada:", e);
            }
          }
          _setViewState("result");
        } catch (err) {
          console.error("Falha ao mesclar PDFs:", err);
          _setViewState("empty");
          alert("Erro ao mesclar documentos. Um dos arquivos pode ter criptografia pesada.");
        }
      }
      _on5(dropzone, "click", () => {
        fileInput.click();
      });
      _on5(dropzone, "keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          fileInput.click();
        }
      });
      _on5(fileInput, "change", (e) => {
        if (e.target.files && e.target.files.length) {
          _addFiles(Array.from(e.target.files));
          fileInput.value = "";
        }
      });
      _on5(dropzone, "dragover", (e) => {
        e.preventDefault();
        dropzone.classList.add("pdf-drag-over");
      });
      _on5(dropzone, "dragleave", () => dropzone.classList.remove("pdf-drag-over"));
      _on5(dropzone, "drop", (e) => {
        e.preventDefault();
        dropzone.classList.remove("pdf-drag-over");
        const files = e.dataTransfer?.files;
        if (files && files.length) {
          _addFiles(Array.from(files));
        }
      });
      const _resetQueue = () => {
        _filesQueue = [];
        _renderList();
        _setViewState("empty");
      };
      _on5(clearBtn, "click", _resetQueue);
      if (resultClearBtn) _on5(resultClearBtn, "click", _resetQueue);
      _on5(mergeBtn, "click", _doMerge);
      _on5(downloadBtn, "click", () => {
        if (!_mergedPdfBlob) return;
        const outName = "documentos_mesclados.pdf";
        const url = URL.createObjectURL(_mergedPdfBlob);
        const a = document.createElement("a");
        a.href = url;
        a.download = outName;
        document.body.appendChild(a);
        a.click();
        setTimeout(() => {
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
        }, 500);
      });
      _ensureLibs3().catch((err) => console.warn("Carregamento de bibliotecas PDF:", err));
    },
    unmount() {
      _listeners6.forEach(({ element, event, handler }) => {
        if (element) element.removeEventListener(event, handler);
      });
      _listeners6 = [];
      _filesQueue = [];
      _mergedPdfBlob = null;
    }
  };

  // js/tools/pdf-split/ui.js
  function getPdfSplitHTML() {
    return `
    <div class="pdf-split-root">

      <section class="pdf-tool-hero">
        <header class="hero-header">
          <div class="pdf-tool-badge">
            ${ICONS.toolSplit(14)}
            Divis\xE3o &amp; Extra\xE7\xE3o Local
          </div>
          <h2 class="hero-title">Dividir PDF</h2>
          <p class="hero-subtitle">
            Separe p\xE1ginas, extraia intervalos espec\xEDficos ou desmembre cada p\xE1gina em arquivos individuais. 100% local \u2014 zero envio a servidores.
          </p>
        </header>
      </section>

      <div class="pdf-workspace">

        <!-- Coluna Esquerda: Entrada & Controles de Divis\xE3o -->
        <div class="pdf-controls-panel">

          <!-- Dropzone Compacto -->
          <div class="pdf-dropzone" id="s-dropzone" tabindex="0" role="button" aria-label="Carregar arquivo PDF para dividir">
            <input type="file" id="s-file-input" accept="application/pdf,.pdf" class="pdf-hidden-input">
            <div class="pdf-dropzone-content" id="s-dropzone-prompt">
              <div class="pdf-dropzone-icon">
                ${ICONS.filePdf(22)}
              </div>
              <div class="pdf-dropzone-text">
                <p class="pdf-dropzone-title">Arraste um PDF ou <span class="pdf-link">selecione</span></p>
                <p class="pdf-dropzone-sub">Qualquer arquivo .PDF com m\xFAltiplas p\xE1ginas</p>
              </div>
            </div>

            <!-- Preview do Arquivo Carregado -->
            <div class="pdf-file-loaded" id="s-file-loaded" style="display: none;">
              <div class="pdf-icon-badge">PDF</div>
              <div class="pdf-loaded-info">
                <span class="pdf-filename" id="s-filename">documento.pdf</span>
                <span class="pdf-filesize" id="s-filesize">0 KB</span>
              </div>
            </div>
          </div>

          <!-- Bot\xE3o Limpar abaixo do PDF -->
          <button type="button" id="s-clear-input-btn" class="pdf-file-clear-btn" style="display: none;" title="Limpar arquivo e carregar outro">
            ${ICONS.trash(14)}
            <span>Limpar PDF</span>
          </button>

          <!-- Modos de Divis\xE3o (4 Op\xE7\xF5es Compactas) -->
          <div class="pdf-ctrl-group">
            <label class="pdf-label">Modo de Divis\xE3o</label>
            <div class="pdf-mode-grid">
              <button type="button" class="pdf-mode-btn pdf-mode-btn--active" data-mode="ranges">
                <span class="pdf-mode-title">Intervalos</span>
                <span class="pdf-mode-desc">Ex: 1-3, 4-6</span>
              </button>
              <button type="button" class="pdf-mode-btn" data-mode="extract">
                <span class="pdf-mode-title">Extrair</span>
                <span class="pdf-mode-desc">Ex: 1, 3, 5</span>
              </button>
              <button type="button" class="pdf-mode-btn" data-mode="all">
                <span class="pdf-mode-title">Todas</span>
                <span class="pdf-mode-desc">1 por p\xE1gina</span>
              </button>
              <button type="button" class="pdf-mode-btn" data-mode="every">
                <span class="pdf-mode-title">A cada N</span>
                <span class="pdf-mode-desc">Blocos fixos</span>
              </button>
            </div>
          </div>

          <!-- Configura\xE7\xE3o Espec\xEDfica do Modo Ativo -->
          <div class="pdf-ctrl-group" id="s-mode-param-group">
            <div id="s-param-ranges">
              <div class="pdf-field-header">
                <label for="s-ranges-input" class="pdf-label">Intervalos de P\xE1ginas</label>
                <span class="pdf-field-hint" id="s-max-pages-hint">Total: - p\xE1gs</span>
              </div>
              <input type="text" id="s-ranges-input" class="pdf-text-input" placeholder="Ex: 1-2, 3-5" value="1-2">
              <p class="pdf-input-help">Separe intervalos com v\xEDrgula (ex: 1-3, 4-6, 7-10).</p>
            </div>

            <div id="s-param-extract" style="display: none;">
              <div class="pdf-field-header">
                <label for="s-extract-input" class="pdf-label">P\xE1ginas para Extrair</label>
                <span class="pdf-field-hint" id="s-extract-hint">Total: - p\xE1gs</span>
              </div>
              <input type="text" id="s-extract-input" class="pdf-text-input" placeholder="Ex: 1, 3, 5" value="1">
              <p class="pdf-input-help">Gera 1 \xFAnico PDF com as p\xE1ginas escolhidas.</p>
            </div>

            <div id="s-param-all" style="display: none;">
              <div class="pdf-info-banner">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="16" x2="12" y2="12"></line>
                  <line x1="12" y1="8" x2="12.01" y2="8"></line>
                </svg>
                <span>Cada p\xE1gina ser\xE1 exportada como um PDF separado compactado em um \xFAnico pacote .ZIP.</span>
              </div>
            </div>

            <div id="s-param-every" style="display: none;">
              <div class="pdf-field-header">
                <label for="s-every-input" class="pdf-label">Dividir a cada quantas p\xE1ginas?</label>
              </div>
              <div class="pdf-number-row">
                <input type="number" id="s-every-input" class="pdf-number-input" min="1" max="100" value="2">
                <span class="pdf-number-unit">p\xE1ginas por arquivo</span>
              </div>
            </div>
          </div>

          <!-- Card de Resumo de Sa\xEDda -->
          <div class="pdf-summary-card" id="s-summary-card">
            <div class="pdf-summary-item">
              <span class="pdf-summary-label">Documento Original</span>
              <span class="pdf-summary-val" id="s-sum-orig-pages">0 p\xE1ginas</span>
            </div>
            <div class="pdf-summary-divider"></div>
            <div class="pdf-summary-item">
              <span class="pdf-summary-label">Arquivos de Sa\xEDda</span>
              <span class="pdf-summary-badge" id="s-sum-out-count">0 arquivos</span>
            </div>
          </div>

          <!-- Bot\xE3o Principal de Divis\xE3o (100% de largura) -->
          <button type="button" id="s-split-btn" class="btn-primary pdf-action-cta" disabled>
            ${ICONS.toolSplit(16)}
            <span id="s-split-btn-text">Dividir PDF Agora</span>
          </button>

        </div>

        <!-- Coluna Direita: Pr\xE9-visualiza\xE7\xE3o & Sa\xEDda -->
        <div class="pdf-preview-panel">

          <!-- Estado Vazio -->
          <div class="pdf-stage-empty" id="s-empty-view">
            <div class="pdf-empty-icon">
              ${ICONS.toolSplit(36)}
            </div>
            <p class="pdf-empty-text">Carregue um documento PDF \xE0 esquerda para configurar as p\xE1ginas e dividir</p>
          </div>

          <!-- Estado Processando com Barra de Progresso Real -->
          <div class="pdf-stage-loading" id="s-loading-view" style="display: none;">
            <div class="open-tool-progress-panel">
              <div class="open-tool-progress-icon-wrap">
                <div class="open-tool-progress-pulse-ring"></div>
                <div class="open-tool-progress-spinner"></div>
              </div>
              <div class="open-tool-progress-header">
                <h4 class="open-tool-progress-title" id="s-loading-title">Dividindo documento PDF...</h4>
                <span class="open-tool-progress-percentage" id="s-progress-pct">0%</span>
              </div>
              <div class="open-tool-progress-track">
                <div class="open-tool-progress-fill" id="s-progress-fill" style="width: 0%;"></div>
              </div>
              <div class="open-tool-progress-footer">
                <span class="open-tool-progress-desc" id="s-loading-desc">Extra\xE7\xE3o direta na mem\xF3ria local...</span>
                <span class="open-tool-progress-counter" id="s-progress-counter">0 / 0 partes</span>
              </div>
            </div>
          </div>

          <!-- Estado Resultado -->
          <div class="pdf-stage-result" id="s-result-view" style="display: none;">
            <div class="pdf-result-header">
              <div class="pdf-badge pdf-badge--success" id="s-result-badge">Divis\xE3o Conclu\xEDda</div>
              <span class="pdf-result-sub" id="s-result-summary">Arquivos gerados com sucesso</span>
            </div>

            <!-- Canvas com miniatura da primeira p\xE1gina gerada -->
            <div class="pdf-canvas-wrap">
              <canvas id="s-preview-canvas" class="pdf-preview-canvas"></canvas>
            </div>

            <!-- M\xE9tricas T\xE9cnicas -->
            <div class="pdf-meta-grid">
              <div class="pdf-meta-item">
                <span class="pdf-meta-label">Arquivos Criados</span>
                <span class="pdf-meta-val" id="s-meta-files">1</span>
              </div>
              <div class="pdf-meta-item">
                <span class="pdf-meta-label">P\xE1ginas Extra\xEDdas</span>
                <span class="pdf-meta-val" id="s-meta-pages">1</span>
              </div>
              <div class="pdf-meta-item">
                <span class="pdf-meta-label">Tamanho do Pacote</span>
                <span class="pdf-meta-val" id="s-meta-size">0 KB</span>
              </div>
            </div>

            <!-- Download e Novo PDF -->
            <div class="pdf-result-actions">
              <button type="button" id="s-result-clear-btn" class="pdf-export-btn pdf-export-btn--secondary" title="Dividir outro documento PDF">
                ${ICONS.refresh(15)}
                <span>Novo PDF</span>
              </button>
              <button type="button" id="s-download-btn" class="btn-primary pdf-download-btn">
                ${ICONS.download(15)}
                <span id="s-download-btn-text">Baixar Arquivos</span>
              </button>
            </div>
          </div>

        </div>

      </div>

    </div>
  `;
  }

  // js/tools/pdf-split/tool.js
  var _listeners7 = [];
  var _currentFile4 = null;
  var _currentArrayBuffer3 = null;
  var _currentNumPages = 0;
  var _currentMode = "ranges";
  var _outputBlob = null;
  var _isZip = false;
  var _downloadName = "documentos_divididos.zip";
  function _on6(element, event, handler) {
    if (!element) return;
    element.addEventListener(event, handler);
    _listeners7.push({ element, event, handler });
  }
  function _formatBytes4(bytes) {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / 1048576).toFixed(2) + " MB";
  }
  function _dataUrlToBytes(dataUrl) {
    const parts = dataUrl.split(",");
    const bin = atob(parts[1]);
    const len = bin.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = bin.charCodeAt(i);
    }
    return bytes;
  }
  async function _ensureLibs4() {
    const promises = [];
    if (typeof window === "undefined" || !window.PDFLib) {
      promises.push(loadScript("js/lib/pdf-lib.min.js").catch((e) => console.warn("pdf-lib load:", e)));
    }
    if (typeof window === "undefined" || !window.pdfjsLib) {
      promises.push(loadScript(APP_CONFIG.CDN.PDFJS).catch((e) => console.warn("pdf.js load:", e)));
    }
    if (typeof window === "undefined" || !window.JSZip) {
      promises.push(loadScript(APP_CONFIG.CDN.JSZIP).catch((e) => console.warn("jszip load:", e)));
    }
    if (promises.length > 0) {
      await Promise.all(promises);
    }
    const pdfjsLib2 = typeof window !== "undefined" && window.pdfjsLib || globalThis.pdfjsLib;
    if (pdfjsLib2 && pdfjsLib2.GlobalWorkerOptions && !pdfjsLib2.GlobalWorkerOptions.workerSrc) {
      pdfjsLib2.GlobalWorkerOptions.workerSrc = APP_CONFIG.CDN.PDFJS_WORKER;
    }
  }
  var tool_default8 = {
    id: "pdf-split",
    label: "Dividir PDF",
    render(container) {
      container.innerHTML = getPdfSplitHTML();
    },
    async mount(container) {
      _listeners7 = [];
      _currentFile4 = null;
      _currentArrayBuffer3 = null;
      _currentNumPages = 0;
      _currentMode = "ranges";
      _outputBlob = null;
      _isZip = false;
      const dropzone = container.querySelector("#s-dropzone");
      const fileInput = container.querySelector("#s-file-input");
      const dropPrompt = container.querySelector("#s-dropzone-prompt");
      const fileLoadedBox = container.querySelector("#s-file-loaded");
      const filenameEl = container.querySelector("#s-filename");
      const filesizeEl = container.querySelector("#s-filesize");
      const removeBtn = container.querySelector("#s-remove-btn");
      const modeBtns = container.querySelectorAll(".pdf-mode-btn");
      const paramRanges = container.querySelector("#s-param-ranges");
      const paramExtract = container.querySelector("#s-param-extract");
      const paramAll = container.querySelector("#s-param-all");
      const paramEvery = container.querySelector("#s-param-every");
      const rangesInput = container.querySelector("#s-ranges-input");
      const extractInput = container.querySelector("#s-extract-input");
      const everyInput = container.querySelector("#s-every-input");
      const maxPagesHint = container.querySelector("#s-max-pages-hint");
      const extractHint = container.querySelector("#s-extract-hint");
      const sumOrigPages = container.querySelector("#s-sum-orig-pages");
      const sumOutCount = container.querySelector("#s-sum-out-count");
      const splitBtn = container.querySelector("#s-split-btn");
      const splitBtnText = container.querySelector("#s-split-btn-text");
      const clearInputBtn = container.querySelector("#s-clear-input-btn");
      const resultClearBtn = container.querySelector("#s-result-clear-btn");
      const emptyView = container.querySelector("#s-empty-view");
      const loadingView = container.querySelector("#s-loading-view");
      const loadingProgress = container.querySelector("#s-loading-progress");
      const resultView = container.querySelector("#s-result-view");
      const resultBadge = container.querySelector("#s-result-badge");
      const resultSummary = container.querySelector("#s-result-summary");
      const previewCanvas = container.querySelector("#s-preview-canvas");
      const metaFiles = container.querySelector("#s-meta-files");
      const metaPages = container.querySelector("#s-meta-pages");
      const metaSize = container.querySelector("#s-meta-size");
      const downloadBtn = container.querySelector("#s-download-btn");
      const downloadBtnText = container.querySelector("#s-download-btn-text");
      const loadingTitle = container.querySelector("#s-loading-title");
      const progressPct = container.querySelector("#s-progress-pct");
      const progressFill = container.querySelector("#s-progress-fill");
      const loadingDesc = container.querySelector("#s-loading-desc");
      const progressCounter = container.querySelector("#s-progress-counter");
      function _setViewState(state2) {
        emptyView.style.display = state2 === "empty" ? "flex" : "none";
        loadingView.style.display = state2 === "loading" ? "flex" : "none";
        resultView.style.display = state2 === "result" ? "flex" : "none";
      }
      function _updateProgress(pct, title, desc, counter) {
        if (progressPct) progressPct.textContent = `${pct}%`;
        if (progressFill) progressFill.style.width = `${pct}%`;
        if (title && loadingTitle) loadingTitle.textContent = title;
        if (desc && loadingDesc) loadingDesc.textContent = desc;
        if (counter && progressCounter) progressCounter.textContent = counter;
      }
      function _calcPartitions() {
        if (_currentNumPages <= 0) return [];
        if (_currentMode === "all") {
          const parts2 = [];
          for (let i = 0; i < _currentNumPages; i++) {
            parts2.push({ label: `pag_${i + 1}`, indices: [i] });
          }
          return parts2;
        }
        if (_currentMode === "every") {
          const n = Math.max(1, parseInt(everyInput.value, 10) || 1);
          const parts2 = [];
          for (let i = 0; i < _currentNumPages; i += n) {
            const end = Math.min(i + n, _currentNumPages);
            const indices = [];
            for (let k = i; k < end; k++) indices.push(k);
            parts2.push({ label: `pg${i + 1}-${end}`, indices });
          }
          return parts2;
        }
        if (_currentMode === "extract") {
          const text2 = extractInput.value.trim();
          if (!text2) return [];
          const rawItems = text2.split(",");
          const indicesSet = /* @__PURE__ */ new Set();
          rawItems.forEach((item) => {
            const trimmed = item.trim();
            if (trimmed.includes("-")) {
              const [s, e] = trimmed.split("-").map((x) => parseInt(x.trim(), 10));
              if (!isNaN(s) && !isNaN(e)) {
                const start = Math.max(1, Math.min(s, e));
                const end = Math.min(_currentNumPages, Math.max(s, e));
                for (let p = start; p <= end; p++) indicesSet.add(p - 1);
              }
            } else {
              const p = parseInt(trimmed, 10);
              if (!isNaN(p) && p >= 1 && p <= _currentNumPages) {
                indicesSet.add(p - 1);
              }
            }
          });
          const sorted = Array.from(indicesSet).sort((a, b) => a - b);
          if (sorted.length === 0) return [];
          return [{ label: "paginas_selecionadas", indices: sorted }];
        }
        const text = rangesInput.value.trim();
        if (!text) return [];
        const chunks = text.split(",");
        const parts = [];
        chunks.forEach((chk, idx) => {
          const trimmed = chk.trim();
          if (!trimmed) return;
          if (trimmed.includes("-")) {
            const [s, e] = trimmed.split("-").map((x) => parseInt(x.trim(), 10));
            if (!isNaN(s) && !isNaN(e)) {
              const start = Math.max(1, Math.min(s, e));
              const end = Math.min(_currentNumPages, Math.max(s, e));
              const indices = [];
              for (let p = start; p <= end; p++) indices.push(p - 1);
              if (indices.length > 0) parts.push({ label: `parte_${idx + 1}_pg${start}-${end}`, indices });
            }
          } else {
            const p = parseInt(trimmed, 10);
            if (!isNaN(p) && p >= 1 && p <= _currentNumPages) {
              parts.push({ label: `parte_${idx + 1}_pg${p}`, indices: [p - 1] });
            }
          }
        });
        return parts;
      }
      function _updateSummary() {
        sumOrigPages.textContent = _currentNumPages > 0 ? `${_currentNumPages} p\xE1ginas` : "0 p\xE1ginas";
        const parts = _calcPartitions();
        const count = parts.length;
        sumOutCount.textContent = `${count} ${count === 1 ? "arquivo" : "arquivos"}`;
        if (_currentNumPages > 0 && count > 0) {
          splitBtn.disabled = false;
          splitBtnText.textContent = count === 1 ? "Extrair PDF Agora" : `Dividir em ${count} PDFs`;
        } else {
          splitBtn.disabled = true;
          splitBtnText.textContent = "Dividir PDF";
        }
      }
      function _switchMode(newMode) {
        _currentMode = newMode;
        modeBtns.forEach((btn) => {
          btn.classList.toggle("pdf-mode-btn--active", btn.dataset.mode === newMode);
        });
        paramRanges.style.display = newMode === "ranges" ? "block" : "none";
        paramExtract.style.display = newMode === "extract" ? "block" : "none";
        paramAll.style.display = newMode === "all" ? "block" : "none";
        paramEvery.style.display = newMode === "every" ? "block" : "none";
        _updateSummary();
      }
      async function _handleFile(file) {
        _currentFile4 = file;
        _currentArrayBuffer3 = await file.arrayBuffer();
        filenameEl.textContent = file.name;
        filesizeEl.textContent = _formatBytes4(file.size);
        dropPrompt.style.display = "none";
        fileLoadedBox.style.display = "flex";
        if (clearInputBtn) clearInputBtn.style.display = "inline-flex";
        await _ensureLibs4();
        const pdfjsLib2 = typeof window !== "undefined" && window.pdfjsLib || globalThis.pdfjsLib;
        try {
          const copyBuf = _currentArrayBuffer3.slice(0);
          let numPgs = 1;
          if (pdfjsLib2) {
            const task = pdfjsLib2.getDocument({ data: copyBuf });
            const doc = await task.promise;
            numPgs = doc.numPages;
            try {
              const firstPage = await doc.getPage(1);
              const stageVp = firstPage.getViewport({ scale: 1 });
              const scale = Math.min(260 / stageVp.width, 230 / stageVp.height);
              const scaledVp = firstPage.getViewport({ scale: Math.max(scale, 0.4) });
              previewCanvas.width = scaledVp.width;
              previewCanvas.height = scaledVp.height;
              const ctx = previewCanvas.getContext("2d");
              await firstPage.render({ canvasContext: ctx, viewport: scaledVp }).promise;
            } catch (e) {
              console.warn("Miniatura preview n\xE3o dispon\xEDvel:", e);
            }
          } else {
            const PDFLib = typeof window !== "undefined" && window.PDFLib || globalThis.PDFLib;
            if (PDFLib) {
              const pdfDoc = await PDFLib.PDFDocument.load(copyBuf, { ignoreEncryption: true });
              numPgs = pdfDoc.getPageCount();
            }
          }
          _currentNumPages = numPgs;
          maxPagesHint.textContent = `Total: ${numPgs} p\xE1gs`;
          extractHint.textContent = `Total: ${numPgs} p\xE1gs`;
          if (numPgs === 1) {
            rangesInput.value = "1";
            extractInput.value = "1";
          } else if (numPgs <= 3) {
            rangesInput.value = `1, 2-${numPgs}`;
            extractInput.value = "1";
          } else {
            const mid = Math.floor(numPgs / 2);
            rangesInput.value = `1-${mid}, ${mid + 1}-${numPgs}`;
            extractInput.value = `1, ${numPgs}`;
          }
          _updateSummary();
        } catch (err) {
          console.error("Erro ao ler PDF:", err);
          alert("N\xE3o foi poss\xEDvel ler as p\xE1ginas do documento. O arquivo pode estar protegido por senha.");
          _reset();
        }
      }
      function _reset() {
        _currentFile4 = null;
        _currentArrayBuffer3 = null;
        _currentNumPages = 0;
        _outputBlob = null;
        _isZip = false;
        fileInput.value = "";
        dropPrompt.style.display = "flex";
        fileLoadedBox.style.display = "none";
        if (clearInputBtn) clearInputBtn.style.display = "none";
        maxPagesHint.textContent = "Total: - p\xE1gs";
        extractHint.textContent = "Total: - p\xE1gs";
        splitBtn.disabled = true;
        splitBtnText.textContent = "Dividir PDF";
        _updateSummary();
        _setViewState("empty");
      }
      async function _doSplit() {
        const partitions = _calcPartitions();
        if (!_currentArrayBuffer3 || partitions.length === 0) return;
        _setViewState("loading");
        _updateProgress(5, "Iniciando divis\xE3o...", "Carregando documento e estruturando parti\xE7\xF5es...", `0 / ${partitions.length} partes`);
        await new Promise((r) => setTimeout(r, 25));
        await _ensureLibs4();
        const PDFLib = typeof window !== "undefined" && window.PDFLib || globalThis.PDFLib;
        const pdfjsLib2 = typeof window !== "undefined" && window.pdfjsLib || globalThis.pdfjsLib;
        const JSZip = typeof window !== "undefined" && window.JSZip || globalThis.JSZip;
        if (!PDFLib) {
          alert("Biblioteca PDFLib n\xE3o dispon\xEDvel.");
          _setViewState("empty");
          return;
        }
        try {
          const copyBuf = _currentArrayBuffer3.slice(0);
          let srcDoc = null;
          let usePdfJsFallback = false;
          try {
            srcDoc = await PDFLib.PDFDocument.load(copyBuf, { ignoreEncryption: true });
          } catch (loadErr) {
            usePdfJsFallback = true;
          }
          const generatedFiles = [];
          let totalPagesExtracted = 0;
          const baseName = _currentFile4 ? _currentFile4.name.replace(/\.pdf$/i, "") : "documento";
          for (let i = 0; i < partitions.length; i++) {
            const part = partitions[i];
            const currentPct = Math.round(5 + i / partitions.length * 85);
            _updateProgress(
              currentPct,
              `Gerando arquivo ${i + 1} de ${partitions.length}...`,
              `Extraindo ${part.indices.length} p\xE1gina(s) (${part.label})`,
              `${i + 1} / ${partitions.length} partes`
            );
            await new Promise((r) => setTimeout(r, 15));
            const newDoc = await PDFLib.PDFDocument.create();
            if (!usePdfJsFallback && srcDoc) {
              const copiedPages = await newDoc.copyPages(srcDoc, part.indices);
              copiedPages.forEach((p) => newDoc.addPage(p));
            } else if (pdfjsLib2) {
              const loadingTask = pdfjsLib2.getDocument({ data: copyBuf.slice(0) });
              const jsDoc = await loadingTask.promise;
              for (const pageIdx of part.indices) {
                const page = await jsDoc.getPage(pageIdx + 1);
                const viewport = page.getViewport({ scale: 1.5 });
                const canvas = document.createElement("canvas");
                canvas.width = viewport.width;
                canvas.height = viewport.height;
                const ctx = canvas.getContext("2d");
                await page.render({ canvasContext: ctx, viewport }).promise;
                const imgDataUrl = canvas.toDataURL("image/jpeg", 0.9);
                const bytes = _dataUrlToBytes(imgDataUrl);
                const embedded = await newDoc.embedJpg(bytes);
                const newPage = newDoc.addPage([viewport.width, viewport.height]);
                newPage.drawImage(embedded, {
                  x: 0,
                  y: 0,
                  width: viewport.width,
                  height: viewport.height
                });
              }
            }
            const outBytes = await newDoc.save();
            const fileName = `${baseName}_${part.label}.pdf`;
            generatedFiles.push({ name: fileName, bytes: outBytes });
            totalPagesExtracted += part.indices.length;
          }
          if (generatedFiles.length === 1) {
            _outputBlob = new Blob([generatedFiles[0].bytes], { type: "application/pdf" });
            _isZip = false;
            _downloadName = generatedFiles[0].name;
            resultBadge.textContent = "1 Arquivo Extra\xEDdo";
            resultSummary.textContent = `${totalPagesExtracted} p\xE1gina(s) extra\xEDda(s)`;
            downloadBtnText.textContent = "Baixar Documento (.PDF)";
          } else {
            if (!JSZip) {
              throw new Error("Biblioteca JSZip necess\xE1ria para pacote compactado.");
            }
            _updateProgress(92, "Empacotando arquivos...", `Compactando ${generatedFiles.length} arquivos PDF em .ZIP...`, `${partitions.length} / ${partitions.length} partes`);
            await new Promise((r) => setTimeout(r, 20));
            const zip = new JSZip();
            generatedFiles.forEach((f) => {
              zip.file(f.name, f.bytes);
            });
            const zipBlob = await zip.generateAsync({ type: "blob" });
            _outputBlob = zipBlob;
            _isZip = true;
            _downloadName = `${baseName}_dividido.zip`;
            resultBadge.textContent = `${generatedFiles.length} Arquivos Gerados`;
            resultSummary.textContent = `${totalPagesExtracted} p\xE1ginas distribu\xEDdas em ${generatedFiles.length} arquivos`;
            downloadBtnText.textContent = `Baixar Pacote (${generatedFiles.length} PDFs em .ZIP)`;
          }
          _updateProgress(100, "Divis\xE3o conclu\xEDda com sucesso!", "Preparando visualiza\xE7\xE3o...", `${partitions.length} / ${partitions.length} partes`);
          await new Promise((r) => setTimeout(r, 20));
          metaFiles.textContent = generatedFiles.length;
          metaPages.textContent = totalPagesExtracted;
          metaSize.textContent = _formatBytes4(_outputBlob.size);
          if (pdfjsLib2 && generatedFiles[0]) {
            try {
              const previewTask = pdfjsLib2.getDocument({ data: generatedFiles[0].bytes.slice(0) });
              const previewDoc = await previewTask.promise;
              const firstPage = await previewDoc.getPage(1);
              const stageVp = firstPage.getViewport({ scale: 1 });
              const scale = Math.min(260 / stageVp.width, 230 / stageVp.height);
              const scaledVp = firstPage.getViewport({ scale: Math.max(scale, 0.4) });
              previewCanvas.width = scaledVp.width;
              previewCanvas.height = scaledVp.height;
              const ctx = previewCanvas.getContext("2d");
              await firstPage.render({ canvasContext: ctx, viewport: scaledVp }).promise;
            } catch (e) {
              console.warn("Erro ao renderizar thumbnail gerada:", e);
            }
          }
          _setViewState("result");
        } catch (err) {
          console.error("Falha ao dividir PDF:", err);
          _setViewState("empty");
          alert("Erro ao processar a divis\xE3o do PDF. Verifique os intervalos informados.");
        }
      }
      _on6(dropzone, "click", (e) => {
        if (!_currentFile4) {
          fileInput.click();
        }
      });
      _on6(dropzone, "keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          if (!_currentFile4) fileInput.click();
        }
      });
      _on6(fileInput, "change", (e) => {
        const file = e.target.files && e.target.files[0];
        if (file) _handleFile(file);
      });
      _on6(dropzone, "dragover", (e) => {
        e.preventDefault();
        dropzone.classList.add("pdf-drag-over");
      });
      _on6(dropzone, "dragleave", () => dropzone.classList.remove("pdf-drag-over"));
      _on6(dropzone, "drop", (e) => {
        e.preventDefault();
        dropzone.classList.remove("pdf-drag-over");
        const file = e.dataTransfer?.files?.[0];
        if (file && (file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf"))) {
          _handleFile(file);
        }
      });
      modeBtns.forEach((btn) => {
        _on6(btn, "click", () => {
          _switchMode(btn.dataset.mode);
        });
      });
      _on6(rangesInput, "input", _updateSummary);
      _on6(extractInput, "input", _updateSummary);
      _on6(everyInput, "input", _updateSummary);
      _on6(splitBtn, "click", _doSplit);
      if (clearInputBtn) _on6(clearInputBtn, "click", _reset);
      if (resultClearBtn) _on6(resultClearBtn, "click", _reset);
      _on6(downloadBtn, "click", () => {
        if (!_outputBlob) return;
        const url = URL.createObjectURL(_outputBlob);
        const a = document.createElement("a");
        a.href = url;
        a.download = _downloadName;
        document.body.appendChild(a);
        a.click();
        setTimeout(() => {
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
        }, 500);
      });
      _ensureLibs4().catch((err) => console.warn("Carregamento de bibliotecas PDF:", err));
    },
    unmount() {
      _listeners7.forEach(({ element, event, handler }) => {
        if (element) element.removeEventListener(event, handler);
      });
      _listeners7 = [];
      _currentFile4 = null;
      _currentArrayBuffer3 = null;
      _currentNumPages = 0;
      _outputBlob = null;
      _isZip = false;
    }
  };

  // js/tool-registry.js
  var STORAGE_KEY_ACTIVE_TOOL = "opentool_active_tool";
  var BUILTIN_TOOLS = {
    hub: tool_default3,
    doc2md: tool_default,
    qrcode: tool_default2,
    img2vector: tool_default4,
    "pdf-unlock": tool_default5,
    "pdf-compress": tool_default6,
    "pdf-merge": tool_default7,
    "pdf-split": tool_default8
  };
  var _preloadedModules = /* @__PURE__ */ new Map();
  var TOOL_CATALOG = [
    {
      id: "hub",
      label: "Todas as Ferramentas",
      description: "Cat\xE1logo geral estilo PDF24 Tools com todas as ferramentas dispon\xEDveis",
      icon: ICONS.toolHub(18)
    },
    {
      id: "doc2md",
      label: "Doc \u2192 MD",
      description: "Converta documentos, planilhas, PDFs e c\xF3digo para Markdown estruturado",
      icon: ICONS.toolDoc2md(18)
    },
    {
      id: "qrcode",
      label: "QR Code",
      description: "Gere QR Codes a partir de links e texto \u2014 100% local, sem servidores",
      icon: ICONS.toolQrcode(18)
    },
    {
      id: "img2vector",
      label: "Image to Vector",
      description: "Vetorize imagens rasterizadas (PNG, JPG, WEBP) para SVG com curvas B\xE9zier 100% local",
      icon: ICONS.toolVector(18)
    },
    {
      id: "pdf-unlock",
      label: "Desbloquear PDF",
      description: "Remova senhas e restri\xE7\xF5es de permiss\xF5es (edi\xE7\xE3o, c\xF3pia, impress\xE3o) de arquivos PDF",
      icon: ICONS.toolUnlock(18)
    },
    {
      id: "pdf-compress",
      label: "Comprimir PDF",
      description: "Reduza o tamanho de PDFs com reamostragem inteligente de imagens e ajuste de DPI",
      icon: ICONS.toolCompress(18)
    },
    {
      id: "pdf-merge",
      label: "Mesclar PDF",
      description: "Junte m\xFAltiplos documentos PDF em um \xFAnico arquivo ordenado 100% local",
      icon: ICONS.toolMerge(18)
    },
    {
      id: "pdf-split",
      label: "Dividir PDF",
      description: "Separe p\xE1ginas, extraia intervalos espec\xEDficos ou desmembre cada p\xE1gina em arquivos individuais 100% local",
      icon: ICONS.toolSplit(18)
    }
  ];
  var _activeModule = null;
  var _activeToolId = null;
  var _viewport = null;
  async function initRegistry(viewport) {
    _viewport = viewport;
    const savedTool = localStorage.getItem(STORAGE_KEY_ACTIVE_TOOL);
    const initialTool = TOOL_CATALOG.find((t) => t.id === savedTool) || TOOL_CATALOG.find((t) => t.id === "doc2md") || TOOL_CATALOG[0];
    await activateTool(initialTool.id);
  }
  async function activateTool(toolId) {
    if (toolId === _activeToolId) return;
    const toolMeta = TOOL_CATALOG.find((t) => t.id === toolId);
    if (!toolMeta) {
      console.error(`[ToolRegistry] Ferramenta desconhecida: ${toolId}`);
      return;
    }
    if (_activeModule && typeof _activeModule.unmount === "function") {
      try {
        _activeModule.unmount();
      } catch (e) {
      }
    }
    if (!_viewport && typeof document !== "undefined") {
      _viewport = document.getElementById("toolViewport");
    }
    if (_viewport) {
      _viewport.classList.add("tool-viewport--transitioning");
      _viewport.style.minHeight = _viewport.offsetHeight + "px";
    }
    try {
      let mod = null;
      if (BUILTIN_TOOLS[toolId]) {
        mod = { default: BUILTIN_TOOLS[toolId] };
      } else if (_preloadedModules.has(toolId)) {
        mod = { default: _preloadedModules.get(toolId) };
      } else if (typeof window !== "undefined" && window.__OPEN_TOOL_MODULES__ && window.__OPEN_TOOL_MODULES__[toolId]) {
        mod = { default: window.__OPEN_TOOL_MODULES__[toolId] };
      } else if (toolMeta.modulePath) {
        mod = await import(toolMeta.modulePath);
      }
      _activeModule = mod.default;
      _activeToolId = toolId;
      if (typeof _activeModule.render === "function") {
        _activeModule.render(_viewport);
      }
      _viewport.style.minHeight = "";
      await new Promise((r) => setTimeout(r, 20));
      if (typeof _activeModule.mount === "function") {
        await _activeModule.mount(_viewport);
      }
      localStorage.setItem(STORAGE_KEY_ACTIVE_TOOL, toolId);
      _updateNavbar(toolId);
      const raf = typeof requestAnimationFrame !== "undefined" ? requestAnimationFrame : (cb) => setTimeout(cb, 16);
      raf(() => {
        _viewport.classList.remove("tool-viewport--transitioning");
      });
    } catch (err) {
      console.error(`[ToolRegistry] Falha ao carregar ferramenta "${toolId}":`, err);
      _viewport.classList.remove("tool-viewport--transitioning");
      _viewport.style.minHeight = "";
      _viewport.innerHTML = `<div class="tool-error-state">
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="color:var(--error-color);opacity:.6">
        <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
      </svg>
      <p>Falha ao carregar <strong>${toolMeta.label}</strong></p>
      <p class="tool-error-detail">${err.message}</p>
    </div>`;
    }
  }
  function renderToolbar(container) {
    container.innerHTML = `
    <nav class="tool-navbar" role="tablist" aria-label="Ferramentas dispon\xEDveis">
      <div class="tool-navbar-inner">
        ${TOOL_CATALOG.map((tool4) => `
          <button
            class="tool-nav-btn"
            data-tool-id="${tool4.id}"
            role="tab"
            aria-selected="false"
            title="${tool4.description}"
            id="tool-tab-${tool4.id}"
          >
            <span class="tool-nav-icon" aria-hidden="true">${tool4.icon}</span>
            <span class="tool-nav-label">${tool4.label}</span>
          </button>
        `).join("")}
      </div>
    </nav>
  `;
    container.querySelectorAll(".tool-nav-btn").forEach((btn) => {
      btn.addEventListener("click", () => activateTool(btn.dataset.toolId));
    });
  }
  function _updateNavbar(activeToolId) {
    if (typeof document === "undefined" || typeof document.querySelectorAll !== "function") return;
    document.querySelectorAll(".tool-nav-btn").forEach((btn) => {
      const isActive = btn.dataset.toolId === activeToolId;
      btn.classList.toggle("tool-nav-btn--active", isActive);
      btn.setAttribute("aria-selected", String(isActive));
    });
  }

  // js/main.js
  window.__openToolRegistryActive = true;
  function initTheme2() {
    const toggleBtn = document.getElementById("theme-toggle");
    const iconSun = document.getElementById("theme-icon-sun");
    const iconMoon = document.getElementById("theme-icon-moon");
    function applyTheme2(theme) {
      document.documentElement.setAttribute("data-theme", theme);
      const isDark = theme === "dark" || theme === "system" && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
      if (iconSun) iconSun.style.display = isDark ? "none" : "";
      if (iconMoon) iconMoon.style.display = isDark ? "" : "none";
    }
    const stored = localStorage.getItem(APP_CONFIG.STORAGE_KEYS.THEME) || "system";
    applyTheme2(stored);
    if (toggleBtn) {
      toggleBtn.addEventListener("click", () => {
        const current = document.documentElement.getAttribute("data-theme") || "system";
        const next = current === "dark" ? "light" : "dark";
        applyTheme2(next);
        localStorage.setItem(APP_CONFIG.STORAGE_KEYS.THEME, next);
      });
    }
    if (window.matchMedia) {
      window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
        const stored2 = localStorage.getItem(APP_CONFIG.STORAGE_KEYS.THEME) || "system";
        if (stored2 === "system") applyTheme2("system");
      });
    }
  }
  function initVersion2() {
    const headerVersion = document.getElementById("header-version");
    const footerVersion = document.getElementById("footer-version");
    if (headerVersion) headerVersion.textContent = APP_CONFIG.VERSION;
    if (footerVersion) footerVersion.textContent = APP_CONFIG.VERSION;
  }
  async function boot2() {
    initVersion2();
    initTheme2();
    const navbarContainer = document.getElementById("tool-navbar-container");
    if (navbarContainer) {
      renderToolbar(navbarContainer);
    }
    const viewport = document.getElementById("tool-viewport");
    if (viewport) {
      await initRegistry(viewport);
    }
  }
  if (typeof document !== "undefined") {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", boot2);
    } else {
      boot2();
    }
  }

  // js/bundle-entry.js
  if (typeof window !== "undefined") {
    window.__openToolRegistryActive = true;
  }
})();
/*! Bundled license information:

jszip/dist/jszip.min.js:
  (*!
  
  JSZip v3.10.2 - A JavaScript class for generating and reading zip files
  <http://stuartk.com/jszip>
  
  (c) 2009-2016 Stuart Knightley <stuart [at] stuartk.com>
  Dual licenced under the MIT license or GPLv3. See https://raw.github.com/Stuk/jszip/main/LICENSE.markdown.
  
  JSZip uses the library pako released under the MIT license :
  https://github.com/nodeca/pako/blob/main/LICENSE
  *)
*/
