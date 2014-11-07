json.merge! @photo.attributes
json.sizes Hash[@photo.original.styles.map {|style, _| [style, "http://#{request.host}#{@photo.original.url(style)}"]}]

json.user do
  json.(@photo.user, :id, :username)
end

json.albums @photo.albums do |album|
  json.(album, :id, :title)
end
