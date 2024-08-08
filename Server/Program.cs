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
builder.Services.AddScoped<ICedulaService, CedulaService>();

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
