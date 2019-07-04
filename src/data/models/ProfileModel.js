export default class ProfileModel {
  constructor(obj = {}) {
    this.id = obj.id;
    this.name = obj.name;
    this.photoUrl = obj.photoUrl;
  }
}
