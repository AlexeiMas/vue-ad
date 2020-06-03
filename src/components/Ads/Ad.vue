<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card v-if="!loading">
          <v-img
            :src="ad.imageSrc"
            height="300px"
          ></v-img>
          <v-card-text>
            <h1 class="text--primary">{{ad.title}}</h1>
            <p>{{ad.description}}</p>
          </v-card-text>
          <v-card-actions>
            <v-spacer/>
            <app-edit-ad-modal :ad="ad" v-if="isOwner"></app-edit-ad-modal>
            <app-buy-modal :ad="ad" />
          </v-card-actions>
        </v-card>
        <div v-else class="text-center">
          <v-progress-circular
            :size="100"
            :width="4"
            color="purple"
            indeterminate
          />
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import EditAdModal from './EditAdModal'

export default {
  props: ['id'],
  computed: {
    ad () {
      const id = this.id
      return this.$store.getters.adById(id)
    },
    loading () {
      return this.$store.getters.loading
    },
    isOwner () {
      return this.ad.ownerId === this.$store.getters.user.id
    }
  },
  components: {
    appEditAdModal: EditAdModal
  }
}
</script>
