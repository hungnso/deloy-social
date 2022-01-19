require("dotenv").config();
require("express-async-errors");
const SocketSever = require("./SocketServer");
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const { createServer } = require("http");
const AuthRouter = require("./modules/auth");
const ProfileRouter = require("./modules/profile/profile.router");
const { Server } = require("socket.io");
const UserRouter = require("./modules/user");
const FollowRouter = require("./modules/follow");
const PostRouter = require("./modules/post");
const NofifyRouter = require("./modules/notify");
const CommentRouter = require("./modules/comment");
const UploadRouter = require("./modules/upload/upload.router");
const MessageRouter = require("./modules/message/message.router")
const errorHandler = require("./common/errorHandler");

const EventEmitter = require("events");

ioEvent = new EventEmitter();

async function main() {
  await mongoose.connect(process.env.MONGODB_URL);

  console.log("Mongodb connected");
  const app = express();
  const httpServer = createServer(app);
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
    },
  });

  global.io = io;

  ioEvent.on("new-comment", (data) => {
    const { postId, newComment } = data;
    console.log("vao day");
    io.in(`room-post-${postId}`).emit("new-comment", newComment);
  });

  io.on("connection", (socket) => {
    SocketSever(socket);
  });

  app.use(express.json());
  app.use(cors());
  app.use((req, res, next) => {
    req.io = io;
    req.ioEvent = ioEvent;
    next();
  });
  app.use(express.static("public"));

  //Router

  app.use("/api/auth", AuthRouter);
  app.use("/api/profile", ProfileRouter);
  app.use("/api/upload", UploadRouter);
  app.use("/api/posts", PostRouter);
  app.use("/api/comments", CommentRouter);
  app.use("/api/follows", FollowRouter);
  app.use("/api/users", UserRouter);
  app.use("/api/notify", NofifyRouter);
  app.use("/api/message", MessageRouter);
  app.use(errorHandler);

  const port = process.env.PORT || 9000;

  httpServer.listen(port, (err) => {
    if (err) throw err;

    console.log(`Server connected ${port}`);
  });
}

main();
