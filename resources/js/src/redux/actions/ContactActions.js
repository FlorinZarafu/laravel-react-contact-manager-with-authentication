import {
    addNewContact,
    loadContacts,
    loadSearchContacts,
    loadSingleData,
    editSingleData,
    deleteContact
} from "../services/ContactService";

// redux action for creating new user contact
export const addContactUser = credentials => {
    return dispatch => {
        addNewContact(credentials).then(
            res => {
                console.log(res);
                dispatch({ type: "NEW_CONTACT_SUCCESS", res });
            },
            error => {
                dispatch({ type: "NEW_CONTACT_CODE_ERROR", error });
            }
        );
    };
};

// redux action for getting all the contacts
export const loadContactUser = page => {
    return dispatch => {
        loadContacts(page).then(
            res => {
                console.log(res);
                dispatch({ type: "LOAD_CONTACTS", res });
            },
            error => {
                dispatch({ type: "FETCH_CONTACTS_ERROR", error });
                console.log(error);
            }
        );
    };
};

// redux function from getting searched contacts data
export const loadSearchContactUser = (search_content, page) => {
    return dispatch => {
        loadSearchContacts(search_content, page).then(
            res => {
                console.log(res);
                dispatch({ type: "LOAD_CONTACTS_SEARCH", res });
            },
            error => {
                dispatch({ type: "FETCH_CONTACT_ERROR", error });
                console.log(error);
            }
        );
    };
};

// redux function from gettin single data
export const loadSingleDataUser = id => {
    return dispatch => {
        loadSingleData(id).then(
            res => {
                console.log(res);
                dispatch({ type: "LOAD_SINGLE_DATA", res });
            },
            error => {
                dispatch({ type: "FETCH_SINGLE_DATA_ERROR", error });
                console.log(error);
            }
        );
    };
};

// redux function for editing user
export const editContactUser = (credentials, id) => {
    return dispatch => {
        dispatch({ type: "RESTART_ADD_UPDATE_RESPONSE" });
        dispatch({ type: "LOADING" });
        editSingleData(credentials, id).then(
            res => {
                console.log(res);
                dispatch({ type: "UPDATE_CONTACT_SUCCESS", res });
            },
            error => {
                dispatch({ type: "UPDATE_CONTACT_CODE_ERROR", error });
            }
        );
    };
};

// delete contact
export const deleteContactUser = id => {
    return dispatch => {
        deleteContact(id).then(
            res => {
                console.log(res);
                res.id = id;
                dispatch({ type: "DATA_DELETE_SUCCESSFULLY", res });
            },
            error => {
                dispatch({ type: "DATA_DELETE_ERROR", error });
            }
        );
    };
};
