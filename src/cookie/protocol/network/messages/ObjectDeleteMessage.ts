import Message from "./Message";

export default class ObjectDeleteMessage extends Message {
  public objectUID: number;
  public quantity: number;

  constructor(objectUID = 0, quantity = 0) {
    super();
    this.objectUID = objectUID;
    this.quantity = quantity;

  }
}
