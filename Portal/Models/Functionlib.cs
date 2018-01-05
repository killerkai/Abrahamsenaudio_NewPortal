
namespace Portal.Models
{
    using System;
    using System.Data.SqlClient;
    using System.Configuration;
    using System.Data;
    using System.Collections.Generic;
    using System.Linq;

    public class Functionlib
    {
        public adbdDataContext db;
        public string _ConnString;
        public SqlConnection _Connection;


        public Functionlib(string _ConnectionId)
        {
            _ConnString = ConfigurationManager.ConnectionStrings[_ConnectionId].ConnectionString;
            db = new adbdDataContext(_ConnString);
        }

        public SqlConnection getConnection()
        {
            if (_Connection == null)
            {
                _Connection = new SqlConnection(_ConnString);
            }
            if (!(_Connection.State == ConnectionState.Open))
            {
                _Connection.Open();
            }
            return _Connection;
        }
        public List<ProductGruppeTypeClass> getProductGruppeType()
        {
            
                List<ProductGruppeTypeClass> _ListUserType = (from ProductGruppeType in db.tblProductGroups                                                     
                                                     select new ProductGruppeTypeClass()
                                                     {
                                                         ProduktgruppeId = ProductGruppeType.ProduktgruppeId,
                                                         Produktgruppe = ProductGruppeType.Produktgruppe
                                                     }).ToList();
                return _ListUserType;
            }
        public List<ProductKategoriTypeClass> getProductKategoriType()
        {

            List<ProductKategoriTypeClass> _ListUserType = (from ProductKategoriType in db.tblProductCategories
                                                          select new ProductKategoriTypeClass()
                                                          {
                                                              ProduktkategoriId = ProductKategoriType.ProduktkategoriId,
                                                              Produktkategori = ProductKategoriType.Produktkategori
                                                          }).ToList();
            return _ListUserType;
        }



        //////////////////////////////////////////////////

        public class PagerClass
        {
            public int PageSize { get; set; }
            public int PageCount { get; set; }
            public int RecordCount { get; set; }
        }
        public class ProductGruppeTypeClass
        {
            public int ProduktgruppeId { get; set; }
            public string Produktgruppe { get; set; }
        }
        public class ProductKategoriTypeClass
        {
            public int ProduktkategoriId { get; set; }
            public string Produktkategori { get; set; }
        }
    }
}
