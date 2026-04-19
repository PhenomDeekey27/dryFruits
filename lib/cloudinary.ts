export const cloudinaryConfig = {
  cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!,
  uploadPreset: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!,
}

export async function uploadImageToCloudinary(file: File): Promise<string> {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('upload_preset', cloudinaryConfig.uploadPreset)
  formData.append('folder', 'annamalai-dates/products')

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName}/image/upload`,
    { method: 'POST', body: formData }
  )

  if (!res.ok) throw new Error('Cloudinary upload failed')
  const data = await res.json()
  return data.secure_url as string
}

export async function uploadMultipleImages(files: File[]): Promise<string[]> {
  return Promise.all(files.map(uploadImageToCloudinary))
}
