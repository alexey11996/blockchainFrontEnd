<template>
  <v-container fill-height fluid grid-list-xl>
    <FlashMessage></FlashMessage>
    <v-layout justify-center wrap>
      <v-flex xs12 md8>
        <material-card
          color="green"
          title="Проверка подлинности подписи"
          text="Заполните указанные поля"
        >
          <v-tabs color="transparent" slider-color="green">
            <v-container class="py-0">
              <v-tab ripple>Использовать публичный ключ</v-tab>
              <v-tab ripple>Использовать email</v-tab>
            </v-container>
            <v-tab-item>
              <v-card flat>
                <v-form @submit="formSubmitWithPublicKey">
                  <v-container py-0>
                    <v-layout wrap>
                      <v-flex class="mt-2" xs12>
                        <p class="text-info">Выберите файл, содержащий публичный ключ</p>
                        <input type="file" name="keyFile" id="keyFile" @change="updateKeyFile">
                      </v-flex>
                      <v-flex xs12>
                        <p class="text-info">Выберите документ для проверки</p>
                        <input
                          type="file"
                          name="document1"
                          id="document1"
                          @change="updateDocument1"
                        >
                      </v-flex>
                      <v-flex xs12 text-xs-right>
                        <v-btn
                          type="submit"
                          :disabled="validDocFile1 == false || validKeyFile == false"
                          class="mx-0 font-weight-light"
                          color="success"
                        >Проверить подпись</v-btn>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-form>
              </v-card>
            </v-tab-item>
            <v-tab-item>
              <v-card flat>
                <v-form @submit="formSubmitWithEmail" v-model="valid">
                  <v-container py-0>
                    <v-layout wrap>
                      <v-flex class="mt-2" xs12>
                        <p
                          class="text-info"
                        >Введите email, по которому будет производиться поиск и проверка подписи</p>
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
                        <input
                          type="file"
                          name="document2"
                          id="document2"
                          @change="updateDocument2"
                        >
                      </v-flex>
                      <v-flex xs12 text-xs-right>
                        <v-btn
                          type="submit"
                          :disabled="validDocFile2 == false || valid == false"
                          class="mx-0 font-weight-light"
                          color="success"
                        >Проверить подпись</v-btn>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-form>
              </v-card>
            </v-tab-item>
          </v-tabs>
        </material-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  name: "CheckSign",
  data() {
    return {
      validDocFile1: false,
      validDocFile2: false,
      validKeyFile: false,
      publicKey: "",
      docFile1: {},
      docFile2: {},
      email: "",
      valid: false,
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+/.test(v) || "E-mail must be valid"
      ]
    };
  },
  methods: {
    updateKeyFile: function(e) {
      if (e.target.files[0]) {
        const reader = new FileReader();
        var file = e.target.files[0];
        reader.onload = e => {
          this.publicKey = e.target.result;
          if (!this.publicKey.includes("-----BEGIN PUBLIC KEY-----")) {
            this.validKeyFile = false;
            this.flashMessage.error({
              title: "Что-то пошло не так",
              message:
                "Выбранный файл с публичным ключом имеет некорректную структуру. Попробуйте другой"
            });
          }
        };
        reader.readAsText(file);
        this.validKeyFile = true;
      } else {
        this.validKeyFile = false;
      }
    },
    updateDocument1: function(e) {
      if (e.target.files[0]) {
        this.docFile1 = e.target.files[0];
        this.validDocFile1 = true;
      } else {
        this.validDocFile1 = false;
      }
    },
    updateDocument2: function(e) {
      if (e.target.files[0]) {
        this.docFile2 = e.target.files[0];
        this.validDocFile2 = true;
      } else {
        this.validDocFile2 = false;
      }
    },
    formSubmitWithPublicKey(e) {
      e.preventDefault();
      var bodyFormData = new FormData();
      bodyFormData.set("publicKey", this.publicKey);
      bodyFormData.append("document", this.docFile1);
      axios
        .post("http://localhost:3000/myroutes/checkmysignature", bodyFormData, {
          headers: { "Content-Type": "multipart/form-data" }
        })
        .then(res => {
          if (res.data.hasOwnProperty("msg")) {
            this.flashMessage.error({
              title: "Что-то пошло не так",
              message: res.data.msg
            });
          } else if (res.data.check_status == true) {
            this.flashMessage.success({
              title: "Проверка завершена",
              message: "Обнаружена валидная подпись документа"
            });
            document.getElementById("keyFile").value = "";
            document.getElementById("document1").value = "";
          } else if (res.data.check_status == false) {
            this.flashMessage.success({
              title: "Проверка завершена",
              message: "Валидная подпись документа не обнаружена"
            });
            document.getElementById("keyFile").value = "";
            document.getElementById("document1").value = "";
          }
        });
    },
    formSubmitWithEmail(e) {
      e.preventDefault();
      var bodyFormData = new FormData();
      bodyFormData.set("email", this.email);
      bodyFormData.append("document", this.docFile2);
      axios
        .post("http://localhost:3000/myroutes/checksignature", bodyFormData, {
          headers: { "Content-Type": "multipart/form-data" }
        })
        .then(res => {
          if (res.data.hasOwnProperty("msg")) {
            this.flashMessage.error({
              title: "Что-то пошло не так",
              message: res.data.msg
            });
          } else if (res.data.check_status == true) {
            this.flashMessage.success({
              title: "Проверка завершена",
              message: "Обнаружена валидная подпись документа"
            });
            this.email = "";
            document.getElementById("document2").value = "";
          } else if (res.data.check_status == false) {
            this.flashMessage.success({
              title: "Проверка завершена",
              message: "Валидная подпись документа не обнаружена"
            });
            this.email = "";
            document.getElementById("document2").value = "";
          }
        });
    }
  }
};
</script>
