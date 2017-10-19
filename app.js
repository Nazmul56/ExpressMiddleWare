var express = require('express');
var app = express();

app.get('/hello', function(req, res){
   res.send("Hello World!");
});

app.post('/hello', function(req, res){
   res.send("You just called the post method at '/hello'!\n");
});
app.all('/test', function(req, res){
   res.send("HTTP method doesn't have any effect on this route!");
});
app.listen(3000);
