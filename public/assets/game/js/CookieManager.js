const cookies = {
    playername: 'cryptodyssey_playername',
    countryCode: 'cryptodyssey_countryCode',
};

const setCookie = (cookieName, cookieValue, nbDaysToLive) => {
    const date = new Date();
    date.setTime(date.getTime() + (nbDaysToLive * 24 * 60 * 60 * 1000));
    const expires = `expires=${date.toUTCString()}`;

    document.cookie = `${cookieName}=${cookieValue};${expires};path=/;SameSite=Lax;`;
};

const getCookie = (cookieName) => {
    const name = `${cookieName}=`;
    const cookieArray = document.cookie.split(';');
    for (let i = 0; i < cookieArray.length; i += 1) {
        let cookieString = cookieArray[i];

        while (cookieString.charAt(0) === ' ') {
            cookieString = cookieString.substring(1);
        }

        if (cookieString.indexOf(name) === 0) {
            return cookieString.substring(name.length, cookieString.length);
        }
    }
    return '';
};

export default { cookies, setCookie, getCookie };
