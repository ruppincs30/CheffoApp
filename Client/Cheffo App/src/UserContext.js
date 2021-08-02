import fire from '../fire'
import { auth } from 'firebase'
import React, { useContext, useState, useEffect } from 'react'
import dbFirestore from '../fire'
import { getDistanceFromLatLonInKm } from '../helpers/calcDis'
import { minMaxNormalize } from '../helpers/normalize'
import { set } from 'ol/transform'
import { ScrollView } from 'react-native-gesture-handler'

// Asaf
/* let apiURLgetUser = "http://192.168.1.33:50247/api/User/getUser/"; 
let apiURLgetUsers = "http://192.168.1.33:50247/api/User/getUsers/"; 
let apiURLpostUser = "http://192.168.1.33:50247/api/User/postUser/";
let apiURLgetChefs = "http://192.168.1.33:50247/api/Chef/getChefs/";
let apiURLgetDishes = "http://192.168.1.33:50247/api/Dish/getDishes/";
let apiURLpostOrder = "http://192.168.1.33:50247/api/Order/postOrder/";
let apiURLgetOrder = "http://192.168.1.33:50247/api/Order/getOrder/";
let apiURLgetConnections = "http://192.168.1.33:50247/api/Connection/getConnections/";
let apiURLpostConnection = "http://192.168.1.33:50247/api/Connection/Post/";
let apiURLdeleteConnection = "http://192.168.1.33:50247/api/Connection/Delete/";
let apiURLgetUserReviews = "http://192.168.1.33:50247/api/Review/getUserReviews/"; */

// Shachar
/* let apiURLgetUser = "http://192.168.31.156:50247/api/User/getUser/";
let apiURLgetUsers = "http://192.168.31.156:50247/api/User/getUsers/";
let apiURLpostUser = "http://192.168.31.156:50247/api/User/postUser/";
let apiURLgetChefs = "http://192.168.31.156:50247/api/Chef/getChefs/";
let apiURLgetDishes = "http://192.168.31.156:50247/api/Dish/getDishes/";
let apiURLpostOrder = "http://192.168.31.156:50247/api/Order/postOrder/";
let apiURLgetOrder = "http://192.168.31.156:50247/api/Order/getOrder/";
let apiURLgetConnections = "http://192.168.31.156:50247/api/Connection/getConnections/";
let apiURLpostConnection = "http://192.168.31.156:50247/api/Connection/Post/";
let apiURLdeleteConnection = "http://192.168.31.156:50247/api/Connection/Delete/";
let apiURLgetUserReviews = "http://192.168.31.156:50247/api/Review/getUserReviews/";
let apiURLpostReview = "http://192.168.31.156:50247/api/Review/postReview/";
let apiURLputOrder = "http://192.168.31.156:50247/api/Order/putReviewId/"; */


// proj ruppin - 
let apiURLgetUser = "http://proj.ruppin.ac.il/igroup30/Test2/tar6/api/User/getUser/";
let apiURLgetUsers = "http://proj.ruppin.ac.il/igroup30/Test2/tar6/api/User/getUsers/";
let apiURLpostUser = "http://proj.ruppin.ac.il/igroup30/Test2/tar6/api/User/postUser/";
let apiURLgetChefs = "http://proj.ruppin.ac.il/igroup30/Test2/tar6/api/Chef/getChefs/";
let apiURLgetDishes = "http://proj.ruppin.ac.il/igroup30/Test2/tar6/api/Dish/getDishes/";
let apiURLpostOrder = "http://proj.ruppin.ac.il/igroup30/Test2/tar6/api/Order/postOrder/";
let apiURLgetOrder = "http://proj.ruppin.ac.il/igroup30/Test2/tar6/api/Order/getOrder/";
let apiURLgetConnections = "http://proj.ruppin.ac.il/igroup30/Test2/tar6/api/Connection/getConnections/";
let apiURLpostConnection = "http://proj.ruppin.ac.il/igroup30/Test2/tar6/api/Connection/Post/";
let apiURLdeleteConnection = "http://proj.ruppin.ac.il/igroup30/Test2/tar6/api/Connection/Delete/";
let apiURLgetUserReviews = "http://proj.ruppin.ac.il/igroup30/Test2/tar6/api/Review/getUserReviews/";
let apiURLpostReview = "http://proj.ruppin.ac.il/igroup30/Test2/tar6/api/Review/postReview/";
let apiURLputOrder = "http://proj.ruppin.ac.il/igroup30/Test2/tar6/api/Order/putReviewId/";

