"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));

// node_modules/qrcode-terminal/vendor/QRCode/QRMode.js
var require_QRMode = __commonJS({
  "node_modules/qrcode-terminal/vendor/QRCode/QRMode.js"(exports, module2) {
    module2.exports = {
      MODE_NUMBER: 1 << 0,
      MODE_ALPHA_NUM: 1 << 1,
      MODE_8BIT_BYTE: 1 << 2,
      MODE_KANJI: 1 << 3
    };
  }
});

// node_modules/qrcode-terminal/vendor/QRCode/QR8bitByte.js
var require_QR8bitByte = __commonJS({
  "node_modules/qrcode-terminal/vendor/QRCode/QR8bitByte.js"(exports, module2) {
    var QRMode = require_QRMode();
    function QR8bitByte(data) {
      this.mode = QRMode.MODE_8BIT_BYTE;
      this.data = data;
    }
    QR8bitByte.prototype = {
      getLength: function() {
        return this.data.length;
      },
      write: function(buffer) {
        for (var i = 0; i < this.data.length; i++) {
          buffer.put(this.data.charCodeAt(i), 8);
        }
      }
    };
    module2.exports = QR8bitByte;
  }
});

// node_modules/qrcode-terminal/vendor/QRCode/QRMath.js
var require_QRMath = __commonJS({
  "node_modules/qrcode-terminal/vendor/QRCode/QRMath.js"(exports, module2) {
    var QRMath = {
      glog: function(n) {
        if (n < 1) {
          throw new Error("glog(" + n + ")");
        }
        return QRMath.LOG_TABLE[n];
      },
      gexp: function(n) {
        while (n < 0) {
          n += 255;
        }
        while (n >= 256) {
          n -= 255;
        }
        return QRMath.EXP_TABLE[n];
      },
      EXP_TABLE: new Array(256),
      LOG_TABLE: new Array(256)
    };
    for (i = 0; i < 8; i++) {
      QRMath.EXP_TABLE[i] = 1 << i;
    }
    var i;
    for (i = 8; i < 256; i++) {
      QRMath.EXP_TABLE[i] = QRMath.EXP_TABLE[i - 4] ^ QRMath.EXP_TABLE[i - 5] ^ QRMath.EXP_TABLE[i - 6] ^ QRMath.EXP_TABLE[i - 8];
    }
    var i;
    for (i = 0; i < 255; i++) {
      QRMath.LOG_TABLE[QRMath.EXP_TABLE[i]] = i;
    }
    var i;
    module2.exports = QRMath;
  }
});

// node_modules/qrcode-terminal/vendor/QRCode/QRPolynomial.js
var require_QRPolynomial = __commonJS({
  "node_modules/qrcode-terminal/vendor/QRCode/QRPolynomial.js"(exports, module2) {
    var QRMath = require_QRMath();
    function QRPolynomial(num, shift) {
      if (num.length === void 0) {
        throw new Error(num.length + "/" + shift);
      }
      var offset = 0;
      while (offset < num.length && num[offset] === 0) {
        offset++;
      }
      this.num = new Array(num.length - offset + shift);
      for (var i = 0; i < num.length - offset; i++) {
        this.num[i] = num[i + offset];
      }
    }
    QRPolynomial.prototype = {
      get: function(index) {
        return this.num[index];
      },
      getLength: function() {
        return this.num.length;
      },
      multiply: function(e) {
        var num = new Array(this.getLength() + e.getLength() - 1);
        for (var i = 0; i < this.getLength(); i++) {
          for (var j = 0; j < e.getLength(); j++) {
            num[i + j] ^= QRMath.gexp(QRMath.glog(this.get(i)) + QRMath.glog(e.get(j)));
          }
        }
        return new QRPolynomial(num, 0);
      },
      mod: function(e) {
        if (this.getLength() - e.getLength() < 0) {
          return this;
        }
        var ratio = QRMath.glog(this.get(0)) - QRMath.glog(e.get(0));
        var num = new Array(this.getLength());
        for (var i = 0; i < this.getLength(); i++) {
          num[i] = this.get(i);
        }
        for (var x = 0; x < e.getLength(); x++) {
          num[x] ^= QRMath.gexp(QRMath.glog(e.get(x)) + ratio);
        }
        return new QRPolynomial(num, 0).mod(e);
      }
    };
    module2.exports = QRPolynomial;
  }
});

// node_modules/qrcode-terminal/vendor/QRCode/QRMaskPattern.js
var require_QRMaskPattern = __commonJS({
  "node_modules/qrcode-terminal/vendor/QRCode/QRMaskPattern.js"(exports, module2) {
    module2.exports = {
      PATTERN000: 0,
      PATTERN001: 1,
      PATTERN010: 2,
      PATTERN011: 3,
      PATTERN100: 4,
      PATTERN101: 5,
      PATTERN110: 6,
      PATTERN111: 7
    };
  }
});

// node_modules/qrcode-terminal/vendor/QRCode/QRUtil.js
var require_QRUtil = __commonJS({
  "node_modules/qrcode-terminal/vendor/QRCode/QRUtil.js"(exports, module2) {
    var QRMode = require_QRMode();
    var QRPolynomial = require_QRPolynomial();
    var QRMath = require_QRMath();
    var QRMaskPattern = require_QRMaskPattern();
    var QRUtil = {
      PATTERN_POSITION_TABLE: [
        [],
        [6, 18],
        [6, 22],
        [6, 26],
        [6, 30],
        [6, 34],
        [6, 22, 38],
        [6, 24, 42],
        [6, 26, 46],
        [6, 28, 50],
        [6, 30, 54],
        [6, 32, 58],
        [6, 34, 62],
        [6, 26, 46, 66],
        [6, 26, 48, 70],
        [6, 26, 50, 74],
        [6, 30, 54, 78],
        [6, 30, 56, 82],
        [6, 30, 58, 86],
        [6, 34, 62, 90],
        [6, 28, 50, 72, 94],
        [6, 26, 50, 74, 98],
        [6, 30, 54, 78, 102],
        [6, 28, 54, 80, 106],
        [6, 32, 58, 84, 110],
        [6, 30, 58, 86, 114],
        [6, 34, 62, 90, 118],
        [6, 26, 50, 74, 98, 122],
        [6, 30, 54, 78, 102, 126],
        [6, 26, 52, 78, 104, 130],
        [6, 30, 56, 82, 108, 134],
        [6, 34, 60, 86, 112, 138],
        [6, 30, 58, 86, 114, 142],
        [6, 34, 62, 90, 118, 146],
        [6, 30, 54, 78, 102, 126, 150],
        [6, 24, 50, 76, 102, 128, 154],
        [6, 28, 54, 80, 106, 132, 158],
        [6, 32, 58, 84, 110, 136, 162],
        [6, 26, 54, 82, 110, 138, 166],
        [6, 30, 58, 86, 114, 142, 170]
      ],
      G15: 1 << 10 | 1 << 8 | 1 << 5 | 1 << 4 | 1 << 2 | 1 << 1 | 1 << 0,
      G18: 1 << 12 | 1 << 11 | 1 << 10 | 1 << 9 | 1 << 8 | 1 << 5 | 1 << 2 | 1 << 0,
      G15_MASK: 1 << 14 | 1 << 12 | 1 << 10 | 1 << 4 | 1 << 1,
      getBCHTypeInfo: function(data) {
        var d = data << 10;
        while (QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G15) >= 0) {
          d ^= QRUtil.G15 << QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G15);
        }
        return (data << 10 | d) ^ QRUtil.G15_MASK;
      },
      getBCHTypeNumber: function(data) {
        var d = data << 12;
        while (QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G18) >= 0) {
          d ^= QRUtil.G18 << QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G18);
        }
        return data << 12 | d;
      },
      getBCHDigit: function(data) {
        var digit = 0;
        while (data !== 0) {
          digit++;
          data >>>= 1;
        }
        return digit;
      },
      getPatternPosition: function(typeNumber) {
        return QRUtil.PATTERN_POSITION_TABLE[typeNumber - 1];
      },
      getMask: function(maskPattern, i, j) {
        switch (maskPattern) {
          case QRMaskPattern.PATTERN000:
            return (i + j) % 2 === 0;
          case QRMaskPattern.PATTERN001:
            return i % 2 === 0;
          case QRMaskPattern.PATTERN010:
            return j % 3 === 0;
          case QRMaskPattern.PATTERN011:
            return (i + j) % 3 === 0;
          case QRMaskPattern.PATTERN100:
            return (Math.floor(i / 2) + Math.floor(j / 3)) % 2 === 0;
          case QRMaskPattern.PATTERN101:
            return i * j % 2 + i * j % 3 === 0;
          case QRMaskPattern.PATTERN110:
            return (i * j % 2 + i * j % 3) % 2 === 0;
          case QRMaskPattern.PATTERN111:
            return (i * j % 3 + (i + j) % 2) % 2 === 0;
          default:
            throw new Error("bad maskPattern:" + maskPattern);
        }
      },
      getErrorCorrectPolynomial: function(errorCorrectLength) {
        var a = new QRPolynomial([1], 0);
        for (var i = 0; i < errorCorrectLength; i++) {
          a = a.multiply(new QRPolynomial([1, QRMath.gexp(i)], 0));
        }
        return a;
      },
      getLengthInBits: function(mode, type) {
        if (1 <= type && type < 10) {
          switch (mode) {
            case QRMode.MODE_NUMBER:
              return 10;
            case QRMode.MODE_ALPHA_NUM:
              return 9;
            case QRMode.MODE_8BIT_BYTE:
              return 8;
            case QRMode.MODE_KANJI:
              return 8;
            default:
              throw new Error("mode:" + mode);
          }
        } else if (type < 27) {
          switch (mode) {
            case QRMode.MODE_NUMBER:
              return 12;
            case QRMode.MODE_ALPHA_NUM:
              return 11;
            case QRMode.MODE_8BIT_BYTE:
              return 16;
            case QRMode.MODE_KANJI:
              return 10;
            default:
              throw new Error("mode:" + mode);
          }
        } else if (type < 41) {
          switch (mode) {
            case QRMode.MODE_NUMBER:
              return 14;
            case QRMode.MODE_ALPHA_NUM:
              return 13;
            case QRMode.MODE_8BIT_BYTE:
              return 16;
            case QRMode.MODE_KANJI:
              return 12;
            default:
              throw new Error("mode:" + mode);
          }
        } else {
          throw new Error("type:" + type);
        }
      },
      getLostPoint: function(qrCode) {
        var moduleCount = qrCode.getModuleCount();
        var lostPoint = 0;
        var row = 0;
        var col = 0;
        for (row = 0; row < moduleCount; row++) {
          for (col = 0; col < moduleCount; col++) {
            var sameCount = 0;
            var dark = qrCode.isDark(row, col);
            for (var r = -1; r <= 1; r++) {
              if (row + r < 0 || moduleCount <= row + r) {
                continue;
              }
              for (var c = -1; c <= 1; c++) {
                if (col + c < 0 || moduleCount <= col + c) {
                  continue;
                }
                if (r === 0 && c === 0) {
                  continue;
                }
                if (dark === qrCode.isDark(row + r, col + c)) {
                  sameCount++;
                }
              }
            }
            if (sameCount > 5) {
              lostPoint += 3 + sameCount - 5;
            }
          }
        }
        for (row = 0; row < moduleCount - 1; row++) {
          for (col = 0; col < moduleCount - 1; col++) {
            var count = 0;
            if (qrCode.isDark(row, col))
              count++;
            if (qrCode.isDark(row + 1, col))
              count++;
            if (qrCode.isDark(row, col + 1))
              count++;
            if (qrCode.isDark(row + 1, col + 1))
              count++;
            if (count === 0 || count === 4) {
              lostPoint += 3;
            }
          }
        }
        for (row = 0; row < moduleCount; row++) {
          for (col = 0; col < moduleCount - 6; col++) {
            if (qrCode.isDark(row, col) && !qrCode.isDark(row, col + 1) && qrCode.isDark(row, col + 2) && qrCode.isDark(row, col + 3) && qrCode.isDark(row, col + 4) && !qrCode.isDark(row, col + 5) && qrCode.isDark(row, col + 6)) {
              lostPoint += 40;
            }
          }
        }
        for (col = 0; col < moduleCount; col++) {
          for (row = 0; row < moduleCount - 6; row++) {
            if (qrCode.isDark(row, col) && !qrCode.isDark(row + 1, col) && qrCode.isDark(row + 2, col) && qrCode.isDark(row + 3, col) && qrCode.isDark(row + 4, col) && !qrCode.isDark(row + 5, col) && qrCode.isDark(row + 6, col)) {
              lostPoint += 40;
            }
          }
        }
        var darkCount = 0;
        for (col = 0; col < moduleCount; col++) {
          for (row = 0; row < moduleCount; row++) {
            if (qrCode.isDark(row, col)) {
              darkCount++;
            }
          }
        }
        var ratio = Math.abs(100 * darkCount / moduleCount / moduleCount - 50) / 5;
        lostPoint += ratio * 10;
        return lostPoint;
      }
    };
    module2.exports = QRUtil;
  }
});

