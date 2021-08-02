using Microsoft.Ajax.Utilities;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Runtime.Remoting.Messaging;
using System.Text;
using System.Web;
using System.Web.Configuration;

namespace WebApplication15.Models
{
    /// <summary>
    /// DBServices is a class created by me to provides some DataBase Services
    /// </summary>
    public class DBservices
    {
        public SqlDataAdapter da;
        public DataTable dt;

        public DBservices()
        {
        }

        public SqlConnection connect(String conString)
        {

            // read the connection string from the configuration file
            string cStr = WebConfigurationManager.ConnectionStrings[conString].ConnectionString;
            SqlConnection con = new SqlConnection(cStr);
            con.Open();
            return con;
        }

        public int insert(object currobject)
        {

            SqlConnection con;
            SqlCommand cmd;

            try
            {
                con = connect("DBConnectionString"); // create the connection
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }

            String objectStr = BuildInsertCommand(currobject);      // helper method to build the insert string

            cmd = CreateCommand(objectStr, con);             // create the command

            try
            {
                int numEffected = cmd.ExecuteNonQuery(); // execute the command
                return numEffected;
            }
            catch (Exception ex)
            {
                return 0;
                // write to log
                throw (ex);
            }

            finally
            {
                if (con != null)
                {
                    // close the db connection
                    con.Close();
                }
            }

        }

        public int delete(object currobject)
        {

            SqlConnection con;
            SqlCommand cmd;

            try
            {
                con = connect("DBConnectionString"); // create the connection
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }

            String objectStr = BuildDeleteCommand(currobject);      // helper method to build the insert string

            cmd = CreateCommand(objectStr, con);             // create the command

            try
            {
                int numEffected = cmd.ExecuteNonQuery(); // execute the command
                return numEffected;
            }
            catch (Exception ex)
            {
                return 0;
                // write to log
                throw (ex);
            }

            finally
            {
                if (con != null)
                {
                    // close the db connection
                    con.Close();
                }
            }

        }

        //--------------------------------------------------------------------
        // Build the Insert command String
        //--------------------------------------------------------------------
        private String BuildInsertCommand(object currobject)
        {
            // use a string builder to create the dynamic string
            StringBuilder sb = new StringBuilder();

            // checks which object
            if (currobject is User)
            {
                User userObj = currobject as User;
                sb.AppendFormat("Values('{0}', '{1}', '{2}', '{3}', '{4}', '{5}', '{6}', '{7}')", userObj.Uid, userObj.FirstName, userObj.LastName, userObj.Email, userObj.City, userObj.PNumber, userObj.Lat, userObj.Lon);
                String prefix = "INSERT INTO Users " + "(uid, firstName, lastName, email, city, pNumber, lat, lon) ";
                String command = prefix + sb.ToString();
                return command;
            }
            else if (currobject is Order)
            {
                Order orderObj = currobject as Order;
                sb.AppendFormat("Values('{0}', '{1}', '{2}', '{3}', '{4}','{5}','{6}')", orderObj.Uid, orderObj.ChefEmail, orderObj.OrderTime, orderObj.OrderDescription, orderObj.TotalPrice, orderObj.Chef, orderObj.Status);
                String prefix = "INSERT INTO Orders " + "(uid, chefEmail, orderTime, orderDescription, totalPrice, chef, status) ";
                String command = prefix + sb.ToString();
                return command;
            }
            else if (currobject is Connection)
            {
                Connection connectionObj = currobject as Connection;
                sb.AppendFormat("Values('{0}', '{1}')", connectionObj.SourceUid, connectionObj.TargetUid);
                String prefix = "INSERT INTO Connections " + "(sourceUid, targetUid) ";
                String command = prefix + sb.ToString();
                return command;
            }
            else if (currobject is Review)
            {
                Review reviewObj = currobject as Review;
                sb.AppendFormat("Values('{0}', '{1}', '{2}', '{3}', '{4}','{5}','{6}')", reviewObj.UserUid, reviewObj.ChefEmail, reviewObj.ReviewText, reviewObj.ReviewRating, reviewObj.ServiceRating, reviewObj.FoodRating, reviewObj.OrderId);
                String prefix = "INSERT INTO Reviews " + "(userUid, chefEmail,reviewText,reviewRating,serviceRating,foodRating,orderId) ";
                String command = prefix + sb.ToString();
                return command;
            }
            else if (currobject is Dish)
            {
                Dish dishObj = currobject as Dish;
                sb.AppendFormat("Values('{0}', '{1}', '{2}', '{3}', '{4}','{5}')", dishObj.Email, dishObj.DisplayName, dishObj.Img, dishObj.DishType, dishObj.Description, dishObj.Price);
                String prefix = "INSERT INTO Dishes " + "(email, displayName, img, dishType, description, price)";
                String command = prefix + sb.ToString();
                return command;
            }
            else if (currobject is Chef)
            {
                Chef chefObj = currobject as Chef;
                sb.AppendFormat("Values('{0}', '{1}', '{2}', '{3}', '{4}','{5}','{6}','{7}','{8}','{9}','{10}')", chefObj.Email, chefObj.DisplayName, chefObj.Img, chefObj.Address, chefObj.ChefUid, chefObj.FirstName, chefObj.LastName, chefObj.PNumber, chefObj.Lat, chefObj.Lon, chefObj.FoodType);
                String prefix = "INSERT INTO Chefs " + "(email, displayName, img, address, chefUid, firstName, lastName, pNumber, lat, lon, foodType)";
                String command = prefix + sb.ToString();
                return command;
            }
            else
            {
                return "0";
            }

        }

