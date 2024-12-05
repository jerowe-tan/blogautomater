var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
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
var __copyProps = (to, from2, except, desc) => {
  if (from2 && typeof from2 === "object" || typeof from2 === "function") {
    for (let key of __getOwnPropNames(from2))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from2[key], enumerable: !(desc = __getOwnPropDesc(from2, key)) || desc.enumerable });
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
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};

// .wrangler/tmp/bundle-IO8iRY/checked-fetch.js
function checkURL(request, init2) {
  const url = request instanceof URL ? request : new URL(
    (typeof request === "string" ? new Request(request, init2) : request).url
  );
  if (url.port && url.port !== "443" && url.protocol === "https:") {
    if (!urls.has(url.toString())) {
      urls.add(url.toString());
      console.warn(
        `WARNING: known issue with \`fetch()\` requests to custom HTTPS ports in published Workers:
 - ${url.toString()} - the custom port will be ignored when the Worker is published using the \`wrangler deploy\` command.
`
      );
    }
  }
}
var urls;
var init_checked_fetch = __esm({
  ".wrangler/tmp/bundle-IO8iRY/checked-fetch.js"() {
    "use strict";
    urls = /* @__PURE__ */ new Set();
    __name(checkURL, "checkURL");
    globalThis.fetch = new Proxy(globalThis.fetch, {
      apply(target, thisArg, argArray) {
        const [request, init2] = argArray;
        checkURL(request, init2);
        return Reflect.apply(target, thisArg, argArray);
      }
    });
  }
});

// node_modules/@esbuild-plugins/node-globals-polyfill/process.js
function defaultSetTimout() {
  throw new Error("setTimeout has not been defined");
}
function defaultClearTimeout() {
  throw new Error("clearTimeout has not been defined");
}
function runTimeout(fun) {
  if (cachedSetTimeout === setTimeout) {
    return setTimeout(fun, 0);
  }
  if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
    cachedSetTimeout = setTimeout;
    return setTimeout(fun, 0);
  }
  try {
    return cachedSetTimeout(fun, 0);
  } catch (e) {
    try {
      return cachedSetTimeout.call(null, fun, 0);
    } catch (e2) {
      return cachedSetTimeout.call(this, fun, 0);
    }
  }
}
function runClearTimeout(marker) {
  if (cachedClearTimeout === clearTimeout) {
    return clearTimeout(marker);
  }
  if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
    cachedClearTimeout = clearTimeout;
    return clearTimeout(marker);
  }
  try {
    return cachedClearTimeout(marker);
  } catch (e) {
    try {
      return cachedClearTimeout.call(null, marker);
    } catch (e2) {
      return cachedClearTimeout.call(this, marker);
    }
  }
}
function cleanUpNextTick() {
  if (!draining || !currentQueue) {
    return;
  }
  draining = false;
  if (currentQueue.length) {
    queue = currentQueue.concat(queue);
  } else {
    queueIndex = -1;
  }
  if (queue.length) {
    drainQueue();
  }
}
function drainQueue() {
  if (draining) {
    return;
  }
  var timeout = runTimeout(cleanUpNextTick);
  draining = true;
  var len = queue.length;
  while (len) {
    currentQueue = queue;
    queue = [];
    while (++queueIndex < len) {
      if (currentQueue) {
        currentQueue[queueIndex].run();
      }
    }
    queueIndex = -1;
    len = queue.length;
  }
  currentQueue = null;
  draining = false;
  runClearTimeout(timeout);
}
function nextTick(fun) {
  var args = new Array(arguments.length - 1);
  if (arguments.length > 1) {
    for (var i = 1; i < arguments.length; i++) {
      args[i - 1] = arguments[i];
    }
  }
  queue.push(new Item(fun, args));
  if (queue.length === 1 && !draining) {
    runTimeout(drainQueue);
  }
}
function Item(fun, array) {
  this.fun = fun;
  this.array = array;
}
function noop() {
}
function binding(name) {
  throw new Error("process.binding is not supported");
}
function cwd() {
  return "/";
}
function chdir(dir) {
  throw new Error("process.chdir is not supported");
}
function umask() {
  return 0;
}
function hrtime(previousTimestamp) {
  var clocktime = performanceNow.call(performance2) * 1e-3;
  var seconds = Math.floor(clocktime);
  var nanoseconds = Math.floor(clocktime % 1 * 1e9);
  if (previousTimestamp) {
    seconds = seconds - previousTimestamp[0];
    nanoseconds = nanoseconds - previousTimestamp[1];
    if (nanoseconds < 0) {
      seconds--;
      nanoseconds += 1e9;
    }
  }
  return [seconds, nanoseconds];
}
function uptime() {
  var currentTime = /* @__PURE__ */ new Date();
  var dif = currentTime - startTime;
  return dif / 1e3;
}
var cachedSetTimeout, cachedClearTimeout, queue, draining, currentQueue, queueIndex, title, platform, browser, env, argv, version, versions, release, config, on, addListener, once, off, removeListener, removeAllListeners, emit, performance2, performanceNow, startTime, process, defines;
var init_process = __esm({
  "node_modules/@esbuild-plugins/node-globals-polyfill/process.js"() {
    __name(defaultSetTimout, "defaultSetTimout");
    __name(defaultClearTimeout, "defaultClearTimeout");
    cachedSetTimeout = defaultSetTimout;
    cachedClearTimeout = defaultClearTimeout;
    if (typeof globalThis.setTimeout === "function") {
      cachedSetTimeout = setTimeout;
    }
    if (typeof globalThis.clearTimeout === "function") {
      cachedClearTimeout = clearTimeout;
    }
    __name(runTimeout, "runTimeout");
    __name(runClearTimeout, "runClearTimeout");
    queue = [];
    draining = false;
    queueIndex = -1;
    __name(cleanUpNextTick, "cleanUpNextTick");
    __name(drainQueue, "drainQueue");
    __name(nextTick, "nextTick");
    __name(Item, "Item");
    Item.prototype.run = function() {
      this.fun.apply(null, this.array);
    };
    title = "browser";
    platform = "browser";
    browser = true;
    env = {};
    argv = [];
    version = "";
    versions = {};
    release = {};
    config = {};
    __name(noop, "noop");
    on = noop;
    addListener = noop;
    once = noop;
    off = noop;
    removeListener = noop;
    removeAllListeners = noop;
    emit = noop;
    __name(binding, "binding");
    __name(cwd, "cwd");
    __name(chdir, "chdir");
    __name(umask, "umask");
    performance2 = globalThis.performance || {};
    performanceNow = performance2.now || performance2.mozNow || performance2.msNow || performance2.oNow || performance2.webkitNow || function() {
      return (/* @__PURE__ */ new Date()).getTime();
    };
    __name(hrtime, "hrtime");
    startTime = /* @__PURE__ */ new Date();
    __name(uptime, "uptime");
    process = {
      nextTick,
      title,
      browser,
      env,
      argv,
      version,
      versions,
      on,
      addListener,
      once,
      off,
      removeListener,
      removeAllListeners,
      emit,
      binding,
      cwd,
      chdir,
      umask,
      hrtime,
      platform,
      release,
      config,
      uptime
    };
    defines = {};
    Object.keys(defines).forEach((key) => {
      const segs = key.split(".");
      let target = process;
      for (let i = 0; i < segs.length; i++) {
        const seg = segs[i];
        if (i === segs.length - 1) {
          target[seg] = defines[key];
        } else {
          target = target[seg] || (target[seg] = {});
        }
      }
    });
  }
});

// node_modules/@esbuild-plugins/node-globals-polyfill/Buffer.js
function init() {
  inited = true;
  var code = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  for (var i = 0, len = code.length; i < len; ++i) {
    lookup[i] = code[i];
    revLookup[code.charCodeAt(i)] = i;
  }
  revLookup["-".charCodeAt(0)] = 62;
  revLookup["_".charCodeAt(0)] = 63;
}
function base64toByteArray(b64) {
  if (!inited) {
    init();
  }
  var i, j, l, tmp, placeHolders, arr;
  var len = b64.length;
  if (len % 4 > 0) {
    throw new Error("Invalid string. Length must be a multiple of 4");
  }
  placeHolders = b64[len - 2] === "=" ? 2 : b64[len - 1] === "=" ? 1 : 0;
  arr = new Arr(len * 3 / 4 - placeHolders);
  l = placeHolders > 0 ? len - 4 : len;
  var L = 0;
  for (i = 0, j = 0; i < l; i += 4, j += 3) {
    tmp = revLookup[b64.charCodeAt(i)] << 18 | revLookup[b64.charCodeAt(i + 1)] << 12 | revLookup[b64.charCodeAt(i + 2)] << 6 | revLookup[b64.charCodeAt(i + 3)];
    arr[L++] = tmp >> 16 & 255;
    arr[L++] = tmp >> 8 & 255;
    arr[L++] = tmp & 255;
  }
  if (placeHolders === 2) {
    tmp = revLookup[b64.charCodeAt(i)] << 2 | revLookup[b64.charCodeAt(i + 1)] >> 4;
    arr[L++] = tmp & 255;
  } else if (placeHolders === 1) {
    tmp = revLookup[b64.charCodeAt(i)] << 10 | revLookup[b64.charCodeAt(i + 1)] << 4 | revLookup[b64.charCodeAt(i + 2)] >> 2;
    arr[L++] = tmp >> 8 & 255;
    arr[L++] = tmp & 255;
  }
  return arr;
}
function tripletToBase64(num) {
  return lookup[num >> 18 & 63] + lookup[num >> 12 & 63] + lookup[num >> 6 & 63] + lookup[num & 63];
}
function encodeChunk(uint8, start, end) {
  var tmp;
  var output = [];
  for (var i = start; i < end; i += 3) {
    tmp = (uint8[i] << 16) + (uint8[i + 1] << 8) + uint8[i + 2];
    output.push(tripletToBase64(tmp));
  }
  return output.join("");
}
function base64fromByteArray(uint8) {
  if (!inited) {
    init();
  }
  var tmp;
  var len = uint8.length;
  var extraBytes = len % 3;
  var output = "";
  var parts = [];
  var maxChunkLength = 16383;
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(
      encodeChunk(
        uint8,
        i,
        i + maxChunkLength > len2 ? len2 : i + maxChunkLength
      )
    );
  }
  if (extraBytes === 1) {
    tmp = uint8[len - 1];
    output += lookup[tmp >> 2];
    output += lookup[tmp << 4 & 63];
    output += "==";
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1];
    output += lookup[tmp >> 10];
    output += lookup[tmp >> 4 & 63];
    output += lookup[tmp << 2 & 63];
    output += "=";
  }
  parts.push(output);
  return parts.join("");
}
function kMaxLength() {
  return Buffer2.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823;
}
function createBuffer(that, length) {
  if (kMaxLength() < length) {
    throw new RangeError("Invalid typed array length");
  }
  if (Buffer2.TYPED_ARRAY_SUPPORT) {
    that = new Uint8Array(length);
    that.__proto__ = Buffer2.prototype;
  } else {
    if (that === null) {
      that = new Buffer2(length);
    }
    that.length = length;
  }
  return that;
}
function Buffer2(arg, encodingOrOffset, length) {
  if (!Buffer2.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer2)) {
    return new Buffer2(arg, encodingOrOffset, length);
  }
  if (typeof arg === "number") {
    if (typeof encodingOrOffset === "string") {
      throw new Error(
        "If encoding is specified then the first argument must be a string"
      );
    }
    return allocUnsafe(this, arg);
  }
  return from(this, arg, encodingOrOffset, length);
}
function from(that, value, encodingOrOffset, length) {
  if (typeof value === "number") {
    throw new TypeError('"value" argument must not be a number');
  }
  if (typeof ArrayBuffer !== "undefined" && value instanceof ArrayBuffer) {
    return fromArrayBuffer(that, value, encodingOrOffset, length);
  }
  if (typeof value === "string") {
    return fromString(that, value, encodingOrOffset);
  }
  return fromObject(that, value);
}
function assertSize(size) {
  if (typeof size !== "number") {
    throw new TypeError('"size" argument must be a number');
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative');
  }
}
function alloc(that, size, fill2, encoding) {
  assertSize(size);
  if (size <= 0) {
    return createBuffer(that, size);
  }
  if (fill2 !== void 0) {
    return typeof encoding === "string" ? createBuffer(that, size).fill(fill2, encoding) : createBuffer(that, size).fill(fill2);
  }
  return createBuffer(that, size);
}
function allocUnsafe(that, size) {
  assertSize(size);
  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0);
  if (!Buffer2.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < size; ++i) {
      that[i] = 0;
    }
  }
  return that;
}
function fromString(that, string, encoding) {
  if (typeof encoding !== "string" || encoding === "") {
    encoding = "utf8";
  }
  if (!Buffer2.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding');
  }
  var length = byteLength(string, encoding) | 0;
  that = createBuffer(that, length);
  var actual = that.write(string, encoding);
  if (actual !== length) {
    that = that.slice(0, actual);
  }
  return that;
}
function fromArrayLike(that, array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0;
  that = createBuffer(that, length);
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255;
  }
  return that;
}
function fromArrayBuffer(that, array, byteOffset, length) {
  array.byteLength;
  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError("'offset' is out of bounds");
  }
  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError("'length' is out of bounds");
  }
  if (byteOffset === void 0 && length === void 0) {
    array = new Uint8Array(array);
  } else if (length === void 0) {
    array = new Uint8Array(array, byteOffset);
  } else {
    array = new Uint8Array(array, byteOffset, length);
  }
  if (Buffer2.TYPED_ARRAY_SUPPORT) {
    that = array;
    that.__proto__ = Buffer2.prototype;
  } else {
    that = fromArrayLike(that, array);
  }
  return that;
}
function fromObject(that, obj) {
  if (internalIsBuffer(obj)) {
    var len = checked(obj.length) | 0;
    that = createBuffer(that, len);
    if (that.length === 0) {
      return that;
    }
    obj.copy(that, 0, 0, len);
    return that;
  }
  if (obj) {
    if (typeof ArrayBuffer !== "undefined" && obj.buffer instanceof ArrayBuffer || "length" in obj) {
      if (typeof obj.length !== "number" || isnan(obj.length)) {
        return createBuffer(that, 0);
      }
      return fromArrayLike(that, obj);
    }
    if (obj.type === "Buffer" && Array.isArray(obj.data)) {
      return fromArrayLike(that, obj.data);
    }
  }
  throw new TypeError(
    "First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object."
  );
}
function checked(length) {
  if (length >= kMaxLength()) {
    throw new RangeError(
      "Attempt to allocate Buffer larger than maximum size: 0x" + kMaxLength().toString(16) + " bytes"
    );
  }
  return length | 0;
}
function internalIsBuffer(b) {
  return !!(b != null && b._isBuffer);
}
function byteLength(string, encoding) {
  if (internalIsBuffer(string)) {
    return string.length;
  }
  if (typeof ArrayBuffer !== "undefined" && typeof ArrayBuffer.isView === "function" && (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
    return string.byteLength;
  }
  if (typeof string !== "string") {
    string = "" + string;
  }
  var len = string.length;
  if (len === 0)
    return 0;
  var loweredCase = false;
  for (; ; ) {
    switch (encoding) {
      case "ascii":
      case "latin1":
      case "binary":
        return len;
      case "utf8":
      case "utf-8":
      case void 0:
        return utf8ToBytes(string).length;
      case "ucs2":
      case "ucs-2":
      case "utf16le":
      case "utf-16le":
        return len * 2;
      case "hex":
        return len >>> 1;
      case "base64":
        return base64ToBytes(string).length;
      default:
        if (loweredCase)
          return utf8ToBytes(string).length;
        encoding = ("" + encoding).toLowerCase();
        loweredCase = true;
    }
  }
}
function slowToString(encoding, start, end) {
  var loweredCase = false;
  if (start === void 0 || start < 0) {
    start = 0;
  }
  if (start > this.length) {
    return "";
  }
  if (end === void 0 || end > this.length) {
    end = this.length;
  }
  if (end <= 0) {
    return "";
  }
  end >>>= 0;
  start >>>= 0;
  if (end <= start) {
    return "";
  }
  if (!encoding)
    encoding = "utf8";
  while (true) {
    switch (encoding) {
      case "hex":
        return hexSlice(this, start, end);
      case "utf8":
      case "utf-8":
        return utf8Slice(this, start, end);
      case "ascii":
        return asciiSlice(this, start, end);
      case "latin1":
      case "binary":
        return latin1Slice(this, start, end);
      case "base64":
        return base64Slice(this, start, end);
      case "ucs2":
      case "ucs-2":
      case "utf16le":
      case "utf-16le":
        return utf16leSlice(this, start, end);
      default:
        if (loweredCase)
          throw new TypeError("Unknown encoding: " + encoding);
        encoding = (encoding + "").toLowerCase();
        loweredCase = true;
    }
  }
}
function swap(b, n, m) {
  var i = b[n];
  b[n] = b[m];
  b[m] = i;
}
function bidirectionalIndexOf(buffer, val, byteOffset, encoding, dir) {
  if (buffer.length === 0)
    return -1;
  if (typeof byteOffset === "string") {
    encoding = byteOffset;
    byteOffset = 0;
  } else if (byteOffset > 2147483647) {
    byteOffset = 2147483647;
  } else if (byteOffset < -2147483648) {
    byteOffset = -2147483648;
  }
  byteOffset = +byteOffset;
  if (isNaN(byteOffset)) {
    byteOffset = dir ? 0 : buffer.length - 1;
  }
  if (byteOffset < 0)
    byteOffset = buffer.length + byteOffset;
  if (byteOffset >= buffer.length) {
    if (dir)
      return -1;
    else
      byteOffset = buffer.length - 1;
  } else if (byteOffset < 0) {
    if (dir)
      byteOffset = 0;
    else
      return -1;
  }
  if (typeof val === "string") {
    val = Buffer2.from(val, encoding);
  }
  if (internalIsBuffer(val)) {
    if (val.length === 0) {
      return -1;
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir);
  } else if (typeof val === "number") {
    val = val & 255;
    if (Buffer2.TYPED_ARRAY_SUPPORT && typeof Uint8Array.prototype.indexOf === "function") {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(
          buffer,
          val,
          byteOffset
        );
      } else {
        return Uint8Array.prototype.lastIndexOf.call(
          buffer,
          val,
          byteOffset
        );
      }
    }
    return arrayIndexOf(buffer, [val], byteOffset, encoding, dir);
  }
  throw new TypeError("val must be string, number or Buffer");
}
function arrayIndexOf(arr, val, byteOffset, encoding, dir) {
  var indexSize = 1;
  var arrLength = arr.length;
  var valLength = val.length;
  if (encoding !== void 0) {
    encoding = String(encoding).toLowerCase();
    if (encoding === "ucs2" || encoding === "ucs-2" || encoding === "utf16le" || encoding === "utf-16le") {
      if (arr.length < 2 || val.length < 2) {
        return -1;
      }
      indexSize = 2;
      arrLength /= 2;
      valLength /= 2;
      byteOffset /= 2;
    }
  }
  function read(buf, i2) {
    if (indexSize === 1) {
      return buf[i2];
    } else {
      return buf.readUInt16BE(i2 * indexSize);
    }
  }
  __name(read, "read");
  var i;
  if (dir) {
    var foundIndex = -1;
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1)
          foundIndex = i;
        if (i - foundIndex + 1 === valLength)
          return foundIndex * indexSize;
      } else {
        if (foundIndex !== -1)
          i -= i - foundIndex;
        foundIndex = -1;
      }
    }
  } else {
    if (byteOffset + valLength > arrLength)
      byteOffset = arrLength - valLength;
    for (i = byteOffset; i >= 0; i--) {
      var found = true;
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false;
          break;
        }
      }
      if (found)
        return i;
    }
  }
  return -1;
}
function hexWrite(buf, string, offset, length) {
  offset = Number(offset) || 0;
  var remaining = buf.length - offset;
  if (!length) {
    length = remaining;
  } else {
    length = Number(length);
    if (length > remaining) {
      length = remaining;
    }
  }
  var strLen = string.length;
  if (strLen % 2 !== 0)
    throw new TypeError("Invalid hex string");
  if (length > strLen / 2) {
    length = strLen / 2;
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16);
    if (isNaN(parsed))
      return i;
    buf[offset + i] = parsed;
  }
  return i;
}
function utf8Write(buf, string, offset, length) {
  return blitBuffer(
    utf8ToBytes(string, buf.length - offset),
    buf,
    offset,
    length
  );
}
function asciiWrite(buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length);
}
function latin1Write(buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length);
}
function base64Write(buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length);
}
function ucs2Write(buf, string, offset, length) {
  return blitBuffer(
    utf16leToBytes(string, buf.length - offset),
    buf,
    offset,
    length
  );
}
function base64Slice(buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64fromByteArray(buf);
  } else {
    return base64fromByteArray(buf.slice(start, end));
  }
}
function utf8Slice(buf, start, end) {
  end = Math.min(buf.length, end);
  var res = [];
  var i = start;
  while (i < end) {
    var firstByte = buf[i];
    var codePoint = null;
    var bytesPerSequence = firstByte > 239 ? 4 : firstByte > 223 ? 3 : firstByte > 191 ? 2 : 1;
    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint;
      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 128) {
            codePoint = firstByte;
          }
          break;
        case 2:
          secondByte = buf[i + 1];
          if ((secondByte & 192) === 128) {
            tempCodePoint = (firstByte & 31) << 6 | secondByte & 63;
            if (tempCodePoint > 127) {
              codePoint = tempCodePoint;
            }
          }
          break;
        case 3:
          secondByte = buf[i + 1];
          thirdByte = buf[i + 2];
          if ((secondByte & 192) === 128 && (thirdByte & 192) === 128) {
            tempCodePoint = (firstByte & 15) << 12 | (secondByte & 63) << 6 | thirdByte & 63;
            if (tempCodePoint > 2047 && (tempCodePoint < 55296 || tempCodePoint > 57343)) {
              codePoint = tempCodePoint;
            }
          }
          break;
        case 4:
          secondByte = buf[i + 1];
          thirdByte = buf[i + 2];
          fourthByte = buf[i + 3];
          if ((secondByte & 192) === 128 && (thirdByte & 192) === 128 && (fourthByte & 192) === 128) {
            tempCodePoint = (firstByte & 15) << 18 | (secondByte & 63) << 12 | (thirdByte & 63) << 6 | fourthByte & 63;
            if (tempCodePoint > 65535 && tempCodePoint < 1114112) {
              codePoint = tempCodePoint;
            }
          }
      }
    }
    if (codePoint === null) {
      codePoint = 65533;
      bytesPerSequence = 1;
    } else if (codePoint > 65535) {
      codePoint -= 65536;
      res.push(codePoint >>> 10 & 1023 | 55296);
      codePoint = 56320 | codePoint & 1023;
    }
    res.push(codePoint);
    i += bytesPerSequence;
  }
  return decodeCodePointsArray(res);
}
function decodeCodePointsArray(codePoints) {
  var len = codePoints.length;
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints);
  }
  var res = "";
  var i = 0;
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    );
  }
  return res;
}
function asciiSlice(buf, start, end) {
  var ret = "";
  end = Math.min(buf.length, end);
  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 127);
  }
  return ret;
}
function latin1Slice(buf, start, end) {
  var ret = "";
  end = Math.min(buf.length, end);
  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i]);
  }
  return ret;
}
function hexSlice(buf, start, end) {
  var len = buf.length;
  if (!start || start < 0)
    start = 0;
  if (!end || end < 0 || end > len)
    end = len;
  var out = "";
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i]);
  }
  return out;
}
function utf16leSlice(buf, start, end) {
  var bytes = buf.slice(start, end);
  var res = "";
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256);
  }
  return res;
}
function checkOffset(offset, ext, length) {
  if (offset % 1 !== 0 || offset < 0)
    throw new RangeError("offset is not uint");
  if (offset + ext > length)
    throw new RangeError("Trying to access beyond buffer length");
}
function checkInt(buf, value, offset, ext, max, min) {
  if (!internalIsBuffer(buf))
    throw new TypeError('"buffer" argument must be a Buffer instance');
  if (value > max || value < min)
    throw new RangeError('"value" argument is out of bounds');
  if (offset + ext > buf.length)
    throw new RangeError("Index out of range");
}
function objectWriteUInt16(buf, value, offset, littleEndian) {
  if (value < 0)
    value = 65535 + value + 1;
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
    buf[offset + i] = (value & 255 << 8 * (littleEndian ? i : 1 - i)) >>> (littleEndian ? i : 1 - i) * 8;
  }
}
function objectWriteUInt32(buf, value, offset, littleEndian) {
  if (value < 0)
    value = 4294967295 + value + 1;
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
    buf[offset + i] = value >>> (littleEndian ? i : 3 - i) * 8 & 255;
  }
}
function checkIEEE754(buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length)
    throw new RangeError("Index out of range");
  if (offset < 0)
    throw new RangeError("Index out of range");
}
function writeFloat(buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(
      buf,
      value,
      offset,
      4,
      34028234663852886e22,
      -34028234663852886e22
    );
  }
  ieee754write(buf, value, offset, littleEndian, 23, 4);
  return offset + 4;
}
function writeDouble(buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(
      buf,
      value,
      offset,
      8,
      17976931348623157e292,
      -17976931348623157e292
    );
  }
  ieee754write(buf, value, offset, littleEndian, 52, 8);
  return offset + 8;
}
function base64clean(str) {
  str = stringtrim(str).replace(INVALID_BASE64_RE, "");
  if (str.length < 2)
    return "";
  while (str.length % 4 !== 0) {
    str = str + "=";
  }
  return str;
}
function stringtrim(str) {
  if (str.trim)
    return str.trim();
  return str.replace(/^\s+|\s+$/g, "");
}
function toHex(n) {
  if (n < 16)
    return "0" + n.toString(16);
  return n.toString(16);
}
function utf8ToBytes(string, units) {
  units = units || Infinity;
  var codePoint;
  var length = string.length;
  var leadSurrogate = null;
  var bytes = [];
  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i);
    if (codePoint > 55295 && codePoint < 57344) {
      if (!leadSurrogate) {
        if (codePoint > 56319) {
          if ((units -= 3) > -1)
            bytes.push(239, 191, 189);
          continue;
        } else if (i + 1 === length) {
          if ((units -= 3) > -1)
            bytes.push(239, 191, 189);
          continue;
        }
        leadSurrogate = codePoint;
        continue;
      }
      if (codePoint < 56320) {
        if ((units -= 3) > -1)
          bytes.push(239, 191, 189);
        leadSurrogate = codePoint;
        continue;
      }
      codePoint = (leadSurrogate - 55296 << 10 | codePoint - 56320) + 65536;
    } else if (leadSurrogate) {
      if ((units -= 3) > -1)
        bytes.push(239, 191, 189);
    }
    leadSurrogate = null;
    if (codePoint < 128) {
      if ((units -= 1) < 0)
        break;
      bytes.push(codePoint);
    } else if (codePoint < 2048) {
      if ((units -= 2) < 0)
        break;
      bytes.push(codePoint >> 6 | 192, codePoint & 63 | 128);
    } else if (codePoint < 65536) {
      if ((units -= 3) < 0)
        break;
      bytes.push(
        codePoint >> 12 | 224,
        codePoint >> 6 & 63 | 128,
        codePoint & 63 | 128
      );
    } else if (codePoint < 1114112) {
      if ((units -= 4) < 0)
        break;
      bytes.push(
        codePoint >> 18 | 240,
        codePoint >> 12 & 63 | 128,
        codePoint >> 6 & 63 | 128,
        codePoint & 63 | 128
      );
    } else {
      throw new Error("Invalid code point");
    }
  }
  return bytes;
}
function asciiToBytes(str) {
  var byteArray = [];
  for (var i = 0; i < str.length; ++i) {
    byteArray.push(str.charCodeAt(i) & 255);
  }
  return byteArray;
}
function utf16leToBytes(str, units) {
  var c, hi, lo;
  var byteArray = [];
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0)
      break;
    c = str.charCodeAt(i);
    hi = c >> 8;
    lo = c % 256;
    byteArray.push(lo);
    byteArray.push(hi);
  }
  return byteArray;
}
function base64ToBytes(str) {
  return base64toByteArray(base64clean(str));
}
function blitBuffer(src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if (i + offset >= dst.length || i >= src.length)
      break;
    dst[i + offset] = src[i];
  }
  return i;
}
function isnan(val) {
  return val !== val;
}
function isBuffer(obj) {
  return obj != null && (!!obj._isBuffer || isFastBuffer(obj) || isSlowBuffer(obj));
}
function isFastBuffer(obj) {
  return !!obj.constructor && typeof obj.constructor.isBuffer === "function" && obj.constructor.isBuffer(obj);
}
function isSlowBuffer(obj) {
  return typeof obj.readFloatLE === "function" && typeof obj.slice === "function" && isFastBuffer(obj.slice(0, 0));
}
function ieee754read(buffer, offset, isLE, mLen, nBytes) {
  var e, m;
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var nBits = -7;
  var i = isLE ? nBytes - 1 : 0;
  var d = isLE ? -1 : 1;
  var s = buffer[offset + i];
  i += d;
  e = s & (1 << -nBits) - 1;
  s >>= -nBits;
  nBits += eLen;
  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {
  }
  m = e & (1 << -nBits) - 1;
  e >>= -nBits;
  nBits += mLen;
  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {
  }
  if (e === 0) {
    e = 1 - eBias;
  } else if (e === eMax) {
    return m ? NaN : (s ? -1 : 1) * Infinity;
  } else {
    m = m + Math.pow(2, mLen);
    e = e - eBias;
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
}
function ieee754write(buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c;
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var rt = mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
  var i = isLE ? 0 : nBytes - 1;
  var d = isLE ? 1 : -1;
  var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
  value = Math.abs(value);
  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0;
    e = eMax;
  } else {
    e = Math.floor(Math.log(value) / Math.LN2);
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--;
      c *= 2;
    }
    if (e + eBias >= 1) {
      value += rt / c;
    } else {
      value += rt * Math.pow(2, 1 - eBias);
    }
    if (value * c >= 2) {
      e++;
      c /= 2;
    }
    if (e + eBias >= eMax) {
      m = 0;
      e = eMax;
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * Math.pow(2, mLen);
      e = e + eBias;
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
      e = 0;
    }
  }
  for (; mLen >= 8; buffer[offset + i] = m & 255, i += d, m /= 256, mLen -= 8) {
  }
  e = e << mLen | m;
  eLen += mLen;
  for (; eLen > 0; buffer[offset + i] = e & 255, i += d, e /= 256, eLen -= 8) {
  }
  buffer[offset + i - d] |= s * 128;
}
var lookup, revLookup, Arr, inited, MAX_ARGUMENTS_LENGTH, INVALID_BASE64_RE;
var init_Buffer = __esm({
  "node_modules/@esbuild-plugins/node-globals-polyfill/Buffer.js"() {
    init_checked_fetch();
    init_modules_watch_stub();
    init_process();
    init_buffer();
    lookup = [];
    revLookup = [];
    Arr = typeof Uint8Array !== "undefined" ? Uint8Array : Array;
    inited = false;
    __name(init, "init");
    __name(base64toByteArray, "base64toByteArray");
    __name(tripletToBase64, "tripletToBase64");
    __name(encodeChunk, "encodeChunk");
    __name(base64fromByteArray, "base64fromByteArray");
    Buffer2.TYPED_ARRAY_SUPPORT = globalThis.TYPED_ARRAY_SUPPORT !== void 0 ? globalThis.TYPED_ARRAY_SUPPORT : true;
    __name(kMaxLength, "kMaxLength");
    __name(createBuffer, "createBuffer");
    __name(Buffer2, "Buffer");
    Buffer2.poolSize = 8192;
    Buffer2._augment = function(arr) {
      arr.__proto__ = Buffer2.prototype;
      return arr;
    };
    __name(from, "from");
    Buffer2.from = function(value, encodingOrOffset, length) {
      return from(null, value, encodingOrOffset, length);
    };
    Buffer2.kMaxLength = kMaxLength();
    if (Buffer2.TYPED_ARRAY_SUPPORT) {
      Buffer2.prototype.__proto__ = Uint8Array.prototype;
      Buffer2.__proto__ = Uint8Array;
      if (typeof Symbol !== "undefined" && Symbol.species && Buffer2[Symbol.species] === Buffer2) {
      }
    }
    __name(assertSize, "assertSize");
    __name(alloc, "alloc");
    Buffer2.alloc = function(size, fill2, encoding) {
      return alloc(null, size, fill2, encoding);
    };
    __name(allocUnsafe, "allocUnsafe");
    Buffer2.allocUnsafe = function(size) {
      return allocUnsafe(null, size);
    };
    Buffer2.allocUnsafeSlow = function(size) {
      return allocUnsafe(null, size);
    };
    __name(fromString, "fromString");
    __name(fromArrayLike, "fromArrayLike");
    __name(fromArrayBuffer, "fromArrayBuffer");
    __name(fromObject, "fromObject");
    __name(checked, "checked");
    Buffer2.isBuffer = isBuffer;
    __name(internalIsBuffer, "internalIsBuffer");
    Buffer2.compare = /* @__PURE__ */ __name(function compare(a, b) {
      if (!internalIsBuffer(a) || !internalIsBuffer(b)) {
        throw new TypeError("Arguments must be Buffers");
      }
      if (a === b)
        return 0;
      var x = a.length;
      var y = b.length;
      for (var i = 0, len = Math.min(x, y); i < len; ++i) {
        if (a[i] !== b[i]) {
          x = a[i];
          y = b[i];
          break;
        }
      }
      if (x < y)
        return -1;
      if (y < x)
        return 1;
      return 0;
    }, "compare");
    Buffer2.isEncoding = /* @__PURE__ */ __name(function isEncoding(encoding) {
      switch (String(encoding).toLowerCase()) {
        case "hex":
        case "utf8":
        case "utf-8":
        case "ascii":
        case "latin1":
        case "binary":
        case "base64":
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return true;
        default:
          return false;
      }
    }, "isEncoding");
    Buffer2.concat = /* @__PURE__ */ __name(function concat(list, length) {
      if (!Array.isArray(list)) {
        throw new TypeError('"list" argument must be an Array of Buffers');
      }
      if (list.length === 0) {
        return Buffer2.alloc(0);
      }
      var i;
      if (length === void 0) {
        length = 0;
        for (i = 0; i < list.length; ++i) {
          length += list[i].length;
        }
      }
      var buffer = Buffer2.allocUnsafe(length);
      var pos = 0;
      for (i = 0; i < list.length; ++i) {
        var buf = list[i];
        if (!internalIsBuffer(buf)) {
          throw new TypeError('"list" argument must be an Array of Buffers');
        }
        buf.copy(buffer, pos);
        pos += buf.length;
      }
      return buffer;
    }, "concat");
    __name(byteLength, "byteLength");
    Buffer2.byteLength = byteLength;
    __name(slowToString, "slowToString");
    Buffer2.prototype._isBuffer = true;
    __name(swap, "swap");
    Buffer2.prototype.swap16 = /* @__PURE__ */ __name(function swap16() {
      var len = this.length;
      if (len % 2 !== 0) {
        throw new RangeError("Buffer size must be a multiple of 16-bits");
      }
      for (var i = 0; i < len; i += 2) {
        swap(this, i, i + 1);
      }
      return this;
    }, "swap16");
    Buffer2.prototype.swap32 = /* @__PURE__ */ __name(function swap32() {
      var len = this.length;
      if (len % 4 !== 0) {
        throw new RangeError("Buffer size must be a multiple of 32-bits");
      }
      for (var i = 0; i < len; i += 4) {
        swap(this, i, i + 3);
        swap(this, i + 1, i + 2);
      }
      return this;
    }, "swap32");
    Buffer2.prototype.swap64 = /* @__PURE__ */ __name(function swap64() {
      var len = this.length;
      if (len % 8 !== 0) {
        throw new RangeError("Buffer size must be a multiple of 64-bits");
      }
      for (var i = 0; i < len; i += 8) {
        swap(this, i, i + 7);
        swap(this, i + 1, i + 6);
        swap(this, i + 2, i + 5);
        swap(this, i + 3, i + 4);
      }
      return this;
    }, "swap64");
    Buffer2.prototype.toString = /* @__PURE__ */ __name(function toString() {
      var length = this.length | 0;
      if (length === 0)
        return "";
      if (arguments.length === 0)
        return utf8Slice(this, 0, length);
      return slowToString.apply(this, arguments);
    }, "toString");
    Buffer2.prototype.equals = /* @__PURE__ */ __name(function equals(b) {
      if (!internalIsBuffer(b))
        throw new TypeError("Argument must be a Buffer");
      if (this === b)
        return true;
      return Buffer2.compare(this, b) === 0;
    }, "equals");
    Buffer2.prototype.compare = /* @__PURE__ */ __name(function compare2(target, start, end, thisStart, thisEnd) {
      if (!internalIsBuffer(target)) {
        throw new TypeError("Argument must be a Buffer");
      }
      if (start === void 0) {
        start = 0;
      }
      if (end === void 0) {
        end = target ? target.length : 0;
      }
      if (thisStart === void 0) {
        thisStart = 0;
      }
      if (thisEnd === void 0) {
        thisEnd = this.length;
      }
      if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
        throw new RangeError("out of range index");
      }
      if (thisStart >= thisEnd && start >= end) {
        return 0;
      }
      if (thisStart >= thisEnd) {
        return -1;
      }
      if (start >= end) {
        return 1;
      }
      start >>>= 0;
      end >>>= 0;
      thisStart >>>= 0;
      thisEnd >>>= 0;
      if (this === target)
        return 0;
      var x = thisEnd - thisStart;
      var y = end - start;
      var len = Math.min(x, y);
      var thisCopy = this.slice(thisStart, thisEnd);
      var targetCopy = target.slice(start, end);
      for (var i = 0; i < len; ++i) {
        if (thisCopy[i] !== targetCopy[i]) {
          x = thisCopy[i];
          y = targetCopy[i];
          break;
        }
      }
      if (x < y)
        return -1;
      if (y < x)
        return 1;
      return 0;
    }, "compare");
    __name(bidirectionalIndexOf, "bidirectionalIndexOf");
    __name(arrayIndexOf, "arrayIndexOf");
    Buffer2.prototype.includes = /* @__PURE__ */ __name(function includes(val, byteOffset, encoding) {
      return this.indexOf(val, byteOffset, encoding) !== -1;
    }, "includes");
    Buffer2.prototype.indexOf = /* @__PURE__ */ __name(function indexOf(val, byteOffset, encoding) {
      return bidirectionalIndexOf(this, val, byteOffset, encoding, true);
    }, "indexOf");
    Buffer2.prototype.lastIndexOf = /* @__PURE__ */ __name(function lastIndexOf(val, byteOffset, encoding) {
      return bidirectionalIndexOf(this, val, byteOffset, encoding, false);
    }, "lastIndexOf");
    __name(hexWrite, "hexWrite");
    __name(utf8Write, "utf8Write");
    __name(asciiWrite, "asciiWrite");
    __name(latin1Write, "latin1Write");
    __name(base64Write, "base64Write");
    __name(ucs2Write, "ucs2Write");
    Buffer2.prototype.write = /* @__PURE__ */ __name(function write(string, offset, length, encoding) {
      if (offset === void 0) {
        encoding = "utf8";
        length = this.length;
        offset = 0;
      } else if (length === void 0 && typeof offset === "string") {
        encoding = offset;
        length = this.length;
        offset = 0;
      } else if (isFinite(offset)) {
        offset = offset | 0;
        if (isFinite(length)) {
          length = length | 0;
          if (encoding === void 0)
            encoding = "utf8";
        } else {
          encoding = length;
          length = void 0;
        }
      } else {
        throw new Error(
          "Buffer.write(string, encoding, offset[, length]) is no longer supported"
        );
      }
      var remaining = this.length - offset;
      if (length === void 0 || length > remaining)
        length = remaining;
      if (string.length > 0 && (length < 0 || offset < 0) || offset > this.length) {
        throw new RangeError("Attempt to write outside buffer bounds");
      }
      if (!encoding)
        encoding = "utf8";
      var loweredCase = false;
      for (; ; ) {
        switch (encoding) {
          case "hex":
            return hexWrite(this, string, offset, length);
          case "utf8":
          case "utf-8":
            return utf8Write(this, string, offset, length);
          case "ascii":
            return asciiWrite(this, string, offset, length);
          case "latin1":
          case "binary":
            return latin1Write(this, string, offset, length);
          case "base64":
            return base64Write(this, string, offset, length);
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return ucs2Write(this, string, offset, length);
          default:
            if (loweredCase)
              throw new TypeError("Unknown encoding: " + encoding);
            encoding = ("" + encoding).toLowerCase();
            loweredCase = true;
        }
      }
    }, "write");
    Buffer2.prototype.toJSON = /* @__PURE__ */ __name(function toJSON() {
      return {
        type: "Buffer",
        data: Array.prototype.slice.call(this._arr || this, 0)
      };
    }, "toJSON");
    __name(base64Slice, "base64Slice");
    __name(utf8Slice, "utf8Slice");
    MAX_ARGUMENTS_LENGTH = 4096;
    __name(decodeCodePointsArray, "decodeCodePointsArray");
    __name(asciiSlice, "asciiSlice");
    __name(latin1Slice, "latin1Slice");
    __name(hexSlice, "hexSlice");
    __name(utf16leSlice, "utf16leSlice");
    Buffer2.prototype.slice = /* @__PURE__ */ __name(function slice(start, end) {
      var len = this.length;
      start = ~~start;
      end = end === void 0 ? len : ~~end;
      if (start < 0) {
        start += len;
        if (start < 0)
          start = 0;
      } else if (start > len) {
        start = len;
      }
      if (end < 0) {
        end += len;
        if (end < 0)
          end = 0;
      } else if (end > len) {
        end = len;
      }
      if (end < start)
        end = start;
      var newBuf;
      if (Buffer2.TYPED_ARRAY_SUPPORT) {
        newBuf = this.subarray(start, end);
        newBuf.__proto__ = Buffer2.prototype;
      } else {
        var sliceLen = end - start;
        newBuf = new Buffer2(sliceLen, void 0);
        for (var i = 0; i < sliceLen; ++i) {
          newBuf[i] = this[i + start];
        }
      }
      return newBuf;
    }, "slice");
    __name(checkOffset, "checkOffset");
    Buffer2.prototype.readUIntLE = /* @__PURE__ */ __name(function readUIntLE(offset, byteLength2, noAssert) {
      offset = offset | 0;
      byteLength2 = byteLength2 | 0;
      if (!noAssert)
        checkOffset(offset, byteLength2, this.length);
      var val = this[offset];
      var mul = 1;
      var i = 0;
      while (++i < byteLength2 && (mul *= 256)) {
        val += this[offset + i] * mul;
      }
      return val;
    }, "readUIntLE");
    Buffer2.prototype.readUIntBE = /* @__PURE__ */ __name(function readUIntBE(offset, byteLength2, noAssert) {
      offset = offset | 0;
      byteLength2 = byteLength2 | 0;
      if (!noAssert) {
        checkOffset(offset, byteLength2, this.length);
      }
      var val = this[offset + --byteLength2];
      var mul = 1;
      while (byteLength2 > 0 && (mul *= 256)) {
        val += this[offset + --byteLength2] * mul;
      }
      return val;
    }, "readUIntBE");
    Buffer2.prototype.readUInt8 = /* @__PURE__ */ __name(function readUInt8(offset, noAssert) {
      if (!noAssert)
        checkOffset(offset, 1, this.length);
      return this[offset];
    }, "readUInt8");
    Buffer2.prototype.readUInt16LE = /* @__PURE__ */ __name(function readUInt16LE(offset, noAssert) {
      if (!noAssert)
        checkOffset(offset, 2, this.length);
      return this[offset] | this[offset + 1] << 8;
    }, "readUInt16LE");
    Buffer2.prototype.readUInt16BE = /* @__PURE__ */ __name(function readUInt16BE(offset, noAssert) {
      if (!noAssert)
        checkOffset(offset, 2, this.length);
      return this[offset] << 8 | this[offset + 1];
    }, "readUInt16BE");
    Buffer2.prototype.readUInt32LE = /* @__PURE__ */ __name(function readUInt32LE(offset, noAssert) {
      if (!noAssert)
        checkOffset(offset, 4, this.length);
      return (this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16) + this[offset + 3] * 16777216;
    }, "readUInt32LE");
    Buffer2.prototype.readUInt32BE = /* @__PURE__ */ __name(function readUInt32BE(offset, noAssert) {
      if (!noAssert)
        checkOffset(offset, 4, this.length);
      return this[offset] * 16777216 + (this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3]);
    }, "readUInt32BE");
    Buffer2.prototype.readIntLE = /* @__PURE__ */ __name(function readIntLE(offset, byteLength2, noAssert) {
      offset = offset | 0;
      byteLength2 = byteLength2 | 0;
      if (!noAssert)
        checkOffset(offset, byteLength2, this.length);
      var val = this[offset];
      var mul = 1;
      var i = 0;
      while (++i < byteLength2 && (mul *= 256)) {
        val += this[offset + i] * mul;
      }
      mul *= 128;
      if (val >= mul)
        val -= Math.pow(2, 8 * byteLength2);
      return val;
    }, "readIntLE");
    Buffer2.prototype.readIntBE = /* @__PURE__ */ __name(function readIntBE(offset, byteLength2, noAssert) {
      offset = offset | 0;
      byteLength2 = byteLength2 | 0;
      if (!noAssert)
        checkOffset(offset, byteLength2, this.length);
      var i = byteLength2;
      var mul = 1;
      var val = this[offset + --i];
      while (i > 0 && (mul *= 256)) {
        val += this[offset + --i] * mul;
      }
      mul *= 128;
      if (val >= mul)
        val -= Math.pow(2, 8 * byteLength2);
      return val;
    }, "readIntBE");
    Buffer2.prototype.readInt8 = /* @__PURE__ */ __name(function readInt8(offset, noAssert) {
      if (!noAssert)
        checkOffset(offset, 1, this.length);
      if (!(this[offset] & 128))
        return this[offset];
      return (255 - this[offset] + 1) * -1;
    }, "readInt8");
    Buffer2.prototype.readInt16LE = /* @__PURE__ */ __name(function readInt16LE(offset, noAssert) {
      if (!noAssert)
        checkOffset(offset, 2, this.length);
      var val = this[offset] | this[offset + 1] << 8;
      return val & 32768 ? val | 4294901760 : val;
    }, "readInt16LE");
    Buffer2.prototype.readInt16BE = /* @__PURE__ */ __name(function readInt16BE(offset, noAssert) {
      if (!noAssert)
        checkOffset(offset, 2, this.length);
      var val = this[offset + 1] | this[offset] << 8;
      return val & 32768 ? val | 4294901760 : val;
    }, "readInt16BE");
    Buffer2.prototype.readInt32LE = /* @__PURE__ */ __name(function readInt32LE(offset, noAssert) {
      if (!noAssert)
        checkOffset(offset, 4, this.length);
      return this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16 | this[offset + 3] << 24;
    }, "readInt32LE");
    Buffer2.prototype.readInt32BE = /* @__PURE__ */ __name(function readInt32BE(offset, noAssert) {
      if (!noAssert)
        checkOffset(offset, 4, this.length);
      return this[offset] << 24 | this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3];
    }, "readInt32BE");
    Buffer2.prototype.readFloatLE = /* @__PURE__ */ __name(function readFloatLE(offset, noAssert) {
      if (!noAssert)
        checkOffset(offset, 4, this.length);
      return ieee754read(this, offset, true, 23, 4);
    }, "readFloatLE");
    Buffer2.prototype.readFloatBE = /* @__PURE__ */ __name(function readFloatBE(offset, noAssert) {
      if (!noAssert)
        checkOffset(offset, 4, this.length);
      return ieee754read(this, offset, false, 23, 4);
    }, "readFloatBE");
    Buffer2.prototype.readDoubleLE = /* @__PURE__ */ __name(function readDoubleLE(offset, noAssert) {
      if (!noAssert)
        checkOffset(offset, 8, this.length);
      return ieee754read(this, offset, true, 52, 8);
    }, "readDoubleLE");
    Buffer2.prototype.readDoubleBE = /* @__PURE__ */ __name(function readDoubleBE(offset, noAssert) {
      if (!noAssert)
        checkOffset(offset, 8, this.length);
      return ieee754read(this, offset, false, 52, 8);
    }, "readDoubleBE");
    __name(checkInt, "checkInt");
    Buffer2.prototype.writeUIntLE = /* @__PURE__ */ __name(function writeUIntLE(value, offset, byteLength2, noAssert) {
      value = +value;
      offset = offset | 0;
      byteLength2 = byteLength2 | 0;
      if (!noAssert) {
        var maxBytes = Math.pow(2, 8 * byteLength2) - 1;
        checkInt(this, value, offset, byteLength2, maxBytes, 0);
      }
      var mul = 1;
      var i = 0;
      this[offset] = value & 255;
      while (++i < byteLength2 && (mul *= 256)) {
        this[offset + i] = value / mul & 255;
      }
      return offset + byteLength2;
    }, "writeUIntLE");
    Buffer2.prototype.writeUIntBE = /* @__PURE__ */ __name(function writeUIntBE(value, offset, byteLength2, noAssert) {
      value = +value;
      offset = offset | 0;
      byteLength2 = byteLength2 | 0;
      if (!noAssert) {
        var maxBytes = Math.pow(2, 8 * byteLength2) - 1;
        checkInt(this, value, offset, byteLength2, maxBytes, 0);
      }
      var i = byteLength2 - 1;
      var mul = 1;
      this[offset + i] = value & 255;
      while (--i >= 0 && (mul *= 256)) {
        this[offset + i] = value / mul & 255;
      }
      return offset + byteLength2;
    }, "writeUIntBE");
    Buffer2.prototype.writeUInt8 = /* @__PURE__ */ __name(function writeUInt8(value, offset, noAssert) {
      value = +value;
      offset = offset | 0;
      if (!noAssert)
        checkInt(this, value, offset, 1, 255, 0);
      if (!Buffer2.TYPED_ARRAY_SUPPORT)
        value = Math.floor(value);
      this[offset] = value & 255;
      return offset + 1;
    }, "writeUInt8");
    __name(objectWriteUInt16, "objectWriteUInt16");
    Buffer2.prototype.writeUInt16LE = /* @__PURE__ */ __name(function writeUInt16LE(value, offset, noAssert) {
      value = +value;
      offset = offset | 0;
      if (!noAssert)
        checkInt(this, value, offset, 2, 65535, 0);
      if (Buffer2.TYPED_ARRAY_SUPPORT) {
        this[offset] = value & 255;
        this[offset + 1] = value >>> 8;
      } else {
        objectWriteUInt16(this, value, offset, true);
      }
      return offset + 2;
    }, "writeUInt16LE");
    Buffer2.prototype.writeUInt16BE = /* @__PURE__ */ __name(function writeUInt16BE(value, offset, noAssert) {
      value = +value;
      offset = offset | 0;
      if (!noAssert)
        checkInt(this, value, offset, 2, 65535, 0);
      if (Buffer2.TYPED_ARRAY_SUPPORT) {
        this[offset] = value >>> 8;
        this[offset + 1] = value & 255;
      } else {
        objectWriteUInt16(this, value, offset, false);
      }
      return offset + 2;
    }, "writeUInt16BE");
    __name(objectWriteUInt32, "objectWriteUInt32");
    Buffer2.prototype.writeUInt32LE = /* @__PURE__ */ __name(function writeUInt32LE(value, offset, noAssert) {
      value = +value;
      offset = offset | 0;
      if (!noAssert)
        checkInt(this, value, offset, 4, 4294967295, 0);
      if (Buffer2.TYPED_ARRAY_SUPPORT) {
        this[offset + 3] = value >>> 24;
        this[offset + 2] = value >>> 16;
        this[offset + 1] = value >>> 8;
        this[offset] = value & 255;
      } else {
        objectWriteUInt32(this, value, offset, true);
      }
      return offset + 4;
    }, "writeUInt32LE");
    Buffer2.prototype.writeUInt32BE = /* @__PURE__ */ __name(function writeUInt32BE(value, offset, noAssert) {
      value = +value;
      offset = offset | 0;
      if (!noAssert)
        checkInt(this, value, offset, 4, 4294967295, 0);
      if (Buffer2.TYPED_ARRAY_SUPPORT) {
        this[offset] = value >>> 24;
        this[offset + 1] = value >>> 16;
        this[offset + 2] = value >>> 8;
        this[offset + 3] = value & 255;
      } else {
        objectWriteUInt32(this, value, offset, false);
      }
      return offset + 4;
    }, "writeUInt32BE");
    Buffer2.prototype.writeIntLE = /* @__PURE__ */ __name(function writeIntLE(value, offset, byteLength2, noAssert) {
      value = +value;
      offset = offset | 0;
      if (!noAssert) {
        var limit = Math.pow(2, 8 * byteLength2 - 1);
        checkInt(this, value, offset, byteLength2, limit - 1, -limit);
      }
      var i = 0;
      var mul = 1;
      var sub = 0;
      this[offset] = value & 255;
      while (++i < byteLength2 && (mul *= 256)) {
        if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
          sub = 1;
        }
        this[offset + i] = (value / mul >> 0) - sub & 255;
      }
      return offset + byteLength2;
    }, "writeIntLE");
    Buffer2.prototype.writeIntBE = /* @__PURE__ */ __name(function writeIntBE(value, offset, byteLength2, noAssert) {
      value = +value;
      offset = offset | 0;
      if (!noAssert) {
        var limit = Math.pow(2, 8 * byteLength2 - 1);
        checkInt(this, value, offset, byteLength2, limit - 1, -limit);
      }
      var i = byteLength2 - 1;
      var mul = 1;
      var sub = 0;
      this[offset + i] = value & 255;
      while (--i >= 0 && (mul *= 256)) {
        if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
          sub = 1;
        }
        this[offset + i] = (value / mul >> 0) - sub & 255;
      }
      return offset + byteLength2;
    }, "writeIntBE");
    Buffer2.prototype.writeInt8 = /* @__PURE__ */ __name(function writeInt8(value, offset, noAssert) {
      value = +value;
      offset = offset | 0;
      if (!noAssert)
        checkInt(this, value, offset, 1, 127, -128);
      if (!Buffer2.TYPED_ARRAY_SUPPORT)
        value = Math.floor(value);
      if (value < 0)
        value = 255 + value + 1;
      this[offset] = value & 255;
      return offset + 1;
    }, "writeInt8");
    Buffer2.prototype.writeInt16LE = /* @__PURE__ */ __name(function writeInt16LE(value, offset, noAssert) {
      value = +value;
      offset = offset | 0;
      if (!noAssert)
        checkInt(this, value, offset, 2, 32767, -32768);
      if (Buffer2.TYPED_ARRAY_SUPPORT) {
        this[offset] = value & 255;
        this[offset + 1] = value >>> 8;
      } else {
        objectWriteUInt16(this, value, offset, true);
      }
      return offset + 2;
    }, "writeInt16LE");
    Buffer2.prototype.writeInt16BE = /* @__PURE__ */ __name(function writeInt16BE(value, offset, noAssert) {
      value = +value;
      offset = offset | 0;
      if (!noAssert)
        checkInt(this, value, offset, 2, 32767, -32768);
      if (Buffer2.TYPED_ARRAY_SUPPORT) {
        this[offset] = value >>> 8;
        this[offset + 1] = value & 255;
      } else {
        objectWriteUInt16(this, value, offset, false);
      }
      return offset + 2;
    }, "writeInt16BE");
    Buffer2.prototype.writeInt32LE = /* @__PURE__ */ __name(function writeInt32LE(value, offset, noAssert) {
      value = +value;
      offset = offset | 0;
      if (!noAssert)
        checkInt(this, value, offset, 4, 2147483647, -2147483648);
      if (Buffer2.TYPED_ARRAY_SUPPORT) {
        this[offset] = value & 255;
        this[offset + 1] = value >>> 8;
        this[offset + 2] = value >>> 16;
        this[offset + 3] = value >>> 24;
      } else {
        objectWriteUInt32(this, value, offset, true);
      }
      return offset + 4;
    }, "writeInt32LE");
    Buffer2.prototype.writeInt32BE = /* @__PURE__ */ __name(function writeInt32BE(value, offset, noAssert) {
      value = +value;
      offset = offset | 0;
      if (!noAssert)
        checkInt(this, value, offset, 4, 2147483647, -2147483648);
      if (value < 0)
        value = 4294967295 + value + 1;
      if (Buffer2.TYPED_ARRAY_SUPPORT) {
        this[offset] = value >>> 24;
        this[offset + 1] = value >>> 16;
        this[offset + 2] = value >>> 8;
        this[offset + 3] = value & 255;
      } else {
        objectWriteUInt32(this, value, offset, false);
      }
      return offset + 4;
    }, "writeInt32BE");
    __name(checkIEEE754, "checkIEEE754");
    __name(writeFloat, "writeFloat");
    Buffer2.prototype.writeFloatLE = /* @__PURE__ */ __name(function writeFloatLE(value, offset, noAssert) {
      return writeFloat(this, value, offset, true, noAssert);
    }, "writeFloatLE");
    Buffer2.prototype.writeFloatBE = /* @__PURE__ */ __name(function writeFloatBE(value, offset, noAssert) {
      return writeFloat(this, value, offset, false, noAssert);
    }, "writeFloatBE");
    __name(writeDouble, "writeDouble");
    Buffer2.prototype.writeDoubleLE = /* @__PURE__ */ __name(function writeDoubleLE(value, offset, noAssert) {
      return writeDouble(this, value, offset, true, noAssert);
    }, "writeDoubleLE");
    Buffer2.prototype.writeDoubleBE = /* @__PURE__ */ __name(function writeDoubleBE(value, offset, noAssert) {
      return writeDouble(this, value, offset, false, noAssert);
    }, "writeDoubleBE");
    Buffer2.prototype.copy = /* @__PURE__ */ __name(function copy(target, targetStart, start, end) {
      if (!start)
        start = 0;
      if (!end && end !== 0)
        end = this.length;
      if (targetStart >= target.length)
        targetStart = target.length;
      if (!targetStart)
        targetStart = 0;
      if (end > 0 && end < start)
        end = start;
      if (end === start)
        return 0;
      if (target.length === 0 || this.length === 0)
        return 0;
      if (targetStart < 0) {
        throw new RangeError("targetStart out of bounds");
      }
      if (start < 0 || start >= this.length)
        throw new RangeError("sourceStart out of bounds");
      if (end < 0)
        throw new RangeError("sourceEnd out of bounds");
      if (end > this.length)
        end = this.length;
      if (target.length - targetStart < end - start) {
        end = target.length - targetStart + start;
      }
      var len = end - start;
      var i;
      if (this === target && start < targetStart && targetStart < end) {
        for (i = len - 1; i >= 0; --i) {
          target[i + targetStart] = this[i + start];
        }
      } else if (len < 1e3 || !Buffer2.TYPED_ARRAY_SUPPORT) {
        for (i = 0; i < len; ++i) {
          target[i + targetStart] = this[i + start];
        }
      } else {
        Uint8Array.prototype.set.call(
          target,
          this.subarray(start, start + len),
          targetStart
        );
      }
      return len;
    }, "copy");
    Buffer2.prototype.fill = /* @__PURE__ */ __name(function fill(val, start, end, encoding) {
      if (typeof val === "string") {
        if (typeof start === "string") {
          encoding = start;
          start = 0;
          end = this.length;
        } else if (typeof end === "string") {
          encoding = end;
          end = this.length;
        }
        if (val.length === 1) {
          var code = val.charCodeAt(0);
          if (code < 256) {
            val = code;
          }
        }
        if (encoding !== void 0 && typeof encoding !== "string") {
          throw new TypeError("encoding must be a string");
        }
        if (typeof encoding === "string" && !Buffer2.isEncoding(encoding)) {
          throw new TypeError("Unknown encoding: " + encoding);
        }
      } else if (typeof val === "number") {
        val = val & 255;
      }
      if (start < 0 || this.length < start || this.length < end) {
        throw new RangeError("Out of range index");
      }
      if (end <= start) {
        return this;
      }
      start = start >>> 0;
      end = end === void 0 ? this.length : end >>> 0;
      if (!val)
        val = 0;
      var i;
      if (typeof val === "number") {
        for (i = start; i < end; ++i) {
          this[i] = val;
        }
      } else {
        var bytes = internalIsBuffer(val) ? val : utf8ToBytes(new Buffer2(val, encoding).toString());
        var len = bytes.length;
        for (i = 0; i < end - start; ++i) {
          this[i + start] = bytes[i % len];
        }
      }
      return this;
    }, "fill");
    INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g;
    __name(base64clean, "base64clean");
    __name(stringtrim, "stringtrim");
    __name(toHex, "toHex");
    __name(utf8ToBytes, "utf8ToBytes");
    __name(asciiToBytes, "asciiToBytes");
    __name(utf16leToBytes, "utf16leToBytes");
    __name(base64ToBytes, "base64ToBytes");
    __name(blitBuffer, "blitBuffer");
    __name(isnan, "isnan");
    __name(isBuffer, "isBuffer");
    __name(isFastBuffer, "isFastBuffer");
    __name(isSlowBuffer, "isSlowBuffer");
    __name(ieee754read, "ieee754read");
    __name(ieee754write, "ieee754write");
  }
});

// node_modules/@esbuild-plugins/node-globals-polyfill/_buffer.js
var init_buffer = __esm({
  "node_modules/@esbuild-plugins/node-globals-polyfill/_buffer.js"() {
    init_Buffer();
  }
});

// wrangler-modules-watch:wrangler:modules-watch
var init_wrangler_modules_watch = __esm({
  "wrangler-modules-watch:wrangler:modules-watch"() {
    init_checked_fetch();
    init_modules_watch_stub();
    init_process();
    init_buffer();
  }
});

// node_modules/wrangler/templates/modules-watch-stub.js
var init_modules_watch_stub = __esm({
  "node_modules/wrangler/templates/modules-watch-stub.js"() {
    init_wrangler_modules_watch();
  }
});

// node_modules/cookie/dist/index.js
var require_dist = __commonJS({
  "node_modules/cookie/dist/index.js"(exports) {
    "use strict";
    init_checked_fetch();
    init_modules_watch_stub();
    init_process();
    init_buffer();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.parse = parse3;
    exports.serialize = serialize2;
    var cookieNameRegExp = /^[\u0021-\u003A\u003C\u003E-\u007E]+$/;
    var cookieValueRegExp = /^[\u0021-\u003A\u003C-\u007E]*$/;
    var domainValueRegExp = /^([.]?[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)([.][a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*$/i;
    var pathValueRegExp = /^[\u0020-\u003A\u003D-\u007E]*$/;
    var __toString = Object.prototype.toString;
    var NullObject = /* @__PURE__ */ (() => {
      const C = /* @__PURE__ */ __name(function() {
      }, "C");
      C.prototype = /* @__PURE__ */ Object.create(null);
      return C;
    })();
    function parse3(str, options) {
      const obj = new NullObject();
      const len = str.length;
      if (len < 2)
        return obj;
      const dec = options?.decode || decode;
      let index = 0;
      do {
        const eqIdx = str.indexOf("=", index);
        if (eqIdx === -1)
          break;
        const colonIdx = str.indexOf(";", index);
        const endIdx = colonIdx === -1 ? len : colonIdx;
        if (eqIdx > endIdx) {
          index = str.lastIndexOf(";", eqIdx - 1) + 1;
          continue;
        }
        const keyStartIdx = startIndex(str, index, eqIdx);
        const keyEndIdx = endIndex(str, eqIdx, keyStartIdx);
        const key = str.slice(keyStartIdx, keyEndIdx);
        if (obj[key] === void 0) {
          let valStartIdx = startIndex(str, eqIdx + 1, endIdx);
          let valEndIdx = endIndex(str, endIdx, valStartIdx);
          const value = dec(str.slice(valStartIdx, valEndIdx));
          obj[key] = value;
        }
        index = endIdx + 1;
      } while (index < len);
      return obj;
    }
    __name(parse3, "parse");
    function startIndex(str, index, max) {
      do {
        const code = str.charCodeAt(index);
        if (code !== 32 && code !== 9)
          return index;
      } while (++index < max);
      return max;
    }
    __name(startIndex, "startIndex");
    function endIndex(str, index, min) {
      while (index > min) {
        const code = str.charCodeAt(--index);
        if (code !== 32 && code !== 9)
          return index + 1;
      }
      return min;
    }
    __name(endIndex, "endIndex");
    function serialize2(name, val, options) {
      const enc = options?.encode || encodeURIComponent;
      if (!cookieNameRegExp.test(name)) {
        throw new TypeError(`argument name is invalid: ${name}`);
      }
      const value = enc(val);
      if (!cookieValueRegExp.test(value)) {
        throw new TypeError(`argument val is invalid: ${val}`);
      }
      let str = name + "=" + value;
      if (!options)
        return str;
      if (options.maxAge !== void 0) {
        if (!Number.isInteger(options.maxAge)) {
          throw new TypeError(`option maxAge is invalid: ${options.maxAge}`);
        }
        str += "; Max-Age=" + options.maxAge;
      }
      if (options.domain) {
        if (!domainValueRegExp.test(options.domain)) {
          throw new TypeError(`option domain is invalid: ${options.domain}`);
        }
        str += "; Domain=" + options.domain;
      }
      if (options.path) {
        if (!pathValueRegExp.test(options.path)) {
          throw new TypeError(`option path is invalid: ${options.path}`);
        }
        str += "; Path=" + options.path;
      }
      if (options.expires) {
        if (!isDate(options.expires) || !Number.isFinite(options.expires.valueOf())) {
          throw new TypeError(`option expires is invalid: ${options.expires}`);
        }
        str += "; Expires=" + options.expires.toUTCString();
      }
      if (options.httpOnly) {
        str += "; HttpOnly";
      }
      if (options.secure) {
        str += "; Secure";
      }
      if (options.partitioned) {
        str += "; Partitioned";
      }
      if (options.priority) {
        const priority = typeof options.priority === "string" ? options.priority.toLowerCase() : void 0;
        switch (priority) {
          case "low":
            str += "; Priority=Low";
            break;
          case "medium":
            str += "; Priority=Medium";
            break;
          case "high":
            str += "; Priority=High";
            break;
          default:
            throw new TypeError(`option priority is invalid: ${options.priority}`);
        }
      }
      if (options.sameSite) {
        const sameSite = typeof options.sameSite === "string" ? options.sameSite.toLowerCase() : options.sameSite;
        switch (sameSite) {
          case true:
          case "strict":
            str += "; SameSite=Strict";
            break;
          case "lax":
            str += "; SameSite=Lax";
            break;
          case "none":
            str += "; SameSite=None";
            break;
          default:
            throw new TypeError(`option sameSite is invalid: ${options.sameSite}`);
        }
      }
      return str;
    }
    __name(serialize2, "serialize");
    function decode(str) {
      if (str.indexOf("%") === -1)
        return str;
      try {
        return decodeURIComponent(str);
      } catch (e) {
        return str;
      }
    }
    __name(decode, "decode");
    function isDate(val) {
      return __toString.call(val) === "[object Date]";
    }
    __name(isDate, "isDate");
  }
});

// node_modules/fast-decode-uri-component/index.js
var require_fast_decode_uri_component = __commonJS({
  "node_modules/fast-decode-uri-component/index.js"(exports, module) {
    "use strict";
    init_checked_fetch();
    init_modules_watch_stub();
    init_process();
    init_buffer();
    var UTF8_ACCEPT = 12;
    var UTF8_REJECT = 0;
    var UTF8_DATA = [
      // The first part of the table maps bytes to character to a transition.
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      2,
      2,
      2,
      2,
      2,
      2,
      2,
      2,
      2,
      2,
      2,
      2,
      2,
      2,
      2,
      2,
      3,
      3,
      3,
      3,
      3,
      3,
      3,
      3,
      3,
      3,
      3,
      3,
      3,
      3,
      3,
      3,
      3,
      3,
      3,
      3,
      3,
      3,
      3,
      3,
      3,
      3,
      3,
      3,
      3,
      3,
      3,
      3,
      4,
      4,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      6,
      7,
      7,
      7,
      7,
      7,
      7,
      7,
      7,
      7,
      7,
      7,
      7,
      8,
      7,
      7,
      10,
      9,
      9,
      9,
      11,
      4,
      4,
      4,
      4,
      4,
      4,
      4,
      4,
      4,
      4,
      4,
      // The second part of the table maps a state to a new state when adding a
      // transition.
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      12,
      0,
      0,
      0,
      0,
      24,
      36,
      48,
      60,
      72,
      84,
      96,
      0,
      12,
      12,
      12,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      24,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      24,
      24,
      24,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      24,
      24,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      48,
      48,
      48,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      48,
      48,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      48,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      // The third part maps the current transition to a mask that needs to apply
      // to the byte.
      127,
      63,
      63,
      63,
      0,
      31,
      15,
      15,
      15,
      7,
      7,
      7
    ];
    function decodeURIComponent3(uri2) {
      var percentPosition = uri2.indexOf("%");
      if (percentPosition === -1)
        return uri2;
      var length = uri2.length;
      var decoded = "";
      var last = 0;
      var codepoint = 0;
      var startOfOctets = percentPosition;
      var state = UTF8_ACCEPT;
      while (percentPosition > -1 && percentPosition < length) {
        var high = hexCodeToInt(uri2[percentPosition + 1], 4);
        var low = hexCodeToInt(uri2[percentPosition + 2], 0);
        var byte2 = high | low;
        var type = UTF8_DATA[byte2];
        state = UTF8_DATA[256 + state + type];
        codepoint = codepoint << 6 | byte2 & UTF8_DATA[364 + type];
        if (state === UTF8_ACCEPT) {
          decoded += uri2.slice(last, startOfOctets);
          decoded += codepoint <= 65535 ? String.fromCharCode(codepoint) : String.fromCharCode(
            55232 + (codepoint >> 10),
            56320 + (codepoint & 1023)
          );
          codepoint = 0;
          last = percentPosition + 3;
          percentPosition = startOfOctets = uri2.indexOf("%", last);
        } else if (state === UTF8_REJECT) {
          return null;
        } else {
          percentPosition += 3;
          if (percentPosition < length && uri2.charCodeAt(percentPosition) === 37)
            continue;
          return null;
        }
      }
      return decoded + uri2.slice(last);
    }
    __name(decodeURIComponent3, "decodeURIComponent");
    var HEX = {
      "0": 0,
      "1": 1,
      "2": 2,
      "3": 3,
      "4": 4,
      "5": 5,
      "6": 6,
      "7": 7,
      "8": 8,
      "9": 9,
      "a": 10,
      "A": 10,
      "b": 11,
      "B": 11,
      "c": 12,
      "C": 12,
      "d": 13,
      "D": 13,
      "e": 14,
      "E": 14,
      "f": 15,
      "F": 15
    };
    function hexCodeToInt(c, shift) {
      var i = HEX[c];
      return i === void 0 ? 255 : i << shift;
    }
    __name(hexCodeToInt, "hexCodeToInt");
    module.exports = decodeURIComponent3;
  }
});

// .wrangler/tmp/bundle-IO8iRY/middleware-loader.entry.ts
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();

// .wrangler/tmp/bundle-IO8iRY/middleware-insertion-facade.js
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();

// src/index.ts
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();

// src/app.ts
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();

// node_modules/elysia/dist/index.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();

// node_modules/@sinclair/typebox/build/esm/value/index.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();

// node_modules/@sinclair/typebox/build/esm/errors/index.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();

// node_modules/@sinclair/typebox/build/esm/errors/errors.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();

// node_modules/@sinclair/typebox/build/esm/system/index.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();

// node_modules/@sinclair/typebox/build/esm/system/policy.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();

// node_modules/@sinclair/typebox/build/esm/value/guard/index.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();

// node_modules/@sinclair/typebox/build/esm/value/guard/guard.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();
function IsAsyncIterator(value) {
  return IsObject(value) && Symbol.asyncIterator in value;
}
__name(IsAsyncIterator, "IsAsyncIterator");
function IsIterator(value) {
  return IsObject(value) && Symbol.iterator in value;
}
__name(IsIterator, "IsIterator");
function IsStandardObject(value) {
  return IsObject(value) && (Object.getPrototypeOf(value) === Object.prototype || Object.getPrototypeOf(value) === null);
}
__name(IsStandardObject, "IsStandardObject");
function IsPromise(value) {
  return value instanceof Promise;
}
__name(IsPromise, "IsPromise");
function IsDate(value) {
  return value instanceof Date && Number.isFinite(value.getTime());
}
__name(IsDate, "IsDate");
function IsTypedArray(value) {
  return ArrayBuffer.isView(value);
}
__name(IsTypedArray, "IsTypedArray");
function IsUint8Array(value) {
  return value instanceof globalThis.Uint8Array;
}
__name(IsUint8Array, "IsUint8Array");
function HasPropertyKey(value, key) {
  return key in value;
}
__name(HasPropertyKey, "HasPropertyKey");
function IsObject(value) {
  return value !== null && typeof value === "object";
}
__name(IsObject, "IsObject");
function IsArray(value) {
  return Array.isArray(value) && !ArrayBuffer.isView(value);
}
__name(IsArray, "IsArray");
function IsUndefined(value) {
  return value === void 0;
}
__name(IsUndefined, "IsUndefined");
function IsNull(value) {
  return value === null;
}
__name(IsNull, "IsNull");
function IsBoolean(value) {
  return typeof value === "boolean";
}
__name(IsBoolean, "IsBoolean");
function IsNumber(value) {
  return typeof value === "number";
}
__name(IsNumber, "IsNumber");
function IsInteger(value) {
  return Number.isInteger(value);
}
__name(IsInteger, "IsInteger");
function IsBigInt(value) {
  return typeof value === "bigint";
}
__name(IsBigInt, "IsBigInt");
function IsString(value) {
  return typeof value === "string";
}
__name(IsString, "IsString");
function IsFunction(value) {
  return typeof value === "function";
}
__name(IsFunction, "IsFunction");
function IsSymbol(value) {
  return typeof value === "symbol";
}
__name(IsSymbol, "IsSymbol");
function IsValueType(value) {
  return IsBigInt(value) || IsBoolean(value) || IsNull(value) || IsNumber(value) || IsString(value) || IsSymbol(value) || IsUndefined(value);
}
__name(IsValueType, "IsValueType");

// node_modules/@sinclair/typebox/build/esm/system/policy.mjs
var TypeSystemPolicy;
(function(TypeSystemPolicy2) {
  TypeSystemPolicy2.ExactOptionalPropertyTypes = false;
  TypeSystemPolicy2.AllowArrayObject = false;
  TypeSystemPolicy2.AllowNaN = false;
  TypeSystemPolicy2.AllowNullVoid = false;
  function IsExactOptionalProperty(value, key) {
    return TypeSystemPolicy2.ExactOptionalPropertyTypes ? key in value : value[key] !== void 0;
  }
  __name(IsExactOptionalProperty, "IsExactOptionalProperty");
  TypeSystemPolicy2.IsExactOptionalProperty = IsExactOptionalProperty;
  function IsObjectLike(value) {
    const isObject2 = IsObject(value);
    return TypeSystemPolicy2.AllowArrayObject ? isObject2 : isObject2 && !IsArray(value);
  }
  __name(IsObjectLike, "IsObjectLike");
  TypeSystemPolicy2.IsObjectLike = IsObjectLike;
  function IsRecordLike(value) {
    return IsObjectLike(value) && !(value instanceof Date) && !(value instanceof Uint8Array);
  }
  __name(IsRecordLike, "IsRecordLike");
  TypeSystemPolicy2.IsRecordLike = IsRecordLike;
  function IsNumberLike(value) {
    return TypeSystemPolicy2.AllowNaN ? IsNumber(value) : Number.isFinite(value);
  }
  __name(IsNumberLike, "IsNumberLike");
  TypeSystemPolicy2.IsNumberLike = IsNumberLike;
  function IsVoidLike(value) {
    const isUndefined = IsUndefined(value);
    return TypeSystemPolicy2.AllowNullVoid ? isUndefined || value === null : isUndefined;
  }
  __name(IsVoidLike, "IsVoidLike");
  TypeSystemPolicy2.IsVoidLike = IsVoidLike;
})(TypeSystemPolicy || (TypeSystemPolicy = {}));

// node_modules/@sinclair/typebox/build/esm/system/system.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();

// node_modules/@sinclair/typebox/build/esm/type/registry/index.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();

// node_modules/@sinclair/typebox/build/esm/type/registry/format.mjs
var format_exports = {};
__export(format_exports, {
  Clear: () => Clear,
  Delete: () => Delete,
  Entries: () => Entries,
  Get: () => Get,
  Has: () => Has,
  Set: () => Set2
});
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();
var map = /* @__PURE__ */ new Map();
function Entries() {
  return new Map(map);
}
__name(Entries, "Entries");
function Clear() {
  return map.clear();
}
__name(Clear, "Clear");
function Delete(format2) {
  return map.delete(format2);
}
__name(Delete, "Delete");
function Has(format2) {
  return map.has(format2);
}
__name(Has, "Has");
function Set2(format2, func) {
  map.set(format2, func);
}
__name(Set2, "Set");
function Get(format2) {
  return map.get(format2);
}
__name(Get, "Get");

// node_modules/@sinclair/typebox/build/esm/type/registry/type.mjs
var type_exports = {};
__export(type_exports, {
  Clear: () => Clear2,
  Delete: () => Delete2,
  Entries: () => Entries2,
  Get: () => Get2,
  Has: () => Has2,
  Set: () => Set3
});
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();
var map2 = /* @__PURE__ */ new Map();
function Entries2() {
  return new Map(map2);
}
__name(Entries2, "Entries");
function Clear2() {
  return map2.clear();
}
__name(Clear2, "Clear");
function Delete2(kind) {
  return map2.delete(kind);
}
__name(Delete2, "Delete");
function Has2(kind) {
  return map2.has(kind);
}
__name(Has2, "Has");
function Set3(kind, func) {
  map2.set(kind, func);
}
__name(Set3, "Set");
function Get2(kind) {
  return map2.get(kind);
}
__name(Get2, "Get");

// node_modules/@sinclair/typebox/build/esm/type/unsafe/index.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();

// node_modules/@sinclair/typebox/build/esm/type/unsafe/unsafe.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();

// node_modules/@sinclair/typebox/build/esm/type/symbols/index.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();

// node_modules/@sinclair/typebox/build/esm/type/symbols/symbols.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();
var TransformKind = Symbol.for("TypeBox.Transform");
var ReadonlyKind = Symbol.for("TypeBox.Readonly");
var OptionalKind = Symbol.for("TypeBox.Optional");
var Hint = Symbol.for("TypeBox.Hint");
var Kind = Symbol.for("TypeBox.Kind");

// node_modules/@sinclair/typebox/build/esm/type/unsafe/unsafe.mjs
function Unsafe(options = {}) {
  return {
    ...options,
    [Kind]: options[Kind] ?? "Unsafe"
  };
}
__name(Unsafe, "Unsafe");

// node_modules/@sinclair/typebox/build/esm/type/error/index.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();

// node_modules/@sinclair/typebox/build/esm/type/error/error.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();
var TypeBoxError = class extends Error {
  constructor(message) {
    super(message);
  }
};
__name(TypeBoxError, "TypeBoxError");

// node_modules/@sinclair/typebox/build/esm/system/system.mjs
var TypeSystemDuplicateTypeKind = class extends TypeBoxError {
  constructor(kind) {
    super(`Duplicate type kind '${kind}' detected`);
  }
};
__name(TypeSystemDuplicateTypeKind, "TypeSystemDuplicateTypeKind");
var TypeSystemDuplicateFormat = class extends TypeBoxError {
  constructor(kind) {
    super(`Duplicate string format '${kind}' detected`);
  }
};
__name(TypeSystemDuplicateFormat, "TypeSystemDuplicateFormat");
var TypeSystem;
(function(TypeSystem2) {
  function Type2(kind, check) {
    if (type_exports.Has(kind))
      throw new TypeSystemDuplicateTypeKind(kind);
    type_exports.Set(kind, check);
    return (options = {}) => Unsafe({ ...options, [Kind]: kind });
  }
  __name(Type2, "Type");
  TypeSystem2.Type = Type2;
  function Format2(format2, check) {
    if (format_exports.Has(format2))
      throw new TypeSystemDuplicateFormat(format2);
    format_exports.Set(format2, check);
    return format2;
  }
  __name(Format2, "Format");
  TypeSystem2.Format = Format2;
})(TypeSystem || (TypeSystem = {}));

// node_modules/@sinclair/typebox/build/esm/type/keyof/index.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();

// node_modules/@sinclair/typebox/build/esm/type/keyof/keyof-from-mapped-result.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();

// node_modules/@sinclair/typebox/build/esm/type/mapped/index.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();

// node_modules/@sinclair/typebox/build/esm/type/mapped/mapped-key.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();

// node_modules/@sinclair/typebox/build/esm/type/mapped/mapped-result.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();
function MappedResult(properties) {
  return {
    [Kind]: "MappedResult",
    properties
  };
}
__name(MappedResult, "MappedResult");

// node_modules/@sinclair/typebox/build/esm/type/mapped/mapped.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();

// node_modules/@sinclair/typebox/build/esm/type/clone/type.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();

// node_modules/@sinclair/typebox/build/esm/type/clone/value.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();

// node_modules/@sinclair/typebox/build/esm/type/guard/value.mjs
var value_exports = {};
__export(value_exports, {
  IsArray: () => IsArray2,
  IsAsyncIterator: () => IsAsyncIterator2,
  IsBigInt: () => IsBigInt2,
  IsBoolean: () => IsBoolean2,
  IsDate: () => IsDate2,
  IsFunction: () => IsFunction2,
  IsIterator: () => IsIterator2,
  IsNull: () => IsNull2,
  IsNumber: () => IsNumber2,
  IsObject: () => IsObject2,
  IsRegExp: () => IsRegExp,
  IsString: () => IsString2,
  IsSymbol: () => IsSymbol2,
  IsUint8Array: () => IsUint8Array2,
  IsUndefined: () => IsUndefined2
});
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();
function IsAsyncIterator2(value) {
  return IsObject2(value) && !IsArray2(value) && !IsUint8Array2(value) && Symbol.asyncIterator in value;
}
__name(IsAsyncIterator2, "IsAsyncIterator");
function IsArray2(value) {
  return Array.isArray(value);
}
__name(IsArray2, "IsArray");
function IsBigInt2(value) {
  return typeof value === "bigint";
}
__name(IsBigInt2, "IsBigInt");
function IsBoolean2(value) {
  return typeof value === "boolean";
}
__name(IsBoolean2, "IsBoolean");
function IsDate2(value) {
  return value instanceof globalThis.Date;
}
__name(IsDate2, "IsDate");
function IsFunction2(value) {
  return typeof value === "function";
}
__name(IsFunction2, "IsFunction");
function IsIterator2(value) {
  return IsObject2(value) && !IsArray2(value) && !IsUint8Array2(value) && Symbol.iterator in value;
}
__name(IsIterator2, "IsIterator");
function IsNull2(value) {
  return value === null;
}
__name(IsNull2, "IsNull");
function IsNumber2(value) {
  return typeof value === "number";
}
__name(IsNumber2, "IsNumber");
function IsObject2(value) {
  return typeof value === "object" && value !== null;
}
__name(IsObject2, "IsObject");
function IsRegExp(value) {
  return value instanceof globalThis.RegExp;
}
__name(IsRegExp, "IsRegExp");
function IsString2(value) {
  return typeof value === "string";
}
__name(IsString2, "IsString");
function IsSymbol2(value) {
  return typeof value === "symbol";
}
__name(IsSymbol2, "IsSymbol");
function IsUint8Array2(value) {
  return value instanceof globalThis.Uint8Array;
}
__name(IsUint8Array2, "IsUint8Array");
function IsUndefined2(value) {
  return value === void 0;
}
__name(IsUndefined2, "IsUndefined");

// node_modules/@sinclair/typebox/build/esm/type/clone/value.mjs
function ArrayType(value) {
  return value.map((value2) => Visit(value2));
}
__name(ArrayType, "ArrayType");
function DateType(value) {
  return new Date(value.getTime());
}
__name(DateType, "DateType");
function Uint8ArrayType(value) {
  return new Uint8Array(value);
}
__name(Uint8ArrayType, "Uint8ArrayType");
function RegExpType(value) {
  return new RegExp(value.source, value.flags);
}
__name(RegExpType, "RegExpType");
function ObjectType(value) {
  const result = {};
  for (const key of Object.getOwnPropertyNames(value)) {
    result[key] = Visit(value[key]);
  }
  for (const key of Object.getOwnPropertySymbols(value)) {
    result[key] = Visit(value[key]);
  }
  return result;
}
__name(ObjectType, "ObjectType");
function Visit(value) {
  return IsArray2(value) ? ArrayType(value) : IsDate2(value) ? DateType(value) : IsUint8Array2(value) ? Uint8ArrayType(value) : IsRegExp(value) ? RegExpType(value) : IsObject2(value) ? ObjectType(value) : value;
}
__name(Visit, "Visit");
function Clone(value) {
  return Visit(value);
}
__name(Clone, "Clone");

// node_modules/@sinclair/typebox/build/esm/type/clone/type.mjs
function CloneRest(schemas) {
  return schemas.map((schema) => CloneType(schema));
}
__name(CloneRest, "CloneRest");
function CloneType(schema, options = {}) {
  return { ...Clone(schema), ...options };
}
__name(CloneType, "CloneType");

// node_modules/@sinclair/typebox/build/esm/type/discard/index.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();

// node_modules/@sinclair/typebox/build/esm/type/discard/discard.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();
function DiscardKey(value, key) {
  const { [key]: _, ...rest } = value;
  return rest;
}
__name(DiscardKey, "DiscardKey");
function Discard(value, keys) {
  return keys.reduce((acc, key) => DiscardKey(acc, key), value);
}
__name(Discard, "Discard");

// node_modules/@sinclair/typebox/build/esm/type/array/index.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();

// node_modules/@sinclair/typebox/build/esm/type/array/array.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();
function Array2(schema, options = {}) {
  return {
    ...options,
    [Kind]: "Array",
    type: "array",
    items: CloneType(schema)
  };
}
__name(Array2, "Array");

// node_modules/@sinclair/typebox/build/esm/type/async-iterator/index.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();

// node_modules/@sinclair/typebox/build/esm/type/async-iterator/async-iterator.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();
function AsyncIterator(items, options = {}) {
  return {
    ...options,
    [Kind]: "AsyncIterator",
    type: "AsyncIterator",
    items: CloneType(items)
  };
}
__name(AsyncIterator, "AsyncIterator");

// node_modules/@sinclair/typebox/build/esm/type/constructor/index.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();

// node_modules/@sinclair/typebox/build/esm/type/constructor/constructor.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();
function Constructor(parameters, returns, options) {
  return {
    ...options,
    [Kind]: "Constructor",
    type: "Constructor",
    parameters: CloneRest(parameters),
    returns: CloneType(returns)
  };
}
__name(Constructor, "Constructor");

// node_modules/@sinclair/typebox/build/esm/type/function/index.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();

// node_modules/@sinclair/typebox/build/esm/type/function/function.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();
function Function2(parameters, returns, options) {
  return {
    ...options,
    [Kind]: "Function",
    type: "Function",
    parameters: CloneRest(parameters),
    returns: CloneType(returns)
  };
}
__name(Function2, "Function");

// node_modules/@sinclair/typebox/build/esm/type/indexed/index.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();

// node_modules/@sinclair/typebox/build/esm/type/indexed/indexed-from-mapped-key.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();

// node_modules/@sinclair/typebox/build/esm/type/indexed/indexed.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();

// node_modules/@sinclair/typebox/build/esm/type/never/index.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();

// node_modules/@sinclair/typebox/build/esm/type/never/never.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();
function Never(options = {}) {
  return {
    ...options,
    [Kind]: "Never",
    not: {}
  };
}
__name(Never, "Never");

// node_modules/@sinclair/typebox/build/esm/type/intersect/index.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();

// node_modules/@sinclair/typebox/build/esm/type/intersect/intersect-evaluated.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();

// node_modules/@sinclair/typebox/build/esm/type/optional/index.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();

// node_modules/@sinclair/typebox/build/esm/type/optional/optional-from-mapped-result.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();

// node_modules/@sinclair/typebox/build/esm/type/optional/optional.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();

// node_modules/@sinclair/typebox/build/esm/type/guard/kind.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();
function IsReadonly(value) {
  return IsObject2(value) && value[ReadonlyKind] === "Readonly";
}
__name(IsReadonly, "IsReadonly");
function IsOptional(value) {
  return IsObject2(value) && value[OptionalKind] === "Optional";
}
__name(IsOptional, "IsOptional");
function IsAny(value) {
  return IsKindOf(value, "Any");
}
__name(IsAny, "IsAny");
function IsArray3(value) {
  return IsKindOf(value, "Array");
}
__name(IsArray3, "IsArray");
function IsAsyncIterator3(value) {
  return IsKindOf(value, "AsyncIterator");
}
__name(IsAsyncIterator3, "IsAsyncIterator");
function IsBigInt3(value) {
  return IsKindOf(value, "BigInt");
}
__name(IsBigInt3, "IsBigInt");
function IsBoolean3(value) {
  return IsKindOf(value, "Boolean");
}
__name(IsBoolean3, "IsBoolean");
function IsConstructor(value) {
  return IsKindOf(value, "Constructor");
}
__name(IsConstructor, "IsConstructor");
function IsDate3(value) {
  return IsKindOf(value, "Date");
}
__name(IsDate3, "IsDate");
function IsFunction3(value) {
  return IsKindOf(value, "Function");
}
__name(IsFunction3, "IsFunction");
function IsInteger2(value) {
  return IsKindOf(value, "Integer");
}
__name(IsInteger2, "IsInteger");
function IsIntersect(value) {
  return IsKindOf(value, "Intersect");
}
__name(IsIntersect, "IsIntersect");
function IsIterator3(value) {
  return IsKindOf(value, "Iterator");
}
__name(IsIterator3, "IsIterator");
function IsKindOf(value, kind) {
  return IsObject2(value) && Kind in value && value[Kind] === kind;
}
__name(IsKindOf, "IsKindOf");
function IsLiteral(value) {
  return IsKindOf(value, "Literal");
}
__name(IsLiteral, "IsLiteral");
function IsMappedKey(value) {
  return IsKindOf(value, "MappedKey");
}
__name(IsMappedKey, "IsMappedKey");
function IsMappedResult(value) {
  return IsKindOf(value, "MappedResult");
}
__name(IsMappedResult, "IsMappedResult");
function IsNever(value) {
  return IsKindOf(value, "Never");
}
__name(IsNever, "IsNever");
function IsNot(value) {
  return IsKindOf(value, "Not");
}
__name(IsNot, "IsNot");
function IsNull3(value) {
  return IsKindOf(value, "Null");
}
__name(IsNull3, "IsNull");
function IsNumber3(value) {
  return IsKindOf(value, "Number");
}
__name(IsNumber3, "IsNumber");
function IsObject3(value) {
  return IsKindOf(value, "Object");
}
__name(IsObject3, "IsObject");
function IsPromise2(value) {
  return IsKindOf(value, "Promise");
}
__name(IsPromise2, "IsPromise");
function IsRecord(value) {
  return IsKindOf(value, "Record");
}
__name(IsRecord, "IsRecord");
function IsRef(value) {
  return IsKindOf(value, "Ref");
}
__name(IsRef, "IsRef");
function IsRegExp2(value) {
  return IsKindOf(value, "RegExp");
}
__name(IsRegExp2, "IsRegExp");
function IsString3(value) {
  return IsKindOf(value, "String");
}
__name(IsString3, "IsString");
function IsSymbol3(value) {
  return IsKindOf(value, "Symbol");
}
__name(IsSymbol3, "IsSymbol");
function IsTemplateLiteral(value) {
  return IsKindOf(value, "TemplateLiteral");
}
__name(IsTemplateLiteral, "IsTemplateLiteral");
function IsThis(value) {
  return IsKindOf(value, "This");
}
__name(IsThis, "IsThis");
function IsTransform(value) {
  return IsObject2(value) && TransformKind in value;
}
__name(IsTransform, "IsTransform");
function IsTuple(value) {
  return IsKindOf(value, "Tuple");
}
__name(IsTuple, "IsTuple");
function IsUndefined3(value) {
  return IsKindOf(value, "Undefined");
}
__name(IsUndefined3, "IsUndefined");
function IsUnion(value) {
  return IsKindOf(value, "Union");
}
__name(IsUnion, "IsUnion");
function IsUint8Array3(value) {
  return IsKindOf(value, "Uint8Array");
}
__name(IsUint8Array3, "IsUint8Array");
function IsUnknown(value) {
  return IsKindOf(value, "Unknown");
}
__name(IsUnknown, "IsUnknown");
function IsUnsafe(value) {
  return IsKindOf(value, "Unsafe");
}
__name(IsUnsafe, "IsUnsafe");
function IsVoid(value) {
  return IsKindOf(value, "Void");
}
__name(IsVoid, "IsVoid");
function IsKind(value) {
  return IsObject2(value) && Kind in value && IsString2(value[Kind]);
}
__name(IsKind, "IsKind");
function IsSchema(value) {
  return IsAny(value) || IsArray3(value) || IsBoolean3(value) || IsBigInt3(value) || IsAsyncIterator3(value) || IsConstructor(value) || IsDate3(value) || IsFunction3(value) || IsInteger2(value) || IsIntersect(value) || IsIterator3(value) || IsLiteral(value) || IsMappedKey(value) || IsMappedResult(value) || IsNever(value) || IsNot(value) || IsNull3(value) || IsNumber3(value) || IsObject3(value) || IsPromise2(value) || IsRecord(value) || IsRef(value) || IsRegExp2(value) || IsString3(value) || IsSymbol3(value) || IsTemplateLiteral(value) || IsThis(value) || IsTuple(value) || IsUndefined3(value) || IsUnion(value) || IsUint8Array3(value) || IsUnknown(value) || IsUnsafe(value) || IsVoid(value) || IsKind(value);
}
__name(IsSchema, "IsSchema");

// node_modules/@sinclair/typebox/build/esm/type/optional/optional.mjs
function RemoveOptional(schema) {
  return Discard(CloneType(schema), [OptionalKind]);
}
__name(RemoveOptional, "RemoveOptional");
function AddOptional(schema) {
  return { ...CloneType(schema), [OptionalKind]: "Optional" };
}
__name(AddOptional, "AddOptional");
function OptionalWithFlag(schema, F) {
  return F === false ? RemoveOptional(schema) : AddOptional(schema);
}
__name(OptionalWithFlag, "OptionalWithFlag");
function Optional(schema, enable) {
  const F = enable ?? true;
  return IsMappedResult(schema) ? OptionalFromMappedResult(schema, F) : OptionalWithFlag(schema, F);
}
__name(Optional, "Optional");

// node_modules/@sinclair/typebox/build/esm/type/optional/optional-from-mapped-result.mjs
function FromProperties(P, F) {
  const Acc = {};
  for (const K2 of globalThis.Object.getOwnPropertyNames(P))
    Acc[K2] = Optional(P[K2], F);
  return Acc;
}
__name(FromProperties, "FromProperties");
function FromMappedResult(R, F) {
  return FromProperties(R.properties, F);
}
__name(FromMappedResult, "FromMappedResult");
function OptionalFromMappedResult(R, F) {
  const P = FromMappedResult(R, F);
  return MappedResult(P);
}
__name(OptionalFromMappedResult, "OptionalFromMappedResult");

// node_modules/@sinclair/typebox/build/esm/type/intersect/intersect-create.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();
function IntersectCreate(T, options) {
  const allObjects = T.every((schema) => IsObject3(schema));
  const clonedUnevaluatedProperties = IsSchema(options.unevaluatedProperties) ? { unevaluatedProperties: CloneType(options.unevaluatedProperties) } : {};
  return options.unevaluatedProperties === false || IsSchema(options.unevaluatedProperties) || allObjects ? { ...options, ...clonedUnevaluatedProperties, [Kind]: "Intersect", type: "object", allOf: CloneRest(T) } : { ...options, ...clonedUnevaluatedProperties, [Kind]: "Intersect", allOf: CloneRest(T) };
}
__name(IntersectCreate, "IntersectCreate");

// node_modules/@sinclair/typebox/build/esm/type/intersect/intersect-evaluated.mjs
function IsIntersectOptional(T) {
  return T.every((L) => IsOptional(L));
}
__name(IsIntersectOptional, "IsIntersectOptional");
function RemoveOptionalFromType(T) {
  return Discard(T, [OptionalKind]);
}
__name(RemoveOptionalFromType, "RemoveOptionalFromType");
function RemoveOptionalFromRest(T) {
  return T.map((L) => IsOptional(L) ? RemoveOptionalFromType(L) : L);
}
__name(RemoveOptionalFromRest, "RemoveOptionalFromRest");
function ResolveIntersect(T, options) {
  return IsIntersectOptional(T) ? Optional(IntersectCreate(RemoveOptionalFromRest(T), options)) : IntersectCreate(RemoveOptionalFromRest(T), options);
}
__name(ResolveIntersect, "ResolveIntersect");
function IntersectEvaluated(T, options = {}) {
  if (T.length === 0)
    return Never(options);
  if (T.length === 1)
    return CloneType(T[0], options);
  if (T.some((schema) => IsTransform(schema)))
    throw new Error("Cannot intersect transform types");
  return ResolveIntersect(T, options);
}
__name(IntersectEvaluated, "IntersectEvaluated");

// node_modules/@sinclair/typebox/build/esm/type/intersect/intersect-type.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();

// node_modules/@sinclair/typebox/build/esm/type/intersect/intersect.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();
function Intersect(T, options = {}) {
  if (T.length === 0)
    return Never(options);
  if (T.length === 1)
    return CloneType(T[0], options);
  if (T.some((schema) => IsTransform(schema)))
    throw new Error("Cannot intersect transform types");
  return IntersectCreate(T, options);
}
__name(Intersect, "Intersect");

// node_modules/@sinclair/typebox/build/esm/type/union/index.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();

// node_modules/@sinclair/typebox/build/esm/type/union/union-evaluated.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();

// node_modules/@sinclair/typebox/build/esm/type/union/union-create.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();
function UnionCreate(T, options) {
  return { ...options, [Kind]: "Union", anyOf: CloneRest(T) };
}
__name(UnionCreate, "UnionCreate");

// node_modules/@sinclair/typebox/build/esm/type/union/union-evaluated.mjs
function IsUnionOptional(T) {
  return T.some((L) => IsOptional(L));
}
__name(IsUnionOptional, "IsUnionOptional");
function RemoveOptionalFromRest2(T) {
  return T.map((L) => IsOptional(L) ? RemoveOptionalFromType2(L) : L);
}
__name(RemoveOptionalFromRest2, "RemoveOptionalFromRest");
function RemoveOptionalFromType2(T) {
  return Discard(T, [OptionalKind]);
}
__name(RemoveOptionalFromType2, "RemoveOptionalFromType");
function ResolveUnion(T, options) {
  return IsUnionOptional(T) ? Optional(UnionCreate(RemoveOptionalFromRest2(T), options)) : UnionCreate(RemoveOptionalFromRest2(T), options);
}
__name(ResolveUnion, "ResolveUnion");
function UnionEvaluated(T, options = {}) {
  return T.length === 0 ? Never(options) : T.length === 1 ? CloneType(T[0], options) : ResolveUnion(T, options);
}
__name(UnionEvaluated, "UnionEvaluated");

// node_modules/@sinclair/typebox/build/esm/type/union/union-type.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();

// node_modules/@sinclair/typebox/build/esm/type/union/union.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();
function Union(T, options = {}) {
  return T.length === 0 ? Never(options) : T.length === 1 ? CloneType(T[0], options) : UnionCreate(T, options);
}
__name(Union, "Union");

// node_modules/@sinclair/typebox/build/esm/type/indexed/indexed-property-keys.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();

// node_modules/@sinclair/typebox/build/esm/type/template-literal/index.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();

// node_modules/@sinclair/typebox/build/esm/type/template-literal/finite.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();

// node_modules/@sinclair/typebox/build/esm/type/template-literal/parse.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();
var TemplateLiteralParserError = class extends TypeBoxError {
};
__name(TemplateLiteralParserError, "TemplateLiteralParserError");
function Unescape(pattern) {
  return pattern.replace(/\\\$/g, "$").replace(/\\\*/g, "*").replace(/\\\^/g, "^").replace(/\\\|/g, "|").replace(/\\\(/g, "(").replace(/\\\)/g, ")");
}
__name(Unescape, "Unescape");
function IsNonEscaped(pattern, index, char) {
  return pattern[index] === char && pattern.charCodeAt(index - 1) !== 92;
}
__name(IsNonEscaped, "IsNonEscaped");
function IsOpenParen(pattern, index) {
  return IsNonEscaped(pattern, index, "(");
}
__name(IsOpenParen, "IsOpenParen");
function IsCloseParen(pattern, index) {
  return IsNonEscaped(pattern, index, ")");
}
__name(IsCloseParen, "IsCloseParen");
function IsSeparator(pattern, index) {
  return IsNonEscaped(pattern, index, "|");
}
__name(IsSeparator, "IsSeparator");
function IsGroup(pattern) {
  if (!(IsOpenParen(pattern, 0) && IsCloseParen(pattern, pattern.length - 1)))
    return false;
  let count = 0;
  for (let index = 0; index < pattern.length; index++) {
    if (IsOpenParen(pattern, index))
      count += 1;
    if (IsCloseParen(pattern, index))
      count -= 1;
    if (count === 0 && index !== pattern.length - 1)
      return false;
  }
  return true;
}
__name(IsGroup, "IsGroup");
function InGroup(pattern) {
  return pattern.slice(1, pattern.length - 1);
}
__name(InGroup, "InGroup");
function IsPrecedenceOr(pattern) {
  let count = 0;
  for (let index = 0; index < pattern.length; index++) {
    if (IsOpenParen(pattern, index))
      count += 1;
    if (IsCloseParen(pattern, index))
      count -= 1;
    if (IsSeparator(pattern, index) && count === 0)
      return true;
  }
  return false;
}
__name(IsPrecedenceOr, "IsPrecedenceOr");
function IsPrecedenceAnd(pattern) {
  for (let index = 0; index < pattern.length; index++) {
    if (IsOpenParen(pattern, index))
      return true;
  }
  return false;
}
__name(IsPrecedenceAnd, "IsPrecedenceAnd");
function Or(pattern) {
  let [count, start] = [0, 0];
  const expressions = [];
  for (let index = 0; index < pattern.length; index++) {
    if (IsOpenParen(pattern, index))
      count += 1;
    if (IsCloseParen(pattern, index))
      count -= 1;
    if (IsSeparator(pattern, index) && count === 0) {
      const range2 = pattern.slice(start, index);
      if (range2.length > 0)
        expressions.push(TemplateLiteralParse(range2));
      start = index + 1;
    }
  }
  const range = pattern.slice(start);
  if (range.length > 0)
    expressions.push(TemplateLiteralParse(range));
  if (expressions.length === 0)
    return { type: "const", const: "" };
  if (expressions.length === 1)
    return expressions[0];
  return { type: "or", expr: expressions };
}
__name(Or, "Or");
function And(pattern) {
  function Group(value, index) {
    if (!IsOpenParen(value, index))
      throw new TemplateLiteralParserError(`TemplateLiteralParser: Index must point to open parens`);
    let count = 0;
    for (let scan = index; scan < value.length; scan++) {
      if (IsOpenParen(value, scan))
        count += 1;
      if (IsCloseParen(value, scan))
        count -= 1;
      if (count === 0)
        return [index, scan];
    }
    throw new TemplateLiteralParserError(`TemplateLiteralParser: Unclosed group parens in expression`);
  }
  __name(Group, "Group");
  function Range(pattern2, index) {
    for (let scan = index; scan < pattern2.length; scan++) {
      if (IsOpenParen(pattern2, scan))
        return [index, scan];
    }
    return [index, pattern2.length];
  }
  __name(Range, "Range");
  const expressions = [];
  for (let index = 0; index < pattern.length; index++) {
    if (IsOpenParen(pattern, index)) {
      const [start, end] = Group(pattern, index);
      const range = pattern.slice(start, end + 1);
      expressions.push(TemplateLiteralParse(range));
      index = end;
    } else {
      const [start, end] = Range(pattern, index);
      const range = pattern.slice(start, end);
      if (range.length > 0)
        expressions.push(TemplateLiteralParse(range));
      index = end - 1;
    }
  }
  return expressions.length === 0 ? { type: "const", const: "" } : expressions.length === 1 ? expressions[0] : { type: "and", expr: expressions };
}
__name(And, "And");
function TemplateLiteralParse(pattern) {
  return IsGroup(pattern) ? TemplateLiteralParse(InGroup(pattern)) : IsPrecedenceOr(pattern) ? Or(pattern) : IsPrecedenceAnd(pattern) ? And(pattern) : { type: "const", const: Unescape(pattern) };
}
__name(TemplateLiteralParse, "TemplateLiteralParse");
function TemplateLiteralParseExact(pattern) {
  return TemplateLiteralParse(pattern.slice(1, pattern.length - 1));
}
__name(TemplateLiteralParseExact, "TemplateLiteralParseExact");

// node_modules/@sinclair/typebox/build/esm/type/template-literal/finite.mjs
var TemplateLiteralFiniteError = class extends TypeBoxError {
};
__name(TemplateLiteralFiniteError, "TemplateLiteralFiniteError");
function IsNumberExpression(expression) {
  return expression.type === "or" && expression.expr.length === 2 && expression.expr[0].type === "const" && expression.expr[0].const === "0" && expression.expr[1].type === "const" && expression.expr[1].const === "[1-9][0-9]*";
}
__name(IsNumberExpression, "IsNumberExpression");
function IsBooleanExpression(expression) {
  return expression.type === "or" && expression.expr.length === 2 && expression.expr[0].type === "const" && expression.expr[0].const === "true" && expression.expr[1].type === "const" && expression.expr[1].const === "false";
}
__name(IsBooleanExpression, "IsBooleanExpression");
function IsStringExpression(expression) {
  return expression.type === "const" && expression.const === ".*";
}
__name(IsStringExpression, "IsStringExpression");
function IsTemplateLiteralExpressionFinite(expression) {
  return IsNumberExpression(expression) || IsStringExpression(expression) ? false : IsBooleanExpression(expression) ? true : expression.type === "and" ? expression.expr.every((expr) => IsTemplateLiteralExpressionFinite(expr)) : expression.type === "or" ? expression.expr.every((expr) => IsTemplateLiteralExpressionFinite(expr)) : expression.type === "const" ? true : (() => {
    throw new TemplateLiteralFiniteError(`Unknown expression type`);
  })();
}
__name(IsTemplateLiteralExpressionFinite, "IsTemplateLiteralExpressionFinite");
function IsTemplateLiteralFinite(schema) {
  const expression = TemplateLiteralParseExact(schema.pattern);
  return IsTemplateLiteralExpressionFinite(expression);
}
__name(IsTemplateLiteralFinite, "IsTemplateLiteralFinite");

// node_modules/@sinclair/typebox/build/esm/type/template-literal/generate.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();
var TemplateLiteralGenerateError = class extends TypeBoxError {
};
__name(TemplateLiteralGenerateError, "TemplateLiteralGenerateError");
function* GenerateReduce(buffer) {
  if (buffer.length === 1)
    return yield* buffer[0];
  for (const left of buffer[0]) {
    for (const right of GenerateReduce(buffer.slice(1))) {
      yield `${left}${right}`;
    }
  }
}
__name(GenerateReduce, "GenerateReduce");
function* GenerateAnd(expression) {
  return yield* GenerateReduce(expression.expr.map((expr) => [...TemplateLiteralExpressionGenerate(expr)]));
}
__name(GenerateAnd, "GenerateAnd");
function* GenerateOr(expression) {
  for (const expr of expression.expr)
    yield* TemplateLiteralExpressionGenerate(expr);
}
__name(GenerateOr, "GenerateOr");
function* GenerateConst(expression) {
  return yield expression.const;
}
__name(GenerateConst, "GenerateConst");
function* TemplateLiteralExpressionGenerate(expression) {
  return expression.type === "and" ? yield* GenerateAnd(expression) : expression.type === "or" ? yield* GenerateOr(expression) : expression.type === "const" ? yield* GenerateConst(expression) : (() => {
    throw new TemplateLiteralGenerateError("Unknown expression");
  })();
}
__name(TemplateLiteralExpressionGenerate, "TemplateLiteralExpressionGenerate");
function TemplateLiteralGenerate(schema) {
  const expression = TemplateLiteralParseExact(schema.pattern);
  return IsTemplateLiteralExpressionFinite(expression) ? [...TemplateLiteralExpressionGenerate(expression)] : [];
}
__name(TemplateLiteralGenerate, "TemplateLiteralGenerate");

// node_modules/@sinclair/typebox/build/esm/type/template-literal/syntax.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();

// node_modules/@sinclair/typebox/build/esm/type/literal/index.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();

// node_modules/@sinclair/typebox/build/esm/type/literal/literal.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();
function Literal(value, options = {}) {
  return {
    ...options,
    [Kind]: "Literal",
    const: value,
    type: typeof value
  };
}
__name(Literal, "Literal");

// node_modules/@sinclair/typebox/build/esm/type/boolean/index.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();

// node_modules/@sinclair/typebox/build/esm/type/boolean/boolean.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();
function Boolean2(options = {}) {
  return {
    ...options,
    [Kind]: "Boolean",
    type: "boolean"
  };
}
__name(Boolean2, "Boolean");

// node_modules/@sinclair/typebox/build/esm/type/bigint/index.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();

// node_modules/@sinclair/typebox/build/esm/type/bigint/bigint.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();
function BigInt2(options = {}) {
  return {
    ...options,
    [Kind]: "BigInt",
    type: "bigint"
  };
}
__name(BigInt2, "BigInt");

// node_modules/@sinclair/typebox/build/esm/type/number/index.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();

// node_modules/@sinclair/typebox/build/esm/type/number/number.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();
function Number2(options = {}) {
  return {
    ...options,
    [Kind]: "Number",
    type: "number"
  };
}
__name(Number2, "Number");

// node_modules/@sinclair/typebox/build/esm/type/string/index.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();

// node_modules/@sinclair/typebox/build/esm/type/string/string.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();
function String2(options = {}) {
  return { ...options, [Kind]: "String", type: "string" };
}
__name(String2, "String");

// node_modules/@sinclair/typebox/build/esm/type/template-literal/syntax.mjs
function* FromUnion(syntax) {
  const trim = syntax.trim().replace(/"|'/g, "");
  return trim === "boolean" ? yield Boolean2() : trim === "number" ? yield Number2() : trim === "bigint" ? yield BigInt2() : trim === "string" ? yield String2() : yield (() => {
    const literals = trim.split("|").map((literal) => Literal(literal.trim()));
    return literals.length === 0 ? Never() : literals.length === 1 ? literals[0] : UnionEvaluated(literals);
  })();
}
__name(FromUnion, "FromUnion");
function* FromTerminal(syntax) {
  if (syntax[1] !== "{") {
    const L = Literal("$");
    const R = FromSyntax(syntax.slice(1));
    return yield* [L, ...R];
  }
  for (let i = 2; i < syntax.length; i++) {
    if (syntax[i] === "}") {
      const L = FromUnion(syntax.slice(2, i));
      const R = FromSyntax(syntax.slice(i + 1));
      return yield* [...L, ...R];
    }
  }
  yield Literal(syntax);
}
__name(FromTerminal, "FromTerminal");
function* FromSyntax(syntax) {
  for (let i = 0; i < syntax.length; i++) {
    if (syntax[i] === "$") {
      const L = Literal(syntax.slice(0, i));
      const R = FromTerminal(syntax.slice(i));
      return yield* [L, ...R];
    }
  }
  yield Literal(syntax);
}
__name(FromSyntax, "FromSyntax");
function TemplateLiteralSyntax(syntax) {
  return [...FromSyntax(syntax)];
}
__name(TemplateLiteralSyntax, "TemplateLiteralSyntax");

// node_modules/@sinclair/typebox/build/esm/type/template-literal/pattern.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();

// node_modules/@sinclair/typebox/build/esm/type/patterns/index.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();

// node_modules/@sinclair/typebox/build/esm/type/patterns/patterns.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();
var PatternBoolean = "(true|false)";
var PatternNumber = "(0|[1-9][0-9]*)";
var PatternString = "(.*)";
var PatternBooleanExact = `^${PatternBoolean}$`;
var PatternNumberExact = `^${PatternNumber}$`;
var PatternStringExact = `^${PatternString}$`;

// node_modules/@sinclair/typebox/build/esm/type/template-literal/pattern.mjs
var TemplateLiteralPatternError = class extends TypeBoxError {
};
__name(TemplateLiteralPatternError, "TemplateLiteralPatternError");
function Escape(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
__name(Escape, "Escape");
function Visit2(schema, acc) {
  return IsTemplateLiteral(schema) ? schema.pattern.slice(1, schema.pattern.length - 1) : IsUnion(schema) ? `(${schema.anyOf.map((schema2) => Visit2(schema2, acc)).join("|")})` : IsNumber3(schema) ? `${acc}${PatternNumber}` : IsInteger2(schema) ? `${acc}${PatternNumber}` : IsBigInt3(schema) ? `${acc}${PatternNumber}` : IsString3(schema) ? `${acc}${PatternString}` : IsLiteral(schema) ? `${acc}${Escape(schema.const.toString())}` : IsBoolean3(schema) ? `${acc}${PatternBoolean}` : (() => {
    throw new TemplateLiteralPatternError(`Unexpected Kind '${schema[Kind]}'`);
  })();
}
__name(Visit2, "Visit");
function TemplateLiteralPattern(kinds) {
  return `^${kinds.map((schema) => Visit2(schema, "")).join("")}$`;
}
__name(TemplateLiteralPattern, "TemplateLiteralPattern");

// node_modules/@sinclair/typebox/build/esm/type/template-literal/union.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();
function TemplateLiteralToUnion(schema) {
  const R = TemplateLiteralGenerate(schema);
  const L = R.map((S) => Literal(S));
  return UnionEvaluated(L);
}
__name(TemplateLiteralToUnion, "TemplateLiteralToUnion");

// node_modules/@sinclair/typebox/build/esm/type/template-literal/template-literal.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();
function TemplateLiteral(unresolved, options = {}) {
  const pattern = IsString2(unresolved) ? TemplateLiteralPattern(TemplateLiteralSyntax(unresolved)) : TemplateLiteralPattern(unresolved);
  return { ...options, [Kind]: "TemplateLiteral", type: "string", pattern };
}
__name(TemplateLiteral, "TemplateLiteral");

// node_modules/@sinclair/typebox/build/esm/type/indexed/indexed-property-keys.mjs
function FromTemplateLiteral(T) {
  const R = TemplateLiteralGenerate(T);
  return R.map((S) => S.toString());
}
__name(FromTemplateLiteral, "FromTemplateLiteral");
function FromUnion2(T) {
  const Acc = [];
  for (const L of T)
    Acc.push(...IndexPropertyKeys(L));
  return Acc;
}
__name(FromUnion2, "FromUnion");
function FromLiteral(T) {
  return [T.toString()];
}
__name(FromLiteral, "FromLiteral");
function IndexPropertyKeys(T) {
  return [...new Set(IsTemplateLiteral(T) ? FromTemplateLiteral(T) : IsUnion(T) ? FromUnion2(T.anyOf) : IsLiteral(T) ? FromLiteral(T.const) : IsNumber3(T) ? ["[number]"] : IsInteger2(T) ? ["[number]"] : [])];
}
__name(IndexPropertyKeys, "IndexPropertyKeys");

// node_modules/@sinclair/typebox/build/esm/type/indexed/indexed-from-mapped-result.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();
function FromProperties2(T, P, options) {
  const Acc = {};
  for (const K2 of Object.getOwnPropertyNames(P)) {
    Acc[K2] = Index(T, IndexPropertyKeys(P[K2]), options);
  }
  return Acc;
}
__name(FromProperties2, "FromProperties");
function FromMappedResult2(T, R, options) {
  return FromProperties2(T, R.properties, options);
}
__name(FromMappedResult2, "FromMappedResult");
function IndexFromMappedResult(T, R, options) {
  const P = FromMappedResult2(T, R, options);
  return MappedResult(P);
}
__name(IndexFromMappedResult, "IndexFromMappedResult");

// node_modules/@sinclair/typebox/build/esm/type/indexed/indexed.mjs
function FromRest(T, K) {
  return T.map((L) => IndexFromPropertyKey(L, K));
}
__name(FromRest, "FromRest");
function FromIntersectRest(T) {
  return T.filter((L) => !IsNever(L));
}
__name(FromIntersectRest, "FromIntersectRest");
function FromIntersect(T, K) {
  return IntersectEvaluated(FromIntersectRest(FromRest(T, K)));
}
__name(FromIntersect, "FromIntersect");
function FromUnionRest(T) {
  return T.some((L) => IsNever(L)) ? [] : T;
}
__name(FromUnionRest, "FromUnionRest");
function FromUnion3(T, K) {
  return UnionEvaluated(FromUnionRest(FromRest(T, K)));
}
__name(FromUnion3, "FromUnion");
function FromTuple(T, K) {
  return K in T ? T[K] : K === "[number]" ? UnionEvaluated(T) : Never();
}
__name(FromTuple, "FromTuple");
function FromArray(T, K) {
  return K === "[number]" ? T : Never();
}
__name(FromArray, "FromArray");
function FromProperty(T, K) {
  return K in T ? T[K] : Never();
}
__name(FromProperty, "FromProperty");
function IndexFromPropertyKey(T, K) {
  return IsIntersect(T) ? FromIntersect(T.allOf, K) : IsUnion(T) ? FromUnion3(T.anyOf, K) : IsTuple(T) ? FromTuple(T.items ?? [], K) : IsArray3(T) ? FromArray(T.items, K) : IsObject3(T) ? FromProperty(T.properties, K) : Never();
}
__name(IndexFromPropertyKey, "IndexFromPropertyKey");
function IndexFromPropertyKeys(T, K) {
  return K.map((L) => IndexFromPropertyKey(T, L));
}
__name(IndexFromPropertyKeys, "IndexFromPropertyKeys");
function FromSchema(T, K) {
  return UnionEvaluated(IndexFromPropertyKeys(T, K));
}
__name(FromSchema, "FromSchema");
function Index(T, K, options = {}) {
  return IsMappedResult(K) ? CloneType(IndexFromMappedResult(T, K, options)) : IsMappedKey(K) ? CloneType(IndexFromMappedKey(T, K, options)) : IsSchema(K) ? CloneType(FromSchema(T, IndexPropertyKeys(K)), options) : CloneType(FromSchema(T, K), options);
}
__name(Index, "Index");

// node_modules/@sinclair/typebox/build/esm/type/indexed/indexed-from-mapped-key.mjs
function MappedIndexPropertyKey(T, K, options) {
  return { [K]: Index(T, [K], options) };
}
__name(MappedIndexPropertyKey, "MappedIndexPropertyKey");
function MappedIndexPropertyKeys(T, K, options) {
  return K.reduce((Acc, L) => {
    return { ...Acc, ...MappedIndexPropertyKey(T, L, options) };
  }, {});
}
__name(MappedIndexPropertyKeys, "MappedIndexPropertyKeys");
function MappedIndexProperties(T, K, options) {
  return MappedIndexPropertyKeys(T, K.keys, options);
}
__name(MappedIndexProperties, "MappedIndexProperties");
function IndexFromMappedKey(T, K, options) {
  const P = MappedIndexProperties(T, K, options);
  return MappedResult(P);
}
__name(IndexFromMappedKey, "IndexFromMappedKey");

// node_modules/@sinclair/typebox/build/esm/type/iterator/index.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();

// node_modules/@sinclair/typebox/build/esm/type/iterator/iterator.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();
function Iterator(items, options = {}) {
  return {
    ...options,
    [Kind]: "Iterator",
    type: "Iterator",
    items: CloneType(items)
  };
}
__name(Iterator, "Iterator");

// node_modules/@sinclair/typebox/build/esm/type/object/index.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();

// node_modules/@sinclair/typebox/build/esm/type/object/object.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();
function _Object(properties, options = {}) {
  const propertyKeys = globalThis.Object.getOwnPropertyNames(properties);
  const optionalKeys = propertyKeys.filter((key) => IsOptional(properties[key]));
  const requiredKeys = propertyKeys.filter((name) => !optionalKeys.includes(name));
  const clonedAdditionalProperties = IsSchema(options.additionalProperties) ? { additionalProperties: CloneType(options.additionalProperties) } : {};
  const clonedProperties = {};
  for (const key of propertyKeys)
    clonedProperties[key] = CloneType(properties[key]);
  return requiredKeys.length > 0 ? { ...options, ...clonedAdditionalProperties, [Kind]: "Object", type: "object", properties: clonedProperties, required: requiredKeys } : { ...options, ...clonedAdditionalProperties, [Kind]: "Object", type: "object", properties: clonedProperties };
}
__name(_Object, "_Object");
var Object2 = _Object;

// node_modules/@sinclair/typebox/build/esm/type/promise/index.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();

// node_modules/@sinclair/typebox/build/esm/type/promise/promise.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();
function Promise2(item, options = {}) {
  return {
    ...options,
    [Kind]: "Promise",
    type: "Promise",
    item: CloneType(item)
  };
}
__name(Promise2, "Promise");

// node_modules/@sinclair/typebox/build/esm/type/readonly/index.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();

// node_modules/@sinclair/typebox/build/esm/type/readonly/readonly-from-mapped-result.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();

// node_modules/@sinclair/typebox/build/esm/type/readonly/readonly.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();
function RemoveReadonly(schema) {
  return Discard(CloneType(schema), [ReadonlyKind]);
}
__name(RemoveReadonly, "RemoveReadonly");
function AddReadonly(schema) {
  return { ...CloneType(schema), [ReadonlyKind]: "Readonly" };
}
__name(AddReadonly, "AddReadonly");
function ReadonlyWithFlag(schema, F) {
  return F === false ? RemoveReadonly(schema) : AddReadonly(schema);
}
__name(ReadonlyWithFlag, "ReadonlyWithFlag");
function Readonly(schema, enable) {
  const F = enable ?? true;
  return IsMappedResult(schema) ? ReadonlyFromMappedResult(schema, F) : ReadonlyWithFlag(schema, F);
}
__name(Readonly, "Readonly");

// node_modules/@sinclair/typebox/build/esm/type/readonly/readonly-from-mapped-result.mjs
function FromProperties3(K, F) {
  const Acc = {};
  for (const K2 of globalThis.Object.getOwnPropertyNames(K))
    Acc[K2] = Readonly(K[K2], F);
  return Acc;
}
__name(FromProperties3, "FromProperties");
function FromMappedResult3(R, F) {
  return FromProperties3(R.properties, F);
}
__name(FromMappedResult3, "FromMappedResult");
function ReadonlyFromMappedResult(R, F) {
  const P = FromMappedResult3(R, F);
  return MappedResult(P);
}
__name(ReadonlyFromMappedResult, "ReadonlyFromMappedResult");

// node_modules/@sinclair/typebox/build/esm/type/tuple/index.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();

// node_modules/@sinclair/typebox/build/esm/type/tuple/tuple.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();
function Tuple(items, options = {}) {
  const [additionalItems, minItems, maxItems] = [false, items.length, items.length];
  return items.length > 0 ? { ...options, [Kind]: "Tuple", type: "array", items: CloneRest(items), additionalItems, minItems, maxItems } : { ...options, [Kind]: "Tuple", type: "array", minItems, maxItems };
}
__name(Tuple, "Tuple");

// node_modules/@sinclair/typebox/build/esm/type/sets/index.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();

// node_modules/@sinclair/typebox/build/esm/type/sets/set.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();
function SetIncludes(T, S) {
  return T.includes(S);
}
__name(SetIncludes, "SetIncludes");
function SetDistinct(T) {
  return [...new Set(T)];
}
__name(SetDistinct, "SetDistinct");
function SetIntersect(T, S) {
  return T.filter((L) => S.includes(L));
}
__name(SetIntersect, "SetIntersect");
function SetIntersectManyResolve(T, Init) {
  return T.reduce((Acc, L) => {
    return SetIntersect(Acc, L);
  }, Init);
}
__name(SetIntersectManyResolve, "SetIntersectManyResolve");
function SetIntersectMany(T) {
  return T.length === 1 ? T[0] : T.length > 1 ? SetIntersectManyResolve(T.slice(1), T[0]) : [];
}
__name(SetIntersectMany, "SetIntersectMany");
function SetUnionMany(T) {
  const Acc = [];
  for (const L of T)
    Acc.push(...L);
  return Acc;
}
__name(SetUnionMany, "SetUnionMany");

// node_modules/@sinclair/typebox/build/esm/type/mapped/mapped.mjs
function FromMappedResult4(K, P) {
  return K in P ? FromSchemaType(K, P[K]) : MappedResult(P);
}
__name(FromMappedResult4, "FromMappedResult");
function MappedKeyToKnownMappedResultProperties(K) {
  return { [K]: Literal(K) };
}
__name(MappedKeyToKnownMappedResultProperties, "MappedKeyToKnownMappedResultProperties");
function MappedKeyToUnknownMappedResultProperties(P) {
  const Acc = {};
  for (const L of P)
    Acc[L] = Literal(L);
  return Acc;
}
__name(MappedKeyToUnknownMappedResultProperties, "MappedKeyToUnknownMappedResultProperties");
function MappedKeyToMappedResultProperties(K, P) {
  return SetIncludes(P, K) ? MappedKeyToKnownMappedResultProperties(K) : MappedKeyToUnknownMappedResultProperties(P);
}
__name(MappedKeyToMappedResultProperties, "MappedKeyToMappedResultProperties");
function FromMappedKey(K, P) {
  const R = MappedKeyToMappedResultProperties(K, P);
  return FromMappedResult4(K, R);
}
__name(FromMappedKey, "FromMappedKey");
function FromRest2(K, T) {
  return T.map((L) => FromSchemaType(K, L));
}
__name(FromRest2, "FromRest");
function FromProperties4(K, T) {
  const Acc = {};
  for (const K2 of globalThis.Object.getOwnPropertyNames(T))
    Acc[K2] = FromSchemaType(K, T[K2]);
  return Acc;
}
__name(FromProperties4, "FromProperties");
function FromSchemaType(K, T) {
  return (
    // unevaluated modifier types
    IsOptional(T) ? Optional(FromSchemaType(K, Discard(T, [OptionalKind]))) : IsReadonly(T) ? Readonly(FromSchemaType(K, Discard(T, [ReadonlyKind]))) : (
      // unevaluated mapped types
      IsMappedResult(T) ? FromMappedResult4(K, T.properties) : IsMappedKey(T) ? FromMappedKey(K, T.keys) : (
        // unevaluated types
        IsConstructor(T) ? Constructor(FromRest2(K, T.parameters), FromSchemaType(K, T.returns)) : IsFunction3(T) ? Function2(FromRest2(K, T.parameters), FromSchemaType(K, T.returns)) : IsAsyncIterator3(T) ? AsyncIterator(FromSchemaType(K, T.items)) : IsIterator3(T) ? Iterator(FromSchemaType(K, T.items)) : IsIntersect(T) ? Intersect(FromRest2(K, T.allOf)) : IsUnion(T) ? Union(FromRest2(K, T.anyOf)) : IsTuple(T) ? Tuple(FromRest2(K, T.items ?? [])) : IsObject3(T) ? Object2(FromProperties4(K, T.properties)) : IsArray3(T) ? Array2(FromSchemaType(K, T.items)) : IsPromise2(T) ? Promise2(FromSchemaType(K, T.item)) : T
      )
    )
  );
}
__name(FromSchemaType, "FromSchemaType");
function MappedFunctionReturnType(K, T) {
  const Acc = {};
  for (const L of K)
    Acc[L] = FromSchemaType(L, T);
  return Acc;
}
__name(MappedFunctionReturnType, "MappedFunctionReturnType");
function Mapped(key, map3, options = {}) {
  const K = IsSchema(key) ? IndexPropertyKeys(key) : key;
  const RT = map3({ [Kind]: "MappedKey", keys: K });
  const R = MappedFunctionReturnType(K, RT);
  return CloneType(Object2(R), options);
}
__name(Mapped, "Mapped");

// node_modules/@sinclair/typebox/build/esm/type/keyof/keyof.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();

// node_modules/@sinclair/typebox/build/esm/type/keyof/keyof-property-keys.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();
function FromRest3(T) {
  const Acc = [];
  for (const L of T)
    Acc.push(KeyOfPropertyKeys(L));
  return Acc;
}
__name(FromRest3, "FromRest");
function FromIntersect2(T) {
  const C = FromRest3(T);
  const R = SetUnionMany(C);
  return R;
}
__name(FromIntersect2, "FromIntersect");
function FromUnion4(T) {
  const C = FromRest3(T);
  const R = SetIntersectMany(C);
  return R;
}
__name(FromUnion4, "FromUnion");
function FromTuple2(T) {
  return T.map((_, I) => I.toString());
}
__name(FromTuple2, "FromTuple");
function FromArray2(_) {
  return ["[number]"];
}
__name(FromArray2, "FromArray");
function FromProperties5(T) {
  return globalThis.Object.getOwnPropertyNames(T);
}
__name(FromProperties5, "FromProperties");
function FromPatternProperties(patternProperties) {
  if (!includePatternProperties)
    return [];
  const patternPropertyKeys = globalThis.Object.getOwnPropertyNames(patternProperties);
  return patternPropertyKeys.map((key) => {
    return key[0] === "^" && key[key.length - 1] === "$" ? key.slice(1, key.length - 1) : key;
  });
}
__name(FromPatternProperties, "FromPatternProperties");
function KeyOfPropertyKeys(T) {
  return IsIntersect(T) ? FromIntersect2(T.allOf) : IsUnion(T) ? FromUnion4(T.anyOf) : IsTuple(T) ? FromTuple2(T.items ?? []) : IsArray3(T) ? FromArray2(T.items) : IsObject3(T) ? FromProperties5(T.properties) : IsRecord(T) ? FromPatternProperties(T.patternProperties) : [];
}
__name(KeyOfPropertyKeys, "KeyOfPropertyKeys");
var includePatternProperties = false;
function KeyOfPattern(schema) {
  includePatternProperties = true;
  const keys = KeyOfPropertyKeys(schema);
  includePatternProperties = false;
  const pattern = keys.map((key) => `(${key})`);
  return `^(${pattern.join("|")})$`;
}
__name(KeyOfPattern, "KeyOfPattern");

// node_modules/@sinclair/typebox/build/esm/type/keyof/keyof.mjs
function KeyOfPropertyKeysToRest(T) {
  return T.map((L) => L === "[number]" ? Number2() : Literal(L));
}
__name(KeyOfPropertyKeysToRest, "KeyOfPropertyKeysToRest");
function KeyOf(T, options = {}) {
  if (IsMappedResult(T)) {
    return KeyOfFromMappedResult(T, options);
  } else {
    const K = KeyOfPropertyKeys(T);
    const S = KeyOfPropertyKeysToRest(K);
    const U = UnionEvaluated(S);
    return CloneType(U, options);
  }
}
__name(KeyOf, "KeyOf");

// node_modules/@sinclair/typebox/build/esm/type/keyof/keyof-from-mapped-result.mjs
function FromProperties6(K, options) {
  const Acc = {};
  for (const K2 of globalThis.Object.getOwnPropertyNames(K))
    Acc[K2] = KeyOf(K[K2], options);
  return Acc;
}
__name(FromProperties6, "FromProperties");
function FromMappedResult5(R, options) {
  return FromProperties6(R.properties, options);
}
__name(FromMappedResult5, "FromMappedResult");
function KeyOfFromMappedResult(R, options) {
  const P = FromMappedResult5(R, options);
  return MappedResult(P);
}
__name(KeyOfFromMappedResult, "KeyOfFromMappedResult");

// node_modules/@sinclair/typebox/build/esm/type/keyof/keyof-property-entries.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();
function KeyOfPropertyEntries(schema) {
  const keys = KeyOfPropertyKeys(schema);
  const schemas = IndexFromPropertyKeys(schema, keys);
  return keys.map((_, index) => [keys[index], schemas[index]]);
}
__name(KeyOfPropertyEntries, "KeyOfPropertyEntries");

// node_modules/@sinclair/typebox/build/esm/type/extends/extends-undefined.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();
function Intersect2(schema) {
  return schema.allOf.every((schema2) => ExtendsUndefinedCheck(schema2));
}
__name(Intersect2, "Intersect");
function Union2(schema) {
  return schema.anyOf.some((schema2) => ExtendsUndefinedCheck(schema2));
}
__name(Union2, "Union");
function Not(schema) {
  return !ExtendsUndefinedCheck(schema.not);
}
__name(Not, "Not");
function ExtendsUndefinedCheck(schema) {
  return schema[Kind] === "Intersect" ? Intersect2(schema) : schema[Kind] === "Union" ? Union2(schema) : schema[Kind] === "Not" ? Not(schema) : schema[Kind] === "Undefined" ? true : false;
}
__name(ExtendsUndefinedCheck, "ExtendsUndefinedCheck");

// node_modules/@sinclair/typebox/build/esm/errors/function.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();
function DefaultErrorFunction(error2) {
  switch (error2.errorType) {
    case ValueErrorType.ArrayContains:
      return "Expected array to contain at least one matching value";
    case ValueErrorType.ArrayMaxContains:
      return `Expected array to contain no more than ${error2.schema.maxContains} matching values`;
    case ValueErrorType.ArrayMinContains:
      return `Expected array to contain at least ${error2.schema.minContains} matching values`;
    case ValueErrorType.ArrayMaxItems:
      return `Expected array length to be less or equal to ${error2.schema.maxItems}`;
    case ValueErrorType.ArrayMinItems:
      return `Expected array length to be greater or equal to ${error2.schema.minItems}`;
    case ValueErrorType.ArrayUniqueItems:
      return "Expected array elements to be unique";
    case ValueErrorType.Array:
      return "Expected array";
    case ValueErrorType.AsyncIterator:
      return "Expected AsyncIterator";
    case ValueErrorType.BigIntExclusiveMaximum:
      return `Expected bigint to be less than ${error2.schema.exclusiveMaximum}`;
    case ValueErrorType.BigIntExclusiveMinimum:
      return `Expected bigint to be greater than ${error2.schema.exclusiveMinimum}`;
    case ValueErrorType.BigIntMaximum:
      return `Expected bigint to be less or equal to ${error2.schema.maximum}`;
    case ValueErrorType.BigIntMinimum:
      return `Expected bigint to be greater or equal to ${error2.schema.minimum}`;
    case ValueErrorType.BigIntMultipleOf:
      return `Expected bigint to be a multiple of ${error2.schema.multipleOf}`;
    case ValueErrorType.BigInt:
      return "Expected bigint";
    case ValueErrorType.Boolean:
      return "Expected boolean";
    case ValueErrorType.DateExclusiveMinimumTimestamp:
      return `Expected Date timestamp to be greater than ${error2.schema.exclusiveMinimumTimestamp}`;
    case ValueErrorType.DateExclusiveMaximumTimestamp:
      return `Expected Date timestamp to be less than ${error2.schema.exclusiveMaximumTimestamp}`;
    case ValueErrorType.DateMinimumTimestamp:
      return `Expected Date timestamp to be greater or equal to ${error2.schema.minimumTimestamp}`;
    case ValueErrorType.DateMaximumTimestamp:
      return `Expected Date timestamp to be less or equal to ${error2.schema.maximumTimestamp}`;
    case ValueErrorType.DateMultipleOfTimestamp:
      return `Expected Date timestamp to be a multiple of ${error2.schema.multipleOfTimestamp}`;
    case ValueErrorType.Date:
      return "Expected Date";
    case ValueErrorType.Function:
      return "Expected function";
    case ValueErrorType.IntegerExclusiveMaximum:
      return `Expected integer to be less than ${error2.schema.exclusiveMaximum}`;
    case ValueErrorType.IntegerExclusiveMinimum:
      return `Expected integer to be greater than ${error2.schema.exclusiveMinimum}`;
    case ValueErrorType.IntegerMaximum:
      return `Expected integer to be less or equal to ${error2.schema.maximum}`;
    case ValueErrorType.IntegerMinimum:
      return `Expected integer to be greater or equal to ${error2.schema.minimum}`;
    case ValueErrorType.IntegerMultipleOf:
      return `Expected integer to be a multiple of ${error2.schema.multipleOf}`;
    case ValueErrorType.Integer:
      return "Expected integer";
    case ValueErrorType.IntersectUnevaluatedProperties:
      return "Unexpected property";
    case ValueErrorType.Intersect:
      return "Expected all values to match";
    case ValueErrorType.Iterator:
      return "Expected Iterator";
    case ValueErrorType.Literal:
      return `Expected ${typeof error2.schema.const === "string" ? `'${error2.schema.const}'` : error2.schema.const}`;
    case ValueErrorType.Never:
      return "Never";
    case ValueErrorType.Not:
      return "Value should not match";
    case ValueErrorType.Null:
      return "Expected null";
    case ValueErrorType.NumberExclusiveMaximum:
      return `Expected number to be less than ${error2.schema.exclusiveMaximum}`;
    case ValueErrorType.NumberExclusiveMinimum:
      return `Expected number to be greater than ${error2.schema.exclusiveMinimum}`;
    case ValueErrorType.NumberMaximum:
      return `Expected number to be less or equal to ${error2.schema.maximum}`;
    case ValueErrorType.NumberMinimum:
      return `Expected number to be greater or equal to ${error2.schema.minimum}`;
    case ValueErrorType.NumberMultipleOf:
      return `Expected number to be a multiple of ${error2.schema.multipleOf}`;
    case ValueErrorType.Number:
      return "Expected number";
    case ValueErrorType.Object:
      return "Expected object";
    case ValueErrorType.ObjectAdditionalProperties:
      return "Unexpected property";
    case ValueErrorType.ObjectMaxProperties:
      return `Expected object to have no more than ${error2.schema.maxProperties} properties`;
    case ValueErrorType.ObjectMinProperties:
      return `Expected object to have at least ${error2.schema.minProperties} properties`;
    case ValueErrorType.ObjectRequiredProperty:
      return "Required property";
    case ValueErrorType.Promise:
      return "Expected Promise";
    case ValueErrorType.RegExp:
      return "Expected string to match regular expression";
    case ValueErrorType.StringFormatUnknown:
      return `Unknown format '${error2.schema.format}'`;
    case ValueErrorType.StringFormat:
      return `Expected string to match '${error2.schema.format}' format`;
    case ValueErrorType.StringMaxLength:
      return `Expected string length less or equal to ${error2.schema.maxLength}`;
    case ValueErrorType.StringMinLength:
      return `Expected string length greater or equal to ${error2.schema.minLength}`;
    case ValueErrorType.StringPattern:
      return `Expected string to match '${error2.schema.pattern}'`;
    case ValueErrorType.String:
      return "Expected string";
    case ValueErrorType.Symbol:
      return "Expected symbol";
    case ValueErrorType.TupleLength:
      return `Expected tuple to have ${error2.schema.maxItems || 0} elements`;
    case ValueErrorType.Tuple:
      return "Expected tuple";
    case ValueErrorType.Uint8ArrayMaxByteLength:
      return `Expected byte length less or equal to ${error2.schema.maxByteLength}`;
    case ValueErrorType.Uint8ArrayMinByteLength:
      return `Expected byte length greater or equal to ${error2.schema.minByteLength}`;
    case ValueErrorType.Uint8Array:
      return "Expected Uint8Array";
    case ValueErrorType.Undefined:
      return "Expected undefined";
    case ValueErrorType.Union:
      return "Expected union value";
    case ValueErrorType.Void:
      return "Expected void";
    case ValueErrorType.Kind:
      return `Expected kind '${error2.schema[Kind]}'`;
    default:
      return "Unknown error type";
  }
}
__name(DefaultErrorFunction, "DefaultErrorFunction");
var errorFunction = DefaultErrorFunction;
function GetErrorFunction() {
  return errorFunction;
}
__name(GetErrorFunction, "GetErrorFunction");

// node_modules/@sinclair/typebox/build/esm/value/deref/index.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();

// node_modules/@sinclair/typebox/build/esm/value/deref/deref.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();
var TypeDereferenceError = class extends TypeBoxError {
  constructor(schema) {
    super(`Unable to dereference schema with $id '${schema.$id}'`);
    this.schema = schema;
  }
};
__name(TypeDereferenceError, "TypeDereferenceError");
function Resolve(schema, references) {
  const target = references.find((target2) => target2.$id === schema.$ref);
  if (target === void 0)
    throw new TypeDereferenceError(schema);
  return Deref(target, references);
}
__name(Resolve, "Resolve");
function Deref(schema, references) {
  return schema[Kind] === "This" || schema[Kind] === "Ref" ? Resolve(schema, references) : schema;
}
__name(Deref, "Deref");

// node_modules/@sinclair/typebox/build/esm/value/hash/index.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();

// node_modules/@sinclair/typebox/build/esm/value/hash/hash.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();
var ValueHashError = class extends TypeBoxError {
  constructor(value) {
    super(`Unable to hash value`);
    this.value = value;
  }
};
__name(ValueHashError, "ValueHashError");
var ByteMarker;
(function(ByteMarker2) {
  ByteMarker2[ByteMarker2["Undefined"] = 0] = "Undefined";
  ByteMarker2[ByteMarker2["Null"] = 1] = "Null";
  ByteMarker2[ByteMarker2["Boolean"] = 2] = "Boolean";
  ByteMarker2[ByteMarker2["Number"] = 3] = "Number";
  ByteMarker2[ByteMarker2["String"] = 4] = "String";
  ByteMarker2[ByteMarker2["Object"] = 5] = "Object";
  ByteMarker2[ByteMarker2["Array"] = 6] = "Array";
  ByteMarker2[ByteMarker2["Date"] = 7] = "Date";
  ByteMarker2[ByteMarker2["Uint8Array"] = 8] = "Uint8Array";
  ByteMarker2[ByteMarker2["Symbol"] = 9] = "Symbol";
  ByteMarker2[ByteMarker2["BigInt"] = 10] = "BigInt";
})(ByteMarker || (ByteMarker = {}));
var Accumulator = BigInt("14695981039346656037");
var [Prime, Size] = [BigInt("1099511628211"), BigInt("2") ** BigInt("64")];
var Bytes = Array.from({ length: 256 }).map((_, i) => BigInt(i));
var F64 = new Float64Array(1);
var F64In = new DataView(F64.buffer);
var F64Out = new Uint8Array(F64.buffer);
function* NumberToBytes(value) {
  const byteCount = value === 0 ? 1 : Math.ceil(Math.floor(Math.log2(value) + 1) / 8);
  for (let i = 0; i < byteCount; i++) {
    yield value >> 8 * (byteCount - 1 - i) & 255;
  }
}
__name(NumberToBytes, "NumberToBytes");
function ArrayType2(value) {
  FNV1A64(ByteMarker.Array);
  for (const item of value) {
    Visit3(item);
  }
}
__name(ArrayType2, "ArrayType");
function BooleanType(value) {
  FNV1A64(ByteMarker.Boolean);
  FNV1A64(value ? 1 : 0);
}
__name(BooleanType, "BooleanType");
function BigIntType(value) {
  FNV1A64(ByteMarker.BigInt);
  F64In.setBigInt64(0, value);
  for (const byte2 of F64Out) {
    FNV1A64(byte2);
  }
}
__name(BigIntType, "BigIntType");
function DateType2(value) {
  FNV1A64(ByteMarker.Date);
  Visit3(value.getTime());
}
__name(DateType2, "DateType");
function NullType(value) {
  FNV1A64(ByteMarker.Null);
}
__name(NullType, "NullType");
function NumberType(value) {
  FNV1A64(ByteMarker.Number);
  F64In.setFloat64(0, value);
  for (const byte2 of F64Out) {
    FNV1A64(byte2);
  }
}
__name(NumberType, "NumberType");
function ObjectType2(value) {
  FNV1A64(ByteMarker.Object);
  for (const key of globalThis.Object.getOwnPropertyNames(value).sort()) {
    Visit3(key);
    Visit3(value[key]);
  }
}
__name(ObjectType2, "ObjectType");
function StringType(value) {
  FNV1A64(ByteMarker.String);
  for (let i = 0; i < value.length; i++) {
    for (const byte2 of NumberToBytes(value.charCodeAt(i))) {
      FNV1A64(byte2);
    }
  }
}
__name(StringType, "StringType");
function SymbolType(value) {
  FNV1A64(ByteMarker.Symbol);
  Visit3(value.description);
}
__name(SymbolType, "SymbolType");
function Uint8ArrayType2(value) {
  FNV1A64(ByteMarker.Uint8Array);
  for (let i = 0; i < value.length; i++) {
    FNV1A64(value[i]);
  }
}
__name(Uint8ArrayType2, "Uint8ArrayType");
function UndefinedType(value) {
  return FNV1A64(ByteMarker.Undefined);
}
__name(UndefinedType, "UndefinedType");
function Visit3(value) {
  if (IsArray(value))
    return ArrayType2(value);
  if (IsBoolean(value))
    return BooleanType(value);
  if (IsBigInt(value))
    return BigIntType(value);
  if (IsDate(value))
    return DateType2(value);
  if (IsNull(value))
    return NullType(value);
  if (IsNumber(value))
    return NumberType(value);
  if (IsStandardObject(value))
    return ObjectType2(value);
  if (IsString(value))
    return StringType(value);
  if (IsSymbol(value))
    return SymbolType(value);
  if (IsUint8Array(value))
    return Uint8ArrayType2(value);
  if (IsUndefined(value))
    return UndefinedType(value);
  throw new ValueHashError(value);
}
__name(Visit3, "Visit");
function FNV1A64(byte2) {
  Accumulator = Accumulator ^ Bytes[byte2];
  Accumulator = Accumulator * Prime % Size;
}
__name(FNV1A64, "FNV1A64");
function Hash(value) {
  Accumulator = BigInt("14695981039346656037");
  Visit3(value);
  return Accumulator;
}
__name(Hash, "Hash");

// node_modules/@sinclair/typebox/build/esm/errors/errors.mjs
var ValueErrorType;
(function(ValueErrorType2) {
  ValueErrorType2[ValueErrorType2["ArrayContains"] = 0] = "ArrayContains";
  ValueErrorType2[ValueErrorType2["ArrayMaxContains"] = 1] = "ArrayMaxContains";
  ValueErrorType2[ValueErrorType2["ArrayMaxItems"] = 2] = "ArrayMaxItems";
  ValueErrorType2[ValueErrorType2["ArrayMinContains"] = 3] = "ArrayMinContains";
  ValueErrorType2[ValueErrorType2["ArrayMinItems"] = 4] = "ArrayMinItems";
  ValueErrorType2[ValueErrorType2["ArrayUniqueItems"] = 5] = "ArrayUniqueItems";
  ValueErrorType2[ValueErrorType2["Array"] = 6] = "Array";
  ValueErrorType2[ValueErrorType2["AsyncIterator"] = 7] = "AsyncIterator";
  ValueErrorType2[ValueErrorType2["BigIntExclusiveMaximum"] = 8] = "BigIntExclusiveMaximum";
  ValueErrorType2[ValueErrorType2["BigIntExclusiveMinimum"] = 9] = "BigIntExclusiveMinimum";
  ValueErrorType2[ValueErrorType2["BigIntMaximum"] = 10] = "BigIntMaximum";
  ValueErrorType2[ValueErrorType2["BigIntMinimum"] = 11] = "BigIntMinimum";
  ValueErrorType2[ValueErrorType2["BigIntMultipleOf"] = 12] = "BigIntMultipleOf";
  ValueErrorType2[ValueErrorType2["BigInt"] = 13] = "BigInt";
  ValueErrorType2[ValueErrorType2["Boolean"] = 14] = "Boolean";
  ValueErrorType2[ValueErrorType2["DateExclusiveMaximumTimestamp"] = 15] = "DateExclusiveMaximumTimestamp";
  ValueErrorType2[ValueErrorType2["DateExclusiveMinimumTimestamp"] = 16] = "DateExclusiveMinimumTimestamp";
  ValueErrorType2[ValueErrorType2["DateMaximumTimestamp"] = 17] = "DateMaximumTimestamp";
  ValueErrorType2[ValueErrorType2["DateMinimumTimestamp"] = 18] = "DateMinimumTimestamp";
  ValueErrorType2[ValueErrorType2["DateMultipleOfTimestamp"] = 19] = "DateMultipleOfTimestamp";
  ValueErrorType2[ValueErrorType2["Date"] = 20] = "Date";
  ValueErrorType2[ValueErrorType2["Function"] = 21] = "Function";
  ValueErrorType2[ValueErrorType2["IntegerExclusiveMaximum"] = 22] = "IntegerExclusiveMaximum";
  ValueErrorType2[ValueErrorType2["IntegerExclusiveMinimum"] = 23] = "IntegerExclusiveMinimum";
  ValueErrorType2[ValueErrorType2["IntegerMaximum"] = 24] = "IntegerMaximum";
  ValueErrorType2[ValueErrorType2["IntegerMinimum"] = 25] = "IntegerMinimum";
  ValueErrorType2[ValueErrorType2["IntegerMultipleOf"] = 26] = "IntegerMultipleOf";
  ValueErrorType2[ValueErrorType2["Integer"] = 27] = "Integer";
  ValueErrorType2[ValueErrorType2["IntersectUnevaluatedProperties"] = 28] = "IntersectUnevaluatedProperties";
  ValueErrorType2[ValueErrorType2["Intersect"] = 29] = "Intersect";
  ValueErrorType2[ValueErrorType2["Iterator"] = 30] = "Iterator";
  ValueErrorType2[ValueErrorType2["Kind"] = 31] = "Kind";
  ValueErrorType2[ValueErrorType2["Literal"] = 32] = "Literal";
  ValueErrorType2[ValueErrorType2["Never"] = 33] = "Never";
  ValueErrorType2[ValueErrorType2["Not"] = 34] = "Not";
  ValueErrorType2[ValueErrorType2["Null"] = 35] = "Null";
  ValueErrorType2[ValueErrorType2["NumberExclusiveMaximum"] = 36] = "NumberExclusiveMaximum";
  ValueErrorType2[ValueErrorType2["NumberExclusiveMinimum"] = 37] = "NumberExclusiveMinimum";
  ValueErrorType2[ValueErrorType2["NumberMaximum"] = 38] = "NumberMaximum";
  ValueErrorType2[ValueErrorType2["NumberMinimum"] = 39] = "NumberMinimum";
  ValueErrorType2[ValueErrorType2["NumberMultipleOf"] = 40] = "NumberMultipleOf";
  ValueErrorType2[ValueErrorType2["Number"] = 41] = "Number";
  ValueErrorType2[ValueErrorType2["ObjectAdditionalProperties"] = 42] = "ObjectAdditionalProperties";
  ValueErrorType2[ValueErrorType2["ObjectMaxProperties"] = 43] = "ObjectMaxProperties";
  ValueErrorType2[ValueErrorType2["ObjectMinProperties"] = 44] = "ObjectMinProperties";
  ValueErrorType2[ValueErrorType2["ObjectRequiredProperty"] = 45] = "ObjectRequiredProperty";
  ValueErrorType2[ValueErrorType2["Object"] = 46] = "Object";
  ValueErrorType2[ValueErrorType2["Promise"] = 47] = "Promise";
  ValueErrorType2[ValueErrorType2["RegExp"] = 48] = "RegExp";
  ValueErrorType2[ValueErrorType2["StringFormatUnknown"] = 49] = "StringFormatUnknown";
  ValueErrorType2[ValueErrorType2["StringFormat"] = 50] = "StringFormat";
  ValueErrorType2[ValueErrorType2["StringMaxLength"] = 51] = "StringMaxLength";
  ValueErrorType2[ValueErrorType2["StringMinLength"] = 52] = "StringMinLength";
  ValueErrorType2[ValueErrorType2["StringPattern"] = 53] = "StringPattern";
  ValueErrorType2[ValueErrorType2["String"] = 54] = "String";
  ValueErrorType2[ValueErrorType2["Symbol"] = 55] = "Symbol";
  ValueErrorType2[ValueErrorType2["TupleLength"] = 56] = "TupleLength";
  ValueErrorType2[ValueErrorType2["Tuple"] = 57] = "Tuple";
  ValueErrorType2[ValueErrorType2["Uint8ArrayMaxByteLength"] = 58] = "Uint8ArrayMaxByteLength";
  ValueErrorType2[ValueErrorType2["Uint8ArrayMinByteLength"] = 59] = "Uint8ArrayMinByteLength";
  ValueErrorType2[ValueErrorType2["Uint8Array"] = 60] = "Uint8Array";
  ValueErrorType2[ValueErrorType2["Undefined"] = 61] = "Undefined";
  ValueErrorType2[ValueErrorType2["Union"] = 62] = "Union";
  ValueErrorType2[ValueErrorType2["Void"] = 63] = "Void";
})(ValueErrorType || (ValueErrorType = {}));
var ValueErrorsUnknownTypeError = class extends TypeBoxError {
  constructor(schema) {
    super("Unknown type");
    this.schema = schema;
  }
};
__name(ValueErrorsUnknownTypeError, "ValueErrorsUnknownTypeError");
function EscapeKey(key) {
  return key.replace(/~/g, "~0").replace(/\//g, "~1");
}
__name(EscapeKey, "EscapeKey");
function IsDefined(value) {
  return value !== void 0;
}
__name(IsDefined, "IsDefined");
var ValueErrorIterator = class {
  constructor(iterator) {
    this.iterator = iterator;
  }
  [Symbol.iterator]() {
    return this.iterator;
  }
  /** Returns the first value error or undefined if no errors */
  First() {
    const next = this.iterator.next();
    return next.done ? void 0 : next.value;
  }
};
__name(ValueErrorIterator, "ValueErrorIterator");
function Create(errorType, schema, path2, value) {
  return { type: errorType, schema, path: path2, value, message: GetErrorFunction()({ errorType, path: path2, schema, value }) };
}
__name(Create, "Create");
function* FromAny(schema, references, path2, value) {
}
__name(FromAny, "FromAny");
function* FromArray3(schema, references, path2, value) {
  if (!IsArray(value)) {
    return yield Create(ValueErrorType.Array, schema, path2, value);
  }
  if (IsDefined(schema.minItems) && !(value.length >= schema.minItems)) {
    yield Create(ValueErrorType.ArrayMinItems, schema, path2, value);
  }
  if (IsDefined(schema.maxItems) && !(value.length <= schema.maxItems)) {
    yield Create(ValueErrorType.ArrayMaxItems, schema, path2, value);
  }
  for (let i = 0; i < value.length; i++) {
    yield* Visit4(schema.items, references, `${path2}/${i}`, value[i]);
  }
  if (schema.uniqueItems === true && !function() {
    const set2 = /* @__PURE__ */ new Set();
    for (const element of value) {
      const hashed = Hash(element);
      if (set2.has(hashed)) {
        return false;
      } else {
        set2.add(hashed);
      }
    }
    return true;
  }()) {
    yield Create(ValueErrorType.ArrayUniqueItems, schema, path2, value);
  }
  if (!(IsDefined(schema.contains) || IsDefined(schema.minContains) || IsDefined(schema.maxContains))) {
    return;
  }
  const containsSchema = IsDefined(schema.contains) ? schema.contains : Never();
  const containsCount = value.reduce((acc, value2, index) => Visit4(containsSchema, references, `${path2}${index}`, value2).next().done === true ? acc + 1 : acc, 0);
  if (containsCount === 0) {
    yield Create(ValueErrorType.ArrayContains, schema, path2, value);
  }
  if (IsNumber(schema.minContains) && containsCount < schema.minContains) {
    yield Create(ValueErrorType.ArrayMinContains, schema, path2, value);
  }
  if (IsNumber(schema.maxContains) && containsCount > schema.maxContains) {
    yield Create(ValueErrorType.ArrayMaxContains, schema, path2, value);
  }
}
__name(FromArray3, "FromArray");
function* FromAsyncIterator(schema, references, path2, value) {
  if (!IsAsyncIterator(value))
    yield Create(ValueErrorType.AsyncIterator, schema, path2, value);
}
__name(FromAsyncIterator, "FromAsyncIterator");
function* FromBigInt(schema, references, path2, value) {
  if (!IsBigInt(value))
    return yield Create(ValueErrorType.BigInt, schema, path2, value);
  if (IsDefined(schema.exclusiveMaximum) && !(value < schema.exclusiveMaximum)) {
    yield Create(ValueErrorType.BigIntExclusiveMaximum, schema, path2, value);
  }
  if (IsDefined(schema.exclusiveMinimum) && !(value > schema.exclusiveMinimum)) {
    yield Create(ValueErrorType.BigIntExclusiveMinimum, schema, path2, value);
  }
  if (IsDefined(schema.maximum) && !(value <= schema.maximum)) {
    yield Create(ValueErrorType.BigIntMaximum, schema, path2, value);
  }
  if (IsDefined(schema.minimum) && !(value >= schema.minimum)) {
    yield Create(ValueErrorType.BigIntMinimum, schema, path2, value);
  }
  if (IsDefined(schema.multipleOf) && !(value % schema.multipleOf === BigInt(0))) {
    yield Create(ValueErrorType.BigIntMultipleOf, schema, path2, value);
  }
}
__name(FromBigInt, "FromBigInt");
function* FromBoolean(schema, references, path2, value) {
  if (!IsBoolean(value))
    yield Create(ValueErrorType.Boolean, schema, path2, value);
}
__name(FromBoolean, "FromBoolean");
function* FromConstructor(schema, references, path2, value) {
  yield* Visit4(schema.returns, references, path2, value.prototype);
}
__name(FromConstructor, "FromConstructor");
function* FromDate(schema, references, path2, value) {
  if (!IsDate(value))
    return yield Create(ValueErrorType.Date, schema, path2, value);
  if (IsDefined(schema.exclusiveMaximumTimestamp) && !(value.getTime() < schema.exclusiveMaximumTimestamp)) {
    yield Create(ValueErrorType.DateExclusiveMaximumTimestamp, schema, path2, value);
  }
  if (IsDefined(schema.exclusiveMinimumTimestamp) && !(value.getTime() > schema.exclusiveMinimumTimestamp)) {
    yield Create(ValueErrorType.DateExclusiveMinimumTimestamp, schema, path2, value);
  }
  if (IsDefined(schema.maximumTimestamp) && !(value.getTime() <= schema.maximumTimestamp)) {
    yield Create(ValueErrorType.DateMaximumTimestamp, schema, path2, value);
  }
  if (IsDefined(schema.minimumTimestamp) && !(value.getTime() >= schema.minimumTimestamp)) {
    yield Create(ValueErrorType.DateMinimumTimestamp, schema, path2, value);
  }
  if (IsDefined(schema.multipleOfTimestamp) && !(value.getTime() % schema.multipleOfTimestamp === 0)) {
    yield Create(ValueErrorType.DateMultipleOfTimestamp, schema, path2, value);
  }
}
__name(FromDate, "FromDate");
function* FromFunction(schema, references, path2, value) {
  if (!IsFunction(value))
    yield Create(ValueErrorType.Function, schema, path2, value);
}
__name(FromFunction, "FromFunction");
function* FromInteger(schema, references, path2, value) {
  if (!IsInteger(value))
    return yield Create(ValueErrorType.Integer, schema, path2, value);
  if (IsDefined(schema.exclusiveMaximum) && !(value < schema.exclusiveMaximum)) {
    yield Create(ValueErrorType.IntegerExclusiveMaximum, schema, path2, value);
  }
  if (IsDefined(schema.exclusiveMinimum) && !(value > schema.exclusiveMinimum)) {
    yield Create(ValueErrorType.IntegerExclusiveMinimum, schema, path2, value);
  }
  if (IsDefined(schema.maximum) && !(value <= schema.maximum)) {
    yield Create(ValueErrorType.IntegerMaximum, schema, path2, value);
  }
  if (IsDefined(schema.minimum) && !(value >= schema.minimum)) {
    yield Create(ValueErrorType.IntegerMinimum, schema, path2, value);
  }
  if (IsDefined(schema.multipleOf) && !(value % schema.multipleOf === 0)) {
    yield Create(ValueErrorType.IntegerMultipleOf, schema, path2, value);
  }
}
__name(FromInteger, "FromInteger");
function* FromIntersect3(schema, references, path2, value) {
  for (const inner of schema.allOf) {
    const next = Visit4(inner, references, path2, value).next();
    if (!next.done) {
      yield Create(ValueErrorType.Intersect, schema, path2, value);
      yield next.value;
    }
  }
  if (schema.unevaluatedProperties === false) {
    const keyCheck = new RegExp(KeyOfPattern(schema));
    for (const valueKey of Object.getOwnPropertyNames(value)) {
      if (!keyCheck.test(valueKey)) {
        yield Create(ValueErrorType.IntersectUnevaluatedProperties, schema, `${path2}/${valueKey}`, value);
      }
    }
  }
  if (typeof schema.unevaluatedProperties === "object") {
    const keyCheck = new RegExp(KeyOfPattern(schema));
    for (const valueKey of Object.getOwnPropertyNames(value)) {
      if (!keyCheck.test(valueKey)) {
        const next = Visit4(schema.unevaluatedProperties, references, `${path2}/${valueKey}`, value[valueKey]).next();
        if (!next.done)
          yield next.value;
      }
    }
  }
}
__name(FromIntersect3, "FromIntersect");
function* FromIterator(schema, references, path2, value) {
  if (!IsIterator(value))
    yield Create(ValueErrorType.Iterator, schema, path2, value);
}
__name(FromIterator, "FromIterator");
function* FromLiteral2(schema, references, path2, value) {
  if (!(value === schema.const))
    yield Create(ValueErrorType.Literal, schema, path2, value);
}
__name(FromLiteral2, "FromLiteral");
function* FromNever(schema, references, path2, value) {
  yield Create(ValueErrorType.Never, schema, path2, value);
}
__name(FromNever, "FromNever");
function* FromNot(schema, references, path2, value) {
  if (Visit4(schema.not, references, path2, value).next().done === true)
    yield Create(ValueErrorType.Not, schema, path2, value);
}
__name(FromNot, "FromNot");
function* FromNull(schema, references, path2, value) {
  if (!IsNull(value))
    yield Create(ValueErrorType.Null, schema, path2, value);
}
__name(FromNull, "FromNull");
function* FromNumber(schema, references, path2, value) {
  if (!TypeSystemPolicy.IsNumberLike(value))
    return yield Create(ValueErrorType.Number, schema, path2, value);
  if (IsDefined(schema.exclusiveMaximum) && !(value < schema.exclusiveMaximum)) {
    yield Create(ValueErrorType.NumberExclusiveMaximum, schema, path2, value);
  }
  if (IsDefined(schema.exclusiveMinimum) && !(value > schema.exclusiveMinimum)) {
    yield Create(ValueErrorType.NumberExclusiveMinimum, schema, path2, value);
  }
  if (IsDefined(schema.maximum) && !(value <= schema.maximum)) {
    yield Create(ValueErrorType.NumberMaximum, schema, path2, value);
  }
  if (IsDefined(schema.minimum) && !(value >= schema.minimum)) {
    yield Create(ValueErrorType.NumberMinimum, schema, path2, value);
  }
  if (IsDefined(schema.multipleOf) && !(value % schema.multipleOf === 0)) {
    yield Create(ValueErrorType.NumberMultipleOf, schema, path2, value);
  }
}
__name(FromNumber, "FromNumber");
function* FromObject(schema, references, path2, value) {
  if (!TypeSystemPolicy.IsObjectLike(value))
    return yield Create(ValueErrorType.Object, schema, path2, value);
  if (IsDefined(schema.minProperties) && !(Object.getOwnPropertyNames(value).length >= schema.minProperties)) {
    yield Create(ValueErrorType.ObjectMinProperties, schema, path2, value);
  }
  if (IsDefined(schema.maxProperties) && !(Object.getOwnPropertyNames(value).length <= schema.maxProperties)) {
    yield Create(ValueErrorType.ObjectMaxProperties, schema, path2, value);
  }
  const requiredKeys = Array.isArray(schema.required) ? schema.required : [];
  const knownKeys = Object.getOwnPropertyNames(schema.properties);
  const unknownKeys = Object.getOwnPropertyNames(value);
  for (const requiredKey of requiredKeys) {
    if (unknownKeys.includes(requiredKey))
      continue;
    yield Create(ValueErrorType.ObjectRequiredProperty, schema.properties[requiredKey], `${path2}/${EscapeKey(requiredKey)}`, void 0);
  }
  if (schema.additionalProperties === false) {
    for (const valueKey of unknownKeys) {
      if (!knownKeys.includes(valueKey)) {
        yield Create(ValueErrorType.ObjectAdditionalProperties, schema, `${path2}/${EscapeKey(valueKey)}`, value[valueKey]);
      }
    }
  }
  if (typeof schema.additionalProperties === "object") {
    for (const valueKey of unknownKeys) {
      if (knownKeys.includes(valueKey))
        continue;
      yield* Visit4(schema.additionalProperties, references, `${path2}/${EscapeKey(valueKey)}`, value[valueKey]);
    }
  }
  for (const knownKey of knownKeys) {
    const property = schema.properties[knownKey];
    if (schema.required && schema.required.includes(knownKey)) {
      yield* Visit4(property, references, `${path2}/${EscapeKey(knownKey)}`, value[knownKey]);
      if (ExtendsUndefinedCheck(schema) && !(knownKey in value)) {
        yield Create(ValueErrorType.ObjectRequiredProperty, property, `${path2}/${EscapeKey(knownKey)}`, void 0);
      }
    } else {
      if (TypeSystemPolicy.IsExactOptionalProperty(value, knownKey)) {
        yield* Visit4(property, references, `${path2}/${EscapeKey(knownKey)}`, value[knownKey]);
      }
    }
  }
}
__name(FromObject, "FromObject");
function* FromPromise(schema, references, path2, value) {
  if (!IsPromise(value))
    yield Create(ValueErrorType.Promise, schema, path2, value);
}
__name(FromPromise, "FromPromise");
function* FromRecord(schema, references, path2, value) {
  if (!TypeSystemPolicy.IsRecordLike(value))
    return yield Create(ValueErrorType.Object, schema, path2, value);
  if (IsDefined(schema.minProperties) && !(Object.getOwnPropertyNames(value).length >= schema.minProperties)) {
    yield Create(ValueErrorType.ObjectMinProperties, schema, path2, value);
  }
  if (IsDefined(schema.maxProperties) && !(Object.getOwnPropertyNames(value).length <= schema.maxProperties)) {
    yield Create(ValueErrorType.ObjectMaxProperties, schema, path2, value);
  }
  const [patternKey, patternSchema] = Object.entries(schema.patternProperties)[0];
  const regex2 = new RegExp(patternKey);
  for (const [propertyKey, propertyValue] of Object.entries(value)) {
    if (regex2.test(propertyKey))
      yield* Visit4(patternSchema, references, `${path2}/${EscapeKey(propertyKey)}`, propertyValue);
  }
  if (typeof schema.additionalProperties === "object") {
    for (const [propertyKey, propertyValue] of Object.entries(value)) {
      if (!regex2.test(propertyKey))
        yield* Visit4(schema.additionalProperties, references, `${path2}/${EscapeKey(propertyKey)}`, propertyValue);
    }
  }
  if (schema.additionalProperties === false) {
    for (const [propertyKey, propertyValue] of Object.entries(value)) {
      if (regex2.test(propertyKey))
        continue;
      return yield Create(ValueErrorType.ObjectAdditionalProperties, schema, `${path2}/${EscapeKey(propertyKey)}`, propertyValue);
    }
  }
}
__name(FromRecord, "FromRecord");
function* FromRef(schema, references, path2, value) {
  yield* Visit4(Deref(schema, references), references, path2, value);
}
__name(FromRef, "FromRef");
function* FromRegExp(schema, references, path2, value) {
  if (!IsString(value))
    return yield Create(ValueErrorType.String, schema, path2, value);
  if (IsDefined(schema.minLength) && !(value.length >= schema.minLength)) {
    yield Create(ValueErrorType.StringMinLength, schema, path2, value);
  }
  if (IsDefined(schema.maxLength) && !(value.length <= schema.maxLength)) {
    yield Create(ValueErrorType.StringMaxLength, schema, path2, value);
  }
  const regex2 = new RegExp(schema.source, schema.flags);
  if (!regex2.test(value)) {
    return yield Create(ValueErrorType.RegExp, schema, path2, value);
  }
}
__name(FromRegExp, "FromRegExp");
function* FromString(schema, references, path2, value) {
  if (!IsString(value))
    return yield Create(ValueErrorType.String, schema, path2, value);
  if (IsDefined(schema.minLength) && !(value.length >= schema.minLength)) {
    yield Create(ValueErrorType.StringMinLength, schema, path2, value);
  }
  if (IsDefined(schema.maxLength) && !(value.length <= schema.maxLength)) {
    yield Create(ValueErrorType.StringMaxLength, schema, path2, value);
  }
  if (IsString(schema.pattern)) {
    const regex2 = new RegExp(schema.pattern);
    if (!regex2.test(value)) {
      yield Create(ValueErrorType.StringPattern, schema, path2, value);
    }
  }
  if (IsString(schema.format)) {
    if (!format_exports.Has(schema.format)) {
      yield Create(ValueErrorType.StringFormatUnknown, schema, path2, value);
    } else {
      const format2 = format_exports.Get(schema.format);
      if (!format2(value)) {
        yield Create(ValueErrorType.StringFormat, schema, path2, value);
      }
    }
  }
}
__name(FromString, "FromString");
function* FromSymbol(schema, references, path2, value) {
  if (!IsSymbol(value))
    yield Create(ValueErrorType.Symbol, schema, path2, value);
}
__name(FromSymbol, "FromSymbol");
function* FromTemplateLiteral2(schema, references, path2, value) {
  if (!IsString(value))
    return yield Create(ValueErrorType.String, schema, path2, value);
  const regex2 = new RegExp(schema.pattern);
  if (!regex2.test(value)) {
    yield Create(ValueErrorType.StringPattern, schema, path2, value);
  }
}
__name(FromTemplateLiteral2, "FromTemplateLiteral");
function* FromThis(schema, references, path2, value) {
  yield* Visit4(Deref(schema, references), references, path2, value);
}
__name(FromThis, "FromThis");
function* FromTuple3(schema, references, path2, value) {
  if (!IsArray(value))
    return yield Create(ValueErrorType.Tuple, schema, path2, value);
  if (schema.items === void 0 && !(value.length === 0)) {
    return yield Create(ValueErrorType.TupleLength, schema, path2, value);
  }
  if (!(value.length === schema.maxItems)) {
    return yield Create(ValueErrorType.TupleLength, schema, path2, value);
  }
  if (!schema.items) {
    return;
  }
  for (let i = 0; i < schema.items.length; i++) {
    yield* Visit4(schema.items[i], references, `${path2}/${i}`, value[i]);
  }
}
__name(FromTuple3, "FromTuple");
function* FromUndefined(schema, references, path2, value) {
  if (!IsUndefined(value))
    yield Create(ValueErrorType.Undefined, schema, path2, value);
}
__name(FromUndefined, "FromUndefined");
function* FromUnion5(schema, references, path2, value) {
  let count = 0;
  for (const subschema of schema.anyOf) {
    const errors = [...Visit4(subschema, references, path2, value)];
    if (errors.length === 0)
      return;
    count += errors.length;
  }
  if (count > 0) {
    yield Create(ValueErrorType.Union, schema, path2, value);
  }
}
__name(FromUnion5, "FromUnion");
function* FromUint8Array(schema, references, path2, value) {
  if (!IsUint8Array(value))
    return yield Create(ValueErrorType.Uint8Array, schema, path2, value);
  if (IsDefined(schema.maxByteLength) && !(value.length <= schema.maxByteLength)) {
    yield Create(ValueErrorType.Uint8ArrayMaxByteLength, schema, path2, value);
  }
  if (IsDefined(schema.minByteLength) && !(value.length >= schema.minByteLength)) {
    yield Create(ValueErrorType.Uint8ArrayMinByteLength, schema, path2, value);
  }
}
__name(FromUint8Array, "FromUint8Array");
function* FromUnknown(schema, references, path2, value) {
}
__name(FromUnknown, "FromUnknown");
function* FromVoid(schema, references, path2, value) {
  if (!TypeSystemPolicy.IsVoidLike(value))
    yield Create(ValueErrorType.Void, schema, path2, value);
}
__name(FromVoid, "FromVoid");
function* FromKind(schema, references, path2, value) {
  const check = type_exports.Get(schema[Kind]);
  if (!check(schema, value))
    yield Create(ValueErrorType.Kind, schema, path2, value);
}
__name(FromKind, "FromKind");
function* Visit4(schema, references, path2, value) {
  const references_ = IsDefined(schema.$id) ? [...references, schema] : references;
  const schema_ = schema;
  switch (schema_[Kind]) {
    case "Any":
      return yield* FromAny(schema_, references_, path2, value);
    case "Array":
      return yield* FromArray3(schema_, references_, path2, value);
    case "AsyncIterator":
      return yield* FromAsyncIterator(schema_, references_, path2, value);
    case "BigInt":
      return yield* FromBigInt(schema_, references_, path2, value);
    case "Boolean":
      return yield* FromBoolean(schema_, references_, path2, value);
    case "Constructor":
      return yield* FromConstructor(schema_, references_, path2, value);
    case "Date":
      return yield* FromDate(schema_, references_, path2, value);
    case "Function":
      return yield* FromFunction(schema_, references_, path2, value);
    case "Integer":
      return yield* FromInteger(schema_, references_, path2, value);
    case "Intersect":
      return yield* FromIntersect3(schema_, references_, path2, value);
    case "Iterator":
      return yield* FromIterator(schema_, references_, path2, value);
    case "Literal":
      return yield* FromLiteral2(schema_, references_, path2, value);
    case "Never":
      return yield* FromNever(schema_, references_, path2, value);
    case "Not":
      return yield* FromNot(schema_, references_, path2, value);
    case "Null":
      return yield* FromNull(schema_, references_, path2, value);
    case "Number":
      return yield* FromNumber(schema_, references_, path2, value);
    case "Object":
      return yield* FromObject(schema_, references_, path2, value);
    case "Promise":
      return yield* FromPromise(schema_, references_, path2, value);
    case "Record":
      return yield* FromRecord(schema_, references_, path2, value);
    case "Ref":
      return yield* FromRef(schema_, references_, path2, value);
    case "RegExp":
      return yield* FromRegExp(schema_, references_, path2, value);
    case "String":
      return yield* FromString(schema_, references_, path2, value);
    case "Symbol":
      return yield* FromSymbol(schema_, references_, path2, value);
    case "TemplateLiteral":
      return yield* FromTemplateLiteral2(schema_, references_, path2, value);
    case "This":
      return yield* FromThis(schema_, references_, path2, value);
    case "Tuple":
      return yield* FromTuple3(schema_, references_, path2, value);
    case "Undefined":
      return yield* FromUndefined(schema_, references_, path2, value);
    case "Union":
      return yield* FromUnion5(schema_, references_, path2, value);
    case "Uint8Array":
      return yield* FromUint8Array(schema_, references_, path2, value);
    case "Unknown":
      return yield* FromUnknown(schema_, references_, path2, value);
    case "Void":
      return yield* FromVoid(schema_, references_, path2, value);
    default:
      if (!type_exports.Has(schema_[Kind]))
        throw new ValueErrorsUnknownTypeError(schema);
      return yield* FromKind(schema_, references_, path2, value);
  }
}
__name(Visit4, "Visit");
function Errors(...args) {
  const iterator = args.length === 3 ? Visit4(args[0], args[1], "", args[2]) : Visit4(args[0], [], "", args[1]);
  return new ValueErrorIterator(iterator);
}
__name(Errors, "Errors");

// node_modules/@sinclair/typebox/build/esm/value/cast/index.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();

// node_modules/@sinclair/typebox/build/esm/value/cast/cast.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();

// node_modules/@sinclair/typebox/build/esm/value/create/index.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();

// node_modules/@sinclair/typebox/build/esm/value/create/create.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();

// node_modules/@sinclair/typebox/build/esm/value/check/index.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();

// node_modules/@sinclair/typebox/build/esm/value/check/check.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();

// node_modules/@sinclair/typebox/build/esm/type/extends/index.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();

// node_modules/@sinclair/typebox/build/esm/type/extends/extends-check.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();

// node_modules/@sinclair/typebox/build/esm/type/any/index.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();

// node_modules/@sinclair/typebox/build/esm/type/any/any.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();
function Any(options = {}) {
  return { ...options, [Kind]: "Any" };
}
__name(Any, "Any");

// node_modules/@sinclair/typebox/build/esm/type/unknown/index.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();

// node_modules/@sinclair/typebox/build/esm/type/unknown/unknown.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();
function Unknown(options = {}) {
  return {
    ...options,
    [Kind]: "Unknown"
  };
}
__name(Unknown, "Unknown");

// node_modules/@sinclair/typebox/build/esm/type/guard/index.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();

// node_modules/@sinclair/typebox/build/esm/type/guard/type.mjs
var type_exports2 = {};
__export(type_exports2, {
  IsAny: () => IsAny2,
  IsArray: () => IsArray4,
  IsAsyncIterator: () => IsAsyncIterator4,
  IsBigInt: () => IsBigInt4,
  IsBoolean: () => IsBoolean4,
  IsConstructor: () => IsConstructor2,
  IsDate: () => IsDate4,
  IsFunction: () => IsFunction4,
  IsInteger: () => IsInteger3,
  IsIntersect: () => IsIntersect2,
  IsIterator: () => IsIterator4,
  IsKind: () => IsKind2,
  IsKindOf: () => IsKindOf2,
  IsLiteral: () => IsLiteral2,
  IsLiteralBoolean: () => IsLiteralBoolean,
  IsLiteralNumber: () => IsLiteralNumber,
  IsLiteralString: () => IsLiteralString,
  IsLiteralValue: () => IsLiteralValue,
  IsMappedKey: () => IsMappedKey2,
  IsMappedResult: () => IsMappedResult2,
  IsNever: () => IsNever2,
  IsNot: () => IsNot2,
  IsNull: () => IsNull4,
  IsNumber: () => IsNumber4,
  IsObject: () => IsObject4,
  IsOptional: () => IsOptional2,
  IsPromise: () => IsPromise3,
  IsProperties: () => IsProperties,
  IsReadonly: () => IsReadonly2,
  IsRecord: () => IsRecord2,
  IsRecursive: () => IsRecursive,
  IsRef: () => IsRef2,
  IsRegExp: () => IsRegExp3,
  IsSchema: () => IsSchema2,
  IsString: () => IsString4,
  IsSymbol: () => IsSymbol4,
  IsTemplateLiteral: () => IsTemplateLiteral2,
  IsThis: () => IsThis2,
  IsTransform: () => IsTransform2,
  IsTuple: () => IsTuple2,
  IsUint8Array: () => IsUint8Array4,
  IsUndefined: () => IsUndefined4,
  IsUnion: () => IsUnion2,
  IsUnionLiteral: () => IsUnionLiteral,
  IsUnknown: () => IsUnknown2,
  IsUnsafe: () => IsUnsafe2,
  IsVoid: () => IsVoid2,
  TypeGuardUnknownTypeError: () => TypeGuardUnknownTypeError
});
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();
var TypeGuardUnknownTypeError = class extends TypeBoxError {
};
__name(TypeGuardUnknownTypeError, "TypeGuardUnknownTypeError");
var KnownTypes = [
  "Any",
  "Array",
  "AsyncIterator",
  "BigInt",
  "Boolean",
  "Constructor",
  "Date",
  "Enum",
  "Function",
  "Integer",
  "Intersect",
  "Iterator",
  "Literal",
  "MappedKey",
  "MappedResult",
  "Not",
  "Null",
  "Number",
  "Object",
  "Promise",
  "Record",
  "Ref",
  "RegExp",
  "String",
  "Symbol",
  "TemplateLiteral",
  "This",
  "Tuple",
  "Undefined",
  "Union",
  "Uint8Array",
  "Unknown",
  "Void"
];
function IsPattern(value) {
  try {
    new RegExp(value);
    return true;
  } catch {
    return false;
  }
}
__name(IsPattern, "IsPattern");
function IsControlCharacterFree(value) {
  if (!IsString2(value))
    return false;
  for (let i = 0; i < value.length; i++) {
    const code = value.charCodeAt(i);
    if (code >= 7 && code <= 13 || code === 27 || code === 127) {
      return false;
    }
  }
  return true;
}
__name(IsControlCharacterFree, "IsControlCharacterFree");
function IsAdditionalProperties(value) {
  return IsOptionalBoolean(value) || IsSchema2(value);
}
__name(IsAdditionalProperties, "IsAdditionalProperties");
function IsOptionalBigInt(value) {
  return IsUndefined2(value) || IsBigInt2(value);
}
__name(IsOptionalBigInt, "IsOptionalBigInt");
function IsOptionalNumber(value) {
  return IsUndefined2(value) || IsNumber2(value);
}
__name(IsOptionalNumber, "IsOptionalNumber");
function IsOptionalBoolean(value) {
  return IsUndefined2(value) || IsBoolean2(value);
}
__name(IsOptionalBoolean, "IsOptionalBoolean");
function IsOptionalString(value) {
  return IsUndefined2(value) || IsString2(value);
}
__name(IsOptionalString, "IsOptionalString");
function IsOptionalPattern(value) {
  return IsUndefined2(value) || IsString2(value) && IsControlCharacterFree(value) && IsPattern(value);
}
__name(IsOptionalPattern, "IsOptionalPattern");
function IsOptionalFormat(value) {
  return IsUndefined2(value) || IsString2(value) && IsControlCharacterFree(value);
}
__name(IsOptionalFormat, "IsOptionalFormat");
function IsOptionalSchema(value) {
  return IsUndefined2(value) || IsSchema2(value);
}
__name(IsOptionalSchema, "IsOptionalSchema");
function IsReadonly2(value) {
  return IsObject2(value) && value[ReadonlyKind] === "Readonly";
}
__name(IsReadonly2, "IsReadonly");
function IsOptional2(value) {
  return IsObject2(value) && value[OptionalKind] === "Optional";
}
__name(IsOptional2, "IsOptional");
function IsAny2(value) {
  return IsKindOf2(value, "Any") && IsOptionalString(value.$id);
}
__name(IsAny2, "IsAny");
function IsArray4(value) {
  return IsKindOf2(value, "Array") && value.type === "array" && IsOptionalString(value.$id) && IsSchema2(value.items) && IsOptionalNumber(value.minItems) && IsOptionalNumber(value.maxItems) && IsOptionalBoolean(value.uniqueItems) && IsOptionalSchema(value.contains) && IsOptionalNumber(value.minContains) && IsOptionalNumber(value.maxContains);
}
__name(IsArray4, "IsArray");
function IsAsyncIterator4(value) {
  return IsKindOf2(value, "AsyncIterator") && value.type === "AsyncIterator" && IsOptionalString(value.$id) && IsSchema2(value.items);
}
__name(IsAsyncIterator4, "IsAsyncIterator");
function IsBigInt4(value) {
  return IsKindOf2(value, "BigInt") && value.type === "bigint" && IsOptionalString(value.$id) && IsOptionalBigInt(value.exclusiveMaximum) && IsOptionalBigInt(value.exclusiveMinimum) && IsOptionalBigInt(value.maximum) && IsOptionalBigInt(value.minimum) && IsOptionalBigInt(value.multipleOf);
}
__name(IsBigInt4, "IsBigInt");
function IsBoolean4(value) {
  return IsKindOf2(value, "Boolean") && value.type === "boolean" && IsOptionalString(value.$id);
}
__name(IsBoolean4, "IsBoolean");
function IsConstructor2(value) {
  return IsKindOf2(value, "Constructor") && value.type === "Constructor" && IsOptionalString(value.$id) && IsArray2(value.parameters) && value.parameters.every((schema) => IsSchema2(schema)) && IsSchema2(value.returns);
}
__name(IsConstructor2, "IsConstructor");
function IsDate4(value) {
  return IsKindOf2(value, "Date") && value.type === "Date" && IsOptionalString(value.$id) && IsOptionalNumber(value.exclusiveMaximumTimestamp) && IsOptionalNumber(value.exclusiveMinimumTimestamp) && IsOptionalNumber(value.maximumTimestamp) && IsOptionalNumber(value.minimumTimestamp) && IsOptionalNumber(value.multipleOfTimestamp);
}
__name(IsDate4, "IsDate");
function IsFunction4(value) {
  return IsKindOf2(value, "Function") && value.type === "Function" && IsOptionalString(value.$id) && IsArray2(value.parameters) && value.parameters.every((schema) => IsSchema2(schema)) && IsSchema2(value.returns);
}
__name(IsFunction4, "IsFunction");
function IsInteger3(value) {
  return IsKindOf2(value, "Integer") && value.type === "integer" && IsOptionalString(value.$id) && IsOptionalNumber(value.exclusiveMaximum) && IsOptionalNumber(value.exclusiveMinimum) && IsOptionalNumber(value.maximum) && IsOptionalNumber(value.minimum) && IsOptionalNumber(value.multipleOf);
}
__name(IsInteger3, "IsInteger");
function IsProperties(value) {
  return IsObject2(value) && Object.entries(value).every(([key, schema]) => IsControlCharacterFree(key) && IsSchema2(schema));
}
__name(IsProperties, "IsProperties");
function IsIntersect2(value) {
  return IsKindOf2(value, "Intersect") && (IsString2(value.type) && value.type !== "object" ? false : true) && IsArray2(value.allOf) && value.allOf.every((schema) => IsSchema2(schema) && !IsTransform2(schema)) && IsOptionalString(value.type) && (IsOptionalBoolean(value.unevaluatedProperties) || IsOptionalSchema(value.unevaluatedProperties)) && IsOptionalString(value.$id);
}
__name(IsIntersect2, "IsIntersect");
function IsIterator4(value) {
  return IsKindOf2(value, "Iterator") && value.type === "Iterator" && IsOptionalString(value.$id) && IsSchema2(value.items);
}
__name(IsIterator4, "IsIterator");
function IsKindOf2(value, kind) {
  return IsObject2(value) && Kind in value && value[Kind] === kind;
}
__name(IsKindOf2, "IsKindOf");
function IsLiteralString(value) {
  return IsLiteral2(value) && IsString2(value.const);
}
__name(IsLiteralString, "IsLiteralString");
function IsLiteralNumber(value) {
  return IsLiteral2(value) && IsNumber2(value.const);
}
__name(IsLiteralNumber, "IsLiteralNumber");
function IsLiteralBoolean(value) {
  return IsLiteral2(value) && IsBoolean2(value.const);
}
__name(IsLiteralBoolean, "IsLiteralBoolean");
function IsLiteral2(value) {
  return IsKindOf2(value, "Literal") && IsOptionalString(value.$id) && IsLiteralValue(value.const);
}
__name(IsLiteral2, "IsLiteral");
function IsLiteralValue(value) {
  return IsBoolean2(value) || IsNumber2(value) || IsString2(value);
}
__name(IsLiteralValue, "IsLiteralValue");
function IsMappedKey2(value) {
  return IsKindOf2(value, "MappedKey") && IsArray2(value.keys) && value.keys.every((key) => IsNumber2(key) || IsString2(key));
}
__name(IsMappedKey2, "IsMappedKey");
function IsMappedResult2(value) {
  return IsKindOf2(value, "MappedResult") && IsProperties(value.properties);
}
__name(IsMappedResult2, "IsMappedResult");
function IsNever2(value) {
  return IsKindOf2(value, "Never") && IsObject2(value.not) && Object.getOwnPropertyNames(value.not).length === 0;
}
__name(IsNever2, "IsNever");
function IsNot2(value) {
  return IsKindOf2(value, "Not") && IsSchema2(value.not);
}
__name(IsNot2, "IsNot");
function IsNull4(value) {
  return IsKindOf2(value, "Null") && value.type === "null" && IsOptionalString(value.$id);
}
__name(IsNull4, "IsNull");
function IsNumber4(value) {
  return IsKindOf2(value, "Number") && value.type === "number" && IsOptionalString(value.$id) && IsOptionalNumber(value.exclusiveMaximum) && IsOptionalNumber(value.exclusiveMinimum) && IsOptionalNumber(value.maximum) && IsOptionalNumber(value.minimum) && IsOptionalNumber(value.multipleOf);
}
__name(IsNumber4, "IsNumber");
function IsObject4(value) {
  return IsKindOf2(value, "Object") && value.type === "object" && IsOptionalString(value.$id) && IsProperties(value.properties) && IsAdditionalProperties(value.additionalProperties) && IsOptionalNumber(value.minProperties) && IsOptionalNumber(value.maxProperties);
}
__name(IsObject4, "IsObject");
function IsPromise3(value) {
  return IsKindOf2(value, "Promise") && value.type === "Promise" && IsOptionalString(value.$id) && IsSchema2(value.item);
}
__name(IsPromise3, "IsPromise");
function IsRecord2(value) {
  return IsKindOf2(value, "Record") && value.type === "object" && IsOptionalString(value.$id) && IsAdditionalProperties(value.additionalProperties) && IsObject2(value.patternProperties) && ((schema) => {
    const keys = Object.getOwnPropertyNames(schema.patternProperties);
    return keys.length === 1 && IsPattern(keys[0]) && IsObject2(schema.patternProperties) && IsSchema2(schema.patternProperties[keys[0]]);
  })(value);
}
__name(IsRecord2, "IsRecord");
function IsRecursive(value) {
  return IsObject2(value) && Hint in value && value[Hint] === "Recursive";
}
__name(IsRecursive, "IsRecursive");
function IsRef2(value) {
  return IsKindOf2(value, "Ref") && IsOptionalString(value.$id) && IsString2(value.$ref);
}
__name(IsRef2, "IsRef");
function IsRegExp3(value) {
  return IsKindOf2(value, "RegExp") && IsOptionalString(value.$id) && IsString2(value.source) && IsString2(value.flags) && IsOptionalNumber(value.maxLength) && IsOptionalNumber(value.minLength);
}
__name(IsRegExp3, "IsRegExp");
function IsString4(value) {
  return IsKindOf2(value, "String") && value.type === "string" && IsOptionalString(value.$id) && IsOptionalNumber(value.minLength) && IsOptionalNumber(value.maxLength) && IsOptionalPattern(value.pattern) && IsOptionalFormat(value.format);
}
__name(IsString4, "IsString");
function IsSymbol4(value) {
  return IsKindOf2(value, "Symbol") && value.type === "symbol" && IsOptionalString(value.$id);
}
__name(IsSymbol4, "IsSymbol");
function IsTemplateLiteral2(value) {
  return IsKindOf2(value, "TemplateLiteral") && value.type === "string" && IsString2(value.pattern) && value.pattern[0] === "^" && value.pattern[value.pattern.length - 1] === "$";
}
__name(IsTemplateLiteral2, "IsTemplateLiteral");
function IsThis2(value) {
  return IsKindOf2(value, "This") && IsOptionalString(value.$id) && IsString2(value.$ref);
}
__name(IsThis2, "IsThis");
function IsTransform2(value) {
  return IsObject2(value) && TransformKind in value;
}
__name(IsTransform2, "IsTransform");
function IsTuple2(value) {
  return IsKindOf2(value, "Tuple") && value.type === "array" && IsOptionalString(value.$id) && IsNumber2(value.minItems) && IsNumber2(value.maxItems) && value.minItems === value.maxItems && // empty
  (IsUndefined2(value.items) && IsUndefined2(value.additionalItems) && value.minItems === 0 || IsArray2(value.items) && value.items.every((schema) => IsSchema2(schema)));
}
__name(IsTuple2, "IsTuple");
function IsUndefined4(value) {
  return IsKindOf2(value, "Undefined") && value.type === "undefined" && IsOptionalString(value.$id);
}
__name(IsUndefined4, "IsUndefined");
function IsUnionLiteral(value) {
  return IsUnion2(value) && value.anyOf.every((schema) => IsLiteralString(schema) || IsLiteralNumber(schema));
}
__name(IsUnionLiteral, "IsUnionLiteral");
function IsUnion2(value) {
  return IsKindOf2(value, "Union") && IsOptionalString(value.$id) && IsObject2(value) && IsArray2(value.anyOf) && value.anyOf.every((schema) => IsSchema2(schema));
}
__name(IsUnion2, "IsUnion");
function IsUint8Array4(value) {
  return IsKindOf2(value, "Uint8Array") && value.type === "Uint8Array" && IsOptionalString(value.$id) && IsOptionalNumber(value.minByteLength) && IsOptionalNumber(value.maxByteLength);
}
__name(IsUint8Array4, "IsUint8Array");
function IsUnknown2(value) {
  return IsKindOf2(value, "Unknown") && IsOptionalString(value.$id);
}
__name(IsUnknown2, "IsUnknown");
function IsUnsafe2(value) {
  return IsKindOf2(value, "Unsafe");
}
__name(IsUnsafe2, "IsUnsafe");
function IsVoid2(value) {
  return IsKindOf2(value, "Void") && value.type === "void" && IsOptionalString(value.$id);
}
__name(IsVoid2, "IsVoid");
function IsKind2(value) {
  return IsObject2(value) && Kind in value && IsString2(value[Kind]) && !KnownTypes.includes(value[Kind]);
}
__name(IsKind2, "IsKind");
function IsSchema2(value) {
  return IsObject2(value) && (IsAny2(value) || IsArray4(value) || IsBoolean4(value) || IsBigInt4(value) || IsAsyncIterator4(value) || IsConstructor2(value) || IsDate4(value) || IsFunction4(value) || IsInteger3(value) || IsIntersect2(value) || IsIterator4(value) || IsLiteral2(value) || IsMappedKey2(value) || IsMappedResult2(value) || IsNever2(value) || IsNot2(value) || IsNull4(value) || IsNumber4(value) || IsObject4(value) || IsPromise3(value) || IsRecord2(value) || IsRef2(value) || IsRegExp3(value) || IsString4(value) || IsSymbol4(value) || IsTemplateLiteral2(value) || IsThis2(value) || IsTuple2(value) || IsUndefined4(value) || IsUnion2(value) || IsUint8Array4(value) || IsUnknown2(value) || IsUnsafe2(value) || IsVoid2(value) || IsKind2(value));
}
__name(IsSchema2, "IsSchema");

// node_modules/@sinclair/typebox/build/esm/type/extends/extends-check.mjs
var ExtendsResolverError = class extends TypeBoxError {
};
__name(ExtendsResolverError, "ExtendsResolverError");
var ExtendsResult;
(function(ExtendsResult3) {
  ExtendsResult3[ExtendsResult3["Union"] = 0] = "Union";
  ExtendsResult3[ExtendsResult3["True"] = 1] = "True";
  ExtendsResult3[ExtendsResult3["False"] = 2] = "False";
})(ExtendsResult || (ExtendsResult = {}));
function IntoBooleanResult(result) {
  return result === ExtendsResult.False ? result : ExtendsResult.True;
}
__name(IntoBooleanResult, "IntoBooleanResult");
function Throw(message) {
  throw new ExtendsResolverError(message);
}
__name(Throw, "Throw");
function IsStructuralRight(right) {
  return type_exports2.IsNever(right) || type_exports2.IsIntersect(right) || type_exports2.IsUnion(right) || type_exports2.IsUnknown(right) || type_exports2.IsAny(right);
}
__name(IsStructuralRight, "IsStructuralRight");
function StructuralRight(left, right) {
  return type_exports2.IsNever(right) ? FromNeverRight(left, right) : type_exports2.IsIntersect(right) ? FromIntersectRight(left, right) : type_exports2.IsUnion(right) ? FromUnionRight(left, right) : type_exports2.IsUnknown(right) ? FromUnknownRight(left, right) : type_exports2.IsAny(right) ? FromAnyRight(left, right) : Throw("StructuralRight");
}
__name(StructuralRight, "StructuralRight");
function FromAnyRight(left, right) {
  return ExtendsResult.True;
}
__name(FromAnyRight, "FromAnyRight");
function FromAny2(left, right) {
  return type_exports2.IsIntersect(right) ? FromIntersectRight(left, right) : type_exports2.IsUnion(right) && right.anyOf.some((schema) => type_exports2.IsAny(schema) || type_exports2.IsUnknown(schema)) ? ExtendsResult.True : type_exports2.IsUnion(right) ? ExtendsResult.Union : type_exports2.IsUnknown(right) ? ExtendsResult.True : type_exports2.IsAny(right) ? ExtendsResult.True : ExtendsResult.Union;
}
__name(FromAny2, "FromAny");
function FromArrayRight(left, right) {
  return type_exports2.IsUnknown(left) ? ExtendsResult.False : type_exports2.IsAny(left) ? ExtendsResult.Union : type_exports2.IsNever(left) ? ExtendsResult.True : ExtendsResult.False;
}
__name(FromArrayRight, "FromArrayRight");
function FromArray4(left, right) {
  return type_exports2.IsObject(right) && IsObjectArrayLike(right) ? ExtendsResult.True : IsStructuralRight(right) ? StructuralRight(left, right) : !type_exports2.IsArray(right) ? ExtendsResult.False : IntoBooleanResult(Visit5(left.items, right.items));
}
__name(FromArray4, "FromArray");
function FromAsyncIterator2(left, right) {
  return IsStructuralRight(right) ? StructuralRight(left, right) : !type_exports2.IsAsyncIterator(right) ? ExtendsResult.False : IntoBooleanResult(Visit5(left.items, right.items));
}
__name(FromAsyncIterator2, "FromAsyncIterator");
function FromBigInt2(left, right) {
  return IsStructuralRight(right) ? StructuralRight(left, right) : type_exports2.IsObject(right) ? FromObjectRight(left, right) : type_exports2.IsRecord(right) ? FromRecordRight(left, right) : type_exports2.IsBigInt(right) ? ExtendsResult.True : ExtendsResult.False;
}
__name(FromBigInt2, "FromBigInt");
function FromBooleanRight(left, right) {
  return type_exports2.IsLiteralBoolean(left) ? ExtendsResult.True : type_exports2.IsBoolean(left) ? ExtendsResult.True : ExtendsResult.False;
}
__name(FromBooleanRight, "FromBooleanRight");
function FromBoolean2(left, right) {
  return IsStructuralRight(right) ? StructuralRight(left, right) : type_exports2.IsObject(right) ? FromObjectRight(left, right) : type_exports2.IsRecord(right) ? FromRecordRight(left, right) : type_exports2.IsBoolean(right) ? ExtendsResult.True : ExtendsResult.False;
}
__name(FromBoolean2, "FromBoolean");
function FromConstructor2(left, right) {
  return IsStructuralRight(right) ? StructuralRight(left, right) : type_exports2.IsObject(right) ? FromObjectRight(left, right) : !type_exports2.IsConstructor(right) ? ExtendsResult.False : left.parameters.length > right.parameters.length ? ExtendsResult.False : !left.parameters.every((schema, index) => IntoBooleanResult(Visit5(right.parameters[index], schema)) === ExtendsResult.True) ? ExtendsResult.False : IntoBooleanResult(Visit5(left.returns, right.returns));
}
__name(FromConstructor2, "FromConstructor");
function FromDate2(left, right) {
  return IsStructuralRight(right) ? StructuralRight(left, right) : type_exports2.IsObject(right) ? FromObjectRight(left, right) : type_exports2.IsRecord(right) ? FromRecordRight(left, right) : type_exports2.IsDate(right) ? ExtendsResult.True : ExtendsResult.False;
}
__name(FromDate2, "FromDate");
function FromFunction2(left, right) {
  return IsStructuralRight(right) ? StructuralRight(left, right) : type_exports2.IsObject(right) ? FromObjectRight(left, right) : !type_exports2.IsFunction(right) ? ExtendsResult.False : left.parameters.length > right.parameters.length ? ExtendsResult.False : !left.parameters.every((schema, index) => IntoBooleanResult(Visit5(right.parameters[index], schema)) === ExtendsResult.True) ? ExtendsResult.False : IntoBooleanResult(Visit5(left.returns, right.returns));
}
__name(FromFunction2, "FromFunction");
function FromIntegerRight(left, right) {
  return type_exports2.IsLiteral(left) && value_exports.IsNumber(left.const) ? ExtendsResult.True : type_exports2.IsNumber(left) || type_exports2.IsInteger(left) ? ExtendsResult.True : ExtendsResult.False;
}
__name(FromIntegerRight, "FromIntegerRight");
function FromInteger2(left, right) {
  return type_exports2.IsInteger(right) || type_exports2.IsNumber(right) ? ExtendsResult.True : IsStructuralRight(right) ? StructuralRight(left, right) : type_exports2.IsObject(right) ? FromObjectRight(left, right) : type_exports2.IsRecord(right) ? FromRecordRight(left, right) : ExtendsResult.False;
}
__name(FromInteger2, "FromInteger");
function FromIntersectRight(left, right) {
  return right.allOf.every((schema) => Visit5(left, schema) === ExtendsResult.True) ? ExtendsResult.True : ExtendsResult.False;
}
__name(FromIntersectRight, "FromIntersectRight");
function FromIntersect4(left, right) {
  return left.allOf.some((schema) => Visit5(schema, right) === ExtendsResult.True) ? ExtendsResult.True : ExtendsResult.False;
}
__name(FromIntersect4, "FromIntersect");
function FromIterator2(left, right) {
  return IsStructuralRight(right) ? StructuralRight(left, right) : !type_exports2.IsIterator(right) ? ExtendsResult.False : IntoBooleanResult(Visit5(left.items, right.items));
}
__name(FromIterator2, "FromIterator");
function FromLiteral3(left, right) {
  return type_exports2.IsLiteral(right) && right.const === left.const ? ExtendsResult.True : IsStructuralRight(right) ? StructuralRight(left, right) : type_exports2.IsObject(right) ? FromObjectRight(left, right) : type_exports2.IsRecord(right) ? FromRecordRight(left, right) : type_exports2.IsString(right) ? FromStringRight(left, right) : type_exports2.IsNumber(right) ? FromNumberRight(left, right) : type_exports2.IsInteger(right) ? FromIntegerRight(left, right) : type_exports2.IsBoolean(right) ? FromBooleanRight(left, right) : ExtendsResult.False;
}
__name(FromLiteral3, "FromLiteral");
function FromNeverRight(left, right) {
  return ExtendsResult.False;
}
__name(FromNeverRight, "FromNeverRight");
function FromNever2(left, right) {
  return ExtendsResult.True;
}
__name(FromNever2, "FromNever");
function UnwrapTNot(schema) {
  let [current, depth] = [schema, 0];
  while (true) {
    if (!type_exports2.IsNot(current))
      break;
    current = current.not;
    depth += 1;
  }
  return depth % 2 === 0 ? current : Unknown();
}
__name(UnwrapTNot, "UnwrapTNot");
function FromNot2(left, right) {
  return type_exports2.IsNot(left) ? Visit5(UnwrapTNot(left), right) : type_exports2.IsNot(right) ? Visit5(left, UnwrapTNot(right)) : Throw("Invalid fallthrough for Not");
}
__name(FromNot2, "FromNot");
function FromNull2(left, right) {
  return IsStructuralRight(right) ? StructuralRight(left, right) : type_exports2.IsObject(right) ? FromObjectRight(left, right) : type_exports2.IsRecord(right) ? FromRecordRight(left, right) : type_exports2.IsNull(right) ? ExtendsResult.True : ExtendsResult.False;
}
__name(FromNull2, "FromNull");
function FromNumberRight(left, right) {
  return type_exports2.IsLiteralNumber(left) ? ExtendsResult.True : type_exports2.IsNumber(left) || type_exports2.IsInteger(left) ? ExtendsResult.True : ExtendsResult.False;
}
__name(FromNumberRight, "FromNumberRight");
function FromNumber2(left, right) {
  return IsStructuralRight(right) ? StructuralRight(left, right) : type_exports2.IsObject(right) ? FromObjectRight(left, right) : type_exports2.IsRecord(right) ? FromRecordRight(left, right) : type_exports2.IsInteger(right) || type_exports2.IsNumber(right) ? ExtendsResult.True : ExtendsResult.False;
}
__name(FromNumber2, "FromNumber");
function IsObjectPropertyCount(schema, count) {
  return Object.getOwnPropertyNames(schema.properties).length === count;
}
__name(IsObjectPropertyCount, "IsObjectPropertyCount");
function IsObjectStringLike(schema) {
  return IsObjectArrayLike(schema);
}
__name(IsObjectStringLike, "IsObjectStringLike");
function IsObjectSymbolLike(schema) {
  return IsObjectPropertyCount(schema, 0) || IsObjectPropertyCount(schema, 1) && "description" in schema.properties && type_exports2.IsUnion(schema.properties.description) && schema.properties.description.anyOf.length === 2 && (type_exports2.IsString(schema.properties.description.anyOf[0]) && type_exports2.IsUndefined(schema.properties.description.anyOf[1]) || type_exports2.IsString(schema.properties.description.anyOf[1]) && type_exports2.IsUndefined(schema.properties.description.anyOf[0]));
}
__name(IsObjectSymbolLike, "IsObjectSymbolLike");
function IsObjectNumberLike(schema) {
  return IsObjectPropertyCount(schema, 0);
}
__name(IsObjectNumberLike, "IsObjectNumberLike");
function IsObjectBooleanLike(schema) {
  return IsObjectPropertyCount(schema, 0);
}
__name(IsObjectBooleanLike, "IsObjectBooleanLike");
function IsObjectBigIntLike(schema) {
  return IsObjectPropertyCount(schema, 0);
}
__name(IsObjectBigIntLike, "IsObjectBigIntLike");
function IsObjectDateLike(schema) {
  return IsObjectPropertyCount(schema, 0);
}
__name(IsObjectDateLike, "IsObjectDateLike");
function IsObjectUint8ArrayLike(schema) {
  return IsObjectArrayLike(schema);
}
__name(IsObjectUint8ArrayLike, "IsObjectUint8ArrayLike");
function IsObjectFunctionLike(schema) {
  const length = Number2();
  return IsObjectPropertyCount(schema, 0) || IsObjectPropertyCount(schema, 1) && "length" in schema.properties && IntoBooleanResult(Visit5(schema.properties["length"], length)) === ExtendsResult.True;
}
__name(IsObjectFunctionLike, "IsObjectFunctionLike");
function IsObjectConstructorLike(schema) {
  return IsObjectPropertyCount(schema, 0);
}
__name(IsObjectConstructorLike, "IsObjectConstructorLike");
function IsObjectArrayLike(schema) {
  const length = Number2();
  return IsObjectPropertyCount(schema, 0) || IsObjectPropertyCount(schema, 1) && "length" in schema.properties && IntoBooleanResult(Visit5(schema.properties["length"], length)) === ExtendsResult.True;
}
__name(IsObjectArrayLike, "IsObjectArrayLike");
function IsObjectPromiseLike(schema) {
  const then = Function2([Any()], Any());
  return IsObjectPropertyCount(schema, 0) || IsObjectPropertyCount(schema, 1) && "then" in schema.properties && IntoBooleanResult(Visit5(schema.properties["then"], then)) === ExtendsResult.True;
}
__name(IsObjectPromiseLike, "IsObjectPromiseLike");
function Property(left, right) {
  return Visit5(left, right) === ExtendsResult.False ? ExtendsResult.False : type_exports2.IsOptional(left) && !type_exports2.IsOptional(right) ? ExtendsResult.False : ExtendsResult.True;
}
__name(Property, "Property");
function FromObjectRight(left, right) {
  return type_exports2.IsUnknown(left) ? ExtendsResult.False : type_exports2.IsAny(left) ? ExtendsResult.Union : type_exports2.IsNever(left) || type_exports2.IsLiteralString(left) && IsObjectStringLike(right) || type_exports2.IsLiteralNumber(left) && IsObjectNumberLike(right) || type_exports2.IsLiteralBoolean(left) && IsObjectBooleanLike(right) || type_exports2.IsSymbol(left) && IsObjectSymbolLike(right) || type_exports2.IsBigInt(left) && IsObjectBigIntLike(right) || type_exports2.IsString(left) && IsObjectStringLike(right) || type_exports2.IsSymbol(left) && IsObjectSymbolLike(right) || type_exports2.IsNumber(left) && IsObjectNumberLike(right) || type_exports2.IsInteger(left) && IsObjectNumberLike(right) || type_exports2.IsBoolean(left) && IsObjectBooleanLike(right) || type_exports2.IsUint8Array(left) && IsObjectUint8ArrayLike(right) || type_exports2.IsDate(left) && IsObjectDateLike(right) || type_exports2.IsConstructor(left) && IsObjectConstructorLike(right) || type_exports2.IsFunction(left) && IsObjectFunctionLike(right) ? ExtendsResult.True : type_exports2.IsRecord(left) && type_exports2.IsString(RecordKey(left)) ? (() => {
    return right[Hint] === "Record" ? ExtendsResult.True : ExtendsResult.False;
  })() : type_exports2.IsRecord(left) && type_exports2.IsNumber(RecordKey(left)) ? (() => {
    return IsObjectPropertyCount(right, 0) ? ExtendsResult.True : ExtendsResult.False;
  })() : ExtendsResult.False;
}
__name(FromObjectRight, "FromObjectRight");
function FromObject2(left, right) {
  return IsStructuralRight(right) ? StructuralRight(left, right) : type_exports2.IsRecord(right) ? FromRecordRight(left, right) : !type_exports2.IsObject(right) ? ExtendsResult.False : (() => {
    for (const key of Object.getOwnPropertyNames(right.properties)) {
      if (!(key in left.properties) && !type_exports2.IsOptional(right.properties[key])) {
        return ExtendsResult.False;
      }
      if (type_exports2.IsOptional(right.properties[key])) {
        return ExtendsResult.True;
      }
      if (Property(left.properties[key], right.properties[key]) === ExtendsResult.False) {
        return ExtendsResult.False;
      }
    }
    return ExtendsResult.True;
  })();
}
__name(FromObject2, "FromObject");
function FromPromise2(left, right) {
  return IsStructuralRight(right) ? StructuralRight(left, right) : type_exports2.IsObject(right) && IsObjectPromiseLike(right) ? ExtendsResult.True : !type_exports2.IsPromise(right) ? ExtendsResult.False : IntoBooleanResult(Visit5(left.item, right.item));
}
__name(FromPromise2, "FromPromise");
function RecordKey(schema) {
  return PatternNumberExact in schema.patternProperties ? Number2() : PatternStringExact in schema.patternProperties ? String2() : Throw("Unknown record key pattern");
}
__name(RecordKey, "RecordKey");
function RecordValue(schema) {
  return PatternNumberExact in schema.patternProperties ? schema.patternProperties[PatternNumberExact] : PatternStringExact in schema.patternProperties ? schema.patternProperties[PatternStringExact] : Throw("Unable to get record value schema");
}
__name(RecordValue, "RecordValue");
function FromRecordRight(left, right) {
  const [Key, Value] = [RecordKey(right), RecordValue(right)];
  return type_exports2.IsLiteralString(left) && type_exports2.IsNumber(Key) && IntoBooleanResult(Visit5(left, Value)) === ExtendsResult.True ? ExtendsResult.True : type_exports2.IsUint8Array(left) && type_exports2.IsNumber(Key) ? Visit5(left, Value) : type_exports2.IsString(left) && type_exports2.IsNumber(Key) ? Visit5(left, Value) : type_exports2.IsArray(left) && type_exports2.IsNumber(Key) ? Visit5(left, Value) : type_exports2.IsObject(left) ? (() => {
    for (const key of Object.getOwnPropertyNames(left.properties)) {
      if (Property(Value, left.properties[key]) === ExtendsResult.False) {
        return ExtendsResult.False;
      }
    }
    return ExtendsResult.True;
  })() : ExtendsResult.False;
}
__name(FromRecordRight, "FromRecordRight");
function FromRecord2(left, right) {
  return IsStructuralRight(right) ? StructuralRight(left, right) : type_exports2.IsObject(right) ? FromObjectRight(left, right) : !type_exports2.IsRecord(right) ? ExtendsResult.False : Visit5(RecordValue(left), RecordValue(right));
}
__name(FromRecord2, "FromRecord");
function FromRegExp2(left, right) {
  const L = type_exports2.IsRegExp(left) ? String2() : left;
  const R = type_exports2.IsRegExp(right) ? String2() : right;
  return Visit5(L, R);
}
__name(FromRegExp2, "FromRegExp");
function FromStringRight(left, right) {
  return type_exports2.IsLiteral(left) && value_exports.IsString(left.const) ? ExtendsResult.True : type_exports2.IsString(left) ? ExtendsResult.True : ExtendsResult.False;
}
__name(FromStringRight, "FromStringRight");
function FromString2(left, right) {
  return IsStructuralRight(right) ? StructuralRight(left, right) : type_exports2.IsObject(right) ? FromObjectRight(left, right) : type_exports2.IsRecord(right) ? FromRecordRight(left, right) : type_exports2.IsString(right) ? ExtendsResult.True : ExtendsResult.False;
}
__name(FromString2, "FromString");
function FromSymbol2(left, right) {
  return IsStructuralRight(right) ? StructuralRight(left, right) : type_exports2.IsObject(right) ? FromObjectRight(left, right) : type_exports2.IsRecord(right) ? FromRecordRight(left, right) : type_exports2.IsSymbol(right) ? ExtendsResult.True : ExtendsResult.False;
}
__name(FromSymbol2, "FromSymbol");
function FromTemplateLiteral3(left, right) {
  return type_exports2.IsTemplateLiteral(left) ? Visit5(TemplateLiteralToUnion(left), right) : type_exports2.IsTemplateLiteral(right) ? Visit5(left, TemplateLiteralToUnion(right)) : Throw("Invalid fallthrough for TemplateLiteral");
}
__name(FromTemplateLiteral3, "FromTemplateLiteral");
function IsArrayOfTuple(left, right) {
  return type_exports2.IsArray(right) && left.items !== void 0 && left.items.every((schema) => Visit5(schema, right.items) === ExtendsResult.True);
}
__name(IsArrayOfTuple, "IsArrayOfTuple");
function FromTupleRight(left, right) {
  return type_exports2.IsNever(left) ? ExtendsResult.True : type_exports2.IsUnknown(left) ? ExtendsResult.False : type_exports2.IsAny(left) ? ExtendsResult.Union : ExtendsResult.False;
}
__name(FromTupleRight, "FromTupleRight");
function FromTuple4(left, right) {
  return IsStructuralRight(right) ? StructuralRight(left, right) : type_exports2.IsObject(right) && IsObjectArrayLike(right) ? ExtendsResult.True : type_exports2.IsArray(right) && IsArrayOfTuple(left, right) ? ExtendsResult.True : !type_exports2.IsTuple(right) ? ExtendsResult.False : value_exports.IsUndefined(left.items) && !value_exports.IsUndefined(right.items) || !value_exports.IsUndefined(left.items) && value_exports.IsUndefined(right.items) ? ExtendsResult.False : value_exports.IsUndefined(left.items) && !value_exports.IsUndefined(right.items) ? ExtendsResult.True : left.items.every((schema, index) => Visit5(schema, right.items[index]) === ExtendsResult.True) ? ExtendsResult.True : ExtendsResult.False;
}
__name(FromTuple4, "FromTuple");
function FromUint8Array2(left, right) {
  return IsStructuralRight(right) ? StructuralRight(left, right) : type_exports2.IsObject(right) ? FromObjectRight(left, right) : type_exports2.IsRecord(right) ? FromRecordRight(left, right) : type_exports2.IsUint8Array(right) ? ExtendsResult.True : ExtendsResult.False;
}
__name(FromUint8Array2, "FromUint8Array");
function FromUndefined2(left, right) {
  return IsStructuralRight(right) ? StructuralRight(left, right) : type_exports2.IsObject(right) ? FromObjectRight(left, right) : type_exports2.IsRecord(right) ? FromRecordRight(left, right) : type_exports2.IsVoid(right) ? FromVoidRight(left, right) : type_exports2.IsUndefined(right) ? ExtendsResult.True : ExtendsResult.False;
}
__name(FromUndefined2, "FromUndefined");
function FromUnionRight(left, right) {
  return right.anyOf.some((schema) => Visit5(left, schema) === ExtendsResult.True) ? ExtendsResult.True : ExtendsResult.False;
}
__name(FromUnionRight, "FromUnionRight");
function FromUnion6(left, right) {
  return left.anyOf.every((schema) => Visit5(schema, right) === ExtendsResult.True) ? ExtendsResult.True : ExtendsResult.False;
}
__name(FromUnion6, "FromUnion");
function FromUnknownRight(left, right) {
  return ExtendsResult.True;
}
__name(FromUnknownRight, "FromUnknownRight");
function FromUnknown2(left, right) {
  return type_exports2.IsNever(right) ? FromNeverRight(left, right) : type_exports2.IsIntersect(right) ? FromIntersectRight(left, right) : type_exports2.IsUnion(right) ? FromUnionRight(left, right) : type_exports2.IsAny(right) ? FromAnyRight(left, right) : type_exports2.IsString(right) ? FromStringRight(left, right) : type_exports2.IsNumber(right) ? FromNumberRight(left, right) : type_exports2.IsInteger(right) ? FromIntegerRight(left, right) : type_exports2.IsBoolean(right) ? FromBooleanRight(left, right) : type_exports2.IsArray(right) ? FromArrayRight(left, right) : type_exports2.IsTuple(right) ? FromTupleRight(left, right) : type_exports2.IsObject(right) ? FromObjectRight(left, right) : type_exports2.IsUnknown(right) ? ExtendsResult.True : ExtendsResult.False;
}
__name(FromUnknown2, "FromUnknown");
function FromVoidRight(left, right) {
  return type_exports2.IsUndefined(left) ? ExtendsResult.True : type_exports2.IsUndefined(left) ? ExtendsResult.True : ExtendsResult.False;
}
__name(FromVoidRight, "FromVoidRight");
function FromVoid2(left, right) {
  return type_exports2.IsIntersect(right) ? FromIntersectRight(left, right) : type_exports2.IsUnion(right) ? FromUnionRight(left, right) : type_exports2.IsUnknown(right) ? FromUnknownRight(left, right) : type_exports2.IsAny(right) ? FromAnyRight(left, right) : type_exports2.IsObject(right) ? FromObjectRight(left, right) : type_exports2.IsVoid(right) ? ExtendsResult.True : ExtendsResult.False;
}
__name(FromVoid2, "FromVoid");
function Visit5(left, right) {
  return (
    // resolvable
    type_exports2.IsTemplateLiteral(left) || type_exports2.IsTemplateLiteral(right) ? FromTemplateLiteral3(left, right) : type_exports2.IsRegExp(left) || type_exports2.IsRegExp(right) ? FromRegExp2(left, right) : type_exports2.IsNot(left) || type_exports2.IsNot(right) ? FromNot2(left, right) : (
      // standard
      type_exports2.IsAny(left) ? FromAny2(left, right) : type_exports2.IsArray(left) ? FromArray4(left, right) : type_exports2.IsBigInt(left) ? FromBigInt2(left, right) : type_exports2.IsBoolean(left) ? FromBoolean2(left, right) : type_exports2.IsAsyncIterator(left) ? FromAsyncIterator2(left, right) : type_exports2.IsConstructor(left) ? FromConstructor2(left, right) : type_exports2.IsDate(left) ? FromDate2(left, right) : type_exports2.IsFunction(left) ? FromFunction2(left, right) : type_exports2.IsInteger(left) ? FromInteger2(left, right) : type_exports2.IsIntersect(left) ? FromIntersect4(left, right) : type_exports2.IsIterator(left) ? FromIterator2(left, right) : type_exports2.IsLiteral(left) ? FromLiteral3(left, right) : type_exports2.IsNever(left) ? FromNever2(left, right) : type_exports2.IsNull(left) ? FromNull2(left, right) : type_exports2.IsNumber(left) ? FromNumber2(left, right) : type_exports2.IsObject(left) ? FromObject2(left, right) : type_exports2.IsRecord(left) ? FromRecord2(left, right) : type_exports2.IsString(left) ? FromString2(left, right) : type_exports2.IsSymbol(left) ? FromSymbol2(left, right) : type_exports2.IsTuple(left) ? FromTuple4(left, right) : type_exports2.IsPromise(left) ? FromPromise2(left, right) : type_exports2.IsUint8Array(left) ? FromUint8Array2(left, right) : type_exports2.IsUndefined(left) ? FromUndefined2(left, right) : type_exports2.IsUnion(left) ? FromUnion6(left, right) : type_exports2.IsUnknown(left) ? FromUnknown2(left, right) : type_exports2.IsVoid(left) ? FromVoid2(left, right) : Throw(`Unknown left type operand '${left[Kind]}'`)
    )
  );
}
__name(Visit5, "Visit");
function ExtendsCheck(left, right) {
  return Visit5(left, right);
}
__name(ExtendsCheck, "ExtendsCheck");

// node_modules/@sinclair/typebox/build/esm/type/extends/extends-from-mapped-key.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();

// node_modules/@sinclair/typebox/build/esm/type/extends/extends.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();

// node_modules/@sinclair/typebox/build/esm/type/extends/extends-from-mapped-result.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();
function FromProperties7(P, Right, True, False, options) {
  const Acc = {};
  for (const K2 of globalThis.Object.getOwnPropertyNames(P))
    Acc[K2] = Extends(P[K2], Right, True, False, options);
  return Acc;
}
__name(FromProperties7, "FromProperties");
function FromMappedResult6(Left, Right, True, False, options) {
  return FromProperties7(Left.properties, Right, True, False, options);
}
__name(FromMappedResult6, "FromMappedResult");
function ExtendsFromMappedResult(Left, Right, True, False, options) {
  const P = FromMappedResult6(Left, Right, True, False, options);
  return MappedResult(P);
}
__name(ExtendsFromMappedResult, "ExtendsFromMappedResult");

// node_modules/@sinclair/typebox/build/esm/type/extends/extends.mjs
function ExtendsResolve(left, right, trueType, falseType) {
  const R = ExtendsCheck(left, right);
  return R === ExtendsResult.Union ? Union([trueType, falseType]) : R === ExtendsResult.True ? trueType : falseType;
}
__name(ExtendsResolve, "ExtendsResolve");
function Extends(L, R, T, F, options = {}) {
  return IsMappedResult(L) ? ExtendsFromMappedResult(L, R, T, F, options) : IsMappedKey(L) ? CloneType(ExtendsFromMappedKey(L, R, T, F, options)) : CloneType(ExtendsResolve(L, R, T, F), options);
}
__name(Extends, "Extends");

// node_modules/@sinclair/typebox/build/esm/type/extends/extends-from-mapped-key.mjs
function FromPropertyKey(K, U, L, R, options) {
  return {
    [K]: Extends(Literal(K), U, L, R, options)
  };
}
__name(FromPropertyKey, "FromPropertyKey");
function FromPropertyKeys(K, U, L, R, options) {
  return K.reduce((Acc, LK) => {
    return { ...Acc, ...FromPropertyKey(LK, U, L, R, options) };
  }, {});
}
__name(FromPropertyKeys, "FromPropertyKeys");
function FromMappedKey2(K, U, L, R, options) {
  return FromPropertyKeys(K.keys, U, L, R, options);
}
__name(FromMappedKey2, "FromMappedKey");
function ExtendsFromMappedKey(T, U, L, R, options) {
  const P = FromMappedKey2(T, U, L, R, options);
  return MappedResult(P);
}
__name(ExtendsFromMappedKey, "ExtendsFromMappedKey");

// node_modules/@sinclair/typebox/build/esm/value/check/check.mjs
var ValueCheckUnknownTypeError = class extends TypeBoxError {
  constructor(schema) {
    super(`Unknown type`);
    this.schema = schema;
  }
};
__name(ValueCheckUnknownTypeError, "ValueCheckUnknownTypeError");
function IsAnyOrUnknown(schema) {
  return schema[Kind] === "Any" || schema[Kind] === "Unknown";
}
__name(IsAnyOrUnknown, "IsAnyOrUnknown");
function IsDefined2(value) {
  return value !== void 0;
}
__name(IsDefined2, "IsDefined");
function FromAny3(schema, references, value) {
  return true;
}
__name(FromAny3, "FromAny");
function FromArray5(schema, references, value) {
  if (!IsArray(value))
    return false;
  if (IsDefined2(schema.minItems) && !(value.length >= schema.minItems)) {
    return false;
  }
  if (IsDefined2(schema.maxItems) && !(value.length <= schema.maxItems)) {
    return false;
  }
  if (!value.every((value2) => Visit6(schema.items, references, value2))) {
    return false;
  }
  if (schema.uniqueItems === true && !function() {
    const set2 = /* @__PURE__ */ new Set();
    for (const element of value) {
      const hashed = Hash(element);
      if (set2.has(hashed)) {
        return false;
      } else {
        set2.add(hashed);
      }
    }
    return true;
  }()) {
    return false;
  }
  if (!(IsDefined2(schema.contains) || IsNumber(schema.minContains) || IsNumber(schema.maxContains))) {
    return true;
  }
  const containsSchema = IsDefined2(schema.contains) ? schema.contains : Never();
  const containsCount = value.reduce((acc, value2) => Visit6(containsSchema, references, value2) ? acc + 1 : acc, 0);
  if (containsCount === 0) {
    return false;
  }
  if (IsNumber(schema.minContains) && containsCount < schema.minContains) {
    return false;
  }
  if (IsNumber(schema.maxContains) && containsCount > schema.maxContains) {
    return false;
  }
  return true;
}
__name(FromArray5, "FromArray");
function FromAsyncIterator3(schema, references, value) {
  return IsAsyncIterator(value);
}
__name(FromAsyncIterator3, "FromAsyncIterator");
function FromBigInt3(schema, references, value) {
  if (!IsBigInt(value))
    return false;
  if (IsDefined2(schema.exclusiveMaximum) && !(value < schema.exclusiveMaximum)) {
    return false;
  }
  if (IsDefined2(schema.exclusiveMinimum) && !(value > schema.exclusiveMinimum)) {
    return false;
  }
  if (IsDefined2(schema.maximum) && !(value <= schema.maximum)) {
    return false;
  }
  if (IsDefined2(schema.minimum) && !(value >= schema.minimum)) {
    return false;
  }
  if (IsDefined2(schema.multipleOf) && !(value % schema.multipleOf === BigInt(0))) {
    return false;
  }
  return true;
}
__name(FromBigInt3, "FromBigInt");
function FromBoolean3(schema, references, value) {
  return IsBoolean(value);
}
__name(FromBoolean3, "FromBoolean");
function FromConstructor3(schema, references, value) {
  return Visit6(schema.returns, references, value.prototype);
}
__name(FromConstructor3, "FromConstructor");
function FromDate3(schema, references, value) {
  if (!IsDate(value))
    return false;
  if (IsDefined2(schema.exclusiveMaximumTimestamp) && !(value.getTime() < schema.exclusiveMaximumTimestamp)) {
    return false;
  }
  if (IsDefined2(schema.exclusiveMinimumTimestamp) && !(value.getTime() > schema.exclusiveMinimumTimestamp)) {
    return false;
  }
  if (IsDefined2(schema.maximumTimestamp) && !(value.getTime() <= schema.maximumTimestamp)) {
    return false;
  }
  if (IsDefined2(schema.minimumTimestamp) && !(value.getTime() >= schema.minimumTimestamp)) {
    return false;
  }
  if (IsDefined2(schema.multipleOfTimestamp) && !(value.getTime() % schema.multipleOfTimestamp === 0)) {
    return false;
  }
  return true;
}
__name(FromDate3, "FromDate");
function FromFunction3(schema, references, value) {
  return IsFunction(value);
}
__name(FromFunction3, "FromFunction");
function FromInteger3(schema, references, value) {
  if (!IsInteger(value)) {
    return false;
  }
  if (IsDefined2(schema.exclusiveMaximum) && !(value < schema.exclusiveMaximum)) {
    return false;
  }
  if (IsDefined2(schema.exclusiveMinimum) && !(value > schema.exclusiveMinimum)) {
    return false;
  }
  if (IsDefined2(schema.maximum) && !(value <= schema.maximum)) {
    return false;
  }
  if (IsDefined2(schema.minimum) && !(value >= schema.minimum)) {
    return false;
  }
  if (IsDefined2(schema.multipleOf) && !(value % schema.multipleOf === 0)) {
    return false;
  }
  return true;
}
__name(FromInteger3, "FromInteger");
function FromIntersect5(schema, references, value) {
  const check1 = schema.allOf.every((schema2) => Visit6(schema2, references, value));
  if (schema.unevaluatedProperties === false) {
    const keyPattern = new RegExp(KeyOfPattern(schema));
    const check2 = Object.getOwnPropertyNames(value).every((key) => keyPattern.test(key));
    return check1 && check2;
  } else if (IsSchema2(schema.unevaluatedProperties)) {
    const keyCheck = new RegExp(KeyOfPattern(schema));
    const check2 = Object.getOwnPropertyNames(value).every((key) => keyCheck.test(key) || Visit6(schema.unevaluatedProperties, references, value[key]));
    return check1 && check2;
  } else {
    return check1;
  }
}
__name(FromIntersect5, "FromIntersect");
function FromIterator3(schema, references, value) {
  return IsIterator(value);
}
__name(FromIterator3, "FromIterator");
function FromLiteral4(schema, references, value) {
  return value === schema.const;
}
__name(FromLiteral4, "FromLiteral");
function FromNever3(schema, references, value) {
  return false;
}
__name(FromNever3, "FromNever");
function FromNot3(schema, references, value) {
  return !Visit6(schema.not, references, value);
}
__name(FromNot3, "FromNot");
function FromNull3(schema, references, value) {
  return IsNull(value);
}
__name(FromNull3, "FromNull");
function FromNumber3(schema, references, value) {
  if (!TypeSystemPolicy.IsNumberLike(value))
    return false;
  if (IsDefined2(schema.exclusiveMaximum) && !(value < schema.exclusiveMaximum)) {
    return false;
  }
  if (IsDefined2(schema.exclusiveMinimum) && !(value > schema.exclusiveMinimum)) {
    return false;
  }
  if (IsDefined2(schema.minimum) && !(value >= schema.minimum)) {
    return false;
  }
  if (IsDefined2(schema.maximum) && !(value <= schema.maximum)) {
    return false;
  }
  if (IsDefined2(schema.multipleOf) && !(value % schema.multipleOf === 0)) {
    return false;
  }
  return true;
}
__name(FromNumber3, "FromNumber");
function FromObject3(schema, references, value) {
  if (!TypeSystemPolicy.IsObjectLike(value))
    return false;
  if (IsDefined2(schema.minProperties) && !(Object.getOwnPropertyNames(value).length >= schema.minProperties)) {
    return false;
  }
  if (IsDefined2(schema.maxProperties) && !(Object.getOwnPropertyNames(value).length <= schema.maxProperties)) {
    return false;
  }
  const knownKeys = Object.getOwnPropertyNames(schema.properties);
  for (const knownKey of knownKeys) {
    const property = schema.properties[knownKey];
    if (schema.required && schema.required.includes(knownKey)) {
      if (!Visit6(property, references, value[knownKey])) {
        return false;
      }
      if ((ExtendsUndefinedCheck(property) || IsAnyOrUnknown(property)) && !(knownKey in value)) {
        return false;
      }
    } else {
      if (TypeSystemPolicy.IsExactOptionalProperty(value, knownKey) && !Visit6(property, references, value[knownKey])) {
        return false;
      }
    }
  }
  if (schema.additionalProperties === false) {
    const valueKeys = Object.getOwnPropertyNames(value);
    if (schema.required && schema.required.length === knownKeys.length && valueKeys.length === knownKeys.length) {
      return true;
    } else {
      return valueKeys.every((valueKey) => knownKeys.includes(valueKey));
    }
  } else if (typeof schema.additionalProperties === "object") {
    const valueKeys = Object.getOwnPropertyNames(value);
    return valueKeys.every((key) => knownKeys.includes(key) || Visit6(schema.additionalProperties, references, value[key]));
  } else {
    return true;
  }
}
__name(FromObject3, "FromObject");
function FromPromise3(schema, references, value) {
  return IsPromise(value);
}
__name(FromPromise3, "FromPromise");
function FromRecord3(schema, references, value) {
  if (!TypeSystemPolicy.IsRecordLike(value)) {
    return false;
  }
  if (IsDefined2(schema.minProperties) && !(Object.getOwnPropertyNames(value).length >= schema.minProperties)) {
    return false;
  }
  if (IsDefined2(schema.maxProperties) && !(Object.getOwnPropertyNames(value).length <= schema.maxProperties)) {
    return false;
  }
  const [patternKey, patternSchema] = Object.entries(schema.patternProperties)[0];
  const regex2 = new RegExp(patternKey);
  const check1 = Object.entries(value).every(([key, value2]) => {
    return regex2.test(key) ? Visit6(patternSchema, references, value2) : true;
  });
  const check2 = typeof schema.additionalProperties === "object" ? Object.entries(value).every(([key, value2]) => {
    return !regex2.test(key) ? Visit6(schema.additionalProperties, references, value2) : true;
  }) : true;
  const check3 = schema.additionalProperties === false ? Object.getOwnPropertyNames(value).every((key) => {
    return regex2.test(key);
  }) : true;
  return check1 && check2 && check3;
}
__name(FromRecord3, "FromRecord");
function FromRef2(schema, references, value) {
  return Visit6(Deref(schema, references), references, value);
}
__name(FromRef2, "FromRef");
function FromRegExp3(schema, references, value) {
  const regex2 = new RegExp(schema.source, schema.flags);
  if (IsDefined2(schema.minLength)) {
    if (!(value.length >= schema.minLength))
      return false;
  }
  if (IsDefined2(schema.maxLength)) {
    if (!(value.length <= schema.maxLength))
      return false;
  }
  return regex2.test(value);
}
__name(FromRegExp3, "FromRegExp");
function FromString3(schema, references, value) {
  if (!IsString(value)) {
    return false;
  }
  if (IsDefined2(schema.minLength)) {
    if (!(value.length >= schema.minLength))
      return false;
  }
  if (IsDefined2(schema.maxLength)) {
    if (!(value.length <= schema.maxLength))
      return false;
  }
  if (IsDefined2(schema.pattern)) {
    const regex2 = new RegExp(schema.pattern);
    if (!regex2.test(value))
      return false;
  }
  if (IsDefined2(schema.format)) {
    if (!format_exports.Has(schema.format))
      return false;
    const func = format_exports.Get(schema.format);
    return func(value);
  }
  return true;
}
__name(FromString3, "FromString");
function FromSymbol3(schema, references, value) {
  return IsSymbol(value);
}
__name(FromSymbol3, "FromSymbol");
function FromTemplateLiteral4(schema, references, value) {
  return IsString(value) && new RegExp(schema.pattern).test(value);
}
__name(FromTemplateLiteral4, "FromTemplateLiteral");
function FromThis2(schema, references, value) {
  return Visit6(Deref(schema, references), references, value);
}
__name(FromThis2, "FromThis");
function FromTuple5(schema, references, value) {
  if (!IsArray(value)) {
    return false;
  }
  if (schema.items === void 0 && !(value.length === 0)) {
    return false;
  }
  if (!(value.length === schema.maxItems)) {
    return false;
  }
  if (!schema.items) {
    return true;
  }
  for (let i = 0; i < schema.items.length; i++) {
    if (!Visit6(schema.items[i], references, value[i]))
      return false;
  }
  return true;
}
__name(FromTuple5, "FromTuple");
function FromUndefined3(schema, references, value) {
  return IsUndefined(value);
}
__name(FromUndefined3, "FromUndefined");
function FromUnion7(schema, references, value) {
  return schema.anyOf.some((inner) => Visit6(inner, references, value));
}
__name(FromUnion7, "FromUnion");
function FromUint8Array3(schema, references, value) {
  if (!IsUint8Array(value)) {
    return false;
  }
  if (IsDefined2(schema.maxByteLength) && !(value.length <= schema.maxByteLength)) {
    return false;
  }
  if (IsDefined2(schema.minByteLength) && !(value.length >= schema.minByteLength)) {
    return false;
  }
  return true;
}
__name(FromUint8Array3, "FromUint8Array");
function FromUnknown3(schema, references, value) {
  return true;
}
__name(FromUnknown3, "FromUnknown");
function FromVoid3(schema, references, value) {
  return TypeSystemPolicy.IsVoidLike(value);
}
__name(FromVoid3, "FromVoid");
function FromKind2(schema, references, value) {
  if (!type_exports.Has(schema[Kind]))
    return false;
  const func = type_exports.Get(schema[Kind]);
  return func(schema, value);
}
__name(FromKind2, "FromKind");
function Visit6(schema, references, value) {
  const references_ = IsDefined2(schema.$id) ? [...references, schema] : references;
  const schema_ = schema;
  switch (schema_[Kind]) {
    case "Any":
      return FromAny3(schema_, references_, value);
    case "Array":
      return FromArray5(schema_, references_, value);
    case "AsyncIterator":
      return FromAsyncIterator3(schema_, references_, value);
    case "BigInt":
      return FromBigInt3(schema_, references_, value);
    case "Boolean":
      return FromBoolean3(schema_, references_, value);
    case "Constructor":
      return FromConstructor3(schema_, references_, value);
    case "Date":
      return FromDate3(schema_, references_, value);
    case "Function":
      return FromFunction3(schema_, references_, value);
    case "Integer":
      return FromInteger3(schema_, references_, value);
    case "Intersect":
      return FromIntersect5(schema_, references_, value);
    case "Iterator":
      return FromIterator3(schema_, references_, value);
    case "Literal":
      return FromLiteral4(schema_, references_, value);
    case "Never":
      return FromNever3(schema_, references_, value);
    case "Not":
      return FromNot3(schema_, references_, value);
    case "Null":
      return FromNull3(schema_, references_, value);
    case "Number":
      return FromNumber3(schema_, references_, value);
    case "Object":
      return FromObject3(schema_, references_, value);
    case "Promise":
      return FromPromise3(schema_, references_, value);
    case "Record":
      return FromRecord3(schema_, references_, value);
    case "Ref":
      return FromRef2(schema_, references_, value);
    case "RegExp":
      return FromRegExp3(schema_, references_, value);
    case "String":
      return FromString3(schema_, references_, value);
    case "Symbol":
      return FromSymbol3(schema_, references_, value);
    case "TemplateLiteral":
      return FromTemplateLiteral4(schema_, references_, value);
    case "This":
      return FromThis2(schema_, references_, value);
    case "Tuple":
      return FromTuple5(schema_, references_, value);
    case "Undefined":
      return FromUndefined3(schema_, references_, value);
    case "Union":
      return FromUnion7(schema_, references_, value);
    case "Uint8Array":
      return FromUint8Array3(schema_, references_, value);
    case "Unknown":
      return FromUnknown3(schema_, references_, value);
    case "Void":
      return FromVoid3(schema_, references_, value);
    default:
      if (!type_exports.Has(schema_[Kind]))
        throw new ValueCheckUnknownTypeError(schema_);
      return FromKind2(schema_, references_, value);
  }
}
__name(Visit6, "Visit");
function Check(...args) {
  return args.length === 3 ? Visit6(args[0], args[1], args[2]) : Visit6(args[0], [], args[1]);
}
__name(Check, "Check");

// node_modules/@sinclair/typebox/build/esm/value/clone/index.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();

// node_modules/@sinclair/typebox/build/esm/value/clone/clone.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();
function ObjectType3(value) {
  const Acc = {};
  for (const key of Object.getOwnPropertyNames(value)) {
    Acc[key] = Clone2(value[key]);
  }
  for (const key of Object.getOwnPropertySymbols(value)) {
    Acc[key] = Clone2(value[key]);
  }
  return Acc;
}
__name(ObjectType3, "ObjectType");
function ArrayType3(value) {
  return value.map((element) => Clone2(element));
}
__name(ArrayType3, "ArrayType");
function TypedArrayType(value) {
  return value.slice();
}
__name(TypedArrayType, "TypedArrayType");
function DateType3(value) {
  return new Date(value.toISOString());
}
__name(DateType3, "DateType");
function ValueType(value) {
  return value;
}
__name(ValueType, "ValueType");
function Clone2(value) {
  if (IsArray(value))
    return ArrayType3(value);
  if (IsDate(value))
    return DateType3(value);
  if (IsStandardObject(value))
    return ObjectType3(value);
  if (IsTypedArray(value))
    return TypedArrayType(value);
  if (IsValueType(value))
    return ValueType(value);
  throw new Error("ValueClone: Unable to clone value");
}
__name(Clone2, "Clone");

// node_modules/@sinclair/typebox/build/esm/value/create/create.mjs
var ValueCreateError = class extends TypeBoxError {
  constructor(schema, message) {
    super(message);
    this.schema = schema;
  }
};
__name(ValueCreateError, "ValueCreateError");
function FromDefault(value) {
  return typeof value === "function" ? value : Clone2(value);
}
__name(FromDefault, "FromDefault");
function FromAny4(schema, references) {
  if (HasPropertyKey(schema, "default")) {
    return FromDefault(schema.default);
  } else {
    return {};
  }
}
__name(FromAny4, "FromAny");
function FromArray6(schema, references) {
  if (schema.uniqueItems === true && !HasPropertyKey(schema, "default")) {
    throw new ValueCreateError(schema, "Array with the uniqueItems constraint requires a default value");
  } else if ("contains" in schema && !HasPropertyKey(schema, "default")) {
    throw new ValueCreateError(schema, "Array with the contains constraint requires a default value");
  } else if ("default" in schema) {
    return FromDefault(schema.default);
  } else if (schema.minItems !== void 0) {
    return Array.from({ length: schema.minItems }).map((item) => {
      return Visit7(schema.items, references);
    });
  } else {
    return [];
  }
}
__name(FromArray6, "FromArray");
function FromAsyncIterator4(schema, references) {
  if (HasPropertyKey(schema, "default")) {
    return FromDefault(schema.default);
  } else {
    return async function* () {
    }();
  }
}
__name(FromAsyncIterator4, "FromAsyncIterator");
function FromBigInt4(schema, references) {
  if (HasPropertyKey(schema, "default")) {
    return FromDefault(schema.default);
  } else {
    return BigInt(0);
  }
}
__name(FromBigInt4, "FromBigInt");
function FromBoolean4(schema, references) {
  if (HasPropertyKey(schema, "default")) {
    return FromDefault(schema.default);
  } else {
    return false;
  }
}
__name(FromBoolean4, "FromBoolean");
function FromConstructor4(schema, references) {
  if (HasPropertyKey(schema, "default")) {
    return FromDefault(schema.default);
  } else {
    const value = Visit7(schema.returns, references);
    if (typeof value === "object" && !Array.isArray(value)) {
      return class {
        constructor() {
          for (const [key, val] of Object.entries(value)) {
            const self = this;
            self[key] = val;
          }
        }
      };
    } else {
      return class {
      };
    }
  }
}
__name(FromConstructor4, "FromConstructor");
function FromDate4(schema, references) {
  if (HasPropertyKey(schema, "default")) {
    return FromDefault(schema.default);
  } else if (schema.minimumTimestamp !== void 0) {
    return new Date(schema.minimumTimestamp);
  } else {
    return /* @__PURE__ */ new Date();
  }
}
__name(FromDate4, "FromDate");
function FromFunction4(schema, references) {
  if (HasPropertyKey(schema, "default")) {
    return FromDefault(schema.default);
  } else {
    return () => Visit7(schema.returns, references);
  }
}
__name(FromFunction4, "FromFunction");
function FromInteger4(schema, references) {
  if (HasPropertyKey(schema, "default")) {
    return FromDefault(schema.default);
  } else if (schema.minimum !== void 0) {
    return schema.minimum;
  } else {
    return 0;
  }
}
__name(FromInteger4, "FromInteger");
function FromIntersect6(schema, references) {
  if (HasPropertyKey(schema, "default")) {
    return FromDefault(schema.default);
  } else {
    const value = schema.allOf.reduce((acc, schema2) => {
      const next = Visit7(schema2, references);
      return typeof next === "object" ? { ...acc, ...next } : next;
    }, {});
    if (!Check(schema, references, value))
      throw new ValueCreateError(schema, "Intersect produced invalid value. Consider using a default value.");
    return value;
  }
}
__name(FromIntersect6, "FromIntersect");
function FromIterator4(schema, references) {
  if (HasPropertyKey(schema, "default")) {
    return FromDefault(schema.default);
  } else {
    return function* () {
    }();
  }
}
__name(FromIterator4, "FromIterator");
function FromLiteral5(schema, references) {
  if (HasPropertyKey(schema, "default")) {
    return FromDefault(schema.default);
  } else {
    return schema.const;
  }
}
__name(FromLiteral5, "FromLiteral");
function FromNever4(schema, references) {
  if (HasPropertyKey(schema, "default")) {
    return FromDefault(schema.default);
  } else {
    throw new ValueCreateError(schema, "Never types cannot be created. Consider using a default value.");
  }
}
__name(FromNever4, "FromNever");
function FromNot4(schema, references) {
  if (HasPropertyKey(schema, "default")) {
    return FromDefault(schema.default);
  } else {
    throw new ValueCreateError(schema, "Not types must have a default value");
  }
}
__name(FromNot4, "FromNot");
function FromNull4(schema, references) {
  if (HasPropertyKey(schema, "default")) {
    return FromDefault(schema.default);
  } else {
    return null;
  }
}
__name(FromNull4, "FromNull");
function FromNumber4(schema, references) {
  if (HasPropertyKey(schema, "default")) {
    return FromDefault(schema.default);
  } else if (schema.minimum !== void 0) {
    return schema.minimum;
  } else {
    return 0;
  }
}
__name(FromNumber4, "FromNumber");
function FromObject4(schema, references) {
  if (HasPropertyKey(schema, "default")) {
    return FromDefault(schema.default);
  } else {
    const required = new Set(schema.required);
    const Acc = {};
    for (const [key, subschema] of Object.entries(schema.properties)) {
      if (!required.has(key))
        continue;
      Acc[key] = Visit7(subschema, references);
    }
    return Acc;
  }
}
__name(FromObject4, "FromObject");
function FromPromise4(schema, references) {
  if (HasPropertyKey(schema, "default")) {
    return FromDefault(schema.default);
  } else {
    return Promise.resolve(Visit7(schema.item, references));
  }
}
__name(FromPromise4, "FromPromise");
function FromRecord4(schema, references) {
  const [keyPattern, valueSchema] = Object.entries(schema.patternProperties)[0];
  if (HasPropertyKey(schema, "default")) {
    return FromDefault(schema.default);
  } else if (!(keyPattern === PatternStringExact || keyPattern === PatternNumberExact)) {
    const propertyKeys = keyPattern.slice(1, keyPattern.length - 1).split("|");
    const Acc = {};
    for (const key of propertyKeys)
      Acc[key] = Visit7(valueSchema, references);
    return Acc;
  } else {
    return {};
  }
}
__name(FromRecord4, "FromRecord");
function FromRef3(schema, references) {
  if (HasPropertyKey(schema, "default")) {
    return FromDefault(schema.default);
  } else {
    return Visit7(Deref(schema, references), references);
  }
}
__name(FromRef3, "FromRef");
function FromRegExp4(schema, references) {
  if (HasPropertyKey(schema, "default")) {
    return FromDefault(schema.default);
  } else {
    throw new ValueCreateError(schema, "RegExp types cannot be created. Consider using a default value.");
  }
}
__name(FromRegExp4, "FromRegExp");
function FromString4(schema, references) {
  if (schema.pattern !== void 0) {
    if (!HasPropertyKey(schema, "default")) {
      throw new ValueCreateError(schema, "String types with patterns must specify a default value");
    } else {
      return FromDefault(schema.default);
    }
  } else if (schema.format !== void 0) {
    if (!HasPropertyKey(schema, "default")) {
      throw new ValueCreateError(schema, "String types with formats must specify a default value");
    } else {
      return FromDefault(schema.default);
    }
  } else {
    if (HasPropertyKey(schema, "default")) {
      return FromDefault(schema.default);
    } else if (schema.minLength !== void 0) {
      return Array.from({ length: schema.minLength }).map(() => " ").join("");
    } else {
      return "";
    }
  }
}
__name(FromString4, "FromString");
function FromSymbol4(schema, references) {
  if (HasPropertyKey(schema, "default")) {
    return FromDefault(schema.default);
  } else if ("value" in schema) {
    return Symbol.for(schema.value);
  } else {
    return Symbol();
  }
}
__name(FromSymbol4, "FromSymbol");
function FromTemplateLiteral5(schema, references) {
  if (HasPropertyKey(schema, "default")) {
    return FromDefault(schema.default);
  }
  if (!IsTemplateLiteralFinite(schema))
    throw new ValueCreateError(schema, "Can only create template literals that produce a finite variants. Consider using a default value.");
  const generated = TemplateLiteralGenerate(schema);
  return generated[0];
}
__name(FromTemplateLiteral5, "FromTemplateLiteral");
function FromThis3(schema, references) {
  if (recursiveDepth++ > recursiveMaxDepth)
    throw new ValueCreateError(schema, "Cannot create recursive type as it appears possibly infinite. Consider using a default.");
  if (HasPropertyKey(schema, "default")) {
    return FromDefault(schema.default);
  } else {
    return Visit7(Deref(schema, references), references);
  }
}
__name(FromThis3, "FromThis");
function FromTuple6(schema, references) {
  if (HasPropertyKey(schema, "default")) {
    return FromDefault(schema.default);
  }
  if (schema.items === void 0) {
    return [];
  } else {
    return Array.from({ length: schema.minItems }).map((_, index) => Visit7(schema.items[index], references));
  }
}
__name(FromTuple6, "FromTuple");
function FromUndefined4(schema, references) {
  if (HasPropertyKey(schema, "default")) {
    return FromDefault(schema.default);
  } else {
    return void 0;
  }
}
__name(FromUndefined4, "FromUndefined");
function FromUnion8(schema, references) {
  if (HasPropertyKey(schema, "default")) {
    return FromDefault(schema.default);
  } else if (schema.anyOf.length === 0) {
    throw new Error("ValueCreate.Union: Cannot create Union with zero variants");
  } else {
    return Visit7(schema.anyOf[0], references);
  }
}
__name(FromUnion8, "FromUnion");
function FromUint8Array4(schema, references) {
  if (HasPropertyKey(schema, "default")) {
    return FromDefault(schema.default);
  } else if (schema.minByteLength !== void 0) {
    return new Uint8Array(schema.minByteLength);
  } else {
    return new Uint8Array(0);
  }
}
__name(FromUint8Array4, "FromUint8Array");
function FromUnknown4(schema, references) {
  if (HasPropertyKey(schema, "default")) {
    return FromDefault(schema.default);
  } else {
    return {};
  }
}
__name(FromUnknown4, "FromUnknown");
function FromVoid4(schema, references) {
  if (HasPropertyKey(schema, "default")) {
    return FromDefault(schema.default);
  } else {
    return void 0;
  }
}
__name(FromVoid4, "FromVoid");
function FromKind3(schema, references) {
  if (HasPropertyKey(schema, "default")) {
    return FromDefault(schema.default);
  } else {
    throw new Error("User defined types must specify a default value");
  }
}
__name(FromKind3, "FromKind");
function Visit7(schema, references) {
  const references_ = IsString(schema.$id) ? [...references, schema] : references;
  const schema_ = schema;
  switch (schema_[Kind]) {
    case "Any":
      return FromAny4(schema_, references_);
    case "Array":
      return FromArray6(schema_, references_);
    case "AsyncIterator":
      return FromAsyncIterator4(schema_, references_);
    case "BigInt":
      return FromBigInt4(schema_, references_);
    case "Boolean":
      return FromBoolean4(schema_, references_);
    case "Constructor":
      return FromConstructor4(schema_, references_);
    case "Date":
      return FromDate4(schema_, references_);
    case "Function":
      return FromFunction4(schema_, references_);
    case "Integer":
      return FromInteger4(schema_, references_);
    case "Intersect":
      return FromIntersect6(schema_, references_);
    case "Iterator":
      return FromIterator4(schema_, references_);
    case "Literal":
      return FromLiteral5(schema_, references_);
    case "Never":
      return FromNever4(schema_, references_);
    case "Not":
      return FromNot4(schema_, references_);
    case "Null":
      return FromNull4(schema_, references_);
    case "Number":
      return FromNumber4(schema_, references_);
    case "Object":
      return FromObject4(schema_, references_);
    case "Promise":
      return FromPromise4(schema_, references_);
    case "Record":
      return FromRecord4(schema_, references_);
    case "Ref":
      return FromRef3(schema_, references_);
    case "RegExp":
      return FromRegExp4(schema_, references_);
    case "String":
      return FromString4(schema_, references_);
    case "Symbol":
      return FromSymbol4(schema_, references_);
    case "TemplateLiteral":
      return FromTemplateLiteral5(schema_, references_);
    case "This":
      return FromThis3(schema_, references_);
    case "Tuple":
      return FromTuple6(schema_, references_);
    case "Undefined":
      return FromUndefined4(schema_, references_);
    case "Union":
      return FromUnion8(schema_, references_);
    case "Uint8Array":
      return FromUint8Array4(schema_, references_);
    case "Unknown":
      return FromUnknown4(schema_, references_);
    case "Void":
      return FromVoid4(schema_, references_);
    default:
      if (!type_exports.Has(schema_[Kind]))
        throw new ValueCreateError(schema_, "Unknown type");
      return FromKind3(schema_, references_);
  }
}
__name(Visit7, "Visit");
var recursiveMaxDepth = 512;
var recursiveDepth = 0;
function Create2(...args) {
  recursiveDepth = 0;
  return args.length === 2 ? Visit7(args[0], args[1]) : Visit7(args[0], []);
}
__name(Create2, "Create");

// node_modules/@sinclair/typebox/build/esm/value/cast/cast.mjs
var ValueCastError = class extends TypeBoxError {
  constructor(schema, message) {
    super(message);
    this.schema = schema;
  }
};
__name(ValueCastError, "ValueCastError");
function ScoreUnion(schema, references, value) {
  if (schema[Kind] === "Object" && typeof value === "object" && !IsNull(value)) {
    const object = schema;
    const keys = Object.getOwnPropertyNames(value);
    const entries = Object.entries(object.properties);
    const [point, max] = [1 / entries.length, entries.length];
    return entries.reduce((acc, [key, schema2]) => {
      const literal = schema2[Kind] === "Literal" && schema2.const === value[key] ? max : 0;
      const checks = Check(schema2, references, value[key]) ? point : 0;
      const exists = keys.includes(key) ? point : 0;
      return acc + (literal + checks + exists);
    }, 0);
  } else {
    return Check(schema, references, value) ? 1 : 0;
  }
}
__name(ScoreUnion, "ScoreUnion");
function SelectUnion(union, references, value) {
  const schemas = union.anyOf.map((schema) => Deref(schema, references));
  let [select, best] = [schemas[0], 0];
  for (const schema of schemas) {
    const score = ScoreUnion(schema, references, value);
    if (score > best) {
      select = schema;
      best = score;
    }
  }
  return select;
}
__name(SelectUnion, "SelectUnion");
function CastUnion(union, references, value) {
  if ("default" in union) {
    return typeof value === "function" ? union.default : Clone2(union.default);
  } else {
    const schema = SelectUnion(union, references, value);
    return Cast(schema, references, value);
  }
}
__name(CastUnion, "CastUnion");
function DefaultClone(schema, references, value) {
  return Check(schema, references, value) ? Clone2(value) : Create2(schema, references);
}
__name(DefaultClone, "DefaultClone");
function Default(schema, references, value) {
  return Check(schema, references, value) ? value : Create2(schema, references);
}
__name(Default, "Default");
function FromArray7(schema, references, value) {
  if (Check(schema, references, value))
    return Clone2(value);
  const created = IsArray(value) ? Clone2(value) : Create2(schema, references);
  const minimum = IsNumber(schema.minItems) && created.length < schema.minItems ? [...created, ...Array.from({ length: schema.minItems - created.length }, () => null)] : created;
  const maximum = IsNumber(schema.maxItems) && minimum.length > schema.maxItems ? minimum.slice(0, schema.maxItems) : minimum;
  const casted = maximum.map((value2) => Visit8(schema.items, references, value2));
  if (schema.uniqueItems !== true)
    return casted;
  const unique = [...new Set(casted)];
  if (!Check(schema, references, unique))
    throw new ValueCastError(schema, "Array cast produced invalid data due to uniqueItems constraint");
  return unique;
}
__name(FromArray7, "FromArray");
function FromConstructor5(schema, references, value) {
  if (Check(schema, references, value))
    return Create2(schema, references);
  const required = new Set(schema.returns.required || []);
  const result = /* @__PURE__ */ __name(function() {
  }, "result");
  for (const [key, property] of Object.entries(schema.returns.properties)) {
    if (!required.has(key) && value.prototype[key] === void 0)
      continue;
    result.prototype[key] = Visit8(property, references, value.prototype[key]);
  }
  return result;
}
__name(FromConstructor5, "FromConstructor");
function FromIntersect7(schema, references, value) {
  const created = Create2(schema, references);
  const mapped = IsStandardObject(created) && IsStandardObject(value) ? { ...created, ...value } : value;
  return Check(schema, references, mapped) ? mapped : Create2(schema, references);
}
__name(FromIntersect7, "FromIntersect");
function FromNever5(schema, references, value) {
  throw new ValueCastError(schema, "Never types cannot be cast");
}
__name(FromNever5, "FromNever");
function FromObject5(schema, references, value) {
  if (Check(schema, references, value))
    return value;
  if (value === null || typeof value !== "object")
    return Create2(schema, references);
  const required = new Set(schema.required || []);
  const result = {};
  for (const [key, property] of Object.entries(schema.properties)) {
    if (!required.has(key) && value[key] === void 0)
      continue;
    result[key] = Visit8(property, references, value[key]);
  }
  if (typeof schema.additionalProperties === "object") {
    const propertyNames = Object.getOwnPropertyNames(schema.properties);
    for (const propertyName of Object.getOwnPropertyNames(value)) {
      if (propertyNames.includes(propertyName))
        continue;
      result[propertyName] = Visit8(schema.additionalProperties, references, value[propertyName]);
    }
  }
  return result;
}
__name(FromObject5, "FromObject");
function FromRecord5(schema, references, value) {
  if (Check(schema, references, value))
    return Clone2(value);
  if (value === null || typeof value !== "object" || Array.isArray(value) || value instanceof Date)
    return Create2(schema, references);
  const subschemaPropertyName = Object.getOwnPropertyNames(schema.patternProperties)[0];
  const subschema = schema.patternProperties[subschemaPropertyName];
  const result = {};
  for (const [propKey, propValue] of Object.entries(value)) {
    result[propKey] = Visit8(subschema, references, propValue);
  }
  return result;
}
__name(FromRecord5, "FromRecord");
function FromRef4(schema, references, value) {
  return Visit8(Deref(schema, references), references, value);
}
__name(FromRef4, "FromRef");
function FromThis4(schema, references, value) {
  return Visit8(Deref(schema, references), references, value);
}
__name(FromThis4, "FromThis");
function FromTuple7(schema, references, value) {
  if (Check(schema, references, value))
    return Clone2(value);
  if (!IsArray(value))
    return Create2(schema, references);
  if (schema.items === void 0)
    return [];
  return schema.items.map((schema2, index) => Visit8(schema2, references, value[index]));
}
__name(FromTuple7, "FromTuple");
function FromUnion9(schema, references, value) {
  return Check(schema, references, value) ? Clone2(value) : CastUnion(schema, references, value);
}
__name(FromUnion9, "FromUnion");
function Visit8(schema, references, value) {
  const references_ = IsString(schema.$id) ? [...references, schema] : references;
  const schema_ = schema;
  switch (schema[Kind]) {
    case "Array":
      return FromArray7(schema_, references_, value);
    case "Constructor":
      return FromConstructor5(schema_, references_, value);
    case "Intersect":
      return FromIntersect7(schema_, references_, value);
    case "Never":
      return FromNever5(schema_, references_, value);
    case "Object":
      return FromObject5(schema_, references_, value);
    case "Record":
      return FromRecord5(schema_, references_, value);
    case "Ref":
      return FromRef4(schema_, references_, value);
    case "This":
      return FromThis4(schema_, references_, value);
    case "Tuple":
      return FromTuple7(schema_, references_, value);
    case "Union":
      return FromUnion9(schema_, references_, value);
    case "Date":
    case "Symbol":
    case "Uint8Array":
      return DefaultClone(schema, references, value);
    default:
      return Default(schema_, references_, value);
  }
}
__name(Visit8, "Visit");
function Cast(...args) {
  return args.length === 3 ? Visit8(args[0], args[1], args[2]) : Visit8(args[0], [], args[1]);
}
__name(Cast, "Cast");

// node_modules/@sinclair/typebox/build/esm/value/clean/index.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();

// node_modules/@sinclair/typebox/build/esm/value/clean/clean.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();
function IsCheckable(schema) {
  return IsSchema2(schema) && schema[Kind] !== "Unsafe";
}
__name(IsCheckable, "IsCheckable");
function FromArray8(schema, references, value) {
  if (!IsArray(value))
    return value;
  return value.map((value2) => Visit9(schema.items, references, value2));
}
__name(FromArray8, "FromArray");
function FromIntersect8(schema, references, value) {
  const unevaluatedProperties = schema.unevaluatedProperties;
  const intersections = schema.allOf.map((schema2) => Visit9(schema2, references, Clone2(value)));
  const composite = intersections.reduce((acc, value2) => IsObject(value2) ? { ...acc, ...value2 } : value2, {});
  if (!IsObject(value) || !IsObject(composite) || !IsSchema2(unevaluatedProperties))
    return composite;
  const knownkeys = KeyOfPropertyKeys(schema);
  for (const key of Object.getOwnPropertyNames(value)) {
    if (knownkeys.includes(key))
      continue;
    if (Check(unevaluatedProperties, references, value[key])) {
      composite[key] = Visit9(unevaluatedProperties, references, value[key]);
    }
  }
  return composite;
}
__name(FromIntersect8, "FromIntersect");
function FromObject6(schema, references, value) {
  if (!IsObject(value) || IsArray(value))
    return value;
  const additionalProperties = schema.additionalProperties;
  for (const key of Object.getOwnPropertyNames(value)) {
    if (key in schema.properties) {
      value[key] = Visit9(schema.properties[key], references, value[key]);
      continue;
    }
    if (IsSchema2(additionalProperties) && Check(additionalProperties, references, value[key])) {
      value[key] = Visit9(additionalProperties, references, value[key]);
      continue;
    }
    delete value[key];
  }
  return value;
}
__name(FromObject6, "FromObject");
function FromRecord6(schema, references, value) {
  if (!IsObject(value))
    return value;
  const additionalProperties = schema.additionalProperties;
  const propertyKeys = Object.getOwnPropertyNames(value);
  const [propertyKey, propertySchema] = Object.entries(schema.patternProperties)[0];
  const propertyKeyTest = new RegExp(propertyKey);
  for (const key of propertyKeys) {
    if (propertyKeyTest.test(key)) {
      value[key] = Visit9(propertySchema, references, value[key]);
      continue;
    }
    if (IsSchema2(additionalProperties) && Check(additionalProperties, references, value[key])) {
      value[key] = Visit9(additionalProperties, references, value[key]);
      continue;
    }
    delete value[key];
  }
  return value;
}
__name(FromRecord6, "FromRecord");
function FromRef5(schema, references, value) {
  return Visit9(Deref(schema, references), references, value);
}
__name(FromRef5, "FromRef");
function FromThis5(schema, references, value) {
  return Visit9(Deref(schema, references), references, value);
}
__name(FromThis5, "FromThis");
function FromTuple8(schema, references, value) {
  if (!IsArray(value))
    return value;
  if (IsUndefined(schema.items))
    return [];
  const length = Math.min(value.length, schema.items.length);
  for (let i = 0; i < length; i++) {
    value[i] = Visit9(schema.items[i], references, value[i]);
  }
  return value.length > length ? value.slice(0, length) : value;
}
__name(FromTuple8, "FromTuple");
function FromUnion10(schema, references, value) {
  for (const inner of schema.anyOf) {
    if (IsCheckable(inner) && Check(inner, references, value)) {
      return Visit9(inner, references, value);
    }
  }
  return value;
}
__name(FromUnion10, "FromUnion");
function Visit9(schema, references, value) {
  const references_ = IsString(schema.$id) ? [...references, schema] : references;
  const schema_ = schema;
  switch (schema_[Kind]) {
    case "Array":
      return FromArray8(schema_, references_, value);
    case "Intersect":
      return FromIntersect8(schema_, references_, value);
    case "Object":
      return FromObject6(schema_, references_, value);
    case "Record":
      return FromRecord6(schema_, references_, value);
    case "Ref":
      return FromRef5(schema_, references_, value);
    case "This":
      return FromThis5(schema_, references_, value);
    case "Tuple":
      return FromTuple8(schema_, references_, value);
    case "Union":
      return FromUnion10(schema_, references_, value);
    default:
      return value;
  }
}
__name(Visit9, "Visit");
function Clean(...args) {
  return args.length === 3 ? Visit9(args[0], args[1], args[2]) : Visit9(args[0], [], args[1]);
}
__name(Clean, "Clean");

// node_modules/@sinclair/typebox/build/esm/value/convert/index.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();

// node_modules/@sinclair/typebox/build/esm/value/convert/convert.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();
function IsStringNumeric(value) {
  return IsString(value) && !isNaN(value) && !isNaN(parseFloat(value));
}
__name(IsStringNumeric, "IsStringNumeric");
function IsValueToString(value) {
  return IsBigInt(value) || IsBoolean(value) || IsNumber(value);
}
__name(IsValueToString, "IsValueToString");
function IsValueTrue(value) {
  return value === true || IsNumber(value) && value === 1 || IsBigInt(value) && value === BigInt("1") || IsString(value) && (value.toLowerCase() === "true" || value === "1");
}
__name(IsValueTrue, "IsValueTrue");
function IsValueFalse(value) {
  return value === false || IsNumber(value) && (value === 0 || Object.is(value, -0)) || IsBigInt(value) && value === BigInt("0") || IsString(value) && (value.toLowerCase() === "false" || value === "0" || value === "-0");
}
__name(IsValueFalse, "IsValueFalse");
function IsTimeStringWithTimeZone(value) {
  return IsString(value) && /^(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)$/i.test(value);
}
__name(IsTimeStringWithTimeZone, "IsTimeStringWithTimeZone");
function IsTimeStringWithoutTimeZone(value) {
  return IsString(value) && /^(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)?$/i.test(value);
}
__name(IsTimeStringWithoutTimeZone, "IsTimeStringWithoutTimeZone");
function IsDateTimeStringWithTimeZone(value) {
  return IsString(value) && /^\d\d\d\d-[0-1]\d-[0-3]\dt(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)$/i.test(value);
}
__name(IsDateTimeStringWithTimeZone, "IsDateTimeStringWithTimeZone");
function IsDateTimeStringWithoutTimeZone(value) {
  return IsString(value) && /^\d\d\d\d-[0-1]\d-[0-3]\dt(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)?$/i.test(value);
}
__name(IsDateTimeStringWithoutTimeZone, "IsDateTimeStringWithoutTimeZone");
function IsDateString(value) {
  return IsString(value) && /^\d\d\d\d-[0-1]\d-[0-3]\d$/i.test(value);
}
__name(IsDateString, "IsDateString");
function TryConvertLiteralString(value, target) {
  const conversion = TryConvertString(value);
  return conversion === target ? conversion : value;
}
__name(TryConvertLiteralString, "TryConvertLiteralString");
function TryConvertLiteralNumber(value, target) {
  const conversion = TryConvertNumber(value);
  return conversion === target ? conversion : value;
}
__name(TryConvertLiteralNumber, "TryConvertLiteralNumber");
function TryConvertLiteralBoolean(value, target) {
  const conversion = TryConvertBoolean(value);
  return conversion === target ? conversion : value;
}
__name(TryConvertLiteralBoolean, "TryConvertLiteralBoolean");
function TryConvertLiteral(schema, value) {
  return IsString(schema.const) ? TryConvertLiteralString(value, schema.const) : IsNumber(schema.const) ? TryConvertLiteralNumber(value, schema.const) : IsBoolean(schema.const) ? TryConvertLiteralBoolean(value, schema.const) : Clone2(value);
}
__name(TryConvertLiteral, "TryConvertLiteral");
function TryConvertBoolean(value) {
  return IsValueTrue(value) ? true : IsValueFalse(value) ? false : value;
}
__name(TryConvertBoolean, "TryConvertBoolean");
function TryConvertBigInt(value) {
  return IsStringNumeric(value) ? BigInt(parseInt(value)) : IsNumber(value) ? BigInt(value | 0) : IsValueFalse(value) ? BigInt(0) : IsValueTrue(value) ? BigInt(1) : value;
}
__name(TryConvertBigInt, "TryConvertBigInt");
function TryConvertString(value) {
  return IsValueToString(value) ? value.toString() : IsSymbol(value) && value.description !== void 0 ? value.description.toString() : value;
}
__name(TryConvertString, "TryConvertString");
function TryConvertNumber(value) {
  return IsStringNumeric(value) ? parseFloat(value) : IsValueTrue(value) ? 1 : IsValueFalse(value) ? 0 : value;
}
__name(TryConvertNumber, "TryConvertNumber");
function TryConvertInteger(value) {
  return IsStringNumeric(value) ? parseInt(value) : IsNumber(value) ? value | 0 : IsValueTrue(value) ? 1 : IsValueFalse(value) ? 0 : value;
}
__name(TryConvertInteger, "TryConvertInteger");
function TryConvertNull(value) {
  return IsString(value) && value.toLowerCase() === "null" ? null : value;
}
__name(TryConvertNull, "TryConvertNull");
function TryConvertUndefined(value) {
  return IsString(value) && value === "undefined" ? void 0 : value;
}
__name(TryConvertUndefined, "TryConvertUndefined");
function TryConvertDate(value) {
  return IsDate(value) ? value : IsNumber(value) ? new Date(value) : IsValueTrue(value) ? /* @__PURE__ */ new Date(1) : IsValueFalse(value) ? /* @__PURE__ */ new Date(0) : IsStringNumeric(value) ? new Date(parseInt(value)) : IsTimeStringWithoutTimeZone(value) ? /* @__PURE__ */ new Date(`1970-01-01T${value}.000Z`) : IsTimeStringWithTimeZone(value) ? /* @__PURE__ */ new Date(`1970-01-01T${value}`) : IsDateTimeStringWithoutTimeZone(value) ? /* @__PURE__ */ new Date(`${value}.000Z`) : IsDateTimeStringWithTimeZone(value) ? new Date(value) : IsDateString(value) ? /* @__PURE__ */ new Date(`${value}T00:00:00.000Z`) : value;
}
__name(TryConvertDate, "TryConvertDate");
function Default2(value) {
  return value;
}
__name(Default2, "Default");
function FromArray9(schema, references, value) {
  const elements = IsArray(value) ? value : [value];
  return elements.map((element) => Visit10(schema.items, references, element));
}
__name(FromArray9, "FromArray");
function FromBigInt5(schema, references, value) {
  return TryConvertBigInt(value);
}
__name(FromBigInt5, "FromBigInt");
function FromBoolean5(schema, references, value) {
  return TryConvertBoolean(value);
}
__name(FromBoolean5, "FromBoolean");
function FromDate5(schema, references, value) {
  return TryConvertDate(value);
}
__name(FromDate5, "FromDate");
function FromInteger5(schema, references, value) {
  return TryConvertInteger(value);
}
__name(FromInteger5, "FromInteger");
function FromIntersect9(schema, references, value) {
  return schema.allOf.reduce((value2, schema2) => Visit10(schema2, references, value2), value);
}
__name(FromIntersect9, "FromIntersect");
function FromLiteral6(schema, references, value) {
  return TryConvertLiteral(schema, value);
}
__name(FromLiteral6, "FromLiteral");
function FromNull5(schema, references, value) {
  return TryConvertNull(value);
}
__name(FromNull5, "FromNull");
function FromNumber5(schema, references, value) {
  return TryConvertNumber(value);
}
__name(FromNumber5, "FromNumber");
function FromObject7(schema, references, value) {
  const isConvertable = IsObject(value);
  if (!isConvertable)
    return value;
  const result = {};
  for (const key of Object.keys(value)) {
    result[key] = HasPropertyKey(schema.properties, key) ? Visit10(schema.properties[key], references, value[key]) : value[key];
  }
  return result;
}
__name(FromObject7, "FromObject");
function FromRecord7(schema, references, value) {
  const propertyKey = Object.getOwnPropertyNames(schema.patternProperties)[0];
  const property = schema.patternProperties[propertyKey];
  const result = {};
  for (const [propKey, propValue] of Object.entries(value)) {
    result[propKey] = Visit10(property, references, propValue);
  }
  return result;
}
__name(FromRecord7, "FromRecord");
function FromRef6(schema, references, value) {
  return Visit10(Deref(schema, references), references, value);
}
__name(FromRef6, "FromRef");
function FromString5(schema, references, value) {
  return TryConvertString(value);
}
__name(FromString5, "FromString");
function FromSymbol5(schema, references, value) {
  return IsString(value) || IsNumber(value) ? Symbol(value) : value;
}
__name(FromSymbol5, "FromSymbol");
function FromThis6(schema, references, value) {
  return Visit10(Deref(schema, references), references, value);
}
__name(FromThis6, "FromThis");
function FromTuple9(schema, references, value) {
  const isConvertable = IsArray(value) && !IsUndefined(schema.items);
  if (!isConvertable)
    return value;
  return value.map((value2, index) => {
    return index < schema.items.length ? Visit10(schema.items[index], references, value2) : value2;
  });
}
__name(FromTuple9, "FromTuple");
function FromUndefined5(schema, references, value) {
  return TryConvertUndefined(value);
}
__name(FromUndefined5, "FromUndefined");
function FromUnion11(schema, references, value) {
  for (const subschema of schema.anyOf) {
    const converted = Visit10(subschema, references, value);
    if (!Check(subschema, references, converted))
      continue;
    return converted;
  }
  return value;
}
__name(FromUnion11, "FromUnion");
function Visit10(schema, references, value) {
  const references_ = IsString(schema.$id) ? [...references, schema] : references;
  const schema_ = schema;
  switch (schema[Kind]) {
    case "Array":
      return FromArray9(schema_, references_, value);
    case "BigInt":
      return FromBigInt5(schema_, references_, value);
    case "Boolean":
      return FromBoolean5(schema_, references_, value);
    case "Date":
      return FromDate5(schema_, references_, value);
    case "Integer":
      return FromInteger5(schema_, references_, value);
    case "Intersect":
      return FromIntersect9(schema_, references_, value);
    case "Literal":
      return FromLiteral6(schema_, references_, value);
    case "Null":
      return FromNull5(schema_, references_, value);
    case "Number":
      return FromNumber5(schema_, references_, value);
    case "Object":
      return FromObject7(schema_, references_, value);
    case "Record":
      return FromRecord7(schema_, references_, value);
    case "Ref":
      return FromRef6(schema_, references_, value);
    case "String":
      return FromString5(schema_, references_, value);
    case "Symbol":
      return FromSymbol5(schema_, references_, value);
    case "This":
      return FromThis6(schema_, references_, value);
    case "Tuple":
      return FromTuple9(schema_, references_, value);
    case "Undefined":
      return FromUndefined5(schema_, references_, value);
    case "Union":
      return FromUnion11(schema_, references_, value);
    default:
      return Default2(value);
  }
}
__name(Visit10, "Visit");
function Convert(...args) {
  return args.length === 3 ? Visit10(args[0], args[1], args[2]) : Visit10(args[0], [], args[1]);
}
__name(Convert, "Convert");

// node_modules/@sinclair/typebox/build/esm/value/default/index.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();

// node_modules/@sinclair/typebox/build/esm/value/default/default.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();
function ValueOrDefault(schema, value) {
  return value === void 0 && "default" in schema ? Clone2(schema.default) : value;
}
__name(ValueOrDefault, "ValueOrDefault");
function IsCheckable2(schema) {
  return IsSchema2(schema) && schema[Kind] !== "Unsafe";
}
__name(IsCheckable2, "IsCheckable");
function IsDefaultSchema(value) {
  return IsSchema2(value) && "default" in value;
}
__name(IsDefaultSchema, "IsDefaultSchema");
function FromArray10(schema, references, value) {
  const defaulted = ValueOrDefault(schema, value);
  if (!IsArray(defaulted))
    return defaulted;
  for (let i = 0; i < defaulted.length; i++) {
    defaulted[i] = Visit11(schema.items, references, defaulted[i]);
  }
  return defaulted;
}
__name(FromArray10, "FromArray");
function FromIntersect10(schema, references, value) {
  const defaulted = ValueOrDefault(schema, value);
  return schema.allOf.reduce((acc, schema2) => {
    const next = Visit11(schema2, references, defaulted);
    return IsObject(next) ? { ...acc, ...next } : next;
  }, {});
}
__name(FromIntersect10, "FromIntersect");
function FromObject8(schema, references, value) {
  const defaulted = ValueOrDefault(schema, value);
  if (!IsObject(defaulted))
    return defaulted;
  const additionalPropertiesSchema = schema.additionalProperties;
  const knownPropertyKeys = Object.getOwnPropertyNames(schema.properties);
  for (const key of knownPropertyKeys) {
    if (!IsDefaultSchema(schema.properties[key]))
      continue;
    defaulted[key] = Visit11(schema.properties[key], references, defaulted[key]);
  }
  if (!IsDefaultSchema(additionalPropertiesSchema))
    return defaulted;
  for (const key of Object.getOwnPropertyNames(defaulted)) {
    if (knownPropertyKeys.includes(key))
      continue;
    defaulted[key] = Visit11(additionalPropertiesSchema, references, defaulted[key]);
  }
  return defaulted;
}
__name(FromObject8, "FromObject");
function FromRecord8(schema, references, value) {
  const defaulted = ValueOrDefault(schema, value);
  if (!IsObject(defaulted))
    return defaulted;
  const additionalPropertiesSchema = schema.additionalProperties;
  const [propertyKeyPattern, propertySchema] = Object.entries(schema.patternProperties)[0];
  const knownPropertyKey = new RegExp(propertyKeyPattern);
  for (const key of Object.getOwnPropertyNames(defaulted)) {
    if (!(knownPropertyKey.test(key) && IsDefaultSchema(propertySchema)))
      continue;
    defaulted[key] = Visit11(propertySchema, references, defaulted[key]);
  }
  if (!IsDefaultSchema(additionalPropertiesSchema))
    return defaulted;
  for (const key of Object.getOwnPropertyNames(defaulted)) {
    if (knownPropertyKey.test(key))
      continue;
    defaulted[key] = Visit11(additionalPropertiesSchema, references, defaulted[key]);
  }
  return defaulted;
}
__name(FromRecord8, "FromRecord");
function FromRef7(schema, references, value) {
  return Visit11(Deref(schema, references), references, ValueOrDefault(schema, value));
}
__name(FromRef7, "FromRef");
function FromThis7(schema, references, value) {
  return Visit11(Deref(schema, references), references, value);
}
__name(FromThis7, "FromThis");
function FromTuple10(schema, references, value) {
  const defaulted = ValueOrDefault(schema, value);
  if (!IsArray(defaulted) || IsUndefined(schema.items))
    return defaulted;
  const [items, max] = [schema.items, Math.max(schema.items.length, defaulted.length)];
  for (let i = 0; i < max; i++) {
    if (i < items.length)
      defaulted[i] = Visit11(items[i], references, defaulted[i]);
  }
  return defaulted;
}
__name(FromTuple10, "FromTuple");
function FromUnion12(schema, references, value) {
  const defaulted = ValueOrDefault(schema, value);
  for (const inner of schema.anyOf) {
    const result = Visit11(inner, references, defaulted);
    if (IsCheckable2(inner) && Check(inner, result)) {
      return result;
    }
  }
  return defaulted;
}
__name(FromUnion12, "FromUnion");
function Visit11(schema, references, value) {
  const references_ = IsString(schema.$id) ? [...references, schema] : references;
  const schema_ = schema;
  switch (schema_[Kind]) {
    case "Array":
      return FromArray10(schema_, references_, value);
    case "Intersect":
      return FromIntersect10(schema_, references_, value);
    case "Object":
      return FromObject8(schema_, references_, value);
    case "Record":
      return FromRecord8(schema_, references_, value);
    case "Ref":
      return FromRef7(schema_, references_, value);
    case "This":
      return FromThis7(schema_, references_, value);
    case "Tuple":
      return FromTuple10(schema_, references_, value);
    case "Union":
      return FromUnion12(schema_, references_, value);
    default:
      return ValueOrDefault(schema_, value);
  }
}
__name(Visit11, "Visit");
function Default3(...args) {
  return args.length === 3 ? Visit11(args[0], args[1], args[2]) : Visit11(args[0], [], args[1]);
}
__name(Default3, "Default");

// node_modules/@sinclair/typebox/build/esm/value/delta/index.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();

// node_modules/@sinclair/typebox/build/esm/value/delta/delta.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();

// node_modules/@sinclair/typebox/build/esm/value/pointer/index.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();

// node_modules/@sinclair/typebox/build/esm/value/pointer/pointer.mjs
var pointer_exports = {};
__export(pointer_exports, {
  Delete: () => Delete3,
  Format: () => Format,
  Get: () => Get3,
  Has: () => Has3,
  Set: () => Set4,
  ValuePointerRootDeleteError: () => ValuePointerRootDeleteError,
  ValuePointerRootSetError: () => ValuePointerRootSetError
});
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();
var ValuePointerRootSetError = class extends TypeBoxError {
  constructor(value, path2, update) {
    super("Cannot set root value");
    this.value = value;
    this.path = path2;
    this.update = update;
  }
};
__name(ValuePointerRootSetError, "ValuePointerRootSetError");
var ValuePointerRootDeleteError = class extends TypeBoxError {
  constructor(value, path2) {
    super("Cannot delete root value");
    this.value = value;
    this.path = path2;
  }
};
__name(ValuePointerRootDeleteError, "ValuePointerRootDeleteError");
function Escape2(component) {
  return component.indexOf("~") === -1 ? component : component.replace(/~1/g, "/").replace(/~0/g, "~");
}
__name(Escape2, "Escape");
function* Format(pointer) {
  if (pointer === "")
    return;
  let [start, end] = [0, 0];
  for (let i = 0; i < pointer.length; i++) {
    const char = pointer.charAt(i);
    if (char === "/") {
      if (i === 0) {
        start = i + 1;
      } else {
        end = i;
        yield Escape2(pointer.slice(start, end));
        start = i + 1;
      }
    } else {
      end = i;
    }
  }
  yield Escape2(pointer.slice(start));
}
__name(Format, "Format");
function Set4(value, pointer, update) {
  if (pointer === "")
    throw new ValuePointerRootSetError(value, pointer, update);
  let [owner, next, key] = [null, value, ""];
  for (const component of Format(pointer)) {
    if (next[component] === void 0)
      next[component] = {};
    owner = next;
    next = next[component];
    key = component;
  }
  owner[key] = update;
}
__name(Set4, "Set");
function Delete3(value, pointer) {
  if (pointer === "")
    throw new ValuePointerRootDeleteError(value, pointer);
  let [owner, next, key] = [null, value, ""];
  for (const component of Format(pointer)) {
    if (next[component] === void 0 || next[component] === null)
      return;
    owner = next;
    next = next[component];
    key = component;
  }
  if (Array.isArray(owner)) {
    const index = parseInt(key);
    owner.splice(index, 1);
  } else {
    delete owner[key];
  }
}
__name(Delete3, "Delete");
function Has3(value, pointer) {
  if (pointer === "")
    return true;
  let [owner, next, key] = [null, value, ""];
  for (const component of Format(pointer)) {
    if (next[component] === void 0)
      return false;
    owner = next;
    next = next[component];
    key = component;
  }
  return Object.getOwnPropertyNames(owner).includes(key);
}
__name(Has3, "Has");
function Get3(value, pointer) {
  if (pointer === "")
    return value;
  let current = value;
  for (const component of Format(pointer)) {
    if (current[component] === void 0)
      return void 0;
    current = current[component];
  }
  return current;
}
__name(Get3, "Get");

// node_modules/@sinclair/typebox/build/esm/value/delta/delta.mjs
var Insert = Object2({
  type: Literal("insert"),
  path: String2(),
  value: Unknown()
});
var Update = Object2({
  type: Literal("update"),
  path: String2(),
  value: Unknown()
});
var Delete4 = Object2({
  type: Literal("delete"),
  path: String2()
});
var Edit = Union([Insert, Update, Delete4]);
var ValueDeltaError = class extends TypeBoxError {
  constructor(value, message) {
    super(message);
    this.value = value;
  }
};
__name(ValueDeltaError, "ValueDeltaError");
var ValueDeltaSymbolError = class extends ValueDeltaError {
  constructor(value) {
    super(value, "Cannot diff objects with symbol keys");
    this.value = value;
  }
};
__name(ValueDeltaSymbolError, "ValueDeltaSymbolError");
function CreateUpdate(path2, value) {
  return { type: "update", path: path2, value };
}
__name(CreateUpdate, "CreateUpdate");
function CreateInsert(path2, value) {
  return { type: "insert", path: path2, value };
}
__name(CreateInsert, "CreateInsert");
function CreateDelete(path2) {
  return { type: "delete", path: path2 };
}
__name(CreateDelete, "CreateDelete");
function* ObjectType4(path2, current, next) {
  if (!IsStandardObject(next))
    return yield CreateUpdate(path2, next);
  const currentKeys = [...globalThis.Object.keys(current), ...globalThis.Object.getOwnPropertySymbols(current)];
  const nextKeys = [...globalThis.Object.keys(next), ...globalThis.Object.getOwnPropertySymbols(next)];
  for (const key of currentKeys) {
    if (IsSymbol(key))
      throw new ValueDeltaSymbolError(key);
    if (IsUndefined(next[key]) && nextKeys.includes(key))
      yield CreateUpdate(`${path2}/${globalThis.String(key)}`, void 0);
  }
  for (const key of nextKeys) {
    if (IsUndefined(current[key]) || IsUndefined(next[key]))
      continue;
    if (IsSymbol(key))
      throw new ValueDeltaSymbolError(key);
    yield* Visit12(`${path2}/${globalThis.String(key)}`, current[key], next[key]);
  }
  for (const key of nextKeys) {
    if (IsSymbol(key))
      throw new ValueDeltaSymbolError(key);
    if (IsUndefined(current[key]))
      yield CreateInsert(`${path2}/${globalThis.String(key)}`, next[key]);
  }
  for (const key of currentKeys.reverse()) {
    if (IsSymbol(key))
      throw new ValueDeltaSymbolError(key);
    if (IsUndefined(next[key]) && !nextKeys.includes(key))
      yield CreateDelete(`${path2}/${globalThis.String(key)}`);
  }
}
__name(ObjectType4, "ObjectType");
function* ArrayType4(path2, current, next) {
  if (!IsArray(next))
    return yield CreateUpdate(path2, next);
  for (let i = 0; i < Math.min(current.length, next.length); i++) {
    yield* Visit12(`${path2}/${i}`, current[i], next[i]);
  }
  for (let i = 0; i < next.length; i++) {
    if (i < current.length)
      continue;
    yield CreateInsert(`${path2}/${i}`, next[i]);
  }
  for (let i = current.length - 1; i >= 0; i--) {
    if (i < next.length)
      continue;
    yield CreateDelete(`${path2}/${i}`);
  }
}
__name(ArrayType4, "ArrayType");
function* TypedArrayType2(path2, current, next) {
  if (!IsTypedArray(next) || current.length !== next.length || globalThis.Object.getPrototypeOf(current).constructor.name !== globalThis.Object.getPrototypeOf(next).constructor.name)
    return yield CreateUpdate(path2, next);
  for (let i = 0; i < Math.min(current.length, next.length); i++) {
    yield* Visit12(`${path2}/${i}`, current[i], next[i]);
  }
}
__name(TypedArrayType2, "TypedArrayType");
function* ValueType2(path2, current, next) {
  if (current === next)
    return;
  yield CreateUpdate(path2, next);
}
__name(ValueType2, "ValueType");
function* Visit12(path2, current, next) {
  if (IsStandardObject(current))
    return yield* ObjectType4(path2, current, next);
  if (IsArray(current))
    return yield* ArrayType4(path2, current, next);
  if (IsTypedArray(current))
    return yield* TypedArrayType2(path2, current, next);
  if (IsValueType(current))
    return yield* ValueType2(path2, current, next);
  throw new ValueDeltaError(current, "Unable to create diff edits for unknown value");
}
__name(Visit12, "Visit");
function Diff(current, next) {
  return [...Visit12("", current, next)];
}
__name(Diff, "Diff");
function IsRootUpdate(edits) {
  return edits.length > 0 && edits[0].path === "" && edits[0].type === "update";
}
__name(IsRootUpdate, "IsRootUpdate");
function IsIdentity(edits) {
  return edits.length === 0;
}
__name(IsIdentity, "IsIdentity");
function Patch(current, edits) {
  if (IsRootUpdate(edits)) {
    return Clone2(edits[0].value);
  }
  if (IsIdentity(edits)) {
    return Clone2(current);
  }
  const clone = Clone2(current);
  for (const edit of edits) {
    switch (edit.type) {
      case "insert": {
        pointer_exports.Set(clone, edit.path, edit.value);
        break;
      }
      case "update": {
        pointer_exports.Set(clone, edit.path, edit.value);
        break;
      }
      case "delete": {
        pointer_exports.Delete(clone, edit.path);
        break;
      }
    }
  }
  return clone;
}
__name(Patch, "Patch");

// node_modules/@sinclair/typebox/build/esm/value/equal/index.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();

// node_modules/@sinclair/typebox/build/esm/value/equal/equal.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();
function ObjectType5(left, right) {
  if (!IsStandardObject(right))
    return false;
  const leftKeys = [...Object.keys(left), ...Object.getOwnPropertySymbols(left)];
  const rightKeys = [...Object.keys(right), ...Object.getOwnPropertySymbols(right)];
  if (leftKeys.length !== rightKeys.length)
    return false;
  return leftKeys.every((key) => Equal(left[key], right[key]));
}
__name(ObjectType5, "ObjectType");
function DateType4(left, right) {
  return IsDate(right) && left.getTime() === right.getTime();
}
__name(DateType4, "DateType");
function ArrayType5(left, right) {
  if (!IsArray(right) || left.length !== right.length)
    return false;
  return left.every((value, index) => Equal(value, right[index]));
}
__name(ArrayType5, "ArrayType");
function TypedArrayType3(left, right) {
  if (!IsTypedArray(right) || left.length !== right.length || Object.getPrototypeOf(left).constructor.name !== Object.getPrototypeOf(right).constructor.name)
    return false;
  return left.every((value, index) => Equal(value, right[index]));
}
__name(TypedArrayType3, "TypedArrayType");
function ValueType3(left, right) {
  return left === right;
}
__name(ValueType3, "ValueType");
function Equal(left, right) {
  if (IsStandardObject(left))
    return ObjectType5(left, right);
  if (IsDate(left))
    return DateType4(left, right);
  if (IsTypedArray(left))
    return TypedArrayType3(left, right);
  if (IsArray(left))
    return ArrayType5(left, right);
  if (IsValueType(left))
    return ValueType3(left, right);
  throw new Error("ValueEquals: Unable to compare value");
}
__name(Equal, "Equal");

// node_modules/@sinclair/typebox/build/esm/value/mutate/index.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();

// node_modules/@sinclair/typebox/build/esm/value/mutate/mutate.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();
var ValueMutateError = class extends TypeBoxError {
  constructor(message) {
    super(message);
  }
};
__name(ValueMutateError, "ValueMutateError");
function ObjectType6(root, path2, current, next) {
  if (!IsStandardObject(current)) {
    pointer_exports.Set(root, path2, Clone2(next));
  } else {
    const currentKeys = Object.getOwnPropertyNames(current);
    const nextKeys = Object.getOwnPropertyNames(next);
    for (const currentKey of currentKeys) {
      if (!nextKeys.includes(currentKey)) {
        delete current[currentKey];
      }
    }
    for (const nextKey of nextKeys) {
      if (!currentKeys.includes(nextKey)) {
        current[nextKey] = null;
      }
    }
    for (const nextKey of nextKeys) {
      Visit13(root, `${path2}/${nextKey}`, current[nextKey], next[nextKey]);
    }
  }
}
__name(ObjectType6, "ObjectType");
function ArrayType6(root, path2, current, next) {
  if (!IsArray(current)) {
    pointer_exports.Set(root, path2, Clone2(next));
  } else {
    for (let index = 0; index < next.length; index++) {
      Visit13(root, `${path2}/${index}`, current[index], next[index]);
    }
    current.splice(next.length);
  }
}
__name(ArrayType6, "ArrayType");
function TypedArrayType4(root, path2, current, next) {
  if (IsTypedArray(current) && current.length === next.length) {
    for (let i = 0; i < current.length; i++) {
      current[i] = next[i];
    }
  } else {
    pointer_exports.Set(root, path2, Clone2(next));
  }
}
__name(TypedArrayType4, "TypedArrayType");
function ValueType4(root, path2, current, next) {
  if (current === next)
    return;
  pointer_exports.Set(root, path2, next);
}
__name(ValueType4, "ValueType");
function Visit13(root, path2, current, next) {
  if (IsArray(next))
    return ArrayType6(root, path2, current, next);
  if (IsTypedArray(next))
    return TypedArrayType4(root, path2, current, next);
  if (IsStandardObject(next))
    return ObjectType6(root, path2, current, next);
  if (IsValueType(next))
    return ValueType4(root, path2, current, next);
}
__name(Visit13, "Visit");
function IsNonMutableValue(value) {
  return IsTypedArray(value) || IsValueType(value);
}
__name(IsNonMutableValue, "IsNonMutableValue");
function IsMismatchedValue(current, next) {
  return IsStandardObject(current) && IsArray(next) || IsArray(current) && IsStandardObject(next);
}
__name(IsMismatchedValue, "IsMismatchedValue");
function Mutate(current, next) {
  if (IsNonMutableValue(current) || IsNonMutableValue(next))
    throw new ValueMutateError("Only object and array types can be mutated at the root level");
  if (IsMismatchedValue(current, next))
    throw new ValueMutateError("Cannot assign due type mismatch of assignable values");
  Visit13(current, "", current, next);
}
__name(Mutate, "Mutate");

// node_modules/@sinclair/typebox/build/esm/value/transform/index.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();

// node_modules/@sinclair/typebox/build/esm/value/transform/decode.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();
var TransformDecodeCheckError = class extends TypeBoxError {
  constructor(schema, value, error2) {
    super(`Unable to decode value as it does not match the expected schema`);
    this.schema = schema;
    this.value = value;
    this.error = error2;
  }
};
__name(TransformDecodeCheckError, "TransformDecodeCheckError");
var TransformDecodeError = class extends TypeBoxError {
  constructor(schema, path2, value, error2) {
    super(error2 instanceof Error ? error2.message : "Unknown error");
    this.schema = schema;
    this.path = path2;
    this.value = value;
    this.error = error2;
  }
};
__name(TransformDecodeError, "TransformDecodeError");
function Default4(schema, path2, value) {
  try {
    return IsTransform2(schema) ? schema[TransformKind].Decode(value) : value;
  } catch (error2) {
    throw new TransformDecodeError(schema, path2, value, error2);
  }
}
__name(Default4, "Default");
function FromArray11(schema, references, path2, value) {
  return IsArray(value) ? Default4(schema, path2, value.map((value2, index) => Visit14(schema.items, references, `${path2}/${index}`, value2))) : Default4(schema, path2, value);
}
__name(FromArray11, "FromArray");
function FromIntersect11(schema, references, path2, value) {
  if (!IsStandardObject(value) || IsValueType(value))
    return Default4(schema, path2, value);
  const knownEntries = KeyOfPropertyEntries(schema);
  const knownKeys = knownEntries.map((entry) => entry[0]);
  const knownProperties = { ...value };
  for (const [knownKey, knownSchema] of knownEntries)
    if (knownKey in knownProperties) {
      knownProperties[knownKey] = Visit14(knownSchema, references, `${path2}/${knownKey}`, knownProperties[knownKey]);
    }
  if (!IsTransform2(schema.unevaluatedProperties)) {
    return Default4(schema, path2, knownProperties);
  }
  const unknownKeys = Object.getOwnPropertyNames(knownProperties);
  const unevaluatedProperties = schema.unevaluatedProperties;
  const unknownProperties = { ...knownProperties };
  for (const key of unknownKeys)
    if (!knownKeys.includes(key)) {
      unknownProperties[key] = Default4(unevaluatedProperties, `${path2}/${key}`, unknownProperties[key]);
    }
  return Default4(schema, path2, unknownProperties);
}
__name(FromIntersect11, "FromIntersect");
function FromNot5(schema, references, path2, value) {
  return Default4(schema, path2, Visit14(schema.not, references, path2, value));
}
__name(FromNot5, "FromNot");
function FromObject9(schema, references, path2, value) {
  if (!IsStandardObject(value))
    return Default4(schema, path2, value);
  const knownKeys = KeyOfPropertyKeys(schema);
  const knownProperties = { ...value };
  for (const key of knownKeys)
    if (key in knownProperties) {
      knownProperties[key] = Visit14(schema.properties[key], references, `${path2}/${key}`, knownProperties[key]);
    }
  if (!IsSchema2(schema.additionalProperties)) {
    return Default4(schema, path2, knownProperties);
  }
  const unknownKeys = Object.getOwnPropertyNames(knownProperties);
  const additionalProperties = schema.additionalProperties;
  const unknownProperties = { ...knownProperties };
  for (const key of unknownKeys)
    if (!knownKeys.includes(key)) {
      unknownProperties[key] = Default4(additionalProperties, `${path2}/${key}`, unknownProperties[key]);
    }
  return Default4(schema, path2, unknownProperties);
}
__name(FromObject9, "FromObject");
function FromRecord9(schema, references, path2, value) {
  if (!IsStandardObject(value))
    return Default4(schema, path2, value);
  const pattern = Object.getOwnPropertyNames(schema.patternProperties)[0];
  const knownKeys = new RegExp(pattern);
  const knownProperties = { ...value };
  for (const key of Object.getOwnPropertyNames(value))
    if (knownKeys.test(key)) {
      knownProperties[key] = Visit14(schema.patternProperties[pattern], references, `${path2}/${key}`, knownProperties[key]);
    }
  if (!IsSchema2(schema.additionalProperties)) {
    return Default4(schema, path2, knownProperties);
  }
  const unknownKeys = Object.getOwnPropertyNames(knownProperties);
  const additionalProperties = schema.additionalProperties;
  const unknownProperties = { ...knownProperties };
  for (const key of unknownKeys)
    if (!knownKeys.test(key)) {
      unknownProperties[key] = Default4(additionalProperties, `${path2}/${key}`, unknownProperties[key]);
    }
  return Default4(schema, path2, unknownProperties);
}
__name(FromRecord9, "FromRecord");
function FromRef8(schema, references, path2, value) {
  const target = Deref(schema, references);
  return Default4(schema, path2, Visit14(target, references, path2, value));
}
__name(FromRef8, "FromRef");
function FromThis8(schema, references, path2, value) {
  const target = Deref(schema, references);
  return Default4(schema, path2, Visit14(target, references, path2, value));
}
__name(FromThis8, "FromThis");
function FromTuple11(schema, references, path2, value) {
  return IsArray(value) && IsArray(schema.items) ? Default4(schema, path2, schema.items.map((schema2, index) => Visit14(schema2, references, `${path2}/${index}`, value[index]))) : Default4(schema, path2, value);
}
__name(FromTuple11, "FromTuple");
function FromUnion13(schema, references, path2, value) {
  for (const subschema of schema.anyOf) {
    if (!Check(subschema, references, value))
      continue;
    const decoded = Visit14(subschema, references, path2, value);
    return Default4(schema, path2, decoded);
  }
  return Default4(schema, path2, value);
}
__name(FromUnion13, "FromUnion");
function Visit14(schema, references, path2, value) {
  const references_ = typeof schema.$id === "string" ? [...references, schema] : references;
  const schema_ = schema;
  switch (schema[Kind]) {
    case "Array":
      return FromArray11(schema_, references_, path2, value);
    case "Intersect":
      return FromIntersect11(schema_, references_, path2, value);
    case "Not":
      return FromNot5(schema_, references_, path2, value);
    case "Object":
      return FromObject9(schema_, references_, path2, value);
    case "Record":
      return FromRecord9(schema_, references_, path2, value);
    case "Ref":
      return FromRef8(schema_, references_, path2, value);
    case "Symbol":
      return Default4(schema_, path2, value);
    case "This":
      return FromThis8(schema_, references_, path2, value);
    case "Tuple":
      return FromTuple11(schema_, references_, path2, value);
    case "Union":
      return FromUnion13(schema_, references_, path2, value);
    default:
      return Default4(schema_, path2, value);
  }
}
__name(Visit14, "Visit");
function TransformDecode(schema, references, value) {
  return Visit14(schema, references, "", value);
}
__name(TransformDecode, "TransformDecode");

// node_modules/@sinclair/typebox/build/esm/value/transform/encode.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();
var TransformEncodeCheckError = class extends TypeBoxError {
  constructor(schema, value, error2) {
    super(`The encoded value does not match the expected schema`);
    this.schema = schema;
    this.value = value;
    this.error = error2;
  }
};
__name(TransformEncodeCheckError, "TransformEncodeCheckError");
var TransformEncodeError = class extends TypeBoxError {
  constructor(schema, path2, value, error2) {
    super(`${error2 instanceof Error ? error2.message : "Unknown error"}`);
    this.schema = schema;
    this.path = path2;
    this.value = value;
    this.error = error2;
  }
};
__name(TransformEncodeError, "TransformEncodeError");
function Default5(schema, path2, value) {
  try {
    return IsTransform2(schema) ? schema[TransformKind].Encode(value) : value;
  } catch (error2) {
    throw new TransformEncodeError(schema, path2, value, error2);
  }
}
__name(Default5, "Default");
function FromArray12(schema, references, path2, value) {
  const defaulted = Default5(schema, path2, value);
  return IsArray(defaulted) ? defaulted.map((value2, index) => Visit15(schema.items, references, `${path2}/${index}`, value2)) : defaulted;
}
__name(FromArray12, "FromArray");
function FromIntersect12(schema, references, path2, value) {
  const defaulted = Default5(schema, path2, value);
  if (!IsStandardObject(value) || IsValueType(value))
    return defaulted;
  const knownEntries = KeyOfPropertyEntries(schema);
  const knownKeys = knownEntries.map((entry) => entry[0]);
  const knownProperties = { ...defaulted };
  for (const [knownKey, knownSchema] of knownEntries)
    if (knownKey in knownProperties) {
      knownProperties[knownKey] = Visit15(knownSchema, references, `${path2}/${knownKey}`, knownProperties[knownKey]);
    }
  if (!IsTransform2(schema.unevaluatedProperties)) {
    return Default5(schema, path2, knownProperties);
  }
  const unknownKeys = Object.getOwnPropertyNames(knownProperties);
  const unevaluatedProperties = schema.unevaluatedProperties;
  const properties = { ...knownProperties };
  for (const key of unknownKeys)
    if (!knownKeys.includes(key)) {
      properties[key] = Default5(unevaluatedProperties, `${path2}/${key}`, properties[key]);
    }
  return properties;
}
__name(FromIntersect12, "FromIntersect");
function FromNot6(schema, references, path2, value) {
  return Default5(schema.not, path2, Default5(schema, path2, value));
}
__name(FromNot6, "FromNot");
function FromObject10(schema, references, path2, value) {
  const defaulted = Default5(schema, path2, value);
  if (!IsStandardObject(defaulted))
    return defaulted;
  const knownKeys = KeyOfPropertyKeys(schema);
  const knownProperties = { ...defaulted };
  for (const key of knownKeys)
    if (key in knownProperties) {
      knownProperties[key] = Visit15(schema.properties[key], references, `${path2}/${key}`, knownProperties[key]);
    }
  if (!IsSchema2(schema.additionalProperties)) {
    return knownProperties;
  }
  const unknownKeys = Object.getOwnPropertyNames(knownProperties);
  const additionalProperties = schema.additionalProperties;
  const properties = { ...knownProperties };
  for (const key of unknownKeys)
    if (!knownKeys.includes(key)) {
      properties[key] = Default5(additionalProperties, `${path2}/${key}`, properties[key]);
    }
  return properties;
}
__name(FromObject10, "FromObject");
function FromRecord10(schema, references, path2, value) {
  const defaulted = Default5(schema, path2, value);
  if (!IsStandardObject(value))
    return defaulted;
  const pattern = Object.getOwnPropertyNames(schema.patternProperties)[0];
  const knownKeys = new RegExp(pattern);
  const knownProperties = { ...defaulted };
  for (const key of Object.getOwnPropertyNames(value))
    if (knownKeys.test(key)) {
      knownProperties[key] = Visit15(schema.patternProperties[pattern], references, `${path2}/${key}`, knownProperties[key]);
    }
  if (!IsSchema2(schema.additionalProperties)) {
    return Default5(schema, path2, knownProperties);
  }
  const unknownKeys = Object.getOwnPropertyNames(knownProperties);
  const additionalProperties = schema.additionalProperties;
  const properties = { ...knownProperties };
  for (const key of unknownKeys)
    if (!knownKeys.test(key)) {
      properties[key] = Default5(additionalProperties, `${path2}/${key}`, properties[key]);
    }
  return properties;
}
__name(FromRecord10, "FromRecord");
function FromRef9(schema, references, path2, value) {
  const target = Deref(schema, references);
  const resolved = Visit15(target, references, path2, value);
  return Default5(schema, path2, resolved);
}
__name(FromRef9, "FromRef");
function FromThis9(schema, references, path2, value) {
  const target = Deref(schema, references);
  const resolved = Visit15(target, references, path2, value);
  return Default5(schema, path2, resolved);
}
__name(FromThis9, "FromThis");
function FromTuple12(schema, references, path2, value) {
  const value1 = Default5(schema, path2, value);
  return IsArray(schema.items) ? schema.items.map((schema2, index) => Visit15(schema2, references, `${path2}/${index}`, value1[index])) : [];
}
__name(FromTuple12, "FromTuple");
function FromUnion14(schema, references, path2, value) {
  for (const subschema of schema.anyOf) {
    if (!Check(subschema, references, value))
      continue;
    const value1 = Visit15(subschema, references, path2, value);
    return Default5(schema, path2, value1);
  }
  for (const subschema of schema.anyOf) {
    const value1 = Visit15(subschema, references, path2, value);
    if (!Check(schema, references, value1))
      continue;
    return Default5(schema, path2, value1);
  }
  return Default5(schema, path2, value);
}
__name(FromUnion14, "FromUnion");
function Visit15(schema, references, path2, value) {
  const references_ = typeof schema.$id === "string" ? [...references, schema] : references;
  const schema_ = schema;
  switch (schema[Kind]) {
    case "Array":
      return FromArray12(schema_, references_, path2, value);
    case "Intersect":
      return FromIntersect12(schema_, references_, path2, value);
    case "Not":
      return FromNot6(schema_, references_, path2, value);
    case "Object":
      return FromObject10(schema_, references_, path2, value);
    case "Record":
      return FromRecord10(schema_, references_, path2, value);
    case "Ref":
      return FromRef9(schema_, references_, path2, value);
    case "This":
      return FromThis9(schema_, references_, path2, value);
    case "Tuple":
      return FromTuple12(schema_, references_, path2, value);
    case "Union":
      return FromUnion14(schema_, references_, path2, value);
    default:
      return Default5(schema_, path2, value);
  }
}
__name(Visit15, "Visit");
function TransformEncode(schema, references, value) {
  return Visit15(schema, references, "", value);
}
__name(TransformEncode, "TransformEncode");

// node_modules/@sinclair/typebox/build/esm/value/transform/has.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();
function FromArray13(schema, references) {
  return IsTransform2(schema) || Visit16(schema.items, references);
}
__name(FromArray13, "FromArray");
function FromAsyncIterator5(schema, references) {
  return IsTransform2(schema) || Visit16(schema.items, references);
}
__name(FromAsyncIterator5, "FromAsyncIterator");
function FromConstructor6(schema, references) {
  return IsTransform2(schema) || Visit16(schema.returns, references) || schema.parameters.some((schema2) => Visit16(schema2, references));
}
__name(FromConstructor6, "FromConstructor");
function FromFunction5(schema, references) {
  return IsTransform2(schema) || Visit16(schema.returns, references) || schema.parameters.some((schema2) => Visit16(schema2, references));
}
__name(FromFunction5, "FromFunction");
function FromIntersect13(schema, references) {
  return IsTransform2(schema) || IsTransform2(schema.unevaluatedProperties) || schema.allOf.some((schema2) => Visit16(schema2, references));
}
__name(FromIntersect13, "FromIntersect");
function FromIterator5(schema, references) {
  return IsTransform2(schema) || Visit16(schema.items, references);
}
__name(FromIterator5, "FromIterator");
function FromNot7(schema, references) {
  return IsTransform2(schema) || Visit16(schema.not, references);
}
__name(FromNot7, "FromNot");
function FromObject11(schema, references) {
  return IsTransform2(schema) || Object.values(schema.properties).some((schema2) => Visit16(schema2, references)) || IsSchema2(schema.additionalProperties) && Visit16(schema.additionalProperties, references);
}
__name(FromObject11, "FromObject");
function FromPromise5(schema, references) {
  return IsTransform2(schema) || Visit16(schema.item, references);
}
__name(FromPromise5, "FromPromise");
function FromRecord11(schema, references) {
  const pattern = Object.getOwnPropertyNames(schema.patternProperties)[0];
  const property = schema.patternProperties[pattern];
  return IsTransform2(schema) || Visit16(property, references) || IsSchema2(schema.additionalProperties) && IsTransform2(schema.additionalProperties);
}
__name(FromRecord11, "FromRecord");
function FromRef10(schema, references) {
  if (IsTransform2(schema))
    return true;
  return Visit16(Deref(schema, references), references);
}
__name(FromRef10, "FromRef");
function FromThis10(schema, references) {
  if (IsTransform2(schema))
    return true;
  return Visit16(Deref(schema, references), references);
}
__name(FromThis10, "FromThis");
function FromTuple13(schema, references) {
  return IsTransform2(schema) || !IsUndefined(schema.items) && schema.items.some((schema2) => Visit16(schema2, references));
}
__name(FromTuple13, "FromTuple");
function FromUnion15(schema, references) {
  return IsTransform2(schema) || schema.anyOf.some((schema2) => Visit16(schema2, references));
}
__name(FromUnion15, "FromUnion");
function Visit16(schema, references) {
  const references_ = IsString(schema.$id) ? [...references, schema] : references;
  const schema_ = schema;
  if (schema.$id && visited.has(schema.$id))
    return false;
  if (schema.$id)
    visited.add(schema.$id);
  switch (schema[Kind]) {
    case "Array":
      return FromArray13(schema_, references_);
    case "AsyncIterator":
      return FromAsyncIterator5(schema_, references_);
    case "Constructor":
      return FromConstructor6(schema_, references_);
    case "Function":
      return FromFunction5(schema_, references_);
    case "Intersect":
      return FromIntersect13(schema_, references_);
    case "Iterator":
      return FromIterator5(schema_, references_);
    case "Not":
      return FromNot7(schema_, references_);
    case "Object":
      return FromObject11(schema_, references_);
    case "Promise":
      return FromPromise5(schema_, references_);
    case "Record":
      return FromRecord11(schema_, references_);
    case "Ref":
      return FromRef10(schema_, references_);
    case "This":
      return FromThis10(schema_, references_);
    case "Tuple":
      return FromTuple13(schema_, references_);
    case "Union":
      return FromUnion15(schema_, references_);
    default:
      return IsTransform2(schema);
  }
}
__name(Visit16, "Visit");
var visited = /* @__PURE__ */ new Set();
function HasTransform(schema, references) {
  visited.clear();
  return Visit16(schema, references);
}
__name(HasTransform, "HasTransform");

// node_modules/@sinclair/typebox/build/esm/value/value/index.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();

// node_modules/@sinclair/typebox/build/esm/value/value/value.mjs
var value_exports2 = {};
__export(value_exports2, {
  Cast: () => Cast2,
  Check: () => Check2,
  Clean: () => Clean2,
  Clone: () => Clone3,
  Convert: () => Convert2,
  Create: () => Create3,
  Decode: () => Decode,
  Default: () => Default6,
  Diff: () => Diff2,
  Encode: () => Encode,
  Equal: () => Equal2,
  Errors: () => Errors2,
  Hash: () => Hash2,
  Mutate: () => Mutate2,
  Patch: () => Patch2
});
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();
function Cast2(...args) {
  return Cast.apply(Cast, args);
}
__name(Cast2, "Cast");
function Create3(...args) {
  return Create2.apply(Create2, args);
}
__name(Create3, "Create");
function Check2(...args) {
  return Check.apply(Check, args);
}
__name(Check2, "Check");
function Clean2(...args) {
  return Clean.apply(Clean, args);
}
__name(Clean2, "Clean");
function Convert2(...args) {
  return Convert.apply(Convert, args);
}
__name(Convert2, "Convert");
function Clone3(value) {
  return Clone2(value);
}
__name(Clone3, "Clone");
function Decode(...args) {
  const [schema, references, value] = args.length === 3 ? [args[0], args[1], args[2]] : [args[0], [], args[1]];
  if (!Check2(schema, references, value))
    throw new TransformDecodeCheckError(schema, value, Errors2(schema, references, value).First());
  return HasTransform(schema, references) ? TransformDecode(schema, references, value) : value;
}
__name(Decode, "Decode");
function Default6(...args) {
  return Default3.apply(Default3, args);
}
__name(Default6, "Default");
function Encode(...args) {
  const [schema, references, value] = args.length === 3 ? [args[0], args[1], args[2]] : [args[0], [], args[1]];
  const encoded = HasTransform(schema, references) ? TransformEncode(schema, references, value) : value;
  if (!Check2(schema, references, encoded))
    throw new TransformEncodeCheckError(schema, encoded, Errors2(schema, references, encoded).First());
  return encoded;
}
__name(Encode, "Encode");
function Errors2(...args) {
  return Errors.apply(Errors, args);
}
__name(Errors2, "Errors");
function Equal2(left, right) {
  return Equal(left, right);
}
__name(Equal2, "Equal");
function Diff2(current, next) {
  return Diff(current, next);
}
__name(Diff2, "Diff");
function Hash2(value) {
  return Hash(value);
}
__name(Hash2, "Hash");
function Patch2(current, edits) {
  return Patch(current, edits);
}
__name(Patch2, "Patch");
function Mutate2(current, next) {
  Mutate(current, next);
}
__name(Mutate2, "Mutate");

// node_modules/@sinclair/typebox/build/esm/index.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();

// node_modules/@sinclair/typebox/build/esm/type/clone/index.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();

// node_modules/@sinclair/typebox/build/esm/type/helpers/index.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();

// node_modules/@sinclair/typebox/build/esm/type/helpers/helpers.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();

// node_modules/@sinclair/typebox/build/esm/type/awaited/index.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();

// node_modules/@sinclair/typebox/build/esm/type/awaited/awaited.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();
function FromRest4(T) {
  return T.map((L) => AwaitedResolve(L));
}
__name(FromRest4, "FromRest");
function FromIntersect14(T) {
  return Intersect(FromRest4(T));
}
__name(FromIntersect14, "FromIntersect");
function FromUnion16(T) {
  return Union(FromRest4(T));
}
__name(FromUnion16, "FromUnion");
function FromPromise6(T) {
  return AwaitedResolve(T);
}
__name(FromPromise6, "FromPromise");
function AwaitedResolve(T) {
  return IsIntersect(T) ? FromIntersect14(T.allOf) : IsUnion(T) ? FromUnion16(T.anyOf) : IsPromise2(T) ? FromPromise6(T.item) : T;
}
__name(AwaitedResolve, "AwaitedResolve");
function Awaited(T, options = {}) {
  return CloneType(AwaitedResolve(T), options);
}
__name(Awaited, "Awaited");

// node_modules/@sinclair/typebox/build/esm/type/composite/index.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();

// node_modules/@sinclair/typebox/build/esm/type/composite/composite.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();
function CompositeKeys(T) {
  const Acc = [];
  for (const L of T)
    Acc.push(...KeyOfPropertyKeys(L));
  return SetDistinct(Acc);
}
__name(CompositeKeys, "CompositeKeys");
function FilterNever(T) {
  return T.filter((L) => !IsNever(L));
}
__name(FilterNever, "FilterNever");
function CompositeProperty(T, K) {
  const Acc = [];
  for (const L of T)
    Acc.push(...IndexFromPropertyKeys(L, [K]));
  return FilterNever(Acc);
}
__name(CompositeProperty, "CompositeProperty");
function CompositeProperties(T, K) {
  const Acc = {};
  for (const L of K) {
    Acc[L] = IntersectEvaluated(CompositeProperty(T, L));
  }
  return Acc;
}
__name(CompositeProperties, "CompositeProperties");
function Composite(T, options = {}) {
  const K = CompositeKeys(T);
  const P = CompositeProperties(T, K);
  const R = Object2(P, options);
  return R;
}
__name(Composite, "Composite");

// node_modules/@sinclair/typebox/build/esm/type/const/index.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();

// node_modules/@sinclair/typebox/build/esm/type/const/const.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();

// node_modules/@sinclair/typebox/build/esm/type/date/index.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();

// node_modules/@sinclair/typebox/build/esm/type/date/date.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();
function Date2(options = {}) {
  return {
    ...options,
    [Kind]: "Date",
    type: "Date"
  };
}
__name(Date2, "Date");

// node_modules/@sinclair/typebox/build/esm/type/null/index.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();

// node_modules/@sinclair/typebox/build/esm/type/null/null.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();
function Null(options = {}) {
  return {
    ...options,
    [Kind]: "Null",
    type: "null"
  };
}
__name(Null, "Null");

// node_modules/@sinclair/typebox/build/esm/type/symbol/index.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();

// node_modules/@sinclair/typebox/build/esm/type/symbol/symbol.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();
function Symbol2(options) {
  return { ...options, [Kind]: "Symbol", type: "symbol" };
}
__name(Symbol2, "Symbol");

// node_modules/@sinclair/typebox/build/esm/type/undefined/index.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();

// node_modules/@sinclair/typebox/build/esm/type/undefined/undefined.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();
function Undefined(options = {}) {
  return { ...options, [Kind]: "Undefined", type: "undefined" };
}
__name(Undefined, "Undefined");

// node_modules/@sinclair/typebox/build/esm/type/uint8array/index.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();

// node_modules/@sinclair/typebox/build/esm/type/uint8array/uint8array.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();
function Uint8Array2(options = {}) {
  return { ...options, [Kind]: "Uint8Array", type: "Uint8Array" };
}
__name(Uint8Array2, "Uint8Array");

// node_modules/@sinclair/typebox/build/esm/type/const/const.mjs
function FromArray14(T) {
  return T.map((L) => FromValue(L, false));
}
__name(FromArray14, "FromArray");
function FromProperties8(value) {
  const Acc = {};
  for (const K of globalThis.Object.getOwnPropertyNames(value))
    Acc[K] = Readonly(FromValue(value[K], false));
  return Acc;
}
__name(FromProperties8, "FromProperties");
function ConditionalReadonly(T, root) {
  return root === true ? T : Readonly(T);
}
__name(ConditionalReadonly, "ConditionalReadonly");
function FromValue(value, root) {
  return IsAsyncIterator2(value) ? ConditionalReadonly(Any(), root) : IsIterator2(value) ? ConditionalReadonly(Any(), root) : IsArray2(value) ? Readonly(Tuple(FromArray14(value))) : IsUint8Array2(value) ? Uint8Array2() : IsDate2(value) ? Date2() : IsObject2(value) ? ConditionalReadonly(Object2(FromProperties8(value)), root) : IsFunction2(value) ? ConditionalReadonly(Function2([], Unknown()), root) : IsUndefined2(value) ? Undefined() : IsNull2(value) ? Null() : IsSymbol2(value) ? Symbol2() : IsBigInt2(value) ? BigInt2() : IsNumber2(value) ? Literal(value) : IsBoolean2(value) ? Literal(value) : IsString2(value) ? Literal(value) : Object2({});
}
__name(FromValue, "FromValue");
function Const(T, options = {}) {
  return CloneType(FromValue(T, true), options);
}
__name(Const, "Const");

// node_modules/@sinclair/typebox/build/esm/type/constructor-parameters/index.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();

// node_modules/@sinclair/typebox/build/esm/type/constructor-parameters/constructor-parameters.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();
function ConstructorParameters(schema, options = {}) {
  return Tuple(CloneRest(schema.parameters), { ...options });
}
__name(ConstructorParameters, "ConstructorParameters");

// node_modules/@sinclair/typebox/build/esm/type/deref/index.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();

// node_modules/@sinclair/typebox/build/esm/type/deref/deref.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();
function FromRest5(schema, references) {
  return schema.map((schema2) => Deref2(schema2, references));
}
__name(FromRest5, "FromRest");
function FromProperties9(properties, references) {
  const Acc = {};
  for (const K of globalThis.Object.getOwnPropertyNames(properties)) {
    Acc[K] = Deref2(properties[K], references);
  }
  return Acc;
}
__name(FromProperties9, "FromProperties");
function FromConstructor7(schema, references) {
  schema.parameters = FromRest5(schema.parameters, references);
  schema.returns = Deref2(schema.returns, references);
  return schema;
}
__name(FromConstructor7, "FromConstructor");
function FromFunction6(schema, references) {
  schema.parameters = FromRest5(schema.parameters, references);
  schema.returns = Deref2(schema.returns, references);
  return schema;
}
__name(FromFunction6, "FromFunction");
function FromIntersect15(schema, references) {
  schema.allOf = FromRest5(schema.allOf, references);
  return schema;
}
__name(FromIntersect15, "FromIntersect");
function FromUnion17(schema, references) {
  schema.anyOf = FromRest5(schema.anyOf, references);
  return schema;
}
__name(FromUnion17, "FromUnion");
function FromTuple14(schema, references) {
  if (IsUndefined2(schema.items))
    return schema;
  schema.items = FromRest5(schema.items, references);
  return schema;
}
__name(FromTuple14, "FromTuple");
function FromArray15(schema, references) {
  schema.items = Deref2(schema.items, references);
  return schema;
}
__name(FromArray15, "FromArray");
function FromObject12(schema, references) {
  schema.properties = FromProperties9(schema.properties, references);
  return schema;
}
__name(FromObject12, "FromObject");
function FromPromise7(schema, references) {
  schema.item = Deref2(schema.item, references);
  return schema;
}
__name(FromPromise7, "FromPromise");
function FromAsyncIterator6(schema, references) {
  schema.items = Deref2(schema.items, references);
  return schema;
}
__name(FromAsyncIterator6, "FromAsyncIterator");
function FromIterator6(schema, references) {
  schema.items = Deref2(schema.items, references);
  return schema;
}
__name(FromIterator6, "FromIterator");
function FromRef11(schema, references) {
  const target = references.find((remote) => remote.$id === schema.$ref);
  if (target === void 0)
    throw Error(`Unable to dereference schema with $id ${schema.$ref}`);
  const discard = Discard(target, ["$id"]);
  return Deref2(discard, references);
}
__name(FromRef11, "FromRef");
function DerefResolve(schema, references) {
  return IsConstructor(schema) ? FromConstructor7(schema, references) : IsFunction3(schema) ? FromFunction6(schema, references) : IsIntersect(schema) ? FromIntersect15(schema, references) : IsUnion(schema) ? FromUnion17(schema, references) : IsTuple(schema) ? FromTuple14(schema, references) : IsArray3(schema) ? FromArray15(schema, references) : IsObject3(schema) ? FromObject12(schema, references) : IsPromise2(schema) ? FromPromise7(schema, references) : IsAsyncIterator3(schema) ? FromAsyncIterator6(schema, references) : IsIterator3(schema) ? FromIterator6(schema, references) : IsRef(schema) ? FromRef11(schema, references) : schema;
}
__name(DerefResolve, "DerefResolve");
function Deref2(schema, references) {
  return DerefResolve(CloneType(schema), CloneRest(references));
}
__name(Deref2, "Deref");

// node_modules/@sinclair/typebox/build/esm/type/enum/index.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();

// node_modules/@sinclair/typebox/build/esm/type/enum/enum.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();
function Enum(item, options = {}) {
  if (IsUndefined2(item))
    throw new Error("Enum undefined or empty");
  const values1 = globalThis.Object.getOwnPropertyNames(item).filter((key) => isNaN(key)).map((key) => item[key]);
  const values2 = [...new Set(values1)];
  const anyOf = values2.map((value) => Literal(value));
  return Union(anyOf, { ...options, [Hint]: "Enum" });
}
__name(Enum, "Enum");

// node_modules/@sinclair/typebox/build/esm/type/exclude/index.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();

// node_modules/@sinclair/typebox/build/esm/type/exclude/exclude-from-mapped-result.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();

// node_modules/@sinclair/typebox/build/esm/type/exclude/exclude.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();

// node_modules/@sinclair/typebox/build/esm/type/exclude/exclude-from-template-literal.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();
function ExcludeFromTemplateLiteral(L, R) {
  return Exclude(TemplateLiteralToUnion(L), R);
}
__name(ExcludeFromTemplateLiteral, "ExcludeFromTemplateLiteral");

// node_modules/@sinclair/typebox/build/esm/type/exclude/exclude.mjs
function ExcludeRest(L, R) {
  const excluded = L.filter((inner) => ExtendsCheck(inner, R) === ExtendsResult.False);
  return excluded.length === 1 ? excluded[0] : Union(excluded);
}
__name(ExcludeRest, "ExcludeRest");
function Exclude(L, R, options = {}) {
  if (IsTemplateLiteral(L))
    return CloneType(ExcludeFromTemplateLiteral(L, R), options);
  if (IsMappedResult(L))
    return CloneType(ExcludeFromMappedResult(L, R), options);
  return CloneType(IsUnion(L) ? ExcludeRest(L.anyOf, R) : ExtendsCheck(L, R) !== ExtendsResult.False ? Never() : L, options);
}
__name(Exclude, "Exclude");

// node_modules/@sinclair/typebox/build/esm/type/exclude/exclude-from-mapped-result.mjs
function FromProperties10(P, U) {
  const Acc = {};
  for (const K2 of globalThis.Object.getOwnPropertyNames(P))
    Acc[K2] = Exclude(P[K2], U);
  return Acc;
}
__name(FromProperties10, "FromProperties");
function FromMappedResult7(R, T) {
  return FromProperties10(R.properties, T);
}
__name(FromMappedResult7, "FromMappedResult");
function ExcludeFromMappedResult(R, T) {
  const P = FromMappedResult7(R, T);
  return MappedResult(P);
}
__name(ExcludeFromMappedResult, "ExcludeFromMappedResult");

// node_modules/@sinclair/typebox/build/esm/type/extract/index.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();

// node_modules/@sinclair/typebox/build/esm/type/extract/extract-from-mapped-result.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();

// node_modules/@sinclair/typebox/build/esm/type/extract/extract.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();

// node_modules/@sinclair/typebox/build/esm/type/extract/extract-from-template-literal.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();
function ExtractFromTemplateLiteral(L, R) {
  return Extract(TemplateLiteralToUnion(L), R);
}
__name(ExtractFromTemplateLiteral, "ExtractFromTemplateLiteral");

// node_modules/@sinclair/typebox/build/esm/type/extract/extract.mjs
function ExtractRest(L, R) {
  const extracted = L.filter((inner) => ExtendsCheck(inner, R) !== ExtendsResult.False);
  return extracted.length === 1 ? extracted[0] : Union(extracted);
}
__name(ExtractRest, "ExtractRest");
function Extract(L, R, options = {}) {
  if (IsTemplateLiteral(L))
    return CloneType(ExtractFromTemplateLiteral(L, R), options);
  if (IsMappedResult(L))
    return CloneType(ExtractFromMappedResult(L, R), options);
  return CloneType(IsUnion(L) ? ExtractRest(L.anyOf, R) : ExtendsCheck(L, R) !== ExtendsResult.False ? L : Never(), options);
}
__name(Extract, "Extract");

// node_modules/@sinclair/typebox/build/esm/type/extract/extract-from-mapped-result.mjs
function FromProperties11(P, T) {
  const Acc = {};
  for (const K2 of globalThis.Object.getOwnPropertyNames(P))
    Acc[K2] = Extract(P[K2], T);
  return Acc;
}
__name(FromProperties11, "FromProperties");
function FromMappedResult8(R, T) {
  return FromProperties11(R.properties, T);
}
__name(FromMappedResult8, "FromMappedResult");
function ExtractFromMappedResult(R, T) {
  const P = FromMappedResult8(R, T);
  return MappedResult(P);
}
__name(ExtractFromMappedResult, "ExtractFromMappedResult");

// node_modules/@sinclair/typebox/build/esm/type/instance-type/index.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();

// node_modules/@sinclair/typebox/build/esm/type/instance-type/instance-type.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();
function InstanceType(schema, options = {}) {
  return CloneType(schema.returns, options);
}
__name(InstanceType, "InstanceType");

// node_modules/@sinclair/typebox/build/esm/type/integer/index.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();

// node_modules/@sinclair/typebox/build/esm/type/integer/integer.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();
function Integer(options = {}) {
  return {
    ...options,
    [Kind]: "Integer",
    type: "integer"
  };
}
__name(Integer, "Integer");

// node_modules/@sinclair/typebox/build/esm/type/intrinsic/index.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();

// node_modules/@sinclair/typebox/build/esm/type/intrinsic/capitalize.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();

// node_modules/@sinclair/typebox/build/esm/type/intrinsic/intrinsic.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();

// node_modules/@sinclair/typebox/build/esm/type/intrinsic/intrinsic-from-mapped-key.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();
function MappedIntrinsicPropertyKey(K, M, options) {
  return {
    [K]: Intrinsic(Literal(K), M, options)
  };
}
__name(MappedIntrinsicPropertyKey, "MappedIntrinsicPropertyKey");
function MappedIntrinsicPropertyKeys(K, M, options) {
  return K.reduce((Acc, L) => {
    return { ...Acc, ...MappedIntrinsicPropertyKey(L, M, options) };
  }, {});
}
__name(MappedIntrinsicPropertyKeys, "MappedIntrinsicPropertyKeys");
function MappedIntrinsicProperties(T, M, options) {
  return MappedIntrinsicPropertyKeys(T["keys"], M, options);
}
__name(MappedIntrinsicProperties, "MappedIntrinsicProperties");
function IntrinsicFromMappedKey(T, M, options) {
  const P = MappedIntrinsicProperties(T, M, options);
  return MappedResult(P);
}
__name(IntrinsicFromMappedKey, "IntrinsicFromMappedKey");

// node_modules/@sinclair/typebox/build/esm/type/intrinsic/intrinsic.mjs
function ApplyUncapitalize(value) {
  const [first, rest] = [value.slice(0, 1), value.slice(1)];
  return [first.toLowerCase(), rest].join("");
}
__name(ApplyUncapitalize, "ApplyUncapitalize");
function ApplyCapitalize(value) {
  const [first, rest] = [value.slice(0, 1), value.slice(1)];
  return [first.toUpperCase(), rest].join("");
}
__name(ApplyCapitalize, "ApplyCapitalize");
function ApplyUppercase(value) {
  return value.toUpperCase();
}
__name(ApplyUppercase, "ApplyUppercase");
function ApplyLowercase(value) {
  return value.toLowerCase();
}
__name(ApplyLowercase, "ApplyLowercase");
function FromTemplateLiteral6(schema, mode, options) {
  const expression = TemplateLiteralParseExact(schema.pattern);
  const finite = IsTemplateLiteralExpressionFinite(expression);
  if (!finite)
    return { ...schema, pattern: FromLiteralValue(schema.pattern, mode) };
  const strings = [...TemplateLiteralExpressionGenerate(expression)];
  const literals = strings.map((value) => Literal(value));
  const mapped = FromRest6(literals, mode);
  const union = Union(mapped);
  return TemplateLiteral([union], options);
}
__name(FromTemplateLiteral6, "FromTemplateLiteral");
function FromLiteralValue(value, mode) {
  return typeof value === "string" ? mode === "Uncapitalize" ? ApplyUncapitalize(value) : mode === "Capitalize" ? ApplyCapitalize(value) : mode === "Uppercase" ? ApplyUppercase(value) : mode === "Lowercase" ? ApplyLowercase(value) : value : value.toString();
}
__name(FromLiteralValue, "FromLiteralValue");
function FromRest6(T, M) {
  return T.map((L) => Intrinsic(L, M));
}
__name(FromRest6, "FromRest");
function Intrinsic(schema, mode, options = {}) {
  return (
    // Intrinsic-Mapped-Inference
    IsMappedKey(schema) ? IntrinsicFromMappedKey(schema, mode, options) : (
      // Standard-Inference
      IsTemplateLiteral(schema) ? FromTemplateLiteral6(schema, mode, schema) : IsUnion(schema) ? Union(FromRest6(schema.anyOf, mode), options) : IsLiteral(schema) ? Literal(FromLiteralValue(schema.const, mode), options) : schema
    )
  );
}
__name(Intrinsic, "Intrinsic");

// node_modules/@sinclair/typebox/build/esm/type/intrinsic/capitalize.mjs
function Capitalize(T, options = {}) {
  return Intrinsic(T, "Capitalize", options);
}
__name(Capitalize, "Capitalize");

// node_modules/@sinclair/typebox/build/esm/type/intrinsic/lowercase.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();
function Lowercase(T, options = {}) {
  return Intrinsic(T, "Lowercase", options);
}
__name(Lowercase, "Lowercase");

// node_modules/@sinclair/typebox/build/esm/type/intrinsic/uncapitalize.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();
function Uncapitalize(T, options = {}) {
  return Intrinsic(T, "Uncapitalize", options);
}
__name(Uncapitalize, "Uncapitalize");

// node_modules/@sinclair/typebox/build/esm/type/intrinsic/uppercase.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();
function Uppercase(T, options = {}) {
  return Intrinsic(T, "Uppercase", options);
}
__name(Uppercase, "Uppercase");

// node_modules/@sinclair/typebox/build/esm/type/not/index.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();

// node_modules/@sinclair/typebox/build/esm/type/not/not.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();
function Not2(schema, options) {
  return {
    ...options,
    [Kind]: "Not",
    not: CloneType(schema)
  };
}
__name(Not2, "Not");

// node_modules/@sinclair/typebox/build/esm/type/omit/index.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();

// node_modules/@sinclair/typebox/build/esm/type/omit/omit-from-mapped-key.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();

// node_modules/@sinclair/typebox/build/esm/type/omit/omit.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();

// node_modules/@sinclair/typebox/build/esm/type/omit/omit-from-mapped-result.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();
function FromProperties12(P, K, options) {
  const Acc = {};
  for (const K2 of globalThis.Object.getOwnPropertyNames(P))
    Acc[K2] = Omit(P[K2], K, options);
  return Acc;
}
__name(FromProperties12, "FromProperties");
function FromMappedResult9(R, K, options) {
  return FromProperties12(R.properties, K, options);
}
__name(FromMappedResult9, "FromMappedResult");
function OmitFromMappedResult(R, K, options) {
  const P = FromMappedResult9(R, K, options);
  return MappedResult(P);
}
__name(OmitFromMappedResult, "OmitFromMappedResult");

// node_modules/@sinclair/typebox/build/esm/type/omit/omit.mjs
function FromIntersect16(T, K) {
  return T.map((T2) => OmitResolve(T2, K));
}
__name(FromIntersect16, "FromIntersect");
function FromUnion18(T, K) {
  return T.map((T2) => OmitResolve(T2, K));
}
__name(FromUnion18, "FromUnion");
function FromProperty2(T, K) {
  const { [K]: _, ...R } = T;
  return R;
}
__name(FromProperty2, "FromProperty");
function FromProperties13(T, K) {
  return K.reduce((T2, K2) => FromProperty2(T2, K2), T);
}
__name(FromProperties13, "FromProperties");
function OmitResolve(T, K) {
  return IsIntersect(T) ? Intersect(FromIntersect16(T.allOf, K)) : IsUnion(T) ? Union(FromUnion18(T.anyOf, K)) : IsObject3(T) ? Object2(FromProperties13(T.properties, K)) : Object2({});
}
__name(OmitResolve, "OmitResolve");
function Omit(T, K, options = {}) {
  if (IsMappedKey(K))
    return OmitFromMappedKey(T, K, options);
  if (IsMappedResult(T))
    return OmitFromMappedResult(T, K, options);
  const I = IsSchema(K) ? IndexPropertyKeys(K) : K;
  const D = Discard(T, [TransformKind, "$id", "required"]);
  const R = CloneType(OmitResolve(T, I), options);
  return { ...D, ...R };
}
__name(Omit, "Omit");

// node_modules/@sinclair/typebox/build/esm/type/omit/omit-from-mapped-key.mjs
function FromPropertyKey2(T, K, options) {
  return {
    [K]: Omit(T, [K], options)
  };
}
__name(FromPropertyKey2, "FromPropertyKey");
function FromPropertyKeys2(T, K, options) {
  return K.reduce((Acc, LK) => {
    return { ...Acc, ...FromPropertyKey2(T, LK, options) };
  }, {});
}
__name(FromPropertyKeys2, "FromPropertyKeys");
function FromMappedKey3(T, K, options) {
  return FromPropertyKeys2(T, K.keys, options);
}
__name(FromMappedKey3, "FromMappedKey");
function OmitFromMappedKey(T, K, options) {
  const P = FromMappedKey3(T, K, options);
  return MappedResult(P);
}
__name(OmitFromMappedKey, "OmitFromMappedKey");

// node_modules/@sinclair/typebox/build/esm/type/parameters/index.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();

// node_modules/@sinclair/typebox/build/esm/type/parameters/parameters.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();
function Parameters(schema, options = {}) {
  return Tuple(CloneRest(schema.parameters), { ...options });
}
__name(Parameters, "Parameters");

// node_modules/@sinclair/typebox/build/esm/type/partial/index.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();

// node_modules/@sinclair/typebox/build/esm/type/partial/partial-from-mapped-result.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();

// node_modules/@sinclair/typebox/build/esm/type/partial/partial.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();
function FromRest7(T) {
  return T.map((L) => PartialResolve(L));
}
__name(FromRest7, "FromRest");
function FromProperties14(T) {
  const Acc = {};
  for (const K of globalThis.Object.getOwnPropertyNames(T))
    Acc[K] = Optional(T[K]);
  return Acc;
}
__name(FromProperties14, "FromProperties");
function PartialResolve(T) {
  return IsIntersect(T) ? Intersect(FromRest7(T.allOf)) : IsUnion(T) ? Union(FromRest7(T.anyOf)) : IsObject3(T) ? Object2(FromProperties14(T.properties)) : Object2({});
}
__name(PartialResolve, "PartialResolve");
function Partial(T, options = {}) {
  if (IsMappedResult(T))
    return PartialFromMappedResult(T, options);
  const D = Discard(T, [TransformKind, "$id", "required"]);
  const R = CloneType(PartialResolve(T), options);
  return { ...D, ...R };
}
__name(Partial, "Partial");

// node_modules/@sinclair/typebox/build/esm/type/partial/partial-from-mapped-result.mjs
function FromProperties15(K, options) {
  const Acc = {};
  for (const K2 of globalThis.Object.getOwnPropertyNames(K))
    Acc[K2] = Partial(K[K2], options);
  return Acc;
}
__name(FromProperties15, "FromProperties");
function FromMappedResult10(R, options) {
  return FromProperties15(R.properties, options);
}
__name(FromMappedResult10, "FromMappedResult");
function PartialFromMappedResult(R, options) {
  const P = FromMappedResult10(R, options);
  return MappedResult(P);
}
__name(PartialFromMappedResult, "PartialFromMappedResult");

// node_modules/@sinclair/typebox/build/esm/type/pick/index.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();

// node_modules/@sinclair/typebox/build/esm/type/pick/pick-from-mapped-key.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();

// node_modules/@sinclair/typebox/build/esm/type/pick/pick.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();

// node_modules/@sinclair/typebox/build/esm/type/pick/pick-from-mapped-result.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();
function FromProperties16(P, K, options) {
  const Acc = {};
  for (const K2 of globalThis.Object.getOwnPropertyNames(P))
    Acc[K2] = Pick(P[K2], K, options);
  return Acc;
}
__name(FromProperties16, "FromProperties");
function FromMappedResult11(R, K, options) {
  return FromProperties16(R.properties, K, options);
}
__name(FromMappedResult11, "FromMappedResult");
function PickFromMappedResult(R, K, options) {
  const P = FromMappedResult11(R, K, options);
  return MappedResult(P);
}
__name(PickFromMappedResult, "PickFromMappedResult");

// node_modules/@sinclair/typebox/build/esm/type/pick/pick.mjs
function FromIntersect17(T, K) {
  return T.map((T2) => PickResolve(T2, K));
}
__name(FromIntersect17, "FromIntersect");
function FromUnion19(T, K) {
  return T.map((T2) => PickResolve(T2, K));
}
__name(FromUnion19, "FromUnion");
function FromProperties17(T, K) {
  const Acc = {};
  for (const K2 of K)
    if (K2 in T)
      Acc[K2] = T[K2];
  return Acc;
}
__name(FromProperties17, "FromProperties");
function PickResolve(T, K) {
  return IsIntersect(T) ? Intersect(FromIntersect17(T.allOf, K)) : IsUnion(T) ? Union(FromUnion19(T.anyOf, K)) : IsObject3(T) ? Object2(FromProperties17(T.properties, K)) : Object2({});
}
__name(PickResolve, "PickResolve");
function Pick(T, K, options = {}) {
  if (IsMappedKey(K))
    return PickFromMappedKey(T, K, options);
  if (IsMappedResult(T))
    return PickFromMappedResult(T, K, options);
  const I = IsSchema(K) ? IndexPropertyKeys(K) : K;
  const D = Discard(T, [TransformKind, "$id", "required"]);
  const R = CloneType(PickResolve(T, I), options);
  return { ...D, ...R };
}
__name(Pick, "Pick");

// node_modules/@sinclair/typebox/build/esm/type/pick/pick-from-mapped-key.mjs
function FromPropertyKey3(T, K, options) {
  return {
    [K]: Pick(T, [K], options)
  };
}
__name(FromPropertyKey3, "FromPropertyKey");
function FromPropertyKeys3(T, K, options) {
  return K.reduce((Acc, LK) => {
    return { ...Acc, ...FromPropertyKey3(T, LK, options) };
  }, {});
}
__name(FromPropertyKeys3, "FromPropertyKeys");
function FromMappedKey4(T, K, options) {
  return FromPropertyKeys3(T, K.keys, options);
}
__name(FromMappedKey4, "FromMappedKey");
function PickFromMappedKey(T, K, options) {
  const P = FromMappedKey4(T, K, options);
  return MappedResult(P);
}
__name(PickFromMappedKey, "PickFromMappedKey");

// node_modules/@sinclair/typebox/build/esm/type/readonly-optional/index.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();

// node_modules/@sinclair/typebox/build/esm/type/readonly-optional/readonly-optional.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();
function ReadonlyOptional(schema) {
  return Readonly(Optional(schema));
}
__name(ReadonlyOptional, "ReadonlyOptional");

// node_modules/@sinclair/typebox/build/esm/type/record/index.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();

// node_modules/@sinclair/typebox/build/esm/type/record/record.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();
function RecordCreateFromPattern(pattern, T, options) {
  return {
    ...options,
    [Kind]: "Record",
    type: "object",
    patternProperties: { [pattern]: CloneType(T) }
  };
}
__name(RecordCreateFromPattern, "RecordCreateFromPattern");
function RecordCreateFromKeys(K, T, options) {
  const Acc = {};
  for (const K2 of K)
    Acc[K2] = CloneType(T);
  return Object2(Acc, { ...options, [Hint]: "Record" });
}
__name(RecordCreateFromKeys, "RecordCreateFromKeys");
function FromTemplateLiteralKey(K, T, options) {
  return IsTemplateLiteralFinite(K) ? RecordCreateFromKeys(IndexPropertyKeys(K), T, options) : RecordCreateFromPattern(K.pattern, T, options);
}
__name(FromTemplateLiteralKey, "FromTemplateLiteralKey");
function FromUnionKey(K, T, options) {
  return RecordCreateFromKeys(IndexPropertyKeys(Union(K)), T, options);
}
__name(FromUnionKey, "FromUnionKey");
function FromLiteralKey(K, T, options) {
  return RecordCreateFromKeys([K.toString()], T, options);
}
__name(FromLiteralKey, "FromLiteralKey");
function FromRegExpKey(K, T, options) {
  return RecordCreateFromPattern(K.source, T, options);
}
__name(FromRegExpKey, "FromRegExpKey");
function FromStringKey(K, T, options) {
  const pattern = IsUndefined2(K.pattern) ? PatternStringExact : K.pattern;
  return RecordCreateFromPattern(pattern, T, options);
}
__name(FromStringKey, "FromStringKey");
function FromIntegerKey(_, T, options) {
  return RecordCreateFromPattern(PatternNumberExact, T, options);
}
__name(FromIntegerKey, "FromIntegerKey");
function FromNumberKey(_, T, options) {
  return RecordCreateFromPattern(PatternNumberExact, T, options);
}
__name(FromNumberKey, "FromNumberKey");
function Record(K, T, options = {}) {
  return IsUnion(K) ? FromUnionKey(K.anyOf, T, options) : IsTemplateLiteral(K) ? FromTemplateLiteralKey(K, T, options) : IsLiteral(K) ? FromLiteralKey(K.const, T, options) : IsInteger2(K) ? FromIntegerKey(K, T, options) : IsNumber3(K) ? FromNumberKey(K, T, options) : IsRegExp2(K) ? FromRegExpKey(K, T, options) : IsString3(K) ? FromStringKey(K, T, options) : Never(options);
}
__name(Record, "Record");

// node_modules/@sinclair/typebox/build/esm/type/recursive/index.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();

// node_modules/@sinclair/typebox/build/esm/type/recursive/recursive.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();
var Ordinal = 0;
function Recursive(callback, options = {}) {
  if (IsUndefined2(options.$id))
    options.$id = `T${Ordinal++}`;
  const thisType = callback({ [Kind]: "This", $ref: `${options.$id}` });
  thisType.$id = options.$id;
  return CloneType({ ...options, [Hint]: "Recursive", ...thisType });
}
__name(Recursive, "Recursive");

// node_modules/@sinclair/typebox/build/esm/type/ref/index.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();

// node_modules/@sinclair/typebox/build/esm/type/ref/ref.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();
function Ref(unresolved, options = {}) {
  if (IsString2(unresolved))
    return { ...options, [Kind]: "Ref", $ref: unresolved };
  if (IsUndefined2(unresolved.$id))
    throw new Error("Reference target type must specify an $id");
  return {
    ...options,
    [Kind]: "Ref",
    $ref: unresolved.$id
  };
}
__name(Ref, "Ref");

// node_modules/@sinclair/typebox/build/esm/type/regexp/index.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();

// node_modules/@sinclair/typebox/build/esm/type/regexp/regexp.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();
function RegExp2(unresolved, options = {}) {
  const expr = IsString2(unresolved) ? new globalThis.RegExp(unresolved) : unresolved;
  return { ...options, [Kind]: "RegExp", type: "RegExp", source: expr.source, flags: expr.flags };
}
__name(RegExp2, "RegExp");

// node_modules/@sinclair/typebox/build/esm/type/required/index.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();

// node_modules/@sinclair/typebox/build/esm/type/required/required-from-mapped-result.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();

// node_modules/@sinclair/typebox/build/esm/type/required/required.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();
function FromRest8(T) {
  return T.map((L) => RequiredResolve(L));
}
__name(FromRest8, "FromRest");
function FromProperties18(T) {
  const Acc = {};
  for (const K of globalThis.Object.getOwnPropertyNames(T))
    Acc[K] = Discard(T[K], [OptionalKind]);
  return Acc;
}
__name(FromProperties18, "FromProperties");
function RequiredResolve(T) {
  return IsIntersect(T) ? Intersect(FromRest8(T.allOf)) : IsUnion(T) ? Union(FromRest8(T.anyOf)) : IsObject3(T) ? Object2(FromProperties18(T.properties)) : Object2({});
}
__name(RequiredResolve, "RequiredResolve");
function Required(T, options = {}) {
  if (IsMappedResult(T)) {
    return RequiredFromMappedResult(T, options);
  } else {
    const D = Discard(T, [TransformKind, "$id", "required"]);
    const R = CloneType(RequiredResolve(T), options);
    return { ...D, ...R };
  }
}
__name(Required, "Required");

// node_modules/@sinclair/typebox/build/esm/type/required/required-from-mapped-result.mjs
function FromProperties19(P, options) {
  const Acc = {};
  for (const K2 of globalThis.Object.getOwnPropertyNames(P))
    Acc[K2] = Required(P[K2], options);
  return Acc;
}
__name(FromProperties19, "FromProperties");
function FromMappedResult12(R, options) {
  return FromProperties19(R.properties, options);
}
__name(FromMappedResult12, "FromMappedResult");
function RequiredFromMappedResult(R, options) {
  const P = FromMappedResult12(R, options);
  return MappedResult(P);
}
__name(RequiredFromMappedResult, "RequiredFromMappedResult");

// node_modules/@sinclair/typebox/build/esm/type/rest/index.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();

// node_modules/@sinclair/typebox/build/esm/type/rest/rest.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();
function RestResolve(T) {
  return IsIntersect(T) ? CloneRest(T.allOf) : IsUnion(T) ? CloneRest(T.anyOf) : IsTuple(T) ? CloneRest(T.items ?? []) : [];
}
__name(RestResolve, "RestResolve");
function Rest(T) {
  return CloneRest(RestResolve(T));
}
__name(Rest, "Rest");

// node_modules/@sinclair/typebox/build/esm/type/return-type/index.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();

// node_modules/@sinclair/typebox/build/esm/type/return-type/return-type.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();
function ReturnType(schema, options = {}) {
  return CloneType(schema.returns, options);
}
__name(ReturnType, "ReturnType");

// node_modules/@sinclair/typebox/build/esm/type/schema/index.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();

// node_modules/@sinclair/typebox/build/esm/type/schema/anyschema.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();

// node_modules/@sinclair/typebox/build/esm/type/schema/schema.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();

// node_modules/@sinclair/typebox/build/esm/type/static/index.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();

// node_modules/@sinclair/typebox/build/esm/type/static/static.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();

// node_modules/@sinclair/typebox/build/esm/type/strict/index.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();

// node_modules/@sinclair/typebox/build/esm/type/strict/strict.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();
function Strict(schema) {
  return JSON.parse(JSON.stringify(schema));
}
__name(Strict, "Strict");

// node_modules/@sinclair/typebox/build/esm/type/transform/index.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();

// node_modules/@sinclair/typebox/build/esm/type/transform/transform.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();
var TransformDecodeBuilder = class {
  constructor(schema) {
    this.schema = schema;
  }
  Decode(decode) {
    return new TransformEncodeBuilder(this.schema, decode);
  }
};
__name(TransformDecodeBuilder, "TransformDecodeBuilder");
var TransformEncodeBuilder = class {
  constructor(schema, decode) {
    this.schema = schema;
    this.decode = decode;
  }
  EncodeTransform(encode, schema) {
    const Encode2 = /* @__PURE__ */ __name((value) => schema[TransformKind].Encode(encode(value)), "Encode");
    const Decode2 = /* @__PURE__ */ __name((value) => this.decode(schema[TransformKind].Decode(value)), "Decode");
    const Codec = { Encode: Encode2, Decode: Decode2 };
    return { ...schema, [TransformKind]: Codec };
  }
  EncodeSchema(encode, schema) {
    const Codec = { Decode: this.decode, Encode: encode };
    return { ...schema, [TransformKind]: Codec };
  }
  Encode(encode) {
    const schema = CloneType(this.schema);
    return IsTransform(schema) ? this.EncodeTransform(encode, schema) : this.EncodeSchema(encode, schema);
  }
};
__name(TransformEncodeBuilder, "TransformEncodeBuilder");
function Transform(schema) {
  return new TransformDecodeBuilder(schema);
}
__name(Transform, "Transform");

// node_modules/@sinclair/typebox/build/esm/type/void/index.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();

// node_modules/@sinclair/typebox/build/esm/type/void/void.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();
function Void(options = {}) {
  return {
    ...options,
    [Kind]: "Void",
    type: "void"
  };
}
__name(Void, "Void");

// node_modules/@sinclair/typebox/build/esm/type/type/index.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();

// node_modules/@sinclair/typebox/build/esm/type/type/json.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();

// node_modules/@sinclair/typebox/build/esm/type/type/type.mjs
var type_exports3 = {};
__export(type_exports3, {
  Any: () => Any,
  Array: () => Array2,
  AsyncIterator: () => AsyncIterator,
  Awaited: () => Awaited,
  BigInt: () => BigInt2,
  Boolean: () => Boolean2,
  Capitalize: () => Capitalize,
  Composite: () => Composite,
  Const: () => Const,
  Constructor: () => Constructor,
  ConstructorParameters: () => ConstructorParameters,
  Date: () => Date2,
  Deref: () => Deref2,
  Enum: () => Enum,
  Exclude: () => Exclude,
  Extends: () => Extends,
  Extract: () => Extract,
  Function: () => Function2,
  Index: () => Index,
  InstanceType: () => InstanceType,
  Integer: () => Integer,
  Intersect: () => Intersect,
  Iterator: () => Iterator,
  KeyOf: () => KeyOf,
  Literal: () => Literal,
  Lowercase: () => Lowercase,
  Mapped: () => Mapped,
  Never: () => Never,
  Not: () => Not2,
  Null: () => Null,
  Number: () => Number2,
  Object: () => Object2,
  Omit: () => Omit,
  Optional: () => Optional,
  Parameters: () => Parameters,
  Partial: () => Partial,
  Pick: () => Pick,
  Promise: () => Promise2,
  Readonly: () => Readonly,
  ReadonlyOptional: () => ReadonlyOptional,
  Record: () => Record,
  Recursive: () => Recursive,
  Ref: () => Ref,
  RegExp: () => RegExp2,
  Required: () => Required,
  Rest: () => Rest,
  ReturnType: () => ReturnType,
  Strict: () => Strict,
  String: () => String2,
  Symbol: () => Symbol2,
  TemplateLiteral: () => TemplateLiteral,
  Transform: () => Transform,
  Tuple: () => Tuple,
  Uint8Array: () => Uint8Array2,
  Uncapitalize: () => Uncapitalize,
  Undefined: () => Undefined,
  Union: () => Union,
  Unknown: () => Unknown,
  Unsafe: () => Unsafe,
  Uppercase: () => Uppercase,
  Void: () => Void
});
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();

// node_modules/@sinclair/typebox/build/esm/type/type/javascript.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();

// node_modules/@sinclair/typebox/build/esm/type/type/index.mjs
var Type = type_exports3;

// node_modules/@sinclair/typebox/build/esm/compiler/index.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();

// node_modules/@sinclair/typebox/build/esm/compiler/compiler.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();
var TypeCheck = class {
  constructor(schema, references, checkFunc, code) {
    this.schema = schema;
    this.references = references;
    this.checkFunc = checkFunc;
    this.code = code;
    this.hasTransform = HasTransform(schema, references);
  }
  /** Returns the generated assertion code used to validate this type. */
  Code() {
    return this.code;
  }
  /** Returns an iterator for each error in this value. */
  Errors(value) {
    return Errors(this.schema, this.references, value);
  }
  /** Returns true if the value matches the compiled type. */
  Check(value) {
    return this.checkFunc(value);
  }
  /** Decodes a value or throws if error */
  Decode(value) {
    if (!this.checkFunc(value))
      throw new TransformDecodeCheckError(this.schema, value, this.Errors(value).First());
    return this.hasTransform ? TransformDecode(this.schema, this.references, value) : value;
  }
  /** Encodes a value or throws if error */
  Encode(value) {
    const encoded = this.hasTransform ? TransformEncode(this.schema, this.references, value) : value;
    if (!this.checkFunc(encoded))
      throw new TransformEncodeCheckError(this.schema, value, this.Errors(value).First());
    return encoded;
  }
};
__name(TypeCheck, "TypeCheck");
var Character;
(function(Character2) {
  function DollarSign(code) {
    return code === 36;
  }
  __name(DollarSign, "DollarSign");
  Character2.DollarSign = DollarSign;
  function IsUnderscore(code) {
    return code === 95;
  }
  __name(IsUnderscore, "IsUnderscore");
  Character2.IsUnderscore = IsUnderscore;
  function IsAlpha(code) {
    return code >= 65 && code <= 90 || code >= 97 && code <= 122;
  }
  __name(IsAlpha, "IsAlpha");
  Character2.IsAlpha = IsAlpha;
  function IsNumeric(code) {
    return code >= 48 && code <= 57;
  }
  __name(IsNumeric, "IsNumeric");
  Character2.IsNumeric = IsNumeric;
})(Character || (Character = {}));
var MemberExpression;
(function(MemberExpression2) {
  function IsFirstCharacterNumeric(value) {
    if (value.length === 0)
      return false;
    return Character.IsNumeric(value.charCodeAt(0));
  }
  __name(IsFirstCharacterNumeric, "IsFirstCharacterNumeric");
  function IsAccessor(value) {
    if (IsFirstCharacterNumeric(value))
      return false;
    for (let i = 0; i < value.length; i++) {
      const code = value.charCodeAt(i);
      const check = Character.IsAlpha(code) || Character.IsNumeric(code) || Character.DollarSign(code) || Character.IsUnderscore(code);
      if (!check)
        return false;
    }
    return true;
  }
  __name(IsAccessor, "IsAccessor");
  function EscapeHyphen(key) {
    return key.replace(/'/g, "\\'");
  }
  __name(EscapeHyphen, "EscapeHyphen");
  function Encode2(object, key) {
    return IsAccessor(key) ? `${object}.${key}` : `${object}['${EscapeHyphen(key)}']`;
  }
  __name(Encode2, "Encode");
  MemberExpression2.Encode = Encode2;
})(MemberExpression || (MemberExpression = {}));
var Identifier;
(function(Identifier2) {
  function Encode2($id) {
    const buffer = [];
    for (let i = 0; i < $id.length; i++) {
      const code = $id.charCodeAt(i);
      if (Character.IsNumeric(code) || Character.IsAlpha(code)) {
        buffer.push($id.charAt(i));
      } else {
        buffer.push(`_${code}_`);
      }
    }
    return buffer.join("").replace(/__/g, "_");
  }
  __name(Encode2, "Encode");
  Identifier2.Encode = Encode2;
})(Identifier || (Identifier = {}));
var LiteralString;
(function(LiteralString2) {
  function Escape3(content) {
    return content.replace(/'/g, "\\'");
  }
  __name(Escape3, "Escape");
  LiteralString2.Escape = Escape3;
})(LiteralString || (LiteralString = {}));
var TypeCompilerUnknownTypeError = class extends TypeBoxError {
  constructor(schema) {
    super("Unknown type");
    this.schema = schema;
  }
};
__name(TypeCompilerUnknownTypeError, "TypeCompilerUnknownTypeError");
var TypeCompilerTypeGuardError = class extends TypeBoxError {
  constructor(schema) {
    super("Preflight validation check failed to guard for the given schema");
    this.schema = schema;
  }
};
__name(TypeCompilerTypeGuardError, "TypeCompilerTypeGuardError");
var Policy;
(function(Policy2) {
  function IsExactOptionalProperty(value, key, expression) {
    return TypeSystemPolicy.ExactOptionalPropertyTypes ? `('${key}' in ${value} ? ${expression} : true)` : `(${MemberExpression.Encode(value, key)} !== undefined ? ${expression} : true)`;
  }
  __name(IsExactOptionalProperty, "IsExactOptionalProperty");
  Policy2.IsExactOptionalProperty = IsExactOptionalProperty;
  function IsObjectLike(value) {
    return !TypeSystemPolicy.AllowArrayObject ? `(typeof ${value} === 'object' && ${value} !== null && !Array.isArray(${value}))` : `(typeof ${value} === 'object' && ${value} !== null)`;
  }
  __name(IsObjectLike, "IsObjectLike");
  Policy2.IsObjectLike = IsObjectLike;
  function IsRecordLike(value) {
    return !TypeSystemPolicy.AllowArrayObject ? `(typeof ${value} === 'object' && ${value} !== null && !Array.isArray(${value}) && !(${value} instanceof Date) && !(${value} instanceof Uint8Array))` : `(typeof ${value} === 'object' && ${value} !== null && !(${value} instanceof Date) && !(${value} instanceof Uint8Array))`;
  }
  __name(IsRecordLike, "IsRecordLike");
  Policy2.IsRecordLike = IsRecordLike;
  function IsNumberLike(value) {
    return TypeSystemPolicy.AllowNaN ? `typeof ${value} === 'number'` : `Number.isFinite(${value})`;
  }
  __name(IsNumberLike, "IsNumberLike");
  Policy2.IsNumberLike = IsNumberLike;
  function IsVoidLike(value) {
    return TypeSystemPolicy.AllowNullVoid ? `(${value} === undefined || ${value} === null)` : `${value} === undefined`;
  }
  __name(IsVoidLike, "IsVoidLike");
  Policy2.IsVoidLike = IsVoidLike;
})(Policy || (Policy = {}));
var TypeCompiler;
(function(TypeCompiler2) {
  function IsAnyOrUnknown2(schema) {
    return schema[Kind] === "Any" || schema[Kind] === "Unknown";
  }
  __name(IsAnyOrUnknown2, "IsAnyOrUnknown");
  function* FromAny5(schema, references, value) {
    yield "true";
  }
  __name(FromAny5, "FromAny");
  function* FromArray16(schema, references, value) {
    yield `Array.isArray(${value})`;
    const [parameter, accumulator] = [CreateParameter("value", "any"), CreateParameter("acc", "number")];
    if (IsNumber(schema.maxItems))
      yield `${value}.length <= ${schema.maxItems}`;
    if (IsNumber(schema.minItems))
      yield `${value}.length >= ${schema.minItems}`;
    const elementExpression = CreateExpression(schema.items, references, "value");
    yield `${value}.every((${parameter}) => ${elementExpression})`;
    if (IsSchema2(schema.contains) || IsNumber(schema.minContains) || IsNumber(schema.maxContains)) {
      const containsSchema = IsSchema2(schema.contains) ? schema.contains : Never();
      const checkExpression = CreateExpression(containsSchema, references, "value");
      const checkMinContains = IsNumber(schema.minContains) ? [`(count >= ${schema.minContains})`] : [];
      const checkMaxContains = IsNumber(schema.maxContains) ? [`(count <= ${schema.maxContains})`] : [];
      const checkCount = `const count = value.reduce((${accumulator}, ${parameter}) => ${checkExpression} ? acc + 1 : acc, 0)`;
      const check = [`(count > 0)`, ...checkMinContains, ...checkMaxContains].join(" && ");
      yield `((${parameter}) => { ${checkCount}; return ${check}})(${value})`;
    }
    if (schema.uniqueItems === true) {
      const check = `const hashed = hash(element); if(set.has(hashed)) { return false } else { set.add(hashed) } } return true`;
      const block = `const set = new Set(); for(const element of value) { ${check} }`;
      yield `((${parameter}) => { ${block} )(${value})`;
    }
  }
  __name(FromArray16, "FromArray");
  function* FromAsyncIterator7(schema, references, value) {
    yield `(typeof value === 'object' && Symbol.asyncIterator in ${value})`;
  }
  __name(FromAsyncIterator7, "FromAsyncIterator");
  function* FromBigInt6(schema, references, value) {
    yield `(typeof ${value} === 'bigint')`;
    if (IsBigInt(schema.exclusiveMaximum))
      yield `${value} < BigInt(${schema.exclusiveMaximum})`;
    if (IsBigInt(schema.exclusiveMinimum))
      yield `${value} > BigInt(${schema.exclusiveMinimum})`;
    if (IsBigInt(schema.maximum))
      yield `${value} <= BigInt(${schema.maximum})`;
    if (IsBigInt(schema.minimum))
      yield `${value} >= BigInt(${schema.minimum})`;
    if (IsBigInt(schema.multipleOf))
      yield `(${value} % BigInt(${schema.multipleOf})) === 0`;
  }
  __name(FromBigInt6, "FromBigInt");
  function* FromBoolean6(schema, references, value) {
    yield `(typeof ${value} === 'boolean')`;
  }
  __name(FromBoolean6, "FromBoolean");
  function* FromConstructor8(schema, references, value) {
    yield* Visit17(schema.returns, references, `${value}.prototype`);
  }
  __name(FromConstructor8, "FromConstructor");
  function* FromDate6(schema, references, value) {
    yield `(${value} instanceof Date) && Number.isFinite(${value}.getTime())`;
    if (IsNumber(schema.exclusiveMaximumTimestamp))
      yield `${value}.getTime() < ${schema.exclusiveMaximumTimestamp}`;
    if (IsNumber(schema.exclusiveMinimumTimestamp))
      yield `${value}.getTime() > ${schema.exclusiveMinimumTimestamp}`;
    if (IsNumber(schema.maximumTimestamp))
      yield `${value}.getTime() <= ${schema.maximumTimestamp}`;
    if (IsNumber(schema.minimumTimestamp))
      yield `${value}.getTime() >= ${schema.minimumTimestamp}`;
    if (IsNumber(schema.multipleOfTimestamp))
      yield `(${value}.getTime() % ${schema.multipleOfTimestamp}) === 0`;
  }
  __name(FromDate6, "FromDate");
  function* FromFunction7(schema, references, value) {
    yield `(typeof ${value} === 'function')`;
  }
  __name(FromFunction7, "FromFunction");
  function* FromInteger6(schema, references, value) {
    yield `Number.isInteger(${value})`;
    if (IsNumber(schema.exclusiveMaximum))
      yield `${value} < ${schema.exclusiveMaximum}`;
    if (IsNumber(schema.exclusiveMinimum))
      yield `${value} > ${schema.exclusiveMinimum}`;
    if (IsNumber(schema.maximum))
      yield `${value} <= ${schema.maximum}`;
    if (IsNumber(schema.minimum))
      yield `${value} >= ${schema.minimum}`;
    if (IsNumber(schema.multipleOf))
      yield `(${value} % ${schema.multipleOf}) === 0`;
  }
  __name(FromInteger6, "FromInteger");
  function* FromIntersect18(schema, references, value) {
    const check1 = schema.allOf.map((schema2) => CreateExpression(schema2, references, value)).join(" && ");
    if (schema.unevaluatedProperties === false) {
      const keyCheck = CreateVariable(`${new RegExp(KeyOfPattern(schema))};`);
      const check2 = `Object.getOwnPropertyNames(${value}).every(key => ${keyCheck}.test(key))`;
      yield `(${check1} && ${check2})`;
    } else if (IsSchema2(schema.unevaluatedProperties)) {
      const keyCheck = CreateVariable(`${new RegExp(KeyOfPattern(schema))};`);
      const check2 = `Object.getOwnPropertyNames(${value}).every(key => ${keyCheck}.test(key) || ${CreateExpression(schema.unevaluatedProperties, references, `${value}[key]`)})`;
      yield `(${check1} && ${check2})`;
    } else {
      yield `(${check1})`;
    }
  }
  __name(FromIntersect18, "FromIntersect");
  function* FromIterator7(schema, references, value) {
    yield `(typeof value === 'object' && Symbol.iterator in ${value})`;
  }
  __name(FromIterator7, "FromIterator");
  function* FromLiteral7(schema, references, value) {
    if (typeof schema.const === "number" || typeof schema.const === "boolean") {
      yield `(${value} === ${schema.const})`;
    } else {
      yield `(${value} === '${LiteralString.Escape(schema.const)}')`;
    }
  }
  __name(FromLiteral7, "FromLiteral");
  function* FromNever6(schema, references, value) {
    yield `false`;
  }
  __name(FromNever6, "FromNever");
  function* FromNot8(schema, references, value) {
    const expression = CreateExpression(schema.not, references, value);
    yield `(!${expression})`;
  }
  __name(FromNot8, "FromNot");
  function* FromNull6(schema, references, value) {
    yield `(${value} === null)`;
  }
  __name(FromNull6, "FromNull");
  function* FromNumber6(schema, references, value) {
    yield Policy.IsNumberLike(value);
    if (IsNumber(schema.exclusiveMaximum))
      yield `${value} < ${schema.exclusiveMaximum}`;
    if (IsNumber(schema.exclusiveMinimum))
      yield `${value} > ${schema.exclusiveMinimum}`;
    if (IsNumber(schema.maximum))
      yield `${value} <= ${schema.maximum}`;
    if (IsNumber(schema.minimum))
      yield `${value} >= ${schema.minimum}`;
    if (IsNumber(schema.multipleOf))
      yield `(${value} % ${schema.multipleOf}) === 0`;
  }
  __name(FromNumber6, "FromNumber");
  function* FromObject13(schema, references, value) {
    yield Policy.IsObjectLike(value);
    if (IsNumber(schema.minProperties))
      yield `Object.getOwnPropertyNames(${value}).length >= ${schema.minProperties}`;
    if (IsNumber(schema.maxProperties))
      yield `Object.getOwnPropertyNames(${value}).length <= ${schema.maxProperties}`;
    const knownKeys = Object.getOwnPropertyNames(schema.properties);
    for (const knownKey of knownKeys) {
      const memberExpression = MemberExpression.Encode(value, knownKey);
      const property = schema.properties[knownKey];
      if (schema.required && schema.required.includes(knownKey)) {
        yield* Visit17(property, references, memberExpression);
        if (ExtendsUndefinedCheck(property) || IsAnyOrUnknown2(property))
          yield `('${knownKey}' in ${value})`;
      } else {
        const expression = CreateExpression(property, references, memberExpression);
        yield Policy.IsExactOptionalProperty(value, knownKey, expression);
      }
    }
    if (schema.additionalProperties === false) {
      if (schema.required && schema.required.length === knownKeys.length) {
        yield `Object.getOwnPropertyNames(${value}).length === ${knownKeys.length}`;
      } else {
        const keys = `[${knownKeys.map((key) => `'${key}'`).join(", ")}]`;
        yield `Object.getOwnPropertyNames(${value}).every(key => ${keys}.includes(key))`;
      }
    }
    if (typeof schema.additionalProperties === "object") {
      const expression = CreateExpression(schema.additionalProperties, references, `${value}[key]`);
      const keys = `[${knownKeys.map((key) => `'${key}'`).join(", ")}]`;
      yield `(Object.getOwnPropertyNames(${value}).every(key => ${keys}.includes(key) || ${expression}))`;
    }
  }
  __name(FromObject13, "FromObject");
  function* FromPromise8(schema, references, value) {
    yield `(typeof value === 'object' && typeof ${value}.then === 'function')`;
  }
  __name(FromPromise8, "FromPromise");
  function* FromRecord12(schema, references, value) {
    yield Policy.IsRecordLike(value);
    if (IsNumber(schema.minProperties))
      yield `Object.getOwnPropertyNames(${value}).length >= ${schema.minProperties}`;
    if (IsNumber(schema.maxProperties))
      yield `Object.getOwnPropertyNames(${value}).length <= ${schema.maxProperties}`;
    const [patternKey, patternSchema] = Object.entries(schema.patternProperties)[0];
    const variable = CreateVariable(`${new RegExp(patternKey)}`);
    const check1 = CreateExpression(patternSchema, references, "value");
    const check2 = IsSchema2(schema.additionalProperties) ? CreateExpression(schema.additionalProperties, references, value) : schema.additionalProperties === false ? "false" : "true";
    const expression = `(${variable}.test(key) ? ${check1} : ${check2})`;
    yield `(Object.entries(${value}).every(([key, value]) => ${expression}))`;
  }
  __name(FromRecord12, "FromRecord");
  function* FromRef12(schema, references, value) {
    const target = Deref(schema, references);
    if (state.functions.has(schema.$ref))
      return yield `${CreateFunctionName(schema.$ref)}(${value})`;
    yield* Visit17(target, references, value);
  }
  __name(FromRef12, "FromRef");
  function* FromRegExp5(schema, references, value) {
    const variable = CreateVariable(`${new RegExp(schema.source, schema.flags)};`);
    yield `(typeof ${value} === 'string')`;
    if (IsNumber(schema.maxLength))
      yield `${value}.length <= ${schema.maxLength}`;
    if (IsNumber(schema.minLength))
      yield `${value}.length >= ${schema.minLength}`;
    yield `${variable}.test(${value})`;
  }
  __name(FromRegExp5, "FromRegExp");
  function* FromString6(schema, references, value) {
    yield `(typeof ${value} === 'string')`;
    if (IsNumber(schema.maxLength))
      yield `${value}.length <= ${schema.maxLength}`;
    if (IsNumber(schema.minLength))
      yield `${value}.length >= ${schema.minLength}`;
    if (schema.pattern !== void 0) {
      const variable = CreateVariable(`${new RegExp(schema.pattern)};`);
      yield `${variable}.test(${value})`;
    }
    if (schema.format !== void 0) {
      yield `format('${schema.format}', ${value})`;
    }
  }
  __name(FromString6, "FromString");
  function* FromSymbol6(schema, references, value) {
    yield `(typeof ${value} === 'symbol')`;
  }
  __name(FromSymbol6, "FromSymbol");
  function* FromTemplateLiteral7(schema, references, value) {
    yield `(typeof ${value} === 'string')`;
    const variable = CreateVariable(`${new RegExp(schema.pattern)};`);
    yield `${variable}.test(${value})`;
  }
  __name(FromTemplateLiteral7, "FromTemplateLiteral");
  function* FromThis11(schema, references, value) {
    yield `${CreateFunctionName(schema.$ref)}(${value})`;
  }
  __name(FromThis11, "FromThis");
  function* FromTuple15(schema, references, value) {
    yield `Array.isArray(${value})`;
    if (schema.items === void 0)
      return yield `${value}.length === 0`;
    yield `(${value}.length === ${schema.maxItems})`;
    for (let i = 0; i < schema.items.length; i++) {
      const expression = CreateExpression(schema.items[i], references, `${value}[${i}]`);
      yield `${expression}`;
    }
  }
  __name(FromTuple15, "FromTuple");
  function* FromUndefined6(schema, references, value) {
    yield `${value} === undefined`;
  }
  __name(FromUndefined6, "FromUndefined");
  function* FromUnion20(schema, references, value) {
    const expressions = schema.anyOf.map((schema2) => CreateExpression(schema2, references, value));
    yield `(${expressions.join(" || ")})`;
  }
  __name(FromUnion20, "FromUnion");
  function* FromUint8Array5(schema, references, value) {
    yield `${value} instanceof Uint8Array`;
    if (IsNumber(schema.maxByteLength))
      yield `(${value}.length <= ${schema.maxByteLength})`;
    if (IsNumber(schema.minByteLength))
      yield `(${value}.length >= ${schema.minByteLength})`;
  }
  __name(FromUint8Array5, "FromUint8Array");
  function* FromUnknown5(schema, references, value) {
    yield "true";
  }
  __name(FromUnknown5, "FromUnknown");
  function* FromVoid5(schema, references, value) {
    yield Policy.IsVoidLike(value);
  }
  __name(FromVoid5, "FromVoid");
  function* FromKind4(schema, references, value) {
    const instance = state.instances.size;
    state.instances.set(instance, schema);
    yield `kind('${schema[Kind]}', ${instance}, ${value})`;
  }
  __name(FromKind4, "FromKind");
  function* Visit17(schema, references, value, useHoisting = true) {
    const references_ = IsString(schema.$id) ? [...references, schema] : references;
    const schema_ = schema;
    if (useHoisting && IsString(schema.$id)) {
      const functionName = CreateFunctionName(schema.$id);
      if (state.functions.has(functionName)) {
        return yield `${functionName}(${value})`;
      } else {
        const functionCode = CreateFunction(functionName, schema, references, "value", false);
        state.functions.set(functionName, functionCode);
        return yield `${functionName}(${value})`;
      }
    }
    switch (schema_[Kind]) {
      case "Any":
        return yield* FromAny5(schema_, references_, value);
      case "Array":
        return yield* FromArray16(schema_, references_, value);
      case "AsyncIterator":
        return yield* FromAsyncIterator7(schema_, references_, value);
      case "BigInt":
        return yield* FromBigInt6(schema_, references_, value);
      case "Boolean":
        return yield* FromBoolean6(schema_, references_, value);
      case "Constructor":
        return yield* FromConstructor8(schema_, references_, value);
      case "Date":
        return yield* FromDate6(schema_, references_, value);
      case "Function":
        return yield* FromFunction7(schema_, references_, value);
      case "Integer":
        return yield* FromInteger6(schema_, references_, value);
      case "Intersect":
        return yield* FromIntersect18(schema_, references_, value);
      case "Iterator":
        return yield* FromIterator7(schema_, references_, value);
      case "Literal":
        return yield* FromLiteral7(schema_, references_, value);
      case "Never":
        return yield* FromNever6(schema_, references_, value);
      case "Not":
        return yield* FromNot8(schema_, references_, value);
      case "Null":
        return yield* FromNull6(schema_, references_, value);
      case "Number":
        return yield* FromNumber6(schema_, references_, value);
      case "Object":
        return yield* FromObject13(schema_, references_, value);
      case "Promise":
        return yield* FromPromise8(schema_, references_, value);
      case "Record":
        return yield* FromRecord12(schema_, references_, value);
      case "Ref":
        return yield* FromRef12(schema_, references_, value);
      case "RegExp":
        return yield* FromRegExp5(schema_, references_, value);
      case "String":
        return yield* FromString6(schema_, references_, value);
      case "Symbol":
        return yield* FromSymbol6(schema_, references_, value);
      case "TemplateLiteral":
        return yield* FromTemplateLiteral7(schema_, references_, value);
      case "This":
        return yield* FromThis11(schema_, references_, value);
      case "Tuple":
        return yield* FromTuple15(schema_, references_, value);
      case "Undefined":
        return yield* FromUndefined6(schema_, references_, value);
      case "Union":
        return yield* FromUnion20(schema_, references_, value);
      case "Uint8Array":
        return yield* FromUint8Array5(schema_, references_, value);
      case "Unknown":
        return yield* FromUnknown5(schema_, references_, value);
      case "Void":
        return yield* FromVoid5(schema_, references_, value);
      default:
        if (!type_exports.Has(schema_[Kind]))
          throw new TypeCompilerUnknownTypeError(schema);
        return yield* FromKind4(schema_, references_, value);
    }
  }
  __name(Visit17, "Visit");
  const state = {
    language: "javascript",
    // target language
    functions: /* @__PURE__ */ new Map(),
    // local functions
    variables: /* @__PURE__ */ new Map(),
    // local variables
    instances: /* @__PURE__ */ new Map()
    // exterior kind instances
  };
  function CreateExpression(schema, references, value, useHoisting = true) {
    return `(${[...Visit17(schema, references, value, useHoisting)].join(" && ")})`;
  }
  __name(CreateExpression, "CreateExpression");
  function CreateFunctionName($id) {
    return `check_${Identifier.Encode($id)}`;
  }
  __name(CreateFunctionName, "CreateFunctionName");
  function CreateVariable(expression) {
    const variableName = `local_${state.variables.size}`;
    state.variables.set(variableName, `const ${variableName} = ${expression}`);
    return variableName;
  }
  __name(CreateVariable, "CreateVariable");
  function CreateFunction(name, schema, references, value, useHoisting = true) {
    const [newline, pad] = ["\n", (length) => "".padStart(length, " ")];
    const parameter = CreateParameter("value", "any");
    const returns = CreateReturns("boolean");
    const expression = [...Visit17(schema, references, value, useHoisting)].map((expression2) => `${pad(4)}${expression2}`).join(` &&${newline}`);
    return `function ${name}(${parameter})${returns} {${newline}${pad(2)}return (${newline}${expression}${newline}${pad(2)})
}`;
  }
  __name(CreateFunction, "CreateFunction");
  function CreateParameter(name, type) {
    const annotation = state.language === "typescript" ? `: ${type}` : "";
    return `${name}${annotation}`;
  }
  __name(CreateParameter, "CreateParameter");
  function CreateReturns(type) {
    return state.language === "typescript" ? `: ${type}` : "";
  }
  __name(CreateReturns, "CreateReturns");
  function Build(schema, references, options) {
    const functionCode = CreateFunction("check", schema, references, "value");
    const parameter = CreateParameter("value", "any");
    const returns = CreateReturns("boolean");
    const functions = [...state.functions.values()];
    const variables = [...state.variables.values()];
    const checkFunction = IsString(schema.$id) ? `return function check(${parameter})${returns} {
  return ${CreateFunctionName(schema.$id)}(value)
}` : `return ${functionCode}`;
    return [...variables, ...functions, checkFunction].join("\n");
  }
  __name(Build, "Build");
  function Code(...args) {
    const defaults = { language: "javascript" };
    const [schema, references, options] = args.length === 2 && IsArray(args[1]) ? [args[0], args[1], defaults] : args.length === 2 && !IsArray(args[1]) ? [args[0], [], args[1]] : args.length === 3 ? [args[0], args[1], args[2]] : args.length === 1 ? [args[0], [], defaults] : [null, [], defaults];
    state.language = options.language;
    state.variables.clear();
    state.functions.clear();
    state.instances.clear();
    if (!IsSchema2(schema))
      throw new TypeCompilerTypeGuardError(schema);
    for (const schema2 of references)
      if (!IsSchema2(schema2))
        throw new TypeCompilerTypeGuardError(schema2);
    return Build(schema, references, options);
  }
  __name(Code, "Code");
  TypeCompiler2.Code = Code;
  function Compile(schema, references = []) {
    const generatedCode = Code(schema, references, { language: "javascript" });
    const compiledFunction = globalThis.Function("kind", "format", "hash", generatedCode);
    const instances = new Map(state.instances);
    function typeRegistryFunction(kind, instance, value) {
      if (!type_exports.Has(kind) || !instances.has(instance))
        return false;
      const checkFunc = type_exports.Get(kind);
      const schema2 = instances.get(instance);
      return checkFunc(schema2, value);
    }
    __name(typeRegistryFunction, "typeRegistryFunction");
    function formatRegistryFunction(format2, value) {
      if (!format_exports.Has(format2))
        return false;
      const checkFunc = format_exports.Get(format2);
      return checkFunc(value);
    }
    __name(formatRegistryFunction, "formatRegistryFunction");
    function hashFunction(value) {
      return Hash(value);
    }
    __name(hashFunction, "hashFunction");
    const checkFunction = compiledFunction(typeRegistryFunction, formatRegistryFunction, hashFunction);
    return new TypeCheck(schema, references, checkFunction, generatedCode);
  }
  __name(Compile, "Compile");
  TypeCompiler2.Compile = Compile;
})(TypeCompiler || (TypeCompiler = {}));

// node_modules/elysia/dist/index.mjs
var import_cookie = __toESM(require_dist(), 1);
var import_cookie2 = __toESM(require_dist(), 1);
var import_fast_decode_uri_component = __toESM(require_fast_decode_uri_component(), 1);
var import_fast_decode_uri_component2 = __toESM(require_fast_decode_uri_component(), 1);
var import_fast_decode_uri_component3 = __toESM(require_fast_decode_uri_component(), 1);
var createNode = /* @__PURE__ */ __name((part, inert) => {
  const inertMap = inert?.length ? {} : null;
  if (inertMap)
    for (const child of inert)
      inertMap[child.part.charCodeAt(0)] = child;
  return {
    part,
    store: null,
    inert: inertMap,
    params: null,
    wildcardStore: null
  };
}, "createNode");
var cloneNode = /* @__PURE__ */ __name((node, part) => ({
  ...node,
  part
}), "cloneNode");
var createParamNode = /* @__PURE__ */ __name((name) => ({
  name,
  store: null,
  inert: null
}), "createParamNode");
var _a;
var Memoirist = (/* @__PURE__ */ __name(_a = class {
  root = {};
  history = [];
  add(method, path2, store, {
    ignoreError = false,
    ignoreHistory = false
  } = {}) {
    if (typeof path2 !== "string")
      throw new TypeError("Route path must be a string");
    if (path2 === "")
      path2 = "/";
    else if (path2[0] !== "/")
      path2 = `/${path2}`;
    const isWildcard = path2[path2.length - 1] === "*";
    const optionalParams = path2.match(_a.regex.optionalParams);
    if (optionalParams) {
      const originalPath = path2.replaceAll("?", "");
      this.add(method, originalPath, store, {
        ignoreError
      });
      for (let i = 0; i < optionalParams.length; i++) {
        let newPath = path2.replace("/" + optionalParams[i], "");
        this.add(method, newPath, store, {
          ignoreError: true
        });
      }
      return store;
    }
    if (optionalParams)
      path2 = path2.replaceAll("?", "");
    if (this.history.find(([m, p, s]) => m === method && p === path2))
      return store;
    if (isWildcard || optionalParams && path2.charCodeAt(path2.length - 1) === 63)
      path2 = path2.slice(0, -1);
    if (!ignoreHistory)
      this.history.push([method, path2, store]);
    const inertParts = path2.split(_a.regex.static);
    const paramParts = path2.match(_a.regex.params) || [];
    if (inertParts[inertParts.length - 1] === "")
      inertParts.pop();
    let node;
    if (!this.root[method])
      node = this.root[method] = createNode("/");
    else
      node = this.root[method];
    let paramPartsIndex = 0;
    for (let i = 0; i < inertParts.length; ++i) {
      let part = inertParts[i];
      if (i > 0) {
        const param = paramParts[paramPartsIndex++].slice(1);
        if (node.params === null)
          node.params = createParamNode(param);
        else if (node.params.name !== param) {
          if (ignoreError)
            return store;
          else
            throw new Error(
              `Cannot create route "${path2}" with parameter "${param}" because a route already exists with a different parameter name ("${node.params.name}") in the same location`
            );
        }
        const params = node.params;
        if (params.inert === null) {
          node = params.inert = createNode(part);
          continue;
        }
        node = params.inert;
      }
      for (let j = 0; ; ) {
        if (j === part.length) {
          if (j < node.part.length) {
            const childNode = cloneNode(node, node.part.slice(j));
            Object.assign(node, createNode(part, [childNode]));
          }
          break;
        }
        if (j === node.part.length) {
          if (node.inert === null)
            node.inert = {};
          const inert = node.inert[part.charCodeAt(j)];
          if (inert) {
            node = inert;
            part = part.slice(j);
            j = 0;
            continue;
          }
          const childNode = createNode(part.slice(j));
          node.inert[part.charCodeAt(j)] = childNode;
          node = childNode;
          break;
        }
        if (part[j] !== node.part[j]) {
          const existingChild = cloneNode(node, node.part.slice(j));
          const newChild = createNode(part.slice(j));
          Object.assign(
            node,
            createNode(node.part.slice(0, j), [
              existingChild,
              newChild
            ])
          );
          node = newChild;
          break;
        }
        ++j;
      }
    }
    if (paramPartsIndex < paramParts.length) {
      const param = paramParts[paramPartsIndex];
      const name = param.slice(1);
      if (node.params === null)
        node.params = createParamNode(name);
      else if (node.params.name !== name) {
        if (ignoreError)
          return store;
        else
          throw new Error(
            `Cannot create route "${path2}" with parameter "${name}" because a route already exists with a different parameter name ("${node.params.name}") in the same location`
          );
      }
      if (node.params.store === null)
        node.params.store = store;
      return node.params.store;
    }
    if (isWildcard) {
      if (node.wildcardStore === null)
        node.wildcardStore = store;
      return node.wildcardStore;
    }
    if (node.store === null)
      node.store = store;
    return node.store;
  }
  find(method, url) {
    const root = this.root[method];
    if (!root)
      return null;
    return matchRoute(url, url.length, root, 0);
  }
}, "_Memoirist"), __publicField(_a, "regex", {
  static: /:.+?(?=\/|$)/,
  params: /:.+?(?=\/|$)/g,
  optionalParams: /:.+?\?(?=\/|$)/g
}), _a);
var matchRoute = /* @__PURE__ */ __name((url, urlLength, node, startIndex) => {
  const part = node.part;
  const length = part.length;
  const endIndex = startIndex + length;
  if (length > 1) {
    if (endIndex > urlLength)
      return null;
    if (length < 15) {
      for (let i = 1, j = startIndex + 1; i < length; ++i, ++j)
        if (part.charCodeAt(i) !== url.charCodeAt(j))
          return null;
    } else if (url.slice(startIndex, endIndex) !== part)
      return null;
  }
  if (endIndex === urlLength) {
    if (node.store !== null)
      return {
        store: node.store,
        params: {}
      };
    if (node.wildcardStore !== null)
      return {
        store: node.wildcardStore,
        params: { "*": "" }
      };
    return null;
  }
  if (node.inert !== null) {
    const inert = node.inert[url.charCodeAt(endIndex)];
    if (inert !== void 0) {
      const route = matchRoute(url, urlLength, inert, endIndex);
      if (route !== null)
        return route;
    }
  }
  if (node.params !== null) {
    const { store, name, inert } = node.params;
    const slashIndex = url.indexOf("/", endIndex);
    if (slashIndex !== endIndex) {
      if (slashIndex === -1 || slashIndex >= urlLength) {
        if (store !== null) {
          const params = {};
          params[name] = url.substring(endIndex, urlLength);
          return {
            store,
            params
          };
        }
      } else if (inert !== null) {
        const route = matchRoute(url, urlLength, inert, slashIndex);
        if (route !== null) {
          route.params[name] = url.substring(endIndex, slashIndex);
          return route;
        }
      }
    }
  }
  if (node.wildcardStore !== null)
    return {
      store: node.wildcardStore,
      params: {
        "*": url.substring(endIndex, urlLength)
      }
    };
  return null;
}, "matchRoute");
var hasReturn = /* @__PURE__ */ __name((fn) => {
  const fnLiteral = typeof fn === "object" ? fn.fn.toString() : typeof fn === "string" ? fn.toString() : fn;
  const parenthesisEnd = fnLiteral.indexOf(")");
  if (fnLiteral.charCodeAt(parenthesisEnd + 2) === 61 && fnLiteral.charCodeAt(parenthesisEnd + 5) !== 123) {
    return true;
  }
  return fnLiteral.includes("return");
}, "hasReturn");
var separateFunction = /* @__PURE__ */ __name((code) => {
  if (code.startsWith("async"))
    code = code.slice(5);
  code = code.trimStart();
  let index = -1;
  if (code.charCodeAt(0) === 40) {
    index = code.indexOf("=>", code.indexOf(")"));
    if (index !== -1) {
      let bracketEndIndex = index;
      while (bracketEndIndex > 0)
        if (code.charCodeAt(--bracketEndIndex) === 41)
          break;
      let body = code.slice(index + 2);
      if (body.charCodeAt(0) === 32)
        body = body.trimStart();
      return [
        code.slice(1, bracketEndIndex),
        body,
        {
          isArrowReturn: body.charCodeAt(0) !== 123
        }
      ];
    }
  }
  if (code.startsWith("function")) {
    index = code.indexOf("(");
    const end = code.indexOf(")");
    return [
      code.slice(index + 1, end),
      code.slice(end + 2),
      {
        isArrowReturn: false
      }
    ];
  }
  const start = code.indexOf("(");
  if (start !== -1) {
    const sep2 = code.indexOf("\n", 2);
    const parameter = code.slice(0, sep2);
    const end = parameter.lastIndexOf(")") + 1;
    const body = code.slice(sep2 + 1);
    return [
      parameter.slice(start, end),
      "{" + body,
      {
        isArrowReturn: false
      }
    ];
  }
  const x = code.split("\n", 2);
  return [x[0], x[1], { isArrowReturn: false }];
}, "separateFunction");
var bracketPairRange = /* @__PURE__ */ __name((parameter) => {
  const start = parameter.indexOf("{");
  if (start === -1)
    return [-1, 0];
  let end = start + 1;
  let deep = 1;
  for (; end < parameter.length; end++) {
    const char = parameter.charCodeAt(end);
    if (char === 123)
      deep++;
    else if (char === 125)
      deep--;
    if (deep === 0)
      break;
  }
  if (deep !== 0)
    return [0, parameter.length];
  return [start, end + 1];
}, "bracketPairRange");
var bracketPairRangeReverse = /* @__PURE__ */ __name((parameter) => {
  const end = parameter.lastIndexOf("}");
  if (end === -1)
    return [-1, 0];
  let start = end - 1;
  let deep = 1;
  for (; start >= 0; start--) {
    const char = parameter.charCodeAt(start);
    if (char === 125)
      deep++;
    else if (char === 123)
      deep--;
    if (deep === 0)
      break;
  }
  if (deep !== 0)
    return [-1, 0];
  return [start, end + 1];
}, "bracketPairRangeReverse");
var removeColonAlias = /* @__PURE__ */ __name((parameter) => {
  while (true) {
    const start = parameter.indexOf(":");
    if (start === -1)
      break;
    let end = parameter.indexOf(",", start);
    if (end === -1)
      end = parameter.indexOf("}", start) - 1;
    if (end === -2)
      end = parameter.length;
    parameter = parameter.slice(0, start) + parameter.slice(end);
  }
  return parameter;
}, "removeColonAlias");
var retrieveRootParamters = /* @__PURE__ */ __name((parameter) => {
  let hasParenthesis = false;
  if (parameter.charCodeAt(0) === 40)
    parameter = parameter.slice(1, -1);
  if (parameter.charCodeAt(0) === 123) {
    hasParenthesis = true;
    parameter = parameter.slice(1, -1);
  }
  parameter = parameter.replace(/( |\t|\n)/g, "").trim();
  let parameters = [];
  while (true) {
    let [start, end] = bracketPairRange(parameter);
    if (start === -1)
      break;
    parameters.push(parameter.slice(0, start - 1));
    if (parameter.charCodeAt(end) === 44)
      end++;
    parameter = parameter.slice(end);
  }
  parameter = removeColonAlias(parameter);
  if (parameter)
    parameters = parameters.concat(parameter.split(","));
  const newParameters = [];
  for (const p of parameters) {
    if (p.indexOf(",") === -1) {
      newParameters.push(p);
      continue;
    }
    for (const q of p.split(","))
      newParameters.push(q.trim());
  }
  parameters = newParameters;
  return {
    hasParenthesis,
    parameters
  };
}, "retrieveRootParamters");
var findParameterReference = /* @__PURE__ */ __name((parameter, inference) => {
  const { parameters, hasParenthesis } = retrieveRootParamters(parameter);
  if (!inference.query && parameters.includes("query"))
    inference.query = true;
  if (!inference.headers && parameters.includes("headers"))
    inference.headers = true;
  if (!inference.body && parameters.includes("body"))
    inference.body = true;
  if (!inference.cookie && parameters.includes("cookie"))
    inference.cookie = true;
  if (!inference.set && parameters.includes("set"))
    inference.set = true;
  if (!inference.server && parameters.includes("server"))
    inference.server = true;
  if (hasParenthesis)
    return `{ ${parameters.join(", ")} }`;
  return parameters.join(", ");
}, "findParameterReference");
var findEndIndex = /* @__PURE__ */ __name((type, content, index) => {
  const newLineIndex = content.indexOf(type + "\n", index);
  const newTabIndex = content.indexOf(type + "	", index);
  const commaIndex = content.indexOf(type + ",", index);
  const semicolonIndex = content.indexOf(type + ";", index);
  const emptyIndex = content.indexOf(type + " ", index);
  return [newLineIndex, newTabIndex, commaIndex, semicolonIndex, emptyIndex].filter((i) => i > 0).sort((a, b) => a - b)[0] || -1;
}, "findEndIndex");
var findAlias = /* @__PURE__ */ __name((type, body, depth = 0) => {
  if (depth > 5)
    return [];
  const aliases = [];
  let content = body;
  while (true) {
    let index = findEndIndex(" = " + type, content);
    if (index === -1) {
      const lastIndex = content.indexOf(" = " + type);
      if (lastIndex + 3 + type.length !== content.length)
        break;
      index = lastIndex;
    }
    const part = content.slice(0, index);
    let variable = part.slice(part.lastIndexOf(" ") + 1);
    if (variable === "}") {
      const [start, end] = bracketPairRangeReverse(part);
      aliases.push(removeColonAlias(content.slice(start, end)));
      content = content.slice(index + 3 + type.length);
      continue;
    }
    while (variable.charCodeAt(0) === 44)
      variable = variable.slice(1);
    while (variable.charCodeAt(0) === 9)
      variable = variable.slice(1);
    if (!variable.includes("("))
      aliases.push(variable);
    content = content.slice(index + 3 + type.length);
  }
  for (const alias of aliases) {
    if (alias.charCodeAt(0) === 123)
      continue;
    const deepAlias = findAlias(alias, body);
    if (deepAlias.length > 0)
      aliases.push(...deepAlias);
  }
  return aliases;
}, "findAlias");
var extractMainParameter = /* @__PURE__ */ __name((parameter) => {
  if (!parameter)
    return;
  if (parameter.charCodeAt(0) !== 123)
    return parameter;
  parameter = parameter.slice(2, -2);
  const hasComma = parameter.includes(",");
  if (!hasComma) {
    if (parameter.includes("..."))
      return parameter.slice(parameter.indexOf("...") + 3);
    return;
  }
  const spreadIndex = parameter.indexOf("...");
  if (spreadIndex === -1)
    return;
  return parameter.slice(spreadIndex + 3).trimEnd();
}, "extractMainParameter");
var inferBodyReference = /* @__PURE__ */ __name((code, aliases, inference) => {
  const access = /* @__PURE__ */ __name((type, alias) => code.includes(alias + "." + type) || code.includes(alias + '["' + type + '"]') || code.includes(alias + "['" + type + "']"), "access");
  for (const alias of aliases) {
    if (!alias)
      continue;
    if (alias.charCodeAt(0) === 123) {
      const parameters = retrieveRootParamters(alias).parameters;
      if (!inference.query && parameters.includes("query"))
        inference.query = true;
      if (!inference.headers && parameters.includes("headers"))
        inference.headers = true;
      if (!inference.body && parameters.includes("body"))
        inference.body = true;
      if (!inference.cookie && parameters.includes("cookie"))
        inference.cookie = true;
      if (!inference.set && parameters.includes("set"))
        inference.set = true;
      if (!inference.query && parameters.includes("server"))
        inference.server = true;
      continue;
    }
    if (!inference.query && access("query", alias))
      inference.query = true;
    if (code.includes("return " + alias) || code.includes("return " + alias + ".query"))
      inference.query = true;
    if (!inference.headers && access("headers", alias))
      inference.headers = true;
    if (!inference.body && access("body", alias))
      inference.body = true;
    if (!inference.cookie && access("cookie", alias))
      inference.cookie = true;
    if (!inference.set && access("set", alias))
      inference.set = true;
    if (!inference.server && access("server", alias))
      inference.server = true;
    if (inference.query && inference.headers && inference.body && inference.cookie && inference.set && inference.server)
      break;
  }
  return aliases;
}, "inferBodyReference");
var isContextPassToFunction = /* @__PURE__ */ __name((context, body, inference) => {
  try {
    const captureFunction = new RegExp(`(?:\\w)\\((?:.*)?${context}`, "gs");
    captureFunction.test(body);
    const nextChar = body.charCodeAt(captureFunction.lastIndex);
    if (nextChar === 41 || nextChar === 44) {
      inference.query = true;
      inference.headers = true;
      inference.body = true;
      inference.cookie = true;
      inference.set = true;
      inference.server = true;
      return true;
    }
    return false;
  } catch (error2) {
    console.log(
      "[Sucrose] warning: unexpected isContextPassToFunction error, you may continue development as usual but please report the following to maintainers:"
    );
    console.log("--- body ---");
    console.log(body);
    console.log("--- context ---");
    console.log(context);
    return true;
  }
}, "isContextPassToFunction");
var sucrose = /* @__PURE__ */ __name((lifeCycle, inference = {
  query: false,
  headers: false,
  body: false,
  cookie: false,
  set: false,
  server: false
}) => {
  const events = [];
  if (lifeCycle.handler && typeof lifeCycle.handler === "function")
    events.push(lifeCycle.handler);
  if (lifeCycle.request?.length)
    events.push(...lifeCycle.request);
  if (lifeCycle.beforeHandle?.length)
    events.push(...lifeCycle.beforeHandle);
  if (lifeCycle.parse?.length)
    events.push(...lifeCycle.parse);
  if (lifeCycle.error?.length)
    events.push(...lifeCycle.error);
  if (lifeCycle.transform?.length)
    events.push(...lifeCycle.transform);
  if (lifeCycle.afterHandle?.length)
    events.push(...lifeCycle.afterHandle);
  if (lifeCycle.mapResponse?.length)
    events.push(...lifeCycle.mapResponse);
  if (lifeCycle.afterResponse?.length)
    events.push(...lifeCycle.afterResponse);
  for (const e of events) {
    if (!e)
      continue;
    const event = "fn" in e ? e.fn : e;
    const [parameter, body, { isArrowReturn }] = separateFunction(
      event.toString()
    );
    const rootParameters = findParameterReference(parameter, inference);
    const mainParameter = extractMainParameter(rootParameters);
    if (mainParameter) {
      const aliases = findAlias(mainParameter, body);
      aliases.splice(0, -1, mainParameter);
      if (!isContextPassToFunction(mainParameter, body, inference))
        inferBodyReference(body, aliases, inference);
      if (!inference.query && body.includes("return " + mainParameter + ".query"))
        inference.query = true;
    }
    if (inference.query && inference.headers && inference.body && inference.cookie && inference.set && inference.server)
      break;
  }
  return inference;
}, "sucrose");
var fullFormats = {
  // date: http://tools.ietf.org/html/rfc3339#section-5.6
  date,
  // date-time: http://tools.ietf.org/html/rfc3339#section-5.6
  time: getTime(true),
  "date-time": getDateTime(true),
  "iso-time": getTime(false),
  "iso-date-time": getDateTime(false),
  // duration: https://tools.ietf.org/html/rfc3339#appendix-A
  duration: /^P(?!$)((\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+S)?)?|(\d+W)?)$/,
  uri,
  "uri-reference": /^(?:[a-z][a-z0-9+\-.]*:)?(?:\/?\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:]|%[0-9a-f]{2})*@)?(?:\[(?:(?:(?:(?:[0-9a-f]{1,4}:){6}|::(?:[0-9a-f]{1,4}:){5}|(?:[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){4}|(?:(?:[0-9a-f]{1,4}:){0,1}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){3}|(?:(?:[0-9a-f]{1,4}:){0,2}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){2}|(?:(?:[0-9a-f]{1,4}:){0,3}[0-9a-f]{1,4})?::[0-9a-f]{1,4}:|(?:(?:[0-9a-f]{1,4}:){0,4}[0-9a-f]{1,4})?::)(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?))|(?:(?:[0-9a-f]{1,4}:){0,5}[0-9a-f]{1,4})?::[0-9a-f]{1,4}|(?:(?:[0-9a-f]{1,4}:){0,6}[0-9a-f]{1,4})?::)|[Vv][0-9a-f]+\.[a-z0-9\-._~!$&'()*+,;=:]+)\]|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)|(?:[a-z0-9\-._~!$&'"()*+,;=]|%[0-9a-f]{2})*)(?::\d*)?(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*|\/(?:(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*)?|(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*)?(?:\?(?:[a-z0-9\-._~!$&'"()*+,;=:@/?]|%[0-9a-f]{2})*)?(?:#(?:[a-z0-9\-._~!$&'"()*+,;=:@/?]|%[0-9a-f]{2})*)?$/i,
  // uri-template: https://tools.ietf.org/html/rfc6570
  "uri-template": /^(?:(?:[^\x00-\x20"'<>%\\^`{|}]|%[0-9a-f]{2})|\{[+#./;?&=,!@|]?(?:[a-z0-9_]|%[0-9a-f]{2})+(?::[1-9][0-9]{0,3}|\*)?(?:,(?:[a-z0-9_]|%[0-9a-f]{2})+(?::[1-9][0-9]{0,3}|\*)?)*\})*$/i,
  // For the source: https://gist.github.com/dperini/729294
  // For test cases: https://mathiasbynens.be/demo/url-regex
  url: /^(?:https?|ftp):\/\/(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u{00a1}-\u{ffff}]+-)*[a-z0-9\u{00a1}-\u{ffff}]+)(?:\.(?:[a-z0-9\u{00a1}-\u{ffff}]+-)*[a-z0-9\u{00a1}-\u{ffff}]+)*(?:\.(?:[a-z\u{00a1}-\u{ffff}]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?$/iu,
  email: /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i,
  hostname: /^(?=.{1,253}\.?$)[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[-0-9a-z]{0,61}[0-9a-z])?)*\.?$/i,
  // optimized https://www.safaribooksonline.com/library/view/regular-expressions-cookbook/9780596802837/ch07s16.html
  ipv4: /^(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)\.){3}(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)$/,
  ipv6: /^((([0-9a-f]{1,4}:){7}([0-9a-f]{1,4}|:))|(([0-9a-f]{1,4}:){6}(:[0-9a-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9a-f]{1,4}:){5}(((:[0-9a-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9a-f]{1,4}:){4}(((:[0-9a-f]{1,4}){1,3})|((:[0-9a-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){3}(((:[0-9a-f]{1,4}){1,4})|((:[0-9a-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){2}(((:[0-9a-f]{1,4}){1,5})|((:[0-9a-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){1}(((:[0-9a-f]{1,4}){1,6})|((:[0-9a-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9a-f]{1,4}){1,7})|((:[0-9a-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))$/i,
  regex,
  // uuid: http://tools.ietf.org/html/rfc4122
  uuid: /^(?:urn:uuid:)?[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/i,
  // JSON-pointer: https://tools.ietf.org/html/rfc6901
  // uri fragment: https://tools.ietf.org/html/rfc3986#appendix-A
  "json-pointer": /^(?:\/(?:[^~/]|~0|~1)*)*$/,
  "json-pointer-uri-fragment": /^#(?:\/(?:[a-z0-9_\-.!$&'()*+,;:=@]|%[0-9a-f]{2}|~0|~1)*)*$/i,
  // relative JSON-pointer: http://tools.ietf.org/html/draft-luff-relative-json-pointer-00
  "relative-json-pointer": /^(?:0|[1-9][0-9]*)(?:#|(?:\/(?:[^~/]|~0|~1)*)*)$/,
  // the following formats are used by the openapi specification: https://spec.openapis.org/oas/v3.0.0#data-types
  // byte: https://github.com/miguelmota/is-base64
  byte,
  // signed 32 bit integer
  int32: { type: "number", validate: validateInt32 },
  // signed 64 bit integer
  int64: { type: "number", validate: validateInt64 },
  // C-type float
  float: { type: "number", validate: validateNumber },
  // C-type double
  double: { type: "number", validate: validateNumber },
  // hint to the UI to hide input strings
  password: true,
  // unchecked string payload
  binary: true
};
function isLeapYear(year) {
  return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
}
__name(isLeapYear, "isLeapYear");
var DATE = /^(\d\d\d\d)-(\d\d)-(\d\d)$/;
var DAYS = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
function date(str) {
  const matches = DATE.exec(str);
  if (!matches)
    return false;
  const year = +matches[1];
  const month = +matches[2];
  const day = +matches[3];
  return month >= 1 && month <= 12 && day >= 1 && day <= (month === 2 && isLeapYear(year) ? 29 : DAYS[month]);
}
__name(date, "date");
var TIME = /^(\d\d):(\d\d):(\d\d(?:\.\d+)?)(z|([+-])(\d\d)(?::?(\d\d))?)?$/i;
function getTime(strictTimeZone) {
  return /* @__PURE__ */ __name(function time(str) {
    const matches = TIME.exec(str);
    if (!matches)
      return false;
    const hr = +matches[1];
    const min = +matches[2];
    const sec = +matches[3];
    const tz = matches[4];
    const tzSign = matches[5] === "-" ? -1 : 1;
    const tzH = +(matches[6] || 0);
    const tzM = +(matches[7] || 0);
    if (tzH > 23 || tzM > 59 || strictTimeZone && !tz)
      return false;
    if (hr <= 23 && min <= 59 && sec < 60)
      return true;
    const utcMin = min - tzM * tzSign;
    const utcHr = hr - tzH * tzSign - (utcMin < 0 ? 1 : 0);
    return (utcHr === 23 || utcHr === -1) && (utcMin === 59 || utcMin === -1) && sec < 61;
  }, "time");
}
__name(getTime, "getTime");
var DATE_TIME_SEPARATOR = /t|\s/i;
function getDateTime(strictTimeZone) {
  const time = getTime(strictTimeZone);
  return /* @__PURE__ */ __name(function date_time(str) {
    const dateTime = str.split(DATE_TIME_SEPARATOR);
    return dateTime.length === 2 && date(dateTime[0]) && time(dateTime[1]);
  }, "date_time");
}
__name(getDateTime, "getDateTime");
var NOT_URI_FRAGMENT = /\/|:/;
var URI = /^(?:[a-z][a-z0-9+\-.]*:)(?:\/?\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:]|%[0-9a-f]{2})*@)?(?:\[(?:(?:(?:(?:[0-9a-f]{1,4}:){6}|::(?:[0-9a-f]{1,4}:){5}|(?:[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){4}|(?:(?:[0-9a-f]{1,4}:){0,1}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){3}|(?:(?:[0-9a-f]{1,4}:){0,2}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){2}|(?:(?:[0-9a-f]{1,4}:){0,3}[0-9a-f]{1,4})?::[0-9a-f]{1,4}:|(?:(?:[0-9a-f]{1,4}:){0,4}[0-9a-f]{1,4})?::)(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?))|(?:(?:[0-9a-f]{1,4}:){0,5}[0-9a-f]{1,4})?::[0-9a-f]{1,4}|(?:(?:[0-9a-f]{1,4}:){0,6}[0-9a-f]{1,4})?::)|[Vv][0-9a-f]+\.[a-z0-9\-._~!$&'()*+,;=:]+)\]|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)|(?:[a-z0-9\-._~!$&'()*+,;=]|%[0-9a-f]{2})*)(?::\d*)?(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*|\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*)?|(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*)(?:\?(?:[a-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9a-f]{2})*)?(?:#(?:[a-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9a-f]{2})*)?$/i;
function uri(str) {
  return NOT_URI_FRAGMENT.test(str) && URI.test(str);
}
__name(uri, "uri");
var BYTE = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/gm;
function byte(str) {
  BYTE.lastIndex = 0;
  return BYTE.test(str);
}
__name(byte, "byte");
var MIN_INT32 = -(2 ** 31);
var MAX_INT32 = 2 ** 31 - 1;
function validateInt32(value) {
  return Number.isInteger(value) && value <= MAX_INT32 && value >= MIN_INT32;
}
__name(validateInt32, "validateInt32");
function validateInt64(value) {
  return Number.isInteger(value);
}
__name(validateInt64, "validateInt64");
function validateNumber() {
  return true;
}
__name(validateNumber, "validateNumber");
var Z_ANCHOR = /[^\\]\\Z/;
function regex(str) {
  if (Z_ANCHOR.test(str))
    return false;
  try {
    new RegExp(str);
    return true;
  } catch (e) {
    return false;
  }
}
__name(regex, "regex");
var isISO8601 = /(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))/;
var isFormalDate = /(?:Sun|Mon|Tue|Wed|Thu|Fri|Sat)\s(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s\d{2}\s\d{4}\s\d{2}:\d{2}:\d{2}\sGMT(?:\+|-)\d{4}\s\([^)]+\)/;
var isShortenDate = /^(?:(?:(?:(?:0?[1-9]|[12][0-9]|3[01])[/\s-](?:0?[1-9]|1[0-2])[/\s-](?:19|20)\d{2})|(?:(?:19|20)\d{2}[/\s-](?:0?[1-9]|1[0-2])[/\s-](?:0?[1-9]|[12][0-9]|3[01]))))(?:\s(?:1[012]|0?[1-9]):[0-5][0-9](?::[0-5][0-9])?(?:\s[AP]M)?)?$/;
var _validateDate = fullFormats.date;
var _validateDateTime = fullFormats["date-time"];
if (!format_exports.Has("date"))
  TypeSystem.Format("date", (value) => {
    const temp = value.replace(/"/g, "");
    if (isISO8601.test(temp) || isFormalDate.test(temp) || isShortenDate.test(temp) || _validateDate(temp)) {
      const date2 = new Date(temp);
      if (!Number.isNaN(date2.getTime()))
        return true;
    }
    return false;
  });
if (!format_exports.Has("date-time"))
  TypeSystem.Format("date-time", (value) => {
    const temp = value.replace(/"/g, "");
    if (isISO8601.test(temp) || isFormalDate.test(temp) || isShortenDate.test(temp) || _validateDateTime(temp)) {
      const date2 = new Date(temp);
      if (!Number.isNaN(date2.getTime()))
        return true;
    }
    return false;
  });
Object.entries(fullFormats).forEach((formatEntry) => {
  const [formatName, formatValue] = formatEntry;
  if (!format_exports.Has(formatName)) {
    if (formatValue instanceof RegExp)
      TypeSystem.Format(formatName, (value) => formatValue.test(value));
    else if (typeof formatValue === "function")
      TypeSystem.Format(formatName, formatValue);
  }
});
var t = Object.assign({}, Type);
var parseFileUnit = /* @__PURE__ */ __name((size) => {
  if (typeof size === "string")
    switch (size.slice(-1)) {
      case "k":
        return +size.slice(0, size.length - 1) * 1024;
      case "m":
        return +size.slice(0, size.length - 1) * 1048576;
      default:
        return +size;
    }
  return size;
}, "parseFileUnit");
var validateFile = /* @__PURE__ */ __name((options, value) => {
  if (!(value instanceof Blob))
    return false;
  if (options.minSize && value.size < parseFileUnit(options.minSize))
    return false;
  if (options.maxSize && value.size > parseFileUnit(options.maxSize))
    return false;
  if (options.extension)
    if (typeof options.extension === "string") {
      if (!value.type.startsWith(options.extension))
        return false;
    } else {
      for (let i = 0; i < options.extension.length; i++)
        if (value.type.startsWith(options.extension[i]))
          return true;
      return false;
    }
  return true;
}, "validateFile");
var File2 = type_exports.Get("Files") ?? TypeSystem.Type("File", validateFile);
var Files = type_exports.Get("Files") ?? TypeSystem.Type(
  "Files",
  (options, value) => {
    if (!Array.isArray(value))
      return validateFile(options, value);
    if (options.minItems && value.length < options.minItems)
      return false;
    if (options.maxItems && value.length > options.maxItems)
      return false;
    for (let i = 0; i < value.length; i++)
      if (!validateFile(options, value[i]))
        return false;
    return true;
  }
);
if (!format_exports.Has("numeric"))
  format_exports.Set("numeric", (value) => !!value && !isNaN(+value));
if (!format_exports.Has("boolean"))
  format_exports.Set(
    "boolean",
    (value) => value === "true" || value === "false"
  );
if (!format_exports.Has("ObjectString"))
  format_exports.Set("ObjectString", (value) => {
    let start = value.charCodeAt(0);
    if (start === 9 || start === 10 || start === 32)
      start = value.trimStart().charCodeAt(0);
    if (start !== 123 && start !== 91)
      return false;
    try {
      JSON.parse(value);
      return true;
    } catch {
      return false;
    }
  });
if (!format_exports.Has("ArrayString"))
  format_exports.Set("ArrayString", (value) => {
    let start = value.charCodeAt(0);
    if (start === 9 || start === 10 || start === 32)
      start = value.trimStart().charCodeAt(0);
    if (start !== 123 && start !== 91)
      return false;
    try {
      JSON.parse(value);
      return true;
    } catch {
      return false;
    }
  });
type_exports.Set("UnionEnum", (schema, value) => {
  return (typeof value === "number" || typeof value === "string" || value === null) && schema.enum.includes(value);
});
var ElysiaType = {
  Numeric: (property) => {
    const schema = Type.Number(property);
    return t.Transform(
      t.Union(
        [
          t.String({
            format: "numeric",
            default: 0
          }),
          t.Number(property)
        ],
        property
      )
    ).Decode((value) => {
      const number = +value;
      if (isNaN(number))
        return value;
      if (property && !value_exports2.Check(schema, number))
        throw new ValidationError("property", schema, number);
      return number;
    }).Encode((value) => value);
  },
  Date: (property) => {
    const schema = Type.Date(property);
    return t.Transform(
      t.Union(
        [
          Type.Date(property),
          t.String({
            format: "date",
            default: (/* @__PURE__ */ new Date()).toISOString()
          }),
          t.String({
            format: "date-time",
            default: (/* @__PURE__ */ new Date()).toISOString()
          }),
          t.Number()
        ],
        property
      )
    ).Decode((value) => {
      if (typeof value === "number") {
        const date3 = new Date(value);
        if (!value_exports2.Check(schema, date3))
          throw new ValidationError("property", schema, date3);
        return date3;
      }
      if (value instanceof Date)
        return value;
      const date2 = new Date(value);
      if (!value_exports2.Check(schema, date2))
        throw new ValidationError("property", schema, date2);
      return date2;
    }).Encode((value) => {
      if (typeof value === "string")
        return new Date(value);
      return value;
    });
  },
  BooleanString: (property) => {
    const schema = Type.Boolean(property);
    return t.Transform(
      t.Union(
        [
          t.Boolean(property),
          t.String({
            format: "boolean",
            default: false
          })
        ],
        property
      )
    ).Decode((value) => {
      if (typeof value === "string")
        return value === "true";
      if (value !== void 0 && !value_exports2.Check(schema, value))
        throw new ValidationError("property", schema, value);
      return value;
    }).Encode((value) => value);
  },
  ObjectString: (properties, options) => {
    const schema = t.Object(properties, options);
    const defaultValue = JSON.stringify(value_exports2.Create(schema));
    let compiler;
    try {
      compiler = TypeCompiler.Compile(schema);
    } catch {
    }
    return t.Transform(
      t.Union([
        t.String({
          format: "ObjectString",
          default: defaultValue
        }),
        schema
      ])
    ).Decode((value) => {
      if (typeof value === "string") {
        if (value.charCodeAt(0) !== 123)
          throw new ValidationError("property", schema, value);
        try {
          value = JSON.parse(value);
        } catch {
          throw new ValidationError("property", schema, value);
        }
        if (compiler) {
          if (!compiler.Check(value))
            throw new ValidationError("property", schema, value);
          return compiler.Decode(value);
        }
        if (!value_exports2.Check(schema, value))
          throw new ValidationError("property", schema, value);
        return value_exports2.Decode(schema, value);
      }
      return value;
    }).Encode((value) => {
      if (typeof value === "string")
        try {
          value = JSON.parse(value);
        } catch {
          throw new ValidationError("property", schema, value);
        }
      if (!value_exports2.Check(schema, value))
        throw new ValidationError("property", schema, value);
      return JSON.stringify(value);
    });
  },
  ArrayString: (children = {}, options) => {
    const schema = t.Array(children, options);
    const defaultValue = JSON.stringify(value_exports2.Create(schema));
    let compiler;
    try {
      compiler = TypeCompiler.Compile(schema);
    } catch {
    }
    return t.Transform(
      t.Union([
        t.String({
          format: "ArrayString",
          default: defaultValue
        }),
        schema
      ])
    ).Decode((value) => {
      if (typeof value === "string") {
        if (value.charCodeAt(0) !== 91)
          throw new ValidationError("property", schema, value);
        try {
          value = JSON.parse(value);
        } catch {
          throw new ValidationError("property", schema, value);
        }
        if (compiler) {
          if (!compiler.Check(value))
            throw new ValidationError("property", schema, value);
          return compiler.Decode(value);
        }
        if (!value_exports2.Check(schema, value))
          throw new ValidationError("property", schema, value);
        return value_exports2.Decode(schema, value);
      }
      return value;
    }).Encode((value) => {
      if (typeof value === "string")
        try {
          value = JSON.parse(value);
        } catch {
          throw new ValidationError("property", schema, value);
        }
      if (!value_exports2.Check(schema, value))
        throw new ValidationError("property", schema, value);
      return JSON.stringify(value);
    });
  },
  File: File2,
  Files: (options = {}) => t.Transform(Files(options)).Decode((value) => {
    if (Array.isArray(value))
      return value;
    return [value];
  }).Encode((value) => value),
  Nullable: (schema) => t.Union([schema, t.Null()]),
  /**
   * Allow Optional, Nullable and Undefined
   */
  MaybeEmpty: (schema) => t.Union([schema, t.Null(), t.Undefined()]),
  Cookie: (properties, {
    domain,
    expires,
    httpOnly,
    maxAge,
    path: path2,
    priority,
    sameSite,
    secure,
    secrets,
    sign,
    ...options
  } = {}) => {
    const v = t.Object(properties, options);
    v.config = {
      domain,
      expires,
      httpOnly,
      maxAge,
      path: path2,
      priority,
      sameSite,
      secure,
      secrets,
      sign
    };
    return v;
  },
  // based on https://github.com/elysiajs/elysia/issues/512#issuecomment-1980134955
  UnionEnum: (values, options = {}) => {
    const type = values.every((value) => typeof value === "string") ? { type: "string" } : values.every((value) => typeof value === "number") ? { type: "number" } : values.every((value) => value === null) ? { type: "null" } : {};
    if (values.some((x) => typeof x === "object" && x !== null))
      throw new Error("This type does not support objects or arrays");
    return {
      // why it need default??
      default: values[0],
      ...options,
      [Kind]: "UnionEnum",
      ...type,
      enum: values
    };
  }
};
t.BooleanString = ElysiaType.BooleanString;
t.ObjectString = ElysiaType.ObjectString;
t.ArrayString = ElysiaType.ArrayString;
t.Numeric = ElysiaType.Numeric;
t.File = (arg = {}) => ElysiaType.File({
  default: "File",
  ...arg,
  extension: arg?.type,
  type: "string",
  format: "binary"
});
t.Files = (arg = {}) => ElysiaType.Files({
  ...arg,
  elysiaMeta: "Files",
  default: "Files",
  extension: arg?.type,
  type: "array",
  items: {
    ...arg,
    default: "Files",
    type: "string",
    format: "binary"
  }
});
t.Nullable = (schema) => ElysiaType.Nullable(schema);
t.MaybeEmpty = ElysiaType.MaybeEmpty;
t.Cookie = ElysiaType.Cookie;
t.Date = ElysiaType.Date;
t.UnionEnum = ElysiaType.UnionEnum;
var Cookie = /* @__PURE__ */ __name(class {
  constructor(name, jar, initial = {}) {
    this.name = name;
    this.jar = jar;
    this.initial = initial;
  }
  get cookie() {
    return this.jar[this.name] ?? this.initial;
  }
  set cookie(jar) {
    if (!(this.name in this.jar))
      this.jar[this.name] = this.initial;
    this.jar[this.name] = jar;
  }
  get setCookie() {
    if (!(this.name in this.jar))
      this.jar[this.name] = this.initial;
    return this.jar[this.name];
  }
  set setCookie(jar) {
    this.cookie = jar;
  }
  get value() {
    return this.cookie.value;
  }
  set value(value) {
    this.setCookie.value = value;
  }
  get expires() {
    return this.cookie.expires;
  }
  set expires(expires) {
    this.setCookie.expires = expires;
  }
  get maxAge() {
    return this.cookie.maxAge;
  }
  set maxAge(maxAge) {
    this.setCookie.maxAge = maxAge;
  }
  get domain() {
    return this.cookie.domain;
  }
  set domain(domain) {
    this.setCookie.domain = domain;
  }
  get path() {
    return this.cookie.path;
  }
  set path(path2) {
    this.setCookie.path = path2;
  }
  get secure() {
    return this.cookie.secure;
  }
  set secure(secure) {
    this.setCookie.secure = secure;
  }
  get httpOnly() {
    return this.cookie.httpOnly;
  }
  set httpOnly(httpOnly) {
    this.setCookie.httpOnly = httpOnly;
  }
  get sameSite() {
    return this.cookie.sameSite;
  }
  set sameSite(sameSite) {
    this.setCookie.sameSite = sameSite;
  }
  get priority() {
    return this.cookie.priority;
  }
  set priority(priority) {
    this.setCookie.priority = priority;
  }
  get partitioned() {
    return this.cookie.partitioned;
  }
  set partitioned(partitioned) {
    this.setCookie.partitioned = partitioned;
  }
  get secrets() {
    return this.cookie.secrets;
  }
  set secrets(secrets) {
    this.setCookie.secrets = secrets;
  }
  update(config2) {
    this.setCookie = Object.assign(
      this.cookie,
      typeof config2 === "function" ? config2(this.cookie) : config2
    );
    return this;
  }
  set(config2) {
    this.setCookie = Object.assign(
      {
        ...this.initial,
        value: this.value
      },
      typeof config2 === "function" ? config2(this.cookie) : config2
    );
    return this;
  }
  remove() {
    if (this.value === void 0)
      return;
    this.set({
      expires: /* @__PURE__ */ new Date(0),
      maxAge: 0,
      value: ""
    });
    return this;
  }
  toString() {
    return typeof this.value === "object" ? JSON.stringify(this.value) : this.value?.toString() ?? "";
  }
}, "Cookie");
var createCookieJar = /* @__PURE__ */ __name((set2, store, initial) => {
  if (!set2.cookie)
    set2.cookie = {};
  return new Proxy(store, {
    get(_, key) {
      if (key in store)
        return new Cookie(
          key,
          set2.cookie,
          Object.assign({}, initial ?? {}, store[key])
        );
      return new Cookie(
        key,
        set2.cookie,
        Object.assign({}, initial)
      );
    }
  });
}, "createCookieJar");
var parseCookie = /* @__PURE__ */ __name(async (set2, cookieString, {
  secrets,
  sign,
  ...initial
} = {}) => {
  if (!cookieString)
    return createCookieJar(set2, {}, initial);
  const isStringKey = typeof secrets === "string";
  if (sign && sign !== true && !Array.isArray(sign))
    sign = [sign];
  const jar = {};
  const cookies = (0, import_cookie2.parse)(cookieString);
  for (const [name, v] of Object.entries(cookies)) {
    let value = (0, import_fast_decode_uri_component.default)(v);
    if (sign === true || sign?.includes(name)) {
      if (!secrets)
        throw new Error("No secret is provided to cookie plugin");
      if (isStringKey) {
        const temp = await unsignCookie(value, secrets);
        if (temp === false)
          throw new InvalidCookieSignature(name);
        value = temp;
      } else {
        let decoded = true;
        for (let i = 0; i < secrets.length; i++) {
          const temp = await unsignCookie(value, secrets[i]);
          if (temp !== false) {
            decoded = true;
            value = temp;
            break;
          }
        }
        if (!decoded)
          throw new InvalidCookieSignature(name);
      }
    }
    jar[name] = {
      value
    };
  }
  return createCookieJar(set2, jar, initial);
}, "parseCookie");
var hasHeaderShorthand = "toJSON" in new Headers();
var isNotEmpty = /* @__PURE__ */ __name((obj) => {
  if (!obj)
    return false;
  for (const x in obj)
    return true;
  return false;
}, "isNotEmpty");
var handleFile = /* @__PURE__ */ __name((response, set2) => {
  const size = response.size;
  if (!set2 && size || size && set2 && set2.status !== 206 && set2.status !== 304 && set2.status !== 412 && set2.status !== 416) {
    if (set2 && isNotEmpty(set2.headers)) {
      if (set2.headers instanceof Headers) {
        if (hasHeaderShorthand)
          set2.headers = set2.headers.toJSON();
        else
          for (const [key, value] of set2.headers.entries())
            if (key in set2.headers)
              set2.headers[key] = value;
      }
      return new Response(response, {
        status: set2.status,
        headers: Object.assign(
          {
            "accept-ranges": "bytes",
            "content-range": `bytes 0-${size - 1}/${size}`
          },
          set2.headers
        )
      });
    }
    return new Response(response, {
      headers: {
        "accept-ranges": "bytes",
        "content-range": `bytes 0-${size - 1}/${size}`,
        "transfer-encoding": "chunked"
      }
    });
  }
  return new Response(response);
}, "handleFile");
var parseSetCookies = /* @__PURE__ */ __name((headers, setCookie) => {
  if (!headers)
    return headers;
  headers.delete("set-cookie");
  for (let i = 0; i < setCookie.length; i++) {
    const index = setCookie[i].indexOf("=");
    headers.append(
      "set-cookie",
      `${setCookie[i].slice(0, index)}=${setCookie[i].slice(index + 1) || ""}`
    );
  }
  return headers;
}, "parseSetCookies");
var serializeCookie = /* @__PURE__ */ __name((cookies) => {
  if (!cookies || !isNotEmpty(cookies))
    return void 0;
  const set2 = [];
  for (const [key, property] of Object.entries(cookies)) {
    if (!key || !property)
      continue;
    const value = property.value;
    if (value === void 0 || value === null)
      continue;
    set2.push(
      (0, import_cookie.serialize)(
        key,
        typeof value === "object" ? JSON.stringify(value) : value + "",
        property
      )
    );
  }
  if (set2.length === 0)
    return void 0;
  if (set2.length === 1)
    return set2[0];
  return set2;
}, "serializeCookie");
var handleStream = /* @__PURE__ */ __name(async (generator, set2, request) => {
  let init2 = generator.next();
  if (init2 instanceof Promise)
    init2 = await init2;
  if (init2.done) {
    if (set2)
      return mapResponse(init2.value, set2, request);
    return mapCompactResponse(init2.value, request);
  }
  return new Response(
    new ReadableStream({
      async start(controller) {
        let end = false;
        request?.signal.addEventListener("abort", () => {
          end = true;
          try {
            controller.close();
          } catch {
          }
        });
        if (init2.value !== void 0 && init2.value !== null) {
          if (typeof init2.value === "object")
            try {
              controller.enqueue(
                Buffer2.from(JSON.stringify(init2.value))
              );
            } catch {
              controller.enqueue(
                Buffer2.from(init2.value.toString())
              );
            }
          else
            controller.enqueue(Buffer2.from(init2.value.toString()));
        }
        for await (const chunk of generator) {
          if (end)
            break;
          if (chunk === void 0 || chunk === null)
            continue;
          if (typeof chunk === "object")
            try {
              controller.enqueue(
                Buffer2.from(JSON.stringify(chunk))
              );
            } catch {
              controller.enqueue(Buffer2.from(chunk.toString()));
            }
          else
            controller.enqueue(Buffer2.from(chunk.toString()));
          await new Promise(
            (resolve2) => setTimeout(() => resolve2(), 0)
          );
        }
        try {
          controller.close();
        } catch {
        }
      }
    }),
    {
      ...set2,
      headers: {
        // Manually set transfer-encoding for direct response, eg. app.handle, eden
        "transfer-encoding": "chunked",
        "content-type": "text/event-stream; charset=utf-8",
        ...set2?.headers
      }
    }
  );
}, "handleStream");
async function* streamResponse(response) {
  const body = response.body;
  if (!body)
    return;
  const reader = body.getReader();
  const decoder = new TextDecoder();
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done)
        break;
      yield decoder.decode(value);
    }
  } finally {
    reader.releaseLock();
  }
}
__name(streamResponse, "streamResponse");
var mapResponse = /* @__PURE__ */ __name((response, set2, request) => {
  if (isNotEmpty(set2.headers) || set2.status !== 200 || set2.redirect || set2.cookie) {
    if (typeof set2.status === "string")
      set2.status = StatusMap[set2.status];
    if (set2.redirect) {
      set2.headers.Location = set2.redirect;
      if (!set2.status || set2.status < 300 || set2.status >= 400)
        set2.status = 302;
    }
    if (set2.cookie && isNotEmpty(set2.cookie)) {
      const cookie = serializeCookie(set2.cookie);
      if (cookie)
        set2.headers["set-cookie"] = cookie;
    }
    if (set2.headers["set-cookie"] && Array.isArray(set2.headers["set-cookie"])) {
      set2.headers = parseSetCookies(
        new Headers(set2.headers),
        set2.headers["set-cookie"]
      );
    }
    switch (response?.constructor?.name) {
      case "String":
        return new Response(response, set2);
      case "Blob":
        return handleFile(response, set2);
      case "Array":
        return Response.json(response, set2);
      case "Object":
        return Response.json(response, set2);
      case "ElysiaCustomStatusResponse":
        set2.status = response.code;
        return mapResponse(
          response.response,
          set2,
          request
        );
      case "ReadableStream":
        if (!set2.headers["content-type"]?.startsWith(
          "text/event-stream"
        ))
          set2.headers["content-type"] = "text/event-stream; charset=utf-8";
        request?.signal.addEventListener(
          "abort",
          {
            handleEvent() {
              if (!request?.signal.aborted)
                response.cancel(request);
            }
          },
          {
            once: true
          }
        );
        return new Response(
          response,
          set2
        );
      case void 0:
        if (!response)
          return new Response("", set2);
        return Response.json(response, set2);
      case "Response":
        let isCookieSet = false;
        if (set2.headers instanceof Headers)
          for (const key of set2.headers.keys()) {
            if (key === "set-cookie") {
              if (isCookieSet)
                continue;
              isCookieSet = true;
              for (const cookie of set2.headers.getSetCookie()) {
                ;
                response.headers.append(
                  "set-cookie",
                  cookie
                );
              }
            } else
              response.headers.append(
                key,
                set2.headers?.get(key) ?? ""
              );
          }
        else
          for (const key in set2.headers)
            response.headers.append(
              key,
              set2.headers[key]
            );
        if (response.status !== set2.status)
          set2.status = response.status;
        if (response.headers.get("transfer-encoding") === "chunked")
          return handleStream(
            streamResponse(response),
            set2,
            request
          );
        return response;
      case "Error":
        return errorToResponse(response, set2);
      case "Promise":
        return response.then(
          (x) => mapResponse(x, set2)
        );
      case "Function":
        return mapResponse(response(), set2);
      case "Number":
      case "Boolean":
        return new Response(
          response.toString(),
          set2
        );
      case "Cookie":
        if (response instanceof Cookie)
          return new Response(response.value, set2);
        return new Response(response?.toString(), set2);
      case "FormData":
        return new Response(response, set2);
      default:
        if (response instanceof Response) {
          let isCookieSet2 = false;
          if (set2.headers instanceof Headers)
            for (const key of set2.headers.keys()) {
              if (key === "set-cookie") {
                if (isCookieSet2)
                  continue;
                isCookieSet2 = true;
                for (const cookie of set2.headers.getSetCookie()) {
                  ;
                  response.headers.append(
                    "set-cookie",
                    cookie
                  );
                }
              } else
                response.headers.append(
                  key,
                  set2.headers?.get(key) ?? ""
                );
            }
          else
            for (const key in set2.headers)
              response.headers.append(
                key,
                set2.headers[key]
              );
          if (hasHeaderShorthand)
            set2.headers = response.headers.toJSON();
          else
            for (const [key, value] of response.headers.entries())
              if (key in set2.headers)
                set2.headers[key] = value;
          return response;
        }
        if (response instanceof Promise)
          return response.then((x) => mapResponse(x, set2));
        if (response instanceof Error)
          return errorToResponse(response, set2);
        if (response instanceof ElysiaCustomStatusResponse) {
          set2.status = response.code;
          return mapResponse(
            response.response,
            set2,
            request
          );
        }
        if (typeof response?.next === "function")
          return handleStream(response, set2, request);
        if (typeof response?.then === "function")
          return response.then((x) => mapResponse(x, set2));
        if (typeof response?.toResponse === "function")
          return mapResponse(response.toResponse(), set2);
        if ("charCodeAt" in response) {
          const code = response.charCodeAt(0);
          if (code === 123 || code === 91) {
            if (!set2.headers["Content-Type"])
              set2.headers["Content-Type"] = "application/json";
            return new Response(
              JSON.stringify(response),
              set2
            );
          }
        }
        return new Response(response, set2);
    }
  } else
    switch (response?.constructor?.name) {
      case "String":
        return new Response(response);
      case "Blob":
        return handleFile(response, set2);
      case "Array":
        return Response.json(response);
      case "Object":
        return Response.json(response, set2);
      case "ElysiaCustomStatusResponse":
        set2.status = response.code;
        return mapResponse(
          response.response,
          set2,
          request
        );
      case "ReadableStream":
        request?.signal.addEventListener(
          "abort",
          {
            handleEvent() {
              if (!request?.signal.aborted)
                response.cancel(request);
            }
          },
          {
            once: true
          }
        );
        return new Response(response, {
          headers: {
            "Content-Type": "text/event-stream; charset=utf-8"
          }
        });
      case void 0:
        if (!response)
          return new Response("");
        return new Response(JSON.stringify(response), {
          headers: {
            "content-type": "application/json"
          }
        });
      case "Response":
        if (response.headers.get("transfer-encoding") === "chunked")
          return handleStream(
            streamResponse(response),
            set2,
            request
          );
        return response;
      case "Error":
        return errorToResponse(response, set2);
      case "Promise":
        return response.then((x) => {
          const r = mapCompactResponse(x, request);
          if (r !== void 0)
            return r;
          return new Response("");
        });
      case "Function":
        return mapCompactResponse(response(), request);
      case "Number":
      case "Boolean":
        return new Response(response.toString());
      case "Cookie":
        if (response instanceof Cookie)
          return new Response(response.value, set2);
        return new Response(response?.toString(), set2);
      case "FormData":
        return new Response(response, set2);
      default:
        if (response instanceof Response)
          return response;
        if (response instanceof Promise)
          return response.then((x) => mapResponse(x, set2));
        if (response instanceof Error)
          return errorToResponse(response, set2);
        if (response instanceof ElysiaCustomStatusResponse) {
          set2.status = response.code;
          return mapResponse(
            response.response,
            set2,
            request
          );
        }
        if (typeof response?.next === "function")
          return handleStream(response, set2, request);
        if (typeof response?.then === "function")
          return response.then((x) => mapResponse(x, set2));
        if (typeof response?.toResponse === "function")
          return mapResponse(response.toResponse(), set2);
        if ("charCodeAt" in response) {
          const code = response.charCodeAt(0);
          if (code === 123 || code === 91) {
            if (!set2.headers["Content-Type"])
              set2.headers["Content-Type"] = "application/json";
            return new Response(
              JSON.stringify(response),
              set2
            );
          }
        }
        return new Response(response);
    }
}, "mapResponse");
var mapEarlyResponse = /* @__PURE__ */ __name((response, set2, request) => {
  if (response === void 0 || response === null)
    return;
  if (isNotEmpty(set2.headers) || set2.status !== 200 || set2.redirect || set2.cookie) {
    if (typeof set2.status === "string")
      set2.status = StatusMap[set2.status];
    if (set2.redirect) {
      set2.headers.Location = set2.redirect;
      if (!set2.status || set2.status < 300 || set2.status >= 400)
        set2.status = 302;
    }
    if (set2.cookie && isNotEmpty(set2.cookie)) {
      const cookie = serializeCookie(set2.cookie);
      if (cookie)
        set2.headers["set-cookie"] = cookie;
    }
    if (set2.headers["set-cookie"] && Array.isArray(set2.headers["set-cookie"]))
      set2.headers = parseSetCookies(
        new Headers(set2.headers),
        set2.headers["set-cookie"]
      );
    switch (response?.constructor?.name) {
      case "String":
        return new Response(response, set2);
      case "Blob":
        return handleFile(response, set2);
      case "Array":
        return Response.json(response, set2);
      case "Object":
        return Response.json(response, set2);
      case "ElysiaCustomStatusResponse":
        set2.status = response.code;
        return mapEarlyResponse(
          response.response,
          set2,
          request
        );
      case "ReadableStream":
        if (!set2.headers["content-type"]?.startsWith(
          "text/event-stream"
        ))
          set2.headers["content-type"] = "text/event-stream; charset=utf-8";
        request?.signal.addEventListener(
          "abort",
          {
            handleEvent() {
              if (!request?.signal.aborted)
                response.cancel(request);
            }
          },
          {
            once: true
          }
        );
        return new Response(
          response,
          set2
        );
      case void 0:
        if (!response)
          return;
        return Response.json(response, set2);
      case "Response":
        let isCookieSet = false;
        if (set2.headers instanceof Headers)
          for (const key of set2.headers.keys()) {
            if (key === "set-cookie") {
              if (isCookieSet)
                continue;
              isCookieSet = true;
              for (const cookie of set2.headers.getSetCookie()) {
                ;
                response.headers.append(
                  "set-cookie",
                  cookie
                );
              }
            } else
              response.headers.append(
                key,
                set2.headers?.get(key) ?? ""
              );
          }
        else
          for (const key in set2.headers)
            response.headers.append(
              key,
              set2.headers[key]
            );
        if (response.status !== set2.status)
          set2.status = response.status;
        if (response.headers.get("transfer-encoding") === "chunked")
          return handleStream(
            streamResponse(response),
            set2,
            request
          );
        return response;
      case "Promise":
        return response.then((x) => {
          const r = mapEarlyResponse(x, set2);
          if (r !== void 0)
            return r;
        });
      case "Error":
        return errorToResponse(response, set2);
      case "Function":
        return mapEarlyResponse(response(), set2);
      case "Number":
      case "Boolean":
        return new Response(
          response.toString(),
          set2
        );
      case "FormData":
        return new Response(response);
      case "Cookie":
        if (response instanceof Cookie)
          return new Response(response.value, set2);
        return new Response(response?.toString(), set2);
      default:
        if (response instanceof Response) {
          let isCookieSet2 = false;
          if (set2.headers instanceof Headers)
            for (const key of set2.headers.keys()) {
              if (key === "set-cookie") {
                if (isCookieSet2)
                  continue;
                isCookieSet2 = true;
                for (const cookie of set2.headers.getSetCookie()) {
                  ;
                  response.headers.append(
                    "set-cookie",
                    cookie
                  );
                }
              } else
                response.headers.append(
                  key,
                  set2.headers?.get(key) ?? ""
                );
            }
          else
            for (const key in set2.headers)
              response.headers.append(
                key,
                set2.headers[key]
              );
          if (response.status !== set2.status)
            set2.status = response.status;
          return response;
        }
        if (response instanceof Promise)
          return response.then((x) => mapEarlyResponse(x, set2));
        if (response instanceof Error)
          return errorToResponse(response, set2);
        if (response instanceof ElysiaCustomStatusResponse) {
          set2.status = response.code;
          return mapEarlyResponse(
            response.response,
            set2,
            request
          );
        }
        if (typeof response?.next === "function")
          return handleStream(response, set2, request);
        if (typeof response?.then === "function")
          return response.then((x) => mapEarlyResponse(x, set2));
        if (typeof response?.toResponse === "function")
          return mapEarlyResponse(response.toResponse(), set2);
        if ("charCodeAt" in response) {
          const code = response.charCodeAt(0);
          if (code === 123 || code === 91) {
            if (!set2.headers["Content-Type"])
              set2.headers["Content-Type"] = "application/json";
            return new Response(
              JSON.stringify(response),
              set2
            );
          }
        }
        return new Response(response, set2);
    }
  } else
    switch (response?.constructor?.name) {
      case "String":
        return new Response(response);
      case "Blob":
        return handleFile(response, set2);
      case "Array":
        return Response.json(response);
      case "Object":
        return Response.json(response, set2);
      case "ElysiaCustomStatusResponse":
        set2.status = response.code;
        return mapEarlyResponse(
          response.response,
          set2,
          request
        );
      case "ReadableStream":
        request?.signal.addEventListener(
          "abort",
          {
            handleEvent() {
              if (!request?.signal.aborted)
                response.cancel(request);
            }
          },
          {
            once: true
          }
        );
        return new Response(response, {
          headers: {
            "Content-Type": "text/event-stream; charset=utf-8"
          }
        });
      case void 0:
        if (!response)
          return new Response("");
        return new Response(JSON.stringify(response), {
          headers: {
            "content-type": "application/json"
          }
        });
      case "Response":
        if (response.headers.get("transfer-encoding") === "chunked")
          return handleStream(
            streamResponse(response)
          );
        return response;
      case "Promise":
        return response.then((x) => {
          const r = mapEarlyResponse(x, set2);
          if (r !== void 0)
            return r;
        });
      case "Error":
        return errorToResponse(response, set2);
      case "Function":
        return mapCompactResponse(response(), request);
      case "Number":
      case "Boolean":
        return new Response(response.toString());
      case "Cookie":
        if (response instanceof Cookie)
          return new Response(response.value, set2);
        return new Response(response?.toString(), set2);
      case "FormData":
        return new Response(response);
      default:
        if (response instanceof Response)
          return response;
        if (response instanceof Promise)
          return response.then((x) => mapEarlyResponse(x, set2));
        if (response instanceof Error)
          return errorToResponse(response, set2);
        if (response instanceof ElysiaCustomStatusResponse) {
          set2.status = response.code;
          return mapEarlyResponse(
            response.response,
            set2,
            request
          );
        }
        if (typeof response?.next === "function")
          return handleStream(response, set2, request);
        if (typeof response?.then === "function")
          return response.then((x) => mapEarlyResponse(x, set2));
        if (typeof response?.toResponse === "function")
          return mapEarlyResponse(response.toResponse(), set2);
        if ("charCodeAt" in response) {
          const code = response.charCodeAt(0);
          if (code === 123 || code === 91) {
            if (!set2.headers["Content-Type"])
              set2.headers["Content-Type"] = "application/json";
            return new Response(
              JSON.stringify(response),
              set2
            );
          }
        }
        return new Response(response);
    }
}, "mapEarlyResponse");
var mapCompactResponse = /* @__PURE__ */ __name((response, request) => {
  switch (response?.constructor?.name) {
    case "String":
      return new Response(response);
    case "Blob":
      return handleFile(response);
    case "Array":
      return Response.json(response);
    case "Object":
      return Response.json(response);
    case "ElysiaCustomStatusResponse":
      return mapResponse(
        response.response,
        {
          status: response.code,
          headers: {}
        }
      );
    case "ReadableStream":
      request?.signal.addEventListener(
        "abort",
        {
          handleEvent() {
            if (!request?.signal.aborted)
              response.cancel(request);
          }
        },
        {
          once: true
        }
      );
      return new Response(response, {
        headers: {
          "Content-Type": "text/event-stream; charset=utf-8"
        }
      });
    case void 0:
      if (!response)
        return new Response("");
      return new Response(JSON.stringify(response), {
        headers: {
          "content-type": "application/json"
        }
      });
    case "Response":
      if (response.headers.get("transfer-encoding") === "chunked")
        return handleStream(streamResponse(response));
      return response;
    case "Error":
      return errorToResponse(response);
    case "Promise":
      return response.then(
        (x) => mapCompactResponse(x, request)
      );
    case "Function":
      return mapCompactResponse(response(), request);
    case "Number":
    case "Boolean":
      return new Response(response.toString());
    case "FormData":
      return new Response(response);
    default:
      if (response instanceof Response)
        return response;
      if (response instanceof Promise)
        return response.then(
          (x) => mapCompactResponse(x, request)
        );
      if (response instanceof Error)
        return errorToResponse(response);
      if (response instanceof ElysiaCustomStatusResponse)
        return mapResponse(
          response.response,
          {
            status: response.code,
            headers: {}
          }
        );
      if (typeof response?.next === "function")
        return handleStream(response, void 0, request);
      if (typeof response?.then === "function")
        return response.then((x) => mapResponse(x, set));
      if (typeof response?.toResponse === "function")
        return mapCompactResponse(response.toResponse());
      if ("charCodeAt" in response) {
        const code = response.charCodeAt(0);
        if (code === 123 || code === 91) {
          return new Response(JSON.stringify(response), {
            headers: {
              "Content-Type": "application/json"
            }
          });
        }
      }
      return new Response(response);
  }
}, "mapCompactResponse");
var errorToResponse = /* @__PURE__ */ __name((error2, set2) => new Response(
  JSON.stringify({
    name: error2?.name,
    message: error2?.message,
    cause: error2?.cause
  }),
  {
    status: set2?.status !== 200 ? set2?.status ?? 500 : 500,
    headers: set2?.headers
  }
), "errorToResponse");
var createStaticHandler = /* @__PURE__ */ __name((handle, hooks, setHeaders = {}) => {
  if (typeof handle === "function")
    return;
  const response = mapResponse(handle, {
    headers: setHeaders
  });
  if (hooks.parse.length === 0 && hooks.transform.length === 0 && hooks.beforeHandle.length === 0 && hooks.afterHandle.length === 0)
    return response.clone.bind(response);
}, "createStaticHandler");
var createNativeStaticHandler = /* @__PURE__ */ __name((handle, hooks, setHeaders = {}) => {
  if (typeof handle === "function" || handle instanceof Blob)
    return;
  const response = mapResponse(handle, {
    headers: setHeaders
  });
  if (hooks.parse.length === 0 && hooks.transform.length === 0 && hooks.beforeHandle.length === 0 && hooks.afterHandle.length === 0) {
    if (!response.headers.has("content-type"))
      response.headers.append("content-type", "text/plain;charset=utf-8");
    return response.clone.bind(response);
  }
}, "createNativeStaticHandler");
var replaceUrlPath = /* @__PURE__ */ __name((url, pathname) => {
  const urlObject = new URL(url);
  urlObject.pathname = pathname;
  return urlObject.toString();
}, "replaceUrlPath");
var isClass = /* @__PURE__ */ __name((v) => typeof v === "function" && /^\s*class\s+/.test(v.toString()) || // Handle import * as Sentry from '@sentry/bun'
// This also handle [object Date], [object Array]
// and FFI value like [object Prisma]
v.toString().startsWith("[object ") && v.toString() !== "[object Object]" || // If object prototype is not pure, then probably a class-like object
isNotEmpty(Object.getPrototypeOf(v)), "isClass");
var isObject = /* @__PURE__ */ __name((item) => item && typeof item === "object" && !Array.isArray(item), "isObject");
var mergeDeep = /* @__PURE__ */ __name((target, source, {
  skipKeys,
  override = true
} = {}) => {
  if (!isObject(target) || !isObject(source))
    return target;
  for (const [key, value] of Object.entries(source)) {
    if (skipKeys?.includes(key))
      continue;
    if (!isObject(value) || !(key in target) || isClass(value)) {
      if (override || !(key in target))
        target[key] = value;
      continue;
    }
    target[key] = mergeDeep(
      target[key],
      value,
      { skipKeys, override }
    );
  }
  return target;
}, "mergeDeep");
var mergeCookie = /* @__PURE__ */ __name((a, b) => {
  const { properties: _, ...target } = a ?? {};
  const { properties: __, ...source } = b ?? {};
  return mergeDeep(target, source);
}, "mergeCookie");
var mergeObjectArray = /* @__PURE__ */ __name((a = [], b = []) => {
  if (!a)
    return [];
  if (!b)
    return a;
  const array = [];
  const checksums = [];
  if (!Array.isArray(a))
    a = [a];
  if (!Array.isArray(b))
    b = [b];
  for (const item of a) {
    array.push(item);
    if (item.checksum)
      checksums.push(item.checksum);
  }
  for (const item of b)
    if (!checksums.includes(item.checksum))
      array.push(item);
  return array;
}, "mergeObjectArray");
var primitiveHooks = [
  "start",
  "request",
  "parse",
  "transform",
  "resolve",
  "beforeHandle",
  "afterHandle",
  "mapResponse",
  "afterResponse",
  "trace",
  "error",
  "stop",
  "body",
  "headers",
  "params",
  "query",
  "response",
  "type",
  "detail"
];
var primitiveHookMap = primitiveHooks.reduce(
  (acc, x) => (acc[x] = true, acc),
  {}
);
var mergeResponse = /* @__PURE__ */ __name((a, b) => {
  const isRecordNumber = /* @__PURE__ */ __name((x) => typeof x === "object" && Object.keys(x).every(isNumericString), "isRecordNumber");
  if (isRecordNumber(a) && isRecordNumber(b))
    return { ...a, ...b };
  else if (a && !isRecordNumber(a) && isRecordNumber(b))
    return { 200: a, ...b };
  return b ?? a;
}, "mergeResponse");
var mergeSchemaValidator = /* @__PURE__ */ __name((a, b) => {
  return {
    body: b?.body ?? a?.body,
    headers: b?.headers ?? a?.headers,
    params: b?.params ?? a?.params,
    query: b?.query ?? a?.query,
    cookie: b?.cookie ?? a?.cookie,
    // @ts-ignore ? This order is correct - SaltyAom
    response: mergeResponse(
      // @ts-ignore
      a?.response,
      // @ts-ignore
      b?.response
    )
  };
}, "mergeSchemaValidator");
var mergeHook = /* @__PURE__ */ __name((a, b) => {
  return {
    ...a,
    ...b,
    // Merge local hook first
    // @ts-ignore
    body: b?.body ?? a?.body,
    // @ts-ignore
    headers: b?.headers ?? a?.headers,
    // @ts-ignore
    params: b?.params ?? a?.params,
    // @ts-ignore
    query: b?.query ?? a?.query,
    // @ts-ignore
    cookie: b?.cookie ?? a?.cookie,
    // ? This order is correct - SaltyAom
    response: mergeResponse(
      // @ts-ignore
      a?.response,
      // @ts-ignore
      b?.response
    ),
    type: a?.type || b?.type,
    detail: mergeDeep(
      // @ts-ignore
      b?.detail ?? {},
      // @ts-ignore
      a?.detail ?? {}
    ),
    parse: mergeObjectArray(a?.parse, b?.parse),
    transform: mergeObjectArray(a?.transform, b?.transform),
    beforeHandle: mergeObjectArray(a?.beforeHandle, b?.beforeHandle),
    afterHandle: mergeObjectArray(a?.afterHandle, b?.afterHandle),
    mapResponse: mergeObjectArray(a?.mapResponse, b?.mapResponse),
    afterResponse: mergeObjectArray(
      a?.afterResponse,
      b?.afterResponse
    ),
    trace: mergeObjectArray(a?.trace, b?.trace),
    error: mergeObjectArray(a?.error, b?.error)
  };
}, "mergeHook");
var replaceSchemaType = /* @__PURE__ */ __name((schema, options, root = true) => {
  if (!Array.isArray(options))
    return _replaceSchemaType(schema, options, root);
  for (const option of options)
    schema = _replaceSchemaType(schema, option, root);
  return schema;
}, "replaceSchemaType");
var _replaceSchemaType = /* @__PURE__ */ __name((schema, options, root = true) => {
  if (!schema)
    return schema;
  if (options.untilObjectFound && !root && schema.type === "object")
    return schema;
  const fromSymbol = options.from[Kind];
  if (schema.oneOf) {
    for (let i = 0; i < schema.oneOf.length; i++)
      schema.oneOf[i] = _replaceSchemaType(schema.oneOf[i], options, root);
    return schema;
  }
  if (schema.anyOf) {
    for (let i = 0; i < schema.anyOf.length; i++)
      schema.anyOf[i] = _replaceSchemaType(schema.anyOf[i], options, root);
    return schema;
  }
  if (schema.allOf) {
    for (let i = 0; i < schema.allOf.length; i++)
      schema.allOf[i] = _replaceSchemaType(schema.allOf[i], options, root);
    return schema;
  }
  if (schema.not) {
    for (let i = 0; i < schema.not.length; i++)
      schema.not[i] = _replaceSchemaType(schema.not[i], options, root);
    return schema;
  }
  const isRoot = root && !!options.excludeRoot;
  if (schema[Kind] === fromSymbol) {
    const { anyOf, oneOf, allOf, not, properties: properties2, items, ...rest } = schema;
    const to = options.to(rest);
    let transform;
    const composeProperties = /* @__PURE__ */ __name((v) => {
      if (properties2 && v.type === "object") {
        const newProperties = {};
        for (const [key, value2] of Object.entries(properties2))
          newProperties[key] = _replaceSchemaType(
            value2,
            options,
            false
          );
        return {
          ...rest,
          ...v,
          properties: newProperties
        };
      }
      if (items && v.type === "array")
        return {
          ...rest,
          ...v,
          items: _replaceSchemaType(items, options, false)
        };
      const value = {
        ...rest,
        ...v
      };
      delete value["required"];
      if (properties2 && v.type === "string" && v.format === "ObjectString" && v.default === "{}") {
        transform = t.ObjectString(properties2, rest);
        value.default = JSON.stringify(
          value_exports2.Create(t.Object(properties2))
        );
        value.properties = properties2;
      }
      if (items && v.type === "string" && v.format === "ArrayString" && v.default === "[]") {
        transform = t.ArrayString(items, rest);
        value.default = JSON.stringify(value_exports2.Create(t.Array(items)));
        value.items = items;
      }
      return value;
    }, "composeProperties");
    if (isRoot) {
      if (properties2) {
        const newProperties = {};
        for (const [key, value] of Object.entries(properties2))
          newProperties[key] = _replaceSchemaType(
            value,
            options,
            false
          );
        return {
          ...rest,
          properties: newProperties
        };
      } else if (items?.map)
        return {
          ...rest,
          items: items.map(
            (v) => _replaceSchemaType(v, options, false)
          )
        };
      return rest;
    }
    if (to.anyOf)
      for (let i = 0; i < to.anyOf.length; i++)
        to.anyOf[i] = composeProperties(to.anyOf[i]);
    else if (to.oneOf)
      for (let i = 0; i < to.oneOf.length; i++)
        to.oneOf[i] = composeProperties(to.oneOf[i]);
    else if (to.allOf)
      for (let i = 0; i < to.allOf.length; i++)
        to.allOf[i] = composeProperties(to.allOf[i]);
    else if (to.not)
      for (let i = 0; i < to.not.length; i++)
        to.not[i] = composeProperties(to.not[i]);
    if (transform)
      to[TransformKind] = transform[TransformKind];
    if (to.anyOf || to.oneOf || to.allOf || to.not)
      return to;
    if (properties2) {
      const newProperties = {};
      for (const [key, value] of Object.entries(properties2))
        newProperties[key] = _replaceSchemaType(
          value,
          options,
          false
        );
      return {
        ...rest,
        ...to,
        properties: newProperties
      };
    } else if (items?.map)
      return {
        ...rest,
        ...to,
        items: items.map(
          (v) => _replaceSchemaType(v, options, false)
        )
      };
    return {
      ...rest,
      ...to
    };
  }
  const properties = schema?.properties;
  if (properties && root && options.rootOnly !== true)
    for (const [key, value] of Object.entries(properties)) {
      switch (value[Kind]) {
        case fromSymbol:
          const { anyOf, oneOf, allOf, not, type, ...rest } = value;
          const to = options.to(rest);
          if (to.anyOf)
            for (let i = 0; i < to.anyOf.length; i++)
              to.anyOf[i] = { ...rest, ...to.anyOf[i] };
          else if (to.oneOf)
            for (let i = 0; i < to.oneOf.length; i++)
              to.oneOf[i] = { ...rest, ...to.oneOf[i] };
          else if (to.allOf)
            for (let i = 0; i < to.allOf.length; i++)
              to.allOf[i] = { ...rest, ...to.allOf[i] };
          else if (to.not)
            for (let i = 0; i < to.not.length; i++)
              to.not[i] = { ...rest, ...to.not[i] };
          properties[key] = {
            ...rest,
            ..._replaceSchemaType(rest, options, false)
          };
          break;
        case "Object":
        case "Union":
          properties[key] = _replaceSchemaType(value, options, false);
          break;
        default:
          if (value.items)
            for (let i = 0; i < value.items.length; i++) {
              value.items[i] = _replaceSchemaType(
                value.items[i],
                options,
                false
              );
            }
          else if (value.anyOf || value.oneOf || value.allOf || value.not)
            properties[key] = _replaceSchemaType(
              value,
              options,
              false
            );
          break;
      }
    }
  return schema;
}, "_replaceSchemaType");
var createCleaner = /* @__PURE__ */ __name((schema) => (value) => {
  if (typeof value === "object")
    try {
      return value_exports2.Clean(schema, structuredClone(value));
    } catch {
      try {
        return value_exports2.Clean(schema, value);
      } catch {
        return value;
      }
    }
  return value;
}, "createCleaner");
var getSchemaValidator = /* @__PURE__ */ __name((s, {
  models = {},
  dynamic = false,
  normalize: normalize2 = false,
  additionalProperties = false,
  coerce = false,
  additionalCoerce = []
} = {}) => {
  if (!s)
    return void 0;
  if (typeof s === "string" && !(s in models))
    return void 0;
  let schema = typeof s === "string" ? models[s] : s;
  if (coerce || additionalCoerce) {
    if (coerce)
      schema = replaceSchemaType(schema, [
        {
          from: t.Number(),
          to: (options) => t.Numeric(options),
          untilObjectFound: true
        },
        {
          from: t.Boolean(),
          to: (options) => t.BooleanString(options),
          untilObjectFound: true
        },
        ...Array.isArray(additionalCoerce) ? additionalCoerce : [additionalCoerce]
      ]);
    else {
      schema = replaceSchemaType(schema, [
        ...Array.isArray(additionalCoerce) ? additionalCoerce : [additionalCoerce]
      ]);
    }
  }
  if (schema.type === "object" && "additionalProperties" in schema === false)
    schema.additionalProperties = additionalProperties;
  if (dynamic) {
    const validator = {
      schema,
      references: "",
      checkFunc: () => {
      },
      code: "",
      Check: (value) => value_exports2.Check(schema, value),
      Errors: (value) => value_exports2.Errors(schema, value),
      Code: () => "",
      Clean: createCleaner(schema),
      Decode: (value) => value_exports2.Decode(schema, value),
      Encode: (value) => value_exports2.Encode(schema, value)
    };
    if (normalize2 && schema.additionalProperties === false)
      validator.Clean = createCleaner(schema);
    if (schema.config) {
      validator.config = schema.config;
      if (validator?.schema?.config)
        delete validator.schema.config;
    }
    validator.parse = (v) => {
      try {
        return validator.Decode(v);
      } catch (error2) {
        throw [...validator.Errors(v)].map(mapValueError);
      }
    };
    validator.safeParse = (v) => {
      try {
        return { success: true, data: validator.Decode(v), error: null };
      } catch (error2) {
        const errors = [...compiled.Errors(v)].map(mapValueError);
        return {
          success: false,
          data: null,
          error: errors[0]?.summary,
          errors
        };
      }
    };
    return validator;
  }
  const compiled = TypeCompiler.Compile(schema, Object.values(models));
  compiled.Clean = createCleaner(schema);
  if (schema.config) {
    compiled.config = schema.config;
    if (compiled?.schema?.config)
      delete compiled.schema.config;
  }
  compiled.parse = (v) => {
    try {
      return compiled.Decode(v);
    } catch (error2) {
      throw [...compiled.Errors(v)].map(mapValueError);
    }
  };
  compiled.safeParse = (v) => {
    try {
      return { success: true, data: compiled.Decode(v), error: null };
    } catch (error2) {
      const errors = [...compiled.Errors(v)].map(mapValueError);
      return {
        success: false,
        data: null,
        error: errors[0]?.summary,
        errors
      };
    }
  };
  return compiled;
}, "getSchemaValidator");
var getResponseSchemaValidator = /* @__PURE__ */ __name((s, {
  models = {},
  dynamic = false,
  normalize: normalize2 = false,
  additionalProperties = false
}) => {
  if (!s)
    return;
  if (typeof s === "string" && !(s in models))
    return;
  const maybeSchemaOrRecord = typeof s === "string" ? models[s] : s;
  const compile = /* @__PURE__ */ __name((schema, references) => {
    if (dynamic)
      return {
        schema,
        references: "",
        checkFunc: () => {
        },
        code: "",
        Check: (value) => value_exports2.Check(schema, value),
        Errors: (value) => value_exports2.Errors(schema, value),
        Code: () => "",
        Clean: createCleaner(schema),
        Decode: (value) => value_exports2.Decode(schema, value),
        Encode: (value) => value_exports2.Encode(schema, value)
      };
    const compiledValidator = TypeCompiler.Compile(schema, references);
    if (normalize2 && schema.additionalProperties === false)
      compiledValidator.Clean = createCleaner(schema);
    return compiledValidator;
  }, "compile");
  if (Kind in maybeSchemaOrRecord) {
    if ("additionalProperties" in maybeSchemaOrRecord === false)
      maybeSchemaOrRecord.additionalProperties = additionalProperties;
    return {
      200: compile(maybeSchemaOrRecord, Object.values(models))
    };
  }
  const record = {};
  Object.keys(maybeSchemaOrRecord).forEach((status) => {
    const maybeNameOrSchema = maybeSchemaOrRecord[+status];
    if (typeof maybeNameOrSchema === "string") {
      if (maybeNameOrSchema in models) {
        const schema = models[maybeNameOrSchema];
        schema.type === "object" && "additionalProperties" in schema === false;
        record[+status] = Kind in schema ? compile(schema, Object.values(models)) : schema;
      }
      return void 0;
    }
    if (maybeNameOrSchema.type === "object" && "additionalProperties" in maybeNameOrSchema === false)
      maybeNameOrSchema.additionalProperties = additionalProperties;
    record[+status] = Kind in maybeNameOrSchema ? compile(maybeNameOrSchema, Object.values(models)) : maybeNameOrSchema;
  });
  return record;
}, "getResponseSchemaValidator");
var isBun = typeof Bun !== "undefined";
var hasHash = isBun && typeof Bun.hash === "function";
var checksum = /* @__PURE__ */ __name((s) => {
  if (hasHash)
    return Bun.hash(s);
  let h = 9;
  for (let i = 0; i < s.length; )
    h = Math.imul(h ^ s.charCodeAt(i++), 9 ** 9);
  return h = h ^ h >>> 9;
}, "checksum");
var _stringToStructureCoercions;
var stringToStructureCoercions = /* @__PURE__ */ __name(() => {
  if (!_stringToStructureCoercions) {
    _stringToStructureCoercions = [
      {
        from: t.Object({}),
        to: () => t.ObjectString({}),
        excludeRoot: true
      },
      {
        from: t.Array(t.Any()),
        to: () => t.ArrayString(t.Any())
      }
    ];
  }
  return _stringToStructureCoercions;
}, "stringToStructureCoercions");
var _coercePrimitiveRoot;
var coercePrimitiveRoot = /* @__PURE__ */ __name(() => {
  if (!_coercePrimitiveRoot)
    _coercePrimitiveRoot = [
      {
        from: t.Number(),
        to: (options) => t.Numeric(options),
        rootOnly: true
      },
      {
        from: t.Boolean(),
        to: (options) => t.BooleanString(options),
        rootOnly: true
      }
    ];
  return _coercePrimitiveRoot;
}, "coercePrimitiveRoot");
var getCookieValidator = /* @__PURE__ */ __name(({
  validator,
  defaultConfig = {},
  config: config2,
  dynamic,
  models
}) => {
  let cookieValidator = getSchemaValidator(validator, {
    dynamic,
    models,
    additionalProperties: true,
    coerce: true,
    additionalCoerce: stringToStructureCoercions()
  });
  if (isNotEmpty(defaultConfig)) {
    if (cookieValidator) {
      cookieValidator.config = mergeCookie(
        // @ts-expect-error private
        cookieValidator.config,
        config2
      );
    } else {
      cookieValidator = getSchemaValidator(t.Cookie({}), {
        dynamic,
        models,
        additionalProperties: true
      });
      cookieValidator.config = defaultConfig;
    }
  }
  return cookieValidator;
}, "getCookieValidator");
var injectChecksum = /* @__PURE__ */ __name((checksum2, x) => {
  if (!x)
    return;
  if (!Array.isArray(x)) {
    const fn = x;
    if (checksum2 && !fn.checksum)
      fn.checksum = checksum2;
    if (fn.scope === "scoped")
      fn.scope = "local";
    return fn;
  }
  const fns = [...x];
  for (const fn of fns) {
    if (checksum2 && !fn.checksum)
      fn.checksum = checksum2;
    if (fn.scope === "scoped")
      fn.scope = "local";
  }
  return fns;
}, "injectChecksum");
var mergeLifeCycle = /* @__PURE__ */ __name((a, b, checksum2) => {
  return {
    // ...a,
    // ...b,
    start: mergeObjectArray(
      a.start,
      injectChecksum(checksum2, b?.start)
    ),
    request: mergeObjectArray(
      a.request,
      injectChecksum(checksum2, b?.request)
    ),
    parse: mergeObjectArray(
      a.parse,
      injectChecksum(checksum2, b?.parse)
    ),
    transform: mergeObjectArray(
      a.transform,
      injectChecksum(checksum2, b?.transform)
    ),
    beforeHandle: mergeObjectArray(
      a.beforeHandle,
      injectChecksum(checksum2, b?.beforeHandle)
    ),
    afterHandle: mergeObjectArray(
      a.afterHandle,
      injectChecksum(checksum2, b?.afterHandle)
    ),
    mapResponse: mergeObjectArray(
      a.mapResponse,
      injectChecksum(checksum2, b?.mapResponse)
    ),
    afterResponse: mergeObjectArray(
      a.afterResponse,
      injectChecksum(checksum2, b?.afterResponse)
    ),
    // Already merged on Elysia._use, also logic is more complicated, can't directly merge
    trace: mergeObjectArray(
      a.trace,
      injectChecksum(checksum2, b?.trace)
    ),
    error: mergeObjectArray(
      a.error,
      injectChecksum(checksum2, b?.error)
    ),
    stop: mergeObjectArray(
      a.stop,
      injectChecksum(checksum2, b?.stop)
    )
  };
}, "mergeLifeCycle");
var asHookType = /* @__PURE__ */ __name((fn, inject, { skipIfHasType = false } = {}) => {
  if (!fn)
    return fn;
  if (!Array.isArray(fn)) {
    if (skipIfHasType)
      fn.scope ??= inject;
    else
      fn.scope = inject;
    return fn;
  }
  for (const x of fn)
    if (skipIfHasType)
      x.scope ??= inject;
    else
      x.scope = inject;
  return fn;
}, "asHookType");
var filterGlobal = /* @__PURE__ */ __name((fn) => {
  if (!fn)
    return fn;
  if (!Array.isArray(fn))
    switch (fn.scope) {
      case "global":
      case "scoped":
        return { ...fn };
      default:
        return { fn };
    }
  const array = [];
  for (const x of fn)
    switch (x.scope) {
      case "global":
      case "scoped":
        array.push({
          ...x
        });
        break;
    }
  return array;
}, "filterGlobal");
var filterGlobalHook = /* @__PURE__ */ __name((hook) => {
  return {
    // rest is validator
    ...hook,
    type: hook?.type,
    detail: hook?.detail,
    parse: filterGlobal(hook?.parse),
    transform: filterGlobal(hook?.transform),
    beforeHandle: filterGlobal(hook?.beforeHandle),
    afterHandle: filterGlobal(hook?.afterHandle),
    mapResponse: filterGlobal(hook?.mapResponse),
    afterResponse: filterGlobal(hook?.afterResponse),
    error: filterGlobal(hook?.error),
    trace: filterGlobal(hook?.trace)
  };
}, "filterGlobalHook");
var StatusMap = {
  Continue: 100,
  "Switching Protocols": 101,
  Processing: 102,
  "Early Hints": 103,
  OK: 200,
  Created: 201,
  Accepted: 202,
  "Non-Authoritative Information": 203,
  "No Content": 204,
  "Reset Content": 205,
  "Partial Content": 206,
  "Multi-Status": 207,
  "Already Reported": 208,
  "Multiple Choices": 300,
  "Moved Permanently": 301,
  Found: 302,
  "See Other": 303,
  "Not Modified": 304,
  "Temporary Redirect": 307,
  "Permanent Redirect": 308,
  "Bad Request": 400,
  Unauthorized: 401,
  "Payment Required": 402,
  Forbidden: 403,
  "Not Found": 404,
  "Method Not Allowed": 405,
  "Not Acceptable": 406,
  "Proxy Authentication Required": 407,
  "Request Timeout": 408,
  Conflict: 409,
  Gone: 410,
  "Length Required": 411,
  "Precondition Failed": 412,
  "Payload Too Large": 413,
  "URI Too Long": 414,
  "Unsupported Media Type": 415,
  "Range Not Satisfiable": 416,
  "Expectation Failed": 417,
  "I'm a teapot": 418,
  "Misdirected Request": 421,
  "Unprocessable Content": 422,
  Locked: 423,
  "Failed Dependency": 424,
  "Too Early": 425,
  "Upgrade Required": 426,
  "Precondition Required": 428,
  "Too Many Requests": 429,
  "Request Header Fields Too Large": 431,
  "Unavailable For Legal Reasons": 451,
  "Internal Server Error": 500,
  "Not Implemented": 501,
  "Bad Gateway": 502,
  "Service Unavailable": 503,
  "Gateway Timeout": 504,
  "HTTP Version Not Supported": 505,
  "Variant Also Negotiates": 506,
  "Insufficient Storage": 507,
  "Loop Detected": 508,
  "Not Extended": 510,
  "Network Authentication Required": 511
};
var InvertedStatusMap = Object.fromEntries(
  Object.entries(StatusMap).map(([k, v]) => [v, k])
);
function removeTrailingEquals(digest) {
  let trimmedDigest = digest;
  while (trimmedDigest.endsWith("=")) {
    trimmedDigest = trimmedDigest.slice(0, -1);
  }
  return trimmedDigest;
}
__name(removeTrailingEquals, "removeTrailingEquals");
var encoder = new TextEncoder();
var signCookie = /* @__PURE__ */ __name(async (val, secret) => {
  if (typeof val !== "string")
    throw new TypeError("Cookie value must be provided as a string.");
  if (secret === null)
    throw new TypeError("Secret key must be provided.");
  const secretKey = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const hmacBuffer = await crypto.subtle.sign(
    "HMAC",
    secretKey,
    encoder.encode(val)
  );
  return val + "." + removeTrailingEquals(Buffer2.from(hmacBuffer).toString("base64"));
}, "signCookie");
var unsignCookie = /* @__PURE__ */ __name(async (input, secret) => {
  if (typeof input !== "string")
    throw new TypeError("Signed cookie string must be provided.");
  if (null === secret)
    throw new TypeError("Secret key must be provided.");
  const tentativeValue = input.slice(0, input.lastIndexOf("."));
  const expectedInput = await signCookie(tentativeValue, secret);
  return expectedInput === input ? tentativeValue : false;
}, "unsignCookie");
var traceBackMacro = /* @__PURE__ */ __name((extension, property) => {
  if (!extension || typeof extension !== "object" || !property)
    return;
  for (const [key, value] of Object.entries(property)) {
    if (key in primitiveHookMap || !(key in extension))
      continue;
    const v = extension[key];
    if (typeof v === "function") {
      v(value);
      delete property[key];
    }
  }
}, "traceBackMacro");
var createMacroManager = /* @__PURE__ */ __name(({
  globalHook,
  localHook
}) => (stackName) => (type, fn) => {
  if (typeof type === "function")
    type = {
      fn: type
    };
  if ("fn" in type || Array.isArray(type)) {
    if (!localHook[stackName])
      localHook[stackName] = [];
    if (typeof localHook[stackName] === "function")
      localHook[stackName] = [localHook[stackName]];
    if (Array.isArray(type))
      localHook[stackName] = localHook[stackName].concat(type);
    else
      localHook[stackName].push(type);
    return;
  }
  const { insert = "after", stack = "local" } = type;
  if (typeof fn === "function")
    fn = { fn };
  if (stack === "global") {
    if (!Array.isArray(fn)) {
      if (insert === "before") {
        ;
        globalHook[stackName].unshift(fn);
      } else {
        ;
        globalHook[stackName].push(fn);
      }
    } else {
      if (insert === "before") {
        globalHook[stackName] = fn.concat(
          globalHook[stackName]
        );
      } else {
        globalHook[stackName] = globalHook[stackName].concat(fn);
      }
    }
  } else {
    if (!localHook[stackName])
      localHook[stackName] = [];
    if (typeof localHook[stackName] === "function")
      localHook[stackName] = [localHook[stackName]];
    if (!Array.isArray(fn)) {
      if (insert === "before") {
        ;
        localHook[stackName].unshift(fn);
      } else {
        ;
        localHook[stackName].push(fn);
      }
    } else {
      if (insert === "before") {
        localHook[stackName] = fn.concat(localHook[stackName]);
      } else {
        localHook[stackName] = localHook[stackName].concat(fn);
      }
    }
  }
}, "createMacroManager");
var parseNumericString = /* @__PURE__ */ __name((message) => {
  if (typeof message === "number")
    return message;
  if (message.length < 16) {
    if (message.trim().length === 0)
      return null;
    const length = Number(message);
    if (Number.isNaN(length))
      return null;
    return length;
  }
  if (message.length === 16) {
    if (message.trim().length === 0)
      return null;
    const number = Number(message);
    if (Number.isNaN(number) || number.toString() !== message)
      return null;
    return number;
  }
  return null;
}, "parseNumericString");
var isNumericString = /* @__PURE__ */ __name((message) => parseNumericString(message) !== null, "isNumericString");
var PromiseGroup = /* @__PURE__ */ __name(class {
  constructor(onError = console.error) {
    this.onError = onError;
    this.root = null;
    this.promises = [];
  }
  /**
   * The number of promises still being awaited.
   */
  get size() {
    return this.promises.length;
  }
  /**
   * Add a promise to the group.
   * @returns The promise that was added.
   */
  add(promise) {
    this.promises.push(promise);
    this.root ||= this.drain();
    return promise;
  }
  async drain() {
    while (this.promises.length > 0) {
      try {
        await this.promises[0];
      } catch (error2) {
        this.onError(error2);
      }
      this.promises.shift();
    }
    this.root = null;
  }
  // Allow the group to be awaited.
  then(onfulfilled, onrejected) {
    return (this.root ?? Promise.resolve()).then(onfulfilled, onrejected);
  }
}, "PromiseGroup");
var fnToContainer = /* @__PURE__ */ __name((fn) => {
  if (!fn)
    return fn;
  if (!Array.isArray(fn)) {
    if (typeof fn === "function")
      return { fn };
    else if ("fn" in fn)
      return fn;
  }
  const fns = [];
  for (const x of fn) {
    if (typeof x === "function")
      fns.push({ fn: x });
    else if ("fn" in x)
      fns.push(x);
  }
  return fns;
}, "fnToContainer");
var localHookToLifeCycleStore = /* @__PURE__ */ __name((a) => {
  return {
    ...a,
    start: fnToContainer(a?.start),
    request: fnToContainer(a?.request),
    parse: fnToContainer(a?.parse),
    transform: fnToContainer(a?.transform),
    beforeHandle: fnToContainer(a?.beforeHandle),
    afterHandle: fnToContainer(a?.afterHandle),
    mapResponse: fnToContainer(a?.mapResponse),
    afterResponse: fnToContainer(a?.afterResponse),
    trace: fnToContainer(a?.trace),
    error: fnToContainer(a?.error),
    stop: fnToContainer(a?.stop)
  };
}, "localHookToLifeCycleStore");
var lifeCycleToFn = /* @__PURE__ */ __name((a) => {
  return {
    ...a,
    start: a.start?.map((x) => x.fn),
    request: a.request?.map((x) => x.fn),
    parse: a.parse?.map((x) => x.fn),
    transform: a.transform?.map((x) => x.fn),
    beforeHandle: a.beforeHandle?.map((x) => x.fn),
    afterHandle: a.afterHandle?.map((x) => x.fn),
    afterResponse: a.afterResponse?.map((x) => x.fn),
    mapResponse: a.mapResponse?.map((x) => x.fn),
    trace: a.trace?.map((x) => x.fn),
    error: a.error?.map((x) => x.fn),
    stop: a.stop?.map((x) => x.fn)
  };
}, "lifeCycleToFn");
var cloneInference = /* @__PURE__ */ __name((inference) => ({
  body: inference.body,
  cookie: inference.cookie,
  headers: inference.headers,
  query: inference.query,
  set: inference.set,
  server: inference.server
}), "cloneInference");
var redirect = /* @__PURE__ */ __name((url, status = 302) => Response.redirect(url, status), "redirect");
var ELYSIA_FORM_DATA = Symbol("ElysiaFormData");
var ELYSIA_REQUEST_ID = Symbol("ElysiaRequestId");
var randomId = /* @__PURE__ */ __name(() => crypto.getRandomValues(new Uint32Array(1))[0], "randomId");
var deduplicateChecksum = /* @__PURE__ */ __name((array) => {
  const hashes = [];
  for (let i = 0; i < array.length; i++) {
    const item = array[i];
    if (item.checksum) {
      if (hashes.includes(item.checksum)) {
        array.splice(i, 1);
        i--;
      }
      hashes.push(item.checksum);
    }
  }
  return array;
}, "deduplicateChecksum");
var promoteEvent = /* @__PURE__ */ __name((events, as = "scoped") => {
  if (as === "scoped") {
    for (const event of events)
      if ("scope" in event && event.scope === "local")
        event.scope = "scoped";
    return;
  }
  for (const event of events)
    if ("scope" in event)
      event.scope = "global";
}, "promoteEvent");
var env2 = typeof Bun !== "undefined" ? Bun.env : typeof process !== "undefined" ? process?.env : void 0;
var ERROR_CODE = Symbol("ElysiaErrorCode");
var isProduction = (env2?.NODE_ENV ?? env2?.ENV) === "production";
var ElysiaCustomStatusResponse = /* @__PURE__ */ __name(class {
  constructor(code, response) {
    const res = response ?? (code in InvertedStatusMap ? (
      // @ts-expect-error Always correct
      InvertedStatusMap[code]
    ) : code);
    this.code = StatusMap[code] ?? code;
    this.response = res;
  }
}, "ElysiaCustomStatusResponse");
var error = /* @__PURE__ */ __name((code, response) => new ElysiaCustomStatusResponse(code, response), "error");
var InternalServerError = /* @__PURE__ */ __name(class extends Error {
  constructor(message) {
    super(message ?? "INTERNAL_SERVER_ERROR");
    this.code = "INTERNAL_SERVER_ERROR";
    this.status = 500;
  }
}, "InternalServerError");
var NotFoundError = /* @__PURE__ */ __name(class extends Error {
  constructor(message) {
    super(message ?? "NOT_FOUND");
    this.code = "NOT_FOUND";
    this.status = 404;
  }
}, "NotFoundError");
var ParseError = /* @__PURE__ */ __name(class extends Error {
  constructor() {
    super("Failed to parse body");
    this.code = "PARSE";
    this.status = 400;
  }
}, "ParseError");
var InvalidCookieSignature = /* @__PURE__ */ __name(class extends Error {
  constructor(key, message) {
    super(message ?? `"${key}" has invalid cookie signature`);
    this.key = key;
    this.code = "INVALID_COOKIE_SIGNATURE";
    this.status = 400;
  }
}, "InvalidCookieSignature");
var mapValueError = /* @__PURE__ */ __name((error2) => {
  if (!error2)
    return {
      summary: void 0
    };
  const { message, path: path2, value, type } = error2;
  const property = path2.slice(1).replaceAll("/", ".");
  const isRoot = path2 === "";
  switch (type) {
    case 42:
      return {
        ...error2,
        summary: isRoot ? `Value should not be provided` : `Property '${property}' should not be provided`
      };
    case 45:
      return {
        ...error2,
        summary: isRoot ? `Value is missing` : `Property '${property}' is missing`
      };
    case 50:
      const quoteIndex = message.indexOf("'");
      const format2 = message.slice(
        quoteIndex + 1,
        message.indexOf("'", quoteIndex + 1)
      );
      return {
        ...error2,
        summary: isRoot ? `Value should be an email` : `Property '${property}' should be ${format2}`
      };
    case 54:
      return {
        ...error2,
        summary: `${message.slice(
          0,
          9
        )} property '${property}' to be ${message.slice(
          8
        )} but found: ${value}`
      };
    case 62:
      const union = error2.schema.anyOf.map((x) => `'${x?.format ?? x.type}'`).join(", ");
      return {
        ...error2,
        summary: isRoot ? `Value should be one of ${union}` : `Property '${property}' should be one of: ${union}`
      };
    default:
      return { summary: message, ...error2 };
  }
}, "mapValueError");
var ValidationError = /* @__PURE__ */ __name(class _ValidationError extends Error {
  constructor(type, validator, value) {
    if (value && typeof value === "object" && value instanceof ElysiaCustomStatusResponse)
      value = value.response;
    const error2 = isProduction ? void 0 : "Errors" in validator ? validator.Errors(value).First() : value_exports2.Errors(validator, value).First();
    const customError = error2?.schema.error !== void 0 ? typeof error2.schema.error === "function" ? error2.schema.error({
      type,
      validator,
      value,
      get errors() {
        return [...validator.Errors(value)].map(
          mapValueError
        );
      }
    }) : error2.schema.error : void 0;
    const accessor = error2?.path || "root";
    let message = "";
    if (customError !== void 0) {
      message = typeof customError === "object" ? JSON.stringify(customError) : customError + "";
    } else if (isProduction) {
      message = JSON.stringify({
        type: "validation",
        on: type,
        summary: mapValueError(error2).summary,
        message: error2?.message,
        found: value
      });
    } else {
      const schema = validator?.schema ?? validator;
      const errors = "Errors" in validator ? [...validator.Errors(value)].map(mapValueError) : [...value_exports2.Errors(validator, value)].map(mapValueError);
      let expected;
      try {
        expected = value_exports2.Create(schema);
      } catch (error3) {
        expected = {
          type: "Could not create expected value",
          // @ts-expect-error
          message: error3?.message,
          error: error3
        };
      }
      message = JSON.stringify(
        {
          type: "validation",
          on: type,
          summary: errors[0]?.summary,
          property: accessor,
          message: error2?.message,
          expected,
          found: value,
          errors
        },
        null,
        2
      );
    }
    super(message);
    this.type = type;
    this.validator = validator;
    this.value = value;
    this.code = "VALIDATION";
    this.status = 422;
    Object.setPrototypeOf(this, _ValidationError.prototype);
  }
  get all() {
    return "Errors" in this.validator ? [...this.validator.Errors(this.value)].map(mapValueError) : (
      // @ts-ignore
      [...value_exports2.Errors(this.validator, this.value)].map(mapValueError)
    );
  }
  static simplifyModel(validator) {
    const model = "schema" in validator ? validator.schema : validator;
    try {
      return value_exports2.Create(model);
    } catch {
      return model;
    }
  }
  get model() {
    return _ValidationError.simplifyModel(this.validator);
  }
  toResponse(headers) {
    return new Response(this.message, {
      status: 400,
      headers: {
        ...headers,
        "content-type": "application/json"
      }
    });
  }
}, "_ValidationError");
var websocket = {
  open(ws) {
    ws.data.open?.(ws);
  },
  message(ws, message) {
    ws.data.message?.(ws, message);
  },
  drain(ws) {
    ws.data.drain?.(ws);
  },
  close(ws, code, reason) {
    ws.data.close?.(ws, code, reason);
  }
};
var ElysiaWS = /* @__PURE__ */ __name(class {
  constructor(raw, data) {
    this.raw = raw;
    this.data = data;
    this.validator = raw.data.validator;
    if (raw.data.id) {
      this.id = raw.data.id;
    } else {
      this.id = randomId().toString();
    }
  }
  get id() {
    return this.raw.data.id;
  }
  set id(newID) {
    this.raw.data.id = newID;
  }
  get publish() {
    return (topic, data = void 0, compress) => {
      if (this.validator?.Check(data) === false)
        throw new ValidationError("message", this.validator, data);
      if (typeof data === "object")
        data = JSON.stringify(data);
      this.raw.publish(topic, data, compress);
      return this;
    };
  }
  get send() {
    return (data) => {
      if (this.validator?.Check(data) === false)
        throw new ValidationError("message", this.validator, data);
      if (Buffer2.isBuffer(data)) {
        this.raw.send(data);
        return this;
      }
      if (typeof data === "object")
        data = JSON.stringify(data);
      this.raw.send(data);
      return this;
    };
  }
  get subscribe() {
    return (room) => {
      this.raw.subscribe(room);
      return this;
    };
  }
  get unsubscribe() {
    return (room) => {
      this.raw.unsubscribe(room);
      return this;
    };
  }
  get cork() {
    return (callback) => {
      this.raw.cork(callback);
      return this;
    };
  }
  get close() {
    return () => {
      this.raw.close();
      return this;
    };
  }
  get terminate() {
    return this.raw.terminate.bind(this.raw);
  }
  get isSubscribed() {
    return this.raw.isSubscribed.bind(this.raw);
  }
  get remoteAddress() {
    return this.raw.remoteAddress;
  }
}, "ElysiaWS");
var version2 = "1.1.26";
var plusRegex = /\+/g;
function parseQueryFromURL(input) {
  const result = {};
  if (typeof input !== "string")
    return result;
  let key = "";
  let value = "";
  let startingIndex = -1;
  let equalityIndex = -1;
  let flags = 0;
  const l = input.length;
  for (let i = 0; i < l; i++) {
    switch (input.charCodeAt(i)) {
      case 38:
        const hasBothKeyValuePair = equalityIndex > startingIndex;
        if (!hasBothKeyValuePair)
          equalityIndex = i;
        key = input.slice(startingIndex + 1, equalityIndex);
        if (hasBothKeyValuePair || key.length > 0) {
          if (flags & 1)
            key = key.replace(plusRegex, " ");
          if (flags & 2)
            key = (0, import_fast_decode_uri_component2.default)(key) || key;
          if (!result[key]) {
            if (hasBothKeyValuePair) {
              value = input.slice(equalityIndex + 1, i);
              if (flags & 4)
                value = value.replace(plusRegex, " ");
              if (flags & 8)
                value = (0, import_fast_decode_uri_component2.default)(value) || value;
            }
            result[key] = value;
          }
        }
        key = "";
        value = "";
        startingIndex = i;
        equalityIndex = i;
        flags = 0;
        break;
      case 61:
        if (equalityIndex <= startingIndex)
          equalityIndex = i;
        else
          flags |= 8;
        break;
      case 43:
        if (equalityIndex > startingIndex)
          flags |= 4;
        else
          flags |= 1;
        break;
      case 37:
        if (equalityIndex > startingIndex)
          flags |= 8;
        else
          flags |= 2;
        break;
    }
  }
  if (startingIndex < l) {
    const hasBothKeyValuePair = equalityIndex > startingIndex;
    key = input.slice(
      startingIndex + 1,
      hasBothKeyValuePair ? equalityIndex : l
    );
    if (hasBothKeyValuePair || key.length > 0) {
      if (flags & 1)
        key = key.replace(plusRegex, " ");
      if (flags & 2)
        key = (0, import_fast_decode_uri_component2.default)(key) || key;
      if (!result[key]) {
        if (hasBothKeyValuePair) {
          value = input.slice(equalityIndex + 1, l);
          if (flags & 4)
            value = value.replace(plusRegex, " ");
          if (flags & 8)
            value = (0, import_fast_decode_uri_component2.default)(value) || value;
        }
        result[key] = value;
      }
    }
  }
  return result;
}
__name(parseQueryFromURL, "parseQueryFromURL");
var parseQuery = /* @__PURE__ */ __name((input) => {
  const result = {};
  if (typeof input !== "string")
    return result;
  const inputLength = input.length;
  let key = "";
  let value = "";
  let startingIndex = -1;
  let equalityIndex = -1;
  let shouldDecodeKey = false;
  let shouldDecodeValue = false;
  let keyHasPlus = false;
  let valueHasPlus = false;
  let hasBothKeyValuePair = false;
  let c = 0;
  for (let i = 0; i < inputLength + 1; i++) {
    if (i !== inputLength)
      c = input.charCodeAt(i);
    else
      c = 38;
    switch (c) {
      case 38: {
        hasBothKeyValuePair = equalityIndex > startingIndex;
        if (!hasBothKeyValuePair)
          equalityIndex = i;
        key = input.slice(startingIndex + 1, equalityIndex);
        if (hasBothKeyValuePair || key.length > 0) {
          if (keyHasPlus)
            key = key.replace(plusRegex, " ");
          if (shouldDecodeKey)
            key = (0, import_fast_decode_uri_component2.default)(key) || key;
          if (hasBothKeyValuePair) {
            value = input.slice(equalityIndex + 1, i);
            if (valueHasPlus)
              value = value.replace(plusRegex, " ");
            if (shouldDecodeValue)
              value = (0, import_fast_decode_uri_component2.default)(value) || value;
          }
          const currentValue = result[key];
          if (currentValue === void 0)
            result[key] = value;
          else {
            if (currentValue.pop)
              currentValue.push(value);
            else
              result[key] = [currentValue, value];
          }
        }
        value = "";
        startingIndex = i;
        equalityIndex = i;
        shouldDecodeKey = false;
        shouldDecodeValue = false;
        keyHasPlus = false;
        valueHasPlus = false;
        break;
      }
      case 61:
        if (equalityIndex <= startingIndex)
          equalityIndex = i;
        else
          shouldDecodeValue = true;
        break;
      case 43:
        if (equalityIndex > startingIndex)
          valueHasPlus = true;
        else
          keyHasPlus = true;
        break;
      case 37:
        if (equalityIndex > startingIndex)
          shouldDecodeValue = true;
        else
          shouldDecodeKey = true;
        break;
    }
  }
  return result;
}, "parseQuery");
var ELYSIA_TRACE = Symbol("ElysiaTrace");
var createProcess = /* @__PURE__ */ __name(() => {
  const { promise, resolve: resolve2 } = Promise.withResolvers();
  const { promise: end, resolve: resolveEnd } = Promise.withResolvers();
  const { promise: error2, resolve: resolveError } = Promise.withResolvers();
  const callbacks = [];
  const callbacksEnd = [];
  return [
    (callback) => {
      if (callback)
        callbacks.push(callback);
      return promise;
    },
    (process2) => {
      const processes = [];
      const resolvers = [];
      let groupError = null;
      for (let i = 0; i < (process2.total ?? 0); i++) {
        const { promise: promise2, resolve: resolve22 } = Promise.withResolvers();
        const { promise: end2, resolve: resolveEnd2 } = Promise.withResolvers();
        const { promise: error3, resolve: resolveError2 } = Promise.withResolvers();
        const callbacks2 = [];
        const callbacksEnd2 = [];
        processes.push((callback) => {
          if (callback)
            callbacks2.push(callback);
          return promise2;
        });
        resolvers.push((process3) => {
          const result2 = {
            ...process3,
            end: end2,
            error: error3,
            index: i,
            onStop(callback) {
              if (callback)
                callbacksEnd2.push(callback);
              return end2;
            }
          };
          resolve22(result2);
          for (let i2 = 0; i2 < callbacks2.length; i2++)
            callbacks2[i2](result2);
          return (error4 = null) => {
            const end3 = performance.now();
            if (error4)
              groupError = error4;
            const detail = {
              end: end3,
              error: error4,
              get elapsed() {
                return end3 - process3.begin;
              }
            };
            for (let i2 = 0; i2 < callbacksEnd2.length; i2++)
              callbacksEnd2[i2](detail);
            resolveEnd2(end3);
            resolveError2(error4);
          };
        });
      }
      const result = {
        ...process2,
        end,
        error: error2,
        onEvent(callback) {
          for (let i = 0; i < processes.length; i++)
            processes[i](callback);
        },
        onStop(callback) {
          if (callback)
            callbacksEnd.push(callback);
          return end;
        }
      };
      resolve2(result);
      for (let i = 0; i < callbacks.length; i++)
        callbacks[i](result);
      return {
        resolveChild: resolvers,
        resolve(error3 = null) {
          const end2 = performance.now();
          if (!error3 && groupError)
            error3 = groupError;
          const detail = {
            end: end2,
            error: error3,
            get elapsed() {
              return end2 - process2.begin;
            }
          };
          for (let i = 0; i < callbacksEnd.length; i++)
            callbacksEnd[i](detail);
          resolveEnd(end2);
          resolveError(error3);
        }
      };
    }
  ];
}, "createProcess");
var createTracer = /* @__PURE__ */ __name((traceListener) => {
  return (context) => {
    const [onRequest, resolveRequest] = createProcess();
    const [onParse, resolveParse] = createProcess();
    const [onTransform, resolveTransform] = createProcess();
    const [onBeforeHandle, resolveBeforeHandle] = createProcess();
    const [onHandle, resolveHandle] = createProcess();
    const [onAfterHandle, resolveAfterHandle] = createProcess();
    const [onError, resolveError] = createProcess();
    const [onMapResponse, resolveMapResponse] = createProcess();
    const [onAfterResponse, resolveAfterResponse] = createProcess();
    traceListener({
      // @ts-ignore
      id: context[ELYSIA_REQUEST_ID],
      context,
      set: context.set,
      // @ts-ignore
      onRequest,
      // @ts-ignore
      onParse,
      // @ts-ignore
      onTransform,
      // @ts-ignore
      onBeforeHandle,
      // @ts-ignore
      onHandle,
      // @ts-ignore
      onAfterHandle,
      // @ts-ignore
      onMapResponse,
      // @ts-ignore
      onAfterResponse,
      // @ts-ignore
      onError
    });
    return {
      request: resolveRequest,
      parse: resolveParse,
      transform: resolveTransform,
      beforeHandle: resolveBeforeHandle,
      handle: resolveHandle,
      afterHandle: resolveAfterHandle,
      error: resolveError,
      mapResponse: resolveMapResponse,
      afterResponse: resolveAfterResponse
    };
  };
}, "createTracer");
var headersHasToJSON = new Headers().toJSON;
var TypeBoxSymbol = {
  optional: Symbol.for("TypeBox.Optional"),
  kind: Symbol.for("TypeBox.Kind")
};
var isOptional = /* @__PURE__ */ __name((validator) => {
  if (!validator)
    return false;
  const schema = validator?.schema;
  return !!schema && TypeBoxSymbol.optional in schema;
}, "isOptional");
var hasAdditionalProperties = /* @__PURE__ */ __name((_schema) => {
  if (!_schema)
    return false;
  const schema = _schema?.schema ?? _schema;
  if (schema.anyOf)
    return schema.anyOf.some(hasAdditionalProperties);
  if (schema.someOf)
    return schema.someOf.some(hasAdditionalProperties);
  if (schema.allOf)
    return schema.allOf.some(hasAdditionalProperties);
  if (schema.not)
    return schema.not.some(hasAdditionalProperties);
  if (schema.type === "object") {
    const properties = schema.properties;
    if ("additionalProperties" in schema)
      return schema.additionalProperties;
    if ("patternProperties" in schema)
      return false;
    for (const key of Object.keys(properties)) {
      const property = properties[key];
      if (property.type === "object") {
        if (hasAdditionalProperties(property))
          return true;
      } else if (property.anyOf) {
        for (let i = 0; i < property.anyOf.length; i++)
          if (hasAdditionalProperties(property.anyOf[i]))
            return true;
      }
      return property.additionalProperties;
    }
    return false;
  }
  return false;
}, "hasAdditionalProperties");
var createReport = /* @__PURE__ */ __name(({
  context = "c",
  trace,
  addFn
}) => {
  if (!trace.length)
    return () => {
      return {
        resolveChild() {
          return () => {
          };
        },
        resolve() {
        }
      };
    };
  for (let i = 0; i < trace.length; i++)
    addFn(
      `let report${i}, reportChild${i}, reportErr${i}, reportErrChild${i}; let trace${i} = ${context}[ELYSIA_TRACE]?.[${i}] ?? trace[${i}](${context});
`
    );
  return (event, {
    name,
    total = 0
  } = {}) => {
    if (!name)
      name = "anonymous";
    const reporter = event === "error" ? "reportErr" : "report";
    for (let i = 0; i < trace.length; i++)
      addFn(
        `
${reporter}${i} = trace${i}.${event}({id,event: '${event}',name: '${name}',begin: performance.now(),total: ${total}})
`
      );
    return {
      resolve() {
        for (let i = 0; i < trace.length; i++)
          addFn(`
${reporter}${i}.resolve()
`);
      },
      resolveChild(name2) {
        for (let i = 0; i < trace.length; i++)
          addFn(
            `${reporter}Child${i} = ${reporter}${i}.resolveChild?.shift()?.({id,event: '${event}',name: '${name2}',begin: performance.now()})
`
          );
        return (binding2) => {
          for (let i = 0; i < trace.length; i++) {
            if (binding2)
              addFn(`
                             	if (${binding2} instanceof Error)
                    				${reporter}Child${i}?.(${binding2})
                           		else
                             		${reporter}Child${i}?.()
`);
            else
              addFn(`${reporter}Child${i}?.()
`);
          }
        };
      }
    };
  };
}, "createReport");
var composeValidationFactory = /* @__PURE__ */ __name(({
  injectResponse = "",
  normalize: normalize2 = false,
  validator
}) => ({
  composeValidation: (type, value = `c.${type}`) => `c.set.status = 422; throw new ValidationError('${type}', validator.${type}, ${value})`,
  composeResponseValidation: (name = "r") => {
    let code = "\n" + injectResponse + "\n";
    code += `if(${name} instanceof ElysiaCustomStatusResponse) {
			c.set.status = ${name}.code
			${name} = ${name}.response
		}

		const isResponse = ${name} instanceof Response

`;
    code += `switch(c.set.status) {
`;
    for (const [status, value] of Object.entries(
      validator.response
    )) {
      code += `	case ${status}:
				if (!isResponse) {
`;
      if (normalize2 && "Clean" in value && !hasAdditionalProperties(value))
        code += `${name} = validator.response['${status}'].Clean(${name})
`;
      code += `if(validator.response['${status}'].Check(${name}) === false) {
					c.set.status = 422

					throw new ValidationError('response', validator.response['${status}'], ${name})
				}

				c.set.status = ${status}
			}

			break

`;
    }
    code += "\n}\n";
    return code;
  }
}), "composeValidationFactory");
var KindSymbol = Symbol.for("TypeBox.Kind");
var hasProperty = /* @__PURE__ */ __name((expectedProperty, schema) => {
  if (!schema)
    return;
  if (schema.type === "object") {
    const properties = schema.properties;
    if (!properties)
      return false;
    for (const key of Object.keys(properties)) {
      const property = properties[key];
      if (expectedProperty in property)
        return true;
      if (property.type === "object") {
        if (hasProperty(expectedProperty, property))
          return true;
      } else if (property.anyOf) {
        for (let i = 0; i < property.anyOf.length; i++) {
          if (hasProperty(expectedProperty, property.anyOf[i]))
            return true;
        }
      }
    }
    return false;
  }
  return expectedProperty in schema;
}, "hasProperty");
var TransformSymbol = Symbol.for("TypeBox.Transform");
var hasTransform = /* @__PURE__ */ __name((schema) => {
  if (!schema)
    return;
  if (schema.type === "object" && schema.properties) {
    const properties = schema.properties;
    for (const key of Object.keys(properties)) {
      const property = properties[key];
      if (property.type === "object") {
        if (hasTransform(property))
          return true;
      } else if (property.anyOf) {
        for (let i = 0; i < property.anyOf.length; i++)
          if (hasTransform(property.anyOf[i]))
            return true;
      }
      const hasTransformSymbol = TransformSymbol in property;
      if (hasTransformSymbol)
        return true;
    }
    return false;
  }
  return TransformSymbol in schema || schema.properties && TransformSymbol in schema.properties;
}, "hasTransform");
var matchFnReturn = /(?:return|=>) \S+\(/g;
var isAsyncName = /* @__PURE__ */ __name((v) => {
  const fn = v?.fn ?? v;
  return fn.constructor.name === "AsyncFunction";
}, "isAsyncName");
var isAsync = /* @__PURE__ */ __name((v) => {
  const fn = v?.fn ?? v;
  if (fn.constructor.name === "AsyncFunction")
    return true;
  const literal = fn.toString();
  if (literal.includes("=> response.clone("))
    return false;
  if (literal.includes("await"))
    return true;
  if (literal.includes("async"))
    return true;
  return !!literal.match(matchFnReturn);
}, "isAsync");
var isGenerator = /* @__PURE__ */ __name((v) => {
  const fn = v?.fn ?? v;
  return fn.constructor.name === "AsyncGeneratorFunction" || fn.constructor.name === "GeneratorFunction";
}, "isGenerator");
var composeHandler = /* @__PURE__ */ __name(({
  app: app2,
  path: path2,
  method,
  localHook,
  hooks,
  validator,
  handler,
  allowMeta = false,
  inference
}) => {
  const isHandleFn = typeof handler === "function";
  if (!isHandleFn) {
    handler = mapResponse(handler, {
      // @ts-expect-error private property
      headers: app2.setHeaders ?? {}
    });
    if (hooks.parse.length === 0 && hooks.transform.length === 0 && hooks.beforeHandle.length === 0 && hooks.afterHandle.length === 0)
      return Function(
        "a",
        `return function () { return a.clone() }`
      )(handler);
  }
  const handle = isHandleFn ? `handler(c)` : `handler`;
  const hasAfterResponse = hooks.afterResponse.length > 0;
  const hasTrace = hooks.trace.length > 0;
  let fnLiteral = "";
  inference = sucrose(
    Object.assign(localHook, {
      handler
    }),
    inference
  );
  if (inference.server)
    fnLiteral += `
Object.defineProperty(c, 'server', {
			get: function() { return getServer() }
		})
`;
  if (inference.body)
    fnLiteral += `let isParsing = false
`;
  validator.createBody?.();
  validator.createQuery?.();
  validator.createHeaders?.();
  validator.createParams?.();
  validator.createCookie?.();
  validator.createResponse?.();
  const hasQuery = inference.query || !!validator.query;
  const hasBody = method !== "$INTERNALWS" && method !== "GET" && method !== "HEAD" && (inference.body || !!validator.body || hooks.parse.length);
  const defaultHeaders = app2.setHeaders;
  const hasDefaultHeaders = defaultHeaders && !!Object.keys(defaultHeaders).length;
  const hasHeaders = inference.headers || validator.headers;
  const hasCookie = inference.cookie || !!validator.cookie;
  const cookieValidator = hasCookie ? getCookieValidator({
    validator: validator.cookie,
    defaultConfig: app2.config.cookie,
    dynamic: !!app2.config.aot,
    // @ts-expect-error
    config: validator.cookie?.config ?? {},
    // @ts-expect-error
    models: app2.definitions.type
  }) : void 0;
  const cookieMeta = cookieValidator?.config;
  let encodeCookie = "";
  if (cookieMeta?.sign) {
    if (!cookieMeta.secrets)
      throw new Error(
        `t.Cookie required secret which is not set in (${method}) ${path2}.`
      );
    const secret = !cookieMeta.secrets ? void 0 : typeof cookieMeta.secrets === "string" ? cookieMeta.secrets : cookieMeta.secrets[0];
    encodeCookie += `const _setCookie = c.set.cookie
		if(_setCookie) {`;
    if (cookieMeta.sign === true) {
      encodeCookie += `for(const [key, cookie] of Object.entries(_setCookie)) {
				c.set.cookie[key].value = await signCookie(cookie.value, '${secret}')
			}`;
    } else
      for (const name of cookieMeta.sign) {
        encodeCookie += `if(_setCookie['${name}']?.value) { c.set.cookie['${name}'].value = await signCookie(_setCookie['${name}'].value, '${secret}') }
`;
      }
    encodeCookie += "}\n";
  }
  const normalize2 = app2.config.normalize;
  const { composeValidation, composeResponseValidation } = composeValidationFactory({
    normalize: normalize2,
    validator
  });
  if (hasHeaders) {
    fnLiteral += headersHasToJSON ? `c.headers = c.request.headers.toJSON()
` : `c.headers = {}
                for (const [key, value] of c.request.headers.entries())
					c.headers[key] = value
				`;
  }
  if (hasCookie) {
    const get = /* @__PURE__ */ __name((name, defaultValue) => {
      const value = cookieMeta?.[name] ?? defaultValue;
      if (!value)
        return typeof defaultValue === "string" ? `${name}: "${defaultValue}",` : `${name}: ${defaultValue},`;
      if (typeof value === "string")
        return `${name}: '${value}',`;
      if (value instanceof Date)
        return `${name}: new Date(${value.getTime()}),`;
      return `${name}: ${value},`;
    }, "get");
    const options = cookieMeta ? `{
			secrets: ${cookieMeta.secrets !== void 0 ? typeof cookieMeta.secrets === "string" ? `'${cookieMeta.secrets}'` : "[" + cookieMeta.secrets.reduce(
      (a, b) => a + `'${b}',`,
      ""
    ) + "]" : "undefined"},
			sign: ${cookieMeta.sign === true ? true : cookieMeta.sign !== void 0 ? "[" + cookieMeta.sign.reduce(
      (a, b) => a + `'${b}',`,
      ""
    ) + "]" : "undefined"},
			${get("domain")}
			${get("expires")}
			${get("httpOnly")}
			${get("maxAge")}
			${get("path", "/")}
			${get("priority")}
			${get("sameSite")}
			${get("secure")}
		}` : "undefined";
    if (hasHeaders)
      fnLiteral += `
c.cookie = await parseCookie(c.set, c.headers.cookie, ${options})
`;
    else
      fnLiteral += `
c.cookie = await parseCookie(c.set, c.request.headers.get('cookie'), ${options})
`;
  }
  if (hasQuery) {
    const destructured = [];
    if (validator.query && validator.query.schema.type === "object") {
      const properties = validator.query.schema.properties;
      if (!hasAdditionalProperties(validator.query))
        for (let [key, _value] of Object.entries(properties)) {
          let value = _value;
          if (value && TypeBoxSymbol.optional in value && value.type === "array" && value.items)
            value = value.items;
          const { type, anyOf } = value;
          const isArray = type === "array" || anyOf?.some(
            (v) => v.type === "string" && v.format === "ArrayString"
          );
          destructured.push({
            key,
            isArray,
            isNestedObjectArray: isArray && value.items?.type === "object" || !!value.items?.anyOf?.some(
              // @ts-expect-error
              (x) => x.type === "object" || x.type === "array"
            ),
            isObject: type === "object" || anyOf?.some(
              (v) => v.type === "string" && v.format === "ArrayString"
            ),
            anyOf: !!anyOf
          });
        }
    }
    if (!destructured.length) {
      fnLiteral += `if(c.qi === -1) {
				c.query = {}
			} else {
				c.query = parseQueryFromURL(c.url.slice(c.qi + 1))
			}`;
    } else {
      fnLiteral += `if(c.qi !== -1) {
				let url = '&' + decodeURIComponent(c.url.slice(c.qi + 1))

				${destructured.map(
        ({
          key,
          isArray,
          isObject: isObject2,
          isNestedObjectArray,
          anyOf
        }, index) => {
          const init2 = `${index === 0 ? "let" : ""} memory = url.indexOf('&${key}=')
							let a${index}
`;
          if (isArray)
            return init2 + (isNestedObjectArray ? `while (memory !== -1) {
											const start = memory + ${key.length + 2}
											memory = url.indexOf('&', start)

											if(a${index} === undefined)
												a${index} = ''
											else
												a${index} += ','

											let temp

											if(memory === -1) temp = url.slice(start).replace(/\\+|%20/g, ' ')
											else temp = url.slice(start, memory).replace(/\\+|%20/g, ' ')

											const charCode = temp.charCodeAt(0)
											if(charCode !== 91 && charCode !== 123)
												temp = '"' + temp + '"'

											a${index} += temp

											if(memory === -1) break

											memory = url.indexOf('&${key}=', memory)
											if(memory === -1) break
										}

										try {
										    if(a${index}.charCodeAt(0) === 91)
												a${index} = JSON.parse(a${index})
											else
												a${index} = JSON.parse('[' + a${index} + ']')
										} catch {}
` : `while (memory !== -1) {
											const start = memory + ${key.length + 2}
											memory = url.indexOf('&', start)

											if(a${index} === undefined)
												a${index} = []

											if(memory === -1) {
												a${index}.push(url.slice(start).replace(/\\+|%20/g, ' '))
												break
											}
											else a${index}.push(url.slice(start, memory).replace(/\\+|%20/g, ' '))

											memory = url.indexOf('&${key}=', memory)
											if(memory === -1) break
										}
`);
          if (isObject2)
            return init2 + `if (memory !== -1) {
										const start = memory + ${key.length + 2}
										memory = url.indexOf('&', start)

										if(memory === -1) a${index} = url.slice(start).replace(/\\+|%20/g, ' ')
										else a${index} = url.slice(start, memory).replace(/\\+|%20/g, ' ')

										if (a${index} !== undefined) {
											try {
												a${index} = JSON.parse(a${index})
											} catch {}
										}
									}`;
          return init2 + `if (memory !== -1) {
										const start = memory + ${key.length + 2}
										memory = url.indexOf('&', start)

										if(memory === -1) a${index} = url.slice(start).replace(/\\+|%20/g, ' ')
										else {
											a${index} = url.slice(start, memory).replace(/\\+|%20/g, ' ')

											${anyOf ? `
											let deepMemory = url.indexOf('&${key}=', memory)

											if(deepMemory !== -1) {
												a${index} = [a${index}]
												let first = true

												while(true) {
													const start = deepMemory + ${key.length + 2}
													if(first)
														first = false
													else
														deepMemory = url.indexOf('&', start)

													let value
													if(deepMemory === -1) value = url.slice(start).replace(/\\+|%20/g, ' ')
													else value = url.slice(start, deepMemory).replace(/\\+|%20/g, ' ')

													const vStart = value.charCodeAt(0)
													const vEnd = value.charCodeAt(value.length - 1)

													if((vStart === 91 && vEnd === 93) || (vStart === 123 && vEnd === 125))
														try {
															a${index}.push(JSON.parse(value))
														} catch {
														 	a${index}.push(value)
														}

													if(deepMemory === -1) break
												}
											}
												` : ""}
										}
									}`;
        }
      ).join("\n")}

				c.query = {
					${destructured.map(({ key }, index) => `'${key}': a${index}`).join(", ")}
				}
			} else {
				c.query = {}
			}`;
    }
  }
  if (hasTrace)
    fnLiteral += "\nconst id = c[ELYSIA_REQUEST_ID]\n";
  const report = createReport({
    trace: hooks.trace,
    addFn: (word) => {
      fnLiteral += word;
    }
  });
  fnLiteral += "\ntry {\n";
  const isAsyncHandler = typeof handler === "function" && isAsync(handler);
  const saveResponse = hasTrace || hooks.afterResponse.length > 0 ? "c.response = " : "";
  const maybeAsync = hasCookie || hasBody || isAsyncHandler || hooks.parse.length > 0 || hooks.afterHandle.some(isAsync) || hooks.beforeHandle.some(isAsync) || hooks.transform.some(isAsync) || hooks.mapResponse.some(isAsync);
  const maybeStream = (typeof handler === "function" ? isGenerator(handler) : false) || hooks.beforeHandle.some(isGenerator) || hooks.afterHandle.some(isGenerator) || hooks.transform.some(isGenerator);
  const hasSet = inference.cookie || inference.set || hasHeaders || hasTrace || validator.response || isHandleFn && hasDefaultHeaders || maybeStream;
  const requestMapper = `, c.request`;
  fnLiteral += `c.route = \`${path2}\`
`;
  const parseReporter = report("parse", {
    total: hooks.parse.length
  });
  if (hasBody) {
    const hasBodyInference = hooks.parse.length || inference.body || validator.body;
    fnLiteral += "isParsing = true\n";
    if (hooks.type && !hooks.parse.length) {
      switch (hooks.type) {
        case "json":
        case "application/json":
          if (isOptional(validator.body))
            fnLiteral += `try { c.body = await c.request.json() } catch {}`;
          else
            fnLiteral += `c.body = await c.request.json()`;
          break;
        case "text":
        case "text/plain":
          fnLiteral += `c.body = await c.request.text()
`;
          break;
        case "urlencoded":
        case "application/x-www-form-urlencoded":
          fnLiteral += `c.body = parseQuery(await c.request.text())
`;
          break;
        case "arrayBuffer":
        case "application/octet-stream":
          fnLiteral += `c.body = await c.request.arrayBuffer()
`;
          break;
        case "formdata":
        case "multipart/form-data":
          fnLiteral += `c.body = {}
`;
          if (isOptional(validator.body))
            fnLiteral += `let form; try { form = await c.request.formData() } catch {}`;
          else
            fnLiteral += `const form = await c.request.formData()`;
          fnLiteral += `
if(form)
						for (const key of form.keys()) {
							if (c.body[key])
								continue

							const value = form.getAll(key)
							if (value.length === 1)
								c.body[key] = value[0]
							else c.body[key] = value
						} else form = {}
`;
          break;
      }
    } else if (hasBodyInference) {
      fnLiteral += "\n";
      fnLiteral += hasHeaders ? `let contentType = c.headers['content-type']` : `let contentType = c.request.headers.get('content-type')`;
      fnLiteral += `
				if (contentType) {
					const index = contentType.indexOf(';')
					if (index !== -1) contentType = contentType.substring(0, index)

					c.contentType = contentType
`;
      if (hooks.parse.length) {
        fnLiteral += `let used = false
`;
        const reporter = report("parse", {
          total: hooks.parse.length
        });
        for (let i = 0; i < hooks.parse.length; i++) {
          const endUnit = reporter.resolveChild(
            hooks.parse[i].fn.name
          );
          const name = `bo${i}`;
          if (i !== 0)
            fnLiteral += `if(!used) {
`;
          fnLiteral += `let ${name} = parse[${i}](c, contentType)
`;
          fnLiteral += `if(${name} instanceof Promise) ${name} = await ${name}
`;
          fnLiteral += `if(${name} !== undefined) { c.body = ${name}; used = true }
`;
          endUnit();
          if (i !== 0)
            fnLiteral += `}`;
        }
        reporter.resolve();
      }
      fnLiteral += "\ndelete c.contentType\n";
      if (hooks.parse.length)
        fnLiteral += `if (!used) {`;
      if (hooks.type && !Array.isArray(hooks.type)) {
        switch (hooks.type) {
          case "json":
          case "application/json":
            if (isOptional(validator.body))
              fnLiteral += `try { c.body = await c.request.json() } catch {}`;
            else
              fnLiteral += `c.body = await c.request.json()`;
            break;
          case "text":
          case "text/plain":
            fnLiteral += `c.body = await c.request.text()
`;
            break;
          case "urlencoded":
          case "application/x-www-form-urlencoded":
            fnLiteral += `c.body = parseQuery(await c.request.text())
`;
            break;
          case "arrayBuffer":
          case "application/octet-stream":
            fnLiteral += `c.body = await c.request.arrayBuffer()
`;
            break;
          case "formdata":
          case "multipart/form-data":
            fnLiteral += `c.body = {}

							const form = await c.request.formData()
							for (const key of form.keys()) {
								if (c.body[key])
									continue

								const value = form.getAll(key)
								if (value.length === 1)
									c.body[key] = value[0]
								else c.body[key] = value
							}
`;
            break;
        }
      } else {
        fnLiteral += `
					switch (contentType) {
						case 'application/json':
							${isOptional(validator.body) ? "try { c.body = await c.request.json() } catch {}" : "c.body = await c.request.json()"}
							break

						case 'text/plain':
							c.body = await c.request.text()
							break

						case 'application/x-www-form-urlencoded':
							c.body = parseQuery(await c.request.text())
							break

						case 'application/octet-stream':
							c.body = await c.request.arrayBuffer();
							break

						case 'multipart/form-data':
							c.body = {}

							const form = await c.request.formData()
							for (const key of form.keys()) {
								if (c.body[key])
									continue

								const value = form.getAll(key)
								if (value.length === 1)
									c.body[key] = value[0]
								else c.body[key] = value
							}

							break
					}`;
      }
      if (hooks.parse.length)
        fnLiteral += `}`;
      fnLiteral += "}\n";
    }
    fnLiteral += "\nisParsing = false\n";
  }
  parseReporter.resolve();
  if (hooks?.transform) {
    const reporter = report("transform", {
      total: hooks.transform.length
    });
    if (hooks.transform.length)
      fnLiteral += "\nlet transformed\n";
    for (let i = 0; i < hooks.transform.length; i++) {
      const transform = hooks.transform[i];
      const endUnit = reporter.resolveChild(transform.fn.name);
      fnLiteral += isAsync(transform) ? `transformed = await transform[${i}](c)
` : `transformed = transform[${i}](c)
`;
      if (transform.subType === "mapDerive")
        fnLiteral += `if(transformed instanceof ElysiaCustomStatusResponse)
					throw transformed
				else {
					transformed.request = c.request
					transformed.store = c.store
					transformed.qi = c.qi
					transformed.path = c.path
					transformed.url = c.url
					transformed.redirect = c.redirect
					transformed.set = c.set
					transformed.error = c.error

					c = transformed
			}`;
      else
        fnLiteral += `if(transformed instanceof ElysiaCustomStatusResponse)
					throw transformed
				else
					Object.assign(c, transformed)
`;
      endUnit();
    }
    reporter.resolve();
  }
  if (validator) {
    fnLiteral += "\n";
    if (validator.headers) {
      if (normalize2 && "Clean" in validator.headers && !hasAdditionalProperties(validator.headers))
        fnLiteral += "c.headers = validator.headers.Clean(c.headers);\n";
      if (hasProperty("default", validator.headers.schema))
        for (const [key, value] of Object.entries(
          value_exports2.Default(
            // @ts-ignore
            validator.headers.schema,
            {}
          )
        )) {
          const parsed = typeof value === "object" ? JSON.stringify(value) : typeof value === "string" ? `'${value}'` : value;
          if (parsed !== void 0)
            fnLiteral += `c.headers['${key}'] ??= ${parsed}
`;
        }
      if (isOptional(validator.headers))
        fnLiteral += `if(isNotEmpty(c.headers)) {`;
      fnLiteral += `if(validator.headers.Check(c.headers) === false) {
				${composeValidation("headers")}
			}`;
      if (hasTransform(validator.headers.schema))
        fnLiteral += `c.headers = validator.headers.Decode(c.headers)
`;
      if (isOptional(validator.headers))
        fnLiteral += "}";
    }
    if (validator.params) {
      if (hasProperty("default", validator.params.schema))
        for (const [key, value] of Object.entries(
          value_exports2.Default(
            // @ts-ignore
            validator.params.schema,
            {}
          )
        )) {
          const parsed = typeof value === "object" ? JSON.stringify(value) : typeof value === "string" ? `'${value}'` : value;
          if (parsed !== void 0)
            fnLiteral += `c.params['${key}'] ??= ${parsed}
`;
        }
      fnLiteral += `if(validator.params.Check(c.params) === false) {
				${composeValidation("params")}
			}`;
      if (hasTransform(validator.params.schema))
        fnLiteral += `
c.params = validator.params.Decode(c.params)
`;
    }
    if (validator.query) {
      if (normalize2 && "Clean" in validator.query && !hasAdditionalProperties(validator.query))
        fnLiteral += "c.query = validator.query.Clean(c.query);\n";
      if (hasProperty("default", validator.query.schema))
        for (const [key, value] of Object.entries(
          value_exports2.Default(
            // @ts-ignore
            validator.query.schema,
            {}
          )
        )) {
          const parsed = typeof value === "object" ? JSON.stringify(value) : typeof value === "string" ? `'${value}'` : value;
          if (parsed !== void 0)
            fnLiteral += `if(c.query['${key}'] === undefined) c.query['${key}'] = ${parsed}
`;
        }
      if (isOptional(validator.query))
        fnLiteral += `if(isNotEmpty(c.query)) {`;
      fnLiteral += `if(validator.query.Check(c.query) === false) {
          		${composeValidation("query")}
			}`;
      if (hasTransform(validator.query.schema))
        fnLiteral += `
c.query = validator.query.Decode(Object.assign({}, c.query))
`;
      if (isOptional(validator.query))
        fnLiteral += `}`;
    }
    if (validator.body) {
      if (normalize2 && "Clean" in validator.body && !hasAdditionalProperties(validator.body))
        fnLiteral += "c.body = validator.body.Clean(c.body);\n";
      const doesHaveTransform = hasTransform(validator.body.schema);
      if (doesHaveTransform || isOptional(validator.body))
        fnLiteral += `
const isNotEmptyObject = c.body && (typeof c.body === "object" && isNotEmpty(c.body))
`;
      if (hasProperty("default", validator.body.schema)) {
        const value = value_exports2.Default(
          // @ts-expect-error private property
          validator.body.schema,
          // @ts-expect-error private property
          validator.body.schema.type === "object" ? {} : void 0
        );
        const parsed = typeof value === "object" ? JSON.stringify(value) : typeof value === "string" ? `'${value}'` : value;
        fnLiteral += `if(validator.body.Check(c.body) === false) {
					if (typeof c.body === 'object') {
						c.body = Object.assign(${parsed}, c.body)
					} else { c.body = ${parsed} }`;
        if (isOptional(validator.body))
          fnLiteral += `
					    if(isNotEmptyObject && validator.body.Check(c.body) === false) {
            				${composeValidation("body")}
             			}
                    }`;
        else
          fnLiteral += `
    				if(validator.body.Check(c.body) === false) {
        				${composeValidation("body")}
         			}
                }`;
      } else {
        if (isOptional(validator.body))
          fnLiteral += `if(isNotEmptyObject && validator.body.Check(c.body) === false) {
         			${composeValidation("body")}
          		}`;
        else
          fnLiteral += `if(validator.body.Check(c.body) === false) {
         			${composeValidation("body")}
          		}`;
      }
      if (doesHaveTransform)
        fnLiteral += `
if(isNotEmptyObject) c.body = validator.body.Decode(c.body)
`;
    }
    if (isNotEmpty(
      // @ts-ignore
      cookieValidator?.schema?.properties ?? // @ts-ignore
      cookieValidator?.schema?.schema ?? {}
    )) {
      fnLiteral += `const cookieValue = {}
    			for(const [key, value] of Object.entries(c.cookie))
    				cookieValue[key] = value.value
`;
      if (hasProperty("default", cookieValidator.schema))
        for (const [key, value] of Object.entries(
          value_exports2.Default(
            // @ts-ignore
            cookieValidator.schema,
            {}
          )
        )) {
          fnLiteral += `cookieValue['${key}'] = ${typeof value === "object" ? JSON.stringify(value) : value}
`;
        }
      if (isOptional(validator.cookie))
        fnLiteral += `if(isNotEmpty(c.cookie)) {`;
      fnLiteral += `if(validator.cookie.Check(cookieValue) === false) {
				${composeValidation("cookie", "cookieValue")}
			}`;
      if (hasTransform(validator.cookie.schema))
        fnLiteral += `
for(const [key, value] of Object.entries(validator.cookie.Decode(cookieValue)))
					c.cookie[key].value = value
`;
      if (isOptional(validator.cookie))
        fnLiteral += `}`;
    }
  }
  if (hooks?.beforeHandle) {
    const reporter = report("beforeHandle", {
      total: hooks.beforeHandle.length
    });
    let hasResolve = false;
    for (let i = 0; i < hooks.beforeHandle.length; i++) {
      const beforeHandle = hooks.beforeHandle[i];
      const endUnit = reporter.resolveChild(beforeHandle.fn.name);
      const returning = hasReturn(beforeHandle);
      const isResolver = beforeHandle.subType === "resolve" || beforeHandle.subType === "mapResolve";
      if (isResolver) {
        if (!hasResolve) {
          hasResolve = true;
          fnLiteral += "\nlet resolved\n";
        }
        fnLiteral += isAsync(beforeHandle) ? `resolved = await beforeHandle[${i}](c);
` : `resolved = beforeHandle[${i}](c);
`;
        if (beforeHandle.subType === "mapResolve")
          fnLiteral += `if(resolved instanceof ElysiaCustomStatusResponse)
						throw resolved
					else {
						resolved.request = c.request
						resolved.store = c.store
						resolved.qi = c.qi
						resolved.path = c.path
						resolved.url = c.url
						resolved.redirect = c.redirect
						resolved.set = c.set
						resolved.error = c.error

						c = resolved
					}`;
        else
          fnLiteral += `if(resolved instanceof ElysiaCustomStatusResponse)
						throw resolved
					else
						Object.assign(c, resolved)
`;
      } else if (!returning) {
        fnLiteral += isAsync(beforeHandle) ? `await beforeHandle[${i}](c);
` : `beforeHandle[${i}](c);
`;
        endUnit();
      } else {
        fnLiteral += isAsync(beforeHandle) ? `be = await beforeHandle[${i}](c);
` : `be = beforeHandle[${i}](c);
`;
        endUnit("be");
        fnLiteral += `if(be !== undefined) {
`;
        reporter.resolve();
        if (hooks.afterHandle?.length) {
          report("handle", {
            name: isHandleFn ? handler.name : void 0
          }).resolve();
          const reporter2 = report("afterHandle", {
            total: hooks.afterHandle.length
          });
          for (let i2 = 0; i2 < hooks.afterHandle.length; i2++) {
            const hook = hooks.afterHandle[i2];
            const returning2 = hasReturn(hook);
            const endUnit2 = reporter2.resolveChild(hook.fn.name);
            fnLiteral += `c.response = be
`;
            if (!returning2) {
              fnLiteral += isAsync(hook.fn) ? `await afterHandle[${i2}](c, be)
` : `afterHandle[${i2}](c, be)
`;
            } else {
              fnLiteral += isAsync(hook.fn) ? `af = await afterHandle[${i2}](c)
` : `af = afterHandle[${i2}](c)
`;
              fnLiteral += `if(af !== undefined) { c.response = be = af }
`;
            }
            endUnit2("af");
          }
          reporter2.resolve();
        }
        if (validator.response)
          fnLiteral += composeResponseValidation("be");
        const mapResponseReporter = report("mapResponse", {
          total: hooks.mapResponse.length
        });
        if (hooks.mapResponse.length) {
          fnLiteral += `
c.response = be
`;
          for (let i2 = 0; i2 < hooks.mapResponse.length; i2++) {
            const mapResponse2 = hooks.mapResponse[i2];
            const endUnit2 = mapResponseReporter.resolveChild(
              mapResponse2.fn.name
            );
            fnLiteral += `
if(mr === undefined) {
							mr = ${isAsyncName(mapResponse2) ? "await" : ""} onMapResponse[${i2}](c)
							if(mr !== undefined) be = c.response = mr
						}
`;
            endUnit2();
          }
        }
        mapResponseReporter.resolve();
        fnLiteral += encodeCookie;
        fnLiteral += `return mapEarlyResponse(${saveResponse} be, c.set ${requestMapper})}
`;
      }
    }
    reporter.resolve();
  }
  if (hooks?.afterHandle.length) {
    const handleReporter = report("handle", {
      name: isHandleFn ? handler.name : void 0
    });
    if (hooks.afterHandle.length)
      fnLiteral += isAsyncHandler ? `let r = c.response = await ${handle};
` : `let r = c.response = ${handle};
`;
    else
      fnLiteral += isAsyncHandler ? `let r = await ${handle};
` : `let r = ${handle};
`;
    handleReporter.resolve();
    const reporter = report("afterHandle", {
      total: hooks.afterHandle.length
    });
    for (let i = 0; i < hooks.afterHandle.length; i++) {
      const hook = hooks.afterHandle[i];
      const returning = hasReturn(hook);
      const endUnit = reporter.resolveChild(hook.fn.name);
      if (!returning) {
        fnLiteral += isAsync(hook.fn) ? `await afterHandle[${i}](c)
` : `afterHandle[${i}](c)
`;
        endUnit();
      } else {
        fnLiteral += isAsync(hook.fn) ? `af = await afterHandle[${i}](c)
` : `af = afterHandle[${i}](c)
`;
        endUnit("af");
        if (validator.response) {
          fnLiteral += `if(af !== undefined) {`;
          reporter.resolve();
          fnLiteral += composeResponseValidation("af");
          fnLiteral += `c.response = af }`;
        } else {
          fnLiteral += `if(af !== undefined) {`;
          reporter.resolve();
          fnLiteral += `c.response = af}
`;
        }
      }
    }
    reporter.resolve();
    fnLiteral += `r = c.response
`;
    if (validator.response)
      fnLiteral += composeResponseValidation();
    fnLiteral += encodeCookie;
    const mapResponseReporter = report("mapResponse", {
      total: hooks.mapResponse.length
    });
    if (hooks.mapResponse.length) {
      for (let i = 0; i < hooks.mapResponse.length; i++) {
        const mapResponse2 = hooks.mapResponse[i];
        const endUnit = mapResponseReporter.resolveChild(
          mapResponse2.fn.name
        );
        fnLiteral += `
mr = ${isAsyncName(mapResponse2) ? "await" : ""} onMapResponse[${i}](c)
				if(mr !== undefined) r = c.response = mr
`;
        endUnit();
      }
    }
    mapResponseReporter.resolve();
    if (hasSet)
      fnLiteral += `return mapResponse(${saveResponse} r, c.set ${requestMapper})
`;
    else
      fnLiteral += `return mapCompactResponse(${saveResponse} r ${requestMapper})
`;
  } else {
    const handleReporter = report("handle", {
      name: isHandleFn ? handler.name : void 0
    });
    if (validator.response || hooks.mapResponse.length) {
      fnLiteral += isAsyncHandler ? `let r = await ${handle};
` : `let r = ${handle};
`;
      handleReporter.resolve();
      if (validator.response)
        fnLiteral += composeResponseValidation();
      report("afterHandle").resolve();
      const mapResponseReporter = report("mapResponse", {
        total: hooks.mapResponse.length
      });
      if (hooks.mapResponse.length) {
        fnLiteral += "\nc.response = r\n";
        for (let i = 0; i < hooks.mapResponse.length; i++) {
          const mapResponse2 = hooks.mapResponse[i];
          const endUnit = mapResponseReporter.resolveChild(
            mapResponse2.fn.name
          );
          fnLiteral += `
if(mr === undefined) {
						mr = ${isAsyncName(mapResponse2) ? "await" : ""} onMapResponse[${i}](c)
    					if(mr !== undefined) r = c.response = mr
					}
`;
          endUnit();
        }
      }
      mapResponseReporter.resolve();
      fnLiteral += encodeCookie;
      if (handler instanceof Response) {
        fnLiteral += inference.set ? `if(
					isNotEmpty(c.set.headers) ||
					c.set.status !== 200 ||
					c.set.redirect ||
					c.set.cookie
				)
					return mapResponse(${saveResponse} ${handle}.clone(), c.set ${requestMapper})
				else
					return ${handle}.clone()` : `return ${handle}.clone()`;
        fnLiteral += "\n";
      } else if (hasSet)
        fnLiteral += `return mapResponse(${saveResponse} r, c.set ${requestMapper})
`;
      else
        fnLiteral += `return mapCompactResponse(${saveResponse} r ${requestMapper})
`;
    } else if (hasCookie || hasTrace) {
      fnLiteral += isAsyncHandler ? `let r = await ${handle};
` : `let r = ${handle};
`;
      handleReporter.resolve();
      report("afterHandle").resolve();
      const mapResponseReporter = report("mapResponse", {
        total: hooks.mapResponse.length
      });
      if (hooks.mapResponse.length) {
        fnLiteral += "\nc.response = r\n";
        for (let i = 0; i < hooks.mapResponse.length; i++) {
          const mapResponse2 = hooks.mapResponse[i];
          const endUnit = mapResponseReporter.resolveChild(
            mapResponse2.fn.name
          );
          fnLiteral += `
if(mr === undefined) {
							mr = ${isAsyncName(mapResponse2) ? "await" : ""} onMapResponse[${i}](c)
    						if(mr !== undefined) r = c.response = mr
						}
`;
          endUnit();
        }
      }
      mapResponseReporter.resolve();
      fnLiteral += encodeCookie;
      if (hasSet)
        fnLiteral += `return mapResponse(${saveResponse} r, c.set ${requestMapper})
`;
      else
        fnLiteral += `return mapCompactResponse(${saveResponse} r ${requestMapper})
`;
    } else {
      handleReporter.resolve();
      const handled = isAsyncHandler ? `await ${handle}` : handle;
      report("afterHandle").resolve();
      if (handler instanceof Response) {
        fnLiteral += inference.set ? `if(
					isNotEmpty(c.set.headers) ||
					c.set.status !== 200 ||
					c.set.redirect ||
					c.set.cookie
				)
					return mapResponse(${saveResponse} ${handle}.clone(), c.set ${requestMapper})
				else
					return ${handle}.clone()` : `return ${handle}.clone()`;
        fnLiteral += "\n";
      } else if (hasSet)
        fnLiteral += `return mapResponse(${saveResponse} ${handled}, c.set ${requestMapper})
`;
      else
        fnLiteral += `return mapCompactResponse(${saveResponse} ${handled} ${requestMapper})
`;
    }
  }
  fnLiteral += `
} catch(error) {`;
  if (hasBody)
    fnLiteral += `
if(isParsing) error = new ParseError()
`;
  if (!maybeAsync)
    fnLiteral += `
return (async () => {
`;
  fnLiteral += `
const set = c.set
if (!set.status || set.status < 300) set.status = error?.status || 500
`;
  if (hasTrace)
    for (let i = 0; i < hooks.trace.length; i++)
      fnLiteral += `report${i}?.resolve(error);reportChild${i}?.(error);
`;
  const errorReporter = report("error", {
    total: hooks.error.length
  });
  if (hooks.error.length) {
    fnLiteral += `
				c.error = error
				if(error instanceof TypeBoxError) {
					c.code = "VALIDATION"
					c.set.status = 422
				} else
					c.code = error.code ?? error[ERROR_CODE] ?? "UNKNOWN"
				let er
			`;
    for (let i = 0; i < hooks.error.length; i++) {
      const endUnit = errorReporter.resolveChild(hooks.error[i].fn.name);
      if (isAsync(hooks.error[i]))
        fnLiteral += `
er = await handleErrors[${i}](c)
`;
      else
        fnLiteral += `
er = handleErrors[${i}](c)
if (er instanceof Promise) er = await er
`;
      endUnit();
      const mapResponseReporter = report("mapResponse", {
        total: hooks.mapResponse.length
      });
      if (hooks.mapResponse.length) {
        for (let i2 = 0; i2 < hooks.mapResponse.length; i2++) {
          const mapResponse2 = hooks.mapResponse[i2];
          const endUnit2 = mapResponseReporter.resolveChild(
            mapResponse2.fn.name
          );
          fnLiteral += `
c.response = er

							er = ${isAsyncName(mapResponse2) ? "await" : ""} onMapResponse[${i2}](c)
							if(er instanceof Promise) er = await er
`;
          endUnit2();
        }
      }
      mapResponseReporter.resolve();
      fnLiteral += `er = mapEarlyResponse(er, set ${requestMapper})
`;
      fnLiteral += `if (er) {`;
      if (hasTrace) {
        for (let i2 = 0; i2 < hooks.trace.length; i2++)
          fnLiteral += `
report${i2}.resolve()
`;
        errorReporter.resolve();
      }
      fnLiteral += `return er
}
`;
    }
  }
  errorReporter.resolve();
  fnLiteral += `return handleError(c, error, true)
`;
  if (!maybeAsync)
    fnLiteral += "})()";
  fnLiteral += "}";
  if (hasAfterResponse || hasTrace) {
    fnLiteral += ` finally { `;
    if (!maybeAsync)
      fnLiteral += ";(async () => {";
    const reporter = report("afterResponse", {
      total: hooks.afterResponse.length
    });
    if (hasAfterResponse) {
      for (let i = 0; i < hooks.afterResponse.length; i++) {
        const endUnit = reporter.resolveChild(
          hooks.afterResponse[i].fn.name
        );
        fnLiteral += `
await afterResponse[${i}](c);
`;
        endUnit();
      }
    }
    reporter.resolve();
    if (!maybeAsync)
      fnLiteral += "})();";
    fnLiteral += `}`;
  }
  fnLiteral = `const {
		handler,
		handleError,
		hooks: {
			transform,
			resolve,
			beforeHandle,
			afterHandle,
			mapResponse: onMapResponse,
			parse,
			error: handleErrors,
			afterResponse,
			trace: _trace
		},
		validator,
		utils: {
			mapResponse,
			mapCompactResponse,
			mapEarlyResponse,
			parseQuery,
			parseQueryFromURL,
			isNotEmpty
		},
		error: {
			NotFoundError,
			ValidationError,
			InternalServerError,
			ParseError
		},
		schema,
		definitions,
		ERROR_CODE,
		parseCookie,
		signCookie,
		decodeURIComponent,
		ElysiaCustomStatusResponse,
		ELYSIA_TRACE,
		ELYSIA_REQUEST_ID,
		getServer,
		TypeBoxError
	} = hooks

	const trace = _trace.map(x => typeof x === 'function' ? x : x.fn)

	return ${maybeAsync ? "async" : ""} function handle(c) {
		${hooks.beforeHandle.length ? "let be" : ""}
		${hooks.afterHandle.length ? "let af" : ""}
		${hooks.mapResponse.length ? "let mr" : ""}

		${allowMeta ? "c.schema = schema; c.defs = definitions" : ""}
		${fnLiteral}
	}`;
  try {
    return Function(
      "hooks",
      fnLiteral
    )({
      handler,
      hooks: lifeCycleToFn(hooks),
      validator,
      // @ts-expect-error
      handleError: app2.handleError,
      utils: {
        mapResponse,
        mapCompactResponse,
        mapEarlyResponse,
        parseQuery,
        parseQueryFromURL,
        isNotEmpty
      },
      error: {
        NotFoundError,
        ValidationError,
        InternalServerError,
        ParseError
      },
      schema: app2.router.history,
      // @ts-expect-error
      definitions: app2.definitions.type,
      ERROR_CODE,
      parseCookie,
      signCookie,
      decodeURIComponent: import_fast_decode_uri_component3.default,
      ElysiaCustomStatusResponse,
      ELYSIA_TRACE,
      ELYSIA_REQUEST_ID,
      // @ts-expect-error private property
      getServer: () => app2.getServer(),
      TypeBoxError
    });
  } catch {
    const debugHooks = lifeCycleToFn(hooks);
    console.log("[Composer] failed to generate optimized handler");
    console.log(
      "Please report the following to SaltyAom privately as it may include sensitive information about your codebase:"
    );
    console.log("---");
    console.log({
      handler: typeof handler === "function" ? handler.toString() : handler,
      hooks: {
        ...debugHooks,
        // @ts-expect-error
        transform: debugHooks?.transform?.map?.((x) => x.toString()),
        // @ts-expect-error
        resolve: debugHooks?.resolve?.map?.((x) => x.toString()),
        // @ts-expect-error
        beforeHandle: debugHooks?.beforeHandle?.map?.(
          (x) => x.toString()
        ),
        // @ts-expect-error
        afterHandle: debugHooks?.afterHandle?.map?.(
          (x) => x.toString()
        ),
        // @ts-expect-error
        mapResponse: debugHooks?.mapResponse?.map?.(
          (x) => x.toString()
        ),
        // @ts-expect-error
        parse: debugHooks?.parse?.map?.((x) => x.toString()),
        // @ts-expect-error
        error: debugHooks?.error?.map?.((x) => x.toString()),
        // @ts-expect-error
        afterResponse: debugHooks?.afterResponse?.map?.(
          (x) => x.toString()
        ),
        // @ts-expect-error
        stop: debugHooks?.stop?.map?.((x) => x.toString())
      },
      validator,
      // @ts-expect-error
      definitions: app2.definitions.type
    });
    console.log("---");
    process.exit(1);
  }
}, "composeHandler");
var composeGeneralHandler = /* @__PURE__ */ __name((app2) => {
  const standardHostname = app2.config.handler?.standardHostname ?? true;
  let decoratorsLiteral = "";
  let fnLiteral = "";
  const defaultHeaders = app2.setHeaders;
  for (const key of Object.keys(app2.singleton.decorator))
    decoratorsLiteral += `,${key}: app.singleton.decorator.${key}`;
  const router = app2.router;
  const hasTrace = app2.event.trace.length > 0;
  let findDynamicRoute = `
	const route = router.find(request.method, path) ${router.http.root.ALL ? '?? router.find("ALL", path)' : ""}

	if (route === null)
		return ${app2.event.error.length ? `app.handleError(ctx, notFound)` : app2.event.request.length ? `new Response(error404Message, {
					status: ctx.set.status === 200 ? 404 : ctx.set.status,
					headers: ctx.set.headers
				})` : `error404.clone()`}

	ctx.params = route.params
`;
  findDynamicRoute += `if(route.store.handler) return route.store.handler(ctx)
	return (route.store.handler = route.store.compile())(ctx)
`;
  let switchMap = ``;
  for (const [path2, { code, all, static: staticFn }] of Object.entries(
    router.static.http.map
  )) {
    if (staticFn)
      switchMap += `case '${path2}':
switch(request.method) {
${code}
${all ?? `default: break map`}}

`;
    switchMap += `case '${path2}':
switch(request.method) {
${code}
${all ?? `default: break map`}}

`;
  }
  const maybeAsync = app2.event.request.some(isAsync);
  fnLiteral += `const {
		app,
		mapEarlyResponse,
		NotFoundError,
		randomId,
		handleError,
		error,
		redirect,
		ELYSIA_TRACE,
		ELYSIA_REQUEST_ID,
		getServer
	} = data

	const store = app.singleton.store
	const staticRouter = app.router.static.http
	const st = staticRouter.handlers
	const wsRouter = app.router.ws
	const router = app.router.http
	const trace = app.event.trace.map(x => typeof x === 'function' ? x : x.fn)

	const notFound = new NotFoundError()
	const hoc = app.extender.higherOrderFunctions.map(x => x.fn)

	${app2.event.request.length ? `const onRequest = app.event.request.map(x => x.fn)` : ""}
	${app2.event.error.length ? "" : `
const error404Message = notFound.message.toString()
	const error404 = new Response(error404Message, { status: 404 });
`}

	${app2.event.trace.length ? `const ${app2.event.trace.map((_, i) => `tr${i} = app.event.trace[${i}].fn`).join(",")}` : ""}

	${maybeAsync ? "async" : ""} function map(request) {
`;
  if (app2.event.request.length)
    fnLiteral += `let re`;
  fnLiteral += `
const url = request.url
		const s = url.indexOf('/', ${standardHostname ? 11 : 7})
		const qi = url.indexOf('?', s + 1)
		let path
		if(qi === -1)
			path = url.substring(s)
		else
			path = url.substring(s, qi)
`;
  fnLiteral += `${hasTrace ? "const id = randomId()" : ""}
		const ctx = {
			request,
			store,
			qi,
			path,
			url,
			redirect,
			set: {
				headers: ${Object.keys(defaultHeaders ?? {}).length ? "Object.assign({}, app.setHeaders)" : "{}"},
				status: 200
			},
			error
			${// @ts-expect-error private property
  app2.inference.server ? `, get server() {
							return getServer()
						}` : ""}
			${hasTrace ? ",[ELYSIA_REQUEST_ID]: id" : ""}
			${decoratorsLiteral}
		}
`;
  if (app2.event.trace.length)
    fnLiteral += `
ctx[ELYSIA_TRACE] = [${app2.event.trace.map((_, i) => `tr${i}(ctx)`).join(",")}]
`;
  const report = createReport({
    context: "ctx",
    trace: app2.event.trace,
    addFn(word) {
      fnLiteral += word;
    }
  });
  const reporter = report("request", {
    attribute: "ctx",
    total: app2.event.request.length
  });
  if (app2.event.request.length) {
    fnLiteral += `
 try {
`;
    for (let i = 0; i < app2.event.request.length; i++) {
      const hook = app2.event.request[i];
      const withReturn = hasReturn(hook);
      const maybeAsync2 = isAsync(hook);
      const endUnit = reporter.resolveChild(app2.event.request[i].fn.name);
      if (withReturn) {
        fnLiteral += `re = mapEarlyResponse(
					${maybeAsync2 ? "await" : ""} onRequest[${i}](ctx),
					ctx.set,
					request
				)
`;
        endUnit("re");
        fnLiteral += `if(re !== undefined) return re
`;
      } else {
        fnLiteral += `${maybeAsync2 ? "await" : ""} onRequest[${i}](ctx)
`;
        endUnit();
      }
    }
    fnLiteral += `} catch (error) {
			return app.handleError(ctx, error)
		}`;
  }
  reporter.resolve();
  const wsPaths = app2.router.static.ws;
  const wsRouter = app2.router.ws;
  if (Object.keys(wsPaths).length || wsRouter.history.length) {
    fnLiteral += `
			if(request.method === 'GET') {
				switch(path) {`;
    for (const [path2, index] of Object.entries(wsPaths)) {
      fnLiteral += `
					case '${path2}':
						if(request.headers.get('upgrade') === 'websocket')
							return st[${index}](ctx)

						break`;
    }
    fnLiteral += `
				default:
					if(request.headers.get('upgrade') === 'websocket') {
						const route = wsRouter.find('ws', path)

						if(route) {
							ctx.params = route.params

							if(route.store.handler)
							    return route.store.handler(ctx)

							return (route.store.handler = route.store.compile())(ctx)
						}
					}

					break
			}
		}
`;
  }
  fnLiteral += `
		map: switch(path) {
			${switchMap}

			default:
				break
		}

		${findDynamicRoute}
	}
`;
  if (app2.extender.higherOrderFunctions.length) {
    let handler = "map";
    for (let i = 0; i < app2.extender.higherOrderFunctions.length; i++)
      handler = `hoc[${i}](${handler}, request)`;
    fnLiteral += `return function hocMap(request) { return ${handler}(request) }`;
  } else
    fnLiteral += `return map`;
  const handleError = composeErrorHandler(app2);
  app2.handleError = handleError;
  return Function(
    "data",
    fnLiteral
  )({
    app: app2,
    mapEarlyResponse,
    NotFoundError,
    randomId,
    handleError,
    error,
    redirect,
    ELYSIA_TRACE,
    ELYSIA_REQUEST_ID,
    // @ts-expect-error private property
    getServer: () => app2.getServer()
  });
}, "composeGeneralHandler");
var composeErrorHandler = /* @__PURE__ */ __name((app2) => {
  const hooks = app2.event;
  let fnLiteral = "";
  fnLiteral += `const {
		app: { event: { error: onErrorContainer, afterResponse: resContainer, mapResponse: _onMapResponse, trace: _trace } },
		mapResponse,
		ERROR_CODE,
		ElysiaCustomStatusResponse,
		ELYSIA_TRACE,
		ELYSIA_REQUEST_ID
	} = inject

	const trace = _trace.map(x => typeof x === 'function' ? x : x.fn)
	const onMapResponse = []

	for(let i = 0; i < _onMapResponse.length; i++)
		onMapResponse.push(_onMapResponse[i].fn ?? _onMapResponse[i])

	delete _onMapResponse

	const onError = onErrorContainer.map(x => x.fn)
	const res = resContainer.map(x => x.fn)

	return ${app2.event.error.find(isAsync) || app2.event.mapResponse.find(isAsync) ? "async" : ""} function(context, error, skipGlobal) {`;
  const hasTrace = app2.event.trace.length > 0;
  if (hasTrace)
    fnLiteral += "\nconst id = context[ELYSIA_REQUEST_ID]\n";
  const report = createReport({
    context: "context",
    trace: hooks.trace,
    addFn: (word) => {
      fnLiteral += word;
    }
  });
  fnLiteral += `
		const set = context.set
		let r

		if(!context.code)
			context.code = error.code ?? error[ERROR_CODE]

		if(!(context.error instanceof Error))
			context.error = error

		if(error instanceof ElysiaCustomStatusResponse) {
			error.status = error.code
			error.message = error.response
		}
`;
  const saveResponse = hasTrace || hooks.afterResponse.length > 0 || hooks.afterResponse.length > 0 ? "context.response = " : "";
  for (let i = 0; i < app2.event.error.length; i++) {
    const handler = app2.event.error[i];
    const response = `${isAsync(handler) ? "await " : ""}onError[${i}](context)`;
    fnLiteral += "\nif(skipGlobal !== true) {\n";
    if (hasReturn(handler)) {
      fnLiteral += `r = ${response}; if(r !== undefined) {
				if(r instanceof Response) return r

				if(r instanceof ElysiaCustomStatusResponse) {
					error.status = error.code
					error.message = error.response
				}

				if(set.status === 200) set.status = error.status
`;
      const mapResponseReporter2 = report("mapResponse", {
        total: hooks.mapResponse.length,
        name: "context"
      });
      if (hooks.mapResponse.length) {
        for (let i2 = 0; i2 < hooks.mapResponse.length; i2++) {
          const mapResponse2 = hooks.mapResponse[i2];
          const endUnit = mapResponseReporter2.resolveChild(
            mapResponse2.fn.name
          );
          fnLiteral += `
context.response = r
						r = ${isAsyncName(mapResponse2) ? "await" : ""} onMapResponse[${i2}](context)
`;
          endUnit();
        }
      }
      mapResponseReporter2.resolve();
      fnLiteral += `return mapResponse(${saveResponse} r, set, context.request)}
`;
    } else
      fnLiteral += response + "\n";
    fnLiteral += "\n}\n";
  }
  fnLiteral += `if(error.constructor.name === "ValidationError" || error.constructor.name === "TransformDecodeError") {
	    const reportedError = error.error ?? error
		set.status = reportedError.status ?? 422
		return new Response(
			reportedError.message,
			{
				headers: Object.assign(
					{ 'content-type': 'application/json'},
					set.headers
				),
				status: set.status
			}
		)
	} else {
		if(error.code && typeof error.status === "number")
			return new Response(
				error.message,
				{ headers: set.headers, status: error.status }
			)
`;
  const mapResponseReporter = report("mapResponse", {
    total: hooks.mapResponse.length,
    name: "context"
  });
  if (hooks.mapResponse.length) {
    for (let i = 0; i < hooks.mapResponse.length; i++) {
      const mapResponse2 = hooks.mapResponse[i];
      const endUnit = mapResponseReporter.resolveChild(
        mapResponse2.fn.name
      );
      fnLiteral += `
context.response = error
			error = ${isAsyncName(mapResponse2) ? "await" : ""} onMapResponse[${i}](context)
`;
      endUnit();
    }
  }
  mapResponseReporter.resolve();
  fnLiteral += `
return mapResponse(${saveResponse} error, set, context.request)
}
}`;
  return Function(
    "inject",
    fnLiteral
  )({
    app: app2,
    mapResponse,
    ERROR_CODE,
    ElysiaCustomStatusResponse,
    ELYSIA_TRACE,
    ELYSIA_REQUEST_ID
  });
}, "composeErrorHandler");
var createDynamicHandler = /* @__PURE__ */ __name((app2) => async (request) => {
  const url = request.url, s = url.indexOf("/", 11), qi = url.indexOf("?", s + 1), path2 = qi === -1 ? url.substring(s) : url.substring(s, qi);
  const set2 = {
    cookie: {},
    status: 200,
    headers: {}
  };
  const context = Object.assign(
    {},
    // @ts-expect-error
    app2.singleton.decorator,
    {
      set: set2,
      // @ts-expect-error
      store: app2.singleton.store,
      request,
      path: path2,
      qi,
      redirect
    }
  );
  try {
    for (let i = 0; i < app2.event.request.length; i++) {
      const onRequest = app2.event.request[i].fn;
      let response2 = onRequest(context);
      if (response2 instanceof Promise)
        response2 = await response2;
      response2 = mapEarlyResponse(response2, set2);
      if (response2)
        return context.response = response2;
    }
    const handler = app2.router.dynamic.find(request.method, path2) ?? app2.router.dynamic.find("ALL", path2);
    if (!handler)
      throw new NotFoundError();
    const { handle, hooks, validator, content } = handler.store;
    let body;
    if (request.method !== "GET" && request.method !== "HEAD") {
      if (content) {
        switch (content) {
          case "application/json":
            body = await request.json();
            break;
          case "text/plain":
            body = await request.text();
            break;
          case "application/x-www-form-urlencoded":
            body = parseQuery(await request.text());
            break;
          case "application/octet-stream":
            body = await request.arrayBuffer();
            break;
          case "multipart/form-data":
            body = {};
            const form2 = await request.formData();
            for (const key of form2.keys()) {
              if (body[key])
                continue;
              const value = form2.getAll(key);
              if (value.length === 1)
                body[key] = value[0];
              else
                body[key] = value;
            }
            break;
        }
      } else {
        let contentType = request.headers.get("content-type");
        if (contentType) {
          const index = contentType.indexOf(";");
          if (index !== -1)
            contentType = contentType.slice(0, index);
          context.contentType = contentType;
          for (let i = 0; i < hooks.parse.length; i++) {
            const hook = hooks.parse[i].fn;
            let temp = hook(context, contentType);
            if (temp instanceof Promise)
              temp = await temp;
            if (temp) {
              body = temp;
              break;
            }
          }
          delete context.contentType;
          if (body === void 0) {
            switch (contentType) {
              case "application/json":
                body = await request.json();
                break;
              case "text/plain":
                body = await request.text();
                break;
              case "application/x-www-form-urlencoded":
                body = parseQuery(await request.text());
                break;
              case "application/octet-stream":
                body = await request.arrayBuffer();
                break;
              case "multipart/form-data":
                body = {};
                const form2 = await request.formData();
                for (const key of form2.keys()) {
                  if (body[key])
                    continue;
                  const value = form2.getAll(key);
                  if (value.length === 1)
                    body[key] = value[0];
                  else
                    body[key] = value;
                }
                break;
            }
          }
        }
      }
    }
    context.body = body;
    context.params = handler?.params || void 0;
    context.query = qi === -1 ? {} : parseQueryFromURL(url.substring(qi + 1));
    context.headers = {};
    for (const [key, value] of request.headers.entries())
      context.headers[key] = value;
    const cookieMeta = Object.assign(
      {},
      app2.config?.cookie,
      // @ts-expect-error
      validator?.cookie?.config
    );
    const cookieHeaderValue = request.headers.get("cookie");
    context.cookie = await parseCookie(
      context.set,
      cookieHeaderValue,
      cookieMeta ? {
        secrets: cookieMeta.secrets !== void 0 ? typeof cookieMeta.secrets === "string" ? cookieMeta.secrets : cookieMeta.secrets.join(",") : void 0,
        sign: cookieMeta.sign === true ? true : cookieMeta.sign !== void 0 ? typeof cookieMeta.sign === "string" ? cookieMeta.sign : cookieMeta.sign.join(",") : void 0
      } : void 0
    );
    for (let i = 0; i < hooks.transform.length; i++) {
      const hook = hooks.transform[i];
      const operation = hook.fn(context);
      if (hook.subType === "derive") {
        if (operation instanceof Promise)
          Object.assign(context, await operation);
        else
          Object.assign(context, operation);
      } else if (operation instanceof Promise)
        await operation;
    }
    if (validator) {
      if (validator.createHeaders?.()) {
        const _header = {};
        for (const key in request.headers)
          _header[key] = request.headers.get(key);
        if (validator.headers.Check(_header) === false)
          throw new ValidationError(
            "header",
            validator.headers,
            _header
          );
      } else if (validator.headers?.Decode)
        context.headers = validator.headers.Decode(context.headers);
      if (validator.createParams?.()?.Check(context.params) === false) {
        throw new ValidationError(
          "params",
          validator.params,
          context.params
        );
      } else if (validator.params?.Decode)
        context.params = validator.params.Decode(context.params);
      if (validator.createQuery?.()?.Check(context.query) === false)
        throw new ValidationError(
          "query",
          validator.query,
          context.query
        );
      else if (validator.query?.Decode)
        context.query = validator.query.Decode(context.query);
      if (validator.createCookie?.()) {
        let cookieValue = {};
        for (const [key, value] of Object.entries(context.cookie))
          cookieValue[key] = value.value;
        if (validator.cookie.Check(cookieValue) === false)
          throw new ValidationError(
            "cookie",
            validator.cookie,
            cookieValue
          );
        else if (validator.cookie?.Decode)
          cookieValue = validator.cookie.Decode(
            cookieValue
          );
      }
      if (validator.createBody?.()?.Check(body) === false)
        throw new ValidationError("body", validator.body, body);
      else if (validator.body?.Decode)
        context.body = validator.body.Decode(body);
    }
    for (let i = 0; i < hooks.beforeHandle.length; i++) {
      const hook = hooks.beforeHandle[i];
      let response2 = hook.fn(context);
      if (hook.subType === "resolve") {
        if (response2 instanceof ElysiaCustomStatusResponse) {
          const result = mapEarlyResponse(response2, context.set);
          if (result)
            return context.response = result;
        }
        if (response2 instanceof Promise)
          Object.assign(context, await response2);
        else
          Object.assign(context, response2);
        continue;
      } else if (response2 instanceof Promise)
        response2 = await response2;
      if (response2 !== void 0) {
        ;
        context.response = response2;
        for (let i2 = 0; i2 < hooks.afterHandle.length; i2++) {
          let newResponse = hooks.afterHandle[i2].fn(
            context
          );
          if (newResponse instanceof Promise)
            newResponse = await newResponse;
          if (newResponse)
            response2 = newResponse;
        }
        const result = mapEarlyResponse(response2, context.set);
        if (result)
          return context.response = result;
      }
    }
    let response = handle(context);
    if (response instanceof Promise)
      response = await response;
    if (!hooks.afterHandle.length) {
      const status = response instanceof ElysiaCustomStatusResponse ? response.code : set2.status ? typeof set2.status === "string" ? StatusMap[set2.status] : set2.status : 200;
      const responseValidator = validator?.createResponse?.()?.[status];
      if (responseValidator?.Check(response) === false)
        throw new ValidationError(
          "response",
          responseValidator,
          response
        );
      else if (responseValidator?.Decode)
        response = responseValidator.Decode(response);
    } else {
      ;
      context.response = response;
      for (let i = 0; i < hooks.afterHandle.length; i++) {
        let newResponse = hooks.afterHandle[i].fn(
          context
        );
        if (newResponse instanceof Promise)
          newResponse = await newResponse;
        const result = mapEarlyResponse(newResponse, context.set);
        if (result !== void 0) {
          const responseValidator = validator?.response?.[result.status];
          if (responseValidator?.Check(result) === false)
            throw new ValidationError(
              "response",
              responseValidator,
              result
            );
          else if (responseValidator?.Decode)
            response = responseValidator.Decode(response);
          return context.response = result;
        }
      }
    }
    if (context.set.cookie && cookieMeta?.sign) {
      const secret = !cookieMeta.secrets ? void 0 : typeof cookieMeta.secrets === "string" ? cookieMeta.secrets : cookieMeta.secrets[0];
      if (cookieMeta.sign === true)
        for (const [key, cookie] of Object.entries(
          context.set.cookie
        ))
          context.set.cookie[key].value = await signCookie(
            cookie.value,
            "${secret}"
          );
      else {
        const properties = validator?.cookie?.schema?.properties;
        for (const name of cookieMeta.sign) {
          if (!(name in properties))
            continue;
          if (context.set.cookie[name]?.value) {
            context.set.cookie[name].value = await signCookie(
              context.set.cookie[name].value,
              secret
            );
          }
        }
      }
    }
    return context.response = mapResponse(response, context.set);
  } catch (error2) {
    const reportedError = error2 instanceof TransformDecodeError && error2.error ? error2.error : error2;
    if (reportedError.status)
      set2.status = reportedError.status;
    return app2.handleError(context, reportedError);
  } finally {
    for (const afterResponse of app2.event.afterResponse)
      await afterResponse.fn(context);
  }
}, "createDynamicHandler");
var createDynamicErrorHandler = /* @__PURE__ */ __name((app2) => async (context, error2) => {
  const errorContext = Object.assign(context, { error: error2, code: error2.code });
  errorContext.set = context.set;
  for (let i = 0; i < app2.event.error.length; i++) {
    const hook = app2.event.error[i];
    let response = hook.fn(errorContext);
    if (response instanceof Promise)
      response = await response;
    if (response !== void 0 && response !== null)
      return context.response = mapResponse(response, context.set);
  }
  return new Response(
    typeof error2.cause === "string" ? error2.cause : error2.message,
    {
      headers: context.set.headers,
      status: error2.status ?? 500
    }
  );
}, "createDynamicErrorHandler");
var Elysia = /* @__PURE__ */ __name(class _Elysia {
  constructor(config2 = {}) {
    this.server = null;
    this.dependencies = {};
    this._routes = {};
    this._types = {
      Prefix: "",
      Scoped: false,
      Singleton: {},
      Definitions: {},
      Metadata: {}
    };
    this._ephemeral = {};
    this._volatile = {};
    this.version = version2;
    this.singleton = {
      decorator: {},
      store: {},
      derive: {},
      resolve: {}
    };
    this.definitions = {
      type: {},
      error: {}
    };
    this.extender = {
      macros: [],
      higherOrderFunctions: []
    };
    this.validator = {
      global: null,
      scoped: null,
      local: null,
      getCandidate() {
        return mergeSchemaValidator(
          mergeSchemaValidator(this.global, this.scoped),
          this.local
        );
      }
    };
    this.event = {
      start: [],
      request: [],
      parse: [],
      transform: [],
      beforeHandle: [],
      afterHandle: [],
      mapResponse: [],
      afterResponse: [],
      trace: [],
      error: [],
      stop: []
    };
    this.telemetry = {
      stack: void 0
    };
    this.router = {
      http: new Memoirist(),
      ws: new Memoirist(),
      // Use in non-AOT mode
      dynamic: new Memoirist(),
      static: {
        http: {
          static: {},
          handlers: [],
          map: {},
          all: ""
        },
        // Static WS Router is consists of pathname and websocket handler index to compose
        ws: {}
      },
      history: []
    };
    this.routeTree = /* @__PURE__ */ new Map();
    this.inference = {
      body: false,
      cookie: false,
      headers: false,
      query: false,
      set: false,
      server: false
    };
    this.handle = async (request) => this.fetch(request);
    this.fetch = (request) => {
      return (this.fetch = this.config.aot ? composeGeneralHandler(this) : createDynamicHandler(this))(request);
    };
    this.handleError = async (context, error2) => (this.handleError = this.config.aot ? composeErrorHandler(this) : createDynamicErrorHandler(this))(context, error2);
    this.outerErrorHandler = (error2) => new Response(error2.message || error2.name || "Error", {
      // @ts-ignore
      status: error2?.status ?? 500
    });
    this.listen = (options, callback) => {
      if (typeof Bun === "undefined")
        throw new Error(
          ".listen() is designed to run on Bun only. If you are running Elysia in other environment please use a dedicated plugin or export the handler via Elysia.fetch"
        );
      this.compile();
      if (typeof options === "string") {
        if (!isNumericString(options))
          throw new Error("Port must be a numeric value");
        options = parseInt(options);
      }
      const fetch = this.fetch;
      const serve = typeof options === "object" ? {
        development: !isProduction,
        reusePort: true,
        ...this.config.serve || {},
        ...options || {},
        // @ts-ignore
        static: this.router.static.http.static,
        websocket: {
          ...this.config.websocket || {},
          ...websocket || {}
        },
        fetch,
        error: this.outerErrorHandler
      } : {
        development: !isProduction,
        reusePort: true,
        ...this.config.serve || {},
        // @ts-ignore
        static: this.router.static.http.static,
        websocket: {
          ...this.config.websocket || {},
          ...websocket || {}
        },
        port: options,
        fetch,
        error: this.outerErrorHandler
      };
      this.server = Bun?.serve(serve);
      for (let i = 0; i < this.event.start.length; i++)
        this.event.start[i].fn(this);
      if (callback)
        callback(this.server);
      process.on("beforeExit", () => {
        if (this.server) {
          this.server.stop();
          this.server = null;
          for (let i = 0; i < this.event.stop.length; i++)
            this.event.stop[i].fn(this);
        }
      });
      this.promisedModules.then(() => {
        Bun?.gc(false);
      });
      return this;
    };
    this.stop = async (closeActiveConnections) => {
      if (!this.server)
        throw new Error(
          "Elysia isn't running. Call `app.listen` to start the server."
        );
      if (this.server) {
        this.server.stop(closeActiveConnections);
        this.server = null;
        if (this.event.stop.length)
          for (let i = 0; i < this.event.stop.length; i++)
            this.event.stop[i].fn(this);
      }
    };
    if (config2.tags) {
      if (!config2.detail)
        config2.detail = {
          tags: config2.tags
        };
      else
        config2.detail.tags = config2.tags;
    }
    if (config2.nativeStaticResponse === void 0)
      config2.nativeStaticResponse = true;
    this.config = {};
    this.applyConfig(config2 ?? {});
    if (config2?.analytic && (config2?.name || config2?.seed !== void 0))
      this.telemetry.stack = new Error().stack;
  }
  static {
    this.version = version2;
  }
  get store() {
    return this.singleton.store;
  }
  get decorator() {
    return this.singleton.decorator;
  }
  get _scoped() {
    return this.config.scoped;
  }
  get routes() {
    return this.router.history;
  }
  getGlobalRoutes() {
    return this.router.history;
  }
  getServer() {
    return this.server;
  }
  get promisedModules() {
    if (!this._promisedModules)
      this._promisedModules = new PromiseGroup();
    return this._promisedModules;
  }
  env(model, env22 = Bun?.env ?? process.env) {
    const validator = getSchemaValidator(model, {
      dynamic: true,
      additionalProperties: true,
      coerce: true
    });
    if (validator.Check(env22) === false) {
      const error2 = new ValidationError("env", model, env22);
      throw new Error(error2.all.map((x) => x.summary).join("\n"));
    }
    return this;
  }
  /**
   * @private DO_NOT_USE_OR_YOU_WILL_BE_FIRE
   *
   * ! Do not use unless you now exactly what you are doing
   * ? Add Higher order function to Elysia.fetch
   */
  wrap(fn) {
    this.extender.higherOrderFunctions.push({
      checksum: checksum(
        JSON.stringify({
          name: this.config.name,
          seed: this.config.seed,
          content: fn.toString()
        })
      ),
      fn
    });
    return this;
  }
  applyMacro(localHook) {
    if (this.extender.macros.length) {
      const manage = createMacroManager({
        globalHook: this.event,
        localHook
      });
      const manager = {
        events: {
          global: this.event,
          local: localHook
        },
        onParse: manage("parse"),
        onTransform: manage("transform"),
        onBeforeHandle: manage("beforeHandle"),
        onAfterHandle: manage("afterHandle"),
        mapResponse: manage("mapResponse"),
        onAfterResponse: manage("afterResponse"),
        onError: manage("error")
      };
      for (const macro of this.extender.macros)
        traceBackMacro(macro.fn(manager), localHook);
    }
  }
  applyConfig(config2) {
    this.config = {
      prefix: "",
      aot: true,
      strictPath: false,
      global: false,
      analytic: false,
      normalize: true,
      ...config2,
      cookie: {
        path: "/",
        ...config2?.cookie
      },
      experimental: config2?.experimental ?? {},
      seed: config2?.seed === void 0 ? "" : config2?.seed
    };
    return this;
  }
  get models() {
    const models = {};
    for (const [name, schema] of Object.entries(this.definitions.type))
      models[name] = getSchemaValidator(
        schema
      );
    return models;
  }
  add(method, path2, handle, localHook, { allowMeta = false, skipPrefix = false } = {
    allowMeta: false,
    skipPrefix: false
  }) {
    localHook = localHookToLifeCycleStore(localHook);
    if (path2 !== "" && path2.charCodeAt(0) !== 47)
      path2 = "/" + path2;
    if (this.config.prefix && !skipPrefix && !this.config.scoped)
      path2 = this.config.prefix + path2;
    if (localHook?.type)
      switch (localHook.type) {
        case "text":
          localHook.type = "text/plain";
          break;
        case "json":
          localHook.type = "application/json";
          break;
        case "formdata":
          localHook.type = "multipart/form-data";
          break;
        case "urlencoded":
          localHook.type = "application/x-www-form-urlencoded";
          break;
        case "arrayBuffer":
          localHook.type = "application/octet-stream";
          break;
        default:
          break;
      }
    const models = this.definitions.type;
    const dynamic = !this.config.aot;
    const instanceValidator = { ...this.validator.getCandidate() };
    const cloned = {
      body: localHook?.body ?? instanceValidator?.body,
      headers: localHook?.headers ?? instanceValidator?.headers,
      params: localHook?.params ?? instanceValidator?.params,
      query: localHook?.query ?? instanceValidator?.query,
      cookie: localHook?.cookie ?? instanceValidator?.cookie,
      response: localHook?.response ?? instanceValidator?.response
    };
    const cookieValidator = /* @__PURE__ */ __name(() => cloned.cookie ? getCookieValidator({
      validator: cloned.cookie,
      defaultConfig: this.config.cookie,
      config: cloned.cookie?.config ?? {},
      dynamic,
      models
    }) : void 0, "cookieValidator");
    const normalize2 = this.config.normalize;
    const validator = this.config.precompile === true || typeof this.config.precompile === "object" && this.config.precompile.schema === true ? {
      body: getSchemaValidator(cloned.body, {
        dynamic,
        models,
        normalize: normalize2,
        additionalCoerce: coercePrimitiveRoot()
      }),
      headers: getSchemaValidator(cloned.headers, {
        dynamic,
        models,
        additionalProperties: !this.config.normalize,
        coerce: true,
        additionalCoerce: stringToStructureCoercions()
      }),
      params: getSchemaValidator(cloned.params, {
        dynamic,
        models,
        coerce: true,
        additionalCoerce: stringToStructureCoercions()
      }),
      query: getSchemaValidator(cloned.query, {
        dynamic,
        models,
        normalize: normalize2,
        coerce: true,
        additionalCoerce: stringToStructureCoercions()
      }),
      cookie: cookieValidator(),
      response: getResponseSchemaValidator(cloned.response, {
        dynamic,
        models,
        normalize: normalize2
      })
    } : {
      createBody() {
        if (this.body)
          return this.body;
        return this.body = getSchemaValidator(
          cloned.body,
          {
            dynamic,
            models,
            normalize: normalize2,
            additionalCoerce: coercePrimitiveRoot()
          }
        );
      },
      createHeaders() {
        if (this.headers)
          return this.headers;
        return this.headers = getSchemaValidator(
          cloned.headers,
          {
            dynamic,
            models,
            additionalProperties: !normalize2,
            coerce: true,
            additionalCoerce: stringToStructureCoercions()
          }
        );
      },
      createParams() {
        if (this.params)
          return this.params;
        return this.params = getSchemaValidator(
          cloned.params,
          {
            dynamic,
            models,
            coerce: true,
            additionalCoerce: stringToStructureCoercions()
          }
        );
      },
      createQuery() {
        if (this.query)
          return this.query;
        return this.query = getSchemaValidator(
          cloned.query,
          {
            dynamic,
            models,
            coerce: true,
            additionalCoerce: stringToStructureCoercions()
          }
        );
      },
      createCookie() {
        if (this.cookie)
          return this.cookie;
        return this.cookie = cookieValidator();
      },
      createResponse() {
        if (this.response)
          return this.response;
        return this.response = getResponseSchemaValidator(
          cloned.response,
          {
            dynamic,
            models,
            normalize: normalize2
          }
        );
      }
    };
    const loosePath = path2.endsWith("/") ? path2.slice(0, path2.length - 1) : path2 + "/";
    localHook = mergeHook(localHook, instanceValidator);
    if (localHook.tags) {
      if (!localHook.detail)
        localHook.detail = {
          tags: localHook.tags
        };
      else
        localHook.detail.tags = localHook.tags;
    }
    if (isNotEmpty(this.config.detail))
      localHook.detail = mergeDeep(
        Object.assign({}, this.config.detail),
        localHook.detail
      );
    this.applyMacro(localHook);
    const hooks = mergeHook(this.event, localHook);
    if (this.config.aot === false) {
      this.router.dynamic.add(method, path2, {
        validator,
        hooks,
        content: localHook?.type,
        handle
      });
      if (this.config.strictPath === false) {
        this.router.dynamic.add(method, loosePath, {
          validator,
          hooks,
          content: localHook?.type,
          handle
        });
      }
      this.router.history.push({
        method,
        path: path2,
        composed: null,
        handler: handle,
        hooks
      });
      return;
    }
    const shouldPrecompile = this.config.precompile === true || typeof this.config.precompile === "object" && this.config.precompile.compose === true;
    const inference = cloneInference(this.inference);
    const staticHandler = typeof handle !== "function" ? createStaticHandler(handle, hooks, this.setHeaders) : void 0;
    const nativeStaticHandler = typeof handle !== "function" ? createNativeStaticHandler(handle, hooks, this.setHeaders) : void 0;
    if (this.config.nativeStaticResponse === true && nativeStaticHandler && (method === "GET" || method === "ALL"))
      this.router.static.http.static[path2] = nativeStaticHandler();
    const compile = /* @__PURE__ */ __name(() => composeHandler({
      app: this,
      path: path2,
      method,
      localHook: mergeHook(localHook),
      hooks,
      validator,
      handler: handle,
      allowMeta,
      inference
    }), "compile");
    const mainHandler = shouldPrecompile ? compile() : (context) => {
      return compile()(context);
    };
    const routeIndex = this.router.history.length;
    if (this.routeTree.has(method + path2))
      for (let i = 0; i < this.router.history.length; i++) {
        const route = this.router.history[i];
        if (route.path === path2 && route.method === method) {
          const removed = this.router.history.splice(i, 1)[0];
          if (removed && this.routeTree.has(removed?.method + removed?.path))
            this.routeTree.delete(removed.method + removed.path);
        }
      }
    else
      this.routeTree.set(method + path2, routeIndex);
    this.router.history.push({
      method,
      path: path2,
      composed: mainHandler,
      handler: handle,
      hooks
    });
    const staticRouter = this.router.static.http;
    const handler = {
      handler: shouldPrecompile ? mainHandler : void 0,
      compile
    };
    if (method === "$INTERNALWS") {
      const loose = this.config.strictPath ? void 0 : path2.endsWith("/") ? path2.slice(0, path2.length - 1) : path2 + "/";
      if (path2.indexOf(":") === -1 && path2.indexOf("*") === -1) {
        const index = staticRouter.handlers.length;
        staticRouter.handlers.push(
          (ctx) => (staticRouter.handlers[index] = compile())(ctx)
        );
        this.router.static.ws[path2] = index;
        if (loose)
          this.router.static.ws[loose] = index;
      } else {
        this.router.ws.add("ws", path2, handler);
        if (loose)
          this.router.ws.add("ws", loose, handler);
      }
      return;
    }
    if (path2.indexOf(":") === -1 && path2.indexOf("*") === -1) {
      const index = staticRouter.handlers.length;
      staticRouter.handlers.push(
        staticHandler ?? ((ctx2) => (staticRouter.handlers[index] = compile())(ctx2))
      );
      if (!staticRouter.map[path2])
        staticRouter.map[path2] = {
          code: ""
        };
      const ctx = staticHandler ? "" : "ctx";
      if (method === "ALL")
        staticRouter.map[path2].all = `default: return st[${index}](${ctx})
`;
      else
        staticRouter.map[path2].code = `case '${method}': return st[${index}](${ctx})
${staticRouter.map[path2].code}`;
      if (!this.config.strictPath) {
        if (!staticRouter.map[loosePath])
          staticRouter.map[loosePath] = {
            code: ""
          };
        if (this.config.nativeStaticResponse === true && nativeStaticHandler && (method === "GET" || method === "ALL"))
          this.router.static.http.static[loosePath] = nativeStaticHandler();
        if (method === "ALL")
          staticRouter.map[loosePath].all = `default: return st[${index}](${ctx})
`;
        else
          staticRouter.map[loosePath].code = `case '${method}': return st[${index}](${ctx})
${staticRouter.map[loosePath].code}`;
      }
    } else {
      this.router.http.add(method, path2, handler);
      if (!this.config.strictPath) {
        const loosePath2 = path2.endsWith("/") ? path2.slice(0, path2.length - 1) : path2 + "/";
        if (this.config.nativeStaticResponse === true && staticHandler && (method === "GET" || method === "ALL"))
          this.router.static.http.static[loosePath2] = staticHandler();
        this.router.http.add(method, loosePath2, handler);
      }
    }
  }
  headers(header) {
    if (!header)
      return this;
    if (!this.setHeaders)
      this.setHeaders = {};
    this.setHeaders = mergeDeep(this.setHeaders, header);
    return this;
  }
  /**
   * ### start | Life cycle event
   * Called after server is ready for serving
   *
   * ---
   * @example
   * ```typescript
   * new Elysia()
   *     .onStart(({ server }) => {
   *         console.log("Running at ${server?.url}:${server?.port}")
   *     })
   *     .listen(3000)
   * ```
   */
  onStart(handler) {
    this.on("start", handler);
    return this;
  }
  /**
   * ### request | Life cycle event
   * Called on every new request is accepted
   *
   * ---
   * @example
   * ```typescript
   * new Elysia()
   *     .onRequest(({ method, url }) => {
   *         saveToAnalytic({ method, url })
   *     })
   * ```
   */
  onRequest(handler) {
    this.on("request", handler);
    return this;
  }
  onParse(options, handler) {
    if (!handler)
      return this.on("parse", options);
    return this.on(
      options,
      "parse",
      handler
    );
  }
  onTransform(options, handler) {
    if (!handler)
      return this.on("transform", options);
    return this.on(
      options,
      "transform",
      handler
    );
  }
  resolve(optionsOrResolve, resolve2) {
    if (!resolve2) {
      resolve2 = optionsOrResolve;
      optionsOrResolve = { as: "local" };
    }
    const hook = {
      subType: "resolve",
      fn: resolve2
    };
    return this.onBeforeHandle(optionsOrResolve, hook);
  }
  mapResolve(optionsOrResolve, mapper) {
    if (!mapper) {
      mapper = optionsOrResolve;
      optionsOrResolve = { as: "local" };
    }
    const hook = {
      subType: "mapResolve",
      fn: mapper
    };
    return this.onBeforeHandle(optionsOrResolve, hook);
  }
  onBeforeHandle(options, handler) {
    if (!handler)
      return this.on("beforeHandle", options);
    return this.on(
      options,
      "beforeHandle",
      handler
    );
  }
  onAfterHandle(options, handler) {
    if (!handler)
      return this.on("afterHandle", options);
    return this.on(
      options,
      "afterHandle",
      handler
    );
  }
  mapResponse(options, handler) {
    if (!handler)
      return this.on("mapResponse", options);
    return this.on(
      options,
      "mapResponse",
      handler
    );
  }
  onAfterResponse(options, handler) {
    if (!handler)
      return this.on("afterResponse", options);
    return this.on(
      options,
      "afterResponse",
      handler
    );
  }
  /**
   * ### After Handle | Life cycle event
   * Intercept request **after** main handler is called.
   *
   * If truthy value is returned, will be assigned as `Response`
   *
   * ---
   * @example
   * ```typescript
   * new Elysia()
   *     .onAfterHandle((context, response) => {
   *         if(typeof response === "object")
   *             return JSON.stringify(response)
   *     })
   * ```
   */
  trace(options, handler) {
    if (!handler) {
      handler = options;
      options = { as: "local" };
    }
    if (!Array.isArray(handler))
      handler = [handler];
    for (const fn of handler)
      this.on(
        options,
        "trace",
        createTracer(fn)
      );
    return this;
  }
  error(name, error2) {
    switch (typeof name) {
      case "string":
        error2.prototype[ERROR_CODE] = name;
        this.definitions.error[name] = error2;
        return this;
      case "function":
        this.definitions.error = name(this.definitions.error);
        return this;
    }
    for (const [code, error3] of Object.entries(name)) {
      error3.prototype[ERROR_CODE] = code;
      this.definitions.error[code] = error3;
    }
    return this;
  }
  /**
   * ### Error | Life cycle event
   * Called when error is thrown during processing request
   *
   * ---
   * @example
   * ```typescript
   * new Elysia()
   *     .onError(({ code }) => {
   *         if(code === "NOT_FOUND")
   *             return "Path not found :("
   *     })
   * ```
   */
  onError(options, handler) {
    if (!handler)
      return this.on("error", options);
    return this.on(
      options,
      "error",
      handler
    );
  }
  /**
   * ### stop | Life cycle event
   * Called after server stop serving request
   *
   * ---
   * @example
   * ```typescript
   * new Elysia()
   *     .onStop((app) => {
   *         cleanup()
   *     })
   * ```
   */
  onStop(handler) {
    this.on("stop", handler);
    return this;
  }
  on(optionsOrType, typeOrHandlers, handlers) {
    let type;
    switch (typeof optionsOrType) {
      case "string":
        type = optionsOrType;
        handlers = typeOrHandlers;
        break;
      case "object":
        type = typeOrHandlers;
        if (!Array.isArray(typeOrHandlers) && typeof typeOrHandlers === "object")
          handlers = typeOrHandlers;
        break;
    }
    if (Array.isArray(handlers))
      handlers = fnToContainer(handlers);
    else {
      if (typeof handlers === "function")
        handlers = [
          {
            fn: handlers
          }
        ];
      else
        handlers = [handlers];
    }
    const handles = handlers;
    for (const handle of handles)
      handle.scope = typeof optionsOrType === "string" ? "local" : optionsOrType?.as ?? "local";
    if (type !== "trace")
      sucrose(
        {
          [type]: handles.map((x) => x.fn)
        },
        this.inference
      );
    for (const handle of handles) {
      const fn = asHookType(handle, "global", { skipIfHasType: true });
      switch (type) {
        case "start":
          this.event.start.push(fn);
          break;
        case "request":
          this.event.request.push(fn);
          break;
        case "parse":
          this.event.parse.push(fn);
          break;
        case "transform":
          this.event.transform.push(fn);
          break;
        case "beforeHandle":
          this.event.beforeHandle.push(fn);
          break;
        case "afterHandle":
          this.event.afterHandle.push(fn);
          break;
        case "mapResponse":
          this.event.mapResponse.push(fn);
          break;
        case "afterResponse":
          this.event.afterResponse.push(fn);
          break;
        case "trace":
          this.event.trace.push(fn);
          break;
        case "error":
          this.event.error.push(fn);
          break;
        case "stop":
          this.event.stop.push(fn);
          break;
      }
    }
    return this;
  }
  /**
   * @deprecated use `Elysia.as` instead
   *
   * Will be removed in Elysia 1.2
   */
  propagate() {
    promoteEvent(this.event.parse);
    promoteEvent(this.event.transform);
    promoteEvent(this.event.beforeHandle);
    promoteEvent(this.event.afterHandle);
    promoteEvent(this.event.mapResponse);
    promoteEvent(this.event.afterResponse);
    promoteEvent(this.event.trace);
    promoteEvent(this.event.error);
    return this;
  }
  as(type) {
    const castType = { plugin: "scoped", global: "global" }[type];
    promoteEvent(this.event.parse, castType);
    promoteEvent(this.event.transform, castType);
    promoteEvent(this.event.beforeHandle, castType);
    promoteEvent(this.event.afterHandle, castType);
    promoteEvent(this.event.mapResponse, castType);
    promoteEvent(this.event.afterResponse, castType);
    promoteEvent(this.event.trace, castType);
    promoteEvent(this.event.error, castType);
    if (type === "plugin") {
      this.validator.scoped = mergeSchemaValidator(
        this.validator.scoped,
        this.validator.local
      );
      this.validator.local = null;
    } else if (type === "global") {
      this.validator.global = mergeSchemaValidator(
        this.validator.global,
        mergeSchemaValidator(
          this.validator.scoped,
          this.validator.local
        )
      );
      this.validator.scoped = null;
      this.validator.local = null;
    }
    return this;
  }
  /**
   * ### group
   * Encapsulate and group path with prefix
   *
   * ---
   * @example
   * ```typescript
   * new Elysia()
   *     .group('/v1', app => app
   *         .get('/', () => 'Hi')
   *         .get('/name', () => 'Elysia')
   *     })
   * ```
   */
  group(prefix, schemaOrRun, run) {
    const instance = new _Elysia({
      ...this.config,
      prefix: ""
    });
    instance.singleton = { ...this.singleton };
    instance.definitions = { ...this.definitions };
    instance.getServer = () => this.getServer();
    instance.inference = cloneInference(this.inference);
    instance.extender = { ...this.extender };
    const isSchema = typeof schemaOrRun === "object";
    const sandbox = (isSchema ? run : schemaOrRun)(instance);
    this.singleton = mergeDeep(this.singleton, instance.singleton);
    this.definitions = mergeDeep(this.definitions, instance.definitions);
    if (sandbox.event.request.length)
      this.event.request = [
        ...this.event.request || [],
        ...sandbox.event.request || []
      ];
    if (sandbox.event.mapResponse.length)
      this.event.mapResponse = [
        ...this.event.mapResponse || [],
        ...sandbox.event.mapResponse || []
      ];
    this.model(sandbox.definitions.type);
    Object.values(instance.router.history).forEach(
      ({ method, path: path2, handler, hooks }) => {
        path2 = (isSchema ? "" : this.config.prefix) + prefix + path2;
        if (isSchema) {
          const hook = schemaOrRun;
          const localHook = hooks;
          this.add(
            method,
            path2,
            handler,
            mergeHook(hook, {
              ...localHook || {},
              error: !localHook.error ? sandbox.event.error : Array.isArray(localHook.error) ? [
                ...localHook.error || {},
                ...sandbox.event.error || {}
              ] : [
                localHook.error,
                ...sandbox.event.error || {}
              ]
            })
          );
        } else {
          this.add(
            method,
            path2,
            handler,
            mergeHook(
              hooks,
              {
                error: sandbox.event.error
              }
            ),
            {
              skipPrefix: true
            }
          );
        }
      }
    );
    return this;
  }
  /**
   * ### guard
   * Encapsulate and pass hook into all child handler
   *
   * ---
   * @example
   * ```typescript
   * import { t } from 'elysia'
   *
   * new Elysia()
   *     .guard({
   *          schema: {
   *              body: t.Object({
   *                  username: t.String(),
   *                  password: t.String()
   *              })
   *          }
   *     }, app => app
   *         .get("/", () => 'Hi')
   *         .get("/name", () => 'Elysia')
   *     })
   * ```
   */
  guard(hook, run) {
    if (!run) {
      if (typeof hook === "object") {
        this.applyMacro(hook);
        const type = hook.as ?? "local";
        this.validator[type] = {
          body: hook.body ?? this.validator[type]?.body,
          headers: hook.headers ?? this.validator[type]?.headers,
          params: hook.params ?? this.validator[type]?.params,
          query: hook.query ?? this.validator[type]?.query,
          response: hook.response ?? this.validator[type]?.response,
          cookie: hook.cookie ?? this.validator[type]?.cookie
        };
        if (hook.parse)
          this.on({ as: type }, "parse", hook.parse);
        if (hook.transform)
          this.on({ as: type }, "transform", hook.transform);
        if (hook.beforeHandle)
          this.on({ as: type }, "beforeHandle", hook.beforeHandle);
        if (hook.afterHandle)
          this.on({ as: type }, "afterHandle", hook.afterHandle);
        if (hook.mapResponse)
          this.on({ as: type }, "mapResponse", hook.mapResponse);
        if (hook.afterResponse)
          this.on({ as: type }, "afterResponse", hook.afterResponse);
        if (hook.error)
          this.on({ as: type }, "error", hook.error);
        if (hook.detail) {
          if (this.config.detail)
            this.config.detail = mergeDeep(
              Object.assign({}, this.config.detail),
              hook.detail
            );
          else
            this.config.detail = hook.detail;
        }
        if (hook?.tags) {
          if (!this.config.detail)
            this.config.detail = {
              tags: hook.tags
            };
          else
            this.config.detail.tags = hook.tags;
        }
        return this;
      }
      return this.guard({}, hook);
    }
    const instance = new _Elysia({
      ...this.config,
      prefix: ""
    });
    instance.singleton = { ...this.singleton };
    instance.definitions = { ...this.definitions };
    instance.inference = cloneInference(this.inference);
    instance.extender = { ...this.extender };
    const sandbox = run(instance);
    this.singleton = mergeDeep(this.singleton, instance.singleton);
    this.definitions = mergeDeep(this.definitions, instance.definitions);
    sandbox.getServer = () => this.server;
    if (sandbox.event.request.length)
      this.event.request = [
        ...this.event.request || [],
        ...sandbox.event.request || []
      ];
    if (sandbox.event.mapResponse.length)
      this.event.mapResponse = [
        ...this.event.mapResponse || [],
        ...sandbox.event.mapResponse || []
      ];
    this.model(sandbox.definitions.type);
    Object.values(instance.router.history).forEach(
      ({ method, path: path2, handler, hooks: localHook }) => {
        this.add(
          method,
          path2,
          handler,
          mergeHook(hook, {
            ...localHook || {},
            error: !localHook.error ? sandbox.event.error : Array.isArray(localHook.error) ? [
              ...localHook.error || {},
              ...sandbox.event.error || []
            ] : [
              localHook.error,
              ...sandbox.event.error || []
            ]
          })
        );
      }
    );
    return this;
  }
  /**
   * ### use
   * Merge separate logic of Elysia with current
   *
   * ---
   * @example
   * ```typescript
   * const plugin = (app: Elysia) => app
   *     .get('/plugin', () => 'hi')
   *
   * new Elysia()
   *     .use(plugin)
   * ```
   */
  use(plugin, options) {
    if (options?.scoped)
      return this.guard({}, (app2) => app2.use(plugin));
    if (Array.isArray(plugin)) {
      let current = this;
      for (const p of plugin)
        current = this.use(p);
      return current;
    }
    if (plugin instanceof Promise) {
      this.promisedModules.add(
        plugin.then((plugin2) => {
          if (typeof plugin2 === "function")
            return plugin2(this);
          if (plugin2 instanceof _Elysia)
            return this._use(plugin2).compile();
          if (typeof plugin2.default === "function")
            return plugin2.default(this);
          if (plugin2.default instanceof _Elysia)
            return this._use(plugin2.default);
          throw new Error(
            'Invalid plugin type. Expected Elysia instance, function, or module with "default" as Elysia instance or function that returns Elysia instance.'
          );
        }).then((x) => x.compile())
      );
      return this;
    }
    return this._use(plugin);
  }
  _use(plugin) {
    if (typeof plugin === "function") {
      const instance = plugin(this);
      if (instance instanceof Promise) {
        this.promisedModules.add(
          instance.then((plugin2) => {
            if (plugin2 instanceof _Elysia) {
              plugin2.getServer = () => this.getServer();
              plugin2.getGlobalRoutes = () => this.getGlobalRoutes();
              plugin2.model(this.definitions.type);
              plugin2.error(this.definitions.error);
              for (const {
                method,
                path: path2,
                handler,
                hooks
              } of Object.values(plugin2.router.history)) {
                this.add(
                  method,
                  path2,
                  handler,
                  mergeHook(
                    hooks,
                    {
                      error: plugin2.event.error
                    }
                  )
                );
              }
              plugin2.compile();
              return plugin2;
            }
            if (typeof plugin2 === "function")
              return plugin2(
                this
              );
            if (typeof plugin2.default === "function")
              return plugin2.default(
                this
              );
            return this._use(plugin2);
          }).then((x) => x.compile())
        );
        return this;
      }
      return instance;
    }
    const { name, seed } = plugin.config;
    plugin.getServer = () => this.getServer();
    plugin.getGlobalRoutes = () => this.getGlobalRoutes();
    plugin.model(this.definitions.type);
    plugin.error(this.definitions.error);
    const isScoped = plugin.config.scoped;
    if (isScoped) {
      if (name) {
        if (!(name in this.dependencies))
          this.dependencies[name] = [];
        const current = seed !== void 0 ? checksum(name + JSON.stringify(seed)) : 0;
        if (this.dependencies[name].some(
          ({ checksum: checksum2 }) => current === checksum2
        ))
          return this;
        this.dependencies[name].push(
          !this.config?.analytic ? {
            name: plugin.config.name,
            seed: plugin.config.seed,
            checksum: current,
            dependencies: plugin.dependencies
          } : {
            name: plugin.config.name,
            seed: plugin.config.seed,
            checksum: current,
            dependencies: plugin.dependencies,
            stack: plugin.telemetry.stack,
            routes: plugin.router.history,
            decorators: plugin.singleton.decorator,
            store: plugin.singleton.store,
            type: plugin.definitions.type,
            error: plugin.definitions.error,
            derive: plugin.event.transform.filter((x) => x.subType === "derive").map((x) => ({
              fn: x.fn.toString(),
              stack: new Error().stack ?? ""
            })),
            resolve: plugin.event.transform.filter((x) => x.subType === "derive").map((x) => ({
              fn: x.fn.toString(),
              stack: new Error().stack ?? ""
            }))
          }
        );
      }
      plugin.extender.macros = this.extender.macros.concat(
        plugin.extender.macros
      );
      const macroHashes = [];
      for (let i = 0; i < plugin.extender.macros.length; i++) {
        const macro = this.extender.macros[i];
        if (macroHashes.includes(macro.checksum)) {
          plugin.extender.macros.splice(i, 1);
          i--;
        }
        macroHashes.push(macro.checksum);
      }
      plugin.onRequest((context) => {
        Object.assign(context, this.singleton.decorator);
        Object.assign(context.store, this.singleton.store);
      });
      if (plugin.event.trace.length)
        plugin.event.trace.push(...plugin.event.trace);
      if (!plugin.config.prefix)
        console.warn(
          "It's recommended to use scoped instance with a prefix to prevent collision routing with other instance."
        );
      if (plugin.event.error.length)
        plugin.event.error.push(...this.event.error);
      if (plugin.config.aot)
        plugin.compile();
      if (isScoped === true && plugin.config.prefix) {
        this.mount(plugin.config.prefix + "/", plugin.fetch);
        for (const route of plugin.router.history) {
          this.routeTree.set(
            route.method + `${plugin.config.prefix}${route.path}`,
            this.router.history.length
          );
          this.router.history.push({
            ...route,
            path: `${plugin.config.prefix}${route.path}`,
            hooks: mergeHook(route.hooks, {
              error: this.event.error
            })
          });
        }
      } else {
        this.mount(plugin.fetch);
        for (const route of plugin.router.history) {
          this.routeTree.set(
            route.method + `${plugin.config.prefix}${route.path}`,
            this.router.history.length
          );
          this.router.history.push({
            ...route,
            path: `${plugin.config.prefix}${route.path}`,
            hooks: mergeHook(route.hooks, {
              error: this.event.error
            })
          });
        }
      }
      return this;
    } else {
      this.headers(plugin.setHeaders);
      if (name) {
        if (!(name in this.dependencies))
          this.dependencies[name] = [];
        const current = seed !== void 0 ? checksum(name + JSON.stringify(seed)) : 0;
        if (!this.dependencies[name].some(
          ({ checksum: checksum2 }) => current === checksum2
        )) {
          this.extender.macros = this.extender.macros.concat(
            plugin.extender.macros
          );
          this.extender.higherOrderFunctions = this.extender.higherOrderFunctions.concat(
            plugin.extender.higherOrderFunctions
          );
        }
      } else {
        this.extender.macros = this.extender.macros.concat(
          plugin.extender.macros
        );
        this.extender.higherOrderFunctions = this.extender.higherOrderFunctions.concat(
          plugin.extender.higherOrderFunctions
        );
      }
      deduplicateChecksum(this.extender.macros);
      deduplicateChecksum(this.extender.higherOrderFunctions);
      const hofHashes = [];
      for (let i = 0; i < this.extender.higherOrderFunctions.length; i++) {
        const hof = this.extender.higherOrderFunctions[i];
        if (hof.checksum) {
          if (hofHashes.includes(hof.checksum)) {
            this.extender.higherOrderFunctions.splice(i, 1);
            i--;
          }
          hofHashes.push(hof.checksum);
        }
      }
      this.inference = {
        body: this.inference.body || plugin.inference.body,
        cookie: this.inference.cookie || plugin.inference.cookie,
        headers: this.inference.headers || plugin.inference.headers,
        query: this.inference.query || plugin.inference.query,
        set: this.inference.set || plugin.inference.set,
        server: this.inference.server || plugin.inference.server
      };
    }
    this.decorate(plugin.singleton.decorator);
    this.state(plugin.singleton.store);
    this.model(plugin.definitions.type);
    this.error(plugin.definitions.error);
    plugin.extender.macros = this.extender.macros.concat(
      plugin.extender.macros
    );
    for (const { method, path: path2, handler, hooks } of Object.values(
      plugin.router.history
    )) {
      this.add(
        method,
        path2,
        handler,
        mergeHook(
          hooks,
          {
            error: plugin.event.error
          }
        )
      );
    }
    if (!isScoped)
      if (name) {
        if (!(name in this.dependencies))
          this.dependencies[name] = [];
        const current = seed !== void 0 ? checksum(name + JSON.stringify(seed)) : 0;
        if (this.dependencies[name].some(
          ({ checksum: checksum2 }) => current === checksum2
        ))
          return this;
        this.dependencies[name].push(
          !this.config?.analytic ? {
            name: plugin.config.name,
            seed: plugin.config.seed,
            checksum: current,
            dependencies: plugin.dependencies
          } : {
            name: plugin.config.name,
            seed: plugin.config.seed,
            checksum: current,
            dependencies: plugin.dependencies,
            stack: plugin.telemetry.stack,
            routes: plugin.router.history,
            decorators: plugin.singleton,
            store: plugin.singleton.store,
            type: plugin.definitions.type,
            error: plugin.definitions.error,
            derive: plugin.event.transform.filter((x) => x?.subType === "derive").map((x) => ({
              fn: x.toString(),
              stack: new Error().stack ?? ""
            })),
            resolve: plugin.event.transform.filter((x) => x?.subType === "resolve").map((x) => ({
              fn: x.toString(),
              stack: new Error().stack ?? ""
            }))
          }
        );
        this.event = mergeLifeCycle(
          this.event,
          filterGlobalHook(plugin.event),
          current
        );
      } else {
        this.event = mergeLifeCycle(
          this.event,
          filterGlobalHook(plugin.event)
        );
      }
    this.validator.global = mergeHook(this.validator.global, {
      ...plugin.validator.global
    });
    this.validator.local = mergeHook(this.validator.local, {
      ...plugin.validator.scoped
    });
    return this;
  }
  macro(macro) {
    const hook = {
      checksum: checksum(
        JSON.stringify({
          name: this.config.name,
          seed: this.config.seed,
          content: macro.toString()
        })
      ),
      fn: macro
    };
    this.extender.macros.push(hook);
    return this;
  }
  mount(path2, handle) {
    if (path2 instanceof _Elysia || typeof path2 === "function" || path2.length === 0 || path2 === "/") {
      const run = typeof path2 === "function" ? path2 : path2 instanceof _Elysia ? path2.compile().fetch : handle instanceof _Elysia ? handle.compile().fetch : handle;
      const handler2 = /* @__PURE__ */ __name(async ({ request, path: path22 }) => {
        if (request.method === "GET" || request.method === "HEAD" || !request.headers.get("content-type"))
          return run(
            new Request(
              replaceUrlPath(request.url, path22 || "/"),
              request
            )
          );
        return run(
          new Request(replaceUrlPath(request.url, path22 || "/"), {
            ...request,
            body: await request.arrayBuffer()
          })
        );
      }, "handler2");
      this.all(
        "/*",
        handler2,
        {
          type: "none"
        }
      );
      return this;
    }
    const length = path2.length;
    if (handle instanceof _Elysia)
      handle = handle.compile().fetch;
    const handler = /* @__PURE__ */ __name(async ({ request, path: path22 }) => {
      if (request.method === "GET" || request.method === "HEAD" || !request.headers.get("content-type"))
        return handle(
          new Request(
            replaceUrlPath(request.url, path22.slice(length) || "/"),
            request
          )
        );
      return handle(
        new Request(
          replaceUrlPath(request.url, path22.slice(length) || "/"),
          {
            ...request,
            body: await request.arrayBuffer()
          }
        )
      );
    }, "handler");
    this.all(
      path2,
      handler,
      {
        type: "none"
      }
    );
    this.all(
      path2 + (path2.endsWith("/") ? "*" : "/*"),
      handler,
      {
        type: "none"
      }
    );
    return this;
  }
  /**
   * ### get
   * Register handler for path with method [GET]
   *
   * ---
   * @example
   * ```typescript
   * import { Elysia, t } from 'elysia'
   *
   * new Elysia()
   *     .get('/', () => 'hi')
   *     .get('/with-hook', () => 'hi', {
   *         response: t.String()
   *     })
   * ```
   */
  get(path2, handler, hook) {
    this.add("GET", path2, handler, hook);
    return this;
  }
  /**
   * ### post
   * Register handler for path with method [POST]
   *
   * ---
   * @example
   * ```typescript
   * import { Elysia, t } from 'elysia'
   *
   * new Elysia()
   *     .post('/', () => 'hi')
   *     .post('/with-hook', () => 'hi', {
   *         response: t.String()
   *     })
   * ```
   */
  post(path2, handler, hook) {
    this.add("POST", path2, handler, hook);
    return this;
  }
  /**
   * ### put
   * Register handler for path with method [PUT]
   *
   * ---
   * @example
   * ```typescript
   * import { Elysia, t } from 'elysia'
   *
   * new Elysia()
   *     .put('/', () => 'hi')
   *     .put('/with-hook', () => 'hi', {
   *         response: t.String()
   *     })
   * ```
   */
  put(path2, handler, hook) {
    this.add("PUT", path2, handler, hook);
    return this;
  }
  /**
   * ### patch
   * Register handler for path with method [PATCH]
   *
   * ---
   * @example
   * ```typescript
   * import { Elysia, t } from 'elysia'
   *
   * new Elysia()
   *     .patch('/', () => 'hi')
   *     .patch('/with-hook', () => 'hi', {
   *         response: t.String()
   *     })
   * ```
   */
  patch(path2, handler, hook) {
    this.add("PATCH", path2, handler, hook);
    return this;
  }
  /**
   * ### delete
   * Register handler for path with method [DELETE]
   *
   * ---
   * @example
   * ```typescript
   * import { Elysia, t } from 'elysia'
   *
   * new Elysia()
   *     .delete('/', () => 'hi')
   *     .delete('/with-hook', () => 'hi', {
   *         response: t.String()
   *     })
   * ```
   */
  delete(path2, handler, hook) {
    this.add("DELETE", path2, handler, hook);
    return this;
  }
  /**
   * ### options
   * Register handler for path with method [POST]
   *
   * ---
   * @example
   * ```typescript
   * import { Elysia, t } from 'elysia'
   *
   * new Elysia()
   *     .options('/', () => 'hi')
   *     .options('/with-hook', () => 'hi', {
   *         response: t.String()
   *     })
   * ```
   */
  options(path2, handler, hook) {
    this.add("OPTIONS", path2, handler, hook);
    return this;
  }
  /**
   * ### all
   * Register handler for path with method [ALL]
   *
   * ---
   * @example
   * ```typescript
   * import { Elysia, t } from 'elysia'
   *
   * new Elysia()
   *     .all('/', () => 'hi')
   *     .all('/with-hook', () => 'hi', {
   *         response: t.String()
   *     })
   * ```
   */
  all(path2, handler, hook) {
    this.add("ALL", path2, handler, hook);
    return this;
  }
  /**
   * ### head
   * Register handler for path with method [HEAD]
   *
   * ---
   * @example
   * ```typescript
   * import { Elysia, t } from 'elysia'
   *
   * new Elysia()
   *     .head('/', () => 'hi')
   *     .head('/with-hook', () => 'hi', {
   *         response: t.String()
   *     })
   * ```
   */
  head(path2, handler, hook) {
    this.add("HEAD", path2, handler, hook);
    return this;
  }
  /**
   * ### connect
   * Register handler for path with method [CONNECT]
   *
   * ---
   * @example
   * ```typescript
   * import { Elysia, t } from 'elysia'
   *
   * new Elysia()
   *     .connect('/', () => 'hi')
   *     .connect('/with-hook', () => 'hi', {
   *         response: t.String()
   *     })
   * ```
   */
  connect(path2, handler, hook) {
    this.add("CONNECT", path2, handler, hook);
    return this;
  }
  /**
   * ### route
   * Register handler for path with method [ROUTE]
   *
   * ---
   * @example
   * ```typescript
   * import { Elysia, t } from 'elysia'
   *
   * new Elysia()
   *     .route('/', () => 'hi')
   *     .route('/with-hook', () => 'hi', {
   *         response: t.String()
   *     })
   * ```
   */
  route(method, path2, handler, hook) {
    this.add(method.toUpperCase(), path2, handler, hook, hook?.config);
    return this;
  }
  /**
   * ### ws
   * Register handler for path with method [ws]
   *
   * ---
   * @example
   * ```typescript
   * import { Elysia, t } from 'elysia'
   *
   * new Elysia()
   *     .ws('/', {
   *         message(ws, message) {
   *             ws.send(message)
   *         }
   *     })
   * ```
   */
  ws(path2, options) {
    const transform = options.transformMessage ? Array.isArray(options.transformMessage) ? options.transformMessage : [options.transformMessage] : void 0;
    let server = null;
    const validateMessage = getSchemaValidator(options?.body, {
      models: this.definitions.type,
      normalize: this.config.normalize
    });
    const validateResponse = getSchemaValidator(options?.response, {
      models: this.definitions.type,
      normalize: this.config.normalize
    });
    const parseMessage = /* @__PURE__ */ __name((message) => {
      if (typeof message === "string") {
        const start = message?.charCodeAt(0);
        if (start === 47 || start === 123)
          try {
            message = JSON.parse(message);
          } catch {
          }
        else if (isNumericString(message))
          message = +message;
      }
      if (transform?.length)
        for (let i = 0; i < transform.length; i++) {
          const temp = transform[i](message);
          if (temp !== void 0)
            message = temp;
        }
      return message;
    }, "parseMessage");
    this.route(
      "$INTERNALWS",
      path2,
      // @ts-expect-error
      (context) => {
        const { set: set2, path: path22, qi, headers, query, params } = context;
        if (server === null)
          server = this.getServer();
        if (server?.upgrade(context.request, {
          headers: typeof options.upgrade === "function" ? options.upgrade(context) : options.upgrade,
          data: {
            validator: validateResponse,
            open(ws) {
              options.open?.(new ElysiaWS(ws, context));
            },
            message: (ws, msg) => {
              const message = parseMessage(msg);
              if (validateMessage?.Check(message) === false)
                return void ws.send(
                  new ValidationError(
                    "message",
                    validateMessage,
                    message
                  ).message
                );
              options.message?.(
                new ElysiaWS(ws, context),
                message
              );
            },
            drain(ws) {
              options.drain?.(
                new ElysiaWS(ws, context)
              );
            },
            close(ws, code, reason) {
              options.close?.(
                new ElysiaWS(ws, context),
                code,
                reason
              );
            }
          }
        }))
          return;
        set2.status = 400;
        return "Expected a websocket connection";
      },
      {
        beforeHandle: options.beforeHandle,
        transform: options.transform,
        headers: options.headers,
        params: options.params,
        query: options.query
      }
    );
    return this;
  }
  /**
   * ### state
   * Assign global mutatable state accessible for all handler
   *
   * ---
   * @example
   * ```typescript
   * new Elysia()
   *     .state('counter', 0)
   *     .get('/', (({ counter }) => ++counter)
   * ```
   */
  state(options, name, value) {
    if (name === void 0) {
      value = options;
      options = { as: "append" };
      name = "";
    } else if (value === void 0) {
      if (typeof options === "string") {
        value = name;
        name = options;
        options = { as: "append" };
      } else if (typeof options === "object") {
        value = name;
        name = "";
      }
    }
    const { as } = options;
    if (typeof name !== "string")
      return this;
    switch (typeof value) {
      case "object":
        if (name) {
          if (name in this.singleton.store)
            this.singleton.store[name] = mergeDeep(
              this.singleton.store[name],
              value,
              {
                override: as === "override"
              }
            );
          else
            this.singleton.store[name] = value;
          return this;
        }
        if (value === null)
          return this;
        this.singleton.store = mergeDeep(this.singleton.store, value, {
          override: as === "override"
        });
        return this;
      case "function":
        if (name) {
          if (as === "override" || !(name in this.singleton.store))
            this.singleton.store[name] = value;
        } else
          this.singleton.store = value(this.singleton.store);
        return this;
      default:
        if (as === "override" || !(name in this.singleton.store))
          this.singleton.store[name] = value;
        return this;
    }
  }
  /**
   * ### decorate
   * Define custom method to `Context` accessible for all handler
   *
   * ---
   * @example
   * ```typescript
   * new Elysia()
   *     .decorate('getDate', () => Date.now())
   *     .get('/', (({ getDate }) => getDate())
   * ```
   */
  decorate(options, name, value) {
    if (name === void 0) {
      value = options;
      options = { as: "append" };
      name = "";
    } else if (value === void 0) {
      if (typeof options === "string") {
        value = name;
        name = options;
        options = { as: "append" };
      } else if (typeof options === "object") {
        value = name;
        name = "";
      }
    }
    const { as } = options;
    if (typeof name !== "string")
      return this;
    switch (typeof value) {
      case "object":
        if (name) {
          if (name in this.singleton.decorator)
            this.singleton.decorator[name] = mergeDeep(
              this.singleton.decorator[name],
              value,
              {
                override: as === "override"
              }
            );
          else
            this.singleton.decorator[name] = value;
          return this;
        }
        if (value === null)
          return this;
        this.singleton.decorator = mergeDeep(
          this.singleton.decorator,
          value,
          {
            override: as === "override"
          }
        );
        return this;
      case "function":
        if (name) {
          if (as === "override" || !(name in this.singleton.decorator))
            this.singleton.decorator[name] = value;
        } else
          this.singleton.decorator = value(this.singleton.decorator);
        return this;
      default:
        if (as === "override" || !(name in this.singleton.decorator))
          this.singleton.decorator[name] = value;
        return this;
    }
  }
  derive(optionsOrTransform, transform) {
    if (!transform) {
      transform = optionsOrTransform;
      optionsOrTransform = { as: "local" };
    }
    const hook = {
      subType: "derive",
      fn: transform
    };
    return this.onTransform(optionsOrTransform, hook);
  }
  model(name, model) {
    switch (typeof name) {
      case "object":
        Object.entries(name).forEach(([key, value]) => {
          if (!(key in this.definitions.type))
            this.definitions.type[key] = value;
        });
        return this;
      case "function":
        this.definitions.type = name(this.definitions.type);
        return this;
    }
    ;
    this.definitions.type[name] = model;
    return this;
  }
  mapDerive(optionsOrDerive, mapper) {
    if (!mapper) {
      mapper = optionsOrDerive;
      optionsOrDerive = { as: "local" };
    }
    const hook = {
      subType: "mapDerive",
      fn: mapper
    };
    return this.onTransform(optionsOrDerive, hook);
  }
  affix(base, type, word) {
    if (word === "")
      return this;
    const delimieter = ["_", "-", " "];
    const capitalize2 = /* @__PURE__ */ __name((word2) => word2[0].toUpperCase() + word2.slice(1), "capitalize");
    const joinKey = base === "prefix" ? (prefix, word2) => delimieter.includes(prefix.at(-1) ?? "") ? prefix + word2 : prefix + capitalize2(word2) : delimieter.includes(word.at(-1) ?? "") ? (suffix, word2) => word2 + suffix : (suffix, word2) => word2 + capitalize2(suffix);
    const remap = /* @__PURE__ */ __name((type2) => {
      const store = {};
      switch (type2) {
        case "decorator":
          for (const key in this.singleton.decorator) {
            store[joinKey(word, key)] = this.singleton.decorator[key];
          }
          this.singleton.decorator = store;
          break;
        case "state":
          for (const key in this.singleton.store)
            store[joinKey(word, key)] = this.singleton.store[key];
          this.singleton.store = store;
          break;
        case "model":
          for (const key in this.definitions.type)
            store[joinKey(word, key)] = this.definitions.type[key];
          this.definitions.type = store;
          break;
        case "error":
          for (const key in this.definitions.error)
            store[joinKey(word, key)] = this.definitions.error[key];
          this.definitions.error = store;
          break;
      }
    }, "remap");
    const types = Array.isArray(type) ? type : [type];
    for (const type2 of types.some((x) => x === "all") ? ["decorator", "state", "model", "error"] : types)
      remap(type2);
    return this;
  }
  prefix(type, word) {
    return this.affix("prefix", type, word);
  }
  suffix(type, word) {
    return this.affix("suffix", type, word);
  }
  compile() {
    this.fetch = this.config.aot ? composeGeneralHandler(this) : createDynamicHandler(this);
    if (typeof this.server?.reload === "function")
      this.server.reload({
        ...this.server || {},
        fetch: this.fetch
      });
    return this;
  }
  /**
   * Wait until all lazy loaded modules all load is fully
   */
  get modules() {
    return Promise.all(this.promisedModules.promises);
  }
}, "_Elysia");

// src/docs/Swagger.ts
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();

// node_modules/@elysiajs/swagger/dist/index.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();

// node_modules/pathe/dist/index.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();

// node_modules/pathe/dist/shared/pathe.ff20891b.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();
var _DRIVE_LETTER_START_RE = /^[A-Za-z]:\//;
function normalizeWindowsPath(input = "") {
  if (!input) {
    return input;
  }
  return input.replace(/\\/g, "/").replace(_DRIVE_LETTER_START_RE, (r) => r.toUpperCase());
}
__name(normalizeWindowsPath, "normalizeWindowsPath");
var _UNC_REGEX = /^[/\\]{2}/;
var _IS_ABSOLUTE_RE = /^[/\\](?![/\\])|^[/\\]{2}(?!\.)|^[A-Za-z]:[/\\]/;
var _DRIVE_LETTER_RE = /^[A-Za-z]:$/;
var normalize = /* @__PURE__ */ __name(function(path2) {
  if (path2.length === 0) {
    return ".";
  }
  path2 = normalizeWindowsPath(path2);
  const isUNCPath = path2.match(_UNC_REGEX);
  const isPathAbsolute = isAbsolute(path2);
  const trailingSeparator = path2[path2.length - 1] === "/";
  path2 = normalizeString(path2, !isPathAbsolute);
  if (path2.length === 0) {
    if (isPathAbsolute) {
      return "/";
    }
    return trailingSeparator ? "./" : ".";
  }
  if (trailingSeparator) {
    path2 += "/";
  }
  if (_DRIVE_LETTER_RE.test(path2)) {
    path2 += "/";
  }
  if (isUNCPath) {
    if (!isPathAbsolute) {
      return `//./${path2}`;
    }
    return `//${path2}`;
  }
  return isPathAbsolute && !isAbsolute(path2) ? `/${path2}` : path2;
}, "normalize");
function normalizeString(path2, allowAboveRoot) {
  let res = "";
  let lastSegmentLength = 0;
  let lastSlash = -1;
  let dots = 0;
  let char = null;
  for (let index = 0; index <= path2.length; ++index) {
    if (index < path2.length) {
      char = path2[index];
    } else if (char === "/") {
      break;
    } else {
      char = "/";
    }
    if (char === "/") {
      if (lastSlash === index - 1 || dots === 1)
        ;
      else if (dots === 2) {
        if (res.length < 2 || lastSegmentLength !== 2 || res[res.length - 1] !== "." || res[res.length - 2] !== ".") {
          if (res.length > 2) {
            const lastSlashIndex = res.lastIndexOf("/");
            if (lastSlashIndex === -1) {
              res = "";
              lastSegmentLength = 0;
            } else {
              res = res.slice(0, lastSlashIndex);
              lastSegmentLength = res.length - 1 - res.lastIndexOf("/");
            }
            lastSlash = index;
            dots = 0;
            continue;
          } else if (res.length > 0) {
            res = "";
            lastSegmentLength = 0;
            lastSlash = index;
            dots = 0;
            continue;
          }
        }
        if (allowAboveRoot) {
          res += res.length > 0 ? "/.." : "..";
          lastSegmentLength = 2;
        }
      } else {
        if (res.length > 0) {
          res += `/${path2.slice(lastSlash + 1, index)}`;
        } else {
          res = path2.slice(lastSlash + 1, index);
        }
        lastSegmentLength = index - lastSlash - 1;
      }
      lastSlash = index;
      dots = 0;
    } else if (char === "." && dots !== -1) {
      ++dots;
    } else {
      dots = -1;
    }
  }
  return res;
}
__name(normalizeString, "normalizeString");
var isAbsolute = /* @__PURE__ */ __name(function(p) {
  return _IS_ABSOLUTE_RE.test(p);
}, "isAbsolute");

// node_modules/@elysiajs/swagger/dist/index.mjs
function isSchemaObject(schema) {
  return "type" in schema || "properties" in schema || "items" in schema;
}
__name(isSchemaObject, "isSchemaObject");
function isDateTimeProperty(key, schema) {
  return (key === "createdAt" || key === "updatedAt") && "anyOf" in schema && Array.isArray(schema.anyOf);
}
__name(isDateTimeProperty, "isDateTimeProperty");
function transformDateProperties(schema) {
  if (!isSchemaObject(schema) || typeof schema !== "object" || schema === null) {
    return schema;
  }
  const newSchema = { ...schema };
  Object.entries(newSchema).forEach(([key, value]) => {
    if (isSchemaObject(value)) {
      if (isDateTimeProperty(key, value)) {
        const dateTimeFormat = value.anyOf?.find(
          (item) => isSchemaObject(item) && item.format === "date-time"
        );
        if (dateTimeFormat) {
          const dateTimeSchema = {
            type: "string",
            format: "date-time",
            default: dateTimeFormat.default
          };
          newSchema[key] = dateTimeSchema;
        }
      } else {
        newSchema[key] = transformDateProperties(value);
      }
    }
  });
  return newSchema;
}
__name(transformDateProperties, "transformDateProperties");
var SwaggerUIRender = /* @__PURE__ */ __name((info, version3, theme, stringifiedSwaggerOptions, autoDarkMode) => {
  const swaggerOptions = JSON.parse(stringifiedSwaggerOptions);
  if (swaggerOptions.components && swaggerOptions.components.schemas) {
    swaggerOptions.components.schemas = Object.fromEntries(
      Object.entries(swaggerOptions.components.schemas).map(([key, schema]) => [
        key,
        transformDateProperties(schema)
      ])
    );
  }
  const transformedStringifiedSwaggerOptions = JSON.stringify(swaggerOptions);
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${info.title}</title>
    <meta
        name="description"
        content="${info.description}"
    />
    <meta
        name="og:description"
        content="${info.description}"
    />
    ${autoDarkMode && typeof theme === "string" ? `
    <style>
        @media (prefers-color-scheme: dark) {
            body {
                background-color: #222;
                color: #faf9a;
            }
            .swagger-ui {
                filter: invert(92%) hue-rotate(180deg);
            }

            .swagger-ui .microlight {
                filter: invert(100%) hue-rotate(180deg);
            }
        }
    </style>` : ""}
    ${typeof theme === "string" ? `<link rel="stylesheet" href="${theme}" />` : `<link rel="stylesheet" media="(prefers-color-scheme: light)" href="${theme.light}" />
<link rel="stylesheet" media="(prefers-color-scheme: dark)" href="${theme.dark}" />`}
</head>
<body>
    <div id="swagger-ui"></div>
    <script src="https://unpkg.com/swagger-ui-dist@${version3}/swagger-ui-bundle.js" crossorigin><\/script>
    <script>
        window.onload = () => {
            window.ui = SwaggerUIBundle(${transformedStringifiedSwaggerOptions});
        };
    <\/script>
</body>
</html>`;
}, "SwaggerUIRender");
var theme_default = `
/* basic theme */
.light-mode {
  --theme-color-1: #2a2f45;
  --theme-color-2: #757575;
  --theme-color-3: #8e8e8e;
  --theme-color-accent: #f06292;

  --theme-background-1: #fff;
  --theme-background-2: #f6f6f6;
  --theme-background-3: #e7e7e7;
  --theme-background-accent: #f062921f;

  --theme-border-color: rgba(0, 0, 0, 0.1);
}
.dark-mode {
  --theme-color-1: rgba(255, 255, 255, 0.9);
  --theme-color-2: rgba(156, 163, 175, 1);
  --theme-color-3: rgba(255, 255, 255, 0.44);
  --theme-color-accent: #f06292;

  --theme-background-1: #111728;
  --theme-background-2: #1e293b;
  --theme-background-3: #334155;
  --theme-background-accent: #f062921f;

  --theme-border-color: rgba(255, 255, 255, 0.1);
}
/* Document Sidebar */
.light-mode .sidebar,
.dark-mode .sidebar {
  --sidebar-background-1: var(--theme-background-1);
  --sidebar-item-hover-color: currentColor;
  --sidebar-item-hover-background: var(--theme-background-2);
  --sidebar-item-active-background: var(--theme-background-accent);
  --sidebar-border-color: transparent;
  --sidebar-color-1: var(--theme-color-1);
  --sidebar-color-2: var(--theme-color-2);
  --sidebar-color-active: var(--theme-color-accent);
  --sidebar-search-background: transparent;
  --sidebar-search-border-color: var(--theme-border-color);
  --sidebar-search--color: var(--theme-color-3);
}
/* Document header only shows on mobile*/
.dark-mode .t-doc__header,
.light-mode .t-doc__header {
  --header-background-1: rgba(255, 255, 255, 0.85);
  --header-border-color: transparent;
  --header-color-1: var(--theme-color-1);
  --header-color-2: var(--theme-color-2);
  --header-background-toggle: var(--theme-color-3);
  --header-call-to-action-color: var(--theme-color-accent);
}

.dark-mode .t-doc__header {
  --header-background-1: rgba(17, 23, 40, 0.75);
}

/* advanced */
.light-mode {
  --theme-button-1: rgb(49 53 56);
  --theme-button-1-color: #fff;
  --theme-button-1-hover: rgb(28 31 33);

  --theme-color-green: #069061;
  --theme-color-red: #ef0006;
  --theme-color-yellow: #edbe20;
  --theme-color-blue: #0082d0;
  --theme-color-orange: #fb892c;
  --theme-color-purple: #5203d1;

  --theme-scrollbar-color: rgba(0, 0, 0, 0.18);
  --theme-scrollbar-color-active: rgba(0, 0, 0, 0.36);
}
.dark-mode {
  --theme-button-1: #f6f6f6;
  --theme-button-1-color: #000;
  --theme-button-1-hover: #e7e7e7;

  --theme-color-green: #a3ffa9;
  --theme-color-red: #ffa3a3;
  --theme-color-yellow: #fffca3;
  --theme-color-blue: #a5d6ff;
  --theme-color-orange: #e2ae83;
  --theme-color-purple: #d2a8ff;

  --theme-scrollbar-color: rgba(255, 255, 255, 0.24);
  --theme-scrollbar-color-active: rgba(255, 255, 255, 0.48);
}
/* Elysia Specific */
.scalar-api-client__send-request-button,
.show-api-client-button {
  background: #3c82f6 !important;
}
.show-api-client-button:before {
  display: none;
}

.sidebar-search:hover {
  transition: all 0.15s ease-in-out;
  --sidebar-search-border-color: var(--theme-color-accent) !important;
  color: var(--sidebar-color-1) !important;
}
.scalar-api-client__container .sidebar {
  --sidebar-border-color: var(--theme-border-color);
}
@media (min-width: 1150px) {
  .section-container:has( ~ .footer):before,
  .tag-section-container:before {
    content: "";
    position: absolute;
    top: -5px;
    left: 0;
    width: 100%;
    height: 10px;
    background: linear-gradient(90deg, var(--theme-background-1) 3%,transparent 10%);
  }
}
.section-flare {
  position: absolute;
  width: 100vw;
  height: 300px;
  --stripes: repeating-linear-gradient(
    100deg,
    #fff 0%,
    #fff 7%,
    transparent 10%,
    transparent 12%,
    #fff 16%
  );
  --stripesDark: repeating-linear-gradient(
    100deg,
    #000 0%,
    #000 7%,
    transparent 10%,
    transparent 12%,
    #000 16%
  );
  --rainbow: repeating-linear-gradient(
    100deg,
    #60a5fa 10%,
    #e879f9 16%,
    #5eead4 22%,
    #60a5fa 30%
  );
  background-image: var(--stripes), var(--rainbow);
  background-size: 300%, 200%;
  background-position: 50% 50%, 50% 50%;
  filter: invert(100%);
  -webkit-mask-image: radial-gradient(
    ellipse at 100% 0%,
    black 40%,
    transparent 70%
  );
  mask-image: radial-gradient(ellipse at 100% 0%, black 40%, transparent 70%);
  pointer-events: none;
  opacity: 0.15;
}
.dark-mode .section-flare {
  background-image: var(--stripesDark), var(--rainbow);
  filter: opacity(50%) saturate(200%);
  opacity: 0.25;
}
.section-flare:after {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-image: var(--stripes), var(--rainbow);
  background-size: 200%, 100%;
  background-attachment: fixed;
  mix-blend-mode: difference;
}
.dark-mode .section-flare:after {
  background-image: var(--stripesDark), var(--rainbow);
}
@keyframes headerbackground {
  from {
    background: transparent;
    backdrop-filter: none;
  }
  to {
    background: var(--header-background-1);
    backdrop-filter: blur(12px);
  }
}
.light-mode .t-doc__header,
.dark-mode .t-doc__header {
  animation: headerbackground forwards;
  animation-timeline: scroll();
  animation-range: 0px 200px;
  --header-border-color: transparent;
}
`;
var ScalarRender = /* @__PURE__ */ __name((info, version3, config2, cdn) => `<!doctype html>
<html>
  <head>
    <title>${info.title}</title>
    <meta
        name="description"
        content="${info.description}"
    />
    <meta
        name="og:description"
        content="${info.description}"
    />
    <meta charset="utf-8" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1" />
    <style>
      body {
        margin: 0;
      }
    </style>
    <style>
      ${config2.customCss ?? theme_default}
    </style>
  </head>
  <body>
    <script
      id="api-reference"
      data-url="${config2.spec?.url}"
      data-configuration='${JSON.stringify(config2)}'
    >
    <\/script>
    <script src="${cdn ? cdn : `https://cdn.jsdelivr.net/npm/@scalar/api-reference@${version3}/dist/browser/standalone.min.js`}" crossorigin><\/script>
  </body>
</html>`, "ScalarRender");
var TransformKind2 = Symbol.for("TypeBox.Transform");
var ReadonlyKind2 = Symbol.for("TypeBox.Readonly");
var OptionalKind2 = Symbol.for("TypeBox.Optional");
var Hint2 = Symbol.for("TypeBox.Hint");
var Kind2 = Symbol.for("TypeBox.Kind");
var PatternBoolean2 = "(true|false)";
var PatternNumber2 = "(0|[1-9][0-9]*)";
var PatternString2 = "(.*)";
var PatternBooleanExact2 = `^${PatternBoolean2}$`;
var PatternNumberExact2 = `^${PatternNumber2}$`;
var PatternStringExact2 = `^${PatternString2}$`;
var ExtendsResult2;
(function(ExtendsResult22) {
  ExtendsResult22[ExtendsResult22["Union"] = 0] = "Union";
  ExtendsResult22[ExtendsResult22["True"] = 1] = "True";
  ExtendsResult22[ExtendsResult22["False"] = 2] = "False";
})(ExtendsResult2 || (ExtendsResult2 = {}));
var toOpenAPIPath = /* @__PURE__ */ __name((path2) => path2.split("/").map((x) => {
  if (x.startsWith(":")) {
    x = x.slice(1, x.length);
    if (x.endsWith("?"))
      x = x.slice(0, -1);
    x = `{${x}}`;
  }
  return x;
}).join("/"), "toOpenAPIPath");
var mapProperties = /* @__PURE__ */ __name((name, schema, models) => {
  if (schema === void 0)
    return [];
  if (typeof schema === "string")
    if (schema in models)
      schema = models[schema];
    else
      throw new Error(`Can't find model ${schema}`);
  return Object.entries(schema?.properties ?? []).map(([key, value]) => {
    const {
      type: valueType = void 0,
      description,
      examples,
      ...schemaKeywords
    } = value;
    return {
      // @ts-ignore
      description,
      examples,
      schema: { type: valueType, ...schemaKeywords },
      in: name,
      name: key,
      // @ts-ignore
      required: schema.required?.includes(key) ?? false
    };
  });
}, "mapProperties");
var mapTypesResponse = /* @__PURE__ */ __name((types, schema) => {
  if (typeof schema === "object" && ["void", "undefined", "null"].includes(schema.type))
    return;
  const responses = {};
  for (const type of types) {
    responses[type] = {
      schema: typeof schema === "string" ? {
        $ref: `#/components/schemas/${schema}`
      } : { ...schema }
    };
  }
  return responses;
}, "mapTypesResponse");
var capitalize = /* @__PURE__ */ __name((word) => word.charAt(0).toUpperCase() + word.slice(1), "capitalize");
var generateOperationId = /* @__PURE__ */ __name((method, paths) => {
  let operationId = method.toLowerCase();
  if (paths === "/")
    return operationId + "Index";
  for (const path2 of paths.split("/")) {
    if (path2.charCodeAt(0) === 123) {
      operationId += "By" + capitalize(path2.slice(1, -1));
    } else {
      operationId += capitalize(path2);
    }
  }
  return operationId;
}, "generateOperationId");
var cloneHook = /* @__PURE__ */ __name((hook) => {
  if (!hook)
    return;
  if (typeof hook === "string")
    return hook;
  if (Array.isArray(hook))
    return [...hook];
  return { ...hook };
}, "cloneHook");
var registerSchemaPath = /* @__PURE__ */ __name(({
  schema,
  path: path2,
  method,
  hook,
  models
}) => {
  hook = cloneHook(hook);
  const contentType = hook?.type ?? [
    "application/json",
    "multipart/form-data",
    "text/plain"
  ];
  path2 = toOpenAPIPath(path2);
  const contentTypes = typeof contentType === "string" ? [contentType] : contentType ?? ["application/json"];
  const bodySchema = cloneHook(hook?.body);
  const paramsSchema = cloneHook(hook?.params);
  const headerSchema = cloneHook(hook?.headers);
  const querySchema = cloneHook(hook?.query);
  let responseSchema = cloneHook(hook?.response);
  if (typeof responseSchema === "object") {
    if (Kind2 in responseSchema) {
      const {
        type,
        properties,
        required,
        additionalProperties,
        patternProperties,
        ...rest
      } = responseSchema;
      responseSchema = {
        "200": {
          ...rest,
          description: rest.description,
          content: mapTypesResponse(
            contentTypes,
            type === "object" || type === "array" ? {
              type,
              properties,
              patternProperties,
              items: responseSchema.items,
              required
            } : responseSchema
          )
        }
      };
    } else {
      Object.entries(responseSchema).forEach(
        ([key, value]) => {
          if (typeof value === "string") {
            if (!models[value])
              return;
            const {
              type,
              properties,
              required,
              additionalProperties: _1,
              patternProperties: _2,
              ...rest
            } = models[value];
            responseSchema[key] = {
              ...rest,
              description: rest.description,
              content: mapTypesResponse(contentTypes, value)
            };
          } else {
            const {
              type,
              properties,
              required,
              additionalProperties,
              patternProperties,
              ...rest
            } = value;
            responseSchema[key] = {
              ...rest,
              description: rest.description,
              content: mapTypesResponse(
                contentTypes,
                type === "object" || type === "array" ? {
                  type,
                  properties,
                  patternProperties,
                  items: value.items,
                  required
                } : value
              )
            };
          }
        }
      );
    }
  } else if (typeof responseSchema === "string") {
    if (!(responseSchema in models))
      return;
    const {
      type,
      properties,
      required,
      additionalProperties: _1,
      patternProperties: _2,
      ...rest
    } = models[responseSchema];
    responseSchema = {
      // @ts-ignore
      "200": {
        ...rest,
        content: mapTypesResponse(contentTypes, responseSchema)
      }
    };
  }
  const parameters = [
    ...mapProperties("header", headerSchema, models),
    ...mapProperties("path", paramsSchema, models),
    ...mapProperties("query", querySchema, models)
  ];
  schema[path2] = {
    ...schema[path2] ? schema[path2] : {},
    [method.toLowerCase()]: {
      ...headerSchema || paramsSchema || querySchema || bodySchema ? { parameters } : {},
      ...responseSchema ? {
        responses: responseSchema
      } : {},
      operationId: hook?.detail?.operationId ?? generateOperationId(method, path2),
      ...hook?.detail,
      ...bodySchema ? {
        requestBody: {
          required: true,
          content: mapTypesResponse(
            contentTypes,
            typeof bodySchema === "string" ? {
              $ref: `#/components/schemas/${bodySchema}`
            } : bodySchema
          )
        }
      } : null
    }
  };
}, "registerSchemaPath");
var filterPaths = /* @__PURE__ */ __name((paths, docsPath, {
  excludeStaticFile = true,
  exclude = []
}) => {
  const newPaths = {};
  const excludePaths = [`/${docsPath}`, `/${docsPath}/json`].map(
    (p) => normalize(p)
  );
  for (const [key, value] of Object.entries(paths))
    if (!exclude.some((x) => {
      if (typeof x === "string")
        return key === x;
      return x.test(key);
    }) && !excludePaths.includes(key) && !key.includes("*") && (excludeStaticFile ? !key.includes(".") : true)) {
      Object.keys(value).forEach((method) => {
        const schema = value[method];
        if (key.includes("{")) {
          if (!schema.parameters)
            schema.parameters = [];
          schema.parameters = [
            ...key.split("/").filter(
              (x) => x.startsWith("{") && !schema.parameters.find(
                (params) => params.in === "path" && params.name === x.slice(1, x.length - 1)
              )
            ).map((x) => ({
              schema: { type: "string" },
              in: "path",
              name: x.slice(1, x.length - 1),
              required: true
            })),
            ...schema.parameters
          ];
        }
        if (!schema.responses)
          schema.responses = {
            200: {}
          };
      });
      newPaths[key] = value;
    }
  return newPaths;
}, "filterPaths");
var swagger = /* @__PURE__ */ __name(async ({
  provider = "scalar",
  scalarVersion = "latest",
  scalarCDN = "",
  scalarConfig = {},
  documentation = {},
  version: version3 = "5.9.0",
  excludeStaticFile = true,
  path: path2 = "/swagger",
  exclude = [],
  swaggerOptions = {},
  theme = `https://unpkg.com/swagger-ui-dist@${version3}/swagger-ui.css`,
  autoDarkMode = true,
  excludeMethods = ["OPTIONS"],
  excludeTags = []
} = {
  provider: "scalar",
  scalarVersion: "latest",
  scalarCDN: "",
  scalarConfig: {},
  documentation: {},
  version: "5.9.0",
  excludeStaticFile: true,
  path: "/swagger",
  exclude: [],
  swaggerOptions: {},
  autoDarkMode: true,
  excludeMethods: ["OPTIONS"],
  excludeTags: []
}) => {
  const schema = {};
  let totalRoutes = 0;
  if (!version3)
    version3 = `https://unpkg.com/swagger-ui-dist@${version3}/swagger-ui.css`;
  const info = {
    title: "Elysia Documentation",
    description: "Development documentation",
    version: "0.0.0",
    ...documentation.info
  };
  const relativePath = path2.startsWith("/") ? path2.slice(1) : path2;
  const app2 = new Elysia({ name: "@elysiajs/swagger" });
  app2.get(path2, /* @__PURE__ */ __name(function documentation2() {
    const combinedSwaggerOptions = {
      url: `/${relativePath}/json`,
      dom_id: "#swagger-ui",
      ...swaggerOptions
    };
    const stringifiedSwaggerOptions = JSON.stringify(
      combinedSwaggerOptions,
      (key, value) => {
        if (typeof value == "function")
          return void 0;
        return value;
      }
    );
    const scalarConfiguration = {
      spec: {
        ...scalarConfig.spec,
        url: `/${relativePath}/json`
      },
      ...scalarConfig
    };
    return new Response(
      provider === "swagger-ui" ? SwaggerUIRender(
        info,
        version3,
        theme,
        stringifiedSwaggerOptions,
        autoDarkMode
      ) : ScalarRender(info, scalarVersion, scalarConfiguration, scalarCDN),
      {
        headers: {
          "content-type": "text/html; charset=utf8"
        }
      }
    );
  }, "documentation2")).get(path2 === "/" ? "/json" : `${path2}/json`, /* @__PURE__ */ __name(function openAPISchema() {
    const routes = app2.getGlobalRoutes();
    if (routes.length !== totalRoutes) {
      const ALLOWED_METHODS = ["GET", "PUT", "POST", "DELETE", "OPTIONS", "HEAD", "PATCH", "TRACE"];
      totalRoutes = routes.length;
      routes.forEach((route) => {
        if (route.hooks?.detail?.hide === true)
          return;
        if (excludeMethods.includes(route.method))
          return;
        if (ALLOWED_METHODS.includes(route.method) === false && route.method !== "ALL")
          return;
        if (route.method === "ALL") {
          ALLOWED_METHODS.forEach((method) => {
            registerSchemaPath({
              schema,
              hook: route.hooks,
              method,
              path: route.path,
              // @ts-ignore
              models: app2.definitions?.type,
              contentType: route.hooks.type
            });
          });
          return;
        }
        registerSchemaPath({
          schema,
          hook: route.hooks,
          method: route.method,
          path: route.path,
          // @ts-ignore
          models: app2.definitions?.type,
          contentType: route.hooks.type
        });
      });
    }
    return {
      openapi: "3.0.3",
      ...{
        ...documentation,
        tags: documentation.tags?.filter(
          (tag) => !excludeTags?.includes(tag?.name)
        ),
        info: {
          title: "Elysia Documentation",
          description: "Development documentation",
          version: "0.0.0",
          ...documentation.info
        }
      },
      paths: {
        ...filterPaths(schema, relativePath, {
          excludeStaticFile,
          exclude: Array.isArray(exclude) ? exclude : [exclude]
        }),
        ...documentation.paths
      },
      components: {
        ...documentation.components,
        schemas: {
          // @ts-ignore
          ...app2.definitions?.type,
          ...documentation.components?.schemas
        }
      }
    };
  }, "openAPISchema"));
  return app2;
}, "swagger");
var src_default = swagger;

// src/docs/Swagger.ts
var Swagger_default = src_default({
  path: "/",
  documentation: {
    info: {
      title: "Blog Automation",
      description: "I'm tired of doing things manually so I created an automation",
      termsOfService: "https://tmsph.app/terms-service",
      contact: {
        name: "Me, Myself and I",
        url: "https://toyotalogistics.com.ph",
        email: "j.tan@toyota-mobilitysolutions.ph"
      },
      version: "0.0.1"
    },
    tags: [
      {
        name: "Blog",
        description: "Create Blogs Using AI"
      }
    ]
  }
});

// src/routes/MainRoutes.ts
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();

// src/routes/list/Generate.ts
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();
var Generate_default = new Elysia().get("/generate-blog", async (context) => {
  return Response.json({ message: "Hello World" });
}, {
  detail: {
    tags: ["Blog"]
  }
});

// src/routes/MainRoutes.ts
var MainRoutes_default = new Elysia({ prefix: "api/v1" }).use(Generate_default);

// node_modules/@elysiajs/cors/dist/index.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();
var isBun2 = typeof new Headers()?.toJSON === "function";
var processHeaders = /* @__PURE__ */ __name((headers) => {
  if (isBun2)
    return Object.keys(headers.toJSON()).join(", ");
  let keys = "";
  headers.forEach((_, key) => {
    keys += key + ", ";
  });
  if (keys)
    keys = keys.slice(0, -1);
  return keys;
}, "processHeaders");
var processOrigin = /* @__PURE__ */ __name((origin, request, from2) => {
  if (Array.isArray(origin))
    return origin.some((o) => processOrigin(o, request, from2));
  switch (typeof origin) {
    case "string":
      if (origin.indexOf("://") === -1)
        return from2.includes(origin);
      return origin === from2;
    case "function":
      return origin(request) === true;
    case "object":
      if (origin instanceof RegExp)
        return origin.test(from2);
  }
  return false;
}, "processOrigin");
var cors = /* @__PURE__ */ __name((config2) => {
  let {
    aot = true,
    origin = true,
    methods = true,
    allowedHeaders = true,
    exposeHeaders = true,
    credentials = true,
    maxAge = 5,
    preflight = true
  } = config2 ?? {};
  if (Array.isArray(allowedHeaders))
    allowedHeaders = allowedHeaders.join(", ");
  if (Array.isArray(exposeHeaders))
    exposeHeaders = exposeHeaders.join(", ");
  const origins = typeof origin === "boolean" ? void 0 : Array.isArray(origin) ? origin : [origin];
  const app2 = new Elysia({
    name: "@elysiajs/cors",
    seed: config2,
    aot
  });
  const anyOrigin = origins?.some((o) => o === "*");
  const handleOrigin = /* @__PURE__ */ __name((set2, request) => {
    if (origin === true) {
      set2.headers.vary = "*";
      set2.headers["access-control-allow-origin"] = request.headers.get("Origin") || "*";
      return;
    }
    if (anyOrigin) {
      set2.headers.vary = "*";
      set2.headers["access-control-allow-origin"] = "*";
      return;
    }
    if (!origins?.length)
      return;
    const headers = [];
    if (origins.length) {
      const from2 = request.headers.get("Origin") ?? "";
      for (let i = 0; i < origins.length; i++) {
        const value = processOrigin(origins[i], request, from2);
        if (value === true) {
          set2.headers.vary = origin ? "Origin" : "*";
          set2.headers["access-control-allow-origin"] = from2 || "*";
          return;
        }
        if (value)
          headers.push(value);
      }
    }
    set2.headers.vary = "Origin";
    if (headers.length)
      set2.headers["access-control-allow-origin"] = headers.join(", ");
  }, "handleOrigin");
  const handleMethod = /* @__PURE__ */ __name((set2, method) => {
    if (!method)
      return;
    if (methods === true)
      return set2.headers["access-control-allow-methods"] = method ?? "*";
    if (methods === false || !methods?.length)
      return;
    if (methods === "*")
      return set2.headers["access-control-allow-methods"] = "*";
    if (!Array.isArray(methods))
      return set2.headers["access-control-allow-methods"] = methods;
    set2.headers["access-control-allow-methods"] = methods.join(", ");
  }, "handleMethod");
  const defaultHeaders = {};
  if (typeof exposeHeaders === "string")
    defaultHeaders["access-control-expose-headers"] = exposeHeaders;
  if (typeof allowedHeaders === "string")
    defaultHeaders["access-control-allow-headers"] = allowedHeaders;
  if (credentials === true)
    defaultHeaders["access-control-allow-credentials"] = "true";
  app2.headers(defaultHeaders);
  function handleOption({ set: set2, request, headers }) {
    handleOrigin(set2, request);
    handleMethod(set2, request.headers.get("access-control-request-method"));
    if (allowedHeaders === true || exposeHeaders === true) {
      if (allowedHeaders === true)
        set2.headers["access-control-allow-headers"] = headers["access-control-request-headers"];
      if (exposeHeaders === true)
        set2.headers["access-control-expose-headers"] = Object.keys(headers).join(",");
    }
    if (maxAge)
      set2.headers["access-control-max-age"] = maxAge.toString();
    return new Response(null, {
      status: 204
    });
  }
  __name(handleOption, "handleOption");
  if (preflight)
    app2.options("/", handleOption).options("/*", handleOption);
  return app2.onRequest(/* @__PURE__ */ __name(function processCors({ set: set2, request }) {
    handleOrigin(set2, request);
    handleMethod(set2, request.method);
    if (allowedHeaders === true || exposeHeaders === true) {
      const headers = processHeaders(request.headers);
      if (allowedHeaders === true)
        set2.headers["access-control-allow-headers"] = headers;
      if (exposeHeaders === true)
        set2.headers["access-control-expose-headers"] = headers;
    }
  }, "processCors"));
}, "cors");
var src_default2 = cors;

// node_modules/@elysiajs/bearer/dist/index.mjs
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();
var bearer = /* @__PURE__ */ __name(({
  extract: {
    body = "access_token",
    query: queryName = "access_token",
    header = "Bearer"
  } = {
    body: "access_token",
    query: "access_token",
    header: "Bearer"
  }
} = {
  extract: {
    body: "access_token",
    query: "access_token",
    header: "Bearer"
  }
}) => new Elysia({
  name: "@elysiajs/bearer",
  seed: {
    body,
    query: queryName,
    header
  }
}).derive(
  { as: "global" },
  /* @__PURE__ */ __name(function deriveBearer({ query, headers: { authorization } }) {
    return {
      get bearer() {
        if (authorization?.startsWith(header))
          return authorization.slice(
            header.length + 1
          );
        const q = query[queryName];
        if (Array.isArray(q))
          return q[0];
        if (q)
          return q;
      }
    };
  }, "deriveBearer")
), "bearer");
var src_default3 = bearer;

// src/app.ts
var app = new Elysia({ aot: false }).trace(async ({ onHandle }) => {
  onHandle(({ begin, onStop }) => {
    onStop(({ end }) => {
      console.log("Handle took", end - begin, "ms");
    });
  });
}).onError(({ code, error: error2 }) => {
  console.log(code);
  return new Response(JSON.stringify({ error: error2.toString() ?? code }), { status: 500 });
}).onAfterResponse(() => {
  console.log("Response", performance.now());
}).use(src_default2()).use(src_default3()).use(MainRoutes_default).use(Swagger_default);

// src/index.ts
var src_default4 = {
  async fetch(request, env3, ctx) {
    if (new URL(request.url).pathname === "/favicon.ico") {
      return new Response(null, { status: 204 });
    }
    const tasks = [];
    let simple = {
      prompt: "Tell me a joke about Cloudflare"
    };
    let response = await env3.AI.run("@cf/google/gemma-7b-it-lora", simple);
    tasks.push({ inputs: simple, response });
    console.log(response);
    app.decorate({
      env: env3,
      ctx
    });
    return await app.fetch(request);
  }
};

// node_modules/wrangler/templates/middleware/middleware-ensure-req-body-drained.ts
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();
var drainBody = /* @__PURE__ */ __name(async (request, env3, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env3);
  } finally {
    try {
      if (request.body !== null && !request.bodyUsed) {
        const reader = request.body.getReader();
        while (!(await reader.read()).done) {
        }
      }
    } catch (e) {
      console.error("Failed to drain the unused request body.", e);
    }
  }
}, "drainBody");
var middleware_ensure_req_body_drained_default = drainBody;

// node_modules/wrangler/templates/middleware/middleware-miniflare3-json-error.ts
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();
function reduceError(e) {
  return {
    name: e?.name,
    message: e?.message ?? String(e),
    stack: e?.stack,
    cause: e?.cause === void 0 ? void 0 : reduceError(e.cause)
  };
}
__name(reduceError, "reduceError");
var jsonError = /* @__PURE__ */ __name(async (request, env3, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env3);
  } catch (e) {
    const error2 = reduceError(e);
    return Response.json(error2, {
      status: 500,
      headers: { "MF-Experimental-Error-Stack": "true" }
    });
  }
}, "jsonError");
var middleware_miniflare3_json_error_default = jsonError;

// .wrangler/tmp/bundle-IO8iRY/middleware-insertion-facade.js
var __INTERNAL_WRANGLER_MIDDLEWARE__ = [
  middleware_ensure_req_body_drained_default,
  middleware_miniflare3_json_error_default
];
var middleware_insertion_facade_default = src_default4;

// node_modules/wrangler/templates/middleware/common.ts
init_checked_fetch();
init_modules_watch_stub();
init_process();
init_buffer();
var __facade_middleware__ = [];
function __facade_register__(...args) {
  __facade_middleware__.push(...args.flat());
}
__name(__facade_register__, "__facade_register__");
function __facade_invokeChain__(request, env3, ctx, dispatch, middlewareChain) {
  const [head, ...tail] = middlewareChain;
  const middlewareCtx = {
    dispatch,
    next(newRequest, newEnv) {
      return __facade_invokeChain__(newRequest, newEnv, ctx, dispatch, tail);
    }
  };
  return head(request, env3, ctx, middlewareCtx);
}
__name(__facade_invokeChain__, "__facade_invokeChain__");
function __facade_invoke__(request, env3, ctx, dispatch, finalMiddleware) {
  return __facade_invokeChain__(request, env3, ctx, dispatch, [
    ...__facade_middleware__,
    finalMiddleware
  ]);
}
__name(__facade_invoke__, "__facade_invoke__");

// .wrangler/tmp/bundle-IO8iRY/middleware-loader.entry.ts
var __Facade_ScheduledController__ = class {
  constructor(scheduledTime, cron, noRetry) {
    this.scheduledTime = scheduledTime;
    this.cron = cron;
    this.#noRetry = noRetry;
  }
  #noRetry;
  noRetry() {
    if (!(this instanceof __Facade_ScheduledController__)) {
      throw new TypeError("Illegal invocation");
    }
    this.#noRetry();
  }
};
__name(__Facade_ScheduledController__, "__Facade_ScheduledController__");
function wrapExportedHandler(worker) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return worker;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  const fetchDispatcher = /* @__PURE__ */ __name(function(request, env3, ctx) {
    if (worker.fetch === void 0) {
      throw new Error("Handler does not export a fetch() function.");
    }
    return worker.fetch(request, env3, ctx);
  }, "fetchDispatcher");
  return {
    ...worker,
    fetch(request, env3, ctx) {
      const dispatcher = /* @__PURE__ */ __name(function(type, init2) {
        if (type === "scheduled" && worker.scheduled !== void 0) {
          const controller = new __Facade_ScheduledController__(
            Date.now(),
            init2.cron ?? "",
            () => {
            }
          );
          return worker.scheduled(controller, env3, ctx);
        }
      }, "dispatcher");
      return __facade_invoke__(request, env3, ctx, dispatcher, fetchDispatcher);
    }
  };
}
__name(wrapExportedHandler, "wrapExportedHandler");
function wrapWorkerEntrypoint(klass) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return klass;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  return class extends klass {
    #fetchDispatcher = (request, env3, ctx) => {
      this.env = env3;
      this.ctx = ctx;
      if (super.fetch === void 0) {
        throw new Error("Entrypoint class does not define a fetch() function.");
      }
      return super.fetch(request);
    };
    #dispatcher = (type, init2) => {
      if (type === "scheduled" && super.scheduled !== void 0) {
        const controller = new __Facade_ScheduledController__(
          Date.now(),
          init2.cron ?? "",
          () => {
          }
        );
        return super.scheduled(controller);
      }
    };
    fetch(request) {
      return __facade_invoke__(
        request,
        this.env,
        this.ctx,
        this.#dispatcher,
        this.#fetchDispatcher
      );
    }
  };
}
__name(wrapWorkerEntrypoint, "wrapWorkerEntrypoint");
var WRAPPED_ENTRY;
if (typeof middleware_insertion_facade_default === "object") {
  WRAPPED_ENTRY = wrapExportedHandler(middleware_insertion_facade_default);
} else if (typeof middleware_insertion_facade_default === "function") {
  WRAPPED_ENTRY = wrapWorkerEntrypoint(middleware_insertion_facade_default);
}
var middleware_loader_entry_default = WRAPPED_ENTRY;
export {
  __INTERNAL_WRANGLER_MIDDLEWARE__,
  middleware_loader_entry_default as default
};
/*! Bundled license information:

@esbuild-plugins/node-globals-polyfill/Buffer.js:
  (*!
   * The buffer module from node.js, for the browser.
   *
   * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
   * @license  MIT
   *)

elysia/dist/index.mjs:
  (**
   * @license
   * 
   * MIT License
   * 
   * Copyright (c) 2020 Evgeny Poberezkin
   * 
   * Permission is hereby granted, free of charge, to any person obtaining a copy
   * of this software and associated documentation files (the "Software"), to deal
   * in the Software without restriction, including without limitation the rights
   * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   * copies of the Software, and to permit persons to whom the Software is
   * furnished to do so, subject to the following conditions:
   * 
   * The above copyright notice and this permission notice shall be included in all
   * copies or substantial portions of the Software.
   * 
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
   * SOFTWARE.
   *)
*/
//# sourceMappingURL=index.js.map
