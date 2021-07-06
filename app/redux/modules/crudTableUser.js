import { fromJS, List, Map } from 'immutable';
import notif from 'bdf-api/ui/notifMessage';
import { put, takeLatest } from "redux-saga/effects";
import * as webapis  from 'bdf-api/webapi'
import { fetchInitCompleteAction, fetchCompleteAction, submitCompleteAction } from 'bdf-actions/CrudTbUserActions';

import {
  FETCH_DATA_INIT_REQUEST,
  FETCH_DATA_INIT_COMPLETE,
  FETCH_DATA_REQUEST,
  FETCH_DATA_COMPLETE,
  ADD_NEW_FORM,
  CLOSE_FORM,
  SUBMIT_REQUEST,
  SUBMIT_COMPLETE,
  REMOVE_ROW_FORM,
  EDIT_ROW_FORM,
  CLOSE_NOTIF
} from '../../actions/actionConstants';

const initialState = {
  dataTable: List([]),
  formValues: Map(),
  editingId: '',
  showFrm: false,
  notifMsg: '',
  dataSchema: List([]),
  //pagination
  totalCount: 0,
  page: 0,
  rowsPerPage: 10,
};

const initialItem = (dataSchema) => {
  const staticKey = {};
  for (let i = 0; i < dataSchema.length; i++) {
    staticKey[dataSchema[i].name] = dataSchema[i].initialValue;
  }
  return Map(staticKey);
}

let editingIndex = 0;

const branch = 'crudTableUser';
const initialImmutableState = fromJS(initialState);

export default function reducer(state = initialImmutableState, action = {}) {
  switch (action.type) {
    case `${branch}/${FETCH_DATA_INIT_REQUEST}`:
      return state.withMutations((mutableState) => {
        //saga
      });
    case `${branch}/${FETCH_DATA_INIT_COMPLETE}`:
      return state.withMutations((mutableState) => {
        const {dataTable, dataSchema, totalCount} = action;
        mutableState.set('dataTable', dataTable);
        mutableState.set('dataSchema', dataSchema);
        mutableState.set('totalCount', totalCount);
        mutableState.set('formValues', Map());
        mutableState.set('editingId', '');
        mutableState.set('showFrm', false);
        mutableState.set('notifMsg', '');
      });
    case `${branch}/${FETCH_DATA_COMPLETE}`:  
      return state.withMutations((mutableState) => {
        const {dataTable, totalCount, rowsPerPage, page} = action;
        mutableState.set('dataTable', dataTable);
        mutableState.set('totalCount', totalCount);
        mutableState.set('rowsPerPage', rowsPerPage);
        mutableState.set('page', page);
      });
    case `${branch}/${ADD_NEW_FORM}`:
      return state.withMutations((mutableState) => {
        const initial = initialItem(state.get('dataSchema')); 
        mutableState.set('formValues', initial);
        mutableState.set('showFrm', true);
      });
    case `${branch}/${SUBMIT_REQUEST}`:
      //saga
      return state;
    case `${branch}/${SUBMIT_COMPLETE}`:
      const {success, data, isAddorUpdate} = action;
      return state.withMutations((mutableState) => {
        if(success) {
          if(data!=null) {
            if(isAddorUpdate) {
              mutableState
              .update('dataTable', dataTable => dataTable.unshift(data))
              .set('notifMsg', notif.saved);
            }
            else {
              mutableState
              .update('dataTable', dataTable => dataTable.setIn([editingIndex], data))
              .set('notifMsg', notif.updated);
            }
          }
        }
        else {
          mutableState
          .set('notifMsg', data);
        }
        mutableState.set('showFrm', false);
        mutableState.set('formValues', Map());
      });
      case `${branch}/${CLOSE_FORM}`:
        return state.withMutations((mutableState) => {
          mutableState
            .set('formValues', Map())
            .set('showFrm', false);
        });
      case `${branch}/${REMOVE_ROW_FORM}`:
        return state.withMutations((mutableState) => {
          const index = state.get('dataTable').indexOf(action.item);
          mutableState
          .update('dataTable', dataTable => dataTable.splice(index, 1))
          .set('notifMsg', notif.removed);
        });
        case `${branch}/${EDIT_ROW_FORM}`:
        return state.withMutations((mutableState) => {
          editingIndex = state.get('dataTable').indexOf(action.item);
          mutableState
            .set('formValues', action.item)
            .set('editingId', action.item.get('id'))
            .set('showFrm', true);
        });
      case `${branch}/${CLOSE_NOTIF}`:
        return state.withMutations((mutableState) => {
          mutableState.set('notifMsg', '');
        });
    default: {
      return state;
    }
  }
}

export function* sagaCrudTableUser() {
 
  yield takeLatest(`${branch}/${FETCH_DATA_INIT_REQUEST}`, function* crudUserFetchInit(params) {

    const anchor = params.anchor;
    const rowsPerPage = params.rowsPerPage;
    var dataSchema = [];
    for (let i = 0; i < anchor.length; i++) {
      dataSchema[i] = {};
      dataSchema[i].name = anchor[i].name;
      if(dataSchema[i].name=='id') {
        dataSchema[i].initialValue = null;
      }
      else {
        dataSchema[i].initialValue = anchor[i].initialValue;
      }
    }
    const { data: pageData } = yield webapis.getUsersByPage({ page:0, rowsPerPage:rowsPerPage });
    for (let i = 0; i < pageData.result.length; i++) {
      pageData.result[i].edited = false;
    }
    yield put(fetchInitCompleteAction(fromJS(pageData.result), dataSchema, pageData.totalCount, branch));
  });

  yield takeLatest(`${branch}/${FETCH_DATA_REQUEST}`, function* crudUserFetch(params) {
    const rowsPerPage = params.rowsPerPage;
    const page = params.page;
    const { data: pageData } = yield webapis.getUsersByPage({ page:page, rowsPerPage:rowsPerPage });
    yield put(fetchCompleteAction(fromJS(pageData.result), pageData.totalCount, rowsPerPage, page, branch));
  });  

  yield takeLatest(`${branch}/${SUBMIT_REQUEST}`, function* crudUserSubmit(params) {
    if(params.newData!=null) {
      if (params.newData.get('id')!=null && params.newData.get('id') > 0) {
        //update
        const result = yield webapis.updateUser(params.newData, params.newData.get('id'));
        yield put(submitCompleteAction(result.success, fromJS(result.data), false, branch));
      }
      else {
        //add
        const result = yield webapis.addUser(params.newData);
        yield put(submitCompleteAction(result.success, fromJS(result.data), true, branch));
      }
    }
    else {
      yield put(submitCompleteAction(false, "Failed to operation", null, branch));
    }
  });

  yield takeLatest(`${branch}/${REMOVE_ROW_FORM}`, function* crudUserRowDelete(params) {
    const id = params.item.get('id');
    if(id!=null && id > 0) {
      yield webapis.deleteUser(id);
    }
  });

  yield takeLatest(`${branch}/${CLOSE_NOTIF}`, function* crudCloseNotif(params) {
    // yield put (fetchInitRequestAction());
  });
}
