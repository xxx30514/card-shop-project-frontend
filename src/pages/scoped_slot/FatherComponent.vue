<template>
  <div id="father">
    <h1>父組件</h1>
    <div class="content">
      <GameComponent>
        <template v-slot="params">
          <ul>
            <li v-for="item in params.gameList" :key="item.id">{{ item.name }}</li>
          </ul>
        </template>
      </GameComponent>
      <GameComponent>
        <template #default="params">
          <ol>
            <li v-for="item in params.gameList" :key="item.id">{{ item.name }}</li>
          </ol>
        </template>
      </GameComponent>
      <GameComponent>
        <!--解構-->
        <template v-slot="{ gameList }">
          <h5 v-for="item in gameList" :key="item.id">{{ item.name }}</h5>
        </template>
      </GameComponent>
    </div>
  </div>
</template>

<script setup lang="ts">
import GameComponent from './GameComponent.vue';
</script>
<style scoped>
#father {
  background-color: lightgray;
  padding: 20px;
  box-shadow: 0 0 10px black;
  border-radius: 10px;
}
.content {
  display: flex;
  justify-content: space-evenly;
}
h5 {
  margin: 10px;
}
</style>
