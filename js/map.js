
function initialize() {
  // Ini adalah daftar koordinat peti harta karun yang dijatuhkan dari
  // pesawat. Format datanya adalah [status, lintang, bujur]. Data ini
  // disajikan dalam bentuk JavaScript Array. Di aplikasiku koordinat
  // dan status ini ditulis oleh PHP.
  var lokasi = [
    ["t", 2.29, 109.11],["t", -1.76, 117.53],["p", -4.61, 116.33],["p", -2.80, 117.00]
  ];
  
  // Dua variabel di bawah adalah URL untuk mengakses gambar pentol.
  // Untuk yang terapung warnanya merah, dan peti yang pecah warnanya biru.
  var iterapung = 'poin-merah.png';
  var ipecah = 'poin-biru.png';
  
  // Variabel 'indonesia', berisi koordinat titik (nyaris) tengah Indonesia.
  // Penentuannya cukup ngawur, klik 1 titik di tengah peta, dan intip data
  // koordinatnya. Semua data koordinat direpresentasikan sebagai js Object
  // LatLng.
  var indonesia = new google.maps.LatLng( -4.549208, 120.39698670000007 );
  
  // Variabel myOptions menentukan panel kontrol apa saja yang nanti akan 
  // ditampilkan di peta. Menurut referensi API google maps, yang wajib dise-
  // butkan di sini hanya zoom dan mapTypeId. Sisanya boleh diketik, nggak
  // juga nggak apa-apa.
  var myOptions = {
    center: indonesia,
    panControl: false,
    zoomControl: true,
    mapTypeControl: true,
    scaleControl: true,
    streetViewControl: false,
    overviewMapControl: false,
    zoom: 5,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  }
  
  // Bikin objek peta di halaman kita. "map_canvas" adalah ID div tempat
  // petanya dimunculkan. Selain objek peta buat juga objek LatLngBounds
  // yang dipakai untuk mengumpulkan beberapa LatLng menjadi satu, sehingga
  // titik tengah dan zoom level yang cocok bisa diperhitungkan.
  var map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
  var latbounds = new google.maps.LatLngBounds();
  
  var marker, i, tulisan;
  var gambar;
  
  // Inisiasi objek infowindow agar titik-titik di peta bisa diklik. Objek ini
  // cukup satu, kemudian dipakai bergantian di masing-masing titik lokasi.
  infowindow = new google.maps.InfoWindow({
    content: "tunggu..."
  });

  // Memproses masing-masing titik yang tersimpan pada array lokasi[].
  for( i = 0; i < lokasi.length; i++ ) {
    // Seperti halnya variabel "indonesia" di atas, masing-masing lokasi
    // dibikin obj LatLng dan disimpan di dalam variabel nnm. Kemudian
    // lihat status jatuhnya peti. Kalau terapung warna titiknya merah,
    // sedangkan kalau pecah warna titiknya biru.
    var nnm = new google.maps.LatLng( lokasi[i][1], lokasi[i][2] );
    if( lokasi[i][0] == 't' ) {
      gambar = iterapung;
      tulisan = 'Di sini peti hartanya terapung';
    } else {
      gambar = ipecah;
      tulisan = 'Di sini peti hartanya pecah';
    }
    
    // Titik-titik di peta diimplementasikan sebagai objek Marker. Buat
    // semua titik menggunakan data-data yang telah diolah di atas.
    marker = new google.maps.Marker({
      position: nnm,
      map: map,
      icon: gambar,
      html: tulisan + '<br>' + nnm.toString()
    });
    
    // Masukkan masing-masing titik ke dalam wadah LatLngBounds untuk
    // diproses setelah seluruh pengolahan titik koordinat selesai.
    latbounds.extend( nnm );
    
    // Buat event listener untuk memunculkan infowindow ketika titik
    // diklik. Isinya diambil dari opsi html ketika membuat marker.
    google.maps.event.addListener(marker, 'click', function () {
      // where I have added .html to the marker object.
      infowindow.setContent(this.html);
      infowindow.open(map, this);
    });
  }
  
  // Nah, di sinilah pengolahan titik-titik itu terjadi. Kumpulan koordinat
  // yang disimpan di LatLngBounds bisa dihitung untuk mencari titik tengah
  // dan zoom yang tepat untuk menampilkan seluruh titik dalam peta. Operasi
  // menengahkan dan mengatur zoom dilakukan oleh objek Map, menggunakan data
  // yang disediakan oleh LatLngBounds.
  map.setCenter( latbounds.getCenter() );
  map.fitBounds( latbounds );
  
  // Kalau penentuan zoom level terlalu tinggi dan hanya ada satu titik,
  // maka titik itu akan tampil sebagai satu titik terasing di tengah warna
  // biru. Agar masih terlihat pulau-pulau di sekitarnya, kurangi zoom level
  // menjadi "7". Silakan coba bereksperimen apa jadinya kalau zoomnya 20 :D
  if( map.getZoom() > 7 ) {
    map.setZoom( 7 );
  }
}

// Panggil peta ketika halaman selesai diload.
window.onload = initialize();
 