// Sasson
/*  let apiURLgetUser = "http://192.168.31.124:50247/api/User/getUser/"; 
let apiURLgetUsers = "http://192.168.31.124:50247/api/User/getUsers/"; 
let apiURLpostUser = "http://192.168.31.124:50247/api/User/postUser/";
let apiURLgetChefs = "http://192.168.31.124:50247/api/Chef/getChefs/";
let apiURLgetDishes = "http://192.168.31.124:50247/api/Dish/getDishes/";
let apiURLpostOrder = "http://192.168.31.124:50247/api/Order/postOrder/";
let apiURLgetOrder = "http://192.168.31.124:50247/api/Order/getOrder/";
let apiURLgetConnections = "http://192.168.31.124:50247/api/Connection/getConnections/";
let apiURLpostConnection = "http://192.168.31.124:50247/api/Connection/Post/";
let apiURLdeleteConnection = "http://192.168.31.124:50247/api/Connection/Delete/";
let apiURLgetUserReviews = "http://192.168.31.124:50247/api/Review/getUserReviews/";  */


const UserContext = React.createContext()
const UserUpdateContext = React.createContext()



export function useUserContext() {
    return useContext(UserContext)
}

export function useUserUpdateContext() {
    return useContext(UserUpdateContext)
}

export function UserProvider({ children }) {
    const [currentUser, setCurrentUser] = useState('')
    const [currentChef, setCurrentChef] = useState('')
    const [currentChefDishes, setCurrentChefDishes] = useState('')
    const [chefsArr, setChefsArr] = useState('')
    const [friendsArr, setFriendsArr] = useState('')
    const [friendsArrDetails, setFriendsArrDetails] = useState('')
    const [reviewsArr, setReviewsArr] = useState('')
    const [name, setName] = useState({ value: '', error: '' })
    const [email, setEmail] = useState({ value: '', error: '' })
    const [password, setPassword] = useState({ value: '', error: '' })
    const [userID, setUserID] = useState('')
    const [selectedImage, setSelectedImage] = useState('');
    const [cart, setCart] = useState([]);
    const [sliderValue, setSliderValue] = useState(26);
    const [orders, setOrders] = useState([]);
    const [friendsInDepth, setFriendsInDepth] = useState('')
    const [friendsReviews, setFriendsReviews] = useState()
    const [friendsSuggestion, setFriendsSuggestion] = useState('')
    const [allUsers, setAllUsers] = useState([])
    const [loading, setLoading] = useState(false);
    const [friendsLoading, setFriendsLoading] = useState(false);
    const [orderLoading, setOrderLoading] = useState(false);
    const [currentOrder, setCurrentOrder] = useState('')
    const [currentReview, setCurrentReview] = useState('')
    const [ratingsUpdated, setRatingsUpdated] = useState(false);

    var peopleYouMayKnow = []
    var depth = 3;
    let tempReviews = [];

    // Hooks Section //

    useEffect(() => {
        getChefs();
        getUsers();
    }, [currentUser])

    useEffect(() => {
        var itemsProcessed = 0;
        let tempArr = [];
        if (friendsArr) {
            friendsArr.forEach(async (currFriend, index, array) => {
                getUserReviews(currFriend)
                let tempFriend = await getDetails(currFriend.userUid);
                tempArr.push(tempFriend)
                itemsProcessed++;
                if (itemsProcessed === array.length) {
                    setFriendsArrDetails(tempArr);
                    setFriendsLoading(true)
                }
            })
            
        }
        else {
            setFriendsLoading(true)
        }
        if (friendsArr.length == 0) {
            setFriendsReviews()
            setFriendsArrDetails(tempArr);
            setFriendsLoading(true);
        }
    }, [friendsArr])


    // Firebase communications section //

    function fireStoreImg() {
        dbFirestore.firestore()
            .collection('userData')
            .doc(currentUser.uid)
            .set({
                imgUrl: currentUser.img
            })
            .then(() => {
                console.log('User added!');
            });

    }

    async function getFireStoreImg() {
        let temp = currentUser;

        const userImg = await dbFirestore.firestore()
            .collection('userData')
            .get();
        console.log(userImg)
        userImg.wP.docChanges.forEach(element => {
            if (currentUser.uid == element.doc.key.path.segments[6])
                temp.img = element.doc.proto.fields.imgUrl.stringValue;
        });
        console.log(temp)
        setCurrentUser(temp)
    }

    // Orders Section //



    function getOrders() {
        /* Get Orders from SQL */
        fetch(apiURLgetOrder + currentUser.uid, {
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
                setOrders(data);
                console.log(data)
                setOrderLoading(true);
            },
                (error) => {
                    console.log("err get=", error);
                });
    }

    function setOrder() {
        let sum = 0;
        let orderStr = '';
        cart.forEach(element => {
            if (element.Quantity != 0 && element.Quantity) {
                sum += (element.Quantity * element.Price)
                orderStr += element.Quantity + 'x ' + element.Name + ' - ' + (element.Quantity * element.Price) + '; ';
            }
        });
        var currentdate = new Date();
        let currentMinutes = currentdate.getMinutes() < 10 ? "0" + currentdate.getMinutes(): currentdate.getMinutes();
        let currentHours = currentdate.getHours() < 10 ? "0" + currentdate.getHours(): currentdate.getHours();
        var datetime = currentdate.getDate() + "/"
            + (currentdate.getMonth() + 1) + "/"
            + currentdate.getFullYear() + " - "
            + currentHours + ":"
            + currentMinutes

        let newOrder = {
            uid: currentUser.uid,
            chefEmail: currentChef.Email,
            orderTime: datetime,
            orderDescription: orderStr,
            totalPrice: sum,
            chef: currentChef.DisplayName,
            status: 'open',
            reviewId: 0

        }
        console.log(datetime)
        fetch(apiURLpostOrder, {
            method: 'POST',
            body: JSON.stringify(newOrder),
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
            .then((data) => {
                console.log(data)
                setCurrentOrder(data)
            })
        /*  setCart([]);  */
    }
    

    
    // User Section //

    function onLogin(email, userID) {
        setEmail(email);
        setUserID(userID);
    }

    function Logout() {
        fire.auth().signOut();
        clearUserContext();
    }

    async function signin(email, password, callbackfunc) {
        let flag;
        await fire.auth()
            .signInWithEmailAndPassword(email, password)
            .then(async () => {
                await fire.auth().onAuthStateChanged(async authUser => {
                    if (authUser !== null) {
                        /* Get User Details from SQL */
                        await fetch(apiURLgetUser + authUser.uid, {
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
                            .then(async (data) => {
                                const user = {
                                    uid: data.Uid,
                                    email: data.Email,
                                    firstName: data.FirstName,
                                    lastName: data.LastName,
                                    city: data.City,
                                    pNumber: data.PNumber,
                                    lon: data.Lon,
                                    lat: data.Lat,
                                    img: data.Img
                                }
                                setCurrentUser(user);
                                console.log("Current User Details:")
                                console.log(user)
                                flag = true;
                                callbackfunc(flag);
                            },
                                (error) => {
                                    console.log("err get=", error);

                                })

                    }
                    else {
                        setCurrentUser('');
                    }
                })
            }
            )
            .catch(err => {
                switch (err.code) {
                    case "auth/invalid-email":
                    case "auth/user-disabled":
                    case "auth/user-not-found":
                        alert("wrong Email");
                        console.log(err.message)
                        break;
                    case "auth/wrong-password":
                        alert("wrong Password");
                        console.log(err.message)
                        break;
                }
                flag = false;
                callbackfunc(flag);
            });
    }

    async function signup(firstName, lastName, city, phone, email, password, lon, lat) {
        var flag = true;
        await fire
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then(function (user) {
                console.log(user.user.uid + " / " + email + " / " + firstName + " / " + lastName + " / " + city + " / " + phone)
                const newUser = {
                    uid: user.user.uid,
                    email: email,
                    firstName: firstName,
                    lastName: lastName,
                    city: city,
                    pNumber: phone,
                    lon: lon,
                    lat: lat
                }
                console.log(newUser);
                fetch(apiURLpostUser, {
                    method: 'POST',
                    body: JSON.stringify(newUser),
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
            })
            .catch(err => {
                switch (err.code) {
                    case "auth/email-already-in-use":
                    case "auth/invalid-email":
                    case "auth/weak-password":
                        alert(err.message);
                        flag = false;
                        break;
                }
            });


        return flag;
    }

    function updateImage(img) {
        currentUser.img = img;
    }

    function updateEmail(email) {
        return currentUser.updateEmail(email)
    }

    function updatePassword(password) {
        return currentUser.updatePassword(password)
    }

    function getUsers() {
        let users = [];
        fetch(apiURLgetUsers, {
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
                data.forEach(element => {
                    let currUser = {
                        userUid: element.Uid,
                        firstName: element.FirstName,
                        lastName: element.LastName,
                        email: element.Email,
                        city: element.City,
                        img: element.Img,
                        lat: element.Lat,
                        lon: element.Lon,
                        pNumber: element.PNumber,
                        distance: Math.floor(getDistanceFromLatLonInKm(currentUser.lat, currentUser.lon, element.Lat, element.Lon))
                    }
                    users.push(currUser)
                });
                setAllUsers(users);
            },
                (error) => {
                    console.log("err get=", error);
                });
    }

    function followUser(targetUid) {
        setFriendsLoading(false)
        console.log('ITS FALSE')
        let connection = {
            sourceUid: currentUser.uid,
            targetUid: targetUid
        }
        fetch(apiURLpostConnection, {
            method: 'POST',
            body: JSON.stringify(connection),
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
            .then(() => {
                getFriends()
            })
    }

    function unfollowUser(targetUid) {
        setFriendsLoading(false)
        let connection = {
            sourceUid: currentUser.uid,
            targetUid: targetUid
        }
        fetch(apiURLdeleteConnection, {
            method: 'DELETE',
            body: JSON.stringify(connection),
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
            .then(() => {
                getFriends()

            })


    }
    async function getFriends() {
        let tempConnections = [];
        await fetch(apiURLgetConnections + currentUser.uid, {
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
                data.forEach(element => {
                    const Connection = {
                        userUid: element.TargetUid,
                        depth: 0,

                    }
                    tempConnections.push(Connection);
                });
                setFriendsArr(tempConnections);
                

            },
                (error) => {
                    console.log("err get=", error);
                })

    }

    async function getConnections() {
        let tempConnections = [];
        let tempFF = [];
        for (let i = 0; i < depth; i++) {
            if (i == 0) {
                await fetch(apiURLgetConnections + currentUser.uid, {
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
                        data.forEach(element => {
                            const Connection = {
                                userUid: element.TargetUid,
                                depth: i,

                            }
                            tempConnections.push(Connection);
                        });
                    },
                        (error) => {
                            console.log("err get=", error);
                        })
                setFriendsArr(tempConnections);

            }
            else {
                let tempConnections2 = [];
                for (let j = 0; j < tempConnections.length; j++) {
                    await fetch(apiURLgetConnections + tempConnections[j].userUid, {
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
                            data.forEach(element => {
                                const Connection = {
                                    userUid: element.TargetUid,
                                    fatherUid: tempConnections[j].userUid,
                                    depth: i
                                }
                                tempConnections2.push(Connection);
                            });
                        },
                            (error) => {
                                console.log("err get=", error);
                            }).then(() => {
                                tempConnections2.forEach(async (element) => {
                                    /*  debugger */
                                    let currUser = {
                                        userUid: element.userUid,
                                        fatherUid: tempConnections[j].userUid,
                                        depth: i,
                                        email: '',
                                        firstName: '',
                                        lastName: '',
                                        city: '',
                                        distance: '',
                                        img: '',
                                        score: '',
                                        numOfApp: ''
                                    }
                                    peopleYouMayKnow.push(currUser);
                                    tempFF.push(currUser);
                                })
                                tempConnections2 = [];
                            })
                }
                tempConnections = tempFF;
                tempFF = [];
            }
        }
        peopleYouMayKnow.forEach(async (element, index, array) => {
            let user = await getDetails(element.userUid);
            element.email = user.email;
            element.firstName = user.firstName;
            element.lastName = user.lastName;
            element.city = user.city;
            element.distance = user.distance;
            element.img = user.img;
            if (index === (array.length - 1)) {
                calcScore(peopleYouMayKnow);
            }
        })
        setFriendsSuggestion(peopleYouMayKnow)
        console.log("people you may know end")
        console.log(peopleYouMayKnow);
        console.log(friendsArrDetails);
        setLoading(true);
    }

    function postReview(foodStars, serviceHearts, reviewDescription, currentOrderCopy) {
        let review = {
            userUid: currentUser.uid,
            chefEmail: currentOrderCopy.ChefEmail,
            reviewRating: Math.round(((foodStars + serviceHearts) / 2) * 10) / 10,
            reviewText: reviewDescription,
            serviceRating: serviceHearts,
            foodRating: foodStars,
            orderId: currentOrderCopy.OrderId
        }
        fetch(apiURLpostReview, {
            method: 'POST',
            body: JSON.stringify(review),
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
            .then((data) => {
                setCurrentReview(data)
                putReviewIdInOrder(data)
            })

    }

    function putReviewIdInOrder(data) {
        console.log("putReviewIdInOrder: ")
        console.log(data)
        fetch(apiURLputOrder + data.OrderId + '/' + data.ReviewId, {
            method: 'PUT',
            body: JSON.stringify({
                orderId: data.OrderId,
                reviewId: data.ReviewId
            }),
            headers: new Headers({
                'Content-Type': 'application/json; charset=UTF-8',
                'Accept': 'application/json; charset=UTF-8'
            })
        })
            .then(response => {
                console.log('response=', response);
                console.log('response.status', response.status);
                console.log('response.ok', response.ok);
                getOrders();
                return response.json();
            })

    }



    function calcScore(peopleYouMayKnow) {
        let maxDistance = Math.max.apply(Math, peopleYouMayKnow.map(function (o) { return o.distance; }));
        let avgDistance = Math.floor(peopleYouMayKnow.reduce((r, c) => c.distance ? r + c.distance : r, 0) / peopleYouMayKnow.length);
        /* console.log(avgDistance) */
        peopleYouMayKnow.forEach((element, index) => {
            let score = 0;
            /* console.log(element.distance) */
            element.depth == 1 ? score += 1 : element.depth == 2 ? score += 0.45 : element.depth == 3 ? score += 0.15 : console.log("fail depth");
            /*  locationScore= ()/() */
            if (!element.distance) {
                element.distance = avgDistance;
                /*  console.log("hi")
                 console.log(element.city)
                 console.log(element.email) */
            }
            if (element.distance <= 25) {
                score += (1 - minMaxNormalize(element.distance, 25, 0)) + 0.2;
            }
            else score += 0.2 - (minMaxNormalize(element.distance, maxDistance, 25) / 5)
            let appearanceCounter = -1;
            peopleYouMayKnow.forEach(item => {//Counting number of appearences
                if (element.userUid == item.userUid) {
                    appearanceCounter++;
                }
            });
            element.numOfApp = appearanceCounter;
            score += appearanceCounter * 0.15;
            element.score = score;
            /* let currUser = {
                userUid: element.userUid,
                fatherUid: element.fatherUid,
                depth: element.depth,
                email: element.email,
                firstName: element.firstName,
                lastName: element.lastName,
                city: element.city,
                distance: element.distance,
                img: element.img,
                score: score
 
       } */

        })
    }

    async function getDetails(TargetUid) {
        let user = ''
        await fetch(apiURLgetUser + TargetUid, {
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
            .then(async (data) => {
                user = {
                    uid: data.Uid,
                    email: data.Email,
                    firstName: data.FirstName,
                    lastName: data.LastName,
                    city: data.City,
                    distance: Math.floor(getDistanceFromLatLonInKm(currentUser.lat, currentUser.lon, data.Lat, data.Lon)),
                    img: data.Img
                }

                /* console.log(user) */
            },
                (error) => {
                    console.log("err get=", error);
                })

        return user;
    }

    async function getUserReviews(friendsUid) {
        await fetch(apiURLgetUserReviews + friendsUid.userUid, {
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
                /*  console.log(data) */
                data.forEach(element => {
                    tempReviews.push(element)
                });
            },
                (error) => {
                    console.log("err get=", error);
                });
        setFriendsReviews(tempReviews);
    }



    async function selectedChef(email) {
        await getDishes(email);
        await chefsArr.forEach(element => {
            if (element.Email == email) {
                setCurrentChef(element);
            }
        });
    }

    function getDishes(email) {
        /* Get Dishes from SQL */
        fetch(apiURLgetDishes + email + '/', {
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
                setCurrentChefDishes(data);
            },
                (error) => {
                    console.log("err get=", error);
                });
    }

    function getChefs() {

        /* Get Chefs from SQL */
        fetch(apiURLgetChefs, {
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
                let tempChefs = [];
                data.forEach(element => {
                    const chef = {
                        Address: element.Address,
                        DisplayName: element.DisplayName,
                        Email: element.Email,
                        FirstName: element.FirstName,
                        LastName: element.LastName,
                        PNumber: element.PNumber,
                        Lon: element.Lon,
                        Lat: element.Lat,
                        Rating: element.Rating,
                        OriginalRating: element.Rating,
                        FoodType: element.FoodType,
                        Img: element.Img,
                        DisFromUser: getDistanceFromLatLonInKm(currentUser.lat, currentUser.lon, element.Lat, element.Lon),
                        NumOfReviews: element.NumOfReviews
                    }
                    tempChefs.push(chef);
                });
                setChefsArr(tempChefs);

            },
                (error) => {
                    console.log("err get=", error);
                });
        getFireStoreImg()
    }




    /*  async function getConnections(sourceUid, depth) {
        
         let tempConnections = [];
         await fetch(apiURLgetConnections + sourceUid, {
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
                 data.forEach(element => {
                     const Connection = {
                         userUid: element.TargetUid,
                         depth: depth,
                         distance: ''
                     }
                     tempConnections.push(Connection);
                 });
             },
                 (error) => {
                     console.log("err get=", error);
                 }).then(() => {
                     if (sourceUid == currentUser.uid) {
                         setFriendsArr(tempConnections)
                         getReviews(sourceUid)
                         console.log(tempConnections)
                     }
                     else {
                         tempConnections.forEach((element) => {
                             let currUser = {
                                 userUid: element.userUid,
                                 depth: depth,
                                 distance: ''
                             }
                             peopleYouMayKnow.push(currUser)
                         })
                         console.log(peopleYouMayKnow)
                         setTempUsers(peopleYouMayKnow)
                     }
                 })
     } */



    /*  function getFriendsInDepth(depth) {
         let currentDepth = [];
         friendsArr.forEach(currUser => {
             currentDepth.push(currUser);
         })
         while (depth > 0) {
     
     
             depth--;
         }
     } */




    function clearUserContext() {
        tempReviews = [];
        setCurrentUser('');
        setCurrentChef('');
        setCurrentChefDishes(null);
        setChefsArr('');
        setFriendsArr(null);
        setReviewsArr('');
        setName('');
        setEmail('');
        setPassword('');
        setUserID('');
        setSelectedImage('');
        setCart([]);
        setOrders([]);
        setFriendsInDepth('');
        setFriendsArrDetails(null);
        setFriendsReviews('');
        setFriendsSuggestion('');
        setAllUsers([]);
        console.log(peopleYouMayKnow);
        peopleYouMayKnow = [];
        console.log(peopleYouMayKnow);
    }

    const value = {
        currentUser,
        setCurrentUser,
        name,
        email,
        password,
        userID,
        signup,
        signin,
        updateEmail,
        updatePassword,
        onLogin,
        Logout,
        chefsArr,
        selectedChef,
        currentChefDishes,
        setCurrentChefDishes,
        setCurrentChef,
        currentChef,
        updateImage,
        cart,
        setCart,
        sliderValue,
        setSliderValue,
        setOrder,
        getOrders,
        orders,
        fireStoreImg,
        getFireStoreImg,
        getConnections,
        friendsArr,
        setFriendsArr,
        friendsInDepth,
        setFriendsInDepth,
        friendsSuggestion,
        setFriendsSuggestion,
        friendsReviews,
        getDetails,
        friendsArrDetails,
        followUser,
        unfollowUser,
        allUsers,
        orderLoading,
        loading,
        currentOrder,
        postReview,
        friendsLoading,
        ratingsUpdated,
        setRatingsUpdated
    }

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}