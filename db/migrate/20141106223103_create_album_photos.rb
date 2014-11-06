class CreateAlbumPhotos < ActiveRecord::Migration
  def change
    create_table :album_photos do |t|
      t.string :title
      t.text :description

      t.integer :position

      t.references :photo
      t.references :album

      t.datetime :published_at
      t.timestamps null: false
    end

    add_column :albums, :slug, :string, unique: true
  end
end
