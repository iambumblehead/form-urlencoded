form-urlencoded
===============
**(c)[Bumblehead][0], 2013** [MIT-license](#license)  

### OVERVIEW:

form-urlencoded encodes `x-www-form-urlencoded` string data. It may be used in an ecmascript environment, such as a browser or node.js.

`application/x-www-form-urlencoded` is a string encoding used, primarily, when an HTML form is submitted. The data from a form will be serialised in this format before it is sent to a server.

This format is not [well][1] [defined][2]. Serialising complex data, such as a javascript object, is a beyond current specifications.

[Server][3] [softwares][5] do share methods for handling complex urlencoded data and so there is a "defacto" standard for serializing such data. This is the standard that form-urlencoded follows.

[0]: http://www.bumblehead.com                            "bumblehead"
[1]: http://www.w3.org/TR/html4/interact/forms.html#h-17.13.4.1  "w3c"
[2]: http://www.w3.org/TR/html5/forms.html#url-encoded-form-data "w3c"
[3]: http://nodejs.org/api/querystring.html               "node.js qs"
[4]: www.ruby-doc.org/stdlib-1.9.3/libdoc/uri/rdoc/URI.html    "rails"
[5]: https://github.com/visionmedia/node-querystring           "tj qs"

---------------------------------------------------------
#### <a id="install"></a>INSTALL:

form-urlencoded may be downloaded directly or installed through `npm`.

 * **npm**   

 ```bash
 $ npm install form-urlencoded
 ```

 * **Direct Download**
 
 ```bash  
 $ git clone https://github.com/iambumblehead/form-urlencoded.git
 ```

---------------------------------------------------------
#### <a id="test"></a>TEST:

 to run tests, use `npm test` from a shell.

 ```bash
 $ npm test
 ```

---------------------------------------------------------

#### <a id="get-started">GET STARTED:

 1. **Object encoding**   

 > ```javascript
   var FormUrlencoded = require('form-urlencoded');
   var result = FormUrlencoded.encode({
     propStr1 : 'str1',
     propStr2 : 'str2',
     propObj1 : { 
       objPropStr1 : 'objStr1', 
       objPropStr2 : 'objStr2'
     }   
   });
   console.log(result);
   //propStr1=str1&propStr2=str2&propObj1%5BobjPropStr1%5D=objStr1&propObj1%5BobjPropStr2%5D=objStr2
   ```
   
---------------------------------------------------------

#### <a id="license">License:

(The MIT License)

Copyright (c) 2012 [Bumblehead][0] <chris@bumblehead.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
   