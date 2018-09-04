var hasOwn = {}.hasOwnProperty;
var mods = {};
module.exports = mods;

mods.channels = {
  wx_lite: require('./channels/wx_lite'),
  wx_pub: require('./channels/wx_pub')
};

mods.getChannelModule = function(channel) {
  if (hasOwn.call(mods.channels, channel)) {
    return mods.channels[channel];
  }
  return undefined;
};