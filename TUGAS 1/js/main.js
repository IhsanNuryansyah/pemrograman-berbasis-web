// ==== LOGIN HANDLER ====
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    const user = dataPengguna.find(
      (u) => u.email === email && u.password === password,
    );

    if (user) {
      sessionStorage.setItem("loggedUser", JSON.stringify(user));
      // alert(`Selamat datang, ${user.nama}!`);
      swal
        .fire({
          title: "Login Berhasil",
          text: `Selamat datang, ${user.nama}`,
          icon: "info",
          heightAuto: false,
        })
        .then(() => {
          window.location.href = "dashboard.html";
        });
    } else {
      swal.fire({
        title: "Login Gagal",
        text: "Email atau Password salah. Silahkan koreksi email dan password Anda",
        icon: "info",
        heightAuto: false,
      });
    }
  });
}

// ==== MODAL ====
const forgotPassword = document.getElementById("forgotPassword");
const register = document.getElementById("register");

if (forgotPassword) {
  forgotPassword.addEventListener("click", () => {
    swal.fire({
      title: "Lupa Password",
      text: "Silakan hubungi admin SITTA untuk reset password Anda",
      icon: "info",
      heightAuto: false,
    });
  });
}

if (register) {
  register.addEventListener("click", () => {
    swal.fire({
      title: "Daftar Akun Baru",
      text: "Untuk saat ini, pendaftaran akun hanya dilakukan oleh admin SITTA",
      icon: "info",
      heightAuto: false,
    });
  });
}

// ===== DASHBOARD LOGIC =====
document.addEventListener("DOMContentLoaded", () => {
  const userData = sessionStorage.getItem("loggedUser");
  const greeting = document.getElementById("greeting");
  const logoutBtn = document.getElementById("logoutBtn");
  const stockBtn = document.getElementById("stockBtn");
  const trackingBtn = document.getElementById("trackingBtn");
  const laporanBtn = document.getElementById("laporanBtn");
  const historiBtn = document.getElementById("historiBtn");

  // kalau bukan di dashboard, abaikan
  if (!greeting) return;

  if (!userData) {
    alert("Silakan login terlebih dahulu!");
    window.location.href = "index.html";
    return;
  }

  const user = JSON.parse(userData);

  // greeting otomatis berdasarkan waktu
  const hour = new Date().getHours();
  let greetText = "";

  if (hour >= 5 && hour < 12) greetText = "Selamat Pagi";
  else if (hour >= 12 && hour < 15) greetText = "Selamat Siang";
  else if (hour >= 15 && hour < 18) greetText = "Selamat Sore";
  else greetText = "Selamat Malam";

  greeting.textContent = `${greetText}, ${user.nama} (${user.role})`;

  // tombol logout
  logoutBtn.addEventListener("click", () => {
    sessionStorage.removeItem("loggedUser");
    window.location.href = "index.html";
  });

  // Menu Navigasi
  if (stockBtn) {
    stockBtn.addEventListener("click", () => {
      window.location.href = "stok.html";
    });
  }

  if (trackingBtn) {
    trackingBtn.addEventListener("click", () => {
      window.location.href = "tracking.html";
    });
  }

  if (laporanBtn) {
    laporanBtn.addEventListener("click", () => {
      Swal.fire({
        title: "Info",
        text: "Laporan belum tersedia",
        icon: "info",
        heightAuto: false,
      });
    });
  }
  if (historiBtn) {
    historiBtn.addEventListener("click", () => {
      Swal.fire({
        title: "Info",
        text: "Histori Transaksi belum tersedia",
        icon: "info",
        heightAuto: false,
      });
    });
  }
});

// ===== TRACKING LOGIC =====
function cariDO() {
  const input = document.getElementById("inputDO").value.trim();
  const container = document.getElementById("trackingResult");

  container.innerHTML = "";

  if (!input) {
    Swal.fire({
      title: "Input Kosong",
      text: "Silahkan masukkan nomor DO terlebih dahulu",
      icon: "warning",
      heightAuto: false,
    });
    return;
  }

  const data = dataTracking[input];

  if (!data) {
    Swal.fire({
      text: "Data tidak ditemukan",
      text: "Nomor Do tidak ditemukan",
      icon: "error",
      heightAuto: false,
    });
    return;
  }

  let perjalananHTML = "";
  data.perjalanan.forEach((p) => {
    perjalananHTML += `
      <div class="perjalanan-item">
        <strong>${p.waktu}</strong><br />
        ${p.keterangan}
      </div>
    `;
  });

  container.innerHTML = `
    <h3>Detail Pengiriman</h3>
    <p><strong>Nomor DO:</strong> ${data.nomorDO}</p>
    <p><strong>Nama:</strong> ${data.nama}</p>
    <p><strong>Status:</strong> ${data.status}</p>
    <p><strong>Ekspedisi:</strong> ${data.ekspedisi}</p>
    <p><strong>Tanggal Kirim:</strong> ${data.tanggalKirim}</p>
    <p><strong>Total Pembayaran:</strong> ${data.total}</p>
    <h4>Riwayat Perjalanan:</h4>
    ${perjalananHTML}
  `;

  Swal.fire({
    title: "Berhasil",
    text: "Data pengiriman ditemukan",
    icon: "success",
    timer: 1500,
    showConfirmButton: false,
    heightAuto: false,
  });
}

// ==== STOCK LOGIC ====
function tampilkanStok() {
  const tabelBody = document.getElementById("tabelBody");
  if (!tabelBody) return;

  tabelBody.innerHTML = "";
  dataBahanAjar.forEach((item) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${item.kodeLokasi}</td>
      <td>${item.kodeBarang}</td>
      <td>${item.namaBarang}</td>
      <td>${item.jenisBarang}</td>
      <td>${item.edisi}</td>
      <td>${item.stok}</td>
      <td><img src="${item.cover}" alt="${item.namaBarang}" /></td>
    `;
    tabelBody.appendChild(row);
  });
}

window.onload = function () {
  if (document.getElementById("tabelBody")) {
    tampilkanStok();
  }
};

// === Modal Functions ===
function openModal() {
  document.getElementById("modalForm").style.display = "flex";
}

function closeModal() {
  document.getElementById("modalForm").style.display = "none";
}

window.onclick = function (event) {
  const modal = document.getElementById("modalForm");
  if (event.target === modal) {
    modal.style.display = "none";
  }
};

// === Simpan Data Baru dari Form ===
function simpanData(event) {
  event.preventDefault();

  const newData = {
    kodeLokasi: document.getElementById("kodeLokasi").value.trim(),
    kodeBarang: document.getElementById("kodeBarang").value.trim(),
    namaBarang: document.getElementById("namaBarang").value.trim(),
    jenisBarang: document.getElementById("jenisBarang").value.trim(),
    edisi: document.getElementById("edisi").value.trim(),
    stok: parseInt(document.getElementById("stok").value, 10),
    cover: "img/default.jpg",
  };

  if (
    !newData.kodeLokasi ||
    !newData.kodeBarang ||
    !newData.namaBarang ||
    isNaN(newData.stok)
  ) {
    Swal.fire({
      title: "Data tidak lengkap",
      text: "Lengkapi semua data dengan benar",
      icon: "warning",
      heightAuto: false,
    });
  }

  dataBahanAjar.push(newData);
  tampilkanStok();
  closeModal();
  Swal.fire({
    title: "Berhasil",
    text: "Data berhasil ditambahkan",
    icon: "success",
    heightAuto: false,
  });
  document.getElementById("formTambah").reset();
}
