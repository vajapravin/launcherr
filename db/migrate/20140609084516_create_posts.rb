class CreatePosts < ActiveRecord::Migration
  def change
    create_table :posts do |t|
      t.string :project_name
      t.text :quick_pitch
      t.text :full_pitch
      t.references :user, index: true
      t.string :youtube_id
      t.text :to_the_table
      t.text :compensation_method
      t.string :location
      t.text :tags

      t.timestamps
    end
  end
end
