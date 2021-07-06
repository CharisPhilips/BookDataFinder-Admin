import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Ionicon from 'react-ionicons';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  hideRow: {
    display: 'none'
  },
  anchor: {
    cursor: 'pointer'
  },
  icon: {
    top: -2,
    position: 'relative',
    left: -5,
    '& svg': {
      fill: theme.palette.text.primary
    }
  }
});

let RenderRow = props => {
  const {
    classes,
    toggleTree,
    clickLeaf,
    treeOpen,
    parentKey,
    item,
    parent,
    arrowMore,
    expandIcon,
    collapseIcon,
    leafIcon,
    branch
  } = props;

  var keyID = "";
  if(parentKey!=null && parentKey.length > 0) {
    keyID = parentKey + '_' + item.id.toString();
  }
  else {
    keyID = item.id.toString();
  }

  const itemLevel = item.categorylevel;

  const renderIconMore = (iconName) => {
    if (iconName !== 'arrow') {
      return (
        <span className={classes.icon}>
          <Ionicon icon={iconName} />
        </span>
      );
    }
    return (
      <span className={classes.icon}>
        <Ionicon icon="ios-arrow-down" />
      </span>
    );
  };

  const renderIconLess = (iconName) => {
    if (iconName !== 'arrow') {
      return (
        <span className={classes.icon}>
          <Ionicon icon={iconName} />
        </span>
      );
    }
    return (
      <span className={classes.icon}>
        <Ionicon icon="ios-arrow-forward" />
      </span>
    );
  };

  const renderCell = (value, parentCell, colIndex, level) => {
    if(colIndex==0) {
      if(parentCell) {
        return (
          <TableCell 
            style={{ paddingLeft: (level - 1) * 20 }}
          >
            {arrowMore.indexOf(keyID) > -1 ? renderIconMore(collapseIcon) : renderIconLess(expandIcon)}
            {value}
          </TableCell>
        );
      }
      else {
        return (
          <TableCell style={{ paddingLeft: (level - 1) * 20 }}>
            {renderIconMore(leafIcon)}
            {value}
          </TableCell>
        );
      }
    }
    else {
      return (
        <TableCell padding="default" >{value}</TableCell>
      );
    }
  }
  
  const row = parent ? (    
    <TableRow
      key={item.id}
      className={treeOpen.indexOf(keyID) < 0 && itemLevel > 2 ? classes.hideRow : classes.anchor}
      onClick={() => toggleTree(keyID, item.category, branch)}
    >
      {renderCell(item.categoryname, true, 0, item.categorylevel)}
      {/* {renderCell(item.categoryname, true, 1)} */}
      {/* {renderCell(item.categorylevel, true, 2)}
      {renderCell(item.categoryparentid, true ,3)} */}
    </TableRow>
  ) : (
    <TableRow
      key={item.id}
      className={treeOpen.indexOf(keyID) < 0 && itemLevel > 2 ? classes.hideRow : ''}
      onClick={() => {
        clickLeaf(item.id)
      }
      }
    >
      {renderCell(item.categoryname, false, 0, item.categorylevel)}
      {/* {renderCell(item.categoryname, false, 1)} */}
      {/* {renderCell(item.categorylevel, false, 2)}
      {renderCell(item.categoryparentid, false, 3)} */}
    </TableRow>
  );

  return [row];
};

RenderRow.propTypes = {
  classes: PropTypes.object.isRequired,
  item: PropTypes.object.isRequired,
  parent: PropTypes.bool.isRequired,
  toggleTree: PropTypes.func.isRequired,
  clickLeaf: PropTypes.func.isRequired,
  treeOpen: PropTypes.object.isRequired,
  arrowMore: PropTypes.object.isRequired,
  branch: PropTypes.string.isRequired,
  parentKey: PropTypes.string.isRequired,
  expandIcon: PropTypes.string.isRequired,
  collapseIcon: PropTypes.string.isRequired,
  leafIcon: PropTypes.string.isRequired
};

RenderRow = withStyles(styles)(RenderRow);

class TreeTable extends React.Component {
  render() {
    const {
      classes,
      expandIcon,
      collapseIcon,
      leafIcon,
      treeOpen,
      arrowMore,
      toggleTree,
      clickLeaf,
      branch
    } = this.props;
    const parentRow = true;
 
    const getData = (dataArray, parentKey) => {
      var result = [];
      const arrayLength = dataArray.length;
      for(let index = 0; index < arrayLength; index++) {
        var item = dataArray[index];

        var childParentKey = "";
        
        if(parentKey==null || item.categorylevel < 2) {
          childParentKey = "";
        }
        else if(parentKey.length < 1) {
          childParentKey = item.categoryparentid.toString();
        }
        else {
          childParentKey = parentKey + '_' + item.categoryparentid.toString();
        }
      
        if (item.category!=null && item.category.length > 0) {
          result.push(
            [
            <RenderRow
                expandIcon={expandIcon}
                collapseIcon={collapseIcon}
                leafIcon={leafIcon}
                treeOpen={treeOpen}
                arrowMore={arrowMore}
                toggleTree={toggleTree}
                clickLeaf={clickLeaf}
                item={item}
                key={(item.id).toString()}
                parentKey={childParentKey}
                parent={parentRow}
                branch={branch}
              />,
              getData(item.category, childParentKey)
            ]
          );
        }
        else {
          result.push(
            <RenderRow
              expandIcon={expandIcon}
              collapseIcon={collapseIcon}
              leafIcon={leafIcon}
              item={item}
              treeOpen={treeOpen}
              key={(item.id).toString()}
              arrowMore={arrowMore}
              toggleTree={toggleTree}
              clickLeaf={clickLeaf}
              parentKey={childParentKey}
              branch={branch}
              parent={false}
            />
          );
        }
      }
      return result;
    }

    const getHead = dataArray => dataArray.map((item, index) => <TableCell padding="default" key={index.toString()}>{item.label}</TableCell>);

    return (
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            { getHead(this.props.tableHead) }
          </TableRow>
        </TableHead>
        <TableBody>
          { getData(this.props.tableBody, null) }
        </TableBody>
      </Table>
    );
  }
}

TreeTable.propTypes = {
  classes: PropTypes.object.isRequired,
  tableHead: PropTypes.array.isRequired,
  tableBody: PropTypes.array.isRequired,
  treeOpen: PropTypes.object.isRequired,
  toggleTree: PropTypes.func.isRequired,
  clickLeaf: PropTypes.func.isRequired,
  arrowMore: PropTypes.object.isRequired,
  branch: PropTypes.string.isRequired,
  expandIcon: PropTypes.string,
  collapseIcon: PropTypes.string,
  leafIcon: PropTypes.string
};

TreeTable.defaultProps = {
  expandIcon: 'md-folder-open',
  collapseIcon: 'ios-folder-open-outline',
  leafIcon: 'md-folder',
};

export default withStyles(styles)(TreeTable);
