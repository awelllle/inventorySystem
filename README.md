# inventorySystem

This is a Simple Inventory Management System API.
It has endpoints to do the following: <br>

Log purchase receipts<br>

Query DB for total sales in a given month<br>

Query DB for complete product list<br>

Add/modify/delete products<br>

Query DB for monthly sales by product<br>



## Installation 
To install, using:
```
npm install
```

## Endpoints 

All endpoints are in src > api > index.js 

## Development

### Starting
To start, use:
```
npm start
```

### Testing
To run tests, use:

```
npm test
```


## Project Structure
<pre>
<b>src</b>
 ┣ <b>api</b>    // Contains the real code that does the work. Lol
 ┃ ┗ ...  
 ┣ <b>config</b>       // Contains mongodb URLs for development and production, ...
 ┃ ┣ config
 ┃ ┗ ...
 ┣ <b>helpers</b>       // Contains utility files
 ┃ ┣ utility
 ┃ ┗ ...
 ┣ <b>models</b>        //Contains all mongodb models
 ┃ ┗...
 ┣ <b>routes</b>       // Contains route files
 ┃ ┗...
 ┣ index.js
</pre>