using System.Linq.Expressions;
using CloudApp.Utils;
using CloudAppWebApi.Model;
using MongoDB.Bson;
using MongoDB.Bson.Serialization;
using MongoDB.Driver;
using Newtonsoft.Json;

namespace CloudAppWebApi.Repository
{
    public class MongoDbRepository : IDbRepository
    {
        private readonly IMongoDatabase _database;
        private const string CloudTableName = "Cloud";

        public MongoDbRepository()
        {
            var connString = AppSettings.ConnectionString;
            var dbClient = new MongoClient(connString);
            _database = dbClient.GetDatabase("data");
        }

        public async Task<IEnumerable<IFile>> GetFiles()
        {
            var collection = _database.GetCollection<BsonDocument>(CloudTableName);
            var results = await collection.FindAsync(_ => true);
            return results.ToList().Select(r => BsonSerializer.Deserialize<CloudFile>(r));
        }

        public async Task<IFile?> GetFileById(string fileId)
        {
            var collection = _database.GetCollection<CloudFile>(CloudTableName);
            var result = await collection.FindAsync(d => d.Id == fileId);
            return result?.ToList()?.FirstOrDefault();
        }

        public Task<IFile> Delete(string Id)
        {
            throw new NotImplementedException();
        }

        public Task<IFile> DownloadFile(string Id)
        {
            throw new NotImplementedException();
        }

        public async Task UploadFileAsync(CloudFile file)
        {
            var dataTable = _database.GetCollection<BsonDocument>(CloudTableName);
            var fileAsBson = file.ToBsonDocument();
            await dataTable.InsertOneAsync(fileAsBson);
        }
    }
}
