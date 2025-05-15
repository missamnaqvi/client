async function uploadToSignUrl(response, content_type, file) {
  try {
    const uploadResponse = await fetch(response, {
      method: "PUT",
      headers: {
        "Content-Type": content_type, // Ensure the Content-Type matches the file
      },
      body: file, // The file itself
    });
    // console.log(uploadResponse.status)
    if(uploadResponse.status===200)
    {
        console.log("uploaded succefully...")
    }
    return uploadResponse;
  } catch (error) {
    console.log(error);
  }
}
export { uploadToSignUrl };
