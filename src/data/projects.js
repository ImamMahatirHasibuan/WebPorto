// Extracted 1:1 from the original Portofolio.js projectData object.
export const projectData = {
  project1: {
    title: { en: 'Web E-Commerce', id: 'Web E-Commerce' },
    description: {
      en: 'A simple e-commerce website designed to display and sell various products like clothes, shoes, and accessories. Built using HTML, CSS, and JavaScript without frameworks, focusing on basic structure, appearance, and interactions. Features include product catalog, shopping cart, and responsive design for optimal viewing across all devices.',
      id: 'Sebuah website e-commerce sederhana yang dirancang untuk menampilkan dan menjual berbagai produk seperti baju, sepatu, dan aksesoris. Dibangun menggunakan HTML, CSS, dan JavaScript tanpa framework, berfokus pada struktur dasar, tampilan, dan interaksi. Fitur termasuk katalog produk, keranjang belanja, dan desain responsif untuk tampilan optimal di semua perangkat.'
    },
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Design'],
    features: [
      { title: { en: 'Product Catalog', id: 'Katalog Produk' }, description: { en: 'Dynamic product display with categories, search functionality, and detailed product pages.', id: 'Tampilan produk dinamis dengan kategori, fungsi pencarian, dan halaman produk yang detail.' } },
      { title: { en: 'Shopping Cart', id: 'Keranjang Belanja' }, description: { en: 'Interactive shopping cart with add/remove items, quantity adjustment, and total calculation.', id: 'Keranjang belanja interaktif dengan tambah/hapus item, penyesuaian jumlah, dan kalkulasi total.' } },
      { title: { en: 'Responsive Design', id: 'Desain Responsif' }, description: { en: 'Mobile-first design that works seamlessly across desktop, tablet, and mobile devices.', id: 'Desain mobile-first yang bekerja dengan mulus di desktop, tablet, dan perangkat mobile.' } },
      { title: { en: 'User Interface', id: 'Antarmuka Pengguna' }, description: { en: 'Clean and intuitive user interface with smooth animations and modern design elements.', id: 'Antarmuka pengguna yang bersih dan intuitif dengan animasi halus dan elemen desain modern.' } }
    ],
    images: [
      'asset/E-commerce (1).png',
      'asset/E-commerce (2).png',
      'asset/E-commerce (3).png',
      'asset/E-commerce (4).png',
      'asset/E-commerce (5).png',
      'asset/E-commerce (6).png'
    ],
    githubLink: 'https://github.com/ImamMahatirHasibuan/Web-Ecommerce',
    demoLink: 'https://web-ecommerce-beta.vercel.app/AboutPage.html'
  },
  project2: {
    title: { en: 'LearnHub', id: 'LearnHub' },
    description: {
      en: 'LearnHub is a web-based online learning platform that allows users to join interactive courses, track their learning progress, earn certificates, and engage through discussion features. The website is designed with a modern and user-friendly interface to support an effective digital learning experience.',
      id: 'LearnHub adalah platform pembelajaran online berbasis web yang memungkinkan pengguna untuk mengikuti kursus interaktif, melacak progres belajar, mendapatkan sertifikat, serta berinteraksi melalui fitur diskusi. Website ini dirancang dengan antarmuka modern dan user-friendly untuk mendukung pengalaman belajar digital yang efektif.'
    },
    technologies: ['React', 'Tailwind'],
    features: [
      { title: { en: 'Dashboard LearnHub', id: 'Dashboard LearnHub' }, description: { en: 'Overview of courses, learning hours, certificates, and achievements.', id: 'Ringkasan kursus, jam belajar, sertifikat, dan pencapaian.' } },
      { title: { en: 'Course List', id: 'Course List' }, description: { en: 'Browse & search courses, view progress, ratings, and details.', id: 'Cari & pilih kursus, lihat progress, rating, dan detail kursus.' } },
      { title: { en: 'Profile', id: 'Profile' }, description: { en: 'User info, learning stats, certificates, and streak tracking.', id: 'Data pengguna, statistik belajar, sertifikat, dan learning streak.' } },
      { title: { en: 'Course Detail', id: 'Course Detail' }, description: { en: 'Course content list with progress status.', id: 'Daftar materi kursus dengan status progres.' } },
      { title: { en: 'Video Player', id: 'Video Player' }, description: { en: 'Learn through interactive video lessons.', id: 'Belajar lewat video interaktif.' } },
      { title: { en: 'Quiz', id: 'Quiz' }, description: { en: 'Interactive quizzes for knowledge evaluation.', id: 'Kuis interaktif untuk evaluasi pembelajaran.' } }
    ],
    images: [
      'asset/LearnHub (1).png',
      'asset/LearnHub (2).png',
      'asset/LearnHub (3).png',
      'asset/LearnHub (4).png',
      'asset/LearnHub (5).png'
    ],
    githubLink: 'https://github.com/ImamMahatirHasibuan/LearnHub',
    demoLink: 'https://hci-kelas.vercel.app/'
  },
  project3: {
    title: { en: 'Emotion Detection', id: 'Pendeteksi Emosi' },
    description: {
      en: 'a web-based application that detects human emotions from images or webcam captures. The system leverages a deep learning model to classify facial expressions into categories such as Happy, Sad, Surprise, Angry, Neutral, and more. The application is designed with a simple and user-friendly interface to ensure ease of use.',
      id: 'aplikasi berbasis web yang dapat mendeteksi emosi manusia dari gambar atau tangkapan webcam. Sistem ini menggunakan model deep learning untuk mengklasifikasikan ekspresi wajah menjadi beberapa kategori seperti Happy, Sad, Surprise, Angry, Neutral, dan lainnya. Aplikasi ini dirancang dengan antarmuka sederhana agar mudah digunakan oleh siapa saja.'
    },
    technologies: ['Python', 'Flask', 'TensorFlow', 'HTML', 'CSS'],
    features: [
      { title: { en: 'Webcam Capture', id: 'Webcam Capture' }, description: { en: 'Capture images directly from the webcam.', id: 'Ambil gambar langsung dari kamera.' } },
      { title: { en: 'Image Upload', id: 'Image Upload' }, description: { en: 'Upload photos from device for analysis.', id: 'Unggah foto dari perangkat untuk analisis.' } },
      { title: { en: 'Emotion Prediction', id: 'Emotion Prediction' }, description: { en: 'Display emotion prediction results (text + label).', id: 'Menampilkan hasil prediksi emosi (teks + label).' } },
      { title: { en: 'Image Preview', id: 'Image Preview' }, description: { en: 'Show captured/uploaded image with detected emotion.', id: 'Menampilkan foto hasil tangkapan/upload dengan emosi terdeteksi.' } }
    ],
    images: [
      'asset/EmotionDetection.jpg',
      'asset/EmotionDetection2.jpg',
      'asset/EmotionDetection3.jpg',
      'asset/EmotionDetection4.jpg',
      'asset/EmotionDetection5.jpg'
    ],
    githubLink: 'https://github.com/ImamMahatirHasibuan/EmotionDetection'
  },
  project4: {
    title: { en: 'Fake News Detection', id: 'Deteksi Berita Palsu' },
    description: {
      en: 'FakeNewsDetection is a machine learning project that classifies news articles as fake or real. The system leverages a news dataset with an NLP (Natural Language Processing) model to analyze linguistic patterns in articles and predict their authenticity.',
      id: 'FakeNewsDetection adalah proyek machine learning untuk mengklasifikasikan berita sebagai palsu atau asli. Sistem ini menggunakan dataset berita dengan model NLP (Natural Language Processing) untuk mendeteksi pola bahasa pada artikel berita dan memprediksi keasliannya.'
    },
    technologies: ['Python (Flask)', 'Scikit-learn', 'TensorFlow/Keras', 'Pandas, Numpy, Matplotlib', 'HTML', 'CSS'],
    features: [
      { title: { en: 'News Input', id: 'Input Berita' }, description: { en: 'Users can enter news text.', id: 'Pengguna dapat memasukkan teks berita.' } },
      { title: { en: 'News Classification', id: 'Klasifikasi Berita' }, description: { en: 'Predicts whether the news is fake or real.', id: 'Sistem memprediksi apakah berita palsu atau asli.' } },
      { title: { en: 'NLP Analysis', id: 'Analisis NLP' }, description: { en: 'Uses natural language processing to understand text patterns.', id: 'Menggunakan pemrosesan bahasa alami untuk memahami pola teks.' } },
      { title: { en: 'Result Visualization', id: 'Visualisasi Hasil' }, description: { en: 'Displays classification results in a simple format.', id: 'Menyajikan hasil klasifikasi dengan tampilan sederhana.' } }
    ],
    images: [
      'asset/FakenewsDetection (1).png',
      'asset/FakenewsDetection (2).png',
      'asset/FakenewsDetection (3).png',
      'asset/FakenewsDetection (4).png'
    ],
    githubLink: 'https://github.com/ImamMahatirHasibuan/EmotionDetection'
  },
  project5: {
    title: { en: 'Facial Absence', id: 'Absensi Wajah' },
    description: {
      en: 'AbsensiWajah is a machine learning-based application designed to automatically record student attendance using face recognition technology. The system uses a camera to detect faces and store attendance data into a database, making the attendance process faster, more accurate, and efficient.',
      id: 'AbsensiWajah adalah aplikasi berbasis machine learning yang digunakan untuk mencatat kehadiran mahasiswa secara otomatis menggunakan teknologi pengenalan wajah. Sistem ini memanfaatkan kamera untuk mendeteksi wajah dan menyimpan data absensi ke dalam basis data, sehingga proses absensi lebih cepat, akurat, dan efisien.'
    },
    technologies: ['Python (Flask)', 'OpenCV', 'TensorFlow'],
    features: [
      { title: { en: 'Real-time Face Detection', id: 'Deteksi Wajah Real-time' }, description: { en: 'Detects user faces directly via camera.', id: 'Sistem mendeteksi wajah pengguna langsung melalui kamera.' } },
      { title: { en: 'Face Recognition', id: 'Pengenalan Wajah' }, description: { en: 'Identifies registered faces stored in the database.', id: 'Mengenali wajah yang sudah terdaftar di database.' } },
      { title: { en: 'Automatic Attendance Recording', id: 'Pencatatan Absensi Otomatis' }, description: { en: 'Saves attendance data automatically without manual input.', id: 'Menyimpan data kehadiran ke file/database tanpa input manual.' } },
      { title: { en: 'Attendance History', id: 'Riwayat Absensi' }, description: { en: 'Displays previously recorded attendance data.', id: 'Menampilkan data absensi yang sudah tercatat sebelumnya.' } }
    ],
    images: [
      'asset/AbsensiWajah (1).png',
      'asset/AbsensiWajah (2).png',
      'asset/AbsensiWajah (3).png',
      'asset/AbsensiWajah (4).png'
    ],
    githubLink: 'https://github.com/ImamMahatirHasibuan/EmotionDetection'
  },
  project6: {
    title: { en: 'Food Bridge', id: 'Jembatan Makanan' },
    description: {
      en: 'a web-based food donation management platform designed to connect food surpluses from donors (such as restaurants, stores, or catering services) with recipients (like orphanages, charities, or food banks) and facilitate the pickup/delivery process through volunteers. The goal is to reduce food waste, combat hunger, and build a more responsible community.',
      id: 'platform manajemen donasi makanan berbasis web yang dirancang untuk mempertemukan kelebihan makanan dari donatur (seperti restoran, toko, atau katering) dengan penerima donasi (seperti panti asuhan, yayasan amal, atau bank makanan) dan memfasilitasi proses penjemputan/pengiriman melalui sukarelawan. Tujuannya adalah mengurangi pemborosan makanan, melawan kelaparan, dan membangun komunitas yang lebih bertanggung jawab.'
    },
    technologies: ['HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL', 'XAMPP'],
    features: [
      { title: { en: 'Role-Based Authentication', id: 'Otentikasi Berbasis Peran' }, description: { en: 'A login and registration system that segments users into four main roles: Food Donor, Food Recipient, Volunteer, and Admin. Each role has unique dashboard access and functionalities.', id: 'Sistem login dan registrasi yang memisahkan pengguna menjadi empat peran utama: Food Donor, Food Recipient, Volunteer, dan Admin. Setiap peran memiliki akses dan fungsionalitas dashboard yang unik.' } },
      { title: { en: 'Food Donation Management', id: 'Manajemen Donasi Makanan' }, description: { en: 'Food Donors can easily create, edit, and publish new donations (detailing food type, quantity, pickup time, and expiry time). Donations automatically have an available status and are visible on the recipient dashboard.', id: 'Donor Makanan dapat dengan mudah membuat, mengedit, dan mempublikasikan donasi baru (dengan detail jenis makanan, kuantitas, waktu penjemputan, dan waktu kedaluwarsa). Donasi akan otomatis memiliki status available dan terlihat di dashboard penerima.' } },
      { title: { en: 'Volunteer Assignment', id: 'Penugasan Sukarelawan' }, description: { en: 'The system allows donors/admins to assign a Volunteer to pick up the claimed donation and deliver it to the recipient. Volunteers receive detailed route information.', id: 'Sistem memungkinkan donor/admin untuk menetapkan Sukarelawan untuk mengambil donasi yang telah diklaim dan mengirimkannya kepada penerima. Sukarelawan akan mendapatkan rincian rute.' } },
      { title: { en: 'Donation Claim by Recipient', id: 'Klaim Donasi oleh Penerima' }, description: { en: 'Food Recipients can view the list of available donations and claim the ones they need. The donation status changes from available to claimed.', id: 'Penerima Makanan dapat melihat daftar donasi yang tersedia dan mengklaim donasi yang mereka butuhkan. Status donasi akan berubah dari available menjadi claimed.' } }
    ],
    images: [
      'asset/FoodBridge (1).png',
      'asset/FoodBridge (2).png',
      'asset/FoodBridge (3).png',
      'asset/FoodBridge (4).png'
    ],
    githubLink: 'https://github.com/ImamMahatirHasibuan/FoodBridge'
  },
  project7: {
    title: { en: 'Router', id: 'Router' },
    description: {
      en: 'A comprehensive network infrastructure design project utilizing Cisco technologies for the BINUS Bekasi campus. This project includes developing detailed network topologies, configuring routers and switches, and implementing subnetting schemes to optimize IP address allocation. The design aims to ensure secure and reliable connectivity for different departments and units within the building, while maintaining scalability for future growth.',
      id: 'Sebuah proyek perancangan infrastruktur jaringan menggunakan teknologi Cisco untuk kampus BINUS Bekasi. Proyek ini mencakup pembuatan topologi jaringan yang terperinci, konfigurasi router dan switch, serta penerapan skema subnetting untuk mengoptimalkan penggunaan alamat IP. Perancangan jaringan ini bertujuan untuk memastikan konektivitas yang aman, andal, dan efisien bagi setiap departemen serta unit yang ada di dalam gedung, sekaligus mendukung skalabilitas untuk kebutuhan di masa depan.'
    },
    technologies: ['Cisco Packet Tracer', 'Network Design', 'Routing Protocols'],
    features: [
      { title: { en: 'Network Topology', id: 'Topologi Jaringan' }, description: { en: 'Provides a visual guide for technicians in installation and troubleshooting.', id: 'Memberikan panduan visual bagi teknisi dalam pemasangan dan troubleshooting.' } },
      { title: { en: 'Router Configuration', id: 'Router Configuration' }, description: { en: 'Connects different subnets to ensure smooth communication.', id: 'Menghubungkan subnet berbeda sehingga komunikasi tetap lancar.' } },
      { title: { en: 'Switch VLAN', id: 'Switch VLAN' }, description: { en: 'Segregates network traffic to enhance security and efficiency.', id: 'Memisahkan lalu lintas jaringan agar lebih aman dan efisien.' } },
      { title: { en: 'Subnetting', id: 'Subnetting' }, description: { en: 'Conserves IP addresses, simplifies management, and improves security.', id: 'Menghemat alamat IP, memudahkan manajemen, dan meningkatkan keamanan.' } }
    ],
    images: [
      'asset/Cisco (1).png',
      'asset/Cisco (2).png',
      'asset/Cisco (3).png',
      'asset/Cisco (4).png'
    ]
  },
  project8: {
    title: { en: 'B-DRAIN', id: 'B-DRAIN' },
    description: {
      en: 'A web-based geographic information system (Web GIS) geodashboard designed to visualize and analyze flood-prone points and drainage infrastructure in Bekasi City. Built using React.js, Leaflet.js, and GeoJSON. Key features include multilayer spatial visualization, data filtering, buffer analysis, and proximity analysis to identify priority areas for infrastructure maintenance, providing an interactive, accessible tool for non-technical stakeholders without the need for desktop GIS software.',
      id: 'Sebuah sistem informasi geografis berbasis web (Web GIS) geodashboard yang dirancang untuk memvisualisasikan dan menganalisis titik-titik rawan banjir serta infrastruktur drainase di Kota Bekasi. Dibangun menggunakan React.js, Leaflet.js, dan GeoJSON. Fitur-fitur utamanya mencakup visualisasi spasial multilayer, pemfilteran data, analisis buffer, dan analisis kedekatan untuk mengidentifikasi area prioritas untuk pemeliharaan infrastruktur, menyediakan alat interaktif dan mudah diakses bagi pemangku kepentingan non-teknis tanpa memerlukan perangkat lunak GIS desktop.'
    },
    technologies: ['React.js', 'Leaflet.js', 'GeoJSON'],
    features: [
      { title: { en: 'Multilayer Spatial Visualization', id: 'Visualisasi Spasial Multilayer' }, description: { en: 'Visualize multiple data layers such as flood-prone points, drainage infrastructure, and government administrative boundaries on an interactive map.', id: 'Menampilkan berbagai lapisan data seperti titik rawan banjir, infrastruktur drainase, dan batas administrasi pemerintahan dalam satu peta interaktif.' } },
      { title: { en: 'Data Filtering', id: 'Data Filtering' }, description: { en: 'Filter and display data based on specific criteria such as flood risk levels or infrastructure types, allowing users to focus on relevant information.', id: 'Memfilter dan menampilkan data berdasarkan kriteria tertentu seperti tingkat risiko banjir atau jenis infrastruktur, sehingga memungkinkan pengguna untuk fokus pada informasi yang relevan.' } },
      { title: { en: 'Buffer Analysis', id: 'Buffer Analysis' }, description: { en: 'Analyze spatial relationships between data points to identify areas within a certain distance from flood sources or drainage infrastructure.', id: 'Menganalisis hubungan spasial antar titik data untuk mengidentifikasi area dalam jarak tertentu dari sumber banjir atau infrastruktur drainase.' } },
      { title: { en: 'Proximity Analysis', id: 'Proximity Analysis' }, description: { en: 'Analyze the proximity between flood-prone points and drainage infrastructure to identify areas that require immediate attention and maintenance.', id: 'Menganalisis kedekatan antara titik rawan banjir dan infrastruktur drainase untuk mengidentifikasi area yang memerlukan perhatian dan pemeliharaan segera.' } }
    ],
    images: [
      'asset/B-DRAIN (1).png',
      'asset/B-DRAIN (2).png',
      'asset/B-DRAIN (3).png'
    ],
    githubLink: 'https://github.com/ImamMahatirHasibuan/B-DRAIN',
    demoLink: 'https://b-drain.vercel.app'
  },
  project9: {
    title: { en: 'Tripnesia', id: 'Tripnesia' },
    description: {
      en: 'A comprehensive web-based open trip booking platform designed to connect travelers with travel packages. Built using Laravel 11, Bootstrap, and JavaScript. Key features include a separated destination search and filter system, dynamic departure date scheduling with an admin dashboard, a structured booking workflow with automated PDF ticket generation, Midtrans payment gateway integration, and a dynamic customer testimonial management system.',
      id: 'Sebuah platform reservasi open trip berbasis web yang dirancang untuk menghubungkan para pelancong dengan paket perjalanan. Dibangun menggunakan Laravel 11, Bootstrap, dan JavaScript. Fitur utamanya mencakup sistem pencarian dan pemfilteran destinasi yang terpisah, penjadwalan tanggal keberangkatan dinamis dengan dasbor admin, alur kerja pemesanan terstruktur dengan pembuatan tiket PDF otomatis, integrasi gateway pembayaran Midtrans, dan sistem manajemen testimoni pelanggan yang dinamis.'
    },
    technologies: ['Laravel 11', 'Bootstrap', 'JavaScript'],
    features: [
      { title: { en: 'Destination Search and Filter', id: 'Pencarian dan Filter Destinasi' }, description: { en: 'A separated destination search and filter system allows users to easily find and filter travel packages based on their preferences.', id: 'Sistem pencarian dan pemfilteran destinasi yang terpisah memungkinkan pengguna untuk dengan mudah menemukan dan memfilter paket perjalanan berdasarkan preferensi mereka.' } },
      { title: { en: 'Dynamic Departure Date Scheduling', id: 'Penjadwalan Tanggal Keberangkatan Dinamis' }, description: { en: 'Filter and display data based on specific criteria such as flood risk levels or infrastructure types, allowing users to focus on relevant information.', id: 'Memfilter dan menampilkan data berdasarkan kriteria tertentu seperti tingkat risiko banjir atau jenis infrastruktur, sehingga memungkinkan pengguna untuk fokus pada informasi yang relevan.' } },
      { title: { en: 'Structured Booking Workflow', id: 'Alur Kerja Pemesanan Terstruktur' }, description: { en: 'Analyze spatial relationships between data points to identify areas within a certain distance from flood sources or drainage infrastructure.', id: 'Menganalisis hubungan spasial antar titik data untuk mengidentifikasi area dalam jarak tertentu dari sumber banjir atau infrastruktur drainase.' } },
      { title: { en: 'Automated PDF Ticket Generation', id: 'Pembuatan Tiket PDF Otomatis' }, description: { en: 'Analyze the proximity between flood-prone points and drainage infrastructure to identify areas that require immediate attention and maintenance.', id: 'Menganalisis kedekatan antara titik rawan banjir dan infrastruktur drainase untuk mengidentifikasi area yang memerlukan perhatian dan pemeliharaan segera.' } },
      { title: { en: 'Midtrans Payment Gateway Integration', id: 'Integrasi Gateway Pembayaran Midtrans' }, description: { en: 'Analyze the proximity between flood-prone points and drainage infrastructure to identify areas that require immediate attention and maintenance.', id: 'Menganalisis kedekatan antara titik rawan banjir dan infrastruktur drainase untuk mengidentifikasi area yang memerlukan perhatian dan pemeliharaan segera.' } },
      { title: { en: 'Dynamic Customer Testimonial Management System', id: 'Sistem Manajemen Testimoni Pelanggan Dinamis' }, description: { en: 'Analyze the proximity between flood-prone points and drainage infrastructure to identify areas that require immediate attention and maintenance.', id: 'Menganalisis kedekatan antara titik rawan banjir dan infrastruktur drainase untuk mengidentifikasi area yang memerlukan perhatian dan pemeliharaan segera.' } }
    ],
    images: [
      'asset/Tripnesia (1).png',
      'asset/Tripnesia (2).png',
      'asset/Tripnesia (3).png'
    ],
    githubLink: 'https://github.com/ImamMahatirHasibuan/Tripnesia'
  },
  project10: {
    title: { en: 'PMS', id: 'PMS' },
    description: {
      en: 'The PMS (Property Management System) project is a comprehensive web-based enterprise application engineered to automate and centralize daily building operations. By integrating an intuitive React front-end with a highly scalable Laravel REST API, the system seamlessly orchestrates cross-departmental workflows, including Security Patrols, Cleaning Logs, Engineering Tasks, and Tenant Complaints. The application features a real-time Unified Operational Feed and a dynamic Dashboard that instantly tracks Work Performance KPIs, Ticket SLAs, and continuous carry-over work lists. By transforming fragmented operational logs into accessible, data-driven visualizations, PMS ensures that modern building management is significantly more transparent, efficient, and highly responsive to tenant needs.',
      id: 'Proyek PMS (Sistem Manajemen Properti) adalah aplikasi perusahaan berbasis web yang komprehensif yang dirancang untuk mengotomatisasi dan memusatkan operasi harian gedung. Dengan mengintegrasikan front-end React yang intuitif dengan Laravel REST API yang sangat skalabel, sistem ini secara mulus mengorkestrasi alur kerja lintas departemen, termasuk Patroli Keamanan, Catatan Kebersihan, Tugas Teknik, dan Keluhan Penyewa. Aplikasi ini menampilkan Umpan Operasional Terpadu waktu nyata dan Dasbor dinamis yang secara instan melacak KPI Kinerja Kerja, SLA Tiket, dan daftar tugas carry-over yang berkelanjutan. Dengan mengubah log operasional yang terfragmentasi menjadi visualisasi yang dapat diakses dan didorong oleh data, PMS memastikan bahwa pengelolaan gedung modern jauh lebih transparan, efisien, dan sangat responsif terhadap kebutuhan penyewa.'
    },
    technologies: ['Laravel 11', 'React', 'JavaScript', 'Bootstrap'],
    features: [
      { title: { en: 'Security Patrol Module', id: 'Modul Patroli Keamanan' }, description: { en: 'A separated destination search and filter system allows users to easily find and filter travel packages based on their preferences.', id: 'Sistem pencarian dan pemfilteran destinasi yang terpisah memungkinkan pengguna untuk dengan mudah menemukan dan memfilter paket perjalanan berdasarkan preferensi mereka.' } },
      { title: { en: 'Cleaning Log Management Module', id: 'Modul Manajemen Catatan Kebersihan' }, description: { en: 'Filter and display data based on specific criteria such as flood risk levels or infrastructure types, allowing users to focus on relevant information.', id: 'Memfilter dan menampilkan data berdasarkan kriteria tertentu seperti tingkat risiko banjir atau jenis infrastruktur, sehingga memungkinkan pengguna untuk fokus pada informasi yang relevan.' } },
      { title: { en: 'Engineering Task Management Module', id: 'Modul Manajemen Tugas Teknik' }, description: { en: 'Analyze spatial relationships between data points to identify areas within a certain distance from flood sources or drainage infrastructure.', id: 'Menganalisis hubungan spasial antar titik data untuk mengidentifikasi area dalam jarak tertentu dari sumber banjir atau infrastruktur drainase.' } },
      { title: { en: 'Customer Complaint Management Module', id: 'Modul Manajemen Keluhan Pelanggan' }, description: { en: 'Analyze the proximity between flood-prone points and drainage infrastructure to identify areas that require immediate attention and maintenance.', id: 'Menganalisis kedekatan antara titik rawan banjir dan infrastruktur drainase untuk mengidentifikasi area yang memerlukan perhatian dan pemeliharaan segera.' } },
      { title: { en: 'Unified Operational Feed', id: 'Umpan Operasional Terpadu' }, description: { en: 'Analyze the proximity between flood-prone points and drainage infrastructure to identify areas that require immediate attention and maintenance.', id: 'Menganalisis kedekatan antara titik rawan banjir dan infrastruktur drainase untuk mengidentifikasi area yang memerlukan perhatian dan pemeliharaan segera.' } },
      { title: { en: 'Performance KPI', id: 'KPI Kinerja' }, description: { en: 'Analyze the proximity between flood-prone points and drainage infrastructure to identify areas that require immediate attention and maintenance.', id: 'Menganalisis kedekatan antara titik rawan banjir dan infrastruktur drainase untuk mengidentifikasi area yang memerlukan perhatian dan pemeliharaan segera.' } },
      { title: { en: 'Ticket SLA', id: 'SLA Tiket' }, description: { en: 'Analyze the proximity between flood-prone points and drainage infrastructure to identify areas that require immediate attention and maintenance.', id: 'Menganalisis kedekatan antara titik rawan banjir dan infrastruktur drainase untuk mengidentifikasi area yang memerlukan perhatian dan pemeliharaan segera.' } },
      { title: { en: 'Continuous Carry-over Work List', id: 'Daftar Tugas carry-over yang berkelanjutan' }, description: { en: 'Analyze the proximity between flood-prone points and drainage infrastructure to identify areas that require immediate attention and maintenance.', id: 'Menganalisis kedekatan antara titik rawan banjir dan infrastruktur drainase untuk mengidentifikasi area yang memerlukan perhatian dan pemeliharaan segera.' } }
    ],
    images: [
      'asset/PMS (1).png',
      'asset/PMS (2).png',
      'asset/PMS (3).png'
    ],
    githubLink: 'https://github.com/ImamMahatirHasibuan/PMS'
  }
};

