﻿

namespace Portal.Functions
{
    using System;
    using System.Data;
    using System.Collections.Generic;
    using Newtonsoft.Json;
    using System.Linq;
    using System.Linq.Dynamic;
    using System.Web;
    
    using Models;
    using static Models.Functionlib;
    using Controllers;

    public class ProductCrudClass
    {
        private Functionlib _Flib;
        private ReturnProductCrudClass _ReturnProductCrud;
        private PagerClass _Pager;
        private DateTime _Today;
        private int _RecordCount;
        private int _ReturnCode;
        private bool _Return;

        private string _TransferType;
        private ProductGridSettingsClass _ObjProductGridSettings;
        private ProductClass _ObjProductData;
        private List<ProductAddOnsClass> _ObjProductTillegg;

        public string TransferType { get { return this._TransferType; } set { this._TransferType = value; } }
        public ProductGridSettingsClass ObjProductGridSettings { get { return this._ObjProductGridSettings; } set { this._ObjProductGridSettings = value; } }
        public ProductClass ObjProductData { get { return this._ObjProductData; } set { this._ObjProductData = value; } }
        public List<ProductAddOnsClass> ObjProductTillegg { get { return this._ObjProductTillegg; } set { this._ObjProductTillegg = value; } }

        
        public ProductCrudClass()
        {
            _ReturnProductCrud = new ReturnProductCrudClass();
            _Pager = new PagerClass();
            _Return = true;
            _RecordCount = 0;
        }

