// 1. Event Handling
  const clickBtn = document.getElementById('eventClickBtn');
  const clickMsg = document.getElementById('eventClickMsg');
  clickBtn.addEventListener('click', () => {
    clickMsg.textContent = 'Button was clicked!';
  });

  const hoverBox = document.getElementById('hoverBox');
  const hoverMsg = document.getElementById('hoverMsg');
  hoverBox.addEventListener('mouseover', () => {
    hoverBox.style.backgroundColor = '#ff7043';
    hoverMsg.textContent = 'Hovering over the box!';
  });
  hoverBox.addEventListener('mouseout', () => {
    hoverBox.style.backgroundColor = '#4db6ac';
    hoverMsg.textContent = '';
  });

  const keypressInput = document.getElementById('keypressInput');
  const keypressMsg = document.getElementById('keypressMsg');
  keypressInput.addEventListener('keypress', (event) => {
    keypressMsg.textContent = `You pressed: "${event.key}"`;
  });

  // Bonus: Double click and long press for hoverBox
  let longPressTimer;
  hoverBox.addEventListener('dblclick', () => {
    alert('You double clicked the box! 🎉');
  });
  hoverBox.addEventListener('mousedown', () => {
    longPressTimer = setTimeout(() => {
      alert('Long press detected! 🚀');
    }, 1000);
  });
  hoverBox.addEventListener('mouseup', () => {
    clearTimeout(longPressTimer);
  });
  hoverBox.addEventListener('mouseleave', () => {
    clearTimeout(longPressTimer);
  });

  // 2. Interactive Elements

  // Button changing text/color
  const changeTextBtn = document.getElementById('changeTextBtn');
  changeTextBtn.addEventListener('click', function() {
    this.textContent = 'Text Changed!';
    this.style.backgroundColor = '#ff9800';
  });

  // Image gallery
  const images = [
    "https://picsum.photos/320/180?random=1",
    "https://picsum.photos/320/180?random=2",
    "https://picsum.photos/320/180?random=3",
    "https://picsum.photos/320/180?random=4"
  ];
  let currentIndex = 0;
  const galleryImage = document.getElementById('galleryImage');
  const nextImageBtn = document.getElementById('nextImageBtn');

  nextImageBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % images.length;
    galleryImage.style.opacity = 0;
    setTimeout(() => {
      galleryImage.src = images[currentIndex];
      galleryImage.style.opacity = 1;
    }, 300);
  });

  // Tabs functionality
  const tabs = document.querySelectorAll('.tab');
  const tabContents = [
    document.getElementById('tab1panel'),
    document.getElementById('tab2panel'),
    document.getElementById('tab3panel')
  ];
  tabs.forEach((tab, i) => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
        t.setAttribute('tabindex', '-1');
      });
      tabContents.forEach(c => {
        c.style.display = 'none';
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      tab.setAttribute('tabindex', '0');
      tabContents[i].style.display = 'block';
      tab.focus();
    });
    tab.addEventListener('keydown', e => {
      if(e.key === 'ArrowRight' || e.key === 'ArrowLeft'){
        let newIndex = (i + (e.key === 'ArrowRight' ? 1 : tabs.length -1 )) % tabs.length;
        tabs[newIndex].click();
      }
    });
  });

  // Accordion functionality
  const accordions = document.querySelectorAll('.accordion');
  accordions.forEach(acc => {
    acc.addEventListener('click', () => {
      const isExpanded = acc.getAttribute('aria-expanded') === 'true';
      // Close all accordions
      accordions.forEach(a => {
        a.setAttribute('aria-expanded', 'false');
        document.getElementById(a.getAttribute('aria-controls')).classList.remove('open');
      });
      // Toggle the clicked one
      if (!isExpanded) {
        acc.setAttribute('aria-expanded', 'true');
        document.getElementById(acc.getAttribute('aria-controls')).classList.add('open');
      }
    });
  });

  // 3. Form Validation
  const form = document.getElementById('myForm');
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');

  const nameFeedback = document.getElementById('nameFeedback');
  const emailFeedback = document.getElementById('emailFeedback');
  const passwordFeedback = document.getElementById('passwordFeedback');

  const formMessage = document.getElementById('formMessage');

  // Real-time validation
  function validateName() {
    if(nameInput.value.trim().length === 0){
      nameInput.classList.add('error');
      nameFeedback.textContent = 'Name is required.';
      nameFeedback.classList.remove('valid');
      return false;
    } else {
      nameInput.classList.remove('error');
      nameFeedback.textContent = 'Looks good!';
      nameFeedback.classList.add('valid');
      return true;
    }
  }
  function validateEmail() {
    const email = emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(email.length === 0){
      emailInput.classList.add('error');
      emailFeedback.textContent = 'Email is required.';
      emailFeedback.classList.remove('valid');
      return false;
    } else if(!emailRegex.test(email)){
      emailInput.classList.add('error');
      emailFeedback.textContent = 'Email format is invalid.';
      emailFeedback.classList.remove('valid');
      return false;
    } else {
      emailInput.classList.remove('error');
      emailFeedback.textContent = 'Email looks good!';
      emailFeedback.classList.add('valid');
      return true;
    }
  }
  function validatePassword() {
    const pass = passwordInput.value;
    if(pass.length === 0){
      passwordInput.classList.add('error');
      passwordFeedback.textContent = 'Password is required.';
      passwordFeedback.classList.remove('valid');
      return false;
    } else if(pass.length < 8) {
      passwordInput.classList.add('error');
      passwordFeedback.textContent = 'Password must be at least 8 characters.';
      passwordFeedback.classList.remove('valid');
      return false;
    } else {
      passwordInput.classList.remove('error');
      passwordFeedback.textContent = 'Password strength good.';
      passwordFeedback.classList.add('valid');
      return true;
    }
  }

  nameInput.addEventListener('input', validateName);
  emailInput.addEventListener('input', validateEmail);
  passwordInput.addEventListener('input', validatePassword);

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const validName = validateName();
    const validEmail = validateEmail();
    const validPassword = validatePassword();
    if(validName && validEmail && validPassword) {
      formMessage.style.color = "#4caf50";
      formMessage.textContent = "Form submitted successfully! 🎉";
      form.reset();
      nameFeedback.textContent = '';
      emailFeedback.textContent = '';
      passwordFeedback.textContent = '';
    } else {
      formMessage.style.color = "#f44336";
      formMessage.textContent = "Please fix the errors above before submitting.";
    }
  });