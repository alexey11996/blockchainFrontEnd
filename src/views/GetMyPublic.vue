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
          <v-form v-if="!multiplePublicKeys" @submit="formSubmit" v-model="valid">
            <v-container py-0>
              <v-layout wrap>
                <v-flex xs12>
                  <p
                    class="text-info"
                  >Введите email, по которому будет производиться поиск публичного ключа. Если он будет найден, то его скачивание начнется автоматически.</p>

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
          <v-data-table :headers="headers" :items="items" v-else>
            <template slot="headerCell" slot-scope="{ header }">
              <span
                class="subheading font-weight-light text-success text--darken-3"
                v-text="header.text"
              />
            </template>
            <template slot="items" slot-scope="{ item }">
              <td>{{ getDateFromTimestamp(item) }}</td>
              <td>
                <v-icon class="pl-5" @click="downloadKey(item)">mdi-download</v-icon>
              </td>
            </template>
          </v-data-table>
        </material-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from "axios";
import { saveAs } from "file-saver";
export default {
  name: "GetMyPublic",
  data() {
    return {
      headers: [
        {
          sortable: false,
          text: "Дата получения",
          value: "date"
        },
        {
          sortable: false,
          text: "Скачать файл",
          value: "action"
        }
      ],
      items: ["Получение при регистрации"],
      keysArr: [],
      valid: false,
      multiplePublicKeys: false,
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
      axios
        .post("http://localhost:3000/myroutes/getmypublic", {
          email: this.email
        })
        .then(res => {
          if (res.data.hasOwnProperty("msg")) {
            this.flashMessage.error({
              title: "Что-то пошло не так",
              message: res.data.msg
            });
          } else if (res.data.hasOwnProperty("publicKey")) {
            var filename = "publicKey.txt";

            var blob = new Blob([res.data.publicKey], {
              type: "text/plain;charset=utf-8"
            });

            saveAs(blob, filename);
            this.flashMessage.success({
              title: "Публичный ключ обнаружен",
              message:
                "Скачивание файла с публичным ключом начнется в течение нескольких секунд"
            });
            this.email = "";
          } else if (res.data.hasOwnProperty("first_public_key")) {
            this.keysArr[0] = res.data.first_public_key;
            var newPubs = JSON.parse(res.data.new_pubs);
            var timestamps = Object.keys(newPubs);
            var publicKeys = Object.values(newPubs);
            this.keysArr = this.keysArr.concat(publicKeys);
            this.items = this.items.concat(timestamps);
          }
        });
    },
    downloadKey(item) {
      var index = this.items.indexOf(item);
      var filename = "publicKey.txt";

      var blob = new Blob([this.keysArr[index]], {
        type: "text/plain;charset=utf-8"
      });

      saveAs(blob, filename);
      this.multiplePublicKeys = false;
    },
    getDateFromTimestamp(timestamp) {
      if (timestamp == "Получение при регистрации") {
        return timestamp;
      } else {
        var date = new Date(parseInt(timestamp));
        return date.toLocaleString();
      }
    }
  }
};
</script>
