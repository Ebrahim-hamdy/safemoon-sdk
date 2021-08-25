'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var JSBI = _interopDefault(require('jsbi'));
var invariant = _interopDefault(require('tiny-invariant'));
var warning = _interopDefault(require('tiny-warning'));
var address = require('@ethersproject/address');
var _Big = _interopDefault(require('big.js'));
var toFormat = _interopDefault(require('toformat'));
var _Decimal = _interopDefault(require('decimal.js-light'));
var solidity = require('@ethersproject/solidity');
var contracts = require('@ethersproject/contracts');
var networks$1 = require('@ethersproject/networks');
var providers = require('@ethersproject/providers');

var _FACTORY_ADDRESS, _SOLIDITY_TYPE_MAXIMA;

(function (ChainId) {
  ChainId[ChainId["MAINNET"] = 1] = "MAINNET";
  ChainId[ChainId["ROPSTEN"] = 3] = "ROPSTEN";
  ChainId[ChainId["RINKEBY"] = 4] = "RINKEBY";
  ChainId[ChainId["G\xD6RLI"] = 5] = "G\xD6RLI";
  ChainId[ChainId["KOVAN"] = 42] = "KOVAN";
  ChainId[ChainId["BSC_MAINNET"] = 56] = "BSC_MAINNET";
  ChainId[ChainId["BSC_TESTNET"] = 97] = "BSC_TESTNET";
})(exports.ChainId || (exports.ChainId = {}));

(function (TradeType) {
  TradeType[TradeType["EXACT_INPUT"] = 0] = "EXACT_INPUT";
  TradeType[TradeType["EXACT_OUTPUT"] = 1] = "EXACT_OUTPUT";
})(exports.TradeType || (exports.TradeType = {}));

(function (Rounding) {
  Rounding[Rounding["ROUND_DOWN"] = 0] = "ROUND_DOWN";
  Rounding[Rounding["ROUND_HALF_UP"] = 1] = "ROUND_HALF_UP";
  Rounding[Rounding["ROUND_UP"] = 2] = "ROUND_UP";
})(exports.Rounding || (exports.Rounding = {}));

var FACTORY_ADDRESS = (_FACTORY_ADDRESS = {}, _FACTORY_ADDRESS[exports.ChainId.ROPSTEN] = "0x07E54EE143772c62133be74221B521BFD660E6a0", _FACTORY_ADDRESS[exports.ChainId.BSC_TESTNET] = "0xc7b33eDc1Cf696943699c8017fD951C422EDf6AE", _FACTORY_ADDRESS);
var INIT_CODE_HASH = '0xc10b1993f530f6a1f8b6c43a8d8f44af41e4a0024cf04c11920de2386381d45b';
var MINIMUM_LIQUIDITY = /*#__PURE__*/JSBI.BigInt(1000); // exports for internal consumption

var ZERO = /*#__PURE__*/JSBI.BigInt(0);
var ONE = /*#__PURE__*/JSBI.BigInt(1);
var TWO = /*#__PURE__*/JSBI.BigInt(2);
var THREE = /*#__PURE__*/JSBI.BigInt(3);
var FIVE = /*#__PURE__*/JSBI.BigInt(5);
var TEN = /*#__PURE__*/JSBI.BigInt(10);
var _100 = /*#__PURE__*/JSBI.BigInt(100);
var _9975 = /*#__PURE__*/JSBI.BigInt(9975);
var _10000 = /*#__PURE__*/JSBI.BigInt(10000);
var SolidityType;

(function (SolidityType) {
  SolidityType["uint8"] = "uint8";
  SolidityType["uint256"] = "uint256";
})(SolidityType || (SolidityType = {}));

var SOLIDITY_TYPE_MAXIMA = (_SOLIDITY_TYPE_MAXIMA = {}, _SOLIDITY_TYPE_MAXIMA[SolidityType.uint8] = /*#__PURE__*/JSBI.BigInt('0xff'), _SOLIDITY_TYPE_MAXIMA[SolidityType.uint256] = /*#__PURE__*/JSBI.BigInt('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'), _SOLIDITY_TYPE_MAXIMA);

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _construct(Parent, args, Class) {
  if (_isNativeReflectConstruct()) {
    _construct = Reflect.construct;
  } else {
    _construct = function _construct(Parent, args, Class) {
      var a = [null];
      a.push.apply(a, args);
      var Constructor = Function.bind.apply(Parent, a);
      var instance = new Constructor();
      if (Class) _setPrototypeOf(instance, Class.prototype);
      return instance;
    };
  }

  return _construct.apply(null, arguments);
}

function _isNativeFunction(fn) {
  return Function.toString.call(fn).indexOf("[native code]") !== -1;
}

