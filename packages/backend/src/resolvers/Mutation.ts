import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { APP_SECRET, getUserId } from "../utils";

import { IContext, ILink } from "..";

async function signup(_: any, args: any, context: IContext) {
  const password = await bcrypt.hash(args.password, 10);

  const user = await context.prisma.user.create({
    data: { ...args, password },
  });

  const token = jwt.sign({ userId: user.id }, APP_SECRET);

  return {
    user,
    token,
  };
}

async function login(_: any, args: any, context: IContext) {
  const user = await context.prisma.user.findOne({
    where: { email: args.email },
  });
  if (!user) {
    throw new Error("No such user found");
  }

  const valid = await bcrypt.compare(args.password, user.password);
  if (!valid) {
    throw new Error("Invalid password");
  }

  const token = jwt.sign({ userId: user.id }, APP_SECRET);

  return {
    token,
    user,
  };
}

function post(_: any, args: ILink, context: IContext) {
  const userId = getUserId(context);

  const newLink = context.prisma.link.create({
    data: {
      description: args.description,
      url: args.description,
      postedBy: { connect: { id: userId } },
    },
  });

  context.pubsub.publish("NEW_LINK", newLink);

  return newLink;
}

async function vote(_: any, args: any, context: IContext) {
  // 1
  const userId = getUserId(context);

  // 2
  const vote = await context.prisma.vote.findOne({
    where: {
      linkId_userId: {
        linkId: Number(args.linkId),
        userId: userId,
      },
    },
  });

  if (Boolean(vote)) {
    throw new Error(`Already voted for link: ${args.linkId}`);
  }

  // 3
  const newVote = context.prisma.vote.create({
    data: {
      user: { connect: { id: userId } },
      link: { connect: { id: Number(args.linkId) } },
    },
  });
  context.pubsub.publish("NEW_VOTE", newVote);

  return newVote;
}

export { post, signup, login, vote };
