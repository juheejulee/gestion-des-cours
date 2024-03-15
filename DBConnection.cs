namespace CollegeAPI
{
    public class DBConnection
    {
        public static string Get()
        {

            var configuration = new ConfigurationBuilder().AddJsonFile("appsettings.json").Build();

            var connectionString = configuration.GetValue<string>("ConnectionString");

            return connectionString;

        }
    }
}
