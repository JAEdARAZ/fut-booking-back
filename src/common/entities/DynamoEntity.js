
export default class DynamoEntity {
  constructor() {}

  generateId() {
    return randomBytes(16).toString('hex');
  }

  toItem() {
    return { ...this };
  }
}