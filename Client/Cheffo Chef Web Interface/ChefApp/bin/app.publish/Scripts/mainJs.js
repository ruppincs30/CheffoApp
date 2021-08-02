


let apiURLgetChef = "http://proj.ruppin.ac.il/igroup30/Test2/tar6/api/Chef/getChef/";
let apiURLgetDishes = "http://proj.ruppin.ac.il/igroup30/Test2/tar6/api/Dish/getDishes/";
let apiURLgetOrders = "http://proj.ruppin.ac.il/igroup30/Test2/tar6/api/Order/getOrders/";
let apiURLputStatusInOrders = "http://proj.ruppin.ac.il/igroup30/Test2/tar6/api/Order/putOrderStatus/"; 
let apiURLputDish = "http://proj.ruppin.ac.il/igroup30/Test2/tar6/api/Dish/Put";
let apiURLpostDish = "http://proj.ruppin.ac.il/igroup30/Test2/tar6/api/Dish/Post";

let apiURLdeleteDish = "http://proj.ruppin.ac.il/igroup30/Test2/tar6/api/Dish/Delete";
let apiURLgetReview = "http://proj.ruppin.ac.il/igroup30/Test2/tar6/api/Review/getChefReviews/";
let apiURLputChef = "http://proj.ruppin.ac.il/igroup30/Test2/tar6/api/Chef/Put";
let apiURLpostChef = "http://proj.ruppin.ac.il/igroup30/Test2/tar6/api/Chef/Post";

let apiURLgetAddressData = "http://api.positionstack.com/v1/forward?access_key=8d7239d9a0e5da0f79a401570ef6dd28&query="

var currentChef
var ChefDishes
var ChefOrders
var currentDish = [];
var mode = "";
var Lon;
var Lat;
var locStr;
var locStr;

$(document).ready(function () {
    $("#signInBtn").click(signIn);
    $("#signUpBtn").click(signUp);
    $("#signIn").click(signInMove);
    $("#signUp").click(signUpMove);
    $("#MainDiv").hide();
    hideAll();

    const signUpButton = document.getElementById('signUp');
    const signInButton = document.getElementById('signIn');
    const container = document.getElementById('container');

    $("#dishImage").change(function () {
        $("#dishImg").attr('src', $("#dishImage").val());
    });

    $("#profileImgUrl").change(function () {
        $("#profileImg").attr('src', $("#profileImgUrl").val());
    });
    

});

function hideAll() {
    $("#homePage").hide();
    $("#myDishesPage").hide();
    $("#ordersPage").hide();
    $("#profilePage").hide();
    $("#editmyDishesDiv").hide();
    $("#profileEdit").hide();
    

}

function signInMove() {
    console.log("sign in Move")
    container.classList.remove("right-panel-active");
}

function signUpMove() {
    console.log("sign up Move")
    container.classList.add("right-panel-active");
    initGeolocation();

}


function signIn() {
    console.log("sign in")
    let email = $("#emailSignIn").val();
    let password = $("#passwordSignIn").val();
    
   
    auth.signInWithEmailAndPassword(email, password).then(authChef => {
       
        ajaxCall("GET", apiURLgetChef + authChef.user.uid, "", signInGetSuccess, signInGetError);
        }).catch((error) => {
            console.log(error)
            swal("! כניסתך נדחיתה ", "שם משתמש או אימייל לא תקינים", "error");
         });
       
}

