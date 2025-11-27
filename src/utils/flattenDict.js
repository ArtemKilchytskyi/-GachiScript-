export function flattenDict(nestedDict) {
  const flat = {};

  for (const category of Object.values(nestedDict)) {
    for (const [key, value] of Object.entries(category)) {
      flat[key] = value;
    }
  }

  return flat;
}
