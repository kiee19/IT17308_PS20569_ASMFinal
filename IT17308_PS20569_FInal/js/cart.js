// var arrsp = new Array;

function themvaogiohang(x) {
  var arrsp = new Array();
  // Đọc giỏ hàng
  var gh_str = sessionStorage.getItem("ssgiohang");
  if (gh_str != null) {
    arrsp = JSON.parse(gh_str);
  }
  // đọc tổng sp trong giỏ hàng
  var countsp = sessionStorage.getItem("countsp");
  if (countsp == null) {
    countsp = 0;
  }
  // lấy thông tin sản phẩm
  var ttsp = x.parentElement.children;
  var hinh = ttsp[0].children[0].src;
  var giasp = ttsp[1].children[0].innerText;
  var tensp = ttsp[2].innerText;
  var slsp = Number(ttsp[3].value);
  var soluong = parseInt(ttsp[3].value);
  var sp = [hinh, tensp, giasp, slsp];
  // kiem tra sản phẩm có trong giỏ hàng chưa
  var coroi = 0;
  for (var i = 0; i < arrsp.length; i++) {
    if (arrsp[i][1] == tensp) {
      var sldangco = arrsp[i][3];
      sldangco += slsp;
      arrsp[i][3] = sldangco;
      coroi = 1;
      break;
    }
  }
  // nêu chưa có thì thêm 1 dòng vào cuối arraysp
  if (coroi == 0) {
    arrsp.push(sp);
    countsp++;
  }
  // countsp();
  // addcart();
  // lưu giỏ hàng
  sessionStorage.setItem("ssgiohang", JSON.stringify(arrsp));
  sessionStorage.setItem("countsp", countsp);
  showcountsp();
}

// lấy thông tin đơn hàng khi chuyển qua trang thanh toán
function laydon() {
  // lấy giỏ hàng đã lưu trên sessionStorage về
  var gh_str = sessionStorage.getItem("ssgiohang");
  var arrsp = JSON.parse(gh_str);
  var ttgh = "";
  var tong = 0;
  // Tạo các dòng trong đơn hàng thể hiện trên trang
  for (var i = 0; i < arrsp.length; i++) {
    var tt = Number(arrsp[i][2] * arrsp[i][3]);
    tong += tt;
    ttgh += `
            <tr>
                <td>${i + 1}</td>
                <td><img src = "${arrsp[i][0]}"></td>
                <td>${arrsp[i][1]}</td>
                <td>${arrsp[i][2]}</td>
                <td><input type="number" min="0" max="10" value="${arrsp[i][3]}"
                                            onchange="tinhlaidon(this);"></td>
                <td>${tt}($)</td>
            </tr>
        `;
  }
  ttgh += `
    <tr>
        <td colspan = "5">TỔNG ĐƠN HÀNG</td>
        <td>${tong} ($)</td>
    </tr>
    `;
  document.getElementById("mycart").innerHTML = ttgh;
}

// Hàm hiển thị thông tin số sản phẩm có trong giỏ hàng
function showcountsp() {
  var countsp = sessionStorage.getItem("countsp");
  if (countsp == null) {
    countsp = 0;
  }
  document.getElementById("countsp").innerHTML = countsp;
}

// Hàm tính lại giá tiền sản phẩm có trong giỏ hàng khi có thay đổi số lượng
function tinhlaidon(x) {
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
    dongy = confirm("Số lượng 0 sẽ xóa sản phẩm khỏi giỏ hàng. OK?");
    // xóa trên giao diện
    if (dongy == true) {
      tr.remove();
    }
    // Xóa sp khỏi mảng
    for (var i = 0; i < arrsp.length; i++) {
      if (arrsp[i][1] == tensp) {
        arrsp.splice(i, 1);
      }
    }
    var countsp = parseInt(sessionStorage.getItem("countsp") - 1);
    sessionStorage.setItem("countsp", countsp);
    showcountsp();
  } else {
    for (var i = 0; i < arrsp.length; i++) {
      if (arrsp[i][1] == tensp) {
        arrsp[i][3] = sl;
      }
    }
    tt = dg * sl;
    tr.children[5].innerHTML = tt;
    tongdon += tt;
  }
  document.getElementById("tongtien").innerHTML = tongdon;
  sessionStorage.setItem("ssgiohang", JSON.stringify(arrsp));
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
  var gh_str = sessionStorage.getItem("ssgiohang");
  var arrsp = JSON.parse(gh_str);
  var ttgh = "";
  var tong = 0;
  // Tạo các dòng trong đơn hàng thể hiện trên trang
  for (var i = 0; i < arrsp.length; i++) {
    var tt = Number(arrsp[i][2] * arrsp[i][3]);
    tong += tt;
    ttgh += `
            <tr>
                <td>${i + 1}</td>
                <td><img src = "${arrsp[i][0]}"></td>
                <td>${arrsp[i][1]}</td>
                <td>${arrsp[i][2]}</td>
                <td><input type="number" min="0" max="10" value="${arrsp[i][3]}"
                                            onchange="tinhlaidon(this);"></td>
                <td>${tt}($)</td>
            </tr>
        `;
  }
  ttgh += `
    <tr>
        <td colspan = "5">TỔNG ĐƠN HÀNG</td>
        <td id="tongtien">${tong} ($)</td>
    </tr>
    `;
  document.getElementById("mycart").innerHTML = ttgh;
}

// slide show
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
  var anh = document.getElementById("anh");
  anh.src = arrAnh[index].src;
  document.getElementById("count").innerHTML = index + 1;
}

function previous() {
  index--;
  if (index < 0) index = arrAnh.length - 1;
  var anh = document.getElementById("anh");
  anh.src = arrAnh[index].src;
  document.getElementById("count").innerHTML = index + 1;
}