function signInGetSuccess(Data) {
    currentChef = Data;
    console.log(Data)
    swal("! כניסתך מורשת", "ברוך הבא", "success");
    $("#LoginDiv").hide();
    $("#MainDiv").show();
    $("#homePage").show();
    $("#h1Name").html("Hello " + Data.FirstName + " " + Data.LastName);
    $("#totalReview").html(Data.Rating.toFixed(2));
    $("#numOfReviews").html(Data.NumOfReviews);
   
    $('#reviewTable').DataTable().destroy();
    ajaxCall("GET", apiURLgetReview + currentChef.Email + '/', "", GetReviewsSuccess, GetReviewsError);
}
function GetReviewsSuccess(reviewData) {
    console.log(reviewData)
    a = 0;
    try {
        tbl = $('#reviewTable').DataTable({
            data: reviewData,
            pageLength: 50,
            fixedColumns: true,
            columns: [
                { data: "ReviewId" },
                { data: "UserFirstName"},
                { data: "UserEmail" },
                { data: "ReviewText" },
                { data: "ServiceRating" },
                { data: "FoodRating" },
                { data: "ReviewRating" },
            ],
        });
    }
    catch (err) {
        alert(err);
    }


}
function GetReviewsError() {
    console.log(error)
}




function signInGetError() {
    swal("! כניסתך נדחיתה", "נסה שנית", "error");

}



function signUp() {
    if (signUpValid()) {
        console.log("sign up")
        let email = $("#emailSignUp").val();
        let password = $("#passwordSignUp").val();
        const fullName = $("#fullName").val().split(" ");

        auth.createUserWithEmailAndPassword(email, password).then(cred => {
            console.log(cred.user.uid)
            let ChefObject = {
                Address: locStr,
                ChefUid: cred.user.uid,
                DisplayName: $("#displayName").val(),
                Email: $("#emailSignUp").val(),
                FirstName: fullName[0],
                LastName: fullName[1],
                FoodType: $("#foodType").val(),
                Img: $("#imgUrl").val(),
                Lat: parseFloat(Lat),
                Lon: parseFloat(Lon),
                PNumber: $("#PNumber").val()
            }
            console.log(ChefObject)
            ajaxCall("POST", apiURLpostChef, JSON.stringify(ChefObject), postChefSuccess, postChefError);

        }).catch((error) => {
            console.log(error)
            alert(error.message)
        });
    }
}


function postChefSuccess(data) {
    console.log(data)
    swal("Wellcome to Cheffo", " ", "success");
}
function postChefError() {
    swal("משהו השתבש", " ", "error");
}
function signUpValid() {
    if ($("#passwordSignUp").val() == "" || $("#fullName").val() == "" || $("#displayName").val() == "" || $("#emailSignUp").val() == "" || $("#foodType").val() == "" || $("#imgUrl").val() == "" || $("#PNumber").val() == "" || locStr==null||Lat==null|| Lon==null ) {
        swal("חסרים פרטים", " ", "error");
        return false;
    }
    else {
        return true;
    }
}


function reverseGeocode() {
    fetch('http://nominatim.openstreetmap.org/reverse?format=json&lon=' + Lon + '&lat=' + Lat + '&accept-language=en')
        .then(function (response) {
            return response.json();
        }).then(function (json) {
           
            if (json.address.county) {
                locStr = json.address.county;
            }
            if (json.address.city) {
                locStr = json.address.city;
            }
            if (json.address.town) {
                locStr = json.address.town;
            }
            if (json.address.village) {
                locStr = json.address.village;
            }
            if (json.address.road) {
                locStr += ", " + json.address.road;
            }
            $("#addressSignUp").val(locStr)
        });
}


function initGeolocation() {
    if (navigator.geolocation) {
        // Call getCurrentPosition with success and failure callbacks
        navigator.geolocation.getCurrentPosition(success, fail);
    }
    else {
        alert("Sorry, your browser does not support geolocation services.");
    }
 
}

function success(position) {
    Lat = position.coords.latitude;
    Lon = position.coords.longitude;
    reverseGeocode();
}
function fail() {

}

function addressDataGetSuccess(Data) {
    console.log(Data)
  
}

function addressDataGetError() {
    console.log("error")

}

