import HashMap from "./hashMap.js";

const hmap = new HashMap(16);

hmap.set("too", "Hello");
hmap.set("oot", "Hi");
hmap.set("cat", "Meow");
hmap.set("act", "Purr");
hmap.set("dog", "Bark");
hmap.set("gob", "Woof");
hmap.set("bat", "Fly");
hmap.set("tab", "Glide");
hmap.set("tip", "Point");
hmap.set("pit", "Drop");
hmap.set("nap", "Rest");
hmap.set("pan", "Cook");

console.log(hmap.buckets)
console.log(hmap.length())
console.log(hmap.keys())
console.log(hmap.values())
console.log(hmap.entries())