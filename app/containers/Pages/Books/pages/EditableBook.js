import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Field } from 'redux-form/immutable';
import RadioGroup from '@material-ui/core/RadioGroup';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as webapis from 'bdf-api/webapi'
import styles from '../styles/editbook-jss';
import { CrudTableForm, Notification } from 'bdf-components';

import {
  CheckboxRedux,
  SelectRedux,
  TextFieldRedux,
  SwitchRedux,
} from 'bdf-components/Forms/ReduxFormMUI';

import {
  fetchInitRequestAction,
  fetchRequestAction,
  addAction,
  closeAction,
  submitRequestAction,
  removeAction,
  editAction,
  closeNotifAction
} from 'bdf-actions/CrudTbBookActions';

const branch = 'crudTableBook';

const renderRadioGroup = ({ input, ...rest }) => (
  <RadioGroup
    {...input}
    {...rest}
    valueselected={input.value}
    onChange={(event, value) => input.onChange(value)}
  />
);

// validation functions
const required = value => (value == null ? 'Required' : undefined);
const email = value => (
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email'
    : undefined
);

export const anchorTable = [
  {
    name: 'id',
    label: 'Book Id',
    initialValue: -1,
    hidden: true
  },
  {
    name: 'bookname',
    label: 'Book Name',
    type: 'text',
    initialValue: '',
    width: 'auto',
    hidden: false
  },
  {
    name: 'categoryid',
    type: 'number',
    initialValue: -1,
    width: '0',
    hidden: true
  },
  {
    name: 'edited',
    label: '',
    initialValue: '',
    hidden: true
  },
  {
    name: 'action',
    label: 'Action',
    initialValue: '',
    hidden: false
  },
];

class EditableBook extends Component {

  saveRef = ref => {
    this.ref = ref;
    return this.ref;
  };

  constructor(props) {
    super(props);
    this.state = {
      uploadFile: null,
      isExistId: false
    };
  }

  componentDidMount() {
    const { fectchInit, category, rowsPerPage } = this.props;
    fectchInit(anchorTable, category, rowsPerPage, branch);
  }

  onFileChangeHandler(e) {
    var id = this.ref.props._reduxForm.values.get('id');
    if (id != null && id > 0) {
      if (e.target.files != null && e.target.files.length > 0) {
        const formData = new FormData();
        formData.append('file', e.target.files[0]);
        formData.append('id', id);
        const filename = e.target.files[0].name;
        webapis.uploadBookFile(formData).then(res => {
          console.log("File uploaded successfully.");
          this.setState({
            uploadFilePath: filename
          });
        })
      }
      else {
        this.setState({
          uploadFilePath: null
        });
      }
    }
    else {
      this.setState({
        uploadFilePath: null
      });
    }
  }

  onFileDownloadHandler(item, branch) {
    const userid = this.props.authUser.id;
    webapis.downloadBookFile(item, userid);
  }

  onHandleChangePage(page) {
    const { fectchData, category, rowsPerPage } = this.props;
    fectchData(category, rowsPerPage, page, branch);
  };

  onHandleChangeRowsPerPage(rowsPerPage) {
    const { fectchData, category, page } = this.props;
    fectchData(category, rowsPerPage, page, branch);
  };