// node_modules/qrcode-terminal/vendor/QRCode/QRErrorCorrectLevel.js
var require_QRErrorCorrectLevel = __commonJS({
  "node_modules/qrcode-terminal/vendor/QRCode/QRErrorCorrectLevel.js"(exports, module2) {
    module2.exports = {
      L: 1,
      M: 0,
      Q: 3,
      H: 2
    };
  }
});

// node_modules/qrcode-terminal/vendor/QRCode/QRRSBlock.js
var require_QRRSBlock = __commonJS({
  "node_modules/qrcode-terminal/vendor/QRCode/QRRSBlock.js"(exports, module2) {
    var QRErrorCorrectLevel = require_QRErrorCorrectLevel();
    function QRRSBlock(totalCount, dataCount) {
      this.totalCount = totalCount;
      this.dataCount = dataCount;
    }
    QRRSBlock.RS_BLOCK_TABLE = [
      [1, 26, 19],
      [1, 26, 16],
      [1, 26, 13],
      [1, 26, 9],
      [1, 44, 34],
      [1, 44, 28],
      [1, 44, 22],
      [1, 44, 16],
      [1, 70, 55],
      [1, 70, 44],
      [2, 35, 17],
      [2, 35, 13],
      [1, 100, 80],
      [2, 50, 32],
      [2, 50, 24],
      [4, 25, 9],
      [1, 134, 108],
      [2, 67, 43],
      [2, 33, 15, 2, 34, 16],
      [2, 33, 11, 2, 34, 12],
      [2, 86, 68],
      [4, 43, 27],
      [4, 43, 19],
      [4, 43, 15],
      [2, 98, 78],
      [4, 49, 31],
      [2, 32, 14, 4, 33, 15],
      [4, 39, 13, 1, 40, 14],
      [2, 121, 97],
      [2, 60, 38, 2, 61, 39],
      [4, 40, 18, 2, 41, 19],
      [4, 40, 14, 2, 41, 15],
      [2, 146, 116],
      [3, 58, 36, 2, 59, 37],
      [4, 36, 16, 4, 37, 17],
      [4, 36, 12, 4, 37, 13],
      [2, 86, 68, 2, 87, 69],
      [4, 69, 43, 1, 70, 44],
      [6, 43, 19, 2, 44, 20],
      [6, 43, 15, 2, 44, 16],
      [4, 101, 81],
      [1, 80, 50, 4, 81, 51],
      [4, 50, 22, 4, 51, 23],
      [3, 36, 12, 8, 37, 13],
      [2, 116, 92, 2, 117, 93],
      [6, 58, 36, 2, 59, 37],
      [4, 46, 20, 6, 47, 21],
      [7, 42, 14, 4, 43, 15],
      [4, 133, 107],
      [8, 59, 37, 1, 60, 38],
      [8, 44, 20, 4, 45, 21],
      [12, 33, 11, 4, 34, 12],
      [3, 145, 115, 1, 146, 116],
      [4, 64, 40, 5, 65, 41],
      [11, 36, 16, 5, 37, 17],
      [11, 36, 12, 5, 37, 13],
      [5, 109, 87, 1, 110, 88],
      [5, 65, 41, 5, 66, 42],
      [5, 54, 24, 7, 55, 25],
      [11, 36, 12],
      [5, 122, 98, 1, 123, 99],
      [7, 73, 45, 3, 74, 46],
      [15, 43, 19, 2, 44, 20],
      [3, 45, 15, 13, 46, 16],
      [1, 135, 107, 5, 136, 108],
      [10, 74, 46, 1, 75, 47],
      [1, 50, 22, 15, 51, 23],
      [2, 42, 14, 17, 43, 15],
      [5, 150, 120, 1, 151, 121],
      [9, 69, 43, 4, 70, 44],
      [17, 50, 22, 1, 51, 23],
      [2, 42, 14, 19, 43, 15],
      [3, 141, 113, 4, 142, 114],
      [3, 70, 44, 11, 71, 45],
      [17, 47, 21, 4, 48, 22],
      [9, 39, 13, 16, 40, 14],
      [3, 135, 107, 5, 136, 108],
      [3, 67, 41, 13, 68, 42],
      [15, 54, 24, 5, 55, 25],
      [15, 43, 15, 10, 44, 16],
      [4, 144, 116, 4, 145, 117],
      [17, 68, 42],
      [17, 50, 22, 6, 51, 23],
      [19, 46, 16, 6, 47, 17],
      [2, 139, 111, 7, 140, 112],
      [17, 74, 46],
      [7, 54, 24, 16, 55, 25],
      [34, 37, 13],
      [4, 151, 121, 5, 152, 122],
      [4, 75, 47, 14, 76, 48],
      [11, 54, 24, 14, 55, 25],
      [16, 45, 15, 14, 46, 16],
      [6, 147, 117, 4, 148, 118],
      [6, 73, 45, 14, 74, 46],
      [11, 54, 24, 16, 55, 25],
      [30, 46, 16, 2, 47, 17],
      [8, 132, 106, 4, 133, 107],
      [8, 75, 47, 13, 76, 48],
      [7, 54, 24, 22, 55, 25],
      [22, 45, 15, 13, 46, 16],
      [10, 142, 114, 2, 143, 115],
      [19, 74, 46, 4, 75, 47],
      [28, 50, 22, 6, 51, 23],
      [33, 46, 16, 4, 47, 17],
      [8, 152, 122, 4, 153, 123],
      [22, 73, 45, 3, 74, 46],
      [8, 53, 23, 26, 54, 24],
      [12, 45, 15, 28, 46, 16],
      [3, 147, 117, 10, 148, 118],
      [3, 73, 45, 23, 74, 46],
      [4, 54, 24, 31, 55, 25],
      [11, 45, 15, 31, 46, 16],
      [7, 146, 116, 7, 147, 117],
      [21, 73, 45, 7, 74, 46],
      [1, 53, 23, 37, 54, 24],
      [19, 45, 15, 26, 46, 16],
      [5, 145, 115, 10, 146, 116],
      [19, 75, 47, 10, 76, 48],
      [15, 54, 24, 25, 55, 25],
      [23, 45, 15, 25, 46, 16],
      [13, 145, 115, 3, 146, 116],
      [2, 74, 46, 29, 75, 47],
      [42, 54, 24, 1, 55, 25],
      [23, 45, 15, 28, 46, 16],
      [17, 145, 115],
      [10, 74, 46, 23, 75, 47],
      [10, 54, 24, 35, 55, 25],
      [19, 45, 15, 35, 46, 16],
      [17, 145, 115, 1, 146, 116],
      [14, 74, 46, 21, 75, 47],
      [29, 54, 24, 19, 55, 25],
      [11, 45, 15, 46, 46, 16],
      [13, 145, 115, 6, 146, 116],
      [14, 74, 46, 23, 75, 47],
      [44, 54, 24, 7, 55, 25],
      [59, 46, 16, 1, 47, 17],
      [12, 151, 121, 7, 152, 122],
      [12, 75, 47, 26, 76, 48],
      [39, 54, 24, 14, 55, 25],
      [22, 45, 15, 41, 46, 16],
      [6, 151, 121, 14, 152, 122],
      [6, 75, 47, 34, 76, 48],
      [46, 54, 24, 10, 55, 25],
      [2, 45, 15, 64, 46, 16],
      [17, 152, 122, 4, 153, 123],
      [29, 74, 46, 14, 75, 47],
      [49, 54, 24, 10, 55, 25],
      [24, 45, 15, 46, 46, 16],
      [4, 152, 122, 18, 153, 123],
      [13, 74, 46, 32, 75, 47],
      [48, 54, 24, 14, 55, 25],
      [42, 45, 15, 32, 46, 16],
      [20, 147, 117, 4, 148, 118],
      [40, 75, 47, 7, 76, 48],
      [43, 54, 24, 22, 55, 25],
      [10, 45, 15, 67, 46, 16],
      [19, 148, 118, 6, 149, 119],
      [18, 75, 47, 31, 76, 48],
      [34, 54, 24, 34, 55, 25],
      [20, 45, 15, 61, 46, 16]
    ];
    QRRSBlock.getRSBlocks = function(typeNumber, errorCorrectLevel) {
      var rsBlock = QRRSBlock.getRsBlockTable(typeNumber, errorCorrectLevel);
      if (rsBlock === void 0) {
        throw new Error("bad rs block @ typeNumber:" + typeNumber + "/errorCorrectLevel:" + errorCorrectLevel);
      }
      var length = rsBlock.length / 3;
      var list = [];
      for (var i = 0; i < length; i++) {
        var count = rsBlock[i * 3 + 0];
        var totalCount = rsBlock[i * 3 + 1];
        var dataCount = rsBlock[i * 3 + 2];
        for (var j = 0; j < count; j++) {
          list.push(new QRRSBlock(totalCount, dataCount));
        }
      }
      return list;
    };
    QRRSBlock.getRsBlockTable = function(typeNumber, errorCorrectLevel) {
      switch (errorCorrectLevel) {
        case QRErrorCorrectLevel.L:
          return QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 0];
        case QRErrorCorrectLevel.M:
          return QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 1];
        case QRErrorCorrectLevel.Q:
          return QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 2];
        case QRErrorCorrectLevel.H:
          return QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 3];
        default:
          return void 0;
      }
    };
    module2.exports = QRRSBlock;
  }
});

