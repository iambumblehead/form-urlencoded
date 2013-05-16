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