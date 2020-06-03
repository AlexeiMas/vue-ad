<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="6" offset-sm="3">
        <h1>Create new ad</h1>
        <v-form ref="form" v-model="valid" validation>
          <v-text-field
            label="Ad title"
            name="title"
            type="text"
            v-model="title"
            :rules="[v => !!v || 'Title is required']"
          ></v-text-field>

          <v-textarea
            label="Ad description"
            name="description"
            type="text"
            v-model="description"
            :rules="[v => !!v || 'Description is required']"
          ></v-textarea>
        </v-form>
        <v-row>
          <v-col cols="12">
            <v-btn class="warning" @click="triggerUpload">
              Upload
              <v-icon right dark>mdi-cloud-upload</v-icon>
            </v-btn>
            <input
              ref="fileInput"
              type="file"
              style="display: none"
              accept="image/*"
              @change="onFileChange"
            >
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <img :src="imageSrc" alt="" height="100" v-if="imageSrc">
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-switch
              v-model="promo"
              label="Add to promo?"
            ></v-switch>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-spacer/>
            <v-btn
              :loading="loading"
              :disabled="!valid || !image || loading"
              class="success"
              @click="createAd"
            >Create ad</v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      title: '',
      description: '',
      promo: false,
      valid: false,
      image: null,
      imageSrc: ''
    }
  },
  computed: {
    loading () {
      return this.$store.getters.loading
    }
  },
  methods: {
    createAd () {
      if (this.$refs.form.validate() && this.image) {
        const ad = {
          title: this.title,
          description: this.description,
          promo: this.promo,
          image: this.image
        }

        this.$store.dispatch('createAd', ad)
          .then(() => {
            this.$router.push('/list')
          })
          .catch(() => {})
      }
    },
    triggerUpload () {
      this.$refs.fileInput.click()
    },
    onFileChange (event) {
      const file = event.target.files[0]
      const reader = new FileReader()
      reader.onload = e => {
        this.imageSrc = reader.result
      }
      reader.readAsDataURL(file)
      this.image = file
    }
  }
}
</script>
