json.merge! @photo.attributes
json.sizes Hash[@photo.original.styles.map {|style, _| [style, "http://#{request.host}#{@photo.original.url(style)}"]}]
json.(@photo, :full_description, :top_colors, :published)

json.user do
  json.(@photo.user, :id, :username)
end

json.albums @photo.albums do |album|
  json.(album, :id, :title, :photo_count, :created_at, :published)
end
