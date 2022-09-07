using Microsoft.AspNetCore.Mvc;
using System.Web;
using System.IO.Compression;
using CloudAppWebApi.Repository;
using CloudAppWebApi.Model;
using Microsoft.AspNetCore.Cors;
using Newtonsoft.Json;
using MongoDB.Bson;
using System.Text;

namespace CloudAppWebApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    [Produces("application/json")]
    [EnableCors("ReactPolicy")]
    public class CloudController : Controller
    {
        private readonly ILogger<CloudController> _logger;
        private readonly IDbRepository _dbConnection;

        public CloudController(ILogger<CloudController> logger, IDbRepository dbConnection)
        {
            _logger = logger;
            _dbConnection = dbConnection;
        }

        [HttpGet("files")]
        [Route("/files")]
        public async Task<IEnumerable<IFile>> Get()
        {
            IEnumerable<IFile> files;
            try
            {
                files = await _dbConnection.GetFiles();
                _logger.LogInformation("Files retrieved from database.");
            }
            catch (Exception e)
            {
                _logger.LogError("Error when getting strategies from DB:");
                _logger.LogError(e.Message);
                _logger.LogError(e.StackTrace);
                throw;
            }

            return files;
        }

        [HttpPost("upload")]
        [Route("/upload")]
        public async Task<IActionResult> OnPostUploadAsync(IFormFile file/*[FromBody] Entity entity*/)
        {
            var entity = FormToFileEntity(file);
            if (entity == null || string.IsNullOrEmpty(entity.Title))
            {
                _logger.LogError("Parsed Json file is invalid.");
                return BadRequest();
            }
            try
            {
                await _dbConnection.UploadFileAsync(entity);
                List<IFormFile> files = new List<IFormFile>();
                _logger.LogInformation("In OnPostUploadAsync()");
               
            }
            catch (Exception)
            {
                throw;
            }
            string successMessage = $"file was uploaded successfully.";
            _logger.LogInformation(successMessage);
            return Ok(successMessage);
        }

        private CloudFile FormToFileEntity(IFormFile form)
        {
            byte[] data;
            using (var br = new BinaryReader(form.OpenReadStream()))
            {
                data = br.ReadBytes((int)form.OpenReadStream().Length);
            }
            var file = new CloudFile
            {
                Title = form.FileName,
                Extension = form.ContentType,
                FileSize = form.Length.ToString(),
                Content = data,
                ModifiedDate = DateTime.Now.ToString("MM/dd/yyyy")
            };
            return file;
        }
    }
}
