
function createErrorLog(SelectedObject)
{
    $.ajaxSetup({ cache: false });
    $.ajax(
    {
        url: "/api/errorlog/errorlog",
        type: "POST",
        dataType: "json",
        data: JSON.stringify(SelectedObject),
        contentType: "application/json; charset=utf-8",
        timeout: 15000
    });
}

function adjustStyle()
{
    var _CurrentCSSFile = $("#size-stylesheet");
    var _CurrentHost = "http://" + location.host;
    if (StyleMode == true)
    {
        if ($("#div-window-size").length == 0)
        {
            $("body").append("<div id=\"div-window-size\" style=\"position: fixed; z-index: 499999; top: 0; left: 0; width: 100%; height: 20px; text-align: center;\"></div>");
        }
    }
    var _WindowWidth = parseInt($(window).width());
    if (_WindowWidth >= 1200)
    {
        if (_CurrentCSSFile[0].href != undefined && _CurrentCSSFile[0].href != "")
        {
            if (_CurrentCSSFile[0].href != _CurrentHost + "/lib/css/admin/lg.css")
            {
                $("#size-stylesheet").attr("href", "/lib/css/admin/lg.css");
            }
        }
        else
        {
            $("#size-stylesheet").attr("href", "/lib/css/admin/lg.css");
        }
        $("#div-window-size").css({ "background-color": "#FF0000" }).text("lg.css");
    }
    else if (_WindowWidth >= 992 && _WindowWidth < 1200)
    {
        if (_CurrentCSSFile[0].href != undefined && _CurrentCSSFile[0].href != "")
        {
            if (_CurrentCSSFile[0].href != _CurrentHost + "/lib/css/admin/md.css")
            {
                $("#size-stylesheet").attr("href", "/lib/css/admin/md.css");
            }
        }
        else
        {
            $("#size-stylesheet").attr("href", "/lib/css/admin/md.css");
        }
        $("#div-window-size").css({ "background-color": "#337ab7" }).text("md.css");
    }
    else if (_WindowWidth >= 768 && _WindowWidth < 991)
    {
        if (_CurrentCSSFile[0].href != undefined && _CurrentCSSFile[0].href != "")
        {
            if (_CurrentCSSFile[0].href != _CurrentHost + "/lib/css/admin/sm.css")
            {
                $("#size-stylesheet").attr("href", "/lib/css/admin/sm.css");
            }
        }
        else
        {
            $("#size-stylesheet").attr("href", "/lib/css/admin/sm.css");
        }
        $("#div-window-size").css({ "background-color": "#f0ad4e" }).text("sm.css");
    }
    else
    {
        if (_CurrentCSSFile[0].href != undefined && _CurrentCSSFile[0].href != "")
        {
            if (_CurrentCSSFile[0].href != _CurrentHost + "/lib/css/admin/xs.css")
            {
                $("#size-stylesheet").attr("href", "/lib/css/admin/xs.css");
            }
        }
        else
        {
            $("#size-stylesheet").attr("href", "/lib/css/admin/xs.css");
        }
        $("#div-window-size").css({ "background-color": "#5cb85c" }).text("xs.css");
    }
}

