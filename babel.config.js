module.exports = {
  env: {
    test: {
      presets: [
        [
          "@babel/env",
          {
            targets: {
              node: true
            }
          }
        ]
      ]
    }
  },
  plugins: ["lodash"],
  presets: [
    [
      "@babel/env",
      {
        modules: false,
        targets: "last 2 versions",
        useBuiltIns: "usage"
      }
    ]
  ]
};
