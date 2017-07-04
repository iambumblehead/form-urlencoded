// Filename: formurlencoded.js
// Timestamp: 2017.07.04-14:35:29 (last modified)
// Author(s): Bumblehead (www.bumblehead.com), JBlashill (james@blashill.com), Jumper423 (jump.e.r@yandex.ru)
//
// http://www.w3.org/TR/html5/forms.html#url-encoded-form-data
// input: {one:1,two:2} return: '[one]=1&[two]=2'

module.exports = (data, opts = {}) => {
    const sorted = Boolean(opts.sorted),
        skipIndex = Boolean(opts.skipIndex),
        ignorenull = Boolean(opts.ignorenull),

        // ES5 compatible version of `/[^ !'()~\*]/gu`, https://mothereff.in/regexpu
        encodechar = new RegExp([
            '(?:[\0-\x1F"-&\+-\}\x7F-\uD7FF\uE000-\uFFFF]|',
            '[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|',
            '(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])'
        ].join(''), 'g'),

        encode = value =>
            String(value)
                .replace(encodechar, encodeURIComponent)
                .replace(/ /g, '+')
                .replace(/[!'()~\*]/g, ch =>
                    '%' + ch.charCodeAt().toString(16).slice(-2).toUpperCase()),

        keys = (obj, keyarr = Object.keys(obj)) =>
            sorted ? keyarr.sort() : keyarr,

        filterjoin = arr =>
            arr.filter(e => e).join('&'),

        objnest = (name, obj) =>
            filterjoin(keys(obj).map(key =>
                nest(name + '[' + key + ']', obj[key]))),

        arrnest = (name, arr) =>
            arr.length
                ? filterjoin(arr.map((elem, index) =>
                    skipIndex
                        ? nest(name + '[]', elem)
                        : nest(name + '[' + index + ']', elem)
                ))
                : encode(name + '[]'),

        nest = (name, value) => {
            let type = typeof value,
                f = null;

            if (value === f) {
                f = ignorenull ? f : encode(name) + '=' + f;
            } else if (/string|number|boolean/.test(type)) {
                f = encode(name) + '=' + encode(value);
            } else if (Array.isArray(value)) {
                f = arrnest(name, value);
            } else if (type === 'object') {
                f = objnest(name, value);
            }

            return f;
        };

    return data && filterjoin(keys(data).map(key =>
        nest(key, data[key])
    ));
};
