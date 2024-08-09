using ApplicationCore.Contracts;
using ApplicationCore.Data;
using Infraestructure.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddDbContext<CedulaDbContext>( opt => 
    opt.UseSqlite(builder.Configuration.GetConnectionString("sqlite-dev"))
);
builder.Services.AddScoped<ISearchCedulaService, SearchCedulaService>();
builder.Services.AddScoped<IParticipantService, ParticipantService>();

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// SETTING UP CORS
const string POLICY = "AllowAll";
builder.Services.AddCors(opt => {
    opt.AddPolicy(POLICY,
        policy => policy
            .WithOrigins("http://localhost:3000", "http://localhost:4200")
            .AllowAnyHeader()
            .AllowAnyMethod()
    );
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors(POLICY);
app.UseAuthorization();

app.MapControllers();

app.Run();
