<template>
  <v-container fill-height fluid grid-list-xl>
    <FlashMessage></FlashMessage>
    <v-layout justify-center wrap>
      <v-flex xs12 md8>
        <material-card
          color="green"
          title="Проверка документа на подлинность"
          text="Заполните указанные поля"
        >
          <v-form @submit="formSubmit" v-model="valid">
            <v-container py-0>
              <v-layout wrap>
                <v-flex xs12>
                  <p
                    class="text-info"
                  >Введите email пользователя, который подписывал интересующий вас документ.</p>
                  <v-text-field
                    v-model="email"
                    :rules="emailRules"
                    label="Email Address"
                    required
                    clearable
                    class="purple-input"
                  />
                </v-flex>
                <v-flex xs12>
                  <p class="text-info">Выберите документ для проверки</p>
                  <input type="file" name="document" id="document" @change="updateDocument">
                </v-flex>
                <v-flex xs12 text-xs-right>
                  <v-btn
                    type="submit"
                    :disabled="valid == false || validDocFile == false"
                    class="mx-0 font-weight-light"
                    color="success"
                  >Проверить документ</v-btn>
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
  name: "IsDocTrue",
  data() {
    return {
      validDocFile: false,
      docFile: {},
      valid: false,
      email: "",
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+/.test(v) || "E-mail must be valid"
      ]
    };
  },
  methods: {
    updateDocument(e) {
      if (e.target.files[0]) {
        this.docFile = e.target.files[0];
        this.validDocFile = true;
      } else {
        this.validDocFile = false;
      }
    },
    formSubmit(e) {
      e.preventDefault();
      var bodyFormData = new FormData();
      bodyFormData.set("email", this.email);
      bodyFormData.append("document", this.docFile);
      axios
        .post("http://localhost:3000/myroutes/isdoctrue", bodyFormData, {
          headers: { "Content-Type": "multipart/form-data" }
        })
        .then(res => {
          if (res.data.hasOwnProperty("msg")) {
            this.flashMessage.error({
              title: "Что-то пошло не так",
              message: res.data.msg
            });
            this.email = "";
            document.getElementById("document").value = "";
          } else {
            this.flashMessage.success({
              title: "Проверка завершена",
              message:
                "Проверяемый документ подлинный и подписан указанным пользователем"
            });
            this.email = "";
            document.getElementById("document").value = "";
          }
        });
    }
  }
};
</script>
