module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'react-native-reanimated/plugin',
      ["module-resolver", {
        "root": ["./"],
        "alias": {
          "@assets": "./assets",
          "@components": "./src/components",
          "@contexts": "./src/contexts",
          "@hooks": "./src/hooks",
          "@screens": "./src/navigation/screens",
          "@navigation": "./src/navigation",
          "@providers": "./src/providers",
          "@services": "./src/services",
        }
      }]
    ],
  };
};
