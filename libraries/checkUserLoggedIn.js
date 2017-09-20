import { gql } from 'react-apollo';

export default (context, apollo) =>
  apollo
    .query({
      query: gql`
        query getUser {
          user {
            id
          }
        }
      `
    })
    .then(({ data }) => data.user)
    .catch(() => null);
