var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// node_modules/@anthropic-ai/sdk/internal/errors.mjs
function isAbortError(err) {
  return typeof err === "object" && err !== null && // Spec-compliant fetch implementations
  ("name" in err && err.name === "AbortError" || // Expo fetch
  "message" in err && String(err.message).includes("FetchRequestCanceledException"));
}
var castToError;
var init_errors = __esm({
  "node_modules/@anthropic-ai/sdk/internal/errors.mjs"() {
    castToError = (err) => {
      if (err instanceof Error)
        return err;
      if (typeof err === "object" && err !== null) {
        try {
          if (Object.prototype.toString.call(err) === "[object Error]") {
            const error = new Error(err.message, err.cause ? { cause: err.cause } : {});
            if (err.stack)
              error.stack = err.stack;
            if (err.cause && !error.cause)
              error.cause = err.cause;
            if (err.name)
              error.name = err.name;
            return error;
          }
        } catch {
        }
        try {
          return new Error(JSON.stringify(err));
        } catch {
        }
      }
      return new Error(err);
    };
  }
});

// node_modules/@anthropic-ai/sdk/core/error.mjs
var AnthropicError, APIError, APIUserAbortError, APIConnectionError, APIConnectionTimeoutError, RetryableError, BadRequestError, AuthenticationError, PermissionDeniedError, NotFoundError, ConflictError, UnprocessableEntityError, RateLimitError, InternalServerError;
var init_error = __esm({
  "node_modules/@anthropic-ai/sdk/core/error.mjs"() {
    init_errors();
    AnthropicError = class extends Error {
    };
    APIError = class _APIError extends AnthropicError {
      constructor(status, error, message, headers, type) {
        super(`${_APIError.makeMessage(status, error, message)}`);
        this.status = status;
        this.headers = headers;
        this.requestID = headers?.get("request-id");
        this.error = error;
        this.type = type ?? null;
      }
      static makeMessage(status, error, message) {
        const msg = error?.message ? typeof error.message === "string" ? error.message : JSON.stringify(error.message) : error ? JSON.stringify(error) : message;
        if (status && msg) {
          return `${status} ${msg}`;
        }
        if (status) {
          return `${status} status code (no body)`;
        }
        if (msg) {
          return msg;
        }
        return "(no status code or body)";
      }
      static generate(status, errorResponse, message, headers) {
        if (!status || !headers) {
          return new APIConnectionError({ message, cause: castToError(errorResponse) });
        }
        const error = errorResponse;
        const type = error?.["error"]?.["type"];
        if (status === 400) {
          return new BadRequestError(status, error, message, headers, type);
        }
        if (status === 401) {
          return new AuthenticationError(status, error, message, headers, type);
        }
        if (status === 403) {
          return new PermissionDeniedError(status, error, message, headers, type);
        }
        if (status === 404) {
          return new NotFoundError(status, error, message, headers, type);
        }
        if (status === 409) {
          return new ConflictError(status, error, message, headers, type);
        }
        if (status === 422) {
          return new UnprocessableEntityError(status, error, message, headers, type);
        }
        if (status === 429) {
          return new RateLimitError(status, error, message, headers, type);
        }
        if (status >= 500) {
          return new InternalServerError(status, error, message, headers, type);
        }
        return new _APIError(status, error, message, headers, type);
      }
    };
    APIUserAbortError = class extends APIError {
      constructor({ message } = {}) {
        super(void 0, void 0, message || "Request was aborted.", void 0);
      }
    };
    APIConnectionError = class extends APIError {
      constructor({ message, cause }) {
        super(void 0, void 0, message || "Connection error.", void 0);
        if (cause)
          this.cause = cause;
      }
    };
    APIConnectionTimeoutError = class extends APIConnectionError {
      constructor({ message } = {}) {
        super({ message: message ?? "Request timed out." });
      }
    };
    RetryableError = class extends AnthropicError {
      constructor(message, { cause } = {}) {
        super(message ?? "Retryable error.");
        if (cause !== void 0)
          this.cause = cause;
      }
    };
    BadRequestError = class extends APIError {
    };
    AuthenticationError = class extends APIError {
    };
    PermissionDeniedError = class extends APIError {
    };
    NotFoundError = class extends APIError {
    };
    ConflictError = class extends APIError {
    };
    UnprocessableEntityError = class extends APIError {
    };
    RateLimitError = class extends APIError {
    };
    InternalServerError = class extends APIError {
    };
  }
});

// node_modules/@stablelib/base64/lib/base64.js
var require_base64 = __commonJS({
  "node_modules/@stablelib/base64/lib/base64.js"(exports) {
    "use strict";
    var __extends = exports && exports.__extends || /* @__PURE__ */ function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2) if (b2.hasOwnProperty(p)) d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    Object.defineProperty(exports, "__esModule", { value: true });
    var INVALID_BYTE = 256;
    var Coder = (
      /** @class */
      function() {
        function Coder2(_paddingCharacter) {
          if (_paddingCharacter === void 0) {
            _paddingCharacter = "=";
          }
          this._paddingCharacter = _paddingCharacter;
        }
        Coder2.prototype.encodedLength = function(length) {
          if (!this._paddingCharacter) {
            return (length * 8 + 5) / 6 | 0;
          }
          return (length + 2) / 3 * 4 | 0;
        };
        Coder2.prototype.encode = function(data) {
          var out = "";
          var i = 0;
          for (; i < data.length - 2; i += 3) {
            var c = data[i] << 16 | data[i + 1] << 8 | data[i + 2];
            out += this._encodeByte(c >>> 3 * 6 & 63);
            out += this._encodeByte(c >>> 2 * 6 & 63);
            out += this._encodeByte(c >>> 1 * 6 & 63);
            out += this._encodeByte(c >>> 0 * 6 & 63);
          }
          var left = data.length - i;
          if (left > 0) {
            var c = data[i] << 16 | (left === 2 ? data[i + 1] << 8 : 0);
            out += this._encodeByte(c >>> 3 * 6 & 63);
            out += this._encodeByte(c >>> 2 * 6 & 63);
            if (left === 2) {
              out += this._encodeByte(c >>> 1 * 6 & 63);
            } else {
              out += this._paddingCharacter || "";
            }
            out += this._paddingCharacter || "";
          }
          return out;
        };
        Coder2.prototype.maxDecodedLength = function(length) {
          if (!this._paddingCharacter) {
            return (length * 6 + 7) / 8 | 0;
          }
          return length / 4 * 3 | 0;
        };
        Coder2.prototype.decodedLength = function(s) {
          return this.maxDecodedLength(s.length - this._getPaddingLength(s));
        };
        Coder2.prototype.decode = function(s) {
          if (s.length === 0) {
            return new Uint8Array(0);
          }
          var paddingLength = this._getPaddingLength(s);
          var length = s.length - paddingLength;
          var out = new Uint8Array(this.maxDecodedLength(length));
          var op = 0;
          var i = 0;
          var haveBad = 0;
          var v0 = 0, v1 = 0, v2 = 0, v3 = 0;
          for (; i < length - 4; i += 4) {
            v0 = this._decodeChar(s.charCodeAt(i + 0));
            v1 = this._decodeChar(s.charCodeAt(i + 1));
            v2 = this._decodeChar(s.charCodeAt(i + 2));
            v3 = this._decodeChar(s.charCodeAt(i + 3));
            out[op++] = v0 << 2 | v1 >>> 4;
            out[op++] = v1 << 4 | v2 >>> 2;
            out[op++] = v2 << 6 | v3;
            haveBad |= v0 & INVALID_BYTE;
            haveBad |= v1 & INVALID_BYTE;
            haveBad |= v2 & INVALID_BYTE;
            haveBad |= v3 & INVALID_BYTE;
          }
          if (i < length - 1) {
            v0 = this._decodeChar(s.charCodeAt(i));
            v1 = this._decodeChar(s.charCodeAt(i + 1));
            out[op++] = v0 << 2 | v1 >>> 4;
            haveBad |= v0 & INVALID_BYTE;
            haveBad |= v1 & INVALID_BYTE;
          }
          if (i < length - 2) {
            v2 = this._decodeChar(s.charCodeAt(i + 2));
            out[op++] = v1 << 4 | v2 >>> 2;
            haveBad |= v2 & INVALID_BYTE;
          }
          if (i < length - 3) {
            v3 = this._decodeChar(s.charCodeAt(i + 3));
            out[op++] = v2 << 6 | v3;
            haveBad |= v3 & INVALID_BYTE;
          }
          if (haveBad !== 0) {
            throw new Error("Base64Coder: incorrect characters for decoding");
          }
          return out;
        };
        Coder2.prototype._encodeByte = function(b) {
          var result = b;
          result += 65;
          result += 25 - b >>> 8 & 0 - 65 - 26 + 97;
          result += 51 - b >>> 8 & 26 - 97 - 52 + 48;
          result += 61 - b >>> 8 & 52 - 48 - 62 + 43;
          result += 62 - b >>> 8 & 62 - 43 - 63 + 47;
          return String.fromCharCode(result);
        };
        Coder2.prototype._decodeChar = function(c) {
          var result = INVALID_BYTE;
          result += (42 - c & c - 44) >>> 8 & -INVALID_BYTE + c - 43 + 62;
          result += (46 - c & c - 48) >>> 8 & -INVALID_BYTE + c - 47 + 63;
          result += (47 - c & c - 58) >>> 8 & -INVALID_BYTE + c - 48 + 52;
          result += (64 - c & c - 91) >>> 8 & -INVALID_BYTE + c - 65 + 0;
          result += (96 - c & c - 123) >>> 8 & -INVALID_BYTE + c - 97 + 26;
          return result;
        };
        Coder2.prototype._getPaddingLength = function(s) {
          var paddingLength = 0;
          if (this._paddingCharacter) {
            for (var i = s.length - 1; i >= 0; i--) {
              if (s[i] !== this._paddingCharacter) {
                break;
              }
              paddingLength++;
            }
            if (s.length < 4 || paddingLength > 2) {
              throw new Error("Base64Coder: incorrect padding");
            }
          }
          return paddingLength;
        };
        return Coder2;
      }()
    );
    exports.Coder = Coder;
    var stdCoder = new Coder();
    function encode2(data) {
      return stdCoder.encode(data);
    }
    exports.encode = encode2;
    function decode(s) {
      return stdCoder.decode(s);
    }
    exports.decode = decode;
    var URLSafeCoder = (
      /** @class */
      function(_super) {
        __extends(URLSafeCoder2, _super);
        function URLSafeCoder2() {
          return _super !== null && _super.apply(this, arguments) || this;
        }
        URLSafeCoder2.prototype._encodeByte = function(b) {
          var result = b;
          result += 65;
          result += 25 - b >>> 8 & 0 - 65 - 26 + 97;
          result += 51 - b >>> 8 & 26 - 97 - 52 + 48;
          result += 61 - b >>> 8 & 52 - 48 - 62 + 45;
          result += 62 - b >>> 8 & 62 - 45 - 63 + 95;
          return String.fromCharCode(result);
        };
        URLSafeCoder2.prototype._decodeChar = function(c) {
          var result = INVALID_BYTE;
          result += (44 - c & c - 46) >>> 8 & -INVALID_BYTE + c - 45 + 62;
          result += (94 - c & c - 96) >>> 8 & -INVALID_BYTE + c - 95 + 63;
          result += (47 - c & c - 58) >>> 8 & -INVALID_BYTE + c - 48 + 52;
          result += (64 - c & c - 91) >>> 8 & -INVALID_BYTE + c - 65 + 0;
          result += (96 - c & c - 123) >>> 8 & -INVALID_BYTE + c - 97 + 26;
          return result;
        };
        return URLSafeCoder2;
      }(Coder)
    );
    exports.URLSafeCoder = URLSafeCoder;
    var urlSafeCoder = new URLSafeCoder();
    function encodeURLSafe(data) {
      return urlSafeCoder.encode(data);
    }
    exports.encodeURLSafe = encodeURLSafe;
    function decodeURLSafe(s) {
      return urlSafeCoder.decode(s);
    }
    exports.decodeURLSafe = decodeURLSafe;
    exports.encodedLength = function(length) {
      return stdCoder.encodedLength(length);
    };
    exports.maxDecodedLength = function(length) {
      return stdCoder.maxDecodedLength(length);
    };
    exports.decodedLength = function(s) {
      return stdCoder.decodedLength(s);
    };
  }
});

// node_modules/fast-sha256/sha256.js
var require_sha256 = __commonJS({
  "node_modules/fast-sha256/sha256.js"(exports, module2) {
    (function(root, factory) {
      var exports2 = {};
      factory(exports2);
      var sha256 = exports2["default"];
      for (var k in exports2) {
        sha256[k] = exports2[k];
      }
      if (typeof module2 === "object" && typeof module2.exports === "object") {
        module2.exports = sha256;
      } else if (typeof define === "function" && define.amd) {
        define(function() {
          return sha256;
        });
      } else {
        root.sha256 = sha256;
      }
    })(exports, function(exports2) {
      "use strict";
      exports2.__esModule = true;
      exports2.digestLength = 32;
      exports2.blockSize = 64;
      var K = new Uint32Array([
        1116352408,
        1899447441,
        3049323471,
        3921009573,
        961987163,
        1508970993,
        2453635748,
        2870763221,
        3624381080,
        310598401,
        607225278,
        1426881987,
        1925078388,
        2162078206,
        2614888103,
        3248222580,
        3835390401,
        4022224774,
        264347078,
        604807628,
        770255983,
        1249150122,
        1555081692,
        1996064986,
        2554220882,
        2821834349,
        2952996808,
        3210313671,
        3336571891,
        3584528711,
        113926993,
        338241895,
        666307205,
        773529912,
        1294757372,
        1396182291,
        1695183700,
        1986661051,
        2177026350,
        2456956037,
        2730485921,
        2820302411,
        3259730800,
        3345764771,
        3516065817,
        3600352804,
        4094571909,
        275423344,
        430227734,
        506948616,
        659060556,
        883997877,
        958139571,
        1322822218,
        1537002063,
        1747873779,
        1955562222,
        2024104815,
        2227730452,
        2361852424,
        2428436474,
        2756734187,
        3204031479,
        3329325298
      ]);
      function hashBlocks(w, v, p, pos, len) {
        var a, b, c, d, e, f, g, h, u, i, j, t1, t2;
        while (len >= 64) {
          a = v[0];
          b = v[1];
          c = v[2];
          d = v[3];
          e = v[4];
          f = v[5];
          g = v[6];
          h = v[7];
          for (i = 0; i < 16; i++) {
            j = pos + i * 4;
            w[i] = (p[j] & 255) << 24 | (p[j + 1] & 255) << 16 | (p[j + 2] & 255) << 8 | p[j + 3] & 255;
          }
          for (i = 16; i < 64; i++) {
            u = w[i - 2];
            t1 = (u >>> 17 | u << 32 - 17) ^ (u >>> 19 | u << 32 - 19) ^ u >>> 10;
            u = w[i - 15];
            t2 = (u >>> 7 | u << 32 - 7) ^ (u >>> 18 | u << 32 - 18) ^ u >>> 3;
            w[i] = (t1 + w[i - 7] | 0) + (t2 + w[i - 16] | 0);
          }
          for (i = 0; i < 64; i++) {
            t1 = (((e >>> 6 | e << 32 - 6) ^ (e >>> 11 | e << 32 - 11) ^ (e >>> 25 | e << 32 - 25)) + (e & f ^ ~e & g) | 0) + (h + (K[i] + w[i] | 0) | 0) | 0;
            t2 = ((a >>> 2 | a << 32 - 2) ^ (a >>> 13 | a << 32 - 13) ^ (a >>> 22 | a << 32 - 22)) + (a & b ^ a & c ^ b & c) | 0;
            h = g;
            g = f;
            f = e;
            e = d + t1 | 0;
            d = c;
            c = b;
            b = a;
            a = t1 + t2 | 0;
          }
          v[0] += a;
          v[1] += b;
          v[2] += c;
          v[3] += d;
          v[4] += e;
          v[5] += f;
          v[6] += g;
          v[7] += h;
          pos += 64;
          len -= 64;
        }
        return pos;
      }
      var Hash = (
        /** @class */
        function() {
          function Hash2() {
            this.digestLength = exports2.digestLength;
            this.blockSize = exports2.blockSize;
            this.state = new Int32Array(8);
            this.temp = new Int32Array(64);
            this.buffer = new Uint8Array(128);
            this.bufferLength = 0;
            this.bytesHashed = 0;
            this.finished = false;
            this.reset();
          }
          Hash2.prototype.reset = function() {
            this.state[0] = 1779033703;
            this.state[1] = 3144134277;
            this.state[2] = 1013904242;
            this.state[3] = 2773480762;
            this.state[4] = 1359893119;
            this.state[5] = 2600822924;
            this.state[6] = 528734635;
            this.state[7] = 1541459225;
            this.bufferLength = 0;
            this.bytesHashed = 0;
            this.finished = false;
            return this;
          };
          Hash2.prototype.clean = function() {
            for (var i = 0; i < this.buffer.length; i++) {
              this.buffer[i] = 0;
            }
            for (var i = 0; i < this.temp.length; i++) {
              this.temp[i] = 0;
            }
            this.reset();
          };
          Hash2.prototype.update = function(data, dataLength) {
            if (dataLength === void 0) {
              dataLength = data.length;
            }
            if (this.finished) {
              throw new Error("SHA256: can't update because hash was finished.");
            }
            var dataPos = 0;
            this.bytesHashed += dataLength;
            if (this.bufferLength > 0) {
              while (this.bufferLength < 64 && dataLength > 0) {
                this.buffer[this.bufferLength++] = data[dataPos++];
                dataLength--;
              }
              if (this.bufferLength === 64) {
                hashBlocks(this.temp, this.state, this.buffer, 0, 64);
                this.bufferLength = 0;
              }
            }
            if (dataLength >= 64) {
              dataPos = hashBlocks(this.temp, this.state, data, dataPos, dataLength);
              dataLength %= 64;
            }
            while (dataLength > 0) {
              this.buffer[this.bufferLength++] = data[dataPos++];
              dataLength--;
            }
            return this;
          };
          Hash2.prototype.finish = function(out) {
            if (!this.finished) {
              var bytesHashed = this.bytesHashed;
              var left = this.bufferLength;
              var bitLenHi = bytesHashed / 536870912 | 0;
              var bitLenLo = bytesHashed << 3;
              var padLength = bytesHashed % 64 < 56 ? 64 : 128;
              this.buffer[left] = 128;
              for (var i = left + 1; i < padLength - 8; i++) {
                this.buffer[i] = 0;
              }
              this.buffer[padLength - 8] = bitLenHi >>> 24 & 255;
              this.buffer[padLength - 7] = bitLenHi >>> 16 & 255;
              this.buffer[padLength - 6] = bitLenHi >>> 8 & 255;
              this.buffer[padLength - 5] = bitLenHi >>> 0 & 255;
              this.buffer[padLength - 4] = bitLenLo >>> 24 & 255;
              this.buffer[padLength - 3] = bitLenLo >>> 16 & 255;
              this.buffer[padLength - 2] = bitLenLo >>> 8 & 255;
              this.buffer[padLength - 1] = bitLenLo >>> 0 & 255;
              hashBlocks(this.temp, this.state, this.buffer, 0, padLength);
              this.finished = true;
            }
            for (var i = 0; i < 8; i++) {
              out[i * 4 + 0] = this.state[i] >>> 24 & 255;
              out[i * 4 + 1] = this.state[i] >>> 16 & 255;
              out[i * 4 + 2] = this.state[i] >>> 8 & 255;
              out[i * 4 + 3] = this.state[i] >>> 0 & 255;
            }
            return this;
          };
          Hash2.prototype.digest = function() {
            var out = new Uint8Array(this.digestLength);
            this.finish(out);
            return out;
          };
          Hash2.prototype._saveState = function(out) {
            for (var i = 0; i < this.state.length; i++) {
              out[i] = this.state[i];
            }
          };
          Hash2.prototype._restoreState = function(from, bytesHashed) {
            for (var i = 0; i < this.state.length; i++) {
              this.state[i] = from[i];
            }
            this.bytesHashed = bytesHashed;
            this.finished = false;
            this.bufferLength = 0;
          };
          return Hash2;
        }()
      );
      exports2.Hash = Hash;
      var HMAC = (
        /** @class */
        function() {
          function HMAC2(key) {
            this.inner = new Hash();
            this.outer = new Hash();
            this.blockSize = this.inner.blockSize;
            this.digestLength = this.inner.digestLength;
            var pad2 = new Uint8Array(this.blockSize);
            if (key.length > this.blockSize) {
              new Hash().update(key).finish(pad2).clean();
            } else {
              for (var i = 0; i < key.length; i++) {
                pad2[i] = key[i];
              }
            }
            for (var i = 0; i < pad2.length; i++) {
              pad2[i] ^= 54;
            }
            this.inner.update(pad2);
            for (var i = 0; i < pad2.length; i++) {
              pad2[i] ^= 54 ^ 92;
            }
            this.outer.update(pad2);
            this.istate = new Uint32Array(8);
            this.ostate = new Uint32Array(8);
            this.inner._saveState(this.istate);
            this.outer._saveState(this.ostate);
            for (var i = 0; i < pad2.length; i++) {
              pad2[i] = 0;
            }
          }
          HMAC2.prototype.reset = function() {
            this.inner._restoreState(this.istate, this.inner.blockSize);
            this.outer._restoreState(this.ostate, this.outer.blockSize);
            return this;
          };
          HMAC2.prototype.clean = function() {
            for (var i = 0; i < this.istate.length; i++) {
              this.ostate[i] = this.istate[i] = 0;
            }
            this.inner.clean();
            this.outer.clean();
          };
          HMAC2.prototype.update = function(data) {
            this.inner.update(data);
            return this;
          };
          HMAC2.prototype.finish = function(out) {
            if (this.outer.finished) {
              this.outer.finish(out);
            } else {
              this.inner.finish(out);
              this.outer.update(out, this.digestLength).finish(out);
            }
            return this;
          };
          HMAC2.prototype.digest = function() {
            var out = new Uint8Array(this.digestLength);
            this.finish(out);
            return out;
          };
          return HMAC2;
        }()
      );
      exports2.HMAC = HMAC;
      function hash(data) {
        var h = new Hash().update(data);
        var digest = h.digest();
        h.clean();
        return digest;
      }
      exports2.hash = hash;
      exports2["default"] = hash;
      function hmac(key, data) {
        var h = new HMAC(key).update(data);
        var digest = h.digest();
        h.clean();
        return digest;
      }
      exports2.hmac = hmac;
      function fillBuffer(buffer, hmac2, info, counter) {
        var num = counter[0];
        if (num === 0) {
          throw new Error("hkdf: cannot expand more");
        }
        hmac2.reset();
        if (num > 1) {
          hmac2.update(buffer);
        }
        if (info) {
          hmac2.update(info);
        }
        hmac2.update(counter);
        hmac2.finish(buffer);
        counter[0]++;
      }
      var hkdfSalt = new Uint8Array(exports2.digestLength);
      function hkdf(key, salt, info, length) {
        if (salt === void 0) {
          salt = hkdfSalt;
        }
        if (length === void 0) {
          length = 32;
        }
        var counter = new Uint8Array([1]);
        var okm = hmac(salt, key);
        var hmac_ = new HMAC(okm);
        var buffer = new Uint8Array(hmac_.digestLength);
        var bufpos = buffer.length;
        var out = new Uint8Array(length);
        for (var i = 0; i < length; i++) {
          if (bufpos === buffer.length) {
            fillBuffer(buffer, hmac_, info, counter);
            bufpos = 0;
          }
          out[i] = buffer[bufpos++];
        }
        hmac_.clean();
        buffer.fill(0);
        counter.fill(0);
        return out;
      }
      exports2.hkdf = hkdf;
      function pbkdf2(password, salt, iterations, dkLen) {
        var prf = new HMAC(password);
        var len = prf.digestLength;
        var ctr = new Uint8Array(4);
        var t = new Uint8Array(len);
        var u = new Uint8Array(len);
        var dk = new Uint8Array(dkLen);
        for (var i = 0; i * len < dkLen; i++) {
          var c = i + 1;
          ctr[0] = c >>> 24 & 255;
          ctr[1] = c >>> 16 & 255;
          ctr[2] = c >>> 8 & 255;
          ctr[3] = c >>> 0 & 255;
          prf.reset();
          prf.update(salt);
          prf.update(ctr);
          prf.finish(u);
          for (var j = 0; j < len; j++) {
            t[j] = u[j];
          }
          for (var j = 2; j <= iterations; j++) {
            prf.reset();
            prf.update(u).finish(u);
            for (var k = 0; k < len; k++) {
              t[k] ^= u[k];
            }
          }
          for (var j = 0; j < len && i * len + j < dkLen; j++) {
            dk[i * len + j] = t[j];
          }
        }
        for (var i = 0; i < len; i++) {
          t[i] = u[i] = 0;
        }
        for (var i = 0; i < 4; i++) {
          ctr[i] = 0;
        }
        prf.clean();
        return dk;
      }
      exports2.pbkdf2 = pbkdf2;
    });
  }
});

// node_modules/standardwebhooks/dist/timing_safe_equal.js
var require_timing_safe_equal = __commonJS({
  "node_modules/standardwebhooks/dist/timing_safe_equal.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.timingSafeEqual = timingSafeEqual;
    function assert(expr, msg = "") {
      if (!expr) {
        throw new Error(msg);
      }
    }
    function timingSafeEqual(a, b) {
      if (a.byteLength !== b.byteLength) {
        return false;
      }
      if (!(a instanceof DataView)) {
        a = new DataView(ArrayBuffer.isView(a) ? a.buffer : a);
      }
      if (!(b instanceof DataView)) {
        b = new DataView(ArrayBuffer.isView(b) ? b.buffer : b);
      }
      assert(a instanceof DataView);
      assert(b instanceof DataView);
      const length = a.byteLength;
      let out = 0;
      let i = -1;
      while (++i < length) {
        out |= a.getUint8(i) ^ b.getUint8(i);
      }
      return out === 0;
    }
  }
});

// node_modules/standardwebhooks/dist/index.js
var require_dist = __commonJS({
  "node_modules/standardwebhooks/dist/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Webhook = exports.WebhookVerificationError = void 0;
    var base64 = require_base64();
    var sha256 = require_sha256();
    var timing_safe_equal_1 = require_timing_safe_equal();
    var WEBHOOK_TOLERANCE_IN_SECONDS = 5 * 60;
    var ExtendableError = class _ExtendableError extends Error {
      constructor(message) {
        super(message);
        Object.setPrototypeOf(this, _ExtendableError.prototype);
        this.name = "ExtendableError";
        this.stack = new Error(message).stack;
      }
    };
    var WebhookVerificationError = class _WebhookVerificationError extends ExtendableError {
      constructor(message) {
        super(message);
        Object.setPrototypeOf(this, _WebhookVerificationError.prototype);
        this.name = "WebhookVerificationError";
      }
    };
    exports.WebhookVerificationError = WebhookVerificationError;
    var Webhook2 = class _Webhook {
      constructor(secret, options) {
        if ((options === null || options === void 0 ? void 0 : options.format) === "raw") {
          if (secret instanceof Uint8Array) {
            this.key = secret;
          } else {
            this.key = Uint8Array.from(secret, (c) => c.charCodeAt(0));
          }
        } else {
          if (typeof secret !== "string") {
            throw new Error("Expected secret to be of type string");
          }
          if (secret.startsWith(_Webhook.prefix)) {
            secret = secret.substring(_Webhook.prefix.length);
          }
          this.key = base64.decode(secret);
        }
        if (this.key.length === 0) {
          throw new Error("Secret can't be empty.");
        }
      }
      verify(payload, headers, options) {
        var _a2;
        const jsonParse = (_a2 = options === null || options === void 0 ? void 0 : options.jsonParse) !== null && _a2 !== void 0 ? _a2 : true;
        const normalizedHeaders = {};
        for (const key of Object.keys(headers)) {
          normalizedHeaders[key.toLowerCase()] = headers[key];
        }
        const msgId = normalizedHeaders["webhook-id"];
        const msgSignature = normalizedHeaders["webhook-signature"];
        const msgTimestamp = normalizedHeaders["webhook-timestamp"];
        if (!msgSignature || !msgId || !msgTimestamp) {
          throw new WebhookVerificationError("Missing required headers");
        }
        const timestamp = this.verifyTimestamp(msgTimestamp);
        const computedSignature = this.sign(msgId, timestamp, payload);
        const expectedSignature = computedSignature.split(",")[1];
        const passedSignatures = msgSignature.split(" ");
        const encoder2 = new globalThis.TextEncoder();
        for (const versionedSignature of passedSignatures) {
          const [version, signature] = versionedSignature.split(",");
          if (version !== "v1") {
            continue;
          }
          if ((0, timing_safe_equal_1.timingSafeEqual)(encoder2.encode(signature), encoder2.encode(expectedSignature))) {
            const payloadString = payload.toString();
            if (payloadString === "") {
              return void 0;
            }
            if (jsonParse) {
              return JSON.parse(payloadString);
            } else {
              return void 0;
            }
          }
        }
        throw new WebhookVerificationError("No matching signature found");
      }
      sign(msgId, timestamp, payload) {
        if (typeof payload === "string") {
        } else if (payload.constructor.name === "Buffer") {
          payload = payload.toString();
        } else {
          throw new Error("Expected payload to be of type string or Buffer.");
        }
        const encoder2 = new TextEncoder();
        const timestampNumber = Math.floor(timestamp.getTime() / 1e3);
        const toSign = encoder2.encode(`${msgId}.${timestampNumber}.${payload}`);
        const expectedSignature = base64.encode(sha256.hmac(this.key, toSign));
        return `v1,${expectedSignature}`;
      }
      verifyTimestamp(timestampHeader) {
        const now = Math.floor(Date.now() / 1e3);
        const timestamp = parseInt(timestampHeader, 10);
        if (Number.isNaN(timestamp)) {
          throw new WebhookVerificationError("Invalid Signature Headers");
        }
        if (now - timestamp > WEBHOOK_TOLERANCE_IN_SECONDS) {
          throw new WebhookVerificationError("Message timestamp too old");
        }
        if (timestamp > now + WEBHOOK_TOLERANCE_IN_SECONDS) {
          throw new WebhookVerificationError("Message timestamp too new");
        }
        return new Date(timestamp * 1e3);
      }
    };
    exports.Webhook = Webhook2;
    Webhook2.prefix = "whsec_";
  }
});

// node_modules/@anthropic-ai/sdk/tools/agent-toolset/node.browser.mjs
var node_browser_exports = {};
__export(node_browser_exports, {
  BashSession: () => BashSession,
  betaAgentToolset20260401: () => betaAgentToolset20260401,
  betaBashTool: () => betaBashTool,
  betaEditTool: () => betaEditTool,
  betaGlobTool: () => betaGlobTool,
  betaGrepTool: () => betaGrepTool,
  betaReadTool: () => betaReadTool,
  betaWriteTool: () => betaWriteTool,
  extractSkillArchive: () => extractSkillArchive,
  resolvePath: () => resolvePath,
  resolveSkillVersion: () => resolveSkillVersion,
  setupSkills: () => setupSkills
});
function nodeOnly(name) {
  throw new AnthropicError(`${name} requires Node.js or a Node-compatible runtime`);
}
function setupSkills(_ctx) {
  return nodeOnly("setupSkills");
}
function resolveSkillVersion(_client, _skillId, _version) {
  return nodeOnly("resolveSkillVersion");
}
function extractSkillArchive(_resp, _dest) {
  return nodeOnly("extractSkillArchive");
}
function betaAgentToolset20260401(_ctx) {
  return nodeOnly("betaAgentToolset20260401");
}
function resolvePath(_ctx, _p) {
  return nodeOnly("resolvePath");
}
function betaBashTool(_ctx) {
  return nodeOnly("betaBashTool");
}
function betaReadTool(_ctx) {
  return nodeOnly("betaReadTool");
}
function betaWriteTool(_ctx) {
  return nodeOnly("betaWriteTool");
}
function betaEditTool(_ctx) {
  return nodeOnly("betaEditTool");
}
function betaGlobTool(_ctx) {
  return nodeOnly("betaGlobTool");
}
function betaGrepTool(_ctx) {
  return nodeOnly("betaGrepTool");
}
var BashSession;
var init_node_browser = __esm({
  "node_modules/@anthropic-ai/sdk/tools/agent-toolset/node.browser.mjs"() {
    init_error();
    BashSession = class {
      constructor(_dir, _env) {
        nodeOnly("BashSession");
      }
      get closed() {
        return nodeOnly("BashSession");
      }
      exec(_command, _opts = {}) {
        return nodeOnly("BashSession");
      }
      close() {
        nodeOnly("BashSession");
      }
    };
  }
});

// src/main.ts
var main_exports = {};
__export(main_exports, {
  default: () => PowerEditorPlugin
});
module.exports = __toCommonJS(main_exports);

// src/settings.ts
function mergeForSave(ours, baseline, disk) {
  const out = { ...ours };
  if (!disk) return out;
  for (const k of Object.keys(ours)) {
    if (!(k in disk)) continue;
    const o = ours[k];
    const b = baseline[k];
    const d = disk[k];
    if (isRecord(o) && isRecord(b) && isRecord(d)) {
      out[k] = mergeEntries(o, b, d);
      continue;
    }
    const changedByUs = JSON.stringify(o) !== JSON.stringify(b);
    if (!changedByUs) out[k] = d;
  }
  return out;
}
function isRecord(v) {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}
function mergeEntries(ours, baseline, disk) {
  const out = {};
  for (const k of Object.keys(disk)) {
    const removedByUs = k in baseline && !(k in ours);
    if (!removedByUs) out[k] = disk[k];
  }
  for (const k of Object.keys(ours)) {
    const changedByUs = JSON.stringify(ours[k]) !== JSON.stringify(baseline[k]);
    if (changedByUs || !(k in disk)) out[k] = ours[k];
  }
  return out;
}
function moveItem(list, from, insertBefore) {
  if (from < 0 || from >= list.length) return list.slice();
  const out = list.slice();
  const [item] = out.splice(from, 1);
  const at = Math.max(0, Math.min(out.length, from < insertBefore ? insertBefore - 1 : insertBefore));
  out.splice(at, 0, item);
  return out;
}

// node_modules/@anthropic-ai/sdk/internal/tslib.mjs
function __classPrivateFieldSet(receiver, state, value, kind, f) {
  if (kind === "m")
    throw new TypeError("Private method is not writable");
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
}
function __classPrivateFieldGet(receiver, state, kind, f) {
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
}

// node_modules/@anthropic-ai/sdk/internal/utils/uuid.mjs
var uuid4 = function() {
  const { crypto } = globalThis;
  if (crypto?.randomUUID) {
    uuid4 = crypto.randomUUID.bind(crypto);
    return crypto.randomUUID();
  }
  const u8 = new Uint8Array(1);
  const randomByte = crypto ? () => crypto.getRandomValues(u8)[0] : () => Math.random() * 255 & 255;
  return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, (c) => (+c ^ randomByte() & 15 >> +c / 4).toString(16));
};

// node_modules/@anthropic-ai/sdk/internal/utils/values.mjs
init_error();
var startsWithSchemeRegexp = /^[a-z][a-z0-9+.-]*:/i;
var isAbsoluteURL = (url) => {
  return startsWithSchemeRegexp.test(url);
};
var isArray = (val) => (isArray = Array.isArray, isArray(val));
var isReadonlyArray = isArray;
function maybeObj(x) {
  if (typeof x !== "object") {
    return {};
  }
  return x ?? {};
}
function isEmptyObj(obj) {
  if (!obj)
    return true;
  for (const _k in obj)
    return false;
  return true;
}
function hasOwn(obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key);
}
var validatePositiveInteger = (name, n) => {
  if (typeof n !== "number" || !Number.isInteger(n)) {
    throw new AnthropicError(`${name} must be an integer`);
  }
  if (n < 0) {
    throw new AnthropicError(`${name} must be a positive integer`);
  }
  return n;
};
var safeJSON = (text) => {
  try {
    return JSON.parse(text);
  } catch (err) {
    return void 0;
  }
};

// node_modules/@anthropic-ai/sdk/internal/utils/sleep.mjs
var sleep = (ms, signal) => new Promise((resolve) => {
  if (signal?.aborted)
    return resolve();
  const onAbort = () => {
    clearTimeout(timer);
    resolve();
  };
  const timer = setTimeout(() => {
    signal?.removeEventListener("abort", onAbort);
    resolve();
  }, ms);
  signal?.addEventListener("abort", onAbort, { once: true });
});

// node_modules/@anthropic-ai/sdk/client.mjs
init_errors();

// node_modules/@anthropic-ai/sdk/version.mjs
var VERSION = "0.110.0";

// node_modules/@anthropic-ai/sdk/internal/detect-platform.mjs
var isRunningInBrowser = () => {
  return (
    // @ts-ignore
    typeof window !== "undefined" && // @ts-ignore
    typeof window.document !== "undefined" && // @ts-ignore
    typeof navigator !== "undefined"
  );
};
function getDetectedPlatform() {
  if (typeof Deno !== "undefined" && Deno.build != null) {
    return "deno";
  }
  if (typeof EdgeRuntime !== "undefined") {
    return "edge";
  }
  if (Object.prototype.toString.call(typeof globalThis.process !== "undefined" ? globalThis.process : 0) === "[object process]") {
    return "node";
  }
  return "unknown";
}
var getPlatformProperties = () => {
  const detectedPlatform = getDetectedPlatform();
  if (detectedPlatform === "deno") {
    return {
      "X-Stainless-Lang": "js",
      "X-Stainless-Package-Version": VERSION,
      "X-Stainless-OS": normalizePlatform(Deno.build.os),
      "X-Stainless-Arch": normalizeArch(Deno.build.arch),
      "X-Stainless-Runtime": "deno",
      "X-Stainless-Runtime-Version": typeof Deno.version === "string" ? Deno.version : Deno.version?.deno ?? "unknown"
    };
  }
  if (typeof EdgeRuntime !== "undefined") {
    return {
      "X-Stainless-Lang": "js",
      "X-Stainless-Package-Version": VERSION,
      "X-Stainless-OS": "Unknown",
      "X-Stainless-Arch": `other:${EdgeRuntime}`,
      "X-Stainless-Runtime": "edge",
      "X-Stainless-Runtime-Version": globalThis.process.version
    };
  }
  if (detectedPlatform === "node") {
    return {
      "X-Stainless-Lang": "js",
      "X-Stainless-Package-Version": VERSION,
      "X-Stainless-OS": normalizePlatform(globalThis.process.platform ?? "unknown"),
      "X-Stainless-Arch": normalizeArch(globalThis.process.arch ?? "unknown"),
      "X-Stainless-Runtime": "node",
      "X-Stainless-Runtime-Version": globalThis.process.version ?? "unknown"
    };
  }
  const browserInfo = getBrowserInfo();
  if (browserInfo) {
    return {
      "X-Stainless-Lang": "js",
      "X-Stainless-Package-Version": VERSION,
      "X-Stainless-OS": "Unknown",
      "X-Stainless-Arch": "unknown",
      "X-Stainless-Runtime": `browser:${browserInfo.browser}`,
      "X-Stainless-Runtime-Version": browserInfo.version
    };
  }
  return {
    "X-Stainless-Lang": "js",
    "X-Stainless-Package-Version": VERSION,
    "X-Stainless-OS": "Unknown",
    "X-Stainless-Arch": "unknown",
    "X-Stainless-Runtime": "unknown",
    "X-Stainless-Runtime-Version": "unknown"
  };
};
function getBrowserInfo() {
  if (typeof navigator === "undefined" || !navigator) {
    return null;
  }
  const browserPatterns = [
    { key: "edge", pattern: /Edge(?:\W+(\d+)\.(\d+)(?:\.(\d+))?)?/ },
    { key: "ie", pattern: /MSIE(?:\W+(\d+)\.(\d+)(?:\.(\d+))?)?/ },
    { key: "ie", pattern: /Trident(?:.*rv\:(\d+)\.(\d+)(?:\.(\d+))?)?/ },
    { key: "chrome", pattern: /Chrome(?:\W+(\d+)\.(\d+)(?:\.(\d+))?)?/ },
    { key: "firefox", pattern: /Firefox(?:\W+(\d+)\.(\d+)(?:\.(\d+))?)?/ },
    { key: "safari", pattern: /(?:Version\W+(\d+)\.(\d+)(?:\.(\d+))?)?(?:\W+Mobile\S*)?\W+Safari/ }
  ];
  for (const { key, pattern } of browserPatterns) {
    const match = pattern.exec(navigator.userAgent);
    if (match) {
      const major = match[1] || 0;
      const minor = match[2] || 0;
      const patch = match[3] || 0;
      return { browser: key, version: `${major}.${minor}.${patch}` };
    }
  }
  return null;
}
var normalizeArch = (arch) => {
  if (arch === "x32")
    return "x32";
  if (arch === "x86_64" || arch === "x64")
    return "x64";
  if (arch === "arm")
    return "arm";
  if (arch === "aarch64" || arch === "arm64")
    return "arm64";
  if (arch)
    return `other:${arch}`;
  return "unknown";
};
var normalizePlatform = (platform) => {
  platform = platform.toLowerCase();
  if (platform.includes("ios"))
    return "iOS";
  if (platform === "android")
    return "Android";
  if (platform === "darwin")
    return "MacOS";
  if (platform === "win32")
    return "Windows";
  if (platform === "freebsd")
    return "FreeBSD";
  if (platform === "openbsd")
    return "OpenBSD";
  if (platform === "linux")
    return "Linux";
  if (platform)
    return `Other:${platform}`;
  return "Unknown";
};
var _platformHeaders;
var getPlatformHeaders = () => {
  return _platformHeaders ?? (_platformHeaders = getPlatformProperties());
};

// node_modules/@anthropic-ai/sdk/internal/shims.mjs
function getDefaultFetch() {
  if (typeof fetch !== "undefined") {
    return fetch;
  }
  throw new Error("`fetch` is not defined as a global; Either pass `fetch` to the client, `new Anthropic({ fetch })` or polyfill the global, `globalThis.fetch = fetch`");
}
function makeReadableStream(...args) {
  const ReadableStream2 = globalThis.ReadableStream;
  if (typeof ReadableStream2 === "undefined") {
    throw new Error("`ReadableStream` is not defined as a global; You will need to polyfill it, `globalThis.ReadableStream = ReadableStream`");
  }
  return new ReadableStream2(...args);
}
function ReadableStreamFrom(iterable) {
  let iter = Symbol.asyncIterator in iterable ? iterable[Symbol.asyncIterator]() : iterable[Symbol.iterator]();
  return makeReadableStream({
    start() {
    },
    async pull(controller) {
      const { done, value } = await iter.next();
      if (done) {
        controller.close();
      } else {
        controller.enqueue(value);
      }
    },
    async cancel() {
      await iter.return?.();
    }
  });
}
function ReadableStreamToAsyncIterable(stream) {
  if (stream[Symbol.asyncIterator])
    return stream;
  const reader = stream.getReader();
  return {
    async next() {
      try {
        const result = await reader.read();
        if (result?.done)
          reader.releaseLock();
        return result;
      } catch (e) {
        reader.releaseLock();
        throw e;
      }
    },
    async return() {
      const cancelPromise = reader.cancel();
      reader.releaseLock();
      await cancelPromise;
      return { done: true, value: void 0 };
    },
    [Symbol.asyncIterator]() {
      return this;
    }
  };
}
async function CancelReadableStream(stream) {
  if (stream === null || typeof stream !== "object")
    return;
  if (stream[Symbol.asyncIterator]) {
    await stream[Symbol.asyncIterator]().return?.();
    return;
  }
  const reader = stream.getReader();
  const cancelPromise = reader.cancel();
  reader.releaseLock();
  await cancelPromise;
}

// node_modules/@anthropic-ai/sdk/internal/request-options.mjs
var FallbackEncoder = ({ headers, body }) => {
  return {
    bodyHeaders: {
      "content-type": "application/json"
    },
    body: JSON.stringify(body)
  };
};

// node_modules/@anthropic-ai/sdk/internal/qs/formats.mjs
var default_format = "RFC3986";
var default_formatter = (v) => String(v);
var formatters = {
  RFC1738: (v) => String(v).replace(/%20/g, "+"),
  RFC3986: default_formatter
};
var RFC1738 = "RFC1738";

// node_modules/@anthropic-ai/sdk/internal/qs/utils.mjs
var has = (obj, key) => (has = Object.hasOwn ?? Function.prototype.call.bind(Object.prototype.hasOwnProperty), has(obj, key));
var hex_table = /* @__PURE__ */ (() => {
  const array = [];
  for (let i = 0; i < 256; ++i) {
    array.push("%" + ((i < 16 ? "0" : "") + i.toString(16)).toUpperCase());
  }
  return array;
})();
var limit = 1024;
var encode = (str, _defaultEncoder, charset, _kind, format) => {
  if (str.length === 0) {
    return str;
  }
  let string = str;
  if (typeof str === "symbol") {
    string = Symbol.prototype.toString.call(str);
  } else if (typeof str !== "string") {
    string = String(str);
  }
  if (charset === "iso-8859-1") {
    return escape(string).replace(/%u[0-9a-f]{4}/gi, function($0) {
      return "%26%23" + parseInt($0.slice(2), 16) + "%3B";
    });
  }
  let out = "";
  for (let j = 0; j < string.length; j += limit) {
    const segment = string.length >= limit ? string.slice(j, j + limit) : string;
    const arr = [];
    for (let i = 0; i < segment.length; ++i) {
      let c = segment.charCodeAt(i);
      if (c === 45 || // -
      c === 46 || // .
      c === 95 || // _
      c === 126 || // ~
      c >= 48 && c <= 57 || // 0-9
      c >= 65 && c <= 90 || // a-z
      c >= 97 && c <= 122 || // A-Z
      format === RFC1738 && (c === 40 || c === 41)) {
        arr[arr.length] = segment.charAt(i);
        continue;
      }
      if (c < 128) {
        arr[arr.length] = hex_table[c];
        continue;
      }
      if (c < 2048) {
        arr[arr.length] = hex_table[192 | c >> 6] + hex_table[128 | c & 63];
        continue;
      }
      if (c < 55296 || c >= 57344) {
        arr[arr.length] = hex_table[224 | c >> 12] + hex_table[128 | c >> 6 & 63] + hex_table[128 | c & 63];
        continue;
      }
      i += 1;
      c = 65536 + ((c & 1023) << 10 | segment.charCodeAt(i) & 1023);
      arr[arr.length] = hex_table[240 | c >> 18] + hex_table[128 | c >> 12 & 63] + hex_table[128 | c >> 6 & 63] + hex_table[128 | c & 63];
    }
    out += arr.join("");
  }
  return out;
};
function is_buffer(obj) {
  if (!obj || typeof obj !== "object") {
    return false;
  }
  return !!(obj.constructor && obj.constructor.isBuffer && obj.constructor.isBuffer(obj));
}
function maybe_map(val, fn) {
  if (isArray(val)) {
    const mapped = [];
    for (let i = 0; i < val.length; i += 1) {
      mapped.push(fn(val[i]));
    }
    return mapped;
  }
  return fn(val);
}

// node_modules/@anthropic-ai/sdk/internal/qs/stringify.mjs
var array_prefix_generators = {
  brackets(prefix) {
    return String(prefix) + "[]";
  },
  comma: "comma",
  indices(prefix, key) {
    return String(prefix) + "[" + key + "]";
  },
  repeat(prefix) {
    return String(prefix);
  }
};
var push_to_array = function(arr, value_or_array) {
  Array.prototype.push.apply(arr, isArray(value_or_array) ? value_or_array : [value_or_array]);
};
var toISOString;
var defaults = {
  addQueryPrefix: false,
  allowDots: false,
  allowEmptyArrays: false,
  arrayFormat: "indices",
  charset: "utf-8",
  charsetSentinel: false,
  delimiter: "&",
  encode: true,
  encodeDotInKeys: false,
  encoder: encode,
  encodeValuesOnly: false,
  format: default_format,
  formatter: default_formatter,
  /** @deprecated */
  indices: false,
  serializeDate(date) {
    return (toISOString ?? (toISOString = Function.prototype.call.bind(Date.prototype.toISOString)))(date);
  },
  skipNulls: false,
  strictNullHandling: false
};
function is_non_nullish_primitive(v) {
  return typeof v === "string" || typeof v === "number" || typeof v === "boolean" || typeof v === "symbol" || typeof v === "bigint";
}
var sentinel = {};
function inner_stringify(object, prefix, generateArrayPrefix, commaRoundTrip, allowEmptyArrays, strictNullHandling, skipNulls, encodeDotInKeys, encoder2, filter, sort, allowDots, serializeDate, format, formatter, encodeValuesOnly, charset, sideChannel) {
  let obj = object;
  let tmp_sc = sideChannel;
  let step = 0;
  let find_flag = false;
  while ((tmp_sc = tmp_sc.get(sentinel)) !== void 0 && !find_flag) {
    const pos = tmp_sc.get(object);
    step += 1;
    if (typeof pos !== "undefined") {
      if (pos === step) {
        throw new RangeError("Cyclic object value");
      } else {
        find_flag = true;
      }
    }
    if (typeof tmp_sc.get(sentinel) === "undefined") {
      step = 0;
    }
  }
  if (typeof filter === "function") {
    obj = filter(prefix, obj);
  } else if (obj instanceof Date) {
    obj = serializeDate?.(obj);
  } else if (generateArrayPrefix === "comma" && isArray(obj)) {
    obj = maybe_map(obj, function(value) {
      if (value instanceof Date) {
        return serializeDate?.(value);
      }
      return value;
    });
  }
  if (obj === null) {
    if (strictNullHandling) {
      return encoder2 && !encodeValuesOnly ? (
        // @ts-expect-error
        encoder2(prefix, defaults.encoder, charset, "key", format)
      ) : prefix;
    }
    obj = "";
  }
  if (is_non_nullish_primitive(obj) || is_buffer(obj)) {
    if (encoder2) {
      const key_value = encodeValuesOnly ? prefix : encoder2(prefix, defaults.encoder, charset, "key", format);
      return [
        formatter?.(key_value) + "=" + // @ts-expect-error
        formatter?.(encoder2(obj, defaults.encoder, charset, "value", format))
      ];
    }
    return [formatter?.(prefix) + "=" + formatter?.(String(obj))];
  }
  const values = [];
  if (typeof obj === "undefined") {
    return values;
  }
  let obj_keys;
  if (generateArrayPrefix === "comma" && isArray(obj)) {
    if (encodeValuesOnly && encoder2) {
      obj = maybe_map(obj, encoder2);
    }
    obj_keys = [{ value: obj.length > 0 ? obj.join(",") || null : void 0 }];
  } else if (isArray(filter)) {
    obj_keys = filter;
  } else {
    const keys = Object.keys(obj);
    obj_keys = sort ? keys.sort(sort) : keys;
  }
  const encoded_prefix = encodeDotInKeys ? String(prefix).replace(/\./g, "%2E") : String(prefix);
  const adjusted_prefix = commaRoundTrip && isArray(obj) && obj.length === 1 ? encoded_prefix + "[]" : encoded_prefix;
  if (allowEmptyArrays && isArray(obj) && obj.length === 0) {
    return adjusted_prefix + "[]";
  }
  for (let j = 0; j < obj_keys.length; ++j) {
    const key = obj_keys[j];
    const value = (
      // @ts-ignore
      typeof key === "object" && typeof key.value !== "undefined" ? key.value : obj[key]
    );
    if (skipNulls && value === null) {
      continue;
    }
    const encoded_key = allowDots && encodeDotInKeys ? key.replace(/\./g, "%2E") : key;
    const key_prefix = isArray(obj) ? typeof generateArrayPrefix === "function" ? generateArrayPrefix(adjusted_prefix, encoded_key) : adjusted_prefix : adjusted_prefix + (allowDots ? "." + encoded_key : "[" + encoded_key + "]");
    sideChannel.set(object, step);
    const valueSideChannel = /* @__PURE__ */ new WeakMap();
    valueSideChannel.set(sentinel, sideChannel);
    push_to_array(values, inner_stringify(
      value,
      key_prefix,
      generateArrayPrefix,
      commaRoundTrip,
      allowEmptyArrays,
      strictNullHandling,
      skipNulls,
      encodeDotInKeys,
      // @ts-ignore
      generateArrayPrefix === "comma" && encodeValuesOnly && isArray(obj) ? null : encoder2,
      filter,
      sort,
      allowDots,
      serializeDate,
      format,
      formatter,
      encodeValuesOnly,
      charset,
      valueSideChannel
    ));
  }
  return values;
}
function normalize_stringify_options(opts = defaults) {
  if (typeof opts.allowEmptyArrays !== "undefined" && typeof opts.allowEmptyArrays !== "boolean") {
    throw new TypeError("`allowEmptyArrays` option can only be `true` or `false`, when provided");
  }
  if (typeof opts.encodeDotInKeys !== "undefined" && typeof opts.encodeDotInKeys !== "boolean") {
    throw new TypeError("`encodeDotInKeys` option can only be `true` or `false`, when provided");
  }
  if (opts.encoder !== null && typeof opts.encoder !== "undefined" && typeof opts.encoder !== "function") {
    throw new TypeError("Encoder has to be a function.");
  }
  const charset = opts.charset || defaults.charset;
  if (typeof opts.charset !== "undefined" && opts.charset !== "utf-8" && opts.charset !== "iso-8859-1") {
    throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
  }
  let format = default_format;
  if (typeof opts.format !== "undefined") {
    if (!has(formatters, opts.format)) {
      throw new TypeError("Unknown format option provided.");
    }
    format = opts.format;
  }
  const formatter = formatters[format];
  let filter = defaults.filter;
  if (typeof opts.filter === "function" || isArray(opts.filter)) {
    filter = opts.filter;
  }
  let arrayFormat;
  if (opts.arrayFormat && opts.arrayFormat in array_prefix_generators) {
    arrayFormat = opts.arrayFormat;
  } else if ("indices" in opts) {
    arrayFormat = opts.indices ? "indices" : "repeat";
  } else {
    arrayFormat = defaults.arrayFormat;
  }
  if ("commaRoundTrip" in opts && typeof opts.commaRoundTrip !== "boolean") {
    throw new TypeError("`commaRoundTrip` must be a boolean, or absent");
  }
  const allowDots = typeof opts.allowDots === "undefined" ? !!opts.encodeDotInKeys === true ? true : defaults.allowDots : !!opts.allowDots;
  return {
    addQueryPrefix: typeof opts.addQueryPrefix === "boolean" ? opts.addQueryPrefix : defaults.addQueryPrefix,
    // @ts-ignore
    allowDots,
    allowEmptyArrays: typeof opts.allowEmptyArrays === "boolean" ? !!opts.allowEmptyArrays : defaults.allowEmptyArrays,
    arrayFormat,
    charset,
    charsetSentinel: typeof opts.charsetSentinel === "boolean" ? opts.charsetSentinel : defaults.charsetSentinel,
    commaRoundTrip: !!opts.commaRoundTrip,
    delimiter: typeof opts.delimiter === "undefined" ? defaults.delimiter : opts.delimiter,
    encode: typeof opts.encode === "boolean" ? opts.encode : defaults.encode,
    encodeDotInKeys: typeof opts.encodeDotInKeys === "boolean" ? opts.encodeDotInKeys : defaults.encodeDotInKeys,
    encoder: typeof opts.encoder === "function" ? opts.encoder : defaults.encoder,
    encodeValuesOnly: typeof opts.encodeValuesOnly === "boolean" ? opts.encodeValuesOnly : defaults.encodeValuesOnly,
    filter,
    format,
    formatter,
    serializeDate: typeof opts.serializeDate === "function" ? opts.serializeDate : defaults.serializeDate,
    skipNulls: typeof opts.skipNulls === "boolean" ? opts.skipNulls : defaults.skipNulls,
    // @ts-ignore
    sort: typeof opts.sort === "function" ? opts.sort : null,
    strictNullHandling: typeof opts.strictNullHandling === "boolean" ? opts.strictNullHandling : defaults.strictNullHandling
  };
}
function stringify(object, opts = {}) {
  let obj = object;
  const options = normalize_stringify_options(opts);
  let obj_keys;
  let filter;
  if (typeof options.filter === "function") {
    filter = options.filter;
    obj = filter("", obj);
  } else if (isArray(options.filter)) {
    filter = options.filter;
    obj_keys = filter;
  }
  const keys = [];
  if (typeof obj !== "object" || obj === null) {
    return "";
  }
  const generateArrayPrefix = array_prefix_generators[options.arrayFormat];
  const commaRoundTrip = generateArrayPrefix === "comma" && options.commaRoundTrip;
  if (!obj_keys) {
    obj_keys = Object.keys(obj);
  }
  if (options.sort) {
    obj_keys.sort(options.sort);
  }
  const sideChannel = /* @__PURE__ */ new WeakMap();
  for (let i = 0; i < obj_keys.length; ++i) {
    const key = obj_keys[i];
    if (options.skipNulls && obj[key] === null) {
      continue;
    }
    push_to_array(keys, inner_stringify(
      obj[key],
      key,
      // @ts-expect-error
      generateArrayPrefix,
      commaRoundTrip,
      options.allowEmptyArrays,
      options.strictNullHandling,
      options.skipNulls,
      options.encodeDotInKeys,
      options.encode ? options.encoder : null,
      options.filter,
      options.sort,
      options.allowDots,
      options.serializeDate,
      options.format,
      options.formatter,
      options.encodeValuesOnly,
      options.charset,
      sideChannel
    ));
  }
  const joined = keys.join(options.delimiter);
  let prefix = options.addQueryPrefix === true ? "?" : "";
  if (options.charsetSentinel) {
    if (options.charset === "iso-8859-1") {
      prefix += "utf8=%26%2310003%3B&";
    } else {
      prefix += "utf8=%E2%9C%93&";
    }
  }
  return joined.length > 0 ? prefix + joined : "";
}

// node_modules/@anthropic-ai/sdk/internal/utils/query.mjs
function stringifyQuery(query) {
  return stringify(query, { arrayFormat: "brackets" });
}

// node_modules/@anthropic-ai/sdk/client.mjs
init_error();

// node_modules/@anthropic-ai/sdk/lib/credentials/types.mjs
init_error();
var GRANT_TYPE_JWT_BEARER = "urn:ietf:params:oauth:grant-type:jwt-bearer";
var GRANT_TYPE_REFRESH_TOKEN = "refresh_token";
var TOKEN_ENDPOINT = "/v1/oauth/token";
var OAUTH_API_BETA_HEADER = "oauth-2025-04-20";
var FEDERATION_BETA_HEADER = "oidc-federation-2026-04-01";
var ADVISORY_REFRESH_THRESHOLD_IN_SECONDS = 120;
var MANDATORY_REFRESH_THRESHOLD_IN_SECONDS = 30;
var ADVISORY_REFRESH_BACKOFF_IN_SECONDS = 5;
var MAX_TOKEN_RESPONSE_BYTES = 1 << 20;
function requireSecureTokenEndpoint(baseURL) {
  if (!baseURL)
    return;
  let u;
  try {
    u = new URL(baseURL);
  } catch (err) {
    throw new WorkloadIdentityError(`Invalid token endpoint base URL "${baseURL}": ${err}`);
  }
  if (u.protocol === "https:")
    return;
  const host = u.hostname.toLowerCase().replace(/^\[|\]$/g, "");
  if (u.protocol === "http:" && (host === "localhost" || host === "127.0.0.1" || host === "::1")) {
    return;
  }
  throw new WorkloadIdentityError(`Refusing to send credential over non-https token endpoint "${baseURL}"`);
}
async function parseTokenResponse(resp, requestId) {
  const text = await readLimitedText(resp);
  let data;
  try {
    data = JSON.parse(text);
  } catch {
    throw new WorkloadIdentityError(`Token endpoint returned non-JSON response (status ${resp.status})`, resp.status, redactSensitive(text), requestId);
  }
  if (!data.access_token) {
    throw new WorkloadIdentityError(`Token endpoint response missing access_token: ${JSON.stringify(redactSensitive(data))}`, resp.status, redactSensitive(data), requestId);
  }
  if (data.token_type && data.token_type.toLowerCase() !== "bearer") {
    throw new WorkloadIdentityError(`Token endpoint response: unsupported token_type "${data.token_type}" (want Bearer)`, resp.status, redactSensitive(data), requestId);
  }
  return data;
}
var MAX_ERROR_BODY_CHARS = 2e3;
var SAFE_ERROR_KEYS = /* @__PURE__ */ new Set(["error", "error_description", "error_uri"]);
function redactSensitive(body) {
  if (body == null)
    return body;
  if (typeof body === "string") {
    let parsed;
    try {
      parsed = JSON.parse(body);
    } catch {
      if (body.length <= MAX_ERROR_BODY_CHARS)
        return body;
      return body.slice(0, MAX_ERROR_BODY_CHARS) + `... <${body.length - MAX_ERROR_BODY_CHARS} more chars>`;
    }
    return JSON.stringify(redactSensitive(parsed));
  }
  if (typeof body === "object" && !Array.isArray(body)) {
    const out = {};
    for (const [k, v] of Object.entries(body)) {
      if (SAFE_ERROR_KEYS.has(k))
        out[k] = v;
    }
    return out;
  }
  return null;
}
async function checkCredentialsFileSafety(path2, onWarn = (m) => console.warn(`anthropic-sdk: ${m}`)) {
  if (typeof process === "undefined" || process.platform === "win32")
    return;
  const fs = await import("node:fs");
  let resolved = path2;
  let st;
  try {
    resolved = await fs.promises.realpath(path2);
    st = await fs.promises.stat(resolved);
  } catch {
    return;
  }
  const mode = st.mode & 511;
  if (mode & 18) {
    throw new WorkloadIdentityError(`Credentials file at ${resolved} is group/world-writable (mode 0o${mode.toString(8)}); this allows other local users to plant tokens. Run \`chmod 600 ${resolved}\`.`);
  }
  if (mode & 36) {
    throw new WorkloadIdentityError(`Credentials file at ${resolved} is group/world-readable (mode 0o${mode.toString(8)}); run \`chmod 600 ${resolved}\` before retrying.`);
  }
  if (typeof process.getuid === "function" && st.uid !== process.getuid()) {
    onWarn(`credentials file at ${resolved} is owned by uid ${st.uid} (current process uid ${process.getuid()}); verify this is intentional.`);
  }
}
async function writeCredentialsFileAtomic(targetPath, data) {
  const fs = await import("node:fs");
  const path2 = await import("node:path");
  const dir = path2.dirname(targetPath);
  await fs.promises.mkdir(dir, { recursive: true, mode: 448 });
  const tmpPath = `${targetPath}.${process.pid}.${Math.random().toString(36).slice(2)}.tmp`;
  try {
    const fh = await fs.promises.open(tmpPath, "w", 384);
    try {
      await fh.writeFile(JSON.stringify(data, null, 2));
      await fh.sync();
    } finally {
      await fh.close();
    }
    await fs.promises.rename(tmpPath, targetPath);
  } catch (err) {
    await fs.promises.unlink(tmpPath).catch(() => {
    });
    throw err;
  }
  try {
    const dirFh = await fs.promises.open(dir, "r");
    try {
      await dirFh.sync();
    } finally {
      await dirFh.close();
    }
  } catch {
  }
}
async function readLimitedText(resp) {
  if (!resp.body) {
    return "";
  }
  const reader = resp.body.getReader();
  const chunks = [];
  let received = 0;
  for (; ; ) {
    const { done, value } = await reader.read();
    if (done)
      break;
    if (received + value.length > MAX_TOKEN_RESPONSE_BYTES) {
      const remaining = MAX_TOKEN_RESPONSE_BYTES - received;
      if (remaining > 0)
        chunks.push(value.subarray(0, remaining));
      await reader.cancel();
      break;
    }
    chunks.push(value);
    received += value.length;
  }
  let merged;
  if (chunks.length === 1) {
    merged = chunks[0];
  } else {
    merged = new Uint8Array(chunks.reduce((n, c) => n + c.length, 0));
    let offset = 0;
    for (const c of chunks) {
      merged.set(c, offset);
      offset += c.length;
    }
  }
  return new TextDecoder("utf-8").decode(merged);
}
var WorkloadIdentityError = class extends AnthropicError {
  constructor(message, statusCode = null, body = null, requestId = null) {
    super(message);
    this.statusCode = statusCode;
    this.body = body;
    this.requestId = requestId;
  }
};

// node_modules/@anthropic-ai/sdk/internal/utils/time.mjs
function nowAsSeconds() {
  return Math.floor(Date.now() / 1e3);
}

// node_modules/@anthropic-ai/sdk/lib/credentials/token-cache.mjs
var TokenCache = class {
  constructor(provider, onAdvisoryRefreshError) {
    this.cached = null;
    this.pendingRefresh = null;
    this.nextForce = false;
    this.lastAdvisoryError = 0;
    this.provider = provider;
    this.onAdvisoryRefreshError = onAdvisoryRefreshError;
  }
  async getToken() {
    const force = this.nextForce;
    this.nextForce = false;
    const cached = this.cached;
    if (force || cached == null) {
      const token2 = await this.refresh(force);
      return token2.token;
    }
    if (cached.expiresAt == null) {
      return cached.token;
    }
    const remaining = cached.expiresAt - nowAsSeconds();
    if (remaining > ADVISORY_REFRESH_THRESHOLD_IN_SECONDS) {
      return cached.token;
    }
    if (remaining > MANDATORY_REFRESH_THRESHOLD_IN_SECONDS) {
      this.backgroundRefresh();
      return cached.token;
    }
    const token = await this.refresh();
    return token.token;
  }
  /**
   * Clears the cached token and marks the next {@link getToken} as a forced
   * refresh, so the underlying provider bypasses any on-disk freshness check.
   * Called after a 401 — the server has just told us the token is bad even
   * if its `expires_at` still looks fresh.
   */
  invalidate() {
    this.cached = null;
    this.nextForce = true;
  }
  /**
   * Mandatory refresh. Joins any in-flight refresh unless forced — a forced
   * refresh must not coalesce into a non-forced one that may re-serve the
   * same stale disk token.
   */
  refresh(force = false) {
    if (this.pendingRefresh && !force) {
      return this.pendingRefresh;
    }
    return this.doRefresh(force);
  }
  /**
   * Advisory background refresh. Shares the same in-flight promise as
   * mandatory refreshes for deduplication, but swallows errors so the
   * stale cached token keeps being served. Backs off for
   * {@link ADVISORY_REFRESH_BACKOFF_IN_SECONDS} after a failure so an
   * outage during the advisory window doesn't hammer the token endpoint.
   */
  backgroundRefresh() {
    if (this.pendingRefresh) {
      return;
    }
    if (nowAsSeconds() - this.lastAdvisoryError < ADVISORY_REFRESH_BACKOFF_IN_SECONDS) {
      return;
    }
    this.doRefresh().catch((err) => {
      this.lastAdvisoryError = nowAsSeconds();
      this.onAdvisoryRefreshError?.(err);
    });
  }
  /**
   * Core refresh. Sets {@link pendingRefresh} so concurrent callers
   * (both advisory and mandatory) coalesce into a single provider call.
   */
  doRefresh(force = false) {
    this.pendingRefresh = this.provider(force ? { forceRefresh: true } : void 0).then((token) => {
      this.cached = token;
      this.pendingRefresh = null;
      return token;
    }, (err) => {
      this.pendingRefresh = null;
      throw err;
    });
    return this.pendingRefresh;
  }
};

// node_modules/@anthropic-ai/sdk/internal/utils/env.mjs
var readEnv = (env) => {
  if (typeof globalThis.process !== "undefined") {
    return globalThis.process.env?.[env]?.trim() || void 0;
  }
  if (typeof globalThis.Deno !== "undefined") {
    return globalThis.Deno.env?.get?.(env)?.trim() || void 0;
  }
  return void 0;
};

// node_modules/@anthropic-ai/sdk/internal/utils/base64.mjs
init_error();

// node_modules/@anthropic-ai/sdk/internal/utils/bytes.mjs
function concatBytes(buffers) {
  let length = 0;
  for (const buffer of buffers) {
    length += buffer.length;
  }
  const output = new Uint8Array(length);
  let index = 0;
  for (const buffer of buffers) {
    output.set(buffer, index);
    index += buffer.length;
  }
  return output;
}
var encodeUTF8_;
function encodeUTF8(str) {
  let encoder2;
  return (encodeUTF8_ ?? (encoder2 = new globalThis.TextEncoder(), encodeUTF8_ = encoder2.encode.bind(encoder2)))(str);
}
var decodeUTF8_;
function decodeUTF8(bytes) {
  let decoder;
  return (decodeUTF8_ ?? (decoder = new globalThis.TextDecoder(), decodeUTF8_ = decoder.decode.bind(decoder)))(bytes);
}

// node_modules/@anthropic-ai/sdk/internal/utils/log.mjs
var defaultLogLevel = "warn";
var levelNumbers = {
  off: 0,
  error: 200,
  warn: 300,
  info: 400,
  debug: 500
};
var parseLogLevel = (maybeLevel, sourceName, logger) => {
  if (!maybeLevel) {
    return void 0;
  }
  if (hasOwn(levelNumbers, maybeLevel)) {
    return maybeLevel;
  }
  logger.warn(`${sourceName} was set to ${JSON.stringify(maybeLevel)}, expected one of ${JSON.stringify(Object.keys(levelNumbers))}`);
  return void 0;
};
function noop() {
}
function makeLogFn(fnLevel, logger, logLevel) {
  if (!logger || levelNumbers[fnLevel] > levelNumbers[logLevel]) {
    return noop;
  } else {
    return logger[fnLevel].bind(logger);
  }
}
var noopLogger = {
  error: noop,
  warn: noop,
  info: noop,
  debug: noop
};
var cachedLoggers = /* @__PURE__ */ new WeakMap();
function filterLogger(logger, logLevel) {
  const cachedLogger = cachedLoggers.get(logger);
  if (cachedLogger && cachedLogger[0] === logLevel) {
    return cachedLogger[1];
  }
  const levelLogger = {
    error: makeLogFn("error", logger, logLevel),
    warn: makeLogFn("warn", logger, logLevel),
    info: makeLogFn("info", logger, logLevel),
    debug: makeLogFn("debug", logger, logLevel)
  };
  cachedLoggers.set(logger, [logLevel, levelLogger]);
  return levelLogger;
}
function loggerFor(client) {
  const logger = client.logger;
  const logLevel = client.logLevel ?? "off";
  if (!logger) {
    return noopLogger;
  }
  return filterLogger(logger, logLevel);
}
var lastEnvLevel;
var cachedDefaultLogger;
function defaultLogger() {
  const envLevel = readEnv("ANTHROPIC_LOG");
  if (!cachedDefaultLogger || envLevel !== lastEnvLevel) {
    lastEnvLevel = envLevel;
    cachedDefaultLogger = filterLogger(console, parseLogLevel(envLevel, "process.env['ANTHROPIC_LOG']", filterLogger(console, defaultLogLevel)) ?? defaultLogLevel);
  }
  return cachedDefaultLogger;
}
var formatRequestDetails = (details) => {
  if (details.options) {
    details.options = { ...details.options };
    delete details.options["headers"];
  }
  if (details.headers) {
    details.headers = Object.fromEntries((details.headers instanceof Headers ? [...details.headers] : Object.entries(details.headers)).map(([name, value]) => [
      name,
      name.toLowerCase() === "authorization" || name.toLowerCase() === "api-key" || name.toLowerCase() === "x-api-key" || name.toLowerCase() === "cookie" || name.toLowerCase() === "set-cookie" ? "***" : value
    ]));
  }
  if ("retryOfRequestLogID" in details) {
    if (details.retryOfRequestLogID) {
      details.retryOf = details.retryOfRequestLogID;
    }
    delete details.retryOfRequestLogID;
  }
  return details;
};

// node_modules/@anthropic-ai/sdk/core/credentials.mjs
var CREDENTIALS_FILE_VERSION = "1.0";
var PROFILE_NAME_PATTERN = /^[A-Za-z0-9_.-]+$/;
function validateProfileName(name) {
  if (!name) {
    throw new Error("profile name is empty");
  }
  if (name === "." || name === "..") {
    throw new Error(`profile name "${name}" is not allowed`);
  }
  if (name.includes("/") || name.includes("\\")) {
    throw new Error(`profile name "${name}" must not contain path separators`);
  }
  if (!PROFILE_NAME_PATTERN.test(name)) {
    throw new Error(`profile name "${name}" contains disallowed characters (allowed: letters, digits, '_', '.', '-')`);
  }
}
var loadConfigWithSource = async (profile) => {
  var _a2, _b;
  const rootConfigPath = await getRootConfigPath();
  if (rootConfigPath === null) {
    return null;
  }
  const profileName = profile ?? await getActiveProfileName();
  if (profileName === null) {
    return null;
  }
  validateProfileName(profileName);
  const fs = await import("node:fs");
  const path2 = await import("node:path");
  const configPath = path2.join(rootConfigPath, "configs", `${profileName}.json`);
  let configRaw;
  try {
    configRaw = await fs.promises.readFile(configPath, "utf-8");
  } catch (err) {
    if (err?.code !== "ENOENT") {
      throw new Error(`failed to read config file ${configPath}: ${err}`);
    }
    configRaw = null;
  }
  if (configRaw === null) {
    const organizationId = readEnv("ANTHROPIC_ORGANIZATION_ID");
    const identityTokenFile = readEnv("ANTHROPIC_IDENTITY_TOKEN_FILE");
    const federationRuleId = readEnv("ANTHROPIC_FEDERATION_RULE_ID");
    if (federationRuleId && organizationId) {
      return {
        fromFile: false,
        config: {
          organization_id: organizationId,
          // A defaulted-but-empty CI variable (`ANTHROPIC_WORKSPACE_ID=""`) is
          // treated as unset — readEnv coerces empty to undefined, and the body
          // builder's truthy check skips it — so `"workspace_id": ""` never goes
          // on the wire.
          workspace_id: readEnv("ANTHROPIC_WORKSPACE_ID"),
          base_url: readEnv("ANTHROPIC_BASE_URL"),
          authentication: {
            type: "oidc_federation",
            federation_rule_id: federationRuleId,
            service_account_id: readEnv("ANTHROPIC_SERVICE_ACCOUNT_ID"),
            identity_token: identityTokenFile ? { source: "file", path: identityTokenFile } : void 0,
            scope: readEnv("ANTHROPIC_SCOPE")
          }
        }
      };
    }
    return null;
  }
  let config;
  try {
    config = JSON.parse(configRaw);
  } catch (err) {
    throw new Error(`failed to parse config file ${configPath}: ${err}`);
  }
  if (!config.authentication) {
    throw new Error(`config file ${configPath} is missing "authentication"`);
  }
  const authType = config.authentication.type;
  if (authType !== "oidc_federation" && authType !== "user_oauth") {
    throw new Error(`authentication.type "${authType}" is not a known authentication type`);
  }
  config.organization_id ?? (config.organization_id = readEnv("ANTHROPIC_ORGANIZATION_ID"));
  config.workspace_id ?? (config.workspace_id = readEnv("ANTHROPIC_WORKSPACE_ID"));
  config.base_url ?? (config.base_url = readEnv("ANTHROPIC_BASE_URL"));
  (_a2 = config.authentication).scope ?? (_a2.scope = readEnv("ANTHROPIC_SCOPE"));
  if (config.authentication.type === "oidc_federation") {
    if (!config.authentication.identity_token) {
      const identityTokenFile = readEnv("ANTHROPIC_IDENTITY_TOKEN_FILE");
      if (identityTokenFile) {
        config.authentication.identity_token = {
          source: "file",
          path: identityTokenFile
        };
      }
    }
    if (!config.authentication.federation_rule_id) {
      config.authentication.federation_rule_id = readEnv("ANTHROPIC_FEDERATION_RULE_ID") ?? "";
    }
    (_b = config.authentication).service_account_id ?? (_b.service_account_id = readEnv("ANTHROPIC_SERVICE_ACCOUNT_ID"));
  }
  return { config, fromFile: true };
};
var getCredentialsPath = async (config, profile) => {
  if (config?.authentication.credentials_path) {
    return config.authentication.credentials_path;
  }
  const rootConfigPath = await getRootConfigPath();
  if (!rootConfigPath) {
    return null;
  }
  const profileName = profile ?? await getActiveProfileName();
  if (!profileName) {
    return null;
  }
  validateProfileName(profileName);
  const path2 = await import("node:path");
  return path2.join(rootConfigPath, "credentials", `${profileName}.json`);
};
var getRootConfigPath = async () => {
  if (!supportsLocalConfigFiles()) {
    return null;
  }
  const path2 = await import("node:path");
  const configDir = readEnv("ANTHROPIC_CONFIG_DIR");
  if (configDir) {
    return configDir;
  }
  const os = getPlatformHeaders()["X-Stainless-OS"];
  if (os === "Windows") {
    const appData = readEnv("APPDATA");
    if (appData) {
      return path2.join(appData, "Anthropic");
    }
    const userProfile = readEnv("USERPROFILE");
    if (userProfile) {
      return path2.join(userProfile, "AppData", "Roaming", "Anthropic");
    }
    return null;
  }
  const xdgConfigHome = readEnv("XDG_CONFIG_HOME");
  if (xdgConfigHome) {
    return path2.join(xdgConfigHome, "anthropic");
  }
  const home = readEnv("HOME");
  if (home) {
    return path2.join(home, ".config", "anthropic");
  }
  return null;
};
var supportsLocalConfigFiles = () => {
  const runtime = getPlatformHeaders()["X-Stainless-Runtime"];
  return runtime === "node" || runtime === "deno";
};
var getActiveProfileName = async () => {
  const rootConfigPath = await getRootConfigPath();
  if (!rootConfigPath) {
    return null;
  }
  const profileName = readEnv("ANTHROPIC_PROFILE");
  if (profileName) {
    return profileName;
  }
  const fs = await import("node:fs");
  const path2 = await import("node:path");
  const filePath = path2.join(rootConfigPath, "active_config");
  try {
    return (await fs.promises.readFile(filePath, "utf-8")).trim() || "default";
  } catch (err) {
    if (err?.code !== "ENOENT") {
      throw new Error(`failed to read ${filePath}: ${err}`);
    }
    return "default";
  }
};

// node_modules/@anthropic-ai/sdk/lib/credentials/identity-token.mjs
init_error();
function identityTokenFromFile(path2) {
  if (!path2) {
    throw new AnthropicError("Identity token file path is empty");
  }
  return async () => {
    const fs = await import("node:fs");
    let content;
    try {
      content = await fs.promises.readFile(path2, "utf-8");
    } catch (err) {
      throw new AnthropicError(`Failed to read identity token file at ${path2}: ${err}`);
    }
    const token = content.trim();
    if (!token) {
      throw new AnthropicError(`Identity token file at ${path2} is empty`);
    }
    return token;
  };
}
function identityTokenFromValue(token) {
  if (!token) {
    throw new AnthropicError("Identity token value is empty");
  }
  return () => token;
}

// node_modules/@anthropic-ai/sdk/lib/credentials/oidc-federation.mjs
function oidcFederationProvider(config) {
  return async () => {
    requireSecureTokenEndpoint(config.baseURL);
    const jwt = await config.identityTokenProvider();
    if (jwt.length > 16 * 1024) {
      throw new WorkloadIdentityError(`Identity token is ${Math.ceil(jwt.length / 1024)} KiB, exceeds the 16 KiB assertion limit`);
    }
    const body = {
      grant_type: GRANT_TYPE_JWT_BEARER,
      assertion: jwt,
      federation_rule_id: config.federationRuleId,
      organization_id: config.organizationId
    };
    if (config.serviceAccountId) {
      body["service_account_id"] = config.serviceAccountId;
    }
    if (config.workspaceId) {
      body["workspace_id"] = config.workspaceId;
    }
    const url = `${config.baseURL}${TOKEN_ENDPOINT}`;
    let resp;
    try {
      resp = await config.fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "anthropic-beta": `${OAUTH_API_BETA_HEADER},${FEDERATION_BETA_HEADER}`,
          "User-Agent": config.userAgent || `anthropic-sdk-typescript/${VERSION} oidcFederationProvider`
        },
        body: JSON.stringify(body)
      });
    } catch (err) {
      throw new WorkloadIdentityError(`Failed to reach token endpoint ${url}: ${err}`);
    }
    const requestId = resp.headers.get("Request-Id");
    if (!resp.ok) {
      const text = await resp.text().catch(() => "");
      const redacted = redactSensitive(text);
      let hint = "";
      if (resp.status === 401) {
        const hintMiddle = config.workspaceId ? "" : "If your federation rule is scoped to multiple workspaces, set the ANTHROPIC_WORKSPACE_ID environment variable, the 'workspace_id' config key, or the `workspaceId` option. ";
        hint = ` Ensure your federation rule matches your identity token. ${hintMiddle}View your authentication events in the Workload identity page of Claude Console for more details.`;
      }
      throw new WorkloadIdentityError(`Token exchange failed with status ${resp.status}${requestId ? ` (request-id ${requestId})` : ""}: ${redacted}${hint}`, resp.status, redacted, requestId);
    }
    const data = await parseTokenResponse(resp, requestId);
    const expiresIn = Number(data.expires_in);
    if (!Number.isFinite(expiresIn)) {
      throw new WorkloadIdentityError(`Token endpoint response missing required fields: ${JSON.stringify(redactSensitive(data))}`, resp.status, redactSensitive(data), requestId);
    }
    return {
      token: data.access_token,
      expiresAt: nowAsSeconds() + expiresIn
    };
  };
}

// node_modules/@anthropic-ai/sdk/lib/credentials/user-oauth.mjs
function userOAuthProvider(config) {
  return async (opts) => {
    const fs = await import("node:fs");
    await checkCredentialsFileSafety(config.credentialsPath, config.onSafetyWarning);
    let raw;
    try {
      raw = await fs.promises.readFile(config.credentialsPath, "utf-8");
    } catch (err) {
      throw new WorkloadIdentityError(`Credentials file not found at ${config.credentialsPath}: ${err}`);
    }
    let creds;
    try {
      creds = JSON.parse(raw);
    } catch (err) {
      throw new WorkloadIdentityError(`Credentials file at ${config.credentialsPath} is not valid JSON: ${err}`);
    }
    const accessToken = creds.access_token;
    if (!accessToken) {
      throw new WorkloadIdentityError(`Credentials file at ${config.credentialsPath} must include 'access_token'`);
    }
    const expiresAt = creds.expires_at;
    if (!opts?.forceRefresh && (expiresAt == null || nowAsSeconds() < expiresAt - MANDATORY_REFRESH_THRESHOLD_IN_SECONDS)) {
      return { token: accessToken, expiresAt: expiresAt ?? null };
    }
    const refreshToken = creds.refresh_token;
    if (!config.clientId || !refreshToken) {
      throw new WorkloadIdentityError(`Access token at ${config.credentialsPath} has expired and no refresh is available (client_id ${config.clientId ? "set" : "empty"}, refresh_token ${refreshToken ? "set" : "empty"})`);
    }
    requireSecureTokenEndpoint(config.baseURL);
    const body = {
      grant_type: GRANT_TYPE_REFRESH_TOKEN,
      refresh_token: refreshToken,
      client_id: config.clientId
    };
    const url = `${config.baseURL}${TOKEN_ENDPOINT}`;
    let resp;
    try {
      resp = await config.fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "anthropic-beta": OAUTH_API_BETA_HEADER,
          "User-Agent": config.userAgent || `anthropic-sdk-typescript/${VERSION} userOAuthProvider`
        },
        body: JSON.stringify(body)
      });
    } catch (err) {
      throw new WorkloadIdentityError(`User OAuth refresh failed to reach token endpoint: ${err}`);
    }
    const requestId = resp.headers.get("Request-Id");
    if (!resp.ok) {
      const text = await resp.text().catch(() => "");
      throw new WorkloadIdentityError(`User OAuth refresh failed (HTTP ${resp.status}): ${redactSensitive(text)}`, resp.status, redactSensitive(text), requestId);
    }
    const data = await parseTokenResponse(resp, requestId);
    const expiresIn = Number(data.expires_in);
    if (!Number.isFinite(expiresIn)) {
      throw new WorkloadIdentityError(`User OAuth refresh response missing or invalid expires_in: ${JSON.stringify(redactSensitive(data))}`, resp.status, redactSensitive(data), requestId);
    }
    const newExpiresAt = nowAsSeconds() + expiresIn;
    const newRefreshToken = data.refresh_token || refreshToken;
    await writeCredentialsFileAtomic(config.credentialsPath, {
      ...creds,
      version: CREDENTIALS_FILE_VERSION,
      type: "oauth_token",
      access_token: data.access_token,
      expires_at: newExpiresAt,
      refresh_token: newRefreshToken
    });
    return { token: data.access_token, expiresAt: newExpiresAt };
  };
}

// node_modules/@anthropic-ai/sdk/lib/credentials/credential-chain.mjs
function resolveCredentialsFromConfig(config, options) {
  const credentialsPath = config.authentication.credentials_path ?? null;
  const effectiveBaseURL = (config.base_url || options.baseURL).replace(/\/+$/, "");
  const provider = buildProvider(config, credentialsPath, effectiveBaseURL, options);
  const extraHeaders = {};
  if (config.workspace_id && config.authentication.type === "user_oauth") {
    extraHeaders["anthropic-workspace-id"] = config.workspace_id;
  }
  return { provider, extraHeaders, baseURL: config.base_url || void 0 };
}
async function defaultCredentials(options, profile) {
  const loaded = await loadConfigWithSource(profile);
  if (!loaded) {
    return null;
  }
  const { config, fromFile } = loaded;
  const withPath = config.authentication.credentials_path || !fromFile ? config : {
    ...config,
    authentication: {
      ...config.authentication,
      credentials_path: await getCredentialsPath(config, profile) ?? void 0
    }
  };
  return resolveCredentialsFromConfig(withPath, options);
}
function buildProvider(config, credentialsPath, baseURL, options) {
  switch (config.authentication.type) {
    case "oidc_federation": {
      const auth = config.authentication;
      const identityProvider = resolveIdentityTokenProvider(auth);
      if (!identityProvider) {
        throw new WorkloadIdentityError("oidc_federation config requires an identity token (set authentication.identity_token, ANTHROPIC_IDENTITY_TOKEN_FILE, or ANTHROPIC_IDENTITY_TOKEN)");
      }
      if (!auth.federation_rule_id) {
        throw new WorkloadIdentityError("oidc_federation config requires 'federation_rule_id'. Set it in authentication.federation_rule_id in your profile, or via ANTHROPIC_FEDERATION_RULE_ID (profile takes precedence).");
      }
      if (!config.organization_id) {
        throw new WorkloadIdentityError("oidc_federation config requires organization_id (set ANTHROPIC_ORGANIZATION_ID or config.organization_id)");
      }
      const exchange = oidcFederationProvider({
        identityTokenProvider: identityProvider,
        federationRuleId: auth.federation_rule_id,
        organizationId: config.organization_id,
        serviceAccountId: auth.service_account_id,
        workspaceId: config.workspace_id,
        baseURL,
        fetch: options.fetch,
        userAgent: options.userAgent
      });
      if (credentialsPath) {
        return cachedExchangeProvider(exchange, credentialsPath, options.onCacheWriteError, options.onSafetyWarning);
      }
      return exchange;
    }
    case "user_oauth": {
      if (!credentialsPath) {
        throw new WorkloadIdentityError("user_oauth config requires authentication.credentials_path (or load via a profile so it defaults to <config_dir>/credentials/<profile>.json)");
      }
      return userOAuthProvider({
        credentialsPath,
        clientId: config.authentication.client_id,
        baseURL,
        fetch: options.fetch,
        userAgent: options.userAgent,
        onSafetyWarning: options.onSafetyWarning
      });
    }
    default: {
      const t = config.authentication.type;
      throw new WorkloadIdentityError(`authentication.type "${t}" is not a known authentication type`);
    }
  }
}
function resolveIdentityTokenProvider(auth) {
  if (auth.identity_token) {
    const source = auth.identity_token.source;
    if (source !== "file") {
      throw new WorkloadIdentityError(`identity_token.source "${source}" is not supported by this SDK version (only "file")`);
    }
    if (!auth.identity_token.path) {
      throw new WorkloadIdentityError(`identity_token.source "file" requires a non-empty path`);
    }
    return identityTokenFromFile(auth.identity_token.path);
  }
  const tokenFile = readEnv("ANTHROPIC_IDENTITY_TOKEN_FILE");
  if (tokenFile) {
    return identityTokenFromFile(tokenFile);
  }
  const tokenValue = readEnv("ANTHROPIC_IDENTITY_TOKEN");
  if (tokenValue) {
    return identityTokenFromValue(tokenValue);
  }
  return null;
}
function cachedExchangeProvider(exchange, credentialsPath, onCacheWriteError, onSafetyWarning) {
  return async (opts) => {
    const fs = await import("node:fs");
    await checkCredentialsFileSafety(credentialsPath, onSafetyWarning);
    let existing;
    try {
      const raw = await fs.promises.readFile(credentialsPath, "utf-8");
      existing = JSON.parse(raw);
      const token = existing?.["access_token"];
      if (token && !opts?.forceRefresh) {
        const expiresAt = existing?.["expires_at"];
        if (expiresAt == null || nowAsSeconds() < expiresAt - MANDATORY_REFRESH_THRESHOLD_IN_SECONDS) {
          return { token, expiresAt: expiresAt ?? null };
        }
      }
    } catch (err) {
      const code = err?.code;
      if (code !== "ENOENT" && !(err instanceof SyntaxError)) {
        onCacheWriteError?.(err);
      }
    }
    const result = await exchange(opts);
    try {
      await writeCredentialsFileAtomic(credentialsPath, {
        ...existing ?? {},
        version: CREDENTIALS_FILE_VERSION,
        type: "oauth_token",
        access_token: result.token,
        expires_at: result.expiresAt
      });
    } catch (err) {
      onCacheWriteError?.(err);
    }
    return result;
  };
}

// node_modules/@anthropic-ai/sdk/core/middleware.mjs
init_errors();

// node_modules/@anthropic-ai/sdk/core/streaming.mjs
init_error();

// node_modules/@anthropic-ai/sdk/internal/decoders/line.mjs
var _LineDecoder_buffer;
var _LineDecoder_carriageReturnIndex;
var LineDecoder = class {
  constructor() {
    _LineDecoder_buffer.set(this, void 0);
    _LineDecoder_carriageReturnIndex.set(this, void 0);
    __classPrivateFieldSet(this, _LineDecoder_buffer, new Uint8Array(), "f");
    __classPrivateFieldSet(this, _LineDecoder_carriageReturnIndex, null, "f");
  }
  decode(chunk) {
    if (chunk == null) {
      return [];
    }
    const binaryChunk = chunk instanceof ArrayBuffer ? new Uint8Array(chunk) : typeof chunk === "string" ? encodeUTF8(chunk) : chunk;
    __classPrivateFieldSet(this, _LineDecoder_buffer, concatBytes([__classPrivateFieldGet(this, _LineDecoder_buffer, "f"), binaryChunk]), "f");
    const lines = [];
    let patternIndex;
    while ((patternIndex = findNewlineIndex(__classPrivateFieldGet(this, _LineDecoder_buffer, "f"), __classPrivateFieldGet(this, _LineDecoder_carriageReturnIndex, "f"))) != null) {
      if (patternIndex.carriage && __classPrivateFieldGet(this, _LineDecoder_carriageReturnIndex, "f") == null) {
        __classPrivateFieldSet(this, _LineDecoder_carriageReturnIndex, patternIndex.index, "f");
        continue;
      }
      if (__classPrivateFieldGet(this, _LineDecoder_carriageReturnIndex, "f") != null && (patternIndex.index !== __classPrivateFieldGet(this, _LineDecoder_carriageReturnIndex, "f") + 1 || patternIndex.carriage)) {
        lines.push(decodeUTF8(__classPrivateFieldGet(this, _LineDecoder_buffer, "f").subarray(0, __classPrivateFieldGet(this, _LineDecoder_carriageReturnIndex, "f") - 1)));
        __classPrivateFieldSet(this, _LineDecoder_buffer, __classPrivateFieldGet(this, _LineDecoder_buffer, "f").subarray(__classPrivateFieldGet(this, _LineDecoder_carriageReturnIndex, "f")), "f");
        __classPrivateFieldSet(this, _LineDecoder_carriageReturnIndex, null, "f");
        continue;
      }
      const endIndex = __classPrivateFieldGet(this, _LineDecoder_carriageReturnIndex, "f") !== null ? patternIndex.preceding - 1 : patternIndex.preceding;
      const line = decodeUTF8(__classPrivateFieldGet(this, _LineDecoder_buffer, "f").subarray(0, endIndex));
      lines.push(line);
      __classPrivateFieldSet(this, _LineDecoder_buffer, __classPrivateFieldGet(this, _LineDecoder_buffer, "f").subarray(patternIndex.index), "f");
      __classPrivateFieldSet(this, _LineDecoder_carriageReturnIndex, null, "f");
    }
    return lines;
  }
  flush() {
    if (!__classPrivateFieldGet(this, _LineDecoder_buffer, "f").length) {
      return [];
    }
    return this.decode("\n");
  }
};
_LineDecoder_buffer = /* @__PURE__ */ new WeakMap(), _LineDecoder_carriageReturnIndex = /* @__PURE__ */ new WeakMap();
LineDecoder.NEWLINE_CHARS = /* @__PURE__ */ new Set(["\n", "\r"]);
LineDecoder.NEWLINE_REGEXP = /\r\n|[\n\r]/g;
function findNewlineIndex(buffer, startIndex) {
  const newline = 10;
  const carriage = 13;
  for (let i = startIndex ?? 0; i < buffer.length; i++) {
    if (buffer[i] === newline) {
      return { preceding: i, index: i + 1, carriage: false };
    }
    if (buffer[i] === carriage) {
      return { preceding: i, index: i + 1, carriage: true };
    }
  }
  return null;
}
function findDoubleNewlineIndex(buffer) {
  const newline = 10;
  const carriage = 13;
  for (let i = 0; i < buffer.length - 1; i++) {
    if (buffer[i] === newline && buffer[i + 1] === newline) {
      return i + 2;
    }
    if (buffer[i] === carriage && buffer[i + 1] === carriage) {
      return i + 2;
    }
    if (buffer[i] === carriage && buffer[i + 1] === newline && i + 3 < buffer.length && buffer[i + 2] === carriage && buffer[i + 3] === newline) {
      return i + 4;
    }
  }
  return -1;
}

// node_modules/@anthropic-ai/sdk/core/streaming.mjs
init_errors();
init_error();
var _Stream_client;
var Stream = class _Stream {
  constructor(iterator, controller, client) {
    this.iterator = iterator;
    _Stream_client.set(this, void 0);
    this.controller = controller;
    __classPrivateFieldSet(this, _Stream_client, client, "f");
  }
  /**
   * Iterate the raw Server-Sent Events from `response` — `{event, data, raw}`
   * objects, before any JSON parsing or event-name filtering.
   *
   * This reads `response.body` directly (not a clone), so the response is
   * consumed. Use this in middleware that fully replaces the stream body; for
   * read-only observation of parsed events, use `ctx.parse()` instead.
   */
  static rawEvents(response, controller = new AbortController()) {
    return _iterSSEMessages(response, controller);
  }
  static fromSSEResponse(response, controller, client) {
    let consumed = false;
    const logger = client ? loggerFor(client) : console;
    async function* iterator() {
      if (consumed) {
        throw new AnthropicError("Cannot iterate over a consumed stream, use `.tee()` to split the stream.");
      }
      consumed = true;
      let done = false;
      try {
        for await (const sse of _iterSSEMessages(response, controller)) {
          if (sse.event === "completion") {
            try {
              yield JSON.parse(sse.data);
            } catch (e) {
              logger.error(`Could not parse message into JSON:`, sse.data);
              logger.error(`From chunk:`, sse.raw);
              throw e;
            }
          }
          if (sse.event === "message_start" || sse.event === "message_delta" || sse.event === "message_stop" || sse.event === "content_block_start" || sse.event === "content_block_delta" || sse.event === "content_block_stop" || sse.event === "message" || sse.event === "user.message" || sse.event === "user.interrupt" || sse.event === "user.tool_confirmation" || sse.event === "user.custom_tool_result" || sse.event === "user.tool_result" || sse.event === "agent.message" || sse.event === "agent.thinking" || sse.event === "agent.tool_use" || sse.event === "agent.tool_result" || sse.event === "agent.mcp_tool_use" || sse.event === "agent.mcp_tool_result" || sse.event === "agent.custom_tool_use" || sse.event === "agent.thread_context_compacted" || sse.event === "session.status_running" || sse.event === "session.status_idle" || sse.event === "session.status_rescheduled" || sse.event === "session.status_terminated" || sse.event === "session.error" || sse.event === "session.deleted" || sse.event === "session.updated" || sse.event === "span.model_request_start" || sse.event === "span.model_request_end" || sse.event === "span.outcome_evaluation_start" || sse.event === "span.outcome_evaluation_ongoing" || sse.event === "span.outcome_evaluation_end" || sse.event === "user.define_outcome" || sse.event === "agent.thread_message_received" || sse.event === "agent.thread_message_sent" || sse.event === "agent.session_thread_message_received" || sse.event === "agent.session_thread_message_sent" || sse.event === "session.thread_created" || sse.event === "session.thread_status_created" || sse.event === "session.thread_status_running" || sse.event === "session.thread_status_idle" || sse.event === "session.thread_status_rescheduled" || sse.event === "session.thread_status_terminated" || sse.event === "event_start" || sse.event === "event_delta" || sse.event === "system.message") {
            try {
              yield JSON.parse(sse.data);
            } catch (e) {
              logger.error(`Could not parse message into JSON:`, sse.data);
              logger.error(`From chunk:`, sse.raw);
              throw e;
            }
          }
          if (sse.event === "ping") {
            continue;
          }
          if (sse.event === "error") {
            const body = safeJSON(sse.data) ?? sse.data;
            const type = body?.error?.type;
            throw new APIError(void 0, body, void 0, response.headers, type);
          }
        }
        done = true;
      } catch (e) {
        if (isAbortError(e))
          return;
        throw e;
      } finally {
        if (!done)
          controller.abort();
      }
    }
    return new _Stream(iterator, controller, client);
  }
  /**
   * Generates a Stream from a newline-separated ReadableStream
   * where each item is a JSON value.
   */
  static fromReadableStream(readableStream, controller, client) {
    let consumed = false;
    async function* iterLines() {
      const lineDecoder = new LineDecoder();
      const iter = ReadableStreamToAsyncIterable(readableStream);
      for await (const chunk of iter) {
        for (const line of lineDecoder.decode(chunk)) {
          yield line;
        }
      }
      for (const line of lineDecoder.flush()) {
        yield line;
      }
    }
    async function* iterator() {
      if (consumed) {
        throw new AnthropicError("Cannot iterate over a consumed stream, use `.tee()` to split the stream.");
      }
      consumed = true;
      let done = false;
      try {
        for await (const line of iterLines()) {
          if (done)
            continue;
          if (line)
            yield JSON.parse(line);
        }
        done = true;
      } catch (e) {
        if (isAbortError(e))
          return;
        throw e;
      } finally {
        if (!done)
          controller.abort();
      }
    }
    return new _Stream(iterator, controller, client);
  }
  [(_Stream_client = /* @__PURE__ */ new WeakMap(), Symbol.asyncIterator)]() {
    return this.iterator();
  }
  /**
   * Splits the stream into two streams which can be
   * independently read from at different speeds.
   */
  tee() {
    const left = [];
    const right = [];
    const iterator = this.iterator();
    const teeIterator = (queue) => {
      return {
        next: () => {
          if (queue.length === 0) {
            const result = iterator.next();
            left.push(result);
            right.push(result);
          }
          return queue.shift();
        }
      };
    };
    return [
      new _Stream(() => teeIterator(left), this.controller, __classPrivateFieldGet(this, _Stream_client, "f")),
      new _Stream(() => teeIterator(right), this.controller, __classPrivateFieldGet(this, _Stream_client, "f"))
    ];
  }
  /**
   * Converts this stream to a newline-separated ReadableStream of
   * JSON stringified values in the stream
   * which can be turned back into a Stream with `Stream.fromReadableStream()`.
   */
  toReadableStream() {
    const self = this;
    let iter;
    return makeReadableStream({
      async start() {
        iter = self[Symbol.asyncIterator]();
      },
      async pull(ctrl) {
        try {
          const { value, done } = await iter.next();
          if (done)
            return ctrl.close();
          const bytes = encodeUTF8(JSON.stringify(value) + "\n");
          ctrl.enqueue(bytes);
        } catch (err) {
          ctrl.error(err);
        }
      },
      async cancel() {
        await iter.return?.();
      }
    });
  }
};
async function* _iterSSEMessages(response, controller) {
  if (!response.body) {
    controller.abort();
    if (typeof globalThis.navigator !== "undefined" && globalThis.navigator.product === "ReactNative") {
      throw new AnthropicError(`The default react-native fetch implementation does not support streaming. Please use expo/fetch: https://docs.expo.dev/versions/latest/sdk/expo/#expofetch-api`);
    }
    throw new AnthropicError(`Attempted to iterate over a response with no body`);
  }
  const sseDecoder = new SSEDecoder();
  const lineDecoder = new LineDecoder();
  const iter = ReadableStreamToAsyncIterable(response.body);
  for await (const sseChunk of iterSSEChunks(iter)) {
    for (const line of lineDecoder.decode(sseChunk)) {
      const sse = sseDecoder.decode(line);
      if (sse)
        yield sse;
    }
  }
  for (const line of lineDecoder.flush()) {
    const sse = sseDecoder.decode(line);
    if (sse)
      yield sse;
  }
}
async function* iterSSEChunks(iterator) {
  let data = new Uint8Array();
  for await (const chunk of iterator) {
    if (chunk == null) {
      continue;
    }
    const binaryChunk = chunk instanceof ArrayBuffer ? new Uint8Array(chunk) : typeof chunk === "string" ? encodeUTF8(chunk) : chunk;
    let newData = new Uint8Array(data.length + binaryChunk.length);
    newData.set(data);
    newData.set(binaryChunk, data.length);
    data = newData;
    let patternIndex;
    while ((patternIndex = findDoubleNewlineIndex(data)) !== -1) {
      yield data.slice(0, patternIndex);
      data = data.slice(patternIndex);
    }
  }
  if (data.length > 0) {
    yield data;
  }
}
var SSEDecoder = class {
  constructor() {
    this.event = null;
    this.data = [];
    this.chunks = [];
  }
  decode(line) {
    if (line.endsWith("\r")) {
      line = line.substring(0, line.length - 1);
    }
    if (!line) {
      if (!this.event && !this.data.length)
        return null;
      const sse = {
        event: this.event,
        data: this.data.join("\n"),
        raw: this.chunks
      };
      this.event = null;
      this.data = [];
      this.chunks = [];
      return sse;
    }
    this.chunks.push(line);
    if (line.startsWith(":")) {
      return null;
    }
    let [fieldname, _, value] = partition(line, ":");
    if (value.startsWith(" ")) {
      value = value.substring(1);
    }
    if (fieldname === "event") {
      this.event = value;
    } else if (fieldname === "data") {
      this.data.push(value);
    }
    return null;
  }
};
function partition(str, delimiter) {
  const index = str.indexOf(delimiter);
  if (index !== -1) {
    return [str.substring(0, index), delimiter, str.substring(index + delimiter.length)];
  }
  return [str, "", ""];
}

// node_modules/@anthropic-ai/sdk/internal/parse.mjs
async function defaultParseResponse(client, props) {
  const { response, requestLogID, retryOfRequestLogID, startTime } = props;
  const body = await (async () => {
    if (props.options.stream) {
      loggerFor(client).debug("response", response.status, response.url, response.headers, response.body);
      return Stream.fromSSEResponse(response, props.controller);
    }
    if (response.status === 204) {
      return null;
    }
    if (props.options.__binaryResponse) {
      return response;
    }
    const contentType = response.headers.get("content-type");
    const mediaType = contentType?.split(";")[0]?.trim();
    const isJSON = mediaType?.includes("application/json") || mediaType?.endsWith("+json");
    if (isJSON) {
      const contentLength = response.headers.get("content-length");
      if (contentLength === "0") {
        return void 0;
      }
      const json = await response.json();
      return addRequestID(json, response);
    }
    const text = await response.text();
    return text;
  })();
  loggerFor(client).debug(`[${requestLogID}] response parsed`, formatRequestDetails({
    retryOfRequestLogID,
    url: response.url,
    status: response.status,
    body,
    durationMs: Date.now() - startTime
  }));
  return body;
}
function addRequestID(value, response) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return value;
  }
  return Object.defineProperty(value, "_request_id", {
    value: response.headers.get("request-id"),
    enumerable: false
  });
}

// node_modules/@anthropic-ai/sdk/core/middleware.mjs
init_error();
var fetchOriginErrors = /* @__PURE__ */ new WeakSet();
function isFetchOriginError(err) {
  return typeof err === "object" && err !== null && fetchOriginErrors.has(err);
}
function isRetryableError(err) {
  const seen = /* @__PURE__ */ new Set();
  while (typeof err === "object" && err !== null && !seen.has(err)) {
    seen.add(err);
    if (isFetchOriginError(err) || isAbortError(err) || err instanceof APIConnectionError || err instanceof RetryableError) {
      return true;
    }
    err = err.cause;
  }
  return false;
}
function wrapFetchWithMiddleware(fetchFn, middleware, options, client) {
  return async (url, init = {}) => {
    if (middleware.length === 0) {
      return fetchFn.call(void 0, url, init);
    }
    const headers = init.headers instanceof Headers ? init.headers : new Headers(init.headers);
    const response = await applyMiddleware(fetchFn, middleware, options, client)({
      ...init,
      headers,
      url: typeof url === "string" ? url : url instanceof URL ? url.href : url.url
    });
    if (response.bodyUsed || response.body?.locked) {
      throw new AnthropicError("middleware consumed the response body; use response.clone() to inspect it, or return new Response(body, response) to consume and replace it");
    }
    return response;
  };
}
function createMiddlewareContext(options, client) {
  const cache = /* @__PURE__ */ new WeakMap();
  return {
    options,
    // Resolved per chain, so changes to the client's `logLevel`/`logger`
    // apply to subsequent requests.
    logger: client ? loggerFor(client) : defaultLogger(),
    parse(response) {
      if (options?.stream && response.ok) {
        return parseMiddlewareResponse(response, options);
      }
      let parsed = cache.get(response);
      if (!parsed) {
        parsed = parseMiddlewareResponse(response, options);
        cache.set(response, parsed);
      }
      return parsed;
    }
  };
}
async function parseMiddlewareResponse(response, options) {
  if (response.bodyUsed || response.body?.locked) {
    throw new AnthropicError("cannot ctx.parse() a response whose body was already consumed; call ctx.parse() instead of reading the body, or read via response.clone()");
  }
  if (options?.stream && response.ok) {
    return Stream.fromSSEResponse(response.clone(), new AbortController());
  }
  if (response.status === 204) {
    return null;
  }
  if (options?.__binaryResponse) {
    return response;
  }
  const contentType = response.headers.get("content-type");
  const mediaType = contentType?.split(";")[0]?.trim();
  const isJSON = mediaType?.includes("application/json") || mediaType?.endsWith("+json");
  if (isJSON) {
    if (response.headers.get("content-length") === "0") {
      return void 0;
    }
    return addRequestID(await response.clone().json(), response);
  }
  return await response.clone().text();
}
function applyMiddleware(fetchFn, middleware, options, client) {
  let next = async ({ url, ...init }) => {
    try {
      return await fetchFn.call(void 0, url, init);
    } catch (err) {
      const error = castToError(err);
      fetchOriginErrors.add(error);
      throw error;
    }
  };
  const ctx = createMiddlewareContext(options, client);
  for (let i = middleware.length - 1; i >= 0; i--) {
    const mw = middleware[i];
    const nextInner = next;
    next = async (request) => mw(request, nextInner, ctx);
  }
  return next;
}

// node_modules/@anthropic-ai/sdk/core/pagination.mjs
init_error();

// node_modules/@anthropic-ai/sdk/core/api-promise.mjs
var _APIPromise_client;
var APIPromise = class _APIPromise extends Promise {
  constructor(client, responsePromise, parseResponse = defaultParseResponse) {
    super((resolve) => {
      resolve(null);
    });
    this.responsePromise = responsePromise;
    this.parseResponse = parseResponse;
    _APIPromise_client.set(this, void 0);
    __classPrivateFieldSet(this, _APIPromise_client, client, "f");
  }
  _thenUnwrap(transform) {
    return new _APIPromise(__classPrivateFieldGet(this, _APIPromise_client, "f"), this.responsePromise, async (client, props) => addRequestID(transform(await this.parseResponse(client, props), props), props.response));
  }
  /**
   * Gets the raw `Response` instance instead of parsing the response
   * data.
   *
   * If you want to parse the response body but still get the `Response`
   * instance, you can use {@link withResponse()}.
   *
   * 👋 Getting the wrong TypeScript type for `Response`?
   * Try setting `"moduleResolution": "NodeNext"` or add `"lib": ["DOM"]`
   * to your `tsconfig.json`.
   */
  asResponse() {
    return this.responsePromise.then((p) => p.response);
  }
  /**
   * Gets the parsed response data, the raw `Response` instance and the ID of the request,
   * returned via the `request-id` header which is useful for debugging requests and resporting
   * issues to Anthropic.
   *
   * If you just want to get the raw `Response` instance without parsing it,
   * you can use {@link asResponse()}.
   *
   * 👋 Getting the wrong TypeScript type for `Response`?
   * Try setting `"moduleResolution": "NodeNext"` or add `"lib": ["DOM"]`
   * to your `tsconfig.json`.
   */
  async withResponse() {
    const [data, response] = await Promise.all([this.parse(), this.asResponse()]);
    return { data, response, request_id: response.headers.get("request-id") };
  }
  parse() {
    if (!this.parsedPromise) {
      this.parsedPromise = this.responsePromise.then((data) => this.parseResponse(__classPrivateFieldGet(this, _APIPromise_client, "f"), data));
    }
    return this.parsedPromise;
  }
  then(onfulfilled, onrejected) {
    return this.parse().then(onfulfilled, onrejected);
  }
  catch(onrejected) {
    return this.parse().catch(onrejected);
  }
  finally(onfinally) {
    return this.parse().finally(onfinally);
  }
};
_APIPromise_client = /* @__PURE__ */ new WeakMap();

// node_modules/@anthropic-ai/sdk/core/pagination.mjs
var _AbstractPage_client;
var AbstractPage = class {
  constructor(client, response, body, options) {
    _AbstractPage_client.set(this, void 0);
    __classPrivateFieldSet(this, _AbstractPage_client, client, "f");
    this.options = options;
    this.response = response;
    this.body = body;
  }
  hasNextPage() {
    const items = this.getPaginatedItems();
    if (!items.length)
      return false;
    return this.nextPageRequestOptions() != null;
  }
  async getNextPage() {
    const nextOptions = this.nextPageRequestOptions();
    if (!nextOptions) {
      throw new AnthropicError("No next page expected; please check `.hasNextPage()` before calling `.getNextPage()`.");
    }
    return await __classPrivateFieldGet(this, _AbstractPage_client, "f").requestAPIList(this.constructor, nextOptions);
  }
  async *iterPages() {
    let page = this;
    yield page;
    while (page.hasNextPage()) {
      page = await page.getNextPage();
      yield page;
    }
  }
  async *[(_AbstractPage_client = /* @__PURE__ */ new WeakMap(), Symbol.asyncIterator)]() {
    for await (const page of this.iterPages()) {
      for (const item of page.getPaginatedItems()) {
        yield item;
      }
    }
  }
};
var PagePromise = class extends APIPromise {
  constructor(client, request, Page2) {
    super(client, request, async (client2, props) => new Page2(client2, props.response, await defaultParseResponse(client2, props), props.options));
  }
  /**
   * Allow auto-paginating iteration on an unawaited list call, eg:
   *
   *    for await (const item of client.items.list()) {
   *      console.log(item)
   *    }
   */
  async *[Symbol.asyncIterator]() {
    const page = await this;
    for await (const item of page) {
      yield item;
    }
  }
};
var Page = class extends AbstractPage {
  constructor(client, response, body, options) {
    super(client, response, body, options);
    this.data = body.data || [];
    this.has_more = body.has_more || false;
    this.first_id = body.first_id || null;
    this.last_id = body.last_id || null;
  }
  getPaginatedItems() {
    return this.data ?? [];
  }
  hasNextPage() {
    if (this.has_more === false) {
      return false;
    }
    return super.hasNextPage();
  }
  nextPageRequestOptions() {
    if (this.options.query?.["before_id"]) {
      const first_id = this.first_id;
      if (!first_id) {
        return null;
      }
      return {
        ...this.options,
        query: {
          ...maybeObj(this.options.query),
          before_id: first_id
        }
      };
    }
    const cursor = this.last_id;
    if (!cursor) {
      return null;
    }
    return {
      ...this.options,
      query: {
        ...maybeObj(this.options.query),
        after_id: cursor
      }
    };
  }
};
var PageCursor = class extends AbstractPage {
  constructor(client, response, body, options) {
    super(client, response, body, options);
    this.data = body.data || [];
    this.next_page = body.next_page || null;
  }
  getPaginatedItems() {
    return this.data ?? [];
  }
  nextPageRequestOptions() {
    const cursor = this.next_page;
    if (!cursor) {
      return null;
    }
    return {
      ...this.options,
      query: {
        ...maybeObj(this.options.query),
        page: cursor
      }
    };
  }
};
var BidirectionalPageCursor = class extends AbstractPage {
  constructor(client, response, body, options) {
    super(client, response, body, options);
    this.data = body.data || [];
    this.next_page = body.next_page || null;
    this.prev_page = body.prev_page || null;
  }
  getPaginatedItems() {
    return this.data ?? [];
  }
  nextPageRequestOptions() {
    const cursor = this.next_page;
    if (!cursor) {
      return null;
    }
    return {
      ...this.options,
      query: {
        ...maybeObj(this.options.query),
        page: cursor
      }
    };
  }
};

// node_modules/@anthropic-ai/sdk/internal/uploads.mjs
var checkFileSupport = () => {
  if (typeof File === "undefined") {
    const { process: process2 } = globalThis;
    const isOldNode = typeof process2?.versions?.node === "string" && parseInt(process2.versions.node.split(".")) < 20;
    throw new Error("`File` is not defined as a global, which is required for file uploads." + (isOldNode ? " Update to Node 20 LTS or newer, or set `globalThis.File` to `import('node:buffer').File`." : ""));
  }
};
function makeFile(fileBits, fileName, options) {
  checkFileSupport();
  return new File(fileBits, fileName ?? "unknown_file", options);
}
function getName(value, stripPath) {
  const val = typeof value === "object" && value !== null && ("name" in value && value.name && String(value.name) || "url" in value && value.url && String(value.url) || "filename" in value && value.filename && String(value.filename) || "path" in value && value.path && String(value.path)) || "";
  return stripPath ? val.split(/[\\/]/).pop() || void 0 : val;
}
var isAsyncIterable = (value) => value != null && typeof value === "object" && typeof value[Symbol.asyncIterator] === "function";
var multipartFormRequestOptions = async (opts, fetch2, stripFilenames = true) => {
  return { ...opts, body: await createForm(opts.body, fetch2, stripFilenames) };
};
var supportsFormDataMap = /* @__PURE__ */ new WeakMap();
function supportsFormData(fetchObject) {
  const fetch2 = typeof fetchObject === "function" ? fetchObject : fetchObject.fetch;
  const cached = supportsFormDataMap.get(fetch2);
  if (cached)
    return cached;
  const promise = (async () => {
    try {
      const FetchResponse = "Response" in fetch2 ? fetch2.Response : (await fetch2("data:,")).constructor;
      const data = new FormData();
      if (data.toString() === await new FetchResponse(data).text()) {
        return false;
      }
      return true;
    } catch {
      return true;
    }
  })();
  supportsFormDataMap.set(fetch2, promise);
  return promise;
}
var createForm = async (body, fetch2, stripFilenames = true) => {
  if (!await supportsFormData(fetch2)) {
    throw new TypeError("The provided fetch function does not support file uploads with the current global FormData class.");
  }
  const form = new FormData();
  await Promise.all(Object.entries(body || {}).map(([key, value]) => addFormValue(form, key, value, stripFilenames)));
  return form;
};
var isNamedBlob = (value) => value instanceof Blob && "name" in value;
var addFormValue = async (form, key, value, stripFilenames) => {
  if (value === void 0)
    return;
  if (value == null) {
    throw new TypeError(`Received null for "${key}"; to pass null in FormData, you must use the string 'null'`);
  }
  if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
    form.append(key, String(value));
  } else if (value instanceof Response) {
    let options = {};
    const contentType = value.headers.get("Content-Type");
    if (contentType) {
      options = { type: contentType };
    }
    form.append(key, makeFile([await value.blob()], getName(value, stripFilenames), options));
  } else if (isAsyncIterable(value)) {
    form.append(key, makeFile([await new Response(ReadableStreamFrom(value)).blob()], getName(value, stripFilenames)));
  } else if (isNamedBlob(value)) {
    form.append(key, makeFile([value], getName(value, stripFilenames), { type: value.type }));
  } else if (Array.isArray(value)) {
    await Promise.all(value.map((entry) => addFormValue(form, key + "[]", entry, stripFilenames)));
  } else if (typeof value === "object") {
    await Promise.all(Object.entries(value).map(([name, prop]) => addFormValue(form, `${key}[${name}]`, prop, stripFilenames)));
  } else {
    throw new TypeError(`Invalid value given to form, expected a string, number, boolean, object, Array, File or Blob but got ${value} instead`);
  }
};

// node_modules/@anthropic-ai/sdk/internal/to-file.mjs
var isBlobLike = (value) => value != null && typeof value === "object" && typeof value.size === "number" && typeof value.type === "string" && typeof value.text === "function" && typeof value.slice === "function" && typeof value.arrayBuffer === "function";
var isFileLike = (value) => value != null && typeof value === "object" && typeof value.name === "string" && typeof value.lastModified === "number" && isBlobLike(value);
var isResponseLike = (value) => value != null && typeof value === "object" && typeof value.url === "string" && typeof value.blob === "function";
async function toFile(value, name, options) {
  checkFileSupport();
  value = await value;
  name || (name = getName(value, true));
  if (isFileLike(value)) {
    if (value instanceof File && name == null && options == null) {
      return value;
    }
    return makeFile([await value.arrayBuffer()], name ?? value.name, {
      type: value.type,
      lastModified: value.lastModified,
      ...options
    });
  }
  if (isResponseLike(value)) {
    const blob = await value.blob();
    name || (name = new URL(value.url).pathname.split(/[\\/]/).pop());
    return makeFile(await getBytes(blob), name, options);
  }
  const parts2 = await getBytes(value);
  if (!options?.type) {
    const type = parts2.find((part) => typeof part === "object" && "type" in part && part.type);
    if (typeof type === "string") {
      options = { ...options, type };
    }
  }
  return makeFile(parts2, name, options);
}
async function getBytes(value) {
  let parts2 = [];
  if (typeof value === "string" || ArrayBuffer.isView(value) || // includes Uint8Array, Buffer, etc.
  value instanceof ArrayBuffer) {
    parts2.push(value);
  } else if (isBlobLike(value)) {
    parts2.push(value instanceof Blob ? value : await value.arrayBuffer());
  } else if (isAsyncIterable(value)) {
    for await (const chunk of value) {
      parts2.push(...await getBytes(chunk));
    }
  } else {
    const constructor = value?.constructor?.name;
    throw new Error(`Unexpected data type: ${typeof value}${constructor ? `; constructor: ${constructor}` : ""}${propsForError(value)}`);
  }
  return parts2;
}
function propsForError(value) {
  if (typeof value !== "object" || value === null)
    return "";
  const props = Object.getOwnPropertyNames(value);
  return `; props: [${props.map((p) => `"${p}"`).join(", ")}]`;
}

// node_modules/@anthropic-ai/sdk/core/resource.mjs
var APIResource = class {
  constructor(client) {
    this._client = client;
  }
};

// node_modules/@anthropic-ai/sdk/internal/headers.mjs
var brand_privateNullableHeaders = Symbol.for("brand.privateNullableHeaders");
function* iterateHeaders(headers) {
  if (!headers)
    return;
  if (brand_privateNullableHeaders in headers) {
    const { values, nulls } = headers;
    yield* values.entries();
    for (const name of nulls) {
      yield [name, null];
    }
    return;
  }
  let shouldClear = false;
  let iter;
  if (headers instanceof Headers) {
    iter = headers.entries();
  } else if (isReadonlyArray(headers)) {
    iter = headers;
  } else {
    shouldClear = true;
    iter = Object.entries(headers ?? {});
  }
  for (let row of iter) {
    const name = row[0];
    if (typeof name !== "string")
      throw new TypeError("expected header name to be a string");
    const values = isReadonlyArray(row[1]) ? row[1] : [row[1]];
    let didClear = false;
    for (const value of values) {
      if (value === void 0)
        continue;
      if (shouldClear && !didClear) {
        didClear = true;
        yield [name, clearSentinel];
      }
      yield [name, value];
    }
  }
}
var clearSentinel = Symbol("clear");
var APPEND_HEADERS = /* @__PURE__ */ new Set(["x-stainless-helper"]);
var appendHeaderValue = (existing, addition) => {
  const tokens = existing ? existing.split(",").map((t) => t.trim()).filter(Boolean) : [];
  for (const tok of addition.split(",").map((t) => t.trim())) {
    if (tok && !tokens.includes(tok))
      tokens.push(tok);
  }
  return tokens.join(", ");
};
var buildHeaders = (newHeaders) => {
  const targetHeaders = new Headers();
  const nullHeaders = /* @__PURE__ */ new Set();
  for (const headers of newHeaders) {
    const seenHeaders = /* @__PURE__ */ new Set();
    for (const [name, value] of iterateHeaders(headers)) {
      const lowerName = name.toLowerCase();
      if (APPEND_HEADERS.has(lowerName)) {
        if (value === clearSentinel)
          continue;
        if (value === null) {
          targetHeaders.delete(name);
          nullHeaders.add(lowerName);
        } else {
          targetHeaders.set(name, appendHeaderValue(targetHeaders.get(name), value));
          nullHeaders.delete(lowerName);
        }
        continue;
      }
      if (value === clearSentinel || !seenHeaders.has(lowerName)) {
        targetHeaders.delete(name);
        seenHeaders.add(lowerName);
        if (value === clearSentinel)
          continue;
      }
      if (value === null) {
        targetHeaders.delete(name);
        nullHeaders.add(lowerName);
      } else {
        targetHeaders.append(name, value);
        nullHeaders.delete(lowerName);
      }
    }
  }
  return { [brand_privateNullableHeaders]: true, values: targetHeaders, nulls: nullHeaders };
};

// node_modules/@anthropic-ai/sdk/internal/utils/path.mjs
init_error();
function encodeURIPath(str) {
  return str.replace(/[^A-Za-z0-9\-._~!$&'()*+,;=:@]+/g, encodeURIComponent);
}
var EMPTY = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.create(null));
var createPathTagFunction = (pathEncoder = encodeURIPath) => function path2(statics, ...params) {
  if (statics.length === 1)
    return statics[0];
  let postPath = false;
  const invalidSegments = [];
  const path3 = statics.reduce((previousValue, currentValue, index) => {
    if (/[?#]/.test(currentValue)) {
      postPath = true;
    }
    const value = params[index];
    let encoded = (postPath ? encodeURIComponent : pathEncoder)("" + value);
    if (index !== params.length && (value == null || typeof value === "object" && // handle values from other realms
    value.toString === Object.getPrototypeOf(Object.getPrototypeOf(value.hasOwnProperty ?? EMPTY) ?? EMPTY)?.toString)) {
      encoded = value + "";
      invalidSegments.push({
        start: previousValue.length + currentValue.length,
        length: encoded.length,
        error: `Value of type ${Object.prototype.toString.call(value).slice(8, -1)} is not a valid path parameter`
      });
    }
    return previousValue + currentValue + (index === params.length ? "" : encoded);
  }, "");
  const pathOnly = path3.split(/[?#]/, 1)[0];
  const invalidSegmentPattern = new RegExp("(?<=^|\\/)(?:\\.|%2e){1,2}(?=\\/|$)", "gi");
  let match;
  while ((match = invalidSegmentPattern.exec(pathOnly)) !== null) {
    invalidSegments.push({
      start: match.index,
      length: match[0].length,
      error: `Value "${match[0]}" can't be safely passed as a path parameter`
    });
  }
  invalidSegments.sort((a, b) => a.start - b.start);
  if (invalidSegments.length > 0) {
    let lastEnd = 0;
    const underline = invalidSegments.reduce((acc, segment) => {
      const spaces = " ".repeat(segment.start - lastEnd);
      const arrows = "^".repeat(segment.length);
      lastEnd = segment.start + segment.length;
      return acc + spaces + arrows;
    }, "");
    throw new AnthropicError(`Path parameters result in path with invalid segments:
${invalidSegments.map((e) => e.error).join("\n")}
${path3}
${underline}`);
  }
  return path3;
};
var path = /* @__PURE__ */ createPathTagFunction(encodeURIPath);

// node_modules/@anthropic-ai/sdk/resources/beta/deployment-runs.mjs
var DeploymentRuns = class extends APIResource {
  /**
   * Get Deployment Run
   *
   * @example
   * ```ts
   * const betaManagedAgentsDeploymentRun =
   *   await client.beta.deploymentRuns.retrieve(
   *     'deployment_run_id',
   *   );
   * ```
   */
  retrieve(deploymentRunID, params = {}, options) {
    const { betas } = params ?? {};
    return this._client.get(path`/v1/deployment_runs/${deploymentRunID}?beta=true`, {
      ...options,
      headers: buildHeaders([
        { "anthropic-beta": [...betas ?? [], "managed-agents-2026-04-01"].toString() },
        options?.headers
      ])
    });
  }
  /**
   * List Deployment Runs
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const betaManagedAgentsDeploymentRun of client.beta.deploymentRuns.list()) {
   *   // ...
   * }
   * ```
   */
  list(params = {}, options) {
    const { betas, ...query } = params ?? {};
    return this._client.getAPIList("/v1/deployment_runs?beta=true", PageCursor, {
      query,
      ...options,
      headers: buildHeaders([
        { "anthropic-beta": [...betas ?? [], "managed-agents-2026-04-01"].toString() },
        options?.headers
      ])
    });
  }
};

// node_modules/@anthropic-ai/sdk/resources/beta/deployments.mjs
var Deployments = class extends APIResource {
  /**
   * Create Deployment
   *
   * @example
   * ```ts
   * const betaManagedAgentsDeployment =
   *   await client.beta.deployments.create({
   *     agent: 'string',
   *     environment_id: 'x',
   *     initial_events: [
   *       {
   *         content: [
   *           {
   *             text: 'Where is my order #1234?',
   *             type: 'text',
   *           },
   *         ],
   *         type: 'user.message',
   *       },
   *     ],
   *     name: 'x',
   *   });
   * ```
   */
  create(params, options) {
    const { betas, ...body } = params;
    return this._client.post("/v1/deployments?beta=true", {
      body,
      ...options,
      headers: buildHeaders([
        { "anthropic-beta": [...betas ?? [], "managed-agents-2026-04-01"].toString() },
        options?.headers
      ])
    });
  }
  /**
   * Get Deployment
   *
   * @example
   * ```ts
   * const betaManagedAgentsDeployment =
   *   await client.beta.deployments.retrieve(
   *     'depl_011CZkZcDH3vPqd7xnEfwTai',
   *   );
   * ```
   */
  retrieve(deploymentID, params = {}, options) {
    const { betas } = params ?? {};
    return this._client.get(path`/v1/deployments/${deploymentID}?beta=true`, {
      ...options,
      headers: buildHeaders([
        { "anthropic-beta": [...betas ?? [], "managed-agents-2026-04-01"].toString() },
        options?.headers
      ])
    });
  }
  /**
   * Update Deployment
   *
   * @example
   * ```ts
   * const betaManagedAgentsDeployment =
   *   await client.beta.deployments.update(
   *     'depl_011CZkZcDH3vPqd7xnEfwTai',
   *   );
   * ```
   */
  update(deploymentID, params, options) {
    const { betas, ...body } = params;
    return this._client.post(path`/v1/deployments/${deploymentID}?beta=true`, {
      body,
      ...options,
      headers: buildHeaders([
        { "anthropic-beta": [...betas ?? [], "managed-agents-2026-04-01"].toString() },
        options?.headers
      ])
    });
  }
  /**
   * List Deployments
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const betaManagedAgentsDeployment of client.beta.deployments.list()) {
   *   // ...
   * }
   * ```
   */
  list(params = {}, options) {
    const { betas, ...query } = params ?? {};
    return this._client.getAPIList("/v1/deployments?beta=true", PageCursor, {
      query,
      ...options,
      headers: buildHeaders([
        { "anthropic-beta": [...betas ?? [], "managed-agents-2026-04-01"].toString() },
        options?.headers
      ])
    });
  }
  /**
   * Archive Deployment
   *
   * @example
   * ```ts
   * const betaManagedAgentsDeployment =
   *   await client.beta.deployments.archive(
   *     'depl_011CZkZcDH3vPqd7xnEfwTai',
   *   );
   * ```
   */
  archive(deploymentID, params = {}, options) {
    const { betas } = params ?? {};
    return this._client.post(path`/v1/deployments/${deploymentID}/archive?beta=true`, {
      ...options,
      headers: buildHeaders([
        { "anthropic-beta": [...betas ?? [], "managed-agents-2026-04-01"].toString() },
        options?.headers
      ])
    });
  }
  /**
   * Pause Deployment
   *
   * @example
   * ```ts
   * const betaManagedAgentsDeployment =
   *   await client.beta.deployments.pause(
   *     'depl_011CZkZcDH3vPqd7xnEfwTai',
   *   );
   * ```
   */
  pause(deploymentID, params = {}, options) {
    const { betas } = params ?? {};
    return this._client.post(path`/v1/deployments/${deploymentID}/pause?beta=true`, {
      ...options,
      headers: buildHeaders([
        { "anthropic-beta": [...betas ?? [], "managed-agents-2026-04-01"].toString() },
        options?.headers
      ])
    });
  }
  /**
   * Run Deployment Now
   *
   * @example
   * ```ts
   * const betaManagedAgentsDeploymentRun =
   *   await client.beta.deployments.run(
   *     'depl_011CZkZcDH3vPqd7xnEfwTai',
   *   );
   * ```
   */
  run(deploymentID, params = {}, options) {
    const { betas } = params ?? {};
    return this._client.post(path`/v1/deployments/${deploymentID}/run?beta=true`, {
      ...options,
      headers: buildHeaders([
        { "anthropic-beta": [...betas ?? [], "managed-agents-2026-04-01"].toString() },
        options?.headers
      ])
    });
  }
  /**
   * Unpause Deployment
   *
   * @example
   * ```ts
   * const betaManagedAgentsDeployment =
   *   await client.beta.deployments.unpause(
   *     'depl_011CZkZcDH3vPqd7xnEfwTai',
   *   );
   * ```
   */
  unpause(deploymentID, params = {}, options) {
    const { betas } = params ?? {};
    return this._client.post(path`/v1/deployments/${deploymentID}/unpause?beta=true`, {
      ...options,
      headers: buildHeaders([
        { "anthropic-beta": [...betas ?? [], "managed-agents-2026-04-01"].toString() },
        options?.headers
      ])
    });
  }
};

// node_modules/@anthropic-ai/sdk/internal/stainless-helper-header.mjs
var STAINLESS_HELPER_HEADER = "x-stainless-helper";
var STAINLESS_HELPER_METHOD_HEADER = "x-stainless-helper-method";
function helperHeader(value) {
  return { [STAINLESS_HELPER_HEADER]: value };
}
var SDK_HELPER_SYMBOL = Symbol("anthropic.sdk.stainlessHelper");
function wasCreatedByStainlessHelper(value) {
  return typeof value === "object" && value !== null && SDK_HELPER_SYMBOL in value;
}
function collectStainlessHelpers(tools, messages) {
  const helpers = /* @__PURE__ */ new Set();
  if (tools) {
    for (const tool of tools) {
      if (wasCreatedByStainlessHelper(tool)) {
        helpers.add(tool[SDK_HELPER_SYMBOL]);
      }
    }
  }
  if (messages) {
    for (const message of messages) {
      if (wasCreatedByStainlessHelper(message)) {
        helpers.add(message[SDK_HELPER_SYMBOL]);
      }
      const content = message.content;
      if (Array.isArray(content)) {
        for (const block of content) {
          if (wasCreatedByStainlessHelper(block)) {
            helpers.add(block[SDK_HELPER_SYMBOL]);
          }
        }
      }
    }
  }
  return Array.from(helpers);
}
function stainlessHelperHeader(tools, messages) {
  const helpers = collectStainlessHelpers(tools, messages);
  if (helpers.length === 0)
    return {};
  return { [STAINLESS_HELPER_HEADER]: helpers.join(", ") };
}
function stainlessHelperHeaderFromFile(file) {
  if (wasCreatedByStainlessHelper(file)) {
    return { [STAINLESS_HELPER_HEADER]: file[SDK_HELPER_SYMBOL] };
  }
  return {};
}

// node_modules/@anthropic-ai/sdk/resources/beta/files.mjs
var Files = class extends APIResource {
  /**
   * List Files
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const fileMetadata of client.beta.files.list()) {
   *   // ...
   * }
   * ```
   */
  list(params = {}, options) {
    const { betas, ...query } = params ?? {};
    return this._client.getAPIList("/v1/files?beta=true", Page, {
      query,
      ...options,
      headers: buildHeaders([
        { "anthropic-beta": [...betas ?? [], "files-api-2025-04-14"].toString() },
        options?.headers
      ])
    });
  }
  /**
   * Delete File
   *
   * @example
   * ```ts
   * const deletedFile = await client.beta.files.delete(
   *   'file_id',
   * );
   * ```
   */
  delete(fileID, params = {}, options) {
    const { betas } = params ?? {};
    return this._client.delete(path`/v1/files/${fileID}?beta=true`, {
      ...options,
      headers: buildHeaders([
        { "anthropic-beta": [...betas ?? [], "files-api-2025-04-14"].toString() },
        options?.headers
      ])
    });
  }
  /**
   * Download File
   *
   * @example
   * ```ts
   * const response = await client.beta.files.download(
   *   'file_id',
   * );
   *
   * const content = await response.blob();
   * console.log(content);
   * ```
   */
  download(fileID, params = {}, options) {
    const { betas } = params ?? {};
    return this._client.get(path`/v1/files/${fileID}/content?beta=true`, {
      ...options,
      headers: buildHeaders([
        {
          "anthropic-beta": [...betas ?? [], "files-api-2025-04-14"].toString(),
          Accept: "application/binary"
        },
        options?.headers
      ]),
      __binaryResponse: true
    });
  }
  /**
   * Get File Metadata
   *
   * @example
   * ```ts
   * const fileMetadata =
   *   await client.beta.files.retrieveMetadata('file_id');
   * ```
   */
  retrieveMetadata(fileID, params = {}, options) {
    const { betas } = params ?? {};
    return this._client.get(path`/v1/files/${fileID}?beta=true`, {
      ...options,
      headers: buildHeaders([
        { "anthropic-beta": [...betas ?? [], "files-api-2025-04-14"].toString() },
        options?.headers
      ])
    });
  }
  /**
   * Upload File
   *
   * @example
   * ```ts
   * const fileMetadata = await client.beta.files.upload({
   *   file: fs.createReadStream('path/to/file'),
   * });
   * ```
   */
  upload(params, options) {
    const { betas, ...body } = params;
    return this._client.post("/v1/files?beta=true", multipartFormRequestOptions({
      body,
      ...options,
      headers: buildHeaders([
        { "anthropic-beta": [...betas ?? [], "files-api-2025-04-14"].toString() },
        stainlessHelperHeaderFromFile(body.file),
        options?.headers
      ])
    }, this._client));
  }
};

// node_modules/@anthropic-ai/sdk/resources/beta/models.mjs
var Models = class extends APIResource {
  /**
   * Get a specific model.
   *
   * The Models API response can be used to determine information about a specific
   * model or resolve a model alias to a model ID.
   *
   * @example
   * ```ts
   * const betaModelInfo = await client.beta.models.retrieve(
   *   'model_id',
   * );
   * ```
   */
  retrieve(modelID, params = {}, options) {
    const { betas } = params ?? {};
    return this._client.get(path`/v1/models/${modelID}?beta=true`, {
      ...options,
      headers: buildHeaders([
        { ...betas?.toString() != null ? { "anthropic-beta": betas?.toString() } : void 0 },
        options?.headers
      ])
    });
  }
  /**
   * List available models.
   *
   * The Models API response can be used to determine which models are available for
   * use in the API. More recently released models are listed first.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const betaModelInfo of client.beta.models.list()) {
   *   // ...
   * }
   * ```
   */
  list(params = {}, options) {
    const { betas, ...query } = params ?? {};
    return this._client.getAPIList("/v1/models?beta=true", Page, {
      query,
      ...options,
      headers: buildHeaders([
        { ...betas?.toString() != null ? { "anthropic-beta": betas?.toString() } : void 0 },
        options?.headers
      ])
    });
  }
};

// node_modules/@anthropic-ai/sdk/resources/beta/user-profiles.mjs
var UserProfiles = class extends APIResource {
  /**
   * Create User Profile
   *
   * @example
   * ```ts
   * const betaUserProfile =
   *   await client.beta.userProfiles.create();
   * ```
   */
  create(params, options) {
    const { betas, ...body } = params;
    return this._client.post("/v1/user_profiles?beta=true", {
      body,
      ...options,
      headers: buildHeaders([
        { "anthropic-beta": [...betas ?? [], "user-profiles-2026-03-24"].toString() },
        options?.headers
      ])
    });
  }
  /**
   * Get User Profile
   *
   * @example
   * ```ts
   * const betaUserProfile =
   *   await client.beta.userProfiles.retrieve(
   *     'uprof_011CZkZCu8hGbp5mYRQgUmz9',
   *   );
   * ```
   */
  retrieve(userProfileID, params = {}, options) {
    const { betas } = params ?? {};
    return this._client.get(path`/v1/user_profiles/${userProfileID}?beta=true`, {
      ...options,
      headers: buildHeaders([
        { "anthropic-beta": [...betas ?? [], "user-profiles-2026-03-24"].toString() },
        options?.headers
      ])
    });
  }
  /**
   * Update User Profile
   *
   * @example
   * ```ts
   * const betaUserProfile =
   *   await client.beta.userProfiles.update(
   *     'uprof_011CZkZCu8hGbp5mYRQgUmz9',
   *   );
   * ```
   */
  update(userProfileID, params, options) {
    const { betas, ...body } = params;
    return this._client.post(path`/v1/user_profiles/${userProfileID}?beta=true`, {
      body,
      ...options,
      headers: buildHeaders([
        { "anthropic-beta": [...betas ?? [], "user-profiles-2026-03-24"].toString() },
        options?.headers
      ])
    });
  }
  /**
   * List User Profiles
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const betaUserProfile of client.beta.userProfiles.list()) {
   *   // ...
   * }
   * ```
   */
  list(params = {}, options) {
    const { betas, ...query } = params ?? {};
    return this._client.getAPIList("/v1/user_profiles?beta=true", PageCursor, {
      query,
      ...options,
      headers: buildHeaders([
        { "anthropic-beta": [...betas ?? [], "user-profiles-2026-03-24"].toString() },
        options?.headers
      ])
    });
  }
  /**
   * Create Enrollment URL
   *
   * @example
   * ```ts
   * const betaUserProfileEnrollmentURL =
   *   await client.beta.userProfiles.createEnrollmentURL(
   *     'uprof_011CZkZCu8hGbp5mYRQgUmz9',
   *   );
   * ```
   */
  createEnrollmentURL(userProfileID, params = {}, options) {
    const { betas } = params ?? {};
    return this._client.post(path`/v1/user_profiles/${userProfileID}/enrollment_url?beta=true`, {
      ...options,
      headers: buildHeaders([
        { "anthropic-beta": [...betas ?? [], "user-profiles-2026-03-24"].toString() },
        options?.headers
      ])
    });
  }
};

// node_modules/@anthropic-ai/sdk/resources/beta/webhooks.mjs
var import_standardwebhooks = __toESM(require_dist(), 1);
var Webhooks = class extends APIResource {
  unwrap(body, { headers, key }) {
    if (headers !== void 0) {
      const keyStr = key === void 0 ? this._client.webhookKey : key;
      if (keyStr === null)
        throw new Error("Webhook key must not be null in order to unwrap");
      const wh = new import_standardwebhooks.Webhook(keyStr);
      wh.verify(body, headers);
    }
    return JSON.parse(body);
  }
};

// node_modules/@anthropic-ai/sdk/resources/beta/agents/versions.mjs
var Versions = class extends APIResource {
  /**
   * List Agent Versions
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const betaManagedAgentsAgent of client.beta.agents.versions.list(
   *   'agent_011CZkYpogX7uDKUyvBTophP',
   * )) {
   *   // ...
   * }
   * ```
   */
  list(agentID, params = {}, options) {
    const { betas, ...query } = params ?? {};
    return this._client.getAPIList(path`/v1/agents/${agentID}/versions?beta=true`, PageCursor, {
      query,
      ...options,
      headers: buildHeaders([
        { "anthropic-beta": [...betas ?? [], "managed-agents-2026-04-01"].toString() },
        options?.headers
      ])
    });
  }
};

// node_modules/@anthropic-ai/sdk/resources/beta/agents/agents.mjs
var Agents = class extends APIResource {
  constructor() {
    super(...arguments);
    this.versions = new Versions(this._client);
  }
  /**
   * Create Agent
   *
   * @example
   * ```ts
   * const betaManagedAgentsAgent =
   *   await client.beta.agents.create({
   *     model: 'claude-sonnet-4-6',
   *     name: 'My First Agent',
   *   });
   * ```
   */
  create(params, options) {
    const { betas, ...body } = params;
    return this._client.post("/v1/agents?beta=true", {
      body,
      ...options,
      headers: buildHeaders([
        { "anthropic-beta": [...betas ?? [], "managed-agents-2026-04-01"].toString() },
        options?.headers
      ])
    });
  }
  /**
   * Get Agent
   *
   * @example
   * ```ts
   * const betaManagedAgentsAgent =
   *   await client.beta.agents.retrieve(
   *     'agent_011CZkYpogX7uDKUyvBTophP',
   *   );
   * ```
   */
  retrieve(agentID, params = {}, options) {
    const { betas, ...query } = params ?? {};
    return this._client.get(path`/v1/agents/${agentID}?beta=true`, {
      query,
      ...options,
      headers: buildHeaders([
        { "anthropic-beta": [...betas ?? [], "managed-agents-2026-04-01"].toString() },
        options?.headers
      ])
    });
  }
  /**
   * Update Agent
   *
   * @example
   * ```ts
   * const betaManagedAgentsAgent =
   *   await client.beta.agents.update(
   *     'agent_011CZkYpogX7uDKUyvBTophP',
   *     { version: 1 },
   *   );
   * ```
   */
  update(agentID, params, options) {
    const { betas, ...body } = params;
    return this._client.post(path`/v1/agents/${agentID}?beta=true`, {
      body,
      ...options,
      headers: buildHeaders([
        { "anthropic-beta": [...betas ?? [], "managed-agents-2026-04-01"].toString() },
        options?.headers
      ])
    });
  }
  /**
   * List Agents
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const betaManagedAgentsAgent of client.beta.agents.list()) {
   *   // ...
   * }
   * ```
   */
  list(params = {}, options) {
    const { betas, ...query } = params ?? {};
    return this._client.getAPIList("/v1/agents?beta=true", PageCursor, {
      query,
      ...options,
      headers: buildHeaders([
        { "anthropic-beta": [...betas ?? [], "managed-agents-2026-04-01"].toString() },
        options?.headers
      ])
    });
  }
  /**
   * Archive Agent
   *
   * @example
   * ```ts
   * const betaManagedAgentsAgent =
   *   await client.beta.agents.archive(
   *     'agent_011CZkYpogX7uDKUyvBTophP',
   *   );
   * ```
   */
  archive(agentID, params = {}, options) {
    const { betas } = params ?? {};
    return this._client.post(path`/v1/agents/${agentID}/archive?beta=true`, {
      ...options,
      headers: buildHeaders([
        { "anthropic-beta": [...betas ?? [], "managed-agents-2026-04-01"].toString() },
        options?.headers
      ])
    });
  }
};
Agents.Versions = Versions;

// node_modules/@anthropic-ai/sdk/lib/environments/poller.mjs
init_error();

// node_modules/@anthropic-ai/sdk/internal/utils/abort.mjs
function linkAbort(external, controller) {
  if (!external)
    return () => {
    };
  if (external.aborted) {
    controller.abort();
    return () => {
    };
  }
  const onAbort = () => controller.abort();
  external.addEventListener("abort", onAbort);
  return () => external.removeEventListener("abort", onAbort);
}

// node_modules/@anthropic-ai/sdk/internal/utils/backoff.mjs
init_error();
function isStatus(e, code) {
  return e instanceof APIError && e.status === code;
}
function is4xx(e) {
  return e instanceof APIError && typeof e.status === "number" && e.status >= 400 && e.status < 500;
}
function isFatal4xx(e) {
  return is4xx(e) && !isStatus(e, 408) && !isStatus(e, 409) && !isStatus(e, 429);
}
function backoff(attempt, baseMs, capMs) {
  return Math.min(baseMs * 2 ** attempt, capMs);
}
function jitter(lowMs, highMs) {
  return lowMs + Math.random() * (highMs - lowMs);
}
function applyJitter(ms) {
  return ms * (1 - Math.random() * 0.25);
}

// node_modules/@anthropic-ai/sdk/lib/helper-client.mjs
init_error();
function copyClientForHelper(client, { authToken, helper }) {
  if (!authToken) {
    throw new AnthropicError(`copyClientForHelper: expected a non-empty authToken but received ${JSON.stringify(authToken)}`);
  }
  const internal = client;
  const parentDefaults = internal._options.defaultHeaders;
  const parentAuthExtraHeaders = internal._authState?.extraHeaders;
  const inheritedAuthExtraHeaders = parentAuthExtraHeaders ? Object.fromEntries(Object.entries(parentAuthExtraHeaders).filter(([name]) => {
    const lower = name.toLowerCase();
    return lower !== "authorization" && lower !== "x-api-key";
  })) : void 0;
  const defaultHeaders = buildHeaders([
    inheritedAuthExtraHeaders,
    parentDefaults,
    { [STAINLESS_HELPER_HEADER]: helper }
  ]);
  return client.withOptions({
    apiKey: null,
    authToken,
    baseURL: client.baseURL,
    credentials: void 0,
    defaultHeaders
  });
}

// node_modules/@anthropic-ai/sdk/lib/environments/poller.mjs
var _WorkPoller_runnerClient;
var _WorkPoller_consumed;
var _WorkPoller_controller;
var _WorkPoller_detachExternal;
var _WorkPoller_autoStop;
var _WorkPoller_drain;
var _WorkPoller_blockMs;
var _WorkPoller_reclaimOlderThanMs;
var _WorkPoller_requestOpts;
var POLL_BLOCK_MS = 999;
var POLL_BACKOFF_BASE_MS = 1e3;
var POLL_BACKOFF_CAP_MS = 6e4;
var WorkPoller = class {
  constructor(opts) {
    _WorkPoller_runnerClient.set(this, void 0);
    _WorkPoller_consumed.set(this, false);
    _WorkPoller_controller.set(this, void 0);
    _WorkPoller_detachExternal.set(this, void 0);
    _WorkPoller_autoStop.set(this, void 0);
    _WorkPoller_drain.set(this, void 0);
    _WorkPoller_blockMs.set(this, void 0);
    _WorkPoller_reclaimOlderThanMs.set(this, void 0);
    _WorkPoller_requestOpts.set(this, void 0);
    this.client = opts.client;
    this.environmentId = opts.environmentId;
    this.environmentKey = opts.environmentKey;
    this.workerId = opts.workerId ?? defaultWorkerId();
    __classPrivateFieldSet(this, _WorkPoller_runnerClient, copyClientForHelper(opts.client, {
      authToken: opts.environmentKey,
      helper: "environments-work-poller"
    }), "f");
    __classPrivateFieldSet(this, _WorkPoller_autoStop, opts.autoStop ?? true, "f");
    __classPrivateFieldSet(this, _WorkPoller_drain, opts.drain ?? false, "f");
    __classPrivateFieldSet(this, _WorkPoller_blockMs, opts.blockMs === void 0 ? POLL_BLOCK_MS : opts.blockMs, "f");
    __classPrivateFieldSet(this, _WorkPoller_reclaimOlderThanMs, opts.reclaimOlderThanMs ?? null, "f");
    __classPrivateFieldSet(this, _WorkPoller_requestOpts, opts.requestOptions, "f");
    __classPrivateFieldSet(this, _WorkPoller_controller, new AbortController(), "f");
    __classPrivateFieldSet(this, _WorkPoller_detachExternal, linkAbort(opts.signal, __classPrivateFieldGet(this, _WorkPoller_controller, "f")), "f");
  }
  /** Read-only view of this iterator's abort signal. */
  get signal() {
    return __classPrivateFieldGet(this, _WorkPoller_controller, "f").signal;
  }
  /** Abort the iterator. The current `for await` will exit cleanly. */
  abort() {
    __classPrivateFieldGet(this, _WorkPoller_controller, "f").abort();
  }
  async *[(_WorkPoller_runnerClient = /* @__PURE__ */ new WeakMap(), _WorkPoller_consumed = /* @__PURE__ */ new WeakMap(), _WorkPoller_controller = /* @__PURE__ */ new WeakMap(), _WorkPoller_detachExternal = /* @__PURE__ */ new WeakMap(), _WorkPoller_autoStop = /* @__PURE__ */ new WeakMap(), _WorkPoller_drain = /* @__PURE__ */ new WeakMap(), _WorkPoller_blockMs = /* @__PURE__ */ new WeakMap(), _WorkPoller_reclaimOlderThanMs = /* @__PURE__ */ new WeakMap(), _WorkPoller_requestOpts = /* @__PURE__ */ new WeakMap(), Symbol.asyncIterator)]() {
    if (__classPrivateFieldGet(this, _WorkPoller_consumed, "f")) {
      throw new AnthropicError("Cannot iterate over a consumed WorkPoller");
    }
    __classPrivateFieldSet(this, _WorkPoller_consumed, true, "f");
    const log = loggerFor(this.client);
    log.info("poller starting", {
      component: "work-poller",
      environment_id: this.environmentId
    });
    try {
      let attempt = 0;
      while (!__classPrivateFieldGet(this, _WorkPoller_controller, "f").signal.aborted) {
        let work;
        try {
          work = await __classPrivateFieldGet(this, _WorkPoller_runnerClient, "f").beta.environments.work.poll(this.environmentId, {
            "Anthropic-Worker-ID": this.workerId,
            ...__classPrivateFieldGet(this, _WorkPoller_blockMs, "f") !== null ? { block_ms: __classPrivateFieldGet(this, _WorkPoller_blockMs, "f") } : {},
            ...__classPrivateFieldGet(this, _WorkPoller_reclaimOlderThanMs, "f") !== null ? { reclaim_older_than_ms: __classPrivateFieldGet(this, _WorkPoller_reclaimOlderThanMs, "f") } : {}
          }, { headers: buildHeaders([__classPrivateFieldGet(this, _WorkPoller_requestOpts, "f")?.headers]), signal: __classPrivateFieldGet(this, _WorkPoller_controller, "f").signal });
        } catch (e) {
          if (__classPrivateFieldGet(this, _WorkPoller_controller, "f").signal.aborted)
            return;
          if (isFatal4xx(e)) {
            log.error("poll failed permanently, stopping poller", { error: String(e) });
            throw e;
          }
          const wait = applyJitter(backoff2(attempt));
          log.warn("poll failed, backing off", { error: String(e), backoff_ms: wait });
          attempt++;
          await sleep(wait, __classPrivateFieldGet(this, _WorkPoller_controller, "f").signal);
          continue;
        }
        attempt = 0;
        if (work == null) {
          if (__classPrivateFieldGet(this, _WorkPoller_drain, "f"))
            return;
          await sleep(jitter(1e3, 3e3), __classPrivateFieldGet(this, _WorkPoller_controller, "f").signal);
          continue;
        }
        log.info("claimed work", {
          component: "work-poller",
          environment_id: this.environmentId,
          work_id: work.id,
          work_type: work.data.type
        });
        try {
          await __classPrivateFieldGet(this, _WorkPoller_runnerClient, "f").beta.environments.work.ack(work.id, { environment_id: work.environment_id }, { headers: buildHeaders([__classPrivateFieldGet(this, _WorkPoller_requestOpts, "f")?.headers]), signal: __classPrivateFieldGet(this, _WorkPoller_controller, "f").signal });
        } catch (e) {
          log.error("ack failed", { work_id: work.id, error: String(e) });
          continue;
        }
        try {
          yield work;
        } finally {
          if (__classPrivateFieldGet(this, _WorkPoller_autoStop, "f")) {
            try {
              await __classPrivateFieldGet(this, _WorkPoller_runnerClient, "f").beta.environments.work.stop(work.id, { environment_id: work.environment_id }, { headers: buildHeaders([__classPrivateFieldGet(this, _WorkPoller_requestOpts, "f")?.headers]) });
            } catch (e) {
              if (!isStatus(e, 409))
                log.warn("stop failed", { work_id: work.id, error: String(e) });
            }
          }
        }
      }
    } finally {
      __classPrivateFieldGet(this, _WorkPoller_detachExternal, "f").call(this);
    }
  }
};
function backoff2(attempt) {
  return backoff(attempt, POLL_BACKOFF_BASE_MS, POLL_BACKOFF_CAP_MS);
}
function defaultWorkerId() {
  const env = globalThis.process?.env;
  const host = env?.["HOSTNAME"];
  return host ? `${host}-${uuid4()}` : uuid4();
}

// node_modules/@anthropic-ai/sdk/lib/environments/worker.mjs
init_error();

// node_modules/@anthropic-ai/sdk/lib/tools/SessionToolRunner.mjs
init_error();

// node_modules/@anthropic-ai/sdk/internal/utils/async-queue.mjs
var _AsyncQueue_items;
var _AsyncQueue_waiters;
var _AsyncQueue_closed;
var AsyncQueue = class {
  constructor() {
    _AsyncQueue_items.set(this, []);
    _AsyncQueue_waiters.set(this, []);
    _AsyncQueue_closed.set(this, false);
  }
  /** Enqueue an item, or hand it directly to a waiting reader. Returns `false` once closed. */
  push(item) {
    if (__classPrivateFieldGet(this, _AsyncQueue_closed, "f"))
      return false;
    const w = __classPrivateFieldGet(this, _AsyncQueue_waiters, "f").shift();
    if (w)
      w({ done: false, value: item });
    else
      __classPrivateFieldGet(this, _AsyncQueue_items, "f").push(item);
    return true;
  }
  /** Mark the queue done. Idempotent; wakes every pending reader with `done: true`. */
  close() {
    if (__classPrivateFieldGet(this, _AsyncQueue_closed, "f"))
      return;
    __classPrivateFieldSet(this, _AsyncQueue_closed, true, "f");
    while (__classPrivateFieldGet(this, _AsyncQueue_waiters, "f").length > 0) {
      const w = __classPrivateFieldGet(this, _AsyncQueue_waiters, "f").shift();
      w({ done: true, value: void 0 });
    }
  }
  /**
   * Resolve with the next item, or `done: true` once the queue is closed and
   * drained. When `signal` is supplied, aborting it resolves a pending read
   * with `done: true` (cancellation is pushed down here rather than handled by
   * an outer `Promise.race`).
   */
  next(signal) {
    if (__classPrivateFieldGet(this, _AsyncQueue_items, "f").length > 0) {
      return Promise.resolve({ done: false, value: __classPrivateFieldGet(this, _AsyncQueue_items, "f").shift() });
    }
    if (__classPrivateFieldGet(this, _AsyncQueue_closed, "f") || signal?.aborted) {
      return Promise.resolve({ done: true, value: void 0 });
    }
    return new Promise((resolve) => {
      const waiter = (r) => {
        signal?.removeEventListener("abort", onAbort);
        resolve(r);
      };
      const onAbort = () => {
        const idx = __classPrivateFieldGet(this, _AsyncQueue_waiters, "f").indexOf(waiter);
        if (idx >= 0)
          __classPrivateFieldGet(this, _AsyncQueue_waiters, "f").splice(idx, 1);
        resolve({ done: true, value: void 0 });
      };
      __classPrivateFieldGet(this, _AsyncQueue_waiters, "f").push(waiter);
      signal?.addEventListener("abort", onAbort, { once: true });
    });
  }
  /** Synchronously remove and return the next buffered item, or `undefined` if empty. */
  tryShift() {
    return __classPrivateFieldGet(this, _AsyncQueue_items, "f").shift();
  }
};
_AsyncQueue_items = /* @__PURE__ */ new WeakMap(), _AsyncQueue_waiters = /* @__PURE__ */ new WeakMap(), _AsyncQueue_closed = /* @__PURE__ */ new WeakMap();

// node_modules/@anthropic-ai/sdk/lib/tools/ToolError.mjs
var ToolError = class extends Error {
  constructor(content) {
    const message = typeof content === "string" ? content : content.map((block) => {
      if (block.type === "text")
        return block.text;
      return `[${block.type}]`;
    }).join(" ");
    super(message);
    this.name = "ToolError";
    this.content = content;
  }
};

// node_modules/@anthropic-ai/sdk/lib/tools/BetaRunnableTool.mjs
function toolName(tool) {
  return "name" in tool ? tool.name : tool.mcp_server_name;
}
function toolErrorContent(e) {
  return e instanceof ToolError ? e.content : `Error: ${e instanceof Error ? e.message : String(e)}`;
}
async function runRunnableTool(tool, rawInput, context) {
  try {
    const input = tool.parse ? tool.parse(rawInput) : rawInput;
    const content = await tool.run(input, context);
    return { content, isError: false };
  } catch (e) {
    return { content: toolErrorContent(e), isError: true };
  }
}

// node_modules/@anthropic-ai/sdk/lib/tools/SessionToolRunner.mjs
var _SessionToolRunner_instances;
var _SessionToolRunner_consumed;
var _SessionToolRunner_controller;
var _SessionToolRunner_detachExternal;
var _SessionToolRunner_requestOpts;
var _SessionToolRunner_toolByName;
var _SessionToolRunner_logger;
var _SessionToolRunner_seen;
var _SessionToolRunner_answered;
var _SessionToolRunner_results;
var _SessionToolRunner_inFlightCount;
var _SessionToolRunner_onIdle;
var _SessionToolRunner_idleTimer;
var _SessionToolRunner_requestOptions;
var _SessionToolRunner_streamLoop;
var _SessionToolRunner_reconcile;
var _SessionToolRunner_ingestHistory;
var _SessionToolRunner_handleStreamEvent;
var _SessionToolRunner_armIdleTimer;
var _SessionToolRunner_disarmIdleTimer;
var _SessionToolRunner_execute;
var _SessionToolRunner_sendResult;
var _SessionToolRunner_drain;
var STREAM_BACKOFF_START_MS = 500;
var STREAM_BACKOFF_CAP_MS = 1e4;
var TOOL_TIMEOUT_MS = 12e4;
var DRAIN_TIMEOUT_MS = 3e4;
var SEND_RETRIES = 3;
var DEFAULT_MAX_IDLE_MS = 6e4;
function isEndTurnIdle(ev) {
  return ev.type === "session.status_idle" && ev.stop_reason?.type === "end_turn";
}
var SessionToolRunner = class {
  constructor(sessionId, opts) {
    _SessionToolRunner_instances.add(this);
    _SessionToolRunner_consumed.set(this, false);
    _SessionToolRunner_controller.set(this, void 0);
    _SessionToolRunner_detachExternal.set(this, void 0);
    _SessionToolRunner_requestOpts.set(this, void 0);
    _SessionToolRunner_toolByName.set(this, void 0);
    _SessionToolRunner_logger.set(this, void 0);
    _SessionToolRunner_seen.set(this, /* @__PURE__ */ new Set());
    _SessionToolRunner_answered.set(this, /* @__PURE__ */ new Set());
    _SessionToolRunner_results.set(this, new AsyncQueue());
    _SessionToolRunner_inFlightCount.set(this, 0);
    _SessionToolRunner_onIdle.set(this, null);
    _SessionToolRunner_idleTimer.set(this, void 0);
    this.client = opts.client;
    this.sessionId = sessionId;
    this.tools = opts.tools;
    this.maxIdleMs = opts.maxIdleMs ?? DEFAULT_MAX_IDLE_MS;
    __classPrivateFieldSet(this, _SessionToolRunner_logger, loggerFor(opts.client), "f");
    __classPrivateFieldSet(this, _SessionToolRunner_toolByName, new Map(opts.tools.map((t) => [toolName(t), t])), "f");
    __classPrivateFieldSet(this, _SessionToolRunner_controller, new AbortController(), "f");
    __classPrivateFieldSet(this, _SessionToolRunner_detachExternal, linkAbort(opts.signal, __classPrivateFieldGet(this, _SessionToolRunner_controller, "f")), "f");
    __classPrivateFieldSet(this, _SessionToolRunner_requestOpts, opts.requestOptions, "f");
  }
  /** Read-only view of this runner's abort signal. */
  get signal() {
    return __classPrivateFieldGet(this, _SessionToolRunner_controller, "f").signal;
  }
  /** Abort the runner. Background tasks will wind down and `for await` will exit cleanly. */
  abort() {
    __classPrivateFieldGet(this, _SessionToolRunner_controller, "f").abort();
  }
  async *[(_SessionToolRunner_consumed = /* @__PURE__ */ new WeakMap(), _SessionToolRunner_controller = /* @__PURE__ */ new WeakMap(), _SessionToolRunner_detachExternal = /* @__PURE__ */ new WeakMap(), _SessionToolRunner_requestOpts = /* @__PURE__ */ new WeakMap(), _SessionToolRunner_toolByName = /* @__PURE__ */ new WeakMap(), _SessionToolRunner_logger = /* @__PURE__ */ new WeakMap(), _SessionToolRunner_seen = /* @__PURE__ */ new WeakMap(), _SessionToolRunner_answered = /* @__PURE__ */ new WeakMap(), _SessionToolRunner_results = /* @__PURE__ */ new WeakMap(), _SessionToolRunner_inFlightCount = /* @__PURE__ */ new WeakMap(), _SessionToolRunner_onIdle = /* @__PURE__ */ new WeakMap(), _SessionToolRunner_idleTimer = /* @__PURE__ */ new WeakMap(), _SessionToolRunner_instances = /* @__PURE__ */ new WeakSet(), Symbol.asyncIterator)]() {
    if (__classPrivateFieldGet(this, _SessionToolRunner_consumed, "f")) {
      throw new AnthropicError("Cannot iterate over a consumed SessionToolRunner");
    }
    __classPrivateFieldSet(this, _SessionToolRunner_consumed, true, "f");
    __classPrivateFieldGet(this, _SessionToolRunner_logger, "f").info("session tool runner starting", {
      component: "session-tool-runner",
      session_id: this.sessionId
    });
    const streamPromise = __classPrivateFieldGet(this, _SessionToolRunner_instances, "m", _SessionToolRunner_streamLoop).call(this).catch((e) => {
      if (!__classPrivateFieldGet(this, _SessionToolRunner_controller, "f").signal.aborted) {
        __classPrivateFieldGet(this, _SessionToolRunner_logger, "f").error("stream loop failed", { error: String(e) });
      }
      __classPrivateFieldGet(this, _SessionToolRunner_controller, "f").abort();
    });
    try {
      while (true) {
        const next = await __classPrivateFieldGet(this, _SessionToolRunner_results, "f").next(__classPrivateFieldGet(this, _SessionToolRunner_controller, "f").signal);
        if (next.done)
          break;
        yield next.value;
      }
      await streamPromise;
      let pending;
      while ((pending = __classPrivateFieldGet(this, _SessionToolRunner_results, "f").tryShift()) !== void 0) {
        yield pending;
      }
    } finally {
      __classPrivateFieldGet(this, _SessionToolRunner_controller, "f").abort();
      __classPrivateFieldGet(this, _SessionToolRunner_instances, "m", _SessionToolRunner_disarmIdleTimer).call(this);
      await streamPromise;
      try {
        await __classPrivateFieldGet(this, _SessionToolRunner_instances, "m", _SessionToolRunner_drain).call(this);
      } catch (e) {
        __classPrivateFieldGet(this, _SessionToolRunner_logger, "f").warn("drain failed", { error: String(e) });
      }
      __classPrivateFieldGet(this, _SessionToolRunner_results, "f").close();
      for (const t of this.tools) {
        try {
          await t.close?.();
        } catch (e) {
          __classPrivateFieldGet(this, _SessionToolRunner_logger, "f").warn("tool.close failed", { tool: toolName(t), error: String(e) });
        }
      }
      __classPrivateFieldGet(this, _SessionToolRunner_detachExternal, "f").call(this);
    }
  }
};
_SessionToolRunner_requestOptions = function _SessionToolRunner_requestOptions2() {
  return {
    ...__classPrivateFieldGet(this, _SessionToolRunner_requestOpts, "f"),
    headers: buildHeaders([helperHeader("session-tool-runner"), __classPrivateFieldGet(this, _SessionToolRunner_requestOpts, "f")?.headers]),
    signal: __classPrivateFieldGet(this, _SessionToolRunner_controller, "f").signal
  };
}, _SessionToolRunner_streamLoop = // ===== event stream =====
async function _SessionToolRunner_streamLoop2() {
  const ctrl = __classPrivateFieldGet(this, _SessionToolRunner_controller, "f");
  let backoff3 = STREAM_BACKOFF_START_MS;
  while (!ctrl.signal.aborted) {
    try {
      const stream = await this.client.beta.sessions.events.stream(this.sessionId, {}, __classPrivateFieldGet(this, _SessionToolRunner_instances, "m", _SessionToolRunner_requestOptions).call(this));
      await __classPrivateFieldGet(this, _SessionToolRunner_instances, "m", _SessionToolRunner_reconcile).call(this);
      for await (const ev of stream) {
        backoff3 = STREAM_BACKOFF_START_MS;
        if (await __classPrivateFieldGet(this, _SessionToolRunner_instances, "m", _SessionToolRunner_handleStreamEvent).call(this, ev))
          return;
      }
    } catch (e) {
      ctrl.signal.throwIfAborted();
      if (isFatal4xx(e)) {
        __classPrivateFieldGet(this, _SessionToolRunner_logger, "f").error("permanent stream failure, shutting down", { error: String(e) });
        ctrl.abort();
        throw e;
      }
      __classPrivateFieldGet(this, _SessionToolRunner_logger, "f").warn("stream disconnected, reconnecting", {
        error: String(e),
        backoff_ms: backoff3
      });
    }
    ctrl.signal.throwIfAborted();
    await sleep(backoff3, ctrl.signal);
    backoff3 = Math.min(backoff3 * 2, STREAM_BACKOFF_CAP_MS);
  }
}, _SessionToolRunner_reconcile = /**
 * Read full history before dispatching so a `tool_use` whose result appears
 * later in the same history is not re-executed. Runs after the live stream is
 * already attached (see {@link SessionToolRunner.#streamLoop}).
 */
async function _SessionToolRunner_reconcile2() {
  const ctrl = __classPrivateFieldGet(this, _SessionToolRunner_controller, "f");
  const pending = [];
  let lastWasEndTurn = false;
  try {
    for await (const ev of this.client.beta.sessions.events.list(this.sessionId, { limit: 1e3 }, __classPrivateFieldGet(this, _SessionToolRunner_instances, "m", _SessionToolRunner_requestOptions).call(this))) {
      __classPrivateFieldGet(this, _SessionToolRunner_instances, "m", _SessionToolRunner_ingestHistory).call(this, ev, pending);
      lastWasEndTurn = isEndTurnIdle(ev);
    }
  } catch (e) {
    ctrl.signal.throwIfAborted();
    __classPrivateFieldGet(this, _SessionToolRunner_logger, "f").warn("reconcile list failed", { error: String(e) });
    for (const ev of pending)
      __classPrivateFieldGet(this, _SessionToolRunner_seen, "f").delete(ev.id);
    return;
  }
  const unanswered = pending.filter((ev) => !__classPrivateFieldGet(this, _SessionToolRunner_answered, "f").has(ev.id));
  if (lastWasEndTurn && unanswered.length === 0)
    __classPrivateFieldGet(this, _SessionToolRunner_instances, "m", _SessionToolRunner_armIdleTimer).call(this);
  else
    __classPrivateFieldGet(this, _SessionToolRunner_instances, "m", _SessionToolRunner_disarmIdleTimer).call(this);
  for (const ev of unanswered)
    await __classPrivateFieldGet(this, _SessionToolRunner_instances, "m", _SessionToolRunner_execute).call(this, ev);
}, _SessionToolRunner_ingestHistory = function _SessionToolRunner_ingestHistory2(ev, pending) {
  if (ev.type === "agent.tool_use" || ev.type === "agent.custom_tool_use") {
    __classPrivateFieldGet(this, _SessionToolRunner_seen, "f").add(ev.id);
    if (!__classPrivateFieldGet(this, _SessionToolRunner_answered, "f").has(ev.id))
      pending.push(ev);
  } else if (ev.type === "user.tool_result") {
    __classPrivateFieldGet(this, _SessionToolRunner_answered, "f").add(ev.tool_use_id);
  } else if (ev.type === "user.custom_tool_result") {
    __classPrivateFieldGet(this, _SessionToolRunner_answered, "f").add(ev.custom_tool_use_id);
  }
}, _SessionToolRunner_handleStreamEvent = /** Returns true when the runner should exit. */
async function _SessionToolRunner_handleStreamEvent2(ev) {
  if (isEndTurnIdle(ev))
    __classPrivateFieldGet(this, _SessionToolRunner_instances, "m", _SessionToolRunner_armIdleTimer).call(this);
  else
    __classPrivateFieldGet(this, _SessionToolRunner_instances, "m", _SessionToolRunner_disarmIdleTimer).call(this);
  switch (ev.type) {
    case "agent.tool_use":
    case "agent.custom_tool_use":
      if (!__classPrivateFieldGet(this, _SessionToolRunner_seen, "f").has(ev.id)) {
        __classPrivateFieldGet(this, _SessionToolRunner_seen, "f").add(ev.id);
        await __classPrivateFieldGet(this, _SessionToolRunner_instances, "m", _SessionToolRunner_execute).call(this, ev);
      }
      return false;
    case "user.tool_result":
      __classPrivateFieldGet(this, _SessionToolRunner_answered, "f").add(ev.tool_use_id);
      return false;
    case "user.custom_tool_result":
      __classPrivateFieldGet(this, _SessionToolRunner_answered, "f").add(ev.custom_tool_use_id);
      return false;
    case "session.status_terminated":
    case "session.deleted":
      __classPrivateFieldGet(this, _SessionToolRunner_logger, "f").info("session terminated", {
        component: "session-tool-runner",
        session_id: this.sessionId
      });
      __classPrivateFieldGet(this, _SessionToolRunner_controller, "f").abort();
      return true;
    default:
      return false;
  }
}, _SessionToolRunner_armIdleTimer = function _SessionToolRunner_armIdleTimer2() {
  __classPrivateFieldGet(this, _SessionToolRunner_instances, "m", _SessionToolRunner_disarmIdleTimer).call(this);
  if (this.maxIdleMs <= 0)
    return;
  __classPrivateFieldSet(this, _SessionToolRunner_idleTimer, setTimeout(() => {
    __classPrivateFieldGet(this, _SessionToolRunner_logger, "f").info("session idle after end_turn; stopping", {
      component: "session-tool-runner",
      session_id: this.sessionId,
      max_idle_ms: this.maxIdleMs
    });
    __classPrivateFieldGet(this, _SessionToolRunner_controller, "f").abort();
  }, this.maxIdleMs), "f");
}, _SessionToolRunner_disarmIdleTimer = function _SessionToolRunner_disarmIdleTimer2() {
  if (__classPrivateFieldGet(this, _SessionToolRunner_idleTimer, "f") !== void 0) {
    clearTimeout(__classPrivateFieldGet(this, _SessionToolRunner_idleTimer, "f"));
    __classPrivateFieldSet(this, _SessionToolRunner_idleTimer, void 0, "f");
  }
}, _SessionToolRunner_execute = // ===== tool execution =====
async function _SessionToolRunner_execute2(ev) {
  var _a2, _b;
  if (__classPrivateFieldGet(this, _SessionToolRunner_answered, "f").has(ev.id))
    return;
  __classPrivateFieldGet(this, _SessionToolRunner_logger, "f").info("executing tool", {
    component: "session-tool-runner",
    session_id: this.sessionId,
    tool: ev.name,
    tool_use_id: ev.id
  });
  __classPrivateFieldSet(this, _SessionToolRunner_inFlightCount, (_a2 = __classPrivateFieldGet(this, _SessionToolRunner_inFlightCount, "f"), _a2++, _a2), "f");
  try {
    const tool = __classPrivateFieldGet(this, _SessionToolRunner_toolByName, "f").get(ev.name);
    if (!tool) {
      __classPrivateFieldGet(this, _SessionToolRunner_logger, "f").info("tool not owned by this runner; leaving the tool_use_id pending for its owner", {
        component: "session-tool-runner",
        session_id: this.sessionId,
        tool: ev.name,
        tool_use_id: ev.id
      });
      __classPrivateFieldGet(this, _SessionToolRunner_results, "f").push({ event: ev, toolUseId: ev.id, name: ev.name, isError: false, posted: false });
      return;
    }
    let content;
    let isError;
    const toolCtrl = new AbortController();
    const detachTool = linkAbort(__classPrivateFieldGet(this, _SessionToolRunner_controller, "f").signal, toolCtrl);
    const timer = setTimeout(() => toolCtrl.abort(), TOOL_TIMEOUT_MS);
    try {
      const outcome = await runRunnableTool(tool, ev.input, {
        toolUse: ev,
        toolUseBlock: ev,
        signal: toolCtrl.signal
      });
      content = outcome.content;
      isError = outcome.isError;
    } finally {
      clearTimeout(timer);
      detachTool();
    }
    const result = buildResultEvent(ev, isError, toSessionContent(content));
    const posted = await __classPrivateFieldGet(this, _SessionToolRunner_instances, "m", _SessionToolRunner_sendResult).call(this, result, ev.id);
    __classPrivateFieldGet(this, _SessionToolRunner_results, "f").push({
      event: ev,
      result,
      toolUseId: ev.id,
      name: ev.name,
      isError,
      posted
    });
  } finally {
    __classPrivateFieldSet(this, _SessionToolRunner_inFlightCount, (_b = __classPrivateFieldGet(this, _SessionToolRunner_inFlightCount, "f"), _b--, _b), "f");
    if (__classPrivateFieldGet(this, _SessionToolRunner_inFlightCount, "f") === 0)
      __classPrivateFieldGet(this, _SessionToolRunner_onIdle, "f")?.call(this);
  }
}, _SessionToolRunner_sendResult = async function _SessionToolRunner_sendResult2(result, toolUseId) {
  const ctrl = __classPrivateFieldGet(this, _SessionToolRunner_controller, "f");
  let lastErr;
  for (let i = 0; i < SEND_RETRIES; i++) {
    ctrl.signal.throwIfAborted();
    try {
      await this.client.beta.sessions.events.send(this.sessionId, { events: [result] }, __classPrivateFieldGet(this, _SessionToolRunner_instances, "m", _SessionToolRunner_requestOptions).call(this));
      __classPrivateFieldGet(this, _SessionToolRunner_answered, "f").add(toolUseId);
      return true;
    } catch (e) {
      lastErr = e;
      if (isFatal4xx(e))
        break;
      if (i < SEND_RETRIES - 1)
        await sleep((i + 1) * 1e3, ctrl.signal);
    }
  }
  __classPrivateFieldGet(this, _SessionToolRunner_logger, "f").error("failed to send tool result", {
    tool_use_id: toolUseId,
    error: String(lastErr)
  });
  return false;
}, _SessionToolRunner_drain = /** Wait (bounded) for in-flight tool executions to finish during teardown. */
async function _SessionToolRunner_drain2() {
  if (__classPrivateFieldGet(this, _SessionToolRunner_inFlightCount, "f") === 0)
    return;
  await Promise.race([new Promise((r) => __classPrivateFieldSet(this, _SessionToolRunner_onIdle, r, "f")), sleep(DRAIN_TIMEOUT_MS)]);
  __classPrivateFieldSet(this, _SessionToolRunner_onIdle, null, "f");
  if (__classPrivateFieldGet(this, _SessionToolRunner_inFlightCount, "f") > 0) {
    __classPrivateFieldGet(this, _SessionToolRunner_logger, "f").warn("drain timeout exceeded");
  }
};
function buildResultEvent(ev, isError, content) {
  if (ev.type === "agent.custom_tool_use") {
    return { type: "user.custom_tool_result", custom_tool_use_id: ev.id, is_error: isError, content };
  }
  return { type: "user.tool_result", tool_use_id: ev.id, is_error: isError, content };
}
function toSessionContent(content) {
  if (typeof content === "string")
    return [{ type: "text", text: content || "(no output)" }];
  const out = content.map((b) => {
    if (b.type === "text")
      return { type: "text", text: b.text || "(no output)" };
    if (b.type === "image" || b.type === "document")
      return b;
    if (b.type === "search_result") {
      return {
        type: "search_result",
        source: b.source,
        title: b.title,
        content: b.content.map((c) => ({ type: "text", text: c.text })),
        citations: { enabled: b.citations?.enabled ?? false }
      };
    }
    return { type: "text", text: JSON.stringify(b) };
  });
  return out.length > 0 ? out : [{ type: "text", text: "(no output)" }];
}

// node_modules/@anthropic-ai/sdk/lib/environments/worker.mjs
var _EnvironmentWorker_instances;
var _EnvironmentWorker_signal;
var _EnvironmentWorker_handleItem;
var HEARTBEAT_DEFAULT_MS = 3e4;
var NO_HEARTBEAT_SENTINEL = "NO_HEARTBEAT";
var EnvironmentWorker = class {
  constructor(opts) {
    _EnvironmentWorker_instances.add(this);
    _EnvironmentWorker_signal.set(this, void 0);
    this.client = opts.client;
    this.environmentId = opts.environmentId;
    this.environmentKey = opts.environmentKey;
    this.tools = opts.tools;
    this.workdir = opts.workdir ?? process.cwd();
    this.unrestrictedPaths = opts.unrestrictedPaths;
    this.maxFileBytes = opts.maxFileBytes;
    this.maxIdleMs = opts.maxIdleMs;
    this.workerId = opts.workerId;
    this.requestOptions = opts.requestOptions;
    __classPrivateFieldSet(this, _EnvironmentWorker_signal, opts.signal, "f");
  }
  /**
   * Poll the environment and service each claimed session until the supplied
   * signal (or the one passed to the constructor) aborts. Throws if
   * `environmentId` / `environmentKey` were not provided to the constructor.
   */
  async run(signal) {
    const { environmentId, environmentKey } = this;
    if (environmentId === void 0 || environmentKey === void 0) {
      throw new AnthropicError("EnvironmentWorker.run: environmentId and environmentKey are required to poll for work");
    }
    const externalSignal = signal ?? __classPrivateFieldGet(this, _EnvironmentWorker_signal, "f");
    const poller = new WorkPoller({
      client: this.client,
      environmentId,
      environmentKey,
      ...this.workerId !== void 0 ? { workerId: this.workerId } : {},
      ...externalSignal ? { signal: externalSignal } : {},
      ...this.requestOptions !== void 0 ? { requestOptions: this.requestOptions } : {},
      // The per-item handler force-stops every work item on exit; let it be the
      // single owner of `work.stop` rather than double-posting from the poller.
      autoStop: false
    });
    for await (const work of poller) {
      await __classPrivateFieldGet(this, _EnvironmentWorker_instances, "m", _EnvironmentWorker_handleItem).call(this, work, environmentKey, poller.signal);
    }
  }
  /**
   * Service a single, already-claimed work item without the poll loop: build the
   * per-session {@link AgentToolContext} (workdir from this worker's options),
   * download the session agent's skills (`setupSkills`), run a
   * {@link SessionToolRunner} for the session while heartbeating the work-item
   * lease in parallel, and force-stop the work item on exit (whether the runner
   * finishes normally, throws, or the heartbeat loop signals shutdown).
   *
   * Use this when something else does the claiming — e.g. a `worker poll
   * --on-work` script that hands an already-claimed item to a fresh process. The
   * work id / environment id / session id each fall back to `ANTHROPIC_WORK_ID` /
   * `ANTHROPIC_ENVIRONMENT_ID` / `ANTHROPIC_SESSION_ID` (the env vars that
   * command sets) when not passed; the environment key resolves from this
   * option, then the worker's own `environmentKey`, then
   * `ANTHROPIC_ENVIRONMENT_KEY`. With no arguments inside that command it just
   * works. Throws a clear error naming the first of the four required values
   * still missing after resolution.
   */
  async handleItem(opts) {
    const workId = opts?.workId ?? readEnv("ANTHROPIC_WORK_ID");
    const environmentId = opts?.environmentId ?? readEnv("ANTHROPIC_ENVIRONMENT_ID");
    const sessionId = opts?.sessionId ?? readEnv("ANTHROPIC_SESSION_ID");
    const environmentKey = opts?.environmentKey ?? this.environmentKey ?? readEnv("ANTHROPIC_ENVIRONMENT_KEY");
    if (!workId) {
      throw new AnthropicError("handleItem: workId is required \u2014 pass it or set ANTHROPIC_WORK_ID");
    }
    if (!environmentId) {
      throw new AnthropicError("handleItem: environmentId is required \u2014 pass it or set ANTHROPIC_ENVIRONMENT_ID");
    }
    if (!sessionId) {
      throw new AnthropicError("handleItem: sessionId is required \u2014 pass it or set ANTHROPIC_SESSION_ID");
    }
    if (!environmentKey) {
      throw new AnthropicError("handleItem: environmentKey is required \u2014 pass it, construct the worker with it, or set ANTHROPIC_ENVIRONMENT_KEY");
    }
    const work = {
      id: workId,
      environment_id: environmentId,
      data: { type: "session", id: sessionId }
    };
    await __classPrivateFieldGet(this, _EnvironmentWorker_instances, "m", _EnvironmentWorker_handleItem).call(this, work, environmentKey, opts?.signal ?? __classPrivateFieldGet(this, _EnvironmentWorker_signal, "f"));
  }
};
_EnvironmentWorker_signal = /* @__PURE__ */ new WeakMap(), _EnvironmentWorker_instances = /* @__PURE__ */ new WeakSet(), _EnvironmentWorker_handleItem = /**
 * The per-item body shared by {@link EnvironmentWorker.run}'s poll loop and
 * {@link EnvironmentWorker.handleItem}: run a {@link SessionToolRunner} for the
 * work item's session while heartbeating its lease, force-stopping on exit.
 * Non-session work items are ignored.
 */
async function _EnvironmentWorker_handleItem2(work, environmentKey, externalSignal) {
  const log = loggerFor(this.client);
  const sessionClient = copyClientForHelper(this.client, {
    authToken: environmentKey,
    helper: "environments-worker"
  });
  const sessionId = work.data.id;
  const ctx = {
    workdir: this.workdir,
    client: this.client,
    sessionId,
    ...this.unrestrictedPaths !== void 0 ? { unrestrictedPaths: this.unrestrictedPaths } : {},
    ...this.maxFileBytes !== void 0 ? { maxFileBytes: this.maxFileBytes } : {}
  };
  const agentToolset = await Promise.resolve().then(() => (init_node_browser(), node_browser_exports));
  let cleanupSkills = async () => {
  };
  try {
    cleanupSkills = await agentToolset.setupSkills(ctx);
  } catch (e) {
    log.warn("skill setup failed", { session_id: sessionId, work_id: work.id, error: String(e) });
  }
  const tools = typeof this.tools === "function" ? this.tools(ctx) : this.tools ?? agentToolset.betaAgentToolset20260401(ctx);
  const ctrl = new AbortController();
  const detachExternal = linkAbort(externalSignal, ctrl);
  const heartbeatPromise = heartbeatLoop(sessionClient, work, ctrl, log, this.requestOptions).catch((e) => {
    if (!ctrl.signal.aborted)
      log.error("heartbeat loop failed", { work_id: work.id, error: String(e) });
    ctrl.abort();
  });
  try {
    const runner = new SessionToolRunner(sessionId, {
      client: sessionClient,
      tools,
      ...this.maxIdleMs !== void 0 ? { maxIdleMs: this.maxIdleMs } : {},
      ...this.requestOptions !== void 0 ? { requestOptions: this.requestOptions } : {},
      signal: ctrl.signal
    });
    for await (const _ of runner) {
    }
  } finally {
    ctrl.abort();
    detachExternal();
    await heartbeatPromise;
    await cleanupSkills().catch((e) => {
      log.warn("skill cleanup failed", { session_id: sessionId, work_id: work.id, error: String(e) });
    });
    await forceStop(sessionClient, work, log, this.requestOptions);
  }
};
async function forceStop(client, work, log, requestOptions) {
  try {
    await client.beta.environments.work.stop(
      work.id,
      { environment_id: work.environment_id, force: true },
      // Caller's headers pass through; the helper-tag header is on the scoped
      // sub-client's default_headers via copyClientForHelper, so no per-call
      // re-stamping needed.
      { ...requestOptions, headers: buildHeaders([requestOptions?.headers]) }
    );
  } catch (e) {
    if (!isStatus(e, 409)) {
      log.error("force-stop on exit failed", { work_id: work.id, error: String(e) });
    }
  }
}
async function heartbeatLoop(client, work, ctrl, logger, requestOptions) {
  let intervalMs = HEARTBEAT_DEFAULT_MS;
  let last = NO_HEARTBEAT_SENTINEL;
  const beat = async () => {
    try {
      const resp = await client.beta.environments.work.heartbeat(work.id, { environment_id: work.environment_id, expected_last_heartbeat: last }, { ...requestOptions, headers: buildHeaders([requestOptions?.headers]), signal: ctrl.signal });
      last = resp.last_heartbeat;
      if (resp.ttl_seconds > 0) {
        intervalMs = Math.max(1e3, Math.min(resp.ttl_seconds * 1e3 / 2, HEARTBEAT_DEFAULT_MS));
      }
      if (resp.state === "stopping" || resp.state === "stopped") {
        logger.info("heartbeat signals shutdown", { work_id: work.id, state: resp.state });
        ctrl.abort();
      }
      if (!resp.lease_extended) {
        logger.warn("lease not extended, shutting down", { work_id: work.id });
        ctrl.abort();
      }
    } catch (e) {
      ctrl.signal.throwIfAborted();
      if (isFatal4xx(e)) {
        logger.error("permanent heartbeat failure", { work_id: work.id, error: String(e) });
        ctrl.abort();
        throw e;
      }
      logger.warn("transient heartbeat failure", { work_id: work.id, error: String(e) });
    }
  };
  await beat();
  while (!ctrl.signal.aborted) {
    await sleep(intervalMs, ctrl.signal);
    ctrl.signal.throwIfAborted();
    await beat();
  }
}

// node_modules/@anthropic-ai/sdk/resources/beta/environments/work.mjs
var Work = class extends APIResource {
  /**
   * Note: these endpoints are called automatically by the pre-built environment
   * worker provided in the SDKs and CLI, for orchestrating sessions with self-hosted
   * sandbox environments. They are included here as a reference; you do not need to
   * invoke them directly.
   *
   * Retrieve detailed information about a specific work item.
   *
   * @example
   * ```ts
   * const betaSelfHostedWork =
   *   await client.beta.environments.work.retrieve('work_id', {
   *     environment_id: 'env_011CZkZ9X2dpNyB7HsEFoRfW',
   *   });
   * ```
   */
  retrieve(workID, params, options) {
    const { environment_id, betas } = params;
    return this._client.get(path`/v1/environments/${environment_id}/work/${workID}?beta=true`, {
      ...options,
      headers: buildHeaders([
        { "anthropic-beta": [...betas ?? [], "managed-agents-2026-04-01"].toString() },
        options?.headers
      ])
    });
  }
  /**
   * Note: these endpoints are called automatically by the pre-built environment
   * worker provided in the SDKs and CLI, for orchestrating sessions with self-hosted
   * sandbox environments. They are included here as a reference; you do not need to
   * invoke them directly.
   *
   * Update work item metadata with merge semantics.
   *
   * @example
   * ```ts
   * const betaSelfHostedWork =
   *   await client.beta.environments.work.update('work_id', {
   *     environment_id: 'env_011CZkZ9X2dpNyB7HsEFoRfW',
   *     metadata: { foo: 'string' },
   *   });
   * ```
   */
  update(workID, params, options) {
    const { environment_id, betas, ...body } = params;
    return this._client.post(path`/v1/environments/${environment_id}/work/${workID}?beta=true`, {
      body,
      ...options,
      headers: buildHeaders([
        { "anthropic-beta": [...betas ?? [], "managed-agents-2026-04-01"].toString() },
        options?.headers
      ])
    });
  }
  /**
   * Note: these endpoints are called automatically by the pre-built environment
   * worker provided in the SDKs and CLI, for orchestrating sessions with self-hosted
   * sandbox environments. They are included here as a reference; you do not need to
   * invoke them directly.
   *
   * List work items in an environment.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const betaSelfHostedWork of client.beta.environments.work.list(
   *   'env_011CZkZ9X2dpNyB7HsEFoRfW',
   * )) {
   *   // ...
   * }
   * ```
   */
  list(environmentID, params = {}, options) {
    const { betas, ...query } = params ?? {};
    return this._client.getAPIList(path`/v1/environments/${environmentID}/work?beta=true`, PageCursor, {
      query,
      ...options,
      headers: buildHeaders([
        { "anthropic-beta": [...betas ?? [], "managed-agents-2026-04-01"].toString() },
        options?.headers
      ])
    });
  }
  /**
   * Note: these endpoints are called automatically by the pre-built environment
   * worker provided in the SDKs and CLI, for orchestrating sessions with self-hosted
   * sandbox environments. They are included here as a reference; you do not need to
   * invoke them directly.
   *
   * Acknowledge receipt of a work item, transitioning it from 'queued' to 'starting'
   * and removing it from the queue.
   *
   * @example
   * ```ts
   * const betaSelfHostedWork =
   *   await client.beta.environments.work.ack('work_id', {
   *     environment_id: 'env_011CZkZ9X2dpNyB7HsEFoRfW',
   *   });
   * ```
   */
  ack(workID, params, options) {
    const { environment_id, betas } = params;
    return this._client.post(path`/v1/environments/${environment_id}/work/${workID}/ack?beta=true`, {
      ...options,
      headers: buildHeaders([
        { "anthropic-beta": [...betas ?? [], "managed-agents-2026-04-01"].toString() },
        options?.headers
      ])
    });
  }
  /**
   * Note: these endpoints are called automatically by the pre-built environment
   * worker provided in the SDKs and CLI, for orchestrating sessions with self-hosted
   * sandbox environments. They are included here as a reference; you do not need to
   * invoke them directly.
   *
   * Record a heartbeat for a work item to maintain the lease.
   *
   * @example
   * ```ts
   * const betaSelfHostedWorkHeartbeatResponse =
   *   await client.beta.environments.work.heartbeat('work_id', {
   *     environment_id: 'env_011CZkZ9X2dpNyB7HsEFoRfW',
   *   });
   * ```
   */
  heartbeat(workID, params, options) {
    const { environment_id, desired_ttl_seconds, expected_last_heartbeat, betas } = params;
    return this._client.post(path`/v1/environments/${environment_id}/work/${workID}/heartbeat?beta=true`, {
      query: { desired_ttl_seconds, expected_last_heartbeat },
      ...options,
      headers: buildHeaders([
        { "anthropic-beta": [...betas ?? [], "managed-agents-2026-04-01"].toString() },
        options?.headers
      ])
    });
  }
  /**
   * Note: these endpoints are called automatically by the pre-built environment
   * worker provided in the SDKs and CLI, for orchestrating sessions with self-hosted
   * sandbox environments. They are included here as a reference; you do not need to
   * invoke them directly.
   *
   * Long poll for work items in the queue.
   *
   * @example
   * ```ts
   * const betaSelfHostedWork =
   *   await client.beta.environments.work.poll(
   *     'env_011CZkZ9X2dpNyB7HsEFoRfW',
   *   );
   * ```
   */
  poll(environmentID, params = {}, options) {
    const { betas, "Anthropic-Worker-ID": anthropicWorkerID, ...query } = params ?? {};
    return this._client.get(path`/v1/environments/${environmentID}/work/poll?beta=true`, {
      query,
      ...options,
      headers: buildHeaders([
        {
          "anthropic-beta": [...betas ?? [], "managed-agents-2026-04-01"].toString(),
          ...anthropicWorkerID != null ? { "Anthropic-Worker-ID": anthropicWorkerID } : void 0
        },
        options?.headers
      ])
    });
  }
  /**
   * Get statistics about the work queue for an environment.
   *
   * @example
   * ```ts
   * const betaSelfHostedWorkQueueStats =
   *   await client.beta.environments.work.stats(
   *     'env_011CZkZ9X2dpNyB7HsEFoRfW',
   *   );
   * ```
   */
  stats(environmentID, params = {}, options) {
    const { betas } = params ?? {};
    return this._client.get(path`/v1/environments/${environmentID}/work/stats?beta=true`, {
      ...options,
      headers: buildHeaders([
        { "anthropic-beta": [...betas ?? [], "managed-agents-2026-04-01"].toString() },
        options?.headers
      ])
    });
  }
  /**
   * Note: these endpoints are called automatically by the pre-built environment
   * worker provided in the SDKs and CLI, for orchestrating sessions with self-hosted
   * sandbox environments. They are included here as a reference; you do not need to
   * invoke them directly.
   *
   * Stop a work item, initiating graceful or forced shutdown.
   *
   * @example
   * ```ts
   * const betaSelfHostedWork =
   *   await client.beta.environments.work.stop('work_id', {
   *     environment_id: 'env_011CZkZ9X2dpNyB7HsEFoRfW',
   *   });
   * ```
   */
  stop(workID, params, options) {
    const { environment_id, betas, ...body } = params;
    return this._client.post(path`/v1/environments/${environment_id}/work/${workID}/stop?beta=true`, {
      body,
      ...options,
      headers: buildHeaders([
        { "anthropic-beta": [...betas ?? [], "managed-agents-2026-04-01"].toString() },
        options?.headers
      ])
    });
  }
  /**
   * Continuously claim work from a self-hosted environment, ack each item,
   * and yield it. Posts `stop` automatically when the consumer's loop body
   * returns or when iteration ends.
   *
   * @example
   * ```ts
   * for await (const work of client.beta.environments.work.poller({
   *   environmentId,
   *   environmentKey,
   * })) {
   *   if (work.data.type !== 'session') continue;
   *   // ...service the work...
   * }
   * ```
   */
  poller(opts) {
    return new WorkPoller({ ...opts, client: this._client });
  }
  /**
   * The self-hosted environment runner: poll for work, and for each claimed
   * session set up the workdir, download the agent's skills, run the tools while
   * heartbeating the lease, and force-stop on exit.
   *
   * @example
   * ```ts
   * // Long-running daemon — poll, serve each session, loop:
   * await client.beta.environments.work
   *   .worker({ environmentId, environmentKey, workdir: '/workspace' })
   *   .run();
   *
   * // Or service one already-claimed work item (e.g. inside a sandbox spawned
   * // by `ant worker poll --on-work`) — handleItem() reads the ANTHROPIC_* env vars:
   * await client.beta.environments.work.worker({ workdir: '/workspace' }).handleItem();
   * ```
   */
  worker(opts) {
    return new EnvironmentWorker({ ...opts, client: this._client });
  }
};
Work.WorkPoller = WorkPoller;
Work.EnvironmentWorker = EnvironmentWorker;

// node_modules/@anthropic-ai/sdk/resources/beta/environments/environments.mjs
var Environments = class extends APIResource {
  constructor() {
    super(...arguments);
    this.work = new Work(this._client);
  }
  /**
   * Create a new environment with the specified configuration.
   *
   * @example
   * ```ts
   * const betaEnvironment =
   *   await client.beta.environments.create({
   *     name: 'python-data-analysis',
   *   });
   * ```
   */
  create(params, options) {
    const { betas, ...body } = params;
    return this._client.post("/v1/environments?beta=true", {
      body,
      ...options,
      headers: buildHeaders([
        { "anthropic-beta": [...betas ?? [], "managed-agents-2026-04-01"].toString() },
        options?.headers
      ])
    });
  }
  /**
   * Retrieve a specific environment by ID.
   *
   * @example
   * ```ts
   * const betaEnvironment =
   *   await client.beta.environments.retrieve(
   *     'env_011CZkZ9X2dpNyB7HsEFoRfW',
   *   );
   * ```
   */
  retrieve(environmentID, params = {}, options) {
    const { betas } = params ?? {};
    return this._client.get(path`/v1/environments/${environmentID}?beta=true`, {
      ...options,
      headers: buildHeaders([
        { "anthropic-beta": [...betas ?? [], "managed-agents-2026-04-01"].toString() },
        options?.headers
      ])
    });
  }
  /**
   * Update an existing environment's configuration.
   *
   * @example
   * ```ts
   * const betaEnvironment =
   *   await client.beta.environments.update(
   *     'env_011CZkZ9X2dpNyB7HsEFoRfW',
   *   );
   * ```
   */
  update(environmentID, params, options) {
    const { betas, ...body } = params;
    return this._client.post(path`/v1/environments/${environmentID}?beta=true`, {
      body,
      ...options,
      headers: buildHeaders([
        { "anthropic-beta": [...betas ?? [], "managed-agents-2026-04-01"].toString() },
        options?.headers
      ])
    });
  }
  /**
   * List environments with pagination support.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const betaEnvironment of client.beta.environments.list()) {
   *   // ...
   * }
   * ```
   */
  list(params = {}, options) {
    const { betas, ...query } = params ?? {};
    return this._client.getAPIList("/v1/environments?beta=true", PageCursor, {
      query,
      ...options,
      headers: buildHeaders([
        { "anthropic-beta": [...betas ?? [], "managed-agents-2026-04-01"].toString() },
        options?.headers
      ])
    });
  }
  /**
   * Delete an environment by ID. Returns a confirmation of the deletion.
   *
   * @example
   * ```ts
   * const betaEnvironmentDeleteResponse =
   *   await client.beta.environments.delete(
   *     'env_011CZkZ9X2dpNyB7HsEFoRfW',
   *   );
   * ```
   */
  delete(environmentID, params = {}, options) {
    const { betas } = params ?? {};
    return this._client.delete(path`/v1/environments/${environmentID}?beta=true`, {
      ...options,
      headers: buildHeaders([
        { "anthropic-beta": [...betas ?? [], "managed-agents-2026-04-01"].toString() },
        options?.headers
      ])
    });
  }
  /**
   * Archive an environment by ID. Archived environments cannot be used to create new
   * sessions.
   *
   * @example
   * ```ts
   * const betaEnvironment =
   *   await client.beta.environments.archive(
   *     'env_011CZkZ9X2dpNyB7HsEFoRfW',
   *   );
   * ```
   */
  archive(environmentID, params = {}, options) {
    const { betas } = params ?? {};
    return this._client.post(path`/v1/environments/${environmentID}/archive?beta=true`, {
      ...options,
      headers: buildHeaders([
        { "anthropic-beta": [...betas ?? [], "managed-agents-2026-04-01"].toString() },
        options?.headers
      ])
    });
  }
};
Environments.Work = Work;

// node_modules/@anthropic-ai/sdk/resources/beta/memory-stores/memories.mjs
var Memories = class extends APIResource {
  /**
   * Create a memory
   *
   * @example
   * ```ts
   * const betaManagedAgentsMemory =
   *   await client.beta.memoryStores.memories.create(
   *     'memory_store_id',
   *     { content: 'content', path: 'xx' },
   *   );
   * ```
   */
  create(memoryStoreID, params, options) {
    const { view, betas, ...body } = params;
    return this._client.post(path`/v1/memory_stores/${memoryStoreID}/memories?beta=true`, {
      query: { view },
      body,
      ...options,
      headers: buildHeaders([
        { "anthropic-beta": [...betas ?? [], "agent-memory-2026-07-22"].toString() },
        options?.headers
      ])
    });
  }
  /**
   * Retrieve a memory
   *
   * @example
   * ```ts
   * const betaManagedAgentsMemory =
   *   await client.beta.memoryStores.memories.retrieve(
   *     'memory_id',
   *     { memory_store_id: 'memory_store_id' },
   *   );
   * ```
   */
  retrieve(memoryID, params, options) {
    const { memory_store_id, betas, ...query } = params;
    return this._client.get(path`/v1/memory_stores/${memory_store_id}/memories/${memoryID}?beta=true`, {
      query,
      ...options,
      headers: buildHeaders([
        { "anthropic-beta": [...betas ?? [], "agent-memory-2026-07-22"].toString() },
        options?.headers
      ])
    });
  }
  /**
   * Update a memory
   *
   * @example
   * ```ts
   * const betaManagedAgentsMemory =
   *   await client.beta.memoryStores.memories.update(
   *     'memory_id',
   *     { memory_store_id: 'memory_store_id' },
   *   );
   * ```
   */
  update(memoryID, params, options) {
    const { memory_store_id, view, betas, ...body } = params;
    return this._client.post(path`/v1/memory_stores/${memory_store_id}/memories/${memoryID}?beta=true`, {
      query: { view },
      body,
      ...options,
      headers: buildHeaders([
        { "anthropic-beta": [...betas ?? [], "agent-memory-2026-07-22"].toString() },
        options?.headers
      ])
    });
  }
  /**
   * List memories
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const betaManagedAgentsMemoryListItem of client.beta.memoryStores.memories.list(
   *   'memory_store_id',
   * )) {
   *   // ...
   * }
   * ```
   */
  list(memoryStoreID, params = {}, options) {
    const { betas, ...query } = params ?? {};
    return this._client.getAPIList(path`/v1/memory_stores/${memoryStoreID}/memories?beta=true`, PageCursor, {
      query,
      ...options,
      headers: buildHeaders([
        { "anthropic-beta": [...betas ?? [], "agent-memory-2026-07-22"].toString() },
        options?.headers
      ])
    });
  }
  /**
   * Delete a memory
   *
   * @example
   * ```ts
   * const betaManagedAgentsDeletedMemory =
   *   await client.beta.memoryStores.memories.delete(
   *     'memory_id',
   *     { memory_store_id: 'memory_store_id' },
   *   );
   * ```
   */
  delete(memoryID, params, options) {
    const { memory_store_id, expected_content_sha256, betas } = params;
    return this._client.delete(path`/v1/memory_stores/${memory_store_id}/memories/${memoryID}?beta=true`, {
      query: { expected_content_sha256 },
      ...options,
      headers: buildHeaders([
        { "anthropic-beta": [...betas ?? [], "agent-memory-2026-07-22"].toString() },
        options?.headers
      ])
    });
  }
};

// node_modules/@anthropic-ai/sdk/resources/beta/memory-stores/memory-versions.mjs
var MemoryVersions = class extends APIResource {
  /**
   * Retrieve a memory version
   *
   * @example
   * ```ts
   * const betaManagedAgentsMemoryVersion =
   *   await client.beta.memoryStores.memoryVersions.retrieve(
   *     'memory_version_id',
   *     { memory_store_id: 'memory_store_id' },
   *   );
   * ```
   */
  retrieve(memoryVersionID, params, options) {
    const { memory_store_id, betas, ...query } = params;
    return this._client.get(path`/v1/memory_stores/${memory_store_id}/memory_versions/${memoryVersionID}?beta=true`, {
      query,
      ...options,
      headers: buildHeaders([
        { "anthropic-beta": [...betas ?? [], "agent-memory-2026-07-22"].toString() },
        options?.headers
      ])
    });
  }
  /**
   * List memory versions
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const betaManagedAgentsMemoryVersion of client.beta.memoryStores.memoryVersions.list(
   *   'memory_store_id',
   * )) {
   *   // ...
   * }
   * ```
   */
  list(memoryStoreID, params = {}, options) {
    const { betas, ...query } = params ?? {};
    return this._client.getAPIList(path`/v1/memory_stores/${memoryStoreID}/memory_versions?beta=true`, PageCursor, {
      query,
      ...options,
      headers: buildHeaders([
        { "anthropic-beta": [...betas ?? [], "agent-memory-2026-07-22"].toString() },
        options?.headers
      ])
    });
  }
  /**
   * Redact a memory version
   *
   * @example
   * ```ts
   * const betaManagedAgentsMemoryVersion =
   *   await client.beta.memoryStores.memoryVersions.redact(
   *     'memory_version_id',
   *     { memory_store_id: 'memory_store_id' },
   *   );
   * ```
   */
  redact(memoryVersionID, params, options) {
    const { memory_store_id, betas } = params;
    return this._client.post(path`/v1/memory_stores/${memory_store_id}/memory_versions/${memoryVersionID}/redact?beta=true`, {
      ...options,
      headers: buildHeaders([
        { "anthropic-beta": [...betas ?? [], "agent-memory-2026-07-22"].toString() },
        options?.headers
      ])
    });
  }
};

// node_modules/@anthropic-ai/sdk/resources/beta/memory-stores/memory-stores.mjs
var MemoryStores = class extends APIResource {
  constructor() {
    super(...arguments);
    this.memories = new Memories(this._client);
    this.memoryVersions = new MemoryVersions(this._client);
  }
  /**
   * Create a memory store
   *
   * @example
   * ```ts
   * const betaManagedAgentsMemoryStore =
   *   await client.beta.memoryStores.create({ name: 'x' });
   * ```
   */
  create(params, options) {
    const { betas, ...body } = params;
    return this._client.post("/v1/memory_stores?beta=true", {
      body,
      ...options,
      headers: buildHeaders([
        { "anthropic-beta": [...betas ?? [], "agent-memory-2026-07-22"].toString() },
        options?.headers
      ])
    });
  }
  /**
   * Retrieve a memory store
   *
   * @example
   * ```ts
   * const betaManagedAgentsMemoryStore =
   *   await client.beta.memoryStores.retrieve(
   *     'memory_store_id',
   *   );
   * ```
   */
  retrieve(memoryStoreID, params = {}, options) {
    const { betas } = params ?? {};
    return this._client.get(path`/v1/memory_stores/${memoryStoreID}?beta=true`, {
      ...options,
      headers: buildHeaders([
        { "anthropic-beta": [...betas ?? [], "agent-memory-2026-07-22"].toString() },
        options?.headers
      ])
    });
  }
  /**
   * Update a memory store
   *
   * @example
   * ```ts
   * const betaManagedAgentsMemoryStore =
   *   await client.beta.memoryStores.update('memory_store_id');
   * ```
   */
  update(memoryStoreID, params, options) {
    const { betas, ...body } = params;
    return this._client.post(path`/v1/memory_stores/${memoryStoreID}?beta=true`, {
      body,
      ...options,
      headers: buildHeaders([
        { "anthropic-beta": [...betas ?? [], "agent-memory-2026-07-22"].toString() },
        options?.headers
      ])
    });
  }
  /**
   * List memory stores
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const betaManagedAgentsMemoryStore of client.beta.memoryStores.list()) {
   *   // ...
   * }
   * ```
   */
  list(params = {}, options) {
    const { betas, ...query } = params ?? {};
    return this._client.getAPIList("/v1/memory_stores?beta=true", PageCursor, {
      query,
      ...options,
      headers: buildHeaders([
        { "anthropic-beta": [...betas ?? [], "agent-memory-2026-07-22"].toString() },
        options?.headers
      ])
    });
  }
  /**
   * Delete a memory store
   *
   * @example
   * ```ts
   * const betaManagedAgentsDeletedMemoryStore =
   *   await client.beta.memoryStores.delete('memory_store_id');
   * ```
   */
  delete(memoryStoreID, params = {}, options) {
    const { betas } = params ?? {};
    return this._client.delete(path`/v1/memory_stores/${memoryStoreID}?beta=true`, {
      ...options,
      headers: buildHeaders([
        { "anthropic-beta": [...betas ?? [], "agent-memory-2026-07-22"].toString() },
        options?.headers
      ])
    });
  }
  /**
   * Archive a memory store
   *
   * @example
   * ```ts
   * const betaManagedAgentsMemoryStore =
   *   await client.beta.memoryStores.archive('memory_store_id');
   * ```
   */
  archive(memoryStoreID, params = {}, options) {
    const { betas } = params ?? {};
    return this._client.post(path`/v1/memory_stores/${memoryStoreID}/archive?beta=true`, {
      ...options,
      headers: buildHeaders([
        { "anthropic-beta": [...betas ?? [], "agent-memory-2026-07-22"].toString() },
        options?.headers
      ])
    });
  }
};
MemoryStores.Memories = Memories;
MemoryStores.MemoryVersions = MemoryVersions;

// node_modules/@anthropic-ai/sdk/error.mjs
init_error();

// node_modules/@anthropic-ai/sdk/internal/decoders/jsonl.mjs
init_error();
var JSONLDecoder = class _JSONLDecoder {
  constructor(iterator, controller) {
    this.iterator = iterator;
    this.controller = controller;
  }
  async *decoder() {
    const lineDecoder = new LineDecoder();
    for await (const chunk of this.iterator) {
      for (const line of lineDecoder.decode(chunk)) {
        yield JSON.parse(line);
      }
    }
    for (const line of lineDecoder.flush()) {
      yield JSON.parse(line);
    }
  }
  [Symbol.asyncIterator]() {
    return this.decoder();
  }
  static fromResponse(response, controller) {
    if (!response.body) {
      controller.abort();
      if (typeof globalThis.navigator !== "undefined" && globalThis.navigator.product === "ReactNative") {
        throw new AnthropicError(`The default react-native fetch implementation does not support streaming. Please use expo/fetch: https://docs.expo.dev/versions/latest/sdk/expo/#expofetch-api`);
      }
      throw new AnthropicError(`Attempted to iterate over a response with no body`);
    }
    return new _JSONLDecoder(ReadableStreamToAsyncIterable(response.body), controller);
  }
};

// node_modules/@anthropic-ai/sdk/resources/beta/messages/batches.mjs
var Batches = class extends APIResource {
  /**
   * Send a batch of Message creation requests.
   *
   * The Message Batches API can be used to process multiple Messages API requests at
   * once. Once a Message Batch is created, it begins processing immediately. Batches
   * can take up to 24 hours to complete.
   *
   * Learn more about the Message Batches API in our
   * [user guide](https://platform.claude.com/docs/en/build-with-claude/batch-processing)
   *
   * @example
   * ```ts
   * const betaMessageBatch =
   *   await client.beta.messages.batches.create({
   *     requests: [
   *       {
   *         custom_id: 'my-custom-id-1',
   *         params: {
   *           max_tokens: 1024,
   *           messages: [
   *             { content: 'Hello, world', role: 'user' },
   *           ],
   *           model: 'claude-opus-4-6',
   *         },
   *       },
   *     ],
   *   });
   * ```
   */
  create(params, options) {
    const { betas, user_profile_id, ...body } = params;
    return this._client.post("/v1/messages/batches?beta=true", {
      body,
      ...options,
      headers: buildHeaders([
        {
          "anthropic-beta": [...betas ?? [], "message-batches-2024-09-24"].toString(),
          ...user_profile_id != null ? { "anthropic-user-profile-id": user_profile_id } : void 0
        },
        options?.headers
      ])
    });
  }
  /**
   * This endpoint is idempotent and can be used to poll for Message Batch
   * completion. To access the results of a Message Batch, make a request to the
   * `results_url` field in the response.
   *
   * Learn more about the Message Batches API in our
   * [user guide](https://platform.claude.com/docs/en/build-with-claude/batch-processing)
   *
   * @example
   * ```ts
   * const betaMessageBatch =
   *   await client.beta.messages.batches.retrieve(
   *     'message_batch_id',
   *   );
   * ```
   */
  retrieve(messageBatchID, params = {}, options) {
    const { betas } = params ?? {};
    return this._client.get(path`/v1/messages/batches/${messageBatchID}?beta=true`, {
      ...options,
      headers: buildHeaders([
        { "anthropic-beta": [...betas ?? [], "message-batches-2024-09-24"].toString() },
        options?.headers
      ])
    });
  }
  /**
   * List all Message Batches within a Workspace. Most recently created batches are
   * returned first.
   *
   * Learn more about the Message Batches API in our
   * [user guide](https://platform.claude.com/docs/en/build-with-claude/batch-processing)
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const betaMessageBatch of client.beta.messages.batches.list()) {
   *   // ...
   * }
   * ```
   */
  list(params = {}, options) {
    const { betas, ...query } = params ?? {};
    return this._client.getAPIList("/v1/messages/batches?beta=true", Page, {
      query,
      ...options,
      headers: buildHeaders([
        { "anthropic-beta": [...betas ?? [], "message-batches-2024-09-24"].toString() },
        options?.headers
      ])
    });
  }
  /**
   * Delete a Message Batch.
   *
   * Message Batches can only be deleted once they've finished processing. If you'd
   * like to delete an in-progress batch, you must first cancel it.
   *
   * Learn more about the Message Batches API in our
   * [user guide](https://platform.claude.com/docs/en/build-with-claude/batch-processing)
   *
   * @example
   * ```ts
   * const betaDeletedMessageBatch =
   *   await client.beta.messages.batches.delete(
   *     'message_batch_id',
   *   );
   * ```
   */
  delete(messageBatchID, params = {}, options) {
    const { betas } = params ?? {};
    return this._client.delete(path`/v1/messages/batches/${messageBatchID}?beta=true`, {
      ...options,
      headers: buildHeaders([
        { "anthropic-beta": [...betas ?? [], "message-batches-2024-09-24"].toString() },
        options?.headers
      ])
    });
  }
  /**
   * Batches may be canceled any time before processing ends. Once cancellation is
   * initiated, the batch enters a `canceling` state, at which time the system may
   * complete any in-progress, non-interruptible requests before finalizing
   * cancellation.
   *
   * The number of canceled requests is specified in `request_counts`. To determine
   * which requests were canceled, check the individual results within the batch.
   * Note that cancellation may not result in any canceled requests if they were
   * non-interruptible.
   *
   * Learn more about the Message Batches API in our
   * [user guide](https://platform.claude.com/docs/en/build-with-claude/batch-processing)
   *
   * @example
   * ```ts
   * const betaMessageBatch =
   *   await client.beta.messages.batches.cancel(
   *     'message_batch_id',
   *   );
   * ```
   */
  cancel(messageBatchID, params = {}, options) {
    const { betas } = params ?? {};
    return this._client.post(path`/v1/messages/batches/${messageBatchID}/cancel?beta=true`, {
      ...options,
      headers: buildHeaders([
        { "anthropic-beta": [...betas ?? [], "message-batches-2024-09-24"].toString() },
        options?.headers
      ])
    });
  }
  /**
   * Streams the results of a Message Batch as a `.jsonl` file.
   *
   * Each line in the file is a JSON object containing the result of a single request
   * in the Message Batch. Results are not guaranteed to be in the same order as
   * requests. Use the `custom_id` field to match results to requests.
   *
   * Learn more about the Message Batches API in our
   * [user guide](https://platform.claude.com/docs/en/build-with-claude/batch-processing)
   *
   * @example
   * ```ts
   * const betaMessageBatchIndividualResponse =
   *   await client.beta.messages.batches.results(
   *     'message_batch_id',
   *   );
   * ```
   */
  async results(messageBatchID, params = {}, options) {
    const batch = await this.retrieve(messageBatchID);
    if (!batch.results_url) {
      throw new AnthropicError(`No batch \`results_url\`; Has it finished processing? ${batch.processing_status} - ${batch.id}`);
    }
    const { betas } = params ?? {};
    return this._client.get(batch.results_url, {
      ...options,
      headers: buildHeaders([
        {
          "anthropic-beta": [...betas ?? [], "message-batches-2024-09-24"].toString(),
          Accept: "application/binary"
        },
        options?.headers
      ]),
      stream: true,
      __binaryResponse: true
    })._thenUnwrap((_, props) => JSONLDecoder.fromResponse(props.response, props.controller));
  }
};

// node_modules/@anthropic-ai/sdk/internal/constants.mjs
var MODEL_NONSTREAMING_TOKENS = {
  "claude-opus-4-20250514": 8192,
  "claude-opus-4-0": 8192,
  "claude-4-opus-20250514": 8192,
  "anthropic.claude-opus-4-20250514-v1:0": 8192,
  "claude-opus-4@20250514": 8192,
  "claude-opus-4-1-20250805": 8192,
  "anthropic.claude-opus-4-1-20250805-v1:0": 8192,
  "claude-opus-4-1@20250805": 8192
};

// node_modules/@anthropic-ai/sdk/lib/beta-parser.mjs
init_error();
function getOutputFormat(params) {
  return params?.output_format ?? params?.output_config?.format;
}
function maybeParseBetaMessage(message, params, opts) {
  const outputFormat = getOutputFormat(params);
  if (!params || !("parse" in (outputFormat ?? {}))) {
    return {
      ...message,
      content: message.content.map((block) => {
        if (block.type === "text") {
          const parsedBlock = Object.defineProperty({ ...block }, "parsed_output", {
            value: null,
            enumerable: false
          });
          return Object.defineProperty(parsedBlock, "parsed", {
            get() {
              opts.logger.warn("The `parsed` property on `text` blocks is deprecated, please use `parsed_output` instead.");
              return null;
            },
            enumerable: false
          });
        }
        return block;
      }),
      parsed_output: null
    };
  }
  return parseBetaMessage(message, params, opts);
}
function parseBetaMessage(message, params, opts) {
  let firstParsedOutput = null;
  const content = message.content.map((block) => {
    if (block.type === "text") {
      const parsedOutput = parseBetaOutputFormat(params, block.text);
      if (firstParsedOutput === null) {
        firstParsedOutput = parsedOutput;
      }
      const parsedBlock = Object.defineProperty({ ...block }, "parsed_output", {
        value: parsedOutput,
        enumerable: false
      });
      return Object.defineProperty(parsedBlock, "parsed", {
        get() {
          opts.logger.warn("The `parsed` property on `text` blocks is deprecated, please use `parsed_output` instead.");
          return parsedOutput;
        },
        enumerable: false
      });
    }
    return block;
  });
  return {
    ...message,
    content,
    parsed_output: firstParsedOutput
  };
}
function parseBetaOutputFormat(params, content) {
  const outputFormat = getOutputFormat(params);
  if (outputFormat?.type !== "json_schema") {
    return null;
  }
  try {
    if ("parse" in outputFormat) {
      return outputFormat.parse(content);
    }
    return JSON.parse(content);
  } catch (error) {
    throw new AnthropicError(`Failed to parse structured output: ${error}`);
  }
}

// node_modules/@anthropic-ai/sdk/lib/BetaMessageStream.mjs
init_errors();

// node_modules/@anthropic-ai/sdk/_vendor/partial-json-parser/parser.mjs
var tokenize = (input) => {
  let current = 0;
  let tokens = [];
  while (current < input.length) {
    let char = input[current];
    if (char === "\\") {
      current++;
      continue;
    }
    if (char === "{") {
      tokens.push({
        type: "brace",
        value: "{"
      });
      current++;
      continue;
    }
    if (char === "}") {
      tokens.push({
        type: "brace",
        value: "}"
      });
      current++;
      continue;
    }
    if (char === "[") {
      tokens.push({
        type: "paren",
        value: "["
      });
      current++;
      continue;
    }
    if (char === "]") {
      tokens.push({
        type: "paren",
        value: "]"
      });
      current++;
      continue;
    }
    if (char === ":") {
      tokens.push({
        type: "separator",
        value: ":"
      });
      current++;
      continue;
    }
    if (char === ",") {
      tokens.push({
        type: "delimiter",
        value: ","
      });
      current++;
      continue;
    }
    if (char === '"') {
      let value = "";
      let danglingQuote = false;
      char = input[++current];
      while (char !== '"') {
        if (current === input.length) {
          danglingQuote = true;
          break;
        }
        if (char === "\\") {
          current++;
          if (current === input.length) {
            danglingQuote = true;
            break;
          }
          value += char + input[current];
          char = input[++current];
        } else {
          value += char;
          char = input[++current];
        }
      }
      char = input[++current];
      if (!danglingQuote) {
        tokens.push({
          type: "string",
          value
        });
      }
      continue;
    }
    let WHITESPACE = /\s/;
    if (char && WHITESPACE.test(char)) {
      current++;
      continue;
    }
    let NUMBERS = /[0-9]/;
    if (char && NUMBERS.test(char) || char === "-" || char === ".") {
      let value = "";
      if (char === "-") {
        value += char;
        char = input[++current];
      }
      while (char && (NUMBERS.test(char) || char === "." || // exponent marker, e.g. `1e10` or `1.5E-9`
      char === "e" || char === "E" || // exponent sign, only valid immediately after the exponent marker
      (char === "-" || char === "+") && (value[value.length - 1] === "e" || value[value.length - 1] === "E"))) {
        value += char;
        char = input[++current];
      }
      tokens.push({
        type: "number",
        value
      });
      continue;
    }
    let LETTERS = /[a-z]/i;
    if (char && LETTERS.test(char)) {
      let value = "";
      while (char && LETTERS.test(char)) {
        if (current === input.length) {
          break;
        }
        value += char;
        char = input[++current];
      }
      if (value == "true" || value == "false" || value === "null") {
        tokens.push({
          type: "name",
          value
        });
      } else {
        current++;
        continue;
      }
      continue;
    }
    current++;
  }
  return tokens;
};
var strip = (tokens) => {
  if (tokens.length === 0) {
    return tokens;
  }
  let lastToken = tokens[tokens.length - 1];
  switch (lastToken.type) {
    case "separator":
      tokens = tokens.slice(0, tokens.length - 1);
      return strip(tokens);
      break;
    case "number":
      let lastCharacterOfLastToken = lastToken.value[lastToken.value.length - 1];
      if (lastCharacterOfLastToken === "." || lastCharacterOfLastToken === "-" || lastCharacterOfLastToken === "+" || lastCharacterOfLastToken === "e" || lastCharacterOfLastToken === "E") {
        tokens = tokens.slice(0, tokens.length - 1);
        return strip(tokens);
      }
    case "string":
      let tokenBeforeTheLastToken = tokens[tokens.length - 2];
      if (tokenBeforeTheLastToken?.type === "delimiter") {
        tokens = tokens.slice(0, tokens.length - 1);
        return strip(tokens);
      } else if (tokenBeforeTheLastToken?.type === "brace" && tokenBeforeTheLastToken.value === "{") {
        tokens = tokens.slice(0, tokens.length - 1);
        return strip(tokens);
      }
      break;
    case "delimiter":
      tokens = tokens.slice(0, tokens.length - 1);
      return strip(tokens);
      break;
  }
  return tokens;
};
var unstrip = (tokens) => {
  let tail = [];
  tokens.map((token) => {
    if (token.type === "brace") {
      if (token.value === "{") {
        tail.push("}");
      } else {
        tail.splice(tail.lastIndexOf("}"), 1);
      }
    }
    if (token.type === "paren") {
      if (token.value === "[") {
        tail.push("]");
      } else {
        tail.splice(tail.lastIndexOf("]"), 1);
      }
    }
  });
  if (tail.length > 0) {
    tail.reverse().map((item) => {
      if (item === "}") {
        tokens.push({
          type: "brace",
          value: "}"
        });
      } else if (item === "]") {
        tokens.push({
          type: "paren",
          value: "]"
        });
      }
    });
  }
  return tokens;
};
var generate = (tokens) => {
  let output = "";
  tokens.map((token) => {
    switch (token.type) {
      case "string":
        output += '"' + token.value + '"';
        break;
      default:
        output += token.value;
        break;
    }
  });
  return output;
};
var partialParse = (input) => JSON.parse(generate(unstrip(strip(tokenize(input)))));

// node_modules/@anthropic-ai/sdk/internal/message-stream-utils.mjs
var JSON_BUF_PROPERTY = "__json_buf";
function withLazyInput(prev, jsonBuf) {
  const next = {};
  for (const key of Object.keys(prev)) {
    if (key !== "input")
      next[key] = prev[key];
  }
  Object.defineProperty(next, JSON_BUF_PROPERTY, { value: jsonBuf, enumerable: false, writable: true });
  let input;
  let parsed = false;
  Object.defineProperty(next, "input", {
    enumerable: true,
    configurable: true,
    get() {
      if (!parsed) {
        input = jsonBuf ? partialParse(jsonBuf) : {};
        parsed = true;
      }
      return input;
    }
  });
  return next;
}

// node_modules/@anthropic-ai/sdk/lib/BetaMessageStream.mjs
var _BetaMessageStream_instances;
var _BetaMessageStream_currentMessageSnapshot;
var _BetaMessageStream_params;
var _BetaMessageStream_connectedPromise;
var _BetaMessageStream_resolveConnectedPromise;
var _BetaMessageStream_rejectConnectedPromise;
var _BetaMessageStream_endPromise;
var _BetaMessageStream_resolveEndPromise;
var _BetaMessageStream_rejectEndPromise;
var _BetaMessageStream_listeners;
var _BetaMessageStream_ended;
var _BetaMessageStream_errored;
var _BetaMessageStream_aborted;
var _BetaMessageStream_catchingPromiseCreated;
var _BetaMessageStream_response;
var _BetaMessageStream_request_id;
var _BetaMessageStream_logger;
var _BetaMessageStream_getFinalMessage;
var _BetaMessageStream_getFinalText;
var _BetaMessageStream_handleError;
var _BetaMessageStream_beginRequest;
var _BetaMessageStream_addStreamEvent;
var _BetaMessageStream_endRequest;
var _BetaMessageStream_accumulateMessage;
var _BetaMessageStream_toolInputParseError;
function tracksToolInput(content) {
  return content.type === "tool_use" || content.type === "server_tool_use" || content.type === "mcp_tool_use";
}
var BetaMessageStream = class _BetaMessageStream {
  constructor(params, opts) {
    _BetaMessageStream_instances.add(this);
    this.messages = [];
    this.receivedMessages = [];
    _BetaMessageStream_currentMessageSnapshot.set(this, void 0);
    _BetaMessageStream_params.set(this, null);
    this.controller = new AbortController();
    _BetaMessageStream_connectedPromise.set(this, void 0);
    _BetaMessageStream_resolveConnectedPromise.set(this, () => {
    });
    _BetaMessageStream_rejectConnectedPromise.set(this, () => {
    });
    _BetaMessageStream_endPromise.set(this, void 0);
    _BetaMessageStream_resolveEndPromise.set(this, () => {
    });
    _BetaMessageStream_rejectEndPromise.set(this, () => {
    });
    _BetaMessageStream_listeners.set(this, {});
    _BetaMessageStream_ended.set(this, false);
    _BetaMessageStream_errored.set(this, false);
    _BetaMessageStream_aborted.set(this, false);
    _BetaMessageStream_catchingPromiseCreated.set(this, false);
    _BetaMessageStream_response.set(this, void 0);
    _BetaMessageStream_request_id.set(this, void 0);
    _BetaMessageStream_logger.set(this, void 0);
    _BetaMessageStream_handleError.set(this, (error) => {
      __classPrivateFieldSet(this, _BetaMessageStream_errored, true, "f");
      if (isAbortError(error)) {
        error = new APIUserAbortError();
      }
      if (error instanceof APIUserAbortError) {
        __classPrivateFieldSet(this, _BetaMessageStream_aborted, true, "f");
        return this._emit("abort", error);
      }
      if (error instanceof AnthropicError) {
        return this._emit("error", error);
      }
      if (error instanceof Error) {
        const anthropicError = new AnthropicError(error.message);
        anthropicError.cause = error;
        return this._emit("error", anthropicError);
      }
      return this._emit("error", new AnthropicError(String(error)));
    });
    __classPrivateFieldSet(this, _BetaMessageStream_connectedPromise, new Promise((resolve, reject) => {
      __classPrivateFieldSet(this, _BetaMessageStream_resolveConnectedPromise, resolve, "f");
      __classPrivateFieldSet(this, _BetaMessageStream_rejectConnectedPromise, reject, "f");
    }), "f");
    __classPrivateFieldSet(this, _BetaMessageStream_endPromise, new Promise((resolve, reject) => {
      __classPrivateFieldSet(this, _BetaMessageStream_resolveEndPromise, resolve, "f");
      __classPrivateFieldSet(this, _BetaMessageStream_rejectEndPromise, reject, "f");
    }), "f");
    __classPrivateFieldGet(this, _BetaMessageStream_connectedPromise, "f").catch(() => {
    });
    __classPrivateFieldGet(this, _BetaMessageStream_endPromise, "f").catch(() => {
    });
    __classPrivateFieldSet(this, _BetaMessageStream_params, params, "f");
    __classPrivateFieldSet(this, _BetaMessageStream_logger, opts?.logger ?? console, "f");
  }
  get response() {
    return __classPrivateFieldGet(this, _BetaMessageStream_response, "f");
  }
  get request_id() {
    return __classPrivateFieldGet(this, _BetaMessageStream_request_id, "f");
  }
  /**
   * Returns the `MessageStream` data, the raw `Response` instance and the ID of the request,
   * returned vie the `request-id` header which is useful for debugging requests and resporting
   * issues to Anthropic.
   *
   * This is the same as the `APIPromise.withResponse()` method.
   *
   * This method will raise an error if you created the stream using `MessageStream.fromReadableStream`
   * as no `Response` is available.
   */
  async withResponse() {
    __classPrivateFieldSet(this, _BetaMessageStream_catchingPromiseCreated, true, "f");
    const response = await __classPrivateFieldGet(this, _BetaMessageStream_connectedPromise, "f");
    if (!response) {
      throw new Error("Could not resolve a `Response` object");
    }
    return {
      data: this,
      response,
      request_id: response.headers.get("request-id")
    };
  }
  /**
   * Intended for use on the frontend, consuming a stream produced with
   * `.toReadableStream()` on the backend.
   *
   * Note that messages sent to the model do not appear in `.on('message')`
   * in this context.
   */
  static fromReadableStream(stream) {
    const runner = new _BetaMessageStream(null);
    runner._run(() => runner._fromReadableStream(stream));
    return runner;
  }
  static createMessage(messages, params, options, { logger } = {}) {
    const runner = new _BetaMessageStream(params, { logger });
    for (const message of params.messages) {
      runner._addMessageParam(message);
    }
    __classPrivateFieldSet(runner, _BetaMessageStream_params, { ...params, stream: true }, "f");
    runner._run(() => runner._createMessage(messages, { ...params, stream: true }, { ...options, headers: { ...options?.headers, [STAINLESS_HELPER_METHOD_HEADER]: "stream" } }));
    return runner;
  }
  _run(executor) {
    executor().then(() => {
      this._emitFinal();
      this._emit("end");
    }, __classPrivateFieldGet(this, _BetaMessageStream_handleError, "f"));
  }
  _addMessageParam(message) {
    this.messages.push(message);
  }
  _addMessage(message, emit = true) {
    this.receivedMessages.push(message);
    if (emit) {
      this._emit("message", message);
    }
  }
  async _createMessage(messages, params, options) {
    const signal = options?.signal;
    let abortHandler;
    if (signal) {
      if (signal.aborted)
        this.controller.abort();
      abortHandler = this.controller.abort.bind(this.controller);
      signal.addEventListener("abort", abortHandler);
    }
    try {
      __classPrivateFieldGet(this, _BetaMessageStream_instances, "m", _BetaMessageStream_beginRequest).call(this);
      const { response, data: stream } = await messages.create({ ...params, stream: true }, { ...options, signal: this.controller.signal }).withResponse();
      this._connected(response);
      for await (const event of stream) {
        __classPrivateFieldGet(this, _BetaMessageStream_instances, "m", _BetaMessageStream_addStreamEvent).call(this, event);
      }
      if (stream.controller.signal?.aborted) {
        throw new APIUserAbortError();
      }
      __classPrivateFieldGet(this, _BetaMessageStream_instances, "m", _BetaMessageStream_endRequest).call(this);
    } finally {
      if (signal && abortHandler) {
        signal.removeEventListener("abort", abortHandler);
      }
    }
  }
  _connected(response) {
    if (this.ended)
      return;
    __classPrivateFieldSet(this, _BetaMessageStream_response, response, "f");
    __classPrivateFieldSet(this, _BetaMessageStream_request_id, response?.headers.get("request-id"), "f");
    __classPrivateFieldGet(this, _BetaMessageStream_resolveConnectedPromise, "f").call(this, response);
    this._emit("connect");
  }
  get ended() {
    return __classPrivateFieldGet(this, _BetaMessageStream_ended, "f");
  }
  get errored() {
    return __classPrivateFieldGet(this, _BetaMessageStream_errored, "f");
  }
  get aborted() {
    return __classPrivateFieldGet(this, _BetaMessageStream_aborted, "f");
  }
  abort() {
    this.controller.abort();
  }
  /**
   * Adds the listener function to the end of the listeners array for the event.
   * No checks are made to see if the listener has already been added. Multiple calls passing
   * the same combination of event and listener will result in the listener being added, and
   * called, multiple times.
   * @returns this MessageStream, so that calls can be chained
   */
  on(event, listener) {
    const listeners = __classPrivateFieldGet(this, _BetaMessageStream_listeners, "f")[event] || (__classPrivateFieldGet(this, _BetaMessageStream_listeners, "f")[event] = []);
    listeners.push({ listener });
    return this;
  }
  /**
   * Removes the specified listener from the listener array for the event.
   * off() will remove, at most, one instance of a listener from the listener array. If any single
   * listener has been added multiple times to the listener array for the specified event, then
   * off() must be called multiple times to remove each instance.
   * @returns this MessageStream, so that calls can be chained
   */
  off(event, listener) {
    const listeners = __classPrivateFieldGet(this, _BetaMessageStream_listeners, "f")[event];
    if (!listeners)
      return this;
    const index = listeners.findIndex((l) => l.listener === listener);
    if (index >= 0)
      listeners.splice(index, 1);
    return this;
  }
  /**
   * Adds a one-time listener function for the event. The next time the event is triggered,
   * this listener is removed and then invoked.
   * @returns this MessageStream, so that calls can be chained
   */
  once(event, listener) {
    const listeners = __classPrivateFieldGet(this, _BetaMessageStream_listeners, "f")[event] || (__classPrivateFieldGet(this, _BetaMessageStream_listeners, "f")[event] = []);
    listeners.push({ listener, once: true });
    return this;
  }
  /**
   * This is similar to `.once()`, but returns a Promise that resolves the next time
   * the event is triggered, instead of calling a listener callback.
   * @returns a Promise that resolves the next time given event is triggered,
   * or rejects if an error is emitted.  (If you request the 'error' event,
   * returns a promise that resolves with the error).
   *
   * Example:
   *
   *   const message = await stream.emitted('message') // rejects if the stream errors
   */
  emitted(event) {
    return new Promise((resolve, reject) => {
      __classPrivateFieldSet(this, _BetaMessageStream_catchingPromiseCreated, true, "f");
      if (event !== "error")
        this.once("error", reject);
      this.once(event, resolve);
    });
  }
  async done() {
    __classPrivateFieldSet(this, _BetaMessageStream_catchingPromiseCreated, true, "f");
    await __classPrivateFieldGet(this, _BetaMessageStream_endPromise, "f");
  }
  get currentMessage() {
    return __classPrivateFieldGet(this, _BetaMessageStream_currentMessageSnapshot, "f");
  }
  /**
   * @returns a promise that resolves with the the final assistant Message response,
   * or rejects if an error occurred or the stream ended prematurely without producing a Message.
   * If structured outputs were used, this will be a ParsedMessage with a `parsed` field.
   */
  async finalMessage() {
    await this.done();
    return __classPrivateFieldGet(this, _BetaMessageStream_instances, "m", _BetaMessageStream_getFinalMessage).call(this);
  }
  /**
   * @returns a promise that resolves with the the final assistant Message's text response, concatenated
   * together if there are more than one text blocks.
   * Rejects if an error occurred or the stream ended prematurely without producing a Message.
   */
  async finalText() {
    await this.done();
    return __classPrivateFieldGet(this, _BetaMessageStream_instances, "m", _BetaMessageStream_getFinalText).call(this);
  }
  _emit(event, ...args) {
    if (__classPrivateFieldGet(this, _BetaMessageStream_ended, "f"))
      return;
    if (event === "end") {
      __classPrivateFieldSet(this, _BetaMessageStream_ended, true, "f");
      __classPrivateFieldGet(this, _BetaMessageStream_resolveEndPromise, "f").call(this);
    }
    const listeners = __classPrivateFieldGet(this, _BetaMessageStream_listeners, "f")[event];
    if (listeners) {
      __classPrivateFieldGet(this, _BetaMessageStream_listeners, "f")[event] = listeners.filter((l) => !l.once);
      listeners.forEach(({ listener }) => listener(...args));
    }
    if (event === "abort") {
      const error = args[0];
      if (!__classPrivateFieldGet(this, _BetaMessageStream_catchingPromiseCreated, "f") && !listeners?.length) {
        Promise.reject(error);
      }
      __classPrivateFieldGet(this, _BetaMessageStream_rejectConnectedPromise, "f").call(this, error);
      __classPrivateFieldGet(this, _BetaMessageStream_rejectEndPromise, "f").call(this, error);
      this._emit("end");
      return;
    }
    if (event === "error") {
      const error = args[0];
      if (!__classPrivateFieldGet(this, _BetaMessageStream_catchingPromiseCreated, "f") && !listeners?.length) {
        Promise.reject(error);
      }
      __classPrivateFieldGet(this, _BetaMessageStream_rejectConnectedPromise, "f").call(this, error);
      __classPrivateFieldGet(this, _BetaMessageStream_rejectEndPromise, "f").call(this, error);
      this._emit("end");
    }
  }
  _emitFinal() {
    const finalMessage = this.receivedMessages.at(-1);
    if (finalMessage) {
      this._emit("finalMessage", __classPrivateFieldGet(this, _BetaMessageStream_instances, "m", _BetaMessageStream_getFinalMessage).call(this));
    }
  }
  async _fromReadableStream(readableStream, options) {
    const signal = options?.signal;
    let abortHandler;
    if (signal) {
      if (signal.aborted)
        this.controller.abort();
      abortHandler = this.controller.abort.bind(this.controller);
      signal.addEventListener("abort", abortHandler);
    }
    try {
      __classPrivateFieldGet(this, _BetaMessageStream_instances, "m", _BetaMessageStream_beginRequest).call(this);
      this._connected(null);
      const stream = Stream.fromReadableStream(readableStream, this.controller);
      for await (const event of stream) {
        __classPrivateFieldGet(this, _BetaMessageStream_instances, "m", _BetaMessageStream_addStreamEvent).call(this, event);
      }
      if (stream.controller.signal?.aborted) {
        throw new APIUserAbortError();
      }
      __classPrivateFieldGet(this, _BetaMessageStream_instances, "m", _BetaMessageStream_endRequest).call(this);
    } finally {
      if (signal && abortHandler) {
        signal.removeEventListener("abort", abortHandler);
      }
    }
  }
  [(_BetaMessageStream_currentMessageSnapshot = /* @__PURE__ */ new WeakMap(), _BetaMessageStream_params = /* @__PURE__ */ new WeakMap(), _BetaMessageStream_connectedPromise = /* @__PURE__ */ new WeakMap(), _BetaMessageStream_resolveConnectedPromise = /* @__PURE__ */ new WeakMap(), _BetaMessageStream_rejectConnectedPromise = /* @__PURE__ */ new WeakMap(), _BetaMessageStream_endPromise = /* @__PURE__ */ new WeakMap(), _BetaMessageStream_resolveEndPromise = /* @__PURE__ */ new WeakMap(), _BetaMessageStream_rejectEndPromise = /* @__PURE__ */ new WeakMap(), _BetaMessageStream_listeners = /* @__PURE__ */ new WeakMap(), _BetaMessageStream_ended = /* @__PURE__ */ new WeakMap(), _BetaMessageStream_errored = /* @__PURE__ */ new WeakMap(), _BetaMessageStream_aborted = /* @__PURE__ */ new WeakMap(), _BetaMessageStream_catchingPromiseCreated = /* @__PURE__ */ new WeakMap(), _BetaMessageStream_response = /* @__PURE__ */ new WeakMap(), _BetaMessageStream_request_id = /* @__PURE__ */ new WeakMap(), _BetaMessageStream_logger = /* @__PURE__ */ new WeakMap(), _BetaMessageStream_handleError = /* @__PURE__ */ new WeakMap(), _BetaMessageStream_instances = /* @__PURE__ */ new WeakSet(), _BetaMessageStream_getFinalMessage = function _BetaMessageStream_getFinalMessage2() {
    if (this.receivedMessages.length === 0) {
      throw new AnthropicError("stream ended without producing a Message with role=assistant");
    }
    return this.receivedMessages.at(-1);
  }, _BetaMessageStream_getFinalText = function _BetaMessageStream_getFinalText2() {
    if (this.receivedMessages.length === 0) {
      throw new AnthropicError("stream ended without producing a Message with role=assistant");
    }
    const textBlocks = this.receivedMessages.at(-1).content.filter((block) => block.type === "text").map((block) => block.text);
    if (textBlocks.length === 0) {
      throw new AnthropicError("stream ended without producing a content block with type=text");
    }
    return textBlocks.join(" ");
  }, _BetaMessageStream_beginRequest = function _BetaMessageStream_beginRequest2() {
    if (this.ended)
      return;
    __classPrivateFieldSet(this, _BetaMessageStream_currentMessageSnapshot, void 0, "f");
  }, _BetaMessageStream_addStreamEvent = function _BetaMessageStream_addStreamEvent2(event) {
    if (this.ended)
      return;
    const messageSnapshot = __classPrivateFieldGet(this, _BetaMessageStream_instances, "m", _BetaMessageStream_accumulateMessage).call(this, event);
    this._emit("streamEvent", event, messageSnapshot);
    switch (event.type) {
      case "content_block_delta": {
        const content = messageSnapshot.content.at(-1);
        switch (event.delta.type) {
          case "text_delta": {
            if (content.type === "text") {
              this._emit("text", event.delta.text, content.text || "");
            }
            break;
          }
          case "citations_delta": {
            if (content.type === "text") {
              this._emit("citation", event.delta.citation, content.citations ?? []);
            }
            break;
          }
          case "input_json_delta": {
            if (tracksToolInput(content) && __classPrivateFieldGet(this, _BetaMessageStream_listeners, "f").inputJson?.length) {
              let jsonSnapshot;
              try {
                jsonSnapshot = content.input;
              } catch (err) {
                __classPrivateFieldGet(this, _BetaMessageStream_handleError, "f").call(this, __classPrivateFieldGet(this, _BetaMessageStream_instances, "m", _BetaMessageStream_toolInputParseError).call(this, content, err));
                break;
              }
              this._emit("inputJson", event.delta.partial_json, jsonSnapshot);
            }
            break;
          }
          case "thinking_delta": {
            if (content.type === "thinking") {
              this._emit("thinking", event.delta.thinking, content.thinking);
            }
            break;
          }
          case "signature_delta": {
            if (content.type === "thinking") {
              this._emit("signature", content.signature);
            }
            break;
          }
          case "compaction_delta": {
            if (content.type === "compaction" && content.content) {
              this._emit("compaction", content.content);
            }
            break;
          }
          default:
            checkNever(event.delta);
        }
        break;
      }
      case "message_stop": {
        this._addMessageParam(messageSnapshot);
        this._addMessage(maybeParseBetaMessage(messageSnapshot, __classPrivateFieldGet(this, _BetaMessageStream_params, "f"), { logger: __classPrivateFieldGet(this, _BetaMessageStream_logger, "f") }), true);
        break;
      }
      case "content_block_stop": {
        this._emit("contentBlock", messageSnapshot.content.at(-1));
        break;
      }
      case "message_start": {
        __classPrivateFieldSet(this, _BetaMessageStream_currentMessageSnapshot, messageSnapshot, "f");
        break;
      }
      case "content_block_start":
      case "message_delta":
        break;
    }
  }, _BetaMessageStream_endRequest = function _BetaMessageStream_endRequest2() {
    if (this.ended) {
      throw new AnthropicError(`stream has ended, this shouldn't happen`);
    }
    const snapshot = __classPrivateFieldGet(this, _BetaMessageStream_currentMessageSnapshot, "f");
    if (!snapshot) {
      throw new AnthropicError(`request ended without sending any chunks`);
    }
    __classPrivateFieldSet(this, _BetaMessageStream_currentMessageSnapshot, void 0, "f");
    return maybeParseBetaMessage(snapshot, __classPrivateFieldGet(this, _BetaMessageStream_params, "f"), { logger: __classPrivateFieldGet(this, _BetaMessageStream_logger, "f") });
  }, _BetaMessageStream_accumulateMessage = function _BetaMessageStream_accumulateMessage2(event) {
    let snapshot = __classPrivateFieldGet(this, _BetaMessageStream_currentMessageSnapshot, "f");
    if (event.type === "message_start") {
      if (snapshot) {
        throw new AnthropicError(`Unexpected event order, got ${event.type} before receiving "message_stop"`);
      }
      return event.message;
    }
    if (!snapshot) {
      throw new AnthropicError(`Unexpected event order, got ${event.type} before "message_start"`);
    }
    switch (event.type) {
      case "message_stop":
        return snapshot;
      case "message_delta":
        snapshot.container = event.delta.container;
        snapshot.stop_reason = event.delta.stop_reason;
        snapshot.stop_sequence = event.delta.stop_sequence;
        if (event.delta.stop_details != null) {
          snapshot.stop_details = event.delta.stop_details;
        }
        snapshot.usage.output_tokens = event.usage.output_tokens;
        snapshot.context_management = event.context_management;
        if (event.usage.input_tokens != null) {
          snapshot.usage.input_tokens = event.usage.input_tokens;
        }
        if (event.usage.cache_creation_input_tokens != null) {
          snapshot.usage.cache_creation_input_tokens = event.usage.cache_creation_input_tokens;
        }
        if (event.usage.cache_read_input_tokens != null) {
          snapshot.usage.cache_read_input_tokens = event.usage.cache_read_input_tokens;
        }
        if (event.usage.server_tool_use != null) {
          snapshot.usage.server_tool_use = event.usage.server_tool_use;
        }
        if (event.usage.iterations != null) {
          snapshot.usage.iterations = event.usage.iterations;
        }
        return snapshot;
      case "content_block_start":
        snapshot.content.push(event.content_block);
        if (event.content_block.type === "fallback") {
          snapshot.model = event.content_block.to.model;
        }
        return snapshot;
      case "content_block_delta": {
        const snapshotContent = snapshot.content.at(event.index);
        switch (event.delta.type) {
          case "text_delta": {
            if (snapshotContent?.type === "text") {
              snapshot.content[event.index] = {
                ...snapshotContent,
                text: (snapshotContent.text || "") + event.delta.text
              };
            }
            break;
          }
          case "citations_delta": {
            if (snapshotContent?.type === "text") {
              snapshot.content[event.index] = {
                ...snapshotContent,
                citations: [...snapshotContent.citations ?? [], event.delta.citation]
              };
            }
            break;
          }
          case "input_json_delta": {
            if (snapshotContent && tracksToolInput(snapshotContent)) {
              const jsonBuf = (snapshotContent[JSON_BUF_PROPERTY] || "") + event.delta.partial_json;
              snapshot.content[event.index] = withLazyInput(snapshotContent, jsonBuf);
            }
            break;
          }
          case "thinking_delta": {
            if (snapshotContent?.type === "thinking") {
              snapshot.content[event.index] = {
                ...snapshotContent,
                thinking: snapshotContent.thinking + event.delta.thinking
              };
            }
            break;
          }
          case "signature_delta": {
            if (snapshotContent?.type === "thinking") {
              snapshot.content[event.index] = {
                ...snapshotContent,
                signature: event.delta.signature
              };
            }
            break;
          }
          case "compaction_delta": {
            if (snapshotContent?.type === "compaction") {
              snapshot.content[event.index] = {
                ...snapshotContent,
                content: (snapshotContent.content || "") + event.delta.content,
                encrypted_content: event.delta.encrypted_content
              };
            }
            break;
          }
          default:
            checkNever(event.delta);
        }
        return snapshot;
      }
      case "content_block_stop": {
        const snapshotContent = snapshot.content.at(event.index);
        if (snapshotContent && tracksToolInput(snapshotContent) && JSON_BUF_PROPERTY in snapshotContent) {
          let input;
          try {
            input = snapshotContent.input;
          } catch (err) {
            input = {};
            __classPrivateFieldGet(this, _BetaMessageStream_handleError, "f").call(this, __classPrivateFieldGet(this, _BetaMessageStream_instances, "m", _BetaMessageStream_toolInputParseError).call(this, snapshotContent, err));
          }
          Object.defineProperty(snapshotContent, "input", {
            value: input,
            enumerable: true,
            configurable: true,
            writable: true
          });
        }
        return snapshot;
      }
    }
  }, _BetaMessageStream_toolInputParseError = function _BetaMessageStream_toolInputParseError2(block, err) {
    const jsonBuf = block[JSON_BUF_PROPERTY];
    return new AnthropicError(`Unable to parse tool parameter JSON from model. Please retry your request or adjust your prompt. Error: ${err}. JSON: ${jsonBuf}`);
  }, Symbol.asyncIterator)]() {
    const pushQueue = [];
    const readQueue = [];
    let done = false;
    this.on("streamEvent", (event) => {
      const reader = readQueue.shift();
      if (reader) {
        reader.resolve(event);
      } else {
        pushQueue.push(event);
      }
    });
    this.on("end", () => {
      done = true;
      for (const reader of readQueue) {
        reader.resolve(void 0);
      }
      readQueue.length = 0;
    });
    this.on("abort", (err) => {
      done = true;
      for (const reader of readQueue) {
        reader.reject(err);
      }
      readQueue.length = 0;
    });
    this.on("error", (err) => {
      done = true;
      for (const reader of readQueue) {
        reader.reject(err);
      }
      readQueue.length = 0;
    });
    return {
      next: async () => {
        if (!pushQueue.length) {
          if (done) {
            return { value: void 0, done: true };
          }
          return new Promise((resolve, reject) => readQueue.push({ resolve, reject })).then((chunk2) => chunk2 ? { value: chunk2, done: false } : { value: void 0, done: true });
        }
        const chunk = pushQueue.shift();
        return { value: chunk, done: false };
      },
      return: async () => {
        this.abort();
        return { value: void 0, done: true };
      }
    };
  }
  toReadableStream() {
    const stream = new Stream(this[Symbol.asyncIterator].bind(this), this.controller);
    return stream.toReadableStream();
  }
};
function checkNever(x) {
}

// node_modules/@anthropic-ai/sdk/lib/tools/BetaToolRunner.mjs
init_error();

// node_modules/@anthropic-ai/sdk/internal/utils/promise.mjs
function promiseWithResolvers() {
  let resolve;
  let reject;
  const promise = new Promise((res, rej) => {
    resolve = res;
    reject = rej;
  });
  return { promise, resolve, reject };
}

// node_modules/@anthropic-ai/sdk/lib/tools/CompactionControl.mjs
var DEFAULT_TOKEN_THRESHOLD = 1e5;
var DEFAULT_SUMMARY_PROMPT = `You have been working on the task described above but have not yet completed it. Write a continuation summary that will allow you (or another instance of yourself) to resume work efficiently in a future context window where the conversation history will be replaced with this summary. Your summary should be structured, concise, and actionable. Include:
1. Task Overview
The user's core request and success criteria
Any clarifications or constraints they specified
2. Current State
What has been completed so far
Files created, modified, or analyzed (with paths if relevant)
Key outputs or artifacts produced
3. Important Discoveries
Technical constraints or requirements uncovered
Decisions made and their rationale
Errors encountered and how they were resolved
What approaches were tried that didn't work (and why)
4. Next Steps
Specific actions needed to complete the task
Any blockers or open questions to resolve
Priority order if multiple steps remain
5. Context to Preserve
User preferences or style requirements
Domain-specific details that aren't obvious
Any promises made to the user
Be concise but complete\u2014err on the side of including information that would prevent duplicate work or repeated mistakes. Write in a way that enables immediate resumption of the task.
Wrap your summary in <summary></summary> tags.`;

// node_modules/@anthropic-ai/sdk/lib/tools/BetaToolRunner.mjs
var _BetaToolRunner_instances;
var _BetaToolRunner_consumed;
var _BetaToolRunner_mutated;
var _BetaToolRunner_state;
var _BetaToolRunner_options;
var _BetaToolRunner_message;
var _BetaToolRunner_toolResponse;
var _BetaToolRunner_completion;
var _BetaToolRunner_iterationCount;
var _BetaToolRunner_checkAndCompact;
var _BetaToolRunner_generateToolResponse;
var BetaToolRunner = class {
  constructor(client, params, options) {
    _BetaToolRunner_instances.add(this);
    this.client = client;
    _BetaToolRunner_consumed.set(this, false);
    _BetaToolRunner_mutated.set(this, false);
    _BetaToolRunner_state.set(this, void 0);
    _BetaToolRunner_options.set(this, void 0);
    _BetaToolRunner_message.set(this, void 0);
    _BetaToolRunner_toolResponse.set(this, void 0);
    _BetaToolRunner_completion.set(this, void 0);
    _BetaToolRunner_iterationCount.set(this, 0);
    __classPrivateFieldSet(this, _BetaToolRunner_state, {
      params: {
        // You can't clone the entire params since there are functions as handlers.
        // You also don't really need to clone params.messages, but it probably will prevent a foot gun
        // somewhere.
        ...params,
        messages: structuredClone(params.messages)
      }
    }, "f");
    const collected = collectStainlessHelpers(params.tools, params.messages);
    __classPrivateFieldSet(this, _BetaToolRunner_options, {
      ...options,
      headers: buildHeaders([
        helperHeader("BetaToolRunner"),
        collected.length ? { [STAINLESS_HELPER_HEADER]: collected.join(", ") } : void 0,
        options?.headers
      ])
    }, "f");
    __classPrivateFieldSet(this, _BetaToolRunner_completion, promiseWithResolvers(), "f");
    if (params.compactionControl?.enabled) {
      console.warn('Anthropic: The `compactionControl` parameter is deprecated and will be removed in a future version. Use server-side compaction instead by passing `edits: [{ type: "compact_20260112" }]` in the params passed to `toolRunner()`. See https://platform.claude.com/docs/en/build-with-claude/compaction');
    }
  }
  async *[(_BetaToolRunner_consumed = /* @__PURE__ */ new WeakMap(), _BetaToolRunner_mutated = /* @__PURE__ */ new WeakMap(), _BetaToolRunner_state = /* @__PURE__ */ new WeakMap(), _BetaToolRunner_options = /* @__PURE__ */ new WeakMap(), _BetaToolRunner_message = /* @__PURE__ */ new WeakMap(), _BetaToolRunner_toolResponse = /* @__PURE__ */ new WeakMap(), _BetaToolRunner_completion = /* @__PURE__ */ new WeakMap(), _BetaToolRunner_iterationCount = /* @__PURE__ */ new WeakMap(), _BetaToolRunner_instances = /* @__PURE__ */ new WeakSet(), _BetaToolRunner_checkAndCompact = async function _BetaToolRunner_checkAndCompact2() {
    const compactionControl = __classPrivateFieldGet(this, _BetaToolRunner_state, "f").params.compactionControl;
    if (!compactionControl || !compactionControl.enabled) {
      return false;
    }
    let tokensUsed = 0;
    if (__classPrivateFieldGet(this, _BetaToolRunner_message, "f") !== void 0) {
      try {
        const message = await __classPrivateFieldGet(this, _BetaToolRunner_message, "f");
        const totalInputTokens = message.usage.input_tokens + (message.usage.cache_creation_input_tokens ?? 0) + (message.usage.cache_read_input_tokens ?? 0);
        tokensUsed = totalInputTokens + message.usage.output_tokens;
      } catch {
        return false;
      }
    }
    const threshold = compactionControl.contextTokenThreshold ?? DEFAULT_TOKEN_THRESHOLD;
    if (tokensUsed < threshold) {
      return false;
    }
    const model = compactionControl.model ?? __classPrivateFieldGet(this, _BetaToolRunner_state, "f").params.model;
    const summaryPrompt = compactionControl.summaryPrompt ?? DEFAULT_SUMMARY_PROMPT;
    const messages = __classPrivateFieldGet(this, _BetaToolRunner_state, "f").params.messages;
    if (messages[messages.length - 1].role === "assistant") {
      const lastMessage = messages[messages.length - 1];
      if (Array.isArray(lastMessage.content)) {
        const nonToolBlocks = lastMessage.content.filter((block) => block.type !== "tool_use");
        if (nonToolBlocks.length === 0) {
          messages.pop();
        } else {
          lastMessage.content = nonToolBlocks;
        }
      }
    }
    const response = await this.client.beta.messages.create({
      model,
      messages: [
        ...messages,
        {
          role: "user",
          content: [
            {
              type: "text",
              text: summaryPrompt
            }
          ]
        }
      ],
      max_tokens: __classPrivateFieldGet(this, _BetaToolRunner_state, "f").params.max_tokens
    }, {
      signal: __classPrivateFieldGet(this, _BetaToolRunner_options, "f").signal,
      headers: buildHeaders([__classPrivateFieldGet(this, _BetaToolRunner_options, "f").headers, helperHeader("compaction")])
    });
    if (response.content[0]?.type !== "text") {
      throw new AnthropicError("Expected text response for compaction");
    }
    __classPrivateFieldGet(this, _BetaToolRunner_state, "f").params.messages = [
      {
        role: "user",
        content: response.content
      }
    ];
    return true;
  }, Symbol.asyncIterator)]() {
    var _a2;
    if (__classPrivateFieldGet(this, _BetaToolRunner_consumed, "f")) {
      throw new AnthropicError("Cannot iterate over a consumed stream");
    }
    __classPrivateFieldSet(this, _BetaToolRunner_consumed, true, "f");
    __classPrivateFieldSet(this, _BetaToolRunner_mutated, true, "f");
    __classPrivateFieldSet(this, _BetaToolRunner_toolResponse, void 0, "f");
    try {
      while (true) {
        let stream;
        try {
          if (__classPrivateFieldGet(this, _BetaToolRunner_state, "f").params.max_iterations && __classPrivateFieldGet(this, _BetaToolRunner_iterationCount, "f") >= __classPrivateFieldGet(this, _BetaToolRunner_state, "f").params.max_iterations) {
            break;
          }
          __classPrivateFieldSet(this, _BetaToolRunner_mutated, false, "f");
          __classPrivateFieldSet(this, _BetaToolRunner_toolResponse, void 0, "f");
          __classPrivateFieldSet(this, _BetaToolRunner_iterationCount, (_a2 = __classPrivateFieldGet(this, _BetaToolRunner_iterationCount, "f"), _a2++, _a2), "f");
          __classPrivateFieldSet(this, _BetaToolRunner_message, void 0, "f");
          const { max_iterations, compactionControl, ...params } = __classPrivateFieldGet(this, _BetaToolRunner_state, "f").params;
          if (params.stream) {
            stream = this.client.beta.messages.stream({ ...params }, __classPrivateFieldGet(this, _BetaToolRunner_options, "f"));
            __classPrivateFieldSet(this, _BetaToolRunner_message, stream.finalMessage(), "f");
            __classPrivateFieldGet(this, _BetaToolRunner_message, "f").catch(() => {
            });
            yield stream;
          } else {
            __classPrivateFieldSet(this, _BetaToolRunner_message, this.client.beta.messages.create({ ...params, stream: false }, __classPrivateFieldGet(this, _BetaToolRunner_options, "f")), "f");
            yield __classPrivateFieldGet(this, _BetaToolRunner_message, "f");
          }
          const isCompacted = await __classPrivateFieldGet(this, _BetaToolRunner_instances, "m", _BetaToolRunner_checkAndCompact).call(this);
          if (!isCompacted) {
            if (!__classPrivateFieldGet(this, _BetaToolRunner_mutated, "f")) {
              const message = await __classPrivateFieldGet(this, _BetaToolRunner_message, "f");
              __classPrivateFieldGet(this, _BetaToolRunner_state, "f").params.messages.push({ role: message.role, content: message.content });
              if (message.stop_reason === "refusal") {
                break;
              }
            }
            const toolMessage = await __classPrivateFieldGet(this, _BetaToolRunner_instances, "m", _BetaToolRunner_generateToolResponse).call(this, __classPrivateFieldGet(this, _BetaToolRunner_state, "f").params.messages.at(-1));
            if (toolMessage) {
              __classPrivateFieldGet(this, _BetaToolRunner_state, "f").params.messages.push(toolMessage);
            } else if (!__classPrivateFieldGet(this, _BetaToolRunner_mutated, "f")) {
              break;
            }
          }
        } finally {
          if (stream) {
            stream.abort();
          }
        }
      }
      if (!__classPrivateFieldGet(this, _BetaToolRunner_message, "f")) {
        throw new AnthropicError("ToolRunner concluded without a message from the server");
      }
      __classPrivateFieldGet(this, _BetaToolRunner_completion, "f").resolve(await __classPrivateFieldGet(this, _BetaToolRunner_message, "f"));
    } catch (error) {
      __classPrivateFieldSet(this, _BetaToolRunner_consumed, false, "f");
      __classPrivateFieldGet(this, _BetaToolRunner_completion, "f").promise.catch(() => {
      });
      __classPrivateFieldGet(this, _BetaToolRunner_completion, "f").reject(error);
      __classPrivateFieldSet(this, _BetaToolRunner_completion, promiseWithResolvers(), "f");
      throw error;
    }
  }
  setMessagesParams(paramsOrMutator) {
    if (typeof paramsOrMutator === "function") {
      __classPrivateFieldGet(this, _BetaToolRunner_state, "f").params = paramsOrMutator(__classPrivateFieldGet(this, _BetaToolRunner_state, "f").params);
    } else {
      __classPrivateFieldGet(this, _BetaToolRunner_state, "f").params = paramsOrMutator;
    }
    __classPrivateFieldSet(this, _BetaToolRunner_mutated, true, "f");
    __classPrivateFieldSet(this, _BetaToolRunner_toolResponse, void 0, "f");
  }
  setRequestOptions(optionsOrMutator) {
    if (typeof optionsOrMutator === "function") {
      __classPrivateFieldSet(this, _BetaToolRunner_options, optionsOrMutator(__classPrivateFieldGet(this, _BetaToolRunner_options, "f")), "f");
    } else {
      __classPrivateFieldSet(this, _BetaToolRunner_options, { ...__classPrivateFieldGet(this, _BetaToolRunner_options, "f"), ...optionsOrMutator }, "f");
    }
  }
  /**
   * Get the tool response for the last message from the assistant.
   * Avoids redundant tool executions by caching results.
   *
   * @returns A promise that resolves to a BetaMessageParam containing tool results, or null if no tools need to be executed
   *
   * @example
   * const toolResponse = await runner.generateToolResponse();
   * if (toolResponse) {
   *   console.log('Tool results:', toolResponse.content);
   * }
   */
  async generateToolResponse(signal = __classPrivateFieldGet(this, _BetaToolRunner_options, "f").signal) {
    const message = await __classPrivateFieldGet(this, _BetaToolRunner_message, "f") ?? this.params.messages.at(-1);
    if (!message) {
      return null;
    }
    return __classPrivateFieldGet(this, _BetaToolRunner_instances, "m", _BetaToolRunner_generateToolResponse).call(this, message, signal);
  }
  /**
   * Wait for the async iterator to complete. This works even if the async iterator hasn't yet started, and
   * will wait for an instance to start and go to completion.
   *
   * @returns A promise that resolves to the final BetaMessage when the iterator completes
   *
   * @example
   * // Start consuming the iterator
   * for await (const message of runner) {
   *   console.log('Message:', message.content);
   * }
   *
   * // Meanwhile, wait for completion from another part of the code
   * const finalMessage = await runner.done();
   * console.log('Final response:', finalMessage.content);
   */
  done() {
    return __classPrivateFieldGet(this, _BetaToolRunner_completion, "f").promise;
  }
  /**
   * Returns a promise indicating that the stream is done. Unlike .done(), this will eagerly read the stream:
   * * If the iterator has not been consumed, consume the entire iterator and return the final message from the
   * assistant.
   * * If the iterator has been consumed, waits for it to complete and returns the final message.
   *
   * @returns A promise that resolves to the final BetaMessage from the conversation
   * @throws {AnthropicError} If no messages were processed during the conversation
   *
   * @example
   * const finalMessage = await runner.runUntilDone();
   * console.log('Final response:', finalMessage.content);
   */
  async runUntilDone() {
    if (!__classPrivateFieldGet(this, _BetaToolRunner_consumed, "f")) {
      for await (const _ of this) {
      }
    }
    return this.done();
  }
  /**
   * Get the current parameters being used by the ToolRunner.
   *
   * @returns A readonly view of the current ToolRunnerParams
   *
   * @example
   * const currentParams = runner.params;
   * console.log('Current model:', currentParams.model);
   * console.log('Message count:', currentParams.messages.length);
   */
  get params() {
    return __classPrivateFieldGet(this, _BetaToolRunner_state, "f").params;
  }
  /**
   * Add one or more messages to the conversation history.
   *
   * @param messages - One or more BetaMessageParam objects to add to the conversation
   *
   * @example
   * runner.pushMessages(
   *   { role: 'user', content: 'Also, what about the weather in NYC?' }
   * );
   *
   * @example
   * // Adding multiple messages
   * runner.pushMessages(
   *   { role: 'user', content: 'What about NYC?' },
   *   { role: 'user', content: 'And Boston?' }
   * );
   */
  pushMessages(...messages) {
    this.setMessagesParams((params) => ({
      ...params,
      messages: [...params.messages, ...messages]
    }));
  }
  /**
   * Makes the ToolRunner directly awaitable, equivalent to calling .runUntilDone()
   * This allows using `await runner` instead of `await runner.runUntilDone()`
   */
  then(onfulfilled, onrejected) {
    return this.runUntilDone().then(onfulfilled, onrejected);
  }
};
_BetaToolRunner_generateToolResponse = async function _BetaToolRunner_generateToolResponse2(lastMessage, signal = __classPrivateFieldGet(this, _BetaToolRunner_options, "f").signal) {
  if (__classPrivateFieldGet(this, _BetaToolRunner_toolResponse, "f") !== void 0) {
    return __classPrivateFieldGet(this, _BetaToolRunner_toolResponse, "f");
  }
  __classPrivateFieldSet(this, _BetaToolRunner_toolResponse, generateToolResponse(__classPrivateFieldGet(this, _BetaToolRunner_state, "f").params, lastMessage, {
    ...__classPrivateFieldGet(this, _BetaToolRunner_options, "f"),
    signal
  }), "f");
  return __classPrivateFieldGet(this, _BetaToolRunner_toolResponse, "f");
};
async function generateToolResponse(params, lastMessage = params.messages.at(-1), requestOptions) {
  if (!lastMessage || lastMessage.role !== "assistant" || !lastMessage.content || typeof lastMessage.content === "string") {
    return null;
  }
  const toolUseBlocks = lastMessage.content.filter((content) => content.type === "tool_use");
  if (toolUseBlocks.length === 0) {
    return null;
  }
  const toolResults = await Promise.all(toolUseBlocks.map(async (toolUse) => {
    const tool = params.tools.find((t) => ("name" in t ? t.name : t.mcp_server_name) === toolUse.name);
    if (!tool || !("run" in tool)) {
      return {
        type: "tool_result",
        tool_use_id: toolUse.id,
        content: `Error: Tool '${toolUse.name}' not found`,
        is_error: true
      };
    }
    try {
      let input = toolUse.input;
      if ("parse" in tool && tool.parse) {
        input = tool.parse(input);
      }
      const result = await tool.run(input, {
        toolUse,
        toolUseBlock: toolUse,
        signal: requestOptions?.signal
      });
      return {
        type: "tool_result",
        tool_use_id: toolUse.id,
        content: result
      };
    } catch (error) {
      return {
        type: "tool_result",
        tool_use_id: toolUse.id,
        content: error instanceof ToolError ? error.content : `Error: ${error instanceof Error ? error.message : String(error)}`,
        is_error: true
      };
    }
  }));
  return {
    role: "user",
    content: toolResults
  };
}

// node_modules/@anthropic-ai/sdk/resources/beta/messages/messages.mjs
var DEPRECATED_MODELS = {
  "claude-1.3": "November 6th, 2024",
  "claude-1.3-100k": "November 6th, 2024",
  "claude-instant-1.1": "November 6th, 2024",
  "claude-instant-1.1-100k": "November 6th, 2024",
  "claude-instant-1.2": "November 6th, 2024",
  "claude-3-sonnet-20240229": "July 21st, 2025",
  "claude-3-opus-20240229": "January 5th, 2026",
  "claude-2.1": "July 21st, 2025",
  "claude-2.0": "July 21st, 2025",
  "claude-3-7-sonnet-latest": "February 19th, 2026",
  "claude-3-7-sonnet-20250219": "February 19th, 2026",
  "claude-3-5-haiku-latest": "February 19th, 2026",
  "claude-3-5-haiku-20241022": "February 19th, 2026",
  "claude-opus-4-0": "June 15th, 2026",
  "claude-opus-4-20250514": "June 15th, 2026",
  "claude-sonnet-4-0": "June 15th, 2026",
  "claude-sonnet-4-20250514": "June 15th, 2026",
  "claude-opus-4-1": "August 5th, 2026",
  "claude-opus-4-1-20250805": "August 5th, 2026",
  "claude-mythos-preview": "June 30th, 2026"
};
var MODELS_TO_WARN_WITH_THINKING_ENABLED = ["claude-mythos-preview", "claude-opus-4-6"];
var Messages = class extends APIResource {
  constructor() {
    super(...arguments);
    this.batches = new Batches(this._client);
  }
  create(params, options) {
    const modifiedParams = transformOutputFormat(params);
    const { betas, user_profile_id, ...body } = modifiedParams;
    if (body.model in DEPRECATED_MODELS) {
      console.warn(`The model '${body.model}' is deprecated and will reach end-of-life on ${DEPRECATED_MODELS[body.model]}
Please migrate to a newer model. Visit https://docs.anthropic.com/en/docs/resources/model-deprecations for more information.`);
    }
    if (MODELS_TO_WARN_WITH_THINKING_ENABLED.includes(body.model) && body.thinking && body.thinking.type === "enabled") {
      console.warn(`Using Claude with ${body.model} and 'thinking.type=enabled' is deprecated. Use 'thinking.type=adaptive' instead which results in better model performance in our testing: https://platform.claude.com/docs/en/build-with-claude/adaptive-thinking`);
    }
    let timeout = this._client._options.timeout;
    if (!body.stream && timeout == null) {
      const maxNonstreamingTokens = MODEL_NONSTREAMING_TOKENS[body.model] ?? void 0;
      timeout = this._client.calculateNonstreamingTimeout(body.max_tokens, maxNonstreamingTokens);
    }
    const helperHeader2 = stainlessHelperHeader(body.tools, body.messages);
    return this._client.post("/v1/messages?beta=true", {
      body,
      timeout: timeout ?? 6e5,
      ...options,
      headers: buildHeaders([
        {
          ...betas?.toString() != null ? { "anthropic-beta": betas?.toString() } : void 0,
          ...user_profile_id != null ? { "anthropic-user-profile-id": user_profile_id } : void 0
        },
        helperHeader2,
        options?.headers
      ]),
      stream: modifiedParams.stream ?? false
    });
  }
  /**
   * Send a structured list of input messages with text and/or image content, along with an expected `output_format` and
   * the response will be automatically parsed and available in the `parsed_output` property of the message.
   *
   * @example
   * ```ts
   * const message = await client.beta.messages.parse({
   *   model: 'claude-3-5-sonnet-20241022',
   *   max_tokens: 1024,
   *   messages: [{ role: 'user', content: 'What is 2+2?' }],
   *   output_format: zodOutputFormat(z.object({ answer: z.number() }), 'math'),
   * });
   *
   * console.log(message.parsed_output?.answer); // 4
   * ```
   */
  parse(params, options) {
    options = {
      ...options,
      headers: buildHeaders([
        { "anthropic-beta": [...params.betas ?? [], "structured-outputs-2025-12-15"].toString() },
        options?.headers
      ])
    };
    return this.create(params, options).then((message) => parseBetaMessage(message, params, { logger: this._client.logger ?? console }));
  }
  /**
   * Create a Message stream
   */
  stream(body, options) {
    return BetaMessageStream.createMessage(this, body, options);
  }
  /**
   * Count the number of tokens in a Message.
   *
   * The Token Count API can be used to count the number of tokens in a Message,
   * including tools, images, and documents, without creating it.
   *
   * Learn more about token counting in our
   * [user guide](https://platform.claude.com/docs/en/build-with-claude/token-counting)
   *
   * @example
   * ```ts
   * const betaMessageTokensCount =
   *   await client.beta.messages.countTokens({
   *     messages: [{ content: 'Hello, world', role: 'user' }],
   *     model: 'claude-opus-4-6',
   *   });
   * ```
   */
  countTokens(params, options) {
    const modifiedParams = transformOutputFormat(params);
    const { betas, user_profile_id, ...body } = modifiedParams;
    return this._client.post("/v1/messages/count_tokens?beta=true", {
      body,
      ...options,
      headers: buildHeaders([
        {
          "anthropic-beta": [...betas ?? [], "token-counting-2024-11-01"].toString(),
          ...user_profile_id != null ? { "anthropic-user-profile-id": user_profile_id } : void 0
        },
        options?.headers
      ])
    });
  }
  toolRunner(body, options) {
    return new BetaToolRunner(this._client, body, options);
  }
};
function transformOutputFormat(params) {
  if (!params.output_format) {
    return params;
  }
  if (params.output_config?.format) {
    throw new AnthropicError("Both output_format and output_config.format were provided. Please use only output_config.format (output_format is deprecated).");
  }
  const { output_format, ...rest } = params;
  return {
    ...rest,
    output_config: {
      ...params.output_config,
      format: output_format
    }
  };
}
Messages.Batches = Batches;
Messages.BetaToolRunner = BetaToolRunner;
Messages.ToolError = ToolError;

// node_modules/@anthropic-ai/sdk/resources/beta/sessions/events.mjs
var Events = class extends APIResource {
  /**
   * List Events
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const betaManagedAgentsSessionEvent of client.beta.sessions.events.list(
   *   'sesn_011CZkZAtmR3yMPDzynEDxu7',
   * )) {
   *   // ...
   * }
   * ```
   */
  list(sessionID, params = {}, options) {
    const { betas, ...query } = params ?? {};
    return this._client.getAPIList(path`/v1/sessions/${sessionID}/events?beta=true`, PageCursor, {
      query,
      ...options,
      headers: buildHeaders([
        { "anthropic-beta": [...betas ?? [], "managed-agents-2026-04-01"].toString() },
        options?.headers
      ])
    });
  }
  /**
   * Send Events
   *
   * @example
   * ```ts
   * const betaManagedAgentsSendSessionEvents =
   *   await client.beta.sessions.events.send(
   *     'sesn_011CZkZAtmR3yMPDzynEDxu7',
   *     {
   *       events: [
   *         {
   *           content: [
   *             {
   *               text: 'Where is my order #1234?',
   *               type: 'text',
   *             },
   *           ],
   *           type: 'user.message',
   *         },
   *       ],
   *     },
   *   );
   * ```
   */
  send(sessionID, params, options) {
    const { betas, ...body } = params;
    return this._client.post(path`/v1/sessions/${sessionID}/events?beta=true`, {
      body,
      ...options,
      headers: buildHeaders([
        { "anthropic-beta": [...betas ?? [], "managed-agents-2026-04-01"].toString() },
        options?.headers
      ])
    });
  }
  /**
   * Stream Events
   *
   * @example
   * ```ts
   * const betaManagedAgentsStreamSessionEvents =
   *   await client.beta.sessions.events.stream(
   *     'sesn_011CZkZAtmR3yMPDzynEDxu7',
   *   );
   * ```
   */
  stream(sessionID, params = {}, options) {
    const { betas, ...query } = params ?? {};
    return this._client.get(path`/v1/sessions/${sessionID}/events/stream?beta=true`, {
      query,
      ...options,
      headers: buildHeaders([
        { "anthropic-beta": [...betas ?? [], "managed-agents-2026-04-01"].toString() },
        options?.headers
      ]),
      stream: true
    });
  }
  /**
   * Attach to a session and dispatch every incoming `agent.tool_use` and
   * `agent.custom_tool_use` event to a local tool registry, sending the matching
   * result back (`user.tool_result` / `user.custom_tool_result`). The
   * sessions-side counterpart to `client.beta.messages.toolRunner`: yields one
   * entry per completed tool call so callers can observe each dispatch (and
   * `break` to abort cleanly).
   *
   * @example
   * ```ts
   * import { betaAgentToolset20260401 } from '@anthropic-ai/sdk/tools/agent-toolset/node';
   *
   * for await (const call of client.beta.sessions.events.toolRunner(work.data.id, {
   *   tools: [...betaAgentToolset20260401({ workdir }), myTool],
   * })) {
   *   console.log(`${call.name} -> ${call.isError ? 'error' : 'ok'}`);
   * }
   * ```
   */
  toolRunner(sessionID, opts) {
    return new SessionToolRunner(sessionID, { ...opts, client: this._client });
  }
};
Events.SessionToolRunner = SessionToolRunner;

// node_modules/@anthropic-ai/sdk/resources/beta/sessions/resources.mjs
var Resources = class extends APIResource {
  /**
   * Get Session Resource
   *
   * @example
   * ```ts
   * const resource =
   *   await client.beta.sessions.resources.retrieve(
   *     'sesrsc_011CZkZBJq5dWxk9fVLNcPht',
   *     { session_id: 'sesn_011CZkZAtmR3yMPDzynEDxu7' },
   *   );
   * ```
   */
  retrieve(resourceID, params, options) {
    const { session_id, betas } = params;
    return this._client.get(path`/v1/sessions/${session_id}/resources/${resourceID}?beta=true`, {
      ...options,
      headers: buildHeaders([
        { "anthropic-beta": [...betas ?? [], "managed-agents-2026-04-01"].toString() },
        options?.headers
      ])
    });
  }
  /**
   * Update Session Resource
   *
   * @example
   * ```ts
   * const resource =
   *   await client.beta.sessions.resources.update(
   *     'sesrsc_011CZkZBJq5dWxk9fVLNcPht',
   *     {
   *       session_id: 'sesn_011CZkZAtmR3yMPDzynEDxu7',
   *       authorization_token: 'ghp_exampletoken',
   *     },
   *   );
   * ```
   */
  update(resourceID, params, options) {
    const { session_id, betas, ...body } = params;
    return this._client.post(path`/v1/sessions/${session_id}/resources/${resourceID}?beta=true`, {
      body,
      ...options,
      headers: buildHeaders([
        { "anthropic-beta": [...betas ?? [], "managed-agents-2026-04-01"].toString() },
        options?.headers
      ])
    });
  }
  /**
   * List Session Resources
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const betaManagedAgentsSessionResource of client.beta.sessions.resources.list(
   *   'sesn_011CZkZAtmR3yMPDzynEDxu7',
   * )) {
   *   // ...
   * }
   * ```
   */
  list(sessionID, params = {}, options) {
    const { betas, ...query } = params ?? {};
    return this._client.getAPIList(path`/v1/sessions/${sessionID}/resources?beta=true`, PageCursor, {
      query,
      ...options,
      headers: buildHeaders([
        { "anthropic-beta": [...betas ?? [], "managed-agents-2026-04-01"].toString() },
        options?.headers
      ])
    });
  }
  /**
   * Delete Session Resource
   *
   * @example
   * ```ts
   * const betaManagedAgentsDeleteSessionResource =
   *   await client.beta.sessions.resources.delete(
   *     'sesrsc_011CZkZBJq5dWxk9fVLNcPht',
   *     { session_id: 'sesn_011CZkZAtmR3yMPDzynEDxu7' },
   *   );
   * ```
   */
  delete(resourceID, params, options) {
    const { session_id, betas } = params;
    return this._client.delete(path`/v1/sessions/${session_id}/resources/${resourceID}?beta=true`, {
      ...options,
      headers: buildHeaders([
        { "anthropic-beta": [...betas ?? [], "managed-agents-2026-04-01"].toString() },
        options?.headers
      ])
    });
  }
  /**
   * Add Session Resource
   *
   * @example
   * ```ts
   * const betaManagedAgentsFileResource =
   *   await client.beta.sessions.resources.add(
   *     'sesn_011CZkZAtmR3yMPDzynEDxu7',
   *     {
   *       file_id: 'file_011CNha8iCJcU1wXNR6q4V8w',
   *       type: 'file',
   *     },
   *   );
   * ```
   */
  add(sessionID, params, options) {
    const { betas, ...body } = params;
    return this._client.post(path`/v1/sessions/${sessionID}/resources?beta=true`, {
      body,
      ...options,
      headers: buildHeaders([
        { "anthropic-beta": [...betas ?? [], "managed-agents-2026-04-01"].toString() },
        options?.headers
      ])
    });
  }
};

// node_modules/@anthropic-ai/sdk/resources/beta/sessions/threads/events.mjs
var Events2 = class extends APIResource {
  /**
   * List Session Thread Events
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const betaManagedAgentsSessionEvent of client.beta.sessions.threads.events.list(
   *   'sthr_011CZkZVWa6oIjw0rgXZpnBt',
   *   { session_id: 'sesn_011CZkZAtmR3yMPDzynEDxu7' },
   * )) {
   *   // ...
   * }
   * ```
   */
  list(threadID, params, options) {
    const { session_id, betas, ...query } = params;
    return this._client.getAPIList(path`/v1/sessions/${session_id}/threads/${threadID}/events?beta=true`, PageCursor, {
      query,
      ...options,
      headers: buildHeaders([
        { "anthropic-beta": [...betas ?? [], "managed-agents-2026-04-01"].toString() },
        options?.headers
      ])
    });
  }
  /**
   * Stream Session Thread Events
   *
   * @example
   * ```ts
   * const betaManagedAgentsStreamSessionThreadEvents =
   *   await client.beta.sessions.threads.events.stream(
   *     'sthr_011CZkZVWa6oIjw0rgXZpnBt',
   *     { session_id: 'sesn_011CZkZAtmR3yMPDzynEDxu7' },
   *   );
   * ```
   */
  stream(threadID, params, options) {
    const { session_id, betas } = params;
    return this._client.get(path`/v1/sessions/${session_id}/threads/${threadID}/stream?beta=true`, {
      ...options,
      headers: buildHeaders([
        { "anthropic-beta": [...betas ?? [], "managed-agents-2026-04-01"].toString() },
        options?.headers
      ]),
      stream: true
    });
  }
};

// node_modules/@anthropic-ai/sdk/resources/beta/sessions/threads/threads.mjs
var Threads = class extends APIResource {
  constructor() {
    super(...arguments);
    this.events = new Events2(this._client);
  }
  /**
   * Get Session Thread
   *
   * @example
   * ```ts
   * const betaManagedAgentsSessionThread =
   *   await client.beta.sessions.threads.retrieve(
   *     'sthr_011CZkZVWa6oIjw0rgXZpnBt',
   *     { session_id: 'sesn_011CZkZAtmR3yMPDzynEDxu7' },
   *   );
   * ```
   */
  retrieve(threadID, params, options) {
    const { session_id, betas } = params;
    return this._client.get(path`/v1/sessions/${session_id}/threads/${threadID}?beta=true`, {
      ...options,
      headers: buildHeaders([
        { "anthropic-beta": [...betas ?? [], "managed-agents-2026-04-01"].toString() },
        options?.headers
      ])
    });
  }
  /**
   * List Session Threads
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const betaManagedAgentsSessionThread of client.beta.sessions.threads.list(
   *   'sesn_011CZkZAtmR3yMPDzynEDxu7',
   * )) {
   *   // ...
   * }
   * ```
   */
  list(sessionID, params = {}, options) {
    const { betas, ...query } = params ?? {};
    return this._client.getAPIList(path`/v1/sessions/${sessionID}/threads?beta=true`, PageCursor, {
      query,
      ...options,
      headers: buildHeaders([
        { "anthropic-beta": [...betas ?? [], "managed-agents-2026-04-01"].toString() },
        options?.headers
      ])
    });
  }
  /**
   * Archive Session Thread
   *
   * @example
   * ```ts
   * const betaManagedAgentsSessionThread =
   *   await client.beta.sessions.threads.archive(
   *     'sthr_011CZkZVWa6oIjw0rgXZpnBt',
   *     { session_id: 'sesn_011CZkZAtmR3yMPDzynEDxu7' },
   *   );
   * ```
   */
  archive(threadID, params, options) {
    const { session_id, betas } = params;
    return this._client.post(path`/v1/sessions/${session_id}/threads/${threadID}/archive?beta=true`, {
      ...options,
      headers: buildHeaders([
        { "anthropic-beta": [...betas ?? [], "managed-agents-2026-04-01"].toString() },
        options?.headers
      ])
    });
  }
};
Threads.Events = Events2;

// node_modules/@anthropic-ai/sdk/resources/beta/sessions/sessions.mjs
var Sessions = class extends APIResource {
  constructor() {
    super(...arguments);
    this.events = new Events(this._client);
    this.resources = new Resources(this._client);
    this.threads = new Threads(this._client);
  }
  /**
   * Create Session
   *
   * @example
   * ```ts
   * const betaManagedAgentsSession =
   *   await client.beta.sessions.create({
   *     agent: 'agent_011CZkYpogX7uDKUyvBTophP',
   *     environment_id: 'env_011CZkZ9X2dpNyB7HsEFoRfW',
   *   });
   * ```
   */
  create(params, options) {
    const { betas, ...body } = params;
    return this._client.post("/v1/sessions?beta=true", {
      body,
      ...options,
      headers: buildHeaders([
        { "anthropic-beta": [...betas ?? [], "managed-agents-2026-04-01"].toString() },
        options?.headers
      ])
    });
  }
  /**
   * Get Session
   *
   * @example
   * ```ts
   * const betaManagedAgentsSession =
   *   await client.beta.sessions.retrieve(
   *     'sesn_011CZkZAtmR3yMPDzynEDxu7',
   *   );
   * ```
   */
  retrieve(sessionID, params = {}, options) {
    const { betas } = params ?? {};
    return this._client.get(path`/v1/sessions/${sessionID}?beta=true`, {
      ...options,
      headers: buildHeaders([
        { "anthropic-beta": [...betas ?? [], "managed-agents-2026-04-01"].toString() },
        options?.headers
      ])
    });
  }
  /**
   * Update Session
   *
   * @example
   * ```ts
   * const betaManagedAgentsSession =
   *   await client.beta.sessions.update(
   *     'sesn_011CZkZAtmR3yMPDzynEDxu7',
   *   );
   * ```
   */
  update(sessionID, params, options) {
    const { betas, ...body } = params;
    return this._client.post(path`/v1/sessions/${sessionID}?beta=true`, {
      body,
      ...options,
      headers: buildHeaders([
        { "anthropic-beta": [...betas ?? [], "managed-agents-2026-04-01"].toString() },
        options?.headers
      ])
    });
  }
  /**
   * List Sessions
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const betaManagedAgentsSession of client.beta.sessions.list()) {
   *   // ...
   * }
   * ```
   */
  list(params = {}, options) {
    const { betas, ...query } = params ?? {};
    return this._client.getAPIList("/v1/sessions?beta=true", BidirectionalPageCursor, {
      query,
      ...options,
      headers: buildHeaders([
        { "anthropic-beta": [...betas ?? [], "managed-agents-2026-04-01"].toString() },
        options?.headers
      ])
    });
  }
  /**
   * Delete Session
   *
   * @example
   * ```ts
   * const betaManagedAgentsDeletedSession =
   *   await client.beta.sessions.delete(
   *     'sesn_011CZkZAtmR3yMPDzynEDxu7',
   *   );
   * ```
   */
  delete(sessionID, params = {}, options) {
    const { betas } = params ?? {};
    return this._client.delete(path`/v1/sessions/${sessionID}?beta=true`, {
      ...options,
      headers: buildHeaders([
        { "anthropic-beta": [...betas ?? [], "managed-agents-2026-04-01"].toString() },
        options?.headers
      ])
    });
  }
  /**
   * Archive Session
   *
   * @example
   * ```ts
   * const betaManagedAgentsSession =
   *   await client.beta.sessions.archive(
   *     'sesn_011CZkZAtmR3yMPDzynEDxu7',
   *   );
   * ```
   */
  archive(sessionID, params = {}, options) {
    const { betas } = params ?? {};
    return this._client.post(path`/v1/sessions/${sessionID}/archive?beta=true`, {
      ...options,
      headers: buildHeaders([
        { "anthropic-beta": [...betas ?? [], "managed-agents-2026-04-01"].toString() },
        options?.headers
      ])
    });
  }
};
Sessions.Events = Events;
Sessions.Resources = Resources;
Sessions.Threads = Threads;

// node_modules/@anthropic-ai/sdk/resources/beta/skills/versions.mjs
var Versions2 = class extends APIResource {
  /**
   * Create Skill Version
   *
   * @example
   * ```ts
   * const version = await client.beta.skills.versions.create(
   *   'skill_id',
   *   { files: [fs.createReadStream('path/to/file')] },
   * );
   * ```
   */
  create(skillID, params, options) {
    const { betas, ...body } = params;
    return this._client.post(path`/v1/skills/${skillID}/versions?beta=true`, multipartFormRequestOptions({
      body,
      ...options,
      headers: buildHeaders([
        { "anthropic-beta": [...betas ?? [], "skills-2025-10-02"].toString() },
        options?.headers
      ])
    }, this._client, false));
  }
  /**
   * Get Skill Version
   *
   * @example
   * ```ts
   * const version = await client.beta.skills.versions.retrieve(
   *   'version',
   *   { skill_id: 'skill_id' },
   * );
   * ```
   */
  retrieve(version, params, options) {
    const { skill_id, betas } = params;
    return this._client.get(path`/v1/skills/${skill_id}/versions/${version}?beta=true`, {
      ...options,
      headers: buildHeaders([
        { "anthropic-beta": [...betas ?? [], "skills-2025-10-02"].toString() },
        options?.headers
      ])
    });
  }
  /**
   * List Skill Versions
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const versionListResponse of client.beta.skills.versions.list(
   *   'skill_id',
   * )) {
   *   // ...
   * }
   * ```
   */
  list(skillID, params = {}, options) {
    const { betas, ...query } = params ?? {};
    return this._client.getAPIList(path`/v1/skills/${skillID}/versions?beta=true`, PageCursor, {
      query,
      ...options,
      headers: buildHeaders([
        { "anthropic-beta": [...betas ?? [], "skills-2025-10-02"].toString() },
        options?.headers
      ])
    });
  }
  /**
   * Delete Skill Version
   *
   * @example
   * ```ts
   * const version = await client.beta.skills.versions.delete(
   *   'version',
   *   { skill_id: 'skill_id' },
   * );
   * ```
   */
  delete(version, params, options) {
    const { skill_id, betas } = params;
    return this._client.delete(path`/v1/skills/${skill_id}/versions/${version}?beta=true`, {
      ...options,
      headers: buildHeaders([
        { "anthropic-beta": [...betas ?? [], "skills-2025-10-02"].toString() },
        options?.headers
      ])
    });
  }
  /**
   * Download a skill version's content as a zip archive.
   *
   * @example
   * ```ts
   * const response = await client.beta.skills.versions.download(
   *   'version',
   *   { skill_id: 'skill_id' },
   * );
   *
   * const content = await response.blob();
   * console.log(content);
   * ```
   */
  download(version, params, options) {
    const { skill_id, betas } = params;
    return this._client.get(path`/v1/skills/${skill_id}/versions/${version}/content?beta=true`, {
      ...options,
      headers: buildHeaders([
        {
          "anthropic-beta": [...betas ?? [], "skills-2025-10-02"].toString(),
          Accept: "application/binary"
        },
        options?.headers
      ]),
      __binaryResponse: true
    });
  }
};

// node_modules/@anthropic-ai/sdk/resources/beta/skills/skills.mjs
var Skills = class extends APIResource {
  constructor() {
    super(...arguments);
    this.versions = new Versions2(this._client);
  }
  /**
   * Create Skill
   *
   * @example
   * ```ts
   * const skill = await client.beta.skills.create({
   *   files: [fs.createReadStream('path/to/file')],
   * });
   * ```
   */
  create(params, options) {
    const { betas, ...body } = params;
    return this._client.post("/v1/skills?beta=true", multipartFormRequestOptions({
      body,
      ...options,
      headers: buildHeaders([
        { "anthropic-beta": [...betas ?? [], "skills-2025-10-02"].toString() },
        options?.headers
      ])
    }, this._client, false));
  }
  /**
   * Get Skill
   *
   * @example
   * ```ts
   * const skill = await client.beta.skills.retrieve('skill_id');
   * ```
   */
  retrieve(skillID, params = {}, options) {
    const { betas } = params ?? {};
    return this._client.get(path`/v1/skills/${skillID}?beta=true`, {
      ...options,
      headers: buildHeaders([
        { "anthropic-beta": [...betas ?? [], "skills-2025-10-02"].toString() },
        options?.headers
      ])
    });
  }
  /**
   * List Skills
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const skillListResponse of client.beta.skills.list()) {
   *   // ...
   * }
   * ```
   */
  list(params = {}, options) {
    const { betas, ...query } = params ?? {};
    return this._client.getAPIList("/v1/skills?beta=true", PageCursor, {
      query,
      ...options,
      headers: buildHeaders([
        { "anthropic-beta": [...betas ?? [], "skills-2025-10-02"].toString() },
        options?.headers
      ])
    });
  }
  /**
   * Delete Skill
   *
   * @example
   * ```ts
   * const skill = await client.beta.skills.delete('skill_id');
   * ```
   */
  delete(skillID, params = {}, options) {
    const { betas } = params ?? {};
    return this._client.delete(path`/v1/skills/${skillID}?beta=true`, {
      ...options,
      headers: buildHeaders([
        { "anthropic-beta": [...betas ?? [], "skills-2025-10-02"].toString() },
        options?.headers
      ])
    });
  }
};
Skills.Versions = Versions2;

// node_modules/@anthropic-ai/sdk/resources/beta/vaults/credentials.mjs
var Credentials = class extends APIResource {
  /**
   * Create Credential
   *
   * @example
   * ```ts
   * const betaManagedAgentsCredential =
   *   await client.beta.vaults.credentials.create(
   *     'vlt_011CZkZDLs7fYzm1hXNPeRjv',
   *     {
   *       auth: {
   *         token: 'bearer_exampletoken',
   *         mcp_server_url:
   *           'https://example-server.modelcontextprotocol.io/sse',
   *         type: 'static_bearer',
   *       },
   *     },
   *   );
   * ```
   */
  create(vaultID, params, options) {
    const { betas, ...body } = params;
    return this._client.post(path`/v1/vaults/${vaultID}/credentials?beta=true`, {
      body,
      ...options,
      headers: buildHeaders([
        { "anthropic-beta": [...betas ?? [], "managed-agents-2026-04-01"].toString() },
        options?.headers
      ])
    });
  }
  /**
   * Get Credential
   *
   * @example
   * ```ts
   * const betaManagedAgentsCredential =
   *   await client.beta.vaults.credentials.retrieve(
   *     'vcrd_011CZkZEMt8gZan2iYOQfSkw',
   *     { vault_id: 'vlt_011CZkZDLs7fYzm1hXNPeRjv' },
   *   );
   * ```
   */
  retrieve(credentialID, params, options) {
    const { vault_id, betas } = params;
    return this._client.get(path`/v1/vaults/${vault_id}/credentials/${credentialID}?beta=true`, {
      ...options,
      headers: buildHeaders([
        { "anthropic-beta": [...betas ?? [], "managed-agents-2026-04-01"].toString() },
        options?.headers
      ])
    });
  }
  /**
   * Update Credential
   *
   * @example
   * ```ts
   * const betaManagedAgentsCredential =
   *   await client.beta.vaults.credentials.update(
   *     'vcrd_011CZkZEMt8gZan2iYOQfSkw',
   *     { vault_id: 'vlt_011CZkZDLs7fYzm1hXNPeRjv' },
   *   );
   * ```
   */
  update(credentialID, params, options) {
    const { vault_id, betas, ...body } = params;
    return this._client.post(path`/v1/vaults/${vault_id}/credentials/${credentialID}?beta=true`, {
      body,
      ...options,
      headers: buildHeaders([
        { "anthropic-beta": [...betas ?? [], "managed-agents-2026-04-01"].toString() },
        options?.headers
      ])
    });
  }
  /**
   * List Credentials
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const betaManagedAgentsCredential of client.beta.vaults.credentials.list(
   *   'vlt_011CZkZDLs7fYzm1hXNPeRjv',
   * )) {
   *   // ...
   * }
   * ```
   */
  list(vaultID, params = {}, options) {
    const { betas, ...query } = params ?? {};
    return this._client.getAPIList(path`/v1/vaults/${vaultID}/credentials?beta=true`, PageCursor, {
      query,
      ...options,
      headers: buildHeaders([
        { "anthropic-beta": [...betas ?? [], "managed-agents-2026-04-01"].toString() },
        options?.headers
      ])
    });
  }
  /**
   * Delete Credential
   *
   * @example
   * ```ts
   * const betaManagedAgentsDeletedCredential =
   *   await client.beta.vaults.credentials.delete(
   *     'vcrd_011CZkZEMt8gZan2iYOQfSkw',
   *     { vault_id: 'vlt_011CZkZDLs7fYzm1hXNPeRjv' },
   *   );
   * ```
   */
  delete(credentialID, params, options) {
    const { vault_id, betas } = params;
    return this._client.delete(path`/v1/vaults/${vault_id}/credentials/${credentialID}?beta=true`, {
      ...options,
      headers: buildHeaders([
        { "anthropic-beta": [...betas ?? [], "managed-agents-2026-04-01"].toString() },
        options?.headers
      ])
    });
  }
  /**
   * Archive Credential
   *
   * @example
   * ```ts
   * const betaManagedAgentsCredential =
   *   await client.beta.vaults.credentials.archive(
   *     'vcrd_011CZkZEMt8gZan2iYOQfSkw',
   *     { vault_id: 'vlt_011CZkZDLs7fYzm1hXNPeRjv' },
   *   );
   * ```
   */
  archive(credentialID, params, options) {
    const { vault_id, betas } = params;
    return this._client.post(path`/v1/vaults/${vault_id}/credentials/${credentialID}/archive?beta=true`, {
      ...options,
      headers: buildHeaders([
        { "anthropic-beta": [...betas ?? [], "managed-agents-2026-04-01"].toString() },
        options?.headers
      ])
    });
  }
  /**
   * Validate Credential
   *
   * @example
   * ```ts
   * const betaManagedAgentsCredentialValidation =
   *   await client.beta.vaults.credentials.mcpOAuthValidate(
   *     'vcrd_011CZkZEMt8gZan2iYOQfSkw',
   *     { vault_id: 'vlt_011CZkZDLs7fYzm1hXNPeRjv' },
   *   );
   * ```
   */
  mcpOAuthValidate(credentialID, params, options) {
    const { vault_id, betas } = params;
    return this._client.post(path`/v1/vaults/${vault_id}/credentials/${credentialID}/mcp_oauth_validate?beta=true`, {
      ...options,
      headers: buildHeaders([
        { "anthropic-beta": [...betas ?? [], "managed-agents-2026-04-01"].toString() },
        options?.headers
      ])
    });
  }
};

// node_modules/@anthropic-ai/sdk/resources/beta/vaults/vaults.mjs
var Vaults = class extends APIResource {
  constructor() {
    super(...arguments);
    this.credentials = new Credentials(this._client);
  }
  /**
   * Create Vault
   *
   * @example
   * ```ts
   * const betaManagedAgentsVault =
   *   await client.beta.vaults.create({
   *     display_name: 'Example vault',
   *   });
   * ```
   */
  create(params, options) {
    const { betas, ...body } = params;
    return this._client.post("/v1/vaults?beta=true", {
      body,
      ...options,
      headers: buildHeaders([
        { "anthropic-beta": [...betas ?? [], "managed-agents-2026-04-01"].toString() },
        options?.headers
      ])
    });
  }
  /**
   * Get Vault
   *
   * @example
   * ```ts
   * const betaManagedAgentsVault =
   *   await client.beta.vaults.retrieve(
   *     'vlt_011CZkZDLs7fYzm1hXNPeRjv',
   *   );
   * ```
   */
  retrieve(vaultID, params = {}, options) {
    const { betas } = params ?? {};
    return this._client.get(path`/v1/vaults/${vaultID}?beta=true`, {
      ...options,
      headers: buildHeaders([
        { "anthropic-beta": [...betas ?? [], "managed-agents-2026-04-01"].toString() },
        options?.headers
      ])
    });
  }
  /**
   * Update Vault
   *
   * @example
   * ```ts
   * const betaManagedAgentsVault =
   *   await client.beta.vaults.update(
   *     'vlt_011CZkZDLs7fYzm1hXNPeRjv',
   *   );
   * ```
   */
  update(vaultID, params, options) {
    const { betas, ...body } = params;
    return this._client.post(path`/v1/vaults/${vaultID}?beta=true`, {
      body,
      ...options,
      headers: buildHeaders([
        { "anthropic-beta": [...betas ?? [], "managed-agents-2026-04-01"].toString() },
        options?.headers
      ])
    });
  }
  /**
   * List Vaults
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const betaManagedAgentsVault of client.beta.vaults.list()) {
   *   // ...
   * }
   * ```
   */
  list(params = {}, options) {
    const { betas, ...query } = params ?? {};
    return this._client.getAPIList("/v1/vaults?beta=true", PageCursor, {
      query,
      ...options,
      headers: buildHeaders([
        { "anthropic-beta": [...betas ?? [], "managed-agents-2026-04-01"].toString() },
        options?.headers
      ])
    });
  }
  /**
   * Delete Vault
   *
   * @example
   * ```ts
   * const betaManagedAgentsDeletedVault =
   *   await client.beta.vaults.delete(
   *     'vlt_011CZkZDLs7fYzm1hXNPeRjv',
   *   );
   * ```
   */
  delete(vaultID, params = {}, options) {
    const { betas } = params ?? {};
    return this._client.delete(path`/v1/vaults/${vaultID}?beta=true`, {
      ...options,
      headers: buildHeaders([
        { "anthropic-beta": [...betas ?? [], "managed-agents-2026-04-01"].toString() },
        options?.headers
      ])
    });
  }
  /**
   * Archive Vault
   *
   * @example
   * ```ts
   * const betaManagedAgentsVault =
   *   await client.beta.vaults.archive(
   *     'vlt_011CZkZDLs7fYzm1hXNPeRjv',
   *   );
   * ```
   */
  archive(vaultID, params = {}, options) {
    const { betas } = params ?? {};
    return this._client.post(path`/v1/vaults/${vaultID}/archive?beta=true`, {
      ...options,
      headers: buildHeaders([
        { "anthropic-beta": [...betas ?? [], "managed-agents-2026-04-01"].toString() },
        options?.headers
      ])
    });
  }
};
Vaults.Credentials = Credentials;

// node_modules/@anthropic-ai/sdk/resources/beta/beta.mjs
var Beta = class extends APIResource {
  constructor() {
    super(...arguments);
    this.models = new Models(this._client);
    this.messages = new Messages(this._client);
    this.agents = new Agents(this._client);
    this.environments = new Environments(this._client);
    this.sessions = new Sessions(this._client);
    this.deployments = new Deployments(this._client);
    this.deploymentRuns = new DeploymentRuns(this._client);
    this.vaults = new Vaults(this._client);
    this.memoryStores = new MemoryStores(this._client);
    this.files = new Files(this._client);
    this.skills = new Skills(this._client);
    this.webhooks = new Webhooks(this._client);
    this.userProfiles = new UserProfiles(this._client);
  }
};
Beta.Models = Models;
Beta.Messages = Messages;
Beta.Agents = Agents;
Beta.Environments = Environments;
Beta.Sessions = Sessions;
Beta.Deployments = Deployments;
Beta.DeploymentRuns = DeploymentRuns;
Beta.Vaults = Vaults;
Beta.MemoryStores = MemoryStores;
Beta.Files = Files;
Beta.Skills = Skills;
Beta.Webhooks = Webhooks;
Beta.UserProfiles = UserProfiles;

// node_modules/@anthropic-ai/sdk/resources/completions.mjs
var Completions = class extends APIResource {
  create(params, options) {
    const { betas, ...body } = params;
    return this._client.post("/v1/complete", {
      body,
      timeout: this._client._options.timeout ?? 6e5,
      ...options,
      headers: buildHeaders([
        { ...betas?.toString() != null ? { "anthropic-beta": betas?.toString() } : void 0 },
        options?.headers
      ]),
      stream: params.stream ?? false
    });
  }
};

// node_modules/@anthropic-ai/sdk/lib/MessageStream.mjs
init_errors();

// node_modules/@anthropic-ai/sdk/lib/parser.mjs
init_error();
function getOutputFormat2(params) {
  return params?.output_config?.format;
}
function maybeParseMessage(message, params, opts) {
  const outputFormat = getOutputFormat2(params);
  if (!params || !("parse" in (outputFormat ?? {}))) {
    return {
      ...message,
      content: message.content.map((block) => {
        if (block.type === "text") {
          const parsedBlock = Object.defineProperty({ ...block }, "parsed_output", {
            value: null,
            enumerable: false
          });
          return parsedBlock;
        }
        return block;
      }),
      parsed_output: null
    };
  }
  return parseMessage(message, params, opts);
}
function parseMessage(message, params, opts) {
  let firstParsedOutput = null;
  const content = message.content.map((block) => {
    if (block.type === "text") {
      const parsedOutput = parseOutputFormat(params, block.text);
      if (firstParsedOutput === null) {
        firstParsedOutput = parsedOutput;
      }
      const parsedBlock = Object.defineProperty({ ...block }, "parsed_output", {
        value: parsedOutput,
        enumerable: false
      });
      return parsedBlock;
    }
    return block;
  });
  return {
    ...message,
    content,
    parsed_output: firstParsedOutput
  };
}
function parseOutputFormat(params, content) {
  const outputFormat = getOutputFormat2(params);
  if (outputFormat?.type !== "json_schema") {
    return null;
  }
  try {
    if ("parse" in outputFormat) {
      return outputFormat.parse(content);
    }
    return JSON.parse(content);
  } catch (error) {
    throw new AnthropicError(`Failed to parse structured output: ${error}`);
  }
}

// node_modules/@anthropic-ai/sdk/lib/MessageStream.mjs
var _MessageStream_instances;
var _MessageStream_currentMessageSnapshot;
var _MessageStream_params;
var _MessageStream_connectedPromise;
var _MessageStream_resolveConnectedPromise;
var _MessageStream_rejectConnectedPromise;
var _MessageStream_endPromise;
var _MessageStream_resolveEndPromise;
var _MessageStream_rejectEndPromise;
var _MessageStream_listeners;
var _MessageStream_ended;
var _MessageStream_errored;
var _MessageStream_aborted;
var _MessageStream_catchingPromiseCreated;
var _MessageStream_response;
var _MessageStream_request_id;
var _MessageStream_logger;
var _MessageStream_getFinalMessage;
var _MessageStream_getFinalText;
var _MessageStream_handleError;
var _MessageStream_beginRequest;
var _MessageStream_addStreamEvent;
var _MessageStream_endRequest;
var _MessageStream_accumulateMessage;
function tracksToolInput2(content) {
  return content.type === "tool_use" || content.type === "server_tool_use";
}
var MessageStream = class _MessageStream {
  constructor(params, opts) {
    _MessageStream_instances.add(this);
    this.messages = [];
    this.receivedMessages = [];
    _MessageStream_currentMessageSnapshot.set(this, void 0);
    _MessageStream_params.set(this, null);
    this.controller = new AbortController();
    _MessageStream_connectedPromise.set(this, void 0);
    _MessageStream_resolveConnectedPromise.set(this, () => {
    });
    _MessageStream_rejectConnectedPromise.set(this, () => {
    });
    _MessageStream_endPromise.set(this, void 0);
    _MessageStream_resolveEndPromise.set(this, () => {
    });
    _MessageStream_rejectEndPromise.set(this, () => {
    });
    _MessageStream_listeners.set(this, {});
    _MessageStream_ended.set(this, false);
    _MessageStream_errored.set(this, false);
    _MessageStream_aborted.set(this, false);
    _MessageStream_catchingPromiseCreated.set(this, false);
    _MessageStream_response.set(this, void 0);
    _MessageStream_request_id.set(this, void 0);
    _MessageStream_logger.set(this, void 0);
    _MessageStream_handleError.set(this, (error) => {
      __classPrivateFieldSet(this, _MessageStream_errored, true, "f");
      if (isAbortError(error)) {
        error = new APIUserAbortError();
      }
      if (error instanceof APIUserAbortError) {
        __classPrivateFieldSet(this, _MessageStream_aborted, true, "f");
        return this._emit("abort", error);
      }
      if (error instanceof AnthropicError) {
        return this._emit("error", error);
      }
      if (error instanceof Error) {
        const anthropicError = new AnthropicError(error.message);
        anthropicError.cause = error;
        return this._emit("error", anthropicError);
      }
      return this._emit("error", new AnthropicError(String(error)));
    });
    __classPrivateFieldSet(this, _MessageStream_connectedPromise, new Promise((resolve, reject) => {
      __classPrivateFieldSet(this, _MessageStream_resolveConnectedPromise, resolve, "f");
      __classPrivateFieldSet(this, _MessageStream_rejectConnectedPromise, reject, "f");
    }), "f");
    __classPrivateFieldSet(this, _MessageStream_endPromise, new Promise((resolve, reject) => {
      __classPrivateFieldSet(this, _MessageStream_resolveEndPromise, resolve, "f");
      __classPrivateFieldSet(this, _MessageStream_rejectEndPromise, reject, "f");
    }), "f");
    __classPrivateFieldGet(this, _MessageStream_connectedPromise, "f").catch(() => {
    });
    __classPrivateFieldGet(this, _MessageStream_endPromise, "f").catch(() => {
    });
    __classPrivateFieldSet(this, _MessageStream_params, params, "f");
    __classPrivateFieldSet(this, _MessageStream_logger, opts?.logger ?? console, "f");
  }
  get response() {
    return __classPrivateFieldGet(this, _MessageStream_response, "f");
  }
  get request_id() {
    return __classPrivateFieldGet(this, _MessageStream_request_id, "f");
  }
  /**
   * Returns the `MessageStream` data, the raw `Response` instance and the ID of the request,
   * returned vie the `request-id` header which is useful for debugging requests and resporting
   * issues to Anthropic.
   *
   * This is the same as the `APIPromise.withResponse()` method.
   *
   * This method will raise an error if you created the stream using `MessageStream.fromReadableStream`
   * as no `Response` is available.
   */
  async withResponse() {
    __classPrivateFieldSet(this, _MessageStream_catchingPromiseCreated, true, "f");
    const response = await __classPrivateFieldGet(this, _MessageStream_connectedPromise, "f");
    if (!response) {
      throw new Error("Could not resolve a `Response` object");
    }
    return {
      data: this,
      response,
      request_id: response.headers.get("request-id")
    };
  }
  /**
   * Intended for use on the frontend, consuming a stream produced with
   * `.toReadableStream()` on the backend.
   *
   * Note that messages sent to the model do not appear in `.on('message')`
   * in this context.
   */
  static fromReadableStream(stream) {
    const runner = new _MessageStream(null);
    runner._run(() => runner._fromReadableStream(stream));
    return runner;
  }
  static createMessage(messages, params, options, { logger } = {}) {
    const runner = new _MessageStream(params, { logger });
    for (const message of params.messages) {
      runner._addMessageParam(message);
    }
    __classPrivateFieldSet(runner, _MessageStream_params, { ...params, stream: true }, "f");
    runner._run(() => runner._createMessage(messages, { ...params, stream: true }, { ...options, headers: { ...options?.headers, [STAINLESS_HELPER_METHOD_HEADER]: "stream" } }));
    return runner;
  }
  _run(executor) {
    executor().then(() => {
      this._emitFinal();
      this._emit("end");
    }, __classPrivateFieldGet(this, _MessageStream_handleError, "f"));
  }
  _addMessageParam(message) {
    this.messages.push(message);
  }
  _addMessage(message, emit = true) {
    this.receivedMessages.push(message);
    if (emit) {
      this._emit("message", message);
    }
  }
  async _createMessage(messages, params, options) {
    const signal = options?.signal;
    let abortHandler;
    if (signal) {
      if (signal.aborted)
        this.controller.abort();
      abortHandler = this.controller.abort.bind(this.controller);
      signal.addEventListener("abort", abortHandler);
    }
    try {
      __classPrivateFieldGet(this, _MessageStream_instances, "m", _MessageStream_beginRequest).call(this);
      const { response, data: stream } = await messages.create({ ...params, stream: true }, { ...options, signal: this.controller.signal }).withResponse();
      this._connected(response);
      for await (const event of stream) {
        __classPrivateFieldGet(this, _MessageStream_instances, "m", _MessageStream_addStreamEvent).call(this, event);
      }
      if (stream.controller.signal?.aborted) {
        throw new APIUserAbortError();
      }
      __classPrivateFieldGet(this, _MessageStream_instances, "m", _MessageStream_endRequest).call(this);
    } finally {
      if (signal && abortHandler) {
        signal.removeEventListener("abort", abortHandler);
      }
    }
  }
  _connected(response) {
    if (this.ended)
      return;
    __classPrivateFieldSet(this, _MessageStream_response, response, "f");
    __classPrivateFieldSet(this, _MessageStream_request_id, response?.headers.get("request-id"), "f");
    __classPrivateFieldGet(this, _MessageStream_resolveConnectedPromise, "f").call(this, response);
    this._emit("connect");
  }
  get ended() {
    return __classPrivateFieldGet(this, _MessageStream_ended, "f");
  }
  get errored() {
    return __classPrivateFieldGet(this, _MessageStream_errored, "f");
  }
  get aborted() {
    return __classPrivateFieldGet(this, _MessageStream_aborted, "f");
  }
  abort() {
    this.controller.abort();
  }
  /**
   * Adds the listener function to the end of the listeners array for the event.
   * No checks are made to see if the listener has already been added. Multiple calls passing
   * the same combination of event and listener will result in the listener being added, and
   * called, multiple times.
   * @returns this MessageStream, so that calls can be chained
   */
  on(event, listener) {
    const listeners = __classPrivateFieldGet(this, _MessageStream_listeners, "f")[event] || (__classPrivateFieldGet(this, _MessageStream_listeners, "f")[event] = []);
    listeners.push({ listener });
    return this;
  }
  /**
   * Removes the specified listener from the listener array for the event.
   * off() will remove, at most, one instance of a listener from the listener array. If any single
   * listener has been added multiple times to the listener array for the specified event, then
   * off() must be called multiple times to remove each instance.
   * @returns this MessageStream, so that calls can be chained
   */
  off(event, listener) {
    const listeners = __classPrivateFieldGet(this, _MessageStream_listeners, "f")[event];
    if (!listeners)
      return this;
    const index = listeners.findIndex((l) => l.listener === listener);
    if (index >= 0)
      listeners.splice(index, 1);
    return this;
  }
  /**
   * Adds a one-time listener function for the event. The next time the event is triggered,
   * this listener is removed and then invoked.
   * @returns this MessageStream, so that calls can be chained
   */
  once(event, listener) {
    const listeners = __classPrivateFieldGet(this, _MessageStream_listeners, "f")[event] || (__classPrivateFieldGet(this, _MessageStream_listeners, "f")[event] = []);
    listeners.push({ listener, once: true });
    return this;
  }
  /**
   * This is similar to `.once()`, but returns a Promise that resolves the next time
   * the event is triggered, instead of calling a listener callback.
   * @returns a Promise that resolves the next time given event is triggered,
   * or rejects if an error is emitted.  (If you request the 'error' event,
   * returns a promise that resolves with the error).
   *
   * Example:
   *
   *   const message = await stream.emitted('message') // rejects if the stream errors
   */
  emitted(event) {
    return new Promise((resolve, reject) => {
      __classPrivateFieldSet(this, _MessageStream_catchingPromiseCreated, true, "f");
      if (event !== "error")
        this.once("error", reject);
      this.once(event, resolve);
    });
  }
  async done() {
    __classPrivateFieldSet(this, _MessageStream_catchingPromiseCreated, true, "f");
    await __classPrivateFieldGet(this, _MessageStream_endPromise, "f");
  }
  get currentMessage() {
    return __classPrivateFieldGet(this, _MessageStream_currentMessageSnapshot, "f");
  }
  /**
   * @returns a promise that resolves with the the final assistant Message response,
   * or rejects if an error occurred or the stream ended prematurely without producing a Message.
   * If structured outputs were used, this will be a ParsedMessage with a `parsed_output` field.
   */
  async finalMessage() {
    await this.done();
    return __classPrivateFieldGet(this, _MessageStream_instances, "m", _MessageStream_getFinalMessage).call(this);
  }
  /**
   * @returns a promise that resolves with the the final assistant Message's text response, concatenated
   * together if there are more than one text blocks.
   * Rejects if an error occurred or the stream ended prematurely without producing a Message.
   */
  async finalText() {
    await this.done();
    return __classPrivateFieldGet(this, _MessageStream_instances, "m", _MessageStream_getFinalText).call(this);
  }
  _emit(event, ...args) {
    if (__classPrivateFieldGet(this, _MessageStream_ended, "f"))
      return;
    if (event === "end") {
      __classPrivateFieldSet(this, _MessageStream_ended, true, "f");
      __classPrivateFieldGet(this, _MessageStream_resolveEndPromise, "f").call(this);
    }
    const listeners = __classPrivateFieldGet(this, _MessageStream_listeners, "f")[event];
    if (listeners) {
      __classPrivateFieldGet(this, _MessageStream_listeners, "f")[event] = listeners.filter((l) => !l.once);
      listeners.forEach(({ listener }) => listener(...args));
    }
    if (event === "abort") {
      const error = args[0];
      if (!__classPrivateFieldGet(this, _MessageStream_catchingPromiseCreated, "f") && !listeners?.length) {
        Promise.reject(error);
      }
      __classPrivateFieldGet(this, _MessageStream_rejectConnectedPromise, "f").call(this, error);
      __classPrivateFieldGet(this, _MessageStream_rejectEndPromise, "f").call(this, error);
      this._emit("end");
      return;
    }
    if (event === "error") {
      const error = args[0];
      if (!__classPrivateFieldGet(this, _MessageStream_catchingPromiseCreated, "f") && !listeners?.length) {
        Promise.reject(error);
      }
      __classPrivateFieldGet(this, _MessageStream_rejectConnectedPromise, "f").call(this, error);
      __classPrivateFieldGet(this, _MessageStream_rejectEndPromise, "f").call(this, error);
      this._emit("end");
    }
  }
  _emitFinal() {
    const finalMessage = this.receivedMessages.at(-1);
    if (finalMessage) {
      this._emit("finalMessage", __classPrivateFieldGet(this, _MessageStream_instances, "m", _MessageStream_getFinalMessage).call(this));
    }
  }
  async _fromReadableStream(readableStream, options) {
    const signal = options?.signal;
    let abortHandler;
    if (signal) {
      if (signal.aborted)
        this.controller.abort();
      abortHandler = this.controller.abort.bind(this.controller);
      signal.addEventListener("abort", abortHandler);
    }
    try {
      __classPrivateFieldGet(this, _MessageStream_instances, "m", _MessageStream_beginRequest).call(this);
      this._connected(null);
      const stream = Stream.fromReadableStream(readableStream, this.controller);
      for await (const event of stream) {
        __classPrivateFieldGet(this, _MessageStream_instances, "m", _MessageStream_addStreamEvent).call(this, event);
      }
      if (stream.controller.signal?.aborted) {
        throw new APIUserAbortError();
      }
      __classPrivateFieldGet(this, _MessageStream_instances, "m", _MessageStream_endRequest).call(this);
    } finally {
      if (signal && abortHandler) {
        signal.removeEventListener("abort", abortHandler);
      }
    }
  }
  [(_MessageStream_currentMessageSnapshot = /* @__PURE__ */ new WeakMap(), _MessageStream_params = /* @__PURE__ */ new WeakMap(), _MessageStream_connectedPromise = /* @__PURE__ */ new WeakMap(), _MessageStream_resolveConnectedPromise = /* @__PURE__ */ new WeakMap(), _MessageStream_rejectConnectedPromise = /* @__PURE__ */ new WeakMap(), _MessageStream_endPromise = /* @__PURE__ */ new WeakMap(), _MessageStream_resolveEndPromise = /* @__PURE__ */ new WeakMap(), _MessageStream_rejectEndPromise = /* @__PURE__ */ new WeakMap(), _MessageStream_listeners = /* @__PURE__ */ new WeakMap(), _MessageStream_ended = /* @__PURE__ */ new WeakMap(), _MessageStream_errored = /* @__PURE__ */ new WeakMap(), _MessageStream_aborted = /* @__PURE__ */ new WeakMap(), _MessageStream_catchingPromiseCreated = /* @__PURE__ */ new WeakMap(), _MessageStream_response = /* @__PURE__ */ new WeakMap(), _MessageStream_request_id = /* @__PURE__ */ new WeakMap(), _MessageStream_logger = /* @__PURE__ */ new WeakMap(), _MessageStream_handleError = /* @__PURE__ */ new WeakMap(), _MessageStream_instances = /* @__PURE__ */ new WeakSet(), _MessageStream_getFinalMessage = function _MessageStream_getFinalMessage2() {
    if (this.receivedMessages.length === 0) {
      throw new AnthropicError("stream ended without producing a Message with role=assistant");
    }
    return this.receivedMessages.at(-1);
  }, _MessageStream_getFinalText = function _MessageStream_getFinalText2() {
    if (this.receivedMessages.length === 0) {
      throw new AnthropicError("stream ended without producing a Message with role=assistant");
    }
    const textBlocks = this.receivedMessages.at(-1).content.filter((block) => block.type === "text").map((block) => block.text);
    if (textBlocks.length === 0) {
      throw new AnthropicError("stream ended without producing a content block with type=text");
    }
    return textBlocks.join(" ");
  }, _MessageStream_beginRequest = function _MessageStream_beginRequest2() {
    if (this.ended)
      return;
    __classPrivateFieldSet(this, _MessageStream_currentMessageSnapshot, void 0, "f");
  }, _MessageStream_addStreamEvent = function _MessageStream_addStreamEvent2(event) {
    if (this.ended)
      return;
    const messageSnapshot = __classPrivateFieldGet(this, _MessageStream_instances, "m", _MessageStream_accumulateMessage).call(this, event);
    this._emit("streamEvent", event, messageSnapshot);
    switch (event.type) {
      case "content_block_delta": {
        const content = messageSnapshot.content.at(-1);
        switch (event.delta.type) {
          case "text_delta": {
            if (content.type === "text") {
              this._emit("text", event.delta.text, content.text || "");
            }
            break;
          }
          case "citations_delta": {
            if (content.type === "text") {
              this._emit("citation", event.delta.citation, content.citations ?? []);
            }
            break;
          }
          case "input_json_delta": {
            if (tracksToolInput2(content) && __classPrivateFieldGet(this, _MessageStream_listeners, "f").inputJson?.length) {
              this._emit("inputJson", event.delta.partial_json, content.input);
            }
            break;
          }
          case "thinking_delta": {
            if (content.type === "thinking") {
              this._emit("thinking", event.delta.thinking, content.thinking);
            }
            break;
          }
          case "signature_delta": {
            if (content.type === "thinking") {
              this._emit("signature", content.signature);
            }
            break;
          }
          default:
            checkNever2(event.delta);
        }
        break;
      }
      case "message_stop": {
        this._addMessageParam(messageSnapshot);
        this._addMessage(maybeParseMessage(messageSnapshot, __classPrivateFieldGet(this, _MessageStream_params, "f"), { logger: __classPrivateFieldGet(this, _MessageStream_logger, "f") }), true);
        break;
      }
      case "content_block_stop": {
        this._emit("contentBlock", messageSnapshot.content.at(-1));
        break;
      }
      case "message_start": {
        __classPrivateFieldSet(this, _MessageStream_currentMessageSnapshot, messageSnapshot, "f");
        break;
      }
      case "content_block_start":
      case "message_delta":
        break;
    }
  }, _MessageStream_endRequest = function _MessageStream_endRequest2() {
    if (this.ended) {
      throw new AnthropicError(`stream has ended, this shouldn't happen`);
    }
    const snapshot = __classPrivateFieldGet(this, _MessageStream_currentMessageSnapshot, "f");
    if (!snapshot) {
      throw new AnthropicError(`request ended without sending any chunks`);
    }
    __classPrivateFieldSet(this, _MessageStream_currentMessageSnapshot, void 0, "f");
    return maybeParseMessage(snapshot, __classPrivateFieldGet(this, _MessageStream_params, "f"), { logger: __classPrivateFieldGet(this, _MessageStream_logger, "f") });
  }, _MessageStream_accumulateMessage = function _MessageStream_accumulateMessage2(event) {
    let snapshot = __classPrivateFieldGet(this, _MessageStream_currentMessageSnapshot, "f");
    if (event.type === "message_start") {
      if (snapshot) {
        throw new AnthropicError(`Unexpected event order, got ${event.type} before receiving "message_stop"`);
      }
      return event.message;
    }
    if (!snapshot) {
      throw new AnthropicError(`Unexpected event order, got ${event.type} before "message_start"`);
    }
    switch (event.type) {
      case "message_stop":
        return snapshot;
      case "message_delta":
        snapshot.stop_reason = event.delta.stop_reason;
        snapshot.stop_sequence = event.delta.stop_sequence;
        if (event.delta.stop_details != null) {
          snapshot.stop_details = event.delta.stop_details;
        }
        snapshot.usage.output_tokens = event.usage.output_tokens;
        if (event.usage.input_tokens != null) {
          snapshot.usage.input_tokens = event.usage.input_tokens;
        }
        if (event.usage.cache_creation_input_tokens != null) {
          snapshot.usage.cache_creation_input_tokens = event.usage.cache_creation_input_tokens;
        }
        if (event.usage.cache_read_input_tokens != null) {
          snapshot.usage.cache_read_input_tokens = event.usage.cache_read_input_tokens;
        }
        if (event.usage.server_tool_use != null) {
          snapshot.usage.server_tool_use = event.usage.server_tool_use;
        }
        return snapshot;
      case "content_block_start":
        snapshot.content.push({ ...event.content_block });
        return snapshot;
      case "content_block_delta": {
        const snapshotContent = snapshot.content.at(event.index);
        switch (event.delta.type) {
          case "text_delta": {
            if (snapshotContent?.type === "text") {
              snapshot.content[event.index] = {
                ...snapshotContent,
                text: (snapshotContent.text || "") + event.delta.text
              };
            }
            break;
          }
          case "citations_delta": {
            if (snapshotContent?.type === "text") {
              snapshot.content[event.index] = {
                ...snapshotContent,
                citations: [...snapshotContent.citations ?? [], event.delta.citation]
              };
            }
            break;
          }
          case "input_json_delta": {
            if (snapshotContent && tracksToolInput2(snapshotContent)) {
              const jsonBuf = (snapshotContent[JSON_BUF_PROPERTY] || "") + event.delta.partial_json;
              snapshot.content[event.index] = withLazyInput(snapshotContent, jsonBuf);
            }
            break;
          }
          case "thinking_delta": {
            if (snapshotContent?.type === "thinking") {
              snapshot.content[event.index] = {
                ...snapshotContent,
                thinking: snapshotContent.thinking + event.delta.thinking
              };
            }
            break;
          }
          case "signature_delta": {
            if (snapshotContent?.type === "thinking") {
              snapshot.content[event.index] = {
                ...snapshotContent,
                signature: event.delta.signature
              };
            }
            break;
          }
          default:
            checkNever2(event.delta);
        }
        return snapshot;
      }
      case "content_block_stop": {
        const snapshotContent = snapshot.content.at(event.index);
        if (snapshotContent && tracksToolInput2(snapshotContent) && JSON_BUF_PROPERTY in snapshotContent) {
          Object.defineProperty(snapshotContent, "input", {
            value: snapshotContent.input,
            enumerable: true,
            configurable: true,
            writable: true
          });
        }
        return snapshot;
      }
    }
  }, Symbol.asyncIterator)]() {
    const pushQueue = [];
    const readQueue = [];
    let done = false;
    this.on("streamEvent", (event) => {
      const reader = readQueue.shift();
      if (reader) {
        reader.resolve(event);
      } else {
        pushQueue.push(event);
      }
    });
    this.on("end", () => {
      done = true;
      for (const reader of readQueue) {
        reader.resolve(void 0);
      }
      readQueue.length = 0;
    });
    this.on("abort", (err) => {
      done = true;
      for (const reader of readQueue) {
        reader.reject(err);
      }
      readQueue.length = 0;
    });
    this.on("error", (err) => {
      done = true;
      for (const reader of readQueue) {
        reader.reject(err);
      }
      readQueue.length = 0;
    });
    return {
      next: async () => {
        if (!pushQueue.length) {
          if (done) {
            return { value: void 0, done: true };
          }
          return new Promise((resolve, reject) => readQueue.push({ resolve, reject })).then((chunk2) => chunk2 ? { value: chunk2, done: false } : { value: void 0, done: true });
        }
        const chunk = pushQueue.shift();
        return { value: chunk, done: false };
      },
      return: async () => {
        this.abort();
        return { value: void 0, done: true };
      }
    };
  }
  toReadableStream() {
    const stream = new Stream(this[Symbol.asyncIterator].bind(this), this.controller);
    return stream.toReadableStream();
  }
};
function checkNever2(x) {
}

// node_modules/@anthropic-ai/sdk/resources/messages/batches.mjs
var Batches2 = class extends APIResource {
  /**
   * Send a batch of Message creation requests.
   *
   * The Message Batches API can be used to process multiple Messages API requests at
   * once. Once a Message Batch is created, it begins processing immediately. Batches
   * can take up to 24 hours to complete.
   *
   * Learn more about the Message Batches API in our
   * [user guide](https://platform.claude.com/docs/en/build-with-claude/batch-processing)
   *
   * @example
   * ```ts
   * const messageBatch = await client.messages.batches.create({
   *   requests: [
   *     {
   *       custom_id: 'my-custom-id-1',
   *       params: {
   *         max_tokens: 1024,
   *         messages: [
   *           { content: 'Hello, world', role: 'user' },
   *         ],
   *         model: 'claude-opus-4-6',
   *       },
   *     },
   *   ],
   * });
   * ```
   */
  create(params, options) {
    const { user_profile_id, ...body } = params;
    return this._client.post("/v1/messages/batches", {
      body,
      ...options,
      headers: buildHeaders([
        { ...user_profile_id != null ? { "anthropic-user-profile-id": user_profile_id } : void 0 },
        options?.headers
      ])
    });
  }
  /**
   * This endpoint is idempotent and can be used to poll for Message Batch
   * completion. To access the results of a Message Batch, make a request to the
   * `results_url` field in the response.
   *
   * Learn more about the Message Batches API in our
   * [user guide](https://platform.claude.com/docs/en/build-with-claude/batch-processing)
   *
   * @example
   * ```ts
   * const messageBatch = await client.messages.batches.retrieve(
   *   'message_batch_id',
   * );
   * ```
   */
  retrieve(messageBatchID, options) {
    return this._client.get(path`/v1/messages/batches/${messageBatchID}`, options);
  }
  /**
   * List all Message Batches within a Workspace. Most recently created batches are
   * returned first.
   *
   * Learn more about the Message Batches API in our
   * [user guide](https://platform.claude.com/docs/en/build-with-claude/batch-processing)
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const messageBatch of client.messages.batches.list()) {
   *   // ...
   * }
   * ```
   */
  list(query = {}, options) {
    return this._client.getAPIList("/v1/messages/batches", Page, { query, ...options });
  }
  /**
   * Delete a Message Batch.
   *
   * Message Batches can only be deleted once they've finished processing. If you'd
   * like to delete an in-progress batch, you must first cancel it.
   *
   * Learn more about the Message Batches API in our
   * [user guide](https://platform.claude.com/docs/en/build-with-claude/batch-processing)
   *
   * @example
   * ```ts
   * const deletedMessageBatch =
   *   await client.messages.batches.delete('message_batch_id');
   * ```
   */
  delete(messageBatchID, options) {
    return this._client.delete(path`/v1/messages/batches/${messageBatchID}`, options);
  }
  /**
   * Batches may be canceled any time before processing ends. Once cancellation is
   * initiated, the batch enters a `canceling` state, at which time the system may
   * complete any in-progress, non-interruptible requests before finalizing
   * cancellation.
   *
   * The number of canceled requests is specified in `request_counts`. To determine
   * which requests were canceled, check the individual results within the batch.
   * Note that cancellation may not result in any canceled requests if they were
   * non-interruptible.
   *
   * Learn more about the Message Batches API in our
   * [user guide](https://platform.claude.com/docs/en/build-with-claude/batch-processing)
   *
   * @example
   * ```ts
   * const messageBatch = await client.messages.batches.cancel(
   *   'message_batch_id',
   * );
   * ```
   */
  cancel(messageBatchID, options) {
    return this._client.post(path`/v1/messages/batches/${messageBatchID}/cancel`, options);
  }
  /**
   * Streams the results of a Message Batch as a `.jsonl` file.
   *
   * Each line in the file is a JSON object containing the result of a single request
   * in the Message Batch. Results are not guaranteed to be in the same order as
   * requests. Use the `custom_id` field to match results to requests.
   *
   * Learn more about the Message Batches API in our
   * [user guide](https://platform.claude.com/docs/en/build-with-claude/batch-processing)
   *
   * @example
   * ```ts
   * const messageBatchIndividualResponse =
   *   await client.messages.batches.results('message_batch_id');
   * ```
   */
  async results(messageBatchID, options) {
    const batch = await this.retrieve(messageBatchID);
    if (!batch.results_url) {
      throw new AnthropicError(`No batch \`results_url\`; Has it finished processing? ${batch.processing_status} - ${batch.id}`);
    }
    return this._client.get(batch.results_url, {
      ...options,
      headers: buildHeaders([{ Accept: "application/binary" }, options?.headers]),
      stream: true,
      __binaryResponse: true
    })._thenUnwrap((_, props) => JSONLDecoder.fromResponse(props.response, props.controller));
  }
};

// node_modules/@anthropic-ai/sdk/resources/messages/messages.mjs
var Messages2 = class extends APIResource {
  constructor() {
    super(...arguments);
    this.batches = new Batches2(this._client);
  }
  create(params, options) {
    const { user_profile_id, ...body } = params;
    if (body.model in DEPRECATED_MODELS2) {
      console.warn(`The model '${body.model}' is deprecated and will reach end-of-life on ${DEPRECATED_MODELS2[body.model]}
Please migrate to a newer model. Visit https://docs.anthropic.com/en/docs/resources/model-deprecations for more information.`);
    }
    if (MODELS_TO_WARN_WITH_THINKING_ENABLED2.includes(body.model) && body.thinking && body.thinking.type === "enabled") {
      console.warn(`Using Claude with ${body.model} and 'thinking.type=enabled' is deprecated. Use 'thinking.type=adaptive' instead which results in better model performance in our testing: https://platform.claude.com/docs/en/build-with-claude/adaptive-thinking`);
    }
    let timeout = this._client._options.timeout;
    if (!body.stream && timeout == null) {
      const maxNonstreamingTokens = MODEL_NONSTREAMING_TOKENS[body.model] ?? void 0;
      timeout = this._client.calculateNonstreamingTimeout(body.max_tokens, maxNonstreamingTokens);
    }
    const helperHeader2 = stainlessHelperHeader(body.tools, body.messages);
    return this._client.post("/v1/messages", {
      body,
      timeout: timeout ?? 6e5,
      ...options,
      headers: buildHeaders([
        { ...user_profile_id != null ? { "anthropic-user-profile-id": user_profile_id } : void 0 },
        helperHeader2,
        options?.headers
      ]),
      stream: params.stream ?? false
    });
  }
  /**
   * Send a structured list of input messages with text and/or image content, along with an expected `output_config.format` and
   * the response will be automatically parsed and available in the `parsed_output` property of the message.
   *
   * @example
   * ```ts
   * const message = await client.messages.parse({
   *   model: 'claude-sonnet-4-5-20250929',
   *   max_tokens: 1024,
   *   messages: [{ role: 'user', content: 'What is 2+2?' }],
   *   output_config: {
   *     format: zodOutputFormat(z.object({ answer: z.number() })),
   *   },
   * });
   *
   * console.log(message.parsed_output?.answer); // 4
   * ```
   */
  parse(params, options) {
    return this.create(params, options).then((message) => parseMessage(message, params, { logger: this._client.logger ?? console }));
  }
  /**
   * Create a Message stream.
   *
   * If `output_config.format` is provided with a parseable format (like `zodOutputFormat()`),
   * the final message will include a `parsed_output` property with the parsed content.
   *
   * @example
   * ```ts
   * const stream = client.messages.stream({
   *   model: 'claude-sonnet-4-5-20250929',
   *   max_tokens: 1024,
   *   messages: [{ role: 'user', content: 'What is 2+2?' }],
   *   output_config: {
   *     format: zodOutputFormat(z.object({ answer: z.number() })),
   *   },
   * });
   *
   * const message = await stream.finalMessage();
   * console.log(message.parsed_output?.answer); // 4
   * ```
   */
  stream(body, options) {
    return MessageStream.createMessage(this, body, options, { logger: this._client.logger ?? console });
  }
  /**
   * Count the number of tokens in a Message.
   *
   * The Token Count API can be used to count the number of tokens in a Message,
   * including tools, images, and documents, without creating it.
   *
   * Learn more about token counting in our
   * [user guide](https://platform.claude.com/docs/en/build-with-claude/token-counting)
   *
   * @example
   * ```ts
   * const messageTokensCount =
   *   await client.messages.countTokens({
   *     messages: [{ content: 'Hello, world', role: 'user' }],
   *     model: 'claude-opus-4-6',
   *   });
   * ```
   */
  countTokens(params, options) {
    const { user_profile_id, ...body } = params;
    return this._client.post("/v1/messages/count_tokens", {
      body,
      ...options,
      headers: buildHeaders([
        { ...user_profile_id != null ? { "anthropic-user-profile-id": user_profile_id } : void 0 },
        options?.headers
      ])
    });
  }
};
var DEPRECATED_MODELS2 = {
  "claude-1.3": "November 6th, 2024",
  "claude-1.3-100k": "November 6th, 2024",
  "claude-instant-1.1": "November 6th, 2024",
  "claude-instant-1.1-100k": "November 6th, 2024",
  "claude-instant-1.2": "November 6th, 2024",
  "claude-3-sonnet-20240229": "July 21st, 2025",
  "claude-3-opus-20240229": "January 5th, 2026",
  "claude-2.1": "July 21st, 2025",
  "claude-2.0": "July 21st, 2025",
  "claude-3-7-sonnet-latest": "February 19th, 2026",
  "claude-3-7-sonnet-20250219": "February 19th, 2026",
  "claude-3-5-haiku-latest": "February 19th, 2026",
  "claude-3-5-haiku-20241022": "February 19th, 2026",
  "claude-opus-4-0": "June 15th, 2026",
  "claude-opus-4-20250514": "June 15th, 2026",
  "claude-sonnet-4-0": "June 15th, 2026",
  "claude-sonnet-4-20250514": "June 15th, 2026",
  "claude-opus-4-1": "August 5th, 2026",
  "claude-opus-4-1-20250805": "August 5th, 2026",
  "claude-mythos-preview": "June 30th, 2026"
};
var MODELS_TO_WARN_WITH_THINKING_ENABLED2 = ["claude-mythos-preview", "claude-opus-4-6"];
Messages2.Batches = Batches2;

// node_modules/@anthropic-ai/sdk/resources/models.mjs
var Models2 = class extends APIResource {
  /**
   * Get a specific model.
   *
   * The Models API response can be used to determine information about a specific
   * model or resolve a model alias to a model ID.
   */
  retrieve(modelID, params = {}, options) {
    const { betas } = params ?? {};
    return this._client.get(path`/v1/models/${modelID}`, {
      ...options,
      headers: buildHeaders([
        { ...betas?.toString() != null ? { "anthropic-beta": betas?.toString() } : void 0 },
        options?.headers
      ])
    });
  }
  /**
   * List available models.
   *
   * The Models API response can be used to determine which models are available for
   * use in the API. More recently released models are listed first.
   */
  list(params = {}, options) {
    const { betas, ...query } = params ?? {};
    return this._client.getAPIList("/v1/models", Page, {
      query,
      ...options,
      headers: buildHeaders([
        { ...betas?.toString() != null ? { "anthropic-beta": betas?.toString() } : void 0 },
        options?.headers
      ])
    });
  }
};

// node_modules/@anthropic-ai/sdk/client.mjs
var _BaseAnthropic_instances;
var _a;
var _BaseAnthropic_encoder;
var _BaseAnthropic_baseURLOverridden;
var HUMAN_PROMPT = "\\n\\nHuman:";
var AI_PROMPT = "\\n\\nAssistant:";
var BaseAnthropic = class {
  /**
   * The active credential provider. Default credential resolution runs once
   * at construction time. If it fails, the error is surfaced on every
   * request and the client must be reconstructed — there is no retry path.
   *
   * Clones returned by {@link withOptions} share the parent's auth state
   * (provider, token cache, pending resolution, and any resolution error)
   * unless the caller passes an explicit `apiKey`, `authToken`,
   * `credentials`, `config`, or `profile` override.
   */
  get credentials() {
    return this._authState.provider;
  }
  /**
   * API Client for interfacing with the Anthropic API.
   *
   * @param {string | null | undefined} [opts.apiKey=process.env['ANTHROPIC_API_KEY'] ?? null]
   * @param {string | null | undefined} [opts.authToken=process.env['ANTHROPIC_AUTH_TOKEN'] ?? null]
   * @param {string | null | undefined} [opts.webhookKey=process.env['ANTHROPIC_WEBHOOK_SIGNING_KEY'] ?? null]
   * @param {string} [opts.baseURL=process.env['ANTHROPIC_BASE_URL'] ?? https://api.anthropic.com] - Override the default base URL for the API.
   * @param {number} [opts.timeout=10 minutes] - The maximum amount of time (in milliseconds) the client will wait for a response before timing out.
   * @param {MergedRequestInit} [opts.fetchOptions] - Additional `RequestInit` options to be passed to `fetch` calls.
   * @param {Fetch} [opts.fetch] - Specify a custom `fetch` function implementation.
   * @param {number} [opts.maxRetries=2] - The maximum number of times the client will retry a request.
   * @param {HeadersLike} opts.defaultHeaders - Default headers to include with every request to the API.
   * @param {Record<string, string | undefined>} opts.defaultQuery - Default query parameters to include with every request to the API.
   * @param {boolean} [opts.dangerouslyAllowBrowser=false] - By default, client-side use of this library is not allowed, as it risks exposing your secret API credentials to attackers.
   */
  constructor({ baseURL = readEnv("ANTHROPIC_BASE_URL"), apiKey, authToken, webhookKey = readEnv("ANTHROPIC_WEBHOOK_SIGNING_KEY") ?? null, ...opts } = {}) {
    _BaseAnthropic_instances.add(this);
    this._requestAuthFlags = /* @__PURE__ */ new WeakMap();
    _BaseAnthropic_encoder.set(this, void 0);
    if (apiKey === void 0) {
      apiKey = opts.profile != null ? null : readEnv("ANTHROPIC_API_KEY") ?? null;
    }
    if (authToken === void 0) {
      authToken = opts.profile != null ? null : readEnv("ANTHROPIC_AUTH_TOKEN") ?? null;
    }
    if (opts.profile != null && (opts.credentials != null || opts.config != null)) {
      throw new TypeError("Pass at most one of `profile`, `credentials`, or `config`.");
    }
    const options = {
      apiKey,
      authToken,
      webhookKey,
      ...opts,
      baseURL: baseURL || `https://api.anthropic.com`
    };
    if (!options.dangerouslyAllowBrowser && isRunningInBrowser()) {
      throw new AnthropicError("It looks like you're running in a browser-like environment.\n\nThis is disabled by default, as it risks exposing your secret API credentials to attackers.\nIf you understand the risks and have appropriate mitigations in place,\nyou can set the `dangerouslyAllowBrowser` option to `true`, e.g.,\n\nnew Anthropic({ apiKey, dangerouslyAllowBrowser: true });\n");
    }
    this.baseURL = options.baseURL;
    this._baseURLIsExplicit = opts.__baseURLIsExplicit ?? !!baseURL;
    this.timeout = options.timeout ?? _a.DEFAULT_TIMEOUT;
    this.logger = options.logger ?? console;
    this.logLevel = defaultLogLevel;
    this.logLevel = parseLogLevel(options.logLevel, "ClientOptions.logLevel", loggerFor(this)) ?? parseLogLevel(readEnv("ANTHROPIC_LOG"), "process.env['ANTHROPIC_LOG']", loggerFor(this)) ?? defaultLogLevel;
    this.fetchOptions = options.fetchOptions;
    this.maxRetries = options.maxRetries ?? 2;
    this.fetch = options.fetch ?? getDefaultFetch();
    __classPrivateFieldSet(this, _BaseAnthropic_encoder, FallbackEncoder, "f");
    this.middleware = [...options.middleware ?? []];
    const customHeadersEnv = readEnv("ANTHROPIC_CUSTOM_HEADERS");
    if (customHeadersEnv) {
      const parsed = {};
      for (const line of customHeadersEnv.split("\n")) {
        const colon = line.indexOf(":");
        if (colon >= 0) {
          parsed[line.substring(0, colon).trim()] = line.substring(colon + 1).trim();
        }
      }
      options.defaultHeaders = { ...parsed, ...options.defaultHeaders };
    }
    const inherited = opts.__auth;
    delete options.__auth;
    delete options.__baseURLIsExplicit;
    this._options = options;
    this.apiKey = typeof apiKey === "string" ? apiKey : null;
    this.authToken = authToken;
    this.webhookKey = webhookKey;
    if (inherited) {
      this._authState = inherited;
      if (!this._baseURLIsExplicit && inherited.baseURL) {
        this.baseURL = inherited.baseURL;
      }
    } else {
      this._authState = { provider: null, tokenCache: null, resolution: null, error: null, extraHeaders: {} };
      if (this.apiKey == null && this.authToken == null) {
        const credentials = options.credentials ?? null;
        if (credentials) {
          this._authState.provider = credentials;
          this._authState.tokenCache = this._makeTokenCache(credentials);
        } else if (options.config != null) {
          const result = resolveCredentialsFromConfig(options.config, this._credentialResolverOptions());
          this._authState.provider = result.provider;
          this._authState.tokenCache = this._makeTokenCache(result.provider);
          this._authState.extraHeaders = result.extraHeaders;
          this._applyCredentialBaseURL(result.baseURL);
        } else if (options.profile != null) {
          this._authState.resolution = this._resolveDefaultCredentials(options.profile);
        } else {
          this._authState.resolution = this._resolveDefaultCredentials();
        }
      }
    }
  }
  /**
   * Stores a profile/config-supplied base URL on the shared auth state and, if
   * the caller did not pin `baseURL` via constructor option or env, adopts it
   * as this client's outbound API host. Precedence: ctor opt > env > profile >
   * hardcoded default.
   */
  _applyCredentialBaseURL(baseURL) {
    if (!baseURL)
      return;
    const normalized = baseURL.replace(/\/+$/, "");
    this._authState.baseURL = normalized;
    if (!this._baseURLIsExplicit) {
      this.baseURL = normalized;
    }
  }
  /**
   * Options bag passed into the credential chain. `baseURL` here is only the
   * fallback host for the token-exchange POST when the config itself omits
   * `base_url`; the chain returns the config's own `base_url` (if any) on
   * {@link CredentialResult.baseURL}, which {@link _applyCredentialBaseURL}
   * then adopts for outbound API requests. The two are deliberately decoupled
   * so this fallback never round-trips into precedence.
   */
  _credentialResolverOptions() {
    return {
      baseURL: this.baseURL,
      fetch: this._credentialsFetch(),
      userAgent: this.getUserAgent(),
      onCacheWriteError: (err) => {
        loggerFor(this).debug("credential cache write failed (best-effort)", err);
      },
      onSafetyWarning: (msg) => {
        loggerFor(this).warn(msg);
      }
    };
  }
  /**
   * A `Fetch` for first-party credential token-exchange requests (OIDC
   * federation jwt-bearer grants, user-OAuth refresh grants) that routes
   * through this client's middleware chain, so middleware observes token
   * traffic like any other request. Only client-level middleware applies:
   * a minted token is shared across requests, so attributing the exchange
   * to any one request's per-request middleware would be arbitrary. For the
   * same reason, `ctx.options` is undefined for these requests.
   */
  _credentialsFetch() {
    return wrapFetchWithMiddleware(this.fetch, this.middleware, void 0, this);
  }
  _makeTokenCache(provider) {
    return new TokenCache(provider, (err) => {
      loggerFor(this).debug("advisory token refresh failed; serving cached token", err);
    });
  }
  /**
   * Create a new client instance re-using the same options given to the current client with optional overriding.
   */
  withOptions(options) {
    const overridesStructuredAuth = "credentials" in options || "config" in options || "profile" in options;
    const overridesAuth = "apiKey" in options || "authToken" in options || overridesStructuredAuth;
    const internal = {
      ...this._options,
      // Only forward baseURL when the caller (or env) explicitly chose it.
      // For a non-explicit parent, this.baseURL may have been mutated to the
      // profile-resolved host; pinning that as the clone's options.baseURL
      // would make _options on the clone misreport caller intent and would
      // leave the clone stuck on the parent's host across an auth override.
      // The clone instead receives the construction-time value via
      // ...this._options above and re-adopts the profile host through the
      // shared _authState.baseURL + __baseURLIsExplicit=false path.
      ...this._baseURLIsExplicit ? { baseURL: this.baseURL } : {},
      maxRetries: this.maxRetries,
      timeout: this.timeout,
      logger: this.logger,
      logLevel: this.logLevel,
      fetch: this.fetch,
      fetchOptions: this.fetchOptions,
      middleware: this.middleware,
      apiKey: this.apiKey,
      authToken: this.authToken,
      webhookKey: this.webhookKey,
      // credentials: this.credentials is a no-op when __auth is shared (the
      // ctor takes the inherited path and ignores options.credentials); when
      // overridesAuth is true via apiKey/authToken only, it lets the clone
      // build a fresh TokenCache around the parent's provider.
      credentials: this.credentials,
      // When the caller passes a structured-credential override, drop inherited
      // structured-credential options so only `...options` supplies them —
      // otherwise an inherited `credentials`/`config`/`profile` would trip the
      // mutual-exclusion check or precedence over the override.
      ...overridesStructuredAuth ? { credentials: void 0, config: void 0, profile: void 0 } : {},
      ...options,
      // Always set __auth so any stale value from ...this._options is
      // overwritten. undefined means "build fresh auth from these options".
      __auth: overridesAuth ? void 0 : this._authState,
      __baseURLIsExplicit: "baseURL" in options ? true : this._baseURLIsExplicit
    };
    return new this.constructor(internal);
  }
  /**
   * Lazily resolves credentials from config files or environment variables.
   * Called once from the constructor when no explicit auth is provided, or
   * when an explicit `profile` was passed (in which case a missing/unresolved
   * profile is surfaced as an error instead of falling through to "no auth").
   * The returned promise is stored and awaited on the first request.
   */
  async _resolveDefaultCredentials(profile) {
    try {
      const result = await defaultCredentials(this._credentialResolverOptions(), profile);
      if (result) {
        this._authState.provider = result.provider;
        this._authState.tokenCache = this._makeTokenCache(result.provider);
        this._authState.extraHeaders = result.extraHeaders;
        this._applyCredentialBaseURL(result.baseURL);
      } else if (profile != null) {
        throw new AnthropicError(`Profile "${profile}" could not be resolved (no <config_dir>/configs/${profile}.json found).`);
      }
    } catch (err) {
      this._authState.error = err;
    } finally {
      this._authState.resolution = null;
    }
  }
  defaultQuery() {
    return this._options.defaultQuery;
  }
  validateHeaders({ values, nulls }) {
    if (values.get("x-api-key") || values.get("authorization")) {
      return;
    }
    if (this._authState.error) {
      throw this._authState.error;
    }
    if (this._authState.tokenCache || this._authState.resolution) {
      return;
    }
    if (this.apiKey && values.get("x-api-key")) {
      return;
    }
    if (nulls.has("x-api-key")) {
      return;
    }
    if (this.authToken && values.get("authorization")) {
      return;
    }
    if (nulls.has("authorization")) {
      return;
    }
    throw new Error('Could not resolve authentication method. Expected one of apiKey, authToken, credentials, config, or profile to be set. Or for one of the "X-Api-Key" or "Authorization" headers to be explicitly omitted');
  }
  _authFlags(opts) {
    let flags = this._requestAuthFlags.get(opts);
    if (!flags) {
      flags = { usedTokenCache: false, didRefreshFor401: false };
      this._requestAuthFlags.set(opts, flags);
    }
    return flags;
  }
  async authHeaders(opts) {
    if (this._authState.resolution) {
      await this._authState.resolution;
    }
    if (this._authState.error) {
      return void 0;
    }
    if (this._authState.tokenCache && this.apiKey == null) {
      const token = await this._authState.tokenCache.getToken();
      this._authFlags(opts).usedTokenCache = true;
      return buildHeaders([{ Authorization: `Bearer ${token}` }]);
    }
    return buildHeaders([await this.apiKeyAuth(opts), await this.bearerAuth(opts)]);
  }
  async apiKeyAuth(opts) {
    if (this.apiKey == null) {
      return void 0;
    }
    return buildHeaders([{ "X-Api-Key": this.apiKey }]);
  }
  async bearerAuth(opts) {
    if (this.authToken == null) {
      return void 0;
    }
    return buildHeaders([{ Authorization: `Bearer ${this.authToken}` }]);
  }
  stringifyQuery(query) {
    return stringifyQuery(query);
  }
  getUserAgent() {
    return `${this.constructor.name}/JS ${VERSION}`;
  }
  defaultIdempotencyKey() {
    return `stainless-node-retry-${uuid4()}`;
  }
  makeStatusError(status, error, message, headers) {
    return APIError.generate(status, error, message, headers);
  }
  buildURL(path2, query, defaultBaseURL) {
    const baseURL = !__classPrivateFieldGet(this, _BaseAnthropic_instances, "m", _BaseAnthropic_baseURLOverridden).call(this) && defaultBaseURL || this.baseURL;
    const url = isAbsoluteURL(path2) ? new URL(path2) : new URL(baseURL + (baseURL.endsWith("/") && path2.startsWith("/") ? path2.slice(1) : path2));
    const defaultQuery = this.defaultQuery();
    const pathQuery = Object.fromEntries(url.searchParams);
    if (!isEmptyObj(defaultQuery) || !isEmptyObj(pathQuery)) {
      query = { ...pathQuery, ...defaultQuery, ...query };
    }
    if (typeof query === "object" && query && !Array.isArray(query)) {
      url.search = this.stringifyQuery(query);
    }
    return url.toString();
  }
  _calculateNonstreamingTimeout(maxTokens) {
    const defaultTimeout = 10 * 60;
    const expectedTimeout = 60 * 60 * maxTokens / 128e3;
    if (expectedTimeout > defaultTimeout) {
      throw new AnthropicError("Streaming is required for operations that may take longer than 10 minutes. See https://github.com/anthropics/anthropic-sdk-typescript#streaming-responses for more details");
    }
    return defaultTimeout * 1e3;
  }
  /**
   * Used as a callback for mutating the given `FinalRequestOptions` object.
   */
  async prepareOptions(options) {
  }
  /**
   * Used as a callback for mutating the given `RequestInit` object.
   *
   * This is useful for cases where you want to add certain headers based off of
   * the request properties, e.g. `method` or `url`.
   *
   * Runs after all middleware (including {@link backendMiddleware}),
   * immediately before each underlying fetch call, so it sees exactly what
   * goes over the wire. Middleware may replay a request by calling `next()`
   * more than once, so this hook can run multiple times per attempt:
   * overrides must be idempotent and overwrite headers from a previous
   * invocation rather than append to them.
   */
  async prepareRequest(request, { url, options }) {
    if (this._authState.tokenCache && this.apiKey == null) {
      const headers = request.headers instanceof Headers ? request.headers : new Headers(request.headers);
      for (const [k, v] of Object.entries(this._authState.extraHeaders)) {
        if (!headers.has(k))
          headers.set(k, v);
      }
      const existing = headers.get("anthropic-beta")?.split(",").map((s) => s.trim());
      if (!existing?.includes(OAUTH_API_BETA_HEADER)) {
        headers.append("anthropic-beta", OAUTH_API_BETA_HEADER);
      }
      request.headers = headers;
    }
  }
  /**
   * Internal {@link Middleware} composed innermost in the chain — inside both
   * client-level and per-request middleware, immediately around the underlying
   * `fetch`. Subclasses for third-party backends override this to adapt the
   * canonical Anthropic-shaped request to the backend's wire shape (URL/body
   * rewriting, request signing) and to normalize the wire response back to the
   * canonical shape (e.g. AWS EventStream to SSE).
   *
   * Running inside the user's middleware means user middleware always observes
   * canonical Anthropic-shaped traffic, and the adaptation re-runs (e.g.
   * re-signs) on every `next()` invocation, covering whatever the middleware
   * mutated.
   *
   * Errors thrown here follow the middleware error policy: they propagate to
   * the caller as-is — no retries, no `APIConnectionError` wrapping — unless
   * retryable (see {@link Middleware}); throw a `RetryableError` to opt into
   * the retry path.
   */
  backendMiddleware() {
    return [];
  }
  get(path2, opts) {
    return this.methodRequest("get", path2, opts);
  }
  post(path2, opts) {
    return this.methodRequest("post", path2, opts);
  }
  patch(path2, opts) {
    return this.methodRequest("patch", path2, opts);
  }
  put(path2, opts) {
    return this.methodRequest("put", path2, opts);
  }
  delete(path2, opts) {
    return this.methodRequest("delete", path2, opts);
  }
  methodRequest(method, path2, opts) {
    return this.request(Promise.resolve(opts).then((opts2) => {
      return { method, path: path2, ...opts2 };
    }));
  }
  request(options, remainingRetries = null) {
    return new APIPromise(this, this.makeRequest(options, remainingRetries, void 0));
  }
  async makeRequest(optionsInput, retriesRemaining, retryOfRequestLogID) {
    const options = await optionsInput;
    const maxRetries = options.maxRetries ?? this.maxRetries;
    if (retriesRemaining == null) {
      retriesRemaining = maxRetries;
      this._requestAuthFlags.delete(options);
    }
    await this.prepareOptions(options);
    const { req, url, timeout } = await this.buildRequest(options, {
      retryCount: maxRetries - retriesRemaining
    });
    const requestLogID = "log_" + (Math.random() * (1 << 24) | 0).toString(16).padStart(6, "0");
    const retryLogStr = retryOfRequestLogID === void 0 ? "" : `, retryOf: ${retryOfRequestLogID}`;
    const startTime = Date.now();
    if (options.signal?.aborted) {
      throw new APIUserAbortError();
    }
    const controller = new AbortController();
    const response = await this.fetchWithTimeout(url, req, timeout, controller, options, {
      requestLogID,
      retryOfRequestLogID
    }).catch(castToError);
    const headersTime = Date.now();
    if (response instanceof globalThis.Error) {
      const retryMessage = `retrying, ${retriesRemaining} attempts remaining`;
      if (options.signal?.aborted) {
        throw new APIUserAbortError();
      }
      const isTimeout = isAbortError(response) || /timed? ?out/i.test(String(response) + ("cause" in response ? String(response.cause) : ""));
      const hasMiddleware = this.middleware.length > 0 || !!options.middleware?.length || this.backendMiddleware().length > 0;
      if (hasMiddleware && !isTimeout && !isRetryableError(response)) {
        loggerFor(this).info(`[${requestLogID}] middleware error (not retryable)`);
        loggerFor(this).debug(`[${requestLogID}] middleware error (not retryable)`, formatRequestDetails({
          retryOfRequestLogID,
          url,
          durationMs: headersTime - startTime,
          message: response.message
        }));
        throw response;
      }
      if (retriesRemaining) {
        loggerFor(this).info(`[${requestLogID}] connection ${isTimeout ? "timed out" : "failed"} - ${retryMessage}`);
        loggerFor(this).debug(`[${requestLogID}] connection ${isTimeout ? "timed out" : "failed"} (${retryMessage})`, formatRequestDetails({
          retryOfRequestLogID,
          url,
          durationMs: headersTime - startTime,
          message: response.message
        }));
        return this.retryRequest(options, retriesRemaining, retryOfRequestLogID ?? requestLogID);
      }
      loggerFor(this).info(`[${requestLogID}] connection ${isTimeout ? "timed out" : "failed"} - error; no more retries left`);
      loggerFor(this).debug(`[${requestLogID}] connection ${isTimeout ? "timed out" : "failed"} (error; no more retries left)`, formatRequestDetails({
        retryOfRequestLogID,
        url,
        durationMs: headersTime - startTime,
        message: response.message
      }));
      if (isTimeout) {
        throw new APIConnectionTimeoutError();
      }
      if (hasMiddleware && !isFetchOriginError(response)) {
        throw response;
      }
      throw new APIConnectionError({ cause: response });
    }
    const specialHeaders = [...response.headers.entries()].filter(([name]) => name === "request-id").map(([name, value]) => ", " + name + ": " + JSON.stringify(value)).join("");
    const responseInfo = `[${requestLogID}${retryLogStr}${specialHeaders}] ${req.method} ${url} ${response.ok ? "succeeded" : "failed"} with status ${response.status} in ${headersTime - startTime}ms`;
    if (!response.ok) {
      const shouldRetry = await this.shouldRetry(response, options);
      if (retriesRemaining && shouldRetry) {
        const retryMessage2 = `retrying, ${retriesRemaining} attempts remaining`;
        await CancelReadableStream(response.body);
        loggerFor(this).info(`${responseInfo} - ${retryMessage2}`);
        loggerFor(this).debug(`[${requestLogID}] response error (${retryMessage2})`, formatRequestDetails({
          retryOfRequestLogID,
          url: response.url,
          status: response.status,
          headers: response.headers,
          durationMs: headersTime - startTime
        }));
        return this.retryRequest(options, retriesRemaining, retryOfRequestLogID ?? requestLogID, response.headers);
      }
      const retryMessage = shouldRetry ? `error; no more retries left` : `error; not retryable`;
      loggerFor(this).info(`${responseInfo} - ${retryMessage}`);
      const errText = await response.text().catch((err2) => castToError(err2).message);
      const errJSON = safeJSON(errText);
      const errMessage = errJSON ? void 0 : errText;
      loggerFor(this).debug(`[${requestLogID}] response error (${retryMessage})`, formatRequestDetails({
        retryOfRequestLogID,
        url: response.url,
        status: response.status,
        headers: response.headers,
        message: errMessage,
        durationMs: Date.now() - startTime
      }));
      const err = this.makeStatusError(response.status, errJSON, errMessage, response.headers);
      throw err;
    }
    loggerFor(this).info(responseInfo);
    loggerFor(this).debug(`[${requestLogID}] response start`, formatRequestDetails({
      retryOfRequestLogID,
      url: response.url,
      status: response.status,
      headers: response.headers,
      durationMs: headersTime - startTime
    }));
    return { response, options, controller, requestLogID, retryOfRequestLogID, startTime };
  }
  getAPIList(path2, Page2, opts) {
    return this.requestAPIList(Page2, opts && "then" in opts ? opts.then((opts2) => ({ method: "get", path: path2, ...opts2 })) : { method: "get", path: path2, ...opts });
  }
  requestAPIList(Page2, options) {
    const request = this.makeRequest(options, null, void 0);
    return new PagePromise(this, request, Page2);
  }
  async fetchWithTimeout(url, init, ms, controller, requestOptions, logCtx) {
    const { signal, method, ...options } = init || {};
    const abort = this._makeAbort(controller);
    if (signal)
      signal.addEventListener("abort", abort, { once: true });
    const isReadableBody = globalThis.ReadableStream && options.body instanceof globalThis.ReadableStream || typeof options.body === "object" && options.body !== null && Symbol.asyncIterator in options.body;
    const fetchOptions = {
      signal: controller.signal,
      ...isReadableBody ? { duplex: "half" } : {},
      method: "GET",
      ...options
    };
    if (method) {
      fetchOptions.method = method.toUpperCase();
    }
    const baseFetch = this.fetch;
    const timedFetch = async (innerUrl, innerInit) => {
      const timeout = setTimeout(abort, ms);
      try {
        return await baseFetch.call(void 0, innerUrl, innerInit);
      } finally {
        clearTimeout(timeout);
      }
    };
    const innerFetch = requestOptions === void 0 ? timedFetch : async (innerUrl, innerInit = {}) => {
      const innerUrlStr = typeof innerUrl === "string" ? innerUrl : innerUrl instanceof URL ? innerUrl.href : innerUrl.url;
      innerInit.headers = innerInit.headers instanceof Headers ? innerInit.headers : new Headers(innerInit.headers);
      await this.prepareRequest(innerInit, { url: innerUrlStr, options: requestOptions });
      if (logCtx) {
        loggerFor(this).debug(`[${logCtx.requestLogID}] sending request`, formatRequestDetails({
          retryOfRequestLogID: logCtx.retryOfRequestLogID,
          method: innerInit.method,
          url: innerUrlStr,
          options: requestOptions,
          headers: innerInit.headers
        }));
      }
      return timedFetch(innerUrl, innerInit);
    };
    const requestMiddleware = requestOptions?.middleware;
    const backendMiddleware = this.backendMiddleware();
    const allMiddleware = requestMiddleware?.length || backendMiddleware.length ? [...this.middleware, ...requestMiddleware ?? [], ...backendMiddleware] : this.middleware;
    return await wrapFetchWithMiddleware(innerFetch, allMiddleware, requestOptions, this)(url, fetchOptions);
  }
  async shouldRetry(response, options) {
    const flags = this._authFlags(options);
    if (response.status === 401 && this._authState.tokenCache && flags.usedTokenCache && !flags.didRefreshFor401) {
      flags.didRefreshFor401 = true;
      this._authState.tokenCache.invalidate();
      return true;
    }
    const shouldRetryHeader = response.headers.get("x-should-retry");
    if (shouldRetryHeader === "true")
      return true;
    if (shouldRetryHeader === "false")
      return false;
    if (response.status === 408)
      return true;
    if (response.status === 409)
      return true;
    if (response.status === 429)
      return true;
    if (response.status >= 500)
      return true;
    return false;
  }
  async retryRequest(options, retriesRemaining, requestLogID, responseHeaders) {
    let timeoutMillis;
    const retryAfterMillisHeader = responseHeaders?.get("retry-after-ms");
    if (retryAfterMillisHeader) {
      const timeoutMs = parseFloat(retryAfterMillisHeader);
      if (!Number.isNaN(timeoutMs)) {
        timeoutMillis = timeoutMs;
      }
    }
    const retryAfterHeader = responseHeaders?.get("retry-after");
    if (retryAfterHeader && !timeoutMillis) {
      const timeoutSeconds = parseFloat(retryAfterHeader);
      if (!Number.isNaN(timeoutSeconds)) {
        timeoutMillis = timeoutSeconds * 1e3;
      } else {
        timeoutMillis = Date.parse(retryAfterHeader) - Date.now();
      }
    }
    if (timeoutMillis === void 0) {
      const maxRetries = options.maxRetries ?? this.maxRetries;
      timeoutMillis = this.calculateDefaultRetryTimeoutMillis(retriesRemaining, maxRetries);
    }
    await sleep(timeoutMillis);
    return this.makeRequest(options, retriesRemaining - 1, requestLogID);
  }
  calculateDefaultRetryTimeoutMillis(retriesRemaining, maxRetries) {
    const initialRetryDelay = 0.5;
    const maxRetryDelay = 8;
    const numRetries = maxRetries - retriesRemaining;
    const sleepSeconds = Math.min(initialRetryDelay * Math.pow(2, numRetries), maxRetryDelay);
    const jitter2 = 1 - Math.random() * 0.25;
    return sleepSeconds * jitter2 * 1e3;
  }
  calculateNonstreamingTimeout(maxTokens, maxNonstreamingTokens) {
    const maxTime = 60 * 60 * 1e3;
    const defaultTime = 60 * 10 * 1e3;
    const expectedTime = maxTime * maxTokens / 128e3;
    if (expectedTime > defaultTime || maxNonstreamingTokens != null && maxTokens > maxNonstreamingTokens) {
      throw new AnthropicError("Streaming is required for operations that may take longer than 10 minutes. See https://github.com/anthropics/anthropic-sdk-typescript#long-requests for more details");
    }
    return defaultTime;
  }
  async buildRequest(inputOptions, { retryCount = 0 } = {}) {
    const options = { ...inputOptions };
    const { method, path: path2, query, defaultBaseURL } = options;
    if (this._authState.resolution) {
      await this._authState.resolution;
    }
    if (!this._baseURLIsExplicit && this._authState.baseURL && this.baseURL !== this._authState.baseURL) {
      this.baseURL = this._authState.baseURL;
    }
    const url = this.buildURL(path2, query, defaultBaseURL);
    if ("timeout" in options)
      validatePositiveInteger("timeout", options.timeout);
    options.timeout = options.timeout ?? this.timeout;
    const { bodyHeaders, body } = this.buildBody({ options });
    const reqHeaders = await this.buildHeaders({ options: inputOptions, method, bodyHeaders, retryCount });
    const req = {
      method,
      headers: reqHeaders,
      ...options.signal && { signal: options.signal },
      ...globalThis.ReadableStream && body instanceof globalThis.ReadableStream && { duplex: "half" },
      ...body && { body },
      ...this.fetchOptions ?? {},
      ...options.fetchOptions ?? {}
    };
    return { req, url, timeout: options.timeout };
  }
  async buildHeaders({ options, method, bodyHeaders, retryCount }) {
    let idempotencyHeaders = {};
    if (this.idempotencyHeader && method !== "get") {
      if (!options.idempotencyKey)
        options.idempotencyKey = this.defaultIdempotencyKey();
      idempotencyHeaders[this.idempotencyHeader] = options.idempotencyKey;
    }
    const headers = buildHeaders([
      idempotencyHeaders,
      {
        Accept: "application/json",
        "User-Agent": this.getUserAgent(),
        "X-Stainless-Retry-Count": String(retryCount),
        ...options.timeout ? { "X-Stainless-Timeout": String(Math.trunc(options.timeout / 1e3)) } : {},
        ...getPlatformHeaders(),
        ...this._options.dangerouslyAllowBrowser ? { "anthropic-dangerous-direct-browser-access": "true" } : void 0,
        "anthropic-version": "2023-06-01"
      },
      await this.authHeaders(options),
      this._options.defaultHeaders,
      bodyHeaders,
      options.headers
    ]);
    this.validateHeaders(headers);
    return headers.values;
  }
  _makeAbort(controller) {
    return () => controller.abort();
  }
  buildBody({ options: { body, headers: rawHeaders } }) {
    if (!body) {
      return { bodyHeaders: void 0, body: void 0 };
    }
    const headers = buildHeaders([rawHeaders]);
    if (
      // Pass raw type verbatim
      ArrayBuffer.isView(body) || body instanceof ArrayBuffer || body instanceof DataView || typeof body === "string" && // Preserve legacy string encoding behavior for now
      headers.values.has("content-type") || // `Blob` is superset of `File`
      globalThis.Blob && body instanceof globalThis.Blob || // `FormData` -> `multipart/form-data`
      body instanceof FormData || // `URLSearchParams` -> `application/x-www-form-urlencoded`
      body instanceof URLSearchParams || // Send chunked stream (each chunk has own `length`)
      globalThis.ReadableStream && body instanceof globalThis.ReadableStream
    ) {
      return { bodyHeaders: void 0, body };
    } else if (typeof body === "object" && (Symbol.asyncIterator in body || Symbol.iterator in body && "next" in body && typeof body.next === "function")) {
      return { bodyHeaders: void 0, body: ReadableStreamFrom(body) };
    } else if (typeof body === "object" && headers.values.get("content-type") === "application/x-www-form-urlencoded") {
      return {
        bodyHeaders: { "content-type": "application/x-www-form-urlencoded" },
        body: this.stringifyQuery(body)
      };
    } else {
      return __classPrivateFieldGet(this, _BaseAnthropic_encoder, "f").call(this, { body, headers });
    }
  }
};
_a = BaseAnthropic, _BaseAnthropic_encoder = /* @__PURE__ */ new WeakMap(), _BaseAnthropic_instances = /* @__PURE__ */ new WeakSet(), _BaseAnthropic_baseURLOverridden = function _BaseAnthropic_baseURLOverridden2() {
  return this.baseURL !== "https://api.anthropic.com";
};
BaseAnthropic.Anthropic = _a;
BaseAnthropic.HUMAN_PROMPT = HUMAN_PROMPT;
BaseAnthropic.AI_PROMPT = AI_PROMPT;
BaseAnthropic.DEFAULT_TIMEOUT = 6e5;
BaseAnthropic.AnthropicError = AnthropicError;
BaseAnthropic.APIError = APIError;
BaseAnthropic.APIConnectionError = APIConnectionError;
BaseAnthropic.APIConnectionTimeoutError = APIConnectionTimeoutError;
BaseAnthropic.APIUserAbortError = APIUserAbortError;
BaseAnthropic.NotFoundError = NotFoundError;
BaseAnthropic.ConflictError = ConflictError;
BaseAnthropic.RateLimitError = RateLimitError;
BaseAnthropic.BadRequestError = BadRequestError;
BaseAnthropic.AuthenticationError = AuthenticationError;
BaseAnthropic.InternalServerError = InternalServerError;
BaseAnthropic.PermissionDeniedError = PermissionDeniedError;
BaseAnthropic.UnprocessableEntityError = UnprocessableEntityError;
BaseAnthropic.toFile = toFile;
var Anthropic = class extends BaseAnthropic {
  constructor() {
    super(...arguments);
    this.completions = new Completions(this);
    this.messages = new Messages2(this);
    this.models = new Models2(this);
    this.beta = new Beta(this);
  }
};
Anthropic.Completions = Completions;
Anthropic.Messages = Messages2;
Anthropic.Models = Models2;
Anthropic.Beta = Beta;

// node_modules/@anthropic-ai/sdk/lib/middleware.mjs
init_error();
init_errors();
var encoder = new TextEncoder();

// node_modules/@anthropic-ai/sdk/index.mjs
init_error();

// src/main.ts
var import_language = require("@codemirror/language");
var import_state = require("@codemirror/state");
var import_view = require("@codemirror/view");
var import_obsidian2 = require("obsidian");

// src/clean.ts
function convertWordLists(html) {
  const pRe = /<p\b[^>]*MsoListParagraph[^>]*>([\s\S]*?)<\/p>/gi;
  let out = "";
  let last = 0;
  let run = [];
  const flush = () => {
    if (!run.length) return;
    out += buildNestedList(run);
    run = [];
  };
  let m;
  while (m = pRe.exec(html)) {
    const between = html.slice(last, m.index);
    if (between.trim()) {
      flush();
      out += between;
    }
    last = m.index + m[0].length;
    const open = m[0].slice(0, m[0].indexOf(">") + 1);
    const level = Number(/level(\d+)/i.exec(open)?.[1] ?? "1");
    let marker = "";
    let inner = m[1].replace(/<!--\[if !supportLists\]-->([\s\S]*?)<!--\[endif\]-->/gi, (_s, g) => {
      marker += g;
      return "";
    }).replace(/<span[^>]*mso-list:\s*Ignore[^>]*>([\s\S]*?)<\/span>/gi, (_s, g) => {
      marker += g;
      return "";
    });
    const plain = marker.replace(/<[^>]*>/g, "").replace(/&nbsp;/gi, " ").trim();
    const ordered = /^(\d+|[a-z]|[ivxlc]+)[.)]/i.test(plain);
    run.push({ level: Math.max(1, level), ordered, inner: inner.trim() });
  }
  flush();
  return out + html.slice(last);
}
function buildNestedList(items) {
  let html = "";
  const stack = [];
  for (const it of items) {
    while (stack.length > it.level) html += `</li></${stack.pop()}>`;
    if (stack.length === it.level && stack.length) html += "</li>";
    while (stack.length < it.level) {
      const tag = it.ordered ? "ol" : "ul";
      html += `<${tag}>`;
      stack.push(tag);
    }
    html += `<li>${it.inner}`;
  }
  while (stack.length) html += `</li></${stack.pop()}>`;
  return html;
}
function preCleanHtml(html) {
  return convertWordLists(html).replace(/<!--[\s\S]*?-->/g, "").replace(/<xml[\s\S]*?<\/xml>/gi, "").replace(/<style[\s\S]*?<\/style>/gi, "").replace(/<script[\s\S]*?<\/script>/gi, "").replace(/<\/?o:p[^>]*>/gi, "").replace(/<\/?(?:w|m|v):[^>]*>/gi, "").replace(/<meta[^>]*>/gi, "").replace(/\s(?:class|style|lang|dir|id|align|width|height|valign|face|color|size)="[^"]*"/gi, "").replace(/&nbsp;/gi, " ");
}
function topLevelTags(html, names) {
  const re = new RegExp(`<(/?)(?:${names.join("|")})\\b([^>]*?)(/?)>`, "gi");
  const out = [];
  let depth = 0;
  let start = 0;
  let attrs = "";
  let m;
  while (m = re.exec(html)) {
    if (m[3] === "/") continue;
    if (!m[1]) {
      if (depth++ === 0) {
        start = re.lastIndex;
        attrs = m[2];
      }
    } else if (depth && --depth === 0) {
      out.push({ attrs, inner: html.slice(start, m.index) });
    }
  }
  if (depth) out.push({ attrs, inner: html.slice(start) });
  return out;
}
function tableRanges(html) {
  const re = /<(\/?)table\b[^>]*>/gi;
  const out = [];
  let depth = 0;
  let start = 0;
  let m;
  while (m = re.exec(html)) {
    if (!m[1]) {
      if (depth++ === 0) start = m.index;
    } else if (depth && --depth === 0) {
      out.push({ start, end: re.lastIndex });
    }
  }
  if (depth) out.push({ start, end: html.length });
  return out;
}
var spanCount = (attrs, name) => {
  const n = Number(new RegExp(`${name}\\s*=\\s*"?(\\d+)`, "i").exec(attrs)?.[1] ?? "1");
  return n > 0 && n < 100 ? n : 1;
};
function cellMarkdown(inner, toMd) {
  return toMd(inner).replace(/\r/g, "").trim().replace(/\\?\|/g, "\\|").replace(/\n+/g, "<br>").replace(/(?:<br>)+$/, "").trim();
}
function tableToMarkdown(html, toMd) {
  const caption = topLevelTags(html, ["caption"])[0];
  const title = caption ? cellMarkdown(caption.inner, toMd) : "";
  const grid = [];
  topLevelTags(html, ["tr"]).forEach((row, r) => {
    var _a2;
    if (!grid[r]) grid[r] = [];
    let c = 0;
    for (const cell of topLevelTags(row.inner, ["td", "th"])) {
      while (grid[r][c] !== void 0) c++;
      const text = cellMarkdown(cell.inner, toMd);
      const down = spanCount(cell.attrs, "rowspan");
      const across = spanCount(cell.attrs, "colspan");
      for (let i = 0; i < down; i++) {
        const line = grid[_a2 = r + i] || (grid[_a2] = []);
        for (let j = 0; j < across; j++) line[c + j] = i === 0 && j === 0 ? text : "";
      }
      c += across;
    }
  });
  const rows = grid.filter((row) => row?.some((cell) => cell?.trim()));
  if (!rows.length) return title;
  const width = Math.max(...rows.map((row) => row.length));
  const cells = (row) => `| ${Array.from({ length: width }, (_, i) => row[i] ?? "").join(" | ")} |`;
  const table = [cells(rows[0]), `| ${Array.from({ length: width }, () => "---").join(" | ")} |`, ...rows.slice(1).map(cells)].join("\n");
  return title ? `${title}

${table}` : table;
}
function cleanPastedHtml(html, toMd) {
  const pre = preCleanHtml(html);
  const parts2 = [];
  let last = 0;
  for (const range of tableRanges(pre)) {
    parts2.push(toMd(pre.slice(last, range.start)));
    parts2.push(tableToMarkdown(pre.slice(range.start, range.end), toMd));
    last = range.end;
  }
  parts2.push(toMd(pre.slice(last)));
  return postCleanMarkdown(
    parts2.map((p) => p.trim()).filter(Boolean).join("\n\n")
  );
}
function tabbedTextToMarkdown(text) {
  const lines = text.replace(/\r\n?/g, "\n").replace(/\n+$/, "").split("\n");
  if (lines.length < 2 || lines.some((l) => !l.includes("	")) || lines.every((l) => !/[^\t]\t/.test(l))) return null;
  const rows = lines.map((l) => l.split("	").map((c) => c.trim().replace(/\|/g, "\\|")));
  const width = rows[0].length;
  if (width < 2 || rows.some((r) => r.length !== width)) return null;
  const cells = (row) => `| ${row.join(" | ")} |`;
  return [cells(rows[0]), `| ${Array.from({ length: width }, () => "---").join(" | ")} |`, ...rows.slice(1).map(cells)].join("\n");
}
function looksLikeMarkdownTable(text) {
  return /^[ \t]*\|?[ \t]*:?-{3,}:?[ \t]*(?:\|[ \t]*:?-{3,}:?[ \t]*)+\|?[ \t]*$/m.test(text);
}
function isOneMarkdownTable(md) {
  const lines = md.trim().split("\n");
  return lines.length > 1 && lines.every((l) => /^[ \t]*\|/.test(l)) && lines.filter(looksLikeMarkdownTable).length === 1 && looksLikeMarkdownTable(lines[1]);
}
var LIST_ITEM = /^([ \t]*)((?:[-*+]|\d+[.)])[ \t]+(?:\[.\][ \t]+)?)/;
var FENCE_LINE = /^([ \t]*)((?:[-*+]|\d+[.)])[ \t]+(?:\[.\][ \t]+)?)?(`{3,}(?!.*`)|~{3,})(.*)$/;
var fenceIndent = (openLine) => {
  const m = FENCE_LINE.exec(openLine);
  return m ? m[1] + " ".repeat(m[2]?.length ?? 0) : "";
};
var opensTable = (md) => /^[ \t]*\|/.test(md);
var closesTable = (md) => /\|[ \t]*$/.test(md);
var opensFence = (md) => /^[ \t]*(?:```|~~~)/.test(md);
var closesFence = (md) => /(?:```|~~~)[ \t]*$/.test(md);
var textBesideMarker = (line) => line.replace(LIST_ITEM, "").trim();
var contentIndent = (item) => item[1] + " ".repeat(item[2].length);
function listContentIndent(line) {
  const m = LIST_ITEM.exec(line);
  return m ? contentIndent(m) : "";
}
function blockHead(md, before) {
  if (!opensTable(md) && !opensFence(md)) return "";
  if (!textBesideMarker(before)) return LIST_ITEM.test(before) && opensTable(md) ? "\n" : "";
  return opensTable(md) ? "\n\n" : "\n";
}
function padPastedMarkdown(md, before, after) {
  const tail = closesTable(md) ? "\n\n" : closesFence(md) ? "\n" : "";
  return `${blockHead(md, before)}${md}${after.trim() ? tail : ""}`;
}
function nextItemAfterFence(lineAt, openLine) {
  const own = FENCE_LINE.exec(lineAt(openLine));
  if (own?.[2]) return own[1] + nextMarker(own[2]);
  const fence = /^[ \t]*/.exec(lineAt(openLine))?.[0] ?? "";
  for (let n = openLine - 1; n >= 0; n--) {
    const text = lineAt(n);
    if (!text.trim()) continue;
    const m = LIST_ITEM.exec(text);
    if (m) return contentIndent(m).length <= fence.length ? m[1] + nextMarker(m[2]) : "";
    if (!/^[ \t]/.test(text)) return "";
  }
  return "";
}
var nextMarker = (marker) => marker.replace(/^\d+/, (n) => String(Number(n) + 1)).replace(/\[.\]/, "[ ]");
function insideFence(textAbove) {
  let fenced = false;
  for (const line of textAbove.split("\n")) if (FENCE_LINE.test(line)) fenced = !fenced;
  return fenced;
}
function planPastedMarkdown(md, before, after) {
  const padded = padPastedMarkdown(md, before, after);
  const indent = listContentIndent(before);
  if (!indent || !padded.includes("\n")) return padded;
  return padded.split("\n").map((line, i) => !i || !line.trim() ? line : indent + line).join("\n");
}
var HTML_TAGS = new Set(
  "a abbr address area article aside audio b base bdi bdo big blockquote body br button canvas caption cite code col colgroup data datalist dd del details dfn dialog div dl dt em embed fieldset figcaption figure footer form h1 h2 h3 h4 h5 h6 head header hgroup hr html i iframe img input ins kbd label legend li link main map mark menu meta meter nav noscript object ol optgroup option output p param picture pre progress q rp rt ruby s samp script section select slot small source span strong style sub summary sup table tbody td template textarea tfoot th thead time title tr track u ul var video wbr svg path circle rect polygon polyline defs use".split(" ")
);
function outsideCode(md, fn) {
  let fenced = false;
  return md.split("\n").map((line, i) => {
    if (FENCE_LINE.test(line)) {
      fenced = !fenced;
      return line;
    }
    if (fenced) return line;
    return line.split(/(`+[^`]*`+|\]\([^)]*\))/).map((part) => part.startsWith("`") || part.startsWith("](") ? part : fn(part, i)).join("");
  }).join("\n");
}
var TAG_SHAPE = /<\/?[A-Za-z][A-Za-z0-9-]*(?:\s[^<>]*)?\/?>/g;
function isPlaceholder(tag, offset, whole) {
  if (offset > 0 && whole[offset - 1] === "\\") return false;
  const name = /^<\/?([A-Za-z][A-Za-z0-9-]*)/.exec(tag)?.[1].toLowerCase() ?? "";
  return !HTML_TAGS.has(name);
}
function escapePlaceholderTags(md) {
  return outsideCode(md, (seg) => seg.replace(TAG_SHAPE, (tag, offset, whole) => isPlaceholder(tag, offset, whole) ? `\\${tag}` : tag));
}
function findPlaceholderTags(md) {
  const out = [];
  outsideCode(md, (seg, lineNo) => {
    seg.replace(TAG_SHAPE, (tag, offset, whole) => {
      if (isPlaceholder(tag, offset, whole)) out.push({ line: lineNo, tag });
      return tag;
    });
    return seg;
  });
  return out;
}
function postCleanMarkdown(md) {
  const tidied = md.replace(/\u00A0/g, " ").replace(/[ \t]+$/gm, "").replace(/\n{3,}/g, "\n\n").trim();
  return escapePlaceholderTags(tidied);
}

// src/blocks.ts
var isBlank = (l) => !l.trim();
var isFenceMark = (l) => FENCE_LINE.test(l);
var isHeading = (l) => /^#{1,6}\s/.test(l);
var isTableLine = (l) => /^\s*\|/.test(l);
var isQuoteLine = (l) => /^\s*>/.test(l);
var listMatch = (l) => l.match(/^(\s*)(?:[-*+]|\d+[.)])\s/);
var indentOf = (l) => l.match(/^\s*/)[0].length;
function frontmatterEnd(lines) {
  if (lines[0] !== "---") return 0;
  for (let i = 1; i < lines.length; i++) {
    if (lines[i] === "---" || lines[i] === "...") return i + 1;
  }
  return lines.length;
}
function fenceRangeAt(lines, line, fmEnd) {
  let open = -1;
  for (let i = fmEnd; i <= line; i++) {
    if (isFenceMark(lines[i])) {
      if (open < 0) open = i;
      else if (i < line) open = -1;
      else return { from: open, to: i };
    }
  }
  if (open < 0) return null;
  for (let i = line + 1; i < lines.length; i++) {
    if (isFenceMark(lines[i])) return { from: open, to: i };
  }
  return { from: open, to: lines.length - 1 };
}
function blockRangeAt(lines, line) {
  if (line < 0 || line >= lines.length) return null;
  const fmEnd = frontmatterEnd(lines);
  if (line < fmEnd) return null;
  const l = lines[line];
  if (isBlank(l)) return null;
  const fence = fenceRangeAt(lines, line, fmEnd);
  if (fence) return fence;
  if (isTableLine(l)) {
    let from2 = line;
    let to2 = line;
    while (from2 > fmEnd && isTableLine(lines[from2 - 1])) from2--;
    while (to2 < lines.length - 1 && isTableLine(lines[to2 + 1])) to2++;
    return { from: from2, to: to2 };
  }
  if (isQuoteLine(l)) {
    let from2 = line;
    let to2 = line;
    while (from2 > fmEnd && isQuoteLine(lines[from2 - 1])) from2--;
    while (to2 < lines.length - 1 && isQuoteLine(lines[to2 + 1])) to2++;
    return { from: from2, to: to2 };
  }
  if (isHeading(l)) return { from: line, to: line };
  const lm = listMatch(l);
  if (lm) {
    const indent = lm[1].length;
    let to2 = line;
    for (let i = line + 1; i < lines.length; i++) {
      const cur = lines[i];
      if (isBlank(cur)) {
        const next = lines[i + 1];
        if (next !== void 0 && !isBlank(next) && indentOf(next) > indent) continue;
        break;
      }
      if (indentOf(cur) > indent) {
        to2 = i;
        continue;
      }
      break;
    }
    return { from: line, to: to2 };
  }
  if (indentOf(l) > 0) {
    for (let k = line - 1; k >= fmEnd; k--) {
      if (isBlank(lines[k])) continue;
      const pm = listMatch(lines[k]);
      if (pm && pm[1].length < indentOf(l)) return blockRangeAt(lines, k);
      if (indentOf(lines[k]) === 0) break;
    }
  }
  const structural = (s) => isBlank(s) || isHeading(s) || isFenceMark(s) || isTableLine(s) || isQuoteLine(s) || listMatch(s) != null;
  let from = line;
  let to = line;
  while (from > fmEnd && !structural(lines[from - 1])) from--;
  while (to < lines.length - 1 && !structural(lines[to + 1])) to++;
  return { from, to };
}
function isTranscriptCalloutAt(lines, line) {
  if (line < 0 || line >= lines.length || !isQuoteLine(lines[line])) return false;
  let i = line;
  while (i > 0 && isQuoteLine(lines[i - 1])) i--;
  return /^\s*>\s*\[!transcript\]/i.test(lines[i]);
}
function isTranscriptTurnAt(lines, line) {
  if (line < 0 || line >= lines.length) return false;
  if (!/^\*\*.+?:\*\*/.test(lines[line])) return false;
  for (let i = line - 1; i >= 0; i--) {
    if (/^#{1,6}\s/.test(lines[i])) return /^##\s+Transcript\s*$/.test(lines[i]);
  }
  return false;
}
function blockStarts(lines) {
  const starts = [];
  let i = frontmatterEnd(lines);
  while (i < lines.length) {
    if (isBlank(lines[i])) {
      i++;
      continue;
    }
    const r = blockRangeAt(lines, i);
    if (!r) {
      i++;
      continue;
    }
    starts.push(r.from);
    i = r.to + 1;
  }
  return starts;
}
var isListy = (l) => l !== void 0 && (listMatch(l) != null || !isBlank(l) && indentOf(l) > 0);
function sectionRangeAt(lines, line) {
  const base = blockRangeAt(lines, line);
  if (!base) return null;
  const hm = lines[base.from].match(/^(#{1,6})\s/);
  if (!hm) return base;
  const level = hm[1].length;
  let to = base.to;
  let inFence = false;
  for (let i = base.from + 1; i < lines.length; i++) {
    if (isFenceMark(lines[i])) inFence = !inFence;
    if (!inFence) {
      const m = lines[i].match(/^(#{1,6})\s/);
      if (m && m[1].length <= level) break;
    }
    to = i;
  }
  while (to > base.from && isBlank(lines[to])) to--;
  return { from: base.from, to };
}
function unionBlockRange(lines, a, b, sections = false) {
  let lo = Math.min(a, b);
  let hi = Math.max(a, b);
  while (lo <= hi && (lines[lo] === void 0 || isBlank(lines[lo]))) lo++;
  while (hi >= lo && (lines[hi] === void 0 || isBlank(lines[hi]))) hi--;
  if (lo > hi) return null;
  const get = sections ? sectionRangeAt : blockRangeAt;
  const r1 = get(lines, lo);
  const r2 = get(lines, hi);
  if (!r1 || !r2) return null;
  return { from: Math.min(r1.from, r2.from), to: Math.max(r1.to, r2.to) };
}
function listStretchRange(lines, range) {
  const lm = listMatch(lines[range.from] ?? "");
  if (!lm) return range;
  const indent = lm[1].length;
  const fmEnd = frontmatterEnd(lines);
  let from = range.from;
  for (let i = range.from - 1; i >= fmEnd; i--) {
    const cur = lines[i];
    if (isBlank(cur)) {
      const prev = lines[i - 1];
      if (prev !== void 0 && !isBlank(prev) && indentOf(prev) > indent) continue;
      break;
    }
    const m = listMatch(cur);
    if (m && m[1].length === indent) {
      from = i;
      continue;
    }
    if (indentOf(cur) > indent) continue;
    break;
  }
  let to = range.to;
  for (let i = range.to + 1; i < lines.length; i++) {
    const cur = lines[i];
    if (isBlank(cur)) {
      const next = lines[i + 1];
      if (next !== void 0 && !isBlank(next) && indentOf(next) > indent) continue;
      break;
    }
    const m = listMatch(cur);
    if (m && m[1].length === indent || indentOf(cur) > indent) {
      to = i;
      continue;
    }
    break;
  }
  return { from, to };
}
function stripLinePrefixes(l) {
  let t = l;
  for (let i = 0; i < 6; i++) {
    const before = t;
    t = t.replace(/^\s*>\s?/, "").replace(/^\s*\[!\w+\][+-]?\s*/, "").replace(/^\s*(?:[-*+]|\d+[.)])\s+\[.\]\s+/, "").replace(/^\s*(?:[-*+]|\d+[.)])\s+/, "").replace(/^#{1,6}\s+/, "");
    if (t === before) break;
  }
  return t;
}
var CALLOUT_FLAVORS = [
  { type: "tip", label: "Tip", icon: "lightbulb", emoji: "\u{1F4A1}" },
  { type: "note", label: "Note", icon: "pencil", emoji: "\u{1F4DD}" },
  { type: "info", label: "Info", icon: "info", emoji: "\u2139\uFE0F" },
  { type: "success", label: "Success", icon: "check", emoji: "\u2705" },
  { type: "question", label: "Question", icon: "help-circle", emoji: "\u2753" },
  { type: "warning", label: "Warning", icon: "alert-triangle", emoji: "\u26A0\uFE0F" },
  { type: "danger", label: "Danger", icon: "zap", emoji: "\u{1F6A8}" },
  { type: "example", label: "Example", icon: "list", emoji: "\u{1F9EA}" },
  { type: "quote", label: "Quote", icon: "quote", emoji: "\u{1F4AC}" }
];
var CALLOUT_LEADS = {
  tip: ["tip", "pro tip", "hint"],
  note: ["note", "nb"],
  info: ["info", "fyi"],
  success: ["success", "done", "check"],
  question: ["question", "faq", "q"],
  warning: ["warning", "caution", "careful", "heads up", "important"],
  danger: ["danger", "error", "stop"],
  example: ["example", "for example", "e.g."],
  quote: ["quote"]
};
var CALLOUT_LEAD_RE = /^\s*(\*\*|__|\*|_)?\s*([A-Za-z][A-Za-z. ]{0,15}?)\s*(?::\s*\1|\1\s*:)\s+/;
function stripCalloutLead(text, type) {
  const leads = CALLOUT_LEADS[type];
  if (!leads) return text;
  const m = CALLOUT_LEAD_RE.exec(text);
  if (!m) return text;
  if (!leads.includes(m[2].trim().toLowerCase())) return text;
  const rest = text.slice(m[0].length);
  return rest.trim() ? rest : text;
}
var LEAD_TO_TYPE = new Map(
  Object.entries(CALLOUT_LEADS).flatMap(([type, leads]) => leads.map((l) => [l, type]))
);
var EMOJI_FOR_TYPE = new Map(CALLOUT_FLAVORS.map((f) => [f.type, f.emoji]));
var LEAD_LINE_RE = /^([ \t]*)(>[ \t]*)?(\*\*|__|\*|_)?[ \t]*([A-Za-z][A-Za-z. ]{0,15}?)[ \t]*(?::[ \t]*\3|\3[ \t]*:)[ \t]+(?=\S)/;
var PARA_BREAK = /^\s*(?:$|#{1,6}\s|>|```|~~~|---|\*\*\*|___|\||(?:[-*+]|\d+[.)])\s)/;
function findCalloutLeads(lines) {
  const out = [];
  let fence = null;
  for (let i = frontmatterEnd(lines); i < lines.length; i++) {
    const text = lines[i];
    const f = FENCE_LINE.exec(text);
    if (f) {
      if (!fence) fence = f[3];
      else if (text.trim().startsWith(fence)) fence = null;
      continue;
    }
    if (fence) continue;
    const m = LEAD_LINE_RE.exec(text);
    if (!m) continue;
    const type = LEAD_TO_TYPE.get(m[4].trim().toLowerCase());
    if (!type) continue;
    if (m[2] && /^\s*>\s*\[!/.test(lines[quoteBlockStart(lines, i)])) continue;
    out.push({ line: i, type, label: m[4].trim(), bare: !m[3] });
  }
  return out;
}
function quoteBlockStart(lines, line) {
  let i = line;
  while (i > 0 && /^\s*>/.test(lines[i - 1])) i--;
  return i;
}
function convertCalloutLeads(lines, leads) {
  const out = [...lines];
  for (const lead of [...leads].sort((a, b) => b.line - a.line)) {
    const text = out[lead.line];
    const m = LEAD_LINE_RE.exec(text);
    if (!m) continue;
    const indent = m[1];
    const rest = text.slice(m[0].length);
    if (!rest.trim()) continue;
    const emoji = EMOJI_FOR_TYPE.get(lead.type);
    const header = `${indent}> [!${lead.type}]${emoji ? " " + emoji : ""} ${rest}`;
    if (m[2]) {
      out[lead.line] = header;
      continue;
    }
    let end = lead.line;
    while (end + 1 < out.length && !PARA_BREAK.test(out[end + 1])) end++;
    const body = out.slice(lead.line + 1, end + 1).map((l) => `${indent}> ${l.trim()}`);
    out.splice(lead.line, end - lead.line + 1, header, ...body);
  }
  return out;
}
function transformBlock(lines, range, kind, callout) {
  const kept = lines.slice(range.from, range.to + 1).map((raw2) => ({ raw: raw2, core: stripLinePrefixes(raw2) })).filter((p, i, a) => p.core.trim() !== "" || i > 0 && i < a.length - 1);
  const core = kept.map((p) => p.core);
  const raw = kept.map((p) => p.raw);
  const base = raw[0]?.match(/^\s*/)?.[0] ?? "";
  let out;
  switch (kind) {
    case "paragraph":
      out = core;
      break;
    case "h1":
    case "h2":
    case "h3": {
      const n = Number(kind[1]);
      out = core.map((l) => l.trim() ? "#".repeat(n) + " " + l.trim() : l);
      break;
    }
    case "bullet":
      out = core.map((l) => l.trim() ? "- " + l.trim() : l);
      break;
    case "ordered": {
      let i = 0;
      out = core.map((l) => l.trim() ? `${++i}. ` + l.trim() : l);
      break;
    }
    case "task":
      out = core.map((l) => l.trim() ? "- [ ] " + l.trim() : l);
      break;
    case "quote":
      out = core.map((l) => "> " + l);
      break;
    case "toggleList": {
      const first = core[0]?.trim() ?? "";
      const titled = first.length > 0 && first.length <= 100;
      const bodyRaw = titled ? raw.slice(1) : raw;
      const bodyCore = titled ? core.slice(1) : core;
      let sibling = false;
      const body = bodyRaw.map((l, i) => {
        if (!l.trim()) return l;
        if (indentOf(l) <= base.length) sibling = true;
        if (!sibling) return l;
        return listMatch(l) ? "    " + l : base + "    " + bodyCore[i].trim();
      });
      out = [base + "- " + (titled ? first : ""), ...body];
      break;
    }
    case "callout": {
      const c = callout ?? { type: "note" };
      if (core.length) core[0] = stripCalloutLead(core[0], c.type);
      const em = c.emoji ? c.emoji + " " : "";
      const title = core[0]?.trim() ?? "";
      const firstAsTitle = !!c.folded && title.length > 0 && title.length <= 100;
      let sibling = false;
      const bodyLine = (l, coreL) => {
        if (!l.trim()) return coreL;
        if (indentOf(l) <= base.length) sibling = true;
        if (!listMatch(l)) return coreL;
        let t = l.startsWith(base) ? l.slice(base.length) : l.replace(/^\s*/, "");
        if (!sibling) t = t.replace(/^(?: {1,4}|\t)/, "");
        return t;
      };
      if (firstAsTitle) {
        out = [`${base}> [!${c.type}]- ${em}${title}`, ...raw.slice(1).map((l, i) => `${base}> ` + bodyLine(l, core[i + 1]))];
      } else if (!c.folded && em && core.length === 1 && title) {
        out = [`${base}> [!${c.type}] ${em}${title}`];
      } else {
        out = [`${base}> [!${c.type}]${c.folded ? "-" : ""}${em ? " " + em.trim() : ""}`, ...raw.map((l, i) => `${base}> ` + bodyLine(l, core[i]))];
      }
      break;
    }
  }
  return [...lines.slice(0, range.from), ...out, ...lines.slice(range.to + 1)];
}
function parseTabs(source) {
  const panes = [];
  let cur = null;
  const pre = [];
  for (const l of source.split("\n")) {
    const m = /^---\s+(.+?)\s*$/.exec(l);
    if (m) {
      if (cur) panes.push(cur);
      else if (pre.join("").trim()) panes.push({ title: "Tab 1", body: pre.join("\n").trim() });
      cur = { title: m[1], body: "" };
    } else if (cur) {
      cur.body += (cur.body ? "\n" : "") + l;
    } else {
      pre.push(l);
    }
  }
  if (cur) panes.push(cur);
  if (!panes.length && pre.join("").trim()) panes.push({ title: "Tab 1", body: pre.join("\n").trim() });
  return panes.map((p) => ({ title: p.title, body: p.body.trim() }));
}
function serializeTabs(panes) {
  return panes.map((p) => `--- ${p.title}` + (p.body.trim() ? "\n" + p.body.trim() : "")).join("\n");
}
function parseColumns(source) {
  const panes = [];
  let cur = { ratio: 1, body: "" };
  let sawMarker = false;
  for (const l of source.split("\n")) {
    const m = /^---(?:\s+(\d+(?:\.\d+)?))?\s*$/.exec(l);
    if (m) {
      panes.push({ ratio: cur.ratio, body: cur.body.trim() });
      cur = { ratio: m[1] ? Number(m[1]) : 1, body: "" };
      sawMarker = true;
    } else {
      cur.body += (cur.body ? "\n" : "") + l;
    }
  }
  if (sawMarker || cur.body.trim()) panes.push({ ratio: cur.ratio, body: cur.body.trim() });
  return panes;
}
function serializeColumns(panes) {
  if (!panes.length) return "";
  const r0 = panes[0].ratio || 1;
  const out = [panes[0].body.trim()];
  for (let i = 1; i < panes.length; i++) {
    const n = Math.round(panes[i].ratio / r0 * 100) / 100;
    out.push(n === 1 ? "---" : `--- ${n}`);
    out.push(panes[i].body.trim());
  }
  return out.join("\n");
}
function columnsSnippet(layout) {
  const body = {
    two: "Left column\n---\nRight column",
    three: "First column\n---\nSecond column\n---\nThird column",
    "sidebar-left": "Sidebar\n--- 2\nMain content",
    "sidebar-right": "Main content\n--- 0.5\nSidebar"
  }[layout];
  return "```columns\n" + body + "\n```";
}
function setCalloutEmoji(line, emoji) {
  const m = /^(\s*>\s*\[!\w+\][+-]?\s*)((?:\p{Extended_Pictographic}|\p{Emoji_Presentation})️?\s*)?/u.exec(line);
  if (!m) return null;
  return m[1] + emoji + " " + line.slice(m[0].length);
}
function tableSnippet(cols, rows) {
  const c = Math.max(1, cols);
  const row = "|" + "     |".repeat(c);
  const sep = "|" + " --- |".repeat(c);
  return [row, sep, ...Array.from({ length: Math.max(0, rows - 1) }, () => row)].join("\n");
}
function duplicateBlock(lines, range) {
  const block = lines.slice(range.from, range.to + 1);
  const insertAt = range.to + 1;
  const sep = listMatch(block[0]) ? [] : [""];
  return {
    lines: [...lines.slice(0, insertAt), ...sep, ...block, ...lines.slice(insertAt)],
    newStart: insertAt + sep.length
  };
}
function deleteBlock(lines, range) {
  let toEx = range.to + 1;
  while (toEx < lines.length && isBlank(lines[toEx])) toEx++;
  let from = range.from;
  if (toEx === lines.length) while (from > 0 && isBlank(lines[from - 1])) from--;
  return [...lines.slice(0, from), ...lines.slice(toEx)];
}
function ensureBlockId(lines, range, fresh) {
  const afterLine = lines[range.to + 1] ?? "";
  const own = lines[range.to].match(/\^([A-Za-z0-9-]+)\s*$/);
  if (own) return { lines, id: own[1], changed: false };
  const following = afterLine.match(/^\s*\^([A-Za-z0-9-]+)\s*$/);
  if (following) return { lines, id: following[1], changed: false };
  const structural = isTableLine(lines[range.to]) || isFenceMark(lines[range.to]) || isQuoteLine(lines[range.to]);
  if (structural) {
    return {
      lines: [...lines.slice(0, range.to + 1), `^${fresh}`, ...lines.slice(range.to + 1)],
      id: fresh,
      changed: true
    };
  }
  const out = [...lines];
  out[range.to] = out[range.to] + ` ^${fresh}`;
  return { lines: out, id: fresh, changed: true };
}
function moveBlock(lines, range, insertBefore) {
  if (insertBefore >= range.from && insertBefore <= range.to + 1) return null;
  const block = lines.slice(range.from, range.to + 1);
  let removeFrom = range.from;
  let removeToEx = range.to + 1;
  while (removeToEx < lines.length && isBlank(lines[removeToEx])) removeToEx++;
  if (removeToEx === lines.length) {
    while (removeFrom > 0 && isBlank(lines[removeFrom - 1])) removeFrom--;
  }
  const rest = [...lines.slice(0, removeFrom), ...lines.slice(removeToEx)];
  let at = insertBefore - (removeToEx <= insertBefore ? removeToEx - removeFrom : 0);
  if (at < 0) at = 0;
  if (at > rest.length) at = rest.length;
  const blockIsList = listMatch(block[0]) != null;
  const above = at > 0 ? rest[at - 1] : void 0;
  const below = at < rest.length ? rest[at] : void 0;
  const glueTop = blockIsList && isListy(above);
  const glueBottom = blockIsList && isListy(below);
  const gapTop = above !== void 0 && !isBlank(above) && !glueTop;
  const gapBottom = below !== void 0 && !isBlank(below) && !glueBottom;
  const insert = [...gapTop ? [""] : [], ...block, ...gapBottom ? [""] : []];
  const out = [...rest.slice(0, at), ...insert, ...rest.slice(at)];
  return { lines: out, newStart: at + (gapTop ? 1 : 0) };
}
function guessLanguage(lines) {
  const head = lines.join("\n");
  const shebang = /^#!.*\b(bash|sh|zsh)\b/m.test(head) ? "bash" : /^#!.*\bpython/m.test(head) ? "python" : null;
  if (shebang) return shebang;
  if (/^\s*(defaults write|brew |sudo |chmod |echo "|export |killall )/m.test(head)) return "bash";
  if (/^\s*(Get-|Set-|New-|\$PSVersionTable)/m.test(head)) return "powershell";
  if (/^\s*(SELECT|INSERT INTO|UPDATE |CREATE TABLE)\b/im.test(head)) return "sql";
  if (/^\s*[{[]/.test(head.trim()) && /["']\s*:/.test(head)) return "json";
  if (/^\s*(import |export |const |let |function |=>)/m.test(head)) return "javascript";
  if (/^\s*(def |class |import |from .* import)/m.test(head)) return "python";
  if (/^\s*<[a-zA-Z!]/.test(head.trim())) return "html";
  return null;
}
function narrowEdit(prev, next) {
  let start = 0;
  const min = Math.min(prev.length, next.length);
  while (start < min && prev[start] === next[start]) start++;
  let endPrev = prev.length - 1;
  let endNext = next.length - 1;
  while (endPrev >= start && endNext >= start && prev[endPrev] === next[endNext]) {
    endPrev--;
    endNext--;
  }
  return { from: start, to: endPrev, text: next.slice(start, endNext + 1) };
}
function parseFenceInfo(info) {
  const t = info.trim();
  if (!t) return { lang: "", file: "" };
  const titled = /^([A-Za-z0-9+#_-]*)\s+title\s*=\s*["']([^"']+)["']\s*$/.exec(t);
  if (titled) return { lang: titled[1].toLowerCase(), file: titled[2].trim() };
  const colon = /^([A-Za-z0-9+#_-]*):(.+)$/.exec(t);
  if (colon) return { lang: colon[1].toLowerCase(), file: colon[2].trim() };
  const spaced = /^([A-Za-z0-9+#_-]*)\s+(.+)$/.exec(t);
  if (spaced) return { lang: spaced[1].toLowerCase(), file: spaced[2].trim() };
  return { lang: t.toLowerCase(), file: "" };
}
function formatFenceInfo(lang, file) {
  const f = file.trim();
  if (!f) return lang;
  return lang ? `${lang} ${f}` : f;
}
function stripTags(s) {
  return s.replace(/<[^>]*>/g, "").trim();
}
function indentedTables(lines) {
  const out = [];
  const row = /^([ \t]+)\|/;
  for (let i = 0; i < lines.length; i++) {
    const m = row.exec(lines[i]);
    if (!m) continue;
    const indent = m[1];
    let to = i;
    while (to + 1 < lines.length && lines[to + 1].startsWith(indent) && /^\|/.test(lines[to + 1].slice(indent.length))) to++;
    const divider = lines[i + 1]?.slice(indent.length) ?? "";
    if (to > i && /^\|?[ \t]*:?-{3,}:?[ \t]*(?:\|[ \t]*:?-{3,}:?[ \t]*)*\|?[ \t]*$/.test(divider)) out.push({ from: i, to, indent });
    i = to;
  }
  return out;
}
function removeItemAt(lines, line) {
  const m = /^(\s*)((?:[-*+])|(\d+)([.)]))[ \t]*(?:\[.\][ \t]*)?$/.exec(lines[line] ?? "");
  if (!m) return null;
  const indent = m[1];
  const out = [...lines.slice(0, line), ...lines.slice(line + 1)];
  if (m[3] === void 0) return { lines: out, caret: line };
  const sameRun = (s) => {
    if (s === void 0) return null;
    const mm = /^(\s*)(\d+)([.)])\s+/.exec(s);
    return mm && mm[1] === indent ? mm : null;
  };
  if (!sameRun(out[line])) return { lines: out, caret: line };
  let first = line;
  while (first > 0 && sameRun(out[first - 1])) first--;
  let last = line;
  while (last + 1 < out.length && sameRun(out[last + 1])) last++;
  const start = Number((first === line ? m[3] : sameRun(out[first])?.[2]) ?? "1");
  for (let i = first, n = start; i <= last; i++, n++) {
    out[i] = out[i].replace(/^(\s*)(\d+)([.)])/, `$1${n}$3`);
  }
  return { lines: out, caret: line };
}
function insertItemAbove(lines, line) {
  const m = /^(\s*)((?:[-*+])|(\d+)([.)]))\s+/.exec(lines[line] ?? "");
  if (!m) return null;
  const indent = m[1];
  const ordered = m[3] !== void 0;
  const blank = ordered ? `${indent}${m[3]}${m[4]} ` : `${indent}${m[2]} `;
  const out = [...lines.slice(0, line), blank, ...lines.slice(line)];
  if (!ordered) return { lines: out, caret: line };
  const sameRun = (s) => {
    if (s === void 0) return null;
    const mm = /^(\s*)(\d+)([.)])\s+/.exec(s);
    return mm && mm[1] === indent ? mm : null;
  };
  let first = line;
  while (first > 0 && sameRun(out[first - 1])) first--;
  let last = line;
  while (last + 1 < out.length && sameRun(out[last + 1])) last++;
  const start = Number(sameRun(out[first])?.[2] ?? "1");
  for (let i = first, n = start; i <= last; i++, n++) {
    out[i] = out[i].replace(/^(\s*)(\d+)([.)])/, `$1${n}$3`);
  }
  return { lines: out, caret: line };
}
var MIN_COL_W = 48;
var MAX_COL_W = 1200;
function splitTableRow(line) {
  if (!line.includes("|")) return null;
  const out = [];
  let cur = "";
  for (let i = 0; i < line.length; i++) {
    if (line[i] === "\\" && line[i + 1] === "|") {
      cur += "\\|";
      i++;
      continue;
    }
    if (line[i] === "|") {
      out.push(cur);
      cur = "";
      continue;
    }
    cur += line[i];
  }
  out.push(cur);
  return out.length >= 3 ? out : null;
}
var PTB_SPAN = /^\s*<span class="(ptb[^"]*)"([^>]*)>([\s\S]*)<\/span>\s*$/;
function setHeaderCellWidth(line, col, width) {
  const pieces = splitTableRow(line);
  if (!pieces) return null;
  const idx = col + 1;
  if (idx < 1 || idx >= pieces.length) return null;
  const piece = pieces[idx];
  const w = width == null ? null : String(Math.max(MIN_COL_W, Math.min(MAX_COL_W, Math.round(width))));
  const m = piece.match(PTB_SPAN);
  let next;
  if (m) {
    const cls = m[1];
    let attrs = m[2].replace(/\s*data-w="\d{2,4}"/, "");
    if (w) attrs += ` data-w="${w}"`;
    next = attrs.trim() === "" && cls === "ptb" ? ` ${m[3].trim()} ` : ` <span class="${cls}"${attrs}>${m[3]}</span> `;
  } else {
    if (!w) return null;
    next = ` <span class="ptb" data-w="${w}">${piece.trim()}</span> `;
  }
  if (next === piece) return null;
  pieces[idx] = next;
  return pieces.join("|");
}
function headerCellWidth(line, col) {
  const pieces = splitTableRow(line);
  if (!pieces) return null;
  const piece = pieces[col + 1];
  const w = piece?.match(/<span class="ptb[^"]*"[^>]*\sdata-w="(\d{2,4})"/)?.[1];
  return w ? Number(w) : null;
}

// src/dictate.ts
function buildMultipart(fields, fileField, filename, mime, file, boundary = "----powereditor" + Date.now().toString(36)) {
  const enc = new TextEncoder();
  const chunks = [];
  for (const [k, v] of Object.entries(fields)) {
    chunks.push(enc.encode(`--${boundary}\r
Content-Disposition: form-data; name="${k}"\r
\r
${v}\r
`));
  }
  chunks.push(
    enc.encode(
      `--${boundary}\r
Content-Disposition: form-data; name="${fileField}"; filename="${filename}"\r
Content-Type: ${mime}\r
\r
`
    )
  );
  chunks.push(new Uint8Array(file));
  chunks.push(enc.encode(`\r
--${boundary}--\r
`));
  const total = chunks.reduce((n, c) => n + c.byteLength, 0);
  const body = new Uint8Array(total);
  let at = 0;
  for (const c of chunks) {
    body.set(c, at);
    at += c.byteLength;
  }
  return { contentType: `multipart/form-data; boundary=${boundary}`, body: body.buffer };
}
function planDictationInsert(line, text) {
  const t = text.trim();
  if (!line.trim()) return { atEnd: false, insert: t };
  return { atEnd: true, insert: "\n\n" + t };
}

// src/embed.ts
var SIZE = /^\d+(x\d+)?$/;
function resizeEmbed(line, target, width) {
  const wiki = /!\[\[([^\]]+)\]\]/g;
  let m;
  while (m = wiki.exec(line)) {
    const parts2 = m[1].split("|");
    if (!sameTarget(parts2[0], target)) continue;
    const kept = [parts2[0], ...parts2.slice(1).filter((p) => !SIZE.test(p.trim()))];
    if (width != null) kept.push(String(width));
    return line.slice(0, m.index) + `![[${kept.join("|")}]]` + line.slice(m.index + m[0].length);
  }
  const md = /!\[([^\]]*)\]\(([^)]*)\)/g;
  while (m = md.exec(line)) {
    if (!sameTarget(m[2], target)) continue;
    const alt = m[1].split("|").filter((p) => !SIZE.test(p.trim())).join("|");
    const next = width != null ? alt ? `${alt}|${width}` : String(width) : alt;
    return line.slice(0, m.index) + `![${next}](${m[2]})` + line.slice(m.index + m[0].length);
  }
  return null;
}
function editEmbed(line, target, edit) {
  const wiki = /!\[\[([^\]]+)\]\]/g;
  let m;
  while (m = wiki.exec(line)) {
    const parts2 = m[1].split("|").map((p) => p.trim());
    if (!sameTarget(parts2[0], target)) continue;
    const file = edit.file !== void 0 ? edit.file : parts2[0];
    let alias = parts2.slice(1).filter((p) => !SIZE.test(p)).join("|");
    if (edit.alt !== void 0) alias = edit.alt ?? "";
    let size = parts2.slice(1).find((p) => SIZE.test(p)) ?? "";
    if (edit.width !== void 0) size = edit.width == null ? "" : String(edit.width);
    const kept = [file, ...alias ? [alias] : [], ...size ? [size] : []];
    return line.slice(0, m.index) + `![[${kept.join("|")}]]` + line.slice(m.index + m[0].length);
  }
  const md = /!\[([^\]]*)\]\(([^)]*)\)/g;
  while (m = md.exec(line)) {
    if (!sameTarget(m[2], target)) continue;
    const bits = m[1].split("|").map((p) => p.trim()).filter(Boolean);
    let alias = bits.filter((p) => !SIZE.test(p)).join("|");
    if (edit.alt !== void 0) alias = edit.alt ?? "";
    let size = bits.find((p) => SIZE.test(p)) ?? "";
    if (edit.width !== void 0) size = edit.width == null ? "" : String(edit.width);
    const src = edit.file !== void 0 ? edit.file : m[2];
    const label = [alias, size].filter(Boolean).join("|");
    return line.slice(0, m.index) + `![${label}](${src})` + line.slice(m.index + m[0].length);
  }
  return null;
}
function embedInfo(line, target) {
  const wiki = /!\[\[([^\]]+)\]\]/g;
  let m;
  while (m = wiki.exec(line)) {
    const parts2 = m[1].split("|").map((p) => p.trim());
    if (!sameTarget(parts2[0], target)) continue;
    const size = parts2.slice(1).find((p) => SIZE.test(p));
    return {
      alt: parts2.slice(1).filter((p) => !SIZE.test(p)).join("|"),
      width: size ? Number(size.split("x")[0]) : null,
      kind: "wiki"
    };
  }
  const md = /!\[([^\]]*)\]\(([^)]*)\)/g;
  while (m = md.exec(line)) {
    if (!sameTarget(m[2], target)) continue;
    const bits = m[1].split("|").map((p) => p.trim()).filter(Boolean);
    const size = bits.find((p) => SIZE.test(p));
    return {
      alt: bits.filter((p) => !SIZE.test(p)).join("|"),
      width: size ? Number(size.split("x")[0]) : null,
      kind: "md"
    };
  }
  return null;
}
function removeEmbed(line, target) {
  for (const re of [/!\[\[([^\]]+)\]\]/g, /!\[([^\]]*)\]\(([^)]*)\)/g]) {
    let m;
    while (m = re.exec(line)) {
      const written = m[0].startsWith("![[") ? m[1].split("|")[0] : m[2];
      if (!sameTarget(written, target)) continue;
      return (line.slice(0, m.index) + line.slice(m.index + m[0].length)).replace(/\s{2,}/g, " ");
    }
  }
  return null;
}
function sameTarget(written, rendered) {
  const a = written.trim().split("#")[0];
  const b = rendered.trim().split("#")[0];
  if (!a || !b) return false;
  if (a === b) return true;
  const an = basename(a);
  const bn = basename(b);
  return an === bn && an !== "";
}
function basename(p) {
  try {
    p = decodeURIComponent(p);
  } catch {
  }
  return p.split(/[/\\]/).pop() ?? p;
}

// src/files.ts
function folderOf(path2) {
  const at = path2.lastIndexOf("/");
  return at < 0 ? "" : path2.slice(0, at);
}
function nameOf(path2) {
  const at = path2.lastIndexOf("/");
  return at < 0 ? path2 : path2.slice(at + 1);
}
function extOf(name) {
  const base = nameOf(name);
  const at = base.lastIndexOf(".");
  return at > 0 ? base.slice(at + 1).toLowerCase() : "";
}
function stemOf(name) {
  const base = nameOf(name);
  const ext = extOf(base);
  return ext ? base.slice(0, base.length - ext.length - 1) : base;
}
function attachmentFolder(notePath, mode, subfolder) {
  if (mode === "obsidian" || !notePath) return null;
  const here = folderOf(notePath);
  if (mode === "note") return here;
  const sub = folderName(subfolder, stemOf(notePath));
  if (!sub) return here;
  return here ? `${here}/${sub}` : sub;
}
function folderName(pattern, noteStem) {
  return pattern.replace(/\{note\}/gi, noteStem).split("/").map((seg) => safeFileName(seg, "")).filter(Boolean).join("/");
}
function safeFileName(name, fallback) {
  const cleaned = nameOf(name.replace(/\\/g, "/")).replace(/[<>:"|?*#^[\]]/g, "-").replace(/\s+/g, " ").replace(/^[.\s]+/, "").replace(/[.\s]+$/, "").trim();
  return cleaned || fallback;
}
function freePath(folder, name, taken) {
  const join = (n) => folder ? `${folder}/${n}` : n;
  if (!taken(join(name))) return join(name);
  const ext = extOf(name);
  const stem = stemOf(name);
  const suffix = ext ? `.${ext}` : "";
  for (let n = 1; n < 1e3; n++) {
    const candidate = join(`${stem} ${n}${suffix}`);
    if (!taken(candidate)) return candidate;
  }
  return join(`${stem} ${(/* @__PURE__ */ new Date()).toISOString().replace(/\D/g, "")}${suffix}`);
}
var EMBEDDABLE = /* @__PURE__ */ new Set([
  "pdf",
  "md",
  "canvas",
  "png",
  "jpg",
  "jpeg",
  "gif",
  "bmp",
  "svg",
  "webp",
  "avif",
  "mp3",
  "wav",
  "m4a",
  "ogg",
  "3gp",
  "flac",
  "webm",
  "mp4",
  "mov",
  "mkv",
  "ogv"
]);
var IMAGES = /* @__PURE__ */ new Set(["png", "jpg", "jpeg", "gif", "bmp", "svg", "webp", "avif"]);
function isEmbeddable(name, pdf) {
  const ext = extOf(name);
  if (ext === "pdf") return pdf === "embed";
  return EMBEDDABLE.has(ext);
}
function isImageFile(name, mimeType = "") {
  return IMAGES.has(extOf(name)) || mimeType.startsWith("image/");
}
function attachmentMarkdown(link, name, pdf) {
  if (isEmbeddable(name, pdf)) return link.startsWith("!") ? link : "!" + link;
  return link.startsWith("!") ? link.slice(1) : link;
}
var FENCE_AT = /^\s*(```|~~~)/;
var PDF_WIKI_EMBED = /!(\[\[[^\]]*\.pdf[^\]]*\]\])/gi;
var PDF_MD_EMBED = /!(\[[^\]]*\]\([^)]*\.pdf[^)]*\))/gi;
function unembedPdfs(text) {
  let count = 0;
  let fenced = false;
  const drop = (line) => line.replace(PDF_WIKI_EMBED, (_m, keep) => (count++, keep)).replace(PDF_MD_EMBED, (_m, keep) => (count++, keep));
  const out = text.split("\n").map((line) => {
    if (FENCE_AT.test(line)) {
      fenced = !fenced;
      return line;
    }
    return fenced ? line : drop(line);
  });
  return { text: out.join("\n"), count };
}

// src/paneeditor.ts
var import_obsidian = require("obsidian");
var paneOwners = /* @__PURE__ */ new WeakSet();
function isPaneOwner(o) {
  return typeof o === "object" && o != null && paneOwners.has(o);
}
function resolveEditorClass(app) {
  try {
    const registry = app.embedRegistry;
    const mdEmbed = registry?.embedByExtension?.["md"];
    if (typeof mdEmbed !== "function") return null;
    const temp = mdEmbed(
      { app, containerEl: createDiv() },
      null,
      ""
    );
    if (!temp || typeof temp["showEditor"] !== "function") return null;
    temp["editable"] = true;
    temp["showEditor"].call(temp);
    const editMode = temp["editMode"];
    if (!editMode) return null;
    const proto = Object.getPrototypeOf(Object.getPrototypeOf(editMode));
    temp["unload"]?.call(temp);
    return typeof proto?.constructor === "function" ? proto.constructor : null;
  } catch {
    return null;
  }
}
var cachedClass;
function createPaneEditor(app, container, opts) {
  try {
    if (cachedClass === void 0) cachedClass = resolveEditorClass(app);
    const EditorClass = cachedClass;
    if (!EditorClass) return null;
    const hostFile = app.vault.getAbstractFileByPath(opts.sourcePath);
    const owner = {
      app,
      file: hostFile instanceof import_obsidian.TFile ? hostFile : null,
      getMode: () => "source",
      onMarkdownScroll: () => {
      },
      requestSave: () => {
      }
    };
    paneOwners.add(owner);
    const PaneClass = class extends EditorClass {
      onUpdate(update, changed) {
        const base = Object.getPrototypeOf(Object.getPrototypeOf(this))["onUpdate"];
        if (typeof base === "function") base.call(this, update, changed);
        if (changed) opts.onChange();
      }
    };
    const ed = new PaneClass(app, container, owner);
    owner["editMode"] = ed;
    Object.defineProperty(owner, "editor", {
      get: () => ed["editor"],
      configurable: true
    });
    ed["set"].call(ed, opts.value, true);
    const cm = ed["cm"] ?? ed["editor"]?.cm;
    if (!cm) {
      ed["destroy"]?.call(ed);
      container.empty();
      return null;
    }
    container.addClass("markdown-source-view", "mod-cm6", "ped-tab-cm");
    cm.dom.addEventListener("focusin", () => {
      app.workspace.activeEditor = owner;
    });
    cm.dom.addEventListener("focusout", () => opts.onBlur());
    cm.dom.addEventListener(
      "keydown",
      (e) => {
        if (e.key === "Escape") {
          e.stopPropagation();
          opts.onEscape();
        }
      },
      { capture: true }
    );
    return {
      editor: () => ed["editor"] ?? null,
      value: () => cm.state.doc.toString(),
      hasFocus: () => cm.hasFocus,
      focus: () => cm.focus(),
      destroy: () => {
        try {
          const ws = app.workspace;
          if (ws.activeEditor === owner) ws.activeEditor = null;
          ed["destroy"]?.call(ed);
        } catch {
        }
        container.empty();
      }
    };
  } catch {
    return null;
  }
}

// src/tasks.ts
var PRIORITY_EMOJI = ["\u{1F53A}", "\u23EB", "\u{1F53C}", "", "\u{1F53D}", "\u23EC"];
var DATE_TOKENS = [
  ["due", "\u{1F4C5}"],
  ["scheduled", "\u23F3"],
  ["start", "\u{1F6EB}"],
  ["doneDate", "\u2705"]
];
function parseTodo(line) {
  const m = line.match(/^(\s*)([-*+]|\d+[.)])\s+\[(.)\]\s+(.*)$/);
  if (!m) return null;
  const t = { indent: m[1], marker: m[2], checked: m[3] !== " ", body: "", priority: 3 };
  let rest = m[4];
  for (const [key, emoji] of DATE_TOKENS) {
    const dm = rest.match(new RegExp(emoji + "\\uFE0F?\\s*(\\d{4}-\\d{2}-\\d{2})"));
    if (dm) {
      t[key] = dm[1];
      rest = rest.replace(dm[0], " ");
    }
  }
  const tm = rest.match(/⏰️?\s*(\d{1,2}:\d{2})/);
  if (tm) {
    t.time = tm[1];
    rest = rest.replace(tm[0], " ");
  }
  for (let p = 0; p < PRIORITY_EMOJI.length; p++) {
    if (PRIORITY_EMOJI[p] && rest.includes(PRIORITY_EMOJI[p])) {
      t.priority = p;
      rest = rest.replace(PRIORITY_EMOJI[p], " ");
      break;
    }
  }
  const rm = rest.match(/🔁️?\s*([^\n]*?)\s*$/);
  if (rm && rm[1]) {
    let cand = rm[1].trim();
    while (cand && !parseRecurrence(cand)) cand = cand.replace(/\s*,?\s*\S+$/, "");
    if (cand) {
      t.recurrence = cand;
      const tail = rm[1].trim().slice(cand.length);
      rest = rest.slice(0, rm.index) + " " + tail;
    }
  }
  t.body = rest.replace(/\s+/g, " ").trim();
  return t;
}
function formatTodo(t) {
  const parts2 = [t.body];
  if (t.priority !== 3) parts2.push(PRIORITY_EMOJI[t.priority]);
  if (t.time) parts2.push("\u23F0 " + t.time);
  if (t.recurrence) parts2.push("\u{1F501} " + t.recurrence);
  if (t.start) parts2.push("\u{1F6EB} " + t.start);
  if (t.scheduled) parts2.push("\u23F3 " + t.scheduled);
  if (t.due) parts2.push("\u{1F4C5} " + t.due);
  if (t.doneDate) parts2.push("\u2705 " + t.doneDate);
  return `${t.indent}${t.marker} [${t.checked ? "x" : " "}] ` + parts2.filter(Boolean).join(" ");
}
var pad = (n) => String(n).padStart(2, "0");
var fmt = (y, m, d) => `${y}-${pad(m)}-${pad(d)}`;
var parts = (s) => s.split("-").map(Number);
var daysInMonth = (y, m) => new Date(Date.UTC(y, m, 0)).getUTCDate();
function addDays(date, n) {
  const [y, m, d] = parts(date);
  const t = new Date(Date.UTC(y, m - 1, d + n));
  return fmt(t.getUTCFullYear(), t.getUTCMonth() + 1, t.getUTCDate());
}
function addMonths(date, n) {
  const [y, m, d] = parts(date);
  const total = y * 12 + (m - 1) + n;
  const ny = Math.floor(total / 12);
  const nm = total % 12 + 1;
  return fmt(ny, nm, Math.min(d, daysInMonth(ny, nm)));
}
var diffDays = (a, b) => {
  const [ay, am, ad] = parts(a);
  const [by, bm, bd] = parts(b);
  return Math.round((Date.UTC(by, bm - 1, bd) - Date.UTC(ay, am - 1, ad)) / 864e5);
};
var WEEKDAYS = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
function weekdayIndex(word) {
  const w = word.trim().toLowerCase();
  if (w.length < 3) return null;
  const i = WEEKDAYS.findIndex((full) => full.startsWith(w) || w.startsWith(full));
  return i === -1 ? null : i;
}
var dayOfWeek = (date) => {
  const [y, m, d] = parts(date);
  return new Date(Date.UTC(y, m - 1, d)).getUTCDay();
};
function parseRecurrence(rule) {
  let r = rule.trim().toLowerCase().replace(/\s+/g, " ");
  const whenDone = / when done$/.test(r);
  r = r.replace(/ when done$/, "");
  const base = { n: 1, unit: "week", weekdays: null, dayOfMonth: null, lastWeekday: null, whenDone };
  let m = r.match(/^every(?: (\d+))? (day|week|month|year)s?$/);
  if (m) return { ...base, n: m[1] ? Number(m[1]) : 1, unit: m[2] };
  m = r.match(/^every(?: (\d+))? months? on the (\d+)(?:st|nd|rd|th)?$/);
  if (m) return { ...base, n: m[1] ? Number(m[1]) : 1, unit: "month", dayOfMonth: Number(m[2]) };
  m = r.match(/^every last ([a-z]+)$/);
  if (m) {
    const wd = weekdayIndex(m[1]);
    return wd == null ? null : { ...base, unit: "month", lastWeekday: wd };
  }
  if (/^every weekdays?$/.test(r)) return { ...base, weekdays: [1, 2, 3, 4, 5] };
  m = r.match(/^every ([a-z]{3,9}(?: ?, ?[a-z]{3,9})*)$/);
  if (m) {
    const days = m[1].split(",").map((w) => weekdayIndex(w));
    if (days.every((d) => d != null)) return { ...base, weekdays: [...new Set(days)].sort() };
  }
  return null;
}
function lastWeekdayOfMonth(date, wd) {
  const [y, m] = parts(date);
  let cur = fmt(y, m, daysInMonth(y, m));
  while (dayOfWeek(cur) !== wd) cur = addDays(cur, -1);
  return cur;
}
function nextDate(base, rec) {
  if (rec.weekdays) {
    let cur = base;
    for (let i = 0; i < 7; i++) {
      cur = addDays(cur, 1);
      if (rec.weekdays.includes(dayOfWeek(cur))) return cur;
    }
    return cur;
  }
  if (rec.lastWeekday != null) return lastWeekdayOfMonth(addMonths(fmt(parts(base)[0], parts(base)[1], 1), 1), rec.lastWeekday);
  if (rec.dayOfMonth != null) {
    const moved = addMonths(base, rec.n);
    const [y, m] = parts(moved);
    return fmt(y, m, Math.min(rec.dayOfMonth, daysInMonth(y, m)));
  }
  if (rec.unit === "day") return addDays(base, rec.n);
  if (rec.unit === "week") return addDays(base, rec.n * 7);
  if (rec.unit === "month") return addMonths(base, rec.n);
  return addMonths(base, rec.n * 12);
}
function setDueDate(line, date) {
  const t = parseTodo(line);
  if (!t) return null;
  if (date == null) delete t.due;
  else t.due = date;
  return formatTodo(t);
}
function setPriority(line, priority) {
  const t = parseTodo(line);
  if (!t) return null;
  t.priority = Math.max(0, Math.min(5, Math.round(priority)));
  return formatTodo(t);
}
function archiveCompleted(lines) {
  const isDoneHeading = (l) => /^##\s+Done\s*$/.test(l);
  let doneStart = lines.findIndex(isDoneHeading);
  let doneEnd = lines.length;
  if (doneStart !== -1) {
    for (let i2 = doneStart + 1; i2 < lines.length; i2++) {
      if (/^#{1,2}\s/.test(lines[i2])) {
        doneEnd = i2;
        break;
      }
    }
  }
  const keep = [];
  const movedLines = [];
  let moved = 0;
  let i = 0;
  while (i < lines.length) {
    if (doneStart !== -1 && i >= doneStart && i < doneEnd) {
      keep.push(lines[i]);
      i++;
      continue;
    }
    const t = parseTodo(lines[i]);
    if (t?.checked) {
      const indent = lines[i].match(/^\s*/)[0].length;
      let j = i + 1;
      let openChild = false;
      while (j < lines.length && lines[j].trim() && lines[j].match(/^\s*/)[0].length > indent) {
        const c = parseTodo(lines[j]);
        if (c && !c.checked) openChild = true;
        j++;
      }
      if (!openChild) {
        movedLines.push(...lines.slice(i, j));
        moved++;
        i = j;
        continue;
      }
      keep.push(...lines.slice(i, j));
      i = j;
      continue;
    }
    keep.push(lines[i]);
    i++;
  }
  if (!moved) return { lines, moved: 0 };
  let out;
  const keptDone = keep.findIndex(isDoneHeading);
  if (keptDone !== -1) {
    let end = keep.length;
    for (let k = keptDone + 1; k < keep.length; k++) {
      if (/^#{1,2}\s/.test(keep[k])) {
        end = k;
        break;
      }
    }
    while (end > keptDone + 1 && !keep[end - 1].trim()) end--;
    out = [...keep.slice(0, end), ...movedLines, ...keep.slice(end)];
  } else {
    while (keep.length && !keep[keep.length - 1].trim()) keep.pop();
    out = [...keep, "", "## Done", "", ...movedLines];
  }
  while (out.length && !out[out.length - 1].trim()) out.pop();
  return { lines: out, moved };
}
function toggleTodo(line, today, stampDone) {
  const t = parseTodo(line);
  if (!t) return null;
  if (t.checked) {
    t.checked = false;
    delete t.doneDate;
    return { line: formatTodo(t), spawned: null };
  }
  t.checked = true;
  if (stampDone) t.doneDate = today;
  let spawned = null;
  const rec = t.recurrence ? parseRecurrence(t.recurrence) : null;
  if (rec) {
    const anchor = t.due ?? t.scheduled ?? t.start;
    const base = rec.whenDone || !anchor ? today : anchor;
    const next = nextDate(base, rec);
    const clone = { ...t, checked: false };
    delete clone.doneDate;
    if (anchor) {
      const shift = diffDays(anchor, next);
      if (clone.due) clone.due = addDays(clone.due, shift);
      if (clone.scheduled) clone.scheduled = addDays(clone.scheduled, shift);
      if (clone.start) clone.start = addDays(clone.start, shift);
    } else {
      clone.due = next;
    }
    spawned = formatTodo(clone);
  }
  return { line: formatTodo(t), spawned };
}
function parseQuery(source) {
  const query = { filters: [], sortBy: null, sortDesc: false, groupBy: null, limit: null, view: "list" };
  const errors = [];
  for (const raw of source.split("\n")) {
    const line = raw.trim();
    if (!line || line.startsWith("#")) continue;
    const l = line.toLowerCase();
    let m;
    if (l === "done") query.filters.push({ kind: "done" });
    else if (l === "not done" || l === "hide done") query.filters.push({ kind: "notDone" });
    else if (l === "overdue") query.filters.push({ kind: "overdue" });
    else if (l === "has due date") query.filters.push({ kind: "hasDue" });
    else if (l === "no due date") query.filters.push({ kind: "noDue" });
    else if (l === "is recurring") query.filters.push({ kind: "recurring" });
    else if (l === "is not recurring") query.filters.push({ kind: "notRecurring" });
    else if (m = l.match(/^due before (.+)$/)) query.filters.push({ kind: "dueBefore", arg: m[1] });
    else if (m = l.match(/^due after (.+)$/)) query.filters.push({ kind: "dueAfter", arg: m[1] });
    else if (m = l.match(/^due (?:on )?(.+)$/)) query.filters.push({ kind: "dueIn", arg: m[1] });
    else if (m = line.match(/^path does not include (.+)$/i)) query.filters.push({ kind: "pathExcludes", arg: m[1] });
    else if (m = line.match(/^path includes (.+)$/i)) query.filters.push({ kind: "pathIncludes", arg: m[1] });
    else if (m = line.match(/^text does not include (.+)$/i)) query.filters.push({ kind: "textExcludes", arg: m[1] });
    else if (m = line.match(/^text includes (.+)$/i)) query.filters.push({ kind: "textIncludes", arg: m[1] });
    else if (m = line.match(/^tag does not include (.+)$/i)) query.filters.push({ kind: "tagExcludes", arg: m[1] });
    else if (m = line.match(/^tag includes (.+)$/i)) query.filters.push({ kind: "tagIncludes", arg: m[1] });
    else if (m = l.match(/^priority is (highest|high|medium|none|low|lowest)$/))
      query.filters.push({ kind: "priorityIs", arg: m[1] });
    else if (m = l.match(/^sort by (due|text|path|priority)( desc)?$/)) {
      query.sortBy = m[1];
      query.sortDesc = !!m[2];
    } else if (m = l.match(/^group by (file|due|priority)$/)) query.groupBy = m[1];
    else if (m = l.match(/^view (list|week|board)$/)) query.view = m[1];
    else if (m = l.match(/^limit (\d+)$/)) query.limit = Number(m[1]);
    else errors.push(`Unknown filter: "${line}"`);
  }
  return { query, errors };
}
function hasTag(body, tag) {
  const t = tag.startsWith("#") ? tag : "#" + tag;
  const esc = t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(esc + "(?![\\w/-])", "i").test(body);
}
function resolveRange(phrase, today) {
  const p = phrase.trim().toLowerCase();
  if (/^\d{4}-\d{2}-\d{2}$/.test(p)) return [p, p];
  if (p === "today") return [today, today];
  if (p === "tomorrow") return [addDays(today, 1), addDays(today, 1)];
  if (p === "yesterday") return [addDays(today, -1), addDays(today, -1)];
  const [y, m, d] = parts(today);
  const dow = new Date(Date.UTC(y, m - 1, d)).getUTCDay();
  const monday = addDays(today, dow === 0 ? -6 : 1 - dow);
  if (p === "this week") return [monday, addDays(monday, 6)];
  if (p === "next week") return [addDays(monday, 7), addDays(monday, 13)];
  if (p === "this month") return [fmt(y, m, 1), fmt(y, m, daysInMonth(y, m))];
  return null;
}
var PRIORITY_NAMES = { highest: 0, high: 1, medium: 2, none: 3, low: 4, lowest: 5 };
function matches(t, f, today) {
  switch (f.kind) {
    case "done":
      return t.checked;
    case "notDone":
      return !t.checked;
    case "overdue":
      return !t.checked && t.due != null && t.due < today;
    case "hasDue":
      return t.due != null;
    case "noDue":
      return t.due == null;
    case "recurring":
      return t.recurrence != null;
    case "notRecurring":
      return t.recurrence == null;
    case "dueBefore": {
      const r = resolveRange(f.arg ?? "", today);
      return r != null && t.due != null && t.due < r[0];
    }
    case "dueAfter": {
      const r = resolveRange(f.arg ?? "", today);
      return r != null && t.due != null && t.due > r[1];
    }
    case "dueIn": {
      const r = resolveRange(f.arg ?? "", today);
      return r != null && t.due != null && t.due >= r[0] && t.due <= r[1];
    }
    case "pathIncludes":
      return (t.path ?? "").toLowerCase().includes((f.arg ?? "").toLowerCase());
    case "pathExcludes":
      return !(t.path ?? "").toLowerCase().includes((f.arg ?? "").toLowerCase());
    case "textIncludes":
      return t.body.toLowerCase().includes((f.arg ?? "").toLowerCase());
    case "textExcludes":
      return !t.body.toLowerCase().includes((f.arg ?? "").toLowerCase());
    case "tagIncludes":
      return hasTag(t.body, f.arg ?? "");
    case "tagExcludes":
      return !hasTag(t.body, f.arg ?? "");
    case "priorityIs":
      return t.priority === PRIORITY_NAMES[f.arg ?? "none"];
  }
}
var PRIORITY_LABELS = ["Highest", "High", "Medium", "Normal", "Low", "Lowest"];
function runQuery(query, items, today) {
  let hits = items.filter((t) => query.filters.every((f) => matches(t, f, today)));
  const byDue = (a, b) => (a.due ?? "9999").localeCompare(b.due ?? "9999");
  const byPath = (a, b) => (a.path ?? "").localeCompare(b.path ?? "") || (a.line ?? 0) - (b.line ?? 0);
  const primary = {
    due: byDue,
    text: (a, b) => a.body.localeCompare(b.body),
    path: byPath,
    priority: (a, b) => a.priority - b.priority
  };
  const key = query.sortBy ?? "due";
  const dir = query.sortDesc ? -1 : 1;
  hits = [...hits].sort((a, b) => dir * primary[key](a, b) || byDue(a, b) || byPath(a, b));
  if (query.limit != null) hits = hits.slice(0, query.limit);
  if (!query.groupBy) return hits.length ? [{ heading: "", items: hits }] : [];
  const meta = (t) => query.groupBy === "file" ? [t.path ?? "", (t.path ?? "").replace(/\.md$/, "")] : query.groupBy === "due" ? [t.due ?? "9999", t.due ?? "No date"] : [String(t.priority), PRIORITY_LABELS[t.priority]];
  const groups = /* @__PURE__ */ new Map();
  for (const t of hits) {
    const [k, h] = meta(t);
    const g = groups.get(k) ?? { heading: h, items: [] };
    g.items.push(t);
    groups.set(k, g);
  }
  return [...groups.entries()].sort(([a], [b]) => a.localeCompare(b)).map(([, g]) => g);
}
var MONTHS = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];
function monthIndex(word) {
  const w = word.trim().toLowerCase();
  if (w.length < 3) return null;
  const i = MONTHS.findIndex((full) => full.startsWith(w));
  return i === -1 ? null : i + 1;
}
function parseDatePhrase(phrase, today) {
  const p = phrase.trim().toLowerCase().replace(/\s+/g, " ");
  if (/^\d{4}-\d{2}-\d{2}$/.test(p)) return p;
  if (p === "today") return today;
  if (p === "tomorrow") return addDays(today, 1);
  if (p === "yesterday") return addDays(today, -1);
  if (p === "next week") {
    const dow = dayOfWeek(today);
    return addDays(today, (1 - dow + 7) % 7 || 7);
  }
  let m = p.match(/^(next )?([a-z]{3,9})$/);
  if (m) {
    const wd = weekdayIndex(m[2]);
    if (wd != null) {
      const ahead = (wd - dayOfWeek(today) + 7) % 7 || 7;
      return addDays(today, ahead + (m[1] ? 7 : 0));
    }
  }
  m = p.match(/^in (\d+) (day|week|month)s?$/);
  if (m) {
    const n = Number(m[1]);
    return m[2] === "day" ? addDays(today, n) : m[2] === "week" ? addDays(today, n * 7) : addMonths(today, n);
  }
  m = p.match(/^([a-z]{3,9}) (\d{1,2})(?:st|nd|rd|th)?(?: (\d{4}))?$/) ?? p.match(/^(\d{1,2})(?:st|nd|rd|th)? ([a-z]{3,9})(?: (\d{4}))?$/);
  if (m) {
    const monWord = /^\d/.test(m[1]) ? m[2] : m[1];
    const dayWord = /^\d/.test(m[1]) ? m[1] : m[2];
    const mon = monthIndex(monWord);
    const day = Number(dayWord);
    if (mon != null && day >= 1 && day <= 31) {
      const [ty] = parts(today);
      if (m[3]) return fmt(Number(m[3]), mon, Math.min(day, daysInMonth(Number(m[3]), mon)));
      const cand = fmt(ty, mon, Math.min(day, daysInMonth(ty, mon)));
      return cand >= today ? cand : fmt(ty + 1, mon, Math.min(day, daysInMonth(ty + 1, mon)));
    }
  }
  m = p.match(/^(\d{1,2})\/(\d{1,2})(?:\/(\d{4}))?$/);
  if (m) {
    const mon = Number(m[1]);
    const day = Number(m[2]);
    if (mon >= 1 && mon <= 12 && day >= 1 && day <= 31) {
      const [ty] = parts(today);
      if (m[3]) return fmt(Number(m[3]), mon, Math.min(day, daysInMonth(Number(m[3]), mon)));
      const cand = fmt(ty, mon, Math.min(day, daysInMonth(ty, mon)));
      return cand >= today ? cand : fmt(ty + 1, mon, Math.min(day, daysInMonth(ty + 1, mon)));
    }
  }
  return null;
}
function parseQuickTodo(text, today) {
  let rest = text.trim().replace(/\s+/g, " ");
  let due;
  let recurrence;
  const cm = rest.match(/^(.*)\s+(?:by|due|on|starting|from)\s+(.+)$/i);
  if (cm) {
    const d = parseDatePhrase(cm[2], today);
    if (d) {
      due = d;
      rest = cm[1];
    }
  }
  const rm = rest.match(/(?:^|\s)(every\s.+)$/i);
  if (rm) {
    let cand = rm[1].trim();
    while (cand && !parseRecurrence(cand)) cand = cand.replace(/\s*,?\s*\S+$/, "");
    if (cand) {
      recurrence = cand.toLowerCase();
      rest = (rest.slice(0, rm.index ?? 0) + " " + rm[1].trim().slice(cand.length)).trim();
    }
  }
  if (!due) {
    const words = rest.split(" ");
    for (let take = Math.min(4, words.length - 1); take >= 1; take--) {
      const d = parseDatePhrase(words.slice(-take).join(" "), today);
      if (d) {
        due = d;
        rest = words.slice(0, -take).join(" ");
        break;
      }
    }
  }
  const body = rest.replace(/\s+(?:by|due|on|starting|from)$/i, "").replace(/[,;]+\s*$/, "").replace(/\s+/g, " ").trim();
  const out = { body };
  if (due) out.due = due;
  if (recurrence) out.recurrence = recurrence;
  return out;
}

// src/page.ts
function parseCover(fm) {
  const raw = fm?.["cover"];
  if (typeof raw !== "string" || !raw.trim()) return null;
  const value = raw.trim();
  const yRaw = fm?.["cover-y"];
  const y = Math.max(0, Math.min(100, typeof yRaw === "number" ? yRaw : 50));
  const hRaw = typeof fm?.["cover-h"] === "string" ? fm["cover-h"].trim().toLowerCase() : "";
  const height = hRaw === "short" || hRaw === "tall" ? hRaw : "standard";
  if (/^gradient:\d+$/.test(value)) return { kind: "gradient", value, y, height };
  const solid = value.match(/^solid:(.+)$/i);
  if (solid) return { kind: "solid", value: solid[1].trim(), y, height };
  if (/^#[0-9a-fA-F]{3,8}$/.test(value)) return { kind: "solid", value, y, height };
  if (/^https?:\/\//i.test(value)) return { kind: "url", value, y, height };
  const wiki = value.match(/^\[\[([^\]|]+?)(?:\|[^\]]*)?\]\]$/);
  if (wiki) return { kind: "path", value: wiki[1].trim(), y, height };
  return { kind: "path", value, y, height };
}
var GRADIENTS = [
  "linear-gradient(120deg, #f6d365 0%, #fda085 100%)",
  "linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)",
  "linear-gradient(120deg, #d4fc79 0%, #96e6a1 100%)",
  "linear-gradient(120deg, #cfd9df 0%, #e2ebf0 100%)",
  "linear-gradient(120deg, #fbc2eb 0%, #a6c1ee 100%)",
  "linear-gradient(120deg, #fdcbf1 0%, #fdcbf1 1%, #e6dee9 100%)",
  "linear-gradient(120deg, #667eea 0%, #764ba2 100%)",
  "linear-gradient(120deg, #2c3e50 0%, #4ca1af 100%)",
  "linear-gradient(120deg, #ff9a9e 0%, #fecfef 100%)",
  "linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%)",
  "linear-gradient(120deg, #f093fb 0%, #f5576c 100%)",
  "linear-gradient(120deg, #4facfe 0%, #00f2fe 100%)",
  "linear-gradient(120deg, #fa709a 0%, #fee140 100%)",
  "linear-gradient(120deg, #30cfd0 0%, #330867 100%)",
  "linear-gradient(120deg, #ffecd2 0%, #fcb69f 100%)",
  "radial-gradient(circle at 30% 20%, #6a11cb 0%, #2575fc 100%)"
];
var GRADIENT_NAMES = [
  "Peach",
  "Sky",
  "Meadow",
  "Fog",
  "Blossom",
  "Lilac",
  "Twilight",
  "Deep sea",
  "Coral",
  "Mint",
  "Sunset",
  "Azure",
  "Guava",
  "Cosmos",
  "Apricot",
  "Nebula"
];
var SOLIDS = ["#EAE6DF", "#EDE7F6", "#E3F2FD", "#E8F5E9", "#FFF8E1", "#FCE4EC", "#E0F2F1", "#EEF2F5", "#37474F", "#4A3B52"];
var SOLID_NAMES = ["Sand", "Lavender", "Sky", "Sage", "Cream", "Blush", "Teal", "Slate", "Charcoal", "Plum"];
function gradientCss(value) {
  const m = value.match(/^gradient:(\d+)$/);
  if (!m) return null;
  const i = (Number(m[1]) - 1) % GRADIENTS.length;
  return GRADIENTS[(i + GRADIENTS.length) % GRADIENTS.length];
}
function parsePageLayout(fm) {
  const flag = (v) => v === true || v === "true";
  const f = typeof fm?.["font"] === "string" ? fm["font"].trim().toLowerCase() : "";
  const font = f === "serif" ? "serif" : f === "mono" || f === "monospace" ? "mono" : null;
  return { fullWidth: flag(fm?.["full-width"]), font, overlayTitle: flag(fm?.["cover-overlay"]) };
}
function parseIcon(fm) {
  const raw = fm?.["icon"];
  if (typeof raw !== "string") return null;
  const v = raw.trim();
  return v ? v : null;
}
var COMMENT_RE = /%%💬\s*(.*?)%%/g;
function makeComment(text, date) {
  return `%%\u{1F4AC} ${text.trim()} \xB7 ${date}%%`;
}
function commentParts(inner) {
  const m = inner.match(/^(.*?)\s*·\s*(\d{4}-\d{2}-\d{2})$/);
  return m ? { text: m[1].trim(), stamp: m[2] } : { text: inner.trim(), stamp: null };
}
function parseComments(lines) {
  const out = [];
  lines.forEach((line, i) => {
    COMMENT_RE.lastIndex = 0;
    let m;
    while (m = COMMENT_RE.exec(line)) {
      out.push({ line: i, ch: m.index, ...commentParts(m[1]) });
    }
  });
  return out;
}
function replaceCommentText(raw, newText, date) {
  return raw.replace(COMMENT_RE, () => makeComment(newText, date));
}
var asDateStr = (v) => {
  if (typeof v === "string" && /^\d{4}-\d{2}-\d{2}/.test(v.trim())) return v.trim().slice(0, 10);
  return null;
};
function verificationState(fm, today) {
  const since = asDateStr(fm?.["verified"]);
  if (!since) return { state: "none" };
  const until = asDateStr(fm?.["verified-until"]);
  if (until && until < today) return { state: "expired", since, until };
  return { state: "verified", since, until: until ?? null };
}
var MIN = 6e4;
var HOUR = 60 * MIN;
var DAY = 24 * HOUR;
function relativeEdited(then, now) {
  const d = now - then;
  if (!Number.isFinite(then) || then <= 0) return "";
  if (d < 45 * 1e3) return "just now";
  if (d < 90 * 1e3) return "a minute ago";
  if (d < HOUR) return `${Math.round(d / MIN)} minutes ago`;
  if (d < 2 * HOUR) return "an hour ago";
  if (d < DAY) return `${Math.round(d / HOUR)} hours ago`;
  if (d < 2 * DAY) return "yesterday";
  if (d < 30 * DAY) return `${Math.round(d / DAY)} days ago`;
  return new Date(then).toLocaleDateString(void 0, { month: "short", day: "numeric", year: "numeric" });
}
function absoluteEdited(then) {
  if (!Number.isFinite(then) || then <= 0) return "";
  return new Date(then).toLocaleString(void 0, {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit"
  });
}
function editedAt(fm, mtime) {
  for (const key of ["updated", "modified", "last-edited"]) {
    const v = fm?.[key];
    if (typeof v === "string" || typeof v === "number") {
      const t = new Date(v).getTime();
      if (Number.isFinite(t) && t > 0) return t;
    }
  }
  return Number.isFinite(mtime) && mtime > 0 ? mtime : 0;
}

// src/main.ts
var import_obsidian3 = require("obsidian");

// src/format.ts
function headingLevel(line) {
  const m = line.match(/^(#{1,6})\s/);
  return m ? m[1].length : 0;
}
function setHeading(line, level) {
  const m = line.match(/^(\s*(?:>\s*)?)(#{1,6}\s+)?(.*)$/);
  const prefix = m[1];
  const rest = m[3];
  return level ? `${prefix}${"#".repeat(level)} ${rest}` : `${prefix}${rest}`;
}
function emptyHeadingLabel(line) {
  const m = line.match(/^\s*(?:>\s*)?(#{1,6})\s*$/);
  return m ? `Heading ${m[1].length}` : null;
}
function headingCursorSnap(lineText, offsetInLine) {
  const m = lineText.match(/^(#{1,6}\s)/);
  if (!m) return null;
  const markerLen = m[1].length;
  return offsetInLine < markerLen && lineText.length >= markerLen ? markerLen : null;
}
var BLOCK_PREFIX = /^(\s*(?:>\s*)?(?:#{1,6}\s+|(?:[-*+]|\d+[.)])\s+(?:\[.\]\s+)?)?)([\s\S]*)$/;
function colorBlockLine(line, mode, hex) {
  const m = line.match(BLOCK_PREFIX);
  const prefix = m[1];
  let body = m[2];
  if (!body.trim()) return line;
  if (mode === "text") {
    body = body.replace(/<span style="color:[^"]*">([\s\S]*?)<\/span>/gi, "$1");
    return prefix + (hex ? `<span style="color:${hex}">${body}</span>` : body);
  }
  body = body.replace(/<mark[^>]*>([\s\S]*?)<\/mark>/gi, "$1").replace(/==([\s\S]+?)==/g, "$1");
  return prefix + (hex ? `<mark style="background:${hex}">${body}</mark>` : body);
}
function toAlpha(n) {
  let s = "";
  while (n > 0) {
    n--;
    s = String.fromCharCode(97 + n % 26) + s;
    n = Math.floor(n / 26);
  }
  return s;
}
function toRoman(n) {
  const map = [
    [1e3, "m"],
    [900, "cm"],
    [500, "d"],
    [400, "cd"],
    [100, "c"],
    [90, "xc"],
    [50, "l"],
    [40, "xl"],
    [10, "x"],
    [9, "ix"],
    [5, "v"],
    [4, "iv"],
    [1, "i"]
  ];
  let s = "";
  for (const [v, r] of map) while (n >= v) {
    s += r;
    n -= v;
  }
  return s;
}
function formatCounter(n, style) {
  if (!Number.isFinite(n) || n < 1) return String(n);
  switch (style) {
    case "lower-alpha":
      return toAlpha(n);
    case "upper-alpha":
      return toAlpha(n).toUpperCase();
    case "lower-roman":
      return toRoman(n);
    case "upper-roman":
      return toRoman(n).toUpperCase();
    default:
      return String(n);
  }
}
function continueList(line) {
  const om = line.match(/^(\s*)(\d+)([.)])[ \t]+(.*)$/);
  if (om) return om[4].trim() ? { insert: `
${om[1]}${Number(om[2]) + 1}${om[3]} ` } : { clear: om[1] };
  const um = line.match(/^(\s*)([-*+])[ \t]+(.*)$/);
  if (um) return um[3].trim() ? { insert: `
${um[1]}${um[2]} ` } : { clear: um[1] };
  return null;
}
function listContinuation(line, step) {
  const tm = line.match(/^(\s*)([-*+])[ \t]+\[.\](?:[ \t]+|$)/);
  if (tm) return `
${tm[1]}${tm[2]} [ ] `;
  const om = line.match(/^(\s*)(\d+)([.)])(?:[ \t]+|$)/);
  if (om) return `
${om[1]}${Number(om[2]) + step}${om[3]} `;
  const um = line.match(/^(\s*)([-*+])(?:[ \t]+|$)/);
  if (um) return `
${um[1]}${um[2]} `;
  return "\n";
}
function orderedListInfo(line) {
  const m = line.match(/^(\s*)(\d+)([.)])\s/);
  if (!m) return null;
  const indent = m[1];
  const tabs = (indent.match(/\t/g) || []).length;
  const spaces = indent.length - tabs;
  return {
    indent,
    depth: tabs + Math.floor(spaces / 4),
    ordinal: Number(m[2]),
    numStart: indent.length,
    numEnd: indent.length + m[2].length,
    delim: m[3]
  };
}
function linkAt(line, ch) {
  const wiki = /\[\[([^\]|]+)(?:\|([^\]]*))?\]\]/g;
  let m;
  while (m = wiki.exec(line)) {
    if (ch >= m.index && ch <= m.index + m[0].length)
      return { start: m.index, end: m.index + m[0].length, text: m[2] ?? m[1], url: m[1], wiki: true };
  }
  const md = /(^|[^[])\[([^\]]*)\]\(([^)]*)\)/g;
  while (m = md.exec(line)) {
    const start = m.index + m[1].length;
    const end = m.index + m[0].length;
    if (ch >= start && ch <= end) return { start, end, text: m[2], url: m[3], wiki: false };
  }
  const bare = /(?:https?:\/\/|\bwww\.)[^\s<>]+/g;
  while (m = bare.exec(line)) {
    const url = m[0].replace(/[)\]}>.,;:!?"']+$/, "");
    let start = m.index;
    let end = m.index + url.length;
    if (line[start - 1] === "<" && line[end] === ">") {
      start--;
      end++;
    }
    if (ch >= start && ch <= end) return { start, end, text: "", url, wiki: false };
  }
  return null;
}
function alignOf(line) {
  const m = line.match(/<!--al:(center|right)-->/);
  return m ? m[1] : "left";
}
function setAlign(line, align) {
  const stripped = line.replace(/\s*<!--al:(?:center|right)-->/g, "");
  return align === "left" ? stripped : `${stripped}<!--al:${align}-->`;
}
function listKind(line) {
  if (/^\s*(?:[-*+])\s+\[.\]\s/.test(line)) return "task";
  if (/^\s*[-*+]\s/.test(line)) return "bullet";
  if (/^\s*\d+[.)]\s/.test(line)) return "ordered";
  return null;
}
function isQuote(line) {
  return /^\s*>/.test(line);
}
function detectMarks(text) {
  return {
    bold: /\*\*[^*]/.test(text) || /<(?:b|strong)[\s>]/i.test(text),
    italic: /(^|[^*])\*[^*\n]+\*(?!\*)/.test(text) || /<(?:i|em)[\s>]/i.test(text),
    underline: /<u[\s>]/i.test(text),
    strike: /~~[^~]/.test(text) || /<s[\s>]/i.test(text),
    highlight: /==[^=]/.test(text) || /<mark[\s>]/i.test(text),
    color: text.match(/<span style="color:\s*([^";]+)/i)?.[1]?.trim() ?? null
  };
}
function hasAnyMark(m) {
  return m.bold || m.italic || m.underline || m.strike || m.highlight || m.color != null;
}
function wrapperAt(line, chFrom, chTo) {
  const encloses = (re) => {
    re.lastIndex = 0;
    let m;
    while (m = re.exec(line)) {
      if (m.index <= chFrom && m.index + m[0].length >= chTo) return m;
      if (m.index >= chTo) break;
    }
    return null;
  };
  const span = encloses(/<span style="color:\s*([^";]+)[^"]*">[\s\S]*?<\/span>/gi);
  return {
    underline: encloses(/<u>[\s\S]*?<\/u>/gi) != null,
    color: span ? span[1].trim() : null,
    highlighted: encloses(/<mark[^>]*>[\s\S]*?<\/mark>/gi) != null
  };
}
function applyMarks(text, m) {
  let t = stripFormatting(text);
  if (m.bold) t = `**${t}**`;
  if (m.italic) t = `*${t}*`;
  if (m.strike) t = `~~${t}~~`;
  if (m.highlight) t = `==${t}==`;
  if (m.underline) t = `<u>${t}</u>`;
  if (m.color) t = `<span style="color:${m.color}">${t}</span>`;
  return t;
}
var FONT_SIZES = [
  ["Small", "0.85em"],
  ["Normal", null],
  ["Large", "1.25em"],
  ["Huge", "1.6em"]
];
function setFontSize(text, em) {
  let t = text;
  const m = t.match(/^<span style="font-size:[^"]*">([\s\S]*)<\/span>$/i);
  if (m) t = m[1];
  return em ? `<span style="font-size:${em}">${t}</span>` : t;
}
function toggleScript(text, tag) {
  const self = new RegExp(`^<${tag}>([\\s\\S]*)</${tag}>$`, "i");
  const m = text.match(self);
  if (m) return m[1];
  const other = tag === "sub" ? "sup" : "sub";
  const stripped = text.replace(new RegExp(`^<${other}>([\\s\\S]*)</${other}>$`, "i"), "$1");
  return `<${tag}>${stripped}</${tag}>`;
}
function clearAllFormatting(line) {
  return stripFormatting(setAlign(setHeading(line, 0), "left"));
}
function expandStyleRange(line, from, to) {
  const spans = [];
  const res = [
    /==[^=\n]+?==/g,
    /<mark[^>]*>[\s\S]*?<\/mark>/gi,
    /<span style="color:[^"]*">[\s\S]*?<\/span>/gi,
    /\*\*(?:\S|\S[^\n]*?\S)\*\*/g,
    /~~(?:\S|\S[^\n]*?\S)~~/g,
    /(^|[^\w*])\*(?:[^\s*]|[^\s*][^*\n]*?[^\s*])\*(?![\w*])/g,
    /(^|[^\w_])_(?:[^\s_]|[^\s_][^_\n]*?[^\s_])_(?![\w_])/g
  ];
  for (const re of res) {
    let m;
    while (m = re.exec(line))
      spans.push([m.index + (m[1]?.length ?? 0), m.index + m[0].length]);
  }
  let f = from;
  let t = to;
  let changed = true;
  while (changed) {
    changed = false;
    for (const [s, e] of spans) {
      if (s < f && f < e) {
        f = s;
        changed = true;
      }
      if (s < t && t < e) {
        t = e;
        changed = true;
      }
    }
  }
  return { from: f, to: t };
}
function sweepHighlights(text, background) {
  let count = 0;
  let inFence = false;
  const pairs = (seg, replace) => seg.replace(
    /==([^=\n\s]|[^=\n\s][^=\n]*?[^=\n\s])==(?!=)/g,
    (m, inner, offset, whole) => {
      if (whole[offset - 1] === "=") return m;
      if (/^[)\]]/.test(inner) || /[([]$/.test(inner)) return m;
      count++;
      return replace(inner);
    }
  );
  const spacey = (ch) => ch == null || /\s/.test(ch);
  const swap = (seg) => {
    if (background) return pairs(seg, (inner) => `<mark style="background:${background}">${inner}</mark>`);
    let out = pairs(seg, (inner) => inner);
    out = out.replace(/==(?!=)/g, (m, offset, whole) => {
      const left = whole[offset - 1];
      const right = whole[offset + 2];
      if (left === "=" || left === "!") return m;
      if (spacey(left) && spacey(right)) return m;
      if (left === "(" || left === "|" || right === ")" || right === "|") return m;
      if (spacey(left) && right != null && /[.,;:?!]/.test(right)) return m;
      count++;
      return "";
    });
    out = out.replace(/====(?!=)/g, (m, offset, whole) => {
      const left = whole[offset - 1];
      const right = whole[offset + 4];
      if (left === "=") return m;
      if (spacey(left) && spacey(right)) return m;
      count++;
      return "";
    });
    return out;
  };
  const lines = text.split("\n").map((line) => {
    if (FENCE_LINE.test(line)) {
      inFence = !inFence;
      return line;
    }
    if (inFence || !line.includes("==")) return line;
    return line.split(/(`[^`\n]*`)/).map((part) => part.startsWith("`") && part.endsWith("`") && part.length > 1 ? part : swap(part)).join("");
  });
  return { text: lines.join("\n"), count };
}
function stripFormatting(text) {
  let t = text;
  for (let i = 0; i < 3; i++) {
    t = t.replace(/(\*\*\*|___)([^*_]+?)\1/g, "$2").replace(/(\*\*|__)([^*_]+?)\1/g, "$2").replace(/(^|[^\w*])\*([^*\n]+?)\*(?![\w*])/g, "$1$2").replace(/(^|[^\w_])_([^_\n]+?)_(?![\w_])/g, "$1$2").replace(/~~([^~]+?)~~/g, "$1").replace(/==([^=]+?)==/g, "$1").replace(/`([^`\n]+?)`/g, "$1");
  }
  t = t.replace(/<\/?(?:u|b|i|em|strong|s|small|sub|sup|mark|span|font)(?:\s[^>]*)?>/gi, "");
  return t;
}
var COPY_TAGS = /<\/?(?:u|b|i|em|strong|s|small|sub|sup|mark|span|font)(?:\s[^>]*)?>/gi;
function cleanCopyText(md, mode) {
  const unwrapped = sweepHighlights(md, null).text;
  let inFence = false;
  return unwrapped.split("\n").map((line) => {
    if (FENCE_LINE.test(line)) {
      inFence = !inFence;
      return line;
    }
    if (inFence) return line;
    const body = mode === "plain" ? line.replace(/^(\s*)#{1,6}[ \t]+/, "$1") : line;
    return body.split(/(`[^`\n]*`)/).map((part) => {
      if (part.startsWith("`") && part.endsWith("`") && part.length > 1) return part;
      const stripped = part.replace(COPY_TAGS, "");
      return mode === "plain" ? stripFormatting(stripped) : stripped;
    }).join("");
  }).join("\n");
}
function mdEmphasisToHtml(text) {
  return text.replace(/\*\*(\S|\S[^\n]*?\S)\*\*/g, "<strong>$1</strong>").replace(/~~(\S|\S[^\n]*?\S)~~/g, "<s>$1</s>").replace(/(^|[^\w*])\*([^\s*]|[^\s*][^*\n]*?[^\s*])\*(?![\w*])/g, "$1<em>$2</em>").replace(/(^|[^\w_])_([^\s_]|[^\s_][^_\n]*?[^\s_])_(?![\w_])/g, "$1<em>$2</em>");
}
function htmlEmphasisToMd(text) {
  return text.replace(/<(strong|b)>([\s\S]*?)<\/\1>/gi, "**$2**").replace(/<(em|i)>([\s\S]*?)<\/\1>/gi, "*$2*").replace(/<(s|del)>([\s\S]*?)<\/\1>/gi, "~~$2~~");
}
function convertEmphasisInWrappers(text) {
  let count = 0;
  let inFence = false;
  const conv = (inner) => {
    const c = mdEmphasisToHtml(inner);
    if (c !== inner) count++;
    return c;
  };
  const lines = text.split("\n").map((line) => {
    if (FENCE_LINE.test(line)) {
      inFence = !inFence;
      return line;
    }
    if (inFence || !line.includes("<")) return line;
    return line.replace(/(<mark[^>]*>)([\s\S]*?)(<\/mark>)/gi, (_m, o, i, c) => o + conv(i) + c).replace(/(<span style="color:[^"]*">)([\s\S]*?)(<\/span>)/gi, (_m, o, i, c) => o + conv(i) + c);
  });
  return { text: lines.join("\n"), count };
}
function olTypeForDepth(depth) {
  const cycle = ["1", "a", "i"];
  return cycle[Math.max(0, depth) % 3];
}
function olStyleForDepth(depth) {
  const t = olTypeForDepth(depth);
  return t === "a" ? "lower-alpha" : t === "i" ? "lower-roman" : "decimal";
}
function isBlankBlock(text) {
  return !text.replace(/[\s\u00a0\u200b\ufeff]+/g, "").length;
}
function stripFrontmatter(md) {
  return /^---\r?\n/.test(md) ? md.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/, "") : md;
}
function wrapWithMarkdown(html, md) {
  const bytes = new TextEncoder().encode(md);
  let bin = "";
  for (const b of bytes) bin += String.fromCharCode(b);
  return `<div data-ped-md="${btoa(bin)}">${html}</div>`;
}
function markdownFromMarker(html) {
  const m = /<div data-ped-md="([A-Za-z0-9+/=]*)"/.exec(html ?? "");
  if (!m) return null;
  try {
    const bin = atob(m[1]);
    const bytes = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
    const md = new TextDecoder().decode(bytes);
    return md || null;
  } catch {
    return null;
  }
}

// src/main.ts
var pluginNoticesEnabled = () => true;
var Notice = class extends import_obsidian2.Notice {
  constructor(message, duration) {
    super(message, duration);
    if (!pluginNoticesEnabled()) this.hide();
  }
};
function wysiwygDecorations(plugin) {
  const WRAPPERS = [
    [/<u>([\s\S]*?)<\/u>/gi, () => "text-decoration: underline"],
    [/<span style="color:\s*([^";]+)[^"]*">([\s\S]*?)<\/span>/gi, (m) => `color: ${m[1].trim()}`],
    [/<span style="font-size:\s*([^";]+)[^"]*">([\s\S]*?)<\/span>/gi, (m) => `font-size: ${m[1].trim()}`],
    [/<mark style="background:\s*([^";]+)[^"]*">([\s\S]*?)<\/mark>/gi, (m) => `background: ${m[1].trim()}`],
    [/<sub>([\s\S]*?)<\/sub>/gi, () => "vertical-align: sub; font-size: 0.8em"],
    [/<sup>([\s\S]*?)<\/sup>/gi, () => "vertical-align: super; font-size: 0.8em"],
    // bold / italic / strike stored as HTML, which is how emphasis survives
    // inside a colored highlight (Obsidian won't format ** inside inline HTML)
    [/<(strong|b)>([\s\S]*?)<\/\1>/gi, () => "font-weight: var(--font-bold, 700)"],
    [/<(em|i)>([\s\S]*?)<\/\1>/gi, () => "font-style: italic"],
    [/<(s|del)>([\s\S]*?)<\/\1>/gi, () => "text-decoration: line-through"]
  ];
  return import_view.ViewPlugin.fromClass(
    class {
      constructor(view) {
        const r = this.build(view);
        this.decorations = r.decorations;
        this.atomics = r.atomics;
      }
      update(u) {
        if (u.docChanged || u.viewportChanged || u.selectionSet) {
          const r = this.build(u.view);
          this.decorations = r.decorations;
          this.atomics = r.atomics;
        }
      }
      inCode(view, at) {
        try {
          const node = (0, import_language.syntaxTree)(view.state).resolveInner(at, 1).name.toLowerCase();
          return node.includes("code") || node.includes("math");
        } catch {
          return false;
        }
      }
      build(view) {
        if (!plugin.settings.wysiwygMarks) return { decorations: import_view.Decoration.none, atomics: import_view.Decoration.none };
        const pending = [];
        const hidden = [];
        const hide = (from, to, order) => {
          hidden.push([from, to]);
          pending.push({ from, to, deco: import_view.Decoration.replace({}), order });
        };
        const EMPH = [
          [/\*\*(?:\S|\S[^\n]*?\S)\*\*/g, 2, "font-weight:var(--font-bold,700)"],
          [/~~(?:\S|\S[^\n]*?\S)~~/g, 2, "text-decoration:line-through"],
          [/(^|[^\w*])\*(?:[^\s*]|[^\s*][^*\n]*?[^\s*])\*(?![\w*])/g, 1, "font-style:italic"],
          [/(^|[^\w_])_(?:[^\s_]|[^\s_][^_\n]*?[^\s_])_(?![\w_])/g, 1, "font-style:italic"]
        ];
        const styleInner = (from, to, base) => {
          const inner = view.state.doc.sliceString(from, to);
          const spans = [];
          for (const [re, mlen, st] of EMPH) {
            re.lastIndex = 0;
            let em;
            while (em = re.exec(inner)) {
              const s = from + em.index + (em[1]?.length ?? 0);
              const e = from + em.index + em[0].length;
              if (spans.some((sp) => s < sp.to && e > sp.from)) continue;
              spans.push({ from: s, to: e, mlen, style: st });
            }
          }
          spans.sort((a, b2) => a.from - b2.from);
          const seg = (f, t, style) => {
            if (t > f) pending.push({ from: f, to: t, deco: import_view.Decoration.mark({ attributes: { style } }), order: 1 });
          };
          let cur = from;
          for (const sp of spans) {
            seg(cur, sp.from, base);
            hide(sp.from, sp.from + sp.mlen, 1);
            seg(sp.from + sp.mlen, sp.to - sp.mlen, `${base};${sp.style}`);
            hide(sp.to - sp.mlen, sp.to, 1);
            cur = sp.to;
          }
          seg(cur, to, base);
        };
        for (const range of view.visibleRanges) {
          const text = view.state.doc.sliceString(range.from, range.to);
          for (const [re, style] of WRAPPERS) {
            re.lastIndex = 0;
            let m;
            while (m = re.exec(text)) {
              const start = range.from + m.index;
              if (this.inCode(view, start)) continue;
              const openEnd = start + m[0].indexOf(">") + 1;
              const closeStart = start + m[0].length - (m[0].length - m[0].lastIndexOf("<"));
              hide(start, openEnd, 0);
              if (closeStart > openEnd) styleInner(openEnd, closeStart, style(m));
              hide(closeStart, start + m[0].length, 0);
            }
          }
          const al = /<!--al:(center|right)-->/g;
          let am;
          while (am = al.exec(text)) {
            const start = range.from + am.index;
            if (this.inCode(view, start)) continue;
            hide(start, start + am[0].length, 0);
            const line = view.state.doc.lineAt(start);
            pending.push({
              from: line.from,
              to: line.from,
              deco: import_view.Decoration.line({ attributes: { style: `text-align: ${am[1]}` } }),
              order: -1
            });
          }
          const stray = /<\/?(?:strong|span|mark|sub|sup|del|em|u|b|i|s)(?:\s[^>]*)?>/gi;
          let sm;
          while (sm = stray.exec(text)) {
            const start = range.from + sm.index;
            const end = start + sm[0].length;
            if (hidden.some(([f, t]) => start >= f && end <= t)) continue;
            if (this.inCode(view, start)) continue;
            hide(start, end, 0);
          }
        }
        pending.sort((a, b2) => a.from - b2.from || a.order - b2.order || a.to - b2.to);
        const b = new import_state.RangeSetBuilder();
        let lastFrom = -1;
        let lastTo = -1;
        for (const p of pending) {
          if (p.from === lastFrom && p.to === lastTo && p.order === 0) continue;
          b.add(p.from, p.to, p.deco);
          lastFrom = p.from;
          lastTo = p.to;
        }
        const ab = new import_state.RangeSetBuilder();
        let atEnd = -1;
        for (const [f, t] of hidden.sort((x, y) => x[0] - y[0] || x[1] - y[1])) {
          if (t <= f || f < atEnd) continue;
          ab.add(f, t, import_view.Decoration.replace({}));
          atEnd = t;
        }
        return { decorations: b.finish(), atomics: ab.finish() };
      }
    },
    {
      decorations: (v) => v.decorations,
      provide: (p) => import_view.EditorView.atomicRanges.of((view) => view.plugin(p)?.atomics ?? import_view.Decoration.none)
    }
  );
}
function orderedListOutline(plugin) {
  class NumWidget extends import_view.WidgetType {
    constructor(text) {
      super();
      this.text = text;
    }
    eq(other) {
      return other.text === this.text;
    }
    toDOM() {
      return createSpan({ cls: "ped-ol-num", text: this.text });
    }
  }
  return import_view.ViewPlugin.fromClass(
    class {
      constructor(view) {
        this.decorations = this.build(view);
      }
      update(u) {
        if (u.docChanged || u.viewportChanged || u.selectionSet) this.decorations = this.build(u.view);
      }
      build(view) {
        const b = new import_state.RangeSetBuilder();
        if (!plugin.settings.numberedOutline) return b.finish();
        const styles = plugin.settings.outlineStyles;
        for (const range of view.visibleRanges) {
          let pos = range.from;
          while (pos <= range.to) {
            const line = view.state.doc.lineAt(pos);
            const info = orderedListInfo(line.text);
            if (info) {
              const style = styles[Math.min(info.depth, styles.length - 1)] ?? "decimal";
              if (style !== "decimal") {
                b.add(
                  line.from + info.numStart,
                  line.from + info.numEnd + 1,
                  import_view.Decoration.replace({ widget: new NumWidget(formatCounter(info.ordinal, style) + info.delim) })
                );
              }
            }
            pos = line.to + 1;
          }
        }
        return b.finish();
      }
    },
    { decorations: (v) => v.decorations }
  );
}
function liveTaskCheckbox(plugin) {
  class BoxWidget extends import_view.WidgetType {
    constructor(checked, mark) {
      super();
      this.checked = checked;
      this.mark = mark;
    }
    eq(o) {
      return o.checked === this.checked && o.mark === this.mark;
    }
    toDOM() {
      const label = createEl("label", { cls: "task-list-label ped-live-task" });
      const box = label.createEl("input", { cls: "task-list-item-checkbox", attr: { type: "checkbox", "data-task": this.mark } });
      box.checked = this.checked;
      return label;
    }
  }
  return import_view.ViewPlugin.fromClass(
    class {
      constructor(view) {
        this.decorations = this.build(view);
      }
      update(u) {
        if (u.docChanged || u.viewportChanged || u.selectionSet) this.decorations = this.build(u.view);
      }
      build(view) {
        const b = new import_state.RangeSetBuilder();
        if (!plugin.settings.liveCheckboxes) return b.finish();
        const sel = view.state.selection;
        for (const range of view.visibleRanges) {
          let pos = range.from;
          while (pos <= range.to) {
            const line = view.state.doc.lineAt(pos);
            const m = line.text.match(/^(\s*)(?:[-*+]|\d+[.)])\s+\[(.)\](?=\s|$)/);
            const active = sel.ranges.some((r) => r.from <= line.to && r.to >= line.from);
            if (m && active) {
              b.add(
                line.from + m[1].length,
                line.from + m[0].length,
                import_view.Decoration.replace({ widget: new BoxWidget(m[2] !== " ", m[2]) })
              );
            }
            pos = line.to + 1;
          }
        }
        return b.finish();
      }
    },
    { decorations: (v) => v.decorations }
  );
}
function lineMarkers() {
  const startsTable = (doc, lineNo) => {
    if (lineNo > doc.lines || lineNo + 1 > doc.lines) return false;
    if (!/^[ \t]*\|/.test(doc.line(lineNo).text)) return false;
    return looksLikeMarkdownTable(doc.line(lineNo + 1).text);
  };
  const indentOf2 = (text) => /^[ \t]*/.exec(text)[0].length;
  const foldableItem = (doc, lineNo) => {
    if (lineNo + 1 > doc.lines) return false;
    const next = doc.line(lineNo + 1).text;
    if (next.trim() === "") return false;
    return indentOf2(next) > indentOf2(doc.line(lineNo).text);
  };
  return import_view.ViewPlugin.fromClass(
    class {
      constructor(view) {
        this.decorations = this.build(view);
      }
      update(u) {
        if (u.docChanged || u.viewportChanged) this.decorations = this.build(u.view);
      }
      build(view) {
        const b = new import_state.RangeSetBuilder();
        const doc = view.state.doc;
        for (const range of view.visibleRanges) {
          let pos = range.from;
          while (pos <= range.to) {
            const line = doc.lineAt(pos);
            const cls = [];
            if (line.text.length === 0) cls.push("ped-blank");
            if (startsTable(doc, line.number + 1)) cls.push("ped-pre-table");
            if (/^[ \t]*\d+[.)][ \t]/.test(line.text)) cls.push("ped-ol");
            if (/^[ \t]*(?:[-*+]|\d+[.)])[ \t]/.test(line.text) && foldableItem(doc, line.number)) cls.push("ped-foldable");
            if (cls.length) b.add(line.from, line.from, import_view.Decoration.line({ attributes: { class: cls.join(" ") } }));
            pos = line.to + 1;
          }
        }
        return b.finish();
      }
    },
    { decorations: (v) => v.decorations }
  );
}
function commentChips(plugin) {
  class ChipWidget extends import_view.WidgetType {
    constructor(text, stamp) {
      super();
      this.text = text;
      this.stamp = stamp;
    }
    eq(other) {
      return other.text === this.text && other.stamp === this.stamp;
    }
    toDOM(view) {
      const el = createSpan({ cls: "ped-comment-chip", attr: { "aria-label": this.text } });
      (0, import_obsidian2.setIcon)(el, "message-circle");
      el.addEventListener("mousedown", (e) => {
        e.preventDefault();
        e.stopPropagation();
        plugin.openCommentPopover(view, el);
      });
      return el;
    }
    ignoreEvent() {
      return true;
    }
  }
  return import_view.ViewPlugin.fromClass(
    class {
      constructor(view) {
        this.decorations = this.build(view);
      }
      update(u) {
        if (u.docChanged || u.viewportChanged || u.selectionSet) this.decorations = this.build(u.view);
      }
      build(view) {
        const b = new import_state.RangeSetBuilder();
        const sel = view.state.selection.main;
        for (const range of view.visibleRanges) {
          const text = view.state.doc.sliceString(range.from, range.to);
          const re = /%%💬\s*(.*?)%%/g;
          let m;
          while (m = re.exec(text)) {
            const from = range.from + m.index;
            const to = from + m[0].length;
            if (sel.from <= to && sel.to >= from) continue;
            const parts2 = commentParts(m[1]);
            b.add(from, to, import_view.Decoration.replace({ widget: new ChipWidget(parts2.text, parts2.stamp) }));
          }
        }
        return b.finish();
      }
    },
    { decorations: (v) => v.decorations }
  );
}
var DEFAULT_SETTINGS = {
  showToolbar: true,
  showOnMobile: false,
  blockHandles: true,
  showBubble: true,
  cleanPaste: true,
  copyMode: "clean",
  headingSections: true,
  hiddenButtons: [],
  buttonOrder: [],
  anthropicKey: "",
  aiModel: "claude-haiku-4-5",
  transcriptionEndpoint: "",
  transcriptionKey: "",
  transcriptionModel: "",
  wysiwygMarks: true,
  liveCheckboxes: true,
  aiActions: [],
  dictationMode: "raw",
  lineSpacing: "normal",
  headingGap: "12",
  richCopy: true,
  indentGuides: "no-ordered",
  showEdited: "labeled",
  editedPosition: "title",
  editedFormat: "relative",
  codeTheme: "vivid",
  codeLineNumbers: true,
  tableGap: "12",
  recentEmoji: [],
  onenoteMobileToolbar: true,
  mobileToolbarBackup: null,
  stampDoneDates: true,
  inboxNote: "Inbox.md",
  todoReminders: true,
  numberedOutline: true,
  // Word-style cascade: 1. → a. → i. → 1. → a. → i.
  outlineStyles: ["decimal", "lower-alpha", "lower-roman", "decimal", "lower-alpha", "lower-roman"],
  fileLocation: "note",
  fileSubfolder: "Files",
  routeDroppedFiles: true,
  pdfInsert: "link",
  showNotifications: true
};
var OUTLINE_CHOICES = [
  ["decimal", "1, 2, 3"],
  ["lower-alpha", "a, b, c"],
  ["upper-alpha", "A, B, C"],
  ["lower-roman", "i, ii, iii"],
  ["upper-roman", "I, II, III"]
];
var todayStr = () => {
  const d = /* @__PURE__ */ new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};
var isoAddDays = (iso, n) => {
  const [y, m, d] = iso.split("-").map(Number);
  const t = new Date(y, m - 1, d + n);
  return `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, "0")}-${String(t.getDate()).padStart(2, "0")}`;
};
var mondayOf = (iso) => {
  const [y, m, d] = iso.split("-").map(Number);
  const dow = new Date(y, m - 1, d).getDay();
  return isoAddDays(iso, dow === 0 ? -6 : 1 - dow);
};
var MOBILE_TOOLBAR = [
  "powereditor:insert-photo",
  "powereditor:dictate",
  "editor:toggle-checklist-status",
  "powereditor:todo-capture",
  "editor:toggle-bullet-list",
  "editor:toggle-numbered-list",
  "powereditor:indent-less",
  "powereditor:indent-more",
  "editor:toggle-bold",
  "powereditor:dismiss-keyboard"
];
var TODAY_VIEW = "ped-today";
var COMMENTS_VIEW = "ped-comments-view";
var PED_BUILD = "1.62.3";
var TOOLBAR_BACKUP_KEY = "ped-mobile-toolbar-backup";
var BUTTON_IDS = [
  ["undo", "Undo"],
  ["redo", "Redo"],
  ["heading", "Paragraph style"],
  ["bold", "Bold"],
  ["italic", "Italic"],
  ["underline", "Underline"],
  ["strike", "Strikethrough"],
  ["highlight", "Highlight"],
  ["code", "Inline code"],
  ["color", "Text color"],
  ["fontsize", "Font size, sub & superscript"],
  ["painter", "Format painter"],
  ["emoji", "Emoji"],
  ["bullet", "Bulleted list"],
  ["ordered", "Numbered list"],
  ["task", "Checklist"],
  ["quote", "Quote"],
  ["callout", "Callout (tip, note, warning\u2026)"],
  ["toggle", "Toggle block (collapsible)"],
  ["align", "Text alignment"],
  ["indent", "Increase indent"],
  ["outdent", "Decrease indent"],
  ["link", "Insert link"],
  ["file", "Insert a file (PDF, document)"],
  ["codeblock", "Code block"],
  ["table", "Insert table"],
  ["hr", "Horizontal rule"],
  ["findreplace", "Find & replace"],
  ["dictate", "Dictate (speech to text)"],
  ["ai", "AI edit"],
  ["clear", "Clear formatting"]
];
var TABLE_INERT = /* @__PURE__ */ new Set([
  "heading",
  "bullet",
  "ordered",
  "task",
  "quote",
  "callout",
  "toggle",
  "align",
  "indent",
  "outdent",
  "codeblock",
  "table",
  "hr"
]);
var DEFAULT_BUTTON_ORDER = [
  "undo",
  "redo",
  "|",
  "heading",
  "|",
  "bold",
  "italic",
  "underline",
  "strike",
  "highlight",
  "code",
  "color",
  "fontsize",
  "painter",
  "emoji",
  "|",
  "bullet",
  "ordered",
  "task",
  "quote",
  "callout",
  "toggle",
  "|",
  "align",
  "indent",
  "outdent",
  "|",
  "link",
  "file",
  "codeblock",
  "table",
  "hr",
  "findreplace",
  "|",
  "dictate",
  "ai",
  "clear"
];
var EMOJI = [
  ["\u{1F600}", "grinning smile happy"],
  ["\u{1F601}", "beaming grin"],
  ["\u{1F602}", "joy laughing tears"],
  ["\u{1F923}", "rofl laughing"],
  ["\u{1F60A}", "smiling blush"],
  ["\u{1F609}", "wink"],
  ["\u{1F60D}", "heart eyes love"],
  ["\u{1F618}", "kiss"],
  ["\u{1F60E}", "cool sunglasses"],
  ["\u{1F914}", "thinking hmm"],
  ["\u{1F928}", "raised eyebrow skeptical"],
  ["\u{1F610}", "neutral meh"],
  ["\u{1F634}", "sleeping tired"],
  ["\u{1F622}", "crying sad tear"],
  ["\u{1F62D}", "sobbing crying"],
  ["\u{1F621}", "angry mad"],
  ["\u{1F92F}", "mind blown"],
  ["\u{1F973}", "party celebrate"],
  ["\u{1F607}", "halo innocent"],
  ["\u{1F643}", "upside down silly"],
  ["\u{1F62C}", "grimace awkward"],
  ["\u{1FAE1}", "salute"],
  ["\u{1F44D}", "thumbs up yes good"],
  ["\u{1F44E}", "thumbs down no"],
  ["\u{1F44F}", "clap applause"],
  ["\u{1F64C}", "raised hands hooray"],
  ["\u{1F64F}", "please thanks pray"],
  ["\u{1F4AA}", "strong muscle"],
  ["\u{1F44B}", "wave hello bye"],
  ["\u{1F91D}", "handshake deal"],
  ["\u{1F91E}", "fingers crossed"],
  ["\u{1F449}", "point right"],
  ["\u{1F448}", "point left"],
  ["\u261D\uFE0F", "point up"],
  ["\u{1F440}", "eyes looking"],
  ["\u{1F9E0}", "brain smart"],
  ["\u2764\uFE0F", "red heart love"],
  ["\u{1F499}", "blue heart"],
  ["\u{1F49A}", "green heart"],
  ["\u{1F49B}", "yellow heart"],
  ["\u{1F9E1}", "orange heart"],
  ["\u{1F49C}", "purple heart"],
  ["\u{1F5A4}", "black heart"],
  ["\u{1F494}", "broken heart"],
  ["\u{1F4AF}", "hundred percent"],
  ["\u2705", "check done yes"],
  ["\u2611\uFE0F", "checkbox ballot"],
  ["\u2714\uFE0F", "check mark"],
  ["\u274C", "cross no wrong"],
  ["\u26A0\uFE0F", "warning caution"],
  ["\u2757", "exclamation important"],
  ["\u2753", "question"],
  ["\u{1F4A1}", "idea lightbulb"],
  ["\u2B50", "star favorite"],
  ["\u{1F31F}", "glowing star"],
  ["\u{1F525}", "fire hot lit"],
  ["\u{1F389}", "tada party celebrate"],
  ["\u{1F38A}", "confetti"],
  ["\u{1F3C6}", "trophy winner"],
  ["\u{1F947}", "gold first"],
  ["\u{1F948}", "silver second"],
  ["\u{1F949}", "bronze third"],
  ["\u{1F3AF}", "target goal dart"],
  ["\u{1F680}", "rocket launch ship"],
  ["\u{1F4CC}", "pin pushpin"],
  ["\u{1F4CD}", "location pin map"],
  ["\u{1F516}", "bookmark"],
  ["\u{1F3F7}\uFE0F", "tag label"],
  ["\u{1F4CE}", "paperclip attach"],
  ["\u{1F517}", "link chain url"],
  ["\u{1F4C5}", "calendar date"],
  ["\u{1F5D3}\uFE0F", "calendar spiral"],
  ["\u23F0", "alarm clock"],
  ["\u231B", "hourglass done"],
  ["\u23F3", "hourglass waiting"],
  ["\u{1F552}", "clock time"],
  ["\u{1F4DD}", "memo note writing"],
  ["\u270F\uFE0F", "pencil edit"],
  ["\u{1F58A}\uFE0F", "pen"],
  ["\u{1F4C4}", "document page"],
  ["\u{1F4D1}", "bookmark tabs pages"],
  ["\u{1F4C1}", "folder"],
  ["\u{1F4C2}", "open folder"],
  ["\u{1F5C2}\uFE0F", "card index dividers"],
  ["\u{1F4CB}", "clipboard"],
  ["\u{1F5C3}\uFE0F", "card file box archive"],
  ["\u{1F4CA}", "bar chart stats"],
  ["\u{1F4C8}", "chart up growth increase"],
  ["\u{1F4C9}", "chart down decrease"],
  ["\u{1F9EE}", "abacus calculate"],
  ["\u{1F4B0}", "money bag"],
  ["\u{1F4B5}", "dollar cash"],
  ["\u{1F4B3}", "credit card payment"],
  ["\u{1F9FE}", "receipt invoice"],
  ["\u{1F3E6}", "bank"],
  ["\u{1F6D2}", "shopping cart"],
  ["\u{1F4E6}", "package box"],
  ["\u{1F69A}", "truck delivery shipping"],
  ["\u2708\uFE0F", "airplane travel flight"],
  ["\u{1F697}", "car drive"],
  ["\u{1F3E0}", "house home"],
  ["\u{1F3E2}", "office building company"],
  ["\u{1F3ED}", "factory plant"],
  ["\u{1F30D}", "globe world earth"],
  ["\u{1F5FA}\uFE0F", "world map"],
  ["\u{1F9ED}", "compass direction"],
  ["\u2600\uFE0F", "sun sunny"],
  ["\u{1F319}", "moon night"],
  ["\u26C5", "partly cloudy"],
  ["\u{1F327}\uFE0F", "rain"],
  ["\u26C8\uFE0F", "storm thunder"],
  ["\u2744\uFE0F", "snow cold"],
  ["\u{1F308}", "rainbow"],
  ["\u{1F4A7}", "droplet water"],
  ["\u26A1", "lightning zap power"],
  ["\u{1F340}", "clover luck"],
  ["\u{1F331}", "seedling growth"],
  ["\u{1F332}", "tree evergreen"],
  ["\u{1F338}", "blossom flower"],
  ["\u{1F34E}", "apple fruit"],
  ["\u2615", "coffee tea cup"],
  ["\u{1F355}", "pizza"],
  ["\u{1F354}", "burger"],
  ["\u{1F37A}", "beer"],
  ["\u{1F377}", "wine"],
  ["\u{1F382}", "birthday cake"],
  ["\u{1F37F}", "popcorn"],
  ["\u26BD", "soccer football"],
  ["\u{1F3C0}", "basketball"],
  ["\u{1F3C8}", "american football"],
  ["\u26BE", "baseball"],
  ["\u{1F3BE}", "tennis"],
  ["\u{1F3AE}", "game controller"],
  ["\u{1F3B5}", "music note"],
  ["\u{1F3B6}", "music notes"],
  ["\u{1F3A4}", "microphone sing"],
  ["\u{1F3A7}", "headphones audio"],
  ["\u{1F4F7}", "camera photo"],
  ["\u{1F3AC}", "clapper movie video"],
  ["\u{1F4FA}", "tv television"],
  ["\u{1F4BB}", "laptop computer"],
  ["\u{1F5A5}\uFE0F", "desktop computer"],
  ["\u2328\uFE0F", "keyboard"],
  ["\u{1F5B1}\uFE0F", "mouse"],
  ["\u{1F4F1}", "phone mobile"],
  ["\u260E\uFE0F", "telephone call"],
  ["\u{1F50B}", "battery"],
  ["\u{1F50C}", "plug power"],
  ["\u{1F6E0}\uFE0F", "tools hammer wrench"],
  ["\u{1F527}", "wrench fix"],
  ["\u{1F528}", "hammer build"],
  ["\u2699\uFE0F", "gear settings"],
  ["\u{1F9F0}", "toolbox"],
  ["\u{1F9F2}", "magnet"],
  ["\u{1F512}", "lock secure private"],
  ["\u{1F513}", "unlocked open"],
  ["\u{1F511}", "key password"],
  ["\u{1F6E1}\uFE0F", "shield security"],
  ["\u{1F41B}", "bug insect"],
  ["\u{1F916}", "robot ai bot"],
  ["\u{1F4AC}", "speech bubble chat comment"],
  ["\u{1F4AD}", "thought bubble"],
  ["\u{1F4E3}", "megaphone announce"],
  ["\u{1F514}", "bell notification"],
  ["\u{1F515}", "bell off mute"],
  ["\u{1F6D1}", "stop sign"],
  ["\u{1F6A7}", "construction wip barrier"],
  ["\u267B\uFE0F", "recycle"],
  ["\u27A1\uFE0F", "arrow right next"],
  ["\u2B05\uFE0F", "arrow left back"],
  ["\u2B06\uFE0F", "arrow up"],
  ["\u2B07\uFE0F", "arrow down"],
  ["\u2194\uFE0F", "arrow left right"],
  ["\u{1F504}", "refresh sync repeat"],
  ["\u2795", "plus add"],
  ["\u2796", "minus remove"],
  ["\u2716\uFE0F", "multiply times"],
  ["\u2797", "divide"],
  ["\u{1F534}", "red circle"],
  ["\u{1F7E0}", "orange circle"],
  ["\u{1F7E1}", "yellow circle"],
  ["\u{1F7E2}", "green circle"],
  ["\u{1F535}", "blue circle"],
  ["\u{1F7E3}", "purple circle"],
  ["\u26AB", "black circle"],
  ["\u26AA", "white circle"],
  ["\u{1F7E5}", "red square"],
  ["\u{1F7E7}", "orange square"],
  ["\u{1F7E8}", "yellow square"],
  ["\u{1F7E9}", "green square"],
  ["\u{1F7E6}", "blue square"],
  ["\u{1F7EA}", "purple square"],
  ["\u2B1B", "black square"],
  ["\u2B1C", "white square"]
];
var ListTableWidget = class extends import_view.WidgetType {
  constructor(md, indent, plugin, at) {
    super();
    this.md = md;
    this.indent = indent;
    this.plugin = plugin;
    this.at = at;
  }
  eq(other) {
    return other.md === this.md && other.indent === this.indent;
  }
  toDOM(view) {
    const host = createDiv({ cls: "ped-list-table" });
    host.createSpan({ cls: "ped-list-table-pad", text: this.indent });
    const body = host.createDiv({ cls: "ped-list-table-body" });
    const child = new import_obsidian3.MarkdownRenderChild(body);
    this.plugin.addChild(child);
    void import_obsidian3.MarkdownRenderer.render(this.plugin.app, this.md, body, this.plugin.app.workspace.getActiveFile()?.path ?? "", child);
    host.addEventListener("mousedown", (e) => {
      e.preventDefault();
      view.dispatch({ selection: { anchor: this.at }, scrollIntoView: true });
      view.focus();
    });
    return host;
  }
  ignoreEvent() {
    return false;
  }
};
var listTables = (plugin) => import_view.ViewPlugin.fromClass(
  class {
    constructor(view) {
      this.deco = this.build(view);
    }
    update(u) {
      if (u.docChanged || u.viewportChanged || u.selectionSet) this.deco = this.build(u.view);
    }
    build(view) {
      const b = new import_state.RangeSetBuilder();
      const doc = view.state.doc;
      const lines = doc.toString().split("\n");
      const sel = view.state.selection.main;
      for (const t of indentedTables(lines)) {
        const from = doc.line(t.from + 1).from;
        const to = doc.line(t.to + 1).to;
        if (sel.to >= from && sel.from <= to) continue;
        const md = lines.slice(t.from, t.to + 1).map((l) => l.startsWith(t.indent) ? l.slice(t.indent.length) : l.trimStart()).join("\n");
        b.add(from, to, import_view.Decoration.replace({ widget: new ListTableWidget(md, t.indent, plugin, from), block: true }));
      }
      return b.finish();
    }
  },
  { decorations: (v) => v.deco }
);
var calloutTokenHider = import_view.ViewPlugin.fromClass(
  class {
    constructor(view) {
      this.deco = this.build(view);
    }
    update(u) {
      if (u.docChanged || u.viewportChanged) this.deco = this.build(u.view);
    }
    build(view) {
      const b = new import_state.RangeSetBuilder();
      if (!document.body.hasClass("ped-wys")) return b.finish();
      for (const { from, to } of view.visibleRanges) {
        let pos = from;
        while (pos <= to) {
          const line = view.state.doc.lineAt(pos);
          const m = /^(\s*>\s*)(\[!\w+\][+-]?)( ?)/.exec(line.text);
          if (m) {
            const s = line.from + m[1].length;
            b.add(s, s + m[2].length + m[3].length, import_view.Decoration.replace({}));
          }
          pos = line.to + 1;
        }
      }
      return b.finish();
    }
  },
  {
    decorations: (v) => v.deco,
    provide: (p) => import_view.EditorView.atomicRanges.of((view) => view.plugin(p)?.deco ?? import_view.Decoration.none)
  }
);
var CODE_LANGS = [
  ["", "Plain text"],
  ["bash", "Bash / Shell"],
  ["powershell", "PowerShell"],
  ["javascript", "JavaScript"],
  ["typescript", "TypeScript"],
  ["python", "Python"],
  ["sql", "SQL"],
  ["json", "JSON"],
  ["yaml", "YAML"],
  ["html", "HTML"],
  ["css", "CSS"],
  ["markdown", "Markdown"],
  ["csharp", "C#"],
  ["java", "Java"],
  ["go", "Go"],
  ["rust", "Rust"],
  ["php", "PHP"],
  ["ruby", "Ruby"],
  ["swift", "Swift"],
  ["kotlin", "Kotlin"],
  ["c", "C"],
  ["cpp", "C++"],
  ["objectivec", "Objective-C"],
  ["scala", "Scala"],
  ["r", "R"],
  ["perl", "Perl"],
  ["lua", "Lua"],
  ["dart", "Dart"],
  ["elixir", "Elixir"],
  ["erlang", "Erlang"],
  ["haskell", "Haskell"],
  ["clojure", "Clojure"],
  ["fsharp", "F#"],
  ["groovy", "Groovy"],
  ["julia", "Julia"],
  ["matlab", "MATLAB"],
  ["vbnet", "VB.NET"],
  ["vba", "VBA"],
  ["xml", "XML"],
  ["toml", "TOML"],
  ["ini", "INI"],
  ["diff", "Diff"],
  ["dockerfile", "Dockerfile"],
  ["makefile", "Makefile"],
  ["nginx", "Nginx"],
  ["apache", "Apache"],
  ["graphql", "GraphQL"],
  ["scss", "SCSS"],
  ["less", "Less"],
  ["jsx", "JSX"],
  ["tsx", "TSX"],
  ["vue", "Vue"],
  ["svelte", "Svelte"],
  ["latex", "LaTeX"],
  ["bibtex", "BibTeX"],
  ["asm", "Assembly"],
  ["verilog", "Verilog"],
  ["vhdl", "VHDL"],
  ["solidity", "Solidity"],
  ["protobuf", "Protocol Buffers"],
  ["csv", "CSV"],
  ["plaintext", "Plain text (explicit)"]
];
var LANG_LABEL = {
  bash: "Bash",
  sh: "Shell",
  shell: "Shell",
  zsh: "Zsh",
  powershell: "PowerShell",
  ps1: "PowerShell",
  js: "JavaScript",
  javascript: "JavaScript",
  ts: "TypeScript",
  typescript: "TypeScript",
  py: "Python",
  python: "Python",
  sql: "SQL",
  json: "JSON",
  yaml: "YAML",
  yml: "YAML",
  html: "HTML",
  css: "CSS",
  md: "Markdown",
  markdown: "Markdown",
  csharp: "C#",
  cs: "C#",
  cpp: "C++",
  go: "Go",
  rust: "Rust",
  java: "Java",
  php: "PHP",
  ruby: "Ruby",
  xml: "XML",
  diff: "Diff"
};
var CopyCodeWidget = class extends import_view.WidgetType {
  constructor(code) {
    super();
    this.code = code;
  }
  eq(other) {
    return other.code === this.code;
  }
  toDOM() {
    const b = createEl("button", { cls: "ped-cb-copy" });
    b.setAttribute("aria-label", "Copy code");
    b.textContent = "Copy";
    b.onmousedown = (e) => e.preventDefault();
    b.onclick = (e) => {
      e.preventDefault();
      e.stopPropagation();
      void navigator.clipboard.writeText(this.code).then(
        () => {
          b.textContent = "Copied";
          b.addClass("is-done");
          window.setTimeout(() => {
            b.textContent = "Copy";
            b.removeClass("is-done");
          }, 1400);
        },
        () => new Notice("Could not copy to the clipboard.")
      );
    };
    return b;
  }
  ignoreEvent() {
    return false;
  }
};
var selLines = (state) => {
  const s = state.selection.main;
  return `${state.doc.lineAt(s.from).number}:${state.doc.lineAt(s.to).number}`;
};
var CardPadWidget = class extends import_view.WidgetType {
  eq() {
    return true;
  }
  toDOM() {
    const s = createSpan({ cls: "ped-cb-pad" });
    return s;
  }
};
var FileNameWidget = class extends import_view.WidgetType {
  constructor(line, name) {
    super();
    this.line = line;
    this.name = name;
  }
  eq(other) {
    return other.line === this.line && other.name === this.name;
  }
  toDOM() {
    const b = createEl("button", { cls: "ped-cb-file" + (this.name ? "" : " is-empty") });
    b.setAttribute("aria-label", this.name ? "Rename file" : "Name this block");
    b.setAttribute("data-ped-line", String(this.line));
    b.textContent = this.name || "Add a name";
    b.onmousedown = (e) => e.preventDefault();
    return b;
  }
  ignoreEvent() {
    return false;
  }
};
var LangButtonWidget = class extends import_view.WidgetType {
  constructor(line, label) {
    super();
    this.line = line;
    this.label = label;
  }
  eq(other) {
    return other.line === this.line && other.label === this.label;
  }
  toDOM() {
    const b = createEl("button", { cls: "ped-cb-lang" });
    b.setAttribute("aria-label", "Change language");
    b.setAttribute("data-ped-line", String(this.line));
    b.textContent = this.label;
    b.createSpan({ cls: "ped-cb-caret", text: "\u2304" });
    b.onmousedown = (e) => e.preventDefault();
    return b;
  }
  ignoreEvent() {
    return false;
  }
};
var codeBlockChrome = import_view.ViewPlugin.fromClass(
  class {
    constructor(view) {
      /** Blocks that sit inside a list step, for the measuring pass. */
      this.insets = [];
      /** The lines the selection is on, since a fence hides itself unless the
       *  cursor is on that line. Rebuilding on every selection change would
       *  rescan the note for a cursor that only moved along a line. */
      this.onLines = "";
      /** What the last measurement found, by opening line. The decorations
       *  carry it, so a line CodeMirror redraws on its own comes back with the
       *  measured edge rather than the estimate: a card whose rows disagree
       *  about where they start is a card that looks broken in half. */
      this.measured = /* @__PURE__ */ new Map();
      this.onLines = selLines(view.state);
      this.deco = this.build(view);
      this.align(view);
    }
    update(u) {
      const lines = selLines(u.state);
      if (u.docChanged || u.viewportChanged || u.geometryChanged || lines !== this.onLines) {
        this.onLines = lines;
        this.deco = this.build(u.view);
      }
      this.align(u.view);
    }
    /** Where a step's own words sit is settled by the theme's fonts, the
     *  list's indent and the note's width, and the one place all three have
     *  agreed is the rendered line. So the card's left edge is read off the
     *  step above rather than worked out from character widths, and the
     *  fence's line is pulled by whatever the two disagree by, which is what
     *  puts its number in the column with the numbers above and below it.
     *  The build's own estimate stands until this lands, and stays whenever
     *  the lines it needs are scrolled out of view. */
    align(view) {
      if (!this.insets.length) return;
      const blocks = this.insets;
      view.requestMeasure({
        read: (v) => blocks.map((b) => {
          try {
            const doc = v.state.doc;
            if (b.end > doc.lines || b.stepTextPos < 0) return null;
            const head = lineElAt(v, doc.line(b.start).from);
            const text = v.coordsAtPos(b.stepTextPos);
            if (!head || !text) return null;
            const mine = b.markerPos >= 0 ? v.coordsAtPos(b.markerPos) : null;
            const theirs = b.stepMarkerPos >= 0 ? v.coordsAtPos(b.stepMarkerPos) : null;
            const carried = this.measured.get(b.start)?.pull ?? 0;
            return {
              start: b.start,
              end: b.end,
              x: text.left - head.getBoundingClientRect().left,
              pull: mine && theirs ? carried + (mine.left - theirs.left) : 0
            };
          } catch {
            return null;
          }
        }),
        write: (vals, v) => {
          for (const r of vals) {
            if (!r || r.x <= 0) continue;
            this.measured.set(r.start, { x: Math.round(r.x), pull: Math.round(r.pull) });
            try {
              for (let n = r.start; n <= r.end && n <= v.state.doc.lines; n++) {
                const el = lineElAt(v, v.state.doc.line(n).from);
                if (!el) continue;
                el.style.setProperty("--ped-cb-x", `${Math.round(r.x)}px`);
                if (n === r.start) el.style.setProperty("--ped-cb-pull", `${Math.round(r.pull)}px`);
              }
            } catch {
            }
          }
        }
      });
    }
    build(view) {
      const b = new import_state.RangeSetBuilder();
      const doc = view.state.doc;
      const blocks = [];
      let open = null;
      for (let n = 1; n <= doc.lines; n++) {
        const m = FENCE_LINE.exec(doc.line(n).text);
        if (!m) continue;
        const closing = !m[4].trim();
        if (!open) {
          const info = parseFenceInfo(m[4]);
          open = { start: n, lang: info.lang, file: info.file, mark: m[3], indent: m[1] + " ".repeat(m[2]?.length ?? 0), lead: m[1].length + (m[2]?.length ?? 0), marker: m[2]?.length ?? 0 };
        } else if (closing && m[3][0] === open.mark[0] && m[3].length >= open.mark.length) {
          blocks.push({ ...open, end: n, closed: true });
          open = null;
        }
      }
      if (open) blocks.push({ ...open, end: doc.lines, closed: false });
      const numbers = document.body.hasClass("ped-cb-nums");
      let tab = 0;
      this.insets = [];
      const sel = view.state.selection.main;
      const on = (n) => n >= doc.lineAt(sel.from).number && n <= doc.lineAt(sel.to).number;
      for (const blk of blocks) {
        const visible = view.visibleRanges.some((r) => doc.lineAt(r.to).number >= blk.start && doc.lineAt(r.from).number <= blk.end);
        if (!visible) continue;
        const head = doc.line(blk.start);
        const label = blk.lang ? LANG_LABEL[blk.lang] ?? CODE_LANGS.find(([v]) => v === blk.lang)?.[1] ?? blk.lang : "Plain text";
        const found = this.measured.get(blk.start);
        const inset = blk.indent ? `--ped-cb-x:${found ? `${found.x}px` : `${indentColumns(blk.indent, tab || (tab = tabWidth(view)))}ch`}` : "";
        const onStep = inset && blk.marker > 0;
        const step = inset ? stepAbove(doc, blk.start, blk.indent.length) : null;
        if (inset) {
          this.insets.push({
            start: blk.start,
            end: blk.end,
            markerPos: onStep ? head.from + blk.lead - blk.marker : -1,
            stepMarkerPos: step?.marker ?? -1,
            stepTextPos: step?.text ?? -1
          });
        }
        const headAttrs = { class: ["ped-cb-head", inset ? "ped-cb-in" : "", onStep ? "ped-cb-step" : ""].filter(Boolean).join(" ") };
        if (inset) headAttrs.style = found ? `${inset};--ped-cb-pull:${found.pull}px` : inset;
        b.add(head.from, head.from, import_view.Decoration.line({ attributes: headAttrs }));
        if (inset && !onStep && head.text.startsWith(blk.indent)) b.add(head.from, head.from + blk.indent.length, import_view.Decoration.replace({}));
        if (onStep) b.add(head.from + blk.lead, head.from + blk.lead, import_view.Decoration.widget({ widget: new CardPadWidget(), side: -1 }));
        if (!on(blk.start) && head.to > head.from + blk.lead) b.add(head.from + blk.lead, head.to, import_view.Decoration.replace({}));
        b.add(head.to, head.to, import_view.Decoration.widget({ widget: new FileNameWidget(blk.start - 1, blk.file), side: 0 }));
        b.add(head.to, head.to, import_view.Decoration.widget({ widget: new LangButtonWidget(blk.start - 1, label), side: 1 }));
        b.add(head.to, head.to, import_view.Decoration.widget({ widget: new CopyCodeWidget(fenceBody(doc, blk.start, blk.mark, blk.indent)), side: 2 }));
        for (let n = blk.start + 1; n <= blk.end; n++) {
          const line = doc.line(n);
          const closing = n === blk.end;
          const body = numbers && !closing;
          const hideIndent = inset && line.text.startsWith(blk.indent);
          const attrs = { class: [body ? "ped-cb-body" : "", inset ? "ped-cb-in" : ""].filter(Boolean).join(" ") };
          if (body) attrs["data-ped-ln"] = String(n - blk.start);
          if (inset) attrs.style = inset;
          if (attrs.class) b.add(line.from, line.from, import_view.Decoration.line({ attributes: attrs }));
          if (closing && blk.closed && !on(n) && line.to > line.from) b.add(line.from, line.to, import_view.Decoration.replace({}));
          else if (hideIndent) b.add(line.from, line.from + blk.indent.length, import_view.Decoration.replace({}));
        }
      }
      if (this.measured.size) {
        const live = new Set(blocks.map((blk) => blk.start));
        for (const start of this.measured.keys()) if (!live.has(start)) this.measured.delete(start);
      }
      return b.finish();
    }
  },
  { decorations: (v) => v.deco }
);
function stepAbove(doc, start, indent) {
  for (let n = start - 1; n >= 1; n--) {
    const line = doc.line(n);
    if (!line.text.trim()) continue;
    const content = listContentIndent(line.text);
    if (content.length !== indent) return null;
    return { marker: line.from + (/^[ \t]*/.exec(line.text)?.[0].length ?? 0), text: line.from + content.length };
  }
  return null;
}
var leadOf = (line) => /^[ \t]*/.exec(line ?? "")?.[0].length ?? 0;
var lineElAt = (view, pos) => {
  const { node } = view.domAtPos(pos);
  const el = node.nodeType === 3 ? node.parentElement : node;
  return el?.closest?.(".cm-line") ?? null;
};
var tabWidth = (view) => Number(getComputedStyle(view.contentDOM).tabSize) || 4;
var indentColumns = (indent, tab) => {
  let n = 0;
  for (const ch of indent) n = ch === "	" ? (Math.floor(n / tab) + 1) * tab : n + 1;
  return n;
};
function fenceBody(doc, lineNo, fence, indent) {
  const out = [];
  const close = new RegExp("^\\s*" + fence[0] + "{" + fence.length + ",}\\s*$");
  for (let i = lineNo + 1; i <= doc.lines; i++) {
    const t = doc.line(i).text;
    if (close.test(t)) break;
    out.push(indent && t.startsWith(indent) ? t.slice(indent.length) : t);
  }
  return out.join("\n");
}
var rectBelow = (el) => {
  const r = el.getBoundingClientRect();
  return { x: r.left, y: r.bottom + 4 };
};
var IMAGE_EXTS = /* @__PURE__ */ new Set(["png", "jpg", "jpeg", "gif", "webp", "svg", "bmp", "avif"]);
var IMG_CORNERS = [
  { corner: "nw", dir: -1, cursor: "nwse-resize" },
  { corner: "ne", dir: 1, cursor: "nesw-resize" },
  { corner: "sw", dir: -1, cursor: "nesw-resize" },
  { corner: "se", dir: 1, cursor: "nwse-resize" }
];
var ImageSuggestModal = class extends import_obsidian2.FuzzySuggestModal {
  constructor(app, onPick, placeholder = "Replace with which image?") {
    super(app);
    this.onPick = onPick;
    this.setPlaceholder(placeholder);
  }
  getItems() {
    return this.app.vault.getFiles().filter((f) => IMAGE_EXTS.has(f.extension.toLowerCase()));
  }
  getItemText(f) {
    return f.path;
  }
  onChooseItem(f) {
    this.onPick(f);
  }
};
var TextPromptModal = class extends import_obsidian2.Modal {
  constructor(app, heading, initial, onSubmit) {
    super(app);
    this.heading = heading;
    this.initial = initial;
    this.onSubmit = onSubmit;
  }
  onOpen() {
    this.titleEl.setText(this.heading);
    const input = this.contentEl.createEl("input", {
      cls: "ped-prompt-input",
      attr: { type: "text", spellcheck: "false" }
    });
    input.value = this.initial;
    const submit = () => {
      const v = input.value;
      this.close();
      this.onSubmit(v);
    };
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        submit();
      }
    });
    const btns = this.contentEl.createDiv({ cls: "ped-prompt-btns" });
    btns.createEl("button", { text: "Cancel" }).addEventListener("click", () => this.close());
    btns.createEl("button", { text: "Apply", cls: "mod-cta" }).addEventListener("click", submit);
    window.setTimeout(() => {
      input.focus();
      input.select();
    }, 0);
  }
  onClose() {
    this.contentEl.empty();
  }
};
var CoverModal = class extends import_obsidian2.Modal {
  constructor(plugin, file) {
    super(plugin.app);
    this.plugin = plugin;
    this.file = file;
  }
  current() {
    return parseCover(this.app.metadataCache.getFileCache(this.file)?.frontmatter);
  }
  onOpen() {
    this.titleEl.setText("Page cover");
    this.modalEl.addClass("ped-cover-modal");
    this.render();
  }
  render(applied) {
    const c = this.contentEl;
    c.empty();
    const spec = this.current();
    const activeVal = applied ?? (spec?.kind === "gradient" ? spec.value : spec?.kind === "solid" ? `solid:${spec.value}` : "");
    c.createDiv({ cls: "ped-cover-sect", text: "Gradients" });
    const gGrid = c.createDiv({ cls: "ped-cover-grid" });
    GRADIENTS.forEach((css, i) => {
      const tile = gGrid.createDiv({ cls: "ped-cover-swatch", attr: { "aria-label": GRADIENT_NAMES[i] ?? `Gradient ${i + 1}` } });
      tile.style.backgroundImage = css;
      tile.toggleClass("is-active", activeVal === `gradient:${i + 1}`);
      tile.addEventListener("click", () => this.apply(`gradient:${i + 1}`));
    });
    c.createDiv({ cls: "ped-cover-sect", text: "Solid colors" });
    const sGrid = c.createDiv({ cls: "ped-cover-grid" });
    SOLIDS.forEach((hex, i) => {
      const tile = sGrid.createDiv({ cls: "ped-cover-swatch", attr: { "aria-label": SOLID_NAMES[i] ?? hex } });
      tile.style.backgroundColor = hex;
      tile.toggleClass("is-active", activeVal.toLowerCase() === `solid:${hex}`.toLowerCase());
      tile.addEventListener("click", () => this.apply(`solid:${hex}`));
    });
    c.createDiv({ cls: "ped-cover-sect", text: "Your images" });
    const imgRow = c.createDiv({ cls: "ped-cover-actions" });
    const act = (label, icon, fn) => {
      const b = imgRow.createEl("button", { cls: "ped-cover-action" });
      (0, import_obsidian2.setIcon)(b.createSpan({ cls: "ped-cover-action-icon" }), icon);
      b.createSpan({ text: label });
      b.addEventListener("click", fn);
    };
    act("From vault\u2026", "image", () => {
      this.close();
      new ImageSuggestModal(this.app, (f) => void this.plugin.writeCover(this.file, `[[${f.path}]]`), "Which image becomes the cover?").open();
    });
    act("Upload\u2026", "upload", () => {
      this.close();
      this.plugin.uploadCover(this.file);
    });
    act("From URL\u2026", "link", () => {
      const url = spec?.kind === "url" ? spec.value : "";
      this.close();
      new TextPromptModal(this.app, "Cover image URL", url, (v) => {
        if (v.trim()) void this.plugin.writeCover(this.file, v.trim());
      }).open();
    });
    c.createDiv({ cls: "ped-cover-sect", text: "Height" });
    const hRow = c.createDiv({ cls: "ped-cover-heights" });
    const heights = [
      ["short", "Short"],
      ["standard", "Standard"],
      ["tall", "Tall"]
    ];
    const curH = spec?.height ?? "standard";
    heights.forEach(([h, label]) => {
      const b = hRow.createEl("button", { cls: "ped-cover-height", text: label });
      b.toggleClass("is-active", h === curH);
      b.addEventListener("click", () => void this.plugin.writeCoverHeight(this.file, h).then(() => this.render(activeVal || void 0)));
    });
    c.createDiv({ cls: "ped-cover-sect", text: "Title" });
    const overlaid = parsePageLayout(this.app.metadataCache.getFileCache(this.file)?.frontmatter).overlayTitle;
    const ovRow = c.createDiv({ cls: "ped-cover-heights" });
    const ovBtn = ovRow.createEl("button", { cls: "ped-cover-height", text: "Float title over cover" });
    ovBtn.toggleClass("is-active", overlaid);
    ovBtn.addEventListener(
      "click",
      () => void this.plugin.writePageProp(this.file, "cover-overlay", overlaid ? null : true).then(() => this.render(activeVal || void 0))
    );
    const foot = c.createDiv({ cls: "ped-cover-foot" });
    foot.createEl("button", { text: "Randomize" }).addEventListener("click", () => this.apply(`gradient:${1 + Math.floor(Math.random() * GRADIENTS.length)}`));
    if (spec || applied)
      foot.createEl("button", { cls: "mod-warning", text: "Remove cover" }).addEventListener("click", () => {
        this.close();
        void this.plugin.writeCover(this.file, null);
      });
  }
  apply(value) {
    void this.plugin.writeCover(this.file, value);
    this.render(value);
  }
  onClose() {
    this.contentEl.empty();
  }
};
var TodoBlock = class extends import_obsidian3.MarkdownRenderChild {
  constructor(el, source, plugin) {
    super(el);
    this.source = source;
    this.plugin = plugin;
    this.timer = null;
    this.disposed = false;
  }
  onload() {
    this.disposed = false;
    void this.render();
    this.registerEvent(this.plugin.app.vault.on("modify", () => this.queue()));
    this.registerEvent(this.plugin.app.vault.on("delete", () => this.queue()));
    this.registerEvent(this.plugin.app.vault.on("rename", () => this.queue()));
  }
  queue() {
    if (this.disposed) return;
    if (this.timer != null) window.clearTimeout(this.timer);
    this.timer = window.setTimeout(() => {
      this.timer = null;
      if (this.plugin.vaultUiSettling()) {
        this.queue();
        return;
      }
      void this.render();
    }, this.plugin.vaultUiDelay());
  }
  onunload() {
    this.disposed = true;
    if (this.timer != null) window.clearTimeout(this.timer);
  }
  async render() {
    const { query, errors } = parseQuery(this.source);
    const el = this.containerEl;
    el.empty();
    const root = el.createDiv({ cls: "ped-todo" });
    if (errors.length) {
      for (const err of errors) root.createDiv({ cls: "ped-todo-error", text: err });
      return;
    }
    const groups = runQuery(query, await this.plugin.collectTodos(), todayStr());
    if (query.view === "week") {
      this.renderWeek(
        root,
        groups.flatMap((g) => g.items)
      );
      return;
    }
    if (query.view === "board") {
      this.renderBoard(root, groups, query.groupBy);
      return;
    }
    if (!groups.length) {
      root.createDiv({ cls: "ped-todo-empty", text: "Nothing to do" });
      return;
    }
    for (const g of groups) {
      if (g.heading) {
        const done = g.items.filter((t) => t.checked).length;
        const count = done ? `${done} of ${g.items.length} done` : String(g.items.length);
        root.createDiv({ cls: "ped-todo-h", text: `${g.heading} \xB7 ${count}` });
      }
      const list = root.createDiv({ cls: "ped-todo-list" });
      for (const t of g.items) this.plugin.renderTodoItem(list, t);
    }
  }
  /** `view week`: the current week as seven columns, chips draggable across
   *  days to reschedule. Only items due this week appear. */
  renderWeek(root, items) {
    const today = todayStr();
    const monday = mondayOf(today);
    const grid = root.createDiv({ cls: "ped-week" });
    const names = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    for (let i = 0; i < 7; i++) {
      const date = isoAddDays(monday, i);
      const col = grid.createDiv({ cls: "ped-week-day" + (date === today ? " is-today" : "") });
      col.createDiv({ cls: "ped-week-h", text: `${names[i]} ${Number(date.slice(8))}` });
      col.addEventListener("dragover", (e) => {
        e.preventDefault();
        col.addClass("is-dragover");
      });
      col.addEventListener("dragleave", () => col.removeClass("is-dragover"));
      col.addEventListener("drop", (e) => {
        e.preventDefault();
        col.removeClass("is-dragover");
        const idx = Number(e.dataTransfer?.getData("text/ped-todo"));
        const item = items[idx];
        if (item) void this.plugin.setTodoDue(item, date);
      });
      for (const t of items.filter((t2) => t2.due === date)) {
        const chip = col.createDiv({ cls: "ped-week-chip" + (t.checked ? " is-done" : "") });
        chip.setText(t.body);
        chip.draggable = true;
        chip.addEventListener("dragstart", (e) => e.dataTransfer?.setData("text/ped-todo", String(items.indexOf(t))));
        chip.addEventListener("click", () => {
          void this.plugin.showAt(t.path ?? "", { line: t.line });
        });
      }
    }
  }
  /** `view board`: the query's groups as columns. Chips drag between lanes
   *  when the lane means something writable (a due date or a priority);
   *  file lanes are read-only since dragging would mean moving notes. */
  renderBoard(root, groups, groupBy) {
    if (!groups.length) {
      root.createDiv({ cls: "ped-todo-empty", text: "Nothing to show" });
      return;
    }
    const items = groups.flatMap((g) => g.items);
    const droppable = groupBy === "due" || groupBy === "priority";
    const grid = root.createDiv({ cls: "ped-board" });
    for (const g of groups) {
      const col = grid.createDiv({ cls: "ped-week-day ped-board-col" });
      col.createDiv({ cls: "ped-week-h", text: `${g.heading || "All"} \xB7 ${g.items.length}` });
      if (droppable) {
        col.addEventListener("dragover", (e) => {
          e.preventDefault();
          col.addClass("is-dragover");
        });
        col.addEventListener("dragleave", () => col.removeClass("is-dragover"));
        col.addEventListener("drop", (e) => {
          e.preventDefault();
          col.removeClass("is-dragover");
          const item = items[Number(e.dataTransfer?.getData("text/ped-todo"))];
          if (!item) return;
          if (groupBy === "due") void this.plugin.setTodoDue(item, g.heading === "No date" ? null : g.heading);
          else void this.plugin.setTodoPriority(item, Math.max(0, PRIORITY_LABELS.indexOf(g.heading)));
        });
      }
      for (const t of g.items) {
        const chip = col.createDiv({ cls: "ped-week-chip" + (t.checked ? " is-done" : "") });
        chip.setText(t.body);
        chip.draggable = droppable;
        chip.addEventListener("dragstart", (e) => e.dataTransfer?.setData("text/ped-todo", String(items.indexOf(t))));
        chip.addEventListener("click", () => {
          void this.plugin.showAt(t.path ?? "", { line: t.line });
        });
      }
    }
  }
};
var TodayView = class extends import_obsidian2.ItemView {
  constructor(leaf, plugin) {
    super(leaf);
    this.plugin = plugin;
    this.timer = null;
    this.closed = false;
  }
  getViewType() {
    return TODAY_VIEW;
  }
  getDisplayText() {
    return "Today";
  }
  getIcon() {
    return "calendar-check";
  }
  async onOpen() {
    this.closed = false;
    await this.render();
    this.registerEvent(this.plugin.app.vault.on("modify", () => this.queue()));
    this.registerEvent(this.plugin.app.vault.on("delete", () => this.queue()));
    this.registerEvent(this.plugin.app.vault.on("rename", () => this.queue()));
  }
  queue() {
    if (this.closed) return;
    if (this.timer != null) window.clearTimeout(this.timer);
    this.timer = window.setTimeout(() => {
      this.timer = null;
      if (this.plugin.vaultUiSettling()) {
        this.queue();
        return;
      }
      void this.render();
    }, this.plugin.vaultUiDelay());
  }
  async onClose() {
    this.closed = true;
    if (this.timer != null) window.clearTimeout(this.timer);
  }
  async render() {
    const c = this.contentEl;
    c.empty();
    c.addClass("ped-todo", "ped-today");
    const today = todayStr();
    const horizon = isoAddDays(today, 7);
    const open = (await this.plugin.collectTodos()).filter((t) => !t.checked);
    const byDue = (a, b) => (a.due ?? "9999").localeCompare(b.due ?? "9999") || (a.path ?? "").localeCompare(b.path ?? "");
    const sections = [
      ["Overdue", open.filter((t) => t.due != null && t.due < today)],
      ["Today", open.filter((t) => t.due === today)],
      ["Next 7 days", open.filter((t) => t.due != null && t.due > today && t.due <= horizon)]
    ];
    let any = false;
    for (const [name, list] of sections) {
      if (!list.length) continue;
      any = true;
      c.createDiv({ cls: "ped-todo-h", text: `${name} \xB7 ${list.length}` });
      const wrap = c.createDiv({ cls: "ped-todo-list" });
      for (const t of list.sort(byDue)) this.plugin.renderTodoItem(wrap, t);
    }
    if (!any) c.createDiv({ cls: "ped-todo-empty", text: "Nothing due. Enjoy it." });
  }
};
var CommentsView = class extends import_obsidian2.ItemView {
  constructor(leaf, plugin) {
    super(leaf);
    this.plugin = plugin;
    this.timer = null;
    this.closed = false;
  }
  getViewType() {
    return COMMENTS_VIEW;
  }
  getDisplayText() {
    return "Comments";
  }
  getIcon() {
    return "message-circle";
  }
  async onOpen() {
    this.closed = false;
    await this.render();
    this.registerEvent(this.plugin.app.vault.on("modify", () => this.queue()));
    this.registerEvent(this.plugin.app.vault.on("delete", () => this.queue()));
    this.registerEvent(this.plugin.app.vault.on("rename", () => this.queue()));
  }
  queue() {
    if (this.closed) return;
    if (this.timer != null) window.clearTimeout(this.timer);
    this.timer = window.setTimeout(() => {
      this.timer = null;
      if (this.plugin.vaultUiSettling()) {
        this.queue();
        return;
      }
      void this.render();
    }, this.plugin.vaultUiDelay());
  }
  async onClose() {
    this.closed = true;
    if (this.timer != null) window.clearTimeout(this.timer);
  }
  async render() {
    const c = this.contentEl;
    c.empty();
    c.addClass("ped-todo", "ped-comments");
    let any = false;
    for (const f of this.plugin.app.vault.getMarkdownFiles()) {
      const content = await this.plugin.app.vault.cachedRead(f);
      if (!content.includes("%%\u{1F4AC}")) continue;
      const comments = parseComments(content.split("\n"));
      if (!comments.length) continue;
      any = true;
      c.createDiv({ cls: "ped-todo-h", text: f.path.replace(/\.md$/, "") + " \xB7 " + comments.length });
      const list = c.createDiv({ cls: "ped-todo-list" });
      for (const cm of comments) {
        const row = list.createDiv({ cls: "ped-comment-row" });
        const main = row.createDiv({ cls: "ped-comment-rowmain" });
        main.createDiv({ cls: "ped-comment-text", text: cm.text });
        if (cm.stamp) main.createDiv({ cls: "ped-comment-stamp", text: cm.stamp });
        main.addEventListener("click", () => {
          void this.plugin.showAt(f.path, { line: cm.line });
        });
        row.createEl("button", { cls: "ped-comment-resolve", text: "Resolve" }).addEventListener("click", (e) => {
          e.stopPropagation();
          void this.resolve(f, cm);
        });
      }
    }
    if (!any) c.createDiv({ cls: "ped-todo-empty", text: "No open comments." });
  }
  async resolve(f, cm) {
    await this.plugin.app.vault.process(f, (data) => {
      const lines = data.split("\n");
      const line = lines[cm.line];
      if (line == null) return data;
      const m = line.slice(cm.ch).match(/^%%💬\s*(.*?)%%/);
      if (!m || commentParts(m[1]).text !== cm.text) return data;
      const from = cm.ch > 0 && line[cm.ch - 1] === " " ? cm.ch - 1 : cm.ch;
      lines[cm.line] = line.slice(0, from) + line.slice(cm.ch + m[0].length);
      return lines.join("\n");
    });
  }
};
var TocBlock = class extends import_obsidian3.MarkdownRenderChild {
  constructor(el, source, path2, plugin) {
    super(el);
    this.source = source;
    this.path = path2;
    this.plugin = plugin;
    this.timer = null;
  }
  onload() {
    this.render();
    this.registerEvent(
      this.plugin.app.metadataCache.on("changed", (f) => {
        if (f.path === this.path) this.queue();
      })
    );
  }
  queue() {
    if (this.timer != null) window.clearTimeout(this.timer);
    this.timer = window.setTimeout(() => this.render(), 400);
  }
  render() {
    const el = this.containerEl;
    el.empty();
    const root = el.createDiv({ cls: "ped-toc" });
    const rangeM = this.source.match(/levels\s+(\d)\s*-\s*(\d)/i);
    const lo = rangeM ? Number(rangeM[1]) : 1;
    const hi = rangeM ? Number(rangeM[2]) : 6;
    const f = this.plugin.app.vault.getAbstractFileByPath(this.path);
    const headings = (f instanceof import_obsidian2.TFile ? this.plugin.app.metadataCache.getFileCache(f)?.headings : null) ?? [];
    const shown = headings.filter((h) => h.level >= lo && h.level <= hi);
    if (!shown.length) {
      root.createDiv({ cls: "ped-todo-empty", text: "No headings yet." });
      return;
    }
    const min = Math.min(...shown.map((h) => h.level));
    root.createDiv({ cls: "ped-toc-title", text: "Contents" });
    for (const h of shown) {
      const item = root.createDiv({ cls: "ped-toc-item" });
      item.style.marginInlineStart = (h.level - min) * 16 + "px";
      item.setText(h.heading);
      item.addEventListener("click", () => {
        void (async () => {
          await this.plugin.focusOpenTab(this.path);
          await this.plugin.app.workspace.openLinkText(this.path + "#" + h.heading, this.path);
        })();
      });
    }
  }
};
var AI_ACTIONS = [
  ["Improve writing", "Improve the writing: clearer, tighter, same meaning and tone."],
  ["Fix grammar & spelling", "Fix grammar, spelling, and punctuation. Change nothing else."],
  ["Make shorter", "Rewrite this at roughly half the length, keeping every key point."],
  ["Summarize", "Summarize this in a few concise bullet points."]
];
var PALETTE = [
  "#FFFFFF",
  "#EFEAFC",
  "#E3F0FC",
  "#E2F5EA",
  "#FDF3D7",
  "#FCE9DC",
  "#FDE8E6",
  "#F1F1F4",
  "#D9CCF7",
  "#BFDDF8",
  "#BEE9CF",
  "#F8E4A0",
  "#F7CDB0",
  "#F6C3BE",
  "#DFDFE5",
  "#B9B9C2",
  "#6D28D9",
  "#0B6BCB",
  "#1E8553",
  "#B45309",
  "#C2410C",
  "#B42318",
  "#374151",
  "#1A1A1F"
];
var TEXT_COLORS = [
  ["Gray", "#6B7280"],
  ["Brown", "#92400E"],
  ["Orange", "#C2410C"],
  ["Yellow", "#B45309"],
  ["Green", "#1E8553"],
  ["Blue", "#0B6BCB"],
  ["Purple", "#6D28D9"],
  ["Red", "#B42318"]
];
var BG_COLORS = [
  ["Gray", "#F1F1F4"],
  ["Brown", "#FCE9DC"],
  ["Orange", "#F7CDB0"],
  ["Yellow", "#FDF3D7"],
  ["Green", "#E2F5EA"],
  ["Blue", "#E3F0FC"],
  ["Purple", "#EFEAFC"],
  ["Red", "#FDE8E6"]
];
function headingInputFix(plugin) {
  return import_view.EditorView.inputHandler.of((view, from, to, text) => {
    if (!plugin.settings.wysiwygMarks || from !== to || !text) return false;
    const line = view.state.doc.lineAt(from);
    const snapped = headingCursorSnap(line.text, from - line.from);
    if (snapped == null) return false;
    const at = line.from + snapped;
    view.dispatch({ changes: { from: at, insert: text }, selection: { anchor: at + text.length }, userEvent: "input.type" });
    return true;
  });
}
function headingCursorGuard(plugin) {
  return import_state.EditorState.transactionFilter.of((tr) => {
    if (!plugin.settings.wysiwygMarks || !tr.selection) return tr;
    const sel = tr.selection.main;
    if (!sel.empty) return tr;
    const line = tr.newDoc.lineAt(sel.head);
    const snapped = headingCursorSnap(line.text, sel.head - line.from);
    return snapped == null ? tr : [tr, { selection: import_state.EditorSelection.cursor(line.from + snapped) }];
  });
}
function headingPlaceholders(plugin) {
  return import_view.ViewPlugin.fromClass(
    class {
      constructor(view) {
        this.decorations = this.build(view);
      }
      update(u) {
        if (u.docChanged || u.viewportChanged) this.decorations = this.build(u.view);
      }
      build(view) {
        const b = new import_state.RangeSetBuilder();
        if (!plugin.settings.wysiwygMarks) return b.finish();
        for (const { from, to } of view.visibleRanges) {
          let pos = from;
          while (pos <= to) {
            const line = view.state.doc.lineAt(pos);
            const label = emptyHeadingLabel(line.text);
            if (label)
              b.add(line.from, line.from, import_view.Decoration.line({ attributes: { class: "ped-heading-ph", "data-ped-hph": label } }));
            pos = line.to + 1;
          }
        }
        return b.finish();
      }
    },
    { decorations: (v) => v.decorations }
  );
}
var PowerEditorPlugin = class extends import_obsidian2.Plugin {
  constructor() {
    super(...arguments);
    /** The settings as they last stood on disk, read or written by us. Whatever
     *  differs from this in memory is OUR change, and only those keys may
     *  overwrite a synced data.json; see persistSettings(). */
    this.baseline = DEFAULT_SETTINGS;
    this.bars = /* @__PURE__ */ new WeakMap();
    this.stateTimer = null;
    this.pageChromeTimer = null;
    /* dictation state */
    this.recorder = null;
    this.recChunks = [];
    /* drag state */
    this.handleEl = null;
    this.dropEl = null;
    this.hover = null;
    this.dragging = null;
    this.linesCache = null;
    /* bubble + painter state */
    this.bubbleEl = null;
    this.bubbleButtons = /* @__PURE__ */ new Map();
    this.bubbleHeadingLabel = null;
    this.bubbleTimer = null;
    this.painter = null;
    /** In-flight column drag, and the header cell currently showing its grab
     *  edge. Both only ever set when Power Tables is not installed. */
    this.resizing = null;
    this.edgeHover = null;
    this.colorPop = null;
    this.rightPress = null;
    /* image resize state */
    this.imgGrips = [];
    this.imgBadge = null;
    this.imgHover = null;
    this.imgDrag = null;
    /** Indent guides on numbered lists. Body class rather than a CodeMirror
     *  extension: the guide is Obsidian's own chrome, so hiding it is a matter
     *  of not painting it, in both views at once. */
    this.outlineSheet = null;
    /** Checkbox clicks in Live Preview, seen before the editor's own handler:
     *  completing a to-do stamps ✅ (per setting) and a 🔁 item spawns its next
     *  occurrence on the line above itself. */
    /** Set once our mousedown has completed an item, so the click that follows
     *  can be swallowed before the editor's own checkbox handler flips it back. */
    this.todoHandled = false;
    this.notified = /* @__PURE__ */ new Set();
    /** Which tab is active per tabs block (keyed by note path + start line), so
     *  the choice survives the re-render that a content edit triggers. */
    this.tabActive = /* @__PURE__ */ new Map();
    /** Whether the real embedded-editor panes are available; flips false once
     *  if Obsidian's internals move, and tabs fall back to the textarea panes. */
    this.paneEditorsOk = true;
    /** Notes whose stamp the reader clicked to expand, by path. Session-only:
     *  a preference for one glance, not something worth writing to disk. */
    this.editedExpanded = /* @__PURE__ */ new Set();
    /* ---------------- emoji picker ---------------- */
    /** Both popovers hang their own teardown off the element, so the field
     *  carries it rather than every reader asserting it back on. */
    this.emojiPopover = null;
    this.langPopover = null;
    /* ---------------- image toolbar (click an image) ---------------- */
    this.imgBar = null;
  }
  /** WYSIWYG mode: hide Markdown formatting characters even at the cursor. */
  applyWysiwyg() {
    document.body.toggleClass("ped-wys", this.settings.wysiwygMarks);
    this.app.workspace.updateOptions();
  }
  /** Line spacing: compact / normal / relaxed, editing and reading views. */
  applySpacing() {
    document.body.toggleClass("ped-lh-compact", this.settings.lineSpacing === "compact");
    document.body.toggleClass("ped-lh-relaxed", this.settings.lineSpacing === "relaxed");
    this.applyCodeTheme();
    this.applyBlockGap();
  }
  /** The blank line under a heading, and the ones hugging a table, are real
   *  editor lines in Live Preview, a full line-height each, and no Obsidian
   *  spacing variable reaches them. This publishes the wanted heights as
   *  custom properties; styles.css uses them to shrink exactly those lines.
   *  Headings and tables carry their own class and variable so either can be
   *  turned off without touching the other. A garbage value falls back to
   *  Obsidian's default rather than emitting broken CSS, since the settings
   *  accept a hand-typed override. */
  /** Publish the chosen code theme as body classes: one marker so the token
   *  rules apply at all, the theme's own class carrying its palette, and a
   *  `dark` marker so the block's chrome (Copy, the language button) flips
   *  to light-on-dark with it. */
  applyCodeTheme() {
    const t = this.settings.codeTheme;
    const DARK = /* @__PURE__ */ new Set(["one-dark", "dracula", "monokai", "github-dark"]);
    for (const name of ["default", "vivid", "one-dark", "dracula", "monokai", "github-dark"]) {
      document.body.toggleClass("ped-cbt-" + name, t === name);
    }
    document.body.toggleClass("ped-cbt", t !== "default");
    document.body.toggleClass("ped-cb-dark", DARK.has(t));
    document.body.toggleClass("ped-cb-nums", this.settings.codeLineNumbers);
    this.refreshEditors();
  }
  /**
   * Put the selection on the clipboard as rich text, for pasting into mail.
   *
   * Plain Ctrl+C hands a mail client raw Markdown, and the client then guesses:
   * Outlook autoformats the "1." lines into a list of its own, renumbers every
   * nested level 1, 2, 3 (Markdown writes them all as "1." and Obsidian's a, b,
   * c is CSS, which no clipboard carries), and leaves a hole wherever a line
   * held a non-breaking space. Rendering it here and handing over real HTML
   * settles all three, because the receiving app is then reading a document
   * rather than interpreting text.
   *
   * The plain-text flavor stays Markdown, so pasting into an editor, a terminal,
   * or back into Obsidian is exactly what it was before.
   */
  async copyRichText(ed, quiet = false) {
    const md = stripFrontmatter(ed.getSelection() || ed.getValue()).trim();
    if (!md) {
      if (!quiet) new Notice("Power Editor: nothing to copy.");
      return;
    }
    const host = createDiv({ cls: "ped-offscreen" });
    document.body.appendChild(host);
    try {
      const path2 = this.app.workspace.getActiveFile()?.path ?? "";
      const child = new import_obsidian3.MarkdownRenderChild(host);
      await import_obsidian3.MarkdownRenderer.render(this.app, md, host, path2, child);
      this.emailifyHtml(host);
      const html = wrapWithMarkdown(host.innerHTML, md);
      if (navigator.clipboard?.write && typeof ClipboardItem !== "undefined") {
        await navigator.clipboard.write([
          new ClipboardItem({
            "text/html": new Blob([html], { type: "text/html" }),
            "text/plain": new Blob([md], { type: "text/plain" })
          })
        ]);
      } else {
        await navigator.clipboard.writeText(md);
        if (!quiet) new Notice("Power Editor: copied as plain Markdown (this platform has no rich clipboard).");
        return;
      }
      if (!quiet) new Notice("Copied as rich text. Paste into your email.");
    } catch (e) {
      if (!quiet) new Notice(`Power Editor: could not copy (${e instanceof Error ? e.message : String(e)}).`);
    } finally {
      host.remove();
    }
  }
  /**
   * Ordinary Ctrl+C, upgraded. A command nobody remembers to run is not a fix
   * for "I copied it into an email and the formatting went wrong", so the
   * plain copy carries the rich flavor too.
   *
   * Rendering Markdown is asynchronous and a clipboard event is not, so the
   * event writes the Markdown itself first, the clipboard is never empty and
   * never wrong, and the HTML replaces it a few milliseconds later. Pasting
   * inside that window gets exactly what Ctrl+C always gave.
   */
  onEditorCopy(e) {
    if (!this.settings.richCopy) return;
    const el = e.target instanceof HTMLElement ? e.target : document.activeElement;
    if (!el?.closest?.(".markdown-source-view.mod-cm6")) return;
    const ed = this.activeEditor();
    const md = ed?.getSelection();
    if (!ed || !md?.trim()) return;
    e.preventDefault();
    e.clipboardData?.setData("text/plain", md);
    void this.copyRichText(ed, true);
  }
  /**
   * Turn rendered note HTML into HTML a mail client will honor. Everything is
   * written as inline style attributes: Outlook drops <style> blocks and every
   * class with them, so a stylesheet would arrive as no styling at all.
   */
  emailifyHtml(root) {
    for (const el of Array.from(root.querySelectorAll(".internal-embed, .frontmatter, .metadata-container, .copy-code-button, .ped-drag-handle"))) el.remove();
    for (const a of Array.from(root.querySelectorAll("a.internal-link"))) {
      const span = createSpan({ text: a.textContent ?? "" });
      a.replaceWith(span);
    }
    for (const p of Array.from(root.querySelectorAll("p"))) if (isBlankBlock(p.textContent ?? "")) p.remove();
    const style = (el, css) => el.setAttribute("style", `${el.getAttribute("style") ?? ""};${css}`.replace(/^;/, ""));
    for (const p of Array.from(root.querySelectorAll("p"))) style(p, "margin:0 0 10px 0");
    for (const h of Array.from(root.querySelectorAll("h1, h2, h3, h4, h5, h6"))) style(h, "margin:16px 0 6px 0");
    for (const li of Array.from(root.querySelectorAll("li"))) style(li, "margin:0 0 2px 0");
    for (const pre of Array.from(root.querySelectorAll("pre"))) style(pre, "margin:0 0 10px 0;padding:8px;background:#f5f5f5;font-family:Consolas,monospace;font-size:0.9em");
    for (const list of Array.from(root.querySelectorAll("ul, ol"))) {
      style(list, "margin:0 0 10px 0;padding-left:28px");
      if (list.instanceOf(HTMLOListElement)) {
        let depth = 0;
        for (let p = list.parentElement; p; p = p.parentElement) {
          if (p === root) break;
          if (p.tagName === "OL") depth++;
        }
        list.setAttribute("type", olTypeForDepth(depth));
        const marker = `list-style-type:${olStyleForDepth(depth)}`;
        style(list, marker);
        for (const li of Array.from(list.children)) if (li.tagName === "LI") style(li, marker);
      }
    }
    for (const nested of Array.from(root.querySelectorAll("li > ul, li > ol"))) style(nested, "margin:2px 0 0 0");
  }
  applyListGuides() {
    document.body.toggleClass("ped-no-ol-guides", this.settings.indentGuides === "no-ordered");
    document.body.toggleClass("ped-no-guides", this.settings.indentGuides === "none");
  }
  applyBlockGap() {
    const set = (cls, prop, raw) => {
      const px = Number(raw);
      const on = raw !== "off" && Number.isFinite(px) && px >= 0 && px <= 60;
      document.body.toggleClass(cls, on);
      if (on) document.body.style.setProperty(prop, px + "px");
      else document.body.style.removeProperty(prop);
    };
    set("ped-heading-gap", "--ped-heading-gap", this.settings.headingGap);
    set("ped-table-gap", "--ped-table-gap", this.settings.tableGap);
  }
  /** Reading view uses real <ol>, so multilevel numbering there is just
   *  list-style-type per nesting depth, injected as a <style> and refreshed
   *  when the config changes. The editor is handled by orderedListOutline. */
  applyOutlineCss() {
    if (typeof CSSStyleSheet === "undefined" || !("replaceSync" in CSSStyleSheet.prototype)) return;
    if (!this.outlineSheet) {
      this.outlineSheet = new CSSStyleSheet();
      document.adoptedStyleSheets = [...document.adoptedStyleSheets, this.outlineSheet];
    }
    if (!this.settings.numberedOutline) {
      this.outlineSheet.replaceSync("");
      return;
    }
    const rules = this.settings.outlineStyles.map((style, d) => {
      const sel = ".markdown-rendered " + Array(d + 1).fill("ol").join(" ");
      return `${sel} { list-style-type: ${style}; }`;
    });
    this.outlineSheet.replaceSync(rules.join("\n"));
  }
  /** Rebuild editor extensions so live-reading decoration engines (outline
   *  numbering, placeholders) pick up a settings change immediately. */
  refreshEditors() {
    this.app.workspace.updateOptions();
  }
  async loadSettings() {
    const disk = await this.loadData() ?? {};
    if (typeof disk.hideOrderedGuides === "boolean" && disk.indentGuides === void 0) {
      disk.indentGuides = disk.hideOrderedGuides ? "no-ordered" : "all";
    }
    if (typeof disk.codeBlockSkin === "string" && disk.codeTheme === void 0) {
      disk.codeTheme = disk.codeBlockSkin === "dark" ? "one-dark" : "default";
    }
    if (typeof disk.blockGap === "string") {
      if (disk.headingGap === void 0) disk.headingGap = disk.blockGap;
      if (disk.tableGap === void 0) disk.tableGap = disk.blockGap;
    }
    const next = Object.assign({}, DEFAULT_SETTINGS, disk);
    if (this.settings) Object.assign(this.settings, next);
    else this.settings = next;
    this.baseline = structuredClone(this.settings);
  }
  /**
   * The one write path, and it merges rather than overwrites.
   *
   * data.json is synced, so this file belongs to every device at once. Writing
   * memory wholesale reverts whatever another device changed since this one last
   * read it, and a setting nothing rewrites afterwards never comes back from
   * that. Re-read, and carry only what WE changed.
   *
   * Every settings write goes through here. Six of them wrote the whole object
   * straight out before, which is six chances to revert another device.
   */
  async persistSettings() {
    const disk = await this.loadData();
    Object.assign(this.settings, mergeForSave(this.settings, this.baseline, disk));
    await this.saveData(this.settings);
    this.baseline = structuredClone(this.settings);
  }
  /** Obsidian calls this when Sync lands another device's write. Adopting it
   *  keeps this device from holding a stale snapshot it would later write back. */
  async onExternalSettingsChange() {
    await this.loadSettings();
  }
  /**
   * Obsidian reports a throw in here as a bare "encountered an error while
   * loading" with no detail, and on a phone there is no console to go and
   * read. So the real message is caught and shown, and whatever managed to
   * register before the throw stays registered, a partly working plugin
   * beats one that silently does nothing.
   */
  async onload() {
    try {
      await this.boot();
    } catch (e) {
      const msg = e instanceof Error ? `${e.message}` : String(e);
      console.error("Power Editor failed to load", e);
      new Notice(`Power Editor ${PED_BUILD} could not start: ${msg}`, 0);
    }
  }
  async boot() {
    await this.loadSettings();
    pluginNoticesEnabled = () => this.settings.showNotifications;
    this.addSettingTab(new PowerEditorSettingTab(this));
    this.addCommand({
      id: "show-version",
      icon: "info",
      name: "Show running version",
      callback: () => new Notice(`Power Editor code build ${PED_BUILD} is running.`, 6e3)
    });
    this.applyWysiwyg();
    this.applySpacing();
    this.applyListGuides();
    this.registerDomEvent(document, "pointerdown", (e) => {
      const t = e.target;
      if (this.colorPop && !t?.closest?.(".ped-colorpop")) this.closeColorPopover();
      if (this.imgBar && !t?.closest?.(".ped-imgbar")) this.closeImageBar();
    });
    this.registerDomEvent(
      document,
      "pointerdown",
      (e) => {
        this.rightPress = e.button === 2 && e.target instanceof Element ? { x: e.clientX, y: e.clientY, el: e.target, offered: false } : null;
      },
      { capture: true }
    );
    this.registerDomEvent(document, "click", (e) => {
      if (this.imgDrag) return;
      const t = e.target;
      const img = t instanceof HTMLImageElement && t.closest(".markdown-source-view") ? t : null;
      if (img) this.showImageBar(img);
    });
    this.app.workspace.onLayoutReady(() => this.ensureToolbars());
    this.registerEvent(this.app.workspace.on("layout-change", () => this.ensureToolbars()));
    this.registerEvent(this.app.workspace.on("active-leaf-change", () => this.ensureToolbars()));
    this.app.workspace.onLayoutReady(() => this.updateImageBleed());
    this.registerEvent(this.app.workspace.on("resize", () => this.updateImageBleed()));
    this.registerEvent(this.app.workspace.on("layout-change", () => this.updateImageBleed()));
    this.registerEvent(this.app.workspace.on("active-leaf-change", () => this.updateImageBleed()));
    this.registerEvent(this.app.workspace.on("layout-change", () => this.applyTableWidths()));
    this.registerEvent(this.app.workspace.on("active-leaf-change", () => this.applyTableWidths()));
    this.registerEvent(this.app.workspace.on("editor-change", () => this.applyTableWidths()));
    this.registerEditorSuggest(new SlashSuggest(this));
    this.registerDomEvent(
      document,
      "keydown",
      (e) => {
        if (e.key !== "Enter" || e.shiftKey || e.ctrlKey || e.metaKey || e.altKey || e.isComposing) return;
        const view = this.app.workspace.getActiveViewOfType(import_obsidian2.MarkdownView);
        const cm = view ? this.cmOf(view) : null;
        if (!cm || !cm.hasFocus) return;
        const sel = cm.state.selection.main;
        const line = cm.state.doc.lineAt(sel.from);
        if (cm.state.doc.lineAt(sel.to).number !== line.number) return;
        const m = /^(\s*)((?:[-*+])|(\d+)([.)]))\s+/.exec(line.text);
        if (!m) return;
        const contentStart = line.from + m[0].length;
        if (sel.from < contentStart) return;
        if (!/^(?:<[^>]*>|\s)*$/.test(cm.state.doc.sliceString(contentStart, sel.from))) return;
        if (sel.to !== sel.from && sel.to !== line.to) return;
        if (!stripTags(line.text.slice(m[0].length))) return;
        const lines = cm.state.doc.toString().split("\n");
        const res = insertItemAbove(lines, line.number - 1);
        if (!res) return;
        e.preventDefault();
        e.stopPropagation();
        const d = narrowEdit(lines, res.lines);
        if (d.from > d.to && d.text.length === 0) return;
        const fromPos = cm.state.doc.line(d.from + 1).from;
        const pure = d.from > d.to;
        const toPos = pure ? fromPos : cm.state.doc.line(d.to + 1).to;
        cm.dispatch({
          changes: { from: fromPos, to: toPos, insert: d.text.join("\n") + (pure ? "\n" : "") },
          selection: { anchor: fromPos + (res.lines[res.caret]?.length ?? 0) },
          scrollIntoView: true
        });
      },
      true
    );
    this.registerDomEvent(
      document,
      "keydown",
      (e) => {
        const back = e.key === "Backspace";
        if (!back && e.key !== "Delete" || e.shiftKey || e.ctrlKey || e.metaKey || e.altKey || e.isComposing) return;
        const view = this.app.workspace.getActiveViewOfType(import_obsidian2.MarkdownView);
        const cm = view ? this.cmOf(view) : null;
        if (!cm || !cm.hasFocus) return;
        const sel = cm.state.selection.main;
        if (!sel.empty) return;
        const doc = cm.state.doc;
        const line = doc.lineAt(sel.from);
        if (sel.from !== line.to) return;
        if (back ? line.number === 1 : line.number === doc.lines) return;
        const lines = doc.toString().split("\n");
        const res = removeItemAt(lines, line.number - 1);
        if (!res) return;
        e.preventDefault();
        e.stopPropagation();
        const d = narrowEdit(lines, res.lines);
        let from = doc.line(d.from + 1).from;
        let to = doc.line(d.to + 1).to;
        if (!d.text.length) {
          if (d.to + 2 <= doc.lines) to = doc.line(d.to + 2).from;
          else from = doc.line(d.from).to;
        }
        cm.dispatch({
          changes: { from, to, insert: d.text.join("\n") },
          // backspace lands at the end of the step above; delete stays put,
          // at the words of the step that moved up into this one's place
          selection: { anchor: back ? doc.line(line.number - 1).to : line.from + listContentIndent(res.lines[line.number - 1] ?? "").length },
          scrollIntoView: true
        });
      },
      true
    );
    this.registerDomEvent(
      document,
      "keydown",
      (e) => {
        if (e.key !== "Enter" || e.shiftKey || e.ctrlKey || e.metaKey || e.altKey || e.isComposing) return;
        const view = this.app.workspace.getActiveViewOfType(import_obsidian2.MarkdownView);
        const cm = view ? this.cmOf(view) : null;
        if (!cm || !cm.hasFocus) return;
        const sel = cm.state.selection.main;
        const doc = cm.state.doc;
        if (!sel.empty) return;
        const line = doc.lineAt(sel.from);
        if (FENCE_LINE.test(line.text)) return;
        if (!insideFence(doc.sliceString(0, line.from))) return;
        let open = line.number - 1;
        while (open > 1 && !FENCE_LINE.test(doc.line(open).text)) open--;
        const after = line.number < doc.lines ? doc.line(line.number + 1) : null;
        const leaving = !line.text.trim() && after && /^[ \t]*(?:`{3,}|~{3,})[ \t]*$/.test(after.text);
        const edge = fenceIndent(doc.line(open).text);
        if (!leaving && !edge) return;
        e.preventDefault();
        e.stopPropagation();
        if (!leaving) {
          const indent = /^[ \t]*/.exec(line.text)?.[0] ?? "";
          cm.dispatch({ changes: { from: sel.from, insert: "\n" + indent }, selection: { anchor: sel.from + 1 + indent.length }, scrollIntoView: true });
          return;
        }
        const next = nextItemAfterFence((n) => doc.line(n + 1).text, open - 1);
        const close = doc.line(line.number + 1);
        const del = line.to - line.from + 1;
        cm.dispatch({
          changes: [
            { from: line.from - 1, to: line.to },
            { from: close.to, to: close.to, insert: "\n" + next }
          ],
          selection: { anchor: close.to - del + 1 + next.length },
          scrollIntoView: true
        });
      },
      true
    );
    this.registerEditorExtension(calloutTokenHider);
    this.registerEditorExtension(listTables(this));
    this.registerEditorExtension(codeBlockChrome);
    this.registerEditorExtension(lineMarkers());
    this.registerMarkdownPostProcessor((el) => this.stampImageWidths(el));
    this.registerDomEvent(document, "click", (e) => {
      const btn = e.target?.closest?.(".ped-cb-lang");
      if (!btn) return;
      e.preventDefault();
      e.stopPropagation();
      const line = Number(btn.getAttribute("data-ped-line") ?? "-1");
      const ed = this.activeEditor();
      if (ed && line >= 0) this.pickLanguageForFence(ed, line, btn);
    });
    this.registerDomEvent(document, "click", (e) => {
      const btn = e.target?.closest?.(".ped-cb-file");
      if (!btn) return;
      e.preventDefault();
      e.stopPropagation();
      const line = Number(btn.getAttribute("data-ped-line") ?? "-1");
      const ed = this.activeEditor();
      if (ed && line >= 0) this.renameCodeBlock(ed, line);
    });
    this.registerEvent(
      this.app.workspace.on("file-menu", (menu, target) => {
        if (!(target instanceof import_obsidian2.TFolder)) return;
        menu.addItem(
          (i) => i.setTitle("Convert lead-ins into callouts\u2026").setIcon("lightbulb").onClick(() => this.openCalloutConverter(target.path === "/" ? "" : target.path))
        );
      })
    );
    this.registerMarkdownCodeBlockProcessor("tabs", (source, el, ctx) => this.renderTabs(source, el, ctx));
    this.registerMarkdownCodeBlockProcessor("columns", (source, el, ctx) => this.renderColumns(source, el, ctx));
    this.registerMarkdownPostProcessor((el, ctx) => {
      el.querySelectorAll(".callout-title-inner").forEach((title) => {
        const node = title.firstChild;
        if (!node || node.nodeType !== Node.TEXT_NODE || !node.nodeValue) return;
        const m = /^\s*((?:\p{Extended_Pictographic}|\p{Emoji_Presentation})️?)/u.exec(node.nodeValue);
        if (!m) return;
        const rest = node.nodeValue.slice(m[0].length);
        const span = createSpan({ cls: "ped-callout-emoji", text: m[1], attr: { title: "Change emoji" } });
        node.nodeValue = rest;
        title.insertBefore(span, node);
        const callout = title.closest(".callout");
        callout?.addClass("ped-emoji-icon");
        title.closest(".cm-callout")?.addClass("ped-emoji-icon");
        const info = callout ? ctx.getSectionInfo(callout) : null;
        if (callout && info) {
          callout.setAttribute("data-ped-line", String(info.lineStart));
          callout.setAttribute("data-ped-path", ctx.sourcePath);
        }
      });
    });
    this.registerDomEvent(document, "click", (e) => {
      const span = e.target?.closest?.(".ped-callout-emoji");
      if (!span) return;
      e.preventDefault();
      e.stopPropagation();
      this.swapCalloutEmoji(span);
    });
    this.registerDomEvent(document, "copy", (e) => this.onEditorCopy(e));
    this.registerEvent(
      this.app.workspace.on("editor-drop", (evt, editor, info) => {
        if (evt.defaultPrevented) return;
        const files = this.attachable(evt.dataTransfer);
        if (!files.length) return;
        evt.preventDefault();
        const at = this.dropPosition(editor, evt) ?? editor.getCursor();
        void this.attachFiles(editor, files, info?.file?.path ?? "", at);
      })
    );
    this.registerEvent(
      this.app.workspace.on("editor-paste", (evt, editor, info) => {
        if (evt.defaultPrevented) return;
        const files = this.attachable(evt.clipboardData);
        if (!files.length) return;
        evt.preventDefault();
        void this.attachFiles(editor, files, info?.file?.path ?? "", editor.getCursor("from"));
      })
    );
    this.registerEvent(
      this.app.workspace.on("editor-paste", (evt, editor) => {
        if (evt.defaultPrevented) return;
        const own = markdownFromMarker(evt.clipboardData?.getData("text/html"));
        if (own === null) return;
        evt.preventDefault();
        this.insertPasted(editor, own);
      })
    );
    this.registerEvent(
      this.app.workspace.on("editor-paste", (evt, editor) => {
        if (!this.settings.cleanPaste || evt.defaultPrevented) return;
        const md = this.pastedMarkdown(evt.clipboardData?.getData("text/html"), evt.clipboardData?.getData("text/plain"));
        if (md === null) return;
        evt.preventDefault();
        this.insertPasted(editor, md);
      })
    );
    this.registerEvent(
      this.app.workspace.on("editor-paste", (evt, editor) => {
        if (evt.defaultPrevented) return;
        const text = (evt.clipboardData?.getData("text/plain") ?? "").replace(/\r\n?/g, "\n");
        if (!text.includes("\n")) return;
        const planned = this.plannedPaste(editor, text);
        if (planned === text) return;
        evt.preventDefault();
        editor.replaceSelection(planned);
      })
    );
    this.addCommand({
      id: "paste-clean",
      icon: "clipboard-paste",
      name: "Paste as clean Markdown",
      editorCallback: async (ed) => {
        const plain = await navigator.clipboard.readText().catch(() => "");
        const md = this.pastedMarkdown(await this.clipboardHtml(), plain);
        this.insertPasted(ed, md ?? plain);
      }
    });
    this.addCommand({
      id: "paste-formats",
      icon: "clipboard-list",
      name: "Insert clipboard formats (paste troubleshooting)",
      editorCallback: async (ed) => {
        const html = await this.clipboardHtml();
        const plain = await navigator.clipboard.readText().catch(() => "");
        ed.replaceSelection(["```text", "--- text/plain ---", plain, "--- text/html ---", html ?? "(none on the clipboard)", "```", ""].join("\n"));
      }
    });
    this.registerDomEvent(document, "copy", (e) => this.onCopyOut(e, false), { capture: true });
    this.registerDomEvent(document, "cut", (e) => this.onCopyOut(e, true), { capture: true });
    this.registerEditorExtension(
      import_view.EditorView.updateListener.of((u) => {
        if (u.selectionSet || u.docChanged || u.focusChanged) {
          this.queueStateRefresh();
          this.queueBubbleUpdate();
        }
      })
    );
    this.registerEditorExtension(wysiwygDecorations(this));
    this.registerEditorExtension(headingPlaceholders(this));
    this.registerEditorExtension(headingInputFix(this));
    this.registerEditorExtension(headingCursorGuard(this));
    this.registerEditorExtension(orderedListOutline(this));
    this.registerEditorExtension(liveTaskCheckbox(this));
    this.applyOutlineCss();
    this.registerMarkdownPostProcessor((el) => {
      for (const li of Array.from(el.querySelectorAll("li"))) {
        li.toggleClass("ped-foldable", li.querySelector(":scope > ul, :scope > ol") !== null);
      }
    });
    this.registerMarkdownPostProcessor((el) => {
      const walker = document.createTreeWalker(el, NodeFilter.SHOW_COMMENT);
      let node;
      while (node = walker.nextNode()) {
        const m = node.nodeValue?.match(/^al:(center|right)$/);
        if (m && node.parentElement) node.parentElement.style.textAlign = m[1];
      }
    });
    this.addCommand({
      id: "toggle-toolbar",
      icon: "panel-top",
      name: "Toggle the formatting toolbar",
      callback: () => {
        this.settings.showToolbar = !this.settings.showToolbar;
        void this.persistSettings();
        this.ensureToolbars();
      }
    });
    this.addCommand({
      id: "toggle-block",
      icon: "chevron-right",
      name: "Toggle block (collapsible)",
      editorCallback: (ed) => this.toggleBlock(ed)
    });
    this.addCommand({
      id: "toggle-list",
      name: "Toggle list (Notion-style)",
      editorCallback: (ed) => this.toggleListBlock(ed)
    });
    this.addCommand({
      id: "callout",
      name: "Callout: pick a flavor",
      icon: "lightbulb",
      editorCallback: (ed) => this.pickCalloutAtCursor(ed)
    });
    for (const f of CALLOUT_FLAVORS) {
      this.addCommand({
        id: `callout-${f.type}`,
        name: `Callout: ${f.label}`,
        icon: f.icon,
        editorCallback: (ed) => this.calloutOfType(ed, f.type)
      });
    }
    this.addCommand({
      id: "callout-convert-note",
      name: "Callouts: convert Tip/Note/Warning lead-ins in this note",
      icon: "wand-2",
      editorCallback: (ed) => this.convertLeadsInNote(ed, false)
    });
    this.addCommand({
      id: "callout-convert-note-bare",
      name: "Callouts: convert lead-ins in this note (including labels without bold)",
      icon: "wand-2",
      editorCallback: (ed) => this.convertLeadsInNote(ed, true)
    });
    this.addCommand({
      id: "callout-convert-vault",
      name: "Callouts: convert lead-ins across the vault\u2026",
      icon: "wand-2",
      callback: () => this.openCalloutConverter()
    });
    this.addCommand({
      id: "code-block",
      name: "Code block (pick a language)",
      icon: "code-square",
      editorCallback: (ed) => this.insertCodeBlock(ed)
    });
    this.addCommand({
      id: "code-block-language",
      name: "Code block: set the language",
      icon: "code-square",
      editorCallback: (ed) => this.setCodeBlockLanguage(ed)
    });
    this.addCommand({ id: "move-block-up", icon: "arrow-up", name: "Move block up", editorCallback: (ed) => this.moveBlockBy(ed, -1) });
    this.addCommand({ id: "move-block-down", name: "Move block down", editorCallback: (ed) => this.moveBlockBy(ed, 1) });
    this.addCommand({ id: "dictate", name: "Dictate at the cursor (start/stop)", icon: "mic", editorCallback: (ed) => void this.toggleDictation(ed) });
    this.addCommand({ id: "underline", icon: "underline", name: "Underline", editorCallback: (ed) => this.toggleWrap(ed, "<u>", "</u>") });
    this.addCommand({ id: "clear-formatting", name: "Clear formatting", editorCallback: (ed) => this.clearFormatting(ed) });
    this.addCommand({
      id: "clean-note-highlights",
      name: "Highlights: clean up in this note",
      icon: "highlighter",
      editorCallback: (ed) => this.cleanNoteHighlights(ed)
    });
    this.addCommand({
      id: "clean-note-placeholder-tags",
      name: "Clean this note: escape placeholder tags",
      icon: "wand-2",
      editorCallback: (ed) => this.escapeTagsInNote(ed)
    });
    this.addCommand({
      id: "clean-vault-placeholder-tags",
      name: "Clean the vault: escape placeholder tags\u2026",
      icon: "wand-2",
      callback: () => this.openPlaceholderSweep()
    });
    this.addCommand({
      id: "clean-vault-highlights",
      name: "Highlights: clean up across the vault",
      icon: "highlighter",
      callback: () => void this.cleanVaultHighlights()
    });
    this.addCommand({
      id: "convert-highlight-emphasis",
      name: "Highlights: make bold and italic render (this note)",
      icon: "bold",
      editorCallback: (ed) => {
        const prev = ed.getValue().split("\n");
        const res = convertEmphasisInWrappers(prev.join("\n"));
        if (!res.count) {
          new Notice("No Markdown bold or italic inside highlights here.");
          return;
        }
        this.applyDoc(ed, prev, res.text.split("\n"), ed.getCursor().line);
        new Notice(`Fixed emphasis in ${res.count} highlight${res.count === 1 ? "" : "s"}.`);
      }
    });
    this.addCommand({ id: "format-painter", icon: "paintbrush", name: "Format painter (paint once)", editorCallback: (ed) => this.armPainter(ed) });
    this.addCommand({ id: "insert-link", icon: "link", name: "Insert or edit link", editorCallback: (ed) => this.openLinkDialog(ed) });
    this.registerEvent(
      this.app.workspace.on("editor-menu", (menu, editor) => {
        if (this.rightPress?.offered) return;
        const view = this.app.workspace.getActiveViewOfType(import_obsidian2.MarkdownView);
        const at = editor.getSelection() || !view ? null : this.rightPressPos(view);
        const probe = at ?? editor.getCursor();
        if (!linkAt(editor.getLine(probe.line), probe.ch)) return;
        if (this.rightPress) this.rightPress.offered = true;
        menu.addItem(
          (i) => i.setTitle("Edit link (Power Editor)").setIcon("link").setSection("selection").onClick(() => this.openLinkDialog(editor, at))
        );
      })
    );
    const onLinkMenu = (menu) => {
      const view = this.app.workspace.getActiveViewOfType(import_obsidian2.MarkdownView);
      if (!view || this.rightPress?.offered) return;
      const at = this.rightPressPos(view);
      if (!at || !linkAt(view.editor.getLine(at.line), at.ch)) return;
      if (this.rightPress) this.rightPress.offered = true;
      menu.addItem(
        (i) => i.setTitle("Edit link (Power Editor)").setIcon("link").onClick(() => this.openLinkDialog(view.editor, at))
      );
    };
    this.registerEvent(this.app.workspace.on("url-menu", (menu) => onLinkMenu(menu)));
    this.registerEvent(this.app.workspace.on("file-menu", (menu) => onLinkMenu(menu)));
    this.addCommand({
      id: "copy-rich-text",
      name: "Copy as rich text (for email)",
      icon: "clipboard-type",
      editorCallback: (ed) => void this.copyRichText(ed)
    });
    this.registerEvent(
      this.app.workspace.on("editor-menu", (menu, editor) => {
        if (!editor.getSelection()) return;
        menu.addItem(
          (i) => i.setTitle("Copy as rich text").setIcon("clipboard-type").setSection("selection").onClick(() => void this.copyRichText(editor))
        );
      })
    );
    this.addCommand({ id: "align-left", icon: "align-left", name: "Align left", editorCallback: (ed) => this.applyAlign(ed, "left") });
    this.addCommand({ id: "align-center", icon: "align-center", name: "Align center", editorCallback: (ed) => this.applyAlign(ed, "center") });
    this.addCommand({ id: "align-right", name: "Align right", editorCallback: (ed) => this.applyAlign(ed, "right") });
    this.addCommand({ id: "indent-more", name: "Increase indent", icon: "indent-increase", editorCallback: (ed) => this.indent(ed, 1) });
    this.addCommand({ id: "indent-less", name: "Decrease indent", icon: "indent-decrease", editorCallback: (ed) => this.indent(ed, -1) });
    this.addCommand({ id: "insert-photo", name: "Insert photo (camera or library)", icon: "camera", editorCallback: (ed) => this.insertPhoto(ed) });
    this.addCommand({
      id: "insert-file",
      name: "Insert a file (PDF or document) into the note",
      icon: "paperclip",
      editorCallback: (ed) => this.insertFile(ed)
    });
    this.addCommand({
      id: "unembed-pdfs",
      name: "PDFs: turn embedded previews into links (this note)",
      icon: "paperclip",
      editorCallback: (ed) => {
        const { text, count } = unembedPdfs(ed.getValue());
        if (!count) {
          new Notice("No embedded PDFs in this note.");
          return;
        }
        const cursor = ed.getCursor();
        ed.setValue(text);
        ed.setCursor(cursor);
        new Notice(count === 1 ? "One PDF is now a link." : `${count} PDFs are now links.`);
      }
    });
    this.registerEvent(
      this.app.workspace.on("editor-menu", (menu, editor) => {
        menu.addItem(
          (i) => i.setTitle("File (PDF, document)").setIcon("paperclip").setSection("selection.insert.basic").onClick(() => this.insertFile(editor))
        );
      })
    );
    this.addCommand({
      id: "dismiss-keyboard",
      name: "Dismiss the keyboard",
      icon: "keyboard",
      callback: () => document.activeElement instanceof HTMLElement ? document.activeElement.blur() : void 0
    });
    this.applyMobileToolbar();
    this.registerDomEvent(document, "mousedown", (e) => this.onTodoCheckboxClick(e), { capture: true });
    this.registerDomEvent(
      document,
      "click",
      (e) => {
        if (!this.todoHandled) return;
        this.todoHandled = false;
        const t = e.target;
        if (t instanceof HTMLInputElement && t.hasClass("task-list-item-checkbox")) {
          e.preventDefault();
          e.stopPropagation();
        }
      },
      { capture: true }
    );
    this.registerDomEvent(document, "mouseup", () => window.setTimeout(() => this.snapHeadingCaret(), 0));
    this.registerDomEvent(document, "keyup", (e) => {
      if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Home", "End"].includes(e.key))
        window.setTimeout(() => this.snapHeadingCaret(), 0);
    });
    this.addCommand({ id: "todo-due", name: "To-do: set due date", icon: "calendar", editorCallback: (ed) => this.promptTodoToken(ed, "due") });
    this.addCommand({ id: "todo-recur", name: "To-do: make recurring", icon: "refresh-cw", editorCallback: (ed) => this.promptTodoToken(ed, "recur") });
    this.registerMarkdownCodeBlockProcessor("todo", (source, el, ctx) => {
      ctx.addChild(new TodoBlock(el, source, this));
    });
    this.registerMarkdownPostProcessor((el, ctx) => {
      const boxes = el.findAll("input.task-list-item-checkbox");
      if (!boxes.length) return;
      const info = ctx.getSectionInfo(el);
      if (!info) return;
      for (const box of boxes) {
        const rel = box.closest("li.task-list-item")?.getAttr("data-line");
        if (rel != null) {
          box.setAttr("data-ped-line", String(info.lineStart + Number(rel)));
          box.setAttr("data-ped-path", ctx.sourcePath);
        }
      }
    });
    this.addCommand({ id: "todo-capture", name: "To-do: quick capture", icon: "list-plus", callback: () => this.quickCapture() });
    this.addCommand({ id: "open-today", name: "Open the Today pane", icon: "calendar-check", callback: () => void this.activateTodayView() });
    this.registerView(TODAY_VIEW, (leaf) => new TodayView(leaf, this));
    this.addRibbonIcon("calendar-check", "Today's to-dos", () => void this.activateTodayView());
    this.registerEditorExtension(commentChips(this));
    this.addCommand({ id: "add-comment", name: "Add comment", icon: "message-circle", editorCallback: (ed) => this.addComment(ed) });
    this.addCommand({ id: "add-cover", name: "Add or change cover", icon: "image", callback: () => this.openCoverMenu() });
    this.addCommand({ id: "insert-columns", name: "Insert columns layout", icon: "columns-2", editorCallback: (ed) => this.insertColumnsMenu(ed) });
    this.addCommand({ id: "page-options", name: "Page options (width, font, cover)", icon: "layout", callback: () => this.openPageOptions() });
    this.addCommand({
      id: "verify-note",
      name: "Verify this note",
      icon: "badge-check",
      callback: () => {
        const f = this.app.workspace.getActiveViewOfType(import_obsidian2.MarkdownView)?.file;
        if (f) this.openVerifyMenu(void 0, f);
      }
    });
    this.registerEvent(this.app.workspace.on("file-open", () => this.queuePageChrome()));
    this.registerEvent(this.app.workspace.on("layout-change", () => this.queuePageChrome()));
    this.registerEvent(this.app.metadataCache.on("changed", () => this.queuePageChrome()));
    this.app.workspace.onLayoutReady(() => this.queuePageChrome());
    this.registerEvent(this.app.vault.on("modify", () => this.queuePageChrome()));
    this.registerInterval(window.setInterval(() => this.refreshEditedStamps(), 6e4));
    this.addCommand({
      id: "page-icon",
      name: "Add or change page icon",
      icon: "smile",
      callback: () => {
        const f = this.app.workspace.getActiveViewOfType(import_obsidian2.MarkdownView)?.file;
        if (f) this.openIconMenu(void 0, f);
      }
    });
    this.addCommand({
      id: "archive-done",
      name: "Archive completed to-dos (into a Done section)",
      icon: "archive",
      editorCallback: (ed) => {
        const lines = ed.getValue().split("\n");
        const res = archiveCompleted(lines);
        if (!res.moved) {
          new Notice("Nothing completed to archive.");
          return;
        }
        this.applyDoc(ed, lines, res.lines, 0);
        new Notice(`Archived ${res.moved} completed to-do${res.moved === 1 ? "" : "s"}.`);
      }
    });
    this.registerView(COMMENTS_VIEW, (leaf) => new CommentsView(leaf, this));
    this.addCommand({ id: "open-comments", name: "Open the Comments pane", icon: "message-circle", callback: () => void this.activatePane(COMMENTS_VIEW) });
    this.registerMarkdownCodeBlockProcessor("toc", (source, el, ctx) => {
      ctx.addChild(new TocBlock(el, source, ctx.sourcePath, this));
    });
    this.app.workspace.onLayoutReady(() => void this.todoDigest());
    this.registerInterval(window.setInterval(() => void this.todoReminderTick(), 6e4));
    if (import_obsidian2.Platform.isDesktopApp) {
      this.registerDomEvent(document, "pointermove", (e) => this.onPointerMove(e));
      this.registerDomEvent(document, "pointermove", (e) => this.trackImageHover(e));
      this.registerDomEvent(document, "pointerup", () => {
        if (this.dragging) {
          const d = this.dragging;
          if (!d.moved) {
            this.endDrag(null);
            this.openBlockMenu(d.view, d.range);
            return;
          }
          this.endDrag(d.target != null ? { target: d.target } : null);
          return;
        }
        if (this.painter) window.setTimeout(() => this.tryPaint(), 10);
      });
      this.registerDomEvent(document, "keydown", (e) => {
        if (e.key !== "Escape") return;
        if (this.dragging) this.endDrag(null);
        if (this.painter) {
          this.painter = null;
          this.paintButtons("off");
        }
      });
      this.registerDomEvent(document, "wheel", () => this.bubbleEl?.hide());
      this.registerColumnResize();
    }
  }
  /* ---------------- column widths (only when Power Tables is absent) ---------------- */
  /**
   * Power Tables owns table cells wherever it is installed: it has the whole
   * cell model, the auto-fit, and the right-click menu, and two plugins
   * binding pointer handlers to the same header cells would fight over every
   * drag. So this exists purely so a vault running Power Editor on its own is
   * not stuck with columns it cannot size, and it stands down the moment its
   * sibling appears. The widths it writes are in Power Tables' own encoding,
   * so installing that later finds the columns already sized rather than a
   * private set it cannot read.
   */
  powerTablesActive() {
    const plugs = this.app.plugins;
    return !!plugs?.plugins?.["powertables"] || !!plugs?.enabledPlugins?.has("powertables");
  }
  /** The header cell whose right edge is under the pointer, resizing the
   *  column before it when the pointer is near a cell's LEFT edge instead: a
   *  divider is one target, and which cell owns it is an implementation
   *  detail the user should not have to aim around. */
  headerEdgeAt(evt) {
    if (import_obsidian2.Platform.isPhone) return null;
    if (!(evt.target instanceof Element)) return null;
    const cell = evt.target.closest("th, td");
    if (!cell) return null;
    const tr = cell.closest("tr");
    if (!tr || tr.rowIndex !== 0) return null;
    if (!cell.closest(".markdown-source-view")) return null;
    const r = cell.getBoundingClientRect();
    if (evt.clientX >= r.right - 6 && evt.clientX <= r.right + 2) return cell;
    if (evt.clientX <= r.left + 6 && evt.clientX >= r.left - 2) {
      const prev = cell.previousElementSibling;
      return prev instanceof HTMLTableCellElement ? prev : null;
    }
    return null;
  }
  registerColumnResize() {
    this.registerDomEvent(document, "pointermove", (evt) => {
      if (this.resizing || this.powerTablesActive()) return;
      const edge = this.headerEdgeAt(evt);
      if (this.edgeHover && this.edgeHover !== edge) {
        this.edgeHover.removeClass("ped-col-edge");
        this.edgeHover = null;
      }
      if (edge) {
        edge.addClass("ped-col-edge");
        this.edgeHover = edge;
      }
    });
    this.registerDomEvent(
      document,
      "pointerdown",
      (evt) => {
        if (this.powerTablesActive()) return;
        const edge = this.headerEdgeAt(evt);
        if (!edge) return;
        evt.preventDefault();
        evt.stopPropagation();
        const start = { th: edge, x: evt.clientX, w: edge.getBoundingClientRect().width, moved: false };
        this.resizing = start;
        const move = (ev) => {
          if (Math.abs(ev.clientX - start.x) > 2) start.moved = true;
          const w = Math.max(MIN_COL_W, Math.round(start.w + ev.clientX - start.x));
          start.th.style.width = w + "px";
          start.th.style.minWidth = w + "px";
        };
        const up = (ev) => {
          window.removeEventListener("pointermove", move);
          window.removeEventListener("pointerup", up);
          this.resizing = null;
          if (!start.moved) return;
          this.commitColumnWidth(start.th, Math.max(MIN_COL_W, Math.round(start.w + ev.clientX - start.x)));
        };
        window.addEventListener("pointermove", move);
        window.addEventListener("pointerup", up);
      },
      { capture: true }
    );
  }
  /** Write the dragged width back into the header row. */
  commitColumnWidth(th, width) {
    const host = th.closest(".cm-editor");
    const view = host ? import_view.EditorView.findFromDOM(host) : null;
    if (!view) return;
    let pos;
    try {
      pos = view.posAtDOM(th);
    } catch {
      return;
    }
    const docLine = view.state.doc.lineAt(pos);
    const col = Array.from(th.parentElement?.children ?? []).indexOf(th);
    if (col < 0) return;
    const next = setHeaderCellWidth(docLine.text, col, width);
    if (next == null) return;
    view.dispatch({ changes: { from: docLine.from, to: docLine.to, insert: next } });
  }
  /** Paint stored widths onto rendered tables. The document is the record; the
   *  inline style is just what the browser needs to hear. */
  applyTableWidths() {
    if (import_obsidian2.Platform.isPhone || this.powerTablesActive()) return;
    document.body.querySelectorAll(".markdown-source-view table").forEach((tbl) => {
      const first = tbl.querySelector("tr");
      if (!first) return;
      const host = tbl.closest(".cm-editor");
      const view = host ? import_view.EditorView.findFromDOM(host) : null;
      if (!view) return;
      Array.from(first.children).forEach((cellEl, col) => {
        const el = cellEl;
        let w = null;
        try {
          w = headerCellWidth(view.state.doc.lineAt(view.posAtDOM(el)).text, col);
        } catch {
          return;
        }
        if (w == null) return;
        if (el.style.width !== w + "px") {
          el.style.width = w + "px";
          el.style.minWidth = w + "px";
        }
      });
    });
  }
  onunload() {
    if (this.pageChromeTimer != null) window.clearTimeout(this.pageChromeTimer);
    if (this.recorder) {
      this.recorder.onstop = null;
      this.recorder.stream.getTracks().forEach((t) => t.stop());
      this.recorder.stop();
      this.recorder = null;
    }
    this.endDrag(null);
    this.handleEl?.remove();
    this.dropEl?.remove();
    this.bubbleEl?.remove();
    this.colorPop?.remove();
    if (this.outlineSheet) {
      const sheet = this.outlineSheet;
      document.adoptedStyleSheets = document.adoptedStyleSheets.filter((x) => x !== sheet);
      this.outlineSheet = null;
    }
    for (const g of this.imgGrips) g.remove();
    this.imgBadge?.remove();
    document.body.removeClass("ped-wys");
    document.body.removeClass("ped-lh-compact");
    document.body.removeClass("ped-lh-relaxed");
    document.body.removeClass("ped-imgresizing");
    for (const view of this.markdownViews()) {
      this.bars.get(view)?.handOff?.disconnect();
      view.containerEl.querySelector(":scope > .ped-toolbar")?.remove();
    }
  }
  /* ---------------- toolbar lifecycle ---------------- */
  /** Mobile bar: swap Obsidian's above-keyboard toolbar commands for the
   *  quick-capture set. Obsidian's toolbar already docks to the keyboard, so
   *  only the command list and skin change; the user's own arrangement is
   *  saved once and restored when the setting is turned off. */
  applyMobileToolbar() {
    if (!import_obsidian2.Platform.isMobile) return;
    const vault = this.app.vault;
    const current = vault.getConfig("mobileToolbarCommands") ?? [];
    if (this.settings.onenoteMobileToolbar) {
      document.body.addClass("ped-mobile-bar");
      if (JSON.stringify(current) === JSON.stringify(MOBILE_TOOLBAR)) return;
      if (this.readToolbarBackup() == null) this.writeToolbarBackup(current);
      vault.setConfig("mobileToolbarCommands", MOBILE_TOOLBAR);
    } else {
      document.body.removeClass("ped-mobile-bar");
      const backup = this.readToolbarBackup();
      if (backup) {
        vault.setConfig("mobileToolbarCommands", backup);
        this.writeToolbarBackup(null);
        if (this.settings.mobileToolbarBackup) {
          this.settings.mobileToolbarBackup = null;
          void this.persistSettings();
        }
      }
    }
  }
  /**
   * The toolbar backup lives in Obsidian's own device-local store, not in
   * settings.
   *
   * It used to be saved with the settings, which meant a phone wrote its
   * data.json seconds into its FIRST launch, before any setting had been
   * touched. On a new device that file is factory defaults, and it then
   * competes with the real settings arriving from sync, newer by the clock
   * and wrong in every value. Nothing here is worth that: the backup
   * describes this device's own toolbar, is meaningless on any other, and
   * is not something the fleet should agree on.
   *
   * saveLocalStorage keys by vault for us, so two vaults on one phone keep
   * their own, and the legacy settings key is read first so a device that
   * saved one there still restores it.
   */
  /** The pair arrived in 1.8.7 and this plugin's floor is 1.7.2, so they are
   *  reached optionally rather than named: on an older app the backup simply
   *  does not exist, which the callers already treat as "no backup". */
  localStore() {
    return this.app;
  }
  readToolbarBackup() {
    if (this.settings.mobileToolbarBackup) return this.settings.mobileToolbarBackup;
    try {
      const v = this.localStore().loadLocalStorage?.(TOOLBAR_BACKUP_KEY);
      return Array.isArray(v) && v.every((x) => typeof x === "string") ? v : null;
    } catch {
      return null;
    }
  }
  writeToolbarBackup(list) {
    try {
      this.localStore().saveLocalStorage?.(TOOLBAR_BACKUP_KEY, list);
    } catch {
    }
  }
  /** The camera button: system photo picker (camera or library), saved into
   *  the vault's attachment folder and embedded at the cursor. */
  insertPhoto(ed) {
    const input = createEl("input", { type: "file", attr: { accept: "image/*" } });
    input.addEventListener("change", () => {
      void (async () => {
        const f = input.files?.[0];
        if (!f) return;
        const source = this.app.workspace.getActiveViewOfType(import_obsidian2.MarkdownView)?.file?.path ?? "";
        const dest = await this.app.fileManager.getAvailablePathForAttachment(f.name || `Photo ${Date.now()}.jpg`, source);
        const file = await this.app.vault.createBinary(dest, await f.arrayBuffer());
        let link = this.app.fileManager.generateMarkdownLink(file, source);
        if (!link.startsWith("!")) link = "!" + link;
        ed.replaceSelection(link);
      })();
    });
    input.click();
  }
  /**
   * Attach a file to the note: pick it, file it beside the page, and link it
   * where the cursor is. Several picked at once land as separate lines, so a
   * heading with four attachments under it reads as four bullets.
   *
   * Deliberately not restricted to PDFs by an `accept` list. The filing rule
   * is what this is for, and it is the same rule for a contract, a signed
   * scan, or a spreadsheet.
   */
  insertFile(ed) {
    const notePath = this.app.workspace.getActiveViewOfType(import_obsidian2.MarkdownView)?.file?.path ?? "";
    const input = createEl("input", { type: "file" });
    input.multiple = true;
    input.addEventListener("change", () => {
      const files = Array.from(input.files ?? []);
      if (files.length) void this.attachFiles(ed, files, notePath, ed.getCursor("from"));
    });
    input.click();
  }
  /** Save each file, then write the lot into the note at `at`. */
  async attachFiles(ed, files, notePath, at) {
    const written = [];
    let folder = "";
    let last = "";
    let anyEmbed = false;
    const pdf = this.settings.pdfInsert;
    for (const f of files) {
      try {
        const saved = await this.saveAttachment(f, notePath);
        folder = saved.parent?.path ?? "";
        last = saved.name;
        anyEmbed = anyEmbed || isEmbeddable(saved.name, pdf);
        written.push(attachmentMarkdown(this.app.fileManager.generateMarkdownLink(saved, notePath), saved.name, pdf));
      } catch (e) {
        new Notice(`Power Editor could not save ${f.name}: ${e instanceof Error ? e.message : String(e)}`, 8e3);
      }
    }
    if (!written.length) return;
    if (anyEmbed) {
      const lines = this.insertBlockAt(ed, written.join("\n\n") + "\n", at);
      ed.setCursor({ line: at.line + lines.length - 1, ch: lines[lines.length - 1].length });
    } else {
      const line = ed.getLine(at.line);
      const lead = /\S$/.test(line.slice(0, at.ch)) ? " " : "";
      const run = lead + written.map((w, i) => i ? listContinuation(line, i) + w : w).join("");
      ed.replaceRange(run, at);
      const tail = run.slice(run.lastIndexOf("\n") + 1);
      ed.setCursor(
        written.length > 1 ? { line: at.line + written.length - 1, ch: tail.length } : { line: at.line, ch: at.ch + run.length }
      );
    }
    const where = folder || "the vault root";
    new Notice(written.length === 1 ? `${last} saved to ${where}` : `${written.length} files saved to ${where}`);
  }
  /** Write one picked, dropped, or pasted file into the vault, in the folder
   *  the file-location setting asks for. */
  async saveAttachment(f, notePath) {
    const name = safeFileName(f.name, `Attachment ${todayStr()}`);
    const folder = attachmentFolder(notePath, this.settings.fileLocation, this.settings.fileSubfolder);
    const data = await f.arrayBuffer();
    if (folder === null) {
      const dest2 = await this.app.fileManager.getAvailablePathForAttachment(name, notePath);
      return await this.app.vault.createBinary(dest2, data);
    }
    await this.ensureFolder(folder);
    const dest = freePath(folder, name, (p) => this.app.vault.getAbstractFileByPath(p) != null);
    return await this.app.vault.createBinary(dest, data);
  }
  /** Create `path` and every folder above it that is missing. A subfolder
   *  named after the note does not exist until the first file goes in it. */
  async ensureFolder(path2) {
    let acc = "";
    for (const part of path2.split("/").filter(Boolean)) {
      acc = acc ? `${acc}/${part}` : part;
      if (this.app.vault.getAbstractFileByPath(acc)) continue;
      try {
        await this.app.vault.createFolder(acc);
      } catch {
      }
    }
  }
  /**
   * The files on a drop or a paste that this plugin should file itself.
   *
   * Pictures are left out on purpose. Screenshots are pasted constantly and
   * they already have a home in Obsidian's own attachment setting; the point
   * of this feature is that a document does not have to share it. Dragging a
   * note from the file explorer carries no files at all, so an internal drag
   * never reaches here.
   */
  attachable(dt) {
    if (!this.settings.routeDroppedFiles || this.settings.fileLocation === "obsidian") return [];
    return Array.from(dt?.files ?? []).filter((f) => f.name && !isImageFile(f.name, f.type));
  }
  /** Where a drop landed, which is not where the cursor is: the caret does not
   *  move to meet the pointer until Obsidian handles the drop itself. */
  dropPosition(ed, evt) {
    const cm = ed.cm;
    const off = cm?.posAtCoords({ x: evt.clientX, y: evt.clientY });
    return off == null ? null : ed.offsetToPos(off);
  }
  onTodoCheckboxClick(e) {
    const target = e.target;
    if (!(target instanceof HTMLInputElement) || !target.hasClass("task-list-item-checkbox")) return;
    if (!target.closest(".markdown-source-view.mod-cm6")) {
      const path2 = target.getAttr("data-ped-path");
      const lineNo = Number(target.getAttr("data-ped-line"));
      if (!path2 || Number.isNaN(lineNo)) return;
      const file = this.app.vault.getAbstractFileByPath(path2);
      if (!(file instanceof import_obsidian2.TFile)) return;
      e.preventDefault();
      e.stopPropagation();
      this.todoHandled = true;
      void this.app.vault.process(file, (data) => {
        const lines = data.split("\n");
        const res = lines[lineNo] != null ? toggleTodo(lines[lineNo], todayStr(), this.settings.stampDoneDates) : null;
        if (!res) return data;
        lines.splice(lineNo, 1, ...res.spawned != null ? [res.spawned, res.line] : [res.line]);
        return lines.join("\n");
      });
      return;
    }
    for (const view of this.markdownViews()) {
      if (!view.containerEl.contains(target)) continue;
      const cm = view.editor.cm;
      if (!cm) return;
      if (!cm.dom.contains(target)) return;
      let line;
      try {
        line = cm.state.doc.lineAt(cm.posAtDOM(target));
      } catch {
        return;
      }
      const res = toggleTodo(line.text, todayStr(), this.settings.stampDoneDates);
      if (!res) return;
      e.preventDefault();
      e.stopPropagation();
      this.todoHandled = true;
      const insert = res.spawned != null ? res.spawned + "\n" + res.line : res.line;
      cm.dispatch({ changes: { from: line.from, to: line.to, insert } });
      return;
    }
  }
  /** Add or replace 📅 / 🔁 on the line under the cursor, making it a
   *  checklist item first when it isn't one. */
  promptTodoToken(ed, kind) {
    const lineNo = ed.getCursor().line;
    let text = ed.getLine(lineNo);
    if (!parseTodo(text)) {
      const lm = text.match(/^(\s*)(?:[-*+]|\d+[.)])\s+(.*)$/);
      text = lm ? `${lm[1]}- [ ] ${lm[2]}` : `${text.match(/^\s*/)?.[0] ?? ""}- [ ] ${text.trim()}`;
    }
    const t = parseTodo(text);
    if (!t) return;
    const heading = kind === "due" ? "Due date (YYYY-MM-DD)" : "Repeat (e.g. every 6 months, every monday)";
    const initial = kind === "due" ? t.due ?? todayStr() : t.recurrence ?? "every week";
    new TextPromptModal(this.app, heading, initial, (raw) => {
      const v = raw.trim();
      if (kind === "due") {
        if (!/^\d{4}-\d{2}-\d{2}$/.test(v)) return;
        t.due = v;
      } else if (v) {
        t.recurrence = v;
      } else {
        delete t.recurrence;
      }
      ed.setLine(lineNo, formatTodo(t));
    }).open();
  }
  /** Every checklist line in the vault, located via the metadata cache so
   *  only files that actually contain tasks get read. */
  async collectTodos() {
    const out = [];
    for (const f of this.app.vault.getMarkdownFiles()) {
      const cache = this.app.metadataCache.getFileCache(f);
      if (!cache?.listItems?.some((li) => li.task !== void 0)) continue;
      const lines = (await this.app.vault.cachedRead(f)).split("\n");
      for (const li of cache.listItems) {
        if (li.task === void 0) continue;
        const n = li.position.start.line;
        const t = parseTodo(lines[n] ?? "");
        if (t) out.push({ ...t, path: f.path, line: n });
      }
    }
    return out;
  }
  /** Guarded source edit: the line index came from render time, so nothing
   *  happens when the line no longer holds the same item. Every remote edit
   *  offers a five-second Undo toast, dashboards and panes edit other
   *  files, outside those notes' Ctrl+Z. */
  async editTodoLine(t, change) {
    const file = this.app.vault.getAbstractFileByPath(t.path ?? "");
    if (!(file instanceof import_obsidian2.TFile)) return;
    const at = t.line ?? -1;
    let before = null;
    let after = null;
    await this.app.vault.process(file, (data) => {
      const lines = data.split("\n");
      if (at < 0 || lines[at] == null) return data;
      const now = parseTodo(lines[at]);
      if (!now || now.body !== t.body) return data;
      const next = change(lines[at]);
      if (!next) return data;
      before = [lines[at]];
      after = next;
      lines.splice(at, 1, ...next);
      return lines.join("\n");
    });
    const b = before;
    const a = after;
    if (b && a) this.offerUndo(file, at, b, a);
  }
  offerUndo(file, at, before, after) {
    let link;
    const frag = createFragment((f) => {
      f.appendText("Updated. ");
      link = f.createEl("a", { text: "Undo" });
    });
    const notice = new Notice(frag, 5e3);
    link.addEventListener("click", () => {
      notice.hide();
      void this.app.vault.process(file, (data) => {
        const lines = data.split("\n");
        const cur = lines.slice(at, at + after.length);
        if (JSON.stringify(cur) !== JSON.stringify(after)) return data;
        lines.splice(at, after.length, ...before);
        return lines.join("\n");
      });
    });
  }
  toggleTodoAt(t) {
    return this.editTodoLine(t, (line) => {
      const res = toggleTodo(line, todayStr(), this.settings.stampDoneDates);
      return res ? res.spawned != null ? [res.spawned, res.line] : [res.line] : null;
    });
  }
  setTodoDue(t, date) {
    return this.editTodoLine(t, (line) => {
      const next = setDueDate(line, date);
      return next != null ? [next] : null;
    });
  }
  setTodoPriority(t, priority) {
    return this.editTodoLine(t, (line) => {
      const next = setPriority(line, priority);
      return next != null ? [next] : null;
    });
  }
  /**
   * The main-area tab already showing this path, if there is one.
   *
   * Asked through `getViewState()` rather than `leaf.view.file`, because every
   * tab you are not standing in is deferred since 1.7.2: its view is a stand-in
   * that holds no file, and reaching for one to ask would load every tab in the
   * window. The view state carries the path whether the view is real or not.
   *
   * Main-area leaves only. A note showing in a sidebar is not a tab, and a note
   * deliberately popped out into a window of its own should not have a panel
   * pulling focus to another window behind your back.
   */
  openLeafFor(path2) {
    const hits = [];
    this.app.workspace.iterateRootLeaves((leaf) => {
      const open = leaf.getViewState().state?.file;
      if (typeof open === "string" && open === path2) hits.push(leaf);
    });
    return hits[0] ?? null;
  }
  /** Step to the tab already holding this path, if there is one. The open is
   *  left to the caller, so an `openLinkText` that follows lands in the tab
   *  this just made active and keeps Obsidian's own subpath handling. */
  async focusOpenTab(path2) {
    const open = this.openLeafFor(path2);
    if (!open) return;
    await this.app.workspace.revealLeaf(open);
    this.app.workspace.setActiveLeaf(open, { focus: true });
  }
  /**
   * Jump to a line in a note, in the tab already holding it when there is one.
   *
   * Every panel in here lists things that live in notes: todos, comments,
   * headings. Clicking one asked to open its note without ever asking where
   * that note already was, so a chip clicked from anywhere but the note itself
   * laid a second copy of it over what you were looking at. That is a bad trade
   * in a to-do panel, where clicking through eight items in a row is the normal
   * way to use it and used to leave you with a tab for each.
   */
  async showAt(path2, eState) {
    const open = this.openLeafFor(path2);
    if (open) {
      await this.app.workspace.revealLeaf(open);
      this.app.workspace.setActiveLeaf(open, { focus: true });
      if (eState) open.setEphemeralState(eState);
      return;
    }
    await this.app.workspace.openLinkText(path2, "", false, eState ? { eState } : void 0);
  }
  /** One dashboard/pane row: live checkbox, body, snoozable due chip,
   *  recurrence hint, and a link to the source note. */
  renderTodoItem(list, t) {
    const row = list.createDiv({ cls: "ped-todo-item" + (t.checked ? " is-done" : "") });
    const box = row.createEl("input", { cls: "ped-todo-box", attr: { type: "checkbox" } });
    box.checked = t.checked;
    box.addEventListener("mousedown", (e) => {
      e.preventDefault();
      void this.toggleTodoAt(t);
    });
    row.createSpan({ cls: "ped-todo-text", text: t.body });
    const due = row.createSpan({
      cls: "ped-todo-due" + (t.due ? "" : " is-empty") + (t.due && !t.checked && t.due < todayStr() ? " is-overdue" : ""),
      text: t.due ? "\u{1F4C5} " + t.due : "\u{1F4C5}",
      attr: { "aria-label": "Reschedule" }
    });
    due.addEventListener("click", (e) => this.openSnoozeMenu(t, e));
    if (t.recurrence) row.createSpan({ cls: "ped-todo-recur", text: "\u{1F501} " + t.recurrence });
    const src = row.createSpan({
      cls: "ped-todo-src",
      text: (t.path ?? "").replace(/\.md$/, "").split("/").pop() ?? ""
    });
    src.addEventListener("click", () => {
      void this.showAt(t.path ?? "", { line: t.line });
    });
  }
  /** Tap the 📅 chip: today / tomorrow / next week / pick / remove. The
   *  picker takes phrases ("next friday", "aug 1"), not just dates. */
  openSnoozeMenu(t, e) {
    const menu = new import_obsidian2.Menu();
    const today = todayStr();
    const set = (date) => void this.setTodoDue(t, date);
    menu.addItem((i) => i.setTitle("Today").setIcon("calendar-check").onClick(() => set(today)));
    menu.addItem((i) => i.setTitle("Tomorrow").setIcon("calendar").onClick(() => set(isoAddDays(today, 1))));
    menu.addItem((i) => i.setTitle("Next week").setIcon("calendar-plus").onClick(() => set(parseDatePhrase("next week", today))));
    menu.addItem(
      (i) => i.setTitle("Pick date\u2026").setIcon("calendar-search").onClick(() => {
        new TextPromptModal(this.app, "Due date, a date or phrase like 'next friday' or 'aug 1'", t.due ?? today, (raw) => {
          const d = parseDatePhrase(raw, todayStr());
          if (d) set(d);
          else new Notice("Power Editor: couldn't read that as a date.");
        }).open();
      })
    );
    if (t.due) menu.addItem((i) => i.setTitle("Remove due date").setIcon("calendar-x").onClick(() => set(null)));
    menu.showAtMouseEvent(e);
  }
  /** Quick capture: one natural-language line into the inbox note from
   *  anywhere, "rotate tires every 6 months starting aug 1". */
  quickCapture() {
    new TextPromptModal(this.app, "Add a to-do, try 'call bob tomorrow' or 'rotate tires every 6 months'", "", (raw) => {
      if (!raw.trim()) return;
      const parsed = parseQuickTodo(raw, todayStr());
      const t = parseTodo(`- [ ] ${parsed.body || raw.trim()}`);
      if (!t) return;
      if (parsed.due) t.due = parsed.due;
      if (parsed.recurrence) t.recurrence = parsed.recurrence;
      void this.appendToInbox(formatTodo(t));
    }).open();
  }
  async appendToInbox(line) {
    const path2 = this.settings.inboxNote.trim() || "Inbox.md";
    let file = this.app.vault.getAbstractFileByPath(path2);
    if (!file) {
      const dir = path2.split("/").slice(0, -1).join("/");
      if (dir && !this.app.vault.getAbstractFileByPath(dir)) {
        try {
          await this.app.vault.createFolder(dir);
        } catch {
        }
      }
      file = await this.app.vault.create(path2, "");
    }
    if (!(file instanceof import_obsidian2.TFile)) {
      new Notice("Inbox path is a folder: " + path2);
      return;
    }
    await this.app.vault.process(file, (data) => (data.trim() ? data.replace(/\s*$/, "\n") : "") + line + "\n");
    new Notice("Added: " + line.replace(/^\s*- \[ \] /, ""));
  }
  async activateTodayView() {
    await this.activatePane(TODAY_VIEW);
  }
  async activatePane(type) {
    const existing = this.app.workspace.getLeavesOfType(type)[0];
    const leaf = existing ?? this.app.workspace.getRightLeaf(false);
    if (!leaf) return;
    if (!existing) await leaf.setViewState({ type, active: true });
    await this.app.workspace.revealLeaf(leaf);
  }
  /** The launch digest: how much is due (and overdue) today, one click from
   *  the Today pane. Quiet when there's nothing to say. */
  async todoDigest() {
    if (!this.settings.todoReminders) return;
    const today = todayStr();
    const open = (await this.collectTodos()).filter((t) => !t.checked && t.due != null && t.due <= today);
    if (!open.length) return;
    const overdue = open.filter((t) => t.due != null && t.due < today).length;
    const notice = new Notice(
      `${open.length} to-do${open.length === 1 ? "" : "s"} due today${overdue ? ` (${overdue} overdue)` : ""}, click to open Today`,
      1e4
    );
    const parts2 = notice;
    (parts2.messageEl ?? parts2.noticeEl).addEventListener("click", () => {
      notice.hide();
      void this.activateTodayView();
    });
  }
  /** Editable Notion-style tabs. The active pane hosts a real Obsidian
   *  markdown editor (paneeditor.ts): live preview, slash commands, native
   *  list handling, and the toolbar all work inside it, and edits write back
   *  into the `tabs` code block on blur / tab switch / teardown. If the
   *  internal editor can't be built, falls back to the textarea panes. */
  /** Mark the code block's frame so styles.css can drop it by class.
   *
   *  The frame belongs to Obsidian's `.cm-embed-block`, an ancestor, and a
   *  stylesheet can only reach a parent from a child with `:has()`, which the
   *  directory flags for the invalidation cost. The container is not always
   *  attached when a post-processor runs, so this also tries once more on the
   *  next frame; addClass is idempotent, so a hit on both is harmless. */
  markPlainEmbed(el) {
    const mark = () => el.closest(".cm-embed-block")?.addClass("ped-embed-plain");
    mark();
    window.requestAnimationFrame(mark);
  }
  renderTabs(source, el, ctx) {
    if (!this.paneEditorsOk) {
      this.renderTabsBasic(source, el, ctx);
      return;
    }
    const panes = parseTabs(source);
    if (!panes.length) panes.push({ title: "Tab 1", body: "" });
    const child = new import_obsidian3.MarkdownRenderChild(el);
    ctx.addChild(child);
    const key = `${ctx.sourcePath}:${ctx.getSectionInfo(el)?.lineStart ?? -1}`;
    let active = Math.max(0, Math.min(this.tabActive.get(key) ?? 0, panes.length - 1));
    let pane = null;
    let dirty = false;
    let flushTimer = null;
    const syncActive = () => {
      if (!pane) return;
      const v = pane.value();
      if (v !== panes[active].body) {
        panes[active].body = v;
        dirty = true;
      }
    };
    const writeBack = async () => {
      dirty = false;
      const file = this.app.vault.getAbstractFileByPath(ctx.sourcePath);
      if (!(file instanceof import_obsidian2.TFile)) return;
      const info = ctx.getSectionInfo(el);
      if (!info) return;
      await this.app.vault.process(file, (data) => {
        const lines = data.split("\n");
        const open = lines[info.lineStart];
        const close = lines[info.lineEnd];
        if (open == null || close == null) return data;
        if (open.replace(/`/g, "").trim() !== "tabs" || !close.trim().startsWith("```")) return data;
        const inner = serializeTabs(panes).split("\n");
        lines.splice(info.lineStart, info.lineEnd - info.lineStart + 1, open, ...inner, close);
        return lines.join("\n");
      });
    };
    const flush = () => {
      syncActive();
      if (dirty) void writeBack();
    };
    const scheduleFlush = (ms) => {
      if (flushTimer != null) window.clearTimeout(flushTimer);
      flushTimer = window.setTimeout(() => {
        if (pane?.hasFocus()) return;
        flush();
      }, ms);
    };
    child.register(() => {
      if (flushTimer != null) window.clearTimeout(flushTimer);
      flush();
      pane?.destroy();
      pane = null;
    });
    this.markPlainEmbed(el);
    const root = el.createDiv({ cls: "ped-tabs" });
    root.addEventListener("mousedown", (e) => e.stopPropagation());
    const strip2 = root.createDiv({ cls: "ped-tabstrip" });
    const body = root.createDiv({ cls: "ped-tabbody" });
    const mountPane = () => {
      pane?.destroy();
      body.empty();
      const paneEl = body.createDiv({ cls: "ped-tabpane" });
      pane = createPaneEditor(this.app, paneEl, {
        value: panes[active].body,
        sourcePath: ctx.sourcePath,
        onChange: () => {
          dirty = true;
          if (!pane?.hasFocus()) scheduleFlush(600);
        },
        onBlur: () => scheduleFlush(300),
        onEscape: () => flush()
      });
      if (!pane) {
        this.paneEditorsOk = false;
        el.empty();
        this.renderTabsBasic(source, el, ctx);
      }
    };
    const renameTab = (btn, i) => {
      const input = createEl("input", { cls: "ped-tab-rename", attr: { type: "text" } });
      input.value = panes[i].title;
      btn.replaceWith(input);
      input.focus();
      input.select();
      let done = false;
      const commit = (save) => {
        if (done) return;
        done = true;
        if (save) {
          const v = input.value.trim() || `Tab ${i + 1}`;
          if (panes[i].title !== v) {
            panes[i].title = v;
            dirty = true;
          }
        }
        flush();
        draw();
      };
      input.addEventListener("blur", () => commit(true));
      input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          commit(true);
        } else if (e.key === "Escape") {
          commit(false);
        }
      });
    };
    const draw = () => {
      active = Math.max(0, Math.min(active, panes.length - 1));
      this.tabActive.set(key, active);
      strip2.empty();
      panes.forEach((p, i) => {
        const btn = strip2.createEl("button", {
          cls: "ped-tab" + (i === active ? " is-active" : ""),
          text: p.title || `Tab ${i + 1}`
        });
        btn.onclick = () => {
          if (i === active) return;
          syncActive();
          active = i;
          this.tabActive.set(key, active);
          if (dirty) void writeBack();
          draw();
          mountPane();
        };
        btn.ondblclick = () => renameTab(btn, i);
        btn.oncontextmenu = (e) => {
          e.preventDefault();
          const m = new import_obsidian2.Menu();
          m.addItem((it) => it.setTitle("Rename tab").setIcon("pencil").onClick(() => renameTab(btn, i)));
          if (panes.length > 1)
            m.addItem(
              (it) => it.setTitle("Delete tab").setIcon("trash-2").onClick(() => {
                panes.splice(i, 1);
                if (active >= i) active = Math.max(0, active - 1);
                this.tabActive.set(key, active);
                dirty = true;
                flush();
                draw();
                mountPane();
              })
            );
          m.showAtMouseEvent(e);
        };
      });
      const add = strip2.createEl("button", { cls: "ped-tab-add", text: "+", attr: { "aria-label": "Add tab" } });
      add.onclick = () => {
        syncActive();
        panes.push({ title: `Tab ${panes.length + 1}`, body: "" });
        active = panes.length - 1;
        this.tabActive.set(key, active);
        dirty = true;
        void writeBack();
        draw();
        mountPane();
        pane?.focus();
      };
    };
    draw();
    mountPane();
  }
  /** The plain-textarea tabs (pre-embedded-editor), kept as the fallback. */
  renderTabsBasic(source, el, ctx) {
    const panes = parseTabs(source);
    if (!panes.length) panes.push({ title: "Tab 1", body: "" });
    const child = new import_obsidian3.MarkdownRenderChild(el);
    ctx.addChild(child);
    const key = `${ctx.sourcePath}:${ctx.getSectionInfo(el)?.lineStart ?? -1}`;
    let active = Math.min(this.tabActive.get(key) ?? 0, panes.length - 1);
    const writeBack = async () => {
      const file = this.app.vault.getAbstractFileByPath(ctx.sourcePath);
      if (!(file instanceof import_obsidian2.TFile)) return;
      const info = ctx.getSectionInfo(el);
      if (!info) return;
      await this.app.vault.process(file, (data) => {
        const lines = data.split("\n");
        const open = lines[info.lineStart];
        const close = lines[info.lineEnd];
        if (open == null || close == null) return data;
        if (open.replace(/`/g, "").trim() !== "tabs" || !close.trim().startsWith("```")) return data;
        const inner = serializeTabs(panes).split("\n");
        lines.splice(info.lineStart, info.lineEnd - info.lineStart + 1, open, ...inner, close);
        return lines.join("\n");
      });
    };
    this.markPlainEmbed(el);
    const root = el.createDiv({ cls: "ped-tabs" });
    root.addEventListener("mousedown", (e) => e.stopPropagation());
    const strip2 = root.createDiv({ cls: "ped-tabstrip" });
    const body = root.createDiv({ cls: "ped-tabbody" });
    const renderView = (pane, i) => {
      pane.empty();
      const p = panes[i];
      if (p.body.trim()) void import_obsidian3.MarkdownRenderer.render(this.app, p.body, pane, ctx.sourcePath, child);
      else pane.createSpan({ cls: "ped-tab-empty", text: "Empty tab (click to add content)" });
      pane.onclick = (e) => {
        if (e.target.closest("a, input, button, .task-list-item-checkbox")) return;
        editView(pane, i);
      };
    };
    const editView = (pane, i) => {
      pane.empty();
      pane.onclick = null;
      const ta = pane.createEl("textarea", { cls: "ped-tab-edit" });
      ta.value = panes[i].body;
      const grow = () => {
        ta.style.removeProperty("height");
        ta.style.height = ta.scrollHeight + 2 + "px";
      };
      grow();
      ta.addEventListener("input", grow);
      ta.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
          ta.blur();
          return;
        }
        const at = ta.selectionStart;
        if (at !== ta.selectionEnd) return;
        if (e.key === "Enter" && !e.shiftKey) {
          const lineStart = ta.value.lastIndexOf("\n", at - 1) + 1;
          const cont = continueList(ta.value.slice(lineStart, at));
          if (cont) {
            e.preventDefault();
            if ("insert" in cont) ta.setRangeText(cont.insert, at, at, "end");
            else ta.setRangeText(cont.clear, lineStart, at, "end");
            grow();
          }
        } else if (e.key === "Tab") {
          e.preventDefault();
          ta.setRangeText("	", at, at, "end");
          grow();
        }
      });
      ta.addEventListener("blur", () => {
        const changed = panes[i].body !== ta.value.trim();
        panes[i].body = ta.value;
        renderView(pane, i);
        if (changed) void writeBack();
      });
      window.setTimeout(() => ta.focus(), 0);
    };
    const renameTab = (btn, i) => {
      const input = createEl("input", { cls: "ped-tab-rename", attr: { type: "text" } });
      input.value = panes[i].title;
      btn.replaceWith(input);
      input.focus();
      input.select();
      let done = false;
      const commit = (save) => {
        if (done) return;
        done = true;
        if (save) {
          const v = input.value.trim() || `Tab ${i + 1}`;
          const changed = panes[i].title !== v;
          panes[i].title = v;
          if (changed) void writeBack();
        }
        draw();
      };
      input.addEventListener("blur", () => commit(true));
      input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          commit(true);
        } else if (e.key === "Escape") {
          commit(false);
        }
      });
    };
    const draw = () => {
      active = Math.max(0, Math.min(active, panes.length - 1));
      this.tabActive.set(key, active);
      strip2.empty();
      body.empty();
      panes.forEach((p, i) => {
        const btn = strip2.createEl("button", {
          cls: "ped-tab" + (i === active ? " is-active" : ""),
          text: p.title || `Tab ${i + 1}`
        });
        btn.onclick = () => {
          active = i;
          draw();
        };
        btn.ondblclick = () => renameTab(btn, i);
        btn.oncontextmenu = (e) => {
          e.preventDefault();
          const m = new import_obsidian2.Menu();
          m.addItem((it) => it.setTitle("Rename tab").setIcon("pencil").onClick(() => renameTab(btn, i)));
          if (panes.length > 1)
            m.addItem(
              (it) => it.setTitle("Delete tab").setIcon("trash-2").onClick(() => {
                panes.splice(i, 1);
                if (active >= i) active = Math.max(0, active - 1);
                void writeBack();
                draw();
              })
            );
          m.showAtMouseEvent(e);
        };
      });
      const add = strip2.createEl("button", { cls: "ped-tab-add", text: "+", attr: { "aria-label": "Add tab" } });
      add.onclick = () => {
        panes.push({ title: `Tab ${panes.length + 1}`, body: "" });
        active = panes.length - 1;
        void writeBack();
        draw();
      };
      const pane = body.createDiv({ cls: "ped-tabpane" });
      renderView(pane, active);
    };
    draw();
  }
  /** Live, editable columns: every column hosts a real embedded editor so you
   *  type straight into it in Live Preview, with a divider to drag-resize and
   *  controls to add or remove a column. Writes back only while nothing in the
   *  block is focused, so a re-render never yanks the editor mid-type. Falls
   *  back to a read-only render if the internal editor can't be resolved. */
  renderColumns(source, el, ctx) {
    if (!this.paneEditorsOk) {
      this.renderColumnsBasic(source, el, ctx);
      return;
    }
    const panes = parseColumns(source);
    if (!panes.length) panes.push({ ratio: 1, body: "" });
    const child = new import_obsidian3.MarkdownRenderChild(el);
    ctx.addChild(child);
    const editors = [];
    let dirty = false;
    let flushTimer = null;
    const anyFocused = () => editors.some((pe) => pe?.hasFocus());
    const syncAll = () => {
      editors.forEach((pe, i) => {
        if (!pe || !panes[i]) return;
        const v = pe.value();
        if (v !== panes[i].body) {
          panes[i].body = v;
          dirty = true;
        }
      });
    };
    const writeBack = async () => {
      dirty = false;
      const file = this.app.vault.getAbstractFileByPath(ctx.sourcePath);
      if (!(file instanceof import_obsidian2.TFile)) return;
      const info = ctx.getSectionInfo(el);
      if (!info) return;
      await this.app.vault.process(file, (data) => {
        const lines = data.split("\n");
        const open = lines[info.lineStart];
        const close = lines[info.lineEnd];
        if (open == null || close == null) return data;
        if (open.replace(/`/g, "").trim() !== "columns" || !close.trim().startsWith("```")) return data;
        const inner = serializeColumns(panes).split("\n");
        lines.splice(info.lineStart, info.lineEnd - info.lineStart + 1, open, ...inner, close);
        return lines.join("\n");
      });
    };
    const flush = () => {
      syncAll();
      if (dirty) void writeBack();
    };
    const scheduleFlush = (ms) => {
      if (flushTimer != null) window.clearTimeout(flushTimer);
      flushTimer = window.setTimeout(() => {
        if (anyFocused()) return;
        flush();
      }, ms);
    };
    child.register(() => {
      if (flushTimer != null) window.clearTimeout(flushTimer);
      flush();
      editors.forEach((pe) => pe?.destroy());
      editors.length = 0;
    });
    this.markPlainEmbed(el);
    const root = el.createDiv({ cls: "ped-columns ped-columns-live" });
    root.addEventListener("mousedown", (e) => e.stopPropagation());
    const draw = () => {
      editors.forEach((pe) => pe?.destroy());
      editors.length = 0;
      root.empty();
      const cols = [];
      let broke = false;
      for (let i = 0; i < panes.length; i++) {
        if (i > 0) {
          const divider = root.createDiv({ cls: "ped-col-divider", attr: { "aria-label": "Drag to resize" } });
          this.armColumnResize(divider, () => cols, panes, i, () => {
            dirty = true;
            void writeBack();
          });
        }
        const col = root.createDiv({ cls: "ped-column" });
        col.style.flexGrow = String(panes[i].ratio);
        cols.push(col);
        if (panes.length > 1) {
          const rm = col.createEl("button", { cls: "ped-col-remove", attr: { "aria-label": "Remove column" } });
          (0, import_obsidian2.setIcon)(rm, "x");
          const idx = i;
          rm.onclick = () => {
            syncAll();
            panes.splice(idx, 1);
            dirty = true;
            void writeBack();
            draw();
          };
        }
        const paneEl = col.createDiv({ cls: "ped-col-pane" });
        const pe = createPaneEditor(this.app, paneEl, {
          value: panes[i].body,
          sourcePath: ctx.sourcePath,
          onChange: () => {
            dirty = true;
            if (!anyFocused()) scheduleFlush(600);
          },
          onBlur: () => scheduleFlush(300),
          onEscape: () => flush()
        });
        editors.push(pe);
        if (!pe) {
          broke = true;
          break;
        }
      }
      if (broke) {
        this.paneEditorsOk = false;
        editors.forEach((pe) => pe?.destroy());
        el.empty();
        this.renderColumnsBasic(source, el, ctx);
        return;
      }
      const add = root.createDiv({ cls: "ped-col-add", attr: { "aria-label": "Add column" } });
      (0, import_obsidian2.setIcon)(add, "plus");
      add.onclick = () => {
        syncAll();
        panes.push({ ratio: 1, body: "" });
        dirty = true;
        void writeBack();
        draw();
        editors[editors.length - 1]?.focus();
      };
    };
    draw();
  }
  /** Drag a divider to resize the two columns it sits between; the pixel widths
   *  become the new flex ratios, saved on release. */
  armColumnResize(divider, getCols, panes, right, onDone) {
    divider.addEventListener("pointerdown", (e) => {
      e.preventDefault();
      const cols = getCols();
      const left = right - 1;
      const lEl = cols[left];
      const rEl = cols[right];
      if (!lEl || !rEl) return;
      const startX = e.clientX;
      const wL = lEl.offsetWidth;
      const wR = rEl.offsetWidth;
      divider.setPointerCapture(e.pointerId);
      divider.addClass("is-dragging");
      const onMove = (me) => {
        const dx = Math.max(-(wL - 60), Math.min(wR - 60, me.clientX - startX));
        panes[left].ratio = wL + dx;
        panes[right].ratio = wR - dx;
        lEl.style.flexGrow = String(wL + dx);
        rEl.style.flexGrow = String(wR - dx);
      };
      const onUp = () => {
        divider.removeEventListener("pointermove", onMove);
        divider.removeEventListener("pointerup", onUp);
        divider.removeClass("is-dragging");
        onDone();
      };
      divider.addEventListener("pointermove", onMove);
      divider.addEventListener("pointerup", onUp);
    });
  }
  /** The read-only columns render, kept as the fallback when embedded editors
   *  can't be created (and used by Reading view). */
  renderColumnsBasic(source, el, ctx) {
    const panes = parseColumns(source);
    if (!panes.length) {
      el.createEl("em", { text: "Empty columns block (separate columns with '---' lines." });
      return;
    }
    const child = new import_obsidian3.MarkdownRenderChild(el);
    ctx.addChild(child);
    this.markPlainEmbed(el);
    const root = el.createDiv({ cls: "ped-columns" });
    for (const p of panes) {
      const col = root.createDiv({ cls: "ped-column" });
      col.style.flexGrow = String(p.ratio);
      void import_obsidian3.MarkdownRenderer.render(this.app, p.body, col, ctx.sourcePath, child);
    }
  }
  /** ⏰ HH:MM tasks fire a notice the minute they come due (app open). */
  async todoReminderTick() {
    if (!this.settings.todoReminders) return;
    const d = /* @__PURE__ */ new Date();
    const hhmm = `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
    const today = todayStr();
    const hits = (await this.collectTodos()).filter((t) => !t.checked && t.due === today && t.time === hhmm);
    for (const t of hits) {
      const key = `${t.path}:${t.line}:${today} ${hhmm}`;
      if (this.notified.has(key)) continue;
      this.notified.add(key);
      new Notice("\u23F0 " + t.body, 1e4);
    }
  }
  /* ---------------- Notion page chrome: covers, comments, verification ---------------- */
  /** Re-sync every markdown view's cover, page icon, verify badge, and the
   *  per-note page layout (width, font, cover overlay). */
  updatePageChrome() {
    for (const view of this.markdownViews()) {
      this.applyCover(view);
      this.applyPageIcon(view);
      this.applyVerifyBadge(view);
      this.applyPageLayout(view);
      this.applyEditedStamp(view);
    }
  }
  queuePageChrome() {
    if (this.pageChromeTimer != null) window.clearTimeout(this.pageChromeTimer);
    this.pageChromeTimer = window.setTimeout(() => {
      this.pageChromeTimer = null;
      if (this.vaultUiSettling()) {
        this.queuePageChrome();
        return;
      }
      this.updatePageChrome();
    }, import_obsidian2.Platform.isMobileApp ? 500 : 50);
  }
  /** Visible whole-vault widgets use this to wait through a phone sync burst
   *  and render once from the settled vault. */
  vaultUiSettling() {
    if (!import_obsidian2.Platform.isMobileApp) return false;
    const pc = this.app.plugins?.plugins?.powerconnect;
    return pc?.running === true || pc?.mobileStartupPending === true;
  }
  vaultUiDelay() {
    return import_obsidian2.Platform.isMobileApp ? 750 : 400;
  }
  /** Toggle the per-note width, font, and cover-overlay classes on the view. */
  applyPageLayout(view) {
    const layout = parsePageLayout(view.file ? this.app.metadataCache.getFileCache(view.file)?.frontmatter : void 0);
    const host = view.containerEl;
    host.toggleClass("ped-full-width", layout.fullWidth);
    host.toggleClass("ped-font-serif", layout.font === "serif");
    host.toggleClass("ped-font-mono", layout.font === "mono");
    host.toggleClass("ped-cover-overlay", layout.overlayTitle);
  }
  async writePageProp(file, key, value) {
    await this.app.fileManager.processFrontMatter(file, (fm) => {
      if (value == null) delete fm[key];
      else fm[key] = value;
    });
  }
  /** A small menu for the per-note page options: full width, body font, and
   *  (when a cover is set) whether the title floats over it. */
  openPageOptions() {
    const file = this.app.workspace.getActiveViewOfType(import_obsidian2.MarkdownView)?.file;
    if (!file) return;
    const fm = this.app.metadataCache.getFileCache(file)?.frontmatter;
    const layout = parsePageLayout(fm);
    const menu = new import_obsidian2.Menu();
    menu.addItem(
      (i) => i.setTitle("Full width").setIcon("move-horizontal").setChecked(layout.fullWidth).onClick(() => void this.writePageProp(file, "full-width", layout.fullWidth ? null : true))
    );
    menu.addSeparator();
    const font = (label, val, icon) => menu.addItem(
      (i) => i.setTitle(label).setIcon(icon).setChecked((layout.font ?? "default") === val).onClick(() => void this.writePageProp(file, "font", val === "default" ? null : val))
    );
    font("Default font", "default", "type");
    font("Serif", "serif", "type");
    font("Monospace", "mono", "code");
    if (parseCover(fm)) {
      menu.addSeparator();
      menu.addItem(
        (i) => i.setTitle("Title over cover").setIcon("image").setChecked(layout.overlayTitle).onClick(() => void this.writePageProp(file, "cover-overlay", layout.overlayTitle ? null : true))
      );
    }
    menu.showAtPosition({ x: window.innerWidth / 2 - 110, y: 150 });
  }
  /** Notion's page icon: an `icon` frontmatter emoji rendered above the
   *  inline title. Click to change or remove. */
  applyPageIcon(view) {
    const file = view.file;
    const icon = file ? parseIcon(this.app.metadataCache.getFileCache(file)?.frontmatter) : null;
    for (const titleEl of Array.from(view.containerEl.querySelectorAll(".inline-title"))) {
      const parent = titleEl.parentElement;
      if (!parent) continue;
      let el = parent.querySelector(":scope > .ped-page-icon");
      if (!icon || !file) {
        el?.remove();
        continue;
      }
      if (!el) {
        el = createDiv({ cls: "ped-page-icon" });
        parent.insertBefore(el, titleEl);
      }
      el.setText(icon);
      el.onclick = (e) => this.openIconMenu(e, file);
    }
  }
  /** The stamp's text for the chosen format. Clicking it adds the exact date
   *  to whatever the setting says, so a glanceable "3 minutes ago" can be
   *  pinned down without changing the setting. */
  editedText(when, expanded) {
    const label = this.settings.showEdited === "bare" ? "" : "Edited ";
    const mode = expanded ? "both" : this.settings.editedFormat;
    const rel = relativeEdited(when, Date.now());
    const abs = absoluteEdited(when);
    if (mode === "exact") return label + abs;
    if (mode === "both") return `${label}${rel} \xB7 ${abs}`;
    return label + rel;
  }
  /** 1Password-style "Edited 3 minutes ago": under the note's title, under it
   *  with a rule closing the pair off, at the end of the note, or both. The
   *  title copy sits next to .inline-title so a cover moves it too, and the
   *  bottom copy goes in .cm-sizer, the same place Obsidian puts in-document
   *  backlinks, so it scrolls with the note and CodeMirror keeps ownership of
   *  the content itself. */
  applyEditedStamp(view) {
    const file = view.file;
    const when = file ? editedAt(this.app.metadataCache.getFileCache(file)?.frontmatter, file.stat?.mtime ?? 0) : 0;
    const on = this.settings.showEdited !== "off" && !!file && !!when;
    const pos = this.settings.editedPosition;
    const wantTitle = on && (pos === "title" || pos === "rule" || pos === "both");
    const wantBottom = on && (pos === "bottom" || pos === "both");
    const expanded = !!file && this.editedExpanded.has(file.path);
    const text = on ? this.editedText(when, expanded) : "";
    const exact = on ? absoluteEdited(when) : "";
    const opensOnHeading = (file ? this.app.metadataCache.getFileCache(file)?.sections : void 0)?.find((s) => s.type !== "yaml")?.type === "heading";
    const place = (host, where, anchor, wanted) => {
      let el = host.querySelector(`:scope > .ped-edited.is-${where}`);
      if (!wanted) {
        el?.remove();
        if (anchor instanceof HTMLElement) anchor.removeClass("ped-title-ruled");
        return;
      }
      if (!el) {
        el = createDiv({ cls: `ped-edited is-${where}` });
        if (anchor) anchor.insertAdjacentElement("afterend", el);
        else host.appendChild(el);
        el.onclick = () => {
          if (!file) return;
          if (this.editedExpanded.has(file.path)) this.editedExpanded.delete(file.path);
          else this.editedExpanded.add(file.path);
          this.refreshEditedStamps();
        };
      } else if (!anchor && el !== host.lastElementChild) {
        host.appendChild(el);
      }
      const ruled = where === "title" && pos === "rule";
      el.toggleClass("is-rule", ruled);
      el.toggleClass("is-tight", where === "title" && opensOnHeading);
      if (anchor instanceof HTMLElement) anchor.toggleClass("ped-title-ruled", ruled);
      el.setText(text);
      el.setAttribute("aria-label", exact);
      el.setAttribute("title", exact);
    };
    for (const titleEl of Array.from(view.containerEl.querySelectorAll(".inline-title"))) {
      if (titleEl.parentElement) place(titleEl.parentElement, "title", titleEl, wantTitle);
    }
    for (const sizer of Array.from(view.containerEl.querySelectorAll(".cm-sizer, .markdown-preview-sizer"))) {
      place(sizer, "bottom", null, wantBottom);
    }
  }
  /** Re-time the stamps without touching covers, icons, or layout, the
   *  minute tick should not churn the rest of the page chrome. */
  refreshEditedStamps() {
    if (this.settings.showEdited === "off") return;
    for (const view of this.markdownViews()) this.applyEditedStamp(view);
  }
  openIconMenu(evt, file) {
    const menu = new import_obsidian2.Menu();
    menu.addItem(
      (i) => i.setTitle("Change icon\u2026").setIcon("smile").onClick(() => {
        const anchor = (evt?.target instanceof HTMLElement ? evt.target : null) ?? this.app.workspace.getActiveViewOfType(import_obsidian2.MarkdownView)?.containerEl.querySelector(".view-header-title-container") ?? document.body;
        this.pickEmoji(anchor, (ch) => {
          void this.app.fileManager.processFrontMatter(file, (fm) => {
            fm["icon"] = ch;
          });
        });
      })
    );
    if (parseIcon(this.app.metadataCache.getFileCache(file)?.frontmatter))
      menu.addItem(
        (i) => i.setTitle("Remove icon").setIcon("x").onClick(
          () => void this.app.fileManager.processFrontMatter(file, (fm) => {
            delete fm["icon"];
          })
        )
      );
    if (evt) menu.showAtMouseEvent(evt);
    else menu.showAtPosition({ x: window.innerWidth / 2 - 100, y: 140 });
  }
  applyCover(view) {
    const file = view.file;
    const spec = file ? parseCover(this.app.metadataCache.getFileCache(file)?.frontmatter) : null;
    const hosts = [
      view.containerEl.querySelector(".markdown-source-view .cm-sizer"),
      view.containerEl.querySelector(".markdown-preview-view .markdown-preview-sizer")
    ];
    for (const h of hosts) {
      if (!(h instanceof HTMLElement)) continue;
      let el = h.querySelector(":scope > .ped-cover");
      if (!spec || !file) {
        el?.remove();
        h.removeClass("ped-has-cover");
        continue;
      }
      h.addClass("ped-has-cover");
      h.removeClass("ped-h-short", "ped-h-tall");
      if (spec.height === "short") h.addClass("ped-h-short");
      else if (spec.height === "tall") h.addClass("ped-h-tall");
      if (!el) {
        el = createDiv({ cls: "ped-cover" });
        h.insertBefore(el, h.firstChild);
      }
      el.empty();
      el.removeClass("ped-cover-has-img");
      el.style.removeProperty("background-image");
      el.style.removeProperty("background-color");
      if (spec.kind === "gradient") {
        el.style.backgroundImage = gradientCss(spec.value) ?? "";
      } else if (spec.kind === "solid") {
        el.style.backgroundColor = spec.value;
      } else {
        const src = spec.kind === "url" ? spec.value : this.resolveCoverSrc(spec.value, file);
        if (src) {
          const img = el.createEl("img", { cls: "ped-cover-img", attr: { src, draggable: "false" } });
          img.style.objectPosition = `50% ${spec.y}%`;
          el.addClass("ped-cover-has-img");
        }
      }
      const bar = el.createDiv({ cls: "ped-cover-bar" });
      const btn = (label, fn) => {
        const b = bar.createEl("button", { cls: "ped-cover-btn", text: label });
        b.addEventListener("click", (e) => {
          e.preventDefault();
          fn(e);
        });
      };
      btn("Change cover", (e) => this.openCoverMenu(e));
      if (spec.kind !== "gradient") btn("Reposition", () => this.armCoverReposition(el, file, spec.value));
      btn("Remove", () => void this.writeCover(file, null));
    }
  }
  resolveCoverSrc(path2, from) {
    const f = this.app.metadataCache.getFirstLinkpathDest(path2, from.path);
    return f ? this.app.vault.getResourcePath(f) : "";
  }
  async writeCover(file, value, y) {
    await this.app.fileManager.processFrontMatter(file, (fm) => {
      if (value == null) {
        delete fm["cover"];
        delete fm["cover-y"];
        delete fm["cover-h"];
      } else {
        fm["cover"] = value;
        if (y != null) fm["cover-y"] = y;
      }
    });
  }
  async writeCoverHeight(file, height) {
    await this.app.fileManager.processFrontMatter(file, (fm) => {
      if (height === "standard") delete fm["cover-h"];
      else fm["cover-h"] = height;
    });
  }
  /** Upload an image from the computer and make it the cover. */
  uploadCover(file) {
    const input = createEl("input", { type: "file" });
    input.accept = "image/*";
    input.addEventListener("change", () => {
      const f = input.files?.[0];
      if (!f) return;
      void (async () => {
        const dest = await this.app.fileManager.getAvailablePathForAttachment(f.name || `Cover ${Date.now()}.jpg`, file.path);
        const img = await this.app.vault.createBinary(dest, await f.arrayBuffer());
        await this.writeCover(file, `[[${img.path}]]`);
      })();
    });
    input.click();
  }
  /** The visual cover picker: gradient and solid swatches, your own images,
   *  and a height control, all applied live behind the modal. */
  openCoverMenu(_evt) {
    const file = this.app.workspace.getActiveViewOfType(import_obsidian2.MarkdownView)?.file;
    if (!file) return;
    new CoverModal(this, file).open();
  }
  /** One drag session: vertical drag slides the image, release saves. */
  armCoverReposition(el, file, coverValue) {
    const img = el.querySelector(".ped-cover-img");
    if (!img) return;
    new Notice("Drag the cover up or down; release to save.");
    el.addClass("is-repositioning");
    const startPct = Number((img.style.objectPosition.match(/(\d+(?:\.\d+)?)%$/) ?? [])[1] ?? 50);
    let pct = startPct;
    const onDown = (de) => {
      de.preventDefault();
      const y0 = de.clientY;
      const onMove = (me) => {
        pct = Math.max(0, Math.min(100, startPct - (me.clientY - y0) / Math.max(1, el.clientHeight) * 100));
        img.style.objectPosition = `50% ${pct}%`;
      };
      const onUp = () => {
        document.removeEventListener("pointermove", onMove);
        document.removeEventListener("pointerup", onUp);
        el.removeClass("is-repositioning");
        el.removeEventListener("pointerdown", onDown);
        void this.writeCover(file, coverValue, Math.round(pct));
      };
      document.addEventListener("pointermove", onMove);
      document.addEventListener("pointerup", onUp);
    };
    el.addEventListener("pointerdown", onDown);
  }
  /** Insert a %%💬 …%% marker right after the selection (or cursor). */
  addComment(ed) {
    const to = ed.getCursor("to");
    new TextPromptModal(this.app, "Comment", "", (raw) => {
      const text = raw.trim();
      if (!text) return;
      const before = to.ch > 0 ? ed.getRange({ line: to.line, ch: to.ch - 1 }, to) : "";
      const sep = before && !/\s/.test(before) ? " " : "";
      ed.replaceRange(sep + makeComment(text, todayStr()), to, to);
    }).open();
  }
  /** The chip popover: read, edit, or resolve. The marker is re-located at
   *  action time, so edits elsewhere in the doc can't misfire it. */
  openCommentPopover(cm, anchor) {
    document.body.querySelector(".ped-comment-pop")?.remove();
    let pos;
    try {
      pos = cm.posAtDOM(anchor);
    } catch {
      return;
    }
    const locate = () => {
      const line = cm.state.doc.lineAt(Math.min(pos, cm.state.doc.length));
      const re = /%%💬\s*(.*?)%%/g;
      let m;
      while (m = re.exec(line.text)) {
        const from = line.from + m.index;
        const to = from + m[0].length;
        if (pos >= from && pos <= to) return { from, to, raw: m[0], inner: m[1] };
      }
      return null;
    };
    const hit = locate();
    if (!hit) return;
    const { text, stamp } = commentParts(hit.inner);
    const pop = document.body.createDiv({ cls: "ped-comment-pop" });
    const rect = anchor.getBoundingClientRect();
    pop.style.left = Math.max(8, Math.min(rect.left, window.innerWidth - 300)) + "px";
    pop.style.top = rect.bottom + 6 + "px";
    pop.createDiv({ cls: "ped-comment-text", text });
    if (stamp) pop.createDiv({ cls: "ped-comment-stamp", text: stamp });
    const btns = pop.createDiv({ cls: "ped-comment-btns" });
    const onDoc = (e) => {
      if (!(e.target instanceof Node) || !pop.contains(e.target)) close();
    };
    const close = () => {
      pop.remove();
      document.removeEventListener("mousedown", onDoc, true);
    };
    document.addEventListener("mousedown", onDoc, true);
    btns.createEl("button", { text: "Edit" }).addEventListener("click", () => {
      close();
      new TextPromptModal(this.app, "Edit comment", text, (raw) => {
        const v = raw.trim();
        const cur = locate();
        if (!cur) return;
        cm.dispatch({
          changes: { from: cur.from, to: cur.to, insert: v ? replaceCommentText(cur.raw, v, todayStr()) : "" }
        });
      }).open();
    });
    btns.createEl("button", { text: "Resolve", cls: "mod-cta" }).addEventListener("click", () => {
      const cur = locate();
      close();
      if (!cur) return;
      const from = cur.from > 0 && cm.state.doc.sliceString(cur.from - 1, cur.from) === " " ? cur.from - 1 : cur.from;
      cm.dispatch({ changes: { from, to: cur.to, insert: "" } });
    });
    if (this.aiKey()) {
      btns.createEl("button", { text: "Resolve with AI" }).addEventListener("click", () => {
        const cur = locate();
        close();
        if (cur) void this.aiResolveComment(cm, cur, text);
      });
    }
  }
  /** The comment is the instruction: send the surrounding block plus the
   *  comment to Claude, replace the block with the revision (marker gone).
   *  A native editor edit, so Ctrl+Z reverses it. */
  async aiResolveComment(cm, cur, instruction) {
    const key = this.aiKey();
    if (!key) return;
    const doc = cm.state.doc;
    const lineNo = doc.lineAt(cur.from).number - 1;
    const lines = doc.toString().split("\n");
    const range = blockRangeAt(lines, lineNo) ?? { from: lineNo, to: lineNo };
    const blockFrom = doc.line(range.from + 1).from;
    const blockTo = doc.line(range.to + 1).to;
    const passage = doc.sliceString(blockFrom, blockTo).replace(cur.raw, "").replace(/[ \t]+$/gm, "");
    new Notice("Power Editor: applying the comment\u2026");
    try {
      const anthropic = new Anthropic({ apiKey: key, dangerouslyAllowBrowser: true });
      const msg = await anthropic.messages.create({
        model: this.settings.aiModel,
        max_tokens: 4096,
        system: "You revise Markdown passages according to a reviewer comment. Reply with ONLY the revised passage: no preamble, no quotes, no code fences. Preserve Markdown structure (links, emphasis, lists) unless the comment says otherwise.",
        messages: [{ role: "user", content: `Reviewer comment: "${instruction}"

Passage:
"""
${passage}
"""` }]
      });
      const out = msg.content.filter((b) => b.type === "text").map((b) => b.text).join("\n").trim();
      if (out) cm.dispatch({ changes: { from: blockFrom, to: blockTo, insert: out } });
    } catch (e) {
      new Notice("Power Editor AI failed: " + (e instanceof Error ? e.message : String(e)), 6e3);
    }
  }
  applyVerifyBadge(view) {
    const header = view.containerEl.querySelector(".view-header-title-container");
    if (!(header instanceof HTMLElement)) return;
    let badge = header.querySelector(":scope > .ped-verify");
    const file = view.file;
    const st = file ? verificationState(this.app.metadataCache.getFileCache(file)?.frontmatter, todayStr()) : { state: "none" };
    if (!file || st.state === "none") {
      badge?.remove();
      return;
    }
    if (!badge) badge = header.createSpan({ cls: "ped-verify" });
    badge.className = "ped-verify " + (st.state === "verified" ? "is-verified" : "is-expired");
    badge.setText(st.state === "verified" ? "\u2713 Verified" : "\u2713 Expired");
    badge.setAttr(
      "aria-label",
      st.state === "verified" ? `Verified ${st.since}` + (st.until ? `, until ${st.until}` : "") : `Verification expired ${st.until}`
    );
    badge.onclick = (e) => this.openVerifyMenu(e, file);
  }
  /** Notion's page verification: verify now, verify with expiry, remove. */
  openVerifyMenu(evt, file) {
    const st = verificationState(this.app.metadataCache.getFileCache(file)?.frontmatter, todayStr());
    const menu = new import_obsidian2.Menu();
    const write = (until) => void this.app.fileManager.processFrontMatter(file, (fm) => {
      fm["verified"] = todayStr();
      if (until == null) delete fm["verified-until"];
      else fm["verified-until"] = until;
    });
    menu.addItem((i) => i.setTitle("Verify (no expiry)").setIcon("badge-check").onClick(() => write(null)));
    menu.addItem(
      (i) => i.setTitle("Verify with expiry\u2026").setIcon("calendar-clock").onClick(
        () => new TextPromptModal(this.app, "Verified until, a date or phrase like 'in 6 months'", "in 6 months", (raw) => {
          const d = parseDatePhrase(raw, todayStr());
          if (d) write(d);
          else new Notice("Power Editor: couldn't read that as a date.");
        }).open()
      )
    );
    if (st.state !== "none")
      menu.addItem(
        (i) => i.setTitle("Remove verification").setIcon("badge-x").onClick(
          () => void this.app.fileManager.processFrontMatter(file, (fm) => {
            delete fm["verified"];
            delete fm["verified-until"];
          })
        )
      );
    if (evt) menu.showAtMouseEvent(evt);
    else menu.showAtPosition({ x: window.innerWidth / 2 - 100, y: 140 });
  }
  /** Tear down and re-create every toolbar (settings changes). */
  rebuildToolbars() {
    for (const view of this.markdownViews()) {
      this.bars.get(view)?.handOff?.disconnect();
      view.containerEl.querySelector(":scope > .ped-toolbar")?.remove();
    }
    this.ensureToolbars();
  }
  /** Notion-style toggle: fold the block under the cursor behind its
   *  first line (a collapsed [!toggle] callout, plain markdown, folds
   *  natively everywhere). On a block that is already a folded callout the
   *  same button unwraps it back to plain text, title first. */
  toggleBlock(ed) {
    const lines = ed.getValue().split("\n");
    const from = ed.getCursor("from");
    const to = ed.getCursor("to");
    const hasSelection = from.line !== to.line || from.ch !== to.ch;
    const picked = (hasSelection ? unionBlockRange(lines, from.line, to.line) : blockRangeAt(lines, from.line)) ?? blockRangeAt(lines, from.line) ?? { from: from.line, to: from.line };
    const range = hasSelection ? picked : listStretchRange(lines, picked);
    const isToggle = /^\s*>\s*\[!\w+\]-/.test(lines[range.from]);
    const next = transformBlock(
      lines,
      range,
      isToggle ? "paragraph" : "callout",
      isToggle ? void 0 : { type: "toggle", folded: true }
    );
    this.applyDoc(ed, lines, next, range.from);
    const l = ed.getLine(range.from);
    ed.setCursor({ line: range.from, ch: l.length });
  }
  /** Notion-style toggle list: bullet title, indented children fold under it.
   *  Selection-aware like toggleBlock. */
  toggleListBlock(ed) {
    const lines = ed.getValue().split("\n");
    const from = ed.getCursor("from");
    const to = ed.getCursor("to");
    const hasSelection = from.line !== to.line || from.ch !== to.ch;
    const picked = (hasSelection ? unionBlockRange(lines, from.line, to.line) : blockRangeAt(lines, from.line)) ?? blockRangeAt(lines, from.line) ?? { from: from.line, to: from.line };
    const range = hasSelection ? picked : listStretchRange(lines, picked);
    this.applyDoc(ed, lines, transformBlock(lines, range, "toggleList"), range.from);
    const l = ed.getLine(range.from);
    ed.setCursor({ line: range.from, ch: l.length });
  }
  /** If a collapsed caret has landed before a heading's hidden "# " marker,
   *  move it just past the marker so typing produces "# text", not "text# ".
   *  A no-op everywhere else. Invisible because the hidden marker is zero-width. */
  snapHeadingCaret() {
    if (!this.settings.wysiwygMarks) return;
    const view = this.app.workspace.getActiveViewOfType(import_obsidian2.MarkdownView);
    if (!view || view.getMode() !== "source") return;
    const ed = view.editor;
    const from = ed.getCursor("from");
    const to = ed.getCursor("to");
    if (from.line !== to.line || from.ch !== to.ch) return;
    const snapped = headingCursorSnap(ed.getLine(from.line), from.ch);
    if (snapped != null && snapped !== from.ch) ed.setCursor({ line: from.line, ch: snapped });
  }
  /** Turn the block under the cursor into another kind (slash commands). */
  turnCurrentInto(ed, kind, callout) {
    const lines = ed.getValue().split("\n");
    const line = ed.getCursor().line;
    const BARE = {
      h1: "# ",
      h2: "## ",
      h3: "### ",
      bullet: "- ",
      ordered: "1. ",
      task: "- [ ] ",
      quote: "> "
    };
    if (!lines[line]?.trim() && BARE[kind]) {
      const marker = BARE[kind];
      ed.setLine(line, marker);
      const at = { line, ch: marker.length };
      ed.setCursor(at);
      window.setTimeout(() => ed.setCursor(at), 0);
      return;
    }
    const picked = blockRangeAt(lines, line) ?? { from: line, to: line };
    const range = kind === "toggleList" || kind === "callout" ? listStretchRange(lines, picked) : picked;
    this.applyDoc(ed, lines, transformBlock(lines, range, kind, callout), range.from);
    const l = ed.getLine(range.from);
    ed.setCursor({ line: range.from, ch: l.length });
  }
  /** Every open markdown view that actually exists yet.
   *
   *  Obsidian defers a tab's view until the tab is first shown: leaf.view is
   *  a placeholder that answers to containerEl and to nothing else, so the
   *  cast to MarkdownView every loop here used to satisfy the compiler and
   *  then threw on the first real question asked of it. One restored tab
   *  nobody had clicked was enough to break image resizing for the whole
   *  session. A placeholder is dropped rather than guessed at: nothing this
   *  plugin does to a view means anything before the view is there, and the
   *  work runs again when the tab opens. */
  markdownViews() {
    return this.app.workspace.getLeavesOfType("markdown").flatMap((leaf) => leaf.view instanceof import_obsidian2.MarkdownView ? [leaf.view] : []);
  }
  ensureToolbars() {
    const show = this.settings.showToolbar && (import_obsidian2.Platform.isDesktopApp || this.settings.showOnMobile);
    for (const view of this.markdownViews()) {
      const existing = view.containerEl.querySelector(":scope > .ped-toolbar");
      if (!show) {
        existing?.remove();
        continue;
      }
      if (!existing) this.buildToolbar(view);
      const bar = view.containerEl.querySelector(":scope > .ped-toolbar");
      bar?.toggleClass("ped-hidden", view.getMode() !== "source");
    }
    this.queueStateRefresh();
  }
  /** The toolbar's buttons in the order they should appear. Unknown ids are
   *  dropped and anything the order has not heard of is appended, so a button
   *  added in a later version still shows up instead of silently vanishing
   *  for anyone who has customized the order. */
  orderedButtonIds() {
    const known = new Set(BUTTON_IDS.map(([id]) => id));
    const saved = this.settings.buttonOrder.length ? this.settings.buttonOrder : DEFAULT_BUTTON_ORDER;
    const out = saved.filter((id) => id === "|" || known.has(id));
    for (const [id] of BUTTON_IDS) if (!out.includes(id)) out.push(id);
    return out;
  }
  buildToolbar(view) {
    const content = view.containerEl.querySelector(":scope > .view-content");
    if (!content) return;
    this.bars.get(view)?.handOff?.disconnect();
    const el = createDiv({ cls: "ped-toolbar" });
    view.containerEl.insertBefore(el, content);
    const buttons = /* @__PURE__ */ new Map();
    const hidden = new Set(this.settings.hiddenButtons);
    const btn = (id, icon, tip, fn, opens = "act") => {
      if (hidden.has(id)) return null;
      const b = el.createEl("button", { cls: "ped-btn", attr: { "aria-label": tip } });
      (0, import_obsidian2.setIcon)(b, icon);
      b.addEventListener("pointerdown", (e) => {
        e.preventDefault();
        if (this.blockedInTable(id)) return;
        if (opens === "act") {
          const ed = this.activeEditor();
          if (ed) fn(ed);
        }
      });
      if (opens === "menu") {
        b.addEventListener("click", () => {
          if (this.blockedInTable(id)) return;
          const ed = this.activeEditor();
          if (ed) fn(ed);
        });
      }
      buttons.set(id, b);
      return b;
    };
    let headingLabel = createSpan();
    const make = {
      undo: () => void btn("undo", "undo-2", "Undo", (ed) => ed.undo?.()),
      redo: () => void btn("redo", "redo-2", "Redo", (ed) => ed.redo?.()),
      heading: () => {
        if (hidden.has("heading")) return;
        const heading = el.createEl("button", { cls: "ped-btn ped-heading", attr: { "aria-label": "Paragraph style" } });
        headingLabel = heading.createSpan({ text: "\xB6" });
        heading.addEventListener("pointerdown", (e) => e.preventDefault());
        heading.addEventListener("click", () => {
          const ed = this.activeEditor();
          if (ed) this.openHeadingMenu(ed, heading);
        });
        buttons.set("heading", heading);
      },
      bold: () => void btn("bold", "bold", "Bold", (ed) => this.toggleEmphasis(ed, "bold")),
      italic: () => void btn("italic", "italic", "Italic", (ed) => this.toggleEmphasis(ed, "italic")),
      underline: () => void btn("underline", "underline", "Underline", (ed) => this.toggleWrap(ed, "<u>", "</u>")),
      strike: () => void btn("strike", "strikethrough", "Strikethrough", () => this.cmd("editor:toggle-strikethrough")),
      highlight: () => {
        const hl = btn("highlight", "highlighter", "Highlight color", (ed) => this.openColorPopover(ed, hl ?? el, "hl"), "menu");
      },
      code: () => void btn("code", "code", "Inline code", () => this.cmd("editor:toggle-code")),
      color: () => {
        const color = btn("color", "palette", "Font color", (ed) => this.openColorPopover(ed, color ?? el, "text"), "menu");
      },
      fontsize: () => {
        const fsize = btn("fontsize", "a-large-small", "Font size, subscript & superscript", (ed) => this.showFontSizeMenu(ed, fsize ?? el), "menu");
        if (fsize && !fsize.querySelector("svg")) (0, import_obsidian2.setIcon)(fsize, "type");
      },
      painter: () => {
        const painter = btn(
          "painter",
          "paintbrush",
          "Format painter: click to paint once, click again to keep painting, Esc to stop. Copying unformatted text strips formatting instead.",
          (ed) => this.armPainter(ed),
          "menu"
        );
        painter?.addEventListener("dblclick", () => {
          const ed = this.activeEditor();
          if (ed) this.armPainter(ed, true);
        });
      },
      emoji: () => {
        const emo = btn("emoji", "smile", "Emoji", (ed) => this.showEmojiPicker(ed, emo ?? el), "menu");
      },
      bullet: () => void btn("bullet", "list", "Bulleted list", () => this.cmd("editor:toggle-bullet-list")),
      ordered: () => void btn("ordered", "list-ordered", "Numbered list", () => this.cmd("editor:toggle-numbered-list")),
      task: () => void btn("task", "list-checks", "Checklist", () => this.cmd("editor:toggle-checklist-status")),
      quote: () => void btn("quote", "quote", "Quote", () => this.cmd("editor:toggle-blockquote")),
      callout: () => {
        const callout = btn(
          "callout",
          "lightbulb",
          "Callout: turn this block into a tip, note, warning...",
          (ed) => {
            const r = (callout ?? el).getBoundingClientRect();
            this.pickCalloutAtCursor(ed, { x: r.left, y: r.bottom + 4 });
          },
          "menu"
        );
      },
      toggle: () => void btn(
        "toggle",
        "chevron-right",
        "Toggle block: collapse this block behind its first line (click again to unwrap)",
        (ed) => this.toggleBlock(ed)
      ),
      align: () => {
        const align = btn("align", "align-left", "Text alignment", (ed) => this.openAlignMenu(ed, align ?? el), "menu");
      },
      indent: () => void btn("indent", "indent-increase", "Increase indent", (ed) => this.indent(ed, 1)),
      outdent: () => void btn("outdent", "indent-decrease", "Decrease indent", (ed) => this.indent(ed, -1)),
      link: () => void btn("link", "link", "Insert or edit link", (ed) => this.openLinkDialog(ed), "menu"),
      file: () => void btn("file", "paperclip", "Attach a file: it is saved with this note and linked here", (ed) => this.insertFile(ed), "menu"),
      codeblock: () => {
        const cbBtn = btn("codeblock", "code-square", "Code block (pick a language)", (ed) => this.insertCodeBlock(ed, rectBelow(cbBtn ?? el)), "menu");
      },
      table: () => {
        const tbl = btn("table", "table", "Insert table", (ed) => this.openTableGrid(ed, tbl ?? el), "menu");
      },
      hr: () => void btn("hr", "minus", "Horizontal rule", () => this.cmd("editor:insert-horizontal-rule")),
      findreplace: () => void btn("findreplace", "text-search", "Find & replace in this note", () => this.cmd("editor:open-search-replace")),
      dictate: () => {
        const mic = btn(
          "dictate",
          "mic",
          "Dictate: click, talk, click again to stop (right-click: raw / tidy / bullets)",
          (ed) => void this.toggleDictation(ed)
        );
        mic?.addEventListener("contextmenu", (e) => {
          e.preventDefault();
          this.showDictationModes(mic);
        });
      },
      ai: () => void btn("ai", "sparkles", "AI edit the selection", (ed) => this.showAiMenu(ed, buttons.get("ai") ?? el), "menu"),
      clear: () => void btn("clear", "remove-formatting", "Clear formatting", (ed) => this.clearFormatting(ed))
    };
    let pendingSep = false;
    let anyYet = false;
    for (const id of this.orderedButtonIds()) {
      if (id === "|") {
        pendingSep = anyYet;
        continue;
      }
      const before = el.childElementCount;
      make[id]?.();
      if (el.childElementCount === before) continue;
      if (pendingSep) {
        el.insertBefore(createDiv({ cls: "ped-sep" }), el.lastElementChild);
        pendingSep = false;
      }
      anyYet = true;
    }
    const handOff = new MutationObserver(() => this.syncHandOff(view));
    handOff.observe(view.containerEl, { childList: true });
    this.bars.set(view, { el, buttons, headingLabel, handOff });
    this.syncHandOff(view);
  }
  /* ---------------- actions ---------------- */
  activeEditor() {
    const info = this.app.workspace.activeEditor;
    if (info && isPaneOwner(info) && info.editor) return info.editor;
    const view = this.app.workspace.getActiveViewOfType(import_obsidian2.MarkdownView);
    return view && view.getMode() === "source" ? view.editor : null;
  }
  cmd(id) {
    this.app.commands?.executeCommandById?.(id);
  }
  applyHeading(ed, level) {
    if (this.inTableCell()) {
      new Notice("Power Editor: a table cell cannot be a heading.", 4e3);
      return;
    }
    const from = ed.getCursor("from").line;
    const to = ed.getCursor("to").line;
    const changes = [];
    for (let l = from; l <= to; l++) {
      const text = setHeading(ed.getLine(l), level);
      if (text !== ed.getLine(l))
        changes.push({ from: { line: l, ch: 0 }, to: { line: l, ch: ed.getLine(l).length }, text });
    }
    if (changes.length) ed.transaction({ changes });
    this.queueStateRefresh();
  }
  toggleWrap(ed, open, close) {
    const sel = ed.getSelection();
    if (sel.startsWith(open) && sel.endsWith(close)) {
      ed.replaceSelection(sel.slice(open.length, sel.length - close.length));
      return;
    }
    if (sel) {
      ed.replaceSelection(open + sel + close);
      return;
    }
    const cur = ed.getCursor();
    ed.replaceRange(open + close, cur);
    ed.setCursor({ line: cur.line, ch: cur.ch + open.length });
  }
  /** Bold/italic that adapts to context: inside a color or highlight the
   *  emphasis must be HTML (Obsidian won't format ** inside inline HTML off
   *  the active line), everywhere else Obsidian's native ** / * keeps the
   *  Markdown portable. */
  toggleEmphasis(ed, kind) {
    const from = ed.getCursor("from");
    const to = ed.getCursor("to");
    const inWrapper = from.line === to.line && (() => {
      const w = wrapperAt(ed.getLine(from.line), from.ch, to.ch);
      return w.highlighted || w.color != null;
    })();
    if (inWrapper) this.toggleHtmlEmphasis(ed, kind === "bold" ? ["strong", "b"] : ["em", "i"]);
    else this.cmd(kind === "bold" ? "editor:toggle-bold" : "editor:toggle-italics");
  }
  /** Toggle an HTML emphasis wrapper around the selection: if it already sits
   *  inside one of `tags`, strip that tag; otherwise wrap in the first tag. */
  toggleHtmlEmphasis(ed, tags) {
    const from = ed.getCursor("from");
    const to = ed.getCursor("to");
    if (from.line === to.line) {
      const line = ed.getLine(from.line);
      const re = new RegExp(`<(${tags.join("|")})>([\\s\\S]*?)<\\/\\1>`, "gi");
      let m;
      while (m = re.exec(line)) {
        const s = m.index;
        const openLen = m[0].indexOf(">") + 1;
        const innerFrom = s + openLen;
        const innerTo = s + m[0].length - `</${m[1]}>`.length;
        if (innerFrom <= from.ch && innerTo >= to.ch) {
          ed.transaction({ changes: [{ from: { line: from.line, ch: s }, to: { line: from.line, ch: s + m[0].length }, text: m[2] }] });
          ed.setSelection({ line: from.line, ch: from.ch - openLen }, { line: from.line, ch: to.ch - openLen });
          this.queueStateRefresh();
          return;
        }
      }
    }
    const open = `<${tags[0]}>`;
    const close = `</${tags[0]}>`;
    ed.replaceSelection(open + ed.getSelection() + close);
    this.queueStateRefresh();
  }
  /** True when ch sits inside one of the given HTML emphasis tags on the line. */
  inHtmlTag(line, ch, tags) {
    const re = new RegExp(`<(${tags.join("|")})>([\\s\\S]*?)<\\/\\1>`, "gi");
    let m;
    while (m = re.exec(line)) {
      if (m.index < ch && m.index + m[0].length > ch) return true;
    }
    return false;
  }
  /** Pick the language first: a fence with no language gets no syntax
   *  highlighting, which is most of why a bare code block looks flat. */
  insertCodeBlock(ed, at) {
    const menu = new import_obsidian2.Menu();
    for (const [lang, label] of CODE_LANGS) {
      menu.addItem((i) => i.setTitle(label).onClick(() => this.writeCodeBlock(ed, lang)));
    }
    menu.showAtPosition(at ?? this.cursorPoint());
  }
  /** A fence written where the cursor stands leaves its body and its closing
   *  fence at column 0, which ends the list the block was meant for: the block
   *  renders outside the step, misaligned with the step above it, and the
   *  stranded closing fence reads as the START of another block, so everything
   *  typed after it disappears into code with no way out. Inside a list every
   *  line of the block sits at the item's content column instead, the empty
   *  body line included, so the first thing typed lands there too. */
  writeCodeBlock(ed, lang) {
    const from = ed.getCursor("from");
    const line = ed.getLine(from.line);
    const indent = listContentIndent(line);
    const sel = ed.getSelection();
    if (sel) {
      const at = (l) => !l.trim() || l.startsWith(indent) ? l : indent + l;
      ed.replaceSelection("```" + lang + "\n" + sel.split("\n").map(at).join("\n") + "\n" + indent + "```");
      return;
    }
    const head = !line.trim() || indent && !textBesideMarker(line) ? "" : "\n";
    ed.replaceRange(head + (head ? indent : "") + "```" + lang + "\n" + indent + "\n" + indent + "```", { line: from.line, ch: line.length });
    ed.setCursor({ line: from.line + (head ? 2 : 1), ch: indent.length });
  }
  /** Change the language on the fence the cursor is inside, so an existing
   *  block can be highlighted without retyping the fence. */
  setCodeBlockLanguage(ed) {
    const lines = ed.getValue().split("\n");
    const cur = ed.getCursor().line;
    let open = -1;
    for (let i = cur; i >= 0; i--) {
      if (FENCE_LINE.test(lines[i])) {
        open = i;
        break;
      }
    }
    if (open < 0) {
      new Notice("Put the cursor inside a code block first.");
      return;
    }
    this.pickLanguageForFence(ed, open);
  }
  /** Notion's language dropdown: a search box over every language, anchored
   *  on the button. Type to filter, arrows to move, Enter to pick. The
   *  block's own first lines are read for a shebang so the likely answer is
   *  offered first on a fence that has none yet. */
  pickLanguageForFence(ed, line, anchor) {
    this.closeLangPicker();
    const lines = ed.getValue().split("\n");
    const m = FENCE_LINE.exec(lines[line] ?? "");
    if (!m) return;
    const current = parseFenceInfo(m[4]).lang;
    const guess = current ? null : guessLanguage(lines.slice(line + 1, line + 6));
    const pop = createDiv({ cls: "ped-langpop" });
    document.body.appendChild(pop);
    this.langPopover = pop;
    const r = anchor?.getBoundingClientRect();
    pop.style.left = Math.max(8, Math.min((r?.left ?? 200) - 120, window.innerWidth - 268)) + "px";
    pop.style.top = (r ? r.bottom + 6 : 160) + "px";
    const search = pop.createEl("input", {
      cls: "ped-langpop-search",
      attr: { type: "text", placeholder: "Search for a language\u2026", spellcheck: "false" }
    });
    const list = pop.createDiv({ cls: "ped-langpop-list" });
    const close = () => this.closeLangPicker();
    const apply = (lang) => {
      close();
      const fresh = ed.getLine(line);
      const fm = FENCE_LINE.exec(fresh);
      if (!fm) return;
      const keep = parseFenceInfo(fm[4]).file;
      ed.replaceRange(fm[1] + (fm[2] ?? "") + fm[3] + formatFenceInfo(lang, keep), { line, ch: 0 }, { line, ch: fresh.length });
      ed.focus();
    };
    let rows = [];
    let active = 0;
    const setActive = (i) => {
      if (!rows.length) return;
      active = (i + rows.length) % rows.length;
      rows.forEach((el, n) => el.toggleClass("is-active", n === active));
      rows[active].scrollIntoView({ block: "nearest" });
    };
    const render = (q) => {
      const ql = q.trim().toLowerCase();
      let items = CODE_LANGS.filter(([v, label]) => !ql || label.toLowerCase().includes(ql) || v.includes(ql));
      if (guess && !ql) items = [...items].sort((a, b) => a[0] === guess ? -1 : b[0] === guess ? 1 : 0);
      list.empty();
      rows = items.map(([v, label]) => {
        const row = list.createDiv({ cls: "ped-langpop-row" });
        row.createSpan({ text: label + (v === guess && !current ? "  (detected)" : "") });
        if (v === current) row.createSpan({ cls: "ped-langpop-check", text: "\u2713" });
        row.onclick = () => apply(v);
        return row;
      });
      setActive(0);
    };
    search.addEventListener("input", () => render(search.value));
    search.addEventListener("keydown", (e) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActive(active + 1);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActive(active - 1);
      } else if (e.key === "Enter") {
        e.preventDefault();
        rows[active]?.click();
      } else if (e.key === "Escape") {
        e.preventDefault();
        close();
      }
    });
    const onDoc = (e) => {
      if (!pop.contains(e.target) && e.target !== anchor && !anchor?.contains(e.target)) close();
    };
    document.addEventListener("pointerdown", onDoc, true);
    pop.pedCleanup = () => document.removeEventListener("pointerdown", onDoc, true);
    render("");
    window.setTimeout(() => search.focus(), 0);
  }
  /** Name (or rename) the file a code block represents. The name lives in the
   *  fence's own info string, so it travels with the note as plain Markdown
   *  and other renderers simply ignore it. */
  renameCodeBlock(ed, line) {
    const fresh = ed.getLine(line);
    const m = FENCE_LINE.exec(fresh);
    if (!m) return;
    const { lang, file } = parseFenceInfo(m[4]);
    new TextPromptModal(this.app, file ? "Rename this block" : "Name this block", file, (value) => {
      const cur = ed.getLine(line);
      const cm = FENCE_LINE.exec(cur);
      if (!cm) return;
      ed.replaceRange(cm[1] + (cm[2] ?? "") + cm[3] + formatFenceInfo(lang, value.trim()), { line, ch: 0 }, { line, ch: cur.length });
      ed.focus();
    }).open();
  }
  closeLangPicker() {
    const pop = this.langPopover;
    if (!pop) return;
    pop.pedCleanup?.();
    pop.remove();
    this.langPopover = null;
  }
  /** Pick a multi-column layout, then drop its `columns` block at the cursor. */
  insertColumnsMenu(ed) {
    const menu = new import_obsidian2.Menu();
    const opt = (title, icon, layout) => menu.addItem((i) => i.setTitle(title).setIcon(icon).onClick(() => this.insertColumns(ed, layout)));
    opt("Two columns", "columns-2", "two");
    opt("Three columns", "columns-3", "three");
    opt("Sidebar, then content", "panel-left", "sidebar-left");
    opt("Content, then sidebar", "panel-right", "sidebar-right");
    menu.showAtPosition({ x: window.innerWidth / 2 - 120, y: 160 });
  }
  insertColumns(ed, layout) {
    const cur = ed.getCursor();
    const written = this.insertBlockAt(ed, columnsSnippet(layout) + "\n", cur);
    const fence = Math.max(0, written.findIndex((l) => l.trim()));
    ed.setCursor({ line: cur.line + fence + 1, ch: leadOf(written[fence + 1]) });
  }
  /** Word-style insert-table grid: sweep to the size you want, click. */
  openTableGrid(ed, anchor) {
    if (this.colorPop) {
      this.closeColorPopover();
      return;
    }
    const pop = document.body.createDiv({ cls: "ped-colorpop ped-tablepop" });
    this.colorPop = pop;
    const title = pop.createDiv({ cls: "ped-colorpop-title", text: "Insert table" });
    const grid = pop.createDiv({ cls: "ped-tablegrid" });
    const COLS = 8;
    const ROWS = 6;
    const cells = [];
    const paint = (c, r2) => {
      cells.forEach((cell, i) => cell.toggleClass("is-on", i % COLS < c && Math.floor(i / COLS) < r2));
      title.setText(c && r2 ? `Insert table: ${c} \xD7 ${r2}` : "Insert table");
    };
    for (let r2 = 1; r2 <= ROWS; r2++) {
      for (let c = 1; c <= COLS; c++) {
        const cell = grid.createDiv({ cls: "ped-tablecell" });
        cells.push(cell);
        cell.addEventListener("pointerenter", () => paint(c, r2));
        cell.addEventListener("pointerdown", (e) => {
          e.preventDefault();
          e.stopPropagation();
          this.closeColorPopover();
          this.insertTableAt(ed, c, r2);
        });
      }
    }
    const r = anchor.getBoundingClientRect();
    pop.style.left = Math.min(r.left, window.innerWidth - 220) + "px";
    pop.style.top = r.bottom + 6 + "px";
  }
  /** Write a block where the cursor is, the way a pasted one lands: on a line
   *  of its own, and at the content column of the list step it was written in.
   *  Put in where the cursor stands, its second line stays at column 0, which
   *  ends the list and leaves the block outside the step. A table takes the
   *  rest of the note with it when that happens, since what follows an opened
   *  table reads as more of the table. Returns the lines as written, so the
   *  caller can put the caret inside them. */
  insertBlockAt(ed, md, pos) {
    const line = ed.getLine(pos.line);
    const text = planPastedMarkdown(md, line.slice(0, pos.ch), line.slice(pos.ch));
    ed.replaceRange(text, pos);
    return text.split("\n");
  }
  insertTableAt(ed, cols, rows) {
    const cur = ed.getCursor();
    const pos = { line: cur.line, ch: ed.getLine(cur.line).length };
    const written = this.insertBlockAt(ed, tableSnippet(cols, rows), pos);
    const first = Math.max(0, written.findIndex((l) => /^[ \t]*\|/.test(l)));
    ed.setCursor({ line: pos.line + first, ch: leadOf(written[first]) + 2 });
  }
  clearFormatting(ed) {
    if (ed.getSelection()) {
      const { from: from2, to: to2 } = this.expandStyleSelection(ed);
      const sel = ed.getRange(from2, to2);
      if (sel && stripFormatting(sel) !== sel) {
        ed.replaceRange(stripFormatting(sel), from2, to2);
        return;
      }
    }
    const from = ed.getCursor("from").line;
    const to = ed.getCursor("to").line;
    const changes = [];
    for (let l = from; l <= to; l++) {
      const line = ed.getLine(l);
      const out = clearAllFormatting(line);
      if (out !== line) changes.push({ from: { line: l, ch: 0 }, to: { line: l, ch: line.length }, text: out });
    }
    if (changes.length) ed.transaction({ changes });
  }
  /**
   * The editor the cursor is really in.
   *
   * Usually the note's own. Inside a table cell in Live Preview it is not:
   * Obsidian edits that cell in a CodeMirror of its own, nested in the table
   * widget, and the note's editor is left holding a cursor pointing into the
   * table's raw markdown. Writing there puts the text somewhere else in the
   * table, or the cell syncs its own unchanged content back over it a moment
   * later, which is what "I clicked Insert and nothing happened" looks like.
   *
   * So reads and writes both go to whichever CodeMirror has focus. Everywhere
   * outside a table that IS the note's editor, and nothing changes.
   */
  /**
   * The CodeMirror that owns the focused element.
   *
   * Inside a table cell in Live Preview that is NOT the note's editor:
   * Obsidian renders each table in a nested CodeMirror of its own (its
   * stylesheet gives `.cm-table-widget` a full `.cm-scroller`/`.cm-content`/
   * `.cm-cursorLayer` tree), so the cell's selection lives there and the
   * note's editor reports none. Anything that asks the note's editor whether
   * text is selected therefore sees nothing while a cell selection is plainly
   * visible, which is what "the bubble doesn't work in tables" was.
   */
  /**
   * The document position the last right-click landed on, when it landed in
   * this note's own editor.
   *
   * A contextmenu handler cannot be relied on to run before the one building
   * Obsidian's link menu, but a press always precedes both, so the press is
   * what gets remembered. A table cell edits in a CodeMirror of its own whose
   * offsets are the cell's rather than the note's, so those are left alone:
   * Power Tables owns the menu inside a table.
   */
  rightPressPos(view) {
    const p = this.rightPress;
    if (!p || p.el.closest(".cm-table-widget") || !view.containerEl.contains(p.el)) return null;
    const cm = view.editor.cm ?? null;
    const off = cm?.posAtCoords({ x: p.x, y: p.y });
    if (cm == null || off == null) return null;
    const l = cm.state.doc.lineAt(off);
    return { line: l.number - 1, ch: off - l.from };
  }
  focusedCm(fallback) {
    const host = document.activeElement?.closest?.(".cm-editor");
    return (host ? import_view.EditorView.findFromDOM(host) : null) ?? fallback;
  }
  /**
   * True when the caret is inside a table cell in Live Preview.
   *
   * Whole-line rewrites must refuse in that case. A cell is edited in its own
   * nested CodeMirror, but the note's Editor still addresses the raw markdown,
   * where the "line" is the entire table row. Prefixing that with "## " does
   * not make a heading of the cell, it rips the row out of the table, which
   * is exactly what applying a heading to a cell used to do.
   */
  inTableCell() {
    return !!document.activeElement?.closest?.(".cm-table-widget");
  }
  /** A line-level button pressed inside a table cell. Refuse it, and say where
   *  the tool for that job actually lives, rather than rewriting the row. */
  blockedInTable(id) {
    if (!TABLE_INERT.has(id) || !this.inTableCell()) return false;
    new Notice("Power Editor: that acts on a whole line, so it cannot work inside a table cell. Use the Power Tables panel.", 4e3);
    return true;
  }
  cursorDoc(ed) {
    const main = ed.cm ?? null;
    const cm = this.focusedCm(main);
    if (!cm) {
      return {
        from: ed.getCursor("from"),
        to: ed.getCursor("to"),
        selection: ed.getSelection(),
        line: (n) => ed.getLine(n),
        replace: (from, to, text) => {
          ed.replaceRange(text, from, to);
          ed.setCursor({ line: from.line, ch: from.ch + text.length });
        }
      };
    }
    const at = (pos) => {
      const l = cm.state.doc.lineAt(pos);
      return { line: l.number - 1, ch: pos - l.from };
    };
    const off = (p) => {
      const n = Math.min(Math.max(p.line + 1, 1), cm.state.doc.lines);
      const l = cm.state.doc.line(n);
      return Math.min(l.from + p.ch, l.to);
    };
    const sel = cm.state.selection.main;
    return {
      from: at(sel.from),
      to: at(sel.to),
      selection: cm.state.sliceDoc(sel.from, sel.to),
      line: (n) => n >= 0 && n < cm.state.doc.lines ? cm.state.doc.line(n + 1).text : "",
      replace: (from, to, text) => {
        const f = off(from);
        cm.dispatch({ changes: { from: f, to: off(to), insert: text }, selection: { anchor: f + text.length } });
        cm.focus();
      }
    };
  }
  /** The Link dialog: prefills from the selection, or edits the link under
   *  the cursor in place. `at` overrides both, for a right-click, which
   *  carries a position of its own and no selection. */
  openLinkDialog(ed, at = null) {
    const view = this.app.workspace.getActiveViewOfType(import_obsidian2.MarkdownView);
    if (!view) return;
    const doc = this.cursorDoc(ed);
    let from = at ?? doc.from;
    let to = at ?? doc.to;
    let text = at ? "" : doc.selection;
    let address = "";
    let noteQuery = "";
    const sameLine = from.line === to.line;
    const found = sameLine ? linkAt(doc.line(from.line), from.ch) : null;
    if (found && (!text || found.start <= from.ch && found.end >= to.ch)) {
      from = { line: from.line, ch: found.start };
      to = { line: from.line, ch: found.end };
      text = found.text;
      if (found.wiki) noteQuery = found.url;
      else address = found.url;
    } else if (text && /^https?:\/\/\S+$/.test(text.trim())) {
      address = text.trim();
      text = "";
    }
    new LinkModal(this, doc, view, from, to, { text, address, noteQuery }).open();
  }
  /** Set text alignment on every selected line via hidden markers. */
  applyAlign(ed, align) {
    if (this.inTableCell()) {
      new Notice("Use Power Tables to align a table cell.", 4e3);
      return;
    }
    const from = ed.getCursor("from").line;
    const to = ed.getCursor("to").line;
    const changes = [];
    for (let l = from; l <= to; l++) {
      const line = ed.getLine(l);
      if (!line.trim()) continue;
      const next = setAlign(line, align);
      if (next !== line) changes.push({ from: { line: l, ch: 0 }, to: { line: l, ch: line.length }, text: next });
    }
    if (changes.length) ed.transaction({ changes });
  }
  /** Indent or outdent the selected lines, native CodeMirror behavior, the
   *  same as Tab / Shift+Tab, so lists nest correctly. */
  indent(ed, dir) {
    const exec = ed.exec;
    if (exec) {
      exec.call(ed, dir === 1 ? "indentMore" : "indentLess");
      return;
    }
    const from = ed.getCursor("from").line;
    const to = ed.getCursor("to").line;
    const changes = [];
    for (let l = from; l <= to; l++) {
      const line = ed.getLine(l);
      if (dir === 1) changes.push({ from: { line: l, ch: 0 }, to: { line: l, ch: 0 }, text: "	" });
      else if (/^(\t| {1,4})/.test(line))
        changes.push({ from: { line: l, ch: 0 }, to: { line: l, ch: line.match(/^(\t| {1,4})/)[1].length }, text: "" });
    }
    if (changes.length) ed.transaction({ changes });
  }
  /** One whole-document edit (a single undo step), then park the cursor.
   *  The viewport stays exactly where it was unless `follow` is set, a
   *  whole-doc change plus recentering is what made pages look like they
   *  jumped after every block move. */
  applyDoc(ed, prevLines, nextLines, cursorLine, follow = false) {
    const scroller = ed.cm?.scrollDOM ?? null;
    const scrollTop = scroller?.scrollTop ?? 0;
    const e = narrowEdit(prevLines, nextLines);
    if (e.from > e.to && e.text.length === 0) return;
    let from = { line: e.from, ch: 0 };
    let to = { line: Math.max(e.from, e.to), ch: 0 };
    let text = e.text.join("\n");
    if (e.text.length === 0) {
      if (e.to + 1 < prevLines.length) {
        from = { line: e.from, ch: 0 };
        to = { line: e.to + 1, ch: 0 };
      } else if (e.from > 0) {
        from = { line: e.from - 1, ch: prevLines[e.from - 1].length };
        to = { line: e.to, ch: prevLines[e.to].length };
      } else {
        to = { line: e.to, ch: prevLines[e.to].length };
      }
    } else if (e.from > e.to) {
      text += "\n";
    } else {
      to = { line: e.to, ch: prevLines[e.to].length };
    }
    ed.transaction({ changes: [{ from, to, text }] });
    const line = Math.min(cursorLine, nextLines.length - 1);
    ed.setCursor({ line, ch: 0 });
    if (follow) {
      ed.scrollIntoView({ from: { line, ch: 0 }, to: { line, ch: 0 } }, true);
    } else if (scroller) {
      scroller.scrollTop = scrollTop;
      window.requestAnimationFrame(() => scroller.scrollTop = scrollTop);
    }
  }
  /** The unit a grip or command operates on: the block under `line`, widened
   *  to the whole selection when it spans blocks, and to the whole section
   *  when grabbing a heading (if that setting is on). */
  rangeFor(ed, lines, line) {
    const sections = this.settings.headingSections;
    const selFrom = ed.getCursor("from").line;
    const selTo = ed.getCursor("to").line;
    if (selTo > selFrom && line >= selFrom && line <= selTo && ed.getSelection().trim()) {
      return unionBlockRange(lines, selFrom, selTo, sections);
    }
    return sections ? sectionRangeAt(lines, line) : blockRangeAt(lines, line);
  }
  /** What a paste should insert, or null to let Obsidian handle it as usual.
   *  Plain text wins when it already holds a Markdown table, since chat apps
   *  put their own Markdown on the clipboard and that original beats any
   *  conversion. Otherwise the HTML is converted, tables included, and it is
   *  kept when it came out as one clean table (that keeps the cell
   *  formatting Word and Outlook carry). When it did not, the plain text
   *  gets its turn: a copied table also rides along as tab-separated rows,
   *  and rebuilding those beats a pile of one-row tables. */
  pastedMarkdown(html, plain) {
    const text = (plain ?? "").replace(/\r\n?/g, "\n");
    if (text.trim() && looksLikeMarkdownTable(text)) return text.trim();
    const md = html ? cleanPastedHtml(html, import_obsidian2.htmlToMarkdown) : null;
    if (md && isOneMarkdownTable(md)) return md;
    return tabbedTextToMarkdown(text) ?? md;
  }
  /** What a paste should write here. Markdown as it stands, unless the cursor
   *  is in a list: a table or a code block dropped in as it stands puts its
   *  second line back at column 0, which ends the list and leaves the block
   *  outside the step it was meant for. Inside a fenced block a paste is code
   *  and is left exactly as it was copied. */
  plannedPaste(ed, md) {
    const from = ed.getCursor("from");
    const to = ed.getCursor("to");
    if (insideFence(ed.getRange({ line: 0, ch: 0 }, from))) return md;
    return planPastedMarkdown(md, ed.getLine(from.line).slice(0, from.ch), ed.getLine(to.line).slice(to.ch));
  }
  /** Insert pasted Markdown, keeping a table or a code block on its own block
   *  and inside the list item it was dropped into. Dropping table rows onto
   *  the end of a paragraph turns them into literal pipe text. */
  insertPasted(ed, md) {
    ed.replaceSelection(this.plannedPaste(ed, md));
  }
  async clipboardHtml() {
    try {
      for (const item of await navigator.clipboard.read()) {
        if (item.types.includes("text/html")) {
          return await (await item.getType("text/html")).text();
        }
      }
    } catch {
    }
    return null;
  }
  /** Rewrite the clipboard's plain text when copying or cutting a formatted
   *  selection out of a Power Editor pane. In Live Preview the selection maps
   *  to the Markdown source, so a highlight copies its <mark> tags; this puts
   *  clean text on the clipboard instead. Only steps in when there is actually
   *  something to strip, so plain selections copy exactly as before. */
  onCopyOut(e, isCut) {
    const mode = this.settings.copyMode;
    if (mode === "off") return;
    const target = e.target;
    if (!target?.closest?.(".markdown-source-view.mod-cm6")) return;
    const view = this.app.workspace.getActiveViewOfType(import_obsidian2.MarkdownView);
    if (!view || view.getMode() !== "source" || !view.containerEl.contains(target)) return;
    const ed = view.editor;
    const sel = ed.getSelection();
    if (!sel) return;
    const cleaned = cleanCopyText(sel, mode);
    if (cleaned === sel) return;
    e.preventDefault();
    e.stopPropagation();
    e.clipboardData?.setData("text/plain", cleaned);
    if (isCut) ed.replaceSelection("");
  }
  /* ---------------- format painter ---------------- */
  /** Painter semantics: click = paint once, double-click = keep painting
   *  until Esc (or clicking the brush again). Detection reads the syntax
   *  tree and enclosing HTML wrappers, a WYSIWYG selection holds only the
   *  inner text, so scanning the selection string finds nothing. */
  armPainter(ed, sticky = false) {
    if (this.painter) {
      if (sticky || !this.painter.sticky) {
        this.painter = { ...this.painter, sticky: true };
        this.paintButtons("locked");
        new Notice("Format painter locked on. Every selection you make takes the look; Esc or the brush stops it.");
        return;
      }
      this.painter = null;
      this.paintButtons("off");
      new Notice("Format painter off.");
      return;
    }
    const sel = ed.getSelection();
    if (!sel) {
      new Notice("Select formatted text first, then click the painter.");
      return;
    }
    const view = this.app.workspace.getActiveViewOfType(import_obsidian2.MarkdownView);
    const tree = view ? this.treeMarks(view) : null;
    const from = ed.getCursor("from");
    const to = ed.getCursor("to");
    const wrap = from.line === to.line ? wrapperAt(ed.getLine(from.line), from.ch, to.ch) : { underline: false, color: null, highlighted: false };
    const text = detectMarks(sel);
    const marks = {
      bold: (tree?.bold ?? false) || text.bold,
      italic: (tree?.italic ?? false) || text.italic,
      strike: (tree?.strike ?? false) || text.strike,
      highlight: (tree?.highlight ?? false) || text.highlight || wrap.highlighted,
      underline: text.underline || wrap.underline,
      color: text.color ?? wrap.color
    };
    const bare = !hasAnyMark(marks);
    this.painter = { marks, sticky };
    this.paintButtons(sticky ? "locked" : "armed");
    new Notice(
      sticky ? "Format painter locked (Esc or click the brush to stop)." : bare ? "Format painter holding no formatting. Select text to strip it; click the brush again to keep going." : "Format painter armed. Select the text to paint; click the brush again to keep painting."
    );
  }
  /** Locked has to look different from armed, not just from off: the whole
   *  point of the cycle is being able to tell whether the next paint is the
   *  last one. */
  paintButtons(mode) {
    const mark = (el) => {
      el?.toggleClass("is-active", mode !== "off");
      el?.toggleClass("ped-painter-locked", mode === "locked");
    };
    for (const view of this.markdownViews()) {
      mark(this.bars.get(view)?.buttons.get("painter"));
    }
    mark(this.bubbleButtons.get("painter"));
  }
  tryPaint() {
    if (!this.painter) return;
    const ed = this.activeEditor();
    const sel = ed?.getSelection();
    if (!ed || !sel) return;
    ed.replaceSelection(applyMarks(sel, this.painter.marks));
    if (!this.painter.sticky) {
      this.painter = null;
      this.paintButtons("off");
    }
  }
  /* ---------------- dictation ---------------- */
  /** An endpoint is usable once it has a key, or when it points at this machine
   *  or the LAN, where a local transcription server usually needs none. */
  usableTranscription(endpoint, key, model) {
    if (!endpoint) return null;
    const local = /localhost|127\.0\.0\.1|192\.168\./.test(endpoint);
    if (!key && !local) return null;
    return { endpoint, key: key ?? "", model: model || "whisper-large-v3" };
  }
  /** Where dictation sends its audio: this plugin's own endpoint when set,
   *  otherwise Power Assistant's, the same one its meeting recorder uses (older
   *  installs used the Power Capture id; both are probed). Own settings come
   *  first so dictation stands on its own, while a vault running both still
   *  needs no second setup. */
  transcriptionConfig() {
    const own = this.usableTranscription(this.settings.transcriptionEndpoint, this.settings.transcriptionKey, this.settings.transcriptionModel);
    if (own) return own;
    const plugs = this.app.plugins?.plugins;
    const s = (plugs?.["powerassistant"] ?? plugs?.["powercapture"])?.settings;
    return this.usableTranscription(s?.transcriptionEndpoint, s?.transcriptionKey, s?.transcriptionModel);
  }
  async toggleDictation(ed) {
    if (this.recorder) {
      this.recorder.stop();
      return;
    }
    const cfg = this.transcriptionConfig();
    if (!cfg) {
      new Notice(
        "Power Editor: dictation needs a transcription endpoint and key. Set them under AI & dictation in settings, or enable Power Assistant and configure transcription there to reuse it.",
        1e4
      );
      return;
    }
    let stream;
    try {
      stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    } catch {
      new Notice("Microphone unavailable or permission denied.");
      return;
    }
    const target = this.app.workspace.getActiveViewOfType(import_obsidian2.MarkdownView)?.editor ?? ed;
    const rec = new MediaRecorder(stream);
    this.recorder = rec;
    this.recChunks = [];
    rec.ondataavailable = (e) => {
      if (e.data.size) this.recChunks.push(e.data);
    };
    rec.onstop = async () => {
      stream.getTracks().forEach((t) => t.stop());
      this.recorder = null;
      this.setRecording(false);
      const blob = new Blob(this.recChunks, { type: (rec.mimeType || "audio/webm").split(";")[0] });
      this.recChunks = [];
      if (blob.size < 1e3) {
        new Notice("Nothing recorded.");
        return;
      }
      new Notice("Power Editor: transcribing\u2026");
      try {
        const text = await this.transcribeBlob(blob, cfg);
        if (!text.trim()) {
          new Notice("The transcription came back empty.");
          return;
        }
        this.insertDictation(target, await this.maybeTidy(text));
      } catch (e) {
        new Notice("Transcription failed: " + (e instanceof Error ? e.message : String(e)));
      }
    };
    rec.start();
    this.setRecording(true);
    new Notice("Power Editor: recording (click the mic again to stop).");
  }
  setRecording(on) {
    for (const view of this.markdownViews()) {
      this.bars.get(view)?.buttons.get("dictate")?.toggleClass("is-recording", on);
    }
  }
  async transcribeBlob(blob, cfg) {
    const mime = blob.type || "audio/webm";
    const ext = mime.includes("ogg") ? "ogg" : mime.includes("mp4") ? "mp4" : "webm";
    const { contentType, body } = buildMultipart(
      { model: cfg.model, response_format: "json" },
      "file",
      `dictation.${ext}`,
      mime,
      await blob.arrayBuffer()
    );
    const res = await (0, import_obsidian2.requestUrl)({
      url: cfg.endpoint.replace(/\/+$/, "") + "/audio/transcriptions",
      method: "POST",
      headers: { ...cfg.key ? { Authorization: `Bearer ${cfg.key}` } : {}, "Content-Type": contentType },
      body,
      throw: true
    });
    return res.json.text ?? "";
  }
  insertDictation(ed, raw) {
    const cur = ed.getCursor();
    const line = ed.getLine(cur.line) ?? "";
    const plan = planDictationInsert(line, raw);
    const at = plan.atEnd ? { line: cur.line, ch: line.length } : cur;
    ed.replaceRange(plan.insert, at);
    const parts2 = plan.insert.split("\n");
    ed.setCursor({
      line: at.line + parts2.length - 1,
      ch: parts2.length === 1 ? at.ch + parts2[0].length : parts2[parts2.length - 1].length
    });
    ed.focus();
  }
  /** Optional post-dictation pass: filler-free prose or a bullet list. Any
   *  failure falls back to the raw transcript, words never get lost. */
  async maybeTidy(text) {
    const mode = this.settings.dictationMode;
    const key = this.aiKey();
    if (mode === "raw" || !key) return text;
    new Notice(mode === "tidy" ? "Power Editor: tidying\u2026" : "Power Editor: making bullets\u2026");
    try {
      const anthropic = new Anthropic({ apiKey: key, dangerouslyAllowBrowser: true });
      const msg = await anthropic.messages.create({
        model: this.settings.aiModel,
        max_tokens: 4096,
        system: mode === "tidy" ? "You clean up dictated speech. Remove filler words, false starts, and repetitions; fix punctuation and sentence breaks. Keep every point, the speaker's own words where possible, and the original language. Reply with ONLY the cleaned text." : "You turn dictated speech into notes. Reply with ONLY a concise Markdown bullet list of the points made, in the original language.",
        messages: [{ role: "user", content: text }]
      });
      const out = msg.content.filter((b) => b.type === "text").map((b) => b.text).join("\n").trim();
      return out || text;
    } catch {
      return text;
    }
  }
  showDictationModes(anchor) {
    const menu = new import_obsidian2.Menu();
    const opt = (label, mode, icon) => menu.addItem(
      (i) => i.setTitle(label).setIcon(icon).setChecked(this.settings.dictationMode === mode).onClick(() => {
        this.settings.dictationMode = mode;
        void this.persistSettings();
      })
    );
    opt("Raw transcript", "raw", "mic");
    opt("Tidy into clean prose", "tidy", "wand-2");
    opt("Turn into bullet points", "bullets", "list");
    const r = anchor.getBoundingClientRect();
    menu.showAtPosition({ x: r.left, y: r.bottom + 4 });
  }
  /* ---------------- AI actions ---------------- */
  aiKey() {
    if (this.settings.anthropicKey) return this.settings.anthropicKey;
    const plugs = this.app.plugins?.plugins;
    const pc = plugs?.["powerassistant"] ?? plugs?.["powercapture"];
    return pc?.settings?.anthropicKey ?? "";
  }
  async aiAction(ed, instruction) {
    const key = this.aiKey();
    if (!key) {
      new Notice("Power Editor: add an Anthropic API key in settings (or enable Power Assistant with one).");
      return;
    }
    const sel = ed.getSelection();
    if (!sel.trim()) {
      new Notice("Select the text to work on first.");
      return;
    }
    new Notice("Power Editor: thinking\u2026");
    try {
      const anthropic = new Anthropic({ apiKey: key, dangerouslyAllowBrowser: true });
      const msg = await anthropic.messages.create({
        model: this.settings.aiModel,
        max_tokens: 4096,
        system: "You edit Markdown text. Reply with ONLY the rewritten text: no preamble, no quotes, no code fences. Preserve Markdown structure (links, emphasis, lists) unless the instruction says otherwise.",
        messages: [{ role: "user", content: `${instruction}

"""
${sel}
"""` }]
      });
      const out = msg.content.filter((b) => b.type === "text").map((b) => b.text).join("\n").trim();
      if (out) ed.replaceSelection(out);
    } catch (e) {
      new Notice("Power Editor AI failed: " + (e instanceof Error ? e.message : String(e)), 6e3);
    }
  }
  /** The paragraph-style menu (Normal text, Heading 1-6), anchored on whatever
   *  button opened it. Shared by the toolbar and the selection bubble so the
   *  two can never drift apart. */
  openHeadingMenu(ed, anchor) {
    const menu = new import_obsidian2.Menu();
    const cur = headingLevel(ed.getLine(ed.getCursor().line));
    const opt = (label, level) => menu.addItem(
      (i) => i.setTitle(label).setChecked(cur === level).onClick(() => this.applyHeading(ed, level))
    );
    opt("Normal text", 0);
    for (let h = 1; h <= 6; h++) opt("Heading " + h, h);
    const r = anchor.getBoundingClientRect();
    menu.showAtPosition({ x: r.left, y: r.bottom + 4 });
  }
  /** The text-alignment menu, likewise shared between the two bars. */
  openAlignMenu(ed, anchor) {
    const menu = new import_obsidian2.Menu();
    const cur = alignOf(ed.getLine(ed.getCursor().line));
    const opt = (label, icon, a) => menu.addItem((i) => i.setTitle(label).setIcon(icon).setChecked(cur === a).onClick(() => this.applyAlign(ed, a)));
    opt("Align left", "align-left", "left");
    opt("Align center", "align-center", "center");
    opt("Align right", "align-right", "right");
    const r = anchor.getBoundingClientRect();
    menu.showAtPosition({ x: r.left, y: r.bottom + 4 });
  }
  /* ---------------- bubble menu ---------------- */
  ensureBubble() {
    if (this.bubbleEl) return this.bubbleEl;
    const el = document.body.createDiv({ cls: "ped-bubble" });
    const btn = (id, icon, tip, fn, opens = "act") => {
      const b = el.createEl("button", { cls: "ped-btn", attr: { "aria-label": tip } });
      (0, import_obsidian2.setIcon)(b, icon);
      b.addEventListener("pointerdown", (e) => {
        e.preventDefault();
        if (this.blockedInTable(id)) return;
        if (opens === "act") {
          const ed = this.activeEditor();
          if (ed) fn(ed);
        }
      });
      if (opens === "menu") {
        b.addEventListener("click", () => {
          if (this.blockedInTable(id)) return;
          const ed = this.activeEditor();
          if (ed) fn(ed);
        });
      }
      this.bubbleButtons.set(id, b);
      return b;
    };
    const sep = () => el.createDiv({ cls: "ped-sep" });
    const bheading = el.createEl("button", { cls: "ped-btn ped-heading", attr: { "aria-label": "Paragraph style" } });
    this.bubbleHeadingLabel = bheading.createSpan({ text: "\xB6" });
    bheading.addEventListener("pointerdown", (e) => e.preventDefault());
    bheading.addEventListener("click", () => {
      const ed = this.activeEditor();
      if (ed) this.openHeadingMenu(ed, bheading);
    });
    sep();
    btn("bold", "bold", "Bold", (ed) => this.toggleEmphasis(ed, "bold"));
    btn("italic", "italic", "Italic", (ed) => this.toggleEmphasis(ed, "italic"));
    btn("underline", "underline", "Underline", (ed) => this.toggleWrap(ed, "<u>", "</u>"));
    const bhl = btn("highlight", "highlighter", "Highlight color", (ed) => this.openColorPopover(ed, bhl, "hl"), "menu");
    const bcolor = btn("color", "palette", "Font color", (ed) => this.openColorPopover(ed, bcolor, "text"), "menu");
    sep();
    btn("bullet", "list", "Bulleted list", () => this.cmd("editor:toggle-bullet-list"));
    btn("ordered", "list-ordered", "Numbered list", () => this.cmd("editor:toggle-numbered-list"));
    btn("task", "list-checks", "Checklist", () => this.cmd("editor:toggle-checklist-status"));
    const balign = btn("align", "align-left", "Text alignment", (ed) => this.openAlignMenu(ed, balign ?? el), "menu");
    sep();
    btn("link", "link", "Insert or edit link", (ed) => this.openLinkDialog(ed), "menu");
    btn("comment", "message-circle", "Add comment", (ed) => this.addComment(ed));
    const bp = btn("painter", "paintbrush", "Format painter: click to paint once, double-click to keep painting", (ed) => this.armPainter(ed), "menu");
    bp.addEventListener("dblclick", () => {
      const ed = this.activeEditor();
      if (ed) this.armPainter(ed, true);
    });
    btn("ai", "sparkles", "AI edit", (ed) => this.showAiMenu(ed, this.bubbleEl), "menu");
    btn("clear", "remove-formatting", "Clear formatting", (ed) => this.clearFormatting(ed));
    this.bubbleEl = el;
    el.hide();
    return el;
  }
  /* ---------------- color palette popover ---------------- */
  closeColorPopover() {
    this.colorPop?.remove();
    this.colorPop = null;
  }
  /** A swatch grid for font color or highlight color. Swatches
   *  act on pointerdown with preventDefault, so the selection never blurs. */
  openColorPopover(ed, anchor, mode) {
    if (this.colorPop) {
      this.closeColorPopover();
      return;
    }
    if (!ed.getSelection()) {
      new Notice("Select some text first.");
      return;
    }
    const pop = document.body.createDiv({ cls: "ped-colorpop" });
    this.colorPop = pop;
    pop.createDiv({ cls: "ped-colorpop-title", text: mode === "text" ? "Font color" : "Highlight color" });
    const grid = pop.createDiv({ cls: "ped-swatches" });
    const swatch = (hex, title, fn, cls = "") => {
      const s = grid.createEl("button", { cls: "ped-swatch " + cls, attr: { "aria-label": title } });
      if (hex) s.style.background = hex;
      s.addEventListener("pointerdown", (e) => {
        e.preventDefault();
        e.stopPropagation();
        fn();
        this.closeColorPopover();
      });
      return s;
    };
    for (const hex of PALETTE) {
      swatch(hex, hex, () => this.applyColor(ed, mode, hex));
    }
    const foot = pop.createDiv({ cls: "ped-colorpop-foot" });
    const footBtn = (label, fn) => {
      const b = foot.createEl("button", { text: label, cls: "ped-colorpop-btn" });
      b.addEventListener("pointerdown", (e) => {
        e.preventDefault();
        e.stopPropagation();
        fn();
        this.closeColorPopover();
      });
    };
    if (mode === "hl") footBtn("Default ==", () => this.cmd("editor:toggle-highlight"));
    const picker = pop.createEl("input", { type: "color", cls: "ped-colorpicker" });
    picker.value = mode === "text" ? "#0b6bcb" : "#fdf3d7";
    picker.addEventListener("change", () => {
      this.applyColor(ed, mode, picker.value);
      this.closeColorPopover();
    });
    const more = foot.createEl("button", { text: "More\u2026", cls: "ped-colorpop-btn" });
    more.addEventListener("pointerdown", (e) => {
      e.preventDefault();
      e.stopPropagation();
      picker.click();
    });
    footBtn("Clear", () => this.applyColor(ed, mode, null));
    const r = anchor.getBoundingClientRect();
    pop.style.left = Math.min(r.left, window.innerWidth - 232) + "px";
    pop.style.top = r.bottom + 6 + "px";
  }
  /** Widen a selection so its endpoints don't sit inside hidden style
   *  markers (==…==, <mark>, color spans) on their lines. */
  expandStyleSelection(ed) {
    const from = ed.getCursor("from");
    const to = ed.getCursor("to");
    if (from.line === to.line) {
      const r = expandStyleRange(ed.getLine(from.line), from.ch, to.ch);
      return { from: { line: from.line, ch: r.from }, to: { line: to.line, ch: r.to } };
    }
    return {
      from: { line: from.line, ch: expandStyleRange(ed.getLine(from.line), from.ch, from.ch).from },
      to: { line: to.line, ch: expandStyleRange(ed.getLine(to.line), to.ch, to.ch).to }
    };
  }
  /** Shared chooser for the highlight cleanup commands: remove, or convert
   *  to one of the background colors. `label` carries the scan counts. */
  showHighlightSweepMenu(label, run) {
    const menu = new import_obsidian2.Menu();
    menu.addItem((i) => i.setTitle(`Remove ${label}`).setIcon("eraser").onClick(() => run(null)));
    menu.addSeparator();
    for (const [name, hex] of BG_COLORS) {
      menu.addItem((i) => i.setTitle(`Convert to ${name.toLowerCase()} background`).setIcon("highlighter").onClick(() => run(hex)));
    }
    menu.showAtPosition({ x: window.innerWidth / 2 - 140, y: 140 });
  }
  /** Clean up ==highlights== in the active note, one undoable edit. */
  cleanNoteHighlights(ed) {
    const lines = ed.getValue().split("\n");
    const probe = sweepHighlights(lines.join("\n"), null);
    if (!probe.count) {
      new Notice("Power Editor: no ==highlights== in this note.");
      return;
    }
    this.showHighlightSweepMenu(`${probe.count} highlight${probe.count === 1 ? "" : "s"} in this note`, (hex) => {
      const res = sweepHighlights(lines.join("\n"), hex);
      this.applyDoc(ed, lines, res.text.split("\n"), ed.getCursor().line);
      new Notice(`${hex ? "Recolored" : "Removed"} ${res.count} highlight${res.count === 1 ? "" : "s"}.`);
    });
  }
  /** Clean up ==highlights== across every markdown file in the vault.
   *  Scans first so the menu states exactly what it will touch. */
  async cleanVaultHighlights() {
    const files = this.app.vault.getMarkdownFiles();
    const hits = [];
    let total = 0;
    for (const f of files) {
      const data = await this.app.vault.cachedRead(f);
      if (!data.includes("==")) continue;
      const n = sweepHighlights(data, null).count;
      if (n > 0) {
        hits.push(f);
        total += n;
      }
    }
    if (!total) {
      new Notice("Power Editor: no ==highlights== found in the vault.");
      return;
    }
    this.showHighlightSweepMenu(`all ${total} highlights across ${hits.length} notes`, (hex) => {
      void (async () => {
        let changed = 0;
        for (const f of hits) {
          await this.app.vault.process(f, (cur) => {
            const res = sweepHighlights(cur, hex);
            if (res.count > 0) changed++;
            return res.text;
          });
        }
        new Notice(`${hex ? "Recolored" : "Removed"} highlights in ${changed} note${changed === 1 ? "" : "s"}.`, 8e3);
      })();
    });
  }
  applyColor(ed, mode, hex) {
    if (!ed.getSelection()) return;
    const { from, to } = this.expandStyleSelection(ed);
    let sel = ed.getRange(from, to);
    if (!sel) return;
    let out;
    if (mode === "text") {
      sel = sel.replace(/<span style="color:[^"]*">([\s\S]*?)<\/span>/gi, "$1");
      out = hex ? `<span style="color:${hex}">${mdEmphasisToHtml(sel)}</span>` : htmlEmphasisToMd(sel);
    } else {
      sel = sel.replace(/<mark[^>]*>([\s\S]*?)<\/mark>/gi, "$1").replace(/==([\s\S]+?)==/g, "$1");
      out = hex ? `<mark style="background:${hex}">${mdEmphasisToHtml(sel)}</mark>` : htmlEmphasisToMd(sel);
    }
    ed.replaceRange(out, from, to);
    const parts2 = out.split("\n");
    const end = parts2.length === 1 ? { line: from.line, ch: from.ch + parts2[0].length } : { line: from.line + parts2.length - 1, ch: parts2[parts2.length - 1].length };
    ed.setSelection(from, end);
  }
  /** Font size and sub/superscript, one menu, spans the engine renders live. */
  showFontSizeMenu(ed, anchor) {
    if (!ed.getSelection()) {
      new Notice("Select some text first.");
      return;
    }
    const menu = new import_obsidian2.Menu();
    for (const [label, em] of FONT_SIZES) {
      menu.addItem((i) => i.setTitle(label).setIcon("case-sensitive").onClick(() => this.applyFontSize(ed, em)));
    }
    menu.addSeparator();
    menu.addItem((i) => i.setTitle("Superscript").setIcon("arrow-up-right").onClick(() => this.applyScript(ed, "sup")));
    menu.addItem((i) => i.setTitle("Subscript").setIcon("arrow-down-right").onClick(() => this.applyScript(ed, "sub")));
    const r = anchor.getBoundingClientRect();
    menu.showAtPosition({ x: r.left, y: r.bottom + 4 });
  }
  applyFontSize(ed, em) {
    const sel = ed.getSelection();
    if (sel) ed.replaceSelection(setFontSize(sel, em));
  }
  applyScript(ed, tag) {
    const sel = ed.getSelection();
    if (sel) ed.replaceSelection(toggleScript(sel, tag));
  }
  showAiMenu(ed, anchor) {
    const menu = new import_obsidian2.Menu();
    for (const [title, instruction] of AI_ACTIONS) {
      menu.addItem((i) => i.setTitle(title).setIcon("sparkles").onClick(() => void this.aiAction(ed, instruction)));
    }
    for (const a of this.settings.aiActions) {
      if (a.name.trim() && a.prompt.trim())
        menu.addItem((i) => i.setTitle(a.name).setIcon("wand-2").onClick(() => void this.aiAction(ed, a.prompt)));
    }
    menu.addSeparator();
    menu.addItem((i) => i.setTitle("Continue writing").setIcon("pen-line").onClick(() => void this.aiGenerate(ed, "continue")));
    menu.addItem((i) => i.setTitle("Summarize page into bullets").setIcon("list").onClick(() => void this.aiGenerate(ed, "summarize")));
    const r = anchor.getBoundingClientRect();
    menu.showAtPosition({ x: r.left, y: r.bottom + 4 });
  }
  /** Selection-free AI: continue from what's above the cursor, or distill the
   *  whole page. Output lands at the cursor as its own block. */
  async aiGenerate(ed, mode) {
    const key = this.aiKey();
    if (!key) {
      new Notice("Power Editor: add an Anthropic API key in settings (or enable Power Assistant with one).");
      return;
    }
    const cur = ed.getCursor();
    const context = mode === "continue" ? ed.getRange({ line: 0, ch: 0 }, cur).slice(-8e3) : ed.getValue().slice(0, 24e3);
    if (!context.trim()) {
      new Notice(mode === "continue" ? "Write a little first so there's something to continue." : "This page is empty.");
      return;
    }
    new Notice("Power Editor: thinking\u2026");
    try {
      const anthropic = new Anthropic({ apiKey: key, dangerouslyAllowBrowser: true });
      const msg = await anthropic.messages.create({
        model: this.settings.aiModel,
        max_tokens: 1024,
        system: mode === "continue" ? "Continue the user's document. Reply with ONLY the continuation in Markdown, a paragraph or two (or matching list items if a list is open), matching the document's tone, language, and formatting. No preamble." : "Summarize the user's document. Reply with ONLY a concise Markdown bullet list of the key points, in the document's language: no heading, no preamble.",
        messages: [{ role: "user", content: context }]
      });
      const out = msg.content.filter((b) => b.type === "text").map((b) => b.text).join("\n").trim();
      if (out) this.insertDictation(ed, out);
    } catch (e) {
      new Notice("Power Editor: AI call failed: " + (e instanceof Error ? e.message : String(e)));
    }
  }
  queueBubbleUpdate() {
    if (this.bubbleTimer) return;
    this.bubbleTimer = window.setTimeout(() => {
      this.bubbleTimer = null;
      this.updateBubble();
    }, 60);
  }
  updateBubble() {
    if (!this.settings.showBubble || this.dragging || !import_obsidian2.Platform.isDesktopApp) {
      this.bubbleEl?.hide();
      return;
    }
    const view = this.app.workspace.getActiveViewOfType(import_obsidian2.MarkdownView);
    if (view?.containerEl.querySelector(":scope > .ptb-tablebar")) {
      this.bubbleEl?.hide();
      return;
    }
    const ed = view?.getMode() === "source" ? view.editor : null;
    const cm = this.focusedCm(view ? this.cmOf(view) : null);
    if (!view || !ed || !cm || !cm.hasFocus) {
      this.bubbleEl?.hide();
      return;
    }
    const main = cm.state.selection.main;
    if (!cm.state.sliceDoc(main.from, main.to).trim()) {
      this.bubbleEl?.hide();
      return;
    }
    let head = cm.coordsAtPos(main.from);
    let tail = cm.coordsAtPos(main.to);
    if (!head || !tail) {
      const sel = cm.dom.ownerDocument.getSelection();
      const rect = sel && sel.rangeCount ? sel.getRangeAt(0).getBoundingClientRect() : null;
      if (rect && (rect.width || rect.height)) {
        head = head ?? { left: rect.left, right: rect.left, top: rect.top, bottom: rect.bottom };
        tail = tail ?? { left: rect.right, right: rect.right, top: rect.top, bottom: rect.bottom };
      }
    }
    if (!head || !tail) {
      this.bubbleEl?.hide();
      return;
    }
    const el = this.ensureBubble();
    el.show();
    const w = el.offsetWidth || 320;
    let x = (head.left + tail.right) / 2 - w / 2;
    x = Math.max(8, Math.min(x, window.innerWidth - w - 8));
    let y = head.top - el.offsetHeight - 8;
    if (y < 48) y = tail.bottom + 8;
    el.style.left = x + "px";
    el.style.top = y + "px";
  }
  /** Searchable emoji popover under the toolbar button; recents float first. */
  showEmojiPicker(ed, anchor) {
    this.pickEmoji(anchor, (ch) => {
      ed.replaceSelection(ch);
      ed.focus();
    });
  }
  /** Click the emoji on a rendered callout title: pick a new one and write it
   *  back, through the editor in Live Preview, through the file in Reading. */
  swapCalloutEmoji(span) {
    this.pickEmoji(span, (ch) => {
      const callout = span.closest(".callout");
      if (!callout) return;
      const src = span.closest(".markdown-source-view");
      if (src) {
        for (const view of this.markdownViews()) {
          if (!view.containerEl.contains(span)) continue;
          const cm = this.cmOf(view);
          if (!cm) return;
          try {
            const ln = cm.state.doc.lineAt(cm.posAtDOM(callout));
            const next = setCalloutEmoji(ln.text, ch);
            if (next != null && next !== ln.text) {
              view.editor.transaction({
                changes: [{ from: { line: ln.number - 1, ch: 0 }, to: { line: ln.number - 1, ch: ln.text.length }, text: next }]
              });
            }
          } catch {
            new Notice("Power Editor: couldn't find that callout's header line.");
          }
          return;
        }
        return;
      }
      const lineNo = Number(callout.getAttribute("data-ped-line") ?? "-1");
      const path2 = callout.getAttribute("data-ped-path") ?? "";
      const file = path2 ? this.app.vault.getAbstractFileByPath(path2) : null;
      if (lineNo < 0 || !(file instanceof import_obsidian2.TFile)) return;
      void this.app.vault.process(file, (data) => {
        const lines = data.split("\n");
        const next = lineNo < lines.length ? setCalloutEmoji(lines[lineNo], ch) : null;
        if (next != null) lines[lineNo] = next;
        return lines.join("\n");
      });
    });
  }
  pickEmoji(anchor, onPick) {
    if (this.emojiPopover) {
      this.closeEmojiPicker();
      return;
    }
    const pop = createDiv({ cls: "ped-emoji" });
    document.body.appendChild(pop);
    this.emojiPopover = pop;
    const r = anchor.getBoundingClientRect();
    pop.style.left = Math.max(8, Math.min(r.left, window.innerWidth - 336)) + "px";
    pop.style.top = r.bottom + 6 + "px";
    const search = pop.createEl("input", { attr: { type: "text", placeholder: "Search emoji\u2026", spellcheck: "false" } });
    const grid = pop.createDiv({ cls: "ped-emoji-grid" });
    const onDoc = (e) => {
      if (!pop.contains(e.target) && e.target !== anchor && !anchor.contains(e.target)) {
        this.closeEmojiPicker();
      }
    };
    document.addEventListener("pointerdown", onDoc, true);
    this.register(() => this.closeEmojiPicker());
    pop.addEventListener("keydown", (e) => {
      if (e.key === "Escape") this.closeEmojiPicker();
    });
    pop.pedCleanup = () => document.removeEventListener("pointerdown", onDoc, true);
    const insert = (ch) => {
      this.settings.recentEmoji = [ch, ...this.settings.recentEmoji.filter((c) => c !== ch)].slice(0, 16);
      void this.persistSettings();
      this.closeEmojiPicker();
      onPick(ch);
    };
    const mk = (ch, name) => {
      const b = grid.createEl("button", { text: ch, attr: { title: name, "aria-label": name } });
      b.addEventListener("pointerdown", (e) => {
        e.preventDefault();
        insert(ch);
      });
    };
    const render = (q) => {
      grid.empty();
      const ql = q.trim().toLowerCase();
      if (!ql && this.settings.recentEmoji.length) {
        for (const ch of this.settings.recentEmoji) mk(ch, "recently used");
      }
      let shown = 0;
      for (const [ch, name] of EMOJI) {
        if (ql && !name.includes(ql)) continue;
        if (!ql && this.settings.recentEmoji.includes(ch)) continue;
        mk(ch, name);
        if (++shown >= 160) break;
      }
    };
    search.addEventListener("input", () => render(search.value));
    render("");
    window.setTimeout(() => search.focus(), 0);
  }
  closeEmojiPicker() {
    const pop = this.emojiPopover;
    if (!pop) return;
    pop.pedCleanup?.();
    pop.remove();
    this.emojiPopover = null;
  }
  /* ---------------- callout picker ---------------- */
  /** Pick a callout flavor, or a collapsible toggle block. Each row carries
   *  its emoji so the menu shows exactly what the callout will wear. */
  showCalloutMenu(pick, at) {
    const menu = new import_obsidian2.Menu();
    for (const f of CALLOUT_FLAVORS) {
      menu.addItem(
        (i) => i.setTitle(`${f.emoji}  ${f.label}`).setIcon(f.icon).onClick(() => pick({ type: f.type, emoji: f.emoji }))
      );
    }
    menu.addSeparator();
    menu.addItem(
      (i) => i.setTitle("Toggle block (collapsible)").setIcon("chevron-right").onClick(() => pick({ type: "toggle", folded: true }))
    );
    menu.showAtPosition(at ?? this.cursorPoint());
  }
  pickCalloutAtCursor(ed, at) {
    this.showCalloutMenu((spec) => this.turnCurrentInto(ed, "callout", spec), at ?? this.cursorPoint());
  }
  /** Turn the block at the cursor into one named flavor, skipping the picker
   *  what the toolbar's flavor rows and the `/tip`-style slash items use. */
  calloutOfType(ed, type) {
    const f = CALLOUT_FLAVORS.find((x) => x.type === type);
    this.turnCurrentInto(ed, "callout", { type, emoji: f?.emoji });
  }
  /* ---------------- converting older notes ---------------- */
  /** Upgrade the "Tip:" lead-ins in the note under the cursor, in place and as
   *  one undo step. Bare (unemphasized) labels only come along when asked,
   *  because ordinary prose opens with a word and a colon too. */
  /** The paste-time tag escaping, run over a note that already has
   *  placeholders sitting in it. Deliberately only the escaping: the rest of
   *  postCleanMarkdown collapses blank runs and strips trailing spaces, which
   *  in an existing note would quietly eat deliberate spacing and Markdown's
   *  two-space line breaks. */
  escapeTagsInNote(ed) {
    const lines = ed.getValue().split("\n");
    const next = escapePlaceholderTags(lines.join("\n")).split("\n");
    const changed = next.filter((l, i) => l !== lines[i]).length;
    if (!changed) {
      new Notice("No placeholder tags to escape in this note.");
      return;
    }
    this.applyDoc(ed, lines, next, next.findIndex((l, i) => l !== lines[i]));
    new Notice(`Escaped placeholder tags on ${changed} line${changed === 1 ? "" : "s"}.`);
  }
  /** Scan every markdown file under `root` ("" is the whole vault) for
   *  placeholders and hand the results to the preview modal. Nothing is
   *  written here, a vault-wide rewrite gets looked at before it happens. */
  openPlaceholderSweep(root = "") {
    const prefix = root ? root.replace(/\/$/, "") + "/" : "";
    const files = this.app.vault.getMarkdownFiles().filter((f) => f.path.startsWith(prefix));
    new PlaceholderSweepModal(this, files, root).open();
  }
  /** Escape one file's placeholders. Returns how many landed. The count is
   *  taken inside `process` from the same text the rewrite sees, so a note
   *  edited between the scan and the run is reported as it actually was. */
  async escapeTagsInFile(file) {
    let found = 0;
    await this.app.vault.process(file, (cur) => {
      found = findPlaceholderTags(cur).length;
      return found ? escapePlaceholderTags(cur) : cur;
    });
    return found;
  }
  convertLeadsInNote(ed, bare) {
    const lines = ed.getValue().split("\n");
    const leads = findCalloutLeads(lines).filter((l) => bare || !l.bare);
    if (!leads.length) {
      new Notice("No Tip/Note/Warning lead-ins found in this note.");
      return;
    }
    this.applyDoc(ed, lines, convertCalloutLeads(lines, leads), leads[0].line);
    new Notice(`Converted ${leads.length} lead-in${leads.length === 1 ? "" : "s"} into callouts.`);
  }
  /** Scan every markdown file under `root` ("" is the whole vault) for lead-ins
   *  and hand the results to the preview modal. Nothing is written here, the
   *  modal is where a vault-wide rewrite gets looked at before it happens. */
  openCalloutConverter(root = "") {
    const prefix = root ? root.replace(/\/$/, "") + "/" : "";
    const files = this.app.vault.getMarkdownFiles().filter((f) => f.path.startsWith(prefix));
    new CalloutConvertModal(this, files, root).open();
  }
  /** Rewrite one file's lead-ins. Returns how many landed. */
  async convertLeadsInFile(file, bare) {
    let converted = 0;
    await this.app.vault.process(file, (data) => {
      const lines = data.split("\n");
      const leads = findCalloutLeads(lines).filter((l) => bare || !l.bare);
      converted = leads.length;
      return leads.length ? convertCalloutLeads(lines, leads).join("\n") : data;
    });
    return converted;
  }
  cursorPoint() {
    const view = this.app.workspace.getActiveViewOfType(import_obsidian2.MarkdownView);
    const cm = view ? this.cmOf(view) : null;
    const c = cm?.coordsAtPos(cm.state.selection.main.head);
    return c ? { x: c.left, y: c.bottom + 6 } : { x: window.innerWidth / 2 - 90, y: window.innerHeight / 3 };
  }
  /* ---------------- block menu ---------------- */
  openBlockMenu(view, range) {
    const ed = view.editor;
    if (this.isTranscriptCallout(null, ed.getValue().split("\n"), range.from)) return;
    const menu = new import_obsidian2.Menu();
    const lines = () => ed.getValue().split("\n");
    const kinds = [
      ["Paragraph", "paragraph", "pilcrow"],
      ["Heading 1", "h1", "heading-1"],
      ["Heading 2", "h2", "heading-2"],
      ["Heading 3", "h3", "heading-3"],
      ["Bulleted list", "bullet", "list"],
      ["Numbered list", "ordered", "list-ordered"],
      ["Checklist", "task", "list-checks"],
      ["Quote", "quote", "quote"],
      ["Callout", "callout", "megaphone"],
      ["Toggle list (Notion-style)", "toggleList", "chevron-down"]
    ];
    menu.addItem((i) => {
      i.setTitle("Turn into").setIcon("replace");
      const sub = i.setSubmenu?.();
      if (sub) {
        for (const [title, kind, icon] of kinds) {
          sub.addItem(
            (s) => s.setTitle(title).setIcon(icon).onClick(() => {
              if (kind === "callout") {
                this.showCalloutMenu((spec) => {
                  const prev2 = lines();
                  this.applyDoc(ed, prev2, transformBlock(prev2, range, "callout", spec), range.from);
                });
                return;
              }
              const prev = lines();
              this.applyDoc(ed, prev, transformBlock(prev, range, kind), range.from);
            })
          );
        }
      } else {
        i.onClick(() => new Notice("Turn into needs Obsidian 1.5+ submenus."));
      }
    });
    const colorBlock = (mode, hex) => {
      const prev = lines();
      const next = prev.map((l, idx) => idx >= range.from && idx <= range.to ? colorBlockLine(l, mode, hex) : l);
      this.applyDoc(ed, prev, next, range.from);
    };
    menu.addItem((i) => {
      i.setTitle("Color").setIcon("palette");
      const sub = i.setSubmenu?.();
      if (sub) {
        sub.addItem(
          (s) => s.setTitle("Default").setIcon("ban").onClick(() => {
            const prev = lines();
            const next = prev.map(
              (l, idx) => idx >= range.from && idx <= range.to ? colorBlockLine(colorBlockLine(l, "text", null), "hl", null) : l
            );
            this.applyDoc(ed, prev, next, range.from);
          })
        );
        for (const [name, hex] of TEXT_COLORS)
          sub.addItem((s) => s.setTitle(name).setIcon("baseline").onClick(() => colorBlock("text", hex)));
        sub.addSeparator();
        for (const [name, hex] of BG_COLORS)
          sub.addItem((s) => s.setTitle(`${name} background`).setIcon("paint-bucket").onClick(() => colorBlock("hl", hex)));
      } else {
        i.onClick(() => new Notice("Color needs Obsidian 1.5+ submenus."));
      }
    });
    menu.addSeparator();
    menu.addItem(
      (i) => i.setTitle("Duplicate").setIcon("copy").onClick(() => {
        const prev = lines();
        const res = duplicateBlock(prev, range);
        this.applyDoc(ed, prev, res.lines, res.newStart);
      })
    );
    menu.addItem(
      (i) => i.setTitle("Copy link to block").setIcon("link").onClick(async () => {
        const prev = lines();
        const id = "b" + Math.random().toString(36).slice(2, 8);
        const res = ensureBlockId(prev, range, id);
        if (res.changed) this.applyDoc(ed, prev, res.lines, range.from);
        const file = view.file;
        const name = file ? file.basename : "";
        await navigator.clipboard.writeText(`[[${name}#^${res.id}]]`);
        new Notice("Block link copied.");
      })
    );
    menu.addSeparator();
    menu.addItem(
      (i) => i.setTitle("Move to top").setIcon("arrow-up-to-line").onClick(() => {
        const prev = lines();
        const starts = blockStarts(prev);
        const res = starts.length ? moveBlock(prev, range, starts[0]) : null;
        if (res) this.applyDoc(ed, prev, res.lines, res.newStart, true);
      })
    );
    menu.addItem(
      (i) => i.setTitle("Move to bottom").setIcon("arrow-down-to-line").onClick(() => {
        const prev = lines();
        const res = moveBlock(prev, range, prev.length);
        if (res) this.applyDoc(ed, prev, res.lines, res.newStart, true);
      })
    );
    menu.addSeparator();
    menu.addItem(
      (i) => i.setTitle("Delete block").setIcon("trash-2").onClick(() => {
        const prev = lines();
        this.applyDoc(ed, prev, deleteBlock(prev, range), Math.max(0, range.from - 1));
      })
    );
    let at = { x: 100, y: 100 };
    const cm = this.cmOf(view);
    try {
      const a = cm ? this.blockAnchor(cm, range.from) : null;
      if (a) at = { x: a.x, y: a.top + a.h + 4 };
    } catch {
    }
    const r = this.handleEl?.getBoundingClientRect();
    if (r && (r.left > 0 || r.top > 0)) at = { x: r.left + 8, y: r.bottom + 4 };
    menu.showAtPosition(at);
  }
  /* ---------------- image resize handles ---------------- */
  /** Free room in px on each side of the readable column in this pane. A
   *  sized image may spend it to grow past the column while staying inside
   *  the pane. 0 when the column already fills the pane (readable line
   *  length off, phones, narrow splits). Content may safely overflow into
   *  the scroller's own padding (scrollbars only appear past the padding
   *  box), so the scroller's clientWidth is the honest ceiling. */
  imageBleed(view) {
    const pad2 = 16;
    const root = view.containerEl;
    const preview = view.getMode() === "preview";
    const scroller = root.querySelector(preview ? ".markdown-preview-view" : ".cm-scroller");
    const column = root.querySelector(preview ? ".markdown-preview-sizer" : ".cm-content");
    if (!scroller || !column) return 0;
    return Math.max(0, Math.floor((scroller.clientWidth - column.clientWidth) / 2) - pad2);
  }
  /** Publish each pane's bleed as --ped-img-bleed for styles.css, which
   *  lets img[width] grow past the readable column but never past the
   *  pane. Unmeasured contexts (hover popovers, PDF export) default to 0
   *  and keep the fit-to-column cap. */
  updateImageBleed() {
    for (const view of this.markdownViews()) {
      view.containerEl.style.setProperty("--ped-img-bleed", this.imageBleed(view) + "px");
      this.stampImageWidths(view.containerEl);
    }
  }
  /**
   * Publish an image's own written width as --ped-img-w, and mark it, so
   * styles.css can center what overflows the column.
   *
   * The stylesheet read the width with attr() in calc, which is Chromium 133+
   * only, so the centering sat behind @supports and did nothing on older
   * engines or on mobile. A custom property works everywhere. The class is
   * what the wider max-width is gated on, in place of that @supports: an image
   * this pass has not reached keeps the base rule's one-side cap and stays
   * left aligned, which is what those engines already did, rather than being
   * allowed to grow into room nothing has centered it in.
   */
  stampImageWidths(root) {
    for (const el of Array.from(root.querySelectorAll("img[width], .image-embed[width]"))) {
      const w = el.getAttribute("width");
      if (!w || !/^\d+$/.test(w)) continue;
      el.style.setProperty("--ped-img-w", w + "px");
      el.dataset.pedSized = "1";
    }
  }
  ensureImgGrips() {
    if (this.imgGrips.length) return this.imgGrips;
    for (const c of IMG_CORNERS) {
      const g = document.body.createDiv({
        cls: `ped-imgrip ped-imgrip-${c.corner}`,
        attr: { "aria-label": "Drag to resize" }
      });
      g.dataset.corner = c.corner;
      g.style.cursor = c.cursor;
      g.addEventListener("pointerdown", (e) => this.beginImageDrag(e, c.dir, c.cursor));
      this.imgGrips.push(g);
    }
    return this.imgGrips;
  }
  trackImageHover(e) {
    if (this.imgDrag) return;
    const t = e.target;
    if (t?.closest(".ped-imgrip")) return;
    const img = t instanceof HTMLImageElement && t.closest(".markdown-source-view") ? t : null;
    if (img) {
      this.imgHover = img;
      this.positionImgGrips(img);
      return;
    }
    if (this.imgHover) {
      const r = this.imgHover.getBoundingClientRect();
      const pad2 = 16;
      const near = e.clientX >= r.left - pad2 && e.clientX <= r.right + pad2 && e.clientY >= r.top - pad2 && e.clientY <= r.bottom + pad2;
      if (!near) this.hideImgGrip();
    }
  }
  positionImgGrips(img) {
    const grips = this.ensureImgGrips();
    const r = img.getBoundingClientRect();
    const xy = {
      nw: [r.left - 7, r.top - 7],
      ne: [r.right - 7, r.top - 7],
      sw: [r.left - 7, r.bottom - 7],
      se: [r.right - 7, r.bottom - 7]
    };
    for (const g of grips) {
      const [x, y] = xy[g.dataset.corner ?? "se"];
      g.style.left = x + "px";
      g.style.top = y + "px";
      g.show();
    }
  }
  hideImgGrip() {
    this.imgHover = null;
    for (const g of this.imgGrips) g.hide();
    this.imgBadge?.hide();
  }
  beginImageDrag(e, dir, cursor) {
    const img = this.imgHover;
    if (!img) return;
    e.preventDefault();
    e.stopPropagation();
    this.updateImageBleed();
    const host = img.closest(".markdown-source-view");
    const win = img.ownerDocument.defaultView ?? window;
    const bleed = host ? parseFloat(win.getComputedStyle(host).getPropertyValue("--ped-img-bleed")) || 0 : 0;
    const col = img.closest(".cm-content")?.clientWidth;
    const max = Math.max(120, col != null ? col + 2 * bleed : 2e3);
    const startW = img.getBoundingClientRect().width;
    this.imgDrag = { img, startW, startX: e.clientX, dir };
    document.body.addClass("ped-imgresizing");
    document.body.style.setProperty("--ped-resize-cursor", cursor);
    if (!this.imgBadge) this.imgBadge = document.body.createDiv({ cls: "ped-imgbadge" });
    const badge = this.imgBadge;
    const move = (ev) => {
      const drag = this.imgDrag;
      if (!drag) return;
      const w = Math.round(Math.min(max, Math.max(40, startW + drag.dir * (ev.clientX - drag.startX))));
      img.style.width = w + "px";
      img.addClass("ped-img-resizing");
      if (col != null) img.style.marginLeft = Math.min(0, Math.max((col - w) / 2, -bleed)) + "px";
      this.positionImgGrips(img);
      const r = img.getBoundingClientRect();
      badge.setText(Math.round(r.width) + " px");
      badge.style.left = r.left + r.width / 2 - badge.offsetWidth / 2 + "px";
      badge.style.top = r.top - 26 + "px";
      badge.show();
    };
    const up = () => {
      document.removeEventListener("pointermove", move);
      document.removeEventListener("pointerup", up);
      document.body.removeClass("ped-imgresizing");
      document.body.style.removeProperty("--ped-resize-cursor");
      badge.hide();
      const w = Math.round(img.getBoundingClientRect().width);
      this.imgDrag = null;
      this.commitImageResize(img, w);
    };
    document.addEventListener("pointermove", move);
    document.addEventListener("pointerup", up);
  }
  /** The doc line holding this rendered image's embed, plus its view. */
  embedLineOf(img) {
    const container = img.closest(".internal-embed");
    const target = container?.getAttribute("src") ?? img.getAttribute("src") ?? "";
    if (!target) return null;
    for (const view of this.markdownViews()) {
      if (!view.containerEl.contains(img)) continue;
      const cm = this.cmOf(view);
      if (!cm) return null;
      try {
        const pos = cm.posAtDOM(container ?? img);
        const ln = cm.state.doc.lineAt(pos);
        return { view, lineNo: ln.number - 1, text: ln.text, target };
      } catch {
        return null;
      }
    }
    return null;
  }
  /** Re-resolve the image's line and rewrite it via `fn` (pure). */
  editImageLine(img, fn) {
    const info = this.embedLineOf(img);
    if (!info) {
      new Notice("Power Editor: couldn't find that image's embed.");
      return;
    }
    const next = fn(info.text, info.target);
    if (next == null) {
      new Notice("Power Editor: couldn't find that image's embed.");
      return;
    }
    if (next !== info.text) {
      info.view.editor.transaction({
        changes: [{ from: { line: info.lineNo, ch: 0 }, to: { line: info.lineNo, ch: info.text.length }, text: next }]
      });
    }
  }
  /** Write the dragged width back into the embed under the image. */
  commitImageResize(img, width) {
    this.editImageLine(img, (text, target) => resizeEmbed(text, target, width));
  }
  closeImageBar() {
    this.imgBar?.remove();
    this.imgBar = null;
  }
  showImageBar(img) {
    this.closeImageBar();
    const info = this.embedLineOf(img);
    if (!info) return;
    const cur = embedInfo(info.text, info.target);
    const bar = document.body.createDiv({ cls: "ped-imgbar" });
    this.imgBar = bar;
    this.register(() => this.closeImageBar());
    const mk = (icon, tip, fn) => {
      const b = bar.createEl("button", { cls: "ped-btn", attr: { "aria-label": tip } });
      (0, import_obsidian2.setIcon)(b, icon);
      b.addEventListener("pointerdown", (e) => {
        e.preventDefault();
        e.stopPropagation();
        fn();
      });
      return b;
    };
    const alignTo = (dir) => {
      const fresh = this.embedLineOf(img);
      if (!fresh) return;
      fresh.view.editor.setCursor({ line: fresh.lineNo, ch: 0 });
      this.applyAlign(fresh.view.editor, dir);
      this.closeImageBar();
    };
    mk("align-left", "Align image left", () => alignTo("left"));
    mk("align-center", "Align image center", () => alignTo("center"));
    mk("align-right", "Align image right", () => alignTo("right"));
    bar.createDiv({ cls: "ped-sep" });
    mk("ruler", "Size (presets or exact width)", () => {
      const menu = new import_obsidian2.Menu();
      const natural = img.naturalWidth || Math.round(img.getBoundingClientRect().width);
      menu.addItem(
        (i) => i.setTitle("Original size").onClick(() => {
          this.editImageLine(img, (t, tg) => editEmbed(t, tg, { width: null }));
          this.closeImageBar();
        })
      );
      for (const pct of [25, 50, 75]) {
        menu.addItem(
          (i) => i.setTitle(`${pct}% (${Math.round(natural * pct / 100)}px)`).onClick(() => {
            this.editImageLine(img, (t, tg) => editEmbed(t, tg, { width: Math.round(natural * pct / 100) }));
            this.closeImageBar();
          })
        );
      }
      menu.addItem(
        (i) => i.setTitle("Custom width\u2026").onClick(() => {
          this.closeImageBar();
          new TextPromptModal(this.app, "Image width (pixels)", String(cur?.width ?? natural), (raw) => {
            const w2 = parseInt(raw, 10);
            if (!Number.isFinite(w2) || w2 <= 0) return;
            this.editImageLine(img, (t, tg) => editEmbed(t, tg, { width: Math.round(w2) }));
          }).open();
        })
      );
      const r2 = bar.getBoundingClientRect();
      menu.showAtPosition({ x: r2.left, y: r2.bottom + 4 });
    });
    mk("captions", "Alt / caption text", () => {
      this.closeImageBar();
      new TextPromptModal(this.app, "Alt / caption text (empty removes it)", cur?.alt ?? "", (raw) => {
        this.editImageLine(img, (t, tg) => editEmbed(t, tg, { alt: raw.trim() ? raw.trim() : null }));
      }).open();
    });
    bar.createDiv({ cls: "ped-sep" });
    mk("image", "Replace with another vault image", () => {
      this.closeImageBar();
      new ImageSuggestModal(this.app, (f) => {
        this.editImageLine(img, (t, tg) => {
          const kind = embedInfo(t, tg)?.kind ?? "wiki";
          const link = this.app.metadataCache.fileToLinktext(f, info.view.file?.path ?? "");
          return editEmbed(t, tg, { file: kind === "md" ? encodeURI(link) : link });
        });
      }).open();
    });
    mk("trash-2", "Remove image", () => {
      const fresh = this.embedLineOf(img);
      this.closeImageBar();
      if (!fresh) return;
      const next = removeEmbed(fresh.text, fresh.target);
      if (next == null) return;
      const ed = fresh.view.editor;
      if (!next.trim()) {
        const lastLine = ed.lineCount() - 1;
        const from = { line: fresh.lineNo, ch: 0 };
        const to = fresh.lineNo < lastLine ? { line: fresh.lineNo + 1, ch: 0 } : { line: fresh.lineNo, ch: fresh.text.length };
        ed.transaction({ changes: [{ from, to, text: "" }] });
      } else {
        ed.transaction({
          changes: [{ from: { line: fresh.lineNo, ch: 0 }, to: { line: fresh.lineNo, ch: fresh.text.length }, text: next }]
        });
      }
    });
    const r = img.getBoundingClientRect();
    const w = 258;
    bar.style.left = Math.max(8, Math.min(r.left + r.width / 2 - w / 2, window.innerWidth - w - 8)) + "px";
    bar.style.top = Math.max(8, r.top > 60 ? r.top - 44 : r.bottom + 8) + "px";
  }
  /* ---------------- active states ---------------- */
  queueStateRefresh() {
    if (this.stateTimer) return;
    this.stateTimer = window.setTimeout(() => {
      this.stateTimer = null;
      this.refreshStates();
    }, 40);
  }
  /** Parity of a symmetric marker before the cursor tells whether we're inside it. */
  inMark(line, ch, marker) {
    let count = 0;
    let at = 0;
    while (true) {
      const i = line.indexOf(marker, at);
      if (i < 0 || i >= ch) break;
      count++;
      at = i + marker.length;
    }
    return count % 2 === 1;
  }
  /**
   * Step aside while a table plugin has its own bar docked in this view.
   *
   * Deliberately not asking whether the cursor is in a table cell: applying an
   * edit re-renders the table widget, which destroys the focused cell and
   * drops focus to the body, so a focus-based answer flips to "no" the instant
   * you press anything and this toolbar reappears underneath theirs. The other
   * plugin already decides when a table is being worked on, and mounting its
   * bar is that decision made visible, so mirror it and nothing else.
   */
  syncHandOff(view) {
    const bar = this.bars.get(view);
    if (!bar || !bar.el.isConnected) return;
    bar.el.toggleClass("is-handed-over", !!view.containerEl.querySelector(":scope > .ptb-tablebar"));
  }
  refreshStates() {
    const view = this.app.workspace.getActiveViewOfType(import_obsidian2.MarkdownView);
    if (!view) return;
    const bar = this.bars.get(view);
    if (!bar || !bar.el.isConnected) return;
    const ed = view.editor;
    const cur = ed.getCursor();
    const line = ed.getLine(cur.line) ?? "";
    const set = (id, on) => {
      bar.buttons.get(id)?.toggleClass("is-active", on);
      this.bubbleButtons.get(id)?.toggleClass("is-active", on);
    };
    const inCell = this.inTableCell();
    for (const id of TABLE_INERT) {
      bar.buttons.get(id)?.toggleClass("is-disabled", inCell);
      this.bubbleButtons.get(id)?.toggleClass("is-disabled", inCell);
    }
    this.syncHandOff(view);
    const marks = this.treeMarks(view) ?? {
      bold: this.inMark(line, cur.ch, "**"),
      italic: false,
      highlight: this.inMark(line, cur.ch, "=="),
      strike: this.inMark(line, cur.ch, "~~"),
      code: this.inMark(line, cur.ch, "`")
    };
    set("bold", marks.bold || this.inHtmlTag(line, cur.ch, ["strong", "b"]));
    set("italic", marks.italic || this.inHtmlTag(line, cur.ch, ["em", "i"]));
    set("highlight", marks.highlight);
    set("strike", marks.strike);
    set("code", marks.code);
    const kind = listKind(line);
    set("bullet", kind === "bullet");
    set("ordered", kind === "ordered");
    set("task", kind === "task");
    set("quote", isQuote(line));
    const h = headingLevel(line);
    const hlabel = h ? "H" + h : "\xB6";
    bar.headingLabel.setText(hlabel);
    this.bubbleHeadingLabel?.setText(hlabel);
  }
  /** Inline-mark detection straight from CodeMirror's syntax tree, exact
   *  where marker-counting can be fooled. Null when no tree is available. */
  treeMarks(view) {
    const cm = this.cmOf(view);
    if (!cm) return null;
    try {
      const pos = cm.state.selection.main.head;
      const tree = (0, import_language.syntaxTree)(cm.state);
      let node = tree.resolveInner(pos, -1);
      const names = [];
      while (node) {
        names.push(node.name.toLowerCase());
        node = node.parent;
      }
      const all = names.join("|");
      if (!all || all === "document") return null;
      return {
        bold: all.includes("strong"),
        italic: /(^|[^a-z])em([^a-z]|$)|italic/.test(all),
        highlight: all.includes("highlight"),
        strike: all.includes("strikethrough"),
        code: all.includes("inline-code") || all.includes("inlinecode")
      };
    } catch {
      return null;
    }
  }
  /* ---------------- block drag handles ---------------- */
  cmOf(view) {
    return view.editor.cm ?? null;
  }
  docLines(cm, ed) {
    if (this.linesCache?.doc === cm.state.doc) return this.linesCache.lines;
    const lines = ed.getValue().split("\n");
    this.linesCache = { doc: cm.state.doc, lines };
    return lines;
  }
  ensureHandle() {
    if (!this.handleEl) {
      this.handleEl = document.body.createDiv({ cls: "ped-handle", attr: { "aria-label": "Drag to move block" } });
      (0, import_obsidian2.setIcon)(this.handleEl, "grip-vertical");
      this.handleEl.addEventListener("pointerdown", (e) => this.startDrag(e));
    }
    return this.handleEl;
  }
  ensureDrop() {
    if (!this.dropEl) this.dropEl = document.body.createDiv({ cls: "ped-dropline" });
    return this.dropEl;
  }
  /** The block-widget element under `node`: the top-level child of .cm-content
   *  that isn't a text line. Live Preview renders tables and .base / note
   *  embeds as block widgets in place of their source lines, and posAtCoords
   *  reads null over a widget's interior, so the grip has to be resolved
   *  through the DOM instead. Null when the pointer is over real text or the
   *  content's own padding. */
  topWidgetAt(content, node) {
    if (!(node instanceof Element) || node === content || !content.contains(node)) return null;
    if (node.closest(".cm-line")) return null;
    let w = node;
    while (w && w.parentElement !== content) w = w.parentElement;
    return w && w.parentElement === content ? w : null;
  }
  /** The rendered box of the block widget standing in for `lineNo`, found by
   *  matching each non-line child of .cm-content back to its source position.
   *  Lets the drop indicator land against a table or embed edge when
   *  coordsAtPos collapses onto the widget's anchor. */
  widgetRectForLine(cm, lineNo) {
    for (const child of Array.from(cm.contentDOM.children)) {
      if (child.classList.contains("cm-line")) continue;
      try {
        if (cm.state.doc.lineAt(cm.posAtDOM(child)).number - 1 === lineNo) return child.getBoundingClientRect();
      } catch {
      }
    }
    return null;
  }
  /** Power Assistant owns the meeting transcript and its own speaker, avatar,
   *  highlight and comment interactions. Recognize it so our block grip and
   *  callout menu leave it alone instead of shadowing that UI. Two shapes exist:
   *  the legacy purpose-built `[!transcript]` callout
   *  (`.callout[data-callout="transcript"]` / `.pa-transcript`, source header
   *  `> [!transcript]`), and the migrated plain speaker lines under a
   *  `## Transcript` heading: each turn stamped `.cm-line.pa-lp-tr` in Live
   *  Preview and matched in source by isTranscriptTurnAt. Detect either by the
   *  rendered marker under the pointer or by the hovered source line. Narrow on
   *  purpose: every other callout, and ordinary prose, keeps its affordances. */
  isTranscriptCallout(target, lines, lineNo) {
    if (target instanceof Element && target.closest('.callout[data-callout="transcript"], .pa-transcript, .cm-line.pa-lp-tr')) return true;
    return isTranscriptCalloutAt(lines, lineNo) || isTranscriptTurnAt(lines, lineNo);
  }
  onPointerMove(e) {
    if (this.dragging) {
      this.dragMove(e);
      return;
    }
    if (!this.settings.blockHandles) return;
    const target = e.target;
    if (target?.closest(".ped-handle")) return;
    if (this.handleEl && this.handleEl.isShown()) {
      const r = this.handleEl.getBoundingClientRect();
      if (e.clientX > r.left - 16 && e.clientX < r.right + 40 && e.clientY > r.top - 14 && e.clientY < r.bottom + 14) {
        return;
      }
    }
    const content = target?.closest?.(".cm-content");
    if (!content) {
      this.hideHandle();
      return;
    }
    const view = this.app.workspace.getActiveViewOfType(import_obsidian2.MarkdownView);
    if (!view || view.getMode() !== "source" || !view.containerEl.contains(content)) {
      this.hideHandle();
      return;
    }
    const cm = this.cmOf(view);
    if (!cm) return;
    const widget = this.topWidgetAt(content, e.target);
    let lineNo;
    let widgetRect = null;
    if (widget) {
      try {
        lineNo = cm.state.doc.lineAt(cm.posAtDOM(widget)).number - 1;
      } catch {
        this.hideHandle();
        return;
      }
      widgetRect = widget.getBoundingClientRect();
    } else {
      const pos = cm.posAtCoords({ x: e.clientX, y: e.clientY });
      if (pos == null) {
        this.hideHandle();
        return;
      }
      lineNo = cm.state.doc.lineAt(pos).number - 1;
    }
    const lines = this.docLines(cm, view.editor);
    const range = this.rangeFor(view.editor, lines, lineNo);
    if (!range) {
      this.hideHandle();
      return;
    }
    if (this.isTranscriptCallout(e.target, lines, lineNo)) {
      this.hideHandle();
      return;
    }
    this.hover = { view, cm, range };
    const a = widgetRect ? { x: widgetRect.left, top: widgetRect.top, h: Math.min(widgetRect.height, 40) } : this.blockAnchor(cm, range.from);
    if (!a) {
      this.hideHandle();
      return;
    }
    const editorRect = cm.dom.getBoundingClientRect();
    const h = this.ensureHandle();
    h.style.left = Math.max(editorRect.left + 2, a.x - 30) + "px";
    h.style.top = a.top + Math.max(0, (a.h - 22) / 2) + "px";
    h.show();
  }
  hideHandle() {
    this.hover = null;
    this.handleEl?.hide();
  }
  /** Screen anchor for a block's first line: x/top of its first VISIBLE glyph
   *  and that glyph's height. Measuring the visible char (after any hidden
   *  "# " marker) instead of line offset 0 is what makes the grip and the
   *  block menu land correctly on headings, whose hash is display:none. */
  blockAnchor(cm, lineIndex) {
    const line = cm.state.doc.line(lineIndex + 1);
    const mk = line.text.match(/^\s*(?:>\s*)?#{1,6}\s+/);
    const visPos = Math.min(line.from + (mk ? mk[0].length : 0), line.to);
    const c = cm.coordsAtPos(visPos);
    if (c) return { x: c.left, top: c.top, h: c.bottom - c.top || 20 };
    const node = cm.domAtPos(line.from).node;
    const lineEl = (node.instanceOf(Element) ? node : node.parentElement)?.closest(".cm-line");
    if (!lineEl) return null;
    const lr = lineEl.getBoundingClientRect();
    return { x: lr.left, top: lr.top, h: lr.height || 20 };
  }
  startDrag(e) {
    if (!this.hover) return;
    e.preventDefault();
    e.target?.setPointerCapture?.(e.pointerId);
    const { view, cm, range } = this.hover;
    const lines = this.docLines(cm, view.editor);
    this.dragging = { view, cm, range, starts: blockStarts(lines), target: null, startX: e.clientX, startY: e.clientY, moved: false };
    document.body.addClass("ped-dragging");
  }
  dragMove(e) {
    const d = this.dragging;
    if (!d) return;
    if (!d.moved && Math.abs(e.clientX - d.startX) < 4 && Math.abs(e.clientY - d.startY) < 4) return;
    d.moved = true;
    const scroller = d.cm.scrollDOM;
    const srect = scroller.getBoundingClientRect();
    if (e.clientY < srect.top + 40) scroller.scrollTop -= 12;
    else if (e.clientY > srect.bottom - 40) scroller.scrollTop += 12;
    let lineNo;
    let hoverRect = null;
    const pos = d.cm.posAtCoords({ x: e.clientX, y: e.clientY });
    if (pos != null) {
      lineNo = d.cm.state.doc.lineAt(pos).number - 1;
    } else {
      const under = document.elementFromPoint(e.clientX, e.clientY);
      const widget = this.topWidgetAt(d.cm.contentDOM, under);
      if (!widget) return;
      try {
        lineNo = d.cm.state.doc.lineAt(d.cm.posAtDOM(widget)).number - 1;
      } catch {
        return;
      }
      hoverRect = widget.getBoundingClientRect();
    }
    const lines = this.docLines(d.cm, d.view.editor);
    const r = blockRangeAt(lines, lineNo);
    let target;
    if (!r) {
      const after = d.starts.find((s) => s > lineNo);
      target = after ?? lines.length;
    } else {
      const topPos = d.cm.state.doc.line(r.from + 1).from;
      const botLine = d.cm.state.doc.line(Math.min(r.to + 1, d.cm.state.doc.lines));
      const top = hoverRect?.top ?? d.cm.coordsAtPos(topPos)?.top ?? e.clientY;
      const bottom = hoverRect?.bottom ?? d.cm.coordsAtPos(botLine.to)?.bottom ?? e.clientY;
      if (e.clientY < (top + bottom) / 2) target = r.from;
      else target = d.starts.find((s) => s > r.to) ?? lines.length;
    }
    d.target = target;
    const drop = this.ensureDrop();
    let y = null;
    if (target >= lines.length) {
      const lastLine = d.cm.state.doc.line(d.cm.state.doc.lines);
      y = d.cm.coordsAtPos(lastLine.to)?.bottom ?? this.widgetRectForLine(d.cm, lines.length - 1)?.bottom ?? null;
    } else {
      y = d.cm.coordsAtPos(d.cm.state.doc.line(target + 1).from)?.top ?? this.widgetRectForLine(d.cm, target)?.top ?? null;
    }
    if (y == null) {
      drop.hide();
      return;
    }
    const editorRect = d.cm.dom.getBoundingClientRect();
    drop.style.left = editorRect.left + 8 + "px";
    drop.style.width = editorRect.width - 24 + "px";
    drop.style.top = y - 1 + "px";
    drop.show();
  }
  /** Complete or cancel the drag; a null event cancels. */
  endDrag(apply) {
    const d = this.dragging;
    this.dragging = null;
    document.body.removeClass("ped-dragging");
    this.dropEl?.hide();
    this.handleEl?.hide();
    this.hover = null;
    if (!d || !apply) return;
    const ed = d.view.editor;
    const lines = this.docLines(d.cm, ed);
    const res = moveBlock(lines, d.range, apply.target);
    if (!res) return;
    this.applyDoc(ed, lines, res.lines, res.newStart);
  }
  /* ---------------- move commands ---------------- */
  moveBlockBy(ed, dir) {
    const lines = ed.getValue().split("\n");
    const range = this.rangeFor(ed, lines, ed.getCursor().line);
    if (!range) return;
    const starts = blockStarts(lines).filter((s) => s <= range.from || s > range.to);
    const idx = starts.findIndex((s) => s === range.from);
    if (idx < 0) return;
    let target;
    if (dir === -1) {
      if (idx === 0) return;
      target = starts[idx - 1];
    } else {
      if (idx === starts.length - 1) return;
      target = idx + 2 <= starts.length - 1 ? starts[idx + 2] : lines.length;
    }
    const res = moveBlock(lines, range, target);
    if (!res) return;
    this.applyDoc(ed, lines, res.lines, res.newStart, true);
  }
};
var LinkModal = class extends import_obsidian2.Modal {
  constructor(plugin, doc, view, replaceFrom, replaceTo, prefill) {
    super(plugin.app);
    this.plugin = plugin;
    this.doc = doc;
    this.view = view;
    this.replaceFrom = replaceFrom;
    this.replaceTo = replaceTo;
    this.picked = null;
    this.noteQuery = "";
    this.text = prefill.text;
    this.address = prefill.address;
    this.noteQuery = prefill.noteQuery;
  }
  onOpen() {
    this.titleEl.setText("Link");
    const c = this.contentEl;
    c.addClass("ped-linkmodal");
    this.floatify();
    let textInput;
    new import_obsidian2.Setting(c).setName("Text to display").addText((t) => {
      textInput = t.inputEl;
      t.setValue(this.text).onChange((v) => this.text = v);
      t.inputEl.addEventListener("keydown", (e) => {
        if (e.key === "Enter") this.insert();
      });
    });
    new import_obsidian2.Setting(c).setName("Address").setDesc("A web URL, or pick a note below instead.").addText((t) => {
      t.setPlaceholder("https://\u2026").setValue(this.address).onChange((v) => {
        this.address = v;
        if (v.trim() && this.picked) this.setPicked(null);
      });
      t.inputEl.addEventListener("keydown", (e) => {
        if (e.key === "Enter") this.insert();
      });
    });
    c.createDiv({ cls: "ped-label", text: "Or link to a note in your vault" });
    const search = c.createEl("input", {
      type: "text",
      cls: "ped-link-search",
      attr: { placeholder: "Search notes by name\u2026" }
    });
    search.value = this.noteQuery;
    this.pickedEl = c.createDiv({ cls: "ped-link-picked" });
    this.resultsEl = c.createDiv({ cls: "ped-link-results" });
    search.addEventListener("input", () => this.populate(search.value));
    this.populate(this.noteQuery);
    this.renderPicked();
    const btns = c.createDiv({ cls: "ped-modal-btns" });
    btns.createEl("button", { text: "Cancel" }).addEventListener("click", () => this.close());
    btns.createEl("button", { text: "Insert", cls: "mod-cta" }).addEventListener("click", () => this.insert());
    window.setTimeout(() => textInput.focus(), 20);
  }
  /** Make the dialog float: the page stays visible behind a barely-dimmed
   *  overlay and the title bar drags the window around. */
  floatify() {
    const bg = this.containerEl.querySelector(".modal-bg");
    if (bg) bg.addClass("ped-float-bg");
    const el = this.modalEl;
    const grip = this.titleEl;
    grip.addClass("ped-drag-grip");
    grip.addEventListener("pointerdown", (e) => {
      if (e.target.closest(".modal-close-button")) return;
      const r = el.getBoundingClientRect();
      const ox = e.clientX - r.left;
      const oy = e.clientY - r.top;
      el.addClass("ped-floating");
      el.style.left = `${r.left}px`;
      el.style.top = `${r.top}px`;
      const move = (ev) => {
        el.style.left = `${Math.max(8, Math.min(window.innerWidth - r.width - 8, ev.clientX - ox))}px`;
        el.style.top = `${Math.max(8, Math.min(window.innerHeight - 48, ev.clientY - oy))}px`;
      };
      const up = () => {
        document.removeEventListener("pointermove", move);
        document.removeEventListener("pointerup", up);
      };
      document.addEventListener("pointermove", move);
      document.addEventListener("pointerup", up);
      e.preventDefault();
    });
  }
  populate(query) {
    this.resultsEl.empty();
    const q = query.trim().toLowerCase();
    let files = this.app.vault.getMarkdownFiles();
    if (q) files = files.filter((f) => f.basename.toLowerCase().includes(q) || f.path.toLowerCase().includes(q));
    files.sort((a, b) => {
      const as = a.basename.toLowerCase().startsWith(q) ? 0 : 1;
      const bs = b.basename.toLowerCase().startsWith(q) ? 0 : 1;
      return as - bs || b.stat.mtime - a.stat.mtime;
    });
    for (const f of files.slice(0, 50)) {
      const row = this.resultsEl.createDiv({ cls: "ped-link-row" + (this.picked === f ? " is-picked" : "") });
      row.createSpan({ cls: "ped-link-name", text: f.basename });
      if (f.parent && f.parent.path !== "/") row.createSpan({ cls: "ped-link-path", text: f.parent.path });
      row.addEventListener("click", () => {
        this.setPicked(f);
        this.populate(query);
      });
    }
    if (!this.resultsEl.childElementCount) this.resultsEl.createDiv({ cls: "ped-link-empty", text: "No notes match." });
  }
  setPicked(f) {
    this.picked = f;
    if (f && !this.text.trim()) this.text = f.basename;
    this.renderPicked();
  }
  renderPicked() {
    this.pickedEl.empty();
    if (!this.picked) return;
    this.pickedEl.createSpan({ text: "Linking to: " });
    this.pickedEl.createSpan({ cls: "ped-link-target", text: this.picked.basename });
    const clear = this.pickedEl.createEl("button", { text: "clear", cls: "ped-colorpop-btn" });
    clear.addEventListener("click", () => {
      this.setPicked(null);
      this.populate("");
    });
  }
  insert() {
    let out;
    const display = this.text.trim();
    if (this.picked) {
      const linktext = this.app.metadataCache.fileToLinktext(this.picked, this.view.file?.path ?? "");
      out = display && display !== linktext ? `[[${linktext}|${display}]]` : `[[${linktext}]]`;
    } else {
      const addr = this.address.trim();
      if (!addr) {
        new Notice("Enter an address or pick a note.");
        return;
      }
      out = `[${display || addr}](${addr})`;
    }
    this.close();
    this.doc.replace(this.replaceFrom, this.replaceTo, out);
  }
  onClose() {
    this.contentEl.empty();
  }
};
var SlashSuggest = class extends import_obsidian2.EditorSuggest {
  constructor(plugin) {
    super(plugin.app);
    this.plugin = plugin;
  }
  onTrigger(cursor, editor) {
    const before = editor.getLine(cursor.line).slice(0, cursor.ch);
    const m = before.match(/(?:^|\s)\/([\w-]*)$/);
    if (!m) return null;
    const start = before.length - m[1].length - 1;
    return { start: { line: cursor.line, ch: start }, end: cursor, query: m[1] };
  }
  items() {
    const kind = (title, icon, k) => ({
      title,
      icon,
      action: (ed, plugin) => plugin.turnCurrentInto(ed, k)
    });
    const snippet = (title, icon, text, cursorUp = 0, ch = 0) => ({
      title,
      icon,
      action: (ed, plugin) => {
        const cur = ed.getCursor();
        const written = plugin.insertBlockAt(ed, text, cur);
        const target = Math.max(0, written.length - 1 - cursorUp);
        ed.setCursor({ line: cur.line + target, ch: (target ? leadOf(written[target]) : cur.ch) + ch });
      }
    });
    const out = [
      kind("Heading 1", "heading-1", "h1"),
      kind("Heading 2", "heading-2", "h2"),
      kind("Heading 3", "heading-3", "h3"),
      kind("Bulleted list", "list", "bullet"),
      kind("Numbered list", "list-ordered", "ordered"),
      kind("Checklist", "list-checks", "task"),
      kind("Quote", "quote", "quote"),
      { title: "Callout", icon: "megaphone", action: (ed, plugin) => plugin.pickCalloutAtCursor(ed) },
      // every flavor also stands on its own, so "/tip" lands a lightbulb
      // callout without a second menu to steer through
      ...CALLOUT_FLAVORS.map(
        (f) => ({
          title: `${f.label} callout`,
          icon: f.icon,
          action: (ed, plugin) => plugin.calloutOfType(ed, f.type)
        })
      ),
      { title: "Toggle block (collapsible)", icon: "chevron-right", action: (ed, plugin) => plugin.toggleBlock(ed) },
      { title: "Toggle list (Notion-style)", icon: "chevron-down", action: (ed, plugin) => plugin.toggleListBlock(ed) },
      { title: "Code block", icon: "code-square", action: (ed, plugin) => plugin.insertCodeBlock(ed) },
      { title: "Code block language", icon: "code-square", action: (ed, plugin) => plugin.setCodeBlockLanguage(ed) },
      { title: "PDF or file attachment", icon: "paperclip", action: (ed, plugin) => plugin.insertFile(ed) },
      snippet("Table", "table", "|     |     |     |\n| --- | --- | --- |\n|     |     |     |", 2, 2),
      snippet("Tabs (Notion-style)", "panels-top-left", "```tabs\n--- Tab 1\n\n--- Tab 2\n\n```", 3, 0),
      { title: "Columns (Notion-style)", icon: "columns-2", action: (ed, plugin) => plugin.insertColumnsMenu(ed) },
      { title: "Add cover (Notion-style)", icon: "image", action: (_ed, plugin) => plugin.openCoverMenu() },
      { title: "Page options (width, font)", icon: "layout", action: (_ed, plugin) => plugin.openPageOptions() },
      { title: "Comment", icon: "message-circle", action: (ed, plugin) => plugin.addComment(ed) },
      snippet("To-do dashboard", "list-checks", "```todo\nnot done\ndue this week\n```", 1, 0),
      snippet("Table of contents", "list-tree", "```toc\n```", 1, 0),
      snippet("Horizontal rule", "minus", "---\n"),
      snippet("Today's date", "calendar", (/* @__PURE__ */ new Date()).toISOString().slice(0, 10))
    ];
    out.push({ title: "Dictate (speech to text)", icon: "mic", action: (ed, plugin) => void plugin.toggleDictation(ed) });
    const family = (title, icon, commandId) => {
      const commands = this.app.commands?.commands;
      if (!commands || !commands[commandId]) return null;
      return {
        title,
        icon,
        action: (ed, plugin) => plugin.app.commands.executeCommandById(commandId)
      };
    };
    const familyEither = (title, icon, ...ids) => {
      for (const id of ids) {
        const it = family(title, icon, id);
        if (it) return it;
      }
      return null;
    };
    for (const it of [
      familyEither("Record a meeting (Power Assistant)", "mic", "powerassistant:toggle-recording", "powercapture:toggle-recording"),
      familyEither("Capture a YouTube video (Power Assistant)", "youtube", "powerassistant:capture-youtube", "powercapture:capture-youtube"),
      familyEither("Ask your vault (Power Assistant)", "sparkles", "powerassistant:ask-vault", "powercapture:ask-vault"),
      family("Insert totals row (Power Tables)", "sigma", "powertables:totals-row"),
      family("Embed a new base (Power Bases)", "database", "powerbases:insert-base-embed"),
      family("Open Recent Pages (Power Explorer)", "history", "powerexplorer:open-recent-pages")
    ]) {
      if (it) out.push(it);
    }
    return out;
  }
  getSuggestions(ctx) {
    const q = ctx.query.toLowerCase();
    return this.items().filter((i) => i.title.toLowerCase().includes(q));
  }
  renderSuggestion(item, el) {
    const row = el.createDiv({ cls: "ped-slash" });
    const ic = row.createSpan({ cls: "ped-slash-icon" });
    (0, import_obsidian2.setIcon)(ic, item.icon);
    row.createSpan({ text: item.title });
  }
  selectSuggestion(item) {
    const ctx = this.context;
    if (!ctx) return;
    ctx.editor.replaceRange("", ctx.start, ctx.end);
    item.action(ctx.editor, this.plugin);
  }
};
var CalloutConvertModal = class extends import_obsidian2.Modal {
  constructor(plugin, files, root) {
    super(plugin.app);
    this.plugin = plugin;
    this.files = files;
    this.root = root;
    this.found = /* @__PURE__ */ new Map();
    this.bare = false;
    this.scanning = true;
    this.canceled = false;
  }
  onOpen() {
    this.titleEl.setText("Convert lead-ins into callouts");
    const where = this.root ? `\u201C${this.root}\u201D` : "your vault";
    this.contentEl.createEl("p", {
      cls: "ped-convert-intro",
      text: `Looks through ${where} for lines that open with a label (\u201CTip:\u201D, \u201C**Note:**\u201D, \u201CWarning:\u201D) and turns each one into a real callout with its icon and color. The label itself goes, because the callout already says it.`
    });
    new import_obsidian2.Setting(this.contentEl).setName("Include labels without bold").setDesc("Also convert plain \u201CNote: \u2026\u201D lines. Less certain: ordinary prose can open with a word and a colon too, so check the list below before converting.").addToggle(
      (t) => t.setValue(this.bare).onChange((v) => {
        this.bare = v;
        this.render();
      })
    );
    this.summaryEl = this.contentEl.createDiv({
      cls: "ped-convert-summary",
      text: `Scanning 0 of ${this.files.length.toLocaleString()} notes\u2026`
    });
    this.listEl = this.contentEl.createDiv({ cls: "ped-convert-list" });
    const btns = this.contentEl.createDiv({ cls: "ped-prompt-btns" });
    btns.createEl("button", { text: "Cancel" }).addEventListener("click", () => this.close());
    this.go = btns.createEl("button", { text: "Convert", cls: "mod-cta" });
    this.go.disabled = true;
    this.go.addEventListener("click", () => void this.run());
    void this.scan();
  }
  /** Read in parallel chunks rather than one file at a time. A big vault is
   *  thousands of notes, and awaiting each read in turn spends the whole scan
   *  waiting on disk latency with nothing else in flight. Progress is reported
   *  every chunk, so a long scan looks like a scan and not a hang. */
  async scan() {
    const CHUNK = 64;
    for (let i = 0; i < this.files.length && !this.canceled; i += CHUNK) {
      const batch = this.files.slice(i, i + CHUNK);
      const reads = await Promise.all(
        batch.map(async (f) => {
          try {
            return [f, findCalloutLeads((await this.app.vault.cachedRead(f)).split("\n"))];
          } catch {
            return [f, []];
          }
        })
      );
      for (const [f, leads] of reads) if (leads.length) this.found.set(f, leads);
      const done = Math.min(i + CHUNK, this.files.length);
      this.summaryEl.setText(`Scanning ${done.toLocaleString()} of ${this.files.length.toLocaleString()} notes\u2026`);
    }
    if (this.canceled) return;
    this.scanning = false;
    this.render();
  }
  /** What the current toggle would actually change.
   *
   *  Named `pendingLeads`, not `selection`: Obsidian's Modal assigns a
   *  `selection` property on the instance at runtime (it restores the
   *  editor's selection on close), which silently shadows a method of that
   *  name on the prototype. The failure is a "not a function" TypeError from
   *  inside a promise, so it does not surface as a broken build. */
  pendingLeads() {
    const out = [];
    for (const [file, leads] of this.found) {
      const keep = leads.filter((l) => this.bare || !l.bare);
      if (keep.length) out.push([file, keep]);
    }
    return out.sort((a, b) => a[0].path.localeCompare(b[0].path));
  }
  render() {
    if (this.scanning) return;
    const sel = this.pendingLeads();
    const lines = sel.reduce((n, [, l]) => n + l.length, 0);
    this.go.disabled = lines === 0;
    this.go.setText(lines ? `Convert ${lines}` : "Convert");
    const byType = /* @__PURE__ */ new Map();
    for (const [, leads] of sel) for (const l of leads) byType.set(l.type, (byType.get(l.type) ?? 0) + 1);
    const breakdown = [...byType.entries()].sort((a, b) => b[1] - a[1]).map(([t, n]) => `${CALLOUT_FLAVORS.find((f) => f.type === t)?.emoji ?? ""} ${n} ${t}`).join(" \xB7 ");
    this.summaryEl.setText(
      lines ? `${lines} lead-in${lines === 1 ? "" : "s"} in ${sel.length} note${sel.length === 1 ? "" : "s"}${breakdown ? ` (${breakdown})` : ""}` : "Nothing to convert."
    );
    this.listEl.empty();
    for (const [file, leads] of sel) {
      const group = this.listEl.createDiv({ cls: "ped-convert-file" });
      group.createDiv({ cls: "ped-convert-path", text: file.path });
      for (const l of leads) {
        const row = group.createDiv({ cls: "ped-convert-row" });
        row.createSpan({ cls: "ped-convert-emoji", text: CALLOUT_FLAVORS.find((f) => f.type === l.type)?.emoji ?? "" });
        row.createSpan({ cls: "ped-convert-line", text: `line ${l.line + 1}: ${l.label}` });
      }
    }
  }
  async run() {
    const sel = this.pendingLeads();
    this.go.disabled = true;
    this.go.setText("Converting\u2026");
    let files = 0;
    let lines = 0;
    for (const [file] of sel) {
      const n = await this.plugin.convertLeadsInFile(file, this.bare);
      if (n) {
        files++;
        lines += n;
      }
    }
    this.close();
    new Notice(`Converted ${lines} lead-in${lines === 1 ? "" : "s"} into callouts across ${files} note${files === 1 ? "" : "s"}.`);
  }
  onClose() {
    this.canceled = true;
    this.contentEl.empty();
  }
};
var PlaceholderSweepModal = class extends import_obsidian2.Modal {
  constructor(plugin, files, root) {
    super(plugin.app);
    this.plugin = plugin;
    this.files = files;
    this.root = root;
    this.found = /* @__PURE__ */ new Map();
    this.scanning = true;
    this.canceled = false;
  }
  onOpen() {
    this.titleEl.setText("Escape placeholder tags");
    const where = this.root ? `\u201C${this.root}\u201D` : "your vault";
    this.contentEl.createEl("p", {
      cls: "ped-convert-intro",
      text: `Looks through ${where} for angle-bracket placeholders like <AppFeature>. Obsidian reads one of those as an HTML tag that never closes, and from there Live Preview stops rendering Markdown for the rest of the note, headings, bold and links below it all come out as raw source. Escaping leaves the text reading exactly as written and gets the rendering back. Real HTML and anything inside code is left alone.`
    });
    this.summaryEl = this.contentEl.createDiv({
      cls: "ped-convert-summary",
      text: `Scanning 0 of ${this.files.length.toLocaleString()} notes\u2026`
    });
    this.listEl = this.contentEl.createDiv({ cls: "ped-convert-list" });
    const btns = this.contentEl.createDiv({ cls: "ped-prompt-btns" });
    btns.createEl("button", { text: "Cancel" }).addEventListener("click", () => this.close());
    this.go = btns.createEl("button", { text: "Escape", cls: "mod-cta" });
    this.go.disabled = true;
    this.go.addEventListener("click", () => void this.run());
    void this.scan();
  }
  /** Read in parallel chunks rather than one file at a time, for the same
   *  reason the callout scan does: a big vault is thousands of notes, and
   *  awaiting each read in turn spends the scan waiting on disk latency. */
  async scan() {
    const CHUNK = 64;
    for (let i = 0; i < this.files.length && !this.canceled; i += CHUNK) {
      const batch = this.files.slice(i, i + CHUNK);
      const reads = await Promise.all(
        batch.map(async (f) => {
          try {
            return [f, findPlaceholderTags(await this.app.vault.cachedRead(f))];
          } catch {
            return [f, []];
          }
        })
      );
      for (const [f, tags] of reads) if (tags.length) this.found.set(f, tags);
      const done = Math.min(i + CHUNK, this.files.length);
      this.summaryEl.setText(`Scanning ${done.toLocaleString()} of ${this.files.length.toLocaleString()} notes\u2026`);
    }
    if (this.canceled) return;
    this.scanning = false;
    this.render();
  }
  /** Named `pendingTags`, not `selection`, for the reason spelled out on the
   *  callout modal: Obsidian's Modal assigns a `selection` property at
   *  runtime, which would silently shadow a method of that name. */
  pendingTags() {
    return [...this.found].sort((a, b) => a[0].path.localeCompare(b[0].path));
  }
  render() {
    if (this.scanning) return;
    const sel = this.pendingTags();
    const total = sel.reduce((n, [, tags]) => n + tags.length, 0);
    this.go.disabled = total === 0;
    this.go.setText(total ? `Escape ${total}` : "Escape");
    const byTag = /* @__PURE__ */ new Map();
    for (const [, tags] of sel) for (const t of tags) byTag.set(t.tag, (byTag.get(t.tag) ?? 0) + 1);
    const breakdown = [...byTag.entries()].sort((a, b) => b[1] - a[1]).slice(0, 4).map(([tag, n]) => `${n}\xD7 ${tag}`).join(" \xB7 ");
    this.summaryEl.setText(
      total ? `${total} placeholder${total === 1 ? "" : "s"} in ${sel.length} note${sel.length === 1 ? "" : "s"}${breakdown ? ` (${breakdown}${byTag.size > 4 ? " \u2026" : ""})` : ""}` : "Nothing to escape."
    );
    this.listEl.empty();
    for (const [file, tags] of sel) {
      const group = this.listEl.createDiv({ cls: "ped-convert-file" });
      group.createDiv({ cls: "ped-convert-path", text: file.path });
      for (const t of tags) {
        const row = group.createDiv({ cls: "ped-convert-row" });
        row.createSpan({ cls: "ped-convert-line", text: `line ${t.line + 1}: ${t.tag}` });
      }
    }
  }
  async run() {
    const sel = this.pendingTags();
    this.go.disabled = true;
    this.go.setText("Escaping\u2026");
    let files = 0;
    let tags = 0;
    for (const [file] of sel) {
      const n = await this.plugin.escapeTagsInFile(file);
      if (n) {
        files++;
        tags += n;
      }
    }
    this.close();
    new Notice(`Escaped ${tags} placeholder${tags === 1 ? "" : "s"} across ${files} note${files === 1 ? "" : "s"}.`);
  }
  onClose() {
    this.canceled = true;
    this.contentEl.empty();
  }
};
var PowerEditorSettingTab = class extends import_obsidian2.PluginSettingTab {
  constructor(plugin) {
    super(plugin.app, plugin);
    this.plugin = plugin;
    /** Which settings tab is showing; kept across re-renders. */
    this.activeTab = "toolbar";
    /** Current search filter; when set, matching settings show across all tabs. */
    this.query = "";
    /** The one open help popover, if any, and the icon it hangs from. */
    this.helpEl = null;
    this.helpAnchor = null;
    this.helpPinned = false;
    this.helpCleanup = null;
    /** The button list redraws itself in place, so it keeps a handle on its own
     *  container and on the row a drag started from. */
    this.orderList = null;
    this.dragFrom = null;
  }
  hide() {
    this.closeHelp();
  }
  closeHelp() {
    this.helpCleanup?.();
    this.helpCleanup = null;
    this.helpEl?.remove();
    this.helpEl = null;
    this.helpAnchor = null;
    this.helpPinned = false;
  }
  /** Show the help popover for `icon`: a soft theme-colored card rather than
   *  the native black tooltip. Opens on hover; a click pins it so it survives
   *  the pointer leaving; Esc, a click elsewhere, or scrolling closes it. */
  openHelp(icon, text, pin) {
    if (this.helpAnchor === icon && this.helpEl) {
      if (pin) this.helpPinned = true;
      return;
    }
    this.closeHelp();
    const el = document.body.createDiv({ cls: "ped-help-pop", text });
    this.helpEl = el;
    this.helpAnchor = icon;
    this.helpPinned = pin;
    const r = icon.getBoundingClientRect();
    el.style.left = Math.max(8, Math.min(r.left - 12, window.innerWidth - el.offsetWidth - 8)) + "px";
    const below = r.bottom + 8;
    el.style.top = (below + el.offsetHeight > window.innerHeight - 8 ? r.top - el.offsetHeight - 8 : below) + "px";
    const onDocDown = (e) => {
      if (e.target instanceof Node && (el.contains(e.target) || icon.contains(e.target))) return;
      this.closeHelp();
    };
    const onKey = (e) => {
      if (e.key === "Escape") this.closeHelp();
    };
    const onScroll = () => this.closeHelp();
    document.addEventListener("pointerdown", onDocDown, true);
    document.addEventListener("keydown", onKey, true);
    document.addEventListener("scroll", onScroll, true);
    this.helpCleanup = () => {
      document.removeEventListener("pointerdown", onDocDown, true);
      document.removeEventListener("keydown", onKey, true);
      document.removeEventListener("scroll", onScroll, true);
    };
  }
  /** Redraw when the rows themselves change: an AI action added, the outline
   *  levels appearing. Obsidian 1.13 rebuilds the tab from
   *  getSettingDefinitions(); older builds have only the fallback renderer. */
  refresh() {
    this.closeHelp();
    const tab = this;
    if (tab.update) tab.update();
    else this.renderFallback();
  }
  /** Hover shows the popover, a click pins it open so the one-line desc stays
   *  scannable. No aria-label on the icon, or Obsidian's native black tooltip
   *  doubles up with it. */
  wireHelp(ic, text) {
    ic.addEventListener("mouseenter", () => this.openHelp(ic, text, false));
    ic.addEventListener("mouseleave", () => {
      if (!this.helpPinned && this.helpAnchor === ic) this.closeHelp();
    });
    ic.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (this.helpPinned && this.helpAnchor === ic) this.closeHelp();
      else this.openHelp(ic, text, true);
    });
  }
  /** The help icon that follows a setting's name. */
  addHelp(st, text) {
    const ic = st.nameEl.createSpan({ cls: "ped-setting-help" });
    (0, import_obsidian2.setIcon)(ic, "help-circle");
    this.wireHelp(ic, text);
  }
  /** Obsidian 1.13 and up builds the tab from these and never calls display():
   *  one native page per tab, standing in for the tab bar the fallback draws
   *  for older builds. A tab holding more than one section becomes a page of
   *  headed groups, which is what the headings were doing by hand.
   *
   *  Every row renders itself rather than declaring a `control`. A declarative
   *  control writes through Obsidian's generic setControlValue, which would
   *  bypass persistSettings and overwrite whatever another device changed. */
  getSettingDefinitions() {
    const pages = this.buildPages();
    const rowsOf = new Map(pages.map((p) => [p.label, p.groups.flatMap((g) => g.rows)]));
    return [
      {
        name: "",
        searchable: false,
        // it is a masthead, not a setting
        render: (st) => {
          st.settingEl.empty();
          this.renderAbout(st.settingEl);
        }
      },
      {
        type: "group",
        search: {
          placeholder: "Search settings...",
          // the entries here are whole tabs, so a tab stays up when anything
          // inside it matches. Obsidian's own search box, top left, reaches
          // the individual settings.
          match: (def, query) => {
            const q = query.trim().toLowerCase();
            if (!q) return true;
            const has2 = (v) => (v ?? "").toLowerCase().includes(q);
            return (rowsOf.get(def.name) ?? []).some(
              (r) => has2(r.name) || has2(r.desc) || (r.aliases ?? []).some(has2)
            );
          }
        },
        items: pages.map(
          (p) => ({
            type: "page",
            name: p.label,
            // a lone unnamed section is the page itself, so it stays flat
            items: p.groups.length === 1 && !p.groups[0].heading ? p.groups[0].rows.map((r) => this.toDefinition(r, p.label)) : p.groups.map((g) => ({
              type: "group",
              heading: g.heading,
              // the section's own help note, on the header rather
              // than on any one row beneath it
              extraButtons: g.help ? [
                (b) => {
                  b.setIcon("help-circle");
                  this.wireHelp(b.extraSettingsEl, g.help ?? "");
                }
              ] : void 0,
              items: g.rows.map((r) => this.toDefinition(r, p.label))
            }))
          })
        )
      }
    ];
  }
  /** One row as a definition Obsidian can draw. The name and description are
   *  its to render and it rebuilds both on a redraw, so a row only hands back
   *  what it hung on the row element itself. */
  toDefinition(r, page) {
    return {
      name: r.name,
      desc: r.desc,
      // searching the tab name still finds its rows, the way a heading match
      // opened the whole section in the tab bar
      aliases: [...r.aliases ?? [], page],
      render: (st) => {
        const teardown = r.build?.(st);
        if (r.help) this.addHelp(st, r.help);
        return teardown;
      }
    };
  }
  /** What this plugin is and which build is running, above the section list.
   *  Read off the manifest so it cannot drift from the released version. */
  renderAbout(el) {
    el.addClass("ped-about");
    const head = el.createDiv({ cls: "ped-about-head" });
    head.createSpan({ cls: "ped-about-name", text: this.plugin.manifest.name });
    head.createSpan({ cls: "ped-about-version", text: "v" + this.plugin.manifest.version });
    el.createDiv({ cls: "ped-about-desc", text: this.plugin.manifest.description });
    const support = el.createDiv({ cls: "ped-about-support" });
    support.createEl("a", { text: "Buy me a coffee", href: "https://buymeacoffee.com/powerplugins" });
    support.createSpan({
      text: `. One page covers every Power Plugin, so mention ${this.plugin.manifest.name} in the note, and say what would make it better while you are there. A good deal of what is in these plugins started as someone's note.`
    });
  }
  /** The pre-1.13 renderer: every section on one page, with a tab bar and a
   *  search box of our own because there was no declarative API to hand the
   *  work to. Obsidian 1.13 and up ignores this and renders the definitions
   *  above instead, so the two only ever differ in how they draw, never in
   *  what they draw. */
  display() {
    this.renderFallback();
  }
  renderFallback() {
    const root = this.containerEl;
    root.empty();
    this.closeHelp();
    const pages = this.buildPages();
    if (!pages.some((p) => p.id === this.activeTab)) this.activeTab = pages[0].id;
    this.renderAbout(root.createDiv({ cls: "ped-about-standalone" }));
    const searchWrap = root.createDiv({ cls: "ped-settings-search" });
    const searchInput = searchWrap.createEl("input", { cls: "ped-settings-search-input" });
    searchInput.type = "search";
    searchInput.placeholder = "Search settings...";
    searchInput.value = this.query;
    const tabBar = root.createDiv({ cls: "ped-settings-tabs" });
    const body = root.createDiv({ cls: "ped-settings-body" });
    for (const p of pages) {
      for (const g of p.groups) {
        const sec = body.createDiv({ cls: "ped-settings-section" });
        sec.dataset.tab = p.id;
        sec.dataset.name = (g.heading ?? p.label).toLowerCase();
        const h = new import_obsidian2.Setting(sec).setName(g.heading ?? p.label).setHeading();
        if (g.help) this.addHelp(h, g.help);
        for (const r of g.rows) {
          const st = new import_obsidian2.Setting(sec).setName(r.name);
          if (r.desc) st.setDesc(r.desc);
          if (r.aliases?.length) st.settingEl.dataset.pedAlias = r.aliases.join(" ").toLowerCase();
          r.build?.(st);
          if (r.help) this.addHelp(st, r.help);
        }
      }
    }
    const setVisible = (el, v) => el.style.display = v ? "" : "none";
    const applyView = () => {
      const q = this.query.trim().toLowerCase();
      setVisible(tabBar, !q);
      for (const sec of Array.from(body.children)) {
        const items = Array.from(sec.querySelectorAll(":scope > .setting-item:not(.setting-item-heading)"));
        if (!q) {
          for (const it of items) setVisible(it, true);
          setVisible(sec, sec.dataset.tab === this.activeTab);
          continue;
        }
        const nameHit = (sec.dataset.name ?? "").includes(q);
        let anyHit = false;
        for (const it of items) {
          const name = it.querySelector(".setting-item-name")?.textContent?.toLowerCase() ?? "";
          const desc = it.querySelector(".setting-item-description")?.textContent?.toLowerCase() ?? "";
          const hit = nameHit || name.includes(q) || desc.includes(q) || (it.dataset.pedAlias ?? "").includes(q);
          setVisible(it, hit);
          if (hit) anyHit = true;
        }
        setVisible(sec, anyHit);
      }
    };
    for (const p of pages) {
      const btn = tabBar.createEl("button", { text: p.label, cls: "ped-settings-tab" });
      btn.toggleClass("is-active", p.id === this.activeTab);
      btn.onclick = () => {
        if (this.activeTab === p.id) return;
        this.activeTab = p.id;
        for (const other of Array.from(tabBar.children)) other.toggleClass("is-active", other === btn);
        applyView();
      };
    }
    searchInput.addEventListener("input", () => {
      this.query = searchInput.value;
      applyView();
    });
    applyView();
  }
  /** Every row of the settings tab, in order, as plain data: the one source
   *  both renderers draw from, so they cannot drift apart. Built fresh on each
   *  render because some sections depend on current settings. */
  buildPages() {
    const save = () => void this.plugin.persistSettings();
    const s = this.plugin.settings;
    const general = [
      {
        name: "Show notifications",
        desc: "Show popup notices from Power Editor. Turn off to keep Obsidian clear, especially on phones.",
        help: "When off, Power Editor suppresses every popup notice, including progress, success, warning, and error notices.",
        build: (st) => {
          st.addToggle((t) => t.setValue(s.showNotifications).onChange((v) => (s.showNotifications = v, save())));
        }
      }
    ];
    const toolbar = [
      {
        name: "Formatting toolbar",
        desc: "A rich formatting toolbar at the top of every note in editing view.",
        help: "The toolbar sits above the note in editing and Live Preview, and hides itself in Reading view. Pick which tools it shows on the Buttons list below.",
        build: (st) => {
          st.addToggle(
            (t) => t.setValue(s.showToolbar).onChange((v) => (s.showToolbar = v, save(), this.plugin.rebuildToolbars()))
          );
        }
      },
      {
        name: "Show on phones and tablets",
        desc: "Obsidian mobile has its own toolbar, so this is off by default.",
        help: "Leave this off to keep Obsidian's built-in mobile toolbar. Turn it on when you want the full formatting row on a tablet with room to spare.",
        build: (st) => {
          st.addToggle(
            (t) => t.setValue(s.showOnMobile).onChange((v) => (s.showOnMobile = v, save(), this.plugin.rebuildToolbars()))
          );
        }
      },
      {
        name: "Quick-capture mobile toolbar",
        desc: "Replace the commands on Obsidian's above-keyboard mobile toolbar with a note-taking set: photo, dictate, to-do, bullet and numbered lists, indents, bold, and hide keyboard. Turning this off restores your previous arrangement.",
        help: "This changes the row just above the phone keyboard, not the main toolbar. Your original arrangement is saved and comes straight back when you turn this off.",
        build: (st) => {
          st.addToggle(
            (t) => t.setValue(s.onenoteMobileToolbar).onChange((v) => {
              s.onenoteMobileToolbar = v;
              save();
              this.plugin.applyMobileToolbar();
            })
          );
        }
      }
    ];
    const buttons = [
      {
        name: "Arrange",
        desc: "Drag a button by its grip to reorder it (or focus a grip and use the arrow keys). Add a divider, or go back to the original layout.",
        build: (st) => {
          st.addButton(
            (b) => b.setButtonText("Add divider").setTooltip("Adds a divider at the end; move it where you want it").onClick(() => {
              s.buttonOrder = [...this.plugin.orderedButtonIds(), "|"];
              save();
              this.plugin.rebuildToolbars();
              this.redrawButtonOrder();
            })
          );
          st.addButton(
            (b) => b.setButtonText("Reset order").onClick(() => {
              s.buttonOrder = [];
              save();
              this.plugin.rebuildToolbars();
              this.redrawButtonOrder();
            })
          );
        }
      },
      {
        // The list owns a container of its own rather than being one row per
        // button, because moving a button is a rapid, repeated action: the
        // rows redraw themselves without redrawing the tab, which would throw
        // you back to the top of the page on every click.
        name: "",
        aliases: ["buttons", "order", "divider", "arrange"],
        build: (st) => {
          st.settingEl.empty();
          st.settingEl.addClass("ped-order-host");
          this.orderList = st.settingEl.createDiv({ cls: "ped-order-list" });
          this.redrawButtonOrder();
          return () => {
            this.orderList = null;
          };
        }
      }
    ];
    const editing = [
      {
        name: "Selection bubble",
        desc: "A compact formatting bubble appears right at your selection (the fastest way to format).",
        help: "Select text and a small toolbar floats next to it, so you do not have to reach for the top bar. It follows the selection and vanishes when you click away.",
        build: (st) => {
          st.addToggle((t) => t.setValue(s.showBubble).onChange((v) => (s.showBubble = v, save())));
        }
      },
      {
        name: "Block drag handles",
        desc: "Hover a block for a grip: drag it to move the block, click it for the block menu (turn into, duplicate, copy link, delete\u2026).",
        help: "The grip shows in the left margin when you hover a paragraph, list, table, or embed. Drag it to reorder, or click it for turn-into, duplicate, copy link, and delete.",
        build: (st) => {
          st.addToggle((t) => t.setValue(s.blockHandles).onChange((v) => (s.blockHandles = v, save())));
        }
      },
      {
        name: "Headings move their section",
        desc: "Dragging a heading takes everything beneath it (until the next heading of the same level). Turn off to move heading lines alone.",
        help: "On, a heading's grip carries its whole section as one block. Off, it moves just the heading line and leaves the body where it is.",
        build: (st) => {
          st.addToggle((t) => t.setValue(s.headingSections).onChange((v) => (s.headingSections = v, save())));
        }
      },
      {
        name: "Hide formatting characters (WYSIWYG)",
        desc: "Live Preview normally reveals ** and == while the cursor is inside formatted text. This keeps them hidden for a clean look; the markers still exist in the file, you just never see them.",
        help: "Keeps markers like ** and == out of sight even while you edit that line, so text always looks finished. The markers stay in the file, so the Markdown never changes. This is also what renders bold and italics inside a highlight.",
        build: (st) => {
          st.addToggle(
            (t) => t.setValue(s.wysiwygMarks).onChange((v) => {
              s.wysiwygMarks = v;
              save();
              this.plugin.applyWysiwyg();
            })
          );
        }
      },
      {
        name: "Live checkboxes while editing",
        desc: "Keep a task's checkbox rendered on the line you are editing, instead of showing the raw '- [ ]' the way Live Preview does.",
        help: "Most noticeable when a note opens with a task on its first line and the cursor lands there: without this you see '- [ ]', with it you see a checkbox like every other line. Off the active line nothing changes, so there is never a doubled box.",
        build: (st) => {
          st.addToggle(
            (t) => t.setValue(s.liveCheckboxes).onChange((v) => {
              s.liveCheckboxes = v;
              save();
              this.plugin.refreshEditors();
            })
          );
        }
      },
      {
        name: "Rich text on copy",
        desc: "Ctrl+C also puts formatted text on the clipboard, so a paste into email keeps its headings, bold, links, and lettered sub-lists.",
        help: "Plain Markdown goes on the clipboard as well, so pasting into an editor or a terminal is unchanged. Pasting back into Obsidian gives you the Markdown you copied, not a reading of the HTML, because the copy carries its own source inside it. Turn this off if you want Obsidian's own plain copy back.",
        build: (st) => {
          st.addToggle(
            (t) => t.setValue(s.richCopy).onChange((v) => {
              s.richCopy = v;
              save();
            })
          );
        }
      },
      {
        name: "Indent guides on lists",
        desc: "The vertical rule Obsidian draws down each indent level.",
        help: "A numbered list already says how deep an item sits twice over - the numbering itself, and the a, b, c under it - so a third cue reads as a line ruled through your text. A bulleted list has nothing else saying it, which is why hiding those is a separate choice rather than the default. Both views, and Obsidian's own setting still governs whether guides exist at all.",
        build: (st) => {
          st.addDropdown(
            (d) => d.addOption("all", "Show on every list").addOption("no-ordered", "Hide on numbered lists").addOption("none", "Hide on every list").setValue(s.indentGuides).onChange((v) => {
              s.indentGuides = v;
              save();
              this.plugin.applyListGuides();
            })
          );
        }
      },
      {
        name: "Line spacing",
        desc: "How much your pages breathe (applies to editing and reading views).",
        help: "Sets the gap between lines everywhere you read and write. Compact fits more on screen; Relaxed is gentler for long reading.",
        build: (st) => {
          st.addDropdown(
            (d) => d.addOption("compact", "Compact").addOption("normal", "Normal").addOption("relaxed", "Relaxed").setValue(s.lineSpacing).onChange((v) => {
              s.lineSpacing = v;
              save();
              this.plugin.applySpacing();
            })
          );
        }
      },
      this.gapRow(
        "Space under headings",
        "Markdown puts a blank line under a heading, and in editing view that line takes a full line's height. This shrinks it so a heading sits closer to what it introduces.",
        "headingGap",
        "A normal line is about 24px, so Half is half. Type your own number in the box for anything in between (0 to 60). None removes the gap entirely, the blank line stays in the file, so the Markdown is unchanged, it just stops taking up room. Editing view only; the cursor looks short while it sits on that line and returns to normal as soon as you type."
      ),
      this.gapRow(
        "Space around tables",
        "A table has a blank line on both sides and Markdown needs both, delete one and the table stops being a table. This shrinks them, and trims the table's own bottom padding to match.",
        "tableGap",
        "Set independently of headings, because a table usually wants a little more room than a paragraph does. Where a table follows a heading directly, the heading setting wins, so a heading sits the same distance from whatever comes next. The table's bottom padding never goes below 6px, so the row drag handles keep their room."
      ),
      {
        name: "Show when the note was last edited",
        desc: "A quiet line under the note's title: \u201CEdited 3 minutes ago\u201D. Click it to swap between the relative time and the exact date.",
        help: "Reads the file's own modified time, so it is right without you maintaining anything. If a note has an `updated:` (or `modified:`) property in its frontmatter, that wins instead, useful in a synced vault, where the sync client can rewrite the file's modified time when a note arrives from another device and make it look freshly edited.",
        build: (st) => {
          st.addDropdown(
            (d) => d.addOption("labeled", "Yes, with the word Edited").addOption("bare", "Yes, just the time").addOption("off", "Off").setValue(s.showEdited).onChange((v) => {
              s.showEdited = v;
              save();
              this.plugin.updatePageChrome();
            })
          );
        }
      },
      {
        name: "Where to show it",
        desc: "Under the note's title, at the very end of the note, or in both places.",
        help: "Under the title is the Notion habit: you see it as you arrive. The line variant is the same spot pulled tight against the title with a hairline drawn between them, so the title and the date read as one page header instead of as two stray lines above your first paragraph. At the end is closer to 1Password, where the detail sits out of the way until you go looking. Both is fine on long notes, where the title has scrolled away by the time you wonder.",
        build: (st) => {
          st.addDropdown(
            (d) => d.addOption("title", "Under the title").addOption("rule", "Under the title, with a line above it").addOption("bottom", "At the end of the note").addOption("both", "Both").setValue(s.editedPosition).onChange((v) => {
              s.editedPosition = v;
              save();
              this.plugin.updatePageChrome();
            })
          );
        }
      },
      {
        name: "Time format",
        desc: "How the time itself reads.",
        help: "Relative answers 'is this stale?' at a glance; exact answers 'which version is this?'. Whichever you pick, clicking the stamp shows both for that note until you click it again, and hovering always shows the exact time.",
        build: (st) => {
          st.addDropdown(
            (d) => d.addOption("relative", "Relative (3 minutes ago)").addOption("exact", "Exact date and time").addOption("both", "Relative, then the exact date").setValue(s.editedFormat).onChange((v) => {
              s.editedFormat = v;
              save();
              this.plugin.updatePageChrome();
            })
          );
        }
      },
      {
        name: "Code block theme",
        desc: "The syntax palette for fenced code. The dark ones are the editor themes Claude and ChatGPT render code in.",
        help: "A dark code block inside a light note is what Claude, ChatGPT, and most documentation sites do, because saturated syntax colors need a dark surface to sit on. Vivid Light keeps the light background with stronger colors than Obsidian's own. Whichever you pick, code only takes color when the fence names a language, use the language button on the block to set or change it.",
        build: (st) => {
          st.addDropdown(
            (d) => d.addOption("vivid", "Vivid Light").addOption("one-dark", "One Dark").addOption("dracula", "Dracula").addOption("monokai", "Monokai").addOption("github-dark", "GitHub Dark").addOption("default", "Follow my Obsidian theme").setValue(s.codeTheme).onChange((v) => {
              s.codeTheme = v;
              save();
              this.plugin.applyCodeTheme();
            })
          );
        }
      },
      {
        name: "Line numbers in code blocks",
        desc: "A numbered gutter down the left of every fenced block.",
        help: "Numbers count from 1 within each block, not from the note's line count, so they match what you would see if the file were open in an editor. They are drawn, not written into the note, so copying the block copies the code alone.",
        build: (st) => {
          st.addToggle(
            (t) => t.setValue(s.codeLineNumbers).onChange((v) => {
              s.codeLineNumbers = v;
              save();
              this.plugin.applyCodeTheme();
            })
          );
        }
      }
    ];
    const lists = [
      {
        name: "Multilevel numbering (outline style)",
        desc: "Style nested numbered lists by level (1, 2, 3 then a, b, c then i, ii, iii) instead of restarting at 1 everywhere. Applies in editing and reading views; the raw number shows while your cursor is on the line.",
        help: "Nested numbered lists cascade through the styles you set per level instead of every level starting at 1. Choose each level below. The plain number reappears while your cursor is on that line so renumbering stays normal.",
        build: (st) => {
          st.addToggle(
            (t) => t.setValue(s.numberedOutline).onChange((v) => {
              s.numberedOutline = v;
              save();
              this.plugin.applyOutlineCss();
              this.plugin.refreshEditors();
              this.refresh();
            })
          );
        }
      }
    ];
    if (s.numberedOutline) {
      const ordinal = (n) => ["1st", "2nd", "3rd", "4th", "5th", "6th"][n] ?? `${n + 1}th`;
      for (let level = 0; level < s.outlineStyles.length; level++) {
        const at = level;
        lists.push({
          name: `${ordinal(at)} level`,
          build: (st) => {
            st.addDropdown((d) => {
              for (const [value, label] of OUTLINE_CHOICES) d.addOption(value, label);
              d.setValue(s.outlineStyles[at]).onChange((v) => {
                s.outlineStyles[at] = v;
                save();
                this.plugin.applyOutlineCss();
                this.plugin.refreshEditors();
              });
            });
          }
        });
      }
    }
    const clipboard = [
      {
        name: "Clean pasted HTML",
        desc: "Pasting from Word, Outlook, a web page, or an AI chat converts to clean Markdown automatically, tables included. The 'Paste as clean Markdown' command does it on demand.",
        help: "Strips the hidden styling that Word, Outlook, and web pages carry and turns it into plain Markdown. Tables keep their rows and columns, so a comparison copied out of ChatGPT, Claude, or Grok lands as a real table instead of one run-on paragraph. When this is off, the 'Paste as clean Markdown' command still does it on request.",
        build: (st) => {
          st.addToggle((t) => t.setValue(s.cleanPaste).onChange((v) => (s.cleanPaste = v, save())));
        }
      },
      {
        name: "Clean copied text",
        desc: "Highlighted or colored text stores HTML in the note. Clean removes those tags when you copy, so other apps get readable text and keep bold and italics. Plain text also drops the Markdown so nothing but the words is left. Off leaves copying to Obsidian.",
        help: "Pick Plain text if you want pasted words with no ** or highlight tags at all. Clean keeps bold and italics but removes the color HTML. This only affects copying from editing view; Reading view already copies plain text.",
        build: (st) => {
          st.addDropdown(
            (d) => d.addOption("clean", "Clean (remove highlight and color tags)").addOption("plain", "Plain text (remove all formatting)").addOption("off", "Off (Obsidian default)").setValue(s.copyMode).onChange((v) => {
              s.copyMode = v;
              save();
            })
          );
        }
      }
    ];
    const files = [
      {
        name: "Inserting a PDF",
        desc: "A link opens the PDF when you click it, so several of them read as a short list under a heading. An embed draws the pages in the note itself, which suits one document you want to read in place.",
        help: "This is only about PDFs. Pictures, audio, and video always go in as themselves, and a file Obsidian cannot draw is always a link.",
        aliases: ["pdf", "embed", "attachment"],
        build: (st) => {
          st.addDropdown(
            (d) => d.addOption("link", "As a link that opens it").addOption("embed", "As an embedded page preview").setValue(s.pdfInsert).onChange((v) => {
              s.pdfInsert = v;
              save();
            })
          );
        }
      },
      {
        name: "Where inserted files are saved",
        desc: "PDFs and documents you insert, drag, or paste can sit with the note that talks about them instead of in the vault's one attachment folder. Images are not covered by this and keep going wherever Obsidian already puts them.",
        help: "The point of this is that a contract, a signed scan, or a quote stays with its page: move or archive the note and its papers travel with it. Screenshots are left alone on purpose, since they are pasted constantly and already have a home.",
        aliases: ["pdf", "attachment", "document"],
        build: (st) => {
          st.addDropdown(
            (d) => d.addOption("note", "In the same folder as the note").addOption("subfolder", "In a subfolder beside the note").addOption("obsidian", "Wherever Obsidian saves attachments").setValue(s.fileLocation).onChange((v) => {
              s.fileLocation = v;
              save();
              this.refresh();
            })
          );
        }
      },
      ...s.fileLocation === "subfolder" ? [
        {
          name: "Subfolder name",
          desc: "The folder to make beside the note. Write {note} for the note's own name, so each page keeps its files in a folder of its own.",
          help: "A path works too: Files/PDFs makes both. The folder is created the first time a file goes into it, so nothing appears until you actually attach something.",
          build: (st) => {
            st.addText(
              (t) => t.setPlaceholder("Files").setValue(s.fileSubfolder).onChange((v) => (s.fileSubfolder = v, save()))
            );
          }
        }
      ] : [],
      {
        name: "Catch dropped and pasted files",
        desc: "Dragging a PDF onto a note, or pasting one copied from your computer, files it the way the setting above asks. Turn this off to insert files only from the toolbar, the slash menu, or the command.",
        help: "Images are never caught, so a pasted screenshot behaves exactly as it always has. Dragging a note or attachment from Obsidian's own file explorer is not affected either, since that carries a link rather than a file.",
        build: (st) => {
          st.addToggle((t) => t.setValue(s.routeDroppedFiles).onChange((v) => (s.routeDroppedFiles = v, save())));
        }
      }
    ];
    const todos = [
      {
        name: "Completing a to-do stamps the date",
        desc: "Checking a box appends a \u2705 done date so dashboards can show when things got finished. Recurring items (\u{1F501}) always create their next occurrence either way. Query them anywhere with a 'todo' code block.",
        help: "The stamped date is what the 'todo' dashboards use to show what got done and when. Recurring items still spawn their next date whether this is on or off.",
        build: (st) => {
          st.addToggle((t) => t.setValue(s.stampDoneDates).onChange((v) => (s.stampDoneDates = v, save())));
        }
      },
      {
        name: "Quick capture inbox",
        desc: "Where 'To-do: quick capture' appends new items. The note is created if it doesn't exist.",
        help: "Give a path like Inbox.md or Tasks/Inbox.md. The note and any missing folders are created the first time you capture into it.",
        build: (st) => {
          st.addText((t) => t.setPlaceholder("Inbox.md").setValue(s.inboxNote).onChange((v) => (s.inboxNote = v, save())));
        }
      },
      {
        name: "To-do reminders",
        desc: "A due-today digest when Obsidian opens, and a notice the minute any '\u23F0 HH:MM' to-do comes due while the app is running.",
        help: "Add a time to any item with the \u23F0 emoji, like \u23F0 14:30, and a notice pops when it comes due while Obsidian is open. Phone push notifications are not possible from a plugin.",
        build: (st) => {
          st.addToggle((t) => t.setValue(s.todoReminders).onChange((v) => (s.todoReminders = v, save())));
        }
      }
    ];
    const ai = [
      {
        name: "Anthropic API key",
        desc: "Powers the bubble's AI actions (improve, fix grammar, shorten, summarize). Leave empty to reuse Power Assistant's key automatically.",
        help: "Used only by the AI actions on the bubble and menu. It lives in this vault's settings and never appears in a note. Leave it blank and the plugin borrows Power Assistant's key when that plugin is installed.",
        build: (st) => {
          st.addText((t) => {
            t.inputEl.type = "password";
            t.setValue(s.anthropicKey).onChange((v) => (s.anthropicKey = v.trim(), save()));
          });
        }
      },
      {
        name: "Model",
        help: "The Claude model the AI actions call. Haiku is fast and inexpensive for quick edits; a larger model gives stronger rewrites. Clear the box to restore the default.",
        build: (st) => {
          st.addText((t) => t.setValue(s.aiModel).onChange((v) => (s.aiModel = v.trim() || "claude-haiku-4-5", save())));
        }
      },
      {
        name: "Custom AI actions",
        desc: 'Your own one-click instructions on the AI menu, e.g. "Rewrite as a customer-friendly email".',
        help: "Each action is a label plus an instruction. The label shows on the AI menu; the instruction is applied to whatever text you have selected. Handy for repeated jobs like turning notes into a status update.",
        build: (st) => {
          st.addButton(
            (b) => b.setButtonText("Add action").onClick(() => {
              s.aiActions.push({ name: "", prompt: "" });
              save();
              this.refresh();
            })
          );
        }
      }
    ];
    s.aiActions.forEach((a, idx) => {
      ai.push({
        name: "",
        aliases: ["custom AI action"],
        build: (st) => {
          st.settingEl.addClass("ped-aiaction-row");
          st.addText((t) => t.setPlaceholder("Menu label").setValue(a.name).onChange((v) => (a.name = v, save())));
          st.addTextArea(
            (t) => t.setPlaceholder("Instruction, e.g. Rewrite this as a friendly status update.").setValue(a.prompt).onChange((v) => (a.prompt = v, save()))
          );
          st.addExtraButton(
            (b) => b.setIcon("trash-2").setTooltip("Remove").onClick(() => {
              s.aiActions.splice(idx, 1);
              save();
              this.refresh();
            })
          );
          return () => st.settingEl.removeClass("ped-aiaction-row");
        }
      });
    });
    const dictation = [
      {
        name: "Transcription endpoint",
        desc: "Any OpenAI-compatible base URL, for example Groq. Leave empty to reuse Power Assistant's transcription automatically.",
        help: "Where the recorded audio is sent to become text; only the /audio/transcriptions path under it is used. Leave it blank and dictation borrows Power Assistant's endpoint and key when that plugin is installed, so a vault running both needs no second setup. Point it at a server on your own machine to keep the audio local, in which case no key is needed.",
        build: (st) => {
          st.addText(
            (t) => t.setPlaceholder("https://api.groq.com/openai/v1").setValue(s.transcriptionEndpoint).onChange((v) => (s.transcriptionEndpoint = v.trim(), save()))
          );
        }
      },
      {
        name: "Transcription API key",
        desc: "The key for the endpoint above. Empty is fine for a server on your own machine, or to fall back to Power Assistant's.",
        help: "The bearer token for the endpoint above. It is stored in this vault's settings and sent only to that endpoint. A transcription server running on your own machine usually needs no key at all.",
        build: (st) => {
          st.addText((t) => {
            t.inputEl.type = "password";
            t.setPlaceholder("Leave empty to use Power Assistant's").setValue(s.transcriptionKey).onChange((v) => (s.transcriptionKey = v.trim(), save()));
          });
        }
      },
      {
        name: "Transcription model",
        help: "The model name the endpoint expects, for example whisper-large-v3 on Groq. Leave it empty to use whisper-large-v3.",
        build: (st) => {
          st.addText(
            (t) => t.setPlaceholder("whisper-large-v3").setValue(s.transcriptionModel).onChange((v) => (s.transcriptionModel = v.trim(), save()))
          );
        }
      },
      {
        name: "After transcribing",
        desc: "Raw inserts exactly what you said. Tidy removes filler and fixes punctuation; Bullets turns it into a list (both use the AI key). Right-click the mic to switch on the fly.",
        help: "Tidy and Bullets send the transcript through the AI key, so they need a key set above. Raw needs no key. Right-click the microphone button to switch mode without opening settings.",
        build: (st) => {
          st.addDropdown(
            (d) => d.addOption("raw", "Insert the raw transcript").addOption("tidy", "Tidy into clean prose").addOption("bullets", "Turn into bullet points").setValue(s.dictationMode).onChange((v) => {
              s.dictationMode = v;
              save();
            })
          );
        }
      }
    ];
    return [
      { id: "general", label: "General", groups: [{ heading: "Notifications", rows: general }] },
      {
        id: "toolbar",
        label: "Toolbar",
        groups: [
          { heading: "Toolbar", rows: toolbar },
          {
            heading: "Buttons",
            help: "Which buttons appear on the toolbar, and in what order. A hidden button still works from the command palette and the slash menu.",
            rows: buttons
          }
        ]
      },
      { id: "editing", label: "Editing", groups: [{ heading: "Editing", rows: editing }] },
      { id: "lists", label: "Lists", groups: [{ heading: "Numbered list outline", rows: lists }] },
      { id: "clipboard", label: "Clipboard", groups: [{ heading: "Clipboard", rows: clipboard }] },
      { id: "files", label: "Files", groups: [{ heading: "Files and attachments", rows: files }] },
      { id: "todos", label: "To-dos", groups: [{ heading: "To-dos", rows: todos }] },
      {
        id: "ai",
        label: "AI & dictation",
        groups: [
          { heading: "AI edits", rows: ai },
          { heading: "Dictation", rows: dictation }
        ]
      }
    ];
  }
  /** Headings and tables get the same control twice, so it is built once. */
  gapRow(name, desc, key, hint) {
    const s = this.plugin.settings;
    const save = () => void this.plugin.persistSettings();
    const GAPS = [
      ["off", "Off (Obsidian default)"],
      ["18", "Roomy (18px)"],
      ["12", "Half (12px)"],
      ["8", "Tight (8px)"],
      ["4", "Very tight (4px)"],
      ["0", "None (0px)"]
    ];
    return {
      name,
      desc,
      help: hint,
      build: (st) => {
        st.addDropdown((d) => {
          for (const [v, label] of GAPS) d.addOption(v, label);
          if (!GAPS.some(([v]) => v === s[key])) d.addOption(s[key], `Custom (${s[key]}px)`);
          d.setValue(s[key]).onChange((v) => {
            s[key] = v;
            save();
            this.plugin.applyBlockGap();
            this.refresh();
          });
        });
        st.addText(
          (t) => t.setPlaceholder("px").setValue(s[key] === "off" ? "" : s[key]).onChange((v) => {
            const n = Number(v.trim());
            if (v.trim() === "" || !Number.isFinite(n) || n < 0 || n > 60) return;
            s[key] = String(n);
            save();
            this.plugin.applyBlockGap();
          })
        );
      }
    };
  }
  /** Redraw the button list in place. Kept off the tab's own redraw because
   *  moving a button is a rapid, repeated action, and rebuilding the tab would
   *  throw you back to the top of the page on every click. */
  redrawButtonOrder() {
    const list = this.orderList;
    if (!list) return;
    list.empty();
    const s = this.plugin.settings;
    const save = () => void this.plugin.persistSettings();
    const hidden = new Set(s.hiddenButtons);
    const labelOf = new Map(BUTTON_IDS);
    const order = this.plugin.orderedButtonIds();
    const move = (i, delta) => {
      const j = i + delta;
      if (j < 0 || j >= order.length) return;
      [order[i], order[j]] = [order[j], order[i]];
      s.buttonOrder = order;
      save();
      this.plugin.rebuildToolbars();
      this.redrawButtonOrder();
    };
    order.forEach((id, i) => {
      const row = new import_obsidian2.Setting(list);
      if (id === "|") {
        row.setName("Divider").setDesc("A vertical rule between groups.");
        row.nameEl.addClass("ped-order-divider");
      } else {
        row.setName(labelOf.get(id) ?? id);
      }
      const el = row.settingEl;
      el.addClass("ped-order-row");
      const grip = createDiv({ cls: "ped-order-grip", attr: { "aria-label": "Drag to reorder", draggable: "true" } });
      (0, import_obsidian2.setIcon)(grip, "grip-vertical");
      el.prepend(grip);
      grip.tabIndex = 0;
      grip.addEventListener("keydown", (e) => {
        if (e.key !== "ArrowUp" && e.key !== "ArrowDown") return;
        e.preventDefault();
        move(i, e.key === "ArrowUp" ? -1 : 1);
      });
      grip.addEventListener("dragstart", (ev) => {
        this.dragFrom = i;
        el.addClass("is-dragging");
        ev.dataTransfer?.setData("text/plain", String(i));
        if (ev.dataTransfer) ev.dataTransfer.effectAllowed = "move";
        ev.dataTransfer?.setDragImage(el, 12, el.offsetHeight / 2);
      });
      grip.addEventListener("dragend", () => {
        this.dragFrom = null;
        list.findAll(".ped-order-row").forEach((r) => {
          r.removeClass("is-dragging");
          r.removeClass("drop-above");
          r.removeClass("drop-below");
        });
      });
      el.addEventListener("dragover", (ev) => {
        if (this.dragFrom === null) return;
        ev.preventDefault();
        if (ev.dataTransfer) ev.dataTransfer.dropEffect = "move";
        const r = el.getBoundingClientRect();
        const below = ev.clientY > r.top + r.height / 2;
        el.toggleClass("drop-above", !below);
        el.toggleClass("drop-below", below);
      });
      el.addEventListener("dragleave", () => {
        el.removeClass("drop-above");
        el.removeClass("drop-below");
      });
      el.addEventListener("drop", (ev) => {
        ev.preventDefault();
        if (this.dragFrom === null) return;
        const r = el.getBoundingClientRect();
        const below = ev.clientY > r.top + r.height / 2;
        const next = moveItem(order, this.dragFrom, below ? i + 1 : i);
        this.dragFrom = null;
        s.buttonOrder = next;
        save();
        this.plugin.rebuildToolbars();
        this.redrawButtonOrder();
      });
      if (id === "|") {
        row.addExtraButton(
          (b) => b.setIcon("trash-2").setTooltip("Remove this divider").onClick(() => {
            const next = order.slice();
            next.splice(i, 1);
            s.buttonOrder = next;
            save();
            this.plugin.rebuildToolbars();
            this.redrawButtonOrder();
          })
        );
        return;
      }
      row.addToggle(
        (t) => t.setValue(!hidden.has(id)).onChange((v) => {
          if (v) hidden.delete(id);
          else hidden.add(id);
          s.hiddenButtons = [...hidden];
          save();
          this.plugin.rebuildToolbars();
        })
      );
    });
  }
};

/* nosourcemap */