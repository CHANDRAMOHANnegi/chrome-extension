window.onload = function (e) {

    let btnChange = document.getElementById("btnChange");

    btnChange.addEventListener("click", () => {
        let uri = document.getElementById("apiUri").value;

        const {tabs} = chrome;
        tabs.query({active: true, currentWindow: true}, (tabs) => {
            chrome.pageAction.show(tabs[0].id)
            let url = tabs[0].url;
            url = `https://www.google.com/search?q="${uri}"`;
            let URL = url;
            console.log(URL);

            const string = ["did not match any documents", "No results found for"];

            let datafound = true;

            axios({
                method: 'get',
                url: URL,
            }).then((response) => {
                console.log(response);
                console.log(response.data);

                const data = response.data;

                string.forEach((string) => {
                    if (data.includes(string)) {
                        datafound = false
                    }
                });
                if (datafound) {
                    alert("data found")
                } else {
                    alert("data not found")
                }
            });
        });
    })
};