// node_modules/qrcode-terminal/vendor/QRCode/QRBitBuffer.js
var require_QRBitBuffer = __commonJS({
  "node_modules/qrcode-terminal/vendor/QRCode/QRBitBuffer.js"(exports, module2) {
    function QRBitBuffer() {
      this.buffer = [];
      this.length = 0;
    }
    QRBitBuffer.prototype = {
      get: function(index) {
        var bufIndex = Math.floor(index / 8);
        return (this.buffer[bufIndex] >>> 7 - index % 8 & 1) == 1;
      },
      put: function(num, length) {
        for (var i = 0; i < length; i++) {
          this.putBit((num >>> length - i - 1 & 1) == 1);
        }
      },
      getLengthInBits: function() {
        return this.length;
      },
      putBit: function(bit) {
        var bufIndex = Math.floor(this.length / 8);
        if (this.buffer.length <= bufIndex) {
          this.buffer.push(0);
        }
        if (bit) {
          this.buffer[bufIndex] |= 128 >>> this.length % 8;
        }
        this.length++;
      }
    };
    module2.exports = QRBitBuffer;
  }
});

// node_modules/qrcode-terminal/vendor/QRCode/index.js
var require_QRCode = __commonJS({
  "node_modules/qrcode-terminal/vendor/QRCode/index.js"(exports, module2) {
    var QR8bitByte = require_QR8bitByte();
    var QRUtil = require_QRUtil();
    var QRPolynomial = require_QRPolynomial();
    var QRRSBlock = require_QRRSBlock();
    var QRBitBuffer = require_QRBitBuffer();
    function QRCode(typeNumber, errorCorrectLevel) {
      this.typeNumber = typeNumber;
      this.errorCorrectLevel = errorCorrectLevel;
      this.modules = null;
      this.moduleCount = 0;
      this.dataCache = null;
      this.dataList = [];
    }
    QRCode.prototype = {
      addData: function(data) {
        var newData = new QR8bitByte(data);
        this.dataList.push(newData);
        this.dataCache = null;
      },
      isDark: function(row, col) {
        if (row < 0 || this.moduleCount <= row || col < 0 || this.moduleCount <= col) {
          throw new Error(row + "," + col);
        }
        return this.modules[row][col];
      },
      getModuleCount: function() {
        return this.moduleCount;
      },
      make: function() {
        if (this.typeNumber < 1) {
          var typeNumber = 1;
          for (typeNumber = 1; typeNumber < 40; typeNumber++) {
            var rsBlocks = QRRSBlock.getRSBlocks(typeNumber, this.errorCorrectLevel);
            var buffer = new QRBitBuffer();
            var totalDataCount = 0;
            for (var i = 0; i < rsBlocks.length; i++) {
              totalDataCount += rsBlocks[i].dataCount;
            }
            for (var x = 0; x < this.dataList.length; x++) {
              var data = this.dataList[x];
              buffer.put(data.mode, 4);
              buffer.put(data.getLength(), QRUtil.getLengthInBits(data.mode, typeNumber));
              data.write(buffer);
            }
            if (buffer.getLengthInBits() <= totalDataCount * 8)
              break;
          }
          this.typeNumber = typeNumber;
        }
        this.makeImpl(false, this.getBestMaskPattern());
      },
      makeImpl: function(test, maskPattern) {
        this.moduleCount = this.typeNumber * 4 + 17;
        this.modules = new Array(this.moduleCount);
        for (var row = 0; row < this.moduleCount; row++) {
          this.modules[row] = new Array(this.moduleCount);
          for (var col = 0; col < this.moduleCount; col++) {
            this.modules[row][col] = null;
          }
        }
        this.setupPositionProbePattern(0, 0);
        this.setupPositionProbePattern(this.moduleCount - 7, 0);
        this.setupPositionProbePattern(0, this.moduleCount - 7);
        this.setupPositionAdjustPattern();
        this.setupTimingPattern();
        this.setupTypeInfo(test, maskPattern);
        if (this.typeNumber >= 7) {
          this.setupTypeNumber(test);
        }
        if (this.dataCache === null) {
          this.dataCache = QRCode.createData(this.typeNumber, this.errorCorrectLevel, this.dataList);
        }
        this.mapData(this.dataCache, maskPattern);
      },
      setupPositionProbePattern: function(row, col) {
        for (var r = -1; r <= 7; r++) {
          if (row + r <= -1 || this.moduleCount <= row + r)
            continue;
          for (var c = -1; c <= 7; c++) {
            if (col + c <= -1 || this.moduleCount <= col + c)
              continue;
            if (0 <= r && r <= 6 && (c === 0 || c === 6) || 0 <= c && c <= 6 && (r === 0 || r === 6) || 2 <= r && r <= 4 && 2 <= c && c <= 4) {
              this.modules[row + r][col + c] = true;
            } else {
              this.modules[row + r][col + c] = false;
            }
          }
        }
      },
      getBestMaskPattern: function() {
        var minLostPoint = 0;
        var pattern = 0;
        for (var i = 0; i < 8; i++) {
          this.makeImpl(true, i);
          var lostPoint = QRUtil.getLostPoint(this);
          if (i === 0 || minLostPoint > lostPoint) {
            minLostPoint = lostPoint;
            pattern = i;
          }
        }
        return pattern;
      },
      createMovieClip: function(target_mc, instance_name, depth) {
        var qr_mc = target_mc.createEmptyMovieClip(instance_name, depth);
        var cs = 1;
        this.make();
        for (var row = 0; row < this.modules.length; row++) {
          var y = row * cs;
          for (var col = 0; col < this.modules[row].length; col++) {
            var x = col * cs;
            var dark = this.modules[row][col];
            if (dark) {
              qr_mc.beginFill(0, 100);
              qr_mc.moveTo(x, y);
              qr_mc.lineTo(x + cs, y);
              qr_mc.lineTo(x + cs, y + cs);
              qr_mc.lineTo(x, y + cs);
              qr_mc.endFill();
            }
          }
        }
        return qr_mc;
      },
      setupTimingPattern: function() {
        for (var r = 8; r < this.moduleCount - 8; r++) {
          if (this.modules[r][6] !== null) {
            continue;
          }
          this.modules[r][6] = r % 2 === 0;
        }
        for (var c = 8; c < this.moduleCount - 8; c++) {
          if (this.modules[6][c] !== null) {
            continue;
          }
          this.modules[6][c] = c % 2 === 0;
        }
      },
      setupPositionAdjustPattern: function() {
        var pos = QRUtil.getPatternPosition(this.typeNumber);
        for (var i = 0; i < pos.length; i++) {
          for (var j = 0; j < pos.length; j++) {
            var row = pos[i];
            var col = pos[j];
            if (this.modules[row][col] !== null) {
              continue;
            }
            for (var r = -2; r <= 2; r++) {
              for (var c = -2; c <= 2; c++) {
                if (Math.abs(r) === 2 || Math.abs(c) === 2 || r === 0 && c === 0) {
                  this.modules[row + r][col + c] = true;
                } else {
                  this.modules[row + r][col + c] = false;
                }
              }
            }
          }
        }
      },
      setupTypeNumber: function(test) {
        var bits = QRUtil.getBCHTypeNumber(this.typeNumber);
        var mod;
        for (var i = 0; i < 18; i++) {
          mod = !test && (bits >> i & 1) === 1;
          this.modules[Math.floor(i / 3)][i % 3 + this.moduleCount - 8 - 3] = mod;
        }
        for (var x = 0; x < 18; x++) {
          mod = !test && (bits >> x & 1) === 1;
          this.modules[x % 3 + this.moduleCount - 8 - 3][Math.floor(x / 3)] = mod;
        }
      },
      setupTypeInfo: function(test, maskPattern) {
        var data = this.errorCorrectLevel << 3 | maskPattern;
        var bits = QRUtil.getBCHTypeInfo(data);
        var mod;
        for (var v = 0; v < 15; v++) {
          mod = !test && (bits >> v & 1) === 1;
          if (v < 6) {
            this.modules[v][8] = mod;
          } else if (v < 8) {
            this.modules[v + 1][8] = mod;
          } else {
            this.modules[this.moduleCount - 15 + v][8] = mod;
          }
        }
        for (var h = 0; h < 15; h++) {
          mod = !test && (bits >> h & 1) === 1;
          if (h < 8) {
            this.modules[8][this.moduleCount - h - 1] = mod;
          } else if (h < 9) {
            this.modules[8][15 - h - 1 + 1] = mod;
          } else {
            this.modules[8][15 - h - 1] = mod;
          }
        }
        this.modules[this.moduleCount - 8][8] = !test;
      },
      mapData: function(data, maskPattern) {
        var inc = -1;
        var row = this.moduleCount - 1;
        var bitIndex = 7;
        var byteIndex = 0;
        for (var col = this.moduleCount - 1; col > 0; col -= 2) {
          if (col === 6)
            col--;
          while (true) {
            for (var c = 0; c < 2; c++) {
              if (this.modules[row][col - c] === null) {
                var dark = false;
                if (byteIndex < data.length) {
                  dark = (data[byteIndex] >>> bitIndex & 1) === 1;
                }
                var mask = QRUtil.getMask(maskPattern, row, col - c);
                if (mask) {
                  dark = !dark;
                }
                this.modules[row][col - c] = dark;
                bitIndex--;
                if (bitIndex === -1) {
                  byteIndex++;
                  bitIndex = 7;
                }
              }
            }
            row += inc;
            if (row < 0 || this.moduleCount <= row) {
              row -= inc;
              inc = -inc;
              break;
            }
          }
        }
      }
    };
    QRCode.PAD0 = 236;
    QRCode.PAD1 = 17;
    QRCode.createData = function(typeNumber, errorCorrectLevel, dataList) {
      var rsBlocks = QRRSBlock.getRSBlocks(typeNumber, errorCorrectLevel);
      var buffer = new QRBitBuffer();
      for (var i = 0; i < dataList.length; i++) {
        var data = dataList[i];
        buffer.put(data.mode, 4);
        buffer.put(data.getLength(), QRUtil.getLengthInBits(data.mode, typeNumber));
        data.write(buffer);
      }
      var totalDataCount = 0;
      for (var x = 0; x < rsBlocks.length; x++) {
        totalDataCount += rsBlocks[x].dataCount;
      }
      if (buffer.getLengthInBits() > totalDataCount * 8) {
        throw new Error("code length overflow. (" + buffer.getLengthInBits() + ">" + totalDataCount * 8 + ")");
      }
      if (buffer.getLengthInBits() + 4 <= totalDataCount * 8) {
        buffer.put(0, 4);
      }
      while (buffer.getLengthInBits() % 8 !== 0) {
        buffer.putBit(false);
      }
      while (true) {
        if (buffer.getLengthInBits() >= totalDataCount * 8) {
          break;
        }
        buffer.put(QRCode.PAD0, 8);
        if (buffer.getLengthInBits() >= totalDataCount * 8) {
          break;
        }
        buffer.put(QRCode.PAD1, 8);
      }
      return QRCode.createBytes(buffer, rsBlocks);
    };
    QRCode.createBytes = function(buffer, rsBlocks) {
      var offset = 0;
      var maxDcCount = 0;
      var maxEcCount = 0;
      var dcdata = new Array(rsBlocks.length);
      var ecdata = new Array(rsBlocks.length);
      for (var r = 0; r < rsBlocks.length; r++) {
        var dcCount = rsBlocks[r].dataCount;
        var ecCount = rsBlocks[r].totalCount - dcCount;
        maxDcCount = Math.max(maxDcCount, dcCount);
        maxEcCount = Math.max(maxEcCount, ecCount);
        dcdata[r] = new Array(dcCount);
        for (var i = 0; i < dcdata[r].length; i++) {
          dcdata[r][i] = 255 & buffer.buffer[i + offset];
        }
        offset += dcCount;
        var rsPoly = QRUtil.getErrorCorrectPolynomial(ecCount);
        var rawPoly = new QRPolynomial(dcdata[r], rsPoly.getLength() - 1);
        var modPoly = rawPoly.mod(rsPoly);
        ecdata[r] = new Array(rsPoly.getLength() - 1);
        for (var x = 0; x < ecdata[r].length; x++) {
          var modIndex = x + modPoly.getLength() - ecdata[r].length;
          ecdata[r][x] = modIndex >= 0 ? modPoly.get(modIndex) : 0;
        }
      }
      var totalCodeCount = 0;
      for (var y = 0; y < rsBlocks.length; y++) {
        totalCodeCount += rsBlocks[y].totalCount;
      }
      var data = new Array(totalCodeCount);
      var index = 0;
      for (var z = 0; z < maxDcCount; z++) {
        for (var s = 0; s < rsBlocks.length; s++) {
          if (z < dcdata[s].length) {
            data[index++] = dcdata[s][z];
          }
        }
      }
      for (var xx = 0; xx < maxEcCount; xx++) {
        for (var t = 0; t < rsBlocks.length; t++) {
          if (xx < ecdata[t].length) {
            data[index++] = ecdata[t][xx];
          }
        }
      }
      return data;
    };
    module2.exports = QRCode;
  }
});

