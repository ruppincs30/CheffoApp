// const url = "../src/dummy.json";
import results from '../src/dummy.json'
import { getDistanceFromLatLonInKm } from '../helpers/calcDis.js'

let apiURLpostUser = "http://192.168.31.156:50247/api/User/postUser/";
let apiURLgetUsers = "http://192.168.31.156:50247/api/User/getUsers/";
let apiURLgetChefs = "http://192.168.31.156:50247/api/Chef/getChefs/";
let apiURLpostCon = "http://192.168.31.156:50247/api/Connection/scrPost/";
let apiURLpostRev = "http://192.168.31.156:50247/api/Review/scrPost/";
let apiURLgetReviews = "http://192.168.1.33:50247/api/Review/getReviews/"


let badReviews = [
    "food stinks, I wouldn't feed it to my dog",
    "the delivery guy didn't have a surprise for me",
    "smells like fish",
    "next time ill stick to my leftovers",
    "food was meh",
    "I have no words to describe",
    "save your money, choose anything else",
    "flavorless and dry, 100 % will not go back",
    "used to be better, this was my last time",
    "never forget, never again"
]

let medReviews = [
    "The food was fine, the chef agreed to all requests",
    "The food was delicious but took a long time",
    "We were missing one dish but the chef corrected himself and sent it himself",
    "The food was ok",
    "Small but tasty dishes, not sure I will order there again",
    "Good and large dishes but the price is a bit expensive",
    "The service was fine and the food as well",
    "I really can't decide if it was a good choice or not",
    "I have read the reviews for this restaurant and expected good things. I was very disappoint with the food",
    "was a little late, but the food was fine",
]

let goodReviews = [
    "Excellent",
    "The food was delicious and the chef was quick! I'll but there again for sure!",
    "took a little bit more time than scheduled but it was well worth it!",
    "Best food in town for sure!!! <3",
    "10 minutes from the order and I'm eating the best food I could dream of. totally recommend this chef!",
    "will order again easy",
    "First time I'm ordering from this chef and it was incredible experience",
    "cant go with someone else after I ordered from this chef!!! you must buy there",
    "i'll 100% buy there again",
    "the chef was very polite and dish was great"
]

/* export async function script() {
    var usersData;
    var chefsData;
    await fetch(apiURLgetUsers, {
        method: 'GET',
        headers: new Headers({
            'Content-Type': 'application/json; charset=UTF-8',
            'Accept': 'application/json; charset=UTF-8'
        })
    })
        .then(response => {
            console.log('response.status', response.status);
            return response.json();
        })
        .then((data) => {
            usersData = data;
        },
            (error) => {
                console.log("err get=", error);
            });
    await fetch(apiURLgetChefs, {
        method: 'GET',
        headers: new Headers({
            'Content-Type': 'application/json; charset=UTF-8',
            'Accept': 'application/json; charset=UTF-8'
        })
    })
        .then(response => {
            console.log('response.status', response.status);
            return response.json();
        })
        .then((data) => {
            chefsData = data;
        },
            (error) => {
                console.log("err get=", error);
            });
    console.log(usersData);
    console.log(chefsData);

    for (let i = 0; i < usersData.length; i++) {
        for (let j = 0; j < chefsData.length; j++) {
            let rnd = getRndInteger(0, 2);
            let dis = getDistanceFromLatLonInKm(usersData[i].Lat, usersData[i].Lon, chefsData[j].Lat, chefsData[j].Lon);
            if (dis <= 25 && rnd != 1) {
                let reviewText = "";
                let serviceRating = getRndInteger(10, 50) / 10;
                let foodRating = getRndInteger(10, 50) / 10;
                let reviewRating = Math.round(((serviceRating + foodRating) / 2) * 10) / 10;
                console.log(serviceRating + " " + foodRating + " " + reviewRating)
                let rndNum = getRndInteger(0, 9);
                if (reviewRating > 0) {
                    reviewText = badReviews[rndNum];
                }
                if (reviewRating > 2.5) {
                    reviewText = medReviews[rndNum];
                }
                if (reviewRating >= 4) {
                    reviewText = goodReviews[rndNum];
                }
                var reviewObj = {
                    userUid: usersData[i].Uid,
                    chefEmail: chefsData[j].Email,
                    reviewText: reviewText,
                    reviewRating: reviewRating,
                    serviceRating: serviceRating,
                    foodRating: foodRating
                }
                console.log(reviewObj);
                 /* await fetch(apiURLpostRev, {
                    method: 'POST',
                    body: JSON.stringify(reviewObj),
                    headers: new Headers({
                        'Content-Type': 'application/json; charset=UTF-8',
                        'Accept': 'application/json; charset=UTF-8'
                    })
                })
                    .then(response => {
                        console.log('response=', response);
                        console.log('response.status', response.status);
                        console.log('response.ok', response.ok);
                        return response.json();
                    })  
            }
        }

    }

} */





