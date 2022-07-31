
export const getAllCounts = async(userName,repoName)=>{
  return await fetch(`https://api.github.com/repos/${userName}/${repoName}`)
.then((res)=>{
  return res.json()
})
.catch((err)=>{
  console.log(err)
})
}

export const contriSize = async (url) =>{
  return await fetch(url).then((res)=>{
    return res.json()
  })
  .catch((err)=>{
    console.log(err)
  })
}