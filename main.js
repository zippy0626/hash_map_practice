import HashMap from "./hashMap.js";

const hmap = new HashMap(16);

hmap.set('apple', 'red')
hmap.set('banana', 'yellow')
hmap.set('carrot', 'orange')
hmap.set('dog', 'brown')
hmap.set('elephant', 'gray')
hmap.set('frog', 'green')
hmap.set('grape', 'purple')
hmap.set('hat', 'black')
hmap.set('ice cream', 'white')
hmap.set('jacket', 'blue')
hmap.set('kite', 'pink')
hmap.set('lion', 'golden')
hmap.set('moon', 'silver')

console.log("Length:", hmap.length())
console.log(hmap.buckets)
console.log(hmap.entries())