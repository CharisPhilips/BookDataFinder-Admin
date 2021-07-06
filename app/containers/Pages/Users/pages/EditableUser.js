import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Field } from 'redux-form/immutable';

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
} from 'bdf-actions/CrudTbUserActions';

// Reducer Branch
const branch = 'crudTableUser';

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

const styles = ({
  root: {
    flexGrow: 1,
  },
  field: {
    width: '100%',
    marginBottom: 20
  },
  fieldBasic: {
    width: '100%',
    marginBottom: 20,
    marginTop: 10
  },
  inlineWrap: {
    display: 'flex',
    flexDirection: 'row'
  }
});

const anchorTable = [
  {
    name: 'id',
    label: 'Id',
    type: 'static',
    initialValue: '',
    hidden: true
  },
  {
    name: 'email',
    label: 'Email',
    type: 'text',
    initialValue: '',
    width: 'auto',
    hidden: false
  },
  {
    name: 'password',
    label: 'password',
    type: 'text',
    initialValue: '',
    width: 'auto',
    hidden: false
  },
  {
    name: 'edited',
    label: '',
    type: 'static',
    initialValue: '',
    hidden: true
  },
  {
    name: 'action',
    label: 'Action',
    type: 'static',
    initialValue: '',
    width: 'auto',
    hidden: false
  },
];

class EditableUser extends Component {

  saveRef = ref => {
    this.ref = ref;
    return this.ref;
  };

  componentDidMount() {
    const { fectchInit, rowsPerPage } = this.props;
    fectchInit(anchorTable, rowsPerPage, branch);
  }

  onHandleChangePage(page) {
    const { fectchData, rowsPerPage } = this.props;
    fectchData(rowsPerPage, page, branch);

  };

  onHandleChangeRowsPerPage(rowsPerPage) {
    const { fectchData, page } = this.props;
    fectchData(rowsPerPage, page, branch);
  };

  render() {
    const {
      classes,
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
      //pagination
      rowsPerPage,
      totalCount,
      page,
    } = this.props;

    return (
      <div>
        <Notification close={() => closeNotif(branch)} message={messageNotif} />
        <div className={classes.rootTable}>
          <CrudTableForm
            // dataInit={dataSource}
            dataTable={dataTable}
            openForm={openForm}
            anchor={anchorTable}
            title="Manage User"
            addNew={addNew}
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
                name="email"
                component={TextFieldRedux}
                placeholder="Email Field"
                label="Email"
                required
                validate={[required, email]}
                ref={this.saveRef}
                className={classes.field}
              />
            </div>
            <div>
              <Field
                name="password"
                component={TextFieldRedux}
                placeholder="Password Field"
                label="Password"
                required
                validate={required}
                ref={this.saveRef}
                className={classes.field}
              />
            </div>
          </CrudTableForm>
        </div>
      </div>
    );
  }
}

renderRadioGroup.propTypes = {
  input: PropTypes.object.isRequired,
};

EditableUser.propTypes = {
  // dataSource: PropTypes.array.isRequired,
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

const CrudUserTableMapped = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditableUser);

export default withStyles(styles)(CrudUserTableMapped);

