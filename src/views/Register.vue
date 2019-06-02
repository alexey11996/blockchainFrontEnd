<template>
  <v-container fill-height fluid grid-list-xl>
    <FlashMessage></FlashMessage>
    <v-layout justify-center wrap>
      <v-flex xs12 md8>
        <material-card color="green" title="Регистрация в системе" text="Заполните указанный поля">
          <v-form v-if="!emailSent" @submit="formSubmit" v-model="valid">
            <v-container py-0>
              <v-layout wrap>
                <v-flex xs12 md4>
                  <v-text-field
                    v-model="name"
                    :rules="nameRules"
                    :counter="50"
                    label="Name"
                    required
                    clearable
                    class="purple-input"
                  />
                </v-flex>
                <v-flex xs12 md4>
                  <v-text-field
                    v-model="email"
                    :rules="emailRules"
                    label="Email Address"
                    required
                    clearable
                    class="purple-input"
                  />
                </v-flex>
                <v-flex xs12 md4>
                  <v-text-field
                    v-model="phone"
                    :rules="phoneRules"
                    :counter="11"
                    required
                    clearable
                    class="purple-input"
                    label="Mobile Phone"
                    type="number"
                  />
                </v-flex>
                <v-flex xs12 text-xs-right>
                  <v-btn
                    type="submit"
                    :disabled="valid == false"
                    class="mx-0 font-weight-light"
                    color="success"
                  >Зарегистрироваться</v-btn>
                </v-flex>
              </v-layout>
            </v-container>
          </v-form>
          <v-container py-0 v-if="emailSent" v-model="valid">
            <v-layout wrap>
              <v-flex xs12>
                <p
                  class="text-info"
                >На указанный почтовый ящик отправлен код подтверждения. Введите его в форму ниже.</p>
                <v-text-field
                  id="codeField"
                  v-model="enteredCode"
                  :rules="codeRules"
                  required
                  clearable
                  class="purple-input"
                  label="Confrm Code"
                  v-on:input="onCodeChange"
                />
              </v-flex>
            </v-layout>
          </v-container>
        </material-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { saveAs } from "file-saver";
import axios from "axios";
export default {
  name: "Register",
  data() {
    return {
      customMessage: "",
      enteredCode: "",
      emailSent: false,
      code: "",
      valid: false,
      name: "",
      nameRules: [
        v => !!v || "Name is required",
        v => v.length <= 50 || "Name must be less than 50 characters"
      ],
      email: "",
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+/.test(v) || "E-mail must be valid"
      ],
      phone: "",
      phoneRules: [
        v => !!v || "Phone is required",
        v => /^\d{11}$/.test(v) || "Phone must be 11 digits"
      ],
      codeRules: [v => (!!v && v) === this.code || "Wrong code"]
    };
  },
  methods: {
    onCodeChange() {
      if (this.code == this.enteredCode) {
        axios
          .post("http://localhost:3000/myroutes/register", {
            mobilePhone: this.phone,
            email: this.email,
            fio: this.name
          })
          .then(res => {
            if (res.data.hasOwnProperty("msg")) {
              this.flashMessage.error({
                title: "Что-то пошло не так",
                message: res.data.msg
              });
              this.emailSent = false;
            } else {
              var content =
                res.data.privateKey + "~12345~" + res.data.publicKey;
              var filename = "key.pem";

              var blob = new Blob([content], {
                type: "text/plain;charset=utf-8"
              });

              saveAs(blob, filename);
              this.emailSent = false;
              this.email = "";
              this.phone = "";
              this.name = "";
              this.flashMessage.success({
                title: "Регистрация прошла успешно",
                message:
                  "Скачивание файла ключей начнется в течение нескольких секунд"
              });
            }
          })
          .catch(err => console.log(err));
      }
    },
    formSubmit(e) {
      e.preventDefault();
      this.code = Math.random()
        .toString(36)
        .substring(2);
      axios
        .post("http://localhost:3000/myroutes/sendcode", {
          code: this.code,
          recipient: this.email
        })
        .then(() => {
          this.emailSent = true;
        })
        .catch(err => console.log(err));
    }
  }
};
</script>
