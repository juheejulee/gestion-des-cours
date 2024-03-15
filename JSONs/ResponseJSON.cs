namespace CollegeAPI.JSONs
{
    public class ResponseJSON
    {
        public string status { get; set; }
        public string message { get; set; }
        public Object data { get; set; }

        public ResponseJSON(string message = "unknown error")
        {

            this.status = "failed";
            this.message = message;
            this.data = null;

        }
    }
}
