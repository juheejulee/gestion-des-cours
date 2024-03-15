using CollegeAPI.JSONs;
using CollegeAPI.Objects;
using System.Data.SqlClient;
using System.Text.Json;

namespace CollegeAPI.Models
{
    public class CollegeModel
    {

        public static string AccountValidate(string parametersJSON)
        {


            ResponseJSON responseJSON = new ResponseJSON();

            string status = "failed";
            string message = "";

            try
            {

                ParametersJSON parameters = JsonSerializer.Deserialize<ParametersJSON>(parametersJSON);

                if (parameters.parameters.Count < 2)
                {

                    responseJSON.message = "La methode AccountValidate a besoin de 2 paramètres (1. @Username, 2. @Password)";

                    return JsonSerializer.Serialize(responseJSON);

                }

                // Provide the query string with a parameter placeholder.
                string queryString = "EXEC AccountValidate '" + parameters.parameters[0] + "', '" + parameters.parameters[1] + "';";

                using (SqlConnection connection = new SqlConnection(DBConnection.Get()))
                {

                    // Create the Command and Parameter objects.
                    SqlCommand command = new SqlCommand(queryString, connection);

                    connection.Open();

                    SqlDataReader reader = command.ExecuteReader();

                    while (reader.Read())
                    {
                        status = (string)reader[0];

                        if (status == "failed")
                        {
                            message = (string)reader[1];
                        }
                    }

                    reader.Close();

                    connection.Close();

                }

            }
            catch (Exception ex)
            {

                responseJSON.message = ex.Message;

                return JsonSerializer.Serialize(responseJSON);

            }

            responseJSON.status = status;
            responseJSON.message = message;

            return JsonSerializer.Serialize(responseJSON);

        }

        public static string CourseSemesterGetAll(string parametersJSON)
        {

            List<CourseSemester> data = new List<CourseSemester>();

            ResponseJSON responseJSON = new ResponseJSON();

            string status = "failed";
            string message = "";

            try
            {

                // Provide the query string with a parameter placeholder.
                string queryString = "EXEC CourseSemesterGetAll;";

                using (SqlConnection connection = new SqlConnection(DBConnection.Get()))
                {

                    // Create the Command and Parameter objects.
                    SqlCommand command = new SqlCommand(queryString, connection);

                    connection.Open();

                    SqlDataReader reader = command.ExecuteReader();

                    while (reader.Read())
                    {
                        CourseSemester cs = new CourseSemester();

                        cs.Id = (int)reader[0];
                        cs.CourseId = (int)reader[1];
                        cs.Course = (string)reader[2];
                        cs.DepartmentId = (int)reader[3];
                        cs.Department = (string)reader[4];
                        cs.SemesterId = (int)reader[5];
                        cs.Semester = (string)reader[6];

                        if (reader[7].GetType().ToString() != "System.DBNull")
                        {
                            cs.TeacherId = (int)reader[7];
                        }
                        if (reader[8].GetType().ToString() != "System.DBNull")
                        {
                            cs.TeacherFirstName = (string)reader[8];
                        }
                        if (reader[9].GetType().ToString() != "System.DBNull")
                        {
                            cs.TeacherLastName = (string)reader[9];
                        }

                        cs.Schedule = (string)reader[10];
                        cs.Location = (string)reader[11];

                        data.Add(cs);
                    }

                    reader.Close();

                    connection.Close();

                }

            }
            catch (Exception ex)
            {

                responseJSON.message = ex.Message;

                return JsonSerializer.Serialize(responseJSON);

            }

            responseJSON.status = "success";
            responseJSON.message = "";
            responseJSON.data = data;

            return JsonSerializer.Serialize(responseJSON);

        }

        
        public static string CourseSemesterUpdateTeacher(string parametersJSON)
        {


            ResponseJSON responseJSON = new ResponseJSON();

            string status = "failed";
            string message = "";

            try
            {

                ParametersJSON parameters = JsonSerializer.Deserialize<ParametersJSON>(parametersJSON);

                if (parameters.parameters.Count < 2)
                {

                    responseJSON.message = "La methode CourseSemesterUpdateTeacher a besoin de 2 paramètres (1. @CourseSemesterId 2. @TeacherId)";

                    return JsonSerializer.Serialize(responseJSON);

                }

                // Provide the query string with a parameter placeholder.
                string queryString = "EXEC CourseSemesterUpdateTeacher" + parameters.parameters[0] + ", " + parameters.parameters[1] + ";";

                using (SqlConnection connection = new SqlConnection(DBConnection.Get()))
                {

                    // Create the Command and Parameter objects.
                    SqlCommand command = new SqlCommand(queryString, connection);

                    connection.Open();

                    SqlDataReader reader = command.ExecuteReader();

                    while (reader.Read())
                    {
                        status = (string)reader[0];

                        if (status == "failed")
                        {
                            message = (string)reader[1];
                        }
                    }

                    reader.Close();

                    connection.Close();

                }

            }
            catch (Exception ex)
            {

                responseJSON.message = ex.Message;

                return JsonSerializer.Serialize(responseJSON);

            }

            responseJSON.status = status;
            responseJSON.message = message;

            return JsonSerializer.Serialize(responseJSON);

        }

