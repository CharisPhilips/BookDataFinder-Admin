import React, {useRef, createRef} from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import brand from 'bdf-api/dummy/brand';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { LoginForm } from 'bdf-components';
import styles from 'bdf-components/Forms/user-jss';

const branch = 'auth';

class Login extends React.Component {
  state = {
    valueForm: []
  }

  submitForm(values) {
    var checkRemember = values.get('remember');
    if(checkRemember==null) {
      checkRemember = false;
    }
    this.child.onLoginRequest(values.get('email'), values.get('password'), checkRemember);
    this.gotoHome();
    // setTimeout(() => {
    //   this.props.history.push('./app');
    // }, 1000);
  }

  gotoHome() {
    setTimeout(() => {
      if(this.props.requestCompleted) {
        this.props.history.push('/');
      }
      else {
        this.gotoHome();
      }
    }, 1000);
  }

  render() {
    
    const title = brand.name + ' - Login';
    const description = brand.desc;
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={description} />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta property="twitter:title" content={title} />
          <meta property="twitter:description" content={description} />
        </Helmet>
        <div className={classes.container}>
          <div className={classes.userFormWrap}>
            <LoginForm childRef={ref => (this.child = ref)} onSubmit={(values) => this.submitForm(values)} />
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  force: state,
  requestCompleted: state.getIn([branch, 'requestCompleted'])
});

const mapDispatchToProps = dispatch => ({
});

const LoginMaped = connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(withRouter(Login)));

export default LoginMaped;