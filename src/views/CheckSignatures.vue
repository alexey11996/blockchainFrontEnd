<template>
  <v-container fill-height fluid grid-list-xl>
    <FlashMessage></FlashMessage>
    <v-layout justify-center wrap>
      <v-flex xs12 md8>
        <material-card
          color="green"
          title="Проверка наличия всех подписей для указанного документа"
          text="Заполните указанные поля"
        >
          <v-form>
            <v-container py-0>
              <v-layout wrap>
                <v-flex xs12>
                  <p class="text-info">Выберите документ для проверки</p>
                  <input type="file" name="document" id="document" @change="updateDocument">
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
  name: "CheckSignatures",
  data() {
    return {};
  },
  methods: {
    updateDocument(e) {
      if (e.target.files[0]) {
        var bodyFormData = new FormData();
        bodyFormData.append("document", e.target.files[0]);
        axios
          .post(
            `http://${config.HOST}/myroutes/checksignatures`,
            bodyFormData,
            {
              headers: { "Content-Type": "multipart/form-data" }
            }
          )
          .then(res => {
            if (res.data.hasOwnProperty("msg")) {
              this.flashMessage.error({
                title: "Что-то пошло не так",
                message: res.data.msg
              });
              document.getElementById("document").value = "";
            } else {
              console.log(res);
              this.flashMessage.success({
                title: "Проверка завершена",
                message: res.data.message
              });
              this.email = "";
              document.getElementById("document").value = "";
            }
          });
      }
    }
  }
};
</script>
