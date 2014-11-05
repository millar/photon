json.merge! @photo.attributes
json.sizes Hash[@photo.original.styles.map {|style, _| [style, "http://#{request.host}#{@photo.original.url(style)}"]}]

json.user do
  json.username @photo.user.username
end