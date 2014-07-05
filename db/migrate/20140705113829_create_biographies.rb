class CreateBiographies < ActiveRecord::Migration
  def change
    create_table :biographies do |t|
      t.string :person
      t.text :content

      t.timestamps
    end
  end
end
