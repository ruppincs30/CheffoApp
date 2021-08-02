using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebApplication15.Models;


namespace WebApplication15.Controllers
{
    public class OrderController : ApiController
    {

        [Route("api/Order/getOrder/{uid}")]
        public IHttpActionResult Get(string uid)
        {
            try
            {
                DBservices db = new DBservices();
                return Ok(db.getOrders(uid));
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.BadRequest, ex);
                throw;
            }
        }

        [Route("api/Order/getOrders/{email}")]
        public IHttpActionResult GetByEmail(string email)
        {
            try
            {
                DBservices db = new DBservices();
                return Ok(db.getOrdersByEmail(email));
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.BadRequest, ex);
                throw;
            }
        }
        public IHttpActionResult Post([FromBody] Order o)
        {
            try
            {
                o.insert();
                DBservices db = new DBservices();
                return Ok(db.getOrder(o));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("api/Order/putReviewId/{orderId}/{reviewId}")]
        public IHttpActionResult PutReviewId(int orderId, int reviewId)
        {
            try
            {
                DBservices db = new DBservices();
                db.PutReviewIdInOrder(orderId,reviewId);
                return Created(new Uri(Request.RequestUri.AbsoluteUri + orderId), orderId);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("api/Order/putOrderStatus/{orderId}/{status}")]
        public IHttpActionResult PutOrderStatus(int orderId, string status)
        {
            try
            {
                DBservices db = new DBservices();
                db.PutStatusInOrder(orderId, status);
                return Created(new Uri(Request.RequestUri.AbsoluteUri + orderId), orderId);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}