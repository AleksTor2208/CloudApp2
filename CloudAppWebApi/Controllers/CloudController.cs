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

        [HttpGet("Test")]
        [Route("/test")]
        public void Test()
        {
            Console.Write("What the fag.");
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
        public async Task<IActionResult> OnPostUploadAsync([FromBody] Entity entity)
        {
            HttpContext.Request.EnableBuffering();

            string body = string.Empty;

            var req = HttpContext.Request;

            //string requestBody = await new StreamReader(req.Body).ReadToEndAsync().ConfigureAwait(false);

            //req.EnableRewind();
            //content.Position = 0;

            //using (var mem = new MemoryStream())
            //using (var reader = new StreamReader(mem, encoding: Encoding.UTF8))
            //{
            //    Request.Body.CopyTo(mem);
            //    mem.Seek(0, SeekOrigin.Begin);

            //    reader.BaseStream.Seek(0, SeekOrigin.Begin);
            //    body = await reader.ReadToEndAsync();
            //}  

            //if (string.IsNullOrEmpty(body))
            //{
            //    _logger.LogError("Unable to upload empty JSon.");
            //    return BadRequest();
            //}

            //var jsonResult = JsonConvert.DeserializeObject(body)?.ToString();

            //CloudFile? fille = null;
            //if (jsonResult != null)
            //{
            //    fille = JsonConvert.DeserializeObject<CloudFile>(jsonResult);
            //}

            if (entity == null || string.IsNullOrEmpty(entity.File.Id))
            {
                _logger.LogError("Parsed Json file is invalid.");
                return BadRequest();
            }
            try
            {
                //var document = file.ToBsonDocument();
                await _dbConnection.UploadFileAsync(entity.File);
                List<IFormFile> files = new List<IFormFile>();
                _logger.LogInformation("In OnPostUploadAsync()");
               
            }
            catch (Exception)
            {
                throw;
            }
            _logger.LogInformation($"file was uploaded successfully.");
            // Process uploaded files
            // Don't rely on or trust the FileName property without validation.
            string message = "file was uploaded successfully.";
            return Ok(message);
        }

            //[HttpPost]
            //public ActionResult ProcessImport(HttpPostedFileBase file)
            //{
            //    try
            //    {
            //        ViewBag.Message = "Your contact page.";

            //        ZipArchive archive = new ZipArchive(file.InputStream);
            //        var htmlFileManager = new HtmlFilesLoadManager();
            //        var count = 1;
            //        _logger.LogInformation("Start Import");
            //        foreach (ZipArchiveEntry entry in archive.Entries)
            //        {
            //            _logger.LogInformation($"Loading file # {count} out of {archive.Entries.Count()}");
            //            if (entry.FullName.EndsWith(".html", StringComparison.OrdinalIgnoreCase))
            //            {
            //                using (var stream = entry.Open())
            //                using (var reader = new StreamReader(stream))
            //                {
            //                    var htmlDocument = reader.ReadToEnd();
            //                    htmlFileManager.ProcessFile(entry.ToString(), htmlDocument);
            //                }
            //            }
            //            count++;
            //        }
            //        return new HttpStatusCodeResult(HttpStatusCode.OK);
            //    }
            //    catch (Exception e)
            //    {
            //        Log.Error("Error during zip files import:");
            //        Log.Error(e.Message);
            //        Log.Error(e.StackTrace);
            //        throw;
            //    }
            //}
        }
    }
