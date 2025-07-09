document.getElementById('select_nav').addEventListener('change', function () {
  const target = this.value;
  if (target) {
    const section = document.getElementById(target);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  }
});