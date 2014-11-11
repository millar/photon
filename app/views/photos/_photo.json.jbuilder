json.(photo, :id, :width, :height, :average_nw_hex, :average_se_hex, :top_colors, :title)

if photo.full_description
  json.description photo.full_description
else
  json.description nil
end

json.sizes Hash[photo.original.styles.map {|style, _| [style, "http://#{request.host}#{photo.original.url(style)}"]}]
