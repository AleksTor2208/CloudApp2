using CloudAppWebApi.Model;

namespace CloudAppWebApi.Repository
{
    public interface IDbRepository
    {
        Task<IEnumerable<IFile>> GetFiles();
        Task<IFile?> GetFileById(string fileId);
        Task<IFile> DownloadFile(string Id);
        Task<IFile> Delete(string Id);

        Task UploadFileAsync(CloudFile file);
    }
}