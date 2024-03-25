import Router, { RouterContext } from "koa-router";

import * as model from "../models/users.model";

const router = new Router({ prefix: "/api/v1/user" });

const getAll = async (ctx: RouterContext, next: any) => {
  let articles = await model.getAll();
  if (articles.length) {
    ctx.body = articles;
  } else {
    ctx.body = {};
  }
  //ctx.body = articles;
  await next();
};
router.get("/", getAll);

export { router };
