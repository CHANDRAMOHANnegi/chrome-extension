window.onload = function () {


    let btnChange = document.getElementById("btnChange");
    let inputBox = document.getElementById("apiUri");
    inputBox.focus();


    btnChange.addEventListener("click", () => {


        let isValid = false;
        let status = document.getElementById('status');

        let re = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;

        if (inputBox.value && !re.test(inputBox.value)) {
            isValid = false;
            status.innerText = "email is invalid"
        } else {
            isValid = inputBox.value;
        }


        if (!isValid) {
            status.innerText = "Enter valid email"
        }


        let uri = inputBox.value;
        const {tabs} = chrome;

        tabs.query({active: true, currentWindow: true}, (tabs) => {
            chrome.pageAction.show(tabs[0].id);

            let url = tabs[0].url;
            url = `https://www.google.com/search?q="${uri}"`;
            let URL = url;

            console.log(URL);


            let dataFound = true;

            //  call  to  backend to verify  email

            isValid && axios({
                url: "http://localhost:3000/email",
                method: 'post',
                data: {
                    email: uri
                },
                header: {
                    "Access-Control-Allow-Origin": "*",
                },
            }).then(backendResponse => {
                const {probability} = backendResponse.data.value;
                console.log(probability);

                if (probability === "100%") {
                    console.log("email not found " + probability);
                    status.innerText = "Email found"
                } else if (probability === "50%") {
                    //************** call  to  google *****************
                    axios({
                        method: 'get',
                        url: URL,
                    }).then(response => {
                        const data = response.data;
                        console.log(response);

                        const string = ["did not match any documents", "No results found for"];
                        string.forEach((string) => {
                            if (data.includes(string)) {
                                alert(data.includes(string));
                                dataFound = false
                            }
                        });
                        status.innerText = "loading...";
                        if (dataFound) {
                            status.innerText = 'Email found';
                        } else {
                            status.innerText = "Email not found"
                        }
                    });
                }


            }).catch(err => console.log(err));

        });
    })
};
