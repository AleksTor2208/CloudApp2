using Newtonsoft.Json;

namespace CloudAppWebApi.Model
{

    public class Entity
    {
        [JsonProperty(PropertyName = "file")]
        public CloudFile File { get; set; }
    }

    public class CloudFile : IFile
    {
        public CloudFile()
        {                
        }

        private string? id;

        [JsonProperty("_id")]
        public string Id {
            get
            {
                if (id == null)
                {
                    id = Guid.NewGuid().ToString();                    
                }
                return id;
            }
            set
            { 
                id = value;
            } 
        }
        [JsonProperty("checked")]
        public bool IsChecked { get; set; }
        [JsonProperty("title")]
        public string Title { get; set; }
        [JsonProperty("extension")]
        public string Extension { get; set; }
        [JsonProperty("fileSize")]
        public string FileSize { get; set; }
        [JsonProperty("content")]
        public byte[] Content { get; set; }
        [JsonProperty("modifiedDate")]
        public string ModifiedDate { get; set; }
        [JsonProperty("contentType")]
        public string ContentType { get; set; }
    }
}
