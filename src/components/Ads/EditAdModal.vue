<template>
  <v-dialog width="400px" v-model="modal">
    <template v-slot:activator="{ on }">
      <v-btn class="warning mr-2" tile outlined v-on="on">
        <v-icon left>mdi-pencil</v-icon> Edit
      </v-btn>
    </template>

    <v-card>
      <v-container>
        <v-row>
          <v-col>
            <v-card-title>
              <h1 class="text--primary">Edit it</h1>
            </v-card-title>
          </v-col>
        </v-row>
        <v-divider/>
        <v-row>
          <v-col>
            <v-card-text>
              <v-text-field
                label="Title"
                name="title"
                type="text"
                v-model="editedTitle"
              ></v-text-field>
              <v-textarea
                label="Description"
                name="description"
                type="text"
                v-model="editedDescription"
              ></v-textarea>
            </v-card-text>
          </v-col>
        </v-row>
        <v-divider/>
        <v-row>
          <v-col>
            <v-card-actions>
              <v-spacer/>
              <v-btn @click="onCancel">Cancel</v-btn>
              <v-btn class="success" @click="onSave">Save</v-btn>
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
      editedTitle: this.ad.title,
      editedDescription: this.ad.description
    }
  },
  methods: {
    onCancel () {
      this.editedDescription = this.ad.description
      this.editedTitle = this.ad.title
      this.modal = false
    },
    onSave () {
      if (this.editedDescription !== '' && this.editedTitle !== '') {
        this.$store.dispatch('updateAd', {
          title: this.editedTitle,
          description: this.editedDescription,
          id: this.ad.id
        })
        this.modal = false
      }
    }
  }
}
</script>
