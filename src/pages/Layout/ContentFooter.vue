<template>
  <footer class="footer">
    <div class="container">
        <nav>
            <ul>
              <li>
                <router-link :to="{path:'/clubes'}">Clubes</router-link>
              </li>
                <li>
                    <router-link :to="{path:'/eventos'}">Eventos</router-link>
                </li>
                <li>
                    <router-link :to="{path:'/evaluar'}">Evaluar</router-link>
                </li>
                <li>
                    <router-link :to="{path:'/evaluar-offline'}">Evaluar sin conección</router-link>
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