        public ReturnProductCrudClass getProductCrud()
        {
            _Flib = new Functionlib("abdb");

            ReturnProductCrudClass _SwitchReturn;
            switch (_TransferType.ToLower())
            {
                case "readproductgrid":
                    _SwitchReturn = readProductGrid();
                    break;
                case "readoption":
                    _SwitchReturn = readOption();
                    break;
                case "createproduct":
                    _SwitchReturn = createProduct();
                    break;
                case "updateproduct":
                    _SwitchReturn = updateProduct();
                    break;
                case "deleteproduct":
                    _SwitchReturn = deleteProduct();
                    break;
                case "updateproductstatus":
                    _SwitchReturn = updateProductStatus();
                    break;
                case "updateproductslidestatus":
                    _SwitchReturn = updateProductSlideStatus();
                    break;
                case "updateproductwebstatus":
                    _SwitchReturn = updateProductWebStatus();
                    break;
                case "updateproductbutikkstatus":
                    _SwitchReturn = updateProductButikkStatus();
                    break;
                case "deleteadons":
                    _SwitchReturn = deleteAddons();
                    break;
                case "readproductkategorigrid":
                    _SwitchReturn = readProductKategoriGrid();
                    break;
                case "updateproductcategorystatus":
                    _SwitchReturn = updateProductCategoryStatus();
                    break;
                case "createproductcategory":
                    _SwitchReturn = createProductCategory();
                    break;
                case "deleteproductcategory":
                    _SwitchReturn = deleteProductCategory();
                    break;
                default:
                    _SwitchReturn = null;
                    break;
            }
            _Flib.db.Dispose();
            return _SwitchReturn;

        }
        public ReturnProductCrudClass readProductGrid()
        {
            if (_ObjProductGridSettings != null && _ObjProductData != null)
            {
                _ReturnProductCrud.ProductGruppeData = _Flib.getProductGruppeType();
                if(_ObjProductData.ProductGruppeId == 0)
                {
                    if (ObjProductGridSettings.SearchClause == "")
                    {
                        List<ProductClass> _ListProduct = (from Product in _Flib.db.tblProducts
                                                           join ProductCategory in _Flib.db.tblProductCategories on Product.ProduktkategoriId equals ProductCategory.ProduktkategoriId
                                                           where Product.Status == _ObjProductData.Status
                                                           select new ProductClass()
                                                           {
                                                               ProduktId = Product.ProduktId,
                                                               Produkt = Product.Produkt != "" ? Product.Produkt : "",
                                                               WebStatus = Product.WebStatus,
                                                               SlideStatus = Product.SlideStatus,
                                                               ButikkStatus = Product.ButikkStatus,
                                                               LagerDato = Product.LagerDato.HasValue ? Convert.ToDateTime(Product.LagerDato.ToString()) : (DateTime?)null,
                                                               Status = Product.Status,
                                                               Produktkategori = ProductCategory.Produktkategori != "" ? ProductCategory.Produktkategori : ""

                                                           }).OrderBy(_ObjProductGridSettings.OrderByClause).Skip((_ObjProductGridSettings.PageCurrent - 1) * _ObjProductGridSettings.PageSize).Take(_ObjProductGridSettings.PageSize).ToList();

                        _RecordCount = (from Product in _Flib.db.tblProducts
                                        join ProductCategory in _Flib.db.tblProductCategories on Product.ProduktkategoriId equals ProductCategory.ProduktkategoriId
                                        where Product.Status == _ObjProductData.Status 
                                        select Product).Count();

                        _Pager.PageSize = _ObjProductGridSettings.PageSize;
                        _Pager.PageCount = Convert.ToInt32(Math.Ceiling((Convert.ToDouble(_RecordCount) / Convert.ToDouble(_ObjProductGridSettings.PageSize))));
                        _Pager.RecordCount = _RecordCount;

                        _ReturnProductCrud.ProductData = _ListProduct;
                        _ReturnProductCrud.ProductGruppeId = _ObjProductData.ProductGruppeId;
                        _ReturnProductCrud.PagerInfo = _Pager;
                        _ReturnProductCrud.Transfer = 200;
                    }
                    else
                    {
                        List<ProductClass> _ListProduct = (from Product in _Flib.db.tblProducts
                                                           join ProductCategory in _Flib.db.tblProductCategories on Product.ProduktkategoriId equals ProductCategory.ProduktkategoriId
                                                           where Product.Status == _ObjProductData.Status
                                                           && Product.Produkt.Contains(_ObjProductGridSettings.SearchClause) || ProductCategory.Produktkategori.Contains(_ObjProductGridSettings.SearchClause)
                                                           select new ProductClass()
                                                           {
                                                               ProduktId = Product.ProduktId,
                                                               Produkt = Product.Produkt != "" ? Product.Produkt : "",
                                                               WebStatus = Product.WebStatus,
                                                               SlideStatus = Product.SlideStatus,
                                                               ButikkStatus = Product.ButikkStatus,
                                                               LagerDato = Product.LagerDato.HasValue ? Convert.ToDateTime(Product.LagerDato.ToString()) : (DateTime?)null,
                                                               Status = Product.Status,
                                                               Produktkategori = ProductCategory.Produktkategori != "" ? ProductCategory.Produktkategori : ""

                                                           }).OrderBy(_ObjProductGridSettings.OrderByClause).Skip((_ObjProductGridSettings.PageCurrent - 1) * _ObjProductGridSettings.PageSize).Take(_ObjProductGridSettings.PageSize).ToList();

                        _RecordCount = (from Product in _Flib.db.tblProducts
                                        join ProductCategory in _Flib.db.tblProductCategories on Product.ProduktkategoriId equals ProductCategory.ProduktkategoriId
                                        where Product.Status == _ObjProductData.Status
                                        && Product.Produkt.Contains(_ObjProductGridSettings.SearchClause) || ProductCategory.Produktkategori.Contains(_ObjProductGridSettings.SearchClause)
                                        select Product).Count();

                        _Pager.PageSize = _ObjProductGridSettings.PageSize;
                        _Pager.PageCount = Convert.ToInt32(Math.Ceiling((Convert.ToDouble(_RecordCount) / Convert.ToDouble(_ObjProductGridSettings.PageSize))));
                        _Pager.RecordCount = _RecordCount;

                        _ReturnProductCrud.ProductData = _ListProduct;
                        _ReturnProductCrud.ProductGruppeId = _ObjProductData.ProductGruppeId;
                        _ReturnProductCrud.PagerInfo = _Pager;
                        _ReturnProductCrud.Transfer = 200;
                    }

                }
                else
                {
                    if (ObjProductGridSettings.SearchClause == "")
                    {
                        List<ProductClass> _ListProduct = (from Product in _Flib.db.tblProducts
                                                           join ProductCategory in _Flib.db.tblProductCategories on Product.ProduktkategoriId equals ProductCategory.ProduktkategoriId
                                                           where Product.Status == _ObjProductData.Status && Product.ProduktgruppeId == _ObjProductData.ProductGruppeId
                                                           select new ProductClass()
                                                           {
                                                               ProduktId = Product.ProduktId,
                                                               Produkt = Product.Produkt != "" ? Product.Produkt : "",
                                                               WebStatus = Product.WebStatus,
                                                               SlideStatus = Product.SlideStatus,
                                                               ButikkStatus = Product.ButikkStatus,
                                                               Status = Product.Status,
                                                               Produktkategori = ProductCategory.Produktkategori != "" ? ProductCategory.Produktkategori : ""

                                                           }).OrderBy(_ObjProductGridSettings.OrderByClause).Skip((_ObjProductGridSettings.PageCurrent - 1) * _ObjProductGridSettings.PageSize).Take(_ObjProductGridSettings.PageSize).ToList();

                        _RecordCount = (from Product in _Flib.db.tblProducts
                                        join ProductCategory in _Flib.db.tblProductCategories on Product.ProduktkategoriId equals ProductCategory.ProduktkategoriId
                                        where Product.Status == _ObjProductData.Status && Product.ProduktgruppeId == _ObjProductData.ProductGruppeId
                                        select Product).Count();

                        _Pager.PageSize = _ObjProductGridSettings.PageSize;
                        _Pager.PageCount = Convert.ToInt32(Math.Ceiling((Convert.ToDouble(_RecordCount) / Convert.ToDouble(_ObjProductGridSettings.PageSize))));
                        _Pager.RecordCount = _RecordCount;

                        _ReturnProductCrud.ProductData = _ListProduct;
                        _ReturnProductCrud.ProductGruppeId = _ObjProductData.ProductGruppeId;
                        _ReturnProductCrud.PagerInfo = _Pager;
                        _ReturnProductCrud.Transfer = 200;
                    }
                    else
                    {
                        List<ProductClass> _ListProduct = (from Product in _Flib.db.tblProducts
                                                           join ProductCategory in _Flib.db.tblProductCategories on Product.ProduktkategoriId equals ProductCategory.ProduktkategoriId
                                                           where Product.ProduktgruppeId == _ObjProductData.ProductGruppeId && Product.Status == _ObjProductData.Status
                                                           && Product.Produkt.Contains(_ObjProductGridSettings.SearchClause) || ProductCategory.Produktkategori.Contains(_ObjProductGridSettings.SearchClause)
                                                           select new ProductClass()
                                                           {
                                                               ProduktId = Product.ProduktId,
                                                               Produkt = Product.Produkt != "" ? Product.Produkt : "",
                                                               WebStatus = Product.WebStatus,
                                                               SlideStatus = Product.SlideStatus,
                                                               ButikkStatus = Product.ButikkStatus,
                                                               Status = Product.Status,
                                                               Produktkategori = ProductCategory.Produktkategori != "" ? ProductCategory.Produktkategori : ""

                                                           }).OrderBy(_ObjProductGridSettings.OrderByClause).Skip((_ObjProductGridSettings.PageCurrent - 1) * _ObjProductGridSettings.PageSize).Take(_ObjProductGridSettings.PageSize).ToList();

                        _RecordCount = (from Product in _Flib.db.tblProducts
                                        join ProductCategory in _Flib.db.tblProductCategories on Product.ProduktkategoriId equals ProductCategory.ProduktkategoriId
                                        where Product.ProduktgruppeId == _ObjProductData.ProductGruppeId && Product.Status == _ObjProductData.Status
                                        && Product.Produkt.Contains(_ObjProductGridSettings.SearchClause) || ProductCategory.Produktkategori.Contains(_ObjProductGridSettings.SearchClause)
                                        select Product).Count();

                        _Pager.PageSize = _ObjProductGridSettings.PageSize;
                        _Pager.PageCount = Convert.ToInt32(Math.Ceiling((Convert.ToDouble(_RecordCount) / Convert.ToDouble(_ObjProductGridSettings.PageSize))));
                        _Pager.RecordCount = _RecordCount;

                        _ReturnProductCrud.ProductData = _ListProduct;
                        _ReturnProductCrud.ProductGruppeId = _ObjProductData.ProductGruppeId;
                        _ReturnProductCrud.PagerInfo = _Pager;
                        _ReturnProductCrud.Transfer = 200;
                    }

                }
                
            }
            else
            {
                _ReturnProductCrud.Transfer = 500;

            }            
            return _ReturnProductCrud;
        }
        public ReturnProductCrudClass readOption()
        {
            if (ObjProductData != null)
            {
                List<ProductClass> _ListProduct = (from Product in _Flib.db.tblProducts
                                                   join ProductGroup in _Flib.db.tblProductGroups on Product.ProduktgruppeId equals ProductGroup.ProduktgruppeId
                                                   where Product.ProduktId == _ObjProductData.ProduktId
                                                   select new ProductClass()
                                                   {
                                                       ProduktId = Product.ProduktId,
                                                       ProductGruppeId = Product.ProduktgruppeId,
                                                       ProduktkategoriId = Product.ProduktkategoriId,
                                                       ButikkStatus = Product.ButikkStatus,
                                                       //RegDato = Product.RegDato.HasValue ? Convert.ToDateTime(Product.RegDato.ToString()) : (DateTime?)null,
                                                       Produkt = Product.Produkt != "" ? Product.Produkt : "",
                                                       Pris = Product.Pris != "" ? Product.Pris : "",
                                                       ProduktNr = Product.ProduktNr,
                                                       ProduktBeskrivelse = Product.ProduktBeskrivelse != "" ? Product.ProduktBeskrivelse : "",
                                                       Bredde = Product.Bredde != "" ? Product.Bredde : "",
                                                       Hoyde = Product.Hoyde != "" ? Product.Hoyde : "",
                                                       Dybde = Product.Dybde != "" ? Product.Dybde : "",
                                                       Vekt = Product.Vekt != "" ? Product.Vekt : "",
                                                       LagerDato = Product.LagerDato.HasValue ? Convert.ToDateTime(Product.LagerDato.ToString()) : (DateTime?)null,
                                                       //LagerDato = Product.LagerDato,
                                                       Produktgruppe = ProductGroup.Produktgruppe != "" ? ProductGroup.Produktgruppe : "",
                                                       _ProductAddOnsData = (from ProductAddOn in _Flib.db.tblProductAddOns
                                                                             where ProductAddOn.KnyttetId == Product.ProduktId
                                                                             orderby ProductAddOn.TilleggGruppe
                                                                             select new ProductAddOnsClass()
                                                                             {                                                                                 
                                                                                 TilleggId = ProductAddOn.TilleggId,
                                                                                 TilleggGruppe = ProductAddOn.TilleggGruppe != "" ? ProductAddOn.TilleggGruppe : "",
                                                                                 TilleggTekst = ProductAddOn.TilleggTekst != "" ? ProductAddOn.TilleggTekst : ""
                                                                             }).ToList()
                                                   }).ToList();
                _ReturnProductCrud.ProductData = _ListProduct;
                _ReturnProductCrud.CountAddon = _Flib.db.tblProductAddOns.Where(aou => aou.KnyttetId == _ObjProductData.ProduktId).Count();
            }
            _ReturnProductCrud.ProductGruppeData = _Flib.getProductGruppeType();
            _ReturnProductCrud.ProductKategoriData = _Flib.getProductKategoriType();
            
            _ReturnProductCrud.Transfer = 200;
            return _ReturnProductCrud;
        }
        public ReturnProductCrudClass createProduct()
        {
            if (_ObjProductData != null)
            {
                var _objNewProduct = new tblProduct()
                {
                    RegDato = _Today,
                    ProduktgruppeId = _ObjProductData.ProductGruppeId,
                    ProduktkategoriId = _ObjProductData.ProduktkategoriId,
                    Produkt = Uri.UnescapeDataString(_ObjProductData.Produkt),
                    Status = 1,
                    WebStatus = 0,
                    SlideStatus = 0,
                    ButikkStatus = 0
                };
                _Flib.db.tblProducts.InsertOnSubmit(_objNewProduct);
                _Flib.db.SubmitChanges();
                _ReturnProductCrud.ProductId = _objNewProduct.ProduktId;
                _ReturnProductCrud.Transfer = 200;
            }
            return _ReturnProductCrud;
        }
        public ReturnProductCrudClass updateProduct()
        {

            tblProduct _ObjCurrentProduct = _Flib.db.tblProducts.Where(u => u.ProduktId == _ObjProductData.ProduktId).SingleOrDefault();
            
            // Update Product
            _ObjCurrentProduct.ProduktgruppeId = _ObjProductData.ProductGruppeId;
            _ObjCurrentProduct.ProduktkategoriId = _ObjProductData.ProduktkategoriId;
            _ObjCurrentProduct.LagerDato = _ObjProductData.LagerDato.HasValue == true ? Convert.ToDateTime( _ObjProductData.LagerDato.Value) : (DateTime?)null; 
            _ObjCurrentProduct.Produkt = Uri.UnescapeDataString(_ObjProductData.Produkt);
            _ObjCurrentProduct.Pris = Uri.UnescapeDataString(_ObjProductData.Pris);
            _ObjCurrentProduct.Bredde = Uri.UnescapeDataString(_ObjProductData.Bredde);
            _ObjCurrentProduct.Hoyde = Uri.UnescapeDataString(_ObjProductData.Hoyde);
            _ObjCurrentProduct.Dybde = Uri.UnescapeDataString(_ObjProductData.Dybde);
            _ObjCurrentProduct.Vekt = Uri.UnescapeDataString(_ObjProductData.Vekt);
            _ObjCurrentProduct.ProduktBeskrivelse = Uri.UnescapeDataString(_ObjProductData.ProduktBeskrivelse);

            _Flib.db.SubmitChanges();
            
            foreach (var _CurrentProductTillegg in _ObjProductTillegg)
            {
                if (_CurrentProductTillegg.TilleggId > 0)
                {
                    tblProductAddOn _CurrentProductTilleggRad = _Flib.db.tblProductAddOns.Where(u => u.TilleggId == _CurrentProductTillegg.TilleggId).SingleOrDefault();
                    _CurrentProductTilleggRad.TilleggTekst = Uri.UnescapeDataString(_CurrentProductTillegg.TilleggTekst);
                }
                else
                {
                    var _objNewProductAddOn = new tblProductAddOn()
                    {
                        KnyttetId = _ObjProductData.ProduktId,
                        TilleggGruppe = Uri.UnescapeDataString(_CurrentProductTillegg.TilleggGruppe),
                        TilleggTekst = Uri.UnescapeDataString(_CurrentProductTillegg.TilleggTekst)                        
                    };
                    _Flib.db.tblProductAddOns.InsertOnSubmit(_objNewProductAddOn);
                }
                _Flib.db.SubmitChanges();
            }
            


                _ReturnProductCrud.Transfer = 200;
            return _ReturnProductCrud;

        }
        private ReturnProductCrudClass deleteAddons()
        {
            if (_ObjProductData != null)
            {
                tblProductAddOn _ObjCurrentProductAddon = _Flib.db.tblProductAddOns.Where(u => u.TilleggId == _ObjProductData.tilleggid).SingleOrDefault();
                if (_ObjCurrentProductAddon != null)
                {
                    
                        _Flib.db.tblProductAddOns.DeleteOnSubmit(_ObjCurrentProductAddon);
                        _ReturnCode = 200;
                   

                }
                else
                {
                    _ReturnCode = 404;
                }
            }
            else
            {
                _Return = false;
            }
            // Return
            if (_Return == true)
            {
                _Flib.db.SubmitChanges();
                _ReturnProductCrud.Transfer = _ReturnCode;
            }
            else
            {
                _ReturnProductCrud.Transfer = 500;
            }
            return _ReturnProductCrud;
        }
    
