
using AccutracMinimalAPI;

using DataAccess.DbAccess;

var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddSingleton<IUserData, UserData>();
builder.Services.AddSingleton<IRolesData, RolesData>();
builder.Services.AddSingleton<ISqlDataAccess, SqlDataAccess>();
builder.Services.AddSingleton<ICustomersData , CustomersData >();
builder.Services.AddSingleton<IPaidLeadData, PaidLeadData>();
builder.Services.AddSingleton<ILeadSource , LeadSourceData>();
builder.Services.AddSingleton<ILeadSubSource, LeadSubSourcesData>();
builder.Services.AddSingleton<ICustomerSearchData , CustomerSearchData >();
builder.Services.AddSingleton<IProjectTypeData, ProjectTypeData>();
builder.Services.AddSingleton<IDrivingDistanceData , DrivingDistanceData >();
builder.Services.AddSingleton<ILeadsData, LeadsData>();
builder.Services.AddSingleton<IJobAddressData, JobAddressData>();
builder.Services.AddSingleton<IJobAddressInfoData, JobAddressInfoData>();
builder.Services.AddSingleton<ILeadCountsData  , LeadCountsData>();
builder.Services.AddSingleton<ILeadTypeData, LeadTypeData>( );
builder.Services.AddSingleton<IAppointmentData, AppointmentData>();
builder.Services.AddSingleton<IBuildAvailibilityData, BuildAvailibilityData>();
builder.Services.AddSingleton<IGeoZoneData, GeoZoneData>();
builder.Services.AddSingleton<ILeadStatusData, LeadStatusData>();
builder.Services.AddSingleton<INotesData, NotesData>();
builder.Services.AddSingleton<ISalesCalendarData, SalesCalendarData>();
builder.Services.AddSingleton<IEstAvailSkillData, EstAvailSkillData>();
builder.Services.AddSingleton<IEstAvailData, EstAvailData>();
builder.Services.AddSingleton<IEstSkillData, EstSkillData>();
//builder.Services.AddSingleton<IGetAvailibilityData, GetAvailibilityData>();
//builder.Services.AddSingleton<ISmartSchedulerData, SmartSchedulerData>();
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
                      policy =>
                      {
                          policy.AllowAnyOrigin();
                          policy.AllowAnyHeader();
                          policy.AllowAnyMethod();
                      });
});

var app = builder.Build();

app.UseStaticFiles();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

//app.UseHttpsRedirection();

app.ConfigureApi();

app.UseCors(MyAllowSpecificOrigins);

app.Run();