  render() {

    const canFileUpload = (this.ref != null && this.ref.props._reduxForm.values.get('id') != null && this.ref.props._reduxForm.values.get('id') > 0);
    const {
      classes,
      category,
      fectchInit,
      addNew,
      closeForm,
      submit,
      removeRow,
      editRow,
      dataTable,
      openForm,
      initialValues,
      closeNotif,
      messageNotif,
      onBackTreeView,
      //pagination
      rowsPerPage,
      totalCount,
      page,
    } = this.props;

    const {
      uploadFilePath
    } = this.state;
    return (
      <div>
        <Notification close={() => { closeNotif(branch); }} message={messageNotif} />
        <div className={classes.crudTableRoot}>
          <CrudTableForm
            // dataInit={dataSource}
            category = {category}
            dataTable={dataTable}
            openForm={openForm}
            anchor={anchorTable}
            title=""
            backHome = {onBackTreeView}
            fectchInit={fectchInit}
            addNew={addNew}
            downloadRow={(item, branch)=>this.onFileDownloadHandler(item, branch)}
            closeForm={closeForm}
            submit={submit}
            removeRow={removeRow}
            editRow={editRow}
            branch={branch}
            initialValues={initialValues}
            //pagination
            rowsPerPage={rowsPerPage}
            totalCount={totalCount}
            page={page}
            handleChangePage={(page)=>this.onHandleChangePage(page)}
            handleChangeRowsPerPage={(rowsPerPage)=>this.onHandleChangeRowsPerPage(rowsPerPage)}
          >
        
            <div>
              <Field
                id="id"
                name="id"
                component={TextFieldRedux}
                // placeholder="book id"
                type="hidden"
                required
                ref={this.saveRef}
              />
              <Field
                id="bookname" 
                name="bookname"
                component={TextFieldRedux}
                placeholder="Book name"
                label="Text Field"
                validate={required}
                className={classes.field}
                required
              />
              <Field
                id="categoryid"
                name="categoryid"
                component={TextFieldRedux}
                type="hidden"
                required
              />
            </div>
            {(canFileUpload) ? (
              <div >
                <input
                  accept="/*"
                  className={classes.inputUpload}
                  id="filePdfBook"
                  type="file"
                  onChange={(e) => this.onFileChangeHandler(e)}
                />
                <label htmlFor="filePdfBook">
                  <Button variant="contained" component="span" id="buttonBookfile" className={classes.upload}>
                    Upload
                </Button>
                  &nbsp;&nbsp;&nbsp;{uploadFilePath}
                </label>
              </div>
            ) : (
              <></>
            )}
          </CrudTableForm>
        </div>
      </div>
    );
  }
}

renderRadioGroup.propTypes = {
  input: PropTypes.object.isRequired,
};

EditableBook.propTypes = {
  // dataSource: PropTypes.array.isRequired,
  category: PropTypes.number.isRequired,
  dataTable: PropTypes.object.isRequired,
  openForm: PropTypes.bool.isRequired,
  classes: PropTypes.object.isRequired,
  fectchInit: PropTypes.func.isRequired,
  fectchData: PropTypes.func.isRequired,
  addNew: PropTypes.func.isRequired,
  closeForm: PropTypes.func.isRequired,
  submit: PropTypes.func.isRequired,
  removeRow: PropTypes.func.isRequired,
  editRow: PropTypes.func.isRequired,
  initialValues: PropTypes.object.isRequired,
  closeNotif: PropTypes.func.isRequired,
  messageNotif: PropTypes.string.isRequired,
  onBackTreeView: PropTypes.func.isRequired,
  //pagination
  rowsPerPage: PropTypes.number,
  totalCount: PropTypes.number,
  page: PropTypes.number,
  handleChangePage: PropTypes.func,
  handleChangeRowsPerPage: PropTypes.func,
};

const mapStateToProps = state => ({
  force: state, // force state from reducer
  initialValues: state.getIn([branch, 'formValues']),
  dataTable: state.getIn([branch, 'dataTable']),
  openForm: state.getIn([branch, 'showFrm']),
  messageNotif: state.getIn([branch, 'notifMsg']),
  //pagination
  totalCount: state.getIn([branch, 'totalCount']),
  rowsPerPage : state.getIn([branch, 'rowsPerPage']),
  page: state.getIn([branch, 'page']),
  authUser: state.getIn(['auth', 'authUser'])
});

const mapDispatchToProps = dispatch => ({
  fectchInit: bindActionCreators(fetchInitRequestAction, dispatch),
  fectchData: bindActionCreators(fetchRequestAction, dispatch),
  addNew: bindActionCreators(addAction, dispatch),
  closeForm: bindActionCreators(closeAction, dispatch),
  submit: bindActionCreators(submitRequestAction, dispatch),
  removeRow: bindActionCreators(removeAction, dispatch),
  editRow: bindActionCreators(editAction, dispatch),
  closeNotif: bindActionCreators(closeNotifAction, dispatch),
});

EditableBook.defaultProps = {
};

const CrudBookTableMapped = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditableBook);

export default withStyles(styles)(CrudBookTableMapped);

