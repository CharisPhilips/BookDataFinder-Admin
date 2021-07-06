import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import NotFound from 'containers/Pages/Standalone/NotFoundDedicated';
import Auth from './Auth';
import Application from './Application';
import LoginDedicated from '../Pages/Standalone/LoginDedicated';
import ThemeWrapper, { AppContext } from './ThemeWrapper';
import LogoutMaped from '../Pages/Auths/Logout';
import {authAction} from 'bdf-actions/AuthActions'

window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;

const branch = 'auth';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isAuthenciate: false,
      isLoading: true
    }
  }

  componentDidMount() {
    this.props.onAuthInit();
    setTimeout(() => {
      this.setState({isLoading: false});
    }, 1000);
  }

  render() {
    return (
      (!this.state.isLoading) ? (
        <ThemeWrapper>
          <AppContext.Consumer>
            {(changeMode) => (
              <Switch>
                <Route exact path="/" render={(props) => <Redirect to="/app" />}/>
                <Route path="/login" component={LoginDedicated} />
                <Route path="/logout" component={LogoutMaped} />
                <Route path="/app"
                  render={(props) => <Application {...props} changeMode={changeMode} />}
                />
                <Route component={Auth} />
                <Route component={NotFound} />
              </Switch>
            )}
          </AppContext.Consumer>
        </ThemeWrapper>
      ) : (
        <></>
      )
    );
  }
}

// export default App;

App.propTypes = {
  onAuthInit: PropTypes.func.isRequired,
  authUser: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  force: state,
  authUser: state.getIn([branch, 'authUser'])
});

const mapDispatchToProps = dispatch => ({
  onAuthInit: bindActionCreators(authAction, dispatch)
});

const AppMaped = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default AppMaped;
