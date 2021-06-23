function show_message(text, icon) {
    $.toast({
        heading: "Thông Báo",
        text: text,
        position: 'top-left',
        icon: icon,
        hideAfter: 5000,
    });
}

function isset($element) {
    if (typeof $element != 'undefined')
        return true;
    return false;
}
//get
function str_replace(str, key_search, key_replace) {
    return str.replace(key_search, key_replace);
}

function checkbox_style() {
    $('input').iCheck({
        checkboxClass: 'icheckbox_square-blue',
        radioClass: 'iradio_square-blue',
        increaseArea: '20%' // optional
    });
}

function getYoutubeID(url) {
    var videoid = url.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/);
    return videoid[1];
}

function tinymce_load() {
    //editor
    tinymce.init({
        fontsize_formats: "8px 9px 10px 11px 12px 14px 15px 18px 20px 26px 36px 40px 46px 62px 72px",
        selector: "textarea.tinymce",
        theme: "modern",
        height: 300,
        plugins: [
             "advlist autolink link image lists charmap print preview hr anchor pagebreak",
             "searchreplace wordcount visualblocks visualchars insertdatetime media nonbreaking fullscreen",
             "table contextmenu directionality emoticons paste textcolor responsivefilemanager code"
       ],
       toolbar1: "undo redo pastetext | styleselect | fontselect | fontsizeselect | bold italic underline | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link unlink anchor | table responsivefilemanager image media | forecolor backcolor  | print preview code",
       content_css: domain+'plugins/tinymce/skins/custom.css',
       image_advtab: true ,
       image_caption: true,
       language: "vi",
       external_filemanager_path:"plugins/responsive_filemanager/filemanager/",
       filemanager_title:"Responsive Filemanager" ,
       external_plugins: { "filemanager" : domain+"plugins/responsive_filemanager/filemanager/plugin.min.js"}
    });

    tinymce.init({
        selector: "textarea.tinymce-shortcut",
        theme: "modern",
        height: 100,
        plugins: [
             "advlist autolink link image lists charmap print preview hr anchor pagebreak",
             "searchreplace wordcount visualblocks visualchars insertdatetime media nonbreaking fullscreen",
             "table contextmenu directionality emoticons paste textcolor responsivefilemanager code"
       ],
        toolbar1: "undo redo pastetext | fontselect | bold italic underline | code",
        content_css: domain+'plugins/tinymce/skins/custom.css',
        image_advtab: true ,
        language: "vi",
    });
}

function image_review() {
    $.each($('input[type="images"]'), function(index, value) {
        var field_id = $(this).attr('id');
        if($(this).val().length > 0) {
            var url = domain+'uploads/source/'+$(this).val();
            if(url.length > 0)
            {
                if(isset($(this).closest('.form-group').find('.result-img').html())) {
                    $(this).closest('.form-group').find('.result-img').attr('src', url);
                }
                else $(this).closest('.form-group').append('<img class="result-img" src="'+url+'" style="max-width:100%;margin-top:10px;">');
            }
        }
        else {
            if(isset($(this).closest('.form-group').find('.result-img').html())) {
                $(this).closest('.form-group').find('.result-img').remove();
            }
        }
    });
}

function video_review() {
    $.each($('input[type="video"]'), function(index, value) {
        var field_id = $(this).attr('id');
        if($(this).val().length > 0) {
            var url = 'https://img.youtube.com/vi/'+getYoutubeID($(this).val())+'/0.jpg';
            if(url.length > 0)
            {
                if(isset($(this).closest('.form-group').find('.result-img').html())) {
                    $(this).closest('.form-group').find('.result-img').attr('src', url);
                }
                else $(this).closest('.form-group').append('<img class="result-img" src="'+url+'" style="max-width:100%;margin-top:10px;">');
            }
        }
        else {
            if(isset($(this).closest('.form-group').find('.result-img').html())) {
                $(this).closest('.form-group').find('.result-img').remove();
            }
        }
    });
}