// document.addEventListener("DOMContentLoaded", initialise);

/* export async function script() {
    var usersData;
    await fetch(apiURLgetUsers, {
        method: 'GET',
        headers: new Headers({
            'Content-Type': 'application/json; charset=UTF-8',
            'Accept': 'application/json; charset=UTF-8'
        })
    })
    .then(response => {
        console.log('response.status', response.status);
        return response.json();
    })
    .then((data) => {
        usersData = data;
    },
    (error) => {
        console.log("err get=", error);
    });
    console.log(usersData)
    for (let i = 0; i < usersData.length; i++) {
        let rnd = getRndInteger(9); //number of connections for current
        for (let j = 0; j < rnd; j++) {
            let rnd2 = getRndInteger(usersData.length - 1) // random target user from users
            if (i != rnd2) {
                await postCon(usersData[i], usersData[rnd2])
            }
            
        }
        
    } */
// users creation by location
/* let listArr = [];
var city, gLon, gLat, curr1, curr2; */
/* for (let i = 0; i < results.results.length; i++) {
    curr1 = getRndInteger() / 1000000;
    curr2 = getRndInteger() / 1000000;
    city = "Netanya";
    gLon = 34.85 + curr1;
    gLat = 32.31 + curr2;
    if (i > 30) {
        city = "Mishmarot";
        gLon = 34.98 + curr1;
        gLat = 32.48 + curr2;
        if (i > 50) {
            city = "Kohav Yair";
            gLon = 34.99 + curr1;
            gLat = 32.22 + curr2;
            if (i > 80) {
                city = "Tel Aviv";
                gLon = 34.80 + curr1;
                gLat = 32.11 + curr2;
                if (i > 120) {
                    city = "Jerusalem";
                    gLon = 35.21 + curr1;
                    gLat = 31.76 + curr2;
                    if (i > 150) {
                        city = "Haifa";
                        gLon = 34.99 + curr1;
                        gLat = 32.80 + curr2;
                        if (i > 180) {
                            city = "Kfar Saba";
                            gLon = 34.90 + curr1;
                            gLat = 32.17 + curr2;
                        }
                    }
                }
            }
        }
        let filteredUser = generateFilteredUser(results.results[i], city, gLon, gLat);
        listArr.push(filteredUser);
    } */

/* console.log(listArr)
let userList = { users: listArr };
console.log(JSON.stringify(userList)); */
// users creation by location
/* } */



/* function fetchGeneratedUsers() {
    fetch(url)
    .then(function (response) {
        return response.json();
    })
    .then(function (json) {
        var listArr = [];
        for (let i = 0; i < json.results.length; i++) {
            var filteredUser = generateFilteredUser(json.results[i]);
            listArr.push(filteredUser);
        }

        var userList = { users: listArr };
        console.log(JSON.stringify(userList));
    });
} */

/* function postCon(srcUser, targetUser) {
    let conObj = {
        sourceUid: srcUser.Uid,
        targetUid: targetUser.Uid,
    }
    fetch(apiURLpostCon, {
        method: 'POST',
        body: JSON.stringify(conObj),
        headers: new Headers({
            'Content-Type': 'application/json; charset=UTF-8',
            'Accept': 'application/json; charset=UTF-8'
        })
    })
        .then(response => {
            console.log('response=', response);
            console.log('response.status', response.status);
            console.log('response.ok', response.ok);
            return response.json();
        })
} */

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function generateFilteredUser(data, city, gLon, gLat) {
    var user = {
        uid: data.login.uuid,
        firstName: data.name.first,
        lastName: data.name.last,
        email: data.email,
        city: city,
        pNumber: data.phone,
        lon: gLon,
        lat: gLat,
        img: data.picture.medium,
    };
    fetch(apiURLpostUser, {
        method: 'POST',
        body: JSON.stringify(user),
        headers: new Headers({
            'Content-Type': 'application/json; charset=UTF-8',
            'Accept': 'application/json; charset=UTF-8'
        })
    })
        .then(response => {
            console.log('response=', response);
            console.log('response.status', response.status);
            console.log('response.ok', response.ok);
            return response.json();
        })

    return user;
}

