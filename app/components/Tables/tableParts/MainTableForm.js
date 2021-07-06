import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import classNames from 'classnames';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import AddIcon from '@material-ui/icons/Add';
import BackIcon from '@material-ui/icons/ArrowBack';
import css from 'bdf-styles/Table.scss';
import RowReadOnly from './RowReadOnly';
import styles from '../tableStyle-jss';

class MainTableForm extends React.Component {

  onHandleChangePage(event, page) {
    if(this.props.handleChangePage!=null) {
      this.props.handleChangePage(page);
    }
  };

  onHandleChangeRowsPerPage(event) {
    if(this.props.handleChangeRowsPerPage!=null) {
      this.props.handleChangeRowsPerPage(event.target.value);
    }
  };

  render() {
    const {
      title,
      classes,
      items,
      removeRow,
      editRow,
      addNew,
      downloadRow,
      anchor,
      branch,
      width,
      rowsPerPage,
      totalCount,
      page
    } = this.props;

    var getItems = null;
    if(downloadRow!=null) {
      getItems = dataArray => dataArray.map((item, index) => (
        <RowReadOnly
          item={item}
          key={index}
          removeRow={() => removeRow(item, branch)}
          editRow={() => editRow(item, branch)}
          downloadRow={() => downloadRow(item, branch)}
          anchor={anchor}
          branch={branch}
        />
      ));
    }
    else {
      getItems = dataArray => dataArray.map((item, index) => (
        <RowReadOnly
          item={item}
          key={index}
          removeRow={() => removeRow(item, branch)}
          editRow={() => editRow(item, branch)}
          anchor={anchor}
          branch={branch}
        />
      ));
    }

    const getHead = dataArray => dataArray.map((item, index) => {
      if (!item.hidden) {
        return (
          <TableCell padding="none" key={index.toString()} width={item.width}>{item.label}</TableCell>
        );
      }
      return false;
    });
    return (
      <div>
        <Toolbar className={classes.toolbar}>
          <div className={classes.title}>
            <Typography variant="h6">{title}</Typography>
          </div>
          {(this.props.backHome!=null) ? (
            <div className={classes.actions}>
            <Tooltip title="Back Item">
              <Button variant="contained" onClick={this.props.backHome} color="primary" className={classes.button}>
                <BackIcon className={classNames(isWidthUp('sm', width) && classes.leftIcon, classes.iconSmall)} />
                {'Back'}
              </Button>
            </Tooltip>
          </div>
          ):
          (
            <></>
          )}
          
          <div className={classes.spacer} />
          <div className={classes.actions}>
            <Tooltip title="Add Item">
              <Button variant="contained" onClick={() => addNew(anchor, branch)} color="secondary" className={classes.button}>
                <AddIcon className={classNames(isWidthUp('sm', width) && classes.leftIcon, classes.iconSmall)} />
                {isWidthUp('sm', width) && 'Add New'}
              </Button>
            </Tooltip>
          </div>
        </Toolbar>
        <div className={classes.rootTable}>
          <Table className={classNames(css.tableCrud, classes.table, classes.stripped)}>
            <TableHead>
              <TableRow>
                { getHead(anchor) }
              </TableRow>
            </TableHead>
            <TableBody>
              {getItems(items)}
            </TableBody>
          </Table>
        </div>

        {(rowsPerPage!=null && rowsPerPage > 0 && page!=null) ? 
          ( <TablePagination
            component="div"
            count={totalCount}
            rowsPerPage={rowsPerPage}
            page={page}
            backIconButtonProps={{
              'aria-label': 'Previous Page',
            }}
            nextIconButtonProps={{
              'aria-label': 'Next Page',
            }}
            onChangePage={(event, page)=>this.onHandleChangePage(event, page)}
            onChangeRowsPerPage={(event)=>this.onHandleChangeRowsPerPage(event)}
          />
          ): (
          <>
          </>
          )}
      </div>
    );
  }
}

MainTableForm.propTypes = {
  title: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  items: PropTypes.object.isRequired,
  anchor: PropTypes.array.isRequired,
  addNew: PropTypes.func.isRequired,
  removeRow: PropTypes.func.isRequired,
  editRow: PropTypes.func.isRequired,
  branch: PropTypes.string.isRequired,
  width: PropTypes.string.isRequired,
  downloadRow: PropTypes.func,
  backHome: PropTypes.func,
  //pagination
  rowsPerPage: PropTypes.number,
  totalCount: PropTypes.number,
  page: PropTypes.number,
  handleChangePage: PropTypes.func,
  handleChangeRowsPerPage: PropTypes.func,
};

export default withWidth()(withStyles(styles)(MainTableForm));
