export default class Card {
  constructor(value, sign, signSwitchable, kind, special) {
    this.value = value;
    this.sign = sign;
    this.signSwitchable = signSwitchable;
    this.kind = kind;
    this.special = special;
    this.played = false;
  }
  getValue() {
    return this.value;
  }
  getSign() {
    return this.sign;
  }
  getKind() {
    return this.kind;
  }
  getSpecial() {
    return this.special;
  }
  switchSign() {
    if (this.signSwitchable) {
      this.value = -this.value;
      if (this.sign === "plus") {
        this.sign = "minus";
      } else {
        this.sign = "plus";
      }
    }
  }
}
