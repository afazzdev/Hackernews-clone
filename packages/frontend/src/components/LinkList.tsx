import React from "react";
import Link from "./Link";
import { Query } from "react-apollo";
import gql from "graphql-tag";

const LinkList = () => {
  const FEED_QUERY = gql`
    {
      feed {
        links {
          id
          url
          description
        }
      }
    }
  `;

  return (
    <Query query={FEED_QUERY}>
      {({ loading, error, data }: any) => {
        if (loading) return <div>Fetching</div>;
        if (error) return <div>Error</div>;

        const linksToRender = data.feed.links;

        return (
          <div>
            {linksToRender.map((link: any) => (
              <Link key={link.id} link={link} />
            ))}
          </div>
        );
      }}
    </Query>
  );
};

export default LinkList;
