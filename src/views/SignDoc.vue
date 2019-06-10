<template>
  <v-container fill-height fluid grid-list-xl>
    <FlashMessage></FlashMessage>
    <v-layout justify-center wrap>
      <v-flex xs12 md8>
        <material-card
          color="green"
          title="Подпись нового документа"
          text="Заполните указанные поля"
        >
          <v-form @submit="formSubmit">
            <v-container py-0>
              <v-layout wrap>
                <v-flex xs12>
                  <p
                    class="text-info"
                  >Введите почтовые адреса подписантов через Enter. Допускается минимум 2 участника.</p>
                  <v-combobox
                    multiple
                    v-model="emails"
                    color="purple"
                    label="Signer's emails"
                    chips
                    deletable-chips
                  ></v-combobox>
                </v-flex>
                <v-flex xs12>
                  <p class="text-info">Выберите документ для подписи</p>
                  <input type="file" name="document" id="document" @change="updateDocument">
                </v-flex>
                <v-flex xs12>
                  <p class="text-info">Выберите файл ключей для подписи</p>
                  <input type="file" name="keyfile" id="keyfile" @change="updateKeyFile">
                </v-flex>
                <v-flex xs12 text-xs-right>
                  <v-btn
                    type="submit"
                    :disabled="emails.length < 2 || validDocFile == false || validKeyFile == false"
                    class="mx-0 font-weight-light"
                    color="success"
                  >Подтвердить подпись</v-btn>
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
import config from "./config";
export default {
  name: "SignDoc",
  data() {
    return {
      privateKey: "",
      validDocFile: false,
      validKeyFile: false,
      publicKey: "",
      docFile: {},
      emails: []
    };
  },
  created: function() {
    if (this.$route.query.emails != undefined) {
      this.emails = this.$route.query.emails.split(",");
    }
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
    updateKeyFile(e) {
      if (e.target.files[0]) {
        const reader = new FileReader();
        var file = e.target.files[0];
        reader.onload = e => {
          this.privateKey = e.target.result.split("~12345~")[0];
          this.publicKey = e.target.result.split("~12345~")[1];
          if (this.publicKey == undefined || this.privateKey == undefined) {
            this.validKeyFile = false;
            this.flashMessage.error({
              title: "Что-то пошло не так",
              message:
                "Выбранный файл ключей имеет некорректную структуру. Попробуйте другой"
            });
          }
        };
        reader.readAsText(file);
        this.validKeyFile = true;
      } else {
        this.validKeyFile = false;
      }
    },
    formSubmit(e) {
      e.preventDefault();
      var bodyFormData = new FormData();
      bodyFormData.set("publicKey", this.publicKey);
      bodyFormData.set("privateKey", this.privateKey);
      bodyFormData.set("signers", this.emails.join());
      bodyFormData.append("document", this.docFile);
      axios
        .post(`http://${config.HOST}/myroutes/signdoc`, bodyFormData, {
          headers: { "Content-Type": "multipart/form-data" }
        })
        .then(res => {
          if (res.data.hasOwnProperty("msg")) {
            this.flashMessage.error({
              title: "Что-то пошло не так",
              message: res.data.msg
            });
          } else {
            this.flashMessage.success({
              title: "Подпись документа завершена",
              message:
                "Уведомление о данном событии будет разослано всем участникам подписания"
            });
            this.emails = [];
            document.getElementById("document").value = "";
            document.getElementById("keyfile").value = "";
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>
