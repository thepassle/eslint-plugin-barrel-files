# eslint-plugin-barrel-files

Barrel files are files that just re-export a bunch of things from other files. If you're using a bundler, bundlers usually apply treeshaking and dead code elimination algorithms to remove any unused code.

In many environments however, like test runners, browsers, CDN environments or server side JavaScript runtimes, treeshaking does not get applied. This means that lots of modules get loaded unnecessarily, which can cause significant performance slowdowns.

For more information, I recommend reading [Speeding up the JavaScript ecosystem - The barrel file debacle](https://marvinh.dev/blog/speeding-up-javascript-ecosystem-part-7/)

## Supported Rules

- [barrel-files/avoid-barrel-files](./docs/rules/avoid-barrel-files.md)
- [barrel-files/avoid-namespace-imports](./docs/rules/avoid-namespace-import.md)
- [barrel-files/avoid-re-export-all](./docs/rules/avoid-re-export-all.md)
