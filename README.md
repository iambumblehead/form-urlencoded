form-urlencoded
===============
**(c)[Bumblehead][0], 2013** [MIT-license](#license)  

### OVERVIEW:

UNDER DEVELOPMENT USE AT YOUR OWN RISK

form-urlencoded encodes and decodes `x-www-form-urlencoded` string data. It may be used in an ecmascript environment, such as a browser or node.js.

`application/x-www-form-urlencoded` is a string encoding used, primarily, when an HTML form is submitted. The data from a form will be serialised in this format before it is sent to a server.

This format is not [well][1] [defined][2]. Serialising complex data, such as a javascript object, is a beyond current specifications.

[Server][3] [softwares][4] do share methods for handling complex urlencoded data and so there is a "defacto" standard for serializing such data. This is the standard that form-urlencoded follows.

[1]: http://www.w3.org/TR/html4/interact/forms.html#h-17.13.4.1  "w3c"
[2]: http://www.w3.org/TR/html5/forms.html#url-encoded-form-data "w3c"
[3]: http://nodejs.org/api/querystring.html               "node.js qs"
[4]: www.ruby-doc.org/stdlib-1.9.3/libdoc/uri/rdoc/URI.html    "rails"


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
