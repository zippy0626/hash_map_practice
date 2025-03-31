import LinkedList from "./linked_list.js";

export default class HashMap {
  constructor(capacity, loadFactor = 0.75) {
    // grow when the HashMap has more than (capacity * loadFactor) entries
    this.capacity = capacity;
    this.loadFactor = loadFactor;
    this.buckets = new Array(this.capacity).fill(null);
    this.size = 0;
  }

  _hash(key) {
    let hashCode = 0;
    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * (hashCode + key.charCodeAt(i));
      // ensure that `hashCode` is never bigger than `capacity`s digits
      hashCode %= this.capacity;
    }
    return hashCode;
  }

  _rehash() {
    // double buckets capacity
    this.capacity *= 2;
    let oldBuckets = this.buckets;
    this.buckets = new Array(this.capacity).fill(null);

    // Rehash existing entries
  }

  set(key, value) {
    // check if entries exceed threshold
    if (this.size >= Math.ceil(this.capacity * this.loadFactor)) {
    }

    let index = this._hash(key);
    let bucket = this.buckets[index];

    if (bucket === null) {
      const linkedList = new LinkedList();
      linkedList.append({ key, value });
      this.buckets[index] = linkedList;
      this.size += 1;
    } else {
      // bucket already has a LL and existing key
      let keyExists = bucket.contains({ key, value });
      if (keyExists) {
        let keyIndex = bucket.find({ key, value });
        this.buckets.at(keyIndex).value = { key, value };
      } else {
        // otherwise just append to bucket
        bucket.append({ key, value });
        this.size += 1;
      }
    }
  }

  get(key) {
    // Takes a key and returns the value that is assigned to this key. If a key is not found, return null.
    let index = this._hash(key);
    let currentNode = this.buckets[index].head;
    while (currentNode) {
      if (currentNode.value.key === key) {
        return currentNode.value.value;
      } else {
        currentNode = currentNode.nextNode;
      }
    }
    return null;
  }

  has(key) {
    // Takes a key and returns true or false based on whether or not the key is in the hash map.
    let index = this._hash(key);
    let currentNode = this.buckets[index].head;
    while (currentNode) {
      if (currentNode.value.key === key) {
        return true;
      } else {
        currentNode = currentNode.nextNode;
      }
    }
    return false
  }

  remove(key) {
    // Takes a key, if the given key is in the hash map, it should remove the entry with that key and return true. 
    // If the key isn’t in the hash map, it should return false
    
  }
}
