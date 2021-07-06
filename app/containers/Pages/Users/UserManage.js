import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import brand from 'bdf-api/dummy/brand';
import { withStyles } from '@material-ui/core/styles';
import { PapperBlock } from 'bdf-components';
import EditableUser from './pages/EditableUser';

const styles = ({
  root: {
    flexGrow: 1,
  }
});

class UserManagePage extends Component {
  render() {
    const title = brand.name + ' - Table';
    const description = brand.desc;
    const { classes } = this.props;
    return (
      <div>
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={description} />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta property="twitter:title" content={title} />
          <meta property="twitter:description" content={description} />
        </Helmet>
        <PapperBlock whiteBg icon="ios-create-outline" title="Manage User" desc="This page is to manage users.">
          <div className={classes.root}>
            <EditableUser/>
          </div>
        </PapperBlock>
      </div>
    );
  }
}

UserManagePage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UserManagePage);
