// ==== LOGIN HANDLER ====
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    const user = dataPengguna.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      sessionStorage.setItem("loggedUser", JSON.stringify(user));
      alert(`Selamat datang, ${user.nama}!`);
      window.location.href = "dashboard.html";
    } else {
      alert("Email atau password salah!");
    }
  });
}

// ==== MODAL ====
const modalForgot = document.getElementById("modalForgot");
const modalRegister = document.getElementById("modalRegister");
const closeButtons = document.querySelectorAll(".close");

const forgotPassword = document.getElementById("forgotPassword");
if (forgotPassword) {
  document.getElementById("forgotPassword").onclick = () =>
    (modalForgot.style.display = "block");
}
const register = document.getElementById("register");
if (register) {
  document.getElementById("register").onclick = () =>
    (modalRegister.style.display = "block");
}

closeButtons.forEach(
  (btn) =>
    (btn.onclick = () => {
      modalForgot.style.display = "none";
      modalRegister.style.display = "none";
    })
);

window.onclick = (event) => {
  if (event.target === modalForgot || event.target === modalRegister) {
    modalForgot.style.display = "none";
    modalRegister.style.display = "none";
  }
};

// ===== DASHBOARD LOGIC =====
document.addEventListener("DOMContentLoaded", () => {
  const userData = sessionStorage.getItem("loggedUser");
  const greeting = document.getElementById("greeting");
  const logoutBtn = document.getElementById("logoutBtn");

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
  else if (hour >= 12 && hour < 17) greetText = "Selamat Siang";
  else if (hour >= 17 && hour < 20) greetText = "Selamat Sore";
  else greetText = "Selamat Malam";

  greeting.textContent = `${greetText}, ${user.nama} (${user.role})`;

  // tombol logout
  logoutBtn.addEventListener("click", () => {
    sessionStorage.removeItem("loggedUser");
    window.location.href = "index.html";
  });
});

// fungsi navigasi
function navigateTo(page) {
  window.location.href = page;
}

// ===== TRACKING LOGIC =====
function cariDO() {
  const input = document.getElementById("inputDO").value.trim();
  const container = document.getElementById("trackingResult");

  container.innerHTML = "";

  if (!input) {
    alert("Silakan masukkan nomor DO terlebih dahulu.");
    return;
  }

  const data = dataTracking[input];

  if (!data) {
    alert("Nomor DO tidak ditemukan!");
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

// === Menampilkan data stok ===
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
    alert("Lengkapi semua data dengan benar!");
    return;
  }

  dataBahanAjar.push(newData);
  tampilkanStok();
  closeModal();
  alert("Data berhasil ditambahkan!");
  document.getElementById("formTambah").reset();
}
