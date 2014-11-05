class CreatePhotos < ActiveRecord::Migration
  def change
    create_table :photos do |t|
      t.attachment :original

      t.string :title
      t.string :description

      t.integer :width
      t.integer :height

      t.integer :original_width
      t.integer :original_height
      t.boolean :exif, default: false
      t.string :model
      t.datetime :taken_at
      t.string :exposure_time
      t.float :f_number

      t.decimal :lat, precision: 10, scale: 7
      t.decimal :lng, precision: 10, scale: 7

      t.references :user
      t.timestamps null: false
    end
  end
end