        private String BuildDeleteCommand(object currobject)
        {
            // use a string builder to create the dynamic string
            StringBuilder sb = new StringBuilder();

            // checks which object
            if (currobject is Connection)
            {
                Connection connectionObj = currobject as Connection;
                String prefix = "DELETE FROM Connections WHERE sourceUid='" + connectionObj.SourceUid + "' and targetUid='" + connectionObj.TargetUid + "'";
                String command = prefix;
                return command;
            }
            else if (currobject is Dish)
            {
                Dish dishObj = currobject as Dish;
                String prefix = "DELETE FROM Dishes WHERE id='" + dishObj.Id + "'";
                String command = prefix;
                return command;
            }
            else
            {
                return "0";
            }

        }
        //---------------------------------------------------------------------------------
        // Create the SqlCommand
        //---------------------------------------------------------------------------------
        private SqlCommand CreateCommand(String CommandSTR, SqlConnection con)
        {

            SqlCommand cmd = new SqlCommand(); // create the command object

            cmd.Connection = con;              // assign the connection to the command object

            cmd.CommandText = CommandSTR;      // can be Select, Insert, Update, Delete 

            cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

            cmd.CommandType = System.Data.CommandType.Text; // the type of the command, can also be stored procedure

            return cmd;
        }
        public User getUser(string uid)
        {
            SqlConnection con = null;

            try
            {

                con = connect("DBConnectionString"); // create a connection to the database using the connection String defined in the web config file

                String selectSTR = "select * from Users where uid='" + uid + "'";
                SqlCommand cmd = new SqlCommand(selectSTR, con);

                // get a reader
                SqlDataReader dr = cmd.ExecuteReader(CommandBehavior.CloseConnection); // CommandBehavior.CloseConnection: the connection will be closed after reading has reached the end
                User user = new User();
                while (dr.Read())
                {   // Read till the end of the data into a row
                    user.Uid = (string)dr["uid"];
                    user.FirstName = (string)dr["firstName"];
                    user.LastName = (string)dr["lastName"];
                    user.Email = (string)dr["email"];
                    user.City = (string)dr["city"];
                    user.PNumber = (string)dr["pNumber"];
                    user.Lat = Decimal.ToDouble((decimal)dr["lat"]);
                    user.Lon = Decimal.ToDouble((decimal)dr["lon"]);
                    user.Img = dr["img"] == System.DBNull.Value ? "https://cdn3.iconfinder.com/data/icons/avatars-round-flat/33/man5-512.png" : (string)dr["img"];
                }
                return user;
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }
            finally
            {
                if (con != null)
                {
                    con.Close();
                }

            }
        }
        // added for script ***********************************************
        // added for script ***********************************************
        // added for script ***********************************************
        // added for script ***********************************************
        // added for script ***********************************************
        public List<User> getUsers()
        {
            SqlConnection con = null;

            try
            {

                con = connect("DBConnectionString"); // create a connection to the database using the connection String defined in the web config file

                String selectSTR = "select * from Users";
                SqlCommand cmd = new SqlCommand(selectSTR, con);

                // get a reader
                SqlDataReader dr = cmd.ExecuteReader(CommandBehavior.CloseConnection); // CommandBehavior.CloseConnection: the connection will be closed after reading has reached the end
                List<User> users = new List<User>();
                while (dr.Read())
                {   // Read till the end of the data into a row
                    User user = new User();
                    user.Uid = (string)dr["uid"];
                    user.FirstName = (string)dr["firstName"];
                    user.LastName = (string)dr["lastName"];
                    user.Email = (string)dr["email"];
                    user.City = (string)dr["city"];
                    user.PNumber = (string)dr["pNumber"];
                    user.Lat = Decimal.ToDouble((decimal)dr["lat"]);
                    user.Lon = Decimal.ToDouble((decimal)dr["lon"]);
                    user.Img = dr["img"] == System.DBNull.Value ? "https://cdn3.iconfinder.com/data/icons/avatars-round-flat/33/man5-512.png" : (string)dr["img"];
                    users.Add(user);
                }
                return users;
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }
            finally
            {
                if (con != null)
                {
                    con.Close();
                }

            }
        }
        // added for script ***********************************************
        // added for script ***********************************************
        // added for script ***********************************************
        // added for script ***********************************************
        // added for script ***********************************************


