namespace Portal.Controllers
{
    using Newtonsoft.Json;
    using System;
    using System.Net;
    using System.Net.Http;
    using System.Text;
    using System.Web;
    using System.Web.Http;

    using Functions;
    using static Functions.SignInClass;

    public class SigInOutController : ApiController
    {
        // POST: api/signinout/signin[Object]
        [HttpPost]
        [Route("api/signinout/signin")]
        [ActionName("signin")]
        public HttpResponseMessage SignIn(SignInTransferClass input)
        {
            try
            {
                string _Username = "";
                string _Password = "";
                if (Request.Headers.Authorization != null)
                {
                    string _AuthenticationToken = Request.Headers.Authorization.Parameter;
                    string _DecodedAuthenticationToken = Encoding.UTF8.GetString(Convert.FromBase64String(_AuthenticationToken));
                    string[] _UsernamePasswordArray = _DecodedAuthenticationToken.Split(':');
                    _Username = _UsernamePasswordArray[0];
                    _Password = _UsernamePasswordArray[1];
                }
                else
                {
                    return Request.CreateErrorResponse(HttpStatusCode.NonAuthoritativeInformation, "No Headers Authorization");
                }

                SignInRootClass _ReturnSignInOut = null;
                SignInClass si = new SignInClass
                {
                    Username = _Username,
                    Password = _Password,
                    LanguageCode = input.LanguageCode
                };

                _ReturnSignInOut = si.setSignIn();
                if (_ReturnSignInOut == null)
                {
                    return Request.CreateErrorResponse(HttpStatusCode.NotFound, "");
                }
                else
                {
                    setSession(JsonConvert.SerializeObject(_ReturnSignInOut));
                    var ret = new { Transfer = 200, UserType = _ReturnSignInOut.UserType };
                    return Request.CreateResponse(HttpStatusCode.OK, ret);
                }
            }
            catch (System.Exception e)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, e);
            }
        }

        private void setSession(object jsonInfo)
        {
            HttpContext.Current.Session.Timeout = 60;
            HttpContext.Current.Session["AbWeb"] = jsonInfo;
        }

        // GET: api/signinout/getsession
        [HttpGet]
        [Route("api/signinout/sessions")]
        [ActionName("sessions")]
        public HttpResponseMessage Sessions()
        {
            try
            {
                if (HttpContext.Current.Session["AbWeb"] == null)
                {
                    return Request.CreateErrorResponse(HttpStatusCode.Forbidden, "");
                }
                else
                {
                    SignInRootClass _SignInRoot = JsonConvert.DeserializeObject<SignInRootClass>(HttpContext.Current.Session["AbWeb"].ToString());
                    UserSignInClass _UserSignIn = new UserSignInClass();

                    _UserSignIn.FirstName = _SignInRoot.FirstName;
                    _UserSignIn.LastName = _SignInRoot.LastName;
                    _UserSignIn.LanguageCode = _SignInRoot.LanguageCode;
                    _UserSignIn.UserType = _SignInRoot.UserType;
                    _UserSignIn.UserId = _SignInRoot.UserId;                   
                    _UserSignIn.Transfer = 200;
                    HttpContext.Current.Session.Timeout = 60;
                    return Request.CreateResponse(HttpStatusCode.OK, _UserSignIn);
                }
            }
            catch (System.Exception e)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, e);
            }
        }

        // POST: api/signinout/signout
        [HttpPost]
        [Route("api/signinout/signout")]
        [ActionName("signout")]
        public HttpResponseMessage SignOut()
        {
            try
            {
                HttpContext.Current.Session["AbWeb"] = null;
                return Request.CreateResponse(HttpStatusCode.OK, "");
            }
            catch (System.Exception e)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, e);
            }
        }

    }

    public class SignInTransferClass
    {
        public string Username { get; set; }
        public string Password { get; set; }
        public string LanguageCode { get; set; }
    }

    public class UserSignInClass
    {
        public int Transfer { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }     
        public string LanguageCode { get; set; }
        public string UserType { get; set; }
        public int UserId { get; set; }
    }
}   
