using Microsoft.EntityFrameworkCore;
using PersonalNotes.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
namespace PersonalNotes.Controllers
{
    public partial class NoteContext : DbContext
    {
        public NoteContext()
        {
        }
        public NoteContext(DbContextOptions<NoteContext> options)
            : base(options)
        {
        }
        public virtual DbSet<Notes> Notes { get; set; }
        public virtual DbSet<User> Users { get; set; }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                // Connection String For Connect to Database..
                // Database Name: personal_notes1
                // server: localhost
                // Port:3306
                // User:root
                // Password: ""
                //#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseMySql("server=localhost;port=3306;user=root;database=personal_notes1", x => x.ServerVersion("10.4.14-mariadb"));
            }
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Entity For User Table
            modelBuilder.Entity<User>(entity =>
            {
               // Entity For FirstName
                entity.Property(e => e.FirstName)
                    .HasCharSet("utf8mb4")
                    .HasCollation("utf8mb4_general_ci");
                // Entity For lastName
                entity.Property(e => e.LastName)
                    .HasCharSet("utf8mb4")
                    .HasCollation("utf8mb4_general_ci");
                // Entity For Email
                entity.Property(e => e.Email)
                   .HasCharSet("utf8mb4")
                   .HasCollation("utf8mb4_general_ci");
                // Entity For Password
                entity.Property(e => e.Password)
                   .HasCharSet("utf8mb4")
                   .HasCollation("utf8mb4_general_ci");
                // Seed Data For User Table
                entity.HasData(
                       new User()
                       {
                           ID = -1,
                           FirstName = "Shivani",
                           LastName = "Jani",
                           Email = "sjani@ualberta.ca",
                           Password = "abc@123"
                       },
                        new User()
                        {
                            ID = -2,
                            FirstName = "Shailza",
                            LastName = "Sharma",
                            Email = "shailza@ualberta.ca",
                            Password = "xyz@123"
                        },
                         new User()
                         {
                             ID = -3,
                             FirstName = "Harpreet",
                             LastName = "Kour",
                             Email = "hkour@ualberta.ca",
                             Password = "pqr@123"
                         }
                         );
            });
            // Entity For Notes Table 
            modelBuilder.Entity<Notes>(entity =>
            {
                // Entity For Foreign Key (UserId)
                entity.HasIndex(e => e.UserId)
                     .HasName("FK_" + nameof(Notes) + "_" + nameof(User));
                // Entity For Description
                entity.Property(e => e.Description)
                    .HasCharSet("utf8mb4")
                    .HasCollation("utf8mb4_general_ci");
                // Foreign Key...
                entity.HasOne(d => d.Users) // Child Table
                     .WithMany(p => p.Notes) // Parent Table
                     .HasForeignKey(d => d.UserId) 
                     // When we delete a record, we can modify the behaviour of the case where there are child records.
                     // Restrict: Throw an exception if we try to orphan a child record.
                     // Cascade: Remove any child records that would be orphaned by a removed parent.
                     // SetNull: Set the foreign key field to null on any orphaned child records.
                     // NoAction: Don't commit any deletions of parents which would orphan a child.
                     .OnDelete(DeleteBehavior.Cascade)
                     .HasConstraintName("FK_" + nameof(Notes) + "_" + nameof(User));
                // Seed Data for Notes Table
                entity.HasData(
                      new Notes()
                      {
                          ID = -1,
                          Description = "Create your own personal notes...User friendly design and features...Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
                          Date = new DateTime(2020, 10, 01),
                          UserId = -1,
                      },
                      new Notes()
                      {
                          ID = -2,
                          Description = "Edit/delete notes...User friendly design and features...Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
                          Date = new DateTime(2020, 08, 02),
                          UserId = -2,
                      },
                      new Notes()
                      {
                          ID = -3,
                          Description = "Don't hassle to pick up notebook to make quick notes...User friendly design and features...Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
                          Date = new DateTime(2020, 09, 04),
                          UserId = -3,
                      },

                      new Notes()
                      {
                          ID = -4,
                          Description = "Useful notes...Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
                          Date = new DateTime(2020, 10, 01),
                          UserId = -1,
                      },
                    new Notes()
                    {
                        ID = -5,
                        Description = "Important notes...User friendly design and features...Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting.",
                        Date = new DateTime(2020, 08, 02),
                        UserId = -2,
                    },
                      new Notes()
                      {
                          ID = -6,
                          Description = "Quick notes...Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
                          Date = new DateTime(2020, 09, 04),
                          UserId = -3,
                      });
            });
            OnModelCreatingPartial(modelBuilder);
        }
        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