        public static string CourseSemesterStudentGetAll(string parametersJSON)
        {

            List<CourseSemesterStudent> data = new List<CourseSemesterStudent>();

            ResponseJSON responseJSON = new ResponseJSON();

            string status = "failed";
            string message = "";

            try
            {

                ParametersJSON parameters = JsonSerializer.Deserialize<ParametersJSON>(parametersJSON);

                if (parameters.parameters.Count < 1)
                {

                    responseJSON.message = "La methode CourseSemesterStudentGetAll a besoin de 1 paramètre (1. @CourseSemesterId)";

                    return JsonSerializer.Serialize(responseJSON);

                }

                // Provide the query string with a parameter placeholder.
                string queryString = "EXEC CourseSemesterStudentGetAll " + parameters.parameters[0] +";";

                using (SqlConnection connection = new SqlConnection(DBConnection.Get()))
                {

                    // Create the Command and Parameter objects.
                    SqlCommand command = new SqlCommand(queryString, connection);

                    connection.Open();

                    SqlDataReader reader = command.ExecuteReader();

                    while (reader.Read())
                    {
                        CourseSemesterStudent css = new CourseSemesterStudent();

                        css.Id = (int)reader[0];
                        css.StudentId = (int)reader[1];
                        css.FirstName = (string)reader[2];
                        css.LastName = (string)reader[3];
                        css.Grade = (decimal)reader[4];

                        data.Add(css);
                    }

                    reader.Close();

                    connection.Close();

                }

            }
            catch (Exception ex)
            {

                responseJSON.message = ex.Message;

                return JsonSerializer.Serialize(responseJSON);

            }

            responseJSON.status = "success";
            responseJSON.message = "";
            responseJSON.data = data;

            return JsonSerializer.Serialize(responseJSON);

        }

        public static string CourseSemesterStudentInsert(string parametersJSON)
        {

            ResponseJSON responseJSON = new ResponseJSON();

            string status = "failed";
            string message = "";
            string data = "";

            try
            {

                ParametersJSON parameters = JsonSerializer.Deserialize<ParametersJSON>(parametersJSON);

                if (parameters.parameters.Count < 2)
                {

                    responseJSON.message = "La methode CourseSemesterStudentInsert a besoin de 2 paramètres (1. @CourseSemesterId, 2. @StudentId)";

                    return JsonSerializer.Serialize(responseJSON);

                }

                // Provide the query string with a parameter placeholder.
                string queryString = "EXEC CourseSemesterStudentInsert " + parameters.parameters[0] + ", " + parameters.parameters[1] + ";";

                using (SqlConnection connection = new SqlConnection(DBConnection.Get()))
                {

                    // Create the Command and Parameter objects.
                    SqlCommand command = new SqlCommand(queryString, connection);

                    connection.Open();

                    SqlDataReader reader = command.ExecuteReader();

                    while (reader.Read())
                    {
                        status = (string)reader[0];

                        if (status == "failed")
                        {
                            message = (string)reader[1];
                        }
                        else
                        {
                            data = (string)reader[1];
                        }
                    }

                    reader.Close();

                    connection.Close();

                }

            }
            catch (Exception ex)
            {

                responseJSON.message = ex.Message;

                return JsonSerializer.Serialize(responseJSON);

            }

            responseJSON.status = status;
            responseJSON.message = message;
            responseJSON.data = data;

            return JsonSerializer.Serialize(responseJSON);

        }

        public static string CourseSemesterStudentUpdateGrade(string parametersJSON)
        {

            ResponseJSON responseJSON = new ResponseJSON();

            string status = "failed";
            string message = "";

            try
            {

                ParametersJSON parameters = JsonSerializer.Deserialize<ParametersJSON>(parametersJSON);

                if (parameters.parameters.Count < 3)
                {

                    responseJSON.message = "La methode CourseSemesterStudentUpdateGrade a besoin de 3 paramètres (1. @CourseSemesterId, 2. @StudentId, 3. @Grade)";

                    return JsonSerializer.Serialize(responseJSON);

                }

                // Provide the query string with a parameter placeholder.
                string queryString = "EXEC CourseSemesterStudentUpdateGrade " + parameters.parameters[0] + ", " + parameters.parameters[1] + ", " + parameters.parameters[2] + ";";

                using (SqlConnection connection = new SqlConnection(DBConnection.Get()))
                {

                    // Create the Command and Parameter objects.
                    SqlCommand command = new SqlCommand(queryString, connection);

                    connection.Open();

                    SqlDataReader reader = command.ExecuteReader();

                    while (reader.Read())
                    {
                        status = (string)reader[0];

                        if (status == "failed")
                        {
                            message = (string)reader[1];
                        }
                    }

                    reader.Close();

                    connection.Close();

                }

            }
            catch (Exception ex)
            {

                responseJSON.message = ex.Message;

                return JsonSerializer.Serialize(responseJSON);

            }

            responseJSON.status = status;
            responseJSON.message = message;

            return JsonSerializer.Serialize(responseJSON);

        }

