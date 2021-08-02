using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebApplication15.Models;

namespace WebApplication15.Controllers
{
    public class ReviewController : ApiController
    {
        //[Route("api/Review/scrPost")]
        //public IHttpActionResult scriptPost([FromBody] Review rev)
        //{
        //    try
        //    {
        //        rev.insert();
        //        return Created(new Uri(Request.RequestUri.AbsoluteUri + rev.UserUid), rev);
        //    }
        //    catch (Exception ex)
        //    {
        //        return BadRequest(ex.Message);
        //    }
        //}

        [Route("api/Review/postReview")]
        public IHttpActionResult postReview([FromBody] Review rev)
        {
            try
            {
                rev.insert();
                DBservices db = new DBservices();
                Chef.updateRating(rev.ChefEmail,rev.ReviewRating);
                return Ok(db.getReview(rev));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("api/Review/getUserReviews/{uid}")]
        public IHttpActionResult Get(string uid)
        {
            try
            {
                DBservices db = new DBservices();
                return Ok(db.getUserReviews(uid));
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.BadRequest, ex);
                throw;
            }
        }
        [Route("api/Review/getChefReviews/{email}")]
        public IHttpActionResult getChefReviews(string email)
        {
            try
            {
                DBservices db = new DBservices();
                return Ok(db.getChefReviews(email));
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.BadRequest, ex);
                throw;
            }
        }

        [Route("api/Review/getReviews")]
        public IHttpActionResult Get()
        {
            try
            {
                DBservices db = new DBservices();
                return Ok(db.getReviews());
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.BadRequest, ex);
                throw;
            }
        }
    }
}
