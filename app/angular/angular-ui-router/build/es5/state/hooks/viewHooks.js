var common_1 = require("../../common/common");
var coreservices_1 = require("../../common/coreservices");
var angular1_1 = require("../../ng1/angular1");
var ViewHooks = (function () {
    function ViewHooks(transition, $view) {
        this.transition = transition;
        this.$view = $view;
        this.treeChanges = transition.treeChanges();
        this.enteringViews = transition.views("entering");
        this.exitingViews = transition.views("exiting");
    }
    ViewHooks.prototype.loadAllEnteringViews = function () {
        var _this = this;
        var loadView = function (vc) {
            var resolveInjector = common_1.find(_this.treeChanges.to, common_1.propEq('state', vc.context)).resolveInjector;
            return _this.$view.load(vc, resolveInjector);
        };
        return coreservices_1.services.$q.all(this.enteringViews.map(loadView)).then(common_1.noop);
    };
    ViewHooks.prototype.loadAllControllerLocals = function () {
        var _this = this;
        var loadLocals = function (vc) {
            var deps = angular1_1.annotateController(vc.controller);
            var resolveInjector = common_1.find(_this.treeChanges.to, common_1.propEq('state', vc.context)).resolveInjector;
            function $loadControllerLocals() { }
            $loadControllerLocals.$inject = deps;
            return coreservices_1.services.$q.all(resolveInjector.getLocals($loadControllerLocals)).then(function (locals) { return vc.locals = locals; });
        };
        var loadAllLocals = this.enteringViews.filter(function (vc) { return !!vc.controller; }).map(loadLocals);
        return coreservices_1.services.$q.all(loadAllLocals).then(common_1.noop);
    };
    ViewHooks.prototype.updateViews = function () {
        var $view = this.$view;
        this.exitingViews.forEach(function (viewConfig) { return $view.reset(viewConfig); });
        this.enteringViews.forEach(function (viewConfig) { return $view.registerStateViewConfig(viewConfig); });
        $view.sync();
    };
    ViewHooks.prototype.registerHooks = function () {
        if (this.enteringViews.length) {
            this.transition.onStart({}, this.loadAllEnteringViews.bind(this));
            this.transition.onFinish({}, this.loadAllControllerLocals.bind(this));
        }
        if (this.exitingViews.length || this.enteringViews.length)
            this.transition.onSuccess({}, this.updateViews.bind(this));
    };
    return ViewHooks;
})();
exports.ViewHooks = ViewHooks;
//# sourceMappingURL=viewHooks.js.map