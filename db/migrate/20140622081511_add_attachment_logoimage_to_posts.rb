class AddAttachmentLogoimageToPosts < ActiveRecord::Migration
  def self.up
    change_table :posts do |t|
      t.attachment :logoimage
    end
  end

  def self.down
    drop_attached_file :posts, :logoimage
  end
end
