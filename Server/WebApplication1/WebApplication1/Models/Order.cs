using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WebApplication15.Models;

namespace WebApplication15.Models
{
    public class Order
    {
        public string Uid { get; set; }
        public string ChefEmail { get; set; }
        public string OrderTime { get; set; }
        public string OrderDescription { get; set; }
        public double TotalPrice { get; set; }
        public string Chef { get; set; }
        public int OrderId { get; set; }
        public int ReviewId { get; set; }
        public string Status { get; set; }



        public Order()
        {
        }

        public Order(string uid, string chefEmail, string orderTime, string orderDescription, double totalPrice, string chef)
        {
            Uid = uid;
            ChefEmail = chefEmail;
            OrderTime = orderTime;
            OrderDescription = orderDescription;
            TotalPrice = totalPrice;
            Chef = chef;
        }
        public Order(string uid, string chefEmail, string orderTime, string orderDescription, double totalPrice, string chef, int orderId)
        {
            Uid = uid;
            ChefEmail = chefEmail;
            OrderTime = orderTime;
            OrderDescription = orderDescription;
            TotalPrice = totalPrice;
            Chef = chef;
            OrderId = orderId;
        }

        public Order(string uid, string chefEmail, string orderTime, string orderDescription, double totalPrice, string chef, int orderId, string status, int reviewId)
        {
            Uid = uid;
            ChefEmail = chefEmail;
            OrderTime = orderTime;
            OrderDescription = orderDescription;
            TotalPrice = totalPrice;
            Chef = chef;
            OrderId = orderId;
            Status = status;
            ReviewId = reviewId;
        }

        public int insert()
        {
            DBservices db = new DBservices();
            return db.insert(this);
        }
    }
}