function _wrapNativeSuper(Class) {
  var _cache = typeof Map === "function" ? new Map() : undefined;

  _wrapNativeSuper = function _wrapNativeSuper(Class) {
    if (Class === null || !_isNativeFunction(Class)) return Class;

    if (typeof Class !== "function") {
      throw new TypeError("Super expression must either be null or a function");
    }

    if (typeof _cache !== "undefined") {
      if (_cache.has(Class)) return _cache.get(Class);

      _cache.set(Class, Wrapper);
    }

    function Wrapper() {
      return _construct(Class, arguments, _getPrototypeOf(this).constructor);
    }

    Wrapper.prototype = Object.create(Class.prototype, {
      constructor: {
        value: Wrapper,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    return _setPrototypeOf(Wrapper, Class);
  };

  return _wrapNativeSuper(Class);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _createForOfIteratorHelperLoose(o, allowArrayLike) {
  var it;

  if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
      if (it) o = it;
      var i = 0;
      return function () {
        if (i >= o.length) return {
          done: true
        };
        return {
          done: false,
          value: o[i++]
        };
      };
    }

    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  it = o[Symbol.iterator]();
  return it.next.bind(it);
}

// see https://stackoverflow.com/a/41102306
var CAN_SET_PROTOTYPE = ('setPrototypeOf' in Object);
/**
 * Indicates that the pair has insufficient reserves for a desired output amount. I.e. the amount of output cannot be
 * obtained by sending any amount of input.
 */

var InsufficientReservesError = /*#__PURE__*/function (_Error) {
  _inheritsLoose(InsufficientReservesError, _Error);

  function InsufficientReservesError() {
    var _this;

    _this = _Error.call(this) || this;
    _this.isInsufficientReservesError = true;
    _this.name = _this.constructor.name;
    if (CAN_SET_PROTOTYPE) Object.setPrototypeOf(_assertThisInitialized(_this), (this instanceof InsufficientReservesError ? this.constructor : void 0).prototype);
    return _this;
  }

  return InsufficientReservesError;
}( /*#__PURE__*/_wrapNativeSuper(Error));
/**
 * Indicates that the input amount is too small to produce any amount of output. I.e. the amount of input sent is less
 * than the price of a single unit of output after fees.
 */

var InsufficientInputAmountError = /*#__PURE__*/function (_Error2) {
  _inheritsLoose(InsufficientInputAmountError, _Error2);

  function InsufficientInputAmountError() {
    var _this2;

    _this2 = _Error2.call(this) || this;
    _this2.isInsufficientInputAmountError = true;
    _this2.name = _this2.constructor.name;
    if (CAN_SET_PROTOTYPE) Object.setPrototypeOf(_assertThisInitialized(_this2), (this instanceof InsufficientInputAmountError ? this.constructor : void 0).prototype);
    return _this2;
  }

  return InsufficientInputAmountError;
}( /*#__PURE__*/_wrapNativeSuper(Error));

function validateSolidityTypeInstance(value, solidityType) {
  !JSBI.greaterThanOrEqual(value, ZERO) ?  invariant(false, value + " is not a " + solidityType + ".")  : void 0;
  !JSBI.lessThanOrEqual(value, SOLIDITY_TYPE_MAXIMA[solidityType]) ?  invariant(false, value + " is not a " + solidityType + ".")  : void 0;
} // warns if addresses are not checksummed

function validateAndParseAddress(address$1) {
  try {
    var checksummedAddress = address.getAddress(address$1);
    "development" !== "production" ? warning(address$1 === checksummedAddress, address$1 + " is not checksummed.") : void 0;
    return checksummedAddress;
  } catch (error) {
      invariant(false, address$1 + " is not a valid address.")  ;
  }
}
function parseBigintIsh(bigintIsh) {
  return bigintIsh instanceof JSBI ? bigintIsh : typeof bigintIsh === 'bigint' ? JSBI.BigInt(bigintIsh.toString()) : JSBI.BigInt(bigintIsh);
} // mock the on-chain sqrt function

function sqrt(y) {
  validateSolidityTypeInstance(y, SolidityType.uint256);
  var z = ZERO;
  var x;

  if (JSBI.greaterThan(y, THREE)) {
    z = y;
    x = JSBI.add(JSBI.divide(y, TWO), ONE);

    while (JSBI.lessThan(x, z)) {
      z = x;
      x = JSBI.divide(JSBI.add(JSBI.divide(y, x), x), TWO);
    }
  } else if (JSBI.notEqual(y, ZERO)) {
    z = ONE;
  }

  return z;
} // given an array of items sorted by `comparator`, insert an item into its sort index and constrain the size to
// `maxSize` by removing the last item

function sortedInsert(items, add, maxSize, comparator) {
  !(maxSize > 0) ?  invariant(false, 'MAX_SIZE_ZERO')  : void 0; // this is an invariant because the interface cannot return multiple removed items if items.length exceeds maxSize

  !(items.length <= maxSize) ?  invariant(false, 'ITEMS_SIZE')  : void 0; // short circuit first item add

  if (items.length === 0) {
    items.push(add);
    return null;
  } else {
    var isFull = items.length === maxSize; // short circuit if full and the additional item does not come before the last item

    if (isFull && comparator(items[items.length - 1], add) <= 0) {
      return add;
    }

    var lo = 0,
        hi = items.length;

    while (lo < hi) {
      var mid = lo + hi >>> 1;

      if (comparator(items[mid], add) <= 0) {
        lo = mid + 1;
      } else {
        hi = mid;
      }
    }

    items.splice(lo, 0, add);
    return isFull ? items.pop() : null;
  }
}

/**
 * A currency is any fungible financial instrument on Ethereum, including Ether and all ERC20 tokens.
 *
 * The only instance of the base class `Currency` is Ether.
 */

var Currency =
/**
 * Constructs an instance of the base class `Currency`. The only instance of the base class `Currency` is `Currency.ETHER`.
 * @param decimals decimals of the currency
 * @param symbol symbol of the currency
 * @param name of the currency
 */
function Currency(decimals, symbol, name) {
  validateSolidityTypeInstance(JSBI.BigInt(decimals), SolidityType.uint8);
  this.decimals = decimals;
  this.symbol = symbol;
  this.name = name;
};
/**
 * The only instance of the base class `Currency`.
 */

Currency.ETHER = /*#__PURE__*/new Currency(18, 'BNB', 'BNB');
var ETHER = Currency.ETHER;

var _WETH;
/**
 * Represents an ERC20 token with a unique address and some metadata.
 */

var Token = /*#__PURE__*/function (_Currency) {
  _inheritsLoose(Token, _Currency);

  function Token(chainId, address, decimals, symbol, name) {
    var _this;

    _this = _Currency.call(this, decimals, symbol, name) || this;
    _this.chainId = chainId;
    _this.address = validateAndParseAddress(address);
    return _this;
  }
  /**
   * Returns true if the two tokens are equivalent, i.e. have the same chainId and address.
   * @param other other token to compare
   */


  var _proto = Token.prototype;

  _proto.equals = function equals(other) {
    // short circuit on reference equality
    if (this === other) {
      return true;
    }

    return this.chainId === other.chainId && this.address === other.address;
  }
  /**
   * Returns true if the address of this token sorts before the address of the other token
   * @param other other token to compare
   * @throws if the tokens have the same address
   * @throws if the tokens are on different chains
   */
  ;

  _proto.sortsBefore = function sortsBefore(other) {
    !(this.chainId === other.chainId) ?  invariant(false, 'CHAIN_IDS')  : void 0;
    !(this.address !== other.address) ?  invariant(false, 'ADDRESSES')  : void 0;
    return this.address.toLowerCase() < other.address.toLowerCase();
  };

  return Token;
}(Currency);
/**
 * Compares two currencies for equality
 */

function currencyEquals(currencyA, currencyB) {
  if (currencyA instanceof Token && currencyB instanceof Token) {
    return currencyA.equals(currencyB);
  } else if (currencyA instanceof Token) {
    return false;
  } else if (currencyB instanceof Token) {
    return false;
  } else {
    return currencyA === currencyB;
  }
}
var WETH = (_WETH = {}, _WETH[exports.ChainId.MAINNET] = /*#__PURE__*/new Token(exports.ChainId.MAINNET, '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2', 18, 'WETH', 'Wrapped Ether'), _WETH[exports.ChainId.ROPSTEN] = /*#__PURE__*/new Token(exports.ChainId.ROPSTEN, '0xc778417E063141139Fce010982780140Aa0cD5Ab', 18, 'WETH', 'Wrapped Ether'), _WETH[exports.ChainId.RINKEBY] = /*#__PURE__*/new Token(exports.ChainId.RINKEBY, '0xc778417E063141139Fce010982780140Aa0cD5Ab', 18, 'WETH', 'Wrapped Ether'), _WETH[exports.ChainId.GÖRLI] = /*#__PURE__*/new Token(exports.ChainId.GÖRLI, '0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6', 18, 'WETH', 'Wrapped Ether'), _WETH[exports.ChainId.KOVAN] = /*#__PURE__*/new Token(exports.ChainId.KOVAN, '0xd0A1E359811322d97991E03f863a0C30C2cF029C', 18, 'WETH', 'Wrapped Ether'), _WETH[exports.ChainId.BSC_MAINNET] = /*#__PURE__*/new Token(exports.ChainId.BSC_MAINNET, '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c', 18, 'WBNB', 'Wrapped BNB'), _WETH[exports.ChainId.BSC_TESTNET] = /*#__PURE__*/new Token(exports.ChainId.BSC_TESTNET, '0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd', 18, 'WBNB', 'Wrapped BNB'), _WETH);

var _toSignificantRoundin, _toFixedRounding;
var Decimal = /*#__PURE__*/toFormat(_Decimal);
var Big = /*#__PURE__*/toFormat(_Big);
var toSignificantRounding = (_toSignificantRoundin = {}, _toSignificantRoundin[exports.Rounding.ROUND_DOWN] = Decimal.ROUND_DOWN, _toSignificantRoundin[exports.Rounding.ROUND_HALF_UP] = Decimal.ROUND_HALF_UP, _toSignificantRoundin[exports.Rounding.ROUND_UP] = Decimal.ROUND_UP, _toSignificantRoundin);
var toFixedRounding = (_toFixedRounding = {}, _toFixedRounding[exports.Rounding.ROUND_DOWN] = 0, _toFixedRounding[exports.Rounding.ROUND_HALF_UP] = 1, _toFixedRounding[exports.Rounding.ROUND_UP] = 3, _toFixedRounding);
var Fraction = /*#__PURE__*/function () {
  function Fraction(numerator, denominator) {
    if (denominator === void 0) {
      denominator = ONE;
    }

    this.numerator = parseBigintIsh(numerator);
    this.denominator = parseBigintIsh(denominator);
  } // performs floor division


  var _proto = Fraction.prototype;

  _proto.invert = function invert() {
    return new Fraction(this.denominator, this.numerator);
  };

  _proto.add = function add(other) {
    var otherParsed = other instanceof Fraction ? other : new Fraction(parseBigintIsh(other));

    if (JSBI.equal(this.denominator, otherParsed.denominator)) {
      return new Fraction(JSBI.add(this.numerator, otherParsed.numerator), this.denominator);
    }

    return new Fraction(JSBI.add(JSBI.multiply(this.numerator, otherParsed.denominator), JSBI.multiply(otherParsed.numerator, this.denominator)), JSBI.multiply(this.denominator, otherParsed.denominator));
  };

  _proto.subtract = function subtract(other) {
    var otherParsed = other instanceof Fraction ? other : new Fraction(parseBigintIsh(other));

    if (JSBI.equal(this.denominator, otherParsed.denominator)) {
      return new Fraction(JSBI.subtract(this.numerator, otherParsed.numerator), this.denominator);
    }

    return new Fraction(JSBI.subtract(JSBI.multiply(this.numerator, otherParsed.denominator), JSBI.multiply(otherParsed.numerator, this.denominator)), JSBI.multiply(this.denominator, otherParsed.denominator));
  };

  _proto.lessThan = function lessThan(other) {
    var otherParsed = other instanceof Fraction ? other : new Fraction(parseBigintIsh(other));
    return JSBI.lessThan(JSBI.multiply(this.numerator, otherParsed.denominator), JSBI.multiply(otherParsed.numerator, this.denominator));
  };

  _proto.equalTo = function equalTo(other) {
    var otherParsed = other instanceof Fraction ? other : new Fraction(parseBigintIsh(other));
    return JSBI.equal(JSBI.multiply(this.numerator, otherParsed.denominator), JSBI.multiply(otherParsed.numerator, this.denominator));
  };

  _proto.greaterThan = function greaterThan(other) {
    var otherParsed = other instanceof Fraction ? other : new Fraction(parseBigintIsh(other));
    return JSBI.greaterThan(JSBI.multiply(this.numerator, otherParsed.denominator), JSBI.multiply(otherParsed.numerator, this.denominator));
  };

  _proto.multiply = function multiply(other) {
    var otherParsed = other instanceof Fraction ? other : new Fraction(parseBigintIsh(other));
    return new Fraction(JSBI.multiply(this.numerator, otherParsed.numerator), JSBI.multiply(this.denominator, otherParsed.denominator));
  };

  _proto.divide = function divide(other) {
    var otherParsed = other instanceof Fraction ? other : new Fraction(parseBigintIsh(other));
    return new Fraction(JSBI.multiply(this.numerator, otherParsed.denominator), JSBI.multiply(this.denominator, otherParsed.numerator));
  };

  _proto.toSignificant = function toSignificant(significantDigits, format, rounding) {
    if (format === void 0) {
      format = {
        groupSeparator: ''
      };
    }

    if (rounding === void 0) {
      rounding = exports.Rounding.ROUND_HALF_UP;
    }

    !Number.isInteger(significantDigits) ?  invariant(false, significantDigits + " is not an integer.")  : void 0;
    !(significantDigits > 0) ?  invariant(false, significantDigits + " is not positive.")  : void 0;
    Decimal.set({
      precision: significantDigits + 1,
      rounding: toSignificantRounding[rounding]
    });
    var quotient = new Decimal(this.numerator.toString()).div(this.denominator.toString()).toSignificantDigits(significantDigits);
    return quotient.toFormat(quotient.decimalPlaces(), format);
  };

  _proto.toFixed = function toFixed(decimalPlaces, format, rounding) {
    if (format === void 0) {
      format = {
        groupSeparator: ''
      };
    }

    if (rounding === void 0) {
      rounding = exports.Rounding.ROUND_HALF_UP;
    }

    !Number.isInteger(decimalPlaces) ?  invariant(false, decimalPlaces + " is not an integer.")  : void 0;
    !(decimalPlaces >= 0) ?  invariant(false, decimalPlaces + " is negative.")  : void 0;
    Big.DP = decimalPlaces;
    Big.RM = toFixedRounding[rounding];
    return new Big(this.numerator.toString()).div(this.denominator.toString()).toFormat(decimalPlaces, format);
  };

  _createClass(Fraction, [{
    key: "quotient",
    get: function get() {
      return JSBI.divide(this.numerator, this.denominator);
    } // remainder after floor division

  }, {
    key: "remainder",
    get: function get() {
      return new Fraction(JSBI.remainder(this.numerator, this.denominator), this.denominator);
    }
  }]);

  return Fraction;
}();

var Big$1 = /*#__PURE__*/toFormat(_Big);
var CurrencyAmount = /*#__PURE__*/function (_Fraction) {
  _inheritsLoose(CurrencyAmount, _Fraction);

  // amount _must_ be raw, i.e. in the native representation
  function CurrencyAmount(currency, amount) {
    var _this;

    var parsedAmount = parseBigintIsh(amount);
    validateSolidityTypeInstance(parsedAmount, SolidityType.uint256);
    _this = _Fraction.call(this, parsedAmount, JSBI.exponentiate(TEN, JSBI.BigInt(currency.decimals))) || this;
    _this.currency = currency;
    return _this;
  }
  /**
   * Helper that calls the constructor with the ETHER currency
   * @param amount ether amount in wei
   */


  CurrencyAmount.ether = function ether(amount) {
    return new CurrencyAmount(ETHER, amount);
  };

  var _proto = CurrencyAmount.prototype;

  _proto.add = function add(other) {
    !currencyEquals(this.currency, other.currency) ?  invariant(false, 'TOKEN')  : void 0;
    return new CurrencyAmount(this.currency, JSBI.add(this.raw, other.raw));
  };

  _proto.subtract = function subtract(other) {
    !currencyEquals(this.currency, other.currency) ?  invariant(false, 'TOKEN')  : void 0;
    return new CurrencyAmount(this.currency, JSBI.subtract(this.raw, other.raw));
  };

  _proto.toSignificant = function toSignificant(significantDigits, format, rounding) {
    if (significantDigits === void 0) {
      significantDigits = 6;
    }

    if (rounding === void 0) {
      rounding = exports.Rounding.ROUND_DOWN;
    }

    return _Fraction.prototype.toSignificant.call(this, significantDigits, format, rounding);
  };

  _proto.toFixed = function toFixed(decimalPlaces, format, rounding) {
    if (decimalPlaces === void 0) {
      decimalPlaces = this.currency.decimals;
    }

    if (rounding === void 0) {
      rounding = exports.Rounding.ROUND_DOWN;
    }

    !(decimalPlaces <= this.currency.decimals) ?  invariant(false, 'DECIMALS')  : void 0;
    return _Fraction.prototype.toFixed.call(this, decimalPlaces, format, rounding);
  };

  _proto.toExact = function toExact(format) {
    if (format === void 0) {
      format = {
        groupSeparator: ''
      };
    }

    Big$1.DP = this.currency.decimals;
    return new Big$1(this.numerator.toString()).div(this.denominator.toString()).toFormat(format);
  };

  _createClass(CurrencyAmount, [{
    key: "raw",
    get: function get() {
      return this.numerator;
    }
  }]);

  return CurrencyAmount;
}(Fraction);

var TokenAmount = /*#__PURE__*/function (_CurrencyAmount) {
  _inheritsLoose(TokenAmount, _CurrencyAmount);

  // amount _must_ be raw, i.e. in the native representation
  function TokenAmount(token, amount) {
    var _this;

    _this = _CurrencyAmount.call(this, token, amount) || this;
    _this.token = token;
    return _this;
  }

  var _proto = TokenAmount.prototype;

  _proto.add = function add(other) {
    !this.token.equals(other.token) ?  invariant(false, 'TOKEN')  : void 0;
    return new TokenAmount(this.token, JSBI.add(this.raw, other.raw));
  };

  _proto.subtract = function subtract(other) {
    !this.token.equals(other.token) ?  invariant(false, 'TOKEN')  : void 0;
    return new TokenAmount(this.token, JSBI.subtract(this.raw, other.raw));
  };

  return TokenAmount;
}(CurrencyAmount);

var Price = /*#__PURE__*/function (_Fraction) {
  _inheritsLoose(Price, _Fraction);

  // denominator and numerator _must_ be raw, i.e. in the native representation
  function Price(baseCurrency, quoteCurrency, denominator, numerator) {
    var _this;

    _this = _Fraction.call(this, numerator, denominator) || this;
    _this.baseCurrency = baseCurrency;
    _this.quoteCurrency = quoteCurrency;
    _this.scalar = new Fraction(JSBI.exponentiate(TEN, JSBI.BigInt(baseCurrency.decimals)), JSBI.exponentiate(TEN, JSBI.BigInt(quoteCurrency.decimals)));
    return _this;
  }

  Price.fromRoute = function fromRoute(route) {
    var prices = [];

    for (var _iterator = _createForOfIteratorHelperLoose(route.pairs.entries()), _step; !(_step = _iterator()).done;) {
      var _step$value = _step.value,
          i = _step$value[0],
          pair = _step$value[1];
      prices.push(route.path[i].equals(pair.token0) ? new Price(pair.reserve0.currency, pair.reserve1.currency, pair.reserve0.raw, pair.reserve1.raw) : new Price(pair.reserve1.currency, pair.reserve0.currency, pair.reserve1.raw, pair.reserve0.raw));
    }

    return prices.slice(1).reduce(function (accumulator, currentValue) {
      return accumulator.multiply(currentValue);
    }, prices[0]);
  };

  var _proto = Price.prototype;

  _proto.invert = function invert() {
    return new Price(this.quoteCurrency, this.baseCurrency, this.numerator, this.denominator);
  };

  _proto.multiply = function multiply(other) {
    !currencyEquals(this.quoteCurrency, other.baseCurrency) ?  invariant(false, 'TOKEN')  : void 0;

    var fraction = _Fraction.prototype.multiply.call(this, other);

    return new Price(this.baseCurrency, other.quoteCurrency, fraction.denominator, fraction.numerator);
  } // performs floor division on overflow
  ;

  _proto.quote = function quote(currencyAmount) {
    !currencyEquals(currencyAmount.currency, this.baseCurrency) ?  invariant(false, 'TOKEN')  : void 0;

    if (this.quoteCurrency instanceof Token) {
      return new TokenAmount(this.quoteCurrency, _Fraction.prototype.multiply.call(this, currencyAmount.raw).quotient);
    }

    return CurrencyAmount.ether(_Fraction.prototype.multiply.call(this, currencyAmount.raw).quotient);
  };

  _proto.toSignificant = function toSignificant(significantDigits, format, rounding) {
    if (significantDigits === void 0) {
      significantDigits = 6;
    }

    return this.adjusted.toSignificant(significantDigits, format, rounding);
  };

  _proto.toFixed = function toFixed(decimalPlaces, format, rounding) {
    if (decimalPlaces === void 0) {
      decimalPlaces = 4;
    }

    return this.adjusted.toFixed(decimalPlaces, format, rounding);
  };

  _createClass(Price, [{
    key: "raw",
    get: function get() {
      return new Fraction(this.numerator, this.denominator);
    }
  }, {
    key: "adjusted",
    get: function get() {
      return _Fraction.prototype.multiply.call(this, this.scalar);
    }
  }]);

  return Price;
}(Fraction);

var PAIR_ADDRESS_CACHE = {};
var Pair = /*#__PURE__*/function () {
  function Pair(tokenAmountA, tokenAmountB) {
    var tokenAmounts = tokenAmountA.token.sortsBefore(tokenAmountB.token) // does safety checks
    ? [tokenAmountA, tokenAmountB] : [tokenAmountB, tokenAmountA];
    this.liquidityToken = new Token(tokenAmounts[0].token.chainId, Pair.getAddress(tokenAmounts[0].token, tokenAmounts[1].token, tokenAmounts[0].token.chainId), 18, 'SFS-LP', 'Safeswap LPs');
    this.tokenAmounts = tokenAmounts;
  }

  Pair.getAddress = function getAddress(tokenA, tokenB, chainId) {
    var _PAIR_ADDRESS_CACHE, _PAIR_ADDRESS_CACHE$t;

    if (chainId === void 0) {
      chainId = exports.ChainId.BSC_TESTNET;
    }

    var tokens = tokenA.sortsBefore(tokenB) ? [tokenA, tokenB] : [tokenB, tokenA]; // does safety checks

    if (((_PAIR_ADDRESS_CACHE = PAIR_ADDRESS_CACHE) === null || _PAIR_ADDRESS_CACHE === void 0 ? void 0 : (_PAIR_ADDRESS_CACHE$t = _PAIR_ADDRESS_CACHE[tokens[0].address]) === null || _PAIR_ADDRESS_CACHE$t === void 0 ? void 0 : _PAIR_ADDRESS_CACHE$t[tokens[1].address]) === undefined) {
      var _PAIR_ADDRESS_CACHE2, _extends2, _extends3;

      PAIR_ADDRESS_CACHE = _extends({}, PAIR_ADDRESS_CACHE, (_extends3 = {}, _extends3[tokens[0].address] = _extends({}, (_PAIR_ADDRESS_CACHE2 = PAIR_ADDRESS_CACHE) === null || _PAIR_ADDRESS_CACHE2 === void 0 ? void 0 : _PAIR_ADDRESS_CACHE2[tokens[0].address], (_extends2 = {}, _extends2[tokens[1].address] = address.getCreate2Address( // @ts-ignore
      FACTORY_ADDRESS[chainId || tokenA.chainId], solidity.keccak256(['bytes'], [solidity.pack(['address', 'address'], [tokens[0].address, tokens[1].address])]), INIT_CODE_HASH), _extends2)), _extends3));
    }

    return PAIR_ADDRESS_CACHE[tokens[0].address][tokens[1].address];
  }
  /**
   * Returns true if the token is either token0 or token1
   * @param token to check
   */
  ;

  var _proto = Pair.prototype;

  _proto.involvesToken = function involvesToken(token) {
    return token.equals(this.token0) || token.equals(this.token1);
  }
  /**
   * Returns the current mid price of the pair in terms of token0, i.e. the ratio of reserve1 to reserve0
   */
  ;

  /**
   * Return the price of the given token in terms of the other token in the pair.
   * @param token token to return price of
   */
  _proto.priceOf = function priceOf(token) {
    !this.involvesToken(token) ?  invariant(false, 'TOKEN')  : void 0;
    return token.equals(this.token0) ? this.token0Price : this.token1Price;
  }
  /**
   * Returns the chain ID of the tokens in the pair.
   */
  ;

  _proto.reserveOf = function reserveOf(token) {
    !this.involvesToken(token) ?  invariant(false, 'TOKEN')  : void 0;
    return token.equals(this.token0) ? this.reserve0 : this.reserve1;
  };

  _proto.getOutputAmount = function getOutputAmount(inputAmount) {
    !this.involvesToken(inputAmount.token) ?  invariant(false, 'TOKEN')  : void 0;

    if (JSBI.equal(this.reserve0.raw, ZERO) || JSBI.equal(this.reserve1.raw, ZERO)) {
      throw new InsufficientReservesError();
    }

    var inputReserve = this.reserveOf(inputAmount.token);
    var outputReserve = this.reserveOf(inputAmount.token.equals(this.token0) ? this.token1 : this.token0);
    var inputAmountWithFee = JSBI.multiply(inputAmount.raw, _9975);
    var numerator = JSBI.multiply(inputAmountWithFee, outputReserve.raw);
    var denominator = JSBI.add(JSBI.multiply(inputReserve.raw, _10000), inputAmountWithFee);
    var outputAmount = new TokenAmount(inputAmount.token.equals(this.token0) ? this.token1 : this.token0, JSBI.divide(numerator, denominator));

    if (JSBI.equal(outputAmount.raw, ZERO)) {
      throw new InsufficientInputAmountError();
    }

    return [outputAmount, new Pair(inputReserve.add(inputAmount), outputReserve.subtract(outputAmount))];
  };

  _proto.getInputAmount = function getInputAmount(outputAmount) {
    !this.involvesToken(outputAmount.token) ?  invariant(false, 'TOKEN')  : void 0;

    if (JSBI.equal(this.reserve0.raw, ZERO) || JSBI.equal(this.reserve1.raw, ZERO) || JSBI.greaterThanOrEqual(outputAmount.raw, this.reserveOf(outputAmount.token).raw)) {
      throw new InsufficientReservesError();
    }

    var outputReserve = this.reserveOf(outputAmount.token);
    var inputReserve = this.reserveOf(outputAmount.token.equals(this.token0) ? this.token1 : this.token0);
    var numerator = JSBI.multiply(JSBI.multiply(inputReserve.raw, outputAmount.raw), _10000);
    var denominator = JSBI.multiply(JSBI.subtract(outputReserve.raw, outputAmount.raw), _9975);
    var inputAmount = new TokenAmount(outputAmount.token.equals(this.token0) ? this.token1 : this.token0, JSBI.add(JSBI.divide(numerator, denominator), ONE));
    return [inputAmount, new Pair(inputReserve.add(inputAmount), outputReserve.subtract(outputAmount))];
  };

  _proto.getLiquidityMinted = function getLiquidityMinted(totalSupply, tokenAmountA, tokenAmountB) {
    !totalSupply.token.equals(this.liquidityToken) ?  invariant(false, 'LIQUIDITY')  : void 0;
    var tokenAmounts = tokenAmountA.token.sortsBefore(tokenAmountB.token) // does safety checks
    ? [tokenAmountA, tokenAmountB] : [tokenAmountB, tokenAmountA];
    !(tokenAmounts[0].token.equals(this.token0) && tokenAmounts[1].token.equals(this.token1)) ?  invariant(false, 'TOKEN')  : void 0;
    var liquidity;

    if (JSBI.equal(totalSupply.raw, ZERO)) {
      liquidity = JSBI.subtract(sqrt(JSBI.multiply(tokenAmounts[0].raw, tokenAmounts[1].raw)), MINIMUM_LIQUIDITY);
    } else {
      var amount0 = JSBI.divide(JSBI.multiply(tokenAmounts[0].raw, totalSupply.raw), this.reserve0.raw);
      var amount1 = JSBI.divide(JSBI.multiply(tokenAmounts[1].raw, totalSupply.raw), this.reserve1.raw);
      liquidity = JSBI.lessThanOrEqual(amount0, amount1) ? amount0 : amount1;
    }

    if (!JSBI.greaterThan(liquidity, ZERO)) {
      throw new InsufficientInputAmountError();
    }

    return new TokenAmount(this.liquidityToken, liquidity);
  };

  _proto.getLiquidityValue = function getLiquidityValue(token, totalSupply, liquidity, feeOn, kLast) {
    if (feeOn === void 0) {
      feeOn = false;
    }

    !this.involvesToken(token) ?  invariant(false, 'TOKEN')  : void 0;
    !totalSupply.token.equals(this.liquidityToken) ?  invariant(false, 'TOTAL_SUPPLY')  : void 0;
    !liquidity.token.equals(this.liquidityToken) ?  invariant(false, 'LIQUIDITY')  : void 0;
    !JSBI.lessThanOrEqual(liquidity.raw, totalSupply.raw) ?  invariant(false, 'LIQUIDITY')  : void 0;
    var totalSupplyAdjusted;

    if (!feeOn) {
      totalSupplyAdjusted = totalSupply;
    } else {
      !!!kLast ?  invariant(false, 'K_LAST')  : void 0;
      var kLastParsed = parseBigintIsh(kLast);

      if (!JSBI.equal(kLastParsed, ZERO)) {
        var rootK = sqrt(JSBI.multiply(this.reserve0.raw, this.reserve1.raw));
        var rootKLast = sqrt(kLastParsed);

        if (JSBI.greaterThan(rootK, rootKLast)) {
          var numerator = JSBI.multiply(totalSupply.raw, JSBI.subtract(rootK, rootKLast));
          var denominator = JSBI.add(JSBI.multiply(rootK, FIVE), rootKLast);
          var feeLiquidity = JSBI.divide(numerator, denominator);
          totalSupplyAdjusted = totalSupply.add(new TokenAmount(this.liquidityToken, feeLiquidity));
        } else {
          totalSupplyAdjusted = totalSupply;
        }
      } else {
        totalSupplyAdjusted = totalSupply;
      }
    }

    return new TokenAmount(token, JSBI.divide(JSBI.multiply(liquidity.raw, this.reserveOf(token).raw), totalSupplyAdjusted.raw));
  };

  _createClass(Pair, [{
    key: "token0Price",
    get: function get() {
      return new Price(this.token0, this.token1, this.tokenAmounts[0].raw, this.tokenAmounts[1].raw);
    }
    /**
     * Returns the current mid price of the pair in terms of token1, i.e. the ratio of reserve0 to reserve1
     */

  }, {
    key: "token1Price",
    get: function get() {
      return new Price(this.token1, this.token0, this.tokenAmounts[1].raw, this.tokenAmounts[0].raw);
    }
  }, {
    key: "chainId",
    get: function get() {
      return this.token0.chainId;
    }
  }, {
    key: "token0",
    get: function get() {
      return this.tokenAmounts[0].token;
    }
  }, {
    key: "token1",
    get: function get() {
      return this.tokenAmounts[1].token;
    }
  }, {
    key: "reserve0",
    get: function get() {
      return this.tokenAmounts[0];
    }
  }, {
    key: "reserve1",
    get: function get() {
      return this.tokenAmounts[1];
    }
  }]);

  return Pair;
}();

var Route = /*#__PURE__*/function () {
  function Route(pairs, input, output) {
    !(pairs.length > 0) ?  invariant(false, 'PAIRS')  : void 0;
    !pairs.every(function (pair) {
      return pair.chainId === pairs[0].chainId;
    }) ?  invariant(false, 'CHAIN_IDS')  : void 0;
    !(input instanceof Token && pairs[0].involvesToken(input) || input === ETHER && pairs[0].involvesToken(WETH[pairs[0].chainId])) ?  invariant(false, 'INPUT')  : void 0;
    !(typeof output === 'undefined' || output instanceof Token && pairs[pairs.length - 1].involvesToken(output) || output === ETHER && pairs[pairs.length - 1].involvesToken(WETH[pairs[0].chainId])) ?  invariant(false, 'OUTPUT')  : void 0;
    var path = [input instanceof Token ? input : WETH[pairs[0].chainId]];

    for (var _iterator = _createForOfIteratorHelperLoose(pairs.entries()), _step; !(_step = _iterator()).done;) {
      var _step$value = _step.value,
          i = _step$value[0],
          pair = _step$value[1];
      var currentInput = path[i];
      !(currentInput.equals(pair.token0) || currentInput.equals(pair.token1)) ?  invariant(false, 'PATH')  : void 0;

      var _output = currentInput.equals(pair.token0) ? pair.token1 : pair.token0;

      path.push(_output);
    }

    this.pairs = pairs;
    this.path = path;
    this.midPrice = Price.fromRoute(this);
    this.input = input;
    this.output = output !== null && output !== void 0 ? output : path[path.length - 1];
  }

  _createClass(Route, [{
    key: "chainId",
    get: function get() {
      return this.pairs[0].chainId;
    }
  }]);

  return Route;
}();

var _100_PERCENT = /*#__PURE__*/new Fraction(_100);

var Percent = /*#__PURE__*/function (_Fraction) {
  _inheritsLoose(Percent, _Fraction);

  function Percent() {
    return _Fraction.apply(this, arguments) || this;
  }

  var _proto = Percent.prototype;

  _proto.toSignificant = function toSignificant(significantDigits, format, rounding) {
    if (significantDigits === void 0) {
      significantDigits = 5;
    }

    return this.multiply(_100_PERCENT).toSignificant(significantDigits, format, rounding);
  };

  _proto.toFixed = function toFixed(decimalPlaces, format, rounding) {
    if (decimalPlaces === void 0) {
      decimalPlaces = 2;
    }

    return this.multiply(_100_PERCENT).toFixed(decimalPlaces, format, rounding);
  };

  return Percent;
}(Fraction);

/**
 * Returns the percent difference between the mid price and the execution price, i.e. price impact.
 * @param midPrice mid price before the trade
 * @param inputAmount the input amount of the trade
 * @param outputAmount the output amount of the trade
 */

function computePriceImpact(midPrice, inputAmount, outputAmount) {
  var exactQuote = midPrice.raw.multiply(inputAmount.raw); // calculate slippage := (exactQuote - outputAmount) / exactQuote

  var slippage = exactQuote.subtract(outputAmount.raw).divide(exactQuote);
  return new Percent(slippage.numerator, slippage.denominator);
} // comparator function that allows sorting trades by their output amounts, in decreasing order, and then input amounts
// in increasing order. i.e. the best trades have the most outputs for the least inputs and are sorted first


function inputOutputComparator(a, b) {
  // must have same input and output token for comparison
  !currencyEquals(a.inputAmount.currency, b.inputAmount.currency) ?  invariant(false, 'INPUT_CURRENCY')  : void 0;
  !currencyEquals(a.outputAmount.currency, b.outputAmount.currency) ?  invariant(false, 'OUTPUT_CURRENCY')  : void 0;

  if (a.outputAmount.equalTo(b.outputAmount)) {
    if (a.inputAmount.equalTo(b.inputAmount)) {
      return 0;
    } // trade A requires less input than trade B, so A should come first


    if (a.inputAmount.lessThan(b.inputAmount)) {
      return -1;
    } else {
      return 1;
    }
  } else {
    // tradeA has less output than trade B, so should come second
    if (a.outputAmount.lessThan(b.outputAmount)) {
      return 1;
    } else {
      return -1;
    }
  }
} // extension of the input output comparator that also considers other dimensions of the trade in ranking them

function tradeComparator(a, b) {
  var ioComp = inputOutputComparator(a, b);

  if (ioComp !== 0) {
    return ioComp;
  } // consider lowest slippage next, since these are less likely to fail


  if (a.priceImpact.lessThan(b.priceImpact)) {
    return -1;
  } else if (a.priceImpact.greaterThan(b.priceImpact)) {
    return 1;
  } // finally consider the number of hops since each hop costs gas


  return a.route.path.length - b.route.path.length;
}
/**
 * Given a currency amount and a chain ID, returns the equivalent representation as the token amount.
 * In other words, if the currency is ETHER, returns the WETH token amount for the given chain. Otherwise, returns
 * the input currency amount.
 */

function wrappedAmount(currencyAmount, chainId) {
  if (currencyAmount instanceof TokenAmount) return currencyAmount;
  if (currencyAmount.currency === ETHER) return new TokenAmount(WETH[chainId], currencyAmount.raw);
    invariant(false, 'CURRENCY')  ;
}

function wrappedCurrency(currency, chainId) {
  if (currency instanceof Token) return currency;
  if (currency === ETHER) return WETH[chainId];
    invariant(false, 'CURRENCY')  ;
}
/**
 * Represents a trade executed against a list of pairs.
 * Does not account for slippage, i.e. trades that front run this trade and move the price.
 */


var Trade = /*#__PURE__*/function () {
  function Trade(route, amount, tradeType) {
    var amounts = new Array(route.path.length);
    var nextPairs = new Array(route.pairs.length);

    if (tradeType === exports.TradeType.EXACT_INPUT) {
      !currencyEquals(amount.currency, route.input) ?  invariant(false, 'INPUT')  : void 0;
      amounts[0] = wrappedAmount(amount, route.chainId);

      for (var i = 0; i < route.path.length - 1; i++) {
        var pair = route.pairs[i];

        var _pair$getOutputAmount = pair.getOutputAmount(amounts[i]),
            outputAmount = _pair$getOutputAmount[0],
            nextPair = _pair$getOutputAmount[1];

        amounts[i + 1] = outputAmount;
        nextPairs[i] = nextPair;
      }
    } else {
      !currencyEquals(amount.currency, route.output) ?  invariant(false, 'OUTPUT')  : void 0;
      amounts[amounts.length - 1] = wrappedAmount(amount, route.chainId);

      for (var _i = route.path.length - 1; _i > 0; _i--) {
        var _pair = route.pairs[_i - 1];

        var _pair$getInputAmount = _pair.getInputAmount(amounts[_i]),
            inputAmount = _pair$getInputAmount[0],
            _nextPair = _pair$getInputAmount[1];

        amounts[_i - 1] = inputAmount;
        nextPairs[_i - 1] = _nextPair;
      }
    }

    this.route = route;
    this.tradeType = tradeType;
    this.inputAmount = tradeType === exports.TradeType.EXACT_INPUT ? amount : route.input === ETHER ? CurrencyAmount.ether(amounts[0].raw) : amounts[0];
    this.outputAmount = tradeType === exports.TradeType.EXACT_OUTPUT ? amount : route.output === ETHER ? CurrencyAmount.ether(amounts[amounts.length - 1].raw) : amounts[amounts.length - 1];
    this.executionPrice = new Price(this.inputAmount.currency, this.outputAmount.currency, this.inputAmount.raw, this.outputAmount.raw);
    this.nextMidPrice = Price.fromRoute(new Route(nextPairs, route.input));
    this.priceImpact = computePriceImpact(route.midPrice, this.inputAmount, this.outputAmount);
  }
  /**
   * Constructs an exact in trade with the given amount in and route
   * @param route route of the exact in trade
   * @param amountIn the amount being passed in
   */


  Trade.exactIn = function exactIn(route, amountIn) {
    return new Trade(route, amountIn, exports.TradeType.EXACT_INPUT);
  }
  /**
   * Constructs an exact out trade with the given amount out and route
   * @param route route of the exact out trade
   * @param amountOut the amount returned by the trade
   */
  ;

  Trade.exactOut = function exactOut(route, amountOut) {
    return new Trade(route, amountOut, exports.TradeType.EXACT_OUTPUT);
  }
  /**
   * Get the minimum amount that must be received from this trade for the given slippage tolerance
   * @param slippageTolerance tolerance of unfavorable slippage from the execution price of this trade
   */
  ;

  var _proto = Trade.prototype;

  _proto.minimumAmountOut = function minimumAmountOut(slippageTolerance) {
    !!slippageTolerance.lessThan(ZERO) ?  invariant(false, 'SLIPPAGE_TOLERANCE')  : void 0;

    if (this.tradeType === exports.TradeType.EXACT_OUTPUT) {
      return this.outputAmount;
    } else {
      var slippageAdjustedAmountOut = new Fraction(ONE).add(slippageTolerance).invert().multiply(this.outputAmount.raw).quotient;
      return this.outputAmount instanceof TokenAmount ? new TokenAmount(this.outputAmount.token, slippageAdjustedAmountOut) : CurrencyAmount.ether(slippageAdjustedAmountOut);
    }
  }
  /**
   * Get the maximum amount in that can be spent via this trade for the given slippage tolerance
   * @param slippageTolerance tolerance of unfavorable slippage from the execution price of this trade
   */
  ;

  _proto.maximumAmountIn = function maximumAmountIn(slippageTolerance) {
    !!slippageTolerance.lessThan(ZERO) ?  invariant(false, 'SLIPPAGE_TOLERANCE')  : void 0;

    if (this.tradeType === exports.TradeType.EXACT_INPUT) {
      return this.inputAmount;
    } else {
      var slippageAdjustedAmountIn = new Fraction(ONE).add(slippageTolerance).multiply(this.inputAmount.raw).quotient;
      return this.inputAmount instanceof TokenAmount ? new TokenAmount(this.inputAmount.token, slippageAdjustedAmountIn) : CurrencyAmount.ether(slippageAdjustedAmountIn);
    }
  }
  /**
   * Given a list of pairs, and a fixed amount in, returns the top `maxNumResults` trades that go from an input token
   * amount to an output token, making at most `maxHops` hops.
   * Note this does not consider aggregation, as routes are linear. It's possible a better route exists by splitting
   * the amount in among multiple routes.
   * @param pairs the pairs to consider in finding the best trade
   * @param currencyAmountIn exact amount of input currency to spend
   * @param currencyOut the desired currency out
   * @param maxNumResults maximum number of results to return
   * @param maxHops maximum number of hops a returned trade can make, e.g. 1 hop goes through a single pair
   * @param currentPairs used in recursion; the current list of pairs
   * @param originalAmountIn used in recursion; the original value of the currencyAmountIn parameter
   * @param bestTrades used in recursion; the current list of best trades
   */
  ;

  Trade.bestTradeExactIn = function bestTradeExactIn(pairs, currencyAmountIn, currencyOut, _temp, // used in recursion.
  currentPairs, originalAmountIn, bestTrades) {
    var _ref = _temp === void 0 ? {} : _temp,
        _ref$maxNumResults = _ref.maxNumResults,
        maxNumResults = _ref$maxNumResults === void 0 ? 3 : _ref$maxNumResults,
        _ref$maxHops = _ref.maxHops,
        maxHops = _ref$maxHops === void 0 ? 3 : _ref$maxHops;

    if (currentPairs === void 0) {
      currentPairs = [];
    }

    if (originalAmountIn === void 0) {
      originalAmountIn = currencyAmountIn;
    }

    if (bestTrades === void 0) {
      bestTrades = [];
    }

    !(pairs.length > 0) ?  invariant(false, 'PAIRS')  : void 0;
    !(maxHops > 0) ?  invariant(false, 'MAX_HOPS')  : void 0;
    !(originalAmountIn === currencyAmountIn || currentPairs.length > 0) ?  invariant(false, 'INVALID_RECURSION')  : void 0;
    var chainId = currencyAmountIn instanceof TokenAmount ? currencyAmountIn.token.chainId : currencyOut instanceof Token ? currencyOut.chainId : undefined;
    !(chainId !== undefined) ?  invariant(false, 'CHAIN_ID')  : void 0;
    var amountIn = wrappedAmount(currencyAmountIn, chainId);
    var tokenOut = wrappedCurrency(currencyOut, chainId);

    for (var i = 0; i < pairs.length; i++) {
      var pair = pairs[i]; // pair irrelevant

      if (!pair.token0.equals(amountIn.token) && !pair.token1.equals(amountIn.token)) continue;
      if (pair.reserve0.equalTo(ZERO) || pair.reserve1.equalTo(ZERO)) continue;
      var amountOut = void 0;

      try {
        ;

        var _pair$getOutputAmount2 = pair.getOutputAmount(amountIn);

        amountOut = _pair$getOutputAmount2[0];
      } catch (error) {
        // input too low
        if (error.isInsufficientInputAmountError) {
          continue;
        }

        throw error;
      } // we have arrived at the output token, so this is the final trade of one of the paths


      if (amountOut.token.equals(tokenOut)) {
        sortedInsert(bestTrades, new Trade(new Route([].concat(currentPairs, [pair]), originalAmountIn.currency, currencyOut), originalAmountIn, exports.TradeType.EXACT_INPUT), maxNumResults, tradeComparator);
      } else if (maxHops > 1 && pairs.length > 1) {
        var pairsExcludingThisPair = pairs.slice(0, i).concat(pairs.slice(i + 1, pairs.length)); // otherwise, consider all the other paths that lead from this token as long as we have not exceeded maxHops

        Trade.bestTradeExactIn(pairsExcludingThisPair, amountOut, currencyOut, {
          maxNumResults: maxNumResults,
          maxHops: maxHops - 1
        }, [].concat(currentPairs, [pair]), originalAmountIn, bestTrades);
      }
    }

    return bestTrades;
  }
  /**
   * similar to the above method but instead targets a fixed output amount
   * given a list of pairs, and a fixed amount out, returns the top `maxNumResults` trades that go from an input token
   * to an output token amount, making at most `maxHops` hops
   * note this does not consider aggregation, as routes are linear. it's possible a better route exists by splitting
   * the amount in among multiple routes.
   * @param pairs the pairs to consider in finding the best trade
   * @param currencyIn the currency to spend
   * @param currencyAmountOut the exact amount of currency out
   * @param maxNumResults maximum number of results to return
   * @param maxHops maximum number of hops a returned trade can make, e.g. 1 hop goes through a single pair
   * @param currentPairs used in recursion; the current list of pairs
   * @param originalAmountOut used in recursion; the original value of the currencyAmountOut parameter
   * @param bestTrades used in recursion; the current list of best trades
   */
  ;

  Trade.bestTradeExactOut = function bestTradeExactOut(pairs, currencyIn, currencyAmountOut, _temp2, // used in recursion.
  currentPairs, originalAmountOut, bestTrades) {
    var _ref2 = _temp2 === void 0 ? {} : _temp2,
        _ref2$maxNumResults = _ref2.maxNumResults,
        maxNumResults = _ref2$maxNumResults === void 0 ? 3 : _ref2$maxNumResults,
        _ref2$maxHops = _ref2.maxHops,
        maxHops = _ref2$maxHops === void 0 ? 3 : _ref2$maxHops;

    if (currentPairs === void 0) {
      currentPairs = [];
    }

    if (originalAmountOut === void 0) {
      originalAmountOut = currencyAmountOut;
    }

    if (bestTrades === void 0) {
      bestTrades = [];
    }

    !(pairs.length > 0) ?  invariant(false, 'PAIRS')  : void 0;
    !(maxHops > 0) ?  invariant(false, 'MAX_HOPS')  : void 0;
    !(originalAmountOut === currencyAmountOut || currentPairs.length > 0) ?  invariant(false, 'INVALID_RECURSION')  : void 0;
    var chainId = currencyAmountOut instanceof TokenAmount ? currencyAmountOut.token.chainId : currencyIn instanceof Token ? currencyIn.chainId : undefined;
    !(chainId !== undefined) ?  invariant(false, 'CHAIN_ID')  : void 0;
    var amountOut = wrappedAmount(currencyAmountOut, chainId);
    var tokenIn = wrappedCurrency(currencyIn, chainId);

    for (var i = 0; i < pairs.length; i++) {
      var pair = pairs[i]; // pair irrelevant

      if (!pair.token0.equals(amountOut.token) && !pair.token1.equals(amountOut.token)) continue;
      if (pair.reserve0.equalTo(ZERO) || pair.reserve1.equalTo(ZERO)) continue;
      var amountIn = void 0;

      try {
        ;

        var _pair$getInputAmount2 = pair.getInputAmount(amountOut);

        amountIn = _pair$getInputAmount2[0];
      } catch (error) {
        // not enough liquidity in this pair
        if (error.isInsufficientReservesError) {
          continue;
        }

        throw error;
      } // we have arrived at the input token, so this is the first trade of one of the paths


      if (amountIn.token.equals(tokenIn)) {
        sortedInsert(bestTrades, new Trade(new Route([pair].concat(currentPairs), currencyIn, originalAmountOut.currency), originalAmountOut, exports.TradeType.EXACT_OUTPUT), maxNumResults, tradeComparator);
      } else if (maxHops > 1 && pairs.length > 1) {
        var pairsExcludingThisPair = pairs.slice(0, i).concat(pairs.slice(i + 1, pairs.length)); // otherwise, consider all the other paths that arrive at this token as long as we have not exceeded maxHops

        Trade.bestTradeExactOut(pairsExcludingThisPair, currencyIn, amountIn, {
          maxNumResults: maxNumResults,
          maxHops: maxHops - 1
        }, [pair].concat(currentPairs), originalAmountOut, bestTrades);
      }
    }

    return bestTrades;
  };

  return Trade;
}();

function toHex(currencyAmount) {
  return "0x" + currencyAmount.raw.toString(16);
}

var ZERO_HEX = '0x0';
/**
 * Represents the Uniswap V2 Router, and has static methods for helping execute trades.
 */

var Router = /*#__PURE__*/function () {
  /**
   * Cannot be constructed.
   */
  function Router() {}
  /**
   * Produces the on-chain method name to call and the hex encoded parameters to pass as arguments for a given trade.
   * @param trade to produce call parameters for
   * @param options options for the call parameters
   */


  Router.swapCallParameters = function swapCallParameters(trade, options) {
    var etherIn = trade.inputAmount.currency === ETHER;
    var etherOut = trade.outputAmount.currency === ETHER; // the router does not support both ether in and out

    !!(etherIn && etherOut) ?  invariant(false, 'ETHER_IN_OUT')  : void 0;
    !(options.ttl > 0) ?  invariant(false, 'TTL')  : void 0;
    var to = validateAndParseAddress(options.recipient);
    var amountIn = toHex(trade.maximumAmountIn(options.allowedSlippage));
    var amountOut = toHex(trade.minimumAmountOut(options.allowedSlippage));
    var path = trade.route.path.map(function (token) {
      return token.address;
    });
    var deadline = "0x" + (Math.floor(new Date().getTime() / 1000) + options.ttl).toString(16);
    var useFeeOnTransfer = Boolean(options.feeOnTransfer);
    var methodName;
    var args;
    var value;

    switch (trade.tradeType) {
      case exports.TradeType.EXACT_INPUT:
        if (etherIn) {
          methodName = useFeeOnTransfer ? 'swapExactETHForTokensSupportingFeeOnTransferTokens' : 'swapExactETHForTokens'; // (uint amountOutMin, address[] calldata path, address to, uint deadline)

          args = [amountOut, path, to, deadline];
          value = amountIn;
        } else if (etherOut) {
          methodName = useFeeOnTransfer ? 'swapExactTokensForETHSupportingFeeOnTransferTokens' : 'swapExactTokensForETH'; // (uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline)

          args = [amountIn, amountOut, path, to, deadline];
          value = ZERO_HEX;
        } else {
          methodName = useFeeOnTransfer ? 'swapExactTokensForTokensSupportingFeeOnTransferTokens' : 'swapExactTokensForTokens'; // (uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline)

          args = [amountIn, amountOut, path, to, deadline];
          value = ZERO_HEX;
        }

        break;

      case exports.TradeType.EXACT_OUTPUT:
        !!useFeeOnTransfer ?  invariant(false, 'EXACT_OUT_FOT')  : void 0;

        if (etherIn) {
          methodName = 'swapETHForExactTokens'; // (uint amountOut, address[] calldata path, address to, uint deadline)

          args = [amountOut, path, to, deadline];
          value = amountIn;
        } else if (etherOut) {
          methodName = 'swapTokensForExactETH'; // (uint amountOut, uint amountInMax, address[] calldata path, address to, uint deadline)

          args = [amountOut, amountIn, path, to, deadline];
          value = ZERO_HEX;
        } else {
          methodName = 'swapTokensForExactTokens'; // (uint amountOut, uint amountInMax, address[] calldata path, address to, uint deadline)

          args = [amountOut, amountIn, path, to, deadline];
          value = ZERO_HEX;
        }

        break;
    }

    return {
      methodName: methodName,
      args: args,
      value: value
    };
  };

  return Router;
}();

var contractName = "ISafeswapPair";
var abi = [
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "owner",
				type: "address"
			},
			{
				indexed: true,
				internalType: "address",
				name: "spender",
				type: "address"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "value",
				type: "uint256"
			}
		],
		name: "Approval",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "sender",
				type: "address"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "amount0",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "amount1",
				type: "uint256"
			},
			{
				indexed: true,
				internalType: "address",
				name: "to",
				type: "address"
			}
		],
		name: "Burn",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "sender",
				type: "address"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "amount0",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "amount1",
				type: "uint256"
			}
		],
		name: "Mint",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "sender",
				type: "address"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "amount0In",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "amount1In",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "amount0Out",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "amount1Out",
				type: "uint256"
			},
			{
				indexed: true,
				internalType: "address",
				name: "to",
				type: "address"
			}
		],
		name: "Swap",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "uint112",
				name: "reserve0",
				type: "uint112"
			},
			{
				indexed: false,
				internalType: "uint112",
				name: "reserve1",
				type: "uint112"
			}
		],
		name: "Sync",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "from",
				type: "address"
			},
			{
				indexed: true,
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "value",
				type: "uint256"
			}
		],
		name: "Transfer",
		type: "event"
	},
	{
		constant: true,
		inputs: [
		],
		name: "name",
		outputs: [
			{
				internalType: "string",
				name: "",
				type: "string"
			}
		],
		payable: false,
		stateMutability: "pure",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "symbol",
		outputs: [
			{
				internalType: "string",
				name: "",
				type: "string"
			}
		],
		payable: false,
		stateMutability: "pure",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "decimals",
		outputs: [
			{
				internalType: "uint8",
				name: "",
				type: "uint8"
			}
		],
		payable: false,
		stateMutability: "pure",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "totalSupply",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
			{
				internalType: "address",
				name: "owner",
				type: "address"
			}
		],
		name: "balanceOf",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
			{
				internalType: "address",
				name: "owner",
				type: "address"
			},
			{
				internalType: "address",
				name: "spender",
				type: "address"
			}
		],
		name: "allowance",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "address",
				name: "spender",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "value",
				type: "uint256"
			}
		],
		name: "approve",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool"
			}
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "value",
				type: "uint256"
			}
		],
		name: "transfer",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool"
			}
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "address",
				name: "from",
				type: "address"
			},
			{
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "value",
				type: "uint256"
			}
		],
		name: "transferFrom",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool"
			}
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "DOMAIN_SEPARATOR",
		outputs: [
			{
				internalType: "bytes32",
				name: "",
				type: "bytes32"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "PERMIT_TYPEHASH",
		outputs: [
			{
				internalType: "bytes32",
				name: "",
				type: "bytes32"
			}
		],
		payable: false,
		stateMutability: "pure",
		type: "function"
	},
	{
		constant: true,
		inputs: [
			{
				internalType: "address",
				name: "owner",
				type: "address"
			}
		],
		name: "nonces",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "address",
				name: "owner",
				type: "address"
			},
			{
				internalType: "address",
				name: "spender",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "value",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "deadline",
				type: "uint256"
			},
			{
				internalType: "uint8",
				name: "v",
				type: "uint8"
			},
			{
				internalType: "bytes32",
				name: "r",
				type: "bytes32"
			},
			{
				internalType: "bytes32",
				name: "s",
				type: "bytes32"
			}
		],
		name: "permit",
		outputs: [
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "MINIMUM_LIQUIDITY",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "pure",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "factory",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "token0",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "token1",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "getReserves",
		outputs: [
			{
				internalType: "uint112",
				name: "reserve0",
				type: "uint112"
			},
			{
				internalType: "uint112",
				name: "reserve1",
				type: "uint112"
			},
			{
				internalType: "uint32",
				name: "blockTimestampLast",
				type: "uint32"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "price0CumulativeLast",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "price1CumulativeLast",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "kLast",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "address",
				name: "to",
				type: "address"
			}
		],
		name: "mint",
		outputs: [
			{
				internalType: "uint256",
				name: "liquidity",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "address",
				name: "to",
				type: "address"
			}
		],
		name: "burn",
		outputs: [
			{
				internalType: "uint256",
				name: "amount0",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amount1",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "uint256",
				name: "amount0Out",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amount1Out",
				type: "uint256"
			},
			{
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				internalType: "bytes",
				name: "data",
				type: "bytes"
			}
		],
		name: "swap",
		outputs: [
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "address",
				name: "to",
				type: "address"
			}
		],
		name: "skim",
		outputs: [
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: false,
		inputs: [
		],
		name: "sync",
		outputs: [
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			},
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		name: "initialize",
		outputs: [
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	}
];
var metadata = "{\"compiler\":{\"version\":\"0.5.16+commit.9c3226ce\"},\"language\":\"Solidity\",\"output\":{\"abi\":[{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"owner\",\"type\":\"address\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"spender\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"value\",\"type\":\"uint256\"}],\"name\":\"Approval\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"sender\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"amount0\",\"type\":\"uint256\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"amount1\",\"type\":\"uint256\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"to\",\"type\":\"address\"}],\"name\":\"Burn\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"sender\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"amount0\",\"type\":\"uint256\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"amount1\",\"type\":\"uint256\"}],\"name\":\"Mint\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"sender\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"amount0In\",\"type\":\"uint256\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"amount1In\",\"type\":\"uint256\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"amount0Out\",\"type\":\"uint256\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"amount1Out\",\"type\":\"uint256\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"to\",\"type\":\"address\"}],\"name\":\"Swap\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":false,\"internalType\":\"uint112\",\"name\":\"reserve0\",\"type\":\"uint112\"},{\"indexed\":false,\"internalType\":\"uint112\",\"name\":\"reserve1\",\"type\":\"uint112\"}],\"name\":\"Sync\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"from\",\"type\":\"address\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"to\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"value\",\"type\":\"uint256\"}],\"name\":\"Transfer\",\"type\":\"event\"},{\"constant\":true,\"inputs\":[],\"name\":\"DOMAIN_SEPARATOR\",\"outputs\":[{\"internalType\":\"bytes32\",\"name\":\"\",\"type\":\"bytes32\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"MINIMUM_LIQUIDITY\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"payable\":false,\"stateMutability\":\"pure\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"PERMIT_TYPEHASH\",\"outputs\":[{\"internalType\":\"bytes32\",\"name\":\"\",\"type\":\"bytes32\"}],\"payable\":false,\"stateMutability\":\"pure\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[{\"internalType\":\"address\",\"name\":\"owner\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"spender\",\"type\":\"address\"}],\"name\":\"allowance\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"internalType\":\"address\",\"name\":\"spender\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"value\",\"type\":\"uint256\"}],\"name\":\"approve\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[{\"internalType\":\"address\",\"name\":\"owner\",\"type\":\"address\"}],\"name\":\"balanceOf\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"internalType\":\"address\",\"name\":\"to\",\"type\":\"address\"}],\"name\":\"burn\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"amount0\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"amount1\",\"type\":\"uint256\"}],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"decimals\",\"outputs\":[{\"internalType\":\"uint8\",\"name\":\"\",\"type\":\"uint8\"}],\"payable\":false,\"stateMutability\":\"pure\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"factory\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"getReserves\",\"outputs\":[{\"internalType\":\"uint112\",\"name\":\"reserve0\",\"type\":\"uint112\"},{\"internalType\":\"uint112\",\"name\":\"reserve1\",\"type\":\"uint112\"},{\"internalType\":\"uint32\",\"name\":\"blockTimestampLast\",\"type\":\"uint32\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"name\":\"initialize\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"kLast\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"internalType\":\"address\",\"name\":\"to\",\"type\":\"address\"}],\"name\":\"mint\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"liquidity\",\"type\":\"uint256\"}],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"name\",\"outputs\":[{\"internalType\":\"string\",\"name\":\"\",\"type\":\"string\"}],\"payable\":false,\"stateMutability\":\"pure\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[{\"internalType\":\"address\",\"name\":\"owner\",\"type\":\"address\"}],\"name\":\"nonces\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"internalType\":\"address\",\"name\":\"owner\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"spender\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"value\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"deadline\",\"type\":\"uint256\"},{\"internalType\":\"uint8\",\"name\":\"v\",\"type\":\"uint8\"},{\"internalType\":\"bytes32\",\"name\":\"r\",\"type\":\"bytes32\"},{\"internalType\":\"bytes32\",\"name\":\"s\",\"type\":\"bytes32\"}],\"name\":\"permit\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"price0CumulativeLast\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"price1CumulativeLast\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"internalType\":\"address\",\"name\":\"to\",\"type\":\"address\"}],\"name\":\"skim\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"amount0Out\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"amount1Out\",\"type\":\"uint256\"},{\"internalType\":\"address\",\"name\":\"to\",\"type\":\"address\"},{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"}],\"name\":\"swap\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"symbol\",\"outputs\":[{\"internalType\":\"string\",\"name\":\"\",\"type\":\"string\"}],\"payable\":false,\"stateMutability\":\"pure\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[],\"name\":\"sync\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"token0\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"token1\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"totalSupply\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"internalType\":\"address\",\"name\":\"to\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"value\",\"type\":\"uint256\"}],\"name\":\"transfer\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"internalType\":\"address\",\"name\":\"from\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"to\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"value\",\"type\":\"uint256\"}],\"name\":\"transferFrom\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"}],\"devdoc\":{\"methods\":{}},\"userdoc\":{\"methods\":{}}},\"settings\":{\"compilationTarget\":{\"project:/contracts/interfaces/ISafeswapPair.sol\":\"ISafeswapPair\"},\"evmVersion\":\"istanbul\",\"libraries\":{},\"optimizer\":{\"enabled\":true,\"runs\":999999},\"remappings\":[]},\"sources\":{\"project:/contracts/interfaces/ISafeswapPair.sol\":{\"keccak256\":\"0x01e4c89672eb1a089889c4088a4c40c6f481e73f0e58e4fcf58654eccd5bf5c5\",\"urls\":[\"bzz-raw://57fd37bbe214eb608ae67583fc204ef399868e1932429ac39dd097cd5e0a222d\",\"dweb:/ipfs/QmZxB5VcV8TwTqumezNGQWQjzga5XwcxdXn58wM9obUzSB\"]}},\"version\":1}";
var bytecode = "0x";
var deployedBytecode = "0x";
var sourceMap = "";
var deployedSourceMap = "";
var source = "pragma solidity >=0.5.0;\n\ninterface ISafeswapPair {\n    event Approval(address indexed owner, address indexed spender, uint value);\n    event Transfer(address indexed from, address indexed to, uint value);\n\n    function name() external pure returns (string memory);\n    function symbol() external pure returns (string memory);\n    function decimals() external pure returns (uint8);\n    function totalSupply() external view returns (uint);\n    function balanceOf(address owner) external view returns (uint);\n    function allowance(address owner, address spender) external view returns (uint);\n\n    function approve(address spender, uint value) external returns (bool);\n    function transfer(address to, uint value) external returns (bool);\n    function transferFrom(address from, address to, uint value) external returns (bool);\n\n    function DOMAIN_SEPARATOR() external view returns (bytes32);\n    function PERMIT_TYPEHASH() external pure returns (bytes32);\n    function nonces(address owner) external view returns (uint);\n\n    function permit(address owner, address spender, uint value, uint deadline, uint8 v, bytes32 r, bytes32 s) external;\n\n    event Mint(address indexed sender, uint amount0, uint amount1);\n    event Burn(address indexed sender, uint amount0, uint amount1, address indexed to);\n    event Swap(\n        address indexed sender,\n        uint amount0In,\n        uint amount1In,\n        uint amount0Out,\n        uint amount1Out,\n        address indexed to\n    );\n    event Sync(uint112 reserve0, uint112 reserve1);\n\n    function MINIMUM_LIQUIDITY() external pure returns (uint);\n    function factory() external view returns (address);\n    function token0() external view returns (address);\n    function token1() external view returns (address);\n    function getReserves() external view returns (uint112 reserve0, uint112 reserve1, uint32 blockTimestampLast);\n    function price0CumulativeLast() external view returns (uint);\n    function price1CumulativeLast() external view returns (uint);\n    function kLast() external view returns (uint);\n\n    function mint(address to) external returns (uint liquidity);\n    function burn(address to) external returns (uint amount0, uint amount1);\n    function swap(uint amount0Out, uint amount1Out, address to, bytes calldata data) external;\n    function skim(address to) external;\n    function sync() external;\n\n    function initialize(address, address) external;\n}\n";
var sourcePath = "E:\\safemoon\\solidity\\compile\\swap-factory\\contracts\\interfaces\\ISafeswapPair.sol";
var ast = {
	absolutePath: "project:/contracts/interfaces/ISafeswapPair.sol",
	exportedSymbols: {
		ISafeswapPair: [
			2189
		]
	},
	id: 2190,
	nodeType: "SourceUnit",
	nodes: [
		{
			id: 1949,
			literals: [
				"solidity",
				">=",
				"0.5",
				".0"
			],
			nodeType: "PragmaDirective",
			src: "0:24:8"
		},
		{
			baseContracts: [
			],
			contractDependencies: [
			],
			contractKind: "interface",
			documentation: null,
			fullyImplemented: false,
			id: 2189,
			linearizedBaseContracts: [
				2189
			],
			name: "ISafeswapPair",
			nodeType: "ContractDefinition",
			nodes: [
				{
					anonymous: false,
					documentation: null,
					id: 1957,
					name: "Approval",
					nodeType: "EventDefinition",
					parameters: {
						id: 1956,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 1951,
								indexed: true,
								name: "owner",
								nodeType: "VariableDeclaration",
								scope: 1957,
								src: "71:21:8",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_address",
									typeString: "address"
								},
								typeName: {
									id: 1950,
									name: "address",
									nodeType: "ElementaryTypeName",
									src: "71:7:8",
									stateMutability: "nonpayable",
									typeDescriptions: {
										typeIdentifier: "t_address",
										typeString: "address"
									}
								},
								value: null,
								visibility: "internal"
							},
							{
								constant: false,
								id: 1953,
								indexed: true,
								name: "spender",
								nodeType: "VariableDeclaration",
								scope: 1957,
								src: "94:23:8",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_address",
									typeString: "address"
								},
								typeName: {
									id: 1952,
									name: "address",
									nodeType: "ElementaryTypeName",
									src: "94:7:8",
									stateMutability: "nonpayable",
									typeDescriptions: {
										typeIdentifier: "t_address",
										typeString: "address"
									}
								},
								value: null,
								visibility: "internal"
							},
							{
								constant: false,
								id: 1955,
								indexed: false,
								name: "value",
								nodeType: "VariableDeclaration",
								scope: 1957,
								src: "119:10:8",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_uint256",
									typeString: "uint256"
								},
								typeName: {
									id: 1954,
									name: "uint",
									nodeType: "ElementaryTypeName",
									src: "119:4:8",
									typeDescriptions: {
										typeIdentifier: "t_uint256",
										typeString: "uint256"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "70:60:8"
					},
					src: "56:75:8"
				},
				{
					anonymous: false,
					documentation: null,
					id: 1965,
					name: "Transfer",
					nodeType: "EventDefinition",
					parameters: {
						id: 1964,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 1959,
								indexed: true,
								name: "from",
								nodeType: "VariableDeclaration",
								scope: 1965,
								src: "151:20:8",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_address",
									typeString: "address"
								},
								typeName: {
									id: 1958,
									name: "address",
									nodeType: "ElementaryTypeName",
									src: "151:7:8",
									stateMutability: "nonpayable",
									typeDescriptions: {
										typeIdentifier: "t_address",
										typeString: "address"
									}
								},
								value: null,
								visibility: "internal"
							},
							{
								constant: false,
								id: 1961,
								indexed: true,
								name: "to",
								nodeType: "VariableDeclaration",
								scope: 1965,
								src: "173:18:8",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_address",
									typeString: "address"
								},
								typeName: {
									id: 1960,
									name: "address",
									nodeType: "ElementaryTypeName",
									src: "173:7:8",
									stateMutability: "nonpayable",
									typeDescriptions: {
										typeIdentifier: "t_address",
										typeString: "address"
									}
								},
								value: null,
								visibility: "internal"
							},
							{
								constant: false,
								id: 1963,
								indexed: false,
								name: "value",
								nodeType: "VariableDeclaration",
								scope: 1965,
								src: "193:10:8",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_uint256",
									typeString: "uint256"
								},
								typeName: {
									id: 1962,
									name: "uint",
									nodeType: "ElementaryTypeName",
									src: "193:4:8",
									typeDescriptions: {
										typeIdentifier: "t_uint256",
										typeString: "uint256"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "150:54:8"
					},
					src: "136:69:8"
				},
				{
					body: null,
					documentation: null,
					id: 1970,
					implemented: false,
					kind: "function",
					modifiers: [
					],
					name: "name",
					nodeType: "FunctionDefinition",
					parameters: {
						id: 1966,
						nodeType: "ParameterList",
						parameters: [
						],
						src: "224:2:8"
					},
					returnParameters: {
						id: 1969,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 1968,
								name: "",
								nodeType: "VariableDeclaration",
								scope: 1970,
								src: "250:13:8",
								stateVariable: false,
								storageLocation: "memory",
								typeDescriptions: {
									typeIdentifier: "t_string_memory_ptr",
									typeString: "string"
								},
								typeName: {
									id: 1967,
									name: "string",
									nodeType: "ElementaryTypeName",
									src: "250:6:8",
									typeDescriptions: {
										typeIdentifier: "t_string_storage_ptr",
										typeString: "string"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "249:15:8"
					},
					scope: 2189,
					src: "211:54:8",
					stateMutability: "pure",
					superFunction: null,
					visibility: "external"
				},
				{
					body: null,
					documentation: null,
					id: 1975,
					implemented: false,
					kind: "function",
					modifiers: [
					],
					name: "symbol",
					nodeType: "FunctionDefinition",
					parameters: {
						id: 1971,
						nodeType: "ParameterList",
						parameters: [
						],
						src: "285:2:8"
					},
					returnParameters: {
						id: 1974,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 1973,
								name: "",
								nodeType: "VariableDeclaration",
								scope: 1975,
								src: "311:13:8",
								stateVariable: false,
								storageLocation: "memory",
								typeDescriptions: {
									typeIdentifier: "t_string_memory_ptr",
									typeString: "string"
								},
								typeName: {
									id: 1972,
									name: "string",
									nodeType: "ElementaryTypeName",
									src: "311:6:8",
									typeDescriptions: {
										typeIdentifier: "t_string_storage_ptr",
										typeString: "string"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "310:15:8"
					},
					scope: 2189,
					src: "270:56:8",
					stateMutability: "pure",
					superFunction: null,
					visibility: "external"
				},
				{
					body: null,
					documentation: null,
					id: 1980,
					implemented: false,
					kind: "function",
					modifiers: [
					],
					name: "decimals",
					nodeType: "FunctionDefinition",
					parameters: {
						id: 1976,
						nodeType: "ParameterList",
						parameters: [
						],
						src: "348:2:8"
					},
					returnParameters: {
						id: 1979,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 1978,
								name: "",
								nodeType: "VariableDeclaration",
								scope: 1980,
								src: "374:5:8",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_uint8",
									typeString: "uint8"
								},
								typeName: {
									id: 1977,
									name: "uint8",
									nodeType: "ElementaryTypeName",
									src: "374:5:8",
									typeDescriptions: {
										typeIdentifier: "t_uint8",
										typeString: "uint8"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "373:7:8"
					},
					scope: 2189,
					src: "331:50:8",
					stateMutability: "pure",
					superFunction: null,
					visibility: "external"
				},
				{
					body: null,
					documentation: null,
					id: 1985,
					implemented: false,
					kind: "function",
					modifiers: [
					],
					name: "totalSupply",
					nodeType: "FunctionDefinition",
					parameters: {
						id: 1981,
						nodeType: "ParameterList",
						parameters: [
						],
						src: "406:2:8"
					},
					returnParameters: {
						id: 1984,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 1983,
								name: "",
								nodeType: "VariableDeclaration",
								scope: 1985,
								src: "432:4:8",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_uint256",
									typeString: "uint256"
								},
								typeName: {
									id: 1982,
									name: "uint",
									nodeType: "ElementaryTypeName",
									src: "432:4:8",
									typeDescriptions: {
										typeIdentifier: "t_uint256",
										typeString: "uint256"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "431:6:8"
					},
					scope: 2189,
					src: "386:52:8",
					stateMutability: "view",
					superFunction: null,
					visibility: "external"
				},
				{
					body: null,
					documentation: null,
					id: 1992,
					implemented: false,
					kind: "function",
					modifiers: [
					],
					name: "balanceOf",
					nodeType: "FunctionDefinition",
					parameters: {
						id: 1988,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 1987,
								name: "owner",
								nodeType: "VariableDeclaration",
								scope: 1992,
								src: "462:13:8",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_address",
									typeString: "address"
								},
								typeName: {
									id: 1986,
									name: "address",
									nodeType: "ElementaryTypeName",
									src: "462:7:8",
									stateMutability: "nonpayable",
									typeDescriptions: {
										typeIdentifier: "t_address",
										typeString: "address"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "461:15:8"
					},
					returnParameters: {
						id: 1991,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 1990,
								name: "",
								nodeType: "VariableDeclaration",
								scope: 1992,
								src: "500:4:8",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_uint256",
									typeString: "uint256"
								},
								typeName: {
									id: 1989,
									name: "uint",
									nodeType: "ElementaryTypeName",
									src: "500:4:8",
									typeDescriptions: {
										typeIdentifier: "t_uint256",
										typeString: "uint256"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "499:6:8"
					},
					scope: 2189,
					src: "443:63:8",
					stateMutability: "view",
					superFunction: null,
					visibility: "external"
				},
				{
					body: null,
					documentation: null,
					id: 2001,
					implemented: false,
					kind: "function",
					modifiers: [
					],
					name: "allowance",
					nodeType: "FunctionDefinition",
					parameters: {
						id: 1997,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 1994,
								name: "owner",
								nodeType: "VariableDeclaration",
								scope: 2001,
								src: "530:13:8",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_address",
									typeString: "address"
								},
								typeName: {
									id: 1993,
									name: "address",
									nodeType: "ElementaryTypeName",
									src: "530:7:8",
									stateMutability: "nonpayable",
									typeDescriptions: {
										typeIdentifier: "t_address",
										typeString: "address"
									}
								},
								value: null,
								visibility: "internal"
							},
							{
								constant: false,
								id: 1996,
								name: "spender",
								nodeType: "VariableDeclaration",
								scope: 2001,
								src: "545:15:8",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_address",
									typeString: "address"
								},
								typeName: {
									id: 1995,
									name: "address",
									nodeType: "ElementaryTypeName",
									src: "545:7:8",
									stateMutability: "nonpayable",
									typeDescriptions: {
										typeIdentifier: "t_address",
										typeString: "address"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "529:32:8"
					},
					returnParameters: {
						id: 2000,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 1999,
								name: "",
								nodeType: "VariableDeclaration",
								scope: 2001,
								src: "585:4:8",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_uint256",
									typeString: "uint256"
								},
								typeName: {
									id: 1998,
									name: "uint",
									nodeType: "ElementaryTypeName",
									src: "585:4:8",
									typeDescriptions: {
										typeIdentifier: "t_uint256",
										typeString: "uint256"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "584:6:8"
					},
					scope: 2189,
					src: "511:80:8",
					stateMutability: "view",
					superFunction: null,
					visibility: "external"
				},
				{
					body: null,
					documentation: null,
					id: 2010,
					implemented: false,
					kind: "function",
					modifiers: [
					],
					name: "approve",
					nodeType: "FunctionDefinition",
					parameters: {
						id: 2006,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 2003,
								name: "spender",
								nodeType: "VariableDeclaration",
								scope: 2010,
								src: "614:15:8",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_address",
									typeString: "address"
								},
								typeName: {
									id: 2002,
									name: "address",
									nodeType: "ElementaryTypeName",
									src: "614:7:8",
									stateMutability: "nonpayable",
									typeDescriptions: {
										typeIdentifier: "t_address",
										typeString: "address"
									}
								},
								value: null,
								visibility: "internal"
							},
							{
								constant: false,
								id: 2005,
								name: "value",
								nodeType: "VariableDeclaration",
								scope: 2010,
								src: "631:10:8",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_uint256",
									typeString: "uint256"
								},
								typeName: {
									id: 2004,
									name: "uint",
									nodeType: "ElementaryTypeName",
									src: "631:4:8",
									typeDescriptions: {
										typeIdentifier: "t_uint256",
										typeString: "uint256"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "613:29:8"
					},
					returnParameters: {
						id: 2009,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 2008,
								name: "",
								nodeType: "VariableDeclaration",
								scope: 2010,
								src: "661:4:8",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_bool",
									typeString: "bool"
								},
								typeName: {
									id: 2007,
									name: "bool",
									nodeType: "ElementaryTypeName",
									src: "661:4:8",
									typeDescriptions: {
										typeIdentifier: "t_bool",
										typeString: "bool"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "660:6:8"
					},
					scope: 2189,
					src: "597:70:8",
					stateMutability: "nonpayable",
					superFunction: null,
					visibility: "external"
				},
				{
					body: null,
					documentation: null,
					id: 2019,
					implemented: false,
					kind: "function",
					modifiers: [
					],
					name: "transfer",
					nodeType: "FunctionDefinition",
					parameters: {
						id: 2015,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 2012,
								name: "to",
								nodeType: "VariableDeclaration",
								scope: 2019,
								src: "690:10:8",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_address",
									typeString: "address"
								},
								typeName: {
									id: 2011,
									name: "address",
									nodeType: "ElementaryTypeName",
									src: "690:7:8",
									stateMutability: "nonpayable",
									typeDescriptions: {
										typeIdentifier: "t_address",
										typeString: "address"
									}
								},
								value: null,
								visibility: "internal"
							},
							{
								constant: false,
								id: 2014,
								name: "value",
								nodeType: "VariableDeclaration",
								scope: 2019,
								src: "702:10:8",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_uint256",
									typeString: "uint256"
								},
								typeName: {
									id: 2013,
									name: "uint",
									nodeType: "ElementaryTypeName",
									src: "702:4:8",
									typeDescriptions: {
										typeIdentifier: "t_uint256",
										typeString: "uint256"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "689:24:8"
					},
					returnParameters: {
						id: 2018,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 2017,
								name: "",
								nodeType: "VariableDeclaration",
								scope: 2019,
								src: "732:4:8",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_bool",
									typeString: "bool"
								},
								typeName: {
									id: 2016,
									name: "bool",
									nodeType: "ElementaryTypeName",
									src: "732:4:8",
									typeDescriptions: {
										typeIdentifier: "t_bool",
										typeString: "bool"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "731:6:8"
					},
					scope: 2189,
					src: "672:66:8",
					stateMutability: "nonpayable",
					superFunction: null,
					visibility: "external"
				},
				{
					body: null,
					documentation: null,
					id: 2030,
					implemented: false,
					kind: "function",
					modifiers: [
					],
					name: "transferFrom",
					nodeType: "FunctionDefinition",
					parameters: {
						id: 2026,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 2021,
								name: "from",
								nodeType: "VariableDeclaration",
								scope: 2030,
								src: "765:12:8",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_address",
									typeString: "address"
								},
								typeName: {
									id: 2020,
									name: "address",
									nodeType: "ElementaryTypeName",
									src: "765:7:8",
									stateMutability: "nonpayable",
									typeDescriptions: {
										typeIdentifier: "t_address",
										typeString: "address"
									}
								},
								value: null,
								visibility: "internal"
							},
							{
								constant: false,
								id: 2023,
								name: "to",
								nodeType: "VariableDeclaration",
								scope: 2030,
								src: "779:10:8",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_address",
									typeString: "address"
								},
								typeName: {
									id: 2022,
									name: "address",
									nodeType: "ElementaryTypeName",
									src: "779:7:8",
									stateMutability: "nonpayable",
									typeDescriptions: {
										typeIdentifier: "t_address",
										typeString: "address"
									}
								},
								value: null,
								visibility: "internal"
							},
							{
								constant: false,
								id: 2025,
								name: "value",
								nodeType: "VariableDeclaration",
								scope: 2030,
								src: "791:10:8",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_uint256",
									typeString: "uint256"
								},
								typeName: {
									id: 2024,
									name: "uint",
									nodeType: "ElementaryTypeName",
									src: "791:4:8",
									typeDescriptions: {
										typeIdentifier: "t_uint256",
										typeString: "uint256"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "764:38:8"
					},
					returnParameters: {
						id: 2029,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 2028,
								name: "",
								nodeType: "VariableDeclaration",
								scope: 2030,
								src: "821:4:8",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_bool",
									typeString: "bool"
								},
								typeName: {
									id: 2027,
									name: "bool",
									nodeType: "ElementaryTypeName",
									src: "821:4:8",
									typeDescriptions: {
										typeIdentifier: "t_bool",
										typeString: "bool"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "820:6:8"
					},
					scope: 2189,
					src: "743:84:8",
					stateMutability: "nonpayable",
					superFunction: null,
					visibility: "external"
				},
				{
					body: null,
					documentation: null,
					id: 2035,
					implemented: false,
					kind: "function",
					modifiers: [
					],
					name: "DOMAIN_SEPARATOR",
					nodeType: "FunctionDefinition",
					parameters: {
						id: 2031,
						nodeType: "ParameterList",
						parameters: [
						],
						src: "858:2:8"
					},
					returnParameters: {
						id: 2034,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 2033,
								name: "",
								nodeType: "VariableDeclaration",
								scope: 2035,
								src: "884:7:8",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_bytes32",
									typeString: "bytes32"
								},
								typeName: {
									id: 2032,
									name: "bytes32",
									nodeType: "ElementaryTypeName",
									src: "884:7:8",
									typeDescriptions: {
										typeIdentifier: "t_bytes32",
										typeString: "bytes32"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "883:9:8"
					},
					scope: 2189,
					src: "833:60:8",
					stateMutability: "view",
					superFunction: null,
					visibility: "external"
				},
				{
					body: null,
					documentation: null,
					id: 2040,
					implemented: false,
					kind: "function",
					modifiers: [
					],
					name: "PERMIT_TYPEHASH",
					nodeType: "FunctionDefinition",
					parameters: {
						id: 2036,
						nodeType: "ParameterList",
						parameters: [
						],
						src: "922:2:8"
					},
					returnParameters: {
						id: 2039,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 2038,
								name: "",
								nodeType: "VariableDeclaration",
								scope: 2040,
								src: "948:7:8",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_bytes32",
									typeString: "bytes32"
								},
								typeName: {
									id: 2037,
									name: "bytes32",
									nodeType: "ElementaryTypeName",
									src: "948:7:8",
									typeDescriptions: {
										typeIdentifier: "t_bytes32",
										typeString: "bytes32"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "947:9:8"
					},
					scope: 2189,
					src: "898:59:8",
					stateMutability: "pure",
					superFunction: null,
					visibility: "external"
				},
				{
					body: null,
					documentation: null,
					id: 2047,
					implemented: false,
					kind: "function",
					modifiers: [
					],
					name: "nonces",
					nodeType: "FunctionDefinition",
					parameters: {
						id: 2043,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 2042,
								name: "owner",
								nodeType: "VariableDeclaration",
								scope: 2047,
								src: "978:13:8",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_address",
									typeString: "address"
								},
								typeName: {
									id: 2041,
									name: "address",
									nodeType: "ElementaryTypeName",
									src: "978:7:8",
									stateMutability: "nonpayable",
									typeDescriptions: {
										typeIdentifier: "t_address",
										typeString: "address"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "977:15:8"
					},
					returnParameters: {
						id: 2046,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 2045,
								name: "",
								nodeType: "VariableDeclaration",
								scope: 2047,
								src: "1016:4:8",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_uint256",
									typeString: "uint256"
								},
								typeName: {
									id: 2044,
									name: "uint",
									nodeType: "ElementaryTypeName",
									src: "1016:4:8",
									typeDescriptions: {
										typeIdentifier: "t_uint256",
										typeString: "uint256"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "1015:6:8"
					},
					scope: 2189,
					src: "962:60:8",
					stateMutability: "view",
					superFunction: null,
					visibility: "external"
				},
				{
					body: null,
					documentation: null,
					id: 2064,
					implemented: false,
					kind: "function",
					modifiers: [
					],
					name: "permit",
					nodeType: "FunctionDefinition",
					parameters: {
						id: 2062,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 2049,
								name: "owner",
								nodeType: "VariableDeclaration",
								scope: 2064,
								src: "1044:13:8",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_address",
									typeString: "address"
								},
								typeName: {
									id: 2048,
									name: "address",
									nodeType: "ElementaryTypeName",
									src: "1044:7:8",
									stateMutability: "nonpayable",
									typeDescriptions: {
										typeIdentifier: "t_address",
										typeString: "address"
									}
								},
								value: null,
								visibility: "internal"
							},
							{
								constant: false,
								id: 2051,
								name: "spender",
								nodeType: "VariableDeclaration",
								scope: 2064,
								src: "1059:15:8",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_address",
									typeString: "address"
								},
								typeName: {
									id: 2050,
									name: "address",
									nodeType: "ElementaryTypeName",
									src: "1059:7:8",
									stateMutability: "nonpayable",
									typeDescriptions: {
										typeIdentifier: "t_address",
										typeString: "address"
									}
								},
								value: null,
								visibility: "internal"
							},
							{
								constant: false,
								id: 2053,
								name: "value",
								nodeType: "VariableDeclaration",
								scope: 2064,
								src: "1076:10:8",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_uint256",
									typeString: "uint256"
								},
								typeName: {
									id: 2052,
									name: "uint",
									nodeType: "ElementaryTypeName",
									src: "1076:4:8",
									typeDescriptions: {
										typeIdentifier: "t_uint256",
										typeString: "uint256"
									}
								},
								value: null,
								visibility: "internal"
							},
							{
								constant: false,
								id: 2055,
								name: "deadline",
								nodeType: "VariableDeclaration",
								scope: 2064,
								src: "1088:13:8",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_uint256",
									typeString: "uint256"
								},
								typeName: {
									id: 2054,
									name: "uint",
									nodeType: "ElementaryTypeName",
									src: "1088:4:8",
									typeDescriptions: {
										typeIdentifier: "t_uint256",
										typeString: "uint256"
									}
								},
								value: null,
								visibility: "internal"
							},
							{
								constant: false,
								id: 2057,
								name: "v",
								nodeType: "VariableDeclaration",
								scope: 2064,
								src: "1103:7:8",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_uint8",
									typeString: "uint8"
								},
								typeName: {
									id: 2056,
									name: "uint8",
									nodeType: "ElementaryTypeName",
									src: "1103:5:8",
									typeDescriptions: {
										typeIdentifier: "t_uint8",
										typeString: "uint8"
									}
								},
								value: null,
								visibility: "internal"
							},
							{
								constant: false,
								id: 2059,
								name: "r",
								nodeType: "VariableDeclaration",
								scope: 2064,
								src: "1112:9:8",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_bytes32",
									typeString: "bytes32"
								},
								typeName: {
									id: 2058,
									name: "bytes32",
									nodeType: "ElementaryTypeName",
									src: "1112:7:8",
									typeDescriptions: {
										typeIdentifier: "t_bytes32",
										typeString: "bytes32"
									}
								},
								value: null,
								visibility: "internal"
							},
							{
								constant: false,
								id: 2061,
								name: "s",
								nodeType: "VariableDeclaration",
								scope: 2064,
								src: "1123:9:8",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_bytes32",
									typeString: "bytes32"
								},
								typeName: {
									id: 2060,
									name: "bytes32",
									nodeType: "ElementaryTypeName",
									src: "1123:7:8",
									typeDescriptions: {
										typeIdentifier: "t_bytes32",
										typeString: "bytes32"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "1043:90:8"
					},
					returnParameters: {
						id: 2063,
						nodeType: "ParameterList",
						parameters: [
						],
						src: "1142:0:8"
					},
					scope: 2189,
					src: "1028:115:8",
					stateMutability: "nonpayable",
					superFunction: null,
					visibility: "external"
				},
				{
					anonymous: false,
					documentation: null,
					id: 2072,
					name: "Mint",
					nodeType: "EventDefinition",
					parameters: {
						id: 2071,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 2066,
								indexed: true,
								name: "sender",
								nodeType: "VariableDeclaration",
								scope: 2072,
								src: "1160:22:8",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_address",
									typeString: "address"
								},
								typeName: {
									id: 2065,
									name: "address",
									nodeType: "ElementaryTypeName",
									src: "1160:7:8",
									stateMutability: "nonpayable",
									typeDescriptions: {
										typeIdentifier: "t_address",
										typeString: "address"
									}
								},
								value: null,
								visibility: "internal"
							},
							{
								constant: false,
								id: 2068,
								indexed: false,
								name: "amount0",
								nodeType: "VariableDeclaration",
								scope: 2072,
								src: "1184:12:8",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_uint256",
									typeString: "uint256"
								},
								typeName: {
									id: 2067,
									name: "uint",
									nodeType: "ElementaryTypeName",
									src: "1184:4:8",
									typeDescriptions: {
										typeIdentifier: "t_uint256",
										typeString: "uint256"
									}
								},
								value: null,
								visibility: "internal"
							},
							{
								constant: false,
								id: 2070,
								indexed: false,
								name: "amount1",
								nodeType: "VariableDeclaration",
								scope: 2072,
								src: "1198:12:8",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_uint256",
									typeString: "uint256"
								},
								typeName: {
									id: 2069,
									name: "uint",
									nodeType: "ElementaryTypeName",
									src: "1198:4:8",
									typeDescriptions: {
										typeIdentifier: "t_uint256",
										typeString: "uint256"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "1159:52:8"
					},
					src: "1149:63:8"
				},
				{
					anonymous: false,
					documentation: null,
					id: 2082,
					name: "Burn",
					nodeType: "EventDefinition",
					parameters: {
						id: 2081,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 2074,
								indexed: true,
								name: "sender",
								nodeType: "VariableDeclaration",
								scope: 2082,
								src: "1228:22:8",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_address",
									typeString: "address"
								},
								typeName: {
									id: 2073,
									name: "address",
									nodeType: "ElementaryTypeName",
									src: "1228:7:8",
									stateMutability: "nonpayable",
									typeDescriptions: {
										typeIdentifier: "t_address",
										typeString: "address"
									}
								},
								value: null,
								visibility: "internal"
							},
							{
								constant: false,
								id: 2076,
								indexed: false,
								name: "amount0",
								nodeType: "VariableDeclaration",
								scope: 2082,
								src: "1252:12:8",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_uint256",
									typeString: "uint256"
								},
								typeName: {
									id: 2075,
									name: "uint",
									nodeType: "ElementaryTypeName",
									src: "1252:4:8",
									typeDescriptions: {
										typeIdentifier: "t_uint256",
										typeString: "uint256"
									}
								},
								value: null,
								visibility: "internal"
							},
							{
								constant: false,
								id: 2078,
								indexed: false,
								name: "amount1",
								nodeType: "VariableDeclaration",
								scope: 2082,
								src: "1266:12:8",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_uint256",
									typeString: "uint256"
								},
								typeName: {
									id: 2077,
									name: "uint",
									nodeType: "ElementaryTypeName",
									src: "1266:4:8",
									typeDescriptions: {
										typeIdentifier: "t_uint256",
										typeString: "uint256"
									}
								},
								value: null,
								visibility: "internal"
							},
							{
								constant: false,
								id: 2080,
								indexed: true,
								name: "to",
								nodeType: "VariableDeclaration",
								scope: 2082,
								src: "1280:18:8",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_address",
									typeString: "address"
								},
								typeName: {
									id: 2079,
									name: "address",
									nodeType: "ElementaryTypeName",
									src: "1280:7:8",
									stateMutability: "nonpayable",
									typeDescriptions: {
										typeIdentifier: "t_address",
										typeString: "address"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "1227:72:8"
					},
					src: "1217:83:8"
				},
				{
					anonymous: false,
					documentation: null,
					id: 2096,
					name: "Swap",
					nodeType: "EventDefinition",
					parameters: {
						id: 2095,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 2084,
								indexed: true,
								name: "sender",
								nodeType: "VariableDeclaration",
								scope: 2096,
								src: "1325:22:8",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_address",
									typeString: "address"
								},
								typeName: {
									id: 2083,
									name: "address",
									nodeType: "ElementaryTypeName",
									src: "1325:7:8",
									stateMutability: "nonpayable",
									typeDescriptions: {
										typeIdentifier: "t_address",
										typeString: "address"
									}
								},
								value: null,
								visibility: "internal"
							},
							{
								constant: false,
								id: 2086,
								indexed: false,
								name: "amount0In",
								nodeType: "VariableDeclaration",
								scope: 2096,
								src: "1357:14:8",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_uint256",
									typeString: "uint256"
								},
								typeName: {
									id: 2085,
									name: "uint",
									nodeType: "ElementaryTypeName",
									src: "1357:4:8",
									typeDescriptions: {
										typeIdentifier: "t_uint256",
										typeString: "uint256"
									}
								},
								value: null,
								visibility: "internal"
							},
							{
								constant: false,
								id: 2088,
								indexed: false,
								name: "amount1In",
								nodeType: "VariableDeclaration",
								scope: 2096,
								src: "1381:14:8",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_uint256",
									typeString: "uint256"
								},
								typeName: {
									id: 2087,
									name: "uint",
									nodeType: "ElementaryTypeName",
									src: "1381:4:8",
									typeDescriptions: {
										typeIdentifier: "t_uint256",
										typeString: "uint256"
									}
								},
								value: null,
								visibility: "internal"
							},
							{
								constant: false,
								id: 2090,
								indexed: false,
								name: "amount0Out",
								nodeType: "VariableDeclaration",
								scope: 2096,
								src: "1405:15:8",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_uint256",
									typeString: "uint256"
								},
								typeName: {
									id: 2089,
									name: "uint",
									nodeType: "ElementaryTypeName",
									src: "1405:4:8",
									typeDescriptions: {
										typeIdentifier: "t_uint256",
										typeString: "uint256"
									}
								},
								value: null,
								visibility: "internal"
							},
							{
								constant: false,
								id: 2092,
								indexed: false,
								name: "amount1Out",
								nodeType: "VariableDeclaration",
								scope: 2096,
								src: "1430:15:8",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_uint256",
									typeString: "uint256"
								},
								typeName: {
									id: 2091,
									name: "uint",
									nodeType: "ElementaryTypeName",
									src: "1430:4:8",
									typeDescriptions: {
										typeIdentifier: "t_uint256",
										typeString: "uint256"
									}
								},
								value: null,
								visibility: "internal"
							},
							{
								constant: false,
								id: 2094,
								indexed: true,
								name: "to",
								nodeType: "VariableDeclaration",
								scope: 2096,
								src: "1455:18:8",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_address",
									typeString: "address"
								},
								typeName: {
									id: 2093,
									name: "address",
									nodeType: "ElementaryTypeName",
									src: "1455:7:8",
									stateMutability: "nonpayable",
									typeDescriptions: {
										typeIdentifier: "t_address",
										typeString: "address"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "1315:164:8"
					},
					src: "1305:175:8"
				},
				{
					anonymous: false,
					documentation: null,
					id: 2102,
					name: "Sync",
					nodeType: "EventDefinition",
					parameters: {
						id: 2101,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 2098,
								indexed: false,
								name: "reserve0",
								nodeType: "VariableDeclaration",
								scope: 2102,
								src: "1496:16:8",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_uint112",
									typeString: "uint112"
								},
								typeName: {
									id: 2097,
									name: "uint112",
									nodeType: "ElementaryTypeName",
									src: "1496:7:8",
									typeDescriptions: {
										typeIdentifier: "t_uint112",
										typeString: "uint112"
									}
								},
								value: null,
								visibility: "internal"
							},
							{
								constant: false,
								id: 2100,
								indexed: false,
								name: "reserve1",
								nodeType: "VariableDeclaration",
								scope: 2102,
								src: "1514:16:8",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_uint112",
									typeString: "uint112"
								},
								typeName: {
									id: 2099,
									name: "uint112",
									nodeType: "ElementaryTypeName",
									src: "1514:7:8",
									typeDescriptions: {
										typeIdentifier: "t_uint112",
										typeString: "uint112"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "1495:36:8"
					},
					src: "1485:47:8"
				},
				{
					body: null,
					documentation: null,
					id: 2107,
					implemented: false,
					kind: "function",
					modifiers: [
					],
					name: "MINIMUM_LIQUIDITY",
					nodeType: "FunctionDefinition",
					parameters: {
						id: 2103,
						nodeType: "ParameterList",
						parameters: [
						],
						src: "1564:2:8"
					},
					returnParameters: {
						id: 2106,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 2105,
								name: "",
								nodeType: "VariableDeclaration",
								scope: 2107,
								src: "1590:4:8",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_uint256",
									typeString: "uint256"
								},
								typeName: {
									id: 2104,
									name: "uint",
									nodeType: "ElementaryTypeName",
									src: "1590:4:8",
									typeDescriptions: {
										typeIdentifier: "t_uint256",
										typeString: "uint256"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "1589:6:8"
					},
					scope: 2189,
					src: "1538:58:8",
					stateMutability: "pure",
					superFunction: null,
					visibility: "external"
				},
				{
					body: null,
					documentation: null,
					id: 2112,
					implemented: false,
					kind: "function",
					modifiers: [
					],
					name: "factory",
					nodeType: "FunctionDefinition",
					parameters: {
						id: 2108,
						nodeType: "ParameterList",
						parameters: [
						],
						src: "1617:2:8"
					},
					returnParameters: {
						id: 2111,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 2110,
								name: "",
								nodeType: "VariableDeclaration",
								scope: 2112,
								src: "1643:7:8",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_address",
									typeString: "address"
								},
								typeName: {
									id: 2109,
									name: "address",
									nodeType: "ElementaryTypeName",
									src: "1643:7:8",
									stateMutability: "nonpayable",
									typeDescriptions: {
										typeIdentifier: "t_address",
										typeString: "address"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "1642:9:8"
					},
					scope: 2189,
					src: "1601:51:8",
					stateMutability: "view",
					superFunction: null,
					visibility: "external"
				},
				{
					body: null,
					documentation: null,
					id: 2117,
					implemented: false,
					kind: "function",
					modifiers: [
					],
					name: "token0",
					nodeType: "FunctionDefinition",
					parameters: {
						id: 2113,
						nodeType: "ParameterList",
						parameters: [
						],
						src: "1672:2:8"
					},
					returnParameters: {
						id: 2116,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 2115,
								name: "",
								nodeType: "VariableDeclaration",
								scope: 2117,
								src: "1698:7:8",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_address",
									typeString: "address"
								},
								typeName: {
									id: 2114,
									name: "address",
									nodeType: "ElementaryTypeName",
									src: "1698:7:8",
									stateMutability: "nonpayable",
									typeDescriptions: {
										typeIdentifier: "t_address",
										typeString: "address"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "1697:9:8"
					},
					scope: 2189,
					src: "1657:50:8",
					stateMutability: "view",
					superFunction: null,
					visibility: "external"
				},
				{
					body: null,
					documentation: null,
					id: 2122,
					implemented: false,
					kind: "function",
					modifiers: [
					],
					name: "token1",
					nodeType: "FunctionDefinition",
					parameters: {
						id: 2118,
						nodeType: "ParameterList",
						parameters: [
						],
						src: "1727:2:8"
					},
					returnParameters: {
						id: 2121,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 2120,
								name: "",
								nodeType: "VariableDeclaration",
								scope: 2122,
								src: "1753:7:8",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_address",
									typeString: "address"
								},
								typeName: {
									id: 2119,
									name: "address",
									nodeType: "ElementaryTypeName",
									src: "1753:7:8",
									stateMutability: "nonpayable",
									typeDescriptions: {
										typeIdentifier: "t_address",
										typeString: "address"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "1752:9:8"
					},
					scope: 2189,
					src: "1712:50:8",
					stateMutability: "view",
					superFunction: null,
					visibility: "external"
				},
				{
					body: null,
					documentation: null,
					id: 2131,
					implemented: false,
					kind: "function",
					modifiers: [
					],
					name: "getReserves",
					nodeType: "FunctionDefinition",
					parameters: {
						id: 2123,
						nodeType: "ParameterList",
						parameters: [
						],
						src: "1787:2:8"
					},
					returnParameters: {
						id: 2130,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 2125,
								name: "reserve0",
								nodeType: "VariableDeclaration",
								scope: 2131,
								src: "1813:16:8",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_uint112",
									typeString: "uint112"
								},
								typeName: {
									id: 2124,
									name: "uint112",
									nodeType: "ElementaryTypeName",
									src: "1813:7:8",
									typeDescriptions: {
										typeIdentifier: "t_uint112",
										typeString: "uint112"
									}
								},
								value: null,
								visibility: "internal"
							},
							{
								constant: false,
								id: 2127,
								name: "reserve1",
								nodeType: "VariableDeclaration",
								scope: 2131,
								src: "1831:16:8",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_uint112",
									typeString: "uint112"
								},
								typeName: {
									id: 2126,
									name: "uint112",
									nodeType: "ElementaryTypeName",
									src: "1831:7:8",
									typeDescriptions: {
										typeIdentifier: "t_uint112",
										typeString: "uint112"
									}
								},
								value: null,
								visibility: "internal"
							},
							{
								constant: false,
								id: 2129,
								name: "blockTimestampLast",
								nodeType: "VariableDeclaration",
								scope: 2131,
								src: "1849:25:8",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_uint32",
									typeString: "uint32"
								},
								typeName: {
									id: 2128,
									name: "uint32",
									nodeType: "ElementaryTypeName",
									src: "1849:6:8",
									typeDescriptions: {
										typeIdentifier: "t_uint32",
										typeString: "uint32"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "1812:63:8"
					},
					scope: 2189,
					src: "1767:109:8",
					stateMutability: "view",
					superFunction: null,
					visibility: "external"
				},
				{
					body: null,
					documentation: null,
					id: 2136,
					implemented: false,
					kind: "function",
					modifiers: [
					],
					name: "price0CumulativeLast",
					nodeType: "FunctionDefinition",
					parameters: {
						id: 2132,
						nodeType: "ParameterList",
						parameters: [
						],
						src: "1910:2:8"
					},
					returnParameters: {
						id: 2135,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 2134,
								name: "",
								nodeType: "VariableDeclaration",
								scope: 2136,
								src: "1936:4:8",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_uint256",
									typeString: "uint256"
								},
								typeName: {
									id: 2133,
									name: "uint",
									nodeType: "ElementaryTypeName",
									src: "1936:4:8",
									typeDescriptions: {
										typeIdentifier: "t_uint256",
										typeString: "uint256"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "1935:6:8"
					},
					scope: 2189,
					src: "1881:61:8",
					stateMutability: "view",
					superFunction: null,
					visibility: "external"
				},
				{
					body: null,
					documentation: null,
					id: 2141,
					implemented: false,
					kind: "function",
					modifiers: [
					],
					name: "price1CumulativeLast",
					nodeType: "FunctionDefinition",
					parameters: {
						id: 2137,
						nodeType: "ParameterList",
						parameters: [
						],
						src: "1976:2:8"
					},
					returnParameters: {
						id: 2140,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 2139,
								name: "",
								nodeType: "VariableDeclaration",
								scope: 2141,
								src: "2002:4:8",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_uint256",
									typeString: "uint256"
								},
								typeName: {
									id: 2138,
									name: "uint",
									nodeType: "ElementaryTypeName",
									src: "2002:4:8",
									typeDescriptions: {
										typeIdentifier: "t_uint256",
										typeString: "uint256"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "2001:6:8"
					},
					scope: 2189,
					src: "1947:61:8",
					stateMutability: "view",
					superFunction: null,
					visibility: "external"
				},
				{
					body: null,
					documentation: null,
					id: 2146,
					implemented: false,
					kind: "function",
					modifiers: [
					],
					name: "kLast",
					nodeType: "FunctionDefinition",
					parameters: {
						id: 2142,
						nodeType: "ParameterList",
						parameters: [
						],
						src: "2027:2:8"
					},
					returnParameters: {
						id: 2145,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 2144,
								name: "",
								nodeType: "VariableDeclaration",
								scope: 2146,
								src: "2053:4:8",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_uint256",
									typeString: "uint256"
								},
								typeName: {
									id: 2143,
									name: "uint",
									nodeType: "ElementaryTypeName",
									src: "2053:4:8",
									typeDescriptions: {
										typeIdentifier: "t_uint256",
										typeString: "uint256"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "2052:6:8"
					},
					scope: 2189,
					src: "2013:46:8",
					stateMutability: "view",
					superFunction: null,
					visibility: "external"
				},
				{
					body: null,
					documentation: null,
					id: 2153,
					implemented: false,
					kind: "function",
					modifiers: [
					],
					name: "mint",
					nodeType: "FunctionDefinition",
					parameters: {
						id: 2149,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 2148,
								name: "to",
								nodeType: "VariableDeclaration",
								scope: 2153,
								src: "2079:10:8",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_address",
									typeString: "address"
								},
								typeName: {
									id: 2147,
									name: "address",
									nodeType: "ElementaryTypeName",
									src: "2079:7:8",
									stateMutability: "nonpayable",
									typeDescriptions: {
										typeIdentifier: "t_address",
										typeString: "address"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "2078:12:8"
					},
					returnParameters: {
						id: 2152,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 2151,
								name: "liquidity",
								nodeType: "VariableDeclaration",
								scope: 2153,
								src: "2109:14:8",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_uint256",
									typeString: "uint256"
								},
								typeName: {
									id: 2150,
									name: "uint",
									nodeType: "ElementaryTypeName",
									src: "2109:4:8",
									typeDescriptions: {
										typeIdentifier: "t_uint256",
										typeString: "uint256"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "2108:16:8"
					},
					scope: 2189,
					src: "2065:60:8",
					stateMutability: "nonpayable",
					superFunction: null,
					visibility: "external"
				},
				{
					body: null,
					documentation: null,
					id: 2162,
					implemented: false,
					kind: "function",
					modifiers: [
					],
					name: "burn",
					nodeType: "FunctionDefinition",
					parameters: {
						id: 2156,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 2155,
								name: "to",
								nodeType: "VariableDeclaration",
								scope: 2162,
								src: "2144:10:8",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_address",
									typeString: "address"
								},
								typeName: {
									id: 2154,
									name: "address",
									nodeType: "ElementaryTypeName",
									src: "2144:7:8",
									stateMutability: "nonpayable",
									typeDescriptions: {
										typeIdentifier: "t_address",
										typeString: "address"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "2143:12:8"
					},
					returnParameters: {
						id: 2161,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 2158,
								name: "amount0",
								nodeType: "VariableDeclaration",
								scope: 2162,
								src: "2174:12:8",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_uint256",
									typeString: "uint256"
								},
								typeName: {
									id: 2157,
									name: "uint",
									nodeType: "ElementaryTypeName",
									src: "2174:4:8",
									typeDescriptions: {
										typeIdentifier: "t_uint256",
										typeString: "uint256"
									}
								},
								value: null,
								visibility: "internal"
							},
							{
								constant: false,
								id: 2160,
								name: "amount1",
								nodeType: "VariableDeclaration",
								scope: 2162,
								src: "2188:12:8",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_uint256",
									typeString: "uint256"
								},
								typeName: {
									id: 2159,
									name: "uint",
									nodeType: "ElementaryTypeName",
									src: "2188:4:8",
									typeDescriptions: {
										typeIdentifier: "t_uint256",
										typeString: "uint256"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "2173:28:8"
					},
					scope: 2189,
					src: "2130:72:8",
					stateMutability: "nonpayable",
					superFunction: null,
					visibility: "external"
				},
				{
					body: null,
					documentation: null,
					id: 2173,
					implemented: false,
					kind: "function",
					modifiers: [
					],
					name: "swap",
					nodeType: "FunctionDefinition",
					parameters: {
						id: 2171,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 2164,
								name: "amount0Out",
								nodeType: "VariableDeclaration",
								scope: 2173,
								src: "2221:15:8",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_uint256",
									typeString: "uint256"
								},
								typeName: {
									id: 2163,
									name: "uint",
									nodeType: "ElementaryTypeName",
									src: "2221:4:8",
									typeDescriptions: {
										typeIdentifier: "t_uint256",
										typeString: "uint256"
									}
								},
								value: null,
								visibility: "internal"
							},
							{
								constant: false,
								id: 2166,
								name: "amount1Out",
								nodeType: "VariableDeclaration",
								scope: 2173,
								src: "2238:15:8",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_uint256",
									typeString: "uint256"
								},
								typeName: {
									id: 2165,
									name: "uint",
									nodeType: "ElementaryTypeName",
									src: "2238:4:8",
									typeDescriptions: {
										typeIdentifier: "t_uint256",
										typeString: "uint256"
									}
								},
								value: null,
								visibility: "internal"
							},
							{
								constant: false,
								id: 2168,
								name: "to",
								nodeType: "VariableDeclaration",
								scope: 2173,
								src: "2255:10:8",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_address",
									typeString: "address"
								},
								typeName: {
									id: 2167,
									name: "address",
									nodeType: "ElementaryTypeName",
									src: "2255:7:8",
									stateMutability: "nonpayable",
									typeDescriptions: {
										typeIdentifier: "t_address",
										typeString: "address"
									}
								},
								value: null,
								visibility: "internal"
							},
							{
								constant: false,
								id: 2170,
								name: "data",
								nodeType: "VariableDeclaration",
								scope: 2173,
								src: "2267:19:8",
								stateVariable: false,
								storageLocation: "calldata",
								typeDescriptions: {
									typeIdentifier: "t_bytes_calldata_ptr",
									typeString: "bytes"
								},
								typeName: {
									id: 2169,
									name: "bytes",
									nodeType: "ElementaryTypeName",
									src: "2267:5:8",
									typeDescriptions: {
										typeIdentifier: "t_bytes_storage_ptr",
										typeString: "bytes"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "2220:67:8"
					},
					returnParameters: {
						id: 2172,
						nodeType: "ParameterList",
						parameters: [
						],
						src: "2296:0:8"
					},
					scope: 2189,
					src: "2207:90:8",
					stateMutability: "nonpayable",
					superFunction: null,
					visibility: "external"
				},
				{
					body: null,
					documentation: null,
					id: 2178,
					implemented: false,
					kind: "function",
					modifiers: [
					],
					name: "skim",
					nodeType: "FunctionDefinition",
					parameters: {
						id: 2176,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 2175,
								name: "to",
								nodeType: "VariableDeclaration",
								scope: 2178,
								src: "2316:10:8",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_address",
									typeString: "address"
								},
								typeName: {
									id: 2174,
									name: "address",
									nodeType: "ElementaryTypeName",
									src: "2316:7:8",
									stateMutability: "nonpayable",
									typeDescriptions: {
										typeIdentifier: "t_address",
										typeString: "address"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "2315:12:8"
					},
					returnParameters: {
						id: 2177,
						nodeType: "ParameterList",
						parameters: [
						],
						src: "2336:0:8"
					},
					scope: 2189,
					src: "2302:35:8",
					stateMutability: "nonpayable",
					superFunction: null,
					visibility: "external"
				},
				{
					body: null,
					documentation: null,
					id: 2181,
					implemented: false,
					kind: "function",
					modifiers: [
					],
					name: "sync",
					nodeType: "FunctionDefinition",
					parameters: {
						id: 2179,
						nodeType: "ParameterList",
						parameters: [
						],
						src: "2355:2:8"
					},
					returnParameters: {
						id: 2180,
						nodeType: "ParameterList",
						parameters: [
						],
						src: "2366:0:8"
					},
					scope: 2189,
					src: "2342:25:8",
					stateMutability: "nonpayable",
					superFunction: null,
					visibility: "external"
				},
				{
					body: null,
					documentation: null,
					id: 2188,
					implemented: false,
					kind: "function",
					modifiers: [
					],
					name: "initialize",
					nodeType: "FunctionDefinition",
					parameters: {
						id: 2186,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 2183,
								name: "",
								nodeType: "VariableDeclaration",
								scope: 2188,
								src: "2393:7:8",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_address",
									typeString: "address"
								},
								typeName: {
									id: 2182,
									name: "address",
									nodeType: "ElementaryTypeName",
									src: "2393:7:8",
									stateMutability: "nonpayable",
									typeDescriptions: {
										typeIdentifier: "t_address",
										typeString: "address"
									}
								},
								value: null,
								visibility: "internal"
							},
							{
								constant: false,
								id: 2185,
								name: "",
								nodeType: "VariableDeclaration",
								scope: 2188,
								src: "2402:7:8",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_address",
									typeString: "address"
								},
								typeName: {
									id: 2184,
									name: "address",
									nodeType: "ElementaryTypeName",
									src: "2402:7:8",
									stateMutability: "nonpayable",
									typeDescriptions: {
										typeIdentifier: "t_address",
										typeString: "address"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "2392:18:8"
					},
					returnParameters: {
						id: 2187,
						nodeType: "ParameterList",
						parameters: [
						],
						src: "2419:0:8"
					},
					scope: 2189,
					src: "2373:47:8",
					stateMutability: "nonpayable",
					superFunction: null,
					visibility: "external"
				}
			],
			scope: 2190,
			src: "26:2396:8"
		}
	],
	src: "0:2423:8"
};
var legacyAST = {
	attributes: {
		absolutePath: "project:/contracts/interfaces/ISafeswapPair.sol",
		exportedSymbols: {
			ISafeswapPair: [
				2189
			]
		}
	},
	children: [
		{
			attributes: {
				literals: [
					"solidity",
					">=",
					"0.5",
					".0"
				]
			},
			id: 1949,
			name: "PragmaDirective",
			src: "0:24:8"
		},
		{
			attributes: {
				baseContracts: [
					null
				],
				contractDependencies: [
					null
				],
				contractKind: "interface",
				documentation: null,
				fullyImplemented: false,
				linearizedBaseContracts: [
					2189
				],
				name: "ISafeswapPair",
				scope: 2190
			},
			children: [
				{
					attributes: {
						anonymous: false,
						documentation: null,
						name: "Approval"
					},
					children: [
						{
							children: [
								{
									attributes: {
										constant: false,
										indexed: true,
										name: "owner",
										scope: 1957,
										stateVariable: false,
										storageLocation: "default",
										type: "address",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "address",
												stateMutability: "nonpayable",
												type: "address"
											},
											id: 1950,
											name: "ElementaryTypeName",
											src: "71:7:8"
										}
									],
									id: 1951,
									name: "VariableDeclaration",
									src: "71:21:8"
								},
								{
									attributes: {
										constant: false,
										indexed: true,
										name: "spender",
										scope: 1957,
										stateVariable: false,
										storageLocation: "default",
										type: "address",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "address",
												stateMutability: "nonpayable",
												type: "address"
											},
											id: 1952,
											name: "ElementaryTypeName",
											src: "94:7:8"
										}
									],
									id: 1953,
									name: "VariableDeclaration",
									src: "94:23:8"
								},
								{
									attributes: {
										constant: false,
										indexed: false,
										name: "value",
										scope: 1957,
										stateVariable: false,
										storageLocation: "default",
										type: "uint256",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "uint",
												type: "uint256"
											},
											id: 1954,
											name: "ElementaryTypeName",
											src: "119:4:8"
										}
									],
									id: 1955,
									name: "VariableDeclaration",
									src: "119:10:8"
								}
							],
							id: 1956,
							name: "ParameterList",
							src: "70:60:8"
						}
					],
					id: 1957,
					name: "EventDefinition",
					src: "56:75:8"
				},
				{
					attributes: {
						anonymous: false,
						documentation: null,
						name: "Transfer"
					},
					children: [
						{
							children: [
								{
									attributes: {
										constant: false,
										indexed: true,
										name: "from",
										scope: 1965,
										stateVariable: false,
										storageLocation: "default",
										type: "address",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "address",
												stateMutability: "nonpayable",
												type: "address"
											},
											id: 1958,
											name: "ElementaryTypeName",
											src: "151:7:8"
										}
									],
									id: 1959,
									name: "VariableDeclaration",
									src: "151:20:8"
								},
								{
									attributes: {
										constant: false,
										indexed: true,
										name: "to",
										scope: 1965,
										stateVariable: false,
										storageLocation: "default",
										type: "address",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "address",
												stateMutability: "nonpayable",
												type: "address"
											},
											id: 1960,
											name: "ElementaryTypeName",
											src: "173:7:8"
										}
									],
									id: 1961,
									name: "VariableDeclaration",
									src: "173:18:8"
								},
								{
									attributes: {
										constant: false,
										indexed: false,
										name: "value",
										scope: 1965,
										stateVariable: false,
										storageLocation: "default",
										type: "uint256",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "uint",
												type: "uint256"
											},
											id: 1962,
											name: "ElementaryTypeName",
											src: "193:4:8"
										}
									],
									id: 1963,
									name: "VariableDeclaration",
									src: "193:10:8"
								}
							],
							id: 1964,
							name: "ParameterList",
							src: "150:54:8"
						}
					],
					id: 1965,
					name: "EventDefinition",
					src: "136:69:8"
				},
				{
					attributes: {
						body: null,
						documentation: null,
						implemented: false,
						isConstructor: false,
						kind: "function",
						modifiers: [
							null
						],
						name: "name",
						scope: 2189,
						stateMutability: "pure",
						superFunction: null,
						visibility: "external"
					},
					children: [
						{
							attributes: {
								parameters: [
									null
								]
							},
							children: [
							],
							id: 1966,
							name: "ParameterList",
							src: "224:2:8"
						},
						{
							children: [
								{
									attributes: {
										constant: false,
										name: "",
										scope: 1970,
										stateVariable: false,
										storageLocation: "memory",
										type: "string",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "string",
												type: "string"
											},
											id: 1967,
											name: "ElementaryTypeName",
											src: "250:6:8"
										}
									],
									id: 1968,
									name: "VariableDeclaration",
									src: "250:13:8"
								}
							],
							id: 1969,
							name: "ParameterList",
							src: "249:15:8"
						}
					],
					id: 1970,
					name: "FunctionDefinition",
					src: "211:54:8"
				},
				{
					attributes: {
						body: null,
						documentation: null,
						implemented: false,
						isConstructor: false,
						kind: "function",
						modifiers: [
							null
						],
						name: "symbol",
						scope: 2189,
						stateMutability: "pure",
						superFunction: null,
						visibility: "external"
					},
					children: [
						{
							attributes: {
								parameters: [
									null
								]
							},
							children: [
							],
							id: 1971,
							name: "ParameterList",
							src: "285:2:8"
						},
						{
							children: [
								{
									attributes: {
										constant: false,
										name: "",
										scope: 1975,
										stateVariable: false,
										storageLocation: "memory",
										type: "string",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "string",
												type: "string"
											},
											id: 1972,
											name: "ElementaryTypeName",
											src: "311:6:8"
										}
									],
									id: 1973,
									name: "VariableDeclaration",
									src: "311:13:8"
								}
							],
							id: 1974,
							name: "ParameterList",
							src: "310:15:8"
						}
					],
					id: 1975,
					name: "FunctionDefinition",
					src: "270:56:8"
				},
				{
					attributes: {
						body: null,
						documentation: null,
						implemented: false,
						isConstructor: false,
						kind: "function",
						modifiers: [
							null
						],
						name: "decimals",
						scope: 2189,
						stateMutability: "pure",
						superFunction: null,
						visibility: "external"
					},
					children: [
						{
							attributes: {
								parameters: [
									null
								]
							},
							children: [
							],
							id: 1976,
							name: "ParameterList",
							src: "348:2:8"
						},
						{
							children: [
								{
									attributes: {
										constant: false,
										name: "",
										scope: 1980,
										stateVariable: false,
										storageLocation: "default",
										type: "uint8",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "uint8",
												type: "uint8"
											},
											id: 1977,
											name: "ElementaryTypeName",
											src: "374:5:8"
										}
									],
									id: 1978,
									name: "VariableDeclaration",
									src: "374:5:8"
								}
							],
							id: 1979,
							name: "ParameterList",
							src: "373:7:8"
						}
					],
					id: 1980,
					name: "FunctionDefinition",
					src: "331:50:8"
				},
				{
					attributes: {
						body: null,
						documentation: null,
						implemented: false,
						isConstructor: false,
						kind: "function",
						modifiers: [
							null
						],
						name: "totalSupply",
						scope: 2189,
						stateMutability: "view",
						superFunction: null,
						visibility: "external"
					},
					children: [
						{
							attributes: {
								parameters: [
									null
								]
							},
							children: [
							],
							id: 1981,
							name: "ParameterList",
							src: "406:2:8"
						},
						{
							children: [
								{
									attributes: {
										constant: false,
										name: "",
										scope: 1985,
										stateVariable: false,
										storageLocation: "default",
										type: "uint256",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "uint",
												type: "uint256"
											},
											id: 1982,
											name: "ElementaryTypeName",
											src: "432:4:8"
										}
									],
									id: 1983,
									name: "VariableDeclaration",
									src: "432:4:8"
								}
							],
							id: 1984,
							name: "ParameterList",
							src: "431:6:8"
						}
					],
					id: 1985,
					name: "FunctionDefinition",
					src: "386:52:8"
				},
				{
					attributes: {
						body: null,
						documentation: null,
						implemented: false,
						isConstructor: false,
						kind: "function",
						modifiers: [
							null
						],
						name: "balanceOf",
						scope: 2189,
						stateMutability: "view",
						superFunction: null,
						visibility: "external"
					},
					children: [
						{
							children: [
								{
									attributes: {
										constant: false,
										name: "owner",
										scope: 1992,
										stateVariable: false,
										storageLocation: "default",
										type: "address",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "address",
												stateMutability: "nonpayable",
												type: "address"
											},
											id: 1986,
											name: "ElementaryTypeName",
											src: "462:7:8"
										}
									],
									id: 1987,
									name: "VariableDeclaration",
									src: "462:13:8"
								}
							],
							id: 1988,
							name: "ParameterList",
							src: "461:15:8"
						},
						{
							children: [
								{
									attributes: {
										constant: false,
										name: "",
										scope: 1992,
										stateVariable: false,
										storageLocation: "default",
										type: "uint256",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "uint",
												type: "uint256"
											},
											id: 1989,
											name: "ElementaryTypeName",
											src: "500:4:8"
										}
									],
									id: 1990,
									name: "VariableDeclaration",
									src: "500:4:8"
								}
							],
							id: 1991,
							name: "ParameterList",
							src: "499:6:8"
						}
					],
					id: 1992,
					name: "FunctionDefinition",
					src: "443:63:8"
				},
				{
					attributes: {
						body: null,
						documentation: null,
						implemented: false,
						isConstructor: false,
						kind: "function",
						modifiers: [
							null
						],
						name: "allowance",
						scope: 2189,
						stateMutability: "view",
						superFunction: null,
						visibility: "external"
					},
					children: [
						{
							children: [
								{
									attributes: {
										constant: false,
										name: "owner",
										scope: 2001,
										stateVariable: false,
										storageLocation: "default",
										type: "address",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "address",
												stateMutability: "nonpayable",
												type: "address"
											},
											id: 1993,
											name: "ElementaryTypeName",
											src: "530:7:8"
										}
									],
									id: 1994,
									name: "VariableDeclaration",
									src: "530:13:8"
								},
								{
									attributes: {
										constant: false,
										name: "spender",
										scope: 2001,
										stateVariable: false,
										storageLocation: "default",
										type: "address",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "address",
												stateMutability: "nonpayable",
												type: "address"
											},
											id: 1995,
											name: "ElementaryTypeName",
											src: "545:7:8"
										}
									],
									id: 1996,
									name: "VariableDeclaration",
									src: "545:15:8"
								}
							],
							id: 1997,
							name: "ParameterList",
							src: "529:32:8"
						},
						{
							children: [
								{
									attributes: {
										constant: false,
										name: "",
										scope: 2001,
										stateVariable: false,
										storageLocation: "default",
										type: "uint256",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "uint",
												type: "uint256"
											},
											id: 1998,
											name: "ElementaryTypeName",
											src: "585:4:8"
										}
									],
									id: 1999,
									name: "VariableDeclaration",
									src: "585:4:8"
								}
							],
							id: 2000,
							name: "ParameterList",
							src: "584:6:8"
						}
					],
					id: 2001,
					name: "FunctionDefinition",
					src: "511:80:8"
				},
				{
					attributes: {
						body: null,
						documentation: null,
						implemented: false,
						isConstructor: false,
						kind: "function",
						modifiers: [
							null
						],
						name: "approve",
						scope: 2189,
						stateMutability: "nonpayable",
						superFunction: null,
						visibility: "external"
					},
					children: [
						{
							children: [
								{
									attributes: {
										constant: false,
										name: "spender",
										scope: 2010,
										stateVariable: false,
										storageLocation: "default",
										type: "address",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "address",
												stateMutability: "nonpayable",
												type: "address"
											},
											id: 2002,
											name: "ElementaryTypeName",
											src: "614:7:8"
										}
									],
									id: 2003,
									name: "VariableDeclaration",
									src: "614:15:8"
								},
								{
									attributes: {
										constant: false,
										name: "value",
										scope: 2010,
										stateVariable: false,
										storageLocation: "default",
										type: "uint256",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "uint",
												type: "uint256"
											},
											id: 2004,
											name: "ElementaryTypeName",
											src: "631:4:8"
										}
									],
									id: 2005,
									name: "VariableDeclaration",
									src: "631:10:8"
								}
							],
							id: 2006,
							name: "ParameterList",
							src: "613:29:8"
						},
						{
							children: [
								{
									attributes: {
										constant: false,
										name: "",
										scope: 2010,
										stateVariable: false,
										storageLocation: "default",
										type: "bool",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "bool",
												type: "bool"
											},
											id: 2007,
											name: "ElementaryTypeName",
											src: "661:4:8"
										}
									],
									id: 2008,
									name: "VariableDeclaration",
									src: "661:4:8"
								}
							],
							id: 2009,
							name: "ParameterList",
							src: "660:6:8"
						}
					],
					id: 2010,
					name: "FunctionDefinition",
					src: "597:70:8"
				},
				{
					attributes: {
						body: null,
						documentation: null,
						implemented: false,
						isConstructor: false,
						kind: "function",
						modifiers: [
							null
						],
						name: "transfer",
						scope: 2189,
						stateMutability: "nonpayable",
						superFunction: null,
						visibility: "external"
					},
					children: [
						{
							children: [
								{
									attributes: {
										constant: false,
										name: "to",
										scope: 2019,
										stateVariable: false,
										storageLocation: "default",
										type: "address",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "address",
												stateMutability: "nonpayable",
												type: "address"
											},
											id: 2011,
											name: "ElementaryTypeName",
											src: "690:7:8"
										}
									],
									id: 2012,
									name: "VariableDeclaration",
									src: "690:10:8"
								},
								{
									attributes: {
										constant: false,
										name: "value",
										scope: 2019,
										stateVariable: false,
										storageLocation: "default",
										type: "uint256",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "uint",
												type: "uint256"
											},
											id: 2013,
											name: "ElementaryTypeName",
											src: "702:4:8"
										}
									],
									id: 2014,
									name: "VariableDeclaration",
									src: "702:10:8"
								}
							],
							id: 2015,
							name: "ParameterList",
							src: "689:24:8"
						},
						{
							children: [
								{
									attributes: {
										constant: false,
										name: "",
										scope: 2019,
										stateVariable: false,
										storageLocation: "default",
										type: "bool",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "bool",
												type: "bool"
											},
											id: 2016,
											name: "ElementaryTypeName",
											src: "732:4:8"
										}
									],
									id: 2017,
									name: "VariableDeclaration",
									src: "732:4:8"
								}
							],
							id: 2018,
							name: "ParameterList",
							src: "731:6:8"
						}
					],
					id: 2019,
					name: "FunctionDefinition",
					src: "672:66:8"
				},
				{
					attributes: {
						body: null,
						documentation: null,
						implemented: false,
						isConstructor: false,
						kind: "function",
						modifiers: [
							null
						],
						name: "transferFrom",
						scope: 2189,
						stateMutability: "nonpayable",
						superFunction: null,
						visibility: "external"
					},
					children: [
						{
							children: [
								{
									attributes: {
										constant: false,
										name: "from",
										scope: 2030,
										stateVariable: false,
										storageLocation: "default",
										type: "address",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "address",
												stateMutability: "nonpayable",
												type: "address"
											},
											id: 2020,
											name: "ElementaryTypeName",
											src: "765:7:8"
										}
									],
									id: 2021,
									name: "VariableDeclaration",
									src: "765:12:8"
								},
								{
									attributes: {
										constant: false,
										name: "to",
										scope: 2030,
										stateVariable: false,
										storageLocation: "default",
										type: "address",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "address",
												stateMutability: "nonpayable",
												type: "address"
											},
											id: 2022,
											name: "ElementaryTypeName",
											src: "779:7:8"
										}
									],
									id: 2023,
									name: "VariableDeclaration",
									src: "779:10:8"
								},
								{
									attributes: {
										constant: false,
										name: "value",
										scope: 2030,
										stateVariable: false,
										storageLocation: "default",
										type: "uint256",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "uint",
												type: "uint256"
											},
											id: 2024,
											name: "ElementaryTypeName",
											src: "791:4:8"
										}
									],
									id: 2025,
									name: "VariableDeclaration",
									src: "791:10:8"
								}
							],
							id: 2026,
							name: "ParameterList",
							src: "764:38:8"
						},
						{
							children: [
								{
									attributes: {
										constant: false,
										name: "",
										scope: 2030,
										stateVariable: false,
										storageLocation: "default",
										type: "bool",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "bool",
												type: "bool"
											},
											id: 2027,
											name: "ElementaryTypeName",
											src: "821:4:8"
										}
									],
									id: 2028,
									name: "VariableDeclaration",
									src: "821:4:8"
								}
							],
							id: 2029,
							name: "ParameterList",
							src: "820:6:8"
						}
					],
					id: 2030,
					name: "FunctionDefinition",
					src: "743:84:8"
				},
				{
					attributes: {
						body: null,
						documentation: null,
						implemented: false,
						isConstructor: false,
						kind: "function",
						modifiers: [
							null
						],
						name: "DOMAIN_SEPARATOR",
						scope: 2189,
						stateMutability: "view",
						superFunction: null,
						visibility: "external"
					},
					children: [
						{
							attributes: {
								parameters: [
									null
								]
							},
							children: [
							],
							id: 2031,
							name: "ParameterList",
							src: "858:2:8"
						},
						{
							children: [
								{
									attributes: {
										constant: false,
										name: "",
										scope: 2035,
										stateVariable: false,
										storageLocation: "default",
										type: "bytes32",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "bytes32",
												type: "bytes32"
											},
											id: 2032,
											name: "ElementaryTypeName",
											src: "884:7:8"
										}
									],
									id: 2033,
									name: "VariableDeclaration",
									src: "884:7:8"
								}
							],
							id: 2034,
							name: "ParameterList",
							src: "883:9:8"
						}
					],
					id: 2035,
					name: "FunctionDefinition",
					src: "833:60:8"
				},
				{
					attributes: {
						body: null,
						documentation: null,
						implemented: false,
						isConstructor: false,
						kind: "function",
						modifiers: [
							null
						],
						name: "PERMIT_TYPEHASH",
						scope: 2189,
						stateMutability: "pure",
						superFunction: null,
						visibility: "external"
					},
					children: [
						{
							attributes: {
								parameters: [
									null
								]
							},
							children: [
							],
							id: 2036,
							name: "ParameterList",
							src: "922:2:8"
						},
						{
							children: [
								{
									attributes: {
										constant: false,
										name: "",
										scope: 2040,
										stateVariable: false,
										storageLocation: "default",
										type: "bytes32",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "bytes32",
												type: "bytes32"
											},
											id: 2037,
											name: "ElementaryTypeName",
											src: "948:7:8"
										}
									],
									id: 2038,
									name: "VariableDeclaration",
									src: "948:7:8"
								}
							],
							id: 2039,
							name: "ParameterList",
							src: "947:9:8"
						}
					],
					id: 2040,
					name: "FunctionDefinition",
					src: "898:59:8"
				},
				{
					attributes: {
						body: null,
						documentation: null,
						implemented: false,
						isConstructor: false,
						kind: "function",
						modifiers: [
							null
						],
						name: "nonces",
						scope: 2189,
						stateMutability: "view",
						superFunction: null,
						visibility: "external"
					},
					children: [
						{
							children: [
								{
									attributes: {
										constant: false,
										name: "owner",
										scope: 2047,
										stateVariable: false,
										storageLocation: "default",
										type: "address",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "address",
												stateMutability: "nonpayable",
												type: "address"
											},
											id: 2041,
											name: "ElementaryTypeName",
											src: "978:7:8"
										}
									],
									id: 2042,
									name: "VariableDeclaration",
									src: "978:13:8"
								}
							],
							id: 2043,
							name: "ParameterList",
							src: "977:15:8"
						},
						{
							children: [
								{
									attributes: {
										constant: false,
										name: "",
										scope: 2047,
										stateVariable: false,
										storageLocation: "default",
										type: "uint256",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "uint",
												type: "uint256"
											},
											id: 2044,
											name: "ElementaryTypeName",
											src: "1016:4:8"
										}
									],
									id: 2045,
									name: "VariableDeclaration",
									src: "1016:4:8"
								}
							],
							id: 2046,
							name: "ParameterList",
							src: "1015:6:8"
						}
					],
					id: 2047,
					name: "FunctionDefinition",
					src: "962:60:8"
				},
				{
					attributes: {
						body: null,
						documentation: null,
						implemented: false,
						isConstructor: false,
						kind: "function",
						modifiers: [
							null
						],
						name: "permit",
						scope: 2189,
						stateMutability: "nonpayable",
						superFunction: null,
						visibility: "external"
					},
					children: [
						{
							children: [
								{
									attributes: {
										constant: false,
										name: "owner",
										scope: 2064,
										stateVariable: false,
										storageLocation: "default",
										type: "address",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "address",
												stateMutability: "nonpayable",
												type: "address"
											},
											id: 2048,
											name: "ElementaryTypeName",
											src: "1044:7:8"
										}
									],
									id: 2049,
									name: "VariableDeclaration",
									src: "1044:13:8"
								},
								{
									attributes: {
										constant: false,
										name: "spender",
										scope: 2064,
										stateVariable: false,
										storageLocation: "default",
										type: "address",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "address",
												stateMutability: "nonpayable",
												type: "address"
											},
											id: 2050,
											name: "ElementaryTypeName",
											src: "1059:7:8"
										}
									],
									id: 2051,
									name: "VariableDeclaration",
									src: "1059:15:8"
								},
								{
									attributes: {
										constant: false,
										name: "value",
										scope: 2064,
										stateVariable: false,
										storageLocation: "default",
										type: "uint256",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "uint",
												type: "uint256"
											},
											id: 2052,
											name: "ElementaryTypeName",
											src: "1076:4:8"
										}
									],
									id: 2053,
									name: "VariableDeclaration",
									src: "1076:10:8"
								},
								{
									attributes: {
										constant: false,
										name: "deadline",
										scope: 2064,
										stateVariable: false,
										storageLocation: "default",
										type: "uint256",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "uint",
												type: "uint256"
											},
											id: 2054,
											name: "ElementaryTypeName",
											src: "1088:4:8"
										}
									],
									id: 2055,
									name: "VariableDeclaration",
									src: "1088:13:8"
								},
								{
									attributes: {
										constant: false,
										name: "v",
										scope: 2064,
										stateVariable: false,
										storageLocation: "default",
										type: "uint8",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "uint8",
												type: "uint8"
											},
											id: 2056,
											name: "ElementaryTypeName",
											src: "1103:5:8"
										}
									],
									id: 2057,
									name: "VariableDeclaration",
									src: "1103:7:8"
								},
								{
									attributes: {
										constant: false,
										name: "r",
										scope: 2064,
										stateVariable: false,
										storageLocation: "default",
										type: "bytes32",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "bytes32",
												type: "bytes32"
											},
											id: 2058,
											name: "ElementaryTypeName",
											src: "1112:7:8"
										}
									],
									id: 2059,
									name: "VariableDeclaration",
									src: "1112:9:8"
								},
								{
									attributes: {
										constant: false,
										name: "s",
										scope: 2064,
										stateVariable: false,
										storageLocation: "default",
										type: "bytes32",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "bytes32",
												type: "bytes32"
											},
											id: 2060,
											name: "ElementaryTypeName",
											src: "1123:7:8"
										}
									],
									id: 2061,
									name: "VariableDeclaration",
									src: "1123:9:8"
								}
							],
							id: 2062,
							name: "ParameterList",
							src: "1043:90:8"
						},
						{
							attributes: {
								parameters: [
									null
								]
							},
							children: [
							],
							id: 2063,
							name: "ParameterList",
							src: "1142:0:8"
						}
					],
					id: 2064,
					name: "FunctionDefinition",
					src: "1028:115:8"
				},
				{
					attributes: {
						anonymous: false,
						documentation: null,
						name: "Mint"
					},
					children: [
						{
							children: [
								{
									attributes: {
										constant: false,
										indexed: true,
										name: "sender",
										scope: 2072,
										stateVariable: false,
										storageLocation: "default",
										type: "address",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "address",
												stateMutability: "nonpayable",
												type: "address"
											},
											id: 2065,
											name: "ElementaryTypeName",
											src: "1160:7:8"
										}
									],
									id: 2066,
									name: "VariableDeclaration",
									src: "1160:22:8"
								},
								{
									attributes: {
										constant: false,
										indexed: false,
										name: "amount0",
										scope: 2072,
										stateVariable: false,
										storageLocation: "default",
										type: "uint256",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "uint",
												type: "uint256"
											},
											id: 2067,
											name: "ElementaryTypeName",
											src: "1184:4:8"
										}
									],
									id: 2068,
									name: "VariableDeclaration",
									src: "1184:12:8"
								},
								{
									attributes: {
										constant: false,
										indexed: false,
										name: "amount1",
										scope: 2072,
										stateVariable: false,
										storageLocation: "default",
										type: "uint256",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "uint",
												type: "uint256"
											},
											id: 2069,
											name: "ElementaryTypeName",
											src: "1198:4:8"
										}
									],
									id: 2070,
									name: "VariableDeclaration",
									src: "1198:12:8"
								}
							],
							id: 2071,
							name: "ParameterList",
							src: "1159:52:8"
						}
					],
					id: 2072,
					name: "EventDefinition",
					src: "1149:63:8"
				},
				{
					attributes: {
						anonymous: false,
						documentation: null,
						name: "Burn"
					},
					children: [
						{
							children: [
								{
									attributes: {
										constant: false,
										indexed: true,
										name: "sender",
										scope: 2082,
										stateVariable: false,
										storageLocation: "default",
										type: "address",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "address",
												stateMutability: "nonpayable",
												type: "address"
											},
											id: 2073,
											name: "ElementaryTypeName",
											src: "1228:7:8"
										}
									],
									id: 2074,
									name: "VariableDeclaration",
									src: "1228:22:8"
								},
								{
									attributes: {
										constant: false,
										indexed: false,
										name: "amount0",
										scope: 2082,
										stateVariable: false,
										storageLocation: "default",
										type: "uint256",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "uint",
												type: "uint256"
											},
											id: 2075,
											name: "ElementaryTypeName",
											src: "1252:4:8"
										}
									],
									id: 2076,
									name: "VariableDeclaration",
									src: "1252:12:8"
								},
								{
									attributes: {
										constant: false,
										indexed: false,
										name: "amount1",
										scope: 2082,
										stateVariable: false,
										storageLocation: "default",
										type: "uint256",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "uint",
												type: "uint256"
											},
											id: 2077,
											name: "ElementaryTypeName",
											src: "1266:4:8"
										}
									],
									id: 2078,
									name: "VariableDeclaration",
									src: "1266:12:8"
								},
								{
									attributes: {
										constant: false,
										indexed: true,
										name: "to",
										scope: 2082,
										stateVariable: false,
										storageLocation: "default",
										type: "address",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "address",
												stateMutability: "nonpayable",
												type: "address"
											},
											id: 2079,
											name: "ElementaryTypeName",
											src: "1280:7:8"
										}
									],
									id: 2080,
									name: "VariableDeclaration",
									src: "1280:18:8"
								}
							],
							id: 2081,
							name: "ParameterList",
							src: "1227:72:8"
						}
					],
					id: 2082,
					name: "EventDefinition",
					src: "1217:83:8"
				},
				{
					attributes: {
						anonymous: false,
						documentation: null,
						name: "Swap"
					},
					children: [
						{
							children: [
								{
									attributes: {
										constant: false,
										indexed: true,
										name: "sender",
										scope: 2096,
										stateVariable: false,
										storageLocation: "default",
										type: "address",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "address",
												stateMutability: "nonpayable",
												type: "address"
											},
											id: 2083,
											name: "ElementaryTypeName",
											src: "1325:7:8"
										}
									],
									id: 2084,
									name: "VariableDeclaration",
									src: "1325:22:8"
								},
								{
									attributes: {
										constant: false,
										indexed: false,
										name: "amount0In",
										scope: 2096,
										stateVariable: false,
										storageLocation: "default",
										type: "uint256",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "uint",
												type: "uint256"
											},
											id: 2085,
											name: "ElementaryTypeName",
											src: "1357:4:8"
										}
									],
									id: 2086,
									name: "VariableDeclaration",
									src: "1357:14:8"
								},
								{
									attributes: {
										constant: false,
										indexed: false,
										name: "amount1In",
										scope: 2096,
										stateVariable: false,
										storageLocation: "default",
										type: "uint256",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "uint",
												type: "uint256"
											},
											id: 2087,
											name: "ElementaryTypeName",
											src: "1381:4:8"
										}
									],
									id: 2088,
									name: "VariableDeclaration",
									src: "1381:14:8"
								},
								{
									attributes: {
										constant: false,
										indexed: false,
										name: "amount0Out",
										scope: 2096,
										stateVariable: false,
										storageLocation: "default",
										type: "uint256",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "uint",
												type: "uint256"
											},
											id: 2089,
											name: "ElementaryTypeName",
											src: "1405:4:8"
										}
									],
									id: 2090,
									name: "VariableDeclaration",
									src: "1405:15:8"
								},
								{
									attributes: {
										constant: false,
										indexed: false,
										name: "amount1Out",
										scope: 2096,
										stateVariable: false,
										storageLocation: "default",
										type: "uint256",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "uint",
												type: "uint256"
											},
											id: 2091,
											name: "ElementaryTypeName",
											src: "1430:4:8"
										}
									],
									id: 2092,
									name: "VariableDeclaration",
									src: "1430:15:8"
								},
								{
									attributes: {
										constant: false,
										indexed: true,
										name: "to",
										scope: 2096,
										stateVariable: false,
										storageLocation: "default",
										type: "address",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "address",
												stateMutability: "nonpayable",
												type: "address"
											},
											id: 2093,
											name: "ElementaryTypeName",
											src: "1455:7:8"
										}
									],
									id: 2094,
									name: "VariableDeclaration",
									src: "1455:18:8"
								}
							],
							id: 2095,
							name: "ParameterList",
							src: "1315:164:8"
						}
					],
					id: 2096,
					name: "EventDefinition",
					src: "1305:175:8"
				},
				{
					attributes: {
						anonymous: false,
						documentation: null,
						name: "Sync"
					},
					children: [
						{
							children: [
								{
									attributes: {
										constant: false,
										indexed: false,
										name: "reserve0",
										scope: 2102,
										stateVariable: false,
										storageLocation: "default",
										type: "uint112",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "uint112",
												type: "uint112"
											},
											id: 2097,
											name: "ElementaryTypeName",
											src: "1496:7:8"
										}
									],
									id: 2098,
									name: "VariableDeclaration",
									src: "1496:16:8"
								},
								{
									attributes: {
										constant: false,
										indexed: false,
										name: "reserve1",
										scope: 2102,
										stateVariable: false,
										storageLocation: "default",
										type: "uint112",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "uint112",
												type: "uint112"
											},
											id: 2099,
											name: "ElementaryTypeName",
											src: "1514:7:8"
										}
									],
									id: 2100,
									name: "VariableDeclaration",
									src: "1514:16:8"
								}
							],
							id: 2101,
							name: "ParameterList",
							src: "1495:36:8"
						}
					],
					id: 2102,
					name: "EventDefinition",
					src: "1485:47:8"
				},
				{
					attributes: {
						body: null,
						documentation: null,
						implemented: false,
						isConstructor: false,
						kind: "function",
						modifiers: [
							null
						],
						name: "MINIMUM_LIQUIDITY",
						scope: 2189,
						stateMutability: "pure",
						superFunction: null,
						visibility: "external"
					},
					children: [
						{
							attributes: {
								parameters: [
									null
								]
							},
							children: [
							],
							id: 2103,
							name: "ParameterList",
							src: "1564:2:8"
						},
						{
							children: [
								{
									attributes: {
										constant: false,
										name: "",
										scope: 2107,
										stateVariable: false,
										storageLocation: "default",
										type: "uint256",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "uint",
												type: "uint256"
											},
											id: 2104,
											name: "ElementaryTypeName",
											src: "1590:4:8"
										}
									],
									id: 2105,
									name: "VariableDeclaration",
									src: "1590:4:8"
								}
							],
							id: 2106,
							name: "ParameterList",
							src: "1589:6:8"
						}
					],
					id: 2107,
					name: "FunctionDefinition",
					src: "1538:58:8"
				},
				{
					attributes: {
						body: null,
						documentation: null,
						implemented: false,
						isConstructor: false,
						kind: "function",
						modifiers: [
							null
						],
						name: "factory",
						scope: 2189,
						stateMutability: "view",
						superFunction: null,
						visibility: "external"
					},
					children: [
						{
							attributes: {
								parameters: [
									null
								]
							},
							children: [
							],
							id: 2108,
							name: "ParameterList",
							src: "1617:2:8"
						},
						{
							children: [
								{
									attributes: {
										constant: false,
										name: "",
										scope: 2112,
										stateVariable: false,
										storageLocation: "default",
										type: "address",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "address",
												stateMutability: "nonpayable",
												type: "address"
											},
											id: 2109,
											name: "ElementaryTypeName",
											src: "1643:7:8"
										}
									],
									id: 2110,
									name: "VariableDeclaration",
									src: "1643:7:8"
								}
							],
							id: 2111,
							name: "ParameterList",
							src: "1642:9:8"
						}
					],
					id: 2112,
					name: "FunctionDefinition",
					src: "1601:51:8"
				},
				{
					attributes: {
						body: null,
						documentation: null,
						implemented: false,
						isConstructor: false,
						kind: "function",
						modifiers: [
							null
						],
						name: "token0",
						scope: 2189,
						stateMutability: "view",
						superFunction: null,
						visibility: "external"
					},
					children: [
						{
							attributes: {
								parameters: [
									null
								]
							},
							children: [
							],
							id: 2113,
							name: "ParameterList",
							src: "1672:2:8"
						},
						{
							children: [
								{
									attributes: {
										constant: false,
										name: "",
										scope: 2117,
										stateVariable: false,
										storageLocation: "default",
										type: "address",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "address",
												stateMutability: "nonpayable",
												type: "address"
											},
											id: 2114,
											name: "ElementaryTypeName",
											src: "1698:7:8"
										}
									],
									id: 2115,
									name: "VariableDeclaration",
									src: "1698:7:8"
								}
							],
							id: 2116,
							name: "ParameterList",
							src: "1697:9:8"
						}
					],
					id: 2117,
					name: "FunctionDefinition",
					src: "1657:50:8"
				},
				{
					attributes: {
						body: null,
						documentation: null,
						implemented: false,
						isConstructor: false,
						kind: "function",
						modifiers: [
							null
						],
						name: "token1",
						scope: 2189,
						stateMutability: "view",
						superFunction: null,
						visibility: "external"
					},
					children: [
						{
							attributes: {
								parameters: [
									null
								]
							},
							children: [
							],
							id: 2118,
							name: "ParameterList",
							src: "1727:2:8"
						},
						{
							children: [
								{
									attributes: {
										constant: false,
										name: "",
										scope: 2122,
										stateVariable: false,
										storageLocation: "default",
										type: "address",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "address",
												stateMutability: "nonpayable",
												type: "address"
											},
											id: 2119,
											name: "ElementaryTypeName",
											src: "1753:7:8"
										}
									],
									id: 2120,
									name: "VariableDeclaration",
									src: "1753:7:8"
								}
							],
							id: 2121,
							name: "ParameterList",
							src: "1752:9:8"
						}
					],
					id: 2122,
					name: "FunctionDefinition",
					src: "1712:50:8"
				},
				{
					attributes: {
						body: null,
						documentation: null,
						implemented: false,
						isConstructor: false,
						kind: "function",
						modifiers: [
							null
						],
						name: "getReserves",
						scope: 2189,
						stateMutability: "view",
						superFunction: null,
						visibility: "external"
					},
					children: [
						{
							attributes: {
								parameters: [
									null
								]
							},
							children: [
							],
							id: 2123,
							name: "ParameterList",
							src: "1787:2:8"
						},
						{
							children: [
								{
									attributes: {
										constant: false,
										name: "reserve0",
										scope: 2131,
										stateVariable: false,
										storageLocation: "default",
										type: "uint112",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "uint112",
												type: "uint112"
											},
											id: 2124,
											name: "ElementaryTypeName",
											src: "1813:7:8"
										}
									],
									id: 2125,
									name: "VariableDeclaration",
									src: "1813:16:8"
								},
								{
									attributes: {
										constant: false,
										name: "reserve1",
										scope: 2131,
										stateVariable: false,
										storageLocation: "default",
										type: "uint112",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "uint112",
												type: "uint112"
											},
											id: 2126,
											name: "ElementaryTypeName",
											src: "1831:7:8"
										}
									],
									id: 2127,
									name: "VariableDeclaration",
									src: "1831:16:8"
								},
								{
									attributes: {
										constant: false,
										name: "blockTimestampLast",
										scope: 2131,
										stateVariable: false,
										storageLocation: "default",
										type: "uint32",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "uint32",
												type: "uint32"
											},
											id: 2128,
											name: "ElementaryTypeName",
											src: "1849:6:8"
										}
									],
									id: 2129,
									name: "VariableDeclaration",
									src: "1849:25:8"
								}
							],
							id: 2130,
							name: "ParameterList",
							src: "1812:63:8"
						}
					],
					id: 2131,
					name: "FunctionDefinition",
					src: "1767:109:8"
				},
				{
					attributes: {
						body: null,
						documentation: null,
						implemented: false,
						isConstructor: false,
						kind: "function",
						modifiers: [
							null
						],
						name: "price0CumulativeLast",
						scope: 2189,
						stateMutability: "view",
						superFunction: null,
						visibility: "external"
					},
					children: [
						{
							attributes: {
								parameters: [
									null
								]
							},
							children: [
							],
							id: 2132,
							name: "ParameterList",
							src: "1910:2:8"
						},
						{
							children: [
								{
									attributes: {
										constant: false,
										name: "",
										scope: 2136,
										stateVariable: false,
										storageLocation: "default",
										type: "uint256",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "uint",
												type: "uint256"
											},
											id: 2133,
											name: "ElementaryTypeName",
											src: "1936:4:8"
										}
									],
									id: 2134,
									name: "VariableDeclaration",
									src: "1936:4:8"
								}
							],
							id: 2135,
							name: "ParameterList",
							src: "1935:6:8"
						}
					],
					id: 2136,
					name: "FunctionDefinition",
					src: "1881:61:8"
				},
				{
					attributes: {
						body: null,
						documentation: null,
						implemented: false,
						isConstructor: false,
						kind: "function",
						modifiers: [
							null
						],
						name: "price1CumulativeLast",
						scope: 2189,
						stateMutability: "view",
						superFunction: null,
						visibility: "external"
					},
					children: [
						{
							attributes: {
								parameters: [
									null
								]
							},
							children: [
							],
							id: 2137,
							name: "ParameterList",
							src: "1976:2:8"
						},
						{
							children: [
								{
									attributes: {
										constant: false,
										name: "",
										scope: 2141,
										stateVariable: false,
										storageLocation: "default",
										type: "uint256",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "uint",
												type: "uint256"
											},
											id: 2138,
											name: "ElementaryTypeName",
											src: "2002:4:8"
										}
									],
									id: 2139,
									name: "VariableDeclaration",
									src: "2002:4:8"
								}
							],
							id: 2140,
							name: "ParameterList",
							src: "2001:6:8"
						}
					],
					id: 2141,
					name: "FunctionDefinition",
					src: "1947:61:8"
				},
				{
					attributes: {
						body: null,
						documentation: null,
						implemented: false,
						isConstructor: false,
						kind: "function",
						modifiers: [
							null
						],
						name: "kLast",
						scope: 2189,
						stateMutability: "view",
						superFunction: null,
						visibility: "external"
					},
					children: [
						{
							attributes: {
								parameters: [
									null
								]
							},
							children: [
							],
							id: 2142,
							name: "ParameterList",
							src: "2027:2:8"
						},
						{
							children: [
								{
									attributes: {
										constant: false,
										name: "",
										scope: 2146,
										stateVariable: false,
										storageLocation: "default",
										type: "uint256",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "uint",
												type: "uint256"
											},
											id: 2143,
											name: "ElementaryTypeName",
											src: "2053:4:8"
										}
									],
									id: 2144,
									name: "VariableDeclaration",
									src: "2053:4:8"
								}
							],
							id: 2145,
							name: "ParameterList",
							src: "2052:6:8"
						}
					],
					id: 2146,
					name: "FunctionDefinition",
					src: "2013:46:8"
				},
				{
					attributes: {
						body: null,
						documentation: null,
						implemented: false,
						isConstructor: false,
						kind: "function",
						modifiers: [
							null
						],
						name: "mint",
						scope: 2189,
						stateMutability: "nonpayable",
						superFunction: null,
						visibility: "external"
					},
					children: [
						{
							children: [
								{
									attributes: {
										constant: false,
										name: "to",
										scope: 2153,
										stateVariable: false,
										storageLocation: "default",
										type: "address",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "address",
												stateMutability: "nonpayable",
												type: "address"
											},
											id: 2147,
											name: "ElementaryTypeName",
											src: "2079:7:8"
										}
									],
									id: 2148,
									name: "VariableDeclaration",
									src: "2079:10:8"
								}
							],
							id: 2149,
							name: "ParameterList",
							src: "2078:12:8"
						},
						{
							children: [
								{
									attributes: {
										constant: false,
										name: "liquidity",
										scope: 2153,
										stateVariable: false,
										storageLocation: "default",
										type: "uint256",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "uint",
												type: "uint256"
											},
											id: 2150,
											name: "ElementaryTypeName",
											src: "2109:4:8"
										}
									],
									id: 2151,
									name: "VariableDeclaration",
									src: "2109:14:8"
								}
							],
							id: 2152,
							name: "ParameterList",
							src: "2108:16:8"
						}
					],
					id: 2153,
					name: "FunctionDefinition",
					src: "2065:60:8"
				},
				{
					attributes: {
						body: null,
						documentation: null,
						implemented: false,
						isConstructor: false,
						kind: "function",
						modifiers: [
							null
						],
						name: "burn",
						scope: 2189,
						stateMutability: "nonpayable",
						superFunction: null,
						visibility: "external"
					},
					children: [
						{
							children: [
								{
									attributes: {
										constant: false,
										name: "to",
										scope: 2162,
										stateVariable: false,
										storageLocation: "default",
										type: "address",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "address",
												stateMutability: "nonpayable",
												type: "address"
											},
											id: 2154,
											name: "ElementaryTypeName",
											src: "2144:7:8"
										}
									],
									id: 2155,
									name: "VariableDeclaration",
									src: "2144:10:8"
								}
							],
							id: 2156,
							name: "ParameterList",
							src: "2143:12:8"
						},
						{
							children: [
								{
									attributes: {
										constant: false,
										name: "amount0",
										scope: 2162,
										stateVariable: false,
										storageLocation: "default",
										type: "uint256",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "uint",
												type: "uint256"
											},
											id: 2157,
											name: "ElementaryTypeName",
											src: "2174:4:8"
										}
									],
									id: 2158,
									name: "VariableDeclaration",
									src: "2174:12:8"
								},
								{
									attributes: {
										constant: false,
										name: "amount1",
										scope: 2162,
										stateVariable: false,
										storageLocation: "default",
										type: "uint256",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "uint",
												type: "uint256"
											},
											id: 2159,
											name: "ElementaryTypeName",
											src: "2188:4:8"
										}
									],
									id: 2160,
									name: "VariableDeclaration",
									src: "2188:12:8"
								}
							],
							id: 2161,
							name: "ParameterList",
							src: "2173:28:8"
						}
					],
					id: 2162,
					name: "FunctionDefinition",
					src: "2130:72:8"
				},
				{
					attributes: {
						body: null,
						documentation: null,
						implemented: false,
						isConstructor: false,
						kind: "function",
						modifiers: [
							null
						],
						name: "swap",
						scope: 2189,
						stateMutability: "nonpayable",
						superFunction: null,
						visibility: "external"
					},
					children: [
						{
							children: [
								{
									attributes: {
										constant: false,
										name: "amount0Out",
										scope: 2173,
										stateVariable: false,
										storageLocation: "default",
										type: "uint256",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "uint",
												type: "uint256"
											},
											id: 2163,
											name: "ElementaryTypeName",
											src: "2221:4:8"
										}
									],
									id: 2164,
									name: "VariableDeclaration",
									src: "2221:15:8"
								},
								{
									attributes: {
										constant: false,
										name: "amount1Out",
										scope: 2173,
										stateVariable: false,
										storageLocation: "default",
										type: "uint256",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "uint",
												type: "uint256"
											},
											id: 2165,
											name: "ElementaryTypeName",
											src: "2238:4:8"
										}
									],
									id: 2166,
									name: "VariableDeclaration",
									src: "2238:15:8"
								},
								{
									attributes: {
										constant: false,
										name: "to",
										scope: 2173,
										stateVariable: false,
										storageLocation: "default",
										type: "address",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "address",
												stateMutability: "nonpayable",
												type: "address"
											},
											id: 2167,
											name: "ElementaryTypeName",
											src: "2255:7:8"
										}
									],
									id: 2168,
									name: "VariableDeclaration",
									src: "2255:10:8"
								},
								{
									attributes: {
										constant: false,
										name: "data",
										scope: 2173,
										stateVariable: false,
										storageLocation: "calldata",
										type: "bytes",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "bytes",
												type: "bytes"
											},
											id: 2169,
											name: "ElementaryTypeName",
											src: "2267:5:8"
										}
									],
									id: 2170,
									name: "VariableDeclaration",
									src: "2267:19:8"
								}
							],
							id: 2171,
							name: "ParameterList",
							src: "2220:67:8"
						},
						{
							attributes: {
								parameters: [
									null
								]
							},
							children: [
							],
							id: 2172,
							name: "ParameterList",
							src: "2296:0:8"
						}
					],
					id: 2173,
					name: "FunctionDefinition",
					src: "2207:90:8"
				},
				{
					attributes: {
						body: null,
						documentation: null,
						implemented: false,
						isConstructor: false,
						kind: "function",
						modifiers: [
							null
						],
						name: "skim",
						scope: 2189,
						stateMutability: "nonpayable",
						superFunction: null,
						visibility: "external"
					},
					children: [
						{
							children: [
								{
									attributes: {
										constant: false,
										name: "to",
										scope: 2178,
										stateVariable: false,
										storageLocation: "default",
										type: "address",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "address",
												stateMutability: "nonpayable",
												type: "address"
											},
											id: 2174,
											name: "ElementaryTypeName",
											src: "2316:7:8"
										}
									],
									id: 2175,
									name: "VariableDeclaration",
									src: "2316:10:8"
								}
							],
							id: 2176,
							name: "ParameterList",
							src: "2315:12:8"
						},
						{
							attributes: {
								parameters: [
									null
								]
							},
							children: [
							],
							id: 2177,
							name: "ParameterList",
							src: "2336:0:8"
						}
					],
					id: 2178,
					name: "FunctionDefinition",
					src: "2302:35:8"
				},
				{
					attributes: {
						body: null,
						documentation: null,
						implemented: false,
						isConstructor: false,
						kind: "function",
						modifiers: [
							null
						],
						name: "sync",
						scope: 2189,
						stateMutability: "nonpayable",
						superFunction: null,
						visibility: "external"
					},
					children: [
						{
							attributes: {
								parameters: [
									null
								]
							},
							children: [
							],
							id: 2179,
							name: "ParameterList",
							src: "2355:2:8"
						},
						{
							attributes: {
								parameters: [
									null
								]
							},
							children: [
							],
							id: 2180,
							name: "ParameterList",
							src: "2366:0:8"
						}
					],
					id: 2181,
					name: "FunctionDefinition",
					src: "2342:25:8"
				},
				{
					attributes: {
						body: null,
						documentation: null,
						implemented: false,
						isConstructor: false,
						kind: "function",
						modifiers: [
							null
						],
						name: "initialize",
						scope: 2189,
						stateMutability: "nonpayable",
						superFunction: null,
						visibility: "external"
					},
					children: [
						{
							children: [
								{
									attributes: {
										constant: false,
										name: "",
										scope: 2188,
										stateVariable: false,
										storageLocation: "default",
										type: "address",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "address",
												stateMutability: "nonpayable",
												type: "address"
											},
											id: 2182,
											name: "ElementaryTypeName",
											src: "2393:7:8"
										}
									],
									id: 2183,
									name: "VariableDeclaration",
									src: "2393:7:8"
								},
								{
									attributes: {
										constant: false,
										name: "",
										scope: 2188,
										stateVariable: false,
										storageLocation: "default",
										type: "address",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "address",
												stateMutability: "nonpayable",
												type: "address"
											},
											id: 2184,
											name: "ElementaryTypeName",
											src: "2402:7:8"
										}
									],
									id: 2185,
									name: "VariableDeclaration",
									src: "2402:7:8"
								}
							],
							id: 2186,
							name: "ParameterList",
							src: "2392:18:8"
						},
						{
							attributes: {
								parameters: [
									null
								]
							},
							children: [
							],
							id: 2187,
							name: "ParameterList",
							src: "2419:0:8"
						}
					],
					id: 2188,
					name: "FunctionDefinition",
					src: "2373:47:8"
				}
			],
			id: 2189,
			name: "ContractDefinition",
			src: "26:2396:8"
		}
	],
	id: 2190,
	name: "SourceUnit",
	src: "0:2423:8"
};
var compiler = {
	name: "solc",
	version: "0.5.16+commit.9c3226ce.Emscripten.clang"
};
var networks = {
};
var schemaVersion = "3.4.2";
var updatedAt = "2021-08-14T11:27:34.742Z";
var devdoc = {
	methods: {
	}
};
var userdoc = {
	methods: {
	}
};
var ISafeswapPair = {
	contractName: contractName,
	abi: abi,
	metadata: metadata,
	bytecode: bytecode,
	deployedBytecode: deployedBytecode,
	sourceMap: sourceMap,
	deployedSourceMap: deployedSourceMap,
	source: source,
	sourcePath: sourcePath,
	ast: ast,
	legacyAST: legacyAST,
	compiler: compiler,
	networks: networks,
	schemaVersion: schemaVersion,
	updatedAt: updatedAt,
	devdoc: devdoc,
	userdoc: userdoc
};

