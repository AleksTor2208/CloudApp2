using CloudAppWebApi.Repository;
using Microsoft.AspNetCore.Server.Kestrel.Core;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers().AddNewtonsoftJson();
builder.Services.AddSingleton<IDbRepository, MongoDbRepository>();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


builder.Services.Configure<KestrelServerOptions>(options =>
{
    options.AllowSynchronousIO = true;
});

string MyAllowSpecificOrigins = "ReactPolicy";

builder.Services.AddCors(options =>
{
    options.AddPolicy(MyAllowSpecificOrigins,
    builder =>
    {
        builder.SetIsOriginAllowed(isOriginAllowed: _ => true).AllowAnyHeader().AllowAnyMethod().AllowCredentials();
    });
});

var app = builder.Build();

app.UseCors(
      x => x.AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader()
  );

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
