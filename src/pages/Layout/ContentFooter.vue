<template>
  <footer class="footer">
    <div class="container">
        <nav>
            <ul>
              <li>
                <router-link :to="{path:'/dashboard'}">Home</router-link>
              </li>
                <li>
                    <a href="#">
                        Company
                    </a>
                </li>
                <li>
                    <a href="#">
                        Portfolio
                    </a>
                </li>
                <li>
                    <a href="#">
                        Blog
                    </a>
                </li>
            </ul>
        </nav>
        <div class="copyright text-center">
          &copy;  <a href="javascript:void(0);">ConquisAMCH</a>, made with <i class="fa fa-heart heart"></i> for Conquistadores
        </div>
    </div>
  </footer>

</template>
<script>
export default {}

</script>
<style>

</style>