function homePage() {
    hideAll();
    $("#homePage").show();
    $('#reviewTable').DataTable().destroy();
    ajaxCall("GET", apiURLgetReview + currentChef.Email + '/', "", GetReviewsSuccess, GetReviewsError);

}
function myDishesPage() {
    hideAll();
    
    $('#myDishesTable').DataTable().destroy();
    ajaxCall("GET", apiURLgetDishes + currentChef.Email + '/', "", GetMyDishesSuccess, GetMyDishesError);
 
    $("#myDishesPage").show();
    $("#myDishesDiv").show();

}



function GetMyDishesSuccess(myDishesData) {
    ChefDishes = myDishesData;
    a = 0;
    console.log(ChefDishes)
    try {
        tbl = $('#myDishesTable').DataTable({
            data: myDishesData,
            pageLength: 50,
            columns: [
                { data: "Id" },
                { data: "DisplayName" },
                { data: "DishType" },
                { data: "Description" },
                { data: "Price" },
                {
                    render: function (data, type, row, meta) {
                        eBtn = '<i id="editBtn" onclick="editBtn(' + row.Id + ')" class="fa fa-pencil" />';
                        return eBtn ;
                    },
                },
                {
                    render: function (data, type, row, meta) {
                        dBtn = '<i id="editBtn" onclick="deleteBtn(' + row.Id + ')" class="fa fa-trash" />';
                        return  dBtn;

                    },
                },
             
            ],
          
        });
    }

    catch (err) {
        alert(err);
    }
}
function editBtn(rowid) {
    $("#editmyDishesDiv").show();
    $("#myDishesDiv").hide();
    mode = "edit";
    for (i in ChefDishes) {
        if (ChefDishes[i].Id == rowid) {
            currentDish = ChefDishes[i]
            console.log(currentDish)
            $("#dishName").val(ChefDishes[i].DisplayName);
            $("#dishType").val(ChefDishes[i].DishType);
            $("#dishDescription").val(ChefDishes[i].Description);
            $("#dishPrice").val(ChefDishes[i].Price);
            $("#dishImage").val(ChefDishes[i].Img);
            $("#dishImg").attr('src', ChefDishes[i].Img);
           
        }
    }
}

function newDishBtn() {
    clearEditForm();
    $("#editmyDishesDiv").show();
    $("#myDishesDiv").hide();
    mode = "new";
}

function submitEditForm() {
    let check = validateForm();
    if (check) {
        if (mode == "new") {
            console.log(mode)
            let dishObject = {
                Email: currentDish.Email,
                DisplayName: currentDish.DisplayName,
                Img: currentDish.Img,
                DishType: currentDish.DishType,
                Description: currentDish.Description,
                Price: currentDish.Price
                
            }
            console.log(mode)
            console.log(currentDish);
            ajaxCall("POST", apiURLpostDish, JSON.stringify(dishObject), UpdateDishSuccess, UpdateDishError);
        }

        if (mode == "edit") {
            let dishObject = {
                Id: currentDish.Id,
                Email: currentDish.Email,
                DisplayName: currentDish.DisplayName,
                Img: currentDish.Img,
                DishType: currentDish.DishType,
                Description: currentDish.Description,
                Price: currentDish.Price
            }
            console.log(mode)
            console.log(dishObject);
            ajaxCall("PUT", apiURLputDish, JSON.stringify(dishObject), UpdateDishSuccess, UpdateDishError)
            //ajaxCall("PUT", apiURLputDish + "/" + JSON.stringify(currentDish.Id) + "/" + JSON.stringify(currentDish.Email) + "/" + JSON.stringify(currentDish.DisplayName) + "/" + JSON.stringify(currentDish.Img) + "/" + JSON.stringify(currentDish.DishType) + "/" + JSON.stringify(currentDish.Description) + "/" + currentDish.Price,"", UpdateDishSuccess, UpdateDishError);
        }
    }

}
function UpdateDishSuccess() {
    $("#editmyDishesDiv").hide();
    $("#myDishesDiv").show();
    $('#myDishesTable').DataTable().destroy();
    ajaxCall("GET", apiURLgetDishes + currentChef.Email + '/', "", GetMyDishesSuccess, GetMyDishesError);

}
function UpdateDishError() {
    swal("משהו השתבש", " ", "error");
}

