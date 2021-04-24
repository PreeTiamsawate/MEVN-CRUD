<template>
  <div>
    <!-- Navbar -->
    <nav class="navbar navbar-dark bg-primary justify-content-between flex-nowrap flex-row">
      <div class="container">
        <router-link to="/" class="navbar-brand float-left">MEVN Stack CRUD - Student Record</router-link>
        <ul class="nav navbar-nav flex-row float-right">
          <li class="nav-item">
            <router-link to="/" class="nav-link pr-3" >Create Content</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/view" class="nav-link" >View Contents</router-link>
          </li>
         

        </ul>

      </div>

    </nav>

    <!-- Router View -->
    <div class="container mt-5">
      <router-view></router-view>
    </div>
    
  </div>
</template>
