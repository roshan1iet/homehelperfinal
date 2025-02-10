using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HomeHelper.Migrations
{
    public partial class BookingUp : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Skills",
                table: "Workers",
                newName: "Profession");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Profession",
                table: "Workers",
                newName: "Skills");
        }
    }
}
