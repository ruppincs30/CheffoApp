using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WebApplication15.Models;

namespace WebApplication15.Models
{
    public class Review
    {

        public int ReviewId { get; set; }
        public string UserUid { get; set; }
        public string UserFirstName { get; set; }
        public string UserLastName { get; set; }
        public string UserEmail { get; set; }
        public string UserImg { get; set; }
        public string ReviewText { get; set; }
        public double ReviewRating { get; set; }
        public double ServiceRating { get; set; }
        public double FoodRating { get; set; }
        public string DisplayName { get; set; }
        public string ChefFirstName { get; set; }
        public string ChefLastName { get; set; }
        public string ChefEmail { get; set; }
        public string Address { get; set; }
        public string ChefImg { get; set; }
        public string FoodType { get; set; }
        public int OrderId { get; set; }


        public Review(string userUid, string chefEmail, string reviewText, double reviewRating, double serviceRating, double foodRating)
        {
            UserUid = userUid;
            ChefEmail = chefEmail;
            ReviewText = reviewText;
            ReviewRating = reviewRating;
            ServiceRating = serviceRating;
            FoodRating = foodRating;
        }

        public Review()
        {

        }

        public Review(int reviewId, string userUid, string userFirstName, string userLastName, string userEmail, string userImg, string reviewText, double reviewRating, double serviceRating, double foodRating, string displayName, string chefFirstName, string chefLastName, string chefEmail, string address, string chefImg, string foodType, int orderId)
        {
            ReviewId = reviewId;
            UserUid = userUid;
            UserFirstName = userFirstName;
            UserLastName = userLastName;
            UserEmail = userEmail;
            UserImg = userImg;
            ReviewText = reviewText;
            ReviewRating = reviewRating;
            ServiceRating = serviceRating;
            FoodRating = foodRating;
            DisplayName = displayName;
            ChefFirstName = chefFirstName;
            ChefLastName = chefLastName;
            ChefEmail = chefEmail;
            Address = address;
            ChefImg = chefImg;
            FoodType = foodType;
            OrderId = orderId;
        }

        public int insert()
        {
            DBservices db = new DBservices();
            return db.insert(this);
        }

    }
}