        public List<Order> getOrders(string uid)
        {
            SqlConnection con = null;

            try
            {
               
                con = connect("DBConnectionString"); // create a connection to the database using the connection String defined in the web config file

                String selectSTR = "select * from Orders where uid='" + uid + "'";
                SqlCommand cmd = new SqlCommand(selectSTR, con);

                // get a reader
                SqlDataReader dr = cmd.ExecuteReader(CommandBehavior.CloseConnection); // CommandBehavior.CloseConnection: the connection will be closed after reading has reached the end
                List<Order> orders = new List<Order>();
                while (dr.Read())
                {   // Read till the end of the data into a row
                    Order order = new Order();
                    order.Uid = (string)dr["uid"];
                    order.ChefEmail = (string)dr["chefEmail"];
                    order.OrderTime = (string)dr["orderTime"];
                    order.OrderDescription = (string)dr["orderDescription"];
                    order.TotalPrice = (double)dr["totalPrice"];
                    order.Chef = (string)dr["chef"];
                    order.OrderId= (int)dr["orderId"];
                    order.Status = (string)dr["status"];
                    order.ReviewId = ((dr["reviewId"] == System.DBNull.Value) ? 0 : (int)dr["reviewId"]);
                    orders.Add(order);
                }
                return orders;
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }
            finally
            {
                if (con != null)
                {
                    con.Close();
                }

            }
        }

        public List<Order> getOrdersByEmail(string email)
        {
            SqlConnection con = null;

            try
            {

                con = connect("DBConnectionString"); // create a connection to the database using the connection String defined in the web config file

                String selectSTR = "select * from Orders where chefEmail='" + email + "'";
                SqlCommand cmd = new SqlCommand(selectSTR, con);

                // get a reader
                SqlDataReader dr = cmd.ExecuteReader(CommandBehavior.CloseConnection); // CommandBehavior.CloseConnection: the connection will be closed after reading has reached the end
                List<Order> orders = new List<Order>();
                while (dr.Read())
                {   // Read till the end of the data into a row
                    Order order = new Order();
                    order.Uid = (string)dr["uid"];
                    order.ChefEmail = (string)dr["chefEmail"];
                    order.OrderTime = (string)dr["orderTime"];
                    order.OrderDescription = (string)dr["orderDescription"];
                    order.TotalPrice = (double)dr["totalPrice"];
                    order.Chef = (string)dr["chef"];
                    order.OrderId = (int)dr["orderId"];
                    order.Status = (string)dr["status"];
                    order.ReviewId = ((dr["reviewId"] == System.DBNull.Value) ? 0 : (int)dr["reviewId"]);
                    orders.Add(order);
                }
                return orders;
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }
            finally
            {
                if (con != null)
                {
                    con.Close();
                }

            }
        }

        public Order getOrder(Order o)
        {
            SqlConnection con = null;
            try
            {
                con = connect("DBConnectionString"); // create a connection to the database using the connection String defined in the web config file

                String selectSTR = "select * from Orders where uid='" + o.Uid + "' and orderTime='"+o.OrderTime+"'";
                SqlCommand cmd = new SqlCommand(selectSTR, con);

                // get a reader
                SqlDataReader dr = cmd.ExecuteReader(CommandBehavior.CloseConnection); // CommandBehavior.CloseConnection: the connection will be closed after reading has reached the end
               Order order = new Order();
                while (dr.Read())
                {   // Read till the end of the data into a row
                    order.Uid = (string)dr["uid"];
                    order.ChefEmail = (string)dr["chefEmail"];
                    order.OrderTime = (string)dr["orderTime"];
                    order.OrderDescription = (string)dr["orderDescription"];
                    order.TotalPrice = (double)dr["totalPrice"];
                    order.Chef = (string)dr["chef"];
                    order.OrderId = (int)dr["orderId"];
                    order.Status = (string)dr["status"];
                    order.ReviewId = ((dr["reviewId"] == System.DBNull.Value) ? 0 : (int)dr["reviewId"]);

                }
                return order;
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }
            finally
            {
                if (con != null)
                {
                    con.Close();
                }

            }
        }

