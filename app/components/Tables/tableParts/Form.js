import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form/immutable';
import css from 'bdf-styles/Form.scss';

class Form extends Component {

  componentDidMount() {
  }
  
  componentDidUpdate() {
  }
  
  render() {
    const {
      handleSubmit,
      children,
      reset,
      pristine,
      submitting,
    } = this.props;
    // const { initValues } = this.props;
    // console.log('initValues');
    // console.log(initValues);
    // this.setState({initialValues: initValues});

    
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <section className={css.bodyForm}>
            {children}
          </section>
          <div className={css.buttonArea}>
            <Button variant="contained" color="secondary" type="submit" disabled={submitting}>
              Submit
            </Button>
            <Button
              type="button"
              disabled={pristine || submitting}
              onClick={reset}
            >
              Reset
            </Button>
          </div>
        </form>
      </div>
    );
  }
}

Form.propTypes = {
  children: PropTypes.node.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  branch: PropTypes.string.isRequired,
  initialValues: PropTypes.object.isRequired,
};

const FormMapped = reduxForm({
  form: 'immutableExample',
  enableReinitialize: true,
})(Form);


const FormMappedInit = connect(
  // state => ({
  //   initialValues: state.getIn([branch, 'formValues'])
  // })
)(FormMapped);


export default FormMappedInit;
