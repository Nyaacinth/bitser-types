## bitser-types

Type declarations of [bitser](https://github.com/gvx/bitser), a library helps (de)serialization of Lua values with LuaJIT

**NOTE: This Declaration is Designed to be used with [TypeScriptToLua](https://typescripttolua.github.io), Not Common Typescript**

| Command | Description |
|-|-|
|`yarn add -D bitser-types`| Install this declaration |
|`yarn add gvx/bitser`| Install bitser |

Upon installation this declaration package can be linked to a *tsconfig.json* file.

```json
{
    "compilerOptions": {
        "types": [
            "bitser-types"
        ]
    }
}
```

And used anywhere like this:

```typescript
import * as bitser from "bitser"

let serializedString = bitser.dumps([...some_values])
```

Make sure to append ";./node_modules/?/?.lua" to your package.path to assist where Lua looks for modules. (for love2d you will need to do this with [`love.filesystem.setRequirePath`](https://love2d.org/wiki/love.filesystem.setRequirePath))

```typescript
package.path += ";./node_modules/?/?.lua"

// ... or in love2d (main.ts, conf.ts won't work):

love.filesystem.setRequirePath(love.filesystem.getRequirePath() + ";node_modules/?/?.lua")
```
