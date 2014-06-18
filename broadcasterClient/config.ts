require.config({
    baseUrl: "/",
    paths: {
        app: "app",
        jquery: "deps/jquery",
        collections:"collections"
    },
    shim: {
        jquery: {
            exports: "$"
        }
    }
})