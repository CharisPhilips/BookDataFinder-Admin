import React, { Component, Fragment } from 'react';
import { PropTypes } from 'prop-types';
import { Helmet } from 'react-helmet';
import { withStyles } from '@material-ui/core/styles';
import brand from 'bdf-api/dummy/brand';
import CategoryTreeTable from './pages/CategoryTreeTable';
import BookListTable from './pages/BookListTable';
import { PapperBlock } from 'bdf-components';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  root: {
    flexGrow: 1,
  }
});

class BookManage extends Component {

  state = {
    page: null, //0: tree, 1: list
    leaf: null
  };

  getContentPage(page) {
    switch (page) {
      case 1:
        return <BookListTable leaf={this.state.leaf} onBackTreeView={() => this.gotoPdfTree()} />;
      default:
        return <CategoryTreeTable gotoPdfList={(value) => this.gotoPdfList(value)} />;
    }
  }

  gotoPdfList(leaf) {
    this.setState({ page: 1, leaf: leaf });
  }

  gotoPdfTree() {
    this.setState({ page: 2 });
  }

  render() {
    const title = brand.name + ' - Table';
    const description = brand.desc;
    const { page } = this.state;
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
        <PapperBlock whiteBg icon="ios-create-outline" title="Manage Book" desc="This page is to manage book and categories.">
          <Paper className={classes.root} elevation={0}>
            <Fragment>
              <Paper>
                <Fragment>
                  {this.getContentPage(page)}
                </Fragment>
              </Paper>
            </Fragment>
          </Paper>
        </PapperBlock>
      </div>
    );
  }
}

BookManage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BookManage);
