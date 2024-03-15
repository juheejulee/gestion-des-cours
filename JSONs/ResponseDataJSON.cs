namespace CollegeAPI.JSONs
{
    public class ResponseDataJSON
    {
        public string status { get; set; }
        public string message { get; set; }
        public Object data { get; set; }

        public ResponseDataJSON()
        {
            this.status = "success";
            this.message = message;
            this.data = null;
        }
    }
}
