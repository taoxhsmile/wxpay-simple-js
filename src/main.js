var version = require('./version').v;
var hasOwn = {}.hasOwnProperty;

var WxPaySDK = function () {};

WxPaySDK.prototype.version = version;

module.exports = new WxPaySDK();

var callbacks = require('./callbacks');
var mods = require('./mods');
var stash = require('./stash');
var payment_elements = require('./payment_elements');

WxPaySDK.prototype.createPayment = function (
  chargeJSON, callback
) {
  if (typeof callback === 'function') {
    callbacks.userCallback = callback;
  }

  payment_elements.init(chargeJSON);

  if (!hasOwn.call(payment_elements, 'channel')) {
    callbacks.innerCallback('fail',
      callbacks.error('invalid_charge', 'no_channel'));
    return;
  }

  var channel = payment_elements.channel;
  if (!hasOwn.call(payment_elements, 'credential')) {
    callbacks.innerCallback('fail',
      callbacks.error('invalid_charge', 'no_credential'));
    return;
  }
  if (!payment_elements.credential) {
    callbacks.innerCallback('fail',
      callbacks.error('invalid_credential', 'credential_is_undefined'));
    return;
  }
  if (!hasOwn.call(payment_elements.credential, channel)) {
    callbacks.innerCallback('fail',
      callbacks.error('invalid_credential', 'credential_is_incorrect'));
    return;
  }

  var channelModule = mods.getChannelModule(channel);
  if (typeof channelModule === 'undefined') {
    console.error('channel module "' + channel + '" is undefined');
    callbacks.innerCallback('fail',
      callbacks.error('invalid_channel',
        'channel module "' + channel + '" is undefined')
    );
    return;
  }

  channelModule.handleCharge(payment_elements);
};