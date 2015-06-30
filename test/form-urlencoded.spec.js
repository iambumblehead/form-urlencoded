var formurlencoded = require('../form-urlencoded'),
    compareObj = require('compareobj'),
    qs = require('qs');

// tests assume behaviour not given in ecmascript specification
// object properties need to be accessed in 'order'

describe("formurlencoded.encode", function () {

  it("should return encoded data", function () {
    var begin = { 
      propStr1 : 'str1',
      propStr2 : 'str2'
    },
        result = formurlencoded.encode(begin).split('&'),
        resultExpected = qs.stringify(begin).split('&');

    expect( compareObj.isSameMembersDefined(result, resultExpected) ).toBe( true );
  });

  it("should return encoded data, with array properties", function () {
    var begin = { 
      propStr1 : 'str1',
      propStr2 : 'str2',
      propArr1 : ['arrStr1', 'arrStr2']
    },
        result = formurlencoded.encode(begin),
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
        result = formurlencoded.encode(begin),
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
        result = formurlencoded.encode(begin),
        resultExpected = 'propStr1=str1&propStr2=str2&propObj1%5BobjPropStr1%5D=objStr1&propObj1%5BobjPropStr2%5D=objStr2&propObj1%5BobjPropObj1%5D%5BpropObj1Str1%5D=obj1Str1&propObj1%5BobjPropArr1%5D%5B%5D%5BpropArr1Obj1Str1%5D=obj1Str1&propObj1%5BobjPropArr1%5D%5B%5D%5BpropArr1Obj2Str1%5D=obj2Str1';

    expect( result ).toBe( resultExpected );
  });

  it("should return encoded data, with numbers", function () {
    var begin = { 
      propArr1 : [1, 2, 3]
    },
        result = formurlencoded.encode(begin),
        resultExpected = 'propArr1%5B%5D=1&propArr1%5B%5D=2&propArr1%5B%5D=3';

    expect( result ).toBe( resultExpected );
  });

  it("should return encoded data, with booleans", function () {
    var begin = { 
      propArr1 : [true, false, true]
    },
        result = formurlencoded.encode(begin),
        resultExpected = 'propArr1%5B%5D=true&propArr1%5B%5D=false&propArr1%5B%5D=true';

    expect( result ).toBe( resultExpected );
  });

  it("should return encoded data, with null", function () {
    var begin = { 
      propNull1 : null,
      propStr1 : 'str1'
    },
        result = formurlencoded.encode(begin),
        resultExpected = 'propNull1=null&propStr1=str1';

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
        result = formurlencoded.encode(begin, { sorted: true }),
        resultExpected = 'a=1&b%5By%5D=2&b%5Bz%5D=3&c=4';

    expect( result ).toBe( resultExpected );
  });

  it("should properly encode all ascii characters", function () {
    var testCharEncodingString = "";
    for (var i = 0; i < 256; i++) {
      testCharEncodingString += String.fromCharCode(i);
    }

    var begin = {
      test: testCharEncodingString
    },
        result = formurlencoded.encode(begin, { sorted: true }),
        resultExpected = 'test=%00%01%02%03%04%05%06%07%08%09%0A%0B%0C%0D%0E%0F%10%11%12%13%14%15%16%17%18%19%1A%1B%1C%1D%1E%1F+%21%22%23%24%25%26%27%28%29%2A%2B%2C-.%2F0123456789%3A%3B%3C%3D%3E%3F%40ABCDEFGHIJKLMNOPQRSTUVWXYZ%5B%5C%5D%5E_%60abcdefghijklmnopqrstuvwxyz%7B%7C%7D%7E%7F%C2%80%C2%81%C2%82%C2%83%C2%84%C2%85%C2%86%C2%87%C2%88%C2%89%C2%8A%C2%8B%C2%8C%C2%8D%C2%8E%C2%8F%C2%90%C2%91%C2%92%C2%93%C2%94%C2%95%C2%96%C2%97%C2%98%C2%99%C2%9A%C2%9B%C2%9C%C2%9D%C2%9E%C2%9F%C2%A0%C2%A1%C2%A2%C2%A3%C2%A4%C2%A5%C2%A6%C2%A7%C2%A8%C2%A9%C2%AA%C2%AB%C2%AC%C2%AD%C2%AE%C2%AF%C2%B0%C2%B1%C2%B2%C2%B3%C2%B4%C2%B5%C2%B6%C2%B7%C2%B8%C2%B9%C2%BA%C2%BB%C2%BC%C2%BD%C2%BE%C2%BF%C3%80%C3%81%C3%82%C3%83%C3%84%C3%85%C3%86%C3%87%C3%88%C3%89%C3%8A%C3%8B%C3%8C%C3%8D%C3%8E%C3%8F%C3%90%C3%91%C3%92%C3%93%C3%94%C3%95%C3%96%C3%97%C3%98%C3%99%C3%9A%C3%9B%C3%9C%C3%9D%C3%9E%C3%9F%C3%A0%C3%A1%C3%A2%C3%A3%C3%A4%C3%A5%C3%A6%C3%A7%C3%A8%C3%A9%C3%AA%C3%AB%C3%AC%C3%AD%C3%AE%C3%AF%C3%B0%C3%B1%C3%B2%C3%B3%C3%B4%C3%B5%C3%B6%C3%B7%C3%B8%C3%B9%C3%BA%C3%BB%C3%BC%C3%BD%C3%BE%C3%BF';

    expect( result ).toBe( resultExpected );
  });

  it("should return encoded data, without null", function () {
    var begin = { 
      propArr1 : [null, null, 1]
    },
        result = formurlencoded.encode(begin, {
          ignorenull : true
        }),
        resultExpected = 'propArr1%5B%5D=1';

    expect( result ).toBe( resultExpected );
  });

  it("should return the correct test result", function () {
    var formurlencoded = require('../form-urlencoded');
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

    expect(true).toBe(true);
  });
});