function setCSSInlineStyle(_SelectedArea)
{
    var _WindowWidth = parseInt($(window).width());
    if (_WindowWidth >= 1200)
    {
        _WindowWidth = "lg";
    }
    else if (_WindowWidth >= 992 && _WindowWidth < 1200)
    {
        _WindowWidth = "md";
    }
    else if (_WindowWidth >= 768 && _WindowWidth < 991)
    {
        _WindowWidth = "sm";
    }
    else
    {
        _WindowWidth = "xs";
    }
    if (_WindowWidth != "")
    {
        var _ClassName = "";
        var _ClassItem = "";
        var _ObjExistsStyle = {};
        var _ObjSetStyle = {};
        if (_SelectedArea != "" && _SelectedArea != undefined && _SelectedArea != null)
        {
            _SelectedArea = $(_SelectedArea);
        }
        else
        {
            _SelectedArea = "";
        }
        $("[class*='fau-']", _SelectedArea).each(function()
        {
            var _Self = $(this);
            _ObjExistsStyle = {};
            _ClassName = "";
            _ClassItem = "";
            if (_Self.attr("style") != "" && _Self.attr("style") != null && _Self.attr("style") != undefined)
            {
                _ClassName = _Self.attr("style").split(";");
                $.each(_ClassName, function(i, value)
                {
                    if (value.indexOf(":") > -1)
                    {
                        _ClassItem = value.split(":");
                        _ObjExistsStyle[_ClassItem[0].replace(/ /g, "")] = _ClassItem[1].replace(/ /g, "");
                    }
                });
            }
            _ClassName = "";
            _ClassItem = "";
            _ObjSetStyle = {};
            _ClassName = (this.className.match(/[\w-]*fau-[\w-.#%]*/g));
            if (_ClassName.length > 0)
            {
                $.each(_ClassName, function(i, _SelectedElement)
                {
                    _ClassItem = _SelectedElement.split("-");
                    if (_ClassItem.length > 3)
                    {
                        if (_ClassItem[1] == _WindowWidth || _ClassItem[1] == "all")
                        {
                            if (_ObjSetStyle.hasOwnProperty(_ClassItem[2]) == false)
                            {
                                if (_ClassItem.length == 4)
                                {
                                    _ObjSetStyle[_ClassItem[2]] = _ClassItem[3];
                                }
                                else if (_ClassItem.length == 5)
                                {
                                    _ObjSetStyle[_ClassItem[2]] = _ClassItem[3] + " " + _ClassItem[4];
                                }
                                else if (_ClassItem.length == 6)
                                {
                                    _ObjSetStyle[_ClassItem[2]] = _ClassItem[3] + " " + _ClassItem[4] + " " + _ClassItem[5];
                                }
                            }
                            else
                            {
                                if (_ClassItem[1] == _WindowWidth)
                                {
                                    if (_ClassItem.length == 4)
                                    {
                                        _ObjSetStyle[_ClassItem[2]] = _ClassItem[3];
                                    }
                                    else if (_ClassItem.length == 5)
                                    {
                                        _ObjSetStyle[_ClassItem[2]] = _ClassItem[3] + " " + _ClassItem[4];
                                    }
                                    else if (_ClassItem.length == 6)
                                    {
                                        _ObjSetStyle[_ClassItem[2]] = _ClassItem[3] + " " + _ClassItem[4] + " " + _ClassItem[5];
                                    }
                                }
                            }
                        }
                    }
                });
            }
            _Self.removeAttr("style");
            _Self.css($.extend(_ObjSetStyle, _ObjExistsStyle))
        });
    }
}

// Errorhandling
function setError(_Action, _ActionPath, _ErrorPage, _ErrorCode, _ErrorText)
{    
	if (_Action == "navigate")
	{
		navigateTo(_ActionPath + "?ErrorPage=" + _ErrorPage + "&ErrorCode=" + _ErrorCode + "&ErrorText=" + _ErrorText, 0);
	}
	else if (_Action == "dialogAlert")
	{
	    $("#modalStandardTitle, #modalStandardText, #modalStandardAdditional").empty();
	    $("#modalStandardTitle").text(SingleDefaultElements.errorDialogAlertTitle + _ErrorCode);
		$("#modalStandardText").html(SingleDefaultElements[_ErrorText + "Error"] + "<br><br>" + AppName + " / " + AppVersion + " / " + AppVersionCode);
		$("#modalStandardAdditional").html(SingleNonLanguageElements.defaultTeamAndLogo);
		$('#modalStandard').modal("show");
	}
	else if (_Action == "getpage")
	{
		ErrorPage = _ErrorPage;
		ErrorCode = _ErrorCode;
		ErrorText = _ErrorText;
		getPage(_ActionPath);
	}
	//if (_ErrorPage.replace(/\//g, '') != "signin")
	//{
	//    var _OutputElements = {};
	//    _OutputElements["TransferType"] = _ErrorText;
	//    _OutputElements["DeviceType"] = "desktop";
	//    _OutputElements["PageName"] = _ErrorPage.replace(/\//g, '');
	//    _OutputElements["Error"] = _ErrorCode;
	//    createErrorLog(_OutputElements);
	//}
}

// Page Language
function loadPageLaguage(Filename)
{
    $.each(Filename, function (Key, Value)
    {
        $.each(Value, function (Key, Value)
        {
            if (Value.length == 2)
            {
                if (Value[0] == "html")
                {
                    $('#' + Key).html('');
                    $('#' + Key).html(Value[1]);
                }
                else if (Value[0] == "text")
                {
                    $('#' + Key).text('');
                    $('#' + Key).text(Value[1]);
                }
                else if (Value[0] == "val")
                {
                    $('#' + Key).val('');
                    $('#' + Key).val(Value[1]);
                }
                else if (Value[0] == "cmdlbl")
                {
                	$('#' + Key).button({ label: "" });
                    $('#' + Key).button({ label: "" + Value[1] + "" });
                }
                else if (Value[0] == "title")
                {
                	$('#' + Key).prop("title", "");
                    $('#' + Key).prop("title", Value[1]);
                }
                else if (Value[0] == "placeholder")
                {
                	$('#' + Key).prop("placeholder", "");
                	$('#' + Key).prop("placeholder", Value[1]);
                }
                else if (Value[0] == "htmlembedded")
                {
                    var _FirstChildElement = $('#' + Key + '>:first');
                    $('#' + Key).html('');
                    $('#' + Key).html(Value[1]);
                    $('#' + Key).prepend(_FirstChildElement);
                }
            }
            else if (Value.length == 3)
            {
                if (Value[0] == "id")
                {
                    if (Value[1] == "html")
                    {
                        $('#' + Key).html('');
                        $('#' + Key).html(Value[2]);
                    }
                    else if (Value[1] == "text")
                    {
                        $('#' + Key).text('');
                        $('#' + Key).text(Value[2]);
                    }
                    else if (Value[1] == "val")
                    {
                        $('#' + Key).val('');
                        $('#' + Key).val(Value[2]);
                    }
                    else if (Value[1] == "cmdlbl")
                    {
                    	$('#' + Key).button({ label: "" });
                        $('#' + Key).button({ label: "" + Value[2] + "" });
                    }
                    else if (Value[1] == "title")
                    {
                    	$('#' + Key).prop("title", "");
                        $('#' + Key).prop("title", Value[2]);
                    }
                    else if (Value[1] == "placeholder")
                    {
                    	$('#' + Key).prop("placeholder", "");
                        $('#' + Key).prop("placeholder", Value[2]);
                    }
                    else if (Value[1] == "htmlembedded")
                    {
                        var _FirstChildElement = $('#' + Key + '>:first');
                        $('#' + Key).html('');
                        $('#' + Key).html(Value[2]);
                        $('#' + Key).prepend(_FirstChildElement);
                    }
                }
                else if (Value[0] == "class")
                {
                    if (Value[1] == "html")
                    {
                        $('.' + Key).html('');
                        $('.' + Key).html(Value[2]);
                    }
                    else if (Value[1] == "text")
                    {
                        $('.' + Key).text('');
                        $('.' + Key).text(Value[2]);
                    }
                    else if (Value[1] == "val")
                    {
                        $('.' + Key).val('');
                        $('.' + Key).val(Value[2]);
                    }
                    else if (Value[1] == "cmdlbl")
                    {
                    	$('.' + Key).button({ label: "" });
                        $('.' + Key).button({ label: "" + Value[2] + "" });
                    }
                    else if (Value[1] == "title")
                    {
                    	$('.' + Key).prop("title", "");
                        $('.' + Key).prop("title", Value[2]);
                    }
                    else if (Value[1] == "placeholder")
                    {
                    	$('.' + Key).prop("placeholder", "");
                        $('.' + Key).prop("placeholder", Value[2]);
                    }
                    else if (Value[1] == "htmlembedded")
                    {
                        var _FirstChildElement = $('.' + Key + '>:first');
                        $('.' + Key).html('');
                        $('.' + Key).html(Value[1]);
                        $('.' + Key).prepend(_FirstChildElement);
                    }
                }
            }
        });
    });
}

// Language
function getLanguage(SelectedPage, Callback)
{
    $.ajaxSetup({ cache: false });
    $.getJSON(SelectedPage)
	.done(function (data)
	{
		ObjPageLanguage = data;
		if (ObjPageLanguage && ObjPageLanguage instanceof Object && isEmpty(ObjPageLanguage) == false)
	    {
	        Callback(200);
	    }
	    else
	    {
	        Callback(400);
	    }
	})
	.fail(function (jqXHR, textStatus, err)
	{
	    Callback(400);
	});
}

function setNonLanguage()
{
    loadPageLaguage(MyDefaultLanguage.ObjNonLanguageElements);
    SingleNonLanguageElements = MyDefaultLanguage.SingleNonLanguageElements;
}

function setDefaultLanguage(SelectedLanguage)
{
    loadPageLaguage(MyDefaultLanguage.ObjDefaultElements[SelectedLanguage]);
    SingleDefaultElements = MyDefaultLanguage.SingleDefaultElements[SelectedLanguage];
}

function setPageLanguage(SelectedLanguage)
{
    loadPageLaguage(ObjPageLanguage.ObjElements[SelectedLanguage]);
    SingleElements = ObjPageLanguage.SingleElements[SelectedLanguage];
    //$('#labelPageTitle').text(SingleElements.labelPageTitle);
    document.title = SingleElements.labelPageTitle;
}

// Menu Content
function setSystemMenu()
{
    if (isEmpty(ObjMainMenu) == false)
    {
        $.each(ObjMainMenu, function(Key, Value)
        {
            $(".menu_" + Key + ", #menu_" + Key).css({ "display": "" + Value + "" });
        });
    }
}

function setContentMenu()
{
    if (isEmpty(ObjContentMenu) == false)
    {
        $.each(ObjContentMenu, function (i, ContentMenu)
        {
            $(".menu_" + ContentMenu.FeatureType + ", #menu_" + ContentMenu.FeatureType).css({ "display": "" + ContentMenu.RoleFeatureStatus + "" });
        });
    }
}

// Navigation
function getPage(SelectedPage)
{
    showBackground();
    $("#page").hide().empty();
    window.setTimeout(function()
    {
        $.ajaxSetup({ cache: false });
        if (SelectedPage == "/admin/products/housekeeping/roomtrading/index.html" && ThisUserTypeGrade.toLowerCase() == "manager")
        {
            SelectedPage = "/admin/products/housekeeping/roomtrading/manager.html";
        }
        $('#page').load(SelectedPage, function (Response, Status, XHR)
        {
            if (XHR.status == 200)
            {
                if (SelectedPage != "/admin/dashboard/index.html")
                {
                    $('#menu_MenuToolbox').css({ "display": "none" });
                    $('#menu_MenuDashboard').css({ "display": "block" });
                }
                else
                {
                    $('#menu_MenuDashboard').css({ "display": "none" });
                }
            	getContentInfo();

                if ((ErrorCode != "" && ErrorCode != undefined && ErrorCode != null) && (ErrorPage != "" && ErrorPage != undefined && ErrorPage != null) && (ErrorText != "" && ErrorText != undefined && ErrorText != null))
                {
                    $("#modalStandardTitle, #modalStandardText, #modalStandardAdditional").empty();
                    $("#modalStandardTitle").text(SingleDefaultElements.errorDialogAlertTitle);
                    $("#modalStandardText").html(SingleDefaultElements[ErrorText + "Error"] + "<br><br>" + AppName + " / " + AppVersion + " / " + AppVersionCode);
                    $("#modalStandardAdditional").html(SingleNonLanguageElements.defaultTeamAndLogo);
                    $('#modalStandard').modal("show");
                    ErrorPage = "";
                    ErrorCode = "";
                    ErrorText = "";
                }
            }
            else
            {
                setError("navigate", "/", ThisPage, "getPage", "SignedOut");
            }
        });
    }, 100);
}

function navigateTo(_SelectedPage, _SelectedTarget)
{
    showLoadboxAndBackground();
    if (_SelectedTarget == 0)
    {
        window.location.href = _SelectedPage;
    }
    else
    {
        window.open(_SelectedPage, _SelectedTarget);
    }
}

function changeInOut(_ElementIn, _ElementOut)
{
	if ($("#" + _ElementIn + "").is(":hidden"))
	{
		$("#" + _ElementIn + "").slideDown("slow");
		$("#" + _ElementOut + "").slideUp("slow");
	}
	else
	{
		$("#" + _ElementIn + "").slideUp("slow");
		$("#" + _ElementOut + "").slideDown("slow");
	}
}

function getURLParameters(sPageURL)
{
    var result = {};
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++)
    {
        var sParameterName = sURLVariables[i].split('=');
        result[sParameterName[0]] = sParameterName[1];
    }
    return result;
}

$.urlParam = function (name)
{
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results == null)
    {
        return null;
    }
    else
    {
        return results[1] || 0;
    }
}

function changeLanguage(SelectedLanguage)
{
    if (SelectedLanguage != ThisLanguage)
    {
        ThisLanguage = SelectedLanguage;
        setDefaultLanguage(ThisLanguage);
        setPageLanguage(ThisLanguage);
    }
}

// Cookies
function setLanguageCookie(SelectedLanguage, Callback)
{
    var _CookieLanguage = getCookie(ThisLocation + "-language");
    if (_CookieLanguage == "" || _CookieLanguage == undefined)
    {
        if (SelectedLanguage == "")
        {
            ThisLanguage = "en-US";
            setCookie(ThisLocation + "-language", ThisLanguage, 365);
        }
        else
        {
            ThisLanguage = SelectedLanguage;
            setCookie(ThisLocation + "-language", ThisLanguage, 365);
        }
    }
    else
    {
        if (SelectedLanguage == "")
        {
            ThisLanguage = _CookieLanguage;
        }
        else
        {
            ThisLanguage = SelectedLanguage;
            setCookie(ThisLocation + "-language", ThisLanguage, 365);
        }
    }
    Callback(ThisLanguage);
}

function setCookie(CName, CValue, ExDays)
{
    var _D = new Date();
    _D.setTime(_D.getTime() + (ExDays * 24 * 60 * 60 * 1000));
    var _Expires = "expires=" + _D.toUTCString();
    document.cookie = CName + "=" + CValue + "; " + _Expires;
}

function getCookie(CName)
{
    var _Name = CName + "=";
    var _CA = document.cookie.split(';');
    for (var i = 0; i < _CA.length; i++)
    {
        var _C = _CA[i];
        while (_C.charAt(0) == ' ') _C = _C.substring(1);
        if (_C.indexOf(_Name) == 0) return _C.substring(_Name.length, _C.length);
    }
    return "";
}

// Dialog
function setDialog()
{
    $("#dialog-modal").dialog
	({
	    autoOpen: false,
	    modal: true,
	    width: 'auto',
	    height: 'auto',
	    resizable: false,
	    draggable: true
	});
}

function setDialogiFrame()
{
    $("#dialog-modal-iframe").dialog
	({
	    autoOpen: false,
	    modal: true,
	    width: 'auto',
	    height: 'auto',
	    resizable: true,
	    draggable: true
	});
}

function closeDialogiFrame()
{
    $("#dialog-modal-iframe").dialog("close");
    $("#iframe-content").attr('src', '');
}

function dialogAlert(SelectedTitle, SelectedAlert)
{
    closeDialog();
    $("#dialog-message").remove();
    $("body").append("<div id=\"dialog-message\"><p>" + SelectedAlert + "</p></div>");
    var _SelectedWidth = 320;
    if (SelectedTitle != "" && SelectedTitle != undefined)
    {
        var _WindowWidth = $(window).width();
        var _SelectedTitleLength = SelectedTitle.length;
        if (_SelectedTitleLength != "" && _SelectedTitleLength != null && _SelectedTitleLength != undefined)
        {
            _SelectedWidth = _SelectedTitleLength * 11.5
            if (_SelectedWidth < 320)
            {
                _SelectedWidth = 320;
            }
            if (_SelectedWidth > _WindowWidth)
            {
                _SelectedWidth = _WindowWidth - 20;
            }
        }
    }
    $("#dialog-message").dialog(
	{
	    title: SelectedTitle,
	    modal: true,
	    width: _SelectedWidth,
	    resizable: false,
	    buttons:
		{
		    Ok: function ()
		    {
		        $(this).dialog("close");
		    }
		}
	});
    $("#dialog-message").dialog("open");
}

function dialogConfirm(SelectedTitle, SelectedAlert, SelectedButton1, SelectedButton2, callback, SelectedId)
{
    closeDialog();
    $("#dialog-confirm").remove();
    $("body").append("<div id=\"dialog-confirm\"><p>" + SelectedAlert + "</p></div>");
    var _SelectedWidth = 320;
    if (SelectedTitle != "" && SelectedTitle != undefined)
    {
        var _WindowWidth = $(window).width();
        var _SelectedTitleLength = SelectedTitle.length;
        if (_SelectedTitleLength != "" && _SelectedTitleLength != null && _SelectedTitleLength != undefined)
        {
            _SelectedWidth = _SelectedTitleLength * 11.5
            if (_SelectedWidth < 320)
            {
                _SelectedWidth = 320;
            }
            if (_SelectedWidth > _WindowWidth)
            {
                _SelectedWidth = _WindowWidth - 20;
            }
        }
    }
    $("#dialog-confirm").dialog(
	{
	    title: SelectedTitle,
	    modal: true,
	    width: _SelectedWidth,
	    resizable: false,
	    buttons:
		[
			{
			    text: SelectedButton1,
			    click: function ()
			    {
			        callback(SelectedId);
			    }
			},
			{
			    text: SelectedButton2,
			    click: function ()
			    {
			        $(this).dialog("close");
			    }
			}
		]
	});
    $("#dialog-confirm").dialog("open");
}

function closeDialog()
{
    if ($("#dialog-message").length > 0)
    {
        $("#dialog-message").dialog("close");
    }
    if ($("#dialog-confirm").length > 0)
    {
        $("#dialog-confirm").dialog("close");
    }
}

// Modal Help
function modalHelp(SelectedPage)
{
    $("#modalStandardTitle, #modalStandardText, #modalStandardAdditional").empty();
    var _ModalHelpAdditional = $("#modalHelpAdditional").html();
    if (_ModalHelpAdditional != "" && _ModalHelpAdditional != null && _ModalHelpAdditional != undefined)
    {
        $("#modalStandardText").html(SingleElements[SelectedPage + "-text"] + _ModalHelpAdditional);
        if (typeof modalHelpAdditional == "function")
        {
            modalHelpAdditional();
        }
    }
    else
    {
        $("#modalStandardText").html(SingleElements[SelectedPage + "-text"]);
    }
    $("#modalStandardTitle").text(SingleElements[SelectedPage + "-title"]);
    $("#modalStandardAdditional").html(SingleNonLanguageElements.defaultTeamAndLogo);
    $('#modalStandard').modal("show");
}

function modalStandardAlert(SelectedTitle, SelectedAlert)
{
    $("#modalStandardTitle, #modalStandardText, #modalStandardAdditional").empty();
    $("#modalStandardTitle").text(SelectedTitle);
    $("#modalStandardText").html(SelectedAlert);
    $('#modalStandard').modal("show");
    setCSSInlineStyle("#modalStandard");
}

function modalStandardConfirm(SelectedTitle, SelectedAlert, SelectedButton1, SelectedButton2, callback, SelectedId)
{
    var _HTML = "";
    _HTML = '<div class="row fau-all-marginTop-14px">';
    _HTML += '<div class="col-sm-6">';
    _HTML += '<button type="button" class="btn btn-shadow btn-danger btn-xs btn-block" data-dismiss="modal"><i class="fa fa-times fa-lg fa-fw pull-left fau-all-marginTop-3px"></i>' + SelectedButton2 + '</button>';
    _HTML += '</div>';
    _HTML += '<div class="col-sm-6">';
    _HTML += '<button type="button" class="btn btn-shadow btn-success btn-xs btn-block" id="cmdModalStandardConfirm"><i class="fa fa-chevron-down fa-lg fa-fw pull-left fau-all-marginTop-3px"></i>' + SelectedButton1 + '</button>';
    _HTML += '</div>';
    _HTML += '</div>';

    $("#modalStandardTitle, #modalStandardText, #modalStandardAdditional").empty();
    $("#modalStandardTitle").text(SelectedTitle);
    $("#modalStandardText").html(SelectedAlert);
    $("#modalStandardAdditional").html(_HTML);
    $('#modalStandard').modal("show");
    setCSSInlineStyle("#modalStandard");
    $("#cmdModalStandardConfirm").off().on('click', function ()
    {
        $('#modalStandard').modal("hide");
        callback(SelectedId);
    });
}

// Topslider Message
function setTopsliderMessage(SelectedContent, SelectedSec)
{
    //if ($("#topslider_message", window.parent.document).length == 0)
    //{
    //    var _ThisTopslider = "";
    //    clearTimeout(TopSliderInterval);
    //    TopSliderInterval = 0;
    //    if (SelectedSec != 0)
    //    {
    //        $("body", window.parent.document).append("<div id=\"topslider_message\"><span></span></div>");
    //        _ThisTopslider = $("#topslider_message", window.parent.document);
    //        $("span", _ThisTopslider).text(SelectedContent);
    //        $(_ThisTopslider).fadeIn("200");
    //        TopSliderInterval = window.setTimeout(function ()
    //        {
    //            clearTimeout(TopSliderInterval);
    //            TopSliderInterval = 0;
    //            removeTopsliderMessage();
    //        }, SelectedSec);
    //    }
    //    else
    //    {
    //        $("body", window.parent.document).append("<div id=\"topslider_message\"><span></span></div>");
    //        _ThisTopslider = $("#topslider_message", window.parent.document);
    //        $("span", _ThisTopslider).text(SelectedContent);
    //        $(_ThisTopslider).fadeIn("200");
    //    }
    //}
}

function removeTopsliderMessage()
{
    if ($("#topslider_message", window.parent.document).length > 0 && TopSliderInterval == 0)
    {
        var _ThisTopslider = "";
        _ThisTopslider = $("#topslider_message", window.parent.document);
        $("span", _ThisTopslider).text('');
        $(_ThisTopslider).remove();
    }
}

// LoadBox And Background 
function showLoadboxAndBackground()
{
    $("#background-light").remove();
    $("#load-box-light").remove();
    if ($('#background').length == 0)
    {
        closeDialog();
        clearInterval(ShowLoadBoxInterval);
        ShowLoadBoxInterval = 0;
        ArrayPageSize = new Array($(window).width(), $(window).height(), $(window).scrollTop(), $(window).scrollLeft())
        if (ArrayPageSize != "")
        {
            clearInterval(ShowLoadBoxInterval);
            ShowLoadBoxInterval = 0;
            var _WindowWidth = ArrayPageSize[0];
            var _WindowHeight = ArrayPageSize[1];
            var _WindowScrollTop = ArrayPageSize[2];
            var _WindowScrollLeft = ArrayPageSize[3];
            var _BackgroundHeight = "";
            var _LoaderTop = "";
            var _LoaderLeft = "";
            if (_WindowScrollTop > 0)
            {
                _LoaderTop = _WindowHeight / 2 + _WindowScrollTop - 64;
                _BackgroundHeight = _WindowHeight + _WindowScrollTop;
            }
            else
            {
                _LoaderTop = _WindowHeight / 2 - 64;
                _BackgroundHeight = _WindowHeight;
            }
            if (_WindowScrollLeft > 0)
            {
                _LoaderLeft = _WindowWidth / 2 + _WindowScrollLeft - 64;
            }
            else
            {
                _LoaderLeft = _WindowWidth / 2 - 64;
            }
            $("body").append("<div id=\"background\"></div>");
            $("#background").css({ "width": "" + _WindowWidth + "px", "height": "" + _BackgroundHeight + "px" });
            $("#background").append("<img border=\"0px\" id=\"load_box\" src=\"/lib/icons/ajax_loader.gif\" width=\"124px\" height=\"128px\">");
            $("#load_box").css({ "left": "" + _LoaderLeft + "px", "top": "" + _LoaderTop + "px" });
            $("#background").css({ "display": "block" });
            $("#load_box").css({ "display": "block" });
        }
        else
        {
            ShowLoadBoxInterval = setInterval(showLoadboxAndBackground, 100);
        }
    }
}

function hideLoadboxAndBackground()
{
    $("#background").remove();
    $("#load_box").remove();
}

// Background 
function showBackground()
{
    $("#background").remove();
    $("#load-box").remove();
    if ($('#background-light').length == 0)
    {
        var _ShowBackground = 0;
        ArrayPageSize = new Array($(window).width(), $(window).height(), $(window).scrollTop(), $(window).scrollLeft())
        if (ArrayPageSize != "")
        {
            clearInterval(_ShowBackground);
            var _WindowWidth = ArrayPageSize[0];
            var _WindowHeight = ArrayPageSize[1];
            var _WindowScrollTop = ArrayPageSize[2];
            var _WindowScrollLeft = ArrayPageSize[3];
            var _BackgroundHeight = "";
            var _LoaderTop = "";
            var _LoaderLeft = "";
            if (_WindowScrollTop > 0)
            {
                _LoaderTop = _WindowHeight / 2 + _WindowScrollTop - 27;
                _BackgroundHeight = _WindowHeight + _WindowScrollTop;
            }
            else
            {
                _LoaderTop = _WindowHeight / 2 - 27;
                _BackgroundHeight = _WindowHeight;
            }
            if (_WindowScrollLeft > 0)
            {
                _LoaderLeft = _WindowWidth / 2 + _WindowScrollLeft - 27;
            }
            else
            {
                _LoaderLeft = _WindowWidth / 2 - 27;
            }
            $("body").append("<div id=\"background-light\"></div>");
            $("#background-light").css({ "width": "" + _WindowWidth + "px", "height": "" + _BackgroundHeight + "px" });
            $("#background-light").append("<img border=\"0px\" id=\"load-box-light\" src=\"/lib/icons/smaal_ajax-loader.gif\" width=\"54px\" height=\"55px\">");
            $("#load-box-light").css({ "left": "" + _LoaderLeft + "px", "top": "" + _LoaderTop + "px" });
            $("#background-light").css({ "display": "block" });
            $("#load-box-light").css({ "display": "block" });
        }
        else
        {
            _ShowBackground = setInterval(showBackground, 100);
        }
    }
}

function hideBackground()
{
    $("#background-light").remove();
    $("#load-box-light").remove();
}

// Set TableSorter Mouese Over
function setTableSorterMouseOver(SelectedVisibility)
{
    if (SelectedVisibility != undefined)
    {
        var _ThisButton = "";
    }
    $(".tablesorter_tr:odd").css({ "background-color": "#FFFFFF" });
    $(".tablesorter_tr:even").css({ "background-color": "#F5F5F5" });
    $(".tablesorter_tr:odd").mouseover(function()
    {
        $(this).css({ "background-color": "#DDDDDD" });
        if (SelectedVisibility != undefined)
        {
            _ThisButton = $(this).find(".btn");
            $(_ThisButton).css({ "visibility": "visible" });
        }
    });
    $(".tablesorter_tr:even").mouseover(function()
    {
        $(this).css({ "background-color": "#DDDDDD" });
        if (SelectedVisibility != undefined)
        {
            _ThisButton = $(this).find(".btn");
            $(_ThisButton).css({ "visibility": "visible" });
        }
    });
    $(".tablesorter_tr:odd").mouseout(function()
    {
        $(this).css({ "background-color": "#FFFFFF", "color": "#000000" });
        if (SelectedVisibility != undefined)
        {
            _ThisButton = $(this).find(".btn");
            $(_ThisButton).css({ "visibility": "hidden" });
        }
    });
    $(".tablesorter_tr:even").mouseout(function()
    {
        $(this).css({ "background-color": "#F5F5F5", "color": "#000000" });
        if (SelectedVisibility != undefined)
        {
            _ThisButton = $(this).find(".btn");
            $(_ThisButton).css({ "visibility": "hidden" });
        }
    });
}

// Grid functions
function setGridFunctions(SelectedArea)
{
    if (SelectedArea != "" && SelectedArea != undefined && SelectedArea != null)
    {
        SelectedArea = $(SelectedArea);
    }
    else
    {
        SelectedArea = "";
    }
    $(":input", SelectedArea).each(function()
	{
		if ($(this).is("button"))
		{
			if ($(this).hasClass("firstgridpage") || $(this).hasClass("previousgridpage") || $(this).hasClass("nextgridpage") || $(this).hasClass("lastgridpage"))
			{
				$(this).off().on('click', function()
				{
				    changeGridPage(this.id, SelectedArea);
				});
			}
		}
	});
    var thisElementClass;
    $(".header", SelectedArea).each(function()
    {
        $(this).off().on('click', function ()
        {
            if ($(this).hasClass("headerSortAsc"))
            {
                thisElementClass = "headerSortDesc";
                ObjPageData.OrderByClause = $(this).attr("data-attr") + " DESC"
            }
            else if ($(this).hasClass("headerSortDesc"))
            {
                thisElementClass = "headerSortAsc";
                ObjPageData.OrderByClause = $(this).attr("data-attr") + " ASC"
            }
            else
            {
                thisElementClass = "headerSortAsc";
                ObjPageData.OrderByClause = $(this).attr("data-attr") + " ASC"
            }
            $(".header").each(function ()
            {
                $(this).removeClass("headerSortAsc");
                $(this).removeClass("headerSortDesc");
            });
            showBackground();
            $(this).addClass(thisElementClass);
            ObjPageData.PageCurrent = 1;
            ObjPageData.PageSize = $("#GridPageSize").val();
            getContentData();
        });
	});
    $("#GridPageSize", SelectedArea).off().on('change', function ()
    {
        showBackground();
        ObjPageData.PageCurrent = 1;
        ObjPageData.PageSize = this.value;
        getContentData();
	});
    $("#SearchText", SelectedArea).off().on('keyup', function ()
	{
		searchGridContent(this.value);
	});
}

function changeGridPage(SelectedPage, SelectedArea)
{
    if (SelectedPage == "cmdFirstGridPage")
    {
        if (PageCurrent == 1)
        {
            return false;
        }
        ObjPageData.PageCurrent = 1;
    }
    else if (SelectedPage == "cmdPreviousGridPage")
    {
        if (PageCurrent == 1)
        {
            return false;
        }
        ObjPageData.PageCurrent = (parseInt(PageCurrent) - 1);
    }
    else if (SelectedPage == "cmdNextGridPage")
    {
        if (PageCurrent == PageCount)
        {
            return false;
        }
        ObjPageData.PageCurrent = (parseInt(PageCurrent) + 1);
    }
    else if (SelectedPage == "cmdLastGridPage")
    {
        if (PageCurrent == PageCount)
        {
            return false;
        }
        ObjPageData.PageCurrent = PageCount;
    }
    showBackground();
    ObjPageData.PageSize = $("#GridPageSize", SelectedArea).val();
    getContentData();
}

var SearchGridContentTimer = 0;
function searchGridContent(SearchText)
{
    if (SearchText.length > 1)
    {
        clearTimeout(SearchGridContentTimer);
        SearchGridContentTimer = window.setTimeout(function ()
        {
            ObjPageData.PageCurrent = 1;
            ObjPageData.PageSize = 10;
            ObjPageData.SearchClause = SearchText;
            getContentData();
        }, 200);
    }
    else if (SearchText.length == 0)
    {
        ObjPageData.PageCurrent = 1;
        ObjPageData.PageSize = 10;
        ObjPageData.SearchClause = "";
        getContentData();
    }
    if (typeof setSearchGrid == 'function')
    {
        setSearchGrid();
    }
}

function getSelectedObj(_SelectedObj, _SelectedKey, _SelectedVal)
{
    var _ThisReturn = "";
    $.each(_SelectedObj, function(i, _Selected)
    {
        $.each(_Selected, function(_Key, _Value)
        {
            if (_SelectedKey.toString().toLowerCase() == _Key.toString().toLowerCase() && _SelectedVal.toString().toLowerCase() == _Value.toString().toLowerCase())
            {
                _ThisReturn = _Selected;
                return false;
            }
        });
    });
    return _ThisReturn;
}

function removeSelectedObj(_SelectedObj, _SelectedKey)
{
    $.each(_SelectedObj, function(i, Selected)
    {
        if (_SelectedObj[i].UserId.toString().toLowerCase() == _SelectedKey.toString().toLowerCase())
        {
            _SelectedObj.splice(i, 1);
            return false;
        }
    });
}

function formatDateTime(SelectedDateTime, FormatType)
{
    if (moment(SelectedDateTime).isValid() == true)
    {
        return moment(SelectedDateTime).format(FormatType);
    }
    else
    {
        return "";
    }
}

function formatTime(SelectedTime)
{
    if (SelectedTime != "" && SelectedTime != null && SelectedTime != undefined)
    {
        return SelectedTime;
    }
    else
    {
        return "";
    }
}

function isEmpty(SelectedObj)
{
    if (SelectedObj instanceof Object)
    {
        if (SelectedObj == null)
        {
            return true;
        }
        for (var key in SelectedObj)
        {
            if (SelectedObj.hasOwnProperty(key))
            {
                return false;
            }
        }
        return true;
    }
    else
    {
        return true;
    }
}

function isFunction(functionToCheck)
{
    var getType = {};
    return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
}

function getEntitiesAddOnDataIcon(SelectedEntitiesAddOn, SelectedWorkOrderPriorityId)
{
    var _HTML = "";
    if (SelectedEntitiesAddOn.GuestStaying.toString().toLowerCase() == "block")
    {
        _HTML += '<td><span class="glyphicons glyphicons-person x2 fau-all-color-#5cb85c fau-all-margin-2px"></span></td>';
    }
    if (SelectedEntitiesAddOn.GuestDueIn.toString().toLowerCase() == "block")
    {
        _HTML += '<td><span class="glyphicons glyphicons-traveler x2 fau-all-color-#337ab7 fau-all-margin-2px"></span></td>';
    }
    if (SelectedEntitiesAddOn.GuestDueOut.toString().toLowerCase() == "block")
    {
        _HTML += '<td><span class="glyphicons glyphicons-traveler flip x2 pulse fau-all-color-#d9534f fau-all-margin-2px"></span></td>';
    }
    if (SelectedEntitiesAddOn.DoubleQueen.toString().toLowerCase() == "block")
    {
        _HTML += '<td><span class="glyphicons glyphicons-bed x2 fau-all-color-#f0ad4e fau-all-margin-2px"></span></td>';
    }
    if (SelectedEntitiesAddOn.NumberOfUsers.toString().toLowerCase() == "block")
    {
        _HTML += '<td><span class="glyphicons glyphicons-parents x2 fau-all-color-#337ab7 fau-all-margin-2px"></span></td>';
    }
    if (SelectedEntitiesAddOn.CleanedEntity.toString().toLowerCase() == "block")
    {
        _HTML += '<td><span class="glyphicons glyphicons-cleaning x2 fau-all-color-#337ab7 fau-all-margin-2px"></span></td>';
    }
    if (SelectedEntitiesAddOn.TradedEntity.toString().toLowerCase() == "block")
    {
        _HTML += '<td><i class="fa fa-exchange fa-fw fau-all-color-#d9534f fau-all-margin-2px"></i></td>';
    }
    if (SelectedEntitiesAddOn.Comment.toString().toLowerCase() == "block")
    {
        _HTML += '<td><span class="glyphicons glyphicons-comments x2 fau-all-color-#5cb85c fau-all-margin-2px"></span></td>';
    }
    if (SelectedWorkOrderPriorityId != 0 && SelectedWorkOrderPriorityId != null)
    {
        _HTML += '<td><span class="glyphicons glyphicons-exclamation-sign x2 fau-all-color-#d9534f fau-all-margin-2px"></span></td>';
    }
    return _HTML;
}

function getRoomTradingCleanerIcons(SelectedType)
{
    var validTypes =
	{
	    'Cleaner To Cleaner Traded From': '<span class="levo2-gra levo2-x2 fau-all-color-#337ab7"></span><span class="glyphicons glyphicons-arrow-left x2 fau-all-color-#337ab7"></span><span class="levo2-gra levo2-x2 fau-all-color-#337ab7"></span>',
	    'Cleaner To Cleaner Traded To': '<span class="levo2-gra levo2-x2 fau-all-color-#337ab7"></span><span class="glyphicons glyphicons-arrow-right x2 fau-all-color-#337ab7"></span><span class="levo2-gra levo2-x2 fau-all-color-#337ab7"></span>',
	    'Cleaner To MyOpen Traded From': '<span class="levo2-gra levo2-x2 fau-all-color-#337ab7"></span><span class="glyphicons glyphicons-arrow-left x2 fau-all-color-#337ab7"></span><span class="glyphicons glyphicons-heart x2 fau-all-color-#337ab7"></span>',
	    'Cleaner To MyOpen Traded To': '<span class="levo2-gra levo2-x2 fau-all-color-#337ab7"></span><span class="glyphicons glyphicons-arrow-right x2 fau-all-color-#337ab7"></span><span class="glyphicons glyphicons-heart x2 fau-all-color-#337ab7"></span>',
	    'Cleaner To CommonOpen Traded From': '<span class="levo2-gra levo2-x2 fau-all-color-#337ab7"></span><span class="glyphicons glyphicons-arrow-left x2 fau-all-color-#337ab7"></span><span class="glyphicons glyphicons-global x2 fau-all-color-#337ab7"></span>',
	    'Cleaner To CommonOpen Traded To': '<span class="levo2-gra levo2-x2 fau-all-color-#337ab7"></span><span class="glyphicons glyphicons-arrow-right x2 fau-all-color-#337ab7"></span><span class="glyphicons glyphicons-global x2 fau-all-color-#337ab7"></span>',
	    'MyOpen To Cleaner Traded From': '<span class="levo2-gra levo2-x2 fau-all-color-#337ab7"></span><span class="glyphicons glyphicons-arrow-left x2 fau-all-color-#337ab7"></span><span class="glyphicons glyphicons-heart x2 fau-all-color-#337ab7"></span>',
	    'MyOpen To Cleaner Traded To': '<span class="levo2-gra levo2-x2 fau-all-color-#337ab7"></span><span class="glyphicons glyphicons-arrow-right x2 fau-all-color-#337ab7"></span><span class="glyphicons glyphicons-heart x2 fau-all-color-#337ab7"></span>',
	    'CommonOpen To Cleaner Traded From': '<span class="levo2-gra levo2-x2 fau-all-color-#337ab7"></span><span class="glyphicons glyphicons-arrow-left x2 fau-all-color-#337ab7"></span><span class="glyphicons glyphicons-global x2 fau-all-color-#337ab7"></span>',
	    'CommonOpen To Cleaner Traded To': '<span class="levo2-gra levo2-x2 fau-all-color-#337ab7"></span><span class="glyphicons glyphicons-arrow-right x2 fau-all-color-#337ab7"></span><span class="glyphicons glyphicons-global x2 fau-all-color-#337ab7"></span>',
	    'MyOpen To CommonOpen Traded From': '<span class="glyphicons glyphicons-heart x2 fau-all-color-#337ab7"></span><span class="glyphicons glyphicons-arrow-left x2 fau-all-color-#337ab7"></span><span class="glyphicons glyphicons-global x2 fau-all-color-#337ab7"></span>',
	    'MyOpen To CommonOpen Traded To': '<span class="glyphicons glyphicons-heart x2 fau-all-color-#337ab7"></span><span class="glyphicons glyphicons-arrow-right x2 fau-all-color-#337ab7"></span><span class="glyphicons glyphicons-global x2 fau-all-color-#337ab7"></span>',
	}
    return validTypes[SelectedType];
}

function getRoomTradingLogIcons(SelectedType)
{
    var validTypes =
	{
	    'Cleaner To Cleaner': '<span class="levo2-gra levo2-x2 fau-all-color-#337ab7"></span><span class="glyphicons glyphicons-arrow-right x2 fau-all-color-#337ab7"></span><span class="levo2-gra levo2-x2 fau-all-color-#337ab7"></span>',
	    'Cleaner To MyOpen': '<span class="levo2-gra levo2-x2 fau-all-color-#337ab7"></span><span class="glyphicons glyphicons-arrow-right x2 fau-all-color-#337ab7"></span><span class="glyphicons glyphicons-heart x2 fau-all-color-#337ab7"></span>',
	    'Cleaner To CommonOpen': '<span class="levo2-gra levo2-x2 fau-all-color-#337ab7"></span><span class="glyphicons glyphicons-arrow-right x2 fau-all-color-#337ab7"></span><span class="glyphicons glyphicons-global x2 fau-all-color-#337ab7"></span>',
	    'MyOpen To Cleaner': '<span class="glyphicons glyphicons-heart x2 fau-all-color-#337ab7"></span><span class="glyphicons glyphicons-arrow-right x2 fau-all-color-#337ab7"></span><span class="levo2-gra levo2-x2 fau-all-color-#337ab7"></span>',
	    'CommonOpen To Cleaner': '<span class="glyphicons glyphicons-global x2 fau-all-color-#337ab7"></span><span class="glyphicons glyphicons-arrow-right x2 fau-all-color-#337ab7"></span><span class="levo2-gra levo2-x2 fau-all-color-#337ab7"></span>',
	    'MyOpen To CommonOpen': '<span class="glyphicons glyphicons-heart x2 fau-all-color-#337ab7"></span><span class="glyphicons glyphicons-arrow-right x2 fau-all-color-#337ab7"></span><span class="glyphicons glyphicons-global x2 fau-all-color-#337ab7"></span>',
	}
    return validTypes[SelectedType];
}

function getContentMenu()
{
    var _ListProducts = [];
    $.each(ObjContentMenu, function(i, ContentMenu)
    {
        if (ContentMenu.FeatureType == "ProductsHousekeepingRoomInspection" || ContentMenu.FeatureType == "ProductsHousekeepingRoomCleaning" || ContentMenu.FeatureType == "ProductsHousekeepingRoomTrading" || ContentMenu.FeatureType == "ProductsHousekeepingRoomUtilityInspection")
        {
            _ListProducts.push(
            {
                ProductId: ContentMenu.ProductId,
                FeatureType: ContentMenu.FeatureType
            });
        }
        if (ContentMenu.FeatureType == "ProductsHousekeepingRoomInspection")
        {
            HousekeepingRoomInspection = true;
        }
        if (ContentMenu.FeatureType == "ProductsHousekeepingRoomCleaning")
        {
            HousekeepingRoomCleaning = true;
        }
        if (ContentMenu.FeatureType == "ProductsHousekeepingRoomTrading")
        {
            HousekeepingRoomTrading = true;
        }
        if (ContentMenu.FeatureType == "ProductsHousekeepingRoomUtilityInspection")
        {
            HousekeepingRoomUtilityInspection = true;
        }
    });
    return _ListProducts;
}
