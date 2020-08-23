import React, { useState } from "react";
import gql from "graphql-tag";
import { Mutation, MutationFunction } from "react-apollo";
import { useHistory } from "react-router-dom";

const CreateLink = () => {
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");

  const history = useHistory();

  const POST_MUTATION = gql`
    mutation PostMutation($description: String!, $url: String!) {
      post(description: $description, url: $url) {
        id
        createdAt
        url
        description
      }
    }
  `;

  return (
    <div>
      <div className='flex flex-column mt3'>
        <input
          className='mb2'
          value={description}
          onChange={(e) => setDescription(e.currentTarget.value)}
          type='text'
          placeholder='A description for the link'
        />
        <input
          className='mb2'
          value={url}
          onChange={(e) => setUrl(e.currentTarget.value)}
          type='text'
          placeholder='The URL for the link'
        />
      </div>
      <Mutation
        mutation={POST_MUTATION}
        variables={{ description, url }}
        onCompleted={() => history.push("/")}
      >
        {(postMutation: MutationFunction) => (
          <button onClick={postMutation as any}>Submit</button>
        )}
      </Mutation>
    </div>
  );
};

export default CreateLink;
