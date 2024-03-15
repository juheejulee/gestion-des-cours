using CollegeAPI.JSONs;
using CollegeAPI.Models;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

namespace CollegeAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CollegeController : ControllerBase
    {

        private readonly ILogger<CollegeController> _logger;

        public CollegeController(ILogger<CollegeController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public string Get(string method, string parameters = "{\"parameters\":[]}")
        {
            switch (method)
            {
                // Account
                case "AccountValidate": return CollegeModel.AccountValidate(parameters);
                // CourseSemester
                case "CourseSemesterGetAll": return CollegeModel.CourseSemesterGetAll(parameters);
                // CourseSemesterStudent
                case "CourseSemesterStudentGetAll": return CollegeModel.CourseSemesterStudentGetAll(parameters);
                // PersonGetAll
                case "PersonGetAll": return CollegeModel.PersonGetAll(parameters);
                default: return JsonSerializer.Serialize(new ResponseJSON("unknown method provided"));
            }
        }

        [HttpPost]
        public string Post(string method, string parameters = "{\"parameters\":[]}")
        {

            switch (method)
            {
                // CourseSemesterStudent

                case "CourseSemesterStudentInsert": return CollegeModel.CourseSemesterStudentInsert(parameters);


                default: return JsonSerializer.Serialize(new ResponseJSON("unknown method provided"));

            }

        }

        [HttpPatch()]
        public string Patch(string method, string parameters = "{\"parameters\":[]}")
        {

            switch (method)
            {

                // CourseSemester

                case "CourseSemesterUpdateTeacher": return CollegeModel.CourseSemesterUpdateTeacher(parameters); 

                // CourseSemesterStudent

                case "CourseSemesterStudentUpdateGrade": return CollegeModel.CourseSemesterStudentUpdateGrade(parameters);


                default: return JsonSerializer.Serialize(new ResponseJSON("unknown method provided"));

            }

        }

        [HttpPut()]
        public string Put(string method, string parameters = "{\"parameters\":[]}")
        {

            switch (method)
            {

                // Person

                case "PersonUpdateInfo": return CollegeModel.PersonUpdateInfo(parameters);

                default: return JsonSerializer.Serialize(new ResponseJSON("unknown method provided"));

            }

        }

        [HttpDelete]
        public string Delete(string method, string parameters = "{\"parameters\":[]}")
        {

            switch (method)
            {

                // CourseSemesterStudent

                case "CourseSemesterStudentDelete": return CollegeModel.CourseSemesterStudentDelete(parameters);

                default: return JsonSerializer.Serialize(new ResponseJSON("unknown method provided"));

            }

        }
    }
}