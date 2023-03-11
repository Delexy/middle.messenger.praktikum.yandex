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
