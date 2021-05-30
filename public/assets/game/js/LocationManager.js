import countriesInfo from './countriesInfo.js';

const reverseGeocodingAPI = 'https://api.bigdatacloud.net/data/reverse-geocode-client';

const getUserLatLong = async () => new Promise((resolve) => {
    let userPosition = null;

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            userPosition = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
            };

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

const getUserCountryCode = async () => {
    const userLatLong = await getUserLatLong();

    // If no parameter is given, the reverse geocoding API will fallback on an IP-based geolocation.
    // It is the reason why we only assign a value to this variable if we can access the
    // navigator.geolocation API.
    let locationParameters = '';

    if (userLatLong != null) {
        const { latitude, longitude } = userLatLong;
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

const getCountryInfo = (countryCode) => countriesInfo[countryCode] ?? countriesInfo.DEFAULT;

export { getUserCountryCode, getCountryInfo };
