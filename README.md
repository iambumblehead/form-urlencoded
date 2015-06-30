form-urlencoded
===============
**(c)[Bumblehead][0],[JBlashill][6] 2012-2015** [MIT-license](#license)

form-urlencoded returns `x-www-form-urlencoded` string data. The encoding is often used when an HTML form is submitted. The form data is serialised in this format and sent to a server.

Serialising complex data, such as a javascript object, is beyond [the][1] [specification][2]. [Server][3] [softwares][5] do share methods for handling complex urlencoded data and so there is a "defacto" standard for serializing such data. This is the standard that form-urlencoded follows.


[0]: http://www.bumblehead.com                            "bumblehead"
[1]: http://www.w3.org/TR/html4/interact/forms.html#h-17.13.4.1  "w3c"
[2]: http://www.w3.org/TR/html5/forms.html#url-encoded-form-data "w3c"
[3]: http://nodejs.org/api/querystring.html               "node.js qs"
[4]: www.ruby-doc.org/stdlib-1.9.3/libdoc/uri/rdoc/URI.html    "rails"
[5]: https://github.com/visionmedia/node-querystring           "tj qs"
[6]: https://github.com/jblashill/form-urlencoded          "jblashill"


---------------------------------------------------------
#### <a id="install"></a>install

form-urlencoded may be downloaded directly or installed through `npm`.

```bash
$ npm install form-urlencoded
```

to run tests, use `npm test` from a shell.

```bash
$ npm test
```

---------------------------------------------------------
#### <a id="encode">encode

```javascript
var formurlencoded = require('form-urlencoded');
var obj = {
  propStr1 : 'str1',
  propStr2 : 'str2',
  propStr3 : 'str2',
  propArr : [3, { prop : 'val' }, 1, null, 6],
  propObj : { 
    objPropStr1 : 'objStr1',
    objPropStr2 : null
  }
};

console.log(formurlencoded.encode(obj));

// propStr1=str1&propStr2=str2&propStr3=str2&propArr%5B%5D=
// 3&propArr%5B%5D%5Bprop%5D=val&propArr%5B%5D=1&propArr%5B
// %5D=null&propArr%5B%5D=6&propObj%5BobjPropStr1%5D=objStr
// 1&propObj%5BobjPropStr2%5D=null

console.log(formurlencoded.encode(obj, {
  ignorenull : true,
  sorted : true
}));

// propArr%5B%5D=3&propArr%5B%5D%5Bprop%5D=val&propArr%5B%5
// D=1&propArr%5B%5D=6&propObj%5BobjPropStr1%5D=objStr1&pro
// pStr1=str1&propStr2=str2&propStr3=str2
```
   
---------------------------------------------------------
#### <a id="license">License:

![scrounge](https://github.com/iambumblehead/scroungejs/raw/master/img/hand.png) 

(The MIT License)

Copyright (c) 2012-2015 [Bumblehead][0] <chris@bumblehead.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
   
