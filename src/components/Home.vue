<template>
  <div v-if="!loading">
    <v-container fluid>
      <v-row dense>
        <v-col xs12>
            <v-carousel cycle interval="10000">
              <v-carousel-item
                v-for="ad in promoAds"
                :key="ad.id"
                :src="ad.imageSrc"
              >
                <div class="detail-info">
                  <v-btn class="error" :to="'/ad/'+ ad.id">{{ad.title}}</v-btn>
                </div>
              </v-carousel-item>
            </v-carousel>
        </v-col>
      </v-row>
    </v-container>
    <v-container>
      <v-row dense>
        <v-col
          v-for="ad of ads"
          :key="ad.id"
        >
          <v-card class="mx-auto" max-width="400">
            <v-img
              class="white--text align-end"
              height="200px"
              :src="ad.imageSrc"
            />
            <v-card-title class="pb-0">{{ad.title}}</v-card-title>
            <v-card-text class="text--primary">
              <div>{{ad.description}}</div>
            </v-card-text>

            <v-card-actions>
              <v-spacer/>
              <v-btn text :to="'/ad/' + ad.id">Open</v-btn>
              <app-buy-modal :ad="ad" />
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
  <div v-else>
    <v-container>
      <v-row>
        <v-col class="text-center pt-5">
          <v-progress-circular
            :size="100"
            :width="4"
            color="purple"
            indeterminate
          ></v-progress-circular>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  computed: {
    promoAds () {
      return this.$store.getters.promoAds
    },
    ads () {
      return this.$store.getters.ads
    },
    loading () {
      return this.$store.getters.loading
    }
  }
}
</script>

<style scoped lang="sass">
  .detail-info
    position: absolute
    bottom: 50px
    left: 50%
    background: rgba(0, 0, 0, .3)
    transform: translate(-50%, 0)
    padding: 5px 15px
    border-top-left-radius: 5px
    border-top-right-radius: 5px
</style>