// Project cards shown in the grid (thumbnail + short description + links)
export const projectCards = [
  { id: 'project1', img: 'asset/E-commerce (1).png', title: 'E-Commerce Platform', desc: 'E-commerce web front end with attractive web design', github: 'https://github.com/imam/ecommerce', demo: 'https://web-ecommerce-beta.vercel.app/AboutPage.html' },
  { id: 'project2', img: 'asset/LearnHub (1).png', title: 'LearnHub', desc: 'Responsive learning website with many features', github: 'https://github.com/ImamMahatirHasibuan/LearnHub', demo: 'https://hci-kelas.vercel.app/' },
  { id: 'project3', img: 'asset/EmotionDetection.jpg', title: 'Emotion Detection', desc: 'Web-based platform for real-time human emotion detection.', github: 'https://github.com/ImamMahatirHasibuan/EmotionDetection' },
  { id: 'project4', img: 'asset/FakenewsDetection (1).png', title: 'FakeNews Detection', desc: 'Website that detects true or false news', github: 'https://github.com/ImamMahatirHasibuan/FakeNewsDetection' },
  { id: 'project5', img: 'asset/AbsensiWajah (1).png', title: 'Absensi Wajah', desc: 'Face Attendance System using Computer Vision', github: 'https://github.com/ImamMahatirHasibuan/AbsensiWajah' },
  { id: 'project6', img: 'asset/FoodBridge (1).png', title: 'FoodBridge', desc: 'food bridge website to those in need', github: 'https://github.com/ImamMahatirHasibuan/FoodBridge' },
  { id: 'project7', img: 'asset/Cisco (2).png', title: 'Router', desc: 'Router and Subnetting use Cisco', github: null, demo: null },
  { id: 'project8', img: 'asset/B-DRAIN (1).png', title: 'B-DRAIN', desc: 'Web-based GIS geodashboard for visualizing and analyzing flood-prone points and drainage infrastructure in Bekasi City.', github: 'https://github.com/ImamMahatirHasibuan/B-DRAIN', demo: 'https://b-drain.vercel.app' },
  { id: 'project9', img: 'asset/Tripnesia (1).png', title: 'Tripnesia', desc: 'Web-based open trip booking platform', github: 'https://github.com/ImamMahatirHasibuan/Tripnesia' },
  { id: 'project10', img: 'asset/PMS (1).png', title: 'PMS', desc: 'Property Management System', github: 'https://github.com/ImamMahatirHasibuan/PMS' }
];

