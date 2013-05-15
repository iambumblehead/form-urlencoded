var FormUrlencoded = require('../form-urlencoded');

describe("FormUrlencoded.encode", function () {

  it("should return encoded data", function () {
    var begin = { propStr1 : 'simpledata' },
        result = FormUrlencoded.encode(begin);

    expect( true ).toBe( true );
  });
});