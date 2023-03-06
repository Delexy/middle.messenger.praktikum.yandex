type StringIndexed = Record<string, any>;

function isPlainObject(value: unknown): value is StringIndexed {
    return typeof value === 'object'
        && value !== null
        && value.constructor === Object
        && Object.prototype.toString.call(value) === '[object Object]';
}

function isArray(value: unknown): value is [] {
    return Array.isArray(value);
}

function isArrayOrObject(value: unknown): value is [] | StringIndexed {
    return isPlainObject(value) || isArray(value);
}


const obj: StringIndexed = {
    key: 1,
    key2: 'test',
    key3: false,
    key4: true,
    key5: [1, 2, 3],
    key6: {a: 1},
    key7: {b: {d: 2}},
};

function queryStringify(data: StringIndexed): string | never {
  const resultStr = [];
  for (const key in data) {
    if (isArrayOrObject(data[key])) {
      Object.entries(data[key]).forEach(([subkey, subval]) => {
        if(isArrayOrObject(subval)) {
          resultStr.push(`${key}[${subkey}]${queryStringify({'': subval})}`);
        } else {
          resultStr.push(`${key}[${subkey}]=${subval}`);
        }
      });
    }
    else {
      resultStr.push(`${key}=${data[key]}`);
    }
  }
  return resultStr.join(`&`);
}

export default queryStringify
