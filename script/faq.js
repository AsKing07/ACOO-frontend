  document.querySelectorAll('.faq__question').forEach(btn => {
    btn.addEventListener('click', function() {
      const expanded = this.getAttribute('aria-expanded') === 'true';
      // Ferme toutes les autres
      document.querySelectorAll('.faq__question').forEach(b => {
        b.setAttribute('aria-expanded', 'false');
        b.querySelector('.faq__icon').textContent = '+';
        b.parentElement.querySelector('.faq__answer').style.maxHeight = null;
      });
      // Ouvre celle-ci si ce n'était pas déjà ouvert
      if (!expanded) {
        this.setAttribute('aria-expanded', 'true');
        this.querySelector('.faq__icon').textContent = '−';
        const answer = this.parentElement.querySelector('.faq__answer');
        answer.style.maxHeight = answer.scrollHeight + "px";
      }
    });
  });
