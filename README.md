# inventorySystem

This is a Simple Inventory Management System API.
It has endpoints to do the following: <br>

- Log purchase receipts<br>

- Query DB for total sales in a given month (For this endpoint and the next, I went ahead to allow them to query between 2 specific dates)<br>

- Query DB for complete product list<br>

- Add/modify/delete products<br>

- Query DB for monthly sales by product<br>



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
I just threw in a test for the add product endpoint.

To run tests, use:

```
npm test
```

## Project Structure
<pre>
<b>src</b>
 ┣ <b>api</b>           // Contains the controller file where all the codes that do the actual work are. 
 ┃ ┗ ...  
 ┣ <b>config</b>       // Contains mongodb URLs for development and production, ...
 ┃ ┣ config
 ┃ ┗ ...
 ┣ <b>helpers</b>     // Contains utility files
 ┃ ┣ utility
 ┃ ┗ ...
 ┣ <b>models</b>     // Contains all mongodb models
 ┃ ┗...
 ┣ <b>routes</b>    // Contains route files
 ┃ ┗...
 ┣ index.js
</pre>
