function parseQueryToObject(params) {
  const result = {};

  for (const [key, value] of params.entries()) {
    const parsedValue = isNaN(value) ? value : Number(value);

    if (key.includes("[")) {
      // Handle operators (e.g., duration[gte])
      const field = key.split("[")[0];
      const operator = key.match(/\[(.*)\]/)[1];

      if (!result[field]) result[field] = {};
      result[field][operator] = parsedValue;
    } else {
      // Handle normal + array values
      if (result[key]) {
        // If already exists → convert to array
        if (Array.isArray(result[key])) {
          result[key].push(parsedValue);
        } else {
          result[key] = [result[key], parsedValue];
        }
      } else {
        result[key] = parsedValue;
      }
    }
  }

  return result;
}

export default parseQueryToObject;
