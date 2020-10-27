using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PersonalNotes.Models;


namespace PersonalNotes.Controllers
{
    [Route("API/[controller]")]
    [ApiController]
    public class NotesAPIController : ControllerBase
    {
        // Get All Notes From DB Using HttpGet Method...
        [HttpGet("AllNotes")]
        public ActionResult<List<Notes>> AllNotes()
        {
            return new NotesController().GetNotes();
        }
        // Get All Notes ID From DB Using HttpGet Method...
        [HttpGet("AllNotesId")]
        public ActionResult<List<Notes>> AllNotesId(int id)
        {
            return new NotesController().GetNotesId(id);
        }
        // Get All User Email From DB Using HttpGet Method...
        [HttpGet("AllUserEmail")]
        public ActionResult<List<User>> GetUserEmail()
        {
            return new NotesController().GetUserEmail();
        }
        // Get AllUsers From DB Using HttpGet Method...
        [HttpGet("AllUsers")]
        public ActionResult<User> AllUsers(string email)
        {
            ActionResult<User> response;
            User user;
            try
            {
                // We aren't concerned with validation here. Only in BLL.
                user = new NotesController().GetUsers(email);
                // Encode our created object as JSON and bounce it back with the request.
                response = Ok(user);
            }
            catch (Exception e)
            {
                response = UnprocessableEntity(new { error = e.Message });
            }
            // Return the response.
            return response;
        }
        // Send SignUP Form Data To DB Using HttpPut Method...
        [HttpPut("SignUp")]
        public ActionResult<User> SignUp(string fname, string lname, string email, string password)
        {
            ActionResult<User> response;
            User created;
            try
            {
                // We aren't concerned with validation here. Only in BLL.
                created = new NotesController().SignUpbyEmail(fname, lname, email, password);
                // Encode our created object as JSON and bounce it back with the request.
                response = Ok(created);
            }
            catch (Exception e)
            {
                response = UnprocessableEntity(new { error = e.Message });
            }
            // Return the response.
            return response;
        }
        // Send Create Notes Data To DB Using HttpPost Method...
        [HttpPost("CreateNotes")]

        public ActionResult<Notes> CreateNotes(string description, string date)
        {
            ActionResult<Notes> response;
            Notes create;
            try
            {
                // We aren't concerned with validation here. Only in BLL.
                create = new NotesController().CreateNotes(description, date);
                // Encode our created object as JSON and bounce it back with the request.
                response = Ok(create);
            }
            catch (Exception e)
            {
                response = UnprocessableEntity(new { error = e.Message });
            }
            // Return the response.
            return response;
        }
        // Update(Edit) Notes Data to DB Using HttpPut Method...
        [HttpPut("EditNotes")]
        public ActionResult<Notes> EditNotesByID(string id, string description)
        {
            ActionResult<Notes> response;
            Notes modified;
            try
            {
                // We aren't concerned with validation here. Only in BLL.
                modified = new NotesController().EditNotesByID(id, description);
                // Encode our created object as JSON and bounce it back with the request.
                response = Ok(modified);
            }
            catch (InvalidOperationException)
            {
                response = StatusCode(403, new { error = $"No description was found with the ID of {id}." });
            }
            catch (Exception e)
            {
                response = StatusCode(403, new { error = e.Message });
            }
            // Return the response.
            return response;
        }
        //Delete Note By Id..
        [HttpPut("DeleteNote")]
        public ActionResult DeleteNote_DELETE(string id)
        {
            ActionResult response;
            int idParsed;
            if (string.IsNullOrWhiteSpace(id))
            {
                response = Conflict(new { error = "ID was not provided." });
            }
            else
            {
                if (!int.TryParse(id, out idParsed))
                {
                    response = Conflict(new { error = "The provided ID is invalid." });
                }
                else
                {
                    try
                    {
                       new NotesController().DeleteNoteByID(idParsed);
                       List <Notes> notes= new NotesController().GetNotes();
                       response = Ok(new { message = $"Successfully deleted the Note with ID {idParsed}.", notes });
                    }
                    catch
                    {
                        response = NotFound(new { error = $"No Note at ID {idParsed} could be found." });
                    }
                }
            }
            return response;
        }
    }
}

