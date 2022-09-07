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

        //[JsonIgnore]
        [JsonProperty("_id")]
        public string Id => Guid.NewGuid().ToString();
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
    }
}
