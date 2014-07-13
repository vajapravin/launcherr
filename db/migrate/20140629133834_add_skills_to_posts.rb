class AddSkillsToPosts < ActiveRecord::Migration
  def change
    add_column :posts, :skills, :string
  end
end
