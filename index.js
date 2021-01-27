const express = require("express")
const welcomeRouter = require("./welcome/welcome-router")
const messagesRouter = require("./messages/messages-router")
const postsRouter = require('./posts/posts-router');

const server = express()
const port = process.env.PORT || 4000

server.use(express.json())
server.use("/", welcomeRouter)
server.use("/messages", messagesRouter)
server.use("/api/posts",postsRouter);

server.use((err, req, res, next) => {
	console.log(err)
	err.statusCode = err.statusCode ? err.statusCode : 500
	res.status(err.statusCode).json({
		message: err.message,
	})
})

server.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`)
})
