<template>
  <div id="app">
    <div id="nav" class="bg-green-100">
      <p class="text-xl text-[#41B883] font-bold">
        Cek Ongkir
        <span class="text-[11px]">with Vuejs</span>
      </p>
    </div>
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background: url(https://www.sicepat.com/images/gambar-kota-sicepat.png) center bottom no-repeat;
  background-size: contain;
}

#nav {
  padding: 30px;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 10;
}

#nav a {
  font-weight: bold;
  font-size: 17px;
  padding: 0 10px;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

@media (max-width: 480px) {
  #nav {
    padding: 15px 15px 10px;
  }
  #nav a {
    font-size: 16px;
  }
  #app {
    background-size: cover;
  }
}
</style>