// node_modules/qrcode-terminal/lib/main.js
var require_main = __commonJS({
  "node_modules/qrcode-terminal/lib/main.js"(exports, module2) {
    var QRCode = require_QRCode();
    var QRErrorCorrectLevel = require_QRErrorCorrectLevel();
    var black = "\x1B[40m  \x1B[0m";
    var white = "\x1B[47m  \x1B[0m";
    var toCell = function(isBlack) {
      return isBlack ? black : white;
    };
    var repeat = function(color) {
      return {
        times: function(count) {
          return new Array(count).join(color);
        }
      };
    };
    var fill = function(length, value) {
      var arr = new Array(length);
      for (var i = 0; i < length; i++) {
        arr[i] = value;
      }
      return arr;
    };
    module2.exports = {
      error: QRErrorCorrectLevel.L,
      generate: function(input, opts, cb) {
        if (typeof opts === "function") {
          cb = opts;
          opts = {};
        }
        var qrcode = new QRCode(-1, this.error);
        qrcode.addData(input);
        qrcode.make();
        var output = "";
        if (opts && opts.small) {
          var BLACK2 = true, WHITE2 = false;
          var moduleCount = qrcode.getModuleCount();
          var moduleData = qrcode.modules.slice();
          var oddRow = moduleCount % 2 === 1;
          if (oddRow) {
            moduleData.push(fill(moduleCount, WHITE2));
          }
          var platte = {
            WHITE_ALL: "\u2588",
            WHITE_BLACK: "\u2580",
            BLACK_WHITE: "\u2584",
            BLACK_ALL: " "
          };
          var borderTop = repeat(platte.BLACK_WHITE).times(moduleCount + 3);
          var borderBottom = repeat(platte.WHITE_BLACK).times(moduleCount + 3);
          output += borderTop + "\n";
          for (var row = 0; row < moduleCount; row += 2) {
            output += platte.WHITE_ALL;
            for (var col = 0; col < moduleCount; col++) {
              if (moduleData[row][col] === WHITE2 && moduleData[row + 1][col] === WHITE2) {
                output += platte.WHITE_ALL;
              } else if (moduleData[row][col] === WHITE2 && moduleData[row + 1][col] === BLACK2) {
                output += platte.WHITE_BLACK;
              } else if (moduleData[row][col] === BLACK2 && moduleData[row + 1][col] === WHITE2) {
                output += platte.BLACK_WHITE;
              } else {
                output += platte.BLACK_ALL;
              }
            }
            output += platte.WHITE_ALL + "\n";
          }
          if (!oddRow) {
            output += borderBottom;
          }
        } else {
          var border = repeat(white).times(qrcode.getModuleCount() + 3);
          output += border + "\n";
          qrcode.modules.forEach(function(row2) {
            output += white;
            output += row2.map(toCell).join("");
            output += white + "\n";
          });
          output += border;
        }
        if (cb)
          cb(output);
        else
          console.log(output);
      },
      setErrorLevel: function(error) {
        this.error = QRErrorCorrectLevel[error] || this.error;
      }
    };
  }
});

// src/index.ts
var import_whatsapp_web = require("whatsapp-web.js");
var import_qrcode_terminal = __toESM(require_main());

