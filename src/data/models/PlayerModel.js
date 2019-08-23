export default class PlayerModel {
  constructor(account, color, score = 45) {
    this.account = account;
    this.color = color;
    this.score = score;
  }
}
