# == Schema Information
#
# Table name: posts
#
#  id                      :integer          not null, primary key
#  project_name            :string(255)
#  quick_pitch             :text
#  full_pitch              :text
#  user_id                 :integer
#  youtube_id              :string(255)
#  to_the_table            :text
#  compensation_method     :text
#  location                :string(255)
#  tags                    :text
#  created_at              :datetime
#  updated_at              :datetime
#  coverimage_file_name    :string(255)
#  coverimage_content_type :string(255)
#  coverimage_file_size    :integer
#  coverimage_updated_at   :datetime
#  logoimage_file_name     :string(255)
#  logoimage_content_type  :string(255)
#  logoimage_file_size     :integer
#  logoimage_updated_at    :datetime
#  url                     :string(255)
#  skills                  :string(255)
#

class Post < ActiveRecord::Base
  belongs_to :user
 
  attr_accessible :project_name, :quick_pitch, :coverimage, :logoimage, :full_pitch, :skills, :youtube_id, :to_the_table, :compensation_method, :location, :url, :content, :name, :tag_list
 
 has_attached_file :coverimage 
 has_attached_file :logoimage 

 validates_attachment :coverimage, content_type: { content_type: /\Aimage\/.*\Z/ }
 validates_attachment :logoimage, content_type: { content_type: /\Aimage\/.*\Z/ } 
 #validates_formatting_of :youtube_id, using: :url
  # acts_as_votable 
  #attr_accessible :content, :name, :tag_list
acts_as_taggable


end
