function parseQueryToString(params) {
  const query = new URLSearchParams();

  params.forEach((value, key) => {
    if (value != null && value !== "") {
      query.append(key, value);
    }
  });

  return query.toString();
}

export default parseQueryToString;
