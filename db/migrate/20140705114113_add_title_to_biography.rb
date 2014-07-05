class AddTitleToBiography < ActiveRecord::Migration
  def change
    add_column :biographies, :title, :string
  end
end
