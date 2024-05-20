// module.exports = {
//   presets: ['module:@react-native/babel-preset'],
// };

module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: ['@babel/plugin-transform-flow-strip-types'],
  };
};