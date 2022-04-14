document.getElementById("showcart").style.display = "none";

var arrsp = new Array();

function themvaogiohang(x) {
  var ttsp = x.parentElement.children;
  var hinh = ttsp[0].children[0].src;
  var gia = ttsp[1].children[0].innerText;
  var ten = ttsp[2].innerText;
  var soluong = parseInt(ttsp[3].value);
  var sp = [hinh, ten, gia, soluong];

  // kiem tra
  var ktra = 0;
  for (var i = 0; i < arrsp.length; i++) {
    if (arrsp[i][1] == ten) {
      var sl = arrsp[i][3];
      sl += soluong;
      arrsp[i][3] = sl;
      ktra = 1;
      break;
    }
  }

  if (ktra == 0) {
    arrsp.push(sp);
    countsp();
  }

  // lưu lên sessionStorage
  sessionStorage.setItem("ssgiohang", JSON.stringify(arrsp));
  sessionStorage.setItem("countsp", countsp);
  showcountsp();
}

function laydon() {
  var gh_str = sessionStorage.getItem("ssgiohang");
  var arrsp = JSON.parse(gh_str);

  var ttgh = "";
  var tong = 0;
  for (var i = 0; i < arrsp.length; i++) {
    let tt = Number(arrsp[i][2]) * Number(arrsp[i][3]);
    var tong = tong + tt;
    ttgh += `
        <tr>
        <td>${i + 1}</td>
         <td><img src="${arrsp[i][0]}" ></td>
         <td>${arrsp[i][1]}</td>
         <td>${arrsp[i][2]}</td>
         <td><input type="number" min="0" max="10" value="${arrsp[i][3]}" onChange="tinhlaidon(this);"</td>
         <td>${tt}($)</td>
        </tr>
        `;
  }

  ttgh += `
    <tr>
      <th colspan="5">Tổng đơn hàng</th>
      <th id="tongtien">${tong}</th>
    </tr>
  `
  document.getElementById('mycart').innerHTML = ttgh;
  // console.log(ttgh);

  document.getElementById("mycart").innerHTML = ttgh;
}

function tinhlaidon() {
  var gh_str = sessionStorage.getItem("ssgiohang");
  var arrsp = JSON.parse(gh_str);

  var tr = x.parentElement.parentElement;
  var dg = parseInt(tr.children[3].innerHTML);
  var sl = x.value;
  var tt = parseInt(tr.children[5].innerHTML);
  var tongdon = document.getElementById("tongtien").innerText;
  tongdon -= tt;

  var tensp = tr.children[2].innerText;
  if (sl == 0) {
    dongy = confirm("Số Lượng 0 sẽ xóa sản phẩm khỏi giỏ hàng. OK?");

    if (dongy == true) {
      tr.remove();
    }

    for (let i = 0; i < arrsp.length; i++) {
      if (arrsp[i][1] == tensp) {
        arrsp.splice(i, 1);
      }
    }
    var countsp = parseInt(sessionStorage.getItem("countsp") - 1);
    sessionStorage.setItem("countsp", countsp);
    showcountsp();
  } else {
    for (let i = 0; i < arrsp.length; i++) {
      if (arrsp[i][1] == tensp) {
        arrsp[i][3] = sl;
      }
    }
    tt = dg * sl;
    tr.children[5].innerHTML = tt;
    tongdon += tt;
  } 
  document.getElementById('tongtien').innerHTML = tongdon;
  sessionStorage.setItem('ssgiohang', JSON.stringify(giohang));
}

function showcountsp() {
  var countsp = sessionStorage.getItem("countsp");
  if (countsp == null) countsp = 0;
  document.getElementById("countsp").innerText = countsp;
}

function countsp() {
  var count = arrsp.length;
  // console.log(count);
  document.getElementById("countsp").innerText = count;
}

function showcart() {
  var x = document.getElementById("showcart");
  if (x.style.display == "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
  addcart();
}

function addcart() {
  var ttgh = "";
  var tong = 0;
  for (var i = 0; i < arrsp.length; i++) {
    let tt = Number(arrsp[i][2]) * Number(arrsp[i][3]);
    var tong = tong + tt;
    ttgh += `
        <tr>
        <td>${i + 1}</td>
         <td><img src="${arrsp[i][0]}" ></td>
         <td>${arrsp[i][1]}</td>
         <td>${arrsp[i][2]}</td>
         <td>${arrsp[i][3]}</td>
         <td>${tong}($)</td>
        </tr> 
        `;
  }
  console.log(ttgh);

  document.getElementById("mycart").innerHTML = ttgh;
}

function thayDoiTT(x) {
  var tr = x.parentElement.parentElement;
  var sl = tr.children[3].children[0];
  var tt = tr.children[4].children[0];
  var dg = tr.children[2].innerText;
  var td = tr.children[0].children[0];

  if (sl.value == "") {
    sl.value = "1";
    tt.innerText = dg;
  } else {
    sl.value = "";
    tt.innerText = "";
  }
  tinhTong();
}

function tinhTT(x) {
  var tr = x.parentElement.parentElement;
  var dg = tr.children[2].innerText;
  var sl = x.value;
  tr.children[4].children[0].innerText = Number(dg) * Number(sl);
  tinhTong();
}

function thaydoimucgia() {
  var arrPrice = document.getElementsByName(`price`);
  var priceChoice = document.getElementById("mucgia").value;
  for (let i = 0; i < arrPrice.length; i++) {
    var price = arrPrice[i].innerText;
    if (Number(price) < priceChoice || priceChoice == "Mức giá") {
      arrPrice[i].parentNode.style.display = "";
    } else {
      arrPrice[i].parentNode.style.display = "none";
    }
  }
  tinhTong();
}

function tinhTong() {
  // hien tong
  var tongtt = 0;
  var arrMoney = document.getElementsByName("thanhtien");
  // console.log(arrMoney);
  for (var i = 0; i < arrMoney.length; i++) {
    if ((arrMoney[i].parentNode.style.display = " ")) {
      var totalcount = arrMoney[i].innerText;
      var money = Number(totalcount);
      tongtt += money;
      // console.log(tongtt);
    }
  }
  document.getElementById("tong").innerText = tongtt;
}

var arrAnh = [];
        var n = 6;
        var index = 0;
        function loadAnh() {
            for (var i = 0; i < n; i++) {
                arrAnh[i] = new Image();
                arrAnh[i].src = "images_2/" + i + ".jpg";
            }
        }

        function next() {
            index++;
            if (index >= arrAnh.length) index = 0;
            var anh = document.getElementById('anh');
            anh.src = arrAnh[index].src;
            document.getElementById('count').innerHTML = index + 1;
        }

        function previous() {
            index--;
            if (index < 0) index = arrAnh.length - 1;
            var anh = document.getElementById('anh');
            anh.src = arrAnh[index].src;
            document.getElementById('count').innerHTML = index + 1;
        }