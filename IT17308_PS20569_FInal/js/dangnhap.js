
function kiemtra() {
  if (!kiemtraSDT()) return false;
  if (!kiemtraPassword()) return false;
  alert("Đăng nhập thành công");
  
}
function kiemtraSDT() {
  var dt = document.forms["formdk"]["sodienthoai"];
  if (dt.value == '') {
    alert("Số điện thoại/Email không được rỗng");
    dt.focus();
    return false;
  }
  return true;
}
function kiemtraPassword() {
  var mk = document.forms["formdk"]["pass"];
  if (mk.value == '') {
    alert("Mật khẩu không được rỗng");
    mk.focus();
    return false;
  }
  return true;
}