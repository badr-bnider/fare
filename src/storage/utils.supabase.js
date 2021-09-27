import { supabase } from './credentials.supabase.js';
import { saveBucket, removeBucket } from './utils.localStorage.js';

function downloadBlob(blob, name = 'file') {
  const blobUrl = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = blobUrl;
  link.download = name;

  document.body.appendChild(link);
  link.dispatchEvent(
    new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      view: window
    })
  );

  // Remove link from body
  document.body.removeChild(link);
}

//function to fetch the files list
async function fetchList() {
  const folderName = supabase.auth.user().id
  var { data, error } = await supabase
    .storage
    .from('files')
    .list(folderName)
  return data;
}

async function downloadFile(file) {
  const fileName = supabase.auth.user().id + "/" + file
  const { data, error } = await supabase
    .storage
    .from('files')
    .download(fileName)
  downloadBlob(data, file)
}

async function removeFile(file) {
  const fileName = supabase.auth.user().id + "/" + file
  const { data, error } = await supabase.storage
    .from('files')
    .remove([fileName])
}

async function uploadFile(e) {
  const files = e.target.files
  var data
  for (var i = 0; i < files.length; i++) {
    const fileName = supabase.auth.user().id + "/" + files[i].name.replace(/\s/g, "-")
    data = await supabase
      .storage
      .from('files')
      .upload(fileName, { cacheControl: '0', upsert: true })
  }
  document.getElementById('uploadInput').value = null;
  return data;
}

async function signIn(bucket, pwd) {
  const { user, session, error } = await supabase.auth.signIn({
    email: bucket + "@fare.com",
    password: pwd,
  })
  if (!error) {
    window.location.assign("/")
  }
  else {
    return error
  }
}

async function signUp(bucket, pwd) {
  const { user, session, error } = await supabase.auth.signUp({
    email: bucket + "@fare.com",
    password: pwd,
  })
  if (!error) {
    window.location.assign("/")
  }
  else {
    return error
  }
}

function getBucketName() {
  return supabase.auth.user().email.split("@")[0]
}

async function signOut() {
  removeBucket(getUsername())
  window.location.assign("/auth")
  const { error } = await supabase.auth.signOut()
}


export { getBucketName, downloadFile, fetchList, removeFile, uploadFile, signIn, signUp, signOut}