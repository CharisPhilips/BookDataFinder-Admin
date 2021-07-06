import * as types from './actionConstants';

export const fetchInitRequestAction = (anchor, category, rowsPerPage, branch) => ({
  branch,
  type: `${branch}/${types.FETCH_DATA_INIT_REQUEST}`,
  anchor, 
  category,
  rowsPerPage,
});

export const fetchInitCompleteAction = (dataTable, dataSchema, category, totalCount, branch) => ({
  branch,
  type: `${branch}/${types.FETCH_DATA_INIT_COMPLETE}`,
  dataTable, 
  dataSchema,
  category,
  totalCount,
});

export const fetchRequestAction = (category, rowsPerPage, page, branch) => ({
  branch,
  type: `${branch}/${types.FETCH_DATA_REQUEST}`,
  category,
  rowsPerPage,
  page,
});

export const fetchCompleteAction = (dataTable, totalCount, rowsPerPage, page, branch) => ({
  branch,
  type: `${branch}/${types.FETCH_DATA_COMPLETE}`,
  dataTable, 
  totalCount,
  rowsPerPage,
  page,
});

export const addAction = (anchor, branch) => ({
  branch,
  type: `${branch}/${types.ADD_NEW_FORM}`,
  anchor
});

export const editAction = (item, branch) => ({
  branch,
  type: `${branch}/${types.EDIT_ROW_FORM}`,
  item
});

export const closeAction = branch => ({
  branch,
  type: `${branch}/${types.CLOSE_FORM}`
});

export const submitRequestAction = (newData, branch) => ({
  branch,
  type: `${branch}/${types.SUBMIT_REQUEST}`,
  newData
});

export const submitCompleteAction = (success, data, isAddorUpdate, branch) => ({
  branch,
  type: `${branch}/${types.SUBMIT_COMPLETE}`,
  success: success,
  data: data ,
  isAddorUpdate: isAddorUpdate
})

export const removeAction = (item, branch) => ({
  branch,
  type: `${branch}/${types.REMOVE_ROW_FORM}`,
  item
});

export const closeNotifAction = branch => ({
  branch,
  type: `${branch}/${types.CLOSE_NOTIF}`,
});
