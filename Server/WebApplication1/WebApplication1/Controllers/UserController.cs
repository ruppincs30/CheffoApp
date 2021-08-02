using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebApplication15.Models;


namespace WebApplication15.Controllers
{
    public class UserController : ApiController
    {

        [Route("api/User/getUser/{uid}")]
        public IHttpActionResult Get(string uid)
        {
            try
            {
                DBservices db = new DBservices();
                return Ok(db.getUser(uid));
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.BadRequest, ex);
                throw;
            }
        }
        public IHttpActionResult Post([FromBody] User u)
        {
            try
            {
                u.insert();
                return Created(new Uri(Request.RequestUri.AbsoluteUri + u.Uid), u);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [Route("api/User/putUser/{img}/{uid}")]
        public IHttpActionResult Put(string img, string uid)
        {
            try
            {
                DBservices db = new DBservices();
                db.putImg(img, uid);
                return Created(new Uri(Request.RequestUri.AbsoluteUri + uid), uid);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // added for script ***********************************************
        [Route("api/User/getUsers")]
        public IHttpActionResult GetUsers()
        {
            try
            {
                DBservices db = new DBservices();
                return Ok(db.getUsers());
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.BadRequest, ex);
                throw;
            }
        }
        // added for script ***********************************************

    }
}