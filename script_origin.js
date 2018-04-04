/**
 * Created by Натури on 05.09.2016.
 */
/* mask input*/
(function(e) {
    function t() {
        var e = document.createElement("input"),
            t = "onpaste";
        return e.setAttribute(t, ""), "function" == typeof e[t] ? "paste" : "input"
    }

    var n, a = t() + ".mask",
        r = navigator.userAgent,
        i = /iphone/i.test(r),
        o = /android/i.test(r);
    e.mask = {
        definitions: {
            9: "[0-9]",
            a: "[A-Za-z]",
            "*": "[A-Za-z0-9]"
        },
        dataName: "rawMaskFn",
        placeholder: "_"
    }, e.fn.extend({
        caret: function(e, t) {
            var n;
            if (0 !== this.length && !this.is(":hidden")) return "number" == typeof e ? (t = "number" == typeof t ? t : e, this.each(function() {
                this.setSelectionRange ? this.setSelectionRange(e, t) : this.createTextRange && (n = this.createTextRange(), n.collapse(!0), n.moveEnd("character", t), n.moveStart("character", e), n.select())
            })) : (this[0].setSelectionRange ? (e = this[0].selectionStart, t = this[0].selectionEnd) : document.selection && document.selection.createRange && (n = document.selection.createRange(), e = 0 - n.duplicate().moveStart("character", -1e5), t = e + n.text.length), {
                begin: e,
                end: t
            })
        },
        unmask: function() {
            return this.trigger("unmask")
        },
        mask: function(t, r) {
            var c, l, s, u, f, h;
            return !t && this.length > 0 ? (c = e(this[0]), c.data(e.mask.dataName)()) : (r = e.extend({
                placeholder: e.mask.placeholder,
                completed: null
            }, r), l = e.mask.definitions, s = [], u = h = t.length, f = null, e.each(t.split(""), function(e, t) {
                "?" == t ? (h--, u = e) : l[t] ? (s.push(RegExp(l[t])), null === f && (f = s.length - 1)) : s.push(null)
            }), this.trigger("unmask").each(function() {
                function c(e) {
                    for (; h > ++e && !s[e];);
                    return e
                }

                function d(e) {
                    for (; --e >= 0 && !s[e];);
                    return e
                }

                function m(e, t) {
                    var n, a;
                    if (!(0 > e)) {
                        for (n = e, a = c(t); h > n; n++)
                            if (s[n]) {
                                if (!(h > a && s[n].test(R[a]))) break;
                                R[n] = R[a], R[a] = r.placeholder, a = c(a)
                            }
                        b(), x.caret(Math.max(f, e))
                    }
                }

                function p(e) {
                    var t, n, a, i;
                    for (t = e, n = r.placeholder; h > t; t++)
                        if (s[t]) {
                            if (a = c(t), i = R[t], R[t] = n, !(h > a && s[a].test(i))) break;
                            n = i
                        }
                }

                function g(e) {
                    var t, n, a, r = e.which;
                    8 === r || 46 === r || i && 127 === r ? (t = x.caret(), n = t.begin, a = t.end, 0 === a - n && (n = 46 !== r ? d(n) : a = c(n - 1), a = 46 === r ? c(a) : a), k(n, a), m(n, a - 1), e.preventDefault()) : 27 == r && (x.val(S), x.caret(0, y()), e.preventDefault())
                }

                function v(t) {
                    var n, a, i, l = t.which,
                        u = x.caret();
                    t.ctrlKey || t.altKey || t.metaKey || 32 > l || l && (0 !== u.end - u.begin && (k(u.begin, u.end), m(u.begin, u.end - 1)), n = c(u.begin - 1), h > n && (a = String.fromCharCode(l), s[n].test(a) && (p(n), R[n] = a, b(), i = c(n), o ? setTimeout(e.proxy(e.fn.caret, x, i), 0) : x.caret(i), r.completed && i >= h && r.completed.call(x))), t.preventDefault())
                }

                function k(e, t) {
                    var n;
                    for (n = e; t > n && h > n; n++) s[n] && (R[n] = r.placeholder)
                }

                function b() {
                    x.val(R.join(""))
                }

                function y(e) {
                    var t, n, a = x.val(),
                        i = -1;
                    for (t = 0, pos = 0; h > t; t++)
                        if (s[t]) {
                            for (R[t] = r.placeholder; pos++ < a.length;)
                                if (n = a.charAt(pos - 1), s[t].test(n)) {
                                    R[t] = n, i = t;
                                    break
                                }
                            if (pos > a.length) break
                        } else R[t] === a.charAt(pos) && t !== u && (pos++, i = t);
                    return e ? b() : u > i + 1 ? (x.val(""), k(0, h)) : (b(), x.val(x.val().substring(0, i + 1))), u ? t : f
                }

                var x = e(this),
                    R = e.map(t.split(""), function(e) {
                        return "?" != e ? l[e] ? r.placeholder : e : void 0
                    }),
                    S = x.val();
                x.data(e.mask.dataName, function() {
                    return e.map(R, function(e, t) {
                        return s[t] && e != r.placeholder ? e : null
                    }).join("")
                }), x.attr("readonly") || x.one("unmask", function() {
                    x.unbind(".mask").removeData(e.mask.dataName)
                }).bind("focus.mask", function() {
                    clearTimeout(n);
                    var e;
                    S = x.val(), e = y(), n = setTimeout(function() {
                        b(), e == t.length ? x.caret(0, e) : x.caret(e)
                    }, 10)
                }).bind("blur.mask", function() {
                    y(), x.val() != S && x.change()
                }).bind("keydown.mask", g).bind("keypress.mask", v).bind(a, function() {
                    setTimeout(function() {
                        var e = y(!0);
                        x.caret(e), r.completed && e == x.val().length && r.completed.call(x)
                    }, 0)
                }), y()
            }))
        }
    })
})(jQuery);

