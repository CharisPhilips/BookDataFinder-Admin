import React from 'react';
import { PropTypes } from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Dashboard from '../Templates/Dashboard';
import {
  Parent,
  DashboardPage,
  UserManage,
  BookManage,
  Table,
  Error,
  NotFound
} from '../pageListAsync';

const branch = 'auth';

class Application extends React.Component {

  componentDidMount() {
  }

  componentWillReceiveProps() {
    this.checkAuth();
  }
  
  checkAuth() {
    const isAuthenciate = (this.props.authUser!=null && this.props.authUser.email!=null);
    if (!isAuthenciate) {
        this.props.history.push('/login');
    }
  }

  render() {
    const { changeMode, history } = this.props;
    return (
      <Dashboard history={history} changeMode={changeMode}>
        <Switch>
          <Route exact path="/app" component={Parent}  />
          <Route path="/app/user" component={UserManage} />
          <Route path="/app/book" component={BookManage} />
          <Route path="/app/tables" component={Table} />
          <Route path="/app/page-list" component={Parent} />
          <Route path="/app/pages/not-found" component={NotFound} />
          <Route path="/app/pages/error" component={Error} />
          <Route component={NotFound} />
        </Switch>
      </Dashboard>
    );
  }
}

Application.propTypes = {
  changeMode: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  force: state,
  authUser: state.getIn([branch, 'authUser'])
});

const mapDispatchToProps = dispatch => ({
});

const ApplicationMaped = connect(
  mapStateToProps,
  mapDispatchToProps
)(Application);

export default ApplicationMaped;


