json.merge! @album.attributes

json.user do
  json.(@album.user, :id, :username)
end

json.photos @album.photos do |photo|
  json.merge! photo.attributes
  json.sizes Hash[photo.original.styles.map {|style, _| [style, "http://#{request.host}#{photo.original.url(style)}"]}]
end
