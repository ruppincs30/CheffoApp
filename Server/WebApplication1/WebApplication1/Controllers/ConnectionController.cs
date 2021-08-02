using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebApplication15.Models;


namespace WebApplication15.Controllers
{
    public class ConnectionController : ApiController
    {
        [Route("api/Connection/getConnections/{uid}")]
 
        public IHttpActionResult Get(string uid)
        {
            try
            {
                DBservices db = new DBservices();
                return Ok(db.getConnections(uid));
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.BadRequest, ex);
                throw;
            }
        }

        [Route("api/Connection/Post")]
        public IHttpActionResult Post([FromBody] Connection con)
        {
            try
            {
                con.insert();
                return Created(new Uri(Request.RequestUri.AbsoluteUri + con.SourceUid), con);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [Route("api/Connection/Delete")]
        public IHttpActionResult Delete([FromBody] Connection con)
        {
            try
            {
                con.delete();
                return Created(new Uri(Request.RequestUri.AbsoluteUri + con.SourceUid), con);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        //public IHttpActionResult Get(string uid)
        //{
        //    try
        //    {
        //        DBservices db = new DBservices();
        //        return Ok(db.getUser(uid));
        //    }
        //    catch (Exception ex)
        //    {
        //        return Content(HttpStatusCode.BadRequest, ex);
        //        throw;
        //    }
        //}
        // added for script ***********************************************

        [Route("api/Connection/scrPost")]
        public IHttpActionResult scriptPost([FromBody] Connection con)
        {
            try
            {
                con.insert();
                return Created(new Uri(Request.RequestUri.AbsoluteUri + con.SourceUid), con);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        // added for script ***********************************************
    }
}
