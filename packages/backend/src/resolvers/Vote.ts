import { IContext } from "..";

function link(parent: any, _: any, context: IContext) {
  return context.prisma.vote.findOne({ where: { id: parent.id } }).link();
}

function user(parent: any, _: any, context: IContext) {
  return context.prisma.vote.findOne({ where: { id: parent.id } }).user();
}

export { link, user };
