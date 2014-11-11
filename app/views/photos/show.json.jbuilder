json.partial! 'photo', photo: @photo

json.albums @photo.albums do |album|
  json.(album, :id, :title, :published_at, :slug)

  if album.full_description
    json.description album.full_description
  else
    json.description nil
  end

  if album.cover
    json.cover do
      json.(album.cover, :id, :width, :height, :average_nw_hex, :average_se_hex, :top_colors)
      json.sizes Hash[album.cover.original.styles.map {|style, _| [style, "http://#{request.host}#{album.cover.original.url(style)}"]}]
    end
  else
    json.cover nil
  end
end