export const certificates = [
  { img: 'asset/sERTIFbelinguaA_page-0001.jpg', title: 'Beelingua Course A Certification' },
  { img: 'asset/SertifbelinguaB_page-0001.jpg', title: 'Beelingua Course B Certification' },
  { img: 'asset/CertiMetaAI.jpg', title: 'Meta AI Seminar Certification' },
  { img: 'asset/CertifJavaBasic.png', title: 'Java Basic Certification' },
  { img: 'asset/CertifCBasic.png', title: 'C# Basic Certification' },
  { img: 'asset/PythonBasic.png', title: 'Python Basic Certification' },
  { img: 'asset/SQLbasic.png', title: 'SQL Basic Certification' },
  { img: 'asset/JS-Basic.png', title: 'JS Basic Certification' }
];

export const educationList = [
  { name: 'SDS IT Mutiara', years: '2011-2016' },
  { name: 'SMPS IT Mutiara', years: '2017-2019' },
  { name: 'SMAS Cendana', years: '2020-2023' },
  { name: 'Binus University', years: '2023-Present' }
];

export const skillsList = [
  { icon: 'fab fa-html5', name: 'HTML' },
  { icon: 'fab fa-css3-alt', name: 'CSS' },
  { icon: 'fab fa-js-square', name: 'JavaScript' },
  { icon: 'fab fa-python', name: 'Python' },
  { icon: 'fab fa-java', name: 'Java' },
  { icon: 'fas fa-database', name: 'MySQL' },
  { icon: 'fas fa-code', name: 'C' },
  { icon: 'fas fa-code', name: 'C++' }
];

