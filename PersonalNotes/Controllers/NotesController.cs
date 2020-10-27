using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using PersonalNotes.Models;
namespace PersonalNotes.Controllers
{
    public class NotesController : Controller
    {
        public List<Notes> GetNotes()
        {
            List<Notes> notes;
            using (NoteContext context = new NoteContext())
            {
                { /* Fetch all Notes from DB and Store in to List(notes) using context.*/}
                notes = context.Notes.ToList();
            }
            return notes;
        }
        public List<Notes> GetNotesId(int id)
        {
            List<Notes> notes;
            using (NoteContext context = new NoteContext())
            {
                { /* Fetch Notes By Id from DB and Store in to List(notes) using context.*/}
                notes = context.Notes.Where(x => x.ID == id).ToList();
            }
            return notes;
        }
        public List<User> GetUserEmail()
        {
            List<User> users;
            using (NoteContext context = new NoteContext())
            {
                { /* Fetch all Users from DB and Store in to List(users) using context.*/}
                users = context.Users.ToList();
            }
            return users;
        }
        public User GetUsers(string email)
        {
            User users;
            using (NoteContext context = new NoteContext())
            {
                { /* Fetch user with given email from DB and Store in to variable using context.*/}
                users = context.Users.Where(x => x.Email == email).SingleOrDefault();
            }
            return users;
        }
        public Notes CreateNotes(string description, string date)
        {
            DateTime dateParsed;
            
            if (string.IsNullOrWhiteSpace(description)) // Check If Description is Empty and WhiteSpace
            {
                throw new ArgumentNullException(nameof(description), "Notes was not provided.");
            }
            else
            {
                description = description.Trim();
            }
            if (string.IsNullOrWhiteSpace(date)) // Check If Date is Empty and WhiteSpace
            {
                throw new ArgumentNullException(nameof(date), "Date was not provided.");
            }
            else
            {
                date = date.Trim();
                if (!DateTime.TryParse(date, out dateParsed)) // Check If Date is valid or not
                {
                    throw new ArgumentException("Date is not valid.", nameof(date));
                }
            }
            Notes create = new Notes()
            {
                Description = description, 
                Date = dateParsed,
                UserId = -2
            };
            using (NoteContext context = new NoteContext())
            {
                context.Notes.Add(create);
                context.SaveChanges(); // Save all data to Database
            }
            return create;
        }
        public Notes EditNotesByID(string id, string description)
        {
            if (string.IsNullOrWhiteSpace(id)) // Check If Description ID is Empty and WhiteSpace
            {
                throw new ArgumentNullException(nameof(id), "Description ID was not provided.");
            }
            else
            {
                id = id.Trim();
            }
            if (string.IsNullOrWhiteSpace(description)) // Check If Description is Empty and WhiteSpace
            {
                throw new ArgumentNullException(nameof(description), "Description was not provided.");
            }
            Notes modified;
            using (NoteContext context = new NoteContext())
            {
                modified = context.Notes.Where(x => x.ID == int.Parse(id)).Single();
                modified.Description = description;
                context.SaveChanges(); // Save All Changes to Database
            } 
            return modified;
        }
        public User SignUpbyEmail(string fname, string lname, string email, string password)
        {
            NoteContext context1 = new NoteContext();
            if (string.IsNullOrWhiteSpace(fname)) // Check If FirstName is Empty and WhiteSpace
            {
                throw new ArgumentNullException(nameof(fname), "First Name was not provided.");
            }
            else
            {
                fname = fname.Trim();
            }
            if (string.IsNullOrWhiteSpace(lname)) // Check If LastName is Empty and WhiteSpace
            {
                throw new ArgumentNullException(nameof(lname), "Last Name was not provided.");
            }
            else
            {
                lname = lname.Trim();
            }
            if (string.IsNullOrWhiteSpace(email)) // Check If Email is Empty and WhiteSpace
            {
                throw new ArgumentNullException(nameof(email), "Email was not provided.");
            }
            else if (!Regex.IsMatch(email, @"^[^@\s]+@[^@\s]+\.[^@\s]+$")) // Check If email is Valid or not
            {
                throw new ArgumentException(nameof(email), "Email is not valid...Please Try again.");
            }
            else if (context1.Users.Where(x => x.Email == email).Count() > 0) // Check If email(user) alrwady exist or not 
            { 
                throw new ArgumentException(nameof(email), "This email already exists.Please pick another email");
            }
            else
            {
                email = email.Trim();
            }
            if (string.IsNullOrWhiteSpace(password)) // Check If Password is Empty and WhiteSpace
            {
                throw new ArgumentNullException(nameof(password), "password was not provided.");
            }
            else
            {
                password = password.Trim();
            }
            User user = new User()
            {
                FirstName = fname,
                LastName = lname,
                Email = email,
                Password = password
            };
            using (NoteContext context = new NoteContext())
            {
                context.Add(user);
                context.SaveChanges(); // Save all Changes to Database
            }
            return user;
        }
        public void DeleteNoteByID(int id)
        {
            using(NoteContext context = new NoteContext())
            {
                // Remove(Delete) Note by particular(Given) ID from Database...
                context.Notes.Remove(context.Notes.Where(x => x.ID == id).Single());
                context.SaveChanges(); // Save all Changes to Database
            }
        }
    }
}