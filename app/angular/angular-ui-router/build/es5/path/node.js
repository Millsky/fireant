var common_1 = require("../common/common");
var module_1 = require("../resolve/module");
var view_1 = require("../view/view");
var Node = (function () {
    function Node(state, params, resolves) {
        if (resolves === void 0) { resolves = {}; }
        this.state = state;
        this.schema = state.parameters({ inherit: false });
        var getParamVal = function (paramDef) { return [paramDef.id, paramDef.value(params[paramDef.id])]; };
        this.values = this.schema.reduce(function (memo, pDef) { return common_1.applyPairs(memo, getParamVal(pDef)); }, {});
        this.resolves = common_1.extend(common_1.map(state.resolve, function (fn, name) { return new module_1.Resolvable(name, fn); }), resolves);
        var makeViewConfig = function (viewDeclarationObj, rawViewName) {
            return new view_1.ViewConfig({ rawViewName: rawViewName, viewDeclarationObj: viewDeclarationObj, context: state, params: params });
        };
        this.views = common_1.values(common_1.map(state.views, makeViewConfig));
    }
    Node.prototype.parameter = function (name) {
        return common_1.find(this.schema, common_1.propEq("id", name));
    };
    Node.prototype.equals = function (node, keys) {
        var _this = this;
        if (keys === void 0) { keys = this.schema.map(common_1.prop('id')); }
        var paramValsEq = function (key) { return _this.parameter(key).type.equals(_this.values[key], node.values[key]); };
        return this.state === node.state && keys.map(paramValsEq).reduce(common_1.allTrueR, true);
    };
    Node.clone = function (node, update) {
        if (update === void 0) { update = {}; }
        return new Node(node.state, (update.values || node.values), (update.resolves || node.resolves));
    };
    Node.matching = function (first, second) {
        var matchedCount = first.reduce(function (prev, node, i) {
            return prev === i && i < second.length && node.state === second[i].state ? i + 1 : prev;
        }, 0);
        return first.slice(0, matchedCount);
    };
    return Node;
})();
exports.Node = Node;
//# sourceMappingURL=node.js.map