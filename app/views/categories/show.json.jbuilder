json.(@category, :name, :slug)

json.albums do
  json.partial! 'albums/album', collection: @category.albums, as: :album
end
