function links(parent: any, _: any, context: any) {
  return context.prisma.user.findOne({ where: { id: parent.id } }).links();
}

export { links };
