const auth_link = "https://www.strava.com/oauth/token"

function getActivities(res){

    const activities_link = `https://www.strava.com/api/v3/athlete/activities?access_token=${res.access_token}`
    fetch(activities_link)
        .then((res) => (res.json()))
        .then(function (data) {
            var map = L.map('map').setView([51.505, -0.09], 13);

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);
        }
        )
}

function reAuthorize(){
    fetch(auth_link,{
        method: 'post',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        
        },

        body: JSON.stringify({

                client_id: '86029',
                client_secret: '51a376731d3be7ddadea6f1c7a820f604b1ef3d4',
                refresh_token: 'ce865bbacefadb43c9408e448e5815ef0c4bde84',
                grant_type: 'refresh_token'
            })
        }).then(res => res.json())
            .then(res => getActivities(res))
    }

    reAuthorize()