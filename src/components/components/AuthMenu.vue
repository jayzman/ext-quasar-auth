<template>
  <div>
    <div class="column flex-center">
      <q-icon
        name="person"
        size="3rem"
        class="q-mt-lg"
      />
      <div v-if="$auth.user()">
        {{ $auth.user().email }}
      </div>
    </div>
    <q-list
      no-border
      link
      inset-delimiter
    >
      <q-item
        v-if="!this.$auth.check()"
        clickable
        @click="$router.push('/login')"
      >
      </q-item>
    </q-list>
  </div>
</template>

<script>
export default {
  name: 'AuthMenu',
  data () {
    return {
      lang: {
        auth: {}
      }
    }
  },
  watch: {
    '$q.lang.isoName' (val) {
      this.__setupLang()
    }
  },
  beforeMount () {
    this.__setupLang()
  },
  methods: {
    __setupLang () {
      const isoName = this.$q.lang.isoName || 'en-us'
      let lang
      try {
        lang = require(`ext-quasar-auth/lang/${isoName}`)
      } catch (e) { }

      if (lang !== void 0) {
        this.lang.auth = { ...lang.default.auth }
      }
    }
  }
}
</script>
