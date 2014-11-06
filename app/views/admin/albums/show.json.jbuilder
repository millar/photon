json.merge! @album.attributes

json.user do
  json.(@album.user, :id, :username)
end