function  validateForm() {
    if ($("#dishName").val() == "" || $("#dishType").val() == "" || $("#dishDescription").val() == "" || $("#dishPrice").val() == "" || $("#dishPrice").val() == "") {
        swal("חסרים פרטים", " ", "error");
        return false;
    }
    else {
        currentDish.DisplayName = $("#dishName").val();
        currentDish.DishType = $("#dishType").val();
        currentDish.Description = $("#dishDescription").val();
        currentDish.Price = parseFloat($("#dishPrice").val());
        currentDish.Img = $("#dishImage").val();
        currentDish.Email = currentChef.Email

        return true;
    }
}

function clearEditForm() {
    $("#dishName").val("");
    $("#dishType").val("");
    $("#dishDescription").val("");
    $("#dishPrice").val("");
    $("#dishImage").val("");
    $("#dishImg").attr('src', "https://i.stack.imgur.com/y9DpT.jpg");
}




function deleteBtn(rowid) {
    console.log(rowid)
    swal({
        title: "Are you sure ??",
        text: "",
        icon: "warning",
        buttons: true,
        dangerMode: true
    })
        .then(function (willDelete) {
            if (willDelete) DeleteDish(rowid);
            else swal("Not Deleted!");
        });
    
}

function DeleteDish(rowid) {
    ajaxCall("DELETE", apiURLdeleteDish+"/"+rowid, "", deleteSuccess, deleteError);
}

function GetMyDishesError() {
    console.log("GetMyDishesError")
}

function deleteSuccess() {
    swal("המנה נמחקה בהצלחה", "", "success");
    $('#myDishesTable').DataTable().destroy();
    ajaxCall("GET", apiURLgetDishes + currentChef.Email + '/', "", GetMyDishesSuccess, GetMyDishesError);
}
function deleteError() {
    swal("משהו השתבש", " ", "error");
}




function ordersPage() {
    hideAll();
    $('#ordersTable').DataTable().destroy();
    ajaxCall("GET", apiURLgetOrders + currentChef.Email + '/', "", GetordersSuccess, GetOrdersError);
 
    $("#ordersPage").show();

}
var tbl;

function GetordersSuccess(orderData) {
    ChefOrders = orderData;
    a = 0;
    try {
        tbl = $('#ordersTable').DataTable({
            data: orderData,
            pageLength: 50,
            columns: [
                { data: "OrderId" },
                { data: "Uid" },
                { data: "OrderTime" },
                { data: "OrderDescription" },
                { data: "TotalPrice" },
                { data: "ReviewId" },
                { data: "Status" },
                {
                    render: function (data, type, row, meta) {
                        let sBtn = "";
                        let cBtn = "";
                        if (row.Status == "open") {
                            sBtn = '<button  class="buttonApprove" onclick="statusBtn(' + row.OrderId + ',\'approved\')">accept</button>'
                            cBtn = '<button  class="buttonCancel"  onclick="statusBtn(' + row.OrderId + ',\'canceled\')">reject</button>'
                        }
                        if (row.Status == "approved") {
                            sBtn = '<button  class="buttonReady" onclick="statusBtn(' + row.OrderId + ',\'ready\')">ready</button>'
                           
                        }
                        if (row.Status == "ready") {
                            sBtn = '<button  class="buttonClose" onclick="statusBtn(' + row.OrderId + ',\'close\')">delivered</button>'
                          
                        }
                     
                        return sBtn + cBtn;
                    },
                },
            ],
            
        });
    }
    catch (err) {
        alert(err);
    }
}

