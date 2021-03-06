var AppDispatcher     = require('Shared/Dispatcher');
var EventEmitter      = require('events').EventEmitter;
var FluxCartConstants = require('Store/FluxCartConstants');
var _ = require('underscore');

var _product = {};
var _selected = null;

function loadProductData(data) {
	_product = data[0];
	_selected = data[0].variants[0];
}

function setSelected(index) {
	_selected = _product.variants[index];
}

var ProductStore = _.extend({}, EventEmitter.prototype, {
	getProduct: function () {
		return _product;
	},

	getSelected: function () {
		return _selected;
	}
});

AppDispatcher.register(function (payload) {
	var action = payload.action;
	var text;

	switch(action.actionType) {
		case FluxCartConstants.RECEIVE_DATA:
			loadProductData(action.data);
			break;

		case FluxCartConstants.SET_SELECTED:
			setSelected(action.data);
			break;

		default: 
			return true;
	}

	ProductStore.emit('change');

	return true;
});

module.exports = ProductStore;