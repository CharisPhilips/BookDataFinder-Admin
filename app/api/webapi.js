import axios from 'axios';

//export const LOGIN_URL = 'api/auth/login';
export const SERVER_URL = 'http://localhost:8090/bookDataFinder/api';
//  export const SERVER_URL = 'http://161.117.229.20/bookDataFinder/api';
// export const SERVER_URL = '/bookDataFinder/api';
export const LOGIN_URL = SERVER_URL + '/login';
export const GET_USERS_URL = SERVER_URL + '/users';
export const ADD_USER_URL = SERVER_URL + '/user';
export const UPDATE_USER_URL = SERVER_URL + '/user';
export const DELETE_USER_URL = SERVER_URL + '/user';

export const GET_USERS_BYPAGE_URL = SERVER_URL + '/usersBypage';

export const GET_BOOKCATEGORY_URL = SERVER_URL + '/bookcategories';

export const GET_BOOKS_BYCATEGORY_URL = SERVER_URL + '/booksBycategory';
export const GET_BOOKS_BYCATEGORY_PAGE_URL = SERVER_URL + '/booksBycategoryPage';
export const ADD_BOOK_URL = SERVER_URL + '/book';
export const UPDATE_BOOK_URL = SERVER_URL + '/book';
export const DELETE_BOOK_URL = SERVER_URL + '/book';
export const UPLOAD_BOOK_URL = SERVER_URL + '/bookupload';
export const DOWNLOAD_BOOK_URL = SERVER_URL + '/download';

//user//
export function login(email, password) {
  console.log('login')
  return axios.get(LOGIN_URL, { params: {email:email, password:password}
  });
}

export function getUsers() {
  return axios.get(GET_USERS_URL);
}

export function getUsersByPage(page) {
  return axios.get(GET_USERS_BYPAGE_URL, { params: {page:page.page, rowsPerPage:page.rowsPerPage}
  });
}

export function addUser(data) {
  return axios.post(ADD_USER_URL + '/', data).then(response => {
    return {success: true, data: response.data};
  })
  .catch(error => {
    return {success: false, data: error.response.data.message};
  });
}

export function updateUser(data, id) {
  return axios.put(UPDATE_USER_URL + '/' + id.toString(), data)
  .then(response => {
    return {success: true, data: response.data};
  })
  .catch(error => {
    return {success: false, data: error.response.data.message};
  });
}

export function deleteUser(id) {
  return axios.delete(DELETE_USER_URL + '/' + id.toString())
}

//category
export function getBookCategories() {
  return axios.get(GET_BOOKCATEGORY_URL, { params: {} });
}

//book
export function getBooksByCategory(categoryId) {
  return axios.get(GET_BOOKS_BYCATEGORY_URL + '/' + categoryId.toString());
}

export function getBooksByCategoryPage(page) {
  return axios.get(GET_BOOKS_BYCATEGORY_PAGE_URL, { params: {page:page.page, rowsPerPage:page.rowsPerPage, categoryid: page.categoryid}
  });
}

export function addBook(data) {
  return axios.post(ADD_BOOK_URL + '/', data).then(response => {
    return {success: true, data: response.data};
  })
  .catch(error => {
    return {success: false, data: error.response.data.message};
  });
}

export function updateBook(data, id) {
  return axios.put(UPDATE_BOOK_URL + '/' + id.toString(), data).then(response => {
    return {success: true, data: response.data};
  })
  .catch(error => {
    return {success: false, data: error.response.data.message};
  });
}

export function deleteBook(id) {
  return axios.delete(DELETE_BOOK_URL + '/' + id);
}

export function uploadBookFile(data) {
  return axios.post(UPLOAD_BOOK_URL, data);
}

export function downloadBookFile(data, userid) {
  const bookid = data.get('id');
  const filename = data.get('bookname') + '.pdf';
  axios({url: DOWNLOAD_BOOK_URL, params: {userId:userid, bookId:bookid}, method: 'GET', responseType: 'blob',
  }).then((response) => {
     const url = window.URL.createObjectURL(new Blob([response.data]));
     const link = document.createElement('a');
     link.href = url;
     link.setAttribute('download', filename);
     document.body.appendChild(link);
     link.click();
  });
}