using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WebApplication15.Models;

namespace WebApplication15.Models
{
    public class Dish
    {

        public int Id { get; set; }
        public string Email { get; set; }
        public string DisplayName { get; set; }
        public string Img { get; set; }
        public string DishType { get; set; }
        public string Description { get; set; }
        public double Price { get; set; }

        public Dish()
        {

        }
        public Dish(int id)
        {
            Id = id;
        }

        public Dish(int id, string email, string displayName, string img, string dishType, string description, double price)
        {
            Id = id;
            Email = email;
            DisplayName = displayName;
            Img = img;
            DishType = dishType;
            Description = description;
            Price = price;
        }
        public Dish(string email, string displayName, string img, string dishType, string description, double price)
        {
            Email = email;
            DisplayName = displayName;
            Img = img;
            DishType = dishType;
            Description = description;
            Price = price;
        }

        public int delete()
        {
            DBservices db = new DBservices();
            return db.delete(this);
        }
        public int insert()
        {
            DBservices db = new DBservices();
            return db.insert(this);
        }
    }
}