        public List<Chef> getChefs()
        {
            SqlConnection con = null;

            try
            {

                con = connect("DBConnectionString"); // create a connection to the database using the connection String defined in the web config file

                String selectSTR = "select * from Chefs";
                SqlCommand cmd = new SqlCommand(selectSTR, con);

                // get a reader
                SqlDataReader dr = cmd.ExecuteReader(CommandBehavior.CloseConnection); // CommandBehavior.CloseConnection: the connection will be closed after reading has reached the end
                List<Chef> Chefs = new List<Chef>();
                while (dr.Read())
                {   // Read till the end of the data into a row
                    Chef chef = new Chef();
                    chef.Email = (string)dr["email"];
                    chef.DisplayName = (string)dr["displayName"];
                    chef.FirstName = (string)dr["firstName"];
                    chef.LastName = (string)dr["lastName"];
                    chef.Address = (string)dr["address"];
                    chef.PNumber = (string)dr["pNumber"];
                    chef.Lon = Decimal.ToDouble((decimal)dr["lon"]);
                    chef.Lat = Decimal.ToDouble((decimal)dr["lat"]);
                    chef.Rating = (double)dr["rating"];
                    chef.Img = (string)dr["img"];
                    chef.FoodType = (string)dr["foodType"];
                    chef.NumOfReviews = (int)dr["numOfReviews"];
                    Chefs.Add(chef);
                }
                return Chefs;
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }
            finally
            {
                if (con != null)
                {
                    con.Close();
                }

            }
        }


        public Chef getChef(string chefUid)
        {
            SqlConnection con = null;

            try
            {
                con = connect("DBConnectionString"); // create a connection to the database using the connection String defined in the web config file
                String selectSTR = "select * from Chefs WHERE chefUid='" + chefUid + "'";
                SqlCommand cmd = new SqlCommand(selectSTR, con);

                // get a reader
                SqlDataReader dr = cmd.ExecuteReader(CommandBehavior.CloseConnection); // CommandBehavior.CloseConnection: the connection will be closed after reading has reached the end
                Chef chef = new Chef();
                while (dr.Read())
                {   // Read till the end of the data into a row
                    chef.Email = (string)dr["email"];
                    chef.DisplayName = (string)dr["displayName"];
                    chef.FirstName = (string)dr["firstName"];
                    chef.LastName = (string)dr["lastName"];
                    chef.Address = (string)dr["address"];
                    chef.PNumber = (string)dr["pNumber"];
                    chef.Lon = Decimal.ToDouble((decimal)dr["lon"]);
                    chef.Lat = Decimal.ToDouble((decimal)dr["lat"]);
                    chef.Rating = (double)dr["rating"];
                    chef.Img = (string)dr["img"];
                    chef.FoodType = (string)dr["foodType"];
                    chef.NumOfReviews = (int)dr["numOfReviews"];
                    chef.ChefUid = (string)dr["chefUid"];
                }
                return chef;
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }
            finally
            {
                if (con != null)
                {
                    con.Close();
                }

            }
        }

        public void updateChefRating(string chefUid, double newRating,int numOfReviews)
        {
            SqlConnection con = null;

            try
            {
                con = connect("DBConnectionString"); // create a connection to the database using the connection String defined in the web config file
                String updateSTR = "update Chefs set rating=" + newRating + ", numOfReviews=" + numOfReviews + " WHERE chefUid='" + chefUid + "'";
                SqlCommand cmd = new SqlCommand(updateSTR, con);

                // get a reader
                cmd.ExecuteNonQuery();
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }
            finally
            {
                if (con != null)
                {
                    con.Close();
                }

            }
        }

        public int updateDish(Dish dish)
        {
            SqlConnection con = null;

            try
            {
                con = connect("DBConnectionString"); // create a connection to the database using the connection String defined in the web config file
                String updateSTR = "update Dishes set displayName='" + dish.DisplayName + "', dishType='" + dish.DishType + "', description='" + dish.Description + "', price=" + dish.Price + ", img='" + dish.Img + "' WHERE email='" + dish.Email + "' and id=" + dish.Id+"";
                SqlCommand cmd = new SqlCommand(updateSTR, con);

                // get a reader
                return cmd.ExecuteNonQuery();
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }
            finally
            {
                if (con != null)
                {
                    con.Close();
                }

            }
        }

