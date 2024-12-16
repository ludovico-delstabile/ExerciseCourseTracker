using CourseTrackerBE.Authentication;
using CourseTrackerBE.Automapper;
using CourseTrackerBE.DataAccess;
using CourseTrackerBE.Services;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers().AddJsonOptions(opt =>
{
    opt.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
});

builder.Services.Configure<AuthOptions>(builder.Configuration.GetSection(AuthOptions.Auth));
builder.Services.Configure<LiteDbOptions>(builder.Configuration.GetSection(LiteDbOptions.LiteDb));

builder.Services.AddHttpContextAccessor();

builder.Services.AddSingleton<IAppDbContext, AppDbContext>();

builder.Services
    .AddEndpointsApiExplorer()
    .AddSwaggerGen();

builder.Services.AddCustomAuthentication(builder.Configuration);

builder.Services.AddCustomAutomapper();

builder.Services.AddTransient<SubscriptionsService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.UseCors(builder => builder.AllowAnyMethod().AllowAnyHeader().AllowAnyOrigin());

app.Run();