var mobilecheck = function() {
    var check = false;
    (function(a) {
        if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true;
    })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
};
window.isMobile = mobilecheck();
$(document).ready(function() {
    $(".ajax-send-email-form input[name=phone],.mask-phone, .phone").mask("+7 (999) 999-99-99");
    /*Добавлена функция*/
    /* EXTERNAL LINKS */
    $("a[data-ext-href]").each(function() {
        var url = $(this).attr("data-ext-href");
        if (url != "") {
            $(this).click(function() {
                window.open(url);
                return false;
            });
        }
    });
    /*/ EXTERNAL LINKS */
    var i8n = {
        newsBlock: {
            ru: "nastrojki/novosti-ajax/",
            en: "en/nastrojki/novosti-ajax/"
        },
        blogsBlock: {
            ru: "nastrojki/blog-ajax/",
            en: "en/nastrojki/blog-ajax/"
        },
        ajaxCatalog: {
            ru: "nastrojki/proektyi-ajax/",
            en: "en/nastrojki/projects-ajax/"
        },
        blogsBlockNew: {
            ru: "blog-ajax-new/",
            en: "en/nastrojki/blog-ajax/"
        },
    };
    var getLang = function() {
        var url = window.location.href;
        if (url.indexOf("/en/") !== -1) {
            return "en";
        } else return "ru";
    };
    var LANG = getLang();

    /* SAME HEIGHT */
    function sameHeight(elem, all_width) {
        all_width = all_width || true;
        $(elem).removeAttr("style");
        if ((all_width === true) && (parseInt($(window).width()) < 600)) {
            return;
        } else {
            var maxHeight = 0;
            $(elem).each(function() {
                if (this.clientHeight > maxHeight)
                    maxHeight = this.clientHeight;
            });
            $(elem).height(maxHeight);
            $(elem).css({
                minHeight: maxHeight,
                maxHeight: maxHeight
            });
        }
    }

    sameHeight(".col-catalog h3 a");
    sameHeight(".col-catalog h5");
    sameHeight(".col-catalog .greyBg");
    sameHeight(".youSlider .slideInfo h3");
    sameHeight(".preimBlock .preims > div");
    var windowWidth;
    $(window).resize(function() {
        if ($(window).width() != windowWidth) {
            windowWidth = $(window).width();
            sameHeight(".col-catalog h3 a");
            sameHeight(".col-catalog h5");
            sameHeight(".col-catalog .greyBg");
            sameHeight(".youSlider .slideInfo h3");
            sameHeight(".preimBlock .preims > div");
        }
    });
    /*/ SAME HEIGHT */
    /* FILTER FOR MOBILE */
    if ($(window).width() <= 768) {
        if ($("div").is("#projects_block")) {
            function toBottom() {
                $("#projects_block").css("display", "table");
                $("#projects_block #titleBigbos").css("display", "table-footer-group");
            }

            toBottom();
            var textSelect = "";
            if (LANG !== "en") textSelect = "Выбор по параметрам ";
            else textSelect = "Filter by ";
            $('<div id="filter_mobile"><a id="filter_button" href="javascript:void(0);">' + textSelect + '<span id="filter_triangle">&#x25bc;</div></a></div>').insertBefore($(".filterBlock"));
            $(".filterBlock").css("display", "none");
            $("#filter_button").click(function() {
                if ($(".filterBlock").css('display') == 'none') {
                    $(".filterBlock").show();
                    $("#filter_triangle").html("&#x25b2;");
                } else {
                    $(".filterBlock").hide();
                    $("#filter_triangle").html("&#x25bc;");
                }
            });
        }
    }

    /*/ FILTER FOR MOBILE */
    function masonryBlocks($container) {
        $container.masonry({
            itemSelector: '.item'
        });
        seeNewsOrBlogList("newsBlock");
        seeNewsOrBlogList("blogsBlock")
    }

    function loading() {
        $('#loadingBlock span').typewriting(".....", {
            "typing_interval": 700,
            "blink_interval": "1s",
            "cursor_color": "#ffffff"
        }, function() {
            loading()
        });
    }

    var offset = 0;

    function seeNewsOrBlogApp(nameBlock, nameLoading) {
        if ($('#' + nameBlock).length) {
            offset += 15;
            $.ajax({
                type: "POST",
                url: i8n[nameBlock][LANG],
                data: $('.seeMore').data(),
                beforeSend: function() {
                    $('#button_load').hide();
                    $('#' + nameLoading).show();
                },
                success: function(data) {
                    console.log("Loaded Dat", offset);
                    $('#' + nameBlock).append(data)
                    $(".col-catalog").animate({
                        opacity: 1
                    }, 1000);
                    $('#' + nameLoading).hide();
                    $('.seeMore').data('offset', offset);
                    if (data) $('#button_load').show();
                    sameHeight(".col-catalog h3");
                    sameHeight(".col-catalog .greyBg");
                }
            });
        }
    }

    seeNewsOrBlogApp('newsBlock', 'loadingNews');
    seeNewsOrBlogApp('blogsBlock', 'loadingBlog');
    seeNewsOrBlogApp('blogsBlockNew', 'loadingBlog');
    $('.seeMore').click(function(e) {
        seeNewsOrBlogApp('newsBlock', 'loadingNews');
        seeNewsOrBlogApp('blogsBlock', 'loadingBlog');
        seeNewsOrBlogApp('blogsBlockNew', 'loadingBlog');
        ajaxCatalogApp(true);
        e.preventDefault();
        return false;
    });

    function ajaxCatalogApp(added) {
        var added = added || false;
        if ($("div").is("#catalogBlock")) {
            if (added === false) {
                offset = 0;
            }
            var maxPrice = $('.maxPriceIn').val()
            var minPrice = $('.minPriceIn').val()
            var areaHome = $('#areaHome').val()
            var storey = $('#storey').val()
            var bedrooms = $('#bedrooms').val()
            var garage = $('#garage').val()
            var project_to_show_type = $('#project_to_show_type').val();
            var data = ("tvFilters", {
                "maxPrice": maxPrice,
                "minPrice": minPrice,
                "areaHome": areaHome,
                "storey": storey,
                "bedrooms": bedrooms,
                "garage": garage,
                "project_type": project_to_show_type,
                "offset": offset,
                "isNewCatalog": true
            });
            ajaxCatalogXHR = $.ajax({
                type: "POST",
                url: i8n["ajaxCatalog"][LANG],
                data: data,
                beforeSend: function() {
                    $('#button_load').hide();
                    $('#loadingBlock').show();
                    if (added === false)
                        $('#catalogBlock').empty();
                },
                success: function(data) {
                    offset += 15;
                    $('#catalogBlock').append(data);
                    $('#catalogBlock').show();
                    $('#loadingBlock').hide();
                    $('button.seeMore').data('offset', offset);
                    if (data) {
                        $('#button_load').show();
                        $('#catalogBlock .col-catalog').each(function() {
                            $(this).css("display", "block");
                            $(this).animate({
                                opacity: 1
                            }, 1000, function() {});
                        });
                        if ($(window).width() <= 768) {
                            var square_block = $("#catalogBlock .square_block, #catalogBlockFix .square_block");
                            square_block.each(function() {
                                $(this).find("br").remove();
                                $(this).append(":");
                                $(this).find("h4").detach().appendTo(this);
                            });
                        }
                        sameHeight(".col-catalog h5");
                        sameHeight(".col-catalog .greyBg");
                    }
                },
                error: function(data) {
                    console.log(data);
                }
            });
        }
    }

    function timer() {
        var obj = parseInt($('.reload span').html())
        obj--;
        $('.reload span').html(obj)
        if (obj == 0) {
            location.reload();
        } else {
            setTimeout(timer, 1000);
        }
    }

    function seeCatalog() {
        var winWid = $(window).width()
        var collWid = $('#catalogBlock .col-catalog').css('width')
        var count = (parseInt((winWid + 20) / parseInt(collWid)) * 3)
        $('#catalogBlock > div').each(function() {
            if ($(this).hasClass("active")) {
                count++
            }
            if (count > 0) {
                $(this).show()
                $(this).addClass('active')
                $(this).animate({
                    opacity: 1
                }, 1000, function() {});
            }
            count--
        });
        sameHeight(".col-catalog .greyBg");
    }

    function seeNewsOrBlogList(nameBlock) {
        $('#' + nameBlock + ' > div').each(function() {
            if (!$(this).hasClass("active")) {
                if (($(window).scrollTop() + $(window).height()) > parseInt($(this).css('top'))) {
                    $(this).animate({
                        opacity: 1
                    }, 1000, function() {});
                }
            }
        })
    }

    /*
    function adressSite(objAdress) {
    if ($("div").is(".cityBlock")) {
    var jsonAdress = $.parseJSON($(objAdress).attr('jsonAdress'))
    $('#contactPage .adress').html(jsonAdress.adress)
    $('#contactPage .phone').html(jsonAdress.phone)
    $('#contactPage .mail').html(jsonAdress.mail)
    $('#contactPage .time').html(jsonAdress.time)
    $('#contactPage .imgContact').html('<img src="' + jsonAdress.imgAdress + '">')
    $('#contactPage .yandexMap').val(jsonAdress.yandexMap)
    $('#map').html('')
    ymaps.ready(init);
    }
    }

    function adressDillersSite(objAdress) {
    if ($("div").is(".cityBlock")) {
    var jsonAdress = $.parseJSON($(objAdress).attr('jsonAdress'))
    $('.ScheamePhilial h4').html(jsonAdress.title)
    $('.ScheamePhilial p').html(jsonAdress.descr)
    $('.ScheamePhilial .imgScheame').html('<img src="' + jsonAdress.imgAdress + '">')
    }
    }
    */
    function init() {
        var yandexMap = $('#contactPage .yandexMap').val()
        var arr = yandexMap.split(/[,]/);
        var myMap = new ymaps.Map("map", {
                center: [arr[0], arr[1]],
                zoom: 12
            }, {
                searchControlProvider: 'yandex#search'
            }),
            myPlacemark = new ymaps.Placemark([arr[0], arr[1]], {});
        myMap.geoObjects.add(myPlacemark);
    }

    function scrollIndex() {
        $('.dots li').removeClass('active')
        var topMarg = $(window).scrollTop();
        var block1 = $('#block-1').height();
        var block2 = block1 + $('#block-2').height() + 116;
        var block3 = block2 + $('#block-3').height() + 116;
        var block4 = block3 + $('#block-4').height() + 116;
        if (topMarg < (block1 - 1)) {
            $('.dots li:eq(0)').addClass("active");
            $('.slideToBlock').hide();
        }
        if (topMarg < (block2 - 1) && topMarg > (block1 - 1)) {
            $('.dots li:eq(1)').addClass("active");
            $('.slideToBlock').show();
        }
        if (topMarg < (block3 - 1) && topMarg > (block2 - 1)) {
            $('.dots li:eq(2)').addClass("active");
        }
        if (topMarg < (block4 - 1) && topMarg > (block3 - 1)) {
            $('.dots li:eq(3)').addClass("active");
        }
        if (topMarg > (block4 - 1)) {
            $('.dots li:eq(4)').addClass("active");
        }
    }

    $('.seegaleryAll').click(function(e) {
        $('#galleryBlock .col-catalog').show();
        $('#galleryBlock .gallery-bl').show();
        $(this).hide();
        e.preventDefault()
        return false;
    });
    $('.see-video-all').click(function() {
        $('.video-slides-gallery .slide1').show();
        $(this).hide();
    });
    scrollIndex();
    $(window).scroll(function() {
        scrollIndex()
    });
    var footerH = $('.footer').height()
    if (($(document).height() - $(window).height()) < footerH) {}
    $(window).scroll(function() {
        seeNewsOrBlogList("newsBlock")
        seeNewsOrBlogList("blogsBlock")
        if ($(window).scrollTop() > ($(document).height() - $(window).height() - footerH)) {}
    });
    /* Slider on main*/
    $('.sliderIndexMain').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        speed: 1000,
        fade: true,
        arrows: true,
        dots: true,
        draggable: false,
        swipe: true,
        autoplay: true,
        autoplaySpeed: 5000,
        responsive: [{
            breakpoint: 768,
            settings: {
                dots: false
            }
        }]
    });
    $('.sliderNavs').slick({
        slidesToShow: 4,
        arrows: false,
        draggable: false,
        swipe: true,
        slidesToScroll: 1,
        focusOnSelect: true,
        centerMode: false,
        responsive: [{
            breakpoint: 1600,
            settings: {
                slidesToShow: 4
            }
        }, {
            breakpoint: 1100,
            settings: {
                slidesToShow: 4
            }
        }, {
            breakpoint: 480,
            settings: {
                slidesToShow: 3
            }
        }]
    });
    /*Slider on main*/
    /*Slider on project page*/
    $('.sliderIndexProject').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        speed: 1000,
        fade: true,
        arrows: false,
        draggable: false,
        swipe: true,
        dots: false,
        asNavFor: '.sliderNavProject',
        autoplay: false,
        autoplaySpeed: 5000
    });
    $('.sliderNavProject').slick({
        slidesToShow: 4,
        arrows: true,
        draggable: false,
        swipe: true,
        slidesToScroll: 1,
        asNavFor: '.sliderIndexProject',
        focusOnSelect: true,
        responsive: [{
            breakpoint: 1600,
            settings: {
                slidesToShow: 4
            }
        }, {
            breakpoint: 1100,
            settings: {
                slidesToShow: 4
            }
        }, {
            breakpoint: 768,
            settings: {
                arrows: false
            }
        }, {
            breakpoint: 480,
            settings: {
                slidesToShow: 3,
                arrows: false
            }
        }]
    });
    /* /Slider on project page*/
    /*Slider on gallery page*/
    $('.sliderIndexGallery').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        speed: 1000,
        fade: true,
        arrows: false,
        draggable: false,
        swipe: true,
        dots: false,
        asNavFor: '.sliderNavGallery',
        autoplay: false,
        autoplaySpeed: 5000
    });
    $('.sliderNavGallery').slick({
        slidesToShow: 6,
        arrows: true,
        draggable: false,
        swipe: true,
        slidesToScroll: 1,
        asNavFor: '.sliderIndexGallery',
        focusOnSelect: true,
        responsive: [{
            breakpoint: 1600,
            settings: {
                slidesToShow: 6
            }
        }, {
            breakpoint: 1100,
            settings: {
                slidesToShow: 5
            }
        }, {
            breakpoint: 768,
            settings: {
                arrows: false
            }
        }, {
            breakpoint: 480,
            settings: {
                slidesToShow: 3,
                arrows: false
            }
        }]
    });
    /*/Slider on gallery page*/
    $("#slider-vertical").slider({
        orientation: "vertical",
        range: true,
        min: 500000,
        max: 15000000,
        values: [500000, 15000000],
        change: function(event, ui) {
            $('#catalogBlock').hide()
            $('#loadingBlock').show()
            ajaxCatalogApp()
        },
        slide: function(event, ui) {
            var minPrice = String(ui.values[1]).replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1 ');
            var maxPrice = String(ui.values[0]).replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1 ');
            $(".minPrice").html(minPrice);
            $(".maxPrice").html(maxPrice);
            $(".minPriceIn").val(ui.values[0]);
            $(".maxPriceIn").val(ui.values[1]);
        }
    });
    $("#amount").val($("#slider-vertical").slider("value"));
    $('.filter a').click(function() {
        $('#catalogBlock').hide()
        $('#loadingBlock').show()
        var thisClass = $(this).parents('ul').attr('class')
        var data = $(this).parent('li').attr('data')
        $('#' + thisClass).val(data)
        $(this).parents('ul').find('li').removeClass('active')
        $(this).parent('li').addClass('active')
        ajaxCatalogApp()
    });
    loading();
    $('.youPopup, .videoLink').click(function() {
        $('.videoBlock').html('<iframe src="' + $(this).attr('data-you') + '" frameborder="0" allowfullscreen></iframe>')
    });
    /*$('.close, .fade').click(function(){
    $('.videoBlock').html('')
    })*/
    /*
    adressSite("select.city option:selected")
    adressDillersSite("select.dillers option:selected")

    $('select.city').change(function () {
    adressSite("select.city option:selected")
    })

    $('select.dillers').change(function () {
    adressDillersSite("select.dillers option:selected")
    })
    */
    $('.slideToBlock li').click(function() {
            var id = parseInt($(this).attr('data-dotsid'))
            var block1 = $('#block-1').height();
            var block2 = block1 + $('#block-2').height() + 116;
            var block3 = block2 + $('#block-3').height() + 230;
            var block4 = block3 + $('#block-4').height() + 60;
            if (id == 1) $(window).scrollTo('0px', 800);
            if (id == 2) $(window).scrollTo(block1, 800);
            if (id == 3) $(window).scrollTo(block2, 800);
            if (id == 4) $(window).scrollTo(block3, 800);
            if (id == 5) $(window).scrollTo(block4, 800);
        })
        //ymaps.ready(init2);
    var myMap2;

    function init2() {
        myMap2 = new ymaps.Map("map2", {
            center: [55.76, 37.64],
            behaviors: ['default'],
            zoom: 3
        });
        $('.listMap div').each(function() {
            myPlacemark0 = new ymaps.Placemark([$(this).attr('x-prop'), $(this).attr('y-prop')], {
                balloonContent: "",
                hintContent: $(this).attr('info')
            }, {
                iconLayout: 'default#image',
                iconImageHref: '/html/img/balun.png',
                iconImageSize: [30, 30],
                iconImageOffset: [-30, -30]
            });
            myMap2.geoObjects
                .add(myPlacemark0)
        })
        myMap2.controls
            .add('zoomControl', {
                left: 20,
                top: 140
            })
            .add('typeSelector');
    }

    $('.dillers').change(function() {
        var c = $('.dillers option:selected').attr('mapAddr');
        var a = c.split(',');
        myMap2.setCenter(a, 13);
    });
    lightbox.option({
        'showImageNumberLabel': false
    });
    $('#youTubeModal, #modalVideoIndex').on('hidden.bs.modal', function(e) {
        $(this).find('.videoBlock').html('');
    });
    /* AJAX SENDING FORM */
    $('.ajax-send-email-form').on("submit", function(event) {
        event.preventDefault();
        $('.buttonBlock button, .ajax-send-email-form .btn').prop('disabled', true);
        var className = '';
        var error = false;
        $(this).find('input').each(function() {
            className = $(this).attr('class');
            if (className == 'name' || className == 'phone' || className == 'mail' || className == 'city') {
                if ($(this).val().length < 2) {
                    error = true;
                } else {
                    error = false;
                }
            }
        });
        var messagesSelector = $(this).find('.success-messages');
        if (!error) {
            var data = $(this).serialize();
            $.ajax({
                type: "POST",
                dataType: "json",
                url: "/ajax-receive/", //Relative or absolute path to response.php file
                data: data,
                success: function(responce) {
                    console.log(responce);
                    $('.buttonBlock button').prop('disabled', false);
                    if (responce.success === true) {
                        messagesSelector.html("");
                        messagesSelector.html('<div class="alert alert-success success-message text-center">' + responce.message + '</div>');
                        $('.ajax-send-email-form').each(function() {
                            $(this)[0].reset();
                            $(this).find(".modal").modal('hide');
                            var magnificPopup = $.magnificPopup.instance;
                            magnificPopup.close();

                        });
                        var dateTime = "";
                        if (typeof responce.dateTime !== 'undefined') {
                            dateTime = "Мы свяжемся с вами, <br>";
                            dateTime += responce.dateTime;
                        }
                        $("#success-send").modal('show');
                        setTimeout(function() {
                            $("#success-send").modal('hide')
                        }, 3000);
                        // $().insertBefore('.info-alert-success');
                    } else {
                        console.log(responce);
                        messagesSelector.html("");
                        messagesSelector.html('<div class="alert alert-danger success-message text-center">' + responce.message + '</div>');
                    }
                },
                error: function(responce) {
                    console.log(responce);
                    $('.buttonBlock button').prop('disabled', false);
                    messagesSelector.html("");
                    //messagesSelector.html('<div class="alert alert-success success-message text-center">' + responce.message + '</div>');
                    messagesSelector.html('<div class="alert alert-danger success-message text-center">' + responce.message + '</div>');
                }
            });
        } else {
            $('.buttonBlock button').prop('disabled', false);
            messagesSelector.html('<div class="alert alert-danger success-message text-center">Введите поля отмеченные звездочкой</div>');
        }
    });
    /*/ AJAX SENDING FORM */
    /* MENU */
    $("#showMenu").click(function() {
        var menushka = $(".lineMenu ul");
        menushka.css('display') == 'none' ? menushka.show() : menushka.hide();
    });
    // MENU MOBILE
    if (window.isMobile) {
        if (LANG !== "en") {
            $(".lineMenu").prepend('<a href="katalog" class="mobile-link-menu">Проекты</a> ' +
                '<a href="texnologiya" class="mobile-link-menu">Технология</a>' +
                '<a href="kontaktyi" class="mobile-link-menu">Контакты</a>');
        } else {
            $(".lineMenu").prepend('<a href="en/katalog" class="mobile-link-menu">Projects</a> ' +
                '<a href="en/texnologii" class="mobile-link-menu">Technology</a>' +
                '<a href="en/kontaktyi" class="mobile-link-menu">Contacts</a>');
        }
    }
    /* SEARCH FORM */
    if ($("form").is("#search-form-proj")) {
        var searchInput = "#search-form-proj input";
        $(searchInput).focus(function() {
            $(this).parents(".search-form").addClass("focus");
        });
        $(searchInput).blur(function() {
            $(this).parents(".search-form").removeClass("focus");
        });

        function listenChangesOnSearchForm(e) {
            e.preventDefault();
            $("#search-form-proj").submit();
            return false;
        }

        $(".search-submit").click(listenChangesOnSearchForm);
        /*/ SEARCH FORM */
        var xhrSearch = null;

        /* SEARCH AJAX */
        function searchAjax() {
            var data = {
                "search": $(searchInput).val()
            };
            xhrSearch = $.ajax({
                type: "GET",
                dataType: "html",
                url: "/search-ajax/",
                data: data,
                cache: true,
                beforeSend: function() {
                    $(".search-form-ajax").html("Идет поиск...");
                },
                success: function(responce) {
                    $(".search-form-ajax").html(responce);
                    if ($(".search-form-ajax").has("li").length !== 0) {
                        $(".search-form-ajax").append($("<li class='text-center'><a href class='search-submit'>Показать всё</a></li>"));
                        $(".search-submit").click(listenChangesOnSearchForm);
                    }
                },
                error: function(responce) {
                    console.log(responce);
                }
            });
        }

        $(searchInput).on('input', function() {
            if (xhrSearch) {
                xhrSearch.abort();
            }
            searchAjax();
        });
    }
    /*/ SEARCH AJAX */
    /* TECHNOLOGY */
    if ($("#technology-page").length > 0) {
        $("#technology-block1 a").click(function() {
            $("#technology-modal").modal('show');
            techModalPlayer.playVideo();
            return false;
        });
        $("#technology-modal .close").click(function() {
            $("#technology-modal").modal('hide');
            techModalPlayer.pauseVideo();
            return false;
        });
        $('#technology-modal').on('hide.bs.modal', function() {
            techModalPlayer.pauseVideo();
        });
    }
    /*/ TECHNOLOGY */
    /* AJAX COMPARE PROJECT */
    if ($("a").is("#proj-compare-link")) {
        function compare(change) {
            console.log("PROJECT LINK");
            var change = change || "false",
                data = {
                    "type": $("#proj-compare-link").data("type"),
                    "project_id": $("#project-id").val(),
                    "change": change
                };
            $.ajax({
                url: "nastrojki/sravnit-proektyi/",
                type: 'POST',
                data: data,
                dataType: 'json',
                cache: false,
                success: function(response) {
                    console.log(response);
                    if (response[0]) {
                        $("#proj-compare-link span").html(response[0]);
                    }
                    console.log(typeof response[1]);
                    if (typeof response[1] !== 'undefined') {
                        $.magnificPopup.open({
                            items: {
                                src: $('<div class="st-modal successfully-sent"> \
                                  <div class="modal-inner"> \
                                    <span class="tt-successfully-sent">Превышен лимит проектов для сравнения</span> \
                                  </div> \
                                </div>'),
                                type: 'inline'
                            }
                        });
                    }
                    check_sess();
                },
                error: function(response) {
                    console.error(response);
                }
            });
        }

        compare();
        $("#proj-compare-link").click(function() {
            compare("true");
            return false;
        });
    }
    /*/ AJAX COMPARE PROJECT */
    /* AJAX DELETE PROJECTS */
    $(".delete-proj").click(function() {
        deleteProj(this);
    });

    function deleteProj(name) {
        var project_id = $(name).data("del-id"),
            data = {
                "action": "delete",
                "project_id": project_id,
                "type": $("#delete-type").val()
            };
        $.ajax({
            url: "nastrojki/sravnit-proektyi/",
            type: 'POST',
            data: data,
            dataType: 'html',
            cache: false,
            success: function(response) {
                if (response) {
                    if (data.type === "compared_projects")
                        $("#compare-proj-block").html(response);
                } else {
                    if (data.type === "compared_projects")
                        $(".compare-proj-table-col[data-del-id=" + project_id + "]").remove();
                }
                $(".comparsion-table-td[data-del-id=" + project_id + "], .comparison-table-td[data-del-id=" + project_id + "]").remove();
                check_sess();
            },
            error: function(response) {
                console.error(response);
            }
        });
    }

    /*/ AJAX DELETE PROJECTS */

    /* AJAX CHECK SESSION */
    function check_sess() {
        $.ajax({
            url: "nastrojki/sravnit-proektyi/",
            type: 'POST',
            data: {
                "action": 'check'
            },
            dataType: 'html',
            cache: false,
            success: function(response) {
                console.log(response);
                $("#proj-bar-block").html(response);
            },
            error: function(response) {
                console.error(response);
            }
        });
    }

    check_sess();
    /*/ AJAX CHECK SESSION */
    /* PERSONAL DATA */
    /*function agree(){
    $(".ajax-send-email-form").each(function(){
    if($(this).find(".agree").is(':checked'))
    $(this).find(".send-after-agree").prop("disabled", false);
    else
    $(this).find(".send-after-agree").prop("disabled", true);
    });
    }
    agree();*/
    /*/ PERSONAL DATA */
    /*/Common*/
    /* YouTube iFrame */
    if ($("#technology-page").length > 0) {
        $(window).scroll(function() {
            $("#ytplayer").each(function() {
                if (userClick === false) {
                    if (($(window).scrollTop() + $(window).height() > $(this).offset().top + $(this).height()) &&
                        ($(window).scrollTop() < $(this).offset().top)) {
                        player.playVideo();
                    } else {
                        player.pauseVideo();
                    }
                }
            });
        });
    }
    /*/ YouTube iFrame */
});
/* YouTube iFrame */
var player,
    userClick = false;
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/player_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

