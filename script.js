const webserverURL = 'https://server.cashbreaker.dev';

//document.getElementsByTagName('body').addEventListener(onload, logIn())

logIn();
async function logIn() {
    const username = getCookie('username');
    const userToken = getCookie('userToken');

    if (username&&userToken) {
        var xhr = new XMLHttpRequest();
        
        xhr.open('POST',webserverURL, true)
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.setRequestHeader("X-RequestType", "sessionCheck");

        xhr.send(JSON.stringify({
            username: username,
            userToken: userToken
        }));

        xhr.onreadystatechange = async function() {
            if (xhr.readyState === 4) {
                if (xhr.response === 'CORRECT') {
                    document.getElementById('nav-login-section').innerHTML = `<a id="nav-text" href="/profile">${username}</a>`;
                } else {
                    
                }
            }
        }
    }
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function deleteCookie(name) {
    document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
};