<template>
  <v-toolbar id="core-toolbar" flat prominent style="background: #eee;">
    <div class="v-toolbar-title">
      <v-toolbar-title class="tertiary--text font-weight-light">
        <v-btn v-if="responsive" class="default v-btn--simple" dark icon @click.stop="onClickBtn">
          <v-icon>mdi-view-list</v-icon>
        </v-btn>
        {{ title }}
      </v-toolbar-title>
    </div>

    <v-spacer/>
    <v-toolbar-items>
      <v-flex align-center layout py-2>
        <router-link v-ripple class="toolbar-items" to="/">
          <v-icon color="tertiary">mdi-pen</v-icon>
        </router-link>
        <router-link v-ripple class="toolbar-items" to="/register">
          <v-icon color="tertiary">mdi-account</v-icon>
        </router-link>
      </v-flex>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  data: () => ({
    title: null,
    responsive: false,
    responsiveInput: false
  }),
  watch: {
    $route(val) {
      if (val.name == "SignDoc") this.title = "Подпись нового документа";
      if (val.name == "Register")
        this.title = "Регистрация нового пользователя";
      if (val.name == "GetMyPublic")
        this.title = "Получение публичного ключа пользователя";
      if (val.name == "ChangeKeys")
        this.title = "Смена текущей пары ключей пользователя";
      if (val.name == "IsDocTrue")
        this.title = "Проверка подлинности документа";
      if (val.name == "GetDate")
        this.title = "Получение даты подписи документа";
      if (val.name == "CheckSignatures")
        this.title = "Проверка наличия всех подписей документа";
      if (val.name == "CheckSign") this.title = "Проверка подлинности подписи";
    }
  },

  mounted() {
    this.onResponsiveInverted();
    window.addEventListener("resize", this.onResponsiveInverted);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.onResponsiveInverted);
  },

  methods: {
    ...mapMutations("app", ["setDrawer", "toggleDrawer"]),
    onClickBtn() {
      this.setDrawer(!this.$store.state.app.drawer);
    },
    onClick() {
      //
    },
    onResponsiveInverted() {
      if (window.innerWidth < 991) {
        this.responsive = true;
        this.responsiveInput = false;
      } else {
        this.responsive = false;
        this.responsiveInput = true;
      }
    }
  }
};
</script>

<style>
#core-toolbar a {
  text-decoration: none;
}
</style>
