using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WebApplication15.Models;

namespace WebApplication15.Models
{
    public class User
    {
        public string Uid { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string City { get; set; }
        public string PNumber { get; set; }
        public double Lat { get; set; }
        public double Lon { get; set; }
        public string Img { get; set; }


        public User()
        {
        }
        public User(string uid, string firstName, string lastName, string email, string city, string pNumber, double lat, double lon, string img)
        {
            Uid = uid;
            FirstName = firstName;
            LastName = lastName;
            Email = email;
            City = city;
            PNumber = pNumber;
            Lat = lat;
            Lon = lon;
            Img = img;
            
        }

        public int insert()
        {
            DBservices db = new DBservices();
            return db.insert(this);
        }
    }
}