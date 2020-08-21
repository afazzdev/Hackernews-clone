import { IContext } from "..";

function newLinkSubscribe(_: any, __: any, context: IContext) {
  return context.pubsub.asyncIterator("NEW_LINK");
}

const newLink = {
  subscribe: newLinkSubscribe,
  resolve: (payload: any) => {
    return payload;
  },
};

function newVoteSubscribe(_: any, __: any, context: IContext) {
  return context.pubsub.asyncIterator("NEW_VOTE");
}

const newVote = {
  subscribe: newVoteSubscribe,
  resolve: (payload: any) => {
    return payload;
  },
};

export { newLink, newVote };
