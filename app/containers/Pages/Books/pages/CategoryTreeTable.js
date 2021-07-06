import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import openAction from 'bdf-actions/TreeTableActions';
import { TreeTable } from 'bdf-components';
import styles from 'bdf-components/Tables/tableStyle-jss';
import * as webapis from 'bdf-api/webapi'

const branch = 'treeTableCategory';

class CategoryTreeTable extends Component {

  constructor(props) {
    super(props);
    this.state = {
      head: [
        // {
        //   label: 'id',
        // },
        {
          label: 'Category Name',
        },
        // {
        //   label: 'Category Level',
        // },
        // {
        //   label: 'Category Parent',
        // }
      ],
      body: [
      ],
      _isMounted : false
    };
  }

  componentDidMount() {

     webapis.getBookCategories().then(
      (response) => { 
        this.setState({body: response.data.category, _isMounted: true});
      },
      (error) => { 
      }
    );
  }

  componentWillUnmount() {
    this.setState({_isMounted : false});
  }

  render() {
    const {
      arrowMore,
      treeOpen,
      classes,
      toggleTree,
      gotoPdfList
    } = this.props;
    return (
      (this.state._isMounted) ? (
        <div className={classes.rootTable}>
        <TreeTable
          treeOpen={treeOpen}
          toggleTree={toggleTree}
          clickLeaf = {gotoPdfList}
          arrowMore={arrowMore}
          tableHead={this.state.head}
          tableBody={this.state.body}          
          branch={branch}
        />
      </div> 
      ) : (
        <div>Loading</div>
      )
    );
  }
}

CategoryTreeTable.propTypes = {
  classes: PropTypes.object.isRequired,
  treeOpen: PropTypes.object.isRequired,
  arrowMore: PropTypes.object.isRequired,
  toggleTree: PropTypes.func.isRequired,
  gotoPdfList: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  force: state, // force state from reducer
  treeOpen: state.getIn([branch, 'treeOpen']),
  arrowMore: state.getIn([branch, 'arrowMore']),
});

const mapDispatchToProps = dispatch => ({
  toggleTree: bindActionCreators(openAction, dispatch)
});

const CategoryTreeMapped = connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoryTreeTable);

export default withStyles(styles)(CategoryTreeMapped);