        private ReturnProductCrudClass deleteProduct()
        {
            if (_ObjProductData != null)
            {
                tblProduct _ObjCurrentProduct = _Flib.db.tblProducts.Where(u => u.ProduktId == _ObjProductData.ProduktId).SingleOrDefault();
                if (_ObjCurrentProduct != null)
                {
                    int _CurrentAddOn = _Flib.db.tblProductAddOns.Where(aou => aou.KnyttetId == _ObjProductData.ProduktId).Count();
                    //int _CurrentFolder = _Flib.db.tblFolders.Where(fu => fu.KnyttetId == _ObjProductData.ProduktId).Count();
                    //int _CurrentProductFile = _Flib.db.tblProdctFiles.Where(pfu => pfu.ProduktId == _ObjProductData.ProduktId).Count();
                    //if (_CurrentAddOn > 0 || _CurrentFolder > 0 || _CurrentProductFile > 0)
                    if (_CurrentAddOn > 0 )
                    {
                        _ReturnCode = 403;
                    }
                    else
                    {
                        _Flib.db.tblProducts.DeleteOnSubmit(_ObjCurrentProduct);
                        _ReturnCode = 200;
                    }
                    
                }
                else
                {
                    _ReturnCode = 404;
                }
            }
            else
            {
                _Return = false;
            }
            // Return
            if (_Return == true)
            {
                _Flib.db.SubmitChanges();
                _ReturnProductCrud.Transfer = _ReturnCode;
            }
            else
            {
                _ReturnProductCrud.Transfer = 500;
            }
            return _ReturnProductCrud;
        }

