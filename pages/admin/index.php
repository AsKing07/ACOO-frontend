<!-- Vérifier si user existe dans le localStorage sinon rediriger vers login -->


<script>
  const user = localStorage.getItem('user');
  if (user) {
    window.location.href = '/pages/admin/dashboard.php';
  } else {
    window.location.href = '/pages/admin/auth/login.php';
  }
</script>