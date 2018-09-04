var callbacks = require('./callbacks');
var hasOwn = {}.hasOwnProperty;

module.exports = {
  channel: null,
  credential: {},

  init: function (charge_or_order) {
    var charge;
    if (typeof charge_or_order === 'string') {
      try {
        charge = JSON.parse(charge_or_order);
      } catch (err) {
        callbacks.innerCallback('fail',
          callbacks.error('json_decode_fail', err));
        return;
      }
    } else {
      charge = charge_or_order;
    }

    if (typeof charge === 'undefined') {
      callbacks.innerCallback('fail', callbacks.error('json_decode_fail'));
      return;
    }

    for (var key in this) {
      if (hasOwn.call(charge, key)) {
        this[key] = charge[key];
      }
    }
    return this;
  },

  clear: function () {
    for (var key in this) {
      if (typeof this[key] !== 'function') {
        this[key] = null;
      }
    }
  }
};