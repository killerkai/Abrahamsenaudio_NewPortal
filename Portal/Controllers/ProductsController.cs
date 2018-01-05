namespace Portal.Controllers
{

    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Net;
    using System.Net.Http;
    using System.Web;
    using System.Web.Http;

    using Functions;
    using static Functions.ProductCrudClass;


    public class ProductsController : ApiController
    {
        // POST: api/admin/productcrud[Object]
        [HttpPost]
        [Route("api/admin/productcrud")]
        [ActionName("productcrud")]
        public HttpResponseMessage ProductCrud(ProductTransferClass input)
        {
            try
            {
                if (HttpContext.Current.Session["AbWeb"] == null)
                {
                    return Request.CreateErrorResponse(HttpStatusCode.Forbidden, "");                    
                }
                else
                {
                    object _ReturnProductCrudData = null;

                    ProductCrudClass productcrud = new ProductCrudClass()
                    {
                        TransferType = input.TransferType,
                        ObjProductGridSettings = input.ProductGridSettings,
                        ObjProductData = input.ProductData
                    };
                    
                    _ReturnProductCrudData = productcrud.getProductCrud();
                    if (_ReturnProductCrudData == null)
                    {
                        return Request.CreateErrorResponse(HttpStatusCode.NotFound, "");                       
                    }

                    else
                    {
                        return Request.CreateResponse(HttpStatusCode.OK, _ReturnProductCrudData);
                    }
                }
            }            
            catch (System.Exception e)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, e);
            }
        }
    }

    ////////////////////////////////////////////////////////////

    public class ProductTransferClass
    {
        public string TransferType { get; set; }
        public ProductGridSettingsClass ProductGridSettings { get; set; }
        public ProductClass ProductData { get; set; }
    }

    public class ProductGridSettingsClass
    {
        public int PageCurrent { get; set; }
        public int PageSize { get; set; }
        public string SystemPage { get; set; }
        public string SearchClause { get; set; }
        public string OrderByClause { get; set; }
    }
}
