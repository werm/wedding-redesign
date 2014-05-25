class CreateStories < ActiveRecord::Migration
  def change
    create_table :stories do |t|
      t.string :title
      t.string :time
      t.string :icon
      t.text :content

      t.timestamps
    end
  end
end
