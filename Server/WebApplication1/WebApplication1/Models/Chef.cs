using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Headers;
using System.Web;
using WebApplication15.Models;

namespace WebApplication15.Models
{
    public class Chef
    {
        public string Email { get; set; }
        public string DisplayName { get; set; } //
        public string FirstName { get; set; } //
        public string LastName { get; set; } //
        public string Address { get; set; } //
        public string PNumber { get; set; } //
        public double Lon { get; set; } //
        public double Lat { get; set; } //
        public double Rating { get; set; }
        public string Img { get; set; } //
        public string FoodType { get; set; } //
        public int NumOfReviews { get; set; }
        public string ChefUid { get; set; }

        public Chef()
        {

        }
        public Chef(string email, string displayName, string firstName, string lastName, string address, string pNumber, double lon, double lat, double rating, string img, string foodType, int numOfReviews)
        {
            Email = email;
            DisplayName = displayName;
            FirstName = firstName;
            LastName = lastName;
            Address = address;
            PNumber = pNumber;
            Lon = lon;
            Lat = lat;
            Rating = rating;
            Img = img;
            FoodType = foodType;
            NumOfReviews = numOfReviews;
        }

        public Chef(string email, string displayName, string firstName, string lastName, string address, string pNumber, double lon, double lat, double rating, string img, string foodType, int numOfReviews, string chefUid)
        {
            Email = email;
            DisplayName = displayName;
            FirstName = firstName;
            LastName = lastName;
            Address = address;
            PNumber = pNumber;
            Lon = lon;
            Lat = lat;
            Rating = rating;
            Img = img;
            FoodType = foodType;
            NumOfReviews = numOfReviews;
            ChefUid = chefUid;
        }
        public Chef(string email, string displayName, string firstName, string lastName, string address, string pNumber, double lon, double lat, string img, string foodType, string chefUid)
        {
            Email = email;
            DisplayName = displayName;
            FirstName = firstName;
            LastName = lastName;
            Address = address;
            PNumber = pNumber;
            Lon = lon;
            Lat = lat;
            Img = img;
            FoodType = foodType;
            ChefUid = chefUid;
        }

        public static void updateRating(string chefEmail,double reviewRating)
        {
            DBservices db = new DBservices();
            Chef chef = db.getChefByEmail(chefEmail);
            double newRating = (chef.Rating * chef.NumOfReviews + reviewRating) / (chef.NumOfReviews + 1);
            db.updateChefRating(chef.ChefUid, newRating, chef.NumOfReviews + 1);
        }
        public int insert()
        {
            DBservices db = new DBservices();
            return db.insert(this);
        }

    }
}