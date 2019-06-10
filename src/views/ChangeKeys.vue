<template>
  <v-container fill-height fluid grid-list-xl>
    <FlashMessage></FlashMessage>
    <v-layout justify-center wrap>
      <v-flex xs12 md8>
        <material-card color="green" title="Смена пары ключей" text="Заполните указанные поля">
          <v-container py-0>
            <v-layout wrap>
              <v-flex xs12>
                <p
                  class="text-info"
                >Выберите файл, содержащий текущую пару ключей. Если файл валиден, то скачивание новой пары ключей начнется автоматически.</p>
                <input type="file" name="kfile" id="kfile" @change="updateFile">
              </v-flex>
              <v-flex xs12 text-xs-right></v-flex>
            </v-layout>
          </v-container>
        </material-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from "axios";
import config from "./config";
import { saveAs } from "file-saver";
export default {
  name: "ChangeKeys",
  data() {
    return {
      privateKey: "",
      publicKey: ""
    };
  },
  methods: {
    updateFile: function(e) {
      if (e.target.files[0]) {
        const reader = new FileReader();
        var file = e.target.files[0];
        reader.onload = e => {
          this.privateKey = e.target.result.split("~12345~")[0];
          this.publicKey = e.target.result.split("~12345~")[1];
          if (this.publicKey == undefined || this.privateKey == undefined) {
            this.flashMessage.error({
              title: "Что-то пошло не так",
              message:
                "Выбранный файл ключей имеет некорректную структуру. Попробуйте другой"
            });
            document.getElementById("kfile").value = "";
          } else {
            axios
              .post(`http://${config.HOST}/myroutes/changekeys`, {
                privateKey: this.privateKey,
                publicKey: this.publicKey
              })
              .then(res => {
                if (res.data.hasOwnProperty("msg")) {
                  this.flashMessage.error({
                    title: "Что-то пошло не так",
                    message: res.data.msg
                  });
                } else {
                  var content =
                    res.data.new_private + "~12345~" + res.data.new_public;
                  var filename = "key.pem";

                  var blob = new Blob([content], {
                    type: "text/plain;charset=utf-8"
                  });

                  saveAs(blob, filename);
                  document.getElementById("kfile").value = "";
                  this.flashMessage.success({
                    title: "Смена ключей прошла успешно",
                    message:
                      "Скачивание файла ключей начнется в течение нескольких секунд"
                  });
                }
              });
          }
        };
        reader.readAsText(file);
      }
    }
  }
};
</script>
