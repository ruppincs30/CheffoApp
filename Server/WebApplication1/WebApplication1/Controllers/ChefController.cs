using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebApplication15.Models;


namespace WebApplication15.Controllers
{
    public class ChefController : ApiController
    {

        [Route("api/Chef/getChefs")]
        public IHttpActionResult Get()
        {
            try
            {
                DBservices db = new DBservices();
                return Ok(db.getChefs());
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.BadRequest, ex);
                throw;
            }
        }

        [Route("api/Chef/Post")]
        public IHttpActionResult Post([FromBody]Chef chef)
        {
            try
            {
                return Ok(chef.insert());
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("api/Chef/getChef/{chefUid}")]
        public IHttpActionResult GetChef(string chefUid)
        {
            try
            {
                DBservices db = new DBservices();
                return Ok(db.getChef(chefUid));
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.BadRequest, ex);
                throw;
            }
        }
        [Route("api/Chef/Put")]
        public IHttpActionResult Put([FromBody]Chef chef)
        {
            try
            {
                DBservices db = new DBservices();
                return Ok(db.updateChef(chef));
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.BadRequest, ex);
                throw;
            }
        }



    }
}