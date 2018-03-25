export default function mapPhotos (res) {
  return res.data.photos.photo.map((photo => ({
    id: photo.id,
    url: `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`,
    title: photo.title,
    date: photo.datetaken,
    description: photo.description,
    ownerName: photo.owner
  })))
}
