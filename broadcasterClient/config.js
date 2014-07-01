require.config({
    baseUrl: "/",
    paths: {
        app: "app",
        jquery: "deps/jquery",
        collections: "collections",
        peer: "deps/peer",
        "socket.io-client": '../socket.io/socket.io'
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
        }
    }
});
//# sourceMappingURL=config.js.map
