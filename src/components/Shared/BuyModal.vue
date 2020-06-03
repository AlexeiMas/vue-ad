<template>
  <v-dialog width="500px" v-model="modal">
    <template v-slot:activator="{ on }">
      <v-btn class="primary" v-on="on">Buy</v-btn>
    </template>

    <v-card>
      <v-container>
        <v-row>
          <v-col>
            <v-card-title>
              <h1 class="text--primary">Do you want to buy it?</h1>
            </v-card-title>
          </v-col>
        </v-row>
        <v-divider/>
        <v-row>
          <v-col>
            <v-card-text>
              <v-text-field
                label="Your name"
                name="name"
                type="text"
                v-model="yourName"
              ></v-text-field>
              <v-textarea
                label="Your phone"
                name="phone"
                type="text"
                v-model="yourPhone"
              ></v-textarea>
            </v-card-text>
          </v-col>
        </v-row>
        <v-divider/>
        <v-row>
          <v-col>
            <v-card-actions>
              <v-spacer/>
              <v-btn
                @click="onCancel"
                :disabled="localLoading"
              >Cancel</v-btn>
              <v-btn
                class="success"
                @click="onSave"
                :loading="localLoading"
              >Buy it!</v-btn>
            </v-card-actions>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ['ad'],
  data () {
    return {
      modal: false,
      yourName: '',
      yourPhone: '',
      localLoading: false
    }
  },
  methods: {
    onCancel () {
      this.modal = false
      this.yourName = ''
      this.yourPhone = ''
      this.localLoading = false
    },
    onSave () {
      if (this.yourName !== '' && this.yourPhone !== '') {
        this.localLoading = true
        this.$store.dispatch('createOrder', {
          name: this.yourName,
          phone: this.yourPhone,
          adId: this.ad.id,
          ownerId: this.ad.ownerId
        })
          .finally(() => {
            this.yourName = ''
            this.yourPhone = ''
            this.localLoading = false
            this.modal = false
          })
      }
    }
  }
}
</script>

<style scoped>

</style>
