
//*********************************
// Form Stylig / Validation Functions
//*********************************

function getValidation(SelectedPage, Callback)
{
    $.ajaxSetup({ cache: false });
    $.getJSON(SelectedPage)
	.done(function(data)
	{
	    JSONValidation = data;
	    Callback(200);
	})
	.fail(function(jqXHR, textStatus, err)
	{
	    Callback(400);
	});
}

function setValidation(SelectedArea)
{
    if (SelectedArea != "" && SelectedArea != undefined && SelectedArea != null)
    {
        SelectedArea = $(SelectedArea);
    }
    else
    {
        SelectedArea = "";
    }
	if (JSONValidation && JSONValidation instanceof Object && JSONValidation != null)
    {
        $.each(JSONValidation, function(i, e)
        {
            $("." + i).each(function(i, el)
            {
                if (el.id)
                {
                    if (JSONValidation.hasOwnProperty(el.id) == false)
                    {
                        JSONValidation[el.id] = e;
                    }
                }
            });
        });
	    $.each(JSONValidation, function(HTMLElement, JSONSubValidation)
	    {
	        $.each(JSONSubValidation, function(AttrType, AttrValue)
	        {
	            if (AttrType == "label")
	            {
	                $("label[for='" + HTMLElement + "']", SelectedArea).addClass(AttrValue);
	            }
	            else if (AttrType == "data-attr" || AttrType == "minlength" || AttrType == "maxlength")
	            {
	                if ($('#' + HTMLElement, SelectedArea).length > 0)
	                {
	                    $('#' + HTMLElement, SelectedArea).attr(AttrType, AttrValue);
	                }
	                if ($('.' + HTMLElement, SelectedArea).length > 0)
	                {
	                    $('.' + HTMLElement, SelectedArea).attr(AttrType, AttrValue);
	                }
	            }
	            else if (AttrType == "class")
	            {
	                if ($('#' + HTMLElement, SelectedArea).length > 0)
	                {
	                    $('#' + HTMLElement, SelectedArea).addClass(AttrValue);
	                }
	                if ($('.' + HTMLElement, SelectedArea).length > 0)
	                {
	                    $('.' + HTMLElement, SelectedArea).addClass(AttrValue);
	                }
	            }
	        });
	    });
	}
}

function getValidType(SelectedType)
{
    var validTypes =
	{
	    "validate-alpha": "1234567890abcdefghijklmnopqrstuvwxyzæøå!@#%&()<>?*+-_,;.:/\u0020\u0027\u000a",
	    "validate-numeric": "1234567890\u0020",
	    "validate-email": "1234567890abcdefghijklmnopqrstuvwxyz-_.@",
	    "validate-web": "1234567890abcdefghijklmnopqrstuvwxyz-_.:/",
	    "validate-userpass": "1234567890abcdefghijklmnopqrstuvwxyz-_.@",
	    "validate-date": "1234567890./",
	    "validate-time": "1234567890:"
	}
    return validTypes[SelectedType];
}

function getValidMask(SelectedMask)
{
    var validMasks =
	{
	    "mask-phone-en-US": ["(999) 999 9999", "(___) ___ ____"],
	    "mask-phone-nb-NO": ["99 99 99 99", "__ __ __ __"],
	    "mask-phone-countrycode-en-US": ["+99 (999) 999 9999", "+__ (___) ___ ____"],
	    "mask-phone-countrycode-nb-NO": ["+99 99 99 99 99", "+__ __ __ __ __"],
	    "mask-mobilephone-en-US": ["(999) 999 9999", "(___) ___ ____"],
	    "mask-mobilephone-nb-NO": ["999 99 999", "___ __ ___"],
	    "mask-mobilephone-countrycode-en-US": ["+99 (999) 999 9999", "+__ (___) ___ ____"],
	    "mask-mobilephone-countrycode-nb-NO": ["+99 999 99 999", "+__ ___ __ ___"],
	    "mask-date-en-US": ["99/99/9999", "mm/dd/yyyy"],
	    "mask-date-nb-NO": ["99.99.9999", "dd/mm/åååå"]
	}
    return validMasks[SelectedMask];
}

