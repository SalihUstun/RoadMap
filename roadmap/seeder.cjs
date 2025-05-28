const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

const cities = [
  { id: 1, name: "Adana", slug: "adana" },
  { id: 2, name: "Adıyaman", slug: "adiyaman" },
  { id: 3, name: "Afyonkarahisar", slug: "afyonkarahisar" },
  { id: 4, name: "Ağrı", slug: "agri" },
  { id: 5, name: "Amasya", slug: "amasya" },
  { id: 6, name: "Ankara", slug: "ankara" },
  { id: 7, name: "Antalya", slug: "antalya" },
  { id: 8, name: "Artvin", slug: "artvin" },
  { id: 9, name: "Aydın", slug: "aydin" },
  { id: 10, name: "Balıkesir", slug: "balikesir" },
  { id: 11, name: "Bilecik", slug: "bilecik" },
  { id: 12, name: "Bingöl", slug: "bingol" },
  { id: 13, name: "Bitlis", slug: "bitlis" },
  { id: 14, name: "Bolu", slug: "bolu" },
  { id: 15, name: "Burdur", slug: "burdur" },
  { id: 16, name: "Bursa", slug: "bursa" },
  { id: 17, name: "Çanakkale", slug: "canakkale" },
  { id: 18, name: "Çankırı", slug: "cankiri" },
  { id: 19, name: "Çorum", slug: "corum" },
  { id: 20, name: "Denizli", slug: "denizli" },
  { id: 21, name: "Diyarbakır", slug: "diyarbakir" },
  { id: 22, name: "Edirne", slug: "edirne" },
  { id: 23, name: "Elazığ", slug: "elazig" },
  { id: 24, name: "Erzincan", slug: "erzincan" },
  { id: 25, name: "Erzurum", slug: "erzurum" },
  { id: 26, name: "Eskişehir", slug: "eskisehir" },
  { id: 27, name: "Gaziantep", slug: "gaziantep" },
  { id: 28, name: "Giresun", slug: "giresun" },
  { id: 29, name: "Gümüşhane", slug: "gumushane" },
  { id: 30, name: "Hakkari", slug: "hakkari" },
  { id: 31, name: "Hatay", slug: "hatay" },
  { id: 32, name: "Isparta", slug: "isparta" },
  { id: 33, name: "Mersin", slug: "mersin" },
  { id: 34, name: "İstanbul", slug: "istanbul" },
  { id: 35, name: "İzmir", slug: "izmir" },
  { id: 36, name: "Kars", slug: "kars" },
  { id: 37, name: "Kastamonu", slug: "kastamonu" },
  { id: 38, name: "Kayseri", slug: "kayseri" },
  { id: 39, name: "Kırklareli", slug: "kirklareli" },
  { id: 40, name: "Kırşehir", slug: "kirsehir" },
  { id: 41, name: "Kocaeli", slug: "kocaeli" },
  { id: 42, name: "Konya", slug: "konya" },
  { id: 43, name: "Kütahya", slug: "kutahya" },
  { id: 44, name: "Malatya", slug: "malatya" },
  { id: 45, name: "Manisa", slug: "manisa" },
  { id: 46, name: "Kahramanmaraş", slug: "kahramanmaras" },
  { id: 47, name: "Mardin", slug: "mardin" },
  { id: 48, name: "Muğla", slug: "mugla" },
  { id: 49, name: "Muş", slug: "mus" },
  { id: 50, name: "Nevşehir", slug: "nevsehir" },
  { id: 51, name: "Niğde", slug: "nigde" },
  { id: 52, name: "Ordu", slug: "ordu" },
  { id: 53, name: "Rize", slug: "rize" },
  { id: 54, name: "Sakarya", slug: "sakarya" },
  { id: 55, name: "Samsun", slug: "samsun" },
  { id: 56, name: "Siirt", slug: "siirt" },
  { id: 57, name: "Sinop", slug: "sinop" },
  { id: 58, name: "Sivas", slug: "sivas" },
  { id: 59, name: "Tekirdağ", slug: "tekirdag" },
  { id: 60, name: "Tokat", slug: "tokat" },
  { id: 61, name: "Trabzon", slug: "trabzon" },
  { id: 62, name: "Tunceli", slug: "tunceli" },
  { id: 63, name: "Şanlıurfa", slug: "sanliurfa" },
  { id: 64, name: "Uşak", slug: "usak" },
  { id: 65, name: "Van", slug: "van" },
  { id: 66, name: "Yozgat", slug: "yozgat" },
  { id: 67, name: "Zonguldak", slug: "zonguldak" },
  { id: 68, name: "Aksaray", slug: "aksaray" },
  { id: 69, name: "Bayburt", slug: "bayburt" },
  { id: 70, name: "Karaman", slug: "karaman" },
  { id: 71, name: "Kırıkkale", slug: "kirikkale" },
  { id: 72, name: "Batman", slug: "batman" },
  { id: 73, name: "Şırnak", slug: "sirnak" },
  { id: 74, name: "Bartın", slug: "bartin" },
  { id: 75, name: "Ardahan", slug: "ardahan" },
  { id: 76, name: "Iğdır", slug: "igdir" },
  { id: 77, name: "Yalova", slug: "yalova" },
  { id: 78, name: "Karabük", slug: "karabuk" },
  { id: 79, name: "Kilis", slug: "kilis" },
  { id: 80, name: "Osmaniye", slug: "osmaniye" },
  { id: 81, name: "Düzce", slug: "duzce" }
];

async function seed() {
  const batch = db.batch();

  cities.forEach(city => {
    const ref = db.collection("cities").doc(city.slug);
    batch.set(ref, city);
    console.log("Hazırlanıyor:", city.slug);
  });

  try {
    await batch.commit();
    console.log("✅ Tüm şehirler başarıyla eklendi.");
  } catch (err) {
    console.error("❌ HATA:", err);
  }
}

seed();
