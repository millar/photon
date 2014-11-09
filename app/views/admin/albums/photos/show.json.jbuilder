json.(@album_photo, :id, :photo_id, :album_id)

json.album do
  json.(@album_photo.album, :id, :title, :photo_count, :created_at, :published)
end

json.photo do
  json.merge! @album_photo.photo.attributes
  json.sizes Hash[@album_photo.photo.original.styles.map {|style, _| [style, "http://#{request.host}#{@album_photo.photo.original.url(style)}"]}]
  json.position @position
  json.album_photo_id @album_photo.id
end
