/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Control,
  Field,
  Input,
  Icon,
  Label
} from 'bloomer';

const AuthFields = props => {
  const {
    selectFields,
    fields,
    handleTouch,
    handleChange,
    handleSubmit,
    touched,
    errors
  } = props;
  const mapFields = fields.map(field =>
    <div key={field.key}>
      <Input
        name={field.attr.name}
        type={field.attr.type}
        placeholder={field.attr.label}
        onChange={handleChange}
        onFocus={handleTouch}
        style={{ margin: '3px' }}
      />
     <span style={{color: 'red'}}>
       {errors &&
        <div>
          {errors[field.attr.name]}
        </div>} 
     </span>
    </div>
  );
  const authMethod =
    (selectFields === 'signinFields' && 'Sign In') || 'Sign Up';
  return (
        <Field>
          <Label isSize="medium">
            {authMethod}
          </Label>
          <form>
            {mapFields}
            <br />
            <Field isGrouped="centered">
            <Control>
              <Button isColor="primary" onClick={handleSubmit} touched={touched} disabled={!touched}>{authMethod}</Button>
            </Control>
            <Control>
              <Button isLink href="/">Cancel</Button>
            </Control>
          </Field>
          </form>
        </Field>
  );
};

AuthFields.propTypes = {
  selectFields: PropTypes.string.isRequired,
  fields: PropTypes.array.isRequired,
  handleTouch: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  touched: PropTypes.bool.isRequired,
  errors: PropTypes.object.isRequired
};

export default AuthFields;
