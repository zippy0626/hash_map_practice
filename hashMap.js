import LinkedList from "./linked_list.js";

export default class HashMap {
  constructor(capacity, loadFactor = 0.75) {
    this.capacity = capacity;
    this.loadFactor = loadFactor;
  }

  hash(key) {
    let hashCode = 0;
    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * (hashCode + key.charCodeAt(i));
      // ensure that `hashCode` is never bigger than `capacity`s digits
      hashCode %= this.capacity;
    }
    return hashCode; // or index
  }

  set(key, value) {
    
  }
}