        public static string CourseSemesterStudentDelete(string parametersJSON)
        {

            ResponseJSON responseJSON = new ResponseJSON();

            string status = "failed";
            string message = "";

            try
            {

                ParametersJSON parameters = JsonSerializer.Deserialize<ParametersJSON>(parametersJSON);

                if (parameters.parameters.Count < 2)
                {

                    responseJSON.message = "La methode CourseSemesterStudentDelete a besoin de 2 paramètres (1. @CourseSemesterId, 2. @StudentId)";

                    return JsonSerializer.Serialize(responseJSON);

                }

                // Provide the query string with a parameter placeholder.
                string queryString = "EXEC CourseSemesterStudentDelete " + parameters.parameters[0] + ", " + parameters.parameters[1] + ";";

                using (SqlConnection connection = new SqlConnection(DBConnection.Get()))
                {

                    // Create the Command and Parameter objects.
                    SqlCommand command = new SqlCommand(queryString, connection);

                    connection.Open();

                    SqlDataReader reader = command.ExecuteReader();

                    while (reader.Read())
                    {
                        status = (string)reader[0];

                        if (status == "failed")
                        {
                            message = (string)reader[1];
                        }
                    }

                    reader.Close();

                    connection.Close();

                }

            }
            catch (Exception ex)
            {

                responseJSON.message = ex.Message;

                return JsonSerializer.Serialize(responseJSON);

            }

            responseJSON.status = status;
            responseJSON.message = message;

            return JsonSerializer.Serialize(responseJSON);

        }


        public static string PersonGetAll(string parametersJSON)
        {

            List<Person> data = new List<Person>();

            ResponseJSON responseJSON = new ResponseJSON();

            string status = "failed";
            string message = "";

            try
            {

                ParametersJSON parameters = JsonSerializer.Deserialize<ParametersJSON>(parametersJSON);

                string parametersSTR = "NULL";

                if (parameters.parameters.Count == 1)
                {
                    parametersSTR = "'" + parameters.parameters[0] + "'";
                }

                // Provide the query string with a parameter placeholder.
                string queryString = "EXEC PersonGetAll "+parametersSTR+";";

                using (SqlConnection connection = new SqlConnection(DBConnection.Get()))
                {

                    // Create the Command and Parameter objects.
                    SqlCommand command = new SqlCommand(queryString, connection);

                    connection.Open();

                    SqlDataReader reader = command.ExecuteReader();

                    while (reader.Read())
                    {
                        Person p = new Person();

                        p.Id = (int)reader[0];
                        p.FirstName = (string)reader[1];
                        p.LastName = (string)reader[2];
                        p.Phone = (string)reader[3];
                        p.Email = (string)reader[4];

                        data.Add(p);
                    }

                    reader.Close();

                    connection.Close();

                }

            }
            catch (Exception ex)
            {

                responseJSON.message = ex.Message;

                return JsonSerializer.Serialize(responseJSON);

            }

            responseJSON.status = "success";
            responseJSON.message = "";
            responseJSON.data = data;

            return JsonSerializer.Serialize(responseJSON);

        }

        public static string PersonUpdateInfo(string parametersJSON)
        {

            ResponseJSON responseJSON = new ResponseJSON();

            string status = "failed";
            string message = "";

            try
            {

                ParametersJSON parameters = JsonSerializer.Deserialize<ParametersJSON>(parametersJSON);

                if (parameters.parameters.Count < 5)
                {

                    responseJSON.message = "La methode PersonUpdateInfo a besoin de 5 paramètres (1. @PersonId, 2. @FirstName, 3. @LastName, 4. @Phone, 5. @Email)";

                    return JsonSerializer.Serialize(responseJSON);

                }

                // Provide the query string with a parameter placeholder.
                string queryString = "EXEC PersonUpdateInfo " + parameters.parameters[0] + ", '" + parameters.parameters[1] + "', '" + parameters.parameters[2] + "', '" + parameters.parameters[3] + "', '" + parameters.parameters[4] + "';";

                using (SqlConnection connection = new SqlConnection(DBConnection.Get()))
                {

                    // Create the Command and Parameter objects.
                    SqlCommand command = new SqlCommand(queryString, connection);

                    connection.Open();

                    SqlDataReader reader = command.ExecuteReader();

                    while (reader.Read())
                    {
                        status = (string)reader[0];

                        if (status == "failed")
                        {
                            message = (string)reader[1];
                        }
                    }

                    reader.Close();

                    connection.Close();

                }

            }
            catch (Exception ex)
            {

                responseJSON.message = ex.Message;

                return JsonSerializer.Serialize(responseJSON);

            }

            responseJSON.status = status;
            responseJSON.message = message;

            return JsonSerializer.Serialize(responseJSON);

        }

    }
}
