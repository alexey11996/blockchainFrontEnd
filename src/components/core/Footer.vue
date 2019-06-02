<template>
  <v-footer id="core-footer" absolute height="82">
    <div class="footer-items">
      <span v-for="link in links" :key="link.name">
        <a :href="link.Link" class="tertiary--text footer-links">{{ link.name }}</a>
      </span>
    </div>
    <v-spacer/>
  </v-footer>
</template>

<script>
export default {
  data: () => ({
    links: [
      {
        name: "BlockChain Github Link",
        Link: "https://github.com/alexey11996/swagger_server"
      }
      // { name: "Creative Tim", Link: "https://www.creative-tim.com" },
      // { name: "About Us", Link: "https://creative-tim.com/presentation" },
      // { name: "Blog", Link: "https://blog.creative-tim.com" }
    ]
  })
};
</script>

<style>
#core-footer {
  z-index: 0;
}
</style>
