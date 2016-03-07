function getActiveTabUrl() {
    if ((tab_url.includes("http://") || tab_url.includes("https://")) && (tab_url = tab_url.includes("http://") ? tab_url.split("http://") : tab_url.split("https://")),
    tab_url[1].includes("www.") && (tab_url = tab_url[1].split("www.")),
    tab_url_domain = tab_url[1].split("/")[0],
    split_tab_domain = tab_url_domain.split("."),
    !(split_tab_domain.length > 2))
        return tab_url_domain;
    if (3 == split_tab_domain.length && tab_url_domain.includes("co.uk"))
        return tab_url_domain;
    if (4 == split_tab_domain.length)
        return split_tab_domain[2] + "." + split_tab_domain[3];
    try {
        return void 0 != split_tab_domain[3] ? split_tab_domain[1] + "." + split_tab_domain[2] : split_tab_domain[1] + "." + split_tab_domain[2]
    } catch (e) {
        return tab_url_domain
    }
}
function item_data(e, t, a, s, n, r) {
    return {
        link: e,
        img_src: t,
        desc: a,
        qty: s,
        price: n,
        item_id: r
    }
}
function logError(e) {
    return chrome.runtime.sendMessage({
        action: "error_report",
        tab_domain: e
    }),
    errorEncountered()
}
function siteNotFound() {
    return itemArray = ["site_not_parsed"],
    itemArray
}
function errorEncountered() {
    return itemArray = ["error_encountered"],
    itemArray
}
function parseAmazonUS(e) {
    var t = [];
    try {
        for (var a = e.getElementsByClassName("sc-list-body")[0], s = a.getElementsByClassName("a-row sc-list-item  sc-list-item-border"), n = 0; n < s.length; n++) {
            var r = s[n].getAttribute("data-quantity")
              , l = s[n].getAttribute("data-price")
              , m = s[n].getElementsByClassName("sc-item-product-image")[0].children[0]
              , i = m.children[0]
              , g = i.getAttribute("alt")
              , c = i.getAttribute("src")
              , y = s[n].getElementsByClassName("a-list-item")[0]
              , u = "http://www.amazon.com" + y.children[0].getAttribute("href")
              , o = ""
              , h = item_data(u, c, g, r, l, o);
            t.push(h)
        }
    } catch (d) {}
    return t
}
function parseAmazonUK(e) {
    var t = [];
    try {
        for (var a = e.getElementsByClassName("sc-list-body")[0], s = a.getElementsByClassName("a-row sc-list-item  sc-list-item-border"), n = 0; n < s.length; n++) {
            var r = s[n].getAttribute("data-quantity")
              , l = s[n].getAttribute("data-price")
              , m = s[n].getElementsByClassName("sc-item-product-image")[0].children[0]
              , i = m.children[0]
              , g = i.getAttribute("alt")
              , c = i.getAttribute("src")
              , y = s[n].getElementsByClassName("a-list-item")[0]
              , u = "http://www.amazon.com" + y.children[0].getAttribute("href")
              , o = ""
              , h = item_data(u, c, g, r, l, o);
            t.push(h)
        }
    } catch (d) {}
    return t
}
function parseEverything5Pounds(e) {
    var t, a = [];
    try {
        for (var s = e.getElementsByClassName("content clearfix")[0].getElementsByTagName("table")[0].getElementsByTagName("tr"), n = 0; n < s.length && s[n].hasAttribute("class"); n++) {
            var r = s[n].children
              , l = r[0].children[0].children[0].src
              , m = "http://www.everything5pounds.co.uk" + r[0].children[0].href
              , i = r[0].children[0].children[0].alt
              , g = ""
              , c = r[1].children[0].innerText.split(" ")[0].substring(1)
              , y = r[2].children[0].value;
            t = item_data(m, l, i, y, c, g),
            a.push(t)
        }
    } catch (u) {
        return logError(tab_domain)
    }
}
function parseCarters(e) {
    var t = [];
    try {
        for (var a = e.getElementsByClassName("cart-row"), s = 0; s < a.length; s++) {
            var n = a[s].getElementsByClassName("item-image")[0].children[0]
              , r = n.getAttribute("src")
              , l = a[s].getElementsByClassName("name")[0].innerText
              , m = a[s].getElementsByClassName("name")[0]
              , i = m.children[0].getAttribute("href")
              , g = a[s].getElementsByClassName("sku")[0].innerText.substring(8)
              , c = a[s].getElementsByClassName("value")[0].innerText
              , y = a[s].getElementsByClassName("attribute Color")[0].innerText.substring(8)
              , u = a[s].getElementsByClassName("price-sales")[0].innerText.substring(1)
              , o = a[s].getElementsByClassName("quantityinput double-arrow")[0].value
              , h = item_data(i, r, l, o, u, g, y, c);
            t.push(h)
        }
    } catch (d) {}
    return t
}
function parseBabyStep(e) {
    var t = [];
    try {
        for (var a = e.getElementsByClassName("cart-info")[0].getElementsByTagName("tbody")[0], s = a.getElementsByTagName("tr"), n = 0; n < s.length; n++) {
            var r, l = s[n].getElementsByTagName("a")[0].children[0], m = l.getAttribute("src"), i = s[n].getElementsByClassName("name")[0], g = i.getElementsByTagName("a")[0].innerText, c = s[n].getElementsByClassName("name")[0], y = c.children[0].getAttribute("href");
            try {
                r = s[n].getElementsByTagName("small")[0].innerText
            } catch (u) {}
            var o = s[n].getElementsByClassName("model")[0].innerText
              , h = s[n].getElementsByClassName("quantity")[0].children[0].getAttribute("value")
              , d = s[n].getElementsByClassName("price")[0].innerText.substring(1)
              , N = item_data(y, m, g, h, d, o, r);
            t.push(N)
        }
    } catch (B) {}
    return t
}
function parseVertBaudet(e) {
    var t = [];
    try {
        for (var a = e.getElementsByClassName("memo_chko_panier")[0], s = a.getElementsByClassName("memo_chko_article"), n = 0; n < s.length; n++) {
            var r = s[n].getElementsByClassName("memo_chko_article_visuel")[0].children[0]
              , l = r.getAttribute("src")
              , m = s[n].getElementsByClassName("memo_chko_article_nom")[0].innerText
              , i = s[n].getElementsByClassName("memo_chko_article_nom")[0]
              , g = "http://www.vertbaudet.co.uk" + i.children[0].getAttribute("href")
              , c = s[n].getElementsByClassName("memo_chko_article_reference")[0].innerText.substring(6)
              , y = s[n].getElementsByClassName("memo_chko_article_taille")[0].innerText.substring(7)
              , u = s[n].getElementsByClassName("memo_chko_article_colori")[0].innerText
              , o = s[n].getElementsByClassName("memo_chko_article_prix_apayer")[0].innerText.substring(1)
              , h = s[n].getElementsByClassName("memo_chko_article_quantite")[0]
              , d = h.getElementsByTagName("select")[0].value
              , N = item_data(g, l, m, d, o, c, u, y);
            t.push(N)
        }
    } catch (B) {}
    return t
}
function parseAlexAndAlexa(e) {
    var t = [];
    try {
        for (var a = e.getElementsByClassName("cart-items")[0], s = a.getElementsByClassName("cart-item row"), n = 0; n < s.length; n++) {
            var r, l = s[n].getElementsByTagName("img")[0].getAttribute("src"), m = s[n].getElementsByClassName("brand")[0].innerText, i = s[n].getElementsByClassName("name")[0].innerText, g = m + " " + i, c = s[n].getElementsByClassName("info c-10 last")[0], y = "http://www.alexandalexa.com" + c.children[0].getAttribute("href"), u = s[n].getElementsByClassName("info c-10 last")[0], o = u.getElementsByTagName("p")[2].innerText, h = s[n].getElementsByClassName("lowest-price")[0].innerText.substring(1);
            try {
                r = s[n].getElementsByClassName("quantity")[0].innerText.replace(" x", "")
            } catch (d) {
                r = 1
            }
            var N = item_data(y, l, g, r, h, o);
            t.push(N)
        }
    } catch (B) {}
    return t
}
function parseTrotters(e) {
    var t = [];
    try {
        for (var a = e.getElementsByClassName("cart-table data-table")[0], s = a.querySelectorAll(".odd, .last odd, .first odd, .even, .last even"), n = 0; n < s.length; n++) {
            var r;
            try {
                img_src_hold = s[n].getElementsByTagName("a")[0].children[0];
                var r = img_src_hold.getAttribute("src")
            } catch (l) {
                img_src_holder = s[n].getElementsByClassName("product-cart-image")[0].children[0],
                r = img_src_holder.getAttribute("src")
            }
            var m, i = s[n].getElementsByClassName("product-name")[0].innerText;
            try {
                item_des_link = s[n].getElementsByClassName("product-name")[0],
                m = item_des_link.children[0].getAttribute("href")
            } catch (l) {
                m = []
            }
            var g, c = s[n].getElementsByClassName("product-cart-sku")[0].innerText.replace("SKU:", "").trim();
            try {
                color1 = s[n].getElementsByClassName("item-options")[0],
                g = color1.getElementsByTagName("dd")[0].innerText
            } catch (l) {}
            var y;
            try {
                size1 = s[n].getElementsByClassName("item-options")[0],
                y = size1.getElementsByTagName("dd")[1].innerText
            } catch (l) {}
            var u = s[n].getElementsByClassName("price")[0].innerText.substring(1)
              , o = s[n].getElementsByClassName("qty-box")[0]
              , h = o.getElementsByTagName("input")[0].getAttribute("value")
              , d = item_data(m, r, i, h, u, y, c, g);
            t.push(d)
        }
    } catch (N) {}
    return t
}
function parseChildrenSalon(e) {
    var t = [];
    try {
        for (var a = e.getElementsByClassName("cart-table")[0], s = a.querySelectorAll(".odd, .last odd, .first odd, .even, .last even"), n = 0; n < s.length; n++) {
            var r = s[n].getElementsByTagName("a")[0].children[0]
              , l = r.getAttribute("style").replace("background-image:url(", "").split(")")
              , m = l[0]
              , i = s[n].getElementsByClassName("designer")[0].innerText
              , g = s[n].getElementsByClassName("inner")[0].innerText
              , c = i + " " + g
              , y = s[n].getElementsByClassName("inner")[0]
              , u = y.children[0].getAttribute("href")
              , o = s[n].getElementsByClassName("sku")[0].innerText.substring(6)
              , h = s[n].getElementsByClassName("size-option-inner")[0].innerText.substring(6).trim()
              , d = s[n].getElementsByClassName("item-option item-color")[0].innerText.substring(7).trim()
              , N = s[n].getElementsByClassName("price")[0].innerText.substring(1)
              , B = s[n].getElementsByClassName("qty-col")[0]
              , E = B.getElementsByTagName("select")[0].value
              , p = item_data(u, m, c, E, N, o, d, h);
            t.push(p)
        }
    } catch (T) {}
    return t
}
function parseMamasAndPapas(e) {
    var t = [];
    try {
        for (var a = e.getElementsByClassName("standarditem"), s = 0; s < a.length; s++) {
            var n, r = a[s].getElementsByTagName("a")[0].children[0], l = r.getAttribute("src"), m = a[s].getElementsByClassName("name")[0], i = m.getElementsByTagName("a")[0].innerText, g = a[s].getElementsByClassName("name")[0], c = g.children[0].getAttribute("href"), y = a[s].getElementsByClassName("sku")[0].innerText.substring(11);
            try {
                size1 = a[s].getElementsByClassName("quantity")[0],
                size2 = size1.getElementsByTagName("div")[1],
                n = size2.getElementsByClassName("optionRight")[0].innerText
            } catch (u) {}
            var o;
            try {
                o = a[s].getElementsByClassName("optionRight")[0].children[0].getAttribute("value")
            } catch (u) {
                qty1 = a[s].getElementsByClassName("quantity")[0],
                qty2 = qty1.getElementsByClassName("optionBox")[1],
                o = qty2.getElementsByClassName("optionRight")[0].children[0].getAttribute("value")
            }
            var h = a[s].getElementsByClassName("now")[0].innerText.substring(1)
              , d = h / o
              , N = item_data(c, l, i, o, d, y, n);
            t.push(N)
        }
    } catch (B) {}
    return t
}
function parseGltc(e) {
    var t = [];
    try {
        for (var a = e.getElementsByTagName("table")[0], s = a.querySelectorAll(".basket_line.first.border, .basket_line.border, .basket_line.last, .basket_line.last border"), n = 0; n < s.length; n++) {
            var r, l = s[n].getElementsByTagName("a")[0].children[0], m = l.getAttribute("src"), i = s[n].getElementsByClassName("product_title")[0].innerText, g = s[n].getElementsByClassName("product_title")[0], c = g.children[0].getAttribute("href");
            try {
                r = s[n].getElementsByClassName("value")[0].innerText
            } catch (y) {}
            var u = s[n].getElementsByClassName("unit_price")[0].innerText.substring(1)
              , o = s[n].getElementsByClassName("qty")[0].innerText
              , h = item_data(c, m, i, o, u, r);
            t.push(h)
        }
    } catch (d) {}
    return t
}
function parseMulberryBush(e) {
    var t = [];
    try {
        for (var a = e.getElementsByClassName("cart footable-loaded footable default")[0], s = a.getElementsByClassName("cart-item-row"), n = 0; n < s.length; n++) {
            var r = s[n].getElementsByTagName("img")[0].getAttribute("src")
              , l = s[n].getElementsByClassName("product")[0].innerText
              , m = s[n].getElementsByClassName("product")[0]
              , i = "https://www.mulberrybush.co.uk" + m.children[0].getAttribute("href")
              , g = (s[n].getElementsByClassName("sku nobr")[0].innerText,
            s[n].getElementsByClassName("product-unit-price")[0].innerText.substring(1))
              , c = s[n].getElementsByClassName("qty nobr")[0].children[0].getAttribute("value")
              , y = item_data(i, r, l, c, g);
            t.push(y)
        }
    } catch (u) {}
    return t
}
function parseBarnesAndNoble(e) {
    var t = [];
    try {
        for (var a = e.getElementsByClassName("content-shadow")[1], s = a.getElementsByTagName("div")[0].getElementsByTagName("ul")[0].querySelectorAll("#cartItems > li:not([class])"), n = 0; n < s.length; n++) {
            var r = "http:" + s[n].getElementsByTagName("a")[0].children[0].getAttribute("src")
              , l = s[n].getElementsByClassName("product-title")[0].innerText
              , m = s[n].getElementsByClassName("product-desc")[0]
              , i = "https://www.barnesandnoble.com" + m.children[0].getAttribute("href")
              , g = s[n].getElementsByClassName("item-price")[0].innerText.substring(1)
              , c = s[n].getElementsByClassName("mini-cart-quantity-update")[0].children[6].getAttribute("value");
            item_data(i, r, l, c, g)
        }
    } catch (y) {}
    return t
}
function parseBarneys(e) {
    var t = [];
    try {
        for (var a = e.getElementsByClassName("cart-row"), s = 0; s < a.length; s++) {
            var n, r = a[s].getElementsByTagName("a")[0].children[0], l = r.getAttribute("src"), m = a[s].getElementsByClassName("brand")[0].innerText.trim(), i = a[s].getElementsByClassName("name")[0].innerText.trim(), g = m + " " + i.trim(), c = a[s].getElementsByClassName("item-edit-details hidden-xs")[0], y = "https://www.barneys.com" + c.children[0].getAttribute("href"), u = a[s].getElementsByClassName("sku")[0], o = u.getElementsByClassName("value")[0].innerText;
            try {
                var n = a[s].getElementsByClassName("false hide-xs")[0].innerText
            } catch (h) {}
            var d, N = a[s].getElementsByClassName("item-quantity")[0].children[1].getAttribute("value");
            try {
                d = a[s].getElementsByClassName("pricesales")[0].innerText.substring(1)
            } catch (h) {
                d = a[s].getElementsByClassName("price-sales")[0].innerText.substring(1)
            }
            var B = item_data(y, l, g, N, d, o, n);
            t.push(B)
        }
    } catch (E) {}
    return t
}
function parseRiverIsland(e) {
    var t, a = [];
    try {
        for (var s = e.getElementsByClassName("table-basket")[0].getElementsByTagName("tr"), n = 1; n < s.length; n++) {
            var r = s[n].children
              , l = "http://www.riverisland.com" + r[0].children[0].children[0].children[0].getAttribute("href")
              , m = r[0].children[0].children[0].children[0].children[0].getAttribute("src")
              , i = r[0].children[0].children[0].children[1].innerText
              , g = r[2].children[1].innerText.substring(4)
              , c = r[0].children[0].children[0].children[2].children[0].children[0].innerText.substring(1)
              , y = "";
            t = item_data(l, m, i, g, c, y),
            a.push(t)
        }
    } catch (u) {}
    return a
}
function parseSammydress(e) {
    var t, a = [];
    try {
        for (var s = e.getElementsByClassName("products clearfix"), n = 0; n < s.length; n++) {
            var r = s[n].children
              , l = r[0]
              , m = r[1]
              , i = r[2]
              , g = l.children[1].children[0].getAttribute("href")
              , c = l.children[1].children[0].children[0].getAttribute("src")
              , y = l.children[2].children[0].children[0].innerText
              , u = m.children[1].getAttribute("value")
              , o = i.children[1].children[1].innerText.substring(1)
              , h = "";
            t = item_data(g, c, y, u, o, h),
            a.push(t)
        }
    } catch (d) {}
    return a
}
function parseDSW(e) {
    var t, a = [];
    try {
        for (var s = e.getElementsByClassName("comItemContainer"), n = 0; n < s.length; n++) {
            var r = s[n].children
              , l = r[0]
              , m = r[1]
              , i = l.children[0].children[1].innerText.substring(5)
              , g = "https://www.dsw.com" + l.children[0].children[0].children[0].getAttribute("href")
              , c = m.children[0].children[0].getAttribute("src")
              , y = l.children[0].children[0].children[0].innerText
              , u = m.children[4].innerText.substring(3)
              , o = m.children[3].children[1].innerText.substring(1);
            t = item_data(g, c, y, u, o, i),
            a.push(t)
        }
    } catch (h) {}
    return a
}
function parseSportsDirect(e) {
    var t, a = [];
    try {
        for (var s = e.querySelectorAll(".AspNet-GridView-Normal, .AspNet-GridView-Alternate"), n = 0; n < s.length; n++) {
            var r = s[n].children
              , l = r[1].children[1].children[0].innerText
              , m = "http://www.sportsdirect.com" + r[0].children[3].getAttribute("href")
              , i = r[0].children[3].children[0].getAttribute("src")
              , g = r[1].children[0].innerText
              , c = r[2].children[2].children[0].getAttribute("value")
              , y = r[3].children[1].innerText.substring(1);
            t = item_data(m, i, g, c, y, l),
            a.push(t)
        }
    } catch (u) {}
    return a
}
function parseBebe(e) {
    var t, a = [];
    try {
        for (var s = e.getElementsByClassName("tableRow twelve columns actual"), n = 0; n < s.length; n++) {
            var r = s[n].children
              , l = r[0]
              , m = r[1]
              , i = m.children[0].children[1].children[0].innerText.substring(4)
              , g = m.children[0].children[0].getAttribute("href")
              , c = l.children[0].children[1].children[0].getAttribute("src")
              , y = m.children[0].children[0].innerText
              , u = 1
              , o = m.children[1].children[0].innerText.substring(1);
            t = item_data(g, c, y, u, o, i),
            a.push(t)
        }
    } catch (h) {}
    return a
}
function parseClarksUsa(e) {
    var t, a = [];
    try {
        for (var s = e.getElementsByClassName("cartItem"), n = 0; n < s.length; n++) {
            var r = s[n].children
              , l = r[1].children[2].innerText
              , m = "http://www.clarksusa.com" + r[0].children[0].getAttribute("href")
              , i = "http:" + r[0].children[0].children[0].getAttribute("src")
              , g = r[1].children[1].innerText + "-" + r[1].children[0].innerText
              , c = r[4].children[0].children[2].getAttribute("value")
              , y = r[5].children[0].innerText.substring(1);
            t = item_data(m, i, g, c, y, l),
            a.push(t)
        }
    } catch (u) {}
    return a
}
function parseLavishAlice(e) {
    var t, a = [];
    try {
        for (var s = e.getElementsByClassName("basket_row"), n = 0; n < s.length; n++) {
            var r = s[n].children
              , l = " "
              , m = "http://www.lavishalice.com" + r[0].children[0].getAttribute("href")
              , i = "http://www.lavishalice.com" + r[0].children[0].children[0].getAttribute("src")
              , g = r[0].children[0].children[0].getAttribute("alt")
              , c = r[2].children[0].children[0].children[0].children[0].children[0].getAttribute("value")
              , y = r[4].children[0].children[0].children[0].innerText.substring(1);
            t = item_data(m, i, g, c, y, l),
            a.push(t)
        }
    } catch (u) {}
    return a
}
function parseBabysecurity(e) {
    var t, a = [], s = e.getElementsByClassName("data-table cart-table")[0].getElementsByTagName("tbody")[0].getElementsByTagName("tr");
    try {
        for (var n = 0; n < s.length; n++) {
            var r = s[n].children
              , l = " "
              , m = r[0].children[0].getAttribute("href")
              , i = r[0].children[0].children[0].getAttribute("src")
              , g = r[1].children[0].children[0].innerText
              , c = r[3].children[1].children[0].innerText.substring(1)
              , y = r[4].children[1].getAttribute("value");
            t = item_data(m, i, g, y, c, l),
            a.push(t)
        }
    } catch (u) {}
    return a
}
function parseThefragranceshop(e) {
    var t, a = [], s = e.getElementsByClassName("bskTableV2")[0].getElementsByClassName("basketitem noborderbottom");
    try {
        for (var n = 0; n < s.length; n++) {
            var r = s[n].children
              , l = " "
              , m = r[1].children[0].children[0].children[0].getAttribute("href")
              , i = r[0].children[0].children[0].getAttribute("src")
              , g = r[0].children[0].children[0].getAttribute("alt")
              , c = r[2].children[0].children[0].innerText
              , y = r[3].children[0].children[1].innerText;
            t = item_data(m, i, g, y, c, l),
            a.push(t)
        }
    } catch (u) {}
    return a
}
function parseBoots(e) {
    var t, a = [];
    try {
        for (var s = e.getElementsByClassName("dataTable basketList")[0].getElementsByClassName("basketItem"), n = 0; n < s.length; n++) {
            var r = s[n].children
              , l = r[1].children[0].children[1].innerText
              , m = r[1].children[0].children[0].getAttribute("href")
              , i = r[0].children[0].children[0].getAttribute("src")
              , g = r[1].children[0].children[0].innerText
              , c = r[2].children[0].innerText.substring(1)
              , y = r[3].children[1].getAttribute("value");
            t = item_data(m, i, g, y, c, l),
            a.push(t)
        }
    } catch (u) {}
    return a
}
function parseNext(e) {
    var t, a = [];
    try {
        for (var s = e.getElementsByClassName("items")[0].getElementsByTagName("tbody")[0].getElementsByTagName("tr"), n = 0; n < s.length; n++) {
            var r = s[n].children
              , l = "http://www.next.co.uk" + r[1].children[0].children[1].children[1].href
              , m = r[1].children[0].children[0].innerText
              , i = r[0].children[0].getAttribute("href")
              , g = r[1].children[0].children[1].children[0].innerText
              , c = r[3].getElementsByTagName("select")[0].value
              , y = r[5].children[0].children[0].innerText.substring(1)
              , u = y / c;
            t = item_data(l, i, m, c, u, g),
            a.push(t)
        }
    } catch (o) {}
    return a
}
function parseJoules(e) {
    var t, a = [];
    try {
        for (var s = e.getElementsByClassName("row shopping-basket-item"), n = 0; n < s.length; n++) {
            var r = s[n].children
              , l = r[1].children[0].children[0].children[4].children[0].children[0].children[0].children[1].value
              , m = "http://www.joules.com" + r[0].children[0].getAttribute("href")
              , i = r[0].children[0].children[0].children[0].children[0].src
              , g = r[0].children[0].children[0].children[0].children[0].alt
              , c = r[1].children[0].children[0].children[4].children[0].children[0].children[0].children[2].value
              , y = r[1].children[0].children[1].innerText.substring(1);
            t = item_data(m, i, g, c, y, l),
            a.push(t)
        }
    } catch (u) {}
    return a
}
function parseKiddicare(e) {
    var t, a = [];
    try {
        for (var s = e.getElementsByClassName("tbl-basket-container")[0].getElementsByTagName("table")[0].getElementsByTagName("table")[0].getElementsByTagName("tr"), n = 0; n < s.length; n++)
            if (!s[n].hasAttribute("class")) {
                if (!(s[n].children.length >= 4))
                    break;
                for (var r = s[n].children, l = "http:" + r[0].children[0].children[0].getAttribute("src"), m = "http://www.kiddicare.com" + r[0].children[1].children[0].getAttribute("href"), i = r[0].children[1].children[0].innerText, g = "", c = r[1].children[0].innerText.substring(1), y = r[2].children[0].children, u = 0; u < y.length; u++)
                    if (y[u].hasAttribute("selected"))
                        var o = y[u].innerText;
                t = item_data(m, l, i, o, c, g),
                a.push(t)
            }
    } catch (h) {}
    return a
}
function parseHarrods(e) {
    var t, a = [];
    try {
        for (var s = e.getElementsByClassName("shoppingbag products")[0].getElementsByClassName("product"), n = 0; n < s.length; n++) {
            var r = s[n].children
              , l = r[1].children[3].innerText.substring(9)
              , m = r[1].children[1].children[0].getAttribute("href")
              , i = r[0].children[0].children[0].getAttribute("src");
            meta_desc1 = r[1].children[0].innerText,
            meta_desc2 = r[1].children[1].children[0].innerText;
            var g = meta_desc1 + " " + meta_desc2
              , c = r[3].children[0].children[0].innerText.substring(1)
              , y = r[4].children[0].children[1].getAttribute("value");
            t = item_data(m, i, g, y, c, l),
            a.push(t)
        }
    } catch (u) {}
    return a
}
function parseWallis(e) {
    var t, a = [];
    try {
        for (var s = e.getElementsByClassName("tbl_shopping_bag")[0].getElementsByTagName("tbody")[0].getElementsByTagName("tr"), n = 0; n < s.length; n++) {
            var r = s[n].children
              , l = r[0].children[1].children[1].children[2].innerText
              , m = r[0].children[0].children[0].getAttribute("href")
              , i = r[0].children[0].children[0].children[0].getAttribute("src")
              , g = r[0].children[0].children[0].children[0].getAttribute("alt")
              , c = r[2].children[0].children;
            if (c.length > 2)
                var y = c[1].children[0].innerText.substring(2);
            else
                var y = c[0].innerText.substring(8);
            var u = r[1].getElementsByClassName("item_quantity")[0].innerText.substring(9);
            t = item_data(m, i, g, u, y, l),
            a.push(t)
        }
    } catch (o) {}
    return a
}
function parseDorothyPerkins(e) {
    var t, a = [];
    try {
        for (var s = e.getElementsByClassName("tbl_shopping_bag")[0].getElementsByTagName("tbody")[0].getElementsByTagName("tr"), n = 0; n < s.length; n++) {
            var r = s[n].children
              , l = r[0].children[1].children[1].children[2].innerText
              , m = r[0].children[0].children[0].getAttribute("href")
              , i = r[0].children[0].children[0].children[0].src
              , g = r[0].children[0].children[0].children[0].alt
              , c = r[2].children[0].children;
            if (c.length > 2)
                var y = c[1].children[0].innerText.substring(2);
            else
                var y = c[0].innerText.substring(8);
            var u = r[1].getElementsByClassName("item_quantity")[0].innerText.substring(9);
            t = item_data(m, i, g, u, y, l),
            a.push(t)
        }
    } catch (o) {}
    return a
}
function parseELC(e) {
    var t, a = [];
    try {
        for (var s = e.getElementsByClassName("carttable")[0].getElementsByTagName("tbody")[0].getElementsByClassName("tablerow"), n = 0; n < s.length; n++) {
            var r = s[n].children
              , l = " "
              , m = r[0].children[0].children[1].children[0].getAttribute("href")
              , i = r[0].children[0].children[0].src
              , g = r[0].children[0].children[0].alt
              , c = r[3].children[0].children[0].children[0].value
              , y = r[2].children[0].children[0].children[0].innerText.substring(1);
            t = item_data(m, i, g, c, y, l),
            a.push(t)
        }
    } catch (u) {}
    return a
}
function parseMonsoon(e) {
    var t = [];
    try {
        for (var a = e.getElementsByClassName("shopping-basket-items__product "), s = 0; s < a.length; s++) {
            var n = a[s].getElementsByTagName("a")[0].children[0].getAttribute("src")
              , r = a[s].getElementsByClassName("shopping-basket-items__detail  shopping-basket-items__detail--description")[0].getElementsByTagName("a")[0].innerText
              , l = a[s].getElementsByClassName("shopping-basket-items__detail  shopping-basket-items__detail--description")[0].getElementsByTagName("a")[1].innerText
              , m = "http://uk.monsoon.co.uk" + a[s].getElementsByClassName("shopping-basket-items__detail  shopping-basket-items__detail--description")[0].getElementsByTagName("a")[0].getAttribute("href")
              , i = a[s].getElementsByClassName("dropdown__header__text js-dropdown__header")[0].innerText
              , g = a[s].getElementsByClassName("dropdown__header__text js-dropdown__header")[1].innerText
              , c = a[s].getElementsByClassName("dropdown__header__text js-dropdown__header")[2].innerText
              , y = a[s].getElementsByClassName("shopping-basket-items__detail  shopping-basket-items__detail--price")[0].innerText.substring(1)
              , u = y / c
              , o = item_data(m, n, r, c, u, l, i, g);
            t.push(o)
        }
    } catch (h) {}
    return t
}
function parseKiddisave(e) {
    var t, a = [];
    try {
        for (var s = e.getElementsByClassName("data-table cart-table")[0].getElementsByTagName("tbody")[0].getElementsByTagName("tr"), n = 0; n < s.length; n++) {
            var r = s[n].children
              , l = r[0].children[0].children[0].src
              , m = r[0].children[0].getAttribute("href")
              , i = r[0].children[0].getAttribute("title")
              , g = ""
              , c = r[3].children[1].children[0].innerText.substring(1)
              , y = r[4].children[1].value;
            t = item_data(m, l, i, y, c, g),
            a.push(t)
        }
    } catch (u) {}
    return a
}
function parseJohnLewis(e) {
    var t, a = [];
    try {
        for (var s = e.getElementsByClassName("row-item"), n = 0; n < s.length; n++) {
            var r = s[n].children[0].children[0].children[0].children[0].children
              , l = r[0].children[0].children[0].src
              , m = r[0].children[0].href
              , i = r[0].children[0].children[0].title
              , g = r[0].children[1].children[0].children[1].children[0].innerText.substring(13)
              , c = r[2].innerText.substring(1)
              , y = r[1].children[0].children[0].value;
            t = item_data(m, l, i, y, c, g),
            a.push(t)
        }
    } catch (u) {}
    return a
}
function parseTesco(e) {
    var t, a = [];
    try {
        for (var s = e.getElementsByClassName("basket-item"), n = 0; n < s.length; n++) {
            var r = s[n].children
              , l = r[0].children[1].children[0].children[0].children[0].src
              , m = "http://www.tesco.com" + r[0].children[1].children[0].href
              , i = r[0].children[1].children[0].children[0].children[0].alt
              , g = ""
              , c = r[2].children[1].innerText.substring(1)
              , y = r[1].children[1].children[9].value;
            t = item_data(m, l, i, y, c, g),
            a.push(t)
        }
    } catch (u) {}
    return a
}
function parseAvenue32(e) {
    var t, a = [];
    try {
        for (var s = e.getElementsByClassName("grid_12 full-width-table")[0].getElementsByTagName("tbody")[0].getElementsByTagName("tr"), n = 0; n < s.length; n++) {
            var r = s[n].children
              , l = r[0].children[0].children[0].src
              , m = r[0].children[0].href;
            meta_desc1 = r[0].children[0].title,
            meta_desc2 = r[1].children[1].innerText;
            var i = meta_desc1 + " " + meta_desc2
              , g = r[1].children[2].innerText
              , c = r[4].innerText.substring(1)
              , y = r[5].children[2].value;
            t = item_data(m, l, i, y, c, g),
            a.push(t)
        }
    } catch (u) {}
    return a
}
function parseFragrancenet(e) {
    var t, a = [];
    try {
        for (var s = e.getElementsByClassName("table table-responsive table-condensed")[0].getElementsByTagName("tbody")[0].getElementsByTagName("tr"), n = 0; n < s.length; n++) {
            var r = s[n].children
              , l = r[0].children[0].children[0].src
              , m = r[0].children[0].href
              , i = r[1].children[2].innerText
              , g = r[0].children[0].children[0].alt + i
              , c = r[1].getElementsByClassName("para4")[0].innerText.substring(6)
              , y = r[2].children[0].children[0].value
              , u = r[4].innerText.substring(1)
              , o = u / y;
            t = item_data(m, l, g, y, o, c),
            a.push(t)
        }
    } catch (h) {}
    return a
}
function parseFragranceX(e) {
    var t, a = [];
    try {
        for (var s = e.getElementsByClassName("table cart-table responsive-cart")[0].getElementsByClassName("CartItem"), n = 0; n < s.length; n++) {
            var r = s[n].children
              , l = r[0].children[0].children[0].children[0].children[0].src
              , m = r[0].children[0].children[0].href
              , i = r[0].children[0].children[1].children[0].children[0].innerText
              , g = r[0].children[0].children[1].children[1].innerText.substring(6)
              , c = r[0].children[0].children[1].children[2].innerText.trim().substring(1)
              , y = r[2].children[0].children[3].value;
            t = item_data(m, l, i, y, c, g),
            a.push(t)
        }
    } catch (u) {}
    return a
}
function parseClarksuk(e) {
    var t, a = [];
    try {
        for (var s = e.getElementsByClassName("table cart-table responsive-cart")[0].getElementsByClassName("CartItem"), n = 0; n < s.length; n++) {
            var r = s[n].children
              , l = r[0].children[0].children[0].children[0].children[0].src
              , m = r[0].children[0].children[0].href
              , i = r[0].children[0].children[1].children[0].children[0].innerText
              , g = r[0].children[0].children[1].children[1].innerText.substring(6)
              , c = r[2].children[0].children[3].value
              , y = r[0].children[0].children[1].children[2].innerText.trim().substring(1)
              , u = y / c;
            t = item_data(m, l, i, c, u, g),
            a.push(t)
        }
    } catch (o) {}
    return a
}
function parseHuxleyAndCox(e) {
    var t = [];
    try {
        for (var a = e.getElementsByClassName("productdetails")[0], s = a.querySelectorAll('[id^="BasketProduct"]'), n = 0; n < s.length; n++) {
            var r = "http://www.huxleyandcox.com" + s[n].getElementsByTagName("a")[0].children[0].getAttribute("src")
              , l = s[n].getElementsByClassName("itemDesc")[0]
              , m = l.getElementsByTagName("a")[0].innerText
              , i = "http://www.huxleyandcox.com" + s[n].getElementsByClassName("itemDesc")[0].getElementsByTagName("a")[0].getAttribute("href")
              , g = s[n].getElementsByClassName("itemDesc")[0].getElementsByTagName("h4")[0].innerText.replace("Size: ", "")
              , c = s[n].getElementsByClassName("itemQuantity")[0].getElementsByTagName("input")[0].getAttribute("value")
              , y = s[n].getElementsByClassName("salePrice")[0].innerText.substring(1)
              , u = item_data(i, r, m, c, y, g);
            t.push(u)
        }
    } catch (o) {}
    return t
}
function parseTheOutnet(e) {
    var t = [];
    try {
        var a = e.getElementsByClassName("border");
        console.log(a);
        for (var s = 0; s < a.length; s++) {
            var n = "thhp:" + a[s].getElementsByTagName("a")[0].children[0].getAttribute("src")
              , r = a[s].getElementsByClassName("prod-name")[0].innerText.trim()
              , l = a[s].getElementsByClassName("prod-name")[0].getElementsByTagName("a")[0].getAttribute("href")
              , m = a[s].getElementsByClassName("prod-options marg-topbottom")[0].innerText.replace("Size: ", "")
              , i = a[s].getElementsByClassName("js-custom text-center")[0].children[0].getAttribute("data-qty")
              , g = a[s].getElementsByClassName("large-6 columns hide-for-small text-right")[0].innerText.substring(1)
              , c = item_data(l, n, r, i, g, m);
            t.push(c)
        }
    } catch (y) {}
    return t
}
function parseTkmaxx(e) {
    var t = [];
    try {
        for (var a = e.getElementsByClassName("large-24 marg-bottom table-checkout")[0].getElementsByTagName("tbody")[0].getElementsByTagName("tr"), s = 0; s < a.length; s++) {
            var n = a[s].getElementsByTagName("a")[0].children[0].getAttribute("src")
              , r = a[s].getElementsByClassName("prod-name")[0].innerText.trim()
              , l = a[s].getElementsByClassName("prod-name")[0].getElementsByTagName("a")[0].getAttribute("href")
              , m = a[s].getElementsByClassName("prod-options marg-topbottom")[0].innerText.replace("Size: ", "")
              , i = a[s].getElementsByClassName("js-custom text-center")[0].children[0].getAttribute("data-qty")
              , g = a[s].getElementsByClassName("large-6 columns hide-for-small text-right")[0].innerText.substring(1)
              , c = item_data(l, n, r, i, g, m);
            t.push(c)
        }
    } catch (y) {}
    return t
}
function parseVery(e) {
    var t = [];
    try {
        for (var a = e.getElementsByClassName("items")[0], s = a.querySelectorAll(".item itemFirst, .item, .item itemLast"), n = 0; n < s.length; n++) {
            var r, l = s[n].getElementsByTagName("a")[0].children[0].getAttribute("src"), m = s[n].getElementsByClassName("name")[0].innerText, i = [];
            s[n].getElementsByClassName("value")[0].innerText;
            try {
                r = s[n].getElementsByClassName("value")[1].innerText
            } catch (g) {}
            var c;
            try {
                c = s[n].getElementsByClassName("value")[2].innerText
            } catch (g) {}
            var y = s[n].getElementsByClassName("status")[0].getElementsByTagName("input")[0].getAttribute("value")
              , u = s[n].getElementsByClassName("productPrice")[0].innerText.substring(1)
              , o = u / y
              , h = item_data(i, l, m, y, o, c);
            t.push(h)
        }
    } catch (d) {}
    return t
}
function parseJohnnyTuxedo(e) {
    var t = [];
    try {
        for (var a = e.getElementsByClassName("data-table cart-table")[0], s = a.querySelectorAll(".first odd, .even, .odd, .last odd, .last even"), n = 0; n < s.length; n++) {
            var r, l = s[n].getElementsByTagName("a")[0].children[0].getAttribute("src"), m = s[n].getElementsByClassName("product-name")[0], i = m.getElementsByTagName("a")[0].innerText, g = s[n].getElementsByClassName("product-name")[0].getElementsByTagName("a")[0].getAttribute("href");
            try {
                r = s[n].getElementsByClassName("item-options clearfix")[0].innerText
            } catch (c) {}
            var y;
            try {
                y = s[n].getElementsByClassName("item-options clearfix")[1].getElementsByTagName("input")[0].getAttribute("value")
            } catch (c) {
                y = s[n].getElementsByClassName("item-options clearfix")[0].getElementsByTagName("input")[0].getAttribute("value")
            }
            var u = s[n].getElementsByClassName("price")[0].innerText.substring(1)
              , o = u / y
              , h = item_data(g, l, i, y, o, r);
            t.push(h)
        }
    } catch (d) {}
    return t
}
function parseFarfetch(e) {
    var t = [];
    try {
        for (var a = e.getElementsByClassName("baseline col12 checkout-listItems-productDetails-container pa20 "), s = 0; s < a.length; s++) {
            var n = a[s].getElementsByTagName("a")[0].children[0].getAttribute("src")
              , r = a[s].getElementsByClassName("condensed")[0].innerText.trim()
              , l = a[s].getElementsByClassName("mb10 color-darkGrey")[0].innerText.trim()
              , m = r + " " + l
              , i = "http://www.farfetch.com/uk" + a[s].getElementsByClassName("condensed")[0].getElementsByTagName("a")[0].getAttribute("href")
              , g = a[s].getElementsByClassName("mb10")[1].innerText
              , c = a[s].getElementsByClassName("js-checkout-display-size")[0].innerText
              , y = a[s].getElementsByClassName("js-checkout-display-quantity")[0].innerText
              , u = a[s].getElementsByClassName("h4 mt20")[1].innerText.substring(1).replace(" (VAT included)", "")
              , o = item_data(i, n, m, y, u, c, g);
            t.push(o)
        }
    } catch (h) {}
    return t
}
function parseLuxFix(e) {
    var t = [];
    try {
        for (var a = e.getElementsByClassName("cart-row"), s = 0; s < a.length; s++) {
            var n, r = a[s].getElementsByTagName("a")[0].children[0].getAttribute("src"), l = a[s].getElementsByClassName("column_2 clearfix desc-item")[0].getElementsByTagName("h4")[0].innerText.trim(), m = a[s].getElementsByClassName("column_2 clearfix desc-item")[0].getElementsByClassName("subtitle")[0].innerText.trim(), i = l + " " + m, g = "https://lux-fix.com" + a[s].getElementsByClassName("subtitle")[0].getElementsByTagName("a")[0].getAttribute("href");
            try {
                n = a[s].getElementsByClassName("chosen_option")[0].innerText.replace("Size: ", "")
            } catch (c) {}
            var y, u = a[s].getElementsByClassName("column_1_5 clearfix qty qty-item")[0].children[0].getAttribute("value");
            try {
                y = a[s].getElementsByClassName("column_1_5 clearfix price-item")[0].getElementsByTagName("div")[1].innerText.replace("Sale: Â£ ", "")
            } catch (c) {
                y = a[s].getElementsByClassName("column_1_5 clearfix price-item")[0].getElementsByTagName("span")[0].innerText.substring(1)
            }
            var o = item_data(g, r, i, u, y, n);
            t.push(o)
        }
    } catch (h) {}
    return t
}
function parseRokit(e) {
    var t = [];
    try {
        for (var a = e.getElementsByClassName("product"), s = 0; s < a.length - 3; s++) {
            var n, r = a[s].getElementsByTagName("a")[0].children[0].getAttribute("src"), l = a[s].getElementsByClassName("title")[0].innerText.trim(), m = "http://www.rokit.co.uk" + a[s].getElementsByClassName("title")[0].getElementsByTagName("a")[0].getAttribute("href"), i = a[s].getElementsByTagName("dl")[0].innerText;
            try {
                n = a[s].getElementsByClassName("qty")[0].innerText
            } catch (g) {
                n = 1
            }
            var c = a[s].getElementsByClassName("price")[0].innerText.substring(1)
              , y = c / n
              , u = item_data(m, r, l, n, y, i);
            t.push(u)
        }
    } catch (o) {}
    return t
}
function parseLaRedoute(e) {
    var t = [];
    try {
        for (var a = e.getElementsByClassName("item"), s = 0; s < a.length; s++) {
            var n = a[s].getElementsByClassName("articleInfo")[0].children[0].getAttribute("src")
              , r = a[s].getElementsByClassName("itemHeader")[0].innerText
              , l = a[s].getElementsByClassName("itemSubheader")[0].innerText
              , m = r + " " + l
              , i = []
              , g = a[s].getElementsByClassName("itemReference")[0].innerText.replace("Ref : ", "")
              , c = a[s].getElementsByClassName("itemAttributeValue")[0].innerText
              , y = a[s].getElementsByClassName("itemAttributeValue size")[0].innerText
              , u = a[s].getElementsByClassName("itemAttributeValue")[2].innerText
              , o = a[s].getElementsByClassName("itemTotalFinalPrice")[0].innerText.substring(1).split("(")[0]
              , h = o / u
              , d = item_data(i, n, m, u, h, c, g, y);
            t.push(d)
        }
    } catch (N) {}
    return t
}
function parseJdSports(e) {
    var t = [];
    try {
        for (var a = e.getElementsByClassName("even discount"), s = 0; s < a.length; s++) {
            var n = a[s].getElementsByTagName("a")[0].children[0].getAttribute("src")
              , r = a[s].getElementsByClassName("description product-title")[0].innerText
              , l = a[s].getElementsByClassName("thumb")[0].getElementsByTagName("a")[0].getAttribute("href")
              , m = a[s].getElementsByClassName("attr-colour")[0].innerText
              , i = a[s].getElementsByClassName("attr-size")[0].innerText
              , g = a[s].getElementsByClassName("itemQuantity")[0].innerText
              , c = a[s].getElementsByClassName("integer")[0].innerText.substring(1)
              , y = item_data(l, n, r, g, c, m, i);
            t.push(y)
        }
    } catch (u) {}
    return t
}
function parseMrPorter(e) {
    var t = [];
    try {
        for (var a = e.getElementsByClassName("shopping_bag_section_items")[0].getElementsByTagName("tr"), s = 0; s < a.length; s++) {
            var n = a[s].getElementsByTagName("td").length;
            if (6 == n) {
                var r = "http:" + a[s].getElementsByClassName("basket-image")[0].getElementsByTagName("a")[0].children[0].getAttribute("src")
                  , l = a[s].getElementsByTagName("td")[1].getElementsByTagName("a")[0].innerText
                  , m = "http://www.mrporter.com" + a[s].getElementsByTagName("td")[1].getElementsByTagName("a")[0].getAttribute("href")
                  , i = a[s].getElementsByTagName("td")[2].innerText
                  , g = (a[s].getElementsByTagName("td")[3].innerText,
                a[s].getElementsByTagName("td")[4].getElementsByTagName("input")[0].value)
                  , c = a[s].getElementsByClassName("price-col")[0].innerText.substring(1).split("(")[0].replace(",", "")
                  , y = c / g
                  , u = item_data(m, r, l, g, y, i);
                t.push(u)
            }
        }
    } catch (o) {}
    return t
}
function parseJimmyChoo(e) {
    var t = [];
    try {
        for (var a = e.getElementsByClassName("cart-row"), s = 0; s < a.length; s++) {
            var n, r = a[s].getElementsByClassName("item-image")[0].getElementsByTagName("img")[0].getAttribute("src"), l = a[s].getElementsByClassName("name")[0].getElementsByTagName("a")[0].innerText, m = a[s].getElementsByClassName("item-image")[0].getElementsByTagName("a")[0].getAttribute("href");
            a[s].getElementsByClassName("sku")[0].getElementsByClassName("value")[0].innerText;
            try {
                n = a[s].getElementsByClassName("color")[0].getElementsByClassName("value")[0].innerText
            } catch (i) {}
            var g;
            try {
                g = a[s].getElementsByClassName("attribute")[0].getElementsByClassName("value")[0].innerText
            } catch (i) {}
            var c = a[s].getElementsByClassName("item-quantity hide")[0].getElementsByTagName("input")[0].value
              , y = a[s].getElementsByClassName("price-sales")[0].innerText.replace("â‚¬", "")
              , u = item_data(m, r, l, c, y, n, g);
            t.push(u)
        }
    } catch (o) {}
    return t
}
function parseHouseOfFraser(e) {
    var t = [];
    try {
        for (var a = e.getElementsByClassName("sale"), s = 0; s < a.length; s++) {
            var n, r = a[s].getElementsByTagName("a")[0].children[0].getAttribute("src"), l = a[s].getElementsByTagName("a")[1].innerText, m = a[s].getElementsByTagName("a")[1].getAttribute("href");
            a[s].getElementsByClassName("productCode")[0].innerText.replace("Product Code - ", "");
            try {
                n = a[s].getElementsByClassName("checkoutproductattributes")[0].innerText
            } catch (i) {}
            var g;
            try {
                g = a[s].getElementsByClassName("checkoutproductattributes")[1].innerText
            } catch (i) {}
            var c, y = a[s].getElementsByClassName("quantity cartSelect")[0].value;
            try {
                price1 = a[s].getElementsByClassName("price bold")[0].innerText.replace("Â£", "");
                var c = price1 / y
            } catch (i) {
                price1 = a[s].getElementsByClassName("priceboldblack")[0].innerText.replace("Â£", "");
                var c = price1 / y
            }
            var u = item_data(m, r, l, y, c, n, g);
            t.push(u)
        }
    } catch (o) {}
    return t
}
function parseDkny(e) {
    var t = [];
    try {
        for (var a = e.getElementsByClassName("cart-row item"), s = 0; s < a.length; s++) {
            var n = "https://www.dkny.com" + a[s].getElementsByTagName("a")[0].getElementsByTagName("img")[0].getAttribute("src")
              , r = a[s].getElementsByClassName("name")[0].innerText
              , l = a[s].getElementsByClassName("name")[0].getElementsByTagName("a")[0].getAttribute("href")
              , m = a[s].getElementsByClassName("sku")[0].getElementsByClassName("value")[0].innerText.replace("Product Code - ", "")
              , i = a[s].getElementsByClassName("attribute")[0].getElementsByClassName("value")[0].innerText
              , g = a[s].getElementsByClassName("attribute")[1].getElementsByClassName("value")[0].innerText
              , c = a[s].getElementsByClassName("item-quantity")[0].getElementsByTagName("input")[0].value
              , y = a[s].getElementsByClassName("price-sales")[0].innerText.substring(1)
              , u = item_data(l, n, r, c, y, i, g, m);
            t.push(u)
        }
    } catch (o) {}
    return t
}
function parseFrenchConnection(e) {
    var t = [];
    try {
        for (var a = e.getElementsByClassName("item clearfix"), s = 0; s < a.length; s++) {
            var n = "http:" + a[s].getElementsByClassName("prod-img col grid_2 alpha")[0].getElementsByTagName("img")[0].getAttribute("src")
              , r = a[s].getElementsByClassName("content")[0].innerText.replace("REMOVE", "")
              , l = a[s].getElementsByClassName("content")[0].getElementsByTagName("a")[0].getAttribute("href")
              , m = a[s].getElementsByTagName("select")[0].value
              , i = a[s].getElementsByClassName("prod-price col grid_2")[0].innerText.substring(1)
              , g = item_data(l, n, r, m, i);
            t.push(g)
        }
    } catch (c) {}
    return t
}
function parseTheDressingRoom(e) {
    var t, a = [];
    try {
        for (var s = e.getElementsByClassName("basket")[2].getElementsByTagName("tbody")[0].getElementsByTagName("tr"), n = 0; n < s.length; n++) {
            var r = s[n].getElementsByTagName("a")[0].children[0].getAttribute("src")
              , l = s[n].getElementsByClassName("product-detail")[0].innerText.trim()
              , m = "http://www.the-dressingroom.com/" + s[n].getElementsByClassName("image-box")[0].getElementsByTagName("a")[0].getAttribute("href")
              , i = s[n].getElementsByClassName("code")[0].innerText.replace("Product Code: ", "")
              , g = s[n].getElementsByClassName("product-variations")[0].innerText
              , c = s[n].getElementsByClassName("quantity")[0].value
              , y = s[n].getElementsByClassName("line_price")[0].innerText.substring(1)
              , u = +(y / c).toFixed(2)
              , t = item_data(m, r, l, c, u, g, i);
            a.push(t)
        }
    } catch (o) {}
    return a
}
function parse6pm(e) {
    var t, a = [];
    try {
        for (var s = e.getElementsByClassName("item"), n = 0; n < s.length; n++) {
            var r, l = "https://secure-www.6pm.com" + s[n].getElementsByClassName("desc")[0].getElementsByTagName("a")[0].getAttribute("href"), m = s[n].getElementsByClassName("desc")[0].getElementsByTagName("img")[0].getAttribute("src"), i = s[n].getElementsByClassName("title")[0].getElementsByTagName("a")[0].innerText, g = s[n].getElementsByClassName("qty")[0].getElementsByTagName("input")[0].value, c = s[n].getElementsByClassName("each")[0].innerText.substring(1), y = s[n].getElementsByClassName("details")[0].getElementsByTagName("li")[1].innerText;
            try {
                r = s[n].getElementsByClassName("details")[0].getElementsByTagName("li")[2].innerText
            } catch (u) {}
            var t = (s[n].getElementsByClassName("details")[0].getElementsByTagName("li")[0].innerText,
            item_data(l, m, i, g, c, y, r));
            a.push(t)
        }
    } catch (o) {}
    return a
}
function parseSoap(e) {
    var t, a = [];
    try {
        for (var s = e.getElementsByClassName("itemsContent clearfix"), n = 0; n < s.length; n++) {
            var r = "http://www.soap.com" + s[n].getElementsByClassName("itemImg")[0].getElementsByTagName("a")[0].getAttribute("href")
              , l = "http:" + s[n].getElementsByClassName("itemImg")[0].getElementsByTagName("img")[0].getAttribute("src")
              , m = s[n].getElementsByClassName("itemsName")[0].innerText
              , i = s[n].getElementsByClassName("quantityInput clearfix")[0].getElementsByTagName("input")[0].value
              , g = s[n].getElementsByClassName("wPrice")[0].innerText.substring(1)
              , t = item_data(r, l, m, i, g);
            a.push(t)
        }
    } catch (c) {}
    return a
}
function parseShoeBacca(e) {
    var t, a = [];
    try {
        for (var s = e.getElementsByClassName("table-responsive")[0].getElementsByTagName("tbody")[0].getElementsByTagName("tr"), n = 0; n < s.length; n++) {
            var r, l = s[n].getElementsByTagName("td")[0].getElementsByTagName("a")[0].getAttribute("href"), m = s[n].getElementsByTagName("td")[0].getElementsByTagName("img")[0].getAttribute("src"), i = s[n].getElementsByClassName("product-name")[0].innerText;
            try {
                widthA = s[n].getElementsByClassName("item-options")[0].getElementsByTagName("dt")[0].innerText,
                widthB = s[n].getElementsByClassName("item-options")[0].getElementsByTagName("dd")[0].innerText;
                var r = widthA + ":" + widthB
            } catch (g) {}
            var c;
            try {
                sizeA = s[n].getElementsByClassName("item-options")[0].getElementsByTagName("dt")[1].innerText,
                sizeB = s[n].getElementsByClassName("item-options")[0].getElementsByTagName("dd")[1].innerText;
                var c = sizeA + ":" + sizeB
            } catch (g) {}
            var y = i + "," + r + "," + c
              , u = s[n].getElementsByClassName("cart-price")[0].innerText.substring(1)
              , o = s[n].getElementsByClassName("cart-price")[1].innerText.substring(1).replace(",", "")
              , h = +(o / u)
              , t = item_data(l, m, y, h, u);
            a.push(t)
        }
    } catch (d) {}
    return a
}
function parseBrooksBrothers(e) {
    var t, a = [];
    try {
        for (var s = e.getElementsByClassName("cart-row no-border"), n = 0; n < s.length; n++) {
            var r, l = "https://brooksbrothers.com" + s[n].getElementsByClassName("name")[0].getElementsByTagName("a")[0].getAttribute("href"), m = s[n].getElementsByClassName("cart-product-image")[0].getElementsByTagName("img")[0].getAttribute("src"), i = s[n].getElementsByClassName("name")[0].innerText;
            try {
                var r = s[n].getElementsByClassName("attribute")[0].getElementsByClassName("value")[0].innerText
            } catch (g) {}
            var c;
            try {
                var c = s[n].getElementsByClassName("attribute")[1].getElementsByClassName("value")[0].innerText
            } catch (g) {}
            var y = i + ",Color:" + r + ",Size:" + c
              , u = s[n].getElementsByClassName("chzn-single")[0].innerText
              , o = s[n].getElementsByClassName("price-total")[0].innerText.substring(1).replace(",", "")
              , h = +(o / u)
              , t = item_data(l, m, y, u, h);
            a.push(t)
        }
    } catch (d) {}
    return a
}
function parseGraceinla(e) {
    var t, a = [];
    try {
        for (var s = e.getElementsByClassName("row")[0].getElementsByTagName("tbody")[0].children, n = 0; n < s.length; n++)
            if ("summary" !== s[n].getAttribute("class")) {
                var r = "http://shop.graceinla.com" + s[n].getElementsByClassName("item")[0].getElementsByTagName("a")[0].getAttribute("href")
                  , l = "http:" + s[n].getElementsByClassName("product_image")[0].getElementsByTagName("img")[0].getAttribute("src")
                  , m = s[n].getElementsByClassName("item")[0].getElementsByTagName("strong")[0].innerText
                  , i = "Size:" + s[n].getElementsByClassName("variant_title")[0].innerText
                  , g = m + "," + i
                  , c = s[n].getElementsByClassName("qty")[0].getElementsByTagName("input")[0].value
                  , y = s[n].getElementsByClassName("price")[0].innerText.substring(1).replace(",", "")
                  , u = +(y / +c)
                  , t = item_data(r, l, g, c, u);
                a.push(t)
            }
    } catch (o) {}
    return a
}
function parseDillards(e) {
    var t, a = [];
    try {
        for (var s = e.getElementsByClassName("table table-condensed checkout-table")[0].getElementsByTagName("tbody")[0].getElementsByTagName("tr"), n = 0; n < s.length; n++) {
            var r = "https://www.dillards.com" + s[n].getElementsByTagName("td")[0].getElementsByTagName("a")[0].getAttribute("href")
              , l = s[n].getElementsByTagName("td")[0].getElementsByTagName("img")[0].getAttribute("src")
              , m = s[n].getElementsByTagName("td")[3].getElementsByTagName("select")[0].value
              , i = s[n].getElementsByTagName("td")[4].innerText.replace("USD", "")
              , g = s[n].getElementsByTagName("td")[1].getElementsByTagName("ul")[0].innerText
              , t = item_data(r, l, g, m, i);
            a.push(t)
        }
    } catch (c) {}
    return a
}
function parseDrjays(e) {
    var t, a = [];
    try {
        for (var s = e.getElementsByClassName("clearfix")[1].getElementsByTagName("tbody")[0].getElementsByTagName("tr"), n = 0; n < s.length; n++)
            if (1 != s[n].children.length) {
                var r = s[n].getElementsByClassName("product-thumb bag_prodimage")[0].getElementsByTagName("a")[0].getAttribute("href")
                  , l = s[n].getElementsByClassName("product-thumb bag_prodimage")[0].getElementsByTagName("img")[0].getAttribute("src")
                  , m = s[n].getElementsByClassName("product-desc bag_prodinfo")[0].innerText
                  , i = s[n].getElementsByClassName("price right bag_price")[0].getElementsByClassName("actualprice")[0].innerText.substring(1)
                  , g = s[n].getElementsByClassName("right bag_qty")[0].getElementsByTagName("input")[0].value
                  , t = item_data(r, l, m, g, i);
                a.push(t)
            }
    } catch (c) {}
    return a
}
function parseDjpremium(e) {
    var t, a = [];
    try {
        for (var s = e.getElementsByClassName("bag")[0].getElementsByTagName("thead")[0].children, n = 1; n < s.length; n++) {
            var r = "http://wwww.djpremiun.com" + s[n].getElementsByTagName("a")[0].getAttribute("href")
              , l = s[n].getElementsByTagName("img")[0].getAttribute("src")
              , m = s[n].getElementsByTagName("td")[2].innerText
              , i = s[n].getElementsByClassName("right")[0].innerText.substring(1)
              , g = s[n].getElementsByTagName("td")[3].getElementsByTagName("input")[0].value
              , c = +i / +g
              , t = item_data(r, l, m, g, c);
            a.push(t)
        }
    } catch (y) {}
    return a
}
function parseNinewest(e) {
    var t, a = [];
    try {
        for (var s = e.getElementsByClassName("grid cart-item-row cart-item"), n = 0; n < s.length; n++) {
            for (var r = s[n].getElementsByClassName("mobile-image-full-length")[0].getElementsByTagName("a")[0].getAttribute("href"), l = s[n].getElementsByClassName("mobile-image-full-length")[0].getElementsByTagName("img")[0].getAttribute("src"), m = s[n].getElementsByClassName("product-name")[0].innerText, i = s[n].getElementsByClassName("item-number")[0].innerText, g = s[n].getElementsByClassName("grid-cell default-15 tablet-10 tablet-suffix-5 mobile-50 cart-table-header mobile-cart-item-padding mobile-cart-content-cell")[0].innerText, c = s[n].getElementsByClassName("grid-cell default-15 tablet-10 mobile-50 cart-table-header mobile-cart-item-padding mobile-cart-content-cell")[1].innerText, y = m + "," + i + "," + g + "," + c, u = s[n].getElementsByClassName("quantity-select")[0].children, o = 0; o < u.length; o++)
                if (u[o].hasAttribute("selected"))
                    var h = u[o].innerText;
            var d = s[n].getElementsByClassName("value item-total discount")[0].innerText.substring(1).replace(",", "")
              , N = +d / +h
              , t = item_data(r, l, y, h, N);
            a.push(t)
        }
    } catch (B) {}
    return a
}
function parsePumpkinpatch(e) {
    var t, a = [];
    try {
        for (var s = e.getElementsByClassName("bag-item bag-item-avail"), n = 0; n < s.length; n++) {
            for (var r = "http://www.pumpkinpatch.co.uk" + s[n].getElementsByClassName("bag-item-pic")[0].getElementsByTagName("a")[0].getAttribute("href"), l = s[n].getElementsByClassName("bag-item-pic")[0].getElementsByTagName("img")[0].getAttribute("src"), m = s[n].getElementsByClassName("span2 bag-prices")[0].innerText.split("each")[0].substring(1), i = s[n].getElementsByClassName("bag-desc")[0].innerText, g = s[n].getElementsByClassName("bag-option-control")[0].getElementsByTagName("select")[0].children, c = 0; c < g.length; c++)
                if (g[c].hasAttribute("selected"))
                    var y = g[c].innerText;
            for (var u = s[n].getElementsByClassName("bag-option-control")[1].getElementsByTagName("select")[0].children, o = 0; o < u.length; o++)
                if (u[o].hasAttribute("selected"))
                    var h = u[o].innerText;
            for (var d = s[n].getElementsByClassName("bag-option-control")[2].getElementsByTagName("select")[0].children, N = 0; N < d.length; N++)
                if (d[N].hasAttribute("selected"))
                    var B = d[N].innerText;
            var E = i + ",Color:" + y + ",Size:" + h
              , t = item_data(r, l, E, B, m);
            a.push(t)
        }
    } catch (p) {}
    return a
}
function parseHerveleger(e) {
    var t, a = [];
    try {
        for (var s = e.getElementsByClassName("item-list")[0].getElementsByTagName("tbody")[0].children, n = 0; n < s.length; n++) {
            for (var r = s[n].getElementsByClassName("item-image")[0].getElementsByTagName("a")[0].getAttribute("href"), l = s[n].getElementsByClassName("item-image")[0].getElementsByTagName("img")[0].getAttribute("src"), m = s[n].getElementsByClassName("name")[0].innerText, i = "ID:" + s[n].getElementsByClassName("sku")[0].innerText, g = "Color:" + s[n].getElementsByClassName("item-color")[0].innerText, c = "Size:" + s[n].getElementsByClassName("item-size")[0].innerText, y = m + "," + i + "," + g + "," + c, u = s[n].getElementsByClassName("item-quantity")[0].getElementsByTagName("select")[0].children, o = 0; o < u.length; o++)
                if (u[o].hasAttribute("selected"))
                    var h = u[o].innerText;
            for (var d = s[n].getElementsByClassName("item-total")[0].children, N = 0; N < d.length; N++)
                if ("price-sales original" === d[N].getAttribute("class"))
                    var B = s[n].getElementsByClassName("price-sales original")[0].innerText.substring(1).replace(",", "")
                      , E = +(B / h);
                else {
                    if ("price-promotion" !== d[N].getAttribute("class"))
                        break;
                    var B = s[n].getElementsByClassName("price-sales")[0].innerText.substring(1).replace(",", "")
                      , E = +B / +h
                }
            var t = item_data(r, l, y, h, E);
            a.push(t)
        }
    } catch (p) {}
    return a
}
function parseDiapers(e) {
    var t, a = [];
    try {
        for (var s = e.getElementsByClassName("itemsShipContent")[0].getElementsByTagName("div"), n = 0; n < s.length; n++)
            if ("cart" === s[n].getAttribute("name")) {
                var r = "http:" + s[n].getElementsByClassName("itemImg")[0].getElementsByTagName("img")[0].getAttribute("src")
                  , l = s[n].getElementsByClassName("wItems")[0].innerText.replace("&nbsp;", " ")
                  , m = "http://" + tab_domain + s[n].getElementsByClassName("itemImg")[0].getElementsByTagName("a")[0].getAttribute("href")
                  , i = s[n].getElementsByClassName("quantityInput clearfix")[0].getElementsByTagName("input")[0].value
                  , g = s[n].getElementsByClassName("wPrice")[0].innerText.substring(1)
                  , t = item_data(m, r, l, i, g);
                a.push(t)
            }
    } catch (c) {}
    return a
}
function parseDunelondon(e) {
    var t, a = [];
    try {
        for (var s = e.getElementsByClassName("basket_payment")[0].getElementsByTagName("tr"), n = 1; n < s.length && "basketVoucherOnLoad" !== s[n].getAttribute("class"); n++) {
            var r = s[n].getElementsByClassName("basketLineItem")[1].getElementsByTagName("img")[0].getAttribute("src")
              , l = s[n].getElementsByClassName("basketLineItem")[2].innerText.replace("&nbsp;", "")
              , m = s[n].getElementsByClassName("basketLineItem")[1].getElementsByTagName("a")[0].getAttribute("href")
              , i = s[n].getElementsByClassName("basketLineItem nowrap")[0].getElementsByTagName("input")[0].value
              , g = s[n].getElementsByClassName("basketLineItem")[4].innerText.substring(1)
              , t = item_data(m, r, l, i, g);
            a.push(t)
        }
    } catch (c) {}
    return a
}
function parseZappos(e) {
    var t, a = [];
    try {
        for (var s = e.getElementsByClassName("ajaxUpdate")[0].getElementsByTagName("tr"), n = 0; n < s.length; n++) {
            var r = s[n].getElementsByClassName("desc")[0].getElementsByTagName("img")[0].getAttribute("src")
              , l = s[n].getElementsByClassName("desc")[0].innerText
              , m = "https://secure-www.zappos.com" + s[n].getElementsByClassName("desc")[0].getElementsByTagName("a")[0].getAttribute("href")
              , i = s[n].getElementsByClassName("amt")[0].innerText.substring(1).replace(",", "")
              , g = s[n].getElementsByClassName("each")[0].innerText.substring(1).split("ONLY")[0].replace(",", "")
              , c = +(i / g)
              , t = item_data(m, r, l, c, g);
            a.push(t)
        }
    } catch (y) {}
    return a
}
function parseGymboree(e) {
    var t, a = [];
    try {
        for (var s = e.getElementsByClassName("bag-body01 bag-body row"), n = 0; n < s.length; n++)
            if (2 != s[n].getElementsByClassName("product-details col-xs-10")[0].getElementsByClassName("row1")[0].getElementsByClassName("item product-info col-xs-1")[0].children.length) {
                for (var r = s[n].getElementsByClassName("product-thumbnail col-xs-2")[0].getElementsByTagName("a")[0].getAttribute("href"), l = s[n].getElementsByClassName("product-thumbnail col-xs-2")[0].getElementsByTagName("img")[0].getAttribute("src"), m = s[n].getElementsByClassName("product-name")[0].innerText, i = "ID:" + s[n].getElementsByClassName("itemnumber")[0].innerText.replace("Item #", ""), g = s[n].getElementsByClassName("size col-xs-2 shop-bag-size")[0].getElementsByTagName("select")[0].children, c = 0; c < g.length; c++)
                    if (g[c].hasAttribute("selected"))
                        var y = g[c].innerText;
                for (var u = s[n].getElementsByClassName("quantity col-xs-1")[0].getElementsByTagName("select")[0].children, o = 0; o < u.length; o++)
                    if (u[o].hasAttribute("selected"))
                        var h = u[o].innerText;
                var d = m + "," + i
                  , N = s[n].getElementsByClassName("color col-xs-1")[0].innerText
                  , B = s[n].getElementsByClassName("sale-price")[0].innerText.substring(1)
                  , t = item_data(r, l, d, h, B, y, N);
                a.push(t)
            }
    } catch (E) {}
    return a
}
function parseHM(e) {
    var t, a = [];
    try {
        for (var s = e.getElementsByClassName("shoppingbag-items")[0].getElementsByTagName("ul")[1].children, n = 0; n < s.length; n++) {
            var r, l = s[n].getElementsByClassName("imageItem")[0].getElementsByTagName("a")[0].getAttribute("href"), m = "http://" + s[n].getElementsByClassName("imageItem")[0].getElementsByTagName("img")[0].getAttribute("src"), i = "Color:" + s[n].getElementsByClassName("color")[0].getElementsByClassName("selected")[0].innerText;
            try {
                r = "Size:" + s[n].getElementsByClassName("size")[0].getElementsByClassName("selected")[0].innerText
            } catch (g) {}
            var c = s[n].getElementsByTagName("div")[0].getElementsByTagName("h2")[0].innerText.split("$")[0]
              , y = c + "," + i + "," + r
              , u = s[n].getElementsByClassName("qty")[0].getElementsByClassName("qty-value")[0].innerText
              , o = (s[n].getElementsByClassName("priceTotal")[0].getElementsByClassName("price")[0].innerText.substring(1).replace(",", ""),
            s[n].getElementsByClassName("price")[0].children);
            if (1 == o.length)
                var h = s[n].getElementsByTagName("span")[0].innerText.substring(1);
            else
                var h = s[n].getElementsByClassName("new")[0].innerText.substring(1);
            var t = item_data(l, m, y, u, h, r, i);
            a.push(t)
        }
    } catch (d) {}
    return a
}
function parseHollisterco(e) {
    var t, a = [];
    try {
        for (var s = e.getElementsByClassName("items")[0].getElementsByTagName("tbody")[0].children, n = 0; n < s.length; n++) {
            var r = "https://www.hollisterco.com" + s[n].getElementsByClassName("item-desc")[0].getElementsByTagName("a")[0].getAttribute("href")
              , l = "https:" + s[n].getElementsByClassName("item-desc")[0].getElementsByTagName("img")[0].getAttribute("src")
              , m = s[n].getElementsByClassName("name")[0].innerText
              , i = "ID" + s[n].getElementsByClassName("sku")[0].innerText
              , g = "Color;" + s[n].getElementsByClassName("color")[0].innerText
              , c = "Size:" + s[n].getElementsByClassName("size")[0].innerText
              , y = m + "," + i + "," + g + "," + c
              , u = s[n].getElementsByClassName("offer-price")[0].innerText.substring(1).replace(",", "")
              , o = +(u / u)
              , t = item_data(r, l, y, o, u);
            a.push(t)
        }
    } catch (h) {}
    return a
}
function parseWalmart(e) {
    var t, a = [];
    try {
        for (var s = e.getElementsByClassName("cart-list cart-list-active")[0].getElementsByTagName("div")[1].getElementsByClassName("cart-item-row"), n = 0; n < s.length; n++)
            if ("cart-item-row" === s[n].getAttribute("class")) {
                var r, l = "https://www.walmart.com" + s[n].getElementsByClassName("cart-item-name js-product-title")[0].getElementsByTagName("a")[0].getAttribute("href"), m = s[n].getElementsByClassName("asset-container")[0].getElementsByTagName("img")[0].getAttribute("src"), i = s[n].getElementsByClassName("cart-item-name js-product-title")[0].innerText, g = s[n].getElementsByClassName("chooser-option-current js-chooser-option-current")[0].innerText, c = s[n].getElementsByClassName("Price Price--flair cart-item-primary-price display-block")[0].innerText.substring(1).replace(",", "");
                try {
                    r = s[n].getElementsByClassName("u-textGrey cart-item-variant-1")[0].innerText.replace("Actual Color:", "")
                } catch (y) {}
                var u;
                try {
                    u = s[n].getElementsByClassName("u-textGrey cart-item-variant-0")[0].innerText.replace("Size:", "")
                } catch (y) {}
                var o = +(c / g).toFixed(2)
                  , t = item_data(l, m, i, g, o, u, r);
                a.push(t)
            }
    } catch (h) {}
    return a
}
function parseOverstock(e) {
    var t, a = [];
    try {
        for (var s = e.getElementsByClassName("cart-item-wrapper"), n = 0; n < s.length; n++) {
            for (var r = s[n].getElementsByClassName("sku")[0].innerText.replace("ITEM#", ""), l = s[n].getElementsByClassName("col-xs-4 cart-item-title")[0].getElementsByTagName("a")[0].getAttribute("href"), m = s[n].getElementsByClassName("col-xs-2 cart-item-img")[0].getElementsByTagName("img")[0].getAttribute("src"), i = s[n].getElementsByClassName("col-xs-4 cart-item-title")[0].innerText.split("ITEM#")[0], g = s[n].getElementsByClassName("col-xs-1 cart-item-qty")[0].getElementsByTagName("select")[0].children, c = 0; c < g.length; c++)
                if (g[c].hasAttribute("selected"))
                    var y = g[c].innerText;
            for (var u = s[n].getElementsByClassName("container-fluid cart-item")[0].children, o = 0; o < u.length; o++)
                if ("col-xs-2 cart-item-price onSaletrue" === u[o].getAttribute("class"))
                    var h = s[n].getElementsByClassName("cart-price-Sale  col-md-8")[0].innerText.substring(1).replace(",", "");
                else if ("col-xs-2 cart-item-price onSalefalse" === u[o].getAttribute("class"))
                    var h = s[n].getElementsByClassName("cart-price-Today  col-md-12")[0].innerText.substring(1).replace(",", "");
            var d = +(h / y).toFixed(2);
            t = item_data(l, m, i, y, d, r),
            a.push(t)
        }
    } catch (N) {}
    return a
}
function parseNewlook(e) {
    var t, a = [];
    try {
        for (var s = e.getElementsByClassName("items")[0].getElementsByClassName("item"), n = 0; n < s.length; n++) {
            var r, l = "https:" + s[n].getElementsByClassName("item-col1")[0].getElementsByTagName("img")[0].getAttribute("src"), m = s[n].getElementsByClassName("product-title")[0].innerText.split("(")[0], i = "https://www.newlook.com" + s[n].getElementsByClassName("item-col1")[0].getElementsByTagName("a")[0].getAttribute("href");
            "ID:" + s[n].getElementsByClassName("thickbox product-info")[0].innerText.replace("(", "").replace(")", "");
            try {
                r = s[n].getElementsByClassName("itemOpt")[0].innerText
            } catch (g) {}
            var c;
            try {
                c = s[n].getElementsByClassName("product-size")[0].innerText
            } catch (g) {}
            var y = s[n].getElementsByClassName("qtyValue")[0].innerText
              , u = s[n].getElementsByClassName("price-lineitem")[0].innerText.substring(1).replace(",", "")
              , o = (+(u / y)).toFixed(2)
              , t = item_data(i, l, m, y, o, c, r);
            a.push(t)
        }
    } catch (h) {}
    return a
}
function parseSaksoff5th(e) {
    var t, a = [];
    try {
        for (var s = e.getElementsByClassName("item-list")[0].getElementsByTagName("tbody")[0].getElementsByTagName("tr"), n = 0; n < s.length; n++) {
            var r = s[n].getElementsByClassName("item-edit-details")[0].getElementsByTagName("img")[0].getAttribute("src")
              , l = s[n].getElementsByClassName("name")[0].innerText
              , m = s[n].getElementsByClassName("short-description")[0].innerText
              , i = l + "," + m
              , g = "https://www.saksoff5th.com" + s[n].getElementsByClassName("item-edit-details")[0].getElementsByTagName("a")[0].getAttribute("data-custom-href")
              , c = "ID:" + s[n].getElementsByClassName("sku")[0].innerText
              , y = s[n].getElementsByClassName("attribute")[1].innerText
              , u = s[n].getElementsByClassName("attribute")[0].innerText
              , o = s[n].getElementsByClassName("item-quantity")[0].getElementsByTagName("input")[0].value
              , h = s[n].getElementsByClassName("price-sales")[0].innerText.substring(1)
              , t = item_data(g, r, i, o, h, u, y, c);
            a.push(t)
        }
    } catch (d) {}
    return a
}
function parseGap(e) {
    var t, a = [];
    try {
        for (var s = e.getElementsByClassName("lineItemsContainer ng-isolate-scope")[0].children, n = 0; n < s.length; n++) {
            for (var r = "https://secure-www.gap.com" + s[n].getElementsByClassName("imgResponsive")[0].getAttribute("ng-src"), l = s[n].getElementsByClassName("productName")[0].innerText, m = s[n].getElementsByClassName("productName")[0].getElementsByTagName("a")[0].getAttribute("href"), i = s[n].getElementsByClassName("subTotal ng-binding")[0].innerText.substring(1).replace(",", ""), g = ("ID:" + s[n].getElementsByClassName("productSku ng-binding")[0].innerText.replace("#", ""),
            "Color:" + s[n].getElementsByClassName("productStyleColor ng-binding")[0].innerText), c = "Size:" + s[n].getElementsByClassName("productStyleSize ng-binding")[0].innerText, y = s[n].getElementsByClassName("productMarkdownValue ng-scope")[0].children, u = 0; u < y.length; u++) {
                if ("font9 ng-binding" === y[u].getAttribute("class")) {
                    var o = s[n].getElementsByClassName("font9 ng-binding")[0].innerText.substring(1);
                    break
                }
                if ("font9 font9-orange ng-binding" === y[u].getAttribute("class")) {
                    var o = s[n].getElementsByClassName("font9 font9-orange ng-binding")[0].innerText.substring(1);
                    break
                }
            }
            var h = +(i / o)
              , t = item_data(m, r, l, h, o, c, g);
            a.push(t)
        }
    } catch (d) {}
    return a
}
function parseApple(e) {
    var t, a = [];
    try {
        for (var s = e.getElementsByClassName("inset-row")[1].getElementsByClassName("cart-item is-removable is-removable-height hrt "), n = 0; n < s.length; n++) {
            var r = s[n].getElementsByClassName("cart-product")[0].getElementsByTagName("img")[0].getAttribute("src")
              , l = s[n].getElementsByClassName("mbs content")[0].innerText
              , m = "https://www.apple.com" + s[n].getElementsByClassName("mbs content")[0].getElementsByTagName("a")[0].getAttribute("href")
              , i = s[n].getElementsByClassName("item quantity-price plm fwb")[0].innerText.split(":")[1].substring(1).replace(",", "")
              , g = s[n].getElementsByClassName("item first product-price")[0].innerText.split(":")[1].substring(1).replace(",", "")
              , c = +(i / g)
              , t = item_data(m, r, l, c, g);
            a.push(t)
        }
    } catch (y) {}
    return a
}
function parseWSFS(e) {
    var t, a = [];
    try {
        for (var s = e.getElementsByClassName("v65-cart-details-row"), n = 0; n < s.length; n++) {
            for (var r = s[n].getElementsByClassName("cart-item-name")[0].innerText, l = "https://www.wholesalefashionsquare.com/" + s[n].getElementsByClassName("carttext colors_text")[0].getElementsByTagName("a")[0].getAttribute("href"), m = s[n].children, i = 0; i < m.length; i++)
                if ("v65-cart-detail-productimage v65-item-zebra" === m[i].getAttribute("class"))
                    var g = "https://www.wholesalefashionsquare.com" + s[n].getElementsByClassName("v65-cart-detail-productimage v65-item-zebra")[0].getElementsByTagName("img")[0].getAttribute("src");
                else {
                    if ("v65-cart-detail-productimage" !== m[i].getAttribute("class"))
                        break;
                    var g = "https://www.wholesalefashionsquare.com" + s[n].getElementsByClassName("v65-cart-detail-productimage")[0].getElementsByTagName("img")[0].getAttribute("src")
                }
            var c = s[n].getElementsByClassName("carttext colors_text")[2].innerText.substring(1).replace("&nbsp;", "").replace(",", "")
              , y = s[n].getElementsByClassName("carttext colors_text")[1].innerText.substring(1).replace("&nbsp;", "").replace(",", "")
              , u = +(c / y)
              , t = item_data(l, g, r, u, y);
            a.push(t)
        }
    } catch (o) {}
    return a
}
function parseZara(e) {
    var t, a = [];
    try {
        for (var s = e.getElementsByClassName("table shopBag")[0].getElementsByClassName("orderItem"), n = 0; n < s.length; n++) {
            var r, l = s[n].getElementsByTagName("td")[1].getElementsByTagName("img")[0].getAttribute("src");
            try {
                r = s[n].getElementsByClassName("desc")[0].innerText.split("Ref")[0]
            } catch (m) {}
            var i, g = s[n].getElementsByTagName("td")[1].getElementsByTagName("a")[0].getAttribute("href"), c = s[n].getElementsByClassName("price")[0].innerText.split("&")[0].replace(",", "").replace("USD", ""), y = s[n].getElementsByClassName("num")[0].innerText, u = +(c / y), o = s[n].getElementsByClassName("desc")[0].innerText.replace("&nbsp;", "");
            try {
                i = s[n].getElementsByClassName("color")[0].innerText
            } catch (m) {}
            var h;
            try {
                h = s[n].getElementsByClassName("size")[0].innerText
            } catch (m) {}
            var t = item_data(g, l, r, y, u, i, h, o);
            a.push(t)
        }
    } catch (d) {}
    return a
}
function parseBernadi(e) {
    var t, a = [];
    try {
        for (var s = e.getElementsByClassName("cartproductgrid")[0].getElementsByTagName("tbody")[0].children, n = 1; n < s.length; n++) {
            var r = "http://www.bernardiparts.com" + s[n].getElementsByClassName("cartitemimage")[0].getElementsByTagName("img")[0].getAttribute("src")
              , l = s[n].getElementsByClassName("cartproductname")[0].innerText
              , m = "http://www.bernardiparts.com" + s[n].getElementsByClassName("inputvalue")[0].getElementsByTagName("a")[0].getAttribute("href")
              , i = s[n].getElementsByClassName("cartsku")[0].innerText
              , g = s[n].getElementsByClassName("cartproductprice")[0].innerText.substring(1).replace(",", "")
              , c = s[n].getElementsByClassName("productquantitycolumn")[0].getElementsByTagName("input")[0].value
              , t = item_data(m, r, l, c, g, i);
            a.push(t)
        }
    } catch (y) {}
    return a
}
function parseAutoZone(e) {
    var t, a = [];
    try {
        for (var s = e.getElementsByClassName("formBody")[0].getElementsByClassName("grid-24 store row"), n = 0; n < s.length; n++) {
            var r = s[n].getElementsByClassName("productImage")[0].getElementsByTagName("img")[0].getAttribute("src")
              , l = s[n].getElementsByClassName("name")[0].innerText
              , m = "http://www.autozone.com" + s[n].getElementsByClassName("productImage")[0].getElementsByTagName("a")[0].getAttribute("href")
              , i = "ID:" + s[n].getElementsByClassName("product-text-info")[0].innerText
              , g = s[n].getElementsByClassName("unit-price")[0].innerText.replace("Unit Price", "").substring(2)
              , c = s[n].getElementsByClassName("quantity grid-2 push-2")[0].getElementsByTagName("input")[0].value
              , t = item_data(m, r, l, c, g, i);
            a.push(t)
        }
    } catch (y) {}
    return a
}
function parseShoedazzle(e) {
    var t, a = [];
    try {
        for (var s = e.getElementsByClassName("item clearAfter")[0].getElementsByClassName("ruled_row clearAfter shopping_bag_item"), n = 0; n < s.length; n++)
            if (n + 1 !== s.length) {
                var r = "https:" + s[n].getElementsByClassName("floatleft")[0].getElementsByTagName("img")[0].getAttribute("src")
                  , l = s[n].getElementsByClassName("product_detail clearAfter")[0].innerText
                  , m = s[n].getElementsByClassName("product_name")[0].innerText
                  , i = m + "," + l
                  , g = s[n].getElementsByClassName("product_info")[0].getElementsByTagName("a")[1].getAttribute("href")
                  , c = s[n].getElementsByClassName("price-sale")[0].innerHTML.split("<")[0].substring(1)
                  , y = s[n].getElementsByClassName("price-sale")[0].getElementsByTagName("sup")[0].innerText
                  , u = c + "." + y
                  , o = +(u / u)
                  , t = item_data(g, r, i, o, u);
                a.push(t)
            }
    } catch (h) {}
    return a
}
function parseBeauty(e) {
    var t, a = [];
    try {
        for (var s = e.getElementsByClassName("h-f-2col-left")[0].getElementsByClassName("row"), n = 0; n < s.length; n++) {
            var r = s[n].getElementsByClassName("image")[0].getElementsByTagName("img")[0].getAttribute("src")
              , l = s[n].getElementsByClassName("description")[0].innerText
              , m = "http://www.beauty.com/" + tab_domain + s[n].getElementsByClassName("description")[0].getElementsByTagName("a")[0].getAttribute("href")
              , i = s[n].getElementsByClassName("bag-qty")[0].getElementsByTagName("input")[0].value
              , g = s[n].getElementsByClassName("total")[0].getElementsByTagName("h2")[0].innerText.substring(1).replace(",", "")
              , c = +(g / i).toFixed(2)
              , t = item_data(m, r, l, i, c);
            a.push(t)
        }
    } catch (y) {}
    return a
}
function parseAutoparts(e) {
    var t, a = [];
    try {
        for (var s = e.getElementsByClassName("table")[0].getElementsByTagName("tbody")[0].getElementsByTagName("tr"), n = 0; n < s.length; n++) {
            var r = s[n].getElementsByClassName("product-image")[0].getElementsByTagName("img")[0].getAttribute("src")
              , l = s[n].getElementsByClassName("product-name")[0].innerText
              , m = s[n].getElementsByClassName("partnum")[0].innerText
              , i = "http://www.autopartswarehouse.com/search/?Ntt=" + m + "&searchType=global&shopId=1&N=0&addfitment=1"
              , g = s[n].getElementsByClassName("qty")[0].getElementsByTagName("input")[0].value
              , c = s[n].getElementsByClassName("price")[0].innerText.substring(1)
              , t = item_data(i, r, l, g, c);
            a.push(t)
        }
    } catch (y) {}
    return a
}
function parseOreilly(e) {
    var t, a = [];
    try {
        var s = e.getElementsByClassName("or-cart")[0].getElementsByClassName("cart-row");
        console.log(s.length);
        for (var n = 0; n < s.length; n++) {
            var r = s[n].getElementsByClassName("cart-img-wrap")[0].getElementsByTagName("img")[0].getAttribute("src")
              , l = s[n].getElementsByClassName("cart-prod")[0].getElementsByTagName("h4")[0].innerText
              , m = (s[n].getElementsByClassName("line-part-numb")[0].innerText,
            "https://www.oreillyauto.com" + s[n].getElementsByClassName("cart-prod")[0].getElementsByTagName("h4")[0].getElementsByTagName("a")[0].getAttribute("href"))
              , i = s[n].getElementsByClassName("cart-qty")[0].getElementsByTagName("input")[0].value
              , g = s[n].getElementsByClassName("cart-item-price sans")[0].innerText.substring(1)
              , c = +(g / i).toFixed(2)
              , t = item_data(m, r, l, i, c);
            a.push(t)
        }
    } catch (y) {}
    return a
}
function parseAdvanceautoparts(e) {
    var t, a = [];
    try {
        var s = e.getElementsByClassName("scart_item");
        console.log(s.length);
        for (var n = 0; n < s.length; n++) {
            var r = "http://shop.advanceautoparts.com/" + s[n].getElementsByClassName("scart_item_c1")[0].getElementsByTagName("img")[0].getAttribute("src")
              , l = s[n].getElementsByClassName("scart_item_c2")[0].getElementsByTagName("a")[0].innerText
              , m = (s[n].getElementsByClassName("scart_item_c2")[0].getElementsByClassName("sku")[0].innerText.replace("&nbsp;", ""),
            s[n].getElementsByClassName("scart_item_c1")[0].getElementsByTagName("a")[0].getAttribute("href"))
              , i = s[n].getElementsByClassName("scart_item_c3_r1")[0].getElementsByTagName("input")[0].value
              , g = s[n].getElementsByClassName("cart-offer-price")[0].innerText.substring(1)
              , t = item_data(m, r, l, i, g);
            a.push(t)
        }
    } catch (c) {}
    return a
}
function parseCarid(e) {
    var t, a = [];
    try {
        for (var s = e.getElementsByClassName("cart_section"), n = 0; n < s.length; n++) {
            for (var r = "http://www.carid.com" + s[n].getElementsByTagName("img")[0].getAttribute("src"), l = s[n].getElementsByClassName("cart_prod_name")[0].innerText, m = s[n].getElementsByClassName("cart_prod_select")[0].innerText.replace("SKU:", ""), i = s[n].getElementsByTagName("a")[0].getAttribute("href"), g = s[n].getElementsByClassName("cart_prod_sett")[0].getElementsByClassName("cart_prod_select")[1].innerText.replace("Price:", "").substring(1), c = s[n].getElementsByClassName("cart_prod_sett")[0].getElementsByClassName("cart_prod_select")[2].getElementsByTagName("select")[0].children, y = 0; y < c.length; y++)
                if (c[y].hasAttribute("selected"))
                    var u = c[y].innerText;
            var t = item_data(i, r, l, u, g, m);
            a.push(t)
        }
    } catch (o) {}
    return a
}
function parsePepboys(e) {
    var t, a = [];
    try {
        for (var s = e.getElementsByClassName("cart table")[0].getElementsByTagName("tbody")[0].getElementsByTagName("tr"), n = 0; n < s.length; n++) {
            var r, l = s[n].getElementsByClassName("span3 lMarginClear")[0].getElementsByTagName("img")[0].getAttribute("src"), m = s[n].getElementsByClassName("span9")[0].getElementsByTagName("a")[0].innerText, i = "Part#:" + s[n].getElementsByClassName("value")[0].innerText, g = "https://www.pepboys.com" + s[n].getElementsByClassName("span9")[0].getElementsByTagName("a")[0].getAttribute("href");
            try {
                r = s[n].getElementsByTagName("td")[2].getElementsByTagName("em")[0].innerText.substring(1)
            } catch (c) {
                r = s[n].getElementsByTagName("td")[2].getElementsByClassName("span12 lpadded")[0].innerText.substring(1)
            }
            for (var y = s[n].getElementsByClassName("span12 lpadded")[0].getElementsByTagName("select")[0].children, u = 0; u < y.length; u++)
                if (y[u].hasAttribute("selected"))
                    var o = y[u].innerText;
            var t = item_data(g, l, m, o, r, i);
            a.push(t)
        }
    } catch (h) {}
    return a
}
function parseBlackberry(e) {
    var t, a = [];
    try {
        for (var s = e.getElementsByTagName("table")[0].getElementsByTagName("tbody")[0].getElementsByTagName("tr"), n = 0; n < s.length; n++)
            if (!s[n].hasAttribute("id")) {
                var r = "https://shop.blackberry.com" + s[n].getElementsByClassName("dr_productImageDiv")[0].getElementsByTagName("img")[0].getAttribute("src")
                  , l = s[n].getElementsByClassName("dr_productNameDiv")[0].getElementsByTagName("a")[0].innerText
                  , m = "https://shop.blackberry.com" + s[n].getElementsByClassName("dr_productNameDiv")[0].getElementsByTagName("a")[0].getAttribute("href")
                  , i = s[n].getElementsByClassName("dr_unitPrice")[0].innerText.replace("Price:&nbsp;", "").substring(1)
                  , g = s[n].getElementsByClassName("dr_qty")[0].getElementsByTagName("input")[2].value
                  , t = item_data(m, r, l, g, i);
                a.push(t)
            }
    } catch (c) {}
    return a
}
function parseMicrocenter(e) {
    var t, a = [];
    try {
        for (var s = e.getElementsByClassName("cart_content"), n = 0; n < s.length; n++) {
            var r = s[n].getElementsByClassName("cart_contentSection")[2].getElementsByTagName("img")[0].getAttribute("src")
              , l = s[n].getElementsByClassName("cart_contentSection")[2].getElementsByTagName("img")[0].getAttribute("alt")
              , m = s[n].getElementsByClassName("cart_contentSection")[2].getElementsByTagName("a")[0].getAttribute("href")
              , i = s[n].getElementsByClassName("cart_PriceTotalQty right")[0].getElementsByClassName("cart_bold")[0].innerText.substring(1)
              , g = s[n].getElementsByClassName("cart_quantity")[0].getElementsByTagName("input")[0].value
              , c = +(i / g).toFixed(2)
              , t = item_data(m, r, l, g, c);
            a.push(t)
        }
    } catch (y) {}
    return a
}
function parseAbt(e) {
    var t, a = [];
    try {
        for (var s = e.getElementsByClassName("cart_row"), n = 1; n < s.length; n++) {
            var r = s[n].getElementsByClassName("cart_image")[0].getElementsByTagName("img")[0].getAttribute("src")
              , l = s[n].getElementsByClassName("cart_details")[0].getElementsByTagName("a")[0].innerText
              , m = "http://www.abt.com" + s[n].getElementsByClassName("cart_image")[0].getElementsByTagName("a")[0].getAttribute("href")
              , i = s[n].getElementsByClassName("item_subtotal")[0].innerText.replace(",", "").substring(1)
              , g = s[n].getElementsByClassName("quantity")[0].getElementsByTagName("input")[1].value
              , c = +(i / g).toFixed(2)
              , t = item_data(m, r, l, g, c);
            a.push(t)
        }
    } catch (y) {}
    return a
}
function parseZoro(e) {
    var t, a = [];
    try {
        for (var s = e.getElementsByClassName("shopping-cart")[0].getElementsByTagName("article"), n = 0; n < s.length; n++) {
            var r = "https://" + s[n].getElementsByClassName("span2 thumbnail cart-item-thumbnail")[0].getElementsByTagName("img")[0].getAttribute("src")
              , l = s[n].getElementsByClassName("span2 thumbnail cart-item-thumbnail")[0].getElementsByTagName("img")[0].getAttribute("alt")
              , m = s[n].getElementsByClassName("span2 thumbnail cart-item-thumbnail")[0].getElementsByTagName("a")[0].getAttribute("href")
              , i = s[n].getElementsByClassName("amount")[0].innerText.substring(1)
              , g = s[n].getElementsByClassName("cart-qty-box")[0].getElementsByTagName("input")[0].value
              , t = item_data(m, r, l, g, i);
            a.push(t)
        }
    } catch (c) {}
    return a
}
function parseGrainger(e) {
    var t, a = [];
    try {
        for (var s = e.getElementsByClassName("service-box")[0].getElementsByClassName("cart-item-info cartItemInfoRow"), n = 0; n < s.length; n++) {
            var r = "http:" + s[n].getElementsByClassName("cart-img left")[0].getElementsByTagName("img")[0].getAttribute("src")
              , l = s[n].getElementsByClassName("cartItemDescription")[0].getElementsByTagName("a")[0].innerText
              , m = "http://www.grainger.com" + s[n].getElementsByClassName("cart-img left")[0].getElementsByTagName("a")[0].getAttribute("href")
              , i = s[n].getElementsByClassName("gcprice-value")[0].innerText.substring(1)
              , g = s[n].getElementsByClassName("quantity left")[0].getElementsByTagName("input")[5].value
              , t = item_data(m, r, l, g, i);
            a.push(t)
        }
    } catch (c) {}
    return a
}
function parseHyundai(e) {
    var t, a = [];
    try {
        for (var s = e.getElementsByClassName("page-cart wrap")[0].getElementsByTagName("table")[0].getElementsByTagName("tbody")[0].getElementsByTagName("tr"), n = 0; n < s.length; n++) {
            var r = "https:" + s[n].getElementsByClassName("cart-image")[0].getElementsByTagName("img")[0].getAttribute("src")
              , l = s[n].getElementsByClassName("item-description")[0].getElementsByTagName("a")[0].innerText
              , m = s[n].getElementsByClassName("cart-image")[0].getElementsByTagName("a")[0].getAttribute("href")
              , i = s[n].getElementsByClassName("cart-price")[0].innerText.substring(1)
              , g = s[n].getElementsByClassName("cart-quantity")[0].getElementsByTagName("input")[7].value
              , t = item_data(m, r, l, g, i);
            a.push(t)
        }
    } catch (c) {}
    return a
}
function parseToysrus(e) {
    var t, a = [];
    try {
        for (var s = e.getElementsByClassName("orderItem cartInfoRow"), n = 0; n < s.length; n++) {
            var r = "http://www.toysrus.com" + s[n].getElementsByClassName("description")[0].getElementsByTagName("img")[0].getAttribute("src")
              , l = s[n].getElementsByClassName("cartProductTitle")[0].innerText
              , m = "http://www.toysrus.com" + s[n].getElementsByClassName("description")[0].getElementsByTagName("a")[0].getAttribute("href")
              , i = s[n].getElementsByTagName("td")[2].getElementsByTagName("input")[0].value
              , g = s[n].getElementsByClassName("currency")[1].getElementsByTagName("strong")[0].innerText.substring(1).replace(",", "")
              , c = +(g / i).toFixed(2)
              , t = item_data(m, r, l, i, c);
            a.push(t)
        }
    } catch (y) {}
    return a
}
function parseEbay(e) {
    var t, a = [];
    try {
        for (var s = e.getElementsByClassName("c-std")[0].children, n = 1; n < s.length; n++) {
            var r, l = s[n].getElementsByClassName("imgt w140 h140")[0].getElementsByTagName("img")[0].getAttribute("src"), m = s[n].getElementsByClassName("sci-imgCont img140")[0].getElementsByTagName("a")[0].getAttribute("title"), i = s[n].getElementsByClassName("sci-imgCont img140")[0].getElementsByTagName("a")[0].getAttribute("href");
            try {
                r = s[n].getElementsByClassName("fr tr m0 p0 ff-ds3 fs16 clr000 prcol140 pb15")[0].getElementsByClassName("fw-b clr-sr")[0].innerText.replace("US", "").substring(2)
            } catch (g) {
                r = s[n].getElementsByClassName("fr tr m0 p0 ff-ds3 fs16 clr000 prcol140 pb15")[0].getElementsByClassName("fw-b")[0].innerText.replace("US", "").substring(2)
            }
            var c;
            try {
                c = s[n].getElementsByClassName("fl tr m0 p0 ff-ds3 fs12 prltv clr777 shqtycol140")[0].getElementsByTagName("input")[0].value
            } catch (g) {
                c = s[n].getElementsByClassName("fl tr m0 p0 ff-ds3 fs12 prltv clr777 shqtycol140")[0].innerText.replace("Quantity:", "")
            }
            var y = (r / c).toFixed(2)
              , t = item_data(i, l, m, c, y);
            a.push(t)
        }
    } catch (u) {}
    return a
}
function parseBestBuy(e) {
    var t, a = [];
    try {
        for (var s = e.getElementsByClassName("items unstyled")[0].children, n = 0; n < s.length; n++) {
            var r = s[n].getElementsByClassName("col-xs-6 media")[0].getElementsByTagName("img")[0].getAttribute("src")
              , l = s[n].getElementsByClassName("col-xs-6 details")[0].getElementsByTagName("span")[0].innerText
              , m = s[n].getElementsByClassName("col-xs-6 details")[0].getElementsByTagName("a")[0].getAttribute("href")
              , i = s[n].getElementsByClassName("emphasized-copy primary-price function-color-darkest")[0].innerText.substring(1).replace(",", "")
              , g = s[n].getElementsByClassName("col-xs-12 product-qty-block")[0].getElementsByTagName("input")[0].value
              , c = +(i / g).toFixed(2)
              , t = item_data(m, r, l, g, c);
            a.push(t)
        }
    } catch (y) {}
    return a
}
function parseHp(e) {
    var t, a = [];
    try {
        for (var s = e.getElementsByClassName("productItem discountitem"), n = 0; n < s.length; n++) {
            var r = "https:" + s[n].getElementsByClassName("imgContainer")[0].getElementsByTagName("img")[0].getAttribute("src")
              , l = s[n].getElementsByClassName("productInfo")[0].getElementsByTagName("a")[0].innerText
              , m = (s[n].getElementsByClassName("productInfo")[0].getElementsByTagName("h6")[0].innerText,
            "https://store.hp.com" + s[n].getElementsByClassName("imgContainer")[0].getElementsByTagName("a")[0].getAttribute("href"))
              , i = s[n].getElementsByClassName("red")[0].getElementsByTagName("input")[0].value.replace(",", "")
              , g = s[n].getElementsByClassName("current")[0].innerText
              , c = +(i / g).toFixed(2)
              , t = item_data(m, r, l, g, c);
            a.push(t)
        }
    } catch (y) {}
    return a
}
function parseRalphLauren(e) {
    var t, a = [];
    try {
        var s = e.getElementsByClassName("cart")[0].getElementsByTagName("tbody")[0].children;
        console.log(s.length);
        for (var n = 1; n < s.length; n++) {
            var r, l = s[n].getElementsByClassName("description")[0].getElementsByTagName("img")[0].getAttribute("src"), m = s[n].getElementsByClassName("description")[0].getElementsByTagName("p")[0].innerText, i = "http://www.ralphlauren.com" + s[n].getElementsByClassName("description")[0].getElementsByTagName("a")[0].getAttribute("href"), g = s[n].getElementsByClassName("currency")[0].innerText.replace(",", "").substring(1), c = s[n].getElementsByTagName("td")[0].getElementsByTagName("input")[0].value;
            try {
                r = s[n].getElementsByClassName("prodDetail")[0].getElementsByTagName("tr")[1].getElementsByTagName("td")[0].innerText
            } catch (y) {}
            var u;
            try {
                u = s[n].getElementsByClassName("prodDetail")[0].getElementsByTagName("tr")[2].getElementsByTagName("td")[0].innerText
            } catch (y) {}
            var t = item_data(i, l, m, c, g, r, u);
            a.push(t)
        }
    } catch (o) {}
    return a
}
function parseKarmaloop(e) {
    var t, a = [];
    try {
        for (var s = e.getElementsByClassName("product-table")[0].getElementsByTagName("tbody")[0].children, n = 1; n < s.length; n++) {
            var r, l = s[n].getElementsByClassName("image")[0].getElementsByTagName("img")[0].getAttribute("src"), m = s[n].getElementsByClassName("brand")[0].innerText, i = s[n].getElementsByClassName("product-title")[0].getElementsByTagName("a")[0].innerText, g = m + "," + i, c = s[n].getElementsByClassName("image")[0].getElementsByTagName("a")[0].getAttribute("href"), y = s[n].getElementsByClassName("subtotal")[0].innerText.replace(",", "").substring(1), u = s[n].getElementsByClassName("view-qty")[0].innerText, o = +(y / u).toFixed(2), h = s[n].getElementsByClassName("sku")[0].innerText.replace("Style Number", "");
            try {
                r = s[n].getElementsByClassName("color")[0].innerText
            } catch (d) {}
            var N;
            try {
                N = s[n].getElementsByClassName("size")[0].innerText
            } catch (d) {}
            var t = item_data(c, l, g, u, o, h, r, N);
            a.push(t)
        }
    } catch (B) {}
    return a
}
function parseAeropostale(e) {
    var t, a = [];
    try {
        for (var s = e.getElementsByClassName("cartInfoRow"), n = 0; n < s.length; n++) {
            var r = "http://www.aeropostale.com" + s[n].getElementsByTagName("td")[2].getElementsByTagName("img")[0].getAttribute("src")
              , l = s[n].getElementsByTagName("td")[2].getElementsByTagName("img")[0].getAttribute("alt")
              , m = "http://www.aeropostale.com" + s[n].getElementsByTagName("td")[2].getElementsByTagName("a")[0].getAttribute("href")
              , i = s[n].getElementsByTagName("td")[2].getElementsByTagName("span")[0].innerText.replace("Item#:&nbsp;", "")
              , g = s[n].getElementsByTagName("td")[5].innerText.replace("GBP", "")
              , c = s[n].getElementsByTagName("td")[1].getElementsByTagName("input")[0].value;
            try {
                color = s[n].getElementsByTagName("td")[4].innerText.replace("&nbsp;", "").split("Color:")[1].split("Size:")[0]
            } catch (y) {}
            var u;
            try {
                u = s[n].getElementsByTagName("td")[4].innerText.replace("&nbsp;", "").split("Size:")[1]
            } catch (y) {}
            var t = item_data(m, r, l, c, g, i, color, u);
            a.push(t)
        }
    } catch (o) {}
    return a
}
function parseElfcosmetics(e) {
    var t, a = [];
    try {
        for (var s = e.getElementsByClassName("shopping-block-wrap")[0].children, n = 0; n < s.length; n++) {
            for (var r = s[n].getElementsByClassName("img-wrap")[0].getElementsByTagName("img")[0].getAttribute("src"), l = "http://www.elfcosmetics.com" + s[n].getElementsByClassName("img-wrap")[0].getElementsByTagName("a")[0].getAttribute("href"), m = s[n].getElementsByClassName("col-xs-7 col-sm-12")[0].getElementsByTagName("a")[0].innerText, i = (s[n].getElementsByClassName("item")[0].innerText.replace("Item", ""),
            s[n].getElementsByClassName("row qty-price-value")[0].getElementsByClassName("col-md-4 col-sm-4")[0].innerText.substring(1)), g = s[n].getElementsByClassName("form-group")[0].getElementsByTagName("select")[0].children, c = 0; c < g.length; c++)
                if (g[c].hasAttribute("selected"))
                    var y = g[c].innerText;
            var t = item_data(l, r, m, y, i);
            a.push(t)
        }
    } catch (u) {}
    return a
}
function parseVictoriasecret(e) {
    var t, a = [];
    try {
        for (var s = e.getElementsByClassName("item"), n = 0; n < s.length; n++) {
            var r = "https:" + s[n].getElementsByTagName("span")[0].getElementsByTagName("img")[0].getAttribute("src")
              , l = "https://www.victoriassecret.com" + s[n].getAttribute("data-productpageurl").replace("amp;", "")
              , m = (s[n].getElementsByClassName("info-tooltip")[0].innerText.replace("In Stock", ""),
            s[n].getElementsByClassName("itemTextWrapper")[0].getElementsByClassName("returnToProductPage")[0].innerText)
              , i = s[n].getAttribute("data-adj-unit-price").substring(1)
              , g = s[n].getAttribute("data-quantity");
            try {
                color = s[n].getElementsByClassName("itemTextWrapper")[0].getElementsByTagName("table")[0].getElementsByTagName("tr")[0].getElementsByTagName("td")[1].innerText
            } catch (c) {}
            var y;
            try {
                y = s[n].getElementsByClassName("itemTextWrapper")[0].getElementsByTagName("table")[0].getElementsByTagName("tr")[1].getElementsByTagName("td")[1].innerText
            } catch (c) {}
            var t = item_data(l, r, m, g, i);
            a.push(t)
        }
    } catch (u) {}
    return a
}
function parseIkeaUs(e) {
    var t, a = [];
    try {
        for (var s = e.querySelectorAll(".whiteRow, .grayRow"), n = 0; n < s.length; n++) {
            var r = "http://www.ikea.com" + s[n].getElementsByClassName("prodImage")[0].getElementsByTagName("img")[0].getAttribute("src")
              , l = s[n].getElementsByClassName("prodDesc")[0].innerText
              , m = "http://www.ikea.com" + s[n].getElementsByClassName("prodImage")[0].getElementsByTagName("a")[0].getAttribute("href")
              , i = s[n].getElementsByClassName("quantityField")[0].getElementsByTagName("input")[0].value
              , g = s[n].getElementsByClassName("colPrice")[0].innerText.substring(1)
              , t = item_data(m, r, l, i, g);
            a.push(t)
        }
    } catch (c) {}
    return a
}
function parseOfficedepot(e) {
    var t, a = [];
    try {
        for (var s = e.getElementsByClassName("products")[0].getElementsByClassName("cartEntry"), n = 0; n < s.length; n++) {
            var r = s[n].getElementsByClassName("photo")[0].getElementsByTagName("img")[0].getAttribute("src")
              , l = s[n].getElementsByClassName("row clearfix")[0].getElementsByTagName("a")[0].innerText
              , m = (s[n].getElementsByClassName("item_sku")[0].innerText.replace("&nbsp", "").replace("Item# ", ""),
            "http://www.officedepot.com" + s[n].getElementsByClassName("photo")[0].getElementsByTagName("a")[0].getAttribute("href"))
              , i = s[n].getElementsByClassName("form_field quantity_field")[0].getElementsByTagName("input")[0].value
              , g = s[n].getElementsByClassName("extended_price")[0].innerText.replace("/&nbsp;each", "").substring(1).split("$")[0]
              , c = +(g / i).toFixed(2)
              , t = item_data(m, r, l, i, c);
            a.push(t)
        }
    } catch (y) {}
    return a
}
function parseCellular(e) {
    var t, a = [];
    try {
        for (var s = e.querySelectorAll(".rowEven, .rowOdd"), n = 0; n < s.length; n++) {
            var r = "https://www.cellularcountry.com/" + s[n].getElementsByClassName("cartProductDisplay")[0].getElementsByTagName("div")[0].getElementsByClassName("back")[0].getElementsByTagName("img")[0].getAttribute("src")
              , l = s[n].getElementsByClassName("cartProductDisplay")[0].getElementsByTagName("div")[0].getElementsByTagName("a")[0].getAttribute("href")
              , m = s[n].getElementsByClassName("cartUnitDisplay")[0].getElementsByTagName("input")[0].value
              , i = s[n].getElementsByClassName("cartTotalDisplay")[0].innerText.replace(",", "").substring(1)
              , g = +(i / m).toFixed(2)
              , c = s[n].getElementsByClassName("cartProductDisplay")[0].getElementsByTagName("div")[0].getElementsByClassName("back")[0].getElementsByTagName("img")[0].getAttribute("title")
              , t = item_data(l, r, c, m, g);
            a.push(t)
        }
    } catch (y) {}
    return a
}
function parseAbesofmaine(e) {
    var t, a = [];
    try {
        for (var s = e.getElementsByClassName("pgwrap")[0].getElementsByTagName("div")[0].getElementsByTagName("div")[0].getElementsByTagName("div")[0].getElementsByTagName("form")[0].getElementsByTagName("table")[0].getElementsByTagName("tr"), n = 1; n < s.length; n++)
            if ((n + 1) % 2 == 0) {
                var r = "http://www.abesofmaine.com" + s[n].getElementsByClassName("itemimg")[0].getElementsByTagName("img")[0].getAttribute("src")
                  , l = "http://www.abesofmaine.com" + s[n].getElementsByClassName("itemimg")[0].getElementsByTagName("a")[0].getAttribute("href")
                  , m = s[n].getElementsByClassName("qty")[0].getElementsByTagName("input")[0].value
                  , i = s[n].getElementsByClassName("unitprice")[0].innerText.substring(1)
                  , g = s[n].getElementsByClassName("itemimg")[0].getElementsByTagName("img")[0].getAttribute("alt")
                  , t = (s[n].getElementsByClassName("prodinfo")[0].getElementsByTagName("a")[0].innerText,
                item_data(l, r, g, m, i));
                a.push(t)
            }
    } catch (c) {}
    return a
}
function parseOvisonline(e) {
    var t, a = [];
    try {
        for (var s = e.querySelectorAll(".oddRow, .evenRow"), n = 0; n < s.length; n++) {
            var r = "https://www.ovisonline.com/" + s[n].getElementsByClassName("thumbnail")[0].getElementsByTagName("img")[0].getAttribute("src")
              , l = "https://www.ovisonline.com/" + s[n].getElementsByClassName("thumbnail")[0].getElementsByTagName("a")[0].getAttribute("href")
              , m = s[n].getElementsByClassName("quantity")[0].getElementsByTagName("input")[0].value
              , i = s[n].getElementsByClassName("price")[0].innerText.replace(",", "").substring(1)
              , g = s[n].getElementsByClassName("itemDetail basketItemDetail")[0].getElementsByTagName("a")[0].innerText
              , c = s[n].getElementsByClassName("sku")[0].innerText
              , t = item_data(l, r, g, m, i, c);
            a.push(t)
        }
    } catch (y) {}
    return a
}
function parsePayless(e) {
    var t, a = [];
    try {
        for (var s = e.getElementsByClassName("cart-row"), n = 0; n < s.length; n++) {
            var r, l = s[n].getElementsByClassName("item-image")[0].getElementsByTagName("img")[0].getAttribute("src"), m = s[n].getElementsByClassName("name")[0].getElementsByTagName("a")[0].getAttribute("href"), i = s[n].getElementsByClassName("item-quantity")[0].getElementsByTagName("input")[0].value, g = s[n].getElementsByClassName("price-sales")[0].innerText.replace(",", "").substring(1), c = s[n].getElementsByClassName("name")[0].getElementsByTagName("a")[0].innerText, y = s[n].getElementsByClassName("sku")[0].getElementsByClassName("value")[0].innerText;
            try {
                r = div[n].getElementsByClassName("value Color")[0].innerText
            } catch (u) {}
            var o;
            try {
                o = div[n].getElementsByClassName("value Size")[0].innerText
            } catch (u) {}
            var t = item_data(m, l, c, i, g, y, r, o);
            a.push(t)
        }
    } catch (h) {}
    return a
}
function parseAmi(e) {
    var t, a = [];
    try {
        for (var s = e.getElementsByClassName("twenty columns data-table cart-table")[0].getElementsByTagName("tbody")[0].children, n = 0; n < s.length; n++) {
            var r, l = s[n].getElementsByClassName("two columns first block-productimage")[0].getElementsByTagName("img")[0].getAttribute("src"), m = s[n].getElementsByClassName("two columns first block-productimage")[0].getElementsByTagName("a")[0].getAttribute("href"), i = s[n].getElementsByClassName("two columns a-right qty block-productqty")[0].getElementsByTagName("input")[0].value;
            try {
                r = s[n].getElementsByClassName("cart-price")[0].getElementsByClassName("special-price")[0].innerText.substring(1).replace(",", "")
            } catch (g) {
                r = s[n].getElementsByClassName("cart-price")[0].getElementsByClassName("price")[0].innerText.substring(1).replace(",", "")
            }
            var c = +(r / i).toFixed(2)
              , y = s[n].getElementsByClassName("product-name")[0].getElementsByTagName("a")[0].innerText
              , t = item_data(m, l, y, i, c);
            a.push(t)
        }
    } catch (u) {}
    return a
}
function parseCK(e) {
    var t, a = [];
    try {
        for (var s = e.getElementsByClassName("cart-window")[0].getElementsByClassName("clearfix smv cart-item"), n = 0; n < s.length; n++) {
            var r, l = "https://www.cookieskids.com/" + s[n].getElementsByTagName("img")[0].getAttribute("src"), m = s[n].getElementsByTagName("a")[0].getAttribute("href"), i = s[n].getElementsByClassName("red clear left item-total")[0].innerText.split(":")[1].substring(2).replace(",", ""), g = s[n].getElementsByClassName("right smv")[0].getElementsByTagName("span")[3].innerText.split(":")[1].substring(2).replace(",", ""), c = s[n].getElementsByClassName("right smv")[0].getElementsByTagName("a")[0].innerText, y = +(i / g), u = s[n].getElementsByClassName("right smv")[0].getElementsByTagName("span")[0].innerText.replace("Item #", "");
            try {
                r = s[n].getElementsByClassName("right smv")[0].getElementsByTagName("span")[2].innerText.split(":")[1]
            } catch (o) {}
            var h;
            try {
                h = s[n].getElementsByClassName("right smv")[0].getElementsByTagName("span")[1].innerText.split(":")[1]
            } catch (o) {}
            var t = item_data(m, l, c, y, g, u, r, h);
            a.push(t)
        }
    } catch (d) {}
    return a
}
function parseAdorama(e) {
    var t, a = [];
    try {
        for (var s = e.getElementsByClassName("item-list style-is-list cf")[0].getElementsByClassName("item"), n = 0; n < s.length; n++) {
            var r = "http:" + s[n].getElementsByClassName("item-img")[0].getElementsByTagName("img")[0].getAttribute("src")
              , l = s[n].getElementsByClassName("item-img")[0].getElementsByTagName("a")[0].getAttribute("href")
              , m = s[n].getElementsByClassName("item-qty action")[0].getElementsByTagName("input")[1].value
              , i = s[n].getElementsByClassName("item-price-each")[0].innerText.substring(1)
              , g = s[n].getElementsByClassName("item-link")[0].getElementsByTagName("a")[0].innerText
              , c = s[n].getElementsByClassName("productSku-mfr section")[0].innerText
              , t = item_data(l, r, g, m, i, c);
            a.push(t)
        }
    } catch (y) {}
    return a
}
function parseBH(e) {
    var t, a = [];
    try {
        for (var s = e.getElementsByClassName("itemInCart js-cartItem"), n = 0; n < s.length; n++) {
            var r = s[n].getElementsByClassName("table-cell item-image")[0].getElementsByTagName("img")[0].getAttribute("src")
              , l = s[n].getElementsByClassName("table-cell item-image")[0].getElementsByTagName("a")[0].getAttribute("href")
              , m = s[n].getElementsByClassName("qty qty-input-wrap")[0].getElementsByTagName("input")[0].value
              , i = s[n].getElementsByClassName("itemTTLprice")[0].innerText.replace(",", "")
              , g = s[n].getElementsByClassName("table-cell item-image")[0].getElementsByTagName("img")[0].getAttribute("alt")
              , c = s[n].getElementsByClassName("productNumbers")[0].innerText.replace("&nbsp;", "")
              , y = +(i / m).toFixed(2)
              , t = item_data(l, r, g, m, y, c);
            a.push(t)
        }
    } catch (u) {}
    return a
}
function parseOldnavy(e) {
    var t, a = [];
    try {
        for (var s = e.getElementsByClassName("lineItemsContainer ng-isolate-scope")[0].children, n = 0; n < s.length; n++) {
            for (var r = "https://secure-oldnavy.gap.com" + s[n].getElementsByClassName("imgResponsive")[0].getAttribute("ng-src"), l = s[n].getElementsByClassName("productName")[0].innerText, m = s[n].getElementsByClassName("productName")[0].getElementsByTagName("a")[0].getAttribute("href"), i = s[n].getElementsByClassName("subTotal ng-binding")[0].innerText.substring(1).replace(",", ""), g = ("ID:" + s[n].getElementsByClassName("productSku ng-binding")[0].innerText.replace("#", ""),
            "Color:" + s[n].getElementsByClassName("productStyleColor ng-binding")[0].innerText), c = "Size:" + s[n].getElementsByClassName("productStyleSize ng-binding")[0].innerText, y = s[n].getElementsByClassName("productMarkdownValue ng-scope")[0].children, u = 0; u < y.length; u++) {
                if ("font9 ng-binding" === y[u].getAttribute("class")) {
                    var o = s[n].getElementsByClassName("font9 ng-binding")[0].innerText.substring(1);
                    break
                }
                if ("font9 font9-orange ng-binding" === y[u].getAttribute("class")) {
                    var o = s[n].getElementsByClassName("font9 font9-orange ng-binding")[0].innerText.substring(1);
                    break
                }
            }
            var h = +(i / o)
              , t = item_data(m, r, l, h, o, c, g);
            a.push(t)
        }
    } catch (d) {}
    return a
}
function parseATHLETA(e) {
    var t, a = [];
    try {
        for (var s = e.getElementsByClassName("lineItemsContainer ng-isolate-scope")[0].children, n = 0; n < s.length; n++) {
            for (var r = "https://secure-athleta.gap.com" + s[n].getElementsByClassName("imgResponsive")[0].getAttribute("ng-src"), l = s[n].getElementsByClassName("productName")[0].innerText, m = s[n].getElementsByClassName("productName")[0].getElementsByTagName("a")[0].getAttribute("href"), i = s[n].getElementsByClassName("subTotal ng-binding")[0].innerText.substring(1).replace(",", ""), g = ("ID:" + s[n].getElementsByClassName("productSku ng-binding")[0].innerText.replace("#", ""),
            "Color:" + s[n].getElementsByClassName("productStyleColor ng-binding")[0].innerText), c = "Size:" + s[n].getElementsByClassName("productStyleSize ng-binding")[0].innerText, y = s[n].getElementsByClassName("productMarkdownValue ng-scope")[0].children, u = 0; u < y.length; u++) {
                if ("font9 ng-binding" === y[u].getAttribute("class")) {
                    var o = s[n].getElementsByClassName("font9 ng-binding")[0].innerText.substring(1);
                    break
                }
                if ("font9 font9-orange ng-binding" === y[u].getAttribute("class")) {
                    var o = s[n].getElementsByClassName("font9 font9-orange ng-binding")[0].innerText.substring(1);
                    break
                }
            }
            var h = +(i / o)
              , t = item_data(m, r, l, h, o, c, g);
            a.push(t)
        }
    } catch (d) {}
    return a
}
function parseBR(e) {
    var t, a = [];
    try {
        for (var s = e.getElementsByClassName("lineItemsContainer ng-isolate-scope")[0].children, n = 0; n < s.length; n++) {
            for (var r = "https://secure-bananarepublic.gap.com" + s[n].getElementsByClassName("imgResponsive")[0].getAttribute("ng-src"), l = s[n].getElementsByClassName("productName")[0].innerText, m = s[n].getElementsByClassName("productName")[0].getElementsByTagName("a")[0].getAttribute("href"), i = s[n].getElementsByClassName("subTotal ng-binding")[0].innerText.substring(1).replace(",", ""), g = ("ID:" + s[n].getElementsByClassName("productSku ng-binding")[0].innerText.replace("#", ""),
            "Color:" + s[n].getElementsByClassName("productStyleColor ng-binding")[0].innerText), c = "Size:" + s[n].getElementsByClassName("productStyleSize ng-binding")[0].innerText, y = s[n].getElementsByClassName("productMarkdownValue ng-scope")[0].children, u = 0; u < y.length; u++) {
                if ("font9 ng-binding" === y[u].getAttribute("class")) {
                    var o = s[n].getElementsByClassName("font9 ng-binding")[0].innerText.substring(1);
                    break
                }
                if ("font9 font9-orange ng-binding" === y[u].getAttribute("class")) {
                    var o = s[n].getElementsByClassName("font9 font9-orange ng-binding")[0].innerText.substring(1);
                    break
                }
            }
            var h = +(i / o)
              , t = item_data(m, r, l, h, o, c, g);
            a.push(t)
        }
    } catch (d) {}
    return a
}
function getSiteMethodName(e) {
    var t, a, s, n;
    return chrome.storage.local.get({
        sitesArray: []
    }, function(r) {
        var l = Object.keys(r)[0]
          , m = r[l]
          , i = m.filter(function(t) {
            return t[e]
        });
        try {
            var g = i[0][e]
              , c = window.location.href
              , y = g.shopping_cart_link;
            if (c != g.shopping_cart_link)
                return goToShoppingCartPage(y),
                !0;
            t = g.parse_method_name,
            a = g.exchange_rate,
            s = g.currency_sign,
            n = g.country
        } catch (u) {
            t = "siteNotFound"
        }
        callCartParserMethod(t, a, s, n)
    }),
    !1
}
function goToShoppingCartPage(e) {
    chrome.runtime.sendMessage({
        action: "window_loaded",
        cart_url: e
    }, function(e) {})
}
function callCartParserMethod(e, t, a, s) {
    function n(e, t) {
        this.shop_domain = e,
        this.document_body = t
    }
    n.prototype.parseShoppingCart = function() {
        try {
            return window[e](this.document_body)
        } catch (t) {
            return siteNotFound()
        }
    }
    ;
    var r = new n(tab_domain,document.body);
    chrome.runtime.sendMessage({
        action: "parseCart",
        site: document.title,
        itemArr: r.parseShoppingCart(),
        shop: tab_domain,
        exchange_rate: t,
        currency_sign: a,
        shop_country: s
    })
}
var tab_url = window.location.href
  , tab_domain = getActiveTabUrl();
console.log(tab_domain),
getSiteMethodName(tab_domain);
