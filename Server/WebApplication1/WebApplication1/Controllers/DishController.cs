using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebApplication15.Models;
using WebGrease.Activities;

namespace WebApplication15.Controllers
{
    public class DishController : ApiController
    {

        [Route("api/Dish/getDishes/{email}")]
        public IHttpActionResult Get(string email)
        {
            try
            {
                DBservices db = new DBservices();
                return Ok(db.getDishes(email));
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.BadRequest, ex);
                throw;
            }
            
        }
        [Route("api/Dish/Put")]
        public IHttpActionResult Put([FromBody] Dish dish)
        {
            try
            {
                DBservices db = new DBservices();
                return Ok(db.updateDish(dish));
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.BadRequest, ex);
                throw;
            }

        }
        [Route("api/Dish/Post")]
        public IHttpActionResult Post([FromBody]Dish dish)
        {
            try
            {
                dish.insert();
                return Created(new Uri(Request.RequestUri.AbsoluteUri + dish.Id), dish);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [Route("api/Dish/Delete/{id}")]
        public IHttpActionResult Delete(int id)
        {
            try
            {
                Dish curr = new Dish(id);
                return Ok(curr.delete());
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.BadRequest, ex);
                throw;
            }

        }
    }
}