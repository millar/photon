json.array! @albums do |album|
  json.merge! album.attributes
end