function FormStyle(SelectedArea, SelectedFocusElement)
{
    var _ElementClass = "";
    var _MaskClass = "";
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
        if ($(this).is("[type='text'], [type='password'], [type='datetime'], [type='datetime-local'], [type='date'], [type='month'], [type='time'], [type='week'], [type='number'], [type='email'], [type='url'], [type='search'], [type='tel'], [type='color']"))
        {
            $(this).attr("autocomplete", "off");
            if ($(this).hasClass("validate"))
            {
                $(this).keyup(function(e)
                {
                    validateDirty();
                });
            }
            _ElementClass = "";
            _ElementClass = $(this).attr("class").match(/[\w-]*validate-[\w-]*/g);
            if (_ElementClass != null)
            {
                $(this).keypress(function()
                {
                    validateInput(event, $(this).attr("class").match(/[\w-]*validate-[\w-]*/g), SelectedArea);
                });
            }
            _ElementClass = "";
            _MaskClass = "";
            _ElementClass = $(this).attr("class").match(/[\w-]*mask-[\w-]*/g);
            if (_ElementClass != null)
            {
                _MaskClass = getValidMask($(this).attr("class").match(/[\w-]*mask-[\w-]*/g) + "-" + ThisLanguage)
                if (_MaskClass == "" || _MaskClass == null || _MaskClass == undefined)
                {
                    _MaskClass = getValidMask($(this).attr("class").match(/[\w-]*mask-[\w-]*/g))
                    if (_MaskClass != "" && _MaskClass != null && _MaskClass != undefined)
                    {
                        $(this).mask(getValidMask($(this).attr("class").match(/[\w-]*mask-[\w-]*/g))[0], { placeholder: getValidMask($(this).attr("class").match(/[\w-]*mask-[\w-]*/g))[1] });
                    }
                }
                else
                {
                    $(this).mask(getValidMask($(this).attr("class").match(/[\w-]*mask-[\w-]*/g) + "-" + ThisLanguage)[0], { placeholder: getValidMask($(this).attr("class").match(/[\w-]*mask-[\w-]*/g) + "-" + ThisLanguage)[1] });
                }
            }
            if ($(this).hasClass("forceuppercase"))
            {
                $(this).focusout(function(e)
                {
                    $(this).val($(this).val().toUpperCase());
                });
            }
            if ($(this).hasClass("forcelowercase"))
            {
                $(this).focusout(function(e)
                {
                    $(this).val($(this).val().toLowerCase());
                });
            }
            if ($(this).hasClass("donotpaste"))
            {
                $(this).keydown(function(e)
                {
                    if (e.ctrlKey == true && (e.which == 118 || e.which == 86))
                    {
                        e.preventDefault();
                    }
                });
            }
            if ($(this).hasClass("notenter"))
            {
                $(this).keypress(function(e)
                {
                    if ((e.keyCode || e.which) == 13)
                    {
                        e.preventDefault();
                    }
                });
            }
            if ($(this).hasClass("readonly"))
            {
                $(this).prop("readOnly", true);
            }
            if ($(this).hasClass("disabled"))
            {
                $(this).prop("disabled", true);
            }
            if ($(this).hasClass("selecttext"))
            {
                $(this).click(function(e)
                {
                    $(this).select();
                });
            }
            if ($(this).hasClass("date"))
            {
                $(this).datepicker
				({
				    onSelect: function(curDate, instance)
				    {
				        validateDirty();
				        if (typeof setDate == 'function')
				        {
				            setDate(curDate, instance);
				        }
				    }
				});
            }
            if ($(this).hasClass("pastdate"))
            {
                $(this).datepicker
				({
				    maxDate: 0,
				    yearRange: "-60:+0",
				    onSelect: function(curDate, instance)
				    {
				        validateDirty();
				        if (typeof setDate == 'function')
				        {
				            setDate(curDate, instance);
				        }
				    }
				});
            }
            if ($(this).hasClass("nopastdate"))
            {
                $(this).datepicker(
                {
                    minDate: 0,
                    onSelect: function(curDate, instance)
                    {
                        validateDirty();
                        if (typeof setDate == 'function')
                        {
                            setDate(curDate, instance);
                        }
                    }
                });
            }
            if ($(this).hasClass("fromdate"))
            {
                $(this).datepicker(
                {
                    defaultDate: "+1w",
                    numberOfMonths: 2,
                    onClose: function(curDate, instance)
                    {
                        validateDirty();
                        $(".todate").datepicker("option", "minDate", curDate);
                        if (typeof setDate == 'function')
                        {
                            setDate(curDate, instance);
                        }
                    }
                });
            }
            if ($(this).hasClass("todate"))
            {
                $(this).datepicker(
                {
                    defaultDate: "+1w",
                    numberOfMonths: 2,
                    onClose: function(curDate, instance)
                    {
                        validateDirty();
                        $(".fromdate").datepicker("option", "maxDate", curDate);
                        if (typeof setDate == 'function')
                        {
                            setDate(curDate, instance);
                        }
                    }
                });
            }
            if ($(this).hasClass("date") || $(this).hasClass("pastdate") || $(this).hasClass("nopastdate") || $(this).hasClass("fromdate") || $(this).hasClass("todate"))
            {
                $.datepicker.setDefaults($.datepicker.regional[ThisLanguage]);
                $(".ui-datepicker").css({ "font-size": "0.95em" });
            }
        }
        if ($(this).is("textarea"))
        {
            $(this).attr("autocomplete", "false");
            if ($(this).hasClass("validate"))
            {
                $(this).keyup(function(e)
                {
                    validateDirty();
                });
            }
            _ElementClass = "";
            _ElementClass = $(this).attr("class").match(/[\w-]*validate-[\w-]*/g);
            if (_ElementClass != null)
            {
                $(this).keypress(function()
                {
                    validateInput(event, $(this).attr("class").match(/[\w-]*validate-[\w-]*/g), SelectedArea);
                });
            }
            if ($(this).hasClass("forceuppercase"))
            {
                $(this).focusout(function(e)
                {
                    $(this).val($(this).val().toUpperCase());
                });
            }
            if ($(this).hasClass("forcelowercase"))
            {
                $(this).focusout(function(e)
                {
                    $(this).val($(this).val().toLowerCase());
                });
            }
            if ($(this).hasClass("donotpaste"))
            {
                $(this).keydown(function(e)
                {
                    if (e.ctrlKey == true && (e.which == 118 || e.which == 86))
                    {
                        e.preventDefault();
                    }
                });
            }
            if ($(this).hasClass("notenter"))
            {
                $(this).keypress(function(e)
                {
                    if ((e.keyCode || e.which) == 13)
                    {
                        e.preventDefault();
                    }
                });
            }
            if ($(this).hasClass("readonly"))
            {
                $(this).prop("readOnly", true);
            }
            if ($(this).hasClass("disabled"))
            {
                $(this).prop("disabled", true);
            }
            if ($(this).hasClass("selecttext"))
            {
                $(this).click(function(e)
                {
                    $(this).select();
                });
            }
        }
        if ($(this).is("[type='checkbox']"))
        {
            if ($(this).hasClass("validate"))
            {
                $(this).click(function()
                {
                    validateDirty();
                });
            }
            if ($(this).hasClass("disabled"))
            {
                $(this).prop("disabled", true);
            }
        }
        if ($(this).is("[type='radio']"))
        {
            if ($(this).hasClass("validate"))
            {
                $(this).click(function()
                {
                    validateDirty();
                });
            }
            if ($(this).hasClass("disabled"))
            {
                $(this).prop("disabled", true);
            }
        }
        if ($(this).is("select"))
        {
            if ($(this).hasClass("validate"))
            {
                $(this).change(function()
                {
                    validateDirty();
                });
            }
            if ($(this).hasClass("readonly"))
            {
                $(this).prop("readOnly", true);
            }
            if ($(this).hasClass("disabled"))
            {
                $(this).prop("disabled", true);
            }
        }
        if ($(this).is("button"))
        {
            if ($(this).hasClass("validate"))
            {
                $(this).click(function()
                {
                    validateDirty();
                });
            }
            if ($(this).hasClass("help"))
            {
                $(this).click(function()
                {
                    modalHelp(ModalHelpPath);
                });
            }
            if ($(this).hasClass("setmap"))
            {
                $(this).click(function()
                {
                    setGoogleMap();
                });
            }
            if ($(this).hasClass("deletemap"))
            {
                $(this).click(function()
                {
                    deleteGoogleMap();
                });
            }
            if ($(this).hasClass("cancel"))
            {
                $(this).click(function()
                {
                    verifyCancel(this);
                });
            }
            if ($(this).hasClass("submit"))
            {
                $(this).click(function()
                {
                    verifySubmit(this.id);
                });
            }
            if ($(this).hasClass("disabled"))
            {
                $(this).button({ disabled: true });
            }
            if ($("#cmdSubmit").length > 0)
            {
                $("#cmdSubmit").prop("disabled", true);
            }
            if ($("#cmdSubmitAndContinue").length > 0)
            {
                $("#cmdSubmitAndContinue").prop("disabled", true);
            }
        }
    });
    $(".mandatory", SelectedArea).each(function()
    {
        $(this).append(" <span style=\"color: #FF0000;\">*</span>");
    });
    if (SelectedFocusElement != "" && SelectedFocusElement != undefined && SelectedFocusElement != null)
    {
        window.setTimeout(function() { $(SelectedFocusElement, SelectedArea).focus(); }, 200);
    } 
}