        ////////////////////////////////////////////////////////////////////////////////

               
        private ReturnProductCrudClass updateProductStatus()
        {
            if (_ObjProductData != null)
            {
                tblProduct _ObjCurrentProduct = _Flib.db.tblProducts.Where(u => u.ProduktId == _ObjProductData.ProduktId).SingleOrDefault();
                if (_ObjCurrentProduct != null)
                {
                    int _CurrentStatus = _ObjCurrentProduct.Status;
                    if (_CurrentStatus == 1)
                    {
                        _ObjCurrentProduct.Status = 0;
                    }
                    else
                    {
                        _ObjCurrentProduct.Status = 1;
                    }
                    _ReturnCode = 200;
                }
                else
                {
                    _ReturnCode = 404;
                }
            }
            else
            {
                _Return = false;
            }

            // Return
            if (_Return == true)
            {
                _Flib.db.SubmitChanges();
                _ReturnProductCrud.Transfer = _ReturnCode;
            }
            else
            {
                _ReturnProductCrud.Transfer = 500;
            }
            return _ReturnProductCrud;
        }

        ////////////////////////////////////////////////////////////////////////////////

        private ReturnProductCrudClass updateProductSlideStatus()
        {
            if (_ObjProductData != null)
            {
                tblProduct _ObjCurrentProduct = _Flib.db.tblProducts.Where(u => u.ProduktId == _ObjProductData.ProduktId).SingleOrDefault();
                if (_ObjCurrentProduct != null)
                {
                    int _CurrentStatus = _ObjCurrentProduct.SlideStatus;
                    if (_CurrentStatus == 1)
                    {
                        _ObjCurrentProduct.SlideStatus = 0;
                    }
                    else
                    {
                        _ObjCurrentProduct.SlideStatus = 1;
                    }
                    _ReturnCode = 200;
                }
                else
                {
                    _ReturnCode = 404;
                }
            }
            else
            {
                _Return = false;
            }

            // Return
            if (_Return == true)
            {
                _Flib.db.SubmitChanges();
                _ReturnProductCrud.Transfer = _ReturnCode;
            }
            else
            {
                _ReturnProductCrud.Transfer = 500;
            }
            return _ReturnProductCrud;
        }




