class AddAttachmentCoverimageToPosts < ActiveRecord::Migration
  def self.up
    change_table :posts do |t|
      t.attachment :coverimage
    end
  end

  def self.down
    drop_attached_file :posts, :coverimage
  end
end
