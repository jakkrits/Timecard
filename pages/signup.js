import React from 'react';
import { Columns, Column } from 'bloomer';
import SignUpForm from '../components/SignUpForm';
import withData from '../libraries/withData';
import DefaultCon from '../containers/Default';
import Redirect from '../libraries/redirect';
import checkUserLoggedIn from '../libraries/checkUserLoggedIn';

// eslint-disable-next-line react/prefer-stateless-function
class Signup extends React.Component {
  static async getInitialProps(context, apollo) {
    const userExists = await checkUserLoggedIn(context, apollo);
    if (userExists) {
      Redirect(context, '/');
    }
  }
  render() {
    return (
      <DefaultCon title="ลงทะเบียน" {...this.props}>
        <Columns isCentered>
          <Column />
          <Column isSize="4" hasTextAlign="centered">
            <SignUpForm />
          </Column>
          <Column />
        </Columns>
      </DefaultCon>
    );
  }
}

export default withData(Signup);