        public int updateChef(Chef chef)
        {
            SqlConnection con = null;

            try
            {
                con = connect("DBConnectionString"); // create a connection to the database using the connection String defined in the web config file
                String updateSTR = "update Chefs set displayName='" + chef.DisplayName + "', firstName='" + chef.FirstName + "', lastName='" + chef.LastName + "', address='" + chef.Address + "', pNumber='" + chef.PNumber + "', lon=" + chef.Lon + ", lat=" + chef.Lat + ", foodType='" + chef.FoodType + "', img='" + chef.Img + "' WHERE chefUid='" + chef.ChefUid + "'";
                SqlCommand cmd = new SqlCommand(updateSTR, con);

                // get a reader
                return cmd.ExecuteNonQuery();
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }
            finally
            {
                if (con != null)
                {
                    con.Close();
                }

            }
        }

        public Chef getChefByEmail(string chefEmail)
        {
            SqlConnection con = null;

            try
            {
                con = connect("DBConnectionString"); // create a connection to the database using the connection String defined in the web config file
                String selectSTR = "select * from Chefs WHERE email='" + chefEmail + "'";
                SqlCommand cmd = new SqlCommand(selectSTR, con);

                // get a reader
                SqlDataReader dr = cmd.ExecuteReader(CommandBehavior.CloseConnection); // CommandBehavior.CloseConnection: the connection will be closed after reading has reached the end
                Chef chef = new Chef();
                while (dr.Read())
                {   // Read till the end of the data into a row
                    chef.Email = (string)dr["email"];
                    chef.DisplayName = (string)dr["displayName"];
                    chef.FirstName = (string)dr["firstName"];
                    chef.LastName = (string)dr["lastName"];
                    chef.Address = (string)dr["address"];
                    chef.PNumber = (string)dr["pNumber"];
                    chef.Lon = Decimal.ToDouble((decimal)dr["lon"]);
                    chef.Lat = Decimal.ToDouble((decimal)dr["lat"]);
                    chef.Rating = (double)dr["rating"];
                    chef.Img = (string)dr["img"];
                    chef.FoodType = (string)dr["foodType"];
                    chef.NumOfReviews = (int)dr["numOfReviews"];
                    chef.ChefUid = (string)dr["chefUid"];
                }
                return chef;
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }
            finally
            {
                if (con != null)
                {
                    con.Close();
                }

            }
        }
        public List<Dish> getDishes(string email)
        {
            SqlConnection con = null;

            try
            {

                con = connect("DBConnectionString"); // create a connection to the database using the connection String defined in the web config file

                String selectSTR = "select * from Dishes WHERE email='" + email + "'";
                SqlCommand cmd = new SqlCommand(selectSTR, con);

                // get a reader
                SqlDataReader dr = cmd.ExecuteReader(CommandBehavior.CloseConnection); // CommandBehavior.CloseConnection: the connection will be closed after reading has reached the end
                List<Dish> Dishes = new List<Dish>();
                while (dr.Read())
                {   // Read till the end of the data into a row
                    Dish dish = new Dish();
                    dish.Id = (int)dr["id"];
                    dish.Email = (string)dr["email"];
                    dish.DisplayName = (string)dr["displayName"];
                    dish.Img = (string)dr["img"];
                    dish.DishType = (string)dr["dishType"];
                    dish.Description = (string)dr["description"];
                    dish.Price = (double)dr["price"];
                    Dishes.Add(dish);
                }
                return Dishes;
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }
            finally
            {
                if (con != null)
                {
                    con.Close();
                }

            }
        }

        public void PutReviewIdInOrder(int orderId, int reviewId)
        {
            SqlConnection con = null;

            try
            {

                con = connect("DBConnectionString"); // create a connection to the database using the connection String defined in the web config file

                String selectSTR = "Update Orders Set reviewId='" + reviewId + "' where orderId='" + orderId + "'";
                SqlCommand cmd = new SqlCommand(selectSTR, con);


                cmd.ExecuteNonQuery(); 
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }
            finally
            {
                if (con != null)
                {
                    con.Close();
                }

            }
        }

        public void PutStatusInOrder(int orderId, string status)
        {
            SqlConnection con = null;

            try
            {

                con = connect("DBConnectionString"); // create a connection to the database using the connection String defined in the web config file

                String selectSTR = "Update Orders Set status='" + status + "' where orderId='" + orderId + "'";
                SqlCommand cmd = new SqlCommand(selectSTR, con);

                // get a reader
                cmd.ExecuteNonQuery(); // CommandBehavior.CloseConnection: the connection will be closed after reading has reached the end
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }
            finally
            {
                if (con != null)
                {
                    con.Close();
                }

            }
        }

