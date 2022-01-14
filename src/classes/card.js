class Card {
  constructor(value, sign, signSwitchable) {
    this.value = value;
    this.sign = sign;
    this.signSwitchable = signSwitchable;
  }
  getValue() {
    return this.value;
  }
  getSign() {
    return this.sign;
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

export default Card;
