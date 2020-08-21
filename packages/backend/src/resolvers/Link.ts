function postedBy(parent: any, _: any, context: any) {
  return context.prisma.link.findOne({ where: { id: parent.id } }).postedBy();
}

function votes(parent: any, _: any, context: any) {
  return context.prisma.link.findOne({ where: { id: parent.id } }).votes();
}

export { postedBy, votes };