        ////////////////////////////////////////////////////////////////////////////////

        private ReturnProductCrudClass updateProductWebStatus()
        {
            if (_ObjProductData != null)
            {
                tblProduct _ObjCurrentProduct = _Flib.db.tblProducts.Where(u => u.ProduktId == _ObjProductData.ProduktId).SingleOrDefault();
                if (_ObjCurrentProduct != null)
                {
                    int _CurrentStatus = _ObjCurrentProduct.WebStatus;
                    if (_CurrentStatus == 1)
                    {
                        _ObjCurrentProduct.WebStatus = 0;
                    }
                    else
                    {
                        _ObjCurrentProduct.WebStatus = 1;
                    }
                    _ReturnCode = 200;
                }
                else
                {
                    _ReturnCode = 404;
                }
            }
            else
            {
                _Return = false;
            }

            // Return
            if (_Return == true)
            {
                _Flib.db.SubmitChanges();
                _ReturnProductCrud.Transfer = _ReturnCode;
            }
            else
            {
                _ReturnProductCrud.Transfer = 500;
            }
            return _ReturnProductCrud;
        }

        ////////////////////////////////////////////////////////////////////////////////

        private ReturnProductCrudClass updateProductButikkStatus()
        {
            if (_ObjProductData != null)
            {
                tblProduct _ObjCurrentProduct = _Flib.db.tblProducts.Where(u => u.ProduktId == _ObjProductData.ProduktId).SingleOrDefault();
                if (_ObjCurrentProduct != null)
                {
                    int _CurrentStatus = _ObjCurrentProduct.ButikkStatus;
                    if (_CurrentStatus == 0)
                    {
                        _ObjCurrentProduct.ButikkStatus = 1;
                        _ObjCurrentProduct.LagerDato = null;
                    }
                    if (_CurrentStatus == 1)
                    {
                        _ObjCurrentProduct.ButikkStatus = 2;
                        _ObjCurrentProduct.LagerDato = null;
                    }
                    if (_CurrentStatus == 2)
                    {
                        _ObjCurrentProduct.ButikkStatus = 3;
                    }
                    if (_CurrentStatus == 3)
                    {
                        _ObjCurrentProduct.ButikkStatus = 0;
                        _ObjCurrentProduct.LagerDato = null;
                    }
                    _ReturnCode = 200;
                }
                else
                {
                    _ReturnCode = 404;
                }
            }
            else
            {
                _Return = false;
            }

            // Return
            if (_Return == true)
            {
                _Flib.db.SubmitChanges();
                _ReturnProductCrud.Transfer = _ReturnCode;
            }
            else
            {
                _ReturnProductCrud.Transfer = 500;
            }
            return _ReturnProductCrud;
        }
        private ReturnProductCrudClass readProductKategoriGrid()
        {
            if (_ObjProductGridSettings != null && _ObjProductData != null)
            {
                if (ObjProductGridSettings.SearchClause == "")
                {                    
                    List<ProductKategoriTypeClass> _ListProduktkategori = (from ProductKategoriType in _Flib.db.tblProductCategories
                                                                           where ProductKategoriType.Status == _ObjProductData.Status
                                                                           select new ProductKategoriTypeClass()
                                                                           {
                                                                               ProduktkategoriId = ProductKategoriType.ProduktkategoriId,
                                                                               ProduktkategoriNr = ProductKategoriType.ProduktkategoriNr,
                                                                               Produktkategori = ProductKategoriType.Produktkategori,
                                                                               ProduktkategoriStatus = ProductKategoriType.Status
                                                                           }).OrderBy(_ObjProductGridSettings.OrderByClause).Skip((_ObjProductGridSettings.PageCurrent - 1) * _ObjProductGridSettings.PageSize).Take(_ObjProductGridSettings.PageSize).ToList();

                    _RecordCount = (from ProduktkategoriNr in _Flib.db.tblProductCategories
                                    where ProduktkategoriNr.Status == _ObjProductData.Status
                                    select ProduktkategoriNr).Count();

                    _Pager.PageSize = _ObjProductGridSettings.PageSize;
                    _Pager.PageCount = Convert.ToInt32(Math.Ceiling((Convert.ToDouble(_RecordCount) / Convert.ToDouble(_ObjProductGridSettings.PageSize))));
                    _Pager.RecordCount = _RecordCount;

                    _ReturnProductCrud.ProductKategoriData = _ListProduktkategori;
                    _ReturnProductCrud.PagerInfo = _Pager;
                    _ReturnProductCrud.Transfer = 200;

                }
                else
                {
                    List<ProductKategoriTypeClass> _ListProduktkategori = (from ProductKategoriType in _Flib.db.tblProductCategories
                                                                           where ProductKategoriType.Status == _ObjProductData.Status
                                                                           && ProductKategoriType.Produktkategori.Contains(_ObjProductGridSettings.SearchClause)
                                                                           select new ProductKategoriTypeClass()
                                                                           {
                                                                               ProduktkategoriId = ProductKategoriType.ProduktkategoriId,
                                                                               ProduktkategoriNr = ProductKategoriType.ProduktkategoriNr,
                                                                               Produktkategori = ProductKategoriType.Produktkategori,
                                                                               ProduktkategoriStatus = ProductKategoriType.Status
                                                                           }).OrderBy(_ObjProductGridSettings.OrderByClause).Skip((_ObjProductGridSettings.PageCurrent - 1) * _ObjProductGridSettings.PageSize).Take(_ObjProductGridSettings.PageSize).ToList();

                    _RecordCount = (from ProduktkategoriNr in _Flib.db.tblProductCategories
                                    where ProduktkategoriNr.Status == _ObjProductData.Status
                                    && ProduktkategoriNr.Produktkategori.Contains(_ObjProductGridSettings.SearchClause)
                                    select ProduktkategoriNr).Count();

                    _Pager.PageSize = _ObjProductGridSettings.PageSize;
                    _Pager.PageCount = Convert.ToInt32(Math.Ceiling((Convert.ToDouble(_RecordCount) / Convert.ToDouble(_ObjProductGridSettings.PageSize))));
                    _Pager.RecordCount = _RecordCount;

                    _ReturnProductCrud.ProductKategoriData = _ListProduktkategori;
                    _ReturnProductCrud.PagerInfo = _Pager;
                    _ReturnProductCrud.Transfer = 200;
                }
                   
            }
            else
            {
                _ReturnProductCrud.Transfer = 500;
            }
            return _ReturnProductCrud;
        }
        private ReturnProductCrudClass updateProductCategoryStatus()
        {
            if (_ObjProductData != null && _ObjProductData.ProduktId > 0)
            {
                tblProductCategory _ObjCurrentProductCategory = _Flib.db.tblProductCategories.Where(u => u.ProduktkategoriId == _ObjProductData.ProduktId).SingleOrDefault();
                if (_ObjCurrentProductCategory != null)
                {
                    if (_ObjCurrentProductCategory.Status == 1)
                    {
                        _ObjCurrentProductCategory.Status = 0;
                    }
                    else
                    {
                        _ObjCurrentProductCategory.Status = 1;
                    }
                    _ReturnCode = 200;
                }
                else
                {
                    _ReturnCode = 404;
                }
            }
            else
            {
                _Return = false;
            }

            // Return
            if (_Return == true)
            {
                _Flib.db.SubmitChanges();
                _ReturnProductCrud.Transfer = _ReturnCode;
            }
            else
            {
                _ReturnProductCrud.Transfer = 500;
            }
            return _ReturnProductCrud;
        }
        public ReturnProductCrudClass createProductCategory()
        {
            if (_ObjProductData != null)
            {
                var _objNewProductCategory = new tblProductCategory()
                {
                    ProduktkategoriNr = _ObjProductData.ProduktkategoriNr,
                    Produktkategori = _ObjProductData.Produktkategori,
                    Status = 1
                };
                _Flib.db.tblProductCategories.InsertOnSubmit(_objNewProductCategory);
                _Flib.db.SubmitChanges();
                _ReturnProductCrud.ProductId = _objNewProductCategory.ProduktkategoriId;
                _ReturnProductCrud.Transfer = 200;
            }
            return _ReturnProductCrud;
        }
        private ReturnProductCrudClass deleteProductCategory()
        {
            if (_ObjProductData != null)
            {
                tblProductCategory _ObjCurrentProductCategory = _Flib.db.tblProductCategories.Where(u => u.ProduktkategoriId == _ObjProductData.ProduktId).SingleOrDefault();
                if (_ObjCurrentProductCategory != null)
                {
                    //int _CurrentAddOn = _Flib.db.tblProductAddOns.Where(aou => aou.KnyttetId == _ObjProductData.ProduktId).Count();
                    //int _CurrentFolder = _Flib.db.tblFolders.Where(fu => fu.KnyttetId == _ObjProductData.ProduktId).Count();
                    //int _CurrentProductFile = _Flib.db.tblProdctFiles.Where(pfu => pfu.ProduktId == _ObjProductData.ProduktId).Count();
                    //if (_CurrentAddOn > 0 || _CurrentFolder > 0 || _CurrentProductFile > 0)
                    //if (_CurrentAddOn > 0)
                    //{
                    //    _ReturnCode = 403;
                    //}
                    //else
                    //{
                        _Flib.db.tblProductCategories.DeleteOnSubmit(_ObjCurrentProductCategory);
                        _ReturnCode = 200;
                    //}

                }
                else
                {
                    _ReturnCode = 404;
                }
            }
            else
            {
                _Return = false;
            }
            // Return
            if (_Return == true)
            {
                _Flib.db.SubmitChanges();
                _ReturnProductCrud.Transfer = _ReturnCode;
            }
            else
            {
                _ReturnProductCrud.Transfer = 500;
            }
            return _ReturnProductCrud;
        }
        ////////////////////////////////////////////////////////////////////////////////