        public void putImg(string img, string uid)
        {
            SqlConnection con = null;

            try
            {

                con = connect("DBConnectionString"); // create a connection to the database using the connection String defined in the web config file

                String selectSTR = "Update Users Set img='" + img + "' where uid='" + uid + "'";
                SqlCommand cmd = new SqlCommand(selectSTR, con);

                // get a reader
                SqlDataReader dr = cmd.ExecuteReader(CommandBehavior.CloseConnection); // CommandBehavior.CloseConnection: the connection will be closed after reading has reached the end
                return;
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }
            finally
            {
                if (con != null)
                {
                    con.Close();
                }

            }
        }


        public List<Connection> getConnections(string uid)
        {
            SqlConnection con = null;

            try
            {

                con = connect("DBConnectionString"); // create a connection to the database using the connection String defined in the web config file

                String selectSTR = "select * from Connections where sourceUid ='" + uid + "'";
                SqlCommand cmd = new SqlCommand(selectSTR, con);

                // get a reader
                SqlDataReader dr = cmd.ExecuteReader(CommandBehavior.CloseConnection); // CommandBehavior.CloseConnection: the connection will be closed after reading has reached the end
                List<Connection> Connections = new List<Connection>();
                while (dr.Read())
                {   // Read till the end of the data into a row
                    Connection connection = new Connection();
                    connection.TargetUid = (string)dr["targetUid"];

                    Connections.Add(connection);
                }
                return Connections;
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }
            finally
            {
                if (con != null)
                {
                    con.Close();
                }

            }
        }

        public List<Review> getUserReviews(string uid)
        {
            SqlConnection con = null;
            try
            {
                con = connect("DBConnectionString"); // create a connection to the database using the connection String defined in the web config file

                String selectSTR = "select reviewId, Users.uid as userUid, Users.firstName as userFirstName, Users.lastName as userLastName,Users.email as userEmail, reviewRating, reviewText, serviceRating, foodRating, Users.img as userImg , displayName , chefEmail ,Chefs.firstName as chefFirstName, Chefs.lastName as chefLastName, address, Chefs.img as chefImg, foodType from Reviews inner join Users on Reviews.userUid=Users.uid inner join Chefs on Reviews.chefEmail=Chefs.email where Reviews.userUid = '" + uid + "'";
                SqlCommand cmd = new SqlCommand(selectSTR, con);

                // get a reader
                SqlDataReader dr = cmd.ExecuteReader(CommandBehavior.CloseConnection); // CommandBehavior.CloseConnection: the connection will be closed after reading has reached the end
                List<Review> reviews = new List<Review>();
                while (dr.Read())
                {   // Read till the end of the data into a row
                    Review review = new Review();
                    review.ReviewId = (int)dr["reviewId"];
                    review.UserUid = (string)dr["userUid"];
                    review.UserFirstName = (string)dr["userFirstName"];
                    review.UserLastName = (string)dr["userLastName"];
                    review.UserEmail = (string)dr["userEmail"];
                    review.UserImg = ((dr["userImg"] == System.DBNull.Value) ? "https://cdn3.iconfinder.com/data/icons/avatars-round-flat/33/man5-512.png" : (string)dr["userImg"]);
                    review.ReviewText = (string)dr["reviewText"];
                    review.ReviewRating = (double)dr["reviewRating"];
                    review.ServiceRating = (double)dr["serviceRating"];
                    review.FoodRating = (double)dr["foodRating"];
                    review.DisplayName = (string)dr["displayName"];
                    review.ChefFirstName = (string)dr["chefFirstName"];
                    review.ChefLastName = (string)dr["chefLastName"];
                    review.ChefEmail = (string)dr["chefEmail"];
                    review.Address = (string)dr["address"];
                    review.ChefImg = (string)dr["chefImg"];
                    review.FoodType = (string)dr["foodType"];
                    reviews.Add(review);
                }
                return reviews;
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }
            finally
            {
                if (con != null)
                {
                    con.Close();
                }

            }
        }
        public List<Review> getChefReviews(string chefEmail)
        {
            SqlConnection con = null;
            try
            {
                con = connect("DBConnectionString"); // create a connection to the database using the connection String defined in the web config file

                String selectSTR = "select reviewId, Users.uid as userUid, Users.firstName as userFirstName, Users.lastName as userLastName,Users.email as userEmail, reviewRating, reviewText, serviceRating, foodRating, Users.img as userImg , displayName , chefEmail ,Chefs.firstName as chefFirstName, Chefs.lastName as chefLastName, address, Chefs.img as chefImg, foodType from Reviews inner join Users on Reviews.userUid=Users.uid inner join Chefs on Reviews.chefEmail=Chefs.email where Reviews.chefEmail = '" + chefEmail + "'";
                SqlCommand cmd = new SqlCommand(selectSTR, con);

                // get a reader
                SqlDataReader dr = cmd.ExecuteReader(CommandBehavior.CloseConnection); // CommandBehavior.CloseConnection: the connection will be closed after reading has reached the end
                List<Review> reviews = new List<Review>();
                while (dr.Read())
                {   // Read till the end of the data into a row
                    Review review = new Review();
                    review.ReviewId = (int)dr["reviewId"];
                    review.UserUid = (string)dr["userUid"];
                    review.UserFirstName = (string)dr["userFirstName"];
                    review.UserLastName = (string)dr["userLastName"];
                    review.UserEmail = (string)dr["userEmail"];
                    review.ReviewText = (string)dr["reviewText"];
                    review.ReviewRating = (double)dr["reviewRating"];
                    review.ServiceRating = (double)dr["serviceRating"];
                    review.FoodRating = (double)dr["foodRating"];
                    reviews.Add(review);
                }
                return reviews;
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }
            finally
            {
                if (con != null)
                {
                    con.Close();
                }

            }
        }
        public List<Review> getReviews()
        {
            SqlConnection con = null;
            try
            {
                con = connect("DBConnectionString"); // create a connection to the database using the connection String defined in the web config file

                String selectSTR = "select reviewId, Users.uid as userUid, Users.firstName as userFirstName, Users.lastName as userLastName,Users.email as userEmail, reviewRating, reviewText, serviceRating, foodRating, Users.img as userImg , displayName , chefEmail ,Chefs.firstName as chefFirstName, Chefs.lastName as chefLastName, address, Chefs.img as chefImg, foodType from Reviews inner join Users on Reviews.userUid=Users.uid inner join Chefs on Reviews.chefEmail=Chefs.email";
                SqlCommand cmd = new SqlCommand(selectSTR, con);

                // get a reader
                SqlDataReader dr = cmd.ExecuteReader(CommandBehavior.CloseConnection); // CommandBehavior.CloseConnection: the connection will be closed after reading has reached the end
                List<Review> reviews = new List<Review>();
                while (dr.Read())
                {   // Read till the end of the data into a row
                    Review review = new Review();
                    review.ReviewId = (int)dr["reviewId"];
                    review.UserUid = (string)dr["userUid"];
                    review.UserFirstName = (string)dr["userFirstName"];
                    review.UserLastName = (string)dr["userLastName"];
                    review.UserEmail = (string)dr["userEmail"];
                    review.UserImg = ((dr["userImg"] == System.DBNull.Value) ? "https://cdn3.iconfinder.com/data/icons/avatars-round-flat/33/man5-512.png" : (string)dr["userImg"]);
                    review.ReviewText = (string)dr["reviewText"];
                    review.ReviewRating = (double)dr["reviewRating"];
                    review.ServiceRating = (double)dr["serviceRating"];
                    review.FoodRating = (double)dr["foodRating"];
                    review.DisplayName = (string)dr["displayName"];
                    review.ChefFirstName = (string)dr["chefFirstName"];
                    review.ChefLastName = (string)dr["chefLastName"];
                    review.ChefEmail = (string)dr["chefEmail"];
                    review.Address = (string)dr["address"];
                    review.ChefImg = (string)dr["chefImg"];
                    review.FoodType = (string)dr["foodType"];
                    reviews.Add(review);
                }
                return reviews;
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }
            finally
            {
                if (con != null)
                {
                    con.Close();
                }

            }
        }

        public Review getReview(Review rev)
        {
            SqlConnection con = null;
            try
            { 
                con = connect("DBConnectionString"); // create a connection to the database using the connection String defined in the web config file

                String selectSTR = "select * from Reviews where orderId='" + rev.OrderId + "'";
                SqlCommand cmd = new SqlCommand(selectSTR, con);

                // get a reader
                SqlDataReader dr = cmd.ExecuteReader(CommandBehavior.CloseConnection); // CommandBehavior.CloseConnection: the connection will be closed after reading has reached the end
                Review review = new Review();
                while (dr.Read())
                {   // Read till the end of the data into a row
                    review.UserUid = (string)dr["userUid"];
                    review.ChefEmail = (string)dr["chefEmail"];
                    review.ReviewRating = (double)dr["reviewRating"];
                    review.FoodRating = (double)dr["foodRating"];
                    review.ServiceRating = (double)dr["serviceRating"];
                    review.ReviewText = (string)dr["reviewText"];
                    review.OrderId = ((dr["orderId"] == System.DBNull.Value) ? 0 : (int)dr["orderId"]);
                    review.ReviewId = ((dr["reviewId"] == System.DBNull.Value) ? 0 : (int)dr["reviewId"]);

                }
                return review;
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }
            finally
            {
                if (con != null)
                {
                    con.Close();
                }

            }
        }

        //public List<Ingredient> getIngredients()
        //{
        //    SqlConnection con = null;

