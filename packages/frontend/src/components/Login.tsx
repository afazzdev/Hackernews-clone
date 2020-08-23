import React, { useState } from "react";
import { AUTH_TOKEN } from "./constants";
import gql from "graphql-tag";
import { Mutation, MutationFunction } from "react-apollo";
import { useHistory } from "react-router-dom";

const Login = () => {
  const [state, setState] = useState({
    login: true, // switch between Login and SignUp
    email: "",
    password: "",
    name: "",
  });
  const { login, email, password, name } = state;
  const history = useHistory();

  const SIGNUP_MUTATION = gql`
    mutation SignupMutation(
      $email: String!
      $password: String!
      $name: String!
    ) {
      signup(email: $email, password: $password, name: $name) {
        token
      }
    }
  `;

  const LOGIN_MUTATION = gql`
    mutation LoginMutation($email: String!, $password: String!) {
      login(email: $email, password: $password) {
        token
      }
    }
  `;

  const _confirm = async (data: any) => {
    const { token } = state.login ? data.login : data.signup;
    _saveUserData(token);
    history.push(`/`);
  };

  const _saveUserData = (token: string) => {
    localStorage.setItem(AUTH_TOKEN, token);
  };

  return (
    <div>
      <h4 className='mv3'>{login ? "Login" : "Sign Up"}</h4>
      <div className='flex flex-column'>
        {!login && (
          <input
            value={name}
            onChange={(e) =>
              setState((prev) => ({ ...prev, name: e.target.value }))
            }
            type='text'
            placeholder='Your name'
          />
        )}
        <input
          value={email}
          onChange={(e) =>
            setState((prev) => ({ ...prev, email: e.target.value }))
          }
          type='text'
          placeholder='Your email address'
        />
        <input
          value={password}
          onChange={(e) =>
            setState((prev) => ({ ...prev, password: e.target.value }))
          }
          type='password'
          placeholder='Choose a safe password'
        />
      </div>
      <div className='flex mt3'>
        <Mutation
          mutation={login ? LOGIN_MUTATION : SIGNUP_MUTATION}
          variables={{ email, password, name }}
          onCompleted={(data: any) => _confirm(data)}
        >
          {(mutation: MutationFunction) => (
            <div className='pointer mr2 button' onClick={mutation as any}>
              {login ? "login" : "create account"}
            </div>
          )}
        </Mutation>
        <div
          className='pointer button'
          onClick={() => setState((prev) => ({ ...prev, login: !login }))}
        >
          {login ? "need to create an account?" : "already have an account?"}
        </div>
      </div>
    </div>
  );
};

export default Login;
