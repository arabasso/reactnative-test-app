module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'react-native-reanimated/plugin',
      ["module-resolver", {
        "root": ["./src"],
        "alias": {
          "@assets": "./src/assets",
          "@components": "./src/components",
          "@contexts": "./src/contexts",
          "@screens": "./src/navigation/screens",
          "@navigation": "./src/navigation",
          "@services": "./src/services",
        }
      }]
    ],
  };
};
