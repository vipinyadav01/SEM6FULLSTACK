const http = require("http");

const PORT = 4000;

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        res.statusCode = 200;
        res.setHeader("Content-Type", "text/plain");
        res.end("Hello, World!\n");
    } else if (req.url === '/home') {
        res.statusCode = 200;
        res.setHeader("Content-Type", "text/html");
        res.end("<h1>HOME PAGE</h1>\n");
    } else {
        res.statusCode = 404;
        res.end("Not Found\n");
    }
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});