var ERC20 = [
	{
		constant: true,
		inputs: [
		],
		name: "decimals",
		outputs: [
			{
				name: "",
				type: "uint8"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
			{
				name: "",
				type: "address"
			}
		],
		name: "balanceOf",
		outputs: [
			{
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	}
];

var _TOKEN_DECIMALS_CACHE;
var TOKEN_DECIMALS_CACHE = (_TOKEN_DECIMALS_CACHE = {}, _TOKEN_DECIMALS_CACHE[exports.ChainId.MAINNET] = {
  '0xE0B7927c4aF23765Cb51314A0E0521A9645F0E2A': 9 // DGD

}, _TOKEN_DECIMALS_CACHE);
/**
 * Contains methods for constructing instances of pairs and tokens from on-chain data.
 */

var Fetcher = /*#__PURE__*/function () {
  /**
   * Cannot be constructed.
   */
  function Fetcher() {}
  /**
   * Fetch information for a given token on the given chain, using the given ethers provider.
   * @param chainId chain of the token
   * @param address address of the token on the chain
   * @param provider provider used to fetch the token
   * @param symbol optional symbol of the token
   * @param name optional name of the token
   */


  Fetcher.fetchTokenData = function fetchTokenData(chainId, address, provider, symbol, name) {
    try {
      var _TOKEN_DECIMALS_CACHE2, _TOKEN_DECIMALS_CACHE3;

      var _temp3 = function _temp3(parsedDecimals) {
        return new Token(chainId, address, parsedDecimals, symbol, name);
      };

      if (provider === undefined) provider = providers.getDefaultProvider(networks$1.getNetwork(chainId));

      var _temp4 = typeof ((_TOKEN_DECIMALS_CACHE2 = TOKEN_DECIMALS_CACHE) === null || _TOKEN_DECIMALS_CACHE2 === void 0 ? void 0 : (_TOKEN_DECIMALS_CACHE3 = _TOKEN_DECIMALS_CACHE2[chainId]) === null || _TOKEN_DECIMALS_CACHE3 === void 0 ? void 0 : _TOKEN_DECIMALS_CACHE3[address]) === 'number';

      return Promise.resolve(_temp4 ? _temp3(TOKEN_DECIMALS_CACHE[chainId][address]) : Promise.resolve(new contracts.Contract(address, ERC20, provider).decimals().then(function (decimals) {
        var _TOKEN_DECIMALS_CACHE4, _extends2, _extends3;

        TOKEN_DECIMALS_CACHE = _extends({}, TOKEN_DECIMALS_CACHE, (_extends3 = {}, _extends3[chainId] = _extends({}, (_TOKEN_DECIMALS_CACHE4 = TOKEN_DECIMALS_CACHE) === null || _TOKEN_DECIMALS_CACHE4 === void 0 ? void 0 : _TOKEN_DECIMALS_CACHE4[chainId], (_extends2 = {}, _extends2[address] = decimals, _extends2)), _extends3));
        return decimals;
      })).then(_temp3));
    } catch (e) {
      return Promise.reject(e);
    }
  }
  /**
   * Fetches information about a pair and constructs a pair from the given two tokens.
   * @param tokenA first token
   * @param tokenB second token
   * @param provider the provider to use to fetch the data
   */
  ;

  Fetcher.fetchPairData = function fetchPairData(tokenA, tokenB, provider) {
    try {
      if (provider === undefined) provider = providers.getDefaultProvider(networks$1.getNetwork(tokenA.chainId));
      !(tokenA.chainId === tokenB.chainId) ? "development" !== "production" ? invariant(false, 'CHAIN_ID') : invariant(false) : void 0;
      var address = Pair.getAddress(tokenA, tokenB, tokenA.chainId);
      return Promise.resolve(new contracts.Contract(address, ISafeswapPair.abi, provider).getReserves()).then(function (_ref) {
        var reserves0 = _ref[0],
            reserves1 = _ref[1];
        var balances = tokenA.sortsBefore(tokenB) ? [reserves0, reserves1] : [reserves1, reserves0];
        return new Pair(new TokenAmount(tokenA, balances[0]), new TokenAmount(tokenB, balances[1]));
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };

  return Fetcher;
}();

exports.JSBI = JSBI;
exports.Currency = Currency;
exports.CurrencyAmount = CurrencyAmount;
exports.ETHER = ETHER;
exports.FACTORY_ADDRESS = FACTORY_ADDRESS;
exports.Fetcher = Fetcher;
exports.Fraction = Fraction;
exports.INIT_CODE_HASH = INIT_CODE_HASH;
exports.InsufficientInputAmountError = InsufficientInputAmountError;
exports.InsufficientReservesError = InsufficientReservesError;
exports.MINIMUM_LIQUIDITY = MINIMUM_LIQUIDITY;
exports.Pair = Pair;
exports.Percent = Percent;
exports.Price = Price;
exports.Route = Route;
exports.Router = Router;
exports.Token = Token;
exports.TokenAmount = TokenAmount;
exports.Trade = Trade;
exports.WETH = WETH;
exports.currencyEquals = currencyEquals;
exports.inputOutputComparator = inputOutputComparator;
exports.tradeComparator = tradeComparator;
//# sourceMappingURL=sdk.cjs.development.js.map
