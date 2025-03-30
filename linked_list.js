import Node from "./linked_list_node.js";

class LinkedList {
  constructor() {
    // this is where we `store` the actual values
    this.head = null;
    this.tail = null;
  }

  append(value) {
    // Adds a new node to the end of the linked list instance.
    const node = new Node(value);
    if (!this.head) {
      this.head = node;
      this.tail = node;
    } else {
      this.tail.nextNode = node;
      this.tail = this.tail.nextNode;
    }
  }

  prepend(value) {
    // Adds a new node to the beginning of the linked list instance.
    const node = new Node(value);
    if (!this.head) {
      this.head = node;
      this.tail = node;
    } else {
      node.nextNode = this.head;
      this.head = node;
    }
  }

  size() {
    // Returns the size of the linked list instance.
    if (!this.head) return 0;
    if (this.head === this.tail) return 1;

    let currentNode = this.head;
    let count = 0;
    while (currentNode) {
      count += 1;
      currentNode = currentNode.nextNode;
    }

    return count;
  }

  at(index) {
    // Returns the node at the given index.
    if (!this.head) return null;
    let size = this.size();
    if (index < 0) index += size;
    if (index >= size || index < 0) {
      throw new Error("Index exceeds maximum list size");
    }
    let currentNode = this.head;
    for (let i = 0; i < index; i++) {
      currentNode = currentNode.nextNode;
    }
    return currentNode;
  }

  pop() {
    // Removes the last element from the linked list instance.
    if (!this.head) {
      return undefined;
    }
    if (this.head === this.tail) {
      let lastNode = this.head;
      this.head = null;
      this.tail = null;
      return lastNode;
    }
    let lastNode = this.tail;
    let secondLastNode = this.at(-2);
    secondLastNode.nextNode = null;
    this.tail = secondLastNode;
    return lastNode;
  }

  contains(value) {
    // Returns true if the passed value is in the linked list, otherwise returns false.
    if (!this.head) return false;
    let currentNode = this.head;
    while (currentNode) {
      if (currentNode.value === value) {
        return true;
      }
      currentNode = currentNode.nextNode;
    }
    return false;
  }

  find(value) {
    // Returns the index of the node containing value, or null if not found.
    if (!this.head) return null;
    let currentNode = this.head;
    let index = 0;
    while (currentNode) {
      if (currentNode.value === value) {
        return index;
      } else {
        index += 1;
        currentNode = currentNode.nextNode;
      }
    }
    return null;
  }

  toString() {
    // Represents your LinkedList objects as strings,
    // so you can print them out and preview them in the console.
    // The format should be: ( value ) -> ( value ) -> ( value ) -> null
    if (!this.head) return "null";
    let currentNode = this.head;
    let result = [];
    while (currentNode) {
      result.push(`(${currentNode.value})`);
      currentNode = currentNode.nextNode;
    }

    return result.join(" => ") + " => null";
  }

  insertAt(index, value) {
    // Inserts a new node with the provided value at the given index.
    if (index === undefined) {
      throw new Error("Missing insert index");
    }
    // Convert index to positive at start
    let size = this.size();
    if (index < 0) index += size;
    if (index > size || index < 0) {
      throw new Error("Index exceeds maximum list size");
    }
    if (index === 0) {
      this.prepend(value);
    } else if (index === size) {
      this.append(value);
    } else {
      const node = new Node(value);
      let previousNode = this.at(index - 1);
      let currentNode = this.at(index);
      node.nextNode = currentNode;
      previousNode.nextNode = node;
    }
  }

  removeAt(index) {
    // Removes the node at the given index.
    if (index === undefined) {
      throw new Error("Missing remove at index");
    }
    // Convert index to positive at start
    let size = this.size();
    if (index < 0) index += size;
    if (index > size || index < 0) {
      throw new Error("Index exceeds maximum list size");
    }
    if (index === 0) {
      this.head = this.head.nextNode;
    } else if (index + 1 === size) {
      let previousNode = this.at(index - 1);
      previousNode.nextNode = null;
      this.tail = previousNode;
    } else {
      let previousNode = this.at(index - 1);
      let currentNode = this.at(index);
      previousNode.nextNode = currentNode.nextNode;
    }
  }
}

export default LinkedList;
