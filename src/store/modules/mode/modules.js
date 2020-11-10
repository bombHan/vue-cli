/**
 * 包含了子模块的对象，会被合并到 store，大概长这样：
    {
    key: {
        state,
        namespaced?,
        mutations,
        actions?,
        getters?,
        modules?
    },
    ...
    }
 */

/**
 * 在 store 创建之后
 // 注册模块 `myModule`
 store.registerModule('myModule', {
     // ...
 })
 // 注册嵌套模块 `nested/myModule`
 store.registerModule(['nested', 'myModule'], {
     // ...
 })
 * 你也可以使用 store.unregisterModule(moduleName) 来动态卸载模块。注意，你不能使用此方法卸载静态模块（即创建 store 时声明的模块）。
 */