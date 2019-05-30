<template>
  <v-container fill-height fluid grid-list-xl>
    <FlashMessage></FlashMessage>
    <v-layout justify-center wrap>
      <v-flex xs12 md8>
        <material-card
          color="green"
          title="Получение публичного ключа по email"
          text="Заполните указанное поле"
        >
          <v-form @submit="formSubmit" v-model="valid">
            <v-container py-0>
              <v-layout wrap>
                <v-flex xs12>
                  <v-text-field
                    v-model="email"
                    :rules="emailRules"
                    label="Email Address"
                    required
                    clearable
                    class="purple-input"
                  />
                </v-flex>

                <v-flex xs12 text-xs-right>
                  <v-btn
                    type="submit"
                    :disabled="valid == false"
                    class="mx-0 font-weight-light"
                    color="success"
                  >Узнать публичный ключ</v-btn>
                </v-flex>
              </v-layout>
            </v-container>
          </v-form>
        </material-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  name: "GetMyPublic",
  data() {
    return {
      valid: false,
      email: "",
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+/.test(v) || "E-mail must be valid"
      ]
    };
  },
  methods: {
    formSubmit(e) {
      e.preventDefault();
    }
  }
};
</script>
