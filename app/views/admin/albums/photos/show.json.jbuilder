json.(@album_photo, :photo_id, :album_id)

json.album do
  json.(@album_photo.album, :id, :title)
end

json.photo do
  json.merge! @album_photo.photo.attributes
  json.sizes Hash[@album_photo.photo.original.styles.map {|style, _| [style, "http://#{request.host}#{@album_photo.photo.original.url(style)}"]}]
end
