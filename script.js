// Event Handling
        document.getElementById('eventClickBtn').addEventListener('click', () => {
            document.getElementById('eventClickMsg').textContent = 'Button clicked!';
        });

        const hoverBox = document.getElementById('hoverBox');
        hoverBox.addEventListener('mouseenter', () => {
            hoverBox.style.backgroundColor = '#ff7043';
            document.getElementById('hoverMsg').textContent = 'Hovering!';
        });
        hoverBox.addEventListener('mouseleave', () => {
            hoverBox.style.backgroundColor = '#4db6ac';
            document.getElementById('hoverMsg').textContent = '';
        });

        // Interactive Elements
        document.getElementById('changeTextBtn').addEventListener('click', function() {
            this.textContent = 'Text Changed!';
            this.style.backgroundColor = '#ff9800';
        });

        // Gallery
        const images = [
            "https://picsum.photos/320/180?random=1",
            "https://picsum.photos/320/180?random=2",
            "https://picsum.photos/320/180?random=3"
        ];
        let currentIndex = 0;
        document.getElementById('nextImageBtn').addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % images.length;
            document.getElementById('galleryImage').src = images[currentIndex];
        });

        // Tabs
        const tabs = document.querySelectorAll('.tab');
        tabs.forEach((tab, index) => {
            tab.addEventListener('click', () => {
                document.querySelectorAll('.tab-content').forEach((content, i) => {
                    content.classList.toggle('active', i === index);
                });
            });
        });

        // Accordion
        document.querySelectorAll('.accordion').forEach(acc => {
            acc.addEventListener('click', () => {
                acc.nextElementSibling.classList.toggle('open');
            });
        });

        // Form Validation
        document.getElementById('myForm').addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Form submitted successfully!');
        });