        //    try
        //    {

        //        con = connect("DBConnectionString"); // create a connection to the database using the connection String defined in the web config file

        //        String selectSTR = "select * from ingredients_CS";
        //        SqlCommand cmd = new SqlCommand(selectSTR, con);

        //        // get a reader
        //        SqlDataReader dr = cmd.ExecuteReader(CommandBehavior.CloseConnection); // CommandBehavior.CloseConnection: the connection will be closed after reading has reached the end
        //        List<Ingredient> list = new List<Ingredient>();
        //        while (dr.Read())
        //        {   // Read till the end of the data into a row
        //            Ingredient ingredient = new Ingredient();
        //            ingredient.Id = (int)dr["id"];
        //            ingredient.Name = (string)dr["name"];
        //            ingredient.ImgUrl = (string)dr["imageUrl"];
        //            ingredient.Calories = (int)dr["calories"];
        //            list.Add(ingredient);
        //        }
        //        return list;
        //    }
        //    catch (Exception ex)
        //    {
        //        // write to log
        //        throw (ex);
        //    }
        //    finally
        //    {
        //        if (con != null)
        //        {
        //            con.Close();
        //        }

        //    }
        //}
        //public List<DishRecipe> getRecipes()
        //{
        //    SqlConnection con = null;

        //    try
        //    {

        //        con = connect("DBConnectionString"); // create a connection to the database using the connection String defined in the web config file

        //        String selectSTR = "select * from recipes_CS";
        //        SqlCommand cmd = new SqlCommand(selectSTR, con);

        //        // get a reader
        //        SqlDataReader dr = cmd.ExecuteReader(CommandBehavior.CloseConnection); // CommandBehavior.CloseConnection: the connection will be closed after reading has reached the end
        //        List<DishRecipe> list = new List<DishRecipe>();
        //        while (dr.Read())
        //        {   // Read till the end of the data into a row
        //            DishRecipe recipe = new DishRecipe();
        //            recipe.Id = (int)dr["id"];
        //            recipe.Name = (string)dr["name"];
        //            recipe.ImgUrl = (string)dr["imageUrl"];
        //            recipe.CookingMethod = (string)dr["cookingMethod"];
        //            recipe.Time = (int)dr["time"];
        //            list.Add(recipe);
        //        }
        //        return list;
        //    }
        //    catch (Exception ex)
        //    {
        //        // write to log
        //        throw (ex);
        //    }
        //    finally
        //    {
        //        if (con != null)
        //        {
        //            con.Close();
        //        }

        //    }
        //}

        //public int getRecipeIdByName(string recipeName)
        //{
        //    SqlConnection con = null;

        //    try
        //    {

        //        con = connect("DBConnectionString"); // create a connection to the database using the connection String defined in the web config file

        //        String selectSTR = "select * from recipes_CS where name='" + recipeName + "'";
        //        SqlCommand cmd = new SqlCommand(selectSTR, con);

        //        // get a reader
        //        SqlDataReader dr = cmd.ExecuteReader(CommandBehavior.CloseConnection); // CommandBehavior.CloseConnection: the connection will be closed after reading has reached the end
        //        int id = 0;
        //        while (dr.Read())
        //        {   // Read till the end of the data into a row
        //            id = (int)dr["Id"];

        //        }
        //        return id;
        //    }
        //    catch (Exception ex)
        //    {
        //        // write to log
        //        throw (ex);
        //    }
        //    finally
        //    {
        //        if (con != null)
        //        {
        //            con.Close();
        //        }

        //    }
        //}

        //public List<int> getRecipeIngredientsIds(int recipeId)
        //{
        //    SqlConnection con = null;

        //    try
        //    {

        //        con = connect("DBConnectionString"); // create a connection to the database using the connection String defined in the web config file

        //        String selectSTR = "select * from ingredientsInRecipes_CS where recipeId=" + recipeId;
        //        SqlCommand cmd = new SqlCommand(selectSTR, con);

        //        // get a reader
        //        SqlDataReader dr = cmd.ExecuteReader(CommandBehavior.CloseConnection); // CommandBehavior.CloseConnection: the connection will be closed after reading has reached the end
        //        List<int> list = new List<int>();
        //        int currId = 0;
        //        while (dr.Read())
        //        {   // Read till the end of the data into a row
        //            currId = (int)dr["ingredientId"];
        //            list.Add(currId);
        //        }
        //        return list;
        //    }
        //    catch (Exception ex)
        //    {
        //        // write to log
        //        throw (ex);
        //    }
        //    finally
        //    {
        //        if (con != null)
        //        {
        //            con.Close();
        //        }

        //    }
        //}


    }
}

