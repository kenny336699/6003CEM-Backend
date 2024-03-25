import Koa, { Middleware, ParameterizedContext } from "koa";
import { RouterContext } from "koa-router";
import logger from "koa-logger";
import json from "koa-json";
import bodyParser from "koa-bodyparser";
import koaCors from "koa-cors";
import { router as user } from "./src/routes/users";
const app: Koa = new Koa();

// Middleware
const middleware: Middleware[] = [
  koaCors(), // Use koa-cors middleware
  json(),
  logger(),
  bodyParser(),
];

// Apply each middleware
middleware.forEach((middlewareFunc) => app.use(middlewareFunc));

const errorHandler: Koa.Middleware = async (
  ctx: ParameterizedContext,
  next: () => Promise<any>
) => {
  try {
    await next();
    if (ctx.status === 404) {
      ctx.status = 404;
      ctx.body = { error: "Not Found" };
    }
  } catch (error: any) {
    ctx.status = error.statusCode || 500;
    ctx.body = {
      error: {
        message: error.message || "Internal Server Error",
        stack: process.env.NODE_ENV === "production" ? "🍰" : error.stack,
      },
    };
  }
};

// Use the error handler
app.use(errorHandler);
app.use(user.routes());
// Start server
const port = 10888;
app.listen(port, () => {
  console.log(`Koa server started on port ${port}`);
});
