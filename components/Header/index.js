import React from 'react';
import PropTypes from 'prop-types';
import { graphql, gql } from 'react-apollo';
import Spinner from '../Spinner';
import { Link } from '../../routes';
import { Header as StyledHeader } from './styles';
import connect from './store';

// eslint-disable-next-line
class Header extends React.Component {
  componentWillReceiveProps(props) {
    // logout current loggedin if user on server deleted
    if (!props.data.loading) {
      if (props.data.user === null && props.authenticated) {
        props.actions.logout();
      }
    }
  }

  toggleBurger = () => {
    // document.querySelector('.nav-menu').classList.toggle('is-active');
    const nav = document.getElementById('navMenuTransparent');
    nav.classList.toggle('is-active');
  };

  renderLoggedIn = () => (
    <div>
      <div className="field is-grouped">
        <p className="control">
          <Link route="/profile">
            <a className="button is-primary">
              <span className="icon">
                <i className="fa fa-user-circle" />
              </span>
              <span>{this.props.data.user.firstName}</span>
            </a>
          </Link>
        </p>
        <p className="control">
          <a
            className="button"
            role="presentation"
            onClick={() => this.props.actions.logout()}
          >
            <span className="icon">
              <i className="fa fa-sign-out" />
            </span>
          </a>
        </p>
      </div>
    </div>
  );

  renderLoggedOut = () => (
    <div className="field is-grouped">
      <p className="control">
        <Link route="/signin">
          <a className="button is-primary">
            <span className="icon">
              <i className="fa fa-sign-in" />
            </span>
            <span>Login</span>
          </a>
        </Link>
      </p>
    </div>
  );

  render() {
    const { pathname, authenticated, data } = this.props;
    if (data.loading) {
      return <Spinner />;
    }
    return (
      <StyledHeader>
        <nav className="navbar is-transparent">
          <div className="navbar-brand">
            <Link prefetch route="/" passHref>
              <a className="navbar-item">
                <img
                  src="/static/ChewloungeLogo.png"
                  alt="Logo"
                  width="112"
                  height="28"
                />
              </a>
            </Link>
            <a
              className="navbar-item is-hidden-desktop"
              href="https://facebook.com/chewlounge"
            >
              <span className="icon" style={{ color: '#333' }}>
                <i className="fa fa-facebook" />
              </span>
            </a>

            <a
              className="navbar-item is-hidden-desktop"
              href="https://twitter.com/chewlounge"
            >
              <span className="icon" style={{ color: '#55acee' }}>
                <i className="fa fa-twitter" />
              </span>
            </a>

            <div
              className="navbar-burger burger"
              data-target="navMenuTransparent"
              onClick={this.toggleBurger}
              role="presentation"
            >
              <span />
              <span />
              <span />
            </div>
          </div>

          <div id="navMenuTransparent" className="navbar-menu">
            <div className="navbar-start">
              <Link prefetch href="/" passHref>
                <a
                  className={
                    pathname === '/' && 'nav-item is-active'
                      ? 'nav-item  is-active'
                      : 'nav-item'
                  }
                >
                  หน้าแรก
                </a>
              </Link>

              <Link prefetch href="/about">
                <a
                  className={
                    pathname === '/about' && 'nav-item is-active'
                      ? 'nav-item  is-active'
                      : 'nav-item'
                  }
                >
                  วิธีใช้งาน
                </a>
              </Link>
            </div>

            <div className="navbar-end">
              <div className="navbar-item">
                {authenticated ? this.renderLoggedIn() : this.renderLoggedOut()}
              </div>
            </div>
          </div>
        </nav>
      </StyledHeader>
    );
  }
}

Header.defaultProps = {
  authenticated: false,
  data: null
};

Header.propTypes = {
  pathname: PropTypes.string.isRequired,
  authenticated: PropTypes.bool,
  actions: PropTypes.shape({
    logout: PropTypes.func.isRequired
  }).isRequired,
  data: PropTypes.shape({
    user: PropTypes.object,
    loading: PropTypes.bool
  })
};

const currentUserQuery = gql`
  query currentUser {
    user {
      id
      firstName
    }
  }
`;

const HeaderWithQuery = graphql(currentUserQuery, {
  options: { fetchPolicy: 'network-only' }
});
export default connect(HeaderWithQuery(Header));
