function 摇色子(){
  return Math.floor(Math.random() * 6 )+ 1
}

async function fn(){
  const result = await 摇色子()
  console.log(result)
}

fn()