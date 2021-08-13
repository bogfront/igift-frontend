export default async function auth ({ next, store }){
  if (!store.getters.isAuth) {
    await store.dispatch('loadUser');
  }

  if (!store.getters.isAuth){
    return next({
      name: 'auth-main'
    })
  }
  return next()
}
