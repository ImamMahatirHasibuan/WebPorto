import React, { useState, useEffect, useRef } from 'react';
import './Portfolio.css';

function App() {
  // State Management
  const [lang, setLang] = useState('en');
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [currentModalImageIndex, setCurrentModalImageIndex] = useState(0);
  const [activeSection, setActiveSection] = useState('about');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [cardOffset, setCardOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [isCertificateModalOpen, setIsCertificateModalOpen] = useState(false);
  const [selectedCertificateImage, setSelectedCertificateImage] = useState(null);
  
  // Refs
  const idCardRef = useRef(null);
  const dragStartPos = useRef({ x: 0, y: 0 });

  // Translation helper
  const t = (en, id) => (lang === 'en' ? en : id);

  // Project Data
  const projectData = {
    project1: {
      title: { en: 'Web E-Commerce', id: 'Web E-Commerce' },
      description: {
        en: 'A simple e-commerce website designed to display and sell various products like clothes, shoes, and accessories. Built using HTML, CSS, and JavaScript without frameworks, focusing on basic structure, appearance, and interactions. Features include product catalog, shopping cart, and responsive design for optimal viewing across all devices.',
        id: 'Sebuah website e-commerce sederhana yang dirancang untuk menampilkan dan menjual berbagai produk seperti baju, sepatu, dan aksesoris. Dibangun menggunakan HTML, CSS, dan JavaScript tanpa framework, berfokus pada struktur dasar, tampilan, dan interaksi. Fitur termasuk katalog produk, keranjang belanja, dan desain responsif untuk tampilan optimal di semua perangkat.'
      },
      technologies: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Design'],
      features: [
        {
          title: { en: 'Product Catalog', id: 'Katalog Produk' },
          description: { en: 'Dynamic product display with categories, search functionality, and detailed product pages.', id: 'Tampilan produk dinamis dengan kategori, fungsi pencarian, dan halaman produk yang detail.' }
        },
        {
          title: { en: 'Shopping Cart', id: 'Keranjang Belanja' },
          description: { en: 'Interactive shopping cart with add/remove items, quantity adjustment, and total calculation.', id: 'Keranjang belanja interaktif dengan tambah/hapus item, penyesuaian jumlah, dan kalkulasi total.' }
        },
        {
          title: { en: 'Responsive Design', id: 'Desain Responsif' },
          description: { en: 'Mobile-first design that works seamlessly across desktop, tablet, and mobile devices.', id: 'Desain mobile-first yang bekerja dengan mulus di desktop, tablet, dan perangkat mobile.' }
        },
        {
          title: { en: 'User Interface', id: 'Antarmuka Pengguna' },
          description: { en: 'Clean and intuitive user interface with smooth animations and modern design elements.', id: 'Antarmuka pengguna yang bersih dan intuitif dengan animasi halus dan elemen desain modern.' }
        }
      ],
      images: ['/asset/E-commerce (1).png', '/asset/E-commerce (2).png', '/asset/E-commerce (3).png', '/asset/E-commerce (4).png', '/asset/E-commerce (5).png', '/asset/E-commerce (6).png'],
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
        { title: { en: 'Dashboard LearnHub', id: 'Dashboard LearnHub' }, description: { en: 'Overview of courses, learning hours, certificates, and achievements.', id: 'Ringkasan kursus, jam belajar, sertifikat, dan pencapaian.' }},
        { title: { en: 'Course List', id: 'Course List' }, description: { en: 'Browse & search courses, view progress, ratings, and details.', id: 'Cari & pilih kursus, lihat progress, rating, dan detail kursus.' }},
        { title: { en: 'Profile', id: 'Profile' }, description: { en: 'User info, learning stats, certificates, and streak tracking.', id: 'Data pengguna, statistik belajar, sertifikat, dan learning streak.' }},
        { title: { en: 'Course Detail', id: 'Course Detail' }, description: { en: 'Course content list with progress status.', id: 'Daftar materi kursus dengan status progres.' }},
        { title: { en: 'Video Player', id: 'Video Player' }, description: { en: 'Learn through interactive video lessons.', id: 'Belajar lewat video interaktif.' }},
        { title: { en: 'Quiz', id: 'Quiz' }, description: { en: 'Interactive quizzes for knowledge evaluation.', id: 'Kuis interaktif untuk evaluasi pembelajaran.' }}
      ],
      images: ['/asset/LearnHub (1).png', '/asset/LearnHub (2).png', '/asset/LearnHub (3).png', '/asset/LearnHub (4).png', '/asset/LearnHub (5).png'],
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
        { title: { en: 'Webcam Capture', id: 'Webcam Capture' }, description: { en: 'Capture images directly from the webcam.', id: 'Ambil gambar langsung dari kamera.' }},
        { title: { en: 'Image Upload', id: 'Image Upload' }, description: { en: 'Upload photos from device for analysis.', id: 'Unggah foto dari perangkat untuk analisis.' }},
        { title: { en: 'Emotion Prediction', id: 'Emotion Prediction' }, description: { en: 'Display emotion prediction results (text + label).', id: 'Menampilkan hasil prediksi emosi (teks + label).' }},
        { title: { en: 'Image Preview', id: 'Image Preview' }, description: { en: 'Show captured/uploaded image with detected emotion.', id: 'Menampilkan foto hasil tangkapan/upload dengan emosi terdeteksi.' }}
      ],
      images: ['/asset/EmotionDetection.jpg', '/asset/EmotionDetection2.jpg', '/asset/EmotionDetection3.jpg', '/asset/EmotionDetection4.jpg', '/asset/EmotionDetection5.jpg'],
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
        { title: { en: 'News Input', id: 'Input Berita' }, description: { en: 'Users can enter news text.', id: 'Pengguna dapat memasukkan teks berita.' }},
        { title: { en: 'News Classification', id: 'Klasifikasi Berita' }, description: { en: 'Predicts whether the news is fake or real.', id: 'Sistem memprediksi apakah berita palsu atau asli.' }},
        { title: { en: 'NLP Analysis', id: 'Analisis NLP' }, description: { en: 'Uses natural language processing to understand text patterns.', id: 'Menggunakan pemrosesan bahasa alami untuk memahami pola teks.' }},
        { title: { en: 'Result Visualization', id: 'Visualisasi Hasil' }, description: { en: 'Displays classification results in a simple format.', id: 'Menyajikan hasil klasifikasi dengan tampilan sederhana.' }}
      ],
      images: ['/asset/FakenewsDetection (1).png', '/asset/FakenewsDetection (2).png', '/asset/FakenewsDetection (3).png', '/asset/FakenewsDetection (4).png'],
      githubLink: 'https://github.com/ImamMahatirHasibuan/FakeNewsDetection'
    },
    project5: {
      title: { en: 'Face Recognition Absence', id: 'Absensi Wajah' },
      description: {
        en: 'AbsensiWajah is a machine learning-based application designed to automatically record student attendance using face recognition technology. The system uses a camera to detect faces and store attendance data into a database, making the attendance process faster, more accurate, and efficient.',
        id: 'AbsensiWajah adalah aplikasi berbasis machine learning yang digunakan untuk mencatat kehadiran mahasiswa secara otomatis menggunakan teknologi pengenalan wajah. Sistem ini memanfaatkan kamera untuk mendeteksi wajah dan menyimpan data absensi ke dalam basis data, sehingga proses absensi lebih cepat, akurat, dan efisien.'
      },
      technologies: ['Python (Flask)', 'OpenCV', 'TensorFlow'],
      features: [
        { title: { en: 'Real-time Face Detection', id: 'Deteksi Wajah Real-time' }, description: { en: 'Detects user faces directly via camera.', id: 'Sistem mendeteksi wajah pengguna langsung melalui kamera.' }},
        { title: { en: 'Face Recognition', id: 'Pengenalan Wajah' }, description: { en: 'Identifies registered faces stored in the database.', id: 'Mengenali wajah yang sudah terdaftar di database.' }},
        { title: { en: 'Automatic Attendance Recording', id: 'Pencatatan Absensi Otomatis' }, description: { en: 'Saves attendance data automatically without manual input.', id: 'Menyimpan data kehadiran ke file/database tanpa input manual.' }},
        { title: { en: 'Attendance History', id: 'Riwayat Absensi' }, description: { en: 'Displays previously recorded attendance data.', id: 'Menampilkan data absensi yang sudah tercatat sebelumnya.' }}
      ],
      images: ['/asset/AbsensiWajah (1).png', '/asset/AbsensiWajah (2).png', '/asset/AbsensiWajah (3).png', '/asset/AbsensiWajah (4).png'],
      githubLink: 'https://github.com/ImamMahatirHasibuan/AbsensiWajah'
    },
    project6: {
      title: { en: 'Food Bridge', id: 'Jembatan Makanan' },
      description: {
        en: 'a web-based food donation management platform designed to connect food surpluses from donors with recipients and facilitate the pickup/delivery process through volunteers. The goal is to reduce food waste, combat hunger, and build a more responsible community.',
        id: 'platform manajemen donasi makanan berbasis web yang dirancang untuk mempertemukan kelebihan makanan dari donatur dengan penerima donasi dan memfasilitasi proses penjemputan/pengiriman melalui sukarelawan. Tujuannya adalah mengurangi pemborosan makanan, melawan kelaparan, dan membangun komunitas yang lebih bertanggung jawab.'
      },
      technologies: ['HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL', 'XAMPP'],
      features: [
        { title: { en: 'Role-Based Authentication', id: 'Otentikasi Berbasis Peran' }, description: { en: 'A login and registration system that segments users into four main roles: Food Donor, Food Recipient, Volunteer, and Admin.', id: 'Sistem login dan registrasi yang memisahkan pengguna menjadi empat peran utama: Food Donor, Food Recipient, Volunteer, dan Admin.' }},
        { title: { en: 'Food Donation Management', id: 'Manajemen Donasi Makanan' }, description: { en: 'Food Donors can easily create, edit, and publish new donations.', id: 'Donor Makanan dapat dengan mudah membuat, mengedit, dan mempublikasikan donasi baru.' }},
        { title: { en: 'Volunteer Assignment', id: 'Penugasan Sukarelawan' }, description: { en: 'The system allows donors/admins to assign a Volunteer to pick up the claimed donation.', id: 'Sistem memungkinkan donor/admin untuk menetapkan Sukarelawan untuk mengambil donasi.' }},
        { title: { en: 'Donation Claim by Recipient', id: 'Klaim Donasi oleh Penerima' }, description: { en: 'Food Recipients can view the list of available donations and claim the ones they need.', id: 'Penerima Makanan dapat melihat daftar donasi yang tersedia dan mengklaim donasi yang mereka butuhkan.' }}
      ],
      images: ['/asset/FoodBridge (1).png', '/asset/FoodBridge (2).png', '/asset/FoodBridge (3).png', '/asset/FoodBridge (4).png'],
      githubLink: 'https://github.com/ImamMahatirHasibuan/FoodBridge'
    },
    project7: {
      title: { en: 'Router', id: 'Router' },
      description: {
        en: 'A comprehensive network infrastructure design project utilizing Cisco technologies for the BINUS Bekasi campus. This project includes developing detailed network topologies, configuring routers and switches, and implementing subnetting schemes to optimize IP address allocation.',
        id: 'Sebuah proyek perancangan infrastruktur jaringan menggunakan teknologi Cisco untuk kampus BINUS Bekasi. Proyek ini mencakup pembuatan topologi jaringan yang terperinci, konfigurasi router dan switch, serta penerapan skema subnetting untuk mengoptimalkan penggunaan alamat IP.'
      },
      technologies: ['Cisco Packet Tracer', 'Network Design', 'Routing Protocols'],
      features: [
        { title: { en: 'Network Topology', id: 'Topologi Jaringan' }, description: { en: 'Provides a visual guide for technicians in installation and troubleshooting.', id: 'Memberikan panduan visual bagi teknisi dalam pemasangan dan troubleshooting.' }},
        { title: { en: 'Router Configuration', id: 'Router Configuration' }, description: { en: 'Connects different subnets to ensure smooth communication.', id: 'Menghubungkan subnet berbeda sehingga komunikasi tetap lancar.' }},
        { title: { en: 'Switch VLAN', id: 'Switch VLAN' }, description: { en: 'Segregates network traffic to enhance security and efficiency.', id: 'Memisahkan lalu lintas jaringan agar lebih aman dan efisien.' }},
        { title: { en: 'Subnetting', id: 'Subnetting' }, description: { en: 'Conserves IP addresses, simplifies management, and improves security.', id: 'Menghemat alamat IP, memudahkan manajemen, dan meningkatkan keamanan.' }}
      ],
      images: ['/asset/Cisco (1).png', '/asset/Cisco (2).png', '/asset/Cisco (3).png', '/asset/Cisco (4).png']
    }
  };

  // Gallery states for activities
  const [activityGalleries, setActivityGalleries] = useState({
    volli: 0,
    jrc: 0,
    biopori: 0,
    cbagama: 0,
    cbpancasila: 0
  });

  // Create stars on mount
  useEffect(() => {
    console.log('🌟 Creating stars...');
    
    const galaxyBg = document.getElementById('galaxy-background');
    console.log('Galaxy background element:', galaxyBg);
    if (galaxyBg) {
      const styles = window.getComputedStyle(galaxyBg);
      console.log('Galaxy background styles:', {
        position: styles.position,
        zIndex: styles.zIndex,
        background: styles.background,
        width: styles.width,
        height: styles.height
      });
    }
    
    const starsContainer = document.getElementById('stars');
    console.log('Stars container element:', starsContainer);
    
    if (!starsContainer) {
      console.error('❌ Stars container not found!');
      return;
    }

    // Create static stars
    for (let i = 0; i < 200; i++) {
      const star = document.createElement('div');
      star.className = 'star';
      const size = Math.random();
      if (size > 0.8) star.classList.add('large');
      else if (size > 0.5) star.classList.add('medium');
      else star.classList.add('small');
      star.style.left = Math.random() * 100 + '%';
      star.style.top = Math.random() * 100 + '%';
      star.style.animationDelay = Math.random() * 3 + 's';
      star.style.animationDuration = (Math.random() * 2 + 1) + 's';
      starsContainer.appendChild(star);
    }
    console.log('✅ Created 200 static stars');

    // Create moving stars
    for (let i = 0; i < 20; i++) {
      const star = document.createElement('div');
      star.className = 'moving-star';
      star.style.width = (Math.random() * 3 + 1) + 'px';
      star.style.height = star.style.width;
      star.style.top = Math.random() * 100 + '%';
      star.style.animationDelay = Math.random() * 15 + 's';
      star.style.animationDuration = (Math.random() * 10 + 10) + 's';
      starsContainer.appendChild(star);
    }
    console.log('✅ Created 20 moving stars');

    // Create shooting stars
    const shootingStarsContainer = document.getElementById('shooting-stars');
    console.log('Shooting stars container:', shootingStarsContainer);
    
    if (shootingStarsContainer) {
      for (let i = 0; i < 5; i++) {
        const shootingStar = document.createElement('div');
        shootingStar.className = 'shooting-star';
        shootingStar.style.top = Math.random() * 50 + '%';
        shootingStar.style.animationDelay = Math.random() * 8 + 's';
        shootingStar.style.animationDuration = (Math.random() * 2 + 2) + 's';
        shootingStarsContainer.appendChild(shootingStar);
      }
      console.log('✅ Created 5 shooting stars');
    }
    
    console.log('🎉 All stars created successfully!');
    console.log('Total stars in container:', starsContainer.children.length);
  }, []);

  // Scroll handler
  useEffect(() => {
    const handleScroll = () => {
      // Show/hide scroll to top button
      setShowScrollTop(window.scrollY > 500);

      // Update active section
      const sections = document.querySelectorAll('.section');
      let current = 'about';
      sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
          current = section.getAttribute('id');
        }
      });
      setActiveSection(current);

      // Navbar background
      const navbar = document.getElementById('navbar');
      if (navbar) {
        navbar.style.background = window.scrollY > 50 ? 'rgba(0, 0, 0, 0.6)' : 'rgba(0, 0, 0, 0.3)';
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ID Card dragging
  useEffect(() => {
    const idCard = idCardRef.current;
    if (!idCard) return;

    const handleMouseDown = (e) => {
      setIsDragging(true);
      dragStartPos.current = { x: e.clientX || e.touches[0].clientX, y: e.clientY || e.touches[0].clientY };
      idCard.style.cursor = 'grabbing';
      idCard.style.transition = 'none';
    };

    const handleMouseMove = (e) => {
      if (!isDragging) return;
      e.preventDefault();
      const clientX = e.clientX || e.touches[0]?.clientX || 0;
      const clientY = e.clientY || e.touches[0]?.clientY || 0;
      const deltaX = clientX - dragStartPos.current.x;
      const deltaY = clientY - dragStartPos.current.y;
      const maxDistance = 100;
      const constrainedX = Math.sign(deltaX) * Math.min(Math.abs(deltaX), maxDistance);
      const constrainedY = Math.sign(deltaY) * Math.min(Math.abs(deltaY), maxDistance);
      setCardOffset({ x: constrainedX, y: constrainedY });
    };

    const handleMouseUp = () => {
      if (!isDragging) return;
      setIsDragging(false);
      idCard.style.cursor = 'grab';
      idCard.style.transition = 'all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
      setCardOffset({ x: 0, y: 0 });
    };

    idCard.addEventListener('mousedown', handleMouseDown);
    idCard.addEventListener('touchstart', handleMouseDown);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('touchmove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('touchend', handleMouseUp);

    return () => {
      idCard.removeEventListener('mousedown', handleMouseDown);
      idCard.removeEventListener('touchstart', handleMouseDown);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('touchmove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging]);

  // Functions
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openProjectModal = (projectId) => {
    setSelectedProjectId(projectId);
    setCurrentModalImageIndex(0);
    setIsProjectModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeProjectModal = () => {
    setIsProjectModalOpen(false);
    document.body.style.overflow = 'auto';
  };

  const openCertificateModal = (imageUrl) => {
    setSelectedCertificateImage(imageUrl);
    setIsCertificateModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeCertificateModal = () => {
    setIsCertificateModalOpen(false);
    setSelectedCertificateImage(null);
    document.body.style.overflow = 'auto';
  };

  const changeModalImage = (direction) => {
    const project = projectData[selectedProjectId];
    if (!project) return;
    let newIndex = currentModalImageIndex + direction;
    if (newIndex >= project.images.length) newIndex = 0;
    if (newIndex < 0) newIndex = project.images.length - 1;
    setCurrentModalImageIndex(newIndex);
  };

  const setModalImage = (index) => {
    setCurrentModalImageIndex(index);
  };

  const changeActivityImage = (activityId, direction) => {
    setActivityGalleries(prev => {
      const images = document.querySelectorAll(`#activity-${activityId} .activity-photo`);
      let newIndex = prev[activityId] + direction;
      if (newIndex >= images.length) newIndex = 0;
      if (newIndex < 0) newIndex = images.length - 1;
      return { ...prev, [activityId]: newIndex };
    });
  };

  // Activity data
  const activities = [
    {
      id: 'volli',
      title: 'Aktivis Volli',
      images: ['/asset/volli1.jpg', '/asset/volli2.jpg', '/asset/volli3.jpg'],
      desc: { en: 'Coordinated volleyball training sessions, ensuring activities were well-structured, skills improved, and team members maintained motivation and strong cooperation.', id: 'Mengkoordinasikan latihan tim voli, memastikan setiap sesi berjalan teratur, meningkatkan keterampilan, serta menjaga semangat dan kekompakan anggota tim.' }
    },
    {
      id: 'jrc',
      title: 'Jakarta Recycle Center',
      images: ['/asset/JRC1.jpg', '/asset/JRC2.jpg', '/asset/JRC3.jpg'],
      desc: { en: 'Contributed to recycling plastic waste into useful products, supporting waste reduction efforts and raising public awareness on environmental sustainability.', id: 'Berkontribusi dalam pengolahan sampah plastik menjadi produk berguna, mendukung pengurangan limbah serta meningkatkan kesadaran masyarakat tentang pentingnya daur ulang.' }
    },
    {
      id: 'biopori',
      title: 'Pembuatan Biopori Recyclub',
      images: ['/asset/Biopori1.jpg', '/asset/Biopori2.jpg', '/asset/Biopori3.jpg'],
      desc: { en: 'Initiated biopore hole projects to reduce waterlogging, manage organic waste effectively, and encourage greater environmental awareness among community members.', id: 'Menginisiasi program pembuatan lubang biopori untuk mengurangi genangan air, mengelola sampah organik, serta meningkatkan kepedulian terhadap lingkungan sekitar.' }
    },
    {
      id: 'cbagama',
      title: 'Wawancara para guru',
      images: ['/asset/CBAGAMA.jpg', '/asset/CBAGAMA2.jpg', '/asset/CBAGAMA3.jpg'],
      desc: { en: 'Conducted interviews with teachers to explore how spiritual values influence workplace culture, discipline, and professional attitudes in organizational environments.', id: 'Melakukan wawancara dengan guru sekolah mengenai peran nilai spiritual dalam membentuk budaya kerja positif, disiplin, dan profesionalisme di dunia kerja.' }
    },
    {
      id: 'cbpancasila',
      title: 'Sosialisasi ke siswa disekolah',
      images: ['/asset/CBPancasila.jpg', '/asset/CBPancasila2.jpg', '/asset/CBPancasila3.jpg'],
      desc: { en: 'Delivered sessions to students about practicing Pancasila values, promoting unity, responsibility, and strong moral character in everyday personal and social life.', id: 'Memberikan sosialisasi kepada siswa sekolah mengenai penerapan nilai-nilai Pancasila, membangun karakter, serta memperkuat rasa persatuan dan tanggung jawab bangsa.' }
    }
  ];

  return (
    <div className="portfolio-root">
      {/* Galaxy Background */}
      <div id="galaxy-background">
        <div id="stars"></div>
        <div id="nebula"></div>
        <div id="shooting-stars"></div>
      </div>

      {/* Navigation */}
      <nav id="navbar">
        <div className="nav-container">
          <h1 className="logo">Imam Mahatir Hasibuan</h1>
          
          <div className="nav-items">
            <a onClick={() => scrollToSection('about')} className={`nav-link ${activeSection === 'about' ? 'active' : ''}`}>
              {t('About', 'Tentang')}
            </a>
            <a onClick={() => scrollToSection('projects')} className={`nav-link ${activeSection === 'projects' ? 'active' : ''}`}>
              {t('Projects', 'Proyek')}
            </a>
            <a onClick={() => scrollToSection('certificates')} className={`nav-link ${activeSection === 'certificates' ? 'active' : ''}`}>
              {t('Certificates', 'Sertifikat')}
            </a>
            <a onClick={() => scrollToSection('contact')} className={`nav-link ${activeSection === 'contact' ? 'active' : ''}`}>
              {t('Contact', 'Kontak')}
            </a>
            
            <div className="language-switcher">
              <button className={`lang-btn ${lang === 'en' ? 'active' : ''}`} onClick={() => setLang('en')}>EN</button>
              <button className={`lang-btn ${lang === 'id' ? 'active' : ''}`} onClick={() => setLang('id')}>ID</button>
            </div>
          </div>
        </div>
      </nav>

      {/* About Section */}
      <section id="about" className="section">
        <div className="container">
          {/* ID Card */}
          <div className="id-card-container">
            <div className="lanyard"></div>
            <div 
              id="id-card" 
              className="id-card" 
              ref={idCardRef}
              style={{ transform: `translate(${cardOffset.x}px, ${cardOffset.y}px) scale(${isDragging ? 1.1 : 1})` }}
            >
              <div className="id-card-inner">
                <div className="profile-image">
                  <img src="/asset/PPportodangithub.jpg" alt="Profile" />
                </div>
                <h2 className="card-name">Imam Mahatir Hasibuan</h2>
                <p className="card-major">
                  {t('Computer Science - Software Engineering', 'Ilmu Komputer - Rekayasa Perangkat Lunak')}
                </p>
                <p className="card-gpa">GPA: 3.04</p>
              </div>
            </div>
            <p className="swipe-hint">
              {t('Swipe or drag the card to move.', 'Geser atau tarik kartu untuk menggerakkan.')}
            </p>
          </div>

          {/* Description */}
          <div className="description-card">
            <p className="description">
              {t(
                'I am a Computer Science (Software Engineering) student at Binus University with a strong interest in technology and software development. I have studied several programming languages such as Java, Python, SQL, HTML, CSS, and the React framework, while also understanding the fundamentals of UI/UX design using Figma. Although still in the learning stage, I am highly motivated to keep growing, with a particular passion for data and web development. I enjoy working in teams, collaborating effectively, and building good connections with others.',
                'Saya adalah mahasiswa Binus University jurusan Computer Science (Software Engineering) dengan minat besar pada teknologi dan pengembangan perangkat lunak. Saya memiliki pengalaman mempelajari berbagai bahasa pemrograman seperti Java, Python, SQL, HTML, CSS, serta framework React, dan juga memahami dasar-dasar perancangan UI/UX menggunakan Figma. Meskipun masih dalam tahap pembelajaran, saya memiliki semangat tinggi untuk terus berkembang, dengan ketertarikan khusus pada bidang data dan web development. Saya juga senang bekerja dalam tim, berkolaborasi, dan mudah bergaul dengan lingkungan baru.'
              )}
            </p>
          </div>

          {/* Education */}
          <div className="section-content">
            <h3 className="section-title">{t('Education', 'Pendidikan')}</h3>
            <div className="education-grid">
              <div className="education-card">
                <h4>SDS IT Mutiara</h4>
                <p>2011-2016</p>
              </div>
              <div className="education-card">
                <h4>SMPS IT Mutiara</h4>
                <p>2017-2019</p>
              </div>
              <div className="education-card">
                <h4>SMAS Cendana</h4>
                <p>2020-2023</p>
              </div>
              <div className="education-card">
                <h4>Binus University</h4>
                <p>2023-Present</p>
              </div>
            </div>
          </div>

          {/* Programming Languages */}
          <div className="section-content">
            <h3 className="section-title">{t('Programming Languages', 'Bahasa Pemrograman')}</h3>
            <div className="skills-grid">
              <div className="skill-card"><i className="fab fa-html5"></i><span>HTML</span></div>
              <div className="skill-card"><i className="fab fa-css3-alt"></i><span>CSS</span></div>
              <div className="skill-card"><i className="fab fa-js-square"></i><span>JavaScript</span></div>
              <div className="skill-card"><i className="fab fa-python"></i><span>Python</span></div>
              <div className="skill-card"><i className="fab fa-java"></i><span>Java</span></div>
              <div className="skill-card"><i className="fas fa-database"></i><span>MySQL</span></div>
              <div className="skill-card"><i className="fas fa-code"></i><span>C</span></div>
              <div className="skill-card"><i className="fas fa-code"></i><span>C++</span></div>
            </div>
          </div>

          {/* Campus Activities */}
          <div className="section-content">
            <h3 className="section-title">{t('Campus Activities', 'Aktivitas Kampus')}</h3>
            <div className="activities-grid">
              {activities.map((activity) => (
                <div key={activity.id} className="activity-card" id={`activity-${activity.id}`}>
                  <h4>{activity.title}</h4>
                  <div className="photo-gallery">
                    <div className="gallery-container">
                      {activity.images.map((img, idx) => (
                        <img
                          key={idx}
                          src={img}
                          className={`activity-photo ${idx === activityGalleries[activity.id] ? 'active' : ''}`}
                          alt={`${activity.title} ${idx + 1}`}
                        />
                      ))}
                    </div>
                    <div className="gallery-controls">
                      <button className="prev-btn" onClick={() => changeActivityImage(activity.id, -1)}>&#10094;</button>
                      <div className="gallery-dots">
                        {activity.images.map((_, idx) => (
                          <span
                            key={idx}
                            className={`dot ${idx === activityGalleries[activity.id] ? 'active' : ''}`}
                            onClick={() => setActivityGalleries(prev => ({ ...prev, [activity.id]: idx }))}
                          ></span>
                        ))}
                      </div>
                      <button className="next-btn" onClick={() => changeActivityImage(activity.id, 1)}>&#10095;</button>
                    </div>
                  </div>
                  <div className="activity-desc">{activity.desc[lang]}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="section">
        <div className="container">
          <h2 className="main-title">{t('Projects', 'Proyek')}</h2>
          <div className="projects-grid">
            {Object.keys(projectData).map((projectId) => {
              const project = projectData[projectId];
              return (
                <div key={projectId} className="project-card" onClick={() => openProjectModal(projectId)}>
                  <img src={project.images[0]} alt={project.title[lang]} />
                  <div className="project-content">
                    <h3>{project.title[lang]}</h3>
                    <p>{project.description[lang].substring(0, 100)}...</p>
                    {project.githubLink && (
                      <div className="project-links">
                        <a href={project.githubLink} className="project-link" onClick={(e) => e.stopPropagation()} target="_blank" rel="noopener noreferrer">
                          <i className="fab fa-github"></i>
                          <span>{t('GitHub', 'GitHub')}</span>
                        </a>
                        {project.demoLink && (
                          <a href={project.demoLink} className="project-link" onClick={(e) => e.stopPropagation()} target="_blank" rel="noopener noreferrer">
                            <i className="fas fa-external-link-alt"></i>
                            <span>{t('Demo', 'Demo')}</span>
                          </a>
                        )}
                      </div>
                    )}
                    <div className="view-details">
                      <i className="fas fa-eye"></i>
                      <span>{t('Click to view details', 'Klik untuk melihat detail')}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Certificates Section */}
      <section id="certificates" className="section">
        <div className="container">
          <h2 className="main-title">{t('Certificates', 'Sertifikat')}</h2>
          <div className="certificates-grid">
            {[
              { img: '/asset/sERTIFbelinguaA_page-0001.jpg', title: 'Beelingua Course A Certification' },
              { img: '/asset/SertifbelinguaB_page-0001.jpg', title: 'Beelingua Course B Certification' },
              { img: '/asset/CertiMetaAI.jpg', title: 'Meta AI Seminar Certification' },
              { img: '/asset/CertifJavaBasic.png', title: 'Java Basic Certification' },
              { img: '/asset/CertifCBasic.png', title: 'C# Basic Certification' },
              { img: '/asset/PythonBasic.png', title: 'Python Basic Certification' },
              { img: '/asset/SQLbasic.png', title: 'SQL Basic Certification' },
              { img: '/asset/JS-Basic.png', title: 'JS Basic Certification' }
            ].map((cert, idx) => (
              <div 
                key={idx} 
                className="certificate-card"
                onClick={() => openCertificateModal(cert.img)}
                style={{ cursor: 'pointer' }}
              >
                <img src={cert.img} alt={cert.title} />
                <h3>{cert.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CV Section */}
      <section id="cv" className="section cv-section">
        <div className="container">
          <h2 className="main-title">{t('Curriculum Vitae', 'Curriculum Vitae')}</h2>
          <div className="cv-card">
            <p className="cv-text">{t('Download my latest CV in PDF format.', 'Unduh CV terbaru saya dalam format PDF.')}</p>
            <a className="cv-download-btn" href="/asset/CV  Imam Mahatir Hasibuan.pdf" download>
              <i className="fas fa-download"></i>
              <span>{t('Download CV', 'Unduh CV')}</span>
            </a>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section">
        <div className="container">
          <h2 className="main-title">{t('Contact', 'Kontak')}</h2>
          <div className="contact-grid">
            <a href="https://wa.me/6289513730840" className="contact-card whatsapp" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-whatsapp"></i>
              <span>WhatsApp</span>
            </a>
            <a href="https://www.instagram.com/imamahatir?igsh=MWVyNjlwcDhpZWRxMQ%3D%3D&utm_source=qr" className="contact-card instagram" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-instagram"></i>
              <span>Instagram</span>
            </a>
            <a href="https://mail.google.com/mail/?view=cm&fs=1&to=imamahatir@gmail.com" target="_blank" rel="noopener noreferrer" className="contact-card email">
              <i className="fas fa-envelope"></i>
              <span>Email</span>
            </a>
            <a href="https://www.linkedin.com/in/imam-mahatir-75169a2a8?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app" className="contact-card linkedin" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-linkedin"></i>
              <span>LinkedIn</span>
            </a>
          </div>
        </div>
      </section>

      {/* Scroll to Top Button */}
      <button 
        id="scroll-to-top" 
        className={showScrollTop ? 'visible' : ''}
        onClick={scrollToTop}
      >
        <i className="fas fa-chevron-up"></i>
      </button>

      {/* Project Modal */}
      {isProjectModalOpen && selectedProjectId && projectData[selectedProjectId] && (
        <div className="modal show" onClick={(e) => e.target.className.includes('modal') && closeProjectModal()}>
          <div className="modal-content">
            <span className="close-modal" onClick={closeProjectModal}>&times;</span>
            <div className="modal-project">
              <div className="modal-header">
                <h2>{projectData[selectedProjectId].title[lang]}</h2>
                <div className="project-meta">
                  <span><i className="fas fa-code"></i> {projectData[selectedProjectId].technologies.length} Technologies</span>
                  <span><i className="fas fa-image"></i> {projectData[selectedProjectId].images.length} Screenshots</span>
                </div>
                <div className="project-tech">
                  {projectData[selectedProjectId].technologies.map((tech, idx) => (
                    <span key={idx} className="tech-tag">{tech}</span>
                  ))}
                </div>
              </div>

              <div className="modal-gallery">
                <div className="modal-gallery-main">
                  <img src={projectData[selectedProjectId].images[currentModalImageIndex]} alt={projectData[selectedProjectId].title[lang]} />
                  <button className="modal-gallery-nav prev" onClick={() => changeModalImage(-1)}>&#10094;</button>
                  <button className="modal-gallery-nav next" onClick={() => changeModalImage(1)}>&#10095;</button>
                </div>
                <div className="modal-gallery-thumbs">
                  {projectData[selectedProjectId].images.map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt={`Screenshot ${idx + 1}`}
                      onClick={() => setModalImage(idx)}
                      className={idx === currentModalImageIndex ? 'active' : ''}
                    />
                  ))}
                </div>
              </div>

              <div className="modal-description">
                <h3>{t('Project Overview', 'Gambaran Proyek')}</h3>
                <p>{projectData[selectedProjectId].description[lang]}</p>
              </div>

              <div className="modal-features">
                {projectData[selectedProjectId].features.map((feature, idx) => (
                  <div key={idx} className="feature-item">
                    <h4>{feature.title[lang]}</h4>
                    <p>{feature.description[lang]}</p>
                  </div>
                ))}
              </div>

              <div className="modal-links">
                {projectData[selectedProjectId].githubLink && (
                  <a href={projectData[selectedProjectId].githubLink} target="_blank" rel="noopener noreferrer" className="modal-link">
                    <i className="fab fa-github"></i>
                    {t('View Source Code', 'Lihat Kode Sumber')}
                  </a>
                )}
                {projectData[selectedProjectId].demoLink && (
                  <a href={projectData[selectedProjectId].demoLink} target="_blank" rel="noopener noreferrer" className="modal-link">
                    <i className="fas fa-external-link-alt"></i>
                    {t('Live Demo', 'Demo Langsung')}
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Certificate Modal */}
      {isCertificateModalOpen && (
        <div className="modal show" onClick={(e) => e.target.className.includes('modal') && closeCertificateModal()}>
          <div className="modal-content-certificate">
            <span className="close-modal" onClick={closeCertificateModal}>&times;</span>
            <img src={selectedCertificateImage} alt="Certificate" className="modal-certificate-image" />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;