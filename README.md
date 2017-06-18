### Description:
This is a fork of [momo](https://github.com/maierfelix/momo). Implementing a different sytnax, aiming to be much
closer to javascript.

### Syntax:

```javascript
function fact(n: i32) : i32 {
  if (n == 0) {
    return 1;
  }
  return (n * fact(n - 1));
};
export function main(a: i32, b: i32) : i32 {
  return (fact(a + b));
};
```


