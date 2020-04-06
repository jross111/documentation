---
id: node-js
title: NodeJS
---

<i class='fab fa-node fa-5x'></i>

## Basic Server

```javascript
//App.js
const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
	res.statusCode = 200;
	res.setHeader('Content-Type', 'text/plain');
	res.end('Hello World');
});

server.listen(port, hostname, () => {
	console.log(`Server running at http://${hostname}:${port}/`);
});
```

Start Server:
`$node app.js`

## Built in Node Modules

### File System (fs)

```javascript
const fs = require('fs');
```

The fs module is used to handle directories and files.
fs operations usually accept filepaths that are specified as either a `string`, `buffer` or `URL` using the `file:` protocol.

#### `readFile()`:

`fs.readFile(path[, options], callback);`

Log the content of a file:

```javascript
const fs = require('fs');
fs.readFile('myFile.txt', 'utf8', function (err, data) {
	if (err) throw err;
	console.log(data);
});
```

#### `chmod()`

### crypto