// Form Validation - Key Press
function validateInput(Event, ValidType, SelectedArea)
{
    var _Source = Event.target || Event.srcElement;
    var _ValidType = getValidType(ValidType);
    var _KeyChar = Event.keyCode || Event.which;
    if (_KeyChar == 8 || _KeyChar == 13)
    {
        return true;
    }
    else
    {
        var c = String.fromCharCode(_KeyChar);
        var cl = c.toLowerCase();
        if (_ValidType.indexOf(cl) >= 0)
        {
            return true;
        }
        else
        {
            if ($("[role='alert']", SelectedArea).length > 0)
            {
                var _AlertId = $("[role='alert']", SelectedArea).attr("id");
                $("#" + _AlertId).text(SingleDefaultElements.invalidCharacterText).removeClass('alert-info').addClass('alert-danger');
            }
            else
            {
                $("#modalStandardTitle, #modalStandardText, #modalStandardAdditional").empty();
                $("#modalStandardTitle").text(SingleDefaultElements.invalidCharacterTitle);
                $("#modalStandardText").html(SingleDefaultElements.invalidCharacterText);
                $('#modalStandard').modal("show");
            }
            $(_Source).focus();
            Event.preventDefault();
        }
    }
}

function verifyValidInputs(elementId, elementType, validationType, SelectedArea)
{
    var _NoneValid = 0;
    var _ThisDate = "";
    if (elementType == "input")
    {
        if (validationType == "mandatory")
        {
            if ($('#' + elementId, SelectedArea).val().replace(/^\s+|\s+$/g, '') == "")
            {
                _NoneValid += 1;
            }
            w_minLength = $('#' + elementId, SelectedArea).attr('minlength');
            if (w_minLength != null && w_minLength != "" && w_minLength != undefined)
            {
                if ($('#' + elementId, SelectedArea).val().length < w_minLength)
                {
                    _NoneValid += 1;
                }
            }
            w_maxLength = $('#' + elementId, SelectedArea).attr('maxlength');
            if (w_maxLength != null && w_maxLength != "" && w_maxLength != undefined)
            {
                if ($('#' + elementId, SelectedArea).val().length > w_maxLength)
                {
                    _NoneValid += 1;
                }
            }
            if (!$('#' + elementId, SelectedArea).hasClass("date"))
            {
                if (verifyValidTypes(elementId, $('#' + elementId, SelectedArea).attr("class").match(/[\w-]*validate-[\w-]*/g), SelectedArea) != 0)
                {
                    _NoneValid += 1;
                }
            }
            if ($('#' + elementId, SelectedArea).hasClass("date"))
            {
                _ThisDate = $('#' + elementId, SelectedArea).datepicker("getDate");
                if (isNaN(new Date(_ThisDate)))
                {
                    _NoneValid += 1;
                }
            }
        }
        if (validationType == "optional")
        {
            if ($('#' + elementId, SelectedArea).val().replace(/^\s+|\s+$/g, '') != "")
            {
                w_minLength = $('#' + elementId, SelectedArea).attr('minlength');
                if (w_minLength != null && w_minLength != "" && w_minLength != undefined)
                {
                    if ($('#' + elementId, SelectedArea).val().length < w_minLength)
                    {
                        _NoneValid += 1;
                    }
                }
                w_maxLength = $('#' + elementId, SelectedArea).attr('maxlength');
                if (w_maxLength != null && w_maxLength != "" && w_maxLength != undefined)
                {
                    if ($('#' + elementId, SelectedArea).val().length > w_maxLength)
                    {
                        _NoneValid += 1;
                    }
                }
                if (!$('#' + elementId, SelectedArea).hasClass("date"))
                {
                    if (verifyValidTypes(elementId, $('#' + elementId, SelectedArea).attr("class").match(/[\w-]*validate-[\w-]*/g), SelectedArea) != 0)
                    {
                        _NoneValid += 1;
                    }
                }
                if ($('#' + elementId, SelectedArea).hasClass("date"))
                {
                    if ($('#' + elementId, SelectedArea).val().replace(/^\s+|\s+$/g, '') != "")
                    {
                        _ThisDate = $('#' + elementId, SelectedArea).datepicker("getDate");
                        if (isNaN(new Date(_ThisDate)))
                        {
                            _NoneValid += 1;
                        }
                    }
                }
            }
        }
    }
    else if (elementType == "select")
    {
        if (validationType == "mandatory")
        {
            if ($('#' + elementId, SelectedArea).val() == "" || $('#' + elementId, SelectedArea).val() == null || $('#' + elementId, SelectedArea).val() == undefined || $('#' + elementId, SelectedArea).val() == "0")
            {
                _NoneValid += 1;
            }
        }
    }
    return _NoneValid;
}

