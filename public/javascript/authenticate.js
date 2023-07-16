function getAccessToken(code) {
  const tokenUrl = 'https://www.strava.com/oauth/token';
  const params = new URLSearchParams();
  params.append('client_id', clientId);
  params.append('client_secret', clientSecret);
  params.append('code', code);
  params.append('grant_type', 'authorization_code');
  params.append('redirect_uri', redirectUri);

  return fetch(tokenUrl, {
    method: 'POST',
    body: params,
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data); // Log the token response to inspect its structure
      const accessToken = data.access_token;
      // Store the new access token for future use
      // You can persist it in local storage, a cookie, or server-side
      return accessToken;
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

function getSegmentEfforts(segment) {
  console.log(segment)
  const accessToken = '09d377f17ec33ee9dc0d7e96603a65bc6f42c608';
  const apiUrl = `https://www.strava.com/api/v3/segment_efforts/`;
  

  fetch(apiUrl, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
    .then((response) => {
      if (response.status === 401) {
        // If the response status is 401 (Unauthorized), refresh the access token
        const code = prompt('Enter the authorization code:');
        return getAccessToken(code).then((newAccessToken) => {
          // Retry the API request with the new access token
          return fetch(apiUrl, {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${newAccessToken}`,
            },
          });
        });
      } else {
        return response;
      }
    })
    .then((response) => response.json())
    .then((activities) => {
      console.log(activities); // Log the activities to inspect the response structure
      // Extract segment efforts from the last 5 activities
      const segmentEfforts = activities
        .slice(0, 5)
        .flatMap((activity) => activity.segment_efforts);
      // Process the retrieved segment efforts data
      console.log(segmentEfforts);
      displaySegmentEfforts(segmentEfforts);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

function displaySegmentEfforts(segmentEfforts) {
  const segmentEffortsElement = document.getElementById('segmentEfforts');
  // Clear existing content
  segmentEffortsElement.innerHTML = '';
  // Display the segment efforts data on the page
  segmentEfforts.forEach((effort) => {
    const effortElement = document.createElement('div');
    effortElement.textContent = `Athlete: ${effort.athlete_name}, Elapsed Time: ${effort.elapsed_time}`;
    segmentEffortsElement.appendChild(effortElement);
  });
}

