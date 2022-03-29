const rootRoute = require("./rootRoute");

const routes = [
    {
        path: '/',
        handler: rootRoute
    },
]


const allRoutes = app => {
    routes.forEach(route => {
        app.use(route.path, route.handler);
    })
}

module.exports = allRoutes;