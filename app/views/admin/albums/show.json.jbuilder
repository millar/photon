json.merge! @album.attributes
json.published @album.published

json.album_category @album.album_category

json.full_description @album.full_description

json.user do
  json.(@album.user, :id, :username)
end

if @album.cover
  json.cover do
    json.merge! @album.cover.attributes
    json.sizes Hash[@album.cover.original.styles.map {|style, _| [style, "http://#{request.host}#{@album.cover.original.url(style)}"]}]
  end
else
  json.cover nil
end

json.photos @album.photos do |photo|
  json.merge! photo.attributes
  json.sizes Hash[photo.original.styles.map {|style, _| [style, "http://#{request.host}#{photo.original.url(style)}"]}]
  json.full_description photo.full_description
  json.top_colors photo.top_colors

  unless @album_photos.nil?
    json.position @album_photos[photo.id].position
    json.album_photo_id @album_photos[photo.id].id
    json.album_photo_created_at @album_photos[photo.id].created_at
  end
end
