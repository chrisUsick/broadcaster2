require.config({
    baseUrl: "",
    paths: {
        app: "app",
        jquery: "deps/jquery",
        collections: "collections",
        peer: "deps/peer",
        "socket.io-client": 'deps/socket.io',
        "server-config": "./server-config",
        "Broadcast": "broadcast"
    },
    shim: {
        jquery: {
            exports: "$"
        },
        peer: {
            exports: "Peer"
        },
        collections: {
            exports: "collections"
        },
        "socket.io-client": {
            exports: "io"
        },
        "server-config": {
            exports:"config"
        }
    }
})