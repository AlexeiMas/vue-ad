<template>
  <v-container>
    <v-row>
      <v-col class="text-center pt-5" v-if="loading">
        <v-progress-circular
          :size="100"
          :width="4"
          color="purple"
          indeterminate
        />
      </v-col>
      <v-col xs="12" sm="6" offset-sm="3" v-else-if="!loading && orders.length !== 0">
        <h1 class="text--secondary">Orders</h1>
        <v-list-item-group>
          <v-list-item
            v-for="order in orders"
            :key="order.id"
          >
            <template>
              <v-list-item-action>
                <v-checkbox
                  color="primary"
                  :input-value="order.done"
                  @change="markDone(order)"
                ></v-checkbox>
              </v-list-item-action>

              <v-list-item-content>
                <v-list-item-title>{{order.name}}</v-list-item-title>
                <v-list-item-subtitle>{{order.phone}}</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action>
                <v-btn
                  class="primary"
                  :to="'/ad/' + order.adId"
                >Open</v-btn>
              </v-list-item-action>
            </template>
          </v-list-item>
        </v-list-item-group>
      </v-col>
      <v-col class="text-center" v-else>
        <h1 class="text--secondary">You don't have any orders</h1>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  computed: {
    loading () {
      return this.$store.getters.loading
    },
    orders () {
      return this.$store.getters.orders
    }
  },
  methods: {
    markDone (order) {
      this.$store.dispatch('markOrderDone', order.id)
        .then(() => {
          order.done = true
        })
        .catch(() => {})
    }
  },
  created () {
    this.$store.dispatch('fetchOrders')
  }
}
</script>
