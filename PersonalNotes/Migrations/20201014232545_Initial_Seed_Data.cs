using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace PersonalNotes.Migrations
{
    public partial class Initial_Seed_Data : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "user",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int(10)", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    fname = table.Column<string>(type: "varchar(50)", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4")
                        .Annotation("MySql:Collation", "utf8mb4_general_ci"),
                    lname = table.Column<string>(type: "varchar(50)", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4")
                        .Annotation("MySql:Collation", "utf8mb4_general_ci"),
                    email = table.Column<string>(type: "varchar(50)", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4")
                        .Annotation("MySql:Collation", "utf8mb4_general_ci"),
                    password = table.Column<string>(type: "varchar(50)", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4")
                        .Annotation("MySql:Collation", "utf8mb4_general_ci")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_user", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "notes",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int(10)", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Note = table.Column<string>(type: "varchar(255)", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4")
                        .Annotation("MySql:Collation", "utf8mb4_general_ci"),
                    date = table.Column<DateTime>(type: "Date", nullable: false),
                    UserId = table.Column<int>(type: "int(10)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_notes", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Notes_User",
                        column: x => x.UserId,
                        principalTable: "user",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "user",
                columns: new[] { "ID", "email", "fname", "lname", "password" },
                values: new object[] { -1, "sjani@ualberta.ca", "Shivani", "Jani", "abc@123" });

            migrationBuilder.InsertData(
                table: "user",
                columns: new[] { "ID", "email", "fname", "lname", "password" },
                values: new object[] { -2, "shailza@ualberta.ca", "Shailza", "Sharma", "xyz@123" });

            migrationBuilder.InsertData(
                table: "user",
                columns: new[] { "ID", "email", "fname", "lname", "password" },
                values: new object[] { -3, "hkour@ualberta.ca", "Harpreet", "Kour", "pqr@123" });

            migrationBuilder.InsertData(
                table: "notes",
                columns: new[] { "ID", "date", "Note", "UserId" },
                values: new object[,]
                {
                    { -1, new DateTime(2020, 10, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Create your own personal notes...User friendly design and features...Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.", -1 },
                    { -4, new DateTime(2020, 10, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Useful notes...Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.", -1 },
                    { -2, new DateTime(2020, 8, 2, 0, 0, 0, 0, DateTimeKind.Unspecified), "Edit/delete notes...User friendly design and features...Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.", -2 },
                    { -5, new DateTime(2020, 8, 2, 0, 0, 0, 0, DateTimeKind.Unspecified), "Important notes...User friendly design and features...Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting.", -2 },
                    { -3, new DateTime(2020, 9, 4, 0, 0, 0, 0, DateTimeKind.Unspecified), "Don't hassle to pick up notebook to make quick notes...User friendly design and features...Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.", -3 },
                    { -6, new DateTime(2020, 9, 4, 0, 0, 0, 0, DateTimeKind.Unspecified), "Quick notes...Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.", -3 }
                });

            migrationBuilder.CreateIndex(
                name: "FK_Notes_User",
                table: "notes",
                column: "UserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "notes");

            migrationBuilder.DropTable(
                name: "user");
        }
    }
}
