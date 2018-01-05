

namespace Portal.Functions
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Web;
    using Newtonsoft.Json;

    using Models;
    using static Models.Functionlib;

    class SignInClass
    {
        private Functionlib _Flib;
        private SignInRootClass _SignInRootClass;
        private string _Username;
        private string _Password;
        private string _LanguageCode;        
        
        public string Username { get { return this._Username; } set { this._Username = Uri.UnescapeDataString(value); } }
        public string Password { get { return this._Password; } set { this._Password = Uri.UnescapeDataString(value); } }
        public string LanguageCode { get { return this._LanguageCode; } set { this._LanguageCode = value; } }

        public SignInClass()
        {
            _SignInRootClass = new SignInRootClass();            
        }

        public SignInRootClass setSignIn()
        {
            _Flib = new Functionlib("abdb");

            tblUser _ObjUser = _Flib.db.tblUsers.Where(u => u.Brukernavn == _Username && u.Passord == _Password && u.Status == 1).SingleOrDefault();
            if (_ObjUser != null)
            {
                // Update User Language
                if (_LanguageCode != "")
                {
                    var _Language = _Flib.db.tblLanguages.Where(l => l.LanguageCode.ToLower() == LanguageCode.ToLower()).SingleOrDefault();
                    if (_Language != null)
                    {
                        if (_ObjUser.LanguageId != _Language.LanguageId)
                        {
                            _ObjUser.tblLanguage = _Flib.db.tblLanguages.Single(l => l.LanguageId == _Language.LanguageId);
                            _Flib.db.SubmitChanges();
                        }
                    }
                }

                _SignInRootClass.LanguageCode = _ObjUser.tblLanguage.LanguageCode;
                _SignInRootClass.FirstName = _ObjUser.Fornavn;
                _SignInRootClass.LastName = _ObjUser.Etternavn;
                _SignInRootClass.UserId = _ObjUser.BrukerId;
                _SignInRootClass.UserType = _ObjUser.tblUserType.Type;



                return _SignInRootClass;
            }
            else
            {

                return null;
            }
            
        }
        public class SignInRootClass 
        {
            public string Transfer { get; set; }
            public string LanguageCode { get; set; }
            public string UserType { get; set; }
            public string FirstName { get; set; }
            public string LastName { get; set; }
            public int UserId { get; set; }
        }
    }
}

    