function onYouTubePlayerAPIReady() {
    player = new YT.Player('ytplayer', {
        playerVars: {
            'autoplay': 0,
            'controls': 1,
            'autohide': 1,
            'wmode': 'opaque'
        },
        events: {
            'onReady': onPlayerReady
        }
    });
    techPlayer = new YT.Player('technology-video', {
        playerVars: {
            'autoplay': 1,
            'controls': 0,
            'autohide': 1,
            'wmode': 'opaque',
            'loop': 1
        },
        events: {
            'onReady': onPlayerReady
        }
    });
    techModalPlayer = new YT.Player('technology-video-modal', {
        playerVars: {
            'autoplay': 0,
            'controls': 1,
            'autohide': 1,
            'wmode': 'opaque'
        }
    });
}

function onPlayerReady(event) {
    event.target.mute();
}

/* After first click on frame */
var monitor = setInterval(function() {
    var elem = document.activeElement;
    if (elem && elem.tagName == 'IFRAME') {
        clearInterval(monitor);
        userClick = true;
        player.unMute();
    }
}, 100);
/* After first click on frame */
/*/ YouTube iFrame */
// DATE PICKER ON BACK CALL FORM
// DATE PICKER ON BACK CALL FORM
$(document).ready(function() {
    var datePickerSelector = "#datepick-backcall, .datepick-backcall",
        pickTimeSelector = ".pick-time",
        timeSelector = "#dropdown-datetimepicker",
        timeLabelSelector = "#dropdown-datetimepicker .label-time";
    var DatePicker = $(datePickerSelector).datepicker({
        minDate: 0,
        onSelect: onSelectDate,
        dateFormat: "d M",
        onChangeMonthYear: onChangeMonthYear
    });
    var dateTime = {
        curDate: DatePicker.val(),
        curDay: "",
        curTime: ""
    };
    $(".ui-datepicker-next").click(function() {
        return false;
    });
    $(".ui-datepicker-prev").click(function() {
        return false;
    });
    var curDate = new Date(),
        curTime = curDate.getHours();
    if (curTime >= 21) {
        $(datePickerSelector).datepicker("option", "minDate", "+1d");
    }
    if (curTime >= 12) {
        $(".pick-time-morning").addClass("disabled");
    }
    if (curTime >= 18) {
        $(".pick-time-day").addClass("disabled");
    }
    $(datePickerSelector).datepicker($.datepicker.regional["ru"]);
    $(".pick-time").click(onClickTime);

    function onChangeMonthYear() {
        setTimeout(function(argument) {
            $(".ui-datepicker-next").click(function() {
                return false;
            })
            $(".ui-datepicker-prev").click(function() {
                return false;
            })
        }, 100);
        return false;
    }

    function onClickTime(event) {
        event.preventDefault();
        if ($(this).hasClass("disabled")) return false;
        $(".pick-time").removeClass("active");
        $(this).toggleClass("active");
        // если мы выбрали в любое время
        if ($(this).hasClass("any-time")) {
            onChangeDateTime("В любое время");
            $(datePickerSelector).datepicker("refresh");
            $(timeSelector).dropdown('close');
        } else {
            dateTime.curDay = $(this).children(".day-time").text();
            dateTime.curTime = $(this).children(".time").text();
            onChangeDateTime();
        }
        return false;
    }

    function onSelectDate(datetime, inst) {
        $(".pick-time").removeClass("disabled");
        $(".pick-time").removeClass("active");
        var currentdate = new Date();
        if (currentdate.getMonth() == inst.selectedMonth &&
            currentdate.getFullYear() == inst.selectedYear &&
            currentdate.getUTCDate() == inst.selectedDay) {
            // Блокируем кнопки, которые ранее чем сейчас
            var currentTime = currentdate.getHours();
            if (currentTime >= 12) {
                $(".pick-time-morning").addClass("disabled");
            }
            if (currentTime >= 18) {
                $(".pick-time-day").addClass("disabled");
            }
        }
        dateTime.curDate = datetime;
        onChangeDateTime();
    }

    function onChangeDateTime(text) {
        var text = text ? text : dateTime.curDate + ", " + dateTime.curDay;
        $(timeLabelSelector).text(text);
        $("#dateTimePick, .dateTimePick").val(text + " " + dateTime.curTime);
    }

    var sliderPriceOne = null;
    // All projects
    if ($(".all-projects-view").length) {

        $(".stability a").click(function(e) {
            e.preventDefault();
            $(this).toggleClass("active");

            var curIt = 0;
            $(".stability a.active").each(function() {
                curIt += $(this).data("col");
            });
            if (curIt > 2) curIt = 0;
            $("input[name=storey]").val(curIt);
            ajaxCatalogAppNew(false);
            return false;
        });


        jcf.setOptions('Select', {
            wrapNative: false,
            multipleCompactStyle: true,
            maxVisibleItems: 6,
            useCustomScroll: false
        });

        jcf.replaceAll();


        sliderPriceOne = document.getElementById('sliderPriceOne');
        var oneinput0 = document.getElementById('input-with-sliderPriceOne-0');
        var oneinput1 = document.getElementById('input-with-sliderPriceOne-1');
        var oneinputs = [oneinput0, oneinput1];

        noUiSlider.create(sliderPriceOne, {
            start: [700000, 15000000],
            connect: true,
            step: 1000,
            tooltips: true,
            behaviour: 'tap',
            range: {
                'min': 700000,
                'max': 15000000
            },
            format: wNumb({
                decimals: 0,
                thousand: ' ',
                postfix: ' ₽',
            })

        });

        sliderPriceOne.noUiSlider.on('update', function(values, handle) {
            oneinputs[handle].value = values[handle];
        });

        sliderPriceOne.noUiSlider.on('change', function(values, handle) {
            ajaxCatalogAppNew(false);
        });

        function setSliderHandle(i, value) {
            var r = [null, null];
            r[i] = value;
            sliderPriceOne.noUiSlider.set(r);
        }

        function handleInputBeforeSend(value) {
            return parseInt(value.toString().replace(/ /g, "").replace(/₽/g, ""));
        }

        // Listen to keydown events on the input field.
        oneinputs.forEach(function(input, handle) {
            input.addEventListener('change', function() {
                setSliderHandle(handle, this.value);
            });
        });
    }

    if ($(".all-projects-view").length > 0) ajaxCatalogAppNew(false);

    $('.select-square-filter,input[name=storey],' +
        '.select-bedroom-filter,.select-garage-filter').change(function() {
        ajaxCatalogAppNew(false);
    });

    // Актуальная функция подгрузки товаров
    var offset = 0;
    var ajaxCatalogXHR = null;

    function ajaxCatalogAppNew(added) {
        console.log(ajaxCatalogXHR);
        if (ajaxCatalogXHR) {
            ajaxCatalogXHR.abort();
        }
        var added = added || false;
        if ($(".all-projects-view").length > 0) {
            if (added === false) {
                offset = 0;
            }
            var maxPrice = handleInputBeforeSend($('#input-with-sliderPriceOne-1').val());
            var minPrice = handleInputBeforeSend($('#input-with-sliderPriceOne-0').val());
            var areaHome = $('.select-square-filter').val();
            var storey = $('input[name=storey]').val();
            var bedrooms = $('.select-bedroom-filter').val();
            var garage = $('.select-garage-filter').val();
            var project_to_show_type = $('#project_to_show_type').val();
            var data = ("tvFilters", {
                "maxPrice": maxPrice,
                "minPrice": minPrice,
                "areaHome": areaHome,
                "storey": storey,
                "bedrooms": bedrooms,
                "garage": garage,
                "project_type": project_to_show_type,
                "offset": offset,
                "isNewCatalog": true
            });

            var i8n = {
                ajaxCatalogNew: {
                    ru: "nastrojki/proektyi-ajax-new/",
                    en: "nastrojki/proektyi-ajax-new/"
                }
            };
            var getLang = function() {
                var url = window.location.href;
                if (url.indexOf("/en/") !== -1) {
                    return "en";
                } else return "ru";
            };
            var LANG = getLang();

            ajaxCatalogXHR = $.ajax({
                type: "POST",
                url: i8n["ajaxCatalogNew"][LANG],
                data: data,
                beforeSend: function() {
                    $('#button-load-all-projects').hide();
                    $('#loading-all-projects').show();
                    if (added === false)
                        $('#catalogBlockNew').empty();
                },
                success: function(data) {
                    offset += 15;
                    $('#catalogBlockNew').append(data);
                    $('#catalogBlockNew').show();
                    $('#loading-all-projects').hide();
                    $('button.seeMore').data('offset', offset);
                    if (data) {
                        $('#button-load-all-projects').show();
                        $('#catalogBlockNew .col-catalog').each(function() {
                            $(this).css("display", "block");
                            $(this).animate({
                                opacity: 1
                            }, 1000, function() {});
                        });
                    }
                    yaCounter34848260.hit(window.location.href);
                },
                error: function(data) {
                    console.log(data);
                }
            });
        }
    }

    $('#button-load-all-projects').click(function(e) {
        e.preventDefault();
        ajaxCatalogAppNew(true);
        return false;
    });

    $("#button-reset-filter").click(function(e) {
        e.preventDefault();
        // значения по умолчанию для фильтра проектов
        $('#input-with-sliderPriceOne-1').val(15000000);
        $('#input-with-sliderPriceOne-0').val(700000);
        $('.select-square-filter').val(0);
        $('input[name=storey]').val(0);
        $(".stability a").addClass("active");
        $('.select-bedroom-filter').val(0);
        $('.select-garage-filter').val(0);

        jcf.refreshAll();
        ajaxCatalogAppNew(false);
        sliderPriceOne.noUiSlider.set([700000, 15000000]);
        return false;
    });

    loadingNew();

    function loadingNew() {
        $('#loading-all-projects span').typewriting(".....", {
            "typing_interval": 700,
            "blink_interval": "1s",
            "cursor_color": "#ffffff"
        }, function() {
            loadingNew()
        });
    }


    if ($(".project-page-view").length > 0) {
        $('.slider-card').owlCarousel({
            loop: true,
            nav: true,
            dots: false,
            items: 1,
            autoplay: false,
            autoplayTimeout: 5000,
            mouseDrag: false,
            center: true,
            responsive: {
                0: {
                    items: 1
                },
                1600: {
                    items: 2
                }
            }
        });
        $('.owl-slider-main').owlCarousel({
            thumbs: true,
            thumbImage: false,
            thumbsPrerendered: true,
            thumbContainerClass: 'owl-thumbs',
            thumbItemClass: 'owl-thumb-item',
            nav: true,
            items: 1
        });

        $('.slider-card-bl').slick({
            dots: false,
            infinite: true,
            speed: 300,
            slidesToShow: 1,
            centerMode: true,
            variableWidth: true
        });

        jcf.setOptions('Select', {
            wrapNative: false,
            multipleCompactStyle: true,
            maxVisibleItems: 6,
            useCustomScroll: false
        });

        //checkbox
        ! function(e) {
            e.addModule(function(e) {
                "use strict";
                return {
                    name: "Checkbox",
                    selector: 'input[type="checkbox"]',
                    options: {
                        wrapNative: !0,
                        checkedClass: "jcf-checked",
                        uncheckedClass: "jcf-unchecked",
                        labelActiveClass: "jcf-label-active",
                        fakeStructure: '<span class="jcf-checkbox"><span></span></span>'
                    },
                    matchElement: function(e) {
                        return e.is(":checkbox")
                    },
                    init: function() {
                        this.initStructure(), this.attachEvents(), this.refresh()
                    },
                    initStructure: function() {
                        this.doc = e(document), this.realElement = e(this.options.element), this.fakeElement = e(this.options.fakeStructure).insertAfter(this.realElement), this.labelElement = this.getLabelFor(), this.options.wrapNative ? this.realElement.appendTo(this.fakeElement).css({
                            position: "absolute",
                            height: "100%",
                            width: "100%",
                            opacity: 0,
                            margin: 0
                        }) : this.realElement.addClass(this.options.hiddenClass)
                    },
                    attachEvents: function() {
                        this.realElement.on({
                            focus: this.onFocus,
                            click: this.onRealClick
                        }), this.fakeElement.on("click", this.onFakeClick), this.fakeElement.on("jcf-pointerdown", this.onPress)
                    },
                    onRealClick: function(e) {
                        var t = this;
                        this.savedEventObject = e, setTimeout(function() {
                            t.refresh()
                        }, 0)
                    },
                    onFakeClick: function(e) {
                        this.options.wrapNative && this.realElement.is(e.target) || this.realElement.is(":disabled") || (delete this.savedEventObject, this.stateChecked = this.realElement.prop("checked"), this.realElement.prop("checked", !this.stateChecked), this.fireNativeEvent(this.realElement, "click"), this.savedEventObject && this.savedEventObject.isDefaultPrevented() ? this.realElement.prop("checked", this.stateChecked) : this.fireNativeEvent(this.realElement, "change"), delete this.savedEventObject)
                    },
                    onFocus: function() {
                        this.pressedFlag && this.focusedFlag || (this.focusedFlag = !0, this.fakeElement.addClass(this.options.focusClass), this.realElement.on("blur", this.onBlur))
                    },
                    onBlur: function() {
                        this.pressedFlag || (this.focusedFlag = !1, this.fakeElement.removeClass(this.options.focusClass), this.realElement.off("blur", this.onBlur))
                    },
                    onPress: function(e) {
                        this.focusedFlag || "mouse" !== e.pointerType || this.realElement.focus(), this.pressedFlag = !0, this.fakeElement.addClass(this.options.pressedClass), this.doc.on("jcf-pointerup", this.onRelease)
                    },
                    onRelease: function(e) {
                        this.focusedFlag && "mouse" === e.pointerType && this.realElement.focus(), this.pressedFlag = !1, this.fakeElement.removeClass(this.options.pressedClass), this.doc.off("jcf-pointerup", this.onRelease)
                    },
                    getLabelFor: function() {
                        var t = this.realElement.closest("label"),
                            s = this.realElement.prop("id");
                        return !t.length && s && (t = e('label[for="' + s + '"]')), t.length ? t : null
                    },
                    refresh: function() {
                        var e = this.realElement.is(":checked"),
                            t = this.realElement.is(":disabled");
                        this.fakeElement.toggleClass(this.options.checkedClass, e).toggleClass(this.options.uncheckedClass, !e).toggleClass(this.options.disabledClass, t), this.labelElement && this.labelElement.toggleClass(this.options.labelActiveClass, e)
                    },
                    destroy: function() {
                        this.options.wrapNative ? this.realElement.insertBefore(this.fakeElement).css({
                            position: "",
                            width: "",
                            height: "",
                            opacity: "",
                            margin: ""
                        }) : this.realElement.removeClass(this.options.hiddenClass), this.fakeElement.off("jcf-pointerdown", this.onPress), this.fakeElement.remove(), this.doc.off("jcf-pointerup", this.onRelease), this.realElement.off({
                            focus: this.onFocus,
                            click: this.onRealClick
                        })
                    }
                }
            })
        }(jcf);


        jcf.replaceAll();

        //  КАЛЬКУЛЯТОР ФОРМЫ КОМПЛЕКТАЦИИ В ПРОЕКТЕ
        // ЭМУЛИРУЕМ РАДИО КНОПКУ на стены 200 300
        $("input[name='wall-price-2']").change(function() {
            if ($("input[name='wall-price-2']").attr("checked"))
                $("input[name='wall-price-3']").attr("checked", false);
            jcf.refreshAll();
        });
        $("input[name='wall-price-3']").change(function() {
            if ($("input[name='wall-price-3']").attr("checked"))
                $("input[name='wall-price-2']").attr("checked", false);
            jcf.refreshAll();
        });

        $(".bundling-form input").change(function() {
            // ФОРМАТИРОВАНИЕ ПРОБЕЛАМИ ЦЕНЫ
            $("#bundling-form-price").text(calculateCost().toString().replace(/\B(?=(\d{3})+(?!\d))/g, " "));
            // Показываем нужные пункты комплектации, скрываем ненужные
            $(".description-complete-cont > div").hide();
            $("#request-complectation > .send-request-item").hide();
            $("#request-complectation input[name=complectation]").val("");
            $(".bundling-form").serializeArray().map(function(input) {
                $("#description-" + input.name).show();
                $("#form-" + input.name).show();
                var form = $("#request-complectation input[name=complectation]");
                form.val(form.val() + humanizeComplect(input.name));
            });

            function humanizeComplect(input) {
                switch (input) {
                    case "fundament":
                        return "Фундамент, ";
                    case "wall-price-2":
                        return "Стена 200мм, ";
                    case "wall-price-3":
                        return "Стена 300мм, ";
                    case "roof_price":
                        return "Крыша, ";
                    case "wood":
                        return "Окна (дерево), ";
                }
            }
        });

        function calculateCost() {
            var arr = $(".bundling-form").serializeArray();
            var sum = arr.reduce(function(sum, cur) {
                return sum + parseInt(cur.value);
            }, 0);
            return sum;
        }

        function openDescription(callback) {
            var container = $(".tt-description-complete");
            var element = container.children('span').eq(1);

            element.text(element.text() === "Свернуть" ? "Развернуть" : "Свернуть");

            if (container.parent().is('.description-complete-open')) {
                container.parent().removeClass('description-complete-open');
            } else {
                container.parent().addClass('description-complete-open');
            }
            if (typeof callback === "function") callback();
        }

        // раскрываем комплектацию
        //$('.tt-description-complete').click(openDescription);
        $('.btn-open-description').click(function() {
            openDescription.call(null, function() {
                $("html,body").animate({
                    scrollTop: $('.description-complete-section').offset().top - 50
                }, 'slow')
            });
        });

        $('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
            disableOn: 700,
            type: 'iframe',
            mainClass: 'mfp-fade',
            removalDelay: 160,
            preloader: false,
            fixedContentPos: false
        });

        $('.open-modal').magnificPopup({
            type: 'inline',
            midClick: true
        });
        $('.open-modal').click(function(e) {
            e.preventDefault();
            return false;
        });
        $('.bundling-cont-bl.disabled').magnificPopup({
            items: {
                src: $('<div class="st-modal successfully-sent"> \
                  <div class="modal-inner"> \
                    <span class="tt-successfully-sent">В данном проекте расчет фундамента производится по запросу.</span> \
                  </div> \
                </div>'),
                type: 'inline'
            }
        });
    }
    $('.owl-slider-main').owlCarousel({
        thumbs: true,
        thumbImage: false,
        thumbsPrerendered: true,
        thumbContainerClass: 'owl-thumbs',
        thumbItemClass: 'owl-thumb-item',
        nav: true,
        items: 1,
        onInitialized: function(argument) {
            $(".owl-thumb-item").click(function() {
                console.log("Scrolling");
                $('html, body').animate({
                    scrollTop: $(".owl-slider-main-img").offset().top - 70
                }, 500);
            })
        }

    });

    $('.gallery-carousel').each(function() {
        $(this).magnificPopup({
            delegate: 'a',
            type: 'image',
            tLoading: 'Loading image #%curr%...',
            mainClass: 'mfp-fade',
            removalDelay: 0,
            gallery: {
                enabled: true,
                navigateByImgClick: true,
                tCounter: '<span class="mfp-counter"><i>%curr%</i> / %total%</span>',
                preload: [0, 1] // Will preload 0 - before current, and 1 after the current image
            },
            image: {
                tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
                titleSrc: function(item) {
                    return item.el.attr('title');
                }
            }
        });

    });


    // Dilers PAGE
    $(".dillers-bottom-scroll").click(function(e) {
        $("html, body").animate({
            scrollTop: $(".form-application").offset().top - 100
        }, "slow");
        e.preventDefault();
        return false;
    })

    $('.youtube-playlist-open').magnificPopup({
        type: 'inline',
        midClick: true,
        preloader: true,
        callback: {
            open: function() {}
        }
    });

    $(".youtube-playlist-open").click(function(argument) {
        var commonOptions = {
            api_key: 'AIzaSyCdSNTThIIh2B4N2GU7Ud98RVy7dcMdbvU',
            channel: false,
            user: false,
            videos: false,
            shuffle: false,
            max_results: 50,
            pagination: true,
            continuous: true,
            first_video: 0,
            show_playlist: true,
            playlist_type: 'vertical',
            show_channel_in_playlist: true,
            show_channel_in_title: true,
            width: true,
            show_annotations: false,
            now_playing_text: 'Воспроизводится',
            load_more_text: 'Загрузить еще',
            autoplay: false,
            force_hd: true,
            hide_youtube_logo: false,
            play_control: true,
            time_indicator: 'full',
            volume_control: true,
            share_control: true,
            fwd_bck_control: true,
            youtube_link_control: true,
            fullscreen_control: true,
            playlist_toggle_control: true,
            volume: false,
            show_controls_on_load: true,
            show_controls_on_pause: true,
            show_controls_on_play: false,
            hide_youtube_logo: true,
            related: false,
            player_vars: {},
            colors: {
                buttons_hover: 'rgba(241, 128, 88, 1)',
                video_channel: 'rgba(241, 128, 88, 1)',
                playlist_channel: 'rgba(241, 128, 88, 1)',
            }
        };
        playlistOtzivi = commonOptions;
        playlistOtzivi.playlist = $(this).data("playlist");
        console.log($(this).data("playlist"));

        $("#video-player").youtube_video(playlistOtzivi);

    })
    $('.open-modal').click(function(e) {
        e.preventDefault();
        return false;
    });

    $('.open-modal').magnificPopup({
        type: 'inline',
        midClick: true
    });


    $(".link-more-cont").click(function(e) {
        console.log("The", $(this).children(".review-img-src").val());
        $("#review-project-name").text($(this).children(".review-project-name").val());
        $("#review-person").text($(this).children(".review-person").val());
        $("#review-full-descr").html($(this).children(".review-full-text").html());
        $("#review-image").attr("src", $(this).children(".review-img-src").val());
    });


    $(".c-review-all__slider").slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        speed: 1000,
        fade: true,
        arrows: true,
        draggable: true,
        swipe: true,
        dots: true,
        autoplay: false,
    });

});