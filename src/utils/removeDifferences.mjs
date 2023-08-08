function deepEqual(obj1, obj2) {
  // Handle primitive types
  if (typeof obj1 !== 'object' || obj1 === null || typeof obj2 !== 'object' || obj2 === null) {
    return obj1 === obj2;
  }

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) return false;

  for (const key of keys1) {
    if (!keys2.includes(key) || !deepEqual(obj1[key], obj2[key])) return false;
  }

  return true;
}

function removeDifferences(obj1, obj2) {
  // If obj1 and obj2 are primitive types and equal, return obj1
  if (typeof obj1 !== 'object' || obj1 === null) {
    return deepEqual(obj1, obj2) ? obj1 : null;
  }

  // If obj1 is an array, handle it as an array
  if (Array.isArray(obj1)) {
    const result = [];
    for (const key of Object.keys(obj1)) {
      if (obj2.hasOwnProperty(key) && deepEqual(obj1[key], obj2[key])) {
        result[key] = removeDifferences(obj1[key], obj2[key]);
      }
    }
    return result;
  }

  // Default object handling
  const result = {};
  for (const key of Object.keys(obj1)) {
    if (obj2.hasOwnProperty(key) && deepEqual(obj1[key], obj2[key])) {
      result[key] = removeDifferences(obj1[key], obj2[key]);
    }
  }
  return result;
}

  export {removeDifferences}
  