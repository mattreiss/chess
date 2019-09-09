import AccountModel from './AccountModel';

export default class PlayerModel {
  constructor(account, color, score = 43) {
    this.account = account;
    this.color = color;
    this.score = score;
  }

  toJSON() {
    let jsonString = JSON.stringify({
      account: this.account,
      color: this.color,
      score: this.score
    });
    return JSON.parse(jsonString);
  }

  fromJSON(json) {
    this.account = new AccountModel(json.account);
    this.color = json.color
  }

 }
