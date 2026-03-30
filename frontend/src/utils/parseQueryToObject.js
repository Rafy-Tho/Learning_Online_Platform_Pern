function parseQueryToObject(params) {
  const result = {};

  for (const [key, value] of params.entries()) {
    if (key.includes("[")) {
      const field = key.split("[")[0]; // rating
      const operator = key.match(/\[(.*)\]/)[1]; // gte

      if (!result[field]) result[field] = {};

      result[field][operator] = isNaN(value) ? value : Number(value);
    } else {
      result[key] = isNaN(value) ? value : Number(value);
    }
  }
  return result;
}

export default parseQueryToObject;
