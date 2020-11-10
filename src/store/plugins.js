/**
 * plugin应用场景
 * 1、在插件内提交 Mutation
 * 2、生成 State 快照
 * 3、内置 Logger 插件
 */

export const myPlugin = (store) => {
    // 当 store 初始化后调用
    store.subscribe((mutation, state) => {
        // 每次 mutation 之后调用
        // mutation 的格式为 { type, payload }
    })
}

export function myPlugin2() {
    return (store) => {
        store.subscribe((mutation, state) => {
            // 每次 mutation 之后调用
            // mutation 的格式为 { type, payload }
            console.log(mutation.type)
            console.log(mutation.payload)
        })
    }
}

/**
 * 2.5.0 新增
 */
export function myPlugin3() {
    return (store) => {
        store.subscribeAction((action, state) => {
            console.log(action.type)
            console.log(action.payload)
        })
    }
}

/**
 * 3.1.0 新增
 * 默认行为是之前
 */
export function myPlugin4() {
    return (store) => {
        store.subscribeAction({
            before: (action, state) => {
                console.log(`before action ${action.type}`)
            },
            after: (action, state) => {
                console.log(`after action ${action.type}`)
            }
        })
    }
}

/**
 * 官方socket例子
 * @param {*} socket 
 */
export function createWebSocketPlugin(socket) {
    return store => {
        socket.on('data', data => {
            store.commit('receiveData', data)
        })
        store.subscribe(mutation => {
            if (mutation.type === 'UPDATE_DATA') {
                socket.emit('update', mutation.payload)
            }
        })
    }
}