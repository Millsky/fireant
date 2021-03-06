var common_1 = require("../common/common");
var module_1 = require("./module");
var StateQueueManager = (function () {
    function StateQueueManager(states, builder, $urlRouterProvider, $state) {
        this.states = states;
        this.builder = builder;
        this.$urlRouterProvider = $urlRouterProvider;
        this.$state = $state;
        this.autoFlush = false;
        this.queue = [];
    }
    StateQueueManager.prototype.register = function (config, pre) {
        var _a = this, states = _a.states, queue = _a.queue, $state = _a.$state;
        var state = common_1.inherit(new module_1.State(), common_1.extend({}, config, {
            self: config,
            resolve: config.resolve || {},
            toString: function () { return config.name; }
        }));
        if (!common_1.isString(state.name))
            throw new Error("State must have a valid name");
        if (states.hasOwnProperty(state.name) || common_1.pluck(queue, 'name').indexOf(state.name) !== -1)
            throw new Error("State '" + state.name + "' is already defined");
        queue[pre ? "unshift" : "push"](state);
        if (this.autoFlush) {
            this.flush($state);
        }
        return state;
    };
    StateQueueManager.prototype.flush = function ($state) {
        var _a = this, queue = _a.queue, states = _a.states, builder = _a.builder;
        var result, state, orphans = [], orphanIdx, previousQueueLength = {};
        while (queue.length > 0) {
            state = queue.shift();
            result = builder.build(state);
            orphanIdx = orphans.indexOf(state);
            if (result) {
                if (states.hasOwnProperty(state.name))
                    throw new Error("State '" + name + "' is already defined");
                states[state.name] = state;
                this.attachRoute($state, state);
                if (orphanIdx >= 0)
                    orphans.splice(orphanIdx, 1);
                continue;
            }
            var prev = previousQueueLength[state.name];
            previousQueueLength[state.name] = queue.length;
            if (orphanIdx >= 0 && prev === queue.length) {
                throw new Error("Cannot register orphaned state '" + state.name + "'");
            }
            else if (orphanIdx < 0) {
                orphans.push(state);
            }
            queue.push(state);
        }
        return states;
    };
    StateQueueManager.prototype.attachRoute = function ($state, state) {
        var $urlRouterProvider = this.$urlRouterProvider;
        if (state[common_1.abstractKey] || !state.url)
            return;
        $urlRouterProvider.when(state.url, ['$match', '$stateParams', function ($match, $stateParams) {
                if ($state.$current.navigable !== state || !common_1.equalForKeys($match, $stateParams)) {
                    $state.transitionTo(state, $match, { inherit: true, location: false });
                }
            }]);
    };
    return StateQueueManager;
})();
exports.StateQueueManager = StateQueueManager;
//# sourceMappingURL=stateQueueManager.js.map