import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js'
import {
  getFirestore,
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  deleteDoc,
  updateDoc,
  query, 
  orderBy,
  where
} from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js'

const firebaseConfig = {
  apiKey: "AIzaSyCfqZD7UZZt-GWmtNhfJyksrv3-8ENRjto",
  authDomain: "insan-cemerlang-d5574.firebaseapp.com",
  projectId: "insan-cemerlang-d5574",
  storageBucket: "insan-cemerlang-d5574.appspot.com",
  messagingSenderId: "1035937160050",
  appId: "1:1035937160050:web:6d77d3874c3f78b2811beb",
  measurementId: "G-EVVQ80Q08C"
};

// Inisialisasi Firebase
const aplikasi = initializeApp(firebaseConfig)
const basisdata = getFirestore(aplikasi)

// Fungsi untuk mengambil daftar produk
export async function ambilDaftarProduk() {
  try {
    const refDokumen = collection(basisdata, "produk");
    const kueri = query(refDokumen, orderBy("nama")); // Mengurutkan berdasarkan nama
    const cuplikanKueri = await getDocs(kueri);
    
    return cuplikanKueri.docs.map((dokumen) => ({
      id: dokumen.id,
      nama: dokumen.data().nama,
      kategori: dokumen.data().kategori,
      harga: dokumen.data().harga,
      stok: dokumen.data().stok,
      terakhirDiperbarui: dokumen.data().terakhirDiperbarui
    }));
  } catch (error) {
    console.error("Gagal mengambil data produk:", error);
    return [];
  }
}

// Fungsi untuk menambahkan produk baru
export async function tambahProduk(nama, kategori, harga, stok) {
  try {
    // Menyimpan data ke Firestore
    const refDokumen = await addDoc(collection(basisdata, "produk"), {
      nama: nama,
      kategori: kategori,
      harga: harga,
      stok: stok,
      terakhirDiperbarui: new Date()
    });

    console.log("Berhasil menyimpan produk");
    return refDokumen.id;
  } catch (e) {
    console.log("Gagal menyimpan produk: " + e.message);
    return null;
  }
}

// Fungsi untuk mengupdate produk
export async function updateProduk(id, nama, kategori, harga, stok) {
  try {
    const refDokumen = doc(basisdata, "produk", id);
    await updateDoc(refDokumen, {
      nama: nama,
      kategori: kategori,
      harga: harga,
      stok: stok,
      terakhirDiperbarui: new Date()
    });

    console.log("Berhasil mengupdate produk");
    return true;
  } catch (e) {
    console.log("Gagal mengupdate produk: " + e.message);
    return false;
  }
}

// Fungsi untuk menghapus produk
export async function hapusProduk(id) {
  try {
    await deleteDoc(doc(basisdata, "produk", id));
    console.log("Berhasil menghapus produk");
    return true;
  } catch (e) {
    console.log("Gagal menghapus produk: " + e.message);
    return false;
  }
}

// Fungsi untuk mengambil produk berdasarkan ID
export async function ambilProdukById(id) {
  try {
    const refDokumen = doc(basisdata, "produk", id);
    const dokumen = await getDoc(refDokumen);
    
    if (dokumen.exists()) {
      return {
        id: dokumen.id,
        nama: dokumen.data().nama,
        kategori: dokumen.data().kategori,
        harga: dokumen.data().harga,
        stok: dokumen.data().stok
      };
    } else {
      console.log("Produk tidak ditemukan");
      return null;
    }
  } catch (error) {
    console.error("Gagal mengambil data produk:", error);
    return null;
  }
}

// Fungsi untuk mencari produk berdasarkan nama
export async function cariProduk(nama) {
  try {
    const refDokumen = collection(basisdata, "produk");
    const kueri = query(refDokumen, where("nama", ">=", nama), where("nama", "<=", nama + '\uf8ff'));
    const cuplikanKueri = await getDocs(kueri);
    
    return cuplikanKueri.docs.map((dokumen) => ({
      id: dokumen.id,
      nama: dokumen.data().nama,
      kategori: dokumen.data().kategori,
      harga: dokumen.data().harga,
      stok: dokumen.data().stok
    }));
  } catch (error) {
    console.error("Gagal mencari produk:", error);
    return [];
  }
}

// Fungsi untuk memfilter produk berdasarkan kategori
export async function filterProdukByKategori(kategori) {
  try {
    const refDokumen = collection(basisdata, "produk");
    const kueri = query(refDokumen, where("kategori", "==", kategori));
    const cuplikanKueri = await getDocs(kueri);
    
    return cuplikanKueri.docs.map((dokumen) => ({
      id: dokumen.id,
      nama: dokumen.data().nama,
      kategori: dokumen.data().kategori,
      harga: dokumen.data().harga,
      stok: dokumen.data().stok
    }));
  } catch (error) {
    console.error("Gagal memfilter produk:", error);
    return [];
  }
}