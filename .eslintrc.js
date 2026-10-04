module.exports = { 
  "extends": "airbnb-base",
  "plugins": [
    "react"
  ],
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    }
  },
  "rules": {
    "no-use-before-define":"off",
    "class-methods-use-this":"off",
    "no-underscore-dangle":"off"
  }
};