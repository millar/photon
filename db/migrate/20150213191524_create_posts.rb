class CreatePosts < ActiveRecord::Migration
  def change
    create_table :posts do |t|
      t.string :title
      t.text :raw_content
      t.text :html_content
      t.string :slug
      t.references :user

      t.datetime :published_at
      t.timestamps null: false
    end
  end
end
