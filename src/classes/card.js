let id = 0;

export default class Card {
  constructor(value, sign, signSwitchable, kind, special) {
    this.value = value;
    this.sign = sign;
    this.signSwitchable = signSwitchable;
    this.kind = kind;
    this.special = special;
    this.played = false;
    this.id = id;
    id = id + 1;
  }
  setPlayed(b) {
    this.played = b;
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
  cloneAsPlayed() {
    const out = new Card(
      this.value,
      this.sign,
      this.signSwitchable,
      this.kind,
      this.special
    );
    out.played = true;
    out.id = this.id;
    id = id - 1;
    return out;
  }
  cloneSignSwitched() {
    const out = new Card(
      -this.value,
      this.sign === "plus" ? "minus" : "plus",
      this.signSwitchable,
      this.kind,
      this.special
    );
    out.played = this.played;
    out.id = this.id;
    id = id - 1;
    return out;
  }

  clone() {
    const out = Card(
      this.value,
      this.sign,
      this.signSwitchable,
      this.kind,
      this.special
    );
    out.played = this.played;
    out.id = this.id;
    id = id - 1;
  }
}
