function saveBucket(bucket, pwd){
  var bucketList;
  if(localStorage.getItem("buckets")==undefined){
    bucketList = {}
  }
  else{
    bucketList = JSON.parse(localStorage.getItem("buckets"))
  }
  bucketList[bucket] = pwd
  localStorage.setItem("buckets",JSON.stringify(bucketList))
}

function removeBucket(bucket){
  var bucketList = JSON.parse(localStorage.getItem("buckets"))
  delete bucketList[bucket]
  localStorage.setItem("buckets",JSON.stringify(bucketList))
}

export { saveBucket, removeBucket }