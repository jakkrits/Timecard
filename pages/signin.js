import React from 'react';
import Auth0Lock from 'auth0-lock';
import SignInForm from '../components/SignInForm';
import withData from '../libraries/withData';
import DefaultCon from '../containers/Default';
import Redirect from '../libraries/redirect';
import checkUserLoggedIn from '../libraries/checkUserLoggedIn';
import { Link } from '../routes';

// eslint-disable-next-line react/prefer-stateless-function
class Signin extends React.Component {
  static async getInitialProps(context, apollo) {
    const userExists = await checkUserLoggedIn(context, apollo);
    if (userExists) {
      Redirect(context, '/');
    }
  }

  componentDidMount() {
    const lock = new Auth0Lock(
      'MFWyRHfY9igbNcxtuKn8b8gHw1QeNmIN',
      'uT3R4E9axhwgcj83VzbWEvoueFENkYa5lUITB8bduZeHiO_GggUWma_rslzjC_q4',
      {
        auth: {
          // redirectUrl: `${location.origin}/login?r=${this.props.pathname}`,
          responseType: 'token'
        },
        allowSignUp: false,
        theme: {
          logo: 'https://image.flaticon.com/icons/svg/325/325559.svg'
        },
        languageDictionary: {
          title: 'ชิวเล้าจ์ล็อกอิน'
        }
      }
    );
    this.lock = lock;

    lock.on('authenticated', result => {
      lock.getUserInfo(result.accessToken, (error, profile) => {
        if (error) {
          console.error('getUserInfo error', error); // eslint-disable-line
          return;
        }
        console.error(JSON.stringify(profile, null, 4)); // eslint-disable-line
        this.signinOrCreateUser(result.idToken, profile);
      });
    });
  }

  triggerLogin = e => {
    e.preventDefault();
    this.lock.show();
  };

  render() {
    return (
      <DefaultCon title="ล็อคอิน" {...this.props}>
        <div className="columns is-centered">
          <div className="column" />
          <div className="column is-4 is-text-centered">
            <SignInForm />
            <br />
            <a
              className="button is-info"
              onClick={this.triggerLogin}
              role="presentation"
            >
              {' '}
              <span className="icon">
                <i className="fa fa-facebook" />
              </span>{' '}
              <span> Login with Facebook </span>
            </a>
            <hr />
            <p>
              ต้องการลงทะเบียน?{' '}
              <Link prefetch route="signup" passHref>
                <a>สมัครใช้งาน</a>
              </Link>
            </p>
          </div>
          <div className="column" />
        </div>
      </DefaultCon>
    );
  }
}

export default withData(Signin);
