var FormUrlencoded = require('../form-urlencoded'),
    compareObj = require('compareobj'),
    qs = require('qs');

// tests assume behaviour not given in ecmascript specification
// object properties need to be accessed in 'order'

describe("FormUrlencoded.encode", function () {

  it("should return encoded data", function () {
    var begin = { 
      propStr1 : 'str1',
      propStr2 : 'str2'
    },
        result = FormUrlencoded.encode(begin).split('&'),
        resultExpected = qs.stringify(begin).split('&');

    expect( compareObj.isSameMembersDefined(result, resultExpected) ).toBe( true );
  });

  it("should return encoded data, with array properties", function () {
    var begin = { 
      propStr1 : 'str1',
      propStr2 : 'str2',
      propArr1 : ['arrStr1', 'arrStr2']
    },
        result = FormUrlencoded.encode(begin),
        resultExpected = 'propStr1=str1&propStr2=str2&propArr1%5B%5D=arrStr1&propArr1%5B%5D=arrStr2';

    expect( result ).toBe( resultExpected );
  });

  it("should return encoded data, with object properties", function () {
    var begin = { 
      propStr1 : 'str1',
      propStr2 : 'str2',
      propObj1 : { 
        objPropStr1 : 'objStr1', 
        objPropStr2 : 'objStr2'
      }
    },
        result = FormUrlencoded.encode(begin),
        resultExpected = 'propStr1=str1&propStr2=str2&propObj1%5BobjPropStr1%5D=objStr1&propObj1%5BobjPropStr2%5D=objStr2';

    expect( result ).toBe( resultExpected );
  });

  it("should return encoded data, with mixed object and array properties", function () {
    var begin = { 
      propStr1 : 'str1',
      propStr2 : 'str2',
      propObj1 : { 
        objPropStr1 : 'objStr1', 
        objPropStr2 : 'objStr2',
        objPropObj1 : {
          propObj1Str1 : 'obj1Str1'
        },
        objPropArr1 : [{
          propArr1Obj1Str1 : 'obj1Str1'          
        }, {
          propArr1Obj2Str1 : 'obj2Str1'          
        }]
      }
    },
        result = FormUrlencoded.encode(begin),
        resultExpected = 'propStr1=str1&propStr2=str2&propObj1%5BobjPropStr1%5D=objStr1&propObj1%5BobjPropStr2%5D=objStr2&propObj1%5BobjPropObj1%5D%5BpropObj1Str1%5D=obj1Str1&propObj1%5BobjPropArr1%5D%5B%5D%5BpropArr1Obj1Str1%5D=obj1Str1&propObj1%5BobjPropArr1%5D%5B%5D%5BpropArr1Obj2Str1%5D=obj2Str1';

    expect( result ).toBe( resultExpected );
  });

  it("should return encoded data, with numbers", function () {
    var begin = { 
      propArr1 : [1, 2, 3]
    },
        result = FormUrlencoded.encode(begin),
        resultExpected = 'propArr1%5B%5D=1&propArr1%5B%5D=2&propArr1%5B%5D=3';

    expect( result ).toBe( resultExpected );
  });

  it("should return encoded data, with booleans", function () {
    var begin = { 
      propArr1 : [true, false, true]
    },
        result = FormUrlencoded.encode(begin),
        resultExpected = 'propArr1%5B%5D=true&propArr1%5B%5D=false&propArr1%5B%5D=true';

    expect( result ).toBe( resultExpected );
  });

  it("should return encoded data, with properties sorted", function () {
    var begin = {
      c: 4,
      b: {
        z: 3,
        y: 2
      },
      a: 1
    },
        result = FormUrlencoded.encode(begin, { sorted: true }),
        resultExpected = 'a=1&b%5By%5D=2&b%5Bz%5D=3&c=4';

    expect( result ).toBe( resultExpected );
  });

  it("should properly encode any characters matching /([^ a-zA-Z0-9_.-]+)/", function () {
    var testCharEncodingString = "";
    for (var i = 0; i < 256; i++) {
      testCharEncodingString += String.fromCharCode(i);
    }

    var begin = {
      test: testCharEncodingString
    },
        result = FormUrlencoded.encode(begin, { sorted: true }),
        resultExpected = 'test=%00%01%02%03%04%05%06%07%08%09%0a%0b%0c%0d%0e%0f%10%11%12%13%14%15%16%17%18%19%1a%1b%1c%1d%1e%1f %21%22%23%24%25%26%27%28%29%2a%2b%2c-.%2f0123456789%3a%3b%3c%3d%3e%3f%40ABCDEFGHIJKLMNOPQRSTUVWXYZ%5b%5c%5d%5e_%60abcdefghijklmnopqrstuvwxyz%7b%7c%7d%7e%7f%80%81%82%83%84%85%86%87%88%89%8a%8b%8c%8d%8e%8f%90%91%92%93%94%95%96%97%98%99%9a%9b%9c%9d%9e%9f%a0%a1%a2%a3%a4%a5%a6%a7%a8%a9%aa%ab%ac%ad%ae%af%b0%b1%b2%b3%b4%b5%b6%b7%b8%b9%ba%bb%bc%bd%be%bf%c0%c1%c2%c3%c4%c5%c6%c7%c8%c9%ca%cb%cc%cd%ce%cf%d0%d1%d2%d3%d4%d5%d6%d7%d8%d9%da%db%dc%dd%de%df%e0%e1%e2%e3%e4%e5%e6%e7%e8%e9%ea%eb%ec%ed%ee%ef%f0%f1%f2%f3%f4%f5%f6%f7%f8%f9%fa%fb%fc%fd%fe%ff';

    expect( result ).toBe( resultExpected );
  });

  /*
  it("should return encoded data, without null", function () {
    console.log('=======================');
    var begin = { 
      propArr1 : [null, null, 1]
    },
        result = FormUrlencoded.encode(begin),
        resultExpected = 'propArr1%5B%5D=1';

    expect( result ).toBe( resultExpected );
  });
   */
});