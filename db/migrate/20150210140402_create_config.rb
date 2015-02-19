class CreateConfig < ActiveRecord::Migration
  def change
    create_table :config do |t|
      t.string :site_title
      # t.string :site_title
    end
  end
end
