import React from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import AuthFields from '../AuthFields';
import validate from '../AuthFields/validation';
import connect from './store';

class SignUpForm extends React.Component {
  static propTypes = {
    mutations: PropTypes.shape({
      signUp: PropTypes.func.isRequired
    }).isRequired,
    actions: PropTypes.shape({
      signIn: PropTypes.func.isRequired
    }).isRequired
  };

  state = {
    errors: {},
    serverErrors: {},
    touched: false
  };

  getServerErrors(err) {
    if (err.graphQLErrors) {
      const obj = {};
      obj.message = err.graphQLErrors[0].message;
      this.setState({
        serverErrors: obj
      });
    }
  }

  formFields = [
    { key: 1, attr: { name: 'firstName', type: 'text', label: 'ชื่อจริง' } },
    { key: 2, attr: { name: 'lastName', type: 'text', label: 'นามสกุล' } },
    { key: 3, attr: { name: 'nickName', type: 'text', label: 'ชื่อเล่น' } },
    { key: 4, attr: { name: 'email', type: 'email', label: 'อีเมลล์' } },
    { key: 5, attr: { name: 'password', type: 'password', label: 'พาสเวิร์ด' } }
  ];

  handleTouch = () => {
    this.setState({ touched: true });
  };

  handleChange = e => {
    const fieldValue = e.target.value;
    const fieldName = e.target.name;
    const obj = {};
    obj[fieldName] = fieldValue;
    this.setState(obj);
  };

  handleSubmit(e, valuesPack) {
    e.preventDefault();

    // reset state
    this.setState({
      errors: {},
      serverErrors: {}
    });

    const handleValidate = validate(valuesPack);

    if (handleValidate.touched) {
      this.setState({ touched: handleValidate.touched });
    }
    if (handleValidate.errors) {
      return this.setState({ errors: handleValidate.errors });
    }

    this.props.mutations
      .signUp(valuesPack)
      .then(response => {
        if (response.data.signinUser) {
          this.props.actions.signIn(response.data.signinUser.token);
          Router.replace('/profile');
        } else {
          this.setState({
            errors: response.data.createUser.errors
          });
        }
      })
      .catch(err => {
        this.getServerErrors(err);
      });
  }

  returnErrorMessage = () => {
    if (
      Object.keys(this.state.errors).length === 0 &&
      !this.state.serverErrors.message
    ) {
      return <p />;
    }
    return (
      <span className="tag is-danger">
        {(Object.keys(this.state.errors).length === 0 &&
          this.state.serverErrors.message) ||
          'เกิดข้อผิดพลาด!'}
      </span>
    );
  };

  render() {
    const fields = this.formFields;
    // Packing all the necessary auth field states
    const valuesPack = {};

    fields.map(x => {
      const y = x.attr.name;
      valuesPack[y] = this.state[y];
      return valuesPack;
    });

    return (
      <div>
        <AuthFields
          handleSubmit={e => {
            this.handleSubmit(e, valuesPack);
          }}
          handleChange={this.handleChange}
          fields={fields}
          selectFields="signUpFields"
          errors={this.state.errors}
          touched={this.state.touched}
          handleTouch={this.handleTouch}
        />
        <br />
        {this.returnErrorMessage()}
      </div>
    );
  }
}

export default connect(SignUpForm);
