import LinkedList from "./linked_list.js";

export default class HashMap {
  constructor(capacity, loadFactor = 0.75) {
    // grow when the HashMap has more than (capacity * loadFactor) entries
    this.capacity = capacity;
    this.loadFactor = loadFactor;
    this.buckets = new Array(capacity).fill(null);
  }

  _hash(key) {
    let hashCode = 0;
    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * (hashCode + key.charCodeAt(i));
      // ensure that `hashCode` is never bigger than `capacity`s digits
      hashCode %= this.capacity;
    }
    return hashCode; // bucket's index
  }

  set(key, value) {
    let index = this._hash(key);
    let bucket = this.buckets[index];

    if (bucket === null) {
      // init a new LL
      const linkedList = new LinkedList();
      linkedList.append({ key, value });
      this.buckets[index] = linkedList;
    } else {
      // bucket already has a LL
      let keyExists = bucket.contains({ key, value });
      if (keyExists) {
        let keyIndex = bucket.find({ key, value });
        this.buckets.at(keyIndex).value = { key, value };
      } else { // otherwise just append to bucket
        bucket.append({ key, value });
      }
    }
  }
}
