"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var yorkshireAbilities;
(function (yorkshireAbilities) {
    yorkshireAbilities[yorkshireAbilities["water"] = 1] = "water";
    yorkshireAbilities[yorkshireAbilities["ice"] = 2] = "ice";
})(yorkshireAbilities || (yorkshireAbilities = {}));
var leanAbilities;
(function (leanAbilities) {
    leanAbilities[leanAbilities["fire"] = 1] = "fire";
    leanAbilities[leanAbilities["charm"] = 2] = "charm";
})(leanAbilities || (leanAbilities = {}));
var potbellyAbilities;
(function (potbellyAbilities) {
    potbellyAbilities[potbellyAbilities["electric"] = 1] = "electric";
})(potbellyAbilities || (potbellyAbilities = {}));
var Dejimon = /** @class */ (function () {
    function Dejimon(n, h, w) {
        this.height = h;
        this.name = n;
        this.weight = w;
        Dejimon.dejimonID++;
    }
    return Dejimon;
}());
var Yorshire = /** @class */ (function (_super) {
    __extends(Yorshire, _super);
    function Yorshire(s, ss, n, h, w) {
        var _this = _super.call(this, n, h, w) || this;
        _this.special = s;
        _this.specialStrength = ss;
        return _this;
    }
    Yorshire.prototype.strength = function () {
        return (this.height + this.specialStrength + this.weight) / 3;
    };
    return Yorshire;
}(Dejimon));
var Lean = /** @class */ (function (_super) {
    __extends(Lean, _super);
    function Lean(s, ss, n, h, w) {
        var _this = _super.call(this, n, h, w) || this;
        _this.special = s;
        _this.specialStrength = ss;
        return _this;
    }
    Lean.prototype.strength = function () {
        return (this.height + this.specialStrength + this.weight) / 3;
    };
    return Lean;
}(Dejimon));
var Potbelly = /** @class */ (function (_super) {
    __extends(Potbelly, _super);
    function Potbelly(s, ss, n, h, w) {
        var _this = _super.call(this, n, h, w) || this;
        _this.special = s;
        _this.specialStrength = ss;
        return _this;
    }
    Potbelly.prototype.strength = function () {
        return (this.height + this.specialStrength + this.weight) / 3;
    };
    return Potbelly;
}(Dejimon));