        public class ReturnProductCrudClass
        {
            public object Transfer { get; set; }
            public int ProductGruppeId { get; set; }
            public int ProductId { get; set; }
            public int CountAddon { get; set; }
            public List<ProductClass> ProductData { get; set; }
            public PagerClass PagerInfo { get; set; }
            public List<ProductGruppeTypeClass> ProductGruppeData { get; set; }
            public List<ProductKategoriTypeClass> ProductKategoriData { get; set; }


        }

        public class ProductClass
        {            
            public int ProduktId { get; set; }
            public int tilleggid { get; set; }
            public int ProductGruppeId { get; set; }
            public int ProduktkategoriId { get; set; }
            public DateTime? RegDato { get; set; }
            public string Produkt { get; set; }            
            public string Pris { get; set; }
            public int? ProduktNr { get; set; }
            public string ProduktBeskrivelse { get; set; }
            public string Bredde { get; set; }
            public string Hoyde { get; set; }
            public string Dybde { get; set; }
            public string Vekt { get; set; }
            public DateTime? LagerDato { get; set; }
            public int WebStatus { get; set; }
            public int SlideStatus { get; set; }
            public int ButikkStatus { get; set; }
            public int Status { get; set; }           
            public string Produktgruppe { get; set; }
            public string Produktkategori { get; set; }
            public int ProduktkategoriNr { get; set; }
            public List<ProductAddOnsClass> _ProductAddOnsData { get; set; }

        }

        public class ProductAddOnsClass
        {
            public int? TilleggId { get; set; }            
            public string TilleggGruppe { get; set; }
            public string TilleggTekst { get; set; }
        }

    }
}

    