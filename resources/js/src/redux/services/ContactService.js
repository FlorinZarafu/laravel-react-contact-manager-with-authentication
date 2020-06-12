import HttpServices from "./HttpServices";

// this function creates new user
export const addNewContact = credentials => {
    const http = new HttpServices();
    console.log(HttpServices);
    let newContact = "user/contact/add";
    credentials.token = localStorage.getItem("user");
    return http
        .postData(credentials, newContact)
        .then(data => {
            console.log(JSON.stringify(data));
            return data;
        })
        .catch(error => console.log(error));
};

//contact/get-all/{token}/{pagination?}
//this function loads paginated contacts
export const loadContacts = page => {
    let token = localStorage.getItem("user");
    let pager = 4;
    let contactsDataUrl;
    if (page == "") {
        contactsDataUrl = "user/contact/get-all/" + token + "/" + pager;
    } else {
        contactsDataUrl =
            "user/contact/get-all/" + token + "/" + pager + "?page=" + page;
    }

    const http = new HttpServices();
    return http
        .getData(contactsDataUrl)
        .then(data => {
            console.log(data);
            return data;
        })
        .catch(error => {
            console.log(error);
        });
};

// search contacts function
export const loadSearchContacts = (search_content, page) => {
    let token = localStorage.getItem("user");
    let pager = 2;
    let contactsDataUrl;
    if (page == "") {
        contactsDataUrl =
            "user/contact/search/" + search_content + "/" + token + "/" + pager;
    } else {
        contactsDataUrl =
            "user/contact/search/" +
            search_content +
            "/" +
            token +
            "/" +
            pager +
            "?page=" +
            page;
    }

    const http = new HttpServices();
    return http
        .getData(contactsDataUrl)
        .then(data => {
            console.log(data);
            return data;
        })
        .catch(error => {
            console.log(error);
            return error;
        });
};

// edit single data
export const loadSingleData = id => {
    if (id == "") {
    } else {
        let getDataUrl = "user/contact/get-single/" + id;
        const http = new HttpServices();
        return http
            .getData(getDataUrl)
            .then(data => {
                console.log(data);
                return data;
            })
            .catch(error => {
                console.log(error);
                return error;
            });
    }
};

// edit single data
export const editSingleData = (data, id) => {
    if (id == "") {
    } else {
        const http = new HttpServices();
        let editDataUrl = "user/contact/update/" + id;
        return http
            .postData(data, editDataUrl)
            .then(data => {
                console.log(data);
                console.log(JSON.stringify(data));
                return data;
            })
            .catch(error => {
                console.log(error);
                return error;
            });
    }
};

// delete contact
export const deleteContact = id => {
    const data = {};

    if (id == "") {
    } else {
        const http = new HttpServices();
        let deleteUrl = "user/contact/delete/" + id;
        return http
            .postData(data, deleteUrl)
            .then(data => {
                console.log(data);
                console.log(JSON.stringify(data));
                return data;
            })
            .catch(error => {
                console.log(error);
                return error;
            });
    }
};