function verifyValidTypes(elementId, valId, SelectedArea)
{
    var _NoneValid = 0;
    var thisValid = getValidType(valId);
    var txtElementValue = $("#" + elementId, SelectedArea).val();
    for (var i = 0; i < txtElementValue.length; i++)
    {
        if (thisValid.indexOf(txtElementValue.charAt(i).toLowerCase()) == -1)
        {
            _NoneValid += 1;
        }
    }
    if (valId == "validate-email")
    {
        if (isValidEmail(txtElementValue) == false)
        {
            _NoneValid += 1;
        }
    }
    if (valId == "validate-web")
    {
        if (isValidURL(txtElementValue) == false)
        {
            _NoneValid += 1;
        }
    }
    return _NoneValid;
}

function isValidEmail(email)
{
    var RegExp = /^((([a-z]|[0-9]|!|#|$|%|&|'|\*|\+|\-|\/|=|\?|\^|_|`|\{|\||\}|~)+(\.([a-z]|[0-9]|!|#|$|%|&|'|\*|\+|\-|\/|=|\?|\^|_|`|\{|\||\}|~)+)*)@((((([a-z]|[0-9])([a-z]|[0-9]|\-){0,61}([a-z]|[0-9])\.))*([a-z]|[0-9])([a-z]|[0-9]|\-){0,61}([a-z]|[0-9])\.)[\w]{2,4}|(((([0-9]){1,3}\.){3}([0-9]){1,3}))|(\[((([0-9]){1,3}\.){3}([0-9]){1,3})\])))$/
    return RegExp.test(email);
}

function isValidURL(url)
{
    var RegExp = /^(([\w]+:)?\/\/)?(([\d\w]|%[a-fA-f\d]{2,2})+(:([\d\w]|%[a-fA-f\d]{2,2})+)?@)?([\d\w][-\d\w]{0,253}[\d\w]\.)+[\w]{2,4}(:[\d]+)?(\/([-+_~.\d\w]|%[a-fA-f\d]{2,2})*)*(\?(&?([-+_~.\d\w]|%[a-fA-f\d]{2,2})=?)*)?(#([-+_~.\d\w]|%[a-fA-f\d]{2,2})*)?$/;
    return RegExp.test(url);
}

function serializeForm(SelectedArea)
{
    if (SelectedArea != "" && SelectedArea != undefined && SelectedArea != null)
    {
        SelectedArea = $(SelectedArea);
    }
    else
    {
        SelectedArea = "";
    }
    var inputElementsError = false;
    var currentElementId = "";
    var currentElementType = "";
    var currentValidationType = "";
    var outputElements = {};
    var ElementLabelText = "";
    var Tabs = "";
    var TabsPanel = "";
    var TabsPanelIndex = "";
    $(":input", SelectedArea).each(function()
    {
        currentElementId = "";
        currentElementType = "";
        currentValidationType = "";
        ElementLabelText = "";
        Tabs = "";
        TabsPanel = "";
        TabsPanelIndex = "";
        if ($(this).hasClass("validate"))
        {
            currentElementId = $(this).attr('id');
            if (currentElementId != "" && currentElementId != null && currentElementId != undefined)
            {
                if (JSONValidation[currentElementId].datatype == "int")
                {
                    outputElements[currentElementId] = Number($(this).val());
                }
                else if (JSONValidation[currentElementId].datatype == "date")
                {
                    if ($(this).val().replace(/^\s+|\s+$/g, '') != "")
                    {
                        outputElements[currentElementId] = moment($('#' + currentElementId, SelectedArea).datepicker("getDate")).format('MM/DD/YYYY');
                    }
                    else
                    {
                        outputElements[currentElementId] = null;
                    }
                }
                else
                {
                    outputElements[currentElementId] = encodeURIComponent($(this).val());
                }
                if ($(this).is("[type='text'], [type='password'], [type='datetime'], [type='datetime-local'], [type='date'], [type='month'], [type='time'], [type='week'], [type='number'], [type='email'], [type='url'], [type='search'], [type='tel'], [type='color'], textarea"))
                {
                    currentElementType = "input";
                }
                else if ($(this).is("select"))
                {
                    currentElementType = "select";
                }
                if ($("label[for='" + currentElementId + "']", SelectedArea).hasClass("mandatory"))
                {
                    currentValidationType = "mandatory";
                }
                else if ($("label[for='" + currentElementId + "']", SelectedArea).hasClass("optional"))
                {
                    currentValidationType = "optional";
                }
                if (currentElementType != "" && currentValidationType != "")
                {
                    if (verifyValidInputs(currentElementId, currentElementType, currentValidationType, SelectedArea) != 0)
                    {
                        Tabs = $("#" + currentElementId, SelectedArea).closest(".ui-tabs").attr("id");
                        TabsPanel = $("#" + currentElementId, SelectedArea).closest(".ui-tabs-panel").attr("id");
                        TabsPanelIndex = $('#' + Tabs + ' a[href="#' + TabsPanel + '"]', SelectedArea).parent().index();
                        if (Tabs != "" && Tabs != null && Tabs != undefined)
                        {
                            $("#" + Tabs, SelectedArea).tabs("option", "active", TabsPanelIndex);
                        }
                        $("#" + currentElementId).focus();
                        if ($("[role='alert']", SelectedArea).length > 0)
                        {
                            var w_id = $("[role='alert']", SelectedArea).attr("id");
                            $("#" + w_id, SelectedArea).text(SingleElements[currentElementId + "SubmitError"]).removeClass('alert-info').addClass('alert-danger');
                            inputElementsError = true;
                            return false;
                        }
                        else
                        {
                            //console.log(currentElementId);
                            $("#modalStandardTitle, #modalStandardText, #modalStandardAdditional").empty();
                            $("#modalStandardTitle").text(SingleDefaultElements.invalidCharacterTitle);
                            $("#modalStandardText").html(SingleElements[currentElementId + "SubmitError"]);
                            $('#modalStandard').modal("show");
                            inputElementsError = true;
                            return false;
                        }
                    }
                }
            }
        }
    });
    if (inputElementsError == false)
    {
        return outputElements;
    }
    else
    {
        return false;
    }
}

function populateForm(SelectedArea, SelectedObject)
{
    if (SelectedArea != "" && SelectedArea != undefined && SelectedArea != null)
    {
        SelectedArea = $(SelectedArea);
    }
    else
    {
        SelectedArea = "";
    }
    $.each(SelectedObject, function(HTMLElement, Value)
    {        
        if ($('#' + HTMLElement, SelectedArea).length > 0 && $('#' + HTMLElement, SelectedArea).attr("data-attr") != undefined)
        {
            if (JSONValidation[HTMLElement].datatype == "date")
            {
                if (Value != "" && Value != null && Value != undefined)
                {
                    $('#' + HTMLElement, SelectedArea)[$('#' + HTMLElement, SelectedArea).attr("data-attr")](moment(Value).format('L'));
                }
            }
            else if (JSONValidation[HTMLElement].datatype == "time")
            {
                if (Value != "" && Value != null && Value != undefined)
                {
                    $('#' + HTMLElement, SelectedArea)[$('#' + HTMLElement, SelectedArea).attr("data-attr")](moment(Value).format('LT'));
                }
            }
            else if (JSONValidation[HTMLElement].datatype == "militarytime")
            {
                if (Value != "" && Value != null && Value != undefined)
                {
                    $('#' + HTMLElement, SelectedArea)[$('#' + HTMLElement, SelectedArea).attr("data-attr")](moment(Value).format('HH:mm'));
                }
            }
            else if (JSONValidation[HTMLElement].datatype == "decimal")
            {
                if (Value != "" && Value != null && Value != undefined)
                {
                    $('#' + HTMLElement, SelectedArea)[$('#' + HTMLElement, SelectedArea).attr("data-attr")](numeral(Value).format('0.00'));
                }
            }
            else
            {
                if (Value != "" && Value != null && Value != undefined)
                {
                    $('#' + HTMLElement, SelectedArea)[$('#' + HTMLElement, SelectedArea).attr("data-attr")](Value);
                }
                else if (Value == null)
                {
                    $('#' + HTMLElement, SelectedArea)[$('#' + HTMLElement, SelectedArea).attr("data-attr")](0);
                }
            }
        }
        if ($('.' + HTMLElement, SelectedArea).length > 0 && $('.' + HTMLElement, SelectedArea).attr("data-attr") != undefined)
        {
            if (JSONValidation[HTMLElement].datatype == "date")
            {
                if (Value != "" && Value != null && Value != undefined)
                {
                    $('.' + HTMLElement, SelectedArea)[$('.' + HTMLElement, SelectedArea).attr("data-attr")](moment(Value).format('L'));
                }
            }
            else if (JSONValidation[HTMLElement].datatype == "time")
            {
                if (Value != "" && Value != null && Value != undefined)
                {
                    $('.' + HTMLElement, SelectedArea)[$('.' + HTMLElement, SelectedArea).attr("data-attr")](moment(Value).format('LT'));
                }
            }
            else if (JSONValidation[HTMLElement].datatype == "militarytime")
            {
                if (Value != "" && Value != null && Value != undefined)
                {
                    $('.' + HTMLElement, SelectedArea)[$('.' + HTMLElement, SelectedArea).attr("data-attr")](moment(Value).format('HH:mm'));
                }
            }
            else if (JSONValidation[HTMLElement].datatype == "decimal")
            {
                if (Value != "" && Value != null && Value != undefined)
                {
                    $('.' + HTMLElement, SelectedArea)[$('.' + HTMLElement, SelectedArea).attr("data-attr")](numeral(Value).format('0.00'));
                }
            }
            else
            {
                if (Value != "" && Value != null && Value != undefined)
                {
                    $('.' + HTMLElement, SelectedArea)[$('.' + HTMLElement, SelectedArea).attr("data-attr")](Value);
                }
                else if (Value == null)
                {
                    $('.' + HTMLElement, SelectedArea)[$('.' + HTMLElement, SelectedArea).attr("data-attr")](0);
                }
            }
        }
    });
}

function lockForm(SelectedForm)
{
    $("#" + SelectedForm + " :input").each(function()
    {
        $(this).prop("disabled", true);
    });
}

function unlockForm(forSelectedFormmName, resetForm)
{
    $("#" + SelectedForm + " :input").each(function()
    {
        $(this).prop("disabled", false);
        if (resetForm == true)
        {
            $(this).val("");
            if ($(this).is("[type='checkbox']"))
            {
                $(this).attr("checked", false)
            }
            if ($(this).is("[type='radio']"))
            {
                $(this).attr("checked", false)
            }
        }
    });
}