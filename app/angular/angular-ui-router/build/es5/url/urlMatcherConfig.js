var common_1 = require("../common/common");
var MatcherConfig = (function () {
    function MatcherConfig() {
        this._isCaseInsensitive = false;
        this._isStrictMode = true;
        this._defaultSquashPolicy = false;
    }
    MatcherConfig.prototype.caseInsensitive = function (value) {
        return this._isCaseInsensitive = common_1.isDefined(value) ? value : this._isCaseInsensitive;
    };
    MatcherConfig.prototype.strictMode = function (value) {
        return this._isStrictMode = common_1.isDefined(value) ? value : this._isStrictMode;
    };
    MatcherConfig.prototype.defaultSquashPolicy = function (value) {
        if (common_1.isDefined(value) && value !== true && value !== false && !common_1.isString(value))
            throw new Error("Invalid squash policy: " + value + ". Valid policies: false, true, arbitrary-string");
        return this._defaultSquashPolicy = common_1.isDefined(value) ? value : this._defaultSquashPolicy;
    };
    return MatcherConfig;
})();
exports.matcherConfig = new MatcherConfig();
//# sourceMappingURL=urlMatcherConfig.js.map