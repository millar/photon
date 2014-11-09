json.merge! @album.attributes
json.published @album.published

json.full_description @album.full_description

json.user do
  json.(@album.user, :id, :username)
end

json.photos @album.photos do |photo|
  json.merge! photo.attributes
  json.sizes Hash[photo.original.styles.map {|style, _| [style, "http://#{request.host}#{photo.original.url(style)}"]}]

  json.position @album_photos[photo.id].position
  json.album_photo_id @album_photos[photo.id].id
end
