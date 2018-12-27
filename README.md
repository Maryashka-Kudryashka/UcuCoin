<h2>How to setup app first time</h2>
<ol>
    <li>Install mongoDB</li>
    <li>Run mongoDB (for Ubuntu <code>sudo service mongod start</code>)</li>
    <li>Go to mongo shell with <code>mongo</code></li>
    <li>Create DB with <code>use UCUCoinDB</code></li>
    <li>Create collection with <code>db.createCollection('user')</code></li>
    <li>Fill collection with <code>db.user.insertMany( [
  {name: "Oles", surname: "Dobosevych", address: "0xeea8F2465405331C7DB3D1EE441911b75E9EF93F", email: "dobosevych@gmail.com", password: "admin", role: "admin"},
  {name: "Andriy", surname: "Romaniuk", address: "0xe7B24e1546f85B419BddEB6Ed35C66feC091d49D", email: "romaniuk@gmail.com", password: "teacher", role: "teacher"},
  {name: "Oleksiy", surname: "Datsiv", address: "0x2dC1E577852d8929894a5FdBAf0360225e431aCa", email: "datsiv@gmail.com", password: "teacher", role: "teacher"},
  {name: "Arsen", surname: "Senkivskiy", address: "0x77441dBAf10914F6BFfAe25E6023a3dc99872124", email: "senkivskiy@gmail.com", password: "student", role: "student"},
  {name: "Maryana", surname: "Mysak", address: "0xF5B19E164Ed1bB3b8D417d2e9A8C9726A4dD1dc9", email: "mysak@gmail.com", password: "student", role: "student"},
  {name: "Olena", surname: "Skibinska", address: "0x33CbE8A41468A024A72326CC7d58733eAC8f4263", email: "skibinska@gmail.com", password: "student", role: "student"},
  {name: "Yaryna", surname: "Korduba", address: "0x9f9425583104667D2E827ca5888807208d77A5a2", email: "korduba@gmail.com", password: "student", role: "student"},
  {name: "Oles", surname: "Kozak", address: "0x1f725ECEB69F6C847964521D0daC1c952EABA2f2", email: "kozak@gmail.com", password: "student", role: "student"},
  {name: "Olya", surname: "Bakay", address: "0x7d8331DB33767734c2bD534301F3178649E3c688", email: "bakay@gmail.com", password: "student", role: "student"}
] );</code></li>
    <li>Go to direction ./ucu-coin/server run server with <code>node server.js</code></li>
    <li>Go to direction ./ucu-coin and install packages with <code>npm install</code></li>
    <li>Go to direction ./ucu-coin and run application with <code>npm start</code></li>
</ol>

<h2>How to run app</h2>
<ol>
    <li>Run mongoDB (for Ubuntu <code>sudo service mongod start</code>)</li>
    <li>Go to direction ./ucu-coin/server run server with <code>node server.js</code></li>
    <li>(Optional if you have updates in your package of app) Go to direction ./ucu-coin and install packages with <code>npm install</code></li>
    <li>Go to direction ./ucu-coin and run application with <code>npm start</code></li>
</ol>
