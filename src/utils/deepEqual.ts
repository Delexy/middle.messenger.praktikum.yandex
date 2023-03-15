import { isArrayOrObject } from "./isArrayOrObject";

function deepEqual(lhs: Record<string, any>, rhs: Record<string, any>): boolean {
  if(lhs == undefined || rhs == undefined) {
    return false;
  } 
  
  if (Object.keys(lhs).length !== Object.keys(rhs).length) {
    return false;
  }

  for (const [key, value] of Object.entries(lhs)) {
    const rightValue = rhs[key];
    if (isArrayOrObject(value) && isArrayOrObject(rightValue)) {
      if (deepEqual(value, rightValue)) {
        continue;
      }
      return false;
    }

    if (value !== rightValue) {
      return false;
    }
  }

  return true;
}

export default deepEqual;