// node_modules/chess.js/chess.js
var SYMBOLS = "pnbrqkPNBRQK";
var DEFAULT_POSITION = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
var TERMINATION_MARKERS = ["1-0", "0-1", "1/2-1/2", "*"];
var PAWN_OFFSETS = {
  b: [16, 32, 17, 15],
  w: [-16, -32, -17, -15]
};
var PIECE_OFFSETS = {
  n: [-18, -33, -31, -14, 18, 33, 31, 14],
  b: [-17, -15, 17, 15],
  r: [-16, 1, 16, -1],
  q: [-17, -16, -15, 1, 17, 16, 15, -1],
  k: [-17, -16, -15, 1, 17, 16, 15, -1]
};
var ATTACKS = [
  20,
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
  20,
  0,
  0,
  20,
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
  20,
  0,
  0,
  0,
  0,
  20,
  0,
  0,
  0,
  0,
  24,
  0,
  0,
  0,
  0,
  20,
  0,
  0,
  0,
  0,
  0,
  0,
  20,
  0,
  0,
  0,
  24,
  0,
  0,
  0,
  20,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  20,
  0,
  0,
  24,
  0,
  0,
  20,
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
  20,
  2,
  24,
  2,
  20,
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
  2,
  53,
  56,
  53,
  2,
  0,
  0,
  0,
  0,
  0,
  0,
  24,
  24,
  24,
  24,
  24,
  24,
  56,
  0,
  56,
  24,
  24,
  24,
  24,
  24,
  24,
  0,
  0,
  0,
  0,
  0,
  0,
  2,
  53,
  56,
  53,
  2,
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
  20,
  2,
  24,
  2,
  20,
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
  20,
  0,
  0,
  24,
  0,
  0,
  20,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  20,
  0,
  0,
  0,
  24,
  0,
  0,
  0,
  20,
  0,
  0,
  0,
  0,
  0,
  0,
  20,
  0,
  0,
  0,
  0,
  24,
  0,
  0,
  0,
  0,
  20,
  0,
  0,
  0,
  0,
  20,
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
  20,
  0,
  0,
  20,
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
  20
];
var RAYS = [
  17,
  0,
  0,
  0,
  0,
  0,
  0,
  16,
  0,
  0,
  0,
  0,
  0,
  0,
  15,
  0,
  0,
  17,
  0,
  0,
  0,
  0,
  0,
  16,
  0,
  0,
  0,
  0,
  0,
  15,
  0,
  0,
  0,
  0,
  17,
  0,
  0,
  0,
  0,
  16,
  0,
  0,
  0,
  0,
  15,
  0,
  0,
  0,
  0,
  0,
  0,
  17,
  0,
  0,
  0,
  16,
  0,
  0,
  0,
  15,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  17,
  0,
  0,
  16,
  0,
  0,
  15,
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
  17,
  0,
  16,
  0,
  15,
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
  17,
  16,
  15,
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
  0,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  -15,
  -16,
  -17,
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
  -15,
  0,
  -16,
  0,
  -17,
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
  -15,
  0,
  0,
  -16,
  0,
  0,
  -17,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  -15,
  0,
  0,
  0,
  -16,
  0,
  0,
  0,
  -17,
  0,
  0,
  0,
  0,
  0,
  0,
  -15,
  0,
  0,
  0,
  0,
  -16,
  0,
  0,
  0,
  0,
  -17,
  0,
  0,
  0,
  0,
  -15,
  0,
  0,
  0,
  0,
  0,
  -16,
  0,
  0,
  0,
  0,
  0,
  -17,
  0,
  0,
  -15,
  0,
  0,
  0,
  0,
  0,
  0,
  -16,
  0,
  0,
  0,
  0,
  0,
  0,
  -17
];
var SHIFTS = { p: 0, n: 1, b: 2, r: 3, q: 4, k: 5 };
var BITS = {
  NORMAL: 1,
  CAPTURE: 2,
  BIG_PAWN: 4,
  EP_CAPTURE: 8,
  PROMOTION: 16,
  KSIDE_CASTLE: 32,
  QSIDE_CASTLE: 64
};
var RANK_1 = 7;
var RANK_2 = 6;
var RANK_7 = 1;
var RANK_8 = 0;
var SQUARE_MAP = {
  a8: 0,
  b8: 1,
  c8: 2,
  d8: 3,
  e8: 4,
  f8: 5,
  g8: 6,
  h8: 7,
  a7: 16,
  b7: 17,
  c7: 18,
  d7: 19,
  e7: 20,
  f7: 21,
  g7: 22,
  h7: 23,
  a6: 32,
  b6: 33,
  c6: 34,
  d6: 35,
  e6: 36,
  f6: 37,
  g6: 38,
  h6: 39,
  a5: 48,
  b5: 49,
  c5: 50,
  d5: 51,
  e5: 52,
  f5: 53,
  g5: 54,
  h5: 55,
  a4: 64,
  b4: 65,
  c4: 66,
  d4: 67,
  e4: 68,
  f4: 69,
  g4: 70,
  h4: 71,
  a3: 80,
  b3: 81,
  c3: 82,
  d3: 83,
  e3: 84,
  f3: 85,
  g3: 86,
  h3: 87,
  a2: 96,
  b2: 97,
  c2: 98,
  d2: 99,
  e2: 100,
  f2: 101,
  g2: 102,
  h2: 103,
  a1: 112,
  b1: 113,
  c1: 114,
  d1: 115,
  e1: 116,
  f1: 117,
  g1: 118,
  h1: 119
};
var ROOKS = {
  w: [
    { square: SQUARE_MAP.a1, flag: BITS.QSIDE_CASTLE },
    { square: SQUARE_MAP.h1, flag: BITS.KSIDE_CASTLE }
  ],
  b: [
    { square: SQUARE_MAP.a8, flag: BITS.QSIDE_CASTLE },
    { square: SQUARE_MAP.h8, flag: BITS.KSIDE_CASTLE }
  ]
};
var PARSER_STRICT = 0;
var PARSER_SLOPPY = 1;
function get_disambiguator(move2, moves) {
  var from = move2.from;
  var to = move2.to;
  var piece = move2.piece;
  var ambiguities = 0;
  var same_rank = 0;
  var same_file = 0;
  for (var i = 0, len = moves.length; i < len; i++) {
    var ambig_from = moves[i].from;
    var ambig_to = moves[i].to;
    var ambig_piece = moves[i].piece;
    if (piece === ambig_piece && from !== ambig_from && to === ambig_to) {
      ambiguities++;
      if (rank(from) === rank(ambig_from)) {
        same_rank++;
      }
      if (file(from) === file(ambig_from)) {
        same_file++;
      }
    }
  }
  if (ambiguities > 0) {
    if (same_rank > 0 && same_file > 0) {
      return algebraic(from);
    } else if (same_file > 0) {
      return algebraic(from).charAt(1);
    } else {
      return algebraic(from).charAt(0);
    }
  }
  return "";
}
function infer_piece_type(san) {
  var piece_type = san.charAt(0);
  if (piece_type >= "a" && piece_type <= "h") {
    var matches = san.match(/[a-h]\d.*[a-h]\d/);
    if (matches) {
      return void 0;
    }
    return PAWN;
  }
  piece_type = piece_type.toLowerCase();
  if (piece_type === "o") {
    return KING;
  }
  return piece_type;
}
function stripped_san(move2) {
  return move2.replace(/=/, "").replace(/[+#]?[?!]*$/, "");
}
function rank(i) {
  return i >> 4;
}
function file(i) {
  return i & 15;
}
function algebraic(i) {
  var f = file(i), r = rank(i);
  return "abcdefgh".substring(f, f + 1) + "87654321".substring(r, r + 1);
}
function swap_color(c) {
  return c === WHITE ? BLACK : WHITE;
}
function is_digit(c) {
  return "0123456789".indexOf(c) !== -1;
}
function clone(obj) {
  var dupe = obj instanceof Array ? [] : {};
  for (var property in obj) {
    if (typeof property === "object") {
      dupe[property] = clone(obj[property]);
    } else {
      dupe[property] = obj[property];
    }
  }
  return dupe;
}
function trim(str) {
  return str.replace(/^\s+|\s+$/g, "");
}
var BLACK = "b";
var WHITE = "w";
var EMPTY = -1;
var PAWN = "p";
var KNIGHT = "n";
var BISHOP = "b";
var ROOK = "r";
var QUEEN = "q";
var KING = "k";
var SQUARES = function() {
  var keys = [];
  for (var i = SQUARE_MAP.a8; i <= SQUARE_MAP.h1; i++) {
    if (i & 136) {
      i += 7;
      continue;
    }
    keys.push(algebraic(i));
  }
  return keys;
}();
var FLAGS = {
  NORMAL: "n",
  CAPTURE: "c",
  BIG_PAWN: "b",
  EP_CAPTURE: "e",
  PROMOTION: "p",
  KSIDE_CASTLE: "k",
  QSIDE_CASTLE: "q"
};
var Chess = function(fen) {
  var board = new Array(128);
  var kings = { w: EMPTY, b: EMPTY };
  var turn = WHITE;
  var castling = { w: 0, b: 0 };
  var ep_square = EMPTY;
  var half_moves = 0;
  var move_number = 1;
  var history = [];
  var header = {};
  var comments = {};
  if (typeof fen === "undefined") {
    load(DEFAULT_POSITION);
  } else {
    load(fen);
  }
  function clear(keep_headers) {
    if (typeof keep_headers === "undefined") {
      keep_headers = false;
    }
    board = new Array(128);
    kings = { w: EMPTY, b: EMPTY };
    turn = WHITE;
    castling = { w: 0, b: 0 };
    ep_square = EMPTY;
    half_moves = 0;
    move_number = 1;
    history = [];
    if (!keep_headers)
      header = {};
    comments = {};
    update_setup(generate_fen());
  }
  function prune_comments() {
    var reversed_history = [];
    var current_comments = {};
    var copy_comment = function(fen2) {
      if (fen2 in comments) {
        current_comments[fen2] = comments[fen2];
      }
    };
    while (history.length > 0) {
      reversed_history.push(undo_move());
    }
    copy_comment(generate_fen());
    while (reversed_history.length > 0) {
      make_move(reversed_history.pop());
      copy_comment(generate_fen());
    }
    comments = current_comments;
  }
  function reset() {
    load(DEFAULT_POSITION);
  }
  function load(fen2, keep_headers) {
    if (typeof keep_headers === "undefined") {
      keep_headers = false;
    }
    var tokens = fen2.split(/\s+/);
    var position = tokens[0];
    var square = 0;
    if (!validate_fen(fen2).valid) {
      return false;
    }
    clear(keep_headers);
    for (var i = 0; i < position.length; i++) {
      var piece = position.charAt(i);
      if (piece === "/") {
        square += 8;
      } else if (is_digit(piece)) {
        square += parseInt(piece, 10);
      } else {
        var color = piece < "a" ? WHITE : BLACK;
        put({ type: piece.toLowerCase(), color }, algebraic(square));
        square++;
      }
    }
    turn = tokens[1];
    if (tokens[2].indexOf("K") > -1) {
      castling.w |= BITS.KSIDE_CASTLE;
    }
    if (tokens[2].indexOf("Q") > -1) {
      castling.w |= BITS.QSIDE_CASTLE;
    }
    if (tokens[2].indexOf("k") > -1) {
      castling.b |= BITS.KSIDE_CASTLE;
    }
    if (tokens[2].indexOf("q") > -1) {
      castling.b |= BITS.QSIDE_CASTLE;
    }
    ep_square = tokens[3] === "-" ? EMPTY : SQUARE_MAP[tokens[3]];
    half_moves = parseInt(tokens[4], 10);
    move_number = parseInt(tokens[5], 10);
    update_setup(generate_fen());
    return true;
  }
  function validate_fen(fen2) {
    var errors = {
      0: "No errors.",
      1: "FEN string must contain six space-delimited fields.",
      2: "6th field (move number) must be a positive integer.",
      3: "5th field (half move counter) must be a non-negative integer.",
      4: "4th field (en-passant square) is invalid.",
      5: "3rd field (castling availability) is invalid.",
      6: "2nd field (side to move) is invalid.",
      7: "1st field (piece positions) does not contain 8 '/'-delimited rows.",
      8: "1st field (piece positions) is invalid [consecutive numbers].",
      9: "1st field (piece positions) is invalid [invalid piece].",
      10: "1st field (piece positions) is invalid [row too large].",
      11: "Illegal en-passant square"
    };
    var tokens = fen2.split(/\s+/);
    if (tokens.length !== 6) {
      return { valid: false, error_number: 1, error: errors[1] };
    }
    if (isNaN(parseInt(tokens[5])) || parseInt(tokens[5], 10) <= 0) {
      return { valid: false, error_number: 2, error: errors[2] };
    }
    if (isNaN(parseInt(tokens[4])) || parseInt(tokens[4], 10) < 0) {
      return { valid: false, error_number: 3, error: errors[3] };
    }
    if (!/^(-|[abcdefgh][36])$/.test(tokens[3])) {
      return { valid: false, error_number: 4, error: errors[4] };
    }
    if (!/^(KQ?k?q?|Qk?q?|kq?|q|-)$/.test(tokens[2])) {
      return { valid: false, error_number: 5, error: errors[5] };
    }
    if (!/^(w|b)$/.test(tokens[1])) {
      return { valid: false, error_number: 6, error: errors[6] };
    }
    var rows = tokens[0].split("/");
    if (rows.length !== 8) {
      return { valid: false, error_number: 7, error: errors[7] };
    }
    for (var i = 0; i < rows.length; i++) {
      var sum_fields = 0;
      var previous_was_number = false;
      for (var k = 0; k < rows[i].length; k++) {
        if (!isNaN(rows[i][k])) {
          if (previous_was_number) {
            return { valid: false, error_number: 8, error: errors[8] };
          }
          sum_fields += parseInt(rows[i][k], 10);
          previous_was_number = true;
        } else {
          if (!/^[prnbqkPRNBQK]$/.test(rows[i][k])) {
            return { valid: false, error_number: 9, error: errors[9] };
          }
          sum_fields += 1;
          previous_was_number = false;
        }
      }
      if (sum_fields !== 8) {
        return { valid: false, error_number: 10, error: errors[10] };
      }
    }
    if (tokens[3][1] == "3" && tokens[1] == "w" || tokens[3][1] == "6" && tokens[1] == "b") {
      return { valid: false, error_number: 11, error: errors[11] };
    }
    return { valid: true, error_number: 0, error: errors[0] };
  }
  function generate_fen() {
    var empty = 0;
    var fen2 = "";
    for (var i = SQUARE_MAP.a8; i <= SQUARE_MAP.h1; i++) {
      if (board[i] == null) {
        empty++;
      } else {
        if (empty > 0) {
          fen2 += empty;
          empty = 0;
        }
        var color = board[i].color;
        var piece = board[i].type;
        fen2 += color === WHITE ? piece.toUpperCase() : piece.toLowerCase();
      }
      if (i + 1 & 136) {
        if (empty > 0) {
          fen2 += empty;
        }
        if (i !== SQUARE_MAP.h1) {
          fen2 += "/";
        }
        empty = 0;
        i += 8;
      }
    }
    var cflags = "";
    if (castling[WHITE] & BITS.KSIDE_CASTLE) {
      cflags += "K";
    }
    if (castling[WHITE] & BITS.QSIDE_CASTLE) {
      cflags += "Q";
    }
    if (castling[BLACK] & BITS.KSIDE_CASTLE) {
      cflags += "k";
    }
    if (castling[BLACK] & BITS.QSIDE_CASTLE) {
      cflags += "q";
    }
    cflags = cflags || "-";
    var epflags = ep_square === EMPTY ? "-" : algebraic(ep_square);
    return [fen2, turn, cflags, epflags, half_moves, move_number].join(" ");
  }
  function set_header(args) {
    for (var i = 0; i < args.length; i += 2) {
      if (typeof args[i] === "string" && typeof args[i + 1] === "string") {
        header[args[i]] = args[i + 1];
      }
    }
    return header;
  }
  function update_setup(fen2) {
    if (history.length > 0)
      return;
    if (fen2 !== DEFAULT_POSITION) {
      header["SetUp"] = "1";
      header["FEN"] = fen2;
    } else {
      delete header["SetUp"];
      delete header["FEN"];
    }
  }
  function get(square) {
    var piece = board[SQUARE_MAP[square]];
    return piece ? { type: piece.type, color: piece.color } : null;
  }
  function put(piece, square) {
    if (!("type" in piece && "color" in piece)) {
      return false;
    }
    if (SYMBOLS.indexOf(piece.type.toLowerCase()) === -1) {
      return false;
    }
    if (!(square in SQUARE_MAP)) {
      return false;
    }
    var sq = SQUARE_MAP[square];
    if (piece.type == KING && !(kings[piece.color] == EMPTY || kings[piece.color] == sq)) {
      return false;
    }
    board[sq] = { type: piece.type, color: piece.color };
    if (piece.type === KING) {
      kings[piece.color] = sq;
    }
    update_setup(generate_fen());
    return true;
  }
  function remove(square) {
    var piece = get(square);
    board[SQUARE_MAP[square]] = null;
    if (piece && piece.type === KING) {
      kings[piece.color] = EMPTY;
    }
    update_setup(generate_fen());
    return piece;
  }
  function build_move(board2, from, to, flags, promotion) {
    var move2 = {
      color: turn,
      from,
      to,
      flags,
      piece: board2[from].type
    };
    if (promotion) {
      move2.flags |= BITS.PROMOTION;
      move2.promotion = promotion;
    }
    if (board2[to]) {
      move2.captured = board2[to].type;
    } else if (flags & BITS.EP_CAPTURE) {
      move2.captured = PAWN;
    }
    return move2;
  }
  function generate_moves(options) {
    function add_move(board2, moves2, from, to, flags) {
      if (board2[from].type === PAWN && (rank(to) === RANK_8 || rank(to) === RANK_1)) {
        var pieces = [QUEEN, ROOK, BISHOP, KNIGHT];
        for (var i2 = 0, len2 = pieces.length; i2 < len2; i2++) {
          moves2.push(build_move(board2, from, to, flags, pieces[i2]));
        }
      } else {
        moves2.push(build_move(board2, from, to, flags));
      }
    }
    var moves = [];
    var us = turn;
    var them = swap_color(us);
    var second_rank = { b: RANK_7, w: RANK_2 };
    var first_sq = SQUARE_MAP.a8;
    var last_sq = SQUARE_MAP.h1;
    var single_square = false;
    var legal = typeof options !== "undefined" && "legal" in options ? options.legal : true;
    var piece_type = typeof options !== "undefined" && "piece" in options && typeof options.piece === "string" ? options.piece.toLowerCase() : true;
    if (typeof options !== "undefined" && "square" in options) {
      if (options.square in SQUARE_MAP) {
        first_sq = last_sq = SQUARE_MAP[options.square];
        single_square = true;
      } else {
        return [];
      }
    }
    for (var i = first_sq; i <= last_sq; i++) {
      if (i & 136) {
        i += 7;
        continue;
      }
      var piece = board[i];
      if (piece == null || piece.color !== us) {
        continue;
      }
      if (piece.type === PAWN && (piece_type === true || piece_type === PAWN)) {
        var square = i + PAWN_OFFSETS[us][0];
        if (board[square] == null) {
          add_move(board, moves, i, square, BITS.NORMAL);
          var square = i + PAWN_OFFSETS[us][1];
          if (second_rank[us] === rank(i) && board[square] == null) {
            add_move(board, moves, i, square, BITS.BIG_PAWN);
          }
        }
        for (j = 2; j < 4; j++) {
          var square = i + PAWN_OFFSETS[us][j];
          if (square & 136)
            continue;
          if (board[square] != null && board[square].color === them) {
            add_move(board, moves, i, square, BITS.CAPTURE);
          } else if (square === ep_square) {
            add_move(board, moves, i, ep_square, BITS.EP_CAPTURE);
          }
        }
      } else if (piece_type === true || piece_type === piece.type) {
        for (var j = 0, len = PIECE_OFFSETS[piece.type].length; j < len; j++) {
          var offset = PIECE_OFFSETS[piece.type][j];
          var square = i;
          while (true) {
            square += offset;
            if (square & 136)
              break;
            if (board[square] == null) {
              add_move(board, moves, i, square, BITS.NORMAL);
            } else {
              if (board[square].color === us)
                break;
              add_move(board, moves, i, square, BITS.CAPTURE);
              break;
            }
            if (piece.type === "n" || piece.type === "k")
              break;
          }
        }
      }
    }
    if (piece_type === true || piece_type === KING) {
      if (!single_square || last_sq === kings[us]) {
        if (castling[us] & BITS.KSIDE_CASTLE) {
          var castling_from = kings[us];
          var castling_to = castling_from + 2;
          if (board[castling_from + 1] == null && board[castling_to] == null && !attacked(them, kings[us]) && !attacked(them, castling_from + 1) && !attacked(them, castling_to)) {
            add_move(board, moves, kings[us], castling_to, BITS.KSIDE_CASTLE);
          }
        }
        if (castling[us] & BITS.QSIDE_CASTLE) {
          var castling_from = kings[us];
          var castling_to = castling_from - 2;
          if (board[castling_from - 1] == null && board[castling_from - 2] == null && board[castling_from - 3] == null && !attacked(them, kings[us]) && !attacked(them, castling_from - 1) && !attacked(them, castling_to)) {
            add_move(board, moves, kings[us], castling_to, BITS.QSIDE_CASTLE);
          }
        }
      }
    }
    if (!legal) {
      return moves;
    }
    var legal_moves = [];
    for (var i = 0, len = moves.length; i < len; i++) {
      make_move(moves[i]);
      if (!king_attacked(us)) {
        legal_moves.push(moves[i]);
      }
      undo_move();
    }
    return legal_moves;
  }
  function move_to_san(move2, moves) {
    var output = "";
    if (move2.flags & BITS.KSIDE_CASTLE) {
      output = "O-O";
    } else if (move2.flags & BITS.QSIDE_CASTLE) {
      output = "O-O-O";
    } else {
      if (move2.piece !== PAWN) {
        var disambiguator = get_disambiguator(move2, moves);
        output += move2.piece.toUpperCase() + disambiguator;
      }
      if (move2.flags & (BITS.CAPTURE | BITS.EP_CAPTURE)) {
        if (move2.piece === PAWN) {
          output += algebraic(move2.from)[0];
        }
        output += "x";
      }
      output += algebraic(move2.to);
      if (move2.flags & BITS.PROMOTION) {
        output += "=" + move2.promotion.toUpperCase();
      }
    }
    make_move(move2);
    if (in_check()) {
      if (in_checkmate()) {
        output += "#";
      } else {
        output += "+";
      }
    }
    undo_move();
    return output;
  }
  function attacked(color, square) {
    for (var i = SQUARE_MAP.a8; i <= SQUARE_MAP.h1; i++) {
      if (i & 136) {
        i += 7;
        continue;
      }
      if (board[i] == null || board[i].color !== color)
        continue;
      var piece = board[i];
      var difference = i - square;
      var index = difference + 119;
      if (ATTACKS[index] & 1 << SHIFTS[piece.type]) {
        if (piece.type === PAWN) {
          if (difference > 0) {
            if (piece.color === WHITE)
              return true;
          } else {
            if (piece.color === BLACK)
              return true;
          }
          continue;
        }
        if (piece.type === "n" || piece.type === "k")
          return true;
        var offset = RAYS[index];
        var j = i + offset;
        var blocked = false;
        while (j !== square) {
          if (board[j] != null) {
            blocked = true;
            break;
          }
          j += offset;
        }
        if (!blocked)
          return true;
      }
    }
    return false;
  }
  function king_attacked(color) {
    return attacked(swap_color(color), kings[color]);
  }
  function in_check() {
    return king_attacked(turn);
  }
  function in_checkmate() {
    return in_check() && generate_moves().length === 0;
  }
  function in_stalemate() {
    return !in_check() && generate_moves().length === 0;
  }
  function insufficient_material() {
    var pieces = {};
    var bishops = [];
    var num_pieces = 0;
    var sq_color = 0;
    for (var i = SQUARE_MAP.a8; i <= SQUARE_MAP.h1; i++) {
      sq_color = (sq_color + 1) % 2;
      if (i & 136) {
        i += 7;
        continue;
      }
      var piece = board[i];
      if (piece) {
        pieces[piece.type] = piece.type in pieces ? pieces[piece.type] + 1 : 1;
        if (piece.type === BISHOP) {
          bishops.push(sq_color);
        }
        num_pieces++;
      }
    }
    if (num_pieces === 2) {
      return true;
    } else if (num_pieces === 3 && (pieces[BISHOP] === 1 || pieces[KNIGHT] === 1)) {
      return true;
    } else if (num_pieces === pieces[BISHOP] + 2) {
      var sum = 0;
      var len = bishops.length;
      for (var i = 0; i < len; i++) {
        sum += bishops[i];
      }
      if (sum === 0 || sum === len) {
        return true;
      }
    }
    return false;
  }
  function in_threefold_repetition() {
    var moves = [];
    var positions = {};
    var repetition = false;
    while (true) {
      var move2 = undo_move();
      if (!move2)
        break;
      moves.push(move2);
    }
    while (true) {
      var fen2 = generate_fen().split(" ").slice(0, 4).join(" ");
      positions[fen2] = fen2 in positions ? positions[fen2] + 1 : 1;
      if (positions[fen2] >= 3) {
        repetition = true;
      }
      if (!moves.length) {
        break;
      }
      make_move(moves.pop());
    }
    return repetition;
  }
  function push(move2) {
    history.push({
      move: move2,
      kings: { b: kings.b, w: kings.w },
      turn,
      castling: { b: castling.b, w: castling.w },
      ep_square,
      half_moves,
      move_number
    });
  }
  function make_move(move2) {
    var us = turn;
    var them = swap_color(us);
    push(move2);
    board[move2.to] = board[move2.from];
    board[move2.from] = null;
    if (move2.flags & BITS.EP_CAPTURE) {
      if (turn === BLACK) {
        board[move2.to - 16] = null;
      } else {
        board[move2.to + 16] = null;
      }
    }
    if (move2.flags & BITS.PROMOTION) {
      board[move2.to] = { type: move2.promotion, color: us };
    }
    if (board[move2.to].type === KING) {
      kings[board[move2.to].color] = move2.to;
      if (move2.flags & BITS.KSIDE_CASTLE) {
        var castling_to = move2.to - 1;
        var castling_from = move2.to + 1;
        board[castling_to] = board[castling_from];
        board[castling_from] = null;
      } else if (move2.flags & BITS.QSIDE_CASTLE) {
        var castling_to = move2.to + 1;
        var castling_from = move2.to - 2;
        board[castling_to] = board[castling_from];
        board[castling_from] = null;
      }
      castling[us] = "";
    }
    if (castling[us]) {
      for (var i = 0, len = ROOKS[us].length; i < len; i++) {
        if (move2.from === ROOKS[us][i].square && castling[us] & ROOKS[us][i].flag) {
          castling[us] ^= ROOKS[us][i].flag;
          break;
        }
      }
    }
    if (castling[them]) {
      for (var i = 0, len = ROOKS[them].length; i < len; i++) {
        if (move2.to === ROOKS[them][i].square && castling[them] & ROOKS[them][i].flag) {
          castling[them] ^= ROOKS[them][i].flag;
          break;
        }
      }
    }
    if (move2.flags & BITS.BIG_PAWN) {
      if (turn === "b") {
        ep_square = move2.to - 16;
      } else {
        ep_square = move2.to + 16;
      }
    } else {
      ep_square = EMPTY;
    }
    if (move2.piece === PAWN) {
      half_moves = 0;
    } else if (move2.flags & (BITS.CAPTURE | BITS.EP_CAPTURE)) {
      half_moves = 0;
    } else {
      half_moves++;
    }
    if (turn === BLACK) {
      move_number++;
    }
    turn = swap_color(turn);
  }
  function undo_move() {
    var old = history.pop();
    if (old == null) {
      return null;
    }
    var move2 = old.move;
    kings = old.kings;
    turn = old.turn;
    castling = old.castling;
    ep_square = old.ep_square;
    half_moves = old.half_moves;
    move_number = old.move_number;
    var us = turn;
    var them = swap_color(turn);
    board[move2.from] = board[move2.to];
    board[move2.from].type = move2.piece;
    board[move2.to] = null;
    if (move2.flags & BITS.CAPTURE) {
      board[move2.to] = { type: move2.captured, color: them };
    } else if (move2.flags & BITS.EP_CAPTURE) {
      var index;
      if (us === BLACK) {
        index = move2.to - 16;
      } else {
        index = move2.to + 16;
      }
      board[index] = { type: PAWN, color: them };
    }
    if (move2.flags & (BITS.KSIDE_CASTLE | BITS.QSIDE_CASTLE)) {
      var castling_to, castling_from;
      if (move2.flags & BITS.KSIDE_CASTLE) {
        castling_to = move2.to + 1;
        castling_from = move2.to - 1;
      } else if (move2.flags & BITS.QSIDE_CASTLE) {
        castling_to = move2.to - 2;
        castling_from = move2.to + 1;
      }
      board[castling_to] = board[castling_from];
      board[castling_from] = null;
    }
    return move2;
  }
  function move_from_san(move2, sloppy) {
    var clean_move = stripped_san(move2);
    for (var parser = 0; parser < 2; parser++) {
      if (parser == PARSER_SLOPPY) {
        if (!sloppy) {
          return null;
        }
        var overly_disambiguated = false;
        var matches = clean_move.match(/([pnbrqkPNBRQK])?([a-h][1-8])x?-?([a-h][1-8])([qrbnQRBN])?/);
        if (matches) {
          var piece = matches[1];
          var from = matches[2];
          var to = matches[3];
          var promotion = matches[4];
          if (from.length == 1) {
            overly_disambiguated = true;
          }
        } else {
          var matches = clean_move.match(/([pnbrqkPNBRQK])?([a-h]?[1-8]?)x?-?([a-h][1-8])([qrbnQRBN])?/);
          if (matches) {
            var piece = matches[1];
            var from = matches[2];
            var to = matches[3];
            var promotion = matches[4];
            if (from.length == 1) {
              var overly_disambiguated = true;
            }
          }
        }
      }
      var piece_type = infer_piece_type(clean_move);
      var moves = generate_moves({
        legal: true,
        piece: piece ? piece : piece_type
      });
      for (var i = 0, len = moves.length; i < len; i++) {
        switch (parser) {
          case PARSER_STRICT: {
            if (clean_move === stripped_san(move_to_san(moves[i], moves))) {
              return moves[i];
            }
            break;
          }
          case PARSER_SLOPPY: {
            if (matches) {
              if ((!piece || piece.toLowerCase() == moves[i].piece) && SQUARE_MAP[from] == moves[i].from && SQUARE_MAP[to] == moves[i].to && (!promotion || promotion.toLowerCase() == moves[i].promotion)) {
                return moves[i];
              } else if (overly_disambiguated) {
                var square = algebraic(moves[i].from);
                if ((!piece || piece.toLowerCase() == moves[i].piece) && SQUARE_MAP[to] == moves[i].to && (from == square[0] || from == square[1]) && (!promotion || promotion.toLowerCase() == moves[i].promotion)) {
                  return moves[i];
                }
              }
            }
          }
        }
      }
    }
    return null;
  }
  function make_pretty(ugly_move) {
    var move2 = clone(ugly_move);
    move2.san = move_to_san(move2, generate_moves({ legal: true }));
    move2.to = algebraic(move2.to);
    move2.from = algebraic(move2.from);
    var flags = "";
    for (var flag in BITS) {
      if (BITS[flag] & move2.flags) {
        flags += FLAGS[flag];
      }
    }
    move2.flags = flags;
    return move2;
  }
  function perft(depth) {
    var moves = generate_moves({ legal: false });
    var nodes = 0;
    var color = turn;
    for (var i = 0, len = moves.length; i < len; i++) {
      make_move(moves[i]);
      if (!king_attacked(color)) {
        if (depth - 1 > 0) {
          var child_nodes = perft(depth - 1);
          nodes += child_nodes;
        } else {
          nodes++;
        }
      }
      undo_move();
    }
    return nodes;
  }
  return {
    load: function(fen2) {
      return load(fen2);
    },
    reset: function() {
      return reset();
    },
    moves: function(options) {
      var ugly_moves = generate_moves(options);
      var moves = [];
      for (var i = 0, len = ugly_moves.length; i < len; i++) {
        if (typeof options !== "undefined" && "verbose" in options && options.verbose) {
          moves.push(make_pretty(ugly_moves[i]));
        } else {
          moves.push(move_to_san(ugly_moves[i], generate_moves({ legal: true })));
        }
      }
      return moves;
    },
    in_check: function() {
      return in_check();
    },
    in_checkmate: function() {
      return in_checkmate();
    },
    in_stalemate: function() {
      return in_stalemate();
    },
    in_draw: function() {
      return half_moves >= 100 || in_stalemate() || insufficient_material() || in_threefold_repetition();
    },
    insufficient_material: function() {
      return insufficient_material();
    },
    in_threefold_repetition: function() {
      return in_threefold_repetition();
    },
    game_over: function() {
      return half_moves >= 100 || in_checkmate() || in_stalemate() || insufficient_material() || in_threefold_repetition();
    },
    validate_fen: function(fen2) {
      return validate_fen(fen2);
    },
    fen: function() {
      return generate_fen();
    },
    board: function() {
      var output = [], row = [];
      for (var i = SQUARE_MAP.a8; i <= SQUARE_MAP.h1; i++) {
        if (board[i] == null) {
          row.push(null);
        } else {
          row.push({
            square: algebraic(i),
            type: board[i].type,
            color: board[i].color
          });
        }
        if (i + 1 & 136) {
          output.push(row);
          row = [];
          i += 8;
        }
      }
      return output;
    },
    pgn: function(options) {
      var newline = typeof options === "object" && typeof options.newline_char === "string" ? options.newline_char : "\n";
      var max_width = typeof options === "object" && typeof options.max_width === "number" ? options.max_width : 0;
      var result = [];
      var header_exists = false;
      for (var i in header) {
        result.push("[" + i + ' "' + header[i] + '"]' + newline);
        header_exists = true;
      }
      if (header_exists && history.length) {
        result.push(newline);
      }
      var append_comment = function(move_string2) {
        var comment = comments[generate_fen()];
        if (typeof comment !== "undefined") {
          var delimiter = move_string2.length > 0 ? " " : "";
          move_string2 = `${move_string2}${delimiter}{${comment}}`;
        }
        return move_string2;
      };
      var reversed_history = [];
      while (history.length > 0) {
        reversed_history.push(undo_move());
      }
      var moves = [];
      var move_string = "";
      if (reversed_history.length === 0) {
        moves.push(append_comment(""));
      }
      while (reversed_history.length > 0) {
        move_string = append_comment(move_string);
        var move2 = reversed_history.pop();
        if (!history.length && move2.color === "b") {
          move_string = move_number + ". ...";
        } else if (move2.color === "w") {
          if (move_string.length) {
            moves.push(move_string);
          }
          move_string = move_number + ".";
        }
        move_string = move_string + " " + move_to_san(move2, generate_moves({ legal: true }));
        make_move(move2);
      }
      if (move_string.length) {
        moves.push(append_comment(move_string));
      }
      if (typeof header.Result !== "undefined") {
        moves.push(header.Result);
      }
      if (max_width === 0) {
        return result.join("") + moves.join(" ");
      }
      var strip = function() {
        if (result.length > 0 && result[result.length - 1] === " ") {
          result.pop();
          return true;
        }
        return false;
      };
      var wrap_comment = function(width, move3) {
        for (var token of move3.split(" ")) {
          if (!token) {
            continue;
          }
          if (width + token.length > max_width) {
            while (strip()) {
              width--;
            }
            result.push(newline);
            width = 0;
          }
          result.push(token);
          width += token.length;
          result.push(" ");
          width++;
        }
        if (strip()) {
          width--;
        }
        return width;
      };
      var current_width = 0;
      for (var i = 0; i < moves.length; i++) {
        if (current_width + moves[i].length > max_width) {
          if (moves[i].includes("{")) {
            current_width = wrap_comment(current_width, moves[i]);
            continue;
          }
        }
        if (current_width + moves[i].length > max_width && i !== 0) {
          if (result[result.length - 1] === " ") {
            result.pop();
          }
          result.push(newline);
          current_width = 0;
        } else if (i !== 0) {
          result.push(" ");
          current_width++;
        }
        result.push(moves[i]);
        current_width += moves[i].length;
      }
      return result.join("");
    },
    load_pgn: function(pgn, options) {
      var sloppy = typeof options !== "undefined" && "sloppy" in options ? options.sloppy : false;
      function mask(str) {
        return str.replace(/\\/g, "\\");
      }
      function parse_pgn_header(header2, options2) {
        var newline_char2 = typeof options2 === "object" && typeof options2.newline_char === "string" ? options2.newline_char : "\r?\n";
        var header_obj = {};
        var headers2 = header2.split(new RegExp(mask(newline_char2)));
        var key2 = "";
        var value = "";
        for (var i = 0; i < headers2.length; i++) {
          var regex = /^\s*\[([A-Za-z]+)\s*"(.*)"\s*\]\s*$/;
          key2 = headers2[i].replace(regex, "$1");
          value = headers2[i].replace(regex, "$2");
          if (trim(key2).length > 0) {
            header_obj[key2] = value;
          }
        }
        return header_obj;
      }
      pgn = pgn.trim();
      var newline_char = typeof options === "object" && typeof options.newline_char === "string" ? options.newline_char : "\r?\n";
      var header_regex = new RegExp("^(\\[((?:" + mask(newline_char) + ")|.)*\\])(?:\\s*" + mask(newline_char) + "){2}");
      var header_string = header_regex.test(pgn) ? header_regex.exec(pgn)[1] : "";
      reset();
      var headers = parse_pgn_header(header_string, options);
      var fen2 = "";
      for (var key in headers) {
        if (key.toLowerCase() === "fen") {
          fen2 = headers[key];
        }
        set_header([key, headers[key]]);
      }
      if (sloppy) {
        if (fen2) {
          if (!load(fen2, true)) {
            return false;
          }
        }
      } else {
        if (headers["SetUp"] === "1") {
          if (!("FEN" in headers && load(headers["FEN"], true))) {
            return false;
          }
        }
      }
      var to_hex = function(string) {
        return Array.from(string).map(function(c) {
          return c.charCodeAt(0) < 128 ? c.charCodeAt(0).toString(16) : encodeURIComponent(c).replace(/\%/g, "").toLowerCase();
        }).join("");
      };
      var from_hex = function(string) {
        return string.length == 0 ? "" : decodeURIComponent("%" + string.match(/.{1,2}/g).join("%"));
      };
      var encode_comment = function(string) {
        string = string.replace(new RegExp(mask(newline_char), "g"), " ");
        return `{${to_hex(string.slice(1, string.length - 1))}}`;
      };
      var decode_comment = function(string) {
        if (string.startsWith("{") && string.endsWith("}")) {
          return from_hex(string.slice(1, string.length - 1));
        }
      };
      var ms = pgn.replace(header_string, "").replace(new RegExp(`({[^}]*})+?|;([^${mask(newline_char)}]*)`, "g"), function(match, bracket, semicolon) {
        return bracket !== void 0 ? encode_comment(bracket) : " " + encode_comment(`{${semicolon.slice(1)}}`);
      }).replace(new RegExp(mask(newline_char), "g"), " ");
      var rav_regex = /(\([^\(\)]+\))+?/g;
      while (rav_regex.test(ms)) {
        ms = ms.replace(rav_regex, "");
      }
      ms = ms.replace(/\d+\.(\.\.)?/g, "");
      ms = ms.replace(/\.\.\./g, "");
      ms = ms.replace(/\$\d+/g, "");
      var moves = trim(ms).split(new RegExp(/\s+/));
      moves = moves.join(",").replace(/,,+/g, ",").split(",");
      var move2 = "";
      var result = "";
      for (var half_move = 0; half_move < moves.length; half_move++) {
        var comment = decode_comment(moves[half_move]);
        if (comment !== void 0) {
          comments[generate_fen()] = comment;
          continue;
        }
        move2 = move_from_san(moves[half_move], sloppy);
        if (move2 == null) {
          if (TERMINATION_MARKERS.indexOf(moves[half_move]) > -1) {
            result = moves[half_move];
          } else {
            return false;
          }
        } else {
          result = "";
          make_move(move2);
        }
      }
      if (result && Object.keys(header).length && !header["Result"]) {
        set_header(["Result", result]);
      }
      return true;
    },
    header: function() {
      return set_header(arguments);
    },
    turn: function() {
      return turn;
    },
    move: function(move2, options) {
      var sloppy = typeof options !== "undefined" && "sloppy" in options ? options.sloppy : false;
      var move_obj = null;
      if (typeof move2 === "string") {
        move_obj = move_from_san(move2, sloppy);
      } else if (typeof move2 === "object") {
        var moves = generate_moves();
        for (var i = 0, len = moves.length; i < len; i++) {
          if (move2.from === algebraic(moves[i].from) && move2.to === algebraic(moves[i].to) && (!("promotion" in moves[i]) || move2.promotion === moves[i].promotion)) {
            move_obj = moves[i];
            break;
          }
        }
      }
      if (!move_obj) {
        return null;
      }
      var pretty_move = make_pretty(move_obj);
      make_move(move_obj);
      return pretty_move;
    },
    undo: function() {
      var move2 = undo_move();
      return move2 ? make_pretty(move2) : null;
    },
    clear: function() {
      return clear();
    },
    put: function(piece, square) {
      return put(piece, square);
    },
    get: function(square) {
      return get(square);
    },
    ascii() {
      var s = "   +------------------------+\n";
      for (var i = SQUARE_MAP.a8; i <= SQUARE_MAP.h1; i++) {
        if (file(i) === 0) {
          s += " " + "87654321"[rank(i)] + " |";
        }
        if (board[i] == null) {
          s += " . ";
        } else {
          var piece = board[i].type;
          var color = board[i].color;
          var symbol = color === WHITE ? piece.toUpperCase() : piece.toLowerCase();
          s += " " + symbol + " ";
        }
        if (i + 1 & 136) {
          s += "|\n";
          i += 8;
        }
      }
      s += "   +------------------------+\n";
      s += "     a  b  c  d  e  f  g  h";
      return s;
    },
    remove: function(square) {
      return remove(square);
    },
    perft: function(depth) {
      return perft(depth);
    },
    square_color: function(square) {
      if (square in SQUARE_MAP) {
        var sq_0x88 = SQUARE_MAP[square];
        return (rank(sq_0x88) + file(sq_0x88)) % 2 === 0 ? "light" : "dark";
      }
      return null;
    },
    history: function(options) {
      var reversed_history = [];
      var move_history = [];
      var verbose = typeof options !== "undefined" && "verbose" in options && options.verbose;
      while (history.length > 0) {
        reversed_history.push(undo_move());
      }
      while (reversed_history.length > 0) {
        var move2 = reversed_history.pop();
        if (verbose) {
          move_history.push(make_pretty(move2));
        } else {
          move_history.push(move_to_san(move2, generate_moves({ legal: true })));
        }
        make_move(move2);
      }
      return move_history;
    },
    get_comment: function() {
      return comments[generate_fen()];
    },
    set_comment: function(comment) {
      comments[generate_fen()] = comment.replace("{", "[").replace("}", "]");
    },
    delete_comment: function() {
      var comment = comments[generate_fen()];
      delete comments[generate_fen()];
      return comment;
    },
    get_comments: function() {
      prune_comments();
      return Object.keys(comments).map(function(fen2) {
        return { fen: fen2, comment: comments[fen2] };
      });
    },
    delete_comments: function() {
      prune_comments();
      return Object.keys(comments).map(function(fen2) {
        var comment = comments[fen2];
        delete comments[fen2];
        return { fen: fen2, comment };
      });
    }
  };
};

// src/paint/index.ts
var import_canvas = require("canvas");
var import_path3 = require("path");
var import_fs = require("fs");

// src/config/index.ts
var import_path = require("path");
var ASSETS_PATH = (0, import_path.resolve)(__dirname, "../assets");
var BOARD_FILES_PATH = (0, import_path.resolve)(__dirname, "../boards");

// src/paint/getImagePath.ts
var import_path2 = require("path");
var getImagePathFromPiece = (piece) => {
  const color = piece.color === "b" ? "negras" : "blancas";
  let pieceName = "";
  switch (piece.type) {
    case "p":
      pieceName = "peon";
      break;
    case "r":
      pieceName = "torre";
      break;
    case "n":
      pieceName = "caballo";
      break;
    case "b":
      pieceName = "alfil";
      break;
    case "q":
      pieceName = "reina";
      break;
    case "k":
      pieceName = "rey";
      break;
    default:
      throw new Error(`Unknown piece type ${piece.type}`);
  }
  const imagePath = (0, import_path2.resolve)(ASSETS_PATH, `${pieceName}_${color}.png`);
  return imagePath;
};

// src/paint/index.ts
var WIDTH = 680 * 3 / 2;
var HEIGHT = 680 * 3 / 2;
var createCanvasContext = () => {
  const canvas = (0, import_canvas.createCanvas)(WIDTH, HEIGHT);
  const context = canvas.getContext("2d");
  context.fillStyle = "#764abc";
  context.fillRect(0, 0, WIDTH, HEIGHT);
  return { canvas, context };
};
var paintBoard = async (context) => {
  const pathBoardImage = (0, import_path3.resolve)(ASSETS_PATH, "chessboard.png");
  const boardImage = await (0, import_canvas.loadImage)(pathBoardImage);
  context.drawImage(boardImage, 0, 0, WIDTH, HEIGHT);
};
var paintPiece = async (context, pieceSquare, row, column) => {
  const imagePath = getImagePathFromPiece(pieceSquare);
  if (imagePath) {
    const image = await (0, import_canvas.loadImage)(imagePath);
    context.drawImage(image, column * 120 + 80, row * 120 + 50);
  }
};
var paintStatusBoard = async (context, chess) => {
  const boardPromise = chess.board().map(async (row, rowIndex) => {
    const rowPromise = row.map(async (piece, columnIndex) => {
      if (piece) {
        await paintPiece(context, piece, rowIndex, columnIndex);
      }
    });
    await Promise.all(rowPromise);
  });
  await Promise.all(boardPromise);
};
var writeFinalBoard = async (canvas, date) => {
  const buffer = canvas.toBuffer("image/png");
  const fileName = date.getTime() + ".png";
  const filePath = (0, import_path3.resolve)(BOARD_FILES_PATH, fileName);
  (0, import_fs.writeFileSync)(filePath, buffer);
  return { fileName, filePath, buffer };
};

// src/game.ts
var games = /* @__PURE__ */ new Map();
var existGame = ({
  white,
  black
}) => {
  return [...games.values()].filter((game) => game.status !== 2 /* FINISHED */).find((game) => {
    const matchWhite = game.white === white || game.white === black;
    const matchBlack = game.black === white || game.black === black;
    return matchWhite && matchBlack;
  });
};
var existGamePlaying = ({
  white,
  black
}) => {
  return [...games.values()].filter((game) => game.status === 1 /* PLAYING */).find((game) => {
    const matchWhite = game.white === white || game.black === white;
    const matchBlack = game.white === black || game.black === black;
    return matchWhite && matchBlack;
  });
};
var initGame = ({
  white,
  black
}) => {
  const { canvas, context } = createCanvasContext();
  if (existGame({ white, black })) {
    return "Game already started";
  }
  const chess = new Chess();
  const id = new Date().getTime();
  const game = {
    status: 0 /* WAITING */,
    chess,
    canvas,
    context,
    white,
    black
  };
  games.set(id, game);
  return id;
};
var acceptGame = async ({
  user,
  id
}) => {
  try {
    const game = games.get(id);
    if (!game) {
      return {
        error: "Game not found",
        data: null
      };
    }
    game.black = user;
    game.status = 1 /* PLAYING */;
    const date = new Date();
    const { context, chess, canvas } = game;
    await paintBoard(context);
    await paintStatusBoard(context, chess);
    const data = await writeFinalBoard(canvas, date);
    const moves = chess.moves().join(" ");
    return {
      data: { ...data, moves },
      error: null
    };
  } catch (error) {
    return {
      data: null,
      error: error instanceof Error ? error.message : error
    };
  }
};
var move = async ([user1, user2], move2) => {
  const game = existGamePlaying({ white: user1, black: user2 });
  console.log(games, { white: user1, black: user2 });
  if (!game) {
    return {
      error: "Game not started",
      data: null
    };
  }
  const turn = game.chess.turn() === "w" ? "white" : "black";
  const { chess, canvas, context } = game;
  const date = new Date();
  if (chess.game_over()) {
    return {
      error: "Game over",
      data: null
    };
  }
  if (game[turn] !== user1) {
    return {
      error: "Not your turn",
      data: null
    };
  }
  if (!chess.move(move2)) {
    return {
      data: null,
      error: "Invalid move"
    };
  }
  await paintBoard(context);
  await paintStatusBoard(context, chess);
  const data = await writeFinalBoard(canvas, date);
  const moves = chess.moves().join(" ");
  return {
    data: { ...data, moves },
    error: null
  };
};

// src/index.ts
var client = new import_whatsapp_web.Client({
  authStrategy: new import_whatsapp_web.LocalAuth()
});
client.on("qr", (qr) => {
  console.log("Generando QR...", qr, "...listo.");
  (0, import_qrcode_terminal.generate)(qr, { small: true });
});
client.on("ready", () => {
  console.log("Client is ready!");
});
client.on("message", async (message) => {
  const chat = await message.getChat();
  const body = message.body;
  console.log(message);
  if (body.includes("!chess::init::")) {
    const white = message.author;
    const black = message.mentionedIds[0];
    const msg = initGame({ white, black });
    if (msg) {
      await message.reply(msg + "");
    }
  } else if (body.includes("!chess::accept::")) {
    const [, code] = body.split("!chess::accept::");
    const { data, error } = await acceptGame({
      user: message.author,
      id: parseInt(code)
    });
    if (error) {
      await message.reply(error);
    } else if (data) {
      const { filePath, moves } = data;
      const media = import_whatsapp_web.MessageMedia.fromFilePath(filePath);
      await client.sendMessage(message.author, media);
      await chat.sendMessage(media);
      await message.reply(moves);
    }
  } else if (body.includes("!chess::move::")) {
    const [, restMsg] = body.split("!chess::move::");
    const [moving] = restMsg.split("::");
    console.log("moving:", moving);
    const user1 = message.author;
    const user2 = message.mentionedIds[0];
    const { data, error } = await move([user1, user2], moving);
    if (error) {
      await message.reply(error);
    } else if (data) {
      const { filePath, moves } = data;
      const media = import_whatsapp_web.MessageMedia.fromFilePath(filePath);
      await client.sendMessage(message.author, media);
      await chat.sendMessage(media);
      await message.reply(moves);
    } else {
      await message.reply("NO CONTROLLED");
    }
  }
});
client.initialize();
console.log("RUNNING");
