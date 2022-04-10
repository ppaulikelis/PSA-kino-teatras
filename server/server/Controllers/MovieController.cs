using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using MySql.Data.MySqlClient;
using server.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MovieController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IWebHostEnvironment _env;
        public MovieController(IConfiguration configuration, IWebHostEnvironment env)
        {
            _configuration = configuration;
            _env = env;
        }

        [HttpGet]
        public JsonResult Get()
        {
            string query = @"
                SELECT movie.id, movie.title, genre.name AS genre, movie.start_date, movie.end_date FROM movie INNER JOIN genre ON movie.genre_fk = genre.id
            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("DefaultConnection");
            MySqlDataReader myReader;
            using(MySqlConnection mycon=new MySqlConnection(sqlDataSource))
            {
                mycon.Open();
                using(MySqlCommand myCommand=new MySqlCommand(query, mycon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    mycon.Close();
                }
            }

            return new JsonResult(table);
        }

        [HttpGet("{id}")]
        public JsonResult GetById(int id)
        {
            string query = @"
                SELECT * FROM movie WHERE id = @id
            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("DefaultConnection");
            MySqlDataReader myReader;
            using (MySqlConnection mycon = new MySqlConnection(sqlDataSource))
            {
                mycon.Open();
                using (MySqlCommand myCommand = new MySqlCommand(query, mycon))
                {
                    myCommand.Parameters.AddWithValue("@id", id);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    mycon.Close();
                }
            }

            return new JsonResult(table);
        }

        [HttpPost]
        public JsonResult Add(Movie movie)
        {
            string query = @"
                INSERT INTO movie (id,title,description,genre_fk,duration,start_date,end_date,price,icon) VALUES 
                    (NULL,@title,@description,@genre_fk,@duration,@start_date,@end_date,@price,@icon)
            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("DefaultConnection");
            MySqlDataReader myReader;
            using (MySqlConnection mycon = new MySqlConnection(sqlDataSource))
            {
                mycon.Open();
                using (MySqlCommand myCommand = new MySqlCommand(query, mycon))
                {
                    myCommand.Parameters.AddWithValue("@title", movie.Title);
                    myCommand.Parameters.AddWithValue("@description", movie.Description);
                    myCommand.Parameters.AddWithValue("@genre_fk", movie.Genre_fk);
                    myCommand.Parameters.AddWithValue("@duration", movie.Duration);
                    myCommand.Parameters.AddWithValue("@start_date", movie.Start_Date);
                    myCommand.Parameters.AddWithValue("@end_date", movie.End_Date);
                    myCommand.Parameters.AddWithValue("@price", movie.Price);
                    myCommand.Parameters.AddWithValue("@icon", movie.Icon);

                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    mycon.Close();
                }
            }

            return new JsonResult("Added successfully");
        }

        [HttpPut]
        public JsonResult Edit(Movie movie)
        {
            string query = @"
                UPDATE movie SET 
                    title = @title,
                    description = @description,
                    genre_fk = @genre_fk,
                    duration = @duration,
                    start_date = @start_date,
                    end_date = @end_date,
                    price = @price,
                    icon = @icon
                    WHERE id = @id
            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("DefaultConnection");
            MySqlDataReader myReader;
            using (MySqlConnection mycon = new MySqlConnection(sqlDataSource))
            {
                mycon.Open();
                using (MySqlCommand myCommand = new MySqlCommand(query, mycon))
                {
                    myCommand.Parameters.AddWithValue("@id", movie.Id);
                    myCommand.Parameters.AddWithValue("@title", movie.Title);
                    myCommand.Parameters.AddWithValue("@description", movie.Description);
                    myCommand.Parameters.AddWithValue("@genre_fk", movie.Genre_fk);
                    myCommand.Parameters.AddWithValue("@duration", movie.Duration);
                    myCommand.Parameters.AddWithValue("@start_date", movie.Start_Date);
                    myCommand.Parameters.AddWithValue("@end_date", movie.End_Date);
                    myCommand.Parameters.AddWithValue("@price", movie.Price);
                    myCommand.Parameters.AddWithValue("@icon", movie.Icon);

                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    mycon.Close();
                }
            }

            return new JsonResult("Updated successfully");
        }

        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {
            string query = @"
                DELETE FROM movie WHERE id = @id
            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("DefaultConnection");
            MySqlDataReader myReader;
            using (MySqlConnection mycon = new MySqlConnection(sqlDataSource))
            {
                mycon.Open();
                using (MySqlCommand myCommand = new MySqlCommand(query, mycon))
                {
                    myCommand.Parameters.AddWithValue("@id", id);

                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    mycon.Close();
                }
            }

            return new JsonResult("Deleted successfully");
        }

        [Route("SaveFile")]
        [HttpPost]
        public JsonResult SaveFile()
        {
            try
            {
                var httpRequest = Request.Form;
                var postedFile = httpRequest.Files[0];
                long filename = (long)(DateTime.Now - new DateTime(1970, 1, 1)).TotalMilliseconds;
                var physicalPath = _env.ContentRootPath + "/Photos/" + filename + ".jpg";

                using(var stream=new FileStream(physicalPath, FileMode.Create))
                {
                    postedFile.CopyTo(stream);
                }

                return new JsonResult(filename);
            }
            catch(Exception)
            {
                return new JsonResult("default.jpg");
            }
        }
    }
}
