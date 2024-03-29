class HttpServices {
    url = "http://127.0.0.1:8000/api";

    postData = async (item, added_url) => {
        const token = await localStorage.getItem("user");
        let requestOptions = {
            method: "POST",
            headers: {
                Authorization: token,
                "Content-type": "Application/json"
            },

            body: JSON.stringify(item)
        };

        return fetch(
            this.url + "/" + added_url,
            requestOptions
        ).then(response => response.json());
    };

    getData = async added_url => {
        const token = await localStorage.getItem("user");
        let requestOptions = {
            method: "GET",
            headers: {
                Authorization: token,
                "Content-type": "application/json"
            }
        };

        return fetch(
            this.url + "/" + added_url,
            requestOptions
        ).then(response => response.json());
    };
}

export default HttpServices;
