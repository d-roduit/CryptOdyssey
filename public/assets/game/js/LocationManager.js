import countriesInfo from './countriesInfo.js';

const reverseGeocodingAPI = 'https://api.bigdatacloud.net/data/reverse-geocode-client';

// class UserLocation {
//     constructor() {
//         this.x = x;

//     }

//     static distance(a, b) {
//         const dx = a.x - b.x;
//         const dy = a.y - b.y;
//         return Math.hypot(dx, dy);
//     }
// }

const getUserPosition = () => {
    console.log('getUserPosition start');

    return new Promise((resolve) => {
        let userPosition = null;

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                userPosition = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                };

                console.log('getUserPosition end');
                resolve(userPosition);
            }, (err) => {
                console.log(`Geolocation error: ${err.message}. Falling back on IP-based geolocation...`);
                resolve(userPosition);
            });
        } else {
            console.log('navigator.geolocation API is not available in your browser...');
            resolve(userPosition);
        }
    });
};

const getUserCountryCode = async () => {
    console.log('before getUserPosition()');
    const userCurrentPosition = await getUserPosition();
    console.log('after getUserPosition()');
    console.log(`userCurrentPosition: ${userCurrentPosition}`);

    // If no parameter is given, the reverse geocoding API will fallback on an IP-based geolocation.
    // It is the reason why we only assign a value to this variable if we can access the
    // navigator.geolocation API.
    let locationParameters = '';

    if (userCurrentPosition != null) {
        const { latitude, longitude } = userCurrentPosition;
        const localityLanguage = 'en';

        locationParameters = `?latitude=${latitude}&longitude=${longitude}&localityLanguage=${localityLanguage}`;
    }

    let countryCode = 'DEFAULT';

    try {
        const reverseGeocodingResponse = await fetch(`${reverseGeocodingAPI}${locationParameters}`);

        if (reverseGeocodingResponse.ok) {
            const locationData = await reverseGeocodingResponse.json();

            countryCode = locationData.countryCode;
        }
    } catch (err) {
        console.log(`Error: ${err.message}`);
    }

    return countryCode;
};

const getCountryFlag = (countryCode) => (
    countriesInfo[countryCode].flag ?? countriesInfo.DEFAULT.flag
);

getUserCountryCode()
    .then((countryCode) => {
        console.log(`Your country code is : ${countryCode} ${getCountryFlag(countryCode)}`);
    })
    .catch((err) => {
        console.log(`Error: ${err}`);
    });
