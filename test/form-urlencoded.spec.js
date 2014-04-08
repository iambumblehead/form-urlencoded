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
        resultExpected = 'test=%00%01%02%03%04%05%06%07%08%09%0A%0B%0C%0D%0E%0F%10%11%12%13%14%15%16%17%18%19%1A%1B%1C%1D%1E%1F+%21%22%23%24%25%26%27%28%29%2A%2B%2C-.%2F0123456789%3A%3B%3C%3D%3E%3F%40ABCDEFGHIJKLMNOPQRSTUVWXYZ%5B%5C%5D%5E_%60abcdefghijklmnopqrstuvwxyz%7B%7C%7D%7E%7F%80%81%82%83%84%85%86%87%88%89%8A%8B%8C%8D%8E%8F%90%91%92%93%94%95%96%97%98%99%9A%9B%9C%9D%9E%9F%A0%A1%A2%A3%A4%A5%A6%A7%A8%A9%AA%AB%AC%AD%AE%AF%B0%B1%B2%B3%B4%B5%B6%B7%B8%B9%BA%BB%BC%BD%BE%BF%C0%C1%C2%C3%C4%C5%C6%C7%C8%C9%CA%CB%CC%CD%CE%CF%D0%D1%D2%D3%D4%D5%D6%D7%D8%D9%DA%DB%DC%DD%DE%DF%E0%E1%E2%E3%E4%E5%E6%E7%E8%E9%EA%EB%EC%ED%EE%EF%F0%F1%F2%F3%F4%F5%F6%F7%F8%F9%FA%FB%FC%FD%FE%FF';

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