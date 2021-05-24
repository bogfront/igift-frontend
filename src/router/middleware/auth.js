export default async function auth ({ next, store }){
  if (!store.getters.auth.loggedIn) {
    await store.dispatch('loadUser');
  }

  if (!store.getters.auth.loggedIn){
    return next({
      name: 'login'
    })
  }
  return next()
}
