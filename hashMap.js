import LinkedList from "./linked_list.js";

export default class HashMap {
  constructor(capacity, loadFactor = 0.75) {
    // grow when the HashMap has more than (capacity * loadFactor) entries
    this.capacity = capacity;
    this.loadFactor = loadFactor;
    this.buckets = new Array(this.capacity).fill(null);
    this.entryCount = 0;

    // Proxy `intercepts` index accessing for buckets
    this.buckets = new Proxy(this.buckets, {
      get(target, index) {
        // Allow Symbols (like Symbol.iterator)
        if (typeof index === "symbol") return target[index];
        
        let numIndex = Number(index);
        if (!isNaN(numIndex) && (numIndex < 0 || numIndex >= target.length)) {
          throw new Error("Trying to access index out of bounds");
        }
        return target[index];
      },
    });
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
    if (this.entryCount >= Math.ceil(this.capacity * this.loadFactor)) {
    }

    let index = this._hash(key);
    let bucket = this.buckets[index];

    if (bucket === null) {
      const linkedList = new LinkedList();
      linkedList.append({ key, value });
      this.buckets[index] = linkedList;
      this.entryCount += 1;
    } else {
      // bucket already has a LL and existing key
      let keyExists = bucket.contains({ key, value });
      if (keyExists) {
        let keyIndex = bucket.find({ key, value });
        this.buckets.at(keyIndex).value = { key, value };
      } else {
        // otherwise just append to bucket
        bucket.append({ key, value });
        this.entryCount += 1;
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
    return false;
  }

  remove(key) {
    // Takes a key, if the given key is in the hash map, it should remove the entry with that key and return true.
    // If the key isn’t in the hash map, it should return false
    let index = this._hash(key);
    let currentNode = this.buckets[index].head;
    let nodeIndex = 0;
    while (currentNode) {
      if (currentNode.value.key === key) {
        this.buckets[index].removeAt(nodeIndex);
        this.entryCount -= 1;
        return true;
      } else {
        currentNode = currentNode.nextNode;
        nodeIndex += 1;
      }
    }
    return false;
  }

  length() {
    // Returns the number of stored keys in the hash map.
    return this.entryCount;
  }

  clear() {
    // Removes all entries in the hash map.
    this.buckets = new Array(this.capacity).fill(null);
    this.entryCount = 0;
  }

  keys() {
    // Returns an array containing all the keys inside the hash map.
    const keys = [];
    for (const bucket of this.buckets) {
      if (bucket !== null) {
        let currentNode = bucket.head;
        while (currentNode) {
          keys.push(currentNode.value.key);
          currentNode = currentNode.nextNode;
        }
      }
    }
    return keys;
  }

  values() {
    // Returns an array containing all the values.
    const values = [];
    for (const bucket of this.buckets) {
      if (bucket !== null) {
        let currentNode = bucket.head;
        while (currentNode) {
          values.push(currentNode.value.value);
          currentNode = currentNode.nextNode;
        }
      }
    }
    return values;
  }

  entries() {
    // Returns an array that contains each key, value pair.
    // Example: [[firstKey, firstValue], [secondKey, secondValue]]
    const keys = this.keys();
    const values = this.values();
    const entries = [];
    for (let i = 0; i < keys.length; i++) {
      entries.push([keys[i], values[i]]);
    }
    return entries;
  }
}
