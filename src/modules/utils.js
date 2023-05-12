const bip39 = require("bip39");

class Crypto {
  static generateMnemonic() {
    return bip39.generateMnemonic(256);
  }
}

module.exports = {
  Crypto,
};