function statusBtn(rowId, status) {
    console.log(status)
    switch (status) {
        case "approved":
            ajaxCall("PUT", apiURLputStatusInOrders + rowId + '/approved', "", putOrderSuccess, putOrderError);
            break;
        case "canceled":
            ajaxCall("PUT", apiURLputStatusInOrders + rowId + '/canceled', "", putOrderSuccess, putOrderError);
            break;
        case "ready":
            ajaxCall("PUT", apiURLputStatusInOrders + rowId + '/ready', "", putOrderSuccess, putOrderError);
            break;
        case "close":
            ajaxCall("PUT", apiURLputStatusInOrders + rowId + '/close', "", putOrderSuccess, putOrderError);
            break;
        default:
    }
    $('#ordersTable').DataTable().destroy();
    ajaxCall("GET", apiURLgetOrders + currentChef.Email + '/', "", GetordersSuccess, GetOrdersError);

}

function putOrderSuccess() {
    swal("עודכן בהצלחה", "", "success");
}
function putOrderError() {
    swal("נסה שנית", " ", "error");
}
    


function GetOrdersError() {
    swal("נסה שנית", " ", "error");
}

function profilePage() {
    hideAll();
    $("#profilePage").show();
    $("#saveProfileBtn").hide();
    $("#profileImg").attr('src', currentChef.Img);
    $("#profileName").val(currentChef.FirstName + " " + currentChef.LastName);
    $("#profileAddress").val(currentChef.Address);
    $("#profileRestaurantName").val(currentChef.DisplayName);
    $("#profileEmail").val(currentChef.Email);
    $("#profilePhone").val(currentChef.PNumber);
    $("#profileImgUrl").val(currentChef.Img);
}
function LogoOut() {
    location.reload();
}
function editProfileBtn() {
 
    $("#profileName").prop('disabled', false);
    $("#profileRestaurantName").prop('disabled', false);
    $("#profilePhone").prop('disabled', false);
    $("#profileImgUrl").prop('disabled', false);
    
    $("#editProfileBtn").hide();
    $("#saveProfileBtn").show();

    
    $("#profileName").prop('disabled', false);
}
function saveProfileBtn() {
    $("#profileName").prop('disabled', true);
    $("#profileRestaurantName").prop('disabled', true);
    $("#profilePhone").prop('disabled', true);
    $("#profileImgUrl").prop('disabled', true);
  
    $("#saveProfileBtn").hide();
    $("#editProfileBtn").show();
    const fullName = $("#profileName").val().split(" ");
   

    currentChef.DisplayName = $("#profileRestaurantName").val();
    currentChef.FirstName = fullName[0]
    currentChef.LastName = fullName[1]
    currentChef.Img = $("#profileImgUrl").val();
    currentChef.PNumber = $("#profilePhone").val();
    console.log(currentChef)

    ajaxCall("PUT", apiURLputChef, JSON.stringify(currentChef), putChefSuccess,  putChefError)
}

function putChefSuccess() {
    swal("עודכן בהצלחה ", "", "success");
}
function putChefError() {
    swal("משהו השתבש ", "", "error");
}
   




/*<*********************************************************navBar***********************************************>*/

(function ($) {
    $(function () {

        //  open and close nav 
        $('#navbar-toggle').click(function () {
            $('nav ul').slideToggle();
        });


        // Hamburger toggle
        $('#navbar-toggle').on('click', function () {
            this.classList.toggle('active');
        });


        // If a link has a dropdown, add sub menu toggle.
        $('nav ul li a:not(:only-child)').click(function (e) {
            $(this).siblings('.navbar-dropdown').slideToggle("slow");

            // Close dropdown when select another dropdown
            $('.navbar-dropdown').not($(this).siblings()).hide("slow");
            e.stopPropagation();
        });


        // Click outside the dropdown will remove the dropdown class
        $('html').click(function () {
            $('.navbar-dropdown').hide();
        });
    });
})(jQuery); 


