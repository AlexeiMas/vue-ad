<template>
  <v-container>
    <v-row v-if="!loading && myAds.length !== 0">
      <v-col cols="12" sm="6" offset-sm="3">
        <h1 class="text--secondary mb-3">My ads</h1>
        <v-card class="elevation-10 mb-3" v-for="ad in myAds" :key="ad.id">
          <v-row>
            <v-col cols="4">
              <v-img :src="ad.imageSrc" height="160px"/>
            </v-col>
            <v-col cols="8">
              <v-card-text>
                <h2 class="text--primary">{{ad.title}}</h2>
                <p>{{ad.description}}</p>
              </v-card-text>
              <v-card-actions>
                <v-spacer/>
                <v-btn class="info" :to="'/ad/' + ad.id">Open</v-btn>
              </v-card-actions>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    <v-row v-else-if="!loading && myAds.length === 0">
      <v-col class="text-center">
        <h1 class="text--primary">You have no ads</h1>
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col class="text-center">
        <v-progress-circular
          :size="100"
          :width="4"
          color="purple"
          indeterminate
        ></v-progress-circular>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  computed: {
    myAds () {
      return this.$store.getters.myAds
    },
    loading () {
      return this.$store.getters.loading
    }
  }
}
</script>
