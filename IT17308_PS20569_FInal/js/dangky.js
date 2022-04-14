function kiemtra() {
    if (!kiemtraho()) return false;
    if (!kiemtraSDT()) return false;
    if (!kiemtraPass()) return false;
    alert("Đăng kí thành công");
  }
  function kiemtraho() {
    var ho = document.forms["formdk"]["hoten"];
    if (ho.value == "") {

      alert("Họ tên không được rỗng");
      ho.focus();
      return false;
    }

    return true;
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
  function kiemtraEmail() {
    var dt = document.forms["formdk"]["email"];
    if (dt.value == '') {
      alert("Email không được rỗng");
      dt.focus();
      return false;
    }
    return true;
  }
  function kiemtragioitinh() {
    var gioitinh = document.forms["formdk"]["gioitinh"];
    if (!gioitinh[0].checked && !gioitinh[1].checked) {
      alert("Chọn giới tính là nam hoặc là nữ");
      gioitinh.focus();
      return false;
    }

    return true;
  }
  function kiemtraPass() {
    var mk = document.forms["formdk"]["pass"];
    if (mk.value == '') {
      alert("Mật khẩu không được rỗng");
      mk.focus();
      return false;
    }
    return true;
  }