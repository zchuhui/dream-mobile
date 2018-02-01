module.exports = {
  "extends": ["eslint:recommended"],                         // 使用推荐的配置
  "rules": {
    // 定义规则，覆盖推荐的配置
    // 规则有三个赋值选项：off(关闭规则)/warn（提醒）/error（报错）
    "no-console": ["error", {                               // 不允许使用console.xx，但可以使用warn/error/info这三个
      "allow": ["warn", "error", "info"]
    }]
  },
  "parser": "babel-eslint",                                  // 指定解析器，分别有：Espree（默认）、Esprima、Babel-ESLint、typescript-eslint-parser
  "parserOptions": {                                         // 解析器配置
    "ecmaVersion": 6,                                        // 设置为 3， 5 (默认)， 6、7 或 8 指定你想要使用的 ECMAScript 版本
    "sourceType": "script"                                   // 设置为 "script" (默认) 或 "module"（如果你的代码是 ECMAScript 模块)。
  },
  "globals": {
    // 全局变量默认是不能用的
    "window": true,                                          // 这里开启window
  },
  "env": {
    // 开发环境，
    "node": true,                                            // 这里使用node
    "browser": false,                                        // 浏览器环境
    "es6": true,
    "mocha": true
  }
};

/* {
  "parser": "babel-eslint",
  "extends": "airbnb",
  "rules": {
    "generator-star-spacing": [0],
    "consistent-return": [0],
    "react/forbid-prop-types": [0],
    "react/jsx-filename-extension": [1, { "extensions": [".js"] }],
    "global-require": [1],
    "import/prefer-default-export": [0],
    "react/jsx-no-bind": [0],
    "react/prop-types": [0],
    "react/prefer-stateless-function": [0],
    "no-else-return": [0],
    "no-restricted-syntax": [0],
    "import/no-extraneous-dependencies": [0],
    "no-use-before-define": [0],
    "jsx-a11y/no-static-element-interactions": [0],
    "no-nested-ternary": [0],
    "arrow-body-style": [0],
    "import/extensions": [0],
    "no-bitwise": [0],
    "no-cond-assign": [0],
    "import/no-unresolved": [0],
    "require-yield": [1]
  },
  "parserOptions": {
    "ecmaFeatures": {
      "experimentalObjectRestSpread": true
    }
  }
}
 */
