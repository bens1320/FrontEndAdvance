function ajax(){
  return new Promise((resolve, reject) => {
    reject({
      response: {
        status: 403
      }
    })
    // resolve({
    //   date:{name: 'Jonathan Ben'}
    // })
  })
}

const error = (e) => {
  console.log(e)
  console.log('提示用户没有权限')
  throw e
}

async function fn(){
  const response = await ajax().then(null, error)
  console.log(response)
}

fn()