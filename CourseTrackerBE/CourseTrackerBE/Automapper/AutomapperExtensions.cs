namespace CourseTrackerBE.Automapper;

public static class AutomapperExtensions
{
    public static IServiceCollection AddCustomAutomapper(this IServiceCollection services) {
        return services.AddAutoMapper(cfg =>
        {
            cfg.AddProfile<AutomapperConfiguration>();
        });
    }
}
