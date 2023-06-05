// Calling our personal node enpoints to get access tokens 

const LOCALSTORAGE_KEYS = {
    accessToken: 'spotify_access_token',
    refreshToken: 'spotify_refresh_token',
    expireTime: 'spotify_token_expire_time',
    timestamp: 'spotify_token_timestamp',
}

export const LOCALSTORAGE_VALUES = {
    accessToken: window.localStorage.getItem(LOCALSTORAGE_KEYS.accessToken),
    refreshToken: window.localStorage.getItem(LOCALSTORAGE_KEYS.refreshToken),
    expireTime: window.localStorage.getItem(LOCALSTORAGE_KEYS.expireTime),
    timestamp: window.localStorage.getItem(LOCALSTORAGE_KEYS.timestamp),
}

// const hasTokenExpired = () => {
//     const { accessToken, timestamp, expireTime } = LOCALSTORAGE_VALUES;
//     if (!accessToken || !timestamp) {
//       return false;
//     }
//     const millisecondsElapsed = Date.now() - Number(timestamp);
//     return (millisecondsElapsed / 1000) > Number(expireTime);
//   };

  // TODO fix !!! 
// const refreshToken = async() => { 
//     try {
//       // Logout if there's no refresh token stored or we've managed to get into a reload infinite loop
//       if (!LOCALSTORAGE_VALUES.refreshToken ||
//         LOCALSTORAGE_VALUES.refreshToken === 'undefined' ||
//         (Date.now() - Number(LOCALSTORAGE_VALUES.timestamp) / 1000) < 1000
//       ) {
//         console.error('No refresh token available');
//         logout();
//       }
  
//       // Use `/refresh_token` endpoint from our Node app
//       console.log("before calling refresh endpoint, this is our token: " + LOCALSTORAGE_VALUES.refreshToken);
//       const { data } = fetch("/refreshtoken?refresh_token=" +  LOCALSTORAGE_VALUES.refreshToken);
    
//       // ISSUE 1: DATA HERE IS UNDEFINED: we have a valid refresh token
//       console.log ("BIG FUCKING DATA: " + data);

//       // Update localStorage values                                                                                        
//       // ISSUE 2: BECAUSE THE DATA IS UNDEFINED, THERE IS NO WAY WE CAN GRAB ACCESS_TOKEN
//       window.localStorage.setItem(LOCALSTORAGE_KEYS.accessToken, data.access_token);
//       console.log("grabbed a new key: " + data.access_token); 
//       window.localStorage.setItem(LOCALSTORAGE_KEYS.timestamp, Date.now());

  
//       // Reload the page for localStorage updates to be reflected
//       window.location.reload();
  
//     } catch (e) {
//       console.error(e);
//     }
// };

// GPT 2: 
// const refreshToken = async () => {
//   try {
//     // Logout if there's no refresh token stored or we've managed to get into a reload infinite loop
//     if (
//       LOCALSTORAGE_VALUES.refreshToken  === null||
//       LOCALSTORAGE_VALUES.refreshToken === 'undefined' ||
//       Date.now() - Number(LOCALSTORAGE_VALUES.timestamp) / 1000 < 1000
//     ) {
//       console.error('No refresh token available');
//       logout();
//       return; // Return early to prevent further execution
//     }

//     // Use `/refresh_token` endpoint from our Node app
//     console.log(
//       "Before calling refresh endpoint, this is our token: " +
//         LOCALSTORAGE_VALUES.refreshToken
//     );

//     // calling the refresh token backend endpoint 
//     const data = await fetch(
//       "/refreshtoken?refresh_token=" + LOCALSTORAGE_VALUES.refreshToken
//     );

//     // const data = await response.json();
//     console.log("this is us after trying to call " + data);

//     // Verify if data is defined and contains access_token property
//     if (data && data.access_token) {
//       // Update localStorage values
//       window.localStorage.setItem(
//         LOCALSTORAGE_KEYS.accessToken,
//         data.access_token
//       );
//       console.log("Successfully refreshed access token: " + data.access_token);
//       window.localStorage.setItem(LOCALSTORAGE_KEYS.timestamp, Date.now());
//     } else {
//       console.error("Invalid response data or access_token missing");
//       logout();
//       return; // Return early to prevent further execution
//     }

//     // Reload the page for localStorage updates to be reflected
//     window.location.reload();
//   } catch (e) {
//     console.error("An error occurred while refreshing the token:", e);
//   }
// };


// this gets called EVERY TIME we refresh the moodrings
const getAccessToken = () => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const queryParams = {
          [LOCALSTORAGE_KEYS.accessToken]: urlParams.get('access_token'),
          [LOCALSTORAGE_KEYS.refreshToken]: urlParams.get('refresh_token'),
          [LOCALSTORAGE_KEYS.expireTime]: urlParams.get('expires_in'),
        };
        // const hasError = urlParams.get('error');   


        console.log("access token from inside getAccessToken() in spotify.js: " + LOCALSTORAGE_VALUES.accessToken);
        console.log("refresh token from inside getAccessToken() in spotify.js: " + LOCALSTORAGE_VALUES.refreshToken);
        console.log("timestamp from inside getAccessToken() in spotify.js: " + LOCALSTORAGE_VALUES.timestamp);
        console.log("expiretime from inside getAccessToken() in spotify.js: " + LOCALSTORAGE_VALUES.expireTime);
      
        // If there's an error OR the token in localStorage has expired, refresh the token
        // if (hasError || hasTokenExpired() || LOCALSTORAGE_VALUES.accessToken === 'undefined') {
        //   console.log('calling refreshToken()');
        //   refreshToken();
        // }
      
        // If there is a valid access token in localStorage, use that
        if (LOCALSTORAGE_VALUES.accessToken && LOCALSTORAGE_VALUES.accessToken !== 'undefined') {
          return LOCALSTORAGE_VALUES.accessToken;
        }
      
        // If there is a token in the URL query params, user is logging in for the first time
        if (queryParams[LOCALSTORAGE_KEYS.accessToken]) {
          // Store the query params in localStorage
          for (const property in queryParams) {
            window.localStorage.setItem(property, queryParams[property]);
          }
          // Set timestamp
          window.localStorage.setItem(LOCALSTORAGE_KEYS.timestamp, Date.now());
          // Return access token from query params
          return queryParams[LOCALSTORAGE_KEYS.accessToken];
        }
      
        // We should never get here!
        console.log('access token has expired, will trigger a logout in Moodring');
        // logout();
        return false;
};


export const logout = () => {
   // Clear all localStorage items
    for (const property in LOCALSTORAGE_KEYS) {
      window.localStorage.removeItem(LOCALSTORAGE_KEYS[property]);
    }
    // Navigate to homepage
    window.location = window.location.origin; 

  };

    
export const accessToken = getAccessToken();
export const keys = LOCALSTORAGE_KEYS;

// C5z2_isxQYcuIiv_G8FfQ2HNlT6c27UKlaM7d4x-eN6wKGxk5RnCyeI3cLQxbs7XdsyRooASKYJcIHOAOTYzViPJZYMchIMivKLa0B2MdprlP5yubcERr3n6dZZI 


// home page --> login triggers login endpoint --> callback takes us to moodring and puts the AT and RT in browser  --> moodring calls useeffect to grab those things and get us an access token and a refresh token which the getAccessToken logs --> the second useEffect in moodring then uses that token2 to make our api call (a bit of lag / delay from 2 consecutive use effects but this is necessary since we don't wanna get our token in /home and pass it to moodring, that doesn't make sense for the sake of refreshing