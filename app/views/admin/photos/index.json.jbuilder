json.array! @photos do |photo|
  json.merge! photo.attributes

  # json.sizes.array! photo.original.styles do |style, _|
  #   json.hi style
  # end

  json.sizes Hash[photo.original.styles.map {|style, _| [style, "http://#{request.host}#{photo.original.url(style)}"]}]
end