export const activities = [
  {
    title: 'Aktivis Volli',
    images: ['asset/volli1.jpg', 'asset/volli2.jpg', 'asset/volli3.jpg'],
    desc: {
      en: 'Coordinated volleyball training sessions, ensuring activities were well-structured, skills improved, and team members maintained motivation and strong cooperation.',
      id: 'Mengkoordinasikan latihan tim voli, memastikan setiap sesi berjalan teratur, meningkatkan keterampilan, serta menjaga semangat dan kekompakan anggota tim.'
    }
  },
  {
    title: 'Jakarta Recycle Center',
    images: ['asset/JRC1.jpg', 'asset/JRC2.jpg', 'asset/JRC3.jpg'],
    desc: {
      en: 'Contributed to recycling plastic waste into useful products, supporting waste reduction efforts and raising public awareness on environmental sustainability.',
      id: 'Berkontribusi dalam pengolahan sampah plastik menjadi produk berguna, mendukung pengurangan limbah serta meningkatkan kesadaran masyarakat tentang pentingnya daur ulang.'
    }
  },
  {
    title: 'Pembuatan Biopori Recyclub',
    images: ['asset/Biopori1.jpg', 'asset/Biopori2.jpg', 'asset/Biopori3.jpg'],
    desc: {
      en: 'Initiated biopore hole projects to reduce waterlogging, manage organic waste effectively, and encourage greater environmental awareness among community members.',
      id: 'Menginisiasi program pembuatan lubang biopori untuk mengurangi genangan air, mengelola sampah organik, serta meningkatkan kepedulian terhadap lingkungan sekitar.'
    }
  },
  {
    title: 'Wawancara para guru',
    images: ['asset/CBAGAMA.jpg', 'asset/CBAGAMA2.jpg', 'asset/CBAGAMA3.jpg'],
    desc: {
      en: 'Conducted interviews with teachers to explore how spiritual values influence workplace culture, discipline, and professional attitudes in organizational environments.',
      id: 'Melakukan wawancara dengan guru sekolah mengenai peran nilai spiritual dalam membentuk budaya kerja positif, disiplin, dan profesionalisme di dunia kerja.'
    }
  },
  {
    title: 'Sosialisasi ke siswa disekolah',
    images: ['asset/CBPancasila.jpg', 'asset/CBPancasila2.jpg', 'asset/CBPancasila3.jpg'],
    desc: {
      en: 'Delivered sessions to students about practicing Pancasila values, promoting unity, responsibility, and strong moral character in everyday personal and social life.',
      id: 'Memberikan sosialisasi kepada siswa sekolah mengenai penerapan nilai-nilai Pancasila, membangun karakter, serta memperkuat rasa persatuan dan tanggung jawab bangsa.'
    }
  }
];
