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

require 'test_helper'

class PostTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