$(function(){
    tinymce_load();
    image_review();
    video_review();
    //menu
    if(isset($('#menu').html()))
        $('#menu').metisMenu();
    if(isset($('#menu_2').html()))
        $('#menu_2').metisMenu();
    //tooltip boostrap
	 $('[data-toggle="tooltip"]').tooltip();

    //Cập nhật các trạng thái có kiểu boolean
    $('input#select_all').on('ifChecked', function(event){
        $('.select').iCheck('check');
    });

    $('input#select_all').on('ifUnchecked', function(event){
        $('.select').iCheck('uncheck');
    });

    $('input[type="video"]').keyup(function(){ video_review();});

    //<![CDATA[
    var Nanobar=function(){var c,d,e,f,g,h,k={width:"100%",height:"3px",zIndex:9999,top:"0"},l={width:0,height:"100%",clear:"both",transition:"height .3s"};c=function(a,b){for(var c in b)a.style[c]=b[c];a.style["float"]="left"};f=function(){var a=this,b=this.width-this.here;0.1>b&&-0.1<b?(g.call(this,this.here),this.moving=!1,100==this.width&&(this.el.style.height=0,setTimeout(function(){a.cont.el.removeChild(a.el)},100))):(g.call(this,this.width-b/4),setTimeout(function(){a.go()},16))};g=function(a){this.width=
    a;this.el.style.width=this.width+"%"};h=function(){var a=new d(this);this.bars.unshift(a)};d=function(a){this.el=document.createElement("div");this.el.style.backgroundColor=a.opts.bg;this.here=this.width=0;this.moving=!1;this.cont=a;c(this.el,l);a.el.appendChild(this.el)};d.prototype.go=function(a){a?(this.here=a,this.moving||(this.moving=!0,f.call(this))):this.moving&&f.call(this)};e=function(a){a=this.opts=a||{};var b;a.bg=a.bg||"#2980B9";this.bars=[];b=this.el=document.createElement("div");c(this.el,
    k);a.id&&(b.id=a.id);b.style.position=a.target?"relative":"fixed";a.target?a.target.insertBefore(b,a.target.firstChild):document.getElementsByTagName("body")[0].appendChild(b);h.call(this)};e.prototype.go=function(a){this.bars[0].go(a);100==a&&h.call(this)};return e}();
    var nanobar = new Nanobar();nanobar.go(30);nanobar.go(60);nanobar.go(100);
    //]]>
});

$(document).on('focusin', function(e) {
    if ($(e.target).closest(".mce-window").length) {
        e.stopImmediatePropagation();
    }
});


//format number
var inputnumber = 'Giá trị nhập vào không phải là số';

function FormatNumber(str) {
    var strTemp = GetNumber(str);
    if (strTemp.length <= 3)
      return strTemp;
    strResult = "";
    for (var i = 0; i < strTemp.length; i++)
      strTemp = strTemp.replace(",", "");
    var m = strTemp.lastIndexOf(".");
    if (m == -1) {
      for (var i = strTemp.length; i >= 0; i--) {
        if (strResult.length > 0 && (strTemp.length - i - 1) % 3 == 0)
          strResult = "," + strResult;
        strResult = strTemp.substring(i, i + 1) + strResult;
      }
    } else {
      var strphannguyen = strTemp.substring(0, strTemp.lastIndexOf("."));
      var strphanthapphan = strTemp.substring(strTemp.lastIndexOf("."),
          strTemp.length);
      var tam = 0;
      for (var i = strphannguyen.length; i >= 0; i--) {

        if (strResult.length > 0 && tam == 4) {
          strResult = "," + strResult;
          tam = 1;
        }

        strResult = strphannguyen.substring(i, i + 1) + strResult;
        tam = tam + 1;
      }
      strResult = strResult + strphanthapphan;
    }
    return strResult;
}

function GetNumber(str) {
    var count = 0;
    for (var i = 0; i < str.length; i++) {
      var temp = str.substring(i, i + 1);
      if (!(temp == "," || temp == "." || (temp >= 0 && temp <= 9))) {
        alert(inputnumber);
        return str.substring(0, i);
      }
      if (temp == " ")
        return str.substring(0, i);
      if (temp == ".") {
        if (count > 0)
          return str.substring(0, ipubl_date);
        count++;
      }
    }
    return str;
}

function IsNumberInt(str) {
    for (var i = 0; i < str.length; i++) {
      var temp = str.substring(i, i + 1);
      if (!(temp == "." || (temp >= 0 && temp <= 9))) {
        alert(inputnumber);
        return str.substring(0, i);
      }
      if (temp == ",") {
        return str.substring(0, i);
      }
    }
    return str;
}
