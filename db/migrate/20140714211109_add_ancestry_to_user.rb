class AddAncestryToUser < ActiveRecord::Migration
  def up
    add_column :users, :ancestry, :string
    add_index :users, :ancestry
  end
  def down
    remove_column :users, :ancestry
    remove_index :users, :ancestry
  end
end
