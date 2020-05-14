---
id: js-methods
title: Methods
---

## Arrays

### `push()`

Adds new element to the end of an array, returns length of modified array.

```javascript
let arr = ['red', 'blue', 'green'];
arr.push('black');
// 4
arr;
// ['red', 'blue', 'green', black]
```

### `pop()`

Removes last element of an array, returns the element that was removed.

```javascript
let arr = ['red', 'blue', 'green'];
arr.pop();
// 'green'
arr;
// ['red', 'blue']
```

### `slice()`

## Iterators

Objects that define a sequence. Can return a value when complete.

### `forEach()`

Iterates over each element of an array.

```javascript
let nums = [1, 2, 3];
let sum = 0;
nums.forEach((num) => {
	sum = sum + num;
});
sum;
// sum
```
