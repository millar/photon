class AddClientToAlbums < ActiveRecord::Migration
  def change
    add_column :albums, :client, :string